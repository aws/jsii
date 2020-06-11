using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Ensures submodule-imported types from dependencies can be used correctly.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.UpcasingReflectable), fullyQualifiedName: "jsii-calc.UpcasingReflectable", parametersJson: "[{\"name\":\"delegate\",\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"map\"}}}]")]
    public class UpcasingReflectable : DeputyBase, Amazon.JSII.Tests.CustomSubmoduleName.IReflectable
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public UpcasingReflectable(System.Collections.Generic.IDictionary<string, object> @delegate): base(new DeputyProps(new object[]{@delegate}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected UpcasingReflectable(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected UpcasingReflectable(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "reflector", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.submodule.Reflector\"}")]
        public static Amazon.JSII.Tests.CustomSubmoduleName.Reflector Reflector
        {
            get;
        }
        = GetStaticProperty<Amazon.JSII.Tests.CustomSubmoduleName.Reflector>(typeof(Amazon.JSII.Tests.CalculatorNamespace.UpcasingReflectable));

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "entries", typeJson: "{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.submodule.ReflectableEntry\"},\"kind\":\"array\"}}")]
        public virtual Amazon.JSII.Tests.CustomSubmoduleName.IReflectableEntry[] Entries
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CustomSubmoduleName.IReflectableEntry[]>();
        }
    }
}
