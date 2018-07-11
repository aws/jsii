using AWS.Jsii.JsonModel.Api;
using Newtonsoft.Json;
using System;

namespace AWS.Jsii.Runtime.Deputy
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class ByRefValue
    {
        [JsonConstructor]
        public ByRefValue(string value)
        {
            Value = value ?? throw new ArgumentNullException(nameof(value));

            var lastIndex = value.LastIndexOf('@');
            if (lastIndex == -1) {
                throw new ArgumentException($"Unexpected format for byref value: {value}", nameof(value));
            }

            FullyQualifiedName = value.Substring(0, lastIndex);
            Id = value.Substring(lastIndex + 1);
        }

        public ByRefValue(string fullyQualifiedName, string id) : this($"{fullyQualifiedName}@{id}")
        {
        }

        // Json.NET serializes as ISON-8601 by default.
        [JsonProperty("$jsii.byref")]
        public string Value { get; }

        public string FullyQualifiedName { get; }

        public string Id { get; }

        /// <summary>
        /// ByRefValue is basically ObjectReference with more type safety. The only reason
        /// ObjectReference exists is to match the shape of ObjRef from jsii-kernel/lib/api.ts.
        /// </summary>
        public ObjectReference ToObjectReference()
        {
            ObjectReference reference = new ObjectReference();
            reference["$jsii.byref"] = Value;

            return reference;
        }
    }
}
