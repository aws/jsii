using AWS.Jsii.JsonModel.Converters;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AWS.Jsii.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class NamingResponse : IKernelResponse
    {
        public NamingResponse(Naming naming)
        {
            Naming = naming ?? throw new ArgumentNullException(nameof(naming));
        }

        [JsonProperty("naming")]
        public Naming Naming { get; }
    }

    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class Naming
    {
        public Naming(DotNetNaming dotnet, IDictionary<string, object> others = null)
        {
            DotNet = dotnet;
            Others = others;
        }

        [JsonProperty("dotnet", NullValueHandling = NullValueHandling.Ignore)]
        public DotNetNaming DotNet { get; }

        [JsonExtensionData]
        public IDictionary<string, object> Others;
    }

    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class DotNetNaming
    {
        public DotNetNaming(string @namespace)
        {
            Namespace = @namespace;
        }

        public static implicit operator DotNetNaming(string ns)
        {
            return new DotNetNaming(ns);
        }

        public static implicit operator string(DotNetNaming t)
        {
            return t.Namespace;
        }

        [JsonProperty("namespace")]
        public string Namespace { get; }
    }
}
