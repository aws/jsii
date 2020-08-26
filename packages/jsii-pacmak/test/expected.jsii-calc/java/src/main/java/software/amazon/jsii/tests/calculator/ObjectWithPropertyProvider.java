package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ObjectWithPropertyProvider")
public class ObjectWithPropertyProvider extends software.amazon.jsii.JsiiObject {

    protected ObjectWithPropertyProvider(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ObjectWithPropertyProvider(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.IObjectWithProperty provide() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.ObjectWithPropertyProvider.class, "provide", software.amazon.jsii.tests.calculator.IObjectWithProperty.class);
    }
}
