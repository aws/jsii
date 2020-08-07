using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verifies that collections of interfaces or structs are correctly handled. (experimental)</summary>
    /// <remarks>
    /// See: https://github.com/aws/jsii/issues/1196
    /// 
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.InterfaceCollections), fullyQualifiedName: "jsii-calc.InterfaceCollections")]
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

        /// <summary> (experimental)</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "listOfInterfaces", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"jsii-calc.IBell\"},\"kind\":\"array\"}}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IBell[] ListOfInterfaces()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IBell[]>(typeof(Amazon.JSII.Tests.CalculatorNamespace.InterfaceCollections), new System.Type[]{}, new object[]{});
        }

        /// <summary> (experimental)</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "listOfStructs", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"jsii-calc.StructA\"},\"kind\":\"array\"}}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IStructA[] ListOfStructs()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IStructA[]>(typeof(Amazon.JSII.Tests.CalculatorNamespace.InterfaceCollections), new System.Type[]{}, new object[]{});
        }

        /// <summary> (experimental)</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "mapOfInterfaces", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"jsii-calc.IBell\"},\"kind\":\"map\"}}}")]
        public static System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.IBell> MapOfInterfaces()
        {
            return InvokeStaticMethod<System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.IBell>>(typeof(Amazon.JSII.Tests.CalculatorNamespace.InterfaceCollections), new System.Type[]{}, new object[]{});
        }

        /// <summary> (experimental)</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "mapOfStructs", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"fqn\":\"jsii-calc.StructA\"},\"kind\":\"map\"}}}")]
        public static System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.IStructA> MapOfStructs()
        {
            return InvokeStaticMethod<System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.IStructA>>(typeof(Amazon.JSII.Tests.CalculatorNamespace.InterfaceCollections), new System.Type[]{}, new object[]{});
        }
    }
}
