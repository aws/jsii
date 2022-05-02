// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:08.915Z","fingerprint":"EyPQ5jD0CY/oKWLd37GMxMAmPYAi6ChcyCerWNDhNqk="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnDataSource`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html
 */
export interface CfnDataSourceProps {

    /**
     * The identifier of the index that should be associated with this data source.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-indexid
     */
    readonly indexId: string;

    /**
     * The name of the data source.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-name
     */
    readonly name: string;

    /**
     * The type of the data source.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-type
     */
    readonly type: string;

    /**
     * Configuration information for altering document metadata and content during the document ingestion process.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-customdocumentenrichmentconfiguration
     */
    readonly customDocumentEnrichmentConfiguration?: CfnDataSource.CustomDocumentEnrichmentConfigurationProperty | cdk.IResolvable;

    /**
     * Configuration information for an Amazon Kendra data source. The contents of the configuration depend on the type of data source. You can only specify one type of data source in the configuration. Choose from one of the following data sources.
     *
     * - Amazon S3
     * - Confluence
     * - Custom
     * - Database
     * - Microsoft OneDrive
     * - Microsoft SharePoint
     * - Salesforce
     * - ServiceNow
     *
     * You can't specify the `Configuration` parameter when the `Type` parameter is set to `CUSTOM` .
     *
     * The `Configuration` parameter is required for all other data sources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-datasourceconfiguration
     */
    readonly dataSourceConfiguration?: CfnDataSource.DataSourceConfigurationProperty | cdk.IResolvable;

    /**
     * A description of the data source.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-description
     */
    readonly description?: string;

    /**
     * The Amazon Resource Name (ARN) of a role with permission to access the data source.
     *
     * You can't specify the `RoleArn` parameter when the `Type` parameter is set to `CUSTOM` .
     *
     * The `RoleArn` parameter is required for all other data sources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-rolearn
     */
    readonly roleArn?: string;

    /**
     * Sets the frequency that Amazon Kendra checks the documents in your data source and updates the index. If you don't set a schedule, Amazon Kendra doesn't periodically update the index.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-schedule
     */
    readonly schedule?: string;

    /**
     * An array of key-value pairs to apply to this resource
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnDataSourceProps`
 *
 * @param properties - the TypeScript properties of a `CfnDataSourceProps`
 *
 * @returns the result of the validation.
 */
function CfnDataSourcePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('customDocumentEnrichmentConfiguration', CfnDataSource_CustomDocumentEnrichmentConfigurationPropertyValidator)(properties.customDocumentEnrichmentConfiguration));
    errors.collect(cdk.propertyValidator('dataSourceConfiguration', CfnDataSource_DataSourceConfigurationPropertyValidator)(properties.dataSourceConfiguration));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('indexId', cdk.requiredValidator)(properties.indexId));
    errors.collect(cdk.propertyValidator('indexId', cdk.validateString)(properties.indexId));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('schedule', cdk.validateString)(properties.schedule));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "CfnDataSourceProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource` resource
 *
 * @param properties - the TypeScript properties of a `CfnDataSourceProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource` resource.
 */
