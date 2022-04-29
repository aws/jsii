// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.059Z","fingerprint":"Kz8qI4oKKI6O5qEW9j8TR0H3mpQuACmYbwqjyzhrA68="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnDataLakeSettings`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-datalakesettings.html
 */
export interface CfnDataLakeSettingsProps {

    /**
     * A list of AWS Lake Formation principals.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-datalakesettings.html#cfn-lakeformation-datalakesettings-admins
     */
    readonly admins?: Array<CfnDataLakeSettings.DataLakePrincipalProperty | cdk.IResolvable> | cdk.IResolvable | cdk.IResolvable;

    /**
     * `AWS::LakeFormation::DataLakeSettings.TrustedResourceOwners`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-datalakesettings.html#cfn-lakeformation-datalakesettings-trustedresourceowners
     */
    readonly trustedResourceOwners?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnDataLakeSettingsProps`
 *
 * @param properties - the TypeScript properties of a `CfnDataLakeSettingsProps`
 *
 * @returns the result of the validation.
 */
function CfnDataLakeSettingsPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('admins', cdk.listValidator(CfnDataLakeSettings_DataLakePrincipalPropertyValidator))(properties.admins));
    errors.collect(cdk.propertyValidator('trustedResourceOwners', cdk.listValidator(cdk.validateString))(properties.trustedResourceOwners));
    return errors.wrap('supplied properties not correct for "CfnDataLakeSettingsProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::LakeFormation::DataLakeSettings` resource
 *
 * @param properties - the TypeScript properties of a `CfnDataLakeSettingsProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::LakeFormation::DataLakeSettings` resource.
 */
// @ts-ignore TS6133
function cfnDataLakeSettingsPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataLakeSettingsPropsValidator(properties).assertSuccess();
    return {
        Admins: cdk.listMapper(cfnDataLakeSettingsDataLakePrincipalPropertyToCloudFormation)(properties.admins),
        TrustedResourceOwners: cdk.listMapper(cdk.stringToCloudFormation)(properties.trustedResourceOwners),
    };
}

// @ts-ignore TS6133
function CfnDataLakeSettingsPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataLakeSettingsProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataLakeSettingsProps>();
    ret.addPropertyResult('admins', 'Admins', properties.Admins != null ? cfn_parse.FromCloudFormation.getArray(CfnDataLakeSettingsDataLakePrincipalPropertyFromCloudFormation)(properties.Admins) : undefined);
    ret.addPropertyResult('trustedResourceOwners', 'TrustedResourceOwners', properties.TrustedResourceOwners != null ? cfn_parse.FromCloudFormation.getStringArray(properties.TrustedResourceOwners) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::LakeFormation::DataLakeSettings`
 *
 * The `AWS::LakeFormation::DataLakeSettings` resource is an AWS Lake Formation resource type that manages the data lake settings for your account. Note that the CloudFormation template only supports updating the `Admins` list. It does not support updating the [CreateDatabaseDefaultPermissions](https://docs.aws.amazon.com/lake-formation/latest/dg/aws-lake-formation-api-aws-lake-formation-api-settings.html#aws-lake-formation-api-aws-lake-formation-api-settings-DataLakeSettings) or [CreateTableDefaultPermissions](https://docs.aws.amazon.com/lake-formation/latest/dg/aws-lake-formation-api-aws-lake-formation-api-settings.html#aws-lake-formation-api-aws-lake-formation-api-settings-DataLakeSettings) . Those permissions can only be edited in the DataLakeSettings resource via the API.
 *
 * @cloudformationResource AWS::LakeFormation::DataLakeSettings
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-datalakesettings.html
 */
export class CfnDataLakeSettings extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::LakeFormation::DataLakeSettings";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDataLakeSettings {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDataLakeSettingsPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDataLakeSettings(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A list of AWS Lake Formation principals.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-datalakesettings.html#cfn-lakeformation-datalakesettings-admins
     */
    public admins: Array<CfnDataLakeSettings.DataLakePrincipalProperty | cdk.IResolvable> | cdk.IResolvable | cdk.IResolvable | undefined;

    /**
     * `AWS::LakeFormation::DataLakeSettings.TrustedResourceOwners`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-datalakesettings.html#cfn-lakeformation-datalakesettings-trustedresourceowners
     */
    public trustedResourceOwners: string[] | undefined;

    /**
     * Create a new `AWS::LakeFormation::DataLakeSettings`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDataLakeSettingsProps = {}) {
        super(scope, id, { type: CfnDataLakeSettings.CFN_RESOURCE_TYPE_NAME, properties: props });

        this.admins = props.admins;
        this.trustedResourceOwners = props.trustedResourceOwners;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDataLakeSettings.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            admins: this.admins,
            trustedResourceOwners: this.trustedResourceOwners,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDataLakeSettingsPropsToCloudFormation(props);
    }
}

export namespace CfnDataLakeSettings {
    /**
     * The Lake Formation principal.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-datalakesettings-datalakeprincipal.html
     */
    export interface DataLakePrincipalProperty {
        /**
         * An identifier for the Lake Formation principal.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-datalakesettings-datalakeprincipal.html#cfn-lakeformation-datalakesettings-datalakeprincipal-datalakeprincipalidentifier
         */
        readonly dataLakePrincipalIdentifier?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DataLakePrincipalProperty`
 *
 * @param properties - the TypeScript properties of a `DataLakePrincipalProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataLakeSettings_DataLakePrincipalPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataLakePrincipalIdentifier', cdk.validateString)(properties.dataLakePrincipalIdentifier));
    return errors.wrap('supplied properties not correct for "DataLakePrincipalProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::LakeFormation::DataLakeSettings.DataLakePrincipal` resource
 *
 * @param properties - the TypeScript properties of a `DataLakePrincipalProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::LakeFormation::DataLakeSettings.DataLakePrincipal` resource.
 */
// @ts-ignore TS6133
function cfnDataLakeSettingsDataLakePrincipalPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataLakeSettings_DataLakePrincipalPropertyValidator(properties).assertSuccess();
    return {
        DataLakePrincipalIdentifier: cdk.stringToCloudFormation(properties.dataLakePrincipalIdentifier),
    };
}

