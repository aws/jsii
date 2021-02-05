package software.amazon.jsii;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.jetbrains.annotations.Nullable;
import software.amazon.jsii.api.Callback;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeUnit;

import static software.amazon.jsii.JsiiVersion.JSII_RUNTIME_VERSION;

/**
 * Manages the jsii-runtime child process.
 */
@Internal
public final class JsiiRuntime {
    /**
     * Extract the "+<sha>" postfix from a full version number.
     */
    private static final String VERSION_BUILD_PART_REGEX = "\\+[a-z0-9]+$";

    /**
     *
     */
    static final ThreadLocal<MessageInspector> messageInspector = new ThreadLocal<>();

    /**
     * The HTTP client connected to this child process.
     */
    private JsiiClient client;

    /**
     * The child procesds.
     */
    private Process childProcess;

    /**
     * Child's standard output.
     */
    private BufferedReader stdout;

    /**
     * Child's standard input.
     */
    private BufferedWriter stdin;

    /**
     * Handler for synchronous callbacks. Must be set using setCallbackHandler.
     */
    private JsiiCallbackHandler callbackHandler;

    /**
     * The JVM shutdown hook registered by this instance, if any.
     */
    private Thread shutdownHook;

    /**
     * The main API of this class. Sends a JSON request to jsii-runtime and returns the JSON response.
     * @param request The JSON request
     * @return The JSON response
     * @throws JsiiException If the runtime returns an error response.
     */
    JsonNode requestResponse(final JsonNode request) {
        try {
            JsiiRuntime.notifyInspector(request, MessageInspector.MessageType.Request);

            // write request
            String str = request.toString();
            this.stdin.write(str + "\n");
            this.stdin.flush();

            // read response
            JsonNode resp = readNextResponse();

            // throw if this is an error response
            if (resp.has("error")) {
                return processErrorResponse(resp);
            }

            // process synchronous callbacks (which 'interrupt' the response flow).
            if (resp.has("callback")) {
                return processCallbackResponse(resp);
            }

            // null "ok" means undefined result (or void).
            return resp.get("ok");

        } catch (IOException e) {
            throw new JsiiException("Unable to send request to jsii-runtime: " + e.toString(), e);
        }
    }

    /**
     * Handles an "error" response by extracting the message and stack trace
     * and throwing a JsiiException.
     * @param resp The response
     * @return Never
     */
    private JsonNode processErrorResponse(final JsonNode resp) {
        String errorMessage = resp.get("error").asText();
        if (resp.has("stack")) {
            errorMessage += "\n" + resp.get("stack").asText();
        }

        throw new JsiiException(errorMessage);
    }

    /**
     * Processes a "callback" response, which is a request to invoke a synchronous callback
     * and send back the result.
     * @param resp The response.
     * @return The next response in the req/res chain.
     */
    private JsonNode processCallbackResponse(final JsonNode resp) {
        if (this.callbackHandler == null) {
            throw new JsiiException("Cannot process callback since callbackHandler was not set");
        }

        Callback callback = JsiiObjectMapper.treeToValue(resp.get("callback"), NativeType.forClass(Callback.class));

        JsonNode result = null;
        String error = null;
        try {
            result = this.callbackHandler.handleCallback(callback);
        } catch (Exception e) {
            if (e.getCause() instanceof InvocationTargetException) {
                error = e.getCause().getCause().getMessage();
            } else {
                error = e.getMessage();
            }
        }

        ObjectNode completeResponse = JsonNodeFactory.instance.objectNode();
        completeResponse.put("cbid", callback.getCbid());
        if (error != null) {
            completeResponse.put("err", error);
        }
        if (result != null) {
            completeResponse.set("result", result);
        }

        ObjectNode req = JsonNodeFactory.instance.objectNode();
        req.set("complete", completeResponse);

        return requestResponse(req);
    }


    /**
     * Sets the handler for sync callbacks.
     * @param callbackHandler The handler.
     */
    public void setCallbackHandler(final JsiiCallbackHandler callbackHandler) {
        this.callbackHandler = callbackHandler;
    }

    @Override
    protected void finalize() throws Throwable {
        try {
            this.terminate();
        } finally {
            super.finalize();
        }
    }

