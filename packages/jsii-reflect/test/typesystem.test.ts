import fs = require('fs');
import path = require('path');
import { TypeSystem, TypeSystemTree } from '../lib';

let typesys: TypeSystem;

beforeEach(async () => {
  typesys = new TypeSystem();
  await typesys.loadModule(path.dirname(require.resolve('jsii-calc/package.json')));
});

test('TypeSystem.assemblies lists all the loaded assemblies', () => {
  expect(typesys.assemblies.map(a => a.name).sort()).toEqual([
    '@scope/jsii-calc-base',
    '@scope/jsii-calc-base-of-base',
    '@scope/jsii-calc-lib',
    'jsii-calc'
  ]);
});

test('TypeSystem.classes lists all the classes in the typesystem', () => {
  expect(typesys.classes.map(c => c.name).sort()).toEqual([
    'AbstractClass',
    'AbstractClassBase',
    'AbstractClassReturner',
    'Add',
    'AllTypes',
    'AllowedMethodNames',
    'AsyncVirtualMethods',
    'Base',
    'Base',
    'BinaryOperation',
    'Calculator',
    'ClassWithMutableObjectLiteralProperty',
    'ClassWithPrivateConstructorAndAutomaticProperties',
    'CompositeOperation',
    'DefaultedConstructorArgument',
    'Derived',
    'DoNotOverridePrivates',
    'DoNotRecognizeAnyAsOptional',
    'DontComplainAboutVariadicAfterOptional',
    'DoubleTrouble',
    'ExportedBaseClass',
    'Foo',
    'GiveMeStructs',
    'GreetingAugmenter',
    'JSObjectLiteralForInterface',
    'JSObjectLiteralToNative',
    'JSObjectLiteralToNativeClass',
    'JavaReservedWords',
    'JsiiAgent',
    'Multiply',
    'Negate',
    'NodeStandardLibrary',
    'NullShouldBeTreatedAsUndefined',
    'Number',
    'NumberGenerator',
    'ObjectRefsInCollections',
    'Operation',
    'OptionalConstructorArgument',
    'OverrideReturnsObject',
    'Polymorphism',
    'Power',
    'ReferenceEnumFromScopedPackage',
    'ReturnsPrivateImplementationOfInterface',
    'RuntimeTypeChecking',
    'Statics',
    'Sum',
    'SyncVirtualMethods',
    'Thrower',
    'UnaryOperation',
    'UseBundledDependency',
    'UseCalcBase',
    'UsesInterfaceWithProperties',
    'Value',
    'VariadicMethod',
    'Very',
    'VirtualMethodPlayground'
  ]);
});

test('TypeSystemTree can be used to visualize the entire type system', async () => {
  const tree = new TypeSystemTree(typesys, { showAll: true, colors: false });
  const expected = fs.readFileSync(path.join(__dirname, 'tree.expected.txt')).toString();
  const actual = tree.toString();
  fs.writeFileSync('actual.txt', actual);
  expect(actual).toEqual(expected);
});

test('findClass', async () => {
  const calc = typesys.findClass('jsii-calc.Calculator');
  const actual = new Array<string>();
  calc.getMethods(/* inherited */ true).forEach(method => {
    actual.push(`${method.name} from ${method.parentType.name}`);
  });

  expect(actual).toEqual([
    "typeName from Base",
    "toString from Value",
    "toString from Operation",
    "toString from CompositeOperation",
    "add from Calculator",
    "mul from Calculator",
    "neg from Calculator",
    "pow from Calculator",
    "readUnionValue from Calculator"
  ]);
});