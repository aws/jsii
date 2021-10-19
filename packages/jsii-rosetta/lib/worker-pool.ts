import type { Worker } from 'worker_threads';

import * as logging from './logging';

/**
 * Distribute a queue of work over a set of workers
 *
 * The worker script should listen for messages message, which contains a number
 * of work items to process. The request message looks like:
 *
 *   { id: <...>, requests: [ {...}, {...} ], metadata: ... }
 *
 * The worker should respond with one of:
 *
 *   { id: <...>, responses: [ {...}, {...} ] }
 *   { id: <...>, error: Error }
 *
 * Does not do any require() statements itself so this can be safely
 * imported on Node versions where workers are not available.
 *
 * ---------------------------
 *
 * How this works:
 *
 * - Whenever we get work to do, we chop it into chunks and assign each chunk a unique id.
 * - We then create a promise that will resolve once it has seen a response to each of the ids it
 *   is waiting for.
 * - To keep track of this, we have a map that maps { id -> handler }. The handler is a wrapper
 *   around the promise, and will resolve/reject as necessary.
 */
export class WorkerPool {
  private readonly workers = new Set<Worker>();
  private readonly idleWorkers = new Array<Worker>();

  private idCtr = 1;
  private readonly workQueue = new Array<WorkBatch<any, any>>();
  private readonly responseHandlers = new Map<number, IResponseHandler>();

  /**
   * What work item a worker is currently handler
   *
   * Used to map complete worker failure onto the right job.
   */
  private readonly currentlyHandling = new Map<Worker, WorkBatch<any, any>>();

  private statisticsTimer?: NodeJS.Timeout;
  private readonly throughput = new ThroughputCalculator();

  public constructor(workerModule: typeof import('worker_threads'), n: number, workerScript: string) {
    for (let i = 0; i < n; i++) {
      this.addWorker(workerModule, workerScript);
    }

    this.statisticsTimer = setInterval(() => this.dumpStatistics(), 5000);
  }

  private addWorker(workerModule: typeof import('worker_threads'), workerScript: string) {
    const worker = new workerModule.Worker(workerScript);

    this.workers.add(worker);
    worker.on('error', (e) => {
      const current = this.currentlyHandling.get(worker);

      // This is pretty horrible, but... this worker is about to die. Spawn a new one, find the
      // work this one was about to do, and retry. It seems to work... (yay?)
      if ((e as any).code === 'ERR_WORKER_OUT_OF_MEMORY') {
        logging.warn('Worker ran out of memory and died. Recreating.');
        this.addWorker(workerModule, workerScript);
        if (current) {
          this.workQueue.unshift(current);
        }
        return;
      }

      // Dispatch the complete worker failure to the right job, or log if the worker spontaneously
      // died. Will be followed by an 'exit' event so we don't need to do state management.
      if (current && this.responseHandlers.has(current.id)) {
        this.responseHandlers.get(current.id)?.error(current.id, e);
      } else {
        logging.error(`Worker died: ${e.message}`);
      }
    });
    worker.on('message', (m: WorkResponse<any>) => {
      this.handleWorkerResponse(worker, m);
    });
    worker.on('exit', () => {
      this.markDead(worker);
    });
    worker.on('online', () => {
      this.markAvailable(worker);
    });
  }

  public cleanup() {
    for (const w of this.workers) {
      void w.terminate();
    }
    if (this.statisticsTimer) {
      clearInterval(this.statisticsTimer);
      this.statisticsTimer = undefined;
    }
  }

  /**
   * Process the given array of items and return the responses in the same order
   */
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  public process<B, M, A>(work: A[], metadata: M | undefined = undefined, batchSize = 10): Promise<B[]> {
    const thisResponseHandlers = this.responseHandlers;

    return new Promise<B[]>((ok, ko) => {
      const ids = this.enqueueWork(work, metadata, batchSize);
      const responses = new Map<number, B[]>();

      const handler: IResponseHandler = {
        error(_id, err) {
          // Reject the promise when we see any kind of error
          unregisterHandler();
          ko(err);
        },
        success(id, response) {
          // Shouldn't happen but check for it anyway
          if (responses.has(id)) {
            this.error(id, new Error(`Seeing a response with the same id twice: ${id}`));
          }

          responses.set(id, response);

          if (responses.size === ids.length) {
            // We've seen all results! Collect them in the right order and respond
            const finalResult = new Array<B>();
            for (const id of ids) {
              finalResult.push(...responses.get(id)!);
            }
            unregisterHandler();
            ok(finalResult);
          }
        },
      };

      // This starts the actual processing
      registerHandler();
      this.dispatchWork();

      function registerHandler() {
        for (const id of ids) {
          thisResponseHandlers.set(id, handler);
        }
      }
      function unregisterHandler() {
        for (const id of ids) {
          thisResponseHandlers.delete(id);
        }
      }
    });
  }

