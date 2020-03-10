package software.amazon.jsii.tests.calculator.compliance;

/**
 * Class that implements interface properties automatically, but using a private constructor.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.ClassWithPrivateConstructorAndAutomaticProperties")
public class ClassWithPrivateConstructorAndAutomaticProperties extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.compliance.IInterfaceWithProperties {

    protected ClassWithPrivateConstructorAndAutomaticProperties(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ClassWithPrivateConstructorAndAutomaticProperties(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param readOnlyString This parameter is required.
     * @param readWriteString This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.compliance.ClassWithPrivateConstructorAndAutomaticProperties create(final @org.jetbrains.annotations.NotNull java.lang.String readOnlyString, final @org.jetbrains.annotations.NotNull java.lang.String readWriteString) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.compliance.ClassWithPrivateConstructorAndAutomaticProperties.class, "create", software.amazon.jsii.tests.calculator.compliance.ClassWithPrivateConstructorAndAutomaticProperties.class, new Object[] { java.util.Objects.requireNonNull(readOnlyString, "readOnlyString is required"), java.util.Objects.requireNonNull(readWriteString, "readWriteString is required") });
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getReadOnlyString() {
        return this.jsiiGet("readOnlyString", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.String getReadWriteString() {
        return this.jsiiGet("readWriteString", java.lang.String.class);
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setReadWriteString(final @org.jetbrains.annotations.NotNull java.lang.String value) {
        this.jsiiSet("readWriteString", java.util.Objects.requireNonNull(value, "readWriteString is required"));
    }
}
