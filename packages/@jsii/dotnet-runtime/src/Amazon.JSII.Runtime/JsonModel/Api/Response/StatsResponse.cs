using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class StatsResponse : IKernelResponse
    {
        public StatsResponse(int objectCount)
        {
            ObjectCount = objectCount;
        }

        [JsonProperty("objectCount")]
        public int ObjectCount { get; }
    }
}