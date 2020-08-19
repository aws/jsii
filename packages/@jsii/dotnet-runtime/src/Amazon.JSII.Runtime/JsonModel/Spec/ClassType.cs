using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class ClassType : Type
    {
        public ClassType
        (
            // Type properties
            string fullyQualifiedName,
            string assembly,
            string name,

            // ClassType properties
            bool isAbstract = false,

            string? @namespace = null,
            // Type properties
            Docs? docs = null,

            // ClassType properties
            string? @base = null,
            Initializer? initializer = null,
            Property[]? properties = null,
            Method[]? methods = null,
            string[]? interfaces = null
        )
            : base
            (
                fullyQualifiedName,
                assembly,
                name,
                @namespace,
                TypeKind.Class,
                docs
            )
        {
            IsAbstract = isAbstract;

            Base = @base;
            Initializer = initializer;
            Properties = properties;
            Methods = methods;
            Interfaces = interfaces;
        }

        [JsonProperty("abstract", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsAbstract { get; }

        [JsonProperty("base", NullValueHandling = NullValueHandling.Ignore)]
        public string? Base { get; }

        [JsonProperty("initializer", NullValueHandling = NullValueHandling.Ignore)]
        public Initializer? Initializer { get; }

        [JsonProperty("properties", NullValueHandling = NullValueHandling.Ignore)]
        public Property[]? Properties { get; }

        [JsonProperty("methods", NullValueHandling = NullValueHandling.Ignore)]
        public Method[]? Methods { get; }

        [JsonProperty("interfaces", NullValueHandling = NullValueHandling.Ignore)]
        public string[]? Interfaces { get; }
    }
}
