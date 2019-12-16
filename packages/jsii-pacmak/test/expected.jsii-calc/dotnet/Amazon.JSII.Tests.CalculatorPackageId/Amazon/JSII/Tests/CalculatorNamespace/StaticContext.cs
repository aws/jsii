using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This is used to validate the ability to use `this` from within a static context.</summary>
    /// <remarks>
    /// https://github.com/awslabs/aws-cdk/issues/2304
    /// 
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.StaticContext), fullyQualifiedName: "jsii-calc.StaticContext")]
    public class StaticContext : DeputyBase
    {
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected StaticContext(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected StaticContext(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "canAccessStaticContext", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}")]
        public static bool CanAccessStaticContext()
        {
            return InvokeStaticMethod<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.StaticContext), new System.Type[]{}, new object[]{});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "staticVariable", typeJson: "{\"primitive\":\"boolean\"}")]
        public static bool StaticVariable
        {
            get => GetStaticProperty<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.StaticContext));
            set => SetStaticProperty(typeof(Amazon.JSII.Tests.CalculatorNamespace.StaticContext), value);
        }
    }
}
