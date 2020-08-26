using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Submodule.Isolated
{
    /// <summary>Ensures imports are correctly registered for kwargs lifted properties from super-structs.</summary>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Submodule.Isolated.Kwargs), fullyQualifiedName: "jsii-calc.submodule.isolated.Kwargs")]
    public class Kwargs : DeputyBase
    {
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Kwargs(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Kwargs(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "method", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"props\",\"optional\":true,\"type\":{\"fqn\":\"jsii-calc.submodule.child.KwargsProps\"}}]")]
        public static bool Method(Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.IKwargsProps? props = null)
        {
            return InvokeStaticMethod<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Submodule.Isolated.Kwargs), new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.Submodule.Child.IKwargsProps)}, new object?[]{props});
        }
    }
}
