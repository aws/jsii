using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class StaticGetRequest : IKernelRequest
    {
        public StaticGetRequest(string fullyQualifiedName, string property)
        {
            FullyQualifiedName = fullyQualifiedName ?? throw new ArgumentNullException(nameof(fullyQualifiedName));
            Property = property ?? throw new ArgumentNullException(nameof(property));
        }

        [JsonProperty("api")]
        public string Api { get; } = "sget";

        [JsonProperty("fqn")]
        public string FullyQualifiedName { get; }

        [JsonProperty("property")]
        public string Property { get; }
    }
}
