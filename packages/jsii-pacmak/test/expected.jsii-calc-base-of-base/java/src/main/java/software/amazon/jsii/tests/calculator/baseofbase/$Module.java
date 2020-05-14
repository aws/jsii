package software.amazon.jsii.tests.calculator.baseofbase;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.Reader;
import java.io.UncheckedIOException;

import java.nio.charset.StandardCharsets;

import java.util.HashMap;
import java.util.Map;

import software.amazon.jsii.JsiiModule;

public final class $Module extends JsiiModule {
    private static final Map<String, String> MODULE_TYPES = load();

    private static Map<String, String> load() {
        final Map<String, String> result = new HashMap<>();
        final ClassLoader cl = $Module.class.getClassLoader();
        try (final InputStream is = cl.getResourceAsStream("software/amazon/jsii/tests/calculator/baseofbase/$Module.txt");
             final Reader rd = new InputStreamReader(is, StandardCharsets.UTF_8);
             final BufferedReader br = new BufferedReader(rd)) {
            br.lines()
              .filter(line -> !line.trim().isEmpty())
              .forEach(line ->  {
                final String[] parts = line.split("=", 2);
                final String fqn = parts[0];
                final String className = parts[1];
                result.put(fqn, className);
            });
        }
        catch (final IOException exception) {
            throw new UncheckedIOException(exception);
        }
        return result;
    }

    private final Map<String, Class<?>> cache = new HashMap<>();

    public $Module() {
        super("@scope/jsii-calc-base-of-base", "0.0.0", $Module.class, "jsii-calc-base-of-base@0.0.0.jsii.tgz");
    }

    @Override
    protected Class<?> resolveClass(final String fqn) throws ClassNotFoundException {
        if (!MODULE_TYPES.containsKey(fqn)) {
            throw new ClassNotFoundException("Unknown JSII type: " + fqn);
        }
        return this.cache.computeIfAbsent(MODULE_TYPES.get(fqn), this::findClass);
    }

    private Class<?> findClass(final String binaryName) {
        try {
            return Class.forName(binaryName);
        }
        catch (final ClassNotFoundException exception) {
            throw new RuntimeException(exception);
        }
    }
}
