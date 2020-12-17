import { createReadStream } from 'fs';
import { parentPort } from 'worker_threads';

parentPort!.once(
  'message',
  ({
    availableBytes,
    sharedBuffer,
    fd,
  }: {
    availableBytes: SharedArrayBuffer;
    sharedBuffer: SharedArrayBuffer;
    sharedBufferLength: number;
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
    }

    // Note: the path will be ignored since we are providing an FD.
    const stream = createReadStream('/dev/stdin', { fd, autoClose: false });

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

      stream.removeAllListeners();

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
