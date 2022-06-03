import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as zlib from 'zlib';

export const SPEC_FILE_NAME = spec.SPEC_FILE_NAME;
export const SPEC_FILE_NAME_COMPRESSED = spec.SPEC_FILE_NAME_COMPRESSED;

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
 * @param zip whether or not to zip the assembly (.jsii.gz)
 * @returns whether or not the assembly was zipped
 */
export function writeAssembly(
  directory: string,
  assembly: spec.Assembly,
  zip: boolean,
) {
  if (zip) {
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
    fs.writeJsonSync(path.join(directory, SPEC_FILE_NAME), assembly);
  }

  return zip;
}

/**
 * Loads the assembly file and, if present, follows instructions
 * found in the file to unzip compressed assemblies.
 *
 * @param directory the directory of the assembly file
 * @returns the assembly file as json
 */
export function loadAssemblyFromPath(directory: string) {
  const assemblyFile = getAssemblyFile(directory);
  return loadAssemblyFromFile(assemblyFile);
}

/**
 * Loads the assembly file and, if present, follows instructions
 * found in the file to unzip compressed assemblies.
 *
 * @param pathToFile the path to the SPEC_FILE_NAME file
 * @returns the assembly file as json
 */
export function loadAssemblyFromFile(pathToFile: string) {
  const contents = readAssembly(pathToFile);

  // check if the file holds instructions to the actual assembly file
  if (contents.schema === 'jsii/file-redirect') {
    return findRedirectAssembly(pathToFile, contents);
  }

  return contents;
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
  if (contents.compression !== 'gzip' || contents.filename === undefined) {
    throw new Error(
      'Invalid redirect schema: compression must be gzip and filename must exist',
    );
  }
}
