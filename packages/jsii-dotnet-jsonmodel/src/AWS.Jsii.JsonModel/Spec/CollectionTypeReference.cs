using Newtonsoft.Json;
using System;

namespace AWS.Jsii.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class CollectionTypeReference
    {
        public CollectionTypeReference(CollectionKind kind, TypeReference elementType)
        {
            Kind = kind;
            ElementType = elementType ?? throw new ArgumentNullException(nameof(elementType));
        }

        [JsonProperty("kind")]
        public CollectionKind Kind { get; }

        [JsonProperty("elementtype")]
        public TypeReference ElementType { get; }
    }
}