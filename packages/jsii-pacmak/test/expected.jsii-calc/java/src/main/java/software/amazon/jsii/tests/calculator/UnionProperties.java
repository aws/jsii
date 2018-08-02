package software.amazon.jsii.tests.calculator;
public interface UnionProperties extends software.amazon.jsii.JsiiSerializable {
    java.lang.Object getFoo();
    void setFoo(final java.lang.String value);
    void setFoo(final java.lang.Number value);
    java.lang.Object getBar();

    // ==================================================================
    // Builder
    // ==================================================================

    static Builder builder() {
        return new Builder();
    }
    /**
     * A fluent step builder class for {@link UnionProperties}.
     * The {@link Build#build()} method will be available once all required properties are fulfilled.
     */
    final class Builder {
        public Build withBar(final java.lang.String value) {
            return new FullBuilder().withBar(value);
        }
        public Build withBar(final java.lang.Number value) {
            return new FullBuilder().withBar(value);
        }
        public Build withBar(final software.amazon.jsii.tests.calculator.AllTypes value) {
            return new FullBuilder().withBar(value);
        }

        public interface Build {
            /**
             * @return a new {@link UnionProperties} object, initialized with the values set on this builder.
             */
            UnionProperties build();
            /**
             * Sets the value for {@link UnionProperties#getFoo}.
             */
            Build withFoo(final java.lang.String value);
            /**
             * Sets the value for {@link UnionProperties#getFoo}.
             */
            Build withFoo(final java.lang.Number value);
        }

        final class FullBuilder implements Build {

            private Jsii$Pojo instance = new Jsii$Pojo();

            public Build withFoo(final java.lang.String value) {
                this.instance._foo = value;
                return this;
            }
            public Build withFoo(final java.lang.Number value) {
                this.instance._foo = value;
                return this;
            }
            public Build withBar(final java.lang.String value) {
                java.util.Objects.requireNonNull(value, "UnionProperties#bar is required");
                this.instance._bar = value;
                return this;
            }
            public Build withBar(final java.lang.Number value) {
                java.util.Objects.requireNonNull(value, "UnionProperties#bar is required");
                this.instance._bar = value;
                return this;
            }
            public Build withBar(final software.amazon.jsii.tests.calculator.AllTypes value) {
                java.util.Objects.requireNonNull(value, "UnionProperties#bar is required");
                this.instance._bar = value;
                return this;
            }
            public UnionProperties build() {
                UnionProperties result = this.instance;
                this.instance = new Jsii$Pojo();
                return result;
            }
        }
    }

    /**
     * A PoJo (plain-old-java-object) class that implements {@link UnionProperties}.
     */
    final class Jsii$Pojo implements UnionProperties {

        /**
         * Constructor used by builders.
         */
        protected Jsii$Pojo() { }


        protected java.lang.Object _foo;

        public java.lang.Object getFoo() {
            return this._foo;
        }
        public void setFoo(final java.lang.String value) {
            this._foo = value;
        }
        public void setFoo(final java.lang.Number value) {
            this._foo = value;
        }

        protected java.lang.Object _bar;

        public java.lang.Object getBar() {
            return this._bar;
        }
    }

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.UnionProperties {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }
        @javax.annotation.Nullable
        public java.lang.Object getFoo() {
            return this.jsiiGet("foo", java.lang.Object.class);
        }
        public void setFoo(@javax.annotation.Nullable final java.lang.String value) {
            this.jsiiSet("foo", value);
        }
        public void setFoo(@javax.annotation.Nullable final java.lang.Number value) {
            this.jsiiSet("foo", value);
        }
        public java.lang.Object getBar() {
            return this.jsiiGet("bar", java.lang.Object.class);
        }
    }
}
