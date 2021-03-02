package embedded

import (
	"path"
	"testing"
)

func TestEntryPointExists(t *testing.T) {
	if bytes, err := embeddedFS.ReadFile(path.Join(embeddedRootDir, entrypointName)); err != nil {
		t.Errorf("unable to read entry point data: %v", err)
	} else if len(bytes) == 0 {
		t.Error("entry point file is empty")
	}

}
