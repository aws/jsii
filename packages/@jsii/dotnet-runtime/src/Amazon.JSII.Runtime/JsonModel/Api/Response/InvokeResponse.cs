using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class InvokeResponse : IKernelResponse
    {
        public InvokeResponse(object? result = null)
        {
            Result = result;
        }

        [JsonProperty("result", NullValueHandling = NullValueHandling.Ignore)]
        public object? Result { get; }
    }
}