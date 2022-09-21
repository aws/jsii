const fs = require('fs');
const path = require('path');

const resources = discoverResources();
const entryPoint = 'bin/jsii-runtime.js';

process.stdout.write(`package software.amazon.jsii;

import static software.amazon.jsii.Util.extractResource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@javax.annotation.Generated(value = "${path.basename(
  __filename,
)}", date = "${new Date().toISOString()}")
final class BundledRuntime {
    /**
     * Extracts all files needed for jsii-runtime.js from JAR into a temporary
     * directory.
     *
     * @param klass the {@link Class} that requests the extraction (it will be
     *              used to determine the appropriate {@link ClassLoader})
     *
     * @return The full path for jsii-runtime.js
     */
    static String extract(final Class<?> klass) {
        try {
            final Path directory = Files.createTempDirectory("jsii-java-runtime");
            directory.toFile().deleteOnExit();

${resources.map(extractResource).map(indent(12)).join('\n')}

            return entrypoint.toString();
        } catch (final IOException ioe) {
            throw new JsiiError("Unable to extract bundled @jsii/runtime library", ioe);
        }
    }

    private BundledRuntime() {}
}
`);

function discoverResources(
  root = path.resolve(
    __dirname,
    'project',
    'src',
    'main',
    'resources',
    'software',
    'amazon',
    'jsii',
  ),
  dir = '.',
) {
  const result = [];

  for (const file of fs.readdirSync(path.resolve(root, dir))) {
    // Ignore dot-files
    if (file.startsWith('.')) {
      continue;
    }
    const stat = fs.statSync(path.resolve(root, dir, file));
    if (stat.isDirectory()) {
      result.push(...discoverResources(root, path.join(dir, file)));
      continue;
    }
    result.push(path.join(dir, file));
  }

  return result;
}

function extractResource(name) {
  const call = `extractResource(klass, "${name}", directory)`;

  if (name === entryPoint) {
    return [
      `final Path entrypoint = ${call};`,
      `entrypoint.toFile().deleteOnExit();`,
    ].join('\n');
  } else {
    return `${call}.toFile().deleteOnExit();`;
  }
}

function indent(count) {
  const spaces = ' '.repeat(count);
  return (str) => str.replace(/^/gm, spaces);
}
