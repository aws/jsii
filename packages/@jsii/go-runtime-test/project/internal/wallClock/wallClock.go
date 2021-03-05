package wallClock

import (
	"github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
)

type WallClock struct {
	nowAsISO string
}

func NewWallClock(nowAsISO string) *WallClock {
	return &WallClock{nowAsISO}
}

func (w *WallClock) Iso8601Now() string {
	return w.nowAsISO
}

type Entropy struct {
	jsiicalc.Entropy `overrides:"Repeat"`
}

func NewEntropy(jsiicalc.IWallClock) *Entropy {
	e := &Entropy{}
	e.Entropy = e
	return e
}

func (e *Entropy) Repeat(word string) string {
	return word
}