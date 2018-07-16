import * as spec from 'jsii-spec';
import * as path from 'path';
import { Generator } from '../generator';

const MODULE_CLASS_NAME = '$Module';
const INTERFACE_PROXY_CLASS_NAME = 'Jsii$Proxy';
const INTERFACE_POJO_CLASS_NAME = 'Jsii$Pojo';

export default class JavaGenerator extends Generator {
    private moduleClass: string;

    constructor() {
        super({ generateOverloadsForMethodWithOptionals: true });
    }

    protected onBeginAssembly(assm: spec.Assembly) {
        this.moduleClass = this.emitModuleFile(assm);
    }

    protected getAssemblyOutputDir(mod: spec.Assembly) {
        const dir = this.toNativeFqn(mod.name).replace(/\./g, '/');
        return path.join('resources', dir);
    }

    protected onBeginClass(cls: spec.ClassType, abstract: boolean) {
        this.openFileIfNeeded(cls);
        this.addJavaDocs(cls);

        const classBase = this.getClassBase(cls);
        const extendsExpression = classBase ? ` extends ${classBase}` : '';

        let implementsExpr = '';
        if (cls.interfaces && cls.interfaces.length > 0) {
            implementsExpr = ' implements ' + cls.interfaces.map(x => this.toNativeFqn(x.fqn!));
        }

        const inner = cls.parenttype ? ' static' : '';
        const absPrefix = abstract ? ' abstract' : '';

        this.code.line(`@org.jsii.Jsii(module = ${this.moduleClass}.class, fqn = "${cls.fqn}")`);
        this.code.openBlock(`public${inner}${absPrefix} class ${cls.name}${extendsExpression}${implementsExpr}`);

        this.emitJsiiInitializers(cls.name);
        this.emitStaticInitializer(cls);
    }

    protected onEndClass(cls: spec.ClassType) {
        this.code.closeBlock();
        this.closeFileIfNeeded(cls);
    }
    protected onInitializer(cls: spec.ClassType, method: spec.Method) {
        this.addJavaDocs(method);
        this.code.openBlock(`${this.renderAccessLevel(method)} ${cls.name}(${this.renderMethodParameters(method)})`);
        this.code.line('super(org.jsii.JsiiObject.InitializationMode.Jsii);');
        this.code.line(`org.jsii.JsiiEngine.getInstance().createNewObject(this${this.renderMethodCallArguments(method)});`);
        this.code.closeBlock();
    }

    protected onInitializerOverload(cls: spec.ClassType, overload: spec.Method, originalInitializer: spec.Method) {
        this.onInitializer(cls, overload);

        /* tslint:disable-next-line no-unused-expression */
        originalInitializer;
    }

    protected onField(cls: spec.ClassType, prop: spec.Property, union?: spec.UnionTypeReference) {
        /* tslint:disable-next-line no-unused-expression */
        cls; prop; union;
    }

    protected onProperty(cls: spec.ClassType, prop: spec.Property) {
        this.emitProperty(cls, prop);
    }

    protected onStaticProperty(cls: spec.ClassType, prop: spec.Property) {
        if (prop.const) {
            this.emitConstProperty(prop);
        } else {
            this.emitProperty(cls, prop);
        }
    }

    /**
     * Since we expand the union setters, we will use this event to only emit the getter which returns an Object.
     */
    protected onUnionProperty(cls: spec.ClassType, prop: spec.Property, _union: spec.UnionTypeReference) {
        this.emitProperty(cls, prop);
    }

    protected onMethod(cls: spec.ClassType, method: spec.Method) {
        this.emitMethod(cls, method);
    }

    protected onMethodOverload(cls: spec.ClassType, overload: spec.Method, _originalMethod: spec.Method) {
        this.onMethod(cls, overload);
    }

    protected onStaticMethod(cls: spec.ClassType, method: spec.Method) {
        this.emitMethod(cls, method);
    }

    protected onStaticMethodOverload(cls: spec.ClassType, overload: spec.Method, _originalMethod: spec.Method) {
        this.emitMethod(cls, overload);
    }

