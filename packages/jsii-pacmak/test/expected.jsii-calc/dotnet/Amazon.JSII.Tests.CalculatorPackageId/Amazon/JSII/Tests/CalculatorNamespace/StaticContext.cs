using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>This is used to validate the ability to use `this` from within a static context.</summary>
    /// <remarks>
    /// https://github.com/awslabs/aws-cdk/issues/2304
    /// </remarks>
    [JsiiClass(nativeType: typeof(StaticContext), fullyQualifiedName: "jsii-calc.StaticContext")]
    public class StaticContext : DeputyBase
    {
        protected StaticContext(ByRefValue reference): base(reference)
        {
        }

        protected StaticContext(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "canAccessStaticContext", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}")]
        public static bool CanAccessStaticContext()
        {
            return InvokeStaticMethod<bool>(typeof(StaticContext), new object[]{});
        }

        [JsiiProperty(name: "staticVariable", typeJson: "{\"primitive\":\"boolean\"}")]
        public static bool StaticVariable
        {
            get => GetStaticProperty<bool>(typeof(StaticContext));
            set => SetStaticProperty(typeof(StaticContext), value);
        }
    }
}
