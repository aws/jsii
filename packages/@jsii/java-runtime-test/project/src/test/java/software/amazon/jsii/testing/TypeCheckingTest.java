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
import software.amazon.jsii.JsiiException;
import software.amazon.jsii.JsiiObjectMapper;
import software.amazon.jsii.JsiiObjectRef;
import software.amazon.jsii.JsiiPromise;
import software.amazon.jsii.JsiiRuntime;
import software.amazon.jsii.JsiiSerializable;
import software.amazon.jsii.api.Callback;
import software.amazon.jsii.api.JsiiOverride;
//import software.amazon.jsii.tests.compliance;
import software.amazon.jsii.tests.calculator.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class TypeCheckingTest {
    @BeforeEach
    /*public void setUp() {
        jsiiRuntime = new JsiiRuntime();
        this.client = jsiiRuntime.getClient();

        this.client.loadModule(new software.amazon.jsii.tests.calculator.baseofbase.$Module());
        this.client.loadModule(new software.amazon.jsii.tests.calculator.base.$Module());
        this.client.loadModule(new software.amazon.jsii.tests.calculator.lib.$Module());
        this.client.loadModule(new software.amazon.jsii.tests.calculator.$Module());
    }
    */

    @Test
    public void Constructor() {
        boolean thrown = false;
        try {
            new ClassWithCollectionOfUnions(new ArrayList<Map<String, Object>>());
        }
        catch (JsiiException e) {
            thrown = true;
        }
        assertTrue(thrown);
    }
}