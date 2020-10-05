package software.amazon.jsii.api;

import software.amazon.jsii.Internal;

/**
 * The "callback" struct.
 */
@Internal
public class Callback {
    /**
     * Callback ID.
     */
    private String cbid;

    /**
     * Callback cookie.
     */
    private String cookie;

    /**
     * Invoke request (can be null).
     */
    private InvokeRequest invoke;

    /**
     * Get request (can be null).
     */
    private GetRequest get;

    /**
     * Set request (can be null).
     */
    private SetRequest set;

    /**
     * @return Callback ID.
     */
    public String getCbid() {
        return cbid;
    }

    /**
     * Sets the callback ID.
     * @param cbid The callback ID.
     */
    public void setCbid(final String cbid) {
        this.cbid = cbid;
    }

    /**
      * @return The callback cookie.
      */
    public String getCookie() {
        return cookie;
    }

    /**
     * Sets the callback cookie.
     * @param cookie The cookie
     */
    public void setCookie(final String cookie) {
        this.cookie = cookie;
    }

    /**
     * @return The invoke request.
     */
    public InvokeRequest getInvoke() {
        return invoke;
    }

    /**
     * Sets the invoke request.
     * @param invoke The invoke request.
     */
    public void setInvoke(final InvokeRequest invoke) {
        this.invoke = invoke;
    }

    /**
     * @return The get request.
     */
    public GetRequest getGet() {
        return get;
    }

    /**
     * Sets the "get" request.
     * @param get The "get" request
     */
    public void setGet(final GetRequest get) {
        this.get = get;
    }

    /**
     * @return The "set" request.
     */
    public SetRequest getSet() {
        return set;
    }

    /**
     * Sets the "set" request.
     * @param set The "set" request
     */
    public void setSet(final SetRequest set) {
        this.set = set;
    }
}
