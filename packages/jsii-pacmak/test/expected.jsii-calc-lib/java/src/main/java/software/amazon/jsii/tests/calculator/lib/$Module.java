package software.amazon.jsii.tests.calculator.lib;

import static java.util.Arrays.asList;

import java.util.List;
import software.amazon.jsii.JsiiModule;

public final class $Module extends JsiiModule {
    public $Module() {
        super("@scope/jsii-calc-lib", "0.6.0", $Module.class, "jsii-calc-lib@0.6.0.jsii.tgz");
    }

    @Override
    public List<Class<? extends JsiiModule>> getDependencies() {
        return asList(software.amazon.jsii.tests.calculator.base.$Module.class);
    }
}
