package software.amazon.jsii.tests.calculator;

/**
 * Class that implements interface properties automatically, but using a private constructor
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties")
public class ClassWithPrivateConstructorAndAutomaticProperties extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IInterfaceWithProperties {
    protected ClassWithPrivateConstructorAndAutomaticProperties(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }

    public static software.amazon.jsii.tests.calculator.ClassWithPrivateConstructorAndAutomaticProperties create(final java.lang.String readOnlyString, final java.lang.String readWriteString) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.ClassWithPrivateConstructorAndAutomaticProperties.class, "create", software.amazon.jsii.tests.calculator.ClassWithPrivateConstructorAndAutomaticProperties.class, java.util.stream.Stream.concat(java.util.stream.Stream.of(java.util.Objects.requireNonNull(readOnlyString, "readOnlyString is required")), java.util.stream.Stream.of(java.util.Objects.requireNonNull(readWriteString, "readWriteString is required"))).toArray());
    }

    @Override
    public java.lang.String getReadOnlyString() {
        return this.jsiiGet("readOnlyString", java.lang.String.class);
    }

    @Override
    public java.lang.String getReadWriteString() {
        return this.jsiiGet("readWriteString", java.lang.String.class);
    }

    @Override
    public void setReadWriteString(final java.lang.String value) {
        this.jsiiSet("readWriteString", java.util.Objects.requireNonNull(value, "readWriteString is required"));
    }
}
