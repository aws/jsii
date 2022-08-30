import * as path from 'path';

const version = require('../package.json').version;

export const maven = {
    groupId: 'software.amazon.jsii',
    artifactId: 'jsii-runtime',
    version: version === '0.0.0' ? '0.0.0-SNAPSHOT' : version.replace(/\+.+$/, ''),
};

export const repository = path.resolve(__dirname, '../maven-repo');
