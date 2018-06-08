using AWS.Jsii.JsonModel.Spec;
using Newtonsoft.Json;
using System;

namespace AWS.Jsii.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Method)]
    public class JsiiMethodAttribute : Attribute
    {
        public JsiiMethodAttribute(string name, string returnsJson, string parametersJson, bool isOverride = false)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Returns = returnsJson == null ?
                null :
                JsonConvert.DeserializeObject<TypeReference>(returnsJson);
            Parameters = JsonConvert.DeserializeObject<Parameter[]>(parametersJson ?? throw new ArgumentNullException(nameof(parametersJson)));
            IsOverride = isOverride;
        }

        public string Name { get; }

        public TypeReference Returns { get; }

        public Parameter[] Parameters { get; }

        public bool IsOverride { get; }
    }
}
