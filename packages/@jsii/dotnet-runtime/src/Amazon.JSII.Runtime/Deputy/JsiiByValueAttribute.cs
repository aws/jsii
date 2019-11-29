using System;

namespace Amazon.JSII.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Class)]
    public sealed class JsiiByValueAttribute : Attribute
    {
        public JsiiByValueAttribute(string fqn)
        {
            FullyQualifiedName = fqn ?? throw new ArgumentNullException(nameof(fqn));
        }
        
        public string FullyQualifiedName { get; } 
    }
}