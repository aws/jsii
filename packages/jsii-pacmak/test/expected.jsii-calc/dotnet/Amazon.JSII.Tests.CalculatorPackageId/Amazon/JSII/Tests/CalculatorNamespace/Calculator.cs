using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>A calculator which maintains a current value and allows adding operations.</summary>
    /// <remarks>
    /// Here's how you use it:
    /// 
    /// ```ts
    /// // This example is in TypeScript, examples in C# are coming soon.
    /// const calculator = new calc.Calculator();
    /// calculator.add(5);
    /// calculator.mul(3);
    /// console.log(calculator.expression.value);
    /// ```
    /// 
    /// I will repeat this example again, but in an @example tag.
    /// 
    /// stability: Experimental
    /// 
    /// example:
    /// <code>
    /// // Examples in C# are coming soon.
    /// const calculator = new calc.Calculator();
    /// calculator.add(5);
    /// calculator.mul(3);
    /// console.log(calculator.expression.value);
    /// </code>
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Calculator), fullyQualifiedName: "jsii-calc.Calculator", parametersJson: "[{\"docs\":{\"summary\":\"Initialization properties.\"},\"name\":\"props\",\"optional\":true,\"type\":{\"fqn\":\"jsii-calc.CalculatorProps\"}}]")]
    public class Calculator : Amazon.JSII.Tests.CalculatorNamespace.composition.CompositeOperation
    {
        /// <summary>Creates a Calculator object.</summary>
        /// <param name="props">Initialization properties.</param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public Calculator(Amazon.JSII.Tests.CalculatorNamespace.ICalculatorProps props = null): base(new DeputyProps(new object[]{props}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected Calculator(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected Calculator(DeputyProps props): base(props)
        {
        }

        /// <summary>Adds a number to the current value.</summary>
        /// <param name="value"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "add", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Add(double @value)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(double)}, new object[]{@value});
        }

        /// <summary>Multiplies the current value by a number.</summary>
        /// <param name="value"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "mul", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Mul(double @value)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(double)}, new object[]{@value});
        }

        /// <summary>Negates the current value.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "neg")]
        public virtual void Neg()
        {
            InvokeInstanceVoidMethod(new System.Type[]{}, new object[]{});
        }

        /// <summary>Raises the current value by a power.</summary>
        /// <param name="value"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "pow", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void Pow(double @value)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(double)}, new object[]{@value});
        }

        /// <summary>Returns teh value of the union property (if defined).</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "readUnionValue", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double ReadUnionValue()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }

        /// <summary>Returns the expression.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "expression", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public override Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Expression
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
        }

        /// <summary>A log of all operations.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "operationsLog", typeJson: "{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"},\"kind\":\"array\"}}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[] OperationsLog
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[]>();
        }

        /// <summary>A map of per operation name of all operations performed.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "operationsMap", typeJson: "{\"collection\":{\"elementtype\":{\"collection\":{\"elementtype\":{\"fqn\":\"@scope/jsii-calc-lib.Value\"},\"kind\":\"array\"}},\"kind\":\"map\"}}")]
        public virtual System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[]> OperationsMap
        {
            get => GetInstanceProperty<System.Collections.Generic.IDictionary<string, Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_[]>>();
        }

        /// <summary>The current value.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "curr", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.Value\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_ Curr
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.Value_>();
            set => SetInstanceProperty(value);
        }

        /// <summary>The maximum value allows in this calculator.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "maxValue", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        public virtual double? MaxValue
        {
            get => GetInstanceProperty<double?>();
            set => SetInstanceProperty(value);
        }

        /// <summary>Example of a property that accepts a union of types.</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiOptional]
        [JsiiProperty(name: "unionProperty", typeJson: "{\"union\":{\"types\":[{\"fqn\":\"jsii-calc.Add\"},{\"fqn\":\"jsii-calc.Multiply\"},{\"fqn\":\"jsii-calc.Power\"}]}}", isOptional: true)]
        public virtual object UnionProperty
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }
    }
}
