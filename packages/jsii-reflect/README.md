# jsii-reflect: strongly-type reflection library and tools for jsii

**jsii-reflect** providers a reflection API for jsii type systems. It consumes
`.jsii` manifest files (either directly or by traversing a closure of npm
modules) and creates an in-memory object model that allows exploring the type
system via a strongly-typed API.

## Installation

Install the npm module:

```console
$ npm i jsii-reflect
```

Import the `TypeSystem` class:

```ts
import { TypeSystem } from 'jsii-reflect';
```

## Loading Assemblies

Create a `TypeSystem`:

```ts
const typesystem = new TypeSystem();
```

Now, we want to load assemblies into the type system via the `typesystem.load()`
method.

You can either pass in a path to a `.jsii` file, in which case you will have to
eventually load the .jsii files of all the dependencies.

```ts
typesystem.load('jsii-calc/.jsii');
typesystem.load('jsii-calc-lib/.jsii');
typesystem.load('jsii-calc-base/.jsii');
typesystem.load('jsii-calc-base-of-base/.jsii');
```

Or, you can point `load` to an npm module's directory, in which case the loader
will transitively load all dependent modules:

```ts
// will automatically bring in all dependencies
typesystem.load('jsii-calc');
```

## Reflecting on the Type System

Now that your `TypeSystem` is loaded with assemblies, you can use the APIs to
query and reflect on the types.

For example:

```ts
const calc = typesystem.findClass('jsii-calc.Calculator');

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
```

## jsii-tree

jsii-tree is a command-line tool which can be used to print an ASCII tree of
a jsii type system:

```console
$ jsii-tree jsii-calc
assemblies
 ├─┬ jsii-calc
 │ └─┬ types
 │   ├── AbstractClass class
 │   ├── AbstractClassBase class
 │   ├── AbstractClassReturner class
 │   ├── Add class
 │   ├── AllTypes class
 │   ├── AllowedMethodNames class
 │   ├── AsyncVirtualMethods class
 │   ├── BinaryOperation class
 │   ├── Calculator class
 │   ├── ClassWithMutableObjectLiteralProperty class
 │   ├── ClassWithPrivateConstructorAndAutomaticProperties class
 │   ├── DefaultedConstructorArgument class
 │   ├── Base class
 │   ├── Derived class
 │   ├── DoNotOverridePrivates class
 │   ├── DoNotRecognizeAnyAsOptional class
 │   ├── DontComplainAboutVariadicAfterOptional class
 │   ├── DoubleTrouble class
 │   ├── ExportedBaseClass class
 │   ├── GiveMeStructs class
 │   ├── GreetingAugmenter class
 │   ├── Foo class
 │   ├── JSObjectLiteralForInterface class
 │   ├── JSObjectLiteralToNative class
 │   ├── JSObjectLiteralToNativeClass class
 │   ├── JavaReservedWords class
 │   ├── JsiiAgent class
 │   ├── Multiply class
 │   ├── Negate class
 │   ├── NodeStandardLibrary class
 │   ├── NullShouldBeTreatedAsUndefined class
 │   ├── NumberGenerator class
 │   ├── ObjectRefsInCollections class
 │   ├── OptionalConstructorArgument class
 │   ├── OverrideReturnsObject class
 │   ├── Polymorphism class
 │   ├── Power class
 │   ├── ReferenceEnumFromScopedPackage class
 │   ├── ReturnsPrivateImplementationOfInterface class
 │   ├── RuntimeTypeChecking class
 │   ├── Statics class
 │   ├── Sum class
 │   ├── SyncVirtualMethods class
 │   ├── Thrower class
 │   ├── UnaryOperation class
 │   ├── UseBundledDependency class
 │   ├── UseCalcBase class
 │   ├── UsesInterfaceWithProperties class
 │   ├── VariadicMethod class
 │   ├── VirtualMethodPlayground class
 │   ├── CompositeOperation class
 │   ├── CalculatorProps interface
 │   ├── DerivedStruct interface
 │   ├── IFriendlier interface
 │   ├── IFriendlyRandomGenerator interface
 │   ├── IInterfaceThatShouldNotBeADataType interface
 │   ├── IInterfaceWithMethods interface
 │   ├── IInterfaceWithOptionalMethodArguments interface
 │   ├── IPrivatelyImplemented interface
 │   ├── IRandomNumberGenerator interface
 │   ├── IReturnsNumber interface
 │   ├── ImplictBaseOfBase interface
 │   ├── IInterfaceImplementedByAbstractClass interface
 │   ├── Hello interface
 │   ├── Hello interface
 │   ├── InterfaceWithProperties interface
 │   ├── InterfaceWithPropertiesExtension interface
 │   ├── LoadBalancedFargateServiceProps interface
 │   ├── MutableObjectLiteral interface
 │   ├── NullShouldBeTreatedAsUndefinedData interface
 │   ├── UnionProperties interface
 │   ├── AllTypesEnum enum
 │   ├── StringEnum enum
 │   └── CompositionStringStyle enum
 ├─┬ @scope/jsii-calc-base
 │ └─┬ types
 │   ├── Base class
 │   └── BaseProps interface
 ├─┬ @scope/jsii-calc-base-of-base
 │ └─┬ types
 │   ├── Very class
 │   └── VeryBaseProps interface
 └─┬ @scope/jsii-calc-lib
   └─┬ types
     ├── Number class
     ├── Operation class
     ├── Value class
     ├── IDoublable interface
     ├── IFriendly interface
     ├── MyFirstStruct interface
     ├── StructWithOnlyOptionals interface
     └── EnumFromScopedModule enum
```

See `jsii-tree --help` for options.

## License

Distributed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

See [LICENSE](./LICENSE) and [NOTICE](./NOTICE) for more information.
