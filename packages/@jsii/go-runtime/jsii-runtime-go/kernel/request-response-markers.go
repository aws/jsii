package kernel

// kernelRequest allows creating a union of kernelRequest and kernelResponse
// types by defining private method implemented by a private custom type, which
// is embedded in all relevant types.
type kernelRequest interface {
	// isRequest is a marker method that is intended to ensure no external type
	// can implement this interface.
	isRequest() kernelBrand
}

// kernelRequester is a 0-width marker struct embedded to make another type be
// usable as a kernelRequest.
type kernelRequester struct{}

func (r kernelRequester) isRequest() kernelBrand {
	return kernelBrand{}
}

// kenrelResponse allows creating a union of kernelResponse and kernelRequest
// types by defining private method implemented by a private custom type, which
// is embedded in all relevant types.
type kernelResponse interface {
	// isResponse is a marker method that is intended to ensure no external type
	// can implement this interface.
	isResponse() kernelBrand
}

// kernelResponder is a 0-width marker struc tembedded to make another type be
// usable as a kernelResponse.
type kernelResponder struct{}

func (r kernelResponder) isResponse() kernelBrand {
	return kernelBrand{}
}

// kernelBrand is a private type used to ensure the kernelRequest and
// kernelResponse cannot be implemented outside of this package.
type kernelBrand struct{}
