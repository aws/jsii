package software.amazon.jsii;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * Represents a remote jsii object reference.
 */
public final class JsiiObjectRef {

    /**
     * The JSON key used to represent an object reference.
     */
    static final String TOKEN_REF = "$jsii.byref";

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

    /**
     * Private constructor.
     * @param objId The object id.
     * @param node The JSON node that includes the objref.
     */
    private JsiiObjectRef(final String objId, final JsonNode node) {
        this.objId = objId;
        this.node = node;

        int fqnDelimiter = this.objId.lastIndexOf("@");
        this.fqn = this.objId.substring(0, fqnDelimiter);
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
