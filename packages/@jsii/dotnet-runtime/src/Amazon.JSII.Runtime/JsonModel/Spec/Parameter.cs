using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class Parameter : OptionalValue, IDocumentable
    {
        public Parameter
        (
            string name,
            TypeReference type,
            bool isOptional = false,
            bool isVariadic = false,
            Docs? docs = null
        ): base(type: type, isOptional: isOptional)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Docs = docs;
            IsVariadic = isVariadic;
        }

        [JsonProperty("name")]
        public string Name { get; }
        
        [JsonProperty("variadic", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsVariadic { get; }
        
        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs? Docs { get; }
    }
}