using Amazon.JSII.Runtime.Deputy;
using Amazon.JSII.Tests.CalculatorNamespace.composition;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>A calculator which maintains a current value and allows adding operations.</summary>
    [JsiiClass(nativeType: typeof(Calculator), fullyQualifiedName: "jsii-calc.Calculator", parametersJson: "[{\"docs\":{\"summary\":\"Initialization properties.\"},\"name\":\"props\",\"optional\":true,\"type\":{\"fqn\":\"jsii-calc.CalculatorProps\"}}]")]
    public class Calculator : CompositeOperation
    {
        public Calculator(Amazon.JSII.Tests.CalculatorNamespace.ICalculatorProps props): base(new DeputyProps(new object[]{props}))
        {
        }

        protected Calculator(ByRefValue reference): base(reference)
        {
        }

        protected Calculator(DeputyProps props): base(props)
        {
        }

        /// <summary>Adds a number to the current value.</summary>
        [JsiiMethod(name: "add", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Add(double @value)
        {
            InvokeInstanceVoidMethod(new object[]{@value});
        }

        /// <summary>Multiplies the current value by a number.</summary>
        [JsiiMethod(name: "mul", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Mul(double @value)
        {
            InvokeInstanceVoidMethod(new object[]{@value});
        }

        /// <summary>Negates the current value.</summary>
        [JsiiMethod(name: "neg")]
        public virtual void Neg()
        {
            InvokeInstanceVoidMethod(new object[]{});
        }

        /// <summary>Raises the current value by a power.</summary>
        [JsiiMethod(name: "pow", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Pow(double @value)
        {
            InvokeInstanceVoidMethod(new object[]{@value});
        }

        /// <summary>Returns teh value of the union property (if defined).</summary>
        [JsiiMethod(name: "readUnionValue", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double ReadUnionValue()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        /// <summary>Returns the expression.</summary>
        [JsiiProperty(name: "expression", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Expression
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
        }

        /// <summary>A log of all operations.</summary>
        [JsiiProperty(name: "operationsLog", typeJson: "{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"},\"kind\":\"array\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[] OperationsLog
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[]>();
        }

        /// <summary>A map of per operation name of all operations performed.</summary>
        [JsiiProperty(name: "operationsMap", typeJson: "{\"collection\":{\"elementtype\":{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"},\"kind\":\"array\"}},\"kind\":\"map\"}}")]
        public virtual System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[]> OperationsMap
        {
            get => GetInstanceProperty<System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[]>>();
        }

        /// <summary>The current value.</summary>
        [JsiiProperty(name: "curr", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Curr
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
            set => SetInstanceProperty(value);
        }

        /// <summary>The maximum value allows in this calculator.</summary>
        [JsiiProperty(name: "maxValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public virtual double? MaxValue
        {
            get => GetInstanceProperty<double?>();
            set => SetInstanceProperty(value);
        }

        /// <summary>Example of a property that accepts a union of types.</summary>
        [JsiiProperty(name: "unionProperty", typeJson: "{\"union\":{\"types\":[{\"fqn\":\"jsii-calc.Add\"},{\"fqn\":\"jsii-calc.Multiply\"},{\"fqn\":\"jsii-calc.Power\"}]}}", isOptional: true)]
        public virtual object UnionProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }
    }
}
