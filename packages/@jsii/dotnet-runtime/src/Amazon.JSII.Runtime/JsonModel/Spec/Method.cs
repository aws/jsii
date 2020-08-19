using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class Method : Callable
    {
        public Method
        (
            string name,
            OptionalValue? returns = null,
            Parameter[]? parameters = null,
            bool isAbstract = false,
            bool isAsync = false,
            bool isProtected = false,
            bool isVariadic = false,
            bool isStatic = false,
            string? overrides = null,
            Docs? docs = null
        ): base
        (
            parameters: parameters,
            isProtected: isProtected,
            isVariadic: isVariadic,
            overrides: overrides,
            docs: docs
        )
        {
            Name = name;
            Returns = returns;
            IsAbstract = isAbstract;
            IsAsync = isAsync;
            IsStatic = isStatic;
        }

        [JsonProperty("name")]
        public string Name { get; }

        [JsonProperty("returns", NullValueHandling = NullValueHandling.Ignore)]
        public OptionalValue? Returns { get; }

        [JsonProperty("abstract", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsAbstract { get; }

        [JsonProperty("async", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsAsync { get;  }
        
        [JsonProperty("static", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsStatic { get; }
    }
}