    protected onBeginEnum(enm: spec.EnumType) {
        this.openFileIfNeeded(enm);
        this.addJavaDocs(enm);
        this.code.line(`@org.jsii.Jsii(module = ${this.moduleClass}.class, fqn = "${enm.fqn}")`);
        this.code.openBlock(`public enum ${enm.name}`);
    }
    protected onEndEnum(enm: spec.EnumType) {
        this.code.closeBlock();
        this.closeFileIfNeeded(enm);
    }
    protected onEnumMember(_: spec.EnumType, member: spec.EnumMember) {
        this.addJavaDocs(member);
        this.code.line(`${member.name},`);
    }

    // namespaces are handled implicitly by onBeginClass().
    protected onBeginNamespace(ns: string) {
        /* tslint:disable-next-line no-unused-expression */
        ns;
    }

    protected onEndNamespace(ns: string) {
        /* tslint:disable-next-line no-unused-expression */
        ns;
    }

    protected onBeginInterface(ifc: spec.InterfaceType) {
        this.openFileIfNeeded(ifc);
        this.addJavaDocs(ifc);

        // all interfaces always extend JsiiInterface so we can identify that it is a jsii interface.
        const interfaces = ifc.interfaces || [];
        const bases = [ 'org.jsii.JsiiSerializable', ...interfaces.map(x => this.toNativeFqn(x.fqn!)) ].join(', ');

        const inner = ifc.parenttype ? ' static' : '';
        this.code.openBlock(`public${inner} interface ${ifc.name} extends ${bases}`);
    }

    protected onEndInterface(ifc: spec.InterfaceType) {
        if (ifc.datatype) {
            this.emitInterfaceBuilder(ifc);
        }

        // emit interface proxy class
        this.emitInterfaceProxy(ifc);

        this.code.closeBlock();
        this.closeFileIfNeeded(ifc);
    }

    protected onInterfaceMethod(_ifc: spec.InterfaceType, method: spec.Method) {
        const returnType = method.returns ? this.toJavaType(method.returns) : 'void';
        this.addJavaDocs(method);
        this.code.line(`${returnType} ${method.name}(${this.renderMethodParameters(method)});`);
    }

    protected onInterfaceMethodOverload(ifc: spec.InterfaceType, overload: spec.Method, _originalMethod: spec.Method) {
        this.onInterfaceMethod(ifc, overload);
    }

    protected onInterfaceProperty(_ifc: spec.InterfaceType, prop: spec.Property) {
        const getterType = this.toJavaType(prop.type);
        const setterTypes = this.toJavaTypes(prop.type);
        const propName = this.code.toPascalCase(prop.name);

        // for unions we only generate overloads for setters, not getters.
        this.addJavaDocs(prop);
        this.code.line(`${getterType} get${propName}();`);

        if (!prop.immutable) {
            for (const type of setterTypes) {
                this.addJavaDocs(prop);
                this.code.line(`void set${propName}(final ${type} value);`);
            }
        }
    }

    private emitStaticInitializer(cls: spec.ClassType) {
        const consts = (cls.properties || []).filter(x => x.const);
        if (consts.length === 0) {
            return;
        }

        const javaClass = this.toJavaType(cls);

        this.code.openBlock(`static`);

        for (const prop of consts) {
            const constName = this.renderConstName(prop);
            const propClass = this.toJavaType(prop.type, true);
            this.code.line(`${constName} = org.jsii.JsiiObject.jsiiStaticGet(${javaClass}.class, "${prop.name}", ${propClass}.class);`);
        }

        this.code.closeBlock();
    }

    private renderConstName(prop: spec.Property) {
        return this.code.toSnakeCase(prop.name).toLocaleUpperCase(); // java consts are SNAKE_UPPER_CASE
    }

    private emitConstProperty(prop: spec.Property) {
        const propType = this.toJavaType(prop.type);
        const propName = this.renderConstName(prop);
        const access = this.renderAccessLevel(prop);

        this.addJavaDocs(prop);
        this.code.line(`${access} final static ${propType} ${propName};`);
    }

