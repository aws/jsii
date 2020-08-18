using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class Property : OptionalValue, IDocumentable, IOverridable
    {
        public Property
        (
            string name,
            TypeReference type,
            bool isImmutable = false,
            bool isOptional = false,
            bool isProtected = false,
            bool isAbstract = false,
            bool isStatic = false,
            bool isConstant = false,
            string? overrides = null,
            Docs? docs = null
        ): base(type: type, isOptional: isOptional)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            IsImmutable = isImmutable;
            IsProtected = isProtected;
            IsAbstract = isAbstract;
            Docs = docs;
            IsStatic = isStatic;
            IsConstant = isConstant;
            Overrides = overrides;
        }

        [JsonProperty("name")]
        public string Name { get; }

        [JsonProperty("abstract", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsAbstract{ get; }

        [JsonProperty("const", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsConstant { get; }
        
        [JsonProperty("immutable", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsImmutable { get; }

        [JsonProperty("protected", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsProtected { get; }

        [JsonProperty("static", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsStatic { get; }

        [JsonProperty("overrides", NullValueHandling = NullValueHandling.Ignore)]
        public string? Overrides { get; }
        
        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs? Docs { get; }
    }
}