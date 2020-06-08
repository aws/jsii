using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>See https://github.com/aws/aws-cdk/issues/7977.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiTypeProxy(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.BurriedAnonymousObject), fullyQualifiedName: "jsii-calc.BurriedAnonymousObject")]
    internal sealed class BurriedAnonymousObjectProxy : Amazon.JSII.Tests.CalculatorNamespace.BurriedAnonymousObject
    {
        private BurriedAnonymousObjectProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Implement this method and have it return it's parameter.</summary>
        /// <param name="value">the value that should be returned.</param>
        /// <returns>`value`</returns>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "giveItBack", returnsJson: "{\"type\":{\"primitive\":\"any\"}}", parametersJson: "[{\"docs\":{\"summary\":\"the value that should be returned.\"},\"name\":\"value\",\"type\":{\"primitive\":\"any\"}}]")]
        public override object GiveItBack(object @value)
        {
            return InvokeInstanceMethod<object>(new System.Type[]{typeof(object)}, new object[]{@value});
        }
    }
}
