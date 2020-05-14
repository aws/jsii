package software.amazon.jsii.tests.calculator;

/**
 * Verifies that, in languages that do keyword lifting (e.g: Python), having a struct member with the same name as a positional parameter results in the correct code being emitted.
 * <p>
 * See: https://github.com/aws/aws-cdk/issues/4302
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.StructParameterType")
@software.amazon.jsii.Jsii.Proxy(StructParameterType.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface StructParameterType extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.String getScope();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default @org.jetbrains.annotations.Nullable java.lang.Boolean getProps() {
        return null;
    }

    /**
     * @return a {@link Builder} of {@link StructParameterType}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link StructParameterType}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder implements software.amazon.jsii.Builder<StructParameterType> {
        private java.lang.String scope;
        private java.lang.Boolean props;

        /**
         * Sets the value of {@link StructParameterType#getScope}
         * @param scope the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder scope(java.lang.String scope) {
            this.scope = scope;
            return this;
        }

        /**
         * Sets the value of {@link StructParameterType#getProps}
         * @param props the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder props(java.lang.Boolean props) {
            this.props = props;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link StructParameterType}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public StructParameterType build() {
            return new Jsii$Proxy(scope, props);
        }
    }

    /**
     * An implementation for {@link StructParameterType}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements StructParameterType {
        private final java.lang.String scope;
        private final java.lang.Boolean props;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.scope = this.jsiiGet("scope", java.lang.String.class);
            this.props = this.jsiiGet("props", java.lang.Boolean.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.String scope, final java.lang.Boolean props) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.scope = java.util.Objects.requireNonNull(scope, "scope is required");
            this.props = props;
        }

        @Override
        public java.lang.String getScope() {
            return this.scope;
        }

        @Override
        public java.lang.Boolean getProps() {
            return this.props;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("scope", om.valueToTree(this.getScope()));
            if (this.getProps() != null) {
                data.set("props", om.valueToTree(this.getProps()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.StructParameterType"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            StructParameterType.Jsii$Proxy that = (StructParameterType.Jsii$Proxy) o;

            if (!scope.equals(that.scope)) return false;
            return this.props != null ? this.props.equals(that.props) : that.props == null;
        }

        @Override
        public int hashCode() {
            int result = this.scope.hashCode();
            result = 31 * result + (this.props != null ? this.props.hashCode() : 0);
            return result;
        }
    }
}
