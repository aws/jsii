using Amazon.JSII.JsonModel.Spec;

namespace Amazon.JSII.Generator
{
    public static class VersionSuffixExtensions
    {
        public static string GetDecoratedVersion(this Assembly assembly)
        {
            return MakeDecoratedVersion(assembly.Version, assembly.Targets?.DotNet?.VersionSuffix);
        }

        public static string GetDecoratedVersion(this PackageVersion package)
        {
            return MakeDecoratedVersion(package.Version, package.Targets?.DotNet?.VersionSuffix);
        }

        private static string MakeDecoratedVersion(string version, string suffix)
        {
            if (suffix == null)
            {
                return version;
            }
            // suffix is guaranteed to start with a leading `-`
            return $"{version}{suffix}";
        }
    }
}
