using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class AssemblyTargets
    {
        public AssemblyTargets(DotNetTarget dotnet)
        {
            DotNet = dotnet ?? throw new ArgumentNullException(nameof(dotnet));
        }

        [JsonProperty("dotnet", NullValueHandling = NullValueHandling.Ignore)]
        public DotNetTarget DotNet { get; }

        [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
        public class DotNetTarget
        {
            public DotNetTarget
            (
                string @namespace,
                string packageId,
                string? title = null,
                string? iconUrl = null,
                string? versionSuffix = null
            )
            {
                Namespace = @namespace ?? throw new ArgumentNullException(nameof(@namespace));
                PackageId = packageId ?? throw new ArgumentNullException(nameof(packageId));

                Title = title;
                IconUrl = iconUrl;
                VersionSuffix = versionSuffix;

                if (VersionSuffix != null && !VersionSuffix.StartsWith("-", StringComparison.InvariantCulture))
                {
                    throw new ArgumentException($"{nameof(versionSuffix)} must start with a '-' (received {versionSuffix})");
                }
            }

            [JsonProperty("namespace")]
            public string Namespace { get; }

            [JsonProperty("packageId")]
            public string PackageId { get; }

            [JsonProperty("title", NullValueHandling = NullValueHandling.Ignore)]
            public string? Title { get; }

            [JsonProperty("iconUrl", NullValueHandling = NullValueHandling.Ignore)]
            public string? IconUrl { get; }

            [JsonProperty("versionSuffix", NullValueHandling = NullValueHandling.Ignore)]
            public string? VersionSuffix { get; }
    }
    }
}
