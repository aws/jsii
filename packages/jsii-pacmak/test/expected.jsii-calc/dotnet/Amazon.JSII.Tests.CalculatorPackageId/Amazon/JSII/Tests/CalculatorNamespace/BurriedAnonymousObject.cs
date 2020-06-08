using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>See https://github.com/aws/aws-cdk/issues/7977.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.BurriedAnonymousObject), fullyQualifiedName: "jsii-calc.BurriedAnonymousObject")]
    public abstract class BurriedAnonymousObject : DeputyBase
    {
        protected BurriedAnonymousObject(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected BurriedAnonymousObject(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected BurriedAnonymousObject(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "check", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}")]
        public virtual bool Check()
        {
            return InvokeInstanceMethod<bool>(new System.Type[]{}, new object[]{});
        }

        /// <summary>Implement this method and have it return it's parameter.</summary>
        /// <param name="value">the value that should be returned.</param>
        /// <returns>`value`</returns>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "giveItBack", returnsJson: "{\"type\":{\"primitive\":\"any\"}}", parametersJson: "[{\"docs\":{\"summary\":\"the value that should be returned.\"},\"name\":\"value\",\"type\":{\"primitive\":\"any\"}}]")]
        public abstract object GiveItBack(object @value);

    }
}
