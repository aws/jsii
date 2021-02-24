package kernel

import (
	"encoding/json"
	"errors"
)

// Custom unmarshaling for kernel responses, checks for presence of `error` key on json and returns if present
func unmarshalKernelResponse(data []byte, result interface{}) error {
	datacopy := make([]byte, len(data))
	copy(datacopy, data)

	var response map[string]json.RawMessage
	if err := json.Unmarshal(datacopy, &response); err != nil {
		return err
	}

	if err, ok := response["error"]; ok {
		return errors.New(string(err))
	}

	return json.Unmarshal(response["ok"], result)
}