// @ts-ignore TS6133
function cfnDataSourcePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSourcePropsValidator(properties).assertSuccess();
    return {
        IndexId: cdk.stringToCloudFormation(properties.indexId),
        Name: cdk.stringToCloudFormation(properties.name),
        Type: cdk.stringToCloudFormation(properties.type),
        CustomDocumentEnrichmentConfiguration: cfnDataSourceCustomDocumentEnrichmentConfigurationPropertyToCloudFormation(properties.customDocumentEnrichmentConfiguration),
        DataSourceConfiguration: cfnDataSourceDataSourceConfigurationPropertyToCloudFormation(properties.dataSourceConfiguration),
        Description: cdk.stringToCloudFormation(properties.description),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        Schedule: cdk.stringToCloudFormation(properties.schedule),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDataSourcePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSourceProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSourceProps>();
    ret.addPropertyResult('indexId', 'IndexId', cfn_parse.FromCloudFormation.getString(properties.IndexId));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addPropertyResult('customDocumentEnrichmentConfiguration', 'CustomDocumentEnrichmentConfiguration', properties.CustomDocumentEnrichmentConfiguration != null ? CfnDataSourceCustomDocumentEnrichmentConfigurationPropertyFromCloudFormation(properties.CustomDocumentEnrichmentConfiguration) : undefined);
    ret.addPropertyResult('dataSourceConfiguration', 'DataSourceConfiguration', properties.DataSourceConfiguration != null ? CfnDataSourceDataSourceConfigurationPropertyFromCloudFormation(properties.DataSourceConfiguration) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', properties.RoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.RoleArn) : undefined);
    ret.addPropertyResult('schedule', 'Schedule', properties.Schedule != null ? cfn_parse.FromCloudFormation.getString(properties.Schedule) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Kendra::DataSource`
 *
 * Specifies a data source that you use to with an Amazon Kendra index.
 *
 * You specify a name, connector type and description for your data source.
 *
 * @cloudformationResource AWS::Kendra::DataSource
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html
 */
export class CfnDataSource extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Kendra::DataSource";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDataSource {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDataSourcePropsFromCloudFormation(resourceProperties);
        const ret = new CfnDataSource(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the data source. For example:
     *
     * `arn:aws:kendra:us-west-2:111122223333:index/335c3741-41df-46a6-b5d3-61f85b787884/data-source/b8cae438-6787-4091-8897-684a652bbb0a`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The identifier for the data source. For example:
     *
     * `b8cae438-6787-4091-8897-684a652bbb0a` .
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The identifier of the index that should be associated with this data source.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-indexid
     */
    public indexId: string;

    /**
     * The name of the data source.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-name
     */
    public name: string;

    /**
     * The type of the data source.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-type
     */
    public type: string;

    /**
     * Configuration information for altering document metadata and content during the document ingestion process.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-customdocumentenrichmentconfiguration
     */
    public customDocumentEnrichmentConfiguration: CfnDataSource.CustomDocumentEnrichmentConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * Configuration information for an Amazon Kendra data source. The contents of the configuration depend on the type of data source. You can only specify one type of data source in the configuration. Choose from one of the following data sources.
     *
     * - Amazon S3
     * - Confluence
     * - Custom
     * - Database
     * - Microsoft OneDrive
     * - Microsoft SharePoint
     * - Salesforce
     * - ServiceNow
     *
     * You can't specify the `Configuration` parameter when the `Type` parameter is set to `CUSTOM` .
     *
     * The `Configuration` parameter is required for all other data sources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-datasourceconfiguration
     */
    public dataSourceConfiguration: CfnDataSource.DataSourceConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * A description of the data source.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-description
     */
    public description: string | undefined;

    /**
     * The Amazon Resource Name (ARN) of a role with permission to access the data source.
     *
     * You can't specify the `RoleArn` parameter when the `Type` parameter is set to `CUSTOM` .
     *
     * The `RoleArn` parameter is required for all other data sources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-rolearn
     */
    public roleArn: string | undefined;

    /**
     * Sets the frequency that Amazon Kendra checks the documents in your data source and updates the index. If you don't set a schedule, Amazon Kendra doesn't periodically update the index.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-schedule
     */
    public schedule: string | undefined;

    /**
     * An array of key-value pairs to apply to this resource
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-datasource.html#cfn-kendra-datasource-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Kendra::DataSource`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDataSourceProps) {
        super(scope, id, { type: CfnDataSource.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'indexId', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'type', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.indexId = props.indexId;
        this.name = props.name;
        this.type = props.type;
        this.customDocumentEnrichmentConfiguration = props.customDocumentEnrichmentConfiguration;
        this.dataSourceConfiguration = props.dataSourceConfiguration;
        this.description = props.description;
        this.roleArn = props.roleArn;
        this.schedule = props.schedule;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Kendra::DataSource", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDataSource.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            indexId: this.indexId,
            name: this.name,
            type: this.type,
            customDocumentEnrichmentConfiguration: this.customDocumentEnrichmentConfiguration,
            dataSourceConfiguration: this.dataSourceConfiguration,
            description: this.description,
            roleArn: this.roleArn,
            schedule: this.schedule,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDataSourcePropsToCloudFormation(props);
    }
}

export namespace CfnDataSource {
    /**
     * Specifies access control list files for the documents in a data source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-accesscontrollistconfiguration.html
     */
    export interface AccessControlListConfigurationProperty {
        /**
         * Path to the AWS S3 bucket that contains the access control list files.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-accesscontrollistconfiguration.html#cfn-kendra-datasource-accesscontrollistconfiguration-keypath
         */
        readonly keyPath?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AccessControlListConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `AccessControlListConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_AccessControlListConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('keyPath', cdk.validateString)(properties.keyPath));
    return errors.wrap('supplied properties not correct for "AccessControlListConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.AccessControlListConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `AccessControlListConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.AccessControlListConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceAccessControlListConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_AccessControlListConfigurationPropertyValidator(properties).assertSuccess();
    return {
        KeyPath: cdk.stringToCloudFormation(properties.keyPath),
    };
}

// @ts-ignore TS6133
function CfnDataSourceAccessControlListConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.AccessControlListConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.AccessControlListConfigurationProperty>();
    ret.addPropertyResult('keyPath', 'KeyPath', properties.KeyPath != null ? cfn_parse.FromCloudFormation.getString(properties.KeyPath) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides information about the column that should be used for filtering the query response by groups.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-aclconfiguration.html
     */
    export interface AclConfigurationProperty {
        /**
         * A list of groups, separated by semi-colons, that filters a query response based on user context. The document is only returned to users that are in one of the groups specified in the `UserContext` field of the [Query](https://docs.aws.amazon.com/kendra/latest/dg/API_Query.html) operation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-aclconfiguration.html#cfn-kendra-datasource-aclconfiguration-allowedgroupscolumnname
         */
        readonly allowedGroupsColumnName: string;
    }
}

/**
 * Determine whether the given properties match those of a `AclConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `AclConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_AclConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('allowedGroupsColumnName', cdk.requiredValidator)(properties.allowedGroupsColumnName));
    errors.collect(cdk.propertyValidator('allowedGroupsColumnName', cdk.validateString)(properties.allowedGroupsColumnName));
    return errors.wrap('supplied properties not correct for "AclConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.AclConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `AclConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.AclConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceAclConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_AclConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AllowedGroupsColumnName: cdk.stringToCloudFormation(properties.allowedGroupsColumnName),
    };
}

// @ts-ignore TS6133
function CfnDataSourceAclConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.AclConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.AclConfigurationProperty>();
    ret.addPropertyResult('allowedGroupsColumnName', 'AllowedGroupsColumnName', cfn_parse.FromCloudFormation.getString(properties.AllowedGroupsColumnName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides information about how Amazon Kendra should use the columns of a database in an index.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-columnconfiguration.html
     */
    export interface ColumnConfigurationProperty {
        /**
         * One to five columns that indicate when a document in the database has changed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-columnconfiguration.html#cfn-kendra-datasource-columnconfiguration-changedetectingcolumns
         */
        readonly changeDetectingColumns: string[];
        /**
         * The column that contains the contents of the document.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-columnconfiguration.html#cfn-kendra-datasource-columnconfiguration-documentdatacolumnname
         */
        readonly documentDataColumnName: string;
        /**
         * The column that provides the document's unique identifier.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-columnconfiguration.html#cfn-kendra-datasource-columnconfiguration-documentidcolumnname
         */
        readonly documentIdColumnName: string;
        /**
         * The column that contains the title of the document.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-columnconfiguration.html#cfn-kendra-datasource-columnconfiguration-documenttitlecolumnname
         */
        readonly documentTitleColumnName?: string;
        /**
         * An array of objects that map database column names to the corresponding fields in an index. You must first create the fields in the index using the [UpdateIndex](https://docs.aws.amazon.com/kendra/latest/dg/API_UpdateIndex.html) operation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-columnconfiguration.html#cfn-kendra-datasource-columnconfiguration-fieldmappings
         */
        readonly fieldMappings?: Array<CfnDataSource.DataSourceToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ColumnConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ColumnConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ColumnConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('changeDetectingColumns', cdk.requiredValidator)(properties.changeDetectingColumns));
    errors.collect(cdk.propertyValidator('changeDetectingColumns', cdk.listValidator(cdk.validateString))(properties.changeDetectingColumns));
    errors.collect(cdk.propertyValidator('documentDataColumnName', cdk.requiredValidator)(properties.documentDataColumnName));
    errors.collect(cdk.propertyValidator('documentDataColumnName', cdk.validateString)(properties.documentDataColumnName));
    errors.collect(cdk.propertyValidator('documentIdColumnName', cdk.requiredValidator)(properties.documentIdColumnName));
    errors.collect(cdk.propertyValidator('documentIdColumnName', cdk.validateString)(properties.documentIdColumnName));
    errors.collect(cdk.propertyValidator('documentTitleColumnName', cdk.validateString)(properties.documentTitleColumnName));
    errors.collect(cdk.propertyValidator('fieldMappings', cdk.listValidator(CfnDataSource_DataSourceToIndexFieldMappingPropertyValidator))(properties.fieldMappings));
    return errors.wrap('supplied properties not correct for "ColumnConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ColumnConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ColumnConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ColumnConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceColumnConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ColumnConfigurationPropertyValidator(properties).assertSuccess();
    return {
        ChangeDetectingColumns: cdk.listMapper(cdk.stringToCloudFormation)(properties.changeDetectingColumns),
        DocumentDataColumnName: cdk.stringToCloudFormation(properties.documentDataColumnName),
        DocumentIdColumnName: cdk.stringToCloudFormation(properties.documentIdColumnName),
        DocumentTitleColumnName: cdk.stringToCloudFormation(properties.documentTitleColumnName),
        FieldMappings: cdk.listMapper(cfnDataSourceDataSourceToIndexFieldMappingPropertyToCloudFormation)(properties.fieldMappings),
    };
}

// @ts-ignore TS6133
function CfnDataSourceColumnConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ColumnConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ColumnConfigurationProperty>();
    ret.addPropertyResult('changeDetectingColumns', 'ChangeDetectingColumns', cfn_parse.FromCloudFormation.getStringArray(properties.ChangeDetectingColumns));
    ret.addPropertyResult('documentDataColumnName', 'DocumentDataColumnName', cfn_parse.FromCloudFormation.getString(properties.DocumentDataColumnName));
    ret.addPropertyResult('documentIdColumnName', 'DocumentIdColumnName', cfn_parse.FromCloudFormation.getString(properties.DocumentIdColumnName));
    ret.addPropertyResult('documentTitleColumnName', 'DocumentTitleColumnName', properties.DocumentTitleColumnName != null ? cfn_parse.FromCloudFormation.getString(properties.DocumentTitleColumnName) : undefined);
    ret.addPropertyResult('fieldMappings', 'FieldMappings', properties.FieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceDataSourceToIndexFieldMappingPropertyFromCloudFormation)(properties.FieldMappings) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Configuration of attachment settings for the Confluence data source. Attachment settings are optional, if you don't specify settings attachments, Amazon Kendra won't index them.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceattachmentconfiguration.html
     */
    export interface ConfluenceAttachmentConfigurationProperty {
        /**
         * Maps attributes or field names of Confluence attachments to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to Confluence fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The Confluence data source field names must exist in your Confluence custom metadata.
         *
         * If you specify the `AttachentFieldMappings` parameter, you must specify at least one field mapping.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceattachmentconfiguration.html#cfn-kendra-datasource-confluenceattachmentconfiguration-attachmentfieldmappings
         */
        readonly attachmentFieldMappings?: Array<CfnDataSource.ConfluenceAttachmentToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * Indicates whether Amazon Kendra indexes attachments to the pages and blogs in the Confluence data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceattachmentconfiguration.html#cfn-kendra-datasource-confluenceattachmentconfiguration-crawlattachments
         */
        readonly crawlAttachments?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ConfluenceAttachmentConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ConfluenceAttachmentConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ConfluenceAttachmentConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('attachmentFieldMappings', cdk.listValidator(CfnDataSource_ConfluenceAttachmentToIndexFieldMappingPropertyValidator))(properties.attachmentFieldMappings));
    errors.collect(cdk.propertyValidator('crawlAttachments', cdk.validateBoolean)(properties.crawlAttachments));
    return errors.wrap('supplied properties not correct for "ConfluenceAttachmentConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluenceAttachmentConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ConfluenceAttachmentConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluenceAttachmentConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceConfluenceAttachmentConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ConfluenceAttachmentConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AttachmentFieldMappings: cdk.listMapper(cfnDataSourceConfluenceAttachmentToIndexFieldMappingPropertyToCloudFormation)(properties.attachmentFieldMappings),
        CrawlAttachments: cdk.booleanToCloudFormation(properties.crawlAttachments),
    };
}

// @ts-ignore TS6133
function CfnDataSourceConfluenceAttachmentConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ConfluenceAttachmentConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ConfluenceAttachmentConfigurationProperty>();
    ret.addPropertyResult('attachmentFieldMappings', 'AttachmentFieldMappings', properties.AttachmentFieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceConfluenceAttachmentToIndexFieldMappingPropertyFromCloudFormation)(properties.AttachmentFieldMappings) : undefined);
    ret.addPropertyResult('crawlAttachments', 'CrawlAttachments', properties.CrawlAttachments != null ? cfn_parse.FromCloudFormation.getBoolean(properties.CrawlAttachments) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Maps attributes or field names of Confluence attachments to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to Confluence fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The Confuence data source field names must exist in your Confluence custom metadata.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceattachmenttoindexfieldmapping.html
     */
    export interface ConfluenceAttachmentToIndexFieldMappingProperty {
        /**
         * The name of the field in the data source.
         *
         * You must first create the index field using the `UpdateIndex` API.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceattachmenttoindexfieldmapping.html#cfn-kendra-datasource-confluenceattachmenttoindexfieldmapping-datasourcefieldname
         */
        readonly dataSourceFieldName: string;
        /**
         * The format for date fields in the data source. If the field specified in `DataSourceFieldName` is a date field you must specify the date format. If the field is not a date field, an exception is thrown.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceattachmenttoindexfieldmapping.html#cfn-kendra-datasource-confluenceattachmenttoindexfieldmapping-datefieldformat
         */
        readonly dateFieldFormat?: string;
        /**
         * The name of the index field to map to the Confluence data source field. The index field type must match the Confluence field type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceattachmenttoindexfieldmapping.html#cfn-kendra-datasource-confluenceattachmenttoindexfieldmapping-indexfieldname
         */
        readonly indexFieldName: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConfluenceAttachmentToIndexFieldMappingProperty`
 *
 * @param properties - the TypeScript properties of a `ConfluenceAttachmentToIndexFieldMappingProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ConfluenceAttachmentToIndexFieldMappingPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataSourceFieldName', cdk.requiredValidator)(properties.dataSourceFieldName));
    errors.collect(cdk.propertyValidator('dataSourceFieldName', cdk.validateString)(properties.dataSourceFieldName));
    errors.collect(cdk.propertyValidator('dateFieldFormat', cdk.validateString)(properties.dateFieldFormat));
    errors.collect(cdk.propertyValidator('indexFieldName', cdk.requiredValidator)(properties.indexFieldName));
    errors.collect(cdk.propertyValidator('indexFieldName', cdk.validateString)(properties.indexFieldName));
    return errors.wrap('supplied properties not correct for "ConfluenceAttachmentToIndexFieldMappingProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluenceAttachmentToIndexFieldMapping` resource
 *
 * @param properties - the TypeScript properties of a `ConfluenceAttachmentToIndexFieldMappingProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluenceAttachmentToIndexFieldMapping` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceConfluenceAttachmentToIndexFieldMappingPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ConfluenceAttachmentToIndexFieldMappingPropertyValidator(properties).assertSuccess();
    return {
        DataSourceFieldName: cdk.stringToCloudFormation(properties.dataSourceFieldName),
        DateFieldFormat: cdk.stringToCloudFormation(properties.dateFieldFormat),
        IndexFieldName: cdk.stringToCloudFormation(properties.indexFieldName),
    };
}

// @ts-ignore TS6133
function CfnDataSourceConfluenceAttachmentToIndexFieldMappingPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ConfluenceAttachmentToIndexFieldMappingProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ConfluenceAttachmentToIndexFieldMappingProperty>();
    ret.addPropertyResult('dataSourceFieldName', 'DataSourceFieldName', cfn_parse.FromCloudFormation.getString(properties.DataSourceFieldName));
    ret.addPropertyResult('dateFieldFormat', 'DateFieldFormat', properties.DateFieldFormat != null ? cfn_parse.FromCloudFormation.getString(properties.DateFieldFormat) : undefined);
    ret.addPropertyResult('indexFieldName', 'IndexFieldName', cfn_parse.FromCloudFormation.getString(properties.IndexFieldName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Configuration of blog settings for the Confluence data source. Blogs are always indexed unless filtered from the index by the `ExclusionPatterns` or `InclusionPatterns` fields in the `ConfluenceConfiguration` object.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceblogconfiguration.html
     */
    export interface ConfluenceBlogConfigurationProperty {
        /**
         * Maps attributes or field names of Confluence blogs to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to Confluence fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The Confluence data source field names must exist in your Confluence custom metadata.
         *
         * If you specify the `BlogFieldMappings` parameter, you must specify at least one field mapping.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceblogconfiguration.html#cfn-kendra-datasource-confluenceblogconfiguration-blogfieldmappings
         */
        readonly blogFieldMappings?: Array<CfnDataSource.ConfluenceBlogToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ConfluenceBlogConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ConfluenceBlogConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ConfluenceBlogConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('blogFieldMappings', cdk.listValidator(CfnDataSource_ConfluenceBlogToIndexFieldMappingPropertyValidator))(properties.blogFieldMappings));
    return errors.wrap('supplied properties not correct for "ConfluenceBlogConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluenceBlogConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ConfluenceBlogConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluenceBlogConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceConfluenceBlogConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ConfluenceBlogConfigurationPropertyValidator(properties).assertSuccess();
    return {
        BlogFieldMappings: cdk.listMapper(cfnDataSourceConfluenceBlogToIndexFieldMappingPropertyToCloudFormation)(properties.blogFieldMappings),
    };
}

// @ts-ignore TS6133
function CfnDataSourceConfluenceBlogConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ConfluenceBlogConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ConfluenceBlogConfigurationProperty>();
    ret.addPropertyResult('blogFieldMappings', 'BlogFieldMappings', properties.BlogFieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceConfluenceBlogToIndexFieldMappingPropertyFromCloudFormation)(properties.BlogFieldMappings) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Maps attributes or field names of Confluence blog to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to Confluence fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The Confluence data source field names must exist in your Confluence custom metadata.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceblogtoindexfieldmapping.html
     */
    export interface ConfluenceBlogToIndexFieldMappingProperty {
        /**
         * The name of the field in the data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceblogtoindexfieldmapping.html#cfn-kendra-datasource-confluenceblogtoindexfieldmapping-datasourcefieldname
         */
        readonly dataSourceFieldName: string;
        /**
         * The format for date fields in the data source. If the field specified in `DataSourceFieldName` is a date field you must specify the date format. If the field is not a date field, an exception is thrown.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceblogtoindexfieldmapping.html#cfn-kendra-datasource-confluenceblogtoindexfieldmapping-datefieldformat
         */
        readonly dateFieldFormat?: string;
        /**
         * The name of the index field to map to the Confluence data source field. The index field type must match the Confluence field type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceblogtoindexfieldmapping.html#cfn-kendra-datasource-confluenceblogtoindexfieldmapping-indexfieldname
         */
        readonly indexFieldName: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConfluenceBlogToIndexFieldMappingProperty`
 *
 * @param properties - the TypeScript properties of a `ConfluenceBlogToIndexFieldMappingProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ConfluenceBlogToIndexFieldMappingPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataSourceFieldName', cdk.requiredValidator)(properties.dataSourceFieldName));
    errors.collect(cdk.propertyValidator('dataSourceFieldName', cdk.validateString)(properties.dataSourceFieldName));
    errors.collect(cdk.propertyValidator('dateFieldFormat', cdk.validateString)(properties.dateFieldFormat));
    errors.collect(cdk.propertyValidator('indexFieldName', cdk.requiredValidator)(properties.indexFieldName));
    errors.collect(cdk.propertyValidator('indexFieldName', cdk.validateString)(properties.indexFieldName));
    return errors.wrap('supplied properties not correct for "ConfluenceBlogToIndexFieldMappingProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluenceBlogToIndexFieldMapping` resource
 *
 * @param properties - the TypeScript properties of a `ConfluenceBlogToIndexFieldMappingProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluenceBlogToIndexFieldMapping` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceConfluenceBlogToIndexFieldMappingPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ConfluenceBlogToIndexFieldMappingPropertyValidator(properties).assertSuccess();
    return {
        DataSourceFieldName: cdk.stringToCloudFormation(properties.dataSourceFieldName),
        DateFieldFormat: cdk.stringToCloudFormation(properties.dateFieldFormat),
        IndexFieldName: cdk.stringToCloudFormation(properties.indexFieldName),
    };
}

// @ts-ignore TS6133
function CfnDataSourceConfluenceBlogToIndexFieldMappingPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ConfluenceBlogToIndexFieldMappingProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ConfluenceBlogToIndexFieldMappingProperty>();
    ret.addPropertyResult('dataSourceFieldName', 'DataSourceFieldName', cfn_parse.FromCloudFormation.getString(properties.DataSourceFieldName));
    ret.addPropertyResult('dateFieldFormat', 'DateFieldFormat', properties.DateFieldFormat != null ? cfn_parse.FromCloudFormation.getString(properties.DateFieldFormat) : undefined);
    ret.addPropertyResult('indexFieldName', 'IndexFieldName', cfn_parse.FromCloudFormation.getString(properties.IndexFieldName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information to connect to Confluence as your data source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceconfiguration.html
     */
    export interface ConfluenceConfigurationProperty {
        /**
         * Configuration information for indexing attachments to Confluence blogs and pages.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceconfiguration.html#cfn-kendra-datasource-confluenceconfiguration-attachmentconfiguration
         */
        readonly attachmentConfiguration?: CfnDataSource.ConfluenceAttachmentConfigurationProperty | cdk.IResolvable;
        /**
         * Configuration information for indexing Confluence blogs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceconfiguration.html#cfn-kendra-datasource-confluenceconfiguration-blogconfiguration
         */
        readonly blogConfiguration?: CfnDataSource.ConfluenceBlogConfigurationProperty | cdk.IResolvable;
        /**
         * >A list of regular expression patterns to exclude certain blog posts, pages, spaces, or attachments in your Confluence. Content that matches the patterns are excluded from the index. Content that doesn't match the patterns is included in the index. If content matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the content isn't included in the index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceconfiguration.html#cfn-kendra-datasource-confluenceconfiguration-exclusionpatterns
         */
        readonly exclusionPatterns?: string[];
        /**
         * A list of regular expression patterns to include certain blog posts, pages, spaces, or attachments in your Confluence. Content that matches the patterns are included in the index. Content that doesn't match the patterns is excluded from the index. If content matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the content isn't included in the index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceconfiguration.html#cfn-kendra-datasource-confluenceconfiguration-inclusionpatterns
         */
        readonly inclusionPatterns?: string[];
        /**
         * Configuration information for indexing Confluence pages.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceconfiguration.html#cfn-kendra-datasource-confluenceconfiguration-pageconfiguration
         */
        readonly pageConfiguration?: CfnDataSource.ConfluencePageConfigurationProperty | cdk.IResolvable;
        /**
         * The Amazon Resource Name (ARN) of an AWS Secrets Manager secret that contains the key-value pairs required to connect to your Confluence server. The secret must contain a JSON structure with the following keys:
         *
         * - username—The user name or email address of a user with administrative privileges for the Confluence server.
         * - password—The password associated with the user logging in to the Confluence server.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceconfiguration.html#cfn-kendra-datasource-confluenceconfiguration-secretarn
         */
        readonly secretArn: string;
        /**
         * The URL of your Confluence instance. Use the full URL of the server. For example, *https://server.example.com:port/* . You can also use an IP address, for example, *https://192.168.1.113/* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceconfiguration.html#cfn-kendra-datasource-confluenceconfiguration-serverurl
         */
        readonly serverUrl: string;
        /**
         * Configuration information for indexing Confluence spaces.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceconfiguration.html#cfn-kendra-datasource-confluenceconfiguration-spaceconfiguration
         */
        readonly spaceConfiguration?: CfnDataSource.ConfluenceSpaceConfigurationProperty | cdk.IResolvable;
        /**
         * Specifies the version of the Confluence installation that you are connecting to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceconfiguration.html#cfn-kendra-datasource-confluenceconfiguration-version
         */
        readonly version: string;
        /**
         * Configuration information for an Amazon Virtual Private Cloud to connect to your Confluence. For more information, see [Configuring a VPC](https://docs.aws.amazon.com/kendra/latest/dg/vpc-configuration.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluenceconfiguration.html#cfn-kendra-datasource-confluenceconfiguration-vpcconfiguration
         */
        readonly vpcConfiguration?: CfnDataSource.DataSourceVpcConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ConfluenceConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ConfluenceConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ConfluenceConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('attachmentConfiguration', CfnDataSource_ConfluenceAttachmentConfigurationPropertyValidator)(properties.attachmentConfiguration));
    errors.collect(cdk.propertyValidator('blogConfiguration', CfnDataSource_ConfluenceBlogConfigurationPropertyValidator)(properties.blogConfiguration));
    errors.collect(cdk.propertyValidator('exclusionPatterns', cdk.listValidator(cdk.validateString))(properties.exclusionPatterns));
    errors.collect(cdk.propertyValidator('inclusionPatterns', cdk.listValidator(cdk.validateString))(properties.inclusionPatterns));
    errors.collect(cdk.propertyValidator('pageConfiguration', CfnDataSource_ConfluencePageConfigurationPropertyValidator)(properties.pageConfiguration));
    errors.collect(cdk.propertyValidator('secretArn', cdk.requiredValidator)(properties.secretArn));
    errors.collect(cdk.propertyValidator('secretArn', cdk.validateString)(properties.secretArn));
    errors.collect(cdk.propertyValidator('serverUrl', cdk.requiredValidator)(properties.serverUrl));
    errors.collect(cdk.propertyValidator('serverUrl', cdk.validateString)(properties.serverUrl));
    errors.collect(cdk.propertyValidator('spaceConfiguration', CfnDataSource_ConfluenceSpaceConfigurationPropertyValidator)(properties.spaceConfiguration));
    errors.collect(cdk.propertyValidator('version', cdk.requiredValidator)(properties.version));
    errors.collect(cdk.propertyValidator('version', cdk.validateString)(properties.version));
    errors.collect(cdk.propertyValidator('vpcConfiguration', CfnDataSource_DataSourceVpcConfigurationPropertyValidator)(properties.vpcConfiguration));
    return errors.wrap('supplied properties not correct for "ConfluenceConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluenceConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ConfluenceConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluenceConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceConfluenceConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ConfluenceConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AttachmentConfiguration: cfnDataSourceConfluenceAttachmentConfigurationPropertyToCloudFormation(properties.attachmentConfiguration),
        BlogConfiguration: cfnDataSourceConfluenceBlogConfigurationPropertyToCloudFormation(properties.blogConfiguration),
        ExclusionPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.exclusionPatterns),
        InclusionPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.inclusionPatterns),
        PageConfiguration: cfnDataSourceConfluencePageConfigurationPropertyToCloudFormation(properties.pageConfiguration),
        SecretArn: cdk.stringToCloudFormation(properties.secretArn),
        ServerUrl: cdk.stringToCloudFormation(properties.serverUrl),
        SpaceConfiguration: cfnDataSourceConfluenceSpaceConfigurationPropertyToCloudFormation(properties.spaceConfiguration),
        Version: cdk.stringToCloudFormation(properties.version),
        VpcConfiguration: cfnDataSourceDataSourceVpcConfigurationPropertyToCloudFormation(properties.vpcConfiguration),
    };
}

// @ts-ignore TS6133
function CfnDataSourceConfluenceConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ConfluenceConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ConfluenceConfigurationProperty>();
    ret.addPropertyResult('attachmentConfiguration', 'AttachmentConfiguration', properties.AttachmentConfiguration != null ? CfnDataSourceConfluenceAttachmentConfigurationPropertyFromCloudFormation(properties.AttachmentConfiguration) : undefined);
    ret.addPropertyResult('blogConfiguration', 'BlogConfiguration', properties.BlogConfiguration != null ? CfnDataSourceConfluenceBlogConfigurationPropertyFromCloudFormation(properties.BlogConfiguration) : undefined);
    ret.addPropertyResult('exclusionPatterns', 'ExclusionPatterns', properties.ExclusionPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExclusionPatterns) : undefined);
    ret.addPropertyResult('inclusionPatterns', 'InclusionPatterns', properties.InclusionPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.InclusionPatterns) : undefined);
    ret.addPropertyResult('pageConfiguration', 'PageConfiguration', properties.PageConfiguration != null ? CfnDataSourceConfluencePageConfigurationPropertyFromCloudFormation(properties.PageConfiguration) : undefined);
    ret.addPropertyResult('secretArn', 'SecretArn', cfn_parse.FromCloudFormation.getString(properties.SecretArn));
    ret.addPropertyResult('serverUrl', 'ServerUrl', cfn_parse.FromCloudFormation.getString(properties.ServerUrl));
    ret.addPropertyResult('spaceConfiguration', 'SpaceConfiguration', properties.SpaceConfiguration != null ? CfnDataSourceConfluenceSpaceConfigurationPropertyFromCloudFormation(properties.SpaceConfiguration) : undefined);
    ret.addPropertyResult('version', 'Version', cfn_parse.FromCloudFormation.getString(properties.Version));
    ret.addPropertyResult('vpcConfiguration', 'VpcConfiguration', properties.VpcConfiguration != null ? CfnDataSourceDataSourceVpcConfigurationPropertyFromCloudFormation(properties.VpcConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Configuration of the page settings for the Confluence data source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencepageconfiguration.html
     */
    export interface ConfluencePageConfigurationProperty {
        /**
         * >Maps attributes or field names of Confluence pages to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to Confluence fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The Confluence data source field names must exist in your Confluence custom metadata.
         *
         * If you specify the `PageFieldMappings` parameter, you must specify at least one field mapping.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencepageconfiguration.html#cfn-kendra-datasource-confluencepageconfiguration-pagefieldmappings
         */
        readonly pageFieldMappings?: Array<CfnDataSource.ConfluencePageToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ConfluencePageConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ConfluencePageConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ConfluencePageConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('pageFieldMappings', cdk.listValidator(CfnDataSource_ConfluencePageToIndexFieldMappingPropertyValidator))(properties.pageFieldMappings));
    return errors.wrap('supplied properties not correct for "ConfluencePageConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluencePageConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ConfluencePageConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluencePageConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceConfluencePageConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ConfluencePageConfigurationPropertyValidator(properties).assertSuccess();
    return {
        PageFieldMappings: cdk.listMapper(cfnDataSourceConfluencePageToIndexFieldMappingPropertyToCloudFormation)(properties.pageFieldMappings),
    };
}

// @ts-ignore TS6133
function CfnDataSourceConfluencePageConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ConfluencePageConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ConfluencePageConfigurationProperty>();
    ret.addPropertyResult('pageFieldMappings', 'PageFieldMappings', properties.PageFieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceConfluencePageToIndexFieldMappingPropertyFromCloudFormation)(properties.PageFieldMappings) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * >Maps attributes or field names of Confluence pages to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to Confluence fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The Confluence data source field names must exist in your Confluence custom metadata.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencepagetoindexfieldmapping.html
     */
    export interface ConfluencePageToIndexFieldMappingProperty {
        /**
         * The name of the field in the data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencepagetoindexfieldmapping.html#cfn-kendra-datasource-confluencepagetoindexfieldmapping-datasourcefieldname
         */
        readonly dataSourceFieldName: string;
        /**
         * The format for date fields in the data source. If the field specified in `DataSourceFieldName` is a date field you must specify the date format. If the field is not a date field, an exception is thrown.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencepagetoindexfieldmapping.html#cfn-kendra-datasource-confluencepagetoindexfieldmapping-datefieldformat
         */
        readonly dateFieldFormat?: string;
        /**
         * The name of the index field to map to the Confluence data source field. The index field type must match the Confluence field type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencepagetoindexfieldmapping.html#cfn-kendra-datasource-confluencepagetoindexfieldmapping-indexfieldname
         */
        readonly indexFieldName: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConfluencePageToIndexFieldMappingProperty`
 *
 * @param properties - the TypeScript properties of a `ConfluencePageToIndexFieldMappingProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ConfluencePageToIndexFieldMappingPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataSourceFieldName', cdk.requiredValidator)(properties.dataSourceFieldName));
    errors.collect(cdk.propertyValidator('dataSourceFieldName', cdk.validateString)(properties.dataSourceFieldName));
    errors.collect(cdk.propertyValidator('dateFieldFormat', cdk.validateString)(properties.dateFieldFormat));
    errors.collect(cdk.propertyValidator('indexFieldName', cdk.requiredValidator)(properties.indexFieldName));
    errors.collect(cdk.propertyValidator('indexFieldName', cdk.validateString)(properties.indexFieldName));
    return errors.wrap('supplied properties not correct for "ConfluencePageToIndexFieldMappingProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluencePageToIndexFieldMapping` resource
 *
 * @param properties - the TypeScript properties of a `ConfluencePageToIndexFieldMappingProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluencePageToIndexFieldMapping` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceConfluencePageToIndexFieldMappingPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ConfluencePageToIndexFieldMappingPropertyValidator(properties).assertSuccess();
    return {
        DataSourceFieldName: cdk.stringToCloudFormation(properties.dataSourceFieldName),
        DateFieldFormat: cdk.stringToCloudFormation(properties.dateFieldFormat),
        IndexFieldName: cdk.stringToCloudFormation(properties.indexFieldName),
    };
}

// @ts-ignore TS6133
function CfnDataSourceConfluencePageToIndexFieldMappingPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ConfluencePageToIndexFieldMappingProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ConfluencePageToIndexFieldMappingProperty>();
    ret.addPropertyResult('dataSourceFieldName', 'DataSourceFieldName', cfn_parse.FromCloudFormation.getString(properties.DataSourceFieldName));
    ret.addPropertyResult('dateFieldFormat', 'DateFieldFormat', properties.DateFieldFormat != null ? cfn_parse.FromCloudFormation.getString(properties.DateFieldFormat) : undefined);
    ret.addPropertyResult('indexFieldName', 'IndexFieldName', cfn_parse.FromCloudFormation.getString(properties.IndexFieldName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Configuration information for indexing Confluence spaces.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencespaceconfiguration.html
     */
    export interface ConfluenceSpaceConfigurationProperty {
        /**
         * Specifies whether Amazon Kendra should index archived spaces.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencespaceconfiguration.html#cfn-kendra-datasource-confluencespaceconfiguration-crawlarchivedspaces
         */
        readonly crawlArchivedSpaces?: boolean | cdk.IResolvable;
        /**
         * Specifies whether Amazon Kendra should index personal spaces. Users can add restrictions to items in personal spaces. If personal spaces are indexed, queries without user context information may return restricted items from a personal space in their results. For more information, see [Filtering on user context](https://docs.aws.amazon.com/kendra/latest/dg/user-context-filter.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencespaceconfiguration.html#cfn-kendra-datasource-confluencespaceconfiguration-crawlpersonalspaces
         */
        readonly crawlPersonalSpaces?: boolean | cdk.IResolvable;
        /**
         * A list of space keys of Confluence spaces. If you include a key, the blogs, documents, and attachments in the space are not indexed. If a space is in both the `ExcludeSpaces` and the `IncludeSpaces` list, the space is excluded.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencespaceconfiguration.html#cfn-kendra-datasource-confluencespaceconfiguration-excludespaces
         */
        readonly excludeSpaces?: string[];
        /**
         * A list of space keys for Confluence spaces. If you include a key, the blogs, documents, and attachments in the space are indexed. Spaces that aren't in the list aren't indexed. A space in the list must exist. Otherwise, Amazon Kendra logs an error when the data source is synchronized. If a space is in both the `IncludeSpaces` and the `ExcludeSpaces` list, the space is excluded.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencespaceconfiguration.html#cfn-kendra-datasource-confluencespaceconfiguration-includespaces
         */
        readonly includeSpaces?: string[];
        /**
         * Maps attributes or field names of Confluence spaces to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to Confluence fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The Confluence data source field names must exist in your Confluence custom metadata.
         *
         * If you specify the `SpaceFieldMappings` parameter, you must specify at least one field mapping.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencespaceconfiguration.html#cfn-kendra-datasource-confluencespaceconfiguration-spacefieldmappings
         */
        readonly spaceFieldMappings?: Array<CfnDataSource.ConfluenceSpaceToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ConfluenceSpaceConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ConfluenceSpaceConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ConfluenceSpaceConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('crawlArchivedSpaces', cdk.validateBoolean)(properties.crawlArchivedSpaces));
    errors.collect(cdk.propertyValidator('crawlPersonalSpaces', cdk.validateBoolean)(properties.crawlPersonalSpaces));
    errors.collect(cdk.propertyValidator('excludeSpaces', cdk.listValidator(cdk.validateString))(properties.excludeSpaces));
    errors.collect(cdk.propertyValidator('includeSpaces', cdk.listValidator(cdk.validateString))(properties.includeSpaces));
    errors.collect(cdk.propertyValidator('spaceFieldMappings', cdk.listValidator(CfnDataSource_ConfluenceSpaceToIndexFieldMappingPropertyValidator))(properties.spaceFieldMappings));
    return errors.wrap('supplied properties not correct for "ConfluenceSpaceConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluenceSpaceConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ConfluenceSpaceConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluenceSpaceConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceConfluenceSpaceConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ConfluenceSpaceConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CrawlArchivedSpaces: cdk.booleanToCloudFormation(properties.crawlArchivedSpaces),
        CrawlPersonalSpaces: cdk.booleanToCloudFormation(properties.crawlPersonalSpaces),
        ExcludeSpaces: cdk.listMapper(cdk.stringToCloudFormation)(properties.excludeSpaces),
        IncludeSpaces: cdk.listMapper(cdk.stringToCloudFormation)(properties.includeSpaces),
        SpaceFieldMappings: cdk.listMapper(cfnDataSourceConfluenceSpaceToIndexFieldMappingPropertyToCloudFormation)(properties.spaceFieldMappings),
    };
}

// @ts-ignore TS6133
function CfnDataSourceConfluenceSpaceConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ConfluenceSpaceConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ConfluenceSpaceConfigurationProperty>();
    ret.addPropertyResult('crawlArchivedSpaces', 'CrawlArchivedSpaces', properties.CrawlArchivedSpaces != null ? cfn_parse.FromCloudFormation.getBoolean(properties.CrawlArchivedSpaces) : undefined);
    ret.addPropertyResult('crawlPersonalSpaces', 'CrawlPersonalSpaces', properties.CrawlPersonalSpaces != null ? cfn_parse.FromCloudFormation.getBoolean(properties.CrawlPersonalSpaces) : undefined);
    ret.addPropertyResult('excludeSpaces', 'ExcludeSpaces', properties.ExcludeSpaces != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExcludeSpaces) : undefined);
    ret.addPropertyResult('includeSpaces', 'IncludeSpaces', properties.IncludeSpaces != null ? cfn_parse.FromCloudFormation.getStringArray(properties.IncludeSpaces) : undefined);
    ret.addPropertyResult('spaceFieldMappings', 'SpaceFieldMappings', properties.SpaceFieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceConfluenceSpaceToIndexFieldMappingPropertyFromCloudFormation)(properties.SpaceFieldMappings) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * >Maps attributes or field names of Confluence spaces to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to Confluence fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The Confluence data source field names must exist in your Confluence custom metadata.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencespacetoindexfieldmapping.html
     */
    export interface ConfluenceSpaceToIndexFieldMappingProperty {
        /**
         * The name of the field in the data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencespacetoindexfieldmapping.html#cfn-kendra-datasource-confluencespacetoindexfieldmapping-datasourcefieldname
         */
        readonly dataSourceFieldName: string;
        /**
         * The format for date fields in the data source. If the field specified in `DataSourceFieldName` is a date field you must specify the date format. If the field is not a date field, an exception is thrown.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencespacetoindexfieldmapping.html#cfn-kendra-datasource-confluencespacetoindexfieldmapping-datefieldformat
         */
        readonly dateFieldFormat?: string;
        /**
         * The name of the index field to map to the Confluence data source field. The index field type must match the Confluence field type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-confluencespacetoindexfieldmapping.html#cfn-kendra-datasource-confluencespacetoindexfieldmapping-indexfieldname
         */
        readonly indexFieldName: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConfluenceSpaceToIndexFieldMappingProperty`
 *
 * @param properties - the TypeScript properties of a `ConfluenceSpaceToIndexFieldMappingProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ConfluenceSpaceToIndexFieldMappingPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataSourceFieldName', cdk.requiredValidator)(properties.dataSourceFieldName));
    errors.collect(cdk.propertyValidator('dataSourceFieldName', cdk.validateString)(properties.dataSourceFieldName));
    errors.collect(cdk.propertyValidator('dateFieldFormat', cdk.validateString)(properties.dateFieldFormat));
    errors.collect(cdk.propertyValidator('indexFieldName', cdk.requiredValidator)(properties.indexFieldName));
    errors.collect(cdk.propertyValidator('indexFieldName', cdk.validateString)(properties.indexFieldName));
    return errors.wrap('supplied properties not correct for "ConfluenceSpaceToIndexFieldMappingProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluenceSpaceToIndexFieldMapping` resource
 *
 * @param properties - the TypeScript properties of a `ConfluenceSpaceToIndexFieldMappingProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConfluenceSpaceToIndexFieldMapping` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceConfluenceSpaceToIndexFieldMappingPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ConfluenceSpaceToIndexFieldMappingPropertyValidator(properties).assertSuccess();
    return {
        DataSourceFieldName: cdk.stringToCloudFormation(properties.dataSourceFieldName),
        DateFieldFormat: cdk.stringToCloudFormation(properties.dateFieldFormat),
        IndexFieldName: cdk.stringToCloudFormation(properties.indexFieldName),
    };
}

// @ts-ignore TS6133
function CfnDataSourceConfluenceSpaceToIndexFieldMappingPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ConfluenceSpaceToIndexFieldMappingProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ConfluenceSpaceToIndexFieldMappingProperty>();
    ret.addPropertyResult('dataSourceFieldName', 'DataSourceFieldName', cfn_parse.FromCloudFormation.getString(properties.DataSourceFieldName));
    ret.addPropertyResult('dateFieldFormat', 'DateFieldFormat', properties.DateFieldFormat != null ? cfn_parse.FromCloudFormation.getString(properties.DateFieldFormat) : undefined);
    ret.addPropertyResult('indexFieldName', 'IndexFieldName', cfn_parse.FromCloudFormation.getString(properties.IndexFieldName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information that's required to connect to a database.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-connectionconfiguration.html
     */
    export interface ConnectionConfigurationProperty {
        /**
         * The name of the host for the database. Can be either a string (host.subdomain.domain.tld) or an IPv4 or IPv6 address.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-connectionconfiguration.html#cfn-kendra-datasource-connectionconfiguration-databasehost
         */
        readonly databaseHost: string;
        /**
         * The name of the database containing the document data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-connectionconfiguration.html#cfn-kendra-datasource-connectionconfiguration-databasename
         */
        readonly databaseName: string;
        /**
         * The port that the database uses for connections.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-connectionconfiguration.html#cfn-kendra-datasource-connectionconfiguration-databaseport
         */
        readonly databasePort: number;
        /**
         * The Amazon Resource Name (ARN) of credentials stored in AWS Secrets Manager . The credentials should be a user/password pair. For more information, see [Using a Database Data Source](https://docs.aws.amazon.com/kendra/latest/dg/data-source-database.html) . For more information about AWS Secrets Manager , see [What Is AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) in the *AWS Secrets Manager* user guide.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-connectionconfiguration.html#cfn-kendra-datasource-connectionconfiguration-secretarn
         */
        readonly secretArn: string;
        /**
         * The name of the table that contains the document data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-connectionconfiguration.html#cfn-kendra-datasource-connectionconfiguration-tablename
         */
        readonly tableName: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConnectionConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ConnectionConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ConnectionConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('databaseHost', cdk.requiredValidator)(properties.databaseHost));
    errors.collect(cdk.propertyValidator('databaseHost', cdk.validateString)(properties.databaseHost));
    errors.collect(cdk.propertyValidator('databaseName', cdk.requiredValidator)(properties.databaseName));
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    errors.collect(cdk.propertyValidator('databasePort', cdk.requiredValidator)(properties.databasePort));
    errors.collect(cdk.propertyValidator('databasePort', cdk.validateNumber)(properties.databasePort));
    errors.collect(cdk.propertyValidator('secretArn', cdk.requiredValidator)(properties.secretArn));
    errors.collect(cdk.propertyValidator('secretArn', cdk.validateString)(properties.secretArn));
    errors.collect(cdk.propertyValidator('tableName', cdk.requiredValidator)(properties.tableName));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    return errors.wrap('supplied properties not correct for "ConnectionConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConnectionConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ConnectionConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ConnectionConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceConnectionConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ConnectionConfigurationPropertyValidator(properties).assertSuccess();
    return {
        DatabaseHost: cdk.stringToCloudFormation(properties.databaseHost),
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
        DatabasePort: cdk.numberToCloudFormation(properties.databasePort),
        SecretArn: cdk.stringToCloudFormation(properties.secretArn),
        TableName: cdk.stringToCloudFormation(properties.tableName),
    };
}

// @ts-ignore TS6133
function CfnDataSourceConnectionConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ConnectionConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ConnectionConfigurationProperty>();
    ret.addPropertyResult('databaseHost', 'DatabaseHost', cfn_parse.FromCloudFormation.getString(properties.DatabaseHost));
    ret.addPropertyResult('databaseName', 'DatabaseName', cfn_parse.FromCloudFormation.getString(properties.DatabaseName));
    ret.addPropertyResult('databasePort', 'DatabasePort', cfn_parse.FromCloudFormation.getNumber(properties.DatabasePort));
    ret.addPropertyResult('secretArn', 'SecretArn', cfn_parse.FromCloudFormation.getString(properties.SecretArn));
    ret.addPropertyResult('tableName', 'TableName', cfn_parse.FromCloudFormation.getString(properties.TableName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information for altering document metadata and content during the document ingestion process.
     *
     * For more information, see [Customizing document metadata during the ingestion process](https://docs.aws.amazon.com/kendra/latest/dg/custom-document-enrichment.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-customdocumentenrichmentconfiguration.html
     */
    export interface CustomDocumentEnrichmentConfigurationProperty {
        /**
         * Configuration information to alter document attributes or metadata fields and content when ingesting documents into Amazon Kendra.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-customdocumentenrichmentconfiguration.html#cfn-kendra-datasource-customdocumentenrichmentconfiguration-inlineconfigurations
         */
        readonly inlineConfigurations?: Array<CfnDataSource.InlineCustomDocumentEnrichmentConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * Configuration information for invoking a Lambda function in AWS Lambda on the structured documents with their metadata and text extracted. You can use a Lambda function to apply advanced logic for creating, modifying, or deleting document metadata and content. For more information, see [Advanced data manipulation](https://docs.aws.amazon.com/kendra/latest/dg/custom-document-enrichment.html#advanced-data-manipulation) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-customdocumentenrichmentconfiguration.html#cfn-kendra-datasource-customdocumentenrichmentconfiguration-postextractionhookconfiguration
         */
        readonly postExtractionHookConfiguration?: CfnDataSource.HookConfigurationProperty | cdk.IResolvable;
        /**
         * Configuration information for invoking a Lambda function in AWS Lambda on the original or raw documents before extracting their metadata and text. You can use a Lambda function to apply advanced logic for creating, modifying, or deleting document metadata and content. For more information, see [Advanced data manipulation](https://docs.aws.amazon.com/kendra/latest/dg/custom-document-enrichment.html#advanced-data-manipulation) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-customdocumentenrichmentconfiguration.html#cfn-kendra-datasource-customdocumentenrichmentconfiguration-preextractionhookconfiguration
         */
        readonly preExtractionHookConfiguration?: CfnDataSource.HookConfigurationProperty | cdk.IResolvable;
        /**
         * The Amazon Resource Name (ARN) of a role with permission to run `PreExtractionHookConfiguration` and `PostExtractionHookConfiguration` for altering document metadata and content during the document ingestion process. For more information, see [IAM roles for Amazon Kendra](https://docs.aws.amazon.com/kendra/latest/dg/iam-roles.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-customdocumentenrichmentconfiguration.html#cfn-kendra-datasource-customdocumentenrichmentconfiguration-rolearn
         */
        readonly roleArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `CustomDocumentEnrichmentConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `CustomDocumentEnrichmentConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_CustomDocumentEnrichmentConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('inlineConfigurations', cdk.listValidator(CfnDataSource_InlineCustomDocumentEnrichmentConfigurationPropertyValidator))(properties.inlineConfigurations));
    errors.collect(cdk.propertyValidator('postExtractionHookConfiguration', CfnDataSource_HookConfigurationPropertyValidator)(properties.postExtractionHookConfiguration));
    errors.collect(cdk.propertyValidator('preExtractionHookConfiguration', CfnDataSource_HookConfigurationPropertyValidator)(properties.preExtractionHookConfiguration));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "CustomDocumentEnrichmentConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.CustomDocumentEnrichmentConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CustomDocumentEnrichmentConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.CustomDocumentEnrichmentConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceCustomDocumentEnrichmentConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_CustomDocumentEnrichmentConfigurationPropertyValidator(properties).assertSuccess();
    return {
        InlineConfigurations: cdk.listMapper(cfnDataSourceInlineCustomDocumentEnrichmentConfigurationPropertyToCloudFormation)(properties.inlineConfigurations),
        PostExtractionHookConfiguration: cfnDataSourceHookConfigurationPropertyToCloudFormation(properties.postExtractionHookConfiguration),
        PreExtractionHookConfiguration: cfnDataSourceHookConfigurationPropertyToCloudFormation(properties.preExtractionHookConfiguration),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnDataSourceCustomDocumentEnrichmentConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.CustomDocumentEnrichmentConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.CustomDocumentEnrichmentConfigurationProperty>();
    ret.addPropertyResult('inlineConfigurations', 'InlineConfigurations', properties.InlineConfigurations != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceInlineCustomDocumentEnrichmentConfigurationPropertyFromCloudFormation)(properties.InlineConfigurations) : undefined);
    ret.addPropertyResult('postExtractionHookConfiguration', 'PostExtractionHookConfiguration', properties.PostExtractionHookConfiguration != null ? CfnDataSourceHookConfigurationPropertyFromCloudFormation(properties.PostExtractionHookConfiguration) : undefined);
    ret.addPropertyResult('preExtractionHookConfiguration', 'PreExtractionHookConfiguration', properties.PreExtractionHookConfiguration != null ? CfnDataSourceHookConfigurationPropertyFromCloudFormation(properties.PreExtractionHookConfiguration) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', properties.RoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.RoleArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information for an Amazon Kendra data source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourceconfiguration.html
     */
    export interface DataSourceConfigurationProperty {
        /**
         * Provides the configuration information to connect to Confluence as your data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourceconfiguration.html#cfn-kendra-datasource-datasourceconfiguration-confluenceconfiguration
         */
        readonly confluenceConfiguration?: CfnDataSource.ConfluenceConfigurationProperty | cdk.IResolvable;
        /**
         * Provides the configuration information to connect to a database as your data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourceconfiguration.html#cfn-kendra-datasource-datasourceconfiguration-databaseconfiguration
         */
        readonly databaseConfiguration?: CfnDataSource.DatabaseConfigurationProperty | cdk.IResolvable;
        /**
         * Provides the configuration information to connect to Google Drive as your data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourceconfiguration.html#cfn-kendra-datasource-datasourceconfiguration-googledriveconfiguration
         */
        readonly googleDriveConfiguration?: CfnDataSource.GoogleDriveConfigurationProperty | cdk.IResolvable;
        /**
         * Provides the configuration information to connect to Microsoft OneDrive as your data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourceconfiguration.html#cfn-kendra-datasource-datasourceconfiguration-onedriveconfiguration
         */
        readonly oneDriveConfiguration?: CfnDataSource.OneDriveConfigurationProperty | cdk.IResolvable;
        /**
         * Provides the configuration information to connect to an Amazon S3 bucket as your data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourceconfiguration.html#cfn-kendra-datasource-datasourceconfiguration-s3configuration
         */
        readonly s3Configuration?: CfnDataSource.S3DataSourceConfigurationProperty | cdk.IResolvable;
        /**
         * Provides the configuration information to connect to Salesforce as your data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourceconfiguration.html#cfn-kendra-datasource-datasourceconfiguration-salesforceconfiguration
         */
        readonly salesforceConfiguration?: CfnDataSource.SalesforceConfigurationProperty | cdk.IResolvable;
        /**
         * Provides the configuration information to connect to ServiceNow as your data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourceconfiguration.html#cfn-kendra-datasource-datasourceconfiguration-servicenowconfiguration
         */
        readonly serviceNowConfiguration?: CfnDataSource.ServiceNowConfigurationProperty | cdk.IResolvable;
        /**
         * Provides the configuration information to connect to Microsoft SharePoint as your data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourceconfiguration.html#cfn-kendra-datasource-datasourceconfiguration-sharepointconfiguration
         */
        readonly sharePointConfiguration?: CfnDataSource.SharePointConfigurationProperty | cdk.IResolvable;
        /**
         * Provides the configuration information required for Amazon Kendra Web Crawler.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourceconfiguration.html#cfn-kendra-datasource-datasourceconfiguration-webcrawlerconfiguration
         */
        readonly webCrawlerConfiguration?: CfnDataSource.WebCrawlerConfigurationProperty | cdk.IResolvable;
        /**
         * Provides the configuration information to connect to Amazon WorkDocs as your data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourceconfiguration.html#cfn-kendra-datasource-datasourceconfiguration-workdocsconfiguration
         */
        readonly workDocsConfiguration?: CfnDataSource.WorkDocsConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DataSourceConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `DataSourceConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_DataSourceConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('confluenceConfiguration', CfnDataSource_ConfluenceConfigurationPropertyValidator)(properties.confluenceConfiguration));
    errors.collect(cdk.propertyValidator('databaseConfiguration', CfnDataSource_DatabaseConfigurationPropertyValidator)(properties.databaseConfiguration));
    errors.collect(cdk.propertyValidator('googleDriveConfiguration', CfnDataSource_GoogleDriveConfigurationPropertyValidator)(properties.googleDriveConfiguration));
    errors.collect(cdk.propertyValidator('oneDriveConfiguration', CfnDataSource_OneDriveConfigurationPropertyValidator)(properties.oneDriveConfiguration));
    errors.collect(cdk.propertyValidator('s3Configuration', CfnDataSource_S3DataSourceConfigurationPropertyValidator)(properties.s3Configuration));
    errors.collect(cdk.propertyValidator('salesforceConfiguration', CfnDataSource_SalesforceConfigurationPropertyValidator)(properties.salesforceConfiguration));
    errors.collect(cdk.propertyValidator('serviceNowConfiguration', CfnDataSource_ServiceNowConfigurationPropertyValidator)(properties.serviceNowConfiguration));
    errors.collect(cdk.propertyValidator('sharePointConfiguration', CfnDataSource_SharePointConfigurationPropertyValidator)(properties.sharePointConfiguration));
    errors.collect(cdk.propertyValidator('webCrawlerConfiguration', CfnDataSource_WebCrawlerConfigurationPropertyValidator)(properties.webCrawlerConfiguration));
    errors.collect(cdk.propertyValidator('workDocsConfiguration', CfnDataSource_WorkDocsConfigurationPropertyValidator)(properties.workDocsConfiguration));
    return errors.wrap('supplied properties not correct for "DataSourceConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DataSourceConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `DataSourceConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DataSourceConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceDataSourceConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_DataSourceConfigurationPropertyValidator(properties).assertSuccess();
    return {
        ConfluenceConfiguration: cfnDataSourceConfluenceConfigurationPropertyToCloudFormation(properties.confluenceConfiguration),
        DatabaseConfiguration: cfnDataSourceDatabaseConfigurationPropertyToCloudFormation(properties.databaseConfiguration),
        GoogleDriveConfiguration: cfnDataSourceGoogleDriveConfigurationPropertyToCloudFormation(properties.googleDriveConfiguration),
        OneDriveConfiguration: cfnDataSourceOneDriveConfigurationPropertyToCloudFormation(properties.oneDriveConfiguration),
        S3Configuration: cfnDataSourceS3DataSourceConfigurationPropertyToCloudFormation(properties.s3Configuration),
        SalesforceConfiguration: cfnDataSourceSalesforceConfigurationPropertyToCloudFormation(properties.salesforceConfiguration),
        ServiceNowConfiguration: cfnDataSourceServiceNowConfigurationPropertyToCloudFormation(properties.serviceNowConfiguration),
        SharePointConfiguration: cfnDataSourceSharePointConfigurationPropertyToCloudFormation(properties.sharePointConfiguration),
        WebCrawlerConfiguration: cfnDataSourceWebCrawlerConfigurationPropertyToCloudFormation(properties.webCrawlerConfiguration),
        WorkDocsConfiguration: cfnDataSourceWorkDocsConfigurationPropertyToCloudFormation(properties.workDocsConfiguration),
    };
}

// @ts-ignore TS6133
function CfnDataSourceDataSourceConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.DataSourceConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.DataSourceConfigurationProperty>();
    ret.addPropertyResult('confluenceConfiguration', 'ConfluenceConfiguration', properties.ConfluenceConfiguration != null ? CfnDataSourceConfluenceConfigurationPropertyFromCloudFormation(properties.ConfluenceConfiguration) : undefined);
    ret.addPropertyResult('databaseConfiguration', 'DatabaseConfiguration', properties.DatabaseConfiguration != null ? CfnDataSourceDatabaseConfigurationPropertyFromCloudFormation(properties.DatabaseConfiguration) : undefined);
    ret.addPropertyResult('googleDriveConfiguration', 'GoogleDriveConfiguration', properties.GoogleDriveConfiguration != null ? CfnDataSourceGoogleDriveConfigurationPropertyFromCloudFormation(properties.GoogleDriveConfiguration) : undefined);
    ret.addPropertyResult('oneDriveConfiguration', 'OneDriveConfiguration', properties.OneDriveConfiguration != null ? CfnDataSourceOneDriveConfigurationPropertyFromCloudFormation(properties.OneDriveConfiguration) : undefined);
    ret.addPropertyResult('s3Configuration', 'S3Configuration', properties.S3Configuration != null ? CfnDataSourceS3DataSourceConfigurationPropertyFromCloudFormation(properties.S3Configuration) : undefined);
    ret.addPropertyResult('salesforceConfiguration', 'SalesforceConfiguration', properties.SalesforceConfiguration != null ? CfnDataSourceSalesforceConfigurationPropertyFromCloudFormation(properties.SalesforceConfiguration) : undefined);
    ret.addPropertyResult('serviceNowConfiguration', 'ServiceNowConfiguration', properties.ServiceNowConfiguration != null ? CfnDataSourceServiceNowConfigurationPropertyFromCloudFormation(properties.ServiceNowConfiguration) : undefined);
    ret.addPropertyResult('sharePointConfiguration', 'SharePointConfiguration', properties.SharePointConfiguration != null ? CfnDataSourceSharePointConfigurationPropertyFromCloudFormation(properties.SharePointConfiguration) : undefined);
    ret.addPropertyResult('webCrawlerConfiguration', 'WebCrawlerConfiguration', properties.WebCrawlerConfiguration != null ? CfnDataSourceWebCrawlerConfigurationPropertyFromCloudFormation(properties.WebCrawlerConfiguration) : undefined);
    ret.addPropertyResult('workDocsConfiguration', 'WorkDocsConfiguration', properties.WorkDocsConfiguration != null ? CfnDataSourceWorkDocsConfigurationPropertyFromCloudFormation(properties.WorkDocsConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Maps a column or attribute in the data source to an index field. You must first create the fields in the index using the [UpdateIndex](https://docs.aws.amazon.com/kendra/latest/dg/API_UpdateIndex.html) operation.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourcetoindexfieldmapping.html
     */
    export interface DataSourceToIndexFieldMappingProperty {
        /**
         * The name of the column or attribute in the data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourcetoindexfieldmapping.html#cfn-kendra-datasource-datasourcetoindexfieldmapping-datasourcefieldname
         */
        readonly dataSourceFieldName: string;
        /**
         * The type of data stored in the column or attribute.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourcetoindexfieldmapping.html#cfn-kendra-datasource-datasourcetoindexfieldmapping-datefieldformat
         */
        readonly dateFieldFormat?: string;
        /**
         * The name of the field in the index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourcetoindexfieldmapping.html#cfn-kendra-datasource-datasourcetoindexfieldmapping-indexfieldname
         */
        readonly indexFieldName: string;
    }
}

/**
 * Determine whether the given properties match those of a `DataSourceToIndexFieldMappingProperty`
 *
 * @param properties - the TypeScript properties of a `DataSourceToIndexFieldMappingProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_DataSourceToIndexFieldMappingPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataSourceFieldName', cdk.requiredValidator)(properties.dataSourceFieldName));
    errors.collect(cdk.propertyValidator('dataSourceFieldName', cdk.validateString)(properties.dataSourceFieldName));
    errors.collect(cdk.propertyValidator('dateFieldFormat', cdk.validateString)(properties.dateFieldFormat));
    errors.collect(cdk.propertyValidator('indexFieldName', cdk.requiredValidator)(properties.indexFieldName));
    errors.collect(cdk.propertyValidator('indexFieldName', cdk.validateString)(properties.indexFieldName));
    return errors.wrap('supplied properties not correct for "DataSourceToIndexFieldMappingProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DataSourceToIndexFieldMapping` resource
 *
 * @param properties - the TypeScript properties of a `DataSourceToIndexFieldMappingProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DataSourceToIndexFieldMapping` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceDataSourceToIndexFieldMappingPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_DataSourceToIndexFieldMappingPropertyValidator(properties).assertSuccess();
    return {
        DataSourceFieldName: cdk.stringToCloudFormation(properties.dataSourceFieldName),
        DateFieldFormat: cdk.stringToCloudFormation(properties.dateFieldFormat),
        IndexFieldName: cdk.stringToCloudFormation(properties.indexFieldName),
    };
}

// @ts-ignore TS6133
function CfnDataSourceDataSourceToIndexFieldMappingPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.DataSourceToIndexFieldMappingProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.DataSourceToIndexFieldMappingProperty>();
    ret.addPropertyResult('dataSourceFieldName', 'DataSourceFieldName', cfn_parse.FromCloudFormation.getString(properties.DataSourceFieldName));
    ret.addPropertyResult('dateFieldFormat', 'DateFieldFormat', properties.DateFieldFormat != null ? cfn_parse.FromCloudFormation.getString(properties.DateFieldFormat) : undefined);
    ret.addPropertyResult('indexFieldName', 'IndexFieldName', cfn_parse.FromCloudFormation.getString(properties.IndexFieldName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information to connect to an Amazon VPC.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourcevpcconfiguration.html
     */
    export interface DataSourceVpcConfigurationProperty {
        /**
         * A list of identifiers of security groups within your Amazon VPC. The security groups should enable Amazon Kendra to connect to the data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourcevpcconfiguration.html#cfn-kendra-datasource-datasourcevpcconfiguration-securitygroupids
         */
        readonly securityGroupIds: string[];
        /**
         * A list of identifiers for subnets within your Amazon VPC. The subnets should be able to connect to each other in the VPC, and they should have outgoing access to the Internet through a NAT device.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-datasourcevpcconfiguration.html#cfn-kendra-datasource-datasourcevpcconfiguration-subnetids
         */
        readonly subnetIds: string[];
    }
}

/**
 * Determine whether the given properties match those of a `DataSourceVpcConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `DataSourceVpcConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_DataSourceVpcConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.requiredValidator)(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.requiredValidator)(properties.subnetIds));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.listValidator(cdk.validateString))(properties.subnetIds));
    return errors.wrap('supplied properties not correct for "DataSourceVpcConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DataSourceVpcConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `DataSourceVpcConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DataSourceVpcConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceDataSourceVpcConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_DataSourceVpcConfigurationPropertyValidator(properties).assertSuccess();
    return {
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        SubnetIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnetIds),
    };
}

// @ts-ignore TS6133
function CfnDataSourceDataSourceVpcConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.DataSourceVpcConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.DataSourceVpcConfigurationProperty>();
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds));
    ret.addPropertyResult('subnetIds', 'SubnetIds', cfn_parse.FromCloudFormation.getStringArray(properties.SubnetIds));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information to connect to a index.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-databaseconfiguration.html
     */
    export interface DatabaseConfigurationProperty {
        /**
         * Information about the database column that provides information for user context filtering.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-databaseconfiguration.html#cfn-kendra-datasource-databaseconfiguration-aclconfiguration
         */
        readonly aclConfiguration?: CfnDataSource.AclConfigurationProperty | cdk.IResolvable;
        /**
         * Information about where the index should get the document information from the database.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-databaseconfiguration.html#cfn-kendra-datasource-databaseconfiguration-columnconfiguration
         */
        readonly columnConfiguration: CfnDataSource.ColumnConfigurationProperty | cdk.IResolvable;
        /**
         * Configuration information that's required to connect to a database.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-databaseconfiguration.html#cfn-kendra-datasource-databaseconfiguration-connectionconfiguration
         */
        readonly connectionConfiguration: CfnDataSource.ConnectionConfigurationProperty | cdk.IResolvable;
        /**
         * The type of database engine that runs the database.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-databaseconfiguration.html#cfn-kendra-datasource-databaseconfiguration-databaseenginetype
         */
        readonly databaseEngineType: string;
        /**
         * Provides information about how Amazon Kendra uses quote marks around SQL identifiers when querying a database data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-databaseconfiguration.html#cfn-kendra-datasource-databaseconfiguration-sqlconfiguration
         */
        readonly sqlConfiguration?: CfnDataSource.SqlConfigurationProperty | cdk.IResolvable;
        /**
         * Provides information for connecting to an Amazon VPC.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-databaseconfiguration.html#cfn-kendra-datasource-databaseconfiguration-vpcconfiguration
         */
        readonly vpcConfiguration?: CfnDataSource.DataSourceVpcConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DatabaseConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `DatabaseConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_DatabaseConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('aclConfiguration', CfnDataSource_AclConfigurationPropertyValidator)(properties.aclConfiguration));
    errors.collect(cdk.propertyValidator('columnConfiguration', cdk.requiredValidator)(properties.columnConfiguration));
    errors.collect(cdk.propertyValidator('columnConfiguration', CfnDataSource_ColumnConfigurationPropertyValidator)(properties.columnConfiguration));
    errors.collect(cdk.propertyValidator('connectionConfiguration', cdk.requiredValidator)(properties.connectionConfiguration));
    errors.collect(cdk.propertyValidator('connectionConfiguration', CfnDataSource_ConnectionConfigurationPropertyValidator)(properties.connectionConfiguration));
    errors.collect(cdk.propertyValidator('databaseEngineType', cdk.requiredValidator)(properties.databaseEngineType));
    errors.collect(cdk.propertyValidator('databaseEngineType', cdk.validateString)(properties.databaseEngineType));
    errors.collect(cdk.propertyValidator('sqlConfiguration', CfnDataSource_SqlConfigurationPropertyValidator)(properties.sqlConfiguration));
    errors.collect(cdk.propertyValidator('vpcConfiguration', CfnDataSource_DataSourceVpcConfigurationPropertyValidator)(properties.vpcConfiguration));
    return errors.wrap('supplied properties not correct for "DatabaseConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DatabaseConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `DatabaseConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DatabaseConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceDatabaseConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_DatabaseConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AclConfiguration: cfnDataSourceAclConfigurationPropertyToCloudFormation(properties.aclConfiguration),
        ColumnConfiguration: cfnDataSourceColumnConfigurationPropertyToCloudFormation(properties.columnConfiguration),
        ConnectionConfiguration: cfnDataSourceConnectionConfigurationPropertyToCloudFormation(properties.connectionConfiguration),
        DatabaseEngineType: cdk.stringToCloudFormation(properties.databaseEngineType),
        SqlConfiguration: cfnDataSourceSqlConfigurationPropertyToCloudFormation(properties.sqlConfiguration),
        VpcConfiguration: cfnDataSourceDataSourceVpcConfigurationPropertyToCloudFormation(properties.vpcConfiguration),
    };
}

// @ts-ignore TS6133
function CfnDataSourceDatabaseConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.DatabaseConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.DatabaseConfigurationProperty>();
    ret.addPropertyResult('aclConfiguration', 'AclConfiguration', properties.AclConfiguration != null ? CfnDataSourceAclConfigurationPropertyFromCloudFormation(properties.AclConfiguration) : undefined);
    ret.addPropertyResult('columnConfiguration', 'ColumnConfiguration', CfnDataSourceColumnConfigurationPropertyFromCloudFormation(properties.ColumnConfiguration));
    ret.addPropertyResult('connectionConfiguration', 'ConnectionConfiguration', CfnDataSourceConnectionConfigurationPropertyFromCloudFormation(properties.ConnectionConfiguration));
    ret.addPropertyResult('databaseEngineType', 'DatabaseEngineType', cfn_parse.FromCloudFormation.getString(properties.DatabaseEngineType));
    ret.addPropertyResult('sqlConfiguration', 'SqlConfiguration', properties.SqlConfiguration != null ? CfnDataSourceSqlConfigurationPropertyFromCloudFormation(properties.SqlConfiguration) : undefined);
    ret.addPropertyResult('vpcConfiguration', 'VpcConfiguration', properties.VpcConfiguration != null ? CfnDataSourceDataSourceVpcConfigurationPropertyFromCloudFormation(properties.VpcConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * The condition used for the target document attribute or metadata field when ingesting documents into Amazon Kendra. You use this with [DocumentAttributeTarget to apply the condition](https://docs.aws.amazon.com/kendra/latest/dg/API_DocumentAttributeTarget.html) .
     *
     * For example, you can create the 'Department' target field and have it prefill department names associated with the documents based on information in the 'Source_URI' field. Set the condition that if the 'Source_URI' field contains 'financial' in its URI value, then prefill the target field 'Department' with the target value 'Finance' for the document.
     *
     * Amazon Kendra cannot create a target field if it has not already been created as an index field. After you create your index field, you can create a document metadata field using `DocumentAttributeTarget` . Amazon Kendra then will map your newly created metadata field to your index field.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentattributecondition.html
     */
    export interface DocumentAttributeConditionProperty {
        /**
         * The identifier of the document attribute used for the condition.
         *
         * For example, 'Source_URI' could be an identifier for the attribute or metadata field that contains source URIs associated with the documents.
         *
         * Amazon Kendra currently does not support `_document_body` as an attribute key used for the condition.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentattributecondition.html#cfn-kendra-datasource-documentattributecondition-conditiondocumentattributekey
         */
        readonly conditionDocumentAttributeKey: string;
        /**
         * The value used by the operator.
         *
         * For example, you can specify the value 'financial' for strings in the 'Source_URI' field that partially match or contain this value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentattributecondition.html#cfn-kendra-datasource-documentattributecondition-conditiononvalue
         */
        readonly conditionOnValue?: CfnDataSource.DocumentAttributeValueProperty | cdk.IResolvable;
        /**
         * The condition operator.
         *
         * For example, you can use 'Contains' to partially match a string.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentattributecondition.html#cfn-kendra-datasource-documentattributecondition-operator
         */
        readonly operator: string;
    }
}

/**
 * Determine whether the given properties match those of a `DocumentAttributeConditionProperty`
 *
 * @param properties - the TypeScript properties of a `DocumentAttributeConditionProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_DocumentAttributeConditionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('conditionDocumentAttributeKey', cdk.requiredValidator)(properties.conditionDocumentAttributeKey));
    errors.collect(cdk.propertyValidator('conditionDocumentAttributeKey', cdk.validateString)(properties.conditionDocumentAttributeKey));
    errors.collect(cdk.propertyValidator('conditionOnValue', CfnDataSource_DocumentAttributeValuePropertyValidator)(properties.conditionOnValue));
    errors.collect(cdk.propertyValidator('operator', cdk.requiredValidator)(properties.operator));
    errors.collect(cdk.propertyValidator('operator', cdk.validateString)(properties.operator));
    return errors.wrap('supplied properties not correct for "DocumentAttributeConditionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DocumentAttributeCondition` resource
 *
 * @param properties - the TypeScript properties of a `DocumentAttributeConditionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DocumentAttributeCondition` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceDocumentAttributeConditionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_DocumentAttributeConditionPropertyValidator(properties).assertSuccess();
    return {
        ConditionDocumentAttributeKey: cdk.stringToCloudFormation(properties.conditionDocumentAttributeKey),
        ConditionOnValue: cfnDataSourceDocumentAttributeValuePropertyToCloudFormation(properties.conditionOnValue),
        Operator: cdk.stringToCloudFormation(properties.operator),
    };
}

// @ts-ignore TS6133
function CfnDataSourceDocumentAttributeConditionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.DocumentAttributeConditionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.DocumentAttributeConditionProperty>();
    ret.addPropertyResult('conditionDocumentAttributeKey', 'ConditionDocumentAttributeKey', cfn_parse.FromCloudFormation.getString(properties.ConditionDocumentAttributeKey));
    ret.addPropertyResult('conditionOnValue', 'ConditionOnValue', properties.ConditionOnValue != null ? CfnDataSourceDocumentAttributeValuePropertyFromCloudFormation(properties.ConditionOnValue) : undefined);
    ret.addPropertyResult('operator', 'Operator', cfn_parse.FromCloudFormation.getString(properties.Operator));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * The target document attribute or metadata field you want to alter when ingesting documents into Amazon Kendra.
     *
     * For example, you can delete customer identification numbers associated with the documents, stored in the document metadata field called 'Customer_ID'. You set the target key as 'Customer_ID' and the deletion flag to `TRUE` . This removes all customer ID values in the field 'Customer_ID'. This would scrub personally identifiable information from each document's metadata.
     *
     * Amazon Kendra cannot create a target field if it has not already been created as an index field. After you create your index field, you can create a document metadata field using `DocumentAttributeTarget` . Amazon Kendra then will map your newly created metadata field to your index field.
     *
     * You can also use this with [DocumentAttributeCondition](https://docs.aws.amazon.com/kendra/latest/dg/API_DocumentAttributeCondition.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentattributetarget.html
     */
    export interface DocumentAttributeTargetProperty {
        /**
         * The identifier of the target document attribute or metadata field.
         *
         * For example, 'Department' could be an identifier for the target attribute or metadata field that includes the department names associated with the documents.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentattributetarget.html#cfn-kendra-datasource-documentattributetarget-targetdocumentattributekey
         */
        readonly targetDocumentAttributeKey: string;
        /**
         * The target value you want to create for the target attribute.
         *
         * For example, 'Finance' could be the target value for the target attribute key 'Department'.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentattributetarget.html#cfn-kendra-datasource-documentattributetarget-targetdocumentattributevalue
         */
        readonly targetDocumentAttributeValue?: CfnDataSource.DocumentAttributeValueProperty | cdk.IResolvable;
        /**
         * `TRUE` to delete the existing target value for your specified target attribute key. You cannot create a target value and set this to `TRUE` . To create a target value ( `TargetDocumentAttributeValue` ), set this to `FALSE` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentattributetarget.html#cfn-kendra-datasource-documentattributetarget-targetdocumentattributevaluedeletion
         */
        readonly targetDocumentAttributeValueDeletion?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DocumentAttributeTargetProperty`
 *
 * @param properties - the TypeScript properties of a `DocumentAttributeTargetProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_DocumentAttributeTargetPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('targetDocumentAttributeKey', cdk.requiredValidator)(properties.targetDocumentAttributeKey));
    errors.collect(cdk.propertyValidator('targetDocumentAttributeKey', cdk.validateString)(properties.targetDocumentAttributeKey));
    errors.collect(cdk.propertyValidator('targetDocumentAttributeValue', CfnDataSource_DocumentAttributeValuePropertyValidator)(properties.targetDocumentAttributeValue));
    errors.collect(cdk.propertyValidator('targetDocumentAttributeValueDeletion', cdk.validateBoolean)(properties.targetDocumentAttributeValueDeletion));
    return errors.wrap('supplied properties not correct for "DocumentAttributeTargetProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DocumentAttributeTarget` resource
 *
 * @param properties - the TypeScript properties of a `DocumentAttributeTargetProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DocumentAttributeTarget` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceDocumentAttributeTargetPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_DocumentAttributeTargetPropertyValidator(properties).assertSuccess();
    return {
        TargetDocumentAttributeKey: cdk.stringToCloudFormation(properties.targetDocumentAttributeKey),
        TargetDocumentAttributeValue: cfnDataSourceDocumentAttributeValuePropertyToCloudFormation(properties.targetDocumentAttributeValue),
        TargetDocumentAttributeValueDeletion: cdk.booleanToCloudFormation(properties.targetDocumentAttributeValueDeletion),
    };
}

// @ts-ignore TS6133
function CfnDataSourceDocumentAttributeTargetPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.DocumentAttributeTargetProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.DocumentAttributeTargetProperty>();
    ret.addPropertyResult('targetDocumentAttributeKey', 'TargetDocumentAttributeKey', cfn_parse.FromCloudFormation.getString(properties.TargetDocumentAttributeKey));
    ret.addPropertyResult('targetDocumentAttributeValue', 'TargetDocumentAttributeValue', properties.TargetDocumentAttributeValue != null ? CfnDataSourceDocumentAttributeValuePropertyFromCloudFormation(properties.TargetDocumentAttributeValue) : undefined);
    ret.addPropertyResult('targetDocumentAttributeValueDeletion', 'TargetDocumentAttributeValueDeletion', properties.TargetDocumentAttributeValueDeletion != null ? cfn_parse.FromCloudFormation.getBoolean(properties.TargetDocumentAttributeValueDeletion) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * The value of a custom document attribute. You can only provide one value for a custom attribute.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentattributevalue.html
     */
    export interface DocumentAttributeValueProperty {
        /**
         * A date expressed as an ISO 8601 string.
         *
         * It is important for the time zone to be included in the ISO 8601 date-time format. For example, 2012-03-25T12:30:10+01:00 is the ISO 8601 date-time format for March 25th 2012 at 12:30PM (plus 10 seconds) in Central European Time.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentattributevalue.html#cfn-kendra-datasource-documentattributevalue-datevalue
         */
        readonly dateValue?: string;
        /**
         * A long integer value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentattributevalue.html#cfn-kendra-datasource-documentattributevalue-longvalue
         */
        readonly longValue?: number;
        /**
         * A list of strings.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentattributevalue.html#cfn-kendra-datasource-documentattributevalue-stringlistvalue
         */
        readonly stringListValue?: string[];
        /**
         * A string, such as "department".
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentattributevalue.html#cfn-kendra-datasource-documentattributevalue-stringvalue
         */
        readonly stringValue?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DocumentAttributeValueProperty`
 *
 * @param properties - the TypeScript properties of a `DocumentAttributeValueProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_DocumentAttributeValuePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dateValue', cdk.validateString)(properties.dateValue));
    errors.collect(cdk.propertyValidator('longValue', cdk.validateNumber)(properties.longValue));
    errors.collect(cdk.propertyValidator('stringListValue', cdk.listValidator(cdk.validateString))(properties.stringListValue));
    errors.collect(cdk.propertyValidator('stringValue', cdk.validateString)(properties.stringValue));
    return errors.wrap('supplied properties not correct for "DocumentAttributeValueProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DocumentAttributeValue` resource
 *
 * @param properties - the TypeScript properties of a `DocumentAttributeValueProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DocumentAttributeValue` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceDocumentAttributeValuePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_DocumentAttributeValuePropertyValidator(properties).assertSuccess();
    return {
        DateValue: cdk.stringToCloudFormation(properties.dateValue),
        LongValue: cdk.numberToCloudFormation(properties.longValue),
        StringListValue: cdk.listMapper(cdk.stringToCloudFormation)(properties.stringListValue),
        StringValue: cdk.stringToCloudFormation(properties.stringValue),
    };
}

// @ts-ignore TS6133
function CfnDataSourceDocumentAttributeValuePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.DocumentAttributeValueProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.DocumentAttributeValueProperty>();
    ret.addPropertyResult('dateValue', 'DateValue', properties.DateValue != null ? cfn_parse.FromCloudFormation.getString(properties.DateValue) : undefined);
    ret.addPropertyResult('longValue', 'LongValue', properties.LongValue != null ? cfn_parse.FromCloudFormation.getNumber(properties.LongValue) : undefined);
    ret.addPropertyResult('stringListValue', 'StringListValue', properties.StringListValue != null ? cfn_parse.FromCloudFormation.getStringArray(properties.StringListValue) : undefined);
    ret.addPropertyResult('stringValue', 'StringValue', properties.StringValue != null ? cfn_parse.FromCloudFormation.getString(properties.StringValue) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Document metadata files that contain information such as the document access control information, source URI, document author, and custom attributes. Each metadata file contains metadata about a single document.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentsmetadataconfiguration.html
     */
    export interface DocumentsMetadataConfigurationProperty {
        /**
         * A prefix used to filter metadata configuration files in the AWS S3 bucket. The S3 bucket might contain multiple metadata files. Use `S3Prefix` to include only the desired metadata files.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-documentsmetadataconfiguration.html#cfn-kendra-datasource-documentsmetadataconfiguration-s3prefix
         */
        readonly s3Prefix?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DocumentsMetadataConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `DocumentsMetadataConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_DocumentsMetadataConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Prefix', cdk.validateString)(properties.s3Prefix));
    return errors.wrap('supplied properties not correct for "DocumentsMetadataConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DocumentsMetadataConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `DocumentsMetadataConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.DocumentsMetadataConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceDocumentsMetadataConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_DocumentsMetadataConfigurationPropertyValidator(properties).assertSuccess();
    return {
        S3Prefix: cdk.stringToCloudFormation(properties.s3Prefix),
    };
}

// @ts-ignore TS6133
function CfnDataSourceDocumentsMetadataConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.DocumentsMetadataConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.DocumentsMetadataConfigurationProperty>();
    ret.addPropertyResult('s3Prefix', 'S3Prefix', properties.S3Prefix != null ? cfn_parse.FromCloudFormation.getString(properties.S3Prefix) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information to connect to Google Drive as your data source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-googledriveconfiguration.html
     */
    export interface GoogleDriveConfigurationProperty {
        /**
         * A list of MIME types to exclude from the index. All documents matching the specified MIME type are excluded.
         *
         * For a list of MIME types, see [Using a Google Workspace Drive data source](https://docs.aws.amazon.com/kendra/latest/dg/data-source-google-drive.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-googledriveconfiguration.html#cfn-kendra-datasource-googledriveconfiguration-excludemimetypes
         */
        readonly excludeMimeTypes?: string[];
        /**
         * A list of identifiers or shared drives to exclude from the index. All files and folders stored on the shared drive are excluded.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-googledriveconfiguration.html#cfn-kendra-datasource-googledriveconfiguration-excludeshareddrives
         */
        readonly excludeSharedDrives?: string[];
        /**
         * A list of email addresses of the users. Documents owned by these users are excluded from the index. Documents shared with excluded users are indexed unless they are excluded in another way.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-googledriveconfiguration.html#cfn-kendra-datasource-googledriveconfiguration-excludeuseraccounts
         */
        readonly excludeUserAccounts?: string[];
        /**
         * A list of regular expression patterns to exclude certain items in your Google Drive, including shared drives and users' My Drives. Items that match the patterns are excluded from the index. Items that don't match the patterns are included in the index. If an item matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the item isn't included in the index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-googledriveconfiguration.html#cfn-kendra-datasource-googledriveconfiguration-exclusionpatterns
         */
        readonly exclusionPatterns?: string[];
        /**
         * Maps Google Drive data source attributes or field names to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to Google Drive fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The Google Drive data source field names must exist in your Google Drive custom metadata.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-googledriveconfiguration.html#cfn-kendra-datasource-googledriveconfiguration-fieldmappings
         */
        readonly fieldMappings?: Array<CfnDataSource.DataSourceToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * A list of regular expression patterns to include certain items in your Google Drive, including shared drives and users' My Drives. Items that match the patterns are included in the index. Items that don't match the patterns are excluded from the index. If an item matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the item isn't included in the index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-googledriveconfiguration.html#cfn-kendra-datasource-googledriveconfiguration-inclusionpatterns
         */
        readonly inclusionPatterns?: string[];
        /**
         * The Amazon Resource Name (ARN) of a AWS Secrets Manager secret that contains the credentials required to connect to Google Drive. For more information, see [Using a Google Workspace Drive data source](https://docs.aws.amazon.com/kendra/latest/dg/data-source-google-drive.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-googledriveconfiguration.html#cfn-kendra-datasource-googledriveconfiguration-secretarn
         */
        readonly secretArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `GoogleDriveConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `GoogleDriveConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_GoogleDriveConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('excludeMimeTypes', cdk.listValidator(cdk.validateString))(properties.excludeMimeTypes));
    errors.collect(cdk.propertyValidator('excludeSharedDrives', cdk.listValidator(cdk.validateString))(properties.excludeSharedDrives));
    errors.collect(cdk.propertyValidator('excludeUserAccounts', cdk.listValidator(cdk.validateString))(properties.excludeUserAccounts));
    errors.collect(cdk.propertyValidator('exclusionPatterns', cdk.listValidator(cdk.validateString))(properties.exclusionPatterns));
    errors.collect(cdk.propertyValidator('fieldMappings', cdk.listValidator(CfnDataSource_DataSourceToIndexFieldMappingPropertyValidator))(properties.fieldMappings));
    errors.collect(cdk.propertyValidator('inclusionPatterns', cdk.listValidator(cdk.validateString))(properties.inclusionPatterns));
    errors.collect(cdk.propertyValidator('secretArn', cdk.requiredValidator)(properties.secretArn));
    errors.collect(cdk.propertyValidator('secretArn', cdk.validateString)(properties.secretArn));
    return errors.wrap('supplied properties not correct for "GoogleDriveConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.GoogleDriveConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `GoogleDriveConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.GoogleDriveConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceGoogleDriveConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_GoogleDriveConfigurationPropertyValidator(properties).assertSuccess();
    return {
        ExcludeMimeTypes: cdk.listMapper(cdk.stringToCloudFormation)(properties.excludeMimeTypes),
        ExcludeSharedDrives: cdk.listMapper(cdk.stringToCloudFormation)(properties.excludeSharedDrives),
        ExcludeUserAccounts: cdk.listMapper(cdk.stringToCloudFormation)(properties.excludeUserAccounts),
        ExclusionPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.exclusionPatterns),
        FieldMappings: cdk.listMapper(cfnDataSourceDataSourceToIndexFieldMappingPropertyToCloudFormation)(properties.fieldMappings),
        InclusionPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.inclusionPatterns),
        SecretArn: cdk.stringToCloudFormation(properties.secretArn),
    };
}

// @ts-ignore TS6133
function CfnDataSourceGoogleDriveConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.GoogleDriveConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.GoogleDriveConfigurationProperty>();
    ret.addPropertyResult('excludeMimeTypes', 'ExcludeMimeTypes', properties.ExcludeMimeTypes != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExcludeMimeTypes) : undefined);
    ret.addPropertyResult('excludeSharedDrives', 'ExcludeSharedDrives', properties.ExcludeSharedDrives != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExcludeSharedDrives) : undefined);
    ret.addPropertyResult('excludeUserAccounts', 'ExcludeUserAccounts', properties.ExcludeUserAccounts != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExcludeUserAccounts) : undefined);
    ret.addPropertyResult('exclusionPatterns', 'ExclusionPatterns', properties.ExclusionPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExclusionPatterns) : undefined);
    ret.addPropertyResult('fieldMappings', 'FieldMappings', properties.FieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceDataSourceToIndexFieldMappingPropertyFromCloudFormation)(properties.FieldMappings) : undefined);
    ret.addPropertyResult('inclusionPatterns', 'InclusionPatterns', properties.InclusionPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.InclusionPatterns) : undefined);
    ret.addPropertyResult('secretArn', 'SecretArn', cfn_parse.FromCloudFormation.getString(properties.SecretArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information for invoking a Lambda function in AWS Lambda to alter document metadata and content when ingesting documents into Amazon Kendra. You can configure your Lambda function using [PreExtractionHookConfiguration](https://docs.aws.amazon.com/kendra/latest/dg/API_CustomDocumentEnrichmentConfiguration.html) if you want to apply advanced alterations on the original or raw documents. If you want to apply advanced alterations on the Amazon Kendra structured documents, you must configure your Lambda function using [PostExtractionHookConfiguration](https://docs.aws.amazon.com/kendra/latest/dg/API_CustomDocumentEnrichmentConfiguration.html) . You can only invoke one Lambda function. However, this function can invoke other functions it requires.
     *
     * For more information, see [Customizing document metadata during the ingestion process](https://docs.aws.amazon.com/kendra/latest/dg/custom-document-enrichment.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-hookconfiguration.html
     */
    export interface HookConfigurationProperty {
        /**
         * The condition used for when a Lambda function should be invoked.
         *
         * For example, you can specify a condition that if there are empty date-time values, then Amazon Kendra should invoke a function that inserts the current date-time.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-hookconfiguration.html#cfn-kendra-datasource-hookconfiguration-invocationcondition
         */
        readonly invocationCondition?: CfnDataSource.DocumentAttributeConditionProperty | cdk.IResolvable;
        /**
         * The Amazon Resource Name (ARN) of a role with permission to run a Lambda function during ingestion. For more information, see [IAM roles for Amazon Kendra](https://docs.aws.amazon.com/kendra/latest/dg/iam-roles.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-hookconfiguration.html#cfn-kendra-datasource-hookconfiguration-lambdaarn
         */
        readonly lambdaArn: string;
        /**
         * Stores the original, raw documents or the structured, parsed documents before and after altering them. For more information, see [Data contracts for Lambda functions](https://docs.aws.amazon.com/kendra/latest/dg/custom-document-enrichment.html#cde-data-contracts-lambda) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-hookconfiguration.html#cfn-kendra-datasource-hookconfiguration-s3bucket
         */
        readonly s3Bucket: string;
    }
}

/**
 * Determine whether the given properties match those of a `HookConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `HookConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_HookConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('invocationCondition', CfnDataSource_DocumentAttributeConditionPropertyValidator)(properties.invocationCondition));
    errors.collect(cdk.propertyValidator('lambdaArn', cdk.requiredValidator)(properties.lambdaArn));
    errors.collect(cdk.propertyValidator('lambdaArn', cdk.validateString)(properties.lambdaArn));
    errors.collect(cdk.propertyValidator('s3Bucket', cdk.requiredValidator)(properties.s3Bucket));
    errors.collect(cdk.propertyValidator('s3Bucket', cdk.validateString)(properties.s3Bucket));
    return errors.wrap('supplied properties not correct for "HookConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.HookConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `HookConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.HookConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceHookConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_HookConfigurationPropertyValidator(properties).assertSuccess();
    return {
        InvocationCondition: cfnDataSourceDocumentAttributeConditionPropertyToCloudFormation(properties.invocationCondition),
        LambdaArn: cdk.stringToCloudFormation(properties.lambdaArn),
        S3Bucket: cdk.stringToCloudFormation(properties.s3Bucket),
    };
}

// @ts-ignore TS6133
function CfnDataSourceHookConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.HookConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.HookConfigurationProperty>();
    ret.addPropertyResult('invocationCondition', 'InvocationCondition', properties.InvocationCondition != null ? CfnDataSourceDocumentAttributeConditionPropertyFromCloudFormation(properties.InvocationCondition) : undefined);
    ret.addPropertyResult('lambdaArn', 'LambdaArn', cfn_parse.FromCloudFormation.getString(properties.LambdaArn));
    ret.addPropertyResult('s3Bucket', 'S3Bucket', cfn_parse.FromCloudFormation.getString(properties.S3Bucket));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information for applying basic logic to alter document metadata and content when ingesting documents into Amazon Kendra. To apply advanced logic, to go beyond what you can do with basic logic, see [HookConfiguration](https://docs.aws.amazon.com/kendra/latest/dg/API_HookConfiguration.html) .
     *
     * For more information, see [Customizing document metadata during the ingestion process](https://docs.aws.amazon.com/kendra/latest/dg/custom-document-enrichment.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-inlinecustomdocumentenrichmentconfiguration.html
     */
    export interface InlineCustomDocumentEnrichmentConfigurationProperty {
        /**
         * Configuration of the condition used for the target document attribute or metadata field when ingesting documents into Amazon Kendra.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-inlinecustomdocumentenrichmentconfiguration.html#cfn-kendra-datasource-inlinecustomdocumentenrichmentconfiguration-condition
         */
        readonly condition?: CfnDataSource.DocumentAttributeConditionProperty | cdk.IResolvable;
        /**
         * `TRUE` to delete content if the condition used for the target attribute is met.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-inlinecustomdocumentenrichmentconfiguration.html#cfn-kendra-datasource-inlinecustomdocumentenrichmentconfiguration-documentcontentdeletion
         */
        readonly documentContentDeletion?: boolean | cdk.IResolvable;
        /**
         * Configuration of the target document attribute or metadata field when ingesting documents into Amazon Kendra. You can also include a value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-inlinecustomdocumentenrichmentconfiguration.html#cfn-kendra-datasource-inlinecustomdocumentenrichmentconfiguration-target
         */
        readonly target?: CfnDataSource.DocumentAttributeTargetProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `InlineCustomDocumentEnrichmentConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `InlineCustomDocumentEnrichmentConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_InlineCustomDocumentEnrichmentConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('condition', CfnDataSource_DocumentAttributeConditionPropertyValidator)(properties.condition));
    errors.collect(cdk.propertyValidator('documentContentDeletion', cdk.validateBoolean)(properties.documentContentDeletion));
    errors.collect(cdk.propertyValidator('target', CfnDataSource_DocumentAttributeTargetPropertyValidator)(properties.target));
    return errors.wrap('supplied properties not correct for "InlineCustomDocumentEnrichmentConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.InlineCustomDocumentEnrichmentConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `InlineCustomDocumentEnrichmentConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.InlineCustomDocumentEnrichmentConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceInlineCustomDocumentEnrichmentConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_InlineCustomDocumentEnrichmentConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Condition: cfnDataSourceDocumentAttributeConditionPropertyToCloudFormation(properties.condition),
        DocumentContentDeletion: cdk.booleanToCloudFormation(properties.documentContentDeletion),
        Target: cfnDataSourceDocumentAttributeTargetPropertyToCloudFormation(properties.target),
    };
}

// @ts-ignore TS6133
function CfnDataSourceInlineCustomDocumentEnrichmentConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.InlineCustomDocumentEnrichmentConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.InlineCustomDocumentEnrichmentConfigurationProperty>();
    ret.addPropertyResult('condition', 'Condition', properties.Condition != null ? CfnDataSourceDocumentAttributeConditionPropertyFromCloudFormation(properties.Condition) : undefined);
    ret.addPropertyResult('documentContentDeletion', 'DocumentContentDeletion', properties.DocumentContentDeletion != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DocumentContentDeletion) : undefined);
    ret.addPropertyResult('target', 'Target', properties.Target != null ? CfnDataSourceDocumentAttributeTargetPropertyFromCloudFormation(properties.Target) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information to connect to OneDrive as your data source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-onedriveconfiguration.html
     */
    export interface OneDriveConfigurationProperty {
        /**
         * A Boolean value that specifies whether local groups are disabled ( `True` ) or enabled ( `False` ).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-onedriveconfiguration.html#cfn-kendra-datasource-onedriveconfiguration-disablelocalgroups
         */
        readonly disableLocalGroups?: boolean | cdk.IResolvable;
        /**
         * A list of regular expression patterns to exclude certain documents in your OneDrive. Documents that match the patterns are excluded from the index. Documents that don't match the patterns are included in the index. If a document matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the document isn't included in the index.
         *
         * The pattern is applied to the file name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-onedriveconfiguration.html#cfn-kendra-datasource-onedriveconfiguration-exclusionpatterns
         */
        readonly exclusionPatterns?: string[];
        /**
         * A list of `DataSourceToIndexFieldMapping` objects that map OneDrive data source attributes or field names to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to OneDrive fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The OneDrive data source field names must exist in your OneDrive custom metadata.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-onedriveconfiguration.html#cfn-kendra-datasource-onedriveconfiguration-fieldmappings
         */
        readonly fieldMappings?: Array<CfnDataSource.DataSourceToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * A list of regular expression patterns to include certain documents in your OneDrive. Documents that match the patterns are included in the index. Documents that don't match the patterns are excluded from the index. If a document matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the document isn't included in the index.
         *
         * The pattern is applied to the file name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-onedriveconfiguration.html#cfn-kendra-datasource-onedriveconfiguration-inclusionpatterns
         */
        readonly inclusionPatterns?: string[];
        /**
         * A list of user accounts whose documents should be indexed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-onedriveconfiguration.html#cfn-kendra-datasource-onedriveconfiguration-onedriveusers
         */
        readonly oneDriveUsers: CfnDataSource.OneDriveUsersProperty | cdk.IResolvable;
        /**
         * The Amazon Resource Name (ARN) of an AWS Secrets Manager secret that contains the user name and password to connect to OneDrive. The user named should be the application ID for the OneDrive application, and the password is the application key for the OneDrive application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-onedriveconfiguration.html#cfn-kendra-datasource-onedriveconfiguration-secretarn
         */
        readonly secretArn: string;
        /**
         * The Azure Active Directory domain of the organization.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-onedriveconfiguration.html#cfn-kendra-datasource-onedriveconfiguration-tenantdomain
         */
        readonly tenantDomain: string;
    }
}

/**
 * Determine whether the given properties match those of a `OneDriveConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `OneDriveConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_OneDriveConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('disableLocalGroups', cdk.validateBoolean)(properties.disableLocalGroups));
    errors.collect(cdk.propertyValidator('exclusionPatterns', cdk.listValidator(cdk.validateString))(properties.exclusionPatterns));
    errors.collect(cdk.propertyValidator('fieldMappings', cdk.listValidator(CfnDataSource_DataSourceToIndexFieldMappingPropertyValidator))(properties.fieldMappings));
    errors.collect(cdk.propertyValidator('inclusionPatterns', cdk.listValidator(cdk.validateString))(properties.inclusionPatterns));
    errors.collect(cdk.propertyValidator('oneDriveUsers', cdk.requiredValidator)(properties.oneDriveUsers));
    errors.collect(cdk.propertyValidator('oneDriveUsers', CfnDataSource_OneDriveUsersPropertyValidator)(properties.oneDriveUsers));
    errors.collect(cdk.propertyValidator('secretArn', cdk.requiredValidator)(properties.secretArn));
    errors.collect(cdk.propertyValidator('secretArn', cdk.validateString)(properties.secretArn));
    errors.collect(cdk.propertyValidator('tenantDomain', cdk.requiredValidator)(properties.tenantDomain));
    errors.collect(cdk.propertyValidator('tenantDomain', cdk.validateString)(properties.tenantDomain));
    return errors.wrap('supplied properties not correct for "OneDriveConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.OneDriveConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `OneDriveConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.OneDriveConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceOneDriveConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_OneDriveConfigurationPropertyValidator(properties).assertSuccess();
    return {
        DisableLocalGroups: cdk.booleanToCloudFormation(properties.disableLocalGroups),
        ExclusionPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.exclusionPatterns),
        FieldMappings: cdk.listMapper(cfnDataSourceDataSourceToIndexFieldMappingPropertyToCloudFormation)(properties.fieldMappings),
        InclusionPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.inclusionPatterns),
        OneDriveUsers: cfnDataSourceOneDriveUsersPropertyToCloudFormation(properties.oneDriveUsers),
        SecretArn: cdk.stringToCloudFormation(properties.secretArn),
        TenantDomain: cdk.stringToCloudFormation(properties.tenantDomain),
    };
}

// @ts-ignore TS6133
function CfnDataSourceOneDriveConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.OneDriveConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.OneDriveConfigurationProperty>();
    ret.addPropertyResult('disableLocalGroups', 'DisableLocalGroups', properties.DisableLocalGroups != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DisableLocalGroups) : undefined);
    ret.addPropertyResult('exclusionPatterns', 'ExclusionPatterns', properties.ExclusionPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExclusionPatterns) : undefined);
    ret.addPropertyResult('fieldMappings', 'FieldMappings', properties.FieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceDataSourceToIndexFieldMappingPropertyFromCloudFormation)(properties.FieldMappings) : undefined);
    ret.addPropertyResult('inclusionPatterns', 'InclusionPatterns', properties.InclusionPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.InclusionPatterns) : undefined);
    ret.addPropertyResult('oneDriveUsers', 'OneDriveUsers', CfnDataSourceOneDriveUsersPropertyFromCloudFormation(properties.OneDriveUsers));
    ret.addPropertyResult('secretArn', 'SecretArn', cfn_parse.FromCloudFormation.getString(properties.SecretArn));
    ret.addPropertyResult('tenantDomain', 'TenantDomain', cfn_parse.FromCloudFormation.getString(properties.TenantDomain));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * User accounts whose documents should be indexed.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-onedriveusers.html
     */
    export interface OneDriveUsersProperty {
        /**
         * A list of users whose documents should be indexed. Specify the user names in email format, for example, `username@tenantdomain` . If you need to index the documents of more than 100 users, use the `OneDriveUserS3Path` field to specify the location of a file containing a list of users.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-onedriveusers.html#cfn-kendra-datasource-onedriveusers-onedriveuserlist
         */
        readonly oneDriveUserList?: string[];
        /**
         * The S3 bucket location of a file containing a list of users whose documents should be indexed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-onedriveusers.html#cfn-kendra-datasource-onedriveusers-onedriveusers3path
         */
        readonly oneDriveUserS3Path?: CfnDataSource.S3PathProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `OneDriveUsersProperty`
 *
 * @param properties - the TypeScript properties of a `OneDriveUsersProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_OneDriveUsersPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('oneDriveUserList', cdk.listValidator(cdk.validateString))(properties.oneDriveUserList));
    errors.collect(cdk.propertyValidator('oneDriveUserS3Path', CfnDataSource_S3PathPropertyValidator)(properties.oneDriveUserS3Path));
    return errors.wrap('supplied properties not correct for "OneDriveUsersProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.OneDriveUsers` resource
 *
 * @param properties - the TypeScript properties of a `OneDriveUsersProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.OneDriveUsers` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceOneDriveUsersPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_OneDriveUsersPropertyValidator(properties).assertSuccess();
    return {
        OneDriveUserList: cdk.listMapper(cdk.stringToCloudFormation)(properties.oneDriveUserList),
        OneDriveUserS3Path: cfnDataSourceS3PathPropertyToCloudFormation(properties.oneDriveUserS3Path),
    };
}

// @ts-ignore TS6133
function CfnDataSourceOneDriveUsersPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.OneDriveUsersProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.OneDriveUsersProperty>();
    ret.addPropertyResult('oneDriveUserList', 'OneDriveUserList', properties.OneDriveUserList != null ? cfn_parse.FromCloudFormation.getStringArray(properties.OneDriveUserList) : undefined);
    ret.addPropertyResult('oneDriveUserS3Path', 'OneDriveUserS3Path', properties.OneDriveUserS3Path != null ? CfnDataSourceS3PathPropertyFromCloudFormation(properties.OneDriveUserS3Path) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information for a web proxy to connect to website hosts.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-proxyconfiguration.html
     */
    export interface ProxyConfigurationProperty {
        /**
         * Your secret ARN, which you can create in [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html)
         *
         * The credentials are optional. You use a secret if web proxy credentials are required to connect to a website host. Amazon Kendra currently support basic authentication to connect to a web proxy server. The secret stores your credentials.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-proxyconfiguration.html#cfn-kendra-datasource-proxyconfiguration-credentials
         */
        readonly credentials?: string;
        /**
         * The name of the website host you want to connect to via a web proxy server.
         *
         * For example, the host name of https://a.example.com/page1.html is "a.example.com".
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-proxyconfiguration.html#cfn-kendra-datasource-proxyconfiguration-host
         */
        readonly host: string;
        /**
         * The port number of the website host you want to connect to via a web proxy server.
         *
         * For example, the port for https://a.example.com/page1.html is 443, the standard port for HTTPS.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-proxyconfiguration.html#cfn-kendra-datasource-proxyconfiguration-port
         */
        readonly port: number;
    }
}

/**
 * Determine whether the given properties match those of a `ProxyConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ProxyConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ProxyConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('credentials', cdk.validateString)(properties.credentials));
    errors.collect(cdk.propertyValidator('host', cdk.requiredValidator)(properties.host));
    errors.collect(cdk.propertyValidator('host', cdk.validateString)(properties.host));
    errors.collect(cdk.propertyValidator('port', cdk.requiredValidator)(properties.port));
    errors.collect(cdk.propertyValidator('port', cdk.validateNumber)(properties.port));
    return errors.wrap('supplied properties not correct for "ProxyConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ProxyConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ProxyConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ProxyConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceProxyConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ProxyConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Credentials: cdk.stringToCloudFormation(properties.credentials),
        Host: cdk.stringToCloudFormation(properties.host),
        Port: cdk.numberToCloudFormation(properties.port),
    };
}

// @ts-ignore TS6133
function CfnDataSourceProxyConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ProxyConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ProxyConfigurationProperty>();
    ret.addPropertyResult('credentials', 'Credentials', properties.Credentials != null ? cfn_parse.FromCloudFormation.getString(properties.Credentials) : undefined);
    ret.addPropertyResult('host', 'Host', cfn_parse.FromCloudFormation.getString(properties.Host));
    ret.addPropertyResult('port', 'Port', cfn_parse.FromCloudFormation.getNumber(properties.Port));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information to connect to an Amazon S3 bucket.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-s3datasourceconfiguration.html
     */
    export interface S3DataSourceConfigurationProperty {
        /**
         * Provides the path to the S3 bucket that contains the user context filtering files for the data source. For the format of the file, see [Access control for S3 data sources](https://docs.aws.amazon.com/kendra/latest/dg/s3-acl.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-s3datasourceconfiguration.html#cfn-kendra-datasource-s3datasourceconfiguration-accesscontrollistconfiguration
         */
        readonly accessControlListConfiguration?: CfnDataSource.AccessControlListConfigurationProperty | cdk.IResolvable;
        /**
         * The name of the bucket that contains the documents.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-s3datasourceconfiguration.html#cfn-kendra-datasource-s3datasourceconfiguration-bucketname
         */
        readonly bucketName: string;
        /**
         * Specifies document metadata files that contain information such as the document access control information, source URI, document author, and custom attributes. Each metadata file contains metadata about a single document.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-s3datasourceconfiguration.html#cfn-kendra-datasource-s3datasourceconfiguration-documentsmetadataconfiguration
         */
        readonly documentsMetadataConfiguration?: CfnDataSource.DocumentsMetadataConfigurationProperty | cdk.IResolvable;
        /**
         * A list of glob patterns for documents that should not be indexed. If a document that matches an inclusion prefix or inclusion pattern also matches an exclusion pattern, the document is not indexed.
         *
         * Some [examples](https://docs.aws.amazon.com/cli/latest/reference/s3/#use-of-exclude-and-include-filters) are:
         *
         * - **.png , *.jpg* will exclude all PNG and JPEG image files in a directory (files with the extensions .png and .jpg).
         * - **internal** will exclude all files in a directory that contain 'internal' in the file name, such as 'internal', 'internal_only', 'company_internal'.
         * - *** /*internal** will exclude all internal-related files in a directory and its subdirectories.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-s3datasourceconfiguration.html#cfn-kendra-datasource-s3datasourceconfiguration-exclusionpatterns
         */
        readonly exclusionPatterns?: string[];
        /**
         * A list of glob patterns for documents that should be indexed. If a document that matches an inclusion pattern also matches an exclusion pattern, the document is not indexed.
         *
         * Some [examples](https://docs.aws.amazon.com/cli/latest/reference/s3/#use-of-exclude-and-include-filters) are:
         *
         * - **.txt* will include all text files in a directory (files with the extension .txt).
         * - *** /*.txt* will include all text files in a directory and its subdirectories.
         * - **tax** will include all files in a directory that contain 'tax' in the file name, such as 'tax', 'taxes', 'income_tax'.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-s3datasourceconfiguration.html#cfn-kendra-datasource-s3datasourceconfiguration-inclusionpatterns
         */
        readonly inclusionPatterns?: string[];
        /**
         * A list of S3 prefixes for the documents that should be included in the index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-s3datasourceconfiguration.html#cfn-kendra-datasource-s3datasourceconfiguration-inclusionprefixes
         */
        readonly inclusionPrefixes?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `S3DataSourceConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `S3DataSourceConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_S3DataSourceConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessControlListConfiguration', CfnDataSource_AccessControlListConfigurationPropertyValidator)(properties.accessControlListConfiguration));
    errors.collect(cdk.propertyValidator('bucketName', cdk.requiredValidator)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketName', cdk.validateString)(properties.bucketName));
    errors.collect(cdk.propertyValidator('documentsMetadataConfiguration', CfnDataSource_DocumentsMetadataConfigurationPropertyValidator)(properties.documentsMetadataConfiguration));
    errors.collect(cdk.propertyValidator('exclusionPatterns', cdk.listValidator(cdk.validateString))(properties.exclusionPatterns));
    errors.collect(cdk.propertyValidator('inclusionPatterns', cdk.listValidator(cdk.validateString))(properties.inclusionPatterns));
    errors.collect(cdk.propertyValidator('inclusionPrefixes', cdk.listValidator(cdk.validateString))(properties.inclusionPrefixes));
    return errors.wrap('supplied properties not correct for "S3DataSourceConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.S3DataSourceConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `S3DataSourceConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.S3DataSourceConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceS3DataSourceConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_S3DataSourceConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AccessControlListConfiguration: cfnDataSourceAccessControlListConfigurationPropertyToCloudFormation(properties.accessControlListConfiguration),
        BucketName: cdk.stringToCloudFormation(properties.bucketName),
        DocumentsMetadataConfiguration: cfnDataSourceDocumentsMetadataConfigurationPropertyToCloudFormation(properties.documentsMetadataConfiguration),
        ExclusionPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.exclusionPatterns),
        InclusionPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.inclusionPatterns),
        InclusionPrefixes: cdk.listMapper(cdk.stringToCloudFormation)(properties.inclusionPrefixes),
    };
}

// @ts-ignore TS6133
function CfnDataSourceS3DataSourceConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.S3DataSourceConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.S3DataSourceConfigurationProperty>();
    ret.addPropertyResult('accessControlListConfiguration', 'AccessControlListConfiguration', properties.AccessControlListConfiguration != null ? CfnDataSourceAccessControlListConfigurationPropertyFromCloudFormation(properties.AccessControlListConfiguration) : undefined);
    ret.addPropertyResult('bucketName', 'BucketName', cfn_parse.FromCloudFormation.getString(properties.BucketName));
    ret.addPropertyResult('documentsMetadataConfiguration', 'DocumentsMetadataConfiguration', properties.DocumentsMetadataConfiguration != null ? CfnDataSourceDocumentsMetadataConfigurationPropertyFromCloudFormation(properties.DocumentsMetadataConfiguration) : undefined);
    ret.addPropertyResult('exclusionPatterns', 'ExclusionPatterns', properties.ExclusionPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExclusionPatterns) : undefined);
    ret.addPropertyResult('inclusionPatterns', 'InclusionPatterns', properties.InclusionPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.InclusionPatterns) : undefined);
    ret.addPropertyResult('inclusionPrefixes', 'InclusionPrefixes', properties.InclusionPrefixes != null ? cfn_parse.FromCloudFormation.getStringArray(properties.InclusionPrefixes) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Information required to find a specific file in an Amazon S3 bucket.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-s3path.html
     */
    export interface S3PathProperty {
        /**
         * The name of the S3 bucket that contains the file.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-s3path.html#cfn-kendra-datasource-s3path-bucket
         */
        readonly bucket: string;
        /**
         * The name of the file.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-s3path.html#cfn-kendra-datasource-s3path-key
         */
        readonly key: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3PathProperty`
 *
 * @param properties - the TypeScript properties of a `S3PathProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_S3PathPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucket', cdk.requiredValidator)(properties.bucket));
    errors.collect(cdk.propertyValidator('bucket', cdk.validateString)(properties.bucket));
    errors.collect(cdk.propertyValidator('key', cdk.requiredValidator)(properties.key));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    return errors.wrap('supplied properties not correct for "S3PathProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.S3Path` resource
 *
 * @param properties - the TypeScript properties of a `S3PathProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.S3Path` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceS3PathPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_S3PathPropertyValidator(properties).assertSuccess();
    return {
        Bucket: cdk.stringToCloudFormation(properties.bucket),
        Key: cdk.stringToCloudFormation(properties.key),
    };
}

// @ts-ignore TS6133
function CfnDataSourceS3PathPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.S3PathProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.S3PathProperty>();
    ret.addPropertyResult('bucket', 'Bucket', cfn_parse.FromCloudFormation.getString(properties.Bucket));
    ret.addPropertyResult('key', 'Key', cfn_parse.FromCloudFormation.getString(properties.Key));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * The configuration information for syncing a Salesforce chatter feed. The contents of the object comes from the Salesforce FeedItem table.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcechatterfeedconfiguration.html
     */
    export interface SalesforceChatterFeedConfigurationProperty {
        /**
         * The name of the column in the Salesforce FeedItem table that contains the content to index. Typically this is the `Body` column.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcechatterfeedconfiguration.html#cfn-kendra-datasource-salesforcechatterfeedconfiguration-documentdatafieldname
         */
        readonly documentDataFieldName: string;
        /**
         * The name of the column in the Salesforce FeedItem table that contains the title of the document. This is typically the `Title` column.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcechatterfeedconfiguration.html#cfn-kendra-datasource-salesforcechatterfeedconfiguration-documenttitlefieldname
         */
        readonly documentTitleFieldName?: string;
        /**
         * Maps fields from a Salesforce chatter feed into Amazon Kendra index fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcechatterfeedconfiguration.html#cfn-kendra-datasource-salesforcechatterfeedconfiguration-fieldmappings
         */
        readonly fieldMappings?: Array<CfnDataSource.DataSourceToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * Filters the documents in the feed based on status of the user. When you specify `ACTIVE_USERS` only documents from users who have an active account are indexed. When you specify `STANDARD_USER` only documents for Salesforce standard users are documented. You can specify both.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcechatterfeedconfiguration.html#cfn-kendra-datasource-salesforcechatterfeedconfiguration-includefiltertypes
         */
        readonly includeFilterTypes?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `SalesforceChatterFeedConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `SalesforceChatterFeedConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_SalesforceChatterFeedConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('documentDataFieldName', cdk.requiredValidator)(properties.documentDataFieldName));
    errors.collect(cdk.propertyValidator('documentDataFieldName', cdk.validateString)(properties.documentDataFieldName));
    errors.collect(cdk.propertyValidator('documentTitleFieldName', cdk.validateString)(properties.documentTitleFieldName));
    errors.collect(cdk.propertyValidator('fieldMappings', cdk.listValidator(CfnDataSource_DataSourceToIndexFieldMappingPropertyValidator))(properties.fieldMappings));
    errors.collect(cdk.propertyValidator('includeFilterTypes', cdk.listValidator(cdk.validateString))(properties.includeFilterTypes));
    return errors.wrap('supplied properties not correct for "SalesforceChatterFeedConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SalesforceChatterFeedConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `SalesforceChatterFeedConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SalesforceChatterFeedConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceSalesforceChatterFeedConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_SalesforceChatterFeedConfigurationPropertyValidator(properties).assertSuccess();
    return {
        DocumentDataFieldName: cdk.stringToCloudFormation(properties.documentDataFieldName),
        DocumentTitleFieldName: cdk.stringToCloudFormation(properties.documentTitleFieldName),
        FieldMappings: cdk.listMapper(cfnDataSourceDataSourceToIndexFieldMappingPropertyToCloudFormation)(properties.fieldMappings),
        IncludeFilterTypes: cdk.listMapper(cdk.stringToCloudFormation)(properties.includeFilterTypes),
    };
}

// @ts-ignore TS6133
function CfnDataSourceSalesforceChatterFeedConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.SalesforceChatterFeedConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.SalesforceChatterFeedConfigurationProperty>();
    ret.addPropertyResult('documentDataFieldName', 'DocumentDataFieldName', cfn_parse.FromCloudFormation.getString(properties.DocumentDataFieldName));
    ret.addPropertyResult('documentTitleFieldName', 'DocumentTitleFieldName', properties.DocumentTitleFieldName != null ? cfn_parse.FromCloudFormation.getString(properties.DocumentTitleFieldName) : undefined);
    ret.addPropertyResult('fieldMappings', 'FieldMappings', properties.FieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceDataSourceToIndexFieldMappingPropertyFromCloudFormation)(properties.FieldMappings) : undefined);
    ret.addPropertyResult('includeFilterTypes', 'IncludeFilterTypes', properties.IncludeFilterTypes != null ? cfn_parse.FromCloudFormation.getStringArray(properties.IncludeFilterTypes) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information to connect to Salesforce as your data source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforceconfiguration.html
     */
    export interface SalesforceConfigurationProperty {
        /**
         * Configuration information for Salesforce chatter feeds.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforceconfiguration.html#cfn-kendra-datasource-salesforceconfiguration-chatterfeedconfiguration
         */
        readonly chatterFeedConfiguration?: CfnDataSource.SalesforceChatterFeedConfigurationProperty | cdk.IResolvable;
        /**
         * Indicates whether Amazon Kendra should index attachments to Salesforce objects.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforceconfiguration.html#cfn-kendra-datasource-salesforceconfiguration-crawlattachments
         */
        readonly crawlAttachments?: boolean | cdk.IResolvable;
        /**
         * A list of regular expression patterns to exclude certain documents in your Salesforce. Documents that match the patterns are excluded from the index. Documents that don't match the patterns are included in the index. If a document matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the document isn't included in the index.
         *
         * The pattern is applied to the name of the attached file.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforceconfiguration.html#cfn-kendra-datasource-salesforceconfiguration-excludeattachmentfilepatterns
         */
        readonly excludeAttachmentFilePatterns?: string[];
        /**
         * A list of regular expression patterns to include certain documents in your Salesforce. Documents that match the patterns are included in the index. Documents that don't match the patterns are excluded from the index. If a document matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the document isn't included in the index.
         *
         * The pattern is applied to the name of the attached file.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforceconfiguration.html#cfn-kendra-datasource-salesforceconfiguration-includeattachmentfilepatterns
         */
        readonly includeAttachmentFilePatterns?: string[];
        /**
         * Configuration information for the knowledge article types that Amazon Kendra indexes. Amazon Kendra indexes standard knowledge articles and the standard fields of knowledge articles, or the custom fields of custom knowledge articles, but not both.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforceconfiguration.html#cfn-kendra-datasource-salesforceconfiguration-knowledgearticleconfiguration
         */
        readonly knowledgeArticleConfiguration?: CfnDataSource.SalesforceKnowledgeArticleConfigurationProperty | cdk.IResolvable;
        /**
         * The Amazon Resource Name (ARN) of an AWS Secrets Manager secret that contains the key/value pairs required to connect to your Salesforce instance. The secret must contain a JSON structure with the following keys:
         *
         * - authenticationUrl - The OAUTH endpoint that Amazon Kendra connects to get an OAUTH token.
         * - consumerKey - The application public key generated when you created your Salesforce application.
         * - consumerSecret - The application private key generated when you created your Salesforce application.
         * - password - The password associated with the user logging in to the Salesforce instance.
         * - securityToken - The token associated with the user account logging in to the Salesforce instance.
         * - username - The user name of the user logging in to the Salesforce instance.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforceconfiguration.html#cfn-kendra-datasource-salesforceconfiguration-secretarn
         */
        readonly secretArn: string;
        /**
         * The instance URL for the Salesforce site that you want to index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforceconfiguration.html#cfn-kendra-datasource-salesforceconfiguration-serverurl
         */
        readonly serverUrl: string;
        /**
         * Configuration information for processing attachments to Salesforce standard objects.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforceconfiguration.html#cfn-kendra-datasource-salesforceconfiguration-standardobjectattachmentconfiguration
         */
        readonly standardObjectAttachmentConfiguration?: CfnDataSource.SalesforceStandardObjectAttachmentConfigurationProperty | cdk.IResolvable;
        /**
         * Configuration of the Salesforce standard objects that Amazon Kendra indexes.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforceconfiguration.html#cfn-kendra-datasource-salesforceconfiguration-standardobjectconfigurations
         */
        readonly standardObjectConfigurations?: Array<CfnDataSource.SalesforceStandardObjectConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SalesforceConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `SalesforceConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_SalesforceConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('chatterFeedConfiguration', CfnDataSource_SalesforceChatterFeedConfigurationPropertyValidator)(properties.chatterFeedConfiguration));
    errors.collect(cdk.propertyValidator('crawlAttachments', cdk.validateBoolean)(properties.crawlAttachments));
    errors.collect(cdk.propertyValidator('excludeAttachmentFilePatterns', cdk.listValidator(cdk.validateString))(properties.excludeAttachmentFilePatterns));
    errors.collect(cdk.propertyValidator('includeAttachmentFilePatterns', cdk.listValidator(cdk.validateString))(properties.includeAttachmentFilePatterns));
    errors.collect(cdk.propertyValidator('knowledgeArticleConfiguration', CfnDataSource_SalesforceKnowledgeArticleConfigurationPropertyValidator)(properties.knowledgeArticleConfiguration));
    errors.collect(cdk.propertyValidator('secretArn', cdk.requiredValidator)(properties.secretArn));
    errors.collect(cdk.propertyValidator('secretArn', cdk.validateString)(properties.secretArn));
    errors.collect(cdk.propertyValidator('serverUrl', cdk.requiredValidator)(properties.serverUrl));
    errors.collect(cdk.propertyValidator('serverUrl', cdk.validateString)(properties.serverUrl));
    errors.collect(cdk.propertyValidator('standardObjectAttachmentConfiguration', CfnDataSource_SalesforceStandardObjectAttachmentConfigurationPropertyValidator)(properties.standardObjectAttachmentConfiguration));
    errors.collect(cdk.propertyValidator('standardObjectConfigurations', cdk.listValidator(CfnDataSource_SalesforceStandardObjectConfigurationPropertyValidator))(properties.standardObjectConfigurations));
    return errors.wrap('supplied properties not correct for "SalesforceConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SalesforceConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `SalesforceConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SalesforceConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceSalesforceConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_SalesforceConfigurationPropertyValidator(properties).assertSuccess();
    return {
        ChatterFeedConfiguration: cfnDataSourceSalesforceChatterFeedConfigurationPropertyToCloudFormation(properties.chatterFeedConfiguration),
        CrawlAttachments: cdk.booleanToCloudFormation(properties.crawlAttachments),
        ExcludeAttachmentFilePatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.excludeAttachmentFilePatterns),
        IncludeAttachmentFilePatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.includeAttachmentFilePatterns),
        KnowledgeArticleConfiguration: cfnDataSourceSalesforceKnowledgeArticleConfigurationPropertyToCloudFormation(properties.knowledgeArticleConfiguration),
        SecretArn: cdk.stringToCloudFormation(properties.secretArn),
        ServerUrl: cdk.stringToCloudFormation(properties.serverUrl),
        StandardObjectAttachmentConfiguration: cfnDataSourceSalesforceStandardObjectAttachmentConfigurationPropertyToCloudFormation(properties.standardObjectAttachmentConfiguration),
        StandardObjectConfigurations: cdk.listMapper(cfnDataSourceSalesforceStandardObjectConfigurationPropertyToCloudFormation)(properties.standardObjectConfigurations),
    };
}

// @ts-ignore TS6133
function CfnDataSourceSalesforceConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.SalesforceConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.SalesforceConfigurationProperty>();
    ret.addPropertyResult('chatterFeedConfiguration', 'ChatterFeedConfiguration', properties.ChatterFeedConfiguration != null ? CfnDataSourceSalesforceChatterFeedConfigurationPropertyFromCloudFormation(properties.ChatterFeedConfiguration) : undefined);
    ret.addPropertyResult('crawlAttachments', 'CrawlAttachments', properties.CrawlAttachments != null ? cfn_parse.FromCloudFormation.getBoolean(properties.CrawlAttachments) : undefined);
    ret.addPropertyResult('excludeAttachmentFilePatterns', 'ExcludeAttachmentFilePatterns', properties.ExcludeAttachmentFilePatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExcludeAttachmentFilePatterns) : undefined);
    ret.addPropertyResult('includeAttachmentFilePatterns', 'IncludeAttachmentFilePatterns', properties.IncludeAttachmentFilePatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.IncludeAttachmentFilePatterns) : undefined);
    ret.addPropertyResult('knowledgeArticleConfiguration', 'KnowledgeArticleConfiguration', properties.KnowledgeArticleConfiguration != null ? CfnDataSourceSalesforceKnowledgeArticleConfigurationPropertyFromCloudFormation(properties.KnowledgeArticleConfiguration) : undefined);
    ret.addPropertyResult('secretArn', 'SecretArn', cfn_parse.FromCloudFormation.getString(properties.SecretArn));
    ret.addPropertyResult('serverUrl', 'ServerUrl', cfn_parse.FromCloudFormation.getString(properties.ServerUrl));
    ret.addPropertyResult('standardObjectAttachmentConfiguration', 'StandardObjectAttachmentConfiguration', properties.StandardObjectAttachmentConfiguration != null ? CfnDataSourceSalesforceStandardObjectAttachmentConfigurationPropertyFromCloudFormation(properties.StandardObjectAttachmentConfiguration) : undefined);
    ret.addPropertyResult('standardObjectConfigurations', 'StandardObjectConfigurations', properties.StandardObjectConfigurations != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceSalesforceStandardObjectConfigurationPropertyFromCloudFormation)(properties.StandardObjectConfigurations) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information for indexing Salesforce custom articles.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcecustomknowledgearticletypeconfiguration.html
     */
    export interface SalesforceCustomKnowledgeArticleTypeConfigurationProperty {
        /**
         * The name of the field in the custom knowledge article that contains the document data to index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcecustomknowledgearticletypeconfiguration.html#cfn-kendra-datasource-salesforcecustomknowledgearticletypeconfiguration-documentdatafieldname
         */
        readonly documentDataFieldName: string;
        /**
         * The name of the field in the custom knowledge article that contains the document title.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcecustomknowledgearticletypeconfiguration.html#cfn-kendra-datasource-salesforcecustomknowledgearticletypeconfiguration-documenttitlefieldname
         */
        readonly documentTitleFieldName?: string;
        /**
         * Maps attributes or field names of the custom knowledge article to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to Salesforce fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The Salesforce data source field names must exist in your Salesforce custom metadata.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcecustomknowledgearticletypeconfiguration.html#cfn-kendra-datasource-salesforcecustomknowledgearticletypeconfiguration-fieldmappings
         */
        readonly fieldMappings?: Array<CfnDataSource.DataSourceToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The name of the configuration.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcecustomknowledgearticletypeconfiguration.html#cfn-kendra-datasource-salesforcecustomknowledgearticletypeconfiguration-name
         */
        readonly name: string;
    }
}

/**
 * Determine whether the given properties match those of a `SalesforceCustomKnowledgeArticleTypeConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `SalesforceCustomKnowledgeArticleTypeConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_SalesforceCustomKnowledgeArticleTypeConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('documentDataFieldName', cdk.requiredValidator)(properties.documentDataFieldName));
    errors.collect(cdk.propertyValidator('documentDataFieldName', cdk.validateString)(properties.documentDataFieldName));
    errors.collect(cdk.propertyValidator('documentTitleFieldName', cdk.validateString)(properties.documentTitleFieldName));
    errors.collect(cdk.propertyValidator('fieldMappings', cdk.listValidator(CfnDataSource_DataSourceToIndexFieldMappingPropertyValidator))(properties.fieldMappings));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "SalesforceCustomKnowledgeArticleTypeConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SalesforceCustomKnowledgeArticleTypeConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `SalesforceCustomKnowledgeArticleTypeConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SalesforceCustomKnowledgeArticleTypeConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceSalesforceCustomKnowledgeArticleTypeConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_SalesforceCustomKnowledgeArticleTypeConfigurationPropertyValidator(properties).assertSuccess();
    return {
        DocumentDataFieldName: cdk.stringToCloudFormation(properties.documentDataFieldName),
        DocumentTitleFieldName: cdk.stringToCloudFormation(properties.documentTitleFieldName),
        FieldMappings: cdk.listMapper(cfnDataSourceDataSourceToIndexFieldMappingPropertyToCloudFormation)(properties.fieldMappings),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnDataSourceSalesforceCustomKnowledgeArticleTypeConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.SalesforceCustomKnowledgeArticleTypeConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.SalesforceCustomKnowledgeArticleTypeConfigurationProperty>();
    ret.addPropertyResult('documentDataFieldName', 'DocumentDataFieldName', cfn_parse.FromCloudFormation.getString(properties.DocumentDataFieldName));
    ret.addPropertyResult('documentTitleFieldName', 'DocumentTitleFieldName', properties.DocumentTitleFieldName != null ? cfn_parse.FromCloudFormation.getString(properties.DocumentTitleFieldName) : undefined);
    ret.addPropertyResult('fieldMappings', 'FieldMappings', properties.FieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceDataSourceToIndexFieldMappingPropertyFromCloudFormation)(properties.FieldMappings) : undefined);
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information for the knowledge article types that Amazon Kendra indexes. Amazon Kendra indexes standard knowledge articles and the standard fields of knowledge articles, or the custom fields of custom knowledge articles, but not both
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforceknowledgearticleconfiguration.html
     */
    export interface SalesforceKnowledgeArticleConfigurationProperty {
        /**
         * Configuration information for custom Salesforce knowledge articles.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforceknowledgearticleconfiguration.html#cfn-kendra-datasource-salesforceknowledgearticleconfiguration-customknowledgearticletypeconfigurations
         */
        readonly customKnowledgeArticleTypeConfigurations?: Array<CfnDataSource.SalesforceCustomKnowledgeArticleTypeConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * Specifies the document states that should be included when Amazon Kendra indexes knowledge articles. You must specify at least one state.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforceknowledgearticleconfiguration.html#cfn-kendra-datasource-salesforceknowledgearticleconfiguration-includedstates
         */
        readonly includedStates: string[];
        /**
         * Configuration information for standard Salesforce knowledge articles.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforceknowledgearticleconfiguration.html#cfn-kendra-datasource-salesforceknowledgearticleconfiguration-standardknowledgearticletypeconfiguration
         */
        readonly standardKnowledgeArticleTypeConfiguration?: CfnDataSource.SalesforceStandardKnowledgeArticleTypeConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SalesforceKnowledgeArticleConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `SalesforceKnowledgeArticleConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_SalesforceKnowledgeArticleConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('customKnowledgeArticleTypeConfigurations', cdk.listValidator(CfnDataSource_SalesforceCustomKnowledgeArticleTypeConfigurationPropertyValidator))(properties.customKnowledgeArticleTypeConfigurations));
    errors.collect(cdk.propertyValidator('includedStates', cdk.requiredValidator)(properties.includedStates));
    errors.collect(cdk.propertyValidator('includedStates', cdk.listValidator(cdk.validateString))(properties.includedStates));
    errors.collect(cdk.propertyValidator('standardKnowledgeArticleTypeConfiguration', CfnDataSource_SalesforceStandardKnowledgeArticleTypeConfigurationPropertyValidator)(properties.standardKnowledgeArticleTypeConfiguration));
    return errors.wrap('supplied properties not correct for "SalesforceKnowledgeArticleConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SalesforceKnowledgeArticleConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `SalesforceKnowledgeArticleConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SalesforceKnowledgeArticleConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceSalesforceKnowledgeArticleConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_SalesforceKnowledgeArticleConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CustomKnowledgeArticleTypeConfigurations: cdk.listMapper(cfnDataSourceSalesforceCustomKnowledgeArticleTypeConfigurationPropertyToCloudFormation)(properties.customKnowledgeArticleTypeConfigurations),
        IncludedStates: cdk.listMapper(cdk.stringToCloudFormation)(properties.includedStates),
        StandardKnowledgeArticleTypeConfiguration: cfnDataSourceSalesforceStandardKnowledgeArticleTypeConfigurationPropertyToCloudFormation(properties.standardKnowledgeArticleTypeConfiguration),
    };
}

// @ts-ignore TS6133
function CfnDataSourceSalesforceKnowledgeArticleConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.SalesforceKnowledgeArticleConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.SalesforceKnowledgeArticleConfigurationProperty>();
    ret.addPropertyResult('customKnowledgeArticleTypeConfigurations', 'CustomKnowledgeArticleTypeConfigurations', properties.CustomKnowledgeArticleTypeConfigurations != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceSalesforceCustomKnowledgeArticleTypeConfigurationPropertyFromCloudFormation)(properties.CustomKnowledgeArticleTypeConfigurations) : undefined);
    ret.addPropertyResult('includedStates', 'IncludedStates', cfn_parse.FromCloudFormation.getStringArray(properties.IncludedStates));
    ret.addPropertyResult('standardKnowledgeArticleTypeConfiguration', 'StandardKnowledgeArticleTypeConfiguration', properties.StandardKnowledgeArticleTypeConfiguration != null ? CfnDataSourceSalesforceStandardKnowledgeArticleTypeConfigurationPropertyFromCloudFormation(properties.StandardKnowledgeArticleTypeConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information for standard Salesforce knowledge articles.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcestandardknowledgearticletypeconfiguration.html
     */
    export interface SalesforceStandardKnowledgeArticleTypeConfigurationProperty {
        /**
         * The name of the field that contains the document data to index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcestandardknowledgearticletypeconfiguration.html#cfn-kendra-datasource-salesforcestandardknowledgearticletypeconfiguration-documentdatafieldname
         */
        readonly documentDataFieldName: string;
        /**
         * The name of the field that contains the document title.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcestandardknowledgearticletypeconfiguration.html#cfn-kendra-datasource-salesforcestandardknowledgearticletypeconfiguration-documenttitlefieldname
         */
        readonly documentTitleFieldName?: string;
        /**
         * Maps attributes or field names of the knowledge article to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to Salesforce fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The Salesforce data source field names must exist in your Salesforce custom metadata.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcestandardknowledgearticletypeconfiguration.html#cfn-kendra-datasource-salesforcestandardknowledgearticletypeconfiguration-fieldmappings
         */
        readonly fieldMappings?: Array<CfnDataSource.DataSourceToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SalesforceStandardKnowledgeArticleTypeConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `SalesforceStandardKnowledgeArticleTypeConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_SalesforceStandardKnowledgeArticleTypeConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('documentDataFieldName', cdk.requiredValidator)(properties.documentDataFieldName));
    errors.collect(cdk.propertyValidator('documentDataFieldName', cdk.validateString)(properties.documentDataFieldName));
    errors.collect(cdk.propertyValidator('documentTitleFieldName', cdk.validateString)(properties.documentTitleFieldName));
    errors.collect(cdk.propertyValidator('fieldMappings', cdk.listValidator(CfnDataSource_DataSourceToIndexFieldMappingPropertyValidator))(properties.fieldMappings));
    return errors.wrap('supplied properties not correct for "SalesforceStandardKnowledgeArticleTypeConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SalesforceStandardKnowledgeArticleTypeConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `SalesforceStandardKnowledgeArticleTypeConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SalesforceStandardKnowledgeArticleTypeConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceSalesforceStandardKnowledgeArticleTypeConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_SalesforceStandardKnowledgeArticleTypeConfigurationPropertyValidator(properties).assertSuccess();
    return {
        DocumentDataFieldName: cdk.stringToCloudFormation(properties.documentDataFieldName),
        DocumentTitleFieldName: cdk.stringToCloudFormation(properties.documentTitleFieldName),
        FieldMappings: cdk.listMapper(cfnDataSourceDataSourceToIndexFieldMappingPropertyToCloudFormation)(properties.fieldMappings),
    };
}

// @ts-ignore TS6133
function CfnDataSourceSalesforceStandardKnowledgeArticleTypeConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.SalesforceStandardKnowledgeArticleTypeConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.SalesforceStandardKnowledgeArticleTypeConfigurationProperty>();
    ret.addPropertyResult('documentDataFieldName', 'DocumentDataFieldName', cfn_parse.FromCloudFormation.getString(properties.DocumentDataFieldName));
    ret.addPropertyResult('documentTitleFieldName', 'DocumentTitleFieldName', properties.DocumentTitleFieldName != null ? cfn_parse.FromCloudFormation.getString(properties.DocumentTitleFieldName) : undefined);
    ret.addPropertyResult('fieldMappings', 'FieldMappings', properties.FieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceDataSourceToIndexFieldMappingPropertyFromCloudFormation)(properties.FieldMappings) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information for processing attachments to Salesforce standard objects.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcestandardobjectattachmentconfiguration.html
     */
    export interface SalesforceStandardObjectAttachmentConfigurationProperty {
        /**
         * The name of the field used for the document title.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcestandardobjectattachmentconfiguration.html#cfn-kendra-datasource-salesforcestandardobjectattachmentconfiguration-documenttitlefieldname
         */
        readonly documentTitleFieldName?: string;
        /**
         * One or more objects that map fields in attachments to Amazon Kendra index fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcestandardobjectattachmentconfiguration.html#cfn-kendra-datasource-salesforcestandardobjectattachmentconfiguration-fieldmappings
         */
        readonly fieldMappings?: Array<CfnDataSource.DataSourceToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SalesforceStandardObjectAttachmentConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `SalesforceStandardObjectAttachmentConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_SalesforceStandardObjectAttachmentConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('documentTitleFieldName', cdk.validateString)(properties.documentTitleFieldName));
    errors.collect(cdk.propertyValidator('fieldMappings', cdk.listValidator(CfnDataSource_DataSourceToIndexFieldMappingPropertyValidator))(properties.fieldMappings));
    return errors.wrap('supplied properties not correct for "SalesforceStandardObjectAttachmentConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SalesforceStandardObjectAttachmentConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `SalesforceStandardObjectAttachmentConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SalesforceStandardObjectAttachmentConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceSalesforceStandardObjectAttachmentConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_SalesforceStandardObjectAttachmentConfigurationPropertyValidator(properties).assertSuccess();
    return {
        DocumentTitleFieldName: cdk.stringToCloudFormation(properties.documentTitleFieldName),
        FieldMappings: cdk.listMapper(cfnDataSourceDataSourceToIndexFieldMappingPropertyToCloudFormation)(properties.fieldMappings),
    };
}

// @ts-ignore TS6133
function CfnDataSourceSalesforceStandardObjectAttachmentConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.SalesforceStandardObjectAttachmentConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.SalesforceStandardObjectAttachmentConfigurationProperty>();
    ret.addPropertyResult('documentTitleFieldName', 'DocumentTitleFieldName', properties.DocumentTitleFieldName != null ? cfn_parse.FromCloudFormation.getString(properties.DocumentTitleFieldName) : undefined);
    ret.addPropertyResult('fieldMappings', 'FieldMappings', properties.FieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceDataSourceToIndexFieldMappingPropertyFromCloudFormation)(properties.FieldMappings) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Specifies configuration information for indexing a single standard object.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcestandardobjectconfiguration.html
     */
    export interface SalesforceStandardObjectConfigurationProperty {
        /**
         * The name of the field in the standard object table that contains the document contents.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcestandardobjectconfiguration.html#cfn-kendra-datasource-salesforcestandardobjectconfiguration-documentdatafieldname
         */
        readonly documentDataFieldName: string;
        /**
         * The name of the field in the standard object table that contains the document title.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcestandardobjectconfiguration.html#cfn-kendra-datasource-salesforcestandardobjectconfiguration-documenttitlefieldname
         */
        readonly documentTitleFieldName?: string;
        /**
         * Maps attributes or field names of the standard object to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to Salesforce fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The Salesforce data source field names must exist in your Salesforce custom metadata.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcestandardobjectconfiguration.html#cfn-kendra-datasource-salesforcestandardobjectconfiguration-fieldmappings
         */
        readonly fieldMappings?: Array<CfnDataSource.DataSourceToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The name of the standard object.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-salesforcestandardobjectconfiguration.html#cfn-kendra-datasource-salesforcestandardobjectconfiguration-name
         */
        readonly name: string;
    }
}

/**
 * Determine whether the given properties match those of a `SalesforceStandardObjectConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `SalesforceStandardObjectConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_SalesforceStandardObjectConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('documentDataFieldName', cdk.requiredValidator)(properties.documentDataFieldName));
    errors.collect(cdk.propertyValidator('documentDataFieldName', cdk.validateString)(properties.documentDataFieldName));
    errors.collect(cdk.propertyValidator('documentTitleFieldName', cdk.validateString)(properties.documentTitleFieldName));
    errors.collect(cdk.propertyValidator('fieldMappings', cdk.listValidator(CfnDataSource_DataSourceToIndexFieldMappingPropertyValidator))(properties.fieldMappings));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "SalesforceStandardObjectConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SalesforceStandardObjectConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `SalesforceStandardObjectConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SalesforceStandardObjectConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceSalesforceStandardObjectConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_SalesforceStandardObjectConfigurationPropertyValidator(properties).assertSuccess();
    return {
        DocumentDataFieldName: cdk.stringToCloudFormation(properties.documentDataFieldName),
        DocumentTitleFieldName: cdk.stringToCloudFormation(properties.documentTitleFieldName),
        FieldMappings: cdk.listMapper(cfnDataSourceDataSourceToIndexFieldMappingPropertyToCloudFormation)(properties.fieldMappings),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnDataSourceSalesforceStandardObjectConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.SalesforceStandardObjectConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.SalesforceStandardObjectConfigurationProperty>();
    ret.addPropertyResult('documentDataFieldName', 'DocumentDataFieldName', cfn_parse.FromCloudFormation.getString(properties.DocumentDataFieldName));
    ret.addPropertyResult('documentTitleFieldName', 'DocumentTitleFieldName', properties.DocumentTitleFieldName != null ? cfn_parse.FromCloudFormation.getString(properties.DocumentTitleFieldName) : undefined);
    ret.addPropertyResult('fieldMappings', 'FieldMappings', properties.FieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceDataSourceToIndexFieldMappingPropertyFromCloudFormation)(properties.FieldMappings) : undefined);
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information to connect to ServiceNow as your data source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowconfiguration.html
     */
    export interface ServiceNowConfigurationProperty {
        /**
         * The type of authentication used to connect to the ServiceNow instance. If you choose `HTTP_BASIC` , Amazon Kendra is authenticated using the user name and password provided in the AWS Secrets Manager secret in the `SecretArn` field. When you choose `OAUTH2` , Amazon Kendra is authenticated using the OAuth token and secret provided in the Secrets Manager secret, and the user name and password are used to determine which information Amazon Kendra has access to.
         *
         * When you use `OAUTH2` authentication, you must generate a token and a client secret using the ServiceNow console. For more information, see [Using a ServiceNow data source](https://docs.aws.amazon.com/kendra/latest/dg/data-source-servicenow.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowconfiguration.html#cfn-kendra-datasource-servicenowconfiguration-authenticationtype
         */
        readonly authenticationType?: string;
        /**
         * The ServiceNow instance that the data source connects to. The host endpoint should look like the following: *{instance}.service-now.com.*
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowconfiguration.html#cfn-kendra-datasource-servicenowconfiguration-hosturl
         */
        readonly hostUrl: string;
        /**
         * Configuration information for crawling knowledge articles in the ServiceNow site.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowconfiguration.html#cfn-kendra-datasource-servicenowconfiguration-knowledgearticleconfiguration
         */
        readonly knowledgeArticleConfiguration?: CfnDataSource.ServiceNowKnowledgeArticleConfigurationProperty | cdk.IResolvable;
        /**
         * The Amazon Resource Name (ARN) of the AWS Secrets Manager secret that contains the user name and password required to connect to the ServiceNow instance.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowconfiguration.html#cfn-kendra-datasource-servicenowconfiguration-secretarn
         */
        readonly secretArn: string;
        /**
         * Configuration information for crawling service catalogs in the ServiceNow site.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowconfiguration.html#cfn-kendra-datasource-servicenowconfiguration-servicecatalogconfiguration
         */
        readonly serviceCatalogConfiguration?: CfnDataSource.ServiceNowServiceCatalogConfigurationProperty | cdk.IResolvable;
        /**
         * The identifier of the release that the ServiceNow host is running. If the host is not running the `LONDON` release, use `OTHERS` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowconfiguration.html#cfn-kendra-datasource-servicenowconfiguration-servicenowbuildversion
         */
        readonly serviceNowBuildVersion: string;
    }
}

/**
 * Determine whether the given properties match those of a `ServiceNowConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ServiceNowConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ServiceNowConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('authenticationType', cdk.validateString)(properties.authenticationType));
    errors.collect(cdk.propertyValidator('hostUrl', cdk.requiredValidator)(properties.hostUrl));
    errors.collect(cdk.propertyValidator('hostUrl', cdk.validateString)(properties.hostUrl));
    errors.collect(cdk.propertyValidator('knowledgeArticleConfiguration', CfnDataSource_ServiceNowKnowledgeArticleConfigurationPropertyValidator)(properties.knowledgeArticleConfiguration));
    errors.collect(cdk.propertyValidator('secretArn', cdk.requiredValidator)(properties.secretArn));
    errors.collect(cdk.propertyValidator('secretArn', cdk.validateString)(properties.secretArn));
    errors.collect(cdk.propertyValidator('serviceCatalogConfiguration', CfnDataSource_ServiceNowServiceCatalogConfigurationPropertyValidator)(properties.serviceCatalogConfiguration));
    errors.collect(cdk.propertyValidator('serviceNowBuildVersion', cdk.requiredValidator)(properties.serviceNowBuildVersion));
    errors.collect(cdk.propertyValidator('serviceNowBuildVersion', cdk.validateString)(properties.serviceNowBuildVersion));
    return errors.wrap('supplied properties not correct for "ServiceNowConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ServiceNowConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ServiceNowConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ServiceNowConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceServiceNowConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ServiceNowConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AuthenticationType: cdk.stringToCloudFormation(properties.authenticationType),
        HostUrl: cdk.stringToCloudFormation(properties.hostUrl),
        KnowledgeArticleConfiguration: cfnDataSourceServiceNowKnowledgeArticleConfigurationPropertyToCloudFormation(properties.knowledgeArticleConfiguration),
        SecretArn: cdk.stringToCloudFormation(properties.secretArn),
        ServiceCatalogConfiguration: cfnDataSourceServiceNowServiceCatalogConfigurationPropertyToCloudFormation(properties.serviceCatalogConfiguration),
        ServiceNowBuildVersion: cdk.stringToCloudFormation(properties.serviceNowBuildVersion),
    };
}

// @ts-ignore TS6133
function CfnDataSourceServiceNowConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ServiceNowConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ServiceNowConfigurationProperty>();
    ret.addPropertyResult('authenticationType', 'AuthenticationType', properties.AuthenticationType != null ? cfn_parse.FromCloudFormation.getString(properties.AuthenticationType) : undefined);
    ret.addPropertyResult('hostUrl', 'HostUrl', cfn_parse.FromCloudFormation.getString(properties.HostUrl));
    ret.addPropertyResult('knowledgeArticleConfiguration', 'KnowledgeArticleConfiguration', properties.KnowledgeArticleConfiguration != null ? CfnDataSourceServiceNowKnowledgeArticleConfigurationPropertyFromCloudFormation(properties.KnowledgeArticleConfiguration) : undefined);
    ret.addPropertyResult('secretArn', 'SecretArn', cfn_parse.FromCloudFormation.getString(properties.SecretArn));
    ret.addPropertyResult('serviceCatalogConfiguration', 'ServiceCatalogConfiguration', properties.ServiceCatalogConfiguration != null ? CfnDataSourceServiceNowServiceCatalogConfigurationPropertyFromCloudFormation(properties.ServiceCatalogConfiguration) : undefined);
    ret.addPropertyResult('serviceNowBuildVersion', 'ServiceNowBuildVersion', cfn_parse.FromCloudFormation.getString(properties.ServiceNowBuildVersion));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information for crawling knowledge articles in the ServiceNow site.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowknowledgearticleconfiguration.html
     */
    export interface ServiceNowKnowledgeArticleConfigurationProperty {
        /**
         * Indicates whether Amazon Kendra should index attachments to knowledge articles.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowknowledgearticleconfiguration.html#cfn-kendra-datasource-servicenowknowledgearticleconfiguration-crawlattachments
         */
        readonly crawlAttachments?: boolean | cdk.IResolvable;
        /**
         * The name of the ServiceNow field that is mapped to the index document contents field in the Amazon Kendra index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowknowledgearticleconfiguration.html#cfn-kendra-datasource-servicenowknowledgearticleconfiguration-documentdatafieldname
         */
        readonly documentDataFieldName: string;
        /**
         * The name of the ServiceNow field that is mapped to the index document title field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowknowledgearticleconfiguration.html#cfn-kendra-datasource-servicenowknowledgearticleconfiguration-documenttitlefieldname
         */
        readonly documentTitleFieldName?: string;
        /**
         * A list of regular expression patterns to exclude certain attachments of knowledge articles in your ServiceNow. Item that match the patterns are excluded from the index. Items that don't match the patterns are included in the index. If an item matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the item isn't included in the index.
         *
         * The regex is applied to the field specified in the `PatternTargetField` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowknowledgearticleconfiguration.html#cfn-kendra-datasource-servicenowknowledgearticleconfiguration-excludeattachmentfilepatterns
         */
        readonly excludeAttachmentFilePatterns?: string[];
        /**
         * Maps attributes or field names of knoweldge articles to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to ServiceNow fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The ServiceNow data source field names must exist in your ServiceNow custom metadata.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowknowledgearticleconfiguration.html#cfn-kendra-datasource-servicenowknowledgearticleconfiguration-fieldmappings
         */
        readonly fieldMappings?: Array<CfnDataSource.DataSourceToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * A query that selects the knowledge articles to index. The query can return articles from multiple knowledge bases, and the knowledge bases can be public or private.
         *
         * The query string must be one generated by the ServiceNow console. For more information, see [Specifying documents to index with a query](https://docs.aws.amazon.com/kendra/latest/dg/servicenow-query.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowknowledgearticleconfiguration.html#cfn-kendra-datasource-servicenowknowledgearticleconfiguration-filterquery
         */
        readonly filterQuery?: string;
        /**
         * A list of regular expression patterns to include certain attachments of knowledge articles in your ServiceNow. Item that match the patterns are included in the index. Items that don't match the patterns are excluded from the index. If an item matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the item isn't included in the index.
         *
         * The regex is applied to the field specified in the `PatternTargetField` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowknowledgearticleconfiguration.html#cfn-kendra-datasource-servicenowknowledgearticleconfiguration-includeattachmentfilepatterns
         */
        readonly includeAttachmentFilePatterns?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `ServiceNowKnowledgeArticleConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ServiceNowKnowledgeArticleConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ServiceNowKnowledgeArticleConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('crawlAttachments', cdk.validateBoolean)(properties.crawlAttachments));
    errors.collect(cdk.propertyValidator('documentDataFieldName', cdk.requiredValidator)(properties.documentDataFieldName));
    errors.collect(cdk.propertyValidator('documentDataFieldName', cdk.validateString)(properties.documentDataFieldName));
    errors.collect(cdk.propertyValidator('documentTitleFieldName', cdk.validateString)(properties.documentTitleFieldName));
    errors.collect(cdk.propertyValidator('excludeAttachmentFilePatterns', cdk.listValidator(cdk.validateString))(properties.excludeAttachmentFilePatterns));
    errors.collect(cdk.propertyValidator('fieldMappings', cdk.listValidator(CfnDataSource_DataSourceToIndexFieldMappingPropertyValidator))(properties.fieldMappings));
    errors.collect(cdk.propertyValidator('filterQuery', cdk.validateString)(properties.filterQuery));
    errors.collect(cdk.propertyValidator('includeAttachmentFilePatterns', cdk.listValidator(cdk.validateString))(properties.includeAttachmentFilePatterns));
    return errors.wrap('supplied properties not correct for "ServiceNowKnowledgeArticleConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ServiceNowKnowledgeArticleConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ServiceNowKnowledgeArticleConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ServiceNowKnowledgeArticleConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceServiceNowKnowledgeArticleConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ServiceNowKnowledgeArticleConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CrawlAttachments: cdk.booleanToCloudFormation(properties.crawlAttachments),
        DocumentDataFieldName: cdk.stringToCloudFormation(properties.documentDataFieldName),
        DocumentTitleFieldName: cdk.stringToCloudFormation(properties.documentTitleFieldName),
        ExcludeAttachmentFilePatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.excludeAttachmentFilePatterns),
        FieldMappings: cdk.listMapper(cfnDataSourceDataSourceToIndexFieldMappingPropertyToCloudFormation)(properties.fieldMappings),
        FilterQuery: cdk.stringToCloudFormation(properties.filterQuery),
        IncludeAttachmentFilePatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.includeAttachmentFilePatterns),
    };
}

// @ts-ignore TS6133
function CfnDataSourceServiceNowKnowledgeArticleConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ServiceNowKnowledgeArticleConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ServiceNowKnowledgeArticleConfigurationProperty>();
    ret.addPropertyResult('crawlAttachments', 'CrawlAttachments', properties.CrawlAttachments != null ? cfn_parse.FromCloudFormation.getBoolean(properties.CrawlAttachments) : undefined);
    ret.addPropertyResult('documentDataFieldName', 'DocumentDataFieldName', cfn_parse.FromCloudFormation.getString(properties.DocumentDataFieldName));
    ret.addPropertyResult('documentTitleFieldName', 'DocumentTitleFieldName', properties.DocumentTitleFieldName != null ? cfn_parse.FromCloudFormation.getString(properties.DocumentTitleFieldName) : undefined);
    ret.addPropertyResult('excludeAttachmentFilePatterns', 'ExcludeAttachmentFilePatterns', properties.ExcludeAttachmentFilePatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExcludeAttachmentFilePatterns) : undefined);
    ret.addPropertyResult('fieldMappings', 'FieldMappings', properties.FieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceDataSourceToIndexFieldMappingPropertyFromCloudFormation)(properties.FieldMappings) : undefined);
    ret.addPropertyResult('filterQuery', 'FilterQuery', properties.FilterQuery != null ? cfn_parse.FromCloudFormation.getString(properties.FilterQuery) : undefined);
    ret.addPropertyResult('includeAttachmentFilePatterns', 'IncludeAttachmentFilePatterns', properties.IncludeAttachmentFilePatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.IncludeAttachmentFilePatterns) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information for crawling service catalog items in the ServiceNow site
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowservicecatalogconfiguration.html
     */
    export interface ServiceNowServiceCatalogConfigurationProperty {
        /**
         * Indicates whether Amazon Kendra should crawl attachments to the service catalog items.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowservicecatalogconfiguration.html#cfn-kendra-datasource-servicenowservicecatalogconfiguration-crawlattachments
         */
        readonly crawlAttachments?: boolean | cdk.IResolvable;
        /**
         * The name of the ServiceNow field that is mapped to the index document contents field in the Amazon Kendra index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowservicecatalogconfiguration.html#cfn-kendra-datasource-servicenowservicecatalogconfiguration-documentdatafieldname
         */
        readonly documentDataFieldName: string;
        /**
         * The name of the ServiceNow field that is mapped to the index document title field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowservicecatalogconfiguration.html#cfn-kendra-datasource-servicenowservicecatalogconfiguration-documenttitlefieldname
         */
        readonly documentTitleFieldName?: string;
        /**
         * A list of regular expression patterns to exclude certain attachments of catalogs in your ServiceNow. Item that match the patterns are excluded from the index. Items that don't match the patterns are included in the index. If an item matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the item isn't included in the index.
         *
         * The regex is applied to the file name of the attachment.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowservicecatalogconfiguration.html#cfn-kendra-datasource-servicenowservicecatalogconfiguration-excludeattachmentfilepatterns
         */
        readonly excludeAttachmentFilePatterns?: string[];
        /**
         * Maps attributes or field names of catalogs to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to ServiceNow fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The ServiceNow data source field names must exist in your ServiceNow custom metadata.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowservicecatalogconfiguration.html#cfn-kendra-datasource-servicenowservicecatalogconfiguration-fieldmappings
         */
        readonly fieldMappings?: Array<CfnDataSource.DataSourceToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * A list of regular expression patterns to include certain attachments of catalogs in your ServiceNow. Item that match the patterns are included in the index. Items that don't match the patterns are excluded from the index. If an item matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the item isn't included in the index.
         *
         * The regex is applied to the file name of the attachment.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-servicenowservicecatalogconfiguration.html#cfn-kendra-datasource-servicenowservicecatalogconfiguration-includeattachmentfilepatterns
         */
        readonly includeAttachmentFilePatterns?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `ServiceNowServiceCatalogConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ServiceNowServiceCatalogConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_ServiceNowServiceCatalogConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('crawlAttachments', cdk.validateBoolean)(properties.crawlAttachments));
    errors.collect(cdk.propertyValidator('documentDataFieldName', cdk.requiredValidator)(properties.documentDataFieldName));
    errors.collect(cdk.propertyValidator('documentDataFieldName', cdk.validateString)(properties.documentDataFieldName));
    errors.collect(cdk.propertyValidator('documentTitleFieldName', cdk.validateString)(properties.documentTitleFieldName));
    errors.collect(cdk.propertyValidator('excludeAttachmentFilePatterns', cdk.listValidator(cdk.validateString))(properties.excludeAttachmentFilePatterns));
    errors.collect(cdk.propertyValidator('fieldMappings', cdk.listValidator(CfnDataSource_DataSourceToIndexFieldMappingPropertyValidator))(properties.fieldMappings));
    errors.collect(cdk.propertyValidator('includeAttachmentFilePatterns', cdk.listValidator(cdk.validateString))(properties.includeAttachmentFilePatterns));
    return errors.wrap('supplied properties not correct for "ServiceNowServiceCatalogConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ServiceNowServiceCatalogConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ServiceNowServiceCatalogConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.ServiceNowServiceCatalogConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceServiceNowServiceCatalogConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_ServiceNowServiceCatalogConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CrawlAttachments: cdk.booleanToCloudFormation(properties.crawlAttachments),
        DocumentDataFieldName: cdk.stringToCloudFormation(properties.documentDataFieldName),
        DocumentTitleFieldName: cdk.stringToCloudFormation(properties.documentTitleFieldName),
        ExcludeAttachmentFilePatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.excludeAttachmentFilePatterns),
        FieldMappings: cdk.listMapper(cfnDataSourceDataSourceToIndexFieldMappingPropertyToCloudFormation)(properties.fieldMappings),
        IncludeAttachmentFilePatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.includeAttachmentFilePatterns),
    };
}

// @ts-ignore TS6133
function CfnDataSourceServiceNowServiceCatalogConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.ServiceNowServiceCatalogConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.ServiceNowServiceCatalogConfigurationProperty>();
    ret.addPropertyResult('crawlAttachments', 'CrawlAttachments', properties.CrawlAttachments != null ? cfn_parse.FromCloudFormation.getBoolean(properties.CrawlAttachments) : undefined);
    ret.addPropertyResult('documentDataFieldName', 'DocumentDataFieldName', cfn_parse.FromCloudFormation.getString(properties.DocumentDataFieldName));
    ret.addPropertyResult('documentTitleFieldName', 'DocumentTitleFieldName', properties.DocumentTitleFieldName != null ? cfn_parse.FromCloudFormation.getString(properties.DocumentTitleFieldName) : undefined);
    ret.addPropertyResult('excludeAttachmentFilePatterns', 'ExcludeAttachmentFilePatterns', properties.ExcludeAttachmentFilePatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExcludeAttachmentFilePatterns) : undefined);
    ret.addPropertyResult('fieldMappings', 'FieldMappings', properties.FieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceDataSourceToIndexFieldMappingPropertyFromCloudFormation)(properties.FieldMappings) : undefined);
    ret.addPropertyResult('includeAttachmentFilePatterns', 'IncludeAttachmentFilePatterns', properties.IncludeAttachmentFilePatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.IncludeAttachmentFilePatterns) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information to connect to Microsoft SharePoint as your data source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sharepointconfiguration.html
     */
    export interface SharePointConfigurationProperty {
        /**
         * `TRUE` to include attachments to documents stored in your Microsoft SharePoint site in the index; otherwise, `FALSE` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sharepointconfiguration.html#cfn-kendra-datasource-sharepointconfiguration-crawlattachments
         */
        readonly crawlAttachments?: boolean | cdk.IResolvable;
        /**
         * A Boolean value that specifies whether local groups are disabled ( `True` ) or enabled ( `False` ).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sharepointconfiguration.html#cfn-kendra-datasource-sharepointconfiguration-disablelocalgroups
         */
        readonly disableLocalGroups?: boolean | cdk.IResolvable;
        /**
         * The Microsoft SharePoint attribute field that contains the title of the document.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sharepointconfiguration.html#cfn-kendra-datasource-sharepointconfiguration-documenttitlefieldname
         */
        readonly documentTitleFieldName?: string;
        /**
         * A list of regular expression patterns. Documents that match the patterns are excluded from the index. Documents that don't match the patterns are included in the index. If a document matches both an exclusion pattern and an inclusion pattern, the document is not included in the index.
         *
         * The regex is applied to the display URL of the SharePoint document.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sharepointconfiguration.html#cfn-kendra-datasource-sharepointconfiguration-exclusionpatterns
         */
        readonly exclusionPatterns?: string[];
        /**
         * A list of `DataSourceToIndexFieldMapping` objects that map Microsoft SharePoint attributes to custom fields in the Amazon Kendra index. You must first create the index fields using the [UpdateIndex](https://docs.aws.amazon.com/kendra/latest/dg/API_UpdateIndex.html) operation before you map SharePoint attributes. For more information, see [Mapping Data Source Fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sharepointconfiguration.html#cfn-kendra-datasource-sharepointconfiguration-fieldmappings
         */
        readonly fieldMappings?: Array<CfnDataSource.DataSourceToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * A list of regular expression patterns to include certain documents in your SharePoint. Documents that match the patterns are included in the index. Documents that don't match the patterns are excluded from the index. If a document matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the document isn't included in the index.
         *
         * The regex is applied to the display URL of the SharePoint document.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sharepointconfiguration.html#cfn-kendra-datasource-sharepointconfiguration-inclusionpatterns
         */
        readonly inclusionPatterns?: string[];
        /**
         * The Amazon Resource Name (ARN) of credentials stored in AWS Secrets Manager . The credentials should be a user/password pair. If you use SharePoint Server, you also need to provide the sever domain name as part of the credentials. For more information, see [Using a Microsoft SharePoint Data Source](https://docs.aws.amazon.com/kendra/latest/dg/data-source-sharepoint.html) . For more information about AWS Secrets Manager see [What Is AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) in the *AWS Secrets Manager* user guide.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sharepointconfiguration.html#cfn-kendra-datasource-sharepointconfiguration-secretarn
         */
        readonly secretArn: string;
        /**
         * The version of Microsoft SharePoint that you are using as a data source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sharepointconfiguration.html#cfn-kendra-datasource-sharepointconfiguration-sharepointversion
         */
        readonly sharePointVersion: string;
        /**
         * Information required to find a specific file in an Amazon S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sharepointconfiguration.html#cfn-kendra-datasource-sharepointconfiguration-sslcertificates3path
         */
        readonly sslCertificateS3Path?: CfnDataSource.S3PathProperty | cdk.IResolvable;
        /**
         * The URLs of the Microsoft SharePoint site that contains the documents that should be indexed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sharepointconfiguration.html#cfn-kendra-datasource-sharepointconfiguration-urls
         */
        readonly urls: string[];
        /**
         * `TRUE` to use the SharePoint change log to determine which documents require updating in the index. Depending on the change log's size, it may take longer for Amazon Kendra to use the change log than to scan all of your documents in SharePoint.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sharepointconfiguration.html#cfn-kendra-datasource-sharepointconfiguration-usechangelog
         */
        readonly useChangeLog?: boolean | cdk.IResolvable;
        /**
         * Provides information for connecting to an Amazon VPC.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sharepointconfiguration.html#cfn-kendra-datasource-sharepointconfiguration-vpcconfiguration
         */
        readonly vpcConfiguration?: CfnDataSource.DataSourceVpcConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SharePointConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `SharePointConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_SharePointConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('crawlAttachments', cdk.validateBoolean)(properties.crawlAttachments));
    errors.collect(cdk.propertyValidator('disableLocalGroups', cdk.validateBoolean)(properties.disableLocalGroups));
    errors.collect(cdk.propertyValidator('documentTitleFieldName', cdk.validateString)(properties.documentTitleFieldName));
    errors.collect(cdk.propertyValidator('exclusionPatterns', cdk.listValidator(cdk.validateString))(properties.exclusionPatterns));
    errors.collect(cdk.propertyValidator('fieldMappings', cdk.listValidator(CfnDataSource_DataSourceToIndexFieldMappingPropertyValidator))(properties.fieldMappings));
    errors.collect(cdk.propertyValidator('inclusionPatterns', cdk.listValidator(cdk.validateString))(properties.inclusionPatterns));
    errors.collect(cdk.propertyValidator('secretArn', cdk.requiredValidator)(properties.secretArn));
    errors.collect(cdk.propertyValidator('secretArn', cdk.validateString)(properties.secretArn));
    errors.collect(cdk.propertyValidator('sharePointVersion', cdk.requiredValidator)(properties.sharePointVersion));
    errors.collect(cdk.propertyValidator('sharePointVersion', cdk.validateString)(properties.sharePointVersion));
    errors.collect(cdk.propertyValidator('sslCertificateS3Path', CfnDataSource_S3PathPropertyValidator)(properties.sslCertificateS3Path));
    errors.collect(cdk.propertyValidator('urls', cdk.requiredValidator)(properties.urls));
    errors.collect(cdk.propertyValidator('urls', cdk.listValidator(cdk.validateString))(properties.urls));
    errors.collect(cdk.propertyValidator('useChangeLog', cdk.validateBoolean)(properties.useChangeLog));
    errors.collect(cdk.propertyValidator('vpcConfiguration', CfnDataSource_DataSourceVpcConfigurationPropertyValidator)(properties.vpcConfiguration));
    return errors.wrap('supplied properties not correct for "SharePointConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SharePointConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `SharePointConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SharePointConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceSharePointConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_SharePointConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CrawlAttachments: cdk.booleanToCloudFormation(properties.crawlAttachments),
        DisableLocalGroups: cdk.booleanToCloudFormation(properties.disableLocalGroups),
        DocumentTitleFieldName: cdk.stringToCloudFormation(properties.documentTitleFieldName),
        ExclusionPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.exclusionPatterns),
        FieldMappings: cdk.listMapper(cfnDataSourceDataSourceToIndexFieldMappingPropertyToCloudFormation)(properties.fieldMappings),
        InclusionPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.inclusionPatterns),
        SecretArn: cdk.stringToCloudFormation(properties.secretArn),
        SharePointVersion: cdk.stringToCloudFormation(properties.sharePointVersion),
        SslCertificateS3Path: cfnDataSourceS3PathPropertyToCloudFormation(properties.sslCertificateS3Path),
        Urls: cdk.listMapper(cdk.stringToCloudFormation)(properties.urls),
        UseChangeLog: cdk.booleanToCloudFormation(properties.useChangeLog),
        VpcConfiguration: cfnDataSourceDataSourceVpcConfigurationPropertyToCloudFormation(properties.vpcConfiguration),
    };
}

