package software.amazon.jsii.tests.calculator.base;
public interface BaseProps extends software.amazon.jsii.JsiiSerializable, software.amazon.jsii.tests.calculator.baseofbase.VeryBaseProps {
    java.lang.String getBar();
    void setBar(final java.lang.String value);

    // ==================================================================
    // Builder
    // ==================================================================

    static Builder builder() {
        return new Builder();
    }
    /**
     * A fluent step builder class for {@link BaseProps}.
     * The {@link Build#build()} method will be available once all required properties are fulfilled.
     */
    final class Builder {
        public FooStep withBar(final java.lang.String value) {
            return new FullBuilder().withBar(value);
        }

        public interface FooStep {
            /**
             * Sets the value for {@link BaseProps#getFoo}.
             */
            Build withFoo(final software.amazon.jsii.tests.calculator.baseofbase.Very value);
        }

        public interface Build {
            /**
             * @return a new {@link BaseProps} object, initialized with the values set on this builder.
             */
            BaseProps build();
        }

        final class FullBuilder implements FooStep, Build {

            private Jsii$Pojo instance = new Jsii$Pojo();

            public FooStep withBar(final java.lang.String value) {
                java.util.Objects.requireNonNull(value, "BaseProps#bar is required");
                this.instance._bar = value;
                return this;
            }
            public Build withFoo(final software.amazon.jsii.tests.calculator.baseofbase.Very value) {
                java.util.Objects.requireNonNull(value, "BaseProps#foo is required");
                this.instance._foo = value;
                return this;
            }
            public BaseProps build() {
                BaseProps result = this.instance;
                this.instance = new Jsii$Pojo();
                return result;
            }
        }
    }

    /**
     * A PoJo (plain-old-java-object) class that implements {@link BaseProps}.
     */
    final class Jsii$Pojo implements BaseProps {

        /**
         * Constructor used by builders.
         */
        protected Jsii$Pojo() { }


        protected java.lang.String _bar;

        public java.lang.String getBar() {
            return this._bar;
        }
        public void setBar(final java.lang.String value) {
            this._bar = value;
        }

        protected software.amazon.jsii.tests.calculator.baseofbase.Very _foo;

        public software.amazon.jsii.tests.calculator.baseofbase.Very getFoo() {
            return this._foo;
        }
        public void setFoo(final software.amazon.jsii.tests.calculator.baseofbase.Very value) {
            this._foo = value;
        }
    }

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements software.amazon.jsii.tests.calculator.base.BaseProps {
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }
        public java.lang.String getBar() {
            return this.jsiiGet("bar", java.lang.String.class);
        }
        public void setBar(final java.lang.String value) {
            this.jsiiSet("bar", java.util.Objects.requireNonNull(value, "bar is required"));
        }
        public software.amazon.jsii.tests.calculator.baseofbase.Very getFoo() {
            return this.jsiiGet("foo", software.amazon.jsii.tests.calculator.baseofbase.Very.class);
        }
        public void setFoo(final software.amazon.jsii.tests.calculator.baseofbase.Very value) {
            this.jsiiSet("foo", java.util.Objects.requireNonNull(value, "foo is required"));
        }
    }
}
