package software.amazon.jsii;

import java.util.Collections;
import java.util.List;

/**
 * Represents a jsii JavaScript module.
 */
@Internal
public abstract class JsiiModule {
    /**
     * The module class.
     */
    private final Class<? extends JsiiModule> moduleClass;

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
     * @param moduleVersion The version of the module.
     * @param moduleClass The module class.
     * @param bundleResourceName The name of the bundle resource.
     */
    public JsiiModule(final String moduleName, final String moduleVersion, final Class<? extends JsiiModule> moduleClass, final String bundleResourceName) {
        this.moduleName = moduleName;
        this.moduleClass = moduleClass;
        this.bundleResourceName = bundleResourceName;
        this.moduleVersion = moduleVersion;
    }

    /**
     * @return The URL of the code bundle.
     */
    public final Class<? extends JsiiModule> getModuleClass() {
        return this.moduleClass;
    }

    /**
     * @return The name of the bundle resource.
     */
    public final String getBundleResourceName() {
        return this.bundleResourceName;
    }

    /**
     * @return The name of the module.
     */
    public final String getModuleName() {
        return this.moduleName;
    }

    /**
     * @return The version of this module.
     */
    public final String getModuleVersion() {
        return this.moduleVersion;
    }

    /**
     * @return A list of all classes for module dependencies.
     */
    protected List<Class<? extends JsiiModule>> getDependencies() {
        return Collections.emptyList();
    }

    /**
     * Resolves a class of this module given it's jsii Fully Qualified Name (FQN)
     *
     * @param fqn the jsii FQN of the class being looked up.
     *
     * @return the Java class that correspons to the FQN.
     *
     * @throws ClassNotFoundException if the requested jsii FQN does not correspond to a known class.
     */
    protected abstract Class<?> resolveClass(final String fqn) throws ClassNotFoundException;
}