// @ts-ignore TS6133
function CfnDataSourceSharePointConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.SharePointConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.SharePointConfigurationProperty>();
    ret.addPropertyResult('crawlAttachments', 'CrawlAttachments', properties.CrawlAttachments != null ? cfn_parse.FromCloudFormation.getBoolean(properties.CrawlAttachments) : undefined);
    ret.addPropertyResult('disableLocalGroups', 'DisableLocalGroups', properties.DisableLocalGroups != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DisableLocalGroups) : undefined);
    ret.addPropertyResult('documentTitleFieldName', 'DocumentTitleFieldName', properties.DocumentTitleFieldName != null ? cfn_parse.FromCloudFormation.getString(properties.DocumentTitleFieldName) : undefined);
    ret.addPropertyResult('exclusionPatterns', 'ExclusionPatterns', properties.ExclusionPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExclusionPatterns) : undefined);
    ret.addPropertyResult('fieldMappings', 'FieldMappings', properties.FieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceDataSourceToIndexFieldMappingPropertyFromCloudFormation)(properties.FieldMappings) : undefined);
    ret.addPropertyResult('inclusionPatterns', 'InclusionPatterns', properties.InclusionPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.InclusionPatterns) : undefined);
    ret.addPropertyResult('secretArn', 'SecretArn', cfn_parse.FromCloudFormation.getString(properties.SecretArn));
    ret.addPropertyResult('sharePointVersion', 'SharePointVersion', cfn_parse.FromCloudFormation.getString(properties.SharePointVersion));
    ret.addPropertyResult('sslCertificateS3Path', 'SslCertificateS3Path', properties.SslCertificateS3Path != null ? CfnDataSourceS3PathPropertyFromCloudFormation(properties.SslCertificateS3Path) : undefined);
    ret.addPropertyResult('urls', 'Urls', cfn_parse.FromCloudFormation.getStringArray(properties.Urls));
    ret.addPropertyResult('useChangeLog', 'UseChangeLog', properties.UseChangeLog != null ? cfn_parse.FromCloudFormation.getBoolean(properties.UseChangeLog) : undefined);
    ret.addPropertyResult('vpcConfiguration', 'VpcConfiguration', properties.VpcConfiguration != null ? CfnDataSourceDataSourceVpcConfigurationPropertyFromCloudFormation(properties.VpcConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides information that configures Amazon Kendra to use a SQL database.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sqlconfiguration.html
     */
    export interface SqlConfigurationProperty {
        /**
         * Determines whether Amazon Kendra encloses SQL identifiers for tables and column names in double quotes (") when making a database query. You can set the value to `DOUBLE_QUOTES` or `NONE` .
         *
         * By default, Amazon Kendra passes SQL identifiers the way that they are entered into the data source configuration. It does not change the case of identifiers or enclose them in quotes.
         *
         * PostgreSQL internally converts uppercase characters to lower case characters in identifiers unless they are quoted. Choosing this option encloses identifiers in quotes so that PostgreSQL does not convert the character's case.
         *
         * For MySQL databases, you must enable the ansi_quotes option when you set this field to `DOUBLE_QUOTES` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-sqlconfiguration.html#cfn-kendra-datasource-sqlconfiguration-queryidentifiersenclosingoption
         */
        readonly queryIdentifiersEnclosingOption?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SqlConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `SqlConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_SqlConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('queryIdentifiersEnclosingOption', cdk.validateString)(properties.queryIdentifiersEnclosingOption));
    return errors.wrap('supplied properties not correct for "SqlConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SqlConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `SqlConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.SqlConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceSqlConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_SqlConfigurationPropertyValidator(properties).assertSuccess();
    return {
        QueryIdentifiersEnclosingOption: cdk.stringToCloudFormation(properties.queryIdentifiersEnclosingOption),
    };
}

// @ts-ignore TS6133
function CfnDataSourceSqlConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.SqlConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.SqlConfigurationProperty>();
    ret.addPropertyResult('queryIdentifiersEnclosingOption', 'QueryIdentifiersEnclosingOption', properties.QueryIdentifiersEnclosingOption != null ? cfn_parse.FromCloudFormation.getString(properties.QueryIdentifiersEnclosingOption) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information to connect to websites that require user authentication.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerauthenticationconfiguration.html
     */
    export interface WebCrawlerAuthenticationConfigurationProperty {
        /**
         * The list of configuration information that's required to connect to and crawl a website host using basic authentication credentials.
         *
         * The list includes the name and port number of the website host.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerauthenticationconfiguration.html#cfn-kendra-datasource-webcrawlerauthenticationconfiguration-basicauthentication
         */
        readonly basicAuthentication?: Array<CfnDataSource.WebCrawlerBasicAuthenticationProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `WebCrawlerAuthenticationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `WebCrawlerAuthenticationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_WebCrawlerAuthenticationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('basicAuthentication', cdk.listValidator(CfnDataSource_WebCrawlerBasicAuthenticationPropertyValidator))(properties.basicAuthentication));
    return errors.wrap('supplied properties not correct for "WebCrawlerAuthenticationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.WebCrawlerAuthenticationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `WebCrawlerAuthenticationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.WebCrawlerAuthenticationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceWebCrawlerAuthenticationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_WebCrawlerAuthenticationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        BasicAuthentication: cdk.listMapper(cfnDataSourceWebCrawlerBasicAuthenticationPropertyToCloudFormation)(properties.basicAuthentication),
    };
}

// @ts-ignore TS6133
function CfnDataSourceWebCrawlerAuthenticationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.WebCrawlerAuthenticationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.WebCrawlerAuthenticationConfigurationProperty>();
    ret.addPropertyResult('basicAuthentication', 'BasicAuthentication', properties.BasicAuthentication != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceWebCrawlerBasicAuthenticationPropertyFromCloudFormation)(properties.BasicAuthentication) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information to connect to websites that require basic user authentication.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerbasicauthentication.html
     */
    export interface WebCrawlerBasicAuthenticationProperty {
        /**
         * Your secret ARN, which you can create in [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html)
         *
         * You use a secret if basic authentication credentials are required to connect to a website. The secret stores your credentials of user name and password.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerbasicauthentication.html#cfn-kendra-datasource-webcrawlerbasicauthentication-credentials
         */
        readonly credentials: string;
        /**
         * The name of the website host you want to connect to using authentication credentials.
         *
         * For example, the host name of https://a.example.com/page1.html is "a.example.com".
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerbasicauthentication.html#cfn-kendra-datasource-webcrawlerbasicauthentication-host
         */
        readonly host: string;
        /**
         * The port number of the website host you want to connect to using authentication credentials.
         *
         * For example, the port for https://a.example.com/page1.html is 443, the standard port for HTTPS.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerbasicauthentication.html#cfn-kendra-datasource-webcrawlerbasicauthentication-port
         */
        readonly port: number;
    }
}

/**
 * Determine whether the given properties match those of a `WebCrawlerBasicAuthenticationProperty`
 *
 * @param properties - the TypeScript properties of a `WebCrawlerBasicAuthenticationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_WebCrawlerBasicAuthenticationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('credentials', cdk.requiredValidator)(properties.credentials));
    errors.collect(cdk.propertyValidator('credentials', cdk.validateString)(properties.credentials));
    errors.collect(cdk.propertyValidator('host', cdk.requiredValidator)(properties.host));
    errors.collect(cdk.propertyValidator('host', cdk.validateString)(properties.host));
    errors.collect(cdk.propertyValidator('port', cdk.requiredValidator)(properties.port));
    errors.collect(cdk.propertyValidator('port', cdk.validateNumber)(properties.port));
    return errors.wrap('supplied properties not correct for "WebCrawlerBasicAuthenticationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.WebCrawlerBasicAuthentication` resource
 *
 * @param properties - the TypeScript properties of a `WebCrawlerBasicAuthenticationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.WebCrawlerBasicAuthentication` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceWebCrawlerBasicAuthenticationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_WebCrawlerBasicAuthenticationPropertyValidator(properties).assertSuccess();
    return {
        Credentials: cdk.stringToCloudFormation(properties.credentials),
        Host: cdk.stringToCloudFormation(properties.host),
        Port: cdk.numberToCloudFormation(properties.port),
    };
}

// @ts-ignore TS6133
function CfnDataSourceWebCrawlerBasicAuthenticationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.WebCrawlerBasicAuthenticationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.WebCrawlerBasicAuthenticationProperty>();
    ret.addPropertyResult('credentials', 'Credentials', cfn_parse.FromCloudFormation.getString(properties.Credentials));
    ret.addPropertyResult('host', 'Host', cfn_parse.FromCloudFormation.getString(properties.Host));
    ret.addPropertyResult('port', 'Port', cfn_parse.FromCloudFormation.getNumber(properties.Port));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information required for Amazon Kendra Web Crawler.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerconfiguration.html
     */
    export interface WebCrawlerConfigurationProperty {
        /**
         * Configuration information required to connect to websites using authentication.
         *
         * You can connect to websites using basic authentication of user name and password.
         *
         * You must provide the website host name and port number. For example, the host name of https://a.example.com/page1.html is "a.example.com" and the port is 443, the standard port for HTTPS. You use a secret in [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) to store your authentication credentials.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerconfiguration.html#cfn-kendra-datasource-webcrawlerconfiguration-authenticationconfiguration
         */
        readonly authenticationConfiguration?: CfnDataSource.WebCrawlerAuthenticationConfigurationProperty | cdk.IResolvable;
        /**
         * Specifies the number of levels in a website that you want to crawl.
         *
         * The first level begins from the website seed or starting point URL. For example, if a website has 3 levels – index level (i.e. seed in this example), sections level, and subsections level – and you are only interested in crawling information up to the sections level (i.e. levels 0-1), you can set your depth to 1.
         *
         * The default crawl depth is set to 2.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerconfiguration.html#cfn-kendra-datasource-webcrawlerconfiguration-crawldepth
         */
        readonly crawlDepth?: number;
        /**
         * The maximum size (in MB) of a webpage or attachment to crawl.
         *
         * Files larger than this size (in MB) are skipped/not crawled.
         *
         * The default maximum size of a webpage or attachment is set to 50 MB.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerconfiguration.html#cfn-kendra-datasource-webcrawlerconfiguration-maxcontentsizeperpageinmegabytes
         */
        readonly maxContentSizePerPageInMegaBytes?: number;
        /**
         * The maximum number of URLs on a webpage to include when crawling a website. This number is per webpage.
         *
         * As a website’s webpages are crawled, any URLs the webpages link to are also crawled. URLs on a webpage are crawled in order of appearance.
         *
         * The default maximum links per page is 100.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerconfiguration.html#cfn-kendra-datasource-webcrawlerconfiguration-maxlinksperpage
         */
        readonly maxLinksPerPage?: number;
        /**
         * The maximum number of URLs crawled per website host per minute.
         *
         * A minimum of one URL is required.
         *
         * The default maximum number of URLs crawled per website host per minute is 300.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerconfiguration.html#cfn-kendra-datasource-webcrawlerconfiguration-maxurlsperminutecrawlrate
         */
        readonly maxUrlsPerMinuteCrawlRate?: number;
        /**
         * Configuration information required to connect to your internal websites via a web proxy.
         *
         * You must provide the website host name and port number. For example, the host name of https://a.example.com/page1.html is "a.example.com" and the port is 443, the standard port for HTTPS.
         *
         * Web proxy credentials are optional and you can use them to connect to a web proxy server that requires basic authentication. To store web proxy credentials, you use a secret in [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerconfiguration.html#cfn-kendra-datasource-webcrawlerconfiguration-proxyconfiguration
         */
        readonly proxyConfiguration?: CfnDataSource.ProxyConfigurationProperty | cdk.IResolvable;
        /**
         * A list of regular expression patterns to exclude certain URLs to crawl. URLs that match the patterns are excluded from the index. URLs that don't match the patterns are included in the index. If a URL matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the URL file isn't included in the index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerconfiguration.html#cfn-kendra-datasource-webcrawlerconfiguration-urlexclusionpatterns
         */
        readonly urlExclusionPatterns?: string[];
        /**
         * A list of regular expression patterns to include certain URLs to crawl. URLs that match the patterns are included in the index. URLs that don't match the patterns are excluded from the index. If a URL matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the URL file isn't included in the index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerconfiguration.html#cfn-kendra-datasource-webcrawlerconfiguration-urlinclusionpatterns
         */
        readonly urlInclusionPatterns?: string[];
        /**
         * Specifies the seed or starting point URLs of the websites or the sitemap URLs of the websites you want to crawl.
         *
         * You can include website subdomains. You can list up to 100 seed URLs and up to three sitemap URLs.
         *
         * You can only crawl websites that use the secure communication protocol, Hypertext Transfer Protocol Secure (HTTPS). If you receive an error when crawling a website, it could be that the website is blocked from crawling.
         *
         * *When selecting websites to index, you must adhere to the [Amazon Acceptable Use Policy](https://docs.aws.amazon.com/aup/) and all other Amazon terms. Remember that you must only use Amazon Kendra Web Crawler to index your own webpages, or webpages that you have authorization to index.*
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerconfiguration.html#cfn-kendra-datasource-webcrawlerconfiguration-urls
         */
        readonly urls: CfnDataSource.WebCrawlerUrlsProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `WebCrawlerConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `WebCrawlerConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_WebCrawlerConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('authenticationConfiguration', CfnDataSource_WebCrawlerAuthenticationConfigurationPropertyValidator)(properties.authenticationConfiguration));
    errors.collect(cdk.propertyValidator('crawlDepth', cdk.validateNumber)(properties.crawlDepth));
    errors.collect(cdk.propertyValidator('maxContentSizePerPageInMegaBytes', cdk.validateNumber)(properties.maxContentSizePerPageInMegaBytes));
    errors.collect(cdk.propertyValidator('maxLinksPerPage', cdk.validateNumber)(properties.maxLinksPerPage));
    errors.collect(cdk.propertyValidator('maxUrlsPerMinuteCrawlRate', cdk.validateNumber)(properties.maxUrlsPerMinuteCrawlRate));
    errors.collect(cdk.propertyValidator('proxyConfiguration', CfnDataSource_ProxyConfigurationPropertyValidator)(properties.proxyConfiguration));
    errors.collect(cdk.propertyValidator('urlExclusionPatterns', cdk.listValidator(cdk.validateString))(properties.urlExclusionPatterns));
    errors.collect(cdk.propertyValidator('urlInclusionPatterns', cdk.listValidator(cdk.validateString))(properties.urlInclusionPatterns));
    errors.collect(cdk.propertyValidator('urls', cdk.requiredValidator)(properties.urls));
    errors.collect(cdk.propertyValidator('urls', CfnDataSource_WebCrawlerUrlsPropertyValidator)(properties.urls));
    return errors.wrap('supplied properties not correct for "WebCrawlerConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.WebCrawlerConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `WebCrawlerConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.WebCrawlerConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceWebCrawlerConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_WebCrawlerConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AuthenticationConfiguration: cfnDataSourceWebCrawlerAuthenticationConfigurationPropertyToCloudFormation(properties.authenticationConfiguration),
        CrawlDepth: cdk.numberToCloudFormation(properties.crawlDepth),
        MaxContentSizePerPageInMegaBytes: cdk.numberToCloudFormation(properties.maxContentSizePerPageInMegaBytes),
        MaxLinksPerPage: cdk.numberToCloudFormation(properties.maxLinksPerPage),
        MaxUrlsPerMinuteCrawlRate: cdk.numberToCloudFormation(properties.maxUrlsPerMinuteCrawlRate),
        ProxyConfiguration: cfnDataSourceProxyConfigurationPropertyToCloudFormation(properties.proxyConfiguration),
        UrlExclusionPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.urlExclusionPatterns),
        UrlInclusionPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.urlInclusionPatterns),
        Urls: cfnDataSourceWebCrawlerUrlsPropertyToCloudFormation(properties.urls),
    };
}

