package jsii

// JSII Kernel API

// Requests
type LoadRequest struct {
	Name    string
	Version string
	Tarball string
}

// Responses
type InitOkResponse struct {
	Hello string
}

type LoadResponse struct {
	Assembly string
	Types    float64
}
