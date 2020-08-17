import { api, Kernel } from '@jsii/kernel';
import { Input, InputOutput } from './in-out';
import { EventEmitter } from 'events';

export class KernelHost {
  private readonly kernel = new Kernel(this.callbackHandler.bind(this));
  private readonly eventEmitter = new EventEmitter();

  public constructor(
    private readonly inout: InputOutput,
    private readonly opts: { debug?: boolean; noStack?: boolean } = {},
  ) {
    this.kernel.traceEnabled = opts.debug ? true : false;
  }

  public run() {
    const req = this.inout.read();
    if (!req) {
      this.eventEmitter.emit('exit');
      return; // done
    }

    this.processRequest(req, () => {
      // Schedule the call to run on the next event loop iteration to
      // avoid recursion.
      setImmediate(() => this.run());
    });
  }

  public on(event: 'exit', listener: () => void) {
    this.eventEmitter.on(event, listener);
  }

  private callbackHandler(callback: api.Callback) {
    // write a "callback" response, which is a special response that tells
    // the client that there's synchonous callback it needs to invoke and
    // bring back the result via a "complete" request.
    this.inout.write({ callback });

    return completeCallback.call(this);

    function completeCallback(this: KernelHost): void {
      const req = this.inout.read();
      if (!req) {
        throw new Error('Interrupted before callback returned');
      }

      // if this is a completion for the current callback, then we can
      // finally stop this nonsense and return the result.
      const completeReq = req as { complete: api.CompleteRequest };
      if (
        'complete' in completeReq &&
        completeReq.complete.cbid === callback.cbid
      ) {
        if (completeReq.complete.err) {
          throw new Error(completeReq.complete.err);
        }

        return completeReq.complete.result;
      }

      // otherwise, process the request normally, but continue to wait for
      // our callback to be completed. sync=true to enforce that `completeCallback`
      // will be called synchronously and return value will be chained back so we can
      // return it to the callback handler.
      return this.processRequest(
        req,
        completeCallback.bind(this),
        /* sync */ true,
      );
    }
  }

  /**
   * Processes the input request `req` and writes the output response to
   * stdout. This method invokes `next` when the request was fully processed.
   * This either happens synchronously or asynchronously depending on the api
   * (e.g. the "end" api will wait for an async promise to be fulfilled before
   * it writes the response)
   *
   * @param req The input request
   * @param next A callback to invoke to continue
   * @param sync If this is 'true', "next" must be called synchronously. This means
   *             that we won't process any async activity (begin/complete). The kernel
   *             doesn't allow any async operations during a sync callback, so this shouldn't
   *             happen, so we assert in this case to find bugs.
   */
  private processRequest(req: Input, next: () => void, sync = false) {
    if ('callback' in req) {
      throw new Error(
        'Unexpected `callback` result. This request should have been processed by a callback handler',
      );
    }

    if (!('api' in req)) {
      throw new Error('Malformed request, "api" field is required');
    }

    const apiReq = req;
    const fn = this.findApi(apiReq.api);

    try {
      const ret = fn.call(this.kernel, req);

      // special case for 'begin' and 'complete' which are on an async
      // promise path. in order to allow the kernel to actually fulfill
      // the promise, and continue any async flows (which may potentially
      // start other promises), we respond only within a setImmediate
      // block, which is scheduled in the same micro-tasks queue as
      // promises. see the kernel test 'async overrides: two overrides'
      // for an example for this use case.
      if (apiReq.api === 'begin' || apiReq.api === 'complete') {
        checkIfAsyncIsAllowed();

        this.debug('processing pending promises before responding');

        setImmediate(() => {
          this.writeOkay(ret);
          next();
        });

        return undefined;
      }

      // if this is an async method, return immediately and
      // call next only when the promise is fulfilled.
      if (this.isPromise(ret)) {
        checkIfAsyncIsAllowed();

        this.debug('waiting for promise to be fulfilled');

        const promise = ret;
        promise
          .then((val) => {
            this.debug('promise succeeded:', val);
            this.writeOkay(val);
            next();
          })
          .catch((e) => {
            this.debug('promise failed:', e);
            this.writeError(e);
            next();
          });

        return undefined;
      }

      this.writeOkay(ret);
    } catch (e) {
      this.writeError(e);
    }

    // indicate this request was processed (synchronously).
    return next();

    function checkIfAsyncIsAllowed() {
      if (sync) {
        throw new Error(
          'Cannot handle async operations while waiting for a sync callback to return',
        );
      }
    }
  }

  /**
   * Writes an "ok" result to stdout.
   */
  private writeOkay(result: any) {
    const res = { ok: result };
    this.inout.write(res);
  }

  /**
   * Writes an "error" result to stdout.
   */
  private writeError(error: any) {
    const res = { error: error.message, stack: undefined };
    if (!this.opts.noStack) {
      res.stack = error.stack;
    }
    this.inout.write(res);
  }

  /**
   * Returns true if the value is a promise.
   */
  private isPromise(v: any): v is Promise<any> {
    return typeof v?.then === 'function';
  }

  /**
   * Given a kernel api name, returns the function to invoke.
   */
  private findApi(apiName: string): (this: Kernel, arg: Input) => any {
    const fn = (this.kernel as any)[apiName];
    if (typeof fn !== 'function') {
      throw new Error(`Invalid kernel api call: ${apiName}`);
    }
    return fn;
  }

  private debug(...args: any[]) {
    if (!this.opts.debug) {
      return;
    }

    console.error(...args);
  }
}
