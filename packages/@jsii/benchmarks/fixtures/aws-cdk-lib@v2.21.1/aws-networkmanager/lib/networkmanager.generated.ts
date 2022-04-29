// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.503Z","fingerprint":"M8P2YjQQZ7kpNE/AlLY57gJsLeh/byXN03novkDBhTU="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnCustomerGatewayAssociation`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-customergatewayassociation.html
 */
export interface CfnCustomerGatewayAssociationProps {

    /**
     * The Amazon Resource Name (ARN) of the customer gateway.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-customergatewayassociation.html#cfn-networkmanager-customergatewayassociation-customergatewayarn
     */
    readonly customerGatewayArn: string;

    /**
     * The ID of the device.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-customergatewayassociation.html#cfn-networkmanager-customergatewayassociation-deviceid
     */
    readonly deviceId: string;

    /**
     * The ID of the global network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-customergatewayassociation.html#cfn-networkmanager-customergatewayassociation-globalnetworkid
     */
    readonly globalNetworkId: string;

    /**
     * The ID of the link.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-customergatewayassociation.html#cfn-networkmanager-customergatewayassociation-linkid
     */
    readonly linkId?: string;
}

/**
 * Determine whether the given properties match those of a `CfnCustomerGatewayAssociationProps`
 *
 * @param properties - the TypeScript properties of a `CfnCustomerGatewayAssociationProps`
 *
 * @returns the result of the validation.
 */
function CfnCustomerGatewayAssociationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('customerGatewayArn', cdk.requiredValidator)(properties.customerGatewayArn));
    errors.collect(cdk.propertyValidator('customerGatewayArn', cdk.validateString)(properties.customerGatewayArn));
    errors.collect(cdk.propertyValidator('deviceId', cdk.requiredValidator)(properties.deviceId));
    errors.collect(cdk.propertyValidator('deviceId', cdk.validateString)(properties.deviceId));
    errors.collect(cdk.propertyValidator('globalNetworkId', cdk.requiredValidator)(properties.globalNetworkId));
    errors.collect(cdk.propertyValidator('globalNetworkId', cdk.validateString)(properties.globalNetworkId));
    errors.collect(cdk.propertyValidator('linkId', cdk.validateString)(properties.linkId));
    return errors.wrap('supplied properties not correct for "CfnCustomerGatewayAssociationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::NetworkManager::CustomerGatewayAssociation` resource
 *
 * @param properties - the TypeScript properties of a `CfnCustomerGatewayAssociationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::NetworkManager::CustomerGatewayAssociation` resource.
 */
// @ts-ignore TS6133
function cfnCustomerGatewayAssociationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCustomerGatewayAssociationPropsValidator(properties).assertSuccess();
    return {
        CustomerGatewayArn: cdk.stringToCloudFormation(properties.customerGatewayArn),
        DeviceId: cdk.stringToCloudFormation(properties.deviceId),
        GlobalNetworkId: cdk.stringToCloudFormation(properties.globalNetworkId),
        LinkId: cdk.stringToCloudFormation(properties.linkId),
    };
}

