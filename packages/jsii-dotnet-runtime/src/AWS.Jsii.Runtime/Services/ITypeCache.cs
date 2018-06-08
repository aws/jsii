using System;

namespace AWS.Jsii.Runtime.Services
{
    public interface ITypeCache
    {
        Type GetClassType(string fullyQualifiedName);

        Type GetEnumType(string fullyQualifiedName);

        Type GetInterfaceType(string fullyQualifiedName);

        Type GetInterfaceProxyType(string fullyQualifiedName);

        Type GetFrameworkType(JsonModel.Spec.TypeReference reference);
    }
}
