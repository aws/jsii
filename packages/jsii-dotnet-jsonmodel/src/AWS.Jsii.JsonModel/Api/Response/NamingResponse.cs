using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AWS.Jsii.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class NamingResponse : IKernelResponse
    {
        public NamingResponse(IDictionary<string, string> naming)
        {
            Naming = naming ?? throw new ArgumentNullException(nameof(naming));
        }

        [JsonProperty("naming")]
        public IDictionary<string, string> Naming { get; }
    }
}