using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class CreateRequest : IKernelRequest
    {
        public CreateRequest(string fullyQualifiedName, object[] arguments = null, Override[] overrides = null)
        {
            FullyQualifiedName = fullyQualifiedName ?? throw new ArgumentNullException(nameof(fullyQualifiedName));
            Arguments = arguments;
            Overrides = overrides ?? new Override[] { };
        }

        [JsonProperty("api")]
        public string Api { get; } = "create";

        [JsonProperty("fqn")]
        public string FullyQualifiedName { get; }

        [JsonProperty("args", NullValueHandling = NullValueHandling.Ignore)]
        public object[] Arguments { get; }

        [JsonProperty("overrides", NullValueHandling = NullValueHandling.Ignore)]
        public Override[] Overrides { get; }
    }
}