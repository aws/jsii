using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Here's the first line of the TSDoc comment.</summary>
    /// <remarks>
    /// This is the meat of the TSDoc comment. It may contain
    /// multiple lines and multiple paragraphs.
    /// 
    /// Multiple paragraphs are separated by an empty line.
    /// 
    /// <strong>Stability</strong>: Stable
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DocumentedClass), fullyQualifiedName: "jsii-calc.DocumentedClass")]
    public class DocumentedClass : DeputyBase
    {
        public DocumentedClass(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected DocumentedClass(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected DocumentedClass(DeputyProps props): base(props)
        {
        }

        /// <summary>Greet the indicated person.</summary>
        /// <param name="greetee">The person to be greeted.</param>
        /// <returns>A number that everyone knows very well</returns>
        /// <remarks>
        /// This will print out a friendly greeting intended for
        /// the indicated person.
        /// 
        /// <strong>Stability</strong>: Stable
        /// </remarks>
        [JsiiMethod(name: "greet", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"docs\":{\"summary\":\"The person to be greeted.\"},\"name\":\"greetee\",\"optional\":true,\"type\":{\"fqn\":\"jsii-calc.Greetee\"}}]")]
        public virtual double Greet(Amazon.JSII.Tests.CalculatorNamespace.IGreetee? greetee = null)
        {
            return InvokeInstanceMethod<double>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IGreetee)}, new object?[]{greetee});
        }

        /// <summary>Say ¡Hola!</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "hola")]
        public virtual void Hola()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }
    }
}
