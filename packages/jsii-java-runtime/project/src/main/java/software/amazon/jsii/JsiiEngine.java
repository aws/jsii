package software.amazon.jsii;

import software.amazon.jsii.api.Callback;
import software.amazon.jsii.api.GetRequest;
import software.amazon.jsii.api.InvokeRequest;
import software.amazon.jsii.api.JsiiOverride;
import software.amazon.jsii.api.SetRequest;
import com.fasterxml.jackson.databind.JsonNode;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static software.amazon.jsii.Util.isJavaPropertyMethod;
import static software.amazon.jsii.Util.javaPropertyToJSProperty;
import static software.amazon.jsii.Util.javaScriptPropertyToJavaPropertyName;

/**
 * The javascript engine which supports jsii objects.
 */
public final class JsiiEngine implements JsiiCallbackHandler {
    /**
     * The singleton instance.
     */
    private static final JsiiEngine INSTANCE = new JsiiEngine();

    /**
     * The suffix for interface proxy classes.
     */
    private static final String INTERFACE_PROXY_CLASS_NAME = "Jsii$Proxy";

    /**
     * Object cache.
     */
    private final Map<String, Object> objects = new HashMap<>();

    /**
     * The jsii-server child process.
     */
    private final JsiiRuntime runtime = new JsiiRuntime();

    /**
     * JSON object mapper.
     */
    private static final JsiiObjectMapper OM = new JsiiObjectMapper();

    /**
     * The set of modules we already loaded into the VM.
     */
    private Map<String, JsiiModule> loadedModules = new HashMap<>();

    /**
     * @return The singleton instance.
     */
    public static JsiiEngine getInstance() {
        return INSTANCE;
    }

    /**
     * @return The jsii-server HTTP client.
     */
    public JsiiClient getClient() {
        return runtime.getClient();
    }

    /**
     * Initializes the engine.
     */
    private JsiiEngine() {
        runtime.setCallbackHandler(this);
    }

    /**
     * Loads a JavaScript module into the remote jsii-server.
     * No-op if the module is already loaded.
     * @param moduleClass The jsii module class.
     */
    public void loadModule(final Class<? extends JsiiModule> moduleClass) {
        if (!JsiiModule.class.isAssignableFrom(moduleClass)) {
            throw new JsiiException("Invalid module class "
                    + moduleClass.getName()
                    + ". It must be derived from JsiiModule");
        }

        JsiiModule module;
        try {
            module = moduleClass.newInstance();
        } catch (IllegalAccessException | InstantiationException e) {
            throw new JsiiException(e);
        }

        if (this.loadedModules.containsKey(module.getModuleName())) {
            return;
        }

        // Load dependencies
        for (Class<? extends JsiiModule> dep: module.getDependencies()) {
            loadModule(dep);
        }

        this.getClient().loadModule(module);

        // indicate that it was loaded
        this.loadedModules.put(module.getModuleName(), module);
    }

    /**
     * Registers an object into the object cache.
     * @param objRef The object reference.
     * @param obj The object to register.
     */
    public void registerObject(final JsiiObjectRef objRef, final Object obj) {
        if (obj instanceof JsiiObject) {
            ((JsiiObject) obj).setObjRef(objRef);
        }
        this.objects.put(objRef.getObjId(), obj);
    }

    /**
     * Returns the native java object for a given jsii object reference.
     * If it already exists in our native objects cache, we return it.
     *
     * If we can't find the object in the cache, it means it was created in javascript-land, so we need
     * to create a native wrapper with the correct type and add it to cache.
     *
     * @param objRef The object reference.
     * @return The jsii object the represents this remote object.
     */
    public Object nativeFromObjRef(final JsiiObjectRef objRef) {
        Object obj = this.objects.get(objRef.getObjId());
        if (obj == null) {
            obj = createNative(objRef.getFqn());
            this.registerObject(objRef, obj);
        }
        return obj;
    }

