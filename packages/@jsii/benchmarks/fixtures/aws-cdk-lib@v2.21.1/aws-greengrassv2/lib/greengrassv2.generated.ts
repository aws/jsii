// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:08.595Z","fingerprint":"MDXNE3GNgveQ2oVHqogXiUnuo/g1rUqsi8NsH2FqBWw="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnComponentVersion`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrassv2-componentversion.html
 */
export interface CfnComponentVersionProps {

    /**
     * The recipe to use to create the component. The recipe defines the component's metadata, parameters, dependencies, lifecycle, artifacts, and platform compatibility.
     *
     * You must specify either `InlineRecipe` or `LambdaFunction` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrassv2-componentversion.html#cfn-greengrassv2-componentversion-inlinerecipe
     */
    readonly inlineRecipe?: string;

    /**
     * The parameters to create a component from a Lambda function.
     *
     * You must specify either `InlineRecipe` or `LambdaFunction` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrassv2-componentversion.html#cfn-greengrassv2-componentversion-lambdafunction
     */
    readonly lambdaFunction?: CfnComponentVersion.LambdaFunctionRecipeSourceProperty | cdk.IResolvable;

    /**
     * Application-specific metadata to attach to the component version. You can use tags in IAM policies to control access to AWS IoT Greengrass resources. You can also use tags to categorize your resources. For more information, see [Tag your AWS IoT Greengrass Version 2 resources](https://docs.aws.amazon.com/greengrass/v2/developerguide/tag-resources.html) in the *AWS IoT Greengrass V2 Developer Guide* .
     *
     * This `Json` property type is processed as a map of key-value pairs. It uses the following format, which is different from most `Tags` implementations in AWS CloudFormation templates.
     *
     * ```json
     * "Tags": { "KeyName0": "value", "KeyName1": "value", "KeyName2": "value"
     * }
     * ```
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrassv2-componentversion.html#cfn-greengrassv2-componentversion-tags
     */
    readonly tags?: { [key: string]: (string) };
}

/**
 * Determine whether the given properties match those of a `CfnComponentVersionProps`
 *
 * @param properties - the TypeScript properties of a `CfnComponentVersionProps`
 *
 * @returns the result of the validation.
 */
function CfnComponentVersionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('inlineRecipe', cdk.validateString)(properties.inlineRecipe));
    errors.collect(cdk.propertyValidator('lambdaFunction', CfnComponentVersion_LambdaFunctionRecipeSourcePropertyValidator)(properties.lambdaFunction));
    errors.collect(cdk.propertyValidator('tags', cdk.hashValidator(cdk.validateString))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnComponentVersionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion` resource
 *
 * @param properties - the TypeScript properties of a `CfnComponentVersionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion` resource.
 */
// @ts-ignore TS6133
function cfnComponentVersionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponentVersionPropsValidator(properties).assertSuccess();
    return {
        InlineRecipe: cdk.stringToCloudFormation(properties.inlineRecipe),
        LambdaFunction: cfnComponentVersionLambdaFunctionRecipeSourcePropertyToCloudFormation(properties.lambdaFunction),
        Tags: cdk.hashMapper(cdk.stringToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnComponentVersionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponentVersionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponentVersionProps>();
    ret.addPropertyResult('inlineRecipe', 'InlineRecipe', properties.InlineRecipe != null ? cfn_parse.FromCloudFormation.getString(properties.InlineRecipe) : undefined);
    ret.addPropertyResult('lambdaFunction', 'LambdaFunction', properties.LambdaFunction != null ? CfnComponentVersionLambdaFunctionRecipeSourcePropertyFromCloudFormation(properties.LambdaFunction) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GreengrassV2::ComponentVersion`
 *
 * Creates a component. Components are software that run on Greengrass core devices. After you develop and test a component on your core device, you can use this operation to upload your component to AWS IoT Greengrass . Then, you can deploy the component to other core devices.
 *
 * You can use this operation to do the following:
 *
 * - *Create components from recipes*
 *
 * Create a component from a recipe, which is a file that defines the component's metadata, parameters, dependencies, lifecycle, artifacts, and platform capability. For more information, see [AWS IoT Greengrass component recipe reference](https://docs.aws.amazon.com/greengrass/v2/developerguide/component-recipe-reference.html) in the *AWS IoT Greengrass V2 Developer Guide* .
 *
 * To create a component from a recipe, specify `inlineRecipe` when you call this operation.
 * - *Create components from Lambda functions*
 *
 * Create a component from an AWS Lambda function that runs on AWS IoT Greengrass . This creates a recipe and artifacts from the Lambda function's deployment package. You can use this operation to migrate Lambda functions from AWS IoT Greengrass V1 to AWS IoT Greengrass V2 .
 *
 * This function only accepts Lambda functions that use the following runtimes:
 *
 * - Python 2.7 – `python2.7`
 * - Python 3.7 – `python3.7`
 * - Python 3.8 – `python3.8`
 * - Java 8 – `java8`
 * - Node.js 10 – `nodejs10.x`
 * - Node.js 12 – `nodejs12.x`
 *
 * To create a component from a Lambda function, specify `lambdaFunction` when you call this operation.
 *
 * @cloudformationResource AWS::GreengrassV2::ComponentVersion
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrassv2-componentversion.html
 */
export class CfnComponentVersion extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GreengrassV2::ComponentVersion";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnComponentVersion {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnComponentVersionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnComponentVersion(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the component version.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The name of the component.
     * @cloudformationAttribute ComponentName
     */
    public readonly attrComponentName: string;

    /**
     * The version of the component.
     * @cloudformationAttribute ComponentVersion
     */
    public readonly attrComponentVersion: string;

    /**
     * The recipe to use to create the component. The recipe defines the component's metadata, parameters, dependencies, lifecycle, artifacts, and platform compatibility.
     *
     * You must specify either `InlineRecipe` or `LambdaFunction` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrassv2-componentversion.html#cfn-greengrassv2-componentversion-inlinerecipe
     */
    public inlineRecipe: string | undefined;

    /**
     * The parameters to create a component from a Lambda function.
     *
     * You must specify either `InlineRecipe` or `LambdaFunction` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrassv2-componentversion.html#cfn-greengrassv2-componentversion-lambdafunction
     */
    public lambdaFunction: CfnComponentVersion.LambdaFunctionRecipeSourceProperty | cdk.IResolvable | undefined;

    /**
     * Application-specific metadata to attach to the component version. You can use tags in IAM policies to control access to AWS IoT Greengrass resources. You can also use tags to categorize your resources. For more information, see [Tag your AWS IoT Greengrass Version 2 resources](https://docs.aws.amazon.com/greengrass/v2/developerguide/tag-resources.html) in the *AWS IoT Greengrass V2 Developer Guide* .
     *
     * This `Json` property type is processed as a map of key-value pairs. It uses the following format, which is different from most `Tags` implementations in AWS CloudFormation templates.
     *
     * ```json
     * "Tags": { "KeyName0": "value", "KeyName1": "value", "KeyName2": "value"
     * }
     * ```
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrassv2-componentversion.html#cfn-greengrassv2-componentversion-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::GreengrassV2::ComponentVersion`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnComponentVersionProps = {}) {
        super(scope, id, { type: CfnComponentVersion.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrComponentName = cdk.Token.asString(this.getAtt('ComponentName'));
        this.attrComponentVersion = cdk.Token.asString(this.getAtt('ComponentVersion'));

        this.inlineRecipe = props.inlineRecipe;
        this.lambdaFunction = props.lambdaFunction;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::GreengrassV2::ComponentVersion", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnComponentVersion.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            inlineRecipe: this.inlineRecipe,
            lambdaFunction: this.lambdaFunction,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnComponentVersionPropsToCloudFormation(props);
    }
}

export namespace CfnComponentVersion {
    /**
     * Contains information about a component dependency for a Lambda function component.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-componentdependencyrequirement.html
     */
    export interface ComponentDependencyRequirementProperty {
        /**
         * The type of this dependency. Choose from the following options:
         *
         * - `SOFT` – The component doesn't restart if the dependency changes state.
         * - `HARD` – The component restarts if the dependency changes state.
         *
         * Default: `HARD`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-componentdependencyrequirement.html#cfn-greengrassv2-componentversion-componentdependencyrequirement-dependencytype
         */
        readonly dependencyType?: string;
        /**
         * The component version requirement for the component dependency.
         *
         * AWS IoT Greengrass uses semantic version constraints. For more information, see [Semantic Versioning](https://docs.aws.amazon.com/https://semver.org/) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-componentdependencyrequirement.html#cfn-greengrassv2-componentversion-componentdependencyrequirement-versionrequirement
         */
        readonly versionRequirement?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ComponentDependencyRequirementProperty`
 *
 * @param properties - the TypeScript properties of a `ComponentDependencyRequirementProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponentVersion_ComponentDependencyRequirementPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dependencyType', cdk.validateString)(properties.dependencyType));
    errors.collect(cdk.propertyValidator('versionRequirement', cdk.validateString)(properties.versionRequirement));
    return errors.wrap('supplied properties not correct for "ComponentDependencyRequirementProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.ComponentDependencyRequirement` resource
 *
 * @param properties - the TypeScript properties of a `ComponentDependencyRequirementProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.ComponentDependencyRequirement` resource.
 */
// @ts-ignore TS6133
function cfnComponentVersionComponentDependencyRequirementPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponentVersion_ComponentDependencyRequirementPropertyValidator(properties).assertSuccess();
    return {
        DependencyType: cdk.stringToCloudFormation(properties.dependencyType),
        VersionRequirement: cdk.stringToCloudFormation(properties.versionRequirement),
    };
}

// @ts-ignore TS6133
function CfnComponentVersionComponentDependencyRequirementPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponentVersion.ComponentDependencyRequirementProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponentVersion.ComponentDependencyRequirementProperty>();
    ret.addPropertyResult('dependencyType', 'DependencyType', properties.DependencyType != null ? cfn_parse.FromCloudFormation.getString(properties.DependencyType) : undefined);
    ret.addPropertyResult('versionRequirement', 'VersionRequirement', properties.VersionRequirement != null ? cfn_parse.FromCloudFormation.getString(properties.VersionRequirement) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponentVersion {
    /**
     * Contains information about a platform that a component supports.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-componentplatform.html
     */
    export interface ComponentPlatformProperty {
        /**
         * A dictionary of attributes for the platform. The  software defines the `os` and `platform` by default. You can specify additional platform attributes for a core device when you deploy the Greengrass nucleus component. For more information, see the [Greengrass nucleus component](https://docs.aws.amazon.com/greengrass/v2/developerguide/greengrass-nucleus-component.html) in the *AWS IoT Greengrass V2 Developer Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-componentplatform.html#cfn-greengrassv2-componentversion-componentplatform-attributes
         */
        readonly attributes?: { [key: string]: (string) } | cdk.IResolvable;
        /**
         * The friendly name of the platform. This name helps you identify the platform.
         *
         * If you omit this parameter, AWS IoT Greengrass creates a friendly name from the `os` and `architecture` of the platform.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-componentplatform.html#cfn-greengrassv2-componentversion-componentplatform-name
         */
        readonly name?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ComponentPlatformProperty`
 *
 * @param properties - the TypeScript properties of a `ComponentPlatformProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponentVersion_ComponentPlatformPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('attributes', cdk.hashValidator(cdk.validateString))(properties.attributes));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "ComponentPlatformProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.ComponentPlatform` resource
 *
 * @param properties - the TypeScript properties of a `ComponentPlatformProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.ComponentPlatform` resource.
 */
// @ts-ignore TS6133
function cfnComponentVersionComponentPlatformPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponentVersion_ComponentPlatformPropertyValidator(properties).assertSuccess();
    return {
        Attributes: cdk.hashMapper(cdk.stringToCloudFormation)(properties.attributes),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnComponentVersionComponentPlatformPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponentVersion.ComponentPlatformProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponentVersion.ComponentPlatformProperty>();
    ret.addPropertyResult('attributes', 'Attributes', properties.Attributes != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Attributes) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponentVersion {
    /**
     * Contains information about a container in which AWS Lambda functions run on Greengrass core devices.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdacontainerparams.html
     */
    export interface LambdaContainerParamsProperty {
        /**
         * The list of system devices that the container can access.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdacontainerparams.html#cfn-greengrassv2-componentversion-lambdacontainerparams-devices
         */
        readonly devices?: Array<CfnComponentVersion.LambdaDeviceMountProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The memory size of the container, expressed in kilobytes.
         *
         * Default: `16384` (16 MB)
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdacontainerparams.html#cfn-greengrassv2-componentversion-lambdacontainerparams-memorysizeinkb
         */
        readonly memorySizeInKb?: number;
        /**
         * Whether or not the container can read information from the device's `/sys` folder.
         *
         * Default: `false`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdacontainerparams.html#cfn-greengrassv2-componentversion-lambdacontainerparams-mountrosysfs
         */
        readonly mountRoSysfs?: boolean | cdk.IResolvable;
        /**
         * The list of volumes that the container can access.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdacontainerparams.html#cfn-greengrassv2-componentversion-lambdacontainerparams-volumes
         */
        readonly volumes?: Array<CfnComponentVersion.LambdaVolumeMountProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `LambdaContainerParamsProperty`
 *
 * @param properties - the TypeScript properties of a `LambdaContainerParamsProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponentVersion_LambdaContainerParamsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('devices', cdk.listValidator(CfnComponentVersion_LambdaDeviceMountPropertyValidator))(properties.devices));
    errors.collect(cdk.propertyValidator('memorySizeInKb', cdk.validateNumber)(properties.memorySizeInKb));
    errors.collect(cdk.propertyValidator('mountRoSysfs', cdk.validateBoolean)(properties.mountRoSysfs));
    errors.collect(cdk.propertyValidator('volumes', cdk.listValidator(CfnComponentVersion_LambdaVolumeMountPropertyValidator))(properties.volumes));
    return errors.wrap('supplied properties not correct for "LambdaContainerParamsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.LambdaContainerParams` resource
 *
 * @param properties - the TypeScript properties of a `LambdaContainerParamsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.LambdaContainerParams` resource.
 */
// @ts-ignore TS6133
function cfnComponentVersionLambdaContainerParamsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponentVersion_LambdaContainerParamsPropertyValidator(properties).assertSuccess();
    return {
        Devices: cdk.listMapper(cfnComponentVersionLambdaDeviceMountPropertyToCloudFormation)(properties.devices),
        MemorySizeInKB: cdk.numberToCloudFormation(properties.memorySizeInKb),
        MountROSysfs: cdk.booleanToCloudFormation(properties.mountRoSysfs),
        Volumes: cdk.listMapper(cfnComponentVersionLambdaVolumeMountPropertyToCloudFormation)(properties.volumes),
    };
}

// @ts-ignore TS6133
function CfnComponentVersionLambdaContainerParamsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponentVersion.LambdaContainerParamsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponentVersion.LambdaContainerParamsProperty>();
    ret.addPropertyResult('devices', 'Devices', properties.Devices != null ? cfn_parse.FromCloudFormation.getArray(CfnComponentVersionLambdaDeviceMountPropertyFromCloudFormation)(properties.Devices) : undefined);
    ret.addPropertyResult('memorySizeInKb', 'MemorySizeInKB', properties.MemorySizeInKB != null ? cfn_parse.FromCloudFormation.getNumber(properties.MemorySizeInKB) : undefined);
    ret.addPropertyResult('mountRoSysfs', 'MountROSysfs', properties.MountROSysfs != null ? cfn_parse.FromCloudFormation.getBoolean(properties.MountROSysfs) : undefined);
    ret.addPropertyResult('volumes', 'Volumes', properties.Volumes != null ? cfn_parse.FromCloudFormation.getArray(CfnComponentVersionLambdaVolumeMountPropertyFromCloudFormation)(properties.Volumes) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponentVersion {
    /**
     * Contains information about a device that Linux processes in a container can access.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdadevicemount.html
     */
    export interface LambdaDeviceMountProperty {
        /**
         * Whether or not to add the component's system user as an owner of the device.
         *
         * Default: `false`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdadevicemount.html#cfn-greengrassv2-componentversion-lambdadevicemount-addgroupowner
         */
        readonly addGroupOwner?: boolean | cdk.IResolvable;
        /**
         * The mount path for the device in the file system.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdadevicemount.html#cfn-greengrassv2-componentversion-lambdadevicemount-path
         */
        readonly path?: string;
        /**
         * The permission to access the device: read/only ( `ro` ) or read/write ( `rw` ).
         *
         * Default: `ro`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdadevicemount.html#cfn-greengrassv2-componentversion-lambdadevicemount-permission
         */
        readonly permission?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LambdaDeviceMountProperty`
 *
 * @param properties - the TypeScript properties of a `LambdaDeviceMountProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponentVersion_LambdaDeviceMountPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('addGroupOwner', cdk.validateBoolean)(properties.addGroupOwner));
    errors.collect(cdk.propertyValidator('path', cdk.validateString)(properties.path));
    errors.collect(cdk.propertyValidator('permission', cdk.validateString)(properties.permission));
    return errors.wrap('supplied properties not correct for "LambdaDeviceMountProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.LambdaDeviceMount` resource
 *
 * @param properties - the TypeScript properties of a `LambdaDeviceMountProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.LambdaDeviceMount` resource.
 */
// @ts-ignore TS6133
function cfnComponentVersionLambdaDeviceMountPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponentVersion_LambdaDeviceMountPropertyValidator(properties).assertSuccess();
    return {
        AddGroupOwner: cdk.booleanToCloudFormation(properties.addGroupOwner),
        Path: cdk.stringToCloudFormation(properties.path),
        Permission: cdk.stringToCloudFormation(properties.permission),
    };
}

// @ts-ignore TS6133
function CfnComponentVersionLambdaDeviceMountPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponentVersion.LambdaDeviceMountProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponentVersion.LambdaDeviceMountProperty>();
    ret.addPropertyResult('addGroupOwner', 'AddGroupOwner', properties.AddGroupOwner != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AddGroupOwner) : undefined);
    ret.addPropertyResult('path', 'Path', properties.Path != null ? cfn_parse.FromCloudFormation.getString(properties.Path) : undefined);
    ret.addPropertyResult('permission', 'Permission', properties.Permission != null ? cfn_parse.FromCloudFormation.getString(properties.Permission) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponentVersion {
    /**
     * Contains information about an event source for an AWS Lambda function. The event source defines the topics on which this Lambda function subscribes to receive messages that run the function.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaeventsource.html
     */
    export interface LambdaEventSourceProperty {
        /**
         * The topic to which to subscribe to receive event messages.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaeventsource.html#cfn-greengrassv2-componentversion-lambdaeventsource-topic
         */
        readonly topic?: string;
        /**
         * The type of event source. Choose from the following options:
         *
         * - `PUB_SUB` – Subscribe to local publish/subscribe messages. This event source type doesn't support MQTT wildcards ( `+` and `#` ) in the event source topic.
         * - `IOT_CORE` – Subscribe to AWS IoT Core MQTT messages. This event source type supports MQTT wildcards ( `+` and `#` ) in the event source topic.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaeventsource.html#cfn-greengrassv2-componentversion-lambdaeventsource-type
         */
        readonly type?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LambdaEventSourceProperty`
 *
 * @param properties - the TypeScript properties of a `LambdaEventSourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponentVersion_LambdaEventSourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('topic', cdk.validateString)(properties.topic));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "LambdaEventSourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.LambdaEventSource` resource
 *
 * @param properties - the TypeScript properties of a `LambdaEventSourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.LambdaEventSource` resource.
 */
// @ts-ignore TS6133
function cfnComponentVersionLambdaEventSourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponentVersion_LambdaEventSourcePropertyValidator(properties).assertSuccess();
    return {
        Topic: cdk.stringToCloudFormation(properties.topic),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnComponentVersionLambdaEventSourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponentVersion.LambdaEventSourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponentVersion.LambdaEventSourceProperty>();
    ret.addPropertyResult('topic', 'Topic', properties.Topic != null ? cfn_parse.FromCloudFormation.getString(properties.Topic) : undefined);
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponentVersion {
    /**
     * Contains parameters for a Lambda function that runs on AWS IoT Greengrass .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaexecutionparameters.html
     */
    export interface LambdaExecutionParametersProperty {
        /**
         * The map of environment variables that are available to the Lambda function when it runs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaexecutionparameters.html#cfn-greengrassv2-componentversion-lambdaexecutionparameters-environmentvariables
         */
        readonly environmentVariables?: { [key: string]: (string) } | cdk.IResolvable;
        /**
         * The list of event sources to which to subscribe to receive work messages. The Lambda function runs when it receives a message from an event source. You can subscribe this function to local publish/subscribe messages and AWS IoT Core MQTT messages.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaexecutionparameters.html#cfn-greengrassv2-componentversion-lambdaexecutionparameters-eventsources
         */
        readonly eventSources?: Array<CfnComponentVersion.LambdaEventSourceProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The list of arguments to pass to the Lambda function when it runs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaexecutionparameters.html#cfn-greengrassv2-componentversion-lambdaexecutionparameters-execargs
         */
        readonly execArgs?: string[];
        /**
         * The encoding type that the Lambda function supports.
         *
         * Default: `json`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaexecutionparameters.html#cfn-greengrassv2-componentversion-lambdaexecutionparameters-inputpayloadencodingtype
         */
        readonly inputPayloadEncodingType?: string;
        /**
         * The parameters for the Linux process that contains the Lambda function.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaexecutionparameters.html#cfn-greengrassv2-componentversion-lambdaexecutionparameters-linuxprocessparams
         */
        readonly linuxProcessParams?: CfnComponentVersion.LambdaLinuxProcessParamsProperty | cdk.IResolvable;
        /**
         * The maximum amount of time in seconds that a non-pinned Lambda function can idle before the  software stops its process.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaexecutionparameters.html#cfn-greengrassv2-componentversion-lambdaexecutionparameters-maxidletimeinseconds
         */
        readonly maxIdleTimeInSeconds?: number;
        /**
         * The maximum number of instances that a non-pinned Lambda function can run at the same time.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaexecutionparameters.html#cfn-greengrassv2-componentversion-lambdaexecutionparameters-maxinstancescount
         */
        readonly maxInstancesCount?: number;
        /**
         * The maximum size of the message queue for the Lambda function component. The Greengrass core device stores messages in a FIFO (first-in-first-out) queue until it can run the Lambda function to consume each message.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaexecutionparameters.html#cfn-greengrassv2-componentversion-lambdaexecutionparameters-maxqueuesize
         */
        readonly maxQueueSize?: number;
        /**
         * Whether or not the Lambda function is pinned, or long-lived.
         *
         * - A pinned Lambda function starts when the  starts and keeps running in its own container.
         * - A non-pinned Lambda function starts only when it receives a work item and exists after it idles for `maxIdleTimeInSeconds` . If the function has multiple work items, the  software creates multiple instances of the function.
         *
         * Default: `true`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaexecutionparameters.html#cfn-greengrassv2-componentversion-lambdaexecutionparameters-pinned
         */
        readonly pinned?: boolean | cdk.IResolvable;
        /**
         * The interval in seconds at which a pinned (also known as long-lived) Lambda function component sends status updates to the Lambda manager component.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaexecutionparameters.html#cfn-greengrassv2-componentversion-lambdaexecutionparameters-statustimeoutinseconds
         */
        readonly statusTimeoutInSeconds?: number;
        /**
         * The maximum amount of time in seconds that the Lambda function can process a work item.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdaexecutionparameters.html#cfn-greengrassv2-componentversion-lambdaexecutionparameters-timeoutinseconds
         */
        readonly timeoutInSeconds?: number;
    }
}

/**
 * Determine whether the given properties match those of a `LambdaExecutionParametersProperty`
 *
 * @param properties - the TypeScript properties of a `LambdaExecutionParametersProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponentVersion_LambdaExecutionParametersPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('environmentVariables', cdk.hashValidator(cdk.validateString))(properties.environmentVariables));
    errors.collect(cdk.propertyValidator('eventSources', cdk.listValidator(CfnComponentVersion_LambdaEventSourcePropertyValidator))(properties.eventSources));
    errors.collect(cdk.propertyValidator('execArgs', cdk.listValidator(cdk.validateString))(properties.execArgs));
    errors.collect(cdk.propertyValidator('inputPayloadEncodingType', cdk.validateString)(properties.inputPayloadEncodingType));
    errors.collect(cdk.propertyValidator('linuxProcessParams', CfnComponentVersion_LambdaLinuxProcessParamsPropertyValidator)(properties.linuxProcessParams));
    errors.collect(cdk.propertyValidator('maxIdleTimeInSeconds', cdk.validateNumber)(properties.maxIdleTimeInSeconds));
    errors.collect(cdk.propertyValidator('maxInstancesCount', cdk.validateNumber)(properties.maxInstancesCount));
    errors.collect(cdk.propertyValidator('maxQueueSize', cdk.validateNumber)(properties.maxQueueSize));
    errors.collect(cdk.propertyValidator('pinned', cdk.validateBoolean)(properties.pinned));
    errors.collect(cdk.propertyValidator('statusTimeoutInSeconds', cdk.validateNumber)(properties.statusTimeoutInSeconds));
    errors.collect(cdk.propertyValidator('timeoutInSeconds', cdk.validateNumber)(properties.timeoutInSeconds));
    return errors.wrap('supplied properties not correct for "LambdaExecutionParametersProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.LambdaExecutionParameters` resource
 *
 * @param properties - the TypeScript properties of a `LambdaExecutionParametersProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.LambdaExecutionParameters` resource.
 */
// @ts-ignore TS6133
function cfnComponentVersionLambdaExecutionParametersPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponentVersion_LambdaExecutionParametersPropertyValidator(properties).assertSuccess();
    return {
        EnvironmentVariables: cdk.hashMapper(cdk.stringToCloudFormation)(properties.environmentVariables),
        EventSources: cdk.listMapper(cfnComponentVersionLambdaEventSourcePropertyToCloudFormation)(properties.eventSources),
        ExecArgs: cdk.listMapper(cdk.stringToCloudFormation)(properties.execArgs),
        InputPayloadEncodingType: cdk.stringToCloudFormation(properties.inputPayloadEncodingType),
        LinuxProcessParams: cfnComponentVersionLambdaLinuxProcessParamsPropertyToCloudFormation(properties.linuxProcessParams),
        MaxIdleTimeInSeconds: cdk.numberToCloudFormation(properties.maxIdleTimeInSeconds),
        MaxInstancesCount: cdk.numberToCloudFormation(properties.maxInstancesCount),
        MaxQueueSize: cdk.numberToCloudFormation(properties.maxQueueSize),
        Pinned: cdk.booleanToCloudFormation(properties.pinned),
        StatusTimeoutInSeconds: cdk.numberToCloudFormation(properties.statusTimeoutInSeconds),
        TimeoutInSeconds: cdk.numberToCloudFormation(properties.timeoutInSeconds),
    };
}

// @ts-ignore TS6133
function CfnComponentVersionLambdaExecutionParametersPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponentVersion.LambdaExecutionParametersProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponentVersion.LambdaExecutionParametersProperty>();
    ret.addPropertyResult('environmentVariables', 'EnvironmentVariables', properties.EnvironmentVariables != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.EnvironmentVariables) : undefined);
    ret.addPropertyResult('eventSources', 'EventSources', properties.EventSources != null ? cfn_parse.FromCloudFormation.getArray(CfnComponentVersionLambdaEventSourcePropertyFromCloudFormation)(properties.EventSources) : undefined);
    ret.addPropertyResult('execArgs', 'ExecArgs', properties.ExecArgs != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExecArgs) : undefined);
    ret.addPropertyResult('inputPayloadEncodingType', 'InputPayloadEncodingType', properties.InputPayloadEncodingType != null ? cfn_parse.FromCloudFormation.getString(properties.InputPayloadEncodingType) : undefined);
    ret.addPropertyResult('linuxProcessParams', 'LinuxProcessParams', properties.LinuxProcessParams != null ? CfnComponentVersionLambdaLinuxProcessParamsPropertyFromCloudFormation(properties.LinuxProcessParams) : undefined);
    ret.addPropertyResult('maxIdleTimeInSeconds', 'MaxIdleTimeInSeconds', properties.MaxIdleTimeInSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxIdleTimeInSeconds) : undefined);
    ret.addPropertyResult('maxInstancesCount', 'MaxInstancesCount', properties.MaxInstancesCount != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxInstancesCount) : undefined);
    ret.addPropertyResult('maxQueueSize', 'MaxQueueSize', properties.MaxQueueSize != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxQueueSize) : undefined);
    ret.addPropertyResult('pinned', 'Pinned', properties.Pinned != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Pinned) : undefined);
    ret.addPropertyResult('statusTimeoutInSeconds', 'StatusTimeoutInSeconds', properties.StatusTimeoutInSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.StatusTimeoutInSeconds) : undefined);
    ret.addPropertyResult('timeoutInSeconds', 'TimeoutInSeconds', properties.TimeoutInSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.TimeoutInSeconds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponentVersion {
    /**
     * Contains information about an AWS Lambda function to import to create a component.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdafunctionrecipesource.html
     */
    export interface LambdaFunctionRecipeSourceProperty {
        /**
         * The component versions on which this Lambda function component depends.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdafunctionrecipesource.html#cfn-greengrassv2-componentversion-lambdafunctionrecipesource-componentdependencies
         */
        readonly componentDependencies?: { [key: string]: (CfnComponentVersion.ComponentDependencyRequirementProperty | cdk.IResolvable) } | cdk.IResolvable;
        /**
         * The system and runtime parameters for the Lambda function as it runs on the Greengrass core device.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdafunctionrecipesource.html#cfn-greengrassv2-componentversion-lambdafunctionrecipesource-componentlambdaparameters
         */
        readonly componentLambdaParameters?: CfnComponentVersion.LambdaExecutionParametersProperty | cdk.IResolvable;
        /**
         * The name of the component.
         *
         * Defaults to the name of the Lambda function.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdafunctionrecipesource.html#cfn-greengrassv2-componentversion-lambdafunctionrecipesource-componentname
         */
        readonly componentName?: string;
        /**
         * The platforms that the component version supports.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdafunctionrecipesource.html#cfn-greengrassv2-componentversion-lambdafunctionrecipesource-componentplatforms
         */
        readonly componentPlatforms?: Array<CfnComponentVersion.ComponentPlatformProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The version of the component.
         *
         * Defaults to the version of the Lambda function as a semantic version. For example, if your function version is `3` , the component version becomes `3.0.0` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdafunctionrecipesource.html#cfn-greengrassv2-componentversion-lambdafunctionrecipesource-componentversion
         */
        readonly componentVersion?: string;
        /**
         * The ARN of the Lambda function. The ARN must include the version of the function to import. You can't use version aliases like `$LATEST` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdafunctionrecipesource.html#cfn-greengrassv2-componentversion-lambdafunctionrecipesource-lambdaarn
         */
        readonly lambdaArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LambdaFunctionRecipeSourceProperty`
 *
 * @param properties - the TypeScript properties of a `LambdaFunctionRecipeSourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponentVersion_LambdaFunctionRecipeSourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('componentDependencies', cdk.hashValidator(CfnComponentVersion_ComponentDependencyRequirementPropertyValidator))(properties.componentDependencies));
    errors.collect(cdk.propertyValidator('componentLambdaParameters', CfnComponentVersion_LambdaExecutionParametersPropertyValidator)(properties.componentLambdaParameters));
    errors.collect(cdk.propertyValidator('componentName', cdk.validateString)(properties.componentName));
    errors.collect(cdk.propertyValidator('componentPlatforms', cdk.listValidator(CfnComponentVersion_ComponentPlatformPropertyValidator))(properties.componentPlatforms));
    errors.collect(cdk.propertyValidator('componentVersion', cdk.validateString)(properties.componentVersion));
    errors.collect(cdk.propertyValidator('lambdaArn', cdk.validateString)(properties.lambdaArn));
    return errors.wrap('supplied properties not correct for "LambdaFunctionRecipeSourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.LambdaFunctionRecipeSource` resource
 *
 * @param properties - the TypeScript properties of a `LambdaFunctionRecipeSourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.LambdaFunctionRecipeSource` resource.
 */
// @ts-ignore TS6133
function cfnComponentVersionLambdaFunctionRecipeSourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponentVersion_LambdaFunctionRecipeSourcePropertyValidator(properties).assertSuccess();
    return {
        ComponentDependencies: cdk.hashMapper(cfnComponentVersionComponentDependencyRequirementPropertyToCloudFormation)(properties.componentDependencies),
        ComponentLambdaParameters: cfnComponentVersionLambdaExecutionParametersPropertyToCloudFormation(properties.componentLambdaParameters),
        ComponentName: cdk.stringToCloudFormation(properties.componentName),
        ComponentPlatforms: cdk.listMapper(cfnComponentVersionComponentPlatformPropertyToCloudFormation)(properties.componentPlatforms),
        ComponentVersion: cdk.stringToCloudFormation(properties.componentVersion),
        LambdaArn: cdk.stringToCloudFormation(properties.lambdaArn),
    };
}

// @ts-ignore TS6133
function CfnComponentVersionLambdaFunctionRecipeSourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponentVersion.LambdaFunctionRecipeSourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponentVersion.LambdaFunctionRecipeSourceProperty>();
    ret.addPropertyResult('componentDependencies', 'ComponentDependencies', properties.ComponentDependencies != null ? cfn_parse.FromCloudFormation.getMap(CfnComponentVersionComponentDependencyRequirementPropertyFromCloudFormation)(properties.ComponentDependencies) : undefined);
    ret.addPropertyResult('componentLambdaParameters', 'ComponentLambdaParameters', properties.ComponentLambdaParameters != null ? CfnComponentVersionLambdaExecutionParametersPropertyFromCloudFormation(properties.ComponentLambdaParameters) : undefined);
    ret.addPropertyResult('componentName', 'ComponentName', properties.ComponentName != null ? cfn_parse.FromCloudFormation.getString(properties.ComponentName) : undefined);
    ret.addPropertyResult('componentPlatforms', 'ComponentPlatforms', properties.ComponentPlatforms != null ? cfn_parse.FromCloudFormation.getArray(CfnComponentVersionComponentPlatformPropertyFromCloudFormation)(properties.ComponentPlatforms) : undefined);
    ret.addPropertyResult('componentVersion', 'ComponentVersion', properties.ComponentVersion != null ? cfn_parse.FromCloudFormation.getString(properties.ComponentVersion) : undefined);
    ret.addPropertyResult('lambdaArn', 'LambdaArn', properties.LambdaArn != null ? cfn_parse.FromCloudFormation.getString(properties.LambdaArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponentVersion {
    /**
     * Contains parameters for a Linux process that contains an AWS Lambda function.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdalinuxprocessparams.html
     */
    export interface LambdaLinuxProcessParamsProperty {
        /**
         * The parameters for the container in which the Lambda function runs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdalinuxprocessparams.html#cfn-greengrassv2-componentversion-lambdalinuxprocessparams-containerparams
         */
        readonly containerParams?: CfnComponentVersion.LambdaContainerParamsProperty | cdk.IResolvable;
        /**
         * The isolation mode for the process that contains the Lambda function. The process can run in an isolated runtime environment inside the AWS IoT Greengrass container, or as a regular process outside any container.
         *
         * Default: `GreengrassContainer`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdalinuxprocessparams.html#cfn-greengrassv2-componentversion-lambdalinuxprocessparams-isolationmode
         */
        readonly isolationMode?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LambdaLinuxProcessParamsProperty`
 *
 * @param properties - the TypeScript properties of a `LambdaLinuxProcessParamsProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponentVersion_LambdaLinuxProcessParamsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('containerParams', CfnComponentVersion_LambdaContainerParamsPropertyValidator)(properties.containerParams));
    errors.collect(cdk.propertyValidator('isolationMode', cdk.validateString)(properties.isolationMode));
    return errors.wrap('supplied properties not correct for "LambdaLinuxProcessParamsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.LambdaLinuxProcessParams` resource
 *
 * @param properties - the TypeScript properties of a `LambdaLinuxProcessParamsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.LambdaLinuxProcessParams` resource.
 */
// @ts-ignore TS6133
function cfnComponentVersionLambdaLinuxProcessParamsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponentVersion_LambdaLinuxProcessParamsPropertyValidator(properties).assertSuccess();
    return {
        ContainerParams: cfnComponentVersionLambdaContainerParamsPropertyToCloudFormation(properties.containerParams),
        IsolationMode: cdk.stringToCloudFormation(properties.isolationMode),
    };
}

// @ts-ignore TS6133
function CfnComponentVersionLambdaLinuxProcessParamsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponentVersion.LambdaLinuxProcessParamsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponentVersion.LambdaLinuxProcessParamsProperty>();
    ret.addPropertyResult('containerParams', 'ContainerParams', properties.ContainerParams != null ? CfnComponentVersionLambdaContainerParamsPropertyFromCloudFormation(properties.ContainerParams) : undefined);
    ret.addPropertyResult('isolationMode', 'IsolationMode', properties.IsolationMode != null ? cfn_parse.FromCloudFormation.getString(properties.IsolationMode) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponentVersion {
    /**
     * Contains information about a volume that Linux processes in a container can access. When you define a volume, the  software mounts the source files to the destination inside the container.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdavolumemount.html
     */
    export interface LambdaVolumeMountProperty {
        /**
         * Whether or not to add the AWS IoT Greengrass user group as an owner of the volume.
         *
         * Default: `false`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdavolumemount.html#cfn-greengrassv2-componentversion-lambdavolumemount-addgroupowner
         */
        readonly addGroupOwner?: boolean | cdk.IResolvable;
        /**
         * The path to the logical volume in the file system.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdavolumemount.html#cfn-greengrassv2-componentversion-lambdavolumemount-destinationpath
         */
        readonly destinationPath?: string;
        /**
         * The permission to access the volume: read/only ( `ro` ) or read/write ( `rw` ).
         *
         * Default: `ro`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdavolumemount.html#cfn-greengrassv2-componentversion-lambdavolumemount-permission
         */
        readonly permission?: string;
        /**
         * The path to the physical volume in the file system.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-greengrassv2-componentversion-lambdavolumemount.html#cfn-greengrassv2-componentversion-lambdavolumemount-sourcepath
         */
        readonly sourcePath?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LambdaVolumeMountProperty`
 *
 * @param properties - the TypeScript properties of a `LambdaVolumeMountProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponentVersion_LambdaVolumeMountPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('addGroupOwner', cdk.validateBoolean)(properties.addGroupOwner));
    errors.collect(cdk.propertyValidator('destinationPath', cdk.validateString)(properties.destinationPath));
    errors.collect(cdk.propertyValidator('permission', cdk.validateString)(properties.permission));
    errors.collect(cdk.propertyValidator('sourcePath', cdk.validateString)(properties.sourcePath));
    return errors.wrap('supplied properties not correct for "LambdaVolumeMountProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.LambdaVolumeMount` resource
 *
 * @param properties - the TypeScript properties of a `LambdaVolumeMountProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GreengrassV2::ComponentVersion.LambdaVolumeMount` resource.
 */
// @ts-ignore TS6133
function cfnComponentVersionLambdaVolumeMountPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponentVersion_LambdaVolumeMountPropertyValidator(properties).assertSuccess();
    return {
        AddGroupOwner: cdk.booleanToCloudFormation(properties.addGroupOwner),
        DestinationPath: cdk.stringToCloudFormation(properties.destinationPath),
        Permission: cdk.stringToCloudFormation(properties.permission),
        SourcePath: cdk.stringToCloudFormation(properties.sourcePath),
    };
}

// @ts-ignore TS6133
function CfnComponentVersionLambdaVolumeMountPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponentVersion.LambdaVolumeMountProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponentVersion.LambdaVolumeMountProperty>();
    ret.addPropertyResult('addGroupOwner', 'AddGroupOwner', properties.AddGroupOwner != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AddGroupOwner) : undefined);
    ret.addPropertyResult('destinationPath', 'DestinationPath', properties.DestinationPath != null ? cfn_parse.FromCloudFormation.getString(properties.DestinationPath) : undefined);
    ret.addPropertyResult('permission', 'Permission', properties.Permission != null ? cfn_parse.FromCloudFormation.getString(properties.Permission) : undefined);
    ret.addPropertyResult('sourcePath', 'SourcePath', properties.SourcePath != null ? cfn_parse.FromCloudFormation.getString(properties.SourcePath) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
