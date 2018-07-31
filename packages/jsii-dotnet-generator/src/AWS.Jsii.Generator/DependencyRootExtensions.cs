using AWS.Jsii.JsonModel.Spec;
using System;
using System.Collections.Generic;

namespace AWS.Jsii.Generator
{
    public static class DependencyRootExtensions
    {
        public static string GetNativeName(this DependencyRoot root)
        {
            root = root ?? throw new ArgumentNullException(nameof(root));

            if (string.IsNullOrWhiteSpace(root.Targets?.DotNet?.Namespace))
            {
                throw new ArgumentException($"Assembly does not contain a .NET namespace mapping", nameof(root));
            }

            return root.Targets.DotNet.Namespace;
        }

        internal static string TryGetNativeName(this DependencyRoot root, string packageName)
        {
            if (root.Dependencies == null)
            {
                return null;
            }
            if (root.Dependencies.ContainsKey(packageName))
            {
                return root.Dependencies[packageName].GetNativeName();
            }

            foreach (PackageVersion dependency in root.Dependencies.Values)
            {
                string name = dependency.TryGetNativeName(packageName);
                if (name != null)
                {
                    return name;
                }
            }

            return null;
        }
    }
}
