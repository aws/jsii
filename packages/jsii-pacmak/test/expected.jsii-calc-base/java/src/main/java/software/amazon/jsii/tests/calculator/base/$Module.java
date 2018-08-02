package software.amazon.jsii.tests.calculator.base;

import static java.util.Arrays.asList;

import java.util.List;
import software.amazon.jsii.JsiiModule;

public final class $Module extends JsiiModule {
    public $Module() {
        super("@scope/jsii-calc-base", "0.5.0-beta", $Module.class, "jsii-calc-base@0.5.0-beta.jsii.tgz");
    }

    @Override
    public List<Class<? extends JsiiModule>> getDependencies() {
        return asList(software.amazon.jsii.tests.calculator.baseofbase.$Module.class);
    }
}
