using AWS.Jsii.JsonModel.Spec;
using System;
using System.Collections.Generic;

namespace AWS.Jsii.Generator
{
    public static class DependencyRootExtensions
    {
        public static void RecordAssemblyNames(this DependencyRoot root, IDictionary<string, string> nameMap)
        {
            if (root.Dependencies == null) { return; }
            foreach (string packageName in root.Dependencies.Keys)
            {
                nameMap[packageName] = root.Dependencies[packageName].GetNativeName();
                root.Dependencies[packageName].RecordAssemblyNames(nameMap);
            }
        }

        public static string GetNativeName(this DependencyRoot root)
        {
            root = root ?? throw new ArgumentNullException(nameof(root));

            if (string.IsNullOrWhiteSpace(root.Targets.DotNet?.Namespace))
            {
                throw new ArgumentException($"Assembly does not contain a .NET namespace mapping", nameof(root));
            }

            return root.Targets.DotNet.Namespace;
        }

        internal static string TryGetNativeName(this DependencyRoot root, string packageName)
        {
            if (root.Dependencies == null) { return null; }
            if (root.Dependencies.ContainsKey(packageName))
            {
                return root.Dependencies[packageName].GetNativeName();
            }

            foreach (PackageVersion dependency in root.Dependencies.Values)
            {
                string name = dependency.TryGetNativeName(packageName);
                if (name != null) { return name; }
            }

            return null;
        }
    }

    public static class AssemblyExtensions
    {
        public static string GetNativeName(this Assembly assembly, string packageName)
        {
            if (packageName == assembly.Name) { return assembly.GetNativeName(); }
            if (assembly.Dependencies == null)
            {
                throw new ArgumentException($"Assembly {assembly.Name} does not define namespace mappings for {packageName}");
            }

            string result = assembly.TryGetNativeName(packageName);
            if (result == null)
            {
                throw new ArgumentException($"Assembly {assembly.Name} does not define namespace mappings for {packageName}");
            }

            return result;
        }
    }
}