    private emitProperty(cls: spec.Type, prop: spec.Property, includeGetter = true) {
        const getterType = this.toJavaType(prop.type);
        const setterTypes = this.toJavaTypes(prop.type);
        const propClass = this.toJavaType(prop.type, true);
        const propName = this.code.toPascalCase(prop.name);
        const access = this.renderAccessLevel(prop);
        const statc = prop.static ? 'static ' : '';
        const javaClass = this.toJavaType(cls);

        // for unions we only generate overloads for setters, not getters.
        if (includeGetter) {
            this.addJavaDocs(prop);
            this.code.openBlock(`${access} ${statc}${getterType} get${propName}()`);

            let statement = 'return ';
            if (prop.static) {
                statement += `org.jsii.JsiiObject.jsiiStaticGet(${javaClass}.class, `;
            } else {
                statement += `this.jsiiGet(`;
            }

            statement += `"${prop.name}", ${propClass}.class);`;

            this.code.line(statement);
            this.code.closeBlock();
        }

        if (!prop.immutable) {
            for (const type of setterTypes) {
                this.addJavaDocs(prop);
                this.code.openBlock(`${access} ${statc}void set${propName}(final ${type} value)`);
                let statement = '';

                if (prop.static) {
                    statement += `org.jsii.JsiiObject.jsiiStaticSet(${javaClass}.class, `;
                } else {
                    statement += 'this.jsiiSet(';
                }
                statement += `"${prop.name}\", value);`;
                this.code.line(statement);
                this.code.closeBlock();
            }
        }
    }

    private emitMethod(cls: spec.Type, method: spec.Method) {
        const returnType = method.returns ? this.toJavaType(method.returns) : 'void';
        const statc = method.static ? 'static ' : '';
        const access = this.renderAccessLevel(method);
        const async = !!(method.returns && method.returns.promise);
        const methodName = slugify(method.name);
        const signature = `${returnType} ${methodName}(${this.renderMethodParameters(method)})`;
        this.addJavaDocs(method);
        if (method.abstract) {
            this.code.line(`${access} abstract ${signature};`);
        } else {
            this.code.openBlock(`${access} ${statc}${signature}`);
            this.code.line(this.renderMethodCall(cls, method, async));
            this.code.closeBlock();
        }
    }

    /**
     * We are now going to build a class that can be used as a proxy for untyped
     * javascript objects that implement this interface. we want java code to be
     * able to interact with them, so we will create a proxy class which
     * implements this interface and has the same methods.
     */
    private emitInterfaceProxy(ifc: spec.InterfaceType) {
        const name = INTERFACE_PROXY_CLASS_NAME;

        this.code.line();
        this.code.line('/**');
        this.code.line(' * A proxy class which for javascript object literal which adhere to this interface.');
        this.code.line(' */');
        this.code.openBlock(`class ${name} extends org.jsii.JsiiObject implements ${this.toNativeFqn(ifc.fqn)}`);
        this.emitJsiiInitializers(name);

        // compile a list of all unique methods from the current interface and all
        // base interfaces (and their bases).
        const methods: { [name: string]: spec.Method } = {};
        const properties: { [name: string]: spec.Property } = {};
        const collectMembers = (currentIfc: spec.InterfaceType) => {
            for (const prop of currentIfc.properties || []) {
                properties[prop.name] = prop;
            }
            for (const method of currentIfc.methods || []) {
                methods[method.name!] = method;
            }
            for (const base of currentIfc.interfaces || []) {
                const type = this.findType(base.fqn!);
                if (type.kind !== spec.TypeKind.Interface) {
                    throw new Error(`Base interfaces of an interface must be an interface (${base.fqn} is of type ${type.kind})`);
                }
                collectMembers(type as spec.InterfaceType);
            }
        };
        collectMembers(ifc);

        // emit all properties
        for (const propName of Object.keys(properties)) {
            const prop = properties[propName];
            this.emitProperty(ifc, prop);
        }

        // emit all the methods
        for (const methodName of Object.keys(methods)) {
            const method = methods[methodName];
            this.emitMethod(ifc, method);
        }

        this.code.closeBlock();
    }

