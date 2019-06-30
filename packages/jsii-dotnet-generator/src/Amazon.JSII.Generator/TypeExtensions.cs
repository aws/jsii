using Amazon.JSII.JsonModel.Spec;
using System;

namespace Amazon.JSII.Generator
{
    public static class TypeExtensions
    {
        public static bool AnyAncestor(this ClassType classType, ISymbolMap symbols, Func<ClassType, bool> predicate)
        {
            var current = classType.Base;

            while (current != null)
            {
                ClassType currentType = (ClassType)symbols.GetTypeFromFullyQualifiedName(current);

                if (predicate(currentType))
                {
                    return true;
                }

                current = currentType.Base;
            }

            return false;
        }
    }
}
