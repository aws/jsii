using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Ensures abstract members implementations correctly register overrides in various languages.</summary>
    /// <remarks>
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.AbstractSuite), fullyQualifiedName: "jsii-calc.AbstractSuite")]
    public abstract class AbstractSuite : DeputyBase
    {
        /// <summary></summary>
        protected AbstractSuite(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        protected AbstractSuite(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        protected AbstractSuite(DeputyProps props): base(props)
        {
        }

        /// <summary></summary>
        /// <param name="str"></param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "someMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"str\",\"type\":{\"primitive\":\"string\"}}]")]
        protected abstract string SomeMethod(string str);


        /// <summary>Sets `seed` to `this.property`, then calls `someMethod` with `this.property` and returns the result.</summary>
        /// <param name="seed">a `string`.</param>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "workItAll", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"docs\":{\"summary\":\"a `string`.\"},\"name\":\"seed\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string WorkItAll(string seed)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(string)}, new object[]{seed});
        }

        /// <summary></summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        protected abstract string Property
        {
            get;
            set;
        }
    }
}
