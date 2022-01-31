using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json;
using System;

namespace Amazon.JSII.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Method)]
    public sealed class JsiiMethodAttribute : Attribute
    {
        public JsiiMethodAttribute(
            string name,
            string? returnsJson = null,
            string? parametersJson = null,
            bool isAsync = false,
            // Unused, retained for backwards-compatibility
            bool isOverride = false)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Returns = returnsJson == null
                ? null
                : JsonConvert.DeserializeObject<OptionalValue>(returnsJson);
            Parameters = parametersJson == null
                ? Array.Empty<Parameter>()
                : JsonConvert.DeserializeObject<Parameter[]>(parametersJson)
                  ?? throw new ArgumentException("Invalid JSON descriptor", nameof(parametersJson));
            IsAsync = isAsync;
        }

        public string Name { get; }

        public OptionalValue? Returns { get; }

        public Parameter[] Parameters { get; }


        public bool IsAsync { get; }
    }
}
