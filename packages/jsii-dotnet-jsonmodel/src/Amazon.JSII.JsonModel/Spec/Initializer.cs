using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class Initializer : Callable
    {
        public Initializer
        (
            bool? isProtected = null,
            Parameter[] parameters = null,
            Docs docs = null,
            bool? isVariadic = null,
            string overrides = null
        ): base(
            isProtected,
            parameters,
            docs,
            isVariadic,
            overrides
        )
        {}
    }
}