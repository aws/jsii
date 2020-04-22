using Newtonsoft.Json;
using System;

namespace Amazon.JSII.JsonModel.Api.Response
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class OkResponse<TResult>
        where TResult : class, IKernelResponse
    {
        public OkResponse(TResult ok)
        {
            Ok = ok ?? throw new ArgumentNullException(nameof(ok));
        }

        [JsonProperty("ok")]
        public TResult Ok { get; }
    }
}