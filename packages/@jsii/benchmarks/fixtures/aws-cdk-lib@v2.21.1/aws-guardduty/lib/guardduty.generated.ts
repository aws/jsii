// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:08.619Z","fingerprint":"kkuFaojCXHj0dkr8LZdNXavbg1T5IPf2vV7aZE679sk="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnDetector`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-detector.html
 */
export interface CfnDetectorProps {

    /**
     * Specifies whether the detector is to be enabled on creation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-detector.html#cfn-guardduty-detector-enable
     */
    readonly enable: boolean | cdk.IResolvable;

    /**
     * Describes which data sources will be enabled for the detector.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-detector.html#cfn-guardduty-detector-datasources
     */
    readonly dataSources?: CfnDetector.CFNDataSourceConfigurationsProperty | cdk.IResolvable;

    /**
     * Specifies how frequently updated findings are exported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-detector.html#cfn-guardduty-detector-findingpublishingfrequency
     */
    readonly findingPublishingFrequency?: string;
}

/**
 * Determine whether the given properties match those of a `CfnDetectorProps`
 *
 * @param properties - the TypeScript properties of a `CfnDetectorProps`
 *
 * @returns the result of the validation.
 */
function CfnDetectorPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataSources', CfnDetector_CFNDataSourceConfigurationsPropertyValidator)(properties.dataSources));
    errors.collect(cdk.propertyValidator('enable', cdk.requiredValidator)(properties.enable));
    errors.collect(cdk.propertyValidator('enable', cdk.validateBoolean)(properties.enable));
    errors.collect(cdk.propertyValidator('findingPublishingFrequency', cdk.validateString)(properties.findingPublishingFrequency));
    return errors.wrap('supplied properties not correct for "CfnDetectorProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GuardDuty::Detector` resource
 *
 * @param properties - the TypeScript properties of a `CfnDetectorProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GuardDuty::Detector` resource.
 */
// @ts-ignore TS6133
function cfnDetectorPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorPropsValidator(properties).assertSuccess();
    return {
        Enable: cdk.booleanToCloudFormation(properties.enable),
        DataSources: cfnDetectorCFNDataSourceConfigurationsPropertyToCloudFormation(properties.dataSources),
        FindingPublishingFrequency: cdk.stringToCloudFormation(properties.findingPublishingFrequency),
    };
}

// @ts-ignore TS6133
function CfnDetectorPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorProps>();
    ret.addPropertyResult('enable', 'Enable', cfn_parse.FromCloudFormation.getBoolean(properties.Enable));
    ret.addPropertyResult('dataSources', 'DataSources', properties.DataSources != null ? CfnDetectorCFNDataSourceConfigurationsPropertyFromCloudFormation(properties.DataSources) : undefined);
    ret.addPropertyResult('findingPublishingFrequency', 'FindingPublishingFrequency', properties.FindingPublishingFrequency != null ? cfn_parse.FromCloudFormation.getString(properties.FindingPublishingFrequency) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GuardDuty::Detector`
 *
 * The `AWS::GuardDuty::Detector` resource specifies a new  detector. A detector is an object that represents the  service. A detector is required for  to become operational.
 *
 * @cloudformationResource AWS::GuardDuty::Detector
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-detector.html
 */
export class CfnDetector extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GuardDuty::Detector";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDetector {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDetectorPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDetector(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Specifies whether the detector is to be enabled on creation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-detector.html#cfn-guardduty-detector-enable
     */
    public enable: boolean | cdk.IResolvable;

    /**
     * Describes which data sources will be enabled for the detector.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-detector.html#cfn-guardduty-detector-datasources
     */
    public dataSources: CfnDetector.CFNDataSourceConfigurationsProperty | cdk.IResolvable | undefined;

    /**
     * Specifies how frequently updated findings are exported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-detector.html#cfn-guardduty-detector-findingpublishingfrequency
     */
    public findingPublishingFrequency: string | undefined;

    /**
     * Create a new `AWS::GuardDuty::Detector`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDetectorProps) {
        super(scope, id, { type: CfnDetector.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'enable', this);

        this.enable = props.enable;
        this.dataSources = props.dataSources;
        this.findingPublishingFrequency = props.findingPublishingFrequency;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDetector.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            enable: this.enable,
            dataSources: this.dataSources,
            findingPublishingFrequency: this.findingPublishingFrequency,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDetectorPropsToCloudFormation(props);
    }
}

export namespace CfnDetector {
    /**
     * Describes whether S3 data event logs or Kubernetes audit logs will be enabled as a data source when the detector is created.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-detector-cfndatasourceconfigurations.html
     */
    export interface CFNDataSourceConfigurationsProperty {
        /**
         * Describes which Kuberentes data sources are enabled for a detector.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-detector-cfndatasourceconfigurations.html#cfn-guardduty-detector-cfndatasourceconfigurations-kubernetes
         */
        readonly kubernetes?: CfnDetector.CFNKubernetesConfigurationProperty | cdk.IResolvable;
        /**
         * Describes whether S3 data event logs are enabled as a data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-detector-cfndatasourceconfigurations.html#cfn-guardduty-detector-cfndatasourceconfigurations-s3logs
         */
        readonly s3Logs?: CfnDetector.CFNS3LogsConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `CFNDataSourceConfigurationsProperty`
 *
 * @param properties - the TypeScript properties of a `CFNDataSourceConfigurationsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetector_CFNDataSourceConfigurationsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('kubernetes', CfnDetector_CFNKubernetesConfigurationPropertyValidator)(properties.kubernetes));
    errors.collect(cdk.propertyValidator('s3Logs', CfnDetector_CFNS3LogsConfigurationPropertyValidator)(properties.s3Logs));
    return errors.wrap('supplied properties not correct for "CFNDataSourceConfigurationsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GuardDuty::Detector.CFNDataSourceConfigurations` resource
 *
 * @param properties - the TypeScript properties of a `CFNDataSourceConfigurationsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GuardDuty::Detector.CFNDataSourceConfigurations` resource.
 */
// @ts-ignore TS6133
function cfnDetectorCFNDataSourceConfigurationsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetector_CFNDataSourceConfigurationsPropertyValidator(properties).assertSuccess();
    return {
        Kubernetes: cfnDetectorCFNKubernetesConfigurationPropertyToCloudFormation(properties.kubernetes),
        S3Logs: cfnDetectorCFNS3LogsConfigurationPropertyToCloudFormation(properties.s3Logs),
    };
}

