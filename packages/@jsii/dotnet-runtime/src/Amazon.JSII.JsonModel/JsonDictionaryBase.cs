using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace Amazon.JSII.JsonModel
{
    public abstract class JsonDictionaryBase<TKey, TValue> : IDictionary<TKey, TValue>
        where TKey : notnull
    {
        private readonly IDictionary<TKey, TValue> _members = new Dictionary<TKey, TValue>();

        #region IDictionary implementation

        public TValue this[TKey key]
        {
            get => _members[key];
            set => _members[key] = value;
        }

        public ICollection<TKey> Keys => _members.Keys;

        public ICollection<TValue> Values => _members.Values;

        public int Count => _members.Count;

        public bool IsReadOnly => _members.IsReadOnly;

        public void Add(TKey key, TValue value)
        {
            _members.Add(key, value);
        }

        public void Add(KeyValuePair<TKey, TValue> item)
        {
            _members.Add(item);
        }

        public void Clear()
        {
            _members.Clear();
        }

        public bool Contains(KeyValuePair<TKey, TValue> item)
        {
            return _members.Contains(item);
        }

        public bool ContainsKey(TKey key)
        {
            return _members.ContainsKey(key);
        }

        public void CopyTo(KeyValuePair<TKey, TValue>[] array, int arrayIndex)
        {
            _members.CopyTo(array, arrayIndex);
        }

        public IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator()
        {
            return _members.GetEnumerator();
        }

        public bool Remove(TKey key)
        {
            return _members.Remove(key);
        }

        public bool Remove(KeyValuePair<TKey, TValue> item)
        {
            return _members.Remove(item);
        }

        public bool TryGetValue(TKey key, [MaybeNullWhen(false)] out TValue value)
        {
            return _members.TryGetValue(key, out value);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return ((IEnumerable)_members).GetEnumerator();
        }

        #endregion
    }
}
