package software.amazon.jsii;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * This class manages a map within a JSII generated builder. Defaults to 'null' when constructed.
 * @param <K> The type of objects to be used as a key in the map.
 * @param <V> The type of objects to be used as values in the map.
 */
public class JsiiBuilderMap<K, V> {
    private Map<K, V> map;

    /**
     * Inserts a single key and value into the map. If the map is currently null, a new one will be created.
     * @param key The key of the entry that will be added to the map.
     * @param value The value of the entry that will be added to the map.
     */
    public void put(K key, V value) {
        if (map == null) {
            map = new HashMap<>();
        }

        map.put(key, value);
    }

    /**
     * Replaces the entire map with a copy of a supplied map.
     * @param map A map to copy all the entries from into the new builder map. If the value 'null' is passed then
     *            the builder map will also be set to null.
     */
    public void set(Map<K, V> map) {
        if (map == null) {
            this.map = null;
            return;
        }

        this.map = new HashMap<>(map);
    }

    /**
     * Makes an immutable copy of the map.
     * @return An immutable copy of the builder map, or 'null' if the builder map is also null.
     */
    public Map<K, V> unmodifiableCopy() {
        if (map == null) {
            return null;
        }

        return Collections.unmodifiableMap(map);
    }
}
