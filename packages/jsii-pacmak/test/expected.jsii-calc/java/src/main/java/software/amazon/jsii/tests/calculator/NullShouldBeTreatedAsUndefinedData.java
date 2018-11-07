package software.amazon.jsii.tests.calculator;

@javax.annotation.Generated(value = "jsii-pacmak")
public interface NullShouldBeTreatedAsUndefinedData extends software.amazon.jsii.JsiiSerializable {
    java.util.List<java.lang.Object> getArrayWithThreeElementsAndUndefinedAsSecondArgument();
    void setArrayWithThreeElementsAndUndefinedAsSecondArgument(final java.util.List<java.lang.Object> value);
    java.lang.Object getThisShouldBeUndefined();
    void setThisShouldBeUndefined(final java.lang.Object value);

    /**
     * @return a {@link Builder} of {@link NullShouldBeTreatedAsUndefinedData}
     */
    static Builder builder() {
        return new Builder();
    }

    /**
     * A builder for {@link NullShouldBeTreatedAsUndefinedData}
     */
    final class Builder {
        private java.util.List<java.lang.Object> _arrayWithThreeElementsAndUndefinedAsSecondArgument;
        @javax.annotation.Nullable
        private java.lang.Object _thisShouldBeUndefined;

        /**
         * Sets the value of ArrayWithThreeElementsAndUndefinedAsSecondArgument
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withArrayWithThreeElementsAndUndefinedAsSecondArgument(final java.util.List<java.lang.Object> value) {
            this._arrayWithThreeElementsAndUndefinedAsSecondArgument = java.util.Objects.requireNonNull(value, "arrayWithThreeElementsAndUndefinedAsSecondArgument is required");
            return this;
        }
        /**
         * Sets the value of ThisShouldBeUndefined
         * @param value the value to be set
         * @return {@code this}
         */
        public Builder withThisShouldBeUndefined(@javax.annotation.Nullable final java.lang.Object value) {
            this._thisShouldBeUndefined = value;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link NullShouldBeTreatedAsUndefinedData}
         * @throws NullPointerException if any required attribute was not provided
         */
        public NullShouldBeTreatedAsUndefinedData build() {
            return new NullShouldBeTreatedAsUndefinedData() {
                private java.util.List<java.lang.Object> $arrayWithThreeElementsAndUndefinedAsSecondArgument = java.util.Objects.requireNonNull(_arrayWithThreeElementsAndUndefinedAsSecondArgument, "arrayWithThreeElementsAndUndefinedAsSecondArgument is required");
                @javax.annotation.Nullable
                private java.lang.Object $thisShouldBeUndefined = _thisShouldBeUndefined;

                @Override
                public java.util.List<java.lang.Object> getArrayWithThreeElementsAndUndefinedAsSecondArgument() {
                    return this.$arrayWithThreeElementsAndUndefinedAsSecondArgument;
                }

                @Override
                public void setArrayWithThreeElementsAndUndefinedAsSecondArgument(final java.util.List<java.lang.Object> value) {
                    this.$arrayWithThreeElementsAndUndefinedAsSecondArgument = java.util.Objects.requireNonNull(value, "arrayWithThreeElementsAndUndefinedAsSecondArgument is required");
                }

                @Override
                public java.lang.Object getThisShouldBeUndefined() {
                    return this.$thisShouldBeUndefined;
                }

                @Override
                public void setThisShouldBeUndefined(@javax.annotation.Nullable final java.lang.Object value) {
                    this.$thisShouldBeUndefined = value;
                }

            };
        }
    }

    /**
     * A proxy class which represents a concrete javascript instance of this type.
     */
    final static class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.NullShouldBeTreatedAsUndefinedData {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }

        @Override
        public java.util.List<java.lang.Object> getArrayWithThreeElementsAndUndefinedAsSecondArgument() {
            return this.jsiiGet("arrayWithThreeElementsAndUndefinedAsSecondArgument", java.util.List.class);
        }

        @Override
        public void setArrayWithThreeElementsAndUndefinedAsSecondArgument(final java.util.List<java.lang.Object> value) {
            this.jsiiSet("arrayWithThreeElementsAndUndefinedAsSecondArgument", java.util.Objects.requireNonNull(value, "arrayWithThreeElementsAndUndefinedAsSecondArgument is required"));
        }

        @Override
        @javax.annotation.Nullable
        public java.lang.Object getThisShouldBeUndefined() {
            return this.jsiiGet("thisShouldBeUndefined", java.lang.Object.class);
        }

        @Override
        public void setThisShouldBeUndefined(@javax.annotation.Nullable final java.lang.Object value) {
            this.jsiiSet("thisShouldBeUndefined", value);
        }
    }
}
