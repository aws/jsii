using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>A struct which derives from another struct.</summary>
    [JsiiInterface(nativeType: typeof(IDerivedStruct), fullyQualifiedName: "jsii-calc.DerivedStruct")]
    public interface IDerivedStruct : IMyFirstStruct
    {
        [JsiiProperty(name: "anotherRequired", typeJson: "{\"primitive\":\"date\"}")]
        System.DateTime AnotherRequired
        {
            get;
        }

        [JsiiProperty(name: "bool", typeJson: "{\"primitive\":\"boolean\"}")]
        bool Bool
        {
            get;
        }

        /// <summary>An example of a non primitive property.</summary>
        [JsiiProperty(name: "nonPrimitive", typeJson: "{\"fqn\":\"jsii-calc.DoubleTrouble\"}")]
        Amazon.JSII.Tests.CalculatorNamespace.DoubleTrouble NonPrimitive
        {
            get;
        }

        /// <summary>This is optional.</summary>
        [JsiiProperty(name: "anotherOptional", typeJson: "{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"},\"kind\":\"map\"}}", isOptional: true)]
        System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_> AnotherOptional
        {
            get;
        }

        [JsiiProperty(name: "optionalAny", typeJson: "{\"primitive\":\"any\"}", isOptional: true)]
        object OptionalAny
        {
            get;
        }

        [JsiiProperty(name: "optionalArray", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}", isOptional: true)]
        string[] OptionalArray
        {
            get;
        }
    }
}
