package org.jsii;

import org.junit.Test;

public final class JsiiVersionTest {
    @Test
    public void testShortVersion() {
        JsiiVersion.assertCompatibleWith(JsiiVersion.EXPECTED_RUNTIME_VERSION);
    }

    @Test
    public void testLongVersion() {
        JsiiVersion.assertCompatibleWith(JsiiVersion.EXPECTED_RUNTIME_VERSION + "+fooba0");
    }
}
