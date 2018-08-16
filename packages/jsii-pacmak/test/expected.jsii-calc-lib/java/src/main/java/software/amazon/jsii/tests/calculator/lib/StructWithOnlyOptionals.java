package software.amazon.jsii.tests.calculator.lib;

/**
 * This is a struct with only optional properties.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
public interface StructWithOnlyOptionals extends software.amazon.jsii.JsiiSerializable {
    /**
     * The first optional!
     */
    java.lang.String getOptional1();
    /**
     * The first optional!
     */
    void setOptional1(final java.lang.String value);
    java.lang.Number getOptional2();
    void setOptional2(final java.lang.Number value);
    java.lang.Boolean getOptional3();
    void setOptional3(final java.lang.Boolean value);

    /**
     * @return a {@link Builder} of {@link StructWithOnlyOptionals}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link StructWithOnlyOptionals}
     */
    final class Builder {
        @javax.annotation.Nullable
        private java.lang.String _optional1;
        @javax.annotation.Nullable
        private java.lang.Number _optional2;
        @javax.annotation.Nullable
        private java.lang.Boolean _optional3;

        /**
         * Sets the value of Optional1
         * @param value The first optional!
         * @return {@code this}
         */
        public Builder withOptional1(@javax.annotation.Nullable final java.lang.String value) {
            this._optional1 = value;
            return this;
        }
        /**
         * Sets the value of Optional2
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withOptional2(@javax.annotation.Nullable final java.lang.Number value) {
            this._optional2 = value;
            return this;
        }
        /**
         * Sets the value of Optional3
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withOptional3(@javax.annotation.Nullable final java.lang.Boolean value) {
            this._optional3 = value;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link StructWithOnlyOptionals}
         * @throws NullPointerException if any required attribute was not provided
         */
        public StructWithOnlyOptionals build() {
            return new StructWithOnlyOptionals() {
                @javax.annotation.Nullable
                private java.lang.String optional1 = _optional1;
                @javax.annotation.Nullable
                private java.lang.Number optional2 = _optional2;
                @javax.annotation.Nullable
                private java.lang.Boolean optional3 = _optional3;

                @Override
                public java.lang.String getOptional1() {
                    return this.optional1;
                }

                @Override
                public void setOptional1(@javax.annotation.Nullable final java.lang.String value) {
                    this.optional1 = value;
                }

                @Override
                public java.lang.Number getOptional2() {
                    return this.optional2;
                }

                @Override
                public void setOptional2(@javax.annotation.Nullable final java.lang.Number value) {
                    this.optional2 = value;
                }

                @Override
                public java.lang.Boolean getOptional3() {
                    return this.optional3;
                }

                @Override
                public void setOptional3(@javax.annotation.Nullable final java.lang.Boolean value) {
                    this.optional3 = value;
                }

            };
        }
    }

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.lib.StructWithOnlyOptionals {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        /**
         * The first optional!
         */
        @Override
        @javax.annotation.Nullable
        public java.lang.String getOptional1() {
            return this.jsiiGet("optional1", java.lang.String.class);
        }

        /**
         * The first optional!
         */
        @Override
        public void setOptional1(@javax.annotation.Nullable final java.lang.String value) {
            this.jsiiSet("optional1", value);
        }

        @Override
        @javax.annotation.Nullable
        public java.lang.Number getOptional2() {
            return this.jsiiGet("optional2", java.lang.Number.class);
        }

        @Override
        public void setOptional2(@javax.annotation.Nullable final java.lang.Number value) {
            this.jsiiSet("optional2", value);
        }

        @Override
        @javax.annotation.Nullable
        public java.lang.Boolean getOptional3() {
            return this.jsiiGet("optional3", java.lang.Boolean.class);
        }

        @Override
        public void setOptional3(@javax.annotation.Nullable final java.lang.Boolean value) {
            this.jsiiSet("optional3", value);
        }
    }
}
