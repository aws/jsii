package software.amazon.jsii;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Documents the stability of an API.
 */
@Documented
@Retention(RetentionPolicy.SOURCE)
@Target({ElementType.CONSTRUCTOR, ElementType.FIELD, ElementType.METHOD, ElementType.PACKAGE, ElementType.TYPE})
public @interface Stability {
  /**
   * @return The stability level of the annotated API.
   */
  Level value();

  /**
   * Stability level of an API, similar to the Node.js stability index.
   *
   * @see <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">https://nodejs.org/api/documentation.html#documentation_stability_index</a>
   */
  public enum Level {
    /**
     * The API is not subject to Semantic Versioning rules. Non-backward compatible changes or removal may occur in any
     * future release. Use of the API is not recommended in production environments.
     */
    Experimental,

    /**
     * The API is subject to Sematic Versining rules. It may not change in non-backward compatible ways in a subsequent
     * patch or feature version.
     */
    Stable,

    /**
     * The API may emit warnings. Backward compatibility is not guaranteed. APIs annotated with the {@code Deprecated}
     * level should also be annotated with the standard {@link Deprecated} annotation.
     */
    Deprecated,

    /**
     * This API is an representation of an API managed elsewhere and follows
     * the other API's versioning model.
     */
    External
  }
}
