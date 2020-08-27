using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class CallbacksResponse : IKernelResponse
    {
        public CallbacksResponse(Callback[] callbacks)
        {
            Callbacks = callbacks ?? throw new ArgumentNullException(nameof(callbacks));
        }

        [JsonProperty("callbacks")]
        public Callback[] Callbacks { get; }
    }
}