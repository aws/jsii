using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class EndResponse : IKernelResponse
    {
        public EndResponse(object result)
        {
            Result = result ?? throw new ArgumentNullException(nameof(result));
        }

        [JsonProperty("result")]
        public object Result { get; }
    }
}