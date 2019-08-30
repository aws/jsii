package software.amazon.jsii;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * This class manages a list collection within a JSII generated builder. Defaults to 'null' when constructed.
 * @param <T> The type of elements contained in the list.
 */
public class JsiiBuilderList<T> {
    private List<T> list;

    /**
     * Adds a single element to the existing list. If the list is currently null, a new one will be created.
     * @param element The element to add to the list.
     */
    public void add(T element) {
        if (list == null) {
            list = new ArrayList<>();
        }

        list.add(element);
    }

    /**
     * Replaces the entire list with a copy of a supplied list.
     * @param list A list to copy all the elements from into the new builder list. If the value 'null' is passed then
     *            the builder list will also be set to null.
     */
    public void set(List<T> list) {
        if (list == null) {
            this.list = null;
            return;
        }

        this.list = new ArrayList<>(list);
    }

    /**
     * Makes an immutable copy of the list.
     * @return An immutable copy of the builder list, or 'null' if the builder list is also null.
     */
    public List<T> unmodifiableCopy() {
        if (list == null) {
            return null;
        }

        return Collections.unmodifiableList(list);
    }
}
