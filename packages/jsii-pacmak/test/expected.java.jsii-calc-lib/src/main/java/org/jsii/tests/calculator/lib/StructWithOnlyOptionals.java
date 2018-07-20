package org.jsii.tests.calculator.lib;
/**
 * This is a struct with only optional properties.
 */
public interface StructWithOnlyOptionals extends org.jsii.JsiiSerializable {
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

    // ==================================================================
    // Builder
    // ==================================================================

    static Builder builder() {
        return new Builder();
    }

    /**
     * A fluent builder class for {@link StructWithOnlyOptionals}.
     */
    public static class Builder {
        private Jsii$Pojo instance = new Jsii$Pojo();

        /**
         * The first optional!
         */
        public Builder withOptional1(final java.lang.String value) {
            this.instance._optional1 = value;
            return this;
        }
        public Builder withOptional2(final java.lang.Number value) {
            this.instance._optional2 = value;
            return this;
        }
        public Builder withOptional3(final java.lang.Boolean value) {
            this.instance._optional3 = value;
            return this;
        }
        public StructWithOnlyOptionals build() {
            StructWithOnlyOptionals result = this.instance;
            this.instance = new Jsii$Pojo();
            return result;
        }
    }

    /**
     * A PoJo (plain-old-java-object) class that implements this interface.
     */
    class Jsii$Pojo implements StructWithOnlyOptionals {

        /**
         * Constructor used by builders.
         */
        protected Jsii$Pojo() { }


        protected java.lang.String _optional1;

        public java.lang.String getOptional1() {
            return this._optional1;
        }
        public void setOptional1(final java.lang.String value) {
            this._optional1 = value;
        }

        protected java.lang.Number _optional2;

        public java.lang.Number getOptional2() {
            return this._optional2;
        }
        public void setOptional2(final java.lang.Number value) {
            this._optional2 = value;
        }

        protected java.lang.Boolean _optional3;

        public java.lang.Boolean getOptional3() {
            return this._optional3;
        }
        public void setOptional3(final java.lang.Boolean value) {
            this._optional3 = value;
        }
    }

    /**
     * A proxy class which for javascript object literal which adhere to this interface.
     */
    class Jsii$Proxy extends org.jsii.JsiiObject implements org.jsii.tests.calculator.lib.StructWithOnlyOptionals {
        protected Jsii$Proxy(final org.jsii.JsiiObject.InitializationMode mode) {
            super(mode);
        }
        /**
         * The first optional!
         */
        @javax.annotations.Nullable
        public java.lang.String getOptional1() {
            return this.jsiiGet("optional1", java.lang.String.class);
        }
        /**
         * The first optional!
         */
        public void setOptional1(@javax.annotations.Nullable final java.lang.String value) {
            this.jsiiSet("optional1", value);
        }
        @javax.annotations.Nullable
        public java.lang.Number getOptional2() {
            return this.jsiiGet("optional2", java.lang.Number.class);
        }
        public void setOptional2(@javax.annotations.Nullable final java.lang.Number value) {
            this.jsiiSet("optional2", value);
        }
        @javax.annotations.Nullable
        public java.lang.Boolean getOptional3() {
            return this.jsiiGet("optional3", java.lang.Boolean.class);
        }
        public void setOptional3(@javax.annotations.Nullable final java.lang.Boolean value) {
            this.jsiiSet("optional3", value);
        }
    }
}