    private emitInterfaceBuilder(ifc: spec.InterfaceType) {
        const interfaceName = ifc.name;
        const builderName = 'Builder';
        const pojoName = INTERFACE_POJO_CLASS_NAME;

        this.code.line();
        this.code.line('// ==================================================================');
        this.code.line('// Builder');
        this.code.line('// ==================================================================');
        this.code.line();

        this.code.openBlock(`static ${builderName} builder()`);
        this.code.line(`return new ${builderName}();`);
        this.code.closeBlock();

        interface Prop {
            docs: spec.Docs
            spec: spec.Property
            propName: string
            fieldName: string
            fieldJavaType: string
            javaTypes: string[]
            optional?: boolean
            stepInterfaceName: string
            nextStepInterfaceName?: string
            inherited: boolean
            immutable: boolean
        }

        const props = new Array<Prop>();
        const requiredProps = new Array<Prop>();
        const optionalProps = new Array<Prop>();

        // collect all properties from all base structs
        const self = this;

        function collectProps(currentIfc: spec.InterfaceType, isBaseClass = false) {
            for (const property of currentIfc.properties || []) {
                const propName = self.code.toPascalCase(property.name);
                const optional = property.type.optional;

                const prop: Prop = {
                    docs: property.docs,
                    spec: property,
                    propName, optional,
                    fieldName: '_' + self.code.toCamelCase(property.name),
                    fieldJavaType: self.toJavaType(property.type),
                    javaTypes: self.toJavaTypes(property.type),
                    immutable: property.immutable || false,
                    stepInterfaceName: optional ? 'Build' : `${propName}Step`,
                    nextStepInterfaceName: optional ? 'Build' : undefined, /* will be determined later */
                    inherited: isBaseClass,
                };

                props.push(prop);

                if (prop.optional) {
                    optionalProps.push(prop);
                } else {
                    requiredProps.push(prop);
                }
            }

            // add props of base struct
            for (const base of currentIfc.interfaces || []) {
                collectProps(self.findType(base.fqn) as spec.InterfaceType, true);
            }
        }

        collectProps(ifc);

        // determine `nextStepInterfaceName` for each property.
        requiredProps.forEach((p, i) => {
            const nextRequired = requiredProps[i + 1];
            const nextStep = nextRequired ? nextRequired.stepInterfaceName : 'Build';
            p.nextStepInterfaceName = nextStep;
        });

        // if there are non required props at all, we just use the builder
        if (requiredProps.length === 0) {
            props.forEach(p => p.nextStepInterfaceName = builderName);
        }

        const emitWithImplementation = (prop: Prop, isFirstProp = false) => {
            for (const type of prop.javaTypes) {
                this.addJavaDocs(prop);
                this.code.openBlock(`public ${prop.nextStepInterfaceName} with${prop.propName}(final ${type} value)`);

                if (isFirstProp) {
                    this.code.line(`return new FullBuilder().with${prop.propName}(value);`);
                } else {
                    if (!prop.optional) {
                        this.code.line(`java.util.Objects.requireNonNull(value, "${prop.fieldName} is required");`);
                    }
                    this.code.line(`this.instance.${prop.fieldName} = value;`);
                    this.code.line('return this;');
                }

                this.code.closeBlock();
            }
        };

        // If there are no required props, Builder /is/ the FullBuilder. Otherwise, Builder will
        // reflect the first required prop and proxy to FullBuilder.
        if (requiredProps.length > 0) {
            this.code.line('/**');
            this.code.line(` * A fluent step builder class for ${interfaceName}.`);
            this.code.line(' * The build() method will be available once all required properties are fulfilled.');
            this.code.line(' */');
            this.code.openBlock(`class ${builderName}`);

            const firstProp = requiredProps.shift()!;
            emitWithImplementation(firstProp, true);

            const emitWithInterfaceMethod = (prop: Prop) => {
                for (const type of prop.javaTypes) {
                    this.addJavaDocs(prop.spec, `Sets the value for ${interfaceName}::${prop.propName}.`);
                    this.code.line(`${prop.nextStepInterfaceName} with${prop.propName}(final ${type} value);`);
                }
            };

            // generate step interfaces
            for (const rp of requiredProps) {
                this.code.line();
                this.code.openBlock(`public interface ${rp.stepInterfaceName}`);
                emitWithInterfaceMethod(rp);
                this.code.closeBlock();
            }

            // generate 'Build' interface
            this.code.line();
            this.code.openBlock(`public interface Build`);
            this.code.line(`/**`);
            this.code.line(` * Returns a new ${interfaceName} object, initialized with the values set on this builder.`);
            this.code.line(` */`);
            this.code.line(`${interfaceName} build();`);
            for (const opt of optionalProps) {
                emitWithInterfaceMethod(opt);
            }
            this.code.closeBlock();

            // generate the FullBuilder
            this.code.line();
            const stepInterfaces = requiredProps.map(p => p.stepInterfaceName).concat([ 'Build' ]);
            this.code.openBlock(`class FullBuilder implements ${stepInterfaces.join(', ')}`);

            this.code.line();
            this.code.line(`private ${pojoName} instance = new ${pojoName}();`);
            this.code.line();

            for (const prop of props) {
                emitWithImplementation(prop);
            }

            this.code.openBlock(`public ${interfaceName} build()`);
            this.code.line(`${interfaceName} result = this.instance;`);
            this.code.line(`this.instance = new ${pojoName}();`);
            this.code.line(`return result;`);
            this.code.closeBlock();

            this.code.closeBlock(); // FullBuilder

            this.code.closeBlock(); // Builder
        } else {
            this.code.line();
            this.code.line('/**');
            this.code.line(` * A fluent builder class for ${interfaceName}.`);
            this.code.line(' */');
            this.code.openBlock(`public static class ${builderName}`);

            this.code.line(`private ${pojoName} instance = new ${pojoName}();`);
            this.code.line();

            for (const prop of props) {
                emitWithImplementation(prop);
            }

            this.code.openBlock(`public ${interfaceName} build()`);
            this.code.line(`${interfaceName} result = this.instance;`);
            this.code.line(`this.instance = new ${pojoName}();`);
            this.code.line(`return result;`);
            this.code.closeBlock();

            this.code.closeBlock(); // FullBuilder

            if (requiredProps.length > 0) {
                this.code.closeBlock(); // Builder
            }
        }

        this.code.line();
        this.code.line('/**');
        this.code.line(' * A PoJo (plain-old-java-object) class that implements this interface.');
        this.code.line(' */');
        this.code.openBlock(`class ${pojoName} implements ${interfaceName}`);

        this.code.line();
        this.code.line('/**');
        this.code.line(' * Constructor used by builders.');
        this.code.line(' */');
        this.code.line(`protected ${pojoName}() { }`);
        this.code.line();

        props.forEach(p => {
            this.code.line();
            this.code.line(`protected ${p.fieldJavaType} ${p.fieldName};`);
            this.code.line();

            this.code.openBlock(`public ${p.fieldJavaType} get${p.propName}()`);
            this.code.line(`return this.${p.fieldName};`);
            this.code.closeBlock();

            if (!p.immutable) {
                for (const type of p.javaTypes) {
                    this.code.openBlock(`public void set${p.propName}(final ${type} value)`);
                    this.code.line(`this.${p.fieldName} = value;`);
                    this.code.closeBlock();
                }
            }
        });

        this.code.closeBlock();
    }

