using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>Class that implements interface properties automatically, but using a private constructor.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithPrivateConstructorAndAutomaticProperties), fullyQualifiedName: "jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties")]
    public class ClassWithPrivateConstructorAndAutomaticProperties : DeputyBase, Amazon.JSII.Tests.CalculatorNamespace.IInterfaceWithProperties
    {
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithPrivateConstructorAndAutomaticProperties(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected ClassWithPrivateConstructorAndAutomaticProperties(DeputyProps props): base(props)
        {
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "create", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.ClassWithPrivateConstructorAndAutomaticProperties\"}}", parametersJson: "[{\"name\":\"readOnlyString\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"readWriteString\",\"type\":{\"primitive\":\"string\"}}]")]
        public static Amazon.JSII.Tests.CalculatorNamespace.ClassWithPrivateConstructorAndAutomaticProperties Create(string readOnlyString, string readWriteString)
        {
            return InvokeStaticMethod<Amazon.JSII.Tests.CalculatorNamespace.ClassWithPrivateConstructorAndAutomaticProperties>(typeof(Amazon.JSII.Tests.CalculatorNamespace.ClassWithPrivateConstructorAndAutomaticProperties), new System.Type[]{typeof(string), typeof(string)}, new object[]{readOnlyString, readWriteString});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "readOnlyString", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string ReadOnlyString
        {
            get => GetInstanceProperty<string>();
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "readWriteString", typeJson: "{\"primitive\":\"string\"}")]
        public virtual string ReadWriteString
        {
            get => GetInstanceProperty<string>();
            set => SetInstanceProperty(value);
        }
    }
}
