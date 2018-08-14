import ts = require('typescript');

/**
 * An object that is capable of emitting stuff.
 */
export interface Emitter {
    /**
     * Attempts to emit stuff.
     *
     * @return the result of attempting to emit stuff.
     */
    emit(): Promise<EmitResult>;
}

/**
 * The result of attempting to emit stuff.
 */
export interface EmitResult {
    /** Whether the emit was skipped as a result of errors (found in ``diagnostics``) */
    emitSkipped: boolean;

    /** Diagnostic information created when trying to emit stuff */
    diagnostics: ReadonlyArray<ts.Diagnostic | Diagnostic>;
}

/**
 * A diagnostic message generated while trying to emit stuff.
 */
export interface Diagnostic extends ts.Diagnostic {
    /**
     * The domain of the diagnostic message.
     */
    domain: string;
}

/**
 * Determines if a diagnostic entry has an attached domain or not.
 *
 * @param diagnostic the entity to be assessed
 *
 * @returns ``true`` if ``diagnostic`` has a domain.
 */
export function hasDomain(diagnostic: ts.Diagnostic | Diagnostic): diagnostic is Diagnostic {
    return !!(diagnostic as Diagnostic).domain;
}
