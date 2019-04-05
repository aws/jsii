using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class UnionTypeReference
    {
        public UnionTypeReference(TypeInstance[] types)
        {
            Types = types ?? throw new ArgumentNullException(nameof(types));
        }

        [JsonProperty("types")]
        public TypeInstance[] Types { get; }
    }
}