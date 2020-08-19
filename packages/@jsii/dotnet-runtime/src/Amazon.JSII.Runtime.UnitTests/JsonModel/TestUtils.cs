using Newtonsoft.Json;

namespace Amazon.JSII.Runtime.UnitTests.JsonModel
{
    public class TestUtils
    {
        private static readonly JsonSerializerSettings SerializerSettings = new JsonSerializerSettings
        {
            DefaultValueHandling = DefaultValueHandling.Ignore
        };

        protected string ToJson(object obj)
        {
            return JsonConvert.SerializeObject(obj, Formatting.Indented, SerializerSettings);
        }
    }
}