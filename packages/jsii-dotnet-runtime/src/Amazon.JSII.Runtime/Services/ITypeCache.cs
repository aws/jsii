using System;

namespace Amazon.JSII.Runtime.Services
{
    public interface ITypeCache
    {
        Type GetClassType(string fullyQualifiedName);

        Type GetEnumType(string fullyQualifiedName);

        Type GetInterfaceType(string fullyQualifiedName);

        Type GetProxyType(string fullyQualifiedName);

        Type GetFrameworkType(JsonModel.Spec.TypeReference reference);
    }
}
