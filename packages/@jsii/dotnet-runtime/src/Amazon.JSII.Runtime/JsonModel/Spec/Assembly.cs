using Amazon.JSII.JsonModel.Converters;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class Assembly : DependencyRoot, IDocumentable
    {
        [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
        public class AssemblyRepository
        {
            public AssemblyRepository(string type, string url)
            {
                Type = type ?? throw new ArgumentNullException(nameof(type));
                Url = url ?? throw new ArgumentNullException(nameof(url));
            }

            [JsonProperty("type")]
            public string Type { get; }

            [JsonProperty("url")]
            public string Url { get; }
        }

        public Assembly
        (
            string name,
            string description,
            string homepage,
            AssemblyRepository repository,
            Person author,
            string fingerprint,
            string version,
            string license,
            AssemblyTargets? targets = null,
            IDictionary<string, PackageVersion>? dependencies = null,
            Person[]? contributors = null,
            IDictionary<string, string>? bundled = null,
            IDictionary<string, Type>? types = null,
            Docs? docs = null,
            Readme? readme = null
        ): base(targets, dependencies)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Description = description ?? throw new ArgumentNullException(nameof(description));
            Homepage = homepage ?? throw new ArgumentNullException(nameof(homepage));
            Repository = repository ?? throw new ArgumentNullException(nameof(repository));
            Author = author ?? throw new ArgumentNullException(nameof(author));
            Fingerprint = fingerprint ?? throw new ArgumentNullException(nameof(fingerprint));
            Version = version ?? throw new ArgumentNullException(nameof(version));
            License = license ?? throw new ArgumentNullException(nameof(license));
            Contributors = contributors;
            Bundled = bundled;
            Types = types;
            Docs = docs;
            Readme = readme;
        }

        [JsonProperty("schema")]
        public string Schema { get; } = Constants.SpecVersion;

        [JsonProperty("name")]
        public string Name { get; }

        [JsonProperty("description")]
        public string Description { get; }

        [JsonProperty("homepage")]
        public string Homepage { get; }

        [JsonProperty("repository")]
        public AssemblyRepository Repository { get; }

        [JsonProperty("author")]
        public Person Author { get; }

        [JsonProperty("fingerprint")]
        public string Fingerprint { get; }

        [JsonProperty("version")]
        public string Version { get; }

        [JsonProperty("license")]
        public string License { get; }

        [JsonProperty("contributors", NullValueHandling = NullValueHandling.Ignore)]
        public Person[]? Contributors { get; }

        [JsonProperty("bundled", NullValueHandling = NullValueHandling.Ignore)]
        public IDictionary<string, string>? Bundled { get; }

        [JsonProperty("types", ItemConverterType = typeof(TypeConverter))]
        [JsonConverter(typeof(TypeDictionaryConverter))]
        public IDictionary<string, Type>? Types { get; }

        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs? Docs { get; }

        [JsonProperty("readme", NullValueHandling = NullValueHandling.Ignore)]
        public Readme? Readme { get; }
    }
}
