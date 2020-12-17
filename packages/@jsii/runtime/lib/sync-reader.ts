import * as assert from 'assert';
import * as fs from 'fs';
import { Worker } from 'worker_threads';

const workerScript = require.resolve('./sync-reader/worker');

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

/**
 * This class provides a facility to deliver synchronous access to asynchronous
 * (i.e: non blocking) file descriptors, such as a node process's STDIN. It
 * works by using `worker_threads`  to spin up a helper thread, which proceeds
 * to asynchronously read data from the file descriptor, and shares that data
 * with the main thread via a pair of SharedArrayBuffer:
 *
 * - One is a "large" buffer where the read data will be stored by the Worker
 *   and read by the main thread.
 * - One is a "small" (4 bytes / 32 bits / 1 Int32) buffer used by the two
 *   threads to synchronize using `Atomics.wait`.
 *
 * The shared buffers are considered to be held by the Worker thread when the
 * synchronization buffer holds the value `0`. When the Worker thread holds the
 * buffers, it will write read data into the shared data buffer, then set the
 * synchronization buffer to the count of bytes it wrote.
 *
 * Once the synchronization buffer has a non-`0` value, the main thread is
 * considered to own it. It can then copy the data from the shared data buffer
 * into a private buffer, then reset the synchronization buffer to `0`, handing
 * the buffer back to the Worker thread.
 *
 * Upon reaching EOF (end-of-file), the Worker thread will set the
 * synchronization buffer to `-1`, then proceed to terminate itself. When the
 * main thread reads the `-1` value from the synchronization buffer, it does NOT
 * proceed to reset it to `0`, meaning it will permanently be at EOF.
 *
 * Additionally, when the main thread is notified of the Worker thread exiting,
 * it will immediately proceed to `close` the file descriptor, disallowing any
 * attempt to rewind it.
 */
export class SyncReader {
  private readonly sharedBuffer: Buffer;
  private readonly sharedBufferLength: Int32Array;

  private readonly worker: Worker;

  private privateBuffer: Buffer | undefined;
  private workerError?: Error;

  /**
   * Creates a new SyncReader over the provided non-blocking file descriptor.
   *
   * As this uses `Atomcis.wait` to synchronize the main thread with a `Worker`,
   * and this blocks execution of all other code on the main thread (including
   * working on other promises), severe performance impact or deadlocks might be
   * observed if multiple instances of `SyncReader` are concurrently read from.
   *
   * @param fd         a file descriptor open for non-blocking read access. The
   *                   file descriptor ABSOLUTELY MUST be non-blocking, as a
   *                   ReadStream will be created from it, and those have
   *                   undefined behavior with blocking file descriptors.
   * @param bufferSize the size of the internal data buffer to be used. Using
   *                   small buffers has adverse performance implications, so
   *                   choose wisely (or just use the default size of 1MiB).
   */
  public constructor(fd: number, bufferSize = 1_048_576) {
    const sharedBuffer = new SharedArrayBuffer(bufferSize);
    const availableBytes = new SharedArrayBuffer(4);

    this.sharedBufferLength = new Int32Array(availableBytes);
    this.sharedBuffer = Buffer.from(sharedBuffer);

    this.worker = new Worker(workerScript)
      .once('error', (err) => {
        this.workerError = err;
      })
      .once('exit', (exitCode) => {
        try {
          fs.closeSync(fd);
        } catch (err) {
          // We could not close the FD... one reason could be it was already closed, but since the
          // file descriptors can be re-used by the system, it's not always possible to draw correct
          // conclusions from the exception we received while trying to clean up after ourselves.
          // Well... We tried... So we'll just emit a warning to let folks know we failed.
          process.emitWarning(err);
        }
        // If the worker abnormally exists and 'error' was not received, throw.
        if (exitCode !== 0 && this.workerError == null) {
          throw new Error(`Worker exited with error code ${exitCode}`);
        }
      });

    this.worker.postMessage({
      availableBytes: availableBytes,
      sharedBuffer: sharedBuffer,
      fd,
    });
    // Unref the worker so it does not keep the process running.
    this.worker.unref();
  }

  /**
   *  Synchronously reads fata from this reader.
   *
   * @param buffer a Buffer where the read data is to be placed.
   * @param offset the offset in the buffer where to start copying read data.
   * @param length the maximum length to be read. Note that less data may be
   *               read if the buffer is not large enough, or if there is not
   *               enough buffered data available.
   *
   * @returns the amount of bytes that were read, or `0` if the end of file has
   *          been reached or if the provided buffer did not have any space
   *          available for data.
   */
  public readSync(buffer: Buffer, offset = 0, length = buffer.length): number {
    // Check if we have left-over data from a previous read
    if (this.privateBuffer != null) {
      const copied = this.privateBuffer.copy(buffer, offset, 0, length);
      if (copied === this.privateBuffer.length) {
        this.privateBuffer = undefined;
      } else {
        this.privateBuffer = this.privateBuffer.slice(copied);
      }
      return copied;
    }

    if (this.workerError) {
      throw this.workerError;
    }

    // Wait until we are notified about new data being present
    while (Atomics.wait(this.sharedBufferLength, 0, 0, 150) === 'timed-out') {
      if (this.workerError) {
        throw this.workerError;
      }
      // Keep waiting...
    }

    // Check out how much data is available
    const available = Atomics.load(this.sharedBufferLength, 0);
    if (available < 0) {
      // Means we reached EOF, so we close the FD (so we don't leak) and return 0.
      return 0;
    }

    const copied = this.sharedBuffer.copy(buffer, offset, 0, available);

    if (copied < available) {
      this.privateBuffer = Buffer.alloc(available - copied);
      assert.strictEqual(
        this.sharedBuffer.copy(this.privateBuffer, 0, copied, available),
        this.privateBuffer.length,
        'Did not copy the expected byte count',
      );
    }

    // Reset the available data counter (notifying we consumed all the data)
    Atomics.store(this.sharedBufferLength, 0, 0);

    return copied;
  }
}
