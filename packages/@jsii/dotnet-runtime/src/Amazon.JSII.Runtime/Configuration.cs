using System;

namespace Amazon.JSII.Runtime
{
    public static class Configuration
    {
        /// <summary>
        /// Enables or disables runtime type checking of parameters when the original model expects a type union, which
        /// is represented as <c>object</c> in .NET code.
        /// </summary>
        /// <remarks>
        /// <para>This feature is enabled by default.</para>
        /// <para>
        /// This feature may be disabled as a work-around if a bug prevents your application from working correctly, or
        /// in order to stop paying the performance cost of the runtime type checking.
        /// </para>
        /// </remarks>
        public static bool RuntimeTypeChecking { get; set; } = true;
    }
}