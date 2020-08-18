using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class EndRequest : IKernelRequest
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