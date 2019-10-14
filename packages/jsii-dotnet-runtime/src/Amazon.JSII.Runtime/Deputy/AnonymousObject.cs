using System;
using System.Dynamic;
using System.Reflection.Emit;

namespace Amazon.JSII.Runtime.Deputy
{
    internal sealed class AnonymousObject : DeputyBase
    {
        AnonymousObject(ByRefValue byRefValue) : base(byRefValue)
        {
        }
    }
}