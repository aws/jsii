// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.582Z","fingerprint":"fOEBlBRjgThwUfRdcAGetv3G0+kKQOQc4H29HlWJf1w="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnDataset`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html
 */
export interface CfnDatasetProps {

    /**
     * `AWS::Personalize::Dataset.DatasetGroupArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html#cfn-personalize-dataset-datasetgrouparn
     */
    readonly datasetGroupArn: string;

    /**
     * `AWS::Personalize::Dataset.DatasetType`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html#cfn-personalize-dataset-datasettype
     */
    readonly datasetType: string;

    /**
     * `AWS::Personalize::Dataset.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html#cfn-personalize-dataset-name
     */
    readonly name: string;

    /**
     * `AWS::Personalize::Dataset.SchemaArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html#cfn-personalize-dataset-schemaarn
     */
    readonly schemaArn: string;

    /**
     * `AWS::Personalize::Dataset.DatasetImportJob`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html#cfn-personalize-dataset-datasetimportjob
     */
    readonly datasetImportJob?: CfnDataset.DatasetImportJobProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnDatasetProps`
 *
 * @param properties - the TypeScript properties of a `CfnDatasetProps`
 *
 * @returns the result of the validation.
 */
function CfnDatasetPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('datasetGroupArn', cdk.requiredValidator)(properties.datasetGroupArn));
    errors.collect(cdk.propertyValidator('datasetGroupArn', cdk.validateString)(properties.datasetGroupArn));
    errors.collect(cdk.propertyValidator('datasetImportJob', CfnDataset_DatasetImportJobPropertyValidator)(properties.datasetImportJob));
    errors.collect(cdk.propertyValidator('datasetType', cdk.requiredValidator)(properties.datasetType));
    errors.collect(cdk.propertyValidator('datasetType', cdk.validateString)(properties.datasetType));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('schemaArn', cdk.requiredValidator)(properties.schemaArn));
    errors.collect(cdk.propertyValidator('schemaArn', cdk.validateString)(properties.schemaArn));
    return errors.wrap('supplied properties not correct for "CfnDatasetProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Personalize::Dataset` resource
 *
 * @param properties - the TypeScript properties of a `CfnDatasetProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Personalize::Dataset` resource.
 */
// @ts-ignore TS6133
function cfnDatasetPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDatasetPropsValidator(properties).assertSuccess();
    return {
        DatasetGroupArn: cdk.stringToCloudFormation(properties.datasetGroupArn),
        DatasetType: cdk.stringToCloudFormation(properties.datasetType),
        Name: cdk.stringToCloudFormation(properties.name),
        SchemaArn: cdk.stringToCloudFormation(properties.schemaArn),
        DatasetImportJob: cfnDatasetDatasetImportJobPropertyToCloudFormation(properties.datasetImportJob),
    };
}

