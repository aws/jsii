package org.jsii;

import org.junit.Test;
import org.jsii.JsiiRuntime;
import static org.jsii.JsiiVersion.JSII_RUNTIME_VERSION;

public final class JsiiVersionTest {
    @Test
    public void testShortVersion() {
        JsiiRuntime.assertVersionCompatibleWith(JSII_RUNTIME_VERSION);
    }

    @Test
    public void testLongVersion() {
        JsiiRuntime.assertVersionCompatibleWith(JSII_RUNTIME_VERSION + "+fooba0");
    }
}