package kernel

import (
	"github.com/aws/jsii-runtime-go/api"
)

type CallbacksResponse struct {
	kernelResponse
	Callbacks []api.Callback `json:"callbacks"`
}

func (c *client) Callbacks() (response CallbacksResponse, err error) {
	err = c.request(kernelRequest{"callbacks"}, &response)
	return
}
