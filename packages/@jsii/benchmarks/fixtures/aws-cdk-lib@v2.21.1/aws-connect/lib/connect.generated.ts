// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:07.446Z","fingerprint":"XYj7+mnbAMcIFx3oeSPHsTfIoSdsSq4lOktkFVfT7+s="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnContactFlow`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html
 */
export interface CfnContactFlowProps {

    /**
     * The content of the contact flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html#cfn-connect-contactflow-content
     */
    readonly content: string;

    /**
     * The Amazon Resource Name (ARN) of the Amazon Connect instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html#cfn-connect-contactflow-instancearn
     */
    readonly instanceArn: string;

    /**
     * The name of the contact flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html#cfn-connect-contactflow-name
     */
    readonly name: string;

    /**
     * The description of the contact flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html#cfn-connect-contactflow-description
     */
    readonly description?: string;

    /**
     * The state of the contact flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html#cfn-connect-contactflow-state
     */
    readonly state?: string;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html#cfn-connect-contactflow-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The type of the contact flow. For descriptions of the available types, see [Choose a Contact Flow Type](https://docs.aws.amazon.com/connect/latest/adminguide/create-contact-flow.html#contact-flow-types) in the *Amazon Connect Administrator Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html#cfn-connect-contactflow-type
     */
    readonly type?: string;
}

/**
 * Determine whether the given properties match those of a `CfnContactFlowProps`
 *
 * @param properties - the TypeScript properties of a `CfnContactFlowProps`
 *
 * @returns the result of the validation.
 */
function CfnContactFlowPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('content', cdk.requiredValidator)(properties.content));
    errors.collect(cdk.propertyValidator('content', cdk.validateString)(properties.content));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.requiredValidator)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.validateString)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('state', cdk.validateString)(properties.state));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "CfnContactFlowProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Connect::ContactFlow` resource
 *
 * @param properties - the TypeScript properties of a `CfnContactFlowProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Connect::ContactFlow` resource.
 */
// @ts-ignore TS6133
function cfnContactFlowPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnContactFlowPropsValidator(properties).assertSuccess();
    return {
        Content: cdk.stringToCloudFormation(properties.content),
        InstanceArn: cdk.stringToCloudFormation(properties.instanceArn),
        Name: cdk.stringToCloudFormation(properties.name),
        Description: cdk.stringToCloudFormation(properties.description),
        State: cdk.stringToCloudFormation(properties.state),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnContactFlowPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnContactFlowProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnContactFlowProps>();
    ret.addPropertyResult('content', 'Content', cfn_parse.FromCloudFormation.getString(properties.Content));
    ret.addPropertyResult('instanceArn', 'InstanceArn', cfn_parse.FromCloudFormation.getString(properties.InstanceArn));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('state', 'State', properties.State != null ? cfn_parse.FromCloudFormation.getString(properties.State) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Connect::ContactFlow`
 *
 * The `AWS::Connect::ContactFlow` resource specifies a contact flow for the specified Amazon Connect instance.
 *
 * @cloudformationResource AWS::Connect::ContactFlow
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html
 */
export class CfnContactFlow extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Connect::ContactFlow";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnContactFlow {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnContactFlowPropsFromCloudFormation(resourceProperties);
        const ret = new CfnContactFlow(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * `Ref` returns the contact flow Amazon Resource Name (ARN). For example:
     *
     * `{ "Ref": "myContactFlowArn" }`
     * @cloudformationAttribute ContactFlowArn
     */
    public readonly attrContactFlowArn: string;

    /**
     * The content of the contact flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html#cfn-connect-contactflow-content
     */
    public content: string;

    /**
     * The Amazon Resource Name (ARN) of the Amazon Connect instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html#cfn-connect-contactflow-instancearn
     */
    public instanceArn: string;

    /**
     * The name of the contact flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html#cfn-connect-contactflow-name
     */
    public name: string;

    /**
     * The description of the contact flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html#cfn-connect-contactflow-description
     */
    public description: string | undefined;

    /**
     * The state of the contact flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html#cfn-connect-contactflow-state
     */
    public state: string | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html#cfn-connect-contactflow-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The type of the contact flow. For descriptions of the available types, see [Choose a Contact Flow Type](https://docs.aws.amazon.com/connect/latest/adminguide/create-contact-flow.html#contact-flow-types) in the *Amazon Connect Administrator Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflow.html#cfn-connect-contactflow-type
     */
    public type: string | undefined;

    /**
     * Create a new `AWS::Connect::ContactFlow`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnContactFlowProps) {
        super(scope, id, { type: CfnContactFlow.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'content', this);
        cdk.requireProperty(props, 'instanceArn', this);
        cdk.requireProperty(props, 'name', this);
        this.attrContactFlowArn = cdk.Token.asString(this.getAtt('ContactFlowArn'));

        this.content = props.content;
        this.instanceArn = props.instanceArn;
        this.name = props.name;
        this.description = props.description;
        this.state = props.state;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Connect::ContactFlow", props.tags, { tagPropertyName: 'tags' });
        this.type = props.type;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnContactFlow.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            content: this.content,
            instanceArn: this.instanceArn,
            name: this.name,
            description: this.description,
            state: this.state,
            tags: this.tags.renderTags(),
            type: this.type,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnContactFlowPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnContactFlowModule`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflowmodule.html
 */
export interface CfnContactFlowModuleProps {

    /**
     * The content of the contact flow module.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflowmodule.html#cfn-connect-contactflowmodule-content
     */
    readonly content: string;

    /**
     * The Amazon Resource Name (ARN) of the Amazon Connect instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflowmodule.html#cfn-connect-contactflowmodule-instancearn
     */
    readonly instanceArn: string;

    /**
     * The name of the contact flow module.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflowmodule.html#cfn-connect-contactflowmodule-name
     */
    readonly name: string;

    /**
     * The description of the contact flow module.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflowmodule.html#cfn-connect-contactflowmodule-description
     */
    readonly description?: string;

    /**
     * The state of the contact flow module.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflowmodule.html#cfn-connect-contactflowmodule-state
     */
    readonly state?: string;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflowmodule.html#cfn-connect-contactflowmodule-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnContactFlowModuleProps`
 *
 * @param properties - the TypeScript properties of a `CfnContactFlowModuleProps`
 *
 * @returns the result of the validation.
 */
function CfnContactFlowModulePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('content', cdk.requiredValidator)(properties.content));
    errors.collect(cdk.propertyValidator('content', cdk.validateString)(properties.content));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.requiredValidator)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.validateString)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('state', cdk.validateString)(properties.state));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnContactFlowModuleProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Connect::ContactFlowModule` resource
 *
 * @param properties - the TypeScript properties of a `CfnContactFlowModuleProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Connect::ContactFlowModule` resource.
 */
// @ts-ignore TS6133
function cfnContactFlowModulePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnContactFlowModulePropsValidator(properties).assertSuccess();
    return {
        Content: cdk.stringToCloudFormation(properties.content),
        InstanceArn: cdk.stringToCloudFormation(properties.instanceArn),
        Name: cdk.stringToCloudFormation(properties.name),
        Description: cdk.stringToCloudFormation(properties.description),
        State: cdk.stringToCloudFormation(properties.state),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnContactFlowModulePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnContactFlowModuleProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnContactFlowModuleProps>();
    ret.addPropertyResult('content', 'Content', cfn_parse.FromCloudFormation.getString(properties.Content));
    ret.addPropertyResult('instanceArn', 'InstanceArn', cfn_parse.FromCloudFormation.getString(properties.InstanceArn));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('state', 'State', properties.State != null ? cfn_parse.FromCloudFormation.getString(properties.State) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Connect::ContactFlowModule`
 *
 * The `AWS::Connect::ContactFlowModule` resource specifies a contact flow module for the specified Amazon Connect instance.
 *
 * @cloudformationResource AWS::Connect::ContactFlowModule
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflowmodule.html
 */
