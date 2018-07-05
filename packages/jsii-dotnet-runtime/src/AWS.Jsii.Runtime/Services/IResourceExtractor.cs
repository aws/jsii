using System;
using System.Collections.Generic;
using System.Text;
using System.Reflection;

namespace AWS.Jsii.Runtime.Services
{
    public interface IResourceExtractor : IDisposable
    {
        string ExtractResource(Assembly assembly, string resourceName, string bag = "default", string fileName = null);
    }
}
