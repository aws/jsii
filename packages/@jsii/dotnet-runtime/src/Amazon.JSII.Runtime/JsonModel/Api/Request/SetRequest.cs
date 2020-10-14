using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class SetRequest : IKernelRequest
    {
        public SetRequest(ObjectReference objectReference, string property, object? value)
        {
            ObjectReference = objectReference ?? throw new ArgumentNullException(nameof(objectReference));
            Property = property ?? throw new ArgumentNullException(nameof(property));
            Value = value;
        }

        [JsonProperty("api")]
        public string Api { get; } = "set";

        [JsonProperty("objref")]
        public ObjectReference ObjectReference { get; }

        [JsonProperty("property")]
        public string Property { get; }

        [JsonProperty("value")]
        public object? Value { get; }
    }
}