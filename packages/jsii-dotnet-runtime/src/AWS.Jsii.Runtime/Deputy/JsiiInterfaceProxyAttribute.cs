using System;

namespace AWS.Jsii.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Class, Inherited = false)]
    public class JsiiInterfaceProxyAttribute : JsiiTypeAttributeBase
    {
        public JsiiInterfaceProxyAttribute(string package, string fullyQualifiedName)
            : base(package, fullyQualifiedName)
        {
        }
    }
}
