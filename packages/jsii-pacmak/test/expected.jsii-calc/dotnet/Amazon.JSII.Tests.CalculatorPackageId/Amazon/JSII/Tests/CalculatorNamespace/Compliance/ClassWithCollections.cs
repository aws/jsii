using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ClassWithCollections), fullyQualifiedName: "jsii-calc.compliance.ClassWithCollections", parametersJson: "[{\"name\":\"map\",\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"map\"}}},{\"name\":\"array\",\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}}]")]
    public class ClassWithCollections : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public ClassWithCollections(System.Collections.Generic.IDictionary<string, string> map, string[] array): base(new DeputyProps(new object[]{map, array}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithCollections(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithCollections(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "createAList", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}}")]
        public static string[] CreateAList()
        {
            return InvokeStaticMethod<string[]>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ClassWithCollections), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "createAMap", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"map\"}}}")]
        public static System.Collections.Generic.IDictionary<string, string> CreateAMap()
        {
            return InvokeStaticMethod<System.Collections.Generic.IDictionary<string, string>>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ClassWithCollections), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "staticArray", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}")]
        public static string[] StaticArray
        {
            get => GetStaticProperty<string[]>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ClassWithCollections));
            set => SetStaticProperty(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ClassWithCollections), value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "staticMap", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"map\"}}")]
        public static System.Collections.Generic.IDictionary<string, string> StaticMap
        {
            get => GetStaticProperty<System.Collections.Generic.IDictionary<string, string>>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ClassWithCollections));
            set => SetStaticProperty(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.ClassWithCollections), value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "array", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}")]
        public virtual string[] Array
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "map", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"map\"}}")]
        public virtual System.Collections.Generic.IDictionary<string, string> Map
        {
            get => GetInstanceProperty<System.Collections.Generic.IDictionary<string, string>>();
            set => SetInstanceProperty(value);
        }
    }
}
