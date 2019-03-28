package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AbstractClassBase")
public abstract class AbstractClassBase extends software.amazon.jsii.JsiiObject {
    protected AbstractClassBase(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public AbstractClassBase() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    public java.lang.String getAbstractProperty() {
        return this.jsiiGet("abstractProperty", java.lang.String.class);
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.AbstractClassBase {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String getAbstractProperty() {
            return this.jsiiGet("abstractProperty", java.lang.String.class);
        }
    }
}
