package software.amazon.jsii.tests.calculator.submodule.back_references;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.submodule.back_references.MyClassReference")
@software.amazon.jsii.Jsii.Proxy(MyClassReference.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface MyClassReference extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.submodule.MyClass getReference();

    /**
     * @return a {@link Builder} of {@link MyClassReference}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link MyClassReference}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private software.amazon.jsii.tests.calculator.submodule.MyClass reference;

        /**
         * Sets the value of {@link MyClassReference#getReference}
         * @param reference the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder reference(software.amazon.jsii.tests.calculator.submodule.MyClass reference) {
            this.reference = reference;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link MyClassReference}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public MyClassReference build() {
            return new Jsii$Proxy(reference);
        }
    }

    /**
     * An implementation for {@link MyClassReference}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements MyClassReference {
        private final software.amazon.jsii.tests.calculator.submodule.MyClass reference;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.reference = this.jsiiGet("reference", software.amazon.jsii.tests.calculator.submodule.MyClass.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final software.amazon.jsii.tests.calculator.submodule.MyClass reference) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.reference = java.util.Objects.requireNonNull(reference, "reference is required");
        }

        @Override
        public software.amazon.jsii.tests.calculator.submodule.MyClass getReference() {
            return this.reference;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("reference", om.valueToTree(this.getReference()));

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.submodule.back_references.MyClassReference"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            MyClassReference.Jsii$Proxy that = (MyClassReference.Jsii$Proxy) o;

            return this.reference.equals(that.reference);
        }

        @Override
        public int hashCode() {
            int result = this.reference.hashCode();
            return result;
        }
    }
}
