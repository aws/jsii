using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>jsii#284: do not recognize "any" as an optional argument.</summary>
    [JsiiClass(nativeType: typeof(DoNotRecognizeAnyAsOptional), fullyQualifiedName: "jsii-calc.DoNotRecognizeAnyAsOptional")]
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

        [JsiiMethod(name: "method", parametersJson: "[{\"name\":\"_requiredAny\",\"type\":{\"primitive\":\"any\"}},{\"name\":\"_optionalAny\",\"optional\":true,\"type\":{\"primitive\":\"any\"}},{\"name\":\"_optionalString\",\"optional\":true,\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void Method(object requiredAny, object optionalAny, string optionalString)
        {
            InvokeInstanceVoidMethod(new object[]{requiredAny, optionalAny, optionalString});
        }
    }
}
