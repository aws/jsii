package kernel

type EndProps struct {
	PromiseID string `json:"promiseid"`
}

type EndResponse struct {
	kernelResponse
	Result interface{} `json:"result"`
}

// End waits for an asynchronous method call to settle and returns its result.
func (c *Client) End(props EndProps) (response EndResponse, err error) {
	type request struct {
		kernelRequest
		EndProps
	}
	err = c.request(request{kernelRequest{"end"}, props}, &response)
	return
}

// UnmarshalJSON provides custom unmarshalling implementation for response
// structs. Creating new types is required in order to avoid infinite recursion.
func (r *EndResponse) UnmarshalJSON(data []byte) error {
	type response EndResponse
	return unmarshalKernelResponse(data, (*response)(r), r)
}
