package software.amazon.jsii;

import com.fasterxml.jackson.databind.JsonNode;

import org.jetbrains.annotations.Nullable;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * Represents a JavaScript object in the Java world.
 */
@Internal
public interface IJsiiObject extends JsiiSerializable {
    /**
     * Calls a JavaScript method on the object.
     * @param method The name of the method.
     * @param nativeType The return type.
     * @param args Method arguments.
     * @param <T> Java type for the return value.
     *
     * @return A return value.
     */
    @Nullable
    @Internal
    <T> T $jsii$call(final String method, final NativeType<T> nativeType, @Nullable final Object... args);

    /**
     * Calls an async method on the object.
     * @param method The name of the method.
     * @param nativeType The return type.
     * @param args Method arguments.
     * @param <T> Java type for the return value.
     *
     * @return A return value.
     */
    @Nullable
    @Internal
    <T> T $jsii$asyncCall(final String method, final NativeType<T> nativeType, @Nullable final Object... args);

    /**
     * Gets a property value from the object.
     * @param property The property name.
     * @param type The Java type of the property.
     * @param <T> The Java type of the property.
     * @return The property value.
     */
    @Nullable
    @Internal
    <T> T $jsii$get(final String property, final NativeType<T> type);

    /**
     * Sets a property value of an object.
     *
     * @param property The name of the property.
     * @param value The property value.
     */
    @Internal
    void $jsii$set(final String property, @Nullable final Object value);
}
