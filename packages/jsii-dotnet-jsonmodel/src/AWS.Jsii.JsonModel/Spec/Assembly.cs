using AWS.Jsii.JsonModel.Converters;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AWS.Jsii.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class Assembly : IDocumentable
    {
        public Assembly
        (
            string name,
            string package,
            IDictionary<string, string> names,
            IDictionary<string, IDictionary<string, string>> nativeNames,
            string version,
            IDictionary<string, Type> types,
            IDictionary<string, Type> externalTypes = null,
            string code = null,
            IDictionary<string, PackageVersion> dependencies = null,
            IDictionary<string, string> bundled = null,
            Docs docs = null,
            Readme readme = null
        )
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Package = package ?? throw new ArgumentNullException(nameof(package));
            Names = names ?? throw new ArgumentNullException(nameof(names));
            NativeNames = nativeNames ?? throw new ArgumentNullException(nameof(nativeNames));
            Version = version ?? throw new ArgumentNullException(nameof(version));
            Types = types ?? throw new ArgumentNullException(nameof(types));
            ExternalTypes = externalTypes;
            Code = code;
            Dependencies = dependencies;
            Bundled = bundled;
            Docs = docs;
            Readme = readme;
        }

        [JsonProperty("schema")]
        public string Schema { get; } = Constants.SPEC_VERSION;

        [JsonProperty("name")]
        public string Name { get; }

        [JsonProperty("package")]
        public string Package { get; }

        [JsonProperty("names")]
        public IDictionary<string, string> Names { get; }

        [JsonProperty("nativenames")]
        public IDictionary<string, IDictionary<string, string>> NativeNames { get; }

        [JsonProperty("version")]
        public string Version { get; }

        [JsonProperty("types", ItemConverterType = typeof(TypeConverter))]
        [JsonConverter(typeof(TypeDictionaryConverter))]
        public IDictionary<string, Type> Types { get; }

        [JsonProperty("externalTypes", ItemConverterType = typeof(TypeConverter), NullValueHandling = NullValueHandling.Ignore)]
        [JsonConverter(typeof(TypeDictionaryConverter))]
        public IDictionary<string, Type> ExternalTypes { get; }

        [JsonProperty("code", NullValueHandling = NullValueHandling.Ignore)]
        public string Code { get; set; }

        [JsonProperty("dependencies", NullValueHandling = NullValueHandling.Ignore)]
        public IDictionary<string, PackageVersion> Dependencies { get; }

        [JsonProperty("bundled", NullValueHandling = NullValueHandling.Ignore)]
        public IDictionary<string, string> Bundled { get; }

        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs Docs { get; }

        [JsonProperty("readme", NullValueHandling = NullValueHandling.Ignore)]
        public Readme Readme { get; }
    }
}