    private openFileIfNeeded(type: spec.Type) {
        if (type.parenttype) {
            return;
        }

        this.code.openFile(this.toJavaFilePath(type.fqn));
        if (type.namespace) {
            this.code.line(`package ${this.toNativeFqn(type.namespace)};`);
        }
    }

    private closeFileIfNeeded(type: spec.Type) {
        if (type.parenttype) {
            return;
        }
        this.code.closeFile(this.toJavaFilePath(type.fqn));
    }

    private toJavaFilePath(fqn: string) {
        const nativeFqn = this.toNativeFqn(fqn);
        return path.join('java', nativeFqn.replace(/\./g, '/') + '.java');
    }

    private addJavaDocs(doc: spec.Documentable, defaultText?: string) {
        if (!defaultText && (!doc.docs || Object.keys(doc.docs).length === 0)) {
            return;
        }

        doc.docs = doc.docs || { };

        this.code.line('/**');

        // If there are no docs
        if (Object.keys(doc.docs).length === 0) {
            this.code.line(` * ${defaultText}`);
        }

        Object.keys(doc.docs).forEach(key => {
            const value = doc.docs[key];
            if (key === 'comment') {
                value.split('\n').forEach(s => this.code.line(` * ${s}`));
            } else {
                this.code.line(` * @${key} ${value.replace(/\n/g, ' ')}`);
            }
        });

        // if this is a method, add docs for parameters
        if ((doc as any).parameters) {
            const method = doc as spec.Method;
            if (method.parameters) {
                for (const param of method.parameters) {
                    if (param.docs && param.docs.comment) {
                        this.code.line(` * @param ${param.name} ${param.docs.comment}`);
                    }
                }
            }
        }

        this.code.line(' */');
    }

