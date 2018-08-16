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
     * An awesome number value
     */
    void setAnumber(final java.lang.Number value);
    /**
     * A string value
     */
    java.lang.String getAstring();
    /**
     * A string value
     */
    void setAstring(final java.lang.String value);
    java.util.List<java.lang.String> getFirstOptional();
    void setFirstOptional(final java.util.List<java.lang.String> value);

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
                private java.lang.Number anumber = java.util.Objects.requireNonNull(_anumber, "anumber is required");
                private java.lang.String astring = java.util.Objects.requireNonNull(_astring, "astring is required");
                @javax.annotation.Nullable
                private java.util.List<java.lang.String> firstOptional = _firstOptional;

                @Override
                public java.lang.Number getAnumber() {
                    return this.anumber;
                }

                @Override
                public void setAnumber(final java.lang.Number value) {
                    this.anumber = java.util.Objects.requireNonNull(value, "anumber is required");
                }

                @Override
                public java.lang.String getAstring() {
                    return this.astring;
                }

                @Override
                public void setAstring(final java.lang.String value) {
                    this.astring = java.util.Objects.requireNonNull(value, "astring is required");
                }

                @Override
                public java.util.List<java.lang.String> getFirstOptional() {
                    return this.firstOptional;
                }

                @Override
                public void setFirstOptional(@javax.annotation.Nullable final java.util.List<java.lang.String> value) {
                    this.firstOptional = value;
                }

            };
        }
    }

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.lib.MyFirstStruct {
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
         * An awesome number value
         */
        @Override
        public void setAnumber(final java.lang.Number value) {
            this.jsiiSet("anumber", java.util.Objects.requireNonNull(value, "anumber is required"));
        }

        /**
         * A string value
         */
        @Override
        public java.lang.String getAstring() {
            return this.jsiiGet("astring", java.lang.String.class);
        }

        /**
         * A string value
         */
        @Override
        public void setAstring(final java.lang.String value) {
            this.jsiiSet("astring", java.util.Objects.requireNonNull(value, "astring is required"));
        }

        @Override
        @javax.annotation.Nullable
        public java.util.List<java.lang.String> getFirstOptional() {
            return this.jsiiGet("firstOptional", java.util.List.class);
        }

        @Override
        public void setFirstOptional(@javax.annotation.Nullable final java.util.List<java.lang.String> value) {
            this.jsiiSet("firstOptional", value);
        }
    }
}
