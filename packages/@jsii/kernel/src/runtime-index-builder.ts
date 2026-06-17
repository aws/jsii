import { isMainThread, workerData } from 'worker_threads';

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
 * shares no state with the kernel and is strictly best-effort: any failure is
 * swallowed and simply leaves the index unbuilt, so the next load tries again.
 */
export function runIndexBuilder(data: IndexBuilderWorkerData): void {
  if (data?.packageDir == null) {
    return;
  }
  try {
    buildRuntimeIndex(data.packageDir, data.supportedFeatures ?? []);
  } catch {
    // Best-effort: leave the index unbuilt; the next load will retry.
  }
}

/* istanbul ignore next: exercised on a worker thread, not in the main thread */
if (!isMainThread) {
  runIndexBuilder(workerData as IndexBuilderWorkerData);
}
