package org.jsii.tests.calculator;

import static java.util.Arrays.asList;

import java.util.List;
import org.jsii.JsiiModule;

public final class $Module extends JsiiModule {
    public $Module() {
        super("jsii-calc", "0.5.0-beta", $Module.class, "jsii-calc@0.5.0-beta.jsii.tgz");
    }

    @Override
    public List<Class<? extends JsiiModule>> getDependencies() {
        return asList(org.jsii.tests.calculator.base.$Module.class, org.jsii.tests.calculator.lib.$Module.class);
    }
}
