// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:08.463Z","fingerprint":"NwjRJH31yaVDdeTNs2SCqvr6ahDx4woBBAAXw/0175w="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnAlias`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-alias.html
 */
export interface CfnAliasProps {

    /**
     * A descriptive label that is associated with an alias. Alias names do not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-alias.html#cfn-gamelift-alias-name
     */
    readonly name: string;

    /**
     * The routing configuration, including routing type and fleet target, for the alias.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-alias.html#cfn-gamelift-alias-routingstrategy
     */
    readonly routingStrategy: CfnAlias.RoutingStrategyProperty | cdk.IResolvable;

    /**
     * A human-readable description of the alias.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-alias.html#cfn-gamelift-alias-description
     */
    readonly description?: string;
}

/**
 * Determine whether the given properties match those of a `CfnAliasProps`
 *
 * @param properties - the TypeScript properties of a `CfnAliasProps`
 *
 * @returns the result of the validation.
 */
function CfnAliasPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('routingStrategy', cdk.requiredValidator)(properties.routingStrategy));
    errors.collect(cdk.propertyValidator('routingStrategy', CfnAlias_RoutingStrategyPropertyValidator)(properties.routingStrategy));
    return errors.wrap('supplied properties not correct for "CfnAliasProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::Alias` resource
 *
 * @param properties - the TypeScript properties of a `CfnAliasProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::Alias` resource.
 */
// @ts-ignore TS6133
function cfnAliasPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAliasPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        RoutingStrategy: cfnAliasRoutingStrategyPropertyToCloudFormation(properties.routingStrategy),
        Description: cdk.stringToCloudFormation(properties.description),
    };
}

// @ts-ignore TS6133
function CfnAliasPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAliasProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAliasProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('routingStrategy', 'RoutingStrategy', CfnAliasRoutingStrategyPropertyFromCloudFormation(properties.RoutingStrategy));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GameLift::Alias`
 *
 * The `AWS::GameLift::Alias` resource creates an alias for an Amazon GameLift (GameLift) fleet destination. There are two types of routing strategies for aliases: simple and terminal. A simple alias points to an active fleet. A terminal alias displays a message instead of routing players to an active fleet. For example, a terminal alias might display a URL link that directs players to an upgrade site. You can use aliases to define destinations in a game session queue or when requesting new game sessions.
 *
 * @cloudformationResource AWS::GameLift::Alias
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-alias.html
 */
export class CfnAlias extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GameLift::Alias";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAlias {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAliasPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAlias(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A unique identifier for the alias. For example, `arn:aws:gamelift:us-west-1::alias/alias-a1234567-b8c9-0d1e-2fa3-b45c6d7e8912`
     *
     * Alias IDs are unique within a Region.
     * @cloudformationAttribute AliasId
     */
    public readonly attrAliasId: string;

    /**
     * A descriptive label that is associated with an alias. Alias names do not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-alias.html#cfn-gamelift-alias-name
     */
    public name: string;

    /**
     * The routing configuration, including routing type and fleet target, for the alias.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-alias.html#cfn-gamelift-alias-routingstrategy
     */
    public routingStrategy: CfnAlias.RoutingStrategyProperty | cdk.IResolvable;

    /**
     * A human-readable description of the alias.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-alias.html#cfn-gamelift-alias-description
     */
    public description: string | undefined;

    /**
     * Create a new `AWS::GameLift::Alias`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAliasProps) {
        super(scope, id, { type: CfnAlias.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'routingStrategy', this);
        this.attrAliasId = cdk.Token.asString(this.getAtt('AliasId'));

        this.name = props.name;
        this.routingStrategy = props.routingStrategy;
        this.description = props.description;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAlias.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            routingStrategy: this.routingStrategy,
            description: this.description,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAliasPropsToCloudFormation(props);
    }
}

export namespace CfnAlias {
    /**
     * The routing configuration for a fleet alias.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-alias-routingstrategy.html
     */
    export interface RoutingStrategyProperty {
        /**
         * A unique identifier for a fleet that the alias points to. If you specify `SIMPLE` for the `Type` property, you must specify this property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-alias-routingstrategy.html#cfn-gamelift-alias-routingstrategy-fleetid
         */
        readonly fleetId?: string;
        /**
         * The message text to be used with a terminal routing strategy. If you specify `TERMINAL` for the `Type` property, you must specify this property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-alias-routingstrategy.html#cfn-gamelift-alias-routingstrategy-message
         */
        readonly message?: string;
        /**
         * A type of routing strategy.
         *
         * Possible routing types include the following:
         *
         * - *SIMPLE* - The alias resolves to one specific fleet. Use this type when routing to active fleets.
         * - *TERMINAL* - The alias does not resolve to a fleet but instead can be used to display a message to the user. A terminal alias throws a `TerminalRoutingStrategyException` with the message that you specified in the `Message` property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-alias-routingstrategy.html#cfn-gamelift-alias-routingstrategy-type
         */
        readonly type: string;
    }
}

/**
 * Determine whether the given properties match those of a `RoutingStrategyProperty`
 *
 * @param properties - the TypeScript properties of a `RoutingStrategyProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlias_RoutingStrategyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('fleetId', cdk.validateString)(properties.fleetId));
    errors.collect(cdk.propertyValidator('message', cdk.validateString)(properties.message));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "RoutingStrategyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::Alias.RoutingStrategy` resource
 *
 * @param properties - the TypeScript properties of a `RoutingStrategyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::Alias.RoutingStrategy` resource.
 */
// @ts-ignore TS6133
function cfnAliasRoutingStrategyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlias_RoutingStrategyPropertyValidator(properties).assertSuccess();
    return {
        FleetId: cdk.stringToCloudFormation(properties.fleetId),
        Message: cdk.stringToCloudFormation(properties.message),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnAliasRoutingStrategyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlias.RoutingStrategyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlias.RoutingStrategyProperty>();
    ret.addPropertyResult('fleetId', 'FleetId', properties.FleetId != null ? cfn_parse.FromCloudFormation.getString(properties.FleetId) : undefined);
    ret.addPropertyResult('message', 'Message', properties.Message != null ? cfn_parse.FromCloudFormation.getString(properties.Message) : undefined);
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnBuild`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-build.html
 */
export interface CfnBuildProps {

    /**
     * A descriptive label that is associated with a build. Build names do not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-build.html#cfn-gamelift-build-name
     */
    readonly name?: string;

    /**
     * The operating system that the game server binaries are built to run on. This value determines the type of fleet resources that you can use for this build. If your game build contains multiple executables, they all must run on the same operating system. If an operating system is not specified when creating a build, Amazon GameLift uses the default value (WINDOWS_2012). This value cannot be changed later.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-build.html#cfn-gamelift-build-operatingsystem
     */
    readonly operatingSystem?: string;

    /**
     * Information indicating where your game build files are stored. Use this parameter only when creating a build with files stored in an Amazon S3 bucket that you own. The storage location must specify an Amazon S3 bucket name and key. The location must also specify a role ARN that you set up to allow Amazon GameLift to access your Amazon S3 bucket. The S3 bucket and your new build must be in the same Region.
     *
     * If a `StorageLocation` is specified, the size of your file can be found in your Amazon S3 bucket. Amazon GameLift will report a `SizeOnDisk` of 0.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-build.html#cfn-gamelift-build-storagelocation
     */
    readonly storageLocation?: CfnBuild.S3LocationProperty | cdk.IResolvable;

    /**
     * Version information that is associated with this build. Version strings do not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-build.html#cfn-gamelift-build-version
     */
    readonly version?: string;
}

/**
 * Determine whether the given properties match those of a `CfnBuildProps`
 *
 * @param properties - the TypeScript properties of a `CfnBuildProps`
 *
 * @returns the result of the validation.
 */
function CfnBuildPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('operatingSystem', cdk.validateString)(properties.operatingSystem));
    errors.collect(cdk.propertyValidator('storageLocation', CfnBuild_S3LocationPropertyValidator)(properties.storageLocation));
    errors.collect(cdk.propertyValidator('version', cdk.validateString)(properties.version));
    return errors.wrap('supplied properties not correct for "CfnBuildProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::Build` resource
 *
 * @param properties - the TypeScript properties of a `CfnBuildProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::Build` resource.
 */
// @ts-ignore TS6133
function cfnBuildPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnBuildPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        OperatingSystem: cdk.stringToCloudFormation(properties.operatingSystem),
        StorageLocation: cfnBuildS3LocationPropertyToCloudFormation(properties.storageLocation),
        Version: cdk.stringToCloudFormation(properties.version),
    };
}

// @ts-ignore TS6133
function CfnBuildPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnBuildProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnBuildProps>();
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('operatingSystem', 'OperatingSystem', properties.OperatingSystem != null ? cfn_parse.FromCloudFormation.getString(properties.OperatingSystem) : undefined);
    ret.addPropertyResult('storageLocation', 'StorageLocation', properties.StorageLocation != null ? CfnBuildS3LocationPropertyFromCloudFormation(properties.StorageLocation) : undefined);
    ret.addPropertyResult('version', 'Version', properties.Version != null ? cfn_parse.FromCloudFormation.getString(properties.Version) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GameLift::Build`
 *
 * The `AWS::GameLift::Build` resource creates a game server build that is installed and run on instances in an Amazon GameLift fleet. This resource points to an Amazon S3 location that contains a zip file with all of the components of the game server build.
 *
 * @cloudformationResource AWS::GameLift::Build
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-build.html
 */
export class CfnBuild extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GameLift::Build";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnBuild {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnBuildPropsFromCloudFormation(resourceProperties);
        const ret = new CfnBuild(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A descriptive label that is associated with a build. Build names do not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-build.html#cfn-gamelift-build-name
     */
    public name: string | undefined;

    /**
     * The operating system that the game server binaries are built to run on. This value determines the type of fleet resources that you can use for this build. If your game build contains multiple executables, they all must run on the same operating system. If an operating system is not specified when creating a build, Amazon GameLift uses the default value (WINDOWS_2012). This value cannot be changed later.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-build.html#cfn-gamelift-build-operatingsystem
     */
    public operatingSystem: string | undefined;

    /**
     * Information indicating where your game build files are stored. Use this parameter only when creating a build with files stored in an Amazon S3 bucket that you own. The storage location must specify an Amazon S3 bucket name and key. The location must also specify a role ARN that you set up to allow Amazon GameLift to access your Amazon S3 bucket. The S3 bucket and your new build must be in the same Region.
     *
     * If a `StorageLocation` is specified, the size of your file can be found in your Amazon S3 bucket. Amazon GameLift will report a `SizeOnDisk` of 0.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-build.html#cfn-gamelift-build-storagelocation
     */
    public storageLocation: CfnBuild.S3LocationProperty | cdk.IResolvable | undefined;

    /**
     * Version information that is associated with this build. Version strings do not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-build.html#cfn-gamelift-build-version
     */
    public version: string | undefined;

    /**
     * Create a new `AWS::GameLift::Build`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnBuildProps = {}) {
        super(scope, id, { type: CfnBuild.CFN_RESOURCE_TYPE_NAME, properties: props });

        this.name = props.name;
        this.operatingSystem = props.operatingSystem;
        this.storageLocation = props.storageLocation;
        this.version = props.version;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnBuild.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            operatingSystem: this.operatingSystem,
            storageLocation: this.storageLocation,
            version: this.version,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnBuildPropsToCloudFormation(props);
    }
}

export namespace CfnBuild {
    /**
     * The location in Amazon S3 where build or script files are stored for access by Amazon GameLift.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-build-storagelocation.html
     */
    export interface S3LocationProperty {
        /**
         * An Amazon S3 bucket identifier. This is the name of the S3 bucket.
         *
         * > GameLift currently does not support uploading from Amazon S3 buckets with names that contain a dot (.).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-build-storagelocation.html#cfn-gamelift-build-storage-bucket
         */
        readonly bucket: string;
        /**
         * The name of the zip file that contains the build files or script files.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-build-storagelocation.html#cfn-gamelift-build-storage-key
         */
        readonly key: string;
        /**
         * The version of the file, if object versioning is turned on for the bucket. Amazon GameLift uses this information when retrieving files from your S3 bucket. To retrieve a specific version of the file, provide an object version. To retrieve the latest version of the file, do not set this parameter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-build-storagelocation.html#cfn-gamelift-build-object-verison
         */
        readonly objectVersion?: string;
        /**
         * The Amazon Resource Name ( [ARN](https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-arn-format.html) ) for an IAM role that allows Amazon GameLift to access the S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-build-storagelocation.html#cfn-gamelift-build-storage-rolearn
         */
        readonly roleArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3LocationProperty`
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the result of the validation.
 */
function CfnBuild_S3LocationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucket', cdk.requiredValidator)(properties.bucket));
    errors.collect(cdk.propertyValidator('bucket', cdk.validateString)(properties.bucket));
    errors.collect(cdk.propertyValidator('key', cdk.requiredValidator)(properties.key));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('objectVersion', cdk.validateString)(properties.objectVersion));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "S3LocationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::Build.S3Location` resource
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::Build.S3Location` resource.
 */
// @ts-ignore TS6133
function cfnBuildS3LocationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnBuild_S3LocationPropertyValidator(properties).assertSuccess();
    return {
        Bucket: cdk.stringToCloudFormation(properties.bucket),
        Key: cdk.stringToCloudFormation(properties.key),
        ObjectVersion: cdk.stringToCloudFormation(properties.objectVersion),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnBuildS3LocationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnBuild.S3LocationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnBuild.S3LocationProperty>();
    ret.addPropertyResult('bucket', 'Bucket', cfn_parse.FromCloudFormation.getString(properties.Bucket));
    ret.addPropertyResult('key', 'Key', cfn_parse.FromCloudFormation.getString(properties.Key));
    ret.addPropertyResult('objectVersion', 'ObjectVersion', properties.ObjectVersion != null ? cfn_parse.FromCloudFormation.getString(properties.ObjectVersion) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnFleet`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html
 */
export interface CfnFleetProps {

    /**
     * A unique identifier for a build to be deployed on the new fleet. If you are deploying the fleet with a custom game build, you must specify this property. The build must have been successfully uploaded to Amazon GameLift and be in a `READY` status. This fleet setting cannot be changed once the fleet is created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-buildid
     */
    readonly buildId?: string;

    /**
     * Prompts GameLift to generate a TLS/SSL certificate for the fleet. TLS certificates are used for encrypting traffic between game clients and the game servers that are running on GameLift. By default, the `CertificateConfiguration` is set to `DISABLED` . This property cannot be changed after the fleet is created.
     *
     * Note: This feature requires the AWS Certificate Manager (ACM) service, which is not available in all AWS regions. When working in a region that does not support this feature, a fleet creation request with certificate generation fails with a 4xx error.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-certificateconfiguration
     */
    readonly certificateConfiguration?: CfnFleet.CertificateConfigurationProperty | cdk.IResolvable;

    /**
     * A human-readable description of the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-description
     */
    readonly description?: string;

    /**
     * The number of EC2 instances that you want this fleet to host. When creating a new fleet, GameLift automatically sets this value to "1" and initiates a single instance. Once the fleet is active, update this value to trigger GameLift to add or remove instances from the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-desiredec2instances
     */
    readonly desiredEc2Instances?: number;

