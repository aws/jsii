import * as worker from 'worker_threads';

if (worker.isMainThread) {
  // Throw an error to prevent accidental require() of this module. In principle not a big
  // deal, but we want to be compatible with run modes where 'worker_threads' is not available
  // and by doing this people on platforms where 'worker_threads' is available don't accidentally
  // add a require().
  throw new Error('This script should be run as a worker, not included directly.');
}

worker.parentPort!.on('message', (m: any) => {
  try {
    for (const r of m.requests) {
      if (r.doThrow) {
        throw new Error(r.doThrow);
      }
    }
    worker.parentPort!.postMessage({ id: m.id, responses: m.requests });
  } catch (e) {
    worker.parentPort!.postMessage({ id: m.id, error: e });
  }
});
