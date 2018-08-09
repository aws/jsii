using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class AssemblyTargets
    {
        public AssemblyTargets(DotNetTarget dotnet, IDictionary<string, object> others = null)
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
                string title = null,
                bool? signAssembly = null,
                string assemblyOriginatorKey = null,
                string[] tags = null,
                string iconUrl = null
            )
            {
                Namespace = @namespace ?? throw new ArgumentNullException(nameof(@namespace));
                PackageId = packageId ?? throw new ArgumentNullException(nameof(packageId));

                Title = title;
                SignAssembly = signAssembly;
                AssemblyOriginatorKey = assemblyOriginatorKey;
                Tags = tags;
                IconUrl = iconUrl;
            }
            
            [JsonProperty("namespace")]
            public string Namespace { get; }

            [JsonProperty("packageId")]
            public string PackageId { get; }

            [JsonProperty("title", NullValueHandling = NullValueHandling.Ignore)]
            public string Title { get; }

            [JsonProperty("signAssembly", NullValueHandling = NullValueHandling.Ignore)]
            public bool? SignAssembly { get; }

            [JsonProperty("assemblyOriginatorKey", NullValueHandling = NullValueHandling.Ignore)]
            public string AssemblyOriginatorKey { get; }

            [JsonProperty("tags", NullValueHandling = NullValueHandling.Ignore)]
            public string[] Tags { get; }

            [JsonProperty("iconUrl", NullValueHandling = NullValueHandling.Ignore)]
            public string IconUrl { get; }
        }
    }
}
