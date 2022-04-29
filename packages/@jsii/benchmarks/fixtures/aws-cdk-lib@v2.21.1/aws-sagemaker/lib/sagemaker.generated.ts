// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.982Z","fingerprint":"is0TzJDj+xHpH8GNRyKNGX+xju+X+8eciv4MUX6MSXg="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnApp`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html
 */
export interface CfnAppProps {

    /**
     * The name of the app.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html#cfn-sagemaker-app-appname
     */
    readonly appName: string;

    /**
     * The type of app.
     *
     * *Allowed Values* : `JupyterServer | KernelGateway | RSessionGateway | RStudioServerPro | TensorBoard | Canvas`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html#cfn-sagemaker-app-apptype
     */
    readonly appType: string;

    /**
     * The domain ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html#cfn-sagemaker-app-domainid
     */
    readonly domainId: string;

    /**
     * The user profile name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html#cfn-sagemaker-app-userprofilename
     */
    readonly userProfileName: string;

    /**
     * Specifies the ARNs of a SageMaker image and SageMaker image version, and the instance type that the version runs on.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html#cfn-sagemaker-app-resourcespec
     */
    readonly resourceSpec?: CfnApp.ResourceSpecProperty | cdk.IResolvable;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html#cfn-sagemaker-app-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnAppProps`
 *
 * @param properties - the TypeScript properties of a `CfnAppProps`
 *
 * @returns the result of the validation.
 */
function CfnAppPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('appName', cdk.requiredValidator)(properties.appName));
    errors.collect(cdk.propertyValidator('appName', cdk.validateString)(properties.appName));
    errors.collect(cdk.propertyValidator('appType', cdk.requiredValidator)(properties.appType));
    errors.collect(cdk.propertyValidator('appType', cdk.validateString)(properties.appType));
    errors.collect(cdk.propertyValidator('domainId', cdk.requiredValidator)(properties.domainId));
    errors.collect(cdk.propertyValidator('domainId', cdk.validateString)(properties.domainId));
    errors.collect(cdk.propertyValidator('resourceSpec', CfnApp_ResourceSpecPropertyValidator)(properties.resourceSpec));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('userProfileName', cdk.requiredValidator)(properties.userProfileName));
    errors.collect(cdk.propertyValidator('userProfileName', cdk.validateString)(properties.userProfileName));
    return errors.wrap('supplied properties not correct for "CfnAppProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::App` resource
 *
 * @param properties - the TypeScript properties of a `CfnAppProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::App` resource.
 */
// @ts-ignore TS6133
function cfnAppPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAppPropsValidator(properties).assertSuccess();
    return {
        AppName: cdk.stringToCloudFormation(properties.appName),
        AppType: cdk.stringToCloudFormation(properties.appType),
        DomainId: cdk.stringToCloudFormation(properties.domainId),
        UserProfileName: cdk.stringToCloudFormation(properties.userProfileName),
        ResourceSpec: cfnAppResourceSpecPropertyToCloudFormation(properties.resourceSpec),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnAppPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAppProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAppProps>();
    ret.addPropertyResult('appName', 'AppName', cfn_parse.FromCloudFormation.getString(properties.AppName));
    ret.addPropertyResult('appType', 'AppType', cfn_parse.FromCloudFormation.getString(properties.AppType));
    ret.addPropertyResult('domainId', 'DomainId', cfn_parse.FromCloudFormation.getString(properties.DomainId));
    ret.addPropertyResult('userProfileName', 'UserProfileName', cfn_parse.FromCloudFormation.getString(properties.UserProfileName));
    ret.addPropertyResult('resourceSpec', 'ResourceSpec', properties.ResourceSpec != null ? CfnAppResourceSpecPropertyFromCloudFormation(properties.ResourceSpec) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::App`
 *
 * Creates a running app for the specified UserProfile. Supported apps are `JupyterServer` and `KernelGateway` . This operation is automatically invoked by Amazon SageMaker Studio upon access to the associated Domain, and when new kernel configurations are selected by the user. A user may have multiple Apps active simultaneously.
 *
 * @cloudformationResource AWS::SageMaker::App
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html
 */
export class CfnApp extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::App";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnApp {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAppPropsFromCloudFormation(resourceProperties);
        const ret = new CfnApp(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the app, such as `arn:aws:sagemaker:us-west-2:account-id:app/my-app-name` .
     * @cloudformationAttribute AppArn
     */
    public readonly attrAppArn: string;

    /**
     * The name of the app.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html#cfn-sagemaker-app-appname
     */
    public appName: string;

    /**
     * The type of app.
     *
     * *Allowed Values* : `JupyterServer | KernelGateway | RSessionGateway | RStudioServerPro | TensorBoard | Canvas`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html#cfn-sagemaker-app-apptype
     */
    public appType: string;

    /**
     * The domain ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html#cfn-sagemaker-app-domainid
     */
    public domainId: string;

    /**
     * The user profile name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html#cfn-sagemaker-app-userprofilename
     */
    public userProfileName: string;

    /**
     * Specifies the ARNs of a SageMaker image and SageMaker image version, and the instance type that the version runs on.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html#cfn-sagemaker-app-resourcespec
     */
    public resourceSpec: CfnApp.ResourceSpecProperty | cdk.IResolvable | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html#cfn-sagemaker-app-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::App`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAppProps) {
        super(scope, id, { type: CfnApp.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'appName', this);
        cdk.requireProperty(props, 'appType', this);
        cdk.requireProperty(props, 'domainId', this);
        cdk.requireProperty(props, 'userProfileName', this);
        this.attrAppArn = cdk.Token.asString(this.getAtt('AppArn'));

        this.appName = props.appName;
        this.appType = props.appType;
        this.domainId = props.domainId;
        this.userProfileName = props.userProfileName;
        this.resourceSpec = props.resourceSpec;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::App", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnApp.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            appName: this.appName,
            appType: this.appType,
            domainId: this.domainId,
            userProfileName: this.userProfileName,
            resourceSpec: this.resourceSpec,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAppPropsToCloudFormation(props);
    }
}

export namespace CfnApp {
    /**
     * Specifies the ARN's of a SageMaker image and SageMaker image version, and the instance type that the version runs on.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-app-resourcespec.html
     */
    export interface ResourceSpecProperty {
        /**
         * The instance type that the image version runs on.
         *
         * > JupyterServer Apps only support the `system` value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-app-resourcespec.html#cfn-sagemaker-app-resourcespec-instancetype
         */
        readonly instanceType?: string;
        /**
         * The ARN of the SageMaker image that the image version belongs to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-app-resourcespec.html#cfn-sagemaker-app-resourcespec-sagemakerimagearn
         */
        readonly sageMakerImageArn?: string;
        /**
         * The ARN of the image version created on the instance.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-app-resourcespec.html#cfn-sagemaker-app-resourcespec-sagemakerimageversionarn
         */
        readonly sageMakerImageVersionArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ResourceSpecProperty`
 *
 * @param properties - the TypeScript properties of a `ResourceSpecProperty`
 *
 * @returns the result of the validation.
 */
function CfnApp_ResourceSpecPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('sageMakerImageArn', cdk.validateString)(properties.sageMakerImageArn));
    errors.collect(cdk.propertyValidator('sageMakerImageVersionArn', cdk.validateString)(properties.sageMakerImageVersionArn));
    return errors.wrap('supplied properties not correct for "ResourceSpecProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::App.ResourceSpec` resource
 *
 * @param properties - the TypeScript properties of a `ResourceSpecProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::App.ResourceSpec` resource.
 */
// @ts-ignore TS6133
function cfnAppResourceSpecPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApp_ResourceSpecPropertyValidator(properties).assertSuccess();
    return {
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        SageMakerImageArn: cdk.stringToCloudFormation(properties.sageMakerImageArn),
        SageMakerImageVersionArn: cdk.stringToCloudFormation(properties.sageMakerImageVersionArn),
    };
}

// @ts-ignore TS6133
function CfnAppResourceSpecPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApp.ResourceSpecProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApp.ResourceSpecProperty>();
    ret.addPropertyResult('instanceType', 'InstanceType', properties.InstanceType != null ? cfn_parse.FromCloudFormation.getString(properties.InstanceType) : undefined);
    ret.addPropertyResult('sageMakerImageArn', 'SageMakerImageArn', properties.SageMakerImageArn != null ? cfn_parse.FromCloudFormation.getString(properties.SageMakerImageArn) : undefined);
    ret.addPropertyResult('sageMakerImageVersionArn', 'SageMakerImageVersionArn', properties.SageMakerImageVersionArn != null ? cfn_parse.FromCloudFormation.getString(properties.SageMakerImageVersionArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnAppImageConfig`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-appimageconfig.html
 */
export interface CfnAppImageConfigProps {

    /**
     * The name of the AppImageConfig. Must be unique to your account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-appimageconfig.html#cfn-sagemaker-appimageconfig-appimageconfigname
     */
    readonly appImageConfigName: string;

    /**
     * The configuration for the file system and kernels in the SageMaker image.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-appimageconfig.html#cfn-sagemaker-appimageconfig-kernelgatewayimageconfig
     */
    readonly kernelGatewayImageConfig?: CfnAppImageConfig.KernelGatewayImageConfigProperty | cdk.IResolvable;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-appimageconfig.html#cfn-sagemaker-appimageconfig-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnAppImageConfigProps`
 *
 * @param properties - the TypeScript properties of a `CfnAppImageConfigProps`
 *
 * @returns the result of the validation.
 */
function CfnAppImageConfigPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('appImageConfigName', cdk.requiredValidator)(properties.appImageConfigName));
    errors.collect(cdk.propertyValidator('appImageConfigName', cdk.validateString)(properties.appImageConfigName));
    errors.collect(cdk.propertyValidator('kernelGatewayImageConfig', CfnAppImageConfig_KernelGatewayImageConfigPropertyValidator)(properties.kernelGatewayImageConfig));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnAppImageConfigProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::AppImageConfig` resource
 *
 * @param properties - the TypeScript properties of a `CfnAppImageConfigProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::AppImageConfig` resource.
 */
// @ts-ignore TS6133
function cfnAppImageConfigPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAppImageConfigPropsValidator(properties).assertSuccess();
    return {
        AppImageConfigName: cdk.stringToCloudFormation(properties.appImageConfigName),
        KernelGatewayImageConfig: cfnAppImageConfigKernelGatewayImageConfigPropertyToCloudFormation(properties.kernelGatewayImageConfig),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnAppImageConfigPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAppImageConfigProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAppImageConfigProps>();
    ret.addPropertyResult('appImageConfigName', 'AppImageConfigName', cfn_parse.FromCloudFormation.getString(properties.AppImageConfigName));
    ret.addPropertyResult('kernelGatewayImageConfig', 'KernelGatewayImageConfig', properties.KernelGatewayImageConfig != null ? CfnAppImageConfigKernelGatewayImageConfigPropertyFromCloudFormation(properties.KernelGatewayImageConfig) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::AppImageConfig`
 *
 * Creates a configuration for running a SageMaker image as a KernelGateway app. The configuration specifies the Amazon Elastic File System (EFS) storage volume on the image, and a list of the kernels in the image.
 *
 * @cloudformationResource AWS::SageMaker::AppImageConfig
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-appimageconfig.html
 */
export class CfnAppImageConfig extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::AppImageConfig";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAppImageConfig {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAppImageConfigPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAppImageConfig(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the AppImageConfig, such as `arn:aws:sagemaker:us-west-2:account-id:app-image-config/my-app-image-config-name` .
     * @cloudformationAttribute AppImageConfigArn
     */
    public readonly attrAppImageConfigArn: string;

    /**
     * The name of the AppImageConfig. Must be unique to your account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-appimageconfig.html#cfn-sagemaker-appimageconfig-appimageconfigname
     */
    public appImageConfigName: string;

    /**
     * The configuration for the file system and kernels in the SageMaker image.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-appimageconfig.html#cfn-sagemaker-appimageconfig-kernelgatewayimageconfig
     */
    public kernelGatewayImageConfig: CfnAppImageConfig.KernelGatewayImageConfigProperty | cdk.IResolvable | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-appimageconfig.html#cfn-sagemaker-appimageconfig-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::AppImageConfig`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAppImageConfigProps) {
        super(scope, id, { type: CfnAppImageConfig.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'appImageConfigName', this);
        this.attrAppImageConfigArn = cdk.Token.asString(this.getAtt('AppImageConfigArn'));

        this.appImageConfigName = props.appImageConfigName;
        this.kernelGatewayImageConfig = props.kernelGatewayImageConfig;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::AppImageConfig", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAppImageConfig.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            appImageConfigName: this.appImageConfigName,
            kernelGatewayImageConfig: this.kernelGatewayImageConfig,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAppImageConfigPropsToCloudFormation(props);
    }
}

export namespace CfnAppImageConfig {
    /**
     * The Amazon Elastic File System (EFS) storage configuration for a SageMaker image.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-appimageconfig-filesystemconfig.html
     */
    export interface FileSystemConfigProperty {
        /**
         * The default POSIX group ID (GID). If not specified, defaults to `100` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-appimageconfig-filesystemconfig.html#cfn-sagemaker-appimageconfig-filesystemconfig-defaultgid
         */
        readonly defaultGid?: number;
        /**
         * The default POSIX user ID (UID). If not specified, defaults to `1000` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-appimageconfig-filesystemconfig.html#cfn-sagemaker-appimageconfig-filesystemconfig-defaultuid
         */
        readonly defaultUid?: number;
        /**
         * The path within the image to mount the user's EFS home directory. The directory should be empty. If not specified, defaults to * /home/sagemaker-user* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-appimageconfig-filesystemconfig.html#cfn-sagemaker-appimageconfig-filesystemconfig-mountpath
         */
        readonly mountPath?: string;
    }
}

/**
 * Determine whether the given properties match those of a `FileSystemConfigProperty`
 *
 * @param properties - the TypeScript properties of a `FileSystemConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnAppImageConfig_FileSystemConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('defaultGid', cdk.validateNumber)(properties.defaultGid));
    errors.collect(cdk.propertyValidator('defaultUid', cdk.validateNumber)(properties.defaultUid));
    errors.collect(cdk.propertyValidator('mountPath', cdk.validateString)(properties.mountPath));
    return errors.wrap('supplied properties not correct for "FileSystemConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::AppImageConfig.FileSystemConfig` resource
 *
 * @param properties - the TypeScript properties of a `FileSystemConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::AppImageConfig.FileSystemConfig` resource.
 */
// @ts-ignore TS6133
function cfnAppImageConfigFileSystemConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAppImageConfig_FileSystemConfigPropertyValidator(properties).assertSuccess();
    return {
        DefaultGid: cdk.numberToCloudFormation(properties.defaultGid),
        DefaultUid: cdk.numberToCloudFormation(properties.defaultUid),
        MountPath: cdk.stringToCloudFormation(properties.mountPath),
    };
}

// @ts-ignore TS6133
function CfnAppImageConfigFileSystemConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAppImageConfig.FileSystemConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAppImageConfig.FileSystemConfigProperty>();
    ret.addPropertyResult('defaultGid', 'DefaultGid', properties.DefaultGid != null ? cfn_parse.FromCloudFormation.getNumber(properties.DefaultGid) : undefined);
    ret.addPropertyResult('defaultUid', 'DefaultUid', properties.DefaultUid != null ? cfn_parse.FromCloudFormation.getNumber(properties.DefaultUid) : undefined);
    ret.addPropertyResult('mountPath', 'MountPath', properties.MountPath != null ? cfn_parse.FromCloudFormation.getString(properties.MountPath) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAppImageConfig {
    /**
     * The configuration for the file system and kernels in a SageMaker image running as a KernelGateway app.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-appimageconfig-kernelgatewayimageconfig.html
     */
    export interface KernelGatewayImageConfigProperty {
        /**
         * The Amazon Elastic File System (EFS) storage configuration for a SageMaker image.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-appimageconfig-kernelgatewayimageconfig.html#cfn-sagemaker-appimageconfig-kernelgatewayimageconfig-filesystemconfig
         */
        readonly fileSystemConfig?: CfnAppImageConfig.FileSystemConfigProperty | cdk.IResolvable;
        /**
         * The specification of the Jupyter kernels in the image.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-appimageconfig-kernelgatewayimageconfig.html#cfn-sagemaker-appimageconfig-kernelgatewayimageconfig-kernelspecs
         */
        readonly kernelSpecs: Array<CfnAppImageConfig.KernelSpecProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `KernelGatewayImageConfigProperty`
 *
 * @param properties - the TypeScript properties of a `KernelGatewayImageConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnAppImageConfig_KernelGatewayImageConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('fileSystemConfig', CfnAppImageConfig_FileSystemConfigPropertyValidator)(properties.fileSystemConfig));
    errors.collect(cdk.propertyValidator('kernelSpecs', cdk.requiredValidator)(properties.kernelSpecs));
    errors.collect(cdk.propertyValidator('kernelSpecs', cdk.listValidator(CfnAppImageConfig_KernelSpecPropertyValidator))(properties.kernelSpecs));
    return errors.wrap('supplied properties not correct for "KernelGatewayImageConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::AppImageConfig.KernelGatewayImageConfig` resource
 *
 * @param properties - the TypeScript properties of a `KernelGatewayImageConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::AppImageConfig.KernelGatewayImageConfig` resource.
 */
// @ts-ignore TS6133
function cfnAppImageConfigKernelGatewayImageConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAppImageConfig_KernelGatewayImageConfigPropertyValidator(properties).assertSuccess();
    return {
        FileSystemConfig: cfnAppImageConfigFileSystemConfigPropertyToCloudFormation(properties.fileSystemConfig),
        KernelSpecs: cdk.listMapper(cfnAppImageConfigKernelSpecPropertyToCloudFormation)(properties.kernelSpecs),
    };
}

// @ts-ignore TS6133
function CfnAppImageConfigKernelGatewayImageConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAppImageConfig.KernelGatewayImageConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAppImageConfig.KernelGatewayImageConfigProperty>();
    ret.addPropertyResult('fileSystemConfig', 'FileSystemConfig', properties.FileSystemConfig != null ? CfnAppImageConfigFileSystemConfigPropertyFromCloudFormation(properties.FileSystemConfig) : undefined);
    ret.addPropertyResult('kernelSpecs', 'KernelSpecs', cfn_parse.FromCloudFormation.getArray(CfnAppImageConfigKernelSpecPropertyFromCloudFormation)(properties.KernelSpecs));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAppImageConfig {
    /**
     * The specification of a Jupyter kernel.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-appimageconfig-kernelspec.html
     */
    export interface KernelSpecProperty {
        /**
         * The display name of the kernel.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-appimageconfig-kernelspec.html#cfn-sagemaker-appimageconfig-kernelspec-displayname
         */
        readonly displayName?: string;
        /**
         * The name of the Jupyter kernel in the image. This value is case sensitive.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-appimageconfig-kernelspec.html#cfn-sagemaker-appimageconfig-kernelspec-name
         */
        readonly name: string;
    }
}

/**
 * Determine whether the given properties match those of a `KernelSpecProperty`
 *
 * @param properties - the TypeScript properties of a `KernelSpecProperty`
 *
 * @returns the result of the validation.
 */
function CfnAppImageConfig_KernelSpecPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('displayName', cdk.validateString)(properties.displayName));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "KernelSpecProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::AppImageConfig.KernelSpec` resource
 *
 * @param properties - the TypeScript properties of a `KernelSpecProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::AppImageConfig.KernelSpec` resource.
 */
// @ts-ignore TS6133
function cfnAppImageConfigKernelSpecPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAppImageConfig_KernelSpecPropertyValidator(properties).assertSuccess();
    return {
        DisplayName: cdk.stringToCloudFormation(properties.displayName),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnAppImageConfigKernelSpecPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAppImageConfig.KernelSpecProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAppImageConfig.KernelSpecProperty>();
    ret.addPropertyResult('displayName', 'DisplayName', properties.DisplayName != null ? cfn_parse.FromCloudFormation.getString(properties.DisplayName) : undefined);
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnCodeRepository`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-coderepository.html
 */
export interface CfnCodeRepositoryProps {

    /**
     * Configuration details for the Git repository, including the URL where it is located and the ARN of the AWS Secrets Manager secret that contains the credentials used to access the repository.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-coderepository.html#cfn-sagemaker-coderepository-gitconfig
     */
    readonly gitConfig: CfnCodeRepository.GitConfigProperty | cdk.IResolvable;

    /**
     * The name of the Git repository.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-coderepository.html#cfn-sagemaker-coderepository-coderepositoryname
     */
    readonly codeRepositoryName?: string;

    /**
     * List of tags for Code Repository.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-coderepository.html#cfn-sagemaker-coderepository-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnCodeRepositoryProps`
 *
 * @param properties - the TypeScript properties of a `CfnCodeRepositoryProps`
 *
 * @returns the result of the validation.
 */
function CfnCodeRepositoryPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('codeRepositoryName', cdk.validateString)(properties.codeRepositoryName));
    errors.collect(cdk.propertyValidator('gitConfig', cdk.requiredValidator)(properties.gitConfig));
    errors.collect(cdk.propertyValidator('gitConfig', CfnCodeRepository_GitConfigPropertyValidator)(properties.gitConfig));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnCodeRepositoryProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::CodeRepository` resource
 *
 * @param properties - the TypeScript properties of a `CfnCodeRepositoryProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::CodeRepository` resource.
 */
// @ts-ignore TS6133
function cfnCodeRepositoryPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCodeRepositoryPropsValidator(properties).assertSuccess();
    return {
        GitConfig: cfnCodeRepositoryGitConfigPropertyToCloudFormation(properties.gitConfig),
        CodeRepositoryName: cdk.stringToCloudFormation(properties.codeRepositoryName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnCodeRepositoryPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCodeRepositoryProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCodeRepositoryProps>();
    ret.addPropertyResult('gitConfig', 'GitConfig', CfnCodeRepositoryGitConfigPropertyFromCloudFormation(properties.GitConfig));
    ret.addPropertyResult('codeRepositoryName', 'CodeRepositoryName', properties.CodeRepositoryName != null ? cfn_parse.FromCloudFormation.getString(properties.CodeRepositoryName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::CodeRepository`
 *
 * Creates a Git repository as a resource in your SageMaker account. You can associate the repository with notebook instances so that you can use Git source control for the notebooks you create. The Git repository is a resource in your SageMaker account, so it can be associated with more than one notebook instance, and it persists independently from the lifecycle of any notebook instances it is associated with.
 *
 * The repository can be hosted either in [AWS CodeCommit](https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html) or in any other Git repository.
 *
 * @cloudformationResource AWS::SageMaker::CodeRepository
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-coderepository.html
 */
export class CfnCodeRepository extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::CodeRepository";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnCodeRepository {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnCodeRepositoryPropsFromCloudFormation(resourceProperties);
        const ret = new CfnCodeRepository(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the code repository, such as `myCodeRepo` .
     * @cloudformationAttribute CodeRepositoryName
     */
    public readonly attrCodeRepositoryName: string;

    /**
     * Configuration details for the Git repository, including the URL where it is located and the ARN of the AWS Secrets Manager secret that contains the credentials used to access the repository.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-coderepository.html#cfn-sagemaker-coderepository-gitconfig
     */
    public gitConfig: CfnCodeRepository.GitConfigProperty | cdk.IResolvable;

    /**
     * The name of the Git repository.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-coderepository.html#cfn-sagemaker-coderepository-coderepositoryname
     */
    public codeRepositoryName: string | undefined;

    /**
     * List of tags for Code Repository.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-coderepository.html#cfn-sagemaker-coderepository-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::CodeRepository`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnCodeRepositoryProps) {
        super(scope, id, { type: CfnCodeRepository.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'gitConfig', this);
        this.attrCodeRepositoryName = cdk.Token.asString(this.getAtt('CodeRepositoryName'));

        this.gitConfig = props.gitConfig;
        this.codeRepositoryName = props.codeRepositoryName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::CodeRepository", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnCodeRepository.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            gitConfig: this.gitConfig,
            codeRepositoryName: this.codeRepositoryName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnCodeRepositoryPropsToCloudFormation(props);
    }
}

export namespace CfnCodeRepository {
    /**
     * Specifies configuration details for a Git repository in your AWS account.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-coderepository-gitconfig.html
     */
    export interface GitConfigProperty {
        /**
         * The default branch for the Git repository.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-coderepository-gitconfig.html#cfn-sagemaker-coderepository-gitconfig-branch
         */
        readonly branch?: string;
        /**
         * The URL where the Git repository is located.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-coderepository-gitconfig.html#cfn-sagemaker-coderepository-gitconfig-repositoryurl
         */
        readonly repositoryUrl: string;
        /**
         * The Amazon Resource Name (ARN) of the AWS Secrets Manager secret that contains the credentials used to access the git repository. The secret must have a staging label of `AWSCURRENT` and must be in the following format:
         *
         * `{"username": *UserName* , "password": *Password* }`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-coderepository-gitconfig.html#cfn-sagemaker-coderepository-gitconfig-secretarn
         */
        readonly secretArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `GitConfigProperty`
 *
 * @param properties - the TypeScript properties of a `GitConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnCodeRepository_GitConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('branch', cdk.validateString)(properties.branch));
    errors.collect(cdk.propertyValidator('repositoryUrl', cdk.requiredValidator)(properties.repositoryUrl));
    errors.collect(cdk.propertyValidator('repositoryUrl', cdk.validateString)(properties.repositoryUrl));
    errors.collect(cdk.propertyValidator('secretArn', cdk.validateString)(properties.secretArn));
    return errors.wrap('supplied properties not correct for "GitConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::CodeRepository.GitConfig` resource
 *
 * @param properties - the TypeScript properties of a `GitConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::CodeRepository.GitConfig` resource.
 */
// @ts-ignore TS6133
function cfnCodeRepositoryGitConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCodeRepository_GitConfigPropertyValidator(properties).assertSuccess();
    return {
        Branch: cdk.stringToCloudFormation(properties.branch),
        RepositoryUrl: cdk.stringToCloudFormation(properties.repositoryUrl),
        SecretArn: cdk.stringToCloudFormation(properties.secretArn),
    };
}

// @ts-ignore TS6133
function CfnCodeRepositoryGitConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCodeRepository.GitConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCodeRepository.GitConfigProperty>();
    ret.addPropertyResult('branch', 'Branch', properties.Branch != null ? cfn_parse.FromCloudFormation.getString(properties.Branch) : undefined);
    ret.addPropertyResult('repositoryUrl', 'RepositoryUrl', cfn_parse.FromCloudFormation.getString(properties.RepositoryUrl));
    ret.addPropertyResult('secretArn', 'SecretArn', properties.SecretArn != null ? cfn_parse.FromCloudFormation.getString(properties.SecretArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDataQualityJobDefinition`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html
 */
export interface CfnDataQualityJobDefinitionProps {

    /**
     * Specifies the container that runs the monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-dataqualityappspecification
     */
    readonly dataQualityAppSpecification: CfnDataQualityJobDefinition.DataQualityAppSpecificationProperty | cdk.IResolvable;

    /**
     * A list of inputs for the monitoring job. Currently endpoints are supported as monitoring inputs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-dataqualityjobinput
     */
    readonly dataQualityJobInput: CfnDataQualityJobDefinition.DataQualityJobInputProperty | cdk.IResolvable;

    /**
     * The output configuration for monitoring jobs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-dataqualityjoboutputconfig
     */
    readonly dataQualityJobOutputConfig: CfnDataQualityJobDefinition.MonitoringOutputConfigProperty | cdk.IResolvable;

    /**
     * Identifies the resources to deploy for a monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-jobresources
     */
    readonly jobResources: CfnDataQualityJobDefinition.MonitoringResourcesProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to perform tasks on your behalf.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-rolearn
     */
    readonly roleArn: string;

    /**
     * Configures the constraints and baselines for the monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-dataqualitybaselineconfig
     */
    readonly dataQualityBaselineConfig?: CfnDataQualityJobDefinition.DataQualityBaselineConfigProperty | cdk.IResolvable;

    /**
     * The name for the monitoring job definition.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-jobdefinitionname
     */
    readonly jobDefinitionName?: string;

    /**
     * Specifies networking configuration for the monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-networkconfig
     */
    readonly networkConfig?: CfnDataQualityJobDefinition.NetworkConfigProperty | cdk.IResolvable;

    /**
     * A time limit for how long the monitoring job is allowed to run before stopping.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-stoppingcondition
     */
    readonly stoppingCondition?: CfnDataQualityJobDefinition.StoppingConditionProperty | cdk.IResolvable;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnDataQualityJobDefinitionProps`
 *
 * @param properties - the TypeScript properties of a `CfnDataQualityJobDefinitionProps`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinitionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataQualityAppSpecification', cdk.requiredValidator)(properties.dataQualityAppSpecification));
    errors.collect(cdk.propertyValidator('dataQualityAppSpecification', CfnDataQualityJobDefinition_DataQualityAppSpecificationPropertyValidator)(properties.dataQualityAppSpecification));
    errors.collect(cdk.propertyValidator('dataQualityBaselineConfig', CfnDataQualityJobDefinition_DataQualityBaselineConfigPropertyValidator)(properties.dataQualityBaselineConfig));
    errors.collect(cdk.propertyValidator('dataQualityJobInput', cdk.requiredValidator)(properties.dataQualityJobInput));
    errors.collect(cdk.propertyValidator('dataQualityJobInput', CfnDataQualityJobDefinition_DataQualityJobInputPropertyValidator)(properties.dataQualityJobInput));
    errors.collect(cdk.propertyValidator('dataQualityJobOutputConfig', cdk.requiredValidator)(properties.dataQualityJobOutputConfig));
    errors.collect(cdk.propertyValidator('dataQualityJobOutputConfig', CfnDataQualityJobDefinition_MonitoringOutputConfigPropertyValidator)(properties.dataQualityJobOutputConfig));
    errors.collect(cdk.propertyValidator('jobDefinitionName', cdk.validateString)(properties.jobDefinitionName));
    errors.collect(cdk.propertyValidator('jobResources', cdk.requiredValidator)(properties.jobResources));
    errors.collect(cdk.propertyValidator('jobResources', CfnDataQualityJobDefinition_MonitoringResourcesPropertyValidator)(properties.jobResources));
    errors.collect(cdk.propertyValidator('networkConfig', CfnDataQualityJobDefinition_NetworkConfigPropertyValidator)(properties.networkConfig));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('stoppingCondition', CfnDataQualityJobDefinition_StoppingConditionPropertyValidator)(properties.stoppingCondition));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnDataQualityJobDefinitionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition` resource
 *
 * @param properties - the TypeScript properties of a `CfnDataQualityJobDefinitionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinitionPropsValidator(properties).assertSuccess();
    return {
        DataQualityAppSpecification: cfnDataQualityJobDefinitionDataQualityAppSpecificationPropertyToCloudFormation(properties.dataQualityAppSpecification),
        DataQualityJobInput: cfnDataQualityJobDefinitionDataQualityJobInputPropertyToCloudFormation(properties.dataQualityJobInput),
        DataQualityJobOutputConfig: cfnDataQualityJobDefinitionMonitoringOutputConfigPropertyToCloudFormation(properties.dataQualityJobOutputConfig),
        JobResources: cfnDataQualityJobDefinitionMonitoringResourcesPropertyToCloudFormation(properties.jobResources),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        DataQualityBaselineConfig: cfnDataQualityJobDefinitionDataQualityBaselineConfigPropertyToCloudFormation(properties.dataQualityBaselineConfig),
        JobDefinitionName: cdk.stringToCloudFormation(properties.jobDefinitionName),
        NetworkConfig: cfnDataQualityJobDefinitionNetworkConfigPropertyToCloudFormation(properties.networkConfig),
        StoppingCondition: cfnDataQualityJobDefinitionStoppingConditionPropertyToCloudFormation(properties.stoppingCondition),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinitionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinitionProps>();
    ret.addPropertyResult('dataQualityAppSpecification', 'DataQualityAppSpecification', CfnDataQualityJobDefinitionDataQualityAppSpecificationPropertyFromCloudFormation(properties.DataQualityAppSpecification));
    ret.addPropertyResult('dataQualityJobInput', 'DataQualityJobInput', CfnDataQualityJobDefinitionDataQualityJobInputPropertyFromCloudFormation(properties.DataQualityJobInput));
    ret.addPropertyResult('dataQualityJobOutputConfig', 'DataQualityJobOutputConfig', CfnDataQualityJobDefinitionMonitoringOutputConfigPropertyFromCloudFormation(properties.DataQualityJobOutputConfig));
    ret.addPropertyResult('jobResources', 'JobResources', CfnDataQualityJobDefinitionMonitoringResourcesPropertyFromCloudFormation(properties.JobResources));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('dataQualityBaselineConfig', 'DataQualityBaselineConfig', properties.DataQualityBaselineConfig != null ? CfnDataQualityJobDefinitionDataQualityBaselineConfigPropertyFromCloudFormation(properties.DataQualityBaselineConfig) : undefined);
    ret.addPropertyResult('jobDefinitionName', 'JobDefinitionName', properties.JobDefinitionName != null ? cfn_parse.FromCloudFormation.getString(properties.JobDefinitionName) : undefined);
    ret.addPropertyResult('networkConfig', 'NetworkConfig', properties.NetworkConfig != null ? CfnDataQualityJobDefinitionNetworkConfigPropertyFromCloudFormation(properties.NetworkConfig) : undefined);
    ret.addPropertyResult('stoppingCondition', 'StoppingCondition', properties.StoppingCondition != null ? CfnDataQualityJobDefinitionStoppingConditionPropertyFromCloudFormation(properties.StoppingCondition) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::DataQualityJobDefinition`
 *
 * Creates a definition for a job that monitors data quality and drift. For information about model monitor, see [Amazon SageMaker Model Monitor](https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html) .
 *
 * @cloudformationResource AWS::SageMaker::DataQualityJobDefinition
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html
 */
export class CfnDataQualityJobDefinition extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::DataQualityJobDefinition";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDataQualityJobDefinition {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDataQualityJobDefinitionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDataQualityJobDefinition(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The time when the job definition was created.
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: string;

    /**
     * The Amazon Resource Name (ARN) of the job definition.
     * @cloudformationAttribute JobDefinitionArn
     */
    public readonly attrJobDefinitionArn: string;

    /**
     * Specifies the container that runs the monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-dataqualityappspecification
     */
    public dataQualityAppSpecification: CfnDataQualityJobDefinition.DataQualityAppSpecificationProperty | cdk.IResolvable;

    /**
     * A list of inputs for the monitoring job. Currently endpoints are supported as monitoring inputs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-dataqualityjobinput
     */
    public dataQualityJobInput: CfnDataQualityJobDefinition.DataQualityJobInputProperty | cdk.IResolvable;

    /**
     * The output configuration for monitoring jobs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-dataqualityjoboutputconfig
     */
    public dataQualityJobOutputConfig: CfnDataQualityJobDefinition.MonitoringOutputConfigProperty | cdk.IResolvable;

    /**
     * Identifies the resources to deploy for a monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-jobresources
     */
    public jobResources: CfnDataQualityJobDefinition.MonitoringResourcesProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to perform tasks on your behalf.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-rolearn
     */
    public roleArn: string;

    /**
     * Configures the constraints and baselines for the monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-dataqualitybaselineconfig
     */
    public dataQualityBaselineConfig: CfnDataQualityJobDefinition.DataQualityBaselineConfigProperty | cdk.IResolvable | undefined;

    /**
     * The name for the monitoring job definition.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-jobdefinitionname
     */
    public jobDefinitionName: string | undefined;

    /**
     * Specifies networking configuration for the monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-networkconfig
     */
    public networkConfig: CfnDataQualityJobDefinition.NetworkConfigProperty | cdk.IResolvable | undefined;

    /**
     * A time limit for how long the monitoring job is allowed to run before stopping.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-stoppingcondition
     */
    public stoppingCondition: CfnDataQualityJobDefinition.StoppingConditionProperty | cdk.IResolvable | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-dataqualityjobdefinition.html#cfn-sagemaker-dataqualityjobdefinition-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::DataQualityJobDefinition`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDataQualityJobDefinitionProps) {
        super(scope, id, { type: CfnDataQualityJobDefinition.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'dataQualityAppSpecification', this);
        cdk.requireProperty(props, 'dataQualityJobInput', this);
        cdk.requireProperty(props, 'dataQualityJobOutputConfig', this);
        cdk.requireProperty(props, 'jobResources', this);
        cdk.requireProperty(props, 'roleArn', this);
        this.attrCreationTime = cdk.Token.asString(this.getAtt('CreationTime'));
        this.attrJobDefinitionArn = cdk.Token.asString(this.getAtt('JobDefinitionArn'));

        this.dataQualityAppSpecification = props.dataQualityAppSpecification;
        this.dataQualityJobInput = props.dataQualityJobInput;
        this.dataQualityJobOutputConfig = props.dataQualityJobOutputConfig;
        this.jobResources = props.jobResources;
        this.roleArn = props.roleArn;
        this.dataQualityBaselineConfig = props.dataQualityBaselineConfig;
        this.jobDefinitionName = props.jobDefinitionName;
        this.networkConfig = props.networkConfig;
        this.stoppingCondition = props.stoppingCondition;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::DataQualityJobDefinition", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDataQualityJobDefinition.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            dataQualityAppSpecification: this.dataQualityAppSpecification,
            dataQualityJobInput: this.dataQualityJobInput,
            dataQualityJobOutputConfig: this.dataQualityJobOutputConfig,
            jobResources: this.jobResources,
            roleArn: this.roleArn,
            dataQualityBaselineConfig: this.dataQualityBaselineConfig,
            jobDefinitionName: this.jobDefinitionName,
            networkConfig: this.networkConfig,
            stoppingCondition: this.stoppingCondition,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDataQualityJobDefinitionPropsToCloudFormation(props);
    }
}

export namespace CfnDataQualityJobDefinition {
    /**
     * The configuration for the cluster of resources used to run the processing job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-clusterconfig.html
     */
    export interface ClusterConfigProperty {
        /**
         * The number of ML compute instances to use in the model monitoring job. For distributed processing jobs, specify a value greater than 1. The default value is 1.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-clusterconfig.html#cfn-sagemaker-dataqualityjobdefinition-clusterconfig-instancecount
         */
        readonly instanceCount: number;
        /**
         * `CfnDataQualityJobDefinition.ClusterConfigProperty.InstanceType`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-clusterconfig.html#cfn-sagemaker-dataqualityjobdefinition-clusterconfig-instancetype
         */
        readonly instanceType: string;
        /**
         * The AWS Key Management Service ( AWS KMS) key that Amazon SageMaker uses to encrypt data on the storage volume attached to the ML compute instance(s) that run the model monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-clusterconfig.html#cfn-sagemaker-dataqualityjobdefinition-clusterconfig-volumekmskeyid
         */
        readonly volumeKmsKeyId?: string;
        /**
         * The size of the ML storage volume, in gigabytes, that you want to provision. You must specify sufficient ML storage for your scenario.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-clusterconfig.html#cfn-sagemaker-dataqualityjobdefinition-clusterconfig-volumesizeingb
         */
        readonly volumeSizeInGb: number;
    }
}

/**
 * Determine whether the given properties match those of a `ClusterConfigProperty`
 *
 * @param properties - the TypeScript properties of a `ClusterConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinition_ClusterConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceCount', cdk.requiredValidator)(properties.instanceCount));
    errors.collect(cdk.propertyValidator('instanceCount', cdk.validateNumber)(properties.instanceCount));
    errors.collect(cdk.propertyValidator('instanceType', cdk.requiredValidator)(properties.instanceType));
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('volumeKmsKeyId', cdk.validateString)(properties.volumeKmsKeyId));
    errors.collect(cdk.propertyValidator('volumeSizeInGb', cdk.requiredValidator)(properties.volumeSizeInGb));
    errors.collect(cdk.propertyValidator('volumeSizeInGb', cdk.validateNumber)(properties.volumeSizeInGb));
    return errors.wrap('supplied properties not correct for "ClusterConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.ClusterConfig` resource
 *
 * @param properties - the TypeScript properties of a `ClusterConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.ClusterConfig` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionClusterConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinition_ClusterConfigPropertyValidator(properties).assertSuccess();
    return {
        InstanceCount: cdk.numberToCloudFormation(properties.instanceCount),
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        VolumeKmsKeyId: cdk.stringToCloudFormation(properties.volumeKmsKeyId),
        VolumeSizeInGB: cdk.numberToCloudFormation(properties.volumeSizeInGb),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionClusterConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinition.ClusterConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinition.ClusterConfigProperty>();
    ret.addPropertyResult('instanceCount', 'InstanceCount', cfn_parse.FromCloudFormation.getNumber(properties.InstanceCount));
    ret.addPropertyResult('instanceType', 'InstanceType', cfn_parse.FromCloudFormation.getString(properties.InstanceType));
    ret.addPropertyResult('volumeKmsKeyId', 'VolumeKmsKeyId', properties.VolumeKmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.VolumeKmsKeyId) : undefined);
    ret.addPropertyResult('volumeSizeInGb', 'VolumeSizeInGB', cfn_parse.FromCloudFormation.getNumber(properties.VolumeSizeInGB));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataQualityJobDefinition {
    /**
     * The constraints resource for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-constraintsresource.html
     */
    export interface ConstraintsResourceProperty {
        /**
         * The Amazon S3 URI for the constraints resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-constraintsresource.html#cfn-sagemaker-dataqualityjobdefinition-constraintsresource-s3uri
         */
        readonly s3Uri?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConstraintsResourceProperty`
 *
 * @param properties - the TypeScript properties of a `ConstraintsResourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinition_ConstraintsResourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Uri', cdk.validateString)(properties.s3Uri));
    return errors.wrap('supplied properties not correct for "ConstraintsResourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.ConstraintsResource` resource
 *
 * @param properties - the TypeScript properties of a `ConstraintsResourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.ConstraintsResource` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionConstraintsResourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinition_ConstraintsResourcePropertyValidator(properties).assertSuccess();
    return {
        S3Uri: cdk.stringToCloudFormation(properties.s3Uri),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionConstraintsResourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinition.ConstraintsResourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinition.ConstraintsResourceProperty>();
    ret.addPropertyResult('s3Uri', 'S3Uri', properties.S3Uri != null ? cfn_parse.FromCloudFormation.getString(properties.S3Uri) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataQualityJobDefinition {
    /**
     * Information about the container that a data quality monitoring job runs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-dataqualityappspecification.html
     */
    export interface DataQualityAppSpecificationProperty {
        /**
         * The arguments to send to the container that the monitoring job runs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-dataqualityappspecification.html#cfn-sagemaker-dataqualityjobdefinition-dataqualityappspecification-containerarguments
         */
        readonly containerArguments?: string[];
        /**
         * The entrypoint for a container used to run a monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-dataqualityappspecification.html#cfn-sagemaker-dataqualityjobdefinition-dataqualityappspecification-containerentrypoint
         */
        readonly containerEntrypoint?: string[];
        /**
         * Sets the environment variables in the container that the monitoring job runs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-dataqualityappspecification.html#cfn-sagemaker-dataqualityjobdefinition-dataqualityappspecification-environment
         */
        readonly environment?: { [key: string]: (string) } | cdk.IResolvable;
        /**
         * The container image that the data quality monitoring job runs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-dataqualityappspecification.html#cfn-sagemaker-dataqualityjobdefinition-dataqualityappspecification-imageuri
         */
        readonly imageUri: string;
        /**
         * An Amazon S3 URI to a script that is called after analysis has been performed. Applicable only for the built-in (first party) containers.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-dataqualityappspecification.html#cfn-sagemaker-dataqualityjobdefinition-dataqualityappspecification-postanalyticsprocessorsourceuri
         */
        readonly postAnalyticsProcessorSourceUri?: string;
        /**
         * An Amazon S3 URI to a script that is called per row prior to running analysis. It can base64 decode the payload and convert it into a flatted json so that the built-in container can use the converted data. Applicable only for the built-in (first party) containers.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-dataqualityappspecification.html#cfn-sagemaker-dataqualityjobdefinition-dataqualityappspecification-recordpreprocessorsourceuri
         */
        readonly recordPreprocessorSourceUri?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DataQualityAppSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `DataQualityAppSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinition_DataQualityAppSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('containerArguments', cdk.listValidator(cdk.validateString))(properties.containerArguments));
    errors.collect(cdk.propertyValidator('containerEntrypoint', cdk.listValidator(cdk.validateString))(properties.containerEntrypoint));
    errors.collect(cdk.propertyValidator('environment', cdk.hashValidator(cdk.validateString))(properties.environment));
    errors.collect(cdk.propertyValidator('imageUri', cdk.requiredValidator)(properties.imageUri));
    errors.collect(cdk.propertyValidator('imageUri', cdk.validateString)(properties.imageUri));
    errors.collect(cdk.propertyValidator('postAnalyticsProcessorSourceUri', cdk.validateString)(properties.postAnalyticsProcessorSourceUri));
    errors.collect(cdk.propertyValidator('recordPreprocessorSourceUri', cdk.validateString)(properties.recordPreprocessorSourceUri));
    return errors.wrap('supplied properties not correct for "DataQualityAppSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.DataQualityAppSpecification` resource
 *
 * @param properties - the TypeScript properties of a `DataQualityAppSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.DataQualityAppSpecification` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionDataQualityAppSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinition_DataQualityAppSpecificationPropertyValidator(properties).assertSuccess();
    return {
        ContainerArguments: cdk.listMapper(cdk.stringToCloudFormation)(properties.containerArguments),
        ContainerEntrypoint: cdk.listMapper(cdk.stringToCloudFormation)(properties.containerEntrypoint),
        Environment: cdk.hashMapper(cdk.stringToCloudFormation)(properties.environment),
        ImageUri: cdk.stringToCloudFormation(properties.imageUri),
        PostAnalyticsProcessorSourceUri: cdk.stringToCloudFormation(properties.postAnalyticsProcessorSourceUri),
        RecordPreprocessorSourceUri: cdk.stringToCloudFormation(properties.recordPreprocessorSourceUri),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionDataQualityAppSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinition.DataQualityAppSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinition.DataQualityAppSpecificationProperty>();
    ret.addPropertyResult('containerArguments', 'ContainerArguments', properties.ContainerArguments != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ContainerArguments) : undefined);
    ret.addPropertyResult('containerEntrypoint', 'ContainerEntrypoint', properties.ContainerEntrypoint != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ContainerEntrypoint) : undefined);
    ret.addPropertyResult('environment', 'Environment', properties.Environment != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Environment) : undefined);
    ret.addPropertyResult('imageUri', 'ImageUri', cfn_parse.FromCloudFormation.getString(properties.ImageUri));
    ret.addPropertyResult('postAnalyticsProcessorSourceUri', 'PostAnalyticsProcessorSourceUri', properties.PostAnalyticsProcessorSourceUri != null ? cfn_parse.FromCloudFormation.getString(properties.PostAnalyticsProcessorSourceUri) : undefined);
    ret.addPropertyResult('recordPreprocessorSourceUri', 'RecordPreprocessorSourceUri', properties.RecordPreprocessorSourceUri != null ? cfn_parse.FromCloudFormation.getString(properties.RecordPreprocessorSourceUri) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataQualityJobDefinition {
    /**
     * Configuration for monitoring constraints and monitoring statistics. These baseline resources are compared against the results of the current job from the series of jobs scheduled to collect data periodically.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-dataqualitybaselineconfig.html
     */
    export interface DataQualityBaselineConfigProperty {
        /**
         * The name of the job that performs baselining for the data quality monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-dataqualitybaselineconfig.html#cfn-sagemaker-dataqualityjobdefinition-dataqualitybaselineconfig-baseliningjobname
         */
        readonly baseliningJobName?: string;
        /**
         * The constraints resource for a monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-dataqualitybaselineconfig.html#cfn-sagemaker-dataqualityjobdefinition-dataqualitybaselineconfig-constraintsresource
         */
        readonly constraintsResource?: CfnDataQualityJobDefinition.ConstraintsResourceProperty | cdk.IResolvable;
        /**
         * Configuration for monitoring constraints and monitoring statistics. These baseline resources are compared against the results of the current job from the series of jobs scheduled to collect data periodically.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-dataqualitybaselineconfig.html#cfn-sagemaker-dataqualityjobdefinition-dataqualitybaselineconfig-statisticsresource
         */
        readonly statisticsResource?: CfnDataQualityJobDefinition.StatisticsResourceProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DataQualityBaselineConfigProperty`
 *
 * @param properties - the TypeScript properties of a `DataQualityBaselineConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinition_DataQualityBaselineConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('baseliningJobName', cdk.validateString)(properties.baseliningJobName));
    errors.collect(cdk.propertyValidator('constraintsResource', CfnDataQualityJobDefinition_ConstraintsResourcePropertyValidator)(properties.constraintsResource));
    errors.collect(cdk.propertyValidator('statisticsResource', CfnDataQualityJobDefinition_StatisticsResourcePropertyValidator)(properties.statisticsResource));
    return errors.wrap('supplied properties not correct for "DataQualityBaselineConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.DataQualityBaselineConfig` resource
 *
 * @param properties - the TypeScript properties of a `DataQualityBaselineConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.DataQualityBaselineConfig` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionDataQualityBaselineConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinition_DataQualityBaselineConfigPropertyValidator(properties).assertSuccess();
    return {
        BaseliningJobName: cdk.stringToCloudFormation(properties.baseliningJobName),
        ConstraintsResource: cfnDataQualityJobDefinitionConstraintsResourcePropertyToCloudFormation(properties.constraintsResource),
        StatisticsResource: cfnDataQualityJobDefinitionStatisticsResourcePropertyToCloudFormation(properties.statisticsResource),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionDataQualityBaselineConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinition.DataQualityBaselineConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinition.DataQualityBaselineConfigProperty>();
    ret.addPropertyResult('baseliningJobName', 'BaseliningJobName', properties.BaseliningJobName != null ? cfn_parse.FromCloudFormation.getString(properties.BaseliningJobName) : undefined);
    ret.addPropertyResult('constraintsResource', 'ConstraintsResource', properties.ConstraintsResource != null ? CfnDataQualityJobDefinitionConstraintsResourcePropertyFromCloudFormation(properties.ConstraintsResource) : undefined);
    ret.addPropertyResult('statisticsResource', 'StatisticsResource', properties.StatisticsResource != null ? CfnDataQualityJobDefinitionStatisticsResourcePropertyFromCloudFormation(properties.StatisticsResource) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataQualityJobDefinition {
    /**
     * The input for the data quality monitoring job. Currently endpoints are supported for input.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-dataqualityjobinput.html
     */
    export interface DataQualityJobInputProperty {
        /**
         * `CfnDataQualityJobDefinition.DataQualityJobInputProperty.EndpointInput`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-dataqualityjobinput.html#cfn-sagemaker-dataqualityjobdefinition-dataqualityjobinput-endpointinput
         */
        readonly endpointInput: CfnDataQualityJobDefinition.EndpointInputProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DataQualityJobInputProperty`
 *
 * @param properties - the TypeScript properties of a `DataQualityJobInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinition_DataQualityJobInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endpointInput', cdk.requiredValidator)(properties.endpointInput));
    errors.collect(cdk.propertyValidator('endpointInput', CfnDataQualityJobDefinition_EndpointInputPropertyValidator)(properties.endpointInput));
    return errors.wrap('supplied properties not correct for "DataQualityJobInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.DataQualityJobInput` resource
 *
 * @param properties - the TypeScript properties of a `DataQualityJobInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.DataQualityJobInput` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionDataQualityJobInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinition_DataQualityJobInputPropertyValidator(properties).assertSuccess();
    return {
        EndpointInput: cfnDataQualityJobDefinitionEndpointInputPropertyToCloudFormation(properties.endpointInput),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionDataQualityJobInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinition.DataQualityJobInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinition.DataQualityJobInputProperty>();
    ret.addPropertyResult('endpointInput', 'EndpointInput', CfnDataQualityJobDefinitionEndpointInputPropertyFromCloudFormation(properties.EndpointInput));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataQualityJobDefinition {
    /**
     * Input object for the endpoint
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-endpointinput.html
     */
    export interface EndpointInputProperty {
        /**
         * An endpoint in customer's account which has enabled `DataCaptureConfig` enabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-endpointinput.html#cfn-sagemaker-dataqualityjobdefinition-endpointinput-endpointname
         */
        readonly endpointName: string;
        /**
         * Path to the filesystem where the endpoint data is available to the container.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-endpointinput.html#cfn-sagemaker-dataqualityjobdefinition-endpointinput-localpath
         */
        readonly localPath: string;
        /**
         * Whether input data distributed in Amazon S3 is fully replicated or sharded by an S3 key. Defaults to `FullyReplicated`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-endpointinput.html#cfn-sagemaker-dataqualityjobdefinition-endpointinput-s3datadistributiontype
         */
        readonly s3DataDistributionType?: string;
        /**
         * Whether the `Pipe` or `File` is used as the input mode for transferring data for the monitoring job. `Pipe` mode is recommended for large datasets. `File` mode is useful for small files that fit in memory. Defaults to `File` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-endpointinput.html#cfn-sagemaker-dataqualityjobdefinition-endpointinput-s3inputmode
         */
        readonly s3InputMode?: string;
    }
}

/**
 * Determine whether the given properties match those of a `EndpointInputProperty`
 *
 * @param properties - the TypeScript properties of a `EndpointInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinition_EndpointInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endpointName', cdk.requiredValidator)(properties.endpointName));
    errors.collect(cdk.propertyValidator('endpointName', cdk.validateString)(properties.endpointName));
    errors.collect(cdk.propertyValidator('localPath', cdk.requiredValidator)(properties.localPath));
    errors.collect(cdk.propertyValidator('localPath', cdk.validateString)(properties.localPath));
    errors.collect(cdk.propertyValidator('s3DataDistributionType', cdk.validateString)(properties.s3DataDistributionType));
    errors.collect(cdk.propertyValidator('s3InputMode', cdk.validateString)(properties.s3InputMode));
    return errors.wrap('supplied properties not correct for "EndpointInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.EndpointInput` resource
 *
 * @param properties - the TypeScript properties of a `EndpointInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.EndpointInput` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionEndpointInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinition_EndpointInputPropertyValidator(properties).assertSuccess();
    return {
        EndpointName: cdk.stringToCloudFormation(properties.endpointName),
        LocalPath: cdk.stringToCloudFormation(properties.localPath),
        S3DataDistributionType: cdk.stringToCloudFormation(properties.s3DataDistributionType),
        S3InputMode: cdk.stringToCloudFormation(properties.s3InputMode),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionEndpointInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinition.EndpointInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinition.EndpointInputProperty>();
    ret.addPropertyResult('endpointName', 'EndpointName', cfn_parse.FromCloudFormation.getString(properties.EndpointName));
    ret.addPropertyResult('localPath', 'LocalPath', cfn_parse.FromCloudFormation.getString(properties.LocalPath));
    ret.addPropertyResult('s3DataDistributionType', 'S3DataDistributionType', properties.S3DataDistributionType != null ? cfn_parse.FromCloudFormation.getString(properties.S3DataDistributionType) : undefined);
    ret.addPropertyResult('s3InputMode', 'S3InputMode', properties.S3InputMode != null ? cfn_parse.FromCloudFormation.getString(properties.S3InputMode) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataQualityJobDefinition {
    /**
     * The output object for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-monitoringoutput.html
     */
    export interface MonitoringOutputProperty {
        /**
         * The Amazon S3 storage location where the results of a monitoring job are saved.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-monitoringoutput.html#cfn-sagemaker-dataqualityjobdefinition-monitoringoutput-s3output
         */
        readonly s3Output: CfnDataQualityJobDefinition.S3OutputProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringOutputProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinition_MonitoringOutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Output', cdk.requiredValidator)(properties.s3Output));
    errors.collect(cdk.propertyValidator('s3Output', CfnDataQualityJobDefinition_S3OutputPropertyValidator)(properties.s3Output));
    return errors.wrap('supplied properties not correct for "MonitoringOutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.MonitoringOutput` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.MonitoringOutput` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionMonitoringOutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinition_MonitoringOutputPropertyValidator(properties).assertSuccess();
    return {
        S3Output: cfnDataQualityJobDefinitionS3OutputPropertyToCloudFormation(properties.s3Output),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionMonitoringOutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinition.MonitoringOutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinition.MonitoringOutputProperty>();
    ret.addPropertyResult('s3Output', 'S3Output', CfnDataQualityJobDefinitionS3OutputPropertyFromCloudFormation(properties.S3Output));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataQualityJobDefinition {
    /**
     * The output configuration for monitoring jobs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-monitoringoutputconfig.html
     */
    export interface MonitoringOutputConfigProperty {
        /**
         * The AWS Key Management Service ( AWS KMS) key that Amazon SageMaker uses to encrypt the model artifacts at rest using Amazon S3 server-side encryption.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-monitoringoutputconfig.html#cfn-sagemaker-dataqualityjobdefinition-monitoringoutputconfig-kmskeyid
         */
        readonly kmsKeyId?: string;
        /**
         * Monitoring outputs for monitoring jobs. This is where the output of the periodic monitoring jobs is uploaded.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-monitoringoutputconfig.html#cfn-sagemaker-dataqualityjobdefinition-monitoringoutputconfig-monitoringoutputs
         */
        readonly monitoringOutputs: Array<CfnDataQualityJobDefinition.MonitoringOutputProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringOutputConfigProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinition_MonitoringOutputConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('monitoringOutputs', cdk.requiredValidator)(properties.monitoringOutputs));
    errors.collect(cdk.propertyValidator('monitoringOutputs', cdk.listValidator(CfnDataQualityJobDefinition_MonitoringOutputPropertyValidator))(properties.monitoringOutputs));
    return errors.wrap('supplied properties not correct for "MonitoringOutputConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.MonitoringOutputConfig` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.MonitoringOutputConfig` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionMonitoringOutputConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinition_MonitoringOutputConfigPropertyValidator(properties).assertSuccess();
    return {
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        MonitoringOutputs: cdk.listMapper(cfnDataQualityJobDefinitionMonitoringOutputPropertyToCloudFormation)(properties.monitoringOutputs),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionMonitoringOutputConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinition.MonitoringOutputConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinition.MonitoringOutputConfigProperty>();
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('monitoringOutputs', 'MonitoringOutputs', cfn_parse.FromCloudFormation.getArray(CfnDataQualityJobDefinitionMonitoringOutputPropertyFromCloudFormation)(properties.MonitoringOutputs));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataQualityJobDefinition {
    /**
     * Identifies the resources to deploy for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-monitoringresources.html
     */
    export interface MonitoringResourcesProperty {
        /**
         * The configuration for the cluster resources used to run the processing job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-monitoringresources.html#cfn-sagemaker-dataqualityjobdefinition-monitoringresources-clusterconfig
         */
        readonly clusterConfig: CfnDataQualityJobDefinition.ClusterConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringResourcesProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringResourcesProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinition_MonitoringResourcesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clusterConfig', cdk.requiredValidator)(properties.clusterConfig));
    errors.collect(cdk.propertyValidator('clusterConfig', CfnDataQualityJobDefinition_ClusterConfigPropertyValidator)(properties.clusterConfig));
    return errors.wrap('supplied properties not correct for "MonitoringResourcesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.MonitoringResources` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringResourcesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.MonitoringResources` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionMonitoringResourcesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinition_MonitoringResourcesPropertyValidator(properties).assertSuccess();
    return {
        ClusterConfig: cfnDataQualityJobDefinitionClusterConfigPropertyToCloudFormation(properties.clusterConfig),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionMonitoringResourcesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinition.MonitoringResourcesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinition.MonitoringResourcesProperty>();
    ret.addPropertyResult('clusterConfig', 'ClusterConfig', CfnDataQualityJobDefinitionClusterConfigPropertyFromCloudFormation(properties.ClusterConfig));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataQualityJobDefinition {
    /**
     * Networking options for a job, such as network traffic encryption between containers, whether to allow inbound and outbound network calls to and from containers, and the VPC subnets and security groups to use for VPC-enabled jobs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-networkconfig.html
     */
    export interface NetworkConfigProperty {
        /**
         * Whether to encrypt all communications between distributed processing jobs. Choose `True` to encrypt communications. Encryption provides greater security for distributed processing jobs, but the processing might take longer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-networkconfig.html#cfn-sagemaker-dataqualityjobdefinition-networkconfig-enableintercontainertrafficencryption
         */
        readonly enableInterContainerTrafficEncryption?: boolean | cdk.IResolvable;
        /**
         * Whether to allow inbound and outbound network calls to and from the containers used for the processing job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-networkconfig.html#cfn-sagemaker-dataqualityjobdefinition-networkconfig-enablenetworkisolation
         */
        readonly enableNetworkIsolation?: boolean | cdk.IResolvable;
        /**
         * Specifies a VPC that your training jobs and hosted models have access to. Control access to and from your training and model containers by configuring the VPC.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-networkconfig.html#cfn-sagemaker-dataqualityjobdefinition-networkconfig-vpcconfig
         */
        readonly vpcConfig?: CfnDataQualityJobDefinition.VpcConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `NetworkConfigProperty`
 *
 * @param properties - the TypeScript properties of a `NetworkConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinition_NetworkConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enableInterContainerTrafficEncryption', cdk.validateBoolean)(properties.enableInterContainerTrafficEncryption));
    errors.collect(cdk.propertyValidator('enableNetworkIsolation', cdk.validateBoolean)(properties.enableNetworkIsolation));
    errors.collect(cdk.propertyValidator('vpcConfig', CfnDataQualityJobDefinition_VpcConfigPropertyValidator)(properties.vpcConfig));
    return errors.wrap('supplied properties not correct for "NetworkConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.NetworkConfig` resource
 *
 * @param properties - the TypeScript properties of a `NetworkConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.NetworkConfig` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionNetworkConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinition_NetworkConfigPropertyValidator(properties).assertSuccess();
    return {
        EnableInterContainerTrafficEncryption: cdk.booleanToCloudFormation(properties.enableInterContainerTrafficEncryption),
        EnableNetworkIsolation: cdk.booleanToCloudFormation(properties.enableNetworkIsolation),
        VpcConfig: cfnDataQualityJobDefinitionVpcConfigPropertyToCloudFormation(properties.vpcConfig),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionNetworkConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinition.NetworkConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinition.NetworkConfigProperty>();
    ret.addPropertyResult('enableInterContainerTrafficEncryption', 'EnableInterContainerTrafficEncryption', properties.EnableInterContainerTrafficEncryption != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableInterContainerTrafficEncryption) : undefined);
    ret.addPropertyResult('enableNetworkIsolation', 'EnableNetworkIsolation', properties.EnableNetworkIsolation != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableNetworkIsolation) : undefined);
    ret.addPropertyResult('vpcConfig', 'VpcConfig', properties.VpcConfig != null ? CfnDataQualityJobDefinitionVpcConfigPropertyFromCloudFormation(properties.VpcConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataQualityJobDefinition {
    /**
     * The Amazon S3 storage location where the results of a monitoring job are saved.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-s3output.html
     */
    export interface S3OutputProperty {
        /**
         * The local path to the Amazon S3 storage location where Amazon SageMaker saves the results of a monitoring job. LocalPath is an absolute path for the output data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-s3output.html#cfn-sagemaker-dataqualityjobdefinition-s3output-localpath
         */
        readonly localPath: string;
        /**
         * Whether to upload the results of the monitoring job continuously or after the job completes.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-s3output.html#cfn-sagemaker-dataqualityjobdefinition-s3output-s3uploadmode
         */
        readonly s3UploadMode?: string;
        /**
         * A URI that identifies the Amazon S3 storage location where Amazon SageMaker saves the results of a monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-s3output.html#cfn-sagemaker-dataqualityjobdefinition-s3output-s3uri
         */
        readonly s3Uri: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3OutputProperty`
 *
 * @param properties - the TypeScript properties of a `S3OutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinition_S3OutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('localPath', cdk.requiredValidator)(properties.localPath));
    errors.collect(cdk.propertyValidator('localPath', cdk.validateString)(properties.localPath));
    errors.collect(cdk.propertyValidator('s3UploadMode', cdk.validateString)(properties.s3UploadMode));
    errors.collect(cdk.propertyValidator('s3Uri', cdk.requiredValidator)(properties.s3Uri));
    errors.collect(cdk.propertyValidator('s3Uri', cdk.validateString)(properties.s3Uri));
    return errors.wrap('supplied properties not correct for "S3OutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.S3Output` resource
 *
 * @param properties - the TypeScript properties of a `S3OutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.S3Output` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionS3OutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinition_S3OutputPropertyValidator(properties).assertSuccess();
    return {
        LocalPath: cdk.stringToCloudFormation(properties.localPath),
        S3UploadMode: cdk.stringToCloudFormation(properties.s3UploadMode),
        S3Uri: cdk.stringToCloudFormation(properties.s3Uri),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionS3OutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinition.S3OutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinition.S3OutputProperty>();
    ret.addPropertyResult('localPath', 'LocalPath', cfn_parse.FromCloudFormation.getString(properties.LocalPath));
    ret.addPropertyResult('s3UploadMode', 'S3UploadMode', properties.S3UploadMode != null ? cfn_parse.FromCloudFormation.getString(properties.S3UploadMode) : undefined);
    ret.addPropertyResult('s3Uri', 'S3Uri', cfn_parse.FromCloudFormation.getString(properties.S3Uri));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataQualityJobDefinition {
    /**
     * The statistics resource for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-statisticsresource.html
     */
    export interface StatisticsResourceProperty {
        /**
         * The Amazon S3 URI for the statistics resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-statisticsresource.html#cfn-sagemaker-dataqualityjobdefinition-statisticsresource-s3uri
         */
        readonly s3Uri?: string;
    }
}

/**
 * Determine whether the given properties match those of a `StatisticsResourceProperty`
 *
 * @param properties - the TypeScript properties of a `StatisticsResourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinition_StatisticsResourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Uri', cdk.validateString)(properties.s3Uri));
    return errors.wrap('supplied properties not correct for "StatisticsResourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.StatisticsResource` resource
 *
 * @param properties - the TypeScript properties of a `StatisticsResourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.StatisticsResource` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionStatisticsResourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinition_StatisticsResourcePropertyValidator(properties).assertSuccess();
    return {
        S3Uri: cdk.stringToCloudFormation(properties.s3Uri),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionStatisticsResourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinition.StatisticsResourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinition.StatisticsResourceProperty>();
    ret.addPropertyResult('s3Uri', 'S3Uri', properties.S3Uri != null ? cfn_parse.FromCloudFormation.getString(properties.S3Uri) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataQualityJobDefinition {
    /**
     * Specifies a limit to how long a model training job or model compilation job can run. It also specifies how long a managed spot training job has to complete. When the job reaches the time limit, SageMaker ends the training or compilation job. Use this API to cap model training costs.
     *
     * To stop a training job, SageMaker sends the algorithm the `SIGTERM` signal, which delays job termination for 120 seconds. Algorithms can use this 120-second window to save the model artifacts, so the results of training are not lost.
     *
     * The training algorithms provided by SageMaker automatically save the intermediate results of a model training job when possible. This attempt to save artifacts is only a best effort case as model might not be in a state from which it can be saved. For example, if training has just started, the model might not be ready to save. When saved, this intermediate data is a valid model artifact. You can use it to create a model with `CreateModel` .
     *
     * > The Neural Topic Model (NTM) currently does not support saving intermediate model artifacts. When training NTMs, make sure that the maximum runtime is sufficient for the training job to complete.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-stoppingcondition.html
     */
    export interface StoppingConditionProperty {
        /**
         * The maximum length of time, in seconds, that a training or compilation job can run.
         *
         * For compilation jobs, if the job does not complete during this time, a `TimeOut` error is generated. We recommend starting with 900 seconds and increasing as necessary based on your model.
         *
         * For all other jobs, if the job does not complete during this time, SageMaker ends the job. When `RetryStrategy` is specified in the job request, `MaxRuntimeInSeconds` specifies the maximum time for all of the attempts in total, not each individual attempt. The default value is 1 day. The maximum value is 28 days.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-stoppingcondition.html#cfn-sagemaker-dataqualityjobdefinition-stoppingcondition-maxruntimeinseconds
         */
        readonly maxRuntimeInSeconds: number;
    }
}

/**
 * Determine whether the given properties match those of a `StoppingConditionProperty`
 *
 * @param properties - the TypeScript properties of a `StoppingConditionProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinition_StoppingConditionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('maxRuntimeInSeconds', cdk.requiredValidator)(properties.maxRuntimeInSeconds));
    errors.collect(cdk.propertyValidator('maxRuntimeInSeconds', cdk.validateNumber)(properties.maxRuntimeInSeconds));
    return errors.wrap('supplied properties not correct for "StoppingConditionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.StoppingCondition` resource
 *
 * @param properties - the TypeScript properties of a `StoppingConditionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.StoppingCondition` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionStoppingConditionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinition_StoppingConditionPropertyValidator(properties).assertSuccess();
    return {
        MaxRuntimeInSeconds: cdk.numberToCloudFormation(properties.maxRuntimeInSeconds),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionStoppingConditionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinition.StoppingConditionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinition.StoppingConditionProperty>();
    ret.addPropertyResult('maxRuntimeInSeconds', 'MaxRuntimeInSeconds', cfn_parse.FromCloudFormation.getNumber(properties.MaxRuntimeInSeconds));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataQualityJobDefinition {
    /**
     * Specifies a VPC that your training jobs and hosted models have access to. Control access to and from your training and model containers by configuring the VPC. For more information, see [Protect Endpoints by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/host-vpc.html) and [Protect Training Jobs by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/train-vpc.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-vpcconfig.html
     */
    export interface VpcConfigProperty {
        /**
         * The VPC security group IDs, in the form sg-xxxxxxxx. Specify the security groups for the VPC that is specified in the `Subnets` field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-vpcconfig.html#cfn-sagemaker-dataqualityjobdefinition-vpcconfig-securitygroupids
         */
        readonly securityGroupIds: string[];
        /**
         * The ID of the subnets in the VPC to which you want to connect your training job or model. For information about the availability of specific instance types, see [Supported Instance Types and Availability Zones](https://docs.aws.amazon.com/sagemaker/latest/dg/instance-types-az.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-dataqualityjobdefinition-vpcconfig.html#cfn-sagemaker-dataqualityjobdefinition-vpcconfig-subnets
         */
        readonly subnets: string[];
    }
}

/**
 * Determine whether the given properties match those of a `VpcConfigProperty`
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataQualityJobDefinition_VpcConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.requiredValidator)(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('subnets', cdk.requiredValidator)(properties.subnets));
    errors.collect(cdk.propertyValidator('subnets', cdk.listValidator(cdk.validateString))(properties.subnets));
    return errors.wrap('supplied properties not correct for "VpcConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.VpcConfig` resource
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DataQualityJobDefinition.VpcConfig` resource.
 */
// @ts-ignore TS6133
function cfnDataQualityJobDefinitionVpcConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataQualityJobDefinition_VpcConfigPropertyValidator(properties).assertSuccess();
    return {
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        Subnets: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnets),
    };
}

// @ts-ignore TS6133
function CfnDataQualityJobDefinitionVpcConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataQualityJobDefinition.VpcConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataQualityJobDefinition.VpcConfigProperty>();
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds));
    ret.addPropertyResult('subnets', 'Subnets', cfn_parse.FromCloudFormation.getStringArray(properties.Subnets));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDevice`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-device.html
 */
export interface CfnDeviceProps {

    /**
     * The name of the fleet the device belongs to.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-device.html#cfn-sagemaker-device-devicefleetname
     */
    readonly deviceFleetName: string;

    /**
     * Edge device you want to create.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-device.html#cfn-sagemaker-device-device
     */
    readonly device?: CfnDevice.DeviceProperty | cdk.IResolvable;

    /**
     * An array of key-value pairs that contain metadata to help you categorize and organize your devices. Each tag consists of a key and a value, both of which you define.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-device.html#cfn-sagemaker-device-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnDeviceProps`
 *
 * @param properties - the TypeScript properties of a `CfnDeviceProps`
 *
 * @returns the result of the validation.
 */
function CfnDevicePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('device', CfnDevice_DevicePropertyValidator)(properties.device));
    errors.collect(cdk.propertyValidator('deviceFleetName', cdk.requiredValidator)(properties.deviceFleetName));
    errors.collect(cdk.propertyValidator('deviceFleetName', cdk.validateString)(properties.deviceFleetName));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnDeviceProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Device` resource
 *
 * @param properties - the TypeScript properties of a `CfnDeviceProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Device` resource.
 */
// @ts-ignore TS6133
function cfnDevicePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDevicePropsValidator(properties).assertSuccess();
    return {
        DeviceFleetName: cdk.stringToCloudFormation(properties.deviceFleetName),
        Device: cfnDeviceDevicePropertyToCloudFormation(properties.device),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDevicePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDeviceProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDeviceProps>();
    ret.addPropertyResult('deviceFleetName', 'DeviceFleetName', cfn_parse.FromCloudFormation.getString(properties.DeviceFleetName));
    ret.addPropertyResult('device', 'Device', properties.Device != null ? CfnDeviceDevicePropertyFromCloudFormation(properties.Device) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::Device`
 *
 * The `AWS::SageMaker::Device` resource is an Amazon SageMaker resource type that allows you to register your Devices against an existing SageMaker Edge Manager DeviceFleet. Each device must be listed individually in the CFN specification.
 *
 * @cloudformationResource AWS::SageMaker::Device
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-device.html
 */
export class CfnDevice extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::Device";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDevice {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDevicePropsFromCloudFormation(resourceProperties);
        const ret = new CfnDevice(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the fleet the device belongs to.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-device.html#cfn-sagemaker-device-devicefleetname
     */
    public deviceFleetName: string;

    /**
     * Edge device you want to create.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-device.html#cfn-sagemaker-device-device
     */
    public device: CfnDevice.DeviceProperty | cdk.IResolvable | undefined;

    /**
     * An array of key-value pairs that contain metadata to help you categorize and organize your devices. Each tag consists of a key and a value, both of which you define.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-device.html#cfn-sagemaker-device-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::Device`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDeviceProps) {
        super(scope, id, { type: CfnDevice.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'deviceFleetName', this);

        this.deviceFleetName = props.deviceFleetName;
        this.device = props.device;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::Device", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDevice.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            deviceFleetName: this.deviceFleetName,
            device: this.device,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDevicePropsToCloudFormation(props);
    }
}

export namespace CfnDevice {
    /**
     * Information of a particular device.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-device-device.html
     */
    export interface DeviceProperty {
        /**
         * Description of the device.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-device-device.html#cfn-sagemaker-device-device-description
         */
        readonly description?: string;
        /**
         * The name of the device.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-device-device.html#cfn-sagemaker-device-device-devicename
         */
        readonly deviceName: string;
        /**
         * AWS Internet of Things (IoT) object name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-device-device.html#cfn-sagemaker-device-device-iotthingname
         */
        readonly iotThingName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DeviceProperty`
 *
 * @param properties - the TypeScript properties of a `DeviceProperty`
 *
 * @returns the result of the validation.
 */
function CfnDevice_DevicePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('deviceName', cdk.requiredValidator)(properties.deviceName));
    errors.collect(cdk.propertyValidator('deviceName', cdk.validateString)(properties.deviceName));
    errors.collect(cdk.propertyValidator('iotThingName', cdk.validateString)(properties.iotThingName));
    return errors.wrap('supplied properties not correct for "DeviceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Device.Device` resource
 *
 * @param properties - the TypeScript properties of a `DeviceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Device.Device` resource.
 */
// @ts-ignore TS6133
function cfnDeviceDevicePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDevice_DevicePropertyValidator(properties).assertSuccess();
    return {
        Description: cdk.stringToCloudFormation(properties.description),
        DeviceName: cdk.stringToCloudFormation(properties.deviceName),
        IotThingName: cdk.stringToCloudFormation(properties.iotThingName),
    };
}

// @ts-ignore TS6133
function CfnDeviceDevicePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDevice.DeviceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDevice.DeviceProperty>();
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('deviceName', 'DeviceName', cfn_parse.FromCloudFormation.getString(properties.DeviceName));
    ret.addPropertyResult('iotThingName', 'IotThingName', properties.IotThingName != null ? cfn_parse.FromCloudFormation.getString(properties.IotThingName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDeviceFleet`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-devicefleet.html
 */
export interface CfnDeviceFleetProps {

    /**
     * Name of the device fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-devicefleet.html#cfn-sagemaker-devicefleet-devicefleetname
     */
    readonly deviceFleetName: string;

    /**
     * The output configuration for storing sample data collected by the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-devicefleet.html#cfn-sagemaker-devicefleet-outputconfig
     */
    readonly outputConfig: CfnDeviceFleet.EdgeOutputConfigProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) that has access to AWS Internet of Things (IoT).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-devicefleet.html#cfn-sagemaker-devicefleet-rolearn
     */
    readonly roleArn: string;

    /**
     * A description of the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-devicefleet.html#cfn-sagemaker-devicefleet-description
     */
    readonly description?: string;

    /**
     * An array of key-value pairs that contain metadata to help you categorize and organize your device fleets. Each tag consists of a key and a value, both of which you define.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-devicefleet.html#cfn-sagemaker-devicefleet-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnDeviceFleetProps`
 *
 * @param properties - the TypeScript properties of a `CfnDeviceFleetProps`
 *
 * @returns the result of the validation.
 */
function CfnDeviceFleetPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('deviceFleetName', cdk.requiredValidator)(properties.deviceFleetName));
    errors.collect(cdk.propertyValidator('deviceFleetName', cdk.validateString)(properties.deviceFleetName));
    errors.collect(cdk.propertyValidator('outputConfig', cdk.requiredValidator)(properties.outputConfig));
    errors.collect(cdk.propertyValidator('outputConfig', CfnDeviceFleet_EdgeOutputConfigPropertyValidator)(properties.outputConfig));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnDeviceFleetProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DeviceFleet` resource
 *
 * @param properties - the TypeScript properties of a `CfnDeviceFleetProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DeviceFleet` resource.
 */
// @ts-ignore TS6133
function cfnDeviceFleetPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDeviceFleetPropsValidator(properties).assertSuccess();
    return {
        DeviceFleetName: cdk.stringToCloudFormation(properties.deviceFleetName),
        OutputConfig: cfnDeviceFleetEdgeOutputConfigPropertyToCloudFormation(properties.outputConfig),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        Description: cdk.stringToCloudFormation(properties.description),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDeviceFleetPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDeviceFleetProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDeviceFleetProps>();
    ret.addPropertyResult('deviceFleetName', 'DeviceFleetName', cfn_parse.FromCloudFormation.getString(properties.DeviceFleetName));
    ret.addPropertyResult('outputConfig', 'OutputConfig', CfnDeviceFleetEdgeOutputConfigPropertyFromCloudFormation(properties.OutputConfig));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::DeviceFleet`
 *
 * The `AWS::SageMaker::DeviceFleet` resource is an Amazon SageMaker resource type that allows you to create a DeviceFleet that manages your SageMaker Edge Manager Devices. You must register your devices against the `DeviceFleet` separately.
 *
 * @cloudformationResource AWS::SageMaker::DeviceFleet
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-devicefleet.html
 */
export class CfnDeviceFleet extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::DeviceFleet";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDeviceFleet {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDeviceFleetPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDeviceFleet(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Name of the device fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-devicefleet.html#cfn-sagemaker-devicefleet-devicefleetname
     */
    public deviceFleetName: string;

    /**
     * The output configuration for storing sample data collected by the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-devicefleet.html#cfn-sagemaker-devicefleet-outputconfig
     */
    public outputConfig: CfnDeviceFleet.EdgeOutputConfigProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) that has access to AWS Internet of Things (IoT).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-devicefleet.html#cfn-sagemaker-devicefleet-rolearn
     */
    public roleArn: string;

    /**
     * A description of the fleet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-devicefleet.html#cfn-sagemaker-devicefleet-description
     */
    public description: string | undefined;

    /**
     * An array of key-value pairs that contain metadata to help you categorize and organize your device fleets. Each tag consists of a key and a value, both of which you define.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-devicefleet.html#cfn-sagemaker-devicefleet-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::DeviceFleet`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDeviceFleetProps) {
        super(scope, id, { type: CfnDeviceFleet.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'deviceFleetName', this);
        cdk.requireProperty(props, 'outputConfig', this);
        cdk.requireProperty(props, 'roleArn', this);

        this.deviceFleetName = props.deviceFleetName;
        this.outputConfig = props.outputConfig;
        this.roleArn = props.roleArn;
        this.description = props.description;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::DeviceFleet", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDeviceFleet.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            deviceFleetName: this.deviceFleetName,
            outputConfig: this.outputConfig,
            roleArn: this.roleArn,
            description: this.description,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDeviceFleetPropsToCloudFormation(props);
    }
}

export namespace CfnDeviceFleet {
    /**
     * The output configuration for storing sample data collected by the fleet.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-devicefleet-edgeoutputconfig.html
     */
    export interface EdgeOutputConfigProperty {
        /**
         * The AWS Key Management Service ( AWS KMS) key that Amazon SageMaker uses to encrypt data on the storage volume after compilation job. If you don't provide a KMS key ID, Amazon SageMaker uses the default KMS key for Amazon S3 for your role's account.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-devicefleet-edgeoutputconfig.html#cfn-sagemaker-devicefleet-edgeoutputconfig-kmskeyid
         */
        readonly kmsKeyId?: string;
        /**
         * The Amazon Simple Storage (S3) bucket URI.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-devicefleet-edgeoutputconfig.html#cfn-sagemaker-devicefleet-edgeoutputconfig-s3outputlocation
         */
        readonly s3OutputLocation: string;
    }
}

/**
 * Determine whether the given properties match those of a `EdgeOutputConfigProperty`
 *
 * @param properties - the TypeScript properties of a `EdgeOutputConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnDeviceFleet_EdgeOutputConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('s3OutputLocation', cdk.requiredValidator)(properties.s3OutputLocation));
    errors.collect(cdk.propertyValidator('s3OutputLocation', cdk.validateString)(properties.s3OutputLocation));
    return errors.wrap('supplied properties not correct for "EdgeOutputConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::DeviceFleet.EdgeOutputConfig` resource
 *
 * @param properties - the TypeScript properties of a `EdgeOutputConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::DeviceFleet.EdgeOutputConfig` resource.
 */
// @ts-ignore TS6133
function cfnDeviceFleetEdgeOutputConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDeviceFleet_EdgeOutputConfigPropertyValidator(properties).assertSuccess();
    return {
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        S3OutputLocation: cdk.stringToCloudFormation(properties.s3OutputLocation),
    };
}

// @ts-ignore TS6133
function CfnDeviceFleetEdgeOutputConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDeviceFleet.EdgeOutputConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDeviceFleet.EdgeOutputConfigProperty>();
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('s3OutputLocation', 'S3OutputLocation', cfn_parse.FromCloudFormation.getString(properties.S3OutputLocation));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDomain`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html
 */
export interface CfnDomainProps {

    /**
     * The mode of authentication that members use to access the Domain.
     *
     * *Valid Values* : `SSO | IAM`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-authmode
     */
    readonly authMode: string;

    /**
     * The default user settings.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-defaultusersettings
     */
    readonly defaultUserSettings: CfnDomain.UserSettingsProperty | cdk.IResolvable;

    /**
     * The domain name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-domainname
     */
    readonly domainName: string;

    /**
     * The VPC subnets that Studio uses for communication.
     *
     * *Length Constraints* : Maximum length of 32.
     *
     * *Array members* : Minimum number of 1 item. Maximum number of 16 items.
     *
     * *Pattern* : `[-0-9a-zA-Z]+`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-subnetids
     */
    readonly subnetIds: string[];

    /**
     * The ID of the Amazon Virtual Private Cloud (Amazon VPC) that Studio uses for communication.
     *
     * *Length Constraints* : Maximum length of 32.
     *
     * *Pattern* : `[-0-9a-zA-Z]+`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-vpcid
     */
    readonly vpcId: string;

    /**
     * Specifies the VPC used for non-EFS traffic. The default value is `PublicInternetOnly` .
     *
     * - `PublicInternetOnly` - Non-EFS traffic is through a VPC managed by Amazon SageMaker , which allows direct internet access
     * - `VpcOnly` - All Studio traffic is through the specified VPC and subnets
     *
     * *Valid Values* : `PublicInternetOnly | VpcOnly`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-appnetworkaccesstype
     */
    readonly appNetworkAccessType?: string;

    /**
     * The entity that creates and manages the required security groups for inter-app communication in `VpcOnly` mode. Required when `CreateDomain.AppNetworkAccessType` is `VpcOnly` and `DomainSettings.RStudioServerProDomainSettings.DomainExecutionRoleArn` is provided.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-appsecuritygroupmanagement
     */
    readonly appSecurityGroupManagement?: string;

    /**
     * A collection of settings that apply to the `SageMaker Domain` . These settings are specified through the `CreateDomain` API call.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-domainsettings
     */
    readonly domainSettings?: CfnDomain.DomainSettingsProperty | cdk.IResolvable;

    /**
     * SageMaker uses AWS KMS to encrypt the EFS volume attached to the Domain with an AWS managed customer master key (CMK) by default. For more control, specify a customer managed CMK.
     *
     * *Length Constraints* : Maximum length of 2048.
     *
     * *Pattern* : `.*`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-kmskeyid
     */
    readonly kmsKeyId?: string;

    /**
     * Tags to associated with the Domain. Each tag consists of a key and an optional value. Tag keys must be unique per resource. Tags are searchable using the Search API.
     *
     * Tags that you specify for the Domain are also added to all apps that are launched in the Domain.
     *
     * *Array members* : Minimum number of 0 items. Maximum number of 50 items.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnDomainProps`
 *
 * @param properties - the TypeScript properties of a `CfnDomainProps`
 *
 * @returns the result of the validation.
 */
function CfnDomainPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('appNetworkAccessType', cdk.validateString)(properties.appNetworkAccessType));
    errors.collect(cdk.propertyValidator('appSecurityGroupManagement', cdk.validateString)(properties.appSecurityGroupManagement));
    errors.collect(cdk.propertyValidator('authMode', cdk.requiredValidator)(properties.authMode));
    errors.collect(cdk.propertyValidator('authMode', cdk.validateString)(properties.authMode));
    errors.collect(cdk.propertyValidator('defaultUserSettings', cdk.requiredValidator)(properties.defaultUserSettings));
    errors.collect(cdk.propertyValidator('defaultUserSettings', CfnDomain_UserSettingsPropertyValidator)(properties.defaultUserSettings));
    errors.collect(cdk.propertyValidator('domainName', cdk.requiredValidator)(properties.domainName));
    errors.collect(cdk.propertyValidator('domainName', cdk.validateString)(properties.domainName));
    errors.collect(cdk.propertyValidator('domainSettings', CfnDomain_DomainSettingsPropertyValidator)(properties.domainSettings));
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.requiredValidator)(properties.subnetIds));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.listValidator(cdk.validateString))(properties.subnetIds));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('vpcId', cdk.requiredValidator)(properties.vpcId));
    errors.collect(cdk.propertyValidator('vpcId', cdk.validateString)(properties.vpcId));
    return errors.wrap('supplied properties not correct for "CfnDomainProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Domain` resource
 *
 * @param properties - the TypeScript properties of a `CfnDomainProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Domain` resource.
 */
// @ts-ignore TS6133
function cfnDomainPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomainPropsValidator(properties).assertSuccess();
    return {
        AuthMode: cdk.stringToCloudFormation(properties.authMode),
        DefaultUserSettings: cfnDomainUserSettingsPropertyToCloudFormation(properties.defaultUserSettings),
        DomainName: cdk.stringToCloudFormation(properties.domainName),
        SubnetIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnetIds),
        VpcId: cdk.stringToCloudFormation(properties.vpcId),
        AppNetworkAccessType: cdk.stringToCloudFormation(properties.appNetworkAccessType),
        AppSecurityGroupManagement: cdk.stringToCloudFormation(properties.appSecurityGroupManagement),
        DomainSettings: cfnDomainDomainSettingsPropertyToCloudFormation(properties.domainSettings),
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDomainPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomainProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomainProps>();
    ret.addPropertyResult('authMode', 'AuthMode', cfn_parse.FromCloudFormation.getString(properties.AuthMode));
    ret.addPropertyResult('defaultUserSettings', 'DefaultUserSettings', CfnDomainUserSettingsPropertyFromCloudFormation(properties.DefaultUserSettings));
    ret.addPropertyResult('domainName', 'DomainName', cfn_parse.FromCloudFormation.getString(properties.DomainName));
    ret.addPropertyResult('subnetIds', 'SubnetIds', cfn_parse.FromCloudFormation.getStringArray(properties.SubnetIds));
    ret.addPropertyResult('vpcId', 'VpcId', cfn_parse.FromCloudFormation.getString(properties.VpcId));
    ret.addPropertyResult('appNetworkAccessType', 'AppNetworkAccessType', properties.AppNetworkAccessType != null ? cfn_parse.FromCloudFormation.getString(properties.AppNetworkAccessType) : undefined);
    ret.addPropertyResult('appSecurityGroupManagement', 'AppSecurityGroupManagement', properties.AppSecurityGroupManagement != null ? cfn_parse.FromCloudFormation.getString(properties.AppSecurityGroupManagement) : undefined);
    ret.addPropertyResult('domainSettings', 'DomainSettings', properties.DomainSettings != null ? CfnDomainDomainSettingsPropertyFromCloudFormation(properties.DomainSettings) : undefined);
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::Domain`
 *
 * Creates a `Domain` used by Amazon SageMaker Studio. A domain consists of an associated Amazon Elastic File System (EFS) volume, a list of authorized users, and a variety of security, application, policy, and Amazon Virtual Private Cloud (VPC) configurations. An AWS account is limited to one domain per region. Users within a domain can share notebook files and other artifacts with each other.
 *
 * *EFS storage*
 *
 * When a domain is created, an EFS volume is created for use by all of the users within the domain. Each user receives a private home directory within the EFS volume for notebooks, Git repositories, and data files.
 *
 * SageMaker uses the AWS Key Management Service ( AWS KMS) to encrypt the EFS volume attached to the domain with an AWS managed key by default. For more control, you can specify a customer managed key. For more information, see [Protect Data at Rest Using Encryption](https://docs.aws.amazon.com/sagemaker/latest/dg/encryption-at-rest.html) .
 *
 * *VPC configuration*
 *
 * All SageMaker Studio traffic between the domain and the EFS volume is through the specified VPC and subnets. For other Studio traffic, you can specify the `AppNetworkAccessType` parameter. `AppNetworkAccessType` corresponds to the network access type that you choose when you onboard to Studio. The following options are available:
 *
 * - `PublicInternetOnly` - Non-EFS traffic goes through a VPC managed by Amazon SageMaker, which allows internet access. This is the default value.
 * - `VpcOnly` - All Studio traffic is through the specified VPC and subnets. Internet access is disabled by default. To allow internet access, you must specify a NAT gateway.
 *
 * When internet access is disabled, you won't be able to run a Studio notebook or to train or host models unless your VPC has an interface endpoint to the SageMaker API and runtime or a NAT gateway and your security groups allow outbound connections.
 *
 * > NFS traffic over TCP on port 2049 needs to be allowed in both inbound and outbound rules in order to launch a SageMaker Studio app successfully.
 *
 * For more information, see [Connect SageMaker Studio Notebooks to Resources in a VPC](https://docs.aws.amazon.com/sagemaker/latest/dg/studio-notebooks-and-internet-access.html) .
 *
 * @cloudformationResource AWS::SageMaker::Domain
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html
 */
export class CfnDomain extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::Domain";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDomain {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDomainPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDomain(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the Domain, such as `arn:aws:sagemaker:us-west-2:account-id:domain/my-domain-name` .
     * @cloudformationAttribute DomainArn
     */
    public readonly attrDomainArn: string;

    /**
     * The Domain ID.
     * @cloudformationAttribute DomainId
     */
    public readonly attrDomainId: string;

    /**
     * The ID of the Amazon Elastic File System (EFS) managed by this Domain.
     * @cloudformationAttribute HomeEfsFileSystemId
     */
    public readonly attrHomeEfsFileSystemId: string;

    /**
     * The ID of the security group that authorizes traffic between the `RSessionGateway` apps and the `RStudioServerPro` app.
     * @cloudformationAttribute SecurityGroupIdForDomainBoundary
     */
    public readonly attrSecurityGroupIdForDomainBoundary: string;

    /**
     * The AWS SSO managed application instance ID.
     * @cloudformationAttribute SingleSignOnManagedApplicationInstanceId
     */
    public readonly attrSingleSignOnManagedApplicationInstanceId: string;

    /**
     * The URL for the Domain.
     * @cloudformationAttribute Url
     */
    public readonly attrUrl: string;

    /**
     * The mode of authentication that members use to access the Domain.
     *
     * *Valid Values* : `SSO | IAM`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-authmode
     */
    public authMode: string;

    /**
     * The default user settings.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-defaultusersettings
     */
    public defaultUserSettings: CfnDomain.UserSettingsProperty | cdk.IResolvable;

    /**
     * The domain name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-domainname
     */
    public domainName: string;

    /**
     * The VPC subnets that Studio uses for communication.
     *
     * *Length Constraints* : Maximum length of 32.
     *
     * *Array members* : Minimum number of 1 item. Maximum number of 16 items.
     *
     * *Pattern* : `[-0-9a-zA-Z]+`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-subnetids
     */
    public subnetIds: string[];

    /**
     * The ID of the Amazon Virtual Private Cloud (Amazon VPC) that Studio uses for communication.
     *
     * *Length Constraints* : Maximum length of 32.
     *
     * *Pattern* : `[-0-9a-zA-Z]+`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-vpcid
     */
    public vpcId: string;

    /**
     * Specifies the VPC used for non-EFS traffic. The default value is `PublicInternetOnly` .
     *
     * - `PublicInternetOnly` - Non-EFS traffic is through a VPC managed by Amazon SageMaker , which allows direct internet access
     * - `VpcOnly` - All Studio traffic is through the specified VPC and subnets
     *
     * *Valid Values* : `PublicInternetOnly | VpcOnly`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-appnetworkaccesstype
     */
    public appNetworkAccessType: string | undefined;

    /**
     * The entity that creates and manages the required security groups for inter-app communication in `VpcOnly` mode. Required when `CreateDomain.AppNetworkAccessType` is `VpcOnly` and `DomainSettings.RStudioServerProDomainSettings.DomainExecutionRoleArn` is provided.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-appsecuritygroupmanagement
     */
    public appSecurityGroupManagement: string | undefined;

    /**
     * A collection of settings that apply to the `SageMaker Domain` . These settings are specified through the `CreateDomain` API call.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-domainsettings
     */
    public domainSettings: CfnDomain.DomainSettingsProperty | cdk.IResolvable | undefined;

    /**
     * SageMaker uses AWS KMS to encrypt the EFS volume attached to the Domain with an AWS managed customer master key (CMK) by default. For more control, specify a customer managed CMK.
     *
     * *Length Constraints* : Maximum length of 2048.
     *
     * *Pattern* : `.*`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-kmskeyid
     */
    public kmsKeyId: string | undefined;

    /**
     * Tags to associated with the Domain. Each tag consists of a key and an optional value. Tag keys must be unique per resource. Tags are searchable using the Search API.
     *
     * Tags that you specify for the Domain are also added to all apps that are launched in the Domain.
     *
     * *Array members* : Minimum number of 0 items. Maximum number of 50 items.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html#cfn-sagemaker-domain-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::Domain`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDomainProps) {
        super(scope, id, { type: CfnDomain.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'authMode', this);
        cdk.requireProperty(props, 'defaultUserSettings', this);
        cdk.requireProperty(props, 'domainName', this);
        cdk.requireProperty(props, 'subnetIds', this);
        cdk.requireProperty(props, 'vpcId', this);
        this.attrDomainArn = cdk.Token.asString(this.getAtt('DomainArn'));
        this.attrDomainId = cdk.Token.asString(this.getAtt('DomainId'));
        this.attrHomeEfsFileSystemId = cdk.Token.asString(this.getAtt('HomeEfsFileSystemId'));
        this.attrSecurityGroupIdForDomainBoundary = cdk.Token.asString(this.getAtt('SecurityGroupIdForDomainBoundary'));
        this.attrSingleSignOnManagedApplicationInstanceId = cdk.Token.asString(this.getAtt('SingleSignOnManagedApplicationInstanceId'));
        this.attrUrl = cdk.Token.asString(this.getAtt('Url'));

        this.authMode = props.authMode;
        this.defaultUserSettings = props.defaultUserSettings;
        this.domainName = props.domainName;
        this.subnetIds = props.subnetIds;
        this.vpcId = props.vpcId;
        this.appNetworkAccessType = props.appNetworkAccessType;
        this.appSecurityGroupManagement = props.appSecurityGroupManagement;
        this.domainSettings = props.domainSettings;
        this.kmsKeyId = props.kmsKeyId;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::Domain", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDomain.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            authMode: this.authMode,
            defaultUserSettings: this.defaultUserSettings,
            domainName: this.domainName,
            subnetIds: this.subnetIds,
            vpcId: this.vpcId,
            appNetworkAccessType: this.appNetworkAccessType,
            appSecurityGroupManagement: this.appSecurityGroupManagement,
            domainSettings: this.domainSettings,
            kmsKeyId: this.kmsKeyId,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDomainPropsToCloudFormation(props);
    }
}

export namespace CfnDomain {
    /**
     * A custom SageMaker image. For more information, see [Bring your own SageMaker image](https://docs.aws.amazon.com/sagemaker/latest/dg/studio-byoi.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-customimage.html
     */
    export interface CustomImageProperty {
        /**
         * The name of the AppImageConfig.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-customimage.html#cfn-sagemaker-domain-customimage-appimageconfigname
         */
        readonly appImageConfigName: string;
        /**
         * The name of the CustomImage. Must be unique to your account.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-customimage.html#cfn-sagemaker-domain-customimage-imagename
         */
        readonly imageName: string;
        /**
         * The version number of the CustomImage.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-customimage.html#cfn-sagemaker-domain-customimage-imageversionnumber
         */
        readonly imageVersionNumber?: number;
    }
}

/**
 * Determine whether the given properties match those of a `CustomImageProperty`
 *
 * @param properties - the TypeScript properties of a `CustomImageProperty`
 *
 * @returns the result of the validation.
 */
function CfnDomain_CustomImagePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('appImageConfigName', cdk.requiredValidator)(properties.appImageConfigName));
    errors.collect(cdk.propertyValidator('appImageConfigName', cdk.validateString)(properties.appImageConfigName));
    errors.collect(cdk.propertyValidator('imageName', cdk.requiredValidator)(properties.imageName));
    errors.collect(cdk.propertyValidator('imageName', cdk.validateString)(properties.imageName));
    errors.collect(cdk.propertyValidator('imageVersionNumber', cdk.validateNumber)(properties.imageVersionNumber));
    return errors.wrap('supplied properties not correct for "CustomImageProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Domain.CustomImage` resource
 *
 * @param properties - the TypeScript properties of a `CustomImageProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Domain.CustomImage` resource.
 */
// @ts-ignore TS6133
function cfnDomainCustomImagePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomain_CustomImagePropertyValidator(properties).assertSuccess();
    return {
        AppImageConfigName: cdk.stringToCloudFormation(properties.appImageConfigName),
        ImageName: cdk.stringToCloudFormation(properties.imageName),
        ImageVersionNumber: cdk.numberToCloudFormation(properties.imageVersionNumber),
    };
}

// @ts-ignore TS6133
function CfnDomainCustomImagePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomain.CustomImageProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomain.CustomImageProperty>();
    ret.addPropertyResult('appImageConfigName', 'AppImageConfigName', cfn_parse.FromCloudFormation.getString(properties.AppImageConfigName));
    ret.addPropertyResult('imageName', 'ImageName', cfn_parse.FromCloudFormation.getString(properties.ImageName));
    ret.addPropertyResult('imageVersionNumber', 'ImageVersionNumber', properties.ImageVersionNumber != null ? cfn_parse.FromCloudFormation.getNumber(properties.ImageVersionNumber) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDomain {
    /**
     * A collection of settings that apply to the `SageMaker Domain` . These settings are specified through the `CreateDomain` API call.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-domainsettings.html
     */
    export interface DomainSettingsProperty {
        /**
         * A collection of settings that configure the `RStudioServerPro` Domain-level app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-domainsettings.html#cfn-sagemaker-domain-domainsettings-rstudioserverprodomainsettings
         */
        readonly rStudioServerProDomainSettings?: CfnDomain.RStudioServerProDomainSettingsProperty | cdk.IResolvable;
        /**
         * The security groups for the Amazon Virtual Private Cloud that the `Domain` uses for communication between Domain-level apps and user apps.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-domainsettings.html#cfn-sagemaker-domain-domainsettings-securitygroupids
         */
        readonly securityGroupIds?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `DomainSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `DomainSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDomain_DomainSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('rStudioServerProDomainSettings', CfnDomain_RStudioServerProDomainSettingsPropertyValidator)(properties.rStudioServerProDomainSettings));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    return errors.wrap('supplied properties not correct for "DomainSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Domain.DomainSettings` resource
 *
 * @param properties - the TypeScript properties of a `DomainSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Domain.DomainSettings` resource.
 */
// @ts-ignore TS6133
function cfnDomainDomainSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomain_DomainSettingsPropertyValidator(properties).assertSuccess();
    return {
        RStudioServerProDomainSettings: cfnDomainRStudioServerProDomainSettingsPropertyToCloudFormation(properties.rStudioServerProDomainSettings),
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
    };
}

// @ts-ignore TS6133
function CfnDomainDomainSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomain.DomainSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomain.DomainSettingsProperty>();
    ret.addPropertyResult('rStudioServerProDomainSettings', 'RStudioServerProDomainSettings', properties.RStudioServerProDomainSettings != null ? CfnDomainRStudioServerProDomainSettingsPropertyFromCloudFormation(properties.RStudioServerProDomainSettings) : undefined);
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', properties.SecurityGroupIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDomain {
    /**
     * The JupyterServer app settings.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-jupyterserverappsettings.html
     */
    export interface JupyterServerAppSettingsProperty {
        /**
         * The default instance type and the Amazon Resource Name (ARN) of the default SageMaker image used by the JupyterServer app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-jupyterserverappsettings.html#cfn-sagemaker-domain-jupyterserverappsettings-defaultresourcespec
         */
        readonly defaultResourceSpec?: CfnDomain.ResourceSpecProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `JupyterServerAppSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `JupyterServerAppSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDomain_JupyterServerAppSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('defaultResourceSpec', CfnDomain_ResourceSpecPropertyValidator)(properties.defaultResourceSpec));
    return errors.wrap('supplied properties not correct for "JupyterServerAppSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Domain.JupyterServerAppSettings` resource
 *
 * @param properties - the TypeScript properties of a `JupyterServerAppSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Domain.JupyterServerAppSettings` resource.
 */
// @ts-ignore TS6133
function cfnDomainJupyterServerAppSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomain_JupyterServerAppSettingsPropertyValidator(properties).assertSuccess();
    return {
        DefaultResourceSpec: cfnDomainResourceSpecPropertyToCloudFormation(properties.defaultResourceSpec),
    };
}

// @ts-ignore TS6133
function CfnDomainJupyterServerAppSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomain.JupyterServerAppSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomain.JupyterServerAppSettingsProperty>();
    ret.addPropertyResult('defaultResourceSpec', 'DefaultResourceSpec', properties.DefaultResourceSpec != null ? CfnDomainResourceSpecPropertyFromCloudFormation(properties.DefaultResourceSpec) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDomain {
    /**
     * The KernelGateway app settings.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-kernelgatewayappsettings.html
     */
    export interface KernelGatewayAppSettingsProperty {
        /**
         * A list of custom SageMaker images that are configured to run as a KernelGateway app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-kernelgatewayappsettings.html#cfn-sagemaker-domain-kernelgatewayappsettings-customimages
         */
        readonly customImages?: Array<CfnDomain.CustomImageProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The default instance type and the Amazon Resource Name (ARN) of the default SageMaker image used by the KernelGateway app.
         *
         * > The Amazon SageMaker Studio UI does not use the default instance type value set here. The default instance type set here is used when Apps are created using the AWS Command Line Interface or AWS CloudFormation and the instance type parameter value is not passed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-kernelgatewayappsettings.html#cfn-sagemaker-domain-kernelgatewayappsettings-defaultresourcespec
         */
        readonly defaultResourceSpec?: CfnDomain.ResourceSpecProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `KernelGatewayAppSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `KernelGatewayAppSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDomain_KernelGatewayAppSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('customImages', cdk.listValidator(CfnDomain_CustomImagePropertyValidator))(properties.customImages));
    errors.collect(cdk.propertyValidator('defaultResourceSpec', CfnDomain_ResourceSpecPropertyValidator)(properties.defaultResourceSpec));
    return errors.wrap('supplied properties not correct for "KernelGatewayAppSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Domain.KernelGatewayAppSettings` resource
 *
 * @param properties - the TypeScript properties of a `KernelGatewayAppSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Domain.KernelGatewayAppSettings` resource.
 */
// @ts-ignore TS6133
function cfnDomainKernelGatewayAppSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomain_KernelGatewayAppSettingsPropertyValidator(properties).assertSuccess();
    return {
        CustomImages: cdk.listMapper(cfnDomainCustomImagePropertyToCloudFormation)(properties.customImages),
        DefaultResourceSpec: cfnDomainResourceSpecPropertyToCloudFormation(properties.defaultResourceSpec),
    };
}

// @ts-ignore TS6133
function CfnDomainKernelGatewayAppSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomain.KernelGatewayAppSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomain.KernelGatewayAppSettingsProperty>();
    ret.addPropertyResult('customImages', 'CustomImages', properties.CustomImages != null ? cfn_parse.FromCloudFormation.getArray(CfnDomainCustomImagePropertyFromCloudFormation)(properties.CustomImages) : undefined);
    ret.addPropertyResult('defaultResourceSpec', 'DefaultResourceSpec', properties.DefaultResourceSpec != null ? CfnDomainResourceSpecPropertyFromCloudFormation(properties.DefaultResourceSpec) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDomain {
    /**
     * A collection of settings that configure user interaction with the `RStudioServerPro` app. `RStudioServerProAppSettings` cannot be updated. The `RStudioServerPro` app must be deleted and a new one created to make any changes.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-rstudioserverproappsettings.html
     */
    export interface RStudioServerProAppSettingsProperty {
        /**
         * Indicates whether the current user has access to the `RStudioServerPro` app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-rstudioserverproappsettings.html#cfn-sagemaker-domain-rstudioserverproappsettings-accessstatus
         */
        readonly accessStatus?: string;
        /**
         * The level of permissions that the user has within the `RStudioServerPro` app. This value defaults to `User`. The `Admin` value allows the user access to the RStudio Administrative Dashboard.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-rstudioserverproappsettings.html#cfn-sagemaker-domain-rstudioserverproappsettings-usergroup
         */
        readonly userGroup?: string;
    }
}

/**
 * Determine whether the given properties match those of a `RStudioServerProAppSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `RStudioServerProAppSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDomain_RStudioServerProAppSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessStatus', cdk.validateString)(properties.accessStatus));
    errors.collect(cdk.propertyValidator('userGroup', cdk.validateString)(properties.userGroup));
    return errors.wrap('supplied properties not correct for "RStudioServerProAppSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Domain.RStudioServerProAppSettings` resource
 *
 * @param properties - the TypeScript properties of a `RStudioServerProAppSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Domain.RStudioServerProAppSettings` resource.
 */
// @ts-ignore TS6133
function cfnDomainRStudioServerProAppSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomain_RStudioServerProAppSettingsPropertyValidator(properties).assertSuccess();
    return {
        AccessStatus: cdk.stringToCloudFormation(properties.accessStatus),
        UserGroup: cdk.stringToCloudFormation(properties.userGroup),
    };
}

// @ts-ignore TS6133
function CfnDomainRStudioServerProAppSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomain.RStudioServerProAppSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomain.RStudioServerProAppSettingsProperty>();
    ret.addPropertyResult('accessStatus', 'AccessStatus', properties.AccessStatus != null ? cfn_parse.FromCloudFormation.getString(properties.AccessStatus) : undefined);
    ret.addPropertyResult('userGroup', 'UserGroup', properties.UserGroup != null ? cfn_parse.FromCloudFormation.getString(properties.UserGroup) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDomain {
    /**
     * A collection of settings that configure the `RStudioServerPro` Domain-level app.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-rstudioserverprodomainsettings.html
     */
    export interface RStudioServerProDomainSettingsProperty {
        /**
         * A collection that defines the default `InstanceType` , `SageMakerImageArn` , and `SageMakerImageVersionArn` for the Domain.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-rstudioserverprodomainsettings.html#cfn-sagemaker-domain-rstudioserverprodomainsettings-defaultresourcespec
         */
        readonly defaultResourceSpec?: CfnDomain.ResourceSpecProperty | cdk.IResolvable;
        /**
         * The ARN of the execution role for the `RStudioServerPro` Domain-level app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-rstudioserverprodomainsettings.html#cfn-sagemaker-domain-rstudioserverprodomainsettings-domainexecutionrolearn
         */
        readonly domainExecutionRoleArn: string;
        /**
         * A URL pointing to an RStudio Connect server.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-rstudioserverprodomainsettings.html#cfn-sagemaker-domain-rstudioserverprodomainsettings-rstudioconnecturl
         */
        readonly rStudioConnectUrl?: string;
        /**
         * A URL pointing to an RStudio Package Manager server.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-rstudioserverprodomainsettings.html#cfn-sagemaker-domain-rstudioserverprodomainsettings-rstudiopackagemanagerurl
         */
        readonly rStudioPackageManagerUrl?: string;
    }
}

/**
 * Determine whether the given properties match those of a `RStudioServerProDomainSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `RStudioServerProDomainSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDomain_RStudioServerProDomainSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('defaultResourceSpec', CfnDomain_ResourceSpecPropertyValidator)(properties.defaultResourceSpec));
    errors.collect(cdk.propertyValidator('domainExecutionRoleArn', cdk.requiredValidator)(properties.domainExecutionRoleArn));
    errors.collect(cdk.propertyValidator('domainExecutionRoleArn', cdk.validateString)(properties.domainExecutionRoleArn));
    errors.collect(cdk.propertyValidator('rStudioConnectUrl', cdk.validateString)(properties.rStudioConnectUrl));
    errors.collect(cdk.propertyValidator('rStudioPackageManagerUrl', cdk.validateString)(properties.rStudioPackageManagerUrl));
    return errors.wrap('supplied properties not correct for "RStudioServerProDomainSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Domain.RStudioServerProDomainSettings` resource
 *
 * @param properties - the TypeScript properties of a `RStudioServerProDomainSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Domain.RStudioServerProDomainSettings` resource.
 */
// @ts-ignore TS6133
function cfnDomainRStudioServerProDomainSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomain_RStudioServerProDomainSettingsPropertyValidator(properties).assertSuccess();
    return {
        DefaultResourceSpec: cfnDomainResourceSpecPropertyToCloudFormation(properties.defaultResourceSpec),
        DomainExecutionRoleArn: cdk.stringToCloudFormation(properties.domainExecutionRoleArn),
        RStudioConnectUrl: cdk.stringToCloudFormation(properties.rStudioConnectUrl),
        RStudioPackageManagerUrl: cdk.stringToCloudFormation(properties.rStudioPackageManagerUrl),
    };
}

// @ts-ignore TS6133
function CfnDomainRStudioServerProDomainSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomain.RStudioServerProDomainSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomain.RStudioServerProDomainSettingsProperty>();
    ret.addPropertyResult('defaultResourceSpec', 'DefaultResourceSpec', properties.DefaultResourceSpec != null ? CfnDomainResourceSpecPropertyFromCloudFormation(properties.DefaultResourceSpec) : undefined);
    ret.addPropertyResult('domainExecutionRoleArn', 'DomainExecutionRoleArn', cfn_parse.FromCloudFormation.getString(properties.DomainExecutionRoleArn));
    ret.addPropertyResult('rStudioConnectUrl', 'RStudioConnectUrl', properties.RStudioConnectUrl != null ? cfn_parse.FromCloudFormation.getString(properties.RStudioConnectUrl) : undefined);
    ret.addPropertyResult('rStudioPackageManagerUrl', 'RStudioPackageManagerUrl', properties.RStudioPackageManagerUrl != null ? cfn_parse.FromCloudFormation.getString(properties.RStudioPackageManagerUrl) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDomain {
    /**
     * Specifies the ARN's of a SageMaker image and SageMaker image version, and the instance type that the version runs on.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-resourcespec.html
     */
    export interface ResourceSpecProperty {
        /**
         * The instance type that the image version runs on.
         *
         * > JupyterServer Apps only support the `system` value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-resourcespec.html#cfn-sagemaker-domain-resourcespec-instancetype
         */
        readonly instanceType?: string;
        /**
         * The ARN of the SageMaker image that the image version belongs to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-resourcespec.html#cfn-sagemaker-domain-resourcespec-sagemakerimagearn
         */
        readonly sageMakerImageArn?: string;
        /**
         * The ARN of the image version created on the instance.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-resourcespec.html#cfn-sagemaker-domain-resourcespec-sagemakerimageversionarn
         */
        readonly sageMakerImageVersionArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ResourceSpecProperty`
 *
 * @param properties - the TypeScript properties of a `ResourceSpecProperty`
 *
 * @returns the result of the validation.
 */
function CfnDomain_ResourceSpecPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('sageMakerImageArn', cdk.validateString)(properties.sageMakerImageArn));
    errors.collect(cdk.propertyValidator('sageMakerImageVersionArn', cdk.validateString)(properties.sageMakerImageVersionArn));
    return errors.wrap('supplied properties not correct for "ResourceSpecProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Domain.ResourceSpec` resource
 *
 * @param properties - the TypeScript properties of a `ResourceSpecProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Domain.ResourceSpec` resource.
 */
// @ts-ignore TS6133
function cfnDomainResourceSpecPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomain_ResourceSpecPropertyValidator(properties).assertSuccess();
    return {
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        SageMakerImageArn: cdk.stringToCloudFormation(properties.sageMakerImageArn),
        SageMakerImageVersionArn: cdk.stringToCloudFormation(properties.sageMakerImageVersionArn),
    };
}

// @ts-ignore TS6133
function CfnDomainResourceSpecPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomain.ResourceSpecProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomain.ResourceSpecProperty>();
    ret.addPropertyResult('instanceType', 'InstanceType', properties.InstanceType != null ? cfn_parse.FromCloudFormation.getString(properties.InstanceType) : undefined);
    ret.addPropertyResult('sageMakerImageArn', 'SageMakerImageArn', properties.SageMakerImageArn != null ? cfn_parse.FromCloudFormation.getString(properties.SageMakerImageArn) : undefined);
    ret.addPropertyResult('sageMakerImageVersionArn', 'SageMakerImageVersionArn', properties.SageMakerImageVersionArn != null ? cfn_parse.FromCloudFormation.getString(properties.SageMakerImageVersionArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDomain {
    /**
     * Specifies options when sharing an Amazon SageMaker Studio notebook. These settings are specified as part of `DefaultUserSettings` when the [CreateDomain](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_CreateDomain.html) API is called, and as part of `UserSettings` when the [CreateUserProfile](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_CreateUserProfile.html) API is called.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-sharingsettings.html
     */
    export interface SharingSettingsProperty {
        /**
         * Whether to include the notebook cell output when sharing the notebook. The default is `Disabled` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-sharingsettings.html#cfn-sagemaker-domain-sharingsettings-notebookoutputoption
         */
        readonly notebookOutputOption?: string;
        /**
         * When `NotebookOutputOption` is `Allowed` , the AWS Key Management Service (KMS) encryption key ID used to encrypt the notebook cell output in the Amazon S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-sharingsettings.html#cfn-sagemaker-domain-sharingsettings-s3kmskeyid
         */
        readonly s3KmsKeyId?: string;
        /**
         * When `NotebookOutputOption` is `Allowed` , the Amazon S3 bucket used to store the shared notebook snapshots.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-sharingsettings.html#cfn-sagemaker-domain-sharingsettings-s3outputpath
         */
        readonly s3OutputPath?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SharingSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `SharingSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDomain_SharingSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('notebookOutputOption', cdk.validateString)(properties.notebookOutputOption));
    errors.collect(cdk.propertyValidator('s3KmsKeyId', cdk.validateString)(properties.s3KmsKeyId));
    errors.collect(cdk.propertyValidator('s3OutputPath', cdk.validateString)(properties.s3OutputPath));
    return errors.wrap('supplied properties not correct for "SharingSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Domain.SharingSettings` resource
 *
 * @param properties - the TypeScript properties of a `SharingSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Domain.SharingSettings` resource.
 */
// @ts-ignore TS6133
function cfnDomainSharingSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomain_SharingSettingsPropertyValidator(properties).assertSuccess();
    return {
        NotebookOutputOption: cdk.stringToCloudFormation(properties.notebookOutputOption),
        S3KmsKeyId: cdk.stringToCloudFormation(properties.s3KmsKeyId),
        S3OutputPath: cdk.stringToCloudFormation(properties.s3OutputPath),
    };
}

// @ts-ignore TS6133
function CfnDomainSharingSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomain.SharingSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomain.SharingSettingsProperty>();
    ret.addPropertyResult('notebookOutputOption', 'NotebookOutputOption', properties.NotebookOutputOption != null ? cfn_parse.FromCloudFormation.getString(properties.NotebookOutputOption) : undefined);
    ret.addPropertyResult('s3KmsKeyId', 'S3KmsKeyId', properties.S3KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.S3KmsKeyId) : undefined);
    ret.addPropertyResult('s3OutputPath', 'S3OutputPath', properties.S3OutputPath != null ? cfn_parse.FromCloudFormation.getString(properties.S3OutputPath) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDomain {
    /**
     * A collection of settings that apply to users of Amazon SageMaker Studio. These settings are specified when the [CreateUserProfile](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_CreateUserProfile.html) API is called, and as `DefaultUserSettings` when the [CreateDomain](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_CreateDomain.html) API is called.
     *
     * `SecurityGroups` is aggregated when specified in both calls. For all other settings in `UserSettings` , the values specified in `CreateUserProfile` take precedence over those specified in `CreateDomain` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-usersettings.html
     */
    export interface UserSettingsProperty {
        /**
         * The execution role for the user.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-usersettings.html#cfn-sagemaker-domain-usersettings-executionrole
         */
        readonly executionRole?: string;
        /**
         * The Jupyter server's app settings.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-usersettings.html#cfn-sagemaker-domain-usersettings-jupyterserverappsettings
         */
        readonly jupyterServerAppSettings?: CfnDomain.JupyterServerAppSettingsProperty | cdk.IResolvable;
        /**
         * The kernel gateway app settings.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-usersettings.html#cfn-sagemaker-domain-usersettings-kernelgatewayappsettings
         */
        readonly kernelGatewayAppSettings?: CfnDomain.KernelGatewayAppSettingsProperty | cdk.IResolvable;
        /**
         * A collection of settings that configure user interaction with the `RStudioServerPro` app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-usersettings.html#cfn-sagemaker-domain-usersettings-rstudioserverproappsettings
         */
        readonly rStudioServerProAppSettings?: CfnDomain.RStudioServerProAppSettingsProperty | cdk.IResolvable;
        /**
         * The security groups for the Amazon Virtual Private Cloud (VPC) that Studio uses for communication.
         *
         * Optional when the `CreateDomain.AppNetworkAccessType` parameter is set to `PublicInternetOnly` .
         *
         * Required when the `CreateDomain.AppNetworkAccessType` parameter is set to `VpcOnly` .
         *
         * Amazon SageMaker adds a security group to allow NFS traffic from SageMaker Studio. Therefore, the number of security groups that you can specify is one less than the maximum number shown.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-usersettings.html#cfn-sagemaker-domain-usersettings-securitygroups
         */
        readonly securityGroups?: string[];
        /**
         * Specifies options for sharing SageMaker Studio notebooks.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-domain-usersettings.html#cfn-sagemaker-domain-usersettings-sharingsettings
         */
        readonly sharingSettings?: CfnDomain.SharingSettingsProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `UserSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `UserSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDomain_UserSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('executionRole', cdk.validateString)(properties.executionRole));
    errors.collect(cdk.propertyValidator('jupyterServerAppSettings', CfnDomain_JupyterServerAppSettingsPropertyValidator)(properties.jupyterServerAppSettings));
    errors.collect(cdk.propertyValidator('kernelGatewayAppSettings', CfnDomain_KernelGatewayAppSettingsPropertyValidator)(properties.kernelGatewayAppSettings));
    errors.collect(cdk.propertyValidator('rStudioServerProAppSettings', CfnDomain_RStudioServerProAppSettingsPropertyValidator)(properties.rStudioServerProAppSettings));
    errors.collect(cdk.propertyValidator('securityGroups', cdk.listValidator(cdk.validateString))(properties.securityGroups));
    errors.collect(cdk.propertyValidator('sharingSettings', CfnDomain_SharingSettingsPropertyValidator)(properties.sharingSettings));
    return errors.wrap('supplied properties not correct for "UserSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Domain.UserSettings` resource
 *
 * @param properties - the TypeScript properties of a `UserSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Domain.UserSettings` resource.
 */
// @ts-ignore TS6133
function cfnDomainUserSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomain_UserSettingsPropertyValidator(properties).assertSuccess();
    return {
        ExecutionRole: cdk.stringToCloudFormation(properties.executionRole),
        JupyterServerAppSettings: cfnDomainJupyterServerAppSettingsPropertyToCloudFormation(properties.jupyterServerAppSettings),
        KernelGatewayAppSettings: cfnDomainKernelGatewayAppSettingsPropertyToCloudFormation(properties.kernelGatewayAppSettings),
        RStudioServerProAppSettings: cfnDomainRStudioServerProAppSettingsPropertyToCloudFormation(properties.rStudioServerProAppSettings),
        SecurityGroups: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroups),
        SharingSettings: cfnDomainSharingSettingsPropertyToCloudFormation(properties.sharingSettings),
    };
}

// @ts-ignore TS6133
function CfnDomainUserSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomain.UserSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomain.UserSettingsProperty>();
    ret.addPropertyResult('executionRole', 'ExecutionRole', properties.ExecutionRole != null ? cfn_parse.FromCloudFormation.getString(properties.ExecutionRole) : undefined);
    ret.addPropertyResult('jupyterServerAppSettings', 'JupyterServerAppSettings', properties.JupyterServerAppSettings != null ? CfnDomainJupyterServerAppSettingsPropertyFromCloudFormation(properties.JupyterServerAppSettings) : undefined);
    ret.addPropertyResult('kernelGatewayAppSettings', 'KernelGatewayAppSettings', properties.KernelGatewayAppSettings != null ? CfnDomainKernelGatewayAppSettingsPropertyFromCloudFormation(properties.KernelGatewayAppSettings) : undefined);
    ret.addPropertyResult('rStudioServerProAppSettings', 'RStudioServerProAppSettings', properties.RStudioServerProAppSettings != null ? CfnDomainRStudioServerProAppSettingsPropertyFromCloudFormation(properties.RStudioServerProAppSettings) : undefined);
    ret.addPropertyResult('securityGroups', 'SecurityGroups', properties.SecurityGroups != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroups) : undefined);
    ret.addPropertyResult('sharingSettings', 'SharingSettings', properties.SharingSettings != null ? CfnDomainSharingSettingsPropertyFromCloudFormation(properties.SharingSettings) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnEndpoint`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html
 */
export interface CfnEndpointProps {

    /**
     * The name of the [AWS::SageMaker::EndpointConfig](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html) resource that specifies the configuration for the endpoint. For more information, see [CreateEndpointConfig](https://docs.aws.amazon.com/sagemaker/latest/dg/API_CreateEndpointConfig.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html#cfn-sagemaker-endpoint-endpointconfigname
     */
    readonly endpointConfigName: string;

    /**
     * The deployment configuration for an endpoint, which contains the desired deployment strategy and rollback configurations.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html#cfn-sagemaker-endpoint-deploymentconfig
     */
    readonly deploymentConfig?: CfnEndpoint.DeploymentConfigProperty | cdk.IResolvable;

    /**
     * The name of the endpoint.The name must be unique within an AWS Region in your AWS account. The name is case-insensitive in `CreateEndpoint` , but the case is preserved and must be matched in [](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpoint.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html#cfn-sagemaker-endpoint-endpointname
     */
    readonly endpointName?: string;

    /**
     * When you are updating endpoint resources with [RetainAllVariantProperties](https://docs.aws.amazon.com/sagemaker/latest/dg/API_UpdateEndpoint.html#SageMaker-UpdateEndpoint-request-RetainAllVariantProperties) whose value is set to `true` , `ExcludeRetainedVariantProperties` specifies the list of type [VariantProperty](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-variantproperty.html) to override with the values provided by `EndpointConfig` . If you don't specify a value for `ExcludeAllVariantProperties` , no variant properties are overridden. Don't use this property when creating new endpoint resources or when `RetainAllVariantProperties` is set to `false` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html#cfn-sagemaker-endpoint-excluderetainedvariantproperties
     */
    readonly excludeRetainedVariantProperties?: Array<CfnEndpoint.VariantPropertyProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * When updating endpoint resources, enables or disables the retention of variant properties, such as the instance count or the variant weight. To retain the variant properties of an endpoint when updating it, set `RetainAllVariantProperties` to `true` . To use the variant properties specified in a new `EndpointConfig` call when updating an endpoint, set `RetainAllVariantProperties` to `false` . Use this property only when updating endpoint resources, not when creating new endpoint resources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html#cfn-sagemaker-endpoint-retainallvariantproperties
     */
    readonly retainAllVariantProperties?: boolean | cdk.IResolvable;

    /**
     * Specifies whether to reuse the last deployment configuration. The default value is false (the configuration is not reused).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html#cfn-sagemaker-endpoint-retaindeploymentconfig
     */
    readonly retainDeploymentConfig?: boolean | cdk.IResolvable;

    /**
     * A list of key-value pairs to apply to this resource.
     *
     * For more information, see [Resource Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) and [Using Cost Allocation Tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#allocation-what) in the *AWS Billing and Cost Management User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html#cfn-sagemaker-endpoint-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnEndpointProps`
 *
 * @param properties - the TypeScript properties of a `CfnEndpointProps`
 *
 * @returns the result of the validation.
 */
function CfnEndpointPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('deploymentConfig', CfnEndpoint_DeploymentConfigPropertyValidator)(properties.deploymentConfig));
    errors.collect(cdk.propertyValidator('endpointConfigName', cdk.requiredValidator)(properties.endpointConfigName));
    errors.collect(cdk.propertyValidator('endpointConfigName', cdk.validateString)(properties.endpointConfigName));
    errors.collect(cdk.propertyValidator('endpointName', cdk.validateString)(properties.endpointName));
    errors.collect(cdk.propertyValidator('excludeRetainedVariantProperties', cdk.listValidator(CfnEndpoint_VariantPropertyPropertyValidator))(properties.excludeRetainedVariantProperties));
    errors.collect(cdk.propertyValidator('retainAllVariantProperties', cdk.validateBoolean)(properties.retainAllVariantProperties));
    errors.collect(cdk.propertyValidator('retainDeploymentConfig', cdk.validateBoolean)(properties.retainDeploymentConfig));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnEndpointProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint` resource
 *
 * @param properties - the TypeScript properties of a `CfnEndpointProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint` resource.
 */
// @ts-ignore TS6133
function cfnEndpointPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpointPropsValidator(properties).assertSuccess();
    return {
        EndpointConfigName: cdk.stringToCloudFormation(properties.endpointConfigName),
        DeploymentConfig: cfnEndpointDeploymentConfigPropertyToCloudFormation(properties.deploymentConfig),
        EndpointName: cdk.stringToCloudFormation(properties.endpointName),
        ExcludeRetainedVariantProperties: cdk.listMapper(cfnEndpointVariantPropertyPropertyToCloudFormation)(properties.excludeRetainedVariantProperties),
        RetainAllVariantProperties: cdk.booleanToCloudFormation(properties.retainAllVariantProperties),
        RetainDeploymentConfig: cdk.booleanToCloudFormation(properties.retainDeploymentConfig),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnEndpointPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpointProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpointProps>();
    ret.addPropertyResult('endpointConfigName', 'EndpointConfigName', cfn_parse.FromCloudFormation.getString(properties.EndpointConfigName));
    ret.addPropertyResult('deploymentConfig', 'DeploymentConfig', properties.DeploymentConfig != null ? CfnEndpointDeploymentConfigPropertyFromCloudFormation(properties.DeploymentConfig) : undefined);
    ret.addPropertyResult('endpointName', 'EndpointName', properties.EndpointName != null ? cfn_parse.FromCloudFormation.getString(properties.EndpointName) : undefined);
    ret.addPropertyResult('excludeRetainedVariantProperties', 'ExcludeRetainedVariantProperties', properties.ExcludeRetainedVariantProperties != null ? cfn_parse.FromCloudFormation.getArray(CfnEndpointVariantPropertyPropertyFromCloudFormation)(properties.ExcludeRetainedVariantProperties) : undefined);
    ret.addPropertyResult('retainAllVariantProperties', 'RetainAllVariantProperties', properties.RetainAllVariantProperties != null ? cfn_parse.FromCloudFormation.getBoolean(properties.RetainAllVariantProperties) : undefined);
    ret.addPropertyResult('retainDeploymentConfig', 'RetainDeploymentConfig', properties.RetainDeploymentConfig != null ? cfn_parse.FromCloudFormation.getBoolean(properties.RetainDeploymentConfig) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::Endpoint`
 *
 * Use the `AWS::SageMaker::Endpoint` resource to create an endpoint using the specified configuration in the request. Amazon SageMaker uses the endpoint to provision resources and deploy models. You create the endpoint configuration with the [AWS::SageMaker::EndpointConfig](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html) resource. For more information, see [Deploy a Model on Amazon SageMaker Hosting Services](https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-hosting.html) in the *Amazon SageMaker Developer Guide* .
 *
 * @cloudformationResource AWS::SageMaker::Endpoint
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html
 */
export class CfnEndpoint extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::Endpoint";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnEndpoint {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnEndpointPropsFromCloudFormation(resourceProperties);
        const ret = new CfnEndpoint(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the endpoint, such as `MyEndpoint` .
     * @cloudformationAttribute EndpointName
     */
    public readonly attrEndpointName: string;

    /**
     * The name of the [AWS::SageMaker::EndpointConfig](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html) resource that specifies the configuration for the endpoint. For more information, see [CreateEndpointConfig](https://docs.aws.amazon.com/sagemaker/latest/dg/API_CreateEndpointConfig.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html#cfn-sagemaker-endpoint-endpointconfigname
     */
    public endpointConfigName: string;

    /**
     * The deployment configuration for an endpoint, which contains the desired deployment strategy and rollback configurations.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html#cfn-sagemaker-endpoint-deploymentconfig
     */
    public deploymentConfig: CfnEndpoint.DeploymentConfigProperty | cdk.IResolvable | undefined;

    /**
     * The name of the endpoint.The name must be unique within an AWS Region in your AWS account. The name is case-insensitive in `CreateEndpoint` , but the case is preserved and must be matched in [](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_runtime_InvokeEndpoint.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html#cfn-sagemaker-endpoint-endpointname
     */
    public endpointName: string | undefined;

    /**
     * When you are updating endpoint resources with [RetainAllVariantProperties](https://docs.aws.amazon.com/sagemaker/latest/dg/API_UpdateEndpoint.html#SageMaker-UpdateEndpoint-request-RetainAllVariantProperties) whose value is set to `true` , `ExcludeRetainedVariantProperties` specifies the list of type [VariantProperty](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-variantproperty.html) to override with the values provided by `EndpointConfig` . If you don't specify a value for `ExcludeAllVariantProperties` , no variant properties are overridden. Don't use this property when creating new endpoint resources or when `RetainAllVariantProperties` is set to `false` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html#cfn-sagemaker-endpoint-excluderetainedvariantproperties
     */
    public excludeRetainedVariantProperties: Array<CfnEndpoint.VariantPropertyProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * When updating endpoint resources, enables or disables the retention of variant properties, such as the instance count or the variant weight. To retain the variant properties of an endpoint when updating it, set `RetainAllVariantProperties` to `true` . To use the variant properties specified in a new `EndpointConfig` call when updating an endpoint, set `RetainAllVariantProperties` to `false` . Use this property only when updating endpoint resources, not when creating new endpoint resources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html#cfn-sagemaker-endpoint-retainallvariantproperties
     */
    public retainAllVariantProperties: boolean | cdk.IResolvable | undefined;

    /**
     * Specifies whether to reuse the last deployment configuration. The default value is false (the configuration is not reused).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html#cfn-sagemaker-endpoint-retaindeploymentconfig
     */
    public retainDeploymentConfig: boolean | cdk.IResolvable | undefined;

    /**
     * A list of key-value pairs to apply to this resource.
     *
     * For more information, see [Resource Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) and [Using Cost Allocation Tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#allocation-what) in the *AWS Billing and Cost Management User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpoint.html#cfn-sagemaker-endpoint-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::Endpoint`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnEndpointProps) {
        super(scope, id, { type: CfnEndpoint.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'endpointConfigName', this);
        this.attrEndpointName = cdk.Token.asString(this.getAtt('EndpointName'));

        this.endpointConfigName = props.endpointConfigName;
        this.deploymentConfig = props.deploymentConfig;
        this.endpointName = props.endpointName;
        this.excludeRetainedVariantProperties = props.excludeRetainedVariantProperties;
        this.retainAllVariantProperties = props.retainAllVariantProperties;
        this.retainDeploymentConfig = props.retainDeploymentConfig;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::Endpoint", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnEndpoint.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            endpointConfigName: this.endpointConfigName,
            deploymentConfig: this.deploymentConfig,
            endpointName: this.endpointName,
            excludeRetainedVariantProperties: this.excludeRetainedVariantProperties,
            retainAllVariantProperties: this.retainAllVariantProperties,
            retainDeploymentConfig: this.retainDeploymentConfig,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnEndpointPropsToCloudFormation(props);
    }
}

export namespace CfnEndpoint {
    /**
     * An Amazon CloudWatch alarm configured to monitor metrics on an endpoint.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-alarm.html
     */
    export interface AlarmProperty {
        /**
         * The name of a CloudWatch alarm in your account.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-alarm.html#cfn-sagemaker-endpoint-alarm-alarmname
         */
        readonly alarmName: string;
    }
}

/**
 * Determine whether the given properties match those of a `AlarmProperty`
 *
 * @param properties - the TypeScript properties of a `AlarmProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpoint_AlarmPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('alarmName', cdk.requiredValidator)(properties.alarmName));
    errors.collect(cdk.propertyValidator('alarmName', cdk.validateString)(properties.alarmName));
    return errors.wrap('supplied properties not correct for "AlarmProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint.Alarm` resource
 *
 * @param properties - the TypeScript properties of a `AlarmProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint.Alarm` resource.
 */
// @ts-ignore TS6133
function cfnEndpointAlarmPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpoint_AlarmPropertyValidator(properties).assertSuccess();
    return {
        AlarmName: cdk.stringToCloudFormation(properties.alarmName),
    };
}

// @ts-ignore TS6133
function CfnEndpointAlarmPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpoint.AlarmProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpoint.AlarmProperty>();
    ret.addPropertyResult('alarmName', 'AlarmName', cfn_parse.FromCloudFormation.getString(properties.AlarmName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnEndpoint {
    /**
     * Automatic rollback configuration for handling endpoint deployment failures and recovery.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-autorollbackconfig.html
     */
    export interface AutoRollbackConfigProperty {
        /**
         * List of CloudWatch alarms in your account that are configured to monitor metrics on an endpoint. If any alarms are tripped during a deployment, SageMaker rolls back the deployment.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-autorollbackconfig.html#cfn-sagemaker-endpoint-autorollbackconfig-alarms
         */
        readonly alarms: Array<CfnEndpoint.AlarmProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AutoRollbackConfigProperty`
 *
 * @param properties - the TypeScript properties of a `AutoRollbackConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpoint_AutoRollbackConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('alarms', cdk.requiredValidator)(properties.alarms));
    errors.collect(cdk.propertyValidator('alarms', cdk.listValidator(CfnEndpoint_AlarmPropertyValidator))(properties.alarms));
    return errors.wrap('supplied properties not correct for "AutoRollbackConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint.AutoRollbackConfig` resource
 *
 * @param properties - the TypeScript properties of a `AutoRollbackConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint.AutoRollbackConfig` resource.
 */
// @ts-ignore TS6133
function cfnEndpointAutoRollbackConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpoint_AutoRollbackConfigPropertyValidator(properties).assertSuccess();
    return {
        Alarms: cdk.listMapper(cfnEndpointAlarmPropertyToCloudFormation)(properties.alarms),
    };
}

// @ts-ignore TS6133
function CfnEndpointAutoRollbackConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpoint.AutoRollbackConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpoint.AutoRollbackConfigProperty>();
    ret.addPropertyResult('alarms', 'Alarms', cfn_parse.FromCloudFormation.getArray(CfnEndpointAlarmPropertyFromCloudFormation)(properties.Alarms));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnEndpoint {
    /**
     * Update policy for a blue/green deployment. If this update policy is specified, SageMaker creates a new fleet during the deployment while maintaining the old fleet. SageMaker flips traffic to the new fleet according to the specified traffic routing configuration. Only one update policy should be used in the deployment configuration. If no update policy is specified, SageMaker uses a blue/green deployment strategy with all at once traffic shifting by default.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-bluegreenupdatepolicy.html
     */
    export interface BlueGreenUpdatePolicyProperty {
        /**
         * Maximum execution timeout for the deployment. Note that the timeout value should be larger than the total waiting time specified in `TerminationWaitInSeconds` and `WaitIntervalInSeconds` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-bluegreenupdatepolicy.html#cfn-sagemaker-endpoint-bluegreenupdatepolicy-maximumexecutiontimeoutinseconds
         */
        readonly maximumExecutionTimeoutInSeconds?: number;
        /**
         * Additional waiting time in seconds after the completion of an endpoint deployment before terminating the old endpoint fleet. Default is 0.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-bluegreenupdatepolicy.html#cfn-sagemaker-endpoint-bluegreenupdatepolicy-terminationwaitinseconds
         */
        readonly terminationWaitInSeconds?: number;
        /**
         * Defines the traffic routing strategy to shift traffic from the old fleet to the new fleet during an endpoint deployment.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-bluegreenupdatepolicy.html#cfn-sagemaker-endpoint-bluegreenupdatepolicy-trafficroutingconfiguration
         */
        readonly trafficRoutingConfiguration: CfnEndpoint.TrafficRoutingConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `BlueGreenUpdatePolicyProperty`
 *
 * @param properties - the TypeScript properties of a `BlueGreenUpdatePolicyProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpoint_BlueGreenUpdatePolicyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('maximumExecutionTimeoutInSeconds', cdk.validateNumber)(properties.maximumExecutionTimeoutInSeconds));
    errors.collect(cdk.propertyValidator('terminationWaitInSeconds', cdk.validateNumber)(properties.terminationWaitInSeconds));
    errors.collect(cdk.propertyValidator('trafficRoutingConfiguration', cdk.requiredValidator)(properties.trafficRoutingConfiguration));
    errors.collect(cdk.propertyValidator('trafficRoutingConfiguration', CfnEndpoint_TrafficRoutingConfigPropertyValidator)(properties.trafficRoutingConfiguration));
    return errors.wrap('supplied properties not correct for "BlueGreenUpdatePolicyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint.BlueGreenUpdatePolicy` resource
 *
 * @param properties - the TypeScript properties of a `BlueGreenUpdatePolicyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint.BlueGreenUpdatePolicy` resource.
 */
// @ts-ignore TS6133
function cfnEndpointBlueGreenUpdatePolicyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpoint_BlueGreenUpdatePolicyPropertyValidator(properties).assertSuccess();
    return {
        MaximumExecutionTimeoutInSeconds: cdk.numberToCloudFormation(properties.maximumExecutionTimeoutInSeconds),
        TerminationWaitInSeconds: cdk.numberToCloudFormation(properties.terminationWaitInSeconds),
        TrafficRoutingConfiguration: cfnEndpointTrafficRoutingConfigPropertyToCloudFormation(properties.trafficRoutingConfiguration),
    };
}

// @ts-ignore TS6133
function CfnEndpointBlueGreenUpdatePolicyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpoint.BlueGreenUpdatePolicyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpoint.BlueGreenUpdatePolicyProperty>();
    ret.addPropertyResult('maximumExecutionTimeoutInSeconds', 'MaximumExecutionTimeoutInSeconds', properties.MaximumExecutionTimeoutInSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaximumExecutionTimeoutInSeconds) : undefined);
    ret.addPropertyResult('terminationWaitInSeconds', 'TerminationWaitInSeconds', properties.TerminationWaitInSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.TerminationWaitInSeconds) : undefined);
    ret.addPropertyResult('trafficRoutingConfiguration', 'TrafficRoutingConfiguration', CfnEndpointTrafficRoutingConfigPropertyFromCloudFormation(properties.TrafficRoutingConfiguration));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnEndpoint {
    /**
     * Specifies the endpoint capacity to activate for production.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-capacitysize.html
     */
    export interface CapacitySizeProperty {
        /**
         * Specifies the endpoint capacity type.
         *
         * - `INSTANCE_COUNT` : The endpoint activates based on the number of instances.
         * - `CAPACITY_PERCENT` : The endpoint activates based on the specified percentage of capacity.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-capacitysize.html#cfn-sagemaker-endpoint-capacitysize-type
         */
        readonly type: string;
        /**
         * Defines the capacity size, either as a number of instances or a capacity percentage.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-capacitysize.html#cfn-sagemaker-endpoint-capacitysize-value
         */
        readonly value: number;
    }
}

/**
 * Determine whether the given properties match those of a `CapacitySizeProperty`
 *
 * @param properties - the TypeScript properties of a `CapacitySizeProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpoint_CapacitySizePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateNumber)(properties.value));
    return errors.wrap('supplied properties not correct for "CapacitySizeProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint.CapacitySize` resource
 *
 * @param properties - the TypeScript properties of a `CapacitySizeProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint.CapacitySize` resource.
 */
// @ts-ignore TS6133
function cfnEndpointCapacitySizePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpoint_CapacitySizePropertyValidator(properties).assertSuccess();
    return {
        Type: cdk.stringToCloudFormation(properties.type),
        Value: cdk.numberToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnEndpointCapacitySizePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpoint.CapacitySizeProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpoint.CapacitySizeProperty>();
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getNumber(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnEndpoint {
    /**
     * The deployment configuration for an endpoint, which contains the desired deployment strategy and rollback configurations.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-deploymentconfig.html
     */
    export interface DeploymentConfigProperty {
        /**
         * Automatic rollback configuration for handling endpoint deployment failures and recovery.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-deploymentconfig.html#cfn-sagemaker-endpoint-deploymentconfig-autorollbackconfiguration
         */
        readonly autoRollbackConfiguration?: CfnEndpoint.AutoRollbackConfigProperty | cdk.IResolvable;
        /**
         * Update policy for a blue/green deployment. If this update policy is specified, SageMaker creates a new fleet during the deployment while maintaining the old fleet. SageMaker flips traffic to the new fleet according to the specified traffic routing configuration. Only one update policy should be used in the deployment configuration. If no update policy is specified, SageMaker uses a blue/green deployment strategy with all at once traffic shifting by default.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-deploymentconfig.html#cfn-sagemaker-endpoint-deploymentconfig-bluegreenupdatepolicy
         */
        readonly blueGreenUpdatePolicy: CfnEndpoint.BlueGreenUpdatePolicyProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DeploymentConfigProperty`
 *
 * @param properties - the TypeScript properties of a `DeploymentConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpoint_DeploymentConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('autoRollbackConfiguration', CfnEndpoint_AutoRollbackConfigPropertyValidator)(properties.autoRollbackConfiguration));
    errors.collect(cdk.propertyValidator('blueGreenUpdatePolicy', cdk.requiredValidator)(properties.blueGreenUpdatePolicy));
    errors.collect(cdk.propertyValidator('blueGreenUpdatePolicy', CfnEndpoint_BlueGreenUpdatePolicyPropertyValidator)(properties.blueGreenUpdatePolicy));
    return errors.wrap('supplied properties not correct for "DeploymentConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint.DeploymentConfig` resource
 *
 * @param properties - the TypeScript properties of a `DeploymentConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint.DeploymentConfig` resource.
 */
// @ts-ignore TS6133
function cfnEndpointDeploymentConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpoint_DeploymentConfigPropertyValidator(properties).assertSuccess();
    return {
        AutoRollbackConfiguration: cfnEndpointAutoRollbackConfigPropertyToCloudFormation(properties.autoRollbackConfiguration),
        BlueGreenUpdatePolicy: cfnEndpointBlueGreenUpdatePolicyPropertyToCloudFormation(properties.blueGreenUpdatePolicy),
    };
}

// @ts-ignore TS6133
function CfnEndpointDeploymentConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpoint.DeploymentConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpoint.DeploymentConfigProperty>();
    ret.addPropertyResult('autoRollbackConfiguration', 'AutoRollbackConfiguration', properties.AutoRollbackConfiguration != null ? CfnEndpointAutoRollbackConfigPropertyFromCloudFormation(properties.AutoRollbackConfiguration) : undefined);
    ret.addPropertyResult('blueGreenUpdatePolicy', 'BlueGreenUpdatePolicy', CfnEndpointBlueGreenUpdatePolicyPropertyFromCloudFormation(properties.BlueGreenUpdatePolicy));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnEndpoint {
    /**
     * Defines the traffic routing strategy during an endpoint deployment to shift traffic from the old fleet to the new fleet.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-trafficroutingconfig.html
     */
    export interface TrafficRoutingConfigProperty {
        /**
         * Batch size for the first step to turn on traffic on the new endpoint fleet. `Value` must be less than or equal to 50% of the variant's total instance count.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-trafficroutingconfig.html#cfn-sagemaker-endpoint-trafficroutingconfig-canarysize
         */
        readonly canarySize?: CfnEndpoint.CapacitySizeProperty | cdk.IResolvable;
        /**
         * Batch size for each step to turn on traffic on the new endpoint fleet. `Value` must be 10-50% of the variant's total instance count.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-trafficroutingconfig.html#cfn-sagemaker-endpoint-trafficroutingconfig-linearstepsize
         */
        readonly linearStepSize?: CfnEndpoint.CapacitySizeProperty | cdk.IResolvable;
        /**
         * Traffic routing strategy type.
         *
         * - `ALL_AT_ONCE` : Endpoint traffic shifts to the new fleet in a single step.
         * - `CANARY` : Endpoint traffic shifts to the new fleet in two steps. The first step is the canary, which is a small portion of the traffic. The second step is the remainder of the traffic.
         * - `LINEAR` : Endpoint traffic shifts to the new fleet in n steps of a configurable size.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-trafficroutingconfig.html#cfn-sagemaker-endpoint-trafficroutingconfig-type
         */
        readonly type: string;
        /**
         * The waiting time (in seconds) between incremental steps to turn on traffic on the new endpoint fleet.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-trafficroutingconfig.html#cfn-sagemaker-endpoint-trafficroutingconfig-waitintervalinseconds
         */
        readonly waitIntervalInSeconds?: number;
    }
}

/**
 * Determine whether the given properties match those of a `TrafficRoutingConfigProperty`
 *
 * @param properties - the TypeScript properties of a `TrafficRoutingConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpoint_TrafficRoutingConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('canarySize', CfnEndpoint_CapacitySizePropertyValidator)(properties.canarySize));
    errors.collect(cdk.propertyValidator('linearStepSize', CfnEndpoint_CapacitySizePropertyValidator)(properties.linearStepSize));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    errors.collect(cdk.propertyValidator('waitIntervalInSeconds', cdk.validateNumber)(properties.waitIntervalInSeconds));
    return errors.wrap('supplied properties not correct for "TrafficRoutingConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint.TrafficRoutingConfig` resource
 *
 * @param properties - the TypeScript properties of a `TrafficRoutingConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint.TrafficRoutingConfig` resource.
 */
// @ts-ignore TS6133
function cfnEndpointTrafficRoutingConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpoint_TrafficRoutingConfigPropertyValidator(properties).assertSuccess();
    return {
        CanarySize: cfnEndpointCapacitySizePropertyToCloudFormation(properties.canarySize),
        LinearStepSize: cfnEndpointCapacitySizePropertyToCloudFormation(properties.linearStepSize),
        Type: cdk.stringToCloudFormation(properties.type),
        WaitIntervalInSeconds: cdk.numberToCloudFormation(properties.waitIntervalInSeconds),
    };
}

// @ts-ignore TS6133
function CfnEndpointTrafficRoutingConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpoint.TrafficRoutingConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpoint.TrafficRoutingConfigProperty>();
    ret.addPropertyResult('canarySize', 'CanarySize', properties.CanarySize != null ? CfnEndpointCapacitySizePropertyFromCloudFormation(properties.CanarySize) : undefined);
    ret.addPropertyResult('linearStepSize', 'LinearStepSize', properties.LinearStepSize != null ? CfnEndpointCapacitySizePropertyFromCloudFormation(properties.LinearStepSize) : undefined);
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addPropertyResult('waitIntervalInSeconds', 'WaitIntervalInSeconds', properties.WaitIntervalInSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.WaitIntervalInSeconds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnEndpoint {
    /**
     * Specifies a production variant property type for an Endpoint.
     *
     * If you are updating an Endpoint with the [RetainAllVariantProperties](https://docs.aws.amazon.com/sagemaker/latest/dg/API_UpdateEndpoint.html#SageMaker-UpdateEndpoint-request-RetainAllVariantProperties) option set to `true` , the `VarientProperty` objects listed in [ExcludeRetainedVariantProperties](https://docs.aws.amazon.com/sagemaker/latest/dg/API_UpdateEndpoint.html#SageMaker-UpdateEndpoint-request-ExcludeRetainedVariantProperties) override the existing variant properties of the Endpoint.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-variantproperty.html
     */
    export interface VariantPropertyProperty {
        /**
         * The type of variant property. The supported values are:
         *
         * - `DesiredInstanceCount` : Overrides the existing variant instance counts using the [InitialInstanceCount](https://docs.aws.amazon.com/sagemaker/latest/dg/API_ProductionVariant.html#SageMaker-Type-ProductionVariant-InitialInstanceCount) values in the [ProductionVariants](https://docs.aws.amazon.com/sagemaker/latest/dg/API_CreateEndpointConfig.html#SageMaker-CreateEndpointConfig-request-ProductionVariants) .
         * - `DesiredWeight` : Overrides the existing variant weights using the [InitialVariantWeight](https://docs.aws.amazon.com/sagemaker/latest/dg/API_ProductionVariant.html#SageMaker-Type-ProductionVariant-InitialVariantWeight) values in the [ProductionVariants](https://docs.aws.amazon.com/sagemaker/latest/dg/API_CreateEndpointConfig.html#SageMaker-CreateEndpointConfig-request-ProductionVariants) .
         * - `DataCaptureConfig` : (Not currently supported.)
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpoint-variantproperty.html#cfn-sagemaker-endpoint-variantproperty-variantpropertytype
         */
        readonly variantPropertyType?: string;
    }
}

/**
 * Determine whether the given properties match those of a `VariantPropertyProperty`
 *
 * @param properties - the TypeScript properties of a `VariantPropertyProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpoint_VariantPropertyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('variantPropertyType', cdk.validateString)(properties.variantPropertyType));
    return errors.wrap('supplied properties not correct for "VariantPropertyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint.VariantProperty` resource
 *
 * @param properties - the TypeScript properties of a `VariantPropertyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Endpoint.VariantProperty` resource.
 */
// @ts-ignore TS6133
function cfnEndpointVariantPropertyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpoint_VariantPropertyPropertyValidator(properties).assertSuccess();
    return {
        VariantPropertyType: cdk.stringToCloudFormation(properties.variantPropertyType),
    };
}

// @ts-ignore TS6133
function CfnEndpointVariantPropertyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpoint.VariantPropertyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpoint.VariantPropertyProperty>();
    ret.addPropertyResult('variantPropertyType', 'VariantPropertyType', properties.VariantPropertyType != null ? cfn_parse.FromCloudFormation.getString(properties.VariantPropertyType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnEndpointConfig`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html
 */
export interface CfnEndpointConfigProps {

    /**
     * A list of `ProductionVariant` objects, one for each model that you want to host at this endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html#cfn-sagemaker-endpointconfig-productionvariants
     */
    readonly productionVariants: Array<CfnEndpointConfig.ProductionVariantProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Specifies configuration for how an endpoint performs asynchronous inference.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html#cfn-sagemaker-endpointconfig-asyncinferenceconfig
     */
    readonly asyncInferenceConfig?: CfnEndpointConfig.AsyncInferenceConfigProperty | cdk.IResolvable;

    /**
     * Specifies how to capture endpoint data for model monitor. The data capture configuration applies to all production variants hosted at the endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html#cfn-sagemaker-endpointconfig-datacaptureconfig
     */
    readonly dataCaptureConfig?: CfnEndpointConfig.DataCaptureConfigProperty | cdk.IResolvable;

    /**
     * The name of the endpoint configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html#cfn-sagemaker-endpointconfig-endpointconfigname
     */
    readonly endpointConfigName?: string;

    /**
     * The Amazon Resource Name (ARN) of an AWS Key Management Service key that Amazon SageMaker uses to encrypt data on the storage volume attached to the ML compute instance that hosts the endpoint.
     *
     * - Key ID: `1234abcd-12ab-34cd-56ef-1234567890ab`
     * - Key ARN: `arn:aws:kms:us-west-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab`
     * - Alias name: `alias/ExampleAlias`
     * - Alias name ARN: `arn:aws:kms:us-west-2:111122223333:alias/ExampleAlias`
     *
     * The KMS key policy must grant permission to the IAM role that you specify in your `CreateEndpoint` , `UpdateEndpoint` requests. For more information, refer to the AWS Key Management Service section [Using Key Policies in AWS KMS](https://docs.aws.amazon.com//kms/latest/developerguide/key-policies.html)
     *
     * > Certain Nitro-based instances include local storage, dependent on the instance type. Local storage volumes are encrypted using a hardware module on the instance. You can't request a `KmsKeyId` when using an instance type with local storage. If any of the models that you specify in the `ProductionVariants` parameter use nitro-based instances with local storage, do not specify a value for the `KmsKeyId` parameter. If you specify a value for `KmsKeyId` when using any nitro-based instances with local storage, the call to `CreateEndpointConfig` fails.
     * >
     * > For a list of instance types that support local instance storage, see [Instance Store Volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html#instance-store-volumes) .
     * >
     * > For more information about local instance storage encryption, see [SSD Instance Store Volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ssd-instance-store.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html#cfn-sagemaker-endpointconfig-kmskeyid
     */
    readonly kmsKeyId?: string;

    /**
     * A list of key-value pairs to apply to this resource.
     *
     * For more information, see [Resource Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) and [Using Cost Allocation Tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#allocation-what) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html#cfn-sagemaker-endpointconfig-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnEndpointConfigProps`
 *
 * @param properties - the TypeScript properties of a `CfnEndpointConfigProps`
 *
 * @returns the result of the validation.
 */
function CfnEndpointConfigPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('asyncInferenceConfig', CfnEndpointConfig_AsyncInferenceConfigPropertyValidator)(properties.asyncInferenceConfig));
    errors.collect(cdk.propertyValidator('dataCaptureConfig', CfnEndpointConfig_DataCaptureConfigPropertyValidator)(properties.dataCaptureConfig));
    errors.collect(cdk.propertyValidator('endpointConfigName', cdk.validateString)(properties.endpointConfigName));
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('productionVariants', cdk.requiredValidator)(properties.productionVariants));
    errors.collect(cdk.propertyValidator('productionVariants', cdk.listValidator(CfnEndpointConfig_ProductionVariantPropertyValidator))(properties.productionVariants));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnEndpointConfigProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig` resource
 *
 * @param properties - the TypeScript properties of a `CfnEndpointConfigProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig` resource.
 */
// @ts-ignore TS6133
function cfnEndpointConfigPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpointConfigPropsValidator(properties).assertSuccess();
    return {
        ProductionVariants: cdk.listMapper(cfnEndpointConfigProductionVariantPropertyToCloudFormation)(properties.productionVariants),
        AsyncInferenceConfig: cfnEndpointConfigAsyncInferenceConfigPropertyToCloudFormation(properties.asyncInferenceConfig),
        DataCaptureConfig: cfnEndpointConfigDataCaptureConfigPropertyToCloudFormation(properties.dataCaptureConfig),
        EndpointConfigName: cdk.stringToCloudFormation(properties.endpointConfigName),
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnEndpointConfigPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpointConfigProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpointConfigProps>();
    ret.addPropertyResult('productionVariants', 'ProductionVariants', cfn_parse.FromCloudFormation.getArray(CfnEndpointConfigProductionVariantPropertyFromCloudFormation)(properties.ProductionVariants));
    ret.addPropertyResult('asyncInferenceConfig', 'AsyncInferenceConfig', properties.AsyncInferenceConfig != null ? CfnEndpointConfigAsyncInferenceConfigPropertyFromCloudFormation(properties.AsyncInferenceConfig) : undefined);
    ret.addPropertyResult('dataCaptureConfig', 'DataCaptureConfig', properties.DataCaptureConfig != null ? CfnEndpointConfigDataCaptureConfigPropertyFromCloudFormation(properties.DataCaptureConfig) : undefined);
    ret.addPropertyResult('endpointConfigName', 'EndpointConfigName', properties.EndpointConfigName != null ? cfn_parse.FromCloudFormation.getString(properties.EndpointConfigName) : undefined);
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::EndpointConfig`
 *
 * The `AWS::SageMaker::EndpointConfig` resource creates a configuration for an Amazon SageMaker endpoint. For more information, see [CreateEndpointConfig](https://docs.aws.amazon.com/sagemaker/latest/dg/API_CreateEndpointConfig.html) in the *SageMaker Developer Guide* .
 *
 * @cloudformationResource AWS::SageMaker::EndpointConfig
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html
 */
export class CfnEndpointConfig extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::EndpointConfig";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnEndpointConfig {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnEndpointConfigPropsFromCloudFormation(resourceProperties);
        const ret = new CfnEndpointConfig(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the endpoint configuration, such as `MyEndpointConfiguration` .
     * @cloudformationAttribute EndpointConfigName
     */
    public readonly attrEndpointConfigName: string;

    /**
     * A list of `ProductionVariant` objects, one for each model that you want to host at this endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html#cfn-sagemaker-endpointconfig-productionvariants
     */
    public productionVariants: Array<CfnEndpointConfig.ProductionVariantProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Specifies configuration for how an endpoint performs asynchronous inference.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html#cfn-sagemaker-endpointconfig-asyncinferenceconfig
     */
    public asyncInferenceConfig: CfnEndpointConfig.AsyncInferenceConfigProperty | cdk.IResolvable | undefined;

    /**
     * Specifies how to capture endpoint data for model monitor. The data capture configuration applies to all production variants hosted at the endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html#cfn-sagemaker-endpointconfig-datacaptureconfig
     */
    public dataCaptureConfig: CfnEndpointConfig.DataCaptureConfigProperty | cdk.IResolvable | undefined;

    /**
     * The name of the endpoint configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html#cfn-sagemaker-endpointconfig-endpointconfigname
     */
    public endpointConfigName: string | undefined;

    /**
     * The Amazon Resource Name (ARN) of an AWS Key Management Service key that Amazon SageMaker uses to encrypt data on the storage volume attached to the ML compute instance that hosts the endpoint.
     *
     * - Key ID: `1234abcd-12ab-34cd-56ef-1234567890ab`
     * - Key ARN: `arn:aws:kms:us-west-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab`
     * - Alias name: `alias/ExampleAlias`
     * - Alias name ARN: `arn:aws:kms:us-west-2:111122223333:alias/ExampleAlias`
     *
     * The KMS key policy must grant permission to the IAM role that you specify in your `CreateEndpoint` , `UpdateEndpoint` requests. For more information, refer to the AWS Key Management Service section [Using Key Policies in AWS KMS](https://docs.aws.amazon.com//kms/latest/developerguide/key-policies.html)
     *
     * > Certain Nitro-based instances include local storage, dependent on the instance type. Local storage volumes are encrypted using a hardware module on the instance. You can't request a `KmsKeyId` when using an instance type with local storage. If any of the models that you specify in the `ProductionVariants` parameter use nitro-based instances with local storage, do not specify a value for the `KmsKeyId` parameter. If you specify a value for `KmsKeyId` when using any nitro-based instances with local storage, the call to `CreateEndpointConfig` fails.
     * >
     * > For a list of instance types that support local instance storage, see [Instance Store Volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html#instance-store-volumes) .
     * >
     * > For more information about local instance storage encryption, see [SSD Instance Store Volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ssd-instance-store.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html#cfn-sagemaker-endpointconfig-kmskeyid
     */
    public kmsKeyId: string | undefined;

    /**
     * A list of key-value pairs to apply to this resource.
     *
     * For more information, see [Resource Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) and [Using Cost Allocation Tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#allocation-what) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html#cfn-sagemaker-endpointconfig-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::EndpointConfig`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnEndpointConfigProps) {
        super(scope, id, { type: CfnEndpointConfig.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'productionVariants', this);
        this.attrEndpointConfigName = cdk.Token.asString(this.getAtt('EndpointConfigName'));

        this.productionVariants = props.productionVariants;
        this.asyncInferenceConfig = props.asyncInferenceConfig;
        this.dataCaptureConfig = props.dataCaptureConfig;
        this.endpointConfigName = props.endpointConfigName;
        this.kmsKeyId = props.kmsKeyId;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::EndpointConfig", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnEndpointConfig.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            productionVariants: this.productionVariants,
            asyncInferenceConfig: this.asyncInferenceConfig,
            dataCaptureConfig: this.dataCaptureConfig,
            endpointConfigName: this.endpointConfigName,
            kmsKeyId: this.kmsKeyId,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnEndpointConfigPropsToCloudFormation(props);
    }
}

export namespace CfnEndpointConfig {
    /**
     * Configures the behavior of the client used by SageMaker to interact with the model container during asynchronous inference.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferenceclientconfig.html
     */
    export interface AsyncInferenceClientConfigProperty {
        /**
         * The maximum number of concurrent requests sent by the SageMaker client to the model container. If no value is provided, SageMaker will choose an optimal value for you.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferenceclientconfig.html#cfn-sagemaker-endpointconfig-asyncinferenceclientconfig-maxconcurrentinvocationsperinstance
         */
        readonly maxConcurrentInvocationsPerInstance?: number;
    }
}

/**
 * Determine whether the given properties match those of a `AsyncInferenceClientConfigProperty`
 *
 * @param properties - the TypeScript properties of a `AsyncInferenceClientConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpointConfig_AsyncInferenceClientConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('maxConcurrentInvocationsPerInstance', cdk.validateNumber)(properties.maxConcurrentInvocationsPerInstance));
    return errors.wrap('supplied properties not correct for "AsyncInferenceClientConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.AsyncInferenceClientConfig` resource
 *
 * @param properties - the TypeScript properties of a `AsyncInferenceClientConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.AsyncInferenceClientConfig` resource.
 */
// @ts-ignore TS6133
function cfnEndpointConfigAsyncInferenceClientConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpointConfig_AsyncInferenceClientConfigPropertyValidator(properties).assertSuccess();
    return {
        MaxConcurrentInvocationsPerInstance: cdk.numberToCloudFormation(properties.maxConcurrentInvocationsPerInstance),
    };
}

// @ts-ignore TS6133
function CfnEndpointConfigAsyncInferenceClientConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpointConfig.AsyncInferenceClientConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpointConfig.AsyncInferenceClientConfigProperty>();
    ret.addPropertyResult('maxConcurrentInvocationsPerInstance', 'MaxConcurrentInvocationsPerInstance', properties.MaxConcurrentInvocationsPerInstance != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxConcurrentInvocationsPerInstance) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnEndpointConfig {
    /**
     * Specifies configuration for how an endpoint performs asynchronous inference.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferenceconfig.html
     */
    export interface AsyncInferenceConfigProperty {
        /**
         * Configures the behavior of the client used by SageMaker to interact with the model container during asynchronous inference.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferenceconfig.html#cfn-sagemaker-endpointconfig-asyncinferenceconfig-clientconfig
         */
        readonly clientConfig?: CfnEndpointConfig.AsyncInferenceClientConfigProperty | cdk.IResolvable;
        /**
         * Specifies the configuration for asynchronous inference invocation outputs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferenceconfig.html#cfn-sagemaker-endpointconfig-asyncinferenceconfig-outputconfig
         */
        readonly outputConfig: CfnEndpointConfig.AsyncInferenceOutputConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AsyncInferenceConfigProperty`
 *
 * @param properties - the TypeScript properties of a `AsyncInferenceConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpointConfig_AsyncInferenceConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clientConfig', CfnEndpointConfig_AsyncInferenceClientConfigPropertyValidator)(properties.clientConfig));
    errors.collect(cdk.propertyValidator('outputConfig', cdk.requiredValidator)(properties.outputConfig));
    errors.collect(cdk.propertyValidator('outputConfig', CfnEndpointConfig_AsyncInferenceOutputConfigPropertyValidator)(properties.outputConfig));
    return errors.wrap('supplied properties not correct for "AsyncInferenceConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.AsyncInferenceConfig` resource
 *
 * @param properties - the TypeScript properties of a `AsyncInferenceConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.AsyncInferenceConfig` resource.
 */
// @ts-ignore TS6133
function cfnEndpointConfigAsyncInferenceConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpointConfig_AsyncInferenceConfigPropertyValidator(properties).assertSuccess();
    return {
        ClientConfig: cfnEndpointConfigAsyncInferenceClientConfigPropertyToCloudFormation(properties.clientConfig),
        OutputConfig: cfnEndpointConfigAsyncInferenceOutputConfigPropertyToCloudFormation(properties.outputConfig),
    };
}

// @ts-ignore TS6133
function CfnEndpointConfigAsyncInferenceConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpointConfig.AsyncInferenceConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpointConfig.AsyncInferenceConfigProperty>();
    ret.addPropertyResult('clientConfig', 'ClientConfig', properties.ClientConfig != null ? CfnEndpointConfigAsyncInferenceClientConfigPropertyFromCloudFormation(properties.ClientConfig) : undefined);
    ret.addPropertyResult('outputConfig', 'OutputConfig', CfnEndpointConfigAsyncInferenceOutputConfigPropertyFromCloudFormation(properties.OutputConfig));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnEndpointConfig {
    /**
     * Specifies the configuration for notifications of inference results for asynchronous inference.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferencenotificationconfig.html
     */
    export interface AsyncInferenceNotificationConfigProperty {
        /**
         * Amazon SNS topic to post a notification to when an inference fails. If no topic is provided, no notification is sent on failure.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferencenotificationconfig.html#cfn-sagemaker-endpointconfig-asyncinferencenotificationconfig-errortopic
         */
        readonly errorTopic?: string;
        /**
         * Amazon SNS topic to post a notification to when an inference completes successfully. If no topic is provided, no notification is sent on success.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferencenotificationconfig.html#cfn-sagemaker-endpointconfig-asyncinferencenotificationconfig-successtopic
         */
        readonly successTopic?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AsyncInferenceNotificationConfigProperty`
 *
 * @param properties - the TypeScript properties of a `AsyncInferenceNotificationConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpointConfig_AsyncInferenceNotificationConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('errorTopic', cdk.validateString)(properties.errorTopic));
    errors.collect(cdk.propertyValidator('successTopic', cdk.validateString)(properties.successTopic));
    return errors.wrap('supplied properties not correct for "AsyncInferenceNotificationConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.AsyncInferenceNotificationConfig` resource
 *
 * @param properties - the TypeScript properties of a `AsyncInferenceNotificationConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.AsyncInferenceNotificationConfig` resource.
 */
// @ts-ignore TS6133
function cfnEndpointConfigAsyncInferenceNotificationConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpointConfig_AsyncInferenceNotificationConfigPropertyValidator(properties).assertSuccess();
    return {
        ErrorTopic: cdk.stringToCloudFormation(properties.errorTopic),
        SuccessTopic: cdk.stringToCloudFormation(properties.successTopic),
    };
}

// @ts-ignore TS6133
function CfnEndpointConfigAsyncInferenceNotificationConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpointConfig.AsyncInferenceNotificationConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpointConfig.AsyncInferenceNotificationConfigProperty>();
    ret.addPropertyResult('errorTopic', 'ErrorTopic', properties.ErrorTopic != null ? cfn_parse.FromCloudFormation.getString(properties.ErrorTopic) : undefined);
    ret.addPropertyResult('successTopic', 'SuccessTopic', properties.SuccessTopic != null ? cfn_parse.FromCloudFormation.getString(properties.SuccessTopic) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnEndpointConfig {
    /**
     * Specifies the configuration for asynchronous inference invocation outputs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferenceoutputconfig.html
     */
    export interface AsyncInferenceOutputConfigProperty {
        /**
         * The AWS Key Management Service ( AWS KMS) key that Amazon SageMaker uses to encrypt the asynchronous inference output in Amazon S3.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferenceoutputconfig.html#cfn-sagemaker-endpointconfig-asyncinferenceoutputconfig-kmskeyid
         */
        readonly kmsKeyId?: string;
        /**
         * Specifies the configuration for notifications of inference results for asynchronous inference.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferenceoutputconfig.html#cfn-sagemaker-endpointconfig-asyncinferenceoutputconfig-notificationconfig
         */
        readonly notificationConfig?: CfnEndpointConfig.AsyncInferenceNotificationConfigProperty | cdk.IResolvable;
        /**
         * The Amazon S3 location to upload inference responses to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-asyncinferenceoutputconfig.html#cfn-sagemaker-endpointconfig-asyncinferenceoutputconfig-s3outputpath
         */
        readonly s3OutputPath: string;
    }
}

/**
 * Determine whether the given properties match those of a `AsyncInferenceOutputConfigProperty`
 *
 * @param properties - the TypeScript properties of a `AsyncInferenceOutputConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpointConfig_AsyncInferenceOutputConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('notificationConfig', CfnEndpointConfig_AsyncInferenceNotificationConfigPropertyValidator)(properties.notificationConfig));
    errors.collect(cdk.propertyValidator('s3OutputPath', cdk.requiredValidator)(properties.s3OutputPath));
    errors.collect(cdk.propertyValidator('s3OutputPath', cdk.validateString)(properties.s3OutputPath));
    return errors.wrap('supplied properties not correct for "AsyncInferenceOutputConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.AsyncInferenceOutputConfig` resource
 *
 * @param properties - the TypeScript properties of a `AsyncInferenceOutputConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.AsyncInferenceOutputConfig` resource.
 */
// @ts-ignore TS6133
function cfnEndpointConfigAsyncInferenceOutputConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpointConfig_AsyncInferenceOutputConfigPropertyValidator(properties).assertSuccess();
    return {
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        NotificationConfig: cfnEndpointConfigAsyncInferenceNotificationConfigPropertyToCloudFormation(properties.notificationConfig),
        S3OutputPath: cdk.stringToCloudFormation(properties.s3OutputPath),
    };
}

// @ts-ignore TS6133
function CfnEndpointConfigAsyncInferenceOutputConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpointConfig.AsyncInferenceOutputConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpointConfig.AsyncInferenceOutputConfigProperty>();
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('notificationConfig', 'NotificationConfig', properties.NotificationConfig != null ? CfnEndpointConfigAsyncInferenceNotificationConfigPropertyFromCloudFormation(properties.NotificationConfig) : undefined);
    ret.addPropertyResult('s3OutputPath', 'S3OutputPath', cfn_parse.FromCloudFormation.getString(properties.S3OutputPath));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnEndpointConfig {
    /**
     * Specifies the JSON and CSV content types of the data that the endpoint captures.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-datacaptureconfig-capturecontenttypeheader.html
     */
    export interface CaptureContentTypeHeaderProperty {
        /**
         * A list of the CSV content types of the data that the endpoint captures. For the endpoint to capture the data, you must also specify the content type when you invoke the endpoint.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-datacaptureconfig-capturecontenttypeheader.html#cfn-sagemaker-endpointconfig-datacaptureconfig-capturecontenttypeheader-csvcontenttypes
         */
        readonly csvContentTypes?: string[];
        /**
         * A list of the JSON content types of the data that the endpoint captures. For the endpoint to capture the data, you must also specify the content type when you invoke the endpoint.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-datacaptureconfig-capturecontenttypeheader.html#cfn-sagemaker-endpointconfig-datacaptureconfig-capturecontenttypeheader-jsoncontenttypes
         */
        readonly jsonContentTypes?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `CaptureContentTypeHeaderProperty`
 *
 * @param properties - the TypeScript properties of a `CaptureContentTypeHeaderProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpointConfig_CaptureContentTypeHeaderPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('csvContentTypes', cdk.listValidator(cdk.validateString))(properties.csvContentTypes));
    errors.collect(cdk.propertyValidator('jsonContentTypes', cdk.listValidator(cdk.validateString))(properties.jsonContentTypes));
    return errors.wrap('supplied properties not correct for "CaptureContentTypeHeaderProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.CaptureContentTypeHeader` resource
 *
 * @param properties - the TypeScript properties of a `CaptureContentTypeHeaderProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.CaptureContentTypeHeader` resource.
 */
// @ts-ignore TS6133
function cfnEndpointConfigCaptureContentTypeHeaderPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpointConfig_CaptureContentTypeHeaderPropertyValidator(properties).assertSuccess();
    return {
        CsvContentTypes: cdk.listMapper(cdk.stringToCloudFormation)(properties.csvContentTypes),
        JsonContentTypes: cdk.listMapper(cdk.stringToCloudFormation)(properties.jsonContentTypes),
    };
}

// @ts-ignore TS6133
function CfnEndpointConfigCaptureContentTypeHeaderPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpointConfig.CaptureContentTypeHeaderProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpointConfig.CaptureContentTypeHeaderProperty>();
    ret.addPropertyResult('csvContentTypes', 'CsvContentTypes', properties.CsvContentTypes != null ? cfn_parse.FromCloudFormation.getStringArray(properties.CsvContentTypes) : undefined);
    ret.addPropertyResult('jsonContentTypes', 'JsonContentTypes', properties.JsonContentTypes != null ? cfn_parse.FromCloudFormation.getStringArray(properties.JsonContentTypes) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnEndpointConfig {
    /**
     * Specifies whether the endpoint captures input data or output data.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-captureoption.html
     */
    export interface CaptureOptionProperty {
        /**
         * Specifies whether the endpoint captures input data or output data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-captureoption.html#cfn-sagemaker-endpointconfig-captureoption-capturemode
         */
        readonly captureMode: string;
    }
}

/**
 * Determine whether the given properties match those of a `CaptureOptionProperty`
 *
 * @param properties - the TypeScript properties of a `CaptureOptionProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpointConfig_CaptureOptionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('captureMode', cdk.requiredValidator)(properties.captureMode));
    errors.collect(cdk.propertyValidator('captureMode', cdk.validateString)(properties.captureMode));
    return errors.wrap('supplied properties not correct for "CaptureOptionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.CaptureOption` resource
 *
 * @param properties - the TypeScript properties of a `CaptureOptionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.CaptureOption` resource.
 */
// @ts-ignore TS6133
function cfnEndpointConfigCaptureOptionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpointConfig_CaptureOptionPropertyValidator(properties).assertSuccess();
    return {
        CaptureMode: cdk.stringToCloudFormation(properties.captureMode),
    };
}

// @ts-ignore TS6133
function CfnEndpointConfigCaptureOptionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpointConfig.CaptureOptionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpointConfig.CaptureOptionProperty>();
    ret.addPropertyResult('captureMode', 'CaptureMode', cfn_parse.FromCloudFormation.getString(properties.CaptureMode));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnEndpointConfig {
    /**
     * Specifies the configuration of your endpoint for model monitor data capture.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-datacaptureconfig.html
     */
    export interface DataCaptureConfigProperty {
        /**
         * A list of the JSON and CSV content type that the endpoint captures.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-datacaptureconfig.html#cfn-sagemaker-endpointconfig-datacaptureconfig-capturecontenttypeheader
         */
        readonly captureContentTypeHeader?: CfnEndpointConfig.CaptureContentTypeHeaderProperty | cdk.IResolvable;
        /**
         * Specifies whether the endpoint captures input data to your model, output data from your model, or both.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-datacaptureconfig.html#cfn-sagemaker-endpointconfig-datacaptureconfig-captureoptions
         */
        readonly captureOptions: Array<CfnEndpointConfig.CaptureOptionProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The S3 bucket where model monitor stores captured data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-datacaptureconfig.html#cfn-sagemaker-endpointconfig-datacaptureconfig-destinations3uri
         */
        readonly destinationS3Uri: string;
        /**
         * Set to `True` to enable data capture.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-datacaptureconfig.html#cfn-sagemaker-endpointconfig-datacaptureconfig-enablecapture
         */
        readonly enableCapture?: boolean | cdk.IResolvable;
        /**
         * The percentage of data to capture.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-datacaptureconfig.html#cfn-sagemaker-endpointconfig-datacaptureconfig-initialsamplingpercentage
         */
        readonly initialSamplingPercentage: number;
        /**
         * The AWS Key Management Service ( AWS KMS) key that Amazon SageMaker uses to encrypt the captured data at rest using Amazon S3 server-side encryption. The KmsKeyId can be any of the following formats: Key ID: 1234abcd-12ab-34cd-56ef-1234567890ab Key ARN: arn:aws:kms:us-west-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab Alias name: alias/ExampleAlias Alias name ARN: arn:aws:kms:us-west-2:111122223333:alias/ExampleAlias If you don't provide a KMS key ID, Amazon SageMaker uses the default KMS key for Amazon S3 for your role's account. For more information, see KMS-Managed Encryption Keys (https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html) in the Amazon Simple Storage Service Developer Guide. The KMS key policy must grant permission to the IAM role that you specify in your CreateModel (https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_CreateModel.html) request. For more information, see Using Key Policies in AWS KMS (http://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html) in the AWS Key Management Service Developer Guide.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-datacaptureconfig.html#cfn-sagemaker-endpointconfig-datacaptureconfig-kmskeyid
         */
        readonly kmsKeyId?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DataCaptureConfigProperty`
 *
 * @param properties - the TypeScript properties of a `DataCaptureConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpointConfig_DataCaptureConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('captureContentTypeHeader', CfnEndpointConfig_CaptureContentTypeHeaderPropertyValidator)(properties.captureContentTypeHeader));
    errors.collect(cdk.propertyValidator('captureOptions', cdk.requiredValidator)(properties.captureOptions));
    errors.collect(cdk.propertyValidator('captureOptions', cdk.listValidator(CfnEndpointConfig_CaptureOptionPropertyValidator))(properties.captureOptions));
    errors.collect(cdk.propertyValidator('destinationS3Uri', cdk.requiredValidator)(properties.destinationS3Uri));
    errors.collect(cdk.propertyValidator('destinationS3Uri', cdk.validateString)(properties.destinationS3Uri));
    errors.collect(cdk.propertyValidator('enableCapture', cdk.validateBoolean)(properties.enableCapture));
    errors.collect(cdk.propertyValidator('initialSamplingPercentage', cdk.requiredValidator)(properties.initialSamplingPercentage));
    errors.collect(cdk.propertyValidator('initialSamplingPercentage', cdk.validateNumber)(properties.initialSamplingPercentage));
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    return errors.wrap('supplied properties not correct for "DataCaptureConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.DataCaptureConfig` resource
 *
 * @param properties - the TypeScript properties of a `DataCaptureConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.DataCaptureConfig` resource.
 */
// @ts-ignore TS6133
function cfnEndpointConfigDataCaptureConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpointConfig_DataCaptureConfigPropertyValidator(properties).assertSuccess();
    return {
        CaptureContentTypeHeader: cfnEndpointConfigCaptureContentTypeHeaderPropertyToCloudFormation(properties.captureContentTypeHeader),
        CaptureOptions: cdk.listMapper(cfnEndpointConfigCaptureOptionPropertyToCloudFormation)(properties.captureOptions),
        DestinationS3Uri: cdk.stringToCloudFormation(properties.destinationS3Uri),
        EnableCapture: cdk.booleanToCloudFormation(properties.enableCapture),
        InitialSamplingPercentage: cdk.numberToCloudFormation(properties.initialSamplingPercentage),
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
    };
}

// @ts-ignore TS6133
function CfnEndpointConfigDataCaptureConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpointConfig.DataCaptureConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpointConfig.DataCaptureConfigProperty>();
    ret.addPropertyResult('captureContentTypeHeader', 'CaptureContentTypeHeader', properties.CaptureContentTypeHeader != null ? CfnEndpointConfigCaptureContentTypeHeaderPropertyFromCloudFormation(properties.CaptureContentTypeHeader) : undefined);
    ret.addPropertyResult('captureOptions', 'CaptureOptions', cfn_parse.FromCloudFormation.getArray(CfnEndpointConfigCaptureOptionPropertyFromCloudFormation)(properties.CaptureOptions));
    ret.addPropertyResult('destinationS3Uri', 'DestinationS3Uri', cfn_parse.FromCloudFormation.getString(properties.DestinationS3Uri));
    ret.addPropertyResult('enableCapture', 'EnableCapture', properties.EnableCapture != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableCapture) : undefined);
    ret.addPropertyResult('initialSamplingPercentage', 'InitialSamplingPercentage', cfn_parse.FromCloudFormation.getNumber(properties.InitialSamplingPercentage));
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnEndpointConfig {
    /**
     * Specifies a model that you want to host and the resources to deploy for hosting it. If you are deploying multiple models, tell Amazon SageMaker how to distribute traffic among the models by specifying the `InitialVariantWeight` objects.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-productionvariant.html
     */
    export interface ProductionVariantProperty {
        /**
         * The size of the Elastic Inference (EI) instance to use for the production variant. EI instances provide on-demand GPU computing for inference. For more information, see [Using Elastic Inference in Amazon SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/ei.html) . For more information, see [Using Elastic Inference in Amazon SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/ei.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-productionvariant.html#cfn-sagemaker-endpointconfig-productionvariant-acceleratortype
         */
        readonly acceleratorType?: string;
        /**
         * Number of instances to launch initially.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-productionvariant.html#cfn-sagemaker-endpointconfig-productionvariant-initialinstancecount
         */
        readonly initialInstanceCount?: number;
        /**
         * Determines initial traffic distribution among all of the models that you specify in the endpoint configuration. The traffic to a production variant is determined by the ratio of the `VariantWeight` to the sum of all `VariantWeight` values across all ProductionVariants. If unspecified, it defaults to 1.0.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-productionvariant.html#cfn-sagemaker-endpointconfig-productionvariant-initialvariantweight
         */
        readonly initialVariantWeight: number;
        /**
         * The ML compute instance type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-productionvariant.html#cfn-sagemaker-endpointconfig-productionvariant-instancetype
         */
        readonly instanceType?: string;
        /**
         * The name of the model that you want to host. This is the name that you specified when creating the model.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-productionvariant.html#cfn-sagemaker-endpointconfig-productionvariant-modelname
         */
        readonly modelName: string;
        /**
         * The serverless configuration for an endpoint. Specifies a serverless endpoint configuration instead of an instance-based endpoint configuration.
         *
         * > Serverless Inference is in preview release for Amazon SageMaker and is subject to change. We do not recommend using this feature in production environments.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-productionvariant.html#cfn-sagemaker-endpointconfig-productionvariant-serverlessconfig
         */
        readonly serverlessConfig?: CfnEndpointConfig.ServerlessConfigProperty | cdk.IResolvable;
        /**
         * The name of the production variant.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-productionvariant.html#cfn-sagemaker-endpointconfig-productionvariant-variantname
         */
        readonly variantName: string;
    }
}

/**
 * Determine whether the given properties match those of a `ProductionVariantProperty`
 *
 * @param properties - the TypeScript properties of a `ProductionVariantProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpointConfig_ProductionVariantPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('acceleratorType', cdk.validateString)(properties.acceleratorType));
    errors.collect(cdk.propertyValidator('initialInstanceCount', cdk.validateNumber)(properties.initialInstanceCount));
    errors.collect(cdk.propertyValidator('initialVariantWeight', cdk.requiredValidator)(properties.initialVariantWeight));
    errors.collect(cdk.propertyValidator('initialVariantWeight', cdk.validateNumber)(properties.initialVariantWeight));
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('modelName', cdk.requiredValidator)(properties.modelName));
    errors.collect(cdk.propertyValidator('modelName', cdk.validateString)(properties.modelName));
    errors.collect(cdk.propertyValidator('serverlessConfig', CfnEndpointConfig_ServerlessConfigPropertyValidator)(properties.serverlessConfig));
    errors.collect(cdk.propertyValidator('variantName', cdk.requiredValidator)(properties.variantName));
    errors.collect(cdk.propertyValidator('variantName', cdk.validateString)(properties.variantName));
    return errors.wrap('supplied properties not correct for "ProductionVariantProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.ProductionVariant` resource
 *
 * @param properties - the TypeScript properties of a `ProductionVariantProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.ProductionVariant` resource.
 */
// @ts-ignore TS6133
function cfnEndpointConfigProductionVariantPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpointConfig_ProductionVariantPropertyValidator(properties).assertSuccess();
    return {
        AcceleratorType: cdk.stringToCloudFormation(properties.acceleratorType),
        InitialInstanceCount: cdk.numberToCloudFormation(properties.initialInstanceCount),
        InitialVariantWeight: cdk.numberToCloudFormation(properties.initialVariantWeight),
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        ModelName: cdk.stringToCloudFormation(properties.modelName),
        ServerlessConfig: cfnEndpointConfigServerlessConfigPropertyToCloudFormation(properties.serverlessConfig),
        VariantName: cdk.stringToCloudFormation(properties.variantName),
    };
}

// @ts-ignore TS6133
function CfnEndpointConfigProductionVariantPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpointConfig.ProductionVariantProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpointConfig.ProductionVariantProperty>();
    ret.addPropertyResult('acceleratorType', 'AcceleratorType', properties.AcceleratorType != null ? cfn_parse.FromCloudFormation.getString(properties.AcceleratorType) : undefined);
    ret.addPropertyResult('initialInstanceCount', 'InitialInstanceCount', properties.InitialInstanceCount != null ? cfn_parse.FromCloudFormation.getNumber(properties.InitialInstanceCount) : undefined);
    ret.addPropertyResult('initialVariantWeight', 'InitialVariantWeight', cfn_parse.FromCloudFormation.getNumber(properties.InitialVariantWeight));
    ret.addPropertyResult('instanceType', 'InstanceType', properties.InstanceType != null ? cfn_parse.FromCloudFormation.getString(properties.InstanceType) : undefined);
    ret.addPropertyResult('modelName', 'ModelName', cfn_parse.FromCloudFormation.getString(properties.ModelName));
    ret.addPropertyResult('serverlessConfig', 'ServerlessConfig', properties.ServerlessConfig != null ? CfnEndpointConfigServerlessConfigPropertyFromCloudFormation(properties.ServerlessConfig) : undefined);
    ret.addPropertyResult('variantName', 'VariantName', cfn_parse.FromCloudFormation.getString(properties.VariantName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnEndpointConfig {
    /**
     * > Serverless Inference is in preview release for Amazon SageMaker and is subject to change. We do not recommend using this feature in production environments.
     *
     * Specifies the serverless configuration for an endpoint variant.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-productionvariant-serverlessconfig.html
     */
    export interface ServerlessConfigProperty {
        /**
         * The maximum number of concurrent invocations your serverless endpoint can process.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-productionvariant-serverlessconfig.html#cfn-sagemaker-endpointconfig-productionvariant-serverlessconfig-maxconcurrency
         */
        readonly maxConcurrency: number;
        /**
         * The memory size of your serverless endpoint. Valid values are in 1 GB increments: 1024 MB, 2048 MB, 3072 MB, 4096 MB, 5120 MB, or 6144 MB.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-endpointconfig-productionvariant-serverlessconfig.html#cfn-sagemaker-endpointconfig-productionvariant-serverlessconfig-memorysizeinmb
         */
        readonly memorySizeInMb: number;
    }
}

/**
 * Determine whether the given properties match those of a `ServerlessConfigProperty`
 *
 * @param properties - the TypeScript properties of a `ServerlessConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpointConfig_ServerlessConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('maxConcurrency', cdk.requiredValidator)(properties.maxConcurrency));
    errors.collect(cdk.propertyValidator('maxConcurrency', cdk.validateNumber)(properties.maxConcurrency));
    errors.collect(cdk.propertyValidator('memorySizeInMb', cdk.requiredValidator)(properties.memorySizeInMb));
    errors.collect(cdk.propertyValidator('memorySizeInMb', cdk.validateNumber)(properties.memorySizeInMb));
    return errors.wrap('supplied properties not correct for "ServerlessConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.ServerlessConfig` resource
 *
 * @param properties - the TypeScript properties of a `ServerlessConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::EndpointConfig.ServerlessConfig` resource.
 */
// @ts-ignore TS6133
function cfnEndpointConfigServerlessConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpointConfig_ServerlessConfigPropertyValidator(properties).assertSuccess();
    return {
        MaxConcurrency: cdk.numberToCloudFormation(properties.maxConcurrency),
        MemorySizeInMB: cdk.numberToCloudFormation(properties.memorySizeInMb),
    };
}

// @ts-ignore TS6133
function CfnEndpointConfigServerlessConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpointConfig.ServerlessConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpointConfig.ServerlessConfigProperty>();
    ret.addPropertyResult('maxConcurrency', 'MaxConcurrency', cfn_parse.FromCloudFormation.getNumber(properties.MaxConcurrency));
    ret.addPropertyResult('memorySizeInMb', 'MemorySizeInMB', cfn_parse.FromCloudFormation.getNumber(properties.MemorySizeInMB));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnFeatureGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html
 */
export interface CfnFeatureGroupProps {

    /**
     * The name of the feature that stores the `EventTime` of a Record in a `FeatureGroup` .
     *
     * A `EventTime` is point in time when a new event occurs that corresponds to the creation or update of a `Record` in `FeatureGroup` . All `Records` in the `FeatureGroup` must have a corresponding `EventTime` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-eventtimefeaturename
     */
    readonly eventTimeFeatureName: string;

    /**
     * A list of `Feature` s. Each `Feature` must include a `FeatureName` and a `FeatureType` .
     *
     * Valid `FeatureType` s are `Integral` , `Fractional` and `String` .
     *
     * `FeatureName` s cannot be any of the following: `is_deleted` , `write_time` , `api_invocation_time` .
     *
     * You can create up to 2,500 `FeatureDefinition` s per `FeatureGroup` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-featuredefinitions
     */
    readonly featureDefinitions: Array<CfnFeatureGroup.FeatureDefinitionProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The name of the `FeatureGroup` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-featuregroupname
     */
    readonly featureGroupName: string;

    /**
     * The name of the `Feature` whose value uniquely identifies a `Record` defined in the `FeatureGroup` `FeatureDefinitions` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-recordidentifierfeaturename
     */
    readonly recordIdentifierFeatureName: string;

    /**
     * A free form description of a `FeatureGroup` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-description
     */
    readonly description?: string;

    /**
     * The configuration of an `OfflineStore` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-offlinestoreconfig
     */
    readonly offlineStoreConfig?: any | cdk.IResolvable;

    /**
     * The configuration of an `OnlineStore` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-onlinestoreconfig
     */
    readonly onlineStoreConfig?: any | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of the IAM execution role used to create the feature group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-rolearn
     */
    readonly roleArn?: string;

    /**
     * Tags used to define a `FeatureGroup` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnFeatureGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnFeatureGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnFeatureGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('eventTimeFeatureName', cdk.requiredValidator)(properties.eventTimeFeatureName));
    errors.collect(cdk.propertyValidator('eventTimeFeatureName', cdk.validateString)(properties.eventTimeFeatureName));
    errors.collect(cdk.propertyValidator('featureDefinitions', cdk.requiredValidator)(properties.featureDefinitions));
    errors.collect(cdk.propertyValidator('featureDefinitions', cdk.listValidator(CfnFeatureGroup_FeatureDefinitionPropertyValidator))(properties.featureDefinitions));
    errors.collect(cdk.propertyValidator('featureGroupName', cdk.requiredValidator)(properties.featureGroupName));
    errors.collect(cdk.propertyValidator('featureGroupName', cdk.validateString)(properties.featureGroupName));
    errors.collect(cdk.propertyValidator('offlineStoreConfig', cdk.validateObject)(properties.offlineStoreConfig));
    errors.collect(cdk.propertyValidator('onlineStoreConfig', cdk.validateObject)(properties.onlineStoreConfig));
    errors.collect(cdk.propertyValidator('recordIdentifierFeatureName', cdk.requiredValidator)(properties.recordIdentifierFeatureName));
    errors.collect(cdk.propertyValidator('recordIdentifierFeatureName', cdk.validateString)(properties.recordIdentifierFeatureName));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnFeatureGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::FeatureGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnFeatureGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::FeatureGroup` resource.
 */
// @ts-ignore TS6133
function cfnFeatureGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFeatureGroupPropsValidator(properties).assertSuccess();
    return {
        EventTimeFeatureName: cdk.stringToCloudFormation(properties.eventTimeFeatureName),
        FeatureDefinitions: cdk.listMapper(cfnFeatureGroupFeatureDefinitionPropertyToCloudFormation)(properties.featureDefinitions),
        FeatureGroupName: cdk.stringToCloudFormation(properties.featureGroupName),
        RecordIdentifierFeatureName: cdk.stringToCloudFormation(properties.recordIdentifierFeatureName),
        Description: cdk.stringToCloudFormation(properties.description),
        OfflineStoreConfig: cdk.objectToCloudFormation(properties.offlineStoreConfig),
        OnlineStoreConfig: cdk.objectToCloudFormation(properties.onlineStoreConfig),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnFeatureGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFeatureGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFeatureGroupProps>();
    ret.addPropertyResult('eventTimeFeatureName', 'EventTimeFeatureName', cfn_parse.FromCloudFormation.getString(properties.EventTimeFeatureName));
    ret.addPropertyResult('featureDefinitions', 'FeatureDefinitions', cfn_parse.FromCloudFormation.getArray(CfnFeatureGroupFeatureDefinitionPropertyFromCloudFormation)(properties.FeatureDefinitions));
    ret.addPropertyResult('featureGroupName', 'FeatureGroupName', cfn_parse.FromCloudFormation.getString(properties.FeatureGroupName));
    ret.addPropertyResult('recordIdentifierFeatureName', 'RecordIdentifierFeatureName', cfn_parse.FromCloudFormation.getString(properties.RecordIdentifierFeatureName));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('offlineStoreConfig', 'OfflineStoreConfig', properties.OfflineStoreConfig != null ? cfn_parse.FromCloudFormation.getAny(properties.OfflineStoreConfig) : undefined);
    ret.addPropertyResult('onlineStoreConfig', 'OnlineStoreConfig', properties.OnlineStoreConfig != null ? cfn_parse.FromCloudFormation.getAny(properties.OnlineStoreConfig) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', properties.RoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.RoleArn) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::FeatureGroup`
 *
 * Create a new `FeatureGroup` . A `FeatureGroup` is a group of `Features` defined in the `FeatureStore` to describe a `Record` .
 *
 * The `FeatureGroup` defines the schema and features contained in the FeatureGroup. A `FeatureGroup` definition is composed of a list of `Features` , a `RecordIdentifierFeatureName` , an `EventTimeFeatureName` and configurations for its `OnlineStore` and `OfflineStore` . Check [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html) to see the `FeatureGroup` s quota for your AWS account.
 *
 * > You must include at least one of `OnlineStoreConfig` and `OfflineStoreConfig` to create a `FeatureGroup` .
 *
 * @cloudformationResource AWS::SageMaker::FeatureGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html
 */
export class CfnFeatureGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::FeatureGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnFeatureGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnFeatureGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnFeatureGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the feature that stores the `EventTime` of a Record in a `FeatureGroup` .
     *
     * A `EventTime` is point in time when a new event occurs that corresponds to the creation or update of a `Record` in `FeatureGroup` . All `Records` in the `FeatureGroup` must have a corresponding `EventTime` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-eventtimefeaturename
     */
    public eventTimeFeatureName: string;

    /**
     * A list of `Feature` s. Each `Feature` must include a `FeatureName` and a `FeatureType` .
     *
     * Valid `FeatureType` s are `Integral` , `Fractional` and `String` .
     *
     * `FeatureName` s cannot be any of the following: `is_deleted` , `write_time` , `api_invocation_time` .
     *
     * You can create up to 2,500 `FeatureDefinition` s per `FeatureGroup` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-featuredefinitions
     */
    public featureDefinitions: Array<CfnFeatureGroup.FeatureDefinitionProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The name of the `FeatureGroup` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-featuregroupname
     */
    public featureGroupName: string;

    /**
     * The name of the `Feature` whose value uniquely identifies a `Record` defined in the `FeatureGroup` `FeatureDefinitions` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-recordidentifierfeaturename
     */
    public recordIdentifierFeatureName: string;

    /**
     * A free form description of a `FeatureGroup` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-description
     */
    public description: string | undefined;

    /**
     * The configuration of an `OfflineStore` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-offlinestoreconfig
     */
    public offlineStoreConfig: any | cdk.IResolvable | undefined;

    /**
     * The configuration of an `OnlineStore` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-onlinestoreconfig
     */
    public onlineStoreConfig: any | cdk.IResolvable | undefined;

    /**
     * The Amazon Resource Name (ARN) of the IAM execution role used to create the feature group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-rolearn
     */
    public roleArn: string | undefined;

    /**
     * Tags used to define a `FeatureGroup` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-featuregroup.html#cfn-sagemaker-featuregroup-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::FeatureGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnFeatureGroupProps) {
        super(scope, id, { type: CfnFeatureGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'eventTimeFeatureName', this);
        cdk.requireProperty(props, 'featureDefinitions', this);
        cdk.requireProperty(props, 'featureGroupName', this);
        cdk.requireProperty(props, 'recordIdentifierFeatureName', this);

        this.eventTimeFeatureName = props.eventTimeFeatureName;
        this.featureDefinitions = props.featureDefinitions;
        this.featureGroupName = props.featureGroupName;
        this.recordIdentifierFeatureName = props.recordIdentifierFeatureName;
        this.description = props.description;
        this.offlineStoreConfig = props.offlineStoreConfig;
        this.onlineStoreConfig = props.onlineStoreConfig;
        this.roleArn = props.roleArn;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::FeatureGroup", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnFeatureGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            eventTimeFeatureName: this.eventTimeFeatureName,
            featureDefinitions: this.featureDefinitions,
            featureGroupName: this.featureGroupName,
            recordIdentifierFeatureName: this.recordIdentifierFeatureName,
            description: this.description,
            offlineStoreConfig: this.offlineStoreConfig,
            onlineStoreConfig: this.onlineStoreConfig,
            roleArn: this.roleArn,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnFeatureGroupPropsToCloudFormation(props);
    }
}

export namespace CfnFeatureGroup {
    /**
     * A list of features. You must include `FeatureName` and `FeatureType` . Valid feature `FeatureType` s are `Integral` , `Fractional` and `String` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-featuregroup-featuredefinition.html
     */
    export interface FeatureDefinitionProperty {
        /**
         * The name of a feature. The type must be a string. `FeatureName` cannot be any of the following: `is_deleted` , `write_time` , `api_invocation_time` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-featuregroup-featuredefinition.html#cfn-sagemaker-featuregroup-featuredefinition-featurename
         */
        readonly featureName: string;
        /**
         * The value type of a feature. Valid values are Integral, Fractional, or String.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-featuregroup-featuredefinition.html#cfn-sagemaker-featuregroup-featuredefinition-featuretype
         */
        readonly featureType: string;
    }
}

/**
 * Determine whether the given properties match those of a `FeatureDefinitionProperty`
 *
 * @param properties - the TypeScript properties of a `FeatureDefinitionProperty`
 *
 * @returns the result of the validation.
 */
function CfnFeatureGroup_FeatureDefinitionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('featureName', cdk.requiredValidator)(properties.featureName));
    errors.collect(cdk.propertyValidator('featureName', cdk.validateString)(properties.featureName));
    errors.collect(cdk.propertyValidator('featureType', cdk.requiredValidator)(properties.featureType));
    errors.collect(cdk.propertyValidator('featureType', cdk.validateString)(properties.featureType));
    return errors.wrap('supplied properties not correct for "FeatureDefinitionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::FeatureGroup.FeatureDefinition` resource
 *
 * @param properties - the TypeScript properties of a `FeatureDefinitionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::FeatureGroup.FeatureDefinition` resource.
 */
// @ts-ignore TS6133
function cfnFeatureGroupFeatureDefinitionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFeatureGroup_FeatureDefinitionPropertyValidator(properties).assertSuccess();
    return {
        FeatureName: cdk.stringToCloudFormation(properties.featureName),
        FeatureType: cdk.stringToCloudFormation(properties.featureType),
    };
}

// @ts-ignore TS6133
function CfnFeatureGroupFeatureDefinitionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFeatureGroup.FeatureDefinitionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFeatureGroup.FeatureDefinitionProperty>();
    ret.addPropertyResult('featureName', 'FeatureName', cfn_parse.FromCloudFormation.getString(properties.FeatureName));
    ret.addPropertyResult('featureType', 'FeatureType', cfn_parse.FromCloudFormation.getString(properties.FeatureType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnImage`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-image.html
 */
export interface CfnImageProps {

    /**
     * The name of the Image. Must be unique by region in your account.
     *
     * *Length Constraints* : Minimum length of 1. Maximum length of 63.
     *
     * *Pattern* : `^[a-zA-Z0-9]([-.]?[a-zA-Z0-9]){0,62}$`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-image.html#cfn-sagemaker-image-imagename
     */
    readonly imageName: string;

    /**
     * The Amazon Resource Name (ARN) of an IAM role that enables Amazon SageMaker to perform tasks on your behalf.
     *
     * *Length Constraints* : Minimum length of 20. Maximum length of 2048.
     *
     * *Pattern* : `^arn:aws[a-z\-]*:iam::\d{12}:role/?[a-zA-Z_0-9+=,.@\-_/]+$`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-image.html#cfn-sagemaker-image-imagerolearn
     */
    readonly imageRoleArn: string;

    /**
     * The description of the image.
     *
     * *Length Constraints* : Minimum length of 1. Maximum length of 512.
     *
     * *Pattern* : `.*`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-image.html#cfn-sagemaker-image-imagedescription
     */
    readonly imageDescription?: string;

    /**
     * The display name of the image.
     *
     * *Length Constraints* : Minimum length of 1. Maximum length of 128.
     *
     * *Pattern* : `^\S(.*\S)?$`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-image.html#cfn-sagemaker-image-imagedisplayname
     */
    readonly imageDisplayName?: string;

    /**
     * A list of key-value pairs to apply to this resource.
     *
     * *Array Members* : Minimum number of 0 items. Maximum number of 50 items.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-image.html#cfn-sagemaker-image-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnImageProps`
 *
 * @param properties - the TypeScript properties of a `CfnImageProps`
 *
 * @returns the result of the validation.
 */
function CfnImagePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('imageDescription', cdk.validateString)(properties.imageDescription));
    errors.collect(cdk.propertyValidator('imageDisplayName', cdk.validateString)(properties.imageDisplayName));
    errors.collect(cdk.propertyValidator('imageName', cdk.requiredValidator)(properties.imageName));
    errors.collect(cdk.propertyValidator('imageName', cdk.validateString)(properties.imageName));
    errors.collect(cdk.propertyValidator('imageRoleArn', cdk.requiredValidator)(properties.imageRoleArn));
    errors.collect(cdk.propertyValidator('imageRoleArn', cdk.validateString)(properties.imageRoleArn));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnImageProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Image` resource
 *
 * @param properties - the TypeScript properties of a `CfnImageProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Image` resource.
 */
// @ts-ignore TS6133
function cfnImagePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnImagePropsValidator(properties).assertSuccess();
    return {
        ImageName: cdk.stringToCloudFormation(properties.imageName),
        ImageRoleArn: cdk.stringToCloudFormation(properties.imageRoleArn),
        ImageDescription: cdk.stringToCloudFormation(properties.imageDescription),
        ImageDisplayName: cdk.stringToCloudFormation(properties.imageDisplayName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnImagePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnImageProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnImageProps>();
    ret.addPropertyResult('imageName', 'ImageName', cfn_parse.FromCloudFormation.getString(properties.ImageName));
    ret.addPropertyResult('imageRoleArn', 'ImageRoleArn', cfn_parse.FromCloudFormation.getString(properties.ImageRoleArn));
    ret.addPropertyResult('imageDescription', 'ImageDescription', properties.ImageDescription != null ? cfn_parse.FromCloudFormation.getString(properties.ImageDescription) : undefined);
    ret.addPropertyResult('imageDisplayName', 'ImageDisplayName', properties.ImageDisplayName != null ? cfn_parse.FromCloudFormation.getString(properties.ImageDisplayName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::Image`
 *
 * Creates a custom SageMaker image. A SageMaker image is a set of image versions. Each image version represents a container image stored in Amazon Elastic Container Registry (ECR). For more information, see [Bring your own SageMaker image](https://docs.aws.amazon.com/sagemaker/latest/dg/studio-byoi.html) .
 *
 * @cloudformationResource AWS::SageMaker::Image
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-image.html
 */
export class CfnImage extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::Image";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnImage {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnImagePropsFromCloudFormation(resourceProperties);
        const ret = new CfnImage(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the image.
     *
     * *Type* : String
     *
     * *Length Constraints* : Maximum length of 256.
     *
     * *Pattern* : `^arn:aws(-[\w]+)*:sagemaker:.+:[0-9]{12}:image/[a-z0-9]([-.]?[a-z0-9])*$`
     * @cloudformationAttribute ImageArn
     */
    public readonly attrImageArn: string;

    /**
     * The name of the Image. Must be unique by region in your account.
     *
     * *Length Constraints* : Minimum length of 1. Maximum length of 63.
     *
     * *Pattern* : `^[a-zA-Z0-9]([-.]?[a-zA-Z0-9]){0,62}$`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-image.html#cfn-sagemaker-image-imagename
     */
    public imageName: string;

    /**
     * The Amazon Resource Name (ARN) of an IAM role that enables Amazon SageMaker to perform tasks on your behalf.
     *
     * *Length Constraints* : Minimum length of 20. Maximum length of 2048.
     *
     * *Pattern* : `^arn:aws[a-z\-]*:iam::\d{12}:role/?[a-zA-Z_0-9+=,.@\-_/]+$`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-image.html#cfn-sagemaker-image-imagerolearn
     */
    public imageRoleArn: string;

    /**
     * The description of the image.
     *
     * *Length Constraints* : Minimum length of 1. Maximum length of 512.
     *
     * *Pattern* : `.*`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-image.html#cfn-sagemaker-image-imagedescription
     */
    public imageDescription: string | undefined;

    /**
     * The display name of the image.
     *
     * *Length Constraints* : Minimum length of 1. Maximum length of 128.
     *
     * *Pattern* : `^\S(.*\S)?$`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-image.html#cfn-sagemaker-image-imagedisplayname
     */
    public imageDisplayName: string | undefined;

    /**
     * A list of key-value pairs to apply to this resource.
     *
     * *Array Members* : Minimum number of 0 items. Maximum number of 50 items.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-image.html#cfn-sagemaker-image-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::Image`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnImageProps) {
        super(scope, id, { type: CfnImage.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'imageName', this);
        cdk.requireProperty(props, 'imageRoleArn', this);
        this.attrImageArn = cdk.Token.asString(this.getAtt('ImageArn'));

        this.imageName = props.imageName;
        this.imageRoleArn = props.imageRoleArn;
        this.imageDescription = props.imageDescription;
        this.imageDisplayName = props.imageDisplayName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::Image", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnImage.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            imageName: this.imageName,
            imageRoleArn: this.imageRoleArn,
            imageDescription: this.imageDescription,
            imageDisplayName: this.imageDisplayName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnImagePropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnImageVersion`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-imageversion.html
 */
export interface CfnImageVersionProps {

    /**
     * The container image that the SageMaker image version is based on.
     *
     * *Length Constraints* : Minimum length of 1. Maximum length of 255.
     *
     * *Pattern* : `.*`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-imageversion.html#cfn-sagemaker-imageversion-baseimage
     */
    readonly baseImage: string;

    /**
     * The name of the parent image.
     *
     * *Length Constraints* : Minimum length of 1. Maximum length of 63.
     *
     * *Pattern* : `^[a-zA-Z0-9]([-.]?[a-zA-Z0-9]){0,62}$`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-imageversion.html#cfn-sagemaker-imageversion-imagename
     */
    readonly imageName: string;
}

/**
 * Determine whether the given properties match those of a `CfnImageVersionProps`
 *
 * @param properties - the TypeScript properties of a `CfnImageVersionProps`
 *
 * @returns the result of the validation.
 */
function CfnImageVersionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('baseImage', cdk.requiredValidator)(properties.baseImage));
    errors.collect(cdk.propertyValidator('baseImage', cdk.validateString)(properties.baseImage));
    errors.collect(cdk.propertyValidator('imageName', cdk.requiredValidator)(properties.imageName));
    errors.collect(cdk.propertyValidator('imageName', cdk.validateString)(properties.imageName));
    return errors.wrap('supplied properties not correct for "CfnImageVersionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ImageVersion` resource
 *
 * @param properties - the TypeScript properties of a `CfnImageVersionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ImageVersion` resource.
 */
// @ts-ignore TS6133
function cfnImageVersionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnImageVersionPropsValidator(properties).assertSuccess();
    return {
        BaseImage: cdk.stringToCloudFormation(properties.baseImage),
        ImageName: cdk.stringToCloudFormation(properties.imageName),
    };
}

// @ts-ignore TS6133
function CfnImageVersionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnImageVersionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnImageVersionProps>();
    ret.addPropertyResult('baseImage', 'BaseImage', cfn_parse.FromCloudFormation.getString(properties.BaseImage));
    ret.addPropertyResult('imageName', 'ImageName', cfn_parse.FromCloudFormation.getString(properties.ImageName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::ImageVersion`
 *
 * Creates a version of the SageMaker image specified by `ImageName` . The version represents the Amazon Container Registry (ECR) container image specified by `BaseImage` .
 *
 * > You can use the `DependsOn` attribute to specify that the creation of a specific resource follows another. You can use it for the following use cases. For more information, see [`DependsOn` attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html) .
 * >
 * > 1. `DependsOn` can be used to establish a parent/child relationship between `ImageVersion` and `Image` where the `ImageVersion` `DependsOn` the `Image` .
 * >
 * > 2. `DependsOn` can be used to establish order among `ImageVersion` s within the same `Image` namespace. For example, if ImageVersionB `DependsOn` ImageVersionA and both share the same parent `Image` , then ImageVersionA is version N and ImageVersionB is N+1.
 *
 * @cloudformationResource AWS::SageMaker::ImageVersion
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-imageversion.html
 */
export class CfnImageVersion extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::ImageVersion";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnImageVersion {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnImageVersionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnImageVersion(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The URI of the container image version referenced by ImageVersion.
     * @cloudformationAttribute ContainerImage
     */
    public readonly attrContainerImage: string;

    /**
     * The Amazon Resource Name (ARN) of the parent Image.
     * @cloudformationAttribute ImageArn
     */
    public readonly attrImageArn: string;

    /**
     * The Amazon Resource Name (ARN) of the image version.
     *
     * *Type* : String
     *
     * *Length Constraints* : Maximum length of 256.
     *
     * *Pattern* : `^arn:aws(-[\w]+)*:sagemaker:.+:[0-9]{12}:image-version/[a-z0-9]([-.]?[a-z0-9])* /[0-9]+$`
     * @cloudformationAttribute ImageVersionArn
     */
    public readonly attrImageVersionArn: string;

    /**
     * The version of the image.
     * @cloudformationAttribute Version
     */
    public readonly attrVersion: number;

    /**
     * The container image that the SageMaker image version is based on.
     *
     * *Length Constraints* : Minimum length of 1. Maximum length of 255.
     *
     * *Pattern* : `.*`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-imageversion.html#cfn-sagemaker-imageversion-baseimage
     */
    public baseImage: string;

    /**
     * The name of the parent image.
     *
     * *Length Constraints* : Minimum length of 1. Maximum length of 63.
     *
     * *Pattern* : `^[a-zA-Z0-9]([-.]?[a-zA-Z0-9]){0,62}$`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-imageversion.html#cfn-sagemaker-imageversion-imagename
     */
    public imageName: string;

    /**
     * Create a new `AWS::SageMaker::ImageVersion`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnImageVersionProps) {
        super(scope, id, { type: CfnImageVersion.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'baseImage', this);
        cdk.requireProperty(props, 'imageName', this);
        this.attrContainerImage = cdk.Token.asString(this.getAtt('ContainerImage'));
        this.attrImageArn = cdk.Token.asString(this.getAtt('ImageArn'));
        this.attrImageVersionArn = cdk.Token.asString(this.getAtt('ImageVersionArn'));
        this.attrVersion = cdk.Token.asNumber(this.getAtt('Version'));

        this.baseImage = props.baseImage;
        this.imageName = props.imageName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnImageVersion.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            baseImage: this.baseImage,
            imageName: this.imageName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnImageVersionPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnModel`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html
 */
export interface CfnModelProps {

    /**
     * The Amazon Resource Name (ARN) of the IAM role that SageMaker can assume to access model artifacts and docker image for deployment on ML compute instances or for batch transform jobs. Deploying on ML compute instances is part of model hosting. For more information, see [SageMaker Roles](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-roles.html) .
     *
     * > To be able to pass this role to SageMaker, the caller of this API must have the `iam:PassRole` permission.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-executionrolearn
     */
    readonly executionRoleArn: string;

    /**
     * Specifies the containers in the inference pipeline.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-containers
     */
    readonly containers?: Array<CfnModel.ContainerDefinitionProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Isolates the model container. No inbound or outbound network calls can be made to or from the model container.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-enablenetworkisolation
     */
    readonly enableNetworkIsolation?: boolean | cdk.IResolvable;

    /**
     * Specifies details of how containers in a multi-container endpoint are called.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-inferenceexecutionconfig
     */
    readonly inferenceExecutionConfig?: CfnModel.InferenceExecutionConfigProperty | cdk.IResolvable;

    /**
     * The name of the new model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-modelname
     */
    readonly modelName?: string;

    /**
     * The location of the primary docker image containing inference code, associated artifacts, and custom environment map that the inference code uses when the model is deployed for predictions.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-primarycontainer
     */
    readonly primaryContainer?: CfnModel.ContainerDefinitionProperty | cdk.IResolvable;

    /**
     * A list of key-value pairs to apply to this resource.
     *
     * For more information, see [Resource Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) and [Using Cost Allocation Tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#allocation-what) in the *AWS Billing and Cost Management User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * A [VpcConfig](https://docs.aws.amazon.com/sagemaker/latest/dg/API_VpcConfig.html) object that specifies the VPC that you want your model to connect to. Control access to and from your model container by configuring the VPC. `VpcConfig` is used in hosting services and in batch transform. For more information, see [Protect Endpoints by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/host-vpc.html) and [Protect Data in Batch Transform Jobs by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/batch-vpc.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-vpcconfig
     */
    readonly vpcConfig?: CfnModel.VpcConfigProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnModelProps`
 *
 * @param properties - the TypeScript properties of a `CfnModelProps`
 *
 * @returns the result of the validation.
 */
function CfnModelPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('containers', cdk.listValidator(CfnModel_ContainerDefinitionPropertyValidator))(properties.containers));
    errors.collect(cdk.propertyValidator('enableNetworkIsolation', cdk.validateBoolean)(properties.enableNetworkIsolation));
    errors.collect(cdk.propertyValidator('executionRoleArn', cdk.requiredValidator)(properties.executionRoleArn));
    errors.collect(cdk.propertyValidator('executionRoleArn', cdk.validateString)(properties.executionRoleArn));
    errors.collect(cdk.propertyValidator('inferenceExecutionConfig', CfnModel_InferenceExecutionConfigPropertyValidator)(properties.inferenceExecutionConfig));
    errors.collect(cdk.propertyValidator('modelName', cdk.validateString)(properties.modelName));
    errors.collect(cdk.propertyValidator('primaryContainer', CfnModel_ContainerDefinitionPropertyValidator)(properties.primaryContainer));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('vpcConfig', CfnModel_VpcConfigPropertyValidator)(properties.vpcConfig));
    return errors.wrap('supplied properties not correct for "CfnModelProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Model` resource
 *
 * @param properties - the TypeScript properties of a `CfnModelProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Model` resource.
 */
// @ts-ignore TS6133
function cfnModelPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelPropsValidator(properties).assertSuccess();
    return {
        ExecutionRoleArn: cdk.stringToCloudFormation(properties.executionRoleArn),
        Containers: cdk.listMapper(cfnModelContainerDefinitionPropertyToCloudFormation)(properties.containers),
        EnableNetworkIsolation: cdk.booleanToCloudFormation(properties.enableNetworkIsolation),
        InferenceExecutionConfig: cfnModelInferenceExecutionConfigPropertyToCloudFormation(properties.inferenceExecutionConfig),
        ModelName: cdk.stringToCloudFormation(properties.modelName),
        PrimaryContainer: cfnModelContainerDefinitionPropertyToCloudFormation(properties.primaryContainer),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        VpcConfig: cfnModelVpcConfigPropertyToCloudFormation(properties.vpcConfig),
    };
}

// @ts-ignore TS6133
function CfnModelPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelProps>();
    ret.addPropertyResult('executionRoleArn', 'ExecutionRoleArn', cfn_parse.FromCloudFormation.getString(properties.ExecutionRoleArn));
    ret.addPropertyResult('containers', 'Containers', properties.Containers != null ? cfn_parse.FromCloudFormation.getArray(CfnModelContainerDefinitionPropertyFromCloudFormation)(properties.Containers) : undefined);
    ret.addPropertyResult('enableNetworkIsolation', 'EnableNetworkIsolation', properties.EnableNetworkIsolation != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableNetworkIsolation) : undefined);
    ret.addPropertyResult('inferenceExecutionConfig', 'InferenceExecutionConfig', properties.InferenceExecutionConfig != null ? CfnModelInferenceExecutionConfigPropertyFromCloudFormation(properties.InferenceExecutionConfig) : undefined);
    ret.addPropertyResult('modelName', 'ModelName', properties.ModelName != null ? cfn_parse.FromCloudFormation.getString(properties.ModelName) : undefined);
    ret.addPropertyResult('primaryContainer', 'PrimaryContainer', properties.PrimaryContainer != null ? CfnModelContainerDefinitionPropertyFromCloudFormation(properties.PrimaryContainer) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('vpcConfig', 'VpcConfig', properties.VpcConfig != null ? CfnModelVpcConfigPropertyFromCloudFormation(properties.VpcConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::Model`
 *
 * The `AWS::SageMaker::Model` resource to create a model to host at an Amazon SageMaker endpoint. For more information, see [Deploying a Model on Amazon SageMaker Hosting Services](https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-hosting.html) in the *Amazon SageMaker Developer Guide* .
 *
 * @cloudformationResource AWS::SageMaker::Model
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html
 */
export class CfnModel extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::Model";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnModel {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnModelPropsFromCloudFormation(resourceProperties);
        const ret = new CfnModel(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the model, such as `MyModel` .
     * @cloudformationAttribute ModelName
     */
    public readonly attrModelName: string;

    /**
     * The Amazon Resource Name (ARN) of the IAM role that SageMaker can assume to access model artifacts and docker image for deployment on ML compute instances or for batch transform jobs. Deploying on ML compute instances is part of model hosting. For more information, see [SageMaker Roles](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-roles.html) .
     *
     * > To be able to pass this role to SageMaker, the caller of this API must have the `iam:PassRole` permission.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-executionrolearn
     */
    public executionRoleArn: string;

    /**
     * Specifies the containers in the inference pipeline.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-containers
     */
    public containers: Array<CfnModel.ContainerDefinitionProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Isolates the model container. No inbound or outbound network calls can be made to or from the model container.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-enablenetworkisolation
     */
    public enableNetworkIsolation: boolean | cdk.IResolvable | undefined;

    /**
     * Specifies details of how containers in a multi-container endpoint are called.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-inferenceexecutionconfig
     */
    public inferenceExecutionConfig: CfnModel.InferenceExecutionConfigProperty | cdk.IResolvable | undefined;

    /**
     * The name of the new model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-modelname
     */
    public modelName: string | undefined;

    /**
     * The location of the primary docker image containing inference code, associated artifacts, and custom environment map that the inference code uses when the model is deployed for predictions.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-primarycontainer
     */
    public primaryContainer: CfnModel.ContainerDefinitionProperty | cdk.IResolvable | undefined;

    /**
     * A list of key-value pairs to apply to this resource.
     *
     * For more information, see [Resource Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) and [Using Cost Allocation Tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#allocation-what) in the *AWS Billing and Cost Management User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * A [VpcConfig](https://docs.aws.amazon.com/sagemaker/latest/dg/API_VpcConfig.html) object that specifies the VPC that you want your model to connect to. Control access to and from your model container by configuring the VPC. `VpcConfig` is used in hosting services and in batch transform. For more information, see [Protect Endpoints by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/host-vpc.html) and [Protect Data in Batch Transform Jobs by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/batch-vpc.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-model.html#cfn-sagemaker-model-vpcconfig
     */
    public vpcConfig: CfnModel.VpcConfigProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::SageMaker::Model`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnModelProps) {
        super(scope, id, { type: CfnModel.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'executionRoleArn', this);
        this.attrModelName = cdk.Token.asString(this.getAtt('ModelName'));

        this.executionRoleArn = props.executionRoleArn;
        this.containers = props.containers;
        this.enableNetworkIsolation = props.enableNetworkIsolation;
        this.inferenceExecutionConfig = props.inferenceExecutionConfig;
        this.modelName = props.modelName;
        this.primaryContainer = props.primaryContainer;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::Model", props.tags, { tagPropertyName: 'tags' });
        this.vpcConfig = props.vpcConfig;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnModel.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            executionRoleArn: this.executionRoleArn,
            containers: this.containers,
            enableNetworkIsolation: this.enableNetworkIsolation,
            inferenceExecutionConfig: this.inferenceExecutionConfig,
            modelName: this.modelName,
            primaryContainer: this.primaryContainer,
            tags: this.tags.renderTags(),
            vpcConfig: this.vpcConfig,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnModelPropsToCloudFormation(props);
    }
}

export namespace CfnModel {
    /**
     * Describes the container, as part of model definition.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition.html
     */
    export interface ContainerDefinitionProperty {
        /**
         * This parameter is ignored for models that contain only a `PrimaryContainer` .
         *
         * When a `ContainerDefinition` is part of an inference pipeline, the value of the parameter uniquely identifies the container for the purposes of logging and metrics. For information, see [Use Logs and Metrics to Monitor an Inference Pipeline](https://docs.aws.amazon.com/sagemaker/latest/dg/inference-pipeline-logs-metrics.html) . If you don't specify a value for this parameter for a `ContainerDefinition` that is part of an inference pipeline, a unique name is automatically assigned based on the position of the `ContainerDefinition` in the pipeline. If you specify a value for the `ContainerHostName` for any `ContainerDefinition` that is part of an inference pipeline, you must specify a value for the `ContainerHostName` parameter of every `ContainerDefinition` in that pipeline.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition.html#cfn-sagemaker-model-containerdefinition-containerhostname
         */
        readonly containerHostname?: string;
        /**
         * The environment variables to set in the Docker container. Each key and value in the `Environment` string to string map can have length of up to 1024. We support up to 16 entries in the map.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition.html#cfn-sagemaker-model-containerdefinition-environment
         */
        readonly environment?: any | cdk.IResolvable;
        /**
         * The path where inference code is stored. This can be either in Amazon EC2 Container Registry or in a Docker registry that is accessible from the same VPC that you configure for your endpoint. If you are using your own custom algorithm instead of an algorithm provided by SageMaker, the inference code must meet SageMaker requirements. SageMaker supports both `registry/repository[:tag]` and `registry/repository[@digest]` image path formats. For more information, see [Using Your Own Algorithms with Amazon SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/your-algorithms.html)
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition.html#cfn-sagemaker-model-containerdefinition-image
         */
        readonly image?: string;
        /**
         * Specifies whether the model container is in Amazon ECR or a private Docker registry accessible from your Amazon Virtual Private Cloud (VPC). For information about storing containers in a private Docker registry, see [Use a Private Docker Registry for Real-Time Inference Containers](https://docs.aws.amazon.com/sagemaker/latest/dg/your-algorithms-containers-inference-private.html)
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition.html#cfn-sagemaker-model-containerdefinition-imageconfig
         */
        readonly imageConfig?: CfnModel.ImageConfigProperty | cdk.IResolvable;
        /**
         * `CfnModel.ContainerDefinitionProperty.InferenceSpecificationName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition.html#cfn-sagemaker-model-containerdefinition-inferencespecificationname
         */
        readonly inferenceSpecificationName?: string;
        /**
         * Whether the container hosts a single model or multiple models.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition.html#cfn-sagemaker-model-containerdefinition-mode
         */
        readonly mode?: string;
        /**
         * The S3 path where the model artifacts, which result from model training, are stored. This path must point to a single gzip compressed tar archive (.tar.gz suffix). The S3 path is required for SageMaker built-in algorithms, but not if you use your own algorithms. For more information on built-in algorithms, see [Common Parameters](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-algo-docker-registry-paths.html) .
         *
         * > The model artifacts must be in an S3 bucket that is in the same region as the model or endpoint you are creating.
         *
         * If you provide a value for this parameter, SageMaker uses AWS Security Token Service to download model artifacts from the S3 path you provide. AWS STS is activated in your IAM user account by default. If you previously deactivated AWS STS for a region, you need to reactivate AWS STS for that region. For more information, see [Activating and Deactivating AWS STS in an AWS Region](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_enable-regions.html) in the *AWS Identity and Access Management User Guide* .
         *
         * > If you use a built-in algorithm to create a model, SageMaker requires that you provide a S3 path to the model artifacts in `ModelDataUrl` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition.html#cfn-sagemaker-model-containerdefinition-modeldataurl
         */
        readonly modelDataUrl?: string;
        /**
         * The name or Amazon Resource Name (ARN) of the model package to use to create the model.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition.html#cfn-sagemaker-model-containerdefinition-modelpackagename
         */
        readonly modelPackageName?: string;
        /**
         * Specifies additional configuration for multi-model endpoints.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition.html#cfn-sagemaker-model-containerdefinition-multimodelconfig
         */
        readonly multiModelConfig?: CfnModel.MultiModelConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ContainerDefinitionProperty`
 *
 * @param properties - the TypeScript properties of a `ContainerDefinitionProperty`
 *
 * @returns the result of the validation.
 */
function CfnModel_ContainerDefinitionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('containerHostname', cdk.validateString)(properties.containerHostname));
    errors.collect(cdk.propertyValidator('environment', cdk.validateObject)(properties.environment));
    errors.collect(cdk.propertyValidator('image', cdk.validateString)(properties.image));
    errors.collect(cdk.propertyValidator('imageConfig', CfnModel_ImageConfigPropertyValidator)(properties.imageConfig));
    errors.collect(cdk.propertyValidator('inferenceSpecificationName', cdk.validateString)(properties.inferenceSpecificationName));
    errors.collect(cdk.propertyValidator('mode', cdk.validateString)(properties.mode));
    errors.collect(cdk.propertyValidator('modelDataUrl', cdk.validateString)(properties.modelDataUrl));
    errors.collect(cdk.propertyValidator('modelPackageName', cdk.validateString)(properties.modelPackageName));
    errors.collect(cdk.propertyValidator('multiModelConfig', CfnModel_MultiModelConfigPropertyValidator)(properties.multiModelConfig));
    return errors.wrap('supplied properties not correct for "ContainerDefinitionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Model.ContainerDefinition` resource
 *
 * @param properties - the TypeScript properties of a `ContainerDefinitionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Model.ContainerDefinition` resource.
 */
// @ts-ignore TS6133
function cfnModelContainerDefinitionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModel_ContainerDefinitionPropertyValidator(properties).assertSuccess();
    return {
        ContainerHostname: cdk.stringToCloudFormation(properties.containerHostname),
        Environment: cdk.objectToCloudFormation(properties.environment),
        Image: cdk.stringToCloudFormation(properties.image),
        ImageConfig: cfnModelImageConfigPropertyToCloudFormation(properties.imageConfig),
        InferenceSpecificationName: cdk.stringToCloudFormation(properties.inferenceSpecificationName),
        Mode: cdk.stringToCloudFormation(properties.mode),
        ModelDataUrl: cdk.stringToCloudFormation(properties.modelDataUrl),
        ModelPackageName: cdk.stringToCloudFormation(properties.modelPackageName),
        MultiModelConfig: cfnModelMultiModelConfigPropertyToCloudFormation(properties.multiModelConfig),
    };
}

// @ts-ignore TS6133
function CfnModelContainerDefinitionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModel.ContainerDefinitionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModel.ContainerDefinitionProperty>();
    ret.addPropertyResult('containerHostname', 'ContainerHostname', properties.ContainerHostname != null ? cfn_parse.FromCloudFormation.getString(properties.ContainerHostname) : undefined);
    ret.addPropertyResult('environment', 'Environment', properties.Environment != null ? cfn_parse.FromCloudFormation.getAny(properties.Environment) : undefined);
    ret.addPropertyResult('image', 'Image', properties.Image != null ? cfn_parse.FromCloudFormation.getString(properties.Image) : undefined);
    ret.addPropertyResult('imageConfig', 'ImageConfig', properties.ImageConfig != null ? CfnModelImageConfigPropertyFromCloudFormation(properties.ImageConfig) : undefined);
    ret.addPropertyResult('inferenceSpecificationName', 'InferenceSpecificationName', properties.InferenceSpecificationName != null ? cfn_parse.FromCloudFormation.getString(properties.InferenceSpecificationName) : undefined);
    ret.addPropertyResult('mode', 'Mode', properties.Mode != null ? cfn_parse.FromCloudFormation.getString(properties.Mode) : undefined);
    ret.addPropertyResult('modelDataUrl', 'ModelDataUrl', properties.ModelDataUrl != null ? cfn_parse.FromCloudFormation.getString(properties.ModelDataUrl) : undefined);
    ret.addPropertyResult('modelPackageName', 'ModelPackageName', properties.ModelPackageName != null ? cfn_parse.FromCloudFormation.getString(properties.ModelPackageName) : undefined);
    ret.addPropertyResult('multiModelConfig', 'MultiModelConfig', properties.MultiModelConfig != null ? CfnModelMultiModelConfigPropertyFromCloudFormation(properties.MultiModelConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModel {
    /**
     * Specifies whether the model container is in Amazon ECR or a private Docker registry accessible from your Amazon Virtual Private Cloud (VPC).
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition-imageconfig.html
     */
    export interface ImageConfigProperty {
        /**
         * Set this to one of the following values:
         *
         * - `Platform` - The model image is hosted in Amazon ECR.
         * - `Vpc` - The model image is hosted in a private Docker registry in your VPC.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition-imageconfig.html#cfn-sagemaker-model-containerdefinition-imageconfig-repositoryaccessmode
         */
        readonly repositoryAccessMode: string;
        /**
         * (Optional) Specifies an authentication configuration for the private docker registry where your model image is hosted. Specify a value for this property only if you specified `Vpc` as the value for the `RepositoryAccessMode` field, and the private Docker registry where the model image is hosted requires authentication.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition-imageconfig.html#cfn-sagemaker-model-containerdefinition-imageconfig-repositoryauthconfig
         */
        readonly repositoryAuthConfig?: CfnModel.RepositoryAuthConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ImageConfigProperty`
 *
 * @param properties - the TypeScript properties of a `ImageConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModel_ImageConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('repositoryAccessMode', cdk.requiredValidator)(properties.repositoryAccessMode));
    errors.collect(cdk.propertyValidator('repositoryAccessMode', cdk.validateString)(properties.repositoryAccessMode));
    errors.collect(cdk.propertyValidator('repositoryAuthConfig', CfnModel_RepositoryAuthConfigPropertyValidator)(properties.repositoryAuthConfig));
    return errors.wrap('supplied properties not correct for "ImageConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Model.ImageConfig` resource
 *
 * @param properties - the TypeScript properties of a `ImageConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Model.ImageConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelImageConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModel_ImageConfigPropertyValidator(properties).assertSuccess();
    return {
        RepositoryAccessMode: cdk.stringToCloudFormation(properties.repositoryAccessMode),
        RepositoryAuthConfig: cfnModelRepositoryAuthConfigPropertyToCloudFormation(properties.repositoryAuthConfig),
    };
}

// @ts-ignore TS6133
function CfnModelImageConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModel.ImageConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModel.ImageConfigProperty>();
    ret.addPropertyResult('repositoryAccessMode', 'RepositoryAccessMode', cfn_parse.FromCloudFormation.getString(properties.RepositoryAccessMode));
    ret.addPropertyResult('repositoryAuthConfig', 'RepositoryAuthConfig', properties.RepositoryAuthConfig != null ? CfnModelRepositoryAuthConfigPropertyFromCloudFormation(properties.RepositoryAuthConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModel {
    /**
     * Specifies details about how containers in a multi-container endpoint are run.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-inferenceexecutionconfig.html
     */
    export interface InferenceExecutionConfigProperty {
        /**
         * How containers in a multi-container are run. The following values are valid.
         *
         * - `Serial` - Containers run as a serial pipeline.
         * - `Direct` - Only the individual container that you specify is run.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-inferenceexecutionconfig.html#cfn-sagemaker-model-inferenceexecutionconfig-mode
         */
        readonly mode: string;
    }
}

/**
 * Determine whether the given properties match those of a `InferenceExecutionConfigProperty`
 *
 * @param properties - the TypeScript properties of a `InferenceExecutionConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModel_InferenceExecutionConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('mode', cdk.requiredValidator)(properties.mode));
    errors.collect(cdk.propertyValidator('mode', cdk.validateString)(properties.mode));
    return errors.wrap('supplied properties not correct for "InferenceExecutionConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Model.InferenceExecutionConfig` resource
 *
 * @param properties - the TypeScript properties of a `InferenceExecutionConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Model.InferenceExecutionConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelInferenceExecutionConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModel_InferenceExecutionConfigPropertyValidator(properties).assertSuccess();
    return {
        Mode: cdk.stringToCloudFormation(properties.mode),
    };
}

// @ts-ignore TS6133
function CfnModelInferenceExecutionConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModel.InferenceExecutionConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModel.InferenceExecutionConfigProperty>();
    ret.addPropertyResult('mode', 'Mode', cfn_parse.FromCloudFormation.getString(properties.Mode));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModel {
    /**
     * Specifies additional configuration for hosting multi-model endpoints.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition-multimodelconfig.html
     */
    export interface MultiModelConfigProperty {
        /**
         * Whether to cache models for a multi-model endpoint. By default, multi-model endpoints cache models so that a model does not have to be loaded into memory each time it is invoked. Some use cases do not benefit from model caching. For example, if an endpoint hosts a large number of models that are each invoked infrequently, the endpoint might perform better if you disable model caching. To disable model caching, set the value of this parameter to Disabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition-multimodelconfig.html#cfn-sagemaker-model-containerdefinition-multimodelconfig-modelcachesetting
         */
        readonly modelCacheSetting?: string;
    }
}

/**
 * Determine whether the given properties match those of a `MultiModelConfigProperty`
 *
 * @param properties - the TypeScript properties of a `MultiModelConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModel_MultiModelConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('modelCacheSetting', cdk.validateString)(properties.modelCacheSetting));
    return errors.wrap('supplied properties not correct for "MultiModelConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Model.MultiModelConfig` resource
 *
 * @param properties - the TypeScript properties of a `MultiModelConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Model.MultiModelConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelMultiModelConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModel_MultiModelConfigPropertyValidator(properties).assertSuccess();
    return {
        ModelCacheSetting: cdk.stringToCloudFormation(properties.modelCacheSetting),
    };
}

// @ts-ignore TS6133
function CfnModelMultiModelConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModel.MultiModelConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModel.MultiModelConfigProperty>();
    ret.addPropertyResult('modelCacheSetting', 'ModelCacheSetting', properties.ModelCacheSetting != null ? cfn_parse.FromCloudFormation.getString(properties.ModelCacheSetting) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModel {
    /**
     * Specifies an authentication configuration for the private docker registry where your model image is hosted. Specify a value for this property only if you specified `Vpc` as the value for the `RepositoryAccessMode` field of the `ImageConfig` object that you passed to a call to `CreateModel` and the private Docker registry where the model image is hosted requires authentication.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition-imageconfig-repositoryauthconfig.html
     */
    export interface RepositoryAuthConfigProperty {
        /**
         * The Amazon Resource Name (ARN) of an AWS Lambda function that provides credentials to authenticate to the private Docker registry where your model image is hosted. For information about how to create an AWS Lambda function, see [Create a Lambda function with the console](https://docs.aws.amazon.com/lambda/latest/dg/getting-started-create-function.html) in the *AWS Lambda Developer Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-containerdefinition-imageconfig-repositoryauthconfig.html#cfn-sagemaker-model-containerdefinition-imageconfig-repositoryauthconfig-repositorycredentialsproviderarn
         */
        readonly repositoryCredentialsProviderArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `RepositoryAuthConfigProperty`
 *
 * @param properties - the TypeScript properties of a `RepositoryAuthConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModel_RepositoryAuthConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('repositoryCredentialsProviderArn', cdk.requiredValidator)(properties.repositoryCredentialsProviderArn));
    errors.collect(cdk.propertyValidator('repositoryCredentialsProviderArn', cdk.validateString)(properties.repositoryCredentialsProviderArn));
    return errors.wrap('supplied properties not correct for "RepositoryAuthConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Model.RepositoryAuthConfig` resource
 *
 * @param properties - the TypeScript properties of a `RepositoryAuthConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Model.RepositoryAuthConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelRepositoryAuthConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModel_RepositoryAuthConfigPropertyValidator(properties).assertSuccess();
    return {
        RepositoryCredentialsProviderArn: cdk.stringToCloudFormation(properties.repositoryCredentialsProviderArn),
    };
}

// @ts-ignore TS6133
function CfnModelRepositoryAuthConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModel.RepositoryAuthConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModel.RepositoryAuthConfigProperty>();
    ret.addPropertyResult('repositoryCredentialsProviderArn', 'RepositoryCredentialsProviderArn', cfn_parse.FromCloudFormation.getString(properties.RepositoryCredentialsProviderArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModel {
    /**
     * Specifies a VPC that your training jobs and hosted models have access to. Control access to and from your training and model containers by configuring the VPC. For more information, see [Protect Endpoints by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/host-vpc.html) and [Protect Training Jobs by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/train-vpc.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-vpcconfig.html
     */
    export interface VpcConfigProperty {
        /**
         * The VPC security group IDs, in the form sg-xxxxxxxx. Specify the security groups for the VPC that is specified in the `Subnets` field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-vpcconfig.html#cfn-sagemaker-model-vpcconfig-securitygroupids
         */
        readonly securityGroupIds: string[];
        /**
         * The ID of the subnets in the VPC to which you want to connect your training job or model. For information about the availability of specific instance types, see [Supported Instance Types and Availability Zones](https://docs.aws.amazon.com/sagemaker/latest/dg/instance-types-az.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-model-vpcconfig.html#cfn-sagemaker-model-vpcconfig-subnets
         */
        readonly subnets: string[];
    }
}

/**
 * Determine whether the given properties match those of a `VpcConfigProperty`
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModel_VpcConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.requiredValidator)(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('subnets', cdk.requiredValidator)(properties.subnets));
    errors.collect(cdk.propertyValidator('subnets', cdk.listValidator(cdk.validateString))(properties.subnets));
    return errors.wrap('supplied properties not correct for "VpcConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Model.VpcConfig` resource
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Model.VpcConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelVpcConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModel_VpcConfigPropertyValidator(properties).assertSuccess();
    return {
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        Subnets: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnets),
    };
}

// @ts-ignore TS6133
function CfnModelVpcConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModel.VpcConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModel.VpcConfigProperty>();
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds));
    ret.addPropertyResult('subnets', 'Subnets', cfn_parse.FromCloudFormation.getStringArray(properties.Subnets));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnModelBiasJobDefinition`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html
 */
export interface CfnModelBiasJobDefinitionProps {

    /**
     * Identifies the resources to deploy for a monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-jobresources
     */
    readonly jobResources: CfnModelBiasJobDefinition.MonitoringResourcesProperty | cdk.IResolvable;

    /**
     * Configures the model bias job to run a specified Docker container image.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasappspecification
     */
    readonly modelBiasAppSpecification: CfnModelBiasJobDefinition.ModelBiasAppSpecificationProperty | cdk.IResolvable;

    /**
     * Inputs for the model bias job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasjobinput
     */
    readonly modelBiasJobInput: CfnModelBiasJobDefinition.ModelBiasJobInputProperty | cdk.IResolvable;

    /**
     * The output configuration for monitoring jobs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasjoboutputconfig
     */
    readonly modelBiasJobOutputConfig: CfnModelBiasJobDefinition.MonitoringOutputConfigProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to perform tasks on your behalf.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-rolearn
     */
    readonly roleArn: string;

    /**
     * The name of the bias job definition. The name must be unique within an AWS Region in the AWS account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-jobdefinitionname
     */
    readonly jobDefinitionName?: string;

    /**
     * The baseline configuration for a model bias job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasbaselineconfig
     */
    readonly modelBiasBaselineConfig?: CfnModelBiasJobDefinition.ModelBiasBaselineConfigProperty | cdk.IResolvable;

    /**
     * Networking options for a model bias job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-networkconfig
     */
    readonly networkConfig?: CfnModelBiasJobDefinition.NetworkConfigProperty | cdk.IResolvable;

    /**
     * A time limit for how long the monitoring job is allowed to run before stopping.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-stoppingcondition
     */
    readonly stoppingCondition?: CfnModelBiasJobDefinition.StoppingConditionProperty | cdk.IResolvable;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnModelBiasJobDefinitionProps`
 *
 * @param properties - the TypeScript properties of a `CfnModelBiasJobDefinitionProps`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinitionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('jobDefinitionName', cdk.validateString)(properties.jobDefinitionName));
    errors.collect(cdk.propertyValidator('jobResources', cdk.requiredValidator)(properties.jobResources));
    errors.collect(cdk.propertyValidator('jobResources', CfnModelBiasJobDefinition_MonitoringResourcesPropertyValidator)(properties.jobResources));
    errors.collect(cdk.propertyValidator('modelBiasAppSpecification', cdk.requiredValidator)(properties.modelBiasAppSpecification));
    errors.collect(cdk.propertyValidator('modelBiasAppSpecification', CfnModelBiasJobDefinition_ModelBiasAppSpecificationPropertyValidator)(properties.modelBiasAppSpecification));
    errors.collect(cdk.propertyValidator('modelBiasBaselineConfig', CfnModelBiasJobDefinition_ModelBiasBaselineConfigPropertyValidator)(properties.modelBiasBaselineConfig));
    errors.collect(cdk.propertyValidator('modelBiasJobInput', cdk.requiredValidator)(properties.modelBiasJobInput));
    errors.collect(cdk.propertyValidator('modelBiasJobInput', CfnModelBiasJobDefinition_ModelBiasJobInputPropertyValidator)(properties.modelBiasJobInput));
    errors.collect(cdk.propertyValidator('modelBiasJobOutputConfig', cdk.requiredValidator)(properties.modelBiasJobOutputConfig));
    errors.collect(cdk.propertyValidator('modelBiasJobOutputConfig', CfnModelBiasJobDefinition_MonitoringOutputConfigPropertyValidator)(properties.modelBiasJobOutputConfig));
    errors.collect(cdk.propertyValidator('networkConfig', CfnModelBiasJobDefinition_NetworkConfigPropertyValidator)(properties.networkConfig));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('stoppingCondition', CfnModelBiasJobDefinition_StoppingConditionPropertyValidator)(properties.stoppingCondition));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnModelBiasJobDefinitionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition` resource
 *
 * @param properties - the TypeScript properties of a `CfnModelBiasJobDefinitionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinitionPropsValidator(properties).assertSuccess();
    return {
        JobResources: cfnModelBiasJobDefinitionMonitoringResourcesPropertyToCloudFormation(properties.jobResources),
        ModelBiasAppSpecification: cfnModelBiasJobDefinitionModelBiasAppSpecificationPropertyToCloudFormation(properties.modelBiasAppSpecification),
        ModelBiasJobInput: cfnModelBiasJobDefinitionModelBiasJobInputPropertyToCloudFormation(properties.modelBiasJobInput),
        ModelBiasJobOutputConfig: cfnModelBiasJobDefinitionMonitoringOutputConfigPropertyToCloudFormation(properties.modelBiasJobOutputConfig),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        JobDefinitionName: cdk.stringToCloudFormation(properties.jobDefinitionName),
        ModelBiasBaselineConfig: cfnModelBiasJobDefinitionModelBiasBaselineConfigPropertyToCloudFormation(properties.modelBiasBaselineConfig),
        NetworkConfig: cfnModelBiasJobDefinitionNetworkConfigPropertyToCloudFormation(properties.networkConfig),
        StoppingCondition: cfnModelBiasJobDefinitionStoppingConditionPropertyToCloudFormation(properties.stoppingCondition),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinitionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinitionProps>();
    ret.addPropertyResult('jobResources', 'JobResources', CfnModelBiasJobDefinitionMonitoringResourcesPropertyFromCloudFormation(properties.JobResources));
    ret.addPropertyResult('modelBiasAppSpecification', 'ModelBiasAppSpecification', CfnModelBiasJobDefinitionModelBiasAppSpecificationPropertyFromCloudFormation(properties.ModelBiasAppSpecification));
    ret.addPropertyResult('modelBiasJobInput', 'ModelBiasJobInput', CfnModelBiasJobDefinitionModelBiasJobInputPropertyFromCloudFormation(properties.ModelBiasJobInput));
    ret.addPropertyResult('modelBiasJobOutputConfig', 'ModelBiasJobOutputConfig', CfnModelBiasJobDefinitionMonitoringOutputConfigPropertyFromCloudFormation(properties.ModelBiasJobOutputConfig));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('jobDefinitionName', 'JobDefinitionName', properties.JobDefinitionName != null ? cfn_parse.FromCloudFormation.getString(properties.JobDefinitionName) : undefined);
    ret.addPropertyResult('modelBiasBaselineConfig', 'ModelBiasBaselineConfig', properties.ModelBiasBaselineConfig != null ? CfnModelBiasJobDefinitionModelBiasBaselineConfigPropertyFromCloudFormation(properties.ModelBiasBaselineConfig) : undefined);
    ret.addPropertyResult('networkConfig', 'NetworkConfig', properties.NetworkConfig != null ? CfnModelBiasJobDefinitionNetworkConfigPropertyFromCloudFormation(properties.NetworkConfig) : undefined);
    ret.addPropertyResult('stoppingCondition', 'StoppingCondition', properties.StoppingCondition != null ? CfnModelBiasJobDefinitionStoppingConditionPropertyFromCloudFormation(properties.StoppingCondition) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::ModelBiasJobDefinition`
 *
 * Creates the definition for a model bias job.
 *
 * @cloudformationResource AWS::SageMaker::ModelBiasJobDefinition
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html
 */
export class CfnModelBiasJobDefinition extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::ModelBiasJobDefinition";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnModelBiasJobDefinition {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnModelBiasJobDefinitionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnModelBiasJobDefinition(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The time when the job definition was created.
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: string;

    /**
     * The Amazon Resource Name (ARN) of the job definition.
     * @cloudformationAttribute JobDefinitionArn
     */
    public readonly attrJobDefinitionArn: string;

    /**
     * Identifies the resources to deploy for a monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-jobresources
     */
    public jobResources: CfnModelBiasJobDefinition.MonitoringResourcesProperty | cdk.IResolvable;

    /**
     * Configures the model bias job to run a specified Docker container image.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasappspecification
     */
    public modelBiasAppSpecification: CfnModelBiasJobDefinition.ModelBiasAppSpecificationProperty | cdk.IResolvable;

    /**
     * Inputs for the model bias job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasjobinput
     */
    public modelBiasJobInput: CfnModelBiasJobDefinition.ModelBiasJobInputProperty | cdk.IResolvable;

    /**
     * The output configuration for monitoring jobs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasjoboutputconfig
     */
    public modelBiasJobOutputConfig: CfnModelBiasJobDefinition.MonitoringOutputConfigProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to perform tasks on your behalf.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-rolearn
     */
    public roleArn: string;

    /**
     * The name of the bias job definition. The name must be unique within an AWS Region in the AWS account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-jobdefinitionname
     */
    public jobDefinitionName: string | undefined;

    /**
     * The baseline configuration for a model bias job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasbaselineconfig
     */
    public modelBiasBaselineConfig: CfnModelBiasJobDefinition.ModelBiasBaselineConfigProperty | cdk.IResolvable | undefined;

    /**
     * Networking options for a model bias job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-networkconfig
     */
    public networkConfig: CfnModelBiasJobDefinition.NetworkConfigProperty | cdk.IResolvable | undefined;

    /**
     * A time limit for how long the monitoring job is allowed to run before stopping.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-stoppingcondition
     */
    public stoppingCondition: CfnModelBiasJobDefinition.StoppingConditionProperty | cdk.IResolvable | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelbiasjobdefinition.html#cfn-sagemaker-modelbiasjobdefinition-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::ModelBiasJobDefinition`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnModelBiasJobDefinitionProps) {
        super(scope, id, { type: CfnModelBiasJobDefinition.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'jobResources', this);
        cdk.requireProperty(props, 'modelBiasAppSpecification', this);
        cdk.requireProperty(props, 'modelBiasJobInput', this);
        cdk.requireProperty(props, 'modelBiasJobOutputConfig', this);
        cdk.requireProperty(props, 'roleArn', this);
        this.attrCreationTime = cdk.Token.asString(this.getAtt('CreationTime'));
        this.attrJobDefinitionArn = cdk.Token.asString(this.getAtt('JobDefinitionArn'));

        this.jobResources = props.jobResources;
        this.modelBiasAppSpecification = props.modelBiasAppSpecification;
        this.modelBiasJobInput = props.modelBiasJobInput;
        this.modelBiasJobOutputConfig = props.modelBiasJobOutputConfig;
        this.roleArn = props.roleArn;
        this.jobDefinitionName = props.jobDefinitionName;
        this.modelBiasBaselineConfig = props.modelBiasBaselineConfig;
        this.networkConfig = props.networkConfig;
        this.stoppingCondition = props.stoppingCondition;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::ModelBiasJobDefinition", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnModelBiasJobDefinition.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            jobResources: this.jobResources,
            modelBiasAppSpecification: this.modelBiasAppSpecification,
            modelBiasJobInput: this.modelBiasJobInput,
            modelBiasJobOutputConfig: this.modelBiasJobOutputConfig,
            roleArn: this.roleArn,
            jobDefinitionName: this.jobDefinitionName,
            modelBiasBaselineConfig: this.modelBiasBaselineConfig,
            networkConfig: this.networkConfig,
            stoppingCondition: this.stoppingCondition,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnModelBiasJobDefinitionPropsToCloudFormation(props);
    }
}

export namespace CfnModelBiasJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-clusterconfig.html
     */
    export interface ClusterConfigProperty {
        /**
         * `CfnModelBiasJobDefinition.ClusterConfigProperty.InstanceCount`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-clusterconfig.html#cfn-sagemaker-modelbiasjobdefinition-clusterconfig-instancecount
         */
        readonly instanceCount: number;
        /**
         * `CfnModelBiasJobDefinition.ClusterConfigProperty.InstanceType`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-clusterconfig.html#cfn-sagemaker-modelbiasjobdefinition-clusterconfig-instancetype
         */
        readonly instanceType: string;
        /**
         * `CfnModelBiasJobDefinition.ClusterConfigProperty.VolumeKmsKeyId`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-clusterconfig.html#cfn-sagemaker-modelbiasjobdefinition-clusterconfig-volumekmskeyid
         */
        readonly volumeKmsKeyId?: string;
        /**
         * `CfnModelBiasJobDefinition.ClusterConfigProperty.VolumeSizeInGB`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-clusterconfig.html#cfn-sagemaker-modelbiasjobdefinition-clusterconfig-volumesizeingb
         */
        readonly volumeSizeInGb: number;
    }
}

/**
 * Determine whether the given properties match those of a `ClusterConfigProperty`
 *
 * @param properties - the TypeScript properties of a `ClusterConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinition_ClusterConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceCount', cdk.requiredValidator)(properties.instanceCount));
    errors.collect(cdk.propertyValidator('instanceCount', cdk.validateNumber)(properties.instanceCount));
    errors.collect(cdk.propertyValidator('instanceType', cdk.requiredValidator)(properties.instanceType));
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('volumeKmsKeyId', cdk.validateString)(properties.volumeKmsKeyId));
    errors.collect(cdk.propertyValidator('volumeSizeInGb', cdk.requiredValidator)(properties.volumeSizeInGb));
    errors.collect(cdk.propertyValidator('volumeSizeInGb', cdk.validateNumber)(properties.volumeSizeInGb));
    return errors.wrap('supplied properties not correct for "ClusterConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.ClusterConfig` resource
 *
 * @param properties - the TypeScript properties of a `ClusterConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.ClusterConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionClusterConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinition_ClusterConfigPropertyValidator(properties).assertSuccess();
    return {
        InstanceCount: cdk.numberToCloudFormation(properties.instanceCount),
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        VolumeKmsKeyId: cdk.stringToCloudFormation(properties.volumeKmsKeyId),
        VolumeSizeInGB: cdk.numberToCloudFormation(properties.volumeSizeInGb),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionClusterConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinition.ClusterConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinition.ClusterConfigProperty>();
    ret.addPropertyResult('instanceCount', 'InstanceCount', cfn_parse.FromCloudFormation.getNumber(properties.InstanceCount));
    ret.addPropertyResult('instanceType', 'InstanceType', cfn_parse.FromCloudFormation.getString(properties.InstanceType));
    ret.addPropertyResult('volumeKmsKeyId', 'VolumeKmsKeyId', properties.VolumeKmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.VolumeKmsKeyId) : undefined);
    ret.addPropertyResult('volumeSizeInGb', 'VolumeSizeInGB', cfn_parse.FromCloudFormation.getNumber(properties.VolumeSizeInGB));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelBiasJobDefinition {
    /**
     * The constraints resource for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-constraintsresource.html
     */
    export interface ConstraintsResourceProperty {
        /**
         * The Amazon S3 URI for the constraints resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-constraintsresource.html#cfn-sagemaker-modelbiasjobdefinition-constraintsresource-s3uri
         */
        readonly s3Uri?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConstraintsResourceProperty`
 *
 * @param properties - the TypeScript properties of a `ConstraintsResourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinition_ConstraintsResourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Uri', cdk.validateString)(properties.s3Uri));
    return errors.wrap('supplied properties not correct for "ConstraintsResourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.ConstraintsResource` resource
 *
 * @param properties - the TypeScript properties of a `ConstraintsResourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.ConstraintsResource` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionConstraintsResourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinition_ConstraintsResourcePropertyValidator(properties).assertSuccess();
    return {
        S3Uri: cdk.stringToCloudFormation(properties.s3Uri),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionConstraintsResourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinition.ConstraintsResourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinition.ConstraintsResourceProperty>();
    ret.addPropertyResult('s3Uri', 'S3Uri', properties.S3Uri != null ? cfn_parse.FromCloudFormation.getString(properties.S3Uri) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelBiasJobDefinition {
    /**
     * Input object for the endpoint
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-endpointinput.html
     */
    export interface EndpointInputProperty {
        /**
         * If specified, monitoring jobs substract this time from the end time. For information about using offsets for scheduling monitoring jobs, see [Schedule Model Quality Monitoring Jobs](https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-model-quality-schedule.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-endpointinput.html#cfn-sagemaker-modelbiasjobdefinition-endpointinput-endtimeoffset
         */
        readonly endTimeOffset?: string;
        /**
         * An endpoint in customer's account which has enabled `DataCaptureConfig` enabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-endpointinput.html#cfn-sagemaker-modelbiasjobdefinition-endpointinput-endpointname
         */
        readonly endpointName: string;
        /**
         * The attributes of the input data that are the input features.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-endpointinput.html#cfn-sagemaker-modelbiasjobdefinition-endpointinput-featuresattribute
         */
        readonly featuresAttribute?: string;
        /**
         * The attribute of the input data that represents the ground truth label.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-endpointinput.html#cfn-sagemaker-modelbiasjobdefinition-endpointinput-inferenceattribute
         */
        readonly inferenceAttribute?: string;
        /**
         * Path to the filesystem where the endpoint data is available to the container.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-endpointinput.html#cfn-sagemaker-modelbiasjobdefinition-endpointinput-localpath
         */
        readonly localPath: string;
        /**
         * In a classification problem, the attribute that represents the class probability.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-endpointinput.html#cfn-sagemaker-modelbiasjobdefinition-endpointinput-probabilityattribute
         */
        readonly probabilityAttribute?: string;
        /**
         * The threshold for the class probability to be evaluated as a positive result.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-endpointinput.html#cfn-sagemaker-modelbiasjobdefinition-endpointinput-probabilitythresholdattribute
         */
        readonly probabilityThresholdAttribute?: number;
        /**
         * Whether input data distributed in Amazon S3 is fully replicated or sharded by an S3 key. Defaults to `FullyReplicated`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-endpointinput.html#cfn-sagemaker-modelbiasjobdefinition-endpointinput-s3datadistributiontype
         */
        readonly s3DataDistributionType?: string;
        /**
         * Whether the `Pipe` or `File` is used as the input mode for transferring data for the monitoring job. `Pipe` mode is recommended for large datasets. `File` mode is useful for small files that fit in memory. Defaults to `File` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-endpointinput.html#cfn-sagemaker-modelbiasjobdefinition-endpointinput-s3inputmode
         */
        readonly s3InputMode?: string;
        /**
         * If specified, monitoring jobs substract this time from the start time. For information about using offsets for scheduling monitoring jobs, see [Schedule Model Quality Monitoring Jobs](https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-model-quality-schedule.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-endpointinput.html#cfn-sagemaker-modelbiasjobdefinition-endpointinput-starttimeoffset
         */
        readonly startTimeOffset?: string;
    }
}

/**
 * Determine whether the given properties match those of a `EndpointInputProperty`
 *
 * @param properties - the TypeScript properties of a `EndpointInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinition_EndpointInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endTimeOffset', cdk.validateString)(properties.endTimeOffset));
    errors.collect(cdk.propertyValidator('endpointName', cdk.requiredValidator)(properties.endpointName));
    errors.collect(cdk.propertyValidator('endpointName', cdk.validateString)(properties.endpointName));
    errors.collect(cdk.propertyValidator('featuresAttribute', cdk.validateString)(properties.featuresAttribute));
    errors.collect(cdk.propertyValidator('inferenceAttribute', cdk.validateString)(properties.inferenceAttribute));
    errors.collect(cdk.propertyValidator('localPath', cdk.requiredValidator)(properties.localPath));
    errors.collect(cdk.propertyValidator('localPath', cdk.validateString)(properties.localPath));
    errors.collect(cdk.propertyValidator('probabilityAttribute', cdk.validateString)(properties.probabilityAttribute));
    errors.collect(cdk.propertyValidator('probabilityThresholdAttribute', cdk.validateNumber)(properties.probabilityThresholdAttribute));
    errors.collect(cdk.propertyValidator('s3DataDistributionType', cdk.validateString)(properties.s3DataDistributionType));
    errors.collect(cdk.propertyValidator('s3InputMode', cdk.validateString)(properties.s3InputMode));
    errors.collect(cdk.propertyValidator('startTimeOffset', cdk.validateString)(properties.startTimeOffset));
    return errors.wrap('supplied properties not correct for "EndpointInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.EndpointInput` resource
 *
 * @param properties - the TypeScript properties of a `EndpointInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.EndpointInput` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionEndpointInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinition_EndpointInputPropertyValidator(properties).assertSuccess();
    return {
        EndTimeOffset: cdk.stringToCloudFormation(properties.endTimeOffset),
        EndpointName: cdk.stringToCloudFormation(properties.endpointName),
        FeaturesAttribute: cdk.stringToCloudFormation(properties.featuresAttribute),
        InferenceAttribute: cdk.stringToCloudFormation(properties.inferenceAttribute),
        LocalPath: cdk.stringToCloudFormation(properties.localPath),
        ProbabilityAttribute: cdk.stringToCloudFormation(properties.probabilityAttribute),
        ProbabilityThresholdAttribute: cdk.numberToCloudFormation(properties.probabilityThresholdAttribute),
        S3DataDistributionType: cdk.stringToCloudFormation(properties.s3DataDistributionType),
        S3InputMode: cdk.stringToCloudFormation(properties.s3InputMode),
        StartTimeOffset: cdk.stringToCloudFormation(properties.startTimeOffset),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionEndpointInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinition.EndpointInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinition.EndpointInputProperty>();
    ret.addPropertyResult('endTimeOffset', 'EndTimeOffset', properties.EndTimeOffset != null ? cfn_parse.FromCloudFormation.getString(properties.EndTimeOffset) : undefined);
    ret.addPropertyResult('endpointName', 'EndpointName', cfn_parse.FromCloudFormation.getString(properties.EndpointName));
    ret.addPropertyResult('featuresAttribute', 'FeaturesAttribute', properties.FeaturesAttribute != null ? cfn_parse.FromCloudFormation.getString(properties.FeaturesAttribute) : undefined);
    ret.addPropertyResult('inferenceAttribute', 'InferenceAttribute', properties.InferenceAttribute != null ? cfn_parse.FromCloudFormation.getString(properties.InferenceAttribute) : undefined);
    ret.addPropertyResult('localPath', 'LocalPath', cfn_parse.FromCloudFormation.getString(properties.LocalPath));
    ret.addPropertyResult('probabilityAttribute', 'ProbabilityAttribute', properties.ProbabilityAttribute != null ? cfn_parse.FromCloudFormation.getString(properties.ProbabilityAttribute) : undefined);
    ret.addPropertyResult('probabilityThresholdAttribute', 'ProbabilityThresholdAttribute', properties.ProbabilityThresholdAttribute != null ? cfn_parse.FromCloudFormation.getNumber(properties.ProbabilityThresholdAttribute) : undefined);
    ret.addPropertyResult('s3DataDistributionType', 'S3DataDistributionType', properties.S3DataDistributionType != null ? cfn_parse.FromCloudFormation.getString(properties.S3DataDistributionType) : undefined);
    ret.addPropertyResult('s3InputMode', 'S3InputMode', properties.S3InputMode != null ? cfn_parse.FromCloudFormation.getString(properties.S3InputMode) : undefined);
    ret.addPropertyResult('startTimeOffset', 'StartTimeOffset', properties.StartTimeOffset != null ? cfn_parse.FromCloudFormation.getString(properties.StartTimeOffset) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelBiasJobDefinition {
    /**
     * Docker container image configuration object for the model bias job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-modelbiasappspecification.html
     */
    export interface ModelBiasAppSpecificationProperty {
        /**
         * JSON formatted S3 file that defines bias parameters. For more information on this JSON configuration file, see [Configure bias parameters](https://docs.aws.amazon.com/sagemaker/latest/json-bias-parameter-config.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-modelbiasappspecification.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasappspecification-configuri
         */
        readonly configUri: string;
        /**
         * Sets the environment variables in the Docker container.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-modelbiasappspecification.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasappspecification-environment
         */
        readonly environment?: { [key: string]: (string) } | cdk.IResolvable;
        /**
         * The container image to be run by the model bias job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-modelbiasappspecification.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasappspecification-imageuri
         */
        readonly imageUri: string;
    }
}

/**
 * Determine whether the given properties match those of a `ModelBiasAppSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `ModelBiasAppSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinition_ModelBiasAppSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('configUri', cdk.requiredValidator)(properties.configUri));
    errors.collect(cdk.propertyValidator('configUri', cdk.validateString)(properties.configUri));
    errors.collect(cdk.propertyValidator('environment', cdk.hashValidator(cdk.validateString))(properties.environment));
    errors.collect(cdk.propertyValidator('imageUri', cdk.requiredValidator)(properties.imageUri));
    errors.collect(cdk.propertyValidator('imageUri', cdk.validateString)(properties.imageUri));
    return errors.wrap('supplied properties not correct for "ModelBiasAppSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.ModelBiasAppSpecification` resource
 *
 * @param properties - the TypeScript properties of a `ModelBiasAppSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.ModelBiasAppSpecification` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionModelBiasAppSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinition_ModelBiasAppSpecificationPropertyValidator(properties).assertSuccess();
    return {
        ConfigUri: cdk.stringToCloudFormation(properties.configUri),
        Environment: cdk.hashMapper(cdk.stringToCloudFormation)(properties.environment),
        ImageUri: cdk.stringToCloudFormation(properties.imageUri),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionModelBiasAppSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinition.ModelBiasAppSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinition.ModelBiasAppSpecificationProperty>();
    ret.addPropertyResult('configUri', 'ConfigUri', cfn_parse.FromCloudFormation.getString(properties.ConfigUri));
    ret.addPropertyResult('environment', 'Environment', properties.Environment != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Environment) : undefined);
    ret.addPropertyResult('imageUri', 'ImageUri', cfn_parse.FromCloudFormation.getString(properties.ImageUri));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelBiasJobDefinition {
    /**
     * The configuration for a baseline model bias job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-modelbiasbaselineconfig.html
     */
    export interface ModelBiasBaselineConfigProperty {
        /**
         * The name of the baseline model bias job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-modelbiasbaselineconfig.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasbaselineconfig-baseliningjobname
         */
        readonly baseliningJobName?: string;
        /**
         * The constraints resource for a monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-modelbiasbaselineconfig.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasbaselineconfig-constraintsresource
         */
        readonly constraintsResource?: CfnModelBiasJobDefinition.ConstraintsResourceProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ModelBiasBaselineConfigProperty`
 *
 * @param properties - the TypeScript properties of a `ModelBiasBaselineConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinition_ModelBiasBaselineConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('baseliningJobName', cdk.validateString)(properties.baseliningJobName));
    errors.collect(cdk.propertyValidator('constraintsResource', CfnModelBiasJobDefinition_ConstraintsResourcePropertyValidator)(properties.constraintsResource));
    return errors.wrap('supplied properties not correct for "ModelBiasBaselineConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.ModelBiasBaselineConfig` resource
 *
 * @param properties - the TypeScript properties of a `ModelBiasBaselineConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.ModelBiasBaselineConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionModelBiasBaselineConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinition_ModelBiasBaselineConfigPropertyValidator(properties).assertSuccess();
    return {
        BaseliningJobName: cdk.stringToCloudFormation(properties.baseliningJobName),
        ConstraintsResource: cfnModelBiasJobDefinitionConstraintsResourcePropertyToCloudFormation(properties.constraintsResource),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionModelBiasBaselineConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinition.ModelBiasBaselineConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinition.ModelBiasBaselineConfigProperty>();
    ret.addPropertyResult('baseliningJobName', 'BaseliningJobName', properties.BaseliningJobName != null ? cfn_parse.FromCloudFormation.getString(properties.BaseliningJobName) : undefined);
    ret.addPropertyResult('constraintsResource', 'ConstraintsResource', properties.ConstraintsResource != null ? CfnModelBiasJobDefinitionConstraintsResourcePropertyFromCloudFormation(properties.ConstraintsResource) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelBiasJobDefinition {
    /**
     * Inputs for the model bias job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-modelbiasjobinput.html
     */
    export interface ModelBiasJobInputProperty {
        /**
         * Input object for the endpoint.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-modelbiasjobinput.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasjobinput-endpointinput
         */
        readonly endpointInput: CfnModelBiasJobDefinition.EndpointInputProperty | cdk.IResolvable;
        /**
         * Location of ground truth labels to use in model bias job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-modelbiasjobinput.html#cfn-sagemaker-modelbiasjobdefinition-modelbiasjobinput-groundtruths3input
         */
        readonly groundTruthS3Input: CfnModelBiasJobDefinition.MonitoringGroundTruthS3InputProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ModelBiasJobInputProperty`
 *
 * @param properties - the TypeScript properties of a `ModelBiasJobInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinition_ModelBiasJobInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endpointInput', cdk.requiredValidator)(properties.endpointInput));
    errors.collect(cdk.propertyValidator('endpointInput', CfnModelBiasJobDefinition_EndpointInputPropertyValidator)(properties.endpointInput));
    errors.collect(cdk.propertyValidator('groundTruthS3Input', cdk.requiredValidator)(properties.groundTruthS3Input));
    errors.collect(cdk.propertyValidator('groundTruthS3Input', CfnModelBiasJobDefinition_MonitoringGroundTruthS3InputPropertyValidator)(properties.groundTruthS3Input));
    return errors.wrap('supplied properties not correct for "ModelBiasJobInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.ModelBiasJobInput` resource
 *
 * @param properties - the TypeScript properties of a `ModelBiasJobInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.ModelBiasJobInput` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionModelBiasJobInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinition_ModelBiasJobInputPropertyValidator(properties).assertSuccess();
    return {
        EndpointInput: cfnModelBiasJobDefinitionEndpointInputPropertyToCloudFormation(properties.endpointInput),
        GroundTruthS3Input: cfnModelBiasJobDefinitionMonitoringGroundTruthS3InputPropertyToCloudFormation(properties.groundTruthS3Input),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionModelBiasJobInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinition.ModelBiasJobInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinition.ModelBiasJobInputProperty>();
    ret.addPropertyResult('endpointInput', 'EndpointInput', CfnModelBiasJobDefinitionEndpointInputPropertyFromCloudFormation(properties.EndpointInput));
    ret.addPropertyResult('groundTruthS3Input', 'GroundTruthS3Input', CfnModelBiasJobDefinitionMonitoringGroundTruthS3InputPropertyFromCloudFormation(properties.GroundTruthS3Input));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelBiasJobDefinition {
    /**
     * The ground truth labels for the dataset used for the monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-monitoringgroundtruths3input.html
     */
    export interface MonitoringGroundTruthS3InputProperty {
        /**
         * The address of the Amazon S3 location of the ground truth labels.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-monitoringgroundtruths3input.html#cfn-sagemaker-modelbiasjobdefinition-monitoringgroundtruths3input-s3uri
         */
        readonly s3Uri: string;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringGroundTruthS3InputProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringGroundTruthS3InputProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinition_MonitoringGroundTruthS3InputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Uri', cdk.requiredValidator)(properties.s3Uri));
    errors.collect(cdk.propertyValidator('s3Uri', cdk.validateString)(properties.s3Uri));
    return errors.wrap('supplied properties not correct for "MonitoringGroundTruthS3InputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.MonitoringGroundTruthS3Input` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringGroundTruthS3InputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.MonitoringGroundTruthS3Input` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionMonitoringGroundTruthS3InputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinition_MonitoringGroundTruthS3InputPropertyValidator(properties).assertSuccess();
    return {
        S3Uri: cdk.stringToCloudFormation(properties.s3Uri),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionMonitoringGroundTruthS3InputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinition.MonitoringGroundTruthS3InputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinition.MonitoringGroundTruthS3InputProperty>();
    ret.addPropertyResult('s3Uri', 'S3Uri', cfn_parse.FromCloudFormation.getString(properties.S3Uri));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelBiasJobDefinition {
    /**
     * The output object for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-monitoringoutput.html
     */
    export interface MonitoringOutputProperty {
        /**
         * The Amazon S3 storage location where the results of a monitoring job are saved.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-monitoringoutput.html#cfn-sagemaker-modelbiasjobdefinition-monitoringoutput-s3output
         */
        readonly s3Output: CfnModelBiasJobDefinition.S3OutputProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringOutputProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinition_MonitoringOutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Output', cdk.requiredValidator)(properties.s3Output));
    errors.collect(cdk.propertyValidator('s3Output', CfnModelBiasJobDefinition_S3OutputPropertyValidator)(properties.s3Output));
    return errors.wrap('supplied properties not correct for "MonitoringOutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.MonitoringOutput` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.MonitoringOutput` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionMonitoringOutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinition_MonitoringOutputPropertyValidator(properties).assertSuccess();
    return {
        S3Output: cfnModelBiasJobDefinitionS3OutputPropertyToCloudFormation(properties.s3Output),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionMonitoringOutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinition.MonitoringOutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinition.MonitoringOutputProperty>();
    ret.addPropertyResult('s3Output', 'S3Output', CfnModelBiasJobDefinitionS3OutputPropertyFromCloudFormation(properties.S3Output));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelBiasJobDefinition {
    /**
     * The output configuration for monitoring jobs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-monitoringoutputconfig.html
     */
    export interface MonitoringOutputConfigProperty {
        /**
         * The AWS Key Management Service ( AWS KMS) key that Amazon SageMaker uses to encrypt the model artifacts at rest using Amazon S3 server-side encryption.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-monitoringoutputconfig.html#cfn-sagemaker-modelbiasjobdefinition-monitoringoutputconfig-kmskeyid
         */
        readonly kmsKeyId?: string;
        /**
         * Monitoring outputs for monitoring jobs. This is where the output of the periodic monitoring jobs is uploaded.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-monitoringoutputconfig.html#cfn-sagemaker-modelbiasjobdefinition-monitoringoutputconfig-monitoringoutputs
         */
        readonly monitoringOutputs: Array<CfnModelBiasJobDefinition.MonitoringOutputProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringOutputConfigProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinition_MonitoringOutputConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('monitoringOutputs', cdk.requiredValidator)(properties.monitoringOutputs));
    errors.collect(cdk.propertyValidator('monitoringOutputs', cdk.listValidator(CfnModelBiasJobDefinition_MonitoringOutputPropertyValidator))(properties.monitoringOutputs));
    return errors.wrap('supplied properties not correct for "MonitoringOutputConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.MonitoringOutputConfig` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.MonitoringOutputConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionMonitoringOutputConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinition_MonitoringOutputConfigPropertyValidator(properties).assertSuccess();
    return {
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        MonitoringOutputs: cdk.listMapper(cfnModelBiasJobDefinitionMonitoringOutputPropertyToCloudFormation)(properties.monitoringOutputs),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionMonitoringOutputConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinition.MonitoringOutputConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinition.MonitoringOutputConfigProperty>();
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('monitoringOutputs', 'MonitoringOutputs', cfn_parse.FromCloudFormation.getArray(CfnModelBiasJobDefinitionMonitoringOutputPropertyFromCloudFormation)(properties.MonitoringOutputs));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelBiasJobDefinition {
    /**
     * Identifies the resources to deploy for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-monitoringresources.html
     */
    export interface MonitoringResourcesProperty {
        /**
         * The configuration for the cluster resources used to run the processing job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-monitoringresources.html#cfn-sagemaker-modelbiasjobdefinition-monitoringresources-clusterconfig
         */
        readonly clusterConfig: CfnModelBiasJobDefinition.ClusterConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringResourcesProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringResourcesProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinition_MonitoringResourcesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clusterConfig', cdk.requiredValidator)(properties.clusterConfig));
    errors.collect(cdk.propertyValidator('clusterConfig', CfnModelBiasJobDefinition_ClusterConfigPropertyValidator)(properties.clusterConfig));
    return errors.wrap('supplied properties not correct for "MonitoringResourcesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.MonitoringResources` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringResourcesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.MonitoringResources` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionMonitoringResourcesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinition_MonitoringResourcesPropertyValidator(properties).assertSuccess();
    return {
        ClusterConfig: cfnModelBiasJobDefinitionClusterConfigPropertyToCloudFormation(properties.clusterConfig),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionMonitoringResourcesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinition.MonitoringResourcesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinition.MonitoringResourcesProperty>();
    ret.addPropertyResult('clusterConfig', 'ClusterConfig', CfnModelBiasJobDefinitionClusterConfigPropertyFromCloudFormation(properties.ClusterConfig));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelBiasJobDefinition {
    /**
     * Networking options for a job, such as network traffic encryption between containers, whether to allow inbound and outbound network calls to and from containers, and the VPC subnets and security groups to use for VPC-enabled jobs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-networkconfig.html
     */
    export interface NetworkConfigProperty {
        /**
         * Whether to encrypt all communications between distributed processing jobs. Choose `True` to encrypt communications. Encryption provides greater security for distributed processing jobs, but the processing might take longer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-networkconfig.html#cfn-sagemaker-modelbiasjobdefinition-networkconfig-enableintercontainertrafficencryption
         */
        readonly enableInterContainerTrafficEncryption?: boolean | cdk.IResolvable;
        /**
         * Whether to allow inbound and outbound network calls to and from the containers used for the processing job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-networkconfig.html#cfn-sagemaker-modelbiasjobdefinition-networkconfig-enablenetworkisolation
         */
        readonly enableNetworkIsolation?: boolean | cdk.IResolvable;
        /**
         * Specifies a VPC that your training jobs and hosted models have access to. Control access to and from your training and model containers by configuring the VPC.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-networkconfig.html#cfn-sagemaker-modelbiasjobdefinition-networkconfig-vpcconfig
         */
        readonly vpcConfig?: CfnModelBiasJobDefinition.VpcConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `NetworkConfigProperty`
 *
 * @param properties - the TypeScript properties of a `NetworkConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinition_NetworkConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enableInterContainerTrafficEncryption', cdk.validateBoolean)(properties.enableInterContainerTrafficEncryption));
    errors.collect(cdk.propertyValidator('enableNetworkIsolation', cdk.validateBoolean)(properties.enableNetworkIsolation));
    errors.collect(cdk.propertyValidator('vpcConfig', CfnModelBiasJobDefinition_VpcConfigPropertyValidator)(properties.vpcConfig));
    return errors.wrap('supplied properties not correct for "NetworkConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.NetworkConfig` resource
 *
 * @param properties - the TypeScript properties of a `NetworkConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.NetworkConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionNetworkConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinition_NetworkConfigPropertyValidator(properties).assertSuccess();
    return {
        EnableInterContainerTrafficEncryption: cdk.booleanToCloudFormation(properties.enableInterContainerTrafficEncryption),
        EnableNetworkIsolation: cdk.booleanToCloudFormation(properties.enableNetworkIsolation),
        VpcConfig: cfnModelBiasJobDefinitionVpcConfigPropertyToCloudFormation(properties.vpcConfig),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionNetworkConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinition.NetworkConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinition.NetworkConfigProperty>();
    ret.addPropertyResult('enableInterContainerTrafficEncryption', 'EnableInterContainerTrafficEncryption', properties.EnableInterContainerTrafficEncryption != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableInterContainerTrafficEncryption) : undefined);
    ret.addPropertyResult('enableNetworkIsolation', 'EnableNetworkIsolation', properties.EnableNetworkIsolation != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableNetworkIsolation) : undefined);
    ret.addPropertyResult('vpcConfig', 'VpcConfig', properties.VpcConfig != null ? CfnModelBiasJobDefinitionVpcConfigPropertyFromCloudFormation(properties.VpcConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelBiasJobDefinition {
    /**
     * The Amazon S3 storage location where the results of a monitoring job are saved.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-s3output.html
     */
    export interface S3OutputProperty {
        /**
         * The local path to the Amazon S3 storage location where Amazon SageMaker saves the results of a monitoring job. `LocalPath` is an absolute path for the output data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-s3output.html#cfn-sagemaker-modelbiasjobdefinition-s3output-localpath
         */
        readonly localPath: string;
        /**
         * Whether to upload the results of the monitoring job continuously or after the job completes.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-s3output.html#cfn-sagemaker-modelbiasjobdefinition-s3output-s3uploadmode
         */
        readonly s3UploadMode?: string;
        /**
         * A URI that identifies the Amazon S3 storage location where Amazon SageMaker saves the results of a monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-s3output.html#cfn-sagemaker-modelbiasjobdefinition-s3output-s3uri
         */
        readonly s3Uri: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3OutputProperty`
 *
 * @param properties - the TypeScript properties of a `S3OutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinition_S3OutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('localPath', cdk.requiredValidator)(properties.localPath));
    errors.collect(cdk.propertyValidator('localPath', cdk.validateString)(properties.localPath));
    errors.collect(cdk.propertyValidator('s3UploadMode', cdk.validateString)(properties.s3UploadMode));
    errors.collect(cdk.propertyValidator('s3Uri', cdk.requiredValidator)(properties.s3Uri));
    errors.collect(cdk.propertyValidator('s3Uri', cdk.validateString)(properties.s3Uri));
    return errors.wrap('supplied properties not correct for "S3OutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.S3Output` resource
 *
 * @param properties - the TypeScript properties of a `S3OutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.S3Output` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionS3OutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinition_S3OutputPropertyValidator(properties).assertSuccess();
    return {
        LocalPath: cdk.stringToCloudFormation(properties.localPath),
        S3UploadMode: cdk.stringToCloudFormation(properties.s3UploadMode),
        S3Uri: cdk.stringToCloudFormation(properties.s3Uri),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionS3OutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinition.S3OutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinition.S3OutputProperty>();
    ret.addPropertyResult('localPath', 'LocalPath', cfn_parse.FromCloudFormation.getString(properties.LocalPath));
    ret.addPropertyResult('s3UploadMode', 'S3UploadMode', properties.S3UploadMode != null ? cfn_parse.FromCloudFormation.getString(properties.S3UploadMode) : undefined);
    ret.addPropertyResult('s3Uri', 'S3Uri', cfn_parse.FromCloudFormation.getString(properties.S3Uri));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelBiasJobDefinition {
    /**
     * Specifies a limit to how long a model training job or model compilation job can run. It also specifies how long a managed spot training job has to complete. When the job reaches the time limit, SageMaker ends the training or compilation job. Use this API to cap model training costs.
     *
     * To stop a training job, SageMaker sends the algorithm the `SIGTERM` signal, which delays job termination for 120 seconds. Algorithms can use this 120-second window to save the model artifacts, so the results of training are not lost.
     *
     * The training algorithms provided by SageMaker automatically save the intermediate results of a model training job when possible. This attempt to save artifacts is only a best effort case as model might not be in a state from which it can be saved. For example, if training has just started, the model might not be ready to save. When saved, this intermediate data is a valid model artifact. You can use it to create a model with `CreateModel` .
     *
     * > The Neural Topic Model (NTM) currently does not support saving intermediate model artifacts. When training NTMs, make sure that the maximum runtime is sufficient for the training job to complete.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-stoppingcondition.html
     */
    export interface StoppingConditionProperty {
        /**
         * The maximum length of time, in seconds, that a training or compilation job can run.
         *
         * For compilation jobs, if the job does not complete during this time, a `TimeOut` error is generated. We recommend starting with 900 seconds and increasing as necessary based on your model.
         *
         * For all other jobs, if the job does not complete during this time, SageMaker ends the job. When `RetryStrategy` is specified in the job request, `MaxRuntimeInSeconds` specifies the maximum time for all of the attempts in total, not each individual attempt. The default value is 1 day. The maximum value is 28 days.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-stoppingcondition.html#cfn-sagemaker-modelbiasjobdefinition-stoppingcondition-maxruntimeinseconds
         */
        readonly maxRuntimeInSeconds: number;
    }
}

/**
 * Determine whether the given properties match those of a `StoppingConditionProperty`
 *
 * @param properties - the TypeScript properties of a `StoppingConditionProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinition_StoppingConditionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('maxRuntimeInSeconds', cdk.requiredValidator)(properties.maxRuntimeInSeconds));
    errors.collect(cdk.propertyValidator('maxRuntimeInSeconds', cdk.validateNumber)(properties.maxRuntimeInSeconds));
    return errors.wrap('supplied properties not correct for "StoppingConditionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.StoppingCondition` resource
 *
 * @param properties - the TypeScript properties of a `StoppingConditionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.StoppingCondition` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionStoppingConditionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinition_StoppingConditionPropertyValidator(properties).assertSuccess();
    return {
        MaxRuntimeInSeconds: cdk.numberToCloudFormation(properties.maxRuntimeInSeconds),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionStoppingConditionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinition.StoppingConditionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinition.StoppingConditionProperty>();
    ret.addPropertyResult('maxRuntimeInSeconds', 'MaxRuntimeInSeconds', cfn_parse.FromCloudFormation.getNumber(properties.MaxRuntimeInSeconds));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelBiasJobDefinition {
    /**
     * Specifies a VPC that your training jobs and hosted models have access to. Control access to and from your training and model containers by configuring the VPC. For more information, see [Protect Endpoints by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/host-vpc.html) and [Protect Training Jobs by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/train-vpc.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-vpcconfig.html
     */
    export interface VpcConfigProperty {
        /**
         * The VPC security group IDs, in the form sg-xxxxxxxx. Specify the security groups for the VPC that is specified in the `Subnets` field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-vpcconfig.html#cfn-sagemaker-modelbiasjobdefinition-vpcconfig-securitygroupids
         */
        readonly securityGroupIds: string[];
        /**
         * The ID of the subnets in the VPC to which you want to connect your training job or model. For information about the availability of specific instance types, see [Supported Instance Types and Availability Zones](https://docs.aws.amazon.com/sagemaker/latest/dg/instance-types-az.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelbiasjobdefinition-vpcconfig.html#cfn-sagemaker-modelbiasjobdefinition-vpcconfig-subnets
         */
        readonly subnets: string[];
    }
}

/**
 * Determine whether the given properties match those of a `VpcConfigProperty`
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelBiasJobDefinition_VpcConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.requiredValidator)(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('subnets', cdk.requiredValidator)(properties.subnets));
    errors.collect(cdk.propertyValidator('subnets', cdk.listValidator(cdk.validateString))(properties.subnets));
    return errors.wrap('supplied properties not correct for "VpcConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.VpcConfig` resource
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelBiasJobDefinition.VpcConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelBiasJobDefinitionVpcConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelBiasJobDefinition_VpcConfigPropertyValidator(properties).assertSuccess();
    return {
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        Subnets: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnets),
    };
}

// @ts-ignore TS6133
function CfnModelBiasJobDefinitionVpcConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelBiasJobDefinition.VpcConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelBiasJobDefinition.VpcConfigProperty>();
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds));
    ret.addPropertyResult('subnets', 'Subnets', cfn_parse.FromCloudFormation.getStringArray(properties.Subnets));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnModelExplainabilityJobDefinition`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html
 */
export interface CfnModelExplainabilityJobDefinitionProps {

    /**
     * Identifies the resources to deploy for a monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-jobresources
     */
    readonly jobResources: CfnModelExplainabilityJobDefinition.MonitoringResourcesProperty | cdk.IResolvable;

    /**
     * Configures the model explainability job to run a specified Docker container image.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityappspecification
     */
    readonly modelExplainabilityAppSpecification: CfnModelExplainabilityJobDefinition.ModelExplainabilityAppSpecificationProperty | cdk.IResolvable;

    /**
     * Inputs for the model explainability job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityjobinput
     */
    readonly modelExplainabilityJobInput: CfnModelExplainabilityJobDefinition.ModelExplainabilityJobInputProperty | cdk.IResolvable;

    /**
     * The output configuration for monitoring jobs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityjoboutputconfig
     */
    readonly modelExplainabilityJobOutputConfig: CfnModelExplainabilityJobDefinition.MonitoringOutputConfigProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to perform tasks on your behalf.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-rolearn
     */
    readonly roleArn: string;

    /**
     * The name of the model explainability job definition. The name must be unique within an AWS Region in the AWS account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-jobdefinitionname
     */
    readonly jobDefinitionName?: string;

    /**
     * The baseline configuration for a model explainability job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-modelexplainabilitybaselineconfig
     */
    readonly modelExplainabilityBaselineConfig?: CfnModelExplainabilityJobDefinition.ModelExplainabilityBaselineConfigProperty | cdk.IResolvable;

    /**
     * Networking options for a model explainability job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-networkconfig
     */
    readonly networkConfig?: CfnModelExplainabilityJobDefinition.NetworkConfigProperty | cdk.IResolvable;

    /**
     * `AWS::SageMaker::ModelExplainabilityJobDefinition.StoppingCondition`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-stoppingcondition
     */
    readonly stoppingCondition?: CfnModelExplainabilityJobDefinition.StoppingConditionProperty | cdk.IResolvable;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnModelExplainabilityJobDefinitionProps`
 *
 * @param properties - the TypeScript properties of a `CfnModelExplainabilityJobDefinitionProps`
 *
 * @returns the result of the validation.
 */
function CfnModelExplainabilityJobDefinitionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('jobDefinitionName', cdk.validateString)(properties.jobDefinitionName));
    errors.collect(cdk.propertyValidator('jobResources', cdk.requiredValidator)(properties.jobResources));
    errors.collect(cdk.propertyValidator('jobResources', CfnModelExplainabilityJobDefinition_MonitoringResourcesPropertyValidator)(properties.jobResources));
    errors.collect(cdk.propertyValidator('modelExplainabilityAppSpecification', cdk.requiredValidator)(properties.modelExplainabilityAppSpecification));
    errors.collect(cdk.propertyValidator('modelExplainabilityAppSpecification', CfnModelExplainabilityJobDefinition_ModelExplainabilityAppSpecificationPropertyValidator)(properties.modelExplainabilityAppSpecification));
    errors.collect(cdk.propertyValidator('modelExplainabilityBaselineConfig', CfnModelExplainabilityJobDefinition_ModelExplainabilityBaselineConfigPropertyValidator)(properties.modelExplainabilityBaselineConfig));
    errors.collect(cdk.propertyValidator('modelExplainabilityJobInput', cdk.requiredValidator)(properties.modelExplainabilityJobInput));
    errors.collect(cdk.propertyValidator('modelExplainabilityJobInput', CfnModelExplainabilityJobDefinition_ModelExplainabilityJobInputPropertyValidator)(properties.modelExplainabilityJobInput));
    errors.collect(cdk.propertyValidator('modelExplainabilityJobOutputConfig', cdk.requiredValidator)(properties.modelExplainabilityJobOutputConfig));
    errors.collect(cdk.propertyValidator('modelExplainabilityJobOutputConfig', CfnModelExplainabilityJobDefinition_MonitoringOutputConfigPropertyValidator)(properties.modelExplainabilityJobOutputConfig));
    errors.collect(cdk.propertyValidator('networkConfig', CfnModelExplainabilityJobDefinition_NetworkConfigPropertyValidator)(properties.networkConfig));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('stoppingCondition', CfnModelExplainabilityJobDefinition_StoppingConditionPropertyValidator)(properties.stoppingCondition));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnModelExplainabilityJobDefinitionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition` resource
 *
 * @param properties - the TypeScript properties of a `CfnModelExplainabilityJobDefinitionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition` resource.
 */
// @ts-ignore TS6133
function cfnModelExplainabilityJobDefinitionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelExplainabilityJobDefinitionPropsValidator(properties).assertSuccess();
    return {
        JobResources: cfnModelExplainabilityJobDefinitionMonitoringResourcesPropertyToCloudFormation(properties.jobResources),
        ModelExplainabilityAppSpecification: cfnModelExplainabilityJobDefinitionModelExplainabilityAppSpecificationPropertyToCloudFormation(properties.modelExplainabilityAppSpecification),
        ModelExplainabilityJobInput: cfnModelExplainabilityJobDefinitionModelExplainabilityJobInputPropertyToCloudFormation(properties.modelExplainabilityJobInput),
        ModelExplainabilityJobOutputConfig: cfnModelExplainabilityJobDefinitionMonitoringOutputConfigPropertyToCloudFormation(properties.modelExplainabilityJobOutputConfig),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        JobDefinitionName: cdk.stringToCloudFormation(properties.jobDefinitionName),
        ModelExplainabilityBaselineConfig: cfnModelExplainabilityJobDefinitionModelExplainabilityBaselineConfigPropertyToCloudFormation(properties.modelExplainabilityBaselineConfig),
        NetworkConfig: cfnModelExplainabilityJobDefinitionNetworkConfigPropertyToCloudFormation(properties.networkConfig),
        StoppingCondition: cfnModelExplainabilityJobDefinitionStoppingConditionPropertyToCloudFormation(properties.stoppingCondition),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnModelExplainabilityJobDefinitionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelExplainabilityJobDefinitionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelExplainabilityJobDefinitionProps>();
    ret.addPropertyResult('jobResources', 'JobResources', CfnModelExplainabilityJobDefinitionMonitoringResourcesPropertyFromCloudFormation(properties.JobResources));
    ret.addPropertyResult('modelExplainabilityAppSpecification', 'ModelExplainabilityAppSpecification', CfnModelExplainabilityJobDefinitionModelExplainabilityAppSpecificationPropertyFromCloudFormation(properties.ModelExplainabilityAppSpecification));
    ret.addPropertyResult('modelExplainabilityJobInput', 'ModelExplainabilityJobInput', CfnModelExplainabilityJobDefinitionModelExplainabilityJobInputPropertyFromCloudFormation(properties.ModelExplainabilityJobInput));
    ret.addPropertyResult('modelExplainabilityJobOutputConfig', 'ModelExplainabilityJobOutputConfig', CfnModelExplainabilityJobDefinitionMonitoringOutputConfigPropertyFromCloudFormation(properties.ModelExplainabilityJobOutputConfig));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('jobDefinitionName', 'JobDefinitionName', properties.JobDefinitionName != null ? cfn_parse.FromCloudFormation.getString(properties.JobDefinitionName) : undefined);
    ret.addPropertyResult('modelExplainabilityBaselineConfig', 'ModelExplainabilityBaselineConfig', properties.ModelExplainabilityBaselineConfig != null ? CfnModelExplainabilityJobDefinitionModelExplainabilityBaselineConfigPropertyFromCloudFormation(properties.ModelExplainabilityBaselineConfig) : undefined);
    ret.addPropertyResult('networkConfig', 'NetworkConfig', properties.NetworkConfig != null ? CfnModelExplainabilityJobDefinitionNetworkConfigPropertyFromCloudFormation(properties.NetworkConfig) : undefined);
    ret.addPropertyResult('stoppingCondition', 'StoppingCondition', properties.StoppingCondition != null ? CfnModelExplainabilityJobDefinitionStoppingConditionPropertyFromCloudFormation(properties.StoppingCondition) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::ModelExplainabilityJobDefinition`
 *
 * Creates the definition for a model explainability job.
 *
 * @cloudformationResource AWS::SageMaker::ModelExplainabilityJobDefinition
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html
 */
export class CfnModelExplainabilityJobDefinition extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::ModelExplainabilityJobDefinition";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnModelExplainabilityJobDefinition {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnModelExplainabilityJobDefinitionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnModelExplainabilityJobDefinition(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The time when the job definition was created.
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: string;

    /**
     * The Amazon Resource Name (ARN) of the job definition.
     * @cloudformationAttribute JobDefinitionArn
     */
    public readonly attrJobDefinitionArn: string;

    /**
     * Identifies the resources to deploy for a monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-jobresources
     */
    public jobResources: CfnModelExplainabilityJobDefinition.MonitoringResourcesProperty | cdk.IResolvable;

    /**
     * Configures the model explainability job to run a specified Docker container image.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityappspecification
     */
    public modelExplainabilityAppSpecification: CfnModelExplainabilityJobDefinition.ModelExplainabilityAppSpecificationProperty | cdk.IResolvable;

    /**
     * Inputs for the model explainability job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityjobinput
     */
    public modelExplainabilityJobInput: CfnModelExplainabilityJobDefinition.ModelExplainabilityJobInputProperty | cdk.IResolvable;

    /**
     * The output configuration for monitoring jobs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityjoboutputconfig
     */
    public modelExplainabilityJobOutputConfig: CfnModelExplainabilityJobDefinition.MonitoringOutputConfigProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to perform tasks on your behalf.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-rolearn
     */
    public roleArn: string;

    /**
     * The name of the model explainability job definition. The name must be unique within an AWS Region in the AWS account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-jobdefinitionname
     */
    public jobDefinitionName: string | undefined;

    /**
     * The baseline configuration for a model explainability job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-modelexplainabilitybaselineconfig
     */
    public modelExplainabilityBaselineConfig: CfnModelExplainabilityJobDefinition.ModelExplainabilityBaselineConfigProperty | cdk.IResolvable | undefined;

    /**
     * Networking options for a model explainability job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-networkconfig
     */
    public networkConfig: CfnModelExplainabilityJobDefinition.NetworkConfigProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::SageMaker::ModelExplainabilityJobDefinition.StoppingCondition`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-stoppingcondition
     */
    public stoppingCondition: CfnModelExplainabilityJobDefinition.StoppingConditionProperty | cdk.IResolvable | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelexplainabilityjobdefinition.html#cfn-sagemaker-modelexplainabilityjobdefinition-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::ModelExplainabilityJobDefinition`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnModelExplainabilityJobDefinitionProps) {
        super(scope, id, { type: CfnModelExplainabilityJobDefinition.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'jobResources', this);
        cdk.requireProperty(props, 'modelExplainabilityAppSpecification', this);
        cdk.requireProperty(props, 'modelExplainabilityJobInput', this);
        cdk.requireProperty(props, 'modelExplainabilityJobOutputConfig', this);
        cdk.requireProperty(props, 'roleArn', this);
        this.attrCreationTime = cdk.Token.asString(this.getAtt('CreationTime'));
        this.attrJobDefinitionArn = cdk.Token.asString(this.getAtt('JobDefinitionArn'));

        this.jobResources = props.jobResources;
        this.modelExplainabilityAppSpecification = props.modelExplainabilityAppSpecification;
        this.modelExplainabilityJobInput = props.modelExplainabilityJobInput;
        this.modelExplainabilityJobOutputConfig = props.modelExplainabilityJobOutputConfig;
        this.roleArn = props.roleArn;
        this.jobDefinitionName = props.jobDefinitionName;
        this.modelExplainabilityBaselineConfig = props.modelExplainabilityBaselineConfig;
        this.networkConfig = props.networkConfig;
        this.stoppingCondition = props.stoppingCondition;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::ModelExplainabilityJobDefinition", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnModelExplainabilityJobDefinition.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            jobResources: this.jobResources,
            modelExplainabilityAppSpecification: this.modelExplainabilityAppSpecification,
            modelExplainabilityJobInput: this.modelExplainabilityJobInput,
            modelExplainabilityJobOutputConfig: this.modelExplainabilityJobOutputConfig,
            roleArn: this.roleArn,
            jobDefinitionName: this.jobDefinitionName,
            modelExplainabilityBaselineConfig: this.modelExplainabilityBaselineConfig,
            networkConfig: this.networkConfig,
            stoppingCondition: this.stoppingCondition,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnModelExplainabilityJobDefinitionPropsToCloudFormation(props);
    }
}

export namespace CfnModelExplainabilityJobDefinition {
    /**
     * The configuration for the cluster resources used to run the processing job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-clusterconfig.html
     */
    export interface ClusterConfigProperty {
        /**
         * The number of ML compute instances to use in the model monitoring job. For distributed processing jobs, specify a value greater than 1. The default value is 1.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-clusterconfig.html#cfn-sagemaker-modelexplainabilityjobdefinition-clusterconfig-instancecount
         */
        readonly instanceCount: number;
        /**
         * The ML compute instance type for the processing job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-clusterconfig.html#cfn-sagemaker-modelexplainabilityjobdefinition-clusterconfig-instancetype
         */
        readonly instanceType: string;
        /**
         * The AWS Key Management Service ( AWS KMS) key that Amazon SageMaker uses to encrypt data on the storage volume attached to the ML compute instance(s) that run the model monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-clusterconfig.html#cfn-sagemaker-modelexplainabilityjobdefinition-clusterconfig-volumekmskeyid
         */
        readonly volumeKmsKeyId?: string;
        /**
         * The size of the ML storage volume, in gigabytes, that you want to provision. You must specify sufficient ML storage for your scenario.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-clusterconfig.html#cfn-sagemaker-modelexplainabilityjobdefinition-clusterconfig-volumesizeingb
         */
        readonly volumeSizeInGb: number;
    }
}

/**
 * Determine whether the given properties match those of a `ClusterConfigProperty`
 *
 * @param properties - the TypeScript properties of a `ClusterConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelExplainabilityJobDefinition_ClusterConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceCount', cdk.requiredValidator)(properties.instanceCount));
    errors.collect(cdk.propertyValidator('instanceCount', cdk.validateNumber)(properties.instanceCount));
    errors.collect(cdk.propertyValidator('instanceType', cdk.requiredValidator)(properties.instanceType));
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('volumeKmsKeyId', cdk.validateString)(properties.volumeKmsKeyId));
    errors.collect(cdk.propertyValidator('volumeSizeInGb', cdk.requiredValidator)(properties.volumeSizeInGb));
    errors.collect(cdk.propertyValidator('volumeSizeInGb', cdk.validateNumber)(properties.volumeSizeInGb));
    return errors.wrap('supplied properties not correct for "ClusterConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.ClusterConfig` resource
 *
 * @param properties - the TypeScript properties of a `ClusterConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.ClusterConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelExplainabilityJobDefinitionClusterConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelExplainabilityJobDefinition_ClusterConfigPropertyValidator(properties).assertSuccess();
    return {
        InstanceCount: cdk.numberToCloudFormation(properties.instanceCount),
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        VolumeKmsKeyId: cdk.stringToCloudFormation(properties.volumeKmsKeyId),
        VolumeSizeInGB: cdk.numberToCloudFormation(properties.volumeSizeInGb),
    };
}

// @ts-ignore TS6133
function CfnModelExplainabilityJobDefinitionClusterConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelExplainabilityJobDefinition.ClusterConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelExplainabilityJobDefinition.ClusterConfigProperty>();
    ret.addPropertyResult('instanceCount', 'InstanceCount', cfn_parse.FromCloudFormation.getNumber(properties.InstanceCount));
    ret.addPropertyResult('instanceType', 'InstanceType', cfn_parse.FromCloudFormation.getString(properties.InstanceType));
    ret.addPropertyResult('volumeKmsKeyId', 'VolumeKmsKeyId', properties.VolumeKmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.VolumeKmsKeyId) : undefined);
    ret.addPropertyResult('volumeSizeInGb', 'VolumeSizeInGB', cfn_parse.FromCloudFormation.getNumber(properties.VolumeSizeInGB));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelExplainabilityJobDefinition {
    /**
     * The constraints resource for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-constraintsresource.html
     */
    export interface ConstraintsResourceProperty {
        /**
         * The Amazon S3 URI for the constraints resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-constraintsresource.html#cfn-sagemaker-modelexplainabilityjobdefinition-constraintsresource-s3uri
         */
        readonly s3Uri?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConstraintsResourceProperty`
 *
 * @param properties - the TypeScript properties of a `ConstraintsResourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelExplainabilityJobDefinition_ConstraintsResourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Uri', cdk.validateString)(properties.s3Uri));
    return errors.wrap('supplied properties not correct for "ConstraintsResourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.ConstraintsResource` resource
 *
 * @param properties - the TypeScript properties of a `ConstraintsResourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.ConstraintsResource` resource.
 */
// @ts-ignore TS6133
function cfnModelExplainabilityJobDefinitionConstraintsResourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelExplainabilityJobDefinition_ConstraintsResourcePropertyValidator(properties).assertSuccess();
    return {
        S3Uri: cdk.stringToCloudFormation(properties.s3Uri),
    };
}

// @ts-ignore TS6133
function CfnModelExplainabilityJobDefinitionConstraintsResourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelExplainabilityJobDefinition.ConstraintsResourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelExplainabilityJobDefinition.ConstraintsResourceProperty>();
    ret.addPropertyResult('s3Uri', 'S3Uri', properties.S3Uri != null ? cfn_parse.FromCloudFormation.getString(properties.S3Uri) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelExplainabilityJobDefinition {
    /**
     * Input object for the endpoint
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-endpointinput.html
     */
    export interface EndpointInputProperty {
        /**
         * An endpoint in customer's account which has enabled `DataCaptureConfig` enabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-endpointinput.html#cfn-sagemaker-modelexplainabilityjobdefinition-endpointinput-endpointname
         */
        readonly endpointName: string;
        /**
         * The attributes of the input data that are the input features.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-endpointinput.html#cfn-sagemaker-modelexplainabilityjobdefinition-endpointinput-featuresattribute
         */
        readonly featuresAttribute?: string;
        /**
         * The attribute of the input data that represents the ground truth label.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-endpointinput.html#cfn-sagemaker-modelexplainabilityjobdefinition-endpointinput-inferenceattribute
         */
        readonly inferenceAttribute?: string;
        /**
         * Path to the filesystem where the endpoint data is available to the container.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-endpointinput.html#cfn-sagemaker-modelexplainabilityjobdefinition-endpointinput-localpath
         */
        readonly localPath: string;
        /**
         * In a classification problem, the attribute that represents the class probability.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-endpointinput.html#cfn-sagemaker-modelexplainabilityjobdefinition-endpointinput-probabilityattribute
         */
        readonly probabilityAttribute?: string;
        /**
         * Whether input data distributed in Amazon S3 is fully replicated or sharded by an S3 key. Defaults to `FullyReplicated`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-endpointinput.html#cfn-sagemaker-modelexplainabilityjobdefinition-endpointinput-s3datadistributiontype
         */
        readonly s3DataDistributionType?: string;
        /**
         * Whether the `Pipe` or `File` is used as the input mode for transferring data for the monitoring job. `Pipe` mode is recommended for large datasets. `File` mode is useful for small files that fit in memory. Defaults to `File` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-endpointinput.html#cfn-sagemaker-modelexplainabilityjobdefinition-endpointinput-s3inputmode
         */
        readonly s3InputMode?: string;
    }
}

/**
 * Determine whether the given properties match those of a `EndpointInputProperty`
 *
 * @param properties - the TypeScript properties of a `EndpointInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelExplainabilityJobDefinition_EndpointInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endpointName', cdk.requiredValidator)(properties.endpointName));
    errors.collect(cdk.propertyValidator('endpointName', cdk.validateString)(properties.endpointName));
    errors.collect(cdk.propertyValidator('featuresAttribute', cdk.validateString)(properties.featuresAttribute));
    errors.collect(cdk.propertyValidator('inferenceAttribute', cdk.validateString)(properties.inferenceAttribute));
    errors.collect(cdk.propertyValidator('localPath', cdk.requiredValidator)(properties.localPath));
    errors.collect(cdk.propertyValidator('localPath', cdk.validateString)(properties.localPath));
    errors.collect(cdk.propertyValidator('probabilityAttribute', cdk.validateString)(properties.probabilityAttribute));
    errors.collect(cdk.propertyValidator('s3DataDistributionType', cdk.validateString)(properties.s3DataDistributionType));
    errors.collect(cdk.propertyValidator('s3InputMode', cdk.validateString)(properties.s3InputMode));
    return errors.wrap('supplied properties not correct for "EndpointInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.EndpointInput` resource
 *
 * @param properties - the TypeScript properties of a `EndpointInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.EndpointInput` resource.
 */
// @ts-ignore TS6133
function cfnModelExplainabilityJobDefinitionEndpointInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelExplainabilityJobDefinition_EndpointInputPropertyValidator(properties).assertSuccess();
    return {
        EndpointName: cdk.stringToCloudFormation(properties.endpointName),
        FeaturesAttribute: cdk.stringToCloudFormation(properties.featuresAttribute),
        InferenceAttribute: cdk.stringToCloudFormation(properties.inferenceAttribute),
        LocalPath: cdk.stringToCloudFormation(properties.localPath),
        ProbabilityAttribute: cdk.stringToCloudFormation(properties.probabilityAttribute),
        S3DataDistributionType: cdk.stringToCloudFormation(properties.s3DataDistributionType),
        S3InputMode: cdk.stringToCloudFormation(properties.s3InputMode),
    };
}

// @ts-ignore TS6133
function CfnModelExplainabilityJobDefinitionEndpointInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelExplainabilityJobDefinition.EndpointInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelExplainabilityJobDefinition.EndpointInputProperty>();
    ret.addPropertyResult('endpointName', 'EndpointName', cfn_parse.FromCloudFormation.getString(properties.EndpointName));
    ret.addPropertyResult('featuresAttribute', 'FeaturesAttribute', properties.FeaturesAttribute != null ? cfn_parse.FromCloudFormation.getString(properties.FeaturesAttribute) : undefined);
    ret.addPropertyResult('inferenceAttribute', 'InferenceAttribute', properties.InferenceAttribute != null ? cfn_parse.FromCloudFormation.getString(properties.InferenceAttribute) : undefined);
    ret.addPropertyResult('localPath', 'LocalPath', cfn_parse.FromCloudFormation.getString(properties.LocalPath));
    ret.addPropertyResult('probabilityAttribute', 'ProbabilityAttribute', properties.ProbabilityAttribute != null ? cfn_parse.FromCloudFormation.getString(properties.ProbabilityAttribute) : undefined);
    ret.addPropertyResult('s3DataDistributionType', 'S3DataDistributionType', properties.S3DataDistributionType != null ? cfn_parse.FromCloudFormation.getString(properties.S3DataDistributionType) : undefined);
    ret.addPropertyResult('s3InputMode', 'S3InputMode', properties.S3InputMode != null ? cfn_parse.FromCloudFormation.getString(properties.S3InputMode) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelExplainabilityJobDefinition {
    /**
     * Docker container image configuration object for the model explainability job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityappspecification.html
     */
    export interface ModelExplainabilityAppSpecificationProperty {
        /**
         * JSON formatted S3 file that defines explainability parameters. For more information on this JSON configuration file, see [Configure model explainability parameters](https://docs.aws.amazon.com/sagemaker/latest/json-model-explainability-parameter-config.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityappspecification.html#cfn-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityappspecification-configuri
         */
        readonly configUri: string;
        /**
         * Sets the environment variables in the Docker container.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityappspecification.html#cfn-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityappspecification-environment
         */
        readonly environment?: { [key: string]: (string) } | cdk.IResolvable;
        /**
         * The container image to be run by the model explainability job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityappspecification.html#cfn-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityappspecification-imageuri
         */
        readonly imageUri: string;
    }
}

/**
 * Determine whether the given properties match those of a `ModelExplainabilityAppSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `ModelExplainabilityAppSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelExplainabilityJobDefinition_ModelExplainabilityAppSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('configUri', cdk.requiredValidator)(properties.configUri));
    errors.collect(cdk.propertyValidator('configUri', cdk.validateString)(properties.configUri));
    errors.collect(cdk.propertyValidator('environment', cdk.hashValidator(cdk.validateString))(properties.environment));
    errors.collect(cdk.propertyValidator('imageUri', cdk.requiredValidator)(properties.imageUri));
    errors.collect(cdk.propertyValidator('imageUri', cdk.validateString)(properties.imageUri));
    return errors.wrap('supplied properties not correct for "ModelExplainabilityAppSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.ModelExplainabilityAppSpecification` resource
 *
 * @param properties - the TypeScript properties of a `ModelExplainabilityAppSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.ModelExplainabilityAppSpecification` resource.
 */
// @ts-ignore TS6133
function cfnModelExplainabilityJobDefinitionModelExplainabilityAppSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelExplainabilityJobDefinition_ModelExplainabilityAppSpecificationPropertyValidator(properties).assertSuccess();
    return {
        ConfigUri: cdk.stringToCloudFormation(properties.configUri),
        Environment: cdk.hashMapper(cdk.stringToCloudFormation)(properties.environment),
        ImageUri: cdk.stringToCloudFormation(properties.imageUri),
    };
}

// @ts-ignore TS6133
function CfnModelExplainabilityJobDefinitionModelExplainabilityAppSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelExplainabilityJobDefinition.ModelExplainabilityAppSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelExplainabilityJobDefinition.ModelExplainabilityAppSpecificationProperty>();
    ret.addPropertyResult('configUri', 'ConfigUri', cfn_parse.FromCloudFormation.getString(properties.ConfigUri));
    ret.addPropertyResult('environment', 'Environment', properties.Environment != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Environment) : undefined);
    ret.addPropertyResult('imageUri', 'ImageUri', cfn_parse.FromCloudFormation.getString(properties.ImageUri));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelExplainabilityJobDefinition {
    /**
     * The configuration for a baseline model explainability job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-modelexplainabilitybaselineconfig.html
     */
    export interface ModelExplainabilityBaselineConfigProperty {
        /**
         * The name of the baseline model explainability job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-modelexplainabilitybaselineconfig.html#cfn-sagemaker-modelexplainabilityjobdefinition-modelexplainabilitybaselineconfig-baseliningjobname
         */
        readonly baseliningJobName?: string;
        /**
         * The constraints resource for a model explainability job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-modelexplainabilitybaselineconfig.html#cfn-sagemaker-modelexplainabilityjobdefinition-modelexplainabilitybaselineconfig-constraintsresource
         */
        readonly constraintsResource?: CfnModelExplainabilityJobDefinition.ConstraintsResourceProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ModelExplainabilityBaselineConfigProperty`
 *
 * @param properties - the TypeScript properties of a `ModelExplainabilityBaselineConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelExplainabilityJobDefinition_ModelExplainabilityBaselineConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('baseliningJobName', cdk.validateString)(properties.baseliningJobName));
    errors.collect(cdk.propertyValidator('constraintsResource', CfnModelExplainabilityJobDefinition_ConstraintsResourcePropertyValidator)(properties.constraintsResource));
    return errors.wrap('supplied properties not correct for "ModelExplainabilityBaselineConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.ModelExplainabilityBaselineConfig` resource
 *
 * @param properties - the TypeScript properties of a `ModelExplainabilityBaselineConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.ModelExplainabilityBaselineConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelExplainabilityJobDefinitionModelExplainabilityBaselineConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelExplainabilityJobDefinition_ModelExplainabilityBaselineConfigPropertyValidator(properties).assertSuccess();
    return {
        BaseliningJobName: cdk.stringToCloudFormation(properties.baseliningJobName),
        ConstraintsResource: cfnModelExplainabilityJobDefinitionConstraintsResourcePropertyToCloudFormation(properties.constraintsResource),
    };
}

// @ts-ignore TS6133
function CfnModelExplainabilityJobDefinitionModelExplainabilityBaselineConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelExplainabilityJobDefinition.ModelExplainabilityBaselineConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelExplainabilityJobDefinition.ModelExplainabilityBaselineConfigProperty>();
    ret.addPropertyResult('baseliningJobName', 'BaseliningJobName', properties.BaseliningJobName != null ? cfn_parse.FromCloudFormation.getString(properties.BaseliningJobName) : undefined);
    ret.addPropertyResult('constraintsResource', 'ConstraintsResource', properties.ConstraintsResource != null ? CfnModelExplainabilityJobDefinitionConstraintsResourcePropertyFromCloudFormation(properties.ConstraintsResource) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelExplainabilityJobDefinition {
    /**
     * Inputs for the model explainability job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityjobinput.html
     */
    export interface ModelExplainabilityJobInputProperty {
        /**
         * `CfnModelExplainabilityJobDefinition.ModelExplainabilityJobInputProperty.EndpointInput`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityjobinput.html#cfn-sagemaker-modelexplainabilityjobdefinition-modelexplainabilityjobinput-endpointinput
         */
        readonly endpointInput: CfnModelExplainabilityJobDefinition.EndpointInputProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ModelExplainabilityJobInputProperty`
 *
 * @param properties - the TypeScript properties of a `ModelExplainabilityJobInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelExplainabilityJobDefinition_ModelExplainabilityJobInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endpointInput', cdk.requiredValidator)(properties.endpointInput));
    errors.collect(cdk.propertyValidator('endpointInput', CfnModelExplainabilityJobDefinition_EndpointInputPropertyValidator)(properties.endpointInput));
    return errors.wrap('supplied properties not correct for "ModelExplainabilityJobInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.ModelExplainabilityJobInput` resource
 *
 * @param properties - the TypeScript properties of a `ModelExplainabilityJobInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.ModelExplainabilityJobInput` resource.
 */
// @ts-ignore TS6133
function cfnModelExplainabilityJobDefinitionModelExplainabilityJobInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelExplainabilityJobDefinition_ModelExplainabilityJobInputPropertyValidator(properties).assertSuccess();
    return {
        EndpointInput: cfnModelExplainabilityJobDefinitionEndpointInputPropertyToCloudFormation(properties.endpointInput),
    };
}

// @ts-ignore TS6133
function CfnModelExplainabilityJobDefinitionModelExplainabilityJobInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelExplainabilityJobDefinition.ModelExplainabilityJobInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelExplainabilityJobDefinition.ModelExplainabilityJobInputProperty>();
    ret.addPropertyResult('endpointInput', 'EndpointInput', CfnModelExplainabilityJobDefinitionEndpointInputPropertyFromCloudFormation(properties.EndpointInput));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelExplainabilityJobDefinition {
    /**
     * The output object for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-monitoringoutput.html
     */
    export interface MonitoringOutputProperty {
        /**
         * The Amazon S3 storage location where the results of a monitoring job are saved.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-monitoringoutput.html#cfn-sagemaker-modelexplainabilityjobdefinition-monitoringoutput-s3output
         */
        readonly s3Output: CfnModelExplainabilityJobDefinition.S3OutputProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringOutputProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelExplainabilityJobDefinition_MonitoringOutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Output', cdk.requiredValidator)(properties.s3Output));
    errors.collect(cdk.propertyValidator('s3Output', CfnModelExplainabilityJobDefinition_S3OutputPropertyValidator)(properties.s3Output));
    return errors.wrap('supplied properties not correct for "MonitoringOutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.MonitoringOutput` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.MonitoringOutput` resource.
 */
// @ts-ignore TS6133
function cfnModelExplainabilityJobDefinitionMonitoringOutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelExplainabilityJobDefinition_MonitoringOutputPropertyValidator(properties).assertSuccess();
    return {
        S3Output: cfnModelExplainabilityJobDefinitionS3OutputPropertyToCloudFormation(properties.s3Output),
    };
}

// @ts-ignore TS6133
function CfnModelExplainabilityJobDefinitionMonitoringOutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelExplainabilityJobDefinition.MonitoringOutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelExplainabilityJobDefinition.MonitoringOutputProperty>();
    ret.addPropertyResult('s3Output', 'S3Output', CfnModelExplainabilityJobDefinitionS3OutputPropertyFromCloudFormation(properties.S3Output));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelExplainabilityJobDefinition {
    /**
     * The output configuration for monitoring jobs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-monitoringoutputconfig.html
     */
    export interface MonitoringOutputConfigProperty {
        /**
         * The AWS Key Management Service ( AWS KMS) key that Amazon SageMaker uses to encrypt the model artifacts at rest using Amazon S3 server-side encryption.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-monitoringoutputconfig.html#cfn-sagemaker-modelexplainabilityjobdefinition-monitoringoutputconfig-kmskeyid
         */
        readonly kmsKeyId?: string;
        /**
         * Monitoring outputs for monitoring jobs. This is where the output of the periodic monitoring jobs is uploaded.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-monitoringoutputconfig.html#cfn-sagemaker-modelexplainabilityjobdefinition-monitoringoutputconfig-monitoringoutputs
         */
        readonly monitoringOutputs: Array<CfnModelExplainabilityJobDefinition.MonitoringOutputProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringOutputConfigProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelExplainabilityJobDefinition_MonitoringOutputConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('monitoringOutputs', cdk.requiredValidator)(properties.monitoringOutputs));
    errors.collect(cdk.propertyValidator('monitoringOutputs', cdk.listValidator(CfnModelExplainabilityJobDefinition_MonitoringOutputPropertyValidator))(properties.monitoringOutputs));
    return errors.wrap('supplied properties not correct for "MonitoringOutputConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.MonitoringOutputConfig` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.MonitoringOutputConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelExplainabilityJobDefinitionMonitoringOutputConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelExplainabilityJobDefinition_MonitoringOutputConfigPropertyValidator(properties).assertSuccess();
    return {
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        MonitoringOutputs: cdk.listMapper(cfnModelExplainabilityJobDefinitionMonitoringOutputPropertyToCloudFormation)(properties.monitoringOutputs),
    };
}

// @ts-ignore TS6133
function CfnModelExplainabilityJobDefinitionMonitoringOutputConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelExplainabilityJobDefinition.MonitoringOutputConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelExplainabilityJobDefinition.MonitoringOutputConfigProperty>();
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('monitoringOutputs', 'MonitoringOutputs', cfn_parse.FromCloudFormation.getArray(CfnModelExplainabilityJobDefinitionMonitoringOutputPropertyFromCloudFormation)(properties.MonitoringOutputs));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelExplainabilityJobDefinition {
    /**
     * Identifies the resources to deploy for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-monitoringresources.html
     */
    export interface MonitoringResourcesProperty {
        /**
         * The configuration for the cluster resources used to run the processing job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-monitoringresources.html#cfn-sagemaker-modelexplainabilityjobdefinition-monitoringresources-clusterconfig
         */
        readonly clusterConfig: CfnModelExplainabilityJobDefinition.ClusterConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringResourcesProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringResourcesProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelExplainabilityJobDefinition_MonitoringResourcesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clusterConfig', cdk.requiredValidator)(properties.clusterConfig));
    errors.collect(cdk.propertyValidator('clusterConfig', CfnModelExplainabilityJobDefinition_ClusterConfigPropertyValidator)(properties.clusterConfig));
    return errors.wrap('supplied properties not correct for "MonitoringResourcesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.MonitoringResources` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringResourcesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.MonitoringResources` resource.
 */
// @ts-ignore TS6133
function cfnModelExplainabilityJobDefinitionMonitoringResourcesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelExplainabilityJobDefinition_MonitoringResourcesPropertyValidator(properties).assertSuccess();
    return {
        ClusterConfig: cfnModelExplainabilityJobDefinitionClusterConfigPropertyToCloudFormation(properties.clusterConfig),
    };
}

// @ts-ignore TS6133
function CfnModelExplainabilityJobDefinitionMonitoringResourcesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelExplainabilityJobDefinition.MonitoringResourcesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelExplainabilityJobDefinition.MonitoringResourcesProperty>();
    ret.addPropertyResult('clusterConfig', 'ClusterConfig', CfnModelExplainabilityJobDefinitionClusterConfigPropertyFromCloudFormation(properties.ClusterConfig));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelExplainabilityJobDefinition {
    /**
     * Networking options for a job, such as network traffic encryption between containers, whether to allow inbound and outbound network calls to and from containers, and the VPC subnets and security groups to use for VPC-enabled jobs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-networkconfig.html
     */
    export interface NetworkConfigProperty {
        /**
         * Whether to encrypt all communications between distributed processing jobs. Choose `True` to encrypt communications. Encryption provides greater security for distributed processing jobs, but the processing might take longer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-networkconfig.html#cfn-sagemaker-modelexplainabilityjobdefinition-networkconfig-enableintercontainertrafficencryption
         */
        readonly enableInterContainerTrafficEncryption?: boolean | cdk.IResolvable;
        /**
         * Whether to allow inbound and outbound network calls to and from the containers used for the processing job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-networkconfig.html#cfn-sagemaker-modelexplainabilityjobdefinition-networkconfig-enablenetworkisolation
         */
        readonly enableNetworkIsolation?: boolean | cdk.IResolvable;
        /**
         * `CfnModelExplainabilityJobDefinition.NetworkConfigProperty.VpcConfig`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-networkconfig.html#cfn-sagemaker-modelexplainabilityjobdefinition-networkconfig-vpcconfig
         */
        readonly vpcConfig?: CfnModelExplainabilityJobDefinition.VpcConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `NetworkConfigProperty`
 *
 * @param properties - the TypeScript properties of a `NetworkConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelExplainabilityJobDefinition_NetworkConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enableInterContainerTrafficEncryption', cdk.validateBoolean)(properties.enableInterContainerTrafficEncryption));
    errors.collect(cdk.propertyValidator('enableNetworkIsolation', cdk.validateBoolean)(properties.enableNetworkIsolation));
    errors.collect(cdk.propertyValidator('vpcConfig', CfnModelExplainabilityJobDefinition_VpcConfigPropertyValidator)(properties.vpcConfig));
    return errors.wrap('supplied properties not correct for "NetworkConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.NetworkConfig` resource
 *
 * @param properties - the TypeScript properties of a `NetworkConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.NetworkConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelExplainabilityJobDefinitionNetworkConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelExplainabilityJobDefinition_NetworkConfigPropertyValidator(properties).assertSuccess();
    return {
        EnableInterContainerTrafficEncryption: cdk.booleanToCloudFormation(properties.enableInterContainerTrafficEncryption),
        EnableNetworkIsolation: cdk.booleanToCloudFormation(properties.enableNetworkIsolation),
        VpcConfig: cfnModelExplainabilityJobDefinitionVpcConfigPropertyToCloudFormation(properties.vpcConfig),
    };
}

// @ts-ignore TS6133
function CfnModelExplainabilityJobDefinitionNetworkConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelExplainabilityJobDefinition.NetworkConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelExplainabilityJobDefinition.NetworkConfigProperty>();
    ret.addPropertyResult('enableInterContainerTrafficEncryption', 'EnableInterContainerTrafficEncryption', properties.EnableInterContainerTrafficEncryption != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableInterContainerTrafficEncryption) : undefined);
    ret.addPropertyResult('enableNetworkIsolation', 'EnableNetworkIsolation', properties.EnableNetworkIsolation != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableNetworkIsolation) : undefined);
    ret.addPropertyResult('vpcConfig', 'VpcConfig', properties.VpcConfig != null ? CfnModelExplainabilityJobDefinitionVpcConfigPropertyFromCloudFormation(properties.VpcConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelExplainabilityJobDefinition {
    /**
     * The Amazon S3 storage location where the results of a monitoring job are saved.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-s3output.html
     */
    export interface S3OutputProperty {
        /**
         * The local path to the Amazon S3 storage location where Amazon SageMaker saves the results of a monitoring job. LocalPath is an absolute path for the output data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-s3output.html#cfn-sagemaker-modelexplainabilityjobdefinition-s3output-localpath
         */
        readonly localPath: string;
        /**
         * Whether to upload the results of the monitoring job continuously or after the job completes.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-s3output.html#cfn-sagemaker-modelexplainabilityjobdefinition-s3output-s3uploadmode
         */
        readonly s3UploadMode?: string;
        /**
         * A URI that identifies the Amazon S3 storage location where Amazon SageMaker saves the results of a monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-s3output.html#cfn-sagemaker-modelexplainabilityjobdefinition-s3output-s3uri
         */
        readonly s3Uri: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3OutputProperty`
 *
 * @param properties - the TypeScript properties of a `S3OutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelExplainabilityJobDefinition_S3OutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('localPath', cdk.requiredValidator)(properties.localPath));
    errors.collect(cdk.propertyValidator('localPath', cdk.validateString)(properties.localPath));
    errors.collect(cdk.propertyValidator('s3UploadMode', cdk.validateString)(properties.s3UploadMode));
    errors.collect(cdk.propertyValidator('s3Uri', cdk.requiredValidator)(properties.s3Uri));
    errors.collect(cdk.propertyValidator('s3Uri', cdk.validateString)(properties.s3Uri));
    return errors.wrap('supplied properties not correct for "S3OutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.S3Output` resource
 *
 * @param properties - the TypeScript properties of a `S3OutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.S3Output` resource.
 */
// @ts-ignore TS6133
function cfnModelExplainabilityJobDefinitionS3OutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelExplainabilityJobDefinition_S3OutputPropertyValidator(properties).assertSuccess();
    return {
        LocalPath: cdk.stringToCloudFormation(properties.localPath),
        S3UploadMode: cdk.stringToCloudFormation(properties.s3UploadMode),
        S3Uri: cdk.stringToCloudFormation(properties.s3Uri),
    };
}

// @ts-ignore TS6133
function CfnModelExplainabilityJobDefinitionS3OutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelExplainabilityJobDefinition.S3OutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelExplainabilityJobDefinition.S3OutputProperty>();
    ret.addPropertyResult('localPath', 'LocalPath', cfn_parse.FromCloudFormation.getString(properties.LocalPath));
    ret.addPropertyResult('s3UploadMode', 'S3UploadMode', properties.S3UploadMode != null ? cfn_parse.FromCloudFormation.getString(properties.S3UploadMode) : undefined);
    ret.addPropertyResult('s3Uri', 'S3Uri', cfn_parse.FromCloudFormation.getString(properties.S3Uri));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelExplainabilityJobDefinition {
    /**
     * Specifies a limit to how long a model training job or model compilation job can run. It also specifies how long a managed spot training job has to complete. When the job reaches the time limit, SageMaker ends the training or compilation job. Use this API to cap model training costs.
     *
     * To stop a training job, SageMaker sends the algorithm the `SIGTERM` signal, which delays job termination for 120 seconds. Algorithms can use this 120-second window to save the model artifacts, so the results of training are not lost.
     *
     * The training algorithms provided by SageMaker automatically save the intermediate results of a model training job when possible. This attempt to save artifacts is only a best effort case as model might not be in a state from which it can be saved. For example, if training has just started, the model might not be ready to save. When saved, this intermediate data is a valid model artifact. You can use it to create a model with `CreateModel` .
     *
     * > The Neural Topic Model (NTM) currently does not support saving intermediate model artifacts. When training NTMs, make sure that the maximum runtime is sufficient for the training job to complete.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-stoppingcondition.html
     */
    export interface StoppingConditionProperty {
        /**
         * The maximum length of time, in seconds, that a training or compilation job can run.
         *
         * For compilation jobs, if the job does not complete during this time, a `TimeOut` error is generated. We recommend starting with 900 seconds and increasing as necessary based on your model.
         *
         * For all other jobs, if the job does not complete during this time, SageMaker ends the job. When `RetryStrategy` is specified in the job request, `MaxRuntimeInSeconds` specifies the maximum time for all of the attempts in total, not each individual attempt. The default value is 1 day. The maximum value is 28 days.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-stoppingcondition.html#cfn-sagemaker-modelexplainabilityjobdefinition-stoppingcondition-maxruntimeinseconds
         */
        readonly maxRuntimeInSeconds: number;
    }
}

/**
 * Determine whether the given properties match those of a `StoppingConditionProperty`
 *
 * @param properties - the TypeScript properties of a `StoppingConditionProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelExplainabilityJobDefinition_StoppingConditionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('maxRuntimeInSeconds', cdk.requiredValidator)(properties.maxRuntimeInSeconds));
    errors.collect(cdk.propertyValidator('maxRuntimeInSeconds', cdk.validateNumber)(properties.maxRuntimeInSeconds));
    return errors.wrap('supplied properties not correct for "StoppingConditionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.StoppingCondition` resource
 *
 * @param properties - the TypeScript properties of a `StoppingConditionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.StoppingCondition` resource.
 */
// @ts-ignore TS6133
function cfnModelExplainabilityJobDefinitionStoppingConditionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelExplainabilityJobDefinition_StoppingConditionPropertyValidator(properties).assertSuccess();
    return {
        MaxRuntimeInSeconds: cdk.numberToCloudFormation(properties.maxRuntimeInSeconds),
    };
}

// @ts-ignore TS6133
function CfnModelExplainabilityJobDefinitionStoppingConditionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelExplainabilityJobDefinition.StoppingConditionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelExplainabilityJobDefinition.StoppingConditionProperty>();
    ret.addPropertyResult('maxRuntimeInSeconds', 'MaxRuntimeInSeconds', cfn_parse.FromCloudFormation.getNumber(properties.MaxRuntimeInSeconds));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelExplainabilityJobDefinition {
    /**
     * Specifies a VPC that your training jobs and hosted models have access to. Control access to and from your training and model containers by configuring the VPC. For more information, see [Protect Endpoints by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/host-vpc.html) and [Protect Training Jobs by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/train-vpc.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-vpcconfig.html
     */
    export interface VpcConfigProperty {
        /**
         * The VPC security group IDs, in the form sg-xxxxxxxx. Specify the security groups for the VPC that is specified in the `Subnets` field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-vpcconfig.html#cfn-sagemaker-modelexplainabilityjobdefinition-vpcconfig-securitygroupids
         */
        readonly securityGroupIds: string[];
        /**
         * The ID of the subnets in the VPC to which you want to connect your training job or model. For information about the availability of specific instance types, see [Supported Instance Types and Availability Zones](https://docs.aws.amazon.com/sagemaker/latest/dg/instance-types-az.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelexplainabilityjobdefinition-vpcconfig.html#cfn-sagemaker-modelexplainabilityjobdefinition-vpcconfig-subnets
         */
        readonly subnets: string[];
    }
}

/**
 * Determine whether the given properties match those of a `VpcConfigProperty`
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelExplainabilityJobDefinition_VpcConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.requiredValidator)(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('subnets', cdk.requiredValidator)(properties.subnets));
    errors.collect(cdk.propertyValidator('subnets', cdk.listValidator(cdk.validateString))(properties.subnets));
    return errors.wrap('supplied properties not correct for "VpcConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.VpcConfig` resource
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelExplainabilityJobDefinition.VpcConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelExplainabilityJobDefinitionVpcConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelExplainabilityJobDefinition_VpcConfigPropertyValidator(properties).assertSuccess();
    return {
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        Subnets: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnets),
    };
}

// @ts-ignore TS6133
function CfnModelExplainabilityJobDefinitionVpcConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelExplainabilityJobDefinition.VpcConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelExplainabilityJobDefinition.VpcConfigProperty>();
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds));
    ret.addPropertyResult('subnets', 'Subnets', cfn_parse.FromCloudFormation.getStringArray(properties.Subnets));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnModelPackageGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelpackagegroup.html
 */
export interface CfnModelPackageGroupProps {

    /**
     * The name of the model group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelpackagegroup.html#cfn-sagemaker-modelpackagegroup-modelpackagegroupname
     */
    readonly modelPackageGroupName: string;

    /**
     * The description for the model group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelpackagegroup.html#cfn-sagemaker-modelpackagegroup-modelpackagegroupdescription
     */
    readonly modelPackageGroupDescription?: string;

    /**
     * A resouce policy to control access to a model group. For information about resoure policies, see [Identity-based policies and resource-based policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_identity-vs-resource.html) in the *AWS Identity and Access Management User Guide.* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelpackagegroup.html#cfn-sagemaker-modelpackagegroup-modelpackagegrouppolicy
     */
    readonly modelPackageGroupPolicy?: any | cdk.IResolvable;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelpackagegroup.html#cfn-sagemaker-modelpackagegroup-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnModelPackageGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnModelPackageGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnModelPackageGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('modelPackageGroupDescription', cdk.validateString)(properties.modelPackageGroupDescription));
    errors.collect(cdk.propertyValidator('modelPackageGroupName', cdk.requiredValidator)(properties.modelPackageGroupName));
    errors.collect(cdk.propertyValidator('modelPackageGroupName', cdk.validateString)(properties.modelPackageGroupName));
    errors.collect(cdk.propertyValidator('modelPackageGroupPolicy', cdk.validateObject)(properties.modelPackageGroupPolicy));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnModelPackageGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelPackageGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnModelPackageGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelPackageGroup` resource.
 */
// @ts-ignore TS6133
function cfnModelPackageGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelPackageGroupPropsValidator(properties).assertSuccess();
    return {
        ModelPackageGroupName: cdk.stringToCloudFormation(properties.modelPackageGroupName),
        ModelPackageGroupDescription: cdk.stringToCloudFormation(properties.modelPackageGroupDescription),
        ModelPackageGroupPolicy: cdk.objectToCloudFormation(properties.modelPackageGroupPolicy),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnModelPackageGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelPackageGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelPackageGroupProps>();
    ret.addPropertyResult('modelPackageGroupName', 'ModelPackageGroupName', cfn_parse.FromCloudFormation.getString(properties.ModelPackageGroupName));
    ret.addPropertyResult('modelPackageGroupDescription', 'ModelPackageGroupDescription', properties.ModelPackageGroupDescription != null ? cfn_parse.FromCloudFormation.getString(properties.ModelPackageGroupDescription) : undefined);
    ret.addPropertyResult('modelPackageGroupPolicy', 'ModelPackageGroupPolicy', properties.ModelPackageGroupPolicy != null ? cfn_parse.FromCloudFormation.getAny(properties.ModelPackageGroupPolicy) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::ModelPackageGroup`
 *
 * A group of versioned models in the model registry.
 *
 * @cloudformationResource AWS::SageMaker::ModelPackageGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelpackagegroup.html
 */
export class CfnModelPackageGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::ModelPackageGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnModelPackageGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnModelPackageGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnModelPackageGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The time when the model group was created.
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: string;

    /**
     * The Amazon Resource Name (ARN) of the model group.
     * @cloudformationAttribute ModelPackageGroupArn
     */
    public readonly attrModelPackageGroupArn: string;

    /**
     * The status of the model group.
     * @cloudformationAttribute ModelPackageGroupStatus
     */
    public readonly attrModelPackageGroupStatus: string;

    /**
     * The name of the model group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelpackagegroup.html#cfn-sagemaker-modelpackagegroup-modelpackagegroupname
     */
    public modelPackageGroupName: string;

    /**
     * The description for the model group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelpackagegroup.html#cfn-sagemaker-modelpackagegroup-modelpackagegroupdescription
     */
    public modelPackageGroupDescription: string | undefined;

    /**
     * A resouce policy to control access to a model group. For information about resoure policies, see [Identity-based policies and resource-based policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_identity-vs-resource.html) in the *AWS Identity and Access Management User Guide.* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelpackagegroup.html#cfn-sagemaker-modelpackagegroup-modelpackagegrouppolicy
     */
    public modelPackageGroupPolicy: any | cdk.IResolvable | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelpackagegroup.html#cfn-sagemaker-modelpackagegroup-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::ModelPackageGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnModelPackageGroupProps) {
        super(scope, id, { type: CfnModelPackageGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'modelPackageGroupName', this);
        this.attrCreationTime = cdk.Token.asString(this.getAtt('CreationTime'));
        this.attrModelPackageGroupArn = cdk.Token.asString(this.getAtt('ModelPackageGroupArn'));
        this.attrModelPackageGroupStatus = cdk.Token.asString(this.getAtt('ModelPackageGroupStatus'));

        this.modelPackageGroupName = props.modelPackageGroupName;
        this.modelPackageGroupDescription = props.modelPackageGroupDescription;
        this.modelPackageGroupPolicy = props.modelPackageGroupPolicy;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::ModelPackageGroup", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnModelPackageGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            modelPackageGroupName: this.modelPackageGroupName,
            modelPackageGroupDescription: this.modelPackageGroupDescription,
            modelPackageGroupPolicy: this.modelPackageGroupPolicy,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnModelPackageGroupPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnModelQualityJobDefinition`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html
 */
export interface CfnModelQualityJobDefinitionProps {

    /**
     * Identifies the resources to deploy for a monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-jobresources
     */
    readonly jobResources: CfnModelQualityJobDefinition.MonitoringResourcesProperty | cdk.IResolvable;

    /**
     * Container image configuration object for the monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityappspecification
     */
    readonly modelQualityAppSpecification: CfnModelQualityJobDefinition.ModelQualityAppSpecificationProperty | cdk.IResolvable;

    /**
     * A list of the inputs that are monitored. Currently endpoints are supported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityjobinput
     */
    readonly modelQualityJobInput: CfnModelQualityJobDefinition.ModelQualityJobInputProperty | cdk.IResolvable;

    /**
     * The output configuration for monitoring jobs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityjoboutputconfig
     */
    readonly modelQualityJobOutputConfig: CfnModelQualityJobDefinition.MonitoringOutputConfigProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to perform tasks on your behalf.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-rolearn
     */
    readonly roleArn: string;

    /**
     * The name of the monitoring job definition.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-jobdefinitionname
     */
    readonly jobDefinitionName?: string;

    /**
     * Specifies the constraints and baselines for the monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-modelqualitybaselineconfig
     */
    readonly modelQualityBaselineConfig?: CfnModelQualityJobDefinition.ModelQualityBaselineConfigProperty | cdk.IResolvable;

    /**
     * Specifies the network configuration for the monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-networkconfig
     */
    readonly networkConfig?: CfnModelQualityJobDefinition.NetworkConfigProperty | cdk.IResolvable;

    /**
     * A time limit for how long the monitoring job is allowed to run before stopping.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-stoppingcondition
     */
    readonly stoppingCondition?: CfnModelQualityJobDefinition.StoppingConditionProperty | cdk.IResolvable;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnModelQualityJobDefinitionProps`
 *
 * @param properties - the TypeScript properties of a `CfnModelQualityJobDefinitionProps`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinitionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('jobDefinitionName', cdk.validateString)(properties.jobDefinitionName));
    errors.collect(cdk.propertyValidator('jobResources', cdk.requiredValidator)(properties.jobResources));
    errors.collect(cdk.propertyValidator('jobResources', CfnModelQualityJobDefinition_MonitoringResourcesPropertyValidator)(properties.jobResources));
    errors.collect(cdk.propertyValidator('modelQualityAppSpecification', cdk.requiredValidator)(properties.modelQualityAppSpecification));
    errors.collect(cdk.propertyValidator('modelQualityAppSpecification', CfnModelQualityJobDefinition_ModelQualityAppSpecificationPropertyValidator)(properties.modelQualityAppSpecification));
    errors.collect(cdk.propertyValidator('modelQualityBaselineConfig', CfnModelQualityJobDefinition_ModelQualityBaselineConfigPropertyValidator)(properties.modelQualityBaselineConfig));
    errors.collect(cdk.propertyValidator('modelQualityJobInput', cdk.requiredValidator)(properties.modelQualityJobInput));
    errors.collect(cdk.propertyValidator('modelQualityJobInput', CfnModelQualityJobDefinition_ModelQualityJobInputPropertyValidator)(properties.modelQualityJobInput));
    errors.collect(cdk.propertyValidator('modelQualityJobOutputConfig', cdk.requiredValidator)(properties.modelQualityJobOutputConfig));
    errors.collect(cdk.propertyValidator('modelQualityJobOutputConfig', CfnModelQualityJobDefinition_MonitoringOutputConfigPropertyValidator)(properties.modelQualityJobOutputConfig));
    errors.collect(cdk.propertyValidator('networkConfig', CfnModelQualityJobDefinition_NetworkConfigPropertyValidator)(properties.networkConfig));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('stoppingCondition', CfnModelQualityJobDefinition_StoppingConditionPropertyValidator)(properties.stoppingCondition));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnModelQualityJobDefinitionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition` resource
 *
 * @param properties - the TypeScript properties of a `CfnModelQualityJobDefinitionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinitionPropsValidator(properties).assertSuccess();
    return {
        JobResources: cfnModelQualityJobDefinitionMonitoringResourcesPropertyToCloudFormation(properties.jobResources),
        ModelQualityAppSpecification: cfnModelQualityJobDefinitionModelQualityAppSpecificationPropertyToCloudFormation(properties.modelQualityAppSpecification),
        ModelQualityJobInput: cfnModelQualityJobDefinitionModelQualityJobInputPropertyToCloudFormation(properties.modelQualityJobInput),
        ModelQualityJobOutputConfig: cfnModelQualityJobDefinitionMonitoringOutputConfigPropertyToCloudFormation(properties.modelQualityJobOutputConfig),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        JobDefinitionName: cdk.stringToCloudFormation(properties.jobDefinitionName),
        ModelQualityBaselineConfig: cfnModelQualityJobDefinitionModelQualityBaselineConfigPropertyToCloudFormation(properties.modelQualityBaselineConfig),
        NetworkConfig: cfnModelQualityJobDefinitionNetworkConfigPropertyToCloudFormation(properties.networkConfig),
        StoppingCondition: cfnModelQualityJobDefinitionStoppingConditionPropertyToCloudFormation(properties.stoppingCondition),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinitionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinitionProps>();
    ret.addPropertyResult('jobResources', 'JobResources', CfnModelQualityJobDefinitionMonitoringResourcesPropertyFromCloudFormation(properties.JobResources));
    ret.addPropertyResult('modelQualityAppSpecification', 'ModelQualityAppSpecification', CfnModelQualityJobDefinitionModelQualityAppSpecificationPropertyFromCloudFormation(properties.ModelQualityAppSpecification));
    ret.addPropertyResult('modelQualityJobInput', 'ModelQualityJobInput', CfnModelQualityJobDefinitionModelQualityJobInputPropertyFromCloudFormation(properties.ModelQualityJobInput));
    ret.addPropertyResult('modelQualityJobOutputConfig', 'ModelQualityJobOutputConfig', CfnModelQualityJobDefinitionMonitoringOutputConfigPropertyFromCloudFormation(properties.ModelQualityJobOutputConfig));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('jobDefinitionName', 'JobDefinitionName', properties.JobDefinitionName != null ? cfn_parse.FromCloudFormation.getString(properties.JobDefinitionName) : undefined);
    ret.addPropertyResult('modelQualityBaselineConfig', 'ModelQualityBaselineConfig', properties.ModelQualityBaselineConfig != null ? CfnModelQualityJobDefinitionModelQualityBaselineConfigPropertyFromCloudFormation(properties.ModelQualityBaselineConfig) : undefined);
    ret.addPropertyResult('networkConfig', 'NetworkConfig', properties.NetworkConfig != null ? CfnModelQualityJobDefinitionNetworkConfigPropertyFromCloudFormation(properties.NetworkConfig) : undefined);
    ret.addPropertyResult('stoppingCondition', 'StoppingCondition', properties.StoppingCondition != null ? CfnModelQualityJobDefinitionStoppingConditionPropertyFromCloudFormation(properties.StoppingCondition) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::ModelQualityJobDefinition`
 *
 * Creates a definition for a job that monitors model quality and drift. For information about model monitor, see [Amazon SageMaker Model Monitor](https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html) .
 *
 * @cloudformationResource AWS::SageMaker::ModelQualityJobDefinition
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html
 */
export class CfnModelQualityJobDefinition extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::ModelQualityJobDefinition";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnModelQualityJobDefinition {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnModelQualityJobDefinitionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnModelQualityJobDefinition(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The time when the job definition was created.
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: string;

    /**
     * The Amazon Resource Name (ARN) of the job definition.
     * @cloudformationAttribute JobDefinitionArn
     */
    public readonly attrJobDefinitionArn: string;

    /**
     * Identifies the resources to deploy for a monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-jobresources
     */
    public jobResources: CfnModelQualityJobDefinition.MonitoringResourcesProperty | cdk.IResolvable;

    /**
     * Container image configuration object for the monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityappspecification
     */
    public modelQualityAppSpecification: CfnModelQualityJobDefinition.ModelQualityAppSpecificationProperty | cdk.IResolvable;

    /**
     * A list of the inputs that are monitored. Currently endpoints are supported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityjobinput
     */
    public modelQualityJobInput: CfnModelQualityJobDefinition.ModelQualityJobInputProperty | cdk.IResolvable;

    /**
     * The output configuration for monitoring jobs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityjoboutputconfig
     */
    public modelQualityJobOutputConfig: CfnModelQualityJobDefinition.MonitoringOutputConfigProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to perform tasks on your behalf.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-rolearn
     */
    public roleArn: string;

    /**
     * The name of the monitoring job definition.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-jobdefinitionname
     */
    public jobDefinitionName: string | undefined;

    /**
     * Specifies the constraints and baselines for the monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-modelqualitybaselineconfig
     */
    public modelQualityBaselineConfig: CfnModelQualityJobDefinition.ModelQualityBaselineConfigProperty | cdk.IResolvable | undefined;

    /**
     * Specifies the network configuration for the monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-networkconfig
     */
    public networkConfig: CfnModelQualityJobDefinition.NetworkConfigProperty | cdk.IResolvable | undefined;

    /**
     * A time limit for how long the monitoring job is allowed to run before stopping.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-stoppingcondition
     */
    public stoppingCondition: CfnModelQualityJobDefinition.StoppingConditionProperty | cdk.IResolvable | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-modelqualityjobdefinition.html#cfn-sagemaker-modelqualityjobdefinition-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::ModelQualityJobDefinition`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnModelQualityJobDefinitionProps) {
        super(scope, id, { type: CfnModelQualityJobDefinition.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'jobResources', this);
        cdk.requireProperty(props, 'modelQualityAppSpecification', this);
        cdk.requireProperty(props, 'modelQualityJobInput', this);
        cdk.requireProperty(props, 'modelQualityJobOutputConfig', this);
        cdk.requireProperty(props, 'roleArn', this);
        this.attrCreationTime = cdk.Token.asString(this.getAtt('CreationTime'));
        this.attrJobDefinitionArn = cdk.Token.asString(this.getAtt('JobDefinitionArn'));

        this.jobResources = props.jobResources;
        this.modelQualityAppSpecification = props.modelQualityAppSpecification;
        this.modelQualityJobInput = props.modelQualityJobInput;
        this.modelQualityJobOutputConfig = props.modelQualityJobOutputConfig;
        this.roleArn = props.roleArn;
        this.jobDefinitionName = props.jobDefinitionName;
        this.modelQualityBaselineConfig = props.modelQualityBaselineConfig;
        this.networkConfig = props.networkConfig;
        this.stoppingCondition = props.stoppingCondition;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::ModelQualityJobDefinition", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnModelQualityJobDefinition.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            jobResources: this.jobResources,
            modelQualityAppSpecification: this.modelQualityAppSpecification,
            modelQualityJobInput: this.modelQualityJobInput,
            modelQualityJobOutputConfig: this.modelQualityJobOutputConfig,
            roleArn: this.roleArn,
            jobDefinitionName: this.jobDefinitionName,
            modelQualityBaselineConfig: this.modelQualityBaselineConfig,
            networkConfig: this.networkConfig,
            stoppingCondition: this.stoppingCondition,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnModelQualityJobDefinitionPropsToCloudFormation(props);
    }
}

export namespace CfnModelQualityJobDefinition {
    /**
     * The configuration for the cluster of resources used to run the processing job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-clusterconfig.html
     */
    export interface ClusterConfigProperty {
        /**
         * The number of ML compute instances to use in the model monitoring job. For distributed processing jobs, specify a value greater than 1. The default value is 1.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-clusterconfig.html#cfn-sagemaker-modelqualityjobdefinition-clusterconfig-instancecount
         */
        readonly instanceCount: number;
        /**
         * The ML compute instance type for the processing job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-clusterconfig.html#cfn-sagemaker-modelqualityjobdefinition-clusterconfig-instancetype
         */
        readonly instanceType: string;
        /**
         * The AWS Key Management Service ( AWS KMS) key that Amazon SageMaker uses to encrypt data on the storage volume attached to the ML compute instance(s) that run the model monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-clusterconfig.html#cfn-sagemaker-modelqualityjobdefinition-clusterconfig-volumekmskeyid
         */
        readonly volumeKmsKeyId?: string;
        /**
         * The size of the ML storage volume, in gigabytes, that you want to provision. You must specify sufficient ML storage for your scenario.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-clusterconfig.html#cfn-sagemaker-modelqualityjobdefinition-clusterconfig-volumesizeingb
         */
        readonly volumeSizeInGb: number;
    }
}

/**
 * Determine whether the given properties match those of a `ClusterConfigProperty`
 *
 * @param properties - the TypeScript properties of a `ClusterConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinition_ClusterConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceCount', cdk.requiredValidator)(properties.instanceCount));
    errors.collect(cdk.propertyValidator('instanceCount', cdk.validateNumber)(properties.instanceCount));
    errors.collect(cdk.propertyValidator('instanceType', cdk.requiredValidator)(properties.instanceType));
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('volumeKmsKeyId', cdk.validateString)(properties.volumeKmsKeyId));
    errors.collect(cdk.propertyValidator('volumeSizeInGb', cdk.requiredValidator)(properties.volumeSizeInGb));
    errors.collect(cdk.propertyValidator('volumeSizeInGb', cdk.validateNumber)(properties.volumeSizeInGb));
    return errors.wrap('supplied properties not correct for "ClusterConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.ClusterConfig` resource
 *
 * @param properties - the TypeScript properties of a `ClusterConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.ClusterConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionClusterConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinition_ClusterConfigPropertyValidator(properties).assertSuccess();
    return {
        InstanceCount: cdk.numberToCloudFormation(properties.instanceCount),
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        VolumeKmsKeyId: cdk.stringToCloudFormation(properties.volumeKmsKeyId),
        VolumeSizeInGB: cdk.numberToCloudFormation(properties.volumeSizeInGb),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionClusterConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinition.ClusterConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinition.ClusterConfigProperty>();
    ret.addPropertyResult('instanceCount', 'InstanceCount', cfn_parse.FromCloudFormation.getNumber(properties.InstanceCount));
    ret.addPropertyResult('instanceType', 'InstanceType', cfn_parse.FromCloudFormation.getString(properties.InstanceType));
    ret.addPropertyResult('volumeKmsKeyId', 'VolumeKmsKeyId', properties.VolumeKmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.VolumeKmsKeyId) : undefined);
    ret.addPropertyResult('volumeSizeInGb', 'VolumeSizeInGB', cfn_parse.FromCloudFormation.getNumber(properties.VolumeSizeInGB));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelQualityJobDefinition {
    /**
     * The constraints resource for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-constraintsresource.html
     */
    export interface ConstraintsResourceProperty {
        /**
         * The Amazon S3 URI for the constraints resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-constraintsresource.html#cfn-sagemaker-modelqualityjobdefinition-constraintsresource-s3uri
         */
        readonly s3Uri?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConstraintsResourceProperty`
 *
 * @param properties - the TypeScript properties of a `ConstraintsResourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinition_ConstraintsResourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Uri', cdk.validateString)(properties.s3Uri));
    return errors.wrap('supplied properties not correct for "ConstraintsResourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.ConstraintsResource` resource
 *
 * @param properties - the TypeScript properties of a `ConstraintsResourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.ConstraintsResource` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionConstraintsResourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinition_ConstraintsResourcePropertyValidator(properties).assertSuccess();
    return {
        S3Uri: cdk.stringToCloudFormation(properties.s3Uri),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionConstraintsResourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinition.ConstraintsResourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinition.ConstraintsResourceProperty>();
    ret.addPropertyResult('s3Uri', 'S3Uri', properties.S3Uri != null ? cfn_parse.FromCloudFormation.getString(properties.S3Uri) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelQualityJobDefinition {
    /**
     * Input object for the endpoint
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-endpointinput.html
     */
    export interface EndpointInputProperty {
        /**
         * If specified, monitoring jobs substract this time from the end time. For information about using offsets for scheduling monitoring jobs, see [Schedule Model Quality Monitoring Jobs](https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-model-quality-schedule.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-endpointinput.html#cfn-sagemaker-modelqualityjobdefinition-endpointinput-endtimeoffset
         */
        readonly endTimeOffset?: string;
        /**
         * An endpoint in customer's account which has enabled `DataCaptureConfig` enabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-endpointinput.html#cfn-sagemaker-modelqualityjobdefinition-endpointinput-endpointname
         */
        readonly endpointName: string;
        /**
         * The attribute of the input data that represents the ground truth label.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-endpointinput.html#cfn-sagemaker-modelqualityjobdefinition-endpointinput-inferenceattribute
         */
        readonly inferenceAttribute?: string;
        /**
         * Path to the filesystem where the endpoint data is available to the container.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-endpointinput.html#cfn-sagemaker-modelqualityjobdefinition-endpointinput-localpath
         */
        readonly localPath: string;
        /**
         * In a classification problem, the attribute that represents the class probability.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-endpointinput.html#cfn-sagemaker-modelqualityjobdefinition-endpointinput-probabilityattribute
         */
        readonly probabilityAttribute?: string;
        /**
         * The threshold for the class probability to be evaluated as a positive result.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-endpointinput.html#cfn-sagemaker-modelqualityjobdefinition-endpointinput-probabilitythresholdattribute
         */
        readonly probabilityThresholdAttribute?: number;
        /**
         * Whether input data distributed in Amazon S3 is fully replicated or sharded by an S3 key. Defaults to `FullyReplicated`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-endpointinput.html#cfn-sagemaker-modelqualityjobdefinition-endpointinput-s3datadistributiontype
         */
        readonly s3DataDistributionType?: string;
        /**
         * Whether the `Pipe` or `File` is used as the input mode for transferring data for the monitoring job. `Pipe` mode is recommended for large datasets. `File` mode is useful for small files that fit in memory. Defaults to `File` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-endpointinput.html#cfn-sagemaker-modelqualityjobdefinition-endpointinput-s3inputmode
         */
        readonly s3InputMode?: string;
        /**
         * If specified, monitoring jobs substract this time from the start time. For information about using offsets for scheduling monitoring jobs, see [Schedule Model Quality Monitoring Jobs](https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-model-quality-schedule.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-endpointinput.html#cfn-sagemaker-modelqualityjobdefinition-endpointinput-starttimeoffset
         */
        readonly startTimeOffset?: string;
    }
}

/**
 * Determine whether the given properties match those of a `EndpointInputProperty`
 *
 * @param properties - the TypeScript properties of a `EndpointInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinition_EndpointInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endTimeOffset', cdk.validateString)(properties.endTimeOffset));
    errors.collect(cdk.propertyValidator('endpointName', cdk.requiredValidator)(properties.endpointName));
    errors.collect(cdk.propertyValidator('endpointName', cdk.validateString)(properties.endpointName));
    errors.collect(cdk.propertyValidator('inferenceAttribute', cdk.validateString)(properties.inferenceAttribute));
    errors.collect(cdk.propertyValidator('localPath', cdk.requiredValidator)(properties.localPath));
    errors.collect(cdk.propertyValidator('localPath', cdk.validateString)(properties.localPath));
    errors.collect(cdk.propertyValidator('probabilityAttribute', cdk.validateString)(properties.probabilityAttribute));
    errors.collect(cdk.propertyValidator('probabilityThresholdAttribute', cdk.validateNumber)(properties.probabilityThresholdAttribute));
    errors.collect(cdk.propertyValidator('s3DataDistributionType', cdk.validateString)(properties.s3DataDistributionType));
    errors.collect(cdk.propertyValidator('s3InputMode', cdk.validateString)(properties.s3InputMode));
    errors.collect(cdk.propertyValidator('startTimeOffset', cdk.validateString)(properties.startTimeOffset));
    return errors.wrap('supplied properties not correct for "EndpointInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.EndpointInput` resource
 *
 * @param properties - the TypeScript properties of a `EndpointInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.EndpointInput` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionEndpointInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinition_EndpointInputPropertyValidator(properties).assertSuccess();
    return {
        EndTimeOffset: cdk.stringToCloudFormation(properties.endTimeOffset),
        EndpointName: cdk.stringToCloudFormation(properties.endpointName),
        InferenceAttribute: cdk.stringToCloudFormation(properties.inferenceAttribute),
        LocalPath: cdk.stringToCloudFormation(properties.localPath),
        ProbabilityAttribute: cdk.stringToCloudFormation(properties.probabilityAttribute),
        ProbabilityThresholdAttribute: cdk.numberToCloudFormation(properties.probabilityThresholdAttribute),
        S3DataDistributionType: cdk.stringToCloudFormation(properties.s3DataDistributionType),
        S3InputMode: cdk.stringToCloudFormation(properties.s3InputMode),
        StartTimeOffset: cdk.stringToCloudFormation(properties.startTimeOffset),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionEndpointInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinition.EndpointInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinition.EndpointInputProperty>();
    ret.addPropertyResult('endTimeOffset', 'EndTimeOffset', properties.EndTimeOffset != null ? cfn_parse.FromCloudFormation.getString(properties.EndTimeOffset) : undefined);
    ret.addPropertyResult('endpointName', 'EndpointName', cfn_parse.FromCloudFormation.getString(properties.EndpointName));
    ret.addPropertyResult('inferenceAttribute', 'InferenceAttribute', properties.InferenceAttribute != null ? cfn_parse.FromCloudFormation.getString(properties.InferenceAttribute) : undefined);
    ret.addPropertyResult('localPath', 'LocalPath', cfn_parse.FromCloudFormation.getString(properties.LocalPath));
    ret.addPropertyResult('probabilityAttribute', 'ProbabilityAttribute', properties.ProbabilityAttribute != null ? cfn_parse.FromCloudFormation.getString(properties.ProbabilityAttribute) : undefined);
    ret.addPropertyResult('probabilityThresholdAttribute', 'ProbabilityThresholdAttribute', properties.ProbabilityThresholdAttribute != null ? cfn_parse.FromCloudFormation.getNumber(properties.ProbabilityThresholdAttribute) : undefined);
    ret.addPropertyResult('s3DataDistributionType', 'S3DataDistributionType', properties.S3DataDistributionType != null ? cfn_parse.FromCloudFormation.getString(properties.S3DataDistributionType) : undefined);
    ret.addPropertyResult('s3InputMode', 'S3InputMode', properties.S3InputMode != null ? cfn_parse.FromCloudFormation.getString(properties.S3InputMode) : undefined);
    ret.addPropertyResult('startTimeOffset', 'StartTimeOffset', properties.StartTimeOffset != null ? cfn_parse.FromCloudFormation.getString(properties.StartTimeOffset) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelQualityJobDefinition {
    /**
     * Container image configuration object for the monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-modelqualityappspecification.html
     */
    export interface ModelQualityAppSpecificationProperty {
        /**
         * An array of arguments for the container used to run the monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-modelqualityappspecification.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityappspecification-containerarguments
         */
        readonly containerArguments?: string[];
        /**
         * Specifies the entrypoint for a container that the monitoring job runs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-modelqualityappspecification.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityappspecification-containerentrypoint
         */
        readonly containerEntrypoint?: string[];
        /**
         * Sets the environment variables in the container that the monitoring job runs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-modelqualityappspecification.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityappspecification-environment
         */
        readonly environment?: { [key: string]: (string) } | cdk.IResolvable;
        /**
         * The address of the container image that the monitoring job runs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-modelqualityappspecification.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityappspecification-imageuri
         */
        readonly imageUri: string;
        /**
         * An Amazon S3 URI to a script that is called after analysis has been performed. Applicable only for the built-in (first party) containers.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-modelqualityappspecification.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityappspecification-postanalyticsprocessorsourceuri
         */
        readonly postAnalyticsProcessorSourceUri?: string;
        /**
         * The machine learning problem type of the model that the monitoring job monitors.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-modelqualityappspecification.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityappspecification-problemtype
         */
        readonly problemType: string;
        /**
         * An Amazon S3 URI to a script that is called per row prior to running analysis. It can base64 decode the payload and convert it into a flatted json so that the built-in container can use the converted data. Applicable only for the built-in (first party) containers.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-modelqualityappspecification.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityappspecification-recordpreprocessorsourceuri
         */
        readonly recordPreprocessorSourceUri?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ModelQualityAppSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `ModelQualityAppSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinition_ModelQualityAppSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('containerArguments', cdk.listValidator(cdk.validateString))(properties.containerArguments));
    errors.collect(cdk.propertyValidator('containerEntrypoint', cdk.listValidator(cdk.validateString))(properties.containerEntrypoint));
    errors.collect(cdk.propertyValidator('environment', cdk.hashValidator(cdk.validateString))(properties.environment));
    errors.collect(cdk.propertyValidator('imageUri', cdk.requiredValidator)(properties.imageUri));
    errors.collect(cdk.propertyValidator('imageUri', cdk.validateString)(properties.imageUri));
    errors.collect(cdk.propertyValidator('postAnalyticsProcessorSourceUri', cdk.validateString)(properties.postAnalyticsProcessorSourceUri));
    errors.collect(cdk.propertyValidator('problemType', cdk.requiredValidator)(properties.problemType));
    errors.collect(cdk.propertyValidator('problemType', cdk.validateString)(properties.problemType));
    errors.collect(cdk.propertyValidator('recordPreprocessorSourceUri', cdk.validateString)(properties.recordPreprocessorSourceUri));
    return errors.wrap('supplied properties not correct for "ModelQualityAppSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.ModelQualityAppSpecification` resource
 *
 * @param properties - the TypeScript properties of a `ModelQualityAppSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.ModelQualityAppSpecification` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionModelQualityAppSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinition_ModelQualityAppSpecificationPropertyValidator(properties).assertSuccess();
    return {
        ContainerArguments: cdk.listMapper(cdk.stringToCloudFormation)(properties.containerArguments),
        ContainerEntrypoint: cdk.listMapper(cdk.stringToCloudFormation)(properties.containerEntrypoint),
        Environment: cdk.hashMapper(cdk.stringToCloudFormation)(properties.environment),
        ImageUri: cdk.stringToCloudFormation(properties.imageUri),
        PostAnalyticsProcessorSourceUri: cdk.stringToCloudFormation(properties.postAnalyticsProcessorSourceUri),
        ProblemType: cdk.stringToCloudFormation(properties.problemType),
        RecordPreprocessorSourceUri: cdk.stringToCloudFormation(properties.recordPreprocessorSourceUri),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionModelQualityAppSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinition.ModelQualityAppSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinition.ModelQualityAppSpecificationProperty>();
    ret.addPropertyResult('containerArguments', 'ContainerArguments', properties.ContainerArguments != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ContainerArguments) : undefined);
    ret.addPropertyResult('containerEntrypoint', 'ContainerEntrypoint', properties.ContainerEntrypoint != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ContainerEntrypoint) : undefined);
    ret.addPropertyResult('environment', 'Environment', properties.Environment != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Environment) : undefined);
    ret.addPropertyResult('imageUri', 'ImageUri', cfn_parse.FromCloudFormation.getString(properties.ImageUri));
    ret.addPropertyResult('postAnalyticsProcessorSourceUri', 'PostAnalyticsProcessorSourceUri', properties.PostAnalyticsProcessorSourceUri != null ? cfn_parse.FromCloudFormation.getString(properties.PostAnalyticsProcessorSourceUri) : undefined);
    ret.addPropertyResult('problemType', 'ProblemType', cfn_parse.FromCloudFormation.getString(properties.ProblemType));
    ret.addPropertyResult('recordPreprocessorSourceUri', 'RecordPreprocessorSourceUri', properties.RecordPreprocessorSourceUri != null ? cfn_parse.FromCloudFormation.getString(properties.RecordPreprocessorSourceUri) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelQualityJobDefinition {
    /**
     * Configuration for monitoring constraints and monitoring statistics. These baseline resources are compared against the results of the current job from the series of jobs scheduled to collect data periodically.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-modelqualitybaselineconfig.html
     */
    export interface ModelQualityBaselineConfigProperty {
        /**
         * The name of the job that performs baselining for the monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-modelqualitybaselineconfig.html#cfn-sagemaker-modelqualityjobdefinition-modelqualitybaselineconfig-baseliningjobname
         */
        readonly baseliningJobName?: string;
        /**
         * The constraints resource for a monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-modelqualitybaselineconfig.html#cfn-sagemaker-modelqualityjobdefinition-modelqualitybaselineconfig-constraintsresource
         */
        readonly constraintsResource?: CfnModelQualityJobDefinition.ConstraintsResourceProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ModelQualityBaselineConfigProperty`
 *
 * @param properties - the TypeScript properties of a `ModelQualityBaselineConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinition_ModelQualityBaselineConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('baseliningJobName', cdk.validateString)(properties.baseliningJobName));
    errors.collect(cdk.propertyValidator('constraintsResource', CfnModelQualityJobDefinition_ConstraintsResourcePropertyValidator)(properties.constraintsResource));
    return errors.wrap('supplied properties not correct for "ModelQualityBaselineConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.ModelQualityBaselineConfig` resource
 *
 * @param properties - the TypeScript properties of a `ModelQualityBaselineConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.ModelQualityBaselineConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionModelQualityBaselineConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinition_ModelQualityBaselineConfigPropertyValidator(properties).assertSuccess();
    return {
        BaseliningJobName: cdk.stringToCloudFormation(properties.baseliningJobName),
        ConstraintsResource: cfnModelQualityJobDefinitionConstraintsResourcePropertyToCloudFormation(properties.constraintsResource),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionModelQualityBaselineConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinition.ModelQualityBaselineConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinition.ModelQualityBaselineConfigProperty>();
    ret.addPropertyResult('baseliningJobName', 'BaseliningJobName', properties.BaseliningJobName != null ? cfn_parse.FromCloudFormation.getString(properties.BaseliningJobName) : undefined);
    ret.addPropertyResult('constraintsResource', 'ConstraintsResource', properties.ConstraintsResource != null ? CfnModelQualityJobDefinitionConstraintsResourcePropertyFromCloudFormation(properties.ConstraintsResource) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelQualityJobDefinition {
    /**
     * The input for the model quality monitoring job. Currently endponts are supported for input for model quality monitoring jobs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-modelqualityjobinput.html
     */
    export interface ModelQualityJobInputProperty {
        /**
         * Input object for the endpoint
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-modelqualityjobinput.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityjobinput-endpointinput
         */
        readonly endpointInput: CfnModelQualityJobDefinition.EndpointInputProperty | cdk.IResolvable;
        /**
         * The ground truth label provided for the model.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-modelqualityjobinput.html#cfn-sagemaker-modelqualityjobdefinition-modelqualityjobinput-groundtruths3input
         */
        readonly groundTruthS3Input: CfnModelQualityJobDefinition.MonitoringGroundTruthS3InputProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ModelQualityJobInputProperty`
 *
 * @param properties - the TypeScript properties of a `ModelQualityJobInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinition_ModelQualityJobInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endpointInput', cdk.requiredValidator)(properties.endpointInput));
    errors.collect(cdk.propertyValidator('endpointInput', CfnModelQualityJobDefinition_EndpointInputPropertyValidator)(properties.endpointInput));
    errors.collect(cdk.propertyValidator('groundTruthS3Input', cdk.requiredValidator)(properties.groundTruthS3Input));
    errors.collect(cdk.propertyValidator('groundTruthS3Input', CfnModelQualityJobDefinition_MonitoringGroundTruthS3InputPropertyValidator)(properties.groundTruthS3Input));
    return errors.wrap('supplied properties not correct for "ModelQualityJobInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.ModelQualityJobInput` resource
 *
 * @param properties - the TypeScript properties of a `ModelQualityJobInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.ModelQualityJobInput` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionModelQualityJobInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinition_ModelQualityJobInputPropertyValidator(properties).assertSuccess();
    return {
        EndpointInput: cfnModelQualityJobDefinitionEndpointInputPropertyToCloudFormation(properties.endpointInput),
        GroundTruthS3Input: cfnModelQualityJobDefinitionMonitoringGroundTruthS3InputPropertyToCloudFormation(properties.groundTruthS3Input),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionModelQualityJobInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinition.ModelQualityJobInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinition.ModelQualityJobInputProperty>();
    ret.addPropertyResult('endpointInput', 'EndpointInput', CfnModelQualityJobDefinitionEndpointInputPropertyFromCloudFormation(properties.EndpointInput));
    ret.addPropertyResult('groundTruthS3Input', 'GroundTruthS3Input', CfnModelQualityJobDefinitionMonitoringGroundTruthS3InputPropertyFromCloudFormation(properties.GroundTruthS3Input));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelQualityJobDefinition {
    /**
     * The ground truth labels for the dataset used for the monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-monitoringgroundtruths3input.html
     */
    export interface MonitoringGroundTruthS3InputProperty {
        /**
         * The address of the Amazon S3 location of the ground truth labels.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-monitoringgroundtruths3input.html#cfn-sagemaker-modelqualityjobdefinition-monitoringgroundtruths3input-s3uri
         */
        readonly s3Uri: string;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringGroundTruthS3InputProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringGroundTruthS3InputProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinition_MonitoringGroundTruthS3InputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Uri', cdk.requiredValidator)(properties.s3Uri));
    errors.collect(cdk.propertyValidator('s3Uri', cdk.validateString)(properties.s3Uri));
    return errors.wrap('supplied properties not correct for "MonitoringGroundTruthS3InputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.MonitoringGroundTruthS3Input` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringGroundTruthS3InputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.MonitoringGroundTruthS3Input` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionMonitoringGroundTruthS3InputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinition_MonitoringGroundTruthS3InputPropertyValidator(properties).assertSuccess();
    return {
        S3Uri: cdk.stringToCloudFormation(properties.s3Uri),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionMonitoringGroundTruthS3InputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinition.MonitoringGroundTruthS3InputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinition.MonitoringGroundTruthS3InputProperty>();
    ret.addPropertyResult('s3Uri', 'S3Uri', cfn_parse.FromCloudFormation.getString(properties.S3Uri));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelQualityJobDefinition {
    /**
     * The output object for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-monitoringoutput.html
     */
    export interface MonitoringOutputProperty {
        /**
         * The Amazon S3 storage location where the results of a monitoring job are saved.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-monitoringoutput.html#cfn-sagemaker-modelqualityjobdefinition-monitoringoutput-s3output
         */
        readonly s3Output: CfnModelQualityJobDefinition.S3OutputProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringOutputProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinition_MonitoringOutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Output', cdk.requiredValidator)(properties.s3Output));
    errors.collect(cdk.propertyValidator('s3Output', CfnModelQualityJobDefinition_S3OutputPropertyValidator)(properties.s3Output));
    return errors.wrap('supplied properties not correct for "MonitoringOutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.MonitoringOutput` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.MonitoringOutput` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionMonitoringOutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinition_MonitoringOutputPropertyValidator(properties).assertSuccess();
    return {
        S3Output: cfnModelQualityJobDefinitionS3OutputPropertyToCloudFormation(properties.s3Output),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionMonitoringOutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinition.MonitoringOutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinition.MonitoringOutputProperty>();
    ret.addPropertyResult('s3Output', 'S3Output', CfnModelQualityJobDefinitionS3OutputPropertyFromCloudFormation(properties.S3Output));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelQualityJobDefinition {
    /**
     * The output configuration for monitoring jobs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-monitoringoutputconfig.html
     */
    export interface MonitoringOutputConfigProperty {
        /**
         * The AWS Key Management Service ( AWS KMS) key that Amazon SageMaker uses to encrypt the model artifacts at rest using Amazon S3 server-side encryption.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-monitoringoutputconfig.html#cfn-sagemaker-modelqualityjobdefinition-monitoringoutputconfig-kmskeyid
         */
        readonly kmsKeyId?: string;
        /**
         * Monitoring outputs for monitoring jobs. This is where the output of the periodic monitoring jobs is uploaded.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-monitoringoutputconfig.html#cfn-sagemaker-modelqualityjobdefinition-monitoringoutputconfig-monitoringoutputs
         */
        readonly monitoringOutputs: Array<CfnModelQualityJobDefinition.MonitoringOutputProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringOutputConfigProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinition_MonitoringOutputConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('monitoringOutputs', cdk.requiredValidator)(properties.monitoringOutputs));
    errors.collect(cdk.propertyValidator('monitoringOutputs', cdk.listValidator(CfnModelQualityJobDefinition_MonitoringOutputPropertyValidator))(properties.monitoringOutputs));
    return errors.wrap('supplied properties not correct for "MonitoringOutputConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.MonitoringOutputConfig` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.MonitoringOutputConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionMonitoringOutputConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinition_MonitoringOutputConfigPropertyValidator(properties).assertSuccess();
    return {
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        MonitoringOutputs: cdk.listMapper(cfnModelQualityJobDefinitionMonitoringOutputPropertyToCloudFormation)(properties.monitoringOutputs),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionMonitoringOutputConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinition.MonitoringOutputConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinition.MonitoringOutputConfigProperty>();
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('monitoringOutputs', 'MonitoringOutputs', cfn_parse.FromCloudFormation.getArray(CfnModelQualityJobDefinitionMonitoringOutputPropertyFromCloudFormation)(properties.MonitoringOutputs));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelQualityJobDefinition {
    /**
     * Identifies the resources to deploy for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-monitoringresources.html
     */
    export interface MonitoringResourcesProperty {
        /**
         * The configuration for the cluster resources used to run the processing job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-monitoringresources.html#cfn-sagemaker-modelqualityjobdefinition-monitoringresources-clusterconfig
         */
        readonly clusterConfig: CfnModelQualityJobDefinition.ClusterConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringResourcesProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringResourcesProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinition_MonitoringResourcesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clusterConfig', cdk.requiredValidator)(properties.clusterConfig));
    errors.collect(cdk.propertyValidator('clusterConfig', CfnModelQualityJobDefinition_ClusterConfigPropertyValidator)(properties.clusterConfig));
    return errors.wrap('supplied properties not correct for "MonitoringResourcesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.MonitoringResources` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringResourcesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.MonitoringResources` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionMonitoringResourcesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinition_MonitoringResourcesPropertyValidator(properties).assertSuccess();
    return {
        ClusterConfig: cfnModelQualityJobDefinitionClusterConfigPropertyToCloudFormation(properties.clusterConfig),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionMonitoringResourcesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinition.MonitoringResourcesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinition.MonitoringResourcesProperty>();
    ret.addPropertyResult('clusterConfig', 'ClusterConfig', CfnModelQualityJobDefinitionClusterConfigPropertyFromCloudFormation(properties.ClusterConfig));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelQualityJobDefinition {
    /**
     * Networking options for a job, such as network traffic encryption between containers, whether to allow inbound and outbound network calls to and from containers, and the VPC subnets and security groups to use for VPC-enabled jobs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-networkconfig.html
     */
    export interface NetworkConfigProperty {
        /**
         * Whether to encrypt all communications between distributed processing jobs. Choose `True` to encrypt communications. Encryption provides greater security for distributed processing jobs, but the processing might take longer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-networkconfig.html#cfn-sagemaker-modelqualityjobdefinition-networkconfig-enableintercontainertrafficencryption
         */
        readonly enableInterContainerTrafficEncryption?: boolean | cdk.IResolvable;
        /**
         * Whether to allow inbound and outbound network calls to and from the containers used for the processing job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-networkconfig.html#cfn-sagemaker-modelqualityjobdefinition-networkconfig-enablenetworkisolation
         */
        readonly enableNetworkIsolation?: boolean | cdk.IResolvable;
        /**
         * Specifies a VPC that your training jobs and hosted models have access to. Control access to and from your training and model containers by configuring the VPC.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-networkconfig.html#cfn-sagemaker-modelqualityjobdefinition-networkconfig-vpcconfig
         */
        readonly vpcConfig?: CfnModelQualityJobDefinition.VpcConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `NetworkConfigProperty`
 *
 * @param properties - the TypeScript properties of a `NetworkConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinition_NetworkConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enableInterContainerTrafficEncryption', cdk.validateBoolean)(properties.enableInterContainerTrafficEncryption));
    errors.collect(cdk.propertyValidator('enableNetworkIsolation', cdk.validateBoolean)(properties.enableNetworkIsolation));
    errors.collect(cdk.propertyValidator('vpcConfig', CfnModelQualityJobDefinition_VpcConfigPropertyValidator)(properties.vpcConfig));
    return errors.wrap('supplied properties not correct for "NetworkConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.NetworkConfig` resource
 *
 * @param properties - the TypeScript properties of a `NetworkConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.NetworkConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionNetworkConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinition_NetworkConfigPropertyValidator(properties).assertSuccess();
    return {
        EnableInterContainerTrafficEncryption: cdk.booleanToCloudFormation(properties.enableInterContainerTrafficEncryption),
        EnableNetworkIsolation: cdk.booleanToCloudFormation(properties.enableNetworkIsolation),
        VpcConfig: cfnModelQualityJobDefinitionVpcConfigPropertyToCloudFormation(properties.vpcConfig),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionNetworkConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinition.NetworkConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinition.NetworkConfigProperty>();
    ret.addPropertyResult('enableInterContainerTrafficEncryption', 'EnableInterContainerTrafficEncryption', properties.EnableInterContainerTrafficEncryption != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableInterContainerTrafficEncryption) : undefined);
    ret.addPropertyResult('enableNetworkIsolation', 'EnableNetworkIsolation', properties.EnableNetworkIsolation != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableNetworkIsolation) : undefined);
    ret.addPropertyResult('vpcConfig', 'VpcConfig', properties.VpcConfig != null ? CfnModelQualityJobDefinitionVpcConfigPropertyFromCloudFormation(properties.VpcConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelQualityJobDefinition {
    /**
     * The Amazon S3 storage location where the results of a monitoring job are saved.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-s3output.html
     */
    export interface S3OutputProperty {
        /**
         * The local path to the Amazon S3 storage location where Amazon SageMaker saves the results of a monitoring job. LocalPath is an absolute path for the output data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-s3output.html#cfn-sagemaker-modelqualityjobdefinition-s3output-localpath
         */
        readonly localPath: string;
        /**
         * Whether to upload the results of the monitoring job continuously or after the job completes.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-s3output.html#cfn-sagemaker-modelqualityjobdefinition-s3output-s3uploadmode
         */
        readonly s3UploadMode?: string;
        /**
         * A URI that identifies the Amazon S3 storage location where Amazon SageMaker saves the results of a monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-s3output.html#cfn-sagemaker-modelqualityjobdefinition-s3output-s3uri
         */
        readonly s3Uri: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3OutputProperty`
 *
 * @param properties - the TypeScript properties of a `S3OutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinition_S3OutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('localPath', cdk.requiredValidator)(properties.localPath));
    errors.collect(cdk.propertyValidator('localPath', cdk.validateString)(properties.localPath));
    errors.collect(cdk.propertyValidator('s3UploadMode', cdk.validateString)(properties.s3UploadMode));
    errors.collect(cdk.propertyValidator('s3Uri', cdk.requiredValidator)(properties.s3Uri));
    errors.collect(cdk.propertyValidator('s3Uri', cdk.validateString)(properties.s3Uri));
    return errors.wrap('supplied properties not correct for "S3OutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.S3Output` resource
 *
 * @param properties - the TypeScript properties of a `S3OutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.S3Output` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionS3OutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinition_S3OutputPropertyValidator(properties).assertSuccess();
    return {
        LocalPath: cdk.stringToCloudFormation(properties.localPath),
        S3UploadMode: cdk.stringToCloudFormation(properties.s3UploadMode),
        S3Uri: cdk.stringToCloudFormation(properties.s3Uri),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionS3OutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinition.S3OutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinition.S3OutputProperty>();
    ret.addPropertyResult('localPath', 'LocalPath', cfn_parse.FromCloudFormation.getString(properties.LocalPath));
    ret.addPropertyResult('s3UploadMode', 'S3UploadMode', properties.S3UploadMode != null ? cfn_parse.FromCloudFormation.getString(properties.S3UploadMode) : undefined);
    ret.addPropertyResult('s3Uri', 'S3Uri', cfn_parse.FromCloudFormation.getString(properties.S3Uri));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelQualityJobDefinition {
    /**
     * Specifies a limit to how long a model training job or model compilation job can run. It also specifies how long a managed spot training job has to complete. When the job reaches the time limit, SageMaker ends the training or compilation job. Use this API to cap model training costs.
     *
     * To stop a training job, SageMaker sends the algorithm the `SIGTERM` signal, which delays job termination for 120 seconds. Algorithms can use this 120-second window to save the model artifacts, so the results of training are not lost.
     *
     * The training algorithms provided by SageMaker automatically save the intermediate results of a model training job when possible. This attempt to save artifacts is only a best effort case as model might not be in a state from which it can be saved. For example, if training has just started, the model might not be ready to save. When saved, this intermediate data is a valid model artifact. You can use it to create a model with `CreateModel` .
     *
     * > The Neural Topic Model (NTM) currently does not support saving intermediate model artifacts. When training NTMs, make sure that the maximum runtime is sufficient for the training job to complete.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-stoppingcondition.html
     */
    export interface StoppingConditionProperty {
        /**
         * The maximum length of time, in seconds, that a training or compilation job can run.
         *
         * For compilation jobs, if the job does not complete during this time, a `TimeOut` error is generated. We recommend starting with 900 seconds and increasing as necessary based on your model.
         *
         * For all other jobs, if the job does not complete during this time, SageMaker ends the job. When `RetryStrategy` is specified in the job request, `MaxRuntimeInSeconds` specifies the maximum time for all of the attempts in total, not each individual attempt. The default value is 1 day. The maximum value is 28 days.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-stoppingcondition.html#cfn-sagemaker-modelqualityjobdefinition-stoppingcondition-maxruntimeinseconds
         */
        readonly maxRuntimeInSeconds: number;
    }
}

/**
 * Determine whether the given properties match those of a `StoppingConditionProperty`
 *
 * @param properties - the TypeScript properties of a `StoppingConditionProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinition_StoppingConditionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('maxRuntimeInSeconds', cdk.requiredValidator)(properties.maxRuntimeInSeconds));
    errors.collect(cdk.propertyValidator('maxRuntimeInSeconds', cdk.validateNumber)(properties.maxRuntimeInSeconds));
    return errors.wrap('supplied properties not correct for "StoppingConditionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.StoppingCondition` resource
 *
 * @param properties - the TypeScript properties of a `StoppingConditionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.StoppingCondition` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionStoppingConditionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinition_StoppingConditionPropertyValidator(properties).assertSuccess();
    return {
        MaxRuntimeInSeconds: cdk.numberToCloudFormation(properties.maxRuntimeInSeconds),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionStoppingConditionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinition.StoppingConditionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinition.StoppingConditionProperty>();
    ret.addPropertyResult('maxRuntimeInSeconds', 'MaxRuntimeInSeconds', cfn_parse.FromCloudFormation.getNumber(properties.MaxRuntimeInSeconds));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnModelQualityJobDefinition {
    /**
     * Specifies a VPC that your training jobs and hosted models have access to. Control access to and from your training and model containers by configuring the VPC. For more information, see [Protect Endpoints by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/host-vpc.html) and [Protect Training Jobs by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/train-vpc.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-vpcconfig.html
     */
    export interface VpcConfigProperty {
        /**
         * The VPC security group IDs, in the form sg-xxxxxxxx. Specify the security groups for the VPC that is specified in the `Subnets` field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-vpcconfig.html#cfn-sagemaker-modelqualityjobdefinition-vpcconfig-securitygroupids
         */
        readonly securityGroupIds: string[];
        /**
         * The ID of the subnets in the VPC to which you want to connect your training job or model. For information about the availability of specific instance types, see [Supported Instance Types and Availability Zones](https://docs.aws.amazon.com/sagemaker/latest/dg/instance-types-az.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-modelqualityjobdefinition-vpcconfig.html#cfn-sagemaker-modelqualityjobdefinition-vpcconfig-subnets
         */
        readonly subnets: string[];
    }
}

/**
 * Determine whether the given properties match those of a `VpcConfigProperty`
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnModelQualityJobDefinition_VpcConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.requiredValidator)(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('subnets', cdk.requiredValidator)(properties.subnets));
    errors.collect(cdk.propertyValidator('subnets', cdk.listValidator(cdk.validateString))(properties.subnets));
    return errors.wrap('supplied properties not correct for "VpcConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.VpcConfig` resource
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::ModelQualityJobDefinition.VpcConfig` resource.
 */
// @ts-ignore TS6133
function cfnModelQualityJobDefinitionVpcConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelQualityJobDefinition_VpcConfigPropertyValidator(properties).assertSuccess();
    return {
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        Subnets: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnets),
    };
}

// @ts-ignore TS6133
function CfnModelQualityJobDefinitionVpcConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelQualityJobDefinition.VpcConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelQualityJobDefinition.VpcConfigProperty>();
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds));
    ret.addPropertyResult('subnets', 'Subnets', cfn_parse.FromCloudFormation.getStringArray(properties.Subnets));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnMonitoringSchedule`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html
 */
export interface CfnMonitoringScheduleProps {

    /**
     * The configuration object that specifies the monitoring schedule and defines the monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html#cfn-sagemaker-monitoringschedule-monitoringscheduleconfig
     */
    readonly monitoringScheduleConfig: CfnMonitoringSchedule.MonitoringScheduleConfigProperty | cdk.IResolvable;

    /**
     * The name of the monitoring schedule.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html#cfn-sagemaker-monitoringschedule-monitoringschedulename
     */
    readonly monitoringScheduleName: string;

    /**
     * The name of the endpoint using the monitoring schedule.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html#cfn-sagemaker-monitoringschedule-endpointname
     */
    readonly endpointName?: string;

    /**
     * Contains the reason a monitoring job failed, if it failed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html#cfn-sagemaker-monitoringschedule-failurereason
     */
    readonly failureReason?: string;

    /**
     * Describes metadata on the last execution to run, if there was one.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html#cfn-sagemaker-monitoringschedule-lastmonitoringexecutionsummary
     */
    readonly lastMonitoringExecutionSummary?: CfnMonitoringSchedule.MonitoringExecutionSummaryProperty | cdk.IResolvable;

    /**
     * The status of the monitoring schedule.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html#cfn-sagemaker-monitoringschedule-monitoringschedulestatus
     */
    readonly monitoringScheduleStatus?: string;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html#cfn-sagemaker-monitoringschedule-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnMonitoringScheduleProps`
 *
 * @param properties - the TypeScript properties of a `CfnMonitoringScheduleProps`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedulePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endpointName', cdk.validateString)(properties.endpointName));
    errors.collect(cdk.propertyValidator('failureReason', cdk.validateString)(properties.failureReason));
    errors.collect(cdk.propertyValidator('lastMonitoringExecutionSummary', CfnMonitoringSchedule_MonitoringExecutionSummaryPropertyValidator)(properties.lastMonitoringExecutionSummary));
    errors.collect(cdk.propertyValidator('monitoringScheduleConfig', cdk.requiredValidator)(properties.monitoringScheduleConfig));
    errors.collect(cdk.propertyValidator('monitoringScheduleConfig', CfnMonitoringSchedule_MonitoringScheduleConfigPropertyValidator)(properties.monitoringScheduleConfig));
    errors.collect(cdk.propertyValidator('monitoringScheduleName', cdk.requiredValidator)(properties.monitoringScheduleName));
    errors.collect(cdk.propertyValidator('monitoringScheduleName', cdk.validateString)(properties.monitoringScheduleName));
    errors.collect(cdk.propertyValidator('monitoringScheduleStatus', cdk.validateString)(properties.monitoringScheduleStatus));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnMonitoringScheduleProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule` resource
 *
 * @param properties - the TypeScript properties of a `CfnMonitoringScheduleProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringSchedulePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedulePropsValidator(properties).assertSuccess();
    return {
        MonitoringScheduleConfig: cfnMonitoringScheduleMonitoringScheduleConfigPropertyToCloudFormation(properties.monitoringScheduleConfig),
        MonitoringScheduleName: cdk.stringToCloudFormation(properties.monitoringScheduleName),
        EndpointName: cdk.stringToCloudFormation(properties.endpointName),
        FailureReason: cdk.stringToCloudFormation(properties.failureReason),
        LastMonitoringExecutionSummary: cfnMonitoringScheduleMonitoringExecutionSummaryPropertyToCloudFormation(properties.lastMonitoringExecutionSummary),
        MonitoringScheduleStatus: cdk.stringToCloudFormation(properties.monitoringScheduleStatus),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnMonitoringSchedulePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringScheduleProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringScheduleProps>();
    ret.addPropertyResult('monitoringScheduleConfig', 'MonitoringScheduleConfig', CfnMonitoringScheduleMonitoringScheduleConfigPropertyFromCloudFormation(properties.MonitoringScheduleConfig));
    ret.addPropertyResult('monitoringScheduleName', 'MonitoringScheduleName', cfn_parse.FromCloudFormation.getString(properties.MonitoringScheduleName));
    ret.addPropertyResult('endpointName', 'EndpointName', properties.EndpointName != null ? cfn_parse.FromCloudFormation.getString(properties.EndpointName) : undefined);
    ret.addPropertyResult('failureReason', 'FailureReason', properties.FailureReason != null ? cfn_parse.FromCloudFormation.getString(properties.FailureReason) : undefined);
    ret.addPropertyResult('lastMonitoringExecutionSummary', 'LastMonitoringExecutionSummary', properties.LastMonitoringExecutionSummary != null ? CfnMonitoringScheduleMonitoringExecutionSummaryPropertyFromCloudFormation(properties.LastMonitoringExecutionSummary) : undefined);
    ret.addPropertyResult('monitoringScheduleStatus', 'MonitoringScheduleStatus', properties.MonitoringScheduleStatus != null ? cfn_parse.FromCloudFormation.getString(properties.MonitoringScheduleStatus) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::MonitoringSchedule`
 *
 * The `AWS::SageMaker::MonitoringSchedule` resource is an Amazon SageMaker resource type that regularly starts SageMaker processing Jobs to monitor the data captured for a SageMaker endpoint.
 *
 * @cloudformationResource AWS::SageMaker::MonitoringSchedule
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html
 */
export class CfnMonitoringSchedule extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::MonitoringSchedule";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnMonitoringSchedule {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnMonitoringSchedulePropsFromCloudFormation(resourceProperties);
        const ret = new CfnMonitoringSchedule(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The time when the monitoring schedule was created.
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: string;

    /**
     * The last time that the monitoring schedule was modified.
     * @cloudformationAttribute LastModifiedTime
     */
    public readonly attrLastModifiedTime: string;

    /**
     * The Amazon Resource Name (ARN) of the monitoring schedule.
     * @cloudformationAttribute MonitoringScheduleArn
     */
    public readonly attrMonitoringScheduleArn: string;

    /**
     * The configuration object that specifies the monitoring schedule and defines the monitoring job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html#cfn-sagemaker-monitoringschedule-monitoringscheduleconfig
     */
    public monitoringScheduleConfig: CfnMonitoringSchedule.MonitoringScheduleConfigProperty | cdk.IResolvable;

    /**
     * The name of the monitoring schedule.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html#cfn-sagemaker-monitoringschedule-monitoringschedulename
     */
    public monitoringScheduleName: string;

    /**
     * The name of the endpoint using the monitoring schedule.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html#cfn-sagemaker-monitoringschedule-endpointname
     */
    public endpointName: string | undefined;

    /**
     * Contains the reason a monitoring job failed, if it failed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html#cfn-sagemaker-monitoringschedule-failurereason
     */
    public failureReason: string | undefined;

    /**
     * Describes metadata on the last execution to run, if there was one.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html#cfn-sagemaker-monitoringschedule-lastmonitoringexecutionsummary
     */
    public lastMonitoringExecutionSummary: CfnMonitoringSchedule.MonitoringExecutionSummaryProperty | cdk.IResolvable | undefined;

    /**
     * The status of the monitoring schedule.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html#cfn-sagemaker-monitoringschedule-monitoringschedulestatus
     */
    public monitoringScheduleStatus: string | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-monitoringschedule.html#cfn-sagemaker-monitoringschedule-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::MonitoringSchedule`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnMonitoringScheduleProps) {
        super(scope, id, { type: CfnMonitoringSchedule.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'monitoringScheduleConfig', this);
        cdk.requireProperty(props, 'monitoringScheduleName', this);
        this.attrCreationTime = cdk.Token.asString(this.getAtt('CreationTime'));
        this.attrLastModifiedTime = cdk.Token.asString(this.getAtt('LastModifiedTime'));
        this.attrMonitoringScheduleArn = cdk.Token.asString(this.getAtt('MonitoringScheduleArn'));

        this.monitoringScheduleConfig = props.monitoringScheduleConfig;
        this.monitoringScheduleName = props.monitoringScheduleName;
        this.endpointName = props.endpointName;
        this.failureReason = props.failureReason;
        this.lastMonitoringExecutionSummary = props.lastMonitoringExecutionSummary;
        this.monitoringScheduleStatus = props.monitoringScheduleStatus;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::MonitoringSchedule", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnMonitoringSchedule.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            monitoringScheduleConfig: this.monitoringScheduleConfig,
            monitoringScheduleName: this.monitoringScheduleName,
            endpointName: this.endpointName,
            failureReason: this.failureReason,
            lastMonitoringExecutionSummary: this.lastMonitoringExecutionSummary,
            monitoringScheduleStatus: this.monitoringScheduleStatus,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnMonitoringSchedulePropsToCloudFormation(props);
    }
}

export namespace CfnMonitoringSchedule {
    /**
     * Baseline configuration used to validate that the data conforms to the specified constraints and statistics.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-baselineconfig.html
     */
    export interface BaselineConfigProperty {
        /**
         * The Amazon S3 URI for the constraints resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-baselineconfig.html#cfn-sagemaker-monitoringschedule-baselineconfig-constraintsresource
         */
        readonly constraintsResource?: CfnMonitoringSchedule.ConstraintsResourceProperty | cdk.IResolvable;
        /**
         * The baseline statistics file in Amazon S3 that the current monitoring job should be validated against.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-baselineconfig.html#cfn-sagemaker-monitoringschedule-baselineconfig-statisticsresource
         */
        readonly statisticsResource?: CfnMonitoringSchedule.StatisticsResourceProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `BaselineConfigProperty`
 *
 * @param properties - the TypeScript properties of a `BaselineConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_BaselineConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('constraintsResource', CfnMonitoringSchedule_ConstraintsResourcePropertyValidator)(properties.constraintsResource));
    errors.collect(cdk.propertyValidator('statisticsResource', CfnMonitoringSchedule_StatisticsResourcePropertyValidator)(properties.statisticsResource));
    return errors.wrap('supplied properties not correct for "BaselineConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.BaselineConfig` resource
 *
 * @param properties - the TypeScript properties of a `BaselineConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.BaselineConfig` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleBaselineConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_BaselineConfigPropertyValidator(properties).assertSuccess();
    return {
        ConstraintsResource: cfnMonitoringScheduleConstraintsResourcePropertyToCloudFormation(properties.constraintsResource),
        StatisticsResource: cfnMonitoringScheduleStatisticsResourcePropertyToCloudFormation(properties.statisticsResource),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleBaselineConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.BaselineConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.BaselineConfigProperty>();
    ret.addPropertyResult('constraintsResource', 'ConstraintsResource', properties.ConstraintsResource != null ? CfnMonitoringScheduleConstraintsResourcePropertyFromCloudFormation(properties.ConstraintsResource) : undefined);
    ret.addPropertyResult('statisticsResource', 'StatisticsResource', properties.StatisticsResource != null ? CfnMonitoringScheduleStatisticsResourcePropertyFromCloudFormation(properties.StatisticsResource) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * Configuration for the cluster used to run model monitoring jobs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-clusterconfig.html
     */
    export interface ClusterConfigProperty {
        /**
         * The number of ML compute instances to use in the model monitoring job. For distributed processing jobs, specify a value greater than 1. The default value is 1.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-clusterconfig.html#cfn-sagemaker-monitoringschedule-clusterconfig-instancecount
         */
        readonly instanceCount: number;
        /**
         * The ML compute instance type for the processing job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-clusterconfig.html#cfn-sagemaker-monitoringschedule-clusterconfig-instancetype
         */
        readonly instanceType: string;
        /**
         * The AWS Key Management Service ( AWS KMS) key that Amazon SageMaker uses to encrypt data on the storage volume attached to the ML compute instance(s) that run the model monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-clusterconfig.html#cfn-sagemaker-monitoringschedule-clusterconfig-volumekmskeyid
         */
        readonly volumeKmsKeyId?: string;
        /**
         * The size of the ML storage volume, in gigabytes, that you want to provision. You must specify sufficient ML storage for your scenario.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-clusterconfig.html#cfn-sagemaker-monitoringschedule-clusterconfig-volumesizeingb
         */
        readonly volumeSizeInGb: number;
    }
}

/**
 * Determine whether the given properties match those of a `ClusterConfigProperty`
 *
 * @param properties - the TypeScript properties of a `ClusterConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_ClusterConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceCount', cdk.requiredValidator)(properties.instanceCount));
    errors.collect(cdk.propertyValidator('instanceCount', cdk.validateNumber)(properties.instanceCount));
    errors.collect(cdk.propertyValidator('instanceType', cdk.requiredValidator)(properties.instanceType));
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('volumeKmsKeyId', cdk.validateString)(properties.volumeKmsKeyId));
    errors.collect(cdk.propertyValidator('volumeSizeInGb', cdk.requiredValidator)(properties.volumeSizeInGb));
    errors.collect(cdk.propertyValidator('volumeSizeInGb', cdk.validateNumber)(properties.volumeSizeInGb));
    return errors.wrap('supplied properties not correct for "ClusterConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.ClusterConfig` resource
 *
 * @param properties - the TypeScript properties of a `ClusterConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.ClusterConfig` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleClusterConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_ClusterConfigPropertyValidator(properties).assertSuccess();
    return {
        InstanceCount: cdk.numberToCloudFormation(properties.instanceCount),
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        VolumeKmsKeyId: cdk.stringToCloudFormation(properties.volumeKmsKeyId),
        VolumeSizeInGB: cdk.numberToCloudFormation(properties.volumeSizeInGb),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleClusterConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.ClusterConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.ClusterConfigProperty>();
    ret.addPropertyResult('instanceCount', 'InstanceCount', cfn_parse.FromCloudFormation.getNumber(properties.InstanceCount));
    ret.addPropertyResult('instanceType', 'InstanceType', cfn_parse.FromCloudFormation.getString(properties.InstanceType));
    ret.addPropertyResult('volumeKmsKeyId', 'VolumeKmsKeyId', properties.VolumeKmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.VolumeKmsKeyId) : undefined);
    ret.addPropertyResult('volumeSizeInGb', 'VolumeSizeInGB', cfn_parse.FromCloudFormation.getNumber(properties.VolumeSizeInGB));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * The Amazon S3 URI for the constraints resource.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-constraintsresource.html
     */
    export interface ConstraintsResourceProperty {
        /**
         * The Amazon S3 URI for the constraints resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-constraintsresource.html#cfn-sagemaker-monitoringschedule-constraintsresource-s3uri
         */
        readonly s3Uri?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConstraintsResourceProperty`
 *
 * @param properties - the TypeScript properties of a `ConstraintsResourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_ConstraintsResourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Uri', cdk.validateString)(properties.s3Uri));
    return errors.wrap('supplied properties not correct for "ConstraintsResourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.ConstraintsResource` resource
 *
 * @param properties - the TypeScript properties of a `ConstraintsResourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.ConstraintsResource` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleConstraintsResourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_ConstraintsResourcePropertyValidator(properties).assertSuccess();
    return {
        S3Uri: cdk.stringToCloudFormation(properties.s3Uri),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleConstraintsResourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.ConstraintsResourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.ConstraintsResourceProperty>();
    ret.addPropertyResult('s3Uri', 'S3Uri', properties.S3Uri != null ? cfn_parse.FromCloudFormation.getString(properties.S3Uri) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * Input object for the endpoint
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-endpointinput.html
     */
    export interface EndpointInputProperty {
        /**
         * An endpoint in customer's account which has enabled `DataCaptureConfig` enabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-endpointinput.html#cfn-sagemaker-monitoringschedule-endpointinput-endpointname
         */
        readonly endpointName: string;
        /**
         * Path to the filesystem where the endpoint data is available to the container.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-endpointinput.html#cfn-sagemaker-monitoringschedule-endpointinput-localpath
         */
        readonly localPath: string;
        /**
         * Whether input data distributed in Amazon S3 is fully replicated or sharded by an S3 key. Defaults to `FullyReplicated`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-endpointinput.html#cfn-sagemaker-monitoringschedule-endpointinput-s3datadistributiontype
         */
        readonly s3DataDistributionType?: string;
        /**
         * Whether the `Pipe` or `File` is used as the input mode for transferring data for the monitoring job. `Pipe` mode is recommended for large datasets. `File` mode is useful for small files that fit in memory. Defaults to `File` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-endpointinput.html#cfn-sagemaker-monitoringschedule-endpointinput-s3inputmode
         */
        readonly s3InputMode?: string;
    }
}

/**
 * Determine whether the given properties match those of a `EndpointInputProperty`
 *
 * @param properties - the TypeScript properties of a `EndpointInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_EndpointInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endpointName', cdk.requiredValidator)(properties.endpointName));
    errors.collect(cdk.propertyValidator('endpointName', cdk.validateString)(properties.endpointName));
    errors.collect(cdk.propertyValidator('localPath', cdk.requiredValidator)(properties.localPath));
    errors.collect(cdk.propertyValidator('localPath', cdk.validateString)(properties.localPath));
    errors.collect(cdk.propertyValidator('s3DataDistributionType', cdk.validateString)(properties.s3DataDistributionType));
    errors.collect(cdk.propertyValidator('s3InputMode', cdk.validateString)(properties.s3InputMode));
    return errors.wrap('supplied properties not correct for "EndpointInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.EndpointInput` resource
 *
 * @param properties - the TypeScript properties of a `EndpointInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.EndpointInput` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleEndpointInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_EndpointInputPropertyValidator(properties).assertSuccess();
    return {
        EndpointName: cdk.stringToCloudFormation(properties.endpointName),
        LocalPath: cdk.stringToCloudFormation(properties.localPath),
        S3DataDistributionType: cdk.stringToCloudFormation(properties.s3DataDistributionType),
        S3InputMode: cdk.stringToCloudFormation(properties.s3InputMode),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleEndpointInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.EndpointInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.EndpointInputProperty>();
    ret.addPropertyResult('endpointName', 'EndpointName', cfn_parse.FromCloudFormation.getString(properties.EndpointName));
    ret.addPropertyResult('localPath', 'LocalPath', cfn_parse.FromCloudFormation.getString(properties.LocalPath));
    ret.addPropertyResult('s3DataDistributionType', 'S3DataDistributionType', properties.S3DataDistributionType != null ? cfn_parse.FromCloudFormation.getString(properties.S3DataDistributionType) : undefined);
    ret.addPropertyResult('s3InputMode', 'S3InputMode', properties.S3InputMode != null ? cfn_parse.FromCloudFormation.getString(properties.S3InputMode) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * Container image configuration object for the monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringappspecification.html
     */
    export interface MonitoringAppSpecificationProperty {
        /**
         * An array of arguments for the container used to run the monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringappspecification.html#cfn-sagemaker-monitoringschedule-monitoringappspecification-containerarguments
         */
        readonly containerArguments?: string[];
        /**
         * Specifies the entrypoint for a container used to run the monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringappspecification.html#cfn-sagemaker-monitoringschedule-monitoringappspecification-containerentrypoint
         */
        readonly containerEntrypoint?: string[];
        /**
         * The container image to be run by the monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringappspecification.html#cfn-sagemaker-monitoringschedule-monitoringappspecification-imageuri
         */
        readonly imageUri: string;
        /**
         * An Amazon S3 URI to a script that is called after analysis has been performed. Applicable only for the built-in (first party) containers.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringappspecification.html#cfn-sagemaker-monitoringschedule-monitoringappspecification-postanalyticsprocessorsourceuri
         */
        readonly postAnalyticsProcessorSourceUri?: string;
        /**
         * An Amazon S3 URI to a script that is called per row prior to running analysis. It can base64 decode the payload and convert it into a flatted json so that the built-in container can use the converted data. Applicable only for the built-in (first party) containers.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringappspecification.html#cfn-sagemaker-monitoringschedule-monitoringappspecification-recordpreprocessorsourceuri
         */
        readonly recordPreprocessorSourceUri?: string;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringAppSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringAppSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_MonitoringAppSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('containerArguments', cdk.listValidator(cdk.validateString))(properties.containerArguments));
    errors.collect(cdk.propertyValidator('containerEntrypoint', cdk.listValidator(cdk.validateString))(properties.containerEntrypoint));
    errors.collect(cdk.propertyValidator('imageUri', cdk.requiredValidator)(properties.imageUri));
    errors.collect(cdk.propertyValidator('imageUri', cdk.validateString)(properties.imageUri));
    errors.collect(cdk.propertyValidator('postAnalyticsProcessorSourceUri', cdk.validateString)(properties.postAnalyticsProcessorSourceUri));
    errors.collect(cdk.propertyValidator('recordPreprocessorSourceUri', cdk.validateString)(properties.recordPreprocessorSourceUri));
    return errors.wrap('supplied properties not correct for "MonitoringAppSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringAppSpecification` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringAppSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringAppSpecification` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleMonitoringAppSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_MonitoringAppSpecificationPropertyValidator(properties).assertSuccess();
    return {
        ContainerArguments: cdk.listMapper(cdk.stringToCloudFormation)(properties.containerArguments),
        ContainerEntrypoint: cdk.listMapper(cdk.stringToCloudFormation)(properties.containerEntrypoint),
        ImageUri: cdk.stringToCloudFormation(properties.imageUri),
        PostAnalyticsProcessorSourceUri: cdk.stringToCloudFormation(properties.postAnalyticsProcessorSourceUri),
        RecordPreprocessorSourceUri: cdk.stringToCloudFormation(properties.recordPreprocessorSourceUri),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleMonitoringAppSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.MonitoringAppSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.MonitoringAppSpecificationProperty>();
    ret.addPropertyResult('containerArguments', 'ContainerArguments', properties.ContainerArguments != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ContainerArguments) : undefined);
    ret.addPropertyResult('containerEntrypoint', 'ContainerEntrypoint', properties.ContainerEntrypoint != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ContainerEntrypoint) : undefined);
    ret.addPropertyResult('imageUri', 'ImageUri', cfn_parse.FromCloudFormation.getString(properties.ImageUri));
    ret.addPropertyResult('postAnalyticsProcessorSourceUri', 'PostAnalyticsProcessorSourceUri', properties.PostAnalyticsProcessorSourceUri != null ? cfn_parse.FromCloudFormation.getString(properties.PostAnalyticsProcessorSourceUri) : undefined);
    ret.addPropertyResult('recordPreprocessorSourceUri', 'RecordPreprocessorSourceUri', properties.RecordPreprocessorSourceUri != null ? cfn_parse.FromCloudFormation.getString(properties.RecordPreprocessorSourceUri) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * Summary of information about the last monitoring job to run.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringexecutionsummary.html
     */
    export interface MonitoringExecutionSummaryProperty {
        /**
         * The time at which the monitoring job was created.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringexecutionsummary.html#cfn-sagemaker-monitoringschedule-monitoringexecutionsummary-creationtime
         */
        readonly creationTime: string;
        /**
         * The name of the endpoint used to run the monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringexecutionsummary.html#cfn-sagemaker-monitoringschedule-monitoringexecutionsummary-endpointname
         */
        readonly endpointName?: string;
        /**
         * Contains the reason a monitoring job failed, if it failed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringexecutionsummary.html#cfn-sagemaker-monitoringschedule-monitoringexecutionsummary-failurereason
         */
        readonly failureReason?: string;
        /**
         * A timestamp that indicates the last time the monitoring job was modified.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringexecutionsummary.html#cfn-sagemaker-monitoringschedule-monitoringexecutionsummary-lastmodifiedtime
         */
        readonly lastModifiedTime: string;
        /**
         * The status of the monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringexecutionsummary.html#cfn-sagemaker-monitoringschedule-monitoringexecutionsummary-monitoringexecutionstatus
         */
        readonly monitoringExecutionStatus: string;
        /**
         * The name of the monitoring schedule.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringexecutionsummary.html#cfn-sagemaker-monitoringschedule-monitoringexecutionsummary-monitoringschedulename
         */
        readonly monitoringScheduleName: string;
        /**
         * The Amazon Resource Name (ARN) of the monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringexecutionsummary.html#cfn-sagemaker-monitoringschedule-monitoringexecutionsummary-processingjobarn
         */
        readonly processingJobArn?: string;
        /**
         * The time the monitoring job was scheduled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringexecutionsummary.html#cfn-sagemaker-monitoringschedule-monitoringexecutionsummary-scheduledtime
         */
        readonly scheduledTime: string;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringExecutionSummaryProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringExecutionSummaryProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_MonitoringExecutionSummaryPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('creationTime', cdk.requiredValidator)(properties.creationTime));
    errors.collect(cdk.propertyValidator('creationTime', cdk.validateString)(properties.creationTime));
    errors.collect(cdk.propertyValidator('endpointName', cdk.validateString)(properties.endpointName));
    errors.collect(cdk.propertyValidator('failureReason', cdk.validateString)(properties.failureReason));
    errors.collect(cdk.propertyValidator('lastModifiedTime', cdk.requiredValidator)(properties.lastModifiedTime));
    errors.collect(cdk.propertyValidator('lastModifiedTime', cdk.validateString)(properties.lastModifiedTime));
    errors.collect(cdk.propertyValidator('monitoringExecutionStatus', cdk.requiredValidator)(properties.monitoringExecutionStatus));
    errors.collect(cdk.propertyValidator('monitoringExecutionStatus', cdk.validateString)(properties.monitoringExecutionStatus));
    errors.collect(cdk.propertyValidator('monitoringScheduleName', cdk.requiredValidator)(properties.monitoringScheduleName));
    errors.collect(cdk.propertyValidator('monitoringScheduleName', cdk.validateString)(properties.monitoringScheduleName));
    errors.collect(cdk.propertyValidator('processingJobArn', cdk.validateString)(properties.processingJobArn));
    errors.collect(cdk.propertyValidator('scheduledTime', cdk.requiredValidator)(properties.scheduledTime));
    errors.collect(cdk.propertyValidator('scheduledTime', cdk.validateString)(properties.scheduledTime));
    return errors.wrap('supplied properties not correct for "MonitoringExecutionSummaryProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringExecutionSummary` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringExecutionSummaryProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringExecutionSummary` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleMonitoringExecutionSummaryPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_MonitoringExecutionSummaryPropertyValidator(properties).assertSuccess();
    return {
        CreationTime: cdk.stringToCloudFormation(properties.creationTime),
        EndpointName: cdk.stringToCloudFormation(properties.endpointName),
        FailureReason: cdk.stringToCloudFormation(properties.failureReason),
        LastModifiedTime: cdk.stringToCloudFormation(properties.lastModifiedTime),
        MonitoringExecutionStatus: cdk.stringToCloudFormation(properties.monitoringExecutionStatus),
        MonitoringScheduleName: cdk.stringToCloudFormation(properties.monitoringScheduleName),
        ProcessingJobArn: cdk.stringToCloudFormation(properties.processingJobArn),
        ScheduledTime: cdk.stringToCloudFormation(properties.scheduledTime),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleMonitoringExecutionSummaryPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.MonitoringExecutionSummaryProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.MonitoringExecutionSummaryProperty>();
    ret.addPropertyResult('creationTime', 'CreationTime', cfn_parse.FromCloudFormation.getString(properties.CreationTime));
    ret.addPropertyResult('endpointName', 'EndpointName', properties.EndpointName != null ? cfn_parse.FromCloudFormation.getString(properties.EndpointName) : undefined);
    ret.addPropertyResult('failureReason', 'FailureReason', properties.FailureReason != null ? cfn_parse.FromCloudFormation.getString(properties.FailureReason) : undefined);
    ret.addPropertyResult('lastModifiedTime', 'LastModifiedTime', cfn_parse.FromCloudFormation.getString(properties.LastModifiedTime));
    ret.addPropertyResult('monitoringExecutionStatus', 'MonitoringExecutionStatus', cfn_parse.FromCloudFormation.getString(properties.MonitoringExecutionStatus));
    ret.addPropertyResult('monitoringScheduleName', 'MonitoringScheduleName', cfn_parse.FromCloudFormation.getString(properties.MonitoringScheduleName));
    ret.addPropertyResult('processingJobArn', 'ProcessingJobArn', properties.ProcessingJobArn != null ? cfn_parse.FromCloudFormation.getString(properties.ProcessingJobArn) : undefined);
    ret.addPropertyResult('scheduledTime', 'ScheduledTime', cfn_parse.FromCloudFormation.getString(properties.ScheduledTime));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * The inputs for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringinput.html
     */
    export interface MonitoringInputProperty {
        /**
         * The endpoint for a monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringinput.html#cfn-sagemaker-monitoringschedule-monitoringinput-endpointinput
         */
        readonly endpointInput: CfnMonitoringSchedule.EndpointInputProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringInputProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_MonitoringInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endpointInput', cdk.requiredValidator)(properties.endpointInput));
    errors.collect(cdk.propertyValidator('endpointInput', CfnMonitoringSchedule_EndpointInputPropertyValidator)(properties.endpointInput));
    return errors.wrap('supplied properties not correct for "MonitoringInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringInput` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringInput` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleMonitoringInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_MonitoringInputPropertyValidator(properties).assertSuccess();
    return {
        EndpointInput: cfnMonitoringScheduleEndpointInputPropertyToCloudFormation(properties.endpointInput),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleMonitoringInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.MonitoringInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.MonitoringInputProperty>();
    ret.addPropertyResult('endpointInput', 'EndpointInput', CfnMonitoringScheduleEndpointInputPropertyFromCloudFormation(properties.EndpointInput));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * Defines the monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringjobdefinition.html
     */
    export interface MonitoringJobDefinitionProperty {
        /**
         * Baseline configuration used to validate that the data conforms to the specified constraints and statistics
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringjobdefinition.html#cfn-sagemaker-monitoringschedule-monitoringjobdefinition-baselineconfig
         */
        readonly baselineConfig?: CfnMonitoringSchedule.BaselineConfigProperty | cdk.IResolvable;
        /**
         * Sets the environment variables in the Docker container.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringjobdefinition.html#cfn-sagemaker-monitoringschedule-monitoringjobdefinition-environment
         */
        readonly environment?: { [key: string]: (string) } | cdk.IResolvable;
        /**
         * Configures the monitoring job to run a specified Docker container image.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringjobdefinition.html#cfn-sagemaker-monitoringschedule-monitoringjobdefinition-monitoringappspecification
         */
        readonly monitoringAppSpecification: CfnMonitoringSchedule.MonitoringAppSpecificationProperty | cdk.IResolvable;
        /**
         * The array of inputs for the monitoring job. Currently we support monitoring an Amazon SageMaker Endpoint.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringjobdefinition.html#cfn-sagemaker-monitoringschedule-monitoringjobdefinition-monitoringinputs
         */
        readonly monitoringInputs: Array<CfnMonitoringSchedule.MonitoringInputProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The array of outputs from the monitoring job to be uploaded to Amazon Simple Storage Service (Amazon S3).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringjobdefinition.html#cfn-sagemaker-monitoringschedule-monitoringjobdefinition-monitoringoutputconfig
         */
        readonly monitoringOutputConfig: CfnMonitoringSchedule.MonitoringOutputConfigProperty | cdk.IResolvable;
        /**
         * Identifies the resources, ML compute instances, and ML storage volumes to deploy for a monitoring job. In distributed processing, you specify more than one instance.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringjobdefinition.html#cfn-sagemaker-monitoringschedule-monitoringjobdefinition-monitoringresources
         */
        readonly monitoringResources: CfnMonitoringSchedule.MonitoringResourcesProperty | cdk.IResolvable;
        /**
         * Specifies networking options for an monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringjobdefinition.html#cfn-sagemaker-monitoringschedule-monitoringjobdefinition-networkconfig
         */
        readonly networkConfig?: CfnMonitoringSchedule.NetworkConfigProperty | cdk.IResolvable;
        /**
         * The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to perform tasks on your behalf.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringjobdefinition.html#cfn-sagemaker-monitoringschedule-monitoringjobdefinition-rolearn
         */
        readonly roleArn: string;
        /**
         * Specifies a time limit for how long the monitoring job is allowed to run.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringjobdefinition.html#cfn-sagemaker-monitoringschedule-monitoringjobdefinition-stoppingcondition
         */
        readonly stoppingCondition?: CfnMonitoringSchedule.StoppingConditionProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringJobDefinitionProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringJobDefinitionProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_MonitoringJobDefinitionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('baselineConfig', CfnMonitoringSchedule_BaselineConfigPropertyValidator)(properties.baselineConfig));
    errors.collect(cdk.propertyValidator('environment', cdk.hashValidator(cdk.validateString))(properties.environment));
    errors.collect(cdk.propertyValidator('monitoringAppSpecification', cdk.requiredValidator)(properties.monitoringAppSpecification));
    errors.collect(cdk.propertyValidator('monitoringAppSpecification', CfnMonitoringSchedule_MonitoringAppSpecificationPropertyValidator)(properties.monitoringAppSpecification));
    errors.collect(cdk.propertyValidator('monitoringInputs', cdk.requiredValidator)(properties.monitoringInputs));
    errors.collect(cdk.propertyValidator('monitoringInputs', cdk.listValidator(CfnMonitoringSchedule_MonitoringInputPropertyValidator))(properties.monitoringInputs));
    errors.collect(cdk.propertyValidator('monitoringOutputConfig', cdk.requiredValidator)(properties.monitoringOutputConfig));
    errors.collect(cdk.propertyValidator('monitoringOutputConfig', CfnMonitoringSchedule_MonitoringOutputConfigPropertyValidator)(properties.monitoringOutputConfig));
    errors.collect(cdk.propertyValidator('monitoringResources', cdk.requiredValidator)(properties.monitoringResources));
    errors.collect(cdk.propertyValidator('monitoringResources', CfnMonitoringSchedule_MonitoringResourcesPropertyValidator)(properties.monitoringResources));
    errors.collect(cdk.propertyValidator('networkConfig', CfnMonitoringSchedule_NetworkConfigPropertyValidator)(properties.networkConfig));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('stoppingCondition', CfnMonitoringSchedule_StoppingConditionPropertyValidator)(properties.stoppingCondition));
    return errors.wrap('supplied properties not correct for "MonitoringJobDefinitionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringJobDefinition` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringJobDefinitionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringJobDefinition` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleMonitoringJobDefinitionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_MonitoringJobDefinitionPropertyValidator(properties).assertSuccess();
    return {
        BaselineConfig: cfnMonitoringScheduleBaselineConfigPropertyToCloudFormation(properties.baselineConfig),
        Environment: cdk.hashMapper(cdk.stringToCloudFormation)(properties.environment),
        MonitoringAppSpecification: cfnMonitoringScheduleMonitoringAppSpecificationPropertyToCloudFormation(properties.monitoringAppSpecification),
        MonitoringInputs: cdk.listMapper(cfnMonitoringScheduleMonitoringInputPropertyToCloudFormation)(properties.monitoringInputs),
        MonitoringOutputConfig: cfnMonitoringScheduleMonitoringOutputConfigPropertyToCloudFormation(properties.monitoringOutputConfig),
        MonitoringResources: cfnMonitoringScheduleMonitoringResourcesPropertyToCloudFormation(properties.monitoringResources),
        NetworkConfig: cfnMonitoringScheduleNetworkConfigPropertyToCloudFormation(properties.networkConfig),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        StoppingCondition: cfnMonitoringScheduleStoppingConditionPropertyToCloudFormation(properties.stoppingCondition),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleMonitoringJobDefinitionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.MonitoringJobDefinitionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.MonitoringJobDefinitionProperty>();
    ret.addPropertyResult('baselineConfig', 'BaselineConfig', properties.BaselineConfig != null ? CfnMonitoringScheduleBaselineConfigPropertyFromCloudFormation(properties.BaselineConfig) : undefined);
    ret.addPropertyResult('environment', 'Environment', properties.Environment != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Environment) : undefined);
    ret.addPropertyResult('monitoringAppSpecification', 'MonitoringAppSpecification', CfnMonitoringScheduleMonitoringAppSpecificationPropertyFromCloudFormation(properties.MonitoringAppSpecification));
    ret.addPropertyResult('monitoringInputs', 'MonitoringInputs', cfn_parse.FromCloudFormation.getArray(CfnMonitoringScheduleMonitoringInputPropertyFromCloudFormation)(properties.MonitoringInputs));
    ret.addPropertyResult('monitoringOutputConfig', 'MonitoringOutputConfig', CfnMonitoringScheduleMonitoringOutputConfigPropertyFromCloudFormation(properties.MonitoringOutputConfig));
    ret.addPropertyResult('monitoringResources', 'MonitoringResources', CfnMonitoringScheduleMonitoringResourcesPropertyFromCloudFormation(properties.MonitoringResources));
    ret.addPropertyResult('networkConfig', 'NetworkConfig', properties.NetworkConfig != null ? CfnMonitoringScheduleNetworkConfigPropertyFromCloudFormation(properties.NetworkConfig) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('stoppingCondition', 'StoppingCondition', properties.StoppingCondition != null ? CfnMonitoringScheduleStoppingConditionPropertyFromCloudFormation(properties.StoppingCondition) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * The output object for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringoutput.html
     */
    export interface MonitoringOutputProperty {
        /**
         * The Amazon S3 storage location where the results of a monitoring job are saved.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringoutput.html#cfn-sagemaker-monitoringschedule-monitoringoutput-s3output
         */
        readonly s3Output: CfnMonitoringSchedule.S3OutputProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringOutputProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_MonitoringOutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Output', cdk.requiredValidator)(properties.s3Output));
    errors.collect(cdk.propertyValidator('s3Output', CfnMonitoringSchedule_S3OutputPropertyValidator)(properties.s3Output));
    return errors.wrap('supplied properties not correct for "MonitoringOutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringOutput` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringOutput` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleMonitoringOutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_MonitoringOutputPropertyValidator(properties).assertSuccess();
    return {
        S3Output: cfnMonitoringScheduleS3OutputPropertyToCloudFormation(properties.s3Output),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleMonitoringOutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.MonitoringOutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.MonitoringOutputProperty>();
    ret.addPropertyResult('s3Output', 'S3Output', CfnMonitoringScheduleS3OutputPropertyFromCloudFormation(properties.S3Output));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * The output configuration for monitoring jobs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringoutputconfig.html
     */
    export interface MonitoringOutputConfigProperty {
        /**
         * The AWS Key Management Service ( AWS KMS) key that Amazon SageMaker uses to encrypt the model artifacts at rest using Amazon S3 server-side encryption.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringoutputconfig.html#cfn-sagemaker-monitoringschedule-monitoringoutputconfig-kmskeyid
         */
        readonly kmsKeyId?: string;
        /**
         * Monitoring outputs for monitoring jobs. This is where the output of the periodic monitoring jobs is uploaded.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringoutputconfig.html#cfn-sagemaker-monitoringschedule-monitoringoutputconfig-monitoringoutputs
         */
        readonly monitoringOutputs: Array<CfnMonitoringSchedule.MonitoringOutputProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringOutputConfigProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_MonitoringOutputConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('monitoringOutputs', cdk.requiredValidator)(properties.monitoringOutputs));
    errors.collect(cdk.propertyValidator('monitoringOutputs', cdk.listValidator(CfnMonitoringSchedule_MonitoringOutputPropertyValidator))(properties.monitoringOutputs));
    return errors.wrap('supplied properties not correct for "MonitoringOutputConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringOutputConfig` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringOutputConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringOutputConfig` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleMonitoringOutputConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_MonitoringOutputConfigPropertyValidator(properties).assertSuccess();
    return {
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        MonitoringOutputs: cdk.listMapper(cfnMonitoringScheduleMonitoringOutputPropertyToCloudFormation)(properties.monitoringOutputs),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleMonitoringOutputConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.MonitoringOutputConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.MonitoringOutputConfigProperty>();
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('monitoringOutputs', 'MonitoringOutputs', cfn_parse.FromCloudFormation.getArray(CfnMonitoringScheduleMonitoringOutputPropertyFromCloudFormation)(properties.MonitoringOutputs));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * Identifies the resources to deploy for a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringresources.html
     */
    export interface MonitoringResourcesProperty {
        /**
         * The configuration for the cluster resources used to run the processing job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringresources.html#cfn-sagemaker-monitoringschedule-monitoringresources-clusterconfig
         */
        readonly clusterConfig: CfnMonitoringSchedule.ClusterConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringResourcesProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringResourcesProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_MonitoringResourcesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clusterConfig', cdk.requiredValidator)(properties.clusterConfig));
    errors.collect(cdk.propertyValidator('clusterConfig', CfnMonitoringSchedule_ClusterConfigPropertyValidator)(properties.clusterConfig));
    return errors.wrap('supplied properties not correct for "MonitoringResourcesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringResources` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringResourcesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringResources` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleMonitoringResourcesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_MonitoringResourcesPropertyValidator(properties).assertSuccess();
    return {
        ClusterConfig: cfnMonitoringScheduleClusterConfigPropertyToCloudFormation(properties.clusterConfig),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleMonitoringResourcesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.MonitoringResourcesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.MonitoringResourcesProperty>();
    ret.addPropertyResult('clusterConfig', 'ClusterConfig', CfnMonitoringScheduleClusterConfigPropertyFromCloudFormation(properties.ClusterConfig));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * Configures the monitoring schedule and defines the monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringscheduleconfig.html
     */
    export interface MonitoringScheduleConfigProperty {
        /**
         * Defines the monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringscheduleconfig.html#cfn-sagemaker-monitoringschedule-monitoringscheduleconfig-monitoringjobdefinition
         */
        readonly monitoringJobDefinition?: CfnMonitoringSchedule.MonitoringJobDefinitionProperty | cdk.IResolvable;
        /**
         * The name of the monitoring job definition to schedule.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringscheduleconfig.html#cfn-sagemaker-monitoringschedule-monitoringscheduleconfig-monitoringjobdefinitionname
         */
        readonly monitoringJobDefinitionName?: string;
        /**
         * The type of the monitoring job definition to schedule.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringscheduleconfig.html#cfn-sagemaker-monitoringschedule-monitoringscheduleconfig-monitoringtype
         */
        readonly monitoringType?: string;
        /**
         * Configures the monitoring schedule.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-monitoringscheduleconfig.html#cfn-sagemaker-monitoringschedule-monitoringscheduleconfig-scheduleconfig
         */
        readonly scheduleConfig?: CfnMonitoringSchedule.ScheduleConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringScheduleConfigProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringScheduleConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_MonitoringScheduleConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('monitoringJobDefinition', CfnMonitoringSchedule_MonitoringJobDefinitionPropertyValidator)(properties.monitoringJobDefinition));
    errors.collect(cdk.propertyValidator('monitoringJobDefinitionName', cdk.validateString)(properties.monitoringJobDefinitionName));
    errors.collect(cdk.propertyValidator('monitoringType', cdk.validateString)(properties.monitoringType));
    errors.collect(cdk.propertyValidator('scheduleConfig', CfnMonitoringSchedule_ScheduleConfigPropertyValidator)(properties.scheduleConfig));
    return errors.wrap('supplied properties not correct for "MonitoringScheduleConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringScheduleConfig` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringScheduleConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.MonitoringScheduleConfig` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleMonitoringScheduleConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_MonitoringScheduleConfigPropertyValidator(properties).assertSuccess();
    return {
        MonitoringJobDefinition: cfnMonitoringScheduleMonitoringJobDefinitionPropertyToCloudFormation(properties.monitoringJobDefinition),
        MonitoringJobDefinitionName: cdk.stringToCloudFormation(properties.monitoringJobDefinitionName),
        MonitoringType: cdk.stringToCloudFormation(properties.monitoringType),
        ScheduleConfig: cfnMonitoringScheduleScheduleConfigPropertyToCloudFormation(properties.scheduleConfig),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleMonitoringScheduleConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.MonitoringScheduleConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.MonitoringScheduleConfigProperty>();
    ret.addPropertyResult('monitoringJobDefinition', 'MonitoringJobDefinition', properties.MonitoringJobDefinition != null ? CfnMonitoringScheduleMonitoringJobDefinitionPropertyFromCloudFormation(properties.MonitoringJobDefinition) : undefined);
    ret.addPropertyResult('monitoringJobDefinitionName', 'MonitoringJobDefinitionName', properties.MonitoringJobDefinitionName != null ? cfn_parse.FromCloudFormation.getString(properties.MonitoringJobDefinitionName) : undefined);
    ret.addPropertyResult('monitoringType', 'MonitoringType', properties.MonitoringType != null ? cfn_parse.FromCloudFormation.getString(properties.MonitoringType) : undefined);
    ret.addPropertyResult('scheduleConfig', 'ScheduleConfig', properties.ScheduleConfig != null ? CfnMonitoringScheduleScheduleConfigPropertyFromCloudFormation(properties.ScheduleConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * Networking options for a job, such as network traffic encryption between containers, whether to allow inbound and outbound network calls to and from containers, and the VPC subnets and security groups to use for VPC-enabled jobs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-networkconfig.html
     */
    export interface NetworkConfigProperty {
        /**
         * Whether to encrypt all communications between distributed processing jobs. Choose `True` to encrypt communications. Encryption provides greater security for distributed processing jobs, but the processing might take longer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-networkconfig.html#cfn-sagemaker-monitoringschedule-networkconfig-enableintercontainertrafficencryption
         */
        readonly enableInterContainerTrafficEncryption?: boolean | cdk.IResolvable;
        /**
         * Whether to allow inbound and outbound network calls to and from the containers used for the processing job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-networkconfig.html#cfn-sagemaker-monitoringschedule-networkconfig-enablenetworkisolation
         */
        readonly enableNetworkIsolation?: boolean | cdk.IResolvable;
        /**
         * Specifies a VPC that your training jobs and hosted models have access to. Control access to and from your training and model containers by configuring the VPC. For more information, see [Protect Endpoints by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/host-vpc.html) and [Protect Training Jobs by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/train-vpc.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-networkconfig.html#cfn-sagemaker-monitoringschedule-networkconfig-vpcconfig
         */
        readonly vpcConfig?: CfnMonitoringSchedule.VpcConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `NetworkConfigProperty`
 *
 * @param properties - the TypeScript properties of a `NetworkConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_NetworkConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enableInterContainerTrafficEncryption', cdk.validateBoolean)(properties.enableInterContainerTrafficEncryption));
    errors.collect(cdk.propertyValidator('enableNetworkIsolation', cdk.validateBoolean)(properties.enableNetworkIsolation));
    errors.collect(cdk.propertyValidator('vpcConfig', CfnMonitoringSchedule_VpcConfigPropertyValidator)(properties.vpcConfig));
    return errors.wrap('supplied properties not correct for "NetworkConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.NetworkConfig` resource
 *
 * @param properties - the TypeScript properties of a `NetworkConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.NetworkConfig` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleNetworkConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_NetworkConfigPropertyValidator(properties).assertSuccess();
    return {
        EnableInterContainerTrafficEncryption: cdk.booleanToCloudFormation(properties.enableInterContainerTrafficEncryption),
        EnableNetworkIsolation: cdk.booleanToCloudFormation(properties.enableNetworkIsolation),
        VpcConfig: cfnMonitoringScheduleVpcConfigPropertyToCloudFormation(properties.vpcConfig),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleNetworkConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.NetworkConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.NetworkConfigProperty>();
    ret.addPropertyResult('enableInterContainerTrafficEncryption', 'EnableInterContainerTrafficEncryption', properties.EnableInterContainerTrafficEncryption != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableInterContainerTrafficEncryption) : undefined);
    ret.addPropertyResult('enableNetworkIsolation', 'EnableNetworkIsolation', properties.EnableNetworkIsolation != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableNetworkIsolation) : undefined);
    ret.addPropertyResult('vpcConfig', 'VpcConfig', properties.VpcConfig != null ? CfnMonitoringScheduleVpcConfigPropertyFromCloudFormation(properties.VpcConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * Information about where and how you want to store the results of a monitoring job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-s3output.html
     */
    export interface S3OutputProperty {
        /**
         * The local path to the S3 storage location where SageMaker saves the results of a monitoring job. LocalPath is an absolute path for the output data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-s3output.html#cfn-sagemaker-monitoringschedule-s3output-localpath
         */
        readonly localPath: string;
        /**
         * Whether to upload the results of the monitoring job continuously or after the job completes.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-s3output.html#cfn-sagemaker-monitoringschedule-s3output-s3uploadmode
         */
        readonly s3UploadMode?: string;
        /**
         * A URI that identifies the S3 storage location where SageMaker saves the results of a monitoring job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-s3output.html#cfn-sagemaker-monitoringschedule-s3output-s3uri
         */
        readonly s3Uri: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3OutputProperty`
 *
 * @param properties - the TypeScript properties of a `S3OutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_S3OutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('localPath', cdk.requiredValidator)(properties.localPath));
    errors.collect(cdk.propertyValidator('localPath', cdk.validateString)(properties.localPath));
    errors.collect(cdk.propertyValidator('s3UploadMode', cdk.validateString)(properties.s3UploadMode));
    errors.collect(cdk.propertyValidator('s3Uri', cdk.requiredValidator)(properties.s3Uri));
    errors.collect(cdk.propertyValidator('s3Uri', cdk.validateString)(properties.s3Uri));
    return errors.wrap('supplied properties not correct for "S3OutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.S3Output` resource
 *
 * @param properties - the TypeScript properties of a `S3OutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.S3Output` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleS3OutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_S3OutputPropertyValidator(properties).assertSuccess();
    return {
        LocalPath: cdk.stringToCloudFormation(properties.localPath),
        S3UploadMode: cdk.stringToCloudFormation(properties.s3UploadMode),
        S3Uri: cdk.stringToCloudFormation(properties.s3Uri),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleS3OutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.S3OutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.S3OutputProperty>();
    ret.addPropertyResult('localPath', 'LocalPath', cfn_parse.FromCloudFormation.getString(properties.LocalPath));
    ret.addPropertyResult('s3UploadMode', 'S3UploadMode', properties.S3UploadMode != null ? cfn_parse.FromCloudFormation.getString(properties.S3UploadMode) : undefined);
    ret.addPropertyResult('s3Uri', 'S3Uri', cfn_parse.FromCloudFormation.getString(properties.S3Uri));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * Configuration details about the monitoring schedule.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-scheduleconfig.html
     */
    export interface ScheduleConfigProperty {
        /**
         * A cron expression that describes details about the monitoring schedule.
         *
         * Currently the only supported cron expressions are:
         *
         * - If you want to set the job to start every hour, please use the following:
         *
         * `Hourly: cron(0 * ? * * *)`
         * - If you want to start the job daily:
         *
         * `cron(0 [00-23] ? * * *)`
         *
         * For example, the following are valid cron expressions:
         *
         * - Daily at noon UTC: `cron(0 12 ? * * *)`
         * - Daily at midnight UTC: `cron(0 0 ? * * *)`
         *
         * To support running every 6, 12 hours, the following are also supported:
         *
         * `cron(0 [00-23]/[01-24] ? * * *)`
         *
         * For example, the following are valid cron expressions:
         *
         * - Every 12 hours, starting at 5pm UTC: `cron(0 17/12 ? * * *)`
         * - Every two hours starting at midnight: `cron(0 0/2 ? * * *)`
         *
         * > - Even though the cron expression is set to start at 5PM UTC, note that there could be a delay of 0-20 minutes from the actual requested time to run the execution.
         * > - We recommend that if you would like a daily schedule, you do not provide this parameter. Amazon SageMaker will pick a time for running every day.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-scheduleconfig.html#cfn-sagemaker-monitoringschedule-scheduleconfig-scheduleexpression
         */
        readonly scheduleExpression: string;
    }
}

/**
 * Determine whether the given properties match those of a `ScheduleConfigProperty`
 *
 * @param properties - the TypeScript properties of a `ScheduleConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_ScheduleConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('scheduleExpression', cdk.requiredValidator)(properties.scheduleExpression));
    errors.collect(cdk.propertyValidator('scheduleExpression', cdk.validateString)(properties.scheduleExpression));
    return errors.wrap('supplied properties not correct for "ScheduleConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.ScheduleConfig` resource
 *
 * @param properties - the TypeScript properties of a `ScheduleConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.ScheduleConfig` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleScheduleConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_ScheduleConfigPropertyValidator(properties).assertSuccess();
    return {
        ScheduleExpression: cdk.stringToCloudFormation(properties.scheduleExpression),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleScheduleConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.ScheduleConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.ScheduleConfigProperty>();
    ret.addPropertyResult('scheduleExpression', 'ScheduleExpression', cfn_parse.FromCloudFormation.getString(properties.ScheduleExpression));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * The baseline statistics file in Amazon S3 that the current monitoring job should be validated against.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-statisticsresource.html
     */
    export interface StatisticsResourceProperty {
        /**
         * The S3 URI for the statistics resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-statisticsresource.html#cfn-sagemaker-monitoringschedule-statisticsresource-s3uri
         */
        readonly s3Uri?: string;
    }
}

/**
 * Determine whether the given properties match those of a `StatisticsResourceProperty`
 *
 * @param properties - the TypeScript properties of a `StatisticsResourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_StatisticsResourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Uri', cdk.validateString)(properties.s3Uri));
    return errors.wrap('supplied properties not correct for "StatisticsResourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.StatisticsResource` resource
 *
 * @param properties - the TypeScript properties of a `StatisticsResourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.StatisticsResource` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleStatisticsResourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_StatisticsResourcePropertyValidator(properties).assertSuccess();
    return {
        S3Uri: cdk.stringToCloudFormation(properties.s3Uri),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleStatisticsResourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.StatisticsResourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.StatisticsResourceProperty>();
    ret.addPropertyResult('s3Uri', 'S3Uri', properties.S3Uri != null ? cfn_parse.FromCloudFormation.getString(properties.S3Uri) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * Specifies a limit to how long a model training job or model compilation job can run. It also specifies how long a managed spot training job has to complete. When the job reaches the time limit, SageMaker ends the training or compilation job. Use this API to cap model training costs.
     *
     * To stop a training job, SageMaker sends the algorithm the `SIGTERM` signal, which delays job termination for 120 seconds. Algorithms can use this 120-second window to save the model artifacts, so the results of training are not lost.
     *
     * The training algorithms provided by SageMaker automatically save the intermediate results of a model training job when possible. This attempt to save artifacts is only a best effort case as model might not be in a state from which it can be saved. For example, if training has just started, the model might not be ready to save. When saved, this intermediate data is a valid model artifact. You can use it to create a model with `CreateModel` .
     *
     * > The Neural Topic Model (NTM) currently does not support saving intermediate model artifacts. When training NTMs, make sure that the maximum runtime is sufficient for the training job to complete.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-stoppingcondition.html
     */
    export interface StoppingConditionProperty {
        /**
         * The maximum length of time, in seconds, that a training or compilation job can run.
         *
         * For compilation jobs, if the job does not complete during this time, a `TimeOut` error is generated. We recommend starting with 900 seconds and increasing as necessary based on your model.
         *
         * For all other jobs, if the job does not complete during this time, SageMaker ends the job. When `RetryStrategy` is specified in the job request, `MaxRuntimeInSeconds` specifies the maximum time for all of the attempts in total, not each individual attempt. The default value is 1 day. The maximum value is 28 days.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-stoppingcondition.html#cfn-sagemaker-monitoringschedule-stoppingcondition-maxruntimeinseconds
         */
        readonly maxRuntimeInSeconds: number;
    }
}

/**
 * Determine whether the given properties match those of a `StoppingConditionProperty`
 *
 * @param properties - the TypeScript properties of a `StoppingConditionProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_StoppingConditionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('maxRuntimeInSeconds', cdk.requiredValidator)(properties.maxRuntimeInSeconds));
    errors.collect(cdk.propertyValidator('maxRuntimeInSeconds', cdk.validateNumber)(properties.maxRuntimeInSeconds));
    return errors.wrap('supplied properties not correct for "StoppingConditionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.StoppingCondition` resource
 *
 * @param properties - the TypeScript properties of a `StoppingConditionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.StoppingCondition` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleStoppingConditionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_StoppingConditionPropertyValidator(properties).assertSuccess();
    return {
        MaxRuntimeInSeconds: cdk.numberToCloudFormation(properties.maxRuntimeInSeconds),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleStoppingConditionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.StoppingConditionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.StoppingConditionProperty>();
    ret.addPropertyResult('maxRuntimeInSeconds', 'MaxRuntimeInSeconds', cfn_parse.FromCloudFormation.getNumber(properties.MaxRuntimeInSeconds));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMonitoringSchedule {
    /**
     * Specifies a VPC that your training jobs and hosted models have access to. Control access to and from your training and model containers by configuring the VPC. For more information, see [Protect Endpoints by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/host-vpc.html) and [Protect Training Jobs by Using an Amazon Virtual Private Cloud](https://docs.aws.amazon.com/sagemaker/latest/dg/train-vpc.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-vpcconfig.html
     */
    export interface VpcConfigProperty {
        /**
         * The VPC security group IDs, in the form sg-xxxxxxxx. Specify the security groups for the VPC that is specified in the `Subnets` field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-vpcconfig.html#cfn-sagemaker-monitoringschedule-vpcconfig-securitygroupids
         */
        readonly securityGroupIds: string[];
        /**
         * The ID of the subnets in the VPC to which you want to connect your training job or model. For information about the availability of specific instance types, see [Supported Instance Types and Availability Zones](https://docs.aws.amazon.com/sagemaker/latest/dg/instance-types-az.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-monitoringschedule-vpcconfig.html#cfn-sagemaker-monitoringschedule-vpcconfig-subnets
         */
        readonly subnets: string[];
    }
}

/**
 * Determine whether the given properties match those of a `VpcConfigProperty`
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnMonitoringSchedule_VpcConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.requiredValidator)(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('subnets', cdk.requiredValidator)(properties.subnets));
    errors.collect(cdk.propertyValidator('subnets', cdk.listValidator(cdk.validateString))(properties.subnets));
    return errors.wrap('supplied properties not correct for "VpcConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.VpcConfig` resource
 *
 * @param properties - the TypeScript properties of a `VpcConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::MonitoringSchedule.VpcConfig` resource.
 */
// @ts-ignore TS6133
function cfnMonitoringScheduleVpcConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMonitoringSchedule_VpcConfigPropertyValidator(properties).assertSuccess();
    return {
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        Subnets: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnets),
    };
}

// @ts-ignore TS6133
function CfnMonitoringScheduleVpcConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMonitoringSchedule.VpcConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMonitoringSchedule.VpcConfigProperty>();
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds));
    ret.addPropertyResult('subnets', 'Subnets', cfn_parse.FromCloudFormation.getStringArray(properties.Subnets));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnNotebookInstance`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html
 */
export interface CfnNotebookInstanceProps {

    /**
     * The type of ML compute instance to launch for the notebook instance.
     *
     * > Expect some interruption of service if this parameter is changed as CloudFormation stops a notebook instance and starts it up again to update it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-instancetype
     */
    readonly instanceType: string;

    /**
     * When you send any requests to AWS resources from the notebook instance, SageMaker assumes this role to perform tasks on your behalf. You must grant this role necessary permissions so SageMaker can perform these tasks. The policy must allow the SageMaker service principal (sagemaker.amazonaws.com) permissions to assume this role. For more information, see [SageMaker Roles](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-roles.html) .
     *
     * > To be able to pass this role to SageMaker, the caller of this API must have the `iam:PassRole` permission.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-rolearn
     */
    readonly roleArn: string;

    /**
     * A list of Amazon Elastic Inference (EI) instance types to associate with the notebook instance. Currently, only one instance type can be associated with a notebook instance. For more information, see [Using Elastic Inference in Amazon SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/ei.html) .
     *
     * *Valid Values:* `ml.eia1.medium | ml.eia1.large | ml.eia1.xlarge | ml.eia2.medium | ml.eia2.large | ml.eia2.xlarge` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-acceleratortypes
     */
    readonly acceleratorTypes?: string[];

    /**
     * An array of up to three Git repositories associated with the notebook instance. These can be either the names of Git repositories stored as resources in your account, or the URL of Git repositories in [AWS CodeCommit](https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html) or in any other Git repository. These repositories are cloned at the same level as the default repository of your notebook instance. For more information, see [Associating Git Repositories with SageMaker Notebook Instances](https://docs.aws.amazon.com/sagemaker/latest/dg/nbi-git-repo.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-additionalcoderepositories
     */
    readonly additionalCodeRepositories?: string[];

    /**
     * The Git repository associated with the notebook instance as its default code repository. This can be either the name of a Git repository stored as a resource in your account, or the URL of a Git repository in [AWS CodeCommit](https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html) or in any other Git repository. When you open a notebook instance, it opens in the directory that contains this repository. For more information, see [Associating Git Repositories with SageMaker Notebook Instances](https://docs.aws.amazon.com/sagemaker/latest/dg/nbi-git-repo.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-defaultcoderepository
     */
    readonly defaultCodeRepository?: string;

    /**
     * Sets whether SageMaker provides internet access to the notebook instance. If you set this to `Disabled` this notebook instance is able to access resources only in your VPC, and is not be able to connect to SageMaker training and endpoint services unless you configure a NAT Gateway in your VPC.
     *
     * For more information, see [Notebook Instances Are Internet-Enabled by Default](https://docs.aws.amazon.com/sagemaker/latest/dg/appendix-additional-considerations.html#appendix-notebook-and-internet-access) . You can set the value of this parameter to `Disabled` only if you set a value for the `SubnetId` parameter.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-directinternetaccess
     */
    readonly directInternetAccess?: string;

    /**
     * The Amazon Resource Name (ARN) of a AWS Key Management Service key that SageMaker uses to encrypt data on the storage volume attached to your notebook instance. The KMS key you provide must be enabled. For information, see [Enabling and Disabling Keys](https://docs.aws.amazon.com/kms/latest/developerguide/enabling-keys.html) in the *AWS Key Management Service Developer Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-kmskeyid
     */
    readonly kmsKeyId?: string;

    /**
     * The name of a lifecycle configuration to associate with the notebook instance. For information about lifecycle configurations, see [Customize a Notebook Instance](https://docs.aws.amazon.com/sagemaker/latest/dg/notebook-lifecycle-config.html) in the *Amazon SageMaker Developer Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-lifecycleconfigname
     */
    readonly lifecycleConfigName?: string;

    /**
     * The name of the new notebook instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-notebookinstancename
     */
    readonly notebookInstanceName?: string;

    /**
     * The platform identifier of the notebook instance runtime environment.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-platformidentifier
     */
    readonly platformIdentifier?: string;

    /**
     * Whether root access is enabled or disabled for users of the notebook instance. The default value is `Enabled` .
     *
     * > Lifecycle configurations need root access to be able to set up a notebook instance. Because of this, lifecycle configurations associated with a notebook instance always run with root access even if you disable root access for users.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-rootaccess
     */
    readonly rootAccess?: string;

    /**
     * The VPC security group IDs, in the form sg-xxxxxxxx. The security groups must be for the same VPC as specified in the subnet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-securitygroupids
     */
    readonly securityGroupIds?: string[];

    /**
     * The ID of the subnet in a VPC to which you would like to have a connectivity from your ML compute instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-subnetid
     */
    readonly subnetId?: string;

    /**
     * A list of key-value pairs to apply to this resource.
     *
     * For more information, see [Resource Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) and [Using Cost Allocation Tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#allocation-what) .
     *
     * You can add tags later by using the `CreateTags` API.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The size, in GB, of the ML storage volume to attach to the notebook instance. The default value is 5 GB.
     *
     * > Expect some interruption of service if this parameter is changed as CloudFormation stops a notebook instance and starts it up again to update it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-volumesizeingb
     */
    readonly volumeSizeInGb?: number;
}

/**
 * Determine whether the given properties match those of a `CfnNotebookInstanceProps`
 *
 * @param properties - the TypeScript properties of a `CfnNotebookInstanceProps`
 *
 * @returns the result of the validation.
 */
function CfnNotebookInstancePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('acceleratorTypes', cdk.listValidator(cdk.validateString))(properties.acceleratorTypes));
    errors.collect(cdk.propertyValidator('additionalCodeRepositories', cdk.listValidator(cdk.validateString))(properties.additionalCodeRepositories));
    errors.collect(cdk.propertyValidator('defaultCodeRepository', cdk.validateString)(properties.defaultCodeRepository));
    errors.collect(cdk.propertyValidator('directInternetAccess', cdk.validateString)(properties.directInternetAccess));
    errors.collect(cdk.propertyValidator('instanceType', cdk.requiredValidator)(properties.instanceType));
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('lifecycleConfigName', cdk.validateString)(properties.lifecycleConfigName));
    errors.collect(cdk.propertyValidator('notebookInstanceName', cdk.validateString)(properties.notebookInstanceName));
    errors.collect(cdk.propertyValidator('platformIdentifier', cdk.validateString)(properties.platformIdentifier));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('rootAccess', cdk.validateString)(properties.rootAccess));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('subnetId', cdk.validateString)(properties.subnetId));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('volumeSizeInGb', cdk.validateNumber)(properties.volumeSizeInGb));
    return errors.wrap('supplied properties not correct for "CfnNotebookInstanceProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::NotebookInstance` resource
 *
 * @param properties - the TypeScript properties of a `CfnNotebookInstanceProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::NotebookInstance` resource.
 */
// @ts-ignore TS6133
function cfnNotebookInstancePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnNotebookInstancePropsValidator(properties).assertSuccess();
    return {
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        AcceleratorTypes: cdk.listMapper(cdk.stringToCloudFormation)(properties.acceleratorTypes),
        AdditionalCodeRepositories: cdk.listMapper(cdk.stringToCloudFormation)(properties.additionalCodeRepositories),
        DefaultCodeRepository: cdk.stringToCloudFormation(properties.defaultCodeRepository),
        DirectInternetAccess: cdk.stringToCloudFormation(properties.directInternetAccess),
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        LifecycleConfigName: cdk.stringToCloudFormation(properties.lifecycleConfigName),
        NotebookInstanceName: cdk.stringToCloudFormation(properties.notebookInstanceName),
        PlatformIdentifier: cdk.stringToCloudFormation(properties.platformIdentifier),
        RootAccess: cdk.stringToCloudFormation(properties.rootAccess),
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        SubnetId: cdk.stringToCloudFormation(properties.subnetId),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        VolumeSizeInGB: cdk.numberToCloudFormation(properties.volumeSizeInGb),
    };
}

// @ts-ignore TS6133
function CfnNotebookInstancePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnNotebookInstanceProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnNotebookInstanceProps>();
    ret.addPropertyResult('instanceType', 'InstanceType', cfn_parse.FromCloudFormation.getString(properties.InstanceType));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('acceleratorTypes', 'AcceleratorTypes', properties.AcceleratorTypes != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AcceleratorTypes) : undefined);
    ret.addPropertyResult('additionalCodeRepositories', 'AdditionalCodeRepositories', properties.AdditionalCodeRepositories != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AdditionalCodeRepositories) : undefined);
    ret.addPropertyResult('defaultCodeRepository', 'DefaultCodeRepository', properties.DefaultCodeRepository != null ? cfn_parse.FromCloudFormation.getString(properties.DefaultCodeRepository) : undefined);
    ret.addPropertyResult('directInternetAccess', 'DirectInternetAccess', properties.DirectInternetAccess != null ? cfn_parse.FromCloudFormation.getString(properties.DirectInternetAccess) : undefined);
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('lifecycleConfigName', 'LifecycleConfigName', properties.LifecycleConfigName != null ? cfn_parse.FromCloudFormation.getString(properties.LifecycleConfigName) : undefined);
    ret.addPropertyResult('notebookInstanceName', 'NotebookInstanceName', properties.NotebookInstanceName != null ? cfn_parse.FromCloudFormation.getString(properties.NotebookInstanceName) : undefined);
    ret.addPropertyResult('platformIdentifier', 'PlatformIdentifier', properties.PlatformIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.PlatformIdentifier) : undefined);
    ret.addPropertyResult('rootAccess', 'RootAccess', properties.RootAccess != null ? cfn_parse.FromCloudFormation.getString(properties.RootAccess) : undefined);
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', properties.SecurityGroupIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds) : undefined);
    ret.addPropertyResult('subnetId', 'SubnetId', properties.SubnetId != null ? cfn_parse.FromCloudFormation.getString(properties.SubnetId) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('volumeSizeInGb', 'VolumeSizeInGB', properties.VolumeSizeInGB != null ? cfn_parse.FromCloudFormation.getNumber(properties.VolumeSizeInGB) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::NotebookInstance`
 *
 * The `AWS::SageMaker::NotebookInstance` resource creates an Amazon SageMaker notebook instance. A notebook instance is a machine learning (ML) compute instance running on a Jupyter notebook. For more information, see [Use Notebook Instances](https://docs.aws.amazon.com/sagemaker/latest/dg/nbi.html) .
 *
 * @cloudformationResource AWS::SageMaker::NotebookInstance
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html
 */
export class CfnNotebookInstance extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::NotebookInstance";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnNotebookInstance {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnNotebookInstancePropsFromCloudFormation(resourceProperties);
        const ret = new CfnNotebookInstance(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the notebook instance, such as `MyNotebookInstance` .
     * @cloudformationAttribute NotebookInstanceName
     */
    public readonly attrNotebookInstanceName: string;

    /**
     * The type of ML compute instance to launch for the notebook instance.
     *
     * > Expect some interruption of service if this parameter is changed as CloudFormation stops a notebook instance and starts it up again to update it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-instancetype
     */
    public instanceType: string;

    /**
     * When you send any requests to AWS resources from the notebook instance, SageMaker assumes this role to perform tasks on your behalf. You must grant this role necessary permissions so SageMaker can perform these tasks. The policy must allow the SageMaker service principal (sagemaker.amazonaws.com) permissions to assume this role. For more information, see [SageMaker Roles](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-roles.html) .
     *
     * > To be able to pass this role to SageMaker, the caller of this API must have the `iam:PassRole` permission.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-rolearn
     */
    public roleArn: string;

    /**
     * A list of Amazon Elastic Inference (EI) instance types to associate with the notebook instance. Currently, only one instance type can be associated with a notebook instance. For more information, see [Using Elastic Inference in Amazon SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/ei.html) .
     *
     * *Valid Values:* `ml.eia1.medium | ml.eia1.large | ml.eia1.xlarge | ml.eia2.medium | ml.eia2.large | ml.eia2.xlarge` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-acceleratortypes
     */
    public acceleratorTypes: string[] | undefined;

    /**
     * An array of up to three Git repositories associated with the notebook instance. These can be either the names of Git repositories stored as resources in your account, or the URL of Git repositories in [AWS CodeCommit](https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html) or in any other Git repository. These repositories are cloned at the same level as the default repository of your notebook instance. For more information, see [Associating Git Repositories with SageMaker Notebook Instances](https://docs.aws.amazon.com/sagemaker/latest/dg/nbi-git-repo.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-additionalcoderepositories
     */
    public additionalCodeRepositories: string[] | undefined;

    /**
     * The Git repository associated with the notebook instance as its default code repository. This can be either the name of a Git repository stored as a resource in your account, or the URL of a Git repository in [AWS CodeCommit](https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html) or in any other Git repository. When you open a notebook instance, it opens in the directory that contains this repository. For more information, see [Associating Git Repositories with SageMaker Notebook Instances](https://docs.aws.amazon.com/sagemaker/latest/dg/nbi-git-repo.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-defaultcoderepository
     */
    public defaultCodeRepository: string | undefined;

    /**
     * Sets whether SageMaker provides internet access to the notebook instance. If you set this to `Disabled` this notebook instance is able to access resources only in your VPC, and is not be able to connect to SageMaker training and endpoint services unless you configure a NAT Gateway in your VPC.
     *
     * For more information, see [Notebook Instances Are Internet-Enabled by Default](https://docs.aws.amazon.com/sagemaker/latest/dg/appendix-additional-considerations.html#appendix-notebook-and-internet-access) . You can set the value of this parameter to `Disabled` only if you set a value for the `SubnetId` parameter.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-directinternetaccess
     */
    public directInternetAccess: string | undefined;

    /**
     * The Amazon Resource Name (ARN) of a AWS Key Management Service key that SageMaker uses to encrypt data on the storage volume attached to your notebook instance. The KMS key you provide must be enabled. For information, see [Enabling and Disabling Keys](https://docs.aws.amazon.com/kms/latest/developerguide/enabling-keys.html) in the *AWS Key Management Service Developer Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-kmskeyid
     */
    public kmsKeyId: string | undefined;

    /**
     * The name of a lifecycle configuration to associate with the notebook instance. For information about lifecycle configurations, see [Customize a Notebook Instance](https://docs.aws.amazon.com/sagemaker/latest/dg/notebook-lifecycle-config.html) in the *Amazon SageMaker Developer Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-lifecycleconfigname
     */
    public lifecycleConfigName: string | undefined;

    /**
     * The name of the new notebook instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-notebookinstancename
     */
    public notebookInstanceName: string | undefined;

    /**
     * The platform identifier of the notebook instance runtime environment.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-platformidentifier
     */
    public platformIdentifier: string | undefined;

    /**
     * Whether root access is enabled or disabled for users of the notebook instance. The default value is `Enabled` .
     *
     * > Lifecycle configurations need root access to be able to set up a notebook instance. Because of this, lifecycle configurations associated with a notebook instance always run with root access even if you disable root access for users.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-rootaccess
     */
    public rootAccess: string | undefined;

    /**
     * The VPC security group IDs, in the form sg-xxxxxxxx. The security groups must be for the same VPC as specified in the subnet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-securitygroupids
     */
    public securityGroupIds: string[] | undefined;

    /**
     * The ID of the subnet in a VPC to which you would like to have a connectivity from your ML compute instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-subnetid
     */
    public subnetId: string | undefined;

    /**
     * A list of key-value pairs to apply to this resource.
     *
     * For more information, see [Resource Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) and [Using Cost Allocation Tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#allocation-what) .
     *
     * You can add tags later by using the `CreateTags` API.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The size, in GB, of the ML storage volume to attach to the notebook instance. The default value is 5 GB.
     *
     * > Expect some interruption of service if this parameter is changed as CloudFormation stops a notebook instance and starts it up again to update it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstance.html#cfn-sagemaker-notebookinstance-volumesizeingb
     */
    public volumeSizeInGb: number | undefined;

    /**
     * Create a new `AWS::SageMaker::NotebookInstance`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnNotebookInstanceProps) {
        super(scope, id, { type: CfnNotebookInstance.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'instanceType', this);
        cdk.requireProperty(props, 'roleArn', this);
        this.attrNotebookInstanceName = cdk.Token.asString(this.getAtt('NotebookInstanceName'));

        this.instanceType = props.instanceType;
        this.roleArn = props.roleArn;
        this.acceleratorTypes = props.acceleratorTypes;
        this.additionalCodeRepositories = props.additionalCodeRepositories;
        this.defaultCodeRepository = props.defaultCodeRepository;
        this.directInternetAccess = props.directInternetAccess;
        this.kmsKeyId = props.kmsKeyId;
        this.lifecycleConfigName = props.lifecycleConfigName;
        this.notebookInstanceName = props.notebookInstanceName;
        this.platformIdentifier = props.platformIdentifier;
        this.rootAccess = props.rootAccess;
        this.securityGroupIds = props.securityGroupIds;
        this.subnetId = props.subnetId;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::NotebookInstance", props.tags, { tagPropertyName: 'tags' });
        this.volumeSizeInGb = props.volumeSizeInGb;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnNotebookInstance.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            instanceType: this.instanceType,
            roleArn: this.roleArn,
            acceleratorTypes: this.acceleratorTypes,
            additionalCodeRepositories: this.additionalCodeRepositories,
            defaultCodeRepository: this.defaultCodeRepository,
            directInternetAccess: this.directInternetAccess,
            kmsKeyId: this.kmsKeyId,
            lifecycleConfigName: this.lifecycleConfigName,
            notebookInstanceName: this.notebookInstanceName,
            platformIdentifier: this.platformIdentifier,
            rootAccess: this.rootAccess,
            securityGroupIds: this.securityGroupIds,
            subnetId: this.subnetId,
            tags: this.tags.renderTags(),
            volumeSizeInGb: this.volumeSizeInGb,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnNotebookInstancePropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnNotebookInstanceLifecycleConfig`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstancelifecycleconfig.html
 */
export interface CfnNotebookInstanceLifecycleConfigProps {

    /**
     * The name of the lifecycle configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstancelifecycleconfig.html#cfn-sagemaker-notebookinstancelifecycleconfig-notebookinstancelifecycleconfigname
     */
    readonly notebookInstanceLifecycleConfigName?: string;

    /**
     * A shell script that runs only once, when you create a notebook instance. The shell script must be a base64-encoded string.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstancelifecycleconfig.html#cfn-sagemaker-notebookinstancelifecycleconfig-oncreate
     */
    readonly onCreate?: Array<CfnNotebookInstanceLifecycleConfig.NotebookInstanceLifecycleHookProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A shell script that runs every time you start a notebook instance, including when you create the notebook instance. The shell script must be a base64-encoded string.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstancelifecycleconfig.html#cfn-sagemaker-notebookinstancelifecycleconfig-onstart
     */
    readonly onStart?: Array<CfnNotebookInstanceLifecycleConfig.NotebookInstanceLifecycleHookProperty | cdk.IResolvable> | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnNotebookInstanceLifecycleConfigProps`
 *
 * @param properties - the TypeScript properties of a `CfnNotebookInstanceLifecycleConfigProps`
 *
 * @returns the result of the validation.
 */
function CfnNotebookInstanceLifecycleConfigPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('notebookInstanceLifecycleConfigName', cdk.validateString)(properties.notebookInstanceLifecycleConfigName));
    errors.collect(cdk.propertyValidator('onCreate', cdk.listValidator(CfnNotebookInstanceLifecycleConfig_NotebookInstanceLifecycleHookPropertyValidator))(properties.onCreate));
    errors.collect(cdk.propertyValidator('onStart', cdk.listValidator(CfnNotebookInstanceLifecycleConfig_NotebookInstanceLifecycleHookPropertyValidator))(properties.onStart));
    return errors.wrap('supplied properties not correct for "CfnNotebookInstanceLifecycleConfigProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::NotebookInstanceLifecycleConfig` resource
 *
 * @param properties - the TypeScript properties of a `CfnNotebookInstanceLifecycleConfigProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::NotebookInstanceLifecycleConfig` resource.
 */
// @ts-ignore TS6133
function cfnNotebookInstanceLifecycleConfigPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnNotebookInstanceLifecycleConfigPropsValidator(properties).assertSuccess();
    return {
        NotebookInstanceLifecycleConfigName: cdk.stringToCloudFormation(properties.notebookInstanceLifecycleConfigName),
        OnCreate: cdk.listMapper(cfnNotebookInstanceLifecycleConfigNotebookInstanceLifecycleHookPropertyToCloudFormation)(properties.onCreate),
        OnStart: cdk.listMapper(cfnNotebookInstanceLifecycleConfigNotebookInstanceLifecycleHookPropertyToCloudFormation)(properties.onStart),
    };
}

// @ts-ignore TS6133
function CfnNotebookInstanceLifecycleConfigPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnNotebookInstanceLifecycleConfigProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnNotebookInstanceLifecycleConfigProps>();
    ret.addPropertyResult('notebookInstanceLifecycleConfigName', 'NotebookInstanceLifecycleConfigName', properties.NotebookInstanceLifecycleConfigName != null ? cfn_parse.FromCloudFormation.getString(properties.NotebookInstanceLifecycleConfigName) : undefined);
    ret.addPropertyResult('onCreate', 'OnCreate', properties.OnCreate != null ? cfn_parse.FromCloudFormation.getArray(CfnNotebookInstanceLifecycleConfigNotebookInstanceLifecycleHookPropertyFromCloudFormation)(properties.OnCreate) : undefined);
    ret.addPropertyResult('onStart', 'OnStart', properties.OnStart != null ? cfn_parse.FromCloudFormation.getArray(CfnNotebookInstanceLifecycleConfigNotebookInstanceLifecycleHookPropertyFromCloudFormation)(properties.OnStart) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::NotebookInstanceLifecycleConfig`
 *
 * The `AWS::SageMaker::NotebookInstanceLifecycleConfig` resource creates shell scripts that run when you create and/or start a notebook instance. For information about notebook instance lifecycle configurations, see [Customize a Notebook Instance](https://docs.aws.amazon.com/sagemaker/latest/dg/notebook-lifecycle-config.html) in the *Amazon SageMaker Developer Guide* .
 *
 * @cloudformationResource AWS::SageMaker::NotebookInstanceLifecycleConfig
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstancelifecycleconfig.html
 */
export class CfnNotebookInstanceLifecycleConfig extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::NotebookInstanceLifecycleConfig";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnNotebookInstanceLifecycleConfig {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnNotebookInstanceLifecycleConfigPropsFromCloudFormation(resourceProperties);
        const ret = new CfnNotebookInstanceLifecycleConfig(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the lifecycle configuration, such as `MyLifecycleConfig` .
     * @cloudformationAttribute NotebookInstanceLifecycleConfigName
     */
    public readonly attrNotebookInstanceLifecycleConfigName: string;

    /**
     * The name of the lifecycle configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstancelifecycleconfig.html#cfn-sagemaker-notebookinstancelifecycleconfig-notebookinstancelifecycleconfigname
     */
    public notebookInstanceLifecycleConfigName: string | undefined;

    /**
     * A shell script that runs only once, when you create a notebook instance. The shell script must be a base64-encoded string.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstancelifecycleconfig.html#cfn-sagemaker-notebookinstancelifecycleconfig-oncreate
     */
    public onCreate: Array<CfnNotebookInstanceLifecycleConfig.NotebookInstanceLifecycleHookProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * A shell script that runs every time you start a notebook instance, including when you create the notebook instance. The shell script must be a base64-encoded string.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstancelifecycleconfig.html#cfn-sagemaker-notebookinstancelifecycleconfig-onstart
     */
    public onStart: Array<CfnNotebookInstanceLifecycleConfig.NotebookInstanceLifecycleHookProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::SageMaker::NotebookInstanceLifecycleConfig`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnNotebookInstanceLifecycleConfigProps = {}) {
        super(scope, id, { type: CfnNotebookInstanceLifecycleConfig.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrNotebookInstanceLifecycleConfigName = cdk.Token.asString(this.getAtt('NotebookInstanceLifecycleConfigName'));

        this.notebookInstanceLifecycleConfigName = props.notebookInstanceLifecycleConfigName;
        this.onCreate = props.onCreate;
        this.onStart = props.onStart;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnNotebookInstanceLifecycleConfig.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            notebookInstanceLifecycleConfigName: this.notebookInstanceLifecycleConfigName,
            onCreate: this.onCreate,
            onStart: this.onStart,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnNotebookInstanceLifecycleConfigPropsToCloudFormation(props);
    }
}

export namespace CfnNotebookInstanceLifecycleConfig {
    /**
     * Specifies the notebook instance lifecycle configuration script. Each lifecycle configuration script has a limit of 16384 characters.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-notebookinstancelifecycleconfig-notebookinstancelifecyclehook.html
     */
    export interface NotebookInstanceLifecycleHookProperty {
        /**
         * A base64-encoded string that contains a shell script for a notebook instance lifecycle configuration.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-notebookinstancelifecycleconfig-notebookinstancelifecyclehook.html#cfn-sagemaker-notebookinstancelifecycleconfig-notebookinstancelifecyclehook-content
         */
        readonly content?: string;
    }
}

/**
 * Determine whether the given properties match those of a `NotebookInstanceLifecycleHookProperty`
 *
 * @param properties - the TypeScript properties of a `NotebookInstanceLifecycleHookProperty`
 *
 * @returns the result of the validation.
 */
function CfnNotebookInstanceLifecycleConfig_NotebookInstanceLifecycleHookPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('content', cdk.validateString)(properties.content));
    return errors.wrap('supplied properties not correct for "NotebookInstanceLifecycleHookProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::NotebookInstanceLifecycleConfig.NotebookInstanceLifecycleHook` resource
 *
 * @param properties - the TypeScript properties of a `NotebookInstanceLifecycleHookProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::NotebookInstanceLifecycleConfig.NotebookInstanceLifecycleHook` resource.
 */
// @ts-ignore TS6133
function cfnNotebookInstanceLifecycleConfigNotebookInstanceLifecycleHookPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnNotebookInstanceLifecycleConfig_NotebookInstanceLifecycleHookPropertyValidator(properties).assertSuccess();
    return {
        Content: cdk.stringToCloudFormation(properties.content),
    };
}

// @ts-ignore TS6133
function CfnNotebookInstanceLifecycleConfigNotebookInstanceLifecycleHookPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnNotebookInstanceLifecycleConfig.NotebookInstanceLifecycleHookProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnNotebookInstanceLifecycleConfig.NotebookInstanceLifecycleHookProperty>();
    ret.addPropertyResult('content', 'Content', properties.Content != null ? cfn_parse.FromCloudFormation.getString(properties.Content) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnPipeline`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html
 */
export interface CfnPipelineProps {

    /**
     * The definition of the pipeline. This can be either a JSON string or an Amazon S3 location.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html#cfn-sagemaker-pipeline-pipelinedefinition
     */
    readonly pipelineDefinition: any | cdk.IResolvable;

    /**
     * The name of the pipeline.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html#cfn-sagemaker-pipeline-pipelinename
     */
    readonly pipelineName: string;

    /**
     * The Amazon Resource Name (ARN) of the IAM role used to execute the pipeline.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html#cfn-sagemaker-pipeline-rolearn
     */
    readonly roleArn: string;

    /**
     * `AWS::SageMaker::Pipeline.ParallelismConfiguration`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html#cfn-sagemaker-pipeline-parallelismconfiguration
     */
    readonly parallelismConfiguration?: any | cdk.IResolvable;

    /**
     * The description of the pipeline.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html#cfn-sagemaker-pipeline-pipelinedescription
     */
    readonly pipelineDescription?: string;

    /**
     * The display name of the pipeline.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html#cfn-sagemaker-pipeline-pipelinedisplayname
     */
    readonly pipelineDisplayName?: string;

    /**
     * The tags of the pipeline.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html#cfn-sagemaker-pipeline-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnPipelineProps`
 *
 * @param properties - the TypeScript properties of a `CfnPipelineProps`
 *
 * @returns the result of the validation.
 */
function CfnPipelinePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('parallelismConfiguration', cdk.validateObject)(properties.parallelismConfiguration));
    errors.collect(cdk.propertyValidator('pipelineDefinition', cdk.requiredValidator)(properties.pipelineDefinition));
    errors.collect(cdk.propertyValidator('pipelineDefinition', cdk.validateObject)(properties.pipelineDefinition));
    errors.collect(cdk.propertyValidator('pipelineDescription', cdk.validateString)(properties.pipelineDescription));
    errors.collect(cdk.propertyValidator('pipelineDisplayName', cdk.validateString)(properties.pipelineDisplayName));
    errors.collect(cdk.propertyValidator('pipelineName', cdk.requiredValidator)(properties.pipelineName));
    errors.collect(cdk.propertyValidator('pipelineName', cdk.validateString)(properties.pipelineName));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnPipelineProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Pipeline` resource
 *
 * @param properties - the TypeScript properties of a `CfnPipelineProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Pipeline` resource.
 */
// @ts-ignore TS6133
function cfnPipelinePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPipelinePropsValidator(properties).assertSuccess();
    return {
        PipelineDefinition: cdk.objectToCloudFormation(properties.pipelineDefinition),
        PipelineName: cdk.stringToCloudFormation(properties.pipelineName),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        ParallelismConfiguration: cdk.objectToCloudFormation(properties.parallelismConfiguration),
        PipelineDescription: cdk.stringToCloudFormation(properties.pipelineDescription),
        PipelineDisplayName: cdk.stringToCloudFormation(properties.pipelineDisplayName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnPipelinePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPipelineProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPipelineProps>();
    ret.addPropertyResult('pipelineDefinition', 'PipelineDefinition', cfn_parse.FromCloudFormation.getAny(properties.PipelineDefinition));
    ret.addPropertyResult('pipelineName', 'PipelineName', cfn_parse.FromCloudFormation.getString(properties.PipelineName));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('parallelismConfiguration', 'ParallelismConfiguration', properties.ParallelismConfiguration != null ? cfn_parse.FromCloudFormation.getAny(properties.ParallelismConfiguration) : undefined);
    ret.addPropertyResult('pipelineDescription', 'PipelineDescription', properties.PipelineDescription != null ? cfn_parse.FromCloudFormation.getString(properties.PipelineDescription) : undefined);
    ret.addPropertyResult('pipelineDisplayName', 'PipelineDisplayName', properties.PipelineDisplayName != null ? cfn_parse.FromCloudFormation.getString(properties.PipelineDisplayName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::Pipeline`
 *
 * The `AWS::SageMaker::Pipeline` resource creates shell scripts that run when you create and/or start a SageMaker Pipeline. For information about SageMaker Pipelines, see [SageMaker Pipelines](https://docs.aws.amazon.com/sagemaker/latest/dg/pipelines.html) in the *Amazon SageMaker Developer Guide* .
 *
 * @cloudformationResource AWS::SageMaker::Pipeline
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html
 */
export class CfnPipeline extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::Pipeline";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnPipeline {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnPipelinePropsFromCloudFormation(resourceProperties);
        const ret = new CfnPipeline(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The definition of the pipeline. This can be either a JSON string or an Amazon S3 location.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html#cfn-sagemaker-pipeline-pipelinedefinition
     */
    public pipelineDefinition: any | cdk.IResolvable;

    /**
     * The name of the pipeline.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html#cfn-sagemaker-pipeline-pipelinename
     */
    public pipelineName: string;

    /**
     * The Amazon Resource Name (ARN) of the IAM role used to execute the pipeline.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html#cfn-sagemaker-pipeline-rolearn
     */
    public roleArn: string;

    /**
     * `AWS::SageMaker::Pipeline.ParallelismConfiguration`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html#cfn-sagemaker-pipeline-parallelismconfiguration
     */
    public parallelismConfiguration: any | cdk.IResolvable | undefined;

    /**
     * The description of the pipeline.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html#cfn-sagemaker-pipeline-pipelinedescription
     */
    public pipelineDescription: string | undefined;

    /**
     * The display name of the pipeline.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html#cfn-sagemaker-pipeline-pipelinedisplayname
     */
    public pipelineDisplayName: string | undefined;

    /**
     * The tags of the pipeline.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-pipeline.html#cfn-sagemaker-pipeline-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::Pipeline`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPipelineProps) {
        super(scope, id, { type: CfnPipeline.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'pipelineDefinition', this);
        cdk.requireProperty(props, 'pipelineName', this);
        cdk.requireProperty(props, 'roleArn', this);

        this.pipelineDefinition = props.pipelineDefinition;
        this.pipelineName = props.pipelineName;
        this.roleArn = props.roleArn;
        this.parallelismConfiguration = props.parallelismConfiguration;
        this.pipelineDescription = props.pipelineDescription;
        this.pipelineDisplayName = props.pipelineDisplayName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::Pipeline", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnPipeline.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            pipelineDefinition: this.pipelineDefinition,
            pipelineName: this.pipelineName,
            roleArn: this.roleArn,
            parallelismConfiguration: this.parallelismConfiguration,
            pipelineDescription: this.pipelineDescription,
            pipelineDisplayName: this.pipelineDisplayName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPipelinePropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnProject`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-project.html
 */
export interface CfnProjectProps {

    /**
     * The name of the project.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-project.html#cfn-sagemaker-project-projectname
     */
    readonly projectName: string;

    /**
     * The product ID and provisioning artifact ID to provision a service catalog. For information, see [What is AWS Service Catalog](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-project.html#cfn-sagemaker-project-servicecatalogprovisioningdetails
     */
    readonly serviceCatalogProvisioningDetails: any | cdk.IResolvable;

    /**
     * The description of the project.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-project.html#cfn-sagemaker-project-projectdescription
     */
    readonly projectDescription?: string;

    /**
     * A list of key-value pairs to apply to this resource.
     *
     * For more information, see [Resource Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) and [Using Cost Allocation Tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#allocation-what) in the *AWS Billing and Cost Management User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-project.html#cfn-sagemaker-project-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnProjectProps`
 *
 * @param properties - the TypeScript properties of a `CfnProjectProps`
 *
 * @returns the result of the validation.
 */
function CfnProjectPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('projectDescription', cdk.validateString)(properties.projectDescription));
    errors.collect(cdk.propertyValidator('projectName', cdk.requiredValidator)(properties.projectName));
    errors.collect(cdk.propertyValidator('projectName', cdk.validateString)(properties.projectName));
    errors.collect(cdk.propertyValidator('serviceCatalogProvisioningDetails', cdk.requiredValidator)(properties.serviceCatalogProvisioningDetails));
    errors.collect(cdk.propertyValidator('serviceCatalogProvisioningDetails', cdk.validateObject)(properties.serviceCatalogProvisioningDetails));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnProjectProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Project` resource
 *
 * @param properties - the TypeScript properties of a `CfnProjectProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Project` resource.
 */
// @ts-ignore TS6133
function cfnProjectPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnProjectPropsValidator(properties).assertSuccess();
    return {
        ProjectName: cdk.stringToCloudFormation(properties.projectName),
        ServiceCatalogProvisioningDetails: cdk.objectToCloudFormation(properties.serviceCatalogProvisioningDetails),
        ProjectDescription: cdk.stringToCloudFormation(properties.projectDescription),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnProjectPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnProjectProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnProjectProps>();
    ret.addPropertyResult('projectName', 'ProjectName', cfn_parse.FromCloudFormation.getString(properties.ProjectName));
    ret.addPropertyResult('serviceCatalogProvisioningDetails', 'ServiceCatalogProvisioningDetails', cfn_parse.FromCloudFormation.getAny(properties.ServiceCatalogProvisioningDetails));
    ret.addPropertyResult('projectDescription', 'ProjectDescription', properties.ProjectDescription != null ? cfn_parse.FromCloudFormation.getString(properties.ProjectDescription) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::Project`
 *
 * Creates a machine learning (ML) project that can contain one or more templates that set up an ML pipeline from training to deploying an approved model.
 *
 * @cloudformationResource AWS::SageMaker::Project
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-project.html
 */
export class CfnProject extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::Project";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnProject {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnProjectPropsFromCloudFormation(resourceProperties);
        const ret = new CfnProject(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The time that the project was created.
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: string;

    /**
     * The Amazon Resource Name (ARN) of the project.
     * @cloudformationAttribute ProjectArn
     */
    public readonly attrProjectArn: string;

    /**
     * The ID of the project. This ID is prepended to all entities associated with this project.
     * @cloudformationAttribute ProjectId
     */
    public readonly attrProjectId: string;

    /**
     * The status of the project.
     * @cloudformationAttribute ProjectStatus
     */
    public readonly attrProjectStatus: string;

    /**
     * The name of the project.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-project.html#cfn-sagemaker-project-projectname
     */
    public projectName: string;

    /**
     * The product ID and provisioning artifact ID to provision a service catalog. For information, see [What is AWS Service Catalog](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-project.html#cfn-sagemaker-project-servicecatalogprovisioningdetails
     */
    public serviceCatalogProvisioningDetails: any | cdk.IResolvable;

    /**
     * The description of the project.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-project.html#cfn-sagemaker-project-projectdescription
     */
    public projectDescription: string | undefined;

    /**
     * A list of key-value pairs to apply to this resource.
     *
     * For more information, see [Resource Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) and [Using Cost Allocation Tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#allocation-what) in the *AWS Billing and Cost Management User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-project.html#cfn-sagemaker-project-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SageMaker::Project`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnProjectProps) {
        super(scope, id, { type: CfnProject.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'projectName', this);
        cdk.requireProperty(props, 'serviceCatalogProvisioningDetails', this);
        this.attrCreationTime = cdk.Token.asString(this.getAtt('CreationTime'));
        this.attrProjectArn = cdk.Token.asString(this.getAtt('ProjectArn'));
        this.attrProjectId = cdk.Token.asString(this.getAtt('ProjectId'));
        this.attrProjectStatus = cdk.Token.asString(this.getAtt('ProjectStatus'));

        this.projectName = props.projectName;
        this.serviceCatalogProvisioningDetails = props.serviceCatalogProvisioningDetails;
        this.projectDescription = props.projectDescription;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::Project", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnProject.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            projectName: this.projectName,
            serviceCatalogProvisioningDetails: this.serviceCatalogProvisioningDetails,
            projectDescription: this.projectDescription,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnProjectPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnUserProfile`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-userprofile.html
 */
export interface CfnUserProfileProps {

    /**
     * The domain ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-userprofile.html#cfn-sagemaker-userprofile-domainid
     */
    readonly domainId: string;

    /**
     * The user profile name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-userprofile.html#cfn-sagemaker-userprofile-userprofilename
     */
    readonly userProfileName: string;

    /**
     * A specifier for the type of value specified in SingleSignOnUserValue. Currently, the only supported value is "UserName". If the Domain's AuthMode is SSO, this field is required. If the Domain's AuthMode is not SSO, this field cannot be specified.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-userprofile.html#cfn-sagemaker-userprofile-singlesignonuseridentifier
     */
    readonly singleSignOnUserIdentifier?: string;

    /**
     * The username of the associated AWS Single Sign-On User for this UserProfile. If the Domain's AuthMode is SSO, this field is required, and must match a valid username of a user in your directory. If the Domain's AuthMode is not SSO, this field cannot be specified.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-userprofile.html#cfn-sagemaker-userprofile-singlesignonuservalue
     */
    readonly singleSignOnUserValue?: string;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * Tags that you specify for the User Profile are also added to all apps that the User Profile launches.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-userprofile.html#cfn-sagemaker-userprofile-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * A collection of settings that apply to users of Amazon SageMaker Studio.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-userprofile.html#cfn-sagemaker-userprofile-usersettings
     */
    readonly userSettings?: CfnUserProfile.UserSettingsProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnUserProfileProps`
 *
 * @param properties - the TypeScript properties of a `CfnUserProfileProps`
 *
 * @returns the result of the validation.
 */
function CfnUserProfilePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('domainId', cdk.requiredValidator)(properties.domainId));
    errors.collect(cdk.propertyValidator('domainId', cdk.validateString)(properties.domainId));
    errors.collect(cdk.propertyValidator('singleSignOnUserIdentifier', cdk.validateString)(properties.singleSignOnUserIdentifier));
    errors.collect(cdk.propertyValidator('singleSignOnUserValue', cdk.validateString)(properties.singleSignOnUserValue));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('userProfileName', cdk.requiredValidator)(properties.userProfileName));
    errors.collect(cdk.propertyValidator('userProfileName', cdk.validateString)(properties.userProfileName));
    errors.collect(cdk.propertyValidator('userSettings', CfnUserProfile_UserSettingsPropertyValidator)(properties.userSettings));
    return errors.wrap('supplied properties not correct for "CfnUserProfileProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile` resource
 *
 * @param properties - the TypeScript properties of a `CfnUserProfileProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile` resource.
 */
// @ts-ignore TS6133
function cfnUserProfilePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUserProfilePropsValidator(properties).assertSuccess();
    return {
        DomainId: cdk.stringToCloudFormation(properties.domainId),
        UserProfileName: cdk.stringToCloudFormation(properties.userProfileName),
        SingleSignOnUserIdentifier: cdk.stringToCloudFormation(properties.singleSignOnUserIdentifier),
        SingleSignOnUserValue: cdk.stringToCloudFormation(properties.singleSignOnUserValue),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        UserSettings: cfnUserProfileUserSettingsPropertyToCloudFormation(properties.userSettings),
    };
}

// @ts-ignore TS6133
function CfnUserProfilePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUserProfileProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUserProfileProps>();
    ret.addPropertyResult('domainId', 'DomainId', cfn_parse.FromCloudFormation.getString(properties.DomainId));
    ret.addPropertyResult('userProfileName', 'UserProfileName', cfn_parse.FromCloudFormation.getString(properties.UserProfileName));
    ret.addPropertyResult('singleSignOnUserIdentifier', 'SingleSignOnUserIdentifier', properties.SingleSignOnUserIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.SingleSignOnUserIdentifier) : undefined);
    ret.addPropertyResult('singleSignOnUserValue', 'SingleSignOnUserValue', properties.SingleSignOnUserValue != null ? cfn_parse.FromCloudFormation.getString(properties.SingleSignOnUserValue) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('userSettings', 'UserSettings', properties.UserSettings != null ? CfnUserProfileUserSettingsPropertyFromCloudFormation(properties.UserSettings) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::UserProfile`
 *
 * Creates a user profile. A user profile represents a single user within a domain, and is the main way to reference a "person" for the purposes of sharing, reporting, and other user-oriented features. This entity is created when a user onboards to Amazon SageMaker Studio. If an administrator invites a person by email or imports them from SSO, a user profile is automatically created. A user profile is the primary holder of settings for an individual user and has a reference to the user's private Amazon Elastic File System (EFS) home directory.
 *
 * @cloudformationResource AWS::SageMaker::UserProfile
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-userprofile.html
 */
export class CfnUserProfile extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::UserProfile";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnUserProfile {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnUserProfilePropsFromCloudFormation(resourceProperties);
        const ret = new CfnUserProfile(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the user profile, such as `arn:aws:sagemaker:us-west-2:account-id:user-profile/my-user-profile` .
     * @cloudformationAttribute UserProfileArn
     */
    public readonly attrUserProfileArn: string;

    /**
     * The domain ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-userprofile.html#cfn-sagemaker-userprofile-domainid
     */
    public domainId: string;

    /**
     * The user profile name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-userprofile.html#cfn-sagemaker-userprofile-userprofilename
     */
    public userProfileName: string;

    /**
     * A specifier for the type of value specified in SingleSignOnUserValue. Currently, the only supported value is "UserName". If the Domain's AuthMode is SSO, this field is required. If the Domain's AuthMode is not SSO, this field cannot be specified.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-userprofile.html#cfn-sagemaker-userprofile-singlesignonuseridentifier
     */
    public singleSignOnUserIdentifier: string | undefined;

    /**
     * The username of the associated AWS Single Sign-On User for this UserProfile. If the Domain's AuthMode is SSO, this field is required, and must match a valid username of a user in your directory. If the Domain's AuthMode is not SSO, this field cannot be specified.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-userprofile.html#cfn-sagemaker-userprofile-singlesignonuservalue
     */
    public singleSignOnUserValue: string | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * Tags that you specify for the User Profile are also added to all apps that the User Profile launches.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-userprofile.html#cfn-sagemaker-userprofile-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * A collection of settings that apply to users of Amazon SageMaker Studio.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-userprofile.html#cfn-sagemaker-userprofile-usersettings
     */
    public userSettings: CfnUserProfile.UserSettingsProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::SageMaker::UserProfile`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnUserProfileProps) {
        super(scope, id, { type: CfnUserProfile.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'domainId', this);
        cdk.requireProperty(props, 'userProfileName', this);
        this.attrUserProfileArn = cdk.Token.asString(this.getAtt('UserProfileArn'));

        this.domainId = props.domainId;
        this.userProfileName = props.userProfileName;
        this.singleSignOnUserIdentifier = props.singleSignOnUserIdentifier;
        this.singleSignOnUserValue = props.singleSignOnUserValue;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::UserProfile", props.tags, { tagPropertyName: 'tags' });
        this.userSettings = props.userSettings;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnUserProfile.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            domainId: this.domainId,
            userProfileName: this.userProfileName,
            singleSignOnUserIdentifier: this.singleSignOnUserIdentifier,
            singleSignOnUserValue: this.singleSignOnUserValue,
            tags: this.tags.renderTags(),
            userSettings: this.userSettings,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnUserProfilePropsToCloudFormation(props);
    }
}

export namespace CfnUserProfile {
    /**
     * A custom SageMaker image. For more information, see [Bring your own SageMaker image](https://docs.aws.amazon.com/sagemaker/latest/dg/studio-byoi.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-customimage.html
     */
    export interface CustomImageProperty {
        /**
         * The name of the AppImageConfig.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-customimage.html#cfn-sagemaker-userprofile-customimage-appimageconfigname
         */
        readonly appImageConfigName: string;
        /**
         * The name of the CustomImage. Must be unique to your account.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-customimage.html#cfn-sagemaker-userprofile-customimage-imagename
         */
        readonly imageName: string;
        /**
         * The version number of the CustomImage.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-customimage.html#cfn-sagemaker-userprofile-customimage-imageversionnumber
         */
        readonly imageVersionNumber?: number;
    }
}

/**
 * Determine whether the given properties match those of a `CustomImageProperty`
 *
 * @param properties - the TypeScript properties of a `CustomImageProperty`
 *
 * @returns the result of the validation.
 */
function CfnUserProfile_CustomImagePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('appImageConfigName', cdk.requiredValidator)(properties.appImageConfigName));
    errors.collect(cdk.propertyValidator('appImageConfigName', cdk.validateString)(properties.appImageConfigName));
    errors.collect(cdk.propertyValidator('imageName', cdk.requiredValidator)(properties.imageName));
    errors.collect(cdk.propertyValidator('imageName', cdk.validateString)(properties.imageName));
    errors.collect(cdk.propertyValidator('imageVersionNumber', cdk.validateNumber)(properties.imageVersionNumber));
    return errors.wrap('supplied properties not correct for "CustomImageProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile.CustomImage` resource
 *
 * @param properties - the TypeScript properties of a `CustomImageProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile.CustomImage` resource.
 */
// @ts-ignore TS6133
function cfnUserProfileCustomImagePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUserProfile_CustomImagePropertyValidator(properties).assertSuccess();
    return {
        AppImageConfigName: cdk.stringToCloudFormation(properties.appImageConfigName),
        ImageName: cdk.stringToCloudFormation(properties.imageName),
        ImageVersionNumber: cdk.numberToCloudFormation(properties.imageVersionNumber),
    };
}

// @ts-ignore TS6133
function CfnUserProfileCustomImagePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUserProfile.CustomImageProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUserProfile.CustomImageProperty>();
    ret.addPropertyResult('appImageConfigName', 'AppImageConfigName', cfn_parse.FromCloudFormation.getString(properties.AppImageConfigName));
    ret.addPropertyResult('imageName', 'ImageName', cfn_parse.FromCloudFormation.getString(properties.ImageName));
    ret.addPropertyResult('imageVersionNumber', 'ImageVersionNumber', properties.ImageVersionNumber != null ? cfn_parse.FromCloudFormation.getNumber(properties.ImageVersionNumber) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnUserProfile {
    /**
     * The JupyterServer app settings.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-jupyterserverappsettings.html
     */
    export interface JupyterServerAppSettingsProperty {
        /**
         * The default instance type and the Amazon Resource Name (ARN) of the default SageMaker image used by the JupyterServer app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-jupyterserverappsettings.html#cfn-sagemaker-userprofile-jupyterserverappsettings-defaultresourcespec
         */
        readonly defaultResourceSpec?: CfnUserProfile.ResourceSpecProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `JupyterServerAppSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `JupyterServerAppSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnUserProfile_JupyterServerAppSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('defaultResourceSpec', CfnUserProfile_ResourceSpecPropertyValidator)(properties.defaultResourceSpec));
    return errors.wrap('supplied properties not correct for "JupyterServerAppSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile.JupyterServerAppSettings` resource
 *
 * @param properties - the TypeScript properties of a `JupyterServerAppSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile.JupyterServerAppSettings` resource.
 */
// @ts-ignore TS6133
function cfnUserProfileJupyterServerAppSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUserProfile_JupyterServerAppSettingsPropertyValidator(properties).assertSuccess();
    return {
        DefaultResourceSpec: cfnUserProfileResourceSpecPropertyToCloudFormation(properties.defaultResourceSpec),
    };
}

// @ts-ignore TS6133
function CfnUserProfileJupyterServerAppSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUserProfile.JupyterServerAppSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUserProfile.JupyterServerAppSettingsProperty>();
    ret.addPropertyResult('defaultResourceSpec', 'DefaultResourceSpec', properties.DefaultResourceSpec != null ? CfnUserProfileResourceSpecPropertyFromCloudFormation(properties.DefaultResourceSpec) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnUserProfile {
    /**
     * The KernelGateway app settings.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-kernelgatewayappsettings.html
     */
    export interface KernelGatewayAppSettingsProperty {
        /**
         * A list of custom SageMaker images that are configured to run as a KernelGateway app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-kernelgatewayappsettings.html#cfn-sagemaker-userprofile-kernelgatewayappsettings-customimages
         */
        readonly customImages?: Array<CfnUserProfile.CustomImageProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The default instance type and the Amazon Resource Name (ARN) of the default SageMaker image used by the KernelGateway app.
         *
         * > The Amazon SageMaker Studio UI does not use the default instance type value set here. The default instance type set here is used when Apps are created using the AWS Command Line Interface or AWS CloudFormation and the instance type parameter value is not passed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-kernelgatewayappsettings.html#cfn-sagemaker-userprofile-kernelgatewayappsettings-defaultresourcespec
         */
        readonly defaultResourceSpec?: CfnUserProfile.ResourceSpecProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `KernelGatewayAppSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `KernelGatewayAppSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnUserProfile_KernelGatewayAppSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('customImages', cdk.listValidator(CfnUserProfile_CustomImagePropertyValidator))(properties.customImages));
    errors.collect(cdk.propertyValidator('defaultResourceSpec', CfnUserProfile_ResourceSpecPropertyValidator)(properties.defaultResourceSpec));
    return errors.wrap('supplied properties not correct for "KernelGatewayAppSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile.KernelGatewayAppSettings` resource
 *
 * @param properties - the TypeScript properties of a `KernelGatewayAppSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile.KernelGatewayAppSettings` resource.
 */
// @ts-ignore TS6133
function cfnUserProfileKernelGatewayAppSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUserProfile_KernelGatewayAppSettingsPropertyValidator(properties).assertSuccess();
    return {
        CustomImages: cdk.listMapper(cfnUserProfileCustomImagePropertyToCloudFormation)(properties.customImages),
        DefaultResourceSpec: cfnUserProfileResourceSpecPropertyToCloudFormation(properties.defaultResourceSpec),
    };
}

// @ts-ignore TS6133
function CfnUserProfileKernelGatewayAppSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUserProfile.KernelGatewayAppSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUserProfile.KernelGatewayAppSettingsProperty>();
    ret.addPropertyResult('customImages', 'CustomImages', properties.CustomImages != null ? cfn_parse.FromCloudFormation.getArray(CfnUserProfileCustomImagePropertyFromCloudFormation)(properties.CustomImages) : undefined);
    ret.addPropertyResult('defaultResourceSpec', 'DefaultResourceSpec', properties.DefaultResourceSpec != null ? CfnUserProfileResourceSpecPropertyFromCloudFormation(properties.DefaultResourceSpec) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnUserProfile {
    /**
     * A collection of settings that configure user interaction with the `RStudioServerPro` app. `RStudioServerProAppSettings` cannot be updated. The `RStudioServerPro` app must be deleted and a new one created to make any changes.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-rstudioserverproappsettings.html
     */
    export interface RStudioServerProAppSettingsProperty {
        /**
         * Indicates whether the current user has access to the `RStudioServerPro` app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-rstudioserverproappsettings.html#cfn-sagemaker-userprofile-rstudioserverproappsettings-accessstatus
         */
        readonly accessStatus?: string;
        /**
         * The level of permissions that the user has within the `RStudioServerPro` app. This value defaults to `User`. The `Admin` value allows the user access to the RStudio Administrative Dashboard.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-rstudioserverproappsettings.html#cfn-sagemaker-userprofile-rstudioserverproappsettings-usergroup
         */
        readonly userGroup?: string;
    }
}

/**
 * Determine whether the given properties match those of a `RStudioServerProAppSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `RStudioServerProAppSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnUserProfile_RStudioServerProAppSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessStatus', cdk.validateString)(properties.accessStatus));
    errors.collect(cdk.propertyValidator('userGroup', cdk.validateString)(properties.userGroup));
    return errors.wrap('supplied properties not correct for "RStudioServerProAppSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile.RStudioServerProAppSettings` resource
 *
 * @param properties - the TypeScript properties of a `RStudioServerProAppSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile.RStudioServerProAppSettings` resource.
 */
// @ts-ignore TS6133
function cfnUserProfileRStudioServerProAppSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUserProfile_RStudioServerProAppSettingsPropertyValidator(properties).assertSuccess();
    return {
        AccessStatus: cdk.stringToCloudFormation(properties.accessStatus),
        UserGroup: cdk.stringToCloudFormation(properties.userGroup),
    };
}

// @ts-ignore TS6133
function CfnUserProfileRStudioServerProAppSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUserProfile.RStudioServerProAppSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUserProfile.RStudioServerProAppSettingsProperty>();
    ret.addPropertyResult('accessStatus', 'AccessStatus', properties.AccessStatus != null ? cfn_parse.FromCloudFormation.getString(properties.AccessStatus) : undefined);
    ret.addPropertyResult('userGroup', 'UserGroup', properties.UserGroup != null ? cfn_parse.FromCloudFormation.getString(properties.UserGroup) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnUserProfile {
    /**
     * Specifies the ARN's of a SageMaker image and SageMaker image version, and the instance type that the version runs on.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-resourcespec.html
     */
    export interface ResourceSpecProperty {
        /**
         * The instance type that the image version runs on.
         *
         * > JupyterServer Apps only support the `system` value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-resourcespec.html#cfn-sagemaker-userprofile-resourcespec-instancetype
         */
        readonly instanceType?: string;
        /**
         * The ARN of the SageMaker image that the image version belongs to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-resourcespec.html#cfn-sagemaker-userprofile-resourcespec-sagemakerimagearn
         */
        readonly sageMakerImageArn?: string;
        /**
         * The ARN of the image version created on the instance.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-resourcespec.html#cfn-sagemaker-userprofile-resourcespec-sagemakerimageversionarn
         */
        readonly sageMakerImageVersionArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ResourceSpecProperty`
 *
 * @param properties - the TypeScript properties of a `ResourceSpecProperty`
 *
 * @returns the result of the validation.
 */
function CfnUserProfile_ResourceSpecPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('sageMakerImageArn', cdk.validateString)(properties.sageMakerImageArn));
    errors.collect(cdk.propertyValidator('sageMakerImageVersionArn', cdk.validateString)(properties.sageMakerImageVersionArn));
    return errors.wrap('supplied properties not correct for "ResourceSpecProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile.ResourceSpec` resource
 *
 * @param properties - the TypeScript properties of a `ResourceSpecProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile.ResourceSpec` resource.
 */
// @ts-ignore TS6133
function cfnUserProfileResourceSpecPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUserProfile_ResourceSpecPropertyValidator(properties).assertSuccess();
    return {
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        SageMakerImageArn: cdk.stringToCloudFormation(properties.sageMakerImageArn),
        SageMakerImageVersionArn: cdk.stringToCloudFormation(properties.sageMakerImageVersionArn),
    };
}

// @ts-ignore TS6133
function CfnUserProfileResourceSpecPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUserProfile.ResourceSpecProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUserProfile.ResourceSpecProperty>();
    ret.addPropertyResult('instanceType', 'InstanceType', properties.InstanceType != null ? cfn_parse.FromCloudFormation.getString(properties.InstanceType) : undefined);
    ret.addPropertyResult('sageMakerImageArn', 'SageMakerImageArn', properties.SageMakerImageArn != null ? cfn_parse.FromCloudFormation.getString(properties.SageMakerImageArn) : undefined);
    ret.addPropertyResult('sageMakerImageVersionArn', 'SageMakerImageVersionArn', properties.SageMakerImageVersionArn != null ? cfn_parse.FromCloudFormation.getString(properties.SageMakerImageVersionArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnUserProfile {
    /**
     * Specifies options when sharing an Amazon SageMaker Studio notebook. These settings are specified as part of `DefaultUserSettings` when the [CreateDomain](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_CreateDomain.html) API is called, and as part of `UserSettings` when the [CreateUserProfile](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_CreateUserProfile.html) API is called.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-sharingsettings.html
     */
    export interface SharingSettingsProperty {
        /**
         * Whether to include the notebook cell output when sharing the notebook. The default is `Disabled` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-sharingsettings.html#cfn-sagemaker-userprofile-sharingsettings-notebookoutputoption
         */
        readonly notebookOutputOption?: string;
        /**
         * When `NotebookOutputOption` is `Allowed` , the AWS Key Management Service (KMS) encryption key ID used to encrypt the notebook cell output in the Amazon S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-sharingsettings.html#cfn-sagemaker-userprofile-sharingsettings-s3kmskeyid
         */
        readonly s3KmsKeyId?: string;
        /**
         * When `NotebookOutputOption` is `Allowed` , the Amazon S3 bucket used to store the shared notebook snapshots.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-sharingsettings.html#cfn-sagemaker-userprofile-sharingsettings-s3outputpath
         */
        readonly s3OutputPath?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SharingSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `SharingSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnUserProfile_SharingSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('notebookOutputOption', cdk.validateString)(properties.notebookOutputOption));
    errors.collect(cdk.propertyValidator('s3KmsKeyId', cdk.validateString)(properties.s3KmsKeyId));
    errors.collect(cdk.propertyValidator('s3OutputPath', cdk.validateString)(properties.s3OutputPath));
    return errors.wrap('supplied properties not correct for "SharingSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile.SharingSettings` resource
 *
 * @param properties - the TypeScript properties of a `SharingSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile.SharingSettings` resource.
 */
// @ts-ignore TS6133
function cfnUserProfileSharingSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUserProfile_SharingSettingsPropertyValidator(properties).assertSuccess();
    return {
        NotebookOutputOption: cdk.stringToCloudFormation(properties.notebookOutputOption),
        S3KmsKeyId: cdk.stringToCloudFormation(properties.s3KmsKeyId),
        S3OutputPath: cdk.stringToCloudFormation(properties.s3OutputPath),
    };
}

// @ts-ignore TS6133
function CfnUserProfileSharingSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUserProfile.SharingSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUserProfile.SharingSettingsProperty>();
    ret.addPropertyResult('notebookOutputOption', 'NotebookOutputOption', properties.NotebookOutputOption != null ? cfn_parse.FromCloudFormation.getString(properties.NotebookOutputOption) : undefined);
    ret.addPropertyResult('s3KmsKeyId', 'S3KmsKeyId', properties.S3KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.S3KmsKeyId) : undefined);
    ret.addPropertyResult('s3OutputPath', 'S3OutputPath', properties.S3OutputPath != null ? cfn_parse.FromCloudFormation.getString(properties.S3OutputPath) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnUserProfile {
    /**
     * A collection of settings that apply to users of Amazon SageMaker Studio. These settings are specified when the [CreateUserProfile](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_CreateUserProfile.html) API is called, and as `DefaultUserSettings` when the [CreateDomain](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_CreateDomain.html) API is called.
     *
     * `SecurityGroups` is aggregated when specified in both calls. For all other settings in `UserSettings` , the values specified in `CreateUserProfile` take precedence over those specified in `CreateDomain` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-usersettings.html
     */
    export interface UserSettingsProperty {
        /**
         * The execution role for the user.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-usersettings.html#cfn-sagemaker-userprofile-usersettings-executionrole
         */
        readonly executionRole?: string;
        /**
         * The Jupyter server's app settings.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-usersettings.html#cfn-sagemaker-userprofile-usersettings-jupyterserverappsettings
         */
        readonly jupyterServerAppSettings?: CfnUserProfile.JupyterServerAppSettingsProperty | cdk.IResolvable;
        /**
         * The kernel gateway app settings.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-usersettings.html#cfn-sagemaker-userprofile-usersettings-kernelgatewayappsettings
         */
        readonly kernelGatewayAppSettings?: CfnUserProfile.KernelGatewayAppSettingsProperty | cdk.IResolvable;
        /**
         * A collection of settings that configure user interaction with the `RStudioServerPro` app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-usersettings.html#cfn-sagemaker-userprofile-usersettings-rstudioserverproappsettings
         */
        readonly rStudioServerProAppSettings?: CfnUserProfile.RStudioServerProAppSettingsProperty | cdk.IResolvable;
        /**
         * The security groups for the Amazon Virtual Private Cloud (VPC) that Studio uses for communication.
         *
         * Optional when the `CreateDomain.AppNetworkAccessType` parameter is set to `PublicInternetOnly` .
         *
         * Required when the `CreateDomain.AppNetworkAccessType` parameter is set to `VpcOnly` .
         *
         * Amazon SageMaker adds a security group to allow NFS traffic from SageMaker Studio. Therefore, the number of security groups that you can specify is one less than the maximum number shown.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-usersettings.html#cfn-sagemaker-userprofile-usersettings-securitygroups
         */
        readonly securityGroups?: string[];
        /**
         * Specifies options for sharing SageMaker Studio notebooks.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-userprofile-usersettings.html#cfn-sagemaker-userprofile-usersettings-sharingsettings
         */
        readonly sharingSettings?: CfnUserProfile.SharingSettingsProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `UserSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `UserSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnUserProfile_UserSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('executionRole', cdk.validateString)(properties.executionRole));
    errors.collect(cdk.propertyValidator('jupyterServerAppSettings', CfnUserProfile_JupyterServerAppSettingsPropertyValidator)(properties.jupyterServerAppSettings));
    errors.collect(cdk.propertyValidator('kernelGatewayAppSettings', CfnUserProfile_KernelGatewayAppSettingsPropertyValidator)(properties.kernelGatewayAppSettings));
    errors.collect(cdk.propertyValidator('rStudioServerProAppSettings', CfnUserProfile_RStudioServerProAppSettingsPropertyValidator)(properties.rStudioServerProAppSettings));
    errors.collect(cdk.propertyValidator('securityGroups', cdk.listValidator(cdk.validateString))(properties.securityGroups));
    errors.collect(cdk.propertyValidator('sharingSettings', CfnUserProfile_SharingSettingsPropertyValidator)(properties.sharingSettings));
    return errors.wrap('supplied properties not correct for "UserSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile.UserSettings` resource
 *
 * @param properties - the TypeScript properties of a `UserSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::UserProfile.UserSettings` resource.
 */
// @ts-ignore TS6133
function cfnUserProfileUserSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUserProfile_UserSettingsPropertyValidator(properties).assertSuccess();
    return {
        ExecutionRole: cdk.stringToCloudFormation(properties.executionRole),
        JupyterServerAppSettings: cfnUserProfileJupyterServerAppSettingsPropertyToCloudFormation(properties.jupyterServerAppSettings),
        KernelGatewayAppSettings: cfnUserProfileKernelGatewayAppSettingsPropertyToCloudFormation(properties.kernelGatewayAppSettings),
        RStudioServerProAppSettings: cfnUserProfileRStudioServerProAppSettingsPropertyToCloudFormation(properties.rStudioServerProAppSettings),
        SecurityGroups: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroups),
        SharingSettings: cfnUserProfileSharingSettingsPropertyToCloudFormation(properties.sharingSettings),
    };
}

// @ts-ignore TS6133
function CfnUserProfileUserSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUserProfile.UserSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUserProfile.UserSettingsProperty>();
    ret.addPropertyResult('executionRole', 'ExecutionRole', properties.ExecutionRole != null ? cfn_parse.FromCloudFormation.getString(properties.ExecutionRole) : undefined);
    ret.addPropertyResult('jupyterServerAppSettings', 'JupyterServerAppSettings', properties.JupyterServerAppSettings != null ? CfnUserProfileJupyterServerAppSettingsPropertyFromCloudFormation(properties.JupyterServerAppSettings) : undefined);
    ret.addPropertyResult('kernelGatewayAppSettings', 'KernelGatewayAppSettings', properties.KernelGatewayAppSettings != null ? CfnUserProfileKernelGatewayAppSettingsPropertyFromCloudFormation(properties.KernelGatewayAppSettings) : undefined);
    ret.addPropertyResult('rStudioServerProAppSettings', 'RStudioServerProAppSettings', properties.RStudioServerProAppSettings != null ? CfnUserProfileRStudioServerProAppSettingsPropertyFromCloudFormation(properties.RStudioServerProAppSettings) : undefined);
    ret.addPropertyResult('securityGroups', 'SecurityGroups', properties.SecurityGroups != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroups) : undefined);
    ret.addPropertyResult('sharingSettings', 'SharingSettings', properties.SharingSettings != null ? CfnUserProfileSharingSettingsPropertyFromCloudFormation(properties.SharingSettings) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnWorkteam`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-workteam.html
 */
export interface CfnWorkteamProps {

    /**
     * A description of the work team.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-workteam.html#cfn-sagemaker-workteam-description
     */
    readonly description?: string;

    /**
     * A list of `MemberDefinition` objects that contains objects that identify the workers that make up the work team.
     *
     * Workforces can be created using Amazon Cognito or your own OIDC Identity Provider (IdP). For private workforces created using Amazon Cognito use `CognitoMemberDefinition` . For workforces created using your own OIDC identity provider (IdP) use `OidcMemberDefinition` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-workteam.html#cfn-sagemaker-workteam-memberdefinitions
     */
    readonly memberDefinitions?: Array<CfnWorkteam.MemberDefinitionProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Configures SNS notifications of available or expiring work items for work teams.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-workteam.html#cfn-sagemaker-workteam-notificationconfiguration
     */
    readonly notificationConfiguration?: CfnWorkteam.NotificationConfigurationProperty | cdk.IResolvable;

    /**
     * An array of key-value pairs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-workteam.html#cfn-sagemaker-workteam-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The name of the work team.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-workteam.html#cfn-sagemaker-workteam-workteamname
     */
    readonly workteamName?: string;
}

/**
 * Determine whether the given properties match those of a `CfnWorkteamProps`
 *
 * @param properties - the TypeScript properties of a `CfnWorkteamProps`
 *
 * @returns the result of the validation.
 */
function CfnWorkteamPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('memberDefinitions', cdk.listValidator(CfnWorkteam_MemberDefinitionPropertyValidator))(properties.memberDefinitions));
    errors.collect(cdk.propertyValidator('notificationConfiguration', CfnWorkteam_NotificationConfigurationPropertyValidator)(properties.notificationConfiguration));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('workteamName', cdk.validateString)(properties.workteamName));
    return errors.wrap('supplied properties not correct for "CfnWorkteamProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Workteam` resource
 *
 * @param properties - the TypeScript properties of a `CfnWorkteamProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Workteam` resource.
 */
// @ts-ignore TS6133
function cfnWorkteamPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnWorkteamPropsValidator(properties).assertSuccess();
    return {
        Description: cdk.stringToCloudFormation(properties.description),
        MemberDefinitions: cdk.listMapper(cfnWorkteamMemberDefinitionPropertyToCloudFormation)(properties.memberDefinitions),
        NotificationConfiguration: cfnWorkteamNotificationConfigurationPropertyToCloudFormation(properties.notificationConfiguration),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        WorkteamName: cdk.stringToCloudFormation(properties.workteamName),
    };
}

// @ts-ignore TS6133
function CfnWorkteamPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnWorkteamProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnWorkteamProps>();
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('memberDefinitions', 'MemberDefinitions', properties.MemberDefinitions != null ? cfn_parse.FromCloudFormation.getArray(CfnWorkteamMemberDefinitionPropertyFromCloudFormation)(properties.MemberDefinitions) : undefined);
    ret.addPropertyResult('notificationConfiguration', 'NotificationConfiguration', properties.NotificationConfiguration != null ? CfnWorkteamNotificationConfigurationPropertyFromCloudFormation(properties.NotificationConfiguration) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('workteamName', 'WorkteamName', properties.WorkteamName != null ? cfn_parse.FromCloudFormation.getString(properties.WorkteamName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SageMaker::Workteam`
 *
 * Creates a new work team for labeling your data. A work team is defined by one or more Amazon Cognito user pools. You must first create the user pools before you can create a work team.
 *
 * You cannot create more than 25 work teams in an account and region.
 *
 * @cloudformationResource AWS::SageMaker::Workteam
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-workteam.html
 */
export class CfnWorkteam extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SageMaker::Workteam";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnWorkteam {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnWorkteamPropsFromCloudFormation(resourceProperties);
        const ret = new CfnWorkteam(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the work team.
     * @cloudformationAttribute WorkteamName
     */
    public readonly attrWorkteamName: string;

    /**
     * A description of the work team.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-workteam.html#cfn-sagemaker-workteam-description
     */
    public description: string | undefined;

    /**
     * A list of `MemberDefinition` objects that contains objects that identify the workers that make up the work team.
     *
     * Workforces can be created using Amazon Cognito or your own OIDC Identity Provider (IdP). For private workforces created using Amazon Cognito use `CognitoMemberDefinition` . For workforces created using your own OIDC identity provider (IdP) use `OidcMemberDefinition` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-workteam.html#cfn-sagemaker-workteam-memberdefinitions
     */
    public memberDefinitions: Array<CfnWorkteam.MemberDefinitionProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Configures SNS notifications of available or expiring work items for work teams.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-workteam.html#cfn-sagemaker-workteam-notificationconfiguration
     */
    public notificationConfiguration: CfnWorkteam.NotificationConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * An array of key-value pairs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-workteam.html#cfn-sagemaker-workteam-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The name of the work team.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-workteam.html#cfn-sagemaker-workteam-workteamname
     */
    public workteamName: string | undefined;

    /**
     * Create a new `AWS::SageMaker::Workteam`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnWorkteamProps = {}) {
        super(scope, id, { type: CfnWorkteam.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrWorkteamName = cdk.Token.asString(this.getAtt('WorkteamName'));

        this.description = props.description;
        this.memberDefinitions = props.memberDefinitions;
        this.notificationConfiguration = props.notificationConfiguration;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SageMaker::Workteam", props.tags, { tagPropertyName: 'tags' });
        this.workteamName = props.workteamName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnWorkteam.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            description: this.description,
            memberDefinitions: this.memberDefinitions,
            notificationConfiguration: this.notificationConfiguration,
            tags: this.tags.renderTags(),
            workteamName: this.workteamName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnWorkteamPropsToCloudFormation(props);
    }
}

export namespace CfnWorkteam {
    /**
     * Identifies a Amazon Cognito user group. A user group can be used in on or more work teams.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-workteam-cognitomemberdefinition.html
     */
    export interface CognitoMemberDefinitionProperty {
        /**
         * An identifier for an application client. You must create the app client ID using Amazon Cognito.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-workteam-cognitomemberdefinition.html#cfn-sagemaker-workteam-cognitomemberdefinition-cognitoclientid
         */
        readonly cognitoClientId: string;
        /**
         * An identifier for a user group.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-workteam-cognitomemberdefinition.html#cfn-sagemaker-workteam-cognitomemberdefinition-cognitousergroup
         */
        readonly cognitoUserGroup: string;
        /**
         * An identifier for a user pool. The user pool must be in the same region as the service that you are calling.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-workteam-cognitomemberdefinition.html#cfn-sagemaker-workteam-cognitomemberdefinition-cognitouserpool
         */
        readonly cognitoUserPool: string;
    }
}

/**
 * Determine whether the given properties match those of a `CognitoMemberDefinitionProperty`
 *
 * @param properties - the TypeScript properties of a `CognitoMemberDefinitionProperty`
 *
 * @returns the result of the validation.
 */
function CfnWorkteam_CognitoMemberDefinitionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cognitoClientId', cdk.requiredValidator)(properties.cognitoClientId));
    errors.collect(cdk.propertyValidator('cognitoClientId', cdk.validateString)(properties.cognitoClientId));
    errors.collect(cdk.propertyValidator('cognitoUserGroup', cdk.requiredValidator)(properties.cognitoUserGroup));
    errors.collect(cdk.propertyValidator('cognitoUserGroup', cdk.validateString)(properties.cognitoUserGroup));
    errors.collect(cdk.propertyValidator('cognitoUserPool', cdk.requiredValidator)(properties.cognitoUserPool));
    errors.collect(cdk.propertyValidator('cognitoUserPool', cdk.validateString)(properties.cognitoUserPool));
    return errors.wrap('supplied properties not correct for "CognitoMemberDefinitionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Workteam.CognitoMemberDefinition` resource
 *
 * @param properties - the TypeScript properties of a `CognitoMemberDefinitionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Workteam.CognitoMemberDefinition` resource.
 */
// @ts-ignore TS6133
function cfnWorkteamCognitoMemberDefinitionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnWorkteam_CognitoMemberDefinitionPropertyValidator(properties).assertSuccess();
    return {
        CognitoClientId: cdk.stringToCloudFormation(properties.cognitoClientId),
        CognitoUserGroup: cdk.stringToCloudFormation(properties.cognitoUserGroup),
        CognitoUserPool: cdk.stringToCloudFormation(properties.cognitoUserPool),
    };
}

// @ts-ignore TS6133
function CfnWorkteamCognitoMemberDefinitionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnWorkteam.CognitoMemberDefinitionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnWorkteam.CognitoMemberDefinitionProperty>();
    ret.addPropertyResult('cognitoClientId', 'CognitoClientId', cfn_parse.FromCloudFormation.getString(properties.CognitoClientId));
    ret.addPropertyResult('cognitoUserGroup', 'CognitoUserGroup', cfn_parse.FromCloudFormation.getString(properties.CognitoUserGroup));
    ret.addPropertyResult('cognitoUserPool', 'CognitoUserPool', cfn_parse.FromCloudFormation.getString(properties.CognitoUserPool));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnWorkteam {
    /**
     * Defines an Amazon Cognito or your own OIDC IdP user group that is part of a work team.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-workteam-memberdefinition.html
     */
    export interface MemberDefinitionProperty {
        /**
         * The Amazon Cognito user group that is part of the work team.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-workteam-memberdefinition.html#cfn-sagemaker-workteam-memberdefinition-cognitomemberdefinition
         */
        readonly cognitoMemberDefinition: CfnWorkteam.CognitoMemberDefinitionProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MemberDefinitionProperty`
 *
 * @param properties - the TypeScript properties of a `MemberDefinitionProperty`
 *
 * @returns the result of the validation.
 */
function CfnWorkteam_MemberDefinitionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cognitoMemberDefinition', cdk.requiredValidator)(properties.cognitoMemberDefinition));
    errors.collect(cdk.propertyValidator('cognitoMemberDefinition', CfnWorkteam_CognitoMemberDefinitionPropertyValidator)(properties.cognitoMemberDefinition));
    return errors.wrap('supplied properties not correct for "MemberDefinitionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Workteam.MemberDefinition` resource
 *
 * @param properties - the TypeScript properties of a `MemberDefinitionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Workteam.MemberDefinition` resource.
 */
// @ts-ignore TS6133
function cfnWorkteamMemberDefinitionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnWorkteam_MemberDefinitionPropertyValidator(properties).assertSuccess();
    return {
        CognitoMemberDefinition: cfnWorkteamCognitoMemberDefinitionPropertyToCloudFormation(properties.cognitoMemberDefinition),
    };
}

// @ts-ignore TS6133
function CfnWorkteamMemberDefinitionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnWorkteam.MemberDefinitionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnWorkteam.MemberDefinitionProperty>();
    ret.addPropertyResult('cognitoMemberDefinition', 'CognitoMemberDefinition', CfnWorkteamCognitoMemberDefinitionPropertyFromCloudFormation(properties.CognitoMemberDefinition));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnWorkteam {
    /**
     * Configures Amazon SNS notifications of available or expiring work items for work teams.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-workteam-notificationconfiguration.html
     */
    export interface NotificationConfigurationProperty {
        /**
         * The ARN for the Amazon SNS topic to which notifications should be published.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sagemaker-workteam-notificationconfiguration.html#cfn-sagemaker-workteam-notificationconfiguration-notificationtopicarn
         */
        readonly notificationTopicArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `NotificationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `NotificationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnWorkteam_NotificationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('notificationTopicArn', cdk.requiredValidator)(properties.notificationTopicArn));
    errors.collect(cdk.propertyValidator('notificationTopicArn', cdk.validateString)(properties.notificationTopicArn));
    return errors.wrap('supplied properties not correct for "NotificationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SageMaker::Workteam.NotificationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `NotificationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SageMaker::Workteam.NotificationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnWorkteamNotificationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnWorkteam_NotificationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        NotificationTopicArn: cdk.stringToCloudFormation(properties.notificationTopicArn),
    };
}

// @ts-ignore TS6133
function CfnWorkteamNotificationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnWorkteam.NotificationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnWorkteam.NotificationConfigurationProperty>();
    ret.addPropertyResult('notificationTopicArn', 'NotificationTopicArn', cfn_parse.FromCloudFormation.getString(properties.NotificationTopicArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
