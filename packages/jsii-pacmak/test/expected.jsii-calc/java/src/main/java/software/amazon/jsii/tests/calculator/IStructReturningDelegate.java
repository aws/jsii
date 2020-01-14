package software.amazon.jsii.tests.calculator;

/**
 * Verifies that a "pure" implementation of an interface works correctly.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.IStructReturningDelegate")
@software.amazon.jsii.Jsii.Proxy(IStructReturningDelegate.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface IStructReturningDelegate extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    software.amazon.jsii.tests.calculator.StructB returnStruct();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IStructReturningDelegate {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         * EXPERIMENTAL
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public software.amazon.jsii.tests.calculator.StructB returnStruct() {
            return this.jsiiCall("returnStruct", software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.StructB.class));
        }
    }
}
