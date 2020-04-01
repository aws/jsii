///!MATCH_ERROR: Submodule namespaces must be camelCased or snake_cased. Consider renaming to "ns1"

export * as Ns1 from './namespaced';