    /**
     * The allowed IP address ranges and port settings that allow inbound traffic to access game sessions on this fleet. If the fleet is hosting a custom game build, this property must be set before players can connect to game sessions. For Realtime Servers fleets, GameLift automatically sets TCP and UDP ranges.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-ec2inboundpermissions
     */
    readonly ec2InboundPermissions?: Array<CfnFleet.IpPermissionProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The GameLift-supported Amazon EC2 instance type to use for all fleet instances. Instance type determines the computing resources that will be used to host your game servers, including CPU, memory, storage, and networking capacity. See [Amazon Elastic Compute Cloud Instance Types](https://docs.aws.amazon.com/ec2/instance-types/) for detailed descriptions of Amazon EC2 instance types.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-ec2instancetype
     */
    readonly ec2InstanceType?: string;

    /**
     * Indicates whether to use On-Demand or Spot instances for this fleet. By default, this property is set to `ON_DEMAND` . Learn more about when to use [On-Demand versus Spot Instances](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-ec2-instances.html#gamelift-ec2-instances-spot) . This property cannot be changed after the fleet is created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-fleettype
     */
    readonly fleetType?: string;

    /**
     * A unique identifier for an IAM role that manages access to your AWS services. With an instance role ARN set, any application that runs on an instance in this fleet can assume the role, including install scripts, server processes, and daemons (background processes). Create a role or look up a role's ARN by using the [IAM dashboard](https://docs.aws.amazon.com/iam/) in the AWS Management Console . Learn more about using on-box credentials for your game servers at [Access external resources from a game server](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-sdk-server-resources.html) . This property cannot be changed after the fleet is created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-instancerolearn
     */
    readonly instanceRoleArn?: string;

    /**
     * A set of remote locations to deploy additional instances to and manage as part of the fleet. This parameter can only be used when creating fleets in AWS Regions that support multiple locations. You can add any GameLift-supported AWS Region as a remote location, in the form of an AWS Region code such as `us-west-2` . To create a fleet with instances in the home Region only, omit this parameter.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-locations
     */
    readonly locations?: Array<CfnFleet.LocationConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The maximum number of instances that are allowed in the specified fleet location. If this parameter is not set, the default is 1.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-maxsize
     */
    readonly maxSize?: number;

    /**
     * The name of an AWS CloudWatch metric group to add this fleet to. A metric group is used to aggregate the metrics for multiple fleets. You can specify an existing metric group name or set a new name to create a new metric group. A fleet can be included in only one metric group at a time.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-metricgroups
     */
    readonly metricGroups?: string[];

    /**
     * The minimum number of instances that are allowed in the specified fleet location. If this parameter is not set, the default is 0.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-minsize
     */
    readonly minSize?: number;

    /**
     * A descriptive label that is associated with a fleet. Fleet names do not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-name
     */
    readonly name?: string;

    /**
     * The status of termination protection for active game sessions on the fleet. By default, this property is set to `NoProtection` .
     *
     * - *NoProtection* - Game sessions can be terminated during active gameplay as a result of a scale-down event.
     * - *FullProtection* - Game sessions in `ACTIVE` status cannot be terminated during a scale-down event.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-newgamesessionprotectionpolicy
     */
    readonly newGameSessionProtectionPolicy?: string;

    /**
     * Used when peering your GameLift fleet with a VPC, the unique identifier for the AWS account that owns the VPC. You can find your account ID in the AWS Management Console under account settings.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-peervpcawsaccountid
     */
    readonly peerVpcAwsAccountId?: string;

    /**
     * A unique identifier for a VPC with resources to be accessed by your GameLift fleet. The VPC must be in the same Region as your fleet. To look up a VPC ID, use the [VPC Dashboard](https://docs.aws.amazon.com/vpc/) in the AWS Management Console . Learn more about VPC peering in [VPC Peering with GameLift Fleets](https://docs.aws.amazon.com/gamelift/latest/developerguide/vpc-peering.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-peervpcid
     */
    readonly peerVpcId?: string;

    /**
     * A policy that limits the number of game sessions that an individual player can create on instances in this fleet within a specified span of time.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-resourcecreationlimitpolicy
     */
    readonly resourceCreationLimitPolicy?: CfnFleet.ResourceCreationLimitPolicyProperty | cdk.IResolvable;

    /**
     * Instructions for how to launch and maintain server processes on instances in the fleet. The runtime configuration defines one or more server process configurations, each identifying a build executable or Realtime script file and the number of processes of that type to run concurrently.
     *
     * > The `RuntimeConfiguration` parameter is required unless the fleet is being configured using the older parameters `ServerLaunchPath` and `ServerLaunchParameters` , which are still supported for backward compatibility.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-runtimeconfiguration
     */
    readonly runtimeConfiguration?: CfnFleet.RuntimeConfigurationProperty | cdk.IResolvable;

    /**
     * The unique identifier for a Realtime configuration script to be deployed on fleet instances. You can use either the script ID or ARN. Scripts must be uploaded to GameLift prior to creating the fleet. This fleet property cannot be changed later.
     *
     * > You can't use the `!Ref` command to reference a script created with a CloudFormation template for the fleet property `ScriptId` . Instead, use `Fn::GetAtt Script.Arn` or `Fn::GetAtt Script.Id` to retrieve either of these properties as input for `ScriptId` . Alternatively, enter a `ScriptId` string manually.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-scriptid
     */
    readonly scriptId?: string;
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
    errors.collect(cdk.propertyValidator('buildId', cdk.validateString)(properties.buildId));
    errors.collect(cdk.propertyValidator('certificateConfiguration', CfnFleet_CertificateConfigurationPropertyValidator)(properties.certificateConfiguration));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('desiredEc2Instances', cdk.validateNumber)(properties.desiredEc2Instances));
    errors.collect(cdk.propertyValidator('ec2InboundPermissions', cdk.listValidator(CfnFleet_IpPermissionPropertyValidator))(properties.ec2InboundPermissions));
    errors.collect(cdk.propertyValidator('ec2InstanceType', cdk.validateString)(properties.ec2InstanceType));
    errors.collect(cdk.propertyValidator('fleetType', cdk.validateString)(properties.fleetType));
    errors.collect(cdk.propertyValidator('instanceRoleArn', cdk.validateString)(properties.instanceRoleArn));
    errors.collect(cdk.propertyValidator('locations', cdk.listValidator(CfnFleet_LocationConfigurationPropertyValidator))(properties.locations));
    errors.collect(cdk.propertyValidator('maxSize', cdk.validateNumber)(properties.maxSize));
    errors.collect(cdk.propertyValidator('metricGroups', cdk.listValidator(cdk.validateString))(properties.metricGroups));
    errors.collect(cdk.propertyValidator('minSize', cdk.validateNumber)(properties.minSize));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('newGameSessionProtectionPolicy', cdk.validateString)(properties.newGameSessionProtectionPolicy));
    errors.collect(cdk.propertyValidator('peerVpcAwsAccountId', cdk.validateString)(properties.peerVpcAwsAccountId));
    errors.collect(cdk.propertyValidator('peerVpcId', cdk.validateString)(properties.peerVpcId));
    errors.collect(cdk.propertyValidator('resourceCreationLimitPolicy', CfnFleet_ResourceCreationLimitPolicyPropertyValidator)(properties.resourceCreationLimitPolicy));
    errors.collect(cdk.propertyValidator('runtimeConfiguration', CfnFleet_RuntimeConfigurationPropertyValidator)(properties.runtimeConfiguration));
    errors.collect(cdk.propertyValidator('scriptId', cdk.validateString)(properties.scriptId));
    return errors.wrap('supplied properties not correct for "CfnFleetProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::Fleet` resource
 *
 * @param properties - the TypeScript properties of a `CfnFleetProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::Fleet` resource.
 */
// @ts-ignore TS6133
function cfnFleetPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleetPropsValidator(properties).assertSuccess();
    return {
        BuildId: cdk.stringToCloudFormation(properties.buildId),
        CertificateConfiguration: cfnFleetCertificateConfigurationPropertyToCloudFormation(properties.certificateConfiguration),
        Description: cdk.stringToCloudFormation(properties.description),
        DesiredEC2Instances: cdk.numberToCloudFormation(properties.desiredEc2Instances),
        EC2InboundPermissions: cdk.listMapper(cfnFleetIpPermissionPropertyToCloudFormation)(properties.ec2InboundPermissions),
        EC2InstanceType: cdk.stringToCloudFormation(properties.ec2InstanceType),
        FleetType: cdk.stringToCloudFormation(properties.fleetType),
        InstanceRoleARN: cdk.stringToCloudFormation(properties.instanceRoleArn),
        Locations: cdk.listMapper(cfnFleetLocationConfigurationPropertyToCloudFormation)(properties.locations),
        MaxSize: cdk.numberToCloudFormation(properties.maxSize),
        MetricGroups: cdk.listMapper(cdk.stringToCloudFormation)(properties.metricGroups),
        MinSize: cdk.numberToCloudFormation(properties.minSize),
        Name: cdk.stringToCloudFormation(properties.name),
        NewGameSessionProtectionPolicy: cdk.stringToCloudFormation(properties.newGameSessionProtectionPolicy),
        PeerVpcAwsAccountId: cdk.stringToCloudFormation(properties.peerVpcAwsAccountId),
        PeerVpcId: cdk.stringToCloudFormation(properties.peerVpcId),
        ResourceCreationLimitPolicy: cfnFleetResourceCreationLimitPolicyPropertyToCloudFormation(properties.resourceCreationLimitPolicy),
        RuntimeConfiguration: cfnFleetRuntimeConfigurationPropertyToCloudFormation(properties.runtimeConfiguration),
        ScriptId: cdk.stringToCloudFormation(properties.scriptId),
    };
}

