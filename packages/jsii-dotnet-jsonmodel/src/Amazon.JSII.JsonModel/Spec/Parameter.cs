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
            TypeInstance value,
            Docs docs = null,
            bool? isVariadic = null
        )
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Value = value ?? throw new ArgumentNullException(nameof(value));
            Docs = docs;
            IsVariadic = isVariadic;
        }

        [JsonProperty("name")]
        public string Name { get; }

        [JsonProperty("value")]
        public TypeInstance Value { get; }

        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs Docs { get; }

        [JsonProperty("variadic", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsVariadic{ get; }
    }
}