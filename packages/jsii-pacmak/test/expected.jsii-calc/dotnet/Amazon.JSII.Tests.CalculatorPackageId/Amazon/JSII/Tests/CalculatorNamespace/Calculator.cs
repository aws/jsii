using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.composition;
using Amazon.JSII.Tests.CalculatorNamespace.LibNamespace;
using System.Collections.Generic;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>summary: A calculator which maintains a current value and allows adding operations.</remarks>
    [JsiiClass(typeof(Calculator), "jsii-calc.Calculator", "[{\"name\":\"props\",\"type\":{\"fqn\":\"jsii-calc.CalculatorProps\",\"optional\":true}}]")]
    public class Calculator : CompositeOperation_
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

        /// <remarks>summary: Returns the expression.</remarks>
        [JsiiProperty("expression", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Value_ Expression
        {
            get => GetInstanceProperty<Value_>();
        }

        /// <remarks>summary: A log of all operations.</remarks>
        [JsiiProperty("operationsLog", "{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}")]
        public virtual Value_[] OperationsLog
        {
            get => GetInstanceProperty<Value_[]>();
        }

        /// <remarks>summary: A map of per operation name of all operations performed.</remarks>
        [JsiiProperty("operationsMap", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"}}}}}")]
        public virtual IDictionary<string, Value_[]> OperationsMap
        {
            get => GetInstanceProperty<IDictionary<string, Value_[]>>();
        }

        /// <remarks>summary: The current value.</remarks>
        [JsiiProperty("curr", "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Value_ Curr
        {
            get => GetInstanceProperty<Value_>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>summary: The maximum value allows in this calculator.</remarks>
        [JsiiProperty("maxValue", "{\"primitive\":\"number\",\"optional\":true}")]
        public virtual double? MaxValue
        {
            get => GetInstanceProperty<double? >();
            set => SetInstanceProperty(value);
        }

        /// <remarks>summary: Example of a property that accepts a union of types.</remarks>
        [JsiiProperty("unionProperty", "{\"union\":{\"types\":[{\"fqn\":\"jsii-calc.Add\"},{\"fqn\":\"jsii-calc.Multiply\"},{\"fqn\":\"jsii-calc.Power\"}]},\"optional\":true}")]
        public virtual object UnionProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>summary: Adds a number to the current value.</remarks>
        [JsiiMethod("add", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Add(double value)
        {
            InvokeInstanceVoidMethod(new object[]{value});
        }

        /// <remarks>summary: Multiplies the current value by a number.</remarks>
        [JsiiMethod("mul", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Mul(double value)
        {
            InvokeInstanceVoidMethod(new object[]{value});
        }

        /// <remarks>summary: Negates the current value.</remarks>
        [JsiiMethod("neg", null, "[]")]
        public virtual void Neg()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        /// <remarks>summary: Raises the current value by a power.</remarks>
        [JsiiMethod("pow", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Pow(double value)
        {
            InvokeInstanceVoidMethod(new object[]{value});
        }

        /// <remarks>summary: Returns teh value of the union property (if defined).</remarks>
        [JsiiMethod("readUnionValue", "{\"primitive\":\"number\"}", "[]")]
        public virtual double ReadUnionValue()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }
    }
}