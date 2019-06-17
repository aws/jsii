using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
{
    /// <summary>This is the first struct we have created in jsii.</summary>
    /// <remarks>
    /// stability: deprecated
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IMyFirstStruct), fullyQualifiedName: "@scope/jsii-calc-lib.MyFirstStruct")]
    [System.Obsolete()]
    public interface IMyFirstStruct
    {
        /// <summary>An awesome number value.</summary>
        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiProperty(name: "anumber", typeJson: "{\"primitive\":\"number\"}")]
        [System.Obsolete()]
        double Anumber
        {
            get;
        }

        /// <summary>A string value.</summary>
        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiProperty(name: "astring", typeJson: "{\"primitive\":\"string\"}")]
        [System.Obsolete()]
        string Astring
        {
            get;
        }

        /// <remarks>
        /// stability: deprecated
        /// </remarks>
        [JsiiProperty(name: "firstOptional", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}", isOptional: true)]
        [System.Obsolete()]
        string[] FirstOptional
        {
            get;
        }
    }
}
