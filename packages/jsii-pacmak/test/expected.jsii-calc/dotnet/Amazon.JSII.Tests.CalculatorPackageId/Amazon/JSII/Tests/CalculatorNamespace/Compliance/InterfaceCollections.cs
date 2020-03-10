using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>Verifies that collections of interfaces or structs are correctly handled.</summary>
    /// <remarks>
    /// See: https://github.com/aws/jsii/issues/1196
    /// 
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.InterfaceCollections), fullyQualifiedName: "jsii-calc.compliance.InterfaceCollections")]
    public class InterfaceCollections : DeputyBase
    {
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected InterfaceCollections(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected InterfaceCollections(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "listOfInterfaces", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"jsii-calc.compliance.IBell\"},\"kind\":\"array\"}}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.Compliance.IBell[] ListOfInterfaces()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.IBell[]>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.InterfaceCollections), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "listOfStructs", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"jsii-calc.compliance.StructA\"},\"kind\":\"array\"}}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructA[] ListOfStructs()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructA[]>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.InterfaceCollections), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "mapOfInterfaces", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"jsii-calc.compliance.IBell\"},\"kind\":\"map\"}}}")]
        public static System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IBell> MapOfInterfaces()
        {
            return InvokeStaticMethod<System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IBell>>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.InterfaceCollections), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "mapOfStructs", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"jsii-calc.compliance.StructA\"},\"kind\":\"map\"}}}")]
        public static System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructA> MapOfStructs()
        {
            return InvokeStaticMethod<System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.Compliance.IStructA>>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.InterfaceCollections), new System.Type[]{}, new object[]{});
        }
    }
}
