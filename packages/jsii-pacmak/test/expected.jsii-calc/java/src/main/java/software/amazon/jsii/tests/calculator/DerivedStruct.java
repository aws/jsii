package software.amazon.jsii.tests.calculator;

/**
 * A struct which derives from another struct.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
public interface DerivedStruct extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.lib.MyFirstStruct {
    java.time.Instant getAnotherRequired();
    java.lang.Boolean getBool();
    /**
     * An example of a non primitive property.
     */
    software.amazon.jsii.tests.calculator.DoubleTrouble getNonPrimitive();
    /**
     * This is optional.
     */
    java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> getAnotherOptional();
    java.lang.Object getOptionalAny();
    java.util.List<java.lang.String> getOptionalArray();

    /**
     * @return a {@link Builder} of {@link DerivedStruct}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link DerivedStruct}
     */
    final class Builder {
        private java.time.Instant _anotherRequired;
        private java.lang.Boolean _bool;
        private software.amazon.jsii.tests.calculator.DoubleTrouble _nonPrimitive;
        @javax.annotation.Nullable
        private java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> _anotherOptional;
        @javax.annotation.Nullable
        private java.lang.Object _optionalAny;
        @javax.annotation.Nullable
        private java.util.List<java.lang.String> _optionalArray;
        private java.lang.Number _anumber;
        private java.lang.String _astring;
        @javax.annotation.Nullable
        private java.util.List<java.lang.String> _firstOptional;

        /**
         * Sets the value of AnotherRequired
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withAnotherRequired(final java.time.Instant value) {
            this._anotherRequired = java.util.Objects.requireNonNull(value, "anotherRequired is required");
            return this;
        }
        /**
         * Sets the value of Bool
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withBool(final java.lang.Boolean value) {
            this._bool = java.util.Objects.requireNonNull(value, "bool is required");
            return this;
        }
        /**
         * Sets the value of NonPrimitive
         * @param value An example of a non primitive property.
         * @return {@code this}
         */
        public Builder withNonPrimitive(final software.amazon.jsii.tests.calculator.DoubleTrouble value) {
            this._nonPrimitive = java.util.Objects.requireNonNull(value, "nonPrimitive is required");
            return this;
        }
        /**
         * Sets the value of AnotherOptional
         * @param value This is optional.
         * @return {@code this}
         */
        public Builder withAnotherOptional(@javax.annotation.Nullable final java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> value) {
            this._anotherOptional = value;
            return this;
        }
        /**
         * Sets the value of OptionalAny
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withOptionalAny(@javax.annotation.Nullable final java.lang.Object value) {
            this._optionalAny = value;
            return this;
        }
        /**
         * Sets the value of OptionalArray
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withOptionalArray(@javax.annotation.Nullable final java.util.List<java.lang.String> value) {
            this._optionalArray = value;
            return this;
        }
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
         * @return a new instance of {@link DerivedStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        public DerivedStruct build() {
            return new DerivedStruct() {
                private final java.time.Instant $anotherRequired = java.util.Objects.requireNonNull(_anotherRequired, "anotherRequired is required");
                private final java.lang.Boolean $bool = java.util.Objects.requireNonNull(_bool, "bool is required");
                private final software.amazon.jsii.tests.calculator.DoubleTrouble $nonPrimitive = java.util.Objects.requireNonNull(_nonPrimitive, "nonPrimitive is required");
                @javax.annotation.Nullable
                private final java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> $anotherOptional = _anotherOptional;
                @javax.annotation.Nullable
                private final java.lang.Object $optionalAny = _optionalAny;
                @javax.annotation.Nullable
                private final java.util.List<java.lang.String> $optionalArray = _optionalArray;
                private final java.lang.Number $anumber = java.util.Objects.requireNonNull(_anumber, "anumber is required");
                private final java.lang.String $astring = java.util.Objects.requireNonNull(_astring, "astring is required");
                @javax.annotation.Nullable
                private final java.util.List<java.lang.String> $firstOptional = _firstOptional;

                @Override
                public java.time.Instant getAnotherRequired() {
                    return this.$anotherRequired;
                }

                @Override
                public java.lang.Boolean getBool() {
                    return this.$bool;
                }

                @Override
                public software.amazon.jsii.tests.calculator.DoubleTrouble getNonPrimitive() {
                    return this.$nonPrimitive;
                }

                @Override
                public java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> getAnotherOptional() {
                    return this.$anotherOptional;
                }

                @Override
                public java.lang.Object getOptionalAny() {
                    return this.$optionalAny;
                }

                @Override
                public java.util.List<java.lang.String> getOptionalArray() {
                    return this.$optionalArray;
                }

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
                    obj.set("anotherRequired", om.valueToTree(this.getAnotherRequired()));
                    obj.set("bool", om.valueToTree(this.getBool()));
                    obj.set("nonPrimitive", om.valueToTree(this.getNonPrimitive()));
                    obj.set("anotherOptional", om.valueToTree(this.getAnotherOptional()));
                    obj.set("optionalAny", om.valueToTree(this.getOptionalAny()));
                    obj.set("optionalArray", om.valueToTree(this.getOptionalArray()));
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
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.DerivedStruct {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.time.Instant getAnotherRequired() {
            return this.jsiiGet("anotherRequired", java.time.Instant.class);
        }

        @Override
        public java.lang.Boolean getBool() {
            return this.jsiiGet("bool", java.lang.Boolean.class);
        }

        /**
         * An example of a non primitive property.
         */
        @Override
        public software.amazon.jsii.tests.calculator.DoubleTrouble getNonPrimitive() {
            return this.jsiiGet("nonPrimitive", software.amazon.jsii.tests.calculator.DoubleTrouble.class);
        }

        /**
         * This is optional.
         */
        @Override
        @javax.annotation.Nullable
        public java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> getAnotherOptional() {
            return this.jsiiGet("anotherOptional", java.util.Map.class);
        }

        @Override
        @javax.annotation.Nullable
        public java.lang.Object getOptionalAny() {
            return this.jsiiGet("optionalAny", java.lang.Object.class);
        }

        @Override
        @javax.annotation.Nullable
        public java.util.List<java.lang.String> getOptionalArray() {
            return this.jsiiGet("optionalArray", java.util.List.class);
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
