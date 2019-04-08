using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class Method : Callable
    {
        public Method
        (
            string name,
            bool? isProtected = null,
            bool? isAbstract = null,
            Parameter[] parameters = null,
            Docs docs = null,
            TypeReference returns = null,
            bool? isVariadic = null,
            bool? isStatic = null,
            string overrides = null
        ): base
        (
            isProtected: isProtected,
            parameters: parameters,
            docs: docs,
            isVariadic: isVariadic,
            overrides: overrides
        )
        {
            Name = name;
            IsAbstract = isAbstract;
            Returns = returns;
            IsStatic = isStatic;
        }

        [JsonProperty("abstract", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsAbstract { get; }

        [JsonProperty("name")]
        public string Name { get; }

        [JsonProperty("returns", NullValueHandling = NullValueHandling.Ignore)]
        public TypeReference Returns { get; }

        [JsonProperty("static", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsStatic { get; }
    }
}