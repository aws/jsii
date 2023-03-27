package jsii

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestV(t *testing.T) {
	// Bool
	assert.Equal(t, true, *Ptr(true))
	assert.Equal(t, false, *Ptr(false))
	// Bools
	assert.Equal(t, []*bool{Bool(true), Bool(false), Bool(false), Bool(true)}, *PtrSlice(true, false, false, true))
	// Float64 is supported because it doesn't require conversion.
	assert.Equal(t, 123.45, *Ptr(123.45))
	assert.Equal(t, float64(123.45), *Ptr(float64(123.45)))
	// String
	assert.Equal(t, "Hello", *String("Hello"))
	// Strings
	assert.Equal(t, []*string{String("Hello"), String("World")}, *Strings("Hello", "World"))
	// Time
	now := time.Now()
	assert.Equal(t, now, *Time(now))
	// Times
	assert.Equal(t, []*time.Time{Time(now)}, *Times(now))
}

func TestBool(t *testing.T) {
	assert.Equal(t, true, *Bool(true))
	assert.Equal(t, false, *Bool(false))
}

func TestBools(t *testing.T) {
	assert.Equal(t, []*bool{Bool(true), Bool(false), Bool(false), Bool(true)}, *Bools(true, false, false, true))
}

func TestNumber(t *testing.T) {
	assert.Equal(t, 123.45, *Number(123.45))
	assert.Equal(t, 1337.0, *Number(1337))
	// Floats.
	assert.Equal(t, float64(float32(123.45)), *Number(float32(123.45)))
	assert.Equal(t, float64(123.45), *Number(float64(123.45)))
	// Ints.
	assert.Equal(t, float64(1337), *Number(int(1337)))
	// Signed.
	assert.Equal(t, float64(127), *Number(int8(127)))
	assert.Equal(t, float64(1337), *Number(int16(1337)))
	assert.Equal(t, float64(1337), *Number(int32(1337)))
	assert.Equal(t, float64(1337), *Number(int64(1337)))
	// Unsigned.
	assert.Equal(t, float64(127), *Number(uint8(127)))
	assert.Equal(t, float64(1337), *Number(uint16(1337)))
	assert.Equal(t, float64(1337), *Number(uint32(1337)))
	assert.Equal(t, float64(1337), *Number(uint64(1337)))
}

func TestNumbers(t *testing.T) {
	assert.Equal(t, []*float64{Number(42), Number(1337)}, *Numbers(42, 1337))
}

func TestString(t *testing.T) {
	assert.Equal(t, "Hello", *String("Hello"))
}

func TestStrings(t *testing.T) {
	assert.Equal(t, []*string{String("Hello"), String("World")}, *Strings("Hello", "World"))
}

func TestTime(t *testing.T) {
	now := time.Now()
	assert.Equal(t, now, *Time(now))
}

func TestTimes(t *testing.T) {
	now := time.Now()
	assert.Equal(t, []*time.Time{Time(now)}, *Times(now))
}
