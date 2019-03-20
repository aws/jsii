package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AbstractClass")
public abstract class AbstractClass extends software.amazon.jsii.tests.calculator.AbstractClassBase implements software.amazon.jsii.tests.calculator.InterfaceImplementedByAbstractClass {
    protected AbstractClass(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public AbstractClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public abstract java.lang.String abstractMethod(final java.lang.String name);

    public java.lang.Number nonAbstractMethod() {
        return this.jsiiCall("nonAbstractMethod", java.lang.Number.class);
    }

    @Override
    public java.lang.String getPropFromInterface() {
        return this.jsiiGet("propFromInterface", java.lang.String.class);
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.AbstractClass {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String getPropFromInterface() {
            return this.jsiiGet("propFromInterface", java.lang.String.class);
        }

        @Override
        public java.lang.String getAbstractProperty() {
            return this.jsiiGet("abstractProperty", java.lang.String.class);
        }

        @Override
        public java.lang.String abstractMethod(final java.lang.String name) {
            return this.jsiiCall("abstractMethod", java.lang.String.class, java.util.stream.Stream.of(java.util.Objects.requireNonNull(name, "name is required")).toArray());
        }
    }
}
