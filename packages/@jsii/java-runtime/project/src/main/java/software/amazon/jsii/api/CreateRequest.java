package software.amazon.jsii.api;

import java.util.Collection;

import software.amazon.jsii.Internal;

/**
 * Represents a "create" jsii-runtime request.
 */
@Internal
public class CreateRequest {
    /**
     * The FQN of the class to create.
     */
    private String fqn;

    /**
     * A collection of initializer arguments.
     */
    private Collection<Object> args;

    /**
     * A collection of native overrides.
     */
    private Collection<JsiiOverride> overrides;

    /**
     * A collection of interfaces implemented by this object.
     */
    private Collection<String> interfaces;

    /**
     * @return The class's FQN.
     */
    public String getFqn() {
        return fqn;
    }

    /**
     * Sets the class's FQN.
     * @param fqn The FQN.
     */
    public void setFqn(final String fqn) {
        this.fqn = fqn;
    }

    /**
     * @return Initializer arguments.
     */
    public Collection<Object> getArgs() {
        return args;
    }

    /**
     * Sets initializer arguments.
     * @param args Arguments.
     */
    public void setArgs(final Collection<Object> args) {
        this.args = args;
    }

    /**
     * @return Overrides.
     */
    public Collection<JsiiOverride> getOverrides() {
        return overrides;
    }

    /**
     * Sets the overrides.
     * @param overrides Overrides
     */
    public void setOverrides(final Collection<JsiiOverride> overrides) {
        this.overrides = overrides;
    }

    /**
     * @return Interfaces
     */
    public Collection<String> getInterfaces() {
        return interfaces;
    }

    /**
     * Sets the interfaces
     * @param interfaces Interfaces
     */
    public void setInterfaces(Collection<String> interfaces) {
        this.interfaces = interfaces;
    }
}
