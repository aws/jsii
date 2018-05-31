package org.jsii.tests.calculator;
/**
 * A struct which derives from another struct.
 */
public interface DerivedStruct extends org.jsii.JsiiSerializable, org.jsii.tests.calculator.lib.MyFirstStruct {
    /**
     * An example of a non primitive property.
     */
    org.jsii.tests.calculator.DoubleTrouble getNonPrimitive();
    /**
     * An example of a non primitive property.
     */
    void setNonPrimitive(final org.jsii.tests.calculator.DoubleTrouble value);
    java.lang.Boolean getBool();
    void setBool(final java.lang.Boolean value);
    java.time.Instant getAnotherRequired();
    void setAnotherRequired(final java.time.Instant value);
    java.util.List<java.lang.String> getOptionalArray();
    void setOptionalArray(final java.util.List<java.lang.String> value);
    /**
     * This is optional.
     */
    java.util.Map<java.lang.String, org.jsii.tests.calculator.lib.Value> getAnotherOptional();
    /**
     * This is optional.
     */
    void setAnotherOptional(final java.util.Map<java.lang.String, org.jsii.tests.calculator.lib.Value> value);

    // ==================================================================
    // Builder
    // ==================================================================

    static Builder builder() {
        return new Builder();
    }
    /**
     * A fluent step builder class for DerivedStruct.
     * The build() method will be available once all required properties are fulfilled.
     */
    class Builder {
        public BoolStep withNonPrimitive(final org.jsii.tests.calculator.DoubleTrouble value) {
            return new FullBuilder().withNonPrimitive(value);
        }

        public interface BoolStep {
            /**
             * Sets the value for DerivedStruct::Bool.
             */
            AnotherRequiredStep withBool(final java.lang.Boolean value);
        }

        public interface AnotherRequiredStep {
            /**
             * Sets the value for DerivedStruct::AnotherRequired.
             */
            AstringStep withAnotherRequired(final java.time.Instant value);
        }

        public interface AstringStep {
            /**
             * A string value
             */
            AnumberStep withAstring(final java.lang.String value);
        }

        public interface AnumberStep {
            /**
             * An awesome number value
             */
            Build withAnumber(final java.lang.Number value);
        }

        public interface Build {
            /**
             * Returns a new DerivedStruct object, initialized with the values set on this builder.
             */
            DerivedStruct build();
            /**
             * Sets the value for DerivedStruct::OptionalArray.
             */
            Build withOptionalArray(final java.util.List<java.lang.String> value);
            /**
             * This is optional.
             */
            Build withAnotherOptional(final java.util.Map<java.lang.String, org.jsii.tests.calculator.lib.Value> value);
            /**
             * Sets the value for DerivedStruct::FirstOptional.
             */
            Build withFirstOptional(final java.util.List<java.lang.String> value);
        }

        class FullBuilder implements BoolStep, AnotherRequiredStep, AstringStep, AnumberStep, Build {

            private Jsii$Pojo instance = new Jsii$Pojo();

            public BoolStep withNonPrimitive(final org.jsii.tests.calculator.DoubleTrouble value) {
                java.util.Objects.requireNonNull(value, "_nonPrimitive is required");
                this.instance._nonPrimitive = value;
                return this;
            }
            public AnotherRequiredStep withBool(final java.lang.Boolean value) {
                java.util.Objects.requireNonNull(value, "_bool is required");
                this.instance._bool = value;
                return this;
            }
            public AstringStep withAnotherRequired(final java.time.Instant value) {
                java.util.Objects.requireNonNull(value, "_anotherRequired is required");
                this.instance._anotherRequired = value;
                return this;
            }
            public Build withOptionalArray(final java.util.List<java.lang.String> value) {
                this.instance._optionalArray = value;
                return this;
            }
            public Build withAnotherOptional(final java.util.Map<java.lang.String, org.jsii.tests.calculator.lib.Value> value) {
                this.instance._anotherOptional = value;
                return this;
            }
            public AnumberStep withAstring(final java.lang.String value) {
                java.util.Objects.requireNonNull(value, "_astring is required");
                this.instance._astring = value;
                return this;
            }
            public Build withAnumber(final java.lang.Number value) {
                java.util.Objects.requireNonNull(value, "_anumber is required");
                this.instance._anumber = value;
                return this;
            }
            public Build withFirstOptional(final java.util.List<java.lang.String> value) {
                this.instance._firstOptional = value;
                return this;
            }
            public DerivedStruct build() {
                DerivedStruct result = this.instance;
                this.instance = new Jsii$Pojo();
                return result;
            }
        }
    }

    /**
     * A PoJo (plain-old-java-object) class that implements this interface.
     */
    class Jsii$Pojo implements DerivedStruct {

        /**
         * Constructor used by builders.
         */
        protected Jsii$Pojo() { }