// @ts-ignore TS6133
function CfnDataSourceWebCrawlerConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.WebCrawlerConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.WebCrawlerConfigurationProperty>();
    ret.addPropertyResult('authenticationConfiguration', 'AuthenticationConfiguration', properties.AuthenticationConfiguration != null ? CfnDataSourceWebCrawlerAuthenticationConfigurationPropertyFromCloudFormation(properties.AuthenticationConfiguration) : undefined);
    ret.addPropertyResult('crawlDepth', 'CrawlDepth', properties.CrawlDepth != null ? cfn_parse.FromCloudFormation.getNumber(properties.CrawlDepth) : undefined);
    ret.addPropertyResult('maxContentSizePerPageInMegaBytes', 'MaxContentSizePerPageInMegaBytes', properties.MaxContentSizePerPageInMegaBytes != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxContentSizePerPageInMegaBytes) : undefined);
    ret.addPropertyResult('maxLinksPerPage', 'MaxLinksPerPage', properties.MaxLinksPerPage != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxLinksPerPage) : undefined);
    ret.addPropertyResult('maxUrlsPerMinuteCrawlRate', 'MaxUrlsPerMinuteCrawlRate', properties.MaxUrlsPerMinuteCrawlRate != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxUrlsPerMinuteCrawlRate) : undefined);
    ret.addPropertyResult('proxyConfiguration', 'ProxyConfiguration', properties.ProxyConfiguration != null ? CfnDataSourceProxyConfigurationPropertyFromCloudFormation(properties.ProxyConfiguration) : undefined);
    ret.addPropertyResult('urlExclusionPatterns', 'UrlExclusionPatterns', properties.UrlExclusionPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.UrlExclusionPatterns) : undefined);
    ret.addPropertyResult('urlInclusionPatterns', 'UrlInclusionPatterns', properties.UrlInclusionPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.UrlInclusionPatterns) : undefined);
    ret.addPropertyResult('urls', 'Urls', CfnDataSourceWebCrawlerUrlsPropertyFromCloudFormation(properties.Urls));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information of the seed or starting point URLs to crawl.
     *
     * *When selecting websites to index, you must adhere to the [Amazon Acceptable Use Policy](https://docs.aws.amazon.com/aup/) and all other Amazon terms. Remember that you must only use the Amazon Kendra web crawler to index your own webpages, or webpages that you have authorization to index.*
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerseedurlconfiguration.html
     */
    export interface WebCrawlerSeedUrlConfigurationProperty {
        /**
         * The list of seed or starting point URLs of the websites you want to crawl.
         *
         * The list can include a maximum of 100 seed URLs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerseedurlconfiguration.html#cfn-kendra-datasource-webcrawlerseedurlconfiguration-seedurls
         */
        readonly seedUrls: string[];
        /**
         * You can choose one of the following modes:
         *
         * - `HOST_ONLY` – crawl only the website host names. For example, if the seed URL is "abc.example.com", then only URLs with host name "abc.example.com" are crawled.
         * - `SUBDOMAINS` – crawl the website host names with subdomains. For example, if the seed URL is "abc.example.com", then "a.abc.example.com" and "b.abc.example.com" are also crawled.
         * - `EVERYTHING` – crawl the website host names with subdomains and other domains that the webpages link to.
         *
         * The default mode is set to `HOST_ONLY` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerseedurlconfiguration.html#cfn-kendra-datasource-webcrawlerseedurlconfiguration-webcrawlermode
         */
        readonly webCrawlerMode?: string;
    }
}

