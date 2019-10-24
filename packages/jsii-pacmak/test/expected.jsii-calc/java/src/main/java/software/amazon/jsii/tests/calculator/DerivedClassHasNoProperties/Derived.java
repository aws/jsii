package software.amazon.jsii.tests.calculator.DerivedClassHasNoProperties;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DerivedClassHasNoProperties.Derived")
public class Derived extends software.amazon.jsii.tests.calculator.DerivedClassHasNoProperties.Base {

    protected Derived(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Derived(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public Derived() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        this.setObjRef(software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this));
    }
}
