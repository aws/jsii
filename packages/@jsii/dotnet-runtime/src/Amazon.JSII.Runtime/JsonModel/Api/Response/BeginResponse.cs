using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class BeginResponse : IKernelResponse
    {
        public BeginResponse(string promiseId)
        {
            PromiseId = promiseId ?? throw new ArgumentNullException(nameof(promiseId));
        }

        [JsonProperty("promiseid")]
        public string PromiseId { get; }
    }
}