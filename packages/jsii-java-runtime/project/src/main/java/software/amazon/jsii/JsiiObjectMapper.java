package software.amazon.jsii;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static software.amazon.jsii.JsiiEngine.tryGetJsiiAnnotation;

/**
 * Implements serialization/deserialization of jsii data.
 */
public final class JsiiObjectMapper {
    /**
     * Singleton instance of the object mapper.
     */
    public static JsiiObjectMapper instance = new JsiiObjectMapper();

    /**
     * JSON token that represents an object reference.
     */
    private static final String TOKEN_REF = JsiiObjectRef.TOKEN_REF;

    /**
     * JSON token to represent a date.
     */
    private static final String TOKEN_DATE = "$jsii.date";

    /**
     * JSON token to represent an enum.
     */
    private static final String TOKEN_ENUM = "$jsii.enum";

    /**
     * The standard JSON mapper.
     */
    private static ObjectMapper standardMapper = new ObjectMapper();

    /**
     * Object mapper configured for jsii serialization.
     */
    private ObjectMapper serializer;

    /**
     * Creates an object mapper.
     */
    private JsiiObjectMapper() {
        this.serializer = new ObjectMapper();
        this.serializer.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        SimpleModule module = new SimpleModule();
        module.addSerializer(JsiiSerializable.class, new JsiiSerializer());
        module.addSerializer(Instant.class, new DateSerializer());
        module.addSerializer(Enum.class, new EnumSerializer());


        this.serializer.registerModule(module);
    }

    /**
     * Converts a local value to a jsii JSON representation.
     *
     * @param value The local java value.
     * @param <T> The return type.
     * @return A JSON tree.
     */
    public <T extends JsonNode> T valueToTree(final Object value) {
        if (value == null) {
            return null;
        }

        return this.serializer.valueToTree(value);
    }

    /**
     * Converts a jsii JSON tree to a local Java type.
     * @param tree The JSON tree.
     * @param type The expected return type.
     * @param <T> The return type.
     * @return The local Java value.
     * @throws JsonProcessingException If there was a problem reading the JSON tree.
     */
    @SuppressWarnings("unchecked")
    public <T> T treeToValue(final JsonNode tree, final Class<T> type) throws JsonProcessingException {
        if (tree == null) {
            return null;
        }

        if (tree.isArray()) {
            ArrayNode array = (ArrayNode) tree;
            ArrayList<Object> out = new ArrayList<>();
            for (JsonNode x : array) {
                out.add(treeToValue(x, Object.class));
            }
            return (T) out;
        }

        if (tree.isObject() && tree.has(TOKEN_DATE)) {
            return (T) Instant.parse(tree.get(TOKEN_DATE).textValue());
        }

        if (tree.isObject() && tree.has(TOKEN_REF)) {
            return (T) JsiiEngine.getInstance().nativeFromObjRef(JsiiObjectRef.parse(tree));
        }

        if (tree.isObject() && tree.has(TOKEN_ENUM)) {
            return (T) JsiiEngine.getInstance().findEnumValue(tree.get(TOKEN_ENUM).textValue());
        }

        // json type
        if (ObjectNode.class.isAssignableFrom(type)) {
            return (T) tree;
        }

        if (tree.isObject()) {
            ObjectNode objectNode = (ObjectNode) tree;
            Map<String, Object> map = new HashMap<>();
            Iterable<String> fields = objectNode::fieldNames;
            for (String field : fields) {
                Object value = treeToValue(objectNode.get(field), Object.class);
                map.put(field, value);
            }
            return (T) map;
        }

        return standardMapper.treeToValue(tree, type);
    }

    /**
     * Serializer for enum values.
     */
    @SuppressWarnings("rawtypes")
    private static class EnumSerializer extends JsonSerializer<Enum> {
        @Override
        public void serialize(final Enum value, final JsonGenerator gen, final SerializerProvider serializers)
                throws IOException {
            Jsii jsii = tryGetJsiiAnnotation(value.getClass(), false);
            if (jsii == null) {
                throw new JsiiException("Cannot serialize non-jsii enums");
            } else {
                gen.writeStartObject();
                gen.writeStringField(TOKEN_ENUM, jsii.fqn() + "/" + value.toString());
                gen.writeEndObject();
            }
        }
    }

    /**
     * Serializer for dates.
     */
    private static class DateSerializer extends JsonSerializer<Instant> {
        @Override
        public void serialize(final Instant value, final JsonGenerator gen, final SerializerProvider serializers)
                throws IOException {
            gen.writeStartObject();
            gen.writeStringField(TOKEN_DATE, value.toString());
            gen.writeEndObject();
        }
    }

    /**
     * Serializer for classes that extend JsiiObject and any other class that implements a jsii interface.
     * We use the JsiiSerializable interface as a way to identify "anything jsii-able".
     */
    private static class JsiiSerializer extends JsonSerializer<JsiiSerializable> {
        @Override
        public void serialize(final JsiiSerializable o,
                              final JsonGenerator jsonGenerator,
                              final SerializerProvider serializerProvider) throws IOException {

            jsonGenerator.writeTree(o.$jsii$toJson());
        }
    }
}
