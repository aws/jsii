using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <summary>1.</summary>
    /// <remarks>
    /// call #takeThis() -&gt; An ObjectRef will be provisioned for the value (it'll be re-used!)
    /// 2. call #takeThisToo() -&gt; The ObjectRef from before will need to be down-cased to the ParentStruct982 type
    /// 
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.Demonstrate982), fullyQualifiedName: "jsii-calc.compliance.Demonstrate982")]
    public class Demonstrate982 : DeputyBase
    {
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        public Demonstrate982(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Demonstrate982(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected Demonstrate982(DeputyProps props): base(props)
        {
        }

        /// <summary>It's dangerous to go alone!</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "takeThis", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.ChildStruct982\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.Compliance.IChildStruct982 TakeThis()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.IChildStruct982>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.Demonstrate982), new System.Type[]{}, new object[]{});
        }

        /// <summary>It's dangerous to go alone!</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "takeThisToo", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.ParentStruct982\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.Compliance.IParentStruct982 TakeThisToo()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.IParentStruct982>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.Demonstrate982), new System.Type[]{}, new object[]{});
        }
    }
}
