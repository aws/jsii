package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AbstractClass")
public abstract class AbstractClass extends software.amazon.jsii.tests.calculator.AbstractClassBase implements software.amazon.jsii.tests.calculator.IInterfaceImplementedByAbstractClass {

    protected AbstractClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected AbstractClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    protected AbstractClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public abstract java.lang.String abstractMethod(final java.lang.String name);

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number nonAbstractMethod() {
        return this.jsiiCall("nonAbstractMethod", java.lang.Number.class);
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getPropFromInterface() {
        return this.jsiiGet("propFromInterface", java.lang.String.class);
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.AbstractClass {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public java.lang.String getPropFromInterface() {
            return this.jsiiGet("propFromInterface", java.lang.String.class);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public java.lang.String getAbstractProperty() {
            return this.jsiiGet("abstractProperty", java.lang.String.class);
        }

        /**
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public java.lang.String abstractMethod(final java.lang.String name) {
            return this.jsiiCall("abstractMethod", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(name, "name is required") });
        }
    }
}
