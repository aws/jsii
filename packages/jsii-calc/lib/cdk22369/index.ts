/**
 * Test case for failing dotnet error serialization that occurs when
 * and error is thrown during struct instantiation
 *
 * See https://github.com/aws/aws-cdk/issues/22369
 */
import * as fs from 'fs';
import * as path from 'path';

export interface AcceptsPathProps {
  /**
   * A path that doesn't exist
   */
  readonly sourcePath: string;
}

export class AcceptsPath {
  private readonly sourcePath: string;
  public constructor(props: AcceptsPathProps) {
    this.sourcePath = path.resolve(props.sourcePath);
    if (!fs.existsSync(this.sourcePath)) {
      throw new Error(`Cannot find asset`);
    }
  }
}
