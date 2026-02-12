const Ajv = require('ajv');
const standaloneCode = require('ajv/dist/standalone').default;
const { readFileSync, writeFileSync } = require('fs');

const ajv = new Ajv({ code: { source: true, esm: false }, allErrors: true });

// Load and compile schemas
const assemblySchema = JSON.parse(readFileSync('schema/jsii-spec.schema.json', 'utf8'));
const redirectSchema = JSON.parse(readFileSync('schema/assembly-redirect.schema.json', 'utf8'));

ajv.addSchema(assemblySchema, 'assembly');
ajv.addSchema(redirectSchema, 'redirect');

// Generate standalone code
const code = standaloneCode(ajv, {
  validateAssembly: 'assembly',
  validateRedirect: 'redirect',
});

writeFileSync('lib/validators.js', code);
console.log('Generated lib/validators.js');
