using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json;
using System;

namespace Amazon.JSII.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Class, Inherited = false)]
    public sealed class JsiiClassAttribute : JsiiTypeAttributeBase
    {
        public JsiiClassAttribute(System.Type nativeType, string fullyQualifiedName, string? parametersJson = null)
            : base(nativeType, fullyQualifiedName)
        {
            Parameters = parametersJson == null
                ? Array.Empty<Parameter>()
                : JsonConvert.DeserializeObject<Parameter[]>(parametersJson)
                  ?? throw new ArgumentException("Invalid JSON descriptor", nameof(parametersJson));
        }

        public Parameter[] Parameters { get; }
    }
}