package software.amazon.jsii.tests.kotlin.calculator

/**
 * Here's the first line of the TSDoc comment.
 * 
 * This is the meat of the TSDoc comment. It may contain
 * multiple lines and multiple paragraphs.
 * 
 * Multiple paragraphs are separated by an empty line.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.kotlin.calculator.`$Module`::class, fqn = "jsii-calc.DocumentedClass")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
open class DocumentedClass : software.amazon.jsii.JsiiObject {
    constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef)
    constructor(mode: software.amazon.jsii.JsiiObject.InitializationMode) : super(mode)

    constructor() : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
        software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this)
    }

    /**
     * Greet the indicated person.
     * 
     * This will print out a friendly greeting intended for
     * the indicated person.
     * 
     * @return A number that everyone knows very well
     * 
     * @param greeteeThe person to be greeted.
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    open fun greet(greetee: software.amazon.jsii.tests.kotlin.calculator.Greetee?): kotlin.Number {
        val args: kotlin.Array<kotlin.Any?> = kotlin.arrayOf(
            greetee ?: error("'greetee' should be present")
        )
        return this.jsiiCall("greet", kotlin.Number::class.java, args) ?: error("Method 'greet()' returned null value")
    }

    /**
     * Say ¡Hola!
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    open fun hola() {
        this.jsiiCall("hola", kotlin.Unit::class.java) ?: error("Method 'hola()' returned null value")
    }
}
