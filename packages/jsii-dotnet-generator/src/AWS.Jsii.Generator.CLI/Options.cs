using CommandLine;

namespace AWS.Jsii.Generator.CLI
{
    class Options
    {
        [Option('j', "jsii", Required = true, HelpText = "The directory containing 'assembly.jsii'")]
        public string JsiiDirectory { get; set; }

        [Option('o', "output", Required = true, HelpText = "Directory in which to place generated code.")]
        public string OutputDirectory { get; set; }
    }
}
