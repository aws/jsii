using Amazon.JSII.JsonModel.Spec;

namespace Amazon.JSII.Runtime.Services.Converters
{
    internal interface IJsiiToFrameworkConverter
    {
        bool TryConvert(IOptionalValue? optionalValue, System.Type type, IReferenceMap referenceMap, object? value, out object? result);
    }
}
