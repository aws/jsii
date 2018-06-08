using AWS.Jsii.JsonModel.Spec;
using Newtonsoft.Json;
using System;

namespace AWS.Jsii.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Property)]
    public class JsiiPropertyAttribute : Attribute
    {
        public JsiiPropertyAttribute(string name, string typeJson, bool isOverride = false)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Type = JsonConvert.DeserializeObject<TypeReference>(typeJson ?? throw new ArgumentNullException(nameof(typeJson)));
            IsOverride = isOverride;
        }

        public string Name { get; }

        public TypeReference Type { get; }

        public bool IsOverride { get; }
    }
}
