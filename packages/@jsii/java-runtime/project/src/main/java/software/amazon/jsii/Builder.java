package software.amazon.jsii;

/**
 * A superinterface common to instance builders.
 */
@FunctionalInterface
public interface Builder<T> {
  /**
   * Builds the instance given the current builder configuration.
   *
   * @return the built instance.
   */
  T build();
}