    private getClassBase(cls: spec.ClassType) {
        if (!cls.base) {
            return 'org.jsii.JsiiObject';
        }

        return this.toJavaType(cls.base);
    }

    private toJavaType(typeref: spec.TypeReference, forMarshalling = false): string {
        const types = this.toJavaTypes(typeref, forMarshalling);
        if (types.length > 1) {
            return 'java.lang.Object';
        } else {
            return types[0];
        }
    }

    private toJavaTypes(typeref: spec.TypeReference, forMarshalling = false): string[] {
        if (typeref.primitive) {
            return [ this.toJavaPrimitive(typeref.primitive) ];
        } else if (typeref.collection) {
            return [ this.toJavaCollection(typeref.collection, forMarshalling) ];
        } else if (typeref.fqn) {
            return [ this.toNativeFqn(typeref.fqn) ];
        } else if (typeref.union) {
            const types = new Array<string>();
            for (const subtype of typeref.union.types) {
                for (const t of this.toJavaTypes(subtype, forMarshalling)) {
                    types.push(t);
                }
            }
            return types;
        } else {
            throw new Error('Invalid type reference: ' + JSON.stringify(typeref));
        }
    }

    private toJavaCollection(collection: spec.CollectionTypeReference, forMarshalling: boolean) {
        const elementJavaType = this.toJavaType(collection.elementtype);
        switch (collection.kind) {
            case spec.CollectionKind.Array: return forMarshalling ? 'java.util.List' : `java.util.List<${elementJavaType}>`;
            case spec.CollectionKind.Map: return forMarshalling ? 'java.util.Map' : `java.util.Map<java.lang.String, ${elementJavaType}>`;
            default:
                throw new Error(`Unsupported collection kind: ${collection.kind}`);
        }
    }

    private toJavaPrimitive(primitive: spec.PrimitiveType) {
        switch (primitive) {
            case spec.PrimitiveType.Boolean: return 'java.lang.Boolean';
            case spec.PrimitiveType.Date: return 'java.time.Instant';
            case spec.PrimitiveType.Json: return 'com.fasterxml.jackson.databind.node.ObjectNode';
            case spec.PrimitiveType.Number: return 'java.lang.Number';
            case spec.PrimitiveType.String: return 'java.lang.String';
            case spec.PrimitiveType.Any: return 'java.lang.Object';
            default:
                throw new Error('Unknown primitive type: ' + primitive);
        }
    }

    private renderMethodCallArguments(method: spec.Method) {
        if (!method.parameters || method.parameters.length === 0) { return ''; }
        let paramStream: string = '';
        for (const param of method.parameters) {
            const thisParam = `${param.variadic ? 'java.util.Arrays.stream' : 'java.util.stream.Stream.of'}(${param.name})`;
            if (paramStream === '') {
                paramStream = thisParam;
            } else {
                paramStream = `java.util.stream.Stream.concat(${paramStream}, ${thisParam})`;
            }
        }
        return `, ${paramStream}.toArray()`;
    }

