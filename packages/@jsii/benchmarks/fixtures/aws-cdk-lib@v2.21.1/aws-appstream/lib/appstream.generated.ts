// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:06.725Z","fingerprint":"D1TbitJpt6ZxmObgO6NqYhJ7/OB1PfSRsFTAeEsKiNA="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnAppBlock`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblock.html
 */
export interface CfnAppBlockProps {

    /**
     * The name of the app block.
     *
     * *Pattern* : `^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,100}$`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblock.html#cfn-appstream-appblock-name
     */
    readonly name: string;

    /**
     * The setup script details of the app block.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblock.html#cfn-appstream-appblock-setupscriptdetails
     */
    readonly setupScriptDetails: CfnAppBlock.ScriptDetailsProperty | cdk.IResolvable;

    /**
     * The source S3 location of the app block.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblock.html#cfn-appstream-appblock-sources3location
     */
    readonly sourceS3Location: CfnAppBlock.S3LocationProperty | cdk.IResolvable;

    /**
     * The description of the app block.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblock.html#cfn-appstream-appblock-description
     */
    readonly description?: string;

    /**
     * The display name of the app block.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblock.html#cfn-appstream-appblock-displayname
     */
    readonly displayName?: string;

    /**
     * The tags of the app block.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblock.html#cfn-appstream-appblock-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnAppBlockProps`
 *
 * @param properties - the TypeScript properties of a `CfnAppBlockProps`
 *
 * @returns the result of the validation.
 */
function CfnAppBlockPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('displayName', cdk.validateString)(properties.displayName));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('setupScriptDetails', cdk.requiredValidator)(properties.setupScriptDetails));
    errors.collect(cdk.propertyValidator('setupScriptDetails', CfnAppBlock_ScriptDetailsPropertyValidator)(properties.setupScriptDetails));
    errors.collect(cdk.propertyValidator('sourceS3Location', cdk.requiredValidator)(properties.sourceS3Location));
    errors.collect(cdk.propertyValidator('sourceS3Location', CfnAppBlock_S3LocationPropertyValidator)(properties.sourceS3Location));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnAppBlockProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::AppBlock` resource
 *
 * @param properties - the TypeScript properties of a `CfnAppBlockProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::AppBlock` resource.
 */
// @ts-ignore TS6133
function cfnAppBlockPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAppBlockPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        SetupScriptDetails: cfnAppBlockScriptDetailsPropertyToCloudFormation(properties.setupScriptDetails),
        SourceS3Location: cfnAppBlockS3LocationPropertyToCloudFormation(properties.sourceS3Location),
        Description: cdk.stringToCloudFormation(properties.description),
        DisplayName: cdk.stringToCloudFormation(properties.displayName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnAppBlockPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAppBlockProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAppBlockProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('setupScriptDetails', 'SetupScriptDetails', CfnAppBlockScriptDetailsPropertyFromCloudFormation(properties.SetupScriptDetails));
    ret.addPropertyResult('sourceS3Location', 'SourceS3Location', CfnAppBlockS3LocationPropertyFromCloudFormation(properties.SourceS3Location));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('displayName', 'DisplayName', properties.DisplayName != null ? cfn_parse.FromCloudFormation.getString(properties.DisplayName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppStream::AppBlock`
 *
 * This resource creates an app block. App blocks store details about the virtual hard disk that contains the files for the application in an S3 bucket. It also stores the setup script with details about how to mount the virtual hard disk. App blocks are only supported for Elastic fleets.
 *
 * @cloudformationResource AWS::AppStream::AppBlock
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblock.html
 */
export class CfnAppBlock extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppStream::AppBlock";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAppBlock {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAppBlockPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAppBlock(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the app block.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The time when the app block was created.
     * @cloudformationAttribute CreatedTime
     */
    public readonly attrCreatedTime: string;

    /**
     * The name of the app block.
     *
     * *Pattern* : `^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,100}$`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblock.html#cfn-appstream-appblock-name
     */
    public name: string;

    /**
     * The setup script details of the app block.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblock.html#cfn-appstream-appblock-setupscriptdetails
     */
    public setupScriptDetails: CfnAppBlock.ScriptDetailsProperty | cdk.IResolvable;

    /**
     * The source S3 location of the app block.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblock.html#cfn-appstream-appblock-sources3location
     */
    public sourceS3Location: CfnAppBlock.S3LocationProperty | cdk.IResolvable;

    /**
     * The description of the app block.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblock.html#cfn-appstream-appblock-description
     */
    public description: string | undefined;

    /**
     * The display name of the app block.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblock.html#cfn-appstream-appblock-displayname
     */
    public displayName: string | undefined;

    /**
     * The tags of the app block.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-appblock.html#cfn-appstream-appblock-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::AppStream::AppBlock`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAppBlockProps) {
        super(scope, id, { type: CfnAppBlock.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'setupScriptDetails', this);
        cdk.requireProperty(props, 'sourceS3Location', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCreatedTime = cdk.Token.asString(this.getAtt('CreatedTime'));

        this.name = props.name;
        this.setupScriptDetails = props.setupScriptDetails;
        this.sourceS3Location = props.sourceS3Location;
        this.description = props.description;
        this.displayName = props.displayName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::AppStream::AppBlock", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAppBlock.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            setupScriptDetails: this.setupScriptDetails,
            sourceS3Location: this.sourceS3Location,
            description: this.description,
            displayName: this.displayName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAppBlockPropsToCloudFormation(props);
    }
}

export namespace CfnAppBlock {
    /**
     * The S3 location of the app block.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-appblock-s3location.html
     */
    export interface S3LocationProperty {
        /**
         * The S3 bucket of the app block.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-appblock-s3location.html#cfn-appstream-appblock-s3location-s3bucket
         */
        readonly s3Bucket: string;
        /**
         * The S3 key of the S3 object of the virtual hard disk.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-appblock-s3location.html#cfn-appstream-appblock-s3location-s3key
         */
        readonly s3Key: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3LocationProperty`
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the result of the validation.
 */
function CfnAppBlock_S3LocationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Bucket', cdk.requiredValidator)(properties.s3Bucket));
    errors.collect(cdk.propertyValidator('s3Bucket', cdk.validateString)(properties.s3Bucket));
    errors.collect(cdk.propertyValidator('s3Key', cdk.requiredValidator)(properties.s3Key));
    errors.collect(cdk.propertyValidator('s3Key', cdk.validateString)(properties.s3Key));
    return errors.wrap('supplied properties not correct for "S3LocationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::AppBlock.S3Location` resource
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::AppBlock.S3Location` resource.
 */
// @ts-ignore TS6133
function cfnAppBlockS3LocationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAppBlock_S3LocationPropertyValidator(properties).assertSuccess();
    return {
        S3Bucket: cdk.stringToCloudFormation(properties.s3Bucket),
        S3Key: cdk.stringToCloudFormation(properties.s3Key),
    };
}

// @ts-ignore TS6133
function CfnAppBlockS3LocationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAppBlock.S3LocationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAppBlock.S3LocationProperty>();
    ret.addPropertyResult('s3Bucket', 'S3Bucket', cfn_parse.FromCloudFormation.getString(properties.S3Bucket));
    ret.addPropertyResult('s3Key', 'S3Key', cfn_parse.FromCloudFormation.getString(properties.S3Key));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAppBlock {
    /**
     * The details of the script.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-appblock-scriptdetails.html
     */
    export interface ScriptDetailsProperty {
        /**
         * The parameters used in the run path for the script.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-appblock-scriptdetails.html#cfn-appstream-appblock-scriptdetails-executableparameters
         */
        readonly executableParameters?: string;
        /**
         * The run path for the script.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-appblock-scriptdetails.html#cfn-appstream-appblock-scriptdetails-executablepath
         */
        readonly executablePath: string;
        /**
         * The S3 object location of the script.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-appblock-scriptdetails.html#cfn-appstream-appblock-scriptdetails-scripts3location
         */
        readonly scriptS3Location: CfnAppBlock.S3LocationProperty | cdk.IResolvable;
        /**
         * The run timeout, in seconds, for the script.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-appblock-scriptdetails.html#cfn-appstream-appblock-scriptdetails-timeoutinseconds
         */
        readonly timeoutInSeconds: number;
    }
}

/**
 * Determine whether the given properties match those of a `ScriptDetailsProperty`
 *
 * @param properties - the TypeScript properties of a `ScriptDetailsProperty`
 *
 * @returns the result of the validation.
 */
function CfnAppBlock_ScriptDetailsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('executableParameters', cdk.validateString)(properties.executableParameters));
    errors.collect(cdk.propertyValidator('executablePath', cdk.requiredValidator)(properties.executablePath));
    errors.collect(cdk.propertyValidator('executablePath', cdk.validateString)(properties.executablePath));
    errors.collect(cdk.propertyValidator('scriptS3Location', cdk.requiredValidator)(properties.scriptS3Location));
    errors.collect(cdk.propertyValidator('scriptS3Location', CfnAppBlock_S3LocationPropertyValidator)(properties.scriptS3Location));
    errors.collect(cdk.propertyValidator('timeoutInSeconds', cdk.requiredValidator)(properties.timeoutInSeconds));
    errors.collect(cdk.propertyValidator('timeoutInSeconds', cdk.validateNumber)(properties.timeoutInSeconds));
    return errors.wrap('supplied properties not correct for "ScriptDetailsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::AppBlock.ScriptDetails` resource
 *
 * @param properties - the TypeScript properties of a `ScriptDetailsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::AppBlock.ScriptDetails` resource.
 */
// @ts-ignore TS6133
function cfnAppBlockScriptDetailsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAppBlock_ScriptDetailsPropertyValidator(properties).assertSuccess();
    return {
        ExecutableParameters: cdk.stringToCloudFormation(properties.executableParameters),
        ExecutablePath: cdk.stringToCloudFormation(properties.executablePath),
        ScriptS3Location: cfnAppBlockS3LocationPropertyToCloudFormation(properties.scriptS3Location),
        TimeoutInSeconds: cdk.numberToCloudFormation(properties.timeoutInSeconds),
    };
}

// @ts-ignore TS6133
function CfnAppBlockScriptDetailsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAppBlock.ScriptDetailsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAppBlock.ScriptDetailsProperty>();
    ret.addPropertyResult('executableParameters', 'ExecutableParameters', properties.ExecutableParameters != null ? cfn_parse.FromCloudFormation.getString(properties.ExecutableParameters) : undefined);
    ret.addPropertyResult('executablePath', 'ExecutablePath', cfn_parse.FromCloudFormation.getString(properties.ExecutablePath));
    ret.addPropertyResult('scriptS3Location', 'ScriptS3Location', CfnAppBlockS3LocationPropertyFromCloudFormation(properties.ScriptS3Location));
    ret.addPropertyResult('timeoutInSeconds', 'TimeoutInSeconds', cfn_parse.FromCloudFormation.getNumber(properties.TimeoutInSeconds));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnApplication`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html
 */
export interface CfnApplicationProps {

    /**
     * The app block ARN with which the application should be associated.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-appblockarn
     */
    readonly appBlockArn: string;

    /**
     * The icon S3 location of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-icons3location
     */
    readonly iconS3Location: CfnApplication.S3LocationProperty | cdk.IResolvable;

    /**
     * The instance families the application supports.
     *
     * *Allowed Values* : `GENERAL_PURPOSE` | `GRAPHICS_G4`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-instancefamilies
     */
    readonly instanceFamilies: string[];

    /**
     * The launch path of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-launchpath
     */
    readonly launchPath: string;

    /**
     * The name of the application. This name is visible to users when a name is not specified in the DisplayName property.
     *
     * *Pattern* : `^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,100}$`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-name
     */
    readonly name: string;

    /**
     * The platforms the application supports.
     *
     * *Allowed Values* : `WINDOWS_SERVER_2019` | `AMAZON_LINUX2`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-platforms
     */
    readonly platforms: string[];

    /**
     * A list of attributes to delete from an application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-attributestodelete
     */
    readonly attributesToDelete?: string[];

    /**
     * The description of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-description
     */
    readonly description?: string;

    /**
     * The display name of the application. This name is visible to users in the application catalog.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-displayname
     */
    readonly displayName?: string;

    /**
     * The launch parameters of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-launchparameters
     */
    readonly launchParameters?: string;

    /**
     * The tags of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The working directory of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-workingdirectory
     */
    readonly workingDirectory?: string;
}

/**
 * Determine whether the given properties match those of a `CfnApplicationProps`
 *
 * @param properties - the TypeScript properties of a `CfnApplicationProps`
 *
 * @returns the result of the validation.
 */
function CfnApplicationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('appBlockArn', cdk.requiredValidator)(properties.appBlockArn));
    errors.collect(cdk.propertyValidator('appBlockArn', cdk.validateString)(properties.appBlockArn));
    errors.collect(cdk.propertyValidator('attributesToDelete', cdk.listValidator(cdk.validateString))(properties.attributesToDelete));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('displayName', cdk.validateString)(properties.displayName));
    errors.collect(cdk.propertyValidator('iconS3Location', cdk.requiredValidator)(properties.iconS3Location));
    errors.collect(cdk.propertyValidator('iconS3Location', CfnApplication_S3LocationPropertyValidator)(properties.iconS3Location));
    errors.collect(cdk.propertyValidator('instanceFamilies', cdk.requiredValidator)(properties.instanceFamilies));
    errors.collect(cdk.propertyValidator('instanceFamilies', cdk.listValidator(cdk.validateString))(properties.instanceFamilies));
    errors.collect(cdk.propertyValidator('launchParameters', cdk.validateString)(properties.launchParameters));
    errors.collect(cdk.propertyValidator('launchPath', cdk.requiredValidator)(properties.launchPath));
    errors.collect(cdk.propertyValidator('launchPath', cdk.validateString)(properties.launchPath));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('platforms', cdk.requiredValidator)(properties.platforms));
    errors.collect(cdk.propertyValidator('platforms', cdk.listValidator(cdk.validateString))(properties.platforms));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('workingDirectory', cdk.validateString)(properties.workingDirectory));
    return errors.wrap('supplied properties not correct for "CfnApplicationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::Application` resource
 *
 * @param properties - the TypeScript properties of a `CfnApplicationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::Application` resource.
 */
// @ts-ignore TS6133
function cfnApplicationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationPropsValidator(properties).assertSuccess();
    return {
        AppBlockArn: cdk.stringToCloudFormation(properties.appBlockArn),
        IconS3Location: cfnApplicationS3LocationPropertyToCloudFormation(properties.iconS3Location),
        InstanceFamilies: cdk.listMapper(cdk.stringToCloudFormation)(properties.instanceFamilies),
        LaunchPath: cdk.stringToCloudFormation(properties.launchPath),
        Name: cdk.stringToCloudFormation(properties.name),
        Platforms: cdk.listMapper(cdk.stringToCloudFormation)(properties.platforms),
        AttributesToDelete: cdk.listMapper(cdk.stringToCloudFormation)(properties.attributesToDelete),
        Description: cdk.stringToCloudFormation(properties.description),
        DisplayName: cdk.stringToCloudFormation(properties.displayName),
        LaunchParameters: cdk.stringToCloudFormation(properties.launchParameters),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        WorkingDirectory: cdk.stringToCloudFormation(properties.workingDirectory),
    };
}

