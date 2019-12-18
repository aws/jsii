public void foo(int x, OuterStruct outer) {
}

foo(25, OuterStruct.builder().foo(3).deeper(DeeperStruct.builder()
        .a(1)
        .b(2)
        .build()).build());
