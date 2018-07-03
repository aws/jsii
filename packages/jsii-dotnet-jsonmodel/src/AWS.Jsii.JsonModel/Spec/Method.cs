using Newtonsoft.Json;
using System;

namespace AWS.Jsii.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class Method : IDocumentable
    {
        public Method
        (
            bool isInitializer,
            bool isProtected,
            bool isAbstract,
            Parameter[] parameters = null,
            Docs docs = null,
            string name = null,
            TypeReference returns = null
        )
        {
            IsInitializer = isInitializer;
            IsProtected = isProtected;
            IsAbstract = isAbstract;
            Parameters = parameters;
            Docs = docs;
            Name = name;
            Returns = returns;
        }


        [JsonProperty("initializer")]
        public bool IsInitializer { get; }

        [JsonProperty("protected")]
        public bool IsProtected { get; }

        [JsonProperty("abstract")]
        public bool IsAbstract { get; }

        [JsonProperty("parameters", NullValueHandling = NullValueHandling.Ignore)]
        public Parameter[] Parameters { get; }

        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs Docs { get; }

        [JsonProperty("name", NullValueHandling = NullValueHandling.Ignore)]
        public string Name { get; }

        [JsonProperty("returns", NullValueHandling = NullValueHandling.Ignore)]
        public TypeReference Returns { get; }
    }
}