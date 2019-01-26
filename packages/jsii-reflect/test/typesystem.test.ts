import path = require('path');
import { TypeSystem } from '../lib';
import { diffTest } from './util';

let typesys: TypeSystem;

beforeEach(async () => {
  typesys = new TypeSystem();
  await typesys.loadModule(resolveModuleDir('jsii-calc'));
});

test('TypeSystem.assemblies lists all the loaded assemblies', () => {
  diffTest(typesys.assemblies.map(a => a.name).sort().join('\n'), 'assemblies.expected.txt');
});

test('TypeSystem.classes lists all the classes in the typesystem', () => {
  diffTest(typesys.classes.map(c => c.name).sort().join('\n'), 'classes.expected.txt');
});

test('findClass', async () => {
  const calc = typesys.findClass('jsii-calc.Calculator');
  const actual = new Array<string>();
  calc.getMethods(/* inherited */ true).forEach(method => {
    actual.push(`${method.name} from ${method.parentType.name}`);
  });

  await diffTest(actual.join('\n'), 'findClass.expected.txt');
});

test('"roots" is a list of the directly loaded assemblies', async () => {
  expect(typesys.roots.length).toBe(1);
  expect(typesys.roots[0]).toBe(typesys.findAssembly('jsii-calc'));

  // now load another assembliy directly
  await typesys.load(resolveModuleDir('@scope/jsii-calc-lib'));
  expect(typesys.roots.length).toBe(2);
});

function resolveModuleDir(name: string) {
  return path.dirname(require.resolve(`${name}/package.json`));
}