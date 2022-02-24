func test(..._args interface{}) {
}

test(map[string]interface{}{
	"Key": jsii.String("Value"),
	"also": jsii.Number(1337),
})

test(map[string]*string{
	"Key": jsii.String("Value"),
}, map[string]*f64{
	"also": jsii.Number(1337),
})
