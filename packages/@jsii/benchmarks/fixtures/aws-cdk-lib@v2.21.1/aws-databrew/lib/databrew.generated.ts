// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:07.479Z","fingerprint":"izldvy2XDoZd8YYKC0d/TwQB056xUiUpMESyU9+9Tp4="}

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
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html
 */
export interface CfnDatasetProps {

    /**
     * `AWS::DataBrew::Dataset.Input`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html#cfn-databrew-dataset-input
     */
    readonly input: CfnDataset.InputProperty | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Dataset.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html#cfn-databrew-dataset-name
     */
    readonly name: string;

    /**
     * `AWS::DataBrew::Dataset.Format`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html#cfn-databrew-dataset-format
     */
    readonly format?: string;

    /**
     * `AWS::DataBrew::Dataset.FormatOptions`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html#cfn-databrew-dataset-formatoptions
     */
    readonly formatOptions?: CfnDataset.FormatOptionsProperty | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Dataset.PathOptions`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html#cfn-databrew-dataset-pathoptions
     */
    readonly pathOptions?: CfnDataset.PathOptionsProperty | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Dataset.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html#cfn-databrew-dataset-tags
     */
    readonly tags?: cdk.CfnTag[];
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
    errors.collect(cdk.propertyValidator('format', cdk.validateString)(properties.format));
    errors.collect(cdk.propertyValidator('formatOptions', CfnDataset_FormatOptionsPropertyValidator)(properties.formatOptions));
    errors.collect(cdk.propertyValidator('input', cdk.requiredValidator)(properties.input));
    errors.collect(cdk.propertyValidator('input', CfnDataset_InputPropertyValidator)(properties.input));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('pathOptions', CfnDataset_PathOptionsPropertyValidator)(properties.pathOptions));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnDatasetProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset` resource
 *
 * @param properties - the TypeScript properties of a `CfnDatasetProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset` resource.
 */
// @ts-ignore TS6133
function cfnDatasetPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDatasetPropsValidator(properties).assertSuccess();
    return {
        Input: cfnDatasetInputPropertyToCloudFormation(properties.input),
        Name: cdk.stringToCloudFormation(properties.name),
        Format: cdk.stringToCloudFormation(properties.format),
        FormatOptions: cfnDatasetFormatOptionsPropertyToCloudFormation(properties.formatOptions),
        PathOptions: cfnDatasetPathOptionsPropertyToCloudFormation(properties.pathOptions),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDatasetPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDatasetProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDatasetProps>();
    ret.addPropertyResult('input', 'Input', CfnDatasetInputPropertyFromCloudFormation(properties.Input));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('format', 'Format', properties.Format != null ? cfn_parse.FromCloudFormation.getString(properties.Format) : undefined);
    ret.addPropertyResult('formatOptions', 'FormatOptions', properties.FormatOptions != null ? CfnDatasetFormatOptionsPropertyFromCloudFormation(properties.FormatOptions) : undefined);
    ret.addPropertyResult('pathOptions', 'PathOptions', properties.PathOptions != null ? CfnDatasetPathOptionsPropertyFromCloudFormation(properties.PathOptions) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::DataBrew::Dataset`
 *
 *
 *
 * @cloudformationResource AWS::DataBrew::Dataset
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html
 */
export class CfnDataset extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::DataBrew::Dataset";

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
     * `AWS::DataBrew::Dataset.Input`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html#cfn-databrew-dataset-input
     */
    public input: CfnDataset.InputProperty | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Dataset.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html#cfn-databrew-dataset-name
     */
    public name: string;

    /**
     * `AWS::DataBrew::Dataset.Format`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html#cfn-databrew-dataset-format
     */
    public format: string | undefined;

    /**
     * `AWS::DataBrew::Dataset.FormatOptions`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html#cfn-databrew-dataset-formatoptions
     */
    public formatOptions: CfnDataset.FormatOptionsProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::DataBrew::Dataset.PathOptions`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html#cfn-databrew-dataset-pathoptions
     */
    public pathOptions: CfnDataset.PathOptionsProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::DataBrew::Dataset.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-dataset.html#cfn-databrew-dataset-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::DataBrew::Dataset`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDatasetProps) {
        super(scope, id, { type: CfnDataset.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'input', this);
        cdk.requireProperty(props, 'name', this);

        this.input = props.input;
        this.name = props.name;
        this.format = props.format;
        this.formatOptions = props.formatOptions;
        this.pathOptions = props.pathOptions;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::DataBrew::Dataset", props.tags, { tagPropertyName: 'tags' });
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
            input: this.input,
            name: this.name,
            format: this.format,
            formatOptions: this.formatOptions,
            pathOptions: this.pathOptions,
            tags: this.tags.renderTags(),
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
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-csvoptions.html
     */
    export interface CsvOptionsProperty {
        /**
         * `CfnDataset.CsvOptionsProperty.Delimiter`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-csvoptions.html#cfn-databrew-dataset-csvoptions-delimiter
         */
        readonly delimiter?: string;
        /**
         * `CfnDataset.CsvOptionsProperty.HeaderRow`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-csvoptions.html#cfn-databrew-dataset-csvoptions-headerrow
         */
        readonly headerRow?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `CsvOptionsProperty`
 *
 * @param properties - the TypeScript properties of a `CsvOptionsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_CsvOptionsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('delimiter', cdk.validateString)(properties.delimiter));
    errors.collect(cdk.propertyValidator('headerRow', cdk.validateBoolean)(properties.headerRow));
    return errors.wrap('supplied properties not correct for "CsvOptionsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.CsvOptions` resource
 *
 * @param properties - the TypeScript properties of a `CsvOptionsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.CsvOptions` resource.
 */
// @ts-ignore TS6133
function cfnDatasetCsvOptionsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_CsvOptionsPropertyValidator(properties).assertSuccess();
    return {
        Delimiter: cdk.stringToCloudFormation(properties.delimiter),
        HeaderRow: cdk.booleanToCloudFormation(properties.headerRow),
    };
}

// @ts-ignore TS6133
function CfnDatasetCsvOptionsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.CsvOptionsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.CsvOptionsProperty>();
    ret.addPropertyResult('delimiter', 'Delimiter', properties.Delimiter != null ? cfn_parse.FromCloudFormation.getString(properties.Delimiter) : undefined);
    ret.addPropertyResult('headerRow', 'HeaderRow', properties.HeaderRow != null ? cfn_parse.FromCloudFormation.getBoolean(properties.HeaderRow) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datacataloginputdefinition.html
     */
    export interface DataCatalogInputDefinitionProperty {
        /**
         * `CfnDataset.DataCatalogInputDefinitionProperty.CatalogId`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datacataloginputdefinition.html#cfn-databrew-dataset-datacataloginputdefinition-catalogid
         */
        readonly catalogId?: string;
        /**
         * `CfnDataset.DataCatalogInputDefinitionProperty.DatabaseName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datacataloginputdefinition.html#cfn-databrew-dataset-datacataloginputdefinition-databasename
         */
        readonly databaseName?: string;
        /**
         * `CfnDataset.DataCatalogInputDefinitionProperty.TableName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datacataloginputdefinition.html#cfn-databrew-dataset-datacataloginputdefinition-tablename
         */
        readonly tableName?: string;
        /**
         * `CfnDataset.DataCatalogInputDefinitionProperty.TempDirectory`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datacataloginputdefinition.html#cfn-databrew-dataset-datacataloginputdefinition-tempdirectory
         */
        readonly tempDirectory?: CfnDataset.S3LocationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DataCatalogInputDefinitionProperty`
 *
 * @param properties - the TypeScript properties of a `DataCatalogInputDefinitionProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_DataCatalogInputDefinitionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    errors.collect(cdk.propertyValidator('tempDirectory', CfnDataset_S3LocationPropertyValidator)(properties.tempDirectory));
    return errors.wrap('supplied properties not correct for "DataCatalogInputDefinitionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.DataCatalogInputDefinition` resource
 *
 * @param properties - the TypeScript properties of a `DataCatalogInputDefinitionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.DataCatalogInputDefinition` resource.
 */
// @ts-ignore TS6133
function cfnDatasetDataCatalogInputDefinitionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_DataCatalogInputDefinitionPropertyValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
        TableName: cdk.stringToCloudFormation(properties.tableName),
        TempDirectory: cfnDatasetS3LocationPropertyToCloudFormation(properties.tempDirectory),
    };
}

// @ts-ignore TS6133
function CfnDatasetDataCatalogInputDefinitionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.DataCatalogInputDefinitionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.DataCatalogInputDefinitionProperty>();
    ret.addPropertyResult('catalogId', 'CatalogId', properties.CatalogId != null ? cfn_parse.FromCloudFormation.getString(properties.CatalogId) : undefined);
    ret.addPropertyResult('databaseName', 'DatabaseName', properties.DatabaseName != null ? cfn_parse.FromCloudFormation.getString(properties.DatabaseName) : undefined);
    ret.addPropertyResult('tableName', 'TableName', properties.TableName != null ? cfn_parse.FromCloudFormation.getString(properties.TableName) : undefined);
    ret.addPropertyResult('tempDirectory', 'TempDirectory', properties.TempDirectory != null ? CfnDatasetS3LocationPropertyFromCloudFormation(properties.TempDirectory) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-databaseinputdefinition.html
     */
    export interface DatabaseInputDefinitionProperty {
        /**
         * `CfnDataset.DatabaseInputDefinitionProperty.DatabaseTableName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-databaseinputdefinition.html#cfn-databrew-dataset-databaseinputdefinition-databasetablename
         */
        readonly databaseTableName?: string;
        /**
         * `CfnDataset.DatabaseInputDefinitionProperty.GlueConnectionName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-databaseinputdefinition.html#cfn-databrew-dataset-databaseinputdefinition-glueconnectionname
         */
        readonly glueConnectionName: string;
        /**
         * `CfnDataset.DatabaseInputDefinitionProperty.QueryString`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-databaseinputdefinition.html#cfn-databrew-dataset-databaseinputdefinition-querystring
         */
        readonly queryString?: string;
        /**
         * `CfnDataset.DatabaseInputDefinitionProperty.TempDirectory`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-databaseinputdefinition.html#cfn-databrew-dataset-databaseinputdefinition-tempdirectory
         */
        readonly tempDirectory?: CfnDataset.S3LocationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DatabaseInputDefinitionProperty`
 *
 * @param properties - the TypeScript properties of a `DatabaseInputDefinitionProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_DatabaseInputDefinitionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('databaseTableName', cdk.validateString)(properties.databaseTableName));
    errors.collect(cdk.propertyValidator('glueConnectionName', cdk.requiredValidator)(properties.glueConnectionName));
    errors.collect(cdk.propertyValidator('glueConnectionName', cdk.validateString)(properties.glueConnectionName));
    errors.collect(cdk.propertyValidator('queryString', cdk.validateString)(properties.queryString));
    errors.collect(cdk.propertyValidator('tempDirectory', CfnDataset_S3LocationPropertyValidator)(properties.tempDirectory));
    return errors.wrap('supplied properties not correct for "DatabaseInputDefinitionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.DatabaseInputDefinition` resource
 *
 * @param properties - the TypeScript properties of a `DatabaseInputDefinitionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.DatabaseInputDefinition` resource.
 */
// @ts-ignore TS6133
function cfnDatasetDatabaseInputDefinitionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_DatabaseInputDefinitionPropertyValidator(properties).assertSuccess();
    return {
        DatabaseTableName: cdk.stringToCloudFormation(properties.databaseTableName),
        GlueConnectionName: cdk.stringToCloudFormation(properties.glueConnectionName),
        QueryString: cdk.stringToCloudFormation(properties.queryString),
        TempDirectory: cfnDatasetS3LocationPropertyToCloudFormation(properties.tempDirectory),
    };
}

// @ts-ignore TS6133
function CfnDatasetDatabaseInputDefinitionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.DatabaseInputDefinitionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.DatabaseInputDefinitionProperty>();
    ret.addPropertyResult('databaseTableName', 'DatabaseTableName', properties.DatabaseTableName != null ? cfn_parse.FromCloudFormation.getString(properties.DatabaseTableName) : undefined);
    ret.addPropertyResult('glueConnectionName', 'GlueConnectionName', cfn_parse.FromCloudFormation.getString(properties.GlueConnectionName));
    ret.addPropertyResult('queryString', 'QueryString', properties.QueryString != null ? cfn_parse.FromCloudFormation.getString(properties.QueryString) : undefined);
    ret.addPropertyResult('tempDirectory', 'TempDirectory', properties.TempDirectory != null ? CfnDatasetS3LocationPropertyFromCloudFormation(properties.TempDirectory) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datasetparameter.html
     */
    export interface DatasetParameterProperty {
        /**
         * `CfnDataset.DatasetParameterProperty.CreateColumn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datasetparameter.html#cfn-databrew-dataset-datasetparameter-createcolumn
         */
        readonly createColumn?: boolean | cdk.IResolvable;
        /**
         * `CfnDataset.DatasetParameterProperty.DatetimeOptions`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datasetparameter.html#cfn-databrew-dataset-datasetparameter-datetimeoptions
         */
        readonly datetimeOptions?: CfnDataset.DatetimeOptionsProperty | cdk.IResolvable;
        /**
         * `CfnDataset.DatasetParameterProperty.Filter`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datasetparameter.html#cfn-databrew-dataset-datasetparameter-filter
         */
        readonly filter?: CfnDataset.FilterExpressionProperty | cdk.IResolvable;
        /**
         * `CfnDataset.DatasetParameterProperty.Name`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datasetparameter.html#cfn-databrew-dataset-datasetparameter-name
         */
        readonly name: string;
        /**
         * `CfnDataset.DatasetParameterProperty.Type`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datasetparameter.html#cfn-databrew-dataset-datasetparameter-type
         */
        readonly type: string;
    }
}

/**
 * Determine whether the given properties match those of a `DatasetParameterProperty`
 *
 * @param properties - the TypeScript properties of a `DatasetParameterProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_DatasetParameterPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('createColumn', cdk.validateBoolean)(properties.createColumn));
    errors.collect(cdk.propertyValidator('datetimeOptions', CfnDataset_DatetimeOptionsPropertyValidator)(properties.datetimeOptions));
    errors.collect(cdk.propertyValidator('filter', CfnDataset_FilterExpressionPropertyValidator)(properties.filter));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "DatasetParameterProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.DatasetParameter` resource
 *
 * @param properties - the TypeScript properties of a `DatasetParameterProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.DatasetParameter` resource.
 */
// @ts-ignore TS6133
function cfnDatasetDatasetParameterPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_DatasetParameterPropertyValidator(properties).assertSuccess();
    return {
        CreateColumn: cdk.booleanToCloudFormation(properties.createColumn),
        DatetimeOptions: cfnDatasetDatetimeOptionsPropertyToCloudFormation(properties.datetimeOptions),
        Filter: cfnDatasetFilterExpressionPropertyToCloudFormation(properties.filter),
        Name: cdk.stringToCloudFormation(properties.name),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnDatasetDatasetParameterPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.DatasetParameterProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.DatasetParameterProperty>();
    ret.addPropertyResult('createColumn', 'CreateColumn', properties.CreateColumn != null ? cfn_parse.FromCloudFormation.getBoolean(properties.CreateColumn) : undefined);
    ret.addPropertyResult('datetimeOptions', 'DatetimeOptions', properties.DatetimeOptions != null ? CfnDatasetDatetimeOptionsPropertyFromCloudFormation(properties.DatetimeOptions) : undefined);
    ret.addPropertyResult('filter', 'Filter', properties.Filter != null ? CfnDatasetFilterExpressionPropertyFromCloudFormation(properties.Filter) : undefined);
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datetimeoptions.html
     */
    export interface DatetimeOptionsProperty {
        /**
         * `CfnDataset.DatetimeOptionsProperty.Format`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datetimeoptions.html#cfn-databrew-dataset-datetimeoptions-format
         */
        readonly format: string;
        /**
         * `CfnDataset.DatetimeOptionsProperty.LocaleCode`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datetimeoptions.html#cfn-databrew-dataset-datetimeoptions-localecode
         */
        readonly localeCode?: string;
        /**
         * `CfnDataset.DatetimeOptionsProperty.TimezoneOffset`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-datetimeoptions.html#cfn-databrew-dataset-datetimeoptions-timezoneoffset
         */
        readonly timezoneOffset?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DatetimeOptionsProperty`
 *
 * @param properties - the TypeScript properties of a `DatetimeOptionsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_DatetimeOptionsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('format', cdk.requiredValidator)(properties.format));
    errors.collect(cdk.propertyValidator('format', cdk.validateString)(properties.format));
    errors.collect(cdk.propertyValidator('localeCode', cdk.validateString)(properties.localeCode));
    errors.collect(cdk.propertyValidator('timezoneOffset', cdk.validateString)(properties.timezoneOffset));
    return errors.wrap('supplied properties not correct for "DatetimeOptionsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.DatetimeOptions` resource
 *
 * @param properties - the TypeScript properties of a `DatetimeOptionsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.DatetimeOptions` resource.
 */
// @ts-ignore TS6133
function cfnDatasetDatetimeOptionsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_DatetimeOptionsPropertyValidator(properties).assertSuccess();
    return {
        Format: cdk.stringToCloudFormation(properties.format),
        LocaleCode: cdk.stringToCloudFormation(properties.localeCode),
        TimezoneOffset: cdk.stringToCloudFormation(properties.timezoneOffset),
    };
}

// @ts-ignore TS6133
function CfnDatasetDatetimeOptionsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.DatetimeOptionsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.DatetimeOptionsProperty>();
    ret.addPropertyResult('format', 'Format', cfn_parse.FromCloudFormation.getString(properties.Format));
    ret.addPropertyResult('localeCode', 'LocaleCode', properties.LocaleCode != null ? cfn_parse.FromCloudFormation.getString(properties.LocaleCode) : undefined);
    ret.addPropertyResult('timezoneOffset', 'TimezoneOffset', properties.TimezoneOffset != null ? cfn_parse.FromCloudFormation.getString(properties.TimezoneOffset) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-exceloptions.html
     */
    export interface ExcelOptionsProperty {
        /**
         * `CfnDataset.ExcelOptionsProperty.HeaderRow`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-exceloptions.html#cfn-databrew-dataset-exceloptions-headerrow
         */
        readonly headerRow?: boolean | cdk.IResolvable;
        /**
         * `CfnDataset.ExcelOptionsProperty.SheetIndexes`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-exceloptions.html#cfn-databrew-dataset-exceloptions-sheetindexes
         */
        readonly sheetIndexes?: number[] | cdk.IResolvable;
        /**
         * `CfnDataset.ExcelOptionsProperty.SheetNames`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-exceloptions.html#cfn-databrew-dataset-exceloptions-sheetnames
         */
        readonly sheetNames?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `ExcelOptionsProperty`
 *
 * @param properties - the TypeScript properties of a `ExcelOptionsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_ExcelOptionsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('headerRow', cdk.validateBoolean)(properties.headerRow));
    errors.collect(cdk.propertyValidator('sheetIndexes', cdk.listValidator(cdk.validateNumber))(properties.sheetIndexes));
    errors.collect(cdk.propertyValidator('sheetNames', cdk.listValidator(cdk.validateString))(properties.sheetNames));
    return errors.wrap('supplied properties not correct for "ExcelOptionsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.ExcelOptions` resource
 *
 * @param properties - the TypeScript properties of a `ExcelOptionsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.ExcelOptions` resource.
 */
// @ts-ignore TS6133
function cfnDatasetExcelOptionsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_ExcelOptionsPropertyValidator(properties).assertSuccess();
    return {
        HeaderRow: cdk.booleanToCloudFormation(properties.headerRow),
        SheetIndexes: cdk.listMapper(cdk.numberToCloudFormation)(properties.sheetIndexes),
        SheetNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.sheetNames),
    };
}

// @ts-ignore TS6133
function CfnDatasetExcelOptionsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.ExcelOptionsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.ExcelOptionsProperty>();
    ret.addPropertyResult('headerRow', 'HeaderRow', properties.HeaderRow != null ? cfn_parse.FromCloudFormation.getBoolean(properties.HeaderRow) : undefined);
    ret.addPropertyResult('sheetIndexes', 'SheetIndexes', properties.SheetIndexes != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getNumber)(properties.SheetIndexes) : undefined);
    ret.addPropertyResult('sheetNames', 'SheetNames', properties.SheetNames != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SheetNames) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-fileslimit.html
     */
    export interface FilesLimitProperty {
        /**
         * `CfnDataset.FilesLimitProperty.MaxFiles`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-fileslimit.html#cfn-databrew-dataset-fileslimit-maxfiles
         */
        readonly maxFiles: number;
        /**
         * `CfnDataset.FilesLimitProperty.Order`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-fileslimit.html#cfn-databrew-dataset-fileslimit-order
         */
        readonly order?: string;
        /**
         * `CfnDataset.FilesLimitProperty.OrderedBy`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-fileslimit.html#cfn-databrew-dataset-fileslimit-orderedby
         */
        readonly orderedBy?: string;
    }
}

/**
 * Determine whether the given properties match those of a `FilesLimitProperty`
 *
 * @param properties - the TypeScript properties of a `FilesLimitProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_FilesLimitPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('maxFiles', cdk.requiredValidator)(properties.maxFiles));
    errors.collect(cdk.propertyValidator('maxFiles', cdk.validateNumber)(properties.maxFiles));
    errors.collect(cdk.propertyValidator('order', cdk.validateString)(properties.order));
    errors.collect(cdk.propertyValidator('orderedBy', cdk.validateString)(properties.orderedBy));
    return errors.wrap('supplied properties not correct for "FilesLimitProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.FilesLimit` resource
 *
 * @param properties - the TypeScript properties of a `FilesLimitProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.FilesLimit` resource.
 */
// @ts-ignore TS6133
function cfnDatasetFilesLimitPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_FilesLimitPropertyValidator(properties).assertSuccess();
    return {
        MaxFiles: cdk.numberToCloudFormation(properties.maxFiles),
        Order: cdk.stringToCloudFormation(properties.order),
        OrderedBy: cdk.stringToCloudFormation(properties.orderedBy),
    };
}

// @ts-ignore TS6133
function CfnDatasetFilesLimitPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.FilesLimitProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.FilesLimitProperty>();
    ret.addPropertyResult('maxFiles', 'MaxFiles', cfn_parse.FromCloudFormation.getNumber(properties.MaxFiles));
    ret.addPropertyResult('order', 'Order', properties.Order != null ? cfn_parse.FromCloudFormation.getString(properties.Order) : undefined);
    ret.addPropertyResult('orderedBy', 'OrderedBy', properties.OrderedBy != null ? cfn_parse.FromCloudFormation.getString(properties.OrderedBy) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-filterexpression.html
     */
    export interface FilterExpressionProperty {
        /**
         * `CfnDataset.FilterExpressionProperty.Expression`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-filterexpression.html#cfn-databrew-dataset-filterexpression-expression
         */
        readonly expression: string;
        /**
         * `CfnDataset.FilterExpressionProperty.ValuesMap`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-filterexpression.html#cfn-databrew-dataset-filterexpression-valuesmap
         */
        readonly valuesMap: Array<CfnDataset.FilterValueProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `FilterExpressionProperty`
 *
 * @param properties - the TypeScript properties of a `FilterExpressionProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_FilterExpressionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('expression', cdk.requiredValidator)(properties.expression));
    errors.collect(cdk.propertyValidator('expression', cdk.validateString)(properties.expression));
    errors.collect(cdk.propertyValidator('valuesMap', cdk.requiredValidator)(properties.valuesMap));
    errors.collect(cdk.propertyValidator('valuesMap', cdk.listValidator(CfnDataset_FilterValuePropertyValidator))(properties.valuesMap));
    return errors.wrap('supplied properties not correct for "FilterExpressionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.FilterExpression` resource
 *
 * @param properties - the TypeScript properties of a `FilterExpressionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.FilterExpression` resource.
 */
// @ts-ignore TS6133
function cfnDatasetFilterExpressionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_FilterExpressionPropertyValidator(properties).assertSuccess();
    return {
        Expression: cdk.stringToCloudFormation(properties.expression),
        ValuesMap: cdk.listMapper(cfnDatasetFilterValuePropertyToCloudFormation)(properties.valuesMap),
    };
}

// @ts-ignore TS6133
function CfnDatasetFilterExpressionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.FilterExpressionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.FilterExpressionProperty>();
    ret.addPropertyResult('expression', 'Expression', cfn_parse.FromCloudFormation.getString(properties.Expression));
    ret.addPropertyResult('valuesMap', 'ValuesMap', cfn_parse.FromCloudFormation.getArray(CfnDatasetFilterValuePropertyFromCloudFormation)(properties.ValuesMap));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-filtervalue.html
     */
    export interface FilterValueProperty {
        /**
         * `CfnDataset.FilterValueProperty.Value`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-filtervalue.html#cfn-databrew-dataset-filtervalue-value
         */
        readonly value: string;
        /**
         * `CfnDataset.FilterValueProperty.ValueReference`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-filtervalue.html#cfn-databrew-dataset-filtervalue-valuereference
         */
        readonly valueReference: string;
    }
}

/**
 * Determine whether the given properties match those of a `FilterValueProperty`
 *
 * @param properties - the TypeScript properties of a `FilterValueProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_FilterValuePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    errors.collect(cdk.propertyValidator('valueReference', cdk.requiredValidator)(properties.valueReference));
    errors.collect(cdk.propertyValidator('valueReference', cdk.validateString)(properties.valueReference));
    return errors.wrap('supplied properties not correct for "FilterValueProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.FilterValue` resource
 *
 * @param properties - the TypeScript properties of a `FilterValueProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.FilterValue` resource.
 */
// @ts-ignore TS6133
function cfnDatasetFilterValuePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_FilterValuePropertyValidator(properties).assertSuccess();
    return {
        Value: cdk.stringToCloudFormation(properties.value),
        ValueReference: cdk.stringToCloudFormation(properties.valueReference),
    };
}

// @ts-ignore TS6133
function CfnDatasetFilterValuePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.FilterValueProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.FilterValueProperty>();
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addPropertyResult('valueReference', 'ValueReference', cfn_parse.FromCloudFormation.getString(properties.ValueReference));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-formatoptions.html
     */
    export interface FormatOptionsProperty {
        /**
         * `CfnDataset.FormatOptionsProperty.Csv`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-formatoptions.html#cfn-databrew-dataset-formatoptions-csv
         */
        readonly csv?: CfnDataset.CsvOptionsProperty | cdk.IResolvable;
        /**
         * `CfnDataset.FormatOptionsProperty.Excel`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-formatoptions.html#cfn-databrew-dataset-formatoptions-excel
         */
        readonly excel?: CfnDataset.ExcelOptionsProperty | cdk.IResolvable;
        /**
         * `CfnDataset.FormatOptionsProperty.Json`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-formatoptions.html#cfn-databrew-dataset-formatoptions-json
         */
        readonly json?: CfnDataset.JsonOptionsProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `FormatOptionsProperty`
 *
 * @param properties - the TypeScript properties of a `FormatOptionsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_FormatOptionsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('csv', CfnDataset_CsvOptionsPropertyValidator)(properties.csv));
    errors.collect(cdk.propertyValidator('excel', CfnDataset_ExcelOptionsPropertyValidator)(properties.excel));
    errors.collect(cdk.propertyValidator('json', CfnDataset_JsonOptionsPropertyValidator)(properties.json));
    return errors.wrap('supplied properties not correct for "FormatOptionsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.FormatOptions` resource
 *
 * @param properties - the TypeScript properties of a `FormatOptionsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.FormatOptions` resource.
 */
// @ts-ignore TS6133
function cfnDatasetFormatOptionsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_FormatOptionsPropertyValidator(properties).assertSuccess();
    return {
        Csv: cfnDatasetCsvOptionsPropertyToCloudFormation(properties.csv),
        Excel: cfnDatasetExcelOptionsPropertyToCloudFormation(properties.excel),
        Json: cfnDatasetJsonOptionsPropertyToCloudFormation(properties.json),
    };
}

// @ts-ignore TS6133
function CfnDatasetFormatOptionsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.FormatOptionsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.FormatOptionsProperty>();
    ret.addPropertyResult('csv', 'Csv', properties.Csv != null ? CfnDatasetCsvOptionsPropertyFromCloudFormation(properties.Csv) : undefined);
    ret.addPropertyResult('excel', 'Excel', properties.Excel != null ? CfnDatasetExcelOptionsPropertyFromCloudFormation(properties.Excel) : undefined);
    ret.addPropertyResult('json', 'Json', properties.Json != null ? CfnDatasetJsonOptionsPropertyFromCloudFormation(properties.Json) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-input.html
     */
    export interface InputProperty {
        /**
         * `CfnDataset.InputProperty.DataCatalogInputDefinition`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-input.html#cfn-databrew-dataset-input-datacataloginputdefinition
         */
        readonly dataCatalogInputDefinition?: CfnDataset.DataCatalogInputDefinitionProperty | cdk.IResolvable;
        /**
         * `CfnDataset.InputProperty.DatabaseInputDefinition`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-input.html#cfn-databrew-dataset-input-databaseinputdefinition
         */
        readonly databaseInputDefinition?: CfnDataset.DatabaseInputDefinitionProperty | cdk.IResolvable;
        /**
         * `CfnDataset.InputProperty.Metadata`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-input.html#cfn-databrew-dataset-input-metadata
         */
        readonly metadata?: CfnDataset.MetadataProperty | cdk.IResolvable;
        /**
         * `CfnDataset.InputProperty.S3InputDefinition`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-input.html#cfn-databrew-dataset-input-s3inputdefinition
         */
        readonly s3InputDefinition?: CfnDataset.S3LocationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `InputProperty`
 *
 * @param properties - the TypeScript properties of a `InputProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_InputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataCatalogInputDefinition', CfnDataset_DataCatalogInputDefinitionPropertyValidator)(properties.dataCatalogInputDefinition));
    errors.collect(cdk.propertyValidator('databaseInputDefinition', CfnDataset_DatabaseInputDefinitionPropertyValidator)(properties.databaseInputDefinition));
    errors.collect(cdk.propertyValidator('metadata', CfnDataset_MetadataPropertyValidator)(properties.metadata));
    errors.collect(cdk.propertyValidator('s3InputDefinition', CfnDataset_S3LocationPropertyValidator)(properties.s3InputDefinition));
    return errors.wrap('supplied properties not correct for "InputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.Input` resource
 *
 * @param properties - the TypeScript properties of a `InputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.Input` resource.
 */
// @ts-ignore TS6133
function cfnDatasetInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_InputPropertyValidator(properties).assertSuccess();
    return {
        DataCatalogInputDefinition: cfnDatasetDataCatalogInputDefinitionPropertyToCloudFormation(properties.dataCatalogInputDefinition),
        DatabaseInputDefinition: cfnDatasetDatabaseInputDefinitionPropertyToCloudFormation(properties.databaseInputDefinition),
        Metadata: cfnDatasetMetadataPropertyToCloudFormation(properties.metadata),
        S3InputDefinition: cfnDatasetS3LocationPropertyToCloudFormation(properties.s3InputDefinition),
    };
}

// @ts-ignore TS6133
function CfnDatasetInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.InputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.InputProperty>();
    ret.addPropertyResult('dataCatalogInputDefinition', 'DataCatalogInputDefinition', properties.DataCatalogInputDefinition != null ? CfnDatasetDataCatalogInputDefinitionPropertyFromCloudFormation(properties.DataCatalogInputDefinition) : undefined);
    ret.addPropertyResult('databaseInputDefinition', 'DatabaseInputDefinition', properties.DatabaseInputDefinition != null ? CfnDatasetDatabaseInputDefinitionPropertyFromCloudFormation(properties.DatabaseInputDefinition) : undefined);
    ret.addPropertyResult('metadata', 'Metadata', properties.Metadata != null ? CfnDatasetMetadataPropertyFromCloudFormation(properties.Metadata) : undefined);
    ret.addPropertyResult('s3InputDefinition', 'S3InputDefinition', properties.S3InputDefinition != null ? CfnDatasetS3LocationPropertyFromCloudFormation(properties.S3InputDefinition) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-jsonoptions.html
     */
    export interface JsonOptionsProperty {
        /**
         * `CfnDataset.JsonOptionsProperty.MultiLine`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-jsonoptions.html#cfn-databrew-dataset-jsonoptions-multiline
         */
        readonly multiLine?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `JsonOptionsProperty`
 *
 * @param properties - the TypeScript properties of a `JsonOptionsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_JsonOptionsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('multiLine', cdk.validateBoolean)(properties.multiLine));
    return errors.wrap('supplied properties not correct for "JsonOptionsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.JsonOptions` resource
 *
 * @param properties - the TypeScript properties of a `JsonOptionsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.JsonOptions` resource.
 */
// @ts-ignore TS6133
function cfnDatasetJsonOptionsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_JsonOptionsPropertyValidator(properties).assertSuccess();
    return {
        MultiLine: cdk.booleanToCloudFormation(properties.multiLine),
    };
}

// @ts-ignore TS6133
function CfnDatasetJsonOptionsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.JsonOptionsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.JsonOptionsProperty>();
    ret.addPropertyResult('multiLine', 'MultiLine', properties.MultiLine != null ? cfn_parse.FromCloudFormation.getBoolean(properties.MultiLine) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-metadata.html
     */
    export interface MetadataProperty {
        /**
         * `CfnDataset.MetadataProperty.SourceArn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-metadata.html#cfn-databrew-dataset-metadata-sourcearn
         */
        readonly sourceArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `MetadataProperty`
 *
 * @param properties - the TypeScript properties of a `MetadataProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_MetadataPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('sourceArn', cdk.validateString)(properties.sourceArn));
    return errors.wrap('supplied properties not correct for "MetadataProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.Metadata` resource
 *
 * @param properties - the TypeScript properties of a `MetadataProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.Metadata` resource.
 */
// @ts-ignore TS6133
function cfnDatasetMetadataPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_MetadataPropertyValidator(properties).assertSuccess();
    return {
        SourceArn: cdk.stringToCloudFormation(properties.sourceArn),
    };
}

// @ts-ignore TS6133
function CfnDatasetMetadataPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.MetadataProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.MetadataProperty>();
    ret.addPropertyResult('sourceArn', 'SourceArn', properties.SourceArn != null ? cfn_parse.FromCloudFormation.getString(properties.SourceArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-pathoptions.html
     */
    export interface PathOptionsProperty {
        /**
         * `CfnDataset.PathOptionsProperty.FilesLimit`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-pathoptions.html#cfn-databrew-dataset-pathoptions-fileslimit
         */
        readonly filesLimit?: CfnDataset.FilesLimitProperty | cdk.IResolvable;
        /**
         * `CfnDataset.PathOptionsProperty.LastModifiedDateCondition`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-pathoptions.html#cfn-databrew-dataset-pathoptions-lastmodifieddatecondition
         */
        readonly lastModifiedDateCondition?: CfnDataset.FilterExpressionProperty | cdk.IResolvable;
        /**
         * `CfnDataset.PathOptionsProperty.Parameters`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-pathoptions.html#cfn-databrew-dataset-pathoptions-parameters
         */
        readonly parameters?: Array<CfnDataset.PathParameterProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `PathOptionsProperty`
 *
 * @param properties - the TypeScript properties of a `PathOptionsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_PathOptionsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('filesLimit', CfnDataset_FilesLimitPropertyValidator)(properties.filesLimit));
    errors.collect(cdk.propertyValidator('lastModifiedDateCondition', CfnDataset_FilterExpressionPropertyValidator)(properties.lastModifiedDateCondition));
    errors.collect(cdk.propertyValidator('parameters', cdk.listValidator(CfnDataset_PathParameterPropertyValidator))(properties.parameters));
    return errors.wrap('supplied properties not correct for "PathOptionsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.PathOptions` resource
 *
 * @param properties - the TypeScript properties of a `PathOptionsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.PathOptions` resource.
 */
// @ts-ignore TS6133
function cfnDatasetPathOptionsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_PathOptionsPropertyValidator(properties).assertSuccess();
    return {
        FilesLimit: cfnDatasetFilesLimitPropertyToCloudFormation(properties.filesLimit),
        LastModifiedDateCondition: cfnDatasetFilterExpressionPropertyToCloudFormation(properties.lastModifiedDateCondition),
        Parameters: cdk.listMapper(cfnDatasetPathParameterPropertyToCloudFormation)(properties.parameters),
    };
}

// @ts-ignore TS6133
function CfnDatasetPathOptionsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.PathOptionsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.PathOptionsProperty>();
    ret.addPropertyResult('filesLimit', 'FilesLimit', properties.FilesLimit != null ? CfnDatasetFilesLimitPropertyFromCloudFormation(properties.FilesLimit) : undefined);
    ret.addPropertyResult('lastModifiedDateCondition', 'LastModifiedDateCondition', properties.LastModifiedDateCondition != null ? CfnDatasetFilterExpressionPropertyFromCloudFormation(properties.LastModifiedDateCondition) : undefined);
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? cfn_parse.FromCloudFormation.getArray(CfnDatasetPathParameterPropertyFromCloudFormation)(properties.Parameters) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-pathparameter.html
     */
    export interface PathParameterProperty {
        /**
         * `CfnDataset.PathParameterProperty.DatasetParameter`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-pathparameter.html#cfn-databrew-dataset-pathparameter-datasetparameter
         */
        readonly datasetParameter: CfnDataset.DatasetParameterProperty | cdk.IResolvable;
        /**
         * `CfnDataset.PathParameterProperty.PathParameterName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-pathparameter.html#cfn-databrew-dataset-pathparameter-pathparametername
         */
        readonly pathParameterName: string;
    }
}

/**
 * Determine whether the given properties match those of a `PathParameterProperty`
 *
 * @param properties - the TypeScript properties of a `PathParameterProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_PathParameterPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('datasetParameter', cdk.requiredValidator)(properties.datasetParameter));
    errors.collect(cdk.propertyValidator('datasetParameter', CfnDataset_DatasetParameterPropertyValidator)(properties.datasetParameter));
    errors.collect(cdk.propertyValidator('pathParameterName', cdk.requiredValidator)(properties.pathParameterName));
    errors.collect(cdk.propertyValidator('pathParameterName', cdk.validateString)(properties.pathParameterName));
    return errors.wrap('supplied properties not correct for "PathParameterProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.PathParameter` resource
 *
 * @param properties - the TypeScript properties of a `PathParameterProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.PathParameter` resource.
 */
// @ts-ignore TS6133
function cfnDatasetPathParameterPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_PathParameterPropertyValidator(properties).assertSuccess();
    return {
        DatasetParameter: cfnDatasetDatasetParameterPropertyToCloudFormation(properties.datasetParameter),
        PathParameterName: cdk.stringToCloudFormation(properties.pathParameterName),
    };
}

// @ts-ignore TS6133
function CfnDatasetPathParameterPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.PathParameterProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.PathParameterProperty>();
    ret.addPropertyResult('datasetParameter', 'DatasetParameter', CfnDatasetDatasetParameterPropertyFromCloudFormation(properties.DatasetParameter));
    ret.addPropertyResult('pathParameterName', 'PathParameterName', cfn_parse.FromCloudFormation.getString(properties.PathParameterName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-s3location.html
     */
    export interface S3LocationProperty {
        /**
         * `CfnDataset.S3LocationProperty.Bucket`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-s3location.html#cfn-databrew-dataset-s3location-bucket
         */
        readonly bucket: string;
        /**
         * `CfnDataset.S3LocationProperty.Key`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-dataset-s3location.html#cfn-databrew-dataset-s3location-key
         */
        readonly key?: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3LocationProperty`
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataset_S3LocationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucket', cdk.requiredValidator)(properties.bucket));
    errors.collect(cdk.propertyValidator('bucket', cdk.validateString)(properties.bucket));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    return errors.wrap('supplied properties not correct for "S3LocationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.S3Location` resource
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Dataset.S3Location` resource.
 */
// @ts-ignore TS6133
function cfnDatasetS3LocationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataset_S3LocationPropertyValidator(properties).assertSuccess();
    return {
        Bucket: cdk.stringToCloudFormation(properties.bucket),
        Key: cdk.stringToCloudFormation(properties.key),
    };
}

// @ts-ignore TS6133
function CfnDatasetS3LocationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataset.S3LocationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataset.S3LocationProperty>();
    ret.addPropertyResult('bucket', 'Bucket', cfn_parse.FromCloudFormation.getString(properties.Bucket));
    ret.addPropertyResult('key', 'Key', properties.Key != null ? cfn_parse.FromCloudFormation.getString(properties.Key) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnJob`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html
 */
export interface CfnJobProps {

    /**
     * `AWS::DataBrew::Job.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-name
     */
    readonly name: string;

    /**
     * `AWS::DataBrew::Job.RoleArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-rolearn
     */
    readonly roleArn: string;

    /**
     * `AWS::DataBrew::Job.Type`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-type
     */
    readonly type: string;

    /**
     * `AWS::DataBrew::Job.DatabaseOutputs`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-databaseoutputs
     */
    readonly databaseOutputs?: Array<CfnJob.DatabaseOutputProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Job.DataCatalogOutputs`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-datacatalogoutputs
     */
    readonly dataCatalogOutputs?: Array<CfnJob.DataCatalogOutputProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Job.DatasetName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-datasetname
     */
    readonly datasetName?: string;

    /**
     * `AWS::DataBrew::Job.EncryptionKeyArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-encryptionkeyarn
     */
    readonly encryptionKeyArn?: string;

    /**
     * `AWS::DataBrew::Job.EncryptionMode`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-encryptionmode
     */
    readonly encryptionMode?: string;

    /**
     * `AWS::DataBrew::Job.JobSample`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-jobsample
     */
    readonly jobSample?: CfnJob.JobSampleProperty | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Job.LogSubscription`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-logsubscription
     */
    readonly logSubscription?: string;

    /**
     * `AWS::DataBrew::Job.MaxCapacity`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-maxcapacity
     */
    readonly maxCapacity?: number;

    /**
     * `AWS::DataBrew::Job.MaxRetries`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-maxretries
     */
    readonly maxRetries?: number;

    /**
     * `AWS::DataBrew::Job.OutputLocation`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-outputlocation
     */
    readonly outputLocation?: CfnJob.OutputLocationProperty | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Job.Outputs`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-outputs
     */
    readonly outputs?: Array<CfnJob.OutputProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Job.ProfileConfiguration`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-profileconfiguration
     */
    readonly profileConfiguration?: CfnJob.ProfileConfigurationProperty | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Job.ProjectName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-projectname
     */
    readonly projectName?: string;

    /**
     * `AWS::DataBrew::Job.Recipe`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-recipe
     */
    readonly recipe?: CfnJob.RecipeProperty | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Job.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * `AWS::DataBrew::Job.Timeout`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-timeout
     */
    readonly timeout?: number;

    /**
     * `AWS::DataBrew::Job.ValidationConfigurations`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-validationconfigurations
     */
    readonly validationConfigurations?: Array<CfnJob.ValidationConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnJobProps`
 *
 * @param properties - the TypeScript properties of a `CfnJobProps`
 *
 * @returns the result of the validation.
 */
function CfnJobPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataCatalogOutputs', cdk.listValidator(CfnJob_DataCatalogOutputPropertyValidator))(properties.dataCatalogOutputs));
    errors.collect(cdk.propertyValidator('databaseOutputs', cdk.listValidator(CfnJob_DatabaseOutputPropertyValidator))(properties.databaseOutputs));
    errors.collect(cdk.propertyValidator('datasetName', cdk.validateString)(properties.datasetName));
    errors.collect(cdk.propertyValidator('encryptionKeyArn', cdk.validateString)(properties.encryptionKeyArn));
    errors.collect(cdk.propertyValidator('encryptionMode', cdk.validateString)(properties.encryptionMode));
    errors.collect(cdk.propertyValidator('jobSample', CfnJob_JobSamplePropertyValidator)(properties.jobSample));
    errors.collect(cdk.propertyValidator('logSubscription', cdk.validateString)(properties.logSubscription));
    errors.collect(cdk.propertyValidator('maxCapacity', cdk.validateNumber)(properties.maxCapacity));
    errors.collect(cdk.propertyValidator('maxRetries', cdk.validateNumber)(properties.maxRetries));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('outputLocation', CfnJob_OutputLocationPropertyValidator)(properties.outputLocation));
    errors.collect(cdk.propertyValidator('outputs', cdk.listValidator(CfnJob_OutputPropertyValidator))(properties.outputs));
    errors.collect(cdk.propertyValidator('profileConfiguration', CfnJob_ProfileConfigurationPropertyValidator)(properties.profileConfiguration));
    errors.collect(cdk.propertyValidator('projectName', cdk.validateString)(properties.projectName));
    errors.collect(cdk.propertyValidator('recipe', CfnJob_RecipePropertyValidator)(properties.recipe));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('timeout', cdk.validateNumber)(properties.timeout));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    errors.collect(cdk.propertyValidator('validationConfigurations', cdk.listValidator(CfnJob_ValidationConfigurationPropertyValidator))(properties.validationConfigurations));
    return errors.wrap('supplied properties not correct for "CfnJobProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job` resource
 *
 * @param properties - the TypeScript properties of a `CfnJobProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job` resource.
 */
// @ts-ignore TS6133
function cfnJobPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        Type: cdk.stringToCloudFormation(properties.type),
        DatabaseOutputs: cdk.listMapper(cfnJobDatabaseOutputPropertyToCloudFormation)(properties.databaseOutputs),
        DataCatalogOutputs: cdk.listMapper(cfnJobDataCatalogOutputPropertyToCloudFormation)(properties.dataCatalogOutputs),
        DatasetName: cdk.stringToCloudFormation(properties.datasetName),
        EncryptionKeyArn: cdk.stringToCloudFormation(properties.encryptionKeyArn),
        EncryptionMode: cdk.stringToCloudFormation(properties.encryptionMode),
        JobSample: cfnJobJobSamplePropertyToCloudFormation(properties.jobSample),
        LogSubscription: cdk.stringToCloudFormation(properties.logSubscription),
        MaxCapacity: cdk.numberToCloudFormation(properties.maxCapacity),
        MaxRetries: cdk.numberToCloudFormation(properties.maxRetries),
        OutputLocation: cfnJobOutputLocationPropertyToCloudFormation(properties.outputLocation),
        Outputs: cdk.listMapper(cfnJobOutputPropertyToCloudFormation)(properties.outputs),
        ProfileConfiguration: cfnJobProfileConfigurationPropertyToCloudFormation(properties.profileConfiguration),
        ProjectName: cdk.stringToCloudFormation(properties.projectName),
        Recipe: cfnJobRecipePropertyToCloudFormation(properties.recipe),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        Timeout: cdk.numberToCloudFormation(properties.timeout),
        ValidationConfigurations: cdk.listMapper(cfnJobValidationConfigurationPropertyToCloudFormation)(properties.validationConfigurations),
    };
}

// @ts-ignore TS6133
function CfnJobPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addPropertyResult('databaseOutputs', 'DatabaseOutputs', properties.DatabaseOutputs != null ? cfn_parse.FromCloudFormation.getArray(CfnJobDatabaseOutputPropertyFromCloudFormation)(properties.DatabaseOutputs) : undefined);
    ret.addPropertyResult('dataCatalogOutputs', 'DataCatalogOutputs', properties.DataCatalogOutputs != null ? cfn_parse.FromCloudFormation.getArray(CfnJobDataCatalogOutputPropertyFromCloudFormation)(properties.DataCatalogOutputs) : undefined);
    ret.addPropertyResult('datasetName', 'DatasetName', properties.DatasetName != null ? cfn_parse.FromCloudFormation.getString(properties.DatasetName) : undefined);
    ret.addPropertyResult('encryptionKeyArn', 'EncryptionKeyArn', properties.EncryptionKeyArn != null ? cfn_parse.FromCloudFormation.getString(properties.EncryptionKeyArn) : undefined);
    ret.addPropertyResult('encryptionMode', 'EncryptionMode', properties.EncryptionMode != null ? cfn_parse.FromCloudFormation.getString(properties.EncryptionMode) : undefined);
    ret.addPropertyResult('jobSample', 'JobSample', properties.JobSample != null ? CfnJobJobSamplePropertyFromCloudFormation(properties.JobSample) : undefined);
    ret.addPropertyResult('logSubscription', 'LogSubscription', properties.LogSubscription != null ? cfn_parse.FromCloudFormation.getString(properties.LogSubscription) : undefined);
    ret.addPropertyResult('maxCapacity', 'MaxCapacity', properties.MaxCapacity != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxCapacity) : undefined);
    ret.addPropertyResult('maxRetries', 'MaxRetries', properties.MaxRetries != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxRetries) : undefined);
    ret.addPropertyResult('outputLocation', 'OutputLocation', properties.OutputLocation != null ? CfnJobOutputLocationPropertyFromCloudFormation(properties.OutputLocation) : undefined);
    ret.addPropertyResult('outputs', 'Outputs', properties.Outputs != null ? cfn_parse.FromCloudFormation.getArray(CfnJobOutputPropertyFromCloudFormation)(properties.Outputs) : undefined);
    ret.addPropertyResult('profileConfiguration', 'ProfileConfiguration', properties.ProfileConfiguration != null ? CfnJobProfileConfigurationPropertyFromCloudFormation(properties.ProfileConfiguration) : undefined);
    ret.addPropertyResult('projectName', 'ProjectName', properties.ProjectName != null ? cfn_parse.FromCloudFormation.getString(properties.ProjectName) : undefined);
    ret.addPropertyResult('recipe', 'Recipe', properties.Recipe != null ? CfnJobRecipePropertyFromCloudFormation(properties.Recipe) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('timeout', 'Timeout', properties.Timeout != null ? cfn_parse.FromCloudFormation.getNumber(properties.Timeout) : undefined);
    ret.addPropertyResult('validationConfigurations', 'ValidationConfigurations', properties.ValidationConfigurations != null ? cfn_parse.FromCloudFormation.getArray(CfnJobValidationConfigurationPropertyFromCloudFormation)(properties.ValidationConfigurations) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::DataBrew::Job`
 *
 *
 *
 * @cloudformationResource AWS::DataBrew::Job
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html
 */
export class CfnJob extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::DataBrew::Job";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnJob {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnJobPropsFromCloudFormation(resourceProperties);
        const ret = new CfnJob(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * `AWS::DataBrew::Job.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-name
     */
    public name: string;

    /**
     * `AWS::DataBrew::Job.RoleArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-rolearn
     */
    public roleArn: string;

    /**
     * `AWS::DataBrew::Job.Type`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-type
     */
    public type: string;

    /**
     * `AWS::DataBrew::Job.DatabaseOutputs`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-databaseoutputs
     */
    public databaseOutputs: Array<CfnJob.DatabaseOutputProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * `AWS::DataBrew::Job.DataCatalogOutputs`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-datacatalogoutputs
     */
    public dataCatalogOutputs: Array<CfnJob.DataCatalogOutputProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * `AWS::DataBrew::Job.DatasetName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-datasetname
     */
    public datasetName: string | undefined;

    /**
     * `AWS::DataBrew::Job.EncryptionKeyArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-encryptionkeyarn
     */
    public encryptionKeyArn: string | undefined;

    /**
     * `AWS::DataBrew::Job.EncryptionMode`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-encryptionmode
     */
    public encryptionMode: string | undefined;

    /**
     * `AWS::DataBrew::Job.JobSample`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-jobsample
     */
    public jobSample: CfnJob.JobSampleProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::DataBrew::Job.LogSubscription`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-logsubscription
     */
    public logSubscription: string | undefined;

    /**
     * `AWS::DataBrew::Job.MaxCapacity`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-maxcapacity
     */
    public maxCapacity: number | undefined;

    /**
     * `AWS::DataBrew::Job.MaxRetries`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-maxretries
     */
    public maxRetries: number | undefined;

    /**
     * `AWS::DataBrew::Job.OutputLocation`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-outputlocation
     */
    public outputLocation: CfnJob.OutputLocationProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::DataBrew::Job.Outputs`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-outputs
     */
    public outputs: Array<CfnJob.OutputProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * `AWS::DataBrew::Job.ProfileConfiguration`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-profileconfiguration
     */
    public profileConfiguration: CfnJob.ProfileConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::DataBrew::Job.ProjectName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-projectname
     */
    public projectName: string | undefined;

    /**
     * `AWS::DataBrew::Job.Recipe`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-recipe
     */
    public recipe: CfnJob.RecipeProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::DataBrew::Job.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * `AWS::DataBrew::Job.Timeout`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-timeout
     */
    public timeout: number | undefined;

    /**
     * `AWS::DataBrew::Job.ValidationConfigurations`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html#cfn-databrew-job-validationconfigurations
     */
    public validationConfigurations: Array<CfnJob.ValidationConfigurationProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::DataBrew::Job`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnJobProps) {
        super(scope, id, { type: CfnJob.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'roleArn', this);
        cdk.requireProperty(props, 'type', this);

        this.name = props.name;
        this.roleArn = props.roleArn;
        this.type = props.type;
        this.databaseOutputs = props.databaseOutputs;
        this.dataCatalogOutputs = props.dataCatalogOutputs;
        this.datasetName = props.datasetName;
        this.encryptionKeyArn = props.encryptionKeyArn;
        this.encryptionMode = props.encryptionMode;
        this.jobSample = props.jobSample;
        this.logSubscription = props.logSubscription;
        this.maxCapacity = props.maxCapacity;
        this.maxRetries = props.maxRetries;
        this.outputLocation = props.outputLocation;
        this.outputs = props.outputs;
        this.profileConfiguration = props.profileConfiguration;
        this.projectName = props.projectName;
        this.recipe = props.recipe;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::DataBrew::Job", props.tags, { tagPropertyName: 'tags' });
        this.timeout = props.timeout;
        this.validationConfigurations = props.validationConfigurations;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnJob.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            roleArn: this.roleArn,
            type: this.type,
            databaseOutputs: this.databaseOutputs,
            dataCatalogOutputs: this.dataCatalogOutputs,
            datasetName: this.datasetName,
            encryptionKeyArn: this.encryptionKeyArn,
            encryptionMode: this.encryptionMode,
            jobSample: this.jobSample,
            logSubscription: this.logSubscription,
            maxCapacity: this.maxCapacity,
            maxRetries: this.maxRetries,
            outputLocation: this.outputLocation,
            outputs: this.outputs,
            profileConfiguration: this.profileConfiguration,
            projectName: this.projectName,
            recipe: this.recipe,
            tags: this.tags.renderTags(),
            timeout: this.timeout,
            validationConfigurations: this.validationConfigurations,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnJobPropsToCloudFormation(props);
    }
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-allowedstatistics.html
     */
    export interface AllowedStatisticsProperty {
        /**
         * `CfnJob.AllowedStatisticsProperty.Statistics`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-allowedstatistics.html#cfn-databrew-job-allowedstatistics-statistics
         */
        readonly statistics: string[];
    }
}

/**
 * Determine whether the given properties match those of a `AllowedStatisticsProperty`
 *
 * @param properties - the TypeScript properties of a `AllowedStatisticsProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_AllowedStatisticsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('statistics', cdk.requiredValidator)(properties.statistics));
    errors.collect(cdk.propertyValidator('statistics', cdk.listValidator(cdk.validateString))(properties.statistics));
    return errors.wrap('supplied properties not correct for "AllowedStatisticsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.AllowedStatistics` resource
 *
 * @param properties - the TypeScript properties of a `AllowedStatisticsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.AllowedStatistics` resource.
 */
// @ts-ignore TS6133
function cfnJobAllowedStatisticsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_AllowedStatisticsPropertyValidator(properties).assertSuccess();
    return {
        Statistics: cdk.listMapper(cdk.stringToCloudFormation)(properties.statistics),
    };
}

// @ts-ignore TS6133
function CfnJobAllowedStatisticsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.AllowedStatisticsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.AllowedStatisticsProperty>();
    ret.addPropertyResult('statistics', 'Statistics', cfn_parse.FromCloudFormation.getStringArray(properties.Statistics));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-columnselector.html
     */
    export interface ColumnSelectorProperty {
        /**
         * `CfnJob.ColumnSelectorProperty.Name`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-columnselector.html#cfn-databrew-job-columnselector-name
         */
        readonly name?: string;
        /**
         * `CfnJob.ColumnSelectorProperty.Regex`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-columnselector.html#cfn-databrew-job-columnselector-regex
         */
        readonly regex?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ColumnSelectorProperty`
 *
 * @param properties - the TypeScript properties of a `ColumnSelectorProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_ColumnSelectorPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('regex', cdk.validateString)(properties.regex));
    return errors.wrap('supplied properties not correct for "ColumnSelectorProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.ColumnSelector` resource
 *
 * @param properties - the TypeScript properties of a `ColumnSelectorProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.ColumnSelector` resource.
 */
// @ts-ignore TS6133
function cfnJobColumnSelectorPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_ColumnSelectorPropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Regex: cdk.stringToCloudFormation(properties.regex),
    };
}

// @ts-ignore TS6133
function CfnJobColumnSelectorPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.ColumnSelectorProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.ColumnSelectorProperty>();
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('regex', 'Regex', properties.Regex != null ? cfn_parse.FromCloudFormation.getString(properties.Regex) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-columnstatisticsconfiguration.html
     */
    export interface ColumnStatisticsConfigurationProperty {
        /**
         * `CfnJob.ColumnStatisticsConfigurationProperty.Selectors`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-columnstatisticsconfiguration.html#cfn-databrew-job-columnstatisticsconfiguration-selectors
         */
        readonly selectors?: Array<CfnJob.ColumnSelectorProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `CfnJob.ColumnStatisticsConfigurationProperty.Statistics`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-columnstatisticsconfiguration.html#cfn-databrew-job-columnstatisticsconfiguration-statistics
         */
        readonly statistics: CfnJob.StatisticsConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ColumnStatisticsConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ColumnStatisticsConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_ColumnStatisticsConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('selectors', cdk.listValidator(CfnJob_ColumnSelectorPropertyValidator))(properties.selectors));
    errors.collect(cdk.propertyValidator('statistics', cdk.requiredValidator)(properties.statistics));
    errors.collect(cdk.propertyValidator('statistics', CfnJob_StatisticsConfigurationPropertyValidator)(properties.statistics));
    return errors.wrap('supplied properties not correct for "ColumnStatisticsConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.ColumnStatisticsConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ColumnStatisticsConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.ColumnStatisticsConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnJobColumnStatisticsConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_ColumnStatisticsConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Selectors: cdk.listMapper(cfnJobColumnSelectorPropertyToCloudFormation)(properties.selectors),
        Statistics: cfnJobStatisticsConfigurationPropertyToCloudFormation(properties.statistics),
    };
}

// @ts-ignore TS6133
function CfnJobColumnStatisticsConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.ColumnStatisticsConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.ColumnStatisticsConfigurationProperty>();
    ret.addPropertyResult('selectors', 'Selectors', properties.Selectors != null ? cfn_parse.FromCloudFormation.getArray(CfnJobColumnSelectorPropertyFromCloudFormation)(properties.Selectors) : undefined);
    ret.addPropertyResult('statistics', 'Statistics', CfnJobStatisticsConfigurationPropertyFromCloudFormation(properties.Statistics));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-csvoutputoptions.html
     */
    export interface CsvOutputOptionsProperty {
        /**
         * `CfnJob.CsvOutputOptionsProperty.Delimiter`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-csvoutputoptions.html#cfn-databrew-job-csvoutputoptions-delimiter
         */
        readonly delimiter?: string;
    }
}

/**
 * Determine whether the given properties match those of a `CsvOutputOptionsProperty`
 *
 * @param properties - the TypeScript properties of a `CsvOutputOptionsProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_CsvOutputOptionsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('delimiter', cdk.validateString)(properties.delimiter));
    return errors.wrap('supplied properties not correct for "CsvOutputOptionsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.CsvOutputOptions` resource
 *
 * @param properties - the TypeScript properties of a `CsvOutputOptionsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.CsvOutputOptions` resource.
 */
// @ts-ignore TS6133
function cfnJobCsvOutputOptionsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_CsvOutputOptionsPropertyValidator(properties).assertSuccess();
    return {
        Delimiter: cdk.stringToCloudFormation(properties.delimiter),
    };
}

// @ts-ignore TS6133
function CfnJobCsvOutputOptionsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.CsvOutputOptionsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.CsvOutputOptionsProperty>();
    ret.addPropertyResult('delimiter', 'Delimiter', properties.Delimiter != null ? cfn_parse.FromCloudFormation.getString(properties.Delimiter) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-datacatalogoutput.html
     */
    export interface DataCatalogOutputProperty {
        /**
         * `CfnJob.DataCatalogOutputProperty.CatalogId`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-datacatalogoutput.html#cfn-databrew-job-datacatalogoutput-catalogid
         */
        readonly catalogId?: string;
        /**
         * `CfnJob.DataCatalogOutputProperty.DatabaseName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-datacatalogoutput.html#cfn-databrew-job-datacatalogoutput-databasename
         */
        readonly databaseName: string;
        /**
         * `CfnJob.DataCatalogOutputProperty.DatabaseOptions`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-datacatalogoutput.html#cfn-databrew-job-datacatalogoutput-databaseoptions
         */
        readonly databaseOptions?: CfnJob.DatabaseTableOutputOptionsProperty | cdk.IResolvable;
        /**
         * `CfnJob.DataCatalogOutputProperty.Overwrite`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-datacatalogoutput.html#cfn-databrew-job-datacatalogoutput-overwrite
         */
        readonly overwrite?: boolean | cdk.IResolvable;
        /**
         * `CfnJob.DataCatalogOutputProperty.S3Options`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-datacatalogoutput.html#cfn-databrew-job-datacatalogoutput-s3options
         */
        readonly s3Options?: CfnJob.S3TableOutputOptionsProperty | cdk.IResolvable;
        /**
         * `CfnJob.DataCatalogOutputProperty.TableName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-datacatalogoutput.html#cfn-databrew-job-datacatalogoutput-tablename
         */
        readonly tableName: string;
    }
}

/**
 * Determine whether the given properties match those of a `DataCatalogOutputProperty`
 *
 * @param properties - the TypeScript properties of a `DataCatalogOutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_DataCatalogOutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('databaseName', cdk.requiredValidator)(properties.databaseName));
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    errors.collect(cdk.propertyValidator('databaseOptions', CfnJob_DatabaseTableOutputOptionsPropertyValidator)(properties.databaseOptions));
    errors.collect(cdk.propertyValidator('overwrite', cdk.validateBoolean)(properties.overwrite));
    errors.collect(cdk.propertyValidator('s3Options', CfnJob_S3TableOutputOptionsPropertyValidator)(properties.s3Options));
    errors.collect(cdk.propertyValidator('tableName', cdk.requiredValidator)(properties.tableName));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    return errors.wrap('supplied properties not correct for "DataCatalogOutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.DataCatalogOutput` resource
 *
 * @param properties - the TypeScript properties of a `DataCatalogOutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.DataCatalogOutput` resource.
 */
// @ts-ignore TS6133
function cfnJobDataCatalogOutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_DataCatalogOutputPropertyValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
        DatabaseOptions: cfnJobDatabaseTableOutputOptionsPropertyToCloudFormation(properties.databaseOptions),
        Overwrite: cdk.booleanToCloudFormation(properties.overwrite),
        S3Options: cfnJobS3TableOutputOptionsPropertyToCloudFormation(properties.s3Options),
        TableName: cdk.stringToCloudFormation(properties.tableName),
    };
}

// @ts-ignore TS6133
function CfnJobDataCatalogOutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.DataCatalogOutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.DataCatalogOutputProperty>();
    ret.addPropertyResult('catalogId', 'CatalogId', properties.CatalogId != null ? cfn_parse.FromCloudFormation.getString(properties.CatalogId) : undefined);
    ret.addPropertyResult('databaseName', 'DatabaseName', cfn_parse.FromCloudFormation.getString(properties.DatabaseName));
    ret.addPropertyResult('databaseOptions', 'DatabaseOptions', properties.DatabaseOptions != null ? CfnJobDatabaseTableOutputOptionsPropertyFromCloudFormation(properties.DatabaseOptions) : undefined);
    ret.addPropertyResult('overwrite', 'Overwrite', properties.Overwrite != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Overwrite) : undefined);
    ret.addPropertyResult('s3Options', 'S3Options', properties.S3Options != null ? CfnJobS3TableOutputOptionsPropertyFromCloudFormation(properties.S3Options) : undefined);
    ret.addPropertyResult('tableName', 'TableName', cfn_parse.FromCloudFormation.getString(properties.TableName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-databaseoutput.html
     */
    export interface DatabaseOutputProperty {
        /**
         * `CfnJob.DatabaseOutputProperty.DatabaseOptions`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-databaseoutput.html#cfn-databrew-job-databaseoutput-databaseoptions
         */
        readonly databaseOptions: CfnJob.DatabaseTableOutputOptionsProperty | cdk.IResolvable;
        /**
         * `CfnJob.DatabaseOutputProperty.DatabaseOutputMode`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-databaseoutput.html#cfn-databrew-job-databaseoutput-databaseoutputmode
         */
        readonly databaseOutputMode?: string;
        /**
         * `CfnJob.DatabaseOutputProperty.GlueConnectionName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-databaseoutput.html#cfn-databrew-job-databaseoutput-glueconnectionname
         */
        readonly glueConnectionName: string;
    }
}

/**
 * Determine whether the given properties match those of a `DatabaseOutputProperty`
 *
 * @param properties - the TypeScript properties of a `DatabaseOutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_DatabaseOutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('databaseOptions', cdk.requiredValidator)(properties.databaseOptions));
    errors.collect(cdk.propertyValidator('databaseOptions', CfnJob_DatabaseTableOutputOptionsPropertyValidator)(properties.databaseOptions));
    errors.collect(cdk.propertyValidator('databaseOutputMode', cdk.validateString)(properties.databaseOutputMode));
    errors.collect(cdk.propertyValidator('glueConnectionName', cdk.requiredValidator)(properties.glueConnectionName));
    errors.collect(cdk.propertyValidator('glueConnectionName', cdk.validateString)(properties.glueConnectionName));
    return errors.wrap('supplied properties not correct for "DatabaseOutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.DatabaseOutput` resource
 *
 * @param properties - the TypeScript properties of a `DatabaseOutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.DatabaseOutput` resource.
 */
// @ts-ignore TS6133
function cfnJobDatabaseOutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_DatabaseOutputPropertyValidator(properties).assertSuccess();
    return {
        DatabaseOptions: cfnJobDatabaseTableOutputOptionsPropertyToCloudFormation(properties.databaseOptions),
        DatabaseOutputMode: cdk.stringToCloudFormation(properties.databaseOutputMode),
        GlueConnectionName: cdk.stringToCloudFormation(properties.glueConnectionName),
    };
}

