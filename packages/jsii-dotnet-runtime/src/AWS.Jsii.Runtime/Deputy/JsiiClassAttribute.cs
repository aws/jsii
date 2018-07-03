using AWS.Jsii.JsonModel.Spec;
using Newtonsoft.Json;
using System;

namespace AWS.Jsii.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Class, Inherited = false)]
    public class JsiiClassAttribute : JsiiTypeAttributeBase
    {
        public JsiiClassAttribute(string package, string fullyQualifiedName, string parametersJson)
            : base(package, fullyQualifiedName)
        {
            Parameters = JsonConvert.DeserializeObject<Parameter[]>(parametersJson ?? throw new ArgumentNullException(nameof(parametersJson)));
        }

        public Parameter[] Parameters
        {
            get;
        }
    }
}
