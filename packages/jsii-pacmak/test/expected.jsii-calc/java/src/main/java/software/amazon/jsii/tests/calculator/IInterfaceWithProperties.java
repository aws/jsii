package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface IInterfaceWithProperties extends software.amazon.jsii.JsiiSerializable {
    java.lang.String getReadOnlyString();
    java.lang.String getReadWriteString();
    void setReadWriteString(final java.lang.String value);

    /**
     * @return a {@link Builder} of {@link IInterfaceWithProperties}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link IInterfaceWithProperties}
     */
    final class Builder {
        private java.lang.String _readOnlyString;
        private java.lang.String _readWriteString;

        /**
         * Sets the value of ReadOnlyString
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withReadOnlyString(final java.lang.String value) {
            this._readOnlyString = java.util.Objects.requireNonNull(value, "readOnlyString is required");
            return this;
        }
        /**
         * Sets the value of ReadWriteString
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withReadWriteString(final java.lang.String value) {
            this._readWriteString = java.util.Objects.requireNonNull(value, "readWriteString is required");
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link IInterfaceWithProperties}
         * @throws NullPointerException if any required attribute was not provided
         */
        public IInterfaceWithProperties build() {
            return new IInterfaceWithProperties() {
                private final java.lang.String readOnlyString = java.util.Objects.requireNonNull(_readOnlyString, "readOnlyString is required");
                private java.lang.String readWriteString = java.util.Objects.requireNonNull(_readWriteString, "readWriteString is required");

                @Override
                public java.lang.String getReadOnlyString() {
                    return this.readOnlyString;
                }

                @Override
                public java.lang.String getReadWriteString() {
                    return this.readWriteString;
                }

                @Override
                public void setReadWriteString(final java.lang.String value) {
                    this.readWriteString = java.util.Objects.requireNonNull(value, "readWriteString is required");
                }

            };
        }
    }

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.IInterfaceWithProperties {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.lang.String getReadOnlyString() {
            return this.jsiiGet("readOnlyString", java.lang.String.class);
        }

        @Override
        public java.lang.String getReadWriteString() {
            return this.jsiiGet("readWriteString", java.lang.String.class);
        }

        @Override
        public void setReadWriteString(final java.lang.String value) {
            this.jsiiSet("readWriteString", java.util.Objects.requireNonNull(value, "readWriteString is required"));
        }
    }
}
