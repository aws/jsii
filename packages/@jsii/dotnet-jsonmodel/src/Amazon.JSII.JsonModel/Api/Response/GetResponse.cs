using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class GetResponse : IKernelResponse
    {
        public GetResponse(object value)
        {
            Value = value;
        }

        [JsonProperty("value")]
        public object Value { get; }
    }
}