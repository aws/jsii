using Newtonsoft.Json;
using System;
using System.Runtime.Serialization;

namespace Amazon.JSII.JsonModel.Api.Response
{
    public enum ErrorResponseName
    {
        [EnumMember(Value = "@jsii/kernel.Fault")]
        JsiiError,
        [EnumMember(Value = "@jsii/kernel.RuntimeException")]
        RuntimeException,
    }

    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class ErrorResponse
    {
        public ErrorResponse(string error, string? stack = null)
        {
            Error = error ?? throw new ArgumentNullException(nameof(error));
            Stack = stack;
        }

        [JsonProperty("error")]
        public string Error { get; }

        [JsonProperty("stack", NullValueHandling = NullValueHandling.Ignore)]
        public string? Stack { get; }

        [JsonProperty("name", NullValueHandling = NullValueHandling.Ignore)]
        public ErrorResponseName Name { get ; }
    }
}