import assert = require('assert');
import fs = require('fs-extra');
import spec = require('./spec');

/**
 * Loads a JSII assembly from a specified file.
 *
 * @param path the path to the file that should be loaded.
 *
 * @returns the loaded and validated assembly.
 *
 * @throws if the file does not contain a valid assembly.
 */
export async function loadAssembly(path: string): Promise<spec.Assembly> {
    if (!await fs.pathExists(path)) {
        throw new Error(`Assembly file not found (path: ${path})`);
    }
    try {
        const raw = await fs.readJson(path);
        return validateAssembly(raw);
    } catch (e) {
        throw new Error(`Invalid assembly at ${path}: ${e.message}`);
    }
}

function validateAssembly(raw: any): spec.Assembly {
    const assm = raw as spec.Assembly;
    assert.equal(assm.schema, spec.SchemaVersion.V1_0, `Assembly version is invalid (${assm.schema}, but expected ${spec.SchemaVersion.V1_0})`);
    assert.ok(assm.name, 'Assembly name is missing or blank');
    assert.ok(assm.version, 'Assembly version is missing or blank');
    assert.ok(assm.fingerprint, 'Assembly fingerprint is missing or blank');

    assert.notEqual(assm.targets, null, 'Assembly does not have targets');
    assert.equal(typeof assm.targets, 'object', 'Assembly targets is not an object');

    assert.notEqual(assm.types, null, 'Assembly does not have types');
    assert.equal(typeof assm.types, 'object', 'Assembly types is not an object');
    validateTypes(assm.types);

    if (assm.externals) {
        validateTypes(assm.externals);
    }

    return assm;
}

function validateTypes(types: { [fqn: string]: spec.Type }) {
    assert.notDeepEqual(types, {}, 'Assembly declares no types');
    for (const fqn of Object.keys(types)) {
        const type = types[fqn];
        assert.equal(type.fqn, fqn, `Type at ${fqn} declares a different fqn ${type.fqn}`);
        assert.equal(type.name, fqn.replace(/^.+\.([^.]+)/, '$1'), `Type at ${fqn} declares name ${type.name} that doesn't match fqn.`);
        assert.ok(type.module, `Type at ${fqn} does not declare a module`);
        assert.ok(validKind(type.kind), `Type at ${fqn} has invalid kind ${type.kind}`);
    }
}

function validKind(kind: string): boolean {
    return kind === spec.TypeKind.Class
        || kind === spec.TypeKind.Enum
        || kind === spec.TypeKind.Interface;
}
