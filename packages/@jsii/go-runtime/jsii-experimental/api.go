package jsii

import (
	"encoding/json"
	"errors"
)

// JSII Kernel API
// Requests
type LoadRequest struct {
	Api     string `json:"api"`
	Name    string `json:"name"`
	Version string `json:"version"`
	Tarball string `json:"tarball"`
}

// Responses
type InitOkResponse struct {
	Hello string `json:"hello"`
}

type LoadResponse struct {
	Assembly string  `json:"assembly"`
	Types    float64 `json:"types"`
}

func (r *LoadResponse) UnmarshalJSON(data []byte) error {
	return unmarshalKernelResponse(data, r)
}

// Custom unmarshaling for kernel responses, checks for presence of `error` key on json and returns if present
func unmarshalKernelResponse(data []byte, resstruct interface{}) error {
	datacopy := make([]byte, len(data))
	copy(datacopy, data)

	var response map[string]json.RawMessage
	if err := json.Unmarshal(datacopy, &response); err != nil {
		return err
	}

	if errmessage, ok := response["error"]; ok {
		return errors.New(string(errmessage))
	}

	return json.Unmarshal(data, resstruct)
}
