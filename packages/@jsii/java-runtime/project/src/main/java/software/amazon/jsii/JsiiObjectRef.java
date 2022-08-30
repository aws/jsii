package software.amazon.jsii;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.jetbrains.annotations.VisibleForTesting;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

/**
 * Represents a remote jsii object reference.
 */
@Internal
public final class JsiiObjectRef {

    /**
     * The JSON key used to represent an object reference.
     */
    static final String TOKEN_REF = "$jsii.byref";

    /**
     * The JSON key used to represent an interface list.
     */
    static final String TOKEN_INTERFACES = "$jsii.interfaces";

    /**
     * The JSON node.
     */
    private JsonNode node;

    /**
     * The object ID.
     */
    private String objId;

    /**
     * The FQN of the object's type as parsed from the object ID.
     */
    private String fqn;

    private Set<String> interfaces;

    /**
     * Private constructor.
     * @param objId The object id.
     * @param node The JSON node that includes the objref.
     */
    private JsiiObjectRef(final String objId, final JsonNode node) {
        this(objId, node.has(TOKEN_INTERFACES)
                ? parseInterfaces(node.get(TOKEN_INTERFACES))
                : Collections.emptySet(), node);
    }

    @VisibleForTesting
    JsiiObjectRef(final String objId, final Set<String> interfaces) {
        this(objId, interfaces, JsiiObjectRef.makeJson(objId, interfaces));
    }

    private JsiiObjectRef(final String objId, final Set<String> interfaces, final JsonNode node) {
        this.objId = objId;
        int fqnDelimiter = this.objId.lastIndexOf("@");
        this.fqn = this.objId.substring(0, fqnDelimiter);
        this.interfaces = interfaces;
        this.node = node;
    }

    /**
     * Creates an object reference.
     * @param objRef The object reference.
     * @return A {@link JsiiObjectRef} object.
     */
    public static JsiiObjectRef parse(final JsonNode objRef) {
        if (!objRef.has(TOKEN_REF)) {
            throw new JsiiException("Malformed object reference. Expecting " + TOKEN_REF);
        }

        return new JsiiObjectRef(objRef.get(TOKEN_REF).textValue(), objRef);
    }

    /**
     * Creates an object ref from an object ID.
     * @param objId Object ID.
     * @return The new object ref.
     */
    public static JsiiObjectRef fromObjId(final String objId) {
        ObjectNode node = JsonNodeFactory.instance.objectNode();
        node.put(TOKEN_REF, objId);
        return new JsiiObjectRef(objId, node);
    }

    JsiiObjectRef withInterface(final String fqn) {
        final Set<String> interfaces = new HashSet<>(this.interfaces);
        interfaces.add(fqn);

        return new JsiiObjectRef(this.objId, interfaces);
    }

    private static JsonNode makeJson(final String objId, final Set<String> interfaces) {
        final ObjectNode node = JsonNodeFactory.instance.objectNode();
        node.put(TOKEN_REF, objId);
        final ArrayNode jsonInterfaces = JsonNodeFactory.instance.arrayNode();
        for (final String iface : interfaces) {
            jsonInterfaces.add(JsonNodeFactory.instance.textNode(iface));
        }
        node.set(TOKEN_INTERFACES, jsonInterfaces);
        return node;
    }

    private static Set<String> parseInterfaces(final JsonNode node) {
        if (!node.isArray()) {
            throw new Error(String.format("Invalid value for %s. Expected array but received %s", TOKEN_INTERFACES, node));
        }
        final Set<String> result = new HashSet<>();
        node.forEach(entry -> {
            if (!entry.isTextual()) {
                throw new Error(String.format("Invalid entry in %s. Expected only strings, but received %s", TOKEN_INTERFACES, entry));
            }
            result.add(entry.asText());
        });
        return Collections.unmodifiableSet(result);
    }

    /**
     * @return The jsii FQN (fully qualified name) of the object's type.
     */
    public String getFqn() {
        return fqn;
    }

    /**
     * @return The JSON node for this objref.
     */
    public JsonNode toJson() {
        return node;
    }

    /**
     * @return The object ID.
     */
    public String getObjId() {
        return objId;
    }

    /**
     * @return the lsit of interfaces implemented by the object
     */
    public Set<String> getInterfaces() {
        return interfaces;
    }

    @Override
    public String toString() {
        return objId;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || !(obj instanceof JsiiObjectRef)) {
            return false;
        }
        final JsiiObjectRef other = (JsiiObjectRef) obj;
        return this.objId.equals(other.objId);
    }

    @Override
    public int hashCode() {
        return this.objId.hashCode();
    }
}
