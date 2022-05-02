// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.803Z","fingerprint":"gj0AJyTCvKi1KQ38uK5QjTeJxOF4AWZjeU88a9HW8c8="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html
 */
export interface CfnGroupProps {

    /**
     * The name of a resource group. The name must be unique within the AWS Region in which you create the resource. To create multiple resource groups based on the same CloudFormation stack, you must generate unique names for each.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html#cfn-resourcegroups-group-name
     */
    readonly name: string;

    /**
     * The service configuration currently associated with the resource group and in effect for the members of the resource group. A `Configuration` consists of one or more `ConfigurationItem` entries. For information about service configurations for resource groups and how to construct them, see [Service configurations for resource groups](https://docs.aws.amazon.com//ARG/latest/APIReference/about-slg.html) in the *AWS Resource Groups User Guide* .
     *
     * > You can include either a `Configuration` or a `ResourceQuery` , but not both.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html#cfn-resourcegroups-group-configuration
     */
    readonly configuration?: Array<CfnGroup.ConfigurationItemProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The description of the resource group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html#cfn-resourcegroups-group-description
     */
    readonly description?: string;

    /**
     * The resource query structure that is used to dynamically determine which AWS resources are members of the associated resource group. For more information about queries and how to construct them, see [Build queries and groups in AWS Resource Groups](https://docs.aws.amazon.com//ARG/latest/userguide/gettingstarted-query.html) in the *AWS Resource Groups User Guide*
     *
     * > - You can include either a `ResourceQuery` or a `Configuration` , but not both.
     * > - You can specify the group's membership either by using a `ResourceQuery` or by using a list of `Resources` , but not both.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html#cfn-resourcegroups-group-resourcequery
     */
    readonly resourceQuery?: CfnGroup.ResourceQueryProperty | cdk.IResolvable;

    /**
     * A list of the Amazon Resource Names (ARNs) of AWS resources that you want to add to the specified group.
     *
     * > - You can specify the group membership either by using a list of `Resources` or by using a `ResourceQuery` , but not both.
     * > - You can include a `Resources` property only if you also specify a `Configuration` property.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html#cfn-resourcegroups-group-resources
     */
    readonly resources?: string[];