export class CfnContactFlowModule extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Connect::ContactFlowModule";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnContactFlowModule {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnContactFlowModulePropsFromCloudFormation(resourceProperties);
        const ret = new CfnContactFlowModule(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * `Ref` returns the contact flow module Amazon Resource Name (ARN). For example:
     *
     * `{ "Ref": "myContactFlowModuleArn" }`
     * @cloudformationAttribute ContactFlowModuleArn
     */
    public readonly attrContactFlowModuleArn: string;

    /**
     *
     * @cloudformationAttribute Status
     */
    public readonly attrStatus: string;

    /**
     * The content of the contact flow module.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflowmodule.html#cfn-connect-contactflowmodule-content
     */
    public content: string;

    /**
     * The Amazon Resource Name (ARN) of the Amazon Connect instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflowmodule.html#cfn-connect-contactflowmodule-instancearn
     */
    public instanceArn: string;

    /**
     * The name of the contact flow module.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflowmodule.html#cfn-connect-contactflowmodule-name
     */
    public name: string;

    /**
     * The description of the contact flow module.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflowmodule.html#cfn-connect-contactflowmodule-description
     */
    public description: string | undefined;

    /**
     * The state of the contact flow module.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflowmodule.html#cfn-connect-contactflowmodule-state
     */
    public state: string | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-contactflowmodule.html#cfn-connect-contactflowmodule-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Connect::ContactFlowModule`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnContactFlowModuleProps) {
        super(scope, id, { type: CfnContactFlowModule.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'content', this);
        cdk.requireProperty(props, 'instanceArn', this);
        cdk.requireProperty(props, 'name', this);
        this.attrContactFlowModuleArn = cdk.Token.asString(this.getAtt('ContactFlowModuleArn'));
        this.attrStatus = cdk.Token.asString(this.getAtt('Status'));

        this.content = props.content;
        this.instanceArn = props.instanceArn;
        this.name = props.name;
        this.description = props.description;
        this.state = props.state;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Connect::ContactFlowModule", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnContactFlowModule.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            content: this.content,
            instanceArn: this.instanceArn,
            name: this.name,
            description: this.description,
            state: this.state,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnContactFlowModulePropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnHoursOfOperation`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html
 */
export interface CfnHoursOfOperationProps {

    /**
     * Configuration information for the hours of operation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html#cfn-connect-hoursofoperation-config
     */
    readonly config: Array<CfnHoursOfOperation.HoursOfOperationConfigProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) for the instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html#cfn-connect-hoursofoperation-instancearn
     */
    readonly instanceArn: string;

    /**
     * The name for the hours of operation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html#cfn-connect-hoursofoperation-name
     */
    readonly name: string;

    /**
     * The time zone for the hours of operation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html#cfn-connect-hoursofoperation-timezone
     */
    readonly timeZone: string;

    /**
     * The description for the hours of operation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html#cfn-connect-hoursofoperation-description
     */
    readonly description?: string;

    /**
     * The tags used to organize, track, or control access for this resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html#cfn-connect-hoursofoperation-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnHoursOfOperationProps`
 *
 * @param properties - the TypeScript properties of a `CfnHoursOfOperationProps`
 *
 * @returns the result of the validation.
 */
function CfnHoursOfOperationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('config', cdk.requiredValidator)(properties.config));
    errors.collect(cdk.propertyValidator('config', cdk.listValidator(CfnHoursOfOperation_HoursOfOperationConfigPropertyValidator))(properties.config));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.requiredValidator)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.validateString)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('timeZone', cdk.requiredValidator)(properties.timeZone));
    errors.collect(cdk.propertyValidator('timeZone', cdk.validateString)(properties.timeZone));
    return errors.wrap('supplied properties not correct for "CfnHoursOfOperationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Connect::HoursOfOperation` resource
 *
 * @param properties - the TypeScript properties of a `CfnHoursOfOperationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Connect::HoursOfOperation` resource.
 */
// @ts-ignore TS6133
function cfnHoursOfOperationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnHoursOfOperationPropsValidator(properties).assertSuccess();
    return {
        Config: cdk.listMapper(cfnHoursOfOperationHoursOfOperationConfigPropertyToCloudFormation)(properties.config),
        InstanceArn: cdk.stringToCloudFormation(properties.instanceArn),
        Name: cdk.stringToCloudFormation(properties.name),
        TimeZone: cdk.stringToCloudFormation(properties.timeZone),
        Description: cdk.stringToCloudFormation(properties.description),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnHoursOfOperationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnHoursOfOperationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnHoursOfOperationProps>();
    ret.addPropertyResult('config', 'Config', cfn_parse.FromCloudFormation.getArray(CfnHoursOfOperationHoursOfOperationConfigPropertyFromCloudFormation)(properties.Config));
    ret.addPropertyResult('instanceArn', 'InstanceArn', cfn_parse.FromCloudFormation.getString(properties.InstanceArn));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('timeZone', 'TimeZone', cfn_parse.FromCloudFormation.getString(properties.TimeZone));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Connect::HoursOfOperation`
 *
 * Creates hours of operation.
 *
 * @cloudformationResource AWS::Connect::HoursOfOperation
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html
 */
export class CfnHoursOfOperation extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Connect::HoursOfOperation";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnHoursOfOperation {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnHoursOfOperationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnHoursOfOperation(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) for the hours of operation.
     * @cloudformationAttribute HoursOfOperationArn
     */
    public readonly attrHoursOfOperationArn: string;

    /**
     * Configuration information for the hours of operation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html#cfn-connect-hoursofoperation-config
     */
    public config: Array<CfnHoursOfOperation.HoursOfOperationConfigProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) for the instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html#cfn-connect-hoursofoperation-instancearn
     */
    public instanceArn: string;

    /**
     * The name for the hours of operation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html#cfn-connect-hoursofoperation-name
     */
    public name: string;

    /**
     * The time zone for the hours of operation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html#cfn-connect-hoursofoperation-timezone
     */
    public timeZone: string;

    /**
     * The description for the hours of operation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html#cfn-connect-hoursofoperation-description
     */
    public description: string | undefined;

    /**
     * The tags used to organize, track, or control access for this resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html#cfn-connect-hoursofoperation-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Connect::HoursOfOperation`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnHoursOfOperationProps) {
        super(scope, id, { type: CfnHoursOfOperation.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'config', this);
        cdk.requireProperty(props, 'instanceArn', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'timeZone', this);
        this.attrHoursOfOperationArn = cdk.Token.asString(this.getAtt('HoursOfOperationArn'));

        this.config = props.config;
        this.instanceArn = props.instanceArn;
        this.name = props.name;
        this.timeZone = props.timeZone;
        this.description = props.description;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Connect::HoursOfOperation", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnHoursOfOperation.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            config: this.config,
            instanceArn: this.instanceArn,
            name: this.name,
            timeZone: this.timeZone,
            description: this.description,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnHoursOfOperationPropsToCloudFormation(props);
    }
}

export namespace CfnHoursOfOperation {
    /**
     * Contains information about the hours of operation.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-hoursofoperation-hoursofoperationconfig.html
     */
    export interface HoursOfOperationConfigProperty {
        /**
         * The day that the hours of operation applies to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-hoursofoperation-hoursofoperationconfig.html#cfn-connect-hoursofoperation-hoursofoperationconfig-day
         */
        readonly day: string;
        /**
         * The end time that your contact center closes.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-hoursofoperation-hoursofoperationconfig.html#cfn-connect-hoursofoperation-hoursofoperationconfig-endtime
         */
        readonly endTime: CfnHoursOfOperation.HoursOfOperationTimeSliceProperty | cdk.IResolvable;
        /**
         * The start time that your contact center opens.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-hoursofoperation-hoursofoperationconfig.html#cfn-connect-hoursofoperation-hoursofoperationconfig-starttime
         */
        readonly startTime: CfnHoursOfOperation.HoursOfOperationTimeSliceProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `HoursOfOperationConfigProperty`
 *
 * @param properties - the TypeScript properties of a `HoursOfOperationConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnHoursOfOperation_HoursOfOperationConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('day', cdk.requiredValidator)(properties.day));
    errors.collect(cdk.propertyValidator('day', cdk.validateString)(properties.day));
    errors.collect(cdk.propertyValidator('endTime', cdk.requiredValidator)(properties.endTime));
    errors.collect(cdk.propertyValidator('endTime', CfnHoursOfOperation_HoursOfOperationTimeSlicePropertyValidator)(properties.endTime));
    errors.collect(cdk.propertyValidator('startTime', cdk.requiredValidator)(properties.startTime));
    errors.collect(cdk.propertyValidator('startTime', CfnHoursOfOperation_HoursOfOperationTimeSlicePropertyValidator)(properties.startTime));
    return errors.wrap('supplied properties not correct for "HoursOfOperationConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Connect::HoursOfOperation.HoursOfOperationConfig` resource
 *
 * @param properties - the TypeScript properties of a `HoursOfOperationConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Connect::HoursOfOperation.HoursOfOperationConfig` resource.
 */
// @ts-ignore TS6133
function cfnHoursOfOperationHoursOfOperationConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnHoursOfOperation_HoursOfOperationConfigPropertyValidator(properties).assertSuccess();
    return {
        Day: cdk.stringToCloudFormation(properties.day),
        EndTime: cfnHoursOfOperationHoursOfOperationTimeSlicePropertyToCloudFormation(properties.endTime),
        StartTime: cfnHoursOfOperationHoursOfOperationTimeSlicePropertyToCloudFormation(properties.startTime),
    };
}

// @ts-ignore TS6133
function CfnHoursOfOperationHoursOfOperationConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnHoursOfOperation.HoursOfOperationConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnHoursOfOperation.HoursOfOperationConfigProperty>();
    ret.addPropertyResult('day', 'Day', cfn_parse.FromCloudFormation.getString(properties.Day));
    ret.addPropertyResult('endTime', 'EndTime', CfnHoursOfOperationHoursOfOperationTimeSlicePropertyFromCloudFormation(properties.EndTime));
    ret.addPropertyResult('startTime', 'StartTime', CfnHoursOfOperationHoursOfOperationTimeSlicePropertyFromCloudFormation(properties.StartTime));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnHoursOfOperation {
    /**
     * The start time or end time for an hours of operation.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-hoursofoperation-hoursofoperationtimeslice.html
     */
    export interface HoursOfOperationTimeSliceProperty {
        /**
         * The hours.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-hoursofoperation-hoursofoperationtimeslice.html#cfn-connect-hoursofoperation-hoursofoperationtimeslice-hours
         */
        readonly hours: number;
        /**
         * The minutes.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-hoursofoperation-hoursofoperationtimeslice.html#cfn-connect-hoursofoperation-hoursofoperationtimeslice-minutes
         */
        readonly minutes: number;
    }
}

/**
 * Determine whether the given properties match those of a `HoursOfOperationTimeSliceProperty`
 *
 * @param properties - the TypeScript properties of a `HoursOfOperationTimeSliceProperty`
 *
 * @returns the result of the validation.
 */
function CfnHoursOfOperation_HoursOfOperationTimeSlicePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('hours', cdk.requiredValidator)(properties.hours));
    errors.collect(cdk.propertyValidator('hours', cdk.validateNumber)(properties.hours));
    errors.collect(cdk.propertyValidator('minutes', cdk.requiredValidator)(properties.minutes));
    errors.collect(cdk.propertyValidator('minutes', cdk.validateNumber)(properties.minutes));
    return errors.wrap('supplied properties not correct for "HoursOfOperationTimeSliceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Connect::HoursOfOperation.HoursOfOperationTimeSlice` resource
 *
 * @param properties - the TypeScript properties of a `HoursOfOperationTimeSliceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Connect::HoursOfOperation.HoursOfOperationTimeSlice` resource.
 */
// @ts-ignore TS6133
function cfnHoursOfOperationHoursOfOperationTimeSlicePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnHoursOfOperation_HoursOfOperationTimeSlicePropertyValidator(properties).assertSuccess();
    return {
        Hours: cdk.numberToCloudFormation(properties.hours),
        Minutes: cdk.numberToCloudFormation(properties.minutes),
    };
}

// @ts-ignore TS6133
function CfnHoursOfOperationHoursOfOperationTimeSlicePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnHoursOfOperation.HoursOfOperationTimeSliceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnHoursOfOperation.HoursOfOperationTimeSliceProperty>();
    ret.addPropertyResult('hours', 'Hours', cfn_parse.FromCloudFormation.getNumber(properties.Hours));
    ret.addPropertyResult('minutes', 'Minutes', cfn_parse.FromCloudFormation.getNumber(properties.Minutes));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnQuickConnect`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-quickconnect.html
 */
export interface CfnQuickConnectProps {

    /**
     * The Amazon Resource Name (ARN) of the instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-quickconnect.html#cfn-connect-quickconnect-instancearn
     */
    readonly instanceArn: string;

    /**
     * The name of the quick connect.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-quickconnect.html#cfn-connect-quickconnect-name
     */
    readonly name: string;

    /**
     * Contains information about the quick connect.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-quickconnect.html#cfn-connect-quickconnect-quickconnectconfig
     */
    readonly quickConnectConfig: CfnQuickConnect.QuickConnectConfigProperty | cdk.IResolvable;

    /**
     * The description of the quick connect.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-quickconnect.html#cfn-connect-quickconnect-description
     */
    readonly description?: string;

    /**
     * The tags used to organize, track, or control access for this resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-quickconnect.html#cfn-connect-quickconnect-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnQuickConnectProps`
 *
 * @param properties - the TypeScript properties of a `CfnQuickConnectProps`
 *
 * @returns the result of the validation.
 */
function CfnQuickConnectPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.requiredValidator)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.validateString)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('quickConnectConfig', cdk.requiredValidator)(properties.quickConnectConfig));
    errors.collect(cdk.propertyValidator('quickConnectConfig', CfnQuickConnect_QuickConnectConfigPropertyValidator)(properties.quickConnectConfig));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnQuickConnectProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Connect::QuickConnect` resource
 *
 * @param properties - the TypeScript properties of a `CfnQuickConnectProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Connect::QuickConnect` resource.
 */
// @ts-ignore TS6133
function cfnQuickConnectPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnQuickConnectPropsValidator(properties).assertSuccess();
    return {
        InstanceArn: cdk.stringToCloudFormation(properties.instanceArn),
        Name: cdk.stringToCloudFormation(properties.name),
        QuickConnectConfig: cfnQuickConnectQuickConnectConfigPropertyToCloudFormation(properties.quickConnectConfig),
        Description: cdk.stringToCloudFormation(properties.description),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnQuickConnectPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnQuickConnectProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnQuickConnectProps>();
    ret.addPropertyResult('instanceArn', 'InstanceArn', cfn_parse.FromCloudFormation.getString(properties.InstanceArn));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('quickConnectConfig', 'QuickConnectConfig', CfnQuickConnectQuickConnectConfigPropertyFromCloudFormation(properties.QuickConnectConfig));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Connect::QuickConnect`
 *
 * The `AWS::Connect::QuickConnnect` resource specifies a quick connect for the specified Amazon Connect instance.
 *
 * @cloudformationResource AWS::Connect::QuickConnect
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-quickconnect.html
 */
