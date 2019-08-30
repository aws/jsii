package software.amazon.jsii.tests.calculator;

/**
 * A struct which derives from another struct.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface DerivedStruct extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.lib.MyFirstStruct {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.time.Instant getAnotherRequired();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Boolean getBool();

    /**
     * An example of a non primitive property.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    software.amazon.jsii.tests.calculator.DoubleTrouble getNonPrimitive();

    /**
     * This is optional.
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> getAnotherOptional();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Object getOptionalAny();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.util.List<java.lang.String> getOptionalArray();

    /**
     * @return a {@link Builder} of {@link DerivedStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link DerivedStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.time.Instant anotherRequired;
        private java.lang.Boolean bool;
        private software.amazon.jsii.tests.calculator.DoubleTrouble nonPrimitive;
        private final software.amazon.jsii.JsiiBuilderMap<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> anotherOptional = new software.amazon.jsii.JsiiBuilderMap<>();
        private java.lang.Object optionalAny;
        private final software.amazon.jsii.JsiiBuilderList<java.lang.String> optionalArray = new software.amazon.jsii.JsiiBuilderList<>();
        private java.lang.Number anumber;
        private java.lang.String astring;
        private final software.amazon.jsii.JsiiBuilderList<java.lang.String> firstOptional = new software.amazon.jsii.JsiiBuilderList<>();

        /**
         * Sets the value of AnotherRequired
         * @param anotherRequired the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder anotherRequired(java.time.Instant anotherRequired) {
            this.anotherRequired = anotherRequired;
            return this;
        }

        /**
         * Sets the value of Bool
         * @param bool the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder bool(java.lang.Boolean bool) {
            this.bool = bool;
            return this;
        }

        /**
         * Sets the value of NonPrimitive
         * @param nonPrimitive An example of a non primitive property.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder nonPrimitive(software.amazon.jsii.tests.calculator.DoubleTrouble nonPrimitive) {
            this.nonPrimitive = nonPrimitive;
            return this;
        }

        /**
         * Sets the value of the collection property 'AnotherOptional'. This method will take a copy of the supplied
         * collection or remove the existing collection from the builder if 'null' is supplied.
         * @param anotherOptional This is optional.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder anotherOptional(java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> anotherOptional) {
            this.anotherOptional.set(anotherOptional);
            return this;
        }

        /**
         * Adds a single entry to the existing map referenced by the property 'AnotherOptional'.
         * @param key the key of the entry to add to the map
         * @param value the value of the entry to add to the map
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder putInAnotherOptional(java.lang.String key, software.amazon.jsii.tests.calculator.lib.Value value) {
            this.anotherOptional.put(key, value);
            return this;
        }

        /**
         * Sets the value of OptionalAny
         * @param optionalAny the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder optionalAny(java.lang.Object optionalAny) {
            this.optionalAny = optionalAny;
            return this;
        }

        /**
         * Sets the value of the collection property 'OptionalArray'. This method will take a copy of the supplied
         * collection or remove the existing collection from the builder if 'null' is supplied.
         * @param optionalArray the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder optionalArray(java.util.List<java.lang.String> optionalArray) {
            this.optionalArray.set(optionalArray);
            return this;
        }

        /**
         * Adds a single value to the existing list referenced by the property 'OptionalArray'.
         * @param value the value to add to the list
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder addToOptionalArray(java.lang.String value) {
            this.optionalArray.add(value);
            return this;
        }

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
         * @return a new instance of {@link DerivedStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public DerivedStruct build() {
            return new Jsii$Proxy(anotherRequired, bool, nonPrimitive, anotherOptional.unmodifiableCopy(), optionalAny, optionalArray.unmodifiableCopy(), anumber, astring, firstOptional.unmodifiableCopy());
        }
    }

    /**
     * An implementation for {@link DerivedStruct}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements DerivedStruct {
        private final java.time.Instant anotherRequired;
        private final java.lang.Boolean bool;
        private final software.amazon.jsii.tests.calculator.DoubleTrouble nonPrimitive;
        private final java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> anotherOptional;
        private final java.lang.Object optionalAny;
        private final java.util.List<java.lang.String> optionalArray;
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
            this.anotherRequired = this.jsiiGet("anotherRequired", java.time.Instant.class);
            this.bool = this.jsiiGet("bool", java.lang.Boolean.class);
            this.nonPrimitive = this.jsiiGet("nonPrimitive", software.amazon.jsii.tests.calculator.DoubleTrouble.class);
            this.anotherOptional = this.jsiiGet("anotherOptional", java.util.Map.class);
            this.optionalAny = this.jsiiGet("optionalAny", java.lang.Object.class);
            this.optionalArray = this.jsiiGet("optionalArray", java.util.List.class);
            this.anumber = this.jsiiGet("anumber", java.lang.Number.class);
            this.astring = this.jsiiGet("astring", java.lang.String.class);
            this.firstOptional = this.jsiiGet("firstOptional", java.util.List.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.time.Instant anotherRequired, java.lang.Boolean bool, software.amazon.jsii.tests.calculator.DoubleTrouble nonPrimitive, java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> anotherOptional, java.lang.Object optionalAny, java.util.List<java.lang.String> optionalArray, java.lang.Number anumber, java.lang.String astring, java.util.List<java.lang.String> firstOptional) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.anotherRequired = java.util.Objects.requireNonNull(anotherRequired, "anotherRequired is required");
            this.bool = java.util.Objects.requireNonNull(bool, "bool is required");
            this.nonPrimitive = java.util.Objects.requireNonNull(nonPrimitive, "nonPrimitive is required");
            this.anotherOptional = anotherOptional;
            this.optionalAny = optionalAny;
            this.optionalArray = optionalArray;
            this.anumber = java.util.Objects.requireNonNull(anumber, "anumber is required");
            this.astring = java.util.Objects.requireNonNull(astring, "astring is required");
            this.firstOptional = firstOptional;
        }

        @Override
        public java.time.Instant getAnotherRequired() {
            return this.anotherRequired;
        }

        @Override
        public java.lang.Boolean getBool() {
            return this.bool;
        }

        @Override
        public software.amazon.jsii.tests.calculator.DoubleTrouble getNonPrimitive() {
            return this.nonPrimitive;
        }

        @Override
        public java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> getAnotherOptional() {
            return this.anotherOptional;
        }

        @Override
        public java.lang.Object getOptionalAny() {
            return this.optionalAny;
        }

        @Override
        public java.util.List<java.lang.String> getOptionalArray() {
            return this.optionalArray;
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
            obj.set("anotherRequired", om.valueToTree(this.getAnotherRequired()));
            obj.set("bool", om.valueToTree(this.getBool()));
            obj.set("nonPrimitive", om.valueToTree(this.getNonPrimitive()));
            if (this.getAnotherOptional() != null) {
                obj.set("anotherOptional", om.valueToTree(this.getAnotherOptional()));
            }
            if (this.getOptionalAny() != null) {
                obj.set("optionalAny", om.valueToTree(this.getOptionalAny()));
            }
            if (this.getOptionalArray() != null) {
                obj.set("optionalArray", om.valueToTree(this.getOptionalArray()));
            }
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

            DerivedStruct.Jsii$Proxy that = (DerivedStruct.Jsii$Proxy) o;

            if (!anotherRequired.equals(that.anotherRequired)) return false;
            if (!bool.equals(that.bool)) return false;
            if (!nonPrimitive.equals(that.nonPrimitive)) return false;
            if (this.anotherOptional != null ? !this.anotherOptional.equals(that.anotherOptional) : that.anotherOptional != null) return false;
            if (this.optionalAny != null ? !this.optionalAny.equals(that.optionalAny) : that.optionalAny != null) return false;
            if (this.optionalArray != null ? !this.optionalArray.equals(that.optionalArray) : that.optionalArray != null) return false;
            if (!anumber.equals(that.anumber)) return false;
            if (!astring.equals(that.astring)) return false;
            return this.firstOptional != null ? this.firstOptional.equals(that.firstOptional) : that.firstOptional == null;
        }

        @Override
        public int hashCode() {
            int result = this.anotherRequired.hashCode();
            result = 31 * result + (this.bool.hashCode());
            result = 31 * result + (this.nonPrimitive.hashCode());
            result = 31 * result + (this.anotherOptional != null ? this.anotherOptional.hashCode() : 0);
            result = 31 * result + (this.optionalAny != null ? this.optionalAny.hashCode() : 0);
            result = 31 * result + (this.optionalArray != null ? this.optionalArray.hashCode() : 0);
            result = 31 * result + (this.anumber.hashCode());
            result = 31 * result + (this.astring.hashCode());
            result = 31 * result + (this.firstOptional != null ? this.firstOptional.hashCode() : 0);
            return result;
        }
    }
}
