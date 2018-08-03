using Amazon.JSII.JsonModel.Spec;
using System;
using System.Collections.Generic;
using System.Text;

namespace Amazon.JSII.Generator
{
    internal static class PropertyExtensions
    {
        public static bool IsStatic(this Property property)
        {
            return property.IsStatic == true || property.IsConstant == true;
        }

        public static bool IsImmutable(this Property property)
        {
            return property.IsImmutable == true || property.IsConstant == true;
        }
    }
}
