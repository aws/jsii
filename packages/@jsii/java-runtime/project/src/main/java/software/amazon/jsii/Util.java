package software.amazon.jsii;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import static java.util.stream.Collectors.toList;

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
        try (final Scanner s = new Scanner(is, "UTF-8")) {
            s.useDelimiter("\\A");
            if (s.hasNext()) {
                return s.next();
            } else {
                return "";
            }
        }
    }

    /**
     * Checks if the method name looks like a java property getter (getXxx).
     * @param method The reflected method that may be a get/setter
     * @return true if the method is a get/setter.
     */
    static boolean isJavaPropertyMethod(final Method method) {
        final String methodName = method.getName();
        if (methodName.length() <= PROPERTY_METHOD_PREFIX_LEN) {
            // Needs to have at least one character after the "get" or "set" prefix
            return false;
        }
        if (methodName.startsWith("get") && method.getParameterCount() == 0) {
            // Require something else than a lowercase letter after the "get" prefix
            return !Character.isLowerCase(methodName.charAt(3));
        }
        if (methodName.startsWith("set") && method.getParameterCount() == 1) {
            // Require something else than a lowercase letter after the "get" prefix
            return !Character.isLowerCase(methodName.charAt(3))
                // Require a matching getter
                && isMatchingGetterPresent(method.getName().replaceFirst("set", "get"),
                    method.getParameterTypes()[0],
                    method.getDeclaringClass());
        }
        return false;
    }

    private static boolean isMatchingGetterPresent(final String getterName, final Class<?> returnType, final Class<?> declaring) {
        try {
            final Method getter = declaring.getDeclaredMethod(getterName);
            return getter.getReturnType().equals(returnType);
        } catch (final NoSuchMethodException nsme) {
            return !declaring.equals(Object.class)
                    && isMatchingGetterPresent(getterName, returnType, declaring.getSuperclass());
        }
    }

    /**
     * Convert a java property method name (getXxx/setXxx) to a javascript property name (xxx).
     * @param method The reflected method (assumed to be a get/setter according to #isJavaPropertyMethod)
     * @return The javascript property name
     */
    static String javaPropertyToJSProperty(final Method method) {
        final String getterSetterMethod = method.getName();
        if (!isJavaPropertyMethod(method)) {
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


    /**
     * Extracts a resource file from the .jar and saves it into an output directory.
     * @param klass The referent class for the resource (used to determine the correct ClassLoader, etc...)
     * @param resourceName The name of the resource to be loaded.
     * @param outputDirectory The output directory (optional)
     * @return The full path of the saved resource
     * @throws IOException If there was an I/O error
     */
    static Path extractResource(final Class<?> klass, final String resourceName, final Path outputDirectory) throws IOException {
        Path directory = outputDirectory;
        if (directory == null) {
            directory = Files.createTempDirectory("jsii-java-runtime-resource");
        }

        Path target = directory.resolve(resourceName);

        // make sure directory tree is created, for the case of "@scoped/deps"
        Files.createDirectories(target.getParent());

        try (InputStream inputStream = klass.getResourceAsStream(resourceName)) {
            Files.copy(inputStream, target);
        }

        return target;
    }
}
