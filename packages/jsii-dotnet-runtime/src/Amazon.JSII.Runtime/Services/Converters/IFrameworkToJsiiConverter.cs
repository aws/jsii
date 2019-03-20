using Amazon.JSII.JsonModel.Spec;
using Newtonsoft.Json.Linq;

namespace Amazon.JSII.Runtime.Services.Converters
{
    public interface IFrameworkToJsiiConverter
    {
        bool TryConvert(TypeReference typeReference, IReferenceMap referenceMap, object value, out object result);
    }
}
