using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class StaticInvokeRequest : IKernelRequest
    {
        public StaticInvokeRequest(string fullyQualifiedName, string method, object?[]? arguments = null)
        {
            FullyQualifiedName = fullyQualifiedName ?? throw new ArgumentNullException(nameof(fullyQualifiedName));
            Method = method ?? throw new ArgumentNullException(nameof(method));
            Arguments = arguments;
        }

        [JsonProperty("api")]
        public string Api { get; } = "sinvoke";

        [JsonProperty("fqn")]
        public string FullyQualifiedName { get; }

        [JsonProperty("method")]
        public string Method { get; }

        [JsonProperty("args", NullValueHandling = NullValueHandling.Ignore)]
        public object?[]? Arguments { get; }
    }
}
