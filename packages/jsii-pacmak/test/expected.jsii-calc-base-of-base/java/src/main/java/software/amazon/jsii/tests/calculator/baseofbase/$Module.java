package software.amazon.jsii.tests.calculator.baseofbase;

import software.amazon.jsii.JsiiModule;

public final class $Module extends JsiiModule {
    public $Module() {
        super("@scope/jsii-calc-base-of-base", "0.0.0", $Module.class, "jsii-calc-base-of-base@0.0.0.jsii.tgz");
    }

    @Override
    protected Class<?> resolveClass(final String fqn) throws ClassNotFoundException {
        switch (fqn) {
            case "@scope/jsii-calc-base-of-base.IVeryBaseInterface": return software.amazon.jsii.tests.calculator.baseofbase.IVeryBaseInterface.class;
            case "@scope/jsii-calc-base-of-base.Very": return software.amazon.jsii.tests.calculator.baseofbase.Very.class;
            case "@scope/jsii-calc-base-of-base.VeryBaseProps": return software.amazon.jsii.tests.calculator.baseofbase.VeryBaseProps.class;
            default: throw new ClassNotFoundException("Unknown JSII type: " + fqn);
        }
    }
}
