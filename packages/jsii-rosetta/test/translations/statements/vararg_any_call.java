public void test(Object... _args) {
}

test(Map.of("Key", "Value", "also", 1337));

test(Map.of("Key", "Value"), Map.of("also", 1337));
