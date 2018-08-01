using Amazon.JSII.JsonModel.Spec;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Generator
{
    public static class AssemblyExtensions
    {
        public static string GetNativeName(this Assembly assembly, string packageName)
        {
            assembly = assembly ?? throw new ArgumentNullException(nameof(assembly));
            packageName = packageName ?? throw new ArgumentNullException(nameof(packageName));

            if (packageName == assembly.Name)
            {
                return assembly.GetNativeName();
            }

            if (assembly.Dependencies == null)
            {
                throw new ArgumentException($"Assembly '{assembly.Name}' does not define namespace mappings for '{packageName}'", nameof(assembly));
            }

            var name = assembly.TryGetNativeName(packageName);
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException($"Assembly '{assembly.Name}' does not define namespace mappings for '{packageName}'", nameof(assembly));
            }

            return name;
        }
    }
}
