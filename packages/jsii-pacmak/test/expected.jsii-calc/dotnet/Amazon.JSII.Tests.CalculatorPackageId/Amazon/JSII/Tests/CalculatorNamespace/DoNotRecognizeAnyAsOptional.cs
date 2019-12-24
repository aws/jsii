using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>jsii#284: do not recognize "any" as an optional argument.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DoNotRecognizeAnyAsOptional), fullyQualifiedName: "jsii-calc.DoNotRecognizeAnyAsOptional")]
    public class DoNotRecognizeAnyAsOptional : DeputyBase
    {
        /// <summary></summary>
        public DoNotRecognizeAnyAsOptional(): base(new DeputyProps(new object[]{}))
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
>>>>>>> origin/master
        protected DoNotRecognizeAnyAsOptional(ByRefValue reference): base(reference)
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
>>>>>>> origin/master
        protected DoNotRecognizeAnyAsOptional(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="requiredAny"></param>
        /// <param name="optionalAny"></param>
        /// <param name="optionalString"></param>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "method", parametersJson: "[{\"name\":\"_requiredAny\",\"type\":{\"primitive\":\"any\"}},{\"name\":\"_optionalAny\",\"optional\":true,\"type\":{\"primitive\":\"any\"}},{\"name\":\"_optionalString\",\"optional\":true,\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void Method(object requiredAny, object optionalAny = null, string optionalString = null)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(object), typeof(object), typeof(string)}, new object[]{requiredAny, optionalAny, optionalString});
        }
    }
}
