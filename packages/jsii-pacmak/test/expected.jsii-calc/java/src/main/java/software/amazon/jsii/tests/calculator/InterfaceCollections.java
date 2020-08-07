package software.amazon.jsii.tests.calculator;

/**
 * Verifies that collections of interfaces or structs are correctly handled. (experimental)
 * <p>
 * See: https://github.com/aws/jsii/issues/1196
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.InterfaceCollections")
public class InterfaceCollections extends software.amazon.jsii.JsiiObject {

    protected InterfaceCollections(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected InterfaceCollections(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull java.util.List<software.amazon.jsii.tests.calculator.IBell> listOfInterfaces() {
        return java.util.Collections.unmodifiableList(software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.InterfaceCollections.class, "listOfInterfaces", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.IBell.class))));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull java.util.List<software.amazon.jsii.tests.calculator.StructA> listOfStructs() {
        return java.util.Collections.unmodifiableList(software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.InterfaceCollections.class, "listOfStructs", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.StructA.class))));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.IBell> mapOfInterfaces() {
        return java.util.Collections.unmodifiableMap(software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.InterfaceCollections.class, "mapOfInterfaces", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.IBell.class))));
    }

    /**
     *  (experimental)
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.StructA> mapOfStructs() {
        return java.util.Collections.unmodifiableMap(software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.InterfaceCollections.class, "mapOfStructs", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.StructA.class))));
    }
}
