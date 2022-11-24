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
  testCases: [
    {
      name: 'asyncOverrides_overrideCallsSuper',
      description: '',
    },
    {
      name: 'arrayReturnedByMethodCanBeRead',
      description:
        'Array created in the kernel can be queried for its elements',
    },
    {
      name: 'unionProperties',
      description:
        'Kernel values that accept a union type can be set, and are returned with the concrete type',
    },
    {
      name: 'syncOverrides',
      description: '',
    },
    {
      name: 'useEnumFromScopedModule',
      description:
        'Property that accepts an enum type from a third-party package can be set, and read',
    },
    {
      name: 'createObjectAndCtorOverloads',
      description:
        'Class can be instantiated with empty and non empty constructor',
    },
    {
      name: 'fail_syncOverrides_callsDoubleAsync_method',
      description: '',
    },
    {
      name: 'collectionOfInterfaces_MapOfStructs',
      description: '',
    },
    {
      name: 'asyncOverrides_overrideAsyncMethod',
      description: '',
    },
    {
      name: 'statics',
      description:
        'Static functions can be invoked and accept and return the correct type',
    },
    {
      name: 'structs_returnedLiteralEqualsNativeBuilt',
      description:
        'A struct returned from the kernel is not distinguishable from a struct created natively',
    },
    {
      name: 'classesCanSelfReferenceDuringClassInitialization',
      description: 'Classes can reference other classes during initialization',
    },
    {
      name: 'canObtainStructReferenceWithOverloadedSetter',
      description:
        'A class with a settable property of a union type can be returned from the kernel',
    },
    {
      name: 'callbacksCorrectlyDeserializeArguments',
      description:
        'Runtime properly deserializes callback arguments from the kernel',
    },
    {
      name: 'canUseInterfaceSetters',
      description:
        'Read-write properties generate the corresponding setters in the target language',
    },
    {
      name: 'propertyOverrides_interfaces',
      description: 'Target language can override properties of host interfaces',
    },
    {
      name: 'syncOverrides_callsSuper',
      description: '',
    },
    {
      name: 'testJsiiAgent',
      description:
        'Asserts the correct value of the JSII_AGENT env variable for the kernel process',
    },
    {
      name: 'doNotOverridePrivates_method_private',
      description:
        'Non public methods on the guest class do not override methods in the host class',
    },
    {
      name: 'pureInterfacesCanBeUsedTransparently',
      description:
        'Guest implementation of a pure host interface can be used by host consumers accepting that interface',
    },
    {
      name: 'nullShouldBeTreatedAsUndefined',
      description:
        'Null value of target language is treated as undefined by the host',
    },
    {
      name: 'primitiveTypes',
      description:
        'All Primitive types are set and read with their respective types',
    },
    {
      name: 'reservedKeywordsAreSlugifiedInClassProperties',
      description:
        'TS code that uses reserved words as class property names get slugified so it is usable in the target language',
    },
    {
      name: 'objectIdDoesNotGetReallocatedWhenTheConstructorPassesThisOut',
      description:
        "Ensure the JSII kernel can pass 'this' out to JSII remotes from within the constructor",
    },
    {
      name: 'interfaceBuilder',
      description: "Seems to be a duplicate of 'propertyOverrides_interfaces'?",
    },
    {
      name: 'unionTypes',
      description: '',
    },
    {
      name: 'arrays',
      description: '',
    },
    {
      name: 'staticMapInClassCannotBeModified',
      description: '',
    },
    {
      name: 'consts',
      description: '',
    },
    {
      name: 'pureInterfacesCanBeUsedTransparently_WhenTransitivelyImplementing',
      description: '',
    },
    {
      name: 'reservedKeywordsAreSlugifiedInMethodNames',
      description: '',
    },
    {
      name: 'exceptions',
      description: '',
    },
    {
      name: 'testLiteralInterface',
      description: '',
    },
    {
      name: 'structs_nonOptionalhashCode',
      description: '',
    },
    {
      name: 'propertyOverrides_set_throws',
      description: '',
    },
    {
      name: 'canLeverageIndirectInterfacePolymorphism',
      description: '',
    },
    {
      name: 'fluentApi',
      description: '',
    },
    {
      name: 'staticListInClassCanBeReadCorrectly',
      description: '',
    },
    {
      name: 'mapReturnedByMethodCannotBeModified',
      description: '',
    },
    {
      name: 'receiveInstanceOfPrivateClass',
      description: '',
    },
    {
      name: 'staticMapInClassCanBeReadCorrectly',
      description: '',
    },
    {
      name: 'testNativeObjectsWithInterfaces',
      description: '',
    },
    {
      name: 'doNotOverridePrivates_property_getter_public',
      description: '',
    },
    {
      name: 'equalsIsResistantToPropertyShadowingResultVariable',
      description: '',
    },
    {
      name: 'listInClassCanBeReadCorrectly',
      description: '',
    },
    {
      name: 'useNestedStruct',
      description: '',
    },
    {
      name: 'testFluentApiWithDerivedClasses',
      description: '',
    },
    {
      name: 'interfacesCanBeUsedTransparently_WhenAddedToJsiiType',
      description: '',
    },
    {
      name: 'canOverrideProtectedGetter',
      description: '',
    },
    {
      name: 'getAndSetEnumValues',
      description: '',
    },
    {
      name: 'structs_nonOptionalequals',
      description: '',
    },
    {
      name: 'testInterfaceParameter',
      description: '',
    },
    {
      name: 'liftedKwargWithSameNameAsPositionalArg',
      description: '',
    },
    {
      name: 'creationOfNativeObjectsFromJavaScriptObjects',
      description: '',
    },
    {
      name: 'canOverrideProtectedMethod',
      description: '',
    },
    {
      name: 'canLoadEnumValues',
      description: '',
    },
    {
      name: 'eraseUnsetDataValues',
      description: '',
    },
    {
      name: 'maps',
      description: '',
    },
    {
      name: 'structs_containsNullChecks',
      description: '',
    },
    {
      name: 'canOverrideProtectedSetter',
      description: '',
    },
    {
      name: 'asyncOverrides_callAsyncMethod',
      description: '',
    },
    {
      name: 'nodeStandardLibrary',
      description: '',
    },
    {
      name: 'dates',
      description: '',
    },
    {
      name: 'collectionOfInterfaces_ListOfStructs',
      description: '',
    },
    {
      name: 'objRefsAreLabelledUsingWithTheMostCorrectType',
      description: '',
    },
    {
      name: 'unionPropertiesWithBuilder',
      description: '',
    },
    {
      name: 'doNotOverridePrivates_property_getter_private',
      description: '',
    },
    {
      name: 'structs_withDiamondInheritance_correctlyDedupeProperties',
      description: '',
    },
    {
      name: 'abstractMembersAreCorrectlyHandled',
      description: '',
    },
    {
      name: 'doNotOverridePrivates_property_by_name_private',
      description: '',
    },
    {
      name: 'testNullIsAValidOptionalMap',
      description: '',
    },
    {
      name: 'mapReturnedByMethodCanBeRead',
      description: '',
    },
    {
      name: 'structs_multiplePropertiesEquals',
      description: '',
    },
    {
      name: 'mapInClassCanBeReadCorrectly',
      description: '',
    },
    {
      name: 'staticListInClassCannotBeModified',
      description: '',
    },
    {
      name: 'collectionOfInterfaces_MapOfInterfaces',
      description: '',
    },
    {
      name: 'asyncOverrides_overrideThrows',
      description: '',
    },
    {
      name: 'callMethods',
      description: '',
    },
    {
      name: 'returnAbstract',
      description: '',
    },
    {
      name: 'dynamicTypes',
      description: '',
    },
    {
      name: 'hashCodeIsResistantToPropertyShadowingResultVariable',
      description: '',
    },
    {
      name: 'returnSubclassThatImplementsInterface976',
      description: '',
    },
    {
      name: 'structs_optionalEquals',
      description: '',
    },
    {
      name: 'propertyOverrides_get_calls_super',
      description: '',
    },
    {
      name: 'unmarshallIntoAbstractType',
      description: '',
    },
    {
      name: 'structs_multiplePropertiesHashCode',
      description: '',
    },
    {
      name: 'fail_syncOverrides_callsDoubleAsync_propertyGetter',
      description: '',
    },
    {
      name: 'propertyOverrides_get_set',
      description: '',
    },
    {
      name: 'variadicMethodCanBeInvoked',
      description: '',
    },
    {
      name: 'collectionTypes',
      description: '',
    },
    {
      name: 'asyncOverrides_overrideAsyncMethodByParentClass',
      description: '',
    },
    {
      name: 'structs_optionalHashCode',
      description: '',
    },
    {
      name: 'testStructsCanBeDowncastedToParentType',
      description: '',
    },
    {
      name: 'propertyOverrides_get_throws',
      description: '',
    },
    {
      name: 'getSetPrimitiveProperties',
      description: '',
    },
    {
      name: 'getAndSetNonPrimitiveProperties',
      description: '',
    },
    {
      name: 'reservedKeywordsAreSlugifiedInStructProperties',
      description: '',
    },
    {
      name: 'fail_syncOverrides_callsDoubleAsync_propertySetter',
      description: '',
    },
    {
      name: 'doNotOverridePrivates_method_public',
      description: '',
    },
    {
      name: 'testNullIsAValidOptionalList',
      description: '',
    },
    {
      name: 'mapInClassCannotBeModified',
      description: '',
    },
    {
      name: 'doNotOverridePrivates_property_by_name_public',
      description: '',
    },
    {
      name: 'asyncOverrides_twoOverrides',
      description: '',
    },
    {
      name: 'propertyOverrides_set_calls_super',
      description: '',
    },
    {
      name: 'iso8601DoesNotDeserializeToDate',
      description: '',
    },
    {
      name: 'collectionOfInterfaces_ListOfInterfaces',
      description: '',
    },
    {
      name: 'undefinedAndNull',
      description: '',
    },
    {
      name: 'structs_serializeToJsii',
      description: '',
    },
    {
      name: 'structsAreUndecoratedOntheWayToKernel',
      description: '',
    },
    {
      name: 'canObtainReferenceWithOverloadedSetter',
      description: '',
    },
    {
      name: 'testJSObjectLiteralToNative',
      description: '',
    },
    {
      name: 'structs_stepBuilders',
      description: '',
    },
    {
      name: 'classWithPrivateConstructorAndAutomaticProperties',
      description: '',
    },
    {
      name: 'arrayReturnedByMethodCannotBeModified',
      description: '',
    },
    {
      name: 'correctlyDeserializesStructUnions',
      description: '',
    },
    {
      name: 'subclassing',
      description: '',
    },
    {
      name: 'testInterfaces',
      description: '',
    },
    {
      name: 'callbackParameterIsInterface',
      description: 'Validates pure interfaces can be passed to callbacks',
    },
    {
      name: 'classCanBeUsedWhenNotExpressedlyLoaded',
      description:
        'Validates that types not explicitly loaded by the user can safely be returned by JS code',
    },
    {
      name: 'downcasting',
      description: 'Ensures unsafe-cast features work as expected',
    },
    {
      name: 'strippedDeprecatedMemberCanBeReceived',
      description:
        'Ensures --strip-deprecated does not cause odd runtime errors',
    },
    {
      name: 'exceptionMessage',
      description:
        'Verifies that custom exception names are correctly forwarded',
    },
  ],
};
