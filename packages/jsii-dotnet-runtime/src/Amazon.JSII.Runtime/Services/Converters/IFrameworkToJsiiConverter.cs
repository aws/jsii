using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json.Linq;

namespace Amazon.JSII.Runtime.Services.Converters
{
    internal interface IFrameworkToJsiiConverter
    {
        bool TryConvert(IOptionalValue optionalValue, IReferenceMap referenceMap, object value, out object result);
    }
}
