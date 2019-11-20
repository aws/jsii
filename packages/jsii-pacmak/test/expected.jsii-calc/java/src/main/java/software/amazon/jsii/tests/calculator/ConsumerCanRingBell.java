package software.amazon.jsii.tests.calculator;

/**
 * Test calling back to consumers that implement interfaces.
 * 
 * <p>Check that if a JSII consumer implements IConsumerWithInterfaceParam, they can call
 * the method on the argument that they're passed...</p>
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.ConsumerCanRingBell")
public class ConsumerCanRingBell extends software.amazon.jsii.JsiiObject {

    protected ConsumerCanRingBell(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected ConsumerCanRingBell(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public ConsumerCanRingBell() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * ...if the interface is implemented using an object literal.
     * 
     * <p>Returns whether the bell was rung.</p>
     * 
     * EXPERIMENTAL
     * 
     * @param ringer This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static java.lang.Boolean staticImplementedByObjectLiteral(final software.amazon.jsii.tests.calculator.IBellRinger ringer) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.ConsumerCanRingBell.class, "staticImplementedByObjectLiteral", java.lang.Boolean.class, new Object[] { java.util.Objects.requireNonNull(ringer, "ringer is required") });
    }

    /**
     * ...if the interface is implemented using a private class.
     * 
     * <p>Return whether the bell was rung.</p>
     * 
     * EXPERIMENTAL
     * 
     * @param ringer This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static java.lang.Boolean staticImplementedByPrivateClass(final software.amazon.jsii.tests.calculator.IBellRinger ringer) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.ConsumerCanRingBell.class, "staticImplementedByPrivateClass", java.lang.Boolean.class, new Object[] { java.util.Objects.requireNonNull(ringer, "ringer is required") });
    }

    /**
     * ...if the interface is implemented using a public class.
     * 
     * <p>Return whether the bell was rung.</p>
     * 
     * EXPERIMENTAL
     * 
     * @param ringer This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static java.lang.Boolean staticImplementedByPublicClass(final software.amazon.jsii.tests.calculator.IBellRinger ringer) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.ConsumerCanRingBell.class, "staticImplementedByPublicClass", java.lang.Boolean.class, new Object[] { java.util.Objects.requireNonNull(ringer, "ringer is required") });
    }

    /**
     * If the parameter is a concrete class instead of an interface.
     * 
     * <p>Return whether the bell was rung.</p>
     * 
     * EXPERIMENTAL
     * 
     * @param ringer This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static java.lang.Boolean staticWhenTypedAsClass(final software.amazon.jsii.tests.calculator.IConcreteBellRinger ringer) {
        return software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.ConsumerCanRingBell.class, "staticWhenTypedAsClass", java.lang.Boolean.class, new Object[] { java.util.Objects.requireNonNull(ringer, "ringer is required") });
    }

    /**
     * ...if the interface is implemented using an object literal.
     * 
     * <p>Returns whether the bell was rung.</p>
     * 
     * EXPERIMENTAL
     * 
     * @param ringer This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Boolean implementedByObjectLiteral(final software.amazon.jsii.tests.calculator.IBellRinger ringer) {
        return this.jsiiCall("implementedByObjectLiteral", java.lang.Boolean.class, new Object[] { java.util.Objects.requireNonNull(ringer, "ringer is required") });
    }

    /**
     * ...if the interface is implemented using a private class.
     * 
     * <p>Return whether the bell was rung.</p>
     * 
     * EXPERIMENTAL
     * 
     * @param ringer This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Boolean implementedByPrivateClass(final software.amazon.jsii.tests.calculator.IBellRinger ringer) {
        return this.jsiiCall("implementedByPrivateClass", java.lang.Boolean.class, new Object[] { java.util.Objects.requireNonNull(ringer, "ringer is required") });
    }

    /**
     * ...if the interface is implemented using a public class.
     * 
     * <p>Return whether the bell was rung.</p>
     * 
     * EXPERIMENTAL
     * 
     * @param ringer This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Boolean implementedByPublicClass(final software.amazon.jsii.tests.calculator.IBellRinger ringer) {
        return this.jsiiCall("implementedByPublicClass", java.lang.Boolean.class, new Object[] { java.util.Objects.requireNonNull(ringer, "ringer is required") });
    }

    /**
     * If the parameter is a concrete class instead of an interface.
     * 
     * <p>Return whether the bell was rung.</p>
     * 
     * EXPERIMENTAL
     * 
     * @param ringer This parameter is required.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public java.lang.Boolean whenTypedAsClass(final software.amazon.jsii.tests.calculator.IConcreteBellRinger ringer) {
        return this.jsiiCall("whenTypedAsClass", java.lang.Boolean.class, new Object[] { java.util.Objects.requireNonNull(ringer, "ringer is required") });
    }
}
