public void foo(String x) {
    foo(x, "hello");
}

public void foo(String x, String y) {
    foo(x, y, null);
}

public void foo(String x, String y, String z) {
    System.out.println(x + y + z);
}
