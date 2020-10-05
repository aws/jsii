package software.amazon.jsii.api;

import com.fasterxml.jackson.databind.JsonNode;

import software.amazon.jsii.Internal;

/**
 * Represents a "set property" jsii-runtime request.
 */
@Internal
public class SetRequest {
    /**
     * The jsii object reference.
     */
    private JsonNode objref;

    /**
     * The name of the property to set.
     */
    private String property;

    /**
     * The new value.
     */
    private JsonNode value;

    /**
     * @return The jsii object reference.
     */
    public JsonNode getObjref() {
        return objref;
    }

    /**
     * @param objref The jsii object reference.
     */
    public void setObjref(final JsonNode objref) {
        this.objref = objref;
    }

    /**
     * @return The name of the property to set.
     */
    public String getProperty() {
        return property;
    }

    /**
     * @param property The name of the property to set.
     */
    public void setProperty(final String property) {
        this.property = property;
    }

    /**
     * @return The new value.
     */
    public JsonNode getValue() {
        return value;
    }

    /**
     * @param value The new value.
     */
    public void setValue(final JsonNode value) {
        this.value = value;
    }
}
