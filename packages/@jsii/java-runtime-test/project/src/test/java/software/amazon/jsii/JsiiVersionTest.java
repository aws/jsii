package software.amazon.jsii;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static software.amazon.jsii.JsiiVersion.JSII_RUNTIME_VERSION;

public final class JsiiVersionTest {
    @Test
    public void compatibleVersions() {
        JsiiRuntime.assertVersionCompatible("0.7.0", "0.7.0");
        JsiiRuntime.assertVersionCompatible("0.7.0", "0.7.0+abcd");
        JsiiRuntime.assertVersionCompatible("0.7.0+cdfe0", "0.7.0+abcd");
        JsiiRuntime.assertVersionCompatible("0.7.0+cdfe0", "0.7.0+abcd111");
    }

    @Test
    public void incompatibleVersions_1() {
        assertThrows(JsiiException.class,
                () -> JsiiRuntime.assertVersionCompatible("0.7.0", "0.7.1"));
    }

    @Test
    public void incompatibleVersions_2() {
        assertThrows(JsiiException.class,
                () -> JsiiRuntime.assertVersionCompatible("0.7.0", "0.7"));
    }

    @Test
    public void incompatibleVersions_3() {
        assertThrows(JsiiException.class,
                () -> JsiiRuntime.assertVersionCompatible("0.7.0+abcd", "1.2.0+abcd"));
    }

    @Test
    public void versionIsDefined() {
        assertNotNull(JSII_RUNTIME_VERSION);
        assertNotEquals("", JSII_RUNTIME_VERSION);
    }
}
