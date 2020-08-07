package software.amazon.jsii.tests.calculator.lib;

/**
 * This is the first struct we have created in jsii. (deprecated)
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.lib.$Module.class, fqn = "@scope/jsii-calc-lib.MyFirstStruct")
@software.amazon.jsii.Jsii.Proxy(MyFirstStruct.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
@Deprecated
public interface MyFirstStruct extends software.amazon.jsii.JsiiSerializable {

    /**
     * An awesome number value. (deprecated)
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    @org.jetbrains.annotations.NotNull java.lang.Number getAnumber();

    /**
     * A string value. (deprecated)
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    @org.jetbrains.annotations.NotNull java.lang.String getAstring();

    /**
     *  (deprecated)
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    default @org.jetbrains.annotations.Nullable java.util.List<java.lang.String> getFirstOptional() {
        return null;
    }

    /**
     * @return a {@link Builder} of {@link MyFirstStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link MyFirstStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    public static final class Builder implements software.amazon.jsii.Builder<MyFirstStruct> {
        private java.lang.Number anumber;
        private java.lang.String astring;
        private java.util.List<java.lang.String> firstOptional;

        /**
         * Sets the value of {@link MyFirstStruct#getAnumber}
         * @param anumber An awesome number value. (deprecated). This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        public Builder anumber(java.lang.Number anumber) {
            this.anumber = anumber;
            return this;
        }

        /**
         * Sets the value of {@link MyFirstStruct#getAstring}
         * @param astring A string value. (deprecated). This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        public Builder astring(java.lang.String astring) {
            this.astring = astring;
            return this;
        }

        /**
         * Sets the value of {@link MyFirstStruct#getFirstOptional}
         * @param firstOptional  (deprecated).
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        public Builder firstOptional(java.util.List<java.lang.String> firstOptional) {
            this.firstOptional = firstOptional;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link MyFirstStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        @Override
        public MyFirstStruct build() {
            return new Jsii$Proxy(anumber, astring, firstOptional);
        }
    }

    /**
     * An implementation for {@link MyFirstStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    @Deprecated
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements MyFirstStruct {
        private final java.lang.Number anumber;
        private final java.lang.String astring;
        private final java.util.List<java.lang.String> firstOptional;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(objRef);
            this.anumber = this.jsiiGet("anumber", java.lang.Number.class);
            this.astring = this.jsiiGet("astring", java.lang.String.class);
            this.firstOptional = this.jsiiGet("firstOptional", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class)));
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.Number anumber, final java.lang.String astring, final java.util.List<java.lang.String> firstOptional) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.anumber = java.util.Objects.requireNonNull(anumber, "anumber is required");
            this.astring = java.util.Objects.requireNonNull(astring, "astring is required");
            this.firstOptional = firstOptional;
        }

        @Override
        public java.lang.Number getAnumber() {
            return this.anumber;
        }

        @Override
        public java.lang.String getAstring() {
            return this.astring;
        }

        @Override
        public java.util.List<java.lang.String> getFirstOptional() {
            return this.firstOptional;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("anumber", om.valueToTree(this.getAnumber()));
            data.set("astring", om.valueToTree(this.getAstring()));
            if (this.getFirstOptional() != null) {
                data.set("firstOptional", om.valueToTree(this.getFirstOptional()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("@scope/jsii-calc-lib.MyFirstStruct"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            MyFirstStruct.Jsii$Proxy that = (MyFirstStruct.Jsii$Proxy) o;

            if (!anumber.equals(that.anumber)) return false;
            if (!astring.equals(that.astring)) return false;
            return this.firstOptional != null ? this.firstOptional.equals(that.firstOptional) : that.firstOptional == null;
        }

        @Override
        public int hashCode() {
            int result = this.anumber.hashCode();
            result = 31 * result + (this.astring.hashCode());
            result = 31 * result + (this.firstOptional != null ? this.firstOptional.hashCode() : 0);
            return result;
        }
    }
}
