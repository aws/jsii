import { tmpdir } from 'os';
import { join } from 'path';

export function defaultCacheRoot(): string {
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (process.platform) {
    case 'darwin':
      if (process.env.HOME)
        return join(
          process.env.HOME,
          'Library',
          'Caches',
          'com.amazonaws.jsii',
          'package-cache',
        );
      break;
    case 'linux':
      if (process.env.HOME)
        return join(process.env.HOME, '.cache', 'aws', 'jsii', 'package-cache');
      break;
    case 'win32':
      if (process.env.LOCALAPPDATA)
        return join(process.env.LOCALAPPDATA, 'AWS', 'jsii', 'package-cache');
      break;
    default:
    // Fall back on putting in tmpdir()
  }
  return join(tmpdir(), 'aws-jsii-package-cache');
}
