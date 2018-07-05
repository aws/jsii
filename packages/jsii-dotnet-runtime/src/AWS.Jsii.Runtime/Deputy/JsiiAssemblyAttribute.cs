using System;

namespace AWS.Jsii.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Assembly, Inherited = false)]
    public class JsiiAssemblyAttribute : Attribute
    {
        public JsiiAssemblyAttribute(string name, string version, string tarball)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Version = version ?? throw new ArgumentNullException(nameof(version));
            Tarball = tarball ?? throw new ArgumentNullException(nameof(tarball));
        }

        public string Name { get; }

        public string Version { get; }

        public string Tarball { get; }
    }
}