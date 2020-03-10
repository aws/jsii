package software.amazon.jsii.tests.calculator.compliance;

/**
 * Verifies that collections of interfaces or structs are correctly handled.
 * <p>
 * See: https://github.com/aws/jsii/issues/1196
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.compliance.InterfaceCollections")
public class InterfaceCollections extends software.amazon.jsii.JsiiObject {

    protected InterfaceCollections(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected InterfaceCollections(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull java.util.List<software.amazon.jsii.tests.calculator.compliance.IBell> listOfInterfaces() {
        return java.util.Collections.unmodifiableList(software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.compliance.InterfaceCollections.class, "listOfInterfaces", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.compliance.IBell.class))));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull java.util.List<software.amazon.jsii.tests.calculator.compliance.StructA> listOfStructs() {
        return java.util.Collections.unmodifiableList(software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.compliance.InterfaceCollections.class, "listOfStructs", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.compliance.StructA.class))));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.compliance.IBell> mapOfInterfaces() {
        return java.util.Collections.unmodifiableMap(software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.compliance.InterfaceCollections.class, "mapOfInterfaces", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.compliance.IBell.class))));
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static @org.jetbrains.annotations.NotNull java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.compliance.StructA> mapOfStructs() {
        return java.util.Collections.unmodifiableMap(software.amazon.jsii.JsiiObject.jsiiStaticCall(software.amazon.jsii.tests.calculator.compliance.InterfaceCollections.class, "mapOfStructs", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.compliance.StructA.class))));
    }
}
