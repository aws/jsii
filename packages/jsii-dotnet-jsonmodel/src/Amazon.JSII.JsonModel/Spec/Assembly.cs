using Amazon.JSII.JsonModel.Converters;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class Assembly : DependencyRoot, IDocumentable
    {
        public Assembly
        (
            string name,
            string version,
            IDictionary<string, Type> types = null,
            Targets targets = null,
            IDictionary<string, Type> externals = null,
            IDictionary<string, PackageVersion> dependencies = null,
            IDictionary<string, string> bundled = null,
            Docs docs = null,
            Readme readme = null
        ): base(targets, dependencies)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Version = version ?? throw new ArgumentNullException(nameof(version));
            Types = types;
            Externals = externals;
            Bundled = bundled;
            Docs = docs;
            Readme = readme;
        }

        [JsonProperty("schema")]
        public string Schema { get; } = Constants.SPEC_VERSION;

        [JsonProperty("name")]
        public string Name { get; }

        [JsonProperty("version")]
        public string Version { get; }

        [JsonProperty("types", ItemConverterType = typeof(TypeConverter))]
        [JsonConverter(typeof(TypeDictionaryConverter))]
        public IDictionary<string, Type> Types { get; }

        [JsonProperty("externals", ItemConverterType = typeof(TypeConverter), NullValueHandling = NullValueHandling.Ignore)]
        [JsonConverter(typeof(TypeDictionaryConverter))]
        public IDictionary<string, Type> Externals { get; }

        [JsonProperty("bundled", NullValueHandling = NullValueHandling.Ignore)]
        public IDictionary<string, string> Bundled { get; }

        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs Docs { get; }

        [JsonProperty("readme", NullValueHandling = NullValueHandling.Ignore)]
        public Readme Readme { get; }
    }
}
