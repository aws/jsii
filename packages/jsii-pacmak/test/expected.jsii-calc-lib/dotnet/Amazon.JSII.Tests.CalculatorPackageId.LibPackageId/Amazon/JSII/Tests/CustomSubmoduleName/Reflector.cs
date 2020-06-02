using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CustomSubmoduleName
{
    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CustomSubmoduleName.Reflector), fullyQualifiedName: "@scope/jsii-calc-lib.submodule.Reflector")]
    [System.Obsolete()]
    public class Reflector : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [System.Obsolete()]
        public Reflector(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.Obsolete()]
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Reflector(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.Obsolete()]
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Reflector(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiMethod(name: "asMap", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"map\"}}}", parametersJson: "[{\"name\":\"reflectable\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.submodule.IReflectable\"}}]")]
        [System.Obsolete()]
        public virtual System.Collections.Generic.IDictionary<string, object> AsMap(Amazon.JSII.Tests.CustomSubmoduleName.IReflectable reflectable)
        {
            return InvokeInstanceMethod<System.Collections.Generic.IDictionary<string, object>>(new System.Type[]{typeof(Amazon.JSII.Tests.CustomSubmoduleName.IReflectable)}, new object[]{reflectable});
        }
    }
}
