using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public abstract class Callable : IDocumentable, IOverridable
    {
        protected Callable
        (
            Parameter[]? parameters = null,
            bool isProtected = false,
            bool isVariadic = false,
            string? overrides = null,
            Docs? docs = null
        )
        {
            Parameters = parameters;
            IsProtected = isProtected;
            IsVariadic = isVariadic;
            Overrides = overrides;
            Docs = docs;
        }

        [JsonProperty("parameters", NullValueHandling = NullValueHandling.Ignore)]
        public Parameter[]? Parameters { get; }

        [JsonProperty("protected", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsProtected { get; }

        [JsonProperty("variadic", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsVariadic { get; }

        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs? Docs { get; }

        [JsonProperty("overrides", NullValueHandling = NullValueHandling.Ignore)]
        public string? Overrides { get; }
    }
}