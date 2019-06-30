using CommandLine;

namespace Amazon.JSII.Generator.CLI
{
    class Options
    {
        [Option('j', "jsii", Required = true, HelpText = "Path to the .jsii spec file")]
        public string JsiiFile { get; set; }

        [Option('t', "tarball", Required = true, HelpText = "The location of the module's .tgz file")]
        public string Tarball { get; set; }

        [Option('o', "output", Required = true, HelpText = "Directory in which to place generated code.")]
        public string OutputDirectory { get; set; }
    }
}