// @ts-ignore TS6133
function CfnJobDatabaseOutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.DatabaseOutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.DatabaseOutputProperty>();
    ret.addPropertyResult('databaseOptions', 'DatabaseOptions', CfnJobDatabaseTableOutputOptionsPropertyFromCloudFormation(properties.DatabaseOptions));
    ret.addPropertyResult('databaseOutputMode', 'DatabaseOutputMode', properties.DatabaseOutputMode != null ? cfn_parse.FromCloudFormation.getString(properties.DatabaseOutputMode) : undefined);
    ret.addPropertyResult('glueConnectionName', 'GlueConnectionName', cfn_parse.FromCloudFormation.getString(properties.GlueConnectionName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-databasetableoutputoptions.html
     */
    export interface DatabaseTableOutputOptionsProperty {
        /**
         * `CfnJob.DatabaseTableOutputOptionsProperty.TableName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-databasetableoutputoptions.html#cfn-databrew-job-databasetableoutputoptions-tablename
         */
        readonly tableName: string;
        /**
         * `CfnJob.DatabaseTableOutputOptionsProperty.TempDirectory`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-databasetableoutputoptions.html#cfn-databrew-job-databasetableoutputoptions-tempdirectory
         */
        readonly tempDirectory?: CfnJob.S3LocationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DatabaseTableOutputOptionsProperty`
 *
 * @param properties - the TypeScript properties of a `DatabaseTableOutputOptionsProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_DatabaseTableOutputOptionsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('tableName', cdk.requiredValidator)(properties.tableName));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    errors.collect(cdk.propertyValidator('tempDirectory', CfnJob_S3LocationPropertyValidator)(properties.tempDirectory));
    return errors.wrap('supplied properties not correct for "DatabaseTableOutputOptionsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.DatabaseTableOutputOptions` resource
 *
 * @param properties - the TypeScript properties of a `DatabaseTableOutputOptionsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.DatabaseTableOutputOptions` resource.
 */
// @ts-ignore TS6133
function cfnJobDatabaseTableOutputOptionsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_DatabaseTableOutputOptionsPropertyValidator(properties).assertSuccess();
    return {
        TableName: cdk.stringToCloudFormation(properties.tableName),
        TempDirectory: cfnJobS3LocationPropertyToCloudFormation(properties.tempDirectory),
    };
}

// @ts-ignore TS6133
function CfnJobDatabaseTableOutputOptionsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.DatabaseTableOutputOptionsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.DatabaseTableOutputOptionsProperty>();
    ret.addPropertyResult('tableName', 'TableName', cfn_parse.FromCloudFormation.getString(properties.TableName));
    ret.addPropertyResult('tempDirectory', 'TempDirectory', properties.TempDirectory != null ? CfnJobS3LocationPropertyFromCloudFormation(properties.TempDirectory) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-entitydetectorconfiguration.html
     */
    export interface EntityDetectorConfigurationProperty {
        /**
         * `CfnJob.EntityDetectorConfigurationProperty.AllowedStatistics`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-entitydetectorconfiguration.html#cfn-databrew-job-entitydetectorconfiguration-allowedstatistics
         */
        readonly allowedStatistics?: CfnJob.AllowedStatisticsProperty | cdk.IResolvable;
        /**
         * `CfnJob.EntityDetectorConfigurationProperty.EntityTypes`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-entitydetectorconfiguration.html#cfn-databrew-job-entitydetectorconfiguration-entitytypes
         */
        readonly entityTypes: string[];
    }
}

/**
 * Determine whether the given properties match those of a `EntityDetectorConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `EntityDetectorConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_EntityDetectorConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('allowedStatistics', CfnJob_AllowedStatisticsPropertyValidator)(properties.allowedStatistics));
    errors.collect(cdk.propertyValidator('entityTypes', cdk.requiredValidator)(properties.entityTypes));
    errors.collect(cdk.propertyValidator('entityTypes', cdk.listValidator(cdk.validateString))(properties.entityTypes));
    return errors.wrap('supplied properties not correct for "EntityDetectorConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.EntityDetectorConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `EntityDetectorConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.EntityDetectorConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnJobEntityDetectorConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_EntityDetectorConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AllowedStatistics: cfnJobAllowedStatisticsPropertyToCloudFormation(properties.allowedStatistics),
        EntityTypes: cdk.listMapper(cdk.stringToCloudFormation)(properties.entityTypes),
    };
}

// @ts-ignore TS6133
function CfnJobEntityDetectorConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.EntityDetectorConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.EntityDetectorConfigurationProperty>();
    ret.addPropertyResult('allowedStatistics', 'AllowedStatistics', properties.AllowedStatistics != null ? CfnJobAllowedStatisticsPropertyFromCloudFormation(properties.AllowedStatistics) : undefined);
    ret.addPropertyResult('entityTypes', 'EntityTypes', cfn_parse.FromCloudFormation.getStringArray(properties.EntityTypes));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-jobsample.html
     */
    export interface JobSampleProperty {
        /**
         * `CfnJob.JobSampleProperty.Mode`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-jobsample.html#cfn-databrew-job-jobsample-mode
         */
        readonly mode?: string;
        /**
         * `CfnJob.JobSampleProperty.Size`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-jobsample.html#cfn-databrew-job-jobsample-size
         */
        readonly size?: number;
    }
}

/**
 * Determine whether the given properties match those of a `JobSampleProperty`
 *
 * @param properties - the TypeScript properties of a `JobSampleProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_JobSamplePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('mode', cdk.validateString)(properties.mode));
    errors.collect(cdk.propertyValidator('size', cdk.validateNumber)(properties.size));
    return errors.wrap('supplied properties not correct for "JobSampleProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.JobSample` resource
 *
 * @param properties - the TypeScript properties of a `JobSampleProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.JobSample` resource.
 */
// @ts-ignore TS6133
function cfnJobJobSamplePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_JobSamplePropertyValidator(properties).assertSuccess();
    return {
        Mode: cdk.stringToCloudFormation(properties.mode),
        Size: cdk.numberToCloudFormation(properties.size),
    };
}

