const Ajv = require('ajv');
const standaloneCode = require('ajv/dist/standalone').default;
const esbuild = require('esbuild');
const { readFileSync, writeFileSync } = require('fs');

const ajv = new Ajv({ code: { source: true, esm: false }, allErrors: true });

// Load and compile schemas
const assemblySchema = JSON.parse(readFileSync('schema/jsii-spec.schema.json', 'utf8'));
const redirectSchema = JSON.parse(readFileSync('schema/assembly-redirect.schema.json', 'utf8'));

ajv.addSchema(assemblySchema, 'assembly');
ajv.addSchema(redirectSchema, 'redirect');

// Generate standalone code and bundle to inline ajv runtime dependencies
const code = standaloneCode(ajv, {
  validateAssembly: 'assembly',
  validateRedirect: 'redirect',
});

const result = esbuild.buildSync({
  stdin: { contents: code, resolveDir: __dirname },
  bundle: true,
  platform: 'node',
  format: 'cjs',
  write: false,
  minify: true,
});

writeFileSync('lib/validators.js', result.outputFiles[0].text);
console.log('Generated lib/validators.js');
