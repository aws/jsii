using Amazon.JSII.Runtime;
using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api
{
    internal sealed class NamedError
    {
        internal NamedError(Exception exception): this(exception.ToString(), exception is JsiiError ? ErrorName.JsiiError : (ErrorName?)null) {}

        internal NamedError(string message, ErrorName? name)
        {
            Message = message;
            Name = name;
        }

        public string Message { get;  }
        public ErrorName? Name { get;}
    }

    [JsonConverter(typeof(ErrorNameConverter))]
    public enum ErrorName
    {
        JsiiError,
        RuntimeException,
    }

    internal sealed class ErrorNameConverter : JsonConverter
    {
        private const string ErrorNameFault = "@jsii/kernel.Fault";
        private const string ErrorNameRuntime = "@jsii/kernel.RuntimeError";

        public override object? ReadJson(JsonReader reader, Type objectType, object? existingValue, JsonSerializer serializer)
        {
            string? enumString = (string?)reader.Value;
            ErrorName? errorResponseName = null;
            switch (enumString) {
                case ErrorNameFault:
                {
                    errorResponseName = ErrorName.JsiiError;
                    break;
                }
                case ErrorNameRuntime:
                {
                    errorResponseName = ErrorName.RuntimeException;
                    break;
                }
            }

            return errorResponseName;
        }

        public override void WriteJson(JsonWriter writer, object? value, JsonSerializer serializer)
        {
            switch (value)
            {
                case ErrorName.JsiiError:
                    writer.WriteValue(ErrorNameFault);
                    break;
                case ErrorName.RuntimeException:
                    writer.WriteValue(ErrorNameRuntime);
                    break;
                default: writer.WriteNull();
                    break;
            }
        }

        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(string);
        }
    }
}
