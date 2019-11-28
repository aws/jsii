using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.SyncVirtualMethods), fullyQualifiedName: "jsii-calc.SyncVirtualMethods")]
    public class SyncVirtualMethods : DeputyBase
    {
        public SyncVirtualMethods(): base(new DeputyProps(new object[]{}))
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected SyncVirtualMethods(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected SyncVirtualMethods(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "callerIsAsync", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", isAsync: true)]
        public virtual double CallerIsAsync()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "callerIsMethod", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double CallerIsMethod()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "modifyOtherProperty", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void ModifyOtherProperty(string @value)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(string)}, new object[]{@value});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "modifyValueOfTheProperty", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void ModifyValueOfTheProperty(string @value)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(string)}, new object[]{@value});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "readA", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double ReadA()
        {
            return InvokeInstanceMethod<double>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "retrieveOtherProperty", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string RetrieveOtherProperty()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "retrieveReadOnlyProperty", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string RetrieveReadOnlyProperty()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "retrieveValueOfTheProperty", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string RetrieveValueOfTheProperty()
        {
            return InvokeInstanceMethod<string>(new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "virtualMethod", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"n\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double VirtualMethod(double n)
        {
            return InvokeInstanceMethod<double>(new System.Type[]{typeof(double)}, new object[]{n});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "writeA", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void WriteA(double @value)
        {
            InvokeInstanceVoidMethod(new System.Type[]{typeof(double)}, new object[]{@value});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "a", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double A
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "callerIsProperty", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double CallerIsProperty
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "otherProperty", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string OtherProperty
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "theProperty", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string TheProperty
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "valueOfOtherProperty", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string ValueOfOtherProperty
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
