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
public class JsiiObject implements JsiiSerializable {

    /**
     * The jsii engine used by this object.
     */
    private final JsiiEngine engine;

    /**
     * The interface-proxies that this object can also be represented as.
     */
    private final Map<Class<? extends JsiiObject>, JsiiObject> proxies = new HashMap<>();

    /**
     * The underlying {@link JsiiObjectRef} instance.
     */
    private JsiiObjectRef objRef;

    /**
     * A special constructor that allows creating wrapper objects while bypassing the normal constructor
     * chain. This is used when an object was created in javascript-land and just needs a wrapper in native-land.
     *
     * @param initializationMode Must always be set to "JSII".
     */
    protected JsiiObject(final InitializationMode initializationMode) {
        this(JsiiEngine.getInstance(), initializationMode);
    }

    /**
     * A special constructor that allows creating wrapper objects while bypassing the normal constructor
     * chain. This is used when an object was created in javascript-land and just needs a wrapper in native-land.
     *
     * This constructor is meant to be used only in unit tests.
     *
     * @param engine The {@link JsiiEngine} to use.
     * @param initializationMode Must always be set to "JSII".
     */
    JsiiObject(final JsiiEngine engine, final InitializationMode initializationMode) {
        this.engine = Objects.requireNonNull(engine);
        if (initializationMode != InitializationMode.JSII) {
            throw new JsiiException("The only supported initialization mode is '" + InitializationMode.JSII + "'");
        }
    }

    /**
     * Used to construct a JSII object with a reference to an existing managed JSII node object.
     *
     * @param objRef Reference to existing managed JSII node object.
     */
    protected JsiiObject(final JsiiObjectRef objRef) {
        this(JsiiEngine.getInstance(), objRef);
    }

    /**
     * Used to construct a JSII object with a reference to an existing managed JSII node object.
     *
     * This constructor is meant to be used only in unit tests.
     *
     * @param engine the {@link JsiiEngine} to use.
     * @param objRef Reference to existing managed JSII node object.
     */
    JsiiObject(final JsiiEngine engine, final JsiiObjectRef objRef) {
        this.objRef = objRef;
        this.engine = Objects.requireNonNull(engine);
    }

    /**
     * Used as a marker for bypassing native ctor chain.
     */
    public enum InitializationMode {
        /**
         * Used as a way to bypass the the native constructor chain to allow classes that do not extend
         * JsiiObject directly to perform the initialization logic in javascript instead of natively.
         */
        JSII;
    }

    /**
     * Calls a JavaScript method on the object.
     *
     * @param method The name of the method.
     * @param returnType The return type.
     * @param args Method arguments.
     * @param <T> Java type for the return value.
     * @return A return value.
     *
     * @deprecated use {@link #jsiiCall(String, NativeType, Object...)} instead
     */
    @Nullable
    @Deprecated
    protected final <T> T jsiiCall(final String method, final Class<T> returnType, @Nullable final Object... args) {
        return jsiiCall(method, NativeType.forType(returnType), args);
    }

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
    protected final <T> T jsiiCall(final String method, final NativeType<T> nativeType, @Nullable final Object... args) {
        final JsonNode result = this.engine.getClient().callMethod(this.objRef, method, JsiiObjectMapper.valueToTree(args));
        return JsiiObjectMapper.treeToValue(result, nativeType);
    }

    /**
     * Calls a static method.
     *
     * @param nativeClass The java class.
     * @param method The method to call.
     * @param returnType The return type.
     * @param args The method arguments.
     * @param <T> Return type.
     * @return Return value.
     *
     * @deprecated use {@link #jsiiStaticCall(Class, String, NativeType, Object...)} instead
     */
    @Nullable
    @Deprecated
    protected static <T> T jsiiStaticCall(final Class<?> nativeClass, final String method, final Class<T> returnType, @Nullable final Object... args) {
        return jsiiStaticCall(nativeClass, method, NativeType.forType(returnType), args);
    }

