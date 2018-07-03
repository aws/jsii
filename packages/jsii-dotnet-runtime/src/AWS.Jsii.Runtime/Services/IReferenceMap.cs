using AWS.Jsii.JsonModel.Api;
using AWS.Jsii.Runtime.Deputy;

namespace AWS.Jsii.Runtime.Services
{
    public interface IReferenceMap
    {
        void AddNativeReference(ByRefValue reference, DeputyBase nativeReference);

        DeputyBase GetOrCreateNativeReference(ObjectReference reference);

        DeputyBase GetOrCreateNativeReference(ByRefValue reference);
    }
}
