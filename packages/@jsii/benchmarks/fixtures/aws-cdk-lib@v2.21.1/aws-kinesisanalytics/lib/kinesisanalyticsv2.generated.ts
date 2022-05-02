// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:08.965Z","fingerprint":"vGIL6Ul6bPSdo2Mu0MLeM0e3gGo4jdBgZ0cNZLnJJH0="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnApplicationV2`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html
 */
export interface CfnApplicationV2Props {

    /**
     * The runtime environment for the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html#cfn-kinesisanalyticsv2-application-runtimeenvironment
     */
    readonly runtimeEnvironment: string;

    /**
     * Specifies the IAM role that the application uses to access external resources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html#cfn-kinesisanalyticsv2-application-serviceexecutionrole
     */
    readonly serviceExecutionRole: string;

    /**
     * Use this parameter to configure the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html#cfn-kinesisanalyticsv2-application-applicationconfiguration
     */
    readonly applicationConfiguration?: CfnApplicationV2.ApplicationConfigurationProperty | cdk.IResolvable;

    /**
     * The description of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html#cfn-kinesisanalyticsv2-application-applicationdescription
     */
    readonly applicationDescription?: string;

    /**
     * To create a Kinesis Data Analytics Studio notebook, you must set the mode to `INTERACTIVE` . However, for a Kinesis Data Analytics for Apache Flink application, the mode is optional.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html#cfn-kinesisanalyticsv2-application-applicationmode
     */
    readonly applicationMode?: string;

    /**
     * The name of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html#cfn-kinesisanalyticsv2-application-applicationname
     */
    readonly applicationName?: string;