    /**
     * Returns the jsii object reference given a native object.
     *
     * If the native object extends JsiiObject (directly or indirectly), we can grab the objref
     * from within the JsiiObject.
     *
     * Otherwise, we have a "pure" native object on our hands, so we will first perform a reverse lookup in
     * the objects cache to see if it was already created, and if it wasn't, we create a new empty JS object.
     * Note that any native overrides will be applied by createNewObject().
     *
     * @param nativeObject The native object to obtain the reference for
     * @return A jsii object reference
     */
    public JsiiObjectRef nativeToObjRef(final Object nativeObject) {
        if (nativeObject instanceof JsiiObject) {
            return ((JsiiObject) nativeObject).getObjRef();
        }

        for (String objid : this.objects.keySet()) {
            Object obj = this.objects.get(objid);
            if (obj == nativeObject) {
                return JsiiObjectRef.fromObjId(objid);
            }
        }

        // we don't know of an jsii object that represents this object, so we will need to create it.
        return createNewObject(nativeObject);
    }

    /**
     * Gets an object by reference. Throws if the object cannot be found.
     *
     * @param objRef The object reference
     * @return a JsiiObject
     * @throws JsiiException If the object is not found.
     */
    public Object getObject(final JsiiObjectRef objRef) {
        Object obj = this.objects.get(objRef.getObjId());
        if (obj == null) {
            throw new JsiiException("Cannot find jsii object: " + objRef.getObjId());
        }
        return obj;
    }

    /**
     * Given an obj ref, returns a Java object that represents it.
     * A new object proxy object will be allocated if needed.
     * @param objRefNode The objref
     * @return A Java object
     */
    public Object getObject(final JsonNode objRefNode) {
        return this.getObject(JsiiObjectRef.parse(objRefNode));
    }

    /**
     * Given a jsii FQN, returns the Java class for it.
     *
     * @param fqn The FQN.
     *
     * @return The Java class name.
     */
    private Class<?> resolveJavaClass(final String fqn) throws ClassNotFoundException {
        String[] parts = fqn.split("\\.");
        if (parts.length < 2) {
            throw new JsiiException("Malformed FQN: " + fqn);
        }

        String moduleName = parts[0];

        JsonNode names = this.getClient().getModuleNames(moduleName);
        if (!names.has("java")) {
            throw new JsiiException("No java name for module " + moduleName);
        }

        final JsiiModule module = this.loadedModules.get(moduleName);
        if (module == null) {
            throw new JsiiException("No loaded module is named " + moduleName);
        }
        return module.resolveClass(fqn);
    }

    /**
     * Given a jsii FQN, instantiates a Java JsiiObject.
     *
     * NOTE: if a the Java class cannot be found, we will simply return a {@link JsiiObject}.
     *
     * @param fqn The jsii FQN of the type
     * @return An object derived from JsiiObject.
     */
    private JsiiObject createNative(final String fqn) {
        try {
            Class<?> klass = resolveJavaClass(fqn);
            if (klass.isInterface()) {
                // "$" is used to represent inner classes in Java
                klass = Class.forName(klass.getCanonicalName() + "$" + INTERFACE_PROXY_CLASS_NAME);
            }
            try {
                Constructor<? extends Object> ctor = klass.getDeclaredConstructor(JsiiObject.InitializationMode.class);
                ctor.setAccessible(true);
                JsiiObject newObj = (JsiiObject) ctor.newInstance(JsiiObject.InitializationMode.Jsii);
                ctor.setAccessible(false);
                return newObj;
            } catch (NoSuchMethodException e) {
                throw new JsiiException("Cannot create native object of type "
                        + klass.getName()
                        + " without a constructor that accepts an InitializationMode argument", e);

            } catch (IllegalAccessException | InstantiationException | InvocationTargetException e) {
                throw new JsiiException("Unable to instantiate a new object for FQN " + fqn + ": "
                        + e.getMessage(), e);
            }
        } catch (ClassNotFoundException e) {
            System.err.println("WARNING: Cannot find the class: " + fqn + ". Defaulting to JsiiObject");
            return new JsiiObject(JsiiObject.InitializationMode.Jsii);
        }
    }

