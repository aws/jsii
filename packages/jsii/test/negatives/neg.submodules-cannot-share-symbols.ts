///!MATCH_ERROR: Symbol is re-exported under two distinct namespaces (ns1 and ns2)

export * as ns1 from './namespaced';
export * as ns2 from './namespaced';
