package org.jsii.tests.calculator.base;

import static java.util.Arrays.asList;

import java.util.List;
import org.jsii.JsiiModule;

public final class $Module extends JsiiModule {
    public $Module() {
        super("@scope/jsii-calc-base", "0.5.0-beta", $Module.class, "jsii-calc-base@0.5.0-beta.jsii.tgz");
    }

    @Override
    public List<Class<? extends JsiiModule>> getDependencies() {
        return asList(org.jsii.tests.calculator.baseofbase.$Module.class);
    }
}
