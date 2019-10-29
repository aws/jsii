package software.amazon.jsii;

import java.lang.annotation.*;

/**
 * Denotes an optional member from the TypeScript model for the API.
 *
 * Annotated methods have a default implementation that throws {@link UnsupportedOperationException} when invoked.
 * In a similar way that they have to in TypeScript, implementors need to actively opt into supporting the
 * functionality by providing a custom implementation for the member.
 */
@Documented
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.SOURCE)
public @interface Optional {}