    /**
     * Given a jsii enum ref in the form "fqn/member" returns the Java enum value for it.
     * @param enumRef The jsii enum ref.
     * @return The java enum value.
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public Enum<?> findEnumValue(final String enumRef) {
        int sep = enumRef.lastIndexOf('/');
        if (sep == -1) {
            throw new JsiiException("Malformed enum reference: " + enumRef);
        }

        String typeName = enumRef.substring(0, sep);
        String valueName = enumRef.substring(sep + 1);
        try {
            Class klass = resolveJavaClass(typeName);
            return Enum.valueOf(klass, valueName);
        } catch (final ClassNotFoundException e) {
            throw new JsiiException("Unable to resolve enum type " + typeName, e);
        }
    }

    /**
     * Dequeues and processes pending jsii callbacks until there are no more callbacks to process.
     */
    public void processAllPendingCallbacks() {
        while (true) {
            List<Callback> callbacks = this.getClient().pendingCallbacks();
            if (callbacks.size() == 0) {
                break;
            }

            callbacks.forEach(this::processCallback);
        }
    }

    /**
     * Invokes a local callback and returns the result/error.
     * @param callback The callback to invoke.
     * @return The return value
     * @throws JsiiException if the callback failed.
     */
    public JsonNode handleCallback(final Callback callback) {

        if (callback.getInvoke() != null) {
            return invokeCallbackMethod(callback.getInvoke(), callback.getCookie());
        } else if (callback.getGet() != null) {
            return invokeCallbackGet(callback.getGet());
        } else if (callback.getSet() != null) {
            return invokeCallbackSet(callback.getSet());
        }

        throw new JsiiException("Unrecognized callback type: get/set/invoke");
    }

    /**
     * Invokes an override for a property getter.
     * @param req The get request
     * @return The override's return value.
     */
    private JsonNode invokeCallbackGet(final GetRequest req) {
        Object obj = this.getObject(req.getObjref());
        String methodName = javaScriptPropertyToJavaPropertyName("get", req.getProperty());
        try {
            Method getter = obj.getClass().getMethod(methodName);
            return OM.valueToTree(invokeMethod(obj, getter));
        } catch (NoSuchMethodException e) {
            throw new JsiiException(e);
        }
    }

    /**
     * Invokes an override for a property setter.
     * @param req The set request
     * @return The setter return value (an empty object)
     */
    private JsonNode invokeCallbackSet(final SetRequest req) {
        final Object obj = this.getObject(req.getObjref());
        String setterMethodName = javaScriptPropertyToJavaPropertyName("set", req.getProperty());

        Method setter = null;
        for (Method method: obj.getClass().getMethods()) {
            if (method.getName().equals(setterMethodName)) {
                setter = method;
                break;
            }
        }

        if (setter == null) {
            throw new JsiiException("Unable to find property setter " + setterMethodName);
        }

        return OM.valueToTree(invokeMethod(obj, setter, req.getValue()));
    }

    /**
     * Invokes an override for a method.
     * @param req The request
     * @param cookie The cookie
     * @return The method's return value
     */
    private JsonNode invokeCallbackMethod(final InvokeRequest req, final String cookie) {
        Object obj = this.getObject(req.getObjref());
        Method method = this.findCallbackMethod(obj.getClass(), cookie);
        return OM.valueToTree(invokeMethod(obj, method, req.getArgs().toArray()));
    }

    /**
     * Invokes a Java method, even if the method is protected.
     * @param obj The object
     * @param method The method
     * @param args Method arguments
     * @return The return value
     */
    private Object invokeMethod(final Object obj, final Method method, final Object... args) {
        // turn method to accessible. otherwise, we won't be able to callback to methods
        // on non-public classes.
        boolean accessibility = method.isAccessible();
        method.setAccessible(true);

        try {
            return method.invoke(obj, args);
        } catch (InvocationTargetException e) {
            throw new JsiiException(e.getTargetException());
        } catch (IllegalAccessException e) {
            throw new JsiiException(e);
        } finally {
            // revert accessibility.
            method.setAccessible(accessibility);
        }
    }

    /**
     * Process a single callback by invoking the native method it refers to.
     * @param callback The callback to process.
     */
    private void processCallback(final Callback callback) {
        try {
            JsonNode result = handleCallback(callback);
            this.getClient().completeCallback(callback, null, result);
        } catch (JsiiException e) {
            this.getClient().completeCallback(callback, e.getMessage(), null);
        }
    }

