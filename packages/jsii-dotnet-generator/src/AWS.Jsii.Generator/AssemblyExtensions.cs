using AWS.Jsii.JsonModel.Spec;
using System;

namespace AWS.Jsii.Generator
{
    public static class AssemblyExtensions
    {
        const string DotNetKey = "dotnet";

        public static string GetNativeName(this Assembly assembly)
        {
            assembly = assembly ?? throw new ArgumentNullException(nameof(assembly));

            if (!assembly.Names.ContainsKey(DotNetKey) || string.IsNullOrWhiteSpace(assembly.Names[DotNetKey]))
            {
                throw new ArgumentException($"Assembly ${assembly.Name} does not contain a .NET namespace mapping", nameof(assembly));
            }

            return assembly.Names[DotNetKey];
        }

        public static string GetNativeName(this Assembly assembly, string packageName)
        {
            assembly = assembly ?? throw new ArgumentNullException(nameof(assembly));
            packageName = packageName ?? throw new ArgumentNullException(nameof(packageName));

            if (!assembly.NativeNames.ContainsKey(packageName))
            {
                throw new ArgumentException($"Assembly ${assembly.Name} does not contain namespace mappings for {packageName}", nameof(assembly));
            }

            var name = assembly.NativeNames[packageName];
            if (name?.ContainsKey(DotNetKey) != true)
            {
                throw new ArgumentException($"Assembly ${assembly.Name} does not contain a .NET namespace mapping for {packageName}", nameof(assembly));
            }

            return name[DotNetKey];
        }
    }
}
