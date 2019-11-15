using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>1.</summary>
    /// <remarks>
    /// call #takeThis() -&gt; An ObjectRef will be provisioned for the value (it'll be re-used!)
    /// 2. call #takeThisToo() -&gt; The ObjectRef from before will need to be down-cased to the ParentStruct982 type
    /// 
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Demonstrate982), fullyQualifiedName: "jsii-calc.Demonstrate982")]
    public class Demonstrate982 : DeputyBase
    {
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        public Demonstrate982(): base(new DeputyProps(new object[]{}))
        {
        }

        protected Demonstrate982(ByRefValue reference): base(reference)
        {
        }

        protected Demonstrate982(DeputyProps props): base(props)
        {
        }

        /// <summary>It's dangerous to go alone!</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "takeThis", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.ChildStruct982\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IChildStruct982 TakeThis()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IChildStruct982>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Demonstrate982), new System.Type[]{}, new object[]{});
        }

        /// <summary>It's dangerous to go alone!</summary>
        /// <remarks>
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "takeThisToo", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.ParentStruct982\"}}")]
        public static Amazon.JSII.Tests.CalculatorNamespace.IParentStruct982 TakeThisToo()
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.IParentStruct982>(typeof(Amazon.JSII.Tests.CalculatorNamespace.Demonstrate982), new System.Type[]{}, new object[]{});
        }
    }
}
