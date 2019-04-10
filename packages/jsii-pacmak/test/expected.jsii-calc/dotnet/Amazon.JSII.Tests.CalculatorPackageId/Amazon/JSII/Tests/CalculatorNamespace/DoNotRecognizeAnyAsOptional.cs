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

        [JsiiMethod(name: "method", parametersJson: "[{\"name\":\"_requiredAny\",\"type\":{\"primitive\":\"any\"}},{\"name\":\"_optionalAny\",\"type\":{\"primitive\":\"any\"}},{\"name\":\"_optionalString\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void Method(object _requiredAny, object _optionalAny, string _optionalString)
        {
            InvokeInstanceVoidMethod(new object[]{_requiredAny, _optionalAny, _optionalString});
        }
    }
}