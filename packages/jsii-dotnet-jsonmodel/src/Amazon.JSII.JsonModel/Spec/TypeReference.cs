using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class TypeReference
    {
        public TypeReference
        (
            string fullyQualifiedName = null,
            PrimitiveType? primitive = null,
            CollectionTypeReference collection = null,
            UnionTypeReference union = null,
            bool? isNullable = null,
            bool? isPromise = null
        )
        {
            FullyQualifiedName = fullyQualifiedName;
            Primitive = primitive;
            Collection = collection;
            Union = union;
            IsNullable = isNullable;
            IsPromise = isPromise;
        }

        [JsonProperty("fqn", NullValueHandling = NullValueHandling.Ignore)]
        public string FullyQualifiedName { get; }

        [JsonProperty("primitive", NullValueHandling = NullValueHandling.Ignore)]
        public PrimitiveType? Primitive { get; }

        [JsonProperty("collection", NullValueHandling = NullValueHandling.Ignore)]
        public CollectionTypeReference Collection { get; }

        [JsonProperty("union", NullValueHandling = NullValueHandling.Ignore)]
        public UnionTypeReference Union { get; }

        [JsonProperty("nullable", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsNullable { get; }

        [JsonProperty("promise", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsPromise { get; }
    }
}