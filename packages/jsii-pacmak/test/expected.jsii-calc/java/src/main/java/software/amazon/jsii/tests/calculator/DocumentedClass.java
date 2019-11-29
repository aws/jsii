package software.amazon.jsii.tests.calculator;

/**
 * Here's the first line of the TSDoc comment.
<<<<<<< HEAD
 * <p>
 * This is the meat of the TSDoc comment. It may contain
 * multiple lines and multiple paragraphs.
 * <p>
 * Multiple paragraphs are separated by an empty line.
=======
 * 
 * <p>This is the meat of the TSDoc comment. It may contain
 * multiple lines and multiple paragraphs.</p>
 * <p>Multiple paragraphs are separated by an empty line.</p>
>>>>>>> origin/master
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.DocumentedClass")
public class DocumentedClass extends software.amazon.jsii.JsiiObject {

    protected DocumentedClass(final software.amazon.jsii.JsiiObjectRef objRef) {
        super(objRef);
    }

    protected DocumentedClass(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode) {
        super(initializationMode);
    }

    public DocumentedClass() {
        super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this);
    }

    /**
     * Greet the indicated person.
<<<<<<< HEAD
     * <p>
     * This will print out a friendly greeting intended for
     * the indicated person.
     * <p>
=======
     * 
     * <p>This will print out a friendly greeting intended for
     * the indicated person.</p>
     * 
>>>>>>> origin/master
     * @return A number that everyone knows very well
     * @param greetee The person to be greeted.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public java.lang.Number greet(final software.amazon.jsii.tests.calculator.Greetee greetee) {
        return this.jsiiCall("greet", java.lang.Number.class, new Object[] { greetee });
    }

    /**
     * Greet the indicated person.
<<<<<<< HEAD
     * <p>
     * This will print out a friendly greeting intended for
     * the indicated person.
     * <p>
=======
     * 
     * <p>This will print out a friendly greeting intended for
     * the indicated person.</p>
     * 
>>>>>>> origin/master
     * @return A number that everyone knows very well
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public java.lang.Number greet() {
        return this.jsiiCall("greet", java.lang.Number.class);
    }

    /**
     * Say ¡Hola!
     * <p>
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public void hola() {
        this.jsiiCall("hola", Void.class);
    }
}
