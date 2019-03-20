///!MATCH_ERROR: The property 'notOkay' in data type 'DataType' must be 'readonly' since data is passed by-value

export interface DataType {
  readonly okay: string;
  notOkay: number; // properties should be "readonly"
}