/**
 * Determine whether the given properties match those of a `WebCrawlerSeedUrlConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `WebCrawlerSeedUrlConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_WebCrawlerSeedUrlConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('seedUrls', cdk.requiredValidator)(properties.seedUrls));
    errors.collect(cdk.propertyValidator('seedUrls', cdk.listValidator(cdk.validateString))(properties.seedUrls));
    errors.collect(cdk.propertyValidator('webCrawlerMode', cdk.validateString)(properties.webCrawlerMode));
    return errors.wrap('supplied properties not correct for "WebCrawlerSeedUrlConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.WebCrawlerSeedUrlConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `WebCrawlerSeedUrlConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.WebCrawlerSeedUrlConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceWebCrawlerSeedUrlConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_WebCrawlerSeedUrlConfigurationPropertyValidator(properties).assertSuccess();
    return {
        SeedUrls: cdk.listMapper(cdk.stringToCloudFormation)(properties.seedUrls),
        WebCrawlerMode: cdk.stringToCloudFormation(properties.webCrawlerMode),
    };
}

// @ts-ignore TS6133
function CfnDataSourceWebCrawlerSeedUrlConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.WebCrawlerSeedUrlConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.WebCrawlerSeedUrlConfigurationProperty>();
    ret.addPropertyResult('seedUrls', 'SeedUrls', cfn_parse.FromCloudFormation.getStringArray(properties.SeedUrls));
    ret.addPropertyResult('webCrawlerMode', 'WebCrawlerMode', properties.WebCrawlerMode != null ? cfn_parse.FromCloudFormation.getString(properties.WebCrawlerMode) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information of the sitemap URLs to crawl.
     *
     * *When selecting websites to index, you must adhere to the [Amazon Acceptable Use Policy](https://docs.aws.amazon.com/aup/) and all other Amazon terms. Remember that you must only use the Amazon Kendra web crawler to index your own webpages, or webpages that you have authorization to index.*
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlersitemapsconfiguration.html
     */
    export interface WebCrawlerSiteMapsConfigurationProperty {
        /**
         * The list of sitemap URLs of the websites you want to crawl.
         *
         * The list can include a maximum of three sitemap URLs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlersitemapsconfiguration.html#cfn-kendra-datasource-webcrawlersitemapsconfiguration-sitemaps
         */
        readonly siteMaps: string[];
    }
}

