using Newtonsoft.Json;
using System;

namespace AWS.Jsii.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class EndRequest : IKernelRequest
    {
        public EndRequest(string promiseId)
        {
            PromiseId = promiseId ?? throw new ArgumentNullException(nameof(promiseId));
        }

        [JsonProperty("api")]
        public string Api { get; } = "end";

        [JsonProperty("promiseid")]
        public string PromiseId { get; }
    }
}