// @ts-ignore TS6133
function CfnJobJobSamplePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.JobSampleProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.JobSampleProperty>();
    ret.addPropertyResult('mode', 'Mode', properties.Mode != null ? cfn_parse.FromCloudFormation.getString(properties.Mode) : undefined);
    ret.addPropertyResult('size', 'Size', properties.Size != null ? cfn_parse.FromCloudFormation.getNumber(properties.Size) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-output.html
     */
    export interface OutputProperty {
        /**
         * `CfnJob.OutputProperty.CompressionFormat`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-output.html#cfn-databrew-job-output-compressionformat
         */
        readonly compressionFormat?: string;
        /**
         * `CfnJob.OutputProperty.Format`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-output.html#cfn-databrew-job-output-format
         */
        readonly format?: string;
        /**
         * `CfnJob.OutputProperty.FormatOptions`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-output.html#cfn-databrew-job-output-formatoptions
         */
        readonly formatOptions?: CfnJob.OutputFormatOptionsProperty | cdk.IResolvable;
        /**
         * `CfnJob.OutputProperty.Location`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-output.html#cfn-databrew-job-output-location
         */
        readonly location: CfnJob.S3LocationProperty | cdk.IResolvable;
        /**
         * `CfnJob.OutputProperty.MaxOutputFiles`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-output.html#cfn-databrew-job-output-maxoutputfiles
         */
        readonly maxOutputFiles?: number;
        /**
         * `CfnJob.OutputProperty.Overwrite`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-output.html#cfn-databrew-job-output-overwrite
         */
        readonly overwrite?: boolean | cdk.IResolvable;
        /**
         * `CfnJob.OutputProperty.PartitionColumns`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-output.html#cfn-databrew-job-output-partitioncolumns
         */
        readonly partitionColumns?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `OutputProperty`
 *
 * @param properties - the TypeScript properties of a `OutputProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_OutputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('compressionFormat', cdk.validateString)(properties.compressionFormat));
    errors.collect(cdk.propertyValidator('format', cdk.validateString)(properties.format));
    errors.collect(cdk.propertyValidator('formatOptions', CfnJob_OutputFormatOptionsPropertyValidator)(properties.formatOptions));
    errors.collect(cdk.propertyValidator('location', cdk.requiredValidator)(properties.location));
    errors.collect(cdk.propertyValidator('location', CfnJob_S3LocationPropertyValidator)(properties.location));
    errors.collect(cdk.propertyValidator('maxOutputFiles', cdk.validateNumber)(properties.maxOutputFiles));
    errors.collect(cdk.propertyValidator('overwrite', cdk.validateBoolean)(properties.overwrite));
    errors.collect(cdk.propertyValidator('partitionColumns', cdk.listValidator(cdk.validateString))(properties.partitionColumns));
    return errors.wrap('supplied properties not correct for "OutputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.Output` resource
 *
 * @param properties - the TypeScript properties of a `OutputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.Output` resource.
 */
// @ts-ignore TS6133
function cfnJobOutputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_OutputPropertyValidator(properties).assertSuccess();
    return {
        CompressionFormat: cdk.stringToCloudFormation(properties.compressionFormat),
        Format: cdk.stringToCloudFormation(properties.format),
        FormatOptions: cfnJobOutputFormatOptionsPropertyToCloudFormation(properties.formatOptions),
        Location: cfnJobS3LocationPropertyToCloudFormation(properties.location),
        MaxOutputFiles: cdk.numberToCloudFormation(properties.maxOutputFiles),
        Overwrite: cdk.booleanToCloudFormation(properties.overwrite),
        PartitionColumns: cdk.listMapper(cdk.stringToCloudFormation)(properties.partitionColumns),
    };
}

// @ts-ignore TS6133
function CfnJobOutputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.OutputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.OutputProperty>();
    ret.addPropertyResult('compressionFormat', 'CompressionFormat', properties.CompressionFormat != null ? cfn_parse.FromCloudFormation.getString(properties.CompressionFormat) : undefined);
    ret.addPropertyResult('format', 'Format', properties.Format != null ? cfn_parse.FromCloudFormation.getString(properties.Format) : undefined);
    ret.addPropertyResult('formatOptions', 'FormatOptions', properties.FormatOptions != null ? CfnJobOutputFormatOptionsPropertyFromCloudFormation(properties.FormatOptions) : undefined);
    ret.addPropertyResult('location', 'Location', CfnJobS3LocationPropertyFromCloudFormation(properties.Location));
    ret.addPropertyResult('maxOutputFiles', 'MaxOutputFiles', properties.MaxOutputFiles != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxOutputFiles) : undefined);
    ret.addPropertyResult('overwrite', 'Overwrite', properties.Overwrite != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Overwrite) : undefined);
    ret.addPropertyResult('partitionColumns', 'PartitionColumns', properties.PartitionColumns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.PartitionColumns) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-outputformatoptions.html
     */
    export interface OutputFormatOptionsProperty {
        /**
         * `CfnJob.OutputFormatOptionsProperty.Csv`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-outputformatoptions.html#cfn-databrew-job-outputformatoptions-csv
         */
        readonly csv?: CfnJob.CsvOutputOptionsProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `OutputFormatOptionsProperty`
 *
 * @param properties - the TypeScript properties of a `OutputFormatOptionsProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_OutputFormatOptionsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('csv', CfnJob_CsvOutputOptionsPropertyValidator)(properties.csv));
    return errors.wrap('supplied properties not correct for "OutputFormatOptionsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.OutputFormatOptions` resource
 *
 * @param properties - the TypeScript properties of a `OutputFormatOptionsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.OutputFormatOptions` resource.
 */
// @ts-ignore TS6133
function cfnJobOutputFormatOptionsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_OutputFormatOptionsPropertyValidator(properties).assertSuccess();
    return {
        Csv: cfnJobCsvOutputOptionsPropertyToCloudFormation(properties.csv),
    };
}

