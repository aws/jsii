using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;

namespace Amazon.JSII.JsonModel.Converters
{
    internal static class Util
    {
        internal static Spec.Type ConvertToDerivedType(JToken token)
        {
            if (token.Type != JTokenType.Object)
            {
                throw new ArgumentException($"Unexpected token type: {token.Type}", nameof(token));
            }

            if (!(token["kind"] is {} kindToken))
                throw new ArgumentException($"Unexpected child token: '{token["kind"]}'", nameof(token));
            
            var kind = kindToken.ToObject<TypeKind>();

            return kind switch
            {
                TypeKind.Enum => (Spec.Type) token.ToObject<EnumType>()!,
                TypeKind.Class => token.ToObject<ClassType>()!,
                TypeKind.Interface => token.ToObject<InterfaceType>()!,
                _ => throw new ArgumentException($"Unknown kind {kind} on type {token.ToString(Formatting.Indented)}", nameof(token))
            };
        }
    }
}