// @ts-ignore TS6133
function CfnDatasetPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDatasetProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDatasetProps>();
    ret.addPropertyResult('datasetGroupArn', 'DatasetGroupArn', cfn_parse.FromCloudFormation.getString(properties.DatasetGroupArn));
    ret.addPropertyResult('datasetType', 'DatasetType', cfn_parse.FromCloudFormation.getString(properties.DatasetType));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('schemaArn', 'SchemaArn', cfn_parse.FromCloudFormation.getString(properties.SchemaArn));
    ret.addPropertyResult('datasetImportJob', 'DatasetImportJob', properties.DatasetImportJob != null ? CfnDatasetDatasetImportJobPropertyFromCloudFormation(properties.DatasetImportJob) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Personalize::Dataset`
 *
 *
 *
 * @cloudformationResource AWS::Personalize::Dataset
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html
 */
export class CfnDataset extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Personalize::Dataset";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDataset {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDatasetPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDataset(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     *
     * @cloudformationAttribute DatasetArn
     */
    public readonly attrDatasetArn: string;

    /**
     * `AWS::Personalize::Dataset.DatasetGroupArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html#cfn-personalize-dataset-datasetgrouparn
     */
    public datasetGroupArn: string;

    /**
     * `AWS::Personalize::Dataset.DatasetType`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html#cfn-personalize-dataset-datasettype
     */
    public datasetType: string;

    /**
     * `AWS::Personalize::Dataset.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html#cfn-personalize-dataset-name
     */
    public name: string;

    /**
     * `AWS::Personalize::Dataset.SchemaArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html#cfn-personalize-dataset-schemaarn
     */
    public schemaArn: string;

    /**
     * `AWS::Personalize::Dataset.DatasetImportJob`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-dataset.html#cfn-personalize-dataset-datasetimportjob
     */
    public datasetImportJob: CfnDataset.DatasetImportJobProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::Personalize::Dataset`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDatasetProps) {
        super(scope, id, { type: CfnDataset.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'datasetGroupArn', this);
        cdk.requireProperty(props, 'datasetType', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'schemaArn', this);
        this.attrDatasetArn = cdk.Token.asString(this.getAtt('DatasetArn'));

        this.datasetGroupArn = props.datasetGroupArn;
        this.datasetType = props.datasetType;
        this.name = props.name;
        this.schemaArn = props.schemaArn;
        this.datasetImportJob = props.datasetImportJob;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDataset.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            datasetGroupArn: this.datasetGroupArn,
            datasetType: this.datasetType,
            name: this.name,
            schemaArn: this.schemaArn,
            datasetImportJob: this.datasetImportJob,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDatasetPropsToCloudFormation(props);
    }
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-personalize-dataset-datasetimportjob.html
     */
    export interface DatasetImportJobProperty {
        /**
         * `CfnDataset.DatasetImportJobProperty.DataSource`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-personalize-dataset-datasetimportjob.html#cfn-personalize-dataset-datasetimportjob-datasource
         */
        readonly dataSource?: any | cdk.IResolvable;
        /**
         * `CfnDataset.DatasetImportJobProperty.DatasetArn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-personalize-dataset-datasetimportjob.html#cfn-personalize-dataset-datasetimportjob-datasetarn
         */
        readonly datasetArn?: string;
        /**
         * `CfnDataset.DatasetImportJobProperty.DatasetImportJobArn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-personalize-dataset-datasetimportjob.html#cfn-personalize-dataset-datasetimportjob-datasetimportjobarn
         */
        readonly datasetImportJobArn?: string;
        /**
         * `CfnDataset.DatasetImportJobProperty.JobName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-personalize-dataset-datasetimportjob.html#cfn-personalize-dataset-datasetimportjob-jobname
         */
        readonly jobName?: string;
        /**
         * `CfnDataset.DatasetImportJobProperty.RoleArn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-personalize-dataset-datasetimportjob.html#cfn-personalize-dataset-datasetimportjob-rolearn
         */
        readonly roleArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DatasetImportJobProperty`
 *
 * @param properties - the TypeScript properties of a `DatasetImportJobProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_DatasetImportJobPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataSource', cdk.validateObject)(properties.dataSource));
    errors.collect(cdk.propertyValidator('datasetArn', cdk.validateString)(properties.datasetArn));
    errors.collect(cdk.propertyValidator('datasetImportJobArn', cdk.validateString)(properties.datasetImportJobArn));
    errors.collect(cdk.propertyValidator('jobName', cdk.validateString)(properties.jobName));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "DatasetImportJobProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Personalize::Dataset.DatasetImportJob` resource
 *
 * @param properties - the TypeScript properties of a `DatasetImportJobProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Personalize::Dataset.DatasetImportJob` resource.
 */
// @ts-ignore TS6133
function cfnDatasetDatasetImportJobPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_DatasetImportJobPropertyValidator(properties).assertSuccess();
    return {
        DataSource: cdk.objectToCloudFormation(properties.dataSource),
        DatasetArn: cdk.stringToCloudFormation(properties.datasetArn),
        DatasetImportJobArn: cdk.stringToCloudFormation(properties.datasetImportJobArn),
        JobName: cdk.stringToCloudFormation(properties.jobName),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnDatasetDatasetImportJobPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.DatasetImportJobProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.DatasetImportJobProperty>();
    ret.addPropertyResult('dataSource', 'DataSource', properties.DataSource != null ? cfn_parse.FromCloudFormation.getAny(properties.DataSource) : undefined);
    ret.addPropertyResult('datasetArn', 'DatasetArn', properties.DatasetArn != null ? cfn_parse.FromCloudFormation.getString(properties.DatasetArn) : undefined);
    ret.addPropertyResult('datasetImportJobArn', 'DatasetImportJobArn', properties.DatasetImportJobArn != null ? cfn_parse.FromCloudFormation.getString(properties.DatasetImportJobArn) : undefined);
    ret.addPropertyResult('jobName', 'JobName', properties.JobName != null ? cfn_parse.FromCloudFormation.getString(properties.JobName) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', properties.RoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.RoleArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDatasetGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-datasetgroup.html
 */
export interface CfnDatasetGroupProps {

    /**
     * `AWS::Personalize::DatasetGroup.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-datasetgroup.html#cfn-personalize-datasetgroup-name
     */
    readonly name: string;

    /**
     * `AWS::Personalize::DatasetGroup.Domain`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-datasetgroup.html#cfn-personalize-datasetgroup-domain
     */
    readonly domain?: string;

    /**
     * `AWS::Personalize::DatasetGroup.KmsKeyArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-datasetgroup.html#cfn-personalize-datasetgroup-kmskeyarn
     */
    readonly kmsKeyArn?: string;

    /**
     * `AWS::Personalize::DatasetGroup.RoleArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-datasetgroup.html#cfn-personalize-datasetgroup-rolearn
     */
    readonly roleArn?: string;
}

/**
 * Determine whether the given properties match those of a `CfnDatasetGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnDatasetGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnDatasetGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('domain', cdk.validateString)(properties.domain));
    errors.collect(cdk.propertyValidator('kmsKeyArn', cdk.validateString)(properties.kmsKeyArn));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "CfnDatasetGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Personalize::DatasetGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnDatasetGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Personalize::DatasetGroup` resource.
 */
// @ts-ignore TS6133
function cfnDatasetGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDatasetGroupPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Domain: cdk.stringToCloudFormation(properties.domain),
        KmsKeyArn: cdk.stringToCloudFormation(properties.kmsKeyArn),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnDatasetGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDatasetGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDatasetGroupProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('domain', 'Domain', properties.Domain != null ? cfn_parse.FromCloudFormation.getString(properties.Domain) : undefined);
    ret.addPropertyResult('kmsKeyArn', 'KmsKeyArn', properties.KmsKeyArn != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyArn) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', properties.RoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.RoleArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Personalize::DatasetGroup`
 *
 *
 *
 * @cloudformationResource AWS::Personalize::DatasetGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-datasetgroup.html
 */
export class CfnDatasetGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Personalize::DatasetGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDatasetGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDatasetGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDatasetGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     *
     * @cloudformationAttribute DatasetGroupArn
     */
    public readonly attrDatasetGroupArn: string;

    /**
     * `AWS::Personalize::DatasetGroup.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-datasetgroup.html#cfn-personalize-datasetgroup-name
     */
    public name: string;

    /**
     * `AWS::Personalize::DatasetGroup.Domain`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-datasetgroup.html#cfn-personalize-datasetgroup-domain
     */
    public domain: string | undefined;

    /**
     * `AWS::Personalize::DatasetGroup.KmsKeyArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-datasetgroup.html#cfn-personalize-datasetgroup-kmskeyarn
     */
    public kmsKeyArn: string | undefined;

    /**
     * `AWS::Personalize::DatasetGroup.RoleArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-datasetgroup.html#cfn-personalize-datasetgroup-rolearn
     */
    public roleArn: string | undefined;

    /**
     * Create a new `AWS::Personalize::DatasetGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDatasetGroupProps) {
        super(scope, id, { type: CfnDatasetGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        this.attrDatasetGroupArn = cdk.Token.asString(this.getAtt('DatasetGroupArn'));

        this.name = props.name;
        this.domain = props.domain;
        this.kmsKeyArn = props.kmsKeyArn;
        this.roleArn = props.roleArn;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDatasetGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            domain: this.domain,
            kmsKeyArn: this.kmsKeyArn,
            roleArn: this.roleArn,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDatasetGroupPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnSchema`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-schema.html
 */
export interface CfnSchemaProps {

    /**
     * `AWS::Personalize::Schema.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-schema.html#cfn-personalize-schema-name
     */
    readonly name: string;

    /**
     * `AWS::Personalize::Schema.Schema`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-schema.html#cfn-personalize-schema-schema
     */
    readonly schema: string;

    /**
     * `AWS::Personalize::Schema.Domain`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-schema.html#cfn-personalize-schema-domain
     */
    readonly domain?: string;
}

/**
 * Determine whether the given properties match those of a `CfnSchemaProps`
 *
 * @param properties - the TypeScript properties of a `CfnSchemaProps`
 *
 * @returns the result of the validation.
 */
function CfnSchemaPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('domain', cdk.validateString)(properties.domain));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('schema', cdk.requiredValidator)(properties.schema));
    errors.collect(cdk.propertyValidator('schema', cdk.validateString)(properties.schema));
    return errors.wrap('supplied properties not correct for "CfnSchemaProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Personalize::Schema` resource
 *
 * @param properties - the TypeScript properties of a `CfnSchemaProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Personalize::Schema` resource.
 */
// @ts-ignore TS6133
function cfnSchemaPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSchemaPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Schema: cdk.stringToCloudFormation(properties.schema),
        Domain: cdk.stringToCloudFormation(properties.domain),
    };
}