// @ts-ignore TS6133
function CfnJobOutputFormatOptionsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.OutputFormatOptionsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.OutputFormatOptionsProperty>();
    ret.addPropertyResult('csv', 'Csv', properties.Csv != null ? CfnJobCsvOutputOptionsPropertyFromCloudFormation(properties.Csv) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-outputlocation.html
     */
    export interface OutputLocationProperty {
        /**
         * `CfnJob.OutputLocationProperty.Bucket`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-outputlocation.html#cfn-databrew-job-outputlocation-bucket
         */
        readonly bucket: string;
        /**
         * `CfnJob.OutputLocationProperty.BucketOwner`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-outputlocation.html#cfn-databrew-job-outputlocation-bucketowner
         */
        readonly bucketOwner?: string;
        /**
         * `CfnJob.OutputLocationProperty.Key`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-outputlocation.html#cfn-databrew-job-outputlocation-key
         */
        readonly key?: string;
    }
}

/**
 * Determine whether the given properties match those of a `OutputLocationProperty`
 *
 * @param properties - the TypeScript properties of a `OutputLocationProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_OutputLocationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucket', cdk.requiredValidator)(properties.bucket));
    errors.collect(cdk.propertyValidator('bucket', cdk.validateString)(properties.bucket));
    errors.collect(cdk.propertyValidator('bucketOwner', cdk.validateString)(properties.bucketOwner));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    return errors.wrap('supplied properties not correct for "OutputLocationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.OutputLocation` resource
 *
 * @param properties - the TypeScript properties of a `OutputLocationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.OutputLocation` resource.
 */
// @ts-ignore TS6133
function cfnJobOutputLocationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_OutputLocationPropertyValidator(properties).assertSuccess();
    return {
        Bucket: cdk.stringToCloudFormation(properties.bucket),
        BucketOwner: cdk.stringToCloudFormation(properties.bucketOwner),
        Key: cdk.stringToCloudFormation(properties.key),
    };
}

// @ts-ignore TS6133
function CfnJobOutputLocationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.OutputLocationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.OutputLocationProperty>();
    ret.addPropertyResult('bucket', 'Bucket', cfn_parse.FromCloudFormation.getString(properties.Bucket));
    ret.addPropertyResult('bucketOwner', 'BucketOwner', properties.BucketOwner != null ? cfn_parse.FromCloudFormation.getString(properties.BucketOwner) : undefined);
    ret.addPropertyResult('key', 'Key', properties.Key != null ? cfn_parse.FromCloudFormation.getString(properties.Key) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-profileconfiguration.html
     */
    export interface ProfileConfigurationProperty {
        /**
         * `CfnJob.ProfileConfigurationProperty.ColumnStatisticsConfigurations`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-profileconfiguration.html#cfn-databrew-job-profileconfiguration-columnstatisticsconfigurations
         */
        readonly columnStatisticsConfigurations?: Array<CfnJob.ColumnStatisticsConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `CfnJob.ProfileConfigurationProperty.DatasetStatisticsConfiguration`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-profileconfiguration.html#cfn-databrew-job-profileconfiguration-datasetstatisticsconfiguration
         */
        readonly datasetStatisticsConfiguration?: CfnJob.StatisticsConfigurationProperty | cdk.IResolvable;
        /**
         * `CfnJob.ProfileConfigurationProperty.EntityDetectorConfiguration`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-profileconfiguration.html#cfn-databrew-job-profileconfiguration-entitydetectorconfiguration
         */
        readonly entityDetectorConfiguration?: CfnJob.EntityDetectorConfigurationProperty | cdk.IResolvable;
        /**
         * `CfnJob.ProfileConfigurationProperty.ProfileColumns`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-profileconfiguration.html#cfn-databrew-job-profileconfiguration-profilecolumns
         */
        readonly profileColumns?: Array<CfnJob.ColumnSelectorProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ProfileConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ProfileConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_ProfileConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('columnStatisticsConfigurations', cdk.listValidator(CfnJob_ColumnStatisticsConfigurationPropertyValidator))(properties.columnStatisticsConfigurations));
    errors.collect(cdk.propertyValidator('datasetStatisticsConfiguration', CfnJob_StatisticsConfigurationPropertyValidator)(properties.datasetStatisticsConfiguration));
    errors.collect(cdk.propertyValidator('entityDetectorConfiguration', CfnJob_EntityDetectorConfigurationPropertyValidator)(properties.entityDetectorConfiguration));
    errors.collect(cdk.propertyValidator('profileColumns', cdk.listValidator(CfnJob_ColumnSelectorPropertyValidator))(properties.profileColumns));
    return errors.wrap('supplied properties not correct for "ProfileConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.ProfileConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ProfileConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.ProfileConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnJobProfileConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_ProfileConfigurationPropertyValidator(properties).assertSuccess();
    return {
        ColumnStatisticsConfigurations: cdk.listMapper(cfnJobColumnStatisticsConfigurationPropertyToCloudFormation)(properties.columnStatisticsConfigurations),
        DatasetStatisticsConfiguration: cfnJobStatisticsConfigurationPropertyToCloudFormation(properties.datasetStatisticsConfiguration),
        EntityDetectorConfiguration: cfnJobEntityDetectorConfigurationPropertyToCloudFormation(properties.entityDetectorConfiguration),
        ProfileColumns: cdk.listMapper(cfnJobColumnSelectorPropertyToCloudFormation)(properties.profileColumns),
    };
}

// @ts-ignore TS6133
function CfnJobProfileConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.ProfileConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.ProfileConfigurationProperty>();
    ret.addPropertyResult('columnStatisticsConfigurations', 'ColumnStatisticsConfigurations', properties.ColumnStatisticsConfigurations != null ? cfn_parse.FromCloudFormation.getArray(CfnJobColumnStatisticsConfigurationPropertyFromCloudFormation)(properties.ColumnStatisticsConfigurations) : undefined);
    ret.addPropertyResult('datasetStatisticsConfiguration', 'DatasetStatisticsConfiguration', properties.DatasetStatisticsConfiguration != null ? CfnJobStatisticsConfigurationPropertyFromCloudFormation(properties.DatasetStatisticsConfiguration) : undefined);
    ret.addPropertyResult('entityDetectorConfiguration', 'EntityDetectorConfiguration', properties.EntityDetectorConfiguration != null ? CfnJobEntityDetectorConfigurationPropertyFromCloudFormation(properties.EntityDetectorConfiguration) : undefined);
    ret.addPropertyResult('profileColumns', 'ProfileColumns', properties.ProfileColumns != null ? cfn_parse.FromCloudFormation.getArray(CfnJobColumnSelectorPropertyFromCloudFormation)(properties.ProfileColumns) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-recipe.html
     */
    export interface RecipeProperty {
        /**
         * `CfnJob.RecipeProperty.Name`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-recipe.html#cfn-databrew-job-recipe-name
         */
        readonly name: string;
        /**
         * `CfnJob.RecipeProperty.Version`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-recipe.html#cfn-databrew-job-recipe-version
         */
        readonly version?: string;
    }
}

/**
 * Determine whether the given properties match those of a `RecipeProperty`
 *
 * @param properties - the TypeScript properties of a `RecipeProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_RecipePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('version', cdk.validateString)(properties.version));
    return errors.wrap('supplied properties not correct for "RecipeProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.Recipe` resource
 *
 * @param properties - the TypeScript properties of a `RecipeProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.Recipe` resource.
 */
// @ts-ignore TS6133
function cfnJobRecipePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_RecipePropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Version: cdk.stringToCloudFormation(properties.version),
    };
}

// @ts-ignore TS6133
function CfnJobRecipePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.RecipeProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.RecipeProperty>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('version', 'Version', properties.Version != null ? cfn_parse.FromCloudFormation.getString(properties.Version) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-s3location.html
     */
    export interface S3LocationProperty {
        /**
         * `CfnJob.S3LocationProperty.Bucket`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-s3location.html#cfn-databrew-job-s3location-bucket
         */
        readonly bucket: string;
        /**
         * `CfnJob.S3LocationProperty.BucketOwner`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-s3location.html#cfn-databrew-job-s3location-bucketowner
         */
        readonly bucketOwner?: string;
        /**
         * `CfnJob.S3LocationProperty.Key`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-s3location.html#cfn-databrew-job-s3location-key
         */
        readonly key?: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3LocationProperty`
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_S3LocationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucket', cdk.requiredValidator)(properties.bucket));
    errors.collect(cdk.propertyValidator('bucket', cdk.validateString)(properties.bucket));
    errors.collect(cdk.propertyValidator('bucketOwner', cdk.validateString)(properties.bucketOwner));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    return errors.wrap('supplied properties not correct for "S3LocationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.S3Location` resource
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.S3Location` resource.
 */
// @ts-ignore TS6133
function cfnJobS3LocationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_S3LocationPropertyValidator(properties).assertSuccess();
    return {
        Bucket: cdk.stringToCloudFormation(properties.bucket),
        BucketOwner: cdk.stringToCloudFormation(properties.bucketOwner),
        Key: cdk.stringToCloudFormation(properties.key),
    };
}

// @ts-ignore TS6133
function CfnJobS3LocationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.S3LocationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.S3LocationProperty>();
    ret.addPropertyResult('bucket', 'Bucket', cfn_parse.FromCloudFormation.getString(properties.Bucket));
    ret.addPropertyResult('bucketOwner', 'BucketOwner', properties.BucketOwner != null ? cfn_parse.FromCloudFormation.getString(properties.BucketOwner) : undefined);
    ret.addPropertyResult('key', 'Key', properties.Key != null ? cfn_parse.FromCloudFormation.getString(properties.Key) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-s3tableoutputoptions.html
     */
    export interface S3TableOutputOptionsProperty {
        /**
         * `CfnJob.S3TableOutputOptionsProperty.Location`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-s3tableoutputoptions.html#cfn-databrew-job-s3tableoutputoptions-location
         */
        readonly location: CfnJob.S3LocationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `S3TableOutputOptionsProperty`
 *
 * @param properties - the TypeScript properties of a `S3TableOutputOptionsProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_S3TableOutputOptionsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('location', cdk.requiredValidator)(properties.location));
    errors.collect(cdk.propertyValidator('location', CfnJob_S3LocationPropertyValidator)(properties.location));
    return errors.wrap('supplied properties not correct for "S3TableOutputOptionsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.S3TableOutputOptions` resource
 *
 * @param properties - the TypeScript properties of a `S3TableOutputOptionsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.S3TableOutputOptions` resource.
 */
// @ts-ignore TS6133
function cfnJobS3TableOutputOptionsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_S3TableOutputOptionsPropertyValidator(properties).assertSuccess();
    return {
        Location: cfnJobS3LocationPropertyToCloudFormation(properties.location),
    };
}

// @ts-ignore TS6133
function CfnJobS3TableOutputOptionsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.S3TableOutputOptionsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.S3TableOutputOptionsProperty>();
    ret.addPropertyResult('location', 'Location', CfnJobS3LocationPropertyFromCloudFormation(properties.Location));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-statisticoverride.html
     */
    export interface StatisticOverrideProperty {
        /**
         * `CfnJob.StatisticOverrideProperty.Parameters`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-statisticoverride.html#cfn-databrew-job-statisticoverride-parameters
         */
        readonly parameters: any | cdk.IResolvable | cdk.IResolvable;
        /**
         * `CfnJob.StatisticOverrideProperty.Statistic`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-statisticoverride.html#cfn-databrew-job-statisticoverride-statistic
         */
        readonly statistic: string;
    }
}

