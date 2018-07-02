﻿using Newtonsoft.Json;
using System;

namespace AWS.Jsii.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class Property : IDocumentable
    {
        public Property
        (
            string name,
            TypeReference type,
            bool? isImmutable = null,
            bool? isProtected = null,
            bool? isAbstract = null,
            Docs docs = null
        )
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Type = type ?? throw new ArgumentNullException(nameof(type));
            IsImmutable = isImmutable;
            IsProtected = isProtected;
            IsAbstract = isAbstract;
            Docs = docs;
        }

        [JsonProperty("name")]
        public string Name { get; }

        [JsonProperty("type")]
        public TypeReference Type { get; }

        [JsonProperty("immutable", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsImmutable { get; }

        [JsonProperty("protected", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsProtected { get; }

        [JsonProperty("abstract", NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsAbstract{ get; }

        [JsonProperty("docs", NullValueHandling = NullValueHandling.Ignore)]
        public Docs Docs { get; }
    }
}