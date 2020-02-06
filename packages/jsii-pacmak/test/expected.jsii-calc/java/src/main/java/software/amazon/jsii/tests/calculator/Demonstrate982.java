package software.amazon.jsii.tests.calculator;

/**
 * 1.
 * <p>
 * call #takeThis() -&gt; An ObjectRef will be provisioned for the value (it'll be re-used!)
 * 2. call #takeThisToo() -&gt; The ObjectRef from before will need to be down-cased to the ParentStruct982 type
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.Demonstrate982")
public class Demonstrate982 extends software.amazon.jsii.JsiiObject {

    protected Demonstrate982(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected Demonstrate982(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public Demonstrate982() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * It's dangerous to go alone!
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.ChildStruct982 takeThis() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.Demonstrate982.class, "takeThis", software.amazon.jsii.tests.calculator.ChildStruct982.class);
    }

    /**
     * It's dangerous to go alone!
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.ParentStruct982 takeThisToo() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.Demonstrate982.class, "takeThisToo", software.amazon.jsii.tests.calculator.ParentStruct982.class);
    }
}
