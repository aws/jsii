import * as fs from 'fs-extra';
import * as spec from 'jsii-spec';
import * as md5 from 'md5';
import * as path from 'path';
import { Generator } from '../generator';

type NamespaceStackEntry = { name: string, underClass: boolean };

// Those MUST match what M2R uses (which is hard-coded in M2R), otherwise
// .. mdinclude: markdown files will produce inconsistent rendering.
const HMARKS = ['=', '-', '^', '~', '"', '#'];

export default class SphinxDocsGenerator extends Generator {
    private assemblyName?: string;
    private readmeFile?: string;
    private namespaceStack = new Array<NamespaceStackEntry>();
    private tocPath = new Array<string>();

    private get topNamespace(): NamespaceStackEntry {
        return this.namespaceStack.length > 0
            ? this.namespaceStack[this.namespaceStack.length - 1]
            : { name: '', underClass: false };
    }

    constructor() {
        super({
            target: 'js',
            expandUnionProperties: false
        });

        this.code.openBlockFormatter = s => s || '';
        this.code.closeBlockFormatter = _ => '';
        this.code.indentation = 3;
    }

    public async upToDate(outDir: string): Promise<boolean> {
        const mainFile = path.join(outDir, `${fsSafeName(this.assembly.names.js)}.rst`);
        try {
            if (!await fs.pathExists(mainFile)) { return false; }
            const data = await fs.readFile(mainFile, { encoding: 'utf-8' });
            const matches = data.match(/^\.\. @jsii-pacmak:meta@ (.+)$/m);
            if (!matches) { return false; }
            const meta = JSON.parse(matches[1]);
            return meta.fingerprint === md5(JSON.stringify(this.assembly));
        } catch (e) {
            return false;
        }
    }

    //
    // Assembly

    protected getAssemblyOutputPath(_mod: spec.Assembly): string | undefined {
        return undefined;
    }

    protected onBeginAssembly(assm: spec.Assembly) {
        this.tocPath = new Array<string>(); // As a safety measure, in case previous assembly somehow didn't get it back to 0.
        if (assm.readme) {
            this.readmeFile = `_${fsSafeName(assm.names.js)}.README.md`;
            this.code.openFile(this.readmeFile);
            this.code.line(assm.readme.markdown);
            this.code.closeFile(this.readmeFile);
        }

        this.code.openFile(`${fsSafeName(assm.names.js)}.rst`);

        const meta = { fingerprint: md5(JSON.stringify(assm)) };
        this.code.line(`.. @jsii-pacmak:meta@ ${JSON.stringify(meta)}`);
        this.code.line();

        this.openSection(assm.names.js);
        this.code.line();

        this.assemblyName = assm.names.js;
    }

    protected onEndAssembly(assm: spec.Assembly) {
        this.closeSection();
        this.code.closeFile(`${fsSafeName(assm.names.js)}.rst`);

        delete this.readmeFile;
        delete this.assemblyName;
    }

    //
    // Namespaces

    protected onBeginNamespace(ns: string) {
        const nativeName = this.toNativeFqn(ns);

        this.namespaceStack.push({ name: nativeName, underClass: this.topNamespace.underClass });

        if (nativeName !== this.assemblyName) {
            const assemblyPrefix = `${this.assemblyName}.`;
            const conciseName = nativeName.startsWith(assemblyPrefix)
                            ? nativeName.slice(assemblyPrefix.length)
                            : nativeName;

            if (conciseName.indexOf('.') === -1) {
                this.code.line();
                this.openSection(conciseName);
            }
        } else {
            if (this.readmeFile) {
                this.code.line(`.. mdinclude:: ./${this.readmeFile}`);
                this.code.line();
            }
            this.openSection('Reference');
            this.code.line();
        }
        this.code.line(`.. py:module:: ${nativeName}`);
        this.code.line();
    }

