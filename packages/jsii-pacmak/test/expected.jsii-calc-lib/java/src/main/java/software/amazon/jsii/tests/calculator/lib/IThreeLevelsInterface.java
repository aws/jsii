package software.amazon.jsii.tests.calculator.lib;

/**
 * Interface that inherits from packages 2 levels up the tree.
<<<<<<< HEAD
 * <p>
 * Their presence validates that .NET/Java/jsii-reflect can track all fields
 * far enough up the tree.
=======
 * 
 * <p>Their presence validates that .NET/Java/jsii-reflect can track all fields
 * far enough up the tree.</p>
>>>>>>> origin/master
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.lib.$Module.class, fqn = "@scope/jsii-calc-lib.IThreeLevelsInterface")
@software.amazon.jsii.Jsii.Proxy(IThreeLevelsInterface.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@Deprecated
public interface IThreeLevelsInterface extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.base.IBaseInterface {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    void baz();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.lib.IThreeLevelsInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        @Override
        public void baz() {
            this.jsiiCall("baz", Void.class);
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
