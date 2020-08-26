package software.amazon.jsii.tests.calculator;

/**
 * Verifies that a "pure" implementation of an interface works correctly.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IStructReturningDelegate")
@software.amazon.jsii.Jsii.Proxy(IStructReturningDelegate.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface IStructReturningDelegate extends software.amazon.jsii.JsiiSerializable {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.StructB returnStruct();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IStructReturningDelegate {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.StructB returnStruct() {
            return this.jsiiCall("returnStruct", software.amazon.jsii.tests.calculator.StructB.class);
        }
    }
}