// @ts-ignore TS6133
function CfnFleetPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleetProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleetProps>();
    ret.addPropertyResult('buildId', 'BuildId', properties.BuildId != null ? cfn_parse.FromCloudFormation.getString(properties.BuildId) : undefined);
    ret.addPropertyResult('certificateConfiguration', 'CertificateConfiguration', properties.CertificateConfiguration != null ? CfnFleetCertificateConfigurationPropertyFromCloudFormation(properties.CertificateConfiguration) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('desiredEc2Instances', 'DesiredEC2Instances', properties.DesiredEC2Instances != null ? cfn_parse.FromCloudFormation.getNumber(properties.DesiredEC2Instances) : undefined);
    ret.addPropertyResult('ec2InboundPermissions', 'EC2InboundPermissions', properties.EC2InboundPermissions != null ? cfn_parse.FromCloudFormation.getArray(CfnFleetIpPermissionPropertyFromCloudFormation)(properties.EC2InboundPermissions) : undefined);
    ret.addPropertyResult('ec2InstanceType', 'EC2InstanceType', properties.EC2InstanceType != null ? cfn_parse.FromCloudFormation.getString(properties.EC2InstanceType) : undefined);
    ret.addPropertyResult('fleetType', 'FleetType', properties.FleetType != null ? cfn_parse.FromCloudFormation.getString(properties.FleetType) : undefined);
    ret.addPropertyResult('instanceRoleArn', 'InstanceRoleARN', properties.InstanceRoleARN != null ? cfn_parse.FromCloudFormation.getString(properties.InstanceRoleARN) : undefined);
    ret.addPropertyResult('locations', 'Locations', properties.Locations != null ? cfn_parse.FromCloudFormation.getArray(CfnFleetLocationConfigurationPropertyFromCloudFormation)(properties.Locations) : undefined);
    ret.addPropertyResult('maxSize', 'MaxSize', properties.MaxSize != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxSize) : undefined);
    ret.addPropertyResult('metricGroups', 'MetricGroups', properties.MetricGroups != null ? cfn_parse.FromCloudFormation.getStringArray(properties.MetricGroups) : undefined);
    ret.addPropertyResult('minSize', 'MinSize', properties.MinSize != null ? cfn_parse.FromCloudFormation.getNumber(properties.MinSize) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('newGameSessionProtectionPolicy', 'NewGameSessionProtectionPolicy', properties.NewGameSessionProtectionPolicy != null ? cfn_parse.FromCloudFormation.getString(properties.NewGameSessionProtectionPolicy) : undefined);
    ret.addPropertyResult('peerVpcAwsAccountId', 'PeerVpcAwsAccountId', properties.PeerVpcAwsAccountId != null ? cfn_parse.FromCloudFormation.getString(properties.PeerVpcAwsAccountId) : undefined);
    ret.addPropertyResult('peerVpcId', 'PeerVpcId', properties.PeerVpcId != null ? cfn_parse.FromCloudFormation.getString(properties.PeerVpcId) : undefined);
    ret.addPropertyResult('resourceCreationLimitPolicy', 'ResourceCreationLimitPolicy', properties.ResourceCreationLimitPolicy != null ? CfnFleetResourceCreationLimitPolicyPropertyFromCloudFormation(properties.ResourceCreationLimitPolicy) : undefined);
    ret.addPropertyResult('runtimeConfiguration', 'RuntimeConfiguration', properties.RuntimeConfiguration != null ? CfnFleetRuntimeConfigurationPropertyFromCloudFormation(properties.RuntimeConfiguration) : undefined);
    ret.addPropertyResult('scriptId', 'ScriptId', properties.ScriptId != null ? cfn_parse.FromCloudFormation.getString(properties.ScriptId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GameLift::Fleet`
 *
 * The `AWS::GameLift::Fleet` resource creates an Amazon GameLift (GameLift) fleet to host game servers. A fleet is a set of EC2 instances, each of which can host multiple game sessions.
 *
 * @cloudformationResource AWS::GameLift::Fleet
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html
 */
export class CfnFleet extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GameLift::Fleet";

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
     * A unique identifier for the fleet.
     * @cloudformationAttribute FleetId
     */
    public readonly attrFleetId: string;

    /**
     * A unique identifier for a build to be deployed on the new fleet. If you are deploying the fleet with a custom game build, you must specify this property. The build must have been successfully uploaded to Amazon GameLift and be in a `READY` status. This fleet setting cannot be changed once the fleet is created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-buildid
     */
    public buildId: string | undefined;

    /**
     * Prompts GameLift to generate a TLS/SSL certificate for the fleet. TLS certificates are used for encrypting traffic between game clients and the game servers that are running on GameLift. By default, the `CertificateConfiguration` is set to `DISABLED` . This property cannot be changed after the fleet is created.
     *
     * Note: This feature requires the AWS Certificate Manager (ACM) service, which is not available in all AWS regions. When working in a region that does not support this feature, a fleet creation request with certificate generation fails with a 4xx error.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-certificateconfiguration
     */
    public certificateConfiguration: CfnFleet.CertificateConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * A human-readable description of the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-description
     */
    public description: string | undefined;

    /**
     * The number of EC2 instances that you want this fleet to host. When creating a new fleet, GameLift automatically sets this value to "1" and initiates a single instance. Once the fleet is active, update this value to trigger GameLift to add or remove instances from the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-desiredec2instances
     */
    public desiredEc2Instances: number | undefined;

    /**
     * The allowed IP address ranges and port settings that allow inbound traffic to access game sessions on this fleet. If the fleet is hosting a custom game build, this property must be set before players can connect to game sessions. For Realtime Servers fleets, GameLift automatically sets TCP and UDP ranges.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-ec2inboundpermissions
     */
    public ec2InboundPermissions: Array<CfnFleet.IpPermissionProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The GameLift-supported Amazon EC2 instance type to use for all fleet instances. Instance type determines the computing resources that will be used to host your game servers, including CPU, memory, storage, and networking capacity. See [Amazon Elastic Compute Cloud Instance Types](https://docs.aws.amazon.com/ec2/instance-types/) for detailed descriptions of Amazon EC2 instance types.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-ec2instancetype
     */
    public ec2InstanceType: string | undefined;

    /**
     * Indicates whether to use On-Demand or Spot instances for this fleet. By default, this property is set to `ON_DEMAND` . Learn more about when to use [On-Demand versus Spot Instances](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-ec2-instances.html#gamelift-ec2-instances-spot) . This property cannot be changed after the fleet is created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-fleettype
     */
    public fleetType: string | undefined;

    /**
     * A unique identifier for an IAM role that manages access to your AWS services. With an instance role ARN set, any application that runs on an instance in this fleet can assume the role, including install scripts, server processes, and daemons (background processes). Create a role or look up a role's ARN by using the [IAM dashboard](https://docs.aws.amazon.com/iam/) in the AWS Management Console . Learn more about using on-box credentials for your game servers at [Access external resources from a game server](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-sdk-server-resources.html) . This property cannot be changed after the fleet is created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-instancerolearn
     */
    public instanceRoleArn: string | undefined;

    /**
     * A set of remote locations to deploy additional instances to and manage as part of the fleet. This parameter can only be used when creating fleets in AWS Regions that support multiple locations. You can add any GameLift-supported AWS Region as a remote location, in the form of an AWS Region code such as `us-west-2` . To create a fleet with instances in the home Region only, omit this parameter.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-locations
     */
    public locations: Array<CfnFleet.LocationConfigurationProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The maximum number of instances that are allowed in the specified fleet location. If this parameter is not set, the default is 1.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-maxsize
     */
    public maxSize: number | undefined;

    /**
     * The name of an AWS CloudWatch metric group to add this fleet to. A metric group is used to aggregate the metrics for multiple fleets. You can specify an existing metric group name or set a new name to create a new metric group. A fleet can be included in only one metric group at a time.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-metricgroups
     */
    public metricGroups: string[] | undefined;

    /**
     * The minimum number of instances that are allowed in the specified fleet location. If this parameter is not set, the default is 0.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-minsize
     */
    public minSize: number | undefined;

    /**
     * A descriptive label that is associated with a fleet. Fleet names do not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-name
     */
    public name: string | undefined;

    /**
     * The status of termination protection for active game sessions on the fleet. By default, this property is set to `NoProtection` .
     *
     * - *NoProtection* - Game sessions can be terminated during active gameplay as a result of a scale-down event.
     * - *FullProtection* - Game sessions in `ACTIVE` status cannot be terminated during a scale-down event.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-newgamesessionprotectionpolicy
     */
    public newGameSessionProtectionPolicy: string | undefined;

    /**
     * Used when peering your GameLift fleet with a VPC, the unique identifier for the AWS account that owns the VPC. You can find your account ID in the AWS Management Console under account settings.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-peervpcawsaccountid
     */
    public peerVpcAwsAccountId: string | undefined;

    /**
     * A unique identifier for a VPC with resources to be accessed by your GameLift fleet. The VPC must be in the same Region as your fleet. To look up a VPC ID, use the [VPC Dashboard](https://docs.aws.amazon.com/vpc/) in the AWS Management Console . Learn more about VPC peering in [VPC Peering with GameLift Fleets](https://docs.aws.amazon.com/gamelift/latest/developerguide/vpc-peering.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-peervpcid
     */
    public peerVpcId: string | undefined;

    /**
     * A policy that limits the number of game sessions that an individual player can create on instances in this fleet within a specified span of time.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-resourcecreationlimitpolicy
     */
    public resourceCreationLimitPolicy: CfnFleet.ResourceCreationLimitPolicyProperty | cdk.IResolvable | undefined;

    /**
     * Instructions for how to launch and maintain server processes on instances in the fleet. The runtime configuration defines one or more server process configurations, each identifying a build executable or Realtime script file and the number of processes of that type to run concurrently.
     *
     * > The `RuntimeConfiguration` parameter is required unless the fleet is being configured using the older parameters `ServerLaunchPath` and `ServerLaunchParameters` , which are still supported for backward compatibility.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-runtimeconfiguration
     */
    public runtimeConfiguration: CfnFleet.RuntimeConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * The unique identifier for a Realtime configuration script to be deployed on fleet instances. You can use either the script ID or ARN. Scripts must be uploaded to GameLift prior to creating the fleet. This fleet property cannot be changed later.
     *
     * > You can't use the `!Ref` command to reference a script created with a CloudFormation template for the fleet property `ScriptId` . Instead, use `Fn::GetAtt Script.Arn` or `Fn::GetAtt Script.Id` to retrieve either of these properties as input for `ScriptId` . Alternatively, enter a `ScriptId` string manually.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html#cfn-gamelift-fleet-scriptid
     */
    public scriptId: string | undefined;

    /**
     * Create a new `AWS::GameLift::Fleet`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnFleetProps = {}) {
        super(scope, id, { type: CfnFleet.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrFleetId = cdk.Token.asString(this.getAtt('FleetId'));

        this.buildId = props.buildId;
        this.certificateConfiguration = props.certificateConfiguration;
        this.description = props.description;
        this.desiredEc2Instances = props.desiredEc2Instances;
        this.ec2InboundPermissions = props.ec2InboundPermissions;
        this.ec2InstanceType = props.ec2InstanceType;
        this.fleetType = props.fleetType;
        this.instanceRoleArn = props.instanceRoleArn;
        this.locations = props.locations;
        this.maxSize = props.maxSize;
        this.metricGroups = props.metricGroups;
        this.minSize = props.minSize;
        this.name = props.name;
        this.newGameSessionProtectionPolicy = props.newGameSessionProtectionPolicy;
        this.peerVpcAwsAccountId = props.peerVpcAwsAccountId;
        this.peerVpcId = props.peerVpcId;
        this.resourceCreationLimitPolicy = props.resourceCreationLimitPolicy;
        this.runtimeConfiguration = props.runtimeConfiguration;
        this.scriptId = props.scriptId;
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
            buildId: this.buildId,
            certificateConfiguration: this.certificateConfiguration,
            description: this.description,
            desiredEc2Instances: this.desiredEc2Instances,
            ec2InboundPermissions: this.ec2InboundPermissions,
            ec2InstanceType: this.ec2InstanceType,
            fleetType: this.fleetType,
            instanceRoleArn: this.instanceRoleArn,
            locations: this.locations,
            maxSize: this.maxSize,
            metricGroups: this.metricGroups,
            minSize: this.minSize,
            name: this.name,
            newGameSessionProtectionPolicy: this.newGameSessionProtectionPolicy,
            peerVpcAwsAccountId: this.peerVpcAwsAccountId,
            peerVpcId: this.peerVpcId,
            resourceCreationLimitPolicy: this.resourceCreationLimitPolicy,
            runtimeConfiguration: this.runtimeConfiguration,
            scriptId: this.scriptId,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnFleetPropsToCloudFormation(props);
    }
}

export namespace CfnFleet {
    /**
     * Determines whether a TLS/SSL certificate is generated for a fleet. This feature must be enabled when creating the fleet. All instances in a fleet share the same certificate. The certificate can be retrieved by calling the [GameLift Server SDK](https://docs.aws.amazon.com/gamelift/latest/developerguide/reference-serversdk.html) operation `GetInstanceCertificate` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-certificateconfiguration.html
     */
    export interface CertificateConfigurationProperty {
        /**
         * Indicates whether a TLS/SSL certificate is generated for a fleet.
         *
         * Valid values include:
         *
         * - *GENERATED* - Generate a TLS/SSL certificate for this fleet.
         * - *DISABLED* - (default) Do not generate a TLS/SSL certificate for this fleet.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-certificateconfiguration.html#cfn-gamelift-fleet-certificateconfiguration-certificatetype
         */
        readonly certificateType: string;
    }
}

/**
 * Determine whether the given properties match those of a `CertificateConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `CertificateConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnFleet_CertificateConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('certificateType', cdk.requiredValidator)(properties.certificateType));
    errors.collect(cdk.propertyValidator('certificateType', cdk.validateString)(properties.certificateType));
    return errors.wrap('supplied properties not correct for "CertificateConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::Fleet.CertificateConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CertificateConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::Fleet.CertificateConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnFleetCertificateConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleet_CertificateConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CertificateType: cdk.stringToCloudFormation(properties.certificateType),
    };
}

// @ts-ignore TS6133
function CfnFleetCertificateConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleet.CertificateConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleet.CertificateConfigurationProperty>();
    ret.addPropertyResult('certificateType', 'CertificateType', cfn_parse.FromCloudFormation.getString(properties.CertificateType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFleet {
    /**
     * A range of IP addresses and port settings that allow inbound traffic to connect to server processes on an instance in a fleet. New game sessions are assigned an IP address/port number combination, which must fall into the fleet's allowed ranges. Fleets with custom game builds must have permissions explicitly set. For Realtime Servers fleets, GameLift automatically opens two port ranges, one for TCP messaging and one for UDP.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-ippermission.html
     */
    export interface IpPermissionProperty {
        /**
         * A starting value for a range of allowed port numbers.
         *
         * For fleets using Windows and Linux builds, only ports 1026-60000 are valid.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-ippermission.html#cfn-gamelift-fleet-ippermission-fromport
         */
        readonly fromPort: number;
        /**
         * A range of allowed IP addresses. This value must be expressed in CIDR notation. Example: " `000.000.000.000/[subnet mask]` " or optionally the shortened version " `0.0.0.0/[subnet mask]` ".
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-ippermission.html#cfn-gamelift-fleet-ippermission-iprange
         */
        readonly ipRange: string;
        /**
         * The network communication protocol used by the fleet.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-ippermission.html#cfn-gamelift-fleet-ippermission-protocol
         */
        readonly protocol: string;
        /**
         * An ending value for a range of allowed port numbers. Port numbers are end-inclusive. This value must be higher than `FromPort` .
         *
         * For fleets using Windows and Linux builds, only ports 1026-60000 are valid.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-ippermission.html#cfn-gamelift-fleet-ippermission-toport
         */
        readonly toPort: number;
    }
}

/**
 * Determine whether the given properties match those of a `IpPermissionProperty`
 *
 * @param properties - the TypeScript properties of a `IpPermissionProperty`
 *
 * @returns the result of the validation.
 */
function CfnFleet_IpPermissionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('fromPort', cdk.requiredValidator)(properties.fromPort));
    errors.collect(cdk.propertyValidator('fromPort', cdk.validateNumber)(properties.fromPort));
    errors.collect(cdk.propertyValidator('ipRange', cdk.requiredValidator)(properties.ipRange));
    errors.collect(cdk.propertyValidator('ipRange', cdk.validateString)(properties.ipRange));
    errors.collect(cdk.propertyValidator('protocol', cdk.requiredValidator)(properties.protocol));
    errors.collect(cdk.propertyValidator('protocol', cdk.validateString)(properties.protocol));
    errors.collect(cdk.propertyValidator('toPort', cdk.requiredValidator)(properties.toPort));
    errors.collect(cdk.propertyValidator('toPort', cdk.validateNumber)(properties.toPort));
    return errors.wrap('supplied properties not correct for "IpPermissionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::Fleet.IpPermission` resource
 *
 * @param properties - the TypeScript properties of a `IpPermissionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::Fleet.IpPermission` resource.
 */
// @ts-ignore TS6133
function cfnFleetIpPermissionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleet_IpPermissionPropertyValidator(properties).assertSuccess();
    return {
        FromPort: cdk.numberToCloudFormation(properties.fromPort),
        IpRange: cdk.stringToCloudFormation(properties.ipRange),
        Protocol: cdk.stringToCloudFormation(properties.protocol),
        ToPort: cdk.numberToCloudFormation(properties.toPort),
    };
}

// @ts-ignore TS6133
function CfnFleetIpPermissionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleet.IpPermissionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleet.IpPermissionProperty>();
    ret.addPropertyResult('fromPort', 'FromPort', cfn_parse.FromCloudFormation.getNumber(properties.FromPort));
    ret.addPropertyResult('ipRange', 'IpRange', cfn_parse.FromCloudFormation.getString(properties.IpRange));
    ret.addPropertyResult('protocol', 'Protocol', cfn_parse.FromCloudFormation.getString(properties.Protocol));
    ret.addPropertyResult('toPort', 'ToPort', cfn_parse.FromCloudFormation.getNumber(properties.ToPort));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFleet {
    /**
     * Current resource capacity settings in a specified fleet or location. The location value might refer to a fleet's remote location or its home Region.
     *
     * *Related actions*
     *
     * [DescribeFleetCapacity](https://docs.aws.amazon.com/gamelift/latest/apireference/API_DescribeFleetCapacity.html) | [DescribeFleetLocationCapacity](https://docs.aws.amazon.com/gamelift/latest/apireference/API_DescribeFleetLocationCapacity.html) | [UpdateFleetCapacity](https://docs.aws.amazon.com/gamelift/latest/apireference/API_UpdateFleetCapacity.html)
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-locationcapacity.html
     */
    export interface LocationCapacityProperty {
        /**
         * The number of Amazon EC2 instances you want to maintain in the specified fleet location. This value must fall between the minimum and maximum size limits.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-locationcapacity.html#cfn-gamelift-fleet-locationcapacity-desiredec2instances
         */
        readonly desiredEc2Instances: number;
        /**
         * The maximum number of instances that are allowed in the specified fleet location. If this parameter is not set, the default is 1.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-locationcapacity.html#cfn-gamelift-fleet-locationcapacity-maxsize
         */
        readonly maxSize: number;
        /**
         * The minimum number of instances that are allowed in the specified fleet location. If this parameter is not set, the default is 0.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-locationcapacity.html#cfn-gamelift-fleet-locationcapacity-minsize
         */
        readonly minSize: number;
    }
}

/**
 * Determine whether the given properties match those of a `LocationCapacityProperty`
 *
 * @param properties - the TypeScript properties of a `LocationCapacityProperty`
 *
 * @returns the result of the validation.
 */
function CfnFleet_LocationCapacityPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('desiredEc2Instances', cdk.requiredValidator)(properties.desiredEc2Instances));
    errors.collect(cdk.propertyValidator('desiredEc2Instances', cdk.validateNumber)(properties.desiredEc2Instances));
    errors.collect(cdk.propertyValidator('maxSize', cdk.requiredValidator)(properties.maxSize));
    errors.collect(cdk.propertyValidator('maxSize', cdk.validateNumber)(properties.maxSize));
    errors.collect(cdk.propertyValidator('minSize', cdk.requiredValidator)(properties.minSize));
    errors.collect(cdk.propertyValidator('minSize', cdk.validateNumber)(properties.minSize));
    return errors.wrap('supplied properties not correct for "LocationCapacityProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::Fleet.LocationCapacity` resource
 *
 * @param properties - the TypeScript properties of a `LocationCapacityProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::Fleet.LocationCapacity` resource.
 */
// @ts-ignore TS6133
function cfnFleetLocationCapacityPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleet_LocationCapacityPropertyValidator(properties).assertSuccess();
    return {
        DesiredEC2Instances: cdk.numberToCloudFormation(properties.desiredEc2Instances),
        MaxSize: cdk.numberToCloudFormation(properties.maxSize),
        MinSize: cdk.numberToCloudFormation(properties.minSize),
    };
}

// @ts-ignore TS6133
function CfnFleetLocationCapacityPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleet.LocationCapacityProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleet.LocationCapacityProperty>();
    ret.addPropertyResult('desiredEc2Instances', 'DesiredEC2Instances', cfn_parse.FromCloudFormation.getNumber(properties.DesiredEC2Instances));
    ret.addPropertyResult('maxSize', 'MaxSize', cfn_parse.FromCloudFormation.getNumber(properties.MaxSize));
    ret.addPropertyResult('minSize', 'MinSize', cfn_parse.FromCloudFormation.getNumber(properties.MinSize));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFleet {
    /**
     * A remote location where a multi-location fleet can deploy EC2 instances for game hosting.
     *
     * *Related actions*
     *
     * [CreateFleet](https://docs.aws.amazon.com/gamelift/latest/apireference/API_CreateFleet.html)
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-locationconfiguration.html
     */
    export interface LocationConfigurationProperty {
        /**
         * An AWS Region code, such as `us-west-2` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-locationconfiguration.html#cfn-gamelift-fleet-locationconfiguration-location
         */
        readonly location: string;
        /**
         * Current resource capacity settings in a specified fleet or location. The location value might refer to a fleet's remote location or its home Region.
         *
         * *Related actions*
         *
         * [DescribeFleetCapacity](https://docs.aws.amazon.com/gamelift/latest/apireference/API_DescribeFleetCapacity.html) | [DescribeFleetLocationCapacity](https://docs.aws.amazon.com/gamelift/latest/apireference/API_DescribeFleetLocationCapacity.html) | [UpdateFleetCapacity](https://docs.aws.amazon.com/gamelift/latest/apireference/API_UpdateFleetCapacity.html)
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-locationconfiguration.html#cfn-gamelift-fleet-locationconfiguration-locationcapacity
         */
        readonly locationCapacity?: CfnFleet.LocationCapacityProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `LocationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `LocationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnFleet_LocationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('location', cdk.requiredValidator)(properties.location));
    errors.collect(cdk.propertyValidator('location', cdk.validateString)(properties.location));
    errors.collect(cdk.propertyValidator('locationCapacity', CfnFleet_LocationCapacityPropertyValidator)(properties.locationCapacity));
    return errors.wrap('supplied properties not correct for "LocationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::Fleet.LocationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `LocationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::Fleet.LocationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnFleetLocationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleet_LocationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Location: cdk.stringToCloudFormation(properties.location),
        LocationCapacity: cfnFleetLocationCapacityPropertyToCloudFormation(properties.locationCapacity),
    };
}

// @ts-ignore TS6133
function CfnFleetLocationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleet.LocationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleet.LocationConfigurationProperty>();
    ret.addPropertyResult('location', 'Location', cfn_parse.FromCloudFormation.getString(properties.Location));
    ret.addPropertyResult('locationCapacity', 'LocationCapacity', properties.LocationCapacity != null ? CfnFleetLocationCapacityPropertyFromCloudFormation(properties.LocationCapacity) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFleet {
    /**
     * A policy that limits the number of game sessions a player can create on the same fleet. This optional policy gives game owners control over how players can consume available game server resources. A resource creation policy makes the following statement: "An individual player can create a maximum number of new game sessions within a specified time period".
     *
     * The policy is evaluated when a player tries to create a new game session. For example, assume you have a policy of 10 new game sessions and a time period of 60 minutes. On receiving a `CreateGameSession` request, Amazon GameLift checks that the player (identified by `CreatorId` ) has created fewer than 10 game sessions in the past 60 minutes.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-resourcecreationlimitpolicy.html
     */
    export interface ResourceCreationLimitPolicyProperty {
        /**
         * The maximum number of game sessions that an individual can create during the policy period.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-resourcecreationlimitpolicy.html#cfn-gamelift-fleet-resourcecreationlimitpolicy-newgamesessionspercreator
         */
        readonly newGameSessionsPerCreator?: number;
        /**
         * The time span used in evaluating the resource creation limit policy.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-resourcecreationlimitpolicy.html#cfn-gamelift-fleet-resourcecreationlimitpolicy-policyperiodinminutes
         */
        readonly policyPeriodInMinutes?: number;
    }
}

/**
 * Determine whether the given properties match those of a `ResourceCreationLimitPolicyProperty`
 *
 * @param properties - the TypeScript properties of a `ResourceCreationLimitPolicyProperty`
 *
 * @returns the result of the validation.
 */
function CfnFleet_ResourceCreationLimitPolicyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('newGameSessionsPerCreator', cdk.validateNumber)(properties.newGameSessionsPerCreator));
    errors.collect(cdk.propertyValidator('policyPeriodInMinutes', cdk.validateNumber)(properties.policyPeriodInMinutes));
    return errors.wrap('supplied properties not correct for "ResourceCreationLimitPolicyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::Fleet.ResourceCreationLimitPolicy` resource
 *
 * @param properties - the TypeScript properties of a `ResourceCreationLimitPolicyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::Fleet.ResourceCreationLimitPolicy` resource.
 */
// @ts-ignore TS6133
function cfnFleetResourceCreationLimitPolicyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleet_ResourceCreationLimitPolicyPropertyValidator(properties).assertSuccess();
    return {
        NewGameSessionsPerCreator: cdk.numberToCloudFormation(properties.newGameSessionsPerCreator),
        PolicyPeriodInMinutes: cdk.numberToCloudFormation(properties.policyPeriodInMinutes),
    };
}

// @ts-ignore TS6133
function CfnFleetResourceCreationLimitPolicyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleet.ResourceCreationLimitPolicyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleet.ResourceCreationLimitPolicyProperty>();
    ret.addPropertyResult('newGameSessionsPerCreator', 'NewGameSessionsPerCreator', properties.NewGameSessionsPerCreator != null ? cfn_parse.FromCloudFormation.getNumber(properties.NewGameSessionsPerCreator) : undefined);
    ret.addPropertyResult('policyPeriodInMinutes', 'PolicyPeriodInMinutes', properties.PolicyPeriodInMinutes != null ? cfn_parse.FromCloudFormation.getNumber(properties.PolicyPeriodInMinutes) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFleet {
    /**
     * A collection of server process configurations that describe the set of processes to run on each instance in a fleet. Server processes run either an executable in a custom game build or a Realtime Servers script. GameLift launches the configured processes, manages their life cycle, and replaces them as needed. Each instance checks regularly for an updated runtime configuration.
     *
     * A GameLift instance is limited to 50 processes running concurrently. To calculate the total number of processes in a runtime configuration, add the values of the `ConcurrentExecutions` parameter for each ServerProcess. Learn more about [Running Multiple Processes on a Fleet](https://docs.aws.amazon.com/gamelift/latest/developerguide/fleets-multiprocess.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-runtimeconfiguration.html
     */
    export interface RuntimeConfigurationProperty {
        /**
         * The maximum amount of time (in seconds) allowed to launch a new game session and have it report ready to host players. During this time, the game session is in status `ACTIVATING` . If the game session does not become active before the timeout, it is ended and the game session status is changed to `TERMINATED` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-runtimeconfiguration.html#cfn-gamelift-fleet-runtimeconfiguration-gamesessionactivationtimeoutseconds
         */
        readonly gameSessionActivationTimeoutSeconds?: number;
        /**
         * The number of game sessions in status `ACTIVATING` to allow on an instance. This setting limits the instance resources that can be used for new game activations at any one time.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-runtimeconfiguration.html#cfn-gamelift-fleet-runtimeconfiguration-maxconcurrentgamesessionactivations
         */
        readonly maxConcurrentGameSessionActivations?: number;
        /**
         * A collection of server process configurations that identify what server processes to run on each instance in a fleet.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-runtimeconfiguration.html#cfn-gamelift-fleet-runtimeconfiguration-serverprocesses
         */
        readonly serverProcesses?: Array<CfnFleet.ServerProcessProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `RuntimeConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `RuntimeConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnFleet_RuntimeConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('gameSessionActivationTimeoutSeconds', cdk.validateNumber)(properties.gameSessionActivationTimeoutSeconds));
    errors.collect(cdk.propertyValidator('maxConcurrentGameSessionActivations', cdk.validateNumber)(properties.maxConcurrentGameSessionActivations));
    errors.collect(cdk.propertyValidator('serverProcesses', cdk.listValidator(CfnFleet_ServerProcessPropertyValidator))(properties.serverProcesses));
    return errors.wrap('supplied properties not correct for "RuntimeConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::Fleet.RuntimeConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `RuntimeConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::Fleet.RuntimeConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnFleetRuntimeConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleet_RuntimeConfigurationPropertyValidator(properties).assertSuccess();
    return {
        GameSessionActivationTimeoutSeconds: cdk.numberToCloudFormation(properties.gameSessionActivationTimeoutSeconds),
        MaxConcurrentGameSessionActivations: cdk.numberToCloudFormation(properties.maxConcurrentGameSessionActivations),
        ServerProcesses: cdk.listMapper(cfnFleetServerProcessPropertyToCloudFormation)(properties.serverProcesses),
    };
}

// @ts-ignore TS6133
function CfnFleetRuntimeConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleet.RuntimeConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleet.RuntimeConfigurationProperty>();
    ret.addPropertyResult('gameSessionActivationTimeoutSeconds', 'GameSessionActivationTimeoutSeconds', properties.GameSessionActivationTimeoutSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.GameSessionActivationTimeoutSeconds) : undefined);
    ret.addPropertyResult('maxConcurrentGameSessionActivations', 'MaxConcurrentGameSessionActivations', properties.MaxConcurrentGameSessionActivations != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxConcurrentGameSessionActivations) : undefined);
    ret.addPropertyResult('serverProcesses', 'ServerProcesses', properties.ServerProcesses != null ? cfn_parse.FromCloudFormation.getArray(CfnFleetServerProcessPropertyFromCloudFormation)(properties.ServerProcesses) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFleet {
    /**
     * A set of instructions for launching server processes on each instance in a fleet. Server processes run either an executable in a custom game build or a Realtime Servers script.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-serverprocess.html
     */
    export interface ServerProcessProperty {
        /**
         * The number of server processes using this configuration that run concurrently on each instance.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-serverprocess.html#cfn-gamelift-fleet-serverprocess-concurrentexecutions
         */
        readonly concurrentExecutions: number;
        /**
         * The location of a game build executable or the Realtime script file that contains the `Init()` function. Game builds and Realtime scripts are installed on instances at the root:
         *
         * - Windows (custom game builds only): `C:\game` . Example: " `C:\game\MyGame\server.exe` "
         * - Linux: `/local/game` . Examples: " `/local/game/MyGame/server.exe` " or " `/local/game/MyRealtimeScript.js` "
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-serverprocess.html#cfn-gamelift-fleet-serverprocess-launchpath
         */
        readonly launchPath: string;
        /**
         * An optional list of parameters to pass to the server executable or Realtime script on launch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-fleet-serverprocess.html#cfn-gamelift-fleet-serverprocess-parameters
         */
        readonly parameters?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ServerProcessProperty`
 *
 * @param properties - the TypeScript properties of a `ServerProcessProperty`
 *
 * @returns the result of the validation.
 */
function CfnFleet_ServerProcessPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('concurrentExecutions', cdk.requiredValidator)(properties.concurrentExecutions));
    errors.collect(cdk.propertyValidator('concurrentExecutions', cdk.validateNumber)(properties.concurrentExecutions));
    errors.collect(cdk.propertyValidator('launchPath', cdk.requiredValidator)(properties.launchPath));
    errors.collect(cdk.propertyValidator('launchPath', cdk.validateString)(properties.launchPath));
    errors.collect(cdk.propertyValidator('parameters', cdk.validateString)(properties.parameters));
    return errors.wrap('supplied properties not correct for "ServerProcessProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::Fleet.ServerProcess` resource
 *
 * @param properties - the TypeScript properties of a `ServerProcessProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::Fleet.ServerProcess` resource.
 */
// @ts-ignore TS6133
function cfnFleetServerProcessPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleet_ServerProcessPropertyValidator(properties).assertSuccess();
    return {
        ConcurrentExecutions: cdk.numberToCloudFormation(properties.concurrentExecutions),
        LaunchPath: cdk.stringToCloudFormation(properties.launchPath),
        Parameters: cdk.stringToCloudFormation(properties.parameters),
    };
}

// @ts-ignore TS6133
function CfnFleetServerProcessPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleet.ServerProcessProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleet.ServerProcessProperty>();
    ret.addPropertyResult('concurrentExecutions', 'ConcurrentExecutions', cfn_parse.FromCloudFormation.getNumber(properties.ConcurrentExecutions));
    ret.addPropertyResult('launchPath', 'LaunchPath', cfn_parse.FromCloudFormation.getString(properties.LaunchPath));
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? cfn_parse.FromCloudFormation.getString(properties.Parameters) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnGameServerGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html
 */
export interface CfnGameServerGroupProps {

    /**
     * A developer-defined identifier for the game server group. The name is unique for each Region in each AWS account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-gameservergroupname
     */
    readonly gameServerGroupName: string;

    /**
     * The set of Amazon EC2 instance types that GameLift FleetIQ can use when balancing and automatically scaling instances in the corresponding Auto Scaling group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-instancedefinitions
     */
    readonly instanceDefinitions: Array<CfnGameServerGroup.InstanceDefinitionProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The Amazon EC2 launch template that contains configuration settings and game server code to be deployed to all instances in the game server group. You can specify the template using either the template name or ID. For help with creating a launch template, see [Creating a Launch Template for an Auto Scaling Group](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-launch-template.html) in the *Amazon Elastic Compute Cloud Auto Scaling User Guide* . After the Auto Scaling group is created, update this value directly in the Auto Scaling group using the AWS console or APIs.
     *
     * > If you specify network interfaces in your launch template, you must explicitly set the property `AssociatePublicIpAddress` to "true". If no network interface is specified in the launch template, GameLift FleetIQ uses your account's default VPC.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-launchtemplate
     */
    readonly launchTemplate: CfnGameServerGroup.LaunchTemplateProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name ( [ARN](https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-arn-format.html) ) for an IAM role that allows Amazon GameLift to access your Amazon EC2 Auto Scaling groups.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-rolearn
     */
    readonly roleArn: string;

    /**
     * Configuration settings to define a scaling policy for the Auto Scaling group that is optimized for game hosting. The scaling policy uses the metric `"PercentUtilizedGameServers"` to maintain a buffer of idle game servers that can immediately accommodate new games and players. After the Auto Scaling group is created, update this value directly in the Auto Scaling group using the AWS console or APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-autoscalingpolicy
     */
    readonly autoScalingPolicy?: CfnGameServerGroup.AutoScalingPolicyProperty | cdk.IResolvable;

    /**
     * Indicates how GameLift FleetIQ balances the use of Spot Instances and On-Demand Instances in the game server group. Method options include the following:
     *
     * - `SPOT_ONLY` - Only Spot Instances are used in the game server group. If Spot Instances are unavailable or not viable for game hosting, the game server group provides no hosting capacity until Spot Instances can again be used. Until then, no new instances are started, and the existing nonviable Spot Instances are terminated (after current gameplay ends) and are not replaced.
     * - `SPOT_PREFERRED` - (default value) Spot Instances are used whenever available in the game server group. If Spot Instances are unavailable, the game server group continues to provide hosting capacity by falling back to On-Demand Instances. Existing nonviable Spot Instances are terminated (after current gameplay ends) and are replaced with new On-Demand Instances.
     * - `ON_DEMAND_ONLY` - Only On-Demand Instances are used in the game server group. No Spot Instances are used, even when available, while this balancing strategy is in force.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-balancingstrategy
     */
    readonly balancingStrategy?: string;

    /**
     * The type of delete to perform. To delete a game server group, specify the `DeleteOption` . Options include the following:
     *
     * - `SAFE_DELETE` – (default) Terminates the game server group and Amazon EC2 Auto Scaling group only when it has no game servers that are in `UTILIZED` status.
     * - `FORCE_DELETE` – Terminates the game server group, including all active game servers regardless of their utilization status, and the Amazon EC2 Auto Scaling group.
     * - `RETAIN` – Does a safe delete of the game server group but retains the Amazon EC2 Auto Scaling group as is.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-deleteoption
     */
    readonly deleteOption?: string;

    /**
     * A flag that indicates whether instances in the game server group are protected from early termination. Unprotected instances that have active game servers running might be terminated during a scale-down event, causing players to be dropped from the game. Protected instances cannot be terminated while there are active game servers running except in the event of a forced game server group deletion (see ). An exception to this is with Spot Instances, which can be terminated by AWS regardless of protection status.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-gameserverprotectionpolicy
     */
    readonly gameServerProtectionPolicy?: string;

    /**
     * The maximum number of instances allowed in the Amazon EC2 Auto Scaling group. During automatic scaling events, GameLift FleetIQ and EC2 do not scale up the group above this maximum. After the Auto Scaling group is created, update this value directly in the Auto Scaling group using the AWS console or APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-maxsize
     */
    readonly maxSize?: number;

    /**
     * The minimum number of instances allowed in the Amazon EC2 Auto Scaling group. During automatic scaling events, GameLift FleetIQ and Amazon EC2 do not scale down the group below this minimum. In production, this value should be set to at least 1. After the Auto Scaling group is created, update this value directly in the Auto Scaling group using the AWS console or APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-minsize
     */
    readonly minSize?: number;

    /**
     * A list of labels to assign to the new game server group resource. Tags are developer-defined key-value pairs. Tagging AWS resources is useful for resource management, access management, and cost allocation. For more information, see [Tagging AWS Resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) in the *AWS General Reference* . Once the resource is created, you can use TagResource, UntagResource, and ListTagsForResource to add, remove, and view tags, respectively. The maximum tag limit may be lower than stated. See the AWS General Reference for actual tagging limits.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * A list of virtual private cloud (VPC) subnets to use with instances in the game server group. By default, all GameLift FleetIQ-supported Availability Zones are used. You can use this parameter to specify VPCs that you've set up. This property cannot be updated after the game server group is created, and the corresponding Auto Scaling group will always use the property value that is set with this request, even if the Auto Scaling group is updated directly.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-vpcsubnets
     */
    readonly vpcSubnets?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnGameServerGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnGameServerGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnGameServerGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('autoScalingPolicy', CfnGameServerGroup_AutoScalingPolicyPropertyValidator)(properties.autoScalingPolicy));
    errors.collect(cdk.propertyValidator('balancingStrategy', cdk.validateString)(properties.balancingStrategy));
    errors.collect(cdk.propertyValidator('deleteOption', cdk.validateString)(properties.deleteOption));
    errors.collect(cdk.propertyValidator('gameServerGroupName', cdk.requiredValidator)(properties.gameServerGroupName));
    errors.collect(cdk.propertyValidator('gameServerGroupName', cdk.validateString)(properties.gameServerGroupName));
    errors.collect(cdk.propertyValidator('gameServerProtectionPolicy', cdk.validateString)(properties.gameServerProtectionPolicy));
    errors.collect(cdk.propertyValidator('instanceDefinitions', cdk.requiredValidator)(properties.instanceDefinitions));
    errors.collect(cdk.propertyValidator('instanceDefinitions', cdk.listValidator(CfnGameServerGroup_InstanceDefinitionPropertyValidator))(properties.instanceDefinitions));
    errors.collect(cdk.propertyValidator('launchTemplate', cdk.requiredValidator)(properties.launchTemplate));
    errors.collect(cdk.propertyValidator('launchTemplate', CfnGameServerGroup_LaunchTemplatePropertyValidator)(properties.launchTemplate));
    errors.collect(cdk.propertyValidator('maxSize', cdk.validateNumber)(properties.maxSize));
    errors.collect(cdk.propertyValidator('minSize', cdk.validateNumber)(properties.minSize));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('vpcSubnets', cdk.listValidator(cdk.validateString))(properties.vpcSubnets));
    return errors.wrap('supplied properties not correct for "CfnGameServerGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::GameServerGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnGameServerGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::GameServerGroup` resource.
 */
// @ts-ignore TS6133
function cfnGameServerGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGameServerGroupPropsValidator(properties).assertSuccess();
    return {
        GameServerGroupName: cdk.stringToCloudFormation(properties.gameServerGroupName),
        InstanceDefinitions: cdk.listMapper(cfnGameServerGroupInstanceDefinitionPropertyToCloudFormation)(properties.instanceDefinitions),
        LaunchTemplate: cfnGameServerGroupLaunchTemplatePropertyToCloudFormation(properties.launchTemplate),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        AutoScalingPolicy: cfnGameServerGroupAutoScalingPolicyPropertyToCloudFormation(properties.autoScalingPolicy),
        BalancingStrategy: cdk.stringToCloudFormation(properties.balancingStrategy),
        DeleteOption: cdk.stringToCloudFormation(properties.deleteOption),
        GameServerProtectionPolicy: cdk.stringToCloudFormation(properties.gameServerProtectionPolicy),
        MaxSize: cdk.numberToCloudFormation(properties.maxSize),
        MinSize: cdk.numberToCloudFormation(properties.minSize),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        VpcSubnets: cdk.listMapper(cdk.stringToCloudFormation)(properties.vpcSubnets),
    };
}

// @ts-ignore TS6133
function CfnGameServerGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGameServerGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGameServerGroupProps>();
    ret.addPropertyResult('gameServerGroupName', 'GameServerGroupName', cfn_parse.FromCloudFormation.getString(properties.GameServerGroupName));
    ret.addPropertyResult('instanceDefinitions', 'InstanceDefinitions', cfn_parse.FromCloudFormation.getArray(CfnGameServerGroupInstanceDefinitionPropertyFromCloudFormation)(properties.InstanceDefinitions));
    ret.addPropertyResult('launchTemplate', 'LaunchTemplate', CfnGameServerGroupLaunchTemplatePropertyFromCloudFormation(properties.LaunchTemplate));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('autoScalingPolicy', 'AutoScalingPolicy', properties.AutoScalingPolicy != null ? CfnGameServerGroupAutoScalingPolicyPropertyFromCloudFormation(properties.AutoScalingPolicy) : undefined);
    ret.addPropertyResult('balancingStrategy', 'BalancingStrategy', properties.BalancingStrategy != null ? cfn_parse.FromCloudFormation.getString(properties.BalancingStrategy) : undefined);
    ret.addPropertyResult('deleteOption', 'DeleteOption', properties.DeleteOption != null ? cfn_parse.FromCloudFormation.getString(properties.DeleteOption) : undefined);
    ret.addPropertyResult('gameServerProtectionPolicy', 'GameServerProtectionPolicy', properties.GameServerProtectionPolicy != null ? cfn_parse.FromCloudFormation.getString(properties.GameServerProtectionPolicy) : undefined);
    ret.addPropertyResult('maxSize', 'MaxSize', properties.MaxSize != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxSize) : undefined);
    ret.addPropertyResult('minSize', 'MinSize', properties.MinSize != null ? cfn_parse.FromCloudFormation.getNumber(properties.MinSize) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('vpcSubnets', 'VpcSubnets', properties.VpcSubnets != null ? cfn_parse.FromCloudFormation.getStringArray(properties.VpcSubnets) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GameLift::GameServerGroup`
 *
 * *This operation is used with the Amazon GameLift FleetIQ solution and game server groups.*
 *
 * Creates a GameLift FleetIQ game server group for managing game hosting on a collection of Amazon EC2 instances for game hosting. This operation creates the game server group, creates an Auto Scaling group in your AWS account , and establishes a link between the two groups. You can view the status of your game server groups in the GameLift console. Game server group metrics and events are emitted to Amazon CloudWatch.
 *
 * Before creating a new game server group, you must have the following:
 *
 * - An Amazon EC2 launch template that specifies how to launch Amazon EC2 instances with your game server build. For more information, see [Launching an Instance from a Launch Template](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launch-templates.html) in the *Amazon EC2 User Guide* .
 * - An IAM role that extends limited access to your AWS account to allow GameLift FleetIQ to create and interact with the Auto Scaling group. For more information, see [Create IAM roles for cross-service interaction](https://docs.aws.amazon.com/gamelift/latest/fleetiqguide/gsg-iam-permissions-roles.html) in the *GameLift FleetIQ Developer Guide* .
 *
 * To create a new game server group, specify a unique group name, IAM role and Amazon EC2 launch template, and provide a list of instance types that can be used in the group. You must also set initial maximum and minimum limits on the group's instance count. You can optionally set an Auto Scaling policy with target tracking based on a GameLift FleetIQ metric.
 *
 * Once the game server group and corresponding Auto Scaling group are created, you have full access to change the Auto Scaling group's configuration as needed. Several properties that are set when creating a game server group, including maximum/minimum size and auto-scaling policy settings, must be updated directly in the Auto Scaling group. Keep in mind that some Auto Scaling group properties are periodically updated by GameLift FleetIQ as part of its balancing activities to optimize for availability and cost.
 *
 * *Learn more*
 *
 * [GameLift FleetIQ Guide](https://docs.aws.amazon.com/gamelift/latest/fleetiqguide/gsg-intro.html)
 *
 * @cloudformationResource AWS::GameLift::GameServerGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html
 */
export class CfnGameServerGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GameLift::GameServerGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnGameServerGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnGameServerGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnGameServerGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A unique identifier for the auto scaling group.
     * @cloudformationAttribute AutoScalingGroupArn
     */
    public readonly attrAutoScalingGroupArn: string;

    /**
     * A unique identifier for the game server group.
     * @cloudformationAttribute GameServerGroupArn
     */
    public readonly attrGameServerGroupArn: string;

    /**
     * A developer-defined identifier for the game server group. The name is unique for each Region in each AWS account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-gameservergroupname
     */
    public gameServerGroupName: string;

    /**
     * The set of Amazon EC2 instance types that GameLift FleetIQ can use when balancing and automatically scaling instances in the corresponding Auto Scaling group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-instancedefinitions
     */
    public instanceDefinitions: Array<CfnGameServerGroup.InstanceDefinitionProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The Amazon EC2 launch template that contains configuration settings and game server code to be deployed to all instances in the game server group. You can specify the template using either the template name or ID. For help with creating a launch template, see [Creating a Launch Template for an Auto Scaling Group](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-launch-template.html) in the *Amazon Elastic Compute Cloud Auto Scaling User Guide* . After the Auto Scaling group is created, update this value directly in the Auto Scaling group using the AWS console or APIs.
     *
     * > If you specify network interfaces in your launch template, you must explicitly set the property `AssociatePublicIpAddress` to "true". If no network interface is specified in the launch template, GameLift FleetIQ uses your account's default VPC.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-launchtemplate
     */
    public launchTemplate: CfnGameServerGroup.LaunchTemplateProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name ( [ARN](https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-arn-format.html) ) for an IAM role that allows Amazon GameLift to access your Amazon EC2 Auto Scaling groups.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-rolearn
     */
    public roleArn: string;

    /**
     * Configuration settings to define a scaling policy for the Auto Scaling group that is optimized for game hosting. The scaling policy uses the metric `"PercentUtilizedGameServers"` to maintain a buffer of idle game servers that can immediately accommodate new games and players. After the Auto Scaling group is created, update this value directly in the Auto Scaling group using the AWS console or APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-autoscalingpolicy
     */
    public autoScalingPolicy: CfnGameServerGroup.AutoScalingPolicyProperty | cdk.IResolvable | undefined;

    /**
     * Indicates how GameLift FleetIQ balances the use of Spot Instances and On-Demand Instances in the game server group. Method options include the following:
     *
     * - `SPOT_ONLY` - Only Spot Instances are used in the game server group. If Spot Instances are unavailable or not viable for game hosting, the game server group provides no hosting capacity until Spot Instances can again be used. Until then, no new instances are started, and the existing nonviable Spot Instances are terminated (after current gameplay ends) and are not replaced.
     * - `SPOT_PREFERRED` - (default value) Spot Instances are used whenever available in the game server group. If Spot Instances are unavailable, the game server group continues to provide hosting capacity by falling back to On-Demand Instances. Existing nonviable Spot Instances are terminated (after current gameplay ends) and are replaced with new On-Demand Instances.
     * - `ON_DEMAND_ONLY` - Only On-Demand Instances are used in the game server group. No Spot Instances are used, even when available, while this balancing strategy is in force.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-balancingstrategy
     */
    public balancingStrategy: string | undefined;

    /**
     * The type of delete to perform. To delete a game server group, specify the `DeleteOption` . Options include the following:
     *
     * - `SAFE_DELETE` – (default) Terminates the game server group and Amazon EC2 Auto Scaling group only when it has no game servers that are in `UTILIZED` status.
     * - `FORCE_DELETE` – Terminates the game server group, including all active game servers regardless of their utilization status, and the Amazon EC2 Auto Scaling group.
     * - `RETAIN` – Does a safe delete of the game server group but retains the Amazon EC2 Auto Scaling group as is.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-deleteoption
     */
    public deleteOption: string | undefined;

    /**
     * A flag that indicates whether instances in the game server group are protected from early termination. Unprotected instances that have active game servers running might be terminated during a scale-down event, causing players to be dropped from the game. Protected instances cannot be terminated while there are active game servers running except in the event of a forced game server group deletion (see ). An exception to this is with Spot Instances, which can be terminated by AWS regardless of protection status.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-gameserverprotectionpolicy
     */
    public gameServerProtectionPolicy: string | undefined;

    /**
     * The maximum number of instances allowed in the Amazon EC2 Auto Scaling group. During automatic scaling events, GameLift FleetIQ and EC2 do not scale up the group above this maximum. After the Auto Scaling group is created, update this value directly in the Auto Scaling group using the AWS console or APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-maxsize
     */
    public maxSize: number | undefined;

    /**
     * The minimum number of instances allowed in the Amazon EC2 Auto Scaling group. During automatic scaling events, GameLift FleetIQ and Amazon EC2 do not scale down the group below this minimum. In production, this value should be set to at least 1. After the Auto Scaling group is created, update this value directly in the Auto Scaling group using the AWS console or APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-minsize
     */
    public minSize: number | undefined;

    /**
     * A list of labels to assign to the new game server group resource. Tags are developer-defined key-value pairs. Tagging AWS resources is useful for resource management, access management, and cost allocation. For more information, see [Tagging AWS Resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) in the *AWS General Reference* . Once the resource is created, you can use TagResource, UntagResource, and ListTagsForResource to add, remove, and view tags, respectively. The maximum tag limit may be lower than stated. See the AWS General Reference for actual tagging limits.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * A list of virtual private cloud (VPC) subnets to use with instances in the game server group. By default, all GameLift FleetIQ-supported Availability Zones are used. You can use this parameter to specify VPCs that you've set up. This property cannot be updated after the game server group is created, and the corresponding Auto Scaling group will always use the property value that is set with this request, even if the Auto Scaling group is updated directly.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html#cfn-gamelift-gameservergroup-vpcsubnets
     */
    public vpcSubnets: string[] | undefined;

    /**
     * Create a new `AWS::GameLift::GameServerGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnGameServerGroupProps) {
        super(scope, id, { type: CfnGameServerGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'gameServerGroupName', this);
        cdk.requireProperty(props, 'instanceDefinitions', this);
        cdk.requireProperty(props, 'launchTemplate', this);
        cdk.requireProperty(props, 'roleArn', this);
        this.attrAutoScalingGroupArn = cdk.Token.asString(this.getAtt('AutoScalingGroupArn'));
        this.attrGameServerGroupArn = cdk.Token.asString(this.getAtt('GameServerGroupArn'));

        this.gameServerGroupName = props.gameServerGroupName;
        this.instanceDefinitions = props.instanceDefinitions;
        this.launchTemplate = props.launchTemplate;
        this.roleArn = props.roleArn;
        this.autoScalingPolicy = props.autoScalingPolicy;
        this.balancingStrategy = props.balancingStrategy;
        this.deleteOption = props.deleteOption;
        this.gameServerProtectionPolicy = props.gameServerProtectionPolicy;
        this.maxSize = props.maxSize;
        this.minSize = props.minSize;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::GameLift::GameServerGroup", props.tags, { tagPropertyName: 'tags' });
        this.vpcSubnets = props.vpcSubnets;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnGameServerGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            gameServerGroupName: this.gameServerGroupName,
            instanceDefinitions: this.instanceDefinitions,
            launchTemplate: this.launchTemplate,
            roleArn: this.roleArn,
            autoScalingPolicy: this.autoScalingPolicy,
            balancingStrategy: this.balancingStrategy,
            deleteOption: this.deleteOption,
            gameServerProtectionPolicy: this.gameServerProtectionPolicy,
            maxSize: this.maxSize,
            minSize: this.minSize,
            tags: this.tags.renderTags(),
            vpcSubnets: this.vpcSubnets,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnGameServerGroupPropsToCloudFormation(props);
    }
}

export namespace CfnGameServerGroup {
    /**
     * *This data type is used with the GameLift FleetIQ and game server groups.*
     *
     * Configuration settings for intelligent automatic scaling that uses target tracking. After the Auto Scaling group is created, all updates to Auto Scaling policies, including changing this policy and adding or removing other policies, is done directly on the Auto Scaling group.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gameservergroup-autoscalingpolicy.html
     */
    export interface AutoScalingPolicyProperty {
        /**
         * Length of time, in seconds, it takes for a new instance to start new game server processes and register with GameLift FleetIQ. Specifying a warm-up time can be useful, particularly with game servers that take a long time to start up, because it avoids prematurely starting new instances.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gameservergroup-autoscalingpolicy.html#cfn-gamelift-gameservergroup-autoscalingpolicy-estimatedinstancewarmup
         */
        readonly estimatedInstanceWarmup?: number;
        /**
         * Settings for a target-based scaling policy applied to Auto Scaling group. These settings are used to create a target-based policy that tracks the GameLift FleetIQ metric `PercentUtilizedGameServers` and specifies a target value for the metric. As player usage changes, the policy triggers to adjust the game server group capacity so that the metric returns to the target value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gameservergroup-autoscalingpolicy.html#cfn-gamelift-gameservergroup-autoscalingpolicy-targettrackingconfiguration
         */
        readonly targetTrackingConfiguration: CfnGameServerGroup.TargetTrackingConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AutoScalingPolicyProperty`
 *
 * @param properties - the TypeScript properties of a `AutoScalingPolicyProperty`
 *
 * @returns the result of the validation.
 */
function CfnGameServerGroup_AutoScalingPolicyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('estimatedInstanceWarmup', cdk.validateNumber)(properties.estimatedInstanceWarmup));
    errors.collect(cdk.propertyValidator('targetTrackingConfiguration', cdk.requiredValidator)(properties.targetTrackingConfiguration));
    errors.collect(cdk.propertyValidator('targetTrackingConfiguration', CfnGameServerGroup_TargetTrackingConfigurationPropertyValidator)(properties.targetTrackingConfiguration));
    return errors.wrap('supplied properties not correct for "AutoScalingPolicyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::GameServerGroup.AutoScalingPolicy` resource
 *
 * @param properties - the TypeScript properties of a `AutoScalingPolicyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::GameServerGroup.AutoScalingPolicy` resource.
 */
// @ts-ignore TS6133
function cfnGameServerGroupAutoScalingPolicyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGameServerGroup_AutoScalingPolicyPropertyValidator(properties).assertSuccess();
    return {
        EstimatedInstanceWarmup: cdk.numberToCloudFormation(properties.estimatedInstanceWarmup),
        TargetTrackingConfiguration: cfnGameServerGroupTargetTrackingConfigurationPropertyToCloudFormation(properties.targetTrackingConfiguration),
    };
}

// @ts-ignore TS6133
function CfnGameServerGroupAutoScalingPolicyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGameServerGroup.AutoScalingPolicyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGameServerGroup.AutoScalingPolicyProperty>();
    ret.addPropertyResult('estimatedInstanceWarmup', 'EstimatedInstanceWarmup', properties.EstimatedInstanceWarmup != null ? cfn_parse.FromCloudFormation.getNumber(properties.EstimatedInstanceWarmup) : undefined);
    ret.addPropertyResult('targetTrackingConfiguration', 'TargetTrackingConfiguration', CfnGameServerGroupTargetTrackingConfigurationPropertyFromCloudFormation(properties.TargetTrackingConfiguration));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnGameServerGroup {
    /**
     * *This data type is used with the Amazon GameLift FleetIQ and game server groups.*
     *
     * An allowed instance type for a `GameServerGroup` . All game server groups must have at least two instance types defined for it. GameLift FleetIQ periodically evaluates each defined instance type for viability. It then updates the Auto Scaling group with the list of viable instance types.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gameservergroup-instancedefinition.html
     */
    export interface InstanceDefinitionProperty {
        /**
         * An Amazon EC2 instance type designation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gameservergroup-instancedefinition.html#cfn-gamelift-gameservergroup-instancedefinition-instancetype
         */
        readonly instanceType: string;
        /**
         * Instance weighting that indicates how much this instance type contributes to the total capacity of a game server group. Instance weights are used by GameLift FleetIQ to calculate the instance type's cost per unit hour and better identify the most cost-effective options. For detailed information on weighting instance capacity, see [Instance Weighting](https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-instance-weighting.html) in the *Amazon Elastic Compute Cloud Auto Scaling User Guide* . Default value is "1".
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gameservergroup-instancedefinition.html#cfn-gamelift-gameservergroup-instancedefinition-weightedcapacity
         */
        readonly weightedCapacity?: string;
    }
}

/**
 * Determine whether the given properties match those of a `InstanceDefinitionProperty`
 *
 * @param properties - the TypeScript properties of a `InstanceDefinitionProperty`
 *
 * @returns the result of the validation.
 */
function CfnGameServerGroup_InstanceDefinitionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceType', cdk.requiredValidator)(properties.instanceType));
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('weightedCapacity', cdk.validateString)(properties.weightedCapacity));
    return errors.wrap('supplied properties not correct for "InstanceDefinitionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::GameServerGroup.InstanceDefinition` resource
 *
 * @param properties - the TypeScript properties of a `InstanceDefinitionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::GameServerGroup.InstanceDefinition` resource.
 */
// @ts-ignore TS6133
function cfnGameServerGroupInstanceDefinitionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGameServerGroup_InstanceDefinitionPropertyValidator(properties).assertSuccess();
    return {
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        WeightedCapacity: cdk.stringToCloudFormation(properties.weightedCapacity),
    };
}

// @ts-ignore TS6133
function CfnGameServerGroupInstanceDefinitionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGameServerGroup.InstanceDefinitionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGameServerGroup.InstanceDefinitionProperty>();
    ret.addPropertyResult('instanceType', 'InstanceType', cfn_parse.FromCloudFormation.getString(properties.InstanceType));
    ret.addPropertyResult('weightedCapacity', 'WeightedCapacity', properties.WeightedCapacity != null ? cfn_parse.FromCloudFormation.getString(properties.WeightedCapacity) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnGameServerGroup {
    /**
     * *This data type is used with the GameLift FleetIQ and game server groups.*
     *
     * An Amazon EC2 launch template that contains configuration settings and game server code to be deployed to all instances in a game server group. The launch template is specified when creating a new game server group with `GameServerGroup` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gameservergroup-launchtemplate.html
     */
    export interface LaunchTemplateProperty {
        /**
         * A unique identifier for an existing Amazon EC2 launch template.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gameservergroup-launchtemplate.html#cfn-gamelift-gameservergroup-launchtemplate-launchtemplateid
         */
        readonly launchTemplateId?: string;
        /**
         * A readable identifier for an existing Amazon EC2 launch template.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gameservergroup-launchtemplate.html#cfn-gamelift-gameservergroup-launchtemplate-launchtemplatename
         */
        readonly launchTemplateName?: string;
        /**
         * The version of the Amazon EC2 launch template to use. If no version is specified, the default version will be used. With Amazon EC2, you can specify a default version for a launch template. If none is set, the default is the first version created.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gameservergroup-launchtemplate.html#cfn-gamelift-gameservergroup-launchtemplate-version
         */
        readonly version?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LaunchTemplateProperty`
 *
 * @param properties - the TypeScript properties of a `LaunchTemplateProperty`
 *
 * @returns the result of the validation.
 */
function CfnGameServerGroup_LaunchTemplatePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('launchTemplateId', cdk.validateString)(properties.launchTemplateId));
    errors.collect(cdk.propertyValidator('launchTemplateName', cdk.validateString)(properties.launchTemplateName));
    errors.collect(cdk.propertyValidator('version', cdk.validateString)(properties.version));
    return errors.wrap('supplied properties not correct for "LaunchTemplateProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::GameServerGroup.LaunchTemplate` resource
 *
 * @param properties - the TypeScript properties of a `LaunchTemplateProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::GameServerGroup.LaunchTemplate` resource.
 */
// @ts-ignore TS6133
function cfnGameServerGroupLaunchTemplatePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGameServerGroup_LaunchTemplatePropertyValidator(properties).assertSuccess();
    return {
        LaunchTemplateId: cdk.stringToCloudFormation(properties.launchTemplateId),
        LaunchTemplateName: cdk.stringToCloudFormation(properties.launchTemplateName),
        Version: cdk.stringToCloudFormation(properties.version),
    };
}

// @ts-ignore TS6133
function CfnGameServerGroupLaunchTemplatePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGameServerGroup.LaunchTemplateProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGameServerGroup.LaunchTemplateProperty>();
    ret.addPropertyResult('launchTemplateId', 'LaunchTemplateId', properties.LaunchTemplateId != null ? cfn_parse.FromCloudFormation.getString(properties.LaunchTemplateId) : undefined);
    ret.addPropertyResult('launchTemplateName', 'LaunchTemplateName', properties.LaunchTemplateName != null ? cfn_parse.FromCloudFormation.getString(properties.LaunchTemplateName) : undefined);
    ret.addPropertyResult('version', 'Version', properties.Version != null ? cfn_parse.FromCloudFormation.getString(properties.Version) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnGameServerGroup {
    /**
     * *This data type is used with the Amazon GameLift FleetIQ and game server groups.*
     *
     * Settings for a target-based scaling policy as part of a `GameServerGroupAutoScalingPolicy` . These settings are used to create a target-based policy that tracks the GameLift FleetIQ metric `"PercentUtilizedGameServers"` and specifies a target value for the metric. As player usage changes, the policy triggers to adjust the game server group capacity so that the metric returns to the target value.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gameservergroup-targettrackingconfiguration.html
     */
    export interface TargetTrackingConfigurationProperty {
        /**
         * Desired value to use with a game server group target-based scaling policy.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gameservergroup-targettrackingconfiguration.html#cfn-gamelift-gameservergroup-targettrackingconfiguration-targetvalue
         */
        readonly targetValue: number;
    }
}

/**
 * Determine whether the given properties match those of a `TargetTrackingConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `TargetTrackingConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnGameServerGroup_TargetTrackingConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('targetValue', cdk.requiredValidator)(properties.targetValue));
    errors.collect(cdk.propertyValidator('targetValue', cdk.validateNumber)(properties.targetValue));
    return errors.wrap('supplied properties not correct for "TargetTrackingConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::GameServerGroup.TargetTrackingConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `TargetTrackingConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::GameServerGroup.TargetTrackingConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnGameServerGroupTargetTrackingConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGameServerGroup_TargetTrackingConfigurationPropertyValidator(properties).assertSuccess();
    return {
        TargetValue: cdk.numberToCloudFormation(properties.targetValue),
    };
}

// @ts-ignore TS6133
function CfnGameServerGroupTargetTrackingConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGameServerGroup.TargetTrackingConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGameServerGroup.TargetTrackingConfigurationProperty>();
    ret.addPropertyResult('targetValue', 'TargetValue', cfn_parse.FromCloudFormation.getNumber(properties.TargetValue));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnGameSessionQueue`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html
 */
export interface CfnGameSessionQueueProps {

    /**
     * A descriptive label that is associated with game session queue. Queue names must be unique within each Region.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-name
     */
    readonly name: string;

    /**
     * Information to be added to all events that are related to this game session queue.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-customeventdata
     */
    readonly customEventData?: string;

    /**
     * A list of fleets and/or fleet aliases that can be used to fulfill game session placement requests in the queue. Destinations are identified by either a fleet ARN or a fleet alias ARN, and are listed in order of placement preference.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-destinations
     */
    readonly destinations?: Array<CfnGameSessionQueue.DestinationProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A list of locations where a queue is allowed to place new game sessions. Locations are specified in the form of AWS Region codes, such as `us-west-2` . If this parameter is not set, game sessions can be placed in any queue location.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-filterconfiguration
     */
    readonly filterConfiguration?: CfnGameSessionQueue.FilterConfigurationProperty | cdk.IResolvable;

    /**
     * An SNS topic ARN that is set up to receive game session placement notifications. See [Setting up notifications for game session placement](https://docs.aws.amazon.com/gamelift/latest/developerguide/queue-notification.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-notificationtarget
     */
    readonly notificationTarget?: string;

    /**
     * A set of policies that act as a sliding cap on player latency. FleetIQ works to deliver low latency for most players in a game session. These policies ensure that no individual player can be placed into a game with unreasonably high latency. Use multiple policies to gradually relax latency requirements a step at a time. Multiple policies are applied based on their maximum allowed latency, starting with the lowest value.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-playerlatencypolicies
     */
    readonly playerLatencyPolicies?: Array<CfnGameSessionQueue.PlayerLatencyPolicyProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Custom settings to use when prioritizing destinations and locations for game session placements. This configuration replaces the FleetIQ default prioritization process. Priority types that are not explicitly named will be automatically applied at the end of the prioritization process.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-priorityconfiguration
     */
    readonly priorityConfiguration?: CfnGameSessionQueue.PriorityConfigurationProperty | cdk.IResolvable;

    /**
     * A list of labels to assign to the new game session queue resource. Tags are developer-defined key-value pairs. Tagging AWS resources are useful for resource management, access management and cost allocation. For more information, see [Tagging AWS Resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) in the *AWS General Reference* . Once the resource is created, you can use TagResource, UntagResource, and ListTagsForResource to add, remove, and view tags. The maximum tag limit may be lower than stated. See the AWS General Reference for actual tagging limits.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The maximum time, in seconds, that a new game session placement request remains in the queue. When a request exceeds this time, the game session placement changes to a `TIMED_OUT` status.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-timeoutinseconds
     */
    readonly timeoutInSeconds?: number;
}

/**
 * Determine whether the given properties match those of a `CfnGameSessionQueueProps`
 *
 * @param properties - the TypeScript properties of a `CfnGameSessionQueueProps`
 *
 * @returns the result of the validation.
 */
function CfnGameSessionQueuePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('customEventData', cdk.validateString)(properties.customEventData));
    errors.collect(cdk.propertyValidator('destinations', cdk.listValidator(CfnGameSessionQueue_DestinationPropertyValidator))(properties.destinations));
    errors.collect(cdk.propertyValidator('filterConfiguration', CfnGameSessionQueue_FilterConfigurationPropertyValidator)(properties.filterConfiguration));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('notificationTarget', cdk.validateString)(properties.notificationTarget));
    errors.collect(cdk.propertyValidator('playerLatencyPolicies', cdk.listValidator(CfnGameSessionQueue_PlayerLatencyPolicyPropertyValidator))(properties.playerLatencyPolicies));
    errors.collect(cdk.propertyValidator('priorityConfiguration', CfnGameSessionQueue_PriorityConfigurationPropertyValidator)(properties.priorityConfiguration));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('timeoutInSeconds', cdk.validateNumber)(properties.timeoutInSeconds));
    return errors.wrap('supplied properties not correct for "CfnGameSessionQueueProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::GameSessionQueue` resource
 *
 * @param properties - the TypeScript properties of a `CfnGameSessionQueueProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::GameSessionQueue` resource.
 */
// @ts-ignore TS6133
function cfnGameSessionQueuePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGameSessionQueuePropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        CustomEventData: cdk.stringToCloudFormation(properties.customEventData),
        Destinations: cdk.listMapper(cfnGameSessionQueueDestinationPropertyToCloudFormation)(properties.destinations),
        FilterConfiguration: cfnGameSessionQueueFilterConfigurationPropertyToCloudFormation(properties.filterConfiguration),
        NotificationTarget: cdk.stringToCloudFormation(properties.notificationTarget),
        PlayerLatencyPolicies: cdk.listMapper(cfnGameSessionQueuePlayerLatencyPolicyPropertyToCloudFormation)(properties.playerLatencyPolicies),
        PriorityConfiguration: cfnGameSessionQueuePriorityConfigurationPropertyToCloudFormation(properties.priorityConfiguration),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        TimeoutInSeconds: cdk.numberToCloudFormation(properties.timeoutInSeconds),
    };
}

// @ts-ignore TS6133
function CfnGameSessionQueuePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGameSessionQueueProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGameSessionQueueProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('customEventData', 'CustomEventData', properties.CustomEventData != null ? cfn_parse.FromCloudFormation.getString(properties.CustomEventData) : undefined);
    ret.addPropertyResult('destinations', 'Destinations', properties.Destinations != null ? cfn_parse.FromCloudFormation.getArray(CfnGameSessionQueueDestinationPropertyFromCloudFormation)(properties.Destinations) : undefined);
    ret.addPropertyResult('filterConfiguration', 'FilterConfiguration', properties.FilterConfiguration != null ? CfnGameSessionQueueFilterConfigurationPropertyFromCloudFormation(properties.FilterConfiguration) : undefined);
    ret.addPropertyResult('notificationTarget', 'NotificationTarget', properties.NotificationTarget != null ? cfn_parse.FromCloudFormation.getString(properties.NotificationTarget) : undefined);
    ret.addPropertyResult('playerLatencyPolicies', 'PlayerLatencyPolicies', properties.PlayerLatencyPolicies != null ? cfn_parse.FromCloudFormation.getArray(CfnGameSessionQueuePlayerLatencyPolicyPropertyFromCloudFormation)(properties.PlayerLatencyPolicies) : undefined);
    ret.addPropertyResult('priorityConfiguration', 'PriorityConfiguration', properties.PriorityConfiguration != null ? CfnGameSessionQueuePriorityConfigurationPropertyFromCloudFormation(properties.PriorityConfiguration) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('timeoutInSeconds', 'TimeoutInSeconds', properties.TimeoutInSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.TimeoutInSeconds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GameLift::GameSessionQueue`
 *
 * The `AWS::GameLift::GameSessionQueue` resource creates a placement queue that processes requests for new game sessions. A queue uses FleetIQ algorithms to determine the best placement locations and find an available game server, then prompts the game server to start a new game session. Queues can have destinations (GameLift fleets or aliases), which determine where the queue can place new game sessions. A queue can have destinations with varied fleet type (Spot and On-Demand), instance type, and AWS Region .
 *
 * @cloudformationResource AWS::GameLift::GameSessionQueue
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html
 */
export class CfnGameSessionQueue extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GameLift::GameSessionQueue";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnGameSessionQueue {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnGameSessionQueuePropsFromCloudFormation(resourceProperties);
        const ret = new CfnGameSessionQueue(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The unique Amazon Resource Name (ARN) for the `GameSessionQueue` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * A descriptive label that is associated with a game session queue. Names are unique within each Region.
     * @cloudformationAttribute Name
     */
    public readonly attrName: string;

    /**
     * A descriptive label that is associated with game session queue. Queue names must be unique within each Region.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-name
     */
    public name: string;

    /**
     * Information to be added to all events that are related to this game session queue.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-customeventdata
     */
    public customEventData: string | undefined;

    /**
     * A list of fleets and/or fleet aliases that can be used to fulfill game session placement requests in the queue. Destinations are identified by either a fleet ARN or a fleet alias ARN, and are listed in order of placement preference.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-destinations
     */
    public destinations: Array<CfnGameSessionQueue.DestinationProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * A list of locations where a queue is allowed to place new game sessions. Locations are specified in the form of AWS Region codes, such as `us-west-2` . If this parameter is not set, game sessions can be placed in any queue location.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-filterconfiguration
     */
    public filterConfiguration: CfnGameSessionQueue.FilterConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * An SNS topic ARN that is set up to receive game session placement notifications. See [Setting up notifications for game session placement](https://docs.aws.amazon.com/gamelift/latest/developerguide/queue-notification.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-notificationtarget
     */
    public notificationTarget: string | undefined;

    /**
     * A set of policies that act as a sliding cap on player latency. FleetIQ works to deliver low latency for most players in a game session. These policies ensure that no individual player can be placed into a game with unreasonably high latency. Use multiple policies to gradually relax latency requirements a step at a time. Multiple policies are applied based on their maximum allowed latency, starting with the lowest value.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-playerlatencypolicies
     */
    public playerLatencyPolicies: Array<CfnGameSessionQueue.PlayerLatencyPolicyProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Custom settings to use when prioritizing destinations and locations for game session placements. This configuration replaces the FleetIQ default prioritization process. Priority types that are not explicitly named will be automatically applied at the end of the prioritization process.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-priorityconfiguration
     */
    public priorityConfiguration: CfnGameSessionQueue.PriorityConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * A list of labels to assign to the new game session queue resource. Tags are developer-defined key-value pairs. Tagging AWS resources are useful for resource management, access management and cost allocation. For more information, see [Tagging AWS Resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) in the *AWS General Reference* . Once the resource is created, you can use TagResource, UntagResource, and ListTagsForResource to add, remove, and view tags. The maximum tag limit may be lower than stated. See the AWS General Reference for actual tagging limits.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The maximum time, in seconds, that a new game session placement request remains in the queue. When a request exceeds this time, the game session placement changes to a `TIMED_OUT` status.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html#cfn-gamelift-gamesessionqueue-timeoutinseconds
     */
    public timeoutInSeconds: number | undefined;

    /**
     * Create a new `AWS::GameLift::GameSessionQueue`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnGameSessionQueueProps) {
        super(scope, id, { type: CfnGameSessionQueue.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrName = cdk.Token.asString(this.getAtt('Name'));

        this.name = props.name;
        this.customEventData = props.customEventData;
        this.destinations = props.destinations;
        this.filterConfiguration = props.filterConfiguration;
        this.notificationTarget = props.notificationTarget;
        this.playerLatencyPolicies = props.playerLatencyPolicies;
        this.priorityConfiguration = props.priorityConfiguration;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::GameLift::GameSessionQueue", props.tags, { tagPropertyName: 'tags' });
        this.timeoutInSeconds = props.timeoutInSeconds;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnGameSessionQueue.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            customEventData: this.customEventData,
            destinations: this.destinations,
            filterConfiguration: this.filterConfiguration,
            notificationTarget: this.notificationTarget,
            playerLatencyPolicies: this.playerLatencyPolicies,
            priorityConfiguration: this.priorityConfiguration,
            tags: this.tags.renderTags(),
            timeoutInSeconds: this.timeoutInSeconds,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnGameSessionQueuePropsToCloudFormation(props);
    }
}

export namespace CfnGameSessionQueue {
    /**
     * A fleet or alias designated in a game session queue. Queues fulfill requests for new game sessions by placing a new game session on any of the queue's destinations.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gamesessionqueue-destination.html
     */
    export interface DestinationProperty {
        /**
         * The Amazon Resource Name (ARN) that is assigned to fleet or fleet alias. ARNs, which include a fleet ID or alias ID and a Region name, provide a unique identifier across all Regions.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gamesessionqueue-destination.html#cfn-gamelift-gamesessionqueue-destination-destinationarn
         */
        readonly destinationArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DestinationProperty`
 *
 * @param properties - the TypeScript properties of a `DestinationProperty`
 *
 * @returns the result of the validation.
 */
function CfnGameSessionQueue_DestinationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('destinationArn', cdk.validateString)(properties.destinationArn));
    return errors.wrap('supplied properties not correct for "DestinationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::GameSessionQueue.Destination` resource
 *
 * @param properties - the TypeScript properties of a `DestinationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::GameSessionQueue.Destination` resource.
 */
// @ts-ignore TS6133
function cfnGameSessionQueueDestinationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGameSessionQueue_DestinationPropertyValidator(properties).assertSuccess();
    return {
        DestinationArn: cdk.stringToCloudFormation(properties.destinationArn),
    };
}

// @ts-ignore TS6133
function CfnGameSessionQueueDestinationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGameSessionQueue.DestinationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGameSessionQueue.DestinationProperty>();
    ret.addPropertyResult('destinationArn', 'DestinationArn', properties.DestinationArn != null ? cfn_parse.FromCloudFormation.getString(properties.DestinationArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnGameSessionQueue {
    /**
     * A list of fleet locations where a game session queue can place new game sessions. You can use a filter to temporarily turn off placements for specific locations. For queues that have multi-location fleets, you can use a filter configuration allow placement with some, but not all of these locations.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gamesessionqueue-filterconfiguration.html
     */
    export interface FilterConfigurationProperty {
        /**
         * A list of locations to allow game session placement in, in the form of AWS Region codes such as `us-west-2` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gamesessionqueue-filterconfiguration.html#cfn-gamelift-gamesessionqueue-filterconfiguration-allowedlocations
         */
        readonly allowedLocations?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `FilterConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `FilterConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnGameSessionQueue_FilterConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('allowedLocations', cdk.listValidator(cdk.validateString))(properties.allowedLocations));
    return errors.wrap('supplied properties not correct for "FilterConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::GameSessionQueue.FilterConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `FilterConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::GameSessionQueue.FilterConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnGameSessionQueueFilterConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGameSessionQueue_FilterConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AllowedLocations: cdk.listMapper(cdk.stringToCloudFormation)(properties.allowedLocations),
    };
}

// @ts-ignore TS6133
function CfnGameSessionQueueFilterConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGameSessionQueue.FilterConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGameSessionQueue.FilterConfigurationProperty>();
    ret.addPropertyResult('allowedLocations', 'AllowedLocations', properties.AllowedLocations != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AllowedLocations) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnGameSessionQueue {
    /**
     * The queue setting that determines the highest latency allowed for individual players when placing a game session. When a latency policy is in force, a game session cannot be placed with any fleet in a Region where a player reports latency higher than the cap. Latency policies are only enforced when the placement request contains player latency information.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gamesessionqueue-playerlatencypolicy.html
     */
    export interface PlayerLatencyPolicyProperty {
        /**
         * The maximum latency value that is allowed for any player, in milliseconds. All policies must have a value set for this property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gamesessionqueue-playerlatencypolicy.html#cfn-gamelift-gamesessionqueue-playerlatencypolicy-maximumindividualplayerlatencymilliseconds
         */
        readonly maximumIndividualPlayerLatencyMilliseconds?: number;
        /**
         * The length of time, in seconds, that the policy is enforced while placing a new game session. A null value for this property means that the policy is enforced until the queue times out.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gamesessionqueue-playerlatencypolicy.html#cfn-gamelift-gamesessionqueue-playerlatencypolicy-policydurationseconds
         */
        readonly policyDurationSeconds?: number;
    }
}

/**
 * Determine whether the given properties match those of a `PlayerLatencyPolicyProperty`
 *
 * @param properties - the TypeScript properties of a `PlayerLatencyPolicyProperty`
 *
 * @returns the result of the validation.
 */
function CfnGameSessionQueue_PlayerLatencyPolicyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('maximumIndividualPlayerLatencyMilliseconds', cdk.validateNumber)(properties.maximumIndividualPlayerLatencyMilliseconds));
    errors.collect(cdk.propertyValidator('policyDurationSeconds', cdk.validateNumber)(properties.policyDurationSeconds));
    return errors.wrap('supplied properties not correct for "PlayerLatencyPolicyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::GameSessionQueue.PlayerLatencyPolicy` resource
 *
 * @param properties - the TypeScript properties of a `PlayerLatencyPolicyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::GameSessionQueue.PlayerLatencyPolicy` resource.
 */
// @ts-ignore TS6133
function cfnGameSessionQueuePlayerLatencyPolicyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGameSessionQueue_PlayerLatencyPolicyPropertyValidator(properties).assertSuccess();
    return {
        MaximumIndividualPlayerLatencyMilliseconds: cdk.numberToCloudFormation(properties.maximumIndividualPlayerLatencyMilliseconds),
        PolicyDurationSeconds: cdk.numberToCloudFormation(properties.policyDurationSeconds),
    };
}

// @ts-ignore TS6133
function CfnGameSessionQueuePlayerLatencyPolicyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGameSessionQueue.PlayerLatencyPolicyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGameSessionQueue.PlayerLatencyPolicyProperty>();
    ret.addPropertyResult('maximumIndividualPlayerLatencyMilliseconds', 'MaximumIndividualPlayerLatencyMilliseconds', properties.MaximumIndividualPlayerLatencyMilliseconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaximumIndividualPlayerLatencyMilliseconds) : undefined);
    ret.addPropertyResult('policyDurationSeconds', 'PolicyDurationSeconds', properties.PolicyDurationSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.PolicyDurationSeconds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnGameSessionQueue {
    /**
     * Custom prioritization settings for use by a game session queue when placing new game sessions with available game servers. When defined, this configuration replaces the default FleetIQ prioritization process, which is as follows:
     *
     * - If player latency data is included in a game session request, destinations and locations are prioritized first based on lowest average latency (1), then on lowest hosting cost (2), then on destination list order (3), and finally on location (alphabetical) (4). This approach ensures that the queue's top priority is to place game sessions where average player latency is lowest, and--if latency is the same--where the hosting cost is less, etc.
     * - If player latency data is not included, destinations and locations are prioritized first on destination list order (1), and then on location (alphabetical) (2). This approach ensures that the queue's top priority is to place game sessions on the first destination fleet listed. If that fleet has multiple locations, the game session is placed on the first location (when listed alphabetically).
     *
     * Changing the priority order will affect how game sessions are placed.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gamesessionqueue-priorityconfiguration.html
     */
    export interface PriorityConfigurationProperty {
        /**
         * The prioritization order to use for fleet locations, when the `PriorityOrder` property includes `LOCATION` . Locations are identified by AWS Region codes such as `us-west-2` . Each location can only be listed once.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gamesessionqueue-priorityconfiguration.html#cfn-gamelift-gamesessionqueue-priorityconfiguration-locationorder
         */
        readonly locationOrder?: string[];
        /**
         * The recommended sequence to use when prioritizing where to place new game sessions. Each type can only be listed once.
         *
         * - `LATENCY` -- FleetIQ prioritizes locations where the average player latency (provided in each game session request) is lowest.
         * - `COST` -- FleetIQ prioritizes destinations with the lowest current hosting costs. Cost is evaluated based on the location, instance type, and fleet type (Spot or On-Demand) for each destination in the queue.
         * - `DESTINATION` -- FleetIQ prioritizes based on the order that destinations are listed in the queue configuration.
         * - `LOCATION` -- FleetIQ prioritizes based on the provided order of locations, as defined in `LocationOrder` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-gamesessionqueue-priorityconfiguration.html#cfn-gamelift-gamesessionqueue-priorityconfiguration-priorityorder
         */
        readonly priorityOrder?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `PriorityConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `PriorityConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnGameSessionQueue_PriorityConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('locationOrder', cdk.listValidator(cdk.validateString))(properties.locationOrder));
    errors.collect(cdk.propertyValidator('priorityOrder', cdk.listValidator(cdk.validateString))(properties.priorityOrder));
    return errors.wrap('supplied properties not correct for "PriorityConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::GameSessionQueue.PriorityConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `PriorityConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::GameSessionQueue.PriorityConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnGameSessionQueuePriorityConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGameSessionQueue_PriorityConfigurationPropertyValidator(properties).assertSuccess();
    return {
        LocationOrder: cdk.listMapper(cdk.stringToCloudFormation)(properties.locationOrder),
        PriorityOrder: cdk.listMapper(cdk.stringToCloudFormation)(properties.priorityOrder),
    };
}

// @ts-ignore TS6133
function CfnGameSessionQueuePriorityConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGameSessionQueue.PriorityConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGameSessionQueue.PriorityConfigurationProperty>();
    ret.addPropertyResult('locationOrder', 'LocationOrder', properties.LocationOrder != null ? cfn_parse.FromCloudFormation.getStringArray(properties.LocationOrder) : undefined);
    ret.addPropertyResult('priorityOrder', 'PriorityOrder', properties.PriorityOrder != null ? cfn_parse.FromCloudFormation.getStringArray(properties.PriorityOrder) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnMatchmakingConfiguration`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html
 */
export interface CfnMatchmakingConfigurationProps {

    /**
     * A flag that determines whether a match that was created with this configuration must be accepted by the matched players. To require acceptance, set to `TRUE` . With this option enabled, matchmaking tickets use the status `REQUIRES_ACCEPTANCE` to indicate when a completed potential match is waiting for player acceptance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-acceptancerequired
     */
    readonly acceptanceRequired: boolean | cdk.IResolvable;

    /**
     * A unique identifier for the matchmaking configuration. This name is used to identify the configuration associated with a matchmaking request or ticket.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-name
     */
    readonly name: string;

    /**
     * The maximum duration, in seconds, that a matchmaking ticket can remain in process before timing out. Requests that fail due to timing out can be resubmitted as needed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-requesttimeoutseconds
     */
    readonly requestTimeoutSeconds: number;

    /**
     * A unique identifier for the matchmaking rule set to use with this configuration. You can use either the rule set name or ARN value. A matchmaking configuration can only use rule sets that are defined in the same Region.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-rulesetname
     */
    readonly ruleSetName: string;

    /**
     * The length of time (in seconds) to wait for players to accept a proposed match, if acceptance is required.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-acceptancetimeoutseconds
     */
    readonly acceptanceTimeoutSeconds?: number;

    /**
     * The number of player slots in a match to keep open for future players. For example, if the configuration's rule set specifies a match for a single 12-person team, and the additional player count is set to 2, only 10 players are selected for the match. This parameter is not used if `FlexMatchMode` is set to `STANDALONE` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-additionalplayercount
     */
    readonly additionalPlayerCount?: number;

    /**
     * The method used to backfill game sessions that are created with this matchmaking configuration. Specify `MANUAL` when your game manages backfill requests manually or does not use the match backfill feature. Specify `AUTOMATIC` to have GameLift create a `StartMatchBackfill` request whenever a game session has one or more open slots. Learn more about manual and automatic backfill in [Backfill Existing Games with FlexMatch](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-backfill.html) . Automatic backfill is not available when `FlexMatchMode` is set to `STANDALONE` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-backfillmode
     */
    readonly backfillMode?: string;

    /**
     * Information to add to all events related to the matchmaking configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-customeventdata
     */
    readonly customEventData?: string;

    /**
     * A descriptive label that is associated with matchmaking configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-description
     */
    readonly description?: string;

    /**
     * Indicates whether this matchmaking configuration is being used with GameLift hosting or as a standalone matchmaking solution.
     *
     * - *STANDALONE* - FlexMatch forms matches and returns match information, including players and team assignments, in a [MatchmakingSucceeded](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-events.html#match-events-matchmakingsucceeded) event.
     * - *WITH_QUEUE* - FlexMatch forms matches and uses the specified GameLift queue to start a game session for the match.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-flexmatchmode
     */
    readonly flexMatchMode?: string;

    /**
     * A set of custom properties for a game session, formatted as key-value pairs. These properties are passed to a game server process with a request to start a new game session. See [Start a Game Session](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-sdk-server-api.html#gamelift-sdk-server-startsession) . This parameter is not used if `FlexMatchMode` is set to `STANDALONE` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-gameproperties
     */
    readonly gameProperties?: Array<CfnMatchmakingConfiguration.GamePropertyProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A set of custom game session properties, formatted as a single string value. This data is passed to a game server process with a request to start a new game session. See [Start a Game Session](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-sdk-server-api.html#gamelift-sdk-server-startsession) . This parameter is not used if `FlexMatchMode` is set to `STANDALONE` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-gamesessiondata
     */
    readonly gameSessionData?: string;

    /**
     * The Amazon Resource Name ( [ARN](https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-arn-format.html) ) that is assigned to a GameLift game session queue resource and uniquely identifies it. ARNs are unique across all Regions. Format is `arn:aws:gamelift:<region>::gamesessionqueue/<queue name>` . Queues can be located in any Region. Queues are used to start new GameLift-hosted game sessions for matches that are created with this matchmaking configuration. If `FlexMatchMode` is set to `STANDALONE` , do not set this parameter.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-gamesessionqueuearns
     */
    readonly gameSessionQueueArns?: string[];

    /**
     * An SNS topic ARN that is set up to receive matchmaking notifications. See [Setting up notifications for matchmaking](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-notification.html) for more information.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-notificationtarget
     */
    readonly notificationTarget?: string;

    /**
     * A list of labels to assign to the new matchmaking configuration resource. Tags are developer-defined key-value pairs. Tagging AWS resources are useful for resource management, access management and cost allocation. For more information, see [Tagging AWS Resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) in the *AWS General Reference* . Once the resource is created, you can use TagResource, UntagResource, and ListTagsForResource to add, remove, and view tags. The maximum tag limit may be lower than stated. See the AWS General Reference for actual tagging limits.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnMatchmakingConfigurationProps`
 *
 * @param properties - the TypeScript properties of a `CfnMatchmakingConfigurationProps`
 *
 * @returns the result of the validation.
 */
function CfnMatchmakingConfigurationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('acceptanceRequired', cdk.requiredValidator)(properties.acceptanceRequired));
    errors.collect(cdk.propertyValidator('acceptanceRequired', cdk.validateBoolean)(properties.acceptanceRequired));
    errors.collect(cdk.propertyValidator('acceptanceTimeoutSeconds', cdk.validateNumber)(properties.acceptanceTimeoutSeconds));
    errors.collect(cdk.propertyValidator('additionalPlayerCount', cdk.validateNumber)(properties.additionalPlayerCount));
    errors.collect(cdk.propertyValidator('backfillMode', cdk.validateString)(properties.backfillMode));
    errors.collect(cdk.propertyValidator('customEventData', cdk.validateString)(properties.customEventData));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('flexMatchMode', cdk.validateString)(properties.flexMatchMode));
    errors.collect(cdk.propertyValidator('gameProperties', cdk.listValidator(CfnMatchmakingConfiguration_GamePropertyPropertyValidator))(properties.gameProperties));
    errors.collect(cdk.propertyValidator('gameSessionData', cdk.validateString)(properties.gameSessionData));
    errors.collect(cdk.propertyValidator('gameSessionQueueArns', cdk.listValidator(cdk.validateString))(properties.gameSessionQueueArns));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('notificationTarget', cdk.validateString)(properties.notificationTarget));
    errors.collect(cdk.propertyValidator('requestTimeoutSeconds', cdk.requiredValidator)(properties.requestTimeoutSeconds));
    errors.collect(cdk.propertyValidator('requestTimeoutSeconds', cdk.validateNumber)(properties.requestTimeoutSeconds));
    errors.collect(cdk.propertyValidator('ruleSetName', cdk.requiredValidator)(properties.ruleSetName));
    errors.collect(cdk.propertyValidator('ruleSetName', cdk.validateString)(properties.ruleSetName));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnMatchmakingConfigurationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::MatchmakingConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CfnMatchmakingConfigurationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::MatchmakingConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnMatchmakingConfigurationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMatchmakingConfigurationPropsValidator(properties).assertSuccess();
    return {
        AcceptanceRequired: cdk.booleanToCloudFormation(properties.acceptanceRequired),
        Name: cdk.stringToCloudFormation(properties.name),
        RequestTimeoutSeconds: cdk.numberToCloudFormation(properties.requestTimeoutSeconds),
        RuleSetName: cdk.stringToCloudFormation(properties.ruleSetName),
        AcceptanceTimeoutSeconds: cdk.numberToCloudFormation(properties.acceptanceTimeoutSeconds),
        AdditionalPlayerCount: cdk.numberToCloudFormation(properties.additionalPlayerCount),
        BackfillMode: cdk.stringToCloudFormation(properties.backfillMode),
        CustomEventData: cdk.stringToCloudFormation(properties.customEventData),
        Description: cdk.stringToCloudFormation(properties.description),
        FlexMatchMode: cdk.stringToCloudFormation(properties.flexMatchMode),
        GameProperties: cdk.listMapper(cfnMatchmakingConfigurationGamePropertyPropertyToCloudFormation)(properties.gameProperties),
        GameSessionData: cdk.stringToCloudFormation(properties.gameSessionData),
        GameSessionQueueArns: cdk.listMapper(cdk.stringToCloudFormation)(properties.gameSessionQueueArns),
        NotificationTarget: cdk.stringToCloudFormation(properties.notificationTarget),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnMatchmakingConfigurationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMatchmakingConfigurationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMatchmakingConfigurationProps>();
    ret.addPropertyResult('acceptanceRequired', 'AcceptanceRequired', cfn_parse.FromCloudFormation.getBoolean(properties.AcceptanceRequired));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('requestTimeoutSeconds', 'RequestTimeoutSeconds', cfn_parse.FromCloudFormation.getNumber(properties.RequestTimeoutSeconds));
    ret.addPropertyResult('ruleSetName', 'RuleSetName', cfn_parse.FromCloudFormation.getString(properties.RuleSetName));
    ret.addPropertyResult('acceptanceTimeoutSeconds', 'AcceptanceTimeoutSeconds', properties.AcceptanceTimeoutSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.AcceptanceTimeoutSeconds) : undefined);
    ret.addPropertyResult('additionalPlayerCount', 'AdditionalPlayerCount', properties.AdditionalPlayerCount != null ? cfn_parse.FromCloudFormation.getNumber(properties.AdditionalPlayerCount) : undefined);
    ret.addPropertyResult('backfillMode', 'BackfillMode', properties.BackfillMode != null ? cfn_parse.FromCloudFormation.getString(properties.BackfillMode) : undefined);
    ret.addPropertyResult('customEventData', 'CustomEventData', properties.CustomEventData != null ? cfn_parse.FromCloudFormation.getString(properties.CustomEventData) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('flexMatchMode', 'FlexMatchMode', properties.FlexMatchMode != null ? cfn_parse.FromCloudFormation.getString(properties.FlexMatchMode) : undefined);
    ret.addPropertyResult('gameProperties', 'GameProperties', properties.GameProperties != null ? cfn_parse.FromCloudFormation.getArray(CfnMatchmakingConfigurationGamePropertyPropertyFromCloudFormation)(properties.GameProperties) : undefined);
    ret.addPropertyResult('gameSessionData', 'GameSessionData', properties.GameSessionData != null ? cfn_parse.FromCloudFormation.getString(properties.GameSessionData) : undefined);
    ret.addPropertyResult('gameSessionQueueArns', 'GameSessionQueueArns', properties.GameSessionQueueArns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.GameSessionQueueArns) : undefined);
    ret.addPropertyResult('notificationTarget', 'NotificationTarget', properties.NotificationTarget != null ? cfn_parse.FromCloudFormation.getString(properties.NotificationTarget) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GameLift::MatchmakingConfiguration`
 *
 * The `AWS::GameLift::MatchmakingConfiguration` resource defines a new matchmaking configuration for use with FlexMatch. Whether you're using FlexMatch with GameLift hosting or as a standalone matchmaking service, the matchmaking configuration sets out rules for matching players and forming teams. If you're using GameLift hosting, it also defines how to start game sessions for each match. Your matchmaking system can use multiple configurations to handle different game scenarios. All matchmaking requests identify the matchmaking configuration to use and provide player attributes that are consistent with that configuration.
 *
 * @cloudformationResource AWS::GameLift::MatchmakingConfiguration
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html
 */
export class CfnMatchmakingConfiguration extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GameLift::MatchmakingConfiguration";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnMatchmakingConfiguration {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnMatchmakingConfigurationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnMatchmakingConfiguration(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The unique Amazon Resource Name (ARN) for the `MatchmakingConfiguration` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The `MatchmakingConfiguration` name, which is unique.
     * @cloudformationAttribute Name
     */
    public readonly attrName: string;

    /**
     * A flag that determines whether a match that was created with this configuration must be accepted by the matched players. To require acceptance, set to `TRUE` . With this option enabled, matchmaking tickets use the status `REQUIRES_ACCEPTANCE` to indicate when a completed potential match is waiting for player acceptance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-acceptancerequired
     */
    public acceptanceRequired: boolean | cdk.IResolvable;

    /**
     * A unique identifier for the matchmaking configuration. This name is used to identify the configuration associated with a matchmaking request or ticket.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-name
     */
    public name: string;

    /**
     * The maximum duration, in seconds, that a matchmaking ticket can remain in process before timing out. Requests that fail due to timing out can be resubmitted as needed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-requesttimeoutseconds
     */
    public requestTimeoutSeconds: number;

    /**
     * A unique identifier for the matchmaking rule set to use with this configuration. You can use either the rule set name or ARN value. A matchmaking configuration can only use rule sets that are defined in the same Region.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-rulesetname
     */
    public ruleSetName: string;

    /**
     * The length of time (in seconds) to wait for players to accept a proposed match, if acceptance is required.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-acceptancetimeoutseconds
     */
    public acceptanceTimeoutSeconds: number | undefined;

    /**
     * The number of player slots in a match to keep open for future players. For example, if the configuration's rule set specifies a match for a single 12-person team, and the additional player count is set to 2, only 10 players are selected for the match. This parameter is not used if `FlexMatchMode` is set to `STANDALONE` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-additionalplayercount
     */
    public additionalPlayerCount: number | undefined;

    /**
     * The method used to backfill game sessions that are created with this matchmaking configuration. Specify `MANUAL` when your game manages backfill requests manually or does not use the match backfill feature. Specify `AUTOMATIC` to have GameLift create a `StartMatchBackfill` request whenever a game session has one or more open slots. Learn more about manual and automatic backfill in [Backfill Existing Games with FlexMatch](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-backfill.html) . Automatic backfill is not available when `FlexMatchMode` is set to `STANDALONE` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-backfillmode
     */
    public backfillMode: string | undefined;

    /**
     * Information to add to all events related to the matchmaking configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-customeventdata
     */
    public customEventData: string | undefined;

    /**
     * A descriptive label that is associated with matchmaking configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-description
     */
    public description: string | undefined;

    /**
     * Indicates whether this matchmaking configuration is being used with GameLift hosting or as a standalone matchmaking solution.
     *
     * - *STANDALONE* - FlexMatch forms matches and returns match information, including players and team assignments, in a [MatchmakingSucceeded](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-events.html#match-events-matchmakingsucceeded) event.
     * - *WITH_QUEUE* - FlexMatch forms matches and uses the specified GameLift queue to start a game session for the match.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-flexmatchmode
     */
    public flexMatchMode: string | undefined;

    /**
     * A set of custom properties for a game session, formatted as key-value pairs. These properties are passed to a game server process with a request to start a new game session. See [Start a Game Session](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-sdk-server-api.html#gamelift-sdk-server-startsession) . This parameter is not used if `FlexMatchMode` is set to `STANDALONE` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-gameproperties
     */
    public gameProperties: Array<CfnMatchmakingConfiguration.GamePropertyProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * A set of custom game session properties, formatted as a single string value. This data is passed to a game server process with a request to start a new game session. See [Start a Game Session](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-sdk-server-api.html#gamelift-sdk-server-startsession) . This parameter is not used if `FlexMatchMode` is set to `STANDALONE` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-gamesessiondata
     */
    public gameSessionData: string | undefined;

    /**
     * The Amazon Resource Name ( [ARN](https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-arn-format.html) ) that is assigned to a GameLift game session queue resource and uniquely identifies it. ARNs are unique across all Regions. Format is `arn:aws:gamelift:<region>::gamesessionqueue/<queue name>` . Queues can be located in any Region. Queues are used to start new GameLift-hosted game sessions for matches that are created with this matchmaking configuration. If `FlexMatchMode` is set to `STANDALONE` , do not set this parameter.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-gamesessionqueuearns
     */
    public gameSessionQueueArns: string[] | undefined;

    /**
     * An SNS topic ARN that is set up to receive matchmaking notifications. See [Setting up notifications for matchmaking](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-notification.html) for more information.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-notificationtarget
     */
    public notificationTarget: string | undefined;

    /**
     * A list of labels to assign to the new matchmaking configuration resource. Tags are developer-defined key-value pairs. Tagging AWS resources are useful for resource management, access management and cost allocation. For more information, see [Tagging AWS Resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) in the *AWS General Reference* . Once the resource is created, you can use TagResource, UntagResource, and ListTagsForResource to add, remove, and view tags. The maximum tag limit may be lower than stated. See the AWS General Reference for actual tagging limits.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingconfiguration.html#cfn-gamelift-matchmakingconfiguration-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::GameLift::MatchmakingConfiguration`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnMatchmakingConfigurationProps) {
        super(scope, id, { type: CfnMatchmakingConfiguration.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'acceptanceRequired', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'requestTimeoutSeconds', this);
        cdk.requireProperty(props, 'ruleSetName', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrName = cdk.Token.asString(this.getAtt('Name'));

        this.acceptanceRequired = props.acceptanceRequired;
        this.name = props.name;
        this.requestTimeoutSeconds = props.requestTimeoutSeconds;
        this.ruleSetName = props.ruleSetName;
        this.acceptanceTimeoutSeconds = props.acceptanceTimeoutSeconds;
        this.additionalPlayerCount = props.additionalPlayerCount;
        this.backfillMode = props.backfillMode;
        this.customEventData = props.customEventData;
        this.description = props.description;
        this.flexMatchMode = props.flexMatchMode;
        this.gameProperties = props.gameProperties;
        this.gameSessionData = props.gameSessionData;
        this.gameSessionQueueArns = props.gameSessionQueueArns;
        this.notificationTarget = props.notificationTarget;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::GameLift::MatchmakingConfiguration", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnMatchmakingConfiguration.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            acceptanceRequired: this.acceptanceRequired,
            name: this.name,
            requestTimeoutSeconds: this.requestTimeoutSeconds,
            ruleSetName: this.ruleSetName,
            acceptanceTimeoutSeconds: this.acceptanceTimeoutSeconds,
            additionalPlayerCount: this.additionalPlayerCount,
            backfillMode: this.backfillMode,
            customEventData: this.customEventData,
            description: this.description,
            flexMatchMode: this.flexMatchMode,
            gameProperties: this.gameProperties,
            gameSessionData: this.gameSessionData,
            gameSessionQueueArns: this.gameSessionQueueArns,
            notificationTarget: this.notificationTarget,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnMatchmakingConfigurationPropsToCloudFormation(props);
    }
}

export namespace CfnMatchmakingConfiguration {
    /**
     * Set of key-value pairs that contain information about a game session. When included in a game session request, these properties communicate details to be used when setting up the new game session. For example, a game property might specify a game mode, level, or map. Game properties are passed to the game server process when initiating a new game session. For more information, see the [GameLift Developer Guide](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-sdk-client-api.html#gamelift-sdk-client-api-create) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-matchmakingconfiguration-gameproperty.html
     */
    export interface GamePropertyProperty {
        /**
         * The game property identifier.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-matchmakingconfiguration-gameproperty.html#cfn-gamelift-matchmakingconfiguration-gameproperty-key
         */
        readonly key: string;
        /**
         * The game property value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-matchmakingconfiguration-gameproperty.html#cfn-gamelift-matchmakingconfiguration-gameproperty-value
         */
        readonly value: string;
    }
}

/**
 * Determine whether the given properties match those of a `GamePropertyProperty`
 *
 * @param properties - the TypeScript properties of a `GamePropertyProperty`
 *
 * @returns the result of the validation.
 */
function CfnMatchmakingConfiguration_GamePropertyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('key', cdk.requiredValidator)(properties.key));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "GamePropertyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::MatchmakingConfiguration.GameProperty` resource
 *
 * @param properties - the TypeScript properties of a `GamePropertyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::MatchmakingConfiguration.GameProperty` resource.
 */
// @ts-ignore TS6133
function cfnMatchmakingConfigurationGamePropertyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMatchmakingConfiguration_GamePropertyPropertyValidator(properties).assertSuccess();
    return {
        Key: cdk.stringToCloudFormation(properties.key),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnMatchmakingConfigurationGamePropertyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMatchmakingConfiguration.GamePropertyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMatchmakingConfiguration.GamePropertyProperty>();
    ret.addPropertyResult('key', 'Key', cfn_parse.FromCloudFormation.getString(properties.Key));
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnMatchmakingRuleSet`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingruleset.html
 */
export interface CfnMatchmakingRuleSetProps {

    /**
     * A unique identifier for the matchmaking rule set. A matchmaking configuration identifies the rule set it uses by this name value. Note that the rule set name is different from the optional `name` field in the rule set body.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingruleset.html#cfn-gamelift-matchmakingruleset-name
     */
    readonly name: string;

    /**
     * A collection of matchmaking rules, formatted as a JSON string. Comments are not allowed in JSON, but most elements support a description field.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingruleset.html#cfn-gamelift-matchmakingruleset-rulesetbody
     */
    readonly ruleSetBody: string;

    /**
     * A list of labels to assign to the new matchmaking rule set resource. Tags are developer-defined key-value pairs. Tagging AWS resources are useful for resource management, access management and cost allocation. For more information, see [Tagging AWS Resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) in the *AWS General Reference* . Once the resource is created, you can use TagResource, UntagResource, and ListTagsForResource to add, remove, and view tags. The maximum tag limit may be lower than stated. See the AWS General Reference for actual tagging limits.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingruleset.html#cfn-gamelift-matchmakingruleset-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnMatchmakingRuleSetProps`
 *
 * @param properties - the TypeScript properties of a `CfnMatchmakingRuleSetProps`
 *
 * @returns the result of the validation.
 */
function CfnMatchmakingRuleSetPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('ruleSetBody', cdk.requiredValidator)(properties.ruleSetBody));
    errors.collect(cdk.propertyValidator('ruleSetBody', cdk.validateString)(properties.ruleSetBody));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnMatchmakingRuleSetProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::MatchmakingRuleSet` resource
 *
 * @param properties - the TypeScript properties of a `CfnMatchmakingRuleSetProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::MatchmakingRuleSet` resource.
 */
// @ts-ignore TS6133
function cfnMatchmakingRuleSetPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMatchmakingRuleSetPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        RuleSetBody: cdk.stringToCloudFormation(properties.ruleSetBody),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnMatchmakingRuleSetPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMatchmakingRuleSetProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMatchmakingRuleSetProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('ruleSetBody', 'RuleSetBody', cfn_parse.FromCloudFormation.getString(properties.RuleSetBody));
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GameLift::MatchmakingRuleSet`
 *
 * Creates a new rule set for FlexMatch matchmaking. A rule set describes the type of match to create, such as the number and size of teams. It also sets the parameters for acceptable player matches, such as minimum skill level or character type.
 *
 * To create a matchmaking rule set, provide unique rule set name and the rule set body in JSON format. Rule sets must be defined in the same Region as the matchmaking configuration they are used with.
 *
 * Since matchmaking rule sets cannot be edited, it is a good idea to check the rule set syntax.
 *
 * *Learn more*
 *
 * - [Build a rule set](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-rulesets.html)
 * - [Design a matchmaker](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-configuration.html)
 * - [Matchmaking with FlexMatch](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-intro.html)
 *
 * @cloudformationResource AWS::GameLift::MatchmakingRuleSet
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingruleset.html
 */
export class CfnMatchmakingRuleSet extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GameLift::MatchmakingRuleSet";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnMatchmakingRuleSet {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnMatchmakingRuleSetPropsFromCloudFormation(resourceProperties);
        const ret = new CfnMatchmakingRuleSet(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The unique Amazon Resource Name (ARN) assigned to the rule set.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The unique name of the rule set.
     * @cloudformationAttribute Name
     */
    public readonly attrName: string;

    /**
     * A unique identifier for the matchmaking rule set. A matchmaking configuration identifies the rule set it uses by this name value. Note that the rule set name is different from the optional `name` field in the rule set body.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingruleset.html#cfn-gamelift-matchmakingruleset-name
     */
    public name: string;

    /**
     * A collection of matchmaking rules, formatted as a JSON string. Comments are not allowed in JSON, but most elements support a description field.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingruleset.html#cfn-gamelift-matchmakingruleset-rulesetbody
     */
    public ruleSetBody: string;

    /**
     * A list of labels to assign to the new matchmaking rule set resource. Tags are developer-defined key-value pairs. Tagging AWS resources are useful for resource management, access management and cost allocation. For more information, see [Tagging AWS Resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) in the *AWS General Reference* . Once the resource is created, you can use TagResource, UntagResource, and ListTagsForResource to add, remove, and view tags. The maximum tag limit may be lower than stated. See the AWS General Reference for actual tagging limits.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-matchmakingruleset.html#cfn-gamelift-matchmakingruleset-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::GameLift::MatchmakingRuleSet`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnMatchmakingRuleSetProps) {
        super(scope, id, { type: CfnMatchmakingRuleSet.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'ruleSetBody', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrName = cdk.Token.asString(this.getAtt('Name'));

        this.name = props.name;
        this.ruleSetBody = props.ruleSetBody;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::GameLift::MatchmakingRuleSet", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnMatchmakingRuleSet.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            ruleSetBody: this.ruleSetBody,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnMatchmakingRuleSetPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnScript`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-script.html
 */
export interface CfnScriptProps {

    /**
     * The location of the Amazon S3 bucket where a zipped file containing your Realtime scripts is stored. The storage location must specify the Amazon S3 bucket name, the zip file name (the "key"), and a role ARN that allows Amazon GameLift to access the Amazon S3 storage location. The S3 bucket must be in the same Region where you want to create a new script. By default, Amazon GameLift uploads the latest version of the zip file; if you have S3 object versioning turned on, you can use the `ObjectVersion` parameter to specify an earlier version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-script.html#cfn-gamelift-script-storagelocation
     */
    readonly storageLocation: CfnScript.S3LocationProperty | cdk.IResolvable;

    /**
     * A descriptive label that is associated with a script. Script names do not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-script.html#cfn-gamelift-script-name
     */
    readonly name?: string;

    /**
     * A list of labels to assign to the new script resource. Tags are developer-defined key-value pairs. Tagging AWS resources are useful for resource management, access management and cost allocation. For more information, see [Tagging AWS Resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) in the *AWS General Reference* . Once the resource is created, you can use TagResource, UntagResource, and ListTagsForResource to add, remove, and view tags. The maximum tag limit may be lower than stated. See the AWS General Reference for actual tagging limits.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-script.html#cfn-gamelift-script-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The version that is associated with a build or script. Version strings do not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-script.html#cfn-gamelift-script-version
     */
    readonly version?: string;
}

/**
 * Determine whether the given properties match those of a `CfnScriptProps`
 *
 * @param properties - the TypeScript properties of a `CfnScriptProps`
 *
 * @returns the result of the validation.
 */
function CfnScriptPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('storageLocation', cdk.requiredValidator)(properties.storageLocation));
    errors.collect(cdk.propertyValidator('storageLocation', CfnScript_S3LocationPropertyValidator)(properties.storageLocation));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('version', cdk.validateString)(properties.version));
    return errors.wrap('supplied properties not correct for "CfnScriptProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::Script` resource
 *
 * @param properties - the TypeScript properties of a `CfnScriptProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::Script` resource.
 */
// @ts-ignore TS6133
function cfnScriptPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScriptPropsValidator(properties).assertSuccess();
    return {
        StorageLocation: cfnScriptS3LocationPropertyToCloudFormation(properties.storageLocation),
        Name: cdk.stringToCloudFormation(properties.name),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        Version: cdk.stringToCloudFormation(properties.version),
    };
}

// @ts-ignore TS6133
function CfnScriptPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScriptProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScriptProps>();
    ret.addPropertyResult('storageLocation', 'StorageLocation', CfnScriptS3LocationPropertyFromCloudFormation(properties.StorageLocation));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('version', 'Version', properties.Version != null ? cfn_parse.FromCloudFormation.getString(properties.Version) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GameLift::Script`
 *
 * The `AWS::GameLift::Script` resource creates a new script record for your Realtime Servers script. Realtime scripts are JavaScript that provide configuration settings and optional custom game logic for your game. The script is deployed when you create a Realtime Servers fleet to host your game sessions. Script logic is executed during an active game session.
 *
 * @cloudformationResource AWS::GameLift::Script
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-script.html
 */
export class CfnScript extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GameLift::Script";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnScript {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnScriptPropsFromCloudFormation(resourceProperties);
        const ret = new CfnScript(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The unique Amazon Resource Name (ARN) for the script.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * A unique identifier for a Realtime script.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The location of the Amazon S3 bucket where a zipped file containing your Realtime scripts is stored. The storage location must specify the Amazon S3 bucket name, the zip file name (the "key"), and a role ARN that allows Amazon GameLift to access the Amazon S3 storage location. The S3 bucket must be in the same Region where you want to create a new script. By default, Amazon GameLift uploads the latest version of the zip file; if you have S3 object versioning turned on, you can use the `ObjectVersion` parameter to specify an earlier version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-script.html#cfn-gamelift-script-storagelocation
     */
    public storageLocation: CfnScript.S3LocationProperty | cdk.IResolvable;

    /**
     * A descriptive label that is associated with a script. Script names do not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-script.html#cfn-gamelift-script-name
     */
    public name: string | undefined;

    /**
     * A list of labels to assign to the new script resource. Tags are developer-defined key-value pairs. Tagging AWS resources are useful for resource management, access management and cost allocation. For more information, see [Tagging AWS Resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) in the *AWS General Reference* . Once the resource is created, you can use TagResource, UntagResource, and ListTagsForResource to add, remove, and view tags. The maximum tag limit may be lower than stated. See the AWS General Reference for actual tagging limits.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-script.html#cfn-gamelift-script-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The version that is associated with a build or script. Version strings do not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-script.html#cfn-gamelift-script-version
     */
    public version: string | undefined;

    /**
     * Create a new `AWS::GameLift::Script`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnScriptProps) {
        super(scope, id, { type: CfnScript.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'storageLocation', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.storageLocation = props.storageLocation;
        this.name = props.name;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::GameLift::Script", props.tags, { tagPropertyName: 'tags' });
        this.version = props.version;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnScript.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            storageLocation: this.storageLocation,
            name: this.name,
            tags: this.tags.renderTags(),
            version: this.version,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnScriptPropsToCloudFormation(props);
    }
}

export namespace CfnScript {
    /**
     * The location in Amazon S3 where build or script files can be stored for access by Amazon GameLift.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-script-s3location.html
     */
    export interface S3LocationProperty {
        /**
         * An Amazon S3 bucket identifier. This is the name of the S3 bucket.
         *
         * > GameLift currently does not support uploading from Amazon S3 buckets with names that contain a dot (.).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-script-s3location.html#cfn-gamelift-script-s3location-bucket
         */
        readonly bucket: string;
        /**
         * The name of the zip file that contains the build files or script files.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-script-s3location.html#cfn-gamelift-script-s3location-key
         */
        readonly key: string;
        /**
         * The version of the file, if object versioning is turned on for the bucket. Amazon GameLift uses this information when retrieving files from an S3 bucket that you own. Use this parameter to specify a specific version of the file. If not set, the latest version of the file is retrieved.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-script-s3location.html#cfn-gamelift-script-s3location-objectversion
         */
        readonly objectVersion?: string;
        /**
         * The Amazon Resource Name ( [ARN](https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-arn-format.html) ) for an IAM role that allows Amazon GameLift to access the S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-gamelift-script-s3location.html#cfn-gamelift-script-s3location-rolearn
         */
        readonly roleArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3LocationProperty`
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the result of the validation.
 */
function CfnScript_S3LocationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucket', cdk.requiredValidator)(properties.bucket));
    errors.collect(cdk.propertyValidator('bucket', cdk.validateString)(properties.bucket));
    errors.collect(cdk.propertyValidator('key', cdk.requiredValidator)(properties.key));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('objectVersion', cdk.validateString)(properties.objectVersion));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "S3LocationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GameLift::Script.S3Location` resource
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GameLift::Script.S3Location` resource.
 */
// @ts-ignore TS6133
function cfnScriptS3LocationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScript_S3LocationPropertyValidator(properties).assertSuccess();
    return {
        Bucket: cdk.stringToCloudFormation(properties.bucket),
        Key: cdk.stringToCloudFormation(properties.key),
        ObjectVersion: cdk.stringToCloudFormation(properties.objectVersion),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnScriptS3LocationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScript.S3LocationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScript.S3LocationProperty>();
    ret.addPropertyResult('bucket', 'Bucket', cfn_parse.FromCloudFormation.getString(properties.Bucket));
    ret.addPropertyResult('key', 'Key', cfn_parse.FromCloudFormation.getString(properties.Key));
    ret.addPropertyResult('objectVersion', 'ObjectVersion', properties.ObjectVersion != null ? cfn_parse.FromCloudFormation.getString(properties.ObjectVersion) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
