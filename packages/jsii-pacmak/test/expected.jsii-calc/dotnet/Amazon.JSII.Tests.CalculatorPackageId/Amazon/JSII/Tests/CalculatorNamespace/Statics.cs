using Amazon.JSII.Runtime.Deputy;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(Statics), "jsii-calc.Statics", "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
    public class Statics : DeputyBase
    {
        public Statics(string value): base(new DeputyProps(new object[]{value}))
        {
        }

        protected Statics(ByRefValue reference): base(reference)
        {
        }

        protected Statics(DeputyProps props): base(props)
        {
        }

        /// <summary>Constants may also use all-caps.</summary>
        [JsiiProperty(name: "BAR", typeJson: "{\"primitive\":\"number\"}")]
        public static double BAR
        {
            get;
        }

        = GetStaticProperty<double>(typeof(Statics));
        [JsiiProperty(name: "ConstObj", typeJson: "{\"fqn\":\"jsii-calc.DoubleTrouble\"}")]
        public static DoubleTrouble ConstObj
        {
            get;
        }

        = GetStaticProperty<DoubleTrouble>(typeof(Statics));
        /// <summary>Jsdocs for static property.</summary>
        [JsiiProperty(name: "Foo", typeJson: "{\"primitive\":\"string\"}")]
        public static string Foo
        {
            get;
        }

        = GetStaticProperty<string>(typeof(Statics));
        /// <summary>Constants can also use camelCase.</summary>
        [JsiiProperty(name: "zooBar", typeJson: "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"primitive\":\"string\"}}}")]
        public static IDictionary<string, string> ZooBar
        {
            get;
        }

        = GetStaticProperty<IDictionary<string, string>>(typeof(Statics));
        /// <summary>Jsdocs for static getter. Jsdocs for static setter.</summary>
        [JsiiProperty(name: "instance", typeJson: "{\"fqn\":\"jsii-calc.Statics\"}")]
        public static Statics Instance
        {
            get => GetStaticProperty<Statics>(typeof(Statics));
            set => SetStaticProperty(typeof(Statics), value);
        }

        [JsiiProperty(name: "nonConstStatic", typeJson: "{\"primitive\":\"number\"}")]
        public static double NonConstStatic
        {
            get => GetStaticProperty<double>(typeof(Statics));
            set => SetStaticProperty(typeof(Statics), value);
        }

        [JsiiProperty(name: "value", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string Value
        {
            get => GetInstanceProperty<string>();
        }

        /// <summary>Jsdocs for static method.</summary>
        /// <param name = "name">The name of the person to say hello to.</param>
        [JsiiMethod(name: "staticMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"name\",\"type\":{\"primitive\":\"string\"}}]")]
        public static string StaticMethod(string name)
        {
            return InvokeStaticMethod<string>(typeof(Statics), new object[]{name});
        }

        [JsiiMethod(name: "justMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[]")]
        public virtual string JustMethod()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }
    }
}