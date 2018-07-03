package org.jsii;

import java.util.Collections;
import java.util.List;

/**
 * Represents a jsii JavaScript module.
 */
public class JsiiModule {
    /**
     * The module class.
     */
    private final Class moduleClass;

    /**
     * The name of the module.
     */
    private final String moduleName;

    /**
     * The version of this module.
     */
    private final String moduleVersion;

    /**
     * The module's resource name.
     */
    private final String bundleResourceName;

    /**
     * Creates a module.
     * @param moduleName The name of the module.
     * @param moduleClass The module class.
     * @param bundleResourceName The name of the bundle resource.
     */
    public JsiiModule(final String moduleName, final String moduleVersion, final Class moduleClass, final String bundleResourceName) {
        this.moduleName = moduleName;
        this.moduleClass = moduleClass;
        this.bundleResourceName = bundleResourceName;
        this.moduleVersion = moduleVersion;
    }

    /**
     * @return The URL of the code bundle.
     */
    public Class getModuleClass() {
        return this.moduleClass;
    }

    /**
     * @return The name of the bundle resource.
     */
    public String getBundleResourceName() {
        return bundleResourceName;
    }

    /**
     * @return The name of the module.
     */
    public String getModuleName() {
        return moduleName;
    }

    /**
     * @return The version of this module.
     */
    public String getModuleVersion() {
        return moduleVersion;
    }

    /**
     * @return A list of all classes for module dependencies.
     */
    protected List<Class> getDependencies() {
        return Collections.emptyList();
    }
}
