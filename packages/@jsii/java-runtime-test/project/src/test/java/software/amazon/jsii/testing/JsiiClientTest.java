package software.amazon.jsii.testing;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import software.amazon.jsii.JsiiClient;
import software.amazon.jsii.JsiiError;
import software.amazon.jsii.JsiiException;
import software.amazon.jsii.JsiiObjectMapper;
import software.amazon.jsii.JsiiObjectRef;
import software.amazon.jsii.JsiiPromise;
import software.amazon.jsii.JsiiRuntime;
import software.amazon.jsii.JsiiSerializable;
import software.amazon.jsii.api.Callback;
import software.amazon.jsii.api.JsiiOverride;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class JsiiClientTest {
    private ObjectMapper OM = new ObjectMapper();
    private JsonNodeFactory JSON = JsonNodeFactory.instance;
    private JsiiClient client;
    private JsiiRuntime jsiiRuntime;

    @BeforeEach
    public void setUp() {
        jsiiRuntime = new JsiiRuntime();
        this.client = jsiiRuntime.getClient();

        this.client.loadModule(new software.amazon.jsii.tests.calculator.baseofbase.$Module());
        this.client.loadModule(new software.amazon.jsii.tests.calculator.base.$Module());
        this.client.loadModule(new software.amazon.jsii.tests.calculator.lib.$Module());
        this.client.loadModule(new software.amazon.jsii.tests.calculator.$Module());
    }

    @Test
    public void initialTest() {
        JsiiObjectRef obj = client.createObject("@scope/jsii-calc-lib.Number", Collections.singletonList(42), Arrays.asList(), Arrays.asList());
        assertEquals(84, fromSandbox(client.getPropertyValue(obj, "doubleValue")));
        assertEquals("Number", fromSandbox(client.callMethod(obj, "typeName", toSandboxArray())));

        ObjectNode calculatorProps = JSON.objectNode();
        calculatorProps.set("initialValue", JSON.numberNode(100));

        JsiiObjectRef calculator = client.createObject("jsii-calc.Calculator", Collections.singletonList(calculatorProps), Arrays.asList(), Arrays.asList());
        assertNull(fromSandbox(client.callMethod(calculator, "add", toSandboxArray(50))));

        JsiiObjectRef add = JsiiObjectRef.parse(client.getPropertyValue(calculator, "curr"));
        assertEquals(150, fromSandbox(client.getPropertyValue(add, "value")));

        JsonNode names = client.getModuleNames("@scope/jsii-calc-lib");
        assertEquals("software.amazon.jsii.tests.calculator.lib", names.get("java").get("package").textValue());

        JsonNode names2 = client.getModuleNames("jsii-calc");
        assertEquals("software.amazon.jsii.tests.calculator", names2.get("java").get("package").textValue());

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
        JsiiObjectRef obj = client.createObject("jsii-calc.AsyncVirtualMethods", Arrays.asList(), Arrays.asList(), Arrays.asList());

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
        JsiiObjectRef obj = client.createObject("jsii-calc.AsyncVirtualMethods", Arrays.asList(), methodOverride("overrideMe", "myCookie"), Arrays.asList());

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
        assertEquals(JsiiObjectMapper.valueToTree(10), first.getInvoke().getArgs().get(0));
        assertEquals(obj.getObjId(), JsiiObjectRef.parse(first.getInvoke().getObjref()).getObjId());

        // now complete the callback with some override value
        client.completeCallback(first, null, null, toSandbox(999));

        // end the async invocation, but now we expect the value to be different since we override the method.
        JsonNode result = client.endAsyncMethod(promise);
        assertEquals(1007, result.asInt());
    }

    @Test
    public void asyncMethodOverridesThrow() {
        JsiiObjectRef obj = client.createObject("jsii-calc.AsyncVirtualMethods", Arrays.asList(), methodOverride("overrideMe", "myCookie"), Arrays.asList());

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
        assertEquals(JsiiObjectMapper.valueToTree(10), first.getInvoke().getArgs().get(0));
        assertEquals(obj.getObjId(), JsiiObjectRef.parse(first.getInvoke().getObjref()).getObjId());

        // now complete the callback with an error
        client.completeCallback(first, "Hello, Error", null, null);

        // end the async invocation, but now we expect the value to be different since we override the method.
        boolean thrown = false;
        try {
            client.endAsyncMethod(promise);
        } catch (RuntimeException e) {
            assertEquals(RuntimeException.class, e.getClass());
            assertTrue(e.getMessage().contains("Hello, Error"));
            thrown = true;
        }
        assertTrue(thrown);
    }

    @Test
    public void asyncMethodOverridesThrowWithFault() {
        JsiiObjectRef obj = client.createObject("jsii-calc.AsyncVirtualMethods", Arrays.asList(), methodOverride("overrideMe", "myCookie"), Arrays.asList());

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
        assertEquals(JsiiObjectMapper.valueToTree(10), first.getInvoke().getArgs().get(0));
        assertEquals(obj.getObjId(), JsiiObjectRef.parse(first.getInvoke().getObjref()).getObjId());

        // now complete the callback with an error
        client.completeCallback(first, "The kernel encountered a fault", "@jsii/kernel.Fault", null);

        // end the async invocation, but now we expect the value to be different since we override the method.
        boolean thrown = false;
        try {
            client.endAsyncMethod(promise);
        } catch (JsiiError e) {
            assertEquals(JsiiError.class, e.getClass());
            assertTrue(e.getMessage().contains("The kernel encountered a fault"));
            thrown = true;
        }
        assertTrue(thrown);
    }

    @Test
    public void syncVirtualMethods() {
        JsiiObjectRef obj = client.createObject("jsii-calc.SyncVirtualMethods", Arrays.asList(), methodOverride("virtualMethod","myCookie"), Arrays.asList());

        jsiiRuntime.setCallbackHandler(callback -> {
            assertEquals(obj.getObjId(), JsiiObjectRef.parse(callback.getInvoke().getObjref()).getObjId());
            assertEquals("virtualMethod", callback.getInvoke().getMethod());
            assertEquals(JsiiObjectMapper.valueToTree(10), callback.getInvoke().getArgs().get(0));
            assertEquals("myCookie", callback.getCookie());

            // interact with jsii from inside the callback
            JsiiObjectRef num = client.createObject("@scope/jsii-calc-lib.Number", Arrays.asList(42), Arrays.asList(), Arrays.asList());
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
        final String fqn = "jsii-calc.Statics";
        assertEquals("hello", client.getStaticPropertyValue(fqn, "Foo").textValue());

        JsonNode defaultInstance = client.getStaticPropertyValue(fqn, "instance");
        assertEquals("default", client.getPropertyValue(JsiiObjectRef.parse(defaultInstance), "value").textValue());

        JsiiObjectRef newValue = client.createObject(fqn, Arrays.asList("NewValue"), Arrays.asList(), Arrays.asList());
        client.setStaticPropertyValue(fqn, "instance", newValue.toJson());

        JsonNode newInstance = client.getStaticPropertyValue(fqn, "instance");
        assertEquals("NewValue", client.getPropertyValue(JsiiObjectRef.parse(newInstance), "value").textValue());
    }

    @Test
    public void staticMethods() {
        final String fqn = "jsii-calc.Statics";
        JsonNode result = client.callStaticMethod(fqn, "staticMethod", JSON.arrayNode().add("Foo"));
        assertEquals("hello ,Foo!", result.textValue());
    }

    /**
     * If a JsiiSerializable object has a method named "$jsii$toJson", it will be
     * used to serialize the object instead of the normal
     */
    @Test
    public void serializeViaJsiiToJsonIfExists() {
        JsonNode result = JsiiObjectMapper.INSTANCE.valueToTree(new JsiiSerializable() {
            public JsonNode $jsii$toJson() {
                ObjectNode node = JSON.objectNode();
                node.set("foo", OM.valueToTree("bar"));
                node.set("hey", OM.valueToTree(42));
                return node;
            }
        });

        assertEquals("{\"foo\":\"bar\",\"hey\":42}", result.toString());
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
