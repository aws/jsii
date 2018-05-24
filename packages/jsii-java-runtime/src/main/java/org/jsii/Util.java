package org.jsii;

import java.io.InputStream;

/**
 * Utilities.
 */
final class Util {

    /**
     * Size of java property method prefixes ("set" or "get").
     */
    static final int PROPERTY_METHOD_PREFIX_LEN = 3;

    /**
     * Utility class.
     */
    private Util() {

    }

    /**
     * Reads a string from an input stream.
     * @param is The input stream.,
     * @return A string.
     */
    static String readString(final InputStream is) {
        java.util.Scanner s = new java.util.Scanner(is, "UTF-8").useDelimiter("\\A");
        if (s.hasNext()) {
            return s.next();
        } else {
            return "";
        }
    }

    /**
     * Checks if the method name looks like a java property getter (getXxx).
     * @param methodName The name of the method.
     * @return True if the name looks like getXxx.
     */
    static boolean isJavaPropertyMethod(final String methodName) {
        return (methodName.length() > PROPERTY_METHOD_PREFIX_LEN
                && (methodName.startsWith("get") || methodName.startsWith(("set"))));
    }

    /**
     * Convert a java property method name (getXxx/setXxx) to a javascript property name (xxx).
     * @param getterSetterMethod The java method name
     * @return The javascript property name
     */
    static String javaPropertyToJSProperty(final String getterSetterMethod) {
        if (!isJavaPropertyMethod(getterSetterMethod)) {
            throw new JsiiException("Invalid getter/setter method. Must start with get/set");
        }

        String camelCase = getterSetterMethod.substring(
                PROPERTY_METHOD_PREFIX_LEN,
                PROPERTY_METHOD_PREFIX_LEN + 1).toLowerCase();

        if (getterSetterMethod.length() > PROPERTY_METHOD_PREFIX_LEN + 1) {
            camelCase += getterSetterMethod.substring(PROPERTY_METHOD_PREFIX_LEN + 1);
        }

        return camelCase;
    }

    /**
     * Converts a javascript property name (xxx) to a Java property method (setXxx/getXxx).
     * @param prefix The prefix (get/set)
     * @param jsPropertyName The javascript property name
     * @return The java method name
     */
    static String javaScriptPropertyToJavaPropertyName(final String prefix, final String jsPropertyName) {
        if (jsPropertyName.isEmpty()) {
            throw new JsiiException("jsPropertyName must not be empty");
        }

        StringBuilder sb = new StringBuilder();
        sb.append(prefix);
        sb.append(jsPropertyName.substring(0, 1).toUpperCase());
        if (jsPropertyName.length() > 1) {
            sb.append(jsPropertyName.substring(1));
        }
        return sb.toString();
    }
}
