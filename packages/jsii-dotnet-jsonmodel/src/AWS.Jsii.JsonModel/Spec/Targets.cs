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
            DotNet = dotnet ?? throw new ArgumentNullException(nameof(dotnet));
        }

        [JsonProperty("dotnet", NullValueHandling = NullValueHandling.Ignore)]
        public DotNetTarget DotNet { get; }
        
        [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
        public class DotNetTarget
        {
            public DotNetTarget(string @namespace)
            {
                Namespace = @namespace ?? throw new ArgumentNullException(nameof(@namespace));
            }
            
            public static implicit operator DotNetTarget(string @namespace)
            {
                return new DotNetTarget(@namespace);
            }
            
            public static implicit operator string(DotNetTarget target)
            {
                return target.Namespace;
            }
            
            [JsonProperty("namespace")]
            public string Namespace { get; }
        }
    }
}
