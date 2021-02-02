const fs = require('fs');
const path = require('path');

const { version } = require('./package.json');

const resources = discoverResources();
const entryPoint = 'bin/jsii-runtime.js';

process.stdout.write(`using System.CodeDom.Compiler;
using System.Reflection;

namespace Amazon.JSII.Runtime.Services
{
    [GeneratedCode("${path.basename(__filename)}", "${version}")]
    internal sealed class JsiiRuntimeProvider : IJsiiRuntimeProvider
    {
        private const string BAG_NAME = "jsii-runtime";

        public JsiiRuntimeProvider(IResourceExtractor resourceExtractor)
        {
            // deploy embedded resources to the temp directory
            var assembly = Assembly.GetExecutingAssembly();

${resources.map(extractResource).map(indent(12)).join('\n')}
        }

        public string JsiiRuntimePath { get; }
    }
}
`);

function discoverResources(
  root = path.resolve(__dirname, 'src', 'Amazon.JSII.Runtime', 'jsii-runtime'),
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
  const parts = name.split(/[\\/]/);
  for (let i = 0; i < parts.length - 1; i++) {
    // Replacing - with _ in directory names
    parts[i] = parts[i].replace(/-/m, '_');
  }

  // Resource names are "."-delimited (and not "/"-delimited)
  const resourceName = `Amazon.JSII.Runtime.jsii_runtime.${parts.join('.')}`;

  const extract = `resourceExtractor.ExtractResource(assembly, "${resourceName}", BAG_NAME, "${name}");`;

  if (name === entryPoint) {
    return `JsiiRuntimePath = ${extract}`;
  } else {
    return extract;
  }
}

function indent(count) {
  const spaces = ' '.repeat(count);
  return (str) =>
    str
      .split('\n')
      .map((x) => `${spaces}${x}`)
      .join('\n');
}

function quote(x) {
  return `"${x}"`;
}
