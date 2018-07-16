package org.jsii.tests.calculator;
public class $Module extends org.jsii.JsiiModule {
    public $Module() {
        super("jsii-calc", "0.5.0-beta", $Module.class, "jsii-calc@0.5.0-beta.jsii.tgz");
    }
    @Override
    public java.util.List<Class<? extends org.jsii.JsiiModule>> getDependencies() {
        return java.util.Arrays.asList(org.jsii.tests.calculator.lib.$Module.class);
    }
}
