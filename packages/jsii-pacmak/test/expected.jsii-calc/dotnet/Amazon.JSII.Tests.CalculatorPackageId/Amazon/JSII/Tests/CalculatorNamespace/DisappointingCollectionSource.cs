using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Verifies that null/undefined can be returned for optional collections.</summary>
    /// <remarks>
    /// This source of collections is disappointing - it'll always give you nothing :(
    /// 
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.DisappointingCollectionSource), fullyQualifiedName: "jsii-calc.DisappointingCollectionSource")]
    public class DisappointingCollectionSource : DeputyBase
    {
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected DisappointingCollectionSource(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected DisappointingCollectionSource(DeputyProps props): base(props)
        {
        }

        /// <summary>Some List of strings, maybe?</summary>
        /// <remarks>
        /// (Nah, just a billion dollars mistake!)
        /// 
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "maybeList", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"string\"},\"kind\":\"array\"}}", isOptional: true)]
        public static string[] MaybeList
        {
            get;
        }
        = GetStaticProperty<string[]>(typeof(Amazon.JSII.Tests.CalculatorNamespace.DisappointingCollectionSource));

        /// <summary>Some Map of strings to numbers, maybe?</summary>
        /// <remarks>
        /// (Nah, just a billion dollars mistake!)
        /// 
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "maybeMap", typeJson: "{\"collection\":{\"elementtype\":{\"primitive\":\"number\"},\"kind\":\"map\"}}", isOptional: true)]
        public static System.Collections.Generic.IDictionary<string, double> MaybeMap
        {
            get;
        }
        = GetStaticProperty<System.Collections.Generic.IDictionary<string, double>>(typeof(Amazon.JSII.Tests.CalculatorNamespace.DisappointingCollectionSource));
    }
}
