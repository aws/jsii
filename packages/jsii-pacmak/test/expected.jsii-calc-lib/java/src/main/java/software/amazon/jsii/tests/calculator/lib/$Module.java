package software.amazon.jsii.tests.calculator.lib;

import static java.util.Arrays.asList;

import java.util.List;
import software.amazon.jsii.JsiiModule;

public final class $Module extends JsiiModule {
    public $Module() {
        super("@scope/jsii-calc-lib", "0.19.0", $Module.class, "jsii-calc-lib@0.19.0.jsii.tgz");
    }

    @Override
    public List<Class<? extends JsiiModule>> getDependencies() {
        return asList(software.amazon.jsii.tests.calculator.base.$Module.class);
    }

    @Override
    protected Class<?> resolveClass(final String fqn) throws ClassNotFoundException {
        switch (fqn) {
            case "@scope/jsii-calc-lib.EnumFromScopedModule": return software.amazon.jsii.tests.calculator.lib.EnumFromScopedModule.class;
            case "@scope/jsii-calc-lib.IDoublable": return software.amazon.jsii.tests.calculator.lib.IDoublable.class;
            case "@scope/jsii-calc-lib.IFriendly": return software.amazon.jsii.tests.calculator.lib.IFriendly.class;
            case "@scope/jsii-calc-lib.IThreeLevelsInterface": return software.amazon.jsii.tests.calculator.lib.IThreeLevelsInterface.class;
            case "@scope/jsii-calc-lib.MyFirstStruct": return software.amazon.jsii.tests.calculator.lib.MyFirstStruct.class;
            case "@scope/jsii-calc-lib.Number": return software.amazon.jsii.tests.calculator.lib.Number.class;
            case "@scope/jsii-calc-lib.Operation": return software.amazon.jsii.tests.calculator.lib.Operation.class;
            case "@scope/jsii-calc-lib.StructWithOnlyOptionals": return software.amazon.jsii.tests.calculator.lib.StructWithOnlyOptionals.class;
            case "@scope/jsii-calc-lib.Value": return software.amazon.jsii.tests.calculator.lib.Value.class;
            default: throw new ClassNotFoundException("Unknown JSII type: " + fqn);
        }
    }
}
