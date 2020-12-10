#!/usr/bin/env npx ts-node

import { SpawnOptions } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';

import { runCommand } from './_constants';

// Constants
const RUNTIME_DIR = path.resolve(__dirname, '..', 'jsii-experimental');
// Destination repo configuration
const REPO_NAME = process.env.JSII_RUNTIME_REPO_NAME;
const USERNAME = process.env.JSII_RUNTIME_REPO_USERNAME;
const TOKEN = process.env.JSII_RUNTIME_REPO_TOKEN;
const REMOTE =
  USERNAME && TOKEN
    ? `https://${USERNAME}:${TOKEN}@github.com/${REPO_NAME}.git`
    : `https://github.com${REPO_NAME}.git`;

// Always preserve these files/paths from the cloned repo
const PRESERVE = ['.git', '.gitignore'];
// Copy these files from the root of the JSII repository
const ROOT_FILES = ['CODE_OF_CONDUCT.md', 'LICENSE', 'NOTICE'];
// Copy these files from build-tools/repo-files to the jsii-runtime-go repo
const LOCAL_FILES = ['README.md', 'CONTRIBUTING.md'];
// Exclude all of these files from being overwritten when copying.
const DONT_OVERWRITE = [...PRESERVE, ...ROOT_FILES, ...LOCAL_FILES];

async function main() {
  const args = process.argv.slice(2);
  console.log(args[0]);
  await makeRepoDir(args[0]);
}

async function makeRepoDir(dir: string) {
  const runRepoCmd = (
    cmd: string,
    args: readonly string[],
    opts: SpawnOptions = {},
  ) => runCommand(cmd, args, { cwd: dir, ...opts });
  runRepoCmd('git', ['clone', REMOTE, '.'], { stdio: 'inherit' });

  // Clone repo and delete its contents except nodes in the PRESERVE list.
  const clonedFiles = await fs.readdir(dir);
  await Promise.all(
    clonedFiles.map((node) => {
      if (PRESERVE.includes(node)) {
        return Promise.resolve();
      }
      return fs.remove(path.resolve(dir, node));
    }),
  );

  // Copy relevant files from the jsii repo root.
  await Promise.all(
    ROOT_FILES.map((node) => {
      const filePath = path.resolve(__dirname, '..', '..', '..', '..', node);
      return fs.copy(filePath, path.resolve(dir, node));
    }),
  );

  // Copy relevant files from the repo-files dir.
  await Promise.all(
    LOCAL_FILES.map((node) => {
      const filePath = path.resolve(__dirname, 'repo-files', node);
      return fs.copy(filePath, path.resolve(dir, node));
    }),
  );

  // Copy All source files from the @jsii/go-runtime package. Throw an error if
  // any conflicts exist.
  const sourceFiles = await fs.readdir(RUNTIME_DIR);
  await Promise.all(
    sourceFiles.map((node) => {
      if (DONT_OVERWRITE.includes(node)) {
        return Promise.reject(`${RUNTIME_DIR} contains ${node}!`);
      }

      return fs.copy(path.resolve(RUNTIME_DIR, node), path.resolve(dir, node));
    }),
  );
}

main().catch(console.error);
