package software.amazon.jsii;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.List;
import java.util.Map;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.STRICT_STUBS)
public final class JsiiObjectTest {
    private final JsonNodeFactory nodeFactory = JsonNodeFactory.instance;
    private int nextInstanceId = 50000;

    /**
     * "Legacy" tests allow ensuring that code generated before the fix for https://github.com/aws/jsii/issues/1196 was
     * rolled out continue to work with fixed runtimes (that leverage a newer API). The collection elements are expected
     * to "incorrectly" be instances of {@link JsiiObject} instead of the desired interface type. Those tests
     * essentially ensure the code does not crash where it used to work (even though incorrectly).
     */
    @Test
    public void testJsiiCall_Legacy_ReturnsListOfInterfaces() {
        // GIVEN
        final JsiiEngine mockEngine = mock(JsiiEngine.class, "MockEngine");
        final JsiiClient mockClient = mock(JsiiClient.class, "MockClient");
        final JsiiObjectRef objectRef = JsiiObjectRef.fromObjId("Object@10000");

        // WHEN
        when(mockEngine.getClient()).thenReturn(mockClient);
        when(mockEngine.nativeToObjRef(any())).thenReturn(objectRef);
        when(mockClient.callMethod(objectRef, "listOfInterfaces", nodeFactory.arrayNode()))
                .thenReturn(nodeFactory.arrayNode()
                        .add(makeObjectReferenceNode())
                        .add(makeObjectReferenceNode()));
        // THEN
        final LegacySubject subject = new LegacySubject(mockEngine, objectRef);
        final List<TestInterface> result = subject.listOfInterfaces();
        assertNotNull(result);
        for (final Object element : result) {
            assertTrue(element instanceof JsiiObject,
                    String.format("Element %s (of type %s) is not a %s", element, element.getClass(), JsiiObject.class));
        }

        final ArgumentCaptor<LegacySubject> capture = ArgumentCaptor.forClass(LegacySubject.class);
        verify(mockEngine).registerObject(eq(objectRef), capture.capture());
        assertEquals(subject, capture.getValue());
    }

    /**
     * "Legacy" tests allow ensuring that code generated before the fix for https://github.com/aws/jsii/issues/1196 was
     * rolled out continue to work with fixed runtimes (that leverage a newer API). The collection elements are expected
     * to "incorrectly" be instances of {@link JsiiObject} instead of the desired interface type. Those tests
     * essentially ensure the code does not crash where it used to work (even though incorrectly).
     */
    @Test
    public void testJsiiGet_ReturnsListOfInterfaces() {
        // GIVEN
        final JsiiEngine mockEngine = mock(JsiiEngine.class, "MockEngine");
        final JsiiClient mockClient = mock(JsiiClient.class, "MockClient");
        final JsiiObjectRef objectRef = JsiiObjectRef.fromObjId("Object@10000");

        // WHEN
        when(mockEngine.getClient()).thenReturn(mockClient);
        when(mockEngine.nativeToObjRef(any())).thenReturn(objectRef);
        when(mockClient.getPropertyValue(objectRef, "interfaces"))
                .thenReturn(nodeFactory.arrayNode()
                        .add(makeObjectReferenceNode())
                        .add(makeObjectReferenceNode()));
        // THEN
        final LegacySubject subject = new LegacySubject(mockEngine, objectRef);
        final List<TestInterface> result = subject.getInterfaces();
        assertNotNull(result);
        for (final Object element : result) {
            assertTrue(element instanceof JsiiObject,
                    String.format("Element %s (of type %s) is not a %s", element, element.getClass(), JsiiObject.class));
        }

        final ArgumentCaptor<LegacySubject> capture = ArgumentCaptor.forClass(LegacySubject.class);
        verify(mockEngine).registerObject(eq(objectRef), capture.capture());
        assertEquals(subject, capture.getValue());
    }

