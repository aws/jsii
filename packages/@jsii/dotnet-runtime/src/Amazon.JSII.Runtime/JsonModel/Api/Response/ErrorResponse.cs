using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class ErrorResponse
    {
        public ErrorResponse(string error, string? stack = null, ErrorName? name = null)
        {
            Error = error ?? throw new ArgumentNullException(nameof(error));
            Stack = stack;
            Name = name;
        }

        [JsonProperty("error")]
        public string Error { get; }

        [JsonProperty("stack", NullValueHandling = NullValueHandling.Ignore)]
        public string? Stack { get; }

        [JsonProperty("name", NullValueHandling = NullValueHandling.Ignore)]
        public ErrorName? Name { get; }
    }
}
