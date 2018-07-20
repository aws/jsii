package org.jsii.tests.calculator.lib;
/**
 * This is the first struct we have created in jsii
 */
public interface MyFirstStruct extends org.jsii.JsiiSerializable {
    /**
     * A string value
     */
    java.lang.String getAstring();
    /**
     * A string value
     */
    void setAstring(final java.lang.String value);
    /**
     * An awesome number value
     */
    java.lang.Number getAnumber();
    /**
     * An awesome number value
     */
    void setAnumber(final java.lang.Number value);
    java.util.List<java.lang.String> getFirstOptional();
    void setFirstOptional(final java.util.List<java.lang.String> value);

    // ==================================================================
    // Builder
    // ==================================================================

    static Builder builder() {
        return new Builder();
    }
    /**
     * A fluent step builder class for {@link MyFirstStruct}.
     * The {@link #build()} method will be available once all required properties are fulfilled.
     */
    final class Builder {
        /**
         * A string value
         */
        public AnumberStep withAstring(final java.lang.String value) {
            return new FullBuilder().withAstring(value);
        }

        public interface AnumberStep {
            /**
             * An awesome number value
             */
            Build withAnumber(final java.lang.Number value);
        }

        public interface Build {
            /**
             * @return a new {@link MyFirstStruct} object, initialized with the values set on this builder.
             */
            MyFirstStruct build();
            /**
             * Sets the value for {@link MyFirstStruct#firstOptional}.
             */
            Build withFirstOptional(final java.util.List<java.lang.String> value);
        }

        final class FullBuilder implements AnumberStep, Build {

            private Jsii$Pojo instance = new Jsii$Pojo();

            /**
             * A string value
             */
            public AnumberStep withAstring(final java.lang.String value) {
                java.util.Objects.requireNonNull(value, "MyFirstStruct#astring is required");
                this.instance._astring = value;
                return this;
            }
            /**
             * An awesome number value
             */
            public Build withAnumber(final java.lang.Number value) {
                java.util.Objects.requireNonNull(value, "MyFirstStruct#anumber is required");
                this.instance._anumber = value;
                return this;
            }
            public Build withFirstOptional(final java.util.List<java.lang.String> value) {
                this.instance._firstOptional = value;
                return this;
            }
            public MyFirstStruct build() {
                MyFirstStruct result = this.instance;
                this.instance = new Jsii$Pojo();
                return result;
            }
        }
    }

    /**
     * A PoJo (plain-old-java-object) class that implements {@link MyFirstStruct}.
     */
    final class Jsii$Pojo implements MyFirstStruct {

        /**
         * Constructor used by builders.
         */
        protected Jsii$Pojo() { }


        protected java.lang.String _astring;

        public java.lang.String getAstring() {
            return this._astring;
        }
        public void setAstring(final java.lang.String value) {
            this._astring = value;
        }

        protected java.lang.Number _anumber;

        public java.lang.Number getAnumber() {
            return this._anumber;
        }
        public void setAnumber(final java.lang.Number value) {
            this._anumber = value;
        }

        protected java.util.List<java.lang.String> _firstOptional;

        public java.util.List<java.lang.String> getFirstOptional() {
            return this._firstOptional;
        }
        public void setFirstOptional(final java.util.List<java.lang.String> value) {
            this._firstOptional = value;
        }
    }

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    class Jsii$Proxy extends org.jsii.JsiiObject implements org.jsii.tests.calculator.lib.MyFirstStruct {
        protected Jsii$Proxy(final org.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }
        /**
         * A string value
         */
        public java.lang.String getAstring() {
            return this.jsiiGet("astring", java.lang.String.class);
        }
        /**
         * A string value
         */
        public void setAstring(final java.lang.String value) {
            this.jsiiSet("astring", java.util.Objects.requireNonNull(value, "astring is required"));
        }
        /**
         * An awesome number value
         */
        public java.lang.Number getAnumber() {
            return this.jsiiGet("anumber", java.lang.Number.class);
        }
        /**
         * An awesome number value
         */
        public void setAnumber(final java.lang.Number value) {
            this.jsiiSet("anumber", java.util.Objects.requireNonNull(value, "anumber is required"));
        }
        @javax.annotation.Nullable
        public java.util.List<java.lang.String> getFirstOptional() {
            return this.jsiiGet("firstOptional", java.util.List.class);
        }
        public void setFirstOptional(@javax.annotation.Nullable final java.util.List<java.lang.String> value) {
            this.jsiiSet("firstOptional", value);
        }
    }
}
