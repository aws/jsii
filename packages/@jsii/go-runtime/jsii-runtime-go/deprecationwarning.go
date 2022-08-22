//go:build (go1.16 || go1.17) && !go1.18
// +build go1.16 go1.17
// +build !go1.18

package jsii

import (
	"fmt"

	"github.com/aws/jsii-runtime-go/internal/compiler"
)

// / Emits a deprecation warning message when
func init() {
	fmt.Println("###########################################################")
	fmt.Printf("# This binary was compiled with %v, which has reached #\n", compiler.Version)
	fmt.Printf("# end-of-life on %v.                              #", compiler.EndOfLifeDate)
	fmt.Println("# Support for this version will be dropped in the future. #")
	fmt.Println("#                                                         #")
	fmt.Println("# See https://go.dev/security for more information.       #")
	fmt.Println("###########################################################")
}
