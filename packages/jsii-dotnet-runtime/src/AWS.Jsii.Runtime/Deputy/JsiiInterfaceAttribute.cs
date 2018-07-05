using System;

namespace AWS.Jsii.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Interface, Inherited = false)]
    public class JsiiInterfaceAttribute : JsiiTypeAttributeBase
    {
        public JsiiInterfaceAttribute(Type nativeType, string fullyQualifiedName)
            : base(nativeType, fullyQualifiedName)
        {
        }
    }
}
