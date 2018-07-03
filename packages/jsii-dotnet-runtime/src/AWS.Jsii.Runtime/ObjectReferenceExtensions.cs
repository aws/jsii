using AWS.Jsii.JsonModel.Api;

namespace AWS.Jsii.Runtime
{
    static class ObjectReferenceExtensions
    {
        public static string Value(this ObjectReference reference)
        {
            return reference["$jsii.byref"];
        }
    }
}
