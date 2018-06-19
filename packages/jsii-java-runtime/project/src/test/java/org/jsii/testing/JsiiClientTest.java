package org.jsii.testing;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import org.jsii.JsiiClient;
import org.jsii.JsiiException;
import org.jsii.JsiiObjectRef;
import org.jsii.JsiiPromise;
import org.jsii.JsiiRuntime;
import org.jsii.api.Callback;
import org.jsii.api.JsiiOverride;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

public class JsiiClientTest {
    private ObjectMapper OM = new ObjectMapper();
    private JsonNodeFactory JSON = JsonNodeFactory.instance;
    private JsiiClient client;
    private JsiiRuntime jsiiRuntime;

    @Before
    public void setUp() {
        jsiiRuntime = new JsiiRuntime();
        this.client = jsiiRuntime.getClient();
        this.client.loadModule(this.getClass().getResourceAsStream("../tests/calculator/lib/assembly.jsii"));
        this.client.loadModule(getClass().getResourceAsStream("../tests/calculator/assembly.jsii"));
    }

    @Test
    public void initialTest() {
        JsiiObjectRef obj = client.createObject("jsii$jsii_calc_lib$.Number", Arrays.asList(42));
        assertEquals(84, fromSandbox(client.getPropertyValue(obj, "doubleValue")));
        assertEquals("Number", fromSandbox(client.callMethod(obj, "typeName", toSandboxArray())));

        JsiiObjectRef calculatorProps = client.createObject("jsii$jsii_calc$.CalculatorProps", Arrays.asList());
        client.setPropertyValue(calculatorProps, "initialValue", toSandbox(100));
        assertEquals(100, fromSandbox(client.getPropertyValue(calculatorProps, "initialValue")));

        JsiiObjectRef calculator = client.createObject("jsii$jsii_calc$.Calculator", Arrays.asList(calculatorProps.toJson()));
        assertNull(fromSandbox(client.callMethod(calculator, "add", toSandboxArray(50))));

        JsiiObjectRef add = JsiiObjectRef.parse(client.getPropertyValue(calculator, "curr"));
        assertEquals(150, fromSandbox(client.getPropertyValue(add, "value")));

        JsonNode names = client.getModuleNames("jsii$jsii_calc_lib$");
        assertEquals("org.jsii.tests.calculator.lib", names.get("java").textValue());

        JsonNode names2 = client.getModuleNames("jsii$jsii_calc$");
        assertEquals("org.jsii.tests.calculator", names2.get("java").textValue());

        client.deleteObject(calculator);

        boolean thrown = false;
        try {
            client.getPropertyValue(calculator, "curr");
        }
        catch (JsiiException e) {
            thrown = true;
        }
        assertTrue(thrown);
    }

    @Test
    public void asyncMethods() {
        JsiiObjectRef obj = client.createObject("jsii$jsii_calc$.AsyncVirtualMethods", Arrays.asList());

        // begin will return a promise
        JsiiPromise promise = client.beginAsyncMethod(obj, "callMe", toSandboxArray());
        assertFalse(promise.getPromiseId().isEmpty());

        // end will return the result
        JsonNode result = client.endAsyncMethod(promise);
        assertEquals(128, result.asInt());
    }

    private Collection<JsiiOverride> methodOverride(final String methodName, final String cookie) {
        JsiiOverride override = new JsiiOverride();
        override.setMethod(methodName);
        override.setCookie(cookie);
        return Arrays.asList(override);
    }

    @Test
    public void asyncMethodOverrides() {
        JsiiObjectRef obj = client.createObject("jsii$jsii_calc$.AsyncVirtualMethods",
                Arrays.asList(), methodOverride("overrideMe", "myCookie"));

        // begin will return a promise
        JsiiPromise promise = client.beginAsyncMethod(obj, "callMe", toSandboxArray());
        assertFalse(promise.getPromiseId().isEmpty());

        // now we expect to see a callback to "overrideMe" in the pending callbacks queue

        List<Callback> callbacks = client.pendingCallbacks();

        assertEquals(1, callbacks.size());

        Callback first = callbacks.get(0);
        assertEquals("overrideMe", first.getInvoke().getMethod());
        assertEquals("myCookie", first.getCookie());
        assertEquals(1, first.getInvoke().getArgs().size());
        assertEquals(10, first.getInvoke().getArgs().get(0));
        assertEquals(obj.getObjId(), JsiiObjectRef.parse(first.getInvoke().getObjref()).getObjId());

        // now complete the callback with some override value
        client.completeCallback(first, null, toSandbox(999));

        // end the async invocation, but now we expect the value to be different since we override the method.
        JsonNode result = client.endAsyncMethod(promise);
        assertEquals(1007, result.asInt());
    }

