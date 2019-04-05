package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DefaultedConstructorArgument")
public class DefaultedConstructorArgument extends software.amazon.jsii.JsiiObject {
    protected DefaultedConstructorArgument(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public DefaultedConstructorArgument(@javax.annotation.Nullable final java.lang.Number arg1, @javax.annotation.Nullable final java.lang.String arg2, @javax.annotation.Nullable final java.time.Instant arg3) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.concat(java.util.stream.Stream.concat(java.util.stream.Stream.of(arg1), java.util.stream.Stream.of(arg2)), java.util.stream.Stream.of(arg3)).toArray());
    }
    public DefaultedConstructorArgument(@javax.annotation.Nullable final java.lang.Number arg1, @javax.annotation.Nullable final java.lang.String arg2) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.concat(java.util.stream.Stream.of(arg1), java.util.stream.Stream.of(arg2)).toArray());
    }
    public DefaultedConstructorArgument(@javax.annotation.Nullable final java.lang.Number arg1) {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this, java.util.stream.Stream.of(arg1).toArray());
    }
    public DefaultedConstructorArgument() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public java.lang.Number getArg1() {
        return this.jsiiGet("arg1", java.lang.Number.class);
    }

    @javax.annotation.Nullable
    public java.lang.String getArg2() {
        return this.jsiiGet("arg2", java.lang.String.class);
    }

    public java.time.Instant getArg3() {
        return this.jsiiGet("arg3", java.time.Instant.class);
    }
}
