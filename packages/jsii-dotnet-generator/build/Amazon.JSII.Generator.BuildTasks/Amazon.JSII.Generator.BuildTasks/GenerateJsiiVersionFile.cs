using Microsoft.Build.Framework;
using Microsoft.Build.Utilities;
using System;
using System.IO;

namespace Amazon.JSII.Generator.BuildTasks
{
    public class GenerateJsiiVersionFile : Microsoft.Build.Utilities.Task
    {
        [Required]
        public ITaskItem TemplatePath { get; set; }

        [Required]
        public ITaskItem OutputPath { get; set; }

        [Required]
        public string Version { get; set; }

        public override bool Execute()
        {
            if (!File.Exists(TemplatePath.ItemSpec))
            {
                throw new FileNotFoundException("JSII version template not found", TemplatePath.ItemSpec);
            }

            string content = File.ReadAllText(TemplatePath.ItemSpec);
            content = content.Replace("%JSII_VERSION%", Version);
            File.WriteAllText(OutputPath.ItemSpec, content);

            return true;
        }
    }
}
