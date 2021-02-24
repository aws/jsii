package kernel

type NamingRequest struct {
	kernelRequester

	API      string `json:"api"`
	Assembly string `json:"assembly"`
}

type NamingResponse struct {
	kernelResponder
	// readonly naming: {
	//   readonly [language: string]: { readonly [key: string]: any } | undefined;
	// };
}

func (c *client) Naming(request NamingRequest) (response NamingResponse, err error) {
	err = c.request(request, &response)
	return
}
