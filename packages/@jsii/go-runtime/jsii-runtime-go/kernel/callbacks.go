package kernel

import "github.com/aws/jsii-runtime-go/api"

type callbacksRequest struct {
	kernelRequester

	API string `json:"api"`
}

type CallbacksResponse struct {
	kernelResponder

	Callbacks []api.Callback `json:"callbacks"`
}

func (c *client) Callbacks() (response CallbacksResponse, err error) {
	err = c.request(callbacksRequest{API: "callbacks"}, &response)
	return
}
