using AWS.Jsii.JsonModel.Spec;
using Microsoft.CodeAnalysis.CSharp;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AWS.Jsii.Generator
{
    public static class NameUtils
    {
        public static string ConvertPackageName(string original)
        {
            original = original ?? throw new ArgumentNullException(nameof(original));

            if (string.IsNullOrWhiteSpace(original) || original.Contains('$'))
            {
                throw new ArgumentException($"Invalid package name '{original}'", nameof(original));
            }

            return string.Join(".", original.Split('-').Select(CapitalizeWord));
        }

        public static string ConvertTypeName(string original)
        {
            original = original ?? throw new ArgumentNullException(nameof(original));

            if (string.IsNullOrWhiteSpace(original) || original.Contains('$'))
            {
                throw new ArgumentException($"Invalid type name '{original}'", nameof(original));
            }

            return CapitalizeWord(original);
        }

        public static string ConvertPropertyName(string original)
        {
            original = original ?? throw new ArgumentNullException(nameof(original));

            if (string.IsNullOrWhiteSpace(original) || original.Contains('$'))
            {
                throw new ArgumentException($"Invalid property name '{original}'", nameof(original));
            }

            return CapitalizeWord(original);
        }

        public static string ConvertMethodName(string original)
        {
            original = original ?? throw new ArgumentNullException(nameof(original));

            if (string.IsNullOrWhiteSpace(original) || original.Contains('$'))
            {
                throw new ArgumentException($"Invalid method name '{original}'", nameof(original));
            }

            return CapitalizeWord(original);
        }

        public static string ConvertEnumMemberName(string original)
        {
            original = original ?? throw new ArgumentNullException(nameof(original));

            if (string.IsNullOrWhiteSpace(original) || original.Contains('$'))
            {
                throw new ArgumentException($"Invalid enum member name '{original}'", nameof(original));
            }

            return CapitalizeWord(original);
        }

        public static string ConvertParameterName(string original)
        {
            original = original ?? throw new ArgumentNullException(nameof(original));

            if (string.IsNullOrWhiteSpace(original) || original.Contains('$'))
            {
                throw new ArgumentException($"Invalid parameter name '{original}'", nameof(original));
            }

            return EscapeKeyword(original);
        }

        static string CapitalizeWord(string word)
        {
            return word.Substring(0, 1).ToUpperInvariant() + word.Substring(1);
        }

        static string EscapeKeyword(string text)
        {
            if (SyntaxFacts.GetKeywordKind(text) != SyntaxKind.None)
            {
                return "@" + text;
            }

            return text;
        }
    }
}