/**
 * Determine whether the given properties match those of a `WebCrawlerSiteMapsConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `WebCrawlerSiteMapsConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_WebCrawlerSiteMapsConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('siteMaps', cdk.requiredValidator)(properties.siteMaps));
    errors.collect(cdk.propertyValidator('siteMaps', cdk.listValidator(cdk.validateString))(properties.siteMaps));
    return errors.wrap('supplied properties not correct for "WebCrawlerSiteMapsConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.WebCrawlerSiteMapsConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `WebCrawlerSiteMapsConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.WebCrawlerSiteMapsConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceWebCrawlerSiteMapsConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_WebCrawlerSiteMapsConfigurationPropertyValidator(properties).assertSuccess();
    return {
        SiteMaps: cdk.listMapper(cdk.stringToCloudFormation)(properties.siteMaps),
    };
}

// @ts-ignore TS6133
function CfnDataSourceWebCrawlerSiteMapsConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.WebCrawlerSiteMapsConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.WebCrawlerSiteMapsConfigurationProperty>();
    ret.addPropertyResult('siteMaps', 'SiteMaps', cfn_parse.FromCloudFormation.getStringArray(properties.SiteMaps));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Specifies the seed or starting point URLs of the websites or the sitemap URLs of the websites you want to crawl.
     *
     * You can include website subdomains. You can list up to 100 seed URLs and up to three sitemap URLs.
     *
     * You can only crawl websites that use the secure communication protocol, Hypertext Transfer Protocol Secure (HTTPS). If you receive an error when crawling a website, it could be that the website is blocked from crawling.
     *
     * *When selecting websites to index, you must adhere to the [Amazon Acceptable Use Policy](https://docs.aws.amazon.com/aup/) and all other Amazon terms. Remember that you must only use the Amazon Kendra web crawler to index your own webpages, or webpages that you have authorization to index.*
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerurls.html
     */
    export interface WebCrawlerUrlsProperty {
        /**
         * Configuration of the seed or starting point URLs of the websites you want to crawl.
         *
         * You can choose to crawl only the website host names, or the website host names with subdomains, or the website host names with subdomains and other domains that the webpages link to.
         *
         * You can list up to 100 seed URLs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerurls.html#cfn-kendra-datasource-webcrawlerurls-seedurlconfiguration
         */
        readonly seedUrlConfiguration?: CfnDataSource.WebCrawlerSeedUrlConfigurationProperty | cdk.IResolvable;
        /**
         * Configuration of the sitemap URLs of the websites you want to crawl.
         *
         * Only URLs belonging to the same website host names are crawled. You can list up to three sitemap URLs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-webcrawlerurls.html#cfn-kendra-datasource-webcrawlerurls-sitemapsconfiguration
         */
        readonly siteMapsConfiguration?: CfnDataSource.WebCrawlerSiteMapsConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `WebCrawlerUrlsProperty`
 *
 * @param properties - the TypeScript properties of a `WebCrawlerUrlsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_WebCrawlerUrlsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('seedUrlConfiguration', CfnDataSource_WebCrawlerSeedUrlConfigurationPropertyValidator)(properties.seedUrlConfiguration));
    errors.collect(cdk.propertyValidator('siteMapsConfiguration', CfnDataSource_WebCrawlerSiteMapsConfigurationPropertyValidator)(properties.siteMapsConfiguration));
    return errors.wrap('supplied properties not correct for "WebCrawlerUrlsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.WebCrawlerUrls` resource
 *
 * @param properties - the TypeScript properties of a `WebCrawlerUrlsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.WebCrawlerUrls` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceWebCrawlerUrlsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_WebCrawlerUrlsPropertyValidator(properties).assertSuccess();
    return {
        SeedUrlConfiguration: cfnDataSourceWebCrawlerSeedUrlConfigurationPropertyToCloudFormation(properties.seedUrlConfiguration),
        SiteMapsConfiguration: cfnDataSourceWebCrawlerSiteMapsConfigurationPropertyToCloudFormation(properties.siteMapsConfiguration),
    };
}

