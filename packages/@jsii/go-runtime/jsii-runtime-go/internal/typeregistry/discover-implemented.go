package typeregistry

import (
	"reflect"

	"github.com/aws/jsii-runtime-go/internal/api"
)

// DiscoverImplementation determines the list of registered interfaces that are
// implemented by the provided type, and returns the list of their FQNs and
// overrides for all their combined methods and properties.
func (t *TypeRegistry) DiscoverImplementation(vt reflect.Type) (interfaces []api.FQN, overrides []api.Override) {
	registeredOverrides := make(map[string]bool)

	for fqn, members := range t.typeMembers {
		iface := t.fqnToType[fqn]
		if iface.Kind == classType || !vt.AssignableTo(iface.Type) {
			continue
		}
		// Found a hit, registering it's FQN in the list!
		interfaces = append(interfaces, fqn)

		// Now, collecting all members thereof
		for _, override := range members {
			var identifier string
			if api.IsMethodOverride(override) {
				identifier = override.(api.MethodOverride).GoMethod
			} else {
				identifier = override.(api.PropertyOverride).GoGetter
			}
			if !registeredOverrides[identifier] {
				registeredOverrides[identifier] = true
				overrides = append(overrides, override)
			}
		}
	}

	return
}
