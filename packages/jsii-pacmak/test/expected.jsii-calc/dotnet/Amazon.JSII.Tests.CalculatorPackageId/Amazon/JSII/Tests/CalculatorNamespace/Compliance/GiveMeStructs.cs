using Amazon.JSII.Runtime.Deputy;

#pragma warning disable CS0672,CS0809,CS1591

namespace Amazon.JSII.Tests.CalculatorNamespace.Compliance
{
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.GiveMeStructs), fullyQualifiedName: "jsii-calc.compliance.GiveMeStructs")]
    public class GiveMeStructs : DeputyBase
    {
        public GiveMeStructs(): base(new DeputyProps(new object[]{}))
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected GiveMeStructs(ByRefValue reference): base(reference)
        {
        }

        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        protected GiveMeStructs(DeputyProps props): base(props)
        {
        }

        /// <summary>Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "derivedToFirst", returnsJson: "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.MyFirstStruct\"}}", parametersJson: "[{\"name\":\"derived\",\"type\":{\"fqn\":\"jsii-calc.compliance.DerivedStruct\"}}]")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct DerivedToFirst(Amazon.JSII.Tests.CalculatorNamespace.Compliance.IDerivedStruct derived)
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.IDerivedStruct)}, new object[]{derived});
        }

        /// <summary>Returns the boolean from a DerivedStruct struct.</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "readDerivedNonPrimitive", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.compliance.DoubleTrouble\"}}", parametersJson: "[{\"name\":\"derived\",\"type\":{\"fqn\":\"jsii-calc.compliance.DerivedStruct\"}}]")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.Compliance.DoubleTrouble ReadDerivedNonPrimitive(Amazon.JSII.Tests.CalculatorNamespace.Compliance.IDerivedStruct derived)
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.Compliance.DoubleTrouble>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.Compliance.IDerivedStruct)}, new object[]{derived});
        }

        /// <summary>Returns the "anumber" from a MyFirstStruct struct;</summary>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "readFirstNumber", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"first\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.MyFirstStruct\"}}]")]
        public virtual double ReadFirstNumber(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct first)
        {
            return InvokeInstanceMethod<double>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct)}, new object[]{first});
        }

        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "structLiteral", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.StructWithOnlyOptionals\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IStructWithOnlyOptionals StructLiteral
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IStructWithOnlyOptionals>();
        }
    }
}
