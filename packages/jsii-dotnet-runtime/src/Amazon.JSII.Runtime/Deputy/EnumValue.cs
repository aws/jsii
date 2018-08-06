using Newtonsoft.Json;
using System;

namespace Amazon.JSII.Runtime.Deputy
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class EnumValue
    {
        [JsonConstructor]
        public EnumValue(string value)
        {
            Value = value ?? throw new ArgumentNullException(nameof(value));

            int sep = value.LastIndexOf('/');
            if (sep == -1)
            {
                throw new ArgumentException($"Unexpected format for enum value: {value}", nameof(value));
            }

            FullyQualifiedName = value.Substring(0, sep);
            MemberName = value.Substring(sep + 1);
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
