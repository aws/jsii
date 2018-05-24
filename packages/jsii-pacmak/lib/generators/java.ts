import { Generator } from '../generator'
import * as spec from 'jsii-spec'
import * as clone from 'clone'
import * as path from 'path'

const MODULE_CLASS_NAME = '$Module';
const ASSEMBLY_FILE_NAME = 'assembly.jsii';
const INTERFACE_PROXY_CLASS_NAME = 'Jsii$Proxy';
const INTERFACE_POJO_CLASS_NAME = 'Jsii$Pojo';

export default class JavaGenerator extends Generator {
    private moduleClass: string

    constructor(mod: spec.Assembly, bundleFilePath: string) {
        super(mod, bundleFilePath, {
            expandUnionProperties: true,
            generateOverloadsForMethodWithOptionals: true,
            target: 'java'
        });

        this.moduleClass = this.emitModuleFile(mod);
    }

    protected getAssemblyOutputPath(mod: spec.Assembly) {
        const dir = this.toNativeFqn(mod.name).replace(/\./g, '/');
        return path.join(dir, ASSEMBLY_FILE_NAME);
    }

    protected onBeginClass(cls: spec.ClassType, abstract: boolean) {
        this.openFileIfNeeded(cls);
        this.addJavaDocs(cls);

        let classBase = this.getClassBase(cls);
        let extendsExpression = classBase ? ` extends ${classBase}` : '';

        let implementsExpr = '';
        if (cls.interfaces && cls.interfaces.length > 0) {
            implementsExpr = ' implements ' + cls.interfaces.map(x => this.toNativeFqn(x.fqn!));
        }

        let inner = cls.parenttype ? ' static' : '';
        let absPrefix = abstract ? ' abstract' : '';

        this.code.line(`@org.jsii.Jsii(module = ${this.moduleClass}.class, fqn = "${cls.fqn}")`);
        this.code.openBlock(`public${inner}${absPrefix} class ${cls.name}${extendsExpression}${implementsExpr}`);

        this.emitJsiiInitializers(cls.name);
    }

    protected onEndClass(cls: spec.ClassType) {
        this.code.closeBlock();
        this.closeFileIfNeeded(cls);
    }
    protected onInitializer(cls: spec.ClassType, method: spec.Method) {
        this.addJavaDocs(method);
        this.code.openBlock(`${this.renderAccessLevel(method)} ${cls.name}(${this.renderMethodParameters(method)})`);
        this.code.line('super(org.jsii.JsiiObject.InitializationMode.Jsii);');
        this.code.line(`org.jsii.JsiiEngine.getInstance().createNewObject(this${this.renderMethodCallArguments(method, true)});`)
        this.code.closeBlock();
    }

    protected onInitializerOverload(cls: spec.ClassType, overload: spec.Method, originalInitializer: spec.Method) {
        this.onInitializer(cls, overload); originalInitializer;
    }

    protected onConstValue(cls: spec.ClassType, constValue: spec.ConstValue, value: any) {
        cls; constValue; value; this.notImpl('onConstValue');
    }
    protected onField(cls: spec.ClassType, prop: spec.Property, union?: spec.UnionTypeReference) {
        cls; prop; union
    }

    private emitProperty(prop: spec.Property, includeGetter = true) {
        const propType = this.toJavaType(prop.type);
        const propClass = this.toJavaType(prop.type, true);
        const propName = this.code.toPascalCase(prop.name);
        const access = this.renderAccessLevel(prop);

        // for unions we only generate overloads for setters, not getters.
        if (includeGetter) {
            this.addJavaDocs(prop);
            this.code.openBlock(`${access} ${propType} get${propName}()`);
            this.code.line(`return this.jsiiGet("${prop.name}", ${propClass}.class);`);
            this.code.closeBlock();
        }

        if (!prop.immutable) {
            this.addJavaDocs(prop);
            this.code.openBlock(`${access} void set${propName}(final ${propType} value)`);
            this.code.line(`this.jsiiSet("${prop.name}\", value);`);
            this.code.closeBlock();
        }
    }

