using Newtonsoft.Json;
using System;

namespace AWS.Jsii.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class Readme
    {
        public Readme(string markdown)
        {
            Markdown = markdown ?? throw new ArgumentNullException(nameof(markdown));
        }

        [JsonProperty("markdown", NullValueHandling = NullValueHandling.Ignore)]
        public string Markdown { get; set; }
    }
}
