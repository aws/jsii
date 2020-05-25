package software.amazon.jsii;

import software.amazon.jsii.api.Callback;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.lang.reflect.InvocationTargetException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Collectors;

import static software.amazon.jsii.JsiiVersion.JSII_RUNTIME_VERSION;
import static software.amazon.jsii.Util.extractResource;

/**
 * Manages the jsii-runtime child process.
 */
public final class JsiiRuntime {
    /**
     * Extract the "+<sha>" postfix from a full version number.
     */
    private static final String VERSION_BUILD_PART_REGEX = "\\+[a-z0-9]+$";

    /**
     * True to print server traces to STDERR.
     */
    private static boolean traceEnabled = false;

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
     * Child's standard error.
     */
    private BufferedReader stderr;

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

    public void terminate() throws InterruptedException, IOException {
        if (stderr != null) {
            stderr.close();
            stderr = null;
        }

        if (stdout != null) {
            stdout.close();
            stdout = null;
        }

        if (stdin != null) {
            stdin.close();
            stdin = null;
        }

        if (childProcess != null) {
            // Wait for the child process to complete
            childProcess.waitFor();
            childProcess = null;
        }
    }

    /**
     * Starts jsii-server as a child process if it is not already started.
     */
    private void startRuntimeIfNeeded() {
        if (childProcess != null) {
            return;
        }

        // If JSII_DEBUG is set, enable traces.
        String jsiiDebug = System.getenv("JSII_DEBUG");
        if (jsiiDebug != null
                && !jsiiDebug.isEmpty()
                && !jsiiDebug.equalsIgnoreCase("false")
                && !jsiiDebug.equalsIgnoreCase("0")) {
            traceEnabled = true;
        }

        // If JSII_RUNTIME is set, use it to find the jsii-server executable
        // otherwise, we default to "jsii-runtime" from PATH.
        String jsiiRuntimeExecutable = System.getenv("JSII_RUNTIME");
        if (jsiiRuntimeExecutable == null) {
            jsiiRuntimeExecutable = prepareBundledRuntime();
        }

        if (traceEnabled) {
            System.err.println("jsii-runtime: " + jsiiRuntimeExecutable);
        }

        ProcessBuilder pb = new ProcessBuilder("node", jsiiRuntimeExecutable);

        if (traceEnabled) {
            pb.environment().put("JSII_DEBUG", "1");
        }

        pb.environment().put("JSII_AGENT", "Java/" + System.getProperty("java.version"));

        try {
            this.childProcess = pb.start();
        } catch (IOException e) {
            throw new JsiiException("Cannot find the 'jsii-runtime' executable (JSII_RUNTIME or PATH)");
        }

        OutputStreamWriter stdinStream = new OutputStreamWriter(this.childProcess.getOutputStream(), StandardCharsets.UTF_8);
        InputStreamReader stdoutStream = new InputStreamReader(this.childProcess.getInputStream(), StandardCharsets.UTF_8);
        InputStreamReader stderrStream = new InputStreamReader(this.childProcess.getErrorStream(), StandardCharsets.UTF_8);

        this.stderr = new BufferedReader(stderrStream);
        this.stdout = new BufferedReader(stdoutStream);
        this.stdin = new BufferedWriter(stdinStream);

        handshake();

        this.client = new JsiiClient(this);

        // if trace is enabled, start a thread that continuously reads from the child process's
        // STDERR and prints to my STDERR.
        if (traceEnabled) {
            startPipeErrorStreamThread();
        }
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
                String error = this.stderr.lines().collect(Collectors.joining("\n\t"));
                throw new JsiiException("Child process exited unexpectedly: " + error);
            }
            final JsonNode response = JsiiObjectMapper.INSTANCE.readTree(responseLine);
            JsiiRuntime.notifyInspector(response, MessageInspector.MessageType.Response);
            return response;
        } catch (IOException e) {
            throw new JsiiException("Unable to read reply from jsii-runtime: " + e.toString(), e);
        }
    }

    /**
     * Starts a thread that pipes STDERR from the child process to our STDERR.
     */
    private void startPipeErrorStreamThread() {
        Thread daemon = new Thread(() -> {
            while (true) {
                try {
                    String line = stderr.readLine();
                    System.err.println(line);
                    if (line == null) {
                        break;
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        daemon.setDaemon(true);
        daemon.start();
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
     * Prints jsii-server traces to STDERR.
     */
    public static void enableTrace() {
        traceEnabled = true;
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

    /**
     * Extracts all files needed for jsii-runtime.js from JAR into a temp directory.
     * @return The full path for jsii-runtime.js
     */
    private String prepareBundledRuntime() {
        try {
            Path directory = Files.createTempDirectory("jsii-java-runtime");
            directory.toFile().deleteOnExit();

            Path entrypoint = extractResource(getClass(), "jsii-runtime.js", directory);
            entrypoint.toFile().deleteOnExit();

            extractResource(getClass(), "jsii-runtime.js.map", directory).toFile().deleteOnExit();
            extractResource(getClass(), "mappings.wasm", directory).toFile().deleteOnExit();

            return entrypoint.toString();
        } catch (IOException e) {
            throw new JsiiException("Unable to extract bundle of jsii-runtime.js from jar", e);
        }
    }

    private static void notifyInspector(final JsonNode message, final MessageInspector.MessageType type) {
        final MessageInspector inspector = JsiiRuntime.messageInspector.get();
        if (inspector == null) {
            return;
        }
        inspector.inspect(message, type);
    }
}
