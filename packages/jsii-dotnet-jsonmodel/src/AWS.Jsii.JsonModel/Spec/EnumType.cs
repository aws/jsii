using Newtonsoft.Json;
using System;

namespace AWS.Jsii.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class EnumType : Type
    {
        public EnumType
        (
            // Type properties
            string fullyQualifiedName,
            string module,
            string name,
            string @namespace,

            // EnumType properties
            EnumMember[] members,

            // Type properties
            Docs docs = null
        )
            : base
            (
                fullyQualifiedName,
                module,
                name,
                @namespace,
                TypeKind.Enum,
                docs
            )
        {
            Members = members ?? throw new ArgumentNullException(nameof(members));
        }

        [JsonProperty("members")]
        public EnumMember[] Members { get; }
    }
}