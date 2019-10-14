using System;
using System.Collections.Generic;
using System.Text;
using System.Reflection;

namespace Amazon.JSII.Runtime.Services
{
    internal interface IResourceExtractor : IDisposable
    {
        string ExtractResource(Assembly assembly, string resourceName, string bag = "default", string fileName = null);
    }
}
