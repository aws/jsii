package software.amazon.jsii;

import com.fasterxml.jackson.databind.JsonNode;
import org.jetbrains.annotations.Nullable;

/**
 * A static helper to interact with the kernel in a "simple" way.
 */
@Internal
public final class Kernel {
    /**
     * Calls an async method on the object.
     *
     * @param receiver the receiver for the method call.
     * @param method The name of the method.
     * @param nativeType The return type.
     * @param args Method arguments.
     * @param <T> Java type for the return value.
     *
     * @return A return value.
     */
    @Nullable
    @Internal
    public static <T> T asyncCall(final Object receiver, final String method, final NativeType<T> nativeType, @Nullable final Object... args) {
        final JsiiEngine engine = JsiiEngine.getEngineFor(receiver);
        final JsiiObjectRef objRef = engine.nativeToObjRef(receiver);

        final JsiiClient client = engine.getClient();
        final JsiiPromise promise = client.beginAsyncMethod(objRef, method, JsiiObjectMapper.valueToTree(args));

        engine.processAllPendingCallbacks();

        return JsiiObjectMapper.treeToValue(client.endAsyncMethod(promise), nativeType);
    }

    /**
     * Calls a JavaScript method on a receiver.
     *
     * @param receiver the receiver for the method call
     * @param method The name of the method.
     * @param nativeType The return type.
     * @param args Method arguments.
     * @param <T> Java type for the return value.
     *
     * @return A return value.
     */
    @Nullable
    @Internal
    public static <T> T call(final Object receiver, final String method, final NativeType<T> nativeType, @Nullable final Object... args) {
        final JsiiEngine engine = JsiiEngine.getEngineFor(receiver);
        final JsiiObjectRef objRef = engine.nativeToObjRef(receiver);
        final JsonNode result = engine.getClient().callMethod(objRef, method, JsiiObjectMapper.valueToTree(args));
        return JsiiObjectMapper.treeToValue(result, nativeType);
    }

    /**
     * Gets a property value from the object.
     *
     * @param receiver The receiver of the property access.
     * @param property The property name.
     * @param type The Java type of the property.
     * @param <T> The Java type of the property.
     *
     * @return The property value.
     */
    @Nullable
    @Internal
    public static <T> T get(final Object receiver, final String property, final NativeType<T> type) {
        final JsiiEngine engine = JsiiEngine.getEngineFor(receiver);
        final JsiiObjectRef objRef = engine.nativeToObjRef(receiver);

        final JsonNode result = engine.getClient().getPropertyValue(objRef, property);
        return JsiiObjectMapper.treeToValue(result, type);
    }

    /**
     * Sets a property value of an object.
     *
     * @param receiver The receiver of the property access.
     * @param property The name of the property.
     * @param value The property value.
     */
    @Internal
    public static void set(final Object receiver, final String property, @Nullable final Object value) {
        final JsiiEngine engine = JsiiEngine.getEngineFor(receiver);
        final JsiiObjectRef objRef = engine.nativeToObjRef(receiver);

        engine.getClient().setPropertyValue(objRef, property, JsiiObjectMapper.valueToTree(value));
    }

    private Kernel() {
        throw new UnsupportedOperationException();
    }
}
