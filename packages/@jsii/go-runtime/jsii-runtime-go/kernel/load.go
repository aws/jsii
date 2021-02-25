package kernel

// LoadRequest holds the necessary information to load a library into the
// @jsii/kernel process through the Load method.
type LoadRequest struct {
	kernelRequester

	API     string `json:"api"`
	Name    string `json:"name"`
	Version string `json:"version"`
	Tarball string `json:"tarball"`
}

// LoadResponse contains the data returned by the @jsii/kernel process in
// response to a load request.
type LoadResponse struct {
	kernelResponder

	Assembly string  `json:"assembly"`
	Types    float64 `json:"types"`
}

func (c *client) Load(request LoadRequest) (response LoadResponse, err error) {
	err = c.request(request, &response)
	return
}

// UnmarshalJSON provides custom unmarshalling implementation for response
// structs. Creating new types is required in order to avoid infinite recursion.
func (r *LoadResponse) UnmarshalJSON(data []byte) error {
	type response LoadResponse
	return unmarshalKernelResponse(data, (*response)(r))
}
