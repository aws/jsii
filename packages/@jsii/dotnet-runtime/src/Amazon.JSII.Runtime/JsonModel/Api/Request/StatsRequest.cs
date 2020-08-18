using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class StatsRequest : IKernelRequest
    {
        [JsonProperty("api")]
        public string Api { get; } = "stats";
    }
}