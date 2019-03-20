using Amazon.JSII.JsonModel.Api;
using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Runtime.Services
{
    public interface IReferenceMap
    {
        void AddNativeReference(ByRefValue reference, DeputyBase nativeReference, bool force = false);

        DeputyBase GetOrCreateNativeReference(ObjectReference reference);

        DeputyBase GetOrCreateNativeReference(ByRefValue reference);
    }
}