    protected onEndNamespace(ns: string) {
        this.namespaceStack.pop();

        const nativeName = this.toNativeFqn(ns);
        if (nativeName !== this.assemblyName) {
            const assemblyPrefix = `${this.assemblyName}.`;
            const conciseName = nativeName.startsWith(assemblyPrefix)
                            ? nativeName.slice(assemblyPrefix.length)
                            : nativeName;

            if (conciseName.indexOf('.') === -1) {
                this.closeSection();
            }
        } else {
            this.closeSection();
        }

        // set current module to the one at the tip of the stack
        if (this.namespaceStack.length > 0) {
            const curr = this.namespaceStack[this.namespaceStack.length - 1];
            this.code.line();
            this.code.line(`.. py:currentmodule:: ${curr.name}`);
            this.code.line();
        }
    }

    //
    // Classes

    protected onBeginClass(cls: spec.ClassType, abstract: boolean) {
        const className = cls.name;

        if (!this.topNamespace.underClass) {
            this.openSection(className);
            this.code.line();
        }

        let sig = '';
        if (cls.initializer) {
            sig = this.renderMethodSignature(cls.initializer);
        }

        this.code.openBlock(`.. py:class:: ${className}${sig}`);
        this.renderDocsLine(cls);
        this.code.line();

        if (cls.base) {
            this.code.line(`:extends: ${this.renderTypeRef(cls.base).ref}`);
        }

        for (const ifc of cls.interfaces || []) {
            this.code.line(`:implements: ${this.renderTypeRef(ifc).ref}`);
        }

        if (abstract) {
            this.code.line(`:abstract: Yes`);
        }

        if (cls.initializer) {
            this.renderMethodParameters(cls.initializer);
        }

        this.namespaceStack.push({ name: className, underClass: true });
    }

    protected onEndClass(_cls: spec.ClassType) {
        this.code.closeBlock();
        this.namespaceStack.pop();
        if (!this.topNamespace.underClass) { this.closeSection(); }
    }

    //
    // Initializers (constructos)

    protected onInitializer(_cls: spec.ClassType, _method: spec.Method) {
        return;
    }

    protected onInitializerOverload(cls: spec.ClassType, overload: spec.Method, _originalInitializer: spec.Method) {
        this.onInitializer(cls, overload);
    }

    //
    // Properties

    protected onProperty(_cls: spec.ClassType, prop: spec.Property) {
        this.renderProperty(prop);
    }

    protected onStaticProperty(_cls: spec.ClassType, prop: spec.Property) {
        this.renderProperty(prop);
    }

    //
    // Union Properties
    // Those are properties that can accept more than a single type (i.e. String | Token). If the option `expandUnionProperties` is enabled
    // instead of onUnionProperty, the method onExpandedUnionProperty will be called for each of the types defined in the property.
    // `primaryName` indicates the original name of the union property (without the 'AsXxx' postfix).

    protected onUnionProperty(cls: spec.ClassType, prop: spec.Property, _union: spec.UnionTypeReference) {
        this.onProperty(cls, prop);
    }

    protected onExpandedUnionProperty(_cls: spec.ClassType, _prop: spec.Property, _primaryName: string) {
        throw new Error('Unexpected');
    }

    //
    // Methods
    // onMethodOverload is triggered if the option `generateOverloadsForMethodWithOptionals` is enabled for each overload of the original method.
    // The original method will be emitted via onMethod.

    protected onMethod(_cls: spec.ClassType, method: spec.Method) {
        this.renderMethod(method);
    }

    protected onMethodOverload(_cls: spec.ClassType, overload: spec.Method, _originalMethod: spec.Method) {
        this.renderMethod(overload);
    }

    protected onStaticMethod(_cls: spec.ClassType, method: spec.Method) {
        this.renderMethod(method);
    }

    protected onStaticMethodOverload(_cls: spec.ClassType, overload: spec.Method, _originalMethod: spec.Method) {
        this.renderMethod(overload);
    }

