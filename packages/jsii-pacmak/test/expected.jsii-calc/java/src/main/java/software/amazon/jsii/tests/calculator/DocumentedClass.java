package software.amazon.jsii.tests.calculator;

/**
 * Here's the first line of the TSDoc comment.
 * 
 * This is the meat of the TSDoc comment. It may contain
 * multiple lines and multiple paragraphs.
 * 
 * Multiple paragraphs are separated by an empty line.
 * 
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DocumentedClass")
public class DocumentedClass extends software.amazon.jsii.JsiiObject {
    protected DocumentedClass(final software.amazon.jsii.JsiiObject.InitializationMode mode) {
        super(mode);
    }
    public DocumentedClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Greet the indicated person.
     * 
     * This will print out a friendly greeting intended for
     * the indicated person.
     * 
     * @return A number that everyone knows very well
     * @param greetee The person to be greeted.
     */
    public java.lang.Number greet(@javax.annotation.Nullable final software.amazon.jsii.tests.calculator.Greetee greetee) {
        return this.jsiiCall("greet", java.lang.Number.class, java.util.stream.Stream.of(greetee).toArray());
    }

    /**
     * Greet the indicated person.
     * 
     * This will print out a friendly greeting intended for
     * the indicated person.
     * 
     * @return A number that everyone knows very well
     */
    public java.lang.Number greet() {
        return this.jsiiCall("greet", java.lang.Number.class);
    }

    /**
     * Say ¡Hola!
     * 
     * EXPERIMENTAL
     * 
     */
    public void hola() {
        this.jsiiCall("hola", Void.class);
    }
}
