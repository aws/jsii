package software.amazon.jsii;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Charsets;
import com.google.common.io.Resources;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public final class JsiiObjectMapperTest {
  private JsiiEngine jsiiEngine;
  private ObjectMapper subject;

  @BeforeEach
  public void setUp() {
    this.jsiiEngine = mock(JsiiEngine.class);
    this.subject = new JsiiObjectMapper(jsiiEngine).getObjectMapper();
  }

  @AfterEach
  public void cleanUp() {
    this.jsiiEngine = null;
    this.subject = null;
  }

  @Test
  public void testDeserialization() throws Exception {
    final Object mockObject1 = new Object();
    when(jsiiEngine.nativeFromObjRef(JsiiObjectRef.fromObjId("module.Type@1"))).thenReturn(mockObject1);

    when((TestEnum) jsiiEngine.findEnumValue("module.Enum#value")).thenReturn(TestEnum.DUMMY);

    final String json =
        Resources.toString(Resources.getResource(this.getClass(), "complex-callback.json"), Charsets.UTF_8);
    final TestCallback callback = subject.treeToValue(subject.readTree(json), TestCallback.class);

    assertEquals("CallbackID", callback.getCbid());
    assertNotNull(callback.getInvoke());
    if (callback.getCbid() != null) {
      assertEquals("methodName", callback.getInvoke().getMethod());
      assertEquals(1337, callback.getInvoke().getArgs().get(0));
      assertEquals(mockObject1, callback.getInvoke().getArgs().get(1));
      assertEquals(Instant.ofEpochMilli(1553624863569L), callback.getInvoke().getArgs().get(2));
      assertEquals(TestEnum.DUMMY, callback.getInvoke().getArgs().get(3));
    }
  }

  @Test
  public void testSerializationOfJsiiSerializables() throws Exception {
    final String dummyValue = "{\"foo\":\"Bar\"}";
    final JsiiSerializable object = mock(JsiiSerializable.class);
    when(object.$jsii$toJson()).thenReturn(new ObjectMapper().readTree(dummyValue));

    final String json = subject.writeValueAsString(object);

    assertEquals(dummyValue, json);
  }

  @Test
  public void testSerializationOfInstant() throws Exception {
    final Instant object = Instant.ofEpochMilli(1553691207095L);

    final String json = subject.writeValueAsString(object);

    assertEquals("{\"$jsii.date\":\"2019-03-27T12:53:27.095Z\"}", json);
  }

  private static enum TestEnum {
    DUMMY
  }

  /**
   * Kinda like the Callback object expcet it does not model stuff as JsonNodes,
   * so we can verify the deserialization behaviour.
   */
  public static final class TestCallback {
    private String cbid;

    private TestInvokeRequest invoke;

    public String getCbid() {
      return cbid;
    }

    public void setCbid(String cbid) {
      this.cbid = cbid;
    }

    public TestInvokeRequest getInvoke() {
      return invoke;
    }

    public void setInvoke(TestInvokeRequest invoke) {
      this.invoke = invoke;
    }
  }

  /**
   * Kinda like the InvokeRequest, except it does not model anything as JsonNode,
   * so we can test the deserialization behavior properly.
   */
  public static final class TestInvokeRequest {
    private String method;

    private List<Object> args;

    public String getMethod() {
      return method;
    }

    public void setMethod(String method) {
      this.method = method;
    }

    public List<Object> getArgs() {
      return args;
    }

    public void setArgs(List<Object> args) {
      this.args = args;
    }
  }
}
