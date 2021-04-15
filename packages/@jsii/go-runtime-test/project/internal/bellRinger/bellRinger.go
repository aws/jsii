package bellRinger

import "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"

func New() jsiicalc.IBellRinger {
	return &ringer{}
}

type ringer struct{}

func (r *ringer) YourTurn(bell jsiicalc.IBell) {
	bell.Ring()
}
