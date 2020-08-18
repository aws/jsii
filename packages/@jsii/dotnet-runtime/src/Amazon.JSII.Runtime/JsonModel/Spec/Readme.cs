using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class Readme
    {
        public Readme(string markdown)
        {
            Markdown = markdown ?? throw new ArgumentNullException(nameof(markdown));
        }

        [JsonProperty("markdown", NullValueHandling = NullValueHandling.Ignore)]
        public string Markdown { get; set; }
    }
}
