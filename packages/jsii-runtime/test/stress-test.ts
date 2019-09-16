import { InputOutput, Input, Output } from "../lib/in-out";
import { KernelHost } from "../lib/host";

const requestCount = 250000;

class FakeInputOutput extends InputOutput {
    debug = false;
    private count: number = 0;

    write(_: Output) { }

    read(): Input | undefined {
        if(this.count == requestCount) {
            return undefined;
        }

        ++this.count;
        return { api: 'stats' };
    }
}

const inout = new FakeInputOutput();
const host = new KernelHost(inout, { debug: false, noStack: false });
host.run();

console.info("jsii-runtime stress test succeeded");
