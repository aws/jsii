using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Test calling back to consumers that implement interfaces.</summary>
    /// <remarks>
    /// Check that if a JSII consumer implements IConsumerWithInterfaceParam, they can call
    /// the method on the argument that they're passed...
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ConsumerCanRingBell), fullyQualifiedName: "jsii-calc.ConsumerCanRingBell")]
    public class ConsumerCanRingBell : DeputyBase
    {
        public ConsumerCanRingBell(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ConsumerCanRingBell(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ConsumerCanRingBell(DeputyProps props): base(props)
        {
        }

        /// <summary>...if the interface is implemented using an object literal.</summary>
        /// <remarks>
        /// Returns whether the bell was rung.
        /// </remarks>
        [JsiiMethod(name: "staticImplementedByObjectLiteral", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IBellRinger\"}}]")]
        public static bool StaticImplementedByObjectLiteral(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger ringer)
        {
            return InvokeStaticMethod<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ConsumerCanRingBell), new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger)}, new object[]{ringer});
        }

        /// <summary>...if the interface is implemented using a private class.</summary>
        /// <remarks>
        /// Return whether the bell was rung.
        /// </remarks>
        [JsiiMethod(name: "staticImplementedByPrivateClass", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IBellRinger\"}}]")]
        public static bool StaticImplementedByPrivateClass(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger ringer)
        {
            return InvokeStaticMethod<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ConsumerCanRingBell), new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger)}, new object[]{ringer});
        }

        /// <summary>...if the interface is implemented using a public class.</summary>
        /// <remarks>
        /// Return whether the bell was rung.
        /// </remarks>
        [JsiiMethod(name: "staticImplementedByPublicClass", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IBellRinger\"}}]")]
        public static bool StaticImplementedByPublicClass(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger ringer)
        {
            return InvokeStaticMethod<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ConsumerCanRingBell), new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger)}, new object[]{ringer});
        }

        /// <summary>If the parameter is a concrete class instead of an interface.</summary>
        /// <remarks>
        /// Return whether the bell was rung.
        /// </remarks>
        [JsiiMethod(name: "staticWhenTypedAsClass", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IConcreteBellRinger\"}}]")]
        public static bool StaticWhenTypedAsClass(Amazon.JSII.Tests.CalculatorNamespace.IConcreteBellRinger ringer)
        {
            return InvokeStaticMethod<bool>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ConsumerCanRingBell), new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IConcreteBellRinger)}, new object[]{ringer});
        }

        /// <summary>...if the interface is implemented using an object literal.</summary>
        /// <remarks>
        /// Returns whether the bell was rung.
        /// </remarks>
        [JsiiMethod(name: "implementedByObjectLiteral", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IBellRinger\"}}]")]
        public virtual bool ImplementedByObjectLiteral(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger ringer)
        {
            return InvokeInstanceMethod<bool>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger)}, new object[]{ringer});
        }

        /// <summary>...if the interface is implemented using a private class.</summary>
        /// <remarks>
        /// Return whether the bell was rung.
        /// </remarks>
        [JsiiMethod(name: "implementedByPrivateClass", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IBellRinger\"}}]")]
        public virtual bool ImplementedByPrivateClass(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger ringer)
        {
            return InvokeInstanceMethod<bool>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger)}, new object[]{ringer});
        }

        /// <summary>...if the interface is implemented using a public class.</summary>
        /// <remarks>
        /// Return whether the bell was rung.
        /// </remarks>
        [JsiiMethod(name: "implementedByPublicClass", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IBellRinger\"}}]")]
        public virtual bool ImplementedByPublicClass(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger ringer)
        {
            return InvokeInstanceMethod<bool>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IBellRinger)}, new object[]{ringer});
        }

        /// <summary>If the parameter is a concrete class instead of an interface.</summary>
        /// <remarks>
        /// Return whether the bell was rung.
        /// </remarks>
        [JsiiMethod(name: "whenTypedAsClass", returnsJson: "{\"type\":{\"primitive\":\"boolean\"}}", parametersJson: "[{\"name\":\"ringer\",\"type\":{\"fqn\":\"jsii-calc.IConcreteBellRinger\"}}]")]
        public virtual bool WhenTypedAsClass(Amazon.JSII.Tests.CalculatorNamespace.IConcreteBellRinger ringer)
        {
            return InvokeInstanceMethod<bool>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IConcreteBellRinger)}, new object[]{ringer});
        }
    }
}
