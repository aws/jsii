using Newtonsoft.Json;

namespace AWS.Jsii.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class CallbacksRequest : IKernelRequest
    {
        [JsonProperty("api")]
        public string Api { get; } = "callbacks";
    }
}