  /**
   * Queue the given work in the given batch size and return the ids they were queued under
   */
  private enqueueWork<M>(work: any[], metadata: M, batchSize: number): number[] {
    work = [...work];
    const ret = new Array<number>();
    while (work.length > 0) {
      const id = this.idCtr++;
      const requests = work.splice(0, batchSize);
      this.workQueue.push({ id, requests, metadata });
      ret.push(id);
    }
    return ret;
  }

  /**
   * Mark the worker as available to accept new work
   *
   * Immediately try to dispatch work to it if we can.
   */
  private markAvailable(w: Worker) {
    this.idleWorkers.push(w);
    this.dispatchWork();
  }

  /**
   * Mark the given worker as dead. Remove it from the pool of available workers.
   */
  private markDead(w: Worker) {
    this.workers.delete(w);
    const i = this.idleWorkers.indexOf(w);
    if (i >= 0) {
      this.idleWorkers.splice(i, 1);
    }
  }

  /**
   * Dispatch as much work as possible to as many workers as possible
   */
  private dispatchWork() {
    this.checkForWorkerStarvation();
    while (this.workQueue.length > 0 && this.idleWorkers.length > 0) {
      const work = this.workQueue.shift()!;
      const worker = this.idleWorkers.shift()!;

      this.currentlyHandling.set(worker, work);
      worker.postMessage(work);
    }
  }

  /**
   * Send the worker's response to the right handler, and dispatch new work
   */
  private handleWorkerResponse(w: Worker, message: WorkResponse<any>) {
    const handler = this.responseHandlers.get(message.id);
    if (handler) {
      if (isWorkErrorResponse(message)) {
        handler.error(message.id, message.error);
      } else {
        this.throughput.finishedOne();
        handler.success(message.id, message.responses);
      }
    } else {
      // Handler may have disappeared because we already aborted with an error
    }

    this.markAvailable(w);
  }

  /**
   * This should never happen, but check anyway.
   *
   * All our workers have died and we can never complete anymore.
   */
  private checkForWorkerStarvation() {
    if (this.workers.size > 0) {
      return;
    }

    const error = new Error('Cannot complete job: all workers have died');

    for (const [id, handler] of this.responseHandlers.entries()) {
      handler.error(id, error);
    }
  }

  private dumpStatistics() {
    const active = this.workers.size - this.idleWorkers.length;
    const remaining = this.workQueue.length + active;

    this.throughput.estimateThroughput();

    // eslint-disable-next-line prettier/prettier
    logging.debug(`(${active}/${this.workers.size} workers active, ${remaining} work items remaining, eta ${this.throughput.estimateEta(remaining)})`);
  }
}

interface IResponseHandler {
  success(id: number, responses: any[]): void;
  error(id: number, error: Error): void;
}

class ThroughputCalculator {
  private readonly measurements = new Array<Measurement>();
  private finished = 0;
  private throughputHz = 0;

  public constructor(private readonly history = 10) {}

  public finishedOne() {
    this.finished++;
  }

  /**
   * Estimate the throughput
   *
   * Should be called periodically
   */
  public estimateThroughput() {
    if (this.measurements.length === 0 || this.measurements[this.measurements.length - 1].finished !== this.finished) {
      this.measurements.push({ finished: this.finished, timestampMs: Date.now() });
      if (this.measurements.length > this.history) {
        this.measurements.shift();
      }
    }

    const last = this.measurements[this.measurements.length - 1];
    const first = this.measurements[0];

    const deltaFinished = last.finished - first.finished;
    const deltaS = (last.timestampMs - first.timestampMs) / 1000;

    this.throughputHz = deltaS !== 0 ? deltaFinished / deltaS : 0;
  }

  public estimateEta(n: number): string {
    if (this.throughputHz === 0) {
      return '???';
    }

    let s = Math.floor(n / this.throughputHz);
    const parts = new Array<string>();
    if (s >= 60) {
      const k = Math.floor(s / 60);
      s -= k * 60;
      parts.push(`${k}m`);
    }
    parts.push(`${s}s`);
    return parts.join('');
  }
}

interface Measurement {
  readonly timestampMs: number;
  readonly finished: number;
}

export type WorkRequest<A, M> = WorkBatch<A, M>;

export interface WorkBatch<A, M> {
  readonly id: number;
  readonly requests: A[];
  readonly metadata?: M;
}

export type WorkResponse<B> = WorkErrorResponse | WorkSuccessResponse<B>;

export interface WorkErrorResponse {
  readonly id: number;
  readonly error: Error;
}

export interface WorkSuccessResponse<B> {
  readonly id: number;
  readonly responses: B[];
}

export function isWorkErrorResponse(x: WorkResponse<any>): x is WorkErrorResponse {
  return (x as any).error;
}

export function isWorkSuccessResponse<A>(x: WorkResponse<A>): x is WorkSuccessResponse<A> {
  return (x as any).responses;
}
