using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public abstract class Type : IDocumentable
    {
        protected Type
        (
            string fullyQualifiedName,
            string assembly,
            string name,
            string? @namespace,
            TypeKind kind,
            Docs? docs = null
        )
        {
            FullyQualifiedName = fullyQualifiedName ?? throw new ArgumentNullException(nameof(fullyQualifiedName));
            Assembly = assembly ?? throw new ArgumentNullException(nameof(assembly));
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Namespace = @namespace;
            Kind = kind;
            Docs = docs;
        }

        [JsonProperty("fqn")]
        public string FullyQualifiedName { get; }

        [JsonProperty("assembly")]
        public string Assembly { get; }

        [JsonProperty("name")]
        public string Name { get; }

        [JsonProperty("namespace", NullValueHandling = NullValueHandling.Ignore)]
        public string? Namespace { get; }

        [JsonProperty("kind", DefaultValueHandling = DefaultValueHandling.Include)]
        public TypeKind Kind { get; }

        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs? Docs { get; }

        [JsonIgnore]
        public string QualifiedNamespace => this.Assembly + (this.Namespace != null ? $".{this.Namespace}" : "");
    }
}
