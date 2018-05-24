package org.jsii;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;

/**
 * Represents a JavaScript object in the Java world.
 */
public class JsiiObject implements JsiiSerializable {

    /**
     * JSON object mapper.
     */
    private static final JsiiObjectMapper OM = new JsiiObjectMapper();

    /**
     * The jsii engine used by this object.
     */
    private final JsiiEngine engine = JsiiEngine.getInstance();

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
    protected <T> T jsiiCall(final String method, final Class<T> returnType, final Object... args) {
        try {
            return OM.treeToValue(this.engine.getClient().callMethod(
                    this.objRef,
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
    public <T> T jsiiAsyncCall(final String method, final Class<T> returnType, final Object... args) {
        try {
            JsiiClient client = this.engine.getClient();
            JsiiPromise promise = client.beginAsyncMethod(this.objRef, method, OM.valueToTree(args));

            this.engine.processAllPendingCallbacks();

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
    protected <T> T jsiiGet(final String property, final Class<T> type) {
        try {
            return OM.treeToValue(this.engine.getClient().getPropertyValue(this.objRef, property), type);
        } catch (JsonProcessingException e) {
            throw new JsiiException(e);
        }
    }

    /**
     * Sets a property value of an object.
     * @param property The name of the property.
     * @param value The property value.
     */
    protected void jsiiSet(final String property, final Object value) {
        this.engine.getClient().setPropertyValue(this.objRef, property, OM.valueToTree(value));
    }

    /**
     * Sets the jsii object reference for this object.
     * @param objRef The objref
     */
    void setObjRef(final JsiiObjectRef objRef) {
        this.objRef = objRef;
    }

    /**
     * Gets the jsii object reference for this object.
     * @return The objref.
     */
    JsiiObjectRef getObjRef() {
        return objRef;
    }
}
