import log4js = require('log4js');
import ts = require('typescript');

/**
 * Obtains the relevant logger to be used for a given diagnostic message.
 *
 * @param logger     the ``log4js.Logger`` to use for emitting the message.
 * @param diagnostic the message for which a logger is requested.
 *
 * @returns a logger method of the ``logger`` for the appropriate level.
 */
export function diagnosticsLogger(logger: log4js.Logger, diagnostic: ts.Diagnostic): ((message: any, ...args: any[]) => void) | undefined {
    switch (diagnostic.category) {
    case ts.DiagnosticCategory.Error:
        if (!logger.isErrorEnabled()) { return undefined; }
        return logger.error.bind(logger);
    case ts.DiagnosticCategory.Warning:
        if (!logger.isWarnEnabled()) { return undefined; }
        return logger.warn.bind(logger);
    case ts.DiagnosticCategory.Message:
    case ts.DiagnosticCategory.Suggestion:
    default:
        if (!logger.isDebugEnabled()) { return undefined; }
        return logger.debug.bind(logger);
    }
}

/**
 * A filter function for ``JSON.stringify`` that removes:
 *  - ``false``-y values (``false``, empty strings, 0)
 *  - empty arrays
 *  - empty objects
 *
 * @param _key  the key of the key-value pair being filtered (not used).
 * @param value the value of the key-value pair being filtered.
 *
 * @returns ``value`` or ``undefined``
 */
export function filterEmpty(_key: string, value: any): any {
    if (!value) {
        return undefined;
    }
    if (Array.isArray(value) && value.length === 0) {
        return undefined;
    }
    if (typeof value === 'object' && Object.keys(value).length === 0) {
        return undefined;
    }
    return value;
}
