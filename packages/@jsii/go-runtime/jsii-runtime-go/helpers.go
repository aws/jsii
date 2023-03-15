package jsii

import "time"

type Type interface {
	bool | string | float64 | time.Time
}

func V[T Type](v T) *T {
	return &v
}

func Slice[T Type](v ...T) *[]*T {
	slice := make([]*T, len(v))
	for i := 0; i < len(v); i++ {
		slice[i] = V(v[i])
	}
	return &slice
}

// Bool obtains a pointer to the provided bool.
func Bool(v bool) *bool { return &v }

// Bools obtains a pointer to a slice of pointers to all the provided booleans.
func Bools(v ...bool) *[]*bool {
	return Slice(v...)
}

type numberType interface {
	~float32 | ~float64 |
		~int | ~int8 | ~int16 | ~int32 | ~int64 |
		~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 | ~uintptr
}

// Number obtains a pointer to the provided float64.
func Number[T numberType](v T) *float64 {
	var n float64
	n = float64(v)
	return &n
}

// Numbers obtains a pointer to a slice of pointers to all the provided numbers.
func Numbers[T numberType](v ...T) *[]*float64 {
	slice := make([]*float64, len(v))
	for i := 0; i < len(v); i++ {
		slice[i] = Number(v[i])
	}
	return &slice
}

// String obtains a pointer to the provided string.
func String(v string) *string { return &v }

// Strings obtains a pointer to a slice of pointers to all the provided strings.
func Strings(v ...string) *[]*string {
	return Slice(v...)
}

// Time obtains a pointer to the provided time.Time.
func Time(v time.Time) *time.Time { return &v }

// Times obtains a pointer to a slice of pointers to all the provided time.Time.
func Times(v ...time.Time) *[]*time.Time {
	return Slice(v...)
}
