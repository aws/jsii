using Amazon.JSII.JsonModel.Api;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Amazon.JSII.Runtime.Deputy
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public sealed class ByRefValue
    {
        [JsonConstructor]
        internal ByRefValue(string value, string[]? interfaces = null, bool isProxy = false)
        {
            Value = value ?? throw new ArgumentNullException(nameof(value));
            Interfaces = interfaces ?? Array.Empty<string>();

            var lastIndex = value.LastIndexOf('@');
            if (lastIndex == -1)
            {
                throw new ArgumentException($"Unexpected format for byref value: {value}", nameof(value));
            }

            FullyQualifiedName = value.Substring(0, lastIndex);
            Id = value.Substring(lastIndex + 1);

            IsProxy = isProxy;
        }

        internal ByRefValue(string fullyQualifiedName, string id, string[]? interfaces = null)
            : this($"{fullyQualifiedName}@{id}", fullyQualifiedName, id, interfaces, false)
        {
        }

        internal ByRefValue(string value, string fullyQualifiedName, string id, string[]? interfaces, bool isProxy)
        {
            Value = value ?? throw new ArgumentNullException(nameof(value));
            FullyQualifiedName = fullyQualifiedName ?? throw new ArgumentNullException(nameof(value));
            Id = id ?? throw new ArgumentNullException(nameof(value));
            Interfaces = interfaces ?? Array.Empty<string>();
            IsProxy = isProxy;
        }

        [JsonProperty("$jsii.byref", Required = Required.Always)]
        internal string Value { get; }

        [JsonProperty("$jsii.interfaces")]
        internal string[] Interfaces { get; private set;  }

        internal string FullyQualifiedName { get; }

        internal string Id { get; }

        internal bool IsProxy { get; }

        /// <summary>
        /// ByRefValue is basically ObjectReference with more type safety. The only reason
        /// ObjectReference exists is to match the shape of ObjRef from @jsii/kernel/lib/api.ts.
        /// </summary>
        internal ObjectReference ToObjectReference()
        {
            ObjectReference reference = new ObjectReference();
            reference["$jsii.byref"] = Value;

            return reference;
        }

        internal ByRefValue ForProxy()
        {
            return IsProxy ? this : new ByRefValue(Value, FullyQualifiedName, Id, Interfaces, true);
        }

        internal void Merge(ByRefValue other)
        {
            var mergedInterfaces = new HashSet<string>(Interfaces);
            foreach (var iface in other.Interfaces)
            {
                mergedInterfaces.Add(iface);
            }
            Interfaces = other.Interfaces = mergedInterfaces.ToArray();
        }
    }
}
