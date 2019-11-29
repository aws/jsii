using System;

namespace Amazon.JSII.Runtime.Deputy
{
    /// <summary>
    /// Flags a property as optional.
    ///
    /// This is used by the <c>Amazon.Jsii.Analyzers</c> Roslyn analyzer to emit errors on required properties that are missing.
    /// </summary>
    /// <remarks>
    /// Annotated properties have a setter with a default implementation that throws
    /// <c>System.NotSupportedException</c> when invoked. In a similar way that they have to in TypeScript,
    /// implementors need to actively opt into supporting the functionality by providing a custom implementation
    /// for the member.
    /// </remarks>
    [AttributeUsage(AttributeTargets.Property)]
    public sealed class JsiiOptionalAttribute : Attribute
    {
    }
}