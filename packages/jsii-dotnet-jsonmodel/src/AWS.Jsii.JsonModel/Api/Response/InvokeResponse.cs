using Newtonsoft.Json;

namespace AWS.Jsii.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class InvokeResponse : IKernelResponse
    {
        public InvokeResponse(object result = null)
        {
            Result = result;
        }

        [JsonProperty("result", NullValueHandling = NullValueHandling.Ignore)]
        public object Result { get; }
    }
}