using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Statics), fullyQualifiedName: "jsii-calc.Statics", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
    public class Statics : DeputyBase
    {
        public Statics(string @value): base(new DeputyProps(new object[]{@value}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Statics(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Statics(DeputyProps props): base(props)
        {
        }

        /// <summary>Jsdocs for static method.</summary>
        /// <param name="name">The name of the person to say hello to.</param>
        [JsiiMethod(name: "staticMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"docs\":{\"summary\":\"The name of the person to say hello to.\"},\"name\":\"name\",\"type\":{\"primitive\":\"string\"}}]")]
        public static string StaticMethod(string name)
        {
            return InvokeStaticMethod<string>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Statics), new System.Type[]{typeof(string)}, new object[]{name});
        }

        [JsiiMethod(name: "justMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string JustMethod()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <summary>Constants may also use all-caps.</summary>
        [JsiiProperty(name: "BAR", typeJson: "{\"primitive\":\"number\"}")]
        public static double BAR
        {
            get;
        }
        = GetStaticProperty<double>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Statics));

        [JsiiProperty(name: "ConstObj", typeJson: "{\"fqn\":\"jsii-calc.DoubleTrouble\"}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.DoubleTrouble ConstObj
        {
            get;
        }
        = GetStaticProperty<Amazon.JSII.Tests.CalculatorNamespace.DoubleTrouble>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Statics));

        /// <summary>Jsdocs for static property.</summary>
        [JsiiProperty(name: "Foo", typeJson: "{\"primitive\":\"string\"}")]
        public static string Foo
        {
            get;
        }
        = GetStaticProperty<string>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Statics));

        /// <summary>Constants can also use camelCase.</summary>
        [JsiiProperty(name: "zooBar", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"map\"}}")]
        public static System.Collections.Generic.IDictionary<string, string> ZooBar
        {
            get;
        }
        = GetStaticProperty<System.Collections.Generic.IDictionary<string, string>>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Statics));

        /// <summary>Jsdocs for static getter.</summary>
        /// <remarks>
        /// Jsdocs for static setter.
        /// </remarks>
        [JsiiProperty(name: "instance", typeJson: "{\"fqn\":\"jsii-calc.Statics\"}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.Statics Instance
        {
            get => GetStaticProperty<Amazon.JSII.Tests.CalculatorNamespace.Statics>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Statics));
            set => SetStaticProperty(typeof(Amazon.JSII.Tests.CalculatorNamespace.Statics), value);
        }

        [JsiiProperty(name: "nonConstStatic", typeJson: "{\"primitive\":\"number\"}")]
        public static double NonConstStatic
        {
            get => GetStaticProperty<double>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Statics));
            set => SetStaticProperty(typeof(Amazon.JSII.Tests.CalculatorNamespace.Statics), value);
        }

        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string Value
        {
            get => GetInstanceProperty<string>();
        }
    }
}
