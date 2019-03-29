using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    [JsiiClass(typeof(EraseUndefinedHashValues), "jsii-calc.EraseUndefinedHashValues", "[]")]
    public class EraseUndefinedHashValues : DeputyBase
    {
        public EraseUndefinedHashValues(): base(new DeputyProps(new object[]{}))
        {
        }

        protected EraseUndefinedHashValues(ByRefValue reference): base(reference)
        {
        }

        protected EraseUndefinedHashValues(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// remarks: Used to check that undefined/null hash values
        /// are being erased when sending values from native code to JS.
        /// summary: Returns `true` if `key` is defined in `opts`.
        /// </remarks>
        [JsiiMethod("doesKeyExist", "{\"primitive\":\"boolean\"}", "[{\"name\":\"opts\",\"type\":{\"fqn\":\"jsii-calc.EraseUndefinedHashValuesOptions\"}},{\"name\":\"key\",\"type\":{\"primitive\":\"string\"}}]")]
        public static bool DoesKeyExist(IEraseUndefinedHashValuesOptions opts, string key)
        {
            return InvokeStaticMethod<bool>(typeof(EraseUndefinedHashValues), new object[]{opts, key});
        }

        /// <remarks>summary: We expect "prop1" to be erased.</remarks>
        [JsiiMethod("prop1IsNull", "{\"primitive\":\"any\"}", "[]")]
        public static object Prop1IsNull()
        {
            return InvokeStaticMethod<object>(typeof(EraseUndefinedHashValues), new object[]{});
        }

        /// <remarks>summary: We expect "prop2" to be erased.</remarks>
        [JsiiMethod("prop2IsUndefined", "{\"primitive\":\"any\"}", "[]")]
        public static object Prop2IsUndefined()
        {
            return InvokeStaticMethod<object>(typeof(EraseUndefinedHashValues), new object[]{});
        }
    }
}