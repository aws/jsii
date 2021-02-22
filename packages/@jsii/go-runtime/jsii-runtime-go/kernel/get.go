package kernel

import "github.com/aws/jsii-runtime-go/api"

type GetRequest struct {
	kernelRequester

	API      string        `json:"api"`
	Property string        `json:"property"`
	ObjRef   api.ObjectRef `json:"objref"`
}

type StaticGetRequest struct {
	kernelRequester

	API      string  `json:"api"`
	FQN      api.FQN `json:"fqn"`
	Property string  `json:"property"`
}

type GetResponse struct {
	kernelResponder

	Value interface{} `json:"value"`
}

func (c *client) Get(request GetRequest) (response GetResponse, err error) {
	err = c.request(request, &response)
	return
}

func (c *client) SGet(request StaticGetRequest) (response GetResponse, err error) {
	err = c.request(request, &response)
	return
}

// UnmarshalJSON provides custom unmarshalling implementation for response
// structs. Creating new types is required in order to avoid infinite recursion.
func (r *GetResponse) UnmarshalJSON(data []byte) error {
	type response GetResponse
	return unmarshalKernelResponse(data, (*response)(r))
}