// @ts-ignore TS6133
function CfnDataSourceWebCrawlerUrlsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.WebCrawlerUrlsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.WebCrawlerUrlsProperty>();
    ret.addPropertyResult('seedUrlConfiguration', 'SeedUrlConfiguration', properties.SeedUrlConfiguration != null ? CfnDataSourceWebCrawlerSeedUrlConfigurationPropertyFromCloudFormation(properties.SeedUrlConfiguration) : undefined);
    ret.addPropertyResult('siteMapsConfiguration', 'SiteMapsConfiguration', properties.SiteMapsConfiguration != null ? CfnDataSourceWebCrawlerSiteMapsConfigurationPropertyFromCloudFormation(properties.SiteMapsConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataSource {
    /**
     * Provides the configuration information to connect to Amazon WorkDocs as your data source.
     *
     * Amazon WorkDocs connector is available in Oregon, North Virginia, Sydney, Singapore and Ireland regions.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-workdocsconfiguration.html
     */
    export interface WorkDocsConfigurationProperty {
        /**
         * `TRUE` to include comments on documents in your index. Including comments in your index means each comment is a document that can be searched on.
         *
         * The default is set to `FALSE` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-workdocsconfiguration.html#cfn-kendra-datasource-workdocsconfiguration-crawlcomments
         */
        readonly crawlComments?: boolean | cdk.IResolvable;
        /**
         * A list of regular expression patterns to exclude certain files in your Amazon WorkDocs site repository. Files that match the patterns are excluded from the index. Files that don’t match the patterns are included in the index. If a file matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the file isn't included in the index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-workdocsconfiguration.html#cfn-kendra-datasource-workdocsconfiguration-exclusionpatterns
         */
        readonly exclusionPatterns?: string[];
        /**
         * A list of `DataSourceToIndexFieldMapping` objects that map Amazon WorkDocs data source attributes or field names to Amazon Kendra index field names. To create custom fields, use the `UpdateIndex` API before you map to Amazon WorkDocs fields. For more information, see [Mapping data source fields](https://docs.aws.amazon.com/kendra/latest/dg/field-mapping.html) . The Amazon WorkDocs data source field names must exist in your Amazon WorkDocs custom metadata.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-workdocsconfiguration.html#cfn-kendra-datasource-workdocsconfiguration-fieldmappings
         */
        readonly fieldMappings?: Array<CfnDataSource.DataSourceToIndexFieldMappingProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * A list of regular expression patterns to include certain files in your Amazon WorkDocs site repository. Files that match the patterns are included in the index. Files that don't match the patterns are excluded from the index. If a file matches both an inclusion and exclusion pattern, the exclusion pattern takes precedence and the file isn't included in the index.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-workdocsconfiguration.html#cfn-kendra-datasource-workdocsconfiguration-inclusionpatterns
         */
        readonly inclusionPatterns?: string[];
        /**
         * The identifier of the directory corresponding to your Amazon WorkDocs site repository.
         *
         * You can find the organization ID in the [AWS Directory Service](https://docs.aws.amazon.com/directoryservicev2/) by going to *Active Directory* , then *Directories* . Your Amazon WorkDocs site directory has an ID, which is the organization ID. You can also set up a new Amazon WorkDocs directory in the AWS Directory Service console and enable a Amazon WorkDocs site for the directory in the Amazon WorkDocs console.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-workdocsconfiguration.html#cfn-kendra-datasource-workdocsconfiguration-organizationid
         */
        readonly organizationId: string;
        /**
         * `TRUE` to use the Amazon WorkDocs change log to determine which documents require updating in the index. Depending on the change log's size, it may take longer for Amazon Kendra to use the change log than to scan all of your documents in Amazon WorkDocs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-datasource-workdocsconfiguration.html#cfn-kendra-datasource-workdocsconfiguration-usechangelog
         */
        readonly useChangeLog?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `WorkDocsConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `WorkDocsConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataSource_WorkDocsConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('crawlComments', cdk.validateBoolean)(properties.crawlComments));
    errors.collect(cdk.propertyValidator('exclusionPatterns', cdk.listValidator(cdk.validateString))(properties.exclusionPatterns));
    errors.collect(cdk.propertyValidator('fieldMappings', cdk.listValidator(CfnDataSource_DataSourceToIndexFieldMappingPropertyValidator))(properties.fieldMappings));
    errors.collect(cdk.propertyValidator('inclusionPatterns', cdk.listValidator(cdk.validateString))(properties.inclusionPatterns));
    errors.collect(cdk.propertyValidator('organizationId', cdk.requiredValidator)(properties.organizationId));
    errors.collect(cdk.propertyValidator('organizationId', cdk.validateString)(properties.organizationId));
    errors.collect(cdk.propertyValidator('useChangeLog', cdk.validateBoolean)(properties.useChangeLog));
    return errors.wrap('supplied properties not correct for "WorkDocsConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::DataSource.WorkDocsConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `WorkDocsConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::DataSource.WorkDocsConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDataSourceWorkDocsConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataSource_WorkDocsConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CrawlComments: cdk.booleanToCloudFormation(properties.crawlComments),
        ExclusionPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.exclusionPatterns),
        FieldMappings: cdk.listMapper(cfnDataSourceDataSourceToIndexFieldMappingPropertyToCloudFormation)(properties.fieldMappings),
        InclusionPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.inclusionPatterns),
        OrganizationId: cdk.stringToCloudFormation(properties.organizationId),
        UseChangeLog: cdk.booleanToCloudFormation(properties.useChangeLog),
    };
}

// @ts-ignore TS6133
function CfnDataSourceWorkDocsConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataSource.WorkDocsConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataSource.WorkDocsConfigurationProperty>();
    ret.addPropertyResult('crawlComments', 'CrawlComments', properties.CrawlComments != null ? cfn_parse.FromCloudFormation.getBoolean(properties.CrawlComments) : undefined);
    ret.addPropertyResult('exclusionPatterns', 'ExclusionPatterns', properties.ExclusionPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExclusionPatterns) : undefined);
    ret.addPropertyResult('fieldMappings', 'FieldMappings', properties.FieldMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnDataSourceDataSourceToIndexFieldMappingPropertyFromCloudFormation)(properties.FieldMappings) : undefined);
    ret.addPropertyResult('inclusionPatterns', 'InclusionPatterns', properties.InclusionPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.InclusionPatterns) : undefined);
    ret.addPropertyResult('organizationId', 'OrganizationId', cfn_parse.FromCloudFormation.getString(properties.OrganizationId));
    ret.addPropertyResult('useChangeLog', 'UseChangeLog', properties.UseChangeLog != null ? cfn_parse.FromCloudFormation.getBoolean(properties.UseChangeLog) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnFaq`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html
 */
export interface CfnFaqProps {

    /**
     * The identifier of the index that contains the FAQ.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html#cfn-kendra-faq-indexid
     */
    readonly indexId: string;

    /**
     * The name that you assigned the FAQ when you created or updated the FAQ.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html#cfn-kendra-faq-name
     */
    readonly name: string;

    /**
     * The Amazon Resource Name (ARN) of a role with permission to access the S3 bucket that contains the FAQ.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html#cfn-kendra-faq-rolearn
     */
    readonly roleArn: string;

    /**
     * The Amazon Simple Storage Service (Amazon S3) location of the FAQ input data.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html#cfn-kendra-faq-s3path
     */
    readonly s3Path: CfnFaq.S3PathProperty | cdk.IResolvable;

    /**
     * A description of the FAQ.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html#cfn-kendra-faq-description
     */
    readonly description?: string;

    /**
     * The format of the input file. You can choose between a basic CSV format, a CSV format that includes customs attributes in a header, and a JSON format that includes custom attributes.
     *
     * The format must match the format of the file stored in the S3 bucket identified in the S3Path parameter.
     *
     * Valid values are:
     *
     * - `CSV`
     * - `CSV_WITH_HEADER`
     * - `JSON`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html#cfn-kendra-faq-fileformat
     */
    readonly fileFormat?: string;

    /**
     * An array of key-value pairs to apply to this resource
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html#cfn-kendra-faq-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnFaqProps`
 *
 * @param properties - the TypeScript properties of a `CfnFaqProps`
 *
 * @returns the result of the validation.
 */
function CfnFaqPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('fileFormat', cdk.validateString)(properties.fileFormat));
    errors.collect(cdk.propertyValidator('indexId', cdk.requiredValidator)(properties.indexId));
    errors.collect(cdk.propertyValidator('indexId', cdk.validateString)(properties.indexId));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('s3Path', cdk.requiredValidator)(properties.s3Path));
    errors.collect(cdk.propertyValidator('s3Path', CfnFaq_S3PathPropertyValidator)(properties.s3Path));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnFaqProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::Faq` resource
 *
 * @param properties - the TypeScript properties of a `CfnFaqProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::Faq` resource.
 */
// @ts-ignore TS6133
function cfnFaqPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFaqPropsValidator(properties).assertSuccess();
    return {
        IndexId: cdk.stringToCloudFormation(properties.indexId),
        Name: cdk.stringToCloudFormation(properties.name),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        S3Path: cfnFaqS3PathPropertyToCloudFormation(properties.s3Path),
        Description: cdk.stringToCloudFormation(properties.description),
        FileFormat: cdk.stringToCloudFormation(properties.fileFormat),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnFaqPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFaqProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFaqProps>();
    ret.addPropertyResult('indexId', 'IndexId', cfn_parse.FromCloudFormation.getString(properties.IndexId));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('s3Path', 'S3Path', CfnFaqS3PathPropertyFromCloudFormation(properties.S3Path));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('fileFormat', 'FileFormat', properties.FileFormat != null ? cfn_parse.FromCloudFormation.getString(properties.FileFormat) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Kendra::Faq`
 *
 * Specifies an new set of frequently asked question (FAQ) questions and answers.
 *
 * @cloudformationResource AWS::Kendra::Faq
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html
 */
export class CfnFaq extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Kendra::Faq";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnFaq {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnFaqPropsFromCloudFormation(resourceProperties);
        const ret = new CfnFaq(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * `arn:aws:kendra:us-west-2:111122223333:index/335c3741-41df-46a6-b5d3-61f85b787884/faq/f61995a6-cd5c-4e99-9cfc-58816d8bfaa7`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The identifier for the FAQ. For example:
     *
     * `f61995a6-cd5c-4e99-9cfc-58816d8bfaa7`
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The identifier of the index that contains the FAQ.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html#cfn-kendra-faq-indexid
     */
    public indexId: string;

    /**
     * The name that you assigned the FAQ when you created or updated the FAQ.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html#cfn-kendra-faq-name
     */
    public name: string;

    /**
     * The Amazon Resource Name (ARN) of a role with permission to access the S3 bucket that contains the FAQ.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html#cfn-kendra-faq-rolearn
     */
    public roleArn: string;

    /**
     * The Amazon Simple Storage Service (Amazon S3) location of the FAQ input data.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html#cfn-kendra-faq-s3path
     */
    public s3Path: CfnFaq.S3PathProperty | cdk.IResolvable;

    /**
     * A description of the FAQ.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html#cfn-kendra-faq-description
     */
    public description: string | undefined;

    /**
     * The format of the input file. You can choose between a basic CSV format, a CSV format that includes customs attributes in a header, and a JSON format that includes custom attributes.
     *
     * The format must match the format of the file stored in the S3 bucket identified in the S3Path parameter.
     *
     * Valid values are:
     *
     * - `CSV`
     * - `CSV_WITH_HEADER`
     * - `JSON`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html#cfn-kendra-faq-fileformat
     */
    public fileFormat: string | undefined;

    /**
     * An array of key-value pairs to apply to this resource
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-faq.html#cfn-kendra-faq-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Kendra::Faq`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnFaqProps) {
        super(scope, id, { type: CfnFaq.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'indexId', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'roleArn', this);
        cdk.requireProperty(props, 's3Path', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.indexId = props.indexId;
        this.name = props.name;
        this.roleArn = props.roleArn;
        this.s3Path = props.s3Path;
        this.description = props.description;
        this.fileFormat = props.fileFormat;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Kendra::Faq", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnFaq.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            indexId: this.indexId,
            name: this.name,
            roleArn: this.roleArn,
            s3Path: this.s3Path,
            description: this.description,
            fileFormat: this.fileFormat,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnFaqPropsToCloudFormation(props);
    }
}

export namespace CfnFaq {
    /**
     * Information required to find a specific file in an Amazon S3 bucket.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-faq-s3path.html
     */
    export interface S3PathProperty {
        /**
         * The name of the S3 bucket that contains the file.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-faq-s3path.html#cfn-kendra-faq-s3path-bucket
         */
        readonly bucket: string;
        /**
         * The name of the file.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-faq-s3path.html#cfn-kendra-faq-s3path-key
         */
        readonly key: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3PathProperty`
 *
 * @param properties - the TypeScript properties of a `S3PathProperty`
 *
 * @returns the result of the validation.
 */
function CfnFaq_S3PathPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucket', cdk.requiredValidator)(properties.bucket));
    errors.collect(cdk.propertyValidator('bucket', cdk.validateString)(properties.bucket));
    errors.collect(cdk.propertyValidator('key', cdk.requiredValidator)(properties.key));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    return errors.wrap('supplied properties not correct for "S3PathProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::Faq.S3Path` resource
 *
 * @param properties - the TypeScript properties of a `S3PathProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::Faq.S3Path` resource.
 */
// @ts-ignore TS6133
function cfnFaqS3PathPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFaq_S3PathPropertyValidator(properties).assertSuccess();
    return {
        Bucket: cdk.stringToCloudFormation(properties.bucket),
        Key: cdk.stringToCloudFormation(properties.key),
    };
}

// @ts-ignore TS6133
function CfnFaqS3PathPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFaq.S3PathProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFaq.S3PathProperty>();
    ret.addPropertyResult('bucket', 'Bucket', cfn_parse.FromCloudFormation.getString(properties.Bucket));
    ret.addPropertyResult('key', 'Key', cfn_parse.FromCloudFormation.getString(properties.Key));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnIndex`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html
 */
export interface CfnIndexProps {

    /**
     * Indicates whether the index is a enterprise edition index or a developer edition index. Valid values are `DEVELOPER_EDITION` and `ENTERPRISE_EDITION` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-edition
     */
    readonly edition: string;

    /**
     * The identifier of the index.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-name
     */
    readonly name: string;

    /**
     * An IAM role that gives Amazon Kendra permissions to access your Amazon CloudWatch logs and metrics. This is also the role used when you use the [BatchPutDocument](https://docs.aws.amazon.com/kendra/latest/dg/BatchPutDocument.html) operation to index documents from an Amazon S3 bucket.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-rolearn
     */
    readonly roleArn: string;

    /**
     * Specifies capacity units configured for your index. You can add and remove capacity units to tune an index to your requirements. You can set capacity units only for Enterprise edition indexes.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-capacityunits
     */
    readonly capacityUnits?: CfnIndex.CapacityUnitsConfigurationProperty | cdk.IResolvable;

    /**
     * A description of the index.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-description
     */
    readonly description?: string;

    /**
     * Specifies the properties of an index field. You can add either a custom or a built-in field. You can add and remove built-in fields at any time. When a built-in field is removed it's configuration reverts to the default for the field. Custom fields can't be removed from an index after they are added.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-documentmetadataconfigurations
     */
    readonly documentMetadataConfigurations?: Array<CfnIndex.DocumentMetadataConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The identifier of the AWS KMS customer managed key (CMK) to use to encrypt data indexed by Amazon Kendra. Amazon Kendra doesn't support asymmetric CMKs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-serversideencryptionconfiguration
     */
    readonly serverSideEncryptionConfiguration?: CfnIndex.ServerSideEncryptionConfigurationProperty | cdk.IResolvable;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The user context policy.
     *
     * ATTRIBUTE_FILTER
     *
     * - All indexed content is searchable and displayable for all users. If there is an access control list, it is ignored. You can filter on user and group attributes.
     *
     * USER_TOKEN
     *
     * - Enables SSO and token-based user access control. All documents with no access control and all documents accessible to the user will be searchable and displayable.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-usercontextpolicy
     */
    readonly userContextPolicy?: string;

    /**
     * Defines the type of user token used for the index.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-usertokenconfigurations
     */
    readonly userTokenConfigurations?: Array<CfnIndex.UserTokenConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnIndexProps`
 *
 * @param properties - the TypeScript properties of a `CfnIndexProps`
 *
 * @returns the result of the validation.
 */
function CfnIndexPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('capacityUnits', CfnIndex_CapacityUnitsConfigurationPropertyValidator)(properties.capacityUnits));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('documentMetadataConfigurations', cdk.listValidator(CfnIndex_DocumentMetadataConfigurationPropertyValidator))(properties.documentMetadataConfigurations));
    errors.collect(cdk.propertyValidator('edition', cdk.requiredValidator)(properties.edition));
    errors.collect(cdk.propertyValidator('edition', cdk.validateString)(properties.edition));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('serverSideEncryptionConfiguration', CfnIndex_ServerSideEncryptionConfigurationPropertyValidator)(properties.serverSideEncryptionConfiguration));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('userContextPolicy', cdk.validateString)(properties.userContextPolicy));
    errors.collect(cdk.propertyValidator('userTokenConfigurations', cdk.listValidator(CfnIndex_UserTokenConfigurationPropertyValidator))(properties.userTokenConfigurations));
    return errors.wrap('supplied properties not correct for "CfnIndexProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::Index` resource
 *
 * @param properties - the TypeScript properties of a `CfnIndexProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::Index` resource.
 */
// @ts-ignore TS6133
function cfnIndexPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIndexPropsValidator(properties).assertSuccess();
    return {
        Edition: cdk.stringToCloudFormation(properties.edition),
        Name: cdk.stringToCloudFormation(properties.name),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        CapacityUnits: cfnIndexCapacityUnitsConfigurationPropertyToCloudFormation(properties.capacityUnits),
        Description: cdk.stringToCloudFormation(properties.description),
        DocumentMetadataConfigurations: cdk.listMapper(cfnIndexDocumentMetadataConfigurationPropertyToCloudFormation)(properties.documentMetadataConfigurations),
        ServerSideEncryptionConfiguration: cfnIndexServerSideEncryptionConfigurationPropertyToCloudFormation(properties.serverSideEncryptionConfiguration),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        UserContextPolicy: cdk.stringToCloudFormation(properties.userContextPolicy),
        UserTokenConfigurations: cdk.listMapper(cfnIndexUserTokenConfigurationPropertyToCloudFormation)(properties.userTokenConfigurations),
    };
}

