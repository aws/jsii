using Newtonsoft.Json;
using System;
using System.Runtime.Serialization;

namespace Amazon.JSII.JsonModel.Api.Response
{
    public class ErrorResponseNameConverter : JsonConverter {
        // Use default implementation for write
        public override bool CanWrite { get { return false; } }
        public override object? ReadJson(JsonReader reader, Type objectType, object? existingValue, JsonSerializer serializer)
        {
            string? enumString = (string?)reader.Value;
            ErrorResponseName? errorResponseName = null;
            switch (enumString) {
                case "@jsii/kernel.Fault":
                {
                    errorResponseName = ErrorResponseName.JsiiError;
                    break;
                }
                case "@jsii/kernel.RuntimeError":
                {
                    errorResponseName = ErrorResponseName.RuntimeException;
                    break;
                }
            }

            return errorResponseName;
        }

        public override void WriteJson(JsonWriter writer, object? value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        } 

        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(string);
        }
    }
    public enum ErrorResponseName
    {
        [EnumMember(Value = "@jsii/kernel.Fault")]
        JsiiError,
        [EnumMember(Value = "@jsii/kernel.RuntimeError")]
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
        [JsonConverter(typeof(ErrorResponseNameConverter))]
        public ErrorResponseName Name { get; }
    }
}