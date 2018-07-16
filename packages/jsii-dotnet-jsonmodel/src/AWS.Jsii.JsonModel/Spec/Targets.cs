using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AWS.Jsii.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class Targets
    {
        public Targets(DotNetTarget dotnet, IDictionary<string, object> others = null)
        {
            DotNet = dotnet;
            Others = others;
        }

        [JsonProperty("dotnet", NullValueHandling = NullValueHandling.Ignore)]
        public DotNetTarget DotNet { get; }

        [JsonExtensionData]
        public IDictionary<string, object> Others;
    }

    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class DotNetTarget
    {
        public DotNetTarget(string @namespace)
        {
            Namespace = @namespace ?? throw new ArgumentNullException(nameof(@namespace));
        }

        public static implicit operator DotNetTarget(string ns)
        {
            return new DotNetTarget(ns);
        }

        public static implicit operator string(DotNetTarget t)
        {
            return t.Namespace;
        }

        [JsonProperty("namespace")]
        public string Namespace { get; }
    }
}
