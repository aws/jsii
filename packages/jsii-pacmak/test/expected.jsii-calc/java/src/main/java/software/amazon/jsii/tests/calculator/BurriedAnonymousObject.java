package software.amazon.jsii.tests.calculator;

/**
 * See https://github.com/aws/aws-cdk/issues/7977.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.BurriedAnonymousObject")
public abstract class BurriedAnonymousObject extends software.amazon.jsii.JsiiObject {

    protected BurriedAnonymousObject(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected BurriedAnonymousObject(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    protected BurriedAnonymousObject() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.NotNull java.lang.Boolean check() {
        return this.jsiiCall("check", java.lang.Boolean.class);
    }

    /**
     * Implement this method and have it return it's parameter.
     * <p>
     * EXPERIMENTAL
     * <p>
     * @return `value`
     * @param value the value that should be returned. This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public abstract @org.jetbrains.annotations.NotNull java.lang.Object giveItBack(final @org.jetbrains.annotations.NotNull java.lang.Object value);

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.tests.calculator.BurriedAnonymousObject {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * Implement this method and have it return it's parameter.
         * <p>
         * EXPERIMENTAL
         * <p>
         * @return `value`
         * @param value the value that should be returned. This parameter is required.
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public @org.jetbrains.annotations.NotNull java.lang.Object giveItBack(final @org.jetbrains.annotations.NotNull java.lang.Object value) {
            return this.jsiiCall("giveItBack", java.lang.Object.class, new Object[] { value });
        }
    }
}
