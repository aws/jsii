package software.amazon.jsii;

import software.amazon.jsii.api.Callback;
import software.amazon.jsii.api.CreateRequest;
import software.amazon.jsii.api.JsiiOverride;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static software.amazon.jsii.Util.extractResource;

/**
 * HTTP client for jsii-server.
 */
@Internal
public final class JsiiClient {
    /**
     * JSON node factory.
     */
    private static final JsonNodeFactory JSON = JsonNodeFactory.instance;

    /**
     * TCP port to connect to (always "localhost").
     */
    private final JsiiRuntime runtime;

    /**
     * Creates a new jsii-runtime client.
     * @param runtime The {@link JsiiRuntime}.
     */
    public JsiiClient(final JsiiRuntime runtime) {
        this.runtime = runtime;
    }

    /**
     * Loads a JavaScript module into the remote sandbox.
     * @param module The module to load
     */
    public void loadModule(final JsiiModule module) {
        try {
            Path tarball = extractResource(module.getModuleClass(), module.getBundleResourceName(), null);
            try {
                ObjectNode req = makeRequest("load");
                req.put("tarball", tarball.toString());
                req.put("name", module.getModuleName());
                req.put("version", module.getModuleVersion());
                this.runtime.requestResponse(req);
            } finally {
                Files.delete(tarball);
                Files.delete(tarball.getParent());
            }
        } catch (IOException e) {
            throw new JsiiError("Unable to extract resource " + module.getBundleResourceName(), e);
        }
    }

    /**
     * Creates a remote jsii object.
     * @param fqn The fully-qualified-name of the class.
     * @param initializerArgs Constructor arguments.
     * @param overrides A list of async methods to override. If a method is defined as an override, a callback
     *                  will be scheduled when it is called, and the promise it returns will only be fulfilled
     *                  when the callback is completed.
     * @return A jsii object reference.
     */
    public JsiiObjectRef createObject(final String fqn,
                                      final Collection<Object> initializerArgs,
                                      final Collection<JsiiOverride> overrides,
                                      final Collection<String> interfaces) {

        CreateRequest request = new CreateRequest();
        request.setFqn(fqn);
        request.setArgs(initializerArgs);
        request.setOverrides(overrides);
        request.setInterfaces(interfaces);

        ObjectNode req = JsiiObjectMapper.valueToTree(request);
        req.put("api", "create");

        JsonNode resp = this.runtime.requestResponse(req);
        return JsiiObjectRef.parse(resp);
    }

    /**
     * Deletes a remote object.
     * @param objRef The object reference.
     */
    public void deleteObject(final JsiiObjectRef objRef) {
        ObjectNode req = makeRequest("del", objRef);
        this.runtime.requestResponse(req);
    }

    /**
     * Gets a value for a property from a remote object.
     * @param objRef The remote object reference.
     * @param property The property name.
     * @return The value of the property.
     */
    public JsonNode getPropertyValue(final JsiiObjectRef objRef, final String property) {
        ObjectNode req = makeRequest("get", objRef);
        req.put("property", property);

        return this.runtime.requestResponse(req).get("value");
    }

    /**
     * Sets a value for a property in a remote object.
     * @param objRef The remote object reference.
     * @param property The name of the property.
     * @param value The new property value.
     */
    public void setPropertyValue(final JsiiObjectRef objRef, final String property, final JsonNode value) {
        ObjectNode req = makeRequest("set", objRef);
        req.put("property", property);
        req.set("value", value);

        this.runtime.requestResponse(req);
    }

    /**
     * Gets a value of a static property.
     * @param fqn The FQN of the class
     * @param property The name of the static property
     * @return The value of the static property
     */
    public JsonNode getStaticPropertyValue(final String fqn, final String property) {
        ObjectNode req = makeRequest("sget");
        req.put("fqn", fqn);
        req.put("property", property);
        return this.runtime.requestResponse(req).get("value");
    }

    /**
     * Sets the value of a mutable static property.
     * @param fqn The FQN of the class
     * @param property The property name
     * @param value The new value
     */
    public void setStaticPropertyValue(final String fqn, final String property, final JsonNode value) {
        ObjectNode req = makeRequest("sset");
        req.put("fqn", fqn);
        req.put("property", property);
        req.set("value", value);
        this.runtime.requestResponse(req);
    }

