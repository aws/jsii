using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class CollectionTypeReference
    {
        public CollectionTypeReference(CollectionKind kind, TypeReference elementType)
        {
            Kind = kind;
            ElementType = elementType ?? throw new ArgumentNullException(nameof(elementType));
        }

        [JsonProperty("kind", DefaultValueHandling = DefaultValueHandling.Include)]
        public CollectionKind Kind { get; }

        [JsonProperty("elementtype")]
        public TypeReference ElementType { get; }
    }
}