using Newtonsoft.Json;

namespace AWS.Jsii.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class StatsResponse : IKernelResponse
    {
        public StatsResponse(int objectCount)
        {
            ObjectCount = objectCount;
        }

        [JsonProperty("objectCount")]
        public int ObjectCount { get; }
    }
}