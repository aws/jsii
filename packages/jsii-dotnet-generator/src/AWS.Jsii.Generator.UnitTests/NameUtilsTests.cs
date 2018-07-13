using System;
using Xunit;

namespace AWS.Jsii.Generator.UnitTests
{
    public class NameUtilsTests
    {
        const string Prefix = nameof(Generator) + "." + nameof(NameUtils) + ".";

        public class ConvertPackageName
        {
            const string _Prefix = Prefix + nameof(NameUtils.ConvertPackageName) + ".";

            [Theory(DisplayName = _Prefix + nameof(ConvertsValid))]
            [InlineData("aws-cdk", "Aws.Cdk")]
            [InlineData("aws-cdk-resources", "Aws.Cdk.Resources")]
            [InlineData("aws_cdk_resources", "Aws_cdk_resources")]
            public void ConvertsValid(string original, string expected)
            {
                string actual = NameUtils.ConvertPackageName(original);

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Theory(DisplayName = _Prefix + nameof(ThrowsOnInvalid))]
            [InlineData("jsii$aws_cdk_resources$")]
            [InlineData("")]
            public void ThrowsOnInvalid(string original)
            {
                Assert.Throws<ArgumentException>(() => NameUtils.ConvertPackageName(original));
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNull))]
            public void ThrowsOnNull()
            {
                Assert.Throws<ArgumentNullException>(() => NameUtils.ConvertPackageName(null));
            }
        }

        public class ConvertTypeName
        {
            const string _Prefix = Prefix + nameof(NameUtils.ConvertTypeName) + ".";

            [Theory(DisplayName = _Prefix + nameof(ConvertsValid))]
            [InlineData("myTypeName", "MyTypeName")]
            public void ConvertsValid(string original, string expected)
            {
                string actual = NameUtils.ConvertTypeName(original);

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Theory(DisplayName = _Prefix + nameof(ThrowsOnInvalid))]
            [InlineData("jsii$myTypeName")]
            [InlineData("")]
            public void ThrowsOnInvalid(string original)
            {
                Assert.Throws<ArgumentException>(() => NameUtils.ConvertTypeName(original));
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNull))]
            public void ThrowsOnNull()
            {
                Assert.Throws<ArgumentNullException>(() => NameUtils.ConvertTypeName(null));
            }
        }

        public class ConvertPropertyName
        {
            const string _Prefix = Prefix + nameof(NameUtils.ConvertPropertyName) + ".";

            [Theory(DisplayName = _Prefix + nameof(ConvertsValid))]
            [InlineData("myPropertyName", "MyPropertyName")]
            public void ConvertsValid(string original, string expected)
            {
                string actual = NameUtils.ConvertPropertyName(original);

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Theory(DisplayName = _Prefix + nameof(ThrowsOnInvalid))]
            [InlineData("jsii$myPropertyName")]
            [InlineData("")]
            public void ThrowsOnInvalid(string original)
            {
                Assert.Throws<ArgumentException>(() => NameUtils.ConvertPropertyName(original));
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNull))]
            public void ThrowsOnNull()
            {
                Assert.Throws<ArgumentNullException>(() => NameUtils.ConvertPropertyName(null));
            }
        }

        public class ConvertMethodName
        {
            const string _Prefix = Prefix + nameof(NameUtils.ConvertMethodName) + ".";

            [Theory(DisplayName = _Prefix + nameof(ConvertsValid))]
            [InlineData("myMethodName", "MyMethodName")]
            public void ConvertsValid(string original, string expected)
            {
                string actual = NameUtils.ConvertMethodName(original);

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Theory(DisplayName = _Prefix + nameof(ThrowsOnInvalid))]
            [InlineData("jsii$myMethodName")]
            [InlineData("")]
            public void ThrowsOnInvalid(string original)
            {
                Assert.Throws<ArgumentException>(() => NameUtils.ConvertMethodName(original));
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNull))]
            public void ThrowsOnNull()
            {
                Assert.Throws<ArgumentNullException>(() => NameUtils.ConvertMethodName(null));
            }
        }

        public class ConvertEnumMemberName
        {
            const string _Prefix = Prefix + nameof(NameUtils.ConvertEnumMemberName) + ".";

            [Theory(DisplayName = _Prefix + nameof(ConvertsValid))]
            [InlineData("myEnumMemberName", "MyEnumMemberName")]
            public void ConvertsValid(string original, string expected)
            {
                string actual = NameUtils.ConvertEnumMemberName(original);

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Theory(DisplayName = _Prefix + nameof(ThrowsOnInvalid))]
            [InlineData("jsii$myEnumMemberName")]
            [InlineData("")]
            public void ThrowsOnInvalid(string original)
            {
                Assert.Throws<ArgumentException>(() => NameUtils.ConvertEnumMemberName(original));
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNull))]
            public void ThrowsOnNull()
            {
                Assert.Throws<ArgumentNullException>(() => NameUtils.ConvertEnumMemberName(null));
            }
        }

        public class ConvertParameterName
        {
            const string _Prefix = Prefix + nameof(NameUtils.ConvertParameterName) + ".";

            [Theory(DisplayName = _Prefix + nameof(ConvertsValid))]
            [InlineData("myParameterName", "myParameterName")]
            [InlineData("event", "@event")]
            public void ConvertsValid(string original, string expected)
            {
                string actual = NameUtils.ConvertParameterName(original);

                Assert.Equal(expected, actual, ignoreLineEndingDifferences: true);
            }

            [Theory(DisplayName = _Prefix + nameof(ThrowsOnInvalid))]
            [InlineData("jsii$myParameterName")]
            [InlineData("")]
            public void ThrowsOnInvalid(string original)
            {
                Assert.Throws<ArgumentException>(() => NameUtils.ConvertParameterName(original));
            }

            [Fact(DisplayName = _Prefix + nameof(ThrowsOnNull))]
            public void ThrowsOnNull()
            {
                Assert.Throws<ArgumentNullException>(() => NameUtils.ConvertParameterName(null));
            }
        }
    }
}
