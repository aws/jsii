import path = require('path');

export const maven = {
    groupId: 'com.amazonaws',
    artifactId: 'jsii-runtime',
    version: require('../package.json').version.replace(/\+.+$/, '')
};

export const repository = path.resolve(__dirname, '../maven-repo');
