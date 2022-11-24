using Amazon.JSII.JsonModel.Api;
using Newtonsoft.Json;
using System;
using Amazon.JSII.JsonModel.Api.Response;

namespace Amazon.JSII.JsonModel.Api.Request
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class CompleteRequest : IKernelRequest
    {
        [Obsolete("Use one of the constructors that expose the errorName property")]
        public CompleteRequest(string callbackId, string? error = null, object? result = null)
        : this(callbackId, error, null, result)
        {
        }

        private CompleteRequest(string callbackId, string? error = null, ErrorName? errorName = null, object? result = null)
        {
            CallbackId = callbackId ?? throw new ArgumentNullException(nameof(callbackId));
            Error = error;
            ErrorName = errorName;
            Result = result;
        }
        
        internal CompleteRequest(string callbackId, NamedError? error = null, object? result = null)
        {
            CallbackId = callbackId ?? throw new ArgumentNullException(nameof(callbackId));
            Error = error?.Message;
            ErrorName = error?.Name;
            Result = result;
        }

        [JsonProperty("api")]
        public string Api { get; } = "complete";

        [JsonProperty("cbid")]
        public string CallbackId { get; }

        [JsonProperty("err", NullValueHandling = NullValueHandling.Ignore)]
        public string? Error { get; }
        
        [JsonProperty("name", NullValueHandling = NullValueHandling.Ignore)]
        internal ErrorName? ErrorName { get; }

        [JsonProperty("result", NullValueHandling = NullValueHandling.Ignore)]
        public object? Result { get; }
    }
}
