using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class HelloResponse : IKernelResponse
    {
        public HelloResponse(string hello)
        {
            Hello = hello ?? throw new ArgumentNullException(nameof(hello));
        }

        [JsonProperty("hello")]
        public string Hello { get; }
    }
}