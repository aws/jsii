using Newtonsoft.Json;
using System;

namespace AWS.Jsii.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class LoadRequest : IKernelRequest
    {
        public LoadRequest(Spec.Assembly assembly)
        {
            Assembly = assembly ?? throw new ArgumentNullException(nameof(assembly));
        }

        [JsonProperty("api")]
        public string Api { get; } = "load";

        [JsonProperty("assembly")]
        public Spec.Assembly Assembly { get; }
    }
}