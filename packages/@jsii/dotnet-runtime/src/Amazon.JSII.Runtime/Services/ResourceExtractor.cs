using Amazon.JSII.JsonModel.FileSystem;
using System;
using System.IO;
using System.Reflection;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;

namespace Amazon.JSII.Runtime.Services
{
    internal sealed class ResourceExtractor : IResourceExtractor
    {
        private readonly IDictionary<string, string> _bags = new Dictionary<string, string>();
        private readonly IFileSystem _fileSystem;
        private readonly ILogger _logger;

        public ResourceExtractor(IFileSystem fileSystem, ILoggerFactory loggerFactory)
        {
            _fileSystem = fileSystem;
            _logger = loggerFactory.CreateLogger<ResourceExtractor>();
        }

        public string ExtractResource(Assembly assembly, string resourceName, string bag, string? fileName)
        {
            if (!_bags.TryGetValue(bag, out var workingDirectory))
            {
                workingDirectory = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
                _fileSystem.Directory.CreateDirectory(workingDirectory);
                _bags[bag] = workingDirectory;
            }

            var outputPath = Path.Combine(workingDirectory, fileName ?? resourceName);

            // In case the fileName included path delimiters...
            var outputDir = Path.GetDirectoryName(outputPath);
            if (outputDir != null && !_fileSystem.Directory.Exists(outputDir))
            {
                _fileSystem.Directory.CreateDirectory(outputDir);
            }
            using (var output = _fileSystem.File.Create(outputPath))
            {
                using var stream = assembly.GetManifestResourceStream(resourceName);
                if (stream == null)
                {
                    throw new JsiiError($"Cannot find embedded resource: {resourceName} in {String.Join(", ", assembly.GetManifestResourceNames())}", null);
                }

                stream.CopyTo(output);
            }

            return outputPath;
        }

        void IDisposable.Dispose()
        {
            foreach (var workdir in _bags.Values)
            {
                try
                {
                    Directory.Delete(workdir, true);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, $"Error cleaning up working directory {workdir}: {e.Message}");
                }
            }
        }
    }
}
