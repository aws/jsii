using AWS.Jsii.Runtime.Services;
using System;
using System.IO;
using Xunit.Abstractions;

namespace AWS.Jsii.Runtime.IntegrationTests
{
    public abstract class IntegrationTestBase : IDisposable
    {
        public IntegrationTestBase(ITestOutputHelper output)
        {
            // Evaluates to <repository root>/packages.
            string sourcePackagesPath = Path.Combine("..", "..", "..", "..", "..", "..");

            // xUnit doesn't respect the environment variables from launchSettings.json, so we have to manually set them here.
            if (Environment.OSVersion.Platform == PlatformID.Unix)
            {
                // For Unix, use jsii-runtime directly from the repository.
                Environment.SetEnvironmentVariable("__DEV_CDK_ROOT", sourcePackagesPath);
            }
            else
            {
                // For Windows, symlinks are not respected, so we just use the installed version in ~/.cdk.
                string cdkRoot = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), ".cdk", "node_modules");
                Environment.SetEnvironmentVariable("__DEV_CDK_ROOT", cdkRoot);

                // ~/.cdk does not contain jsii-calc or jsii-calc-lib, so we need to manually copy.
                foreach (string package in new[] { "jsii-calc", "jsii-calc-lib" })
                {
                    string sourceDir = Path.Combine(sourcePackagesPath, package, "dist");
                    string targetDir = Path.Combine(cdkRoot, package, "dist");
                    if (!Directory.Exists(targetDir))
                    {
                        Directory.CreateDirectory(targetDir);
                    }

                    string sourceAssembly = Path.Combine(sourceDir, "assembly.jsii");
                    string targetAssembly = Path.Combine(targetDir, "assembly.jsii");

                    if (!File.Exists(sourceAssembly))
                    {
                        throw new InvalidOperationException(
                            "You must build jsii-calc and jsii-calc-lib before running integration tests. " +
                            "In a Bash for Windows prompt, run `./build.sh` from the root of this repository.");
                    }

                    if (!File.Exists(targetAssembly) || File.GetLastWriteTime(sourceAssembly) > File.GetLastWriteTime(targetAssembly))
                    {
                        File.Copy(sourceAssembly, targetAssembly);
                    }
                }
            }

            Environment.SetEnvironmentVariable("JSII_DEBUG", "true");

            ServiceContainer.ServiceProviderOverride = ServiceContainer.BuildServiceProvider(
                loggerFactoryOverride: new XUnitLoggerFactory(output)
            );
        }

        public void Dispose()
        {
            ServiceContainer.ServiceProviderOverride = null;
        }
    }
}
