import * as path from 'path';

export const maven = {
    groupId: 'software.amazon.jsii',
    artifactId: 'jsii-runtime',
    version: require('../package.json').version.replace(/\+.+$/, '')
};

export const repository = path.resolve(__dirname, '../maven-repo');
