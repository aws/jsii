package software.amazon.jsii;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.deser.BeanDeserializerModifier;
import com.fasterxml.jackson.databind.deser.ContextualDeserializer;
import com.fasterxml.jackson.databind.deser.ResolvableDeserializer;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.jsontype.TypeSerializer;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.module.SimpleSerializers;
import com.fasterxml.jackson.databind.type.MapLikeType;
import com.fasterxml.jackson.databind.type.MapType;
import org.jetbrains.annotations.Nullable;

/**
 * Provides a correctly configured JSON processor for handling JSII requests and responses.
 */
@Internal
public final class JsiiObjectMapper {
  /**
   * An ObjectMapper that can be used to serialize and deserialize JSII requests and responses.
   */
  public static final ObjectMapper INSTANCE = new JsiiObjectMapper().getObjectMapper();

  /**
   * Similar to calling JsiiObjectMapper.INSTANCE.treeToValue, but handles a null JsonNode argument
   * well, and throws JsiiError instead of JsonProcessingException.
   *
   * @param tree the JSON object to parse
   * @param valueType the expected type value type
   * @param <T> expected type
   * @return the deserialized value
   */
  public static <T> T treeToValue(final JsonNode tree, final NativeType<T> valueType) {
    if (tree == null) {
      return null;
    }
    final Object result = INSTANCE.convertValue(tree, valueType.getJavaType());
    return valueType.transform(result);
  }

  /**
   * Similar to calling JsiiObjectMapper.INSTANCE.valueToTree, but handles a null argument well by
   * returning null.
   *
   * @param value the value to serialize
   * @param <T> expected JSON type
   * @return the JSON object
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

  private static final String TOKEN_MAP = "$jsii.map";

  private final ObjectMapper objectMapper;

  @Nullable
  private final JsiiEngine jsiiEngine;

  private JsiiObjectMapper() {
    this(null);
  }

  JsiiObjectMapper(@Nullable final JsiiEngine jsiiEngine) {
    this.jsiiEngine = jsiiEngine;

    this.objectMapper = new ObjectMapper();
    this.objectMapper.setSerializationInclusion(Include.NON_NULL);

    final SimpleModule module = new SimpleModule("JSII", Version.unknownVersion());
    module.setDeserializerModifier(new JsiiDeserializerModifier());
    module.setSerializers(new JsiiSerializers());
    module.addSerializer(Enum.class, new EnumSerializer());
    module.addSerializer(Instant.class, new InstantSerializer());
    module.addSerializer(JsiiSerializable.class, new JsiiSerializer());

    this.objectMapper.findAndRegisterModules();
    this.objectMapper.registerModule(module);
  }

  ObjectMapper getObjectMapper() {
    return this.objectMapper;
  }

  private JsiiEngine getEngine() {
    if (this.jsiiEngine != null) {
      return this.jsiiEngine;
    }
    return JsiiEngine.getInstance();
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
    public Object deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
      final JsonNode node = p.readValueAsTree();

      if (node.isObject()) {
        if (node.has(TOKEN_DATE)) {
          return Instant.parse(node.get(TOKEN_DATE).textValue());
        }
        if (node.has(TOKEN_ENUM)) {
          return getEngine().findEnumValue(node.get(TOKEN_ENUM).textValue());
        }
        if (node.has(TOKEN_REF)) {
          return getEngine().nativeFromObjRef(JsiiObjectRef.parse(node));
        }
        if (node.has(TOKEN_MAP)) {
          return getObjectMapper().treeToValue(node.get(TOKEN_MAP), Map.class);
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
  private final class JsiiSerializer extends JsonSerializer<JsiiSerializable> {
    @Override
    public void serialize(final JsiiSerializable o,
                          final JsonGenerator jsonGenerator,
                          final SerializerProvider serializerProvider) throws IOException {
      // First, ensure the relevant interfaces' modules have been loaded (in case "o" is a struct instance)
      for (final Class<?> iface : o.getClass().getInterfaces()) {
        final Jsii jsii = JsiiEngine.tryGetJsiiAnnotation(iface, true);
        if (jsii != null) {
          getEngine().loadModule(jsii.module());
        }
      }
      // Then dump the JSON out
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
      Jsii jsii = this.tryGetJsiiAnnotation(value.getClass());
      if (jsii == null) {
        throw new JsiiError("Cannot serialize non-jsii enums");
      } else {
        gen.writeStartObject();
        gen.writeStringField(TOKEN_ENUM, jsii.fqn() + "/" + value.toString());
        gen.writeEndObject();
      }
    }

    private Jsii tryGetJsiiAnnotation(final Class<?> type) {
      final Jsii[] ann = type.getDeclaredAnnotationsByType(Jsii.class);

      if (ann.length == 0) {
        return null;
      }

      return ann[0];
    }
  }

  /**
   * Serializer for Instants.
   */
  private static final class InstantSerializer extends JsonSerializer<Instant> {
    @Override
    public void serialize(final Instant value, final JsonGenerator gen, final SerializerProvider serializers) throws IOException {
      gen.writeStartObject();
      gen.writeStringField(TOKEN_DATE, value.toString());
      gen.writeEndObject();
    }
  }

  private static final class JsiiSerializers extends SimpleSerializers {
    @Override
    public JsonSerializer<?> findMapSerializer(SerializationConfig config, MapType type, BeanDescription beanDesc, JsonSerializer<Object> keySerializer, TypeSerializer elementTypeSerializer, JsonSerializer<Object> elementValueSerializer) {
      final JsonSerializer<?> standard = super.findMapSerializer(config, type, beanDesc, keySerializer, elementTypeSerializer, elementValueSerializer);
      return new JsiiMapSerializer<>(standard);
    }
  }

  private static final class JsiiMapSerializer<T> extends JsonSerializer<T> {
    private final JsonSerializer<T> delegate;

    JsiiMapSerializer(final JsonSerializer<T> delegate) {
      this.delegate = delegate;
    }

    @Override
    @SuppressWarnings("unchecked")
    public void serialize(T value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
      gen.writeStartObject();
      gen.writeFieldName(TOKEN_MAP);
      if (this.delegate != null) {
        this.delegate.serialize(value, gen, serializers);
      } else {
        gen.writeStartObject();
        for (final Map.Entry<String, Object> entry : ((Map<String, Object>)value).entrySet()) {
          serializers.defaultSerializeField(entry.getKey(), entry.getValue(), gen);
        }
        gen.writeEndObject();
      }
      gen.writeEndObject();
    }
  }
}