// @ts-ignore TS6133
function CfnApplicationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationProps>();
    ret.addPropertyResult('appBlockArn', 'AppBlockArn', cfn_parse.FromCloudFormation.getString(properties.AppBlockArn));
    ret.addPropertyResult('iconS3Location', 'IconS3Location', CfnApplicationS3LocationPropertyFromCloudFormation(properties.IconS3Location));
    ret.addPropertyResult('instanceFamilies', 'InstanceFamilies', cfn_parse.FromCloudFormation.getStringArray(properties.InstanceFamilies));
    ret.addPropertyResult('launchPath', 'LaunchPath', cfn_parse.FromCloudFormation.getString(properties.LaunchPath));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('platforms', 'Platforms', cfn_parse.FromCloudFormation.getStringArray(properties.Platforms));
    ret.addPropertyResult('attributesToDelete', 'AttributesToDelete', properties.AttributesToDelete != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AttributesToDelete) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('displayName', 'DisplayName', properties.DisplayName != null ? cfn_parse.FromCloudFormation.getString(properties.DisplayName) : undefined);
    ret.addPropertyResult('launchParameters', 'LaunchParameters', properties.LaunchParameters != null ? cfn_parse.FromCloudFormation.getString(properties.LaunchParameters) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('workingDirectory', 'WorkingDirectory', properties.WorkingDirectory != null ? cfn_parse.FromCloudFormation.getString(properties.WorkingDirectory) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppStream::Application`
 *
 * This resource creates an application. Applications store the details about how to launch applications on streaming instances. This is only supported for Elastic fleets.
 *
 * @cloudformationResource AWS::AppStream::Application
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html
 */
export class CfnApplication extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppStream::Application";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnApplication {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnApplicationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnApplication(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the application.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The time when the application was created.
     * @cloudformationAttribute CreatedTime
     */
    public readonly attrCreatedTime: string;

    /**
     * The app block ARN with which the application should be associated.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-appblockarn
     */
    public appBlockArn: string;

    /**
     * The icon S3 location of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-icons3location
     */
    public iconS3Location: CfnApplication.S3LocationProperty | cdk.IResolvable;

    /**
     * The instance families the application supports.
     *
     * *Allowed Values* : `GENERAL_PURPOSE` | `GRAPHICS_G4`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-instancefamilies
     */
    public instanceFamilies: string[];

    /**
     * The launch path of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-launchpath
     */
    public launchPath: string;

    /**
     * The name of the application. This name is visible to users when a name is not specified in the DisplayName property.
     *
     * *Pattern* : `^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,100}$`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-name
     */
    public name: string;

    /**
     * The platforms the application supports.
     *
     * *Allowed Values* : `WINDOWS_SERVER_2019` | `AMAZON_LINUX2`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-platforms
     */
    public platforms: string[];

    /**
     * A list of attributes to delete from an application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-attributestodelete
     */
    public attributesToDelete: string[] | undefined;

    /**
     * The description of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-description
     */
    public description: string | undefined;

    /**
     * The display name of the application. This name is visible to users in the application catalog.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-displayname
     */
    public displayName: string | undefined;

    /**
     * The launch parameters of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-launchparameters
     */
    public launchParameters: string | undefined;

    /**
     * The tags of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The working directory of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-application.html#cfn-appstream-application-workingdirectory
     */
    public workingDirectory: string | undefined;

    /**
     * Create a new `AWS::AppStream::Application`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnApplicationProps) {
        super(scope, id, { type: CfnApplication.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'appBlockArn', this);
        cdk.requireProperty(props, 'iconS3Location', this);
        cdk.requireProperty(props, 'instanceFamilies', this);
        cdk.requireProperty(props, 'launchPath', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'platforms', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCreatedTime = cdk.Token.asString(this.getAtt('CreatedTime'));

        this.appBlockArn = props.appBlockArn;
        this.iconS3Location = props.iconS3Location;
        this.instanceFamilies = props.instanceFamilies;
        this.launchPath = props.launchPath;
        this.name = props.name;
        this.platforms = props.platforms;
        this.attributesToDelete = props.attributesToDelete;
        this.description = props.description;
        this.displayName = props.displayName;
        this.launchParameters = props.launchParameters;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::AppStream::Application", props.tags, { tagPropertyName: 'tags' });
        this.workingDirectory = props.workingDirectory;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnApplication.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            appBlockArn: this.appBlockArn,
            iconS3Location: this.iconS3Location,
            instanceFamilies: this.instanceFamilies,
            launchPath: this.launchPath,
            name: this.name,
            platforms: this.platforms,
            attributesToDelete: this.attributesToDelete,
            description: this.description,
            displayName: this.displayName,
            launchParameters: this.launchParameters,
            tags: this.tags.renderTags(),
            workingDirectory: this.workingDirectory,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnApplicationPropsToCloudFormation(props);
    }
}

export namespace CfnApplication {
    /**
     * The S3 location of the application icon.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-application-s3location.html
     */
    export interface S3LocationProperty {
        /**
         * The S3 bucket of the S3 object.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-application-s3location.html#cfn-appstream-application-s3location-s3bucket
         */
        readonly s3Bucket: string;
        /**
         * The S3 key of the S3 object.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-application-s3location.html#cfn-appstream-application-s3location-s3key
         */
        readonly s3Key: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3LocationProperty`
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplication_S3LocationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Bucket', cdk.requiredValidator)(properties.s3Bucket));
    errors.collect(cdk.propertyValidator('s3Bucket', cdk.validateString)(properties.s3Bucket));
    errors.collect(cdk.propertyValidator('s3Key', cdk.requiredValidator)(properties.s3Key));
    errors.collect(cdk.propertyValidator('s3Key', cdk.validateString)(properties.s3Key));
    return errors.wrap('supplied properties not correct for "S3LocationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::Application.S3Location` resource
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::Application.S3Location` resource.
 */
// @ts-ignore TS6133
function cfnApplicationS3LocationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplication_S3LocationPropertyValidator(properties).assertSuccess();
    return {
        S3Bucket: cdk.stringToCloudFormation(properties.s3Bucket),
        S3Key: cdk.stringToCloudFormation(properties.s3Key),
    };
}

// @ts-ignore TS6133
function CfnApplicationS3LocationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplication.S3LocationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplication.S3LocationProperty>();
    ret.addPropertyResult('s3Bucket', 'S3Bucket', cfn_parse.FromCloudFormation.getString(properties.S3Bucket));
    ret.addPropertyResult('s3Key', 'S3Key', cfn_parse.FromCloudFormation.getString(properties.S3Key));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnApplicationEntitlementAssociation`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationentitlementassociation.html
 */
export interface CfnApplicationEntitlementAssociationProps {

    /**
     * The identifier of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationentitlementassociation.html#cfn-appstream-applicationentitlementassociation-applicationidentifier
     */
    readonly applicationIdentifier: string;

    /**
     * The name of the entitlement.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationentitlementassociation.html#cfn-appstream-applicationentitlementassociation-entitlementname
     */
    readonly entitlementName: string;

    /**
     * The name of the stack.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationentitlementassociation.html#cfn-appstream-applicationentitlementassociation-stackname
     */
    readonly stackName: string;
}

/**
 * Determine whether the given properties match those of a `CfnApplicationEntitlementAssociationProps`
 *
 * @param properties - the TypeScript properties of a `CfnApplicationEntitlementAssociationProps`
 *
 * @returns the result of the validation.
 */
function CfnApplicationEntitlementAssociationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('applicationIdentifier', cdk.requiredValidator)(properties.applicationIdentifier));
    errors.collect(cdk.propertyValidator('applicationIdentifier', cdk.validateString)(properties.applicationIdentifier));
    errors.collect(cdk.propertyValidator('entitlementName', cdk.requiredValidator)(properties.entitlementName));
    errors.collect(cdk.propertyValidator('entitlementName', cdk.validateString)(properties.entitlementName));
    errors.collect(cdk.propertyValidator('stackName', cdk.requiredValidator)(properties.stackName));
    errors.collect(cdk.propertyValidator('stackName', cdk.validateString)(properties.stackName));
    return errors.wrap('supplied properties not correct for "CfnApplicationEntitlementAssociationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::ApplicationEntitlementAssociation` resource
 *
 * @param properties - the TypeScript properties of a `CfnApplicationEntitlementAssociationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::ApplicationEntitlementAssociation` resource.
 */
// @ts-ignore TS6133
function cfnApplicationEntitlementAssociationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationEntitlementAssociationPropsValidator(properties).assertSuccess();
    return {
        ApplicationIdentifier: cdk.stringToCloudFormation(properties.applicationIdentifier),
        EntitlementName: cdk.stringToCloudFormation(properties.entitlementName),
        StackName: cdk.stringToCloudFormation(properties.stackName),
    };
}

// @ts-ignore TS6133
function CfnApplicationEntitlementAssociationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationEntitlementAssociationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationEntitlementAssociationProps>();
    ret.addPropertyResult('applicationIdentifier', 'ApplicationIdentifier', cfn_parse.FromCloudFormation.getString(properties.ApplicationIdentifier));
    ret.addPropertyResult('entitlementName', 'EntitlementName', cfn_parse.FromCloudFormation.getString(properties.EntitlementName));
    ret.addPropertyResult('stackName', 'StackName', cfn_parse.FromCloudFormation.getString(properties.StackName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppStream::ApplicationEntitlementAssociation`
 *
 * Associates an application to an entitlement.
 *
 * @cloudformationResource AWS::AppStream::ApplicationEntitlementAssociation
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationentitlementassociation.html
 */
export class CfnApplicationEntitlementAssociation extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppStream::ApplicationEntitlementAssociation";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnApplicationEntitlementAssociation {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnApplicationEntitlementAssociationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnApplicationEntitlementAssociation(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The identifier of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationentitlementassociation.html#cfn-appstream-applicationentitlementassociation-applicationidentifier
     */
    public applicationIdentifier: string;

    /**
     * The name of the entitlement.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationentitlementassociation.html#cfn-appstream-applicationentitlementassociation-entitlementname
     */
    public entitlementName: string;

    /**
     * The name of the stack.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationentitlementassociation.html#cfn-appstream-applicationentitlementassociation-stackname
     */
    public stackName: string;

    /**
     * Create a new `AWS::AppStream::ApplicationEntitlementAssociation`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnApplicationEntitlementAssociationProps) {
        super(scope, id, { type: CfnApplicationEntitlementAssociation.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'applicationIdentifier', this);
        cdk.requireProperty(props, 'entitlementName', this);
        cdk.requireProperty(props, 'stackName', this);

        this.applicationIdentifier = props.applicationIdentifier;
        this.entitlementName = props.entitlementName;
        this.stackName = props.stackName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnApplicationEntitlementAssociation.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            applicationIdentifier: this.applicationIdentifier,
            entitlementName: this.entitlementName,
            stackName: this.stackName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnApplicationEntitlementAssociationPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnApplicationFleetAssociation`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationfleetassociation.html
 */
export interface CfnApplicationFleetAssociationProps {

    /**
     * The ARN of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationfleetassociation.html#cfn-appstream-applicationfleetassociation-applicationarn
     */
    readonly applicationArn: string;

    /**
     * The name of the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationfleetassociation.html#cfn-appstream-applicationfleetassociation-fleetname
     */
    readonly fleetName: string;
}

/**
 * Determine whether the given properties match those of a `CfnApplicationFleetAssociationProps`
 *
 * @param properties - the TypeScript properties of a `CfnApplicationFleetAssociationProps`
 *
 * @returns the result of the validation.
 */
function CfnApplicationFleetAssociationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('applicationArn', cdk.requiredValidator)(properties.applicationArn));
    errors.collect(cdk.propertyValidator('applicationArn', cdk.validateString)(properties.applicationArn));
    errors.collect(cdk.propertyValidator('fleetName', cdk.requiredValidator)(properties.fleetName));
    errors.collect(cdk.propertyValidator('fleetName', cdk.validateString)(properties.fleetName));
    return errors.wrap('supplied properties not correct for "CfnApplicationFleetAssociationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::ApplicationFleetAssociation` resource
 *
 * @param properties - the TypeScript properties of a `CfnApplicationFleetAssociationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::ApplicationFleetAssociation` resource.
 */
// @ts-ignore TS6133
function cfnApplicationFleetAssociationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationFleetAssociationPropsValidator(properties).assertSuccess();
    return {
        ApplicationArn: cdk.stringToCloudFormation(properties.applicationArn),
        FleetName: cdk.stringToCloudFormation(properties.fleetName),
    };
}

// @ts-ignore TS6133
function CfnApplicationFleetAssociationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationFleetAssociationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationFleetAssociationProps>();
    ret.addPropertyResult('applicationArn', 'ApplicationArn', cfn_parse.FromCloudFormation.getString(properties.ApplicationArn));
    ret.addPropertyResult('fleetName', 'FleetName', cfn_parse.FromCloudFormation.getString(properties.FleetName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppStream::ApplicationFleetAssociation`
 *
 * This resource associates the specified application with the specified fleet. This is only supported for Elastic fleets.
 *
 * @cloudformationResource AWS::AppStream::ApplicationFleetAssociation
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationfleetassociation.html
 */
export class CfnApplicationFleetAssociation extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppStream::ApplicationFleetAssociation";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnApplicationFleetAssociation {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnApplicationFleetAssociationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnApplicationFleetAssociation(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationfleetassociation.html#cfn-appstream-applicationfleetassociation-applicationarn
     */
    public applicationArn: string;

    /**
     * The name of the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationfleetassociation.html#cfn-appstream-applicationfleetassociation-fleetname
     */
    public fleetName: string;

    /**
     * Create a new `AWS::AppStream::ApplicationFleetAssociation`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnApplicationFleetAssociationProps) {
        super(scope, id, { type: CfnApplicationFleetAssociation.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'applicationArn', this);
        cdk.requireProperty(props, 'fleetName', this);

        this.applicationArn = props.applicationArn;
        this.fleetName = props.fleetName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnApplicationFleetAssociation.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            applicationArn: this.applicationArn,
            fleetName: this.fleetName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnApplicationFleetAssociationPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnDirectoryConfig`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-directoryconfig.html
 */
export interface CfnDirectoryConfigProps {

    /**
     * The fully qualified name of the directory (for example, corp.example.com).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-directoryconfig.html#cfn-appstream-directoryconfig-directoryname
     */
    readonly directoryName: string;

    /**
     * The distinguished names of the organizational units for computer accounts.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-directoryconfig.html#cfn-appstream-directoryconfig-organizationalunitdistinguishednames
     */
    readonly organizationalUnitDistinguishedNames: string[];

    /**
     * The credentials for the service account used by the streaming instance to connect to the directory. Do not use this parameter directly. Use `ServiceAccountCredentials` as an input parameter with `noEcho` as shown in the [Parameters](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html) . For best practices information, see [Do Not Embed Credentials in Your Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/best-practices.html#creds) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-directoryconfig.html#cfn-appstream-directoryconfig-serviceaccountcredentials
     */
    readonly serviceAccountCredentials: CfnDirectoryConfig.ServiceAccountCredentialsProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnDirectoryConfigProps`
 *
 * @param properties - the TypeScript properties of a `CfnDirectoryConfigProps`
 *
 * @returns the result of the validation.
 */
function CfnDirectoryConfigPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('directoryName', cdk.requiredValidator)(properties.directoryName));
    errors.collect(cdk.propertyValidator('directoryName', cdk.validateString)(properties.directoryName));
    errors.collect(cdk.propertyValidator('organizationalUnitDistinguishedNames', cdk.requiredValidator)(properties.organizationalUnitDistinguishedNames));
    errors.collect(cdk.propertyValidator('organizationalUnitDistinguishedNames', cdk.listValidator(cdk.validateString))(properties.organizationalUnitDistinguishedNames));
    errors.collect(cdk.propertyValidator('serviceAccountCredentials', cdk.requiredValidator)(properties.serviceAccountCredentials));
    errors.collect(cdk.propertyValidator('serviceAccountCredentials', CfnDirectoryConfig_ServiceAccountCredentialsPropertyValidator)(properties.serviceAccountCredentials));
    return errors.wrap('supplied properties not correct for "CfnDirectoryConfigProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::DirectoryConfig` resource
 *
 * @param properties - the TypeScript properties of a `CfnDirectoryConfigProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::DirectoryConfig` resource.
 */
// @ts-ignore TS6133
function cfnDirectoryConfigPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDirectoryConfigPropsValidator(properties).assertSuccess();
    return {
        DirectoryName: cdk.stringToCloudFormation(properties.directoryName),
        OrganizationalUnitDistinguishedNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.organizationalUnitDistinguishedNames),
        ServiceAccountCredentials: cfnDirectoryConfigServiceAccountCredentialsPropertyToCloudFormation(properties.serviceAccountCredentials),
    };
}

// @ts-ignore TS6133
function CfnDirectoryConfigPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDirectoryConfigProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDirectoryConfigProps>();
    ret.addPropertyResult('directoryName', 'DirectoryName', cfn_parse.FromCloudFormation.getString(properties.DirectoryName));
    ret.addPropertyResult('organizationalUnitDistinguishedNames', 'OrganizationalUnitDistinguishedNames', cfn_parse.FromCloudFormation.getStringArray(properties.OrganizationalUnitDistinguishedNames));
    ret.addPropertyResult('serviceAccountCredentials', 'ServiceAccountCredentials', CfnDirectoryConfigServiceAccountCredentialsPropertyFromCloudFormation(properties.ServiceAccountCredentials));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppStream::DirectoryConfig`
 *
 * The `AWS::AppStream::DirectoryConfig` resource specifies the configuration information required to join Amazon AppStream 2.0 fleets and image builders to Microsoft Active Directory domains.
 *
 * @cloudformationResource AWS::AppStream::DirectoryConfig
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-directoryconfig.html
 */
export class CfnDirectoryConfig extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppStream::DirectoryConfig";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDirectoryConfig {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDirectoryConfigPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDirectoryConfig(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The fully qualified name of the directory (for example, corp.example.com).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-directoryconfig.html#cfn-appstream-directoryconfig-directoryname
     */
    public directoryName: string;

    /**
     * The distinguished names of the organizational units for computer accounts.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-directoryconfig.html#cfn-appstream-directoryconfig-organizationalunitdistinguishednames
     */
    public organizationalUnitDistinguishedNames: string[];

    /**
     * The credentials for the service account used by the streaming instance to connect to the directory. Do not use this parameter directly. Use `ServiceAccountCredentials` as an input parameter with `noEcho` as shown in the [Parameters](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html) . For best practices information, see [Do Not Embed Credentials in Your Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/best-practices.html#creds) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-directoryconfig.html#cfn-appstream-directoryconfig-serviceaccountcredentials
     */
    public serviceAccountCredentials: CfnDirectoryConfig.ServiceAccountCredentialsProperty | cdk.IResolvable;

    /**
     * Create a new `AWS::AppStream::DirectoryConfig`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDirectoryConfigProps) {
        super(scope, id, { type: CfnDirectoryConfig.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'directoryName', this);
        cdk.requireProperty(props, 'organizationalUnitDistinguishedNames', this);
        cdk.requireProperty(props, 'serviceAccountCredentials', this);

        this.directoryName = props.directoryName;
        this.organizationalUnitDistinguishedNames = props.organizationalUnitDistinguishedNames;
        this.serviceAccountCredentials = props.serviceAccountCredentials;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDirectoryConfig.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            directoryName: this.directoryName,
            organizationalUnitDistinguishedNames: this.organizationalUnitDistinguishedNames,
            serviceAccountCredentials: this.serviceAccountCredentials,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDirectoryConfigPropsToCloudFormation(props);
    }
}

export namespace CfnDirectoryConfig {
    /**
     * The credentials for the service account used by the streaming instance to connect to the directory.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-directoryconfig-serviceaccountcredentials.html
     */
    export interface ServiceAccountCredentialsProperty {
        /**
         * The user name of the account. This account must have the following privileges: create computer objects, join computers to the domain, and change/reset the password on descendant computer objects for the organizational units specified.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-directoryconfig-serviceaccountcredentials.html#cfn-appstream-directoryconfig-serviceaccountcredentials-accountname
         */
        readonly accountName: string;
        /**
         * The password for the account.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-directoryconfig-serviceaccountcredentials.html#cfn-appstream-directoryconfig-serviceaccountcredentials-accountpassword
         */
        readonly accountPassword: string;
    }
}

/**
 * Determine whether the given properties match those of a `ServiceAccountCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `ServiceAccountCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDirectoryConfig_ServiceAccountCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accountName', cdk.requiredValidator)(properties.accountName));
    errors.collect(cdk.propertyValidator('accountName', cdk.validateString)(properties.accountName));
    errors.collect(cdk.propertyValidator('accountPassword', cdk.requiredValidator)(properties.accountPassword));
    errors.collect(cdk.propertyValidator('accountPassword', cdk.validateString)(properties.accountPassword));
    return errors.wrap('supplied properties not correct for "ServiceAccountCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::DirectoryConfig.ServiceAccountCredentials` resource
 *
 * @param properties - the TypeScript properties of a `ServiceAccountCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::DirectoryConfig.ServiceAccountCredentials` resource.
 */
// @ts-ignore TS6133
function cfnDirectoryConfigServiceAccountCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDirectoryConfig_ServiceAccountCredentialsPropertyValidator(properties).assertSuccess();
    return {
        AccountName: cdk.stringToCloudFormation(properties.accountName),
        AccountPassword: cdk.stringToCloudFormation(properties.accountPassword),
    };
}

// @ts-ignore TS6133
function CfnDirectoryConfigServiceAccountCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDirectoryConfig.ServiceAccountCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDirectoryConfig.ServiceAccountCredentialsProperty>();
    ret.addPropertyResult('accountName', 'AccountName', cfn_parse.FromCloudFormation.getString(properties.AccountName));
    ret.addPropertyResult('accountPassword', 'AccountPassword', cfn_parse.FromCloudFormation.getString(properties.AccountPassword));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnEntitlement`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-entitlement.html
 */
export interface CfnEntitlementProps {

    /**
     * Specifies whether to entitle all apps or only selected apps.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-entitlement.html#cfn-appstream-entitlement-appvisibility
     */
    readonly appVisibility: string;

    /**
     * The attributes of the entitlement.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-entitlement.html#cfn-appstream-entitlement-attributes
     */
    readonly attributes: Array<CfnEntitlement.AttributeProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The name of the entitlement.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-entitlement.html#cfn-appstream-entitlement-name
     */
    readonly name: string;

    /**
     * The name of the stack.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-entitlement.html#cfn-appstream-entitlement-stackname
     */
    readonly stackName: string;

    /**
     * The description of the entitlement.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-entitlement.html#cfn-appstream-entitlement-description
     */
    readonly description?: string;
}

/**
 * Determine whether the given properties match those of a `CfnEntitlementProps`
 *
 * @param properties - the TypeScript properties of a `CfnEntitlementProps`
 *
 * @returns the result of the validation.
 */
function CfnEntitlementPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('appVisibility', cdk.requiredValidator)(properties.appVisibility));
    errors.collect(cdk.propertyValidator('appVisibility', cdk.validateString)(properties.appVisibility));
    errors.collect(cdk.propertyValidator('attributes', cdk.requiredValidator)(properties.attributes));
    errors.collect(cdk.propertyValidator('attributes', cdk.listValidator(CfnEntitlement_AttributePropertyValidator))(properties.attributes));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('stackName', cdk.requiredValidator)(properties.stackName));
    errors.collect(cdk.propertyValidator('stackName', cdk.validateString)(properties.stackName));
    return errors.wrap('supplied properties not correct for "CfnEntitlementProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::Entitlement` resource
 *
 * @param properties - the TypeScript properties of a `CfnEntitlementProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::Entitlement` resource.
 */
// @ts-ignore TS6133
function cfnEntitlementPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEntitlementPropsValidator(properties).assertSuccess();
    return {
        AppVisibility: cdk.stringToCloudFormation(properties.appVisibility),
        Attributes: cdk.listMapper(cfnEntitlementAttributePropertyToCloudFormation)(properties.attributes),
        Name: cdk.stringToCloudFormation(properties.name),
        StackName: cdk.stringToCloudFormation(properties.stackName),
        Description: cdk.stringToCloudFormation(properties.description),
    };
}

// @ts-ignore TS6133
function CfnEntitlementPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEntitlementProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEntitlementProps>();
    ret.addPropertyResult('appVisibility', 'AppVisibility', cfn_parse.FromCloudFormation.getString(properties.AppVisibility));
    ret.addPropertyResult('attributes', 'Attributes', cfn_parse.FromCloudFormation.getArray(CfnEntitlementAttributePropertyFromCloudFormation)(properties.Attributes));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('stackName', 'StackName', cfn_parse.FromCloudFormation.getString(properties.StackName));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppStream::Entitlement`
 *
 * Creates an entitlement to control access, based on user attributes, to specific applications within a stack. Entitlements apply to SAML 2.0 federated user identities. Amazon AppStream 2.0 user pool and streaming URL users are entitled to all applications in a stack. Entitlements don't apply to the desktop stream view application or to applications managed by a dynamic app provider using the Dynamic Application Framework.
 *
 * @cloudformationResource AWS::AppStream::Entitlement
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-entitlement.html
 */
export class CfnEntitlement extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppStream::Entitlement";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnEntitlement {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnEntitlementPropsFromCloudFormation(resourceProperties);
        const ret = new CfnEntitlement(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The time when the entitlement was created.
     * @cloudformationAttribute CreatedTime
     */
    public readonly attrCreatedTime: string;

    /**
     * The time when the entitlement was last modified.
     * @cloudformationAttribute LastModifiedTime
     */
    public readonly attrLastModifiedTime: string;

    /**
     * Specifies whether to entitle all apps or only selected apps.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-entitlement.html#cfn-appstream-entitlement-appvisibility
     */
    public appVisibility: string;

    /**
     * The attributes of the entitlement.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-entitlement.html#cfn-appstream-entitlement-attributes
     */
    public attributes: Array<CfnEntitlement.AttributeProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The name of the entitlement.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-entitlement.html#cfn-appstream-entitlement-name
     */
    public name: string;

    /**
     * The name of the stack.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-entitlement.html#cfn-appstream-entitlement-stackname
     */
    public stackName: string;

    /**
     * The description of the entitlement.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-entitlement.html#cfn-appstream-entitlement-description
     */
    public description: string | undefined;

    /**
     * Create a new `AWS::AppStream::Entitlement`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnEntitlementProps) {
        super(scope, id, { type: CfnEntitlement.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'appVisibility', this);
        cdk.requireProperty(props, 'attributes', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'stackName', this);
        this.attrCreatedTime = cdk.Token.asString(this.getAtt('CreatedTime'));
        this.attrLastModifiedTime = cdk.Token.asString(this.getAtt('LastModifiedTime'));

        this.appVisibility = props.appVisibility;
        this.attributes = props.attributes;
        this.name = props.name;
        this.stackName = props.stackName;
        this.description = props.description;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnEntitlement.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            appVisibility: this.appVisibility,
            attributes: this.attributes,
            name: this.name,
            stackName: this.stackName,
            description: this.description,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnEntitlementPropsToCloudFormation(props);
    }
}

export namespace CfnEntitlement {
    /**
     * An attribute that belongs to an entitlement. Application entitlements work by matching a supported SAML 2.0 attribute name to a value when a user identity federates to an AppStream 2.0 SAML application.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-entitlement-attribute.html
     */
    export interface AttributeProperty {
        /**
         * A supported AWS IAM SAML PrincipalTag attribute that is matched to a value when a user identity federates to an AppStream 2.0 SAML application.
         *
         * The following are supported values:
         *
         * - roles
         * - department
         * - organization
         * - groups
         * - title
         * - costCenter
         * - userType
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-entitlement-attribute.html#cfn-appstream-entitlement-attribute-name
         */
        readonly name: string;
        /**
         * A value that is matched to a supported SAML attribute name when a user identity federates to an AppStream 2.0 SAML application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-entitlement-attribute.html#cfn-appstream-entitlement-attribute-value
         */
        readonly value: string;
    }
}

/**
 * Determine whether the given properties match those of a `AttributeProperty`
 *
 * @param properties - the TypeScript properties of a `AttributeProperty`
 *
 * @returns the result of the validation.
 */
function CfnEntitlement_AttributePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "AttributeProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::Entitlement.Attribute` resource
 *
 * @param properties - the TypeScript properties of a `AttributeProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::Entitlement.Attribute` resource.
 */
// @ts-ignore TS6133
function cfnEntitlementAttributePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEntitlement_AttributePropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnEntitlementAttributePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEntitlement.AttributeProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEntitlement.AttributeProperty>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnFleet`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html
 */
export interface CfnFleetProps {

    /**
     * The instance type to use when launching fleet instances. The following instance types are available for non-Elastic fleets:
     *
     * - stream.standard.small
     * - stream.standard.medium
     * - stream.standard.large
     * - stream.compute.large
     * - stream.compute.xlarge
     * - stream.compute.2xlarge
     * - stream.compute.4xlarge
     * - stream.compute.8xlarge
     * - stream.memory.large
     * - stream.memory.xlarge
     * - stream.memory.2xlarge
     * - stream.memory.4xlarge
     * - stream.memory.8xlarge
     * - stream.memory.z1d.large
     * - stream.memory.z1d.xlarge
     * - stream.memory.z1d.2xlarge
     * - stream.memory.z1d.3xlarge
     * - stream.memory.z1d.6xlarge
     * - stream.memory.z1d.12xlarge
     * - stream.graphics-design.large
     * - stream.graphics-design.xlarge
     * - stream.graphics-design.2xlarge
     * - stream.graphics-design.4xlarge
     * - stream.graphics-desktop.2xlarge
     * - stream.graphics.g4dn.xlarge
     * - stream.graphics.g4dn.2xlarge
     * - stream.graphics.g4dn.4xlarge
     * - stream.graphics.g4dn.8xlarge
     * - stream.graphics.g4dn.12xlarge
     * - stream.graphics.g4dn.16xlarge
     * - stream.graphics-pro.4xlarge
     * - stream.graphics-pro.8xlarge
     * - stream.graphics-pro.16xlarge
     *
     * The following instance types are available for Elastic fleets:
     *
     * - stream.standard.small
     * - stream.standard.medium
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-instancetype
     */
    readonly instanceType: string;

    /**
     * A unique name for the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-name
     */
    readonly name: string;

    /**
     * The desired capacity for the fleet. This is not allowed for Elastic fleets.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-computecapacity
     */
    readonly computeCapacity?: CfnFleet.ComputeCapacityProperty | cdk.IResolvable;

    /**
     * The description to display.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-description
     */
    readonly description?: string;

    /**
     * The amount of time that a streaming session remains active after users disconnect. If users try to reconnect to the streaming session after a disconnection or network interruption within this time interval, they are connected to their previous session. Otherwise, they are connected to a new session with a new streaming instance.
     *
     * Specify a value between 60 and 360000.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-disconnecttimeoutinseconds
     */
    readonly disconnectTimeoutInSeconds?: number;

    /**
     * The fleet name to display.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-displayname
     */
    readonly displayName?: string;

    /**
     * The name of the directory and organizational unit (OU) to use to join the fleet to a Microsoft Active Directory domain. This is not allowed for Elastic fleets.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-domainjoininfo
     */
    readonly domainJoinInfo?: CfnFleet.DomainJoinInfoProperty | cdk.IResolvable;

    /**
     * Enables or disables default internet access for the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-enabledefaultinternetaccess
     */
    readonly enableDefaultInternetAccess?: boolean | cdk.IResolvable;

    /**
     * The fleet type.
     *
     * - **ALWAYS_ON** - Provides users with instant-on access to their apps. You are charged for all running instances in your fleet, even if no users are streaming apps.
     * - **ON_DEMAND** - Provide users with access to applications after they connect, which takes one to two minutes. You are charged for instance streaming when users are connected and a small hourly fee for instances that are not streaming apps.
     * - **ELASTIC** - The pool of streaming instances is managed by Amazon AppStream 2.0. When a user selects their application or desktop to launch, they will start streaming after the app block has been downloaded and mounted to a streaming instance.
     *
     * *Allowed Values* : `ALWAYS_ON` | `ELASTIC` | `ON_DEMAND`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-fleettype
     */
    readonly fleetType?: string;

    /**
     * The ARN of the IAM role that is applied to the fleet. To assume a role, the fleet instance calls the AWS Security Token Service `AssumeRole` API operation and passes the ARN of the role to use. The operation creates a new session with temporary credentials. AppStream 2.0 retrieves the temporary credentials and creates the *appstream_machine_role* credential profile on the instance.
     *
     * For more information, see [Using an IAM Role to Grant Permissions to Applications and Scripts Running on AppStream 2.0 Streaming Instances](https://docs.aws.amazon.com/appstream2/latest/developerguide/using-iam-roles-to-grant-permissions-to-applications-scripts-streaming-instances.html) in the *Amazon AppStream 2.0 Administration Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-iamrolearn
     */
    readonly iamRoleArn?: string;

    /**
     * The amount of time that users can be idle (inactive) before they are disconnected from their streaming session and the `DisconnectTimeoutInSeconds` time interval begins. Users are notified before they are disconnected due to inactivity. If they try to reconnect to the streaming session before the time interval specified in `DisconnectTimeoutInSeconds` elapses, they are connected to their previous session. Users are considered idle when they stop providing keyboard or mouse input during their streaming session. File uploads and downloads, audio in, audio out, and pixels changing do not qualify as user activity. If users continue to be idle after the time interval in `IdleDisconnectTimeoutInSeconds` elapses, they are disconnected.
     *
     * To prevent users from being disconnected due to inactivity, specify a value of 0. Otherwise, specify a value between 60 and 3600.
     *
     * If you enable this feature, we recommend that you specify a value that corresponds exactly to a whole number of minutes (for example, 60, 120, and 180). If you don't do this, the value is rounded to the nearest minute. For example, if you specify a value of 70, users are disconnected after 1 minute of inactivity. If you specify a value that is at the midpoint between two different minutes, the value is rounded up. For example, if you specify a value of 90, users are disconnected after 2 minutes of inactivity.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-idledisconnecttimeoutinseconds
     */
    readonly idleDisconnectTimeoutInSeconds?: number;

    /**
     * The ARN of the public, private, or shared image to use.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-imagearn
     */
    readonly imageArn?: string;

    /**
     * The name of the image used to create the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-imagename
     */
    readonly imageName?: string;

    /**
     * The maximum number of concurrent sessions that can be run on an Elastic fleet. This setting is required for Elastic fleets, but is not used for other fleet types.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-maxconcurrentsessions
     */
    readonly maxConcurrentSessions?: number;

    /**
     * The maximum amount of time that a streaming session can remain active, in seconds. If users are still connected to a streaming instance five minutes before this limit is reached, they are prompted to save any open documents before being disconnected. After this time elapses, the instance is terminated and replaced by a new instance.
     *
     * Specify a value between 600 and 360000.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-maxuserdurationinseconds
     */
    readonly maxUserDurationInSeconds?: number;

    /**
     * The platform of the fleet. Platform is a required setting for Elastic fleets, and is not used for other fleet types.
     *
     * *Allowed Values* : `WINDOWS_SERVER_2019` | `AMAZON_LINUX2`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-platform
     */
    readonly platform?: string;

    /**
     * The S3 location of the session scripts configuration zip file. This only applies to Elastic fleets.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-sessionscripts3location
     */
    readonly sessionScriptS3Location?: CfnFleet.S3LocationProperty | cdk.IResolvable;

    /**
     * The AppStream 2.0 view that is displayed to your users when they stream from the fleet. When `APP` is specified, only the windows of applications opened by users display. When `DESKTOP` is specified, the standard desktop that is provided by the operating system displays.
     *
     * The default value is `APP` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-streamview
     */
    readonly streamView?: string;

    /**
     * An array of key-value pairs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The USB device filter strings that specify which USB devices a user can redirect to the fleet streaming session, when using the Windows native client. This is allowed but not required for Elastic fleets.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-usbdevicefilterstrings
     */
    readonly usbDeviceFilterStrings?: string[];

    /**
     * The VPC configuration for the fleet. This is required for Elastic fleets, but not required for other fleet types.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-vpcconfig
     */
    readonly vpcConfig?: CfnFleet.VpcConfigProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnFleetProps`
 *
 * @param properties - the TypeScript properties of a `CfnFleetProps`
 *
 * @returns the result of the validation.
 */
function CfnFleetPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('computeCapacity', CfnFleet_ComputeCapacityPropertyValidator)(properties.computeCapacity));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('disconnectTimeoutInSeconds', cdk.validateNumber)(properties.disconnectTimeoutInSeconds));
    errors.collect(cdk.propertyValidator('displayName', cdk.validateString)(properties.displayName));
    errors.collect(cdk.propertyValidator('domainJoinInfo', CfnFleet_DomainJoinInfoPropertyValidator)(properties.domainJoinInfo));
    errors.collect(cdk.propertyValidator('enableDefaultInternetAccess', cdk.validateBoolean)(properties.enableDefaultInternetAccess));
    errors.collect(cdk.propertyValidator('fleetType', cdk.validateString)(properties.fleetType));
    errors.collect(cdk.propertyValidator('iamRoleArn', cdk.validateString)(properties.iamRoleArn));
    errors.collect(cdk.propertyValidator('idleDisconnectTimeoutInSeconds', cdk.validateNumber)(properties.idleDisconnectTimeoutInSeconds));
    errors.collect(cdk.propertyValidator('imageArn', cdk.validateString)(properties.imageArn));
    errors.collect(cdk.propertyValidator('imageName', cdk.validateString)(properties.imageName));
    errors.collect(cdk.propertyValidator('instanceType', cdk.requiredValidator)(properties.instanceType));
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('maxConcurrentSessions', cdk.validateNumber)(properties.maxConcurrentSessions));
    errors.collect(cdk.propertyValidator('maxUserDurationInSeconds', cdk.validateNumber)(properties.maxUserDurationInSeconds));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('platform', cdk.validateString)(properties.platform));
    errors.collect(cdk.propertyValidator('sessionScriptS3Location', CfnFleet_S3LocationPropertyValidator)(properties.sessionScriptS3Location));
    errors.collect(cdk.propertyValidator('streamView', cdk.validateString)(properties.streamView));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('usbDeviceFilterStrings', cdk.listValidator(cdk.validateString))(properties.usbDeviceFilterStrings));
    errors.collect(cdk.propertyValidator('vpcConfig', CfnFleet_VpcConfigPropertyValidator)(properties.vpcConfig));
    return errors.wrap('supplied properties not correct for "CfnFleetProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::Fleet` resource
 *
 * @param properties - the TypeScript properties of a `CfnFleetProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::Fleet` resource.
 */
// @ts-ignore TS6133
function cfnFleetPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleetPropsValidator(properties).assertSuccess();
    return {
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        Name: cdk.stringToCloudFormation(properties.name),
        ComputeCapacity: cfnFleetComputeCapacityPropertyToCloudFormation(properties.computeCapacity),
        Description: cdk.stringToCloudFormation(properties.description),
        DisconnectTimeoutInSeconds: cdk.numberToCloudFormation(properties.disconnectTimeoutInSeconds),
        DisplayName: cdk.stringToCloudFormation(properties.displayName),
        DomainJoinInfo: cfnFleetDomainJoinInfoPropertyToCloudFormation(properties.domainJoinInfo),
        EnableDefaultInternetAccess: cdk.booleanToCloudFormation(properties.enableDefaultInternetAccess),
        FleetType: cdk.stringToCloudFormation(properties.fleetType),
        IamRoleArn: cdk.stringToCloudFormation(properties.iamRoleArn),
        IdleDisconnectTimeoutInSeconds: cdk.numberToCloudFormation(properties.idleDisconnectTimeoutInSeconds),
        ImageArn: cdk.stringToCloudFormation(properties.imageArn),
        ImageName: cdk.stringToCloudFormation(properties.imageName),
        MaxConcurrentSessions: cdk.numberToCloudFormation(properties.maxConcurrentSessions),
        MaxUserDurationInSeconds: cdk.numberToCloudFormation(properties.maxUserDurationInSeconds),
        Platform: cdk.stringToCloudFormation(properties.platform),
        SessionScriptS3Location: cfnFleetS3LocationPropertyToCloudFormation(properties.sessionScriptS3Location),
        StreamView: cdk.stringToCloudFormation(properties.streamView),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        UsbDeviceFilterStrings: cdk.listMapper(cdk.stringToCloudFormation)(properties.usbDeviceFilterStrings),
        VpcConfig: cfnFleetVpcConfigPropertyToCloudFormation(properties.vpcConfig),
    };
}

