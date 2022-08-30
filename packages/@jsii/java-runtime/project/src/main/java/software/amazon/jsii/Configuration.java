package software.amazon.jsii;

/**
 * Runtime configuration flags available for the Java jsii runtime.
 */
public final class Configuration {
  private static boolean runtimeTypeChecking = true;

  /**
   * Determines whether runtime type checking will be performed in places where
   * APIs accept {@link java.lang.Object} but the underlying model actually
   * uses a type union.
   *
   * Disabling this configuration allows to stop paying the runtime cost of type
   * checking, however it will produce degraded error messages in case of a
   * developer error.
   */
  public static boolean getRuntimeTypeChecking() {
    return Configuration.runtimeTypeChecking;
  }

  /**
   * Specifies whether runtime type checking will be performed in places where
   * APIs accept {@link java.lang.Object} but the underlying model actually
   * uses a type union.
   *
   * Disabling this configuration allows to stop paying the runtime cost of type
   * checking, however it will produce degraded error messages in case of a
   * developer error.
   */
  public void setRuntimeTypeChecking(final boolean value) {
    Configuration.runtimeTypeChecking = value;
  }

  private Configuration(){
    throw new UnsupportedOperationException();
  }
}
