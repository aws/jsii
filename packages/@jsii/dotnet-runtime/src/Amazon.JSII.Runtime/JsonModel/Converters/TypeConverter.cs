using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Converters
{
    public sealed class TypeConverter : JsonConverter
    {
        public override bool CanRead => false;

        public override bool CanWrite => true;

        private static readonly JsonSerializerSettings SerializerSettings = new JsonSerializerSettings
        {
            DefaultValueHandling = DefaultValueHandling.Ignore
        };

        public override bool CanConvert(System.Type objectType)
        {
            return objectType.IsAssignableFrom(typeof(EnumType)) || objectType.IsAssignableFrom(typeof(ClassType));
        }

        public override object? ReadJson(JsonReader reader, System.Type objectType, object? existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override void WriteJson(JsonWriter writer, object? value, JsonSerializer serializer)
        {
            Spec.Type type = value as Spec.Type ?? throw new ArgumentException($"{value} is not a jsii Type", nameof(value));

            switch (type.Kind)
            {
                case TypeKind.Enum:
                {
                    EnumType derivedType = value as EnumType ?? throw new ArgumentException($"Value has type kind '{type.Kind}', but is not an instance of {nameof(EnumType)}", nameof(value));
                    string json = JsonConvert.SerializeObject(derivedType, SerializerSettings);
                    writer.WriteRawValue(json);
                    break;
                }
                case TypeKind.Class:
                {
                    ClassType derivedType = value as ClassType ?? throw new ArgumentException($"Value has type kind '{type.Kind}', but is not an instance of {nameof(ClassType)}", nameof(value));
                    string json = JsonConvert.SerializeObject(derivedType, SerializerSettings);
                    writer.WriteRawValue(json);
                    break;
                }
                case TypeKind.Interface:
                {
                    InterfaceType derivedType = value as InterfaceType ?? throw new ArgumentException($"Value has type kind '{type.Kind}', but is not an instance of {nameof(InterfaceType)}", nameof(value));
                    string json = JsonConvert.SerializeObject(derivedType, SerializerSettings);
                    writer.WriteRawValue(json);
                    break;
                }
                default:
                {
                    throw new ArgumentException($"Unexpected type kind '{type.Kind}' on type '{value}'", nameof(value));
                }
            }
        }
    }
}
