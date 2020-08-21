import {
  Assembly,
  SchemaVersion,
  TypeReference,
  PrimitiveType,
  CollectionKind,
} from '@jsii/spec';
import {
  toTypeName,
  NamingContext,
  PythonImports,
} from '../../../lib/targets/python/type-name';

const BORING_TYPE = 'BoringClass';
const NESTED_TYPE = 'NestedType';
const SUBMODULE_TYPE = 'SubmoduleType';
const SUBMODULE_NESTED_TYPE = 'SubmoduleNested';
const OTHER_SUBMODULE_TYPE = 'OtherType';

const LOCAL_MODULE = 'local_module_name';
const REMOTE_MODULE = 'remote_module_name';

const assembly: Assembly = {
  schema: SchemaVersion.LATEST,
  name: '@foo/bar',
  version: '1.2.3',
  dependencyClosure: {
    '@remote/classes': {
      submodules: {
        '@remote/classes.nested': {
          targets: { python: { module: `${REMOTE_MODULE}.submodule` } },
        },
      },
      targets: { python: { module: REMOTE_MODULE } },
    },
  },
  targets: { python: { module: LOCAL_MODULE } },
  types: {
    [`@foo/bar.${BORING_TYPE}`]: {
      fqn: `@foo/bar.${BORING_TYPE}`,
    },
    [`@foo/bar.${BORING_TYPE}.${NESTED_TYPE}`]: {
      fqn: `@foo/bar.${BORING_TYPE}.${NESTED_TYPE}`,
      namespace: BORING_TYPE,
    },
    [`@foo/bar.submodule.${SUBMODULE_TYPE}`]: {
      fqn: `@foo/bar.submodule.${SUBMODULE_TYPE}`,
      namespace: 'submodule',
    },
    [`@foo/bar.submodule.${SUBMODULE_TYPE}.${SUBMODULE_NESTED_TYPE}`]: {
      fqn: `@foo/bar.submodule.${SUBMODULE_TYPE}.${SUBMODULE_NESTED_TYPE}`,
      namespace: `submodule.${SUBMODULE_TYPE}`,
    },
    [`@foo/bar.other.${OTHER_SUBMODULE_TYPE}`]: {
      fqn: `@foo/bar.other.${OTHER_SUBMODULE_TYPE}`,
      namespace: 'other',
    },
  },
} as any;