    /**
     * A list of one or more tags to assign to the application. A tag is a key-value pair that identifies an application. Note that the maximum number of application tags includes system tags. The maximum number of user-defined application tags is 50.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html#cfn-kinesisanalyticsv2-application-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnApplicationV2Props`
 *
 * @param properties - the TypeScript properties of a `CfnApplicationV2Props`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2PropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('applicationConfiguration', CfnApplicationV2_ApplicationConfigurationPropertyValidator)(properties.applicationConfiguration));
    errors.collect(cdk.propertyValidator('applicationDescription', cdk.validateString)(properties.applicationDescription));
    errors.collect(cdk.propertyValidator('applicationMode', cdk.validateString)(properties.applicationMode));
    errors.collect(cdk.propertyValidator('applicationName', cdk.validateString)(properties.applicationName));
    errors.collect(cdk.propertyValidator('runtimeEnvironment', cdk.requiredValidator)(properties.runtimeEnvironment));
    errors.collect(cdk.propertyValidator('runtimeEnvironment', cdk.validateString)(properties.runtimeEnvironment));
    errors.collect(cdk.propertyValidator('serviceExecutionRole', cdk.requiredValidator)(properties.serviceExecutionRole));
    errors.collect(cdk.propertyValidator('serviceExecutionRole', cdk.validateString)(properties.serviceExecutionRole));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnApplicationV2Props"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application` resource
 *
 * @param properties - the TypeScript properties of a `CfnApplicationV2Props`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2PropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2PropsValidator(properties).assertSuccess();
    return {
        RuntimeEnvironment: cdk.stringToCloudFormation(properties.runtimeEnvironment),
        ServiceExecutionRole: cdk.stringToCloudFormation(properties.serviceExecutionRole),
        ApplicationConfiguration: cfnApplicationV2ApplicationConfigurationPropertyToCloudFormation(properties.applicationConfiguration),
        ApplicationDescription: cdk.stringToCloudFormation(properties.applicationDescription),
        ApplicationMode: cdk.stringToCloudFormation(properties.applicationMode),
        ApplicationName: cdk.stringToCloudFormation(properties.applicationName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2PropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2Props> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2Props>();
    ret.addPropertyResult('runtimeEnvironment', 'RuntimeEnvironment', cfn_parse.FromCloudFormation.getString(properties.RuntimeEnvironment));
    ret.addPropertyResult('serviceExecutionRole', 'ServiceExecutionRole', cfn_parse.FromCloudFormation.getString(properties.ServiceExecutionRole));
    ret.addPropertyResult('applicationConfiguration', 'ApplicationConfiguration', properties.ApplicationConfiguration != null ? CfnApplicationV2ApplicationConfigurationPropertyFromCloudFormation(properties.ApplicationConfiguration) : undefined);
    ret.addPropertyResult('applicationDescription', 'ApplicationDescription', properties.ApplicationDescription != null ? cfn_parse.FromCloudFormation.getString(properties.ApplicationDescription) : undefined);
    ret.addPropertyResult('applicationMode', 'ApplicationMode', properties.ApplicationMode != null ? cfn_parse.FromCloudFormation.getString(properties.ApplicationMode) : undefined);
    ret.addPropertyResult('applicationName', 'ApplicationName', properties.ApplicationName != null ? cfn_parse.FromCloudFormation.getString(properties.ApplicationName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::KinesisAnalyticsV2::Application`
 *
 * Creates an Amazon Kinesis Data Analytics application. For information about creating a Kinesis Data Analytics application, see [Creating an Application](https://docs.aws.amazon.com/kinesisanalytics/latest/java/getting-started.html) .
 *
 * @cloudformationResource AWS::KinesisAnalyticsV2::Application
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html
 */
export class CfnApplicationV2 extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::KinesisAnalyticsV2::Application";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnApplicationV2 {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnApplicationV2PropsFromCloudFormation(resourceProperties);
        const ret = new CfnApplicationV2(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The runtime environment for the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html#cfn-kinesisanalyticsv2-application-runtimeenvironment
     */
    public runtimeEnvironment: string;

    /**
     * Specifies the IAM role that the application uses to access external resources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html#cfn-kinesisanalyticsv2-application-serviceexecutionrole
     */
    public serviceExecutionRole: string;

    /**
     * Use this parameter to configure the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html#cfn-kinesisanalyticsv2-application-applicationconfiguration
     */
    public applicationConfiguration: CfnApplicationV2.ApplicationConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * The description of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html#cfn-kinesisanalyticsv2-application-applicationdescription
     */
    public applicationDescription: string | undefined;

    /**
     * To create a Kinesis Data Analytics Studio notebook, you must set the mode to `INTERACTIVE` . However, for a Kinesis Data Analytics for Apache Flink application, the mode is optional.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html#cfn-kinesisanalyticsv2-application-applicationmode
     */
    public applicationMode: string | undefined;

    /**
     * The name of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html#cfn-kinesisanalyticsv2-application-applicationname
     */
    public applicationName: string | undefined;

    /**
     * A list of one or more tags to assign to the application. A tag is a key-value pair that identifies an application. Note that the maximum number of application tags includes system tags. The maximum number of user-defined application tags is 50.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-application.html#cfn-kinesisanalyticsv2-application-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::KinesisAnalyticsV2::Application`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnApplicationV2Props) {
        super(scope, id, { type: CfnApplicationV2.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'runtimeEnvironment', this);
        cdk.requireProperty(props, 'serviceExecutionRole', this);

        this.runtimeEnvironment = props.runtimeEnvironment;
        this.serviceExecutionRole = props.serviceExecutionRole;
        this.applicationConfiguration = props.applicationConfiguration;
        this.applicationDescription = props.applicationDescription;
        this.applicationMode = props.applicationMode;
        this.applicationName = props.applicationName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::KinesisAnalyticsV2::Application", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnApplicationV2.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            runtimeEnvironment: this.runtimeEnvironment,
            serviceExecutionRole: this.serviceExecutionRole,
            applicationConfiguration: this.applicationConfiguration,
            applicationDescription: this.applicationDescription,
            applicationMode: this.applicationMode,
            applicationName: this.applicationName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnApplicationV2PropsToCloudFormation(props);
    }
}

export namespace CfnApplicationV2 {
    /**
     * Describes code configuration for an application.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-applicationcodeconfiguration.html
     */
    export interface ApplicationCodeConfigurationProperty {
        /**
         * The location and type of the application code.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-applicationcodeconfiguration.html#cfn-kinesisanalyticsv2-application-applicationcodeconfiguration-codecontent
         */
        readonly codeContent: CfnApplicationV2.CodeContentProperty | cdk.IResolvable;
        /**
         * Specifies whether the code content is in text or zip format.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-applicationcodeconfiguration.html#cfn-kinesisanalyticsv2-application-applicationcodeconfiguration-codecontenttype
         */
        readonly codeContentType: string;
    }
}

/**
 * Determine whether the given properties match those of a `ApplicationCodeConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ApplicationCodeConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_ApplicationCodeConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('codeContent', cdk.requiredValidator)(properties.codeContent));
    errors.collect(cdk.propertyValidator('codeContent', CfnApplicationV2_CodeContentPropertyValidator)(properties.codeContent));
    errors.collect(cdk.propertyValidator('codeContentType', cdk.requiredValidator)(properties.codeContentType));
    errors.collect(cdk.propertyValidator('codeContentType', cdk.validateString)(properties.codeContentType));
    return errors.wrap('supplied properties not correct for "ApplicationCodeConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.ApplicationCodeConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ApplicationCodeConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.ApplicationCodeConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2ApplicationCodeConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_ApplicationCodeConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CodeContent: cfnApplicationV2CodeContentPropertyToCloudFormation(properties.codeContent),
        CodeContentType: cdk.stringToCloudFormation(properties.codeContentType),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2ApplicationCodeConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.ApplicationCodeConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.ApplicationCodeConfigurationProperty>();
    ret.addPropertyResult('codeContent', 'CodeContent', CfnApplicationV2CodeContentPropertyFromCloudFormation(properties.CodeContent));
    ret.addPropertyResult('codeContentType', 'CodeContentType', cfn_parse.FromCloudFormation.getString(properties.CodeContentType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * Specifies the creation parameters for a Kinesis Data Analytics application.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-applicationconfiguration.html
     */
    export interface ApplicationConfigurationProperty {
        /**
         * The code location and type parameters for a Flink-based Kinesis Data Analytics application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-applicationconfiguration.html#cfn-kinesisanalyticsv2-application-applicationconfiguration-applicationcodeconfiguration
         */
        readonly applicationCodeConfiguration?: CfnApplicationV2.ApplicationCodeConfigurationProperty | cdk.IResolvable;
        /**
         * Describes whether snapshots are enabled for a Flink-based Kinesis Data Analytics application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-applicationconfiguration.html#cfn-kinesisanalyticsv2-application-applicationconfiguration-applicationsnapshotconfiguration
         */
        readonly applicationSnapshotConfiguration?: CfnApplicationV2.ApplicationSnapshotConfigurationProperty | cdk.IResolvable;
        /**
         * Describes execution properties for a Flink-based Kinesis Data Analytics application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-applicationconfiguration.html#cfn-kinesisanalyticsv2-application-applicationconfiguration-environmentproperties
         */
        readonly environmentProperties?: CfnApplicationV2.EnvironmentPropertiesProperty | cdk.IResolvable;
        /**
         * The creation and update parameters for a Flink-based Kinesis Data Analytics application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-applicationconfiguration.html#cfn-kinesisanalyticsv2-application-applicationconfiguration-flinkapplicationconfiguration
         */
        readonly flinkApplicationConfiguration?: CfnApplicationV2.FlinkApplicationConfigurationProperty | cdk.IResolvable;
        /**
         * The creation and update parameters for a SQL-based Kinesis Data Analytics application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-applicationconfiguration.html#cfn-kinesisanalyticsv2-application-applicationconfiguration-sqlapplicationconfiguration
         */
        readonly sqlApplicationConfiguration?: CfnApplicationV2.SqlApplicationConfigurationProperty | cdk.IResolvable;
        /**
         * The configuration parameters for a Kinesis Data Analytics Studio notebook.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-applicationconfiguration.html#cfn-kinesisanalyticsv2-application-applicationconfiguration-zeppelinapplicationconfiguration
         */
        readonly zeppelinApplicationConfiguration?: CfnApplicationV2.ZeppelinApplicationConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ApplicationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ApplicationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_ApplicationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('applicationCodeConfiguration', CfnApplicationV2_ApplicationCodeConfigurationPropertyValidator)(properties.applicationCodeConfiguration));
    errors.collect(cdk.propertyValidator('applicationSnapshotConfiguration', CfnApplicationV2_ApplicationSnapshotConfigurationPropertyValidator)(properties.applicationSnapshotConfiguration));
    errors.collect(cdk.propertyValidator('environmentProperties', CfnApplicationV2_EnvironmentPropertiesPropertyValidator)(properties.environmentProperties));
    errors.collect(cdk.propertyValidator('flinkApplicationConfiguration', CfnApplicationV2_FlinkApplicationConfigurationPropertyValidator)(properties.flinkApplicationConfiguration));
    errors.collect(cdk.propertyValidator('sqlApplicationConfiguration', CfnApplicationV2_SqlApplicationConfigurationPropertyValidator)(properties.sqlApplicationConfiguration));
    errors.collect(cdk.propertyValidator('zeppelinApplicationConfiguration', CfnApplicationV2_ZeppelinApplicationConfigurationPropertyValidator)(properties.zeppelinApplicationConfiguration));
    return errors.wrap('supplied properties not correct for "ApplicationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.ApplicationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ApplicationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.ApplicationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2ApplicationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_ApplicationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        ApplicationCodeConfiguration: cfnApplicationV2ApplicationCodeConfigurationPropertyToCloudFormation(properties.applicationCodeConfiguration),
        ApplicationSnapshotConfiguration: cfnApplicationV2ApplicationSnapshotConfigurationPropertyToCloudFormation(properties.applicationSnapshotConfiguration),
        EnvironmentProperties: cfnApplicationV2EnvironmentPropertiesPropertyToCloudFormation(properties.environmentProperties),
        FlinkApplicationConfiguration: cfnApplicationV2FlinkApplicationConfigurationPropertyToCloudFormation(properties.flinkApplicationConfiguration),
        SqlApplicationConfiguration: cfnApplicationV2SqlApplicationConfigurationPropertyToCloudFormation(properties.sqlApplicationConfiguration),
        ZeppelinApplicationConfiguration: cfnApplicationV2ZeppelinApplicationConfigurationPropertyToCloudFormation(properties.zeppelinApplicationConfiguration),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2ApplicationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.ApplicationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.ApplicationConfigurationProperty>();
    ret.addPropertyResult('applicationCodeConfiguration', 'ApplicationCodeConfiguration', properties.ApplicationCodeConfiguration != null ? CfnApplicationV2ApplicationCodeConfigurationPropertyFromCloudFormation(properties.ApplicationCodeConfiguration) : undefined);
    ret.addPropertyResult('applicationSnapshotConfiguration', 'ApplicationSnapshotConfiguration', properties.ApplicationSnapshotConfiguration != null ? CfnApplicationV2ApplicationSnapshotConfigurationPropertyFromCloudFormation(properties.ApplicationSnapshotConfiguration) : undefined);
    ret.addPropertyResult('environmentProperties', 'EnvironmentProperties', properties.EnvironmentProperties != null ? CfnApplicationV2EnvironmentPropertiesPropertyFromCloudFormation(properties.EnvironmentProperties) : undefined);
    ret.addPropertyResult('flinkApplicationConfiguration', 'FlinkApplicationConfiguration', properties.FlinkApplicationConfiguration != null ? CfnApplicationV2FlinkApplicationConfigurationPropertyFromCloudFormation(properties.FlinkApplicationConfiguration) : undefined);
    ret.addPropertyResult('sqlApplicationConfiguration', 'SqlApplicationConfiguration', properties.SqlApplicationConfiguration != null ? CfnApplicationV2SqlApplicationConfigurationPropertyFromCloudFormation(properties.SqlApplicationConfiguration) : undefined);
    ret.addPropertyResult('zeppelinApplicationConfiguration', 'ZeppelinApplicationConfiguration', properties.ZeppelinApplicationConfiguration != null ? CfnApplicationV2ZeppelinApplicationConfigurationPropertyFromCloudFormation(properties.ZeppelinApplicationConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * Describes whether snapshots are enabled for a Flink-based Kinesis Data Analytics application.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-applicationsnapshotconfiguration.html
     */
    export interface ApplicationSnapshotConfigurationProperty {
        /**
         * Describes whether snapshots are enabled for a Flink-based Kinesis Data Analytics application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-applicationsnapshotconfiguration.html#cfn-kinesisanalyticsv2-application-applicationsnapshotconfiguration-snapshotsenabled
         */
        readonly snapshotsEnabled: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ApplicationSnapshotConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ApplicationSnapshotConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_ApplicationSnapshotConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('snapshotsEnabled', cdk.requiredValidator)(properties.snapshotsEnabled));
    errors.collect(cdk.propertyValidator('snapshotsEnabled', cdk.validateBoolean)(properties.snapshotsEnabled));
    return errors.wrap('supplied properties not correct for "ApplicationSnapshotConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.ApplicationSnapshotConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ApplicationSnapshotConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.ApplicationSnapshotConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2ApplicationSnapshotConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_ApplicationSnapshotConfigurationPropertyValidator(properties).assertSuccess();
    return {
        SnapshotsEnabled: cdk.booleanToCloudFormation(properties.snapshotsEnabled),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2ApplicationSnapshotConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.ApplicationSnapshotConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.ApplicationSnapshotConfigurationProperty>();
    ret.addPropertyResult('snapshotsEnabled', 'SnapshotsEnabled', cfn_parse.FromCloudFormation.getBoolean(properties.SnapshotsEnabled));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * For a SQL-based Kinesis Data Analytics application, provides additional mapping information when the record format uses delimiters, such as CSV. For example, the following sample records use CSV format, where the records use the *'\n'* as the row delimiter and a comma (",") as the column delimiter:
     *
     * `"name1", "address1"`
     *
     * `"name2", "address2"`
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-csvmappingparameters.html
     */
    export interface CSVMappingParametersProperty {
        /**
         * The column delimiter. For example, in a CSV format, a comma (",") is the typical column delimiter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-csvmappingparameters.html#cfn-kinesisanalyticsv2-application-csvmappingparameters-recordcolumndelimiter
         */
        readonly recordColumnDelimiter: string;
        /**
         * The row delimiter. For example, in a CSV format, *'\n'* is the typical row delimiter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-csvmappingparameters.html#cfn-kinesisanalyticsv2-application-csvmappingparameters-recordrowdelimiter
         */
        readonly recordRowDelimiter: string;
    }
}

/**
 * Determine whether the given properties match those of a `CSVMappingParametersProperty`
 *
 * @param properties - the TypeScript properties of a `CSVMappingParametersProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_CSVMappingParametersPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('recordColumnDelimiter', cdk.requiredValidator)(properties.recordColumnDelimiter));
    errors.collect(cdk.propertyValidator('recordColumnDelimiter', cdk.validateString)(properties.recordColumnDelimiter));
    errors.collect(cdk.propertyValidator('recordRowDelimiter', cdk.requiredValidator)(properties.recordRowDelimiter));
    errors.collect(cdk.propertyValidator('recordRowDelimiter', cdk.validateString)(properties.recordRowDelimiter));
    return errors.wrap('supplied properties not correct for "CSVMappingParametersProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.CSVMappingParameters` resource
 *
 * @param properties - the TypeScript properties of a `CSVMappingParametersProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.CSVMappingParameters` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2CSVMappingParametersPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_CSVMappingParametersPropertyValidator(properties).assertSuccess();
    return {
        RecordColumnDelimiter: cdk.stringToCloudFormation(properties.recordColumnDelimiter),
        RecordRowDelimiter: cdk.stringToCloudFormation(properties.recordRowDelimiter),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2CSVMappingParametersPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.CSVMappingParametersProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.CSVMappingParametersProperty>();
    ret.addPropertyResult('recordColumnDelimiter', 'RecordColumnDelimiter', cfn_parse.FromCloudFormation.getString(properties.RecordColumnDelimiter));
    ret.addPropertyResult('recordRowDelimiter', 'RecordRowDelimiter', cfn_parse.FromCloudFormation.getString(properties.RecordRowDelimiter));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * The configuration parameters for the default Amazon Glue database. You use this database for SQL queries that you write in a Kinesis Data Analytics Studio notebook.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-catalogconfiguration.html
     */
    export interface CatalogConfigurationProperty {
        /**
         * The configuration parameters for the default Amazon Glue database. You use this database for Apache Flink SQL queries and table API transforms that you write in a Kinesis Data Analytics Studio notebook.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-catalogconfiguration.html#cfn-kinesisanalyticsv2-application-catalogconfiguration-gluedatacatalogconfiguration
         */
        readonly glueDataCatalogConfiguration?: CfnApplicationV2.GlueDataCatalogConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `CatalogConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `CatalogConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_CatalogConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('glueDataCatalogConfiguration', CfnApplicationV2_GlueDataCatalogConfigurationPropertyValidator)(properties.glueDataCatalogConfiguration));
    return errors.wrap('supplied properties not correct for "CatalogConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.CatalogConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CatalogConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.CatalogConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2CatalogConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_CatalogConfigurationPropertyValidator(properties).assertSuccess();
    return {
        GlueDataCatalogConfiguration: cfnApplicationV2GlueDataCatalogConfigurationPropertyToCloudFormation(properties.glueDataCatalogConfiguration),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2CatalogConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.CatalogConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.CatalogConfigurationProperty>();
    ret.addPropertyResult('glueDataCatalogConfiguration', 'GlueDataCatalogConfiguration', properties.GlueDataCatalogConfiguration != null ? CfnApplicationV2GlueDataCatalogConfigurationPropertyFromCloudFormation(properties.GlueDataCatalogConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * Describes an application's checkpointing configuration. Checkpointing is the process of persisting application state for fault tolerance. For more information, see [Checkpoints for Fault Tolerance](https://docs.aws.amazon.com/https://ci.apache.org/projects/flink/flink-docs-release-1.8/concepts/programming-model.html#checkpoints-for-fault-tolerance) in the [Apache Flink Documentation](https://docs.aws.amazon.com/https://ci.apache.org/projects/flink/flink-docs-release-1.8/) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-checkpointconfiguration.html
     */
    export interface CheckpointConfigurationProperty {
        /**
         * Describes the interval in milliseconds between checkpoint operations.
         *
         * > If `CheckpointConfiguration.ConfigurationType` is `DEFAULT` , the application will use a `CheckpointInterval` value of 60000, even if this value is set to another value using this API or in application code.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-checkpointconfiguration.html#cfn-kinesisanalyticsv2-application-checkpointconfiguration-checkpointinterval
         */
        readonly checkpointInterval?: number;
        /**
         * Describes whether checkpointing is enabled for a Flink-based Kinesis Data Analytics application.
         *
         * > If `CheckpointConfiguration.ConfigurationType` is `DEFAULT` , the application will use a `CheckpointingEnabled` value of `true` , even if this value is set to another value using this API or in application code.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-checkpointconfiguration.html#cfn-kinesisanalyticsv2-application-checkpointconfiguration-checkpointingenabled
         */
        readonly checkpointingEnabled?: boolean | cdk.IResolvable;
        /**
         * Describes whether the application uses Kinesis Data Analytics' default checkpointing behavior. You must set this property to `CUSTOM` in order to set the `CheckpointingEnabled` , `CheckpointInterval` , or `MinPauseBetweenCheckpoints` parameters.
         *
         * > If this value is set to `DEFAULT` , the application will use the following values, even if they are set to other values using APIs or application code:
         * >
         * > - *CheckpointingEnabled:* true
         * > - *CheckpointInterval:* 60000
         * > - *MinPauseBetweenCheckpoints:* 5000
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-checkpointconfiguration.html#cfn-kinesisanalyticsv2-application-checkpointconfiguration-configurationtype
         */
        readonly configurationType: string;
        /**
         * Describes the minimum time in milliseconds after a checkpoint operation completes that a new checkpoint operation can start. If a checkpoint operation takes longer than the `CheckpointInterval` , the application otherwise performs continual checkpoint operations. For more information, see [Tuning Checkpointing](https://docs.aws.amazon.com/https://ci.apache.org/projects/flink/flink-docs-release-1.8/ops/state/large_state_tuning.html#tuning-checkpointing) in the [Apache Flink Documentation](https://docs.aws.amazon.com/https://ci.apache.org/projects/flink/flink-docs-release-1.8/) .
         *
         * > If `CheckpointConfiguration.ConfigurationType` is `DEFAULT` , the application will use a `MinPauseBetweenCheckpoints` value of 5000, even if this value is set using this API or in application code.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-checkpointconfiguration.html#cfn-kinesisanalyticsv2-application-checkpointconfiguration-minpausebetweencheckpoints
         */
        readonly minPauseBetweenCheckpoints?: number;
    }
}

/**
 * Determine whether the given properties match those of a `CheckpointConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `CheckpointConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_CheckpointConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('checkpointInterval', cdk.validateNumber)(properties.checkpointInterval));
    errors.collect(cdk.propertyValidator('checkpointingEnabled', cdk.validateBoolean)(properties.checkpointingEnabled));
    errors.collect(cdk.propertyValidator('configurationType', cdk.requiredValidator)(properties.configurationType));
    errors.collect(cdk.propertyValidator('configurationType', cdk.validateString)(properties.configurationType));
    errors.collect(cdk.propertyValidator('minPauseBetweenCheckpoints', cdk.validateNumber)(properties.minPauseBetweenCheckpoints));
    return errors.wrap('supplied properties not correct for "CheckpointConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.CheckpointConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CheckpointConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.CheckpointConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2CheckpointConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_CheckpointConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CheckpointInterval: cdk.numberToCloudFormation(properties.checkpointInterval),
        CheckpointingEnabled: cdk.booleanToCloudFormation(properties.checkpointingEnabled),
        ConfigurationType: cdk.stringToCloudFormation(properties.configurationType),
        MinPauseBetweenCheckpoints: cdk.numberToCloudFormation(properties.minPauseBetweenCheckpoints),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2CheckpointConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.CheckpointConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.CheckpointConfigurationProperty>();
    ret.addPropertyResult('checkpointInterval', 'CheckpointInterval', properties.CheckpointInterval != null ? cfn_parse.FromCloudFormation.getNumber(properties.CheckpointInterval) : undefined);
    ret.addPropertyResult('checkpointingEnabled', 'CheckpointingEnabled', properties.CheckpointingEnabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.CheckpointingEnabled) : undefined);
    ret.addPropertyResult('configurationType', 'ConfigurationType', cfn_parse.FromCloudFormation.getString(properties.ConfigurationType));
    ret.addPropertyResult('minPauseBetweenCheckpoints', 'MinPauseBetweenCheckpoints', properties.MinPauseBetweenCheckpoints != null ? cfn_parse.FromCloudFormation.getNumber(properties.MinPauseBetweenCheckpoints) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * Specifies either the application code, or the location of the application code, for a Flink-based Kinesis Data Analytics application.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-codecontent.html
     */
    export interface CodeContentProperty {
        /**
         * Information about the Amazon S3 bucket that contains the application code.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-codecontent.html#cfn-kinesisanalyticsv2-application-codecontent-s3contentlocation
         */
        readonly s3ContentLocation?: CfnApplicationV2.S3ContentLocationProperty | cdk.IResolvable;
        /**
         * The text-format code for a Flink-based Kinesis Data Analytics application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-codecontent.html#cfn-kinesisanalyticsv2-application-codecontent-textcontent
         */
        readonly textContent?: string;
        /**
         * The zip-format code for a Flink-based Kinesis Data Analytics application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-codecontent.html#cfn-kinesisanalyticsv2-application-codecontent-zipfilecontent
         */
        readonly zipFileContent?: string;
    }
}

/**
 * Determine whether the given properties match those of a `CodeContentProperty`
 *
 * @param properties - the TypeScript properties of a `CodeContentProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_CodeContentPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3ContentLocation', CfnApplicationV2_S3ContentLocationPropertyValidator)(properties.s3ContentLocation));
    errors.collect(cdk.propertyValidator('textContent', cdk.validateString)(properties.textContent));
    errors.collect(cdk.propertyValidator('zipFileContent', cdk.validateString)(properties.zipFileContent));
    return errors.wrap('supplied properties not correct for "CodeContentProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.CodeContent` resource
 *
 * @param properties - the TypeScript properties of a `CodeContentProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.CodeContent` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2CodeContentPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_CodeContentPropertyValidator(properties).assertSuccess();
    return {
        S3ContentLocation: cfnApplicationV2S3ContentLocationPropertyToCloudFormation(properties.s3ContentLocation),
        TextContent: cdk.stringToCloudFormation(properties.textContent),
        ZipFileContent: cdk.stringToCloudFormation(properties.zipFileContent),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2CodeContentPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.CodeContentProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.CodeContentProperty>();
    ret.addPropertyResult('s3ContentLocation', 'S3ContentLocation', properties.S3ContentLocation != null ? CfnApplicationV2S3ContentLocationPropertyFromCloudFormation(properties.S3ContentLocation) : undefined);
    ret.addPropertyResult('textContent', 'TextContent', properties.TextContent != null ? cfn_parse.FromCloudFormation.getString(properties.TextContent) : undefined);
    ret.addPropertyResult('zipFileContent', 'ZipFileContent', properties.ZipFileContent != null ? cfn_parse.FromCloudFormation.getString(properties.ZipFileContent) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * The configuration of connectors and user-defined functions.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-customartifactconfiguration.html
     */
    export interface CustomArtifactConfigurationProperty {
        /**
         * Set this to either `UDF` or `DEPENDENCY_JAR` . `UDF` stands for user-defined functions. This type of artifact must be in an S3 bucket. A `DEPENDENCY_JAR` can be in either Maven or an S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-customartifactconfiguration.html#cfn-kinesisanalyticsv2-application-customartifactconfiguration-artifacttype
         */
        readonly artifactType: string;
        /**
         * The parameters required to fully specify a Maven reference.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-customartifactconfiguration.html#cfn-kinesisanalyticsv2-application-customartifactconfiguration-mavenreference
         */
        readonly mavenReference?: CfnApplicationV2.MavenReferenceProperty | cdk.IResolvable;
        /**
         * The location of the custom artifacts.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-customartifactconfiguration.html#cfn-kinesisanalyticsv2-application-customartifactconfiguration-s3contentlocation
         */
        readonly s3ContentLocation?: CfnApplicationV2.S3ContentLocationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `CustomArtifactConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `CustomArtifactConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_CustomArtifactConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('artifactType', cdk.requiredValidator)(properties.artifactType));
    errors.collect(cdk.propertyValidator('artifactType', cdk.validateString)(properties.artifactType));
    errors.collect(cdk.propertyValidator('mavenReference', CfnApplicationV2_MavenReferencePropertyValidator)(properties.mavenReference));
    errors.collect(cdk.propertyValidator('s3ContentLocation', CfnApplicationV2_S3ContentLocationPropertyValidator)(properties.s3ContentLocation));
    return errors.wrap('supplied properties not correct for "CustomArtifactConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.CustomArtifactConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CustomArtifactConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.CustomArtifactConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2CustomArtifactConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_CustomArtifactConfigurationPropertyValidator(properties).assertSuccess();
    return {
        ArtifactType: cdk.stringToCloudFormation(properties.artifactType),
        MavenReference: cfnApplicationV2MavenReferencePropertyToCloudFormation(properties.mavenReference),
        S3ContentLocation: cfnApplicationV2S3ContentLocationPropertyToCloudFormation(properties.s3ContentLocation),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2CustomArtifactConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.CustomArtifactConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.CustomArtifactConfigurationProperty>();
    ret.addPropertyResult('artifactType', 'ArtifactType', cfn_parse.FromCloudFormation.getString(properties.ArtifactType));
    ret.addPropertyResult('mavenReference', 'MavenReference', properties.MavenReference != null ? CfnApplicationV2MavenReferencePropertyFromCloudFormation(properties.MavenReference) : undefined);
    ret.addPropertyResult('s3ContentLocation', 'S3ContentLocation', properties.S3ContentLocation != null ? CfnApplicationV2S3ContentLocationPropertyFromCloudFormation(properties.S3ContentLocation) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * The information required to deploy a Kinesis Data Analytics Studio notebook as an application with durable state.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-deployasapplicationconfiguration.html
     */
    export interface DeployAsApplicationConfigurationProperty {
        /**
         * The description of an Amazon S3 object that contains the Amazon Data Analytics application, including the Amazon Resource Name (ARN) of the S3 bucket, the name of the Amazon S3 object that contains the data, and the version number of the Amazon S3 object that contains the data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-deployasapplicationconfiguration.html#cfn-kinesisanalyticsv2-application-deployasapplicationconfiguration-s3contentlocation
         */
        readonly s3ContentLocation: CfnApplicationV2.S3ContentBaseLocationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DeployAsApplicationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `DeployAsApplicationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_DeployAsApplicationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3ContentLocation', cdk.requiredValidator)(properties.s3ContentLocation));
    errors.collect(cdk.propertyValidator('s3ContentLocation', CfnApplicationV2_S3ContentBaseLocationPropertyValidator)(properties.s3ContentLocation));
    return errors.wrap('supplied properties not correct for "DeployAsApplicationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.DeployAsApplicationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `DeployAsApplicationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.DeployAsApplicationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2DeployAsApplicationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_DeployAsApplicationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        S3ContentLocation: cfnApplicationV2S3ContentBaseLocationPropertyToCloudFormation(properties.s3ContentLocation),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2DeployAsApplicationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.DeployAsApplicationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.DeployAsApplicationConfigurationProperty>();
    ret.addPropertyResult('s3ContentLocation', 'S3ContentLocation', CfnApplicationV2S3ContentBaseLocationPropertyFromCloudFormation(properties.S3ContentLocation));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * Describes execution properties for a Flink-based Kinesis Data Analytics application.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-environmentproperties.html
     */
    export interface EnvironmentPropertiesProperty {
        /**
         * Describes the execution property groups.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-environmentproperties.html#cfn-kinesisanalyticsv2-application-environmentproperties-propertygroups
         */
        readonly propertyGroups?: Array<CfnApplicationV2.PropertyGroupProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `EnvironmentPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `EnvironmentPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_EnvironmentPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('propertyGroups', cdk.listValidator(CfnApplicationV2_PropertyGroupPropertyValidator))(properties.propertyGroups));
    return errors.wrap('supplied properties not correct for "EnvironmentPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.EnvironmentProperties` resource
 *
 * @param properties - the TypeScript properties of a `EnvironmentPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.EnvironmentProperties` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2EnvironmentPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_EnvironmentPropertiesPropertyValidator(properties).assertSuccess();
    return {
        PropertyGroups: cdk.listMapper(cfnApplicationV2PropertyGroupPropertyToCloudFormation)(properties.propertyGroups),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2EnvironmentPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.EnvironmentPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.EnvironmentPropertiesProperty>();
    ret.addPropertyResult('propertyGroups', 'PropertyGroups', properties.PropertyGroups != null ? cfn_parse.FromCloudFormation.getArray(CfnApplicationV2PropertyGroupPropertyFromCloudFormation)(properties.PropertyGroups) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * Describes configuration parameters for a Flink-based Kinesis Data Analytics application or a Studio notebook.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-flinkapplicationconfiguration.html
     */
    export interface FlinkApplicationConfigurationProperty {
        /**
         * Describes an application's checkpointing configuration. Checkpointing is the process of persisting application state for fault tolerance. For more information, see [Checkpoints for Fault Tolerance](https://docs.aws.amazon.com/https://ci.apache.org/projects/flink/flink-docs-release-1.8/concepts/programming-model.html#checkpoints-for-fault-tolerance) in the [Apache Flink Documentation](https://docs.aws.amazon.com/https://ci.apache.org/projects/flink/flink-docs-release-1.8/) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-flinkapplicationconfiguration.html#cfn-kinesisanalyticsv2-application-flinkapplicationconfiguration-checkpointconfiguration
         */
        readonly checkpointConfiguration?: CfnApplicationV2.CheckpointConfigurationProperty | cdk.IResolvable;
        /**
         * Describes configuration parameters for Amazon CloudWatch logging for an application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-flinkapplicationconfiguration.html#cfn-kinesisanalyticsv2-application-flinkapplicationconfiguration-monitoringconfiguration
         */
        readonly monitoringConfiguration?: CfnApplicationV2.MonitoringConfigurationProperty | cdk.IResolvable;
        /**
         * Describes parameters for how an application executes multiple tasks simultaneously.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-flinkapplicationconfiguration.html#cfn-kinesisanalyticsv2-application-flinkapplicationconfiguration-parallelismconfiguration
         */
        readonly parallelismConfiguration?: CfnApplicationV2.ParallelismConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `FlinkApplicationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `FlinkApplicationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_FlinkApplicationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('checkpointConfiguration', CfnApplicationV2_CheckpointConfigurationPropertyValidator)(properties.checkpointConfiguration));
    errors.collect(cdk.propertyValidator('monitoringConfiguration', CfnApplicationV2_MonitoringConfigurationPropertyValidator)(properties.monitoringConfiguration));
    errors.collect(cdk.propertyValidator('parallelismConfiguration', CfnApplicationV2_ParallelismConfigurationPropertyValidator)(properties.parallelismConfiguration));
    return errors.wrap('supplied properties not correct for "FlinkApplicationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.FlinkApplicationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `FlinkApplicationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.FlinkApplicationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2FlinkApplicationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_FlinkApplicationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CheckpointConfiguration: cfnApplicationV2CheckpointConfigurationPropertyToCloudFormation(properties.checkpointConfiguration),
        MonitoringConfiguration: cfnApplicationV2MonitoringConfigurationPropertyToCloudFormation(properties.monitoringConfiguration),
        ParallelismConfiguration: cfnApplicationV2ParallelismConfigurationPropertyToCloudFormation(properties.parallelismConfiguration),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2FlinkApplicationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.FlinkApplicationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.FlinkApplicationConfigurationProperty>();
    ret.addPropertyResult('checkpointConfiguration', 'CheckpointConfiguration', properties.CheckpointConfiguration != null ? CfnApplicationV2CheckpointConfigurationPropertyFromCloudFormation(properties.CheckpointConfiguration) : undefined);
    ret.addPropertyResult('monitoringConfiguration', 'MonitoringConfiguration', properties.MonitoringConfiguration != null ? CfnApplicationV2MonitoringConfigurationPropertyFromCloudFormation(properties.MonitoringConfiguration) : undefined);
    ret.addPropertyResult('parallelismConfiguration', 'ParallelismConfiguration', properties.ParallelismConfiguration != null ? CfnApplicationV2ParallelismConfigurationPropertyFromCloudFormation(properties.ParallelismConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * The configuration of the Glue Data Catalog that you use for Apache Flink SQL queries and table API transforms that you write in an application.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-gluedatacatalogconfiguration.html
     */
    export interface GlueDataCatalogConfigurationProperty {
        /**
         * The Amazon Resource Name (ARN) of the database.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-gluedatacatalogconfiguration.html#cfn-kinesisanalyticsv2-application-gluedatacatalogconfiguration-databasearn
         */
        readonly databaseArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `GlueDataCatalogConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `GlueDataCatalogConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_GlueDataCatalogConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('databaseArn', cdk.validateString)(properties.databaseArn));
    return errors.wrap('supplied properties not correct for "GlueDataCatalogConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.GlueDataCatalogConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `GlueDataCatalogConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.GlueDataCatalogConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2GlueDataCatalogConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_GlueDataCatalogConfigurationPropertyValidator(properties).assertSuccess();
    return {
        DatabaseARN: cdk.stringToCloudFormation(properties.databaseArn),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2GlueDataCatalogConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.GlueDataCatalogConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.GlueDataCatalogConfigurationProperty>();
    ret.addPropertyResult('databaseArn', 'DatabaseARN', properties.DatabaseARN != null ? cfn_parse.FromCloudFormation.getString(properties.DatabaseARN) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * When you configure the application input for a SQL-based Kinesis Data Analytics application, you specify the streaming source, the in-application stream name that is created, and the mapping between the two.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-input.html
     */
    export interface InputProperty {
        /**
         * Describes the number of in-application streams to create.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-input.html#cfn-kinesisanalyticsv2-application-input-inputparallelism
         */
        readonly inputParallelism?: CfnApplicationV2.InputParallelismProperty | cdk.IResolvable;
        /**
         * The [InputProcessingConfiguration](https://docs.aws.amazon.com/kinesisanalytics/latest/apiv2/API_InputProcessingConfiguration.html) for the input. An input processor transforms records as they are received from the stream, before the application's SQL code executes. Currently, the only input processing configuration available is [InputLambdaProcessor](https://docs.aws.amazon.com/kinesisanalytics/latest/apiv2/API_InputLambdaProcessor.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-input.html#cfn-kinesisanalyticsv2-application-input-inputprocessingconfiguration
         */
        readonly inputProcessingConfiguration?: CfnApplicationV2.InputProcessingConfigurationProperty | cdk.IResolvable;
        /**
         * Describes the format of the data in the streaming source, and how each data element maps to corresponding columns in the in-application stream that is being created.
         *
         * Also used to describe the format of the reference data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-input.html#cfn-kinesisanalyticsv2-application-input-inputschema
         */
        readonly inputSchema: CfnApplicationV2.InputSchemaProperty | cdk.IResolvable;
        /**
         * If the streaming source is an Amazon Kinesis Data Firehose delivery stream, identifies the delivery stream's ARN.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-input.html#cfn-kinesisanalyticsv2-application-input-kinesisfirehoseinput
         */
        readonly kinesisFirehoseInput?: CfnApplicationV2.KinesisFirehoseInputProperty | cdk.IResolvable;
        /**
         * If the streaming source is an Amazon Kinesis data stream, identifies the stream's Amazon Resource Name (ARN).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-input.html#cfn-kinesisanalyticsv2-application-input-kinesisstreamsinput
         */
        readonly kinesisStreamsInput?: CfnApplicationV2.KinesisStreamsInputProperty | cdk.IResolvable;
        /**
         * The name prefix to use when creating an in-application stream. Suppose that you specify a prefix " `MyInApplicationStream` ." Kinesis Data Analytics then creates one or more (as per the `InputParallelism` count you specified) in-application streams with the names " `MyInApplicationStream_001` ," " `MyInApplicationStream_002` ," and so on.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-input.html#cfn-kinesisanalyticsv2-application-input-nameprefix
         */
        readonly namePrefix: string;
    }
}

/**
 * Determine whether the given properties match those of a `InputProperty`
 *
 * @param properties - the TypeScript properties of a `InputProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_InputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('inputParallelism', CfnApplicationV2_InputParallelismPropertyValidator)(properties.inputParallelism));
    errors.collect(cdk.propertyValidator('inputProcessingConfiguration', CfnApplicationV2_InputProcessingConfigurationPropertyValidator)(properties.inputProcessingConfiguration));
    errors.collect(cdk.propertyValidator('inputSchema', cdk.requiredValidator)(properties.inputSchema));
    errors.collect(cdk.propertyValidator('inputSchema', CfnApplicationV2_InputSchemaPropertyValidator)(properties.inputSchema));
    errors.collect(cdk.propertyValidator('kinesisFirehoseInput', CfnApplicationV2_KinesisFirehoseInputPropertyValidator)(properties.kinesisFirehoseInput));
    errors.collect(cdk.propertyValidator('kinesisStreamsInput', CfnApplicationV2_KinesisStreamsInputPropertyValidator)(properties.kinesisStreamsInput));
    errors.collect(cdk.propertyValidator('namePrefix', cdk.requiredValidator)(properties.namePrefix));
    errors.collect(cdk.propertyValidator('namePrefix', cdk.validateString)(properties.namePrefix));
    return errors.wrap('supplied properties not correct for "InputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.Input` resource
 *
 * @param properties - the TypeScript properties of a `InputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.Input` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2InputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_InputPropertyValidator(properties).assertSuccess();
    return {
        InputParallelism: cfnApplicationV2InputParallelismPropertyToCloudFormation(properties.inputParallelism),
        InputProcessingConfiguration: cfnApplicationV2InputProcessingConfigurationPropertyToCloudFormation(properties.inputProcessingConfiguration),
        InputSchema: cfnApplicationV2InputSchemaPropertyToCloudFormation(properties.inputSchema),
        KinesisFirehoseInput: cfnApplicationV2KinesisFirehoseInputPropertyToCloudFormation(properties.kinesisFirehoseInput),
        KinesisStreamsInput: cfnApplicationV2KinesisStreamsInputPropertyToCloudFormation(properties.kinesisStreamsInput),
        NamePrefix: cdk.stringToCloudFormation(properties.namePrefix),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2InputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.InputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.InputProperty>();
    ret.addPropertyResult('inputParallelism', 'InputParallelism', properties.InputParallelism != null ? CfnApplicationV2InputParallelismPropertyFromCloudFormation(properties.InputParallelism) : undefined);
    ret.addPropertyResult('inputProcessingConfiguration', 'InputProcessingConfiguration', properties.InputProcessingConfiguration != null ? CfnApplicationV2InputProcessingConfigurationPropertyFromCloudFormation(properties.InputProcessingConfiguration) : undefined);
    ret.addPropertyResult('inputSchema', 'InputSchema', CfnApplicationV2InputSchemaPropertyFromCloudFormation(properties.InputSchema));
    ret.addPropertyResult('kinesisFirehoseInput', 'KinesisFirehoseInput', properties.KinesisFirehoseInput != null ? CfnApplicationV2KinesisFirehoseInputPropertyFromCloudFormation(properties.KinesisFirehoseInput) : undefined);
    ret.addPropertyResult('kinesisStreamsInput', 'KinesisStreamsInput', properties.KinesisStreamsInput != null ? CfnApplicationV2KinesisStreamsInputPropertyFromCloudFormation(properties.KinesisStreamsInput) : undefined);
    ret.addPropertyResult('namePrefix', 'NamePrefix', cfn_parse.FromCloudFormation.getString(properties.NamePrefix));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * An object that contains the Amazon Resource Name (ARN) of the Amazon Lambda function that is used to preprocess records in the stream in a SQL-based Kinesis Data Analytics application.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-inputlambdaprocessor.html
     */
    export interface InputLambdaProcessorProperty {
        /**
         * The ARN of the Amazon Lambda function that operates on records in the stream.
         *
         * > To specify an earlier version of the Lambda function than the latest, include the Lambda function version in the Lambda function ARN. For more information about Lambda ARNs, see [Example ARNs: Amazon Lambda](https://docs.aws.amazon.com//general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-lambda)
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-inputlambdaprocessor.html#cfn-kinesisanalyticsv2-application-inputlambdaprocessor-resourcearn
         */
        readonly resourceArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `InputLambdaProcessorProperty`
 *
 * @param properties - the TypeScript properties of a `InputLambdaProcessorProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_InputLambdaProcessorPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('resourceArn', cdk.requiredValidator)(properties.resourceArn));
    errors.collect(cdk.propertyValidator('resourceArn', cdk.validateString)(properties.resourceArn));
    return errors.wrap('supplied properties not correct for "InputLambdaProcessorProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.InputLambdaProcessor` resource
 *
 * @param properties - the TypeScript properties of a `InputLambdaProcessorProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.InputLambdaProcessor` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2InputLambdaProcessorPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_InputLambdaProcessorPropertyValidator(properties).assertSuccess();
    return {
        ResourceARN: cdk.stringToCloudFormation(properties.resourceArn),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2InputLambdaProcessorPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.InputLambdaProcessorProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.InputLambdaProcessorProperty>();
    ret.addPropertyResult('resourceArn', 'ResourceARN', cfn_parse.FromCloudFormation.getString(properties.ResourceARN));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * For a SQL-based Kinesis Data Analytics application, describes the number of in-application streams to create for a given streaming source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-inputparallelism.html
     */
    export interface InputParallelismProperty {
        /**
         * The number of in-application streams to create.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-inputparallelism.html#cfn-kinesisanalyticsv2-application-inputparallelism-count
         */
        readonly count?: number;
    }
}

/**
 * Determine whether the given properties match those of a `InputParallelismProperty`
 *
 * @param properties - the TypeScript properties of a `InputParallelismProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_InputParallelismPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('count', cdk.validateNumber)(properties.count));
    return errors.wrap('supplied properties not correct for "InputParallelismProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.InputParallelism` resource
 *
 * @param properties - the TypeScript properties of a `InputParallelismProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.InputParallelism` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2InputParallelismPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_InputParallelismPropertyValidator(properties).assertSuccess();
    return {
        Count: cdk.numberToCloudFormation(properties.count),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2InputParallelismPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.InputParallelismProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.InputParallelismProperty>();
    ret.addPropertyResult('count', 'Count', properties.Count != null ? cfn_parse.FromCloudFormation.getNumber(properties.Count) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * For an SQL-based Amazon Kinesis Data Analytics application, describes a processor that is used to preprocess the records in the stream before being processed by your application code. Currently, the only input processor available is [Amazon Lambda](https://docs.aws.amazon.com/lambda/) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-inputprocessingconfiguration.html
     */
    export interface InputProcessingConfigurationProperty {
        /**
         * The [InputLambdaProcessor](https://docs.aws.amazon.com/kinesisanalytics/latest/apiv2/API_InputLambdaProcessor.html) that is used to preprocess the records in the stream before being processed by your application code.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-inputprocessingconfiguration.html#cfn-kinesisanalyticsv2-application-inputprocessingconfiguration-inputlambdaprocessor
         */
        readonly inputLambdaProcessor?: CfnApplicationV2.InputLambdaProcessorProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `InputProcessingConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `InputProcessingConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_InputProcessingConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('inputLambdaProcessor', CfnApplicationV2_InputLambdaProcessorPropertyValidator)(properties.inputLambdaProcessor));
    return errors.wrap('supplied properties not correct for "InputProcessingConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.InputProcessingConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `InputProcessingConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.InputProcessingConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2InputProcessingConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_InputProcessingConfigurationPropertyValidator(properties).assertSuccess();
    return {
        InputLambdaProcessor: cfnApplicationV2InputLambdaProcessorPropertyToCloudFormation(properties.inputLambdaProcessor),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2InputProcessingConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.InputProcessingConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.InputProcessingConfigurationProperty>();
    ret.addPropertyResult('inputLambdaProcessor', 'InputLambdaProcessor', properties.InputLambdaProcessor != null ? CfnApplicationV2InputLambdaProcessorPropertyFromCloudFormation(properties.InputLambdaProcessor) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * For a SQL-based Kinesis Data Analytics application, describes the format of the data in the streaming source, and how each data element maps to corresponding columns created in the in-application stream.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-inputschema.html
     */
    export interface InputSchemaProperty {
        /**
         * A list of `RecordColumn` objects.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-inputschema.html#cfn-kinesisanalyticsv2-application-inputschema-recordcolumns
         */
        readonly recordColumns: Array<CfnApplicationV2.RecordColumnProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * Specifies the encoding of the records in the streaming source. For example, UTF-8.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-inputschema.html#cfn-kinesisanalyticsv2-application-inputschema-recordencoding
         */
        readonly recordEncoding?: string;
        /**
         * Specifies the format of the records on the streaming source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-inputschema.html#cfn-kinesisanalyticsv2-application-inputschema-recordformat
         */
        readonly recordFormat: CfnApplicationV2.RecordFormatProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `InputSchemaProperty`
 *
 * @param properties - the TypeScript properties of a `InputSchemaProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_InputSchemaPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('recordColumns', cdk.requiredValidator)(properties.recordColumns));
    errors.collect(cdk.propertyValidator('recordColumns', cdk.listValidator(CfnApplicationV2_RecordColumnPropertyValidator))(properties.recordColumns));
    errors.collect(cdk.propertyValidator('recordEncoding', cdk.validateString)(properties.recordEncoding));
    errors.collect(cdk.propertyValidator('recordFormat', cdk.requiredValidator)(properties.recordFormat));
    errors.collect(cdk.propertyValidator('recordFormat', CfnApplicationV2_RecordFormatPropertyValidator)(properties.recordFormat));
    return errors.wrap('supplied properties not correct for "InputSchemaProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.InputSchema` resource
 *
 * @param properties - the TypeScript properties of a `InputSchemaProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.InputSchema` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2InputSchemaPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_InputSchemaPropertyValidator(properties).assertSuccess();
    return {
        RecordColumns: cdk.listMapper(cfnApplicationV2RecordColumnPropertyToCloudFormation)(properties.recordColumns),
        RecordEncoding: cdk.stringToCloudFormation(properties.recordEncoding),
        RecordFormat: cfnApplicationV2RecordFormatPropertyToCloudFormation(properties.recordFormat),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2InputSchemaPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.InputSchemaProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.InputSchemaProperty>();
    ret.addPropertyResult('recordColumns', 'RecordColumns', cfn_parse.FromCloudFormation.getArray(CfnApplicationV2RecordColumnPropertyFromCloudFormation)(properties.RecordColumns));
    ret.addPropertyResult('recordEncoding', 'RecordEncoding', properties.RecordEncoding != null ? cfn_parse.FromCloudFormation.getString(properties.RecordEncoding) : undefined);
    ret.addPropertyResult('recordFormat', 'RecordFormat', CfnApplicationV2RecordFormatPropertyFromCloudFormation(properties.RecordFormat));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * For a SQL-based Kinesis Data Analytics application, provides additional mapping information when JSON is the record format on the streaming source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-jsonmappingparameters.html
     */
    export interface JSONMappingParametersProperty {
        /**
         * The path to the top-level parent that contains the records.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-jsonmappingparameters.html#cfn-kinesisanalyticsv2-application-jsonmappingparameters-recordrowpath
         */
        readonly recordRowPath: string;
    }
}

/**
 * Determine whether the given properties match those of a `JSONMappingParametersProperty`
 *
 * @param properties - the TypeScript properties of a `JSONMappingParametersProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_JSONMappingParametersPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('recordRowPath', cdk.requiredValidator)(properties.recordRowPath));
    errors.collect(cdk.propertyValidator('recordRowPath', cdk.validateString)(properties.recordRowPath));
    return errors.wrap('supplied properties not correct for "JSONMappingParametersProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.JSONMappingParameters` resource
 *
 * @param properties - the TypeScript properties of a `JSONMappingParametersProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.JSONMappingParameters` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2JSONMappingParametersPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_JSONMappingParametersPropertyValidator(properties).assertSuccess();
    return {
        RecordRowPath: cdk.stringToCloudFormation(properties.recordRowPath),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2JSONMappingParametersPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.JSONMappingParametersProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.JSONMappingParametersProperty>();
    ret.addPropertyResult('recordRowPath', 'RecordRowPath', cfn_parse.FromCloudFormation.getString(properties.RecordRowPath));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * For a SQL-based Kinesis Data Analytics application, identifies a Kinesis Data Firehose delivery stream as the streaming source. You provide the delivery stream's Amazon Resource Name (ARN).
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-kinesisfirehoseinput.html
     */
    export interface KinesisFirehoseInputProperty {
        /**
         * The Amazon Resource Name (ARN) of the delivery stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-kinesisfirehoseinput.html#cfn-kinesisanalyticsv2-application-kinesisfirehoseinput-resourcearn
         */
        readonly resourceArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `KinesisFirehoseInputProperty`
 *
 * @param properties - the TypeScript properties of a `KinesisFirehoseInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_KinesisFirehoseInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('resourceArn', cdk.requiredValidator)(properties.resourceArn));
    errors.collect(cdk.propertyValidator('resourceArn', cdk.validateString)(properties.resourceArn));
    return errors.wrap('supplied properties not correct for "KinesisFirehoseInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.KinesisFirehoseInput` resource
 *
 * @param properties - the TypeScript properties of a `KinesisFirehoseInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.KinesisFirehoseInput` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2KinesisFirehoseInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_KinesisFirehoseInputPropertyValidator(properties).assertSuccess();
    return {
        ResourceARN: cdk.stringToCloudFormation(properties.resourceArn),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2KinesisFirehoseInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.KinesisFirehoseInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.KinesisFirehoseInputProperty>();
    ret.addPropertyResult('resourceArn', 'ResourceARN', cfn_parse.FromCloudFormation.getString(properties.ResourceARN));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * Identifies a Kinesis data stream as the streaming source. You provide the stream's Amazon Resource Name (ARN).
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-kinesisstreamsinput.html
     */
    export interface KinesisStreamsInputProperty {
        /**
         * The ARN of the input Kinesis data stream to read.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-kinesisstreamsinput.html#cfn-kinesisanalyticsv2-application-kinesisstreamsinput-resourcearn
         */
        readonly resourceArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `KinesisStreamsInputProperty`
 *
 * @param properties - the TypeScript properties of a `KinesisStreamsInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_KinesisStreamsInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('resourceArn', cdk.requiredValidator)(properties.resourceArn));
    errors.collect(cdk.propertyValidator('resourceArn', cdk.validateString)(properties.resourceArn));
    return errors.wrap('supplied properties not correct for "KinesisStreamsInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.KinesisStreamsInput` resource
 *
 * @param properties - the TypeScript properties of a `KinesisStreamsInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.KinesisStreamsInput` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2KinesisStreamsInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_KinesisStreamsInputPropertyValidator(properties).assertSuccess();
    return {
        ResourceARN: cdk.stringToCloudFormation(properties.resourceArn),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2KinesisStreamsInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.KinesisStreamsInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.KinesisStreamsInputProperty>();
    ret.addPropertyResult('resourceArn', 'ResourceARN', cfn_parse.FromCloudFormation.getString(properties.ResourceARN));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * When you configure a SQL-based Kinesis Data Analytics application's input at the time of creating or updating an application, provides additional mapping information specific to the record format (such as JSON, CSV, or record fields delimited by some delimiter) on the streaming source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-mappingparameters.html
     */
    export interface MappingParametersProperty {
        /**
         * Provides additional mapping information when the record format uses delimiters (for example, CSV).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-mappingparameters.html#cfn-kinesisanalyticsv2-application-mappingparameters-csvmappingparameters
         */
        readonly csvMappingParameters?: CfnApplicationV2.CSVMappingParametersProperty | cdk.IResolvable;
        /**
         * Provides additional mapping information when JSON is the record format on the streaming source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-mappingparameters.html#cfn-kinesisanalyticsv2-application-mappingparameters-jsonmappingparameters
         */
        readonly jsonMappingParameters?: CfnApplicationV2.JSONMappingParametersProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MappingParametersProperty`
 *
 * @param properties - the TypeScript properties of a `MappingParametersProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_MappingParametersPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('csvMappingParameters', CfnApplicationV2_CSVMappingParametersPropertyValidator)(properties.csvMappingParameters));
    errors.collect(cdk.propertyValidator('jsonMappingParameters', CfnApplicationV2_JSONMappingParametersPropertyValidator)(properties.jsonMappingParameters));
    return errors.wrap('supplied properties not correct for "MappingParametersProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.MappingParameters` resource
 *
 * @param properties - the TypeScript properties of a `MappingParametersProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.MappingParameters` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2MappingParametersPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_MappingParametersPropertyValidator(properties).assertSuccess();
    return {
        CSVMappingParameters: cfnApplicationV2CSVMappingParametersPropertyToCloudFormation(properties.csvMappingParameters),
        JSONMappingParameters: cfnApplicationV2JSONMappingParametersPropertyToCloudFormation(properties.jsonMappingParameters),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2MappingParametersPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.MappingParametersProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.MappingParametersProperty>();
    ret.addPropertyResult('csvMappingParameters', 'CSVMappingParameters', properties.CSVMappingParameters != null ? CfnApplicationV2CSVMappingParametersPropertyFromCloudFormation(properties.CSVMappingParameters) : undefined);
    ret.addPropertyResult('jsonMappingParameters', 'JSONMappingParameters', properties.JSONMappingParameters != null ? CfnApplicationV2JSONMappingParametersPropertyFromCloudFormation(properties.JSONMappingParameters) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * The information required to specify a Maven reference. You can use Maven references to specify dependency JAR files.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-mavenreference.html
     */
    export interface MavenReferenceProperty {
        /**
         * The artifact ID of the Maven reference.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-mavenreference.html#cfn-kinesisanalyticsv2-application-mavenreference-artifactid
         */
        readonly artifactId: string;
        /**
         * The group ID of the Maven reference.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-mavenreference.html#cfn-kinesisanalyticsv2-application-mavenreference-groupid
         */
        readonly groupId: string;
        /**
         * The version of the Maven reference.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-mavenreference.html#cfn-kinesisanalyticsv2-application-mavenreference-version
         */
        readonly version: string;
    }
}

/**
 * Determine whether the given properties match those of a `MavenReferenceProperty`
 *
 * @param properties - the TypeScript properties of a `MavenReferenceProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_MavenReferencePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('artifactId', cdk.requiredValidator)(properties.artifactId));
    errors.collect(cdk.propertyValidator('artifactId', cdk.validateString)(properties.artifactId));
    errors.collect(cdk.propertyValidator('groupId', cdk.requiredValidator)(properties.groupId));
    errors.collect(cdk.propertyValidator('groupId', cdk.validateString)(properties.groupId));
    errors.collect(cdk.propertyValidator('version', cdk.requiredValidator)(properties.version));
    errors.collect(cdk.propertyValidator('version', cdk.validateString)(properties.version));
    return errors.wrap('supplied properties not correct for "MavenReferenceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.MavenReference` resource
 *
 * @param properties - the TypeScript properties of a `MavenReferenceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.MavenReference` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2MavenReferencePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_MavenReferencePropertyValidator(properties).assertSuccess();
    return {
        ArtifactId: cdk.stringToCloudFormation(properties.artifactId),
        GroupId: cdk.stringToCloudFormation(properties.groupId),
        Version: cdk.stringToCloudFormation(properties.version),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2MavenReferencePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.MavenReferenceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.MavenReferenceProperty>();
    ret.addPropertyResult('artifactId', 'ArtifactId', cfn_parse.FromCloudFormation.getString(properties.ArtifactId));
    ret.addPropertyResult('groupId', 'GroupId', cfn_parse.FromCloudFormation.getString(properties.GroupId));
    ret.addPropertyResult('version', 'Version', cfn_parse.FromCloudFormation.getString(properties.Version));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * Describes configuration parameters for Amazon CloudWatch logging for a Java-based Kinesis Data Analytics application. For more information about CloudWatch logging, see [Monitoring](https://docs.aws.amazon.com/kinesisanalytics/latest/java/monitoring-overview) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-monitoringconfiguration.html
     */
    export interface MonitoringConfigurationProperty {
        /**
         * Describes whether to use the default CloudWatch logging configuration for an application. You must set this property to `CUSTOM` in order to set the `LogLevel` or `MetricsLevel` parameters.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-monitoringconfiguration.html#cfn-kinesisanalyticsv2-application-monitoringconfiguration-configurationtype
         */
        readonly configurationType: string;
        /**
         * Describes the verbosity of the CloudWatch Logs for an application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-monitoringconfiguration.html#cfn-kinesisanalyticsv2-application-monitoringconfiguration-loglevel
         */
        readonly logLevel?: string;
        /**
         * Describes the granularity of the CloudWatch Logs for an application. The `Parallelism` level is not recommended for applications with a Parallelism over 64 due to excessive costs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-monitoringconfiguration.html#cfn-kinesisanalyticsv2-application-monitoringconfiguration-metricslevel
         */
        readonly metricsLevel?: string;
    }
}

/**
 * Determine whether the given properties match those of a `MonitoringConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `MonitoringConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_MonitoringConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('configurationType', cdk.requiredValidator)(properties.configurationType));
    errors.collect(cdk.propertyValidator('configurationType', cdk.validateString)(properties.configurationType));
    errors.collect(cdk.propertyValidator('logLevel', cdk.validateString)(properties.logLevel));
    errors.collect(cdk.propertyValidator('metricsLevel', cdk.validateString)(properties.metricsLevel));
    return errors.wrap('supplied properties not correct for "MonitoringConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.MonitoringConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `MonitoringConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.MonitoringConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2MonitoringConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_MonitoringConfigurationPropertyValidator(properties).assertSuccess();
    return {
        ConfigurationType: cdk.stringToCloudFormation(properties.configurationType),
        LogLevel: cdk.stringToCloudFormation(properties.logLevel),
        MetricsLevel: cdk.stringToCloudFormation(properties.metricsLevel),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2MonitoringConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.MonitoringConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.MonitoringConfigurationProperty>();
    ret.addPropertyResult('configurationType', 'ConfigurationType', cfn_parse.FromCloudFormation.getString(properties.ConfigurationType));
    ret.addPropertyResult('logLevel', 'LogLevel', properties.LogLevel != null ? cfn_parse.FromCloudFormation.getString(properties.LogLevel) : undefined);
    ret.addPropertyResult('metricsLevel', 'MetricsLevel', properties.MetricsLevel != null ? cfn_parse.FromCloudFormation.getString(properties.MetricsLevel) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * Describes parameters for how a Flink-based Kinesis Data Analytics application executes multiple tasks simultaneously. For more information about parallelism, see [Parallel Execution](https://docs.aws.amazon.com/https://ci.apache.org/projects/flink/flink-docs-release-1.8/dev/parallel.html) in the [Apache Flink Documentation](https://docs.aws.amazon.com/https://ci.apache.org/projects/flink/flink-docs-release-1.8/) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-parallelismconfiguration.html
     */
    export interface ParallelismConfigurationProperty {
        /**
         * Describes whether the Kinesis Data Analytics service can increase the parallelism of the application in response to increased throughput.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-parallelismconfiguration.html#cfn-kinesisanalyticsv2-application-parallelismconfiguration-autoscalingenabled
         */
        readonly autoScalingEnabled?: boolean | cdk.IResolvable;
        /**
         * Describes whether the application uses the default parallelism for the Kinesis Data Analytics service. You must set this property to `CUSTOM` in order to change your application's `AutoScalingEnabled` , `Parallelism` , or `ParallelismPerKPU` properties.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-parallelismconfiguration.html#cfn-kinesisanalyticsv2-application-parallelismconfiguration-configurationtype
         */
        readonly configurationType: string;
        /**
         * Describes the initial number of parallel tasks that a Java-based Kinesis Data Analytics application can perform. The Kinesis Data Analytics service can increase this number automatically if [ParallelismConfiguration:AutoScalingEnabled](https://docs.aws.amazon.com/kinesisanalytics/latest/apiv2/API_ParallelismConfiguration.html#kinesisanalytics-Type-ParallelismConfiguration-AutoScalingEnabled.html) is set to `true` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-parallelismconfiguration.html#cfn-kinesisanalyticsv2-application-parallelismconfiguration-parallelism
         */
        readonly parallelism?: number;
        /**
         * Describes the number of parallel tasks that a Java-based Kinesis Data Analytics application can perform per Kinesis Processing Unit (KPU) used by the application. For more information about KPUs, see [Amazon Kinesis Data Analytics Pricing](https://docs.aws.amazon.com/kinesis/data-analytics/pricing/) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-parallelismconfiguration.html#cfn-kinesisanalyticsv2-application-parallelismconfiguration-parallelismperkpu
         */
        readonly parallelismPerKpu?: number;
    }
}

/**
 * Determine whether the given properties match those of a `ParallelismConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ParallelismConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_ParallelismConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('autoScalingEnabled', cdk.validateBoolean)(properties.autoScalingEnabled));
    errors.collect(cdk.propertyValidator('configurationType', cdk.requiredValidator)(properties.configurationType));
    errors.collect(cdk.propertyValidator('configurationType', cdk.validateString)(properties.configurationType));
    errors.collect(cdk.propertyValidator('parallelism', cdk.validateNumber)(properties.parallelism));
    errors.collect(cdk.propertyValidator('parallelismPerKpu', cdk.validateNumber)(properties.parallelismPerKpu));
    return errors.wrap('supplied properties not correct for "ParallelismConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.ParallelismConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ParallelismConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.ParallelismConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2ParallelismConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_ParallelismConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AutoScalingEnabled: cdk.booleanToCloudFormation(properties.autoScalingEnabled),
        ConfigurationType: cdk.stringToCloudFormation(properties.configurationType),
        Parallelism: cdk.numberToCloudFormation(properties.parallelism),
        ParallelismPerKPU: cdk.numberToCloudFormation(properties.parallelismPerKpu),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2ParallelismConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.ParallelismConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.ParallelismConfigurationProperty>();
    ret.addPropertyResult('autoScalingEnabled', 'AutoScalingEnabled', properties.AutoScalingEnabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AutoScalingEnabled) : undefined);
    ret.addPropertyResult('configurationType', 'ConfigurationType', cfn_parse.FromCloudFormation.getString(properties.ConfigurationType));
    ret.addPropertyResult('parallelism', 'Parallelism', properties.Parallelism != null ? cfn_parse.FromCloudFormation.getNumber(properties.Parallelism) : undefined);
    ret.addPropertyResult('parallelismPerKpu', 'ParallelismPerKPU', properties.ParallelismPerKPU != null ? cfn_parse.FromCloudFormation.getNumber(properties.ParallelismPerKPU) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * Property key-value pairs passed into an application.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-propertygroup.html
     */
    export interface PropertyGroupProperty {
        /**
         * Describes the key of an application execution property key-value pair.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-propertygroup.html#cfn-kinesisanalyticsv2-application-propertygroup-propertygroupid
         */
        readonly propertyGroupId?: string;
        /**
         * Describes the value of an application execution property key-value pair.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-propertygroup.html#cfn-kinesisanalyticsv2-application-propertygroup-propertymap
         */
        readonly propertyMap?: any | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `PropertyGroupProperty`
 *
 * @param properties - the TypeScript properties of a `PropertyGroupProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_PropertyGroupPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('propertyGroupId', cdk.validateString)(properties.propertyGroupId));
    errors.collect(cdk.propertyValidator('propertyMap', cdk.validateObject)(properties.propertyMap));
    return errors.wrap('supplied properties not correct for "PropertyGroupProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.PropertyGroup` resource
 *
 * @param properties - the TypeScript properties of a `PropertyGroupProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.PropertyGroup` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2PropertyGroupPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_PropertyGroupPropertyValidator(properties).assertSuccess();
    return {
        PropertyGroupId: cdk.stringToCloudFormation(properties.propertyGroupId),
        PropertyMap: cdk.objectToCloudFormation(properties.propertyMap),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2PropertyGroupPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.PropertyGroupProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.PropertyGroupProperty>();
    ret.addPropertyResult('propertyGroupId', 'PropertyGroupId', properties.PropertyGroupId != null ? cfn_parse.FromCloudFormation.getString(properties.PropertyGroupId) : undefined);
    ret.addPropertyResult('propertyMap', 'PropertyMap', properties.PropertyMap != null ? cfn_parse.FromCloudFormation.getAny(properties.PropertyMap) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * For a SQL-based Kinesis Data Analytics application, describes the mapping of each data element in the streaming source to the corresponding column in the in-application stream.
     *
     * Also used to describe the format of the reference data source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-recordcolumn.html
     */
    export interface RecordColumnProperty {
        /**
         * A reference to the data element in the streaming input or the reference data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-recordcolumn.html#cfn-kinesisanalyticsv2-application-recordcolumn-mapping
         */
        readonly mapping?: string;
        /**
         * The name of the column that is created in the in-application input stream or reference table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-recordcolumn.html#cfn-kinesisanalyticsv2-application-recordcolumn-name
         */
        readonly name: string;
        /**
         * The type of column created in the in-application input stream or reference table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-recordcolumn.html#cfn-kinesisanalyticsv2-application-recordcolumn-sqltype
         */
        readonly sqlType: string;
    }
}

/**
 * Determine whether the given properties match those of a `RecordColumnProperty`
 *
 * @param properties - the TypeScript properties of a `RecordColumnProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_RecordColumnPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('mapping', cdk.validateString)(properties.mapping));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('sqlType', cdk.requiredValidator)(properties.sqlType));
    errors.collect(cdk.propertyValidator('sqlType', cdk.validateString)(properties.sqlType));
    return errors.wrap('supplied properties not correct for "RecordColumnProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.RecordColumn` resource
 *
 * @param properties - the TypeScript properties of a `RecordColumnProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.RecordColumn` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2RecordColumnPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_RecordColumnPropertyValidator(properties).assertSuccess();
    return {
        Mapping: cdk.stringToCloudFormation(properties.mapping),
        Name: cdk.stringToCloudFormation(properties.name),
        SqlType: cdk.stringToCloudFormation(properties.sqlType),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2RecordColumnPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.RecordColumnProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.RecordColumnProperty>();
    ret.addPropertyResult('mapping', 'Mapping', properties.Mapping != null ? cfn_parse.FromCloudFormation.getString(properties.Mapping) : undefined);
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('sqlType', 'SqlType', cfn_parse.FromCloudFormation.getString(properties.SqlType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * For a SQL-based Kinesis Data Analytics application, describes the record format and relevant mapping information that should be applied to schematize the records on the stream.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-recordformat.html
     */
    export interface RecordFormatProperty {
        /**
         * When you configure application input at the time of creating or updating an application, provides additional mapping information specific to the record format (such as JSON, CSV, or record fields delimited by some delimiter) on the streaming source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-recordformat.html#cfn-kinesisanalyticsv2-application-recordformat-mappingparameters
         */
        readonly mappingParameters?: CfnApplicationV2.MappingParametersProperty | cdk.IResolvable;
        /**
         * The type of record format.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-recordformat.html#cfn-kinesisanalyticsv2-application-recordformat-recordformattype
         */
        readonly recordFormatType: string;
    }
}

/**
 * Determine whether the given properties match those of a `RecordFormatProperty`
 *
 * @param properties - the TypeScript properties of a `RecordFormatProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_RecordFormatPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('mappingParameters', CfnApplicationV2_MappingParametersPropertyValidator)(properties.mappingParameters));
    errors.collect(cdk.propertyValidator('recordFormatType', cdk.requiredValidator)(properties.recordFormatType));
    errors.collect(cdk.propertyValidator('recordFormatType', cdk.validateString)(properties.recordFormatType));
    return errors.wrap('supplied properties not correct for "RecordFormatProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.RecordFormat` resource
 *
 * @param properties - the TypeScript properties of a `RecordFormatProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.RecordFormat` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2RecordFormatPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_RecordFormatPropertyValidator(properties).assertSuccess();
    return {
        MappingParameters: cfnApplicationV2MappingParametersPropertyToCloudFormation(properties.mappingParameters),
        RecordFormatType: cdk.stringToCloudFormation(properties.recordFormatType),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2RecordFormatPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.RecordFormatProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.RecordFormatProperty>();
    ret.addPropertyResult('mappingParameters', 'MappingParameters', properties.MappingParameters != null ? CfnApplicationV2MappingParametersPropertyFromCloudFormation(properties.MappingParameters) : undefined);
    ret.addPropertyResult('recordFormatType', 'RecordFormatType', cfn_parse.FromCloudFormation.getString(properties.RecordFormatType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * The base location of the Amazon Data Analytics application.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-s3contentbaselocation.html
     */
    export interface S3ContentBaseLocationProperty {
        /**
         * The base path for the S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-s3contentbaselocation.html#cfn-kinesisanalyticsv2-application-s3contentbaselocation-basepath
         */
        readonly basePath: string;
        /**
         * The Amazon Resource Name (ARN) of the S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-s3contentbaselocation.html#cfn-kinesisanalyticsv2-application-s3contentbaselocation-bucketarn
         */
        readonly bucketArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3ContentBaseLocationProperty`
 *
 * @param properties - the TypeScript properties of a `S3ContentBaseLocationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_S3ContentBaseLocationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('basePath', cdk.requiredValidator)(properties.basePath));
    errors.collect(cdk.propertyValidator('basePath', cdk.validateString)(properties.basePath));
    errors.collect(cdk.propertyValidator('bucketArn', cdk.requiredValidator)(properties.bucketArn));
    errors.collect(cdk.propertyValidator('bucketArn', cdk.validateString)(properties.bucketArn));
    return errors.wrap('supplied properties not correct for "S3ContentBaseLocationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.S3ContentBaseLocation` resource
 *
 * @param properties - the TypeScript properties of a `S3ContentBaseLocationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.S3ContentBaseLocation` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2S3ContentBaseLocationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_S3ContentBaseLocationPropertyValidator(properties).assertSuccess();
    return {
        BasePath: cdk.stringToCloudFormation(properties.basePath),
        BucketARN: cdk.stringToCloudFormation(properties.bucketArn),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2S3ContentBaseLocationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.S3ContentBaseLocationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.S3ContentBaseLocationProperty>();
    ret.addPropertyResult('basePath', 'BasePath', cfn_parse.FromCloudFormation.getString(properties.BasePath));
    ret.addPropertyResult('bucketArn', 'BucketARN', cfn_parse.FromCloudFormation.getString(properties.BucketARN));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * The location of an application or a custom artifact.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-s3contentlocation.html
     */
    export interface S3ContentLocationProperty {
        /**
         * The Amazon Resource Name (ARN) for the S3 bucket containing the application code.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-s3contentlocation.html#cfn-kinesisanalyticsv2-application-s3contentlocation-bucketarn
         */
        readonly bucketArn?: string;
        /**
         * The file key for the object containing the application code.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-s3contentlocation.html#cfn-kinesisanalyticsv2-application-s3contentlocation-filekey
         */
        readonly fileKey?: string;
        /**
         * The version of the object containing the application code.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-s3contentlocation.html#cfn-kinesisanalyticsv2-application-s3contentlocation-objectversion
         */
        readonly objectVersion?: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3ContentLocationProperty`
 *
 * @param properties - the TypeScript properties of a `S3ContentLocationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_S3ContentLocationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketArn', cdk.validateString)(properties.bucketArn));
    errors.collect(cdk.propertyValidator('fileKey', cdk.validateString)(properties.fileKey));
    errors.collect(cdk.propertyValidator('objectVersion', cdk.validateString)(properties.objectVersion));
    return errors.wrap('supplied properties not correct for "S3ContentLocationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.S3ContentLocation` resource
 *
 * @param properties - the TypeScript properties of a `S3ContentLocationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.S3ContentLocation` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2S3ContentLocationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_S3ContentLocationPropertyValidator(properties).assertSuccess();
    return {
        BucketARN: cdk.stringToCloudFormation(properties.bucketArn),
        FileKey: cdk.stringToCloudFormation(properties.fileKey),
        ObjectVersion: cdk.stringToCloudFormation(properties.objectVersion),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2S3ContentLocationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.S3ContentLocationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.S3ContentLocationProperty>();
    ret.addPropertyResult('bucketArn', 'BucketARN', properties.BucketARN != null ? cfn_parse.FromCloudFormation.getString(properties.BucketARN) : undefined);
    ret.addPropertyResult('fileKey', 'FileKey', properties.FileKey != null ? cfn_parse.FromCloudFormation.getString(properties.FileKey) : undefined);
    ret.addPropertyResult('objectVersion', 'ObjectVersion', properties.ObjectVersion != null ? cfn_parse.FromCloudFormation.getString(properties.ObjectVersion) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * Describes the inputs, outputs, and reference data sources for a SQL-based Kinesis Data Analytics application.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-sqlapplicationconfiguration.html
     */
    export interface SqlApplicationConfigurationProperty {
        /**
         * The array of [Input](https://docs.aws.amazon.com/kinesisanalytics/latest/apiv2/API_Input.html) objects describing the input streams used by the application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-sqlapplicationconfiguration.html#cfn-kinesisanalyticsv2-application-sqlapplicationconfiguration-inputs
         */
        readonly inputs?: Array<CfnApplicationV2.InputProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SqlApplicationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `SqlApplicationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_SqlApplicationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('inputs', cdk.listValidator(CfnApplicationV2_InputPropertyValidator))(properties.inputs));
    return errors.wrap('supplied properties not correct for "SqlApplicationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.SqlApplicationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `SqlApplicationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.SqlApplicationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2SqlApplicationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_SqlApplicationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Inputs: cdk.listMapper(cfnApplicationV2InputPropertyToCloudFormation)(properties.inputs),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2SqlApplicationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.SqlApplicationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.SqlApplicationConfigurationProperty>();
    ret.addPropertyResult('inputs', 'Inputs', properties.Inputs != null ? cfn_parse.FromCloudFormation.getArray(CfnApplicationV2InputPropertyFromCloudFormation)(properties.Inputs) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * The configuration of a Kinesis Data Analytics Studio notebook.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-zeppelinapplicationconfiguration.html
     */
    export interface ZeppelinApplicationConfigurationProperty {
        /**
         * The Amazon Glue Data Catalog that you use in queries in a Kinesis Data Analytics Studio notebook.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-zeppelinapplicationconfiguration.html#cfn-kinesisanalyticsv2-application-zeppelinapplicationconfiguration-catalogconfiguration
         */
        readonly catalogConfiguration?: CfnApplicationV2.CatalogConfigurationProperty | cdk.IResolvable;
        /**
         * A list of `CustomArtifactConfiguration` objects.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-zeppelinapplicationconfiguration.html#cfn-kinesisanalyticsv2-application-zeppelinapplicationconfiguration-customartifactsconfiguration
         */
        readonly customArtifactsConfiguration?: Array<CfnApplicationV2.CustomArtifactConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The information required to deploy a Kinesis Data Analytics Studio notebook as an application with durable state.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-zeppelinapplicationconfiguration.html#cfn-kinesisanalyticsv2-application-zeppelinapplicationconfiguration-deployasapplicationconfiguration
         */
        readonly deployAsApplicationConfiguration?: CfnApplicationV2.DeployAsApplicationConfigurationProperty | cdk.IResolvable;
        /**
         * The monitoring configuration of a Kinesis Data Analytics Studio notebook.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-zeppelinapplicationconfiguration.html#cfn-kinesisanalyticsv2-application-zeppelinapplicationconfiguration-monitoringconfiguration
         */
        readonly monitoringConfiguration?: CfnApplicationV2.ZeppelinMonitoringConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ZeppelinApplicationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ZeppelinApplicationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_ZeppelinApplicationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogConfiguration', CfnApplicationV2_CatalogConfigurationPropertyValidator)(properties.catalogConfiguration));
    errors.collect(cdk.propertyValidator('customArtifactsConfiguration', cdk.listValidator(CfnApplicationV2_CustomArtifactConfigurationPropertyValidator))(properties.customArtifactsConfiguration));
    errors.collect(cdk.propertyValidator('deployAsApplicationConfiguration', CfnApplicationV2_DeployAsApplicationConfigurationPropertyValidator)(properties.deployAsApplicationConfiguration));
    errors.collect(cdk.propertyValidator('monitoringConfiguration', CfnApplicationV2_ZeppelinMonitoringConfigurationPropertyValidator)(properties.monitoringConfiguration));
    return errors.wrap('supplied properties not correct for "ZeppelinApplicationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.ZeppelinApplicationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ZeppelinApplicationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.ZeppelinApplicationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2ZeppelinApplicationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_ZeppelinApplicationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CatalogConfiguration: cfnApplicationV2CatalogConfigurationPropertyToCloudFormation(properties.catalogConfiguration),
        CustomArtifactsConfiguration: cdk.listMapper(cfnApplicationV2CustomArtifactConfigurationPropertyToCloudFormation)(properties.customArtifactsConfiguration),
        DeployAsApplicationConfiguration: cfnApplicationV2DeployAsApplicationConfigurationPropertyToCloudFormation(properties.deployAsApplicationConfiguration),
        MonitoringConfiguration: cfnApplicationV2ZeppelinMonitoringConfigurationPropertyToCloudFormation(properties.monitoringConfiguration),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2ZeppelinApplicationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.ZeppelinApplicationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.ZeppelinApplicationConfigurationProperty>();
    ret.addPropertyResult('catalogConfiguration', 'CatalogConfiguration', properties.CatalogConfiguration != null ? CfnApplicationV2CatalogConfigurationPropertyFromCloudFormation(properties.CatalogConfiguration) : undefined);
    ret.addPropertyResult('customArtifactsConfiguration', 'CustomArtifactsConfiguration', properties.CustomArtifactsConfiguration != null ? cfn_parse.FromCloudFormation.getArray(CfnApplicationV2CustomArtifactConfigurationPropertyFromCloudFormation)(properties.CustomArtifactsConfiguration) : undefined);
    ret.addPropertyResult('deployAsApplicationConfiguration', 'DeployAsApplicationConfiguration', properties.DeployAsApplicationConfiguration != null ? CfnApplicationV2DeployAsApplicationConfigurationPropertyFromCloudFormation(properties.DeployAsApplicationConfiguration) : undefined);
    ret.addPropertyResult('monitoringConfiguration', 'MonitoringConfiguration', properties.MonitoringConfiguration != null ? CfnApplicationV2ZeppelinMonitoringConfigurationPropertyFromCloudFormation(properties.MonitoringConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationV2 {
    /**
     * Describes configuration parameters for Amazon CloudWatch logging for a Kinesis Data Analytics Studio notebook. For more information about CloudWatch logging, see [Monitoring](https://docs.aws.amazon.com/kinesisanalytics/latest/java/monitoring-overview.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-zeppelinmonitoringconfiguration.html
     */
    export interface ZeppelinMonitoringConfigurationProperty {
        /**
         * The verbosity of the CloudWatch Logs for an application. You can set it to `INFO` , `WARN` , `ERROR` , or `DEBUG` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-application-zeppelinmonitoringconfiguration.html#cfn-kinesisanalyticsv2-application-zeppelinmonitoringconfiguration-loglevel
         */
        readonly logLevel?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ZeppelinMonitoringConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ZeppelinMonitoringConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationV2_ZeppelinMonitoringConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('logLevel', cdk.validateString)(properties.logLevel));
    return errors.wrap('supplied properties not correct for "ZeppelinMonitoringConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.ZeppelinMonitoringConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ZeppelinMonitoringConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::Application.ZeppelinMonitoringConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnApplicationV2ZeppelinMonitoringConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationV2_ZeppelinMonitoringConfigurationPropertyValidator(properties).assertSuccess();
    return {
        LogLevel: cdk.stringToCloudFormation(properties.logLevel),
    };
}

// @ts-ignore TS6133
function CfnApplicationV2ZeppelinMonitoringConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationV2.ZeppelinMonitoringConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationV2.ZeppelinMonitoringConfigurationProperty>();
    ret.addPropertyResult('logLevel', 'LogLevel', properties.LogLevel != null ? cfn_parse.FromCloudFormation.getString(properties.LogLevel) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnApplicationCloudWatchLoggingOptionV2`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationcloudwatchloggingoption.html
 */
export interface CfnApplicationCloudWatchLoggingOptionV2Props {

    /**
     * The name of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationcloudwatchloggingoption.html#cfn-kinesisanalyticsv2-applicationcloudwatchloggingoption-applicationname
     */
    readonly applicationName: string;

    /**
     * Provides a description of Amazon CloudWatch logging options, including the log stream Amazon Resource Name (ARN).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationcloudwatchloggingoption.html#cfn-kinesisanalyticsv2-applicationcloudwatchloggingoption-cloudwatchloggingoption
     */
    readonly cloudWatchLoggingOption: CfnApplicationCloudWatchLoggingOptionV2.CloudWatchLoggingOptionProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnApplicationCloudWatchLoggingOptionV2Props`
 *
 * @param properties - the TypeScript properties of a `CfnApplicationCloudWatchLoggingOptionV2Props`
 *
 * @returns the result of the validation.
 */
function CfnApplicationCloudWatchLoggingOptionV2PropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('applicationName', cdk.requiredValidator)(properties.applicationName));
    errors.collect(cdk.propertyValidator('applicationName', cdk.validateString)(properties.applicationName));
    errors.collect(cdk.propertyValidator('cloudWatchLoggingOption', cdk.requiredValidator)(properties.cloudWatchLoggingOption));
    errors.collect(cdk.propertyValidator('cloudWatchLoggingOption', CfnApplicationCloudWatchLoggingOptionV2_CloudWatchLoggingOptionPropertyValidator)(properties.cloudWatchLoggingOption));
    return errors.wrap('supplied properties not correct for "CfnApplicationCloudWatchLoggingOptionV2Props"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationCloudWatchLoggingOption` resource
 *
 * @param properties - the TypeScript properties of a `CfnApplicationCloudWatchLoggingOptionV2Props`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationCloudWatchLoggingOption` resource.
 */
// @ts-ignore TS6133
function cfnApplicationCloudWatchLoggingOptionV2PropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationCloudWatchLoggingOptionV2PropsValidator(properties).assertSuccess();
    return {
        ApplicationName: cdk.stringToCloudFormation(properties.applicationName),
        CloudWatchLoggingOption: cfnApplicationCloudWatchLoggingOptionV2CloudWatchLoggingOptionPropertyToCloudFormation(properties.cloudWatchLoggingOption),
    };
}

// @ts-ignore TS6133
function CfnApplicationCloudWatchLoggingOptionV2PropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationCloudWatchLoggingOptionV2Props> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationCloudWatchLoggingOptionV2Props>();
    ret.addPropertyResult('applicationName', 'ApplicationName', cfn_parse.FromCloudFormation.getString(properties.ApplicationName));
    ret.addPropertyResult('cloudWatchLoggingOption', 'CloudWatchLoggingOption', CfnApplicationCloudWatchLoggingOptionV2CloudWatchLoggingOptionPropertyFromCloudFormation(properties.CloudWatchLoggingOption));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::KinesisAnalyticsV2::ApplicationCloudWatchLoggingOption`
 *
 * Adds an Amazon CloudWatch log stream to monitor application configuration errors.
 *
 * @cloudformationResource AWS::KinesisAnalyticsV2::ApplicationCloudWatchLoggingOption
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationcloudwatchloggingoption.html
 */
export class CfnApplicationCloudWatchLoggingOptionV2 extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::KinesisAnalyticsV2::ApplicationCloudWatchLoggingOption";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnApplicationCloudWatchLoggingOptionV2 {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnApplicationCloudWatchLoggingOptionV2PropsFromCloudFormation(resourceProperties);
        const ret = new CfnApplicationCloudWatchLoggingOptionV2(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationcloudwatchloggingoption.html#cfn-kinesisanalyticsv2-applicationcloudwatchloggingoption-applicationname
     */
    public applicationName: string;

    /**
     * Provides a description of Amazon CloudWatch logging options, including the log stream Amazon Resource Name (ARN).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationcloudwatchloggingoption.html#cfn-kinesisanalyticsv2-applicationcloudwatchloggingoption-cloudwatchloggingoption
     */
    public cloudWatchLoggingOption: CfnApplicationCloudWatchLoggingOptionV2.CloudWatchLoggingOptionProperty | cdk.IResolvable;

    /**
     * Create a new `AWS::KinesisAnalyticsV2::ApplicationCloudWatchLoggingOption`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnApplicationCloudWatchLoggingOptionV2Props) {
        super(scope, id, { type: CfnApplicationCloudWatchLoggingOptionV2.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'applicationName', this);
        cdk.requireProperty(props, 'cloudWatchLoggingOption', this);

        this.applicationName = props.applicationName;
        this.cloudWatchLoggingOption = props.cloudWatchLoggingOption;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnApplicationCloudWatchLoggingOptionV2.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            applicationName: this.applicationName,
            cloudWatchLoggingOption: this.cloudWatchLoggingOption,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnApplicationCloudWatchLoggingOptionV2PropsToCloudFormation(props);
    }
}

export namespace CfnApplicationCloudWatchLoggingOptionV2 {
    /**
     * Provides a description of Amazon CloudWatch logging options, including the log stream Amazon Resource Name (ARN).
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationcloudwatchloggingoption-cloudwatchloggingoption.html
     */
    export interface CloudWatchLoggingOptionProperty {
        /**
         * The ARN of the CloudWatch log to receive application messages.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationcloudwatchloggingoption-cloudwatchloggingoption.html#cfn-kinesisanalyticsv2-applicationcloudwatchloggingoption-cloudwatchloggingoption-logstreamarn
         */
        readonly logStreamArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `CloudWatchLoggingOptionProperty`
 *
 * @param properties - the TypeScript properties of a `CloudWatchLoggingOptionProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationCloudWatchLoggingOptionV2_CloudWatchLoggingOptionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('logStreamArn', cdk.requiredValidator)(properties.logStreamArn));
    errors.collect(cdk.propertyValidator('logStreamArn', cdk.validateString)(properties.logStreamArn));
    return errors.wrap('supplied properties not correct for "CloudWatchLoggingOptionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationCloudWatchLoggingOption.CloudWatchLoggingOption` resource
 *
 * @param properties - the TypeScript properties of a `CloudWatchLoggingOptionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationCloudWatchLoggingOption.CloudWatchLoggingOption` resource.
 */
// @ts-ignore TS6133
function cfnApplicationCloudWatchLoggingOptionV2CloudWatchLoggingOptionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationCloudWatchLoggingOptionV2_CloudWatchLoggingOptionPropertyValidator(properties).assertSuccess();
    return {
        LogStreamARN: cdk.stringToCloudFormation(properties.logStreamArn),
    };
}

// @ts-ignore TS6133
function CfnApplicationCloudWatchLoggingOptionV2CloudWatchLoggingOptionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationCloudWatchLoggingOptionV2.CloudWatchLoggingOptionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationCloudWatchLoggingOptionV2.CloudWatchLoggingOptionProperty>();
    ret.addPropertyResult('logStreamArn', 'LogStreamARN', cfn_parse.FromCloudFormation.getString(properties.LogStreamARN));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnApplicationOutputV2`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationoutput.html
 */
export interface CfnApplicationOutputV2Props {

    /**
     * The name of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationoutput.html#cfn-kinesisanalyticsv2-applicationoutput-applicationname
     */
    readonly applicationName: string;

    /**
     * Describes a SQL-based Kinesis Data Analytics application's output configuration, in which you identify an in-application stream and a destination where you want the in-application stream data to be written. The destination can be a Kinesis data stream or a Kinesis Data Firehose delivery stream.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationoutput.html#cfn-kinesisanalyticsv2-applicationoutput-output
     */
    readonly output: CfnApplicationOutputV2.OutputProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnApplicationOutputV2Props`
 *
 * @param properties - the TypeScript properties of a `CfnApplicationOutputV2Props`
 *
 * @returns the result of the validation.
 */
function CfnApplicationOutputV2PropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('applicationName', cdk.requiredValidator)(properties.applicationName));
    errors.collect(cdk.propertyValidator('applicationName', cdk.validateString)(properties.applicationName));
    errors.collect(cdk.propertyValidator('output', cdk.requiredValidator)(properties.output));
    errors.collect(cdk.propertyValidator('output', CfnApplicationOutputV2_OutputPropertyValidator)(properties.output));
    return errors.wrap('supplied properties not correct for "CfnApplicationOutputV2Props"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationOutput` resource
 *
 * @param properties - the TypeScript properties of a `CfnApplicationOutputV2Props`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationOutput` resource.
 */
// @ts-ignore TS6133
function cfnApplicationOutputV2PropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationOutputV2PropsValidator(properties).assertSuccess();
    return {
        ApplicationName: cdk.stringToCloudFormation(properties.applicationName),
        Output: cfnApplicationOutputV2OutputPropertyToCloudFormation(properties.output),
    };
}

// @ts-ignore TS6133
function CfnApplicationOutputV2PropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationOutputV2Props> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationOutputV2Props>();
    ret.addPropertyResult('applicationName', 'ApplicationName', cfn_parse.FromCloudFormation.getString(properties.ApplicationName));
    ret.addPropertyResult('output', 'Output', CfnApplicationOutputV2OutputPropertyFromCloudFormation(properties.Output));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::KinesisAnalyticsV2::ApplicationOutput`
 *
 * Adds an external destination to your SQL-based Amazon Kinesis Data Analytics application.
 *
 * If you want Kinesis Data Analytics to deliver data from an in-application stream within your application to an external destination (such as an Kinesis data stream, a Kinesis Data Firehose delivery stream, or an Amazon Lambda function), you add the relevant configuration to your application using this operation. You can configure one or more outputs for your application. Each output configuration maps an in-application stream and an external destination.
 *
 * You can use one of the output configurations to deliver data from your in-application error stream to an external destination so that you can analyze the errors.
 *
 * Any configuration update, including adding a streaming source using this operation, results in a new version of the application. You can use the [DescribeApplication](https://docs.aws.amazon.com/kinesisanalytics/latest/apiv2/API_DescribeApplication.html) operation to find the current application version.
 *
 * @cloudformationResource AWS::KinesisAnalyticsV2::ApplicationOutput
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationoutput.html
 */
export class CfnApplicationOutputV2 extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::KinesisAnalyticsV2::ApplicationOutput";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnApplicationOutputV2 {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnApplicationOutputV2PropsFromCloudFormation(resourceProperties);
        const ret = new CfnApplicationOutputV2(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationoutput.html#cfn-kinesisanalyticsv2-applicationoutput-applicationname
     */
    public applicationName: string;

    /**
     * Describes a SQL-based Kinesis Data Analytics application's output configuration, in which you identify an in-application stream and a destination where you want the in-application stream data to be written. The destination can be a Kinesis data stream or a Kinesis Data Firehose delivery stream.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationoutput.html#cfn-kinesisanalyticsv2-applicationoutput-output
     */
    public output: CfnApplicationOutputV2.OutputProperty | cdk.IResolvable;

    /**
     * Create a new `AWS::KinesisAnalyticsV2::ApplicationOutput`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnApplicationOutputV2Props) {
        super(scope, id, { type: CfnApplicationOutputV2.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'applicationName', this);
        cdk.requireProperty(props, 'output', this);

        this.applicationName = props.applicationName;
        this.output = props.output;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnApplicationOutputV2.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            applicationName: this.applicationName,
            output: this.output,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnApplicationOutputV2PropsToCloudFormation(props);
    }
}

export namespace CfnApplicationOutputV2 {
    /**
     * Describes the data format when records are written to the destination in a SQL-based Kinesis Data Analytics application.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationoutput-destinationschema.html
     */
    export interface DestinationSchemaProperty {
        /**
         * Specifies the format of the records on the output stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationoutput-destinationschema.html#cfn-kinesisanalyticsv2-applicationoutput-destinationschema-recordformattype
         */
        readonly recordFormatType?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DestinationSchemaProperty`
 *
 * @param properties - the TypeScript properties of a `DestinationSchemaProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationOutputV2_DestinationSchemaPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('recordFormatType', cdk.validateString)(properties.recordFormatType));
    return errors.wrap('supplied properties not correct for "DestinationSchemaProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationOutput.DestinationSchema` resource
 *
 * @param properties - the TypeScript properties of a `DestinationSchemaProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationOutput.DestinationSchema` resource.
 */
// @ts-ignore TS6133
function cfnApplicationOutputV2DestinationSchemaPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationOutputV2_DestinationSchemaPropertyValidator(properties).assertSuccess();
    return {
        RecordFormatType: cdk.stringToCloudFormation(properties.recordFormatType),
    };
}

// @ts-ignore TS6133
function CfnApplicationOutputV2DestinationSchemaPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationOutputV2.DestinationSchemaProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationOutputV2.DestinationSchemaProperty>();
    ret.addPropertyResult('recordFormatType', 'RecordFormatType', properties.RecordFormatType != null ? cfn_parse.FromCloudFormation.getString(properties.RecordFormatType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationOutputV2 {
    /**
     * For a SQL-based Kinesis Data Analytics application, when configuring application output, identifies a Kinesis Data Firehose delivery stream as the destination. You provide the stream Amazon Resource Name (ARN) of the delivery stream.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationoutput-kinesisfirehoseoutput.html
     */
    export interface KinesisFirehoseOutputProperty {
        /**
         * The ARN of the destination delivery stream to write to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationoutput-kinesisfirehoseoutput.html#cfn-kinesisanalyticsv2-applicationoutput-kinesisfirehoseoutput-resourcearn
         */
        readonly resourceArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `KinesisFirehoseOutputProperty`
 *
 * @param properties - the TypeScript properties of a `KinesisFirehoseOutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationOutputV2_KinesisFirehoseOutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('resourceArn', cdk.requiredValidator)(properties.resourceArn));
    errors.collect(cdk.propertyValidator('resourceArn', cdk.validateString)(properties.resourceArn));
    return errors.wrap('supplied properties not correct for "KinesisFirehoseOutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationOutput.KinesisFirehoseOutput` resource
 *
 * @param properties - the TypeScript properties of a `KinesisFirehoseOutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationOutput.KinesisFirehoseOutput` resource.
 */
// @ts-ignore TS6133
function cfnApplicationOutputV2KinesisFirehoseOutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationOutputV2_KinesisFirehoseOutputPropertyValidator(properties).assertSuccess();
    return {
        ResourceARN: cdk.stringToCloudFormation(properties.resourceArn),
    };
}

// @ts-ignore TS6133
function CfnApplicationOutputV2KinesisFirehoseOutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationOutputV2.KinesisFirehoseOutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationOutputV2.KinesisFirehoseOutputProperty>();
    ret.addPropertyResult('resourceArn', 'ResourceARN', cfn_parse.FromCloudFormation.getString(properties.ResourceARN));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationOutputV2 {
    /**
     * When you configure a SQL-based Kinesis Data Analytics application's output, identifies a Kinesis data stream as the destination. You provide the stream Amazon Resource Name (ARN).
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationoutput-kinesisstreamsoutput.html
     */
    export interface KinesisStreamsOutputProperty {
        /**
         * The ARN of the destination Kinesis data stream to write to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationoutput-kinesisstreamsoutput.html#cfn-kinesisanalyticsv2-applicationoutput-kinesisstreamsoutput-resourcearn
         */
        readonly resourceArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `KinesisStreamsOutputProperty`
 *
 * @param properties - the TypeScript properties of a `KinesisStreamsOutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationOutputV2_KinesisStreamsOutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('resourceArn', cdk.requiredValidator)(properties.resourceArn));
    errors.collect(cdk.propertyValidator('resourceArn', cdk.validateString)(properties.resourceArn));
    return errors.wrap('supplied properties not correct for "KinesisStreamsOutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationOutput.KinesisStreamsOutput` resource
 *
 * @param properties - the TypeScript properties of a `KinesisStreamsOutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationOutput.KinesisStreamsOutput` resource.
 */
// @ts-ignore TS6133
function cfnApplicationOutputV2KinesisStreamsOutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationOutputV2_KinesisStreamsOutputPropertyValidator(properties).assertSuccess();
    return {
        ResourceARN: cdk.stringToCloudFormation(properties.resourceArn),
    };
}

// @ts-ignore TS6133
function CfnApplicationOutputV2KinesisStreamsOutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationOutputV2.KinesisStreamsOutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationOutputV2.KinesisStreamsOutputProperty>();
    ret.addPropertyResult('resourceArn', 'ResourceARN', cfn_parse.FromCloudFormation.getString(properties.ResourceARN));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationOutputV2 {
    /**
     * When you configure a SQL-based Kinesis Data Analytics application's output, identifies an Amazon Lambda function as the destination. You provide the function Amazon Resource Name (ARN) of the Lambda function.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationoutput-lambdaoutput.html
     */
    export interface LambdaOutputProperty {
        /**
         * The Amazon Resource Name (ARN) of the destination Lambda function to write to.
         *
         * > To specify an earlier version of the Lambda function than the latest, include the Lambda function version in the Lambda function ARN. For more information about Lambda ARNs, see [Example ARNs: Amazon Lambda](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-lambda)
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationoutput-lambdaoutput.html#cfn-kinesisanalyticsv2-applicationoutput-lambdaoutput-resourcearn
         */
        readonly resourceArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `LambdaOutputProperty`
 *
 * @param properties - the TypeScript properties of a `LambdaOutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationOutputV2_LambdaOutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('resourceArn', cdk.requiredValidator)(properties.resourceArn));
    errors.collect(cdk.propertyValidator('resourceArn', cdk.validateString)(properties.resourceArn));
    return errors.wrap('supplied properties not correct for "LambdaOutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationOutput.LambdaOutput` resource
 *
 * @param properties - the TypeScript properties of a `LambdaOutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationOutput.LambdaOutput` resource.
 */
// @ts-ignore TS6133
function cfnApplicationOutputV2LambdaOutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationOutputV2_LambdaOutputPropertyValidator(properties).assertSuccess();
    return {
        ResourceARN: cdk.stringToCloudFormation(properties.resourceArn),
    };
}

// @ts-ignore TS6133
function CfnApplicationOutputV2LambdaOutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationOutputV2.LambdaOutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationOutputV2.LambdaOutputProperty>();
    ret.addPropertyResult('resourceArn', 'ResourceARN', cfn_parse.FromCloudFormation.getString(properties.ResourceARN));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationOutputV2 {
    /**
     * Describes a SQL-based Kinesis Data Analytics application's output configuration, in which you identify an in-application stream and a destination where you want the in-application stream data to be written. The destination can be a Kinesis data stream or a Kinesis Data Firehose delivery stream.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationoutput-output.html
     */
    export interface OutputProperty {
        /**
         * Describes the data format when records are written to the destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationoutput-output.html#cfn-kinesisanalyticsv2-applicationoutput-output-destinationschema
         */
        readonly destinationSchema: CfnApplicationOutputV2.DestinationSchemaProperty | cdk.IResolvable;
        /**
         * Identifies a Kinesis Data Firehose delivery stream as the destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationoutput-output.html#cfn-kinesisanalyticsv2-applicationoutput-output-kinesisfirehoseoutput
         */
        readonly kinesisFirehoseOutput?: CfnApplicationOutputV2.KinesisFirehoseOutputProperty | cdk.IResolvable;
        /**
         * Identifies a Kinesis data stream as the destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationoutput-output.html#cfn-kinesisanalyticsv2-applicationoutput-output-kinesisstreamsoutput
         */
        readonly kinesisStreamsOutput?: CfnApplicationOutputV2.KinesisStreamsOutputProperty | cdk.IResolvable;
        /**
         * Identifies an Amazon Lambda function as the destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationoutput-output.html#cfn-kinesisanalyticsv2-applicationoutput-output-lambdaoutput
         */
        readonly lambdaOutput?: CfnApplicationOutputV2.LambdaOutputProperty | cdk.IResolvable;
        /**
         * The name of the in-application stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationoutput-output.html#cfn-kinesisanalyticsv2-applicationoutput-output-name
         */
        readonly name?: string;
    }
}

/**
 * Determine whether the given properties match those of a `OutputProperty`
 *
 * @param properties - the TypeScript properties of a `OutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationOutputV2_OutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('destinationSchema', cdk.requiredValidator)(properties.destinationSchema));
    errors.collect(cdk.propertyValidator('destinationSchema', CfnApplicationOutputV2_DestinationSchemaPropertyValidator)(properties.destinationSchema));
    errors.collect(cdk.propertyValidator('kinesisFirehoseOutput', CfnApplicationOutputV2_KinesisFirehoseOutputPropertyValidator)(properties.kinesisFirehoseOutput));
    errors.collect(cdk.propertyValidator('kinesisStreamsOutput', CfnApplicationOutputV2_KinesisStreamsOutputPropertyValidator)(properties.kinesisStreamsOutput));
    errors.collect(cdk.propertyValidator('lambdaOutput', CfnApplicationOutputV2_LambdaOutputPropertyValidator)(properties.lambdaOutput));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "OutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationOutput.Output` resource
 *
 * @param properties - the TypeScript properties of a `OutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationOutput.Output` resource.
 */
// @ts-ignore TS6133
function cfnApplicationOutputV2OutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationOutputV2_OutputPropertyValidator(properties).assertSuccess();
    return {
        DestinationSchema: cfnApplicationOutputV2DestinationSchemaPropertyToCloudFormation(properties.destinationSchema),
        KinesisFirehoseOutput: cfnApplicationOutputV2KinesisFirehoseOutputPropertyToCloudFormation(properties.kinesisFirehoseOutput),
        KinesisStreamsOutput: cfnApplicationOutputV2KinesisStreamsOutputPropertyToCloudFormation(properties.kinesisStreamsOutput),
        LambdaOutput: cfnApplicationOutputV2LambdaOutputPropertyToCloudFormation(properties.lambdaOutput),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnApplicationOutputV2OutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationOutputV2.OutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationOutputV2.OutputProperty>();
    ret.addPropertyResult('destinationSchema', 'DestinationSchema', CfnApplicationOutputV2DestinationSchemaPropertyFromCloudFormation(properties.DestinationSchema));
    ret.addPropertyResult('kinesisFirehoseOutput', 'KinesisFirehoseOutput', properties.KinesisFirehoseOutput != null ? CfnApplicationOutputV2KinesisFirehoseOutputPropertyFromCloudFormation(properties.KinesisFirehoseOutput) : undefined);
    ret.addPropertyResult('kinesisStreamsOutput', 'KinesisStreamsOutput', properties.KinesisStreamsOutput != null ? CfnApplicationOutputV2KinesisStreamsOutputPropertyFromCloudFormation(properties.KinesisStreamsOutput) : undefined);
    ret.addPropertyResult('lambdaOutput', 'LambdaOutput', properties.LambdaOutput != null ? CfnApplicationOutputV2LambdaOutputPropertyFromCloudFormation(properties.LambdaOutput) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnApplicationReferenceDataSourceV2`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationreferencedatasource.html
 */
export interface CfnApplicationReferenceDataSourceV2Props {

    /**
     * The name of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationreferencedatasource.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-applicationname
     */
    readonly applicationName: string;

    /**
     * For a SQL-based Kinesis Data Analytics application, describes the reference data source by providing the source information (Amazon S3 bucket name and object key name), the resulting in-application table name that is created, and the necessary schema to map the data elements in the Amazon S3 object to the in-application table.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationreferencedatasource.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-referencedatasource
     */
    readonly referenceDataSource: CfnApplicationReferenceDataSourceV2.ReferenceDataSourceProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnApplicationReferenceDataSourceV2Props`
 *
 * @param properties - the TypeScript properties of a `CfnApplicationReferenceDataSourceV2Props`
 *
 * @returns the result of the validation.
 */
function CfnApplicationReferenceDataSourceV2PropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('applicationName', cdk.requiredValidator)(properties.applicationName));
    errors.collect(cdk.propertyValidator('applicationName', cdk.validateString)(properties.applicationName));
    errors.collect(cdk.propertyValidator('referenceDataSource', cdk.requiredValidator)(properties.referenceDataSource));
    errors.collect(cdk.propertyValidator('referenceDataSource', CfnApplicationReferenceDataSourceV2_ReferenceDataSourcePropertyValidator)(properties.referenceDataSource));
    return errors.wrap('supplied properties not correct for "CfnApplicationReferenceDataSourceV2Props"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource` resource
 *
 * @param properties - the TypeScript properties of a `CfnApplicationReferenceDataSourceV2Props`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource` resource.
 */
// @ts-ignore TS6133
function cfnApplicationReferenceDataSourceV2PropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationReferenceDataSourceV2PropsValidator(properties).assertSuccess();
    return {
        ApplicationName: cdk.stringToCloudFormation(properties.applicationName),
        ReferenceDataSource: cfnApplicationReferenceDataSourceV2ReferenceDataSourcePropertyToCloudFormation(properties.referenceDataSource),
    };
}

// @ts-ignore TS6133
function CfnApplicationReferenceDataSourceV2PropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationReferenceDataSourceV2Props> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationReferenceDataSourceV2Props>();
    ret.addPropertyResult('applicationName', 'ApplicationName', cfn_parse.FromCloudFormation.getString(properties.ApplicationName));
    ret.addPropertyResult('referenceDataSource', 'ReferenceDataSource', CfnApplicationReferenceDataSourceV2ReferenceDataSourcePropertyFromCloudFormation(properties.ReferenceDataSource));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource`
 *
 * Adds a reference data source to an existing SQL-based Kinesis Data Analytics application.
 *
 * Kinesis Data Analytics reads reference data (that is, an Amazon S3 object) and creates an in-application table within your application. In the request, you provide the source (S3 bucket name and object key name), name of the in-application table to create, and the necessary mapping information that describes how data in an Amazon S3 object maps to columns in the resulting in-application table.
 *
 * @cloudformationResource AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationreferencedatasource.html
 */
export class CfnApplicationReferenceDataSourceV2 extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnApplicationReferenceDataSourceV2 {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnApplicationReferenceDataSourceV2PropsFromCloudFormation(resourceProperties);
        const ret = new CfnApplicationReferenceDataSourceV2(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationreferencedatasource.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-applicationname
     */
    public applicationName: string;

    /**
     * For a SQL-based Kinesis Data Analytics application, describes the reference data source by providing the source information (Amazon S3 bucket name and object key name), the resulting in-application table name that is created, and the necessary schema to map the data elements in the Amazon S3 object to the in-application table.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationreferencedatasource.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-referencedatasource
     */
    public referenceDataSource: CfnApplicationReferenceDataSourceV2.ReferenceDataSourceProperty | cdk.IResolvable;

    /**
     * Create a new `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnApplicationReferenceDataSourceV2Props) {
        super(scope, id, { type: CfnApplicationReferenceDataSourceV2.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'applicationName', this);
        cdk.requireProperty(props, 'referenceDataSource', this);

        this.applicationName = props.applicationName;
        this.referenceDataSource = props.referenceDataSource;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnApplicationReferenceDataSourceV2.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            applicationName: this.applicationName,
            referenceDataSource: this.referenceDataSource,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnApplicationReferenceDataSourceV2PropsToCloudFormation(props);
    }
}

export namespace CfnApplicationReferenceDataSourceV2 {
    /**
     * For a SQL-based Kinesis Data Analytics application, provides additional mapping information when the record format uses delimiters, such as CSV. For example, the following sample records use CSV format, where the records use the *'\n'* as the row delimiter and a comma (",") as the column delimiter:
     *
     * `"name1", "address1"`
     *
     * `"name2", "address2"`
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-csvmappingparameters.html
     */
    export interface CSVMappingParametersProperty {
        /**
         * The column delimiter. For example, in a CSV format, a comma (",") is the typical column delimiter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-csvmappingparameters.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-csvmappingparameters-recordcolumndelimiter
         */
        readonly recordColumnDelimiter: string;
        /**
         * The row delimiter. For example, in a CSV format, *'\n'* is the typical row delimiter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-csvmappingparameters.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-csvmappingparameters-recordrowdelimiter
         */
        readonly recordRowDelimiter: string;
    }
}

/**
 * Determine whether the given properties match those of a `CSVMappingParametersProperty`
 *
 * @param properties - the TypeScript properties of a `CSVMappingParametersProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationReferenceDataSourceV2_CSVMappingParametersPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('recordColumnDelimiter', cdk.requiredValidator)(properties.recordColumnDelimiter));
    errors.collect(cdk.propertyValidator('recordColumnDelimiter', cdk.validateString)(properties.recordColumnDelimiter));
    errors.collect(cdk.propertyValidator('recordRowDelimiter', cdk.requiredValidator)(properties.recordRowDelimiter));
    errors.collect(cdk.propertyValidator('recordRowDelimiter', cdk.validateString)(properties.recordRowDelimiter));
    return errors.wrap('supplied properties not correct for "CSVMappingParametersProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.CSVMappingParameters` resource
 *
 * @param properties - the TypeScript properties of a `CSVMappingParametersProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.CSVMappingParameters` resource.
 */
// @ts-ignore TS6133
function cfnApplicationReferenceDataSourceV2CSVMappingParametersPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationReferenceDataSourceV2_CSVMappingParametersPropertyValidator(properties).assertSuccess();
    return {
        RecordColumnDelimiter: cdk.stringToCloudFormation(properties.recordColumnDelimiter),
        RecordRowDelimiter: cdk.stringToCloudFormation(properties.recordRowDelimiter),
    };
}

// @ts-ignore TS6133
function CfnApplicationReferenceDataSourceV2CSVMappingParametersPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationReferenceDataSourceV2.CSVMappingParametersProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationReferenceDataSourceV2.CSVMappingParametersProperty>();
    ret.addPropertyResult('recordColumnDelimiter', 'RecordColumnDelimiter', cfn_parse.FromCloudFormation.getString(properties.RecordColumnDelimiter));
    ret.addPropertyResult('recordRowDelimiter', 'RecordRowDelimiter', cfn_parse.FromCloudFormation.getString(properties.RecordRowDelimiter));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationReferenceDataSourceV2 {
    /**
     * For a SQL-based Kinesis Data Analytics application, provides additional mapping information when JSON is the record format on the streaming source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-jsonmappingparameters.html
     */
    export interface JSONMappingParametersProperty {
        /**
         * The path to the top-level parent that contains the records.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-jsonmappingparameters.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-jsonmappingparameters-recordrowpath
         */
        readonly recordRowPath: string;
    }
}

/**
 * Determine whether the given properties match those of a `JSONMappingParametersProperty`
 *
 * @param properties - the TypeScript properties of a `JSONMappingParametersProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationReferenceDataSourceV2_JSONMappingParametersPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('recordRowPath', cdk.requiredValidator)(properties.recordRowPath));
    errors.collect(cdk.propertyValidator('recordRowPath', cdk.validateString)(properties.recordRowPath));
    return errors.wrap('supplied properties not correct for "JSONMappingParametersProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.JSONMappingParameters` resource
 *
 * @param properties - the TypeScript properties of a `JSONMappingParametersProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.JSONMappingParameters` resource.
 */
// @ts-ignore TS6133
function cfnApplicationReferenceDataSourceV2JSONMappingParametersPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationReferenceDataSourceV2_JSONMappingParametersPropertyValidator(properties).assertSuccess();
    return {
        RecordRowPath: cdk.stringToCloudFormation(properties.recordRowPath),
    };
}

// @ts-ignore TS6133
function CfnApplicationReferenceDataSourceV2JSONMappingParametersPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationReferenceDataSourceV2.JSONMappingParametersProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationReferenceDataSourceV2.JSONMappingParametersProperty>();
    ret.addPropertyResult('recordRowPath', 'RecordRowPath', cfn_parse.FromCloudFormation.getString(properties.RecordRowPath));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationReferenceDataSourceV2 {
    /**
     * When you configure a SQL-based Kinesis Data Analytics application's input at the time of creating or updating an application, provides additional mapping information specific to the record format (such as JSON, CSV, or record fields delimited by some delimiter) on the streaming source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-mappingparameters.html
     */
    export interface MappingParametersProperty {
        /**
         * Provides additional mapping information when the record format uses delimiters (for example, CSV).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-mappingparameters.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-mappingparameters-csvmappingparameters
         */
        readonly csvMappingParameters?: CfnApplicationReferenceDataSourceV2.CSVMappingParametersProperty | cdk.IResolvable;
        /**
         * Provides additional mapping information when JSON is the record format on the streaming source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-mappingparameters.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-mappingparameters-jsonmappingparameters
         */
        readonly jsonMappingParameters?: CfnApplicationReferenceDataSourceV2.JSONMappingParametersProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MappingParametersProperty`
 *
 * @param properties - the TypeScript properties of a `MappingParametersProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationReferenceDataSourceV2_MappingParametersPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('csvMappingParameters', CfnApplicationReferenceDataSourceV2_CSVMappingParametersPropertyValidator)(properties.csvMappingParameters));
    errors.collect(cdk.propertyValidator('jsonMappingParameters', CfnApplicationReferenceDataSourceV2_JSONMappingParametersPropertyValidator)(properties.jsonMappingParameters));
    return errors.wrap('supplied properties not correct for "MappingParametersProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.MappingParameters` resource
 *
 * @param properties - the TypeScript properties of a `MappingParametersProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.MappingParameters` resource.
 */
// @ts-ignore TS6133
function cfnApplicationReferenceDataSourceV2MappingParametersPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationReferenceDataSourceV2_MappingParametersPropertyValidator(properties).assertSuccess();
    return {
        CSVMappingParameters: cfnApplicationReferenceDataSourceV2CSVMappingParametersPropertyToCloudFormation(properties.csvMappingParameters),
        JSONMappingParameters: cfnApplicationReferenceDataSourceV2JSONMappingParametersPropertyToCloudFormation(properties.jsonMappingParameters),
    };
}

// @ts-ignore TS6133
function CfnApplicationReferenceDataSourceV2MappingParametersPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationReferenceDataSourceV2.MappingParametersProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationReferenceDataSourceV2.MappingParametersProperty>();
    ret.addPropertyResult('csvMappingParameters', 'CSVMappingParameters', properties.CSVMappingParameters != null ? CfnApplicationReferenceDataSourceV2CSVMappingParametersPropertyFromCloudFormation(properties.CSVMappingParameters) : undefined);
    ret.addPropertyResult('jsonMappingParameters', 'JSONMappingParameters', properties.JSONMappingParameters != null ? CfnApplicationReferenceDataSourceV2JSONMappingParametersPropertyFromCloudFormation(properties.JSONMappingParameters) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationReferenceDataSourceV2 {
    /**
     * For a SQL-based Kinesis Data Analytics application, describes the mapping of each data element in the streaming source to the corresponding column in the in-application stream.
     *
     * Also used to describe the format of the reference data source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-recordcolumn.html
     */
    export interface RecordColumnProperty {
        /**
         * A reference to the data element in the streaming input or the reference data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-recordcolumn.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-recordcolumn-mapping
         */
        readonly mapping?: string;
        /**
         * The name of the column that is created in the in-application input stream or reference table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-recordcolumn.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-recordcolumn-name
         */
        readonly name: string;
        /**
         * The type of column created in the in-application input stream or reference table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-recordcolumn.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-recordcolumn-sqltype
         */
        readonly sqlType: string;
    }
}

/**
 * Determine whether the given properties match those of a `RecordColumnProperty`
 *
 * @param properties - the TypeScript properties of a `RecordColumnProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationReferenceDataSourceV2_RecordColumnPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('mapping', cdk.validateString)(properties.mapping));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('sqlType', cdk.requiredValidator)(properties.sqlType));
    errors.collect(cdk.propertyValidator('sqlType', cdk.validateString)(properties.sqlType));
    return errors.wrap('supplied properties not correct for "RecordColumnProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.RecordColumn` resource
 *
 * @param properties - the TypeScript properties of a `RecordColumnProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.RecordColumn` resource.
 */
// @ts-ignore TS6133
function cfnApplicationReferenceDataSourceV2RecordColumnPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationReferenceDataSourceV2_RecordColumnPropertyValidator(properties).assertSuccess();
    return {
        Mapping: cdk.stringToCloudFormation(properties.mapping),
        Name: cdk.stringToCloudFormation(properties.name),
        SqlType: cdk.stringToCloudFormation(properties.sqlType),
    };
}

// @ts-ignore TS6133
function CfnApplicationReferenceDataSourceV2RecordColumnPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationReferenceDataSourceV2.RecordColumnProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationReferenceDataSourceV2.RecordColumnProperty>();
    ret.addPropertyResult('mapping', 'Mapping', properties.Mapping != null ? cfn_parse.FromCloudFormation.getString(properties.Mapping) : undefined);
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('sqlType', 'SqlType', cfn_parse.FromCloudFormation.getString(properties.SqlType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationReferenceDataSourceV2 {
    /**
     * For a SQL-based Kinesis Data Analytics application, describes the record format and relevant mapping information that should be applied to schematize the records on the stream.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-recordformat.html
     */
    export interface RecordFormatProperty {
        /**
         * When you configure application input at the time of creating or updating an application, provides additional mapping information specific to the record format (such as JSON, CSV, or record fields delimited by some delimiter) on the streaming source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-recordformat.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-recordformat-mappingparameters
         */
        readonly mappingParameters?: CfnApplicationReferenceDataSourceV2.MappingParametersProperty | cdk.IResolvable;
        /**
         * The type of record format.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-recordformat.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-recordformat-recordformattype
         */
        readonly recordFormatType: string;
    }
}

/**
 * Determine whether the given properties match those of a `RecordFormatProperty`
 *
 * @param properties - the TypeScript properties of a `RecordFormatProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationReferenceDataSourceV2_RecordFormatPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('mappingParameters', CfnApplicationReferenceDataSourceV2_MappingParametersPropertyValidator)(properties.mappingParameters));
    errors.collect(cdk.propertyValidator('recordFormatType', cdk.requiredValidator)(properties.recordFormatType));
    errors.collect(cdk.propertyValidator('recordFormatType', cdk.validateString)(properties.recordFormatType));
    return errors.wrap('supplied properties not correct for "RecordFormatProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.RecordFormat` resource
 *
 * @param properties - the TypeScript properties of a `RecordFormatProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.RecordFormat` resource.
 */
// @ts-ignore TS6133
function cfnApplicationReferenceDataSourceV2RecordFormatPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationReferenceDataSourceV2_RecordFormatPropertyValidator(properties).assertSuccess();
    return {
        MappingParameters: cfnApplicationReferenceDataSourceV2MappingParametersPropertyToCloudFormation(properties.mappingParameters),
        RecordFormatType: cdk.stringToCloudFormation(properties.recordFormatType),
    };
}

// @ts-ignore TS6133
function CfnApplicationReferenceDataSourceV2RecordFormatPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationReferenceDataSourceV2.RecordFormatProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationReferenceDataSourceV2.RecordFormatProperty>();
    ret.addPropertyResult('mappingParameters', 'MappingParameters', properties.MappingParameters != null ? CfnApplicationReferenceDataSourceV2MappingParametersPropertyFromCloudFormation(properties.MappingParameters) : undefined);
    ret.addPropertyResult('recordFormatType', 'RecordFormatType', cfn_parse.FromCloudFormation.getString(properties.RecordFormatType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationReferenceDataSourceV2 {
    /**
     * For a SQL-based Kinesis Data Analytics application, describes the reference data source by providing the source information (Amazon S3 bucket name and object key name), the resulting in-application table name that is created, and the necessary schema to map the data elements in the Amazon S3 object to the in-application table.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-referencedatasource.html
     */
    export interface ReferenceDataSourceProperty {
        /**
         * Describes the format of the data in the streaming source, and how each data element maps to corresponding columns created in the in-application stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-referencedatasource.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-referencedatasource-referenceschema
         */
        readonly referenceSchema: CfnApplicationReferenceDataSourceV2.ReferenceSchemaProperty | cdk.IResolvable;
        /**
         * Identifies the S3 bucket and object that contains the reference data. A Kinesis Data Analytics application loads reference data only once. If the data changes, you call the [UpdateApplication](https://docs.aws.amazon.com/kinesisanalytics/latest/apiv2/API_UpdateApplication.html) operation to trigger reloading of data into your application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-referencedatasource.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-referencedatasource-s3referencedatasource
         */
        readonly s3ReferenceDataSource?: CfnApplicationReferenceDataSourceV2.S3ReferenceDataSourceProperty | cdk.IResolvable;
        /**
         * The name of the in-application table to create.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-referencedatasource.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-referencedatasource-tablename
         */
        readonly tableName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ReferenceDataSourceProperty`
 *
 * @param properties - the TypeScript properties of a `ReferenceDataSourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationReferenceDataSourceV2_ReferenceDataSourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('referenceSchema', cdk.requiredValidator)(properties.referenceSchema));
    errors.collect(cdk.propertyValidator('referenceSchema', CfnApplicationReferenceDataSourceV2_ReferenceSchemaPropertyValidator)(properties.referenceSchema));
    errors.collect(cdk.propertyValidator('s3ReferenceDataSource', CfnApplicationReferenceDataSourceV2_S3ReferenceDataSourcePropertyValidator)(properties.s3ReferenceDataSource));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    return errors.wrap('supplied properties not correct for "ReferenceDataSourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.ReferenceDataSource` resource
 *
 * @param properties - the TypeScript properties of a `ReferenceDataSourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.ReferenceDataSource` resource.
 */
// @ts-ignore TS6133
function cfnApplicationReferenceDataSourceV2ReferenceDataSourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationReferenceDataSourceV2_ReferenceDataSourcePropertyValidator(properties).assertSuccess();
    return {
        ReferenceSchema: cfnApplicationReferenceDataSourceV2ReferenceSchemaPropertyToCloudFormation(properties.referenceSchema),
        S3ReferenceDataSource: cfnApplicationReferenceDataSourceV2S3ReferenceDataSourcePropertyToCloudFormation(properties.s3ReferenceDataSource),
        TableName: cdk.stringToCloudFormation(properties.tableName),
    };
}

// @ts-ignore TS6133
function CfnApplicationReferenceDataSourceV2ReferenceDataSourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationReferenceDataSourceV2.ReferenceDataSourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationReferenceDataSourceV2.ReferenceDataSourceProperty>();
    ret.addPropertyResult('referenceSchema', 'ReferenceSchema', CfnApplicationReferenceDataSourceV2ReferenceSchemaPropertyFromCloudFormation(properties.ReferenceSchema));
    ret.addPropertyResult('s3ReferenceDataSource', 'S3ReferenceDataSource', properties.S3ReferenceDataSource != null ? CfnApplicationReferenceDataSourceV2S3ReferenceDataSourcePropertyFromCloudFormation(properties.S3ReferenceDataSource) : undefined);
    ret.addPropertyResult('tableName', 'TableName', properties.TableName != null ? cfn_parse.FromCloudFormation.getString(properties.TableName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationReferenceDataSourceV2 {
    /**
     * For a SQL-based Kinesis Data Analytics application, describes the format of the data in the streaming source, and how each data element maps to corresponding columns created in the in-application stream.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-referenceschema.html
     */
    export interface ReferenceSchemaProperty {
        /**
         * A list of `RecordColumn` objects.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-referenceschema.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-referenceschema-recordcolumns
         */
        readonly recordColumns: Array<CfnApplicationReferenceDataSourceV2.RecordColumnProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * Specifies the encoding of the records in the streaming source. For example, UTF-8.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-referenceschema.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-referenceschema-recordencoding
         */
        readonly recordEncoding?: string;
        /**
         * Specifies the format of the records on the streaming source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-referenceschema.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-referenceschema-recordformat
         */
        readonly recordFormat: CfnApplicationReferenceDataSourceV2.RecordFormatProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ReferenceSchemaProperty`
 *
 * @param properties - the TypeScript properties of a `ReferenceSchemaProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationReferenceDataSourceV2_ReferenceSchemaPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('recordColumns', cdk.requiredValidator)(properties.recordColumns));
    errors.collect(cdk.propertyValidator('recordColumns', cdk.listValidator(CfnApplicationReferenceDataSourceV2_RecordColumnPropertyValidator))(properties.recordColumns));
    errors.collect(cdk.propertyValidator('recordEncoding', cdk.validateString)(properties.recordEncoding));
    errors.collect(cdk.propertyValidator('recordFormat', cdk.requiredValidator)(properties.recordFormat));
    errors.collect(cdk.propertyValidator('recordFormat', CfnApplicationReferenceDataSourceV2_RecordFormatPropertyValidator)(properties.recordFormat));
    return errors.wrap('supplied properties not correct for "ReferenceSchemaProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.ReferenceSchema` resource
 *
 * @param properties - the TypeScript properties of a `ReferenceSchemaProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.ReferenceSchema` resource.
 */
// @ts-ignore TS6133
function cfnApplicationReferenceDataSourceV2ReferenceSchemaPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationReferenceDataSourceV2_ReferenceSchemaPropertyValidator(properties).assertSuccess();
    return {
        RecordColumns: cdk.listMapper(cfnApplicationReferenceDataSourceV2RecordColumnPropertyToCloudFormation)(properties.recordColumns),
        RecordEncoding: cdk.stringToCloudFormation(properties.recordEncoding),
        RecordFormat: cfnApplicationReferenceDataSourceV2RecordFormatPropertyToCloudFormation(properties.recordFormat),
    };
}

// @ts-ignore TS6133
function CfnApplicationReferenceDataSourceV2ReferenceSchemaPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationReferenceDataSourceV2.ReferenceSchemaProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationReferenceDataSourceV2.ReferenceSchemaProperty>();
    ret.addPropertyResult('recordColumns', 'RecordColumns', cfn_parse.FromCloudFormation.getArray(CfnApplicationReferenceDataSourceV2RecordColumnPropertyFromCloudFormation)(properties.RecordColumns));
    ret.addPropertyResult('recordEncoding', 'RecordEncoding', properties.RecordEncoding != null ? cfn_parse.FromCloudFormation.getString(properties.RecordEncoding) : undefined);
    ret.addPropertyResult('recordFormat', 'RecordFormat', CfnApplicationReferenceDataSourceV2RecordFormatPropertyFromCloudFormation(properties.RecordFormat));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationReferenceDataSourceV2 {
    /**
     * For an SQL-based Amazon Kinesis Data Analytics application, identifies the Amazon S3 bucket and object that contains the reference data.
     *
     * A Kinesis Data Analytics application loads reference data only once. If the data changes, you call the [UpdateApplication](https://docs.aws.amazon.com/kinesisanalytics/latest/apiv2/API_UpdateApplication.html) operation to trigger reloading of data into your application.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-s3referencedatasource.html
     */
    export interface S3ReferenceDataSourceProperty {
        /**
         * The Amazon Resource Name (ARN) of the S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-s3referencedatasource.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-s3referencedatasource-bucketarn
         */
        readonly bucketArn: string;
        /**
         * The object key name containing the reference data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kinesisanalyticsv2-applicationreferencedatasource-s3referencedatasource.html#cfn-kinesisanalyticsv2-applicationreferencedatasource-s3referencedatasource-filekey
         */
        readonly fileKey: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3ReferenceDataSourceProperty`
 *
 * @param properties - the TypeScript properties of a `S3ReferenceDataSourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationReferenceDataSourceV2_S3ReferenceDataSourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketArn', cdk.requiredValidator)(properties.bucketArn));
    errors.collect(cdk.propertyValidator('bucketArn', cdk.validateString)(properties.bucketArn));
    errors.collect(cdk.propertyValidator('fileKey', cdk.requiredValidator)(properties.fileKey));
    errors.collect(cdk.propertyValidator('fileKey', cdk.validateString)(properties.fileKey));
    return errors.wrap('supplied properties not correct for "S3ReferenceDataSourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.S3ReferenceDataSource` resource
 *
 * @param properties - the TypeScript properties of a `S3ReferenceDataSourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisAnalyticsV2::ApplicationReferenceDataSource.S3ReferenceDataSource` resource.
 */
// @ts-ignore TS6133
function cfnApplicationReferenceDataSourceV2S3ReferenceDataSourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationReferenceDataSourceV2_S3ReferenceDataSourcePropertyValidator(properties).assertSuccess();
    return {
        BucketARN: cdk.stringToCloudFormation(properties.bucketArn),
        FileKey: cdk.stringToCloudFormation(properties.fileKey),
    };
}

// @ts-ignore TS6133
function CfnApplicationReferenceDataSourceV2S3ReferenceDataSourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationReferenceDataSourceV2.S3ReferenceDataSourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationReferenceDataSourceV2.S3ReferenceDataSourceProperty>();
    ret.addPropertyResult('bucketArn', 'BucketARN', cfn_parse.FromCloudFormation.getString(properties.BucketARN));
    ret.addPropertyResult('fileKey', 'FileKey', cfn_parse.FromCloudFormation.getString(properties.FileKey));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
