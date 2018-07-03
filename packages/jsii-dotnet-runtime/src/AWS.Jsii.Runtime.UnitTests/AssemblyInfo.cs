using Xunit;

// Each test in this assembly overrides the the global service provider, so they can't be run in parallel.
[assembly: CollectionBehavior(CollectionBehavior.CollectionPerAssembly)]
