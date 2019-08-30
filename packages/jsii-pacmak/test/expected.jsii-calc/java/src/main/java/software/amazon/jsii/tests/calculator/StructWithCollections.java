package software.amazon.jsii.tests.calculator;

/**
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface StructWithCollections extends software.amazon.jsii.JsiiSerializable {

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.util.List<java.lang.String> getArray();

    /**
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.util.Map<java.lang.String, java.lang.String> getMap();

    /**
     * @return a {@link Builder} of {@link StructWithCollections}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link StructWithCollections}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private final software.amazon.jsii.JsiiBuilderList<java.lang.String> array = new software.amazon.jsii.JsiiBuilderList<>();
        private final software.amazon.jsii.JsiiBuilderMap<java.lang.String, java.lang.String> map = new software.amazon.jsii.JsiiBuilderMap<>();

        /**
         * Sets the value of the collection property 'Array'. This method will take a copy of the supplied
         * collection or remove the existing collection from the builder if 'null' is supplied.
         * @param array the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder array(java.util.List<java.lang.String> array) {
            this.array.set(array);
            return this;
        }

        /**
         * Adds a single value to the existing list referenced by the property 'Array'.
         * @param value the value to add to the list
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder addToArray(java.lang.String value) {
            this.array.add(value);
            return this;
        }

        /**
         * Sets the value of the collection property 'Map'. This method will take a copy of the supplied
         * collection or remove the existing collection from the builder if 'null' is supplied.
         * @param map the value to be set
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder map(java.util.Map<java.lang.String, java.lang.String> map) {
            this.map.set(map);
            return this;
        }

        /**
         * Adds a single entry to the existing map referenced by the property 'Map'.
         * @param key the key of the entry to add to the map
         * @param value the value of the entry to add to the map
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder putInMap(java.lang.String key, java.lang.String value) {
            this.map.put(key, value);
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link StructWithCollections}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public StructWithCollections build() {
            return new Jsii$Proxy(array.unmodifiableCopy(), map.unmodifiableCopy());
        }
    }

    /**
     * An implementation for {@link StructWithCollections}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements StructWithCollections {
        private final java.util.List<java.lang.String> array;
        private final java.util.Map<java.lang.String, java.lang.String> map;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.array = this.jsiiGet("array", java.util.List.class);
            this.map = this.jsiiGet("map", java.util.Map.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.util.List<java.lang.String> array, java.util.Map<java.lang.String, java.lang.String> map) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.array = array;
            this.map = map;
        }

        @Override
        public java.util.List<java.lang.String> getArray() {
            return this.array;
        }

        @Override
        public java.util.Map<java.lang.String, java.lang.String> getMap() {
            return this.map;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            if (this.getArray() != null) {
                obj.set("array", om.valueToTree(this.getArray()));
            }
            if (this.getMap() != null) {
                obj.set("map", om.valueToTree(this.getMap()));
            }
            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            StructWithCollections.Jsii$Proxy that = (StructWithCollections.Jsii$Proxy) o;

            if (this.array != null ? !this.array.equals(that.array) : that.array != null) return false;
            return this.map != null ? this.map.equals(that.map) : that.map == null;
        }

        @Override
        public int hashCode() {
            int result = this.array != null ? this.array.hashCode() : 0;
            result = 31 * result + (this.map != null ? this.map.hashCode() : 0);
            return result;
        }
    }
}
