using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>A struct which derives from another struct.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(IDerivedStruct), fullyQualifiedName: "jsii-calc.DerivedStruct")]
    public interface IDerivedStruct : Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "anotherRequired", typeJson: "{\"primitive\":\"date\"}")]
        System.DateTime AnotherRequired
        {
            get;
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "bool", typeJson: "{\"primitive\":\"boolean\"}")]
        bool Bool
        {
            get;
        }

        /// <summary>An example of a non primitive property.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "nonPrimitive", typeJson: "{\"fqn\":\"jsii-calc.DoubleTrouble\"}")]
        Amazon.JSII.Tests.CalculatorNamespace.DoubleTrouble NonPrimitive
        {
            get;
        }

        /// <summary>This is optional.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "anotherOptional", typeJson: "{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"},\"kind\":\"map\"}}", isOptional: true)]
        System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_> AnotherOptional
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
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "optionalAny", typeJson: "{\"primitive\":\"any\"}", isOptional: true)]
        object OptionalAny
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
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "optionalArray", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}", isOptional: true)]
        string[] OptionalArray
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
