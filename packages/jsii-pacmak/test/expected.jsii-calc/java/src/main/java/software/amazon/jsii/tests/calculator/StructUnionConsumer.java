package software.amazon.jsii.tests.calculator;

/**
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.StructUnionConsumer")
public class StructUnionConsumer extends software.amazon.jsii.JsiiObject {

    protected StructUnionConsumer(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected StructUnionConsumer(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * @param struct This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static @org.jetbrains.annotations.NotNull java.lang.Boolean isStructA(final @org.jetbrains.annotations.NotNull java.lang.Object struct) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.StructUnionConsumer.class, "isStructA", java.lang.Boolean.class, new Object[] { java.util.Objects.requireNonNull(struct, "struct is required") });
    }

    /**
     * @param struct This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static @org.jetbrains.annotations.NotNull java.lang.Boolean isStructB(final @org.jetbrains.annotations.NotNull java.lang.Object struct) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.StructUnionConsumer.class, "isStructB", java.lang.Boolean.class, new Object[] { java.util.Objects.requireNonNull(struct, "struct is required") });
    }
}
