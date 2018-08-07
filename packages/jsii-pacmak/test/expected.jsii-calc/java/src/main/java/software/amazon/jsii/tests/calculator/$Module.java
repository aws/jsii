package software.amazon.jsii.tests.calculator;

import static java.util.Arrays.asList;

import java.util.List;
import software.amazon.jsii.JsiiModule;

public final class $Module extends JsiiModule {
    public $Module() {
        super("jsii-calc", "0.6.2", $Module.class, "jsii-calc@0.6.2.jsii.tgz");
    }

    @Override
    public List<Class<? extends JsiiModule>> getDependencies() {
        return asList(software.amazon.jsii.tests.calculator.base.$Module.class, software.amazon.jsii.tests.calculator.lib.$Module.class);
    }
}
