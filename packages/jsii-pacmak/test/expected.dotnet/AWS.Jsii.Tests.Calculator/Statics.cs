using AWS.Jsii.Runtime.Deputy;
using System.Collections.Generic;

namespace AWS.Jsii.Tests.Calculator
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

        [JsiiProperty("value", "{\"primitive\":\"string\"}")]
        public virtual string Value
        {
            get => GetProperty<string>();
        }

        /// <summary>Jsdocs for static property.</summary>
        [JsiiProperty("Foo", "{\"primitive\":\"string\"}")]
        public virtual string Foo
        {
            get => GetProperty<string>();
        }

        /// <summary>Constants may also use all-caps.</summary>
        [JsiiProperty("BAR", "{\"primitive\":\"number\"}")]
        public virtual double BAR
        {
            get => GetProperty<double>();
        }

        /// <summary>Constants can also use camelCase.</summary>
        [JsiiProperty("zooBar", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"primitive\":\"string\"}}}")]
        public virtual IDictionary<string, string> ZooBar
        {
            get => GetProperty<IDictionary<string, string>>();
        }

        /// <summary>
        /// Jsdocs for static getter.
        /// Jsdocs for static setter.
        /// </summary>
        [JsiiProperty("instance", "{\"fqn\":\"jsii-calc.Statics\"}")]
        public virtual Statics Instance
        {
            get => GetProperty<Statics>();
            set => SetProperty(value);
        }

        [JsiiProperty("nonConstStatic", "{\"primitive\":\"number\"}")]
        public virtual double NonConstStatic
        {
            get => GetProperty<double>();
            set => SetProperty(value);
        }

        [JsiiProperty("ConstObj", "{\"fqn\":\"jsii-calc.DoubleTrouble\"}")]
        public virtual DoubleTrouble ConstObj
        {
            get => GetProperty<DoubleTrouble>();
        }

        /// <summary>Jsdocs for static method</summary>
        /// <param name = "name">The name of the person to say hello to</param>
        [JsiiMethod("staticMethod", "{\"primitive\":\"string\"}", "[{\"name\":\"name\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string StaticMethod(string name)
        {
            return InvokeMethod<string>(new object[]{name});
        }

        [JsiiMethod("justMethod", "{\"primitive\":\"string\"}", "[]")]
        public virtual string JustMethod()
        {
            return InvokeMethod<string>(new object[]{});
        }
    }
}