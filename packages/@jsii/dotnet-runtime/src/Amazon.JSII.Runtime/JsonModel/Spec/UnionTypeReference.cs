using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class UnionTypeReference
    {
        public UnionTypeReference(TypeReference[] types)
        {
            Types = types ?? throw new ArgumentNullException(nameof(types));
        }

        [JsonProperty("types")]
        public TypeReference[] Types { get; }
    }
}