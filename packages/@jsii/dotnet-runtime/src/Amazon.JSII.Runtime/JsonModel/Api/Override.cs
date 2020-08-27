using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Api
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class Override
    {
        public Override
        (
            string? method = null,
            string? property = null,
            string? cookie = null
        )
        {
            Method = method;
            Property = property;
            Cookie = cookie;
        }

        [JsonProperty("method", NullValueHandling = NullValueHandling.Ignore)]
        public string? Method { get; }

        [JsonProperty("property", NullValueHandling = NullValueHandling.Ignore)]
        public string? Property { get; }

        [JsonProperty("cookie", NullValueHandling = NullValueHandling.Ignore)]
        public string? Cookie { get; }
    }
}