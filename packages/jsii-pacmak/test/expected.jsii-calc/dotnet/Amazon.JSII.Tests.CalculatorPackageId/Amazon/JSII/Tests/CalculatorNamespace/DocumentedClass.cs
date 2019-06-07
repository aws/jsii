using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Here's the first line of the TSDoc comment.</summary>
    /// <remarks>
    /// This is the meat of the TSDoc comment. It may contain
    /// multiple lines and multiple paragraphs.
    /// 
    /// Multiple paragraphs are separated by an empty line.
    /// stability: stable
    /// </remarks>
    [JsiiClass(nativeType: typeof(DocumentedClass), fullyQualifiedName: "jsii-calc.DocumentedClass")]
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

        /// <summary>Greet the indicated person.</summary>
        /// <param name = "greetee">The person to be greeted.</param>
        /// <returns>A number that everyone knows very well</returns>
        /// <remarks>
        /// This will print out a friendly greeting intended for
        /// the indicated person.
        /// </remarks>
        [JsiiMethod(name: "greet", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"docs\":{\"summary\":\"The person to be greeted.\"},\"name\":\"greetee\",\"optional\":true,\"type\":{\"fqn\":\"jsii-calc.Greetee\"}}]")]
        public virtual double Greet(Amazon.JSII.Tests.CalculatorNamespace.IGreetee greetee)
        {
            return InvokeInstanceMethod<double>(new object[]{greetee});
        }

        /// <summary>Say ¡Hola!</summary>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "hola")]
        public virtual void Hola()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }
    }
}
