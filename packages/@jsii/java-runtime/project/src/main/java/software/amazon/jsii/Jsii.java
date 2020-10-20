package software.amazon.jsii;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Indicates that a class is a jsii class, which means that it's logic is implemented in
 * a JavaScript module.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Inherited
public @interface Jsii {
    /**
     * The jsii module class that hosts this type.
     * @return The class which represents this jsii module.
     */
    Class<? extends JsiiModule> module();

    /**
     * The jsii FQN (fully qualified name) for this type.
     * @return The jsii FQN of the type.
     */
    String fqn();

    /**
     * Indicates that a proxy implementation exists for this type, and what it is.
     */
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.TYPE)
    @Inherited
    @interface Proxy {
        Class<? extends JsiiObject> value();
    }
}
