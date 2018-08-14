package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface UnionProperties extends software.amazon.jsii.JsiiSerializable {
    java.lang.Object getBar();
    java.lang.Object getFoo();
    void setFoo(final java.lang.String value);
    void setFoo(final java.lang.Number value);

    /**
     * @return a {@link Builder} of {@link UnionProperties}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link UnionProperties}
     */
    final class Builder {
        private java.lang.Object _bar;
        @javax.annotation.Nullable
        private java.lang.Object _foo;

        /**
         * Sets the value of Bar
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withBar(final java.lang.String value) {
            this._bar = java.util.Objects.requireNonNull(value, "bar is required");
            return this;
        }
        /**
         * Sets the value of Bar
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withBar(final java.lang.Number value) {
            this._bar = java.util.Objects.requireNonNull(value, "bar is required");
            return this;
        }
        /**
         * Sets the value of Bar
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withBar(final software.amazon.jsii.tests.calculator.AllTypes value) {
            this._bar = java.util.Objects.requireNonNull(value, "bar is required");
            return this;
        }
        /**
         * Sets the value of Foo
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withFoo(@javax.annotation.Nullable final java.lang.String value) {
            this._foo = value;
            return this;
        }
        /**
         * Sets the value of Foo
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withFoo(@javax.annotation.Nullable final java.lang.Number value) {
            this._foo = value;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link UnionProperties}
         * @throws NullPointerException if any required attribute was not provided
         */
        public UnionProperties build() {
            return new UnionProperties() {
                private final java.lang.Object bar = java.util.Objects.requireNonNull(_bar, "bar is required");
                @javax.annotation.Nullable
                private java.lang.Object foo = _foo;

                @Override
                public java.lang.Object getBar() {
                    return this.bar;
                }

                @Override
                public java.lang.Object getFoo() {
                    return this.foo;
                }

                @Override
                public void setFoo(@javax.annotation.Nullable final java.lang.String value) {
                    this.foo = value;
                }

                @Override
                public void setFoo(@javax.annotation.Nullable final java.lang.Number value) {
                    this.foo = value;
                }

            };
        }
    }

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.UnionProperties {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.Object getBar() {
            return this.jsiiGet("bar", java.lang.Object.class);
        }

        @Override
        @javax.annotation.Nullable
        public java.lang.Object getFoo() {
            return this.jsiiGet("foo", java.lang.Object.class);
        }
        @Override
        public void setFoo(@javax.annotation.Nullable final java.lang.String value) {
            this.jsiiSet("foo", value);
        }
        @Override
        public void setFoo(@javax.annotation.Nullable final java.lang.Number value) {
            this.jsiiSet("foo", value);
        }
    }
}
