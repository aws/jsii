import { rmSync } from 'fs';

export default function globalTeardown() {
  const root = globalThis.__JSII_KERNEL_TEST_CACHE_ROOT__;
  if (typeof root === 'string') {
    try {
      rmSync(root, { recursive: true, force: true });
    } catch {
      // ignore
    }
  }
}
