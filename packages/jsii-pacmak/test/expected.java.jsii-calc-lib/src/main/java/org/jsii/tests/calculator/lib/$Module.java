package org.jsii.tests.calculator.lib;
public class $Module extends org.jsii.JsiiModule {
    public $Module() {
        super("@scope/jsii-calc-lib", "0.5.0-beta", $Module.class, "jsii-calc-lib@0.5.0-beta.jsii.tgz");
    }
    @Override
    public java.util.List<Class<? extends org.jsii.JsiiModule>> getDependencies() {
        return java.util.Arrays.asList(org.jsii.tests.calculator.base.$Module.class);
    }
}
