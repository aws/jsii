package software.amazon.jsii.tests.calculator.lib;

/**
 * This is the first struct we have created in jsii.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@Deprecated
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
public interface MyFirstStruct extends software.amazon.jsii.JsiiSerializable {

    /**
     * An awesome number value.
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    java.lang.Number getAnumber();

    /**
     * A string value.
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    java.lang.String getAstring();

    /**
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    java.util.List<java.lang.String> getFirstOptional();

    /**
     * @return a {@link Builder} of {@link MyFirstStruct}
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link MyFirstStruct}
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    public static final class Builder {
        private java.lang.Number anumber;
        private java.lang.String astring;
        private final software.amazon.jsii.JsiiBuilderList<java.lang.String> firstOptional = new software.amazon.jsii.JsiiBuilderList<>();

        /**
         * Sets the value of Anumber
         * @param anumber An awesome number value.
         * @return {@code this}
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public Builder anumber(java.lang.Number anumber) {
            this.anumber = anumber;
            return this;
        }

        /**
         * Sets the value of Astring
         * @param astring A string value.
         * @return {@code this}
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public Builder astring(java.lang.String astring) {
            this.astring = astring;
            return this;
        }

        /**
         * Sets the value of the collection property 'FirstOptional'. This method will take a copy of the supplied
         * collection or remove the existing collection from the builder if 'null' is supplied.
         * @param firstOptional the value to be set
         * @return {@code this}
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public Builder firstOptional(java.util.List<java.lang.String> firstOptional) {
            this.firstOptional.set(firstOptional);
            return this;
        }

        /**
         * Adds a single value to the existing list referenced by the property 'FirstOptional'.
         * @param value the value to add to the list
         * @return {@code this}
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public Builder addToFirstOptional(java.lang.String value) {
            this.firstOptional.add(value);
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link MyFirstStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @Deprecated
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        public MyFirstStruct build() {
            return new Jsii$Proxy(anumber, astring, firstOptional.unmodifiableCopy());
        }
    }

    /**
     * An implementation for {@link MyFirstStruct}
     */
    @Deprecated
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements MyFirstStruct {
        private final java.lang.Number anumber;
        private final java.lang.String astring;
        private final java.util.List<java.lang.String> firstOptional;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.anumber = this.jsiiGet("anumber", java.lang.Number.class);
            this.astring = this.jsiiGet("astring", java.lang.String.class);
            this.firstOptional = this.jsiiGet("firstOptional", java.util.List.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.lang.Number anumber, java.lang.String astring, java.util.List<java.lang.String> firstOptional) {
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
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("anumber", om.valueToTree(this.getAnumber()));
            obj.set("astring", om.valueToTree(this.getAstring()));
            if (this.getFirstOptional() != null) {
                obj.set("firstOptional", om.valueToTree(this.getFirstOptional()));
            }
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
