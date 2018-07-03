using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiClass("jsii-calc", "jsii$jsii_calc$.SyncVirtualMethods", "[]")]
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
            get => GetProperty<double>();
            set => SetProperty(value);
        }

        [JsiiProperty("theProperty", "{\"primitive\":\"string\"}")]
        public virtual string TheProperty
        {
            get => GetProperty<string>();
            set => SetProperty(value);
        }

        [JsiiProperty("readonlyProperty", "{\"primitive\":\"string\"}")]
        public virtual string ReadonlyProperty
        {
            get => GetProperty<string>();
        }

        [JsiiProperty("otherProperty", "{\"primitive\":\"string\"}")]
        public virtual string OtherProperty
        {
            get => GetProperty<string>();
            set => SetProperty(value);
        }

        [JsiiProperty("valueOfOtherProperty", "{\"primitive\":\"string\"}")]
        public virtual string ValueOfOtherProperty
        {
            get => GetProperty<string>();
            set => SetProperty(value);
        }

        [JsiiProperty("a", "{\"primitive\":\"number\"}")]
        public virtual double A
        {
            get => GetProperty<double>();
            set => SetProperty(value);
        }

        [JsiiMethod("callerIsMethod", "{\"primitive\":\"number\"}", "[]")]
        public virtual double CallerIsMethod()
        {
            return InvokeMethod<double>(new object[]{});
        }

        [JsiiMethod("callerIsAsync", "{\"primitive\":\"number\",\"promise\":true}", "[]")]
        public virtual double CallerIsAsync()
        {
            return InvokeMethod<double>(new object[]{});
        }

        [JsiiMethod("virtualMethod", "{\"primitive\":\"number\"}", "[{\"name\":\"n\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual double VirtualMethod(double n)
        {
            return InvokeMethod<double>(new object[]{n});
        }

        [JsiiMethod("modifyValueOfTheProperty", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void ModifyValueOfTheProperty(string value)
        {
            InvokeVoidMethod(new object[]{value});
        }

        [JsiiMethod("retrieveValueOfTheProperty", "{\"primitive\":\"string\"}", "[]")]
        public virtual string RetrieveValueOfTheProperty()
        {
            return InvokeMethod<string>(new object[]{});
        }

        [JsiiMethod("retrieveReadOnlyProperty", "{\"primitive\":\"string\"}", "[]")]
        public virtual string RetrieveReadOnlyProperty()
        {
            return InvokeMethod<string>(new object[]{});
        }

        [JsiiMethod("modifyOtherProperty", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual void ModifyOtherProperty(string value)
        {
            InvokeVoidMethod(new object[]{value});
        }

        [JsiiMethod("retrieveOtherProperty", "{\"primitive\":\"string\"}", "[]")]
        public virtual string RetrieveOtherProperty()
        {
            return InvokeMethod<string>(new object[]{});
        }

        [JsiiMethod("readA", "{\"primitive\":\"number\"}", "[]")]
        public virtual double ReadA()
        {
            return InvokeMethod<double>(new object[]{});
        }

        [JsiiMethod("writeA", null, "[{\"name\":\"value\",\"type\":{\"primitive\":\"number\"}}]")]
        public virtual void WriteA(double value)
        {
            InvokeVoidMethod(new object[]{value});
        }
    }
}