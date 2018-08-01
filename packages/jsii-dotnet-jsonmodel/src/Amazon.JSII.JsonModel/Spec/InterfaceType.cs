using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class InterfaceType : Type
    {
        public InterfaceType
        (
            // Type properties
            string fullyQualifiedName,
            string assembly,
            string name,
            string @namespace,

            // Type properties
            Docs docs = null,

            // InterfaceType properties
            TypeReference[] interfaces = null,
            Method[] methods = null,
            Property[] properties = null,
            bool? isDataType = null
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
        public TypeReference[] Interfaces { get; }

        [JsonProperty("methods", NullValueHandling = NullValueHandling.Ignore)]
        public Method[] Methods { get; }

        [JsonProperty("properties", NullValueHandling = NullValueHandling.Ignore)]
        public Property[] Properties { get; }

        [JsonProperty("datatype", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsDataType { get; }
    }
}
