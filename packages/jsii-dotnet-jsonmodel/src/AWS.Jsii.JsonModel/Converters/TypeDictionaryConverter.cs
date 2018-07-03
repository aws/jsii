using AWS.Jsii.JsonModel.Spec;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AWS.Jsii.JsonModel.Converters
{
    class TypeDictionaryConverter : JsonConverter
    {
        public override bool CanRead => true;

        public override bool CanWrite => false;

        public override bool CanConvert(System.Type objectType)
        {
            throw new NotImplementedException();
        }

        public override object ReadJson(JsonReader reader, System.Type objectType, object existingValue, JsonSerializer serializer)
        {
            JObject untypedDictionary = JObject.Load(reader);

            return untypedDictionary.Properties().ToDictionary(p => p.Name, p => Util.ConvertToDerivedType(p.Value));
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }
}