export class CfnQuickConnect extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Connect::QuickConnect";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnQuickConnect {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnQuickConnectPropsFromCloudFormation(resourceProperties);
        const ret = new CfnQuickConnect(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the quick connect.
     * @cloudformationAttribute QuickConnectArn
     */
    public readonly attrQuickConnectArn: string;

    /**
     * The Amazon Resource Name (ARN) of the instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-quickconnect.html#cfn-connect-quickconnect-instancearn
     */
    public instanceArn: string;

    /**
     * The name of the quick connect.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-quickconnect.html#cfn-connect-quickconnect-name
     */
    public name: string;

    /**
     * Contains information about the quick connect.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-quickconnect.html#cfn-connect-quickconnect-quickconnectconfig
     */
    public quickConnectConfig: CfnQuickConnect.QuickConnectConfigProperty | cdk.IResolvable;

    /**
     * The description of the quick connect.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-quickconnect.html#cfn-connect-quickconnect-description
     */
    public description: string | undefined;

    /**
     * The tags used to organize, track, or control access for this resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-quickconnect.html#cfn-connect-quickconnect-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Connect::QuickConnect`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnQuickConnectProps) {
        super(scope, id, { type: CfnQuickConnect.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'instanceArn', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'quickConnectConfig', this);
        this.attrQuickConnectArn = cdk.Token.asString(this.getAtt('QuickConnectArn'));

        this.instanceArn = props.instanceArn;
        this.name = props.name;
        this.quickConnectConfig = props.quickConnectConfig;
        this.description = props.description;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Connect::QuickConnect", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnQuickConnect.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            instanceArn: this.instanceArn,
            name: this.name,
            quickConnectConfig: this.quickConnectConfig,
            description: this.description,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnQuickConnectPropsToCloudFormation(props);
    }
}

export namespace CfnQuickConnect {
    /**
     * Contains information about a phone number for a quick connect.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-quickconnect-phonenumberquickconnectconfig.html
     */
    export interface PhoneNumberQuickConnectConfigProperty {
        /**
         * The phone number in E.164 format.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-quickconnect-phonenumberquickconnectconfig.html#cfn-connect-quickconnect-phonenumberquickconnectconfig-phonenumber
         */
        readonly phoneNumber: string;
    }
}

