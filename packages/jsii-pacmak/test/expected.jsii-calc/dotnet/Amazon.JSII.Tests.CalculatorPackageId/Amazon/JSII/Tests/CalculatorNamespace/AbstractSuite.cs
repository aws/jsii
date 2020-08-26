using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Ensures abstract members implementations correctly register overrides in various languages.</summary>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.AbstractSuite), fullyQualifiedName: "jsii-calc.AbstractSuite")]
    public abstract class AbstractSuite : DeputyBase
    {
        protected AbstractSuite(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AbstractSuite(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected AbstractSuite(DeputyProps props): base(props)
        {
        }

        [JsiiMethod(name: "someMethod", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"name\":\"str\",\"type\":{\"primitive\":\"string\"}}]")]
        protected abstract string SomeMethod(string str);


        /// <summary>Sets `seed` to `this.property`, then calls `someMethod` with `this.property` and returns the result.</summary>
        /// <param name="seed">a `string`.</param>
        [JsiiMethod(name: "workItAll", returnsJson: "{\"type\":{\"primitive\":\"string\"}}", parametersJson: "[{\"docs\":{\"summary\":\"a `string`.\"},\"name\":\"seed\",\"type\":{\"primitive\":\"string\"}}]")]
        public virtual string WorkItAll(string seed)
        {
            return InvokeInstanceMethod<string>(new System.Type[]{typeof(string)}, new object[]{seed});
        }

        [JsiiProperty(name: "property", typeJson: "{\"primitive\":\"string\"}")]
        protected abstract string Property
        {
            get;
            set;
        }
    }
}
