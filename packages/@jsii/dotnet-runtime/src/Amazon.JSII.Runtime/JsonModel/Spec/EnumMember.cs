using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class EnumMember : IDocumentable
    {
        public EnumMember(string name, Docs? docs = null)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Docs = docs;
        }

        [JsonProperty("name")]
        public string Name { get; }

        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs? Docs { get; }
    }
}