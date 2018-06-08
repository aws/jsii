using System;

namespace AWS.Jsii.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Field)]
    public class JsiiEnumMemberAttribute : Attribute
    {
        public JsiiEnumMemberAttribute(string name)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
        }

        public string Name
        {
            get;
        }
    }
}
