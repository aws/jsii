using Newtonsoft.Json;
using System;

namespace AWS.Jsii.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class CallbacksResponse : IKernelResponse
    {
        public CallbacksResponse(Callback[] callbacks)
        {
            Callbacks = callbacks ?? throw new ArgumentNullException(nameof(callbacks));
        }

        [JsonProperty("callbacks")]
        public Callback[] Callbacks { get; }
    }
}