﻿using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class TypeReference
    {
        public TypeReference
        (
            string? fullyQualifiedName = null,
            PrimitiveType? primitive = null,
            CollectionTypeReference? collection = null,
            UnionTypeReference? union = null
        )
        {
            FullyQualifiedName = fullyQualifiedName;
            Primitive = primitive;
            Collection = collection;
            Union = union;
        }

        [JsonProperty("fqn", NullValueHandling = NullValueHandling.Ignore)]
        public string? FullyQualifiedName { get; }

        [JsonProperty("primitive", NullValueHandling = NullValueHandling.Ignore)]
        public PrimitiveType? Primitive { get; }

        [JsonProperty("collection", NullValueHandling = NullValueHandling.Ignore)]
        public CollectionTypeReference? Collection { get; }

        [JsonProperty("union", NullValueHandling = NullValueHandling.Ignore)]
        public UnionTypeReference? Union { get; }
    }
}