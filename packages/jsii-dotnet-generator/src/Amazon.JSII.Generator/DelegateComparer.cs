using System;
using System.Collections.Generic;

namespace Amazon.JSII.Generator
{
    public class DelegateComparer<T, TComparator> : IEqualityComparer<T>
    {
        readonly Func<T, TComparator> _comparatorSelector;

        public DelegateComparer(Func<T, TComparator> comparatorSelector)
        {
            _comparatorSelector = comparatorSelector ?? throw new ArgumentNullException(nameof(comparatorSelector));
        }

        public bool Equals(T x, T y)
        {
            return EqualityComparer<TComparator>.Default.Equals(_comparatorSelector(x), _comparatorSelector(y));
        }

        public int GetHashCode(T obj)
        {
            return _comparatorSelector(obj).GetHashCode();
        }
    }
}
