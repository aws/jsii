package software.amazon.jsii;

import com.fasterxml.jackson.databind.JsonNode;

interface MessageInspector {
    void inspect(final JsonNode message, final MessageType type);

    enum MessageType {
        Request,
        Response;
    }
}
