using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AWS.Jsii.JsonModel.Spec
{
    public abstract class DependencyRoot
    {
        public DependencyRoot
        (
            Targets targets,
            IDictionary<string, PackageVersion> dependencies = null
        )
        {
            Targets = targets ?? throw new ArgumentNullException(nameof(targets));
            Dependencies = dependencies;
        }

        [JsonProperty("dependencies", NullValueHandling = NullValueHandling.Ignore)]
        public IDictionary<string, PackageVersion> Dependencies { get; }

        [JsonProperty("targets")]
        public Targets Targets { get; }
    }
}
