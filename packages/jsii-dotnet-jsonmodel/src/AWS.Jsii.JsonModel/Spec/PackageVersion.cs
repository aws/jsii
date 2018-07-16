using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AWS.Jsii.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class PackageVersion: DependencyRoot
    {
        public PackageVersion
        (
            string package,
            string version,
            Targets targets,
            IDictionary<string, PackageVersion> dependencies = null
        ): base(dependencies, targets)
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
