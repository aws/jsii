package software.amazon.jsii;

import software.amazon.jsii.api.Callback;
import com.fasterxml.jackson.databind.JsonNode;

/**
 * Invoked to handle native synchronous callbacks.
 */
public interface JsiiCallbackHandler {
    /**
     * Invoked to handle a request from jsii to process a native (java) callback.
     * @param callback The callback info.
     * @return The return value of the callback.
     */
    JsonNode handleCallback(Callback callback);
}
