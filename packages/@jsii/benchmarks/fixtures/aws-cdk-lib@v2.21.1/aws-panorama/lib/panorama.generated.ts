// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.575Z","fingerprint":"GKOtN4ToDKnI+AIjWgZTIws77C8U2vOOE7TjfS/QuJ0="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnApplicationInstance`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html
 */
export interface CfnApplicationInstanceProps {

    /**
     * The device's ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-defaultruntimecontextdevice
     */
    readonly defaultRuntimeContextDevice: string;

    /**
     * The application's manifest document.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-manifestpayload
     */
    readonly manifestPayload: CfnApplicationInstance.ManifestPayloadProperty | cdk.IResolvable;

    /**
     * The ID of an application instance to replace with the new instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-applicationinstanceidtoreplace
     */
    readonly applicationInstanceIdToReplace?: string;

    /**
     * A description for the application instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-description
     */
    readonly description?: string;

    /**
     * A device's ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-deviceid
     */
    readonly deviceId?: string;

    /**
     * Setting overrides for the application manifest.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-manifestoverridespayload
     */
    readonly manifestOverridesPayload?: CfnApplicationInstance.ManifestOverridesPayloadProperty | cdk.IResolvable;

    /**
     * A name for the application instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-name
     */
    readonly name?: string;

    /**
     * The ARN of a runtime role for the application instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-runtimerolearn
     */
    readonly runtimeRoleArn?: string;

    /**
     * Only include instances with a specific status.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-statusfilter
     */
    readonly statusFilter?: string;

    /**
     * Tags for the application instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnApplicationInstanceProps`
 *
 * @param properties - the TypeScript properties of a `CfnApplicationInstanceProps`
 *
 * @returns the result of the validation.
 */
function CfnApplicationInstancePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('applicationInstanceIdToReplace', cdk.validateString)(properties.applicationInstanceIdToReplace));
    errors.collect(cdk.propertyValidator('defaultRuntimeContextDevice', cdk.requiredValidator)(properties.defaultRuntimeContextDevice));
    errors.collect(cdk.propertyValidator('defaultRuntimeContextDevice', cdk.validateString)(properties.defaultRuntimeContextDevice));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('deviceId', cdk.validateString)(properties.deviceId));
    errors.collect(cdk.propertyValidator('manifestOverridesPayload', CfnApplicationInstance_ManifestOverridesPayloadPropertyValidator)(properties.manifestOverridesPayload));
    errors.collect(cdk.propertyValidator('manifestPayload', cdk.requiredValidator)(properties.manifestPayload));
    errors.collect(cdk.propertyValidator('manifestPayload', CfnApplicationInstance_ManifestPayloadPropertyValidator)(properties.manifestPayload));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('runtimeRoleArn', cdk.validateString)(properties.runtimeRoleArn));
    errors.collect(cdk.propertyValidator('statusFilter', cdk.validateString)(properties.statusFilter));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnApplicationInstanceProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Panorama::ApplicationInstance` resource
 *
 * @param properties - the TypeScript properties of a `CfnApplicationInstanceProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Panorama::ApplicationInstance` resource.
 */
// @ts-ignore TS6133
function cfnApplicationInstancePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationInstancePropsValidator(properties).assertSuccess();
    return {
        DefaultRuntimeContextDevice: cdk.stringToCloudFormation(properties.defaultRuntimeContextDevice),
        ManifestPayload: cfnApplicationInstanceManifestPayloadPropertyToCloudFormation(properties.manifestPayload),
        ApplicationInstanceIdToReplace: cdk.stringToCloudFormation(properties.applicationInstanceIdToReplace),
        Description: cdk.stringToCloudFormation(properties.description),
        DeviceId: cdk.stringToCloudFormation(properties.deviceId),
        ManifestOverridesPayload: cfnApplicationInstanceManifestOverridesPayloadPropertyToCloudFormation(properties.manifestOverridesPayload),
        Name: cdk.stringToCloudFormation(properties.name),
        RuntimeRoleArn: cdk.stringToCloudFormation(properties.runtimeRoleArn),
        StatusFilter: cdk.stringToCloudFormation(properties.statusFilter),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnApplicationInstancePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationInstanceProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationInstanceProps>();
    ret.addPropertyResult('defaultRuntimeContextDevice', 'DefaultRuntimeContextDevice', cfn_parse.FromCloudFormation.getString(properties.DefaultRuntimeContextDevice));
    ret.addPropertyResult('manifestPayload', 'ManifestPayload', CfnApplicationInstanceManifestPayloadPropertyFromCloudFormation(properties.ManifestPayload));
    ret.addPropertyResult('applicationInstanceIdToReplace', 'ApplicationInstanceIdToReplace', properties.ApplicationInstanceIdToReplace != null ? cfn_parse.FromCloudFormation.getString(properties.ApplicationInstanceIdToReplace) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('deviceId', 'DeviceId', properties.DeviceId != null ? cfn_parse.FromCloudFormation.getString(properties.DeviceId) : undefined);
    ret.addPropertyResult('manifestOverridesPayload', 'ManifestOverridesPayload', properties.ManifestOverridesPayload != null ? CfnApplicationInstanceManifestOverridesPayloadPropertyFromCloudFormation(properties.ManifestOverridesPayload) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('runtimeRoleArn', 'RuntimeRoleArn', properties.RuntimeRoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.RuntimeRoleArn) : undefined);
    ret.addPropertyResult('statusFilter', 'StatusFilter', properties.StatusFilter != null ? cfn_parse.FromCloudFormation.getString(properties.StatusFilter) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Panorama::ApplicationInstance`
 *
 * Creates an application instance and deploys it to a device.
 *
 * @cloudformationResource AWS::Panorama::ApplicationInstance
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html
 */
