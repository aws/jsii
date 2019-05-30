export function convertPropertyName(original: string) {
    if (isInvalidName(original)) {
        throw new Error(`Invalid property name: ${original}`);
    }
    return capitalizeWord(original);
}

export function convertTypeName(original: string) {
    if (isInvalidName(original)) {
        throw new Error(`Invalid type name: ${original}`);
    }
    // Slugify the type name
    original = slugify(original);
    return capitalizeWord(original);
}

export function convertMethodName(original: string) {
    if (isInvalidName(original)) {
        throw new Error(`Invalid method name: ${original}`);
    }
    return capitalizeWord(original);
}

export function convertEnumMemberName(original: string) {
    if (isInvalidName(original)) {
        throw new Error(`Invalid enum member name: ${original}`);
    }
    return capitalizeWord(original);
}

export function convertParameterName(original: string) {
    if (isInvalidName(original)) {
        throw new Error(`Invalid parameter name: ${original}`);
    }
    return escapeKeyWord(original);
}

export function convertInterfaceName(original: string) {
    if (isInvalidName(original)) {
        throw new Error(`Invalid interface name: ${original}`);
    }
    // TODO: see what's the best way to handle the I
    // If the interface starts with an I, just capitalizeWord, otherwise add an I?
    const capitalizedName = capitalizeWord(original);
    /*if (capitalizedName.charAt(0) === 'I') {
        return capitalizedName;
    } else {
        return 'I' + capitalizedName;
    }*/
    return 'I' + capitalizedName;
}

export function convertClassName(original: string, shouldSlugify: boolean = true) {
    if (isInvalidName(original)) {
        throw new Error(`Invalid class name: ${original}`);
    }
    if (shouldSlugify) {
        // Slugify the class name
        original = slugify(original);
    }
    return capitalizeWord(original);
}

export function convertPackageName(original: string) {
    if (isInvalidName(original)) {
        throw new Error(`Invalid package name: ${original}`);
    }
    const name = original.split("-").map((s: string) => capitalizeWord(s)).join(".");
    return name;
}

export function capitalizeWord(original: string) {
    return original.charAt(0).toUpperCase() + original.slice(1);
}

// TODO: Add EscapeKeyword

// https://github.com/awslabs/jsii/blob/30c4d8e56c92c1277724c753f0c67bb94abc7e18/
// packages/jsii-dotnet-generator/src/Amazon.JSII.Generator/NameUtils.cs#L86

export function escapeKeyWord(original: string) {
    // TODO: implement this
    return original.charAt(0).toUpperCase() + original.slice(1);
}

/* We only want valid names for members */
function isInvalidName(str: string) {
    // Can not be empty, or contains $
    // Can only start with a letter or an underscore
    return str === null || str.match(/^\s*$/) !== null || str.indexOf('$') >= 0 || !str.match(/^[A-Za-z_]/);
}

export function slugify(name: string): string {
    if (!name) {
        return name;
    }
    if (RESERVED_KEYWORDS.includes(name.toLowerCase())) {
        return `${name}_`;
    } else {
        return name;
    }
}

// Pulled from https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/
const RESERVED_KEYWORDS = [
    // For some reason the old generator does not slugify the keyword base?
    'abstract', 'as', /*'base',*/ 'bool', 'break', 'byte', 'case', 'catch', 'char', 'checked', 'class',
    'const', 'continue', 'decimal', 'default', 'delegate', 'double', 'do', 'else', 'enum', 'event', 'explicit',
    'extern', 'false', 'finally', 'fixed', 'float', 'for', 'foreach', 'goto', 'if', 'implicit', 'in',
    'int', 'interface', 'internal', 'is', 'lock', 'long', 'namespace', 'new', 'null', 'object', 'operator', 'out',
    'override', 'params', 'private', 'protected', 'public', 'readonly', 'ref', 'return', 'sbyte', 'sealed', 'short',
    'sizeof', 'stackalloc', 'static', 'string', 'struct', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'uint',
    'ulong', 'unchecked', 'unsafe', 'ushort', 'using', 'value', 'virtual', 'void', 'volatile', 'while'
];