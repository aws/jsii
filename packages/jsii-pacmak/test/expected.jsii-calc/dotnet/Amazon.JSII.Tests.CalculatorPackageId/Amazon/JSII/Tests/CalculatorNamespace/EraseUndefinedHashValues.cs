using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.EraseUndefinedHashValues), fullyQualifiedName: "jsii-calc.EraseUndefinedHashValues")]
    public class EraseUndefinedHashValues : DeputyBase
    {
        /// <summary></summary>
        public EraseUndefinedHashValues(): base(new DeputyProps(new object[]{}))
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
>>>>>>> origin/master
        protected EraseUndefinedHashValues(ByRefValue reference): base(reference)
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
>>>>>>> origin/master
        protected EraseUndefinedHashValues(DeputyProps props): base(props)
        {
        }

        /// <summary>Returns `true` if `key` is defined in `opts`.</summary>
        /// <param name="opts"></param>
        /// <param name="key"></param>
        /// <remarks>
        /// Used to check that undefined/null hash values
        /// are being erased when sending values from native code to JS.
        /// 
<<<<<<< HEAD
        /// <strong>Stability</strong>: Experimental
=======
        /// stability: Experimental
>>>>>>> origin/master
        /// </remarks>
        [JsiiMethod(name: "doesKeyExist", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"opts\",\"type\":{\"fqn\":\"jsii-calc.EraseUndefinedHashValuesOptions\"}},{\"name\":\"key\",\"type\":{\"primitive\":\"string\"}}]")]
        public static bool DoesKeyExist(Amazon.JSII.Tests.CalculatorNamespace.IEraseUndefinedHashValuesOptions opts, string key)
        {
            return InvokeStaticMethod<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.EraseUndefinedHashValues), new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IEraseUndefinedHashValuesOptions), typeof(string)}, new object[]{opts, key});
        }

        /// <summary>We expect "prop1" to be erased.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "prop1IsNull", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"map\"}}}")]
        public static System.Collections.Generic.IDictionary<string, object> Prop1IsNull()
        {
            return InvokeStaticMethod<System.Collections.Generic.IDictionary<string, object>>(typeof(Amazon.JSII.Tests.CalculatorNamespace.EraseUndefinedHashValues), new System.Type[]{}, new object[]{});
        }

        /// <summary>We expect "prop2" to be erased.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "prop2IsUndefined", returnsJson: "{\"type\":{\"collection\":{\"elementtype\":{\"primitive\":\"any\"},\"kind\":\"map\"}}}")]
        public static System.Collections.Generic.IDictionary<string, object> Prop2IsUndefined()
        {
            return InvokeStaticMethod<System.Collections.Generic.IDictionary<string, object>>(typeof(Amazon.JSII.Tests.CalculatorNamespace.EraseUndefinedHashValues), new System.Type[]{}, new object[]{});
        }
    }
}
