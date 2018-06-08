package org.jsii;

import org.junit.Test;

public final class JsiiVersionTest {
    @Test
    public void testShortVersion() {
        JsiiVersion.assertCompatibleWith("jsii-runtime@0.4.0-pre");
    }

    @Test
    public void testLongVersion() {
        JsiiVersion.assertCompatibleWith("jsii-runtime@0.4.0-pre+fooba0");
    }
}
