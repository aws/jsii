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
            bool? isOptional = null,
            bool? isPromise = null
        )
        {
            FullyQualifiedName = fullyQualifiedName;
            Primitive = primitive;
            Collection = collection;
            Union = union;
            IsOptional = isOptional;
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
        
        [JsonProperty("optional", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsOptional { get; }
        
        [JsonProperty("promise", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsPromise { get; }
    }
}