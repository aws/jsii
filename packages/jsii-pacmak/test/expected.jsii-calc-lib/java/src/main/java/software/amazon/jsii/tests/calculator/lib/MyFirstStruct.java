package software.amazon.jsii.tests.calculator.lib;

/**
 * This is the first struct we have created in jsii
 */
@javax.annotation.Generated(value = "jsii-pacmak")
public interface MyFirstStruct extends software.amazon.jsii.JsiiSerializable {
    /**
     * An awesome number value
     */
    java.lang.Number getAnumber();
    /**
     * A string value
     */
    java.lang.String getAstring();
    java.util.List<java.lang.String> getFirstOptional();

    /**
     * @return a {@link Builder} of {@link MyFirstStruct}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link MyFirstStruct}
     */
    final class Builder {
        private java.lang.Number _anumber;
        private java.lang.String _astring;
        @javax.annotation.Nullable
        private java.util.List<java.lang.String> _firstOptional;

        /**
         * Sets the value of Anumber
         * @param value An awesome number value
         * @return {@code this}
         */
        public Builder withAnumber(final java.lang.Number value) {
            this._anumber = java.util.Objects.requireNonNull(value, "anumber is required");
            return this;
        }
        /**
         * Sets the value of Astring
         * @param value A string value
         * @return {@code this}
         */
        public Builder withAstring(final java.lang.String value) {
            this._astring = java.util.Objects.requireNonNull(value, "astring is required");
            return this;
        }
        /**
         * Sets the value of FirstOptional
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withFirstOptional(@javax.annotation.Nullable final java.util.List<java.lang.String> value) {
            this._firstOptional = value;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link MyFirstStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        public MyFirstStruct build() {
            return new MyFirstStruct() {
                private final java.lang.Number $anumber = java.util.Objects.requireNonNull(_anumber, "anumber is required");
                private final java.lang.String $astring = java.util.Objects.requireNonNull(_astring, "astring is required");
                @javax.annotation.Nullable
                private final java.util.List<java.lang.String> $firstOptional = _firstOptional;

                @Override
                public java.lang.Number getAnumber() {
                    return this.$anumber;
                }

                @Override
                public java.lang.String getAstring() {
                    return this.$astring;
                }

                @Override
                public java.util.List<java.lang.String> getFirstOptional() {
                    return this.$firstOptional;
                }

                public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
                    software.amazon.jsii.JsiiObjectMapper om = software.amazon.jsii.JsiiObjectMapper.instance;
                    com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
                    obj.set("anumber", om.valueToTree(this.getAnumber()));
                    obj.set("astring", om.valueToTree(this.getAstring()));
                    obj.set("firstOptional", om.valueToTree(this.getFirstOptional()));
                    return obj;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.lib.MyFirstStruct {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * An awesome number value
         */
        @Override
        public java.lang.Number getAnumber() {
            return this.jsiiGet("anumber", java.lang.Number.class);
        }

        /**
         * A string value
         */
        @Override
        public java.lang.String getAstring() {
            return this.jsiiGet("astring", java.lang.String.class);
        }

        @Override
        @javax.annotation.Nullable
        public java.util.List<java.lang.String> getFirstOptional() {
            return this.jsiiGet("firstOptional", java.util.List.class);
        }
    }
}