    protected onProperty(_cls: spec.ClassType, prop: spec.Property) {
        this.emitProperty(prop)
    }

    /**
     * Since we expand the union setters, we will use this event to only emit the getter which returns an Object.
     */
    protected onUnionProperty(_cls: spec.ClassType, prop: spec.Property, _union: spec.UnionTypeReference) {
        const propClone = clone(prop);
        propClone.immutable = true;
        propClone.type = {
            primitive: spec.PrimitiveType.Any,
            optional: propClone.type.optional
        };
        this.emitProperty(propClone);
    }

    /**
     * We will generate overloads for setters but not for getters
     */
    protected onExpandedUnionProperty(_cls: spec.ClassType, prop: spec.Property, primaryName: string) {
        const propClone = clone(prop);
        propClone.name = primaryName;
        this.emitProperty(propClone, /* includeGetter */ false);
    }

    protected onMethod(_cls: spec.ClassType, method: spec.Method) {
        this.emitMethod(method);
    }

    protected onMethodOverload(cls: spec.ClassType, overload: spec.Method, _originalMethod: spec.Method) {
        this.onMethod(cls, overload);
    }

    private emitMethod(method: spec.Method) {
        const returnType = method.returns ? this.toJavaType(method.returns) : 'void';
        const access = this.renderAccessLevel(method);
        const async = !!(method.returns && method.returns.promise);
        const signature = `${returnType} ${method.name}(${this.renderMethodParameters(method)})`;
        this.addJavaDocs(method);
        if (method.abstract) {
            this.code.line(`${access} abstract ${signature};`)
        }
        else {
            this.code.openBlock(`${access} ${signature}`);
            const methodCall = this.renderMethodCall(method, async);
            if (method.returns) {
                this.code.line(`return ${methodCall};`);
            }
            else {
                this.code.line(`${methodCall};`);
            }
            this.code.closeBlock();
        }
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
    protected onBeginNamespace(ns: string) { ns; }
    protected onEndNamespace(ns: string) { ns; }

    protected onBeginInterface(ifc: spec.InterfaceType) {
        this.openFileIfNeeded(ifc);
        this.addJavaDocs(ifc);

        // all interfaces always extend JsiiInterface so we can identify that it is a jsii interface.
        const interfaces = ifc.interfaces || [];
        const bases = [ 'org.jsii.JsiiSerializable', ...interfaces.map(x => this.toNativeFqn(x.fqn!)) ].join(', ');

        let inner = ifc.parenttype ? ' static' : '';
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

    /**
     * We are now going to build a class that can be used as a proxy for untyped
     * javascript objects that implement this interface. we want java code to be
     * able to interact with them, so we will create a proxy class which
     * implements this interface and has the same methods.
     */ 
    private emitInterfaceProxy(ifc: spec.InterfaceType) {
        const name = INTERFACE_PROXY_CLASS_NAME;

        this.code.line();
        this.code.line('/**')
        this.code.line(' * A proxy class which for javascript object literal which adhere to this interface.');
        this.code.line(' */');
        this.code.openBlock(`class ${name} extends org.jsii.JsiiObject implements ${this.toNativeFqn(ifc.fqn)}`);
        this.emitJsiiInitializers(name);

        // compile a list of all unique methods from the current interface and all
        // base interfaces (and their bases).
        let methods: { [name: string]: spec.Method } = {};
        let properties: { [name: string]: spec.Property } = {};
        const collectMembers = (ifc: spec.InterfaceType) => {
            for (let prop of ifc.properties || []) {
                properties[prop.name] = prop;
            }
            for (let method of ifc.methods || []) {
                methods[method.name!] = method;
            }
            for (const base of ifc.interfaces || []) {
                const type = this.findType(base.fqn!);
                if (type.kind !== spec.TypeKind.Interface) {
                    throw new Error(`Base interfaces of an interface must be an interface (${base.fqn} is of type ${type.kind})`);
                }
                collectMembers(type as spec.InterfaceType);
            }
        };
        collectMembers(ifc);

        // emit all properties
        for (let propName of Object.keys(properties)) {
            const prop = properties[propName];
            this.emitProperty(prop);
        }

        // emit all the methods
        for (let methodName of Object.keys(methods)) {
            const method = methods[methodName];
            this.emitMethod(method);
        }

        this.code.closeBlock();
        // this.code.closeFile(file);
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
        const propType = this.toJavaType(prop.type);
        const propName = this.code.toPascalCase(prop.name);

        // for unions we only generate overloads for setters, not getters.
        this.addJavaDocs(prop);
        this.code.line(`${propType} get${propName}();`);

        if (!prop.immutable) {
            this.addJavaDocs(prop);
            this.code.line(`void set${propName}(final ${propType} value);`);
        }
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
            spec: spec.Property
            propName: string
            fieldName: string
            javaType: string
            optional?: boolean
            stepInterfaceName: string
            nextStepInterfaceName?: string
            inherited: boolean
            immutable: boolean
        };

        const props = new Array<Prop>();
        const requiredProps = new Array<Prop>();
        const optionalProps = new Array<Prop>();

        // collect all properties from all base structs
        const self = this;

        function collectProps(ifc: spec.InterfaceType, isBaseClass = false) {
            for (let property of ifc.properties || []) {
                const propName = self.code.toPascalCase(property.name);
                const optional = property.type.optional;
    
                const prop: Prop = {
                    spec: property,
                    propName, optional,
                    fieldName: '_' + self.code.toCamelCase(property.name),
                    javaType: self.toJavaType(property.type),
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
            for (let base of ifc.interfaces || []) {
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

        // If there are no required props, Builder /is/ the FullBuilder. Otherwise, Builder will
        // reflect the first required prop and proxy to FullBuilder.
        if (requiredProps.length > 0) {
            this.code.line('/**');
            this.code.line(` * A fluent step builder class for ${interfaceName}.`);
            this.code.line(' * The build() method will be available once all required properties are fulfilled.');
            this.code.line(' */')
            this.code.openBlock(`class ${builderName}`);
            const firstProp = requiredProps.shift()!;
            this.code.openBlock(`public ${firstProp.nextStepInterfaceName} with${firstProp.propName}(final ${firstProp.javaType} value)`);
            this.code.line(`return new FullBuilder().with${firstProp.propName}(value);`);
            this.code.closeBlock();

            const emitWithInterfaceMethod = (prop: Prop) => {
                this.addJavaDocs(prop.spec, `Sets the value for ${interfaceName}::${prop.propName}.`);
                this.code.line(`${prop.nextStepInterfaceName} with${prop.propName}(final ${prop.javaType} value);`);
            }

            // generate step interfaces
            for (let rp of requiredProps) {
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
            for (let opt of optionalProps) {
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
    
            for (let prop of props) {
                this.code.openBlock(`public ${prop.nextStepInterfaceName} with${prop.propName}(final ${prop.javaType} value)`);
                if (!prop.optional) {
                    this.code.line(`java.util.Objects.requireNonNull(value, "${prop.fieldName} is required");`);
                }
                this.code.line(`this.instance.${prop.fieldName} = value;`);
                this.code.line('return this;');
                this.code.closeBlock();
            }
    
            this.code.openBlock(`public ${interfaceName} build()`);
            this.code.line(`${interfaceName} result = this.instance;`);
            this.code.line(`this.instance = new ${pojoName}();`);
            this.code.line(`return result;`);
            this.code.closeBlock();
    
            this.code.closeBlock(); // FullBuilder
    
            this.code.closeBlock(); // Builder
        }
        else {
            this.code.line();
            this.code.line('/**');
            this.code.line(` * A fluent builder class for ${interfaceName}.`);
            this.code.line(' */')
            this.code.openBlock(`public static class ${builderName}`);

            this.code.line(`private ${pojoName} instance = new ${pojoName}();`);
            this.code.line();        
    
            for (let prop of props) {
                this.code.openBlock(`public ${builderName} with${prop.propName}(final ${prop.javaType} value)`);
                if (!prop.optional) {
                    this.code.line(`java.util.Objects.requireNonNull(value, "${prop.fieldName} is required");`);
                }
                this.code.line(`this.instance.${prop.fieldName} = value;`);
                this.code.line('return this;');
                this.code.closeBlock();
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
        this.code.line('/**')
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
            this.code.line(`protected ${p.javaType} ${p.fieldName};`);
            this.code.line();

            this.code.openBlock(`public ${p.javaType} get${p.propName}()`);
            this.code.line(`return this.${p.fieldName};`);
            this.code.closeBlock();

            if (!p.immutable) {
                this.code.openBlock(`public void set${p.propName}(final ${p.javaType} value)`);
                this.code.line(`this.${p.fieldName} = value;`);
                this.code.closeBlock();
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
        return nativeFqn.replace(/\./g, '/') + '.java';
    }

    private addJavaDocs(doc: spec.Documentable, defaultText?: string) {
        if (!defaultText && (!doc.docs || Object.keys(doc.docs).length === 0)) return;

        doc.docs = doc.docs || { };

        this.code.line('/**');

        // If there are no docs
        if (Object.keys(doc.docs).length === 0) {
            this.code.line(` * ${defaultText}`);
        }

        Object.keys(doc.docs).forEach(key => {
            let value = doc.docs[key];
            if (key === 'comment') {
                value.split('\n').forEach(s => this.code.line(` * ${s}`));
            }
            else {
                this.code.line(` * @${key} ${value.replace(/\n/g, ' ')}`);
            }
        });

        // if this is a method, add docs for parameters
        if ((doc as any).parameters) {
            const method = doc as spec.Method;
            if (method.parameters) {
                for (let param of method.parameters) {
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
        if (typeref.primitive) {
            return this.toJavaPrimitive(typeref.primitive);
        }
        else if (typeref.collection) {
            return this.toJavaCollection(typeref.collection, forMarshalling);
        }
        else if (typeref.fqn) {
            return this.toNativeFqn(typeref.fqn);
        }
        else if (typeref.union) {
            return 'java.lang.Object';
        }
        else {
            throw new Error('Invalid type reference: ' + JSON.stringify(typeref));
        }
    }

    private toJavaCollection(collection: spec.CollectionTypeReference, forMarshalling: boolean) {
        let elementJavaType = this.toJavaType(collection.elementtype);
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

    private renderMethodCallArguments(method: spec.Method, prependComma: boolean) {
        let s = '';
        if (method.parameters && method.parameters.length > 0) {
            if (prependComma) {
                s += ', ';
            }
            s += method.parameters.map(p => p.name).join(', ');
        }
        return s;
    }

    private renderMethodCall(method: spec.Method, async: boolean) {
        const callType = async ? 'jsiiAsyncCall' : 'jsiiCall';
        let s = `this.${callType}("${method.name}\"`;
        if (method.returns) {
            s += `, ${this.toJavaType(method.returns, true)}.class`;
        }
        else {
            s += ', Void.class'
        }
        s += this.renderMethodCallArguments(method, true);
        s += ')';
        return s;
    }

    private renderMethodParameters(method: spec.Method) {
        const params = []
        if (method.parameters) {
            for (let p of method.parameters) {
                params.push(`final ${this.toJavaType(p.type)} ${p.name}`);
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

        this.code.openBlock(`public class $Module extends org.jsii.JsiiModule`);

        // ctor
        this.code.openBlock(`public $Module()`);
        this.code.line(`super("${moduleName}", ${MODULE_CLASS_NAME}.class.getResource("${ASSEMBLY_FILE_NAME}"));`);
        this.code.closeBlock(); // ctor

        // dependencies
        if (mod.dependencies && Object.keys(mod.dependencies).length > 0) {
            const deps = [];
            for (let dep in mod.dependencies) {
                deps.push(`${this.makeModuleClass(dep)}.class`);
            }

            this.code.line('@Override');
            this.code.openBlock(`public java.util.List<Class> getDependencies()`)
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
}