    //
    // Enums

    protected onBeginEnum(enm: spec.EnumType) {
        const enumName = enm.name;

        if (!this.topNamespace.underClass) {
            this.openSection(`${enumName} (enum)`);
            this.code.line();
        }

        this.code.openBlock(`.. py:class:: ${enumName}`);
        this.code.line();
    }

    protected onEndEnum(_enm: spec.EnumType) {
        this.code.closeBlock();
        if (!this.topNamespace.underClass) { this.closeSection(); }
    }

    protected onEnumMember(_enm: spec.EnumType, member: spec.EnumMember) {
        this.code.line(`.. py:data:: ${member.name}`);
        this.renderDocsLine(member);
        this.code.line();
    }

    protected onBeginInterface(ifc: spec.InterfaceType) {
        if (!this.topNamespace.underClass) {
            this.openSection(`${ifc.name} (interface)`);
            this.code.line();
        }

        this.code.openBlock(`.. py:class:: ${ifc.name}`);

        this.renderDocsLine(ifc);
        this.code.line();

        for (const base of ifc.interfaces || []) {
            this.code.line(`:extends: ${this.renderTypeRef(base).ref}`);
        }

        this.code.line();
    }

    protected onEndInterface(_ifc: spec.InterfaceType) {
        this.code.closeBlock();
        if (!this.topNamespace.underClass) { this.closeSection(); }
    }

    protected onInterfaceMethod(_ifc: spec.InterfaceType, method: spec.Method) {
        this.renderMethod(method);
    }

    protected onInterfaceMethodOverload(ifc: spec.InterfaceType, overload: spec.Method, _originalMethod: spec.Method) {
        this.onInterfaceMethod(ifc, overload);
    }

    protected onInterfaceProperty(_ifc: spec.InterfaceType, property: spec.Property) {
        this.renderProperty(property);
    }

    /**
     * Adds a title to the current code file, using the appropriate header
     * adornment given the current TOC depth. It will start using simple
     * underline adornment, and once all underline markers have been used,
     * over-and-underline adornments will be used. Increments the TOC depth
     * after having generated the title.
     *
     * @param title the text for the title line to be redenred.
     *
     * @throws if an attempt to render a title is made when all possible
     *         adornments have already been used once.
     */
    private openSection(title: string) {
        if (this.tocPath.length >= 2 * HMARKS.length) {
            throw new Error(`Unable to open a section ${this.tocPath.length + 1} levels deep. (${this.tocPath.join(' > ')})`);
        }
        const headerLine = dup(HMARKS[this.tocPath.length % HMARKS.length], title.length);
        if (this.tocPath.length >= HMARKS.length) {
            this.code.line(headerLine);
        }
        this.code.line(title);
        this.code.line(headerLine);

        this.tocPath.push(title);
    }

    /**
     * Closes a titled section, decrementing +this.tocDepth+.
     */
    private closeSection() {
        this.tocPath.pop();
    }

    private renderMethodSignature(method: spec.Method) {
        const params = method.parameters || [];
        let signature = '(';
        let signaturePosfix = '';

        params.forEach((p, idx) => {
            if (idx > 0) {
                signature += ', ';
            }

            if (p.type.optional) {
                signature += '[';
                signaturePosfix += ']';
            }
            if (p.variadic) {
                signature += '*';
            }

            signature += p.name;
        });

        signature += signaturePosfix;
        signature += ')';

        let retType;
        if (method.returns) {
            retType = this.renderTypeRef(method.returns!);
            const retSignature = method.returns ? ` -> ${retType.display}` : '';
            signature += retSignature;
        }

        return signature;
    }

    private renderMethodParameters(method: spec.Method) {
        const params = method.parameters || [];

        for (const p of params) {
            const ptype = this.renderTypeRef(p.type);
            const paramName = `${p.variadic ? '\\*' : ''}${p.name}`;
            this.code.line(`:param ${paramName}: ${this.renderDocs(p)}`);
            this.code.line(`:type ${paramName}: ${ptype.ref}`);
        }
    }

