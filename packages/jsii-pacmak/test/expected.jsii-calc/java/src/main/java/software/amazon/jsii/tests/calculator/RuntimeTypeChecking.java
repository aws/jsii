package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.RuntimeTypeChecking")
public class RuntimeTypeChecking extends software.amazon.jsii.JsiiObject {
    protected RuntimeTypeChecking(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public RuntimeTypeChecking() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Used to verify verification of number of method arguments.
     */
    public void methodWithOptionalArguments(final java.lang.Number arg1, final java.lang.String arg2, @javax.annotation.Nullable final java.time.Instant arg3) {
        this.jsiiCall("methodWithOptionalArguments", Void.class, java.util.stream.Stream.concat(java.util.stream.Stream.concat(java.util.stream.Stream.of(java.util.Objects.requireNonNull(arg1, "arg1 is required")), java.util.stream.Stream.of(java.util.Objects.requireNonNull(arg2, "arg2 is required"))), java.util.stream.Stream.of(arg3)).toArray());
    }

    /**
     * Used to verify verification of number of method arguments.
     */
    public void methodWithOptionalArguments(final java.lang.Number arg1, final java.lang.String arg2) {
        this.jsiiCall("methodWithOptionalArguments", Void.class, java.util.stream.Stream.concat(java.util.stream.Stream.of(java.util.Objects.requireNonNull(arg1, "arg1 is required")), java.util.stream.Stream.of(java.util.Objects.requireNonNull(arg2, "arg2 is required"))).toArray());
    }
}
