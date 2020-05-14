using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;

namespace Amazon.JSII.JsonModel.Converters
{
    internal sealed class TypeDictionaryConverter : JsonConverter
    {
        public override bool CanRead => true;

        public override bool CanWrite => false;

        public override bool CanConvert(Type objectType)
        {
            throw new NotImplementedException();
        }

        public override object? ReadJson(JsonReader reader, Type objectType, object? existingValue, JsonSerializer serializer)
        {
            var untypedDictionary = JObject.Load(reader);

            return untypedDictionary.Properties().ToDictionary(p => p.Name, p => Util.ConvertToDerivedType(p.Value));
        }

        public override void WriteJson(JsonWriter writer, object? value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }
}
