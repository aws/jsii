using Newtonsoft.Json;
using System;

namespace AWS.Jsii.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class CompleteRequest : IKernelRequest
    {
        public CompleteRequest(string callbackId, string error = null, object result = null)
        {
            CallbackId = callbackId ?? throw new ArgumentNullException(nameof(callbackId));
            Error = error;
            Result = result;
        }

        [JsonProperty("api")]
        public string Api { get; } = "complete";

        [JsonProperty("cbid")]
        public string CallbackId { get; }

        [JsonProperty("error", NullValueHandling = NullValueHandling.Ignore)]
        public string Error { get; }

        [JsonProperty("result", NullValueHandling = NullValueHandling.Ignore)]
        public object Result { get; }
    }
}