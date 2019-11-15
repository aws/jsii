using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Test calling back to consumers that implement interfaces.</summary>
    /// <remarks>
    /// Check that if a JSII consumer implements IConsumerWithInterfaceParam, they can call
    /// the method on the argument that they're passed...
    /// 
    /// stability: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ConsumerCanRingBell), fullyQualifiedName: "jsii-calc.ConsumerCanRingBell")]
    public class ConsumerCanRingBell : DeputyBase
    {
        public ConsumerCanRingBell(): base(new DeputyProps(new object[]{}))
        {
        }

        protected ConsumerCanRingBell(ByRefValue reference): base(reference)
        {
        }

        protected ConsumerCanRingBell(DeputyProps props): base(props)
        {
        }

        /// <summary>...if the interface is implemented using an object literal.</summary>
        /// <remarks>
        /// Returns whether the bell was rung.
        /// 
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "staticImplementedByObjectLiteral", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IBellRinger\"}}]")]
        public static bool StaticImplementedByObjectLiteral(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger ringer)
        {
            return InvokeStaticMethod<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ConsumerCanRingBell), new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger)}, new object[]{ringer});
        }

        /// <summary>...if the interface is implemented using a private class.</summary>
        /// <remarks>
        /// Return whether the bell was rung.
        /// 
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "staticImplementedByPrivateClass", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IBellRinger\"}}]")]
        public static bool StaticImplementedByPrivateClass(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger ringer)
        {
            return InvokeStaticMethod<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ConsumerCanRingBell), new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger)}, new object[]{ringer});
        }

        /// <summary>...if the interface is implemented using a public class.</summary>
        /// <remarks>
        /// Return whether the bell was rung.
        /// 
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "staticImplementedByPublicClass", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IBellRinger\"}}]")]
        public static bool StaticImplementedByPublicClass(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger ringer)
        {
            return InvokeStaticMethod<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ConsumerCanRingBell), new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger)}, new object[]{ringer});
        }

        /// <summary>If the parameter is a concrete class instead of an interface.</summary>
        /// <remarks>
        /// Return whether the bell was rung.
        /// 
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "staticWhenTypedAsClass", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IConcreteBellRinger\"}}]")]
        public static bool StaticWhenTypedAsClass(Amazon.JSII.Tests.CalculatorNamespace.IConcreteBellRinger ringer)
        {
            return InvokeStaticMethod<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ConsumerCanRingBell), new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IConcreteBellRinger)}, new object[]{ringer});
        }

        /// <summary>...if the interface is implemented using an object literal.</summary>
        /// <remarks>
        /// Returns whether the bell was rung.
        /// 
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "implementedByObjectLiteral", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IBellRinger\"}}]")]
        public virtual bool ImplementedByObjectLiteral(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger ringer)
        {
            return InvokeInstanceMethod<bool>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger)}, new object[]{ringer});
        }

        /// <summary>...if the interface is implemented using a private class.</summary>
        /// <remarks>
        /// Return whether the bell was rung.
        /// 
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "implementedByPrivateClass", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IBellRinger\"}}]")]
        public virtual bool ImplementedByPrivateClass(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger ringer)
        {
            return InvokeInstanceMethod<bool>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger)}, new object[]{ringer});
        }

        /// <summary>...if the interface is implemented using a public class.</summary>
        /// <remarks>
        /// Return whether the bell was rung.
        /// 
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "implementedByPublicClass", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IBellRinger\"}}]")]
        public virtual bool ImplementedByPublicClass(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger ringer)
        {
            return InvokeInstanceMethod<bool>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger)}, new object[]{ringer});
        }

        /// <summary>If the parameter is a concrete class instead of an interface.</summary>
        /// <remarks>
        /// Return whether the bell was rung.
        /// 
        /// stability: Experimental
        /// </remarks>
        [JsiiMethod(name: "whenTypedAsClass", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IConcreteBellRinger\"}}]")]
        public virtual bool WhenTypedAsClass(Amazon.JSII.Tests.CalculatorNamespace.IConcreteBellRinger ringer)
        {
            return InvokeInstanceMethod<bool>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IConcreteBellRinger)}, new object[]{ringer});
        }
    }
}