// @ts-ignore TS6133
function CfnDataLakeSettingsDataLakePrincipalPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataLakeSettings.DataLakePrincipalProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataLakeSettings.DataLakePrincipalProperty>();
    ret.addPropertyResult('dataLakePrincipalIdentifier', 'DataLakePrincipalIdentifier', properties.DataLakePrincipalIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.DataLakePrincipalIdentifier) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnPermissions`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-permissions.html
 */
export interface CfnPermissionsProps {

    /**
     * The AWS Lake Formation principal.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-permissions.html#cfn-lakeformation-permissions-datalakeprincipal
     */
    readonly dataLakePrincipal: CfnPermissions.DataLakePrincipalProperty | cdk.IResolvable;

    /**
     * A structure for the resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-permissions.html#cfn-lakeformation-permissions-resource
     */
    readonly resource: CfnPermissions.ResourceProperty | cdk.IResolvable;

    /**
     * The permissions granted or revoked.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-permissions.html#cfn-lakeformation-permissions-permissions
     */
    readonly permissions?: string[];

    /**
     * Indicates whether to grant the ability to grant permissions (as a subset of permissions granted).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-permissions.html#cfn-lakeformation-permissions-permissionswithgrantoption
     */
    readonly permissionsWithGrantOption?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnPermissionsProps`
 *
 * @param properties - the TypeScript properties of a `CfnPermissionsProps`
 *
 * @returns the result of the validation.
 */
function CfnPermissionsPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataLakePrincipal', cdk.requiredValidator)(properties.dataLakePrincipal));
    errors.collect(cdk.propertyValidator('dataLakePrincipal', CfnPermissions_DataLakePrincipalPropertyValidator)(properties.dataLakePrincipal));
    errors.collect(cdk.propertyValidator('permissions', cdk.listValidator(cdk.validateString))(properties.permissions));
    errors.collect(cdk.propertyValidator('permissionsWithGrantOption', cdk.listValidator(cdk.validateString))(properties.permissionsWithGrantOption));
    errors.collect(cdk.propertyValidator('resource', cdk.requiredValidator)(properties.resource));
    errors.collect(cdk.propertyValidator('resource', CfnPermissions_ResourcePropertyValidator)(properties.resource));
    return errors.wrap('supplied properties not correct for "CfnPermissionsProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions` resource
 *
 * @param properties - the TypeScript properties of a `CfnPermissionsProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions` resource.
 */
// @ts-ignore TS6133
function cfnPermissionsPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPermissionsPropsValidator(properties).assertSuccess();
    return {
        DataLakePrincipal: cfnPermissionsDataLakePrincipalPropertyToCloudFormation(properties.dataLakePrincipal),
        Resource: cfnPermissionsResourcePropertyToCloudFormation(properties.resource),
        Permissions: cdk.listMapper(cdk.stringToCloudFormation)(properties.permissions),
        PermissionsWithGrantOption: cdk.listMapper(cdk.stringToCloudFormation)(properties.permissionsWithGrantOption),
    };
}

// @ts-ignore TS6133
function CfnPermissionsPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPermissionsProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPermissionsProps>();
    ret.addPropertyResult('dataLakePrincipal', 'DataLakePrincipal', CfnPermissionsDataLakePrincipalPropertyFromCloudFormation(properties.DataLakePrincipal));
    ret.addPropertyResult('resource', 'Resource', CfnPermissionsResourcePropertyFromCloudFormation(properties.Resource));
    ret.addPropertyResult('permissions', 'Permissions', properties.Permissions != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Permissions) : undefined);
    ret.addPropertyResult('permissionsWithGrantOption', 'PermissionsWithGrantOption', properties.PermissionsWithGrantOption != null ? cfn_parse.FromCloudFormation.getStringArray(properties.PermissionsWithGrantOption) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::LakeFormation::Permissions`
 *
 * The `AWS::LakeFormation::Permissions` resource represents the permissions that a principal has on an AWS Glue Data Catalog resource (such as AWS Glue database or AWS Glue tables). When you upload a permissions stack, the permissions are granted to the principal and when you remove the stack, the permissions are revoked from the principal. If you remove a stack, and the principal does not have the permissions referenced in the stack then AWS Lake Formation will throw an error because you can’t call revoke on non-existing permissions. To successfully remove the stack, you’ll need to regrant those permissions and then remove the stack.
 *
 * @cloudformationResource AWS::LakeFormation::Permissions
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-permissions.html
 */
export class CfnPermissions extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::LakeFormation::Permissions";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnPermissions {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnPermissionsPropsFromCloudFormation(resourceProperties);
        const ret = new CfnPermissions(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The AWS Lake Formation principal.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-permissions.html#cfn-lakeformation-permissions-datalakeprincipal
     */
    public dataLakePrincipal: CfnPermissions.DataLakePrincipalProperty | cdk.IResolvable;

    /**
     * A structure for the resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-permissions.html#cfn-lakeformation-permissions-resource
     */
    public resource: CfnPermissions.ResourceProperty | cdk.IResolvable;

    /**
     * The permissions granted or revoked.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-permissions.html#cfn-lakeformation-permissions-permissions
     */
    public permissions: string[] | undefined;

    /**
     * Indicates whether to grant the ability to grant permissions (as a subset of permissions granted).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-permissions.html#cfn-lakeformation-permissions-permissionswithgrantoption
     */
    public permissionsWithGrantOption: string[] | undefined;

    /**
     * Create a new `AWS::LakeFormation::Permissions`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPermissionsProps) {
        super(scope, id, { type: CfnPermissions.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'dataLakePrincipal', this);
        cdk.requireProperty(props, 'resource', this);

        this.dataLakePrincipal = props.dataLakePrincipal;
        this.resource = props.resource;
        this.permissions = props.permissions;
        this.permissionsWithGrantOption = props.permissionsWithGrantOption;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnPermissions.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            dataLakePrincipal: this.dataLakePrincipal,
            resource: this.resource,
            permissions: this.permissions,
            permissionsWithGrantOption: this.permissionsWithGrantOption,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPermissionsPropsToCloudFormation(props);
    }
}

export namespace CfnPermissions {
    /**
     * A wildcard object, consisting of an optional list of excluded column names or indexes.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-columnwildcard.html
     */
    export interface ColumnWildcardProperty {
        /**
         * Excludes column names. Any column with this name will be excluded.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-columnwildcard.html#cfn-lakeformation-permissions-columnwildcard-excludedcolumnnames
         */
        readonly excludedColumnNames?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `ColumnWildcardProperty`
 *
 * @param properties - the TypeScript properties of a `ColumnWildcardProperty`
 *
 * @returns the result of the validation.
 */
function CfnPermissions_ColumnWildcardPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('excludedColumnNames', cdk.listValidator(cdk.validateString))(properties.excludedColumnNames));
    return errors.wrap('supplied properties not correct for "ColumnWildcardProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.ColumnWildcard` resource
 *
 * @param properties - the TypeScript properties of a `ColumnWildcardProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.ColumnWildcard` resource.
 */
// @ts-ignore TS6133
function cfnPermissionsColumnWildcardPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPermissions_ColumnWildcardPropertyValidator(properties).assertSuccess();
    return {
        ExcludedColumnNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.excludedColumnNames),
    };
}

