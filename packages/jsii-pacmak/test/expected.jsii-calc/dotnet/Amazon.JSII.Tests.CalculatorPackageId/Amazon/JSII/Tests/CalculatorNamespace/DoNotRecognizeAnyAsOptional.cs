using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>jsii#284: do not recognize "any" as an optional argument.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DoNotRecognizeAnyAsOptional), fullyQualifiedName: "jsii-calc.DoNotRecognizeAnyAsOptional")]
    public class DoNotRecognizeAnyAsOptional : DeputyBase
    {
        public DoNotRecognizeAnyAsOptional(): base(new DeputyProps(new object[]{}))
        {
        }

        protected DoNotRecognizeAnyAsOptional(ByRefValue reference): base(reference)
        {
        }

        protected DoNotRecognizeAnyAsOptional(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "method", parametersJson: "[{\"name\":\"_requiredAny\",\"type\":{\"primitive\":\"any\"}},{\"name\":\"_optionalAny\",\"optional\":true,\"type\":{\"primitive\":\"any\"}},{\"name\":\"_optionalString\",\"optional\":true,\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void Method(object requiredAny, object optionalAny = null, string optionalString = null)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(object), typeof(object), typeof(string)}, new object[]{requiredAny, optionalAny, optionalString});
        }
    }
}
