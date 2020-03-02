package software.amazon.jsii.tests.calculator;

/**
 * This tries to confuse Jackson by having overloaded property setters.
 * <p>
 * EXPERIMENTAL
 * <p>
 * @see https://github.com/aws/aws-cdk/issues/4080
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ConfusingToJackson")
public class ConfusingToJackson extends software.amazon.jsii.JsiiObject {

    protected ConfusingToJackson(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ConfusingToJackson(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.ConfusingToJackson makeInstance() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.ConfusingToJackson.class, "makeInstance", software.amazon.jsii.tests.calculator.ConfusingToJackson.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.ConfusingToJacksonStruct makeStructInstance() {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.ConfusingToJackson.class, "makeStructInstance", software.amazon.jsii.tests.calculator.ConfusingToJacksonStruct.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public @org.jetbrains.annotations.Nullable java.lang.Object getUnionProperty() {
        return this.jsiiGet("unionProperty", java.lang.Object.class);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final @org.jetbrains.annotations.Nullable software.amazon.jsii.tests.calculator.lib.IFriendly value) {
        this.jsiiSet("unionProperty", value);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void setUnionProperty(final @org.jetbrains.annotations.Nullable java.util.List<java.lang.Object> value) {
        this.jsiiSet("unionProperty", value);
    }
}