    /**
     * Finds the Java method that implements a callback.
     * @param klass The java class.
     * @param signature Method signature
     * @return a {@link Method}.
     */
    private Method findCallbackMethod(final Class<?> klass, final String signature) {
        for (Method method : klass.getMethods()) {

            if (method.toString().equals(signature)) {
                // found!
                return method;
            }
        }

        throw new JsiiException("Unable to find callback method with signature: " + signature);
    }

    /**
     * Given an uninitialized native object instance, reads the @Jsii annotations to determine
     * the jsii module and FQN, and creates a JS object.
     *
     * Any methods implemented on the native object are passed in as "overrides", which are overridden
     * in the javascript side to call-back to the native method.
     *
     * @param uninitializedNativeObject An uninitialized native object
     * @param args Initializer arguments
     * @return An object reference for the new object.
     */
    public JsiiObjectRef createNewObject(final Object uninitializedNativeObject, final Object... args) {
        Class<? extends Object> klass = uninitializedNativeObject.getClass();
        Jsii jsii = tryGetJsiiAnnotation(klass, true);
        String fqn = "Object"; // if we can't determine FQN, we just create an empty JS object

        if (jsii != null) {
            fqn = jsii.fqn();
            loadModule(jsii.module());
        }

        Collection<JsiiOverride> overrides = discoverOverrides(klass);

        JsiiObjectRef objRef = this.getClient().createObject(fqn, Arrays.asList(args), overrides);
        registerObject(objRef, uninitializedNativeObject);

        return objRef;
    }

    /**
     * Prepare a list of methods which are overridden by Java classes.
     * @param classToInspect The java class to inspect for
     * @return A list of method names that should be overridden.
     */
    private static Collection<JsiiOverride> discoverOverrides(final Class<?> classToInspect) {
        Map<String, JsiiOverride> overrides = new HashMap<>();

        Class<?> klass = classToInspect;

        // if we reached a generated jsii class or Object, we should stop collecting those overrides since
        // all the rest of the hierarchy is generated all the way up to JsiiObject and java.lang.Object.
        while (klass != null
                && klass.getDeclaredAnnotationsByType(Jsii.class).length == 0
                && klass != Object.class) {

            // add all the methods in the current class
            for (Method method : klass.getDeclaredMethods()) {
                String methodName = method.getName();

                // check if this is a property ("getXXX" or "setXXX", oh java!)
                if (isJavaPropertyMethod(methodName)) {
                    String propertyName = javaPropertyToJSProperty(methodName);

                    // skip if this property is already in the overrides list
                    if (overrides.containsKey(propertyName)) {
                        continue;
                    }

                    JsiiOverride override = new JsiiOverride();
                    override.setProperty(propertyName);
                    overrides.put(propertyName, override);
                } else {
                    // if this method is already overridden, skip it
                    if (overrides.containsKey(methodName)) {
                        continue;
                    }

                    // we use the method's .toString() as a cookie, which will later be used to identify the
                    // method when it is called back.
                    JsiiOverride override = new JsiiOverride();
                    override.setMethod(methodName);
                    override.setCookie(method.toString());
                    overrides.put(methodName, override);
                }

            }

            klass = klass.getSuperclass();
        }

        return overrides.values();
    }

    /**
     * Attempts to find the @Jsii annotation from a type.
     * @param type The type.
     * @param inherited If 'true' will look for the annotation up the class hierarchy.
     * @return The annotation or null.
     */
    static Jsii tryGetJsiiAnnotation(final Class<?> type, final boolean inherited) {
        Jsii[] ann;

        if (inherited) {
            ann = (Jsii[]) type.getAnnotationsByType(Jsii.class);
        } else {
            ann = (Jsii[]) type.getDeclaredAnnotationsByType(Jsii.class);
        }

        if (ann.length == 0) {
            return null;
        }

        return ann[0];
    }

    /**
     * Given a java class that extends a Jsii proxy, loads the corresponding jsii module
     * and returns the FQN of the jsii type.
     * @param nativeClass The java class.
     * @return The FQN.
     */
    String loadModuleForClass(Class<?> nativeClass) {
        final Jsii jsii = tryGetJsiiAnnotation(nativeClass, true);
        if (jsii == null) {
            throw new JsiiException("Unable to find @Jsii annotation for class");
        }

        this.loadModule(jsii.module());
        return jsii.fqn();
    }
}