// @ts-ignore TS6133
function CfnSchemaPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSchemaProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSchemaProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('schema', 'Schema', cfn_parse.FromCloudFormation.getString(properties.Schema));
    ret.addPropertyResult('domain', 'Domain', properties.Domain != null ? cfn_parse.FromCloudFormation.getString(properties.Domain) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Personalize::Schema`
 *
 *
 *
 * @cloudformationResource AWS::Personalize::Schema
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-schema.html
 */
export class CfnSchema extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Personalize::Schema";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnSchema {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnSchemaPropsFromCloudFormation(resourceProperties);
        const ret = new CfnSchema(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     *
     * @cloudformationAttribute SchemaArn
     */
    public readonly attrSchemaArn: string;

    /**
     * `AWS::Personalize::Schema.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-schema.html#cfn-personalize-schema-name
     */
    public name: string;

    /**
     * `AWS::Personalize::Schema.Schema`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-schema.html#cfn-personalize-schema-schema
     */
    public schema: string;

    /**
     * `AWS::Personalize::Schema.Domain`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-schema.html#cfn-personalize-schema-domain
     */
    public domain: string | undefined;

    /**
     * Create a new `AWS::Personalize::Schema`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnSchemaProps) {
        super(scope, id, { type: CfnSchema.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'schema', this);
        this.attrSchemaArn = cdk.Token.asString(this.getAtt('SchemaArn'));

        this.name = props.name;
        this.schema = props.schema;
        this.domain = props.domain;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnSchema.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            schema: this.schema,
            domain: this.domain,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnSchemaPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnSolution`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html
 */
export interface CfnSolutionProps {

    /**
     * `AWS::Personalize::Solution.DatasetGroupArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html#cfn-personalize-solution-datasetgrouparn
     */
    readonly datasetGroupArn: string;

    /**
     * `AWS::Personalize::Solution.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html#cfn-personalize-solution-name
     */
    readonly name: string;

    /**
     * `AWS::Personalize::Solution.EventType`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html#cfn-personalize-solution-eventtype
     */
    readonly eventType?: string;

    /**
     * `AWS::Personalize::Solution.PerformAutoML`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html#cfn-personalize-solution-performautoml
     */
    readonly performAutoMl?: boolean | cdk.IResolvable;

    /**
     * `AWS::Personalize::Solution.PerformHPO`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html#cfn-personalize-solution-performhpo
     */
    readonly performHpo?: boolean | cdk.IResolvable;

    /**
     * `AWS::Personalize::Solution.RecipeArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html#cfn-personalize-solution-recipearn
     */
    readonly recipeArn?: string;

    /**
     * `AWS::Personalize::Solution.SolutionConfig`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html#cfn-personalize-solution-solutionconfig
     */
    readonly solutionConfig?: CfnSolution.SolutionConfigProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnSolutionProps`
 *
 * @param properties - the TypeScript properties of a `CfnSolutionProps`
 *
 * @returns the result of the validation.
 */
function CfnSolutionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('datasetGroupArn', cdk.requiredValidator)(properties.datasetGroupArn));
    errors.collect(cdk.propertyValidator('datasetGroupArn', cdk.validateString)(properties.datasetGroupArn));
    errors.collect(cdk.propertyValidator('eventType', cdk.validateString)(properties.eventType));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('performAutoMl', cdk.validateBoolean)(properties.performAutoMl));
    errors.collect(cdk.propertyValidator('performHpo', cdk.validateBoolean)(properties.performHpo));
    errors.collect(cdk.propertyValidator('recipeArn', cdk.validateString)(properties.recipeArn));
    errors.collect(cdk.propertyValidator('solutionConfig', CfnSolution_SolutionConfigPropertyValidator)(properties.solutionConfig));
    return errors.wrap('supplied properties not correct for "CfnSolutionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Personalize::Solution` resource
 *
 * @param properties - the TypeScript properties of a `CfnSolutionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Personalize::Solution` resource.
 */
// @ts-ignore TS6133
function cfnSolutionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSolutionPropsValidator(properties).assertSuccess();
    return {
        DatasetGroupArn: cdk.stringToCloudFormation(properties.datasetGroupArn),
        Name: cdk.stringToCloudFormation(properties.name),
        EventType: cdk.stringToCloudFormation(properties.eventType),
        PerformAutoML: cdk.booleanToCloudFormation(properties.performAutoMl),
        PerformHPO: cdk.booleanToCloudFormation(properties.performHpo),
        RecipeArn: cdk.stringToCloudFormation(properties.recipeArn),
        SolutionConfig: cfnSolutionSolutionConfigPropertyToCloudFormation(properties.solutionConfig),
    };
}

// @ts-ignore TS6133
function CfnSolutionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSolutionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSolutionProps>();
    ret.addPropertyResult('datasetGroupArn', 'DatasetGroupArn', cfn_parse.FromCloudFormation.getString(properties.DatasetGroupArn));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('eventType', 'EventType', properties.EventType != null ? cfn_parse.FromCloudFormation.getString(properties.EventType) : undefined);
    ret.addPropertyResult('performAutoMl', 'PerformAutoML', properties.PerformAutoML != null ? cfn_parse.FromCloudFormation.getBoolean(properties.PerformAutoML) : undefined);
    ret.addPropertyResult('performHpo', 'PerformHPO', properties.PerformHPO != null ? cfn_parse.FromCloudFormation.getBoolean(properties.PerformHPO) : undefined);
    ret.addPropertyResult('recipeArn', 'RecipeArn', properties.RecipeArn != null ? cfn_parse.FromCloudFormation.getString(properties.RecipeArn) : undefined);
    ret.addPropertyResult('solutionConfig', 'SolutionConfig', properties.SolutionConfig != null ? CfnSolutionSolutionConfigPropertyFromCloudFormation(properties.SolutionConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Personalize::Solution`
 *
 *
 *
 * @cloudformationResource AWS::Personalize::Solution
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html
 */
export class CfnSolution extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Personalize::Solution";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnSolution {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnSolutionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnSolution(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     *
     * @cloudformationAttribute SolutionArn
     */
    public readonly attrSolutionArn: string;

    /**
     * `AWS::Personalize::Solution.DatasetGroupArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html#cfn-personalize-solution-datasetgrouparn
     */
    public datasetGroupArn: string;

    /**
     * `AWS::Personalize::Solution.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html#cfn-personalize-solution-name
     */
    public name: string;

    /**
     * `AWS::Personalize::Solution.EventType`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html#cfn-personalize-solution-eventtype
     */
    public eventType: string | undefined;

    /**
     * `AWS::Personalize::Solution.PerformAutoML`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html#cfn-personalize-solution-performautoml
     */
    public performAutoMl: boolean | cdk.IResolvable | undefined;

    /**
     * `AWS::Personalize::Solution.PerformHPO`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html#cfn-personalize-solution-performhpo
     */
    public performHpo: boolean | cdk.IResolvable | undefined;

    /**
     * `AWS::Personalize::Solution.RecipeArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html#cfn-personalize-solution-recipearn
     */
    public recipeArn: string | undefined;

    /**
     * `AWS::Personalize::Solution.SolutionConfig`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-solution.html#cfn-personalize-solution-solutionconfig
     */
    public solutionConfig: CfnSolution.SolutionConfigProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::Personalize::Solution`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnSolutionProps) {
        super(scope, id, { type: CfnSolution.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'datasetGroupArn', this);
        cdk.requireProperty(props, 'name', this);
        this.attrSolutionArn = cdk.Token.asString(this.getAtt('SolutionArn'));

        this.datasetGroupArn = props.datasetGroupArn;
        this.name = props.name;
        this.eventType = props.eventType;
        this.performAutoMl = props.performAutoMl;
        this.performHpo = props.performHpo;
        this.recipeArn = props.recipeArn;
        this.solutionConfig = props.solutionConfig;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnSolution.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            datasetGroupArn: this.datasetGroupArn,
            name: this.name,
            eventType: this.eventType,
            performAutoMl: this.performAutoMl,
            performHpo: this.performHpo,
            recipeArn: this.recipeArn,
            solutionConfig: this.solutionConfig,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnSolutionPropsToCloudFormation(props);
    }
}

export namespace CfnSolution {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-personalize-solution-solutionconfig.html
     */
    export interface SolutionConfigProperty {
        /**
         * `CfnSolution.SolutionConfigProperty.AlgorithmHyperParameters`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-personalize-solution-solutionconfig.html#cfn-personalize-solution-solutionconfig-algorithmhyperparameters
         */
        readonly algorithmHyperParameters?: { [key: string]: (string) } | cdk.IResolvable;
        /**
         * `CfnSolution.SolutionConfigProperty.AutoMLConfig`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-personalize-solution-solutionconfig.html#cfn-personalize-solution-solutionconfig-automlconfig
         */
        readonly autoMlConfig?: any | cdk.IResolvable;
        /**
         * `CfnSolution.SolutionConfigProperty.EventValueThreshold`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-personalize-solution-solutionconfig.html#cfn-personalize-solution-solutionconfig-eventvaluethreshold
         */
        readonly eventValueThreshold?: string;
        /**
         * `CfnSolution.SolutionConfigProperty.FeatureTransformationParameters`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-personalize-solution-solutionconfig.html#cfn-personalize-solution-solutionconfig-featuretransformationparameters
         */
        readonly featureTransformationParameters?: { [key: string]: (string) } | cdk.IResolvable;
        /**
         * `CfnSolution.SolutionConfigProperty.HpoConfig`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-personalize-solution-solutionconfig.html#cfn-personalize-solution-solutionconfig-hpoconfig
         */
        readonly hpoConfig?: any | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SolutionConfigProperty`
 *
 * @param properties - the TypeScript properties of a `SolutionConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnSolution_SolutionConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('algorithmHyperParameters', cdk.hashValidator(cdk.validateString))(properties.algorithmHyperParameters));
    errors.collect(cdk.propertyValidator('autoMlConfig', cdk.validateObject)(properties.autoMlConfig));
    errors.collect(cdk.propertyValidator('eventValueThreshold', cdk.validateString)(properties.eventValueThreshold));
    errors.collect(cdk.propertyValidator('featureTransformationParameters', cdk.hashValidator(cdk.validateString))(properties.featureTransformationParameters));
    errors.collect(cdk.propertyValidator('hpoConfig', cdk.validateObject)(properties.hpoConfig));
    return errors.wrap('supplied properties not correct for "SolutionConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Personalize::Solution.SolutionConfig` resource
 *
 * @param properties - the TypeScript properties of a `SolutionConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Personalize::Solution.SolutionConfig` resource.
 */
// @ts-ignore TS6133
function cfnSolutionSolutionConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSolution_SolutionConfigPropertyValidator(properties).assertSuccess();
    return {
        AlgorithmHyperParameters: cdk.hashMapper(cdk.stringToCloudFormation)(properties.algorithmHyperParameters),
        AutoMLConfig: cdk.objectToCloudFormation(properties.autoMlConfig),
        EventValueThreshold: cdk.stringToCloudFormation(properties.eventValueThreshold),
        FeatureTransformationParameters: cdk.hashMapper(cdk.stringToCloudFormation)(properties.featureTransformationParameters),
        HpoConfig: cdk.objectToCloudFormation(properties.hpoConfig),
    };
}

// @ts-ignore TS6133
function CfnSolutionSolutionConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSolution.SolutionConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSolution.SolutionConfigProperty>();
    ret.addPropertyResult('algorithmHyperParameters', 'AlgorithmHyperParameters', properties.AlgorithmHyperParameters != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.AlgorithmHyperParameters) : undefined);
    ret.addPropertyResult('autoMlConfig', 'AutoMLConfig', properties.AutoMLConfig != null ? cfn_parse.FromCloudFormation.getAny(properties.AutoMLConfig) : undefined);
    ret.addPropertyResult('eventValueThreshold', 'EventValueThreshold', properties.EventValueThreshold != null ? cfn_parse.FromCloudFormation.getString(properties.EventValueThreshold) : undefined);
    ret.addPropertyResult('featureTransformationParameters', 'FeatureTransformationParameters', properties.FeatureTransformationParameters != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.FeatureTransformationParameters) : undefined);
    ret.addPropertyResult('hpoConfig', 'HpoConfig', properties.HpoConfig != null ? cfn_parse.FromCloudFormation.getAny(properties.HpoConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