/**
 * Determine whether the given properties match those of a `PhoneNumberQuickConnectConfigProperty`
 *
 * @param properties - the TypeScript properties of a `PhoneNumberQuickConnectConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnQuickConnect_PhoneNumberQuickConnectConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('phoneNumber', cdk.requiredValidator)(properties.phoneNumber));
    errors.collect(cdk.propertyValidator('phoneNumber', cdk.validateString)(properties.phoneNumber));
    return errors.wrap('supplied properties not correct for "PhoneNumberQuickConnectConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Connect::QuickConnect.PhoneNumberQuickConnectConfig` resource
 *
 * @param properties - the TypeScript properties of a `PhoneNumberQuickConnectConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Connect::QuickConnect.PhoneNumberQuickConnectConfig` resource.
 */
// @ts-ignore TS6133
function cfnQuickConnectPhoneNumberQuickConnectConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnQuickConnect_PhoneNumberQuickConnectConfigPropertyValidator(properties).assertSuccess();
    return {
        PhoneNumber: cdk.stringToCloudFormation(properties.phoneNumber),
    };
}

// @ts-ignore TS6133
function CfnQuickConnectPhoneNumberQuickConnectConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnQuickConnect.PhoneNumberQuickConnectConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnQuickConnect.PhoneNumberQuickConnectConfigProperty>();
    ret.addPropertyResult('phoneNumber', 'PhoneNumber', cfn_parse.FromCloudFormation.getString(properties.PhoneNumber));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnQuickConnect {
    /**
     * Contains information about a queue for a quick connect. The contact flow must be of type Transfer to Queue.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-quickconnect-queuequickconnectconfig.html
     */
    export interface QueueQuickConnectConfigProperty {
        /**
         * The Amazon Resource Name (ARN) of the contact flow.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-quickconnect-queuequickconnectconfig.html#cfn-connect-quickconnect-queuequickconnectconfig-contactflowarn
         */
        readonly contactFlowArn: string;
        /**
         * The Amazon Resource Name (ARN) of the queue.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-quickconnect-queuequickconnectconfig.html#cfn-connect-quickconnect-queuequickconnectconfig-queuearn
         */
        readonly queueArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `QueueQuickConnectConfigProperty`
 *
 * @param properties - the TypeScript properties of a `QueueQuickConnectConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnQuickConnect_QueueQuickConnectConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('contactFlowArn', cdk.requiredValidator)(properties.contactFlowArn));
    errors.collect(cdk.propertyValidator('contactFlowArn', cdk.validateString)(properties.contactFlowArn));
    errors.collect(cdk.propertyValidator('queueArn', cdk.requiredValidator)(properties.queueArn));
    errors.collect(cdk.propertyValidator('queueArn', cdk.validateString)(properties.queueArn));
    return errors.wrap('supplied properties not correct for "QueueQuickConnectConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Connect::QuickConnect.QueueQuickConnectConfig` resource
 *
 * @param properties - the TypeScript properties of a `QueueQuickConnectConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Connect::QuickConnect.QueueQuickConnectConfig` resource.
 */
// @ts-ignore TS6133
function cfnQuickConnectQueueQuickConnectConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnQuickConnect_QueueQuickConnectConfigPropertyValidator(properties).assertSuccess();
    return {
        ContactFlowArn: cdk.stringToCloudFormation(properties.contactFlowArn),
        QueueArn: cdk.stringToCloudFormation(properties.queueArn),
    };
}

// @ts-ignore TS6133
function CfnQuickConnectQueueQuickConnectConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnQuickConnect.QueueQuickConnectConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnQuickConnect.QueueQuickConnectConfigProperty>();
    ret.addPropertyResult('contactFlowArn', 'ContactFlowArn', cfn_parse.FromCloudFormation.getString(properties.ContactFlowArn));
    ret.addPropertyResult('queueArn', 'QueueArn', cfn_parse.FromCloudFormation.getString(properties.QueueArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnQuickConnect {
    /**
     * Contains configuration settings for a quick connect.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-quickconnect-quickconnectconfig.html
     */
    export interface QuickConnectConfigProperty {
        /**
         * The phone configuration. This is required only if QuickConnectType is PHONE_NUMBER.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-quickconnect-quickconnectconfig.html#cfn-connect-quickconnect-quickconnectconfig-phoneconfig
         */
        readonly phoneConfig?: CfnQuickConnect.PhoneNumberQuickConnectConfigProperty | cdk.IResolvable;
        /**
         * The queue configuration. This is required only if QuickConnectType is QUEUE.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-quickconnect-quickconnectconfig.html#cfn-connect-quickconnect-quickconnectconfig-queueconfig
         */
        readonly queueConfig?: CfnQuickConnect.QueueQuickConnectConfigProperty | cdk.IResolvable;
        /**
         * The type of quick connect. In the Amazon Connect console, when you create a quick connect, you are prompted to assign one of the following types: Agent (USER), External (PHONE_NUMBER), or Queue (QUEUE).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-quickconnect-quickconnectconfig.html#cfn-connect-quickconnect-quickconnectconfig-quickconnecttype
         */
        readonly quickConnectType: string;
        /**
         * The user configuration. This is required only if QuickConnectType is USER.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-quickconnect-quickconnectconfig.html#cfn-connect-quickconnect-quickconnectconfig-userconfig
         */
        readonly userConfig?: CfnQuickConnect.UserQuickConnectConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `QuickConnectConfigProperty`
 *
 * @param properties - the TypeScript properties of a `QuickConnectConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnQuickConnect_QuickConnectConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('phoneConfig', CfnQuickConnect_PhoneNumberQuickConnectConfigPropertyValidator)(properties.phoneConfig));
    errors.collect(cdk.propertyValidator('queueConfig', CfnQuickConnect_QueueQuickConnectConfigPropertyValidator)(properties.queueConfig));
    errors.collect(cdk.propertyValidator('quickConnectType', cdk.requiredValidator)(properties.quickConnectType));
    errors.collect(cdk.propertyValidator('quickConnectType', cdk.validateString)(properties.quickConnectType));
    errors.collect(cdk.propertyValidator('userConfig', CfnQuickConnect_UserQuickConnectConfigPropertyValidator)(properties.userConfig));
    return errors.wrap('supplied properties not correct for "QuickConnectConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Connect::QuickConnect.QuickConnectConfig` resource
 *
 * @param properties - the TypeScript properties of a `QuickConnectConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Connect::QuickConnect.QuickConnectConfig` resource.
 */
// @ts-ignore TS6133
function cfnQuickConnectQuickConnectConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnQuickConnect_QuickConnectConfigPropertyValidator(properties).assertSuccess();
    return {
        PhoneConfig: cfnQuickConnectPhoneNumberQuickConnectConfigPropertyToCloudFormation(properties.phoneConfig),
        QueueConfig: cfnQuickConnectQueueQuickConnectConfigPropertyToCloudFormation(properties.queueConfig),
        QuickConnectType: cdk.stringToCloudFormation(properties.quickConnectType),
        UserConfig: cfnQuickConnectUserQuickConnectConfigPropertyToCloudFormation(properties.userConfig),
    };
}

// @ts-ignore TS6133
function CfnQuickConnectQuickConnectConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnQuickConnect.QuickConnectConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnQuickConnect.QuickConnectConfigProperty>();
    ret.addPropertyResult('phoneConfig', 'PhoneConfig', properties.PhoneConfig != null ? CfnQuickConnectPhoneNumberQuickConnectConfigPropertyFromCloudFormation(properties.PhoneConfig) : undefined);
    ret.addPropertyResult('queueConfig', 'QueueConfig', properties.QueueConfig != null ? CfnQuickConnectQueueQuickConnectConfigPropertyFromCloudFormation(properties.QueueConfig) : undefined);
    ret.addPropertyResult('quickConnectType', 'QuickConnectType', cfn_parse.FromCloudFormation.getString(properties.QuickConnectType));
    ret.addPropertyResult('userConfig', 'UserConfig', properties.UserConfig != null ? CfnQuickConnectUserQuickConnectConfigPropertyFromCloudFormation(properties.UserConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnQuickConnect {
    /**
     * Contains information about the quick connect configuration settings for a user. The contact flow must be of type Transfer to Agent.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-quickconnect-userquickconnectconfig.html
     */
    export interface UserQuickConnectConfigProperty {
        /**
         * The Amazon Resource Name (ARN) of the contact flow.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-quickconnect-userquickconnectconfig.html#cfn-connect-quickconnect-userquickconnectconfig-contactflowarn
         */
        readonly contactFlowArn: string;
        /**
         * The Amazon Resource Name (ARN) of the user.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-quickconnect-userquickconnectconfig.html#cfn-connect-quickconnect-userquickconnectconfig-userarn
         */
        readonly userArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `UserQuickConnectConfigProperty`
 *
 * @param properties - the TypeScript properties of a `UserQuickConnectConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnQuickConnect_UserQuickConnectConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('contactFlowArn', cdk.requiredValidator)(properties.contactFlowArn));
    errors.collect(cdk.propertyValidator('contactFlowArn', cdk.validateString)(properties.contactFlowArn));
    errors.collect(cdk.propertyValidator('userArn', cdk.requiredValidator)(properties.userArn));
    errors.collect(cdk.propertyValidator('userArn', cdk.validateString)(properties.userArn));
    return errors.wrap('supplied properties not correct for "UserQuickConnectConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Connect::QuickConnect.UserQuickConnectConfig` resource
 *
 * @param properties - the TypeScript properties of a `UserQuickConnectConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Connect::QuickConnect.UserQuickConnectConfig` resource.
 */
// @ts-ignore TS6133
function cfnQuickConnectUserQuickConnectConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnQuickConnect_UserQuickConnectConfigPropertyValidator(properties).assertSuccess();
    return {
        ContactFlowArn: cdk.stringToCloudFormation(properties.contactFlowArn),
        UserArn: cdk.stringToCloudFormation(properties.userArn),
    };
}

// @ts-ignore TS6133
function CfnQuickConnectUserQuickConnectConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnQuickConnect.UserQuickConnectConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnQuickConnect.UserQuickConnectConfigProperty>();
    ret.addPropertyResult('contactFlowArn', 'ContactFlowArn', cfn_parse.FromCloudFormation.getString(properties.ContactFlowArn));
    ret.addPropertyResult('userArn', 'UserArn', cfn_parse.FromCloudFormation.getString(properties.UserArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnUser`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html
 */
export interface CfnUserProps {

    /**
     * The Amazon Resource Name (ARN) of the instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-instancearn
     */
    readonly instanceArn: string;

    /**
     * Information about the phone configuration for the user.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-phoneconfig
     */
    readonly phoneConfig: CfnUser.UserPhoneConfigProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of the user's routing profile.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-routingprofilearn
     */
    readonly routingProfileArn: string;

    /**
     * The Amazon Resource Name (ARN) of the user's security profile.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-securityprofilearns
     */
    readonly securityProfileArns: string[];

    /**
     * The user name assigned to the user account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-username
     */
    readonly username: string;

    /**
     * The identifier of the user account in the directory used for identity management.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-directoryuserid
     */
    readonly directoryUserId?: string;

    /**
     * The Amazon Resource Name (ARN) of the user's hierarchy group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-hierarchygrouparn
     */
    readonly hierarchyGroupArn?: string;

    /**
     * Information about the user identity.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-identityinfo
     */
    readonly identityInfo?: CfnUser.UserIdentityInfoProperty | cdk.IResolvable;

    /**
     * The user's password.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-password
     */
    readonly password?: string;

    /**
     * The tags.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnUserProps`
 *
 * @param properties - the TypeScript properties of a `CfnUserProps`
 *
 * @returns the result of the validation.
 */
function CfnUserPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('directoryUserId', cdk.validateString)(properties.directoryUserId));
    errors.collect(cdk.propertyValidator('hierarchyGroupArn', cdk.validateString)(properties.hierarchyGroupArn));
    errors.collect(cdk.propertyValidator('identityInfo', CfnUser_UserIdentityInfoPropertyValidator)(properties.identityInfo));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.requiredValidator)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.validateString)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('password', cdk.validateString)(properties.password));
    errors.collect(cdk.propertyValidator('phoneConfig', cdk.requiredValidator)(properties.phoneConfig));
    errors.collect(cdk.propertyValidator('phoneConfig', CfnUser_UserPhoneConfigPropertyValidator)(properties.phoneConfig));
    errors.collect(cdk.propertyValidator('routingProfileArn', cdk.requiredValidator)(properties.routingProfileArn));
    errors.collect(cdk.propertyValidator('routingProfileArn', cdk.validateString)(properties.routingProfileArn));
    errors.collect(cdk.propertyValidator('securityProfileArns', cdk.requiredValidator)(properties.securityProfileArns));
    errors.collect(cdk.propertyValidator('securityProfileArns', cdk.listValidator(cdk.validateString))(properties.securityProfileArns));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('username', cdk.requiredValidator)(properties.username));
    errors.collect(cdk.propertyValidator('username', cdk.validateString)(properties.username));
    return errors.wrap('supplied properties not correct for "CfnUserProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Connect::User` resource
 *
 * @param properties - the TypeScript properties of a `CfnUserProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Connect::User` resource.
 */
// @ts-ignore TS6133
function cfnUserPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUserPropsValidator(properties).assertSuccess();
    return {
        InstanceArn: cdk.stringToCloudFormation(properties.instanceArn),
        PhoneConfig: cfnUserUserPhoneConfigPropertyToCloudFormation(properties.phoneConfig),
        RoutingProfileArn: cdk.stringToCloudFormation(properties.routingProfileArn),
        SecurityProfileArns: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityProfileArns),
        Username: cdk.stringToCloudFormation(properties.username),
        DirectoryUserId: cdk.stringToCloudFormation(properties.directoryUserId),
        HierarchyGroupArn: cdk.stringToCloudFormation(properties.hierarchyGroupArn),
        IdentityInfo: cfnUserUserIdentityInfoPropertyToCloudFormation(properties.identityInfo),
        Password: cdk.stringToCloudFormation(properties.password),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnUserPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUserProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUserProps>();
    ret.addPropertyResult('instanceArn', 'InstanceArn', cfn_parse.FromCloudFormation.getString(properties.InstanceArn));
    ret.addPropertyResult('phoneConfig', 'PhoneConfig', CfnUserUserPhoneConfigPropertyFromCloudFormation(properties.PhoneConfig));
    ret.addPropertyResult('routingProfileArn', 'RoutingProfileArn', cfn_parse.FromCloudFormation.getString(properties.RoutingProfileArn));
    ret.addPropertyResult('securityProfileArns', 'SecurityProfileArns', cfn_parse.FromCloudFormation.getStringArray(properties.SecurityProfileArns));
    ret.addPropertyResult('username', 'Username', cfn_parse.FromCloudFormation.getString(properties.Username));
    ret.addPropertyResult('directoryUserId', 'DirectoryUserId', properties.DirectoryUserId != null ? cfn_parse.FromCloudFormation.getString(properties.DirectoryUserId) : undefined);
    ret.addPropertyResult('hierarchyGroupArn', 'HierarchyGroupArn', properties.HierarchyGroupArn != null ? cfn_parse.FromCloudFormation.getString(properties.HierarchyGroupArn) : undefined);
    ret.addPropertyResult('identityInfo', 'IdentityInfo', properties.IdentityInfo != null ? CfnUserUserIdentityInfoPropertyFromCloudFormation(properties.IdentityInfo) : undefined);
    ret.addPropertyResult('password', 'Password', properties.Password != null ? cfn_parse.FromCloudFormation.getString(properties.Password) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Connect::User`
 *
 * Creates a user account for the specified Amazon Connect instance.
 *
 * For information about how to create user accounts using the Amazon Connect console, see [Add Users](https://docs.aws.amazon.com/connect/latest/adminguide/user-management.html) in the *Amazon Connect Administrator Guide* .
 *
 * @cloudformationResource AWS::Connect::User
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html
 */
export class CfnUser extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Connect::User";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnUser {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnUserPropsFromCloudFormation(resourceProperties);
        const ret = new CfnUser(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the user.
     * @cloudformationAttribute UserArn
     */
    public readonly attrUserArn: string;

    /**
     * The Amazon Resource Name (ARN) of the instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-instancearn
     */
    public instanceArn: string;

    /**
     * Information about the phone configuration for the user.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-phoneconfig
     */
    public phoneConfig: CfnUser.UserPhoneConfigProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of the user's routing profile.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-routingprofilearn
     */
    public routingProfileArn: string;

    /**
     * The Amazon Resource Name (ARN) of the user's security profile.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-securityprofilearns
     */
    public securityProfileArns: string[];

    /**
     * The user name assigned to the user account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-username
     */
    public username: string;

    /**
     * The identifier of the user account in the directory used for identity management.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-directoryuserid
     */
    public directoryUserId: string | undefined;

    /**
     * The Amazon Resource Name (ARN) of the user's hierarchy group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-hierarchygrouparn
     */
    public hierarchyGroupArn: string | undefined;

    /**
     * Information about the user identity.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-identityinfo
     */
    public identityInfo: CfnUser.UserIdentityInfoProperty | cdk.IResolvable | undefined;

    /**
     * The user's password.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-password
     */
    public password: string | undefined;

    /**
     * The tags.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html#cfn-connect-user-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Connect::User`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnUserProps) {
        super(scope, id, { type: CfnUser.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'instanceArn', this);
        cdk.requireProperty(props, 'phoneConfig', this);
        cdk.requireProperty(props, 'routingProfileArn', this);
        cdk.requireProperty(props, 'securityProfileArns', this);
        cdk.requireProperty(props, 'username', this);
        this.attrUserArn = cdk.Token.asString(this.getAtt('UserArn'));

        this.instanceArn = props.instanceArn;
        this.phoneConfig = props.phoneConfig;
        this.routingProfileArn = props.routingProfileArn;
        this.securityProfileArns = props.securityProfileArns;
        this.username = props.username;
        this.directoryUserId = props.directoryUserId;
        this.hierarchyGroupArn = props.hierarchyGroupArn;
        this.identityInfo = props.identityInfo;
        this.password = props.password;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Connect::User", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnUser.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            instanceArn: this.instanceArn,
            phoneConfig: this.phoneConfig,
            routingProfileArn: this.routingProfileArn,
            securityProfileArns: this.securityProfileArns,
            username: this.username,
            directoryUserId: this.directoryUserId,
            hierarchyGroupArn: this.hierarchyGroupArn,
            identityInfo: this.identityInfo,
            password: this.password,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnUserPropsToCloudFormation(props);
    }
}

export namespace CfnUser {
    /**
     * Contains information about the identity of a user.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-user-useridentityinfo.html
     */
    export interface UserIdentityInfoProperty {
        /**
         * The email address. If you are using SAML for identity management and include this parameter, an error is returned.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-user-useridentityinfo.html#cfn-connect-user-useridentityinfo-email
         */
        readonly email?: string;
        /**
         * The first name. This is required if you are using Amazon Connect or SAML for identity management.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-user-useridentityinfo.html#cfn-connect-user-useridentityinfo-firstname
         */
        readonly firstName?: string;
        /**
         * The last name. This is required if you are using Amazon Connect or SAML for identity management.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-user-useridentityinfo.html#cfn-connect-user-useridentityinfo-lastname
         */
        readonly lastName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `UserIdentityInfoProperty`
 *
 * @param properties - the TypeScript properties of a `UserIdentityInfoProperty`
 *
 * @returns the result of the validation.
 */
function CfnUser_UserIdentityInfoPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('email', cdk.validateString)(properties.email));
    errors.collect(cdk.propertyValidator('firstName', cdk.validateString)(properties.firstName));
    errors.collect(cdk.propertyValidator('lastName', cdk.validateString)(properties.lastName));
    return errors.wrap('supplied properties not correct for "UserIdentityInfoProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Connect::User.UserIdentityInfo` resource
 *
 * @param properties - the TypeScript properties of a `UserIdentityInfoProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Connect::User.UserIdentityInfo` resource.
 */
// @ts-ignore TS6133
function cfnUserUserIdentityInfoPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUser_UserIdentityInfoPropertyValidator(properties).assertSuccess();
    return {
        Email: cdk.stringToCloudFormation(properties.email),
        FirstName: cdk.stringToCloudFormation(properties.firstName),
        LastName: cdk.stringToCloudFormation(properties.lastName),
    };
}

// @ts-ignore TS6133
function CfnUserUserIdentityInfoPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUser.UserIdentityInfoProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUser.UserIdentityInfoProperty>();
    ret.addPropertyResult('email', 'Email', properties.Email != null ? cfn_parse.FromCloudFormation.getString(properties.Email) : undefined);
    ret.addPropertyResult('firstName', 'FirstName', properties.FirstName != null ? cfn_parse.FromCloudFormation.getString(properties.FirstName) : undefined);
    ret.addPropertyResult('lastName', 'LastName', properties.LastName != null ? cfn_parse.FromCloudFormation.getString(properties.LastName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnUser {
    /**
     * Contains information about the phone configuration settings for a user.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-user-userphoneconfig.html
     */
    export interface UserPhoneConfigProperty {
        /**
         * The After Call Work (ACW) timeout setting, in seconds.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-user-userphoneconfig.html#cfn-connect-user-userphoneconfig-aftercontactworktimelimit
         */
        readonly afterContactWorkTimeLimit?: number;
        /**
         * The Auto accept setting.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-user-userphoneconfig.html#cfn-connect-user-userphoneconfig-autoaccept
         */
        readonly autoAccept?: boolean | cdk.IResolvable;
        /**
         * The phone number for the user's desk phone.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-user-userphoneconfig.html#cfn-connect-user-userphoneconfig-deskphonenumber
         */
        readonly deskPhoneNumber?: string;
        /**
         * The phone type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-connect-user-userphoneconfig.html#cfn-connect-user-userphoneconfig-phonetype
         */
        readonly phoneType: string;
    }
}

/**
 * Determine whether the given properties match those of a `UserPhoneConfigProperty`
 *
 * @param properties - the TypeScript properties of a `UserPhoneConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnUser_UserPhoneConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('afterContactWorkTimeLimit', cdk.validateNumber)(properties.afterContactWorkTimeLimit));
    errors.collect(cdk.propertyValidator('autoAccept', cdk.validateBoolean)(properties.autoAccept));
    errors.collect(cdk.propertyValidator('deskPhoneNumber', cdk.validateString)(properties.deskPhoneNumber));
    errors.collect(cdk.propertyValidator('phoneType', cdk.requiredValidator)(properties.phoneType));
    errors.collect(cdk.propertyValidator('phoneType', cdk.validateString)(properties.phoneType));
    return errors.wrap('supplied properties not correct for "UserPhoneConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Connect::User.UserPhoneConfig` resource
 *
 * @param properties - the TypeScript properties of a `UserPhoneConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Connect::User.UserPhoneConfig` resource.
 */
// @ts-ignore TS6133
function cfnUserUserPhoneConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUser_UserPhoneConfigPropertyValidator(properties).assertSuccess();
    return {
        AfterContactWorkTimeLimit: cdk.numberToCloudFormation(properties.afterContactWorkTimeLimit),
        AutoAccept: cdk.booleanToCloudFormation(properties.autoAccept),
        DeskPhoneNumber: cdk.stringToCloudFormation(properties.deskPhoneNumber),
        PhoneType: cdk.stringToCloudFormation(properties.phoneType),
    };
}

// @ts-ignore TS6133
function CfnUserUserPhoneConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUser.UserPhoneConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUser.UserPhoneConfigProperty>();
    ret.addPropertyResult('afterContactWorkTimeLimit', 'AfterContactWorkTimeLimit', properties.AfterContactWorkTimeLimit != null ? cfn_parse.FromCloudFormation.getNumber(properties.AfterContactWorkTimeLimit) : undefined);
    ret.addPropertyResult('autoAccept', 'AutoAccept', properties.AutoAccept != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AutoAccept) : undefined);
    ret.addPropertyResult('deskPhoneNumber', 'DeskPhoneNumber', properties.DeskPhoneNumber != null ? cfn_parse.FromCloudFormation.getString(properties.DeskPhoneNumber) : undefined);
    ret.addPropertyResult('phoneType', 'PhoneType', cfn_parse.FromCloudFormation.getString(properties.PhoneType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnUserHierarchyGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-userhierarchygroup.html
 */
export interface CfnUserHierarchyGroupProps {

    /**
     * The Amazon Resource Name (ARN) of the user hierarchy group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-userhierarchygroup.html#cfn-connect-userhierarchygroup-instancearn
     */
    readonly instanceArn: string;

    /**
     * The name of the user hierarchy group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-userhierarchygroup.html#cfn-connect-userhierarchygroup-name
     */
    readonly name: string;

    /**
     * The Amazon Resource Name (ARN) of the parent group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-userhierarchygroup.html#cfn-connect-userhierarchygroup-parentgrouparn
     */
    readonly parentGroupArn?: string;
}

/**
 * Determine whether the given properties match those of a `CfnUserHierarchyGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnUserHierarchyGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnUserHierarchyGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceArn', cdk.requiredValidator)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.validateString)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('parentGroupArn', cdk.validateString)(properties.parentGroupArn));
    return errors.wrap('supplied properties not correct for "CfnUserHierarchyGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Connect::UserHierarchyGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnUserHierarchyGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Connect::UserHierarchyGroup` resource.
 */
// @ts-ignore TS6133
function cfnUserHierarchyGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUserHierarchyGroupPropsValidator(properties).assertSuccess();
    return {
        InstanceArn: cdk.stringToCloudFormation(properties.instanceArn),
        Name: cdk.stringToCloudFormation(properties.name),
        ParentGroupArn: cdk.stringToCloudFormation(properties.parentGroupArn),
    };
}

// @ts-ignore TS6133
function CfnUserHierarchyGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUserHierarchyGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUserHierarchyGroupProps>();
    ret.addPropertyResult('instanceArn', 'InstanceArn', cfn_parse.FromCloudFormation.getString(properties.InstanceArn));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('parentGroupArn', 'ParentGroupArn', properties.ParentGroupArn != null ? cfn_parse.FromCloudFormation.getString(properties.ParentGroupArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Connect::UserHierarchyGroup`
 *
 * Creates a new user hierarchy group.
 *
 * @cloudformationResource AWS::Connect::UserHierarchyGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-userhierarchygroup.html
 */
export class CfnUserHierarchyGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Connect::UserHierarchyGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnUserHierarchyGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnUserHierarchyGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnUserHierarchyGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) for the user hierarchy group.
     * @cloudformationAttribute UserHierarchyGroupArn
     */
    public readonly attrUserHierarchyGroupArn: string;

    /**
     * The Amazon Resource Name (ARN) of the user hierarchy group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-userhierarchygroup.html#cfn-connect-userhierarchygroup-instancearn
     */
    public instanceArn: string;

    /**
     * The name of the user hierarchy group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-userhierarchygroup.html#cfn-connect-userhierarchygroup-name
     */
    public name: string;

    /**
     * The Amazon Resource Name (ARN) of the parent group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-userhierarchygroup.html#cfn-connect-userhierarchygroup-parentgrouparn
     */
    public parentGroupArn: string | undefined;

    /**
     * Create a new `AWS::Connect::UserHierarchyGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnUserHierarchyGroupProps) {
        super(scope, id, { type: CfnUserHierarchyGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'instanceArn', this);
        cdk.requireProperty(props, 'name', this);
        this.attrUserHierarchyGroupArn = cdk.Token.asString(this.getAtt('UserHierarchyGroupArn'));

        this.instanceArn = props.instanceArn;
        this.name = props.name;
        this.parentGroupArn = props.parentGroupArn;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnUserHierarchyGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            instanceArn: this.instanceArn,
            name: this.name,
            parentGroupArn: this.parentGroupArn,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnUserHierarchyGroupPropsToCloudFormation(props);
    }
}
