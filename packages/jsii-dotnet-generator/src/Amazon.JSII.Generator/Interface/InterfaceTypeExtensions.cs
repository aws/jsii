using Amazon.JSII.JsonModel.Spec;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Amazon.JSII.Generator.Interface
{
    internal static class InterfaceTypeExtensions
    {
        public static IEnumerable<Property> GetAllProperties(this InterfaceType @interface, ISymbolMap symbols)
        {
            @interface = @interface ?? throw new ArgumentNullException(nameof(@interface));
            symbols = symbols ?? throw new ArgumentNullException(nameof(symbols));

            return GetAllCore(@interface, symbols, i => i.Properties);
        }

        public static IEnumerable<Method> GetAllMethods(this InterfaceType @interface, ISymbolMap symbols)
        {
            @interface = @interface ?? throw new ArgumentNullException(nameof(@interface));
            symbols = symbols ?? throw new ArgumentNullException(nameof(symbols));

            return GetAllCore(@interface, symbols, i => i.Methods);
        }

        static IEnumerable<T> GetAllCore<T>(this InterfaceType @interface, ISymbolMap symbols, Func<InterfaceType, IEnumerable<T>> selector)
        {
            foreach (T member in selector(@interface) ?? Enumerable.Empty<T>())
            {
                yield return member;
            }

            if (@interface.Interfaces != null)
            {
                var baseMembers = @interface.Interfaces
                    .Select(r => symbols.GetTypeFromFullyQualifiedName(r) as InterfaceType)
                    .SelectMany(i => GetAllCore(i, symbols, selector));

                foreach (T member in baseMembers)
                {
                    yield return member;
                }
            }
        }
    }
}
