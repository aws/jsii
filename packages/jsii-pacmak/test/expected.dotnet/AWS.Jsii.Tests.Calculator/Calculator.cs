using AWS.Jsii.Runtime.Deputy;
using AWS.Jsii.Tests.Calculator.composition;
using AWS.Jsii.Tests.Calculator.Lib;
using System.Collections.Generic;

namespace AWS.Jsii.Tests.Calculator
{
    /// <summary>A calculator which maintains a current value and allows adding operations.</summary>
    [JsiiClass(typeof(Calculator), "jsii-calc.Calculator", "[{\"name\":\"props\",\"type\":{\"fqn\":\"jsii-calc.CalculatorProps\",\"optional\":true}}]")]
    public class Calculator : CompositeOperation
    {
        public Calculator(ICalculatorProps props): base(new DeputyProps(new object[]{props}))
        {
        }

        protected Calculator(ByRefValue reference): base(reference)
        {
        }

        protected Calculator(DeputyProps props): base(props)
        {
        }

        /// <summary>The current value.</summary>
        [JsiiProperty("curr", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Curr
        {
            get => GetProperty<Value_>();
            set => SetProperty(value);
        }

        /// <summary>A map of per operation name of all operations performed.</summary>
        [JsiiProperty("operationsMap", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}}}")]
        public virtual IDictionary<string, Value_[]> OperationsMap
        {
            get => GetProperty<IDictionary<string, Value_[]>>();
        }

        /// <summary>A log of all operations.</summary>
        [JsiiProperty("operationsLog", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}")]
        public virtual Value_[] OperationsLog
        {
            get => GetProperty<Value_[]>();
        }

        /// <summary>The maximum value allows in this calculator.</summary>
        [JsiiProperty("maxValue", "{\"primitive\":\"number\",\"optional\":true}")]
        public virtual double? MaxValue
        {
            get => GetProperty<double? >();
            set => SetProperty(value);
        }

        /// <summary>Returns the expression.</summary>
        [JsiiProperty("expression", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Value_ Expression
        {
            get => GetProperty<Value_>();
        }

        /// <summary>Example of a property that accepts a union of types.</summary>
        [JsiiProperty("unionProperty", "{\"union\":{\"types\":[{\"fqn\":\"jsii-calc.Add\"},{\"fqn\":\"jsii-calc.Multiply\"},{\"fqn\":\"jsii-calc.Power\"}]},\"optional\":true}")]
        public virtual object UnionProperty
        {
            get => GetProperty<object>();
            set => SetProperty(value);
        }

        /// <summary>Adds a number to the current value.</summary>
        [JsiiMethod("add", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Add(double value)
        {
            InvokeVoidMethod(new object[]{value});
        }

        /// <summary>Multiplies the current value by a number.</summary>
        [JsiiMethod("mul", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Mul(double value)
        {
            InvokeVoidMethod(new object[]{value});
        }

        /// <summary>Raises the current value by a power.</summary>
        [JsiiMethod("pow", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Pow(double value)
        {
            InvokeVoidMethod(new object[]{value});
        }

        /// <summary>Negates the current value.</summary>
        [JsiiMethod("neg", null, "[]")]
        public virtual void Neg()
        {
            InvokeVoidMethod(new object[]{});
        }

        /// <summary>Returns teh value of the union property (if defined).</summary>
        [JsiiMethod("readUnionValue", "{\"primitive\":\"number\"}", "[]")]
        public virtual double ReadUnionValue()
        {
            return InvokeMethod<double>(new object[]{});
        }
    }
}