// @ts-ignore TS6133
function CfnPermissionsColumnWildcardPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPermissions.ColumnWildcardProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPermissions.ColumnWildcardProperty>();
    ret.addPropertyResult('excludedColumnNames', 'ExcludedColumnNames', properties.ExcludedColumnNames != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExcludedColumnNames) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPermissions {
    /**
     * The Lake Formation principal.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-datalakeprincipal.html
     */
    export interface DataLakePrincipalProperty {
        /**
         * An identifier for the Lake Formation principal.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-datalakeprincipal.html#cfn-lakeformation-permissions-datalakeprincipal-datalakeprincipalidentifier
         */
        readonly dataLakePrincipalIdentifier?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DataLakePrincipalProperty`
 *
 * @param properties - the TypeScript properties of a `DataLakePrincipalProperty`
 *
 * @returns the result of the validation.
 */
function CfnPermissions_DataLakePrincipalPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataLakePrincipalIdentifier', cdk.validateString)(properties.dataLakePrincipalIdentifier));
    return errors.wrap('supplied properties not correct for "DataLakePrincipalProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.DataLakePrincipal` resource
 *
 * @param properties - the TypeScript properties of a `DataLakePrincipalProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.DataLakePrincipal` resource.
 */
// @ts-ignore TS6133
function cfnPermissionsDataLakePrincipalPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPermissions_DataLakePrincipalPropertyValidator(properties).assertSuccess();
    return {
        DataLakePrincipalIdentifier: cdk.stringToCloudFormation(properties.dataLakePrincipalIdentifier),
    };
}

// @ts-ignore TS6133
function CfnPermissionsDataLakePrincipalPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPermissions.DataLakePrincipalProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPermissions.DataLakePrincipalProperty>();
    ret.addPropertyResult('dataLakePrincipalIdentifier', 'DataLakePrincipalIdentifier', properties.DataLakePrincipalIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.DataLakePrincipalIdentifier) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPermissions {
    /**
     * A structure for a data location object where permissions are granted or revoked.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-datalocationresource.html
     */
    export interface DataLocationResourceProperty {
        /**
         * `CfnPermissions.DataLocationResourceProperty.CatalogId`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-datalocationresource.html#cfn-lakeformation-permissions-datalocationresource-catalogid
         */
        readonly catalogId?: string;
        /**
         * Currently not supported by AWS CloudFormation .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-datalocationresource.html#cfn-lakeformation-permissions-datalocationresource-s3resource
         */
        readonly s3Resource?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DataLocationResourceProperty`
 *
 * @param properties - the TypeScript properties of a `DataLocationResourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnPermissions_DataLocationResourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('s3Resource', cdk.validateString)(properties.s3Resource));
    return errors.wrap('supplied properties not correct for "DataLocationResourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.DataLocationResource` resource
 *
 * @param properties - the TypeScript properties of a `DataLocationResourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.DataLocationResource` resource.
 */
// @ts-ignore TS6133
function cfnPermissionsDataLocationResourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPermissions_DataLocationResourcePropertyValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        S3Resource: cdk.stringToCloudFormation(properties.s3Resource),
    };
}

// @ts-ignore TS6133
function CfnPermissionsDataLocationResourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPermissions.DataLocationResourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPermissions.DataLocationResourceProperty>();
    ret.addPropertyResult('catalogId', 'CatalogId', properties.CatalogId != null ? cfn_parse.FromCloudFormation.getString(properties.CatalogId) : undefined);
    ret.addPropertyResult('s3Resource', 'S3Resource', properties.S3Resource != null ? cfn_parse.FromCloudFormation.getString(properties.S3Resource) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPermissions {
    /**
     * A structure for the database object.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-databaseresource.html
     */
    export interface DatabaseResourceProperty {
        /**
         * `CfnPermissions.DatabaseResourceProperty.CatalogId`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-databaseresource.html#cfn-lakeformation-permissions-databaseresource-catalogid
         */
        readonly catalogId?: string;
        /**
         * The name of the database resource. Unique to the Data Catalog.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-databaseresource.html#cfn-lakeformation-permissions-databaseresource-name
         */
        readonly name?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DatabaseResourceProperty`
 *
 * @param properties - the TypeScript properties of a `DatabaseResourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnPermissions_DatabaseResourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "DatabaseResourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.DatabaseResource` resource
 *
 * @param properties - the TypeScript properties of a `DatabaseResourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.DatabaseResource` resource.
 */
// @ts-ignore TS6133
function cfnPermissionsDatabaseResourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPermissions_DatabaseResourcePropertyValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnPermissionsDatabaseResourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPermissions.DatabaseResourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPermissions.DatabaseResourceProperty>();
    ret.addPropertyResult('catalogId', 'CatalogId', properties.CatalogId != null ? cfn_parse.FromCloudFormation.getString(properties.CatalogId) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPermissions {
    /**
     * A structure for the resource.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-resource.html
     */
    export interface ResourceProperty {
        /**
         * A structure for a data location object where permissions are granted or revoked.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-resource.html#cfn-lakeformation-permissions-resource-datalocationresource
         */
        readonly dataLocationResource?: CfnPermissions.DataLocationResourceProperty | cdk.IResolvable;
        /**
         * A structure for the database object.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-resource.html#cfn-lakeformation-permissions-resource-databaseresource
         */
        readonly databaseResource?: CfnPermissions.DatabaseResourceProperty | cdk.IResolvable;
        /**
         * A structure for the table object. A table is a metadata definition that represents your data. You can Grant and Revoke table privileges to a principal.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-resource.html#cfn-lakeformation-permissions-resource-tableresource
         */
        readonly tableResource?: CfnPermissions.TableResourceProperty | cdk.IResolvable;
        /**
         * Currently not supported by AWS CloudFormation .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-resource.html#cfn-lakeformation-permissions-resource-tablewithcolumnsresource
         */
        readonly tableWithColumnsResource?: CfnPermissions.TableWithColumnsResourceProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ResourceProperty`
 *
 * @param properties - the TypeScript properties of a `ResourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnPermissions_ResourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataLocationResource', CfnPermissions_DataLocationResourcePropertyValidator)(properties.dataLocationResource));
    errors.collect(cdk.propertyValidator('databaseResource', CfnPermissions_DatabaseResourcePropertyValidator)(properties.databaseResource));
    errors.collect(cdk.propertyValidator('tableResource', CfnPermissions_TableResourcePropertyValidator)(properties.tableResource));
    errors.collect(cdk.propertyValidator('tableWithColumnsResource', CfnPermissions_TableWithColumnsResourcePropertyValidator)(properties.tableWithColumnsResource));
    return errors.wrap('supplied properties not correct for "ResourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.Resource` resource
 *
 * @param properties - the TypeScript properties of a `ResourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.Resource` resource.
 */
// @ts-ignore TS6133
function cfnPermissionsResourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPermissions_ResourcePropertyValidator(properties).assertSuccess();
    return {
        DataLocationResource: cfnPermissionsDataLocationResourcePropertyToCloudFormation(properties.dataLocationResource),
        DatabaseResource: cfnPermissionsDatabaseResourcePropertyToCloudFormation(properties.databaseResource),
        TableResource: cfnPermissionsTableResourcePropertyToCloudFormation(properties.tableResource),
        TableWithColumnsResource: cfnPermissionsTableWithColumnsResourcePropertyToCloudFormation(properties.tableWithColumnsResource),
    };
}

// @ts-ignore TS6133
function CfnPermissionsResourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPermissions.ResourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPermissions.ResourceProperty>();
    ret.addPropertyResult('dataLocationResource', 'DataLocationResource', properties.DataLocationResource != null ? CfnPermissionsDataLocationResourcePropertyFromCloudFormation(properties.DataLocationResource) : undefined);
    ret.addPropertyResult('databaseResource', 'DatabaseResource', properties.DatabaseResource != null ? CfnPermissionsDatabaseResourcePropertyFromCloudFormation(properties.DatabaseResource) : undefined);
    ret.addPropertyResult('tableResource', 'TableResource', properties.TableResource != null ? CfnPermissionsTableResourcePropertyFromCloudFormation(properties.TableResource) : undefined);
    ret.addPropertyResult('tableWithColumnsResource', 'TableWithColumnsResource', properties.TableWithColumnsResource != null ? CfnPermissionsTableWithColumnsResourcePropertyFromCloudFormation(properties.TableWithColumnsResource) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPermissions {
    /**
     * A structure for the table object. A table is a metadata definition that represents your data. You can Grant and Revoke table privileges to a principal.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-tableresource.html
     */
    export interface TableResourceProperty {
        /**
         * `CfnPermissions.TableResourceProperty.CatalogId`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-tableresource.html#cfn-lakeformation-permissions-tableresource-catalogid
         */
        readonly catalogId?: string;
        /**
         * The name of the database for the table. Unique to a Data Catalog. A database is a set of associated table definitions organized into a logical group. You can Grant and Revoke database privileges to a principal.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-tableresource.html#cfn-lakeformation-permissions-tableresource-databasename
         */
        readonly databaseName?: string;
        /**
         * The name of the table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-tableresource.html#cfn-lakeformation-permissions-tableresource-name
         */
        readonly name?: string;
        /**
         * An empty object representing all tables under a database. If this field is specified instead of the `Name` field, all tables under `DatabaseName` will have permission changes applied.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-tableresource.html#cfn-lakeformation-permissions-tableresource-tablewildcard
         */
        readonly tableWildcard?: CfnPermissions.TableWildcardProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `TableResourceProperty`
 *
 * @param properties - the TypeScript properties of a `TableResourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnPermissions_TableResourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tableWildcard', CfnPermissions_TableWildcardPropertyValidator)(properties.tableWildcard));
    return errors.wrap('supplied properties not correct for "TableResourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.TableResource` resource
 *
 * @param properties - the TypeScript properties of a `TableResourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.TableResource` resource.
 */
// @ts-ignore TS6133
function cfnPermissionsTableResourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPermissions_TableResourcePropertyValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
        Name: cdk.stringToCloudFormation(properties.name),
        TableWildcard: cfnPermissionsTableWildcardPropertyToCloudFormation(properties.tableWildcard),
    };
}

// @ts-ignore TS6133
function CfnPermissionsTableResourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPermissions.TableResourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPermissions.TableResourceProperty>();
    ret.addPropertyResult('catalogId', 'CatalogId', properties.CatalogId != null ? cfn_parse.FromCloudFormation.getString(properties.CatalogId) : undefined);
    ret.addPropertyResult('databaseName', 'DatabaseName', properties.DatabaseName != null ? cfn_parse.FromCloudFormation.getString(properties.DatabaseName) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tableWildcard', 'TableWildcard', properties.TableWildcard != null ? CfnPermissionsTableWildcardPropertyFromCloudFormation(properties.TableWildcard) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPermissions {
    /**
     * A wildcard object representing every table under a database.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-tablewildcard.html
     */
    export interface TableWildcardProperty {
    }
}

/**
 * Determine whether the given properties match those of a `TableWildcardProperty`
 *
 * @param properties - the TypeScript properties of a `TableWildcardProperty`
 *
 * @returns the result of the validation.
 */
function CfnPermissions_TableWildcardPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    return errors.wrap('supplied properties not correct for "TableWildcardProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.TableWildcard` resource
 *
 * @param properties - the TypeScript properties of a `TableWildcardProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.TableWildcard` resource.
 */
// @ts-ignore TS6133
function cfnPermissionsTableWildcardPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPermissions_TableWildcardPropertyValidator(properties).assertSuccess();
    return {
    };
}

// @ts-ignore TS6133
function CfnPermissionsTableWildcardPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPermissions.TableWildcardProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPermissions.TableWildcardProperty>();
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPermissions {
    /**
     * A structure for a table with columns object. This object is only used when granting a SELECT permission.
     *
     * This object must take a value for at least one of `ColumnsNames` , `ColumnsIndexes` , or `ColumnsWildcard` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-tablewithcolumnsresource.html
     */
    export interface TableWithColumnsResourceProperty {
        /**
         * `CfnPermissions.TableWithColumnsResourceProperty.CatalogId`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-tablewithcolumnsresource.html#cfn-lakeformation-permissions-tablewithcolumnsresource-catalogid
         */
        readonly catalogId?: string;
        /**
         * The list of column names for the table. At least one of `ColumnNames` or `ColumnWildcard` is required.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-tablewithcolumnsresource.html#cfn-lakeformation-permissions-tablewithcolumnsresource-columnnames
         */
        readonly columnNames?: string[];
        /**
         * A wildcard specified by a `ColumnWildcard` object. At least one of `ColumnNames` or `ColumnWildcard` is required.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-tablewithcolumnsresource.html#cfn-lakeformation-permissions-tablewithcolumnsresource-columnwildcard
         */
        readonly columnWildcard?: CfnPermissions.ColumnWildcardProperty | cdk.IResolvable;
        /**
         * The name of the database for the table with columns resource. Unique to the Data Catalog. A database is a set of associated table definitions organized into a logical group. You can Grant and Revoke database privileges to a principal.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-tablewithcolumnsresource.html#cfn-lakeformation-permissions-tablewithcolumnsresource-databasename
         */
        readonly databaseName?: string;
        /**
         * The name of the table resource. A table is a metadata definition that represents your data. You can Grant and Revoke table privileges to a principal.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lakeformation-permissions-tablewithcolumnsresource.html#cfn-lakeformation-permissions-tablewithcolumnsresource-name
         */
        readonly name?: string;
    }
}

/**
 * Determine whether the given properties match those of a `TableWithColumnsResourceProperty`
 *
 * @param properties - the TypeScript properties of a `TableWithColumnsResourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnPermissions_TableWithColumnsResourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('columnNames', cdk.listValidator(cdk.validateString))(properties.columnNames));
    errors.collect(cdk.propertyValidator('columnWildcard', CfnPermissions_ColumnWildcardPropertyValidator)(properties.columnWildcard));
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "TableWithColumnsResourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.TableWithColumnsResource` resource
 *
 * @param properties - the TypeScript properties of a `TableWithColumnsResourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::LakeFormation::Permissions.TableWithColumnsResource` resource.
 */
// @ts-ignore TS6133
function cfnPermissionsTableWithColumnsResourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPermissions_TableWithColumnsResourcePropertyValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        ColumnNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.columnNames),
        ColumnWildcard: cfnPermissionsColumnWildcardPropertyToCloudFormation(properties.columnWildcard),
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnPermissionsTableWithColumnsResourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPermissions.TableWithColumnsResourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPermissions.TableWithColumnsResourceProperty>();
    ret.addPropertyResult('catalogId', 'CatalogId', properties.CatalogId != null ? cfn_parse.FromCloudFormation.getString(properties.CatalogId) : undefined);
    ret.addPropertyResult('columnNames', 'ColumnNames', properties.ColumnNames != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ColumnNames) : undefined);
    ret.addPropertyResult('columnWildcard', 'ColumnWildcard', properties.ColumnWildcard != null ? CfnPermissionsColumnWildcardPropertyFromCloudFormation(properties.ColumnWildcard) : undefined);
    ret.addPropertyResult('databaseName', 'DatabaseName', properties.DatabaseName != null ? cfn_parse.FromCloudFormation.getString(properties.DatabaseName) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnResource`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-resource.html
 */
export interface CfnResourceProps {

    /**
     * The Amazon Resource Name (ARN) of the resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-resource.html#cfn-lakeformation-resource-resourcearn
     */
    readonly resourceArn: string;

    /**
     * Designates a trusted caller, an IAM principal, by registering this caller with the Data Catalog.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-resource.html#cfn-lakeformation-resource-useservicelinkedrole
     */
    readonly useServiceLinkedRole: boolean | cdk.IResolvable;

    /**
     * The IAM role that registered a resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-resource.html#cfn-lakeformation-resource-rolearn
     */
    readonly roleArn?: string;
}

/**
 * Determine whether the given properties match those of a `CfnResourceProps`
 *
 * @param properties - the TypeScript properties of a `CfnResourceProps`
 *
 * @returns the result of the validation.
 */
function CfnResourcePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('resourceArn', cdk.requiredValidator)(properties.resourceArn));
    errors.collect(cdk.propertyValidator('resourceArn', cdk.validateString)(properties.resourceArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('useServiceLinkedRole', cdk.requiredValidator)(properties.useServiceLinkedRole));
    errors.collect(cdk.propertyValidator('useServiceLinkedRole', cdk.validateBoolean)(properties.useServiceLinkedRole));
    return errors.wrap('supplied properties not correct for "CfnResourceProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::LakeFormation::Resource` resource
 *
 * @param properties - the TypeScript properties of a `CfnResourceProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::LakeFormation::Resource` resource.
 */
// @ts-ignore TS6133
function cfnResourcePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnResourcePropsValidator(properties).assertSuccess();
    return {
        ResourceArn: cdk.stringToCloudFormation(properties.resourceArn),
        UseServiceLinkedRole: cdk.booleanToCloudFormation(properties.useServiceLinkedRole),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnResourcePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnResourceProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnResourceProps>();
    ret.addPropertyResult('resourceArn', 'ResourceArn', cfn_parse.FromCloudFormation.getString(properties.ResourceArn));
    ret.addPropertyResult('useServiceLinkedRole', 'UseServiceLinkedRole', cfn_parse.FromCloudFormation.getBoolean(properties.UseServiceLinkedRole));
    ret.addPropertyResult('roleArn', 'RoleArn', properties.RoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.RoleArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::LakeFormation::Resource`
 *
 * The `AWS::LakeFormation::Resource` represents the data (Amazon S3 buckets and folders) that is being registered with AWS Lake Formation . When a `Resource` type CloudFormation template is uploaded, an AWS Lake Formation [`RegisterResource`](https://docs.aws.amazon.com/lake-formation/latest/dg/aws-lake-formation-api-credential-vending.html#aws-lake-formation-api-credential-vending-RegisterResource) API call is made to register the resource. When a `Resource` type CloudFormation template is removed, the AWS Lake Formation [`DeregisterResource`](https://docs.aws.amazon.com/lake-formation/latest/dg/aws-lake-formation-api-credential-vending.html#aws-lake-formation-api-credential-vending-DeregisterResource) API is called.
 *
 * @cloudformationResource AWS::LakeFormation::Resource
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-resource.html
 */
export class CfnResource extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::LakeFormation::Resource";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnResource {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnResourcePropsFromCloudFormation(resourceProperties);
        const ret = new CfnResource(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-resource.html#cfn-lakeformation-resource-resourcearn
     */
    public resourceArn: string;

    /**
     * Designates a trusted caller, an IAM principal, by registering this caller with the Data Catalog.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-resource.html#cfn-lakeformation-resource-useservicelinkedrole
     */
    public useServiceLinkedRole: boolean | cdk.IResolvable;

    /**
     * The IAM role that registered a resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-resource.html#cfn-lakeformation-resource-rolearn
     */
    public roleArn: string | undefined;

    /**
     * Create a new `AWS::LakeFormation::Resource`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnResourceProps) {
        super(scope, id, { type: CfnResource.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'resourceArn', this);
        cdk.requireProperty(props, 'useServiceLinkedRole', this);

        this.resourceArn = props.resourceArn;
        this.useServiceLinkedRole = props.useServiceLinkedRole;
        this.roleArn = props.roleArn;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnResource.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            resourceArn: this.resourceArn,
            useServiceLinkedRole: this.useServiceLinkedRole,
            roleArn: this.roleArn,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnResourcePropsToCloudFormation(props);
    }
}