    /**
     * Invokes a static method.
     * @param fqn The FQN of the class.
     * @param method The method name.
     * @param args The method arguments.
     * @return The return value.
     */
    public JsonNode callStaticMethod(final String fqn, final String method, final ArrayNode args) {
        ObjectNode req = makeRequest("sinvoke");
        req.put("fqn", fqn);
        req.put("method", method);
        req.set("args", args);
        JsonNode resp = this.runtime.requestResponse(req);
        return resp.get("result");
    }

    /**
     * Calls a method on a remote object.
     * @param objRef The remote object reference.
     * @param method The name of the method.
     * @param args Method arguments.
     * @return The return value of the method.
     */
    public JsonNode callMethod(final JsiiObjectRef objRef, final String method, final ArrayNode args) {
        ObjectNode req = makeRequest("invoke", objRef);
        req.put("method", method);
        req.set("args", args);

        JsonNode resp = this.runtime.requestResponse(req);
        return resp.get("result");
    }

    /**
     * Begins the execution of an async method.
     * @param objRef The object reference.
     * @param method The name of the async method.
     * @param args Arguments for the method.
     * @return A {@link JsiiPromise} which represents this method.
     */
    public JsiiPromise beginAsyncMethod(final JsiiObjectRef objRef, final String method, final ArrayNode args) {
        ObjectNode req = this.makeRequest("begin", objRef);
        req.put("method", method);
        req.set("args", args);

        JsonNode resp = this.runtime.requestResponse(req);
        return new JsiiPromise(resp.get("promiseid").asText());
    }

    /**
     * Ends the execution of an async method.
     * @param promise The promise returned by beginAsyncMethod.
     * @return The method return value.
     */
    public JsonNode endAsyncMethod(final JsiiPromise promise) {
        ObjectNode req = makeRequest("end");
        req.put("promiseid", promise.getPromiseId());
        JsonNode resp = this.runtime.requestResponse(req);
        if (resp == null) {
            return null; // result is null
        }
        return resp.get("result");
    }

    /**
     * Dequques all the currently pending callbacks.
     * @return A list of all pending callbacks.
     */
    public List<Callback> pendingCallbacks() {
        ObjectNode req = makeRequest("callbacks");
        JsonNode resp = this.runtime.requestResponse(req);

        JsonNode callbacksResp = resp.get("callbacks");
        if (callbacksResp == null || !callbacksResp.isArray()) {
            throw new JsiiError("Expecting a 'callbacks' key with an array in response");
        }

        ArrayNode callbacksArray = (ArrayNode) callbacksResp;

        List<Callback> result = new ArrayList<>();
        callbacksArray.forEach(node -> {
            result.add(JsiiObjectMapper.treeToValue(node, NativeType.forClass(Callback.class)));
        });

        return result;
    }

    /**
     * Completes a callback.
     * @param callback The callback to complete.
     * @param error Error information (or null).
     * @param result Result (or null).
     */
    public void completeCallback(final Callback callback, final String error, final JsonNode result) {
        ObjectNode req = makeRequest("complete");
        req.put("cbid", callback.getCbid());
        req.put("err", error);
        req.set("result", result);

        this.runtime.requestResponse(req);
    }

    /**
     * Returns all names for a jsii module.
     * @param moduleName The name of the module.
     * @return The result (map from "lang" to language configuration).
     */
    public JsonNode getModuleNames(final String moduleName) {
        ObjectNode req = makeRequest("naming");
        req.put("assembly", moduleName);

        JsonNode resp = this.runtime.requestResponse(req);
        return resp.get("naming");
    }

    /**
     * Returns a request object for a specific API call.
     * @param api The api call (i.e "create", "del", "load", ....)
     * @return A JSON object
     */
    private ObjectNode makeRequest(final String api) {
        ObjectNode req = JSON.objectNode();
        req.put("api", api);
        return req;
    }

    /**
     * Returns a new request object for a specific API and a specific object.
     * @param api The API call
     * @param objRef The object reference
     * @return A JSON object
     */
    private ObjectNode makeRequest(final String api, final JsiiObjectRef objRef) {
        ObjectNode req = makeRequest(api);
        req.set("objref", objRef.toJson());
        return req;
    }
}