    synchronized void terminate() {
        try {
            // The jsii Kernel process exists after having received the "exit" message
            if (stdin != null) {
                stdin.write("{\"exit\":0}\n");
                stdin.close();
                stdin = null;
            }

            if (childProcess != null) {
                // Wait for the child process to complete
                try {
                    // Giving the process up to 5 seconds to clean up and exit
                    if (!childProcess.waitFor(5, TimeUnit.SECONDS)) {
                        // If it's still not done, forcibly terminate it at this point.
                        childProcess.destroy();
                    }
                } catch (final InterruptedException ie) {
                    throw new RuntimeException(ie);
                }
                childProcess = null;
            }

            // Cleaning up stdout (ensuring buffers are flushed, etc...)
            if (stdout != null) {
                stdout.close();
                stdout = null;
            }

            // We shut down already, no need for the shutdown hook anymore
            if (this.shutdownHook != null) {
                try {
                    Runtime.getRuntime().removeShutdownHook(this.shutdownHook);
                } catch (final IllegalStateException ise) {
                    // VM Shutdown is in progress, removal is now impossible (and unnecessary)
                }
                this.shutdownHook = null;
            }
        } catch (final IOException ioe) {
            throw new UncheckedIOException(ioe);
        }
    }

    /**
     * Starts jsii-server as a child process if it is not already started.
     */
    private synchronized void startRuntimeIfNeeded() {
        if (childProcess != null) {
            return;
        }

        // If JSII_DEBUG is set, enable traces.
        String jsiiDebug = System.getenv("JSII_DEBUG");
        boolean traceEnabled = jsiiDebug != null
                && !jsiiDebug.isEmpty()
                && !jsiiDebug.equalsIgnoreCase("false")
                && !jsiiDebug.equalsIgnoreCase("0");

        // If JSII_RUNTIME is set, use it to find the jsii-server executable
        // otherwise, we default to "jsii-runtime" from PATH.
        String jsiiRuntimeExecutable = System.getenv("JSII_RUNTIME");
        if (jsiiRuntimeExecutable == null) {
            jsiiRuntimeExecutable = BundledRuntime.extract(getClass());
        }

        if (traceEnabled) {
            System.err.println("jsii-runtime: " + jsiiRuntimeExecutable);
        }

        ProcessBuilder pb = new ProcessBuilder("node", jsiiRuntimeExecutable)
            .redirectInput(ProcessBuilder.Redirect.PIPE)
            .redirectOutput(ProcessBuilder.Redirect.PIPE)
            .redirectError(ProcessBuilder.Redirect.PIPE);

        if (traceEnabled) {
            pb.environment().put("JSII_DEBUG", "1");
        }

        pb.environment().put("JSII_AGENT", "Java/" + System.getProperty("java.version"));

        try {
            this.childProcess = pb.start();
            this.shutdownHook = new Thread(this::terminate, "Terminate jsii client");
            Runtime.getRuntime().addShutdownHook(this.shutdownHook);
        } catch (IOException e) {
            throw new JsiiException("Cannot find the 'jsii-runtime' executable (JSII_RUNTIME or PATH)", e);
        }

        OutputStreamWriter stdinStream = new OutputStreamWriter(this.childProcess.getOutputStream(), StandardCharsets.UTF_8);
        InputStreamReader stdoutStream = new InputStreamReader(this.childProcess.getInputStream(), StandardCharsets.UTF_8);

        new ErrorStreamSink(this.childProcess.getErrorStream()).start();

        this.stdout = new BufferedReader(stdoutStream);
        this.stdin = new BufferedWriter(stdinStream);

        handshake();

        this.client = new JsiiClient(this);
    }

    /**
     * Verifies the "hello" message and runtime version compatibility.
     * In the meantime, we require full version compatibility, but we should use semver eventually.
     */
    private void handshake() {
        JsonNode helloResponse = this.readNextResponse();

        if (!helloResponse.has("hello")) {
            throw new JsiiException("Expecting 'hello' message from jsii-runtime");
        }

        String runtimeVersion = helloResponse.get("hello").asText();
        assertVersionCompatible(JSII_RUNTIME_VERSION, runtimeVersion);
    }

