using System.IO;

namespace Amazon.JSII.JsonModel.FileSystem
{
    public sealed class FileSystem : IFileSystem
    {
        public IFile File { get; } = new DefaultFile();

        public IDirectory Directory { get; } = new DefaultDirectory();
    }

    public sealed class DefaultFile : IFile
    {
        public string ReadAllText(string path)
        {
            return File.ReadAllText(path);
        }

        public void WriteAllText(string path, string contents)
        {
            File.WriteAllText(path, contents);
        }

        public void Copy(string sourceFileName, string destFileName)
        {
            File.Copy(sourceFileName, destFileName);
        }

        public FileStream Create(string path) 
        {
            return File.Create(path);
        }
    }

    public sealed class DefaultDirectory : IDirectory
    {
        public void CreateDirectory(string path)
        {
            Directory.CreateDirectory(path);
        }

        public void Delete(string path, bool recursive)
        {
            Directory.Delete(path, recursive);
        }

        public bool Exists(string path)
        {
            return Directory.Exists(path);
        }
    }
}
