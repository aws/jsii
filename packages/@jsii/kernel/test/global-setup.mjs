import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

/**
 * Direct the kernel's package cache to a fresh per-test-run directory so that
 * tests never share state with the developer's real ~/Library/Caches/com.amazonaws.jsii
 * (or platform equivalent), which has caused flakes when prior runs leave the
 * cache in inconsistent states.
 *
 * Runs once before all tests; the matching teardown removes the directory.
 */
export default function globalSetup() {
  const root = mkdtempSync(join(tmpdir(), 'jsii-kernel-test-cache-'));
  process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT = root;
  // Stash for teardown.
  globalThis.__JSII_KERNEL_TEST_CACHE_ROOT__ = root;

  // Best-effort cleanup if a hard failure prevents teardown from running.
  process.on('exit', () => {
    try {
      rmSync(root, { recursive: true, force: true });
    } catch {
      // ignore
    }
  });
}
