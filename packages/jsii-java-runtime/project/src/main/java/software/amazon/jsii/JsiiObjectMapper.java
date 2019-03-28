package software.amazon.jsii;

import java.io.IOException;
import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.BeanDescription;
import com.fasterxml.jackson.databind.BeanProperty;
import com.fasterxml.jackson.databind.DeserializationConfig;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.deser.BeanDeserializerModifier;
import com.fasterxml.jackson.databind.deser.ContextualDeserializer;
import com.fasterxml.jackson.databind.deser.ResolvableDeserializer;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.type.MapLikeType;
import com.fasterxml.jackson.databind.type.MapType;
import com.google.common.annotations.VisibleForTesting;

/**
 * Provides a correctly configured JSON processor for handling JSII requests and responses.
 */
public final class JsiiObjectMapper {
  public static final long serialVersionUID = 1L;

  /**
   * An ObjectMapper that can be used to serialize and deserialize JSII requests and responses.
   */
  public static final ObjectMapper INSTANCE = new JsiiObjectMapper().getObjectMapper();

  /**
   * Similar to calling JsiiObjectMapper.INSTANCE.treeToValue, but handles a null JsonNode argument
   * well, and throws JsiiException instead of JsonProcessingException.
   */
  public static <T> T treeToValue(final JsonNode tree, final Class<T> valueType) {
    if (tree == null) {
      return null;
    }
    try {
      return INSTANCE.treeToValue(tree, valueType);
    } catch (final JsonProcessingException jpe) {
      throw new JsiiException(jpe);
    }
  }

  /**
   * Similar to calling JsiiObjectMapper.INSTANCE.valueToTree, but handles a null argument well by
   * returning null.
   */
  public static <T extends JsonNode> T valueToTree(final Object value) {
    if (value == null) {
      return null;
    }
    return INSTANCE.valueToTree(value);
  }

  private static final String TOKEN_REF = JsiiObjectRef.TOKEN_REF;

  private static final String TOKEN_DATE = "$jsii.date";

  private static final String TOKEN_ENUM = "$jsii.enum";

  private final ObjectMapper objectMapper;

  private final JsiiEngine jsiiEngine;

  private JsiiObjectMapper() {
    this(JsiiEngine.getInstance());
  }

  @VisibleForTesting
  JsiiObjectMapper(final JsiiEngine jsiiEngine) {
    this.jsiiEngine = jsiiEngine;

    this.objectMapper = new ObjectMapper();
    this.objectMapper.setSerializationInclusion(Include.NON_NULL);

    final SimpleModule module = new SimpleModule("JSII", Version.unknownVersion());
    module.setDeserializerModifier(new JsiiDeserializerModifier());
    module.addSerializer(Enum.class, new EnumSerializer());
    module.addSerializer(Instant.class, new Instanterializer());
    module.addSerializer(JsiiSerializable.class, new JsiiSerializer());

    this.objectMapper.findAndRegisterModules();
    this.objectMapper.registerModule(module);
  }

  @VisibleForTesting
  ObjectMapper getObjectMapper() {
    return this.objectMapper;
  }

  /**
   * A JsonDeserializer designed to correctly handle JSII "magic objects" that are used to remodel "pass-by-reference"
   * values, dates, and enum constants.
   */
  private final class JsiiDeserializer extends StdDeserializer<Object> implements ContextualDeserializer, ResolvableDeserializer{
    public static final long serialVersionUID = 1L;

    private final JsonDeserializer<?> standardDeserializer;

    /**
     * @param standardDeserializer a standard Jackson deserialize that can be delegated to in case the object is not a
     *                             JSII "magic object".
     */
    public JsiiDeserializer(final JsonDeserializer<?> standardDeserializer) {
      super(Object.class);
      this.standardDeserializer = standardDeserializer;
    }

    @Override
    public Object deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
      final JsonNode node = p.readValueAsTree();

