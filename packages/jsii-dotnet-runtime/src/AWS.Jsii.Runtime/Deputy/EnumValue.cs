using Newtonsoft.Json;
using System;

namespace AWS.Jsii.Runtime.Deputy
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class EnumValue
    {
        [JsonConstructor]
        public EnumValue(string value)
        {
            Value = value ?? throw new ArgumentNullException(nameof(value));

            string[] valueTokens = value.Split('/');
            if (valueTokens.Length != 2)
            {
                throw new ArgumentException($"Unexpected format for enum value: {value}", nameof(value));
            }

            FullyQualifiedName = valueTokens[0];
            MemberName = valueTokens[1];
        }

        public EnumValue(string fullyQualifiedName, string memberName) : this($"{fullyQualifiedName}/{memberName}")
        {
        }

        // Json.NET serializes as ISON-8601 by default.
        [JsonProperty("$jsii.enum")]
        public string Value { get; }

        public string FullyQualifiedName { get; }

        public string MemberName { get; }
    }
}
