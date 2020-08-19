using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class PackageVersion: DependencyRoot
    {
        public PackageVersion
        (
            string version,
            AssemblyTargets? targets = null,
            IDictionary<string, PackageVersion>? dependencies = null
        ): base(targets, dependencies)
        {
            Version = version ?? throw new ArgumentNullException(nameof(version));
        }

        [JsonProperty("version")]
        public string Version { get; }
    }
}