      if (node.isObject()) {
        if (node.has(TOKEN_DATE)) {
          return Instant.parse(node.get(TOKEN_DATE).textValue());
        }
        if (node.has(TOKEN_ENUM)) {
          return jsiiEngine.findEnumValue(node.get(TOKEN_ENUM).textValue());
        }
        if (node.has(TOKEN_REF)) {
          return jsiiEngine.nativeFromObjRef(JsiiObjectRef.parse(node));
        }
      }

      final JsonParser nodeParser = node.traverse(p.getCodec());
      nodeParser.nextToken();
      return standardDeserializer.deserialize(nodeParser, ctxt);
    }

    @Override
    public JsonDeserializer<?> createContextual(DeserializationContext ctxt, BeanProperty property) throws JsonMappingException {
      if (this.standardDeserializer instanceof ContextualDeserializer) {
        return new JsiiDeserializer(((ContextualDeserializer)this.standardDeserializer).createContextual(ctxt, property));
      }
      return this;
    }

    @Override
    public void resolve(DeserializationContext ctxt) throws JsonMappingException {
      if (this.standardDeserializer instanceof ResolvableDeserializer) {
        ((ResolvableDeserializer)this.standardDeserializer).resolve(ctxt);
      }
    }
  }

  public final class JsiiDeserializerModifier extends BeanDeserializerModifier {
    @Override
    public JsonDeserializer<?> modifyDeserializer(DeserializationConfig config,
                                                  BeanDescription beanDesc,
                                                  JsonDeserializer<?> deserializer) {
      return new JsiiDeserializer(deserializer);
    }

    @Override
    public JsonDeserializer<?> modifyEnumDeserializer(DeserializationConfig config,
                                                      JavaType type,
                                                      BeanDescription beanDesc,
                                                      JsonDeserializer<?> deserializer) {
      return new JsiiDeserializer(deserializer);
    }

    @Override
    public JsonDeserializer<?> modifyMapDeserializer(DeserializationConfig config,
                                                     MapType type,
                                                     BeanDescription beanDesc,
                                                     JsonDeserializer<?> deserializer) {
      return new JsiiDeserializer(deserializer);
    }

    @Override
    public JsonDeserializer<?> modifyMapLikeDeserializer(DeserializationConfig config,
                                                         MapLikeType type,
                                                         BeanDescription beanDesc,
                                                         JsonDeserializer<?> deserializer) {
      return new JsiiDeserializer(deserializer);
    }
  }

  /**
   * Serializer for classes that extend JsiiObject and any other class that implements a jsii interface.
   * We use the JsiiSerializable interface as a way to identify "anything jsii-able".
   */
  private static final class JsiiSerializer extends JsonSerializer<JsiiSerializable> {
    @Override
    public void serialize(final JsiiSerializable o,
                          final JsonGenerator jsonGenerator,
                          final SerializerProvider serializerProvider) throws IOException {
      jsonGenerator.writeTree(o.$jsii$toJson());
    }
  }

  /**
   * Serializer for enum values.
   */
  @SuppressWarnings("rawtypes")
  private static final class EnumSerializer extends JsonSerializer<Enum> {
    @Override
    public void serialize(final Enum value, final JsonGenerator gen, final SerializerProvider serializers) throws IOException {
      Jsii jsii = this.tryGetJsiiAnnotation(value.getClass(), false);
      if (jsii == null) {
        throw new JsiiException("Cannot serialize non-jsii enums");
      } else {
        gen.writeStartObject();
        gen.writeStringField(TOKEN_ENUM, jsii.fqn() + "/" + value.toString());
        gen.writeEndObject();
      }
    }

    private Jsii tryGetJsiiAnnotation(final Class<?> type, final boolean inherited) {
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
  }

  /**
   * Serializer for Instants.
   */
  private static final class Instanterializer extends JsonSerializer<Instant> {
    @Override
    public void serialize(final Instant value, final JsonGenerator gen, final SerializerProvider serializers) throws IOException {
      gen.writeStartObject();
      gen.writeStringField(TOKEN_DATE, value.toString());
      gen.writeEndObject();
    }
  }
}
