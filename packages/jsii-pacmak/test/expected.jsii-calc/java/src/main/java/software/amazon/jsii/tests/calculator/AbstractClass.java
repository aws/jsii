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
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     * <p>
     * @param name This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public abstract java.lang.String abstractMethod(final java.lang.String name);

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Number nonAbstractMethod() {
        return this.jsiiCall("nonAbstractMethod", software.amazon.jsii.NativeType.forClass(java.lang.Number.class));
    }

    /**
     * EXPERIMENTAL
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.String getPropFromInterface() {
        return this.jsiiGet("propFromInterface", software.amazon.jsii.NativeType.forClass(java.lang.String.class));
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.AbstractClass {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public java.lang.String getPropFromInterface() {
            return this.jsiiGet("propFromInterface", software.amazon.jsii.NativeType.forClass(java.lang.String.class));
        }

        /**
         * EXPERIMENTAL
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public java.lang.String getAbstractProperty() {
            return this.jsiiGet("abstractProperty", software.amazon.jsii.NativeType.forClass(java.lang.String.class));
        }

        /**
         * EXPERIMENTAL
         * <p>
         * @param name This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public java.lang.String abstractMethod(final java.lang.String name) {
            return this.jsiiCall("abstractMethod", software.amazon.jsii.NativeType.forClass(java.lang.String.class), new Object[] { java.util.Objects.requireNonNull(name, "name is required") });
        }
    }
}
