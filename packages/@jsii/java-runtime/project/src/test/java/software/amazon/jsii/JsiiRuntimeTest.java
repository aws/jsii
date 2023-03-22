package software.amazon.jsii;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;

public final class JsiiRuntimeTest {
    @Test
    public void withNoCustomization() {
        final JsiiRuntime runtime = new JsiiRuntime(null, null);
        runtime.getClient().createObject("Object", Collections.emptyList(), Collections.emptyList(), Collections.emptyList());
        runtime.terminate();
    }

    @Test
    public void withCustomNode_Simple() {
        final String customNode = resolveNodeFromPath();

        final JsiiRuntime runtime = new JsiiRuntime(null, customNode);
        runtime.getClient().createObject("Object", Collections.emptyList(), Collections.emptyList(), Collections.emptyList());
        runtime.terminate();
    }

    @Test
    public void withCustomNode_WithSpace() {
        final JsiiRuntime runtime = new JsiiRuntime(null, "node --max_old_space_size=1024");
        runtime.getClient().createObject("Object", Collections.emptyList(), Collections.emptyList(), Collections.emptyList());
        runtime.terminate();
    }

    @Test
    public void withCustomRuntime_Simple() throws Exception {
        final Path launcher = Files.createTempFile("jsii-runtime", ".launcher.bat");
        try (final Writer writer = new FileWriter(launcher.toFile())) {
            writer.write("node ./src/main/resources/software/amazon/jsii/bin/jsii-runtime.js\n");
        }
        Assertions.assertTrue(launcher.toFile().setExecutable(true));

        final JsiiRuntime runtime = new JsiiRuntime(launcher.toString(), null);
        runtime.getClient().createObject("Object", Collections.emptyList(), Collections.emptyList(), Collections.emptyList());
        runtime.terminate();
    }

    @Test
    public void withCustomRuntime_WithSpace() {
        final JsiiRuntime runtime = new JsiiRuntime("node ./src/main/resources/software/amazon/jsii/bin/jsii-runtime.js", null);
        runtime.getClient().createObject("Object", Collections.emptyList(), Collections.emptyList(), Collections.emptyList());
        runtime.terminate();
    }

    private static String resolveNodeFromPath() {
        try {
            final String[] command = System.getProperty("os.name").startsWith("Windows")
                    ? new String[]{"cmd.exe", "/d", "/s", "/c", "where node"}
                    : new String[]{"sh", "-c", "command -v node"};
            final Process process = Runtime.getRuntime().exec(command);
            try {
                final BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream()));
                return br.readLine();
            } finally {
                process.waitFor();
            }
        } catch (final IOException ioe) {
            throw new UncheckedIOException(ioe);
        } catch (final InterruptedException ie) {
            throw new RuntimeException(ie);
        }
    }
}
