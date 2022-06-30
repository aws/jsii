import * as fs from 'fs-extra';
import * as path from 'path';
import { extract } from 'tar';
import * as zlib from 'zlib';

import {
  Assembly,
  SPEC_FILE_NAME,
  SPEC_FILE_NAME_COMPRESSED,
} from './assembly';
import { makeTempDir } from './utils';
import { validateAssembly } from './validate-assembly';

/**
 * Finds the path to the SPEC_FILE_NAME file, which will either
 * be the assembly or hold instructions to find the assembly.
 *
 * @param directory path to a directory with an assembly file
 * @returns path to the SPEC_FILE_NAME file
 */
export function getAssemblyFile(directory: string) {
  const dotJsiiFile = path.join(directory, SPEC_FILE_NAME);

  if (!fs.existsSync(dotJsiiFile)) {
    throw new Error(
      `Expected to find ${SPEC_FILE_NAME} file in ${directory}, but no such file found`,
    );
  }

  return dotJsiiFile;
}

/**
 * Writes the assembly file either as .jsii or .jsii.gz if zipped
 *
 * @param directory the directory path to place the assembly file
 * @param assembly the contents of the assembly
 * @param compress whether or not to zip the assembly (.jsii.gz)
 * @returns whether or not the assembly was zipped
 */
export function writeAssembly(
  directory: string,
  assembly: Assembly,
  { compress = false }: { compress?: boolean } = {},
) {
  if (compress) {
    // write .jsii file with instructions on opening the compressed file
    fs.writeJsonSync(path.join(directory, SPEC_FILE_NAME), {
      schema: 'jsii/file-redirect',
      compression: 'gzip',
      filename: SPEC_FILE_NAME_COMPRESSED,
    });

    // write actual assembly contents in .jsii.gz
    fs.writeFileSync(
      path.join(directory, SPEC_FILE_NAME_COMPRESSED),
      zlib.gzipSync(JSON.stringify(assembly)),
    );
  } else {
    fs.writeJsonSync(path.join(directory, SPEC_FILE_NAME), assembly, {
      encoding: 'utf8',
      spaces: 2,
    });
  }

  return compress;
}

export function loadAssemblyFromBuffer(
  assemblyBuffer: Buffer,
  compressedAssemblyBuffer?: Buffer,
  validate = true,
): Assembly {
  let contents = JSON.parse(assemblyBuffer.toString('utf-8'));

  // check if the file holds instructions to the actual assembly file
  if (isRedirect(contents)) {
    validateRedirectSchema(contents);
    if (!compressedAssemblyBuffer) {
      throw new Error(
        `The assembly buffer redirects to a compressed assembly at ${contents.filename}, but no compressed assembly was found`,
      );
    }
    contents = JSON.parse(zlib.gunzipSync(compressedAssemblyBuffer).toString());
  }

  return validate ? validateAssembly(contents) : (contents as Assembly);
}

/**
 * Loads the assembly file from a tarball archive and, if present,
 * follows instructions found in the file to unzip compressed assemblies.
 *
 * @param tarball the path to the tarball archive
 * @param directory the path to the assembly directory within the tarball
 * @param validate whether or not to validate the assembly
 * @returns the assembly file as an Assembly object
 */
export function loadAssemblyFromTarballFile(
  tarball: string,
  directory: string,
  validate = true,
): Assembly {
  // temp directory for storing extracted files
  const tmpdir = makeTempDir();

  // Removes leading path.sep if present (i.e '/blah/.jsii' becomes 'blah/.jsii')
  const dotJsiiFile = path.join('.', directory, SPEC_FILE_NAME);
  const compDotJsiiFile = path.join('.', directory, SPEC_FILE_NAME_COMPRESSED);
  const extDotJsiiFile = extractFileFromTarball(tarball, dotJsiiFile, tmpdir);

  let contents = readAssembly(extDotJsiiFile);
  if (isRedirect(contents)) {
    const extCompDotJsiiFile = extractFileFromTarball(
      tarball,
      compDotJsiiFile,
      tmpdir,
    );
    contents = findRedirectAssembly(extCompDotJsiiFile, contents);
  }

  fs.removeSync(tmpdir);

  return validate ? validateAssembly(contents) : (contents as Assembly);
}

/**
 * Helper method to extract a single file from a tarball archive.
 *
 * @param tarball the path to the tarball archive
 * @param file the file to extract. if no file is given, then the entire contents
 * of the tarball are extracted
 * @param extractTo the directory to extract the file(s) to
 * @returns the path to the extracted file
 */
function extractFileFromTarball(
  tarball: string,
  file: string,
  extractTo?: string,
) {
  const dir = extractTo ?? process.cwd();
  console.log('tarball', tarball);
  extract(
    {
      cwd: dir,
      file: tarball,
      sync: true,
    },
    [file],
  );

  // tar will drop the extracted file at this location
  return path.join(dir, file);
}

/**
 * Loads the assembly file and, if present, follows instructions
 * found in the file to unzip compressed assemblies.
 *
 * @param directory the directory of the assembly file
 * @param validate whether to validate the contents of the file
 * @returns the assembly file as an Assembly object
 */
export function loadAssemblyFromPath(
  directory: string,
  validate = true,
): Assembly {
  const assemblyFile = getAssemblyFile(directory);
  return loadAssemblyFromFile(assemblyFile, validate);
}

/**
 * Loads the assembly file and, if present, follows instructions
 * found in the file to unzip compressed assemblies.
 *
 * @param pathToFile the path to the SPEC_FILE_NAME file
 * @param validate whether to validate the contents of the file
 * @returns the assembly file as an Assembly object
 */
export function loadAssemblyFromFile(
  pathToFile: string,
  validate = true,
): Assembly {
  let contents = readAssembly(pathToFile);

  // check if the file holds instructions to the actual assembly file
  if (isRedirect(contents)) {
    contents = findRedirectAssembly(pathToFile, contents);
  }

  return validate ? validateAssembly(contents) : (contents as Assembly);
}

function isRedirect(contents: any): boolean {
  return contents.schema === 'jsii/file-redirect';
}

function readAssembly(pathToFile: string) {
  return fs.readJsonSync(pathToFile, {
    encoding: 'utf-8',
  });
}

function findRedirectAssembly(
  pathToFile: string,
  contents: Record<string, string>,
) {
  validateRedirectSchema(contents);
  const redirectAssemblyFile = path.join(
    path.dirname(pathToFile),
    contents.filename,
  );
  return JSON.parse(
    zlib.gunzipSync(fs.readFileSync(redirectAssemblyFile)).toString(),
  );
}

function validateRedirectSchema(contents: Record<string, string>) {
  const errors = [];
  if (contents.compression !== 'gzip') {
    errors.push(
      `compression must be 'gzip' but received '${contents.compression}'`,
    );
  }
  if (contents.filename === undefined) {
    errors.push("schema must include property 'filename'");
  }

  if (errors.length !== 0) {
    throw new Error(`Invalid redirect schema:\n  ${errors.join('\n  ')}`);
  }
}
