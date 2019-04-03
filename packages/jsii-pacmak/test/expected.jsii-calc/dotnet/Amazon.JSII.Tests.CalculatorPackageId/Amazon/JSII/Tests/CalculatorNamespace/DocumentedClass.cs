using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// remarks: This is the meat of the TSDoc comment. It may contain
    /// multiple lines and multiple paragraphs.
    /// 
    /// Multiple paragraphs are separated by an empty line.
    /// stability: stable
    /// summary: Here's the first line of the TSDoc comment.
    /// </remarks>
    [JsiiClass(typeof(DocumentedClass), "jsii-calc.DocumentedClass", "[]")]
    public class DocumentedClass : DeputyBase
    {
        public DocumentedClass(): base(new DeputyProps(new object[]{}))
        {
        }

        protected DocumentedClass(ByRefValue reference): base(reference)
        {
        }

        protected DocumentedClass(DeputyProps props): base(props)
        {
        }

        /// <param name = "greetee">summary: The person to be greeted.</param>
        /// <remarks>
        /// remarks: This will print out a friendly greeting intended for
        /// the indicated person.
        /// returns: A number that everyone knows very well
        /// summary: Greet the indicated person.
        /// </remarks>
        [JsiiMethod("greet", "{\"primitive\":\"number\"}", "[{\"name\":\"greetee\",\"type\":{\"fqn\":\"jsii-calc.Greetee\",\"optional\":true}}]")]
        public virtual double Greet(IGreetee greetee)
        {
            return InvokeInstanceMethod<double>(new object[]{greetee});
        }

        /// <remarks>
        /// stability: experimental
        /// summary: Say ¡Hola!
        /// </remarks>
        [JsiiMethod("hola", null, "[]")]
        public virtual void Hola()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}