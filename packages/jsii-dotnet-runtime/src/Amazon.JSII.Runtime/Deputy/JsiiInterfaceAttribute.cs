using System;

namespace Amazon.JSII.Runtime.Deputy
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
