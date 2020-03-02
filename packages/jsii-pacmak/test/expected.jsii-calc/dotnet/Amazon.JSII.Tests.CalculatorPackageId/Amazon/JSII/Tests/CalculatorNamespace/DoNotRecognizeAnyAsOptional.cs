using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>jsii#284: do not recognize "any" as an optional argument.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DoNotRecognizeAnyAsOptional), fullyQualifiedName: "jsii-calc.DoNotRecognizeAnyAsOptional")]
    public class DoNotRecognizeAnyAsOptional : DeputyBase
    {
        public DoNotRecognizeAnyAsOptional(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected DoNotRecognizeAnyAsOptional(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected DoNotRecognizeAnyAsOptional(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "method", parametersJson: "[{\"name\":\"_requiredAny\",\"type\":{\"primitive\":\"any\"}},{\"name\":\"_optionalAny\",\"optional\":true,\"type\":{\"primitive\":\"any\"}},{\"name\":\"_optionalString\",\"optional\":true,\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void Method(object requiredAny, object? optionalAny = null, string? optionalString = null)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(object), typeof(object), typeof(string)}, new object?[]{requiredAny, optionalAny, optionalString});
        }
    }
}
