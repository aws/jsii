using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class CompleteResponse : IKernelResponse
    {
        public CompleteResponse(string callbackId)
        {
            CallbackId = callbackId ?? throw new ArgumentNullException(nameof(callbackId));
        }

        [JsonProperty("cbid")]
        public string CallbackId { get; }
    }
}