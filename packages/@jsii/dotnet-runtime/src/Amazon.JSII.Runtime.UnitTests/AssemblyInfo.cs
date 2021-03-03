using System;
using System.Runtime.CompilerServices;
using Castle.Core.Internal;
using Xunit;

[assembly:CLSCompliant(false)]

// Each test in this assembly overrides the the global service provider, so they can't be run in parallel.
[assembly: CollectionBehavior(CollectionBehavior.CollectionPerAssembly)]

[assembly:InternalsVisibleTo(InternalsVisible.ToDynamicProxyGenAssembly2)]