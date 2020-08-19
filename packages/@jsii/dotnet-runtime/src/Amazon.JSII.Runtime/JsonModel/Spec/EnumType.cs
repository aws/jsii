using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class EnumType : Type
    {
        public EnumType
        (
            // Type properties
            string fullyQualifiedName,
            string assembly,
            string name,

            // EnumType properties
            EnumMember[] members,

            string? @namespace = null,
            // Type properties
            Docs? docs = null
        )
            : base
            (
                fullyQualifiedName,
                assembly,
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
