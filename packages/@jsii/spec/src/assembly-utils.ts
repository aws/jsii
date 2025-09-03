import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';

import {
  ALL_TYPESYSTEM_ENFORCED_FEATURES,
  Assembly,
  SPEC_FILE_NAME,
  SPEC_FILE_NAME_COMPRESSED,
} from './assembly';
import {
  AssemblyRedirect,
  isAssemblyRedirect,
  validateAssemblyRedirect,
} from './redirect';
import { validateAssembly } from './validate-assembly';

/**
 * Returns true if the SPEC_FILE_NAME_COMPRESSED file exists in the directory.
 */
export function compressedAssemblyExists(directory: string): boolean {
  return fs.existsSync(path.join(directory, SPEC_FILE_NAME_COMPRESSED));
}

/**
 * Finds the path to the SPEC_FILE_NAME file, which will either
 * be the assembly or hold instructions to find the assembly.
 *
 * @param directory path to a directory with an assembly file
 * @returns path to the SPEC_FILE_NAME file
 */
export function findAssemblyFile(directory: string) {
  const dotJsiiFile = path.join(directory, SPEC_FILE_NAME);

  if (!fs.existsSync(dotJsiiFile)) {
    throw new Error(
      `Expected to find ${SPEC_FILE_NAME} file in ${directory}, but no such file found`,
    );
  }

  return dotJsiiFile;
}

/**
 * Replaces the file where the original assembly file *should* be found with a new assembly file.
 * Detects whether or not there is a compressed assembly, and if there is, compresses the new assembly also.
 * Replaces the fingerprint with '**********' rather than recalculating it, since we have modified the assembly.
 */
export function replaceAssembly(assembly: Assembly, directory: string) {
  writeAssembly(directory, _fingerprint(assembly), {
    compress: compressedAssemblyExists(directory),
  });
}

/**
 * Replaces the old fingerprint with '***********'.
 *
 * We could recalculate the fingerprint here so that it looks like the assembly was not modified. However,
 * 1) we are not actually validating the fingerprint in any way, and
 * 2) it feels disingenuous to have a mechanism against tampering and then tamper with it.
 *
 * So, instead of keeping the old (wrong) fingerprint or spending extra time calculating a new fingerprint,
 * we replace with '**********' that demonstrates the fingerprint has changed.
 */
function _fingerprint(assembly: Assembly): Assembly {
  assembly.fingerprint = '*'.repeat(10);
  return assembly;
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
    fs.writeFileSync(
      path.join(directory, SPEC_FILE_NAME),
      JSON.stringify({
        schema: 'jsii/file-redirect',
        compression: 'gzip',
        filename: SPEC_FILE_NAME_COMPRESSED,
      }),
      'utf-8',
    );

    // write actual assembly contents in .jsii.gz
    fs.writeFileSync(
      path.join(directory, SPEC_FILE_NAME_COMPRESSED),
      zlib.gzipSync(JSON.stringify(assembly)),
    );
  } else {
    fs.writeFileSync(
      path.join(directory, SPEC_FILE_NAME),
      JSON.stringify(assembly, null, 2),
      'utf-8',
    );
  }

  return compress;
}

const failNoReadfileProvided = (filename: string) => {
  throw new Error(
    `Unable to load assembly support file ${JSON.stringify(
      filename,
    )}: no readFile callback provided!`,
  );
};

/**
 * Parses the assembly buffer and, if instructed to, redirects to the
 * compressed assembly buffer.
 *
 * @param assemblyBuffer buffer containing SPEC_FILE_NAME contents
 * @param readFile a callback to use for reading additional support files
 * @param validate whether or not to validate the assembly
 * @param supportedFeatures the set of supported features (default: all features enforced by the type system)
 */
export function loadAssemblyFromBuffer(
  assemblyBuffer: Buffer,
  readFile: (filename: string) => Buffer = failNoReadfileProvided,
  validate = true,
  supportedFeatures: string[] = ALL_TYPESYSTEM_ENFORCED_FEATURES,
): Assembly {
  let contents = JSON.parse(assemblyBuffer.toString('utf-8'));

  // check if the file holds instructions to the actual assembly file
  while (isAssemblyRedirect(contents)) {
    contents = followRedirect(contents, readFile);
  }

  // Do feature checking *before* validating using JSONSchema, and do it always.
  // - In case validation is enabled, feature checking will produce a
  //   more useful error message.
  // - In case validation is disabled, feature checking is cheap and will catch
  //   common problems.
  const unsupported = ((contents as Assembly).usedFeatures ?? []).filter(
    (feat) => !supportedFeatures.includes(feat),
  );
  if (unsupported.length > 0) {
    throw new Error(
      `This jsii tool cannot load the given assembly; using unsupported feature(s): ${unsupported.join(', ')}`,
    );
  }

  return validate ? validateAssembly(contents) : contents;
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
  supportedFeatures?: string[],
): Assembly {
  const assemblyFile = findAssemblyFile(directory);
  return loadAssemblyFromFile(assemblyFile, validate, supportedFeatures);
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
  supportedFeatures?: string[],
): Assembly {
  const data = fs.readFileSync(pathToFile);
  try {
    return loadAssemblyFromBuffer(
      data,
      (filename) => fs.readFileSync(path.resolve(pathToFile, '..', filename)),
      validate,
      supportedFeatures,
    );
  } catch (e: any) {
    throw new Error(`Error loading assembly from file ${pathToFile}:\n${e}`);
  }
}

function followRedirect(
  assemblyRedirect: AssemblyRedirect,
  readFile: (filename: string) => Buffer,
) {
  // Validating the schema, this is cheap (the schema is small).
  validateAssemblyRedirect(assemblyRedirect);

  let data = readFile(assemblyRedirect.filename);
  switch (assemblyRedirect.compression) {
    case 'gzip':
      data = zlib.gunzipSync(data);
      break;
    case undefined:
      break;
    default:
      throw new Error(
        `Unsupported compression algorithm: ${JSON.stringify(
          assemblyRedirect.compression,
        )}`,
      );
  }
  const json = data.toString('utf-8');
  return JSON.parse(json);
}