    /**
     * Calls a static method.
     * @param nativeClass The java class.
     * @param method The method to call.
     * @param nativeType The return type.
     * @param args The method arguments.
     * @param <T> Return type.
     *
     * @return Return value.
     */
    @Nullable
    protected static <T> T jsiiStaticCall(final Class<?> nativeClass, final String method, final NativeType<T> nativeType, @Nullable final Object... args) {
        return jsiiStaticCall(JsiiEngine.getInstance(), nativeClass, method, nativeType, args);
    }

    /**
     * Calls a static method.
     *
     * This method is meant to be used only in unit tests.
     *
     * @param engine The JsiiEngine to use.
     * @param nativeClass The java class.
     * @param method The method to call.
     * @param nativeType The return type.
     * @param args The method arguments.
     * @param <T> Return type.
     *
     * @return Return value.
     */
    @Nullable
    static <T> T jsiiStaticCall(final JsiiEngine engine, final Class<?> nativeClass, final String method, final NativeType<T> nativeType, @Nullable final Object... args) {
        final String fqn = engine.loadModuleForClass(nativeClass);
        final JsonNode result = engine.getClient().callStaticMethod(fqn, method, JsiiObjectMapper.valueToTree(args));
        return JsiiObjectMapper.treeToValue(result, nativeType);
    }

    /**
     * Calls an async method on the object.
     *
     * @param method The name of the method.
     * @param returnType The return type.
     * @param args Method arguments.
     * @param <T> Java type for the return value.
     * @return A return value.
     *
     * @deprecated use {@link #jsiiAsyncCall(String, NativeType, Object...)} instead
     */
    @Nullable
    @Deprecated
    protected final <T> T jsiiAsyncCall(final String method, final Class<T> returnType, @Nullable final Object... args) {
        return jsiiAsyncCall(method, NativeType.forType(returnType), args);
    }

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
    protected final <T> T jsiiAsyncCall(final String method, final NativeType<T> nativeType, @Nullable final Object... args) {
        final JsiiClient client = engine.getClient();
        final JsiiPromise promise = client.beginAsyncMethod(this.objRef, method, JsiiObjectMapper.valueToTree(args));

        engine.processAllPendingCallbacks();

        return JsiiObjectMapper.treeToValue(client.endAsyncMethod(promise), nativeType);
    }

    /**
     * Gets a property value from the object.
     *
     * @param property The property name.
     * @param type The Java type of the property.
     * @param <T> The Java type of the property.
     *
     * @return The property value.
     *
     * @deprecated use {@link #jsiiGet(String, NativeType)} instead
     */
    @Nullable
    @Deprecated
    protected final <T> T jsiiGet(final String property, final Class<T> type) {
        return jsiiGet(property, NativeType.forType(type));
    }

    /**
     * Gets a property value from the object.
     * @param property The property name.
     * @param type The Java type of the property.
     * @param <T> The Java type of the property.
     * @return The property value.
     */
    @Nullable
    protected final <T> T jsiiGet(final String property, final NativeType<T> type) {
        final JsonNode result = engine.getClient().getPropertyValue(this.objRef, property);
        return JsiiObjectMapper.treeToValue(result, type);
    }

