using Newtonsoft.Json;
using System;

namespace AWS.Jsii.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class BeginResponse : IKernelResponse
    {
        public BeginResponse(string promiseId)
        {
            PromiseId = promiseId ?? throw new ArgumentNullException(nameof(promiseId));
        }

        [JsonProperty("promiseid")]
        public string PromiseId { get; }
    }
}