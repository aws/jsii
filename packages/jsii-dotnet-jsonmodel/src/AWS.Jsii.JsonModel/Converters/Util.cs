using AWS.Jsii.JsonModel.Spec;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;

namespace AWS.Jsii.JsonModel.Converters
{
    static class Util
    {
        internal static Spec.Type ConvertToDerivedType(JToken token)
        {
            if (token.Type != JTokenType.Object)
            {
                throw new ArgumentException($"Unexpected token type: {token.Type}", nameof(token));
            }

            if (token["kind"] is JToken kindToken)
            {
                TypeKind kind = kindToken.ToObject<TypeKind>();

                switch (kind)
                {
                    case TypeKind.Enum:
                        return token.ToObject<EnumType>();

                    case TypeKind.Class:
                        return token.ToObject<ClassType>();

                    case TypeKind.Interface:
                        return token.ToObject<InterfaceType>();

                    default:
                        throw new ArgumentException($"Unknown kind {kind} on type {token.ToString(Formatting.Indented)}", nameof(token));
                }
            }

            throw new ArgumentException($"Unexpected child token: '{token["kind"]}'", nameof(token));
        }
    }
}
