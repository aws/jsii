// NoOp module stubs out runtime functionality during development
// TODO: Delete once runtime client is complete and functional
package jsii

import (
	"fmt"
)

type NoOpApiRequest struct {
	Class  string
	Method string
	Args   []string
}

func NoOpRequest(req NoOpApiRequest) {
	fmt.Println(req)
}