export class CfnApplicationInstance extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Panorama::ApplicationInstance";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnApplicationInstance {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnApplicationInstancePropsFromCloudFormation(resourceProperties);
        const ret = new CfnApplicationInstance(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The application instance's ID.
     * @cloudformationAttribute ApplicationInstanceId
     */
    public readonly attrApplicationInstanceId: string;

    /**
     * The application instance's ARN.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The application instance's created time.
     * @cloudformationAttribute CreatedTime
     */
    public readonly attrCreatedTime: number;

    /**
     * The application instance's default runtime context device name.
     * @cloudformationAttribute DefaultRuntimeContextDeviceName
     */
    public readonly attrDefaultRuntimeContextDeviceName: string;

    /**
     * The application instance's health status.
     * @cloudformationAttribute HealthStatus
     */
    public readonly attrHealthStatus: string;

    /**
     * The application instance's last updated time.
     * @cloudformationAttribute LastUpdatedTime
     */
    public readonly attrLastUpdatedTime: number;

    /**
     * The application instance's status.
     * @cloudformationAttribute Status
     */
    public readonly attrStatus: string;

    /**
     * The application instance's status description.
     * @cloudformationAttribute StatusDescription
     */
    public readonly attrStatusDescription: string;

    /**
     * The device's ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-defaultruntimecontextdevice
     */
    public defaultRuntimeContextDevice: string;

    /**
     * The application's manifest document.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-manifestpayload
     */
    public manifestPayload: CfnApplicationInstance.ManifestPayloadProperty | cdk.IResolvable;

    /**
     * The ID of an application instance to replace with the new instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-applicationinstanceidtoreplace
     */
    public applicationInstanceIdToReplace: string | undefined;

    /**
     * A description for the application instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-description
     */
    public description: string | undefined;

    /**
     * A device's ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-deviceid
     */
    public deviceId: string | undefined;

    /**
     * Setting overrides for the application manifest.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-manifestoverridespayload
     */
    public manifestOverridesPayload: CfnApplicationInstance.ManifestOverridesPayloadProperty | cdk.IResolvable | undefined;

    /**
     * A name for the application instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-name
     */
    public name: string | undefined;

    /**
     * The ARN of a runtime role for the application instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-runtimerolearn
     */
    public runtimeRoleArn: string | undefined;

    /**
     * Only include instances with a specific status.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-statusfilter
     */
    public statusFilter: string | undefined;

    /**
     * Tags for the application instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-applicationinstance.html#cfn-panorama-applicationinstance-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Panorama::ApplicationInstance`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnApplicationInstanceProps) {
        super(scope, id, { type: CfnApplicationInstance.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'defaultRuntimeContextDevice', this);
        cdk.requireProperty(props, 'manifestPayload', this);
        this.attrApplicationInstanceId = cdk.Token.asString(this.getAtt('ApplicationInstanceId'));
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCreatedTime = cdk.Token.asNumber(this.getAtt('CreatedTime'));
        this.attrDefaultRuntimeContextDeviceName = cdk.Token.asString(this.getAtt('DefaultRuntimeContextDeviceName'));
        this.attrHealthStatus = cdk.Token.asString(this.getAtt('HealthStatus'));
        this.attrLastUpdatedTime = cdk.Token.asNumber(this.getAtt('LastUpdatedTime'));
        this.attrStatus = cdk.Token.asString(this.getAtt('Status'));
        this.attrStatusDescription = cdk.Token.asString(this.getAtt('StatusDescription'));

        this.defaultRuntimeContextDevice = props.defaultRuntimeContextDevice;
        this.manifestPayload = props.manifestPayload;
        this.applicationInstanceIdToReplace = props.applicationInstanceIdToReplace;
        this.description = props.description;
        this.deviceId = props.deviceId;
        this.manifestOverridesPayload = props.manifestOverridesPayload;
        this.name = props.name;
        this.runtimeRoleArn = props.runtimeRoleArn;
        this.statusFilter = props.statusFilter;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Panorama::ApplicationInstance", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnApplicationInstance.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            defaultRuntimeContextDevice: this.defaultRuntimeContextDevice,
            manifestPayload: this.manifestPayload,
            applicationInstanceIdToReplace: this.applicationInstanceIdToReplace,
            description: this.description,
            deviceId: this.deviceId,
            manifestOverridesPayload: this.manifestOverridesPayload,
            name: this.name,
            runtimeRoleArn: this.runtimeRoleArn,
            statusFilter: this.statusFilter,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnApplicationInstancePropsToCloudFormation(props);
    }
}

export namespace CfnApplicationInstance {
    /**
     * Parameter overrides for an application instance. This is a JSON document that has a single key ( `PayloadData` ) where the value is an escaped string representation of the overrides document.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-panorama-applicationinstance-manifestoverridespayload.html
     */
    export interface ManifestOverridesPayloadProperty {
        /**
         * The overrides document.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-panorama-applicationinstance-manifestoverridespayload.html#cfn-panorama-applicationinstance-manifestoverridespayload-payloaddata
         */
        readonly payloadData?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ManifestOverridesPayloadProperty`
 *
 * @param properties - the TypeScript properties of a `ManifestOverridesPayloadProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationInstance_ManifestOverridesPayloadPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('payloadData', cdk.validateString)(properties.payloadData));
    return errors.wrap('supplied properties not correct for "ManifestOverridesPayloadProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Panorama::ApplicationInstance.ManifestOverridesPayload` resource
 *
 * @param properties - the TypeScript properties of a `ManifestOverridesPayloadProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Panorama::ApplicationInstance.ManifestOverridesPayload` resource.
 */
// @ts-ignore TS6133
function cfnApplicationInstanceManifestOverridesPayloadPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationInstance_ManifestOverridesPayloadPropertyValidator(properties).assertSuccess();
    return {
        PayloadData: cdk.stringToCloudFormation(properties.payloadData),
    };
}

// @ts-ignore TS6133
function CfnApplicationInstanceManifestOverridesPayloadPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationInstance.ManifestOverridesPayloadProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationInstance.ManifestOverridesPayloadProperty>();
    ret.addPropertyResult('payloadData', 'PayloadData', properties.PayloadData != null ? cfn_parse.FromCloudFormation.getString(properties.PayloadData) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApplicationInstance {
    /**
     * A application verion's manifest file. This is a JSON document that has a single key ( `PayloadData` ) where the value is an escaped string representation of the application manifest ( `graph.json` ). This file is located in the `graphs` folder in your application source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-panorama-applicationinstance-manifestpayload.html
     */
    export interface ManifestPayloadProperty {
        /**
         * The application manifest.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-panorama-applicationinstance-manifestpayload.html#cfn-panorama-applicationinstance-manifestpayload-payloaddata
         */
        readonly payloadData?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ManifestPayloadProperty`
 *
 * @param properties - the TypeScript properties of a `ManifestPayloadProperty`
 *
 * @returns the result of the validation.
 */
function CfnApplicationInstance_ManifestPayloadPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('payloadData', cdk.validateString)(properties.payloadData));
    return errors.wrap('supplied properties not correct for "ManifestPayloadProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Panorama::ApplicationInstance.ManifestPayload` resource
 *
 * @param properties - the TypeScript properties of a `ManifestPayloadProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Panorama::ApplicationInstance.ManifestPayload` resource.
 */
// @ts-ignore TS6133
function cfnApplicationInstanceManifestPayloadPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationInstance_ManifestPayloadPropertyValidator(properties).assertSuccess();
    return {
        PayloadData: cdk.stringToCloudFormation(properties.payloadData),
    };
}

// @ts-ignore TS6133
function CfnApplicationInstanceManifestPayloadPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationInstance.ManifestPayloadProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationInstance.ManifestPayloadProperty>();
    ret.addPropertyResult('payloadData', 'PayloadData', properties.PayloadData != null ? cfn_parse.FromCloudFormation.getString(properties.PayloadData) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnPackage`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-package.html
 */
export interface CfnPackageProps {

    /**
     * A name for the package.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-package.html#cfn-panorama-package-packagename
     */
    readonly packageName: string;

    /**
     * Tags for the package.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-package.html#cfn-panorama-package-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnPackageProps`
 *
 * @param properties - the TypeScript properties of a `CfnPackageProps`
 *
 * @returns the result of the validation.
 */
function CfnPackagePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('packageName', cdk.requiredValidator)(properties.packageName));
    errors.collect(cdk.propertyValidator('packageName', cdk.validateString)(properties.packageName));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnPackageProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Panorama::Package` resource
 *
 * @param properties - the TypeScript properties of a `CfnPackageProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Panorama::Package` resource.
 */
// @ts-ignore TS6133
function cfnPackagePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPackagePropsValidator(properties).assertSuccess();
    return {
        PackageName: cdk.stringToCloudFormation(properties.packageName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnPackagePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPackageProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPackageProps>();
    ret.addPropertyResult('packageName', 'PackageName', cfn_parse.FromCloudFormation.getString(properties.PackageName));
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Panorama::Package`
 *
 * Creates a package and storage location in an Amazon S3 access point.
 *
 * @cloudformationResource AWS::Panorama::Package
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-package.html
 */
export class CfnPackage extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Panorama::Package";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnPackage {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnPackagePropsFromCloudFormation(resourceProperties);
        const ret = new CfnPackage(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The package's ARN.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The item's created time.
     * @cloudformationAttribute CreatedTime
     */
    public readonly attrCreatedTime: number;

    /**
     * The package's ID.
     * @cloudformationAttribute PackageId
     */
    public readonly attrPackageId: string;

    /**
     * A name for the package.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-package.html#cfn-panorama-package-packagename
     */
    public packageName: string;

    /**
     * Tags for the package.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-package.html#cfn-panorama-package-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Panorama::Package`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPackageProps) {
        super(scope, id, { type: CfnPackage.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'packageName', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCreatedTime = cdk.Token.asNumber(this.getAtt('CreatedTime'));
        this.attrPackageId = cdk.Token.asString(this.getAtt('PackageId'));

        this.packageName = props.packageName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Panorama::Package", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnPackage.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            packageName: this.packageName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPackagePropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnPackageVersion`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html
 */
export interface CfnPackageVersionProps {

    /**
     * A package ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html#cfn-panorama-packageversion-packageid
     */
    readonly packageId: string;

    /**
     * A package version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html#cfn-panorama-packageversion-packageversion
     */
    readonly packageVersion: string;

    /**
     * A patch version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html#cfn-panorama-packageversion-patchversion
     */
    readonly patchVersion: string;

    /**
     * Whether to mark the new version as the latest version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html#cfn-panorama-packageversion-marklatest
     */
    readonly markLatest?: boolean | cdk.IResolvable;

    /**
     * An owner account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html#cfn-panorama-packageversion-owneraccount
     */
    readonly ownerAccount?: string;

    /**
     * If the version was marked latest, the new version to maker as latest.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html#cfn-panorama-packageversion-updatedlatestpatchversion
     */
    readonly updatedLatestPatchVersion?: string;
}

/**
 * Determine whether the given properties match those of a `CfnPackageVersionProps`
 *
 * @param properties - the TypeScript properties of a `CfnPackageVersionProps`
 *
 * @returns the result of the validation.
 */
function CfnPackageVersionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('markLatest', cdk.validateBoolean)(properties.markLatest));
    errors.collect(cdk.propertyValidator('ownerAccount', cdk.validateString)(properties.ownerAccount));
    errors.collect(cdk.propertyValidator('packageId', cdk.requiredValidator)(properties.packageId));
    errors.collect(cdk.propertyValidator('packageId', cdk.validateString)(properties.packageId));
    errors.collect(cdk.propertyValidator('packageVersion', cdk.requiredValidator)(properties.packageVersion));
    errors.collect(cdk.propertyValidator('packageVersion', cdk.validateString)(properties.packageVersion));
    errors.collect(cdk.propertyValidator('patchVersion', cdk.requiredValidator)(properties.patchVersion));
    errors.collect(cdk.propertyValidator('patchVersion', cdk.validateString)(properties.patchVersion));
    errors.collect(cdk.propertyValidator('updatedLatestPatchVersion', cdk.validateString)(properties.updatedLatestPatchVersion));
    return errors.wrap('supplied properties not correct for "CfnPackageVersionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Panorama::PackageVersion` resource
 *
 * @param properties - the TypeScript properties of a `CfnPackageVersionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Panorama::PackageVersion` resource.
 */
// @ts-ignore TS6133
function cfnPackageVersionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPackageVersionPropsValidator(properties).assertSuccess();
    return {
        PackageId: cdk.stringToCloudFormation(properties.packageId),
        PackageVersion: cdk.stringToCloudFormation(properties.packageVersion),
        PatchVersion: cdk.stringToCloudFormation(properties.patchVersion),
        MarkLatest: cdk.booleanToCloudFormation(properties.markLatest),
        OwnerAccount: cdk.stringToCloudFormation(properties.ownerAccount),
        UpdatedLatestPatchVersion: cdk.stringToCloudFormation(properties.updatedLatestPatchVersion),
    };
}

// @ts-ignore TS6133
function CfnPackageVersionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPackageVersionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPackageVersionProps>();
    ret.addPropertyResult('packageId', 'PackageId', cfn_parse.FromCloudFormation.getString(properties.PackageId));
    ret.addPropertyResult('packageVersion', 'PackageVersion', cfn_parse.FromCloudFormation.getString(properties.PackageVersion));
    ret.addPropertyResult('patchVersion', 'PatchVersion', cfn_parse.FromCloudFormation.getString(properties.PatchVersion));
    ret.addPropertyResult('markLatest', 'MarkLatest', properties.MarkLatest != null ? cfn_parse.FromCloudFormation.getBoolean(properties.MarkLatest) : undefined);
    ret.addPropertyResult('ownerAccount', 'OwnerAccount', properties.OwnerAccount != null ? cfn_parse.FromCloudFormation.getString(properties.OwnerAccount) : undefined);
    ret.addPropertyResult('updatedLatestPatchVersion', 'UpdatedLatestPatchVersion', properties.UpdatedLatestPatchVersion != null ? cfn_parse.FromCloudFormation.getString(properties.UpdatedLatestPatchVersion) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Panorama::PackageVersion`
 *
 * Registers a package version.
 *
 * @cloudformationResource AWS::Panorama::PackageVersion
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html
 */
export class CfnPackageVersion extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Panorama::PackageVersion";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnPackageVersion {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnPackageVersionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnPackageVersion(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Whether the package version is the latest version.
     * @cloudformationAttribute IsLatestPatch
     */
    public readonly attrIsLatestPatch: cdk.IResolvable;

    /**
     * The package version's ARN.
     * @cloudformationAttribute PackageArn
     */
    public readonly attrPackageArn: string;

    /**
     * The package version's name.
     * @cloudformationAttribute PackageName
     */
    public readonly attrPackageName: string;

    /**
     * The package version's registered time.
     * @cloudformationAttribute RegisteredTime
     */
    public readonly attrRegisteredTime: number;

    /**
     * The package version's status.
     * @cloudformationAttribute Status
     */
    public readonly attrStatus: string;

    /**
     * The package version's status description.
     * @cloudformationAttribute StatusDescription
     */
    public readonly attrStatusDescription: string;

    /**
     * A package ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html#cfn-panorama-packageversion-packageid
     */
    public packageId: string;

    /**
     * A package version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html#cfn-panorama-packageversion-packageversion
     */
    public packageVersion: string;

    /**
     * A patch version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html#cfn-panorama-packageversion-patchversion
     */
    public patchVersion: string;

    /**
     * Whether to mark the new version as the latest version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html#cfn-panorama-packageversion-marklatest
     */
    public markLatest: boolean | cdk.IResolvable | undefined;

    /**
     * An owner account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html#cfn-panorama-packageversion-owneraccount
     */
    public ownerAccount: string | undefined;

    /**
     * If the version was marked latest, the new version to maker as latest.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html#cfn-panorama-packageversion-updatedlatestpatchversion
     */
    public updatedLatestPatchVersion: string | undefined;

    /**
     * Create a new `AWS::Panorama::PackageVersion`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPackageVersionProps) {
        super(scope, id, { type: CfnPackageVersion.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'packageId', this);
        cdk.requireProperty(props, 'packageVersion', this);
        cdk.requireProperty(props, 'patchVersion', this);
        this.attrIsLatestPatch = this.getAtt('IsLatestPatch');
        this.attrPackageArn = cdk.Token.asString(this.getAtt('PackageArn'));
        this.attrPackageName = cdk.Token.asString(this.getAtt('PackageName'));
        this.attrRegisteredTime = cdk.Token.asNumber(this.getAtt('RegisteredTime'));
        this.attrStatus = cdk.Token.asString(this.getAtt('Status'));
        this.attrStatusDescription = cdk.Token.asString(this.getAtt('StatusDescription'));

        this.packageId = props.packageId;
        this.packageVersion = props.packageVersion;
        this.patchVersion = props.patchVersion;
        this.markLatest = props.markLatest;
        this.ownerAccount = props.ownerAccount;
        this.updatedLatestPatchVersion = props.updatedLatestPatchVersion;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnPackageVersion.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            packageId: this.packageId,
            packageVersion: this.packageVersion,
            patchVersion: this.patchVersion,
            markLatest: this.markLatest,
            ownerAccount: this.ownerAccount,
            updatedLatestPatchVersion: this.updatedLatestPatchVersion,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPackageVersionPropsToCloudFormation(props);
    }
}
