using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.Calculator
{
    [JsiiClass(typeof(SyncVirtualMethods), "jsii-calc.SyncVirtualMethods", "[]")]
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

        [JsiiProperty("callerIsProperty", "{\"primitive\":\"number\"}")]
        public virtual double CallerIsProperty
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("theProperty", "{\"primitive\":\"string\"}")]
        public virtual string TheProperty
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("readonlyProperty", "{\"primitive\":\"string\"}")]
        public virtual string ReadonlyProperty
        {
            get => GetInstanceProperty<string>();
        }

        [JsiiProperty("otherProperty", "{\"primitive\":\"string\"}")]
        public virtual string OtherProperty
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("valueOfOtherProperty", "{\"primitive\":\"string\"}")]
        public virtual string ValueOfOtherProperty
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }

        [JsiiProperty("a", "{\"primitive\":\"number\"}")]
        public virtual double A
        {
            get => GetInstanceProperty<double>();
            set => SetInstanceProperty(value);
        }

        [JsiiMethod("callerIsMethod", "{\"primitive\":\"number\"}", "[]")]
        public virtual double CallerIsMethod()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        [JsiiMethod("callerIsAsync", "{\"primitive\":\"number\",\"promise\":true}", "[]")]
        public virtual double CallerIsAsync()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        [JsiiMethod("virtualMethod", "{\"primitive\":\"number\"}", "[{\"name\":\"n\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double VirtualMethod(double n)
        {
            return InvokeInstanceMethod<double>(new object[]{n});
        }

        [JsiiMethod("modifyValueOfTheProperty", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void ModifyValueOfTheProperty(string value)
        {
            InvokeInstanceVoidMethod(new object[]{value});
        }

        [JsiiMethod("retrieveValueOfTheProperty", "{\"primitive\":\"string\"}", "[]")]
        public virtual string RetrieveValueOfTheProperty()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        [JsiiMethod("retrieveReadOnlyProperty", "{\"primitive\":\"string\"}", "[]")]
        public virtual string RetrieveReadOnlyProperty()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        [JsiiMethod("modifyOtherProperty", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void ModifyOtherProperty(string value)
        {
            InvokeInstanceVoidMethod(new object[]{value});
        }

        [JsiiMethod("retrieveOtherProperty", "{\"primitive\":\"string\"}", "[]")]
        public virtual string RetrieveOtherProperty()
        {
            return InvokeInstanceMethod<string>(new object[]{});
        }

        [JsiiMethod("readA", "{\"primitive\":\"number\"}", "[]")]
        public virtual double ReadA()
        {
            return InvokeInstanceMethod<double>(new object[]{});
        }

        [JsiiMethod("writeA", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void WriteA(double value)
        {
            InvokeInstanceVoidMethod(new object[]{value});
        }
    }
}