describe(toTypeName, () => {
  type Example = {
    /** The name of the example */
    readonly name: string;
    /** The TypeReference to pass in to toTypeName */
    readonly input: TypeReference | undefined;
    /** The expected python name of the type */
    readonly pythonType: string;
    /** The optional version of the type's name (if not provided, typing.Optional[<pythonType>]) */
    readonly optionalPythonType?: string;
    /** The required imports for this python type (if not provided, none) */
    readonly requiredImports?: PythonImports;
    /** The submodule from which to generate names (if not provided, the root submodule) */
    readonly inSubmodule?: string;
    /** The nesting context in which to generate names (if not provided, none) */
    readonly inNestingContext?: string;
  };

  const examples: readonly Example[] = [
    // ################################## NONE #################################
    {
      name: 'None',
      input: undefined,
      pythonType: 'None',
    },
    // ############################ PRIMITIVE TYPES ############################
    {
      name: 'Primitive: Boolean',
      input: { primitive: PrimitiveType.Boolean },
      pythonType: 'builtins.bool',
    },
    {
      name: 'Primitive: Date',
      input: { primitive: PrimitiveType.Date },
      pythonType: 'datetime.datetime',
    },
    {
      name: 'Primitive: Number',
      input: { primitive: PrimitiveType.Number },
      pythonType: 'jsii.Number',
    },
    {
      name: 'Primitive: String',
      input: { primitive: PrimitiveType.String },
      pythonType: 'builtins.str',
    },
    {
      name: 'Primitive: JSON',
      input: { primitive: PrimitiveType.Json },
      pythonType: 'typing.Mapping[typing.Any, typing.Any]',
    },
    {
      name: 'Primitive: Any',
      input: { primitive: PrimitiveType.Any },
      pythonType: 'typing.Any',
      optionalPythonType: 'typing.Any',
    },
    // ############################## COLLECTIONS ##############################
    {
      name: 'Array',
      input: {
        collection: {
          kind: CollectionKind.Array,
          elementtype: { primitive: PrimitiveType.String },
        },
      },
      pythonType: 'typing.List[builtins.str]',
    },
    {
      name: 'Map',
      input: {
        collection: {
          kind: CollectionKind.Map,
          elementtype: { primitive: PrimitiveType.String },
        },
      },
      pythonType: 'typing.Mapping[builtins.str, builtins.str]',
    },
    // ############################## TYPE UNIONS ##############################
    {
      name: 'Union',
      input: {
        union: {
          types: [
            { primitive: PrimitiveType.String },
            { primitive: PrimitiveType.Number },
          ],
        },
      },
      pythonType: 'typing.Union[builtins.str, jsii.Number]',
    },
    // ############################### USER TYPES ##############################
    {
      name: 'User Type (Foreign)',
      input: { fqn: '@remote/classes.FancyClass' },
      pythonType: `${REMOTE_MODULE}.FancyClass`,
      requiredImports: { [REMOTE_MODULE]: new Set(['']) },
    },
    {
      name: 'User Type (Foreign, Submodule)',
      input: { fqn: '@remote/classes.nested.SubmoduledType' },
      pythonType: `${REMOTE_MODULE}.submodule.SubmoduledType`,
      requiredImports: { [`${REMOTE_MODULE}.submodule`]: new Set(['']) },
    },
    {
      name: 'User Type (Local)',
      input: { fqn: `${assembly.name}.BoringClass` },
      pythonType: '"BoringClass"',
    },
    {
      name: 'User Type (Local, Nested)',
      input: { fqn: `${assembly.name}.${BORING_TYPE}.${NESTED_TYPE}` },
      pythonType: '"BoringClass.NestedType"',
    },
    {
      name: 'User Type (Local, Submodule)',
      input: { fqn: `${assembly.name}.submodule.${SUBMODULE_TYPE}` },
      pythonType: `_${SUBMODULE_TYPE}_72dbc9ef`,
      requiredImports: {
        '.submodule': new Set([
          `${SUBMODULE_TYPE} as _${SUBMODULE_TYPE}_72dbc9ef`,
        ]),
      },
    },
    {
      name: 'User Type (Local, Submodule, Nested)',
      input: {
        fqn: `${assembly.name}.submodule.${SUBMODULE_TYPE}.${SUBMODULE_NESTED_TYPE}`,
      },
      pythonType: `_${SUBMODULE_TYPE}_72dbc9ef.${SUBMODULE_NESTED_TYPE}`,
      requiredImports: {
        '.submodule': new Set([
          `${SUBMODULE_TYPE} as _${SUBMODULE_TYPE}_72dbc9ef`,
        ]),
      },
    },
    {
      name: 'User Type (Local, Nested)',
      input: {
        fqn: `${assembly.name}.submodule.${SUBMODULE_TYPE}.${SUBMODULE_NESTED_TYPE}`,
      },
      pythonType: `"${SUBMODULE_NESTED_TYPE}"`,
      inSubmodule: `${assembly.name}.submodule`,
      inNestingContext: `${assembly.name}.submodule.${SUBMODULE_TYPE}`,
    },
    {
      name: 'User Type (Local, Parent)',
      input: { fqn: `${assembly.name}.other.${OTHER_SUBMODULE_TYPE}` },
      pythonType: `_${OTHER_SUBMODULE_TYPE}_78b5948e`,
      requiredImports: {
        '..other': new Set([
          `${OTHER_SUBMODULE_TYPE} as _${OTHER_SUBMODULE_TYPE}_78b5948e`,
        ]),
      },
      inSubmodule: `${assembly.name}.submodule`,
    },
  ];

  for (const example of examples) {
    const context: NamingContext = {
      assembly,
      submodule: example.inSubmodule ?? assembly.name,
      nestingScope: example.inNestingContext,
    };

    describe(example.name, () => {
      const typeName = toTypeName(example.input);

      test('typeName.pythonType(context)', () => {
        expect(typeName.pythonType(context)).toBe(example.pythonType);
      });

      test('typeName.requiredImports(context)', () => {
        expect(typeName.requiredImports(context)).toEqual(
          example.requiredImports ?? {},
        );
      });
    });

    // None + Optional is meaningless!
    if (example.input == null) {
      continue;
    }

    describe(`${example.name} + Optional`, () => {
      const typeName = toTypeName({ type: example.input!, optional: true });

      test('typeName.pythonType(context)', () => {
        expect(typeName.pythonType(context)).toBe(
          example.optionalPythonType ??
            `typing.Optional[${example.pythonType}]`,
        );
      });

      test('typeName.requiredImports(context)', () => {
        expect(typeName.requiredImports(context)).toEqual(
          example.requiredImports ?? {},
        );
      });
    });
  }
});
