using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class LoadRequest : IKernelRequest
    {
        public LoadRequest(string name, string version, string tarball)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Version = version ?? throw new ArgumentNullException(nameof(version));
            Tarball = tarball ?? throw new ArgumentNullException(nameof(tarball));
        }

        [JsonProperty("api")]
        public string Api { get; } = "load";

        [JsonProperty("name")]
        public string Name { get; }

        [JsonProperty("version")]
        public string Version { get; }

        [JsonProperty("tarball")]
        public string Tarball { get; }
    }
}