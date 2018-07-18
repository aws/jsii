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
            string version,
            Targets targets,
            IDictionary<string, PackageVersion> dependencies = null
        ): base(targets, dependencies)
        {
            Version = version ?? throw new ArgumentNullException(nameof(version));
        }

        [JsonProperty("version")]
        public string Version { get; }
    }
}