    /**
     * The tag key and value pairs that are attached to the resource group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html#cfn-resourcegroups-group-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('configuration', cdk.listValidator(CfnGroup_ConfigurationItemPropertyValidator))(properties.configuration));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('resourceQuery', CfnGroup_ResourceQueryPropertyValidator)(properties.resourceQuery));
    errors.collect(cdk.propertyValidator('resources', cdk.listValidator(cdk.validateString))(properties.resources));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ResourceGroups::Group` resource
 *
 * @param properties - the TypeScript properties of a `CfnGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ResourceGroups::Group` resource.
 */
// @ts-ignore TS6133
function cfnGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGroupPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Configuration: cdk.listMapper(cfnGroupConfigurationItemPropertyToCloudFormation)(properties.configuration),
        Description: cdk.stringToCloudFormation(properties.description),
        ResourceQuery: cfnGroupResourceQueryPropertyToCloudFormation(properties.resourceQuery),
        Resources: cdk.listMapper(cdk.stringToCloudFormation)(properties.resources),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGroupProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('configuration', 'Configuration', properties.Configuration != null ? cfn_parse.FromCloudFormation.getArray(CfnGroupConfigurationItemPropertyFromCloudFormation)(properties.Configuration) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('resourceQuery', 'ResourceQuery', properties.ResourceQuery != null ? CfnGroupResourceQueryPropertyFromCloudFormation(properties.ResourceQuery) : undefined);
    ret.addPropertyResult('resources', 'Resources', properties.Resources != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Resources) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ResourceGroups::Group`
 *
 * Creates a resource group with the specified name and description. You can optionally include either a resource query or a service configuration. For more information about constructing a resource query, see [Build queries and groups in AWS Resource Groups](https://docs.aws.amazon.com//ARG/latest/userguide/getting_started-query.html) in the *AWS Resource Groups User Guide* . For more information about service-linked groups and service configurations, see [Service configurations for Resource Groups](https://docs.aws.amazon.com//ARG/latest/APIReference/about-slg.html) .
 *
 * *Minimum permissions*
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:CreateGroup`
 *
 * @cloudformationResource AWS::ResourceGroups::Group
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html
 */
export class CfnGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ResourceGroups::Group";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the new resource group.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The name of a resource group. The name must be unique within the AWS Region in which you create the resource. To create multiple resource groups based on the same CloudFormation stack, you must generate unique names for each.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html#cfn-resourcegroups-group-name
     */
    public name: string;

    /**
     * The service configuration currently associated with the resource group and in effect for the members of the resource group. A `Configuration` consists of one or more `ConfigurationItem` entries. For information about service configurations for resource groups and how to construct them, see [Service configurations for resource groups](https://docs.aws.amazon.com//ARG/latest/APIReference/about-slg.html) in the *AWS Resource Groups User Guide* .
     *
     * > You can include either a `Configuration` or a `ResourceQuery` , but not both.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html#cfn-resourcegroups-group-configuration
     */
    public configuration: Array<CfnGroup.ConfigurationItemProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The description of the resource group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html#cfn-resourcegroups-group-description
     */
    public description: string | undefined;

    /**
     * The resource query structure that is used to dynamically determine which AWS resources are members of the associated resource group. For more information about queries and how to construct them, see [Build queries and groups in AWS Resource Groups](https://docs.aws.amazon.com//ARG/latest/userguide/gettingstarted-query.html) in the *AWS Resource Groups User Guide*
     *
     * > - You can include either a `ResourceQuery` or a `Configuration` , but not both.
     * > - You can specify the group's membership either by using a `ResourceQuery` or by using a list of `Resources` , but not both.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html#cfn-resourcegroups-group-resourcequery
     */
    public resourceQuery: CfnGroup.ResourceQueryProperty | cdk.IResolvable | undefined;

    /**
     * A list of the Amazon Resource Names (ARNs) of AWS resources that you want to add to the specified group.
     *
     * > - You can specify the group membership either by using a list of `Resources` or by using a `ResourceQuery` , but not both.
     * > - You can include a `Resources` property only if you also specify a `Configuration` property.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html#cfn-resourcegroups-group-resources
     */
    public resources: string[] | undefined;

    /**
     * The tag key and value pairs that are attached to the resource group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html#cfn-resourcegroups-group-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::ResourceGroups::Group`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnGroupProps) {
        super(scope, id, { type: CfnGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.name = props.name;
        this.configuration = props.configuration;
        this.description = props.description;
        this.resourceQuery = props.resourceQuery;
        this.resources = props.resources;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::ResourceGroups::Group", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            configuration: this.configuration,
            description: this.description,
            resourceQuery: this.resourceQuery,
            resources: this.resources,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnGroupPropsToCloudFormation(props);
    }
}

export namespace CfnGroup {
    /**
     * One of the items in the service configuration assigned to a resource group. A service configuration can consist of one or more items. For details service configurations and how to construct them, see [Service configurations for resource groups](https://docs.aws.amazon.com//ARG/latest/APIReference/about-slg.html) in the *AWS Resource Groups User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-configurationitem.html
     */
    export interface ConfigurationItemProperty {
        /**
         * A collection of parameters for this configuration item. For the list of parameters that you can use with each configuration item `Type` , see [Supported resource types and parameters](https://docs.aws.amazon.com/ARG/latest/APIReference/about-slg.html#about-slg-types) in the *AWS Resource Groups User Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-configurationitem.html#cfn-resourcegroups-group-configurationitem-parameters
         */
        readonly parameters?: Array<CfnGroup.ConfigurationParameterProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * Specifies the type of configuration item. Each item must have a unique value for type. For the list of the types that you can specify for a configuration item, see [Supported resource types and parameters](https://docs.aws.amazon.com/ARG/latest/APIReference/about-slg.html#about-slg-types) in the *AWS Resource Groups User Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-configurationitem.html#cfn-resourcegroups-group-configurationitem-type
         */
        readonly type?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConfigurationItemProperty`
 *
 * @param properties - the TypeScript properties of a `ConfigurationItemProperty`
 *
 * @returns the result of the validation.
 */
function CfnGroup_ConfigurationItemPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('parameters', cdk.listValidator(CfnGroup_ConfigurationParameterPropertyValidator))(properties.parameters));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "ConfigurationItemProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ResourceGroups::Group.ConfigurationItem` resource
 *
 * @param properties - the TypeScript properties of a `ConfigurationItemProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ResourceGroups::Group.ConfigurationItem` resource.
 */
// @ts-ignore TS6133
function cfnGroupConfigurationItemPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGroup_ConfigurationItemPropertyValidator(properties).assertSuccess();
    return {
        Parameters: cdk.listMapper(cfnGroupConfigurationParameterPropertyToCloudFormation)(properties.parameters),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnGroupConfigurationItemPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGroup.ConfigurationItemProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGroup.ConfigurationItemProperty>();
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? cfn_parse.FromCloudFormation.getArray(CfnGroupConfigurationParameterPropertyFromCloudFormation)(properties.Parameters) : undefined);
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnGroup {
    /**
     * One parameter for a group configuration item. For details about service configurations and how to construct them, see [Service configurations for resource groups](https://docs.aws.amazon.com//ARG/latest/APIReference/about-slg.html) in the *AWS Resource Groups User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-configurationparameter.html
     */
    export interface ConfigurationParameterProperty {
        /**
         * The name of the group configuration parameter. For the list of parameters that you can use with each configuration item type, see [Supported resource types and parameters](https://docs.aws.amazon.com//ARG/latest/APIReference/about-slg.html#about-slg-types) in the *AWS Resource Groups User Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-configurationparameter.html#cfn-resourcegroups-group-configurationparameter-name
         */
        readonly name?: string;
        /**
         * The value or values to be used for the specified parameter. For the list of values you can use with each parameter, see [Supported resource types and parameters](https://docs.aws.amazon.com//ARG/latest/APIReference/about-slg.html#about-slg-types) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-configurationparameter.html#cfn-resourcegroups-group-configurationparameter-values
         */
        readonly values?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `ConfigurationParameterProperty`
 *
 * @param properties - the TypeScript properties of a `ConfigurationParameterProperty`
 *
 * @returns the result of the validation.
 */
function CfnGroup_ConfigurationParameterPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('values', cdk.listValidator(cdk.validateString))(properties.values));
    return errors.wrap('supplied properties not correct for "ConfigurationParameterProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ResourceGroups::Group.ConfigurationParameter` resource
 *
 * @param properties - the TypeScript properties of a `ConfigurationParameterProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ResourceGroups::Group.ConfigurationParameter` resource.
 */
// @ts-ignore TS6133
function cfnGroupConfigurationParameterPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGroup_ConfigurationParameterPropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Values: cdk.listMapper(cdk.stringToCloudFormation)(properties.values),
    };
}

// @ts-ignore TS6133
function CfnGroupConfigurationParameterPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGroup.ConfigurationParameterProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGroup.ConfigurationParameterProperty>();
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('values', 'Values', properties.Values != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Values) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnGroup {
    /**
     * Specifies details within a `ResourceQuery` structure that determines the membership of the resource group. The contents required in the `Query` structure are determined by the `Type` property of the containing `ResourceQuery` structure.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-query.html
     */
    export interface QueryProperty {
        /**
         * Specifies limits to the types of resources that can be included in the resource group. For example, if `ResourceTypeFilters` is `["AWS::EC2::Instance", "AWS::DynamoDB::Table"]` , only EC2 instances or DynamoDB tables can be members of this resource group. The default value is `["AWS::AllSupported"]` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-query.html#cfn-resourcegroups-group-query-resourcetypefilters
         */
        readonly resourceTypeFilters?: string[];
        /**
         * Specifies the ARN of a CloudFormation stack. All supported resources of the CloudFormation stack are members of the resource group. If you don't specify an ARN, this parameter defaults to the current stack that you are defining, which means that all the resources of the current stack are grouped.
         *
         * You can specify a value for `StackIdentifier` only when the `ResourceQuery.Type` property is `CLOUDFORMATION_STACK_1_0.`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-query.html#cfn-resourcegroups-group-query-stackidentifier
         */
        readonly stackIdentifier?: string;
        /**
         * A list of key-value pair objects that limit which resources can be members of the resource group. This property is required when the `ResourceQuery.Type` property is `TAG_FILTERS_1_0` .
         *
         * A resource must have a tag that matches every filter that is provided in the `TagFilters` list.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-query.html#cfn-resourcegroups-group-query-tagfilters
         */
        readonly tagFilters?: Array<CfnGroup.TagFilterProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `QueryProperty`
 *
 * @param properties - the TypeScript properties of a `QueryProperty`
 *
 * @returns the result of the validation.
 */
function CfnGroup_QueryPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('resourceTypeFilters', cdk.listValidator(cdk.validateString))(properties.resourceTypeFilters));
    errors.collect(cdk.propertyValidator('stackIdentifier', cdk.validateString)(properties.stackIdentifier));
    errors.collect(cdk.propertyValidator('tagFilters', cdk.listValidator(CfnGroup_TagFilterPropertyValidator))(properties.tagFilters));
    return errors.wrap('supplied properties not correct for "QueryProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ResourceGroups::Group.Query` resource
 *
 * @param properties - the TypeScript properties of a `QueryProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ResourceGroups::Group.Query` resource.
 */
// @ts-ignore TS6133
function cfnGroupQueryPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGroup_QueryPropertyValidator(properties).assertSuccess();
    return {
        ResourceTypeFilters: cdk.listMapper(cdk.stringToCloudFormation)(properties.resourceTypeFilters),
        StackIdentifier: cdk.stringToCloudFormation(properties.stackIdentifier),
        TagFilters: cdk.listMapper(cfnGroupTagFilterPropertyToCloudFormation)(properties.tagFilters),
    };
}

// @ts-ignore TS6133
function CfnGroupQueryPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGroup.QueryProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGroup.QueryProperty>();
    ret.addPropertyResult('resourceTypeFilters', 'ResourceTypeFilters', properties.ResourceTypeFilters != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ResourceTypeFilters) : undefined);
    ret.addPropertyResult('stackIdentifier', 'StackIdentifier', properties.StackIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.StackIdentifier) : undefined);
    ret.addPropertyResult('tagFilters', 'TagFilters', properties.TagFilters != null ? cfn_parse.FromCloudFormation.getArray(CfnGroupTagFilterPropertyFromCloudFormation)(properties.TagFilters) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnGroup {
    /**
     * The query used to dynamically define the members of a group. For more information about how to construct a query, see [Build queries and groups in AWS Resource Groups](https://docs.aws.amazon.com//ARG/latest/userguide/gettingstarted-query.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-resourcequery.html
     */
    export interface ResourceQueryProperty {
        /**
         * The query that defines the membership of the group. This is a structure with properties that depend on the `Type` .
         *
         * The `Query` structure must be included in the following scenarios:
         *
         * - When the `Type` is `TAG_FILTERS_1_0` , you must specify a `Query` structure that contains a `TagFilters` list of tags. Resources with tags that match those in the `TagFilter` list become members of the resource group.
         * - When the `Type` is `CLOUDFORMATION_STACK_1_0` then this field is required only when you must specify a CloudFormation stack other than the one you are defining. To do this, the `Query` structure must contain the `StackIdentifier` property. If you don't specify either a `Query` structure or a `StackIdentifier` within that `Query` , then it defaults to the CloudFormation stack that you're currently constructing.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-resourcequery.html#cfn-resourcegroups-group-resourcequery-query
         */
        readonly query?: CfnGroup.QueryProperty | cdk.IResolvable;
        /**
         * Specifies the type of resource query that determines this group's membership. There are two valid query types:
         *
         * - `TAG_FILTERS_1_0` indicates that the group is a tag-based group. To complete the group membership, you must include the `TagFilters` property to specify the tag filters to use in the query.
         * - `CLOUDFORMATION_STACK_1_0` , the default, indicates that the group is a CloudFormation stack-based group. Group membership is based on the CloudFormation stack. You must specify the `StackIdentifier` property in the query to define which stack to associate the group with, or leave it empty to default to the stack where the group is defined.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-resourcequery.html#cfn-resourcegroups-group-resourcequery-type
         */
        readonly type?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ResourceQueryProperty`
 *
 * @param properties - the TypeScript properties of a `ResourceQueryProperty`
 *
 * @returns the result of the validation.
 */
function CfnGroup_ResourceQueryPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('query', CfnGroup_QueryPropertyValidator)(properties.query));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "ResourceQueryProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ResourceGroups::Group.ResourceQuery` resource
 *
 * @param properties - the TypeScript properties of a `ResourceQueryProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ResourceGroups::Group.ResourceQuery` resource.
 */
// @ts-ignore TS6133
function cfnGroupResourceQueryPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGroup_ResourceQueryPropertyValidator(properties).assertSuccess();
    return {
        Query: cfnGroupQueryPropertyToCloudFormation(properties.query),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnGroupResourceQueryPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGroup.ResourceQueryProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGroup.ResourceQueryProperty>();
    ret.addPropertyResult('query', 'Query', properties.Query != null ? CfnGroupQueryPropertyFromCloudFormation(properties.Query) : undefined);
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnGroup {
    /**
     * Specifies a single tag key and optional values that you can use to specify membership in a tag-based group. An AWS resource that doesn't have a matching tag key and value is rejected as a member of the group.
     *
     * A `TagFilter` object includes two properties: `Key` (a string) and `Values` (a list of strings). Only resources in the account that are tagged with a matching key-value pair are members of the group. The `Values` property of `TagFilter` is optional, but specifying it narrows the query results.
     *
     * As an example, suppose the `TagFilters` string is `[{"Key": "Stage", "Values": ["Test", "Beta"]}, {"Key": "Storage"}]` . In this case, only resources with all of the following tags are members of the group:
     *
     * - `Stage` tag key with a value of either `Test` or `Beta`
     * - `Storage` tag key with any value
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-tagfilter.html
     */
    export interface TagFilterProperty {
        /**
         * A string that defines a tag key. Only resources in the account that are tagged with a specified tag key are members of the tag-based resource group.
         *
         * This field is required when the `ResourceQuery` structure's `Type` property is `TAG_FILTERS_1_0` . You must specify at least one tag key.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-tagfilter.html#cfn-resourcegroups-group-tagfilter-key
         */
        readonly key?: string;
        /**
         * A list of tag values that can be included in the tag-based resource group. This is optional. If you don't specify a value or values for a key, then an AWS resource with any value for that key is a member.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resourcegroups-group-tagfilter.html#cfn-resourcegroups-group-tagfilter-values
         */
        readonly values?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `TagFilterProperty`
 *
 * @param properties - the TypeScript properties of a `TagFilterProperty`
 *
 * @returns the result of the validation.
 */
function CfnGroup_TagFilterPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('values', cdk.listValidator(cdk.validateString))(properties.values));
    return errors.wrap('supplied properties not correct for "TagFilterProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ResourceGroups::Group.TagFilter` resource
 *
 * @param properties - the TypeScript properties of a `TagFilterProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ResourceGroups::Group.TagFilter` resource.
 */
// @ts-ignore TS6133
function cfnGroupTagFilterPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGroup_TagFilterPropertyValidator(properties).assertSuccess();
    return {
        Key: cdk.stringToCloudFormation(properties.key),
        Values: cdk.listMapper(cdk.stringToCloudFormation)(properties.values),
    };
}

// @ts-ignore TS6133
function CfnGroupTagFilterPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGroup.TagFilterProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGroup.TagFilterProperty>();
    ret.addPropertyResult('key', 'Key', properties.Key != null ? cfn_parse.FromCloudFormation.getString(properties.Key) : undefined);
    ret.addPropertyResult('values', 'Values', properties.Values != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Values) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
