using CommandLine;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Generator.CLI
{
    class Program
    {
        static void Main(string[] args)
        {
            Parser.Default.ParseArguments<Options>(args)
                .WithParsed(Generate)
                .WithNotParsed(errs => HandleParseError(errs));
        }

        static void HandleParseError(IEnumerable<Error> errors)
        {
            Environment.Exit(1);
        }

        static void Generate(Options options)
        {
            AssemblyGenerator generator = new AssemblyGenerator(options.OutputDirectory);

            generator.Generate(options.JsiiFile, options.Tarball);
        }
    }
}