// @ts-ignore TS6133
function CfnDetectorCFNDataSourceConfigurationsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetector.CFNDataSourceConfigurationsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetector.CFNDataSourceConfigurationsProperty>();
    ret.addPropertyResult('kubernetes', 'Kubernetes', properties.Kubernetes != null ? CfnDetectorCFNKubernetesConfigurationPropertyFromCloudFormation(properties.Kubernetes) : undefined);
    ret.addPropertyResult('s3Logs', 'S3Logs', properties.S3Logs != null ? CfnDetectorCFNS3LogsConfigurationPropertyFromCloudFormation(properties.S3Logs) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetector {
    /**
     * Describes which optional data sources are enabled for a detector.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-detector-cfnkubernetesauditlogsconfiguration.html
     */
    export interface CFNKubernetesAuditLogsConfigurationProperty {
        /**
         * Describes whether Kubernetes audit logs are enabled as a data source for the detector.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-detector-cfnkubernetesauditlogsconfiguration.html#cfn-guardduty-detector-cfnkubernetesauditlogsconfiguration-enable
         */
        readonly enable?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `CFNKubernetesAuditLogsConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `CFNKubernetesAuditLogsConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetector_CFNKubernetesAuditLogsConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enable', cdk.validateBoolean)(properties.enable));
    return errors.wrap('supplied properties not correct for "CFNKubernetesAuditLogsConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GuardDuty::Detector.CFNKubernetesAuditLogsConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CFNKubernetesAuditLogsConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GuardDuty::Detector.CFNKubernetesAuditLogsConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDetectorCFNKubernetesAuditLogsConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetector_CFNKubernetesAuditLogsConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Enable: cdk.booleanToCloudFormation(properties.enable),
    };
}

// @ts-ignore TS6133
function CfnDetectorCFNKubernetesAuditLogsConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetector.CFNKubernetesAuditLogsConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetector.CFNKubernetesAuditLogsConfigurationProperty>();
    ret.addPropertyResult('enable', 'Enable', properties.Enable != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enable) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetector {
    /**
     * Describes which Kubernetes protection data sources are enabled for the detector.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-detector-cfnkubernetesconfiguration.html
     */
    export interface CFNKubernetesConfigurationProperty {
        /**
         * Describes whether Kubernetes audit logs are enabled as a data source for the detector.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-detector-cfnkubernetesconfiguration.html#cfn-guardduty-detector-cfnkubernetesconfiguration-auditlogs
         */
        readonly auditLogs?: CfnDetector.CFNKubernetesAuditLogsConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `CFNKubernetesConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `CFNKubernetesConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetector_CFNKubernetesConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('auditLogs', CfnDetector_CFNKubernetesAuditLogsConfigurationPropertyValidator)(properties.auditLogs));
    return errors.wrap('supplied properties not correct for "CFNKubernetesConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GuardDuty::Detector.CFNKubernetesConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CFNKubernetesConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GuardDuty::Detector.CFNKubernetesConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDetectorCFNKubernetesConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetector_CFNKubernetesConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AuditLogs: cfnDetectorCFNKubernetesAuditLogsConfigurationPropertyToCloudFormation(properties.auditLogs),
    };
}

// @ts-ignore TS6133
function CfnDetectorCFNKubernetesConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetector.CFNKubernetesConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetector.CFNKubernetesConfigurationProperty>();
    ret.addPropertyResult('auditLogs', 'AuditLogs', properties.AuditLogs != null ? CfnDetectorCFNKubernetesAuditLogsConfigurationPropertyFromCloudFormation(properties.AuditLogs) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetector {
    /**
     * Describes whether S3 data event logs will be enabled as a data source when the detector is created.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-detector-cfns3logsconfiguration.html
     */
    export interface CFNS3LogsConfigurationProperty {
        /**
         * The status of S3 data event logs as a data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-detector-cfns3logsconfiguration.html#cfn-guardduty-detector-cfns3logsconfiguration-enable
         */
        readonly enable?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `CFNS3LogsConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `CFNS3LogsConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetector_CFNS3LogsConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enable', cdk.validateBoolean)(properties.enable));
    return errors.wrap('supplied properties not correct for "CFNS3LogsConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GuardDuty::Detector.CFNS3LogsConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CFNS3LogsConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GuardDuty::Detector.CFNS3LogsConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDetectorCFNS3LogsConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetector_CFNS3LogsConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Enable: cdk.booleanToCloudFormation(properties.enable),
    };
}

// @ts-ignore TS6133
function CfnDetectorCFNS3LogsConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetector.CFNS3LogsConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetector.CFNS3LogsConfigurationProperty>();
    ret.addPropertyResult('enable', 'Enable', properties.Enable != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enable) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnFilter`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-filter.html
 */
export interface CfnFilterProps {

    /**
     * Specifies the action that is to be applied to the findings that match the filter.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-filter.html#cfn-guardduty-filter-action
     */
    readonly action: string;

    /**
     * The description of the filter.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-filter.html#cfn-guardduty-filter-description
     */
    readonly description: string;

    /**
     * The ID of the detector belonging to the GuardDuty account that you want to create a filter for.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-filter.html#cfn-guardduty-filter-detectorid
     */
    readonly detectorId: string;

    /**
     * Represents the criteria to be used in the filter for querying findings.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-filter.html#cfn-guardduty-filter-findingcriteria
     */
    readonly findingCriteria: CfnFilter.FindingCriteriaProperty | cdk.IResolvable;

    /**
     * The name of the filter. Minimum length of 3. Maximum length of 64. Valid characters include alphanumeric characters, dot (.), underscore (_), and dash (-). Spaces are not allowed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-filter.html#cfn-guardduty-filter-name
     */
    readonly name: string;

    /**
     * `AWS::GuardDuty::Filter.Rank`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-filter.html#cfn-guardduty-filter-rank
     */
    readonly rank: number;
}

/**
 * Determine whether the given properties match those of a `CfnFilterProps`
 *
 * @param properties - the TypeScript properties of a `CfnFilterProps`
 *
 * @returns the result of the validation.
 */
function CfnFilterPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('action', cdk.requiredValidator)(properties.action));
    errors.collect(cdk.propertyValidator('action', cdk.validateString)(properties.action));
    errors.collect(cdk.propertyValidator('description', cdk.requiredValidator)(properties.description));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('detectorId', cdk.requiredValidator)(properties.detectorId));
    errors.collect(cdk.propertyValidator('detectorId', cdk.validateString)(properties.detectorId));
    errors.collect(cdk.propertyValidator('findingCriteria', cdk.requiredValidator)(properties.findingCriteria));
    errors.collect(cdk.propertyValidator('findingCriteria', CfnFilter_FindingCriteriaPropertyValidator)(properties.findingCriteria));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('rank', cdk.requiredValidator)(properties.rank));
    errors.collect(cdk.propertyValidator('rank', cdk.validateNumber)(properties.rank));
    return errors.wrap('supplied properties not correct for "CfnFilterProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GuardDuty::Filter` resource
 *
 * @param properties - the TypeScript properties of a `CfnFilterProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GuardDuty::Filter` resource.
 */
// @ts-ignore TS6133
function cfnFilterPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFilterPropsValidator(properties).assertSuccess();
    return {
        Action: cdk.stringToCloudFormation(properties.action),
        Description: cdk.stringToCloudFormation(properties.description),
        DetectorId: cdk.stringToCloudFormation(properties.detectorId),
        FindingCriteria: cfnFilterFindingCriteriaPropertyToCloudFormation(properties.findingCriteria),
        Name: cdk.stringToCloudFormation(properties.name),
        Rank: cdk.numberToCloudFormation(properties.rank),
    };
}

// @ts-ignore TS6133
function CfnFilterPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFilterProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFilterProps>();
    ret.addPropertyResult('action', 'Action', cfn_parse.FromCloudFormation.getString(properties.Action));
    ret.addPropertyResult('description', 'Description', cfn_parse.FromCloudFormation.getString(properties.Description));
    ret.addPropertyResult('detectorId', 'DetectorId', cfn_parse.FromCloudFormation.getString(properties.DetectorId));
    ret.addPropertyResult('findingCriteria', 'FindingCriteria', CfnFilterFindingCriteriaPropertyFromCloudFormation(properties.FindingCriteria));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('rank', 'Rank', cfn_parse.FromCloudFormation.getNumber(properties.Rank));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GuardDuty::Filter`
 *
 * The `AWS::GuardDuty::Filter` resource specifies a new filter defined by the provided `findingCriteria` .
 *
 * @cloudformationResource AWS::GuardDuty::Filter
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-filter.html
 */
export class CfnFilter extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GuardDuty::Filter";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnFilter {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnFilterPropsFromCloudFormation(resourceProperties);
        const ret = new CfnFilter(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Specifies the action that is to be applied to the findings that match the filter.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-filter.html#cfn-guardduty-filter-action
     */
    public action: string;

    /**
     * The description of the filter.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-filter.html#cfn-guardduty-filter-description
     */
    public description: string;

    /**
     * The ID of the detector belonging to the GuardDuty account that you want to create a filter for.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-filter.html#cfn-guardduty-filter-detectorid
     */
    public detectorId: string;

    /**
     * Represents the criteria to be used in the filter for querying findings.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-filter.html#cfn-guardduty-filter-findingcriteria
     */
    public findingCriteria: CfnFilter.FindingCriteriaProperty | cdk.IResolvable;

    /**
     * The name of the filter. Minimum length of 3. Maximum length of 64. Valid characters include alphanumeric characters, dot (.), underscore (_), and dash (-). Spaces are not allowed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-filter.html#cfn-guardduty-filter-name
     */
    public name: string;

    /**
     * `AWS::GuardDuty::Filter.Rank`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-filter.html#cfn-guardduty-filter-rank
     */
    public rank: number;

    /**
     * Create a new `AWS::GuardDuty::Filter`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnFilterProps) {
        super(scope, id, { type: CfnFilter.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'action', this);
        cdk.requireProperty(props, 'description', this);
        cdk.requireProperty(props, 'detectorId', this);
        cdk.requireProperty(props, 'findingCriteria', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'rank', this);

        this.action = props.action;
        this.description = props.description;
        this.detectorId = props.detectorId;
        this.findingCriteria = props.findingCriteria;
        this.name = props.name;
        this.rank = props.rank;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnFilter.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            action: this.action,
            description: this.description,
            detectorId: this.detectorId,
            findingCriteria: this.findingCriteria,
            name: this.name,
            rank: this.rank,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnFilterPropsToCloudFormation(props);
    }
}

export namespace CfnFilter {
    /**
     * Specifies the condition to apply to a single field when filtering through  findings.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-filter-condition.html
     */
    export interface ConditionProperty {
        /**
         * Represents the equal condition to apply to a single field when querying for findings.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-filter-condition.html#cfn-guardduty-filter-condition-eq
         */
        readonly eq?: string[];
        /**
         * Represents the greater than or equal condition to apply to a single field when querying for findings.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-filter-condition.html#cfn-guardduty-filter-condition-gte
         */
        readonly gte?: number;
        /**
         * Represents the less than condition to apply to a single field when querying for findings.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-filter-condition.html#cfn-guardduty-filter-condition-lt
         */
        readonly lt?: number;
        /**
         * Represents the less than or equal condition to apply to a single field when querying for findings.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-filter-condition.html#cfn-guardduty-filter-condition-lte
         */
        readonly lte?: number;
        /**
         * Represents the not equal condition to apply to a single field when querying for findings.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-filter-condition.html#cfn-guardduty-filter-condition-neq
         */
        readonly neq?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `ConditionProperty`
 *
 * @param properties - the TypeScript properties of a `ConditionProperty`
 *
 * @returns the result of the validation.
 */
function CfnFilter_ConditionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('eq', cdk.listValidator(cdk.validateString))(properties.eq));
    errors.collect(cdk.propertyValidator('gte', cdk.validateNumber)(properties.gte));
    errors.collect(cdk.propertyValidator('lt', cdk.validateNumber)(properties.lt));
    errors.collect(cdk.propertyValidator('lte', cdk.validateNumber)(properties.lte));
    errors.collect(cdk.propertyValidator('neq', cdk.listValidator(cdk.validateString))(properties.neq));
    return errors.wrap('supplied properties not correct for "ConditionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GuardDuty::Filter.Condition` resource
 *
 * @param properties - the TypeScript properties of a `ConditionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GuardDuty::Filter.Condition` resource.
 */
// @ts-ignore TS6133
function cfnFilterConditionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFilter_ConditionPropertyValidator(properties).assertSuccess();
    return {
        Eq: cdk.listMapper(cdk.stringToCloudFormation)(properties.eq),
        Gte: cdk.numberToCloudFormation(properties.gte),
        Lt: cdk.numberToCloudFormation(properties.lt),
        Lte: cdk.numberToCloudFormation(properties.lte),
        Neq: cdk.listMapper(cdk.stringToCloudFormation)(properties.neq),
    };
}

// @ts-ignore TS6133
function CfnFilterConditionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFilter.ConditionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFilter.ConditionProperty>();
    ret.addPropertyResult('eq', 'Eq', properties.Eq != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Eq) : undefined);
    ret.addPropertyResult('gte', 'Gte', properties.Gte != null ? cfn_parse.FromCloudFormation.getNumber(properties.Gte) : undefined);
    ret.addPropertyResult('lt', 'Lt', properties.Lt != null ? cfn_parse.FromCloudFormation.getNumber(properties.Lt) : undefined);
    ret.addPropertyResult('lte', 'Lte', properties.Lte != null ? cfn_parse.FromCloudFormation.getNumber(properties.Lte) : undefined);
    ret.addPropertyResult('neq', 'Neq', properties.Neq != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Neq) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFilter {
    /**
     * Represents a map of finding properties that match specified conditions and values when querying findings.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-filter-findingcriteria.html
     */
    export interface FindingCriteriaProperty {
        /**
         * Represents a map of finding properties that match specified conditions and values when querying findings.
         *
         * For a mapping of JSON criterion to their console equivalent see [Finding criteria](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_filter-findings.html#filter_criteria) . The following are the available criterion:
         *
         * - accountId
         * - region
         * - confidence
         * - id
         * - resource.accessKeyDetails.accessKeyId
         * - resource.accessKeyDetails.principalId
         * - resource.accessKeyDetails.userName
         * - resource.accessKeyDetails.userType
         * - resource.instanceDetails.iamInstanceProfile.id
         * - resource.instanceDetails.imageId
         * - resource.instanceDetails.instanceId
         * - resource.instanceDetails.outpostArn
         * - resource.instanceDetails.networkInterfaces.ipv6Addresses
         * - resource.instanceDetails.networkInterfaces.privateIpAddresses.privateIpAddress
         * - resource.instanceDetails.networkInterfaces.publicDnsName
         * - resource.instanceDetails.networkInterfaces.publicIp
         * - resource.instanceDetails.networkInterfaces.securityGroups.groupId
         * - resource.instanceDetails.networkInterfaces.securityGroups.groupName
         * - resource.instanceDetails.networkInterfaces.subnetId
         * - resource.instanceDetails.networkInterfaces.vpcId
         * - resource.instanceDetails.tags.key
         * - resource.instanceDetails.tags.value
         * - resource.resourceType
         * - service.action.actionType
         * - service.action.awsApiCallAction.api
         * - service.action.awsApiCallAction.callerType
         * - service.action.awsApiCallAction.errorCode
         * - service.action.awsApiCallAction.remoteIpDetails.city.cityName
         * - service.action.awsApiCallAction.remoteIpDetails.country.countryName
         * - service.action.awsApiCallAction.remoteIpDetails.ipAddressV4
         * - service.action.awsApiCallAction.remoteIpDetails.organization.asn
         * - service.action.awsApiCallAction.remoteIpDetails.organization.asnOrg
         * - service.action.awsApiCallAction.serviceName
         * - service.action.dnsRequestAction.domain
         * - service.action.networkConnectionAction.blocked
         * - service.action.networkConnectionAction.connectionDirection
         * - service.action.networkConnectionAction.localPortDetails.port
         * - service.action.networkConnectionAction.protocol
         * - service.action.networkConnectionAction.localIpDetails.ipAddressV4
         * - service.action.networkConnectionAction.remoteIpDetails.city.cityName
         * - service.action.networkConnectionAction.remoteIpDetails.country.countryName
         * - service.action.networkConnectionAction.remoteIpDetails.ipAddressV4
         * - service.action.networkConnectionAction.remoteIpDetails.organization.asn
         * - service.action.networkConnectionAction.remoteIpDetails.organization.asnOrg
         * - service.action.networkConnectionAction.remotePortDetails.port
         * - service.additionalInfo.threatListName
         * - service.archived
         *
         * When this attribute is set to TRUE, only archived findings are listed. When it's set to FALSE, only unarchived findings are listed. When this attribute is not set, all existing findings are listed.
         * - service.resourceRole
         * - severity
         * - type
         * - updatedAt
         *
         * Type: ISO 8601 string format: YYYY-MM-DDTHH:MM:SS.SSSZ or YYYY-MM-DDTHH:MM:SSZ depending on whether the value contains milliseconds.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-filter-findingcriteria.html#cfn-guardduty-filter-findingcriteria-criterion
         */
        readonly criterion?: any | cdk.IResolvable;
        /**
         * Specifies the condition to be applied to a single field when filtering through findings.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-guardduty-filter-findingcriteria.html#cfn-guardduty-filter-findingcriteria-itemtype
         */
        readonly itemType?: CfnFilter.ConditionProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `FindingCriteriaProperty`
 *
 * @param properties - the TypeScript properties of a `FindingCriteriaProperty`
 *
 * @returns the result of the validation.
 */
function CfnFilter_FindingCriteriaPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('criterion', cdk.validateObject)(properties.criterion));
    errors.collect(cdk.propertyValidator('itemType', CfnFilter_ConditionPropertyValidator)(properties.itemType));
    return errors.wrap('supplied properties not correct for "FindingCriteriaProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GuardDuty::Filter.FindingCriteria` resource
 *
 * @param properties - the TypeScript properties of a `FindingCriteriaProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GuardDuty::Filter.FindingCriteria` resource.
 */
// @ts-ignore TS6133
function cfnFilterFindingCriteriaPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFilter_FindingCriteriaPropertyValidator(properties).assertSuccess();
    return {
        Criterion: cdk.objectToCloudFormation(properties.criterion),
        ItemType: cfnFilterConditionPropertyToCloudFormation(properties.itemType),
    };
}

// @ts-ignore TS6133
function CfnFilterFindingCriteriaPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFilter.FindingCriteriaProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFilter.FindingCriteriaProperty>();
    ret.addPropertyResult('criterion', 'Criterion', properties.Criterion != null ? cfn_parse.FromCloudFormation.getAny(properties.Criterion) : undefined);
    ret.addPropertyResult('itemType', 'ItemType', properties.ItemType != null ? CfnFilterConditionPropertyFromCloudFormation(properties.ItemType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnIPSet`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html
 */
export interface CfnIPSetProps {

    /**
     * Indicates whether or not  uses the `IPSet` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html#cfn-guardduty-ipset-activate
     */
    readonly activate: boolean | cdk.IResolvable;

    /**
     * The unique ID of the detector of the GuardDuty account that you want to create an IPSet for.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html#cfn-guardduty-ipset-detectorid
     */
    readonly detectorId: string;

    /**
     * The format of the file that contains the IPSet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html#cfn-guardduty-ipset-format
     */
    readonly format: string;

    /**
     * The URI of the file that contains the IPSet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html#cfn-guardduty-ipset-location
     */
    readonly location: string;

    /**
     * The user-friendly name to identify the IPSet.
     *
     * Allowed characters are alphanumerics, spaces, hyphens (-), and underscores (_).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html#cfn-guardduty-ipset-name
     */
    readonly name?: string;
}

/**
 * Determine whether the given properties match those of a `CfnIPSetProps`
 *
 * @param properties - the TypeScript properties of a `CfnIPSetProps`
 *
 * @returns the result of the validation.
 */
function CfnIPSetPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('activate', cdk.requiredValidator)(properties.activate));
    errors.collect(cdk.propertyValidator('activate', cdk.validateBoolean)(properties.activate));
    errors.collect(cdk.propertyValidator('detectorId', cdk.requiredValidator)(properties.detectorId));
    errors.collect(cdk.propertyValidator('detectorId', cdk.validateString)(properties.detectorId));
    errors.collect(cdk.propertyValidator('format', cdk.requiredValidator)(properties.format));
    errors.collect(cdk.propertyValidator('format', cdk.validateString)(properties.format));
    errors.collect(cdk.propertyValidator('location', cdk.requiredValidator)(properties.location));
    errors.collect(cdk.propertyValidator('location', cdk.validateString)(properties.location));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "CfnIPSetProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GuardDuty::IPSet` resource
 *
 * @param properties - the TypeScript properties of a `CfnIPSetProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GuardDuty::IPSet` resource.
 */
// @ts-ignore TS6133
function cfnIPSetPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIPSetPropsValidator(properties).assertSuccess();
    return {
        Activate: cdk.booleanToCloudFormation(properties.activate),
        DetectorId: cdk.stringToCloudFormation(properties.detectorId),
        Format: cdk.stringToCloudFormation(properties.format),
        Location: cdk.stringToCloudFormation(properties.location),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnIPSetPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIPSetProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIPSetProps>();
    ret.addPropertyResult('activate', 'Activate', cfn_parse.FromCloudFormation.getBoolean(properties.Activate));
    ret.addPropertyResult('detectorId', 'DetectorId', cfn_parse.FromCloudFormation.getString(properties.DetectorId));
    ret.addPropertyResult('format', 'Format', cfn_parse.FromCloudFormation.getString(properties.Format));
    ret.addPropertyResult('location', 'Location', cfn_parse.FromCloudFormation.getString(properties.Location));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GuardDuty::IPSet`
 *
 * The `AWS::GuardDuty::IPSet` resource specifies a new `IPSet` . An `IPSet` is a list of trusted IP addresses from which secure communication is allowed with AWS infrastructure and applications.
 *
 * @cloudformationResource AWS::GuardDuty::IPSet
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html
 */
export class CfnIPSet extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GuardDuty::IPSet";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnIPSet {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnIPSetPropsFromCloudFormation(resourceProperties);
        const ret = new CfnIPSet(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Indicates whether or not  uses the `IPSet` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html#cfn-guardduty-ipset-activate
     */
    public activate: boolean | cdk.IResolvable;

    /**
     * The unique ID of the detector of the GuardDuty account that you want to create an IPSet for.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html#cfn-guardduty-ipset-detectorid
     */
    public detectorId: string;

    /**
     * The format of the file that contains the IPSet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html#cfn-guardduty-ipset-format
     */
    public format: string;

    /**
     * The URI of the file that contains the IPSet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html#cfn-guardduty-ipset-location
     */
    public location: string;

    /**
     * The user-friendly name to identify the IPSet.
     *
     * Allowed characters are alphanumerics, spaces, hyphens (-), and underscores (_).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-ipset.html#cfn-guardduty-ipset-name
     */
    public name: string | undefined;

    /**
     * Create a new `AWS::GuardDuty::IPSet`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnIPSetProps) {
        super(scope, id, { type: CfnIPSet.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'activate', this);
        cdk.requireProperty(props, 'detectorId', this);
        cdk.requireProperty(props, 'format', this);
        cdk.requireProperty(props, 'location', this);

        this.activate = props.activate;
        this.detectorId = props.detectorId;
        this.format = props.format;
        this.location = props.location;
        this.name = props.name;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnIPSet.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            activate: this.activate,
            detectorId: this.detectorId,
            format: this.format,
            location: this.location,
            name: this.name,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnIPSetPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnMaster`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-master.html
 */
export interface CfnMasterProps {

    /**
     * The unique ID of the detector of the GuardDuty member account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-master.html#cfn-guardduty-master-detectorid
     */
    readonly detectorId: string;

    /**
     * The AWS account ID of the account designated as the  administrator account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-master.html#cfn-guardduty-master-masterid
     */
    readonly masterId: string;

    /**
     * The ID of the invitation that is sent to the account designated as a member account. You can find the invitation ID by using the ListInvitation action of the  API.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-master.html#cfn-guardduty-master-invitationid
     */
    readonly invitationId?: string;
}

/**
 * Determine whether the given properties match those of a `CfnMasterProps`
 *
 * @param properties - the TypeScript properties of a `CfnMasterProps`
 *
 * @returns the result of the validation.
 */
function CfnMasterPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('detectorId', cdk.requiredValidator)(properties.detectorId));
    errors.collect(cdk.propertyValidator('detectorId', cdk.validateString)(properties.detectorId));
    errors.collect(cdk.propertyValidator('invitationId', cdk.validateString)(properties.invitationId));
    errors.collect(cdk.propertyValidator('masterId', cdk.requiredValidator)(properties.masterId));
    errors.collect(cdk.propertyValidator('masterId', cdk.validateString)(properties.masterId));
    return errors.wrap('supplied properties not correct for "CfnMasterProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GuardDuty::Master` resource
 *
 * @param properties - the TypeScript properties of a `CfnMasterProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GuardDuty::Master` resource.
 */
// @ts-ignore TS6133
function cfnMasterPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMasterPropsValidator(properties).assertSuccess();
    return {
        DetectorId: cdk.stringToCloudFormation(properties.detectorId),
        MasterId: cdk.stringToCloudFormation(properties.masterId),
        InvitationId: cdk.stringToCloudFormation(properties.invitationId),
    };
}

// @ts-ignore TS6133
function CfnMasterPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMasterProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMasterProps>();
    ret.addPropertyResult('detectorId', 'DetectorId', cfn_parse.FromCloudFormation.getString(properties.DetectorId));
    ret.addPropertyResult('masterId', 'MasterId', cfn_parse.FromCloudFormation.getString(properties.MasterId));
    ret.addPropertyResult('invitationId', 'InvitationId', properties.InvitationId != null ? cfn_parse.FromCloudFormation.getString(properties.InvitationId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GuardDuty::Master`
 *
 * You can use the `AWS::GuardDuty::Master` resource in a  member account to accept an invitation from a  administrator account. The invitation to the member account must be sent prior to using the `AWS::GuardDuty::Master` resource to accept the administrator account's invitation. You can invite a member account by using the `InviteMembers` operation of the  API, or by creating an `AWS::GuardDuty::Member` resource.
 *
 * @cloudformationResource AWS::GuardDuty::Master
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-master.html
 */
export class CfnMaster extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GuardDuty::Master";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnMaster {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnMasterPropsFromCloudFormation(resourceProperties);
        const ret = new CfnMaster(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The unique ID of the detector of the GuardDuty member account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-master.html#cfn-guardduty-master-detectorid
     */
    public detectorId: string;

    /**
     * The AWS account ID of the account designated as the  administrator account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-master.html#cfn-guardduty-master-masterid
     */
    public masterId: string;

    /**
     * The ID of the invitation that is sent to the account designated as a member account. You can find the invitation ID by using the ListInvitation action of the  API.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-master.html#cfn-guardduty-master-invitationid
     */
    public invitationId: string | undefined;

    /**
     * Create a new `AWS::GuardDuty::Master`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnMasterProps) {
        super(scope, id, { type: CfnMaster.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'detectorId', this);
        cdk.requireProperty(props, 'masterId', this);

        this.detectorId = props.detectorId;
        this.masterId = props.masterId;
        this.invitationId = props.invitationId;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnMaster.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            detectorId: this.detectorId,
            masterId: this.masterId,
            invitationId: this.invitationId,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnMasterPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnMember`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-member.html
 */
export interface CfnMemberProps {

    /**
     * The ID of the detector associated with the  service to add the member to.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-member.html#cfn-guardduty-member-detectorid
     */
    readonly detectorId: string;

    /**
     * The email address associated with the member account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-member.html#cfn-guardduty-member-email
     */
    readonly email: string;

    /**
     * The AWS account ID of the account to designate as a member.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-member.html#cfn-guardduty-member-memberid
     */
    readonly memberId: string;

    /**
     * Specifies whether or not to disable email notification for the member account that you invite.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-member.html#cfn-guardduty-member-disableemailnotification
     */
    readonly disableEmailNotification?: boolean | cdk.IResolvable;

    /**
     * The invitation message that you want to send to the accounts that you're inviting to GuardDuty as members.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-member.html#cfn-guardduty-member-message
     */
    readonly message?: string;

    /**
     * You can use the `Status` property to update the status of the relationship between the member account and its administrator account. Valid values are `Created` and `Invited` when using an `AWS::GuardDuty::Member` resource. If the value for this property is not provided or set to `Created` , a member account is created but not invited. If the value of this property is set to `Invited` , a member account is created and invited.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-member.html#cfn-guardduty-member-status
     */
    readonly status?: string;
}

/**
 * Determine whether the given properties match those of a `CfnMemberProps`
 *
 * @param properties - the TypeScript properties of a `CfnMemberProps`
 *
 * @returns the result of the validation.
 */
function CfnMemberPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('detectorId', cdk.requiredValidator)(properties.detectorId));
    errors.collect(cdk.propertyValidator('detectorId', cdk.validateString)(properties.detectorId));
    errors.collect(cdk.propertyValidator('disableEmailNotification', cdk.validateBoolean)(properties.disableEmailNotification));
    errors.collect(cdk.propertyValidator('email', cdk.requiredValidator)(properties.email));
    errors.collect(cdk.propertyValidator('email', cdk.validateString)(properties.email));
    errors.collect(cdk.propertyValidator('memberId', cdk.requiredValidator)(properties.memberId));
    errors.collect(cdk.propertyValidator('memberId', cdk.validateString)(properties.memberId));
    errors.collect(cdk.propertyValidator('message', cdk.validateString)(properties.message));
    errors.collect(cdk.propertyValidator('status', cdk.validateString)(properties.status));
    return errors.wrap('supplied properties not correct for "CfnMemberProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GuardDuty::Member` resource
 *
 * @param properties - the TypeScript properties of a `CfnMemberProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GuardDuty::Member` resource.
 */
// @ts-ignore TS6133
function cfnMemberPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMemberPropsValidator(properties).assertSuccess();
    return {
        DetectorId: cdk.stringToCloudFormation(properties.detectorId),
        Email: cdk.stringToCloudFormation(properties.email),
        MemberId: cdk.stringToCloudFormation(properties.memberId),
        DisableEmailNotification: cdk.booleanToCloudFormation(properties.disableEmailNotification),
        Message: cdk.stringToCloudFormation(properties.message),
        Status: cdk.stringToCloudFormation(properties.status),
    };
}

// @ts-ignore TS6133
function CfnMemberPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMemberProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMemberProps>();
    ret.addPropertyResult('detectorId', 'DetectorId', cfn_parse.FromCloudFormation.getString(properties.DetectorId));
    ret.addPropertyResult('email', 'Email', cfn_parse.FromCloudFormation.getString(properties.Email));
    ret.addPropertyResult('memberId', 'MemberId', cfn_parse.FromCloudFormation.getString(properties.MemberId));
    ret.addPropertyResult('disableEmailNotification', 'DisableEmailNotification', properties.DisableEmailNotification != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DisableEmailNotification) : undefined);
    ret.addPropertyResult('message', 'Message', properties.Message != null ? cfn_parse.FromCloudFormation.getString(properties.Message) : undefined);
    ret.addPropertyResult('status', 'Status', properties.Status != null ? cfn_parse.FromCloudFormation.getString(properties.Status) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GuardDuty::Member`
 *
 * You can use the `AWS::GuardDuty::Member` resource to add an AWS account as a  member account to the current  administrator account. If the value of the `Status` property is not provided or is set to `Created` , a member account is created but not invited. If the value of the `Status` property is set to `Invited` , a member account is created and invited. An `AWS::GuardDuty::Member` resource must be created with the `Status` property set to `Invited` before the `AWS::GuardDuty::Master` resource can be created in a  member account.
 *
 * @cloudformationResource AWS::GuardDuty::Member
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-member.html
 */
export class CfnMember extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GuardDuty::Member";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnMember {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnMemberPropsFromCloudFormation(resourceProperties);
        const ret = new CfnMember(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ID of the detector associated with the  service to add the member to.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-member.html#cfn-guardduty-member-detectorid
     */
    public detectorId: string;

    /**
     * The email address associated with the member account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-member.html#cfn-guardduty-member-email
     */
    public email: string;

    /**
     * The AWS account ID of the account to designate as a member.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-member.html#cfn-guardduty-member-memberid
     */
    public memberId: string;

    /**
     * Specifies whether or not to disable email notification for the member account that you invite.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-member.html#cfn-guardduty-member-disableemailnotification
     */
    public disableEmailNotification: boolean | cdk.IResolvable | undefined;

    /**
     * The invitation message that you want to send to the accounts that you're inviting to GuardDuty as members.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-member.html#cfn-guardduty-member-message
     */
    public message: string | undefined;

    /**
     * You can use the `Status` property to update the status of the relationship between the member account and its administrator account. Valid values are `Created` and `Invited` when using an `AWS::GuardDuty::Member` resource. If the value for this property is not provided or set to `Created` , a member account is created but not invited. If the value of this property is set to `Invited` , a member account is created and invited.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-member.html#cfn-guardduty-member-status
     */
    public status: string | undefined;

    /**
     * Create a new `AWS::GuardDuty::Member`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnMemberProps) {
        super(scope, id, { type: CfnMember.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'detectorId', this);
        cdk.requireProperty(props, 'email', this);
        cdk.requireProperty(props, 'memberId', this);

        this.detectorId = props.detectorId;
        this.email = props.email;
        this.memberId = props.memberId;
        this.disableEmailNotification = props.disableEmailNotification;
        this.message = props.message;
        this.status = props.status;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnMember.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            detectorId: this.detectorId,
            email: this.email,
            memberId: this.memberId,
            disableEmailNotification: this.disableEmailNotification,
            message: this.message,
            status: this.status,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnMemberPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnThreatIntelSet`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-threatintelset.html
 */
export interface CfnThreatIntelSetProps {

    /**
     * A Boolean value that indicates whether GuardDuty is to start using the uploaded ThreatIntelSet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-threatintelset.html#cfn-guardduty-threatintelset-activate
     */
    readonly activate: boolean | cdk.IResolvable;

    /**
     * The unique ID of the detector of the GuardDuty account that you want to create a threatIntelSet for.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-threatintelset.html#cfn-guardduty-threatintelset-detectorid
     */
    readonly detectorId: string;

    /**
     * The format of the file that contains the ThreatIntelSet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-threatintelset.html#cfn-guardduty-threatintelset-format
     */
    readonly format: string;

    /**
     * The URI of the file that contains the ThreatIntelSet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-threatintelset.html#cfn-guardduty-threatintelset-location
     */
    readonly location: string;

    /**
     * A user-friendly ThreatIntelSet name displayed in all findings that are generated by activity that involves IP addresses included in this ThreatIntelSet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-threatintelset.html#cfn-guardduty-threatintelset-name
     */
    readonly name?: string;
}

/**
 * Determine whether the given properties match those of a `CfnThreatIntelSetProps`
 *
 * @param properties - the TypeScript properties of a `CfnThreatIntelSetProps`
 *
 * @returns the result of the validation.
 */
function CfnThreatIntelSetPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('activate', cdk.requiredValidator)(properties.activate));
    errors.collect(cdk.propertyValidator('activate', cdk.validateBoolean)(properties.activate));
    errors.collect(cdk.propertyValidator('detectorId', cdk.requiredValidator)(properties.detectorId));
    errors.collect(cdk.propertyValidator('detectorId', cdk.validateString)(properties.detectorId));
    errors.collect(cdk.propertyValidator('format', cdk.requiredValidator)(properties.format));
    errors.collect(cdk.propertyValidator('format', cdk.validateString)(properties.format));
    errors.collect(cdk.propertyValidator('location', cdk.requiredValidator)(properties.location));
    errors.collect(cdk.propertyValidator('location', cdk.validateString)(properties.location));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "CfnThreatIntelSetProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::GuardDuty::ThreatIntelSet` resource
 *
 * @param properties - the TypeScript properties of a `CfnThreatIntelSetProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::GuardDuty::ThreatIntelSet` resource.
 */
// @ts-ignore TS6133
function cfnThreatIntelSetPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnThreatIntelSetPropsValidator(properties).assertSuccess();
    return {
        Activate: cdk.booleanToCloudFormation(properties.activate),
        DetectorId: cdk.stringToCloudFormation(properties.detectorId),
        Format: cdk.stringToCloudFormation(properties.format),
        Location: cdk.stringToCloudFormation(properties.location),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnThreatIntelSetPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnThreatIntelSetProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnThreatIntelSetProps>();
    ret.addPropertyResult('activate', 'Activate', cfn_parse.FromCloudFormation.getBoolean(properties.Activate));
    ret.addPropertyResult('detectorId', 'DetectorId', cfn_parse.FromCloudFormation.getString(properties.DetectorId));
    ret.addPropertyResult('format', 'Format', cfn_parse.FromCloudFormation.getString(properties.Format));
    ret.addPropertyResult('location', 'Location', cfn_parse.FromCloudFormation.getString(properties.Location));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::GuardDuty::ThreatIntelSet`
 *
 * The `AWS::GuardDuty::ThreatIntelSet` resource specifies a new `ThreatIntelSet` . A `ThreatIntelSet` consists of known malicious IP addresses.  generates findings based on the `ThreatIntelSet` when it is activated.
 *
 * @cloudformationResource AWS::GuardDuty::ThreatIntelSet
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-threatintelset.html
 */
export class CfnThreatIntelSet extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::GuardDuty::ThreatIntelSet";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnThreatIntelSet {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnThreatIntelSetPropsFromCloudFormation(resourceProperties);
        const ret = new CfnThreatIntelSet(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A Boolean value that indicates whether GuardDuty is to start using the uploaded ThreatIntelSet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-threatintelset.html#cfn-guardduty-threatintelset-activate
     */
    public activate: boolean | cdk.IResolvable;

    /**
     * The unique ID of the detector of the GuardDuty account that you want to create a threatIntelSet for.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-threatintelset.html#cfn-guardduty-threatintelset-detectorid
     */
    public detectorId: string;

    /**
     * The format of the file that contains the ThreatIntelSet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-threatintelset.html#cfn-guardduty-threatintelset-format
     */
    public format: string;

    /**
     * The URI of the file that contains the ThreatIntelSet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-threatintelset.html#cfn-guardduty-threatintelset-location
     */
    public location: string;

    /**
     * A user-friendly ThreatIntelSet name displayed in all findings that are generated by activity that involves IP addresses included in this ThreatIntelSet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-threatintelset.html#cfn-guardduty-threatintelset-name
     */
    public name: string | undefined;

    /**
     * Create a new `AWS::GuardDuty::ThreatIntelSet`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnThreatIntelSetProps) {
        super(scope, id, { type: CfnThreatIntelSet.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'activate', this);
        cdk.requireProperty(props, 'detectorId', this);
        cdk.requireProperty(props, 'format', this);
        cdk.requireProperty(props, 'location', this);

        this.activate = props.activate;
        this.detectorId = props.detectorId;
        this.format = props.format;
        this.location = props.location;
        this.name = props.name;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnThreatIntelSet.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            activate: this.activate,
            detectorId: this.detectorId,
            format: this.format,
            location: this.location,
            name: this.name,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnThreatIntelSetPropsToCloudFormation(props);
    }
}
