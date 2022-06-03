import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as zlib from 'zlib';

export const SPEC_FILE_NAME = spec.SPEC_FILE_NAME;
export const SPEC_FILE_NAME_COMPRESSED = spec.SPEC_FILE_NAME_COMPRESSED;

/**
 * Finds the path to the assembly file, which will be
 * '.jsii' if uncompressed and '.jsii.gz' if compressed.
 *
 * @param directory path to a directory with an assembly file
 * @returns path to the assembly file
 */
export function getAssemblyFile(directory: string) {
  const compressedJsiiFile = path.join(directory, SPEC_FILE_NAME_COMPRESSED);
  const compressedJsiiExists = fs.existsSync(compressedJsiiFile);

  const uncompressedJsiiFile = path.join(directory, SPEC_FILE_NAME);
  const uncompressedJsiiExists = fs.existsSync(uncompressedJsiiFile);

  if (!compressedJsiiExists && !uncompressedJsiiExists) {
    throw new Error(
      `No ${SPEC_FILE_NAME} or ${SPEC_FILE_NAME_COMPRESSED} assembly file was found at ${directory}`,
    );
  }

  return compressedJsiiExists ? compressedJsiiFile : uncompressedJsiiFile;
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
 * Loads the assembly file and unzips compressed assemblies.
 *
 * @param directory the directory of the assembly file
 * @returns the assembly file as json
 */
export function loadAssemblyFromPath(directory: string) {
  const assemblyFile = getAssemblyFile(directory);
  return loadAssemblyFromFile(assemblyFile);
}

/**
 * Loads the assembly file and unzips compressed assemblies.
 *
 * @param pathToFile the path to the assembly file
 * @returns the assembly file as json
 */
export function loadAssemblyFromFile(pathToFile: string) {
  const extname = path.extname(pathToFile);
  if (extname === '.gz') {
    return readZippedAssembly(pathToFile);
  } else if (extname === '') {
    return readAssembly(pathToFile);
  }

  throw new Error(
    `Assembly file must be named ${SPEC_FILE_NAME} or ${SPEC_FILE_NAME_COMPRESSED} but got ${path.basename(
      pathToFile,
    )}`,
  );
}

function readAssembly(pathToFile: string) {
  return fs.readJsonSync(pathToFile, {
    encoding: 'utf-8',
  });
}

function readZippedAssembly(pathToFile: string) {
  return JSON.parse(zlib.gunzipSync(fs.readFileSync(pathToFile)).toString());
}
