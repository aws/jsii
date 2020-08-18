using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class InterfaceType : Type
    {
        public InterfaceType
        (
            // Type properties
            string fullyQualifiedName,
            string assembly,
            string name,
            string? @namespace = null,

            // Type properties
            Docs? docs = null,

            // InterfaceType properties
            string[]? interfaces = null,
            Method[]? methods = null,
            Property[]? properties = null,
            bool isDataType = false
        ) : base
            (
                fullyQualifiedName,
                assembly,
                name,
                @namespace,
                TypeKind.Interface,
                docs
            )
        {
            Interfaces = interfaces;
            Methods = methods;
            Properties = properties;
            IsDataType = isDataType;
        }

        [JsonProperty("interfaces", NullValueHandling = NullValueHandling.Ignore)]
        public string[]? Interfaces { get; }

        [JsonProperty("methods", NullValueHandling = NullValueHandling.Ignore)]
        public Method[]? Methods { get; }

        [JsonProperty("properties", NullValueHandling = NullValueHandling.Ignore)]
        public Property[]? Properties { get; }

        [JsonProperty("datatype", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsDataType { get; }
    }
}