/**
 * Determine whether the given properties match those of a `StatisticOverrideProperty`
 *
 * @param properties - the TypeScript properties of a `StatisticOverrideProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_StatisticOverridePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('parameters', cdk.requiredValidator)(properties.parameters));
    errors.collect(cdk.propertyValidator('parameters', cdk.validateObject)(properties.parameters));
    errors.collect(cdk.propertyValidator('statistic', cdk.requiredValidator)(properties.statistic));
    errors.collect(cdk.propertyValidator('statistic', cdk.validateString)(properties.statistic));
    return errors.wrap('supplied properties not correct for "StatisticOverrideProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.StatisticOverride` resource
 *
 * @param properties - the TypeScript properties of a `StatisticOverrideProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.StatisticOverride` resource.
 */
// @ts-ignore TS6133
function cfnJobStatisticOverridePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_StatisticOverridePropertyValidator(properties).assertSuccess();
    return {
        Parameters: cdk.objectToCloudFormation(properties.parameters),
        Statistic: cdk.stringToCloudFormation(properties.statistic),
    };
}

// @ts-ignore TS6133
function CfnJobStatisticOverridePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.StatisticOverrideProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.StatisticOverrideProperty>();
    ret.addPropertyResult('parameters', 'Parameters', cfn_parse.FromCloudFormation.getAny(properties.Parameters));
    ret.addPropertyResult('statistic', 'Statistic', cfn_parse.FromCloudFormation.getString(properties.Statistic));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-statisticsconfiguration.html
     */
    export interface StatisticsConfigurationProperty {
        /**
         * `CfnJob.StatisticsConfigurationProperty.IncludedStatistics`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-statisticsconfiguration.html#cfn-databrew-job-statisticsconfiguration-includedstatistics
         */
        readonly includedStatistics?: string[];
        /**
         * `CfnJob.StatisticsConfigurationProperty.Overrides`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-statisticsconfiguration.html#cfn-databrew-job-statisticsconfiguration-overrides
         */
        readonly overrides?: Array<CfnJob.StatisticOverrideProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `StatisticsConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `StatisticsConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_StatisticsConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('includedStatistics', cdk.listValidator(cdk.validateString))(properties.includedStatistics));
    errors.collect(cdk.propertyValidator('overrides', cdk.listValidator(CfnJob_StatisticOverridePropertyValidator))(properties.overrides));
    return errors.wrap('supplied properties not correct for "StatisticsConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.StatisticsConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `StatisticsConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.StatisticsConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnJobStatisticsConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_StatisticsConfigurationPropertyValidator(properties).assertSuccess();
    return {
        IncludedStatistics: cdk.listMapper(cdk.stringToCloudFormation)(properties.includedStatistics),
        Overrides: cdk.listMapper(cfnJobStatisticOverridePropertyToCloudFormation)(properties.overrides),
    };
}

// @ts-ignore TS6133
function CfnJobStatisticsConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.StatisticsConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.StatisticsConfigurationProperty>();
    ret.addPropertyResult('includedStatistics', 'IncludedStatistics', properties.IncludedStatistics != null ? cfn_parse.FromCloudFormation.getStringArray(properties.IncludedStatistics) : undefined);
    ret.addPropertyResult('overrides', 'Overrides', properties.Overrides != null ? cfn_parse.FromCloudFormation.getArray(CfnJobStatisticOverridePropertyFromCloudFormation)(properties.Overrides) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-validationconfiguration.html
     */
    export interface ValidationConfigurationProperty {
        /**
         * `CfnJob.ValidationConfigurationProperty.RulesetArn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-validationconfiguration.html#cfn-databrew-job-validationconfiguration-rulesetarn
         */
        readonly rulesetArn: string;
        /**
         * `CfnJob.ValidationConfigurationProperty.ValidationMode`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-job-validationconfiguration.html#cfn-databrew-job-validationconfiguration-validationmode
         */
        readonly validationMode?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ValidationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ValidationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_ValidationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('rulesetArn', cdk.requiredValidator)(properties.rulesetArn));
    errors.collect(cdk.propertyValidator('rulesetArn', cdk.validateString)(properties.rulesetArn));
    errors.collect(cdk.propertyValidator('validationMode', cdk.validateString)(properties.validationMode));
    return errors.wrap('supplied properties not correct for "ValidationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Job.ValidationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ValidationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Job.ValidationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnJobValidationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_ValidationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        RulesetArn: cdk.stringToCloudFormation(properties.rulesetArn),
        ValidationMode: cdk.stringToCloudFormation(properties.validationMode),
    };
}

// @ts-ignore TS6133
function CfnJobValidationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.ValidationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.ValidationConfigurationProperty>();
    ret.addPropertyResult('rulesetArn', 'RulesetArn', cfn_parse.FromCloudFormation.getString(properties.RulesetArn));
    ret.addPropertyResult('validationMode', 'ValidationMode', properties.ValidationMode != null ? cfn_parse.FromCloudFormation.getString(properties.ValidationMode) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnProject`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-project.html
 */
export interface CfnProjectProps {

    /**
     * `AWS::DataBrew::Project.DatasetName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-project.html#cfn-databrew-project-datasetname
     */
    readonly datasetName: string;

    /**
     * `AWS::DataBrew::Project.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-project.html#cfn-databrew-project-name
     */
    readonly name: string;

    /**
     * `AWS::DataBrew::Project.RecipeName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-project.html#cfn-databrew-project-recipename
     */
    readonly recipeName: string;

    /**
     * `AWS::DataBrew::Project.RoleArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-project.html#cfn-databrew-project-rolearn
     */
    readonly roleArn: string;

    /**
     * `AWS::DataBrew::Project.Sample`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-project.html#cfn-databrew-project-sample
     */
    readonly sample?: CfnProject.SampleProperty | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Project.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-project.html#cfn-databrew-project-tags
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
    errors.collect(cdk.propertyValidator('datasetName', cdk.requiredValidator)(properties.datasetName));
    errors.collect(cdk.propertyValidator('datasetName', cdk.validateString)(properties.datasetName));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('recipeName', cdk.requiredValidator)(properties.recipeName));
    errors.collect(cdk.propertyValidator('recipeName', cdk.validateString)(properties.recipeName));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('sample', CfnProject_SamplePropertyValidator)(properties.sample));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnProjectProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Project` resource
 *
 * @param properties - the TypeScript properties of a `CfnProjectProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Project` resource.
 */
// @ts-ignore TS6133
function cfnProjectPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnProjectPropsValidator(properties).assertSuccess();
    return {
        DatasetName: cdk.stringToCloudFormation(properties.datasetName),
        Name: cdk.stringToCloudFormation(properties.name),
        RecipeName: cdk.stringToCloudFormation(properties.recipeName),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        Sample: cfnProjectSamplePropertyToCloudFormation(properties.sample),
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
    ret.addPropertyResult('datasetName', 'DatasetName', cfn_parse.FromCloudFormation.getString(properties.DatasetName));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('recipeName', 'RecipeName', cfn_parse.FromCloudFormation.getString(properties.RecipeName));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('sample', 'Sample', properties.Sample != null ? CfnProjectSamplePropertyFromCloudFormation(properties.Sample) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::DataBrew::Project`
 *
 *
 *
 * @cloudformationResource AWS::DataBrew::Project
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-project.html
 */
export class CfnProject extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::DataBrew::Project";

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
     * `AWS::DataBrew::Project.DatasetName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-project.html#cfn-databrew-project-datasetname
     */
    public datasetName: string;

    /**
     * `AWS::DataBrew::Project.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-project.html#cfn-databrew-project-name
     */
    public name: string;

    /**
     * `AWS::DataBrew::Project.RecipeName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-project.html#cfn-databrew-project-recipename
     */
    public recipeName: string;

    /**
     * `AWS::DataBrew::Project.RoleArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-project.html#cfn-databrew-project-rolearn
     */
    public roleArn: string;

    /**
     * `AWS::DataBrew::Project.Sample`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-project.html#cfn-databrew-project-sample
     */
    public sample: CfnProject.SampleProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::DataBrew::Project.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-project.html#cfn-databrew-project-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::DataBrew::Project`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnProjectProps) {
        super(scope, id, { type: CfnProject.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'datasetName', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'recipeName', this);
        cdk.requireProperty(props, 'roleArn', this);

        this.datasetName = props.datasetName;
        this.name = props.name;
        this.recipeName = props.recipeName;
        this.roleArn = props.roleArn;
        this.sample = props.sample;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::DataBrew::Project", props.tags, { tagPropertyName: 'tags' });
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
            datasetName: this.datasetName,
            name: this.name,
            recipeName: this.recipeName,
            roleArn: this.roleArn,
            sample: this.sample,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnProjectPropsToCloudFormation(props);
    }
}

export namespace CfnProject {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-project-sample.html
     */
    export interface SampleProperty {
        /**
         * `CfnProject.SampleProperty.Size`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-project-sample.html#cfn-databrew-project-sample-size
         */
        readonly size?: number;
        /**
         * `CfnProject.SampleProperty.Type`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-project-sample.html#cfn-databrew-project-sample-type
         */
        readonly type: string;
    }
}

/**
 * Determine whether the given properties match those of a `SampleProperty`
 *
 * @param properties - the TypeScript properties of a `SampleProperty`
 *
 * @returns the result of the validation.
 */
function CfnProject_SamplePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('size', cdk.validateNumber)(properties.size));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "SampleProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Project.Sample` resource
 *
 * @param properties - the TypeScript properties of a `SampleProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Project.Sample` resource.
 */
// @ts-ignore TS6133
function cfnProjectSamplePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnProject_SamplePropertyValidator(properties).assertSuccess();
    return {
        Size: cdk.numberToCloudFormation(properties.size),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnProjectSamplePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnProject.SampleProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnProject.SampleProperty>();
    ret.addPropertyResult('size', 'Size', properties.Size != null ? cfn_parse.FromCloudFormation.getNumber(properties.Size) : undefined);
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnRecipe`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-recipe.html
 */
export interface CfnRecipeProps {

    /**
     * `AWS::DataBrew::Recipe.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-recipe.html#cfn-databrew-recipe-name
     */
    readonly name: string;

    /**
     * `AWS::DataBrew::Recipe.Steps`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-recipe.html#cfn-databrew-recipe-steps
     */
    readonly steps: Array<CfnRecipe.RecipeStepProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Recipe.Description`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-recipe.html#cfn-databrew-recipe-description
     */
    readonly description?: string;

    /**
     * `AWS::DataBrew::Recipe.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-recipe.html#cfn-databrew-recipe-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnRecipeProps`
 *
 * @param properties - the TypeScript properties of a `CfnRecipeProps`
 *
 * @returns the result of the validation.
 */
function CfnRecipePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('steps', cdk.requiredValidator)(properties.steps));
    errors.collect(cdk.propertyValidator('steps', cdk.listValidator(CfnRecipe_RecipeStepPropertyValidator))(properties.steps));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnRecipeProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Recipe` resource
 *
 * @param properties - the TypeScript properties of a `CfnRecipeProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Recipe` resource.
 */
// @ts-ignore TS6133
function cfnRecipePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRecipePropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Steps: cdk.listMapper(cfnRecipeRecipeStepPropertyToCloudFormation)(properties.steps),
        Description: cdk.stringToCloudFormation(properties.description),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnRecipePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRecipeProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRecipeProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('steps', 'Steps', cfn_parse.FromCloudFormation.getArray(CfnRecipeRecipeStepPropertyFromCloudFormation)(properties.Steps));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::DataBrew::Recipe`
 *
 *
 *
 * @cloudformationResource AWS::DataBrew::Recipe
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-recipe.html
 */
