package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.AbstractClass")
public abstract class AbstractClass extends software.amazon.jsii.tests.calculator.AbstractClassBase implements software.amazon.jsii.tests.calculator.IInterfaceImplementedByAbstractClass {

    protected AbstractClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected AbstractClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    protected AbstractClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * @param name This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public abstract @org.jetbrains.annotations.NotNull java.lang.String abstractMethod(final @org.jetbrains.annotations.NotNull java.lang.String name);

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.Number nonAbstractMethod() {
        return this.jsiiCall("nonAbstractMethod", java.lang.Number.class);
    }

    /**
     */
    @Override
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public @org.jetbrains.annotations.NotNull java.lang.String getPropFromInterface() {
        return this.jsiiGet("propFromInterface", java.lang.String.class);
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.AbstractClass {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public @org.jetbrains.annotations.NotNull java.lang.String getPropFromInterface() {
            return this.jsiiGet("propFromInterface", java.lang.String.class);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public @org.jetbrains.annotations.NotNull java.lang.String getAbstractProperty() {
            return this.jsiiGet("abstractProperty", java.lang.String.class);
        }

        /**
         * @param name This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public @org.jetbrains.annotations.NotNull java.lang.String abstractMethod(final @org.jetbrains.annotations.NotNull java.lang.String name) {
            return this.jsiiCall("abstractMethod", java.lang.String.class, new Object[] { java.util.Objects.requireNonNull(name, "name is required") });
        }
    }
}
