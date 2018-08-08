using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.Calculator.composition;
using Amazon.JSII.Tests.Calculator.Lib;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.Calculator
{
    /// <summary>A calculator which maintains a current value and allows adding operations.</summary>
    [JsiiClass(typeof(Calculator_), "jsii-calc.Calculator", "[{\"name\":\"props\",\"type\":{\"fqn\":\"jsii-calc.CalculatorProps\",\"optional\":true}}]")]
    public class Calculator_ : CompositeOperation
    {
        public Calculator_(ICalculatorProps props): base(new DeputyProps(new object[]{props}))
        {
        }

        protected Calculator_(ByRefValue reference): base(reference)
        {
        }

        protected Calculator_(DeputyProps props): base(props)
        {
        }

        /// <summary>The current value.</summary>
        [JsiiProperty("curr", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Curr
        {
            get => GetInstanceProperty<Value_>();
            set => SetInstanceProperty(value);
        }

        /// <summary>A map of per operation name of all operations performed.</summary>
        [JsiiProperty("operationsMap", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}}}")]
        public virtual IDictionary<string, Value_[]> OperationsMap
        {
            get => GetInstanceProperty<IDictionary<string, Value_[]>>();
        }

        /// <summary>A log of all operations.</summary>
        [JsiiProperty("operationsLog", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}")]
        public virtual Value_[] OperationsLog
        {
            get => GetInstanceProperty<Value_[]>();
        }

        /// <summary>The maximum value allows in this calculator.</summary>
        [JsiiProperty("maxValue", "{\"primitive\":\"number\",\"optional\":true}")]
        public virtual double? MaxValue
        {
            get => GetInstanceProperty<double? >();
            set => SetInstanceProperty(value);
        }

        /// <summary>Returns the expression.</summary>
        [JsiiProperty("expression", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Value_ Expression
        {
            get => GetInstanceProperty<Value_>();
        }

        /// <summary>Example of a property that accepts a union of types.</summary>
        [JsiiProperty("unionProperty", "{\"union\":{\"types\":[{\"fqn\":\"jsii-calc.Add\"},{\"fqn\":\"jsii-calc.Multiply\"},{\"fqn\":\"jsii-calc.Power\"}]},\"optional\":true}")]
        public virtual object UnionProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }

        /// <summary>Adds a number to the current value.</summary>
        [JsiiMethod("add", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Add(double value)
        {
            InvokeInstanceVoidMethod(new object[]{value});
        }

        /// <summary>Multiplies the current value by a number.</summary>
        [JsiiMethod("mul", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Mul(double value)
        {
            InvokeInstanceVoidMethod(new object[]{value});
        }

        /// <summary>Raises the current value by a power.</summary>
        [JsiiMethod("pow", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Pow(double value)
        {
            InvokeInstanceVoidMethod(new object[]{value});
        }

        /// <summary>Negates the current value.</summary>
        [JsiiMethod("neg", null, "[]")]
        public virtual void Neg()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        /// <summary>Returns teh value of the union property (if defined).</summary>
        [JsiiMethod("readUnionValue", "{\"primitive\":\"number\"}", "[]")]
        public virtual double ReadUnionValue()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}