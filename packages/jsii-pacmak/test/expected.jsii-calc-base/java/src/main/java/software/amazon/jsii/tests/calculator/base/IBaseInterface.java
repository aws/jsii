package software.amazon.jsii.tests.calculator.base;

@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.base.$Module.class, fqn = "@scope/jsii-calc-base.IBaseInterface")
@software.amazon.jsii.Jsii.Proxy(IBaseInterface.Jsii$Proxy.class)
public interface IBaseInterface extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.baseofbase.IVeryBaseInterface {

    void bar();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.base.IBaseInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        @Override
        public void bar() {
            this.jsiiCall("bar", Void.class);
        }

        @Override
        public void foo() {
            this.jsiiCall("foo", Void.class);
        }
    }
}
