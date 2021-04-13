package wallClock

import (
	"github.com/aws/jsii-runtime-go"
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
)

type WallClock struct {
	nowAsISO string
}

func NewWallClock(nowAsISO string) *WallClock {
	return &WallClock{nowAsISO}
}

func (w *WallClock) Iso8601Now() *string {
	return jsii.String(w.nowAsISO)
}

type Entropy struct {
	jsiicalc.Entropy
}

func NewEntropy(clock jsiicalc.IWallClock) *Entropy {
	e := &Entropy{}
	jsiicalc.NewEntropy_Override(e, clock)
	return e
}

func (e *Entropy) Repeat(word *string) *string {
	return word
}
