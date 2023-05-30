/**
 * Here's the first line of the TSDoc comment.
 *
 * This is the meat of the TSDoc comment. It may contain
 * multiple lines and multiple paragraphs.
 *
 * Multiple paragraphs are separated by an empty line.
 *
 * @example
 * const x = 12 + 44;
 * const s1 = "string";
 * const s2 = "string \nwith new newlines"; // see https://github.com/aws/jsii/issues/2569
 * const s3 = `string
 *             with
 *             new lines`;
 * @stable
 */
export class DocumentedClass {
  /**
   * Greet the indicated person.
   *
   * This will print out a friendly greeting intended for the indicated person.
   *
   * @param greetee The person to be greeted.
   * @returns A number that everyone knows very well and represents the answer
   * to the ultimate question
   */
  public greet(greetee: Greetee = {}): number {
    process.stdout.write(`Hello, ${greetee.name ?? 'world'}\n`);
    return 42;
  }

  /**
   * Say ¡Hola!
   *
   * @experimental
   */
  public hola(): void {
    process.stdout.write('bonjour');
  }
}

/**
 * These are some arguments you can pass to a method.
 */
export interface Greetee {
  /**
   * The name of the greetee
   *
   * @default world
   */
  readonly name?: string;
}

/**
 * Old class
 *
 * @deprecated Use the new class or the old class whatever you want because
 * whatever you like is always the best
 */
export class Old {
  /**
   * Doo wop that thing
   */
  public doAThing(): void {
    // Nothing to do
  }
}

/**
 * > Don't use this interface
 * An interface that shouldn't be used, with the annotation in a weird place.
 */
export interface DontUseMe {
  /**
   * > Don't set this parameter
   *
   * A parameter that shouldn't be set, with the annotation in a weird place.
   */
  readonly dontSetMe?: string;
}

/**
 * > Don't use this class.
 *
 * A class that shouldn't be used, with the annotation in a weird place.
 */
export class WeirdDocs {
  /**
   * > Don't read this property
   *
   * A property that shouldn't be read, with the annotation in a weird place.
   */
  public dontReadMe?: string;
}
