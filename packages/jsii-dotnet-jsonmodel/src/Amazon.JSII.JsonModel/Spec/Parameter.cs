using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class Parameter : IDocumentable
    {
        public Parameter
        (
            string name,
            TypeReference type,
            Docs docs = null,
            bool? isVariadic = null
        )
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Type = type ?? throw new ArgumentNullException(nameof(type));
            Docs = docs;
            IsVariadic = isVariadic;
        }

        [JsonProperty("name")]
        public string Name { get; }

        [JsonProperty("type")]
        public TypeReference Type { get; }

        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs Docs { get; }

        [JsonProperty("variadic", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsVariadic{ get; }
    }
}