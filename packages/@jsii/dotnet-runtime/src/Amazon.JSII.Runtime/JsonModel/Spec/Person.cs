using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class Person
    {
        public Person
        (
            string name,
            string[] roles,
            string? email = null,
            string? url = null,
            bool isOrganization = false
        )
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Roles = roles ?? throw new ArgumentNullException(nameof(roles));
            Email = email;
            Url = url;
            IsOrganization = isOrganization;
        }

        [JsonProperty("name")]
        public string Name { get; }

        [JsonProperty("roles")]
        public string[] Roles { get; }

        [JsonProperty("email", NullValueHandling = NullValueHandling.Ignore)]
        public string? Email { get; }

        [JsonProperty("url", NullValueHandling = NullValueHandling.Ignore)]
        public string? Url { get; }

        [JsonProperty("organization", NullValueHandling = NullValueHandling.Ignore)]
        public bool IsOrganization { get; }
    }
}
