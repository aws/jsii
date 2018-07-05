using System;

namespace AWS.Jsii.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Class, Inherited = false)]
    public class JsiiInterfaceProxyAttribute : JsiiTypeAttributeBase
    {
        public JsiiInterfaceProxyAttribute(Type nativeType, string fullyQualifiedName)
            : base(nativeType, fullyQualifiedName)
        {
        }
    }
}
