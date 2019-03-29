package software.amazon.jsii.tests.calculator;

/**
 * jsii#284: do not recognize "any" as an optional argument.
 * 
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DoNotRecognizeAnyAsOptional")
public class DoNotRecognizeAnyAsOptional extends software.amazon.jsii.JsiiObject {
    protected DoNotRecognizeAnyAsOptional(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public DoNotRecognizeAnyAsOptional() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public void method(final java.lang.Object _requiredAny, @javax.annotation.Nullable final java.lang.Object _optionalAny, @javax.annotation.Nullable final java.lang.String _optionalString) {
        this.jsiiCall("method", Void.class, java.util.stream.Stream.concat(java.util.stream.Stream.concat(java.util.stream.Stream.of(java.util.Objects.requireNonNull(_requiredAny, "_requiredAny is required")), java.util.stream.Stream.of(_optionalAny)), java.util.stream.Stream.of(_optionalString)).toArray());
    }

    public void method(final java.lang.Object _requiredAny, @javax.annotation.Nullable final java.lang.Object _optionalAny) {
        this.jsiiCall("method", Void.class, java.util.stream.Stream.concat(java.util.stream.Stream.of(java.util.Objects.requireNonNull(_requiredAny, "_requiredAny is required")), java.util.stream.Stream.of(_optionalAny)).toArray());
    }

    public void method(final java.lang.Object _requiredAny) {
        this.jsiiCall("method", Void.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(_requiredAny, "_requiredAny is required")).toArray());
    }
}
