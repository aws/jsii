using System.IO;

namespace Amazon.JSII.JsonModel.FileSystem
{
    /// <summary>
    /// Simple wrapper around .NET System.IO.File and System.IO.Directory classes.
    /// Allows filesystem access while retaining testability.
    /// </summary>
    public interface IFileSystem
    {
        IFile File { get; }

        IDirectory Directory { get; }
    }

    public interface IFile
    {
        string ReadAllText(string path);

        void WriteAllText(string path, string contents);

        void Copy(string sourceFileName, string destFileName);

        FileStream Create(string path);
    }

    public interface IDirectory
    {
        bool Exists(string path);

        void Delete(string path, bool recursive);

        void CreateDirectory(string path);
    }
}
