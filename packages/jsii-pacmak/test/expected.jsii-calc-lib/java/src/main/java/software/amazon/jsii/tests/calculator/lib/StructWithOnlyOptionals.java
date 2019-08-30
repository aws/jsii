package software.amazon.jsii.tests.calculator.lib;

/**
 * This is a struct with only optional properties.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@Deprecated
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
public interface StructWithOnlyOptionals extends software.amazon.jsii.JsiiSerializable {

    /**
     * The first optional!
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    java.lang.String getOptional1();

    /**
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    java.lang.Number getOptional2();

    /**
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    java.lang.Boolean getOptional3();

    /**
     * @return a {@link Builder} of {@link StructWithOnlyOptionals}
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link StructWithOnlyOptionals}
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public static final class Builder {
        private java.lang.String optional1;
        private java.lang.Number optional2;
        private java.lang.Boolean optional3;

        /**
         * Sets the value of Optional1
         * @param optional1 The first optional!
         * @return {@code this}
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public Builder optional1(java.lang.String optional1) {
            this.optional1 = optional1;
            return this;
        }

        /**
         * Sets the value of Optional2
         * @param optional2 the value to be set
         * @return {@code this}
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public Builder optional2(java.lang.Number optional2) {
            this.optional2 = optional2;
            return this;
        }

        /**
         * Sets the value of Optional3
         * @param optional3 the value to be set
         * @return {@code this}
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public Builder optional3(java.lang.Boolean optional3) {
            this.optional3 = optional3;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link StructWithOnlyOptionals}
         * @throws NullPointerException if any required attribute was not provided
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public StructWithOnlyOptionals build() {
            return new Jsii$Proxy(optional1, optional2, optional3);
        }
    }

    /**
     * An implementation for {@link StructWithOnlyOptionals}
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements StructWithOnlyOptionals {
        private final java.lang.String optional1;
        private final java.lang.Number optional2;
        private final java.lang.Boolean optional3;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.optional1 = this.jsiiGet("optional1", java.lang.String.class);
            this.optional2 = this.jsiiGet("optional2", java.lang.Number.class);
            this.optional3 = this.jsiiGet("optional3", java.lang.Boolean.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.lang.String optional1, java.lang.Number optional2, java.lang.Boolean optional3) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.optional1 = optional1;
            this.optional2 = optional2;
            this.optional3 = optional3;
        }

        @Override
        public java.lang.String getOptional1() {
            return this.optional1;
        }

        @Override
        public java.lang.Number getOptional2() {
            return this.optional2;
        }

        @Override
        public java.lang.Boolean getOptional3() {
            return this.optional3;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            if (this.getOptional1() != null) {
                obj.set("optional1", om.valueToTree(this.getOptional1()));
            }
            if (this.getOptional2() != null) {
                obj.set("optional2", om.valueToTree(this.getOptional2()));
            }
            if (this.getOptional3() != null) {
                obj.set("optional3", om.valueToTree(this.getOptional3()));
            }
            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            StructWithOnlyOptionals.Jsii$Proxy that = (StructWithOnlyOptionals.Jsii$Proxy) o;

            if (this.optional1 != null ? !this.optional1.equals(that.optional1) : that.optional1 != null) return false;
            if (this.optional2 != null ? !this.optional2.equals(that.optional2) : that.optional2 != null) return false;
            return this.optional3 != null ? this.optional3.equals(that.optional3) : that.optional3 == null;
        }

        @Override
        public int hashCode() {
            int result = this.optional1 != null ? this.optional1.hashCode() : 0;
            result = 31 * result + (this.optional2 != null ? this.optional2.hashCode() : 0);
            result = 31 * result + (this.optional3 != null ? this.optional3.hashCode() : 0);
            return result;
        }
    }
}
