using System;

namespace AWS.Jsii.Runtime.Deputy
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
