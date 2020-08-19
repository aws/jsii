using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class NamingResponse : IKernelResponse
    {
        public NamingResponse(NamingData naming)
        {
            Naming = naming ?? throw new ArgumentNullException(nameof(naming));
        }

        [JsonProperty("naming")]
        public NamingData Naming { get; }

        [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
        public class NamingData
        {
            public NamingData(DotNetNaming dotnet, IDictionary<string, object>? others = null)
            {
                DotNet = dotnet ?? throw new ArgumentNullException(nameof(dotnet));
            }
            
            [JsonProperty("dotnet", NullValueHandling = NullValueHandling.Ignore)]
            public DotNetNaming DotNet { get; }
            
            [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
            public class DotNetNaming
            {
                public DotNetNaming(string @namespace)
                {
                    Namespace = @namespace;
                }
                
                public static implicit operator DotNetNaming(string @namespace)
                {
                    return new DotNetNaming(@namespace);
                }
                
                public static implicit operator string(DotNetNaming naming)
                {
                    return naming.Namespace;
                }
                
                [JsonProperty("namespace")]
                public string Namespace { get; }
            }
        }
    }
}
