using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is a struct with only optional properties.</summary>
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IStructWithOnlyOptionals), fullyQualifiedName: "@scope/jsii-calc-lib.StructWithOnlyOptionals")]
    [System.Obsolete()]
    public interface IStructWithOnlyOptionals
    {
        /// <summary>The first optional!</summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "optional1", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        [System.Obsolete()]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        string Optional1
        {
            get
            {
                return null;
            }
        }

        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "optional2", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [System.Obsolete()]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        double? Optional2
        {
            get
            {
                return null;
            }
        }

        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "optional3", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true)]
        [System.Obsolete()]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        bool? Optional3
        {
            get
            {
                return null;
            }
        }
    }
}
