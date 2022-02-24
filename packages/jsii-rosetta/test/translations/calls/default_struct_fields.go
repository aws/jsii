type struct_ struct {
	x *string
	y *string
}
func foo(s *struct_) {
	fmt.Println(*s.x, *s.y)
}
