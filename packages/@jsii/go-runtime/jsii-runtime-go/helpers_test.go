package jsii

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

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
