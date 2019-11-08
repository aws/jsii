using System;

namespace Amazon.JSII.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Interface)]
    public sealed class JsiiInterfaceAttribute : JsiiTypeAttributeBase
    {
        public JsiiInterfaceAttribute(Type nativeType, string fullyQualifiedName)
            : base(nativeType, fullyQualifiedName)
        {
        }
    }
}
