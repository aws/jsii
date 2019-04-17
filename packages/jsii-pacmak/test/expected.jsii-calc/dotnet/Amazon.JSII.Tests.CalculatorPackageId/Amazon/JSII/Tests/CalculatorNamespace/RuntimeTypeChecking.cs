using Amazon.JSII.Runtime.Deputy;
using System;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(nativeType: typeof(RuntimeTypeChecking), fullyQualifiedName: "jsii-calc.RuntimeTypeChecking")]
    public class RuntimeTypeChecking : DeputyBase
    {
        public RuntimeTypeChecking(): base(new DeputyProps(new object[]{}))
        {
        }

        protected RuntimeTypeChecking(ByRefValue reference): base(reference)
        {
        }

        protected RuntimeTypeChecking(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "methodWithDefaultedArguments", parametersJson: "[{\"name\":\"arg1\",\"type\":{\"primitive\":\"number\"},\"optional\":true},{\"name\":\"arg2\",\"type\":{\"primitive\":\"string\"},\"optional\":true},{\"name\":\"arg3\",\"type\":{\"primitive\":\"date\"},\"optional\":true}]")]
        public virtual void MethodWithDefaultedArguments(double? arg1, string arg2, DateTime? arg3)
        {
            InvokeInstanceVoidMethod(new object[]{arg1, arg2, arg3});
        }

        [JsiiMethod(name: "methodWithOptionalAnyArgument", parametersJson: "[{\"name\":\"arg\",\"type\":{\"primitive\":\"any\"},\"optional\":true}]")]
        public virtual void MethodWithOptionalAnyArgument(object arg)
        {
            InvokeInstanceVoidMethod(new object[]{arg});
        }

        /// <summary>Used to verify verification of number of method arguments.</summary>
        [JsiiMethod(name: "methodWithOptionalArguments", parametersJson: "[{\"name\":\"arg1\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"arg2\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg3\",\"type\":{\"primitive\":\"date\"},\"optional\":true}]")]
        public virtual void MethodWithOptionalArguments(double arg1, string arg2, DateTime? arg3)
        {
            InvokeInstanceVoidMethod(new object[]{arg1, arg2, arg3});
        }
    }
}