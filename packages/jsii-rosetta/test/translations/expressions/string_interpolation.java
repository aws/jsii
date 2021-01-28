String x = "world";
String y = "well";
System.out.println(String.format("Hello, %s, it works %s!", x, y));

// And now a multi-line expression
System.out.println(String.format("%nHello, %s.%n%nIt works %s!%n", x, y));
