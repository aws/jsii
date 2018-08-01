using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class CallbackResponse
    {
        public CallbackResponse(Callback callback)
        {
            Callback = callback ?? throw new ArgumentNullException(nameof(callback));
        }

        [JsonProperty("callback")]
        public Callback Callback { get; }
    }
}
