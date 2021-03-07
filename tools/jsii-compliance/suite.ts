import * as schema from './schema';

export const suite: schema.Suite = {
  name: 'standard',
  description:
    'JSII standard compliance test suite. These tests must be implemented in each language binding.',
  bindings: {
    java: {
      report: 'packages/@jsii/java-runtime-test/project/compliance-report.json',
    },
    golang: {
      report: 'packages/@jsii/go-runtime-test/project/compliance-report.json',
    },
    dotnet: {
      report: 'packages/@jsii/dotnet-runtime-test/compliance-report.json',
    },
    python: {
      report: 'packages/@jsii/python-runtime-test/compliance-report.json',
    },
  },
  exclusions: {
    dotnet: {
      reason:
        'Underwent a different compliance process. Will be aligned in the future.',
    },
    python: {
      reason:
        'Underwent a different compliance process. Will be aligned in the future.',
    },
  },
  testCases: [
    {
      name: 'asyncOverrides_overrideCallsSuper',
      description: '',
      exclusions: {},
    },
    {
      name: 'arrayReturnedByMethodCanBeRead',
      description:
        'Array created in the kernel can be queried for its elements',
      exclusions: {},
    },
    {
      name: 'unionProperties',
      description:
        'Kernal values that accept a union type can be set, and are returned with the concrete type',
      exclusions: {},
    },
    {
      name: 'syncOverrides',
      description: '',
      exclusions: {},
    },
    {
      name: 'useEnumFromScopedModule',
      description:
        'Property that accepts an enum type from a third-party package can be set, and read',
      exclusions: {},
    },
    {
      name: 'createObjectAndCtorOverloads',
      description:
        'Class can be instantiated with empty and non empty constructor',
      exclusions: {
        golang: {
          reason:
            'Golang does not have overloaded functions so the genearated class only has a single New function.',
        },
      },
    },
    {
      name: 'fail_syncOverrides_callsDoubleAsync_method',
      description: '',
      exclusions: {},
    },
    {
      name: 'collectionOfInterfaces_MapOfStructs',
      description: '',
      exclusions: {},
    },
    {
      name: 'asyncOverrides_overrideAsyncMethod',
      description: '',
      exclusions: {},
    },
    {
      name: 'statics',
      description:
        'Static functions can be invoked and accept and return the correct type',
      exclusions: {},
    },
    {
      name: 'structs_returnedLiteralEqualsNativeBuilt',
      description: '',
      exclusions: {},
    },
    {
      name: 'classesCanSelfReferenceDuringClassInitialization',
      description: '',
      exclusions: {},
    },
    {
      name: 'canObtainStructReferenceWithOverloadedSetter',
      description: '',
      exclusions: {},
    },
    {
      name: 'callbacksCorrectlyDeserializeArguments',
      description: '',
      exclusions: {},
    },
    {
      name: 'canUseInterfaceSetters',
      description: '',
      exclusions: {},
    },
    {
      name: 'propertyOverrides_interfaces',
      description: '',
      exclusions: {},
    },
    {
      name: 'syncOverrides_callsSuper',
      description: '',
      exclusions: {},
    },
    {
      name: 'testJsiiAgent',
      description: '',
      exclusions: {},
    },
    {
      name: 'doNotOverridePrivates_method_private',
      description: '',
      exclusions: {},
    },
    {
      name: 'pureInterfacesCanBeUsedTransparently',
      description: '',
      exclusions: {},
    },
    {
      name: 'nullShouldBeTreatedAsUndefined',
      description: '',
      exclusions: {},
    },
    {
      name: 'primitiveTypes',
      description:
        'All Primitive types are set and read with their respective types',
      exclusions: {},
    },
    {
      name: 'reservedKeywordsAreSlugifiedInClassProperties',
      description: '',
      exclusions: {},
    },
    {
      name: 'objectIdDoesNotGetReallocatedWhenTheConstructorPassesThisOut',
      description: '',
      exclusions: {},
    },
    {
      name: 'interfaceBuilder',
      description: '',
      exclusions: {},
    },
    {
      name: 'unionTypes',
      description: '',
      exclusions: {},
    },
    {
      name: 'arrays',
      description: '',
      exclusions: {},
    },
    {
      name: 'staticMapInClassCannotBeModified',
      description: '',
      exclusions: {},
    },
    {
      name: 'consts',
      description: '',
      exclusions: {},
    },
    {
      name: 'pureInterfacesCanBeUsedTransparently_WhenTransitivelyImplementing',
      description: '',
      exclusions: {},
    },
    {
      name: 'reservedKeywordsAreSlugifiedInMethodNames',
      description: '',
      exclusions: {},
    },
    {
      name: 'exceptions',
      description: '',
      exclusions: {},
    },
    {
      name: 'testLiteralInterface',
      description: '',
      exclusions: {},
    },
    {
      name: 'structs_nonOptionalhashCode',
      description: '',
      exclusions: {},
    },
    {
      name: 'propertyOverrides_set_throws',
      description: '',
      exclusions: {},
    },
    {
      name: 'canLeverageIndirectInterfacePolymorphism',
      description: '',
      exclusions: {},
    },
    {
      name: 'fluentApi',
      description: '',
      exclusions: {},
    },
    {
      name: 'staticListInClassCanBeReadCorrectly',
      description: '',
      exclusions: {},
    },
    {
      name: 'mapReturnedByMethodCannotBeModified',
      description: '',
      exclusions: {},
    },
    {
      name: 'receiveInstanceOfPrivateClass',
      description: '',
      exclusions: {},
    },
    {
      name: 'staticMapInClassCanBeReadCorrectly',
      description: '',
      exclusions: {},
    },
    {
      name: 'testNativeObjectsWithInterfaces',
      description: '',
      exclusions: {},
    },
    {
      name: 'doNotOverridePrivates_property_getter_public',
      description: '',
      exclusions: {},
    },
    {
      name: 'equalsIsResistantToPropertyShadowingResultVariable',
      description: '',
      exclusions: {},
    },
    {
      name: 'listInClassCanBeReadCorrectly',
      description: '',
      exclusions: {},
    },
    {
      name: 'useNestedStruct',
      description: '',
      exclusions: {},
    },
    {
      name: 'testFluentApiWithDerivedClasses',
      description: '',
      exclusions: {},
    },
    {
      name: 'interfacesCanBeUsedTransparently_WhenAddedToJsiiType',
      description: '',
      exclusions: {},
    },
    {
      name: 'canOverrideProtectedGetter',
      description: '',
      exclusions: {},
    },
    {
      name: 'getAndSetEnumValues',
      description: '',
      exclusions: {},
    },
    {
      name: 'structs_nonOptionalequals',
      description: '',
      exclusions: {},
    },
    {
      name: 'testInterfaceParameter',
      description: '',
      exclusions: {},
    },
    {
      name: 'liftedKwargWithSameNameAsPositionalArg',
      description: '',
      exclusions: {},
    },
    {
      name: 'creationOfNativeObjectsFromJavaScriptObjects',
      description: '',
      exclusions: {},
    },
    {
      name: 'canOverrideProtectedMethod',
      description: '',
      exclusions: {},
    },
    {
      name: 'canLoadEnumValues',
      description: '',
      exclusions: {},
    },
    {
      name: 'eraseUnsetDataValues',
      description: '',
      exclusions: {},
    },
    {
      name: 'maps',
      description: '',
      exclusions: {},
    },
    {
      name: 'structs_containsNullChecks',
      description: '',
      exclusions: {},
    },
    {
      name: 'canOverrideProtectedSetter',
      description: '',
      exclusions: {},
    },
    {
      name: 'asyncOverrides_callAsyncMethod',
      description: '',
      exclusions: {},
    },
    {
      name: 'nodeStandardLibrary',
      description: '',
      exclusions: {},
    },
    {
      name: 'dates',
      description: '',
      exclusions: {},
    },
    {
      name: 'collectionOfInterfaces_ListOfStructs',
      description: '',
      exclusions: {},
    },
    {
      name: 'objRefsAreLabelledUsingWithTheMostCorrectType',
      description: '',
      exclusions: {},
    },
    {
      name: 'unionPropertiesWithBuilder',
      description: '',
      exclusions: {},
    },
    {
      name: 'doNotOverridePrivates_property_getter_private',
      description: '',
      exclusions: {},
    },
    {
      name: 'structs_withDiamondInheritance_correctlyDedupeProperties',
      description: '',
      exclusions: {},
    },
    {
      name: 'abstractMembersAreCorrectlyHandled',
      description: '',
      exclusions: {},
    },
    {
      name: 'doNotOverridePrivates_property_by_name_private',
      description: '',
      exclusions: {},
    },
    {
      name: 'testNullIsAValidOptionalMap',
      description: '',
      exclusions: {},
    },
    {
      name: 'mapReturnedByMethodCanBeRead',
      description: '',
      exclusions: {},
    },
    {
      name: 'structs_multiplePropertiesEquals',
      description: '',
      exclusions: {},
    },
    {
      name: 'mapInClassCanBeReadCorrectly',
      description: '',
      exclusions: {},
    },
    {
      name: 'staticListInClassCannotBeModified',
      description: '',
      exclusions: {},
    },
    {
      name: 'collectionOfInterfaces_MapOfInterfaces',
      description: '',
      exclusions: {},
    },
    {
      name: 'asyncOverrides_overrideThrows',
      description: '',
      exclusions: {},
    },
    {
      name: 'callMethods',
      description: '',
      exclusions: {},
    },
    {
      name: 'returnAbstract',
      description: '',
      exclusions: {},
    },
    {
      name: 'dynamicTypes',
      description: '',
      exclusions: {},
    },
    {
      name: 'hashCodeIsResistantToPropertyShadowingResultVariable',
      description: '',
      exclusions: {},
    },
    {
      name: 'returnSubclassThatImplementsInterface976',
      description: '',
      exclusions: {},
    },
    {
      name: 'structs_optionalEquals',
      description: '',
      exclusions: {},
    },
    {
      name: 'propertyOverrides_get_calls_super',
      description: '',
      exclusions: {},
    },
    {
      name: 'unmarshallIntoAbstractType',
      description: '',
      exclusions: {},
    },
    {
      name: 'structs_multiplePropertiesHashCode',
      description: '',
      exclusions: {},
    },
    {
      name: 'fail_syncOverrides_callsDoubleAsync_propertyGetter',
      description: '',
      exclusions: {},
    },
    {
      name: 'propertyOverrides_get_set',
      description: '',
      exclusions: {},
    },
    {
      name: 'variadicMethodCanBeInvoked',
      description: '',
      exclusions: {},
    },
    {
      name: 'collectionTypes',
      description: '',
      exclusions: {},
    },
    {
      name: 'asyncOverrides_overrideAsyncMethodByParentClass',
      description: '',
      exclusions: {},
    },
    {
      name: 'structs_optionalHashCode',
      description: '',
      exclusions: {},
    },
    {
      name: 'testStructsCanBeDowncastedToParentType',
      description: '',
      exclusions: {},
    },
    {
      name: 'propertyOverrides_get_throws',
      description: '',
      exclusions: {},
    },
    {
      name: 'getSetPrimitiveProperties',
      description: '',
      exclusions: {},
    },
    {
      name: 'getAndSetNonPrimitiveProperties',
      description: '',
      exclusions: {},
    },
    {
      name: 'reservedKeywordsAreSlugifiedInStructProperties',
      description: '',
      exclusions: {},
    },
    {
      name: 'fail_syncOverrides_callsDoubleAsync_propertySetter',
      description: '',
      exclusions: {},
    },
    {
      name: 'doNotOverridePrivates_method_public',
      description: '',
      exclusions: {},
    },
    {
      name: 'testNullIsAValidOptionalList',
      description: '',
      exclusions: {},
    },
    {
      name: 'mapInClassCannotBeModified',
      description: '',
      exclusions: {},
    },
    {
      name: 'doNotOverridePrivates_property_by_name_public',
      description: '',
      exclusions: {},
    },
    {
      name: 'asyncOverrides_twoOverrides',
      description: '',
      exclusions: {},
    },
    {
      name: 'propertyOverrides_set_calls_super',
      description: '',
      exclusions: {},
    },
    {
      name: 'iso8601DoesNotDeserializeToDate',
      description: '',
      exclusions: {},
    },
    {
      name: 'collectionOfInterfaces_ListOfInterfaces',
      description: '',
      exclusions: {},
    },
    {
      name: 'undefinedAndNull',
      description: '',
      exclusions: {},
    },
    {
      name: 'structs_serializeToJsii',
      description: '',
      exclusions: {},
    },
    {
      name: 'structsAreUndecoratedOntheWayToKernel',
      description: '',
      exclusions: {},
    },
    {
      name: 'canObtainReferenceWithOverloadedSetter',
      description: '',
      exclusions: {},
    },
    {
      name: 'testJSObjectLiteralToNative',
      description: '',
      exclusions: {},
    },
    {
      name: 'structs_stepBuilders',
      description: '',
      exclusions: {},
    },
    {
      name: 'classWithPrivateConstructorAndAutomaticProperties',
      description: '',
      exclusions: {},
    },
    {
      name: 'arrayReturnedByMethodCannotBeModified',
      description: '',
      exclusions: {},
    },
    {
      name: 'correctlyDeserializesStructUnions',
      description: '',
      exclusions: {},
    },
    {
      name: 'subclassing',
      description: '',
      exclusions: {},
    },
    {
      name: 'testInterfaces',
      description: '',
      exclusions: {},
    },
  ],
};
