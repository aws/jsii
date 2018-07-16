using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AWS.Jsii.JsonModel.Spec
{
    public abstract class DependencyRoot
    {
        public DependencyRoot
        (
            IDictionary<string, PackageVersion> dependencies,
            Targets targets
        )
        {
            Dependencies = dependencies;
            Targets = targets ?? throw new ArgumentNullException(nameof(targets));
        }

        [JsonProperty("dependencies", NullValueHandling = NullValueHandling.Ignore)]
        public IDictionary<string, PackageVersion> Dependencies { get; }

        [JsonProperty("targets")]
        public Targets Targets { get; }
    }
}
