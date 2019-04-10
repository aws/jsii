using Amazon.JSII.JsonModel.Spec;
using Type = System.Type;

namespace Amazon.JSII.Runtime.Services
{
    public interface ITypeCache
    {
        Type GetClassType(string fullyQualifiedName);

        Type GetEnumType(string fullyQualifiedName);

        Type GetInterfaceType(string fullyQualifiedName);

        Type GetProxyType(string fullyQualifiedName);

        Type GetFrameworkType(TypeReference reference, bool isOptional);
    }
}
