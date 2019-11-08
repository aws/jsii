namespace Amazon.JSII.Runtime.Services
{
    internal interface ILoadedPackageSet
    {
        bool Contains(string package);

        void Add(string package);
    }
}
