using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is the first struct we have created in jsii.</summary>
    /// <remarks>
    /// stability: Deprecated
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IMyFirstStruct), fullyQualifiedName: "@scope/jsii-calc-lib.MyFirstStruct")]
    [System.Obsolete()]
    public interface IMyFirstStruct
    {
        /// <summary>An awesome number value.</summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "anumber", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        double Anumber
        {
            get;
        }

        /// <summary>A string value.</summary>
        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "astring", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete()]
        string Astring
        {
            get;
        }

        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "firstOptional", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}", isOptional: true)]
        [System.Obsolete()]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        string[] FirstOptional
        {
            get
            {
                return null;
            }
        }
    }
}
