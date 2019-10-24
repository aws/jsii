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
        string Optional1
        {
            #if NETCOREAPP3_0
            get
            {
                return null;
            }
            #else
            get;
            #endif
        }

        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "optional2", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [System.Obsolete()]
        double? Optional2
        {
            #if NETCOREAPP3_0
            get
            {
                return null;
            }
            #else
            get;
            #endif
        }

        /// <remarks>
        /// stability: Deprecated
        /// </remarks>
        [JsiiProperty(name: "optional3", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true)]
        [System.Obsolete()]
        bool? Optional3
        {
            #if NETCOREAPP3_0
            get
            {
                return null;
            }
            #else
            get;
            #endif
        }
    }
}
