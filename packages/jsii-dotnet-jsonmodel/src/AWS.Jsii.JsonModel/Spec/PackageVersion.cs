using Newtonsoft.Json;
using System;

namespace AWS.Jsii.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class PackageVersion
    {
        public PackageVersion(string package, string version)
        {
            Package = package ?? throw new ArgumentNullException(nameof(package));
            Version = version ?? throw new ArgumentNullException(nameof(version));
        }

        [JsonProperty("package")]
        public string Package { get; }

        [JsonProperty("version")]
        public string Version { get; }
    }
}
