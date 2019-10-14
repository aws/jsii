package software.amazon.jsii.tests.calculator;

import static java.util.Arrays.asList;

import java.util.List;
import software.amazon.jsii.JsiiModule;

public final class $Module extends JsiiModule {
    public $Module() {
        super("jsii-calc", "0.19.0", $Module.class, "jsii-calc@0.19.0.jsii.tgz");
    }

    @Override
    public List<Class<? extends JsiiModule>> getDependencies() {
        return asList(software.amazon.jsii.tests.calculator.base.$Module.class, software.amazon.jsii.tests.calculator.baseofbase.$Module.class, software.amazon.jsii.tests.calculator.lib.$Module.class);
    }

    @Override
    protected Class<?> resolveClass(final String fqn) throws ClassNotFoundException {
        switch (fqn) {
            case "jsii-calc.AbstractClass": return software.amazon.jsii.tests.calculator.AbstractClass.class;
            case "jsii-calc.AbstractClassBase": return software.amazon.jsii.tests.calculator.AbstractClassBase.class;
            case "jsii-calc.AbstractClassReturner": return software.amazon.jsii.tests.calculator.AbstractClassReturner.class;
            case "jsii-calc.Add": return software.amazon.jsii.tests.calculator.Add.class;
            case "jsii-calc.AllTypes": return software.amazon.jsii.tests.calculator.AllTypes.class;
            case "jsii-calc.AllTypesEnum": return software.amazon.jsii.tests.calculator.AllTypesEnum.class;
            case "jsii-calc.AllowedMethodNames": return software.amazon.jsii.tests.calculator.AllowedMethodNames.class;
            case "jsii-calc.AsyncVirtualMethods": return software.amazon.jsii.tests.calculator.AsyncVirtualMethods.class;
            case "jsii-calc.AugmentableClass": return software.amazon.jsii.tests.calculator.AugmentableClass.class;
            case "jsii-calc.BinaryOperation": return software.amazon.jsii.tests.calculator.BinaryOperation.class;
            case "jsii-calc.Calculator": return software.amazon.jsii.tests.calculator.Calculator.class;
            case "jsii-calc.CalculatorProps": return software.amazon.jsii.tests.calculator.CalculatorProps.class;
            case "jsii-calc.ClassThatImplementsTheInternalInterface": return software.amazon.jsii.tests.calculator.ClassThatImplementsTheInternalInterface.class;
            case "jsii-calc.ClassThatImplementsThePrivateInterface": return software.amazon.jsii.tests.calculator.ClassThatImplementsThePrivateInterface.class;
            case "jsii-calc.ClassWithCollections": return software.amazon.jsii.tests.calculator.ClassWithCollections.class;
            case "jsii-calc.ClassWithDocs": return software.amazon.jsii.tests.calculator.ClassWithDocs.class;
            case "jsii-calc.ClassWithJavaReservedWords": return software.amazon.jsii.tests.calculator.ClassWithJavaReservedWords.class;
            case "jsii-calc.ClassWithMutableObjectLiteralProperty": return software.amazon.jsii.tests.calculator.ClassWithMutableObjectLiteralProperty.class;
            case "jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties": return software.amazon.jsii.tests.calculator.ClassWithPrivateConstructorAndAutomaticProperties.class;
            case "jsii-calc.ConstructorPassesThisOut": return software.amazon.jsii.tests.calculator.ConstructorPassesThisOut.class;
            case "jsii-calc.Constructors": return software.amazon.jsii.tests.calculator.Constructors.class;
            case "jsii-calc.ConsumersOfThisCrazyTypeSystem": return software.amazon.jsii.tests.calculator.ConsumersOfThisCrazyTypeSystem.class;
            case "jsii-calc.DataRenderer": return software.amazon.jsii.tests.calculator.DataRenderer.class;
            case "jsii-calc.DefaultedConstructorArgument": return software.amazon.jsii.tests.calculator.DefaultedConstructorArgument.class;
            case "jsii-calc.DeprecatedClass": return software.amazon.jsii.tests.calculator.DeprecatedClass.class;
            case "jsii-calc.DeprecatedEnum": return software.amazon.jsii.tests.calculator.DeprecatedEnum.class;
            case "jsii-calc.DeprecatedStruct": return software.amazon.jsii.tests.calculator.DeprecatedStruct.class;
            case "jsii-calc.DerivedClassHasNoProperties.Base": return software.amazon.jsii.tests.calculator.DerivedClassHasNoProperties.Base.class;
            case "jsii-calc.DerivedClassHasNoProperties.Derived": return software.amazon.jsii.tests.calculator.DerivedClassHasNoProperties.Derived.class;
            case "jsii-calc.DerivedStruct": return software.amazon.jsii.tests.calculator.DerivedStruct.class;
            case "jsii-calc.DiamondInheritanceBaseLevelStruct": return software.amazon.jsii.tests.calculator.DiamondInheritanceBaseLevelStruct.class;
            case "jsii-calc.DiamondInheritanceFirstMidLevelStruct": return software.amazon.jsii.tests.calculator.DiamondInheritanceFirstMidLevelStruct.class;
            case "jsii-calc.DiamondInheritanceSecondMidLevelStruct": return software.amazon.jsii.tests.calculator.DiamondInheritanceSecondMidLevelStruct.class;
            case "jsii-calc.DiamondInheritanceTopLevelStruct": return software.amazon.jsii.tests.calculator.DiamondInheritanceTopLevelStruct.class;
            case "jsii-calc.DoNotOverridePrivates": return software.amazon.jsii.tests.calculator.DoNotOverridePrivates.class;
            case "jsii-calc.DoNotRecognizeAnyAsOptional": return software.amazon.jsii.tests.calculator.DoNotRecognizeAnyAsOptional.class;
            case "jsii-calc.DocumentedClass": return software.amazon.jsii.tests.calculator.DocumentedClass.class;
            case "jsii-calc.DontComplainAboutVariadicAfterOptional": return software.amazon.jsii.tests.calculator.DontComplainAboutVariadicAfterOptional.class;
            case "jsii-calc.DoubleTrouble": return software.amazon.jsii.tests.calculator.DoubleTrouble.class;
            case "jsii-calc.EnumDispenser": return software.amazon.jsii.tests.calculator.EnumDispenser.class;
            case "jsii-calc.EraseUndefinedHashValues": return software.amazon.jsii.tests.calculator.EraseUndefinedHashValues.class;
            case "jsii-calc.EraseUndefinedHashValuesOptions": return software.amazon.jsii.tests.calculator.EraseUndefinedHashValuesOptions.class;
            case "jsii-calc.ExperimentalClass": return software.amazon.jsii.tests.calculator.ExperimentalClass.class;
            case "jsii-calc.ExperimentalEnum": return software.amazon.jsii.tests.calculator.ExperimentalEnum.class;
            case "jsii-calc.ExperimentalStruct": return software.amazon.jsii.tests.calculator.ExperimentalStruct.class;
            case "jsii-calc.ExportedBaseClass": return software.amazon.jsii.tests.calculator.ExportedBaseClass.class;
            case "jsii-calc.ExtendsInternalInterface": return software.amazon.jsii.tests.calculator.ExtendsInternalInterface.class;
            case "jsii-calc.GiveMeStructs": return software.amazon.jsii.tests.calculator.GiveMeStructs.class;
            case "jsii-calc.Greetee": return software.amazon.jsii.tests.calculator.Greetee.class;
            case "jsii-calc.GreetingAugmenter": return software.amazon.jsii.tests.calculator.GreetingAugmenter.class;
            case "jsii-calc.IAnotherPublicInterface": return software.amazon.jsii.tests.calculator.IAnotherPublicInterface.class;
            case "jsii-calc.IDeprecatedInterface": return software.amazon.jsii.tests.calculator.IDeprecatedInterface.class;
            case "jsii-calc.IExperimentalInterface": return software.amazon.jsii.tests.calculator.IExperimentalInterface.class;
            case "jsii-calc.IExtendsPrivateInterface": return software.amazon.jsii.tests.calculator.IExtendsPrivateInterface.class;
            case "jsii-calc.IFriendlier": return software.amazon.jsii.tests.calculator.IFriendlier.class;
            case "jsii-calc.IFriendlyRandomGenerator": return software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator.class;
            case "jsii-calc.IInterfaceImplementedByAbstractClass": return software.amazon.jsii.tests.calculator.IInterfaceImplementedByAbstractClass.class;
            case "jsii-calc.IInterfaceThatShouldNotBeADataType": return software.amazon.jsii.tests.calculator.IInterfaceThatShouldNotBeADataType.class;
            case "jsii-calc.IInterfaceWithInternal": return software.amazon.jsii.tests.calculator.IInterfaceWithInternal.class;
            case "jsii-calc.IInterfaceWithMethods": return software.amazon.jsii.tests.calculator.IInterfaceWithMethods.class;
            case "jsii-calc.IInterfaceWithOptionalMethodArguments": return software.amazon.jsii.tests.calculator.IInterfaceWithOptionalMethodArguments.class;
            case "jsii-calc.IInterfaceWithProperties": return software.amazon.jsii.tests.calculator.IInterfaceWithProperties.class;
            case "jsii-calc.IInterfaceWithPropertiesExtension": return software.amazon.jsii.tests.calculator.IInterfaceWithPropertiesExtension.class;
            case "jsii-calc.IJSII417Derived": return software.amazon.jsii.tests.calculator.IJSII417Derived.class;
            case "jsii-calc.IJSII417PublicBaseOfBase": return software.amazon.jsii.tests.calculator.IJSII417PublicBaseOfBase.class;
            case "jsii-calc.IJsii487External": return software.amazon.jsii.tests.calculator.IJsii487External.class;
            case "jsii-calc.IJsii487External2": return software.amazon.jsii.tests.calculator.IJsii487External2.class;
            case "jsii-calc.IJsii496": return software.amazon.jsii.tests.calculator.IJsii496.class;
            case "jsii-calc.IMutableObjectLiteral": return software.amazon.jsii.tests.calculator.IMutableObjectLiteral.class;
            case "jsii-calc.INonInternalInterface": return software.amazon.jsii.tests.calculator.INonInternalInterface.class;
            case "jsii-calc.IPrivatelyImplemented": return software.amazon.jsii.tests.calculator.IPrivatelyImplemented.class;
            case "jsii-calc.IPublicInterface": return software.amazon.jsii.tests.calculator.IPublicInterface.class;
            case "jsii-calc.IPublicInterface2": return software.amazon.jsii.tests.calculator.IPublicInterface2.class;
            case "jsii-calc.IRandomNumberGenerator": return software.amazon.jsii.tests.calculator.IRandomNumberGenerator.class;
            case "jsii-calc.IReturnsNumber": return software.amazon.jsii.tests.calculator.IReturnsNumber.class;
            case "jsii-calc.IStableInterface": return software.amazon.jsii.tests.calculator.IStableInterface.class;
            case "jsii-calc.ImplementInternalInterface": return software.amazon.jsii.tests.calculator.ImplementInternalInterface.class;
            case "jsii-calc.ImplementsInterfaceWithInternal": return software.amazon.jsii.tests.calculator.ImplementsInterfaceWithInternal.class;
            case "jsii-calc.ImplementsInterfaceWithInternalSubclass": return software.amazon.jsii.tests.calculator.ImplementsInterfaceWithInternalSubclass.class;
            case "jsii-calc.ImplementsPrivateInterface": return software.amazon.jsii.tests.calculator.ImplementsPrivateInterface.class;
            case "jsii-calc.ImplictBaseOfBase": return software.amazon.jsii.tests.calculator.ImplictBaseOfBase.class;
            case "jsii-calc.InbetweenClass": return software.amazon.jsii.tests.calculator.InbetweenClass.class;
            case "jsii-calc.InterfaceInNamespaceIncludesClasses.Foo": return software.amazon.jsii.tests.calculator.InterfaceInNamespaceIncludesClasses.Foo.class;
            case "jsii-calc.InterfaceInNamespaceIncludesClasses.Hello": return software.amazon.jsii.tests.calculator.InterfaceInNamespaceIncludesClasses.Hello.class;
            case "jsii-calc.InterfaceInNamespaceOnlyInterface.Hello": return software.amazon.jsii.tests.calculator.InterfaceInNamespaceOnlyInterface.Hello.class;
            case "jsii-calc.InterfacesMaker": return software.amazon.jsii.tests.calculator.InterfacesMaker.class;
            case "jsii-calc.JSII417Derived": return software.amazon.jsii.tests.calculator.JSII417Derived.class;
            case "jsii-calc.JSII417PublicBaseOfBase": return software.amazon.jsii.tests.calculator.JSII417PublicBaseOfBase.class;
            case "jsii-calc.JSObjectLiteralForInterface": return software.amazon.jsii.tests.calculator.JSObjectLiteralForInterface.class;
            case "jsii-calc.JSObjectLiteralToNative": return software.amazon.jsii.tests.calculator.JSObjectLiteralToNative.class;
            case "jsii-calc.JSObjectLiteralToNativeClass": return software.amazon.jsii.tests.calculator.JSObjectLiteralToNativeClass.class;
            case "jsii-calc.JavaReservedWords": return software.amazon.jsii.tests.calculator.JavaReservedWords.class;
            case "jsii-calc.Jsii487Derived": return software.amazon.jsii.tests.calculator.Jsii487Derived.class;
            case "jsii-calc.Jsii496Derived": return software.amazon.jsii.tests.calculator.Jsii496Derived.class;
            case "jsii-calc.JsiiAgent": return software.amazon.jsii.tests.calculator.JsiiAgent.class;
            case "jsii-calc.LoadBalancedFargateServiceProps": return software.amazon.jsii.tests.calculator.LoadBalancedFargateServiceProps.class;
            case "jsii-calc.Multiply": return software.amazon.jsii.tests.calculator.Multiply.class;
            case "jsii-calc.Negate": return software.amazon.jsii.tests.calculator.Negate.class;
            case "jsii-calc.NodeStandardLibrary": return software.amazon.jsii.tests.calculator.NodeStandardLibrary.class;
            case "jsii-calc.NullShouldBeTreatedAsUndefined": return software.amazon.jsii.tests.calculator.NullShouldBeTreatedAsUndefined.class;
            case "jsii-calc.NullShouldBeTreatedAsUndefinedData": return software.amazon.jsii.tests.calculator.NullShouldBeTreatedAsUndefinedData.class;
            case "jsii-calc.NumberGenerator": return software.amazon.jsii.tests.calculator.NumberGenerator.class;
            case "jsii-calc.ObjectRefsInCollections": return software.amazon.jsii.tests.calculator.ObjectRefsInCollections.class;
            case "jsii-calc.Old": return software.amazon.jsii.tests.calculator.Old.class;
            case "jsii-calc.OptionalConstructorArgument": return software.amazon.jsii.tests.calculator.OptionalConstructorArgument.class;
            case "jsii-calc.OptionalStruct": return software.amazon.jsii.tests.calculator.OptionalStruct.class;
            case "jsii-calc.OptionalStructConsumer": return software.amazon.jsii.tests.calculator.OptionalStructConsumer.class;
            case "jsii-calc.OverrideReturnsObject": return software.amazon.jsii.tests.calculator.OverrideReturnsObject.class;
            case "jsii-calc.PartiallyInitializedThisConsumer": return software.amazon.jsii.tests.calculator.PartiallyInitializedThisConsumer.class;
            case "jsii-calc.Polymorphism": return software.amazon.jsii.tests.calculator.Polymorphism.class;
            case "jsii-calc.Power": return software.amazon.jsii.tests.calculator.Power.class;
            case "jsii-calc.PublicClass": return software.amazon.jsii.tests.calculator.PublicClass.class;
            case "jsii-calc.PythonReservedWords": return software.amazon.jsii.tests.calculator.PythonReservedWords.class;
            case "jsii-calc.ReferenceEnumFromScopedPackage": return software.amazon.jsii.tests.calculator.ReferenceEnumFromScopedPackage.class;
            case "jsii-calc.ReturnsPrivateImplementationOfInterface": return software.amazon.jsii.tests.calculator.ReturnsPrivateImplementationOfInterface.class;
            case "jsii-calc.RuntimeTypeChecking": return software.amazon.jsii.tests.calculator.RuntimeTypeChecking.class;
            case "jsii-calc.SecondLevelStruct": return software.amazon.jsii.tests.calculator.SecondLevelStruct.class;
            case "jsii-calc.SingleInstanceTwoTypes": return software.amazon.jsii.tests.calculator.SingleInstanceTwoTypes.class;
            case "jsii-calc.SingletonInt": return software.amazon.jsii.tests.calculator.SingletonInt.class;
            case "jsii-calc.SingletonIntEnum": return software.amazon.jsii.tests.calculator.SingletonIntEnum.class;
            case "jsii-calc.SingletonString": return software.amazon.jsii.tests.calculator.SingletonString.class;
            case "jsii-calc.SingletonStringEnum": return software.amazon.jsii.tests.calculator.SingletonStringEnum.class;
            case "jsii-calc.StableClass": return software.amazon.jsii.tests.calculator.StableClass.class;
            case "jsii-calc.StableEnum": return software.amazon.jsii.tests.calculator.StableEnum.class;
            case "jsii-calc.StableStruct": return software.amazon.jsii.tests.calculator.StableStruct.class;
            case "jsii-calc.StaticContext": return software.amazon.jsii.tests.calculator.StaticContext.class;
            case "jsii-calc.Statics": return software.amazon.jsii.tests.calculator.Statics.class;
            case "jsii-calc.StringEnum": return software.amazon.jsii.tests.calculator.StringEnum.class;
            case "jsii-calc.StripInternal": return software.amazon.jsii.tests.calculator.StripInternal.class;
            case "jsii-calc.StructPassing": return software.amazon.jsii.tests.calculator.StructPassing.class;
            case "jsii-calc.StructWithJavaReservedWords": return software.amazon.jsii.tests.calculator.StructWithJavaReservedWords.class;
            case "jsii-calc.Sum": return software.amazon.jsii.tests.calculator.Sum.class;
            case "jsii-calc.SyncVirtualMethods": return software.amazon.jsii.tests.calculator.SyncVirtualMethods.class;
            case "jsii-calc.Thrower": return software.amazon.jsii.tests.calculator.Thrower.class;
            case "jsii-calc.TopLevelStruct": return software.amazon.jsii.tests.calculator.TopLevelStruct.class;
            case "jsii-calc.UnaryOperation": return software.amazon.jsii.tests.calculator.UnaryOperation.class;
            case "jsii-calc.UnionProperties": return software.amazon.jsii.tests.calculator.UnionProperties.class;
            case "jsii-calc.UseBundledDependency": return software.amazon.jsii.tests.calculator.UseBundledDependency.class;
            case "jsii-calc.UseCalcBase": return software.amazon.jsii.tests.calculator.UseCalcBase.class;
            case "jsii-calc.UsesInterfaceWithProperties": return software.amazon.jsii.tests.calculator.UsesInterfaceWithProperties.class;
            case "jsii-calc.VariadicMethod": return software.amazon.jsii.tests.calculator.VariadicMethod.class;
            case "jsii-calc.VirtualMethodPlayground": return software.amazon.jsii.tests.calculator.VirtualMethodPlayground.class;
            case "jsii-calc.VoidCallback": return software.amazon.jsii.tests.calculator.VoidCallback.class;
            case "jsii-calc.WithPrivatePropertyInConstructor": return software.amazon.jsii.tests.calculator.WithPrivatePropertyInConstructor.class;
            case "jsii-calc.composition.CompositeOperation": return software.amazon.jsii.tests.calculator.composition.CompositeOperation.class;
            case "jsii-calc.composition.CompositeOperation.CompositionStringStyle": return software.amazon.jsii.tests.calculator.composition.CompositeOperation.CompositionStringStyle.class;
            default: throw new ClassNotFoundException("Unknown JSII type: " + fqn);
        }
    }
}
