package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DefaultedConstructorArgument")
public class DefaultedConstructorArgument extends software.amazon.jsii.JsiiObject {
    protected DefaultedConstructorArgument(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public DefaultedConstructorArgument(@javax.annotation.Nullable final java.lang.Number arg1, final java.lang.String arg2, @javax.annotation.Nullable final java.time.Instant arg3) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.concat(java.util.stream.Stream.concat(java.util.stream.Stream.of(arg1), java.util.stream.Stream.of(java.util.Objects.requireNonNull(arg2, "arg2 is required"))), java.util.stream.Stream.of(arg3)).toArray());
    }
    public DefaultedConstructorArgument(@javax.annotation.Nullable final java.lang.Number arg1, final java.lang.String arg2) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.concat(java.util.stream.Stream.of(arg1), java.util.stream.Stream.of(java.util.Objects.requireNonNull(arg2, "arg2 is required"))).toArray());
    }

    public java.lang.Number getArg1() {
        return this.jsiiGet("arg1", java.lang.Number.class);
    }

    public java.lang.String getArg2() {
        return this.jsiiGet("arg2", java.lang.String.class);
    }

    public java.time.Instant getArg3() {
        return this.jsiiGet("arg3", java.time.Instant.class);
    }
}
