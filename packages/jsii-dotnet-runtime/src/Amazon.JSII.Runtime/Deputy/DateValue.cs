using Newtonsoft.Json;
using System;

namespace Amazon.JSII.Runtime.Deputy
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    internal sealed class DateValue
    {
        public DateValue(DateTime dateTime)
        {
            DateTime = dateTime;
        }

        // Json.NET serializes as ISON-8601 by default.
        [JsonProperty("$jsii.date")]
        public DateTime DateTime { get; }
    }
}
