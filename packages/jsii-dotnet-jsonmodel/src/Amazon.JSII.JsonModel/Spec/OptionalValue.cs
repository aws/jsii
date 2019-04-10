using System;
using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Spec
{
    public interface IOptionalValue
    {
        TypeReference Type { get; }
        
        bool IsOptional { get; }
    }
    
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class OptionalValue : IOptionalValue
    {
        public OptionalValue
        (
            TypeReference type,
            bool isOptional = false
        )
        {
            Type = type ?? throw new ArgumentNullException(nameof(type));
            IsOptional = isOptional;
        }

        [JsonProperty("type", NullValueHandling = NullValueHandling.Ignore)]
        public TypeReference Type { get; }
        
        [JsonProperty("optional", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsOptional { get; }
    }
}