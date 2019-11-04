package software.amazon.jsii.tests.calculator.baseofbase;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.baseofbase.$Module.class, fqn = "@scope/jsii-calc-base-of-base.IVeryBaseInterface")
@software.amazon.jsii.Jsii.Proxy(IVeryBaseInterface.Jsii$Proxy.class)
public interface IVeryBaseInterface extends software.amazon.jsii.JsiiSerializable {

    void foo();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.baseofbase.IVeryBaseInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        @Override
        public void foo() {
            this.jsiiCall("foo", Void.class);
        }
    }
}
