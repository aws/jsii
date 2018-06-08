using System;

namespace AWS.Jsii.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Interface, Inherited = false)]
    public class JsiiInterfaceAttribute : JsiiTypeAttributeBase
    {
        public JsiiInterfaceAttribute(string package, string fullyQualifiedName)
            : base(package, fullyQualifiedName)
        {
        }
    }
}
