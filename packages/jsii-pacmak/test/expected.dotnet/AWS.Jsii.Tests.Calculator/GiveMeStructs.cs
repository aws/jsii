using AWS.Jsii.Runtime.Deputy;
using AWS.Jsii.Tests.Calculator.Lib;

namespace AWS.Jsii.Tests.Calculator
{
    [JsiiClass("jsii-calc", "jsii$jsii_calc$.GiveMeStructs", "[]")]
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

        [JsiiProperty("structLiteral", "{\"fqn\":\"jsii$jsii_calc_lib$.StructWithOnlyOptionals\"}")]
        public virtual IStructWithOnlyOptionals StructLiteral
        {
            get => GetProperty<IStructWithOnlyOptionals>();
        }

        /// <summary>Returns the "anumber" from a MyFirstStruct struct;</summary>
        [JsiiMethod("readFirstNumber", "{\"primitive\":\"number\"}", "[{\"name\":\"first\",\"type\":{\"fqn\":\"jsii$jsii_calc_lib$.MyFirstStruct\"}}]")]
        public virtual double ReadFirstNumber(IMyFirstStruct first)
        {
            return InvokeMethod<double>(new object[]{first});
        }

        /// <summary>Returns the boolean from a DerivedStruct struct.</summary>
        [JsiiMethod("readDerivedNonPrimitive", "{\"fqn\":\"jsii$jsii_calc$.DoubleTrouble\"}", "[{\"name\":\"derived\",\"type\":{\"fqn\":\"jsii$jsii_calc$.DerivedStruct\"}}]")]
        public virtual DoubleTrouble ReadDerivedNonPrimitive(IDerivedStruct derived)
        {
            return InvokeMethod<DoubleTrouble>(new object[]{derived});
        }

        /// <summary>Accepts a struct of type DerivedStruct and returns a struct of type FirstStruct.</summary>
        [JsiiMethod("derivedToFirst", "{\"fqn\":\"jsii$jsii_calc_lib$.MyFirstStruct\"}", "[{\"name\":\"derived\",\"type\":{\"fqn\":\"jsii$jsii_calc$.DerivedStruct\"}}]")]
        public virtual IMyFirstStruct DerivedToFirst(IDerivedStruct derived)
        {
            return InvokeMethod<IMyFirstStruct>(new object[]{derived});
        }
    }
}