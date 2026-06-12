package software.amazon.jsii.testing;

import org.junit.jupiter.api.Test;
import software.amazon.jsii.tests.calculator.CallbackStackTraceTest;
import software.amazon.jsii.tests.calculator.HostStackTraceReader;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Integration tests for host stack trace propagation through the jsii protocol.
 * These are language-specific tests (not part of the cross-language compliance suite).
 *
 * JSII_HOST_STACK_TRACES=1 is set via maven-surefire-plugin configuration.
 */
public final class HostStackTraceIntegrationTest {

    @Test
    public void hostStackTraceIsPassedToKernel() {
        Object trace = HostStackTraceReader.capturedTrace();
        assertNotNull(trace, "Stack trace should be available when JSII_HOST_STACK_TRACES is enabled");
        assertTrue(trace instanceof List, "Stack trace should be a list of frames");
        assertFalse(((List<?>) trace).isEmpty(), "Stack trace should not be empty");
    }

    @Test
    public void hostStackTraceThroughCallback() {
        CallbackStackTraceTest obj = new CallbackStackTraceTest() {
            @Override
            protected Object callbackProvider() {
                return HostStackTraceReader.capturedTrace();
            }
        };

        obj.invokeCallback();
        Object trace = obj.getTraceFromCallback();

        assertNotNull(trace, "Trace from callback should not be null");
        assertTrue(trace instanceof List, "Trace should be a list");
        assertFalse(((List<?>) trace).isEmpty(), "Trace should not be empty");
    }
}