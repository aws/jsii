using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Amazon.JSII.Generator.UnitTests
{
    public class DelegateComparerTests
    {
        const string Prefix = nameof(Generator) + ".DelegateComparer.";

        [Fact(DisplayName = Prefix + nameof(DistinctComparesByComparator))]
        public void DistinctComparesByComparator()
        {
            var comparer = new DelegateComparer<KeyValuePair<string, string>, string>(p => p.Key);

            int actual = new[]
                {
                    new KeyValuePair<string, string>("myKey", "myValue1"),
                    new KeyValuePair<string, string>("myKey", "myValue2"),
                }
                .Distinct(comparer)
                .Count();

            Assert.Equal(1, actual);
        }

        [Fact(DisplayName = Prefix + nameof(DistinctComparesByComparator))]
        public void HashSetComparesByComparator()
        {
            var comparer = new DelegateComparer<KeyValuePair<string, string>, string>(p => p.Key);

            var items = new[] {
                new KeyValuePair<string, string>("myKey", "myValue1"),
                new KeyValuePair<string, string>("myKey", "myValue2"),
            };
            int actual = new HashSet<KeyValuePair<string, string>>(items, comparer).Count;

            Assert.Equal(1, actual);
        }
    }
}
