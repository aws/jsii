using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Api.Response
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