import { Test } from 'nodeunit';

export async function doesNotReject<T>(block: () => Promise<T>, test: Test): Promise<T | undefined> {
    let error: Error;
    try {
        return await block();
    } catch (e) {
        error = e;
    } finally {
        test.doesNotThrow(() => { if (error) { throw error; } });
    }
    // We threw :(
    return undefined;
}

export async function rejects(block: () => Promise<any>, test: Test): Promise<void> {
    let error: Error;
    try {
        await block();
    } catch (e) {
        error = e;
    } finally {
        test.throws(() => { if (error) { throw error; } });
    }
}
