import logging = require('../../logging');
// TODO: see if we can use the codemaker.ts convertsStringToCamelCase() directly

export function convertPropertyName(original: string) {
    if (isValidName(original)) {
        throw new Error(`Invalid property name: ${original}`);
    }
    return capitalizeWord(original);
}

export function convertTypeName(original: string) {
    if (isValidName(original)) {
        throw new Error(`Invalid type name: ${original}`);
    }
    return capitalizeWord(original);
}

export function convertMethodName(original: string) {
    if (isValidName(original)) {
        throw new Error(`Invalid method name: ${original}`);
    }
    return capitalizeWord(original);
}

export function convertEnumMemberName(original: string) {
    if (isValidName(original)) {
        throw new Error(`Invalid enum member name: ${original}`);
    }
    return capitalizeWord(original);
}

export function convertParameterName(original: string) {
    if (isValidName(original)) {
        throw new Error(`Invalid parameter name: ${original}`);
    }
    return escapeKeyWord(original);
}

export function convertInterfaceName(original: string) {
    if (isValidName(original)) {
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

export function convertClassName(original: string) {
    if (isValidName(original)) {
        throw new Error(`Invalid class name: ${original}`);
    }
    return capitalizeWord(original);
}

export function convertPackageName(original: string) {
    if (isValidName(original)) {
        throw new Error(`Invalid package name: ${original}`);
    }
    const name = original.split("-").map((s: string) => capitalizeWord(s)).join(".");
    logging.debug(`hamzaad name: ${name}`);
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
function isValidName(str: string) {
    return str === null || str.match(/^\s*$/) !== null || str.indexOf('$') >= 0;
}