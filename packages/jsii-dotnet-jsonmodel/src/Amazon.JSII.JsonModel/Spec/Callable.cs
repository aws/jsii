using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public abstract class Callable : IDocumentable, IOverridable
    {
        protected Callable
        (
            bool? isProtected = null,
            Parameter[] parameters = null,
            Docs docs = null,
            bool? isVariadic = null,
            string overrides = null
        )
        {
            IsProtected = isProtected;
            Parameters = parameters;
            Docs = docs;
            IsVariadic = isVariadic;
            Overrides = overrides;
        }


        [JsonProperty("protected", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsProtected { get; }

        [JsonProperty("parameters", NullValueHandling = NullValueHandling.Ignore)]
        public Parameter[] Parameters { get; }

        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs Docs { get; }

        [JsonProperty("variadic", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsVariadic { get; }

        [JsonProperty("overrides", NullValueHandling = NullValueHandling.Ignore)]
        public string Overrides { get; }
    }
}