package software.amazon.jsii;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotates API elements that are intended for jsii's internal use only. Such APIs elements are not public by design
 * and likely to be removed or renamed, have their signature change, or have their access level decreased in future
 * versions of the library without notice.
 *
 * Annotated elements are eligible for immediate modification or removal and are not subject to semantic versioning.
 */
@Documented
@Retention(RetentionPolicy.SOURCE)
@Target({ElementType.CONSTRUCTOR, ElementType.FIELD, ElementType.METHOD, ElementType.PACKAGE, ElementType.TYPE})
public @interface Internal {
}
