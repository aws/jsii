using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Amazon.JSII.JsonModel.Spec
{
    [JsonConverter(typeof(StringEnumConverter), /* camelCaseText */ true)]
    public enum Stability
    {
        Stable,
        Experimental,
        Deprecated,
        External
    }
}
