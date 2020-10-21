package software.amazon.jsii.api;

import software.amazon.jsii.Internal;

/**
 * Represents an override.
 */
@Internal
public class JsiiOverride {
    /**
     * The name of the overridden method (or null if this is property override).
     */
    private String method;

    /**
     * The name of the overridden property (or null if this is a method override).
     */
    private String property;

    /**
     * The cookie.
     */
    private String cookie;

    /**
     * @return The name of the overridden method (or null if this is property).
     */
    public String getMethod() {
        return method;
    }

    /**
     * @param method The name of the overridden method (or null if this is property).
     */
    public void setMethod(final String method) {
        this.method = method;
    }

    /**
     * @return The name of the overridden property (or null if this is a method override).
     */
    public String getProperty() {
        return property;
    }

    /**
     * @param property The name of the overridden property (or null if this is a method override).
     */
    public void setProperty(final String property) {
        this.property = property;
    }

    /**
     * @return The cookie.
     */
    public String getCookie() {
        return cookie;
    }

    /**
     * @param cookie The cookie.
     */
    public void setCookie(final String cookie) {
        this.cookie = cookie;
    }
}
