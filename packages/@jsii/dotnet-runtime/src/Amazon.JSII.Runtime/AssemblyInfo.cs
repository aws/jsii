using System;
using System.Runtime.CompilerServices;

[assembly:CLSCompliant(false)] // among other things, array parameters are passed to attributes

[assembly:InternalsVisibleTo("Amazon.JSII.Runtime.IntegrationTests")]
[assembly:InternalsVisibleTo("Amazon.JSII.Runtime.UnitTests")]
[assembly:InternalsVisibleTo("DynamicProxyGenAssembly2")]
