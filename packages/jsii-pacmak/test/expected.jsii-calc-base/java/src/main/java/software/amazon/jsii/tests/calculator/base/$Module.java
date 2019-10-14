package software.amazon.jsii.tests.calculator.base;

import static java.util.Arrays.asList;

import java.util.List;
import software.amazon.jsii.JsiiModule;

public final class $Module extends JsiiModule {
    public $Module() {
        super("@scope/jsii-calc-base", "0.19.0", $Module.class, "jsii-calc-base@0.19.0.jsii.tgz");
    }

    @Override
    public List<Class<? extends JsiiModule>> getDependencies() {
        return asList(software.amazon.jsii.tests.calculator.baseofbase.$Module.class);
    }

    @Override
    protected Class<?> resolveClass(final String fqn) throws ClassNotFoundException {
        switch (fqn) {
            case "@scope/jsii-calc-base.Base": return software.amazon.jsii.tests.calculator.base.Base.class;
            case "@scope/jsii-calc-base.BaseProps": return software.amazon.jsii.tests.calculator.base.BaseProps.class;
            case "@scope/jsii-calc-base.IBaseInterface": return software.amazon.jsii.tests.calculator.base.IBaseInterface.class;
            default: throw new ClassNotFoundException("Unknown JSII type: " + fqn);
        }
    }
}
