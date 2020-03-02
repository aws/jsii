using Amazon.JSII.JsonModel.Spec;

namespace Amazon.JSII.Runtime.Services.Converters
{
    internal interface IFrameworkToJsiiConverter
    {
        bool TryConvert(IOptionalValue? optionalValue, IReferenceMap referenceMap, object? value, out object? result);
    }
}
