using CommandLine;
using System;
using System.Collections.Generic;

namespace AWS.Jsii.Generator.CLI
{
    class Program
    {
        static void Main(string[] args)
        {
            Parser.Default.ParseArguments<Options>(args)
                .WithParsed(Generate);
        }

        static void Generate(Options options)
        {
            AssemblyGenerator generator = new AssemblyGenerator(options.OutputDirectory, "", "");

            generator.Generate(options.JsiiDirectory);
        }
    }
}
