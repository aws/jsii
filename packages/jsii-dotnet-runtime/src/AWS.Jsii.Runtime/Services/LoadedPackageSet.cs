using System.Collections.Generic;

namespace AWS.Jsii.Runtime.Services
{
    public class LoadedPackageSet : ILoadedPackageSet
    {
        readonly ISet<string> _packages = new HashSet<string>();

        public void Add(string package)
        {
            _packages.Add(package);
        }

        public bool Contains(string package)
        {
            return _packages.Contains(package);
        }
    }
}
