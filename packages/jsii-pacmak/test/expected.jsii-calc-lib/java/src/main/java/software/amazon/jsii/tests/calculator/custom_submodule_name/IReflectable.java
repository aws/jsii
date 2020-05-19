package software.amazon.jsii.tests.calculator.custom_submodule_name;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.lib.$Module.class, fqn = "@scope/jsii-calc-lib.submodule.IReflectable")
@software.amazon.jsii.Jsii.Proxy(IReflectable.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@Deprecated
public interface IReflectable extends software.amazon.jsii.JsiiSerializable {

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    @org.jetbrains.annotations.NotNull java.util.List<software.amazon.jsii.tests.calculator.custom_submodule_name.ReflectableEntry> getEntries();

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.custom_submodule_name.IReflectable {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
        }

        /**
         */
        @Override
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        public @org.jetbrains.annotations.NotNull java.util.List<software.amazon.jsii.tests.calculator.custom_submodule_name.ReflectableEntry> getEntries() {
            return java.util.Collections.unmodifiableList(this.jsiiGet("entries", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.custom_submodule_name.ReflectableEntry.class))));
        }
    }
}
