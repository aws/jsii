using Amazon.JSII.JsonModel.Spec;
using System;
using System.Collections.Generic;
using System.Xml.Linq;

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

        public static IEnumerable<XElement> GetMsBuildProperties(this Assembly assembly)
        {
            yield return new XElement("TargetFramework", "netstandard2.0");
            yield return new XElement("GeneratePackageOnBuild", true);
            yield return new XElement("PackageVersion", assembly.Version);
            yield return new XElement("PackageId", assembly.Targets.DotNet.PackageId);
            yield return new XElement("Description", assembly.Description);
            yield return new XElement("ProjectUrl", assembly.Homepage);
            yield return new XElement("LicenseUrl", $"https://spdx.org/licenses/{assembly.License}.html");
            yield return new XElement("Authors", $"{assembly.Author.Name}");

            // TODO: Update once we have a localization story.
            yield return new XElement("Language", "en-US");

            if (assembly.Targets.DotNet.Title != null)
            {
                yield return new XElement("Title", assembly.Targets.DotNet.Title);
            }

            if (assembly.Targets.DotNet.SignAssembly != null)
            {
                yield return new XElement("SignAssembly", assembly.Targets.DotNet.SignAssembly);
            }

            if (assembly.Targets.DotNet.AssemblyOriginatorKey != null)
            {
                yield return new XElement("AssemblyOriginatorKey", assembly.Targets.DotNet.AssemblyOriginatorKey);
            }

            if (assembly.Targets.DotNet.Tags != null)
            {
                // NuGet expects the list of tags to be space-delimited.
                yield return new XElement("Tags", string.Join(" ", assembly.Targets.DotNet.Tags));
            }

            if (assembly.Targets.DotNet.IconUrl != null)
            {
                yield return new XElement("IconUrl", assembly.Targets.DotNet.IconUrl);
            }
        }
    }
}
