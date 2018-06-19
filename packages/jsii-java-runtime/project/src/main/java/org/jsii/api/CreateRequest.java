package org.jsii.api;

import java.util.Collection;

/**
 * Represents a "create" jsii-runtime request.
 */
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
}
