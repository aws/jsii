using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class UserTypeReference
    {
        public UserTypeReference(string fullyQualifiedName)
        {
            FullyQualifiedName = fullyQualifiedName ?? throw new ArgumentNullException(nameof(fullyQualifiedName));
        }

        [JsonProperty("fqn")]
        public string FullyQualifiedName { get; }
    }
}
