package software.amazon.jsii;

import org.junit.Test;

import static software.amazon.jsii.JsiiVersion.JSII_RUNTIME_VERSION;

public final class JsiiVersionTest {
    @Test
    public void compatibleVersions() {
        JsiiRuntime.assertVersionCompatible("0.7.0", "0.7.0");
        JsiiRuntime.assertVersionCompatible("0.7.0", "0.7.0+abcd");
        JsiiRuntime.assertVersionCompatible("0.7.0+cdfe0", "0.7.0+abcd");
        JsiiRuntime.assertVersionCompatible("0.7.0+cdfe0", "0.7.0+abcd111");
    }

    @Test(expected = JsiiException.class)
    public void incompatibleVersions_1() {
        JsiiRuntime.assertVersionCompatible("0.7.0", "0.7.1");
    }

    @Test(expected = JsiiException.class)
    public void incompatibleVersions_2() {
        JsiiRuntime.assertVersionCompatible("0.7.0", "0.7");
    }

    @Test(expected = JsiiException.class)
    public void incompatibleVersions_3() {
        JsiiRuntime.assertVersionCompatible("0.7.0+abcd", "1.2.0+abcd");
    }
}
