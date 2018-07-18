using AWS.Jsii.JsonModel.Spec;
using System;
using System.Collections.Generic;

namespace AWS.Jsii.Generator
{
    public static class AssemblyExtensions
    {
        public static string GetNativeName(this Assembly assembly, string packageName)
        {
            if (packageName == assembly.Name)
            {
                return assembly.GetNativeName();
            }
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
