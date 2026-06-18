package software.amazon.jsii;

import com.fasterxml.jackson.databind.node.ArrayNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public final class HostStackTraceTest {

    @Test
    public void captureFramesReturnsNonEmptyResult() {
        ArrayNode result = HostStackTrace.captureFrames();
        assertNotNull(result);
        assertTrue(result.size() > 0);
    }

    @Test
    public void framesHaveCorrectStructure() {
        ArrayNode result = HostStackTrace.captureFrames();
        assertNotNull(result);
        for (int i = 0; i < result.size(); i++) {
            ArrayNode frame = (ArrayNode) result.get(i);
            assertEquals(4, frame.size(), "Frame should have 4 elements");
            assertTrue(frame.get(0).isTextual(), "file should be a string");
            assertTrue(frame.get(1).isInt(), "line should be an int");
            assertEquals(0, frame.get(2).asInt(), "column should be 0");
            assertTrue(frame.get(3).isTextual(), "function should be a string");
        }
    }

    @Test
    public void filtersJsiiInternalFrames() {
        ArrayNode result = HostStackTrace.captureFrames();
        assertNotNull(result);
        for (int i = 0; i < result.size(); i++) {
            ArrayNode frame = (ArrayNode) result.get(i);
            String function = frame.get(3).asText();
            assertFalse(function.startsWith("software.amazon.jsii."),
                "Should not contain jsii-internal frames: " + function);
        }
    }

    @Test
    public void framesContainNonJsiiCallers() {
        ArrayNode result = HostStackTrace.captureFrames();
        assertNotNull(result);
        // Frames should contain entries from outside the jsii package
        // (e.g., JUnit runner, reflection utilities)
        boolean foundExternal = false;
        for (int i = 0; i < result.size(); i++) {
            ArrayNode frame = (ArrayNode) result.get(i);
            String function = frame.get(3).asText();
            if (!function.startsWith("software.amazon.jsii.")) {
                foundExternal = true;
                break;
            }
        }
        assertTrue(foundExternal, "Should contain frames from outside jsii package");
    }

    @Test
    public void isEnabledReturnsTrue() {
        // JSII_HOST_STACK_TRACES=1 is set via maven-surefire-plugin configuration
        assertTrue(HostStackTrace.isEnabled(), "isEnabled() should return true when JSII_HOST_STACK_TRACES is set");
    }
}