    /**
     * Reads the next response from STDOUT of the child process.
     * @return The parsed JSON response.
     * @throws JsiiException if we couldn't parse the response.
     */
    JsonNode readNextResponse() {
        try {
            String responseLine = this.stdout.readLine();
            if (responseLine == null) {
                throw new JsiiException("Child process exited unexpectedly!");
            }
            final JsonNode response = JsiiObjectMapper.INSTANCE.readTree(responseLine);
            JsiiRuntime.notifyInspector(response, MessageInspector.MessageType.Response);
            return response;
        } catch (IOException e) {
            throw new JsiiException("Unable to read reply from jsii-runtime: " + e.toString(), e);
        }
    }

    /**
     * This will return the server process in case it is not already started.
     * @return A {@link JsiiClient} connected to the server process.
     */
    public JsiiClient getClient() {
        this.startRuntimeIfNeeded();
        if (this.client == null) {
            throw new JsiiException("Client not created");
        }
        return this.client;
    }

    /**
     * Asserts that a peer runtimeVersion is compatible with this Java runtime version, which means
     * they share the same version components, with the possible exception of the build number.
     *
     * @param expectedVersion The version this client expects from the runtime
     * @param actualVersion   The actual version the runtime reports
     *
     * @throws JsiiException if versions mismatch
     */
    static void assertVersionCompatible(final String expectedVersion, final String actualVersion) {
        final String shortActualVersion = actualVersion.replaceAll(VERSION_BUILD_PART_REGEX, "");
        final String shortExpectedVersion = expectedVersion.replaceAll(VERSION_BUILD_PART_REGEX, "");
        if (shortExpectedVersion.compareTo(shortActualVersion) != 0) {
            throw new JsiiException("Incompatible jsii-runtime version. Expecting "
                    + shortExpectedVersion
                    + ", actual was " + shortActualVersion);
        }
    }

    private static void notifyInspector(final JsonNode message, final MessageInspector.MessageType type) {
        final MessageInspector inspector = JsiiRuntime.messageInspector.get();
        if (inspector == null) {
            return;
        }
        inspector.inspect(message, type);
    }

    private static final class ErrorStreamSink extends Thread {
        private final InputStream inputStream;

        public ErrorStreamSink(final InputStream inputStream) {
            super("JsiiRuntime.ErrorStreamSink");
            // This is a daemon thread, shouldn't keep the VM alive.
            this.setDaemon(true);

            this.inputStream = inputStream;
        }

        public void run() {
            try (final InputStreamReader inputStreamReader = new InputStreamReader(this.inputStream);
                 final BufferedReader reader = new BufferedReader(inputStreamReader)) {
                String line;
                final ObjectMapper objectMapper = new ObjectMapper();
                // Thread.interrupted() signals we should exit (the VM is asking us to terminate)
                while (!Thread.interrupted() && (line = reader.readLine()) != null) {
                    try {
                        final JsonNode tree = objectMapper.readTree(line);
                        final ConsoleOutput consoleOutput = objectMapper.treeToValue(tree, ConsoleOutput.class);
                        if (consoleOutput.stderr != null) {
                            System.err.write(consoleOutput.stderr, 0, consoleOutput.stderr.length);
                        }
                        if (consoleOutput.stdout != null) {
                            System.out.write(consoleOutput.stdout, 0, consoleOutput.stdout.length);
                        }
                    } catch (final JsonParseException | JsonMappingException exception) {
                        // If not JSON, then this goes straight to stderr without touches...
                        System.err.println(line);
                    }
                }
            } catch (final IOException error) {
                System.err.printf("I/O Error reading jsii Kernel's STDERR: %s%n", error);
                throw new UncheckedIOException(error);
            }
        }
    }

    private static final class ConsoleOutput {
        @Nullable
        public final byte[] stderr;
        @Nullable
        public final byte[] stdout;

        @JsonCreator
        public ConsoleOutput(
                @JsonProperty("stderr") @Nullable final byte[] stderr,
                @JsonProperty("stdout") @Nullable final byte[] stdout
        ) {
            this.stderr = stderr;
            this.stdout = stdout;
        }
    }
}
