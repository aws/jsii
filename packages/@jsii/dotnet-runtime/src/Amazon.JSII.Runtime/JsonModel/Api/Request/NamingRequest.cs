using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class NamingRequest : IKernelRequest
    {
        public NamingRequest(string assembly)
        {
            Assembly = assembly ?? throw new ArgumentNullException(nameof(assembly));
        }

        [JsonProperty("api")]
        public string Api { get; } = "naming";

        [JsonProperty("assembly")]
        public string Assembly { get; }
    }
}