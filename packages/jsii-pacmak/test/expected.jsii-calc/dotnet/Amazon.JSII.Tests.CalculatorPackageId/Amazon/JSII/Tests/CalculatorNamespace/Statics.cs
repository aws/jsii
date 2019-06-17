using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Statics), fullyQualifiedName: "jsii-calc.Statics", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
    public class Statics : DeputyBase
    {
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        public Statics(string @value): base(new DeputyProps(new object[]{@value}))
        {
        }

        protected Statics(ByRefValue reference): base(reference)
        {
        }

        protected Statics(DeputyProps props): base(props)
        {
        }

        /// <summary>Jsdocs for static method.</summary>
        /// <param name = "name">The name of the person to say hello to.</param>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "staticMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"docs\":{\"summary\":\"The name of the person to say hello to.\"},\"name\":\"name\",\"type\":{\"primitive\":\"string\"}}]")]
        public static string StaticMethod(string name)
        {
            return InvokeStaticMethod<string>(typeof(Statics), new object[]{name});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "justMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string JustMethod()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        /// <summary>Constants may also use all-caps.</summary>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "BAR", typeJson: "{\"primitive\":\"number\"}")]
        public static double BAR
        {
            get;
        }
        = GetStaticProperty<double>(typeof(Statics));

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "ConstObj", typeJson: "{\"fqn\":\"jsii-calc.DoubleTrouble\"}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.DoubleTrouble ConstObj
        {
            get;
        }
        = GetStaticProperty<Amazon.JSII.Tests.CalculatorNamespace.DoubleTrouble>(typeof(Statics));

        /// <summary>Jsdocs for static property.</summary>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "Foo", typeJson: "{\"primitive\":\"string\"}")]
        public static string Foo
        {
            get;
        }
        = GetStaticProperty<string>(typeof(Statics));

        /// <summary>Constants can also use camelCase.</summary>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "zooBar", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"map\"}}")]
        public static System.Collections.Generic.IDictionary<string, string> ZooBar
        {
            get;
        }
        = GetStaticProperty<System.Collections.Generic.IDictionary<string, string>>(typeof(Statics));

        /// <summary>Jsdocs for static getter. Jsdocs for static setter.</summary>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "instance", typeJson: "{\"fqn\":\"jsii-calc.Statics\"}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.Statics Instance
        {
            get => GetStaticProperty<Amazon.JSII.Tests.CalculatorNamespace.Statics>(typeof(Statics));
            set => SetStaticProperty(typeof(Statics), value);
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "nonConstStatic", typeJson: "{\"primitive\":\"number\"}")]
        public static double NonConstStatic
        {
            get => GetStaticProperty<double>(typeof(Statics));
            set => SetStaticProperty(typeof(Statics), value);
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string Value
        {
            get => GetInstanceProperty<string>();
        }
    }
}
