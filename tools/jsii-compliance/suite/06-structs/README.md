# Structs & Keyword Arguments

Tests in this category ensure that structs (data types) cross the boundary by value as plain, undecorated data, that
unset optional properties are omitted, that inherited and union-typed properties behave correctly, and that struct
values compare (and, where the host supports it, hash) by content. They also cover how a struct is passed alongside a
positional argument of the same name, and the conventions a host offers for constructing structs idiomatically.
