package software.amazon.jsii;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.jetbrains.annotations.Nullable;
import org.jetbrains.annotations.VisibleForTesting;
import software.amazon.jsii.api.Callback;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.nio.channels.Channels;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
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
     * The child process.
     */
    private Process childProcess;

    /**
     * Child's standard output.
     */
    private BufferedReader stdout;

    /**
     * Child's standard input.
     */
    private Writer stdin;

    /**
     * The error stream sink for the child process.
     */
    private ErrorStreamSink errorStreamSink;

    /**
     * Handler for synchronous callbacks. Must be set using setCallbackHandler.
     */
    private JsiiCallbackHandler callbackHandler;

    /**
     * The JVM shutdown hook registered by this instance, if any.
     */
    private Thread shutdownHook;

    /** The value of the JSII_RUNTIME environment variable */
    @Nullable
    private final String customRuntime;

    /** The value of the JSII_NODE environment variable */
    @Nullable
    private final String customNode;

    public JsiiRuntime() {
        this(System.getenv("JSII_RUNTIME"), System.getenv("JSII_NODE"));
    }

    @VisibleForTesting
    JsiiRuntime(@Nullable final String customRuntime, @Nullable final String customNode) {
        this.customRuntime = customRuntime;
        this.customNode = customNode;
    }

    /**
     * The main API of this class. Sends a JSON request to jsii-runtime and returns the JSON response.
     *
     * @param request The JSON request
     * @return The JSON response
     * @throws JsiiError If the runtime returns an error response originating from the @jsii/kernel.
     * @throws RuntimeException If the runtime returns an error response.
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
            throw new JsiiError("Unable to send request to jsii-runtime: " + e.toString(), e);
        }
    }

    /**
     * Handles an "error" response by extracting the message and stack trace
     * and throwing a JsiiError or a RuntimeException.
     *
     * @param resp The response
     * @return Never
     */
    private JsonNode processErrorResponse(final JsonNode resp) {
        String errorName = resp.get("name").asText();
        String errorMessage = resp.get("error").asText();
        if (resp.has("stack")) {
            errorMessage += "\n" + resp.get("stack").asText();
        }

        if (errorName.equals(JsiiException.Type.RUNTIME_ERROR.toString())) {
          throw new RuntimeException(errorMessage);
        }

        throw new JsiiError(errorMessage);
    }

    /**
     * Processes a "callback" response, which is a request to invoke a synchronous callback
     * and send back the result.
     *
     * @param resp The response.
     * @return The next response in the req/res chain.
     */
    private JsonNode processCallbackResponse(final JsonNode resp) {
        if (this.callbackHandler == null) {
            throw new JsiiError("Cannot process callback since callbackHandler was not set");
        }

        Callback callback = JsiiObjectMapper.treeToValue(resp.get("callback"), NativeType.forClass(Callback.class));

        JsonNode result = null;
        String error = null;
        String name = null;
        try {
            result = this.callbackHandler.handleCallback(callback);
        } catch (Exception e) {
            if (e.getCause() instanceof InvocationTargetException) {
                error = e.getCause().getCause().getMessage();
            } else {
                error = e.getMessage();
            }

            name = e instanceof JsiiError
                ? JsiiException.Type.JSII_FAULT.toString()
                : JsiiException.Type.RUNTIME_ERROR.toString();
        }

        ObjectNode completeResponse = JsonNodeFactory.instance.objectNode();
        completeResponse.put("cbid", callback.getCbid());
        if (error != null) {
            completeResponse.put("err", error);
            completeResponse.put("name", name);
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
     *
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
        // The jsii Kernel process exists after having received the "exit" message
        if (stdin != null) {
            try {
                stdin.write("{\"exit\":0}\n");
                stdin.close();
            } catch (final IOException ioe) {
                // Ignore - the stream might have already been closed, if the child exited already.
            } finally {
                stdin = null;
            }
        }

        // Cleaning up stdout (ensuring buffers are flushed, etc...)
        if (stdout != null) {
            try {
                stdout.close();
            } catch (final IOException ioe) {
                // Ignore - the stream might have already been closed.
            } finally {
                stdout = null;
            }
        }

        // Cleaning up error stream sink (ensuring all messages are flushed, etc...)
        if (this.errorStreamSink != null) {
            try {
                this.errorStreamSink.close();
            } catch (final InterruptedException ie) {
                // Ignore - we can no longer do anything about this...
            } finally {
                this.errorStreamSink = null;
            }
        }

        if (childProcess != null) {
            // Wait for the child process to complete
            try {
                // Giving the process up to 5 seconds to clean up and exit
                if (!childProcess.waitFor(5, TimeUnit.SECONDS)) {
                    // If it's still not done, forcibly terminate it at this point.
                    childProcess.destroyForcibly();
                }
            } catch (final InterruptedException ie) {
                throw new RuntimeException(ie);
            } finally {
                childProcess = null;
            }
        }

        // We shut down already, no need for the shutdown hook anymore
        if (this.shutdownHook != null) {
            try {
                Runtime.getRuntime().removeShutdownHook(this.shutdownHook);
            } catch (final IllegalStateException ise) {
                // VM Shutdown is in progress, removal is now impossible (and unnecessary)
            } finally {
                this.shutdownHook = null;
            }
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
        final String jsiiDebug = System.getenv("JSII_DEBUG");
        final boolean traceEnabled = jsiiDebug != null
                && !jsiiDebug.isEmpty()
                && !jsiiDebug.equalsIgnoreCase("false")
                && !jsiiDebug.equalsIgnoreCase("0");

        final List<String> jsiiRuntimeCommand = jsiiRuntimeCommand();
        if (traceEnabled) {
            System.err.println("jsii-runtime: " + String.join(" ", jsiiRuntimeCommand));
        }

        try {
            final ProcessBuilder pb = new ProcessBuilder()
                    .command(jsiiRuntimeCommand)
                    .redirectError(ProcessBuilder.Redirect.PIPE)
                    .redirectOutput(ProcessBuilder.Redirect.PIPE)
                    .redirectInput(ProcessBuilder.Redirect.PIPE);
            pb.environment().put("JSII_AGENT", String.format("Java/%s", System.getProperty("java.version")));
            if (jsiiDebug != null) {
                pb.environment().put("JSII_DEBUG", jsiiDebug);
            }

            this.childProcess = pb.start();

            this.stdin = new OutputStreamWriter(this.childProcess.getOutputStream(), StandardCharsets.UTF_8);
            this.stdout = new BufferedReader(new InputStreamReader(this.childProcess.getInputStream(), StandardCharsets.UTF_8));

            this.errorStreamSink = new ErrorStreamSink(this.childProcess.getErrorStream());
            this.errorStreamSink.start();
        } catch (final IOException ioe) {
            throw new UncheckedIOException(ioe);
        }

        this.shutdownHook = new Thread(this::terminate, "Terminate jsii client");
        Runtime.getRuntime().addShutdownHook(this.shutdownHook);

        handshake();

        this.client = new JsiiClient(this);
    }

    /**
     * Determines the correct command to execute in order to start the jsii runtime program. If custom runtimes are
     * configured (either via `JSII_RUNTIME` or `JSII_NODE`), defer to `sh -c` in order to ensure platform-appropriate
     * command parsing is performed, since {@link ProcessBuilder#command(String...)} won't do any of this by itself.
     *
     * @return The command to execute to start the jsii runtime program.
     */
    private List<String> jsiiRuntimeCommand() {
        if (this.customRuntime != null) {
            if (this.customRuntime.matches(".*\\s.*")) {
                // Shell out only if the custom runtime includes white space.
                return shellOut(this.customRuntime);
            }
            return Collections.singletonList(this.customRuntime);
        }

        // We don't use a custom runtime, so extract the bundled one...
        final String bundledRuntime = BundledRuntime.extract(JsiiRuntime.class);

        if (this.customNode != null && this.customNode.matches(".*\\s.*")) {
            // Shell out only if the custom node includes white space.
            return shellOut(this.customNode, bundledRuntime);
        }
        return Arrays.asList(this.customNode != null ? this.customNode : "node", bundledRuntime);
    }

    /**
     * Creates a command to sub-shell to the specified end-user command, that uses `/bin/sh` on *NIXes, and %COMSPEC%, or
     * cmd.exe on Windows.
     *
     * <p>
     * This is heavily inspired from <a href="https://github.com/nodejs/node/blob/434bdde97464cc04f79ed3c8398f2a50c71c39d1/lib/child_process.js#L617-L642">how Node.js does the same thing</a>.
     * </p>
     *
     * @param command the end-user command to be run.
     *
     * @return a full sub-shell command that is platform-appropriate.
     */
    private static List<String> shellOut(final String... command) {
        final boolean isWindows = System.getProperty("os.name").startsWith("Windows");
        if (isWindows) {
            String cmd = System.getenv("COMSPEC");
            if (cmd == null) {
                cmd = "cmd.exe";
            }
            return Arrays.asList(cmd, "/d", "/s", "/c", String.join(" ", command));
        }
        return Arrays.asList("/bin/sh", "-c", String.join(" ", command));
    }

    /**
     * Verifies the "hello" message and runtime version compatibility.
     * In the meantime, we require full version compatibility, but we should use semver eventually.
     */
    private void handshake() {
        JsonNode helloResponse = this.readNextResponse();

        if (!helloResponse.has("hello")) {
            throw new JsiiError("Expecting 'hello' message from jsii-runtime");
        }

        String runtimeVersion = helloResponse.get("hello").asText();
        assertVersionCompatible(JSII_RUNTIME_VERSION, runtimeVersion);
    }

    /**
     * Reads the next response from STDOUT of the child process.
     *
     * @return The parsed JSON response.
     * @throws JsiiError if we couldn't parse the response.
     */
    JsonNode readNextResponse() {
        try {
            String responseLine = this.stdout.readLine();
            if (responseLine == null) {
                throw new JsiiError("Child process exited unexpectedly!");
            }
            final JsonNode response = JsiiObjectMapper.INSTANCE.readTree(responseLine);
            JsiiRuntime.notifyInspector(response, MessageInspector.MessageType.Response);
            return response;
        } catch (IOException e) {
            throw new JsiiError("Unable to read reply from jsii-runtime: " + e.toString(), e);
        }
    }

    /**
     * This will return the server process in case it is not already started.
     *
     * @return A {@link JsiiClient} connected to the server process.
     */
    public JsiiClient getClient() {
        this.startRuntimeIfNeeded();
        if (this.client == null) {
            throw new JsiiError("Client not created");
        }
        return this.client;
    }

    /**
     * Asserts that a peer runtimeVersion is compatible with this Java runtime version, which means
     * they share the same version components, with the possible exception of the build number.
     *
     * @param expectedVersion The version this client expects from the runtime
     * @param actualVersion   The actual version the runtime reports
     * @throws JsiiError if versions mismatch
     */
    static void assertVersionCompatible(final String expectedVersion, final String actualVersion) {
        final String shortActualVersion = actualVersion.replaceAll(VERSION_BUILD_PART_REGEX, "");
        final String shortExpectedVersion = expectedVersion.replaceAll(VERSION_BUILD_PART_REGEX, "");
        if (shortExpectedVersion.compareTo(shortActualVersion) != 0) {
            throw new JsiiError("Incompatible jsii-runtime version. Expecting "
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

    /**
     * This {@link Thread} takes the standard error output from a child process and handles it correctly as per the jsii
     * runtime protocol. It is implemented in such a way that it is interruptible, drawing inspiration from how it's
     * done at zt-exec (so credits to ZeroTurnaround & contributors).
     *
     * @see <a href="https://github.com/zeroturnaround/zt-exec/blob/master/src/main/java/org/zeroturnaround/exec/stream/InputStreamPumper.java">zt-exec</a>
     */
    private static final class ErrorStreamSink extends Thread {
        private final ObjectMapper objectMapper = new ObjectMapper();
        private final InputStream inputStream;
        private final ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        private boolean eof = false;
        private boolean stop = false;

        public ErrorStreamSink(final InputStream inputStream) {
            this.inputStream = inputStream;
            this.setDaemon(true);
            this.setName(this.getClass().getCanonicalName());
            this.setUncaughtExceptionHandler((thread, throwable) -> {
                System.err.printf("Unexpected error in background thread \"%s\": %s%n", thread.getName(), throwable);
            });
        }

        public void run() {
            try {
                while (!this.stop) {
                    this.acceptData(false);
                    if (!this.stop) {
                        // Short interruptible sleep, so we can be stopped by a signal... This is a bit ugly (busy-waiting)
                        // but is in fact the only way to be reliably interruptible with the InputStream API.
                        Thread.sleep(100);
                    }
                }
                // Finish flushing the stream until no data is left, so no log entries are dropped on the floor.
                this.acceptData(true);
            } catch (final IOException ioe) {
                throw new UncheckedIOException(ioe);
            } catch (final InterruptedException ie) {
                // Ignore - simply exit right away.
            }
        }

        public void close() throws InterruptedException {
            this.stop = true;
            this.join();
        }

        /**
         * Accepts data from {@link #inputStream} as long as data is available, or until EOF is reached if the
         * {@code uninterruptible} parameter is set to {@code true}.
         *
         * @param uninterruptible whether data should be read in a blocking manner until EOF is reached or not.
         *
         * @throws IOException
         */
        private void acceptData(final boolean uninterruptible) throws IOException {
            while (!this.eof && (uninterruptible || this.inputStream.available() > 0)) {
                final int read = this.inputStream.read();
                if (read == -1) {
                    this.eof = true;
                } else {
                    this.buffer.write(read);
                }
                if (read == '\n' || this.eof) {
                    // don't print an empty line if we're at the end of the file and the buffer is empty.
                    if(!this.eof || buffer.size() > 0) {
                        processLine(new String(buffer.toByteArray(), StandardCharsets.UTF_8));
                    }
                    buffer.reset();
                }
            }
        }

        private void processLine(final String line) {
            try {
                final JsonNode tree = objectMapper.readTree(line);
                final ConsoleOutput consoleOutput = objectMapper.treeToValue(tree, ConsoleOutput.class);
                if(consoleOutput == null) {
                    // this means the line was empty, but the above objectMapper calls will return null
                    throw new JsonProcessingException();
                }
                if (consoleOutput.stderr != null) {
                    System.err.write(consoleOutput.stderr, 0, consoleOutput.stderr.length);
                }
                if (consoleOutput.stdout != null) {
                    System.out.write(consoleOutput.stdout, 0, consoleOutput.stdout.length);
                }
            } catch (final JsonProcessingException exception) {
                // If not JSON, then this goes straight to stderr without touches...
                System.err.println(line);
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
