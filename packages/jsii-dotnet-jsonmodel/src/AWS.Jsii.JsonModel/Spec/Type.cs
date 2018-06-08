using Newtonsoft.Json;
using System;

namespace AWS.Jsii.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public abstract class Type : IDocumentable
    {
        public Type
        (
            string fullyQualifiedName,
            string module,
            string name,
            string @namespace,
            TypeKind kind,
            Docs docs = null
        )
        {
            FullyQualifiedName = fullyQualifiedName ?? throw new ArgumentNullException(nameof(fullyQualifiedName));
            Module = module ?? throw new ArgumentNullException(nameof(module));
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Namespace = @namespace ?? throw new ArgumentNullException(nameof(@namespace));
            Kind = kind;
            Docs = docs;
        }

        [JsonProperty("fqn")]
        public string FullyQualifiedName { get; }

        [JsonProperty("module")]
        public string Module { get; }

        [JsonProperty("name")]
        public string Name { get; }

        [JsonProperty("namespace")]
        public string Namespace { get; }

        [JsonProperty("kind")]
        public TypeKind Kind { get; }

        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs Docs { get; }
    }
}