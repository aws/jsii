package software.amazon.jsii.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.List;

import software.amazon.jsii.Internal;

/**
 * Represents a method invocation jsii-runtime request.
 */
@Internal
public class InvokeRequest {
    /**
     * The object reference.
     */
    private ObjectNode objref;

    /**
     * The method to invoke.
     */
    private String method;

    /**
     * Method arguments.
     */
    private List<JsonNode> args;

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

    /**
     * @return The method to invoke.
     */
    public String getMethod() {
        return method;
    }

    /**
     * @param method The method to invoke.
     */
    public void setMethod(final String method) {
        this.method = method;
    }

    /**
     * @return Method arguments.
     */
    public List<JsonNode> getArgs() {
        return args;
    }

    /**
     * @param args Method arguments.
     */
    public void setArgs(final List<JsonNode> args) {
        this.args = args;
    }
}
