using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class TypeInstance
    {
        public TypeInstance(
            TypeReference type,
            bool? isOptional = null,
            bool? isPromise = null
        )
        {
            Type = type;
            IsOptional = isOptional;
            IsPromise = isPromise;
        }

        [JsonProperty("type")]
        public TypeReference Type { get; }

        [JsonProperty("optional", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsOptional { get; }

        [JsonProperty("promise", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsPromise { get; }
    }
}
