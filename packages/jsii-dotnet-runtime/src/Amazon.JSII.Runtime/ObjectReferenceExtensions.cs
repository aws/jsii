using Amazon.JSII.JsonModel.Api;

namespace Amazon.JSII.Runtime
{
    static class ObjectReferenceExtensions
    {
        public static string Value(this ObjectReference reference)
        {
            return reference["$jsii.byref"];
        }
    }
}
