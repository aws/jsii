func foo(xs map[string]*string) {
}

foo(map[string]*string{
	"foo": jsii.String("bar"),
	"schmoo": jsii.String("schmar"),
})