    @Test
    public void asyncMethodOverridesThrow() {
        JsiiObjectRef obj = client.createObject("jsii$jsii_calc$.AsyncVirtualMethods",
                Arrays.asList(), methodOverride("overrideMe", "myCookie"));

        // begin will return a promise
        JsiiPromise promise = client.beginAsyncMethod(obj, "callMe", toSandboxArray());
        assertFalse(promise.getPromiseId().isEmpty());

        // now we expect to see a callback to "overrideMe" in the pending callbacks queue

        List<Callback> callbacks = client.pendingCallbacks();

        assertEquals(1, callbacks.size());

        Callback first = callbacks.get(0);
        assertEquals("overrideMe", first.getInvoke().getMethod());
        assertEquals("myCookie", first.getCookie());
        assertEquals(1, first.getInvoke().getArgs().size());
        assertEquals(10, first.getInvoke().getArgs().get(0));
        assertEquals(obj.getObjId(), JsiiObjectRef.parse(first.getInvoke().getObjref()).getObjId());

        // now complete the callback with an error
        client.completeCallback(first, "Hello, Error", null);

        // end the async invocation, but now we expect the value to be different since we override the method.
        boolean thrown = false;
        try {
            client.endAsyncMethod(promise);
        } catch (JsiiException e) {
            assertTrue(e.getMessage().contains("Hello, Error"));
            thrown = true;
        }
        assertTrue(thrown);
    }

    @Test
    public void syncVirtualMethods() {
        JsiiObjectRef obj = client.createObject("jsii$jsii_calc$.SyncVirtualMethods",
                Arrays.asList(), methodOverride("virtualMethod","myCookie"));

        jsiiRuntime.setCallbackHandler(callback -> {
            assertEquals(obj.getObjId(), JsiiObjectRef.parse(callback.getInvoke().getObjref()).getObjId());
            assertEquals("virtualMethod", callback.getInvoke().getMethod());
            assertEquals(10, callback.getInvoke().getArgs().get(0));
            assertEquals("myCookie", callback.getCookie());

            // interact with jsii from inside the callback
            JsiiObjectRef num = client.createObject("jsii$jsii_calc_lib$.Number", Arrays.asList(42));
            assertEquals(84, fromSandbox(client.getPropertyValue(num, "doubleValue")));

            return JSON.numberNode(898);
        });

        assertEquals(898, client.callMethod(obj, "callerIsMethod", JSON.arrayNode()).numberValue());

        // just for fun, change the return value from the callback and observe that we got the new value
        jsiiRuntime.setCallbackHandler(callback -> JSON.numberNode(111));
        assertEquals(111, client.callMethod(obj, "callerIsMethod", JSON.arrayNode()).numberValue());

        // verify that sync callbacks are invoked from a property
        assertEquals(111, client.getPropertyValue(obj, "callerIsProperty").numberValue());

        // verify that sync callbacks are invoked from an async methods
        jsiiRuntime.setCallbackHandler(callback -> JSON.numberNode(222));
        JsiiPromise promise = client.beginAsyncMethod(obj, "callerIsAsync", JSON.arrayNode());
        List<Callback> pending = client.pendingCallbacks();
        assertEquals(0, pending.size());
        assertEquals(222, client.endAsyncMethod(promise).numberValue());
    }

    @Test
    public void staticProperties() {
        final String fqn = "jsii$jsii_calc$.Statics";
        assertEquals("hello", client.getStaticPropertyValue(fqn, "Foo").textValue());

        JsonNode defaultInstance = client.getStaticPropertyValue(fqn, "instance");
        assertEquals("default", client.getPropertyValue(JsiiObjectRef.parse(defaultInstance), "value").textValue());

        JsiiObjectRef newValue = client.createObject(fqn, Arrays.asList("NewValue"));
        client.setStaticPropertyValue(fqn, "instance", newValue.toJson());

        JsonNode newInstance = client.getStaticPropertyValue(fqn, "instance");
        assertEquals("NewValue", client.getPropertyValue(JsiiObjectRef.parse(newInstance), "value").textValue());
    }

    @Test
    public void staticMethods() {
        final String fqn = "jsii$jsii_calc$.Statics";
        JsonNode result = client.callStaticMethod(fqn, "staticMethod", JSON.arrayNode().add("Foo"));
        assertEquals("hello ,Foo!", result.textValue());
    }

    private ArrayNode toSandboxArray(final Object... values) {
        return OM.valueToTree(values);
    }

    private JsonNode toSandbox(Object value) {
        return OM.valueToTree(value);
    }

    private Object fromSandbox(JsonNode value) {
        if (value == null) {
            return null;
        }

        try {
            return OM.treeToValue(value, Object.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

}