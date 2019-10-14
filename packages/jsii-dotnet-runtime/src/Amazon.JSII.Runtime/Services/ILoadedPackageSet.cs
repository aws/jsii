using System;
using System.Collections.Generic;
using System.Text;

namespace Amazon.JSII.Runtime.Services
{
    internal interface ILoadedPackageSet
    {
        bool Contains(string package);

        void Add(string package);
    }
}
