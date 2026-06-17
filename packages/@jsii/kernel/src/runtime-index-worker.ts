import { isMainThread, parentPort, workerData } from 'worker_threads';

import {
  buildRuntimeIndex,
  type IndexBuilderWorkerData,
} from './runtime-index';

/**
 * Worker-thread entry point that builds the runtime index for a single cached
 * package.
 *
 * Started by {@link import('./runtime-index').buildIndexInWorker} when a cached
 * package is first loaded. It re-reads the assembly identified by its
 * {@link IndexBuilderWorkerData} and writes the runtime index alongside it. It
 * shares no state with the kernel; building the index is best-effort, so a
 * failure just leaves the index unbuilt and the next load tries again.
 */
export function runIndexBuilder(data: IndexBuilderWorkerData): void {
  if (data?.packageDir == null) {
    return;
  }
  buildRuntimeIndex(data.packageDir, data.supportedFeatures ?? []);
}

/* istanbul ignore next: exercised on a worker thread, not in the main thread */
if (!isMainThread) {
  try {
    runIndexBuilder(workerData as IndexBuilderWorkerData);
  } catch (err: any) {
    // Report the failure to the parent (the kernel logs it via its debug
    // channel) rather than crashing the worker; the index is simply left
    // unbuilt and the next load retries.
    parentPort?.postMessage({
      error: err?.stack ?? err?.message ?? String(err),
    });
  }
}
