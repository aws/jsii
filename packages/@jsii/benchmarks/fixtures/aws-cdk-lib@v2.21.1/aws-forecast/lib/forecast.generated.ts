// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:08.418Z","fingerprint":"Y+Bi42cEJfUKR5xn3qIyjZzjuKxZ7ZJctDkE3FOB7no="}

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
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html
 */
export interface CfnDatasetProps {

    /**
     * `AWS::Forecast::Dataset.DatasetName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html#cfn-forecast-dataset-datasetname
     */
    readonly datasetName: string;

    /**
     * `AWS::Forecast::Dataset.DatasetType`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html#cfn-forecast-dataset-datasettype
     */
    readonly datasetType: string;

    /**
     * `AWS::Forecast::Dataset.Domain`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html#cfn-forecast-dataset-domain
     */
    readonly domain: string;

    /**
     * `AWS::Forecast::Dataset.Schema`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html#cfn-forecast-dataset-schema
     */
    readonly schema: any | cdk.IResolvable;

    /**
     * `AWS::Forecast::Dataset.DataFrequency`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html#cfn-forecast-dataset-datafrequency
     */
    readonly dataFrequency?: string;

    /**
     * `AWS::Forecast::Dataset.EncryptionConfig`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html#cfn-forecast-dataset-encryptionconfig
     */
    readonly encryptionConfig?: any | cdk.IResolvable;

    /**
     * `AWS::Forecast::Dataset.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html#cfn-forecast-dataset-tags
     */
    readonly tags?: any[];
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
    errors.collect(cdk.propertyValidator('dataFrequency', cdk.validateString)(properties.dataFrequency));
    errors.collect(cdk.propertyValidator('datasetName', cdk.requiredValidator)(properties.datasetName));
    errors.collect(cdk.propertyValidator('datasetName', cdk.validateString)(properties.datasetName));
    errors.collect(cdk.propertyValidator('datasetType', cdk.requiredValidator)(properties.datasetType));
    errors.collect(cdk.propertyValidator('datasetType', cdk.validateString)(properties.datasetType));
    errors.collect(cdk.propertyValidator('domain', cdk.requiredValidator)(properties.domain));
    errors.collect(cdk.propertyValidator('domain', cdk.validateString)(properties.domain));
    errors.collect(cdk.propertyValidator('encryptionConfig', cdk.validateObject)(properties.encryptionConfig));
    errors.collect(cdk.propertyValidator('schema', cdk.requiredValidator)(properties.schema));
    errors.collect(cdk.propertyValidator('schema', cdk.validateObject)(properties.schema));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateObject))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnDatasetProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Forecast::Dataset` resource
 *
 * @param properties - the TypeScript properties of a `CfnDatasetProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Forecast::Dataset` resource.
 */
// @ts-ignore TS6133
function cfnDatasetPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDatasetPropsValidator(properties).assertSuccess();
    return {
        DatasetName: cdk.stringToCloudFormation(properties.datasetName),
        DatasetType: cdk.stringToCloudFormation(properties.datasetType),
        Domain: cdk.stringToCloudFormation(properties.domain),
        Schema: cdk.objectToCloudFormation(properties.schema),
        DataFrequency: cdk.stringToCloudFormation(properties.dataFrequency),
        EncryptionConfig: cdk.objectToCloudFormation(properties.encryptionConfig),
        Tags: cdk.listMapper(cdk.objectToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDatasetPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDatasetProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDatasetProps>();
    ret.addPropertyResult('datasetName', 'DatasetName', cfn_parse.FromCloudFormation.getString(properties.DatasetName));
    ret.addPropertyResult('datasetType', 'DatasetType', cfn_parse.FromCloudFormation.getString(properties.DatasetType));
    ret.addPropertyResult('domain', 'Domain', cfn_parse.FromCloudFormation.getString(properties.Domain));
    ret.addPropertyResult('schema', 'Schema', cfn_parse.FromCloudFormation.getAny(properties.Schema));
    ret.addPropertyResult('dataFrequency', 'DataFrequency', properties.DataFrequency != null ? cfn_parse.FromCloudFormation.getString(properties.DataFrequency) : undefined);
    ret.addPropertyResult('encryptionConfig', 'EncryptionConfig', properties.EncryptionConfig != null ? cfn_parse.FromCloudFormation.getAny(properties.EncryptionConfig) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getAny)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Forecast::Dataset`
 *
 *
 *
 * @cloudformationResource AWS::Forecast::Dataset
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html
 */
