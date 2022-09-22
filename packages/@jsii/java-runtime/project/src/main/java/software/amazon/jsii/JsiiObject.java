package software.amazon.jsii;

import com.fasterxml.jackson.databind.JsonNode;

import org.jetbrains.annotations.Nullable;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

/**
 * Represents a JavaScript object in the Java world.
 */
public class JsiiObject implements JsiiSerializable {
    /**
     * The interface-proxies that this object can also be represented as.
     */
    private final Map<Class<? extends JsiiObject>, JsiiObject> proxies = new HashMap<>();

    /**
     * The jsii engine used by this object.
     */
    final JsiiEngine jsii$engine;

    /**
     * The underlying {@link JsiiObjectRef} instance.
     */
    @Nullable
    @Internal
    JsiiObjectRef jsii$objRef;

    /**
     * A special constructor that allows creating wrapper objects while bypassing the normal constructor
     * chain. This is used when an object was created in javascript-land and just needs a wrapper in native-land.
     *
     * @param initializationMode Must always be set to "JSII".
     */
    protected JsiiObject(final InitializationMode initializationMode) {
        this(null, initializationMode);
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
    @Internal
    JsiiObject(@Nullable final JsiiEngine engine, final InitializationMode initializationMode) {
        this.jsii$engine = JsiiEngine.getEngineFor(this, engine);
        if (initializationMode != InitializationMode.JSII) {
            throw new JsiiError("The only supported initialization mode is '" + InitializationMode.JSII + "'");
        }
    }

    /**
     * Used to construct a JSII object with a reference to an existing managed JSII node object.
     *
     * @param objRef Reference to existing managed JSII node object.
     */
    @Internal
    protected JsiiObject(final JsiiObjectRef objRef) {
        this(null, objRef);
    }

    /**
     * Used to construct a JSII object with a reference to an existing managed JSII node object.
     *
     * This constructor is meant to be used only in unit tests.
     *
     * @param engine the {@link JsiiEngine} to use.
     * @param objRef Reference to existing managed JSII node object.
     */
    @Internal
    JsiiObject(@Nullable final JsiiEngine engine, @Nullable final JsiiObjectRef objRef) {
        this.jsii$engine = JsiiEngine.getEngineFor(this, engine);
        this.jsii$objRef = objRef;

        this.jsii$engine.registerObject(objRef, this);
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
     * @deprecated use {@link Kernel#call(Object, String, NativeType, Object...)} instead
     */
    @Nullable
    @Deprecated
    @Internal
    protected final <T> T jsiiCall(final String method, final Class<T> returnType, @Nullable final Object... args) {
        return jsiiCall(method, NativeType.forType(returnType), args);
    }

    /**
     * Calls a JavaScript method on the object.
     *
     * @param method The name of the method.
     * @param nativeType The return type.
     * @param args Method arguments.
     * @param <T> Java type for the return value.
     * @return A return value.
     *
     * @deprecated use {@link Kernel#call(Object, String, NativeType, Object...)} instead
     */
    @Nullable
    @Deprecated
    @Internal
    protected final <T> T jsiiCall(final String method, final NativeType<T> nativeType, @Nullable final Object... args) {
        return Kernel.call(this, method, nativeType, args);
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
    @Internal
    protected static <T> T jsiiStaticCall(final Class<?> nativeClass, final String method, final Class<T> returnType, @Nullable final Object... args) {
        return jsiiStaticCall(nativeClass, method, NativeType.forType(returnType), args);
    }

    /**
     * Calls a static method.
     *
     * @param nativeClass The java class.
     * @param method The method to call.
     * @param nativeType The return type.
     * @param args The method arguments.
     * @param <T> Return type.
     *
     * @return Return value.
     */
    @Nullable
    @Internal
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
    @Internal
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
     * @deprecated use {@link Kernel#asyncCall(Object, String, NativeType, Object...)} instead
     */
    @Nullable
    @Deprecated
    @Internal
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
     *
     * @deprecated Use {@link Kernel#asyncCall(Object, String, NativeType, Object...)} instead
     */
    @Nullable
    @Internal
    protected final <T> T jsiiAsyncCall(final String method, final NativeType<T> nativeType, @Nullable final Object... args) {
        return Kernel.asyncCall(this, method, nativeType, args);
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
     * @deprecated use {@link Kernel#get(Object, String, NativeType)} instead
     */
    @Nullable
    @Deprecated
    @Internal
    protected final <T> T jsiiGet(final String property, final Class<T> type) {
        return jsiiGet(property, NativeType.forType(type));
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
     * @deprecated use {@link Kernel#get(Object, String, NativeType)} instead
     */
    @Nullable
    @Deprecated
    @Internal
    protected final <T> T jsiiGet(final String property, final NativeType<T> type) {
        return Kernel.get(this, property, type);
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
    @Internal
    protected static <T> T jsiiStaticGet(final Class<?> nativeClass, final String property, final Class<T> type) {
        return jsiiStaticGet(nativeClass, property, NativeType.forType(type));
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
     */
    @Nullable
    @Internal
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
    @Internal
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
     *
     * @deprecated Use {@link Kernel#set(Object, String, Object)} instead
     */
    @Deprecated
    @Internal
    protected final void jsiiSet(final String property, @Nullable final Object value) {
        Kernel.set(this, property, value);
    }

    /**
     * Sets a value for a static property.
     *
     * @param nativeClass The java class.
     * @param property The name of the property
     * @param value The value
     */
    @Internal
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
    @Internal
    protected static void jsiiStaticSet(final JsiiEngine engine, final Class<?> nativeClass, final String property, @Nullable final Object value) {
        final String fqn = engine.loadModuleForClass(nativeClass);
        engine.getClient().setStaticPropertyValue(fqn, property, JsiiObjectMapper.valueToTree(value));
    }

    /**
     * Create a view of this {@link JsiiObject} as the implementation of an interface.
     *
     * @param proxyClass the {@code $JsiiProxy} class for the desired interface.
     * @param <T> the interface type that the new vew must implement.
     *
     * @return a view on the same {@link JsiiObject}.
     */
    @Internal
    final <T extends JsiiObject> T asInterfaceProxy(final Class<? extends T> proxyClass) {
        if (!this.proxies.containsKey(proxyClass)) {
            try {
                final Constructor<? extends JsiiObject> constructor = proxyClass.getDeclaredConstructor(JsiiObjectRef.class);
                @SuppressWarnings("deprecated")
                final boolean oldAccessible = constructor.isAccessible();
                try {
                    constructor.setAccessible(true);
                    final JsiiObject proxyInstance = constructor.newInstance(this.jsii$engine.nativeToObjRef(this));
                    this.proxies.put(proxyClass, proxyInstance);
                } finally {
                    constructor.setAccessible(oldAccessible);
                }
            } catch(final NoSuchMethodException nsme) {
                throw new JsiiError("Unable to find interface proxy constructor on " + proxyClass.getCanonicalName(), nsme);
            } catch (final InvocationTargetException | InstantiationException e) {
                throw new JsiiError("Unable to initialize interface proxy " + proxyClass.getCanonicalName(), e);
            } catch (final IllegalAccessException iae) {
                throw new JsiiError("Unable to invoke constructor of " + proxyClass.getCanonicalName(), iae);
            }
        }
        @SuppressWarnings("unchecked")
        final T result = (T)this.proxies.get(proxyClass);
        return result;
    }
}
