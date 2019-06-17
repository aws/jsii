using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <remarks>
    /// stability: experimental
    /// </remarks>
    [JsiiClass(nativeType: typeof(GiveMeStructs), fullyQualifiedName: "jsii-calc.GiveMeStructs")]
    public class GiveMeStructs : DeputyBase
    {
        public GiveMeStructs(): base(new DeputyProps(new object[]{}))
        {
        }

        protected GiveMeStructs(ByRefValue reference): base(reference)
        {
        }

        protected GiveMeStructs(DeputyProps props): base(props)
        {
        }

        /// <summary>Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.</summary>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "derivedToFirst", returnsJson: "{\"type\":{\"fqn\":\"@scope/jsii-calc-lib.MyFirstStruct\"}}", parametersJson: "[{\"name\":\"derived\",\"type\":{\"fqn\":\"jsii-calc.DerivedStruct\"}}]")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct DerivedToFirst(Amazon.JSII.Tests.CalculatorNamespace.IDerivedStruct derived)
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct>(new object[]{derived});
        }

        /// <summary>Returns the boolean from a DerivedStruct struct.</summary>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "readDerivedNonPrimitive", returnsJson: "{\"type\":{\"fqn\":\"jsii-calc.DoubleTrouble\"}}", parametersJson: "[{\"name\":\"derived\",\"type\":{\"fqn\":\"jsii-calc.DerivedStruct\"}}]")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.DoubleTrouble ReadDerivedNonPrimitive(Amazon.JSII.Tests.CalculatorNamespace.IDerivedStruct derived)
        {
            return InvokeInstanceMethod<Amazon.JSII.Tests.CalculatorNamespace.DoubleTrouble>(new object[]{derived});
        }

        /// <summary>Returns the "anumber" from a MyFirstStruct struct;</summary>
        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiMethod(name: "readFirstNumber", returnsJson: "{\"type\":{\"primitive\":\"number\"}}", parametersJson: "[{\"name\":\"first\",\"type\":{\"fqn\":\"@scope/jsii-calc-lib.MyFirstStruct\"}}]")]
        public virtual double ReadFirstNumber(Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IMyFirstStruct first)
        {
            return InvokeInstanceMethod<double>(new object[]{first});
        }

        /// <remarks>
        /// stability: experimental
        /// </remarks>
        [JsiiProperty(name: "structLiteral", typeJson: "{\"fqn\":\"@scope/jsii-calc-lib.StructWithOnlyOptionals\"}")]
        public virtual Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IStructWithOnlyOptionals StructLiteral
        {
            get => GetInstanceProperty<Amazon.JSII.Tests.CalculatorNamespace.LibNamespace.IStructWithOnlyOptionals>();
        }
    }
}