export class CfnDataset extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Forecast::Dataset";

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
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * `AWS::Forecast::Dataset.DatasetName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html#cfn-forecast-dataset-datasetname
     */
    public datasetName: string;

    /**
     * `AWS::Forecast::Dataset.DatasetType`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html#cfn-forecast-dataset-datasettype
     */
    public datasetType: string;

    /**
     * `AWS::Forecast::Dataset.Domain`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html#cfn-forecast-dataset-domain
     */
    public domain: string;

    /**
     * `AWS::Forecast::Dataset.Schema`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html#cfn-forecast-dataset-schema
     */
    public schema: any | cdk.IResolvable;

    /**
     * `AWS::Forecast::Dataset.DataFrequency`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html#cfn-forecast-dataset-datafrequency
     */
    public dataFrequency: string | undefined;

    /**
     * `AWS::Forecast::Dataset.EncryptionConfig`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html#cfn-forecast-dataset-encryptionconfig
     */
    public encryptionConfig: any | cdk.IResolvable | undefined;

    /**
     * `AWS::Forecast::Dataset.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-dataset.html#cfn-forecast-dataset-tags
     */
    public tags: any[] | undefined;

    /**
     * Create a new `AWS::Forecast::Dataset`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDatasetProps) {
        super(scope, id, { type: CfnDataset.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'datasetName', this);
        cdk.requireProperty(props, 'datasetType', this);
        cdk.requireProperty(props, 'domain', this);
        cdk.requireProperty(props, 'schema', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.datasetName = props.datasetName;
        this.datasetType = props.datasetType;
        this.domain = props.domain;
        this.schema = props.schema;
        this.dataFrequency = props.dataFrequency;
        this.encryptionConfig = props.encryptionConfig;
        this.tags = props.tags;
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
            datasetName: this.datasetName,
            datasetType: this.datasetType,
            domain: this.domain,
            schema: this.schema,
            dataFrequency: this.dataFrequency,
            encryptionConfig: this.encryptionConfig,
            tags: this.tags,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDatasetPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnDatasetGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-datasetgroup.html
 */
export interface CfnDatasetGroupProps {

    /**
     * `AWS::Forecast::DatasetGroup.DatasetGroupName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-datasetgroup.html#cfn-forecast-datasetgroup-datasetgroupname
     */
    readonly datasetGroupName: string;

    /**
     * `AWS::Forecast::DatasetGroup.Domain`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-datasetgroup.html#cfn-forecast-datasetgroup-domain
     */
    readonly domain: string;

    /**
     * `AWS::Forecast::DatasetGroup.DatasetArns`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-datasetgroup.html#cfn-forecast-datasetgroup-datasetarns
     */
    readonly datasetArns?: string[];

    /**
     * `AWS::Forecast::DatasetGroup.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-datasetgroup.html#cfn-forecast-datasetgroup-tags
     */
    readonly tags?: cdk.CfnTag[];
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
    errors.collect(cdk.propertyValidator('datasetArns', cdk.listValidator(cdk.validateString))(properties.datasetArns));
    errors.collect(cdk.propertyValidator('datasetGroupName', cdk.requiredValidator)(properties.datasetGroupName));
    errors.collect(cdk.propertyValidator('datasetGroupName', cdk.validateString)(properties.datasetGroupName));
    errors.collect(cdk.propertyValidator('domain', cdk.requiredValidator)(properties.domain));
    errors.collect(cdk.propertyValidator('domain', cdk.validateString)(properties.domain));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnDatasetGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Forecast::DatasetGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnDatasetGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Forecast::DatasetGroup` resource.
 */
// @ts-ignore TS6133
function cfnDatasetGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDatasetGroupPropsValidator(properties).assertSuccess();
    return {
        DatasetGroupName: cdk.stringToCloudFormation(properties.datasetGroupName),
        Domain: cdk.stringToCloudFormation(properties.domain),
        DatasetArns: cdk.listMapper(cdk.stringToCloudFormation)(properties.datasetArns),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDatasetGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDatasetGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDatasetGroupProps>();
    ret.addPropertyResult('datasetGroupName', 'DatasetGroupName', cfn_parse.FromCloudFormation.getString(properties.DatasetGroupName));
    ret.addPropertyResult('domain', 'Domain', cfn_parse.FromCloudFormation.getString(properties.Domain));
    ret.addPropertyResult('datasetArns', 'DatasetArns', properties.DatasetArns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.DatasetArns) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Forecast::DatasetGroup`
 *
 *
 *
 * @cloudformationResource AWS::Forecast::DatasetGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-datasetgroup.html
 */
export class CfnDatasetGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Forecast::DatasetGroup";

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
     * `AWS::Forecast::DatasetGroup.DatasetGroupName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-datasetgroup.html#cfn-forecast-datasetgroup-datasetgroupname
     */
    public datasetGroupName: string;

    /**
     * `AWS::Forecast::DatasetGroup.Domain`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-datasetgroup.html#cfn-forecast-datasetgroup-domain
     */
    public domain: string;

    /**
     * `AWS::Forecast::DatasetGroup.DatasetArns`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-datasetgroup.html#cfn-forecast-datasetgroup-datasetarns
     */
    public datasetArns: string[] | undefined;

    /**
     * `AWS::Forecast::DatasetGroup.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-forecast-datasetgroup.html#cfn-forecast-datasetgroup-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Forecast::DatasetGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDatasetGroupProps) {
        super(scope, id, { type: CfnDatasetGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'datasetGroupName', this);
        cdk.requireProperty(props, 'domain', this);
        this.attrDatasetGroupArn = cdk.Token.asString(this.getAtt('DatasetGroupArn'));

        this.datasetGroupName = props.datasetGroupName;
        this.domain = props.domain;
        this.datasetArns = props.datasetArns;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Forecast::DatasetGroup", props.tags, { tagPropertyName: 'tags' });
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
            datasetGroupName: this.datasetGroupName,
            domain: this.domain,
            datasetArns: this.datasetArns,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDatasetGroupPropsToCloudFormation(props);
    }
}
