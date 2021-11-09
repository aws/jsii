import { UnexportedProps } from './_unexported';

export class ExportedClass {
  public readonly name: string;

  public constructor(props: UnexportedProps) {
    this.name = props.name;
  }
}