        protected org.jsii.tests.calculator.DoubleTrouble _nonPrimitive;

        public org.jsii.tests.calculator.DoubleTrouble getNonPrimitive() {
            return this._nonPrimitive;
        }
        public void setNonPrimitive(final org.jsii.tests.calculator.DoubleTrouble value) {
            this._nonPrimitive = value;
        }

        protected java.lang.Boolean _bool;

        public java.lang.Boolean getBool() {
            return this._bool;
        }
        public void setBool(final java.lang.Boolean value) {
            this._bool = value;
        }

        protected java.time.Instant _anotherRequired;

        public java.time.Instant getAnotherRequired() {
            return this._anotherRequired;
        }
        public void setAnotherRequired(final java.time.Instant value) {
            this._anotherRequired = value;
        }

        protected java.util.List<java.lang.String> _optionalArray;

        public java.util.List<java.lang.String> getOptionalArray() {
            return this._optionalArray;
        }
        public void setOptionalArray(final java.util.List<java.lang.String> value) {
            this._optionalArray = value;
        }

        protected java.util.Map<java.lang.String, org.jsii.tests.calculator.lib.Value> _anotherOptional;

        public java.util.Map<java.lang.String, org.jsii.tests.calculator.lib.Value> getAnotherOptional() {
            return this._anotherOptional;
        }
        public void setAnotherOptional(final java.util.Map<java.lang.String, org.jsii.tests.calculator.lib.Value> value) {
            this._anotherOptional = value;
        }

        protected java.lang.String _astring;

        public java.lang.String getAstring() {
            return this._astring;
        }
        public void setAstring(final java.lang.String value) {
            this._astring = value;
        }

        protected java.lang.Number _anumber;

        public java.lang.Number getAnumber() {
            return this._anumber;
        }
        public void setAnumber(final java.lang.Number value) {
            this._anumber = value;
        }

        protected java.util.List<java.lang.String> _firstOptional;

        public java.util.List<java.lang.String> getFirstOptional() {
            return this._firstOptional;
        }
        public void setFirstOptional(final java.util.List<java.lang.String> value) {
            this._firstOptional = value;
        }
    }

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    class Jsii$Proxy extends org.jsii.JsiiObject implements org.jsii.tests.calculator.DerivedStruct {
        protected Jsii$Proxy(final org.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }
        /**
         * An example of a non primitive property.
         */
        public org.jsii.tests.calculator.DoubleTrouble getNonPrimitive() {
            return this.jsiiGet("nonPrimitive", org.jsii.tests.calculator.DoubleTrouble.class);
        }
        /**
         * An example of a non primitive property.
         */
        public void setNonPrimitive(final org.jsii.tests.calculator.DoubleTrouble value) {
            this.jsiiSet("nonPrimitive", value);
        }
        public java.lang.Boolean getBool() {
            return this.jsiiGet("bool", java.lang.Boolean.class);
        }
        public void setBool(final java.lang.Boolean value) {
            this.jsiiSet("bool", value);
        }
        public java.time.Instant getAnotherRequired() {
            return this.jsiiGet("anotherRequired", java.time.Instant.class);
        }
        public void setAnotherRequired(final java.time.Instant value) {
            this.jsiiSet("anotherRequired", value);
        }
        public java.util.List<java.lang.String> getOptionalArray() {
            return this.jsiiGet("optionalArray", java.util.List.class);
        }
        public void setOptionalArray(final java.util.List<java.lang.String> value) {
            this.jsiiSet("optionalArray", value);
        }
        /**
         * This is optional.
         */
        public java.util.Map<java.lang.String, org.jsii.tests.calculator.lib.Value> getAnotherOptional() {
            return this.jsiiGet("anotherOptional", java.util.Map.class);
        }
        /**
         * This is optional.
         */
        public void setAnotherOptional(final java.util.Map<java.lang.String, org.jsii.tests.calculator.lib.Value> value) {
            this.jsiiSet("anotherOptional", value);
        }
        /**
         * A string value
         */
        public java.lang.String getAstring() {
            return this.jsiiGet("astring", java.lang.String.class);
        }
        /**
         * A string value
         */
        public void setAstring(final java.lang.String value) {
            this.jsiiSet("astring", value);
        }
        /**
         * An awesome number value
         */
        public java.lang.Number getAnumber() {
            return this.jsiiGet("anumber", java.lang.Number.class);
        }
        /**
         * An awesome number value
         */
        public void setAnumber(final java.lang.Number value) {
            this.jsiiSet("anumber", value);
        }
        public java.util.List<java.lang.String> getFirstOptional() {
            return this.jsiiGet("firstOptional", java.util.List.class);
        }
        public void setFirstOptional(final java.util.List<java.lang.String> value) {
            this.jsiiSet("firstOptional", value);
        }
    }
}