    /**
     * "Legacy" tests allow ensuring that code generated before the fix for https://github.com/aws/jsii/issues/1196 was
     * rolled out continue to work with fixed runtimes (that leverage a newer API). The collection elements are expected
     * to "incorrectly" be instances of {@link JsiiObject} instead of the desired interface type. Those tests
     * essentially ensure the code does not crash where it used to work (even though incorrectly).
     */
    @Test
    public void testJsiiCall_ReturnsMapOfInterfaces() {
        // GIVEN
        final JsiiEngine mockEngine = mock(JsiiEngine.class, "MockEngine");
        final JsiiClient mockClient = mock(JsiiClient.class, "MockClient");
        final JsiiObjectRef objectRef = JsiiObjectRef.fromObjId("Object@10000");

        // WHEN
        when(mockEngine.getClient()).thenReturn(mockClient);
        when(mockEngine.nativeToObjRef(any())).thenReturn(objectRef);
        when(mockClient.callMethod(objectRef, "mapOfInterfaces", nodeFactory.arrayNode()))
                .thenReturn(nodeFactory.objectNode().set("A", makeObjectReferenceNode()));

        // THEN
        final LegacySubject subject = new LegacySubject(mockEngine, objectRef);
        final Map<String, TestInterface> result = subject.mapOfInterfaces();
        assertNotNull(result);
        for (final Object element : result.values()) {
            assertTrue(element instanceof JsiiObject,
                    String.format("Element %s (of type %s) is not a %s", element, element.getClass(), JsiiObject.class));
        }

        final ArgumentCaptor<LegacySubject> capture = ArgumentCaptor.forClass(LegacySubject.class);
        verify(mockEngine).registerObject(eq(objectRef), capture.capture());
        assertEquals(subject, capture.getValue());
    }

    /**
     * "Legacy" tests allow ensuring that code generated before the fix for https://github.com/aws/jsii/issues/1196 was
     * rolled out continue to work with fixed runtimes (that leverage a newer API). The collection elements are expected
     * to "incorrectly" be instances of {@link JsiiObject} instead of the desired interface type. Those tests
     * essentially ensure the code does not crash where it used to work (even though incorrectly).
     */
    @Test
    public void testJsiiGet_ReturnsMapOfInterfaces() {
        // GIVEN
        final JsiiEngine mockEngine = mock(JsiiEngine.class, "MockEngine");
        final JsiiClient mockClient = mock(JsiiClient.class, "MockClient");
        final JsiiObjectRef objectRef = JsiiObjectRef.fromObjId("Object@10000");

        // WHEN
        when(mockEngine.getClient()).thenReturn(mockClient);
        when(mockEngine.nativeToObjRef(any())).thenReturn(objectRef);
        when(mockClient.getPropertyValue(objectRef, "interfaceMap"))
                .thenReturn(nodeFactory.objectNode().set("A", makeObjectReferenceNode()));

        // THEN
        final LegacySubject subject = new LegacySubject(mockEngine, objectRef);
        final Map<String, TestInterface> result = subject.getInterfaceMap();
        assertNotNull(result);
        for (final Object element : result.values()) {
            assertTrue(element instanceof JsiiObject,
                    String.format("Element %s (of type %s) is not a %s", element, element.getClass(), JsiiObject.class));
        }

        final ArgumentCaptor<LegacySubject> capture = ArgumentCaptor.forClass(LegacySubject.class);
        verify(mockEngine).registerObject(eq(objectRef), capture.capture());
        assertEquals(subject, capture.getValue());
    }

    private ObjectNode makeObjectReferenceNode() {
        final ObjectNode objectNode = nodeFactory.objectNode()
                .put(JsiiObjectRef.TOKEN_REF, String.format("Object@%d", nextInstanceId += 11));
        objectNode.putArray(JsiiObjectRef.TOKEN_INTERFACES).add("@jsii/java-runtime.TestInterface");
        return objectNode;
    }

    @SuppressWarnings({ "deprecation", "unchecked" })
    private static final class LegacySubject extends JsiiObject {
        public LegacySubject(final JsiiEngine engine, final JsiiObjectRef objectRef) {
            super(engine, objectRef);
        }

        public final List<TestInterface> listOfInterfaces() {
            // Intentionally uses the "legacy" API that predates https://github.com/aws/jsii/issues/1196
            return this.jsiiCall("listOfInterfaces", List.class);
        }

        public final List<TestInterface> getInterfaces() {
            // Intentionally uses the "legacy" API that predates https://github.com/aws/jsii/issues/1196
            return this.jsiiGet("interfaces", List.class);
        }

        public final Map<String, TestInterface> mapOfInterfaces() {
            // Intentionally uses the "legacy" API that predates https://github.com/aws/jsii/issues/1196
            return this.jsiiCall("mapOfInterfaces", Map.class);
        }

        public final Map<String, TestInterface> getInterfaceMap() {
            // Intentionally uses the "legacy" API that predates https://github.com/aws/jsii/issues/1196
            return this.jsiiGet("interfaceMap", Map.class);
        }
    }

    private interface TestInterface {
        /* Intentionally left empty. */
    }
}
