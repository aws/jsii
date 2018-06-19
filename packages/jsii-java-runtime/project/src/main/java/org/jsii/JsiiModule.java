package org.jsii;

import java.net.URL;
import java.util.Collections;
import java.util.List;

/**
 * Represents a jsii JavaScript module.
 */
public class JsiiModule {
    /**
     * The URL of the code bundle.
     */
    private final URL bundle;

    /**
     * The name of the module.
     */
    private final String moduleName;

    /**
     * Creates a module.
     * @param moduleName The name of the module.
     * @param bundle The URL of the code bundle (jsii.js) of this module.
     */
    public JsiiModule(final String moduleName, final URL bundle) {
        this.moduleName = moduleName;
        this.bundle = bundle;
    }

    /**
     * @return The URL of the code bundle.
     */
    public URL getBundle() {
        return bundle;
    }

    /**
     * @return The name of the module.
     */
    public String getModuleName() {
        return moduleName;
    }

    /**
     * @return A list of all classes for module dependencies.
     */
    protected List<Class> getDependencies() {
        return Collections.emptyList();
    }
}
