using Amazon.JSII.JsonModel.Spec;
using System;
using System.Collections.Generic;
using System.Xml.Linq;

namespace Amazon.JSII.Generator
{
    public static class AssemblyExtensions
    {
        public static string GetNativePackageId(this Assembly assembly, string targetPackageName = null)
        {
            assembly = assembly ?? throw new ArgumentNullException(nameof(assembly));

            string packageId = assembly.GetNativeProperty
            (
                assembly.Name,
                targetPackageName ?? assembly.Name,
                d => d.Targets?.DotNet?.PackageId
            );

            if (string.IsNullOrWhiteSpace(packageId))
            {
                throw new ArgumentException
                (
                    $"Assembly {assembly.Name} does not include a package id mapping for {targetPackageName ?? assembly.Name}",
                    nameof(assembly)
                );
            }

            return packageId;
        }

        public static string GetNativeNamespace(this Assembly assembly, string targetPackageName = null)
        {
            assembly = assembly ?? throw new ArgumentNullException(nameof(assembly));

            string @namespace = assembly.GetNativeProperty
           (
               assembly.Name,
               targetPackageName ?? assembly.Name,
               d => d.Targets?.DotNet?.Namespace
           );

            if (string.IsNullOrWhiteSpace(@namespace))
            {
                throw new ArgumentException
                (
                    $"Assembly {assembly.Name} does not include a namespace mapping for {targetPackageName ?? assembly.Name}",
                    nameof(assembly)
                );
            }

            return @namespace;
        }

        public static IEnumerable<XElement> GetMsBuildProperties(this Assembly assembly)
        {
            yield return new XElement("TargetFramework", "netstandard2.0");
            yield return new XElement("GeneratePackageOnBuild", true);
            yield return new XElement("IncludeSymbols", true);
            yield return new XElement("IncludeSource", true);
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
                yield return new XElement("SignAssembly",
                    new XAttribute("Condition", @"Exists('$(AssemblyOriginatorKeyFile)')"),
                    assembly.Targets.DotNet.SignAssembly
                );
            }

            if (assembly.Targets.DotNet.AssemblyOriginatorKeyFile != null)
            {
                yield return new XElement("AssemblyOriginatorKeyFile", assembly.Targets.DotNet.AssemblyOriginatorKeyFile);
            }

            if (assembly.Targets.DotNet.IconUrl != null)
            {
                yield return new XElement("IconUrl", assembly.Targets.DotNet.IconUrl);
            }
        }
    }
}
