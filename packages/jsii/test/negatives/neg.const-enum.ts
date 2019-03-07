///!MATCH_ERROR: Exported enum cannot be declared 'const'

export const enum NotAllowed {
  ThisEnum,
  GetsInlined,
  AndSoItGetsLost,
  ForJsii
}