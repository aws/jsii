using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class DeleteRequest : IKernelRequest
    {
        public DeleteRequest(ObjectReference objectReference)
        {
            ObjectReference = objectReference ?? throw new ArgumentNullException(nameof(objectReference));
        }

        [JsonProperty("api")]
        public string Api { get; } = "delete";

        [JsonProperty("objref")]
        public ObjectReference ObjectReference { get; }
    }
}