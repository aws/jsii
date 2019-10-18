import { CodeMaker } from 'codemaker';
import { Assembly, InterfaceType } from 'jsii-reflect';
import spec = require('jsii-spec');
import log = require('../../logging');

const BUILDER_NAME = 'Builder';

/**
 * Helps with generating builders for certain types.
 */
export class BuilderGenerator {
  public constructor(
    private readonly assembly: Assembly,
    private readonly toJavaType: (ref: spec.TypeReference) => string,
  ) { }

  /**
   * Checks whether a builder can be emitted for a given type:
   * - It is not abstract
   * - The constructor is not variadic (can possibly lift requirement in the future)
   * - The constructor takes exactly one struct parameter
   * - There is no nested type called "Builder" in this type
   *
   * @params type the class of the initializer.
   *
   * @returns `true` if the type can get a builder.
   */
  public canGenerateBuilderFor(type: spec.ClassType): boolean {
    if (type.abstract) { return false; }
    const initializer = type.initializer;
    if (!initializer) { return false; }
    if (initializer.variadic) { return false; }
    if (initializer.parameters == null) { return false; }
    if (this.assembly.tryFindType(`${type.fqn}.${BUILDER_NAME}`) != null) {
      log.info(`Not generating builder for ${type.fqn} because ${type.fqn}.${BUILDER_NAME} already exists`);
      return false;
    }

    let dataTypeParam: InterfaceType | undefined;
    for (const param of initializer.parameters) {
      if (!spec.isNamedTypeReference(param.type)) { continue; }
      const type = this.assembly.tryFindType(param.type.fqn);
      if (!(type && type.isDataType())) { continue; }
      if (!dataTypeParam) {
        dataTypeParam = type;
      } else {
        log.debug(`Not generating buildef for constructor of ${type.fqn} that has more than one struct parameter`);
        return false;
      }
    }

    return dataTypeParam != null;
  }

  public emitBuilder(type: spec.ClassType, initializer: spec.Initializer, code: CodeMaker): void {
    code.line('/**');
    code.line(` * A builder facility for {@link ${type.name}}.`);
    code.line(' */');
    code.openBlock(`${initializer.protected ? 'protected' : 'public'} static final class ${BUILDER_NAME}`);

    const positionalParameters = initializer.parameters!.filter(param => this.resolveStruct(param.type) == null);
    const positionalArgSyntax = positionalParameters.map(param => `final ${this.toJavaType(param.type)} ${param.name}`);

    let structParameter: spec.Parameter;
    let structParameterType: InterfaceType;
    for (const parameter of initializer.parameters!) {
      const struct = this.resolveStruct(parameter.type);
      const javaType = struct
        ? `${this.toJavaType(parameter.type)}.Builder`
        : this.toJavaType(parameter.type);
      const final = struct && parameter.optional ? '' : 'final ';
      const value = struct && final ? ` = ${this.toJavaType(parameter.type)}.builder()` : '';
      code.line(`private ${final}${javaType} ${parameter.name}${value};`);
      if (struct) {
        structParameter = parameter;
        structParameterType = struct;
      }
    }
    code.line();

    code.line('/**')
    code.line(` * Creates a new {@link Builder} for {@link ${type.name}}.`);
    code.line(' *');
    for (const parameter of positionalParameters) {
      code.line(` * @param ${parameter.name} ${parameter.docs || ''}`);
    }
    code.line(' *');
    code.line(' * @returns a new {@link Builder} instance');
    code.line(' */')
    code.openBlock(`public static ${BUILDER_NAME} create(${positionalArgSyntax.join(', ')})`)
    code.line(`return new ${BUILDER_NAME}(${positionalParameters.map(param => param.name).join(', ')});`);
    code.closeBlock(/* public static Builder create() */);

    code.line();
    code.openBlock(`private ${BUILDER_NAME}(${positionalArgSyntax.join(', ')})`);
    for (const parameter of positionalParameters) {
      code.line(`this.${parameter.name} = ${parameter.name};`);
    }
    code.closeBlock(/* private Builder() */)

    for (const prop of structParameterType!.allProperties) {
      code.line();
      code.line('/**');
      code.line(` * Defines the value of ${structParameter!.name}.${prop.name}`);
      code.line(' *');
      code.line(` * @param ${prop.name} ${prop.docs.summary}`);
      code.line(' *');
      code.line(' * @returns {@code this}')
      code.line(' */');
      code.openBlock(`public ${BUILDER_NAME} ${prop.name}(final ${this.toJavaType(prop.type.spec!)} ${prop.name})`);
      if (structParameter!.optional) {
        code.openBlock(`if (this.${structParameter!.name} == null)`);
        code.line(`this.${structParameter!.name} = ${this.toJavaType(structParameter!.type)}.builder();`);
        code.closeBlock(/* if (this.prop == null) */);
      }
      code.line(`this.${structParameter!.name}.${prop.name}(${prop.name});`);
      code.line('return this;')
      code.closeBlock(/* public builder <property>(<type> value) */);
    }

    code.line();
    code.line('/**');
    code.line(` * @returns a new instance of {@link ${type.name}}`);
    code.line(' */');
    code.openBlock(`public ${type.name} build()`);
    const args = initializer.parameters!.map(param => {
      const field = `this.${param.name}`;
      if (param.name !== structParameter!.name) {
        return field;
      }
      if (param.optional) {
        return `(${field} != null ? ${field}.build() : null)`;
      }
      return `${field}.build()`;
    });
    code.line(`return new ${this.toJavaType(type)}(${args.join(', ')});`);
    code.closeBlock(/* public <Type> build() */)

    code.closeBlock(/* public static final class Builder */);
  }

  private resolveStruct(type: spec.TypeReference): InterfaceType | undefined {
    if (!spec.isNamedTypeReference(type)) {
      return undefined;
    }
    const resolved = this.assembly.tryFindType(type.fqn);
    return resolved && resolved.isDataType() ? resolved : undefined;
  }
}
