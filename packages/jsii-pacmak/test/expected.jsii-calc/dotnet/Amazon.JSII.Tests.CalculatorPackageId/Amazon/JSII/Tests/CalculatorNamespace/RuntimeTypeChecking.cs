using Amazon.JSII.Runtime.Deputy;
using System;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(RuntimeTypeChecking), "jsii-calc.RuntimeTypeChecking", "[]")]
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

        [JsiiMethod(name: "methodWithDefaultedArguments", returnsJson: null, parametersJson: "[{\"name\":\"arg1\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"arg2\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg3\",\"type\":{\"primitive\":\"date\"}}]")]
        public virtual void MethodWithDefaultedArguments(double? arg1, string arg2, DateTime? arg3)
        {
            InvokeInstanceVoidMethod(new object[]{arg1, arg2, arg3});
        }

        [JsiiMethod(name: "methodWithOptionalAnyArgument", returnsJson: null, parametersJson: "[{\"name\":\"arg\",\"type\":{\"primitive\":\"any\"}}]")]
        public virtual void MethodWithOptionalAnyArgument(object arg)
        {
            InvokeInstanceVoidMethod(new object[]{arg});
        }

        /// <summary>Used to verify verification of number of method arguments.</summary>
        [JsiiMethod(name: "methodWithOptionalArguments", returnsJson: null, parametersJson: "[{\"name\":\"arg1\",\"type\":{\"primitive\":\"number\"}},{\"name\":\"arg2\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"arg3\",\"type\":{\"primitive\":\"date\"}}]")]
        public virtual void MethodWithOptionalArguments(double arg1, string arg2, DateTime? arg3)
        {
            InvokeInstanceVoidMethod(new object[]{arg1, arg2, arg3});
        }
    }
}