using Amazon.JSII.JsonModel.Spec;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Amazon.JSII.Generator
{
    public static class DependencyRootExtensions
    {
        internal static string GetNativeProperty(
            this DependencyRoot root,
            string currentPackageName,
            string targetPackageName,
            Func<DependencyRoot, string> selector
        )
        {
            root = root ?? throw new ArgumentNullException(nameof(root));
            selector = selector ?? throw new ArgumentNullException(nameof(selector));
            currentPackageName = currentPackageName ?? throw new ArgumentNullException(nameof(currentPackageName));
            targetPackageName = targetPackageName ?? throw new ArgumentNullException(nameof(targetPackageName));

            if (currentPackageName == targetPackageName)
            {
                return selector(root);
            }

            return (root.Dependencies ?? Enumerable.Empty<KeyValuePair<string, PackageVersion>>())
                .Select(kvp => GetNativeProperty(kvp.Value, kvp.Key, targetPackageName, selector))
                .FirstOrDefault(p => p != null);
        }
    }
}
