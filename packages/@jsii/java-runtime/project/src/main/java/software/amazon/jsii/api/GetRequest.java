package software.amazon.jsii.api;

import com.fasterxml.jackson.databind.node.ObjectNode;

import software.amazon.jsii.Internal;

/**
 * Represents a "get property" jsii-runtime request.
 */
@Internal
public class GetRequest {
    /**
     * The object reference.
     */
    private ObjectNode objref;

    /**
     * The name of the property.
     */
    private String property;

    /**
     * @return The name of the property.
     */
    public String getProperty() {
        return property;
    }

    /**
     * @param property The name of the property
     */
    public void setProperty(final String property) {
        this.property = property;
    }

    /**
     * @return The object reference.
     */
    public ObjectNode getObjref() {
        return objref;
    }

    /**
     * @param objref The object reference.
     */
    public void setObjref(final ObjectNode objref) {
        this.objref = objref;
    }
}
