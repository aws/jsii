/*
 * This command takes a set of JSII module files as it's argument, and outputs
 * the same file names after having topologically sorted them according to their
 * declared dependencies.
 */

const fs = require('fs');

const modules = {};

for (const file of process.argv.slice(2)) {
    const module = JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    modules[module.name] = {
        file,
        dependsOn: Object.keys(module.dependencies || {})
    };
}

let sorted = [];
const roots = Object.keys(modules).filter(name => modules[name].dependsOn.length === 0);
while (roots.length != 0) {
    const root = roots.pop();
    sorted = sorted.concat(modules[root].file);
    delete modules[root];
    for (const name of Object.keys(modules)) {
        const node = modules[name];
        node.dependsOn = node.dependsOn.filter(n => n !== root);
        if (node.dependsOn.length === 0) {
            roots.push(name);
        }
    }
}

if (Object.keys(modules).length > 0) {
    console.error(`There seems to be a cycle in the graph: ${JSON.stringify(modules, null, 2)}`);
    exit(-1);
}

for (const file of sorted) {
    console.log(file);
}
