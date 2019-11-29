using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Make sure structs are un-decorated on the way in.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// 
    /// <strong>See</strong>: https://github.com/aws/aws-cdk/issues/5066
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), fullyQualifiedName: "jsii-calc.JsonFormatter")]
    public class JsonFormatter : DeputyBase
    {
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected JsonFormatter(ByRefValue reference): base(reference)
        {
        }

        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected JsonFormatter(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyArray", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object AnyArray()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyBooleanFalse", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object AnyBooleanFalse()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyBooleanTrue", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object AnyBooleanTrue()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyDate", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object AnyDate()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyEmptyString", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object AnyEmptyString()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyFunction", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object AnyFunction()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyHash", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object AnyHash()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyNull", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object AnyNull()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyNumber", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object AnyNumber()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyRef", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object AnyRef()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyString", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object AnyString()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyUndefined", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object AnyUndefined()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "anyZero", returnsJson: "{\"type\":{\"primitive\":\"any\"}}")]
        public static object AnyZero()
        {
            return InvokeStaticMethod<object>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{}, new object[]{});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "stringify", returnsJson: "{\"optional\":true,\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"value\",\"optional\":true,\"type\":{\"primitive\":\"any\"}}]")]
        public static string Stringify(object @value = null)
        {
            return InvokeStaticMethod<string>(typeof(Amazon.JSII.Tests.CalculatorNamespace.JsonFormatter), new System.Type[]{typeof(object)}, new object[]{@value});
        }
    }
}
