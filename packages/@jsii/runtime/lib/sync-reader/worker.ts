import { createReadStream, fstatSync } from 'fs';
import { Socket } from 'net';
import { parentPort } from 'worker_threads';

/*
                \||/               O YE WHO VISIT THIS SOURCE FILE! THIS IS A
                |  @___oo          LAND OF DRAGONS AND DARK ARTS.
      /\  /\   / (__,,,,|
     ) /^\) ^\/ _)                 THIS BEAUTYFUL CONTRAPTION IS SET TO ACHIEVE
     )   /^\/   _)                 THE IMPOSSIBLE: SYNCHRONOUS ACCESS ON A NON
     )   _ /  / _)                 BLOCKING FILE DESCRIPTOR WITHOUT THRASHING
 /\  )/\/ ||  | )_)                THE CPU WHEN RECOVERING FROM THE DREADED
<  >      |(,,) )__)               {EAGAIN} ERRNO.
 ||      /    \)___)\
 | \____(      )___) )___          THE ELDERS HAVE LEFT MUCH LORE IN THIS FILE.
  \______(_______;;; __;;;         READ BEFORE YE SHOOT YOURSELF IN THE FOOT!
*/

parentPort!.once(
  'message',
  ({
    availableBytes,
    sharedBuffer,
    fd,
  }: {
    /**
     * A slice of shared memory where we'll store the count of bytes we placed
     * into the `sharedBuffer`. This is assumed to be at least 4 bytes (ideally,
     * it is *exactly* 4 bytes; this will store a 32 bits signed integer).
     */
    availableBytes: SharedArrayBuffer;
    /**
     * A slice of shared memory where we'll store the data that was accepted
     * from the provided file descriptor. This buffer is assumed to have non-0
     * length (ideally, should be the FD's high water mark, so we can transfer
     * the whole buffer, always).
     */
    sharedBuffer: SharedArrayBuffer;
    /**
     * The file descriptor from which this worker will asynchronously read data.
     */
    fd: number;
  }) => {
    // We won't be exchanging any more messages with the main thread through
    // this port, so we close it so it does not hold this thread from
    // terminating.
    parentPort!.close();

    /**
     * A single Int32, wrapped in an array to satisfy the `Atomics` API. It
     * represents the amount of data available in the `sharedBuffer`. This
     * worker is in control of the `sharedBuffer` as long as this Int32 has
     * value `0`. It yields back control to the main thread by setting the value
     * to any non-`0` value, which represents the amount of data that was
     * written to `sharedBuffer`. The value `-1` signals no more data will be
     * provided as end-of-file was reached.
     */
    const lengthArray = new Int32Array(availableBytes);
    /**
     * The `sharedBuffer` is wrapped in a new `Buffer` so it can conveniently be
     * used by the usual `Buffer` APIs.
     */
    const buffer = Buffer.from(sharedBuffer);

    /**
     * Waits until the shared buffer has been consumed, which is denoted by
     * `lengthArray[0] === 0`. This means the `sharedBuffer` is in this worker's
     * control and that we can safely write to it.
     */
    function waitForBuffer() {
      let length = Atomics.load(lengthArray, 0);
      while (length !== 0) {
        Atomics.wait(lengthArray, 0, length, 150);
        length = Atomics.load(lengthArray, 0);
      }
    }

    /**
     * Notifies the main thread about the availability of data (or end-of-file),
     * by setting `lengthArray[0]` to the amount of available data (or `-1`).
     * After returning from this function, the worker no longer controls the
     * `sharedBuffer` and should not write to it before having called
     * `waitForBuffer` again.
     *
     * @param size the amount of available data, or `-1` if EOF was reached.
     */
    function notifyAvailable(size: number) {
      Atomics.store(lengthArray, 0, size);
      Atomics.notify(lengthArray, 0, Number.POSITIVE_INFINITY);
    }

    const stat = fstatSync(fd);
    // If the file descriptor refers to a FIFO or a Socket, then we should use
    // the `net.Socket` API instead of using the `fs.ReadStream` API, which may
    // in this case strangely fail on `EAGAIN`.
    const stream =
      stat.isSocket() || stat.isFIFO()
        ? new Socket({
            fd,
            readable: true,
            writable: false,
            allowHalfOpen: true,
          })
        : // Note: the path will be ignored since we are providing an FD.
          createReadStream('/dev/stdin', { fd, autoClose: false });

    // If the stream is a Socket, we'll ensure the writable side of it is marked
    // as finished before moving on, so we are sure to get the 'end' event
    // generated when the reading side reaches end of stream.
    if (stream instanceof Socket) {
      stream.end();
    }

    /**
     * Accepts a new chunk of data from the file description (via the
     * `ReadStream`). Once the chunk has been received, we will acquire the
     * `sharedBuffer` before writing as much data as we can to it, and returning
     * control to the main thread.
     *
     * This handlet will only returns once all of the data has been copied into
     * the `sharedBuffer`. If needed, it will re-acquire the buffer several
     * times in order to flush all the data.
     */
    stream.on('data', (chunk) => {
      const chunkBuffer = Buffer.from(chunk);

      let copied = 0;
      while (copied < chunkBuffer.length) {
        waitForBuffer();

        const copiedChunk = chunkBuffer.copy(buffer, 0, copied);
        copied += copiedChunk;

        notifyAvailable(copiedChunk);
      }
    });

    /**
     * Upon reaching end-of-file, notify the main thread that no further data
     * will be received by setting available length to `-1`, then gracefully
     * terminate this worker thread.
     *
     * Note: this event is only emitted after ALL the data has been consumed by
     * the `data` handler above. This is a gurantee from the NodeJS standard
     * library.
     */
    stream.once('end', () => {
      waitForBuffer();
      notifyAvailable(-1);

      // Only terminates this worker, not the whole process!
      process.exit(0);
    });

    /**
     * If the stream generates an error, it will be re-thrown into the void,
     * which will cause the worker thread to terminate itself.
     *
     * The main thread will receive the `error` event from this worker, so they
     * can perform the necessary notification and clean-up. The `exit` event
     * will then be triggered.
     */
    stream.once('error', (error) => {
      throw error;
    });
  },
);