// @ts-ignore TS6133
function CfnCustomerGatewayAssociationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCustomerGatewayAssociationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCustomerGatewayAssociationProps>();
    ret.addPropertyResult('customerGatewayArn', 'CustomerGatewayArn', cfn_parse.FromCloudFormation.getString(properties.CustomerGatewayArn));
    ret.addPropertyResult('deviceId', 'DeviceId', cfn_parse.FromCloudFormation.getString(properties.DeviceId));
    ret.addPropertyResult('globalNetworkId', 'GlobalNetworkId', cfn_parse.FromCloudFormation.getString(properties.GlobalNetworkId));
    ret.addPropertyResult('linkId', 'LinkId', properties.LinkId != null ? cfn_parse.FromCloudFormation.getString(properties.LinkId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::NetworkManager::CustomerGatewayAssociation`
 *
 * Specifies an association between a customer gateway, a device, and optionally, a link. If you specify a link, it must be associated with the specified device. The customer gateway must be connected to a VPN attachment on a transit gateway that's registered in your global network.
 *
 * You cannot associate a customer gateway with more than one device and link.
 *
 * @cloudformationResource AWS::NetworkManager::CustomerGatewayAssociation
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-customergatewayassociation.html
 */
export class CfnCustomerGatewayAssociation extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::NetworkManager::CustomerGatewayAssociation";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnCustomerGatewayAssociation {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnCustomerGatewayAssociationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnCustomerGatewayAssociation(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the customer gateway.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-customergatewayassociation.html#cfn-networkmanager-customergatewayassociation-customergatewayarn
     */
    public customerGatewayArn: string;

    /**
     * The ID of the device.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-customergatewayassociation.html#cfn-networkmanager-customergatewayassociation-deviceid
     */
    public deviceId: string;

    /**
     * The ID of the global network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-customergatewayassociation.html#cfn-networkmanager-customergatewayassociation-globalnetworkid
     */
    public globalNetworkId: string;

    /**
     * The ID of the link.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-customergatewayassociation.html#cfn-networkmanager-customergatewayassociation-linkid
     */
    public linkId: string | undefined;

    /**
     * Create a new `AWS::NetworkManager::CustomerGatewayAssociation`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnCustomerGatewayAssociationProps) {
        super(scope, id, { type: CfnCustomerGatewayAssociation.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'customerGatewayArn', this);
        cdk.requireProperty(props, 'deviceId', this);
        cdk.requireProperty(props, 'globalNetworkId', this);

        this.customerGatewayArn = props.customerGatewayArn;
        this.deviceId = props.deviceId;
        this.globalNetworkId = props.globalNetworkId;
        this.linkId = props.linkId;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnCustomerGatewayAssociation.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            customerGatewayArn: this.customerGatewayArn,
            deviceId: this.deviceId,
            globalNetworkId: this.globalNetworkId,
            linkId: this.linkId,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnCustomerGatewayAssociationPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnDevice`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html
 */
export interface CfnDeviceProps {

    /**
     * The ID of the global network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-globalnetworkid
     */
    readonly globalNetworkId: string;

    /**
     * A description of the device.
     *
     * Constraints: Maximum length of 256 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-description
     */
    readonly description?: string;

    /**
     * The site location.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-location
     */
    readonly location?: CfnDevice.LocationProperty | cdk.IResolvable;

    /**
     * The model of the device.
     *
     * Constraints: Maximum length of 128 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-model
     */
    readonly model?: string;

    /**
     * The serial number of the device.
     *
     * Constraints: Maximum length of 128 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-serialnumber
     */
    readonly serialNumber?: string;

    /**
     * The site ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-siteid
     */
    readonly siteId?: string;

    /**
     * The tags for the device.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The device type.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-type
     */
    readonly type?: string;

    /**
     * The vendor of the device.
     *
     * Constraints: Maximum length of 128 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-vendor
     */
    readonly vendor?: string;
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
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('globalNetworkId', cdk.requiredValidator)(properties.globalNetworkId));
    errors.collect(cdk.propertyValidator('globalNetworkId', cdk.validateString)(properties.globalNetworkId));
    errors.collect(cdk.propertyValidator('location', CfnDevice_LocationPropertyValidator)(properties.location));
    errors.collect(cdk.propertyValidator('model', cdk.validateString)(properties.model));
    errors.collect(cdk.propertyValidator('serialNumber', cdk.validateString)(properties.serialNumber));
    errors.collect(cdk.propertyValidator('siteId', cdk.validateString)(properties.siteId));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    errors.collect(cdk.propertyValidator('vendor', cdk.validateString)(properties.vendor));
    return errors.wrap('supplied properties not correct for "CfnDeviceProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::NetworkManager::Device` resource
 *
 * @param properties - the TypeScript properties of a `CfnDeviceProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::NetworkManager::Device` resource.
 */
// @ts-ignore TS6133
function cfnDevicePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDevicePropsValidator(properties).assertSuccess();
    return {
        GlobalNetworkId: cdk.stringToCloudFormation(properties.globalNetworkId),
        Description: cdk.stringToCloudFormation(properties.description),
        Location: cfnDeviceLocationPropertyToCloudFormation(properties.location),
        Model: cdk.stringToCloudFormation(properties.model),
        SerialNumber: cdk.stringToCloudFormation(properties.serialNumber),
        SiteId: cdk.stringToCloudFormation(properties.siteId),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        Type: cdk.stringToCloudFormation(properties.type),
        Vendor: cdk.stringToCloudFormation(properties.vendor),
    };
}

// @ts-ignore TS6133
function CfnDevicePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDeviceProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDeviceProps>();
    ret.addPropertyResult('globalNetworkId', 'GlobalNetworkId', cfn_parse.FromCloudFormation.getString(properties.GlobalNetworkId));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('location', 'Location', properties.Location != null ? CfnDeviceLocationPropertyFromCloudFormation(properties.Location) : undefined);
    ret.addPropertyResult('model', 'Model', properties.Model != null ? cfn_parse.FromCloudFormation.getString(properties.Model) : undefined);
    ret.addPropertyResult('serialNumber', 'SerialNumber', properties.SerialNumber != null ? cfn_parse.FromCloudFormation.getString(properties.SerialNumber) : undefined);
    ret.addPropertyResult('siteId', 'SiteId', properties.SiteId != null ? cfn_parse.FromCloudFormation.getString(properties.SiteId) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addPropertyResult('vendor', 'Vendor', properties.Vendor != null ? cfn_parse.FromCloudFormation.getString(properties.Vendor) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::NetworkManager::Device`
 *
 * Specifies a device.
 *
 * @cloudformationResource AWS::NetworkManager::Device
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html
 */
export class CfnDevice extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::NetworkManager::Device";

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
     * The ARN of the device. For example, `arn:aws:networkmanager::123456789012:device/global-network-01231231231231231/device-07f6fd08867abc123` .
     * @cloudformationAttribute DeviceArn
     */
    public readonly attrDeviceArn: string;

    /**
     * The ID of the device. For example, `device-07f6fd08867abc123` .
     * @cloudformationAttribute DeviceId
     */
    public readonly attrDeviceId: string;

    /**
     * The ID of the global network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-globalnetworkid
     */
    public globalNetworkId: string;

    /**
     * A description of the device.
     *
     * Constraints: Maximum length of 256 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-description
     */
    public description: string | undefined;

    /**
     * The site location.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-location
     */
    public location: CfnDevice.LocationProperty | cdk.IResolvable | undefined;

    /**
     * The model of the device.
     *
     * Constraints: Maximum length of 128 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-model
     */
    public model: string | undefined;

    /**
     * The serial number of the device.
     *
     * Constraints: Maximum length of 128 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-serialnumber
     */
    public serialNumber: string | undefined;

    /**
     * The site ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-siteid
     */
    public siteId: string | undefined;

    /**
     * The tags for the device.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The device type.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-type
     */
    public type: string | undefined;

    /**
     * The vendor of the device.
     *
     * Constraints: Maximum length of 128 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-device.html#cfn-networkmanager-device-vendor
     */
    public vendor: string | undefined;

    /**
     * Create a new `AWS::NetworkManager::Device`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDeviceProps) {
        super(scope, id, { type: CfnDevice.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'globalNetworkId', this);
        this.attrDeviceArn = cdk.Token.asString(this.getAtt('DeviceArn'));
        this.attrDeviceId = cdk.Token.asString(this.getAtt('DeviceId'));

        this.globalNetworkId = props.globalNetworkId;
        this.description = props.description;
        this.location = props.location;
        this.model = props.model;
        this.serialNumber = props.serialNumber;
        this.siteId = props.siteId;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::NetworkManager::Device", props.tags, { tagPropertyName: 'tags' });
        this.type = props.type;
        this.vendor = props.vendor;
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
            globalNetworkId: this.globalNetworkId,
            description: this.description,
            location: this.location,
            model: this.model,
            serialNumber: this.serialNumber,
            siteId: this.siteId,
            tags: this.tags.renderTags(),
            type: this.type,
            vendor: this.vendor,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDevicePropsToCloudFormation(props);
    }
}

export namespace CfnDevice {
    /**
     * Describes a location.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-networkmanager-device-location.html
     */
    export interface LocationProperty {
        /**
         * The physical address.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-networkmanager-device-location.html#cfn-networkmanager-device-location-address
         */
        readonly address?: string;
        /**
         * The latitude.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-networkmanager-device-location.html#cfn-networkmanager-device-location-latitude
         */
        readonly latitude?: string;
        /**
         * The longitude.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-networkmanager-device-location.html#cfn-networkmanager-device-location-longitude
         */
        readonly longitude?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LocationProperty`
 *
 * @param properties - the TypeScript properties of a `LocationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDevice_LocationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('address', cdk.validateString)(properties.address));
    errors.collect(cdk.propertyValidator('latitude', cdk.validateString)(properties.latitude));
    errors.collect(cdk.propertyValidator('longitude', cdk.validateString)(properties.longitude));
    return errors.wrap('supplied properties not correct for "LocationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::NetworkManager::Device.Location` resource
 *
 * @param properties - the TypeScript properties of a `LocationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::NetworkManager::Device.Location` resource.
 */
// @ts-ignore TS6133
function cfnDeviceLocationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDevice_LocationPropertyValidator(properties).assertSuccess();
    return {
        Address: cdk.stringToCloudFormation(properties.address),
        Latitude: cdk.stringToCloudFormation(properties.latitude),
        Longitude: cdk.stringToCloudFormation(properties.longitude),
    };
}

// @ts-ignore TS6133
function CfnDeviceLocationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDevice.LocationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDevice.LocationProperty>();
    ret.addPropertyResult('address', 'Address', properties.Address != null ? cfn_parse.FromCloudFormation.getString(properties.Address) : undefined);
    ret.addPropertyResult('latitude', 'Latitude', properties.Latitude != null ? cfn_parse.FromCloudFormation.getString(properties.Latitude) : undefined);
    ret.addPropertyResult('longitude', 'Longitude', properties.Longitude != null ? cfn_parse.FromCloudFormation.getString(properties.Longitude) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnGlobalNetwork`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-globalnetwork.html
 */
export interface CfnGlobalNetworkProps {

    /**
     * A description of the global network.
     *
     * Constraints: Maximum length of 256 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-globalnetwork.html#cfn-networkmanager-globalnetwork-description
     */
    readonly description?: string;

    /**
     * The tags for the global network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-globalnetwork.html#cfn-networkmanager-globalnetwork-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnGlobalNetworkProps`
 *
 * @param properties - the TypeScript properties of a `CfnGlobalNetworkProps`
 *
 * @returns the result of the validation.
 */
function CfnGlobalNetworkPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnGlobalNetworkProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::NetworkManager::GlobalNetwork` resource
 *
 * @param properties - the TypeScript properties of a `CfnGlobalNetworkProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::NetworkManager::GlobalNetwork` resource.
 */
// @ts-ignore TS6133
function cfnGlobalNetworkPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGlobalNetworkPropsValidator(properties).assertSuccess();
    return {
        Description: cdk.stringToCloudFormation(properties.description),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnGlobalNetworkPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGlobalNetworkProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGlobalNetworkProps>();
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::NetworkManager::GlobalNetwork`
 *
 * Creates a new, empty global network.
 *
 * @cloudformationResource AWS::NetworkManager::GlobalNetwork
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-globalnetwork.html
 */
export class CfnGlobalNetwork extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::NetworkManager::GlobalNetwork";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnGlobalNetwork {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnGlobalNetworkPropsFromCloudFormation(resourceProperties);
        const ret = new CfnGlobalNetwork(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the global network. For example, `arn:aws:networkmanager::123456789012:global-network/global-network-01231231231231231` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The ID of the global network. For example, `global-network-01231231231231231` .
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * A description of the global network.
     *
     * Constraints: Maximum length of 256 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-globalnetwork.html#cfn-networkmanager-globalnetwork-description
     */
    public description: string | undefined;

    /**
     * The tags for the global network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-globalnetwork.html#cfn-networkmanager-globalnetwork-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::NetworkManager::GlobalNetwork`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnGlobalNetworkProps = {}) {
        super(scope, id, { type: CfnGlobalNetwork.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.description = props.description;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::NetworkManager::GlobalNetwork", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnGlobalNetwork.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            description: this.description,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnGlobalNetworkPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnLink`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html
 */
export interface CfnLinkProps {

    /**
     * The bandwidth for the link.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html#cfn-networkmanager-link-bandwidth
     */
    readonly bandwidth: CfnLink.BandwidthProperty | cdk.IResolvable;

    /**
     * The ID of the global network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html#cfn-networkmanager-link-globalnetworkid
     */
    readonly globalNetworkId: string;

    /**
     * The ID of the site.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html#cfn-networkmanager-link-siteid
     */
    readonly siteId: string;

    /**
     * A description of the link.
     *
     * Constraints: Maximum length of 256 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html#cfn-networkmanager-link-description
     */
    readonly description?: string;

    /**
     * The provider of the link.
     *
     * Constraints: Maximum length of 128 characters. Cannot include the following characters: | \ ^
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html#cfn-networkmanager-link-provider
     */
    readonly provider?: string;

    /**
     * The tags for the link.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html#cfn-networkmanager-link-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The type of the link.
     *
     * Constraints: Maximum length of 128 characters. Cannot include the following characters: | \ ^
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html#cfn-networkmanager-link-type
     */
    readonly type?: string;
}

/**
 * Determine whether the given properties match those of a `CfnLinkProps`
 *
 * @param properties - the TypeScript properties of a `CfnLinkProps`
 *
 * @returns the result of the validation.
 */
function CfnLinkPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bandwidth', cdk.requiredValidator)(properties.bandwidth));
    errors.collect(cdk.propertyValidator('bandwidth', CfnLink_BandwidthPropertyValidator)(properties.bandwidth));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('globalNetworkId', cdk.requiredValidator)(properties.globalNetworkId));
    errors.collect(cdk.propertyValidator('globalNetworkId', cdk.validateString)(properties.globalNetworkId));
    errors.collect(cdk.propertyValidator('provider', cdk.validateString)(properties.provider));
    errors.collect(cdk.propertyValidator('siteId', cdk.requiredValidator)(properties.siteId));
    errors.collect(cdk.propertyValidator('siteId', cdk.validateString)(properties.siteId));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "CfnLinkProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::NetworkManager::Link` resource
 *
 * @param properties - the TypeScript properties of a `CfnLinkProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::NetworkManager::Link` resource.
 */
// @ts-ignore TS6133
function cfnLinkPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnLinkPropsValidator(properties).assertSuccess();
    return {
        Bandwidth: cfnLinkBandwidthPropertyToCloudFormation(properties.bandwidth),
        GlobalNetworkId: cdk.stringToCloudFormation(properties.globalNetworkId),
        SiteId: cdk.stringToCloudFormation(properties.siteId),
        Description: cdk.stringToCloudFormation(properties.description),
        Provider: cdk.stringToCloudFormation(properties.provider),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnLinkPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnLinkProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnLinkProps>();
    ret.addPropertyResult('bandwidth', 'Bandwidth', CfnLinkBandwidthPropertyFromCloudFormation(properties.Bandwidth));
    ret.addPropertyResult('globalNetworkId', 'GlobalNetworkId', cfn_parse.FromCloudFormation.getString(properties.GlobalNetworkId));
    ret.addPropertyResult('siteId', 'SiteId', cfn_parse.FromCloudFormation.getString(properties.SiteId));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('provider', 'Provider', properties.Provider != null ? cfn_parse.FromCloudFormation.getString(properties.Provider) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::NetworkManager::Link`
 *
 * Specifies a link for a site.
 *
 * @cloudformationResource AWS::NetworkManager::Link
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html
 */
export class CfnLink extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::NetworkManager::Link";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnLink {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnLinkPropsFromCloudFormation(resourceProperties);
        const ret = new CfnLink(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the link. For example, `arn:aws:networkmanager::123456789012:link/global-network-01231231231231231/link-11112222aaaabbbb1` .
     * @cloudformationAttribute LinkArn
     */
    public readonly attrLinkArn: string;

    /**
     * The ID of the link. For example, `link-11112222aaaabbbb1` .
     * @cloudformationAttribute LinkId
     */
    public readonly attrLinkId: string;

    /**
     * The bandwidth for the link.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html#cfn-networkmanager-link-bandwidth
     */
    public bandwidth: CfnLink.BandwidthProperty | cdk.IResolvable;

    /**
     * The ID of the global network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html#cfn-networkmanager-link-globalnetworkid
     */
    public globalNetworkId: string;

    /**
     * The ID of the site.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html#cfn-networkmanager-link-siteid
     */
    public siteId: string;

    /**
     * A description of the link.
     *
     * Constraints: Maximum length of 256 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html#cfn-networkmanager-link-description
     */
    public description: string | undefined;

    /**
     * The provider of the link.
     *
     * Constraints: Maximum length of 128 characters. Cannot include the following characters: | \ ^
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html#cfn-networkmanager-link-provider
     */
    public provider: string | undefined;

    /**
     * The tags for the link.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html#cfn-networkmanager-link-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The type of the link.
     *
     * Constraints: Maximum length of 128 characters. Cannot include the following characters: | \ ^
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-link.html#cfn-networkmanager-link-type
     */
    public type: string | undefined;

    /**
     * Create a new `AWS::NetworkManager::Link`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnLinkProps) {
        super(scope, id, { type: CfnLink.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'bandwidth', this);
        cdk.requireProperty(props, 'globalNetworkId', this);
        cdk.requireProperty(props, 'siteId', this);
        this.attrLinkArn = cdk.Token.asString(this.getAtt('LinkArn'));
        this.attrLinkId = cdk.Token.asString(this.getAtt('LinkId'));

        this.bandwidth = props.bandwidth;
        this.globalNetworkId = props.globalNetworkId;
        this.siteId = props.siteId;
        this.description = props.description;
        this.provider = props.provider;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::NetworkManager::Link", props.tags, { tagPropertyName: 'tags' });
        this.type = props.type;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnLink.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            bandwidth: this.bandwidth,
            globalNetworkId: this.globalNetworkId,
            siteId: this.siteId,
            description: this.description,
            provider: this.provider,
            tags: this.tags.renderTags(),
            type: this.type,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnLinkPropsToCloudFormation(props);
    }
}

export namespace CfnLink {
    /**
     * Describes bandwidth information.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-networkmanager-link-bandwidth.html
     */
    export interface BandwidthProperty {
        /**
         * Download speed in Mbps.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-networkmanager-link-bandwidth.html#cfn-networkmanager-link-bandwidth-downloadspeed
         */
        readonly downloadSpeed?: number;
        /**
         * Upload speed in Mbps.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-networkmanager-link-bandwidth.html#cfn-networkmanager-link-bandwidth-uploadspeed
         */
        readonly uploadSpeed?: number;
    }
}

/**
 * Determine whether the given properties match those of a `BandwidthProperty`
 *
 * @param properties - the TypeScript properties of a `BandwidthProperty`
 *
 * @returns the result of the validation.
 */
function CfnLink_BandwidthPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('downloadSpeed', cdk.validateNumber)(properties.downloadSpeed));
    errors.collect(cdk.propertyValidator('uploadSpeed', cdk.validateNumber)(properties.uploadSpeed));
    return errors.wrap('supplied properties not correct for "BandwidthProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::NetworkManager::Link.Bandwidth` resource
 *
 * @param properties - the TypeScript properties of a `BandwidthProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::NetworkManager::Link.Bandwidth` resource.
 */
// @ts-ignore TS6133
function cfnLinkBandwidthPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnLink_BandwidthPropertyValidator(properties).assertSuccess();
    return {
        DownloadSpeed: cdk.numberToCloudFormation(properties.downloadSpeed),
        UploadSpeed: cdk.numberToCloudFormation(properties.uploadSpeed),
    };
}

// @ts-ignore TS6133
function CfnLinkBandwidthPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnLink.BandwidthProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnLink.BandwidthProperty>();
    ret.addPropertyResult('downloadSpeed', 'DownloadSpeed', properties.DownloadSpeed != null ? cfn_parse.FromCloudFormation.getNumber(properties.DownloadSpeed) : undefined);
    ret.addPropertyResult('uploadSpeed', 'UploadSpeed', properties.UploadSpeed != null ? cfn_parse.FromCloudFormation.getNumber(properties.UploadSpeed) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnLinkAssociation`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-linkassociation.html
 */
export interface CfnLinkAssociationProps {

    /**
     * The device ID for the link association.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-linkassociation.html#cfn-networkmanager-linkassociation-deviceid
     */
    readonly deviceId: string;

    /**
     * The ID of the global network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-linkassociation.html#cfn-networkmanager-linkassociation-globalnetworkid
     */
    readonly globalNetworkId: string;

    /**
     * The ID of the link.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-linkassociation.html#cfn-networkmanager-linkassociation-linkid
     */
    readonly linkId: string;
}

/**
 * Determine whether the given properties match those of a `CfnLinkAssociationProps`
 *
 * @param properties - the TypeScript properties of a `CfnLinkAssociationProps`
 *
 * @returns the result of the validation.
 */
function CfnLinkAssociationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('deviceId', cdk.requiredValidator)(properties.deviceId));
    errors.collect(cdk.propertyValidator('deviceId', cdk.validateString)(properties.deviceId));
    errors.collect(cdk.propertyValidator('globalNetworkId', cdk.requiredValidator)(properties.globalNetworkId));
    errors.collect(cdk.propertyValidator('globalNetworkId', cdk.validateString)(properties.globalNetworkId));
    errors.collect(cdk.propertyValidator('linkId', cdk.requiredValidator)(properties.linkId));
    errors.collect(cdk.propertyValidator('linkId', cdk.validateString)(properties.linkId));
    return errors.wrap('supplied properties not correct for "CfnLinkAssociationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::NetworkManager::LinkAssociation` resource
 *
 * @param properties - the TypeScript properties of a `CfnLinkAssociationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::NetworkManager::LinkAssociation` resource.
 */
// @ts-ignore TS6133
function cfnLinkAssociationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnLinkAssociationPropsValidator(properties).assertSuccess();
    return {
        DeviceId: cdk.stringToCloudFormation(properties.deviceId),
        GlobalNetworkId: cdk.stringToCloudFormation(properties.globalNetworkId),
        LinkId: cdk.stringToCloudFormation(properties.linkId),
    };
}

// @ts-ignore TS6133
function CfnLinkAssociationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnLinkAssociationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnLinkAssociationProps>();
    ret.addPropertyResult('deviceId', 'DeviceId', cfn_parse.FromCloudFormation.getString(properties.DeviceId));
    ret.addPropertyResult('globalNetworkId', 'GlobalNetworkId', cfn_parse.FromCloudFormation.getString(properties.GlobalNetworkId));
    ret.addPropertyResult('linkId', 'LinkId', cfn_parse.FromCloudFormation.getString(properties.LinkId));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::NetworkManager::LinkAssociation`
 *
 * Specifies the association between a device and a link. A device can be associated to multiple links and a link can be associated to multiple devices. The device and link must be in the same global network and the same site.
 *
 * @cloudformationResource AWS::NetworkManager::LinkAssociation
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-linkassociation.html
 */
export class CfnLinkAssociation extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::NetworkManager::LinkAssociation";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnLinkAssociation {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnLinkAssociationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnLinkAssociation(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The device ID for the link association.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-linkassociation.html#cfn-networkmanager-linkassociation-deviceid
     */
    public deviceId: string;

    /**
     * The ID of the global network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-linkassociation.html#cfn-networkmanager-linkassociation-globalnetworkid
     */
    public globalNetworkId: string;

    /**
     * The ID of the link.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-linkassociation.html#cfn-networkmanager-linkassociation-linkid
     */
    public linkId: string;

    /**
     * Create a new `AWS::NetworkManager::LinkAssociation`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnLinkAssociationProps) {
        super(scope, id, { type: CfnLinkAssociation.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'deviceId', this);
        cdk.requireProperty(props, 'globalNetworkId', this);
        cdk.requireProperty(props, 'linkId', this);

        this.deviceId = props.deviceId;
        this.globalNetworkId = props.globalNetworkId;
        this.linkId = props.linkId;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnLinkAssociation.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            deviceId: this.deviceId,
            globalNetworkId: this.globalNetworkId,
            linkId: this.linkId,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnLinkAssociationPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnSite`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-site.html
 */
export interface CfnSiteProps {

    /**
     * The ID of the global network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-site.html#cfn-networkmanager-site-globalnetworkid
     */
    readonly globalNetworkId: string;

    /**
     * A description of your site.
     *
     * Constraints: Maximum length of 256 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-site.html#cfn-networkmanager-site-description
     */
    readonly description?: string;

    /**
     * The site location. This information is used for visualization in the Network Manager console. If you specify the address, the latitude and longitude are automatically calculated.
     *
     * - `Address` : The physical address of the site.
     * - `Latitude` : The latitude of the site.
     * - `Longitude` : The longitude of the site.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-site.html#cfn-networkmanager-site-location
     */
    readonly location?: CfnSite.LocationProperty | cdk.IResolvable;

    /**
     * The tags for the site.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-site.html#cfn-networkmanager-site-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnSiteProps`
 *
 * @param properties - the TypeScript properties of a `CfnSiteProps`
 *
 * @returns the result of the validation.
 */
function CfnSitePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('globalNetworkId', cdk.requiredValidator)(properties.globalNetworkId));
    errors.collect(cdk.propertyValidator('globalNetworkId', cdk.validateString)(properties.globalNetworkId));
    errors.collect(cdk.propertyValidator('location', CfnSite_LocationPropertyValidator)(properties.location));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnSiteProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::NetworkManager::Site` resource
 *
 * @param properties - the TypeScript properties of a `CfnSiteProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::NetworkManager::Site` resource.
 */
// @ts-ignore TS6133
function cfnSitePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSitePropsValidator(properties).assertSuccess();
    return {
        GlobalNetworkId: cdk.stringToCloudFormation(properties.globalNetworkId),
        Description: cdk.stringToCloudFormation(properties.description),
        Location: cfnSiteLocationPropertyToCloudFormation(properties.location),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnSitePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSiteProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSiteProps>();
    ret.addPropertyResult('globalNetworkId', 'GlobalNetworkId', cfn_parse.FromCloudFormation.getString(properties.GlobalNetworkId));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('location', 'Location', properties.Location != null ? CfnSiteLocationPropertyFromCloudFormation(properties.Location) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::NetworkManager::Site`
 *
 * Specifies a site in a global network.
 *
 * @cloudformationResource AWS::NetworkManager::Site
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-site.html
 */
export class CfnSite extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::NetworkManager::Site";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnSite {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnSitePropsFromCloudFormation(resourceProperties);
        const ret = new CfnSite(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the site. For example, `arn:aws:networkmanager::123456789012:site/global-network-01231231231231231/site-444555aaabbb11223` .
     * @cloudformationAttribute SiteArn
     */
    public readonly attrSiteArn: string;

    /**
     * The ID of the site. For example, `site-444555aaabbb11223` .
     * @cloudformationAttribute SiteId
     */
    public readonly attrSiteId: string;

    /**
     * The ID of the global network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-site.html#cfn-networkmanager-site-globalnetworkid
     */
    public globalNetworkId: string;

    /**
     * A description of your site.
     *
     * Constraints: Maximum length of 256 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-site.html#cfn-networkmanager-site-description
     */
    public description: string | undefined;

    /**
     * The site location. This information is used for visualization in the Network Manager console. If you specify the address, the latitude and longitude are automatically calculated.
     *
     * - `Address` : The physical address of the site.
     * - `Latitude` : The latitude of the site.
     * - `Longitude` : The longitude of the site.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-site.html#cfn-networkmanager-site-location
     */
    public location: CfnSite.LocationProperty | cdk.IResolvable | undefined;

    /**
     * The tags for the site.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-site.html#cfn-networkmanager-site-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::NetworkManager::Site`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnSiteProps) {
        super(scope, id, { type: CfnSite.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'globalNetworkId', this);
        this.attrSiteArn = cdk.Token.asString(this.getAtt('SiteArn'));
        this.attrSiteId = cdk.Token.asString(this.getAtt('SiteId'));

        this.globalNetworkId = props.globalNetworkId;
        this.description = props.description;
        this.location = props.location;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::NetworkManager::Site", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnSite.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            globalNetworkId: this.globalNetworkId,
            description: this.description,
            location: this.location,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnSitePropsToCloudFormation(props);
    }
}

export namespace CfnSite {
    /**
     * Describes a location.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-networkmanager-site-location.html
     */
    export interface LocationProperty {
        /**
         * The physical address.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-networkmanager-site-location.html#cfn-networkmanager-site-location-address
         */
        readonly address?: string;
        /**
         * The latitude.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-networkmanager-site-location.html#cfn-networkmanager-site-location-latitude
         */
        readonly latitude?: string;
        /**
         * The longitude.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-networkmanager-site-location.html#cfn-networkmanager-site-location-longitude
         */
        readonly longitude?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LocationProperty`
 *
 * @param properties - the TypeScript properties of a `LocationProperty`
 *
 * @returns the result of the validation.
 */
function CfnSite_LocationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('address', cdk.validateString)(properties.address));
    errors.collect(cdk.propertyValidator('latitude', cdk.validateString)(properties.latitude));
    errors.collect(cdk.propertyValidator('longitude', cdk.validateString)(properties.longitude));
    return errors.wrap('supplied properties not correct for "LocationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::NetworkManager::Site.Location` resource
 *
 * @param properties - the TypeScript properties of a `LocationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::NetworkManager::Site.Location` resource.
 */
// @ts-ignore TS6133
function cfnSiteLocationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSite_LocationPropertyValidator(properties).assertSuccess();
    return {
        Address: cdk.stringToCloudFormation(properties.address),
        Latitude: cdk.stringToCloudFormation(properties.latitude),
        Longitude: cdk.stringToCloudFormation(properties.longitude),
    };
}

// @ts-ignore TS6133
function CfnSiteLocationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSite.LocationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSite.LocationProperty>();
    ret.addPropertyResult('address', 'Address', properties.Address != null ? cfn_parse.FromCloudFormation.getString(properties.Address) : undefined);
    ret.addPropertyResult('latitude', 'Latitude', properties.Latitude != null ? cfn_parse.FromCloudFormation.getString(properties.Latitude) : undefined);
    ret.addPropertyResult('longitude', 'Longitude', properties.Longitude != null ? cfn_parse.FromCloudFormation.getString(properties.Longitude) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnTransitGatewayRegistration`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-transitgatewayregistration.html
 */
export interface CfnTransitGatewayRegistrationProps {

    /**
     * The ID of the global network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-transitgatewayregistration.html#cfn-networkmanager-transitgatewayregistration-globalnetworkid
     */
    readonly globalNetworkId: string;

    /**
     * The Amazon Resource Name (ARN) of the transit gateway.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-transitgatewayregistration.html#cfn-networkmanager-transitgatewayregistration-transitgatewayarn
     */
    readonly transitGatewayArn: string;
}

/**
 * Determine whether the given properties match those of a `CfnTransitGatewayRegistrationProps`
 *
 * @param properties - the TypeScript properties of a `CfnTransitGatewayRegistrationProps`
 *
 * @returns the result of the validation.
 */
function CfnTransitGatewayRegistrationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('globalNetworkId', cdk.requiredValidator)(properties.globalNetworkId));
    errors.collect(cdk.propertyValidator('globalNetworkId', cdk.validateString)(properties.globalNetworkId));
    errors.collect(cdk.propertyValidator('transitGatewayArn', cdk.requiredValidator)(properties.transitGatewayArn));
    errors.collect(cdk.propertyValidator('transitGatewayArn', cdk.validateString)(properties.transitGatewayArn));
    return errors.wrap('supplied properties not correct for "CfnTransitGatewayRegistrationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::NetworkManager::TransitGatewayRegistration` resource
 *
 * @param properties - the TypeScript properties of a `CfnTransitGatewayRegistrationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::NetworkManager::TransitGatewayRegistration` resource.
 */
// @ts-ignore TS6133
function cfnTransitGatewayRegistrationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTransitGatewayRegistrationPropsValidator(properties).assertSuccess();
    return {
        GlobalNetworkId: cdk.stringToCloudFormation(properties.globalNetworkId),
        TransitGatewayArn: cdk.stringToCloudFormation(properties.transitGatewayArn),
    };
}

// @ts-ignore TS6133
function CfnTransitGatewayRegistrationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTransitGatewayRegistrationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTransitGatewayRegistrationProps>();
    ret.addPropertyResult('globalNetworkId', 'GlobalNetworkId', cfn_parse.FromCloudFormation.getString(properties.GlobalNetworkId));
    ret.addPropertyResult('transitGatewayArn', 'TransitGatewayArn', cfn_parse.FromCloudFormation.getString(properties.TransitGatewayArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::NetworkManager::TransitGatewayRegistration`
 *
 * Registers a transit gateway in your global network. The transit gateway can be in any AWS Region , but it must be owned by the same AWS account that owns the global network. You cannot register a transit gateway in more than one global network.
 *
 * @cloudformationResource AWS::NetworkManager::TransitGatewayRegistration
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-transitgatewayregistration.html
 */
export class CfnTransitGatewayRegistration extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::NetworkManager::TransitGatewayRegistration";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnTransitGatewayRegistration {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnTransitGatewayRegistrationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnTransitGatewayRegistration(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ID of the global network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-transitgatewayregistration.html#cfn-networkmanager-transitgatewayregistration-globalnetworkid
     */
    public globalNetworkId: string;

    /**
     * The Amazon Resource Name (ARN) of the transit gateway.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-transitgatewayregistration.html#cfn-networkmanager-transitgatewayregistration-transitgatewayarn
     */
    public transitGatewayArn: string;

    /**
     * Create a new `AWS::NetworkManager::TransitGatewayRegistration`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnTransitGatewayRegistrationProps) {
        super(scope, id, { type: CfnTransitGatewayRegistration.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'globalNetworkId', this);
        cdk.requireProperty(props, 'transitGatewayArn', this);

        this.globalNetworkId = props.globalNetworkId;
        this.transitGatewayArn = props.transitGatewayArn;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnTransitGatewayRegistration.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            globalNetworkId: this.globalNetworkId,
            transitGatewayArn: this.transitGatewayArn,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnTransitGatewayRegistrationPropsToCloudFormation(props);
    }
}
