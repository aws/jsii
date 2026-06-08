"""Debug: check if eval() with dict subclass triggers __missing__ in Python 3.14."""

import typing

class MyDict(dict):
    def __missing__(self, key):
        print(f"  __missing__ called with key={key!r}")
        if key == "CompositeOperation":
            import enum
            class CompositeOperation:
                class CompositionStringStyle(enum.Enum):
                    NORMAL = "NORMAL"
            self[key] = CompositeOperation
            return CompositeOperation
        raise KeyError(key)

    def __contains__(self, key):
        result = super().__contains__(key) or key == "CompositeOperation"
        print(f"  __contains__ called with key={key!r} -> {result}")
        return result

    def __getitem__(self, key):
        print(f"  __getitem__ called with key={key!r}")
        return super().__getitem__(key)

# Test 1: Direct eval with dict subclass as globals and locals
print("=== Test 1: eval('CompositeOperation', globals=MyDict(), locals=MyDict()) ===")
g = MyDict()
l = MyDict()
try:
    result = eval("CompositeOperation", g, l)
    print(f"  Result: {result}")
except Exception as e:
    print(f"  Error: {type(e).__name__}: {e}")

print()
print("=== Test 2: eval('CompositeOperation', globals=MyDict(globals()), locals=MyDict(globals())) ===")
g2 = MyDict(globals())
l2 = MyDict(globals())
try:
    result = eval("CompositeOperation", g2, l2)
    print(f"  Result: {result}")
except Exception as e:
    print(f"  Error: {type(e).__name__}: {e}")

print()
print("=== Test 3: Simple dict lookup with __missing__ ===")
d = MyDict()
try:
    result = d["CompositeOperation"]
    print(f"  Result: {result}")
except Exception as e:
    print(f"  Error: {type(e).__name__}: {e}")