export class CfnRecipe extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::DataBrew::Recipe";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnRecipe {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnRecipePropsFromCloudFormation(resourceProperties);
        const ret = new CfnRecipe(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * `AWS::DataBrew::Recipe.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-recipe.html#cfn-databrew-recipe-name
     */
    public name: string;

    /**
     * `AWS::DataBrew::Recipe.Steps`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-recipe.html#cfn-databrew-recipe-steps
     */
    public steps: Array<CfnRecipe.RecipeStepProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Recipe.Description`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-recipe.html#cfn-databrew-recipe-description
     */
    public description: string | undefined;

    /**
     * `AWS::DataBrew::Recipe.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-recipe.html#cfn-databrew-recipe-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::DataBrew::Recipe`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnRecipeProps) {
        super(scope, id, { type: CfnRecipe.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'steps', this);

        this.name = props.name;
        this.steps = props.steps;
        this.description = props.description;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::DataBrew::Recipe", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnRecipe.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            steps: this.steps,
            description: this.description,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnRecipePropsToCloudFormation(props);
    }
}

export namespace CfnRecipe {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-action.html
     */
    export interface ActionProperty {
        /**
         * `CfnRecipe.ActionProperty.Operation`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-action.html#cfn-databrew-recipe-action-operation
         */
        readonly operation: string;
        /**
         * `CfnRecipe.ActionProperty.Parameters`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-action.html#cfn-databrew-recipe-action-parameters
         */
        readonly parameters?: { [key: string]: (string) } | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ActionProperty`
 *
 * @param properties - the TypeScript properties of a `ActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnRecipe_ActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('operation', cdk.requiredValidator)(properties.operation));
    errors.collect(cdk.propertyValidator('operation', cdk.validateString)(properties.operation));
    errors.collect(cdk.propertyValidator('parameters', cdk.hashValidator(cdk.validateString))(properties.parameters));
    return errors.wrap('supplied properties not correct for "ActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Recipe.Action` resource
 *
 * @param properties - the TypeScript properties of a `ActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Recipe.Action` resource.
 */
// @ts-ignore TS6133
function cfnRecipeActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRecipe_ActionPropertyValidator(properties).assertSuccess();
    return {
        Operation: cdk.stringToCloudFormation(properties.operation),
        Parameters: cdk.hashMapper(cdk.stringToCloudFormation)(properties.parameters),
    };
}

// @ts-ignore TS6133
function CfnRecipeActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRecipe.ActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRecipe.ActionProperty>();
    ret.addPropertyResult('operation', 'Operation', cfn_parse.FromCloudFormation.getString(properties.Operation));
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Parameters) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnRecipe {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-conditionexpression.html
     */
    export interface ConditionExpressionProperty {
        /**
         * `CfnRecipe.ConditionExpressionProperty.Condition`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-conditionexpression.html#cfn-databrew-recipe-conditionexpression-condition
         */
        readonly condition: string;
        /**
         * `CfnRecipe.ConditionExpressionProperty.TargetColumn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-conditionexpression.html#cfn-databrew-recipe-conditionexpression-targetcolumn
         */
        readonly targetColumn: string;
        /**
         * `CfnRecipe.ConditionExpressionProperty.Value`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-conditionexpression.html#cfn-databrew-recipe-conditionexpression-value
         */
        readonly value?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConditionExpressionProperty`
 *
 * @param properties - the TypeScript properties of a `ConditionExpressionProperty`
 *
 * @returns the result of the validation.
 */
function CfnRecipe_ConditionExpressionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('condition', cdk.requiredValidator)(properties.condition));
    errors.collect(cdk.propertyValidator('condition', cdk.validateString)(properties.condition));
    errors.collect(cdk.propertyValidator('targetColumn', cdk.requiredValidator)(properties.targetColumn));
    errors.collect(cdk.propertyValidator('targetColumn', cdk.validateString)(properties.targetColumn));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "ConditionExpressionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Recipe.ConditionExpression` resource
 *
 * @param properties - the TypeScript properties of a `ConditionExpressionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Recipe.ConditionExpression` resource.
 */
// @ts-ignore TS6133
function cfnRecipeConditionExpressionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRecipe_ConditionExpressionPropertyValidator(properties).assertSuccess();
    return {
        Condition: cdk.stringToCloudFormation(properties.condition),
        TargetColumn: cdk.stringToCloudFormation(properties.targetColumn),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnRecipeConditionExpressionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRecipe.ConditionExpressionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRecipe.ConditionExpressionProperty>();
    ret.addPropertyResult('condition', 'Condition', cfn_parse.FromCloudFormation.getString(properties.Condition));
    ret.addPropertyResult('targetColumn', 'TargetColumn', cfn_parse.FromCloudFormation.getString(properties.TargetColumn));
    ret.addPropertyResult('value', 'Value', properties.Value != null ? cfn_parse.FromCloudFormation.getString(properties.Value) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnRecipe {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-datacataloginputdefinition.html
     */
    export interface DataCatalogInputDefinitionProperty {
        /**
         * `CfnRecipe.DataCatalogInputDefinitionProperty.CatalogId`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-datacataloginputdefinition.html#cfn-databrew-recipe-datacataloginputdefinition-catalogid
         */
        readonly catalogId?: string;
        /**
         * `CfnRecipe.DataCatalogInputDefinitionProperty.DatabaseName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-datacataloginputdefinition.html#cfn-databrew-recipe-datacataloginputdefinition-databasename
         */
        readonly databaseName?: string;
        /**
         * `CfnRecipe.DataCatalogInputDefinitionProperty.TableName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-datacataloginputdefinition.html#cfn-databrew-recipe-datacataloginputdefinition-tablename
         */
        readonly tableName?: string;
        /**
         * `CfnRecipe.DataCatalogInputDefinitionProperty.TempDirectory`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-datacataloginputdefinition.html#cfn-databrew-recipe-datacataloginputdefinition-tempdirectory
         */
        readonly tempDirectory?: CfnRecipe.S3LocationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DataCatalogInputDefinitionProperty`
 *
 * @param properties - the TypeScript properties of a `DataCatalogInputDefinitionProperty`
 *
 * @returns the result of the validation.
 */
function CfnRecipe_DataCatalogInputDefinitionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    errors.collect(cdk.propertyValidator('tempDirectory', CfnRecipe_S3LocationPropertyValidator)(properties.tempDirectory));
    return errors.wrap('supplied properties not correct for "DataCatalogInputDefinitionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Recipe.DataCatalogInputDefinition` resource
 *
 * @param properties - the TypeScript properties of a `DataCatalogInputDefinitionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Recipe.DataCatalogInputDefinition` resource.
 */
// @ts-ignore TS6133
function cfnRecipeDataCatalogInputDefinitionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRecipe_DataCatalogInputDefinitionPropertyValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
        TableName: cdk.stringToCloudFormation(properties.tableName),
        TempDirectory: cfnRecipeS3LocationPropertyToCloudFormation(properties.tempDirectory),
    };
}

// @ts-ignore TS6133
function CfnRecipeDataCatalogInputDefinitionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRecipe.DataCatalogInputDefinitionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRecipe.DataCatalogInputDefinitionProperty>();
    ret.addPropertyResult('catalogId', 'CatalogId', properties.CatalogId != null ? cfn_parse.FromCloudFormation.getString(properties.CatalogId) : undefined);
    ret.addPropertyResult('databaseName', 'DatabaseName', properties.DatabaseName != null ? cfn_parse.FromCloudFormation.getString(properties.DatabaseName) : undefined);
    ret.addPropertyResult('tableName', 'TableName', properties.TableName != null ? cfn_parse.FromCloudFormation.getString(properties.TableName) : undefined);
    ret.addPropertyResult('tempDirectory', 'TempDirectory', properties.TempDirectory != null ? CfnRecipeS3LocationPropertyFromCloudFormation(properties.TempDirectory) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnRecipe {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html
     */
    export interface RecipeParametersProperty {
        /**
         * `CfnRecipe.RecipeParametersProperty.AggregateFunction`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-aggregatefunction
         */
        readonly aggregateFunction?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Base`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-base
         */
        readonly base?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.CaseStatement`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-casestatement
         */
        readonly caseStatement?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.CategoryMap`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-categorymap
         */
        readonly categoryMap?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.CharsToRemove`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-charstoremove
         */
        readonly charsToRemove?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.CollapseConsecutiveWhitespace`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-collapseconsecutivewhitespace
         */
        readonly collapseConsecutiveWhitespace?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.ColumnDataType`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-columndatatype
         */
        readonly columnDataType?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.ColumnRange`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-columnrange
         */
        readonly columnRange?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Count`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-count
         */
        readonly count?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.CustomCharacters`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-customcharacters
         */
        readonly customCharacters?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.CustomStopWords`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-customstopwords
         */
        readonly customStopWords?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.CustomValue`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-customvalue
         */
        readonly customValue?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.DatasetsColumns`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-datasetscolumns
         */
        readonly datasetsColumns?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.DateAddValue`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-dateaddvalue
         */
        readonly dateAddValue?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.DateTimeFormat`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-datetimeformat
         */
        readonly dateTimeFormat?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.DateTimeParameters`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-datetimeparameters
         */
        readonly dateTimeParameters?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.DeleteOtherRows`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-deleteotherrows
         */
        readonly deleteOtherRows?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Delimiter`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-delimiter
         */
        readonly delimiter?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.EndPattern`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-endpattern
         */
        readonly endPattern?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.EndPosition`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-endposition
         */
        readonly endPosition?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.EndValue`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-endvalue
         */
        readonly endValue?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.ExpandContractions`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-expandcontractions
         */
        readonly expandContractions?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Exponent`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-exponent
         */
        readonly exponent?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.FalseString`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-falsestring
         */
        readonly falseString?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.GroupByAggFunctionOptions`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-groupbyaggfunctionoptions
         */
        readonly groupByAggFunctionOptions?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.GroupByColumns`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-groupbycolumns
         */
        readonly groupByColumns?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.HiddenColumns`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-hiddencolumns
         */
        readonly hiddenColumns?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.IgnoreCase`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-ignorecase
         */
        readonly ignoreCase?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.IncludeInSplit`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-includeinsplit
         */
        readonly includeInSplit?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Input`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-input
         */
        readonly input?: any | cdk.IResolvable;
        /**
         * `CfnRecipe.RecipeParametersProperty.Interval`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-interval
         */
        readonly interval?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.IsText`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-istext
         */
        readonly isText?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.JoinKeys`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-joinkeys
         */
        readonly joinKeys?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.JoinType`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-jointype
         */
        readonly joinType?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.LeftColumns`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-leftcolumns
         */
        readonly leftColumns?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Limit`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-limit
         */
        readonly limit?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.LowerBound`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-lowerbound
         */
        readonly lowerBound?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.MapType`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-maptype
         */
        readonly mapType?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.ModeType`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-modetype
         */
        readonly modeType?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.MultiLine`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-multiline
         */
        readonly multiLine?: boolean | cdk.IResolvable;
        /**
         * `CfnRecipe.RecipeParametersProperty.NumRows`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-numrows
         */
        readonly numRows?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.NumRowsAfter`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-numrowsafter
         */
        readonly numRowsAfter?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.NumRowsBefore`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-numrowsbefore
         */
        readonly numRowsBefore?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.OrderByColumn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-orderbycolumn
         */
        readonly orderByColumn?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.OrderByColumns`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-orderbycolumns
         */
        readonly orderByColumns?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Other`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-other
         */
        readonly other?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Pattern`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-pattern
         */
        readonly pattern?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.PatternOption1`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-patternoption1
         */
        readonly patternOption1?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.PatternOption2`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-patternoption2
         */
        readonly patternOption2?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.PatternOptions`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-patternoptions
         */
        readonly patternOptions?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Period`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-period
         */
        readonly period?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Position`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-position
         */
        readonly position?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.RemoveAllPunctuation`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-removeallpunctuation
         */
        readonly removeAllPunctuation?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.RemoveAllQuotes`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-removeallquotes
         */
        readonly removeAllQuotes?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.RemoveAllWhitespace`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-removeallwhitespace
         */
        readonly removeAllWhitespace?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.RemoveCustomCharacters`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-removecustomcharacters
         */
        readonly removeCustomCharacters?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.RemoveCustomValue`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-removecustomvalue
         */
        readonly removeCustomValue?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.RemoveLeadingAndTrailingPunctuation`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-removeleadingandtrailingpunctuation
         */
        readonly removeLeadingAndTrailingPunctuation?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.RemoveLeadingAndTrailingQuotes`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-removeleadingandtrailingquotes
         */
        readonly removeLeadingAndTrailingQuotes?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.RemoveLeadingAndTrailingWhitespace`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-removeleadingandtrailingwhitespace
         */
        readonly removeLeadingAndTrailingWhitespace?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.RemoveLetters`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-removeletters
         */
        readonly removeLetters?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.RemoveNumbers`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-removenumbers
         */
        readonly removeNumbers?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.RemoveSourceColumn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-removesourcecolumn
         */
        readonly removeSourceColumn?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.RemoveSpecialCharacters`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-removespecialcharacters
         */
        readonly removeSpecialCharacters?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.RightColumns`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-rightcolumns
         */
        readonly rightColumns?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.SampleSize`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-samplesize
         */
        readonly sampleSize?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.SampleType`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-sampletype
         */
        readonly sampleType?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.SecondInput`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-secondinput
         */
        readonly secondInput?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.SecondaryInputs`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-secondaryinputs
         */
        readonly secondaryInputs?: Array<CfnRecipe.SecondaryInputProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `CfnRecipe.RecipeParametersProperty.SheetIndexes`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-sheetindexes
         */
        readonly sheetIndexes?: number[] | cdk.IResolvable;
        /**
         * `CfnRecipe.RecipeParametersProperty.SheetNames`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-sheetnames
         */
        readonly sheetNames?: string[];
        /**
         * `CfnRecipe.RecipeParametersProperty.SourceColumn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-sourcecolumn
         */
        readonly sourceColumn?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.SourceColumn1`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-sourcecolumn1
         */
        readonly sourceColumn1?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.SourceColumn2`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-sourcecolumn2
         */
        readonly sourceColumn2?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.SourceColumns`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-sourcecolumns
         */
        readonly sourceColumns?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.StartColumnIndex`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-startcolumnindex
         */
        readonly startColumnIndex?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.StartPattern`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-startpattern
         */
        readonly startPattern?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.StartPosition`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-startposition
         */
        readonly startPosition?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.StartValue`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-startvalue
         */
        readonly startValue?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.StemmingMode`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-stemmingmode
         */
        readonly stemmingMode?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.StepCount`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-stepcount
         */
        readonly stepCount?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.StepIndex`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-stepindex
         */
        readonly stepIndex?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.StopWordsMode`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-stopwordsmode
         */
        readonly stopWordsMode?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Strategy`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-strategy
         */
        readonly strategy?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.TargetColumn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-targetcolumn
         */
        readonly targetColumn?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.TargetColumnNames`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-targetcolumnnames
         */
        readonly targetColumnNames?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.TargetDateFormat`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-targetdateformat
         */
        readonly targetDateFormat?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.TargetIndex`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-targetindex
         */
        readonly targetIndex?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.TimeZone`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-timezone
         */
        readonly timeZone?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.TokenizerPattern`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-tokenizerpattern
         */
        readonly tokenizerPattern?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.TrueString`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-truestring
         */
        readonly trueString?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.UdfLang`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-udflang
         */
        readonly udfLang?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Units`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-units
         */
        readonly units?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.UnpivotColumn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-unpivotcolumn
         */
        readonly unpivotColumn?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.UpperBound`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-upperbound
         */
        readonly upperBound?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.UseNewDataFrame`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-usenewdataframe
         */
        readonly useNewDataFrame?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Value`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-value
         */
        readonly value?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Value1`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-value1
         */
        readonly value1?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.Value2`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-value2
         */
        readonly value2?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.ValueColumn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-valuecolumn
         */
        readonly valueColumn?: string;
        /**
         * `CfnRecipe.RecipeParametersProperty.ViewFrame`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipeparameters.html#cfn-databrew-recipe-recipeparameters-viewframe
         */
        readonly viewFrame?: string;
    }
}

/**
 * Determine whether the given properties match those of a `RecipeParametersProperty`
 *
 * @param properties - the TypeScript properties of a `RecipeParametersProperty`
 *
 * @returns the result of the validation.
 */
function CfnRecipe_RecipeParametersPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('aggregateFunction', cdk.validateString)(properties.aggregateFunction));
    errors.collect(cdk.propertyValidator('base', cdk.validateString)(properties.base));
    errors.collect(cdk.propertyValidator('caseStatement', cdk.validateString)(properties.caseStatement));
    errors.collect(cdk.propertyValidator('categoryMap', cdk.validateString)(properties.categoryMap));
    errors.collect(cdk.propertyValidator('charsToRemove', cdk.validateString)(properties.charsToRemove));
    errors.collect(cdk.propertyValidator('collapseConsecutiveWhitespace', cdk.validateString)(properties.collapseConsecutiveWhitespace));
    errors.collect(cdk.propertyValidator('columnDataType', cdk.validateString)(properties.columnDataType));
    errors.collect(cdk.propertyValidator('columnRange', cdk.validateString)(properties.columnRange));
    errors.collect(cdk.propertyValidator('count', cdk.validateString)(properties.count));
    errors.collect(cdk.propertyValidator('customCharacters', cdk.validateString)(properties.customCharacters));
    errors.collect(cdk.propertyValidator('customStopWords', cdk.validateString)(properties.customStopWords));
    errors.collect(cdk.propertyValidator('customValue', cdk.validateString)(properties.customValue));
    errors.collect(cdk.propertyValidator('datasetsColumns', cdk.validateString)(properties.datasetsColumns));
    errors.collect(cdk.propertyValidator('dateAddValue', cdk.validateString)(properties.dateAddValue));
    errors.collect(cdk.propertyValidator('dateTimeFormat', cdk.validateString)(properties.dateTimeFormat));
    errors.collect(cdk.propertyValidator('dateTimeParameters', cdk.validateString)(properties.dateTimeParameters));
    errors.collect(cdk.propertyValidator('deleteOtherRows', cdk.validateString)(properties.deleteOtherRows));
    errors.collect(cdk.propertyValidator('delimiter', cdk.validateString)(properties.delimiter));
    errors.collect(cdk.propertyValidator('endPattern', cdk.validateString)(properties.endPattern));
    errors.collect(cdk.propertyValidator('endPosition', cdk.validateString)(properties.endPosition));
    errors.collect(cdk.propertyValidator('endValue', cdk.validateString)(properties.endValue));
    errors.collect(cdk.propertyValidator('expandContractions', cdk.validateString)(properties.expandContractions));
    errors.collect(cdk.propertyValidator('exponent', cdk.validateString)(properties.exponent));
    errors.collect(cdk.propertyValidator('falseString', cdk.validateString)(properties.falseString));
    errors.collect(cdk.propertyValidator('groupByAggFunctionOptions', cdk.validateString)(properties.groupByAggFunctionOptions));
    errors.collect(cdk.propertyValidator('groupByColumns', cdk.validateString)(properties.groupByColumns));
    errors.collect(cdk.propertyValidator('hiddenColumns', cdk.validateString)(properties.hiddenColumns));
    errors.collect(cdk.propertyValidator('ignoreCase', cdk.validateString)(properties.ignoreCase));
    errors.collect(cdk.propertyValidator('includeInSplit', cdk.validateString)(properties.includeInSplit));
    errors.collect(cdk.propertyValidator('input', cdk.validateObject)(properties.input));
    errors.collect(cdk.propertyValidator('interval', cdk.validateString)(properties.interval));
    errors.collect(cdk.propertyValidator('isText', cdk.validateString)(properties.isText));
    errors.collect(cdk.propertyValidator('joinKeys', cdk.validateString)(properties.joinKeys));
    errors.collect(cdk.propertyValidator('joinType', cdk.validateString)(properties.joinType));
    errors.collect(cdk.propertyValidator('leftColumns', cdk.validateString)(properties.leftColumns));
    errors.collect(cdk.propertyValidator('limit', cdk.validateString)(properties.limit));
    errors.collect(cdk.propertyValidator('lowerBound', cdk.validateString)(properties.lowerBound));
    errors.collect(cdk.propertyValidator('mapType', cdk.validateString)(properties.mapType));
    errors.collect(cdk.propertyValidator('modeType', cdk.validateString)(properties.modeType));
    errors.collect(cdk.propertyValidator('multiLine', cdk.validateBoolean)(properties.multiLine));
    errors.collect(cdk.propertyValidator('numRows', cdk.validateString)(properties.numRows));
    errors.collect(cdk.propertyValidator('numRowsAfter', cdk.validateString)(properties.numRowsAfter));
    errors.collect(cdk.propertyValidator('numRowsBefore', cdk.validateString)(properties.numRowsBefore));
    errors.collect(cdk.propertyValidator('orderByColumn', cdk.validateString)(properties.orderByColumn));
    errors.collect(cdk.propertyValidator('orderByColumns', cdk.validateString)(properties.orderByColumns));
    errors.collect(cdk.propertyValidator('other', cdk.validateString)(properties.other));
    errors.collect(cdk.propertyValidator('pattern', cdk.validateString)(properties.pattern));
    errors.collect(cdk.propertyValidator('patternOption1', cdk.validateString)(properties.patternOption1));
    errors.collect(cdk.propertyValidator('patternOption2', cdk.validateString)(properties.patternOption2));
    errors.collect(cdk.propertyValidator('patternOptions', cdk.validateString)(properties.patternOptions));
    errors.collect(cdk.propertyValidator('period', cdk.validateString)(properties.period));
    errors.collect(cdk.propertyValidator('position', cdk.validateString)(properties.position));
    errors.collect(cdk.propertyValidator('removeAllPunctuation', cdk.validateString)(properties.removeAllPunctuation));
    errors.collect(cdk.propertyValidator('removeAllQuotes', cdk.validateString)(properties.removeAllQuotes));
    errors.collect(cdk.propertyValidator('removeAllWhitespace', cdk.validateString)(properties.removeAllWhitespace));
    errors.collect(cdk.propertyValidator('removeCustomCharacters', cdk.validateString)(properties.removeCustomCharacters));
    errors.collect(cdk.propertyValidator('removeCustomValue', cdk.validateString)(properties.removeCustomValue));
    errors.collect(cdk.propertyValidator('removeLeadingAndTrailingPunctuation', cdk.validateString)(properties.removeLeadingAndTrailingPunctuation));
    errors.collect(cdk.propertyValidator('removeLeadingAndTrailingQuotes', cdk.validateString)(properties.removeLeadingAndTrailingQuotes));
    errors.collect(cdk.propertyValidator('removeLeadingAndTrailingWhitespace', cdk.validateString)(properties.removeLeadingAndTrailingWhitespace));
    errors.collect(cdk.propertyValidator('removeLetters', cdk.validateString)(properties.removeLetters));
    errors.collect(cdk.propertyValidator('removeNumbers', cdk.validateString)(properties.removeNumbers));
    errors.collect(cdk.propertyValidator('removeSourceColumn', cdk.validateString)(properties.removeSourceColumn));
    errors.collect(cdk.propertyValidator('removeSpecialCharacters', cdk.validateString)(properties.removeSpecialCharacters));
    errors.collect(cdk.propertyValidator('rightColumns', cdk.validateString)(properties.rightColumns));
    errors.collect(cdk.propertyValidator('sampleSize', cdk.validateString)(properties.sampleSize));
    errors.collect(cdk.propertyValidator('sampleType', cdk.validateString)(properties.sampleType));
    errors.collect(cdk.propertyValidator('secondInput', cdk.validateString)(properties.secondInput));
    errors.collect(cdk.propertyValidator('secondaryInputs', cdk.listValidator(CfnRecipe_SecondaryInputPropertyValidator))(properties.secondaryInputs));
    errors.collect(cdk.propertyValidator('sheetIndexes', cdk.listValidator(cdk.validateNumber))(properties.sheetIndexes));
    errors.collect(cdk.propertyValidator('sheetNames', cdk.listValidator(cdk.validateString))(properties.sheetNames));
    errors.collect(cdk.propertyValidator('sourceColumn', cdk.validateString)(properties.sourceColumn));
    errors.collect(cdk.propertyValidator('sourceColumn1', cdk.validateString)(properties.sourceColumn1));
    errors.collect(cdk.propertyValidator('sourceColumn2', cdk.validateString)(properties.sourceColumn2));
    errors.collect(cdk.propertyValidator('sourceColumns', cdk.validateString)(properties.sourceColumns));
    errors.collect(cdk.propertyValidator('startColumnIndex', cdk.validateString)(properties.startColumnIndex));
    errors.collect(cdk.propertyValidator('startPattern', cdk.validateString)(properties.startPattern));
    errors.collect(cdk.propertyValidator('startPosition', cdk.validateString)(properties.startPosition));
    errors.collect(cdk.propertyValidator('startValue', cdk.validateString)(properties.startValue));
    errors.collect(cdk.propertyValidator('stemmingMode', cdk.validateString)(properties.stemmingMode));
    errors.collect(cdk.propertyValidator('stepCount', cdk.validateString)(properties.stepCount));
    errors.collect(cdk.propertyValidator('stepIndex', cdk.validateString)(properties.stepIndex));
    errors.collect(cdk.propertyValidator('stopWordsMode', cdk.validateString)(properties.stopWordsMode));
    errors.collect(cdk.propertyValidator('strategy', cdk.validateString)(properties.strategy));
    errors.collect(cdk.propertyValidator('targetColumn', cdk.validateString)(properties.targetColumn));
    errors.collect(cdk.propertyValidator('targetColumnNames', cdk.validateString)(properties.targetColumnNames));
    errors.collect(cdk.propertyValidator('targetDateFormat', cdk.validateString)(properties.targetDateFormat));
    errors.collect(cdk.propertyValidator('targetIndex', cdk.validateString)(properties.targetIndex));
    errors.collect(cdk.propertyValidator('timeZone', cdk.validateString)(properties.timeZone));
    errors.collect(cdk.propertyValidator('tokenizerPattern', cdk.validateString)(properties.tokenizerPattern));
    errors.collect(cdk.propertyValidator('trueString', cdk.validateString)(properties.trueString));
    errors.collect(cdk.propertyValidator('udfLang', cdk.validateString)(properties.udfLang));
    errors.collect(cdk.propertyValidator('units', cdk.validateString)(properties.units));
    errors.collect(cdk.propertyValidator('unpivotColumn', cdk.validateString)(properties.unpivotColumn));
    errors.collect(cdk.propertyValidator('upperBound', cdk.validateString)(properties.upperBound));
    errors.collect(cdk.propertyValidator('useNewDataFrame', cdk.validateString)(properties.useNewDataFrame));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    errors.collect(cdk.propertyValidator('value1', cdk.validateString)(properties.value1));
    errors.collect(cdk.propertyValidator('value2', cdk.validateString)(properties.value2));
    errors.collect(cdk.propertyValidator('valueColumn', cdk.validateString)(properties.valueColumn));
    errors.collect(cdk.propertyValidator('viewFrame', cdk.validateString)(properties.viewFrame));
    return errors.wrap('supplied properties not correct for "RecipeParametersProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Recipe.RecipeParameters` resource
 *
 * @param properties - the TypeScript properties of a `RecipeParametersProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Recipe.RecipeParameters` resource.
 */
// @ts-ignore TS6133
function cfnRecipeRecipeParametersPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRecipe_RecipeParametersPropertyValidator(properties).assertSuccess();
    return {
        AggregateFunction: cdk.stringToCloudFormation(properties.aggregateFunction),
        Base: cdk.stringToCloudFormation(properties.base),
        CaseStatement: cdk.stringToCloudFormation(properties.caseStatement),
        CategoryMap: cdk.stringToCloudFormation(properties.categoryMap),
        CharsToRemove: cdk.stringToCloudFormation(properties.charsToRemove),
        CollapseConsecutiveWhitespace: cdk.stringToCloudFormation(properties.collapseConsecutiveWhitespace),
        ColumnDataType: cdk.stringToCloudFormation(properties.columnDataType),
        ColumnRange: cdk.stringToCloudFormation(properties.columnRange),
        Count: cdk.stringToCloudFormation(properties.count),
        CustomCharacters: cdk.stringToCloudFormation(properties.customCharacters),
        CustomStopWords: cdk.stringToCloudFormation(properties.customStopWords),
        CustomValue: cdk.stringToCloudFormation(properties.customValue),
        DatasetsColumns: cdk.stringToCloudFormation(properties.datasetsColumns),
        DateAddValue: cdk.stringToCloudFormation(properties.dateAddValue),
        DateTimeFormat: cdk.stringToCloudFormation(properties.dateTimeFormat),
        DateTimeParameters: cdk.stringToCloudFormation(properties.dateTimeParameters),
        DeleteOtherRows: cdk.stringToCloudFormation(properties.deleteOtherRows),
        Delimiter: cdk.stringToCloudFormation(properties.delimiter),
        EndPattern: cdk.stringToCloudFormation(properties.endPattern),
        EndPosition: cdk.stringToCloudFormation(properties.endPosition),
        EndValue: cdk.stringToCloudFormation(properties.endValue),
        ExpandContractions: cdk.stringToCloudFormation(properties.expandContractions),
        Exponent: cdk.stringToCloudFormation(properties.exponent),
        FalseString: cdk.stringToCloudFormation(properties.falseString),
        GroupByAggFunctionOptions: cdk.stringToCloudFormation(properties.groupByAggFunctionOptions),
        GroupByColumns: cdk.stringToCloudFormation(properties.groupByColumns),
        HiddenColumns: cdk.stringToCloudFormation(properties.hiddenColumns),
        IgnoreCase: cdk.stringToCloudFormation(properties.ignoreCase),
        IncludeInSplit: cdk.stringToCloudFormation(properties.includeInSplit),
        Input: cdk.objectToCloudFormation(properties.input),
        Interval: cdk.stringToCloudFormation(properties.interval),
        IsText: cdk.stringToCloudFormation(properties.isText),
        JoinKeys: cdk.stringToCloudFormation(properties.joinKeys),
        JoinType: cdk.stringToCloudFormation(properties.joinType),
        LeftColumns: cdk.stringToCloudFormation(properties.leftColumns),
        Limit: cdk.stringToCloudFormation(properties.limit),
        LowerBound: cdk.stringToCloudFormation(properties.lowerBound),
        MapType: cdk.stringToCloudFormation(properties.mapType),
        ModeType: cdk.stringToCloudFormation(properties.modeType),
        MultiLine: cdk.booleanToCloudFormation(properties.multiLine),
        NumRows: cdk.stringToCloudFormation(properties.numRows),
        NumRowsAfter: cdk.stringToCloudFormation(properties.numRowsAfter),
        NumRowsBefore: cdk.stringToCloudFormation(properties.numRowsBefore),
        OrderByColumn: cdk.stringToCloudFormation(properties.orderByColumn),
        OrderByColumns: cdk.stringToCloudFormation(properties.orderByColumns),
        Other: cdk.stringToCloudFormation(properties.other),
        Pattern: cdk.stringToCloudFormation(properties.pattern),
        PatternOption1: cdk.stringToCloudFormation(properties.patternOption1),
        PatternOption2: cdk.stringToCloudFormation(properties.patternOption2),
        PatternOptions: cdk.stringToCloudFormation(properties.patternOptions),
        Period: cdk.stringToCloudFormation(properties.period),
        Position: cdk.stringToCloudFormation(properties.position),
        RemoveAllPunctuation: cdk.stringToCloudFormation(properties.removeAllPunctuation),
        RemoveAllQuotes: cdk.stringToCloudFormation(properties.removeAllQuotes),
        RemoveAllWhitespace: cdk.stringToCloudFormation(properties.removeAllWhitespace),
        RemoveCustomCharacters: cdk.stringToCloudFormation(properties.removeCustomCharacters),
        RemoveCustomValue: cdk.stringToCloudFormation(properties.removeCustomValue),
        RemoveLeadingAndTrailingPunctuation: cdk.stringToCloudFormation(properties.removeLeadingAndTrailingPunctuation),
        RemoveLeadingAndTrailingQuotes: cdk.stringToCloudFormation(properties.removeLeadingAndTrailingQuotes),
        RemoveLeadingAndTrailingWhitespace: cdk.stringToCloudFormation(properties.removeLeadingAndTrailingWhitespace),
        RemoveLetters: cdk.stringToCloudFormation(properties.removeLetters),
        RemoveNumbers: cdk.stringToCloudFormation(properties.removeNumbers),
        RemoveSourceColumn: cdk.stringToCloudFormation(properties.removeSourceColumn),
        RemoveSpecialCharacters: cdk.stringToCloudFormation(properties.removeSpecialCharacters),
        RightColumns: cdk.stringToCloudFormation(properties.rightColumns),
        SampleSize: cdk.stringToCloudFormation(properties.sampleSize),
        SampleType: cdk.stringToCloudFormation(properties.sampleType),
        SecondInput: cdk.stringToCloudFormation(properties.secondInput),
        SecondaryInputs: cdk.listMapper(cfnRecipeSecondaryInputPropertyToCloudFormation)(properties.secondaryInputs),
        SheetIndexes: cdk.listMapper(cdk.numberToCloudFormation)(properties.sheetIndexes),
        SheetNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.sheetNames),
        SourceColumn: cdk.stringToCloudFormation(properties.sourceColumn),
        SourceColumn1: cdk.stringToCloudFormation(properties.sourceColumn1),
        SourceColumn2: cdk.stringToCloudFormation(properties.sourceColumn2),
        SourceColumns: cdk.stringToCloudFormation(properties.sourceColumns),
        StartColumnIndex: cdk.stringToCloudFormation(properties.startColumnIndex),
        StartPattern: cdk.stringToCloudFormation(properties.startPattern),
        StartPosition: cdk.stringToCloudFormation(properties.startPosition),
        StartValue: cdk.stringToCloudFormation(properties.startValue),
        StemmingMode: cdk.stringToCloudFormation(properties.stemmingMode),
        StepCount: cdk.stringToCloudFormation(properties.stepCount),
        StepIndex: cdk.stringToCloudFormation(properties.stepIndex),
        StopWordsMode: cdk.stringToCloudFormation(properties.stopWordsMode),
        Strategy: cdk.stringToCloudFormation(properties.strategy),
        TargetColumn: cdk.stringToCloudFormation(properties.targetColumn),
        TargetColumnNames: cdk.stringToCloudFormation(properties.targetColumnNames),
        TargetDateFormat: cdk.stringToCloudFormation(properties.targetDateFormat),
        TargetIndex: cdk.stringToCloudFormation(properties.targetIndex),
        TimeZone: cdk.stringToCloudFormation(properties.timeZone),
        TokenizerPattern: cdk.stringToCloudFormation(properties.tokenizerPattern),
        TrueString: cdk.stringToCloudFormation(properties.trueString),
        UdfLang: cdk.stringToCloudFormation(properties.udfLang),
        Units: cdk.stringToCloudFormation(properties.units),
        UnpivotColumn: cdk.stringToCloudFormation(properties.unpivotColumn),
        UpperBound: cdk.stringToCloudFormation(properties.upperBound),
        UseNewDataFrame: cdk.stringToCloudFormation(properties.useNewDataFrame),
        Value: cdk.stringToCloudFormation(properties.value),
        Value1: cdk.stringToCloudFormation(properties.value1),
        Value2: cdk.stringToCloudFormation(properties.value2),
        ValueColumn: cdk.stringToCloudFormation(properties.valueColumn),
        ViewFrame: cdk.stringToCloudFormation(properties.viewFrame),
    };
}

// @ts-ignore TS6133
function CfnRecipeRecipeParametersPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRecipe.RecipeParametersProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRecipe.RecipeParametersProperty>();
    ret.addPropertyResult('aggregateFunction', 'AggregateFunction', properties.AggregateFunction != null ? cfn_parse.FromCloudFormation.getString(properties.AggregateFunction) : undefined);
    ret.addPropertyResult('base', 'Base', properties.Base != null ? cfn_parse.FromCloudFormation.getString(properties.Base) : undefined);
    ret.addPropertyResult('caseStatement', 'CaseStatement', properties.CaseStatement != null ? cfn_parse.FromCloudFormation.getString(properties.CaseStatement) : undefined);
    ret.addPropertyResult('categoryMap', 'CategoryMap', properties.CategoryMap != null ? cfn_parse.FromCloudFormation.getString(properties.CategoryMap) : undefined);
    ret.addPropertyResult('charsToRemove', 'CharsToRemove', properties.CharsToRemove != null ? cfn_parse.FromCloudFormation.getString(properties.CharsToRemove) : undefined);
    ret.addPropertyResult('collapseConsecutiveWhitespace', 'CollapseConsecutiveWhitespace', properties.CollapseConsecutiveWhitespace != null ? cfn_parse.FromCloudFormation.getString(properties.CollapseConsecutiveWhitespace) : undefined);
    ret.addPropertyResult('columnDataType', 'ColumnDataType', properties.ColumnDataType != null ? cfn_parse.FromCloudFormation.getString(properties.ColumnDataType) : undefined);
    ret.addPropertyResult('columnRange', 'ColumnRange', properties.ColumnRange != null ? cfn_parse.FromCloudFormation.getString(properties.ColumnRange) : undefined);
    ret.addPropertyResult('count', 'Count', properties.Count != null ? cfn_parse.FromCloudFormation.getString(properties.Count) : undefined);
    ret.addPropertyResult('customCharacters', 'CustomCharacters', properties.CustomCharacters != null ? cfn_parse.FromCloudFormation.getString(properties.CustomCharacters) : undefined);
    ret.addPropertyResult('customStopWords', 'CustomStopWords', properties.CustomStopWords != null ? cfn_parse.FromCloudFormation.getString(properties.CustomStopWords) : undefined);
    ret.addPropertyResult('customValue', 'CustomValue', properties.CustomValue != null ? cfn_parse.FromCloudFormation.getString(properties.CustomValue) : undefined);
    ret.addPropertyResult('datasetsColumns', 'DatasetsColumns', properties.DatasetsColumns != null ? cfn_parse.FromCloudFormation.getString(properties.DatasetsColumns) : undefined);
    ret.addPropertyResult('dateAddValue', 'DateAddValue', properties.DateAddValue != null ? cfn_parse.FromCloudFormation.getString(properties.DateAddValue) : undefined);
    ret.addPropertyResult('dateTimeFormat', 'DateTimeFormat', properties.DateTimeFormat != null ? cfn_parse.FromCloudFormation.getString(properties.DateTimeFormat) : undefined);
    ret.addPropertyResult('dateTimeParameters', 'DateTimeParameters', properties.DateTimeParameters != null ? cfn_parse.FromCloudFormation.getString(properties.DateTimeParameters) : undefined);
    ret.addPropertyResult('deleteOtherRows', 'DeleteOtherRows', properties.DeleteOtherRows != null ? cfn_parse.FromCloudFormation.getString(properties.DeleteOtherRows) : undefined);
    ret.addPropertyResult('delimiter', 'Delimiter', properties.Delimiter != null ? cfn_parse.FromCloudFormation.getString(properties.Delimiter) : undefined);
    ret.addPropertyResult('endPattern', 'EndPattern', properties.EndPattern != null ? cfn_parse.FromCloudFormation.getString(properties.EndPattern) : undefined);
    ret.addPropertyResult('endPosition', 'EndPosition', properties.EndPosition != null ? cfn_parse.FromCloudFormation.getString(properties.EndPosition) : undefined);
    ret.addPropertyResult('endValue', 'EndValue', properties.EndValue != null ? cfn_parse.FromCloudFormation.getString(properties.EndValue) : undefined);
    ret.addPropertyResult('expandContractions', 'ExpandContractions', properties.ExpandContractions != null ? cfn_parse.FromCloudFormation.getString(properties.ExpandContractions) : undefined);
    ret.addPropertyResult('exponent', 'Exponent', properties.Exponent != null ? cfn_parse.FromCloudFormation.getString(properties.Exponent) : undefined);
    ret.addPropertyResult('falseString', 'FalseString', properties.FalseString != null ? cfn_parse.FromCloudFormation.getString(properties.FalseString) : undefined);
    ret.addPropertyResult('groupByAggFunctionOptions', 'GroupByAggFunctionOptions', properties.GroupByAggFunctionOptions != null ? cfn_parse.FromCloudFormation.getString(properties.GroupByAggFunctionOptions) : undefined);
    ret.addPropertyResult('groupByColumns', 'GroupByColumns', properties.GroupByColumns != null ? cfn_parse.FromCloudFormation.getString(properties.GroupByColumns) : undefined);
    ret.addPropertyResult('hiddenColumns', 'HiddenColumns', properties.HiddenColumns != null ? cfn_parse.FromCloudFormation.getString(properties.HiddenColumns) : undefined);
    ret.addPropertyResult('ignoreCase', 'IgnoreCase', properties.IgnoreCase != null ? cfn_parse.FromCloudFormation.getString(properties.IgnoreCase) : undefined);
    ret.addPropertyResult('includeInSplit', 'IncludeInSplit', properties.IncludeInSplit != null ? cfn_parse.FromCloudFormation.getString(properties.IncludeInSplit) : undefined);
    ret.addPropertyResult('input', 'Input', properties.Input != null ? cfn_parse.FromCloudFormation.getAny(properties.Input) : undefined);
    ret.addPropertyResult('interval', 'Interval', properties.Interval != null ? cfn_parse.FromCloudFormation.getString(properties.Interval) : undefined);
    ret.addPropertyResult('isText', 'IsText', properties.IsText != null ? cfn_parse.FromCloudFormation.getString(properties.IsText) : undefined);
    ret.addPropertyResult('joinKeys', 'JoinKeys', properties.JoinKeys != null ? cfn_parse.FromCloudFormation.getString(properties.JoinKeys) : undefined);
    ret.addPropertyResult('joinType', 'JoinType', properties.JoinType != null ? cfn_parse.FromCloudFormation.getString(properties.JoinType) : undefined);
    ret.addPropertyResult('leftColumns', 'LeftColumns', properties.LeftColumns != null ? cfn_parse.FromCloudFormation.getString(properties.LeftColumns) : undefined);
    ret.addPropertyResult('limit', 'Limit', properties.Limit != null ? cfn_parse.FromCloudFormation.getString(properties.Limit) : undefined);
    ret.addPropertyResult('lowerBound', 'LowerBound', properties.LowerBound != null ? cfn_parse.FromCloudFormation.getString(properties.LowerBound) : undefined);
    ret.addPropertyResult('mapType', 'MapType', properties.MapType != null ? cfn_parse.FromCloudFormation.getString(properties.MapType) : undefined);
    ret.addPropertyResult('modeType', 'ModeType', properties.ModeType != null ? cfn_parse.FromCloudFormation.getString(properties.ModeType) : undefined);
    ret.addPropertyResult('multiLine', 'MultiLine', properties.MultiLine != null ? cfn_parse.FromCloudFormation.getBoolean(properties.MultiLine) : undefined);
    ret.addPropertyResult('numRows', 'NumRows', properties.NumRows != null ? cfn_parse.FromCloudFormation.getString(properties.NumRows) : undefined);
    ret.addPropertyResult('numRowsAfter', 'NumRowsAfter', properties.NumRowsAfter != null ? cfn_parse.FromCloudFormation.getString(properties.NumRowsAfter) : undefined);
    ret.addPropertyResult('numRowsBefore', 'NumRowsBefore', properties.NumRowsBefore != null ? cfn_parse.FromCloudFormation.getString(properties.NumRowsBefore) : undefined);
    ret.addPropertyResult('orderByColumn', 'OrderByColumn', properties.OrderByColumn != null ? cfn_parse.FromCloudFormation.getString(properties.OrderByColumn) : undefined);
    ret.addPropertyResult('orderByColumns', 'OrderByColumns', properties.OrderByColumns != null ? cfn_parse.FromCloudFormation.getString(properties.OrderByColumns) : undefined);
    ret.addPropertyResult('other', 'Other', properties.Other != null ? cfn_parse.FromCloudFormation.getString(properties.Other) : undefined);
    ret.addPropertyResult('pattern', 'Pattern', properties.Pattern != null ? cfn_parse.FromCloudFormation.getString(properties.Pattern) : undefined);
    ret.addPropertyResult('patternOption1', 'PatternOption1', properties.PatternOption1 != null ? cfn_parse.FromCloudFormation.getString(properties.PatternOption1) : undefined);
    ret.addPropertyResult('patternOption2', 'PatternOption2', properties.PatternOption2 != null ? cfn_parse.FromCloudFormation.getString(properties.PatternOption2) : undefined);
    ret.addPropertyResult('patternOptions', 'PatternOptions', properties.PatternOptions != null ? cfn_parse.FromCloudFormation.getString(properties.PatternOptions) : undefined);
    ret.addPropertyResult('period', 'Period', properties.Period != null ? cfn_parse.FromCloudFormation.getString(properties.Period) : undefined);
    ret.addPropertyResult('position', 'Position', properties.Position != null ? cfn_parse.FromCloudFormation.getString(properties.Position) : undefined);
    ret.addPropertyResult('removeAllPunctuation', 'RemoveAllPunctuation', properties.RemoveAllPunctuation != null ? cfn_parse.FromCloudFormation.getString(properties.RemoveAllPunctuation) : undefined);
    ret.addPropertyResult('removeAllQuotes', 'RemoveAllQuotes', properties.RemoveAllQuotes != null ? cfn_parse.FromCloudFormation.getString(properties.RemoveAllQuotes) : undefined);
    ret.addPropertyResult('removeAllWhitespace', 'RemoveAllWhitespace', properties.RemoveAllWhitespace != null ? cfn_parse.FromCloudFormation.getString(properties.RemoveAllWhitespace) : undefined);
    ret.addPropertyResult('removeCustomCharacters', 'RemoveCustomCharacters', properties.RemoveCustomCharacters != null ? cfn_parse.FromCloudFormation.getString(properties.RemoveCustomCharacters) : undefined);
    ret.addPropertyResult('removeCustomValue', 'RemoveCustomValue', properties.RemoveCustomValue != null ? cfn_parse.FromCloudFormation.getString(properties.RemoveCustomValue) : undefined);
    ret.addPropertyResult('removeLeadingAndTrailingPunctuation', 'RemoveLeadingAndTrailingPunctuation', properties.RemoveLeadingAndTrailingPunctuation != null ? cfn_parse.FromCloudFormation.getString(properties.RemoveLeadingAndTrailingPunctuation) : undefined);
    ret.addPropertyResult('removeLeadingAndTrailingQuotes', 'RemoveLeadingAndTrailingQuotes', properties.RemoveLeadingAndTrailingQuotes != null ? cfn_parse.FromCloudFormation.getString(properties.RemoveLeadingAndTrailingQuotes) : undefined);
    ret.addPropertyResult('removeLeadingAndTrailingWhitespace', 'RemoveLeadingAndTrailingWhitespace', properties.RemoveLeadingAndTrailingWhitespace != null ? cfn_parse.FromCloudFormation.getString(properties.RemoveLeadingAndTrailingWhitespace) : undefined);
    ret.addPropertyResult('removeLetters', 'RemoveLetters', properties.RemoveLetters != null ? cfn_parse.FromCloudFormation.getString(properties.RemoveLetters) : undefined);
    ret.addPropertyResult('removeNumbers', 'RemoveNumbers', properties.RemoveNumbers != null ? cfn_parse.FromCloudFormation.getString(properties.RemoveNumbers) : undefined);
    ret.addPropertyResult('removeSourceColumn', 'RemoveSourceColumn', properties.RemoveSourceColumn != null ? cfn_parse.FromCloudFormation.getString(properties.RemoveSourceColumn) : undefined);
    ret.addPropertyResult('removeSpecialCharacters', 'RemoveSpecialCharacters', properties.RemoveSpecialCharacters != null ? cfn_parse.FromCloudFormation.getString(properties.RemoveSpecialCharacters) : undefined);
    ret.addPropertyResult('rightColumns', 'RightColumns', properties.RightColumns != null ? cfn_parse.FromCloudFormation.getString(properties.RightColumns) : undefined);
    ret.addPropertyResult('sampleSize', 'SampleSize', properties.SampleSize != null ? cfn_parse.FromCloudFormation.getString(properties.SampleSize) : undefined);
    ret.addPropertyResult('sampleType', 'SampleType', properties.SampleType != null ? cfn_parse.FromCloudFormation.getString(properties.SampleType) : undefined);
    ret.addPropertyResult('secondInput', 'SecondInput', properties.SecondInput != null ? cfn_parse.FromCloudFormation.getString(properties.SecondInput) : undefined);
    ret.addPropertyResult('secondaryInputs', 'SecondaryInputs', properties.SecondaryInputs != null ? cfn_parse.FromCloudFormation.getArray(CfnRecipeSecondaryInputPropertyFromCloudFormation)(properties.SecondaryInputs) : undefined);
    ret.addPropertyResult('sheetIndexes', 'SheetIndexes', properties.SheetIndexes != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getNumber)(properties.SheetIndexes) : undefined);
    ret.addPropertyResult('sheetNames', 'SheetNames', properties.SheetNames != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SheetNames) : undefined);
    ret.addPropertyResult('sourceColumn', 'SourceColumn', properties.SourceColumn != null ? cfn_parse.FromCloudFormation.getString(properties.SourceColumn) : undefined);
    ret.addPropertyResult('sourceColumn1', 'SourceColumn1', properties.SourceColumn1 != null ? cfn_parse.FromCloudFormation.getString(properties.SourceColumn1) : undefined);
    ret.addPropertyResult('sourceColumn2', 'SourceColumn2', properties.SourceColumn2 != null ? cfn_parse.FromCloudFormation.getString(properties.SourceColumn2) : undefined);
    ret.addPropertyResult('sourceColumns', 'SourceColumns', properties.SourceColumns != null ? cfn_parse.FromCloudFormation.getString(properties.SourceColumns) : undefined);
    ret.addPropertyResult('startColumnIndex', 'StartColumnIndex', properties.StartColumnIndex != null ? cfn_parse.FromCloudFormation.getString(properties.StartColumnIndex) : undefined);
    ret.addPropertyResult('startPattern', 'StartPattern', properties.StartPattern != null ? cfn_parse.FromCloudFormation.getString(properties.StartPattern) : undefined);
    ret.addPropertyResult('startPosition', 'StartPosition', properties.StartPosition != null ? cfn_parse.FromCloudFormation.getString(properties.StartPosition) : undefined);
    ret.addPropertyResult('startValue', 'StartValue', properties.StartValue != null ? cfn_parse.FromCloudFormation.getString(properties.StartValue) : undefined);
    ret.addPropertyResult('stemmingMode', 'StemmingMode', properties.StemmingMode != null ? cfn_parse.FromCloudFormation.getString(properties.StemmingMode) : undefined);
    ret.addPropertyResult('stepCount', 'StepCount', properties.StepCount != null ? cfn_parse.FromCloudFormation.getString(properties.StepCount) : undefined);
    ret.addPropertyResult('stepIndex', 'StepIndex', properties.StepIndex != null ? cfn_parse.FromCloudFormation.getString(properties.StepIndex) : undefined);
    ret.addPropertyResult('stopWordsMode', 'StopWordsMode', properties.StopWordsMode != null ? cfn_parse.FromCloudFormation.getString(properties.StopWordsMode) : undefined);
    ret.addPropertyResult('strategy', 'Strategy', properties.Strategy != null ? cfn_parse.FromCloudFormation.getString(properties.Strategy) : undefined);
    ret.addPropertyResult('targetColumn', 'TargetColumn', properties.TargetColumn != null ? cfn_parse.FromCloudFormation.getString(properties.TargetColumn) : undefined);
    ret.addPropertyResult('targetColumnNames', 'TargetColumnNames', properties.TargetColumnNames != null ? cfn_parse.FromCloudFormation.getString(properties.TargetColumnNames) : undefined);
    ret.addPropertyResult('targetDateFormat', 'TargetDateFormat', properties.TargetDateFormat != null ? cfn_parse.FromCloudFormation.getString(properties.TargetDateFormat) : undefined);
    ret.addPropertyResult('targetIndex', 'TargetIndex', properties.TargetIndex != null ? cfn_parse.FromCloudFormation.getString(properties.TargetIndex) : undefined);
    ret.addPropertyResult('timeZone', 'TimeZone', properties.TimeZone != null ? cfn_parse.FromCloudFormation.getString(properties.TimeZone) : undefined);
    ret.addPropertyResult('tokenizerPattern', 'TokenizerPattern', properties.TokenizerPattern != null ? cfn_parse.FromCloudFormation.getString(properties.TokenizerPattern) : undefined);
    ret.addPropertyResult('trueString', 'TrueString', properties.TrueString != null ? cfn_parse.FromCloudFormation.getString(properties.TrueString) : undefined);
    ret.addPropertyResult('udfLang', 'UdfLang', properties.UdfLang != null ? cfn_parse.FromCloudFormation.getString(properties.UdfLang) : undefined);
    ret.addPropertyResult('units', 'Units', properties.Units != null ? cfn_parse.FromCloudFormation.getString(properties.Units) : undefined);
    ret.addPropertyResult('unpivotColumn', 'UnpivotColumn', properties.UnpivotColumn != null ? cfn_parse.FromCloudFormation.getString(properties.UnpivotColumn) : undefined);
    ret.addPropertyResult('upperBound', 'UpperBound', properties.UpperBound != null ? cfn_parse.FromCloudFormation.getString(properties.UpperBound) : undefined);
    ret.addPropertyResult('useNewDataFrame', 'UseNewDataFrame', properties.UseNewDataFrame != null ? cfn_parse.FromCloudFormation.getString(properties.UseNewDataFrame) : undefined);
    ret.addPropertyResult('value', 'Value', properties.Value != null ? cfn_parse.FromCloudFormation.getString(properties.Value) : undefined);
    ret.addPropertyResult('value1', 'Value1', properties.Value1 != null ? cfn_parse.FromCloudFormation.getString(properties.Value1) : undefined);
    ret.addPropertyResult('value2', 'Value2', properties.Value2 != null ? cfn_parse.FromCloudFormation.getString(properties.Value2) : undefined);
    ret.addPropertyResult('valueColumn', 'ValueColumn', properties.ValueColumn != null ? cfn_parse.FromCloudFormation.getString(properties.ValueColumn) : undefined);
    ret.addPropertyResult('viewFrame', 'ViewFrame', properties.ViewFrame != null ? cfn_parse.FromCloudFormation.getString(properties.ViewFrame) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnRecipe {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipestep.html
     */
    export interface RecipeStepProperty {
        /**
         * `CfnRecipe.RecipeStepProperty.Action`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipestep.html#cfn-databrew-recipe-recipestep-action
         */
        readonly action: CfnRecipe.ActionProperty | cdk.IResolvable;
        /**
         * `CfnRecipe.RecipeStepProperty.ConditionExpressions`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-recipestep.html#cfn-databrew-recipe-recipestep-conditionexpressions
         */
        readonly conditionExpressions?: Array<CfnRecipe.ConditionExpressionProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `RecipeStepProperty`
 *
 * @param properties - the TypeScript properties of a `RecipeStepProperty`
 *
 * @returns the result of the validation.
 */
function CfnRecipe_RecipeStepPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('action', cdk.requiredValidator)(properties.action));
    errors.collect(cdk.propertyValidator('action', CfnRecipe_ActionPropertyValidator)(properties.action));
    errors.collect(cdk.propertyValidator('conditionExpressions', cdk.listValidator(CfnRecipe_ConditionExpressionPropertyValidator))(properties.conditionExpressions));
    return errors.wrap('supplied properties not correct for "RecipeStepProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Recipe.RecipeStep` resource
 *
 * @param properties - the TypeScript properties of a `RecipeStepProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Recipe.RecipeStep` resource.
 */
// @ts-ignore TS6133
function cfnRecipeRecipeStepPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRecipe_RecipeStepPropertyValidator(properties).assertSuccess();
    return {
        Action: cfnRecipeActionPropertyToCloudFormation(properties.action),
        ConditionExpressions: cdk.listMapper(cfnRecipeConditionExpressionPropertyToCloudFormation)(properties.conditionExpressions),
    };
}

// @ts-ignore TS6133
function CfnRecipeRecipeStepPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRecipe.RecipeStepProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRecipe.RecipeStepProperty>();
    ret.addPropertyResult('action', 'Action', CfnRecipeActionPropertyFromCloudFormation(properties.Action));
    ret.addPropertyResult('conditionExpressions', 'ConditionExpressions', properties.ConditionExpressions != null ? cfn_parse.FromCloudFormation.getArray(CfnRecipeConditionExpressionPropertyFromCloudFormation)(properties.ConditionExpressions) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnRecipe {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-s3location.html
     */
    export interface S3LocationProperty {
        /**
         * `CfnRecipe.S3LocationProperty.Bucket`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-s3location.html#cfn-databrew-recipe-s3location-bucket
         */
        readonly bucket: string;
        /**
         * `CfnRecipe.S3LocationProperty.Key`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-s3location.html#cfn-databrew-recipe-s3location-key
         */
        readonly key?: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3LocationProperty`
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the result of the validation.
 */
function CfnRecipe_S3LocationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucket', cdk.requiredValidator)(properties.bucket));
    errors.collect(cdk.propertyValidator('bucket', cdk.validateString)(properties.bucket));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    return errors.wrap('supplied properties not correct for "S3LocationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Recipe.S3Location` resource
 *
 * @param properties - the TypeScript properties of a `S3LocationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Recipe.S3Location` resource.
 */
// @ts-ignore TS6133
function cfnRecipeS3LocationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRecipe_S3LocationPropertyValidator(properties).assertSuccess();
    return {
        Bucket: cdk.stringToCloudFormation(properties.bucket),
        Key: cdk.stringToCloudFormation(properties.key),
    };
}

// @ts-ignore TS6133
function CfnRecipeS3LocationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRecipe.S3LocationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRecipe.S3LocationProperty>();
    ret.addPropertyResult('bucket', 'Bucket', cfn_parse.FromCloudFormation.getString(properties.Bucket));
    ret.addPropertyResult('key', 'Key', properties.Key != null ? cfn_parse.FromCloudFormation.getString(properties.Key) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnRecipe {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-secondaryinput.html
     */
    export interface SecondaryInputProperty {
        /**
         * `CfnRecipe.SecondaryInputProperty.DataCatalogInputDefinition`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-secondaryinput.html#cfn-databrew-recipe-secondaryinput-datacataloginputdefinition
         */
        readonly dataCatalogInputDefinition?: CfnRecipe.DataCatalogInputDefinitionProperty | cdk.IResolvable;
        /**
         * `CfnRecipe.SecondaryInputProperty.S3InputDefinition`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-recipe-secondaryinput.html#cfn-databrew-recipe-secondaryinput-s3inputdefinition
         */
        readonly s3InputDefinition?: CfnRecipe.S3LocationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SecondaryInputProperty`
 *
 * @param properties - the TypeScript properties of a `SecondaryInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnRecipe_SecondaryInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataCatalogInputDefinition', CfnRecipe_DataCatalogInputDefinitionPropertyValidator)(properties.dataCatalogInputDefinition));
    errors.collect(cdk.propertyValidator('s3InputDefinition', CfnRecipe_S3LocationPropertyValidator)(properties.s3InputDefinition));
    return errors.wrap('supplied properties not correct for "SecondaryInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Recipe.SecondaryInput` resource
 *
 * @param properties - the TypeScript properties of a `SecondaryInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Recipe.SecondaryInput` resource.
 */
// @ts-ignore TS6133
function cfnRecipeSecondaryInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRecipe_SecondaryInputPropertyValidator(properties).assertSuccess();
    return {
        DataCatalogInputDefinition: cfnRecipeDataCatalogInputDefinitionPropertyToCloudFormation(properties.dataCatalogInputDefinition),
        S3InputDefinition: cfnRecipeS3LocationPropertyToCloudFormation(properties.s3InputDefinition),
    };
}

// @ts-ignore TS6133
function CfnRecipeSecondaryInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRecipe.SecondaryInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRecipe.SecondaryInputProperty>();
    ret.addPropertyResult('dataCatalogInputDefinition', 'DataCatalogInputDefinition', properties.DataCatalogInputDefinition != null ? CfnRecipeDataCatalogInputDefinitionPropertyFromCloudFormation(properties.DataCatalogInputDefinition) : undefined);
    ret.addPropertyResult('s3InputDefinition', 'S3InputDefinition', properties.S3InputDefinition != null ? CfnRecipeS3LocationPropertyFromCloudFormation(properties.S3InputDefinition) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnRuleset`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-ruleset.html
 */
export interface CfnRulesetProps {

    /**
     * `AWS::DataBrew::Ruleset.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-ruleset.html#cfn-databrew-ruleset-name
     */
    readonly name: string;

    /**
     * `AWS::DataBrew::Ruleset.Rules`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-ruleset.html#cfn-databrew-ruleset-rules
     */
    readonly rules: Array<CfnRuleset.RuleProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Ruleset.TargetArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-ruleset.html#cfn-databrew-ruleset-targetarn
     */
    readonly targetArn: string;

    /**
     * `AWS::DataBrew::Ruleset.Description`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-ruleset.html#cfn-databrew-ruleset-description
     */
    readonly description?: string;

    /**
     * `AWS::DataBrew::Ruleset.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-ruleset.html#cfn-databrew-ruleset-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnRulesetProps`
 *
 * @param properties - the TypeScript properties of a `CfnRulesetProps`
 *
 * @returns the result of the validation.
 */
function CfnRulesetPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('rules', cdk.requiredValidator)(properties.rules));
    errors.collect(cdk.propertyValidator('rules', cdk.listValidator(CfnRuleset_RulePropertyValidator))(properties.rules));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('targetArn', cdk.requiredValidator)(properties.targetArn));
    errors.collect(cdk.propertyValidator('targetArn', cdk.validateString)(properties.targetArn));
    return errors.wrap('supplied properties not correct for "CfnRulesetProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Ruleset` resource
 *
 * @param properties - the TypeScript properties of a `CfnRulesetProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Ruleset` resource.
 */
// @ts-ignore TS6133
function cfnRulesetPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRulesetPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Rules: cdk.listMapper(cfnRulesetRulePropertyToCloudFormation)(properties.rules),
        TargetArn: cdk.stringToCloudFormation(properties.targetArn),
        Description: cdk.stringToCloudFormation(properties.description),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnRulesetPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRulesetProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRulesetProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('rules', 'Rules', cfn_parse.FromCloudFormation.getArray(CfnRulesetRulePropertyFromCloudFormation)(properties.Rules));
    ret.addPropertyResult('targetArn', 'TargetArn', cfn_parse.FromCloudFormation.getString(properties.TargetArn));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::DataBrew::Ruleset`
 *
 *
 *
 * @cloudformationResource AWS::DataBrew::Ruleset
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-ruleset.html
 */
export class CfnRuleset extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::DataBrew::Ruleset";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnRuleset {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnRulesetPropsFromCloudFormation(resourceProperties);
        const ret = new CfnRuleset(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * `AWS::DataBrew::Ruleset.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-ruleset.html#cfn-databrew-ruleset-name
     */
    public name: string;

    /**
     * `AWS::DataBrew::Ruleset.Rules`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-ruleset.html#cfn-databrew-ruleset-rules
     */
    public rules: Array<CfnRuleset.RuleProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * `AWS::DataBrew::Ruleset.TargetArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-ruleset.html#cfn-databrew-ruleset-targetarn
     */
    public targetArn: string;

    /**
     * `AWS::DataBrew::Ruleset.Description`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-ruleset.html#cfn-databrew-ruleset-description
     */
    public description: string | undefined;

    /**
     * `AWS::DataBrew::Ruleset.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-ruleset.html#cfn-databrew-ruleset-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::DataBrew::Ruleset`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnRulesetProps) {
        super(scope, id, { type: CfnRuleset.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'rules', this);
        cdk.requireProperty(props, 'targetArn', this);

        this.name = props.name;
        this.rules = props.rules;
        this.targetArn = props.targetArn;
        this.description = props.description;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::DataBrew::Ruleset", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnRuleset.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            rules: this.rules,
            targetArn: this.targetArn,
            description: this.description,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnRulesetPropsToCloudFormation(props);
    }
}

export namespace CfnRuleset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-columnselector.html
     */
    export interface ColumnSelectorProperty {
        /**
         * `CfnRuleset.ColumnSelectorProperty.Name`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-columnselector.html#cfn-databrew-ruleset-columnselector-name
         */
        readonly name?: string;
        /**
         * `CfnRuleset.ColumnSelectorProperty.Regex`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-columnselector.html#cfn-databrew-ruleset-columnselector-regex
         */
        readonly regex?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ColumnSelectorProperty`
 *
 * @param properties - the TypeScript properties of a `ColumnSelectorProperty`
 *
 * @returns the result of the validation.
 */
function CfnRuleset_ColumnSelectorPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('regex', cdk.validateString)(properties.regex));
    return errors.wrap('supplied properties not correct for "ColumnSelectorProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Ruleset.ColumnSelector` resource
 *
 * @param properties - the TypeScript properties of a `ColumnSelectorProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Ruleset.ColumnSelector` resource.
 */
// @ts-ignore TS6133
function cfnRulesetColumnSelectorPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRuleset_ColumnSelectorPropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Regex: cdk.stringToCloudFormation(properties.regex),
    };
}

// @ts-ignore TS6133
function CfnRulesetColumnSelectorPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRuleset.ColumnSelectorProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRuleset.ColumnSelectorProperty>();
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('regex', 'Regex', properties.Regex != null ? cfn_parse.FromCloudFormation.getString(properties.Regex) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnRuleset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-rule.html
     */
    export interface RuleProperty {
        /**
         * `CfnRuleset.RuleProperty.CheckExpression`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-rule.html#cfn-databrew-ruleset-rule-checkexpression
         */
        readonly checkExpression: string;
        /**
         * `CfnRuleset.RuleProperty.ColumnSelectors`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-rule.html#cfn-databrew-ruleset-rule-columnselectors
         */
        readonly columnSelectors?: Array<CfnRuleset.ColumnSelectorProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `CfnRuleset.RuleProperty.Disabled`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-rule.html#cfn-databrew-ruleset-rule-disabled
         */
        readonly disabled?: boolean | cdk.IResolvable;
        /**
         * `CfnRuleset.RuleProperty.Name`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-rule.html#cfn-databrew-ruleset-rule-name
         */
        readonly name: string;
        /**
         * `CfnRuleset.RuleProperty.SubstitutionMap`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-rule.html#cfn-databrew-ruleset-rule-substitutionmap
         */
        readonly substitutionMap?: Array<CfnRuleset.SubstitutionValueProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `CfnRuleset.RuleProperty.Threshold`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-rule.html#cfn-databrew-ruleset-rule-threshold
         */
        readonly threshold?: CfnRuleset.ThresholdProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `RuleProperty`
 *
 * @param properties - the TypeScript properties of a `RuleProperty`
 *
 * @returns the result of the validation.
 */
function CfnRuleset_RulePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('checkExpression', cdk.requiredValidator)(properties.checkExpression));
    errors.collect(cdk.propertyValidator('checkExpression', cdk.validateString)(properties.checkExpression));
    errors.collect(cdk.propertyValidator('columnSelectors', cdk.listValidator(CfnRuleset_ColumnSelectorPropertyValidator))(properties.columnSelectors));
    errors.collect(cdk.propertyValidator('disabled', cdk.validateBoolean)(properties.disabled));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('substitutionMap', cdk.listValidator(CfnRuleset_SubstitutionValuePropertyValidator))(properties.substitutionMap));
    errors.collect(cdk.propertyValidator('threshold', CfnRuleset_ThresholdPropertyValidator)(properties.threshold));
    return errors.wrap('supplied properties not correct for "RuleProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Ruleset.Rule` resource
 *
 * @param properties - the TypeScript properties of a `RuleProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Ruleset.Rule` resource.
 */
// @ts-ignore TS6133
function cfnRulesetRulePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRuleset_RulePropertyValidator(properties).assertSuccess();
    return {
        CheckExpression: cdk.stringToCloudFormation(properties.checkExpression),
        ColumnSelectors: cdk.listMapper(cfnRulesetColumnSelectorPropertyToCloudFormation)(properties.columnSelectors),
        Disabled: cdk.booleanToCloudFormation(properties.disabled),
        Name: cdk.stringToCloudFormation(properties.name),
        SubstitutionMap: cdk.listMapper(cfnRulesetSubstitutionValuePropertyToCloudFormation)(properties.substitutionMap),
        Threshold: cfnRulesetThresholdPropertyToCloudFormation(properties.threshold),
    };
}

// @ts-ignore TS6133
function CfnRulesetRulePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRuleset.RuleProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRuleset.RuleProperty>();
    ret.addPropertyResult('checkExpression', 'CheckExpression', cfn_parse.FromCloudFormation.getString(properties.CheckExpression));
    ret.addPropertyResult('columnSelectors', 'ColumnSelectors', properties.ColumnSelectors != null ? cfn_parse.FromCloudFormation.getArray(CfnRulesetColumnSelectorPropertyFromCloudFormation)(properties.ColumnSelectors) : undefined);
    ret.addPropertyResult('disabled', 'Disabled', properties.Disabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Disabled) : undefined);
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('substitutionMap', 'SubstitutionMap', properties.SubstitutionMap != null ? cfn_parse.FromCloudFormation.getArray(CfnRulesetSubstitutionValuePropertyFromCloudFormation)(properties.SubstitutionMap) : undefined);
    ret.addPropertyResult('threshold', 'Threshold', properties.Threshold != null ? CfnRulesetThresholdPropertyFromCloudFormation(properties.Threshold) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnRuleset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-substitutionvalue.html
     */
    export interface SubstitutionValueProperty {
        /**
         * `CfnRuleset.SubstitutionValueProperty.Value`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-substitutionvalue.html#cfn-databrew-ruleset-substitutionvalue-value
         */
        readonly value: string;
        /**
         * `CfnRuleset.SubstitutionValueProperty.ValueReference`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-substitutionvalue.html#cfn-databrew-ruleset-substitutionvalue-valuereference
         */
        readonly valueReference: string;
    }
}

/**
 * Determine whether the given properties match those of a `SubstitutionValueProperty`
 *
 * @param properties - the TypeScript properties of a `SubstitutionValueProperty`
 *
 * @returns the result of the validation.
 */
function CfnRuleset_SubstitutionValuePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    errors.collect(cdk.propertyValidator('valueReference', cdk.requiredValidator)(properties.valueReference));
    errors.collect(cdk.propertyValidator('valueReference', cdk.validateString)(properties.valueReference));
    return errors.wrap('supplied properties not correct for "SubstitutionValueProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Ruleset.SubstitutionValue` resource
 *
 * @param properties - the TypeScript properties of a `SubstitutionValueProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Ruleset.SubstitutionValue` resource.
 */
// @ts-ignore TS6133
function cfnRulesetSubstitutionValuePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRuleset_SubstitutionValuePropertyValidator(properties).assertSuccess();
    return {
        Value: cdk.stringToCloudFormation(properties.value),
        ValueReference: cdk.stringToCloudFormation(properties.valueReference),
    };
}

// @ts-ignore TS6133
function CfnRulesetSubstitutionValuePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRuleset.SubstitutionValueProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRuleset.SubstitutionValueProperty>();
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addPropertyResult('valueReference', 'ValueReference', cfn_parse.FromCloudFormation.getString(properties.ValueReference));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnRuleset {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-threshold.html
     */
    export interface ThresholdProperty {
        /**
         * `CfnRuleset.ThresholdProperty.Type`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-threshold.html#cfn-databrew-ruleset-threshold-type
         */
        readonly type?: string;
        /**
         * `CfnRuleset.ThresholdProperty.Unit`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-threshold.html#cfn-databrew-ruleset-threshold-unit
         */
        readonly unit?: string;
        /**
         * `CfnRuleset.ThresholdProperty.Value`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-databrew-ruleset-threshold.html#cfn-databrew-ruleset-threshold-value
         */
        readonly value: number;
    }
}

/**
 * Determine whether the given properties match those of a `ThresholdProperty`
 *
 * @param properties - the TypeScript properties of a `ThresholdProperty`
 *
 * @returns the result of the validation.
 */
function CfnRuleset_ThresholdPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    errors.collect(cdk.propertyValidator('unit', cdk.validateString)(properties.unit));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateNumber)(properties.value));
    return errors.wrap('supplied properties not correct for "ThresholdProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Ruleset.Threshold` resource
 *
 * @param properties - the TypeScript properties of a `ThresholdProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Ruleset.Threshold` resource.
 */
// @ts-ignore TS6133
function cfnRulesetThresholdPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRuleset_ThresholdPropertyValidator(properties).assertSuccess();
    return {
        Type: cdk.stringToCloudFormation(properties.type),
        Unit: cdk.stringToCloudFormation(properties.unit),
        Value: cdk.numberToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnRulesetThresholdPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRuleset.ThresholdProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRuleset.ThresholdProperty>();
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addPropertyResult('unit', 'Unit', properties.Unit != null ? cfn_parse.FromCloudFormation.getString(properties.Unit) : undefined);
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getNumber(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnSchedule`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-schedule.html
 */
export interface CfnScheduleProps {

    /**
     * `AWS::DataBrew::Schedule.CronExpression`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-schedule.html#cfn-databrew-schedule-cronexpression
     */
    readonly cronExpression: string;

    /**
     * `AWS::DataBrew::Schedule.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-schedule.html#cfn-databrew-schedule-name
     */
    readonly name: string;

    /**
     * `AWS::DataBrew::Schedule.JobNames`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-schedule.html#cfn-databrew-schedule-jobnames
     */
    readonly jobNames?: string[];

    /**
     * `AWS::DataBrew::Schedule.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-schedule.html#cfn-databrew-schedule-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnScheduleProps`
 *
 * @param properties - the TypeScript properties of a `CfnScheduleProps`
 *
 * @returns the result of the validation.
 */
function CfnSchedulePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cronExpression', cdk.requiredValidator)(properties.cronExpression));
    errors.collect(cdk.propertyValidator('cronExpression', cdk.validateString)(properties.cronExpression));
    errors.collect(cdk.propertyValidator('jobNames', cdk.listValidator(cdk.validateString))(properties.jobNames));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnScheduleProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::DataBrew::Schedule` resource
 *
 * @param properties - the TypeScript properties of a `CfnScheduleProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::DataBrew::Schedule` resource.
 */
// @ts-ignore TS6133
function cfnSchedulePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSchedulePropsValidator(properties).assertSuccess();
    return {
        CronExpression: cdk.stringToCloudFormation(properties.cronExpression),
        Name: cdk.stringToCloudFormation(properties.name),
        JobNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.jobNames),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnSchedulePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScheduleProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScheduleProps>();
    ret.addPropertyResult('cronExpression', 'CronExpression', cfn_parse.FromCloudFormation.getString(properties.CronExpression));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('jobNames', 'JobNames', properties.JobNames != null ? cfn_parse.FromCloudFormation.getStringArray(properties.JobNames) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::DataBrew::Schedule`
 *
 *
 *
 * @cloudformationResource AWS::DataBrew::Schedule
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-schedule.html
 */
export class CfnSchedule extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::DataBrew::Schedule";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnSchedule {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnSchedulePropsFromCloudFormation(resourceProperties);
        const ret = new CfnSchedule(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * `AWS::DataBrew::Schedule.CronExpression`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-schedule.html#cfn-databrew-schedule-cronexpression
     */
    public cronExpression: string;

    /**
     * `AWS::DataBrew::Schedule.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-schedule.html#cfn-databrew-schedule-name
     */
    public name: string;

    /**
     * `AWS::DataBrew::Schedule.JobNames`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-schedule.html#cfn-databrew-schedule-jobnames
     */
    public jobNames: string[] | undefined;

    /**
     * `AWS::DataBrew::Schedule.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-schedule.html#cfn-databrew-schedule-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::DataBrew::Schedule`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnScheduleProps) {
        super(scope, id, { type: CfnSchedule.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'cronExpression', this);
        cdk.requireProperty(props, 'name', this);

        this.cronExpression = props.cronExpression;
        this.name = props.name;
        this.jobNames = props.jobNames;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::DataBrew::Schedule", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnSchedule.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            cronExpression: this.cronExpression,
            name: this.name,
            jobNames: this.jobNames,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnSchedulePropsToCloudFormation(props);
    }
}
