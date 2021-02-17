package kernel

import "github.com/aws/jsii-runtime-go/api"

type CreateRequest struct {
	kernelRequester

	API        string         `json:"api"`
	FQN        api.FQN        `json:"fqn"`
	Interfaces []api.FQN      `json:"interfaces"`
	Arguments  []interface{}  `json:"args"`
	Overrides  []api.Override `json:"overrides"`
}

// TODO extends AnnotatedObjRef?
type CreateResponse struct {
	kernelResponder

	InstanceID string `json:"$jsii.byref"`
}

func (c *client) Create(request CreateRequest) (response CreateResponse, err error) {
	err = c.request(request, &response)
	return
}

// UnmarshalJSON provides custom unmarshalling implementation for response
// structs. Creating new types is required in order to avoid infinite recursion.
func (r *CreateResponse) UnmarshalJSON(data []byte) error {
	type response CreateResponse
	return unmarshalKernelResponse(data, (*response)(r))
}
