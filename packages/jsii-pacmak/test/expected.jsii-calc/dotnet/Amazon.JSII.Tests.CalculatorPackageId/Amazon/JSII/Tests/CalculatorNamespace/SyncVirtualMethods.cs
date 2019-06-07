using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(SyncVirtualMethods), fullyQualifiedName: "jsii-calc.SyncVirtualMethods")]
    public class SyncVirtualMethods : DeputyBase
    {
        public SyncVirtualMethods(): base(new DeputyProps(new object[]{}))
        {
        }

        protected SyncVirtualMethods(ByRefValue reference): base(reference)
        {
        }

        protected SyncVirtualMethods(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "callerIsAsync", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", isAsync: true)]
        public virtual double CallerIsAsync()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        [JsiiMethod(name: "callerIsMethod", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double CallerIsMethod()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        [JsiiMethod(name: "modifyOtherProperty", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void ModifyOtherProperty(string @value)
        {
            InvokeInstanceVoidMethod(new object[]{@value});
        }

        [JsiiMethod(name: "modifyValueOfTheProperty", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void ModifyValueOfTheProperty(string @value)
        {
            InvokeInstanceVoidMethod(new object[]{@value});
        }

        [JsiiMethod(name: "readA", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")]
        public virtual double ReadA()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        [JsiiMethod(name: "retrieveOtherProperty", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string RetrieveOtherProperty()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        [JsiiMethod(name: "retrieveReadOnlyProperty", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string RetrieveReadOnlyProperty()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        [JsiiMethod(name: "retrieveValueOfTheProperty", returnsJson: "{\"type\":{\"primitive\":\"string\"}}")]
        public virtual string RetrieveValueOfTheProperty()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        [JsiiMethod(name: "virtualMethod", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"n\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double VirtualMethod(double n)
        {
            return InvokeInstanceMethod<double>(new object[]{n});
        }

        [JsiiMethod(name: "writeA", parametersJson: "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void WriteA(double @value)
        {
            InvokeInstanceVoidMethod(new object[]{@value});
        }

        [JsiiProperty(name: "readonlyProperty", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty(name: "a", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double A
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty(name: "callerIsProperty", typeJson: "{\"primitive\":\"number\"}")]
        public virtual double CallerIsProperty
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty(name: "otherProperty", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string OtherProperty
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty(name: "theProperty", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string TheProperty
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty(name: "valueOfOtherProperty", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string ValueOfOtherProperty
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
