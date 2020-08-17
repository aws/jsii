package software.amazon.jsii;

import com.fasterxml.jackson.core.util.DefaultIndenter;
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.extension.AfterAllCallback;
import org.junit.jupiter.api.extension.AfterEachCallback;
import org.junit.jupiter.api.extension.BeforeEachCallback;
import org.junit.jupiter.api.extension.ExtensionContext;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class ComplianceSuiteHarness implements BeforeEachCallback, AfterEachCallback, AfterAllCallback {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final ObjectNode result = objectMapper.createObjectNode();
    private final Map<String, List<String>> kernelTraces = new HashMap<>();

    @Override
    public void beforeEach(final ExtensionContext extensionContext) throws Exception {
        final List<String> trace = new ArrayList<>();
        kernelTraces.put(extensionContext.getUniqueId(), trace);
        JsiiRuntime.messageInspector.set((message, type) -> {
            final String prefix = type == MessageInspector.MessageType.Request ? "<" : ">";
            try {
                trace.add(String.format("%s %s%n", prefix, objectMapper.writeValueAsString(message)));
            } catch (final IOException e) {
                throw new UncheckedIOException(e);
            }
        });

        JsiiEngine.reset();
    }

    @Override
    public void afterEach(final ExtensionContext extensionContext) {
        JsiiRuntime.messageInspector.remove();
        final ObjectNode entry = result.putObject(String.format("%s.%s",
                extensionContext.getRequiredTestClass().getSimpleName(), extensionContext.getRequiredTestMethod().getName()));
        entry.put("status", extensionContext.getExecutionException().isPresent() ? "failure" : "success");
        entry.putPOJO("kernelTrace", kernelTraces.remove(extensionContext.getUniqueId()));
    }

    @Override
    public void afterAll(final ExtensionContext extensionContext) throws IOException {
        final File file = new File("./compliance-report.json");
        try (final OutputStream os = new FileOutputStream(file)) {
            this.objectMapper.writer(new DefaultPrettyPrinter().withArrayIndenter(DefaultIndenter.SYSTEM_LINEFEED_INSTANCE)).writeValue(os, this.result);
        } catch (IOException ioe) {
            System.err.println("Failed writing test report: " + ioe.getMessage());
            throw ioe;
        }
    }
}