    private renderMethodCall(cls: spec.TypeReference, method: spec.Method, async: boolean) {
        let statement = '';

        if (method.returns) {
            statement += `return `;
        }

        if (method.static) {
            const javaClass = this.toJavaType(cls);
            statement += `org.jsii.JsiiObject.jsiiStaticCall(${javaClass}.class, `;
        } else {
            if (async) {
                statement += `this.jsiiAsyncCall(`;
            } else {
                statement += 'this.jsiiCall(';
            }
        }

        statement += `"${method.name}"`;

        if (method.returns) {
            statement += `, ${this.toJavaType(method.returns, true)}.class`;
        } else {
            statement += ', Void.class';
        }
        statement += this.renderMethodCallArguments(method);
        statement += ');';

        return statement;
    }

    private renderMethodParameters(method: spec.Method) {
        const params = [];
        if (method.parameters) {
            for (const p of method.parameters) {
                params.push(`final ${this.toJavaType(p.type)}${p.variadic ? '...' : ''} ${p.name}`);
            }
        }
        return params.join(', ');
    }

    private renderAccessLevel(method: spec.Method | spec.Property) {
        return method.protected ? 'protected' : 'public';
    }

    private makeModuleClass(moduleName: string) {
        return this.toNativeFqn(moduleName) + '.' + MODULE_CLASS_NAME;
    }

    private makeModuleFqn(moduleName: string) {
        return moduleName + '.' + MODULE_CLASS_NAME;
    }

    private emitModuleFile(mod: spec.Assembly) {
        const moduleName = mod.name;
        const moduleClass = this.makeModuleClass(moduleName);
        const moduleFile = this.toJavaFilePath(this.makeModuleFqn(moduleName));
        this.code.openFile(moduleFile);
        this.code.line(`package ${this.toNativeFqn(moduleName)};`);

        this.code.openBlock(`public class ${MODULE_CLASS_NAME} extends org.jsii.JsiiModule`);

        // ctor
        this.code.openBlock(`public ${MODULE_CLASS_NAME}()`);
        this.code.line(`super("${moduleName}", "${mod.version}", ${MODULE_CLASS_NAME}.class, "${this.getAssemblyFileName()}");`);
        this.code.closeBlock(); // ctor

        // dependencies
        if (mod.dependencies && Object.keys(mod.dependencies).length > 0) {
            const deps = [];
            for (const dep of Object.keys(mod.dependencies)) {
                deps.push(`${this.makeModuleClass(dep)}.class`);
            }

            this.code.line('@Override');
            this.code.openBlock(`public java.util.List<Class<? extends org.jsii.JsiiModule>> getDependencies()`);
            this.code.line(`return java.util.Arrays.asList(${deps.join(', ')});`);
            this.code.closeBlock();
        }

        this.code.closeBlock();

        this.code.closeFile(moduleFile);

        return moduleClass;
    }

    private emitJsiiInitializers(className: string) {
        this.code.openBlock(`protected ${className}(final org.jsii.JsiiObject.InitializationMode mode)`);
        this.code.line(`super(mode);`);
        this.code.closeBlock();
    }

    private toNativeFqn(fqn: string): string {
        const [mod, ...name] = fqn.split('.');
        if (mod === this.assembly.name) {
            if (!this.assembly.targets.java) {
                throw new Error(`This module doesn't have a java configuration: unable to determine a package name.`);
            }
            return [this.assembly.targets.java.package, ...name].join('.');
        }
        const depMod = this.assembly.dependencies && this.assembly.dependencies[mod];
        if (!depMod) { throw new Error(`No dependency found for module ${mod}`); }
        const pkg = depMod.targets.java && depMod.targets.java.package;
        if (!pkg) { throw new Error(`The module ${mod} does not have a java.package setting`); }
        return [pkg, ...name].join('.');
    }
}

function slugify(name?: string) {
    if (!name) {
        return name;
    }
    if (RESERVED_KEYWORDS.includes(name)) {
        return `${name}_`;
    } else {
        return name;
    }
}

const RESERVED_KEYWORDS = [
    'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class',
    'const', 'continue', 'default', 'double', 'do', 'else', 'enum', 'extends', 'false',
    'final', 'finally', 'float', 'for', 'goto', 'if', 'implements', 'import', 'instanceof',
    'int', 'interface', 'long', 'native', 'new', 'null', 'package', 'private', 'protected',
    'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized',
    'this', 'throw', 'throws', 'transient', 'true', 'try', 'void', 'volatile', 'while'
];
