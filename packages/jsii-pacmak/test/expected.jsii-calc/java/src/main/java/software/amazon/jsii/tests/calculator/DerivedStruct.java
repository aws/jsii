package software.amazon.jsii.tests.calculator;

/**
 * A struct which derives from another struct.
 * <p>
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DerivedStruct")
@software.amazon.jsii.Jsii.Proxy(DerivedStruct.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface DerivedStruct extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.lib.MyFirstStruct {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.time.Instant getAnotherRequired();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull java.lang.Boolean getBool();

    /**
     * An example of a non primitive property.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    @org.jetbrains.annotations.NotNull software.amazon.jsii.tests.calculator.DoubleTrouble getNonPrimitive();

    /**
     * This is optional.
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default @org.jetbrains.annotations.Nullable java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> getAnotherOptional() {
        return null;
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default @org.jetbrains.annotations.Nullable java.lang.Object getOptionalAny() {
        return null;
    }

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    default @org.jetbrains.annotations.Nullable java.util.List<java.lang.String> getOptionalArray() {
        return null;
    }

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
    public static final class Builder implements software.amazon.jsii.Builder<DerivedStruct> {
        private java.time.Instant anotherRequired;
        private java.lang.Boolean bool;
        private software.amazon.jsii.tests.calculator.DoubleTrouble nonPrimitive;
        private java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value> anotherOptional;
        private java.lang.Object optionalAny;
        private java.util.List<java.lang.String> optionalArray;
        private java.lang.Number anumber;
        private java.lang.String astring;
        private java.util.List<java.lang.String> firstOptional;

        /**
         * Sets the value of {@link DerivedStruct#getAnotherRequired}
         * @param anotherRequired the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder anotherRequired(java.time.Instant anotherRequired) {
            this.anotherRequired = anotherRequired;
            return this;
        }

        /**
         * Sets the value of {@link DerivedStruct#getBool}
         * @param bool the value to be set. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder bool(java.lang.Boolean bool) {
            this.bool = bool;
            return this;
        }

        /**
         * Sets the value of {@link DerivedStruct#getNonPrimitive}
         * @param nonPrimitive An example of a non primitive property. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder nonPrimitive(software.amazon.jsii.tests.calculator.DoubleTrouble nonPrimitive) {
            this.nonPrimitive = nonPrimitive;
            return this;
        }

        /**
         * Sets the value of {@link DerivedStruct#getAnotherOptional}
         * @param anotherOptional This is optional.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @SuppressWarnings("unchecked")
        public Builder anotherOptional(java.util.Map<java.lang.String, ? extends software.amazon.jsii.tests.calculator.lib.Value> anotherOptional) {
            this.anotherOptional = (java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value>)anotherOptional;
            return this;
        }

        /**
         * Sets the value of {@link DerivedStruct#getOptionalAny}
         * @param optionalAny the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder optionalAny(java.lang.Object optionalAny) {
            this.optionalAny = optionalAny;
            return this;
        }

        /**
         * Sets the value of {@link DerivedStruct#getOptionalArray}
         * @param optionalArray the value to be set.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder optionalArray(java.util.List<java.lang.String> optionalArray) {
            this.optionalArray = optionalArray;
            return this;
        }

        /**
         * Sets the value of {@link DerivedStruct#getAnumber}
         * @param anumber An awesome number value. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        public Builder anumber(java.lang.Number anumber) {
            this.anumber = anumber;
            return this;
        }

        /**
         * Sets the value of {@link DerivedStruct#getAstring}
         * @param astring A string value. This parameter is required.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Deprecated)
        @Deprecated
        public Builder astring(java.lang.String astring) {
            this.astring = astring;
            return this;
        }

        /**
         * Sets the value of {@link DerivedStruct#getFirstOptional}
         * @param firstOptional the value to be set.
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
         * @return a new instance of {@link DerivedStruct}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        @Override
        public DerivedStruct build() {
            return new Jsii$Proxy(anotherRequired, bool, nonPrimitive, anotherOptional, optionalAny, optionalArray, anumber, astring, firstOptional);
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
            super(objRef);
            this.anotherRequired = this.jsiiGet("anotherRequired", java.time.Instant.class);
            this.bool = this.jsiiGet("bool", java.lang.Boolean.class);
            this.nonPrimitive = this.jsiiGet("nonPrimitive", software.amazon.jsii.tests.calculator.DoubleTrouble.class);
            this.anotherOptional = this.jsiiGet("anotherOptional", software.amazon.jsii.NativeType.mapOf(software.amazon.jsii.NativeType.forClass(software.amazon.jsii.tests.calculator.lib.Value.class)));
            this.optionalAny = this.jsiiGet("optionalAny", java.lang.Object.class);
            this.optionalArray = this.jsiiGet("optionalArray", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class)));
            this.anumber = this.jsiiGet("anumber", java.lang.Number.class);
            this.astring = this.jsiiGet("astring", java.lang.String.class);
            this.firstOptional = this.jsiiGet("firstOptional", software.amazon.jsii.NativeType.listOf(software.amazon.jsii.NativeType.forClass(java.lang.String.class)));
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        @SuppressWarnings("unchecked")
        private Jsii$Proxy(final java.time.Instant anotherRequired, final java.lang.Boolean bool, final software.amazon.jsii.tests.calculator.DoubleTrouble nonPrimitive, final java.util.Map<java.lang.String, ? extends software.amazon.jsii.tests.calculator.lib.Value> anotherOptional, final java.lang.Object optionalAny, final java.util.List<java.lang.String> optionalArray, final java.lang.Number anumber, final java.lang.String astring, final java.util.List<java.lang.String> firstOptional) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.anotherRequired = java.util.Objects.requireNonNull(anotherRequired, "anotherRequired is required");
            this.bool = java.util.Objects.requireNonNull(bool, "bool is required");
            this.nonPrimitive = java.util.Objects.requireNonNull(nonPrimitive, "nonPrimitive is required");
            this.anotherOptional = (java.util.Map<java.lang.String, software.amazon.jsii.tests.calculator.lib.Value>)anotherOptional;
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
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            data.set("anotherRequired", om.valueToTree(this.getAnotherRequired()));
            data.set("bool", om.valueToTree(this.getBool()));
            data.set("nonPrimitive", om.valueToTree(this.getNonPrimitive()));
            if (this.getAnotherOptional() != null) {
                data.set("anotherOptional", om.valueToTree(this.getAnotherOptional()));
            }
            if (this.getOptionalAny() != null) {
                data.set("optionalAny", om.valueToTree(this.getOptionalAny()));
            }
            if (this.getOptionalArray() != null) {
                data.set("optionalArray", om.valueToTree(this.getOptionalArray()));
            }
            data.set("anumber", om.valueToTree(this.getAnumber()));
            data.set("astring", om.valueToTree(this.getAstring()));
            if (this.getFirstOptional() != null) {
                data.set("firstOptional", om.valueToTree(this.getFirstOptional()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.DerivedStruct"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

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
