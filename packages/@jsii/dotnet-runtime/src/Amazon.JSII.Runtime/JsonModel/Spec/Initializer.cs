using Newtonsoft.Json;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class Initializer : Callable
    {
        public Initializer
        (
            Parameter[]? parameters = null,
            bool isProtected = false,
            bool isVariadic = false,
            string? overrides = null,
            Docs? docs = null
        ): base(
            parameters: parameters,
            isProtected: isProtected,
            isVariadic: isVariadic,
            overrides: overrides,
            docs: docs
        )
        {}
    }
}