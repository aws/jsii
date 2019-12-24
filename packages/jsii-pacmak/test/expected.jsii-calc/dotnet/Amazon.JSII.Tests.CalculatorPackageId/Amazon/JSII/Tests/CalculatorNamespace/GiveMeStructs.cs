using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary></summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(Amazon.JSII.Tests.CalculatorNamespace.GiveMeStructs), fullyQualifiedName: "jsii-calc.GiveMeStructs")]
    public class GiveMeStructs : DeputyBase
    {
        /// <summary></summary>
        public GiveMeStructs(): base(new DeputyProps(new object[]{}))
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from a Javascript-owned object reference</summary>
        /// <param name="reference">The Javascript-owned object reference</param>
>>>>>>> origin/master
        protected GiveMeStructs(ByRefValue reference): base(reference)
        {
        }

<<<<<<< HEAD
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
=======
        /// <summary>Used by jsii to construct an instance of this class from DeputyProps</summary>
        /// <param name="props">The deputy props</param>
>>>>>>> origin/master
        protected GiveMeStructs(DeputyProps props): base(props)
        {
        }

        /// <summary>Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.</summary>
        /// <param name="derived"></param>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "derivedToFirst", returnsJson: "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.MyFirstStruct\"}}", parametersJson: "[{\"name\":\"derived\",\"type\":{\"fqn\":\"jsii-calc.DerivedStruct\"}}]")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct DerivedToFirst(Amazon.JSII.Tests.CalculatorNamespace.IDerivedStruct derived)
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IDerivedStruct)}, new object[]{derived});
        }

        /// <summary>Returns the boolean from a DerivedStruct struct.</summary>
        /// <param name="derived"></param>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "readDerivedNonPrimitive", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.DoubleTrouble\"}}", parametersJson: "[{\"name\":\"derived\",\"type\":{\"fqn\":\"jsii-calc.DerivedStruct\"}}]")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.DoubleTrouble ReadDerivedNonPrimitive(Amazon.JSII.Tests.CalculatorNamespace.IDerivedStruct derived)
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.DoubleTrouble>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.IDerivedStruct)}, new object[]{derived});
        }

        /// <summary>Returns the "anumber" from a MyFirstStruct struct;</summary>
        /// <param name="first"></param>
        /// <remarks>
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiMethod(name: "readFirstNumber", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"first\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.MyFirstStruct\"}}]")]
        public virtual double ReadFirstNumber(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct first)
        {
            return InvokeInstanceMethod<double>(new System.Type[]{typeof(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct)}, new object[]{first});
        }

        /// <summary></summary>
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
