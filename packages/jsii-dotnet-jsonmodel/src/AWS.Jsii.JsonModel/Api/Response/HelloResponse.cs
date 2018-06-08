using Newtonsoft.Json;
using System;

namespace AWS.Jsii.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class HelloResponse : IKernelResponse
    {
        public HelloResponse(string hello)
        {
            Hello = hello ?? throw new ArgumentNullException(nameof(hello));
        }

        [JsonProperty("hello")]
        public string Hello { get; }
    }
}