// @ts-ignore TS6133
function CfnFleetPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleetProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleetProps>();
    ret.addPropertyResult('instanceType', 'InstanceType', cfn_parse.FromCloudFormation.getString(properties.InstanceType));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('computeCapacity', 'ComputeCapacity', properties.ComputeCapacity != null ? CfnFleetComputeCapacityPropertyFromCloudFormation(properties.ComputeCapacity) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('disconnectTimeoutInSeconds', 'DisconnectTimeoutInSeconds', properties.DisconnectTimeoutInSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.DisconnectTimeoutInSeconds) : undefined);
    ret.addPropertyResult('displayName', 'DisplayName', properties.DisplayName != null ? cfn_parse.FromCloudFormation.getString(properties.DisplayName) : undefined);
    ret.addPropertyResult('domainJoinInfo', 'DomainJoinInfo', properties.DomainJoinInfo != null ? CfnFleetDomainJoinInfoPropertyFromCloudFormation(properties.DomainJoinInfo) : undefined);
    ret.addPropertyResult('enableDefaultInternetAccess', 'EnableDefaultInternetAccess', properties.EnableDefaultInternetAccess != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableDefaultInternetAccess) : undefined);
    ret.addPropertyResult('fleetType', 'FleetType', properties.FleetType != null ? cfn_parse.FromCloudFormation.getString(properties.FleetType) : undefined);
    ret.addPropertyResult('iamRoleArn', 'IamRoleArn', properties.IamRoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.IamRoleArn) : undefined);
    ret.addPropertyResult('idleDisconnectTimeoutInSeconds', 'IdleDisconnectTimeoutInSeconds', properties.IdleDisconnectTimeoutInSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.IdleDisconnectTimeoutInSeconds) : undefined);
    ret.addPropertyResult('imageArn', 'ImageArn', properties.ImageArn != null ? cfn_parse.FromCloudFormation.getString(properties.ImageArn) : undefined);
    ret.addPropertyResult('imageName', 'ImageName', properties.ImageName != null ? cfn_parse.FromCloudFormation.getString(properties.ImageName) : undefined);
    ret.addPropertyResult('maxConcurrentSessions', 'MaxConcurrentSessions', properties.MaxConcurrentSessions != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxConcurrentSessions) : undefined);
    ret.addPropertyResult('maxUserDurationInSeconds', 'MaxUserDurationInSeconds', properties.MaxUserDurationInSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxUserDurationInSeconds) : undefined);
    ret.addPropertyResult('platform', 'Platform', properties.Platform != null ? cfn_parse.FromCloudFormation.getString(properties.Platform) : undefined);
    ret.addPropertyResult('sessionScriptS3Location', 'SessionScriptS3Location', properties.SessionScriptS3Location != null ? CfnFleetS3LocationPropertyFromCloudFormation(properties.SessionScriptS3Location) : undefined);
    ret.addPropertyResult('streamView', 'StreamView', properties.StreamView != null ? cfn_parse.FromCloudFormation.getString(properties.StreamView) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('usbDeviceFilterStrings', 'UsbDeviceFilterStrings', properties.UsbDeviceFilterStrings != null ? cfn_parse.FromCloudFormation.getStringArray(properties.UsbDeviceFilterStrings) : undefined);
    ret.addPropertyResult('vpcConfig', 'VpcConfig', properties.VpcConfig != null ? CfnFleetVpcConfigPropertyFromCloudFormation(properties.VpcConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppStream::Fleet`
 *
 * The `AWS::AppStream::Fleet` resource creates a fleet for Amazon AppStream 2.0. A fleet consists of streaming instances that run a specified image when using Always-On or On-Demand.
 *
 * @cloudformationResource AWS::AppStream::Fleet
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html
 */
export class CfnFleet extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppStream::Fleet";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnFleet {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnFleetPropsFromCloudFormation(resourceProperties);
        const ret = new CfnFleet(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The instance type to use when launching fleet instances. The following instance types are available for non-Elastic fleets:
     *
     * - stream.standard.small
     * - stream.standard.medium
     * - stream.standard.large
     * - stream.compute.large
     * - stream.compute.xlarge
     * - stream.compute.2xlarge
     * - stream.compute.4xlarge
     * - stream.compute.8xlarge
     * - stream.memory.large
     * - stream.memory.xlarge
     * - stream.memory.2xlarge
     * - stream.memory.4xlarge
     * - stream.memory.8xlarge
     * - stream.memory.z1d.large
     * - stream.memory.z1d.xlarge
     * - stream.memory.z1d.2xlarge
     * - stream.memory.z1d.3xlarge
     * - stream.memory.z1d.6xlarge
     * - stream.memory.z1d.12xlarge
     * - stream.graphics-design.large
     * - stream.graphics-design.xlarge
     * - stream.graphics-design.2xlarge
     * - stream.graphics-design.4xlarge
     * - stream.graphics-desktop.2xlarge
     * - stream.graphics.g4dn.xlarge
     * - stream.graphics.g4dn.2xlarge
     * - stream.graphics.g4dn.4xlarge
     * - stream.graphics.g4dn.8xlarge
     * - stream.graphics.g4dn.12xlarge
     * - stream.graphics.g4dn.16xlarge
     * - stream.graphics-pro.4xlarge
     * - stream.graphics-pro.8xlarge
     * - stream.graphics-pro.16xlarge
     *
     * The following instance types are available for Elastic fleets:
     *
     * - stream.standard.small
     * - stream.standard.medium
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-instancetype
     */
    public instanceType: string;

    /**
     * A unique name for the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-name
     */
    public name: string;

    /**
     * The desired capacity for the fleet. This is not allowed for Elastic fleets.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-computecapacity
     */
    public computeCapacity: CfnFleet.ComputeCapacityProperty | cdk.IResolvable | undefined;

    /**
     * The description to display.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-description
     */
    public description: string | undefined;

    /**
     * The amount of time that a streaming session remains active after users disconnect. If users try to reconnect to the streaming session after a disconnection or network interruption within this time interval, they are connected to their previous session. Otherwise, they are connected to a new session with a new streaming instance.
     *
     * Specify a value between 60 and 360000.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-disconnecttimeoutinseconds
     */
    public disconnectTimeoutInSeconds: number | undefined;

    /**
     * The fleet name to display.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-displayname
     */
    public displayName: string | undefined;

    /**
     * The name of the directory and organizational unit (OU) to use to join the fleet to a Microsoft Active Directory domain. This is not allowed for Elastic fleets.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-domainjoininfo
     */
    public domainJoinInfo: CfnFleet.DomainJoinInfoProperty | cdk.IResolvable | undefined;

    /**
     * Enables or disables default internet access for the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-enabledefaultinternetaccess
     */
    public enableDefaultInternetAccess: boolean | cdk.IResolvable | undefined;

    /**
     * The fleet type.
     *
     * - **ALWAYS_ON** - Provides users with instant-on access to their apps. You are charged for all running instances in your fleet, even if no users are streaming apps.
     * - **ON_DEMAND** - Provide users with access to applications after they connect, which takes one to two minutes. You are charged for instance streaming when users are connected and a small hourly fee for instances that are not streaming apps.
     * - **ELASTIC** - The pool of streaming instances is managed by Amazon AppStream 2.0. When a user selects their application or desktop to launch, they will start streaming after the app block has been downloaded and mounted to a streaming instance.
     *
     * *Allowed Values* : `ALWAYS_ON` | `ELASTIC` | `ON_DEMAND`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-fleettype
     */
    public fleetType: string | undefined;

    /**
     * The ARN of the IAM role that is applied to the fleet. To assume a role, the fleet instance calls the AWS Security Token Service `AssumeRole` API operation and passes the ARN of the role to use. The operation creates a new session with temporary credentials. AppStream 2.0 retrieves the temporary credentials and creates the *appstream_machine_role* credential profile on the instance.
     *
     * For more information, see [Using an IAM Role to Grant Permissions to Applications and Scripts Running on AppStream 2.0 Streaming Instances](https://docs.aws.amazon.com/appstream2/latest/developerguide/using-iam-roles-to-grant-permissions-to-applications-scripts-streaming-instances.html) in the *Amazon AppStream 2.0 Administration Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-iamrolearn
     */
    public iamRoleArn: string | undefined;

    /**
     * The amount of time that users can be idle (inactive) before they are disconnected from their streaming session and the `DisconnectTimeoutInSeconds` time interval begins. Users are notified before they are disconnected due to inactivity. If they try to reconnect to the streaming session before the time interval specified in `DisconnectTimeoutInSeconds` elapses, they are connected to their previous session. Users are considered idle when they stop providing keyboard or mouse input during their streaming session. File uploads and downloads, audio in, audio out, and pixels changing do not qualify as user activity. If users continue to be idle after the time interval in `IdleDisconnectTimeoutInSeconds` elapses, they are disconnected.
     *
     * To prevent users from being disconnected due to inactivity, specify a value of 0. Otherwise, specify a value between 60 and 3600.
     *
     * If you enable this feature, we recommend that you specify a value that corresponds exactly to a whole number of minutes (for example, 60, 120, and 180). If you don't do this, the value is rounded to the nearest minute. For example, if you specify a value of 70, users are disconnected after 1 minute of inactivity. If you specify a value that is at the midpoint between two different minutes, the value is rounded up. For example, if you specify a value of 90, users are disconnected after 2 minutes of inactivity.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-idledisconnecttimeoutinseconds
     */
    public idleDisconnectTimeoutInSeconds: number | undefined;

    /**
     * The ARN of the public, private, or shared image to use.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-imagearn
     */
    public imageArn: string | undefined;

    /**
     * The name of the image used to create the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-imagename
     */
    public imageName: string | undefined;

    /**
     * The maximum number of concurrent sessions that can be run on an Elastic fleet. This setting is required for Elastic fleets, but is not used for other fleet types.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-maxconcurrentsessions
     */
    public maxConcurrentSessions: number | undefined;

    /**
     * The maximum amount of time that a streaming session can remain active, in seconds. If users are still connected to a streaming instance five minutes before this limit is reached, they are prompted to save any open documents before being disconnected. After this time elapses, the instance is terminated and replaced by a new instance.
     *
     * Specify a value between 600 and 360000.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-maxuserdurationinseconds
     */
    public maxUserDurationInSeconds: number | undefined;

    /**
     * The platform of the fleet. Platform is a required setting for Elastic fleets, and is not used for other fleet types.
     *
     * *Allowed Values* : `WINDOWS_SERVER_2019` | `AMAZON_LINUX2`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-platform
     */
    public platform: string | undefined;

    /**
     * The S3 location of the session scripts configuration zip file. This only applies to Elastic fleets.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-sessionscripts3location
     */
    public sessionScriptS3Location: CfnFleet.S3LocationProperty | cdk.IResolvable | undefined;

    /**
     * The AppStream 2.0 view that is displayed to your users when they stream from the fleet. When `APP` is specified, only the windows of applications opened by users display. When `DESKTOP` is specified, the standard desktop that is provided by the operating system displays.
     *
     * The default value is `APP` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-streamview
     */
    public streamView: string | undefined;

    /**
     * An array of key-value pairs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The USB device filter strings that specify which USB devices a user can redirect to the fleet streaming session, when using the Windows native client. This is allowed but not required for Elastic fleets.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-usbdevicefilterstrings
     */
    public usbDeviceFilterStrings: string[] | undefined;

    /**
     * The VPC configuration for the fleet. This is required for Elastic fleets, but not required for other fleet types.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-fleet.html#cfn-appstream-fleet-vpcconfig
     */
    public vpcConfig: CfnFleet.VpcConfigProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::AppStream::Fleet`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnFleetProps) {
        super(scope, id, { type: CfnFleet.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'instanceType', this);
        cdk.requireProperty(props, 'name', this);

        this.instanceType = props.instanceType;
        this.name = props.name;
        this.computeCapacity = props.computeCapacity;
        this.description = props.description;
        this.disconnectTimeoutInSeconds = props.disconnectTimeoutInSeconds;
        this.displayName = props.displayName;
        this.domainJoinInfo = props.domainJoinInfo;
        this.enableDefaultInternetAccess = props.enableDefaultInternetAccess;
        this.fleetType = props.fleetType;
        this.iamRoleArn = props.iamRoleArn;
        this.idleDisconnectTimeoutInSeconds = props.idleDisconnectTimeoutInSeconds;
        this.imageArn = props.imageArn;
        this.imageName = props.imageName;
        this.maxConcurrentSessions = props.maxConcurrentSessions;
        this.maxUserDurationInSeconds = props.maxUserDurationInSeconds;
        this.platform = props.platform;
        this.sessionScriptS3Location = props.sessionScriptS3Location;
        this.streamView = props.streamView;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::AppStream::Fleet", props.tags, { tagPropertyName: 'tags' });
        this.usbDeviceFilterStrings = props.usbDeviceFilterStrings;
        this.vpcConfig = props.vpcConfig;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnFleet.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            instanceType: this.instanceType,
            name: this.name,
            computeCapacity: this.computeCapacity,
            description: this.description,
            disconnectTimeoutInSeconds: this.disconnectTimeoutInSeconds,
            displayName: this.displayName,
            domainJoinInfo: this.domainJoinInfo,
            enableDefaultInternetAccess: this.enableDefaultInternetAccess,
            fleetType: this.fleetType,
            iamRoleArn: this.iamRoleArn,
            idleDisconnectTimeoutInSeconds: this.idleDisconnectTimeoutInSeconds,
            imageArn: this.imageArn,
            imageName: this.imageName,
            maxConcurrentSessions: this.maxConcurrentSessions,
            maxUserDurationInSeconds: this.maxUserDurationInSeconds,
            platform: this.platform,
            sessionScriptS3Location: this.sessionScriptS3Location,
            streamView: this.streamView,
            tags: this.tags.renderTags(),
            usbDeviceFilterStrings: this.usbDeviceFilterStrings,
            vpcConfig: this.vpcConfig,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnFleetPropsToCloudFormation(props);
    }
}

export namespace CfnFleet {
    /**
     * The desired capacity for a fleet.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-fleet-computecapacity.html
     */
    export interface ComputeCapacityProperty {
        /**
         * The desired number of streaming instances.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-fleet-computecapacity.html#cfn-appstream-fleet-computecapacity-desiredinstances
         */
        readonly desiredInstances: number;
    }
}

/**
 * Determine whether the given properties match those of a `ComputeCapacityProperty`
 *
 * @param properties - the TypeScript properties of a `ComputeCapacityProperty`
 *
 * @returns the result of the validation.
 */
function CfnFleet_ComputeCapacityPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('desiredInstances', cdk.requiredValidator)(properties.desiredInstances));
    errors.collect(cdk.propertyValidator('desiredInstances', cdk.validateNumber)(properties.desiredInstances));
    return errors.wrap('supplied properties not correct for "ComputeCapacityProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::Fleet.ComputeCapacity` resource
 *
 * @param properties - the TypeScript properties of a `ComputeCapacityProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::Fleet.ComputeCapacity` resource.
 */
// @ts-ignore TS6133
function cfnFleetComputeCapacityPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleet_ComputeCapacityPropertyValidator(properties).assertSuccess();
    return {
        DesiredInstances: cdk.numberToCloudFormation(properties.desiredInstances),
    };
}

// @ts-ignore TS6133
function CfnFleetComputeCapacityPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleet.ComputeCapacityProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleet.ComputeCapacityProperty>();
    ret.addPropertyResult('desiredInstances', 'DesiredInstances', cfn_parse.FromCloudFormation.getNumber(properties.DesiredInstances));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFleet {
    /**
     * The name of the directory and organizational unit (OU) to use to join a fleet to a Microsoft Active Directory domain.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-fleet-domainjoininfo.html
     */
    export interface DomainJoinInfoProperty {
        /**
         * The fully qualified name of the directory (for example, corp.example.com).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-fleet-domainjoininfo.html#cfn-appstream-fleet-domainjoininfo-directoryname
         */
        readonly directoryName?: string;
        /**
         * The distinguished name of the organizational unit for computer accounts.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-fleet-domainjoininfo.html#cfn-appstream-fleet-domainjoininfo-organizationalunitdistinguishedname
         */
        readonly organizationalUnitDistinguishedName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DomainJoinInfoProperty`
 *
 * @param properties - the TypeScript properties of a `DomainJoinInfoProperty`
 *
 * @returns the result of the validation.
 */
function CfnFleet_DomainJoinInfoPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('directoryName', cdk.validateString)(properties.directoryName));
    errors.collect(cdk.propertyValidator('organizationalUnitDistinguishedName', cdk.validateString)(properties.organizationalUnitDistinguishedName));
    return errors.wrap('supplied properties not correct for "DomainJoinInfoProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::Fleet.DomainJoinInfo` resource
 *
 * @param properties - the TypeScript properties of a `DomainJoinInfoProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::Fleet.DomainJoinInfo` resource.
 */
// @ts-ignore TS6133
function cfnFleetDomainJoinInfoPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleet_DomainJoinInfoPropertyValidator(properties).assertSuccess();
    return {
        DirectoryName: cdk.stringToCloudFormation(properties.directoryName),
        OrganizationalUnitDistinguishedName: cdk.stringToCloudFormation(properties.organizationalUnitDistinguishedName),
    };
}

// @ts-ignore TS6133
function CfnFleetDomainJoinInfoPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleet.DomainJoinInfoProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleet.DomainJoinInfoProperty>();
    ret.addPropertyResult('directoryName', 'DirectoryName', properties.DirectoryName != null ? cfn_parse.FromCloudFormation.getString(properties.DirectoryName) : undefined);
    ret.addPropertyResult('organizationalUnitDistinguishedName', 'OrganizationalUnitDistinguishedName', properties.OrganizationalUnitDistinguishedName != null ? cfn_parse.FromCloudFormation.getString(properties.OrganizationalUnitDistinguishedName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFleet {
    /**
     * Describes the S3 location.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-fleet-s3location.html
     */
    export interface S3LocationProperty {
        /**
         * The S3 bucket of the S3 object.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-fleet-s3location.html#cfn-appstream-fleet-s3location-s3bucket
         */
        readonly s3Bucket: string;
        /**
         * The S3 key of the S3 object.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-fleet-s3location.html#cfn-appstream-fleet-s3location-s3key
         */
        readonly s3Key: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3LocationProperty`
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the result of the validation.
 */
function CfnFleet_S3LocationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Bucket', cdk.requiredValidator)(properties.s3Bucket));
    errors.collect(cdk.propertyValidator('s3Bucket', cdk.validateString)(properties.s3Bucket));
    errors.collect(cdk.propertyValidator('s3Key', cdk.requiredValidator)(properties.s3Key));
    errors.collect(cdk.propertyValidator('s3Key', cdk.validateString)(properties.s3Key));
    return errors.wrap('supplied properties not correct for "S3LocationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::Fleet.S3Location` resource
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::Fleet.S3Location` resource.
 */
// @ts-ignore TS6133
function cfnFleetS3LocationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleet_S3LocationPropertyValidator(properties).assertSuccess();
    return {
        S3Bucket: cdk.stringToCloudFormation(properties.s3Bucket),
        S3Key: cdk.stringToCloudFormation(properties.s3Key),
    };
}

// @ts-ignore TS6133
function CfnFleetS3LocationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleet.S3LocationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleet.S3LocationProperty>();
    ret.addPropertyResult('s3Bucket', 'S3Bucket', cfn_parse.FromCloudFormation.getString(properties.S3Bucket));
    ret.addPropertyResult('s3Key', 'S3Key', cfn_parse.FromCloudFormation.getString(properties.S3Key));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFleet {
    /**
     * The VPC configuration information for the fleet.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-fleet-vpcconfig.html
     */
    export interface VpcConfigProperty {
        /**
         * The identifiers of the security groups for the fleet.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-fleet-vpcconfig.html#cfn-appstream-fleet-vpcconfig-securitygroupids
         */
        readonly securityGroupIds?: string[];
        /**
         * The identifiers of the subnets to which a network interface is attached from the fleet instance. Fleet instances can use one or two subnets.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-fleet-vpcconfig.html#cfn-appstream-fleet-vpcconfig-subnetids
         */
        readonly subnetIds?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `VpcConfigProperty`
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnFleet_VpcConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.listValidator(cdk.validateString))(properties.subnetIds));
    return errors.wrap('supplied properties not correct for "VpcConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::Fleet.VpcConfig` resource
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::Fleet.VpcConfig` resource.
 */
// @ts-ignore TS6133
function cfnFleetVpcConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleet_VpcConfigPropertyValidator(properties).assertSuccess();
    return {
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        SubnetIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnetIds),
    };
}

// @ts-ignore TS6133
function CfnFleetVpcConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleet.VpcConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleet.VpcConfigProperty>();
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', properties.SecurityGroupIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds) : undefined);
    ret.addPropertyResult('subnetIds', 'SubnetIds', properties.SubnetIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SubnetIds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnImageBuilder`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html
 */
export interface CfnImageBuilderProps {

    /**
     * The instance type to use when launching the image builder. The following instance types are available:
     *
     * - stream.standard.small
     * - stream.standard.medium
     * - stream.standard.large
     * - stream.compute.large
     * - stream.compute.xlarge
     * - stream.compute.2xlarge
     * - stream.compute.4xlarge
     * - stream.compute.8xlarge
     * - stream.memory.large
     * - stream.memory.xlarge
     * - stream.memory.2xlarge
     * - stream.memory.4xlarge
     * - stream.memory.8xlarge
     * - stream.memory.z1d.large
     * - stream.memory.z1d.xlarge
     * - stream.memory.z1d.2xlarge
     * - stream.memory.z1d.3xlarge
     * - stream.memory.z1d.6xlarge
     * - stream.memory.z1d.12xlarge
     * - stream.graphics-design.large
     * - stream.graphics-design.xlarge
     * - stream.graphics-design.2xlarge
     * - stream.graphics-design.4xlarge
     * - stream.graphics-desktop.2xlarge
     * - stream.graphics.g4dn.xlarge
     * - stream.graphics.g4dn.2xlarge
     * - stream.graphics.g4dn.4xlarge
     * - stream.graphics.g4dn.8xlarge
     * - stream.graphics.g4dn.12xlarge
     * - stream.graphics.g4dn.16xlarge
     * - stream.graphics-pro.4xlarge
     * - stream.graphics-pro.8xlarge
     * - stream.graphics-pro.16xlarge
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-instancetype
     */
    readonly instanceType: string;

    /**
     * A unique name for the image builder.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-name
     */
    readonly name: string;

    /**
     * The list of virtual private cloud (VPC) interface endpoint objects. Administrators can connect to the image builder only through the specified endpoints.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-accessendpoints
     */
    readonly accessEndpoints?: Array<CfnImageBuilder.AccessEndpointProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The version of the AppStream 2.0 agent to use for this image builder. To use the latest version of the AppStream 2.0 agent, specify [LATEST].
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-appstreamagentversion
     */
    readonly appstreamAgentVersion?: string;

    /**
     * The description to display.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-description
     */
    readonly description?: string;

    /**
     * The image builder name to display.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-displayname
     */
    readonly displayName?: string;

    /**
     * The name of the directory and organizational unit (OU) to use to join the image builder to a Microsoft Active Directory domain.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-domainjoininfo
     */
    readonly domainJoinInfo?: CfnImageBuilder.DomainJoinInfoProperty | cdk.IResolvable;

    /**
     * Enables or disables default internet access for the image builder.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-enabledefaultinternetaccess
     */
    readonly enableDefaultInternetAccess?: boolean | cdk.IResolvable;

    /**
     * The ARN of the IAM role that is applied to the image builder. To assume a role, the image builder calls the AWS Security Token Service `AssumeRole` API operation and passes the ARN of the role to use. The operation creates a new session with temporary credentials. AppStream 2.0 retrieves the temporary credentials and creates the *appstream_machine_role* credential profile on the instance.
     *
     * For more information, see [Using an IAM Role to Grant Permissions to Applications and Scripts Running on AppStream 2.0 Streaming Instances](https://docs.aws.amazon.com/appstream2/latest/developerguide/using-iam-roles-to-grant-permissions-to-applications-scripts-streaming-instances.html) in the *Amazon AppStream 2.0 Administration Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-iamrolearn
     */
    readonly iamRoleArn?: string;

    /**
     * The ARN of the public, private, or shared image to use.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-imagearn
     */
    readonly imageArn?: string;

    /**
     * The name of the image used to create the image builder.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-imagename
     */
    readonly imageName?: string;

    /**
     * An array of key-value pairs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The VPC configuration for the image builder. You can specify only one subnet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-vpcconfig
     */
    readonly vpcConfig?: CfnImageBuilder.VpcConfigProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnImageBuilderProps`
 *
 * @param properties - the TypeScript properties of a `CfnImageBuilderProps`
 *
 * @returns the result of the validation.
 */
function CfnImageBuilderPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessEndpoints', cdk.listValidator(CfnImageBuilder_AccessEndpointPropertyValidator))(properties.accessEndpoints));
    errors.collect(cdk.propertyValidator('appstreamAgentVersion', cdk.validateString)(properties.appstreamAgentVersion));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('displayName', cdk.validateString)(properties.displayName));
    errors.collect(cdk.propertyValidator('domainJoinInfo', CfnImageBuilder_DomainJoinInfoPropertyValidator)(properties.domainJoinInfo));
    errors.collect(cdk.propertyValidator('enableDefaultInternetAccess', cdk.validateBoolean)(properties.enableDefaultInternetAccess));
    errors.collect(cdk.propertyValidator('iamRoleArn', cdk.validateString)(properties.iamRoleArn));
    errors.collect(cdk.propertyValidator('imageArn', cdk.validateString)(properties.imageArn));
    errors.collect(cdk.propertyValidator('imageName', cdk.validateString)(properties.imageName));
    errors.collect(cdk.propertyValidator('instanceType', cdk.requiredValidator)(properties.instanceType));
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('vpcConfig', CfnImageBuilder_VpcConfigPropertyValidator)(properties.vpcConfig));
    return errors.wrap('supplied properties not correct for "CfnImageBuilderProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::ImageBuilder` resource
 *
 * @param properties - the TypeScript properties of a `CfnImageBuilderProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::ImageBuilder` resource.
 */
// @ts-ignore TS6133
function cfnImageBuilderPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnImageBuilderPropsValidator(properties).assertSuccess();
    return {
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        Name: cdk.stringToCloudFormation(properties.name),
        AccessEndpoints: cdk.listMapper(cfnImageBuilderAccessEndpointPropertyToCloudFormation)(properties.accessEndpoints),
        AppstreamAgentVersion: cdk.stringToCloudFormation(properties.appstreamAgentVersion),
        Description: cdk.stringToCloudFormation(properties.description),
        DisplayName: cdk.stringToCloudFormation(properties.displayName),
        DomainJoinInfo: cfnImageBuilderDomainJoinInfoPropertyToCloudFormation(properties.domainJoinInfo),
        EnableDefaultInternetAccess: cdk.booleanToCloudFormation(properties.enableDefaultInternetAccess),
        IamRoleArn: cdk.stringToCloudFormation(properties.iamRoleArn),
        ImageArn: cdk.stringToCloudFormation(properties.imageArn),
        ImageName: cdk.stringToCloudFormation(properties.imageName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        VpcConfig: cfnImageBuilderVpcConfigPropertyToCloudFormation(properties.vpcConfig),
    };
}

// @ts-ignore TS6133
function CfnImageBuilderPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnImageBuilderProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnImageBuilderProps>();
    ret.addPropertyResult('instanceType', 'InstanceType', cfn_parse.FromCloudFormation.getString(properties.InstanceType));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('accessEndpoints', 'AccessEndpoints', properties.AccessEndpoints != null ? cfn_parse.FromCloudFormation.getArray(CfnImageBuilderAccessEndpointPropertyFromCloudFormation)(properties.AccessEndpoints) : undefined);
    ret.addPropertyResult('appstreamAgentVersion', 'AppstreamAgentVersion', properties.AppstreamAgentVersion != null ? cfn_parse.FromCloudFormation.getString(properties.AppstreamAgentVersion) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('displayName', 'DisplayName', properties.DisplayName != null ? cfn_parse.FromCloudFormation.getString(properties.DisplayName) : undefined);
    ret.addPropertyResult('domainJoinInfo', 'DomainJoinInfo', properties.DomainJoinInfo != null ? CfnImageBuilderDomainJoinInfoPropertyFromCloudFormation(properties.DomainJoinInfo) : undefined);
    ret.addPropertyResult('enableDefaultInternetAccess', 'EnableDefaultInternetAccess', properties.EnableDefaultInternetAccess != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableDefaultInternetAccess) : undefined);
    ret.addPropertyResult('iamRoleArn', 'IamRoleArn', properties.IamRoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.IamRoleArn) : undefined);
    ret.addPropertyResult('imageArn', 'ImageArn', properties.ImageArn != null ? cfn_parse.FromCloudFormation.getString(properties.ImageArn) : undefined);
    ret.addPropertyResult('imageName', 'ImageName', properties.ImageName != null ? cfn_parse.FromCloudFormation.getString(properties.ImageName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('vpcConfig', 'VpcConfig', properties.VpcConfig != null ? CfnImageBuilderVpcConfigPropertyFromCloudFormation(properties.VpcConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppStream::ImageBuilder`
 *
 * The `AWS::AppStream::ImageBuilder` resource creates an image builder for Amazon AppStream 2.0. An image builder is a virtual machine that is used to create an image.
 *
 * The initial state of the image builder is `PENDING` . When it is ready, the state is `RUNNING` .
 *
 * @cloudformationResource AWS::AppStream::ImageBuilder
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html
 */
export class CfnImageBuilder extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppStream::ImageBuilder";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnImageBuilder {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnImageBuilderPropsFromCloudFormation(resourceProperties);
        const ret = new CfnImageBuilder(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The URL to start an image builder streaming session, returned as a string.
     * @cloudformationAttribute StreamingUrl
     */
    public readonly attrStreamingUrl: string;

    /**
     * The instance type to use when launching the image builder. The following instance types are available:
     *
     * - stream.standard.small
     * - stream.standard.medium
     * - stream.standard.large
     * - stream.compute.large
     * - stream.compute.xlarge
     * - stream.compute.2xlarge
     * - stream.compute.4xlarge
     * - stream.compute.8xlarge
     * - stream.memory.large
     * - stream.memory.xlarge
     * - stream.memory.2xlarge
     * - stream.memory.4xlarge
     * - stream.memory.8xlarge
     * - stream.memory.z1d.large
     * - stream.memory.z1d.xlarge
     * - stream.memory.z1d.2xlarge
     * - stream.memory.z1d.3xlarge
     * - stream.memory.z1d.6xlarge
     * - stream.memory.z1d.12xlarge
     * - stream.graphics-design.large
     * - stream.graphics-design.xlarge
     * - stream.graphics-design.2xlarge
     * - stream.graphics-design.4xlarge
     * - stream.graphics-desktop.2xlarge
     * - stream.graphics.g4dn.xlarge
     * - stream.graphics.g4dn.2xlarge
     * - stream.graphics.g4dn.4xlarge
     * - stream.graphics.g4dn.8xlarge
     * - stream.graphics.g4dn.12xlarge
     * - stream.graphics.g4dn.16xlarge
     * - stream.graphics-pro.4xlarge
     * - stream.graphics-pro.8xlarge
     * - stream.graphics-pro.16xlarge
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-instancetype
     */
    public instanceType: string;

    /**
     * A unique name for the image builder.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-name
     */
    public name: string;

    /**
     * The list of virtual private cloud (VPC) interface endpoint objects. Administrators can connect to the image builder only through the specified endpoints.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-accessendpoints
     */
    public accessEndpoints: Array<CfnImageBuilder.AccessEndpointProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The version of the AppStream 2.0 agent to use for this image builder. To use the latest version of the AppStream 2.0 agent, specify [LATEST].
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-appstreamagentversion
     */
    public appstreamAgentVersion: string | undefined;

    /**
     * The description to display.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-description
     */
    public description: string | undefined;

    /**
     * The image builder name to display.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-displayname
     */
    public displayName: string | undefined;

    /**
     * The name of the directory and organizational unit (OU) to use to join the image builder to a Microsoft Active Directory domain.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-domainjoininfo
     */
    public domainJoinInfo: CfnImageBuilder.DomainJoinInfoProperty | cdk.IResolvable | undefined;

    /**
     * Enables or disables default internet access for the image builder.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-enabledefaultinternetaccess
     */
    public enableDefaultInternetAccess: boolean | cdk.IResolvable | undefined;

    /**
     * The ARN of the IAM role that is applied to the image builder. To assume a role, the image builder calls the AWS Security Token Service `AssumeRole` API operation and passes the ARN of the role to use. The operation creates a new session with temporary credentials. AppStream 2.0 retrieves the temporary credentials and creates the *appstream_machine_role* credential profile on the instance.
     *
     * For more information, see [Using an IAM Role to Grant Permissions to Applications and Scripts Running on AppStream 2.0 Streaming Instances](https://docs.aws.amazon.com/appstream2/latest/developerguide/using-iam-roles-to-grant-permissions-to-applications-scripts-streaming-instances.html) in the *Amazon AppStream 2.0 Administration Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-iamrolearn
     */
    public iamRoleArn: string | undefined;

    /**
     * The ARN of the public, private, or shared image to use.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-imagearn
     */
    public imageArn: string | undefined;

    /**
     * The name of the image used to create the image builder.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-imagename
     */
    public imageName: string | undefined;

    /**
     * An array of key-value pairs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The VPC configuration for the image builder. You can specify only one subnet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-imagebuilder.html#cfn-appstream-imagebuilder-vpcconfig
     */
    public vpcConfig: CfnImageBuilder.VpcConfigProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::AppStream::ImageBuilder`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnImageBuilderProps) {
        super(scope, id, { type: CfnImageBuilder.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'instanceType', this);
        cdk.requireProperty(props, 'name', this);
        this.attrStreamingUrl = cdk.Token.asString(this.getAtt('StreamingUrl'));

        this.instanceType = props.instanceType;
        this.name = props.name;
        this.accessEndpoints = props.accessEndpoints;
        this.appstreamAgentVersion = props.appstreamAgentVersion;
        this.description = props.description;
        this.displayName = props.displayName;
        this.domainJoinInfo = props.domainJoinInfo;
        this.enableDefaultInternetAccess = props.enableDefaultInternetAccess;
        this.iamRoleArn = props.iamRoleArn;
        this.imageArn = props.imageArn;
        this.imageName = props.imageName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::AppStream::ImageBuilder", props.tags, { tagPropertyName: 'tags' });
        this.vpcConfig = props.vpcConfig;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnImageBuilder.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            instanceType: this.instanceType,
            name: this.name,
            accessEndpoints: this.accessEndpoints,
            appstreamAgentVersion: this.appstreamAgentVersion,
            description: this.description,
            displayName: this.displayName,
            domainJoinInfo: this.domainJoinInfo,
            enableDefaultInternetAccess: this.enableDefaultInternetAccess,
            iamRoleArn: this.iamRoleArn,
            imageArn: this.imageArn,
            imageName: this.imageName,
            tags: this.tags.renderTags(),
            vpcConfig: this.vpcConfig,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnImageBuilderPropsToCloudFormation(props);
    }
}

export namespace CfnImageBuilder {
    /**
     * Describes an interface VPC endpoint (interface endpoint) that lets you create a private connection between the virtual private cloud (VPC) that you specify and AppStream 2.0. When you specify an interface endpoint for a stack, users of the stack can connect to AppStream 2.0 only through that endpoint. When you specify an interface endpoint for an image builder, administrators can connect to the image builder only through that endpoint.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-imagebuilder-accessendpoint.html
     */
    export interface AccessEndpointProperty {
        /**
         * The type of interface endpoint.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-imagebuilder-accessendpoint.html#cfn-appstream-imagebuilder-accessendpoint-endpointtype
         */
        readonly endpointType: string;
        /**
         * The identifier (ID) of the VPC in which the interface endpoint is used.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-imagebuilder-accessendpoint.html#cfn-appstream-imagebuilder-accessendpoint-vpceid
         */
        readonly vpceId: string;
    }
}

/**
 * Determine whether the given properties match those of a `AccessEndpointProperty`
 *
 * @param properties - the TypeScript properties of a `AccessEndpointProperty`
 *
 * @returns the result of the validation.
 */
function CfnImageBuilder_AccessEndpointPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endpointType', cdk.requiredValidator)(properties.endpointType));
    errors.collect(cdk.propertyValidator('endpointType', cdk.validateString)(properties.endpointType));
    errors.collect(cdk.propertyValidator('vpceId', cdk.requiredValidator)(properties.vpceId));
    errors.collect(cdk.propertyValidator('vpceId', cdk.validateString)(properties.vpceId));
    return errors.wrap('supplied properties not correct for "AccessEndpointProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::ImageBuilder.AccessEndpoint` resource
 *
 * @param properties - the TypeScript properties of a `AccessEndpointProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::ImageBuilder.AccessEndpoint` resource.
 */
// @ts-ignore TS6133
function cfnImageBuilderAccessEndpointPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnImageBuilder_AccessEndpointPropertyValidator(properties).assertSuccess();
    return {
        EndpointType: cdk.stringToCloudFormation(properties.endpointType),
        VpceId: cdk.stringToCloudFormation(properties.vpceId),
    };
}

// @ts-ignore TS6133
function CfnImageBuilderAccessEndpointPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnImageBuilder.AccessEndpointProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnImageBuilder.AccessEndpointProperty>();
    ret.addPropertyResult('endpointType', 'EndpointType', cfn_parse.FromCloudFormation.getString(properties.EndpointType));
    ret.addPropertyResult('vpceId', 'VpceId', cfn_parse.FromCloudFormation.getString(properties.VpceId));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnImageBuilder {
    /**
     * The name of the directory and organizational unit (OU) to use to join the image builder to a Microsoft Active Directory domain.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-imagebuilder-domainjoininfo.html
     */
    export interface DomainJoinInfoProperty {
        /**
         * The fully qualified name of the directory (for example, corp.example.com).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-imagebuilder-domainjoininfo.html#cfn-appstream-imagebuilder-domainjoininfo-directoryname
         */
        readonly directoryName?: string;
        /**
         * The distinguished name of the organizational unit for computer accounts.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-imagebuilder-domainjoininfo.html#cfn-appstream-imagebuilder-domainjoininfo-organizationalunitdistinguishedname
         */
        readonly organizationalUnitDistinguishedName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DomainJoinInfoProperty`
 *
 * @param properties - the TypeScript properties of a `DomainJoinInfoProperty`
 *
 * @returns the result of the validation.
 */
function CfnImageBuilder_DomainJoinInfoPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('directoryName', cdk.validateString)(properties.directoryName));
    errors.collect(cdk.propertyValidator('organizationalUnitDistinguishedName', cdk.validateString)(properties.organizationalUnitDistinguishedName));
    return errors.wrap('supplied properties not correct for "DomainJoinInfoProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::ImageBuilder.DomainJoinInfo` resource
 *
 * @param properties - the TypeScript properties of a `DomainJoinInfoProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::ImageBuilder.DomainJoinInfo` resource.
 */
// @ts-ignore TS6133
function cfnImageBuilderDomainJoinInfoPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnImageBuilder_DomainJoinInfoPropertyValidator(properties).assertSuccess();
    return {
        DirectoryName: cdk.stringToCloudFormation(properties.directoryName),
        OrganizationalUnitDistinguishedName: cdk.stringToCloudFormation(properties.organizationalUnitDistinguishedName),
    };
}

// @ts-ignore TS6133
function CfnImageBuilderDomainJoinInfoPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnImageBuilder.DomainJoinInfoProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnImageBuilder.DomainJoinInfoProperty>();
    ret.addPropertyResult('directoryName', 'DirectoryName', properties.DirectoryName != null ? cfn_parse.FromCloudFormation.getString(properties.DirectoryName) : undefined);
    ret.addPropertyResult('organizationalUnitDistinguishedName', 'OrganizationalUnitDistinguishedName', properties.OrganizationalUnitDistinguishedName != null ? cfn_parse.FromCloudFormation.getString(properties.OrganizationalUnitDistinguishedName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnImageBuilder {
    /**
     * The VPC configuration for the image builder.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-imagebuilder-vpcconfig.html
     */
    export interface VpcConfigProperty {
        /**
         * The identifiers of the security groups for the image builder.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-imagebuilder-vpcconfig.html#cfn-appstream-imagebuilder-vpcconfig-securitygroupids
         */
        readonly securityGroupIds?: string[];
        /**
         * The identifier of the subnet to which a network interface is attached from the image builder instance. An image builder instance can use one subnet.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-imagebuilder-vpcconfig.html#cfn-appstream-imagebuilder-vpcconfig-subnetids
         */
        readonly subnetIds?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `VpcConfigProperty`
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnImageBuilder_VpcConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.listValidator(cdk.validateString))(properties.subnetIds));
    return errors.wrap('supplied properties not correct for "VpcConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::ImageBuilder.VpcConfig` resource
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::ImageBuilder.VpcConfig` resource.
 */
// @ts-ignore TS6133
function cfnImageBuilderVpcConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnImageBuilder_VpcConfigPropertyValidator(properties).assertSuccess();
    return {
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        SubnetIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnetIds),
    };
}

// @ts-ignore TS6133
function CfnImageBuilderVpcConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnImageBuilder.VpcConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnImageBuilder.VpcConfigProperty>();
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', properties.SecurityGroupIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds) : undefined);
    ret.addPropertyResult('subnetIds', 'SubnetIds', properties.SubnetIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SubnetIds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnStack`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html
 */
export interface CfnStackProps {

    /**
     * The list of virtual private cloud (VPC) interface endpoint objects. Users of the stack can connect to AppStream 2.0 only through the specified endpoints.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-accessendpoints
     */
    readonly accessEndpoints?: Array<CfnStack.AccessEndpointProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The persistent application settings for users of the stack. When these settings are enabled, changes that users make to applications and Windows settings are automatically saved after each session and applied to the next session.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-applicationsettings
     */
    readonly applicationSettings?: CfnStack.ApplicationSettingsProperty | cdk.IResolvable;

    /**
     * The stack attributes to delete.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-attributestodelete
     */
    readonly attributesToDelete?: string[];

    /**
     * *This parameter has been deprecated.*
     *
     * Deletes the storage connectors currently enabled for the stack.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-deletestorageconnectors
     */
    readonly deleteStorageConnectors?: boolean | cdk.IResolvable;

    /**
     * The description to display.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-description
     */
    readonly description?: string;

    /**
     * The stack name to display.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-displayname
     */
    readonly displayName?: string;

    /**
     * The domains where AppStream 2.0 streaming sessions can be embedded in an iframe. You must approve the domains that you want to host embedded AppStream 2.0 streaming sessions.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-embedhostdomains
     */
    readonly embedHostDomains?: string[];

    /**
     * The URL that users are redirected to after they click the Send Feedback link. If no URL is specified, no Send Feedback link is displayed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-feedbackurl
     */
    readonly feedbackUrl?: string;

    /**
     * The name of the stack.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-name
     */
    readonly name?: string;

    /**
     * The URL that users are redirected to after their streaming session ends.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-redirecturl
     */
    readonly redirectUrl?: string;

    /**
     * The storage connectors to enable.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-storageconnectors
     */
    readonly storageConnectors?: Array<CfnStack.StorageConnectorProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * An array of key-value pairs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The actions that are enabled or disabled for users during their streaming sessions. By default, these actions are enabled.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-usersettings
     */
    readonly userSettings?: Array<CfnStack.UserSettingProperty | cdk.IResolvable> | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnStackProps`
 *
 * @param properties - the TypeScript properties of a `CfnStackProps`
 *
 * @returns the result of the validation.
 */
function CfnStackPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessEndpoints', cdk.listValidator(CfnStack_AccessEndpointPropertyValidator))(properties.accessEndpoints));
    errors.collect(cdk.propertyValidator('applicationSettings', CfnStack_ApplicationSettingsPropertyValidator)(properties.applicationSettings));
    errors.collect(cdk.propertyValidator('attributesToDelete', cdk.listValidator(cdk.validateString))(properties.attributesToDelete));
    errors.collect(cdk.propertyValidator('deleteStorageConnectors', cdk.validateBoolean)(properties.deleteStorageConnectors));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('displayName', cdk.validateString)(properties.displayName));
    errors.collect(cdk.propertyValidator('embedHostDomains', cdk.listValidator(cdk.validateString))(properties.embedHostDomains));
    errors.collect(cdk.propertyValidator('feedbackUrl', cdk.validateString)(properties.feedbackUrl));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('redirectUrl', cdk.validateString)(properties.redirectUrl));
    errors.collect(cdk.propertyValidator('storageConnectors', cdk.listValidator(CfnStack_StorageConnectorPropertyValidator))(properties.storageConnectors));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('userSettings', cdk.listValidator(CfnStack_UserSettingPropertyValidator))(properties.userSettings));
    return errors.wrap('supplied properties not correct for "CfnStackProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::Stack` resource
 *
 * @param properties - the TypeScript properties of a `CfnStackProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::Stack` resource.
 */
// @ts-ignore TS6133
function cfnStackPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnStackPropsValidator(properties).assertSuccess();
    return {
        AccessEndpoints: cdk.listMapper(cfnStackAccessEndpointPropertyToCloudFormation)(properties.accessEndpoints),
        ApplicationSettings: cfnStackApplicationSettingsPropertyToCloudFormation(properties.applicationSettings),
        AttributesToDelete: cdk.listMapper(cdk.stringToCloudFormation)(properties.attributesToDelete),
        DeleteStorageConnectors: cdk.booleanToCloudFormation(properties.deleteStorageConnectors),
        Description: cdk.stringToCloudFormation(properties.description),
        DisplayName: cdk.stringToCloudFormation(properties.displayName),
        EmbedHostDomains: cdk.listMapper(cdk.stringToCloudFormation)(properties.embedHostDomains),
        FeedbackURL: cdk.stringToCloudFormation(properties.feedbackUrl),
        Name: cdk.stringToCloudFormation(properties.name),
        RedirectURL: cdk.stringToCloudFormation(properties.redirectUrl),
        StorageConnectors: cdk.listMapper(cfnStackStorageConnectorPropertyToCloudFormation)(properties.storageConnectors),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        UserSettings: cdk.listMapper(cfnStackUserSettingPropertyToCloudFormation)(properties.userSettings),
    };
}

// @ts-ignore TS6133
function CfnStackPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnStackProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnStackProps>();
    ret.addPropertyResult('accessEndpoints', 'AccessEndpoints', properties.AccessEndpoints != null ? cfn_parse.FromCloudFormation.getArray(CfnStackAccessEndpointPropertyFromCloudFormation)(properties.AccessEndpoints) : undefined);
    ret.addPropertyResult('applicationSettings', 'ApplicationSettings', properties.ApplicationSettings != null ? CfnStackApplicationSettingsPropertyFromCloudFormation(properties.ApplicationSettings) : undefined);
    ret.addPropertyResult('attributesToDelete', 'AttributesToDelete', properties.AttributesToDelete != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AttributesToDelete) : undefined);
    ret.addPropertyResult('deleteStorageConnectors', 'DeleteStorageConnectors', properties.DeleteStorageConnectors != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DeleteStorageConnectors) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('displayName', 'DisplayName', properties.DisplayName != null ? cfn_parse.FromCloudFormation.getString(properties.DisplayName) : undefined);
    ret.addPropertyResult('embedHostDomains', 'EmbedHostDomains', properties.EmbedHostDomains != null ? cfn_parse.FromCloudFormation.getStringArray(properties.EmbedHostDomains) : undefined);
    ret.addPropertyResult('feedbackUrl', 'FeedbackURL', properties.FeedbackURL != null ? cfn_parse.FromCloudFormation.getString(properties.FeedbackURL) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('redirectUrl', 'RedirectURL', properties.RedirectURL != null ? cfn_parse.FromCloudFormation.getString(properties.RedirectURL) : undefined);
    ret.addPropertyResult('storageConnectors', 'StorageConnectors', properties.StorageConnectors != null ? cfn_parse.FromCloudFormation.getArray(CfnStackStorageConnectorPropertyFromCloudFormation)(properties.StorageConnectors) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('userSettings', 'UserSettings', properties.UserSettings != null ? cfn_parse.FromCloudFormation.getArray(CfnStackUserSettingPropertyFromCloudFormation)(properties.UserSettings) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppStream::Stack`
 *
 * The `AWS::AppStream::Stack` resource creates a stack to start streaming applications to Amazon AppStream 2.0 users. A stack consists of an associated fleet, user access policies, and storage configurations.
 *
 * @cloudformationResource AWS::AppStream::Stack
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html
 */
export class CfnStack extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppStream::Stack";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnStack {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnStackPropsFromCloudFormation(resourceProperties);
        const ret = new CfnStack(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The list of virtual private cloud (VPC) interface endpoint objects. Users of the stack can connect to AppStream 2.0 only through the specified endpoints.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-accessendpoints
     */
    public accessEndpoints: Array<CfnStack.AccessEndpointProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The persistent application settings for users of the stack. When these settings are enabled, changes that users make to applications and Windows settings are automatically saved after each session and applied to the next session.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-applicationsettings
     */
    public applicationSettings: CfnStack.ApplicationSettingsProperty | cdk.IResolvable | undefined;

    /**
     * The stack attributes to delete.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-attributestodelete
     */
    public attributesToDelete: string[] | undefined;

    /**
     * *This parameter has been deprecated.*
     *
     * Deletes the storage connectors currently enabled for the stack.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-deletestorageconnectors
     */
    public deleteStorageConnectors: boolean | cdk.IResolvable | undefined;

    /**
     * The description to display.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-description
     */
    public description: string | undefined;

    /**
     * The stack name to display.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-displayname
     */
    public displayName: string | undefined;

    /**
     * The domains where AppStream 2.0 streaming sessions can be embedded in an iframe. You must approve the domains that you want to host embedded AppStream 2.0 streaming sessions.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-embedhostdomains
     */
    public embedHostDomains: string[] | undefined;

    /**
     * The URL that users are redirected to after they click the Send Feedback link. If no URL is specified, no Send Feedback link is displayed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-feedbackurl
     */
    public feedbackUrl: string | undefined;

    /**
     * The name of the stack.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-name
     */
    public name: string | undefined;

    /**
     * The URL that users are redirected to after their streaming session ends.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-redirecturl
     */
    public redirectUrl: string | undefined;

    /**
     * The storage connectors to enable.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-storageconnectors
     */
    public storageConnectors: Array<CfnStack.StorageConnectorProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * An array of key-value pairs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The actions that are enabled or disabled for users during their streaming sessions. By default, these actions are enabled.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stack.html#cfn-appstream-stack-usersettings
     */
    public userSettings: Array<CfnStack.UserSettingProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::AppStream::Stack`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnStackProps = {}) {
        super(scope, id, { type: CfnStack.CFN_RESOURCE_TYPE_NAME, properties: props });

        this.accessEndpoints = props.accessEndpoints;
        this.applicationSettings = props.applicationSettings;
        this.attributesToDelete = props.attributesToDelete;
        this.deleteStorageConnectors = props.deleteStorageConnectors;
        this.description = props.description;
        this.displayName = props.displayName;
        this.embedHostDomains = props.embedHostDomains;
        this.feedbackUrl = props.feedbackUrl;
        this.name = props.name;
        this.redirectUrl = props.redirectUrl;
        this.storageConnectors = props.storageConnectors;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::AppStream::Stack", props.tags, { tagPropertyName: 'tags' });
        this.userSettings = props.userSettings;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnStack.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            accessEndpoints: this.accessEndpoints,
            applicationSettings: this.applicationSettings,
            attributesToDelete: this.attributesToDelete,
            deleteStorageConnectors: this.deleteStorageConnectors,
            description: this.description,
            displayName: this.displayName,
            embedHostDomains: this.embedHostDomains,
            feedbackUrl: this.feedbackUrl,
            name: this.name,
            redirectUrl: this.redirectUrl,
            storageConnectors: this.storageConnectors,
            tags: this.tags.renderTags(),
            userSettings: this.userSettings,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnStackPropsToCloudFormation(props);
    }
}

export namespace CfnStack {
    /**
     * Describes an interface VPC endpoint (interface endpoint) that lets you create a private connection between the virtual private cloud (VPC) that you specify and AppStream 2.0. When you specify an interface endpoint for a stack, users of the stack can connect to AppStream 2.0 only through that endpoint. When you specify an interface endpoint for an image builder, administrators can connect to the image builder only through that endpoint.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-stack-accessendpoint.html
     */
    export interface AccessEndpointProperty {
        /**
         * The type of interface endpoint.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-stack-accessendpoint.html#cfn-appstream-stack-accessendpoint-endpointtype
         */
        readonly endpointType: string;
        /**
         * The identifier (ID) of the VPC in which the interface endpoint is used.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-stack-accessendpoint.html#cfn-appstream-stack-accessendpoint-vpceid
         */
        readonly vpceId: string;
    }
}

/**
 * Determine whether the given properties match those of a `AccessEndpointProperty`
 *
 * @param properties - the TypeScript properties of a `AccessEndpointProperty`
 *
 * @returns the result of the validation.
 */
function CfnStack_AccessEndpointPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endpointType', cdk.requiredValidator)(properties.endpointType));
    errors.collect(cdk.propertyValidator('endpointType', cdk.validateString)(properties.endpointType));
    errors.collect(cdk.propertyValidator('vpceId', cdk.requiredValidator)(properties.vpceId));
    errors.collect(cdk.propertyValidator('vpceId', cdk.validateString)(properties.vpceId));
    return errors.wrap('supplied properties not correct for "AccessEndpointProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::Stack.AccessEndpoint` resource
 *
 * @param properties - the TypeScript properties of a `AccessEndpointProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::Stack.AccessEndpoint` resource.
 */
// @ts-ignore TS6133
function cfnStackAccessEndpointPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnStack_AccessEndpointPropertyValidator(properties).assertSuccess();
    return {
        EndpointType: cdk.stringToCloudFormation(properties.endpointType),
        VpceId: cdk.stringToCloudFormation(properties.vpceId),
    };
}

// @ts-ignore TS6133
function CfnStackAccessEndpointPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnStack.AccessEndpointProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnStack.AccessEndpointProperty>();
    ret.addPropertyResult('endpointType', 'EndpointType', cfn_parse.FromCloudFormation.getString(properties.EndpointType));
    ret.addPropertyResult('vpceId', 'VpceId', cfn_parse.FromCloudFormation.getString(properties.VpceId));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnStack {
    /**
     * The persistent application settings for users of a stack.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-stack-applicationsettings.html
     */
    export interface ApplicationSettingsProperty {
        /**
         * Enables or disables persistent application settings for users during their streaming sessions.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-stack-applicationsettings.html#cfn-appstream-stack-applicationsettings-enabled
         */
        readonly enabled: boolean | cdk.IResolvable;
        /**
         * The path prefix for the S3 bucket where users’ persistent application settings are stored. You can allow the same persistent application settings to be used across multiple stacks by specifying the same settings group for each stack.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-stack-applicationsettings.html#cfn-appstream-stack-applicationsettings-settingsgroup
         */
        readonly settingsGroup?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ApplicationSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `ApplicationSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnStack_ApplicationSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enabled', cdk.requiredValidator)(properties.enabled));
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    errors.collect(cdk.propertyValidator('settingsGroup', cdk.validateString)(properties.settingsGroup));
    return errors.wrap('supplied properties not correct for "ApplicationSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::Stack.ApplicationSettings` resource
 *
 * @param properties - the TypeScript properties of a `ApplicationSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::Stack.ApplicationSettings` resource.
 */
// @ts-ignore TS6133
function cfnStackApplicationSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnStack_ApplicationSettingsPropertyValidator(properties).assertSuccess();
    return {
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
        SettingsGroup: cdk.stringToCloudFormation(properties.settingsGroup),
    };
}

// @ts-ignore TS6133
function CfnStackApplicationSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnStack.ApplicationSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnStack.ApplicationSettingsProperty>();
    ret.addPropertyResult('enabled', 'Enabled', cfn_parse.FromCloudFormation.getBoolean(properties.Enabled));
    ret.addPropertyResult('settingsGroup', 'SettingsGroup', properties.SettingsGroup != null ? cfn_parse.FromCloudFormation.getString(properties.SettingsGroup) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnStack {
    /**
     * A connector that enables persistent storage for users.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-stack-storageconnector.html
     */
    export interface StorageConnectorProperty {
        /**
         * The type of storage connector.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-stack-storageconnector.html#cfn-appstream-stack-storageconnector-connectortype
         */
        readonly connectorType: string;
        /**
         * The names of the domains for the account.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-stack-storageconnector.html#cfn-appstream-stack-storageconnector-domains
         */
        readonly domains?: string[];
        /**
         * The ARN of the storage connector.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-stack-storageconnector.html#cfn-appstream-stack-storageconnector-resourceidentifier
         */
        readonly resourceIdentifier?: string;
    }
}

/**
 * Determine whether the given properties match those of a `StorageConnectorProperty`
 *
 * @param properties - the TypeScript properties of a `StorageConnectorProperty`
 *
 * @returns the result of the validation.
 */
function CfnStack_StorageConnectorPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('connectorType', cdk.requiredValidator)(properties.connectorType));
    errors.collect(cdk.propertyValidator('connectorType', cdk.validateString)(properties.connectorType));
    errors.collect(cdk.propertyValidator('domains', cdk.listValidator(cdk.validateString))(properties.domains));
    errors.collect(cdk.propertyValidator('resourceIdentifier', cdk.validateString)(properties.resourceIdentifier));
    return errors.wrap('supplied properties not correct for "StorageConnectorProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::Stack.StorageConnector` resource
 *
 * @param properties - the TypeScript properties of a `StorageConnectorProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::Stack.StorageConnector` resource.
 */
// @ts-ignore TS6133
function cfnStackStorageConnectorPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnStack_StorageConnectorPropertyValidator(properties).assertSuccess();
    return {
        ConnectorType: cdk.stringToCloudFormation(properties.connectorType),
        Domains: cdk.listMapper(cdk.stringToCloudFormation)(properties.domains),
        ResourceIdentifier: cdk.stringToCloudFormation(properties.resourceIdentifier),
    };
}

// @ts-ignore TS6133
function CfnStackStorageConnectorPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnStack.StorageConnectorProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnStack.StorageConnectorProperty>();
    ret.addPropertyResult('connectorType', 'ConnectorType', cfn_parse.FromCloudFormation.getString(properties.ConnectorType));
    ret.addPropertyResult('domains', 'Domains', properties.Domains != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Domains) : undefined);
    ret.addPropertyResult('resourceIdentifier', 'ResourceIdentifier', properties.ResourceIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.ResourceIdentifier) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnStack {
    /**
     * Specifies an action and whether the action is enabled or disabled for users during their streaming sessions.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-stack-usersetting.html
     */
    export interface UserSettingProperty {
        /**
         * The action that is enabled or disabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-stack-usersetting.html#cfn-appstream-stack-usersetting-action
         */
        readonly action: string;
        /**
         * Indicates whether the action is enabled or disabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appstream-stack-usersetting.html#cfn-appstream-stack-usersetting-permission
         */
        readonly permission: string;
    }
}

/**
 * Determine whether the given properties match those of a `UserSettingProperty`
 *
 * @param properties - the TypeScript properties of a `UserSettingProperty`
 *
 * @returns the result of the validation.
 */
function CfnStack_UserSettingPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('action', cdk.requiredValidator)(properties.action));
    errors.collect(cdk.propertyValidator('action', cdk.validateString)(properties.action));
    errors.collect(cdk.propertyValidator('permission', cdk.requiredValidator)(properties.permission));
    errors.collect(cdk.propertyValidator('permission', cdk.validateString)(properties.permission));
    return errors.wrap('supplied properties not correct for "UserSettingProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::Stack.UserSetting` resource
 *
 * @param properties - the TypeScript properties of a `UserSettingProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::Stack.UserSetting` resource.
 */
// @ts-ignore TS6133
function cfnStackUserSettingPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnStack_UserSettingPropertyValidator(properties).assertSuccess();
    return {
        Action: cdk.stringToCloudFormation(properties.action),
        Permission: cdk.stringToCloudFormation(properties.permission),
    };
}

// @ts-ignore TS6133
function CfnStackUserSettingPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnStack.UserSettingProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnStack.UserSettingProperty>();
    ret.addPropertyResult('action', 'Action', cfn_parse.FromCloudFormation.getString(properties.Action));
    ret.addPropertyResult('permission', 'Permission', cfn_parse.FromCloudFormation.getString(properties.Permission));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnStackFleetAssociation`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackfleetassociation.html
 */
export interface CfnStackFleetAssociationProps {

    /**
     * The name of the fleet.
     *
     * To associate a fleet with a stack, you must specify a dependency on the fleet resource. For more information, see [DependsOn Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackfleetassociation.html#cfn-appstream-stackfleetassociation-fleetname
     */
    readonly fleetName: string;

    /**
     * The name of the stack.
     *
     * To associate a fleet with a stack, you must specify a dependency on the stack resource. For more information, see [DependsOn Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackfleetassociation.html#cfn-appstream-stackfleetassociation-stackname
     */
    readonly stackName: string;
}

/**
 * Determine whether the given properties match those of a `CfnStackFleetAssociationProps`
 *
 * @param properties - the TypeScript properties of a `CfnStackFleetAssociationProps`
 *
 * @returns the result of the validation.
 */
function CfnStackFleetAssociationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('fleetName', cdk.requiredValidator)(properties.fleetName));
    errors.collect(cdk.propertyValidator('fleetName', cdk.validateString)(properties.fleetName));
    errors.collect(cdk.propertyValidator('stackName', cdk.requiredValidator)(properties.stackName));
    errors.collect(cdk.propertyValidator('stackName', cdk.validateString)(properties.stackName));
    return errors.wrap('supplied properties not correct for "CfnStackFleetAssociationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::StackFleetAssociation` resource
 *
 * @param properties - the TypeScript properties of a `CfnStackFleetAssociationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::StackFleetAssociation` resource.
 */
// @ts-ignore TS6133
function cfnStackFleetAssociationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnStackFleetAssociationPropsValidator(properties).assertSuccess();
    return {
        FleetName: cdk.stringToCloudFormation(properties.fleetName),
        StackName: cdk.stringToCloudFormation(properties.stackName),
    };
}

// @ts-ignore TS6133
function CfnStackFleetAssociationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnStackFleetAssociationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnStackFleetAssociationProps>();
    ret.addPropertyResult('fleetName', 'FleetName', cfn_parse.FromCloudFormation.getString(properties.FleetName));
    ret.addPropertyResult('stackName', 'StackName', cfn_parse.FromCloudFormation.getString(properties.StackName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppStream::StackFleetAssociation`
 *
 * The `AWS::AppStream::StackFleetAssociation` resource associates the specified fleet with the specified stack for Amazon AppStream 2.0.
 *
 * @cloudformationResource AWS::AppStream::StackFleetAssociation
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackfleetassociation.html
 */
export class CfnStackFleetAssociation extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppStream::StackFleetAssociation";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnStackFleetAssociation {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnStackFleetAssociationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnStackFleetAssociation(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the fleet.
     *
     * To associate a fleet with a stack, you must specify a dependency on the fleet resource. For more information, see [DependsOn Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackfleetassociation.html#cfn-appstream-stackfleetassociation-fleetname
     */
    public fleetName: string;

    /**
     * The name of the stack.
     *
     * To associate a fleet with a stack, you must specify a dependency on the stack resource. For more information, see [DependsOn Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackfleetassociation.html#cfn-appstream-stackfleetassociation-stackname
     */
    public stackName: string;

    /**
     * Create a new `AWS::AppStream::StackFleetAssociation`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnStackFleetAssociationProps) {
        super(scope, id, { type: CfnStackFleetAssociation.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'fleetName', this);
        cdk.requireProperty(props, 'stackName', this);

        this.fleetName = props.fleetName;
        this.stackName = props.stackName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnStackFleetAssociation.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            fleetName: this.fleetName,
            stackName: this.stackName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnStackFleetAssociationPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnStackUserAssociation`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackuserassociation.html
 */
export interface CfnStackUserAssociationProps {

    /**
     * The authentication type for the user who is associated with the stack. You must specify USERPOOL.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackuserassociation.html#cfn-appstream-stackuserassociation-authenticationtype
     */
    readonly authenticationType: string;

    /**
     * The name of the stack that is associated with the user.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackuserassociation.html#cfn-appstream-stackuserassociation-stackname
     */
    readonly stackName: string;

    /**
     * The email address of the user who is associated with the stack.
     *
     * > Users' email addresses are case-sensitive.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackuserassociation.html#cfn-appstream-stackuserassociation-username
     */
    readonly userName: string;

    /**
     * Specifies whether a welcome email is sent to a user after the user is created in the user pool.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackuserassociation.html#cfn-appstream-stackuserassociation-sendemailnotification
     */
    readonly sendEmailNotification?: boolean | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnStackUserAssociationProps`
 *
 * @param properties - the TypeScript properties of a `CfnStackUserAssociationProps`
 *
 * @returns the result of the validation.
 */
function CfnStackUserAssociationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('authenticationType', cdk.requiredValidator)(properties.authenticationType));
    errors.collect(cdk.propertyValidator('authenticationType', cdk.validateString)(properties.authenticationType));
    errors.collect(cdk.propertyValidator('sendEmailNotification', cdk.validateBoolean)(properties.sendEmailNotification));
    errors.collect(cdk.propertyValidator('stackName', cdk.requiredValidator)(properties.stackName));
    errors.collect(cdk.propertyValidator('stackName', cdk.validateString)(properties.stackName));
    errors.collect(cdk.propertyValidator('userName', cdk.requiredValidator)(properties.userName));
    errors.collect(cdk.propertyValidator('userName', cdk.validateString)(properties.userName));
    return errors.wrap('supplied properties not correct for "CfnStackUserAssociationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::StackUserAssociation` resource
 *
 * @param properties - the TypeScript properties of a `CfnStackUserAssociationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::StackUserAssociation` resource.
 */
// @ts-ignore TS6133
function cfnStackUserAssociationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnStackUserAssociationPropsValidator(properties).assertSuccess();
    return {
        AuthenticationType: cdk.stringToCloudFormation(properties.authenticationType),
        StackName: cdk.stringToCloudFormation(properties.stackName),
        UserName: cdk.stringToCloudFormation(properties.userName),
        SendEmailNotification: cdk.booleanToCloudFormation(properties.sendEmailNotification),
    };
}

// @ts-ignore TS6133
function CfnStackUserAssociationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnStackUserAssociationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnStackUserAssociationProps>();
    ret.addPropertyResult('authenticationType', 'AuthenticationType', cfn_parse.FromCloudFormation.getString(properties.AuthenticationType));
    ret.addPropertyResult('stackName', 'StackName', cfn_parse.FromCloudFormation.getString(properties.StackName));
    ret.addPropertyResult('userName', 'UserName', cfn_parse.FromCloudFormation.getString(properties.UserName));
    ret.addPropertyResult('sendEmailNotification', 'SendEmailNotification', properties.SendEmailNotification != null ? cfn_parse.FromCloudFormation.getBoolean(properties.SendEmailNotification) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppStream::StackUserAssociation`
 *
 * The `AWS::AppStream::StackUserAssociation` resource associates the specified users with the specified stacks for Amazon AppStream 2.0. Users in an AppStream 2.0 user pool cannot be assigned to stacks with fleets that are joined to an Active Directory domain.
 *
 * @cloudformationResource AWS::AppStream::StackUserAssociation
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackuserassociation.html
 */
export class CfnStackUserAssociation extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppStream::StackUserAssociation";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnStackUserAssociation {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnStackUserAssociationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnStackUserAssociation(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The authentication type for the user who is associated with the stack. You must specify USERPOOL.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackuserassociation.html#cfn-appstream-stackuserassociation-authenticationtype
     */
    public authenticationType: string;

    /**
     * The name of the stack that is associated with the user.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackuserassociation.html#cfn-appstream-stackuserassociation-stackname
     */
    public stackName: string;

    /**
     * The email address of the user who is associated with the stack.
     *
     * > Users' email addresses are case-sensitive.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackuserassociation.html#cfn-appstream-stackuserassociation-username
     */
    public userName: string;

    /**
     * Specifies whether a welcome email is sent to a user after the user is created in the user pool.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-stackuserassociation.html#cfn-appstream-stackuserassociation-sendemailnotification
     */
    public sendEmailNotification: boolean | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::AppStream::StackUserAssociation`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnStackUserAssociationProps) {
        super(scope, id, { type: CfnStackUserAssociation.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'authenticationType', this);
        cdk.requireProperty(props, 'stackName', this);
        cdk.requireProperty(props, 'userName', this);

        this.authenticationType = props.authenticationType;
        this.stackName = props.stackName;
        this.userName = props.userName;
        this.sendEmailNotification = props.sendEmailNotification;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnStackUserAssociation.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            authenticationType: this.authenticationType,
            stackName: this.stackName,
            userName: this.userName,
            sendEmailNotification: this.sendEmailNotification,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnStackUserAssociationPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnUser`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-user.html
 */
export interface CfnUserProps {

    /**
     * The authentication type for the user. You must specify USERPOOL.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-user.html#cfn-appstream-user-authenticationtype
     */
    readonly authenticationType: string;

    /**
     * The email address of the user.
     *
     * Users' email addresses are case-sensitive. During login, if they specify an email address that doesn't use the same capitalization as the email address specified when their user pool account was created, a "user does not exist" error message displays.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-user.html#cfn-appstream-user-username
     */
    readonly userName: string;

    /**
     * The first name, or given name, of the user.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-user.html#cfn-appstream-user-firstname
     */
    readonly firstName?: string;

    /**
     * The last name, or surname, of the user.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-user.html#cfn-appstream-user-lastname
     */
    readonly lastName?: string;

    /**
     * The action to take for the welcome email that is sent to a user after the user is created in the user pool. If you specify SUPPRESS, no email is sent. If you specify RESEND, do not specify the first name or last name of the user. If the value is null, the email is sent.
     *
     * > The temporary password in the welcome email is valid for only 7 days. If users don’t set their passwords within 7 days, you must send them a new welcome email.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-user.html#cfn-appstream-user-messageaction
     */
    readonly messageAction?: string;
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
    errors.collect(cdk.propertyValidator('authenticationType', cdk.requiredValidator)(properties.authenticationType));
    errors.collect(cdk.propertyValidator('authenticationType', cdk.validateString)(properties.authenticationType));
    errors.collect(cdk.propertyValidator('firstName', cdk.validateString)(properties.firstName));
    errors.collect(cdk.propertyValidator('lastName', cdk.validateString)(properties.lastName));
    errors.collect(cdk.propertyValidator('messageAction', cdk.validateString)(properties.messageAction));
    errors.collect(cdk.propertyValidator('userName', cdk.requiredValidator)(properties.userName));
    errors.collect(cdk.propertyValidator('userName', cdk.validateString)(properties.userName));
    return errors.wrap('supplied properties not correct for "CfnUserProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppStream::User` resource
 *
 * @param properties - the TypeScript properties of a `CfnUserProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppStream::User` resource.
 */
// @ts-ignore TS6133
function cfnUserPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUserPropsValidator(properties).assertSuccess();
    return {
        AuthenticationType: cdk.stringToCloudFormation(properties.authenticationType),
        UserName: cdk.stringToCloudFormation(properties.userName),
        FirstName: cdk.stringToCloudFormation(properties.firstName),
        LastName: cdk.stringToCloudFormation(properties.lastName),
        MessageAction: cdk.stringToCloudFormation(properties.messageAction),
    };
}

// @ts-ignore TS6133
function CfnUserPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUserProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUserProps>();
    ret.addPropertyResult('authenticationType', 'AuthenticationType', cfn_parse.FromCloudFormation.getString(properties.AuthenticationType));
    ret.addPropertyResult('userName', 'UserName', cfn_parse.FromCloudFormation.getString(properties.UserName));
    ret.addPropertyResult('firstName', 'FirstName', properties.FirstName != null ? cfn_parse.FromCloudFormation.getString(properties.FirstName) : undefined);
    ret.addPropertyResult('lastName', 'LastName', properties.LastName != null ? cfn_parse.FromCloudFormation.getString(properties.LastName) : undefined);
    ret.addPropertyResult('messageAction', 'MessageAction', properties.MessageAction != null ? cfn_parse.FromCloudFormation.getString(properties.MessageAction) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppStream::User`
 *
 * The `AWS::AppStream::User` resource creates a new user in the AppStream 2.0 user pool.
 *
 * @cloudformationResource AWS::AppStream::User
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-user.html
 */
export class CfnUser extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppStream::User";

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
     * The authentication type for the user. You must specify USERPOOL.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-user.html#cfn-appstream-user-authenticationtype
     */
    public authenticationType: string;

    /**
     * The email address of the user.
     *
     * Users' email addresses are case-sensitive. During login, if they specify an email address that doesn't use the same capitalization as the email address specified when their user pool account was created, a "user does not exist" error message displays.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-user.html#cfn-appstream-user-username
     */
    public userName: string;

    /**
     * The first name, or given name, of the user.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-user.html#cfn-appstream-user-firstname
     */
    public firstName: string | undefined;

    /**
     * The last name, or surname, of the user.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-user.html#cfn-appstream-user-lastname
     */
    public lastName: string | undefined;

    /**
     * The action to take for the welcome email that is sent to a user after the user is created in the user pool. If you specify SUPPRESS, no email is sent. If you specify RESEND, do not specify the first name or last name of the user. If the value is null, the email is sent.
     *
     * > The temporary password in the welcome email is valid for only 7 days. If users don’t set their passwords within 7 days, you must send them a new welcome email.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-user.html#cfn-appstream-user-messageaction
     */
    public messageAction: string | undefined;

    /**
     * Create a new `AWS::AppStream::User`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnUserProps) {
        super(scope, id, { type: CfnUser.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'authenticationType', this);
        cdk.requireProperty(props, 'userName', this);

        this.authenticationType = props.authenticationType;
        this.userName = props.userName;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.messageAction = props.messageAction;
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
            authenticationType: this.authenticationType,
            userName: this.userName,
            firstName: this.firstName,
            lastName: this.lastName,
            messageAction: this.messageAction,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnUserPropsToCloudFormation(props);
    }
}
