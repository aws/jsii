package software.amazon.jsii;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;

/**
 * Captures the current Java stack trace for transmission to the jsii kernel.
 *
 * When enabled via the {@code JSII_HOST_STACK_TRACES} environment variable,
 * the runtime captures a stack trace at each request and attaches it to the
 * wire protocol so that downstream consumers (e.g., CDK) can report stack
 * traces in the user's language.
 */
@Internal
final class HostStackTrace {
    private static final String JSII_PACKAGE_PREFIX = "software.amazon.jsii.";

    private HostStackTrace() {}

    /**
     * Checks whether host stack trace capture is enabled via the environment.
     */
    static boolean isEnabled() {
        String envValue = System.getenv("JSII_HOST_STACK_TRACES");
        return envValue != null && (
            envValue.equals("1") || envValue.equalsIgnoreCase("true") || envValue.equalsIgnoreCase("yes")
        );
    }

    /**
     * Captures the current stack trace, filtered to user frames only.
     *
     * @return A JSON array of frames (each a [file, line, column, function] tuple).
     *         May be empty if no user frames remain after filtering.
     */
    static ArrayNode captureFrames() {
        final StackTraceElement[] elements = new Throwable().getStackTrace();
        final JsonNodeFactory json = JsonNodeFactory.instance;
        final ArrayNode frames = json.arrayNode();

        for (final StackTraceElement element : elements) {
            final String className = element.getClassName();
            if (className.startsWith(JSII_PACKAGE_PREFIX)) {
                continue;
            }

            final String fileName = element.getFileName();
            final int lineNumber = element.getLineNumber();
            if (fileName == null || lineNumber <= 0) {
                continue;
            }

            final ArrayNode frame = json.arrayNode();
            frame.add(fileName);
            frame.add(lineNumber);
            frame.add(0);
            frame.add(className + "." + element.getMethodName());
            frames.add(frame);
        }

        return frames;
    }
}
