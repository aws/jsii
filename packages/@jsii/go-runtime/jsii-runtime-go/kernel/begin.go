package kernel

import "github.com/aws/jsii-runtime-go/api"

type BeginRequest struct {
	kernelRequester

	API       string        `json:"api"`
	Method    *string       `json:"method"`
	Arguments []interface{} `json:"args"`
	ObjRef    api.ObjectRef `json:"objref"`
}

type BeginResponse struct {
	kernelResponder

	PromiseID *string `json:"promise_id"`
}

func (c *client) Begin(request BeginRequest) (response BeginResponse, err error) {
	err = c.request(request, &response)
	return
}