    private renderMethod(method: spec.Method) {
        const signature = this.renderMethodSignature(method);

        const type = method.static ? `py:staticmethod` : `py:method`;

        this.code.line();
        this.code.openBlock(`.. ${type}:: ${method.name}${signature}`);

        this.renderDocsLine(method);
        this.code.line();

        this.renderMethodParameters(method);

        // @returns doc
        if (method.docs && method.docs.returns) {
            this.code.line(`:return: ${method.docs.returns}`);
        }

        if (method.returns) {
            this.code.line(`:rtype: ${this.renderTypeRef(method.returns!).ref}`);
        }

        if (method.abstract) {
            this.code.line(`:abstract: Yes`);
        }

        this.code.closeBlock();
    }

    private renderDocsLine(element: spec.Documentable) {
        const doclines = this.renderDocs(element, false);
        if (doclines.length === 0) {
            return;
        }

        this.code.line();
        doclines.split('\n').forEach(line => this.code.line(line));

        if (element.docs.link) {
            this.code.line(element.docs.link);
        }

        this.code.line();
    }

    private renderDocs(element: spec.Documentable, newlines = false): string {
        if (!element.docs) {
            return '';
        }

        const lines = new Array<string>();
        if (element.docs.comment) {
            lines.push(element.docs.comment);
        }

        if (newlines) {
            return lines.join('\n');
        } else {
            return lines.join('. ').replace(/\n/g, ' ');
        }
    }

    private renderTypeRef(type: spec.TypeReference): { display: string, ref: string } {
        let result: { display: string, ref: string };
        if (type.fqn) {
            const fqn = this.toNativeFqn(type.fqn);
            result = {
                ref: `:py:class:\`~${fqn}\``,
                display: fqn
            };
        } else if (type.primitive) {
            result = {
                ref: type.primitive,
                display: type.primitive
            };
        } else if (type.collection) {
            const elementType = this.renderTypeRef(type.collection.elementtype);

            switch (type.collection.kind) {
                case spec.CollectionKind.Array:
                    result = {
                        ref: elementType.ref,
                        display: `${elementType.display}[]`
                    };
                    break;
                case spec.CollectionKind.Map:
                    result = {
                        ref: elementType.ref,
                        display: `string => ${elementType.display}`
                    };
                    break;
                default:
                    throw new Error(`Unexpected collection kind: ${type.collection.kind}`);
            }
        } else if (type.union) {
            result = {
                display: type.union.types.map(t => this.renderTypeRef(t).display).join(' or '),
                ref: type.union.types.map(t => this.renderTypeRef(t).ref).join(' or '),
            };
        } else {
            throw new Error('Unexpected type ref');
        }
        if (type.optional) { result.ref = `${result.ref} or undefined`; }
        return result;
    }

    private renderProperty(prop: spec.Property) {
        this.code.line();
        const type = this.renderTypeRef(prop.type);
        this.code.openBlock(`.. py:attribute:: ${prop.name}`);
        this.renderDocsLine(prop);
        this.code.line();
        const readonly = prop.immutable ? ' *(readonly)*' : '';
        const abs = prop.abstract ? ' *(abstract)*' : '';
        const stat = prop.static ? ' *(static)*' : '';
        this.code.line(`:type: ${type.ref}${readonly}${abs}${stat}`);
        this.code.closeBlock();
    }
}

function dup(char: string, times: number) {
    let ret = '';
    for (let i = 0; i < times; ++i) {
        ret += char;
    }
    return ret;
}

/**
 * Make a name safe for the file system
 */
function fsSafeName(x: string) {
    // Strip unsafe characters
    return x.replace(/[^a-zA-Z0-9_.-]/g, '_');
}
