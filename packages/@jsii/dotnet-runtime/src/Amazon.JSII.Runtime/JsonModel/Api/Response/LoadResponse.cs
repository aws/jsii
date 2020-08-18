using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class LoadResponse : IKernelResponse
    {
        public LoadResponse(string assembly, int typeCount)
        {
            Assembly = assembly ?? throw new ArgumentNullException(nameof(assembly));
            TypeCount = typeCount;
        }

        [JsonProperty("assembly")]
        public string Assembly { get; }

        [JsonProperty("types")]
        public int TypeCount { get; }
    }
}