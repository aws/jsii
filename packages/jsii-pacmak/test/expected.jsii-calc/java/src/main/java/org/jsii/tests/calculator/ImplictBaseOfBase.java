package org.jsii.tests.calculator;
public interface ImplictBaseOfBase extends org.jsii.JsiiSerializable, org.jsii.tests.calculator.base.BaseProps {
    java.time.Instant getGoo();
    void setGoo(final java.time.Instant value);

    // ==================================================================
    // Builder
    // ==================================================================

    static Builder builder() {
        return new Builder();
    }
    /**
     * A fluent step builder class for {@link ImplictBaseOfBase}.
     * The {@link Build#build()} method will be available once all required properties are fulfilled.
     */
    final class Builder {
        public BarStep withGoo(final java.time.Instant value) {
            return new FullBuilder().withGoo(value);
        }

        public interface BarStep {
            /**
             * Sets the value for {@link ImplictBaseOfBase#getBar}.
             */
            FooStep withBar(final java.lang.String value);
        }

        public interface FooStep {
            /**
             * Sets the value for {@link ImplictBaseOfBase#getFoo}.
             */
            Build withFoo(final org.jsii.tests.calculator.baseofbase.Very value);
        }

        public interface Build {
            /**
             * @return a new {@link ImplictBaseOfBase} object, initialized with the values set on this builder.
             */
            ImplictBaseOfBase build();
        }

        final class FullBuilder implements BarStep, FooStep, Build {

            private Jsii$Pojo instance = new Jsii$Pojo();

            public BarStep withGoo(final java.time.Instant value) {
                java.util.Objects.requireNonNull(value, "ImplictBaseOfBase#goo is required");
                this.instance._goo = value;
                return this;
            }
            public FooStep withBar(final java.lang.String value) {
                java.util.Objects.requireNonNull(value, "ImplictBaseOfBase#bar is required");
                this.instance._bar = value;
                return this;
            }
            public Build withFoo(final org.jsii.tests.calculator.baseofbase.Very value) {
                java.util.Objects.requireNonNull(value, "ImplictBaseOfBase#foo is required");
                this.instance._foo = value;
                return this;
            }
            public ImplictBaseOfBase build() {
                ImplictBaseOfBase result = this.instance;
                this.instance = new Jsii$Pojo();
                return result;
            }
        }
    }

    /**
     * A PoJo (plain-old-java-object) class that implements {@link ImplictBaseOfBase}.
     */
    final class Jsii$Pojo implements ImplictBaseOfBase {

        /**
         * Constructor used by builders.
         */
        protected Jsii$Pojo() { }


        protected java.time.Instant _goo;

        public java.time.Instant getGoo() {
            return this._goo;
        }
        public void setGoo(final java.time.Instant value) {
            this._goo = value;
        }

        protected java.lang.String _bar;

        public java.lang.String getBar() {
            return this._bar;
        }
        public void setBar(final java.lang.String value) {
            this._bar = value;
        }

        protected org.jsii.tests.calculator.baseofbase.Very _foo;

        public org.jsii.tests.calculator.baseofbase.Very getFoo() {
            return this._foo;
        }
        public void setFoo(final org.jsii.tests.calculator.baseofbase.Very value) {
            this._foo = value;
        }
    }

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    class Jsii$Proxy extends org.jsii.JsiiObject implements org.jsii.tests.calculator.ImplictBaseOfBase {
        protected Jsii$Proxy(final org.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }
        public java.time.Instant getGoo() {
            return this.jsiiGet("goo", java.time.Instant.class);
        }
        public void setGoo(final java.time.Instant value) {
            this.jsiiSet("goo", java.util.Objects.requireNonNull(value, "goo is required"));
        }
        public java.lang.String getBar() {
            return this.jsiiGet("bar", java.lang.String.class);
        }
        public void setBar(final java.lang.String value) {
            this.jsiiSet("bar", java.util.Objects.requireNonNull(value, "bar is required"));
        }
        public org.jsii.tests.calculator.baseofbase.Very getFoo() {
            return this.jsiiGet("foo", org.jsii.tests.calculator.baseofbase.Very.class);
        }
        public void setFoo(final org.jsii.tests.calculator.baseofbase.Very value) {
            this.jsiiSet("foo", java.util.Objects.requireNonNull(value, "foo is required"));
        }
    }
}
