using Amazon.JSII.JsonModel.Spec;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Type = Amazon.JSII.JsonModel.Spec.Type;

namespace Amazon.JSII.Generator
{
    public abstract class TypeMetadata
    {
        public TypeMetadata(Type type, Assembly assembly)
        {
            Type = type ?? throw new ArgumentNullException(nameof(type));
            assembly = assembly ?? throw new ArgumentNullException(nameof(assembly));

            Package = type.Assembly;

            string suffix = type.Namespace != null ? $".{type.Namespace}" : "";
            Namespace = $"{assembly.GetNativeNamespace(Package)}{suffix}";
        }

        public virtual void ResolveTypeNameConflicts(ISet<string> namespaceNames)
        {
            ISet<string> memberNames = new HashSet<string>(MemberNames.Values);

            while (memberNames.Contains(Name) || namespaceNames.Contains(FrameworkFullyQualifiedName) || Namespace.EndsWith($".{Name}", StringComparison.InvariantCulture))
            {
                Name += "_";
            }

        }

        public Type Type { get; }

        public string Package { get; }

        public string Namespace { get; }

        public string Name { get; protected set; }

        public IReadOnlyDictionary<string, string> MemberNames { get; protected set; }

        public string FrameworkFullyQualifiedName => $"{Namespace}.{Name}";

    }

    public class ClassTypeMetadata : TypeMetadata
    {
        public ClassTypeMetadata(ClassType type, Assembly assembly)
            : base(type, assembly)
        {
            IDictionary<string, string> memberNames = new Dictionary<string, string>();

            foreach (Method method in type.Methods ?? Enumerable.Empty<Method>())
            {
                memberNames[method.Name] = NameUtils.ConvertMethodName(method.Name);
            }

            foreach (Property property in type.Properties ?? Enumerable.Empty<Property>())
            {
                memberNames[property.Name] = NameUtils.ConvertPropertyName(property.Name);
            }

            MemberNames = new ReadOnlyDictionary<string, string>(memberNames);
            Name = NameUtils.ConvertTypeName(type.Name);
        }
    }

    public class AbstractClassTypeMetadata : ClassTypeMetadata
    {
        public string ProxyName { get; private set; }
        
        public string FrameworkFullyQualifiedProxyName => $"{Namespace}.{ProxyName}";
        
        public AbstractClassTypeMetadata(ClassType type, Assembly assembly)
            : base(type, assembly)
        {
            ProxyName = $"{Name}Proxy";
        }

        public override void ResolveTypeNameConflicts(ISet<string> namespaceNames)
        {
            base.ResolveTypeNameConflicts(namespaceNames);

            ISet<string> memberNames = new HashSet<string>(MemberNames.Values);

            while (memberNames.Contains(ProxyName) || namespaceNames.Contains(FrameworkFullyQualifiedProxyName))
            {
                ProxyName += "_";
            }
        }
    }

    public class EnumTypeMetadata : TypeMetadata
    {
        public EnumTypeMetadata(EnumType type, Assembly assembly)
            : base(type, assembly)
        {
            IDictionary<string, string> memberNames = new Dictionary<string, string>();

            foreach (EnumMember member in type.Members ?? Enumerable.Empty<EnumMember>())
            {
                memberNames[member.Name] = NameUtils.ConvertEnumMemberName(member.Name);
            }

            MemberNames = new ReadOnlyDictionary<string, string>(memberNames);
            Name = NameUtils.ConvertTypeName(type.Name);
        }
    }

    public class InterfaceTypeMetadata : TypeMetadata
    {
        public InterfaceTypeMetadata(InterfaceType type, Assembly assembly)
            : base(type, assembly)
        {
            IDictionary<string, string> memberNames = new Dictionary<string, string>();

            foreach (Method method in type.Methods ?? Enumerable.Empty<Method>())
            {
                memberNames[method.Name] = NameUtils.ConvertMethodName(method.Name);
            }

            foreach (Property property in type.Properties ?? Enumerable.Empty<Property>())
            {
                memberNames[property.Name] = NameUtils.ConvertPropertyName(property.Name);
            }

            MemberNames = new ReadOnlyDictionary<string, string>(memberNames);

            string name = NameUtils.ConvertTypeName(type.Name);
            Name = $"I{name}";
            ProxyName = $"{name}Proxy";
            DefaultName = name;
        }

        public string ProxyName { get; private set; }

        public string DefaultName { get; private set; }

        public string FrameworkFullyQualifiedProxyName => $"{Namespace}.{ProxyName}";

        public string FrameworkFullyQualifiedDefaultName => $"{Namespace}.{DefaultName}";

        public override void ResolveTypeNameConflicts(ISet<string> namespaceNames)
        {
            base.ResolveTypeNameConflicts(namespaceNames);

            ISet<string> memberNames = new HashSet<string>(MemberNames.Values);

            while (memberNames.Contains(ProxyName) || namespaceNames.Contains(FrameworkFullyQualifiedProxyName))
            {
                ProxyName += "_";
            }

            while (memberNames.Contains(DefaultName) || namespaceNames.Contains(FrameworkFullyQualifiedDefaultName))
            {
                DefaultName += "_";
            }
        }
    }
}
