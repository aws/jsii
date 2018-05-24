package org.jsii.tests.calculator;
public interface IInterfaceWithPropertiesExtension extends org.jsii.JsiiSerializable, org.jsii.tests.calculator.IInterfaceWithProperties {
    java.lang.Number getFoo();
    void setFoo(final java.lang.Number value);

    // ==================================================================
    // Builder
    // ==================================================================

    static Builder builder() {
        return new Builder();
    }
    /**
     * A fluent step builder class for IInterfaceWithPropertiesExtension.
     * The build() method will be available once all required properties are fulfilled.
     */
    class Builder {
        public ReadOnlyStringStep withFoo(final java.lang.Number value) {
            return new FullBuilder().withFoo(value);
        }

        public interface ReadOnlyStringStep {
            /**
             * Sets the value for IInterfaceWithPropertiesExtension::ReadOnlyString.
             */
            ReadWriteStringStep withReadOnlyString(final java.lang.String value);
        }

        public interface ReadWriteStringStep {
            /**
             * Sets the value for IInterfaceWithPropertiesExtension::ReadWriteString.
             */
            Build withReadWriteString(final java.lang.String value);
        }

        public interface Build {
            /**
             * Returns a new IInterfaceWithPropertiesExtension object, initialized with the values set on this builder.
             */
            IInterfaceWithPropertiesExtension build();
        }

        class FullBuilder implements ReadOnlyStringStep, ReadWriteStringStep, Build {

            private Jsii$Pojo instance = new Jsii$Pojo();

            public ReadOnlyStringStep withFoo(final java.lang.Number value) {
                java.util.Objects.requireNonNull(value, "_foo is required");
                this.instance._foo = value;
                return this;
            }
            public ReadWriteStringStep withReadOnlyString(final java.lang.String value) {
                java.util.Objects.requireNonNull(value, "_readOnlyString is required");
                this.instance._readOnlyString = value;
                return this;
            }
            public Build withReadWriteString(final java.lang.String value) {
                java.util.Objects.requireNonNull(value, "_readWriteString is required");
                this.instance._readWriteString = value;
                return this;
            }
            public IInterfaceWithPropertiesExtension build() {
                IInterfaceWithPropertiesExtension result = this.instance;
                this.instance = new Jsii$Pojo();
                return result;
            }
        }
    }

    /**
     * A PoJo (plain-old-java-object) class that implements this interface.
     */
    class Jsii$Pojo implements IInterfaceWithPropertiesExtension {

        /**
         * Constructor used by builders.
         */
        protected Jsii$Pojo() { }


        protected java.lang.Number _foo;

        public java.lang.Number getFoo() {
            return this._foo;
        }
        public void setFoo(final java.lang.Number value) {
            this._foo = value;
        }

        protected java.lang.String _readOnlyString;

        public java.lang.String getReadOnlyString() {
            return this._readOnlyString;
        }

        protected java.lang.String _readWriteString;

        public java.lang.String getReadWriteString() {
            return this._readWriteString;
        }
        public void setReadWriteString(final java.lang.String value) {
            this._readWriteString = value;
        }
    }

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    class Jsii$Proxy extends org.jsii.JsiiObject implements org.jsii.tests.calculator.IInterfaceWithPropertiesExtension {
        protected Jsii$Proxy(final org.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }
        public java.lang.Number getFoo() {
            return this.jsiiGet("foo", java.lang.Number.class);
        }
        public void setFoo(final java.lang.Number value) {
            this.jsiiSet("foo", value);
        }
        public java.lang.String getReadOnlyString() {
            return this.jsiiGet("readOnlyString", java.lang.String.class);
        }
        public java.lang.String getReadWriteString() {
            return this.jsiiGet("readWriteString", java.lang.String.class);
        }
        public void setReadWriteString(final java.lang.String value) {
            this.jsiiSet("readWriteString", value);
        }
    }
}
