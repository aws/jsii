package software.amazon.jsii.tests.calculator;

import static java.util.Arrays.asList;

import java.util.List;
import software.amazon.jsii.JsiiModule;

public final class $Module extends JsiiModule {
    public $Module() {
        super("jsii-calc", "0.8.0", $Module.class, "jsii-calc@0.8.0.jsii.tgz");
    }

    @Override
    public List<Class<? extends JsiiModule>> getDependencies() {
        return asList(software.amazon.jsii.tests.calculator.base.$Module.class, software.amazon.jsii.tests.calculator.lib.$Module.class);
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
            case "jsii-calc.ClassWithMutableObjectLiteralProperty": return software.amazon.jsii.tests.calculator.ClassWithMutableObjectLiteralProperty.class;
            case "jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties": return software.amazon.jsii.tests.calculator.ClassWithPrivateConstructorAndAutomaticProperties.class;
            case "jsii-calc.Constructors": return software.amazon.jsii.tests.calculator.Constructors.class;
            case "jsii-calc.ConsumersOfThisCrazyTypeSystem": return software.amazon.jsii.tests.calculator.ConsumersOfThisCrazyTypeSystem.class;
            case "jsii-calc.DefaultedConstructorArgument": return software.amazon.jsii.tests.calculator.DefaultedConstructorArgument.class;
            case "jsii-calc.DerivedClassHasNoProperties.Base": return software.amazon.jsii.tests.calculator.DerivedClassHasNoProperties.Base.class;
            case "jsii-calc.DerivedClassHasNoProperties.Derived": return software.amazon.jsii.tests.calculator.DerivedClassHasNoProperties.Derived.class;
            case "jsii-calc.DerivedStruct": return software.amazon.jsii.tests.calculator.DerivedStruct.class;
            case "jsii-calc.DoNotOverridePrivates": return software.amazon.jsii.tests.calculator.DoNotOverridePrivates.class;
            case "jsii-calc.DoNotRecognizeAnyAsOptional": return software.amazon.jsii.tests.calculator.DoNotRecognizeAnyAsOptional.class;
            case "jsii-calc.DontComplainAboutVariadicAfterOptional": return software.amazon.jsii.tests.calculator.DontComplainAboutVariadicAfterOptional.class;
            case "jsii-calc.DoubleTrouble": return software.amazon.jsii.tests.calculator.DoubleTrouble.class;
            case "jsii-calc.EraseUndefinedHashValues": return software.amazon.jsii.tests.calculator.EraseUndefinedHashValues.class;
            case "jsii-calc.EraseUndefinedHashValuesOptions": return software.amazon.jsii.tests.calculator.EraseUndefinedHashValuesOptions.class;
            case "jsii-calc.ExportedBaseClass": return software.amazon.jsii.tests.calculator.ExportedBaseClass.class;
            case "jsii-calc.ExtendsInternalInterface": return software.amazon.jsii.tests.calculator.ExtendsInternalInterface.class;
            case "jsii-calc.ExtendsPrivateInterface": return software.amazon.jsii.tests.calculator.ExtendsPrivateInterface.class;
            case "jsii-calc.GiveMeStructs": return software.amazon.jsii.tests.calculator.GiveMeStructs.class;
            case "jsii-calc.GreetingAugmenter": return software.amazon.jsii.tests.calculator.GreetingAugmenter.class;
            case "jsii-calc.IAnotherPublicInterface": return software.amazon.jsii.tests.calculator.IAnotherPublicInterface.class;
            case "jsii-calc.IFriendlier": return software.amazon.jsii.tests.calculator.IFriendlier.class;
            case "jsii-calc.IFriendlyRandomGenerator": return software.amazon.jsii.tests.calculator.IFriendlyRandomGenerator.class;
            case "jsii-calc.IInterfaceThatShouldNotBeADataType": return software.amazon.jsii.tests.calculator.IInterfaceThatShouldNotBeADataType.class;
            case "jsii-calc.IInterfaceWithInternal": return software.amazon.jsii.tests.calculator.IInterfaceWithInternal.class;
            case "jsii-calc.IInterfaceWithMethods": return software.amazon.jsii.tests.calculator.IInterfaceWithMethods.class;
            case "jsii-calc.IInterfaceWithOptionalMethodArguments": return software.amazon.jsii.tests.calculator.IInterfaceWithOptionalMethodArguments.class;
            case "jsii-calc.IInterfaceWithProperties": return software.amazon.jsii.tests.calculator.IInterfaceWithProperties.class;
            case "jsii-calc.IInterfaceWithPropertiesExtension": return software.amazon.jsii.tests.calculator.IInterfaceWithPropertiesExtension.class;
            case "jsii-calc.IMutableObjectLiteral": return software.amazon.jsii.tests.calculator.IMutableObjectLiteral.class;
            case "jsii-calc.INonInternalInterface": return software.amazon.jsii.tests.calculator.INonInternalInterface.class;
            case "jsii-calc.IPrivatelyImplemented": return software.amazon.jsii.tests.calculator.IPrivatelyImplemented.class;
            case "jsii-calc.IPublicInterface": return software.amazon.jsii.tests.calculator.IPublicInterface.class;
            case "jsii-calc.IRandomNumberGenerator": return software.amazon.jsii.tests.calculator.IRandomNumberGenerator.class;
            case "jsii-calc.IReturnsNumber": return software.amazon.jsii.tests.calculator.IReturnsNumber.class;
            case "jsii-calc.ImplementInternalInterface": return software.amazon.jsii.tests.calculator.ImplementInternalInterface.class;
            case "jsii-calc.ImplementsInterfaceWithInternal": return software.amazon.jsii.tests.calculator.ImplementsInterfaceWithInternal.class;
            case "jsii-calc.ImplementsInterfaceWithInternalSubclass": return software.amazon.jsii.tests.calculator.ImplementsInterfaceWithInternalSubclass.class;
            case "jsii-calc.ImplementsPrivateInterface": return software.amazon.jsii.tests.calculator.ImplementsPrivateInterface.class;
            case "jsii-calc.ImplictBaseOfBase": return software.amazon.jsii.tests.calculator.ImplictBaseOfBase.class;
            case "jsii-calc.InbetweenClass": return software.amazon.jsii.tests.calculator.InbetweenClass.class;
            case "jsii-calc.InterfaceImplementedByAbstractClass": return software.amazon.jsii.tests.calculator.InterfaceImplementedByAbstractClass.class;
            case "jsii-calc.InterfaceInNamespaceIncludesClasses.Foo": return software.amazon.jsii.tests.calculator.InterfaceInNamespaceIncludesClasses.Foo.class;
            case "jsii-calc.InterfaceInNamespaceIncludesClasses.Hello": return software.amazon.jsii.tests.calculator.InterfaceInNamespaceIncludesClasses.Hello.class;
            case "jsii-calc.InterfaceInNamespaceOnlyInterface.Hello": return software.amazon.jsii.tests.calculator.InterfaceInNamespaceOnlyInterface.Hello.class;
            case "jsii-calc.JSObjectLiteralForInterface": return software.amazon.jsii.tests.calculator.JSObjectLiteralForInterface.class;
            case "jsii-calc.JSObjectLiteralToNative": return software.amazon.jsii.tests.calculator.JSObjectLiteralToNative.class;
            case "jsii-calc.JSObjectLiteralToNativeClass": return software.amazon.jsii.tests.calculator.JSObjectLiteralToNativeClass.class;
            case "jsii-calc.JavaReservedWords": return software.amazon.jsii.tests.calculator.JavaReservedWords.class;
            case "jsii-calc.JsiiAgent": return software.amazon.jsii.tests.calculator.JsiiAgent.class;
            case "jsii-calc.LoadBalancedFargateServiceProps": return software.amazon.jsii.tests.calculator.LoadBalancedFargateServiceProps.class;
            case "jsii-calc.Multiply": return software.amazon.jsii.tests.calculator.Multiply.class;
            case "jsii-calc.Negate": return software.amazon.jsii.tests.calculator.Negate.class;
            case "jsii-calc.NodeStandardLibrary": return software.amazon.jsii.tests.calculator.NodeStandardLibrary.class;
            case "jsii-calc.NullShouldBeTreatedAsUndefined": return software.amazon.jsii.tests.calculator.NullShouldBeTreatedAsUndefined.class;
            case "jsii-calc.NullShouldBeTreatedAsUndefinedData": return software.amazon.jsii.tests.calculator.NullShouldBeTreatedAsUndefinedData.class;
            case "jsii-calc.NumberGenerator": return software.amazon.jsii.tests.calculator.NumberGenerator.class;
            case "jsii-calc.ObjectRefsInCollections": return software.amazon.jsii.tests.calculator.ObjectRefsInCollections.class;
            case "jsii-calc.OptionalConstructorArgument": return software.amazon.jsii.tests.calculator.OptionalConstructorArgument.class;
            case "jsii-calc.OverrideReturnsObject": return software.amazon.jsii.tests.calculator.OverrideReturnsObject.class;
            case "jsii-calc.Polymorphism": return software.amazon.jsii.tests.calculator.Polymorphism.class;
            case "jsii-calc.Power": return software.amazon.jsii.tests.calculator.Power.class;
            case "jsii-calc.PublicClass": return software.amazon.jsii.tests.calculator.PublicClass.class;
            case "jsii-calc.PythonReservedWords": return software.amazon.jsii.tests.calculator.PythonReservedWords.class;
            case "jsii-calc.ReferenceEnumFromScopedPackage": return software.amazon.jsii.tests.calculator.ReferenceEnumFromScopedPackage.class;
            case "jsii-calc.ReturnsPrivateImplementationOfInterface": return software.amazon.jsii.tests.calculator.ReturnsPrivateImplementationOfInterface.class;
            case "jsii-calc.RuntimeTypeChecking": return software.amazon.jsii.tests.calculator.RuntimeTypeChecking.class;
            case "jsii-calc.Statics": return software.amazon.jsii.tests.calculator.Statics.class;
            case "jsii-calc.StringEnum": return software.amazon.jsii.tests.calculator.StringEnum.class;
            case "jsii-calc.StripInternal": return software.amazon.jsii.tests.calculator.StripInternal.class;
            case "jsii-calc.Sum": return software.amazon.jsii.tests.calculator.Sum.class;
            case "jsii-calc.SyncVirtualMethods": return software.amazon.jsii.tests.calculator.SyncVirtualMethods.class;
            case "jsii-calc.Thrower": return software.amazon.jsii.tests.calculator.Thrower.class;
            case "jsii-calc.UnaryOperation": return software.amazon.jsii.tests.calculator.UnaryOperation.class;
            case "jsii-calc.UnionProperties": return software.amazon.jsii.tests.calculator.UnionProperties.class;
            case "jsii-calc.UseBundledDependency": return software.amazon.jsii.tests.calculator.UseBundledDependency.class;
            case "jsii-calc.UseCalcBase": return software.amazon.jsii.tests.calculator.UseCalcBase.class;
            case "jsii-calc.UsesInterfaceWithProperties": return software.amazon.jsii.tests.calculator.UsesInterfaceWithProperties.class;
            case "jsii-calc.VariadicMethod": return software.amazon.jsii.tests.calculator.VariadicMethod.class;
            case "jsii-calc.VirtualMethodPlayground": return software.amazon.jsii.tests.calculator.VirtualMethodPlayground.class;
            case "jsii-calc.composition.CompositeOperation": return software.amazon.jsii.tests.calculator.composition.CompositeOperation.class;
            case "jsii-calc.composition.CompositeOperation.CompositionStringStyle": return software.amazon.jsii.tests.calculator.composition.CompositeOperation.CompositionStringStyle.class;
            default: throw new ClassNotFoundException("Unknown JSII type: " + fqn);
        }
    }
}
