using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json;
using System;

namespace Amazon.JSII.Runtime.Deputy
{
    [AttributeUsage(AttributeTargets.Class, Inherited = false)]
    public class JsiiClassAttribute : JsiiTypeAttributeBase
    {
        public JsiiClassAttribute(System.Type nativeType, string fullyQualifiedName, string parametersJson)
            : base(nativeType, fullyQualifiedName)
        {
            parametersJson = parametersJson ?? throw new ArgumentNullException(nameof(parametersJson));
            Parameters = JsonConvert.DeserializeObject<Parameter[]>(parametersJson);
        }

        public Parameter[] Parameters
        {
            get;
        }
    }
}
