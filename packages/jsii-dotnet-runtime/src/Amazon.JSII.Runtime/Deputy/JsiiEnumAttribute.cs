using System;

namespace Amazon.JSII.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Enum, Inherited = false)]
    public class JsiiEnumAttribute : JsiiTypeAttributeBase
    {
        public  JsiiEnumAttribute(Type nativeType, string fullyQualifiedName)
            : base(nativeType, fullyQualifiedName)
        {
        }
    }
}
