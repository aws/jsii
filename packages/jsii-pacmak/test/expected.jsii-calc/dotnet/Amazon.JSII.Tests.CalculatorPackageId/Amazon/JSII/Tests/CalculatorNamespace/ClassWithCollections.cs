using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithCollections), fullyQualifiedName: "jsii-calc.ClassWithCollections", parametersJson: "[{\"name\":\"map\",\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"map\"}}},{\"name\":\"array\",\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}}]")]
    public class ClassWithCollections : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public ClassWithCollections(System.Collections.Generic.IDictionary<string, string> map, string[] array): base(new DeputyProps(new object[]{map, array}))
        {
        }

        protected ClassWithCollections(ByRefValue reference): base(reference)
        {
        }

        protected ClassWithCollections(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "createAList", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}}")]
        public static string[] CreateAList()
        {
            return InvokeStaticMethod<string[]>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithCollections), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "createAMap", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"map\"}}}")]
        public static System.Collections.Generic.IDictionary<string, string> CreateAMap()
        {
            return InvokeStaticMethod<System.Collections.Generic.IDictionary<string, string>>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithCollections), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "staticArray", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}")]
        public static string[] StaticArray
        {
            get => GetStaticProperty<string[]>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithCollections));
            set => SetStaticProperty(typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithCollections), value);
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "staticMap", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"map\"}}")]
        public static System.Collections.Generic.IDictionary<string, string> StaticMap
        {
            get => GetStaticProperty<System.Collections.Generic.IDictionary<string, string>>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithCollections));
            set => SetStaticProperty(typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithCollections), value);
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "array", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}")]
        public virtual string[] Array
        {
            get => GetInstanceProperty<string[]>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "map", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"map\"}}")]
        public virtual System.Collections.Generic.IDictionary<string, string> Map
        {
            get => GetInstanceProperty<System.Collections.Generic.IDictionary<string, string>>();
            set => SetInstanceProperty(value);
        }
    }
}
