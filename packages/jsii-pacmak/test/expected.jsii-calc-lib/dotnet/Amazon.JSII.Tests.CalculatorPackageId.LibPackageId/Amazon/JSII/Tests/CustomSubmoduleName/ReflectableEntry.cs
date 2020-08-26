using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CustomSubmoduleName
{
    #pragma warning disable CS8618

    /// <summary>(deprecated)</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Deprecated
    /// </remarks>
    [JsiiByValue(fqn: "@scope/jsii-calc-lib.submodule.ReflectableEntry")]
    public class ReflectableEntry : Amazon.JSII.Tests.CustomSubmoduleName.IReflectableEntry
    {
        /// <summary>(deprecated)</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "key", typeJson: "{\"primitive\":\"string\"}", isOverride: true)]
        [System.Obsolete()]
        public string Key
        {
            get;
            set;
        }

        /// <summary>(deprecated)</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Deprecated
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"any\"}", isOverride: true)]
        [System.Obsolete()]
        public object Value
        {
            get;
            set;
        }
    }
}
