using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class StaticSetRequest : IKernelRequest
    {
        public StaticSetRequest(string fullyQualifiedName, string property, object? value)
        {
            FullyQualifiedName = fullyQualifiedName ?? throw new ArgumentNullException(nameof(fullyQualifiedName));
            Property = property ?? throw new ArgumentNullException(nameof(property));
            Value = value ?? throw new ArgumentNullException(nameof(value));
        }

        [JsonProperty("api")]
        public string Api { get; } = "sset";

        [JsonProperty("fqn")]
        public string FullyQualifiedName { get; }

        [JsonProperty("property")]
        public string Property { get; }

        [JsonProperty("value")]
        public object? Value { get; }
    }
}
