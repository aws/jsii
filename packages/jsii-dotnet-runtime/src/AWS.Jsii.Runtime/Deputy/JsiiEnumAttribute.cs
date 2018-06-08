using System;

namespace AWS.Jsii.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Enum, Inherited = false)]
    public class JsiiEnumAttribute : JsiiTypeAttributeBase
    {
        public  JsiiEnumAttribute(string package, string fullyQualifiedName)
            : base(package, fullyQualifiedName)
        {
        }
    }
}
