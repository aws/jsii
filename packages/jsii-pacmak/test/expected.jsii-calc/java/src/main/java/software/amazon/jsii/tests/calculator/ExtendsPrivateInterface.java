package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface ExtendsPrivateInterface extends software.amazon.jsii.JsiiSerializable {
    java.util.List<java.lang.String> getMoreThings();
    void setMoreThings(final java.util.List<java.lang.String> value);

    /**
     * @return a {@link Builder} of {@link ExtendsPrivateInterface}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link ExtendsPrivateInterface}
     */
    final class Builder {
        private java.util.List<java.lang.String> _moreThings;

        /**
         * Sets the value of MoreThings
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withMoreThings(final java.util.List<java.lang.String> value) {
            this._moreThings = java.util.Objects.requireNonNull(value, "moreThings is required");
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link ExtendsPrivateInterface}
         * @throws NullPointerException if any required attribute was not provided
         */
        public ExtendsPrivateInterface build() {
            return new ExtendsPrivateInterface() {
                private java.util.List<java.lang.String> $moreThings = java.util.Objects.requireNonNull(_moreThings, "moreThings is required");

                @Override
                public java.util.List<java.lang.String> getMoreThings() {
                    return this.$moreThings;
                }

                @Override
                public void setMoreThings(final java.util.List<java.lang.String> value) {
                    this.$moreThings = java.util.Objects.requireNonNull(value, "moreThings is required");
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.ExtendsPrivateInterface {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.util.List<java.lang.String> getMoreThings() {
            return this.jsiiGet("moreThings", java.util.List.class);
        }

        @Override
        public void setMoreThings(final java.util.List<java.lang.String> value) {
            this.jsiiSet("moreThings", java.util.Objects.requireNonNull(value, "moreThings is required"));
        }
    }
}
