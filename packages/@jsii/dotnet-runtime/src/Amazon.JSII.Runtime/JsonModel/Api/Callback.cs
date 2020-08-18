using Amazon.JSII.JsonModel.Api.Request;
using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class Callback
    {
        public Callback
        (
            string callbackId,
            string? cookie = null,
            InvokeRequest? invoke = null,
            GetRequest? get = null,
            SetRequest? set = null
        )
        {
            CallbackId = callbackId ?? throw new ArgumentNullException(nameof(callbackId));
            Cookie = cookie;
            Invoke = invoke;
            Get = get;
            Set = set;
        }

        [JsonProperty("cbid")]
        public string CallbackId { get; }

        [JsonProperty("cookie", NullValueHandling = NullValueHandling.Ignore)]
        public string? Cookie { get; }

        [JsonProperty("invoke", NullValueHandling = NullValueHandling.Ignore)]
        public InvokeRequest? Invoke { get; }

        [JsonProperty("get", NullValueHandling = NullValueHandling.Ignore)]
        public GetRequest? Get { get; }

        [JsonProperty("set", NullValueHandling = NullValueHandling.Ignore)]
        public SetRequest? Set { get; }
    }
}