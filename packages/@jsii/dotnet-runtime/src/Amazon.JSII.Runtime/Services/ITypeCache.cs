using Amazon.JSII.JsonModel.Spec;

namespace Amazon.JSII.Runtime.Services
{
    internal interface ITypeCache
    {
        System.Type? TryGetClassType(string fullyQualifiedName);

        System.Type? TryGetEnumType(string fullyQualifiedName);

        System.Type? TryGetInterfaceType(string fullyQualifiedName);

        System.Type? TryGetProxyType(string fullyQualifiedName);
        
        System.Type GetClassType(string fullyQualifiedName)
        {
            return TryGetClassType(fullyQualifiedName)
                   ?? throw new JsiiError($"Unable to find class for jsii FQN \"{fullyQualifiedName}\"");
        }

        System.Type GetEnumType(string fullyQualifiedName)
        {
            return TryGetEnumType(fullyQualifiedName)
                   ?? throw new JsiiError($"Unable to find enum for jsii FQN \"{fullyQualifiedName}\"");
        }

        System.Type GetInterfaceType(string fullyQualifiedName)
        {
            return TryGetInterfaceType(fullyQualifiedName)
                   ?? throw new JsiiError($"Unable to find interface for jsii FQN \"{fullyQualifiedName}\"");
        }

        System.Type GetProxyType(string fullyQualifiedName)
        {
            return TryGetProxyType(fullyQualifiedName)
                   ?? throw new JsiiError($"Unable to find proxy type for jsii FQN \"{fullyQualifiedName}\"");
        }

        System.Type GetFrameworkType(TypeReference reference, bool isOptional);
    }
}
