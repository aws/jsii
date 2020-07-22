import { KwargsProps } from './child';

/**
 * Ensures imports are correctly registered for kwargs lifted properties from
 * super-structs.
 */
export class Kwargs {
  public static method(props?: KwargsProps): boolean {
    return !!props;
  }

  private constructor() {}
}
