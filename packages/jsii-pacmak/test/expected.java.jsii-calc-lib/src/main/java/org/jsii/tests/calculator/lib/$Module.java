package org.jsii.tests.calculator.lib;

import static java.util.Arrays.asList;

import java.util.List;
import org.jsii.JsiiModule;

public final class $Module extends JsiiModule {
    public $Module() {
        super("@scope/jsii-calc-lib", "0.5.0-beta", $Module.class, "jsii-calc-lib@0.5.0-beta.jsii.tgz");
    }

    @Override
    public List<Class<? extends JsiiModule>> getDependencies() {
        return asList(org.jsii.tests.calculator.base.$Module.class);
    }
}
