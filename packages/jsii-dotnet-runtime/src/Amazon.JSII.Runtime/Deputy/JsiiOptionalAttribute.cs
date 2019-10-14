using System;

namespace Amazon.JSII.Runtime.Deputy
{
    /// <summary>
    /// Flags a property as optional.
    /// This is used by the jsii-dotnet-analyzers package to emit errors
    /// on required properties that are missing.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public sealed class JsiiOptionalAttribute : Attribute
    {
    }
}