package software.amazon.jsii.tests.calculator.submodule.child;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.submodule.child.InnerClass")
public class InnerClass extends software.amazon.jsii.JsiiObject {

    protected InnerClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected InnerClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    static {
        STATIC_PROP = software.amazon.jsii.JsiiObject.jsiiStaticGet(software.amazon.jsii.tests.calculator.submodule.child.InnerClass.class, "staticProp", software.amazon.jsii.tests.calculator.submodule.child.SomeStruct.class);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public InnerClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public final static software.amazon.jsii.tests.calculator.submodule.child.SomeStruct STATIC_PROP;
}
