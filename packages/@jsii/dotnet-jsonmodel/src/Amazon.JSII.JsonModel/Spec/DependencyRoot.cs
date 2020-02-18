using Newtonsoft.Json;
using System.Collections.Generic;

namespace Amazon.JSII.JsonModel.Spec
{
    public abstract class DependencyRoot
    {
        public DependencyRoot
        (
            AssemblyTargets? targets = null,
            IDictionary<string, PackageVersion>? dependencies = null
        )
        {
            Targets = targets;
            Dependencies = dependencies;
        }

        [JsonProperty("dependencies", NullValueHandling = NullValueHandling.Ignore)]
        public IDictionary<string, PackageVersion>? Dependencies { get; }

        [JsonProperty("targets")]
        public AssemblyTargets? Targets { get; }
    }
}
