using Newtonsoft.Json;
using System.Collections.Generic;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class Docs
    {
        public Docs
        (
            string? summary = null,
            string? remarks = null,
            string? deprecated = null,
            string? returns = null,
            Stability? stability = null,
            string? example = null,
            string? see = null,
            bool? subclassable = null,
            string? @default = null,
            IDictionary<string, string>? custom = null
        )
        {
            Summary = summary;
            Remarks = remarks;
            Deprecated = deprecated;
            Returns = returns;
            Stability = stability;
            Example = example;
            See = see;
            Subclassable = subclassable;
            Default = @default;
            Custom = custom ?? new Dictionary<string, string>();
        }

        [JsonProperty("summary", NullValueHandling = NullValueHandling.Ignore)]
        public string? Summary { get; }

        [JsonProperty("remarks", NullValueHandling = NullValueHandling.Ignore)]
        public string? Remarks { get; }

        [JsonProperty("deprecated", NullValueHandling = NullValueHandling.Ignore)]
        public string? Deprecated { get; }

        [JsonProperty("returns", NullValueHandling = NullValueHandling.Ignore)]
        public string? Returns { get; }

        [JsonProperty("stability", NullValueHandling = NullValueHandling.Ignore)]
        public Stability? Stability { get; }

        [JsonProperty("example", NullValueHandling = NullValueHandling.Ignore)]
        public string? Example { get; }

        [JsonProperty("see", NullValueHandling = NullValueHandling.Ignore)]
        public string? See { get; }

        [JsonProperty("subclassable", NullValueHandling = NullValueHandling.Ignore)]
        public bool? Subclassable { get; }

        [JsonProperty("default", NullValueHandling = NullValueHandling.Ignore)]
        public string? Default { get; }

        [JsonProperty("custom", NullValueHandling = NullValueHandling.Ignore)]
        public IDictionary<string, string> Custom { get; }


        public bool ShouldSerializeCustom() {
            return Custom.Count > 0;
        }
    }
}