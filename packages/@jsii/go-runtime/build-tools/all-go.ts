#!/usr/bin/env node

import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

import { runCommand } from './_constants';

/**
 * Recursively searches the provided directory for `go.mod` files (excluding
 * sub-directories named `node_modules` and `jsii-calc`), and executes the
 * supplied go command in the parent directory of eacu such file.
 *
 * @example
 *    # Running "go fmt" on all modules:
 *    $ all-go.js fmt ./...
 *
 *    # Running "go test" in all modules:
 *    $ all-go.js test ./...
 */
function visit(dir: string): void {
  for (const file of readdirSync(dir)) {
    const path = join(dir, file);
    if (statSync(path).isDirectory()) {
      if (file !== 'node_modules' && file !== 'jsii-calc') {
        visit(path);
      }
      continue;
    }
    if (file === 'go.mod') {
      const args = process.argv.slice(2);
      console.error(`$ go ${args.join(' ')} # ${path}`);
      try {
        runCommand('go', args, { cwd: dir, stdio: 'inherit' });
      } catch (e) {
        console.error(e.message);
        process.exit(-1);
      }
    }
  }
}

visit(cwd());
