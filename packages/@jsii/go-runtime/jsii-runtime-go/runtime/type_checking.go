package runtime

import "errors"

// ValidateStruct runs validations on the supplied struct to determine whether
// it is valid. In particular, it checks union-typed properties to ensure the
// provided value is of one of the allowed types.
func ValidateStruct(v interface{}) error {
	return errors.New("Not Implemented")
}
