using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class Property : IDocumentable, IOverridable
    {
        public Property
        (
            string name,
            TypeInstance value,
            bool? isImmutable = null,
            bool? isProtected = null,
            bool? isAbstract = null,
            Docs docs = null,
            bool? isStatic = null,
            bool? isConstant = null,
            UserTypeReference overrides = null
        )
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Value = value ?? throw new ArgumentNullException(nameof(value));
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

        [JsonProperty("value")]
        public TypeInstance Value { get; }

        [JsonProperty("immutable", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsImmutable { get; }

        [JsonProperty("protected", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsProtected { get; }

        [JsonProperty("abstract", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsAbstract{ get; }

        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs Docs { get; }

        [JsonProperty("static", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsStatic { get; }

        [JsonProperty("const", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsConstant { get; }

        [JsonProperty("overrides", NullValueHandling = NullValueHandling.Ignore)]
        public UserTypeReference Overrides { get; }
    }
}