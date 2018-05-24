package org.jsii.tests.calculator;
public class $Module extends org.jsii.JsiiModule {
    public $Module() {
        super("jsii$jsii_calc$", $Module.class.getResource("assembly.jsii"));
    }
    @Override
    public java.util.List<Class> getDependencies() {
        return java.util.Arrays.asList(org.jsii.tests.calculator.lib.$Module.class);
    }
}
