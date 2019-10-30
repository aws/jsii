using System;

namespace Amazon.JSII.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Class)]
    public sealed class JsiiByValueAttribute : Attribute
    {
        public JsiiByValueAttribute(string fqn)
        {
            Fqn = fqn ?? throw new ArgumentNullException(nameof(fqn));
        }
        
        public string Fqn { get; } 
    }
}