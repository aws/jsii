using Newtonsoft.Json;
using System;

namespace AWS.Jsii.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class EndResponse : IKernelResponse
    {
        public EndResponse(object result)
        {
            Result = result ?? throw new ArgumentNullException(nameof(result));
        }

        [JsonProperty("result")]
        public object Result { get; }
    }
}