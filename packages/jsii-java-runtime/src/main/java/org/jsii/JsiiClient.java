package org.jsii;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.jsii.api.Callback;
import org.jsii.api.CreateRequest;
import org.jsii.api.JsiiOverride;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static org.jsii.Util.readString;

/**
 * HTTP client for jsii-server.
 */
public class JsiiClient {
    /**
     * JSON node factory.
     */
    private static final JsonNodeFactory JSON = JsonNodeFactory.instance;

    /**
     * JSON object mapper.
     */
    private static final ObjectMapper STD_OM = new ObjectMapper();

    /**
     * Jsii custom object mapper.
     */
    private static final JsiiObjectMapper JSII_OM = new JsiiObjectMapper();

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
     * @param inputStream Stream of JS code.
     */
    public void loadModule(final InputStream inputStream) {
        ObjectNode req = makeRequest("load");
        try {
            req.set("assembly", STD_OM.readTree(inputStream));
        } catch (IOException e) {
            throw new JsiiException("Unable to read assembly: " + e.toString(), e);
        }

        this.runtime.requestResponse(req);
    }

    /**
     * Creates a remote jsii object.
     * @param fqn The fully-qualified-name of the class.
     * @param initializerArgs Constructor arguments.
     * @return A jsii object reference.
     */
    public JsiiObjectRef createObject(final String fqn, final List<Object> initializerArgs) {
        return createObject(fqn, initializerArgs, Collections.emptyList());
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
                                      final Collection<JsiiOverride> overrides) {

        CreateRequest request = new CreateRequest();
        request.setFqn(fqn);
        request.setArgs(initializerArgs);
        request.setOverrides(overrides);

        ObjectNode req = JSII_OM.valueToTree(request);
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
            throw new JsiiException("Expecting a 'callbacks' key with an array in response");
        }

        ArrayNode callbacksArray = (ArrayNode) callbacksResp;

        List<Callback> result = new ArrayList<>();
        callbacksArray.forEach(node -> {
            try {
                result.add(STD_OM.treeToValue(node, Callback.class));
            } catch (JsonProcessingException e) {
                throw new JsiiException(e);
            }
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
     * @return The result (hash lang -> name).
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

    /**
     * Reads an HTTP response and parses it as JSON.
     * @param conn The connection.
     * @return The response.
     * @throws IOException If there was a problem.
     */
    private static JsonNode readJsonResponse(final HttpURLConnection conn) throws IOException {
        String responseText = "";
        try {
            responseText = readString(conn.getInputStream());
            if (responseText.isEmpty()) {
                return null;
            }
            return STD_OM.readTree(responseText);
        } catch (JsonParseException e2) {
            throw new JsiiException("Unexpected response: \n" + responseText);
        } catch (IOException e) {
            responseText = readString(conn.getErrorStream());

            JsonNode error = STD_OM.readTree(responseText);
            if (error.has("error")) {
                responseText = error.get("error").textValue();
            }

            if (responseText == null || responseText.isEmpty()) {
                responseText = e.getMessage();
            }

            throw new JsiiException(responseText);
        }
    }

    /**
     * Writes a JSON body to an HTTP request.
     * @param conn The request.
     * @param json The body.
     * @throws IOException If there was an error.
     */
    private static void writeJsonRequest(final HttpURLConnection conn, final JsonNode json) throws IOException {
        conn.setDoOutput(true);
        conn.setRequestProperty("Content-Type", "application/json");
        try (OutputStream request = conn.getOutputStream()) {
            request.write(json.toString().getBytes("UTF-8"));
        }
    }
}