    /**
     * Returns the value of a static property.
     *
     * @param nativeClass The java class.
     * @param property The name of the property.
     * @param type The expected java return type.
     * @param <T> Return type
     *
     * @return Return value
     *
     * @deprecated use {@link #jsiiStaticGet(Class, String, NativeType)} instead
     */
    @Nullable
    @Deprecated
    protected static <T> T jsiiStaticGet(final Class<?> nativeClass, final String property, final Class<T> type) {
        return jsiiStaticGet(nativeClass, property, NativeType.forType(type));
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
    protected static <T> T jsiiStaticGet(final Class<?> nativeClass, final String property, final NativeType<T> type) {
        return jsiiStaticGet(JsiiEngine.getInstance(), nativeClass, property, type);
    }

    /**
     * Returns the value of a static property.
     *
     * This method is meant to be used only in unit tests.
     *
     * @param engine The JsiiEngine to use.
     * @param nativeClass The java class.
     * @param property The name of the property.
     * @param type The expected java return type.
     * @param <T> Return type
     *
     * @return Return value
     */
    @Nullable
    static <T> T jsiiStaticGet(final JsiiEngine engine, final Class<?> nativeClass, final String property, final NativeType<T> type) {
        final String fqn = engine.loadModuleForClass(nativeClass);
        final JsonNode result = engine.getClient().getStaticPropertyValue(fqn, property);
        return JsiiObjectMapper.treeToValue(result, type);
    }

    /**
     * Sets a property value of an object.
     *
     * @param property The name of the property.
     * @param value The property value.
     */
    protected final void jsiiSet(final String property, @Nullable final Object value) {
        engine.getClient().setPropertyValue(this.objRef, property, JsiiObjectMapper.valueToTree(value));
    }

    /**
     * Sets a value for a static property.
     *
     * @param nativeClass The java class.
     * @param property The name of the property
     * @param value The value
     */
    protected static void jsiiStaticSet(final Class<?> nativeClass, final String property, @Nullable final Object value) {
        jsiiStaticSet(JsiiEngine.getInstance(), nativeClass, property, value);
    }

    /**
     * Sets a value for a static property.
     *
     * This method is meant to be used only in unit tests.
     *
     * @param engine The JsiiEngine to use.
     * @param nativeClass The java class.
     * @param property The name of the property
     * @param value The value
     */
    static void jsiiStaticSet(final JsiiEngine engine, final Class<?> nativeClass, final String property, @Nullable final Object value) {
        final String fqn = engine.loadModuleForClass(nativeClass);
        engine.getClient().setStaticPropertyValue(fqn, property, JsiiObjectMapper.valueToTree(value));
    }

    /**
     * Sets the jsii object reference for this object.
     *
     * @param objRef The objref
     */
    final void setObjRef(final JsiiObjectRef objRef) {
        this.objRef = objRef;
    }

    /**
     * Gets the jsii object reference for this object.
     *
     * @return The objref.
     */
    final JsiiObjectRef getObjRef() {
        return objRef;
    }

    /**
     * Create a view of this {@link JsiiObject} as the implementation of an interface.
     *
     * @param proxyClass the {@code $JsiiProxy} class for the desired interface.
     * @param <T> the interface type that the new vew must implement.
     *
     * @return a view on the same {@link JsiiObject}.
     */
    final <T extends JsiiObject> T asInterfaceProxy(final Class<? extends T> proxyClass) {
        if (!this.proxies.containsKey(proxyClass)) {
            try {
                final Constructor<? extends JsiiObject> constructor = proxyClass.getDeclaredConstructor(JsiiObjectRef.class);
                @SuppressWarnings("deprecated")
                final boolean oldAccessible = constructor.isAccessible();
                try {
                    constructor.setAccessible(true);
                    final JsiiObject proxyInstance = constructor.newInstance(this.getObjRef());
                    this.proxies.put(proxyClass, proxyInstance);
                } finally {
                    constructor.setAccessible(oldAccessible);
                }
            } catch(final NoSuchMethodException nsme) {
                throw new JsiiException("Unable to find interface proxy constructor on " + proxyClass.getCanonicalName(), nsme);
            } catch (final InvocationTargetException | InstantiationException e) {
                throw new JsiiException("Unable to initialize interface proxy " + proxyClass.getCanonicalName(), e);
            } catch (final IllegalAccessException iae) {
                throw new JsiiException("Unable to invoke constructor of " + proxyClass.getCanonicalName(), iae);
            }
        }
        @SuppressWarnings("unchecked")
        final T result = (T)this.proxies.get(proxyClass);
        return result;
    }
}
