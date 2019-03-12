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

        /// <summary>
        /// Returns `true` if `key` is defined in `opts`. Used to check that undefined/null hash values
        /// are being erased when sending values from native code to JS.
        /// </summary>
        [JsiiMethod("doesKeyExist", "{\"primitive\":\"boolean\"}", "[{\"name\":\"opts\",\"type\":{\"fqn\":\"jsii-calc.EraseUndefinedHashValuesOptions\"}},{\"name\":\"key\",\"type\":{\"primitive\":\"string\"}}]")]
        public static bool DoesKeyExist(IEraseUndefinedHashValuesOptions opts, string key)
        {
            return InvokeStaticMethod<bool>(typeof(EraseUndefinedHashValues), new object[]{opts, key});
        }
    }
}