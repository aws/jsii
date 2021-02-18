package kernel

import "github.com/aws/jsii-runtime-go/api"

type DelRequest struct {
	kernelRequester

	API    string        `json:"api"`
	ObjRef api.ObjectRef `json:"objref"`
}

type DelResponse struct {
	kernelResponder
}

func (c *client) Del(request DelRequest) (response DelResponse, err error) {
	err = c.request(request, &response)
	return
}
