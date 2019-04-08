using Amazon.JSII.JsonModel.Spec;

namespace Amazon.JSII.Runtime.Services.Converters
{
    public interface IJsiiToFrameworkConverter
    {
        bool TryConvert(TypeReference typeInstance, IReferenceMap referenceMap, object value, out object result);
    }
}
