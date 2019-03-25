package software.amazon.jsii;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.TreeNode;
import com.fasterxml.jackson.databind.JsonNode;

import javax.annotation.Nullable;

/**
 * Represents a JavaScript object in the Java world.
 */
public class JsiiObject implements JsiiSerializable {

    /**
     * JSON object mapper.
     */
    private static final JsiiObjectMapper OM = JsiiObjectMapper.instance;

    /**
     * The jsii engine used by this object.
     */
    private final static JsiiEngine engine = JsiiEngine.getInstance();

    /**
     * The underlying {@link JsiiObjectRef} instance.
     */
    private JsiiObjectRef objRef;

    /**
     * A special constructor that allows creating wrapper objects while bypassing the normal constructor
     * chain. This is used when an object was created in javascript-land and just needs a wrapper in native-land.
     * @param initializationMode Must always be set to "Jsii".
     */
    protected JsiiObject(final InitializationMode initializationMode) {
        if (initializationMode != InitializationMode.Jsii) {
            throw new JsiiException("The only supported initialization mode is 'Jsii'");
        }
    }

    /**
     * Used as a marker for bypassing native ctor chain.
     */
    public enum InitializationMode {
        /**
         * Used as a way to bypass the the native constructor chain to allow classes that do not extend
         * JsiiObject directly to perform the initialization logic in javascript instead of natively.
         */
        Jsii
    }

    /**
     * Calls a JavaScript method on the object.
     * @param method The name of the method.
     * @param returnType The return type.
     * @param args Method arguments.
     * @param <T> Java type for the return value.
     * @return A return value.
     */
    @Nullable
    protected final <T> T jsiiCall(final String method, final Class<T> returnType, @Nullable final Object... args) {
        try {
            return OM.treeToValue(JsiiObject.engine.getClient().callMethod(
                    this.objRef,
                    method,
                    OM.valueToTree(args)),
                    returnType);

        } catch (JsonProcessingException e) {
            throw new JsiiException(e);
        }
    }

    /**
     * Calls a static method.
     * @param nativeClass The java class.
     * @param method The method to call.
     * @param returnType The return type.
     * @param args The method arguments.
     * @param <T> Return type.
     * @return Return value.
     */
    @Nullable
    protected static <T> T jsiiStaticCall(final Class<?> nativeClass, final String method, final Class<T> returnType, @Nullable final Object... args) {
        String fqn = engine.loadModuleForClass(nativeClass);
        try {
            return OM.treeToValue(engine.getClient().callStaticMethod(
                    fqn,
                    method,
                    OM.valueToTree(args)),
                    returnType);

        } catch (JsonProcessingException e) {
            throw new JsiiException(e);
        }
    }

    /**
     * Calls an async method on the object.
     * @param method The name of the method.
     * @param returnType The return type.
     * @param args Method arguments.
     * @param <T> Java type for the return value.
     * @return A ereturn value.
     */
    @Nullable
    protected final <T> T jsiiAsyncCall(final String method, final Class<T> returnType, @Nullable final Object... args) {
        try {
            JsiiClient client = engine.getClient();
            JsiiPromise promise = client.beginAsyncMethod(this.objRef, method, OM.valueToTree(args));

            engine.processAllPendingCallbacks();

            JsonNode ret = client.endAsyncMethod(promise);
            return OM.treeToValue(ret, returnType);
        } catch (JsonProcessingException e) {
            throw new JsiiException(e);
        }
    }

    /**
     * Gets a property value from the object.
     * @param property The property name.
     * @param type The Java type of the property.
     * @param <T> The Java type of the property.
     * @return The property value.
     */
    @Nullable
    protected final <T> T jsiiGet(final String property, final Class<T> type) {
        try {
            return OM.treeToValue(engine.getClient().getPropertyValue(this.objRef, property), type);
        } catch (JsonProcessingException e) {
            throw new JsiiException(e);
        }
    }

    /**
     * Returns the value of a static property.
     * @param nativeClass The java class.
     * @param property The name of the property.
     * @param type The expected java return type.
     * @param <T> Return type
     * @return Return value
     */
    @Nullable
    protected static <T> T jsiiStaticGet(final Class<?> nativeClass, final String property, final Class<T> type) {
        try {
            String fqn = engine.loadModuleForClass(nativeClass);
            return OM.treeToValue(engine.getClient().getStaticPropertyValue(fqn, property), type);
        } catch (JsonProcessingException e) {
            throw new JsiiException(e);
        }
    }

    /**
     * Sets a property value of an object.
     * @param property The name of the property.
     * @param value The property value.
     */
    protected final void jsiiSet(final String property, @Nullable final Object value) {
        engine.getClient().setPropertyValue(this.objRef, property, OM.valueToTree(value));
    }

    /**
     * Sets a value for a static property.
     * @param nativeClass The java class.
     * @param property The name of the property
     * @param value The value
     */
    protected static void jsiiStaticSet(final Class<?> nativeClass, final String property, @Nullable final Object value) {
        String fqn = engine.loadModuleForClass(nativeClass);
        engine.getClient().setStaticPropertyValue(fqn, property, OM.valueToTree(value));
    }

    /**
     * Sets the jsii object reference for this object.
     * @param objRef The objref
     */
    final void setObjRef(final JsiiObjectRef objRef) {
        this.objRef = objRef;
    }

    /**
     * Gets the jsii object reference for this object.
     * @return The objref.
     */
    final JsiiObjectRef getObjRef() {
        return objRef;
    }
}