// @ts-ignore TS6133
function CfnIndexPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIndexProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIndexProps>();
    ret.addPropertyResult('edition', 'Edition', cfn_parse.FromCloudFormation.getString(properties.Edition));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('capacityUnits', 'CapacityUnits', properties.CapacityUnits != null ? CfnIndexCapacityUnitsConfigurationPropertyFromCloudFormation(properties.CapacityUnits) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('documentMetadataConfigurations', 'DocumentMetadataConfigurations', properties.DocumentMetadataConfigurations != null ? cfn_parse.FromCloudFormation.getArray(CfnIndexDocumentMetadataConfigurationPropertyFromCloudFormation)(properties.DocumentMetadataConfigurations) : undefined);
    ret.addPropertyResult('serverSideEncryptionConfiguration', 'ServerSideEncryptionConfiguration', properties.ServerSideEncryptionConfiguration != null ? CfnIndexServerSideEncryptionConfigurationPropertyFromCloudFormation(properties.ServerSideEncryptionConfiguration) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('userContextPolicy', 'UserContextPolicy', properties.UserContextPolicy != null ? cfn_parse.FromCloudFormation.getString(properties.UserContextPolicy) : undefined);
    ret.addPropertyResult('userTokenConfigurations', 'UserTokenConfigurations', properties.UserTokenConfigurations != null ? cfn_parse.FromCloudFormation.getArray(CfnIndexUserTokenConfigurationPropertyFromCloudFormation)(properties.UserTokenConfigurations) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Kendra::Index`
 *
 * Specifies a new Amazon Kendra index. And index is a collection of documents and associated metadata that you want to search for relevant documents.
 *
 * Once the index is active you can add documents to your index using the [BatchPutDocument](https://docs.aws.amazon.com/kendra/latest/dg/BatchPutDocument.html) operation or using one of the supported data sources.
 *
 * @cloudformationResource AWS::Kendra::Index
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html
 */
export class CfnIndex extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Kendra::Index";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnIndex {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnIndexPropsFromCloudFormation(resourceProperties);
        const ret = new CfnIndex(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the index. For example: `arn:aws:kendra:us-west-2:111122223333:index/0123456789abcdef` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The identifier for the index. For example: `f4aeaa10-8056-4b2c-a343-522ca0f41234` .
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * Indicates whether the index is a enterprise edition index or a developer edition index. Valid values are `DEVELOPER_EDITION` and `ENTERPRISE_EDITION` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-edition
     */
    public edition: string;

    /**
     * The identifier of the index.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-name
     */
    public name: string;

    /**
     * An IAM role that gives Amazon Kendra permissions to access your Amazon CloudWatch logs and metrics. This is also the role used when you use the [BatchPutDocument](https://docs.aws.amazon.com/kendra/latest/dg/BatchPutDocument.html) operation to index documents from an Amazon S3 bucket.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-rolearn
     */
    public roleArn: string;

    /**
     * Specifies capacity units configured for your index. You can add and remove capacity units to tune an index to your requirements. You can set capacity units only for Enterprise edition indexes.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-capacityunits
     */
    public capacityUnits: CfnIndex.CapacityUnitsConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * A description of the index.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-description
     */
    public description: string | undefined;

    /**
     * Specifies the properties of an index field. You can add either a custom or a built-in field. You can add and remove built-in fields at any time. When a built-in field is removed it's configuration reverts to the default for the field. Custom fields can't be removed from an index after they are added.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-documentmetadataconfigurations
     */
    public documentMetadataConfigurations: Array<CfnIndex.DocumentMetadataConfigurationProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The identifier of the AWS KMS customer managed key (CMK) to use to encrypt data indexed by Amazon Kendra. Amazon Kendra doesn't support asymmetric CMKs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-serversideencryptionconfiguration
     */
    public serverSideEncryptionConfiguration: CfnIndex.ServerSideEncryptionConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The user context policy.
     *
     * ATTRIBUTE_FILTER
     *
     * - All indexed content is searchable and displayable for all users. If there is an access control list, it is ignored. You can filter on user and group attributes.
     *
     * USER_TOKEN
     *
     * - Enables SSO and token-based user access control. All documents with no access control and all documents accessible to the user will be searchable and displayable.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-usercontextpolicy
     */
    public userContextPolicy: string | undefined;

    /**
     * Defines the type of user token used for the index.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html#cfn-kendra-index-usertokenconfigurations
     */
    public userTokenConfigurations: Array<CfnIndex.UserTokenConfigurationProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::Kendra::Index`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnIndexProps) {
        super(scope, id, { type: CfnIndex.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'edition', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'roleArn', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.edition = props.edition;
        this.name = props.name;
        this.roleArn = props.roleArn;
        this.capacityUnits = props.capacityUnits;
        this.description = props.description;
        this.documentMetadataConfigurations = props.documentMetadataConfigurations;
        this.serverSideEncryptionConfiguration = props.serverSideEncryptionConfiguration;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Kendra::Index", props.tags, { tagPropertyName: 'tags' });
        this.userContextPolicy = props.userContextPolicy;
        this.userTokenConfigurations = props.userTokenConfigurations;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnIndex.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            edition: this.edition,
            name: this.name,
            roleArn: this.roleArn,
            capacityUnits: this.capacityUnits,
            description: this.description,
            documentMetadataConfigurations: this.documentMetadataConfigurations,
            serverSideEncryptionConfiguration: this.serverSideEncryptionConfiguration,
            tags: this.tags.renderTags(),
            userContextPolicy: this.userContextPolicy,
            userTokenConfigurations: this.userTokenConfigurations,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnIndexPropsToCloudFormation(props);
    }
}

export namespace CfnIndex {
    /**
     * Specifies additional capacity units configured for your Enterprise Edition index. You can add and remove capacity units to fit your usage requirements.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-capacityunitsconfiguration.html
     */
    export interface CapacityUnitsConfigurationProperty {
        /**
         * The amount of extra query capacity for an index and [GetQuerySuggestions](https://docs.aws.amazon.com/kendra/latest/dg/API_GetQuerySuggestions.html) capacity.
         *
         * A single extra capacity unit for an index provides 0.1 queries per second or approximately 8,000 queries per day.
         *
         * `GetQuerySuggestions` capacity is five times the provisioned query capacity for an index, or the base capacity of 2.5 calls per second, whichever is higher. For example, the base capacity for an index is 0.1 queries per second, and `GetQuerySuggestions` capacity has a base of 2.5 calls per second. If you add another 0.1 queries per second to total 0.2 queries per second for an index, the `GetQuerySuggestions` capacity is 2.5 calls per second (higher than five times 0.2 queries per second).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-capacityunitsconfiguration.html#cfn-kendra-index-capacityunitsconfiguration-querycapacityunits
         */
        readonly queryCapacityUnits: number;
        /**
         * The amount of extra storage capacity for an index. A single capacity unit provides 30 GB of storage space or 100,000 documents, whichever is reached first.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-capacityunitsconfiguration.html#cfn-kendra-index-capacityunitsconfiguration-storagecapacityunits
         */
        readonly storageCapacityUnits: number;
    }
}

/**
 * Determine whether the given properties match those of a `CapacityUnitsConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `CapacityUnitsConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnIndex_CapacityUnitsConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('queryCapacityUnits', cdk.requiredValidator)(properties.queryCapacityUnits));
    errors.collect(cdk.propertyValidator('queryCapacityUnits', cdk.validateNumber)(properties.queryCapacityUnits));
    errors.collect(cdk.propertyValidator('storageCapacityUnits', cdk.requiredValidator)(properties.storageCapacityUnits));
    errors.collect(cdk.propertyValidator('storageCapacityUnits', cdk.validateNumber)(properties.storageCapacityUnits));
    return errors.wrap('supplied properties not correct for "CapacityUnitsConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::Index.CapacityUnitsConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CapacityUnitsConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::Index.CapacityUnitsConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnIndexCapacityUnitsConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIndex_CapacityUnitsConfigurationPropertyValidator(properties).assertSuccess();
    return {
        QueryCapacityUnits: cdk.numberToCloudFormation(properties.queryCapacityUnits),
        StorageCapacityUnits: cdk.numberToCloudFormation(properties.storageCapacityUnits),
    };
}

// @ts-ignore TS6133
function CfnIndexCapacityUnitsConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIndex.CapacityUnitsConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIndex.CapacityUnitsConfigurationProperty>();
    ret.addPropertyResult('queryCapacityUnits', 'QueryCapacityUnits', cfn_parse.FromCloudFormation.getNumber(properties.QueryCapacityUnits));
    ret.addPropertyResult('storageCapacityUnits', 'StorageCapacityUnits', cfn_parse.FromCloudFormation.getNumber(properties.StorageCapacityUnits));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnIndex {
    /**
     * Specifies the properties of a custom index field.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-documentmetadataconfiguration.html
     */
    export interface DocumentMetadataConfigurationProperty {
        /**
         * The name of the index field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-documentmetadataconfiguration.html#cfn-kendra-index-documentmetadataconfiguration-name
         */
        readonly name: string;
        /**
         * Provides manual tuning parameters to determine how the field affects the search results.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-documentmetadataconfiguration.html#cfn-kendra-index-documentmetadataconfiguration-relevance
         */
        readonly relevance?: CfnIndex.RelevanceProperty | cdk.IResolvable;
        /**
         * Provides information about how the field is used during a search.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-documentmetadataconfiguration.html#cfn-kendra-index-documentmetadataconfiguration-search
         */
        readonly search?: CfnIndex.SearchProperty | cdk.IResolvable;
        /**
         * The data type of the index field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-documentmetadataconfiguration.html#cfn-kendra-index-documentmetadataconfiguration-type
         */
        readonly type: string;
    }
}

/**
 * Determine whether the given properties match those of a `DocumentMetadataConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `DocumentMetadataConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnIndex_DocumentMetadataConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('relevance', CfnIndex_RelevancePropertyValidator)(properties.relevance));
    errors.collect(cdk.propertyValidator('search', CfnIndex_SearchPropertyValidator)(properties.search));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "DocumentMetadataConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::Index.DocumentMetadataConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `DocumentMetadataConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::Index.DocumentMetadataConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnIndexDocumentMetadataConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIndex_DocumentMetadataConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Relevance: cfnIndexRelevancePropertyToCloudFormation(properties.relevance),
        Search: cfnIndexSearchPropertyToCloudFormation(properties.search),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnIndexDocumentMetadataConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIndex.DocumentMetadataConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIndex.DocumentMetadataConfigurationProperty>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('relevance', 'Relevance', properties.Relevance != null ? CfnIndexRelevancePropertyFromCloudFormation(properties.Relevance) : undefined);
    ret.addPropertyResult('search', 'Search', properties.Search != null ? CfnIndexSearchPropertyFromCloudFormation(properties.Search) : undefined);
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnIndex {
    /**
     * Provides the configuration information for the JSON token type.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-jsontokentypeconfiguration.html
     */
    export interface JsonTokenTypeConfigurationProperty {
        /**
         * The group attribute field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-jsontokentypeconfiguration.html#cfn-kendra-index-jsontokentypeconfiguration-groupattributefield
         */
        readonly groupAttributeField: string;
        /**
         * The user name attribute field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-jsontokentypeconfiguration.html#cfn-kendra-index-jsontokentypeconfiguration-usernameattributefield
         */
        readonly userNameAttributeField: string;
    }
}

/**
 * Determine whether the given properties match those of a `JsonTokenTypeConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `JsonTokenTypeConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnIndex_JsonTokenTypeConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('groupAttributeField', cdk.requiredValidator)(properties.groupAttributeField));
    errors.collect(cdk.propertyValidator('groupAttributeField', cdk.validateString)(properties.groupAttributeField));
    errors.collect(cdk.propertyValidator('userNameAttributeField', cdk.requiredValidator)(properties.userNameAttributeField));
    errors.collect(cdk.propertyValidator('userNameAttributeField', cdk.validateString)(properties.userNameAttributeField));
    return errors.wrap('supplied properties not correct for "JsonTokenTypeConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::Index.JsonTokenTypeConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `JsonTokenTypeConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::Index.JsonTokenTypeConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnIndexJsonTokenTypeConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIndex_JsonTokenTypeConfigurationPropertyValidator(properties).assertSuccess();
    return {
        GroupAttributeField: cdk.stringToCloudFormation(properties.groupAttributeField),
        UserNameAttributeField: cdk.stringToCloudFormation(properties.userNameAttributeField),
    };
}

// @ts-ignore TS6133
function CfnIndexJsonTokenTypeConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIndex.JsonTokenTypeConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIndex.JsonTokenTypeConfigurationProperty>();
    ret.addPropertyResult('groupAttributeField', 'GroupAttributeField', cfn_parse.FromCloudFormation.getString(properties.GroupAttributeField));
    ret.addPropertyResult('userNameAttributeField', 'UserNameAttributeField', cfn_parse.FromCloudFormation.getString(properties.UserNameAttributeField));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnIndex {
    /**
     * Provides the configuration information for the JWT token type.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-jwttokentypeconfiguration.html
     */
    export interface JwtTokenTypeConfigurationProperty {
        /**
         * The regular expression that identifies the claim.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-jwttokentypeconfiguration.html#cfn-kendra-index-jwttokentypeconfiguration-claimregex
         */
        readonly claimRegex?: string;
        /**
         * The group attribute field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-jwttokentypeconfiguration.html#cfn-kendra-index-jwttokentypeconfiguration-groupattributefield
         */
        readonly groupAttributeField?: string;
        /**
         * The issuer of the token.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-jwttokentypeconfiguration.html#cfn-kendra-index-jwttokentypeconfiguration-issuer
         */
        readonly issuer?: string;
        /**
         * The location of the key.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-jwttokentypeconfiguration.html#cfn-kendra-index-jwttokentypeconfiguration-keylocation
         */
        readonly keyLocation: string;
        /**
         * The Amazon Resource Name (arn) of the secret.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-jwttokentypeconfiguration.html#cfn-kendra-index-jwttokentypeconfiguration-secretmanagerarn
         */
        readonly secretManagerArn?: string;
        /**
         * The signing key URL.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-jwttokentypeconfiguration.html#cfn-kendra-index-jwttokentypeconfiguration-url
         */
        readonly url?: string;
        /**
         * The user name attribute field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-jwttokentypeconfiguration.html#cfn-kendra-index-jwttokentypeconfiguration-usernameattributefield
         */
        readonly userNameAttributeField?: string;
    }
}

/**
 * Determine whether the given properties match those of a `JwtTokenTypeConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `JwtTokenTypeConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnIndex_JwtTokenTypeConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('claimRegex', cdk.validateString)(properties.claimRegex));
    errors.collect(cdk.propertyValidator('groupAttributeField', cdk.validateString)(properties.groupAttributeField));
    errors.collect(cdk.propertyValidator('issuer', cdk.validateString)(properties.issuer));
    errors.collect(cdk.propertyValidator('keyLocation', cdk.requiredValidator)(properties.keyLocation));
    errors.collect(cdk.propertyValidator('keyLocation', cdk.validateString)(properties.keyLocation));
    errors.collect(cdk.propertyValidator('secretManagerArn', cdk.validateString)(properties.secretManagerArn));
    errors.collect(cdk.propertyValidator('url', cdk.validateString)(properties.url));
    errors.collect(cdk.propertyValidator('userNameAttributeField', cdk.validateString)(properties.userNameAttributeField));
    return errors.wrap('supplied properties not correct for "JwtTokenTypeConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::Index.JwtTokenTypeConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `JwtTokenTypeConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::Index.JwtTokenTypeConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnIndexJwtTokenTypeConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIndex_JwtTokenTypeConfigurationPropertyValidator(properties).assertSuccess();
    return {
        ClaimRegex: cdk.stringToCloudFormation(properties.claimRegex),
        GroupAttributeField: cdk.stringToCloudFormation(properties.groupAttributeField),
        Issuer: cdk.stringToCloudFormation(properties.issuer),
        KeyLocation: cdk.stringToCloudFormation(properties.keyLocation),
        SecretManagerArn: cdk.stringToCloudFormation(properties.secretManagerArn),
        URL: cdk.stringToCloudFormation(properties.url),
        UserNameAttributeField: cdk.stringToCloudFormation(properties.userNameAttributeField),
    };
}

// @ts-ignore TS6133
function CfnIndexJwtTokenTypeConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIndex.JwtTokenTypeConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIndex.JwtTokenTypeConfigurationProperty>();
    ret.addPropertyResult('claimRegex', 'ClaimRegex', properties.ClaimRegex != null ? cfn_parse.FromCloudFormation.getString(properties.ClaimRegex) : undefined);
    ret.addPropertyResult('groupAttributeField', 'GroupAttributeField', properties.GroupAttributeField != null ? cfn_parse.FromCloudFormation.getString(properties.GroupAttributeField) : undefined);
    ret.addPropertyResult('issuer', 'Issuer', properties.Issuer != null ? cfn_parse.FromCloudFormation.getString(properties.Issuer) : undefined);
    ret.addPropertyResult('keyLocation', 'KeyLocation', cfn_parse.FromCloudFormation.getString(properties.KeyLocation));
    ret.addPropertyResult('secretManagerArn', 'SecretManagerArn', properties.SecretManagerArn != null ? cfn_parse.FromCloudFormation.getString(properties.SecretManagerArn) : undefined);
    ret.addPropertyResult('url', 'URL', properties.URL != null ? cfn_parse.FromCloudFormation.getString(properties.URL) : undefined);
    ret.addPropertyResult('userNameAttributeField', 'UserNameAttributeField', properties.UserNameAttributeField != null ? cfn_parse.FromCloudFormation.getString(properties.UserNameAttributeField) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnIndex {
    /**
     * Provides information for manually tuning the relevance of a field in a search. When a query includes terms that match the field, the results are given a boost in the response based on these tuning parameters.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-relevance.html
     */
    export interface RelevanceProperty {
        /**
         * Specifies the time period that the boost applies to. For example, to make the boost apply to documents with the field value within the last month, you would use "2628000s". Once the field value is beyond the specified range, the effect of the boost drops off. The higher the importance, the faster the effect drops off. If you don't specify a value, the default is 3 months. The value of the field is a numeric string followed by the character "s", for example "86400s" for one day, or "604800s" for one week.
         *
         * Only applies to `DATE` fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-relevance.html#cfn-kendra-index-relevance-duration
         */
        readonly duration?: string;
        /**
         * Indicates that this field determines how "fresh" a document is. For example, if document 1 was created on November 5, and document 2 was created on October 31, document 1 is "fresher" than document 2. You can only set the `Freshness` field on one `DATE` type field. Only applies to `DATE` fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-relevance.html#cfn-kendra-index-relevance-freshness
         */
        readonly freshness?: boolean | cdk.IResolvable;
        /**
         * The relative importance of the field in the search. Larger numbers provide more of a boost than smaller numbers.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-relevance.html#cfn-kendra-index-relevance-importance
         */
        readonly importance?: number;
        /**
         * Determines how values should be interpreted.
         *
         * When the `RankOrder` field is `ASCENDING` , higher numbers are better. For example, a document with a rating score of 10 is higher ranking than a document with a rating score of 1.
         *
         * When the `RankOrder` field is `DESCENDING` , lower numbers are better. For example, in a task tracking application, a priority 1 task is more important than a priority 5 task.
         *
         * Only applies to `LONG` and `DOUBLE` fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-relevance.html#cfn-kendra-index-relevance-rankorder
         */
        readonly rankOrder?: string;
        /**
         * An array of key-value pairs that contains an array of values that should be given a different boost when they appear in the search result list. For example, if you are boosting query terms that match the department field in the result, query terms that match the department field are boosted in the result. You can add entries from the department field to boost documents with those values higher.
         *
         * For example, you can add entries to the map with names of departments. If you add "HR", 5 and "Legal",3 those departments are given special attention when they appear in the metadata of a document.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-relevance.html#cfn-kendra-index-relevance-valueimportanceitems
         */
        readonly valueImportanceItems?: Array<CfnIndex.ValueImportanceItemProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `RelevanceProperty`
 *
 * @param properties - the TypeScript properties of a `RelevanceProperty`
 *
 * @returns the result of the validation.
 */
function CfnIndex_RelevancePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('duration', cdk.validateString)(properties.duration));
    errors.collect(cdk.propertyValidator('freshness', cdk.validateBoolean)(properties.freshness));
    errors.collect(cdk.propertyValidator('importance', cdk.validateNumber)(properties.importance));
    errors.collect(cdk.propertyValidator('rankOrder', cdk.validateString)(properties.rankOrder));
    errors.collect(cdk.propertyValidator('valueImportanceItems', cdk.listValidator(CfnIndex_ValueImportanceItemPropertyValidator))(properties.valueImportanceItems));
    return errors.wrap('supplied properties not correct for "RelevanceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::Index.Relevance` resource
 *
 * @param properties - the TypeScript properties of a `RelevanceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::Index.Relevance` resource.
 */
// @ts-ignore TS6133
function cfnIndexRelevancePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIndex_RelevancePropertyValidator(properties).assertSuccess();
    return {
        Duration: cdk.stringToCloudFormation(properties.duration),
        Freshness: cdk.booleanToCloudFormation(properties.freshness),
        Importance: cdk.numberToCloudFormation(properties.importance),
        RankOrder: cdk.stringToCloudFormation(properties.rankOrder),
        ValueImportanceItems: cdk.listMapper(cfnIndexValueImportanceItemPropertyToCloudFormation)(properties.valueImportanceItems),
    };
}

// @ts-ignore TS6133
function CfnIndexRelevancePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIndex.RelevanceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIndex.RelevanceProperty>();
    ret.addPropertyResult('duration', 'Duration', properties.Duration != null ? cfn_parse.FromCloudFormation.getString(properties.Duration) : undefined);
    ret.addPropertyResult('freshness', 'Freshness', properties.Freshness != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Freshness) : undefined);
    ret.addPropertyResult('importance', 'Importance', properties.Importance != null ? cfn_parse.FromCloudFormation.getNumber(properties.Importance) : undefined);
    ret.addPropertyResult('rankOrder', 'RankOrder', properties.RankOrder != null ? cfn_parse.FromCloudFormation.getString(properties.RankOrder) : undefined);
    ret.addPropertyResult('valueImportanceItems', 'ValueImportanceItems', properties.ValueImportanceItems != null ? cfn_parse.FromCloudFormation.getArray(CfnIndexValueImportanceItemPropertyFromCloudFormation)(properties.ValueImportanceItems) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnIndex {
    /**
     * Provides information about how a custom index field is used during a search.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-search.html
     */
    export interface SearchProperty {
        /**
         * Determines whether the field is returned in the query response. The default is `true` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-search.html#cfn-kendra-index-search-displayable
         */
        readonly displayable?: boolean | cdk.IResolvable;
        /**
         * Indicates that the field can be used to create search facets, a count of results for each value in the field. The default is `false` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-search.html#cfn-kendra-index-search-facetable
         */
        readonly facetable?: boolean | cdk.IResolvable;
        /**
         * Determines whether the field is used in the search. If the `Searchable` field is `true` , you can use relevance tuning to manually tune how Amazon Kendra weights the field in the search. The default is `true` for string fields and `false` for number and date fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-search.html#cfn-kendra-index-search-searchable
         */
        readonly searchable?: boolean | cdk.IResolvable;
        /**
         * Indicates that the field can be used to sort the search results. The default is `false` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-search.html#cfn-kendra-index-search-sortable
         */
        readonly sortable?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SearchProperty`
 *
 * @param properties - the TypeScript properties of a `SearchProperty`
 *
 * @returns the result of the validation.
 */
function CfnIndex_SearchPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('displayable', cdk.validateBoolean)(properties.displayable));
    errors.collect(cdk.propertyValidator('facetable', cdk.validateBoolean)(properties.facetable));
    errors.collect(cdk.propertyValidator('searchable', cdk.validateBoolean)(properties.searchable));
    errors.collect(cdk.propertyValidator('sortable', cdk.validateBoolean)(properties.sortable));
    return errors.wrap('supplied properties not correct for "SearchProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::Index.Search` resource
 *
 * @param properties - the TypeScript properties of a `SearchProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::Index.Search` resource.
 */
// @ts-ignore TS6133
function cfnIndexSearchPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIndex_SearchPropertyValidator(properties).assertSuccess();
    return {
        Displayable: cdk.booleanToCloudFormation(properties.displayable),
        Facetable: cdk.booleanToCloudFormation(properties.facetable),
        Searchable: cdk.booleanToCloudFormation(properties.searchable),
        Sortable: cdk.booleanToCloudFormation(properties.sortable),
    };
}

// @ts-ignore TS6133
function CfnIndexSearchPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIndex.SearchProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIndex.SearchProperty>();
    ret.addPropertyResult('displayable', 'Displayable', properties.Displayable != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Displayable) : undefined);
    ret.addPropertyResult('facetable', 'Facetable', properties.Facetable != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Facetable) : undefined);
    ret.addPropertyResult('searchable', 'Searchable', properties.Searchable != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Searchable) : undefined);
    ret.addPropertyResult('sortable', 'Sortable', properties.Sortable != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Sortable) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnIndex {
    /**
     * Provides the identifier of the AWS KMS customer master key (CMK) used to encrypt data indexed by Amazon Kendra. We suggest that you use a CMK from your account to help secure your index. Amazon Kendra doesn't support asymmetric CMKs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-serversideencryptionconfiguration.html
     */
    export interface ServerSideEncryptionConfigurationProperty {
        /**
         * The identifier of the AWS KMS customer master key (CMK). Amazon Kendra doesn't support asymmetric CMKs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-serversideencryptionconfiguration.html#cfn-kendra-index-serversideencryptionconfiguration-kmskeyid
         */
        readonly kmsKeyId?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ServerSideEncryptionConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ServerSideEncryptionConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnIndex_ServerSideEncryptionConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    return errors.wrap('supplied properties not correct for "ServerSideEncryptionConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::Index.ServerSideEncryptionConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ServerSideEncryptionConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::Index.ServerSideEncryptionConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnIndexServerSideEncryptionConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIndex_ServerSideEncryptionConfigurationPropertyValidator(properties).assertSuccess();
    return {
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
    };
}

// @ts-ignore TS6133
function CfnIndexServerSideEncryptionConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIndex.ServerSideEncryptionConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIndex.ServerSideEncryptionConfigurationProperty>();
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnIndex {
    /**
     * Provides the configuration information for a token.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-usertokenconfiguration.html
     */
    export interface UserTokenConfigurationProperty {
        /**
         * Information about the JSON token type configuration.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-usertokenconfiguration.html#cfn-kendra-index-usertokenconfiguration-jsontokentypeconfiguration
         */
        readonly jsonTokenTypeConfiguration?: CfnIndex.JsonTokenTypeConfigurationProperty | cdk.IResolvable;
        /**
         * Information about the JWT token type configuration.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-usertokenconfiguration.html#cfn-kendra-index-usertokenconfiguration-jwttokentypeconfiguration
         */
        readonly jwtTokenTypeConfiguration?: CfnIndex.JwtTokenTypeConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `UserTokenConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `UserTokenConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnIndex_UserTokenConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('jsonTokenTypeConfiguration', CfnIndex_JsonTokenTypeConfigurationPropertyValidator)(properties.jsonTokenTypeConfiguration));
    errors.collect(cdk.propertyValidator('jwtTokenTypeConfiguration', CfnIndex_JwtTokenTypeConfigurationPropertyValidator)(properties.jwtTokenTypeConfiguration));
    return errors.wrap('supplied properties not correct for "UserTokenConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::Index.UserTokenConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `UserTokenConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::Index.UserTokenConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnIndexUserTokenConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIndex_UserTokenConfigurationPropertyValidator(properties).assertSuccess();
    return {
        JsonTokenTypeConfiguration: cfnIndexJsonTokenTypeConfigurationPropertyToCloudFormation(properties.jsonTokenTypeConfiguration),
        JwtTokenTypeConfiguration: cfnIndexJwtTokenTypeConfigurationPropertyToCloudFormation(properties.jwtTokenTypeConfiguration),
    };
}

// @ts-ignore TS6133
function CfnIndexUserTokenConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIndex.UserTokenConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIndex.UserTokenConfigurationProperty>();
    ret.addPropertyResult('jsonTokenTypeConfiguration', 'JsonTokenTypeConfiguration', properties.JsonTokenTypeConfiguration != null ? CfnIndexJsonTokenTypeConfigurationPropertyFromCloudFormation(properties.JsonTokenTypeConfiguration) : undefined);
    ret.addPropertyResult('jwtTokenTypeConfiguration', 'JwtTokenTypeConfiguration', properties.JwtTokenTypeConfiguration != null ? CfnIndexJwtTokenTypeConfigurationPropertyFromCloudFormation(properties.JwtTokenTypeConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnIndex {
    /**
     * Specifies a key-value pair that determines the search boost value that a document receives when the key is part of the metadata of a document.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-valueimportanceitem.html
     */
    export interface ValueImportanceItemProperty {
        /**
         * The document metadata value that receives the search boost.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-valueimportanceitem.html#cfn-kendra-index-valueimportanceitem-key
         */
        readonly key?: string;
        /**
         * The boost value that a document receives when the key is part of the metadata of a document.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-kendra-index-valueimportanceitem.html#cfn-kendra-index-valueimportanceitem-value
         */
        readonly value?: number;
    }
}

/**
 * Determine whether the given properties match those of a `ValueImportanceItemProperty`
 *
 * @param properties - the TypeScript properties of a `ValueImportanceItemProperty`
 *
 * @returns the result of the validation.
 */
function CfnIndex_ValueImportanceItemPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('value', cdk.validateNumber)(properties.value));
    return errors.wrap('supplied properties not correct for "ValueImportanceItemProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Kendra::Index.ValueImportanceItem` resource
 *
 * @param properties - the TypeScript properties of a `ValueImportanceItemProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Kendra::Index.ValueImportanceItem` resource.
 */
// @ts-ignore TS6133
function cfnIndexValueImportanceItemPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIndex_ValueImportanceItemPropertyValidator(properties).assertSuccess();
    return {
        Key: cdk.stringToCloudFormation(properties.key),
        Value: cdk.numberToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnIndexValueImportanceItemPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIndex.ValueImportanceItemProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIndex.ValueImportanceItemProperty>();
    ret.addPropertyResult('key', 'Key', properties.Key != null ? cfn_parse.FromCloudFormation.getString(properties.Key) : undefined);
    ret.addPropertyResult('value', 'Value', properties.Value != null ? cfn_parse.FromCloudFormation.getNumber(properties.Value) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
