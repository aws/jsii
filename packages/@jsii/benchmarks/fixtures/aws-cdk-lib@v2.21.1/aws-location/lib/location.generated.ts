// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.228Z","fingerprint":"KgbwtB2hoFq8ZFvV4MgmO79qGmBZaDoBaxpJewZy6fI="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnGeofenceCollection`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-geofencecollection.html
 */
export interface CfnGeofenceCollectionProps {

    /**
     * The name for the geofence collection.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-geofencecollection.html#cfn-location-geofencecollection-collectionname
     */
    readonly collectionName: string;

    /**
     * An optional description for the geofence collection.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-geofencecollection.html#cfn-location-geofencecollection-description
     */
    readonly description?: string;

    /**
     * A key identifier for an [AWS KMS customer managed key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html) . Enter a key ID, key ARN, alias name, or alias ARN.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-geofencecollection.html#cfn-location-geofencecollection-kmskeyid
     */
    readonly kmsKeyId?: string;

    /**
     * No longer used. If included, the only allowed value is `RequestBasedUsage` .
     *
     * *Allowed Values* : `RequestBasedUsage`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-geofencecollection.html#cfn-location-geofencecollection-pricingplan
     */
    readonly pricingPlan?: string;

    /**
     * This parameter is no longer used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-geofencecollection.html#cfn-location-geofencecollection-pricingplandatasource
     */
    readonly pricingPlanDataSource?: string;
}

/**
 * Determine whether the given properties match those of a `CfnGeofenceCollectionProps`
 *
 * @param properties - the TypeScript properties of a `CfnGeofenceCollectionProps`
 *
 * @returns the result of the validation.
 */
function CfnGeofenceCollectionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('collectionName', cdk.requiredValidator)(properties.collectionName));
    errors.collect(cdk.propertyValidator('collectionName', cdk.validateString)(properties.collectionName));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('pricingPlan', cdk.validateString)(properties.pricingPlan));
    errors.collect(cdk.propertyValidator('pricingPlanDataSource', cdk.validateString)(properties.pricingPlanDataSource));
    return errors.wrap('supplied properties not correct for "CfnGeofenceCollectionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Location::GeofenceCollection` resource
 *
 * @param properties - the TypeScript properties of a `CfnGeofenceCollectionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Location::GeofenceCollection` resource.
 */
// @ts-ignore TS6133
function cfnGeofenceCollectionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGeofenceCollectionPropsValidator(properties).assertSuccess();
    return {
        CollectionName: cdk.stringToCloudFormation(properties.collectionName),
        Description: cdk.stringToCloudFormation(properties.description),
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        PricingPlan: cdk.stringToCloudFormation(properties.pricingPlan),
        PricingPlanDataSource: cdk.stringToCloudFormation(properties.pricingPlanDataSource),
    };
}

// @ts-ignore TS6133
function CfnGeofenceCollectionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGeofenceCollectionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGeofenceCollectionProps>();
    ret.addPropertyResult('collectionName', 'CollectionName', cfn_parse.FromCloudFormation.getString(properties.CollectionName));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('pricingPlan', 'PricingPlan', properties.PricingPlan != null ? cfn_parse.FromCloudFormation.getString(properties.PricingPlan) : undefined);
    ret.addPropertyResult('pricingPlanDataSource', 'PricingPlanDataSource', properties.PricingPlanDataSource != null ? cfn_parse.FromCloudFormation.getString(properties.PricingPlanDataSource) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Location::GeofenceCollection`
 *
 * The `AWS::Location::GeofenceCollection` resource specifies the ability to detect and act when a tracked device enters or exits a defined geographical boundary known as a geofence.
 *
 * @cloudformationResource AWS::Location::GeofenceCollection
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-geofencecollection.html
 */
export class CfnGeofenceCollection extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Location::GeofenceCollection";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnGeofenceCollection {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnGeofenceCollectionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnGeofenceCollection(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) for the geofence collection resource. Used when you need to specify a resource across all AWS .
     *
     * - Format example: `arn:aws:geo:region:account-id:geofence-collection/ExampleGeofenceCollection`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * Synonym for `Arn` . The Amazon Resource Name (ARN) for the geofence collection resource. Used when you need to specify a resource across all AWS .
     *
     * - Format example: `arn:aws:geo:region:account-id:geofence-collection/ExampleGeofenceCollection`
     * @cloudformationAttribute CollectionArn
     */
    public readonly attrCollectionArn: string;

    /**
     * The timestamp for when the geofence collection resource was created in [ISO 8601](https://docs.aws.amazon.com/https://www.iso.org/iso-8601-date-and-time-format.html) format: `YYYY-MM-DDThh:mm:ss.sssZ` .
     * @cloudformationAttribute CreateTime
     */
    public readonly attrCreateTime: string;

    /**
     * The timestamp for when the geofence collection resource was last updated in [ISO 8601](https://docs.aws.amazon.com/https://www.iso.org/iso-8601-date-and-time-format.html) format: `YYYY-MM-DDThh:mm:ss.sssZ` .
     * @cloudformationAttribute UpdateTime
     */
    public readonly attrUpdateTime: string;

    /**
     * The name for the geofence collection.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-geofencecollection.html#cfn-location-geofencecollection-collectionname
     */
    public collectionName: string;

    /**
     * An optional description for the geofence collection.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-geofencecollection.html#cfn-location-geofencecollection-description
     */
    public description: string | undefined;

    /**
     * A key identifier for an [AWS KMS customer managed key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html) . Enter a key ID, key ARN, alias name, or alias ARN.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-geofencecollection.html#cfn-location-geofencecollection-kmskeyid
     */
    public kmsKeyId: string | undefined;

    /**
     * No longer used. If included, the only allowed value is `RequestBasedUsage` .
     *
     * *Allowed Values* : `RequestBasedUsage`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-geofencecollection.html#cfn-location-geofencecollection-pricingplan
     */
    public pricingPlan: string | undefined;

    /**
     * This parameter is no longer used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-geofencecollection.html#cfn-location-geofencecollection-pricingplandatasource
     */
    public pricingPlanDataSource: string | undefined;

    /**
     * Create a new `AWS::Location::GeofenceCollection`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnGeofenceCollectionProps) {
        super(scope, id, { type: CfnGeofenceCollection.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'collectionName', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCollectionArn = cdk.Token.asString(this.getAtt('CollectionArn'));
        this.attrCreateTime = cdk.Token.asString(this.getAtt('CreateTime'));
        this.attrUpdateTime = cdk.Token.asString(this.getAtt('UpdateTime'));

        this.collectionName = props.collectionName;
        this.description = props.description;
        this.kmsKeyId = props.kmsKeyId;
        this.pricingPlan = props.pricingPlan;
        this.pricingPlanDataSource = props.pricingPlanDataSource;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnGeofenceCollection.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            collectionName: this.collectionName,
            description: this.description,
            kmsKeyId: this.kmsKeyId,
            pricingPlan: this.pricingPlan,
            pricingPlanDataSource: this.pricingPlanDataSource,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnGeofenceCollectionPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnMap`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-map.html
 */
export interface CfnMapProps {

    /**
     * Specifies the map style selected from an available data provider.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-map.html#cfn-location-map-configuration
     */
    readonly configuration: CfnMap.MapConfigurationProperty | cdk.IResolvable;

    /**
     * The name for the map resource.
     *
     * Requirements:
     *
     * - Must contain only alphanumeric characters (A–Z, a–z, 0–9), hyphens (-), periods (.), and underscores (_).
     * - Must be a unique map resource name.
     * - No spaces allowed. For example, `ExampleMap` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-map.html#cfn-location-map-mapname
     */
    readonly mapName: string;

    /**
     * An optional description for the map resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-map.html#cfn-location-map-description
     */
    readonly description?: string;

    /**
     * No longer used. If included, the only allowed value is `RequestBasedUsage` .
     *
     * *Allowed Values* : `RequestBasedUsage`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-map.html#cfn-location-map-pricingplan
     */
    readonly pricingPlan?: string;
}

/**
 * Determine whether the given properties match those of a `CfnMapProps`
 *
 * @param properties - the TypeScript properties of a `CfnMapProps`
 *
 * @returns the result of the validation.
 */
function CfnMapPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('configuration', cdk.requiredValidator)(properties.configuration));
    errors.collect(cdk.propertyValidator('configuration', CfnMap_MapConfigurationPropertyValidator)(properties.configuration));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('mapName', cdk.requiredValidator)(properties.mapName));
    errors.collect(cdk.propertyValidator('mapName', cdk.validateString)(properties.mapName));
    errors.collect(cdk.propertyValidator('pricingPlan', cdk.validateString)(properties.pricingPlan));
    return errors.wrap('supplied properties not correct for "CfnMapProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Location::Map` resource
 *
 * @param properties - the TypeScript properties of a `CfnMapProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Location::Map` resource.
 */
// @ts-ignore TS6133
function cfnMapPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMapPropsValidator(properties).assertSuccess();
    return {
        Configuration: cfnMapMapConfigurationPropertyToCloudFormation(properties.configuration),
        MapName: cdk.stringToCloudFormation(properties.mapName),
        Description: cdk.stringToCloudFormation(properties.description),
        PricingPlan: cdk.stringToCloudFormation(properties.pricingPlan),
    };
}

// @ts-ignore TS6133
function CfnMapPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMapProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMapProps>();
    ret.addPropertyResult('configuration', 'Configuration', CfnMapMapConfigurationPropertyFromCloudFormation(properties.Configuration));
    ret.addPropertyResult('mapName', 'MapName', cfn_parse.FromCloudFormation.getString(properties.MapName));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('pricingPlan', 'PricingPlan', properties.PricingPlan != null ? cfn_parse.FromCloudFormation.getString(properties.PricingPlan) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Location::Map`
 *
 * The `AWS::Location::Map` resource specifies a map resource in your AWS account, which provides map tiles of different styles sourced from global location data providers.
 *
 * @cloudformationResource AWS::Location::Map
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-map.html
 */
export class CfnMap extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Location::Map";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnMap {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnMapPropsFromCloudFormation(resourceProperties);
        const ret = new CfnMap(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) for the map resource. Used to specify a resource across all AWS .
     *
     * - Format example: `arn:aws:geo:region:account-id:maps/ExampleMap`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The timestamp for when the map resource was created in [ISO 8601](https://docs.aws.amazon.com/https://www.iso.org/iso-8601-date-and-time-format.html) format: `YYYY-MM-DDThh:mm:ss.sssZ` .
     * @cloudformationAttribute CreateTime
     */
    public readonly attrCreateTime: string;

    /**
     * The data provider for the associated map tiles.
     * @cloudformationAttribute DataSource
     */
    public readonly attrDataSource: string;

    /**
     * Synonym for `Arn` . The Amazon Resource Name (ARN) for the map resource. Used to specify a resource across all AWS .
     *
     * - Format example: `arn:aws:geo:region:account-id:maps/ExampleMap`
     * @cloudformationAttribute MapArn
     */
    public readonly attrMapArn: string;

    /**
     * The timestamp for when the map resource was last updated in [ISO 8601](https://docs.aws.amazon.com/https://www.iso.org/iso-8601-date-and-time-format.html) format: `YYYY-MM-DDThh:mm:ss.sssZ` .
     * @cloudformationAttribute UpdateTime
     */
    public readonly attrUpdateTime: string;

    /**
     * Specifies the map style selected from an available data provider.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-map.html#cfn-location-map-configuration
     */
    public configuration: CfnMap.MapConfigurationProperty | cdk.IResolvable;

    /**
     * The name for the map resource.
     *
     * Requirements:
     *
     * - Must contain only alphanumeric characters (A–Z, a–z, 0–9), hyphens (-), periods (.), and underscores (_).
     * - Must be a unique map resource name.
     * - No spaces allowed. For example, `ExampleMap` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-map.html#cfn-location-map-mapname
     */
    public mapName: string;

    /**
     * An optional description for the map resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-map.html#cfn-location-map-description
     */
    public description: string | undefined;

    /**
     * No longer used. If included, the only allowed value is `RequestBasedUsage` .
     *
     * *Allowed Values* : `RequestBasedUsage`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-map.html#cfn-location-map-pricingplan
     */
    public pricingPlan: string | undefined;

    /**
     * Create a new `AWS::Location::Map`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnMapProps) {
        super(scope, id, { type: CfnMap.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'configuration', this);
        cdk.requireProperty(props, 'mapName', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCreateTime = cdk.Token.asString(this.getAtt('CreateTime'));
        this.attrDataSource = cdk.Token.asString(this.getAtt('DataSource'));
        this.attrMapArn = cdk.Token.asString(this.getAtt('MapArn'));
        this.attrUpdateTime = cdk.Token.asString(this.getAtt('UpdateTime'));

        this.configuration = props.configuration;
        this.mapName = props.mapName;
        this.description = props.description;
        this.pricingPlan = props.pricingPlan;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnMap.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            configuration: this.configuration,
            mapName: this.mapName,
            description: this.description,
            pricingPlan: this.pricingPlan,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnMapPropsToCloudFormation(props);
    }
}

export namespace CfnMap {
    /**
     * Specifies the map tile style selected from an available provider.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-location-map-mapconfiguration.html
     */
    export interface MapConfigurationProperty {
        /**
         * Specifies the map style selected from an available data provider.
         *
         * Valid styles: `VectorEsriStreets` , `VectorEsriTopographic` , `VectorEsriNavigation` , `VectorEsriDarkGrayCanvas` , `VectorEsriLightGrayCanvas` , `VectorHereBerlin` .
         *
         * > When using HERE as your data provider, and selecting the Style `VectorHereBerlin` , you may not use HERE Technologies maps for Asset Management. See the [AWS Service Terms](https://docs.aws.amazon.com/service-terms/) for Amazon Location Service.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-location-map-mapconfiguration.html#cfn-location-map-mapconfiguration-style
         */
        readonly style: string;
    }
}

/**
 * Determine whether the given properties match those of a `MapConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `MapConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnMap_MapConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('style', cdk.requiredValidator)(properties.style));
    errors.collect(cdk.propertyValidator('style', cdk.validateString)(properties.style));
    return errors.wrap('supplied properties not correct for "MapConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Location::Map.MapConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `MapConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Location::Map.MapConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnMapMapConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMap_MapConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Style: cdk.stringToCloudFormation(properties.style),
    };
}

// @ts-ignore TS6133
function CfnMapMapConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMap.MapConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMap.MapConfigurationProperty>();
    ret.addPropertyResult('style', 'Style', cfn_parse.FromCloudFormation.getString(properties.Style));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnPlaceIndex`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-placeindex.html
 */
export interface CfnPlaceIndexProps {

    /**
     * Specifies the data provider of geospatial data.
     *
     * > This field is case-sensitive. Enter the valid values as shown. For example, entering `HERE` will return an error.
     *
     * Valid values include:
     *
     * - `Esri`
     * - `Here`
     *
     * > Place index resources using HERE as a data provider can't be used to [store](https://docs.aws.amazon.com/location-places/latest/APIReference/API_DataSourceConfiguration.html) results for locations in Japan. For more information, see the [AWS Service Terms](https://docs.aws.amazon.com/service-terms/) for Amazon Location Service.
     *
     * For additional details on data providers, see the [Amazon Location Service data providers page](https://docs.aws.amazon.com/location/latest/developerguide/what-is-data-provider.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-placeindex.html#cfn-location-placeindex-datasource
     */
    readonly dataSource: string;

    /**
     * The name of the place index resource.
     *
     * Requirements:
     *
     * - Contain only alphanumeric characters (A–Z, a–z, 0–9), hyphens (-), periods (.), and underscores (_).
     * - Must be a unique place index resource name.
     * - No spaces allowed. For example, `ExamplePlaceIndex` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-placeindex.html#cfn-location-placeindex-indexname
     */
    readonly indexName: string;

    /**
     * Specifies the data storage option for requesting Places.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-placeindex.html#cfn-location-placeindex-datasourceconfiguration
     */
    readonly dataSourceConfiguration?: CfnPlaceIndex.DataSourceConfigurationProperty | cdk.IResolvable;

    /**
     * The optional description for the place index resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-placeindex.html#cfn-location-placeindex-description
     */
    readonly description?: string;

    /**
     * No longer used. If included, the only allowed value is `RequestBasedUsage` .
     *
     * *Allowed Values* : `RequestBasedUsage`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-placeindex.html#cfn-location-placeindex-pricingplan
     */
    readonly pricingPlan?: string;
}

/**
 * Determine whether the given properties match those of a `CfnPlaceIndexProps`
 *
 * @param properties - the TypeScript properties of a `CfnPlaceIndexProps`
 *
 * @returns the result of the validation.
 */
function CfnPlaceIndexPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataSource', cdk.requiredValidator)(properties.dataSource));
    errors.collect(cdk.propertyValidator('dataSource', cdk.validateString)(properties.dataSource));
    errors.collect(cdk.propertyValidator('dataSourceConfiguration', CfnPlaceIndex_DataSourceConfigurationPropertyValidator)(properties.dataSourceConfiguration));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('indexName', cdk.requiredValidator)(properties.indexName));
    errors.collect(cdk.propertyValidator('indexName', cdk.validateString)(properties.indexName));
    errors.collect(cdk.propertyValidator('pricingPlan', cdk.validateString)(properties.pricingPlan));
    return errors.wrap('supplied properties not correct for "CfnPlaceIndexProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Location::PlaceIndex` resource
 *
 * @param properties - the TypeScript properties of a `CfnPlaceIndexProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Location::PlaceIndex` resource.
 */
// @ts-ignore TS6133
function cfnPlaceIndexPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPlaceIndexPropsValidator(properties).assertSuccess();
    return {
        DataSource: cdk.stringToCloudFormation(properties.dataSource),
        IndexName: cdk.stringToCloudFormation(properties.indexName),
        DataSourceConfiguration: cfnPlaceIndexDataSourceConfigurationPropertyToCloudFormation(properties.dataSourceConfiguration),
        Description: cdk.stringToCloudFormation(properties.description),
        PricingPlan: cdk.stringToCloudFormation(properties.pricingPlan),
    };
}

// @ts-ignore TS6133
function CfnPlaceIndexPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPlaceIndexProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPlaceIndexProps>();
    ret.addPropertyResult('dataSource', 'DataSource', cfn_parse.FromCloudFormation.getString(properties.DataSource));
    ret.addPropertyResult('indexName', 'IndexName', cfn_parse.FromCloudFormation.getString(properties.IndexName));
    ret.addPropertyResult('dataSourceConfiguration', 'DataSourceConfiguration', properties.DataSourceConfiguration != null ? CfnPlaceIndexDataSourceConfigurationPropertyFromCloudFormation(properties.DataSourceConfiguration) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('pricingPlan', 'PricingPlan', properties.PricingPlan != null ? cfn_parse.FromCloudFormation.getString(properties.PricingPlan) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Location::PlaceIndex`
 *
 * The `AWS::Location::PlaceIndex` resource specifies a place index resource in your AWS account, which supports Places functions with geospatial data sourced from your chosen data provider.
 *
 * @cloudformationResource AWS::Location::PlaceIndex
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-placeindex.html
 */
export class CfnPlaceIndex extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Location::PlaceIndex";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnPlaceIndex {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnPlaceIndexPropsFromCloudFormation(resourceProperties);
        const ret = new CfnPlaceIndex(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) for the place index resource. Used to specify a resource across AWS .
     *
     * - Format example: `arn:aws:geo:region:account-id:place-index/ExamplePlaceIndex`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The timestamp for when the place index resource was created in [ISO 8601](https://docs.aws.amazon.com/https://www.iso.org/iso-8601-date-and-time-format.html) format: `YYYY-MM-DDThh:mm:ss.sssZ` .
     * @cloudformationAttribute CreateTime
     */
    public readonly attrCreateTime: string;

    /**
     * Synonym for `Arn` . The Amazon Resource Name (ARN) for the place index resource. Used to specify a resource across AWS .
     *
     * - Format example: `arn:aws:geo:region:account-id:place-index/ExamplePlaceIndex`
     * @cloudformationAttribute IndexArn
     */
    public readonly attrIndexArn: string;

    /**
     * The timestamp for when the place index resource was last updated in [ISO 8601](https://docs.aws.amazon.com/https://www.iso.org/iso-8601-date-and-time-format.html) format: `YYYY-MM-DDThh:mm:ss.sssZ` .
     * @cloudformationAttribute UpdateTime
     */
    public readonly attrUpdateTime: string;

    /**
     * Specifies the data provider of geospatial data.
     *
     * > This field is case-sensitive. Enter the valid values as shown. For example, entering `HERE` will return an error.
     *
     * Valid values include:
     *
     * - `Esri`
     * - `Here`
     *
     * > Place index resources using HERE as a data provider can't be used to [store](https://docs.aws.amazon.com/location-places/latest/APIReference/API_DataSourceConfiguration.html) results for locations in Japan. For more information, see the [AWS Service Terms](https://docs.aws.amazon.com/service-terms/) for Amazon Location Service.
     *
     * For additional details on data providers, see the [Amazon Location Service data providers page](https://docs.aws.amazon.com/location/latest/developerguide/what-is-data-provider.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-placeindex.html#cfn-location-placeindex-datasource
     */
    public dataSource: string;

    /**
     * The name of the place index resource.
     *
     * Requirements:
     *
     * - Contain only alphanumeric characters (A–Z, a–z, 0–9), hyphens (-), periods (.), and underscores (_).
     * - Must be a unique place index resource name.
     * - No spaces allowed. For example, `ExamplePlaceIndex` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-placeindex.html#cfn-location-placeindex-indexname
     */
    public indexName: string;

    /**
     * Specifies the data storage option for requesting Places.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-placeindex.html#cfn-location-placeindex-datasourceconfiguration
     */
    public dataSourceConfiguration: CfnPlaceIndex.DataSourceConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * The optional description for the place index resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-placeindex.html#cfn-location-placeindex-description
     */
    public description: string | undefined;

    /**
     * No longer used. If included, the only allowed value is `RequestBasedUsage` .
     *
     * *Allowed Values* : `RequestBasedUsage`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-placeindex.html#cfn-location-placeindex-pricingplan
     */
    public pricingPlan: string | undefined;

    /**
     * Create a new `AWS::Location::PlaceIndex`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPlaceIndexProps) {
        super(scope, id, { type: CfnPlaceIndex.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'dataSource', this);
        cdk.requireProperty(props, 'indexName', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCreateTime = cdk.Token.asString(this.getAtt('CreateTime'));
        this.attrIndexArn = cdk.Token.asString(this.getAtt('IndexArn'));
        this.attrUpdateTime = cdk.Token.asString(this.getAtt('UpdateTime'));

        this.dataSource = props.dataSource;
        this.indexName = props.indexName;
        this.dataSourceConfiguration = props.dataSourceConfiguration;
        this.description = props.description;
        this.pricingPlan = props.pricingPlan;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnPlaceIndex.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            dataSource: this.dataSource,
            indexName: this.indexName,
            dataSourceConfiguration: this.dataSourceConfiguration,
            description: this.description,
            pricingPlan: this.pricingPlan,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPlaceIndexPropsToCloudFormation(props);
    }
}

export namespace CfnPlaceIndex {
    /**
     * Specifies the data storage option for requesting Places.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-location-placeindex-datasourceconfiguration.html
     */
    export interface DataSourceConfigurationProperty {
        /**
         * Specifies how the results of an operation will be stored by the caller.
         *
         * Valid values include:
         *
         * - `SingleUse` specifies that the results won't be stored.
         * - `Storage` specifies that the result can be cached or stored in a database.
         *
         * > Place index resources using HERE as a data provider can't be configured to store results for locations in Japan when choosing `Storage` for the `IntendedUse` parameter.
         *
         * Default value: `SingleUse`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-location-placeindex-datasourceconfiguration.html#cfn-location-placeindex-datasourceconfiguration-intendeduse
         */
        readonly intendedUse?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DataSourceConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `DataSourceConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnPlaceIndex_DataSourceConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('intendedUse', cdk.validateString)(properties.intendedUse));
    return errors.wrap('supplied properties not correct for "DataSourceConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Location::PlaceIndex.DataSourceConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `DataSourceConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Location::PlaceIndex.DataSourceConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnPlaceIndexDataSourceConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPlaceIndex_DataSourceConfigurationPropertyValidator(properties).assertSuccess();
    return {
        IntendedUse: cdk.stringToCloudFormation(properties.intendedUse),
    };
}

// @ts-ignore TS6133
function CfnPlaceIndexDataSourceConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPlaceIndex.DataSourceConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPlaceIndex.DataSourceConfigurationProperty>();
    ret.addPropertyResult('intendedUse', 'IntendedUse', properties.IntendedUse != null ? cfn_parse.FromCloudFormation.getString(properties.IntendedUse) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnRouteCalculator`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-routecalculator.html
 */
export interface CfnRouteCalculatorProps {

    /**
     * The name of the route calculator resource.
     *
     * Requirements:
     *
     * - Can use alphanumeric characters (A–Z, a–z, 0–9) , hyphens (-), periods (.), and underscores (_).
     * - Must be a unique route calculator resource name.
     * - No spaces allowed. For example, `ExampleRouteCalculator` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-routecalculator.html#cfn-location-routecalculator-calculatorname
     */
    readonly calculatorName: string;

    /**
     * Specifies the data provider of traffic and road network data.
     *
     * > This field is case-sensitive. Enter the valid values as shown. For example, entering `HERE` returns an error.
     *
     * Valid values include:
     *
     * - `Esri`
     * - `Here`
     *
     * For more information about data providers, see the [Amazon Location Service data providers page](https://docs.aws.amazon.com/location/latest/developerguide/what-is-data-provider.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-routecalculator.html#cfn-location-routecalculator-datasource
     */
    readonly dataSource: string;

    /**
     * The optional description for the route calculator resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-routecalculator.html#cfn-location-routecalculator-description
     */
    readonly description?: string;

    /**
     * No longer used. If included, the only allowed value is `RequestBasedUsage` .
     *
     * *Allowed Values* : `RequestBasedUsage`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-routecalculator.html#cfn-location-routecalculator-pricingplan
     */
    readonly pricingPlan?: string;
}

/**
 * Determine whether the given properties match those of a `CfnRouteCalculatorProps`
 *
 * @param properties - the TypeScript properties of a `CfnRouteCalculatorProps`
 *
 * @returns the result of the validation.
 */
function CfnRouteCalculatorPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('calculatorName', cdk.requiredValidator)(properties.calculatorName));
    errors.collect(cdk.propertyValidator('calculatorName', cdk.validateString)(properties.calculatorName));
    errors.collect(cdk.propertyValidator('dataSource', cdk.requiredValidator)(properties.dataSource));
    errors.collect(cdk.propertyValidator('dataSource', cdk.validateString)(properties.dataSource));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('pricingPlan', cdk.validateString)(properties.pricingPlan));
    return errors.wrap('supplied properties not correct for "CfnRouteCalculatorProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Location::RouteCalculator` resource
 *
 * @param properties - the TypeScript properties of a `CfnRouteCalculatorProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Location::RouteCalculator` resource.
 */
// @ts-ignore TS6133
function cfnRouteCalculatorPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRouteCalculatorPropsValidator(properties).assertSuccess();
    return {
        CalculatorName: cdk.stringToCloudFormation(properties.calculatorName),
        DataSource: cdk.stringToCloudFormation(properties.dataSource),
        Description: cdk.stringToCloudFormation(properties.description),
        PricingPlan: cdk.stringToCloudFormation(properties.pricingPlan),
    };
}

// @ts-ignore TS6133
function CfnRouteCalculatorPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRouteCalculatorProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRouteCalculatorProps>();
    ret.addPropertyResult('calculatorName', 'CalculatorName', cfn_parse.FromCloudFormation.getString(properties.CalculatorName));
    ret.addPropertyResult('dataSource', 'DataSource', cfn_parse.FromCloudFormation.getString(properties.DataSource));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('pricingPlan', 'PricingPlan', properties.PricingPlan != null ? cfn_parse.FromCloudFormation.getString(properties.PricingPlan) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Location::RouteCalculator`
 *
 * The `AWS::Location::RouteCalculator` resource specifies a route calculator resource in your AWS account.
 *
 * You can send requests to a route calculator resource to estimate travel time, distance, and get directions. A route calculator sources traffic and road network data from your chosen data provider.
 *
 * @cloudformationResource AWS::Location::RouteCalculator
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-routecalculator.html
 */
export class CfnRouteCalculator extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Location::RouteCalculator";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnRouteCalculator {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnRouteCalculatorPropsFromCloudFormation(resourceProperties);
        const ret = new CfnRouteCalculator(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) for the route calculator resource. Use the ARN when you specify a resource across all AWS .
     *
     * - Format example: `arn:aws:geo:region:account-id:route-calculator/ExampleCalculator`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * Synonym for `Arn` . The Amazon Resource Name (ARN) for the route calculator resource. Use the ARN when you specify a resource across all AWS .
     *
     * - Format example: `arn:aws:geo:region:account-id:route-calculator/ExampleCalculator`
     * @cloudformationAttribute CalculatorArn
     */
    public readonly attrCalculatorArn: string;

    /**
     * The timestamp for when the route calculator resource was created in [ISO 8601](https://docs.aws.amazon.com/https://www.iso.org/iso-8601-date-and-time-format.html) format: `YYYY-MM-DDThh:mm:ss.sssZ` .
     * @cloudformationAttribute CreateTime
     */
    public readonly attrCreateTime: string;

    /**
     * The timestamp for when the route calculator resource was last updated in [ISO 8601](https://docs.aws.amazon.com/https://www.iso.org/iso-8601-date-and-time-format.html) format: `YYYY-MM-DDThh:mm:ss.sssZ` .
     * @cloudformationAttribute UpdateTime
     */
    public readonly attrUpdateTime: string;

    /**
     * The name of the route calculator resource.
     *
     * Requirements:
     *
     * - Can use alphanumeric characters (A–Z, a–z, 0–9) , hyphens (-), periods (.), and underscores (_).
     * - Must be a unique route calculator resource name.
     * - No spaces allowed. For example, `ExampleRouteCalculator` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-routecalculator.html#cfn-location-routecalculator-calculatorname
     */
    public calculatorName: string;

    /**
     * Specifies the data provider of traffic and road network data.
     *
     * > This field is case-sensitive. Enter the valid values as shown. For example, entering `HERE` returns an error.
     *
     * Valid values include:
     *
     * - `Esri`
     * - `Here`
     *
     * For more information about data providers, see the [Amazon Location Service data providers page](https://docs.aws.amazon.com/location/latest/developerguide/what-is-data-provider.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-routecalculator.html#cfn-location-routecalculator-datasource
     */
    public dataSource: string;

    /**
     * The optional description for the route calculator resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-routecalculator.html#cfn-location-routecalculator-description
     */
    public description: string | undefined;

    /**
     * No longer used. If included, the only allowed value is `RequestBasedUsage` .
     *
     * *Allowed Values* : `RequestBasedUsage`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-routecalculator.html#cfn-location-routecalculator-pricingplan
     */
    public pricingPlan: string | undefined;

    /**
     * Create a new `AWS::Location::RouteCalculator`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnRouteCalculatorProps) {
        super(scope, id, { type: CfnRouteCalculator.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'calculatorName', this);
        cdk.requireProperty(props, 'dataSource', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCalculatorArn = cdk.Token.asString(this.getAtt('CalculatorArn'));
        this.attrCreateTime = cdk.Token.asString(this.getAtt('CreateTime'));
        this.attrUpdateTime = cdk.Token.asString(this.getAtt('UpdateTime'));

        this.calculatorName = props.calculatorName;
        this.dataSource = props.dataSource;
        this.description = props.description;
        this.pricingPlan = props.pricingPlan;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnRouteCalculator.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            calculatorName: this.calculatorName,
            dataSource: this.dataSource,
            description: this.description,
            pricingPlan: this.pricingPlan,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnRouteCalculatorPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnTracker`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-tracker.html
 */
export interface CfnTrackerProps {

    /**
     * The name for the tracker resource.
     *
     * Requirements:
     *
     * - Contain only alphanumeric characters (A-Z, a-z, 0-9) , hyphens (-), periods (.), and underscores (_).
     * - Must be a unique tracker resource name.
     * - No spaces allowed. For example, `ExampleTracker` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-tracker.html#cfn-location-tracker-trackername
     */
    readonly trackerName: string;

    /**
     * An optional description for the tracker resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-tracker.html#cfn-location-tracker-description
     */
    readonly description?: string;

    /**
     * A key identifier for an [AWS KMS customer managed key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html) . Enter a key ID, key ARN, alias name, or alias ARN.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-tracker.html#cfn-location-tracker-kmskeyid
     */
    readonly kmsKeyId?: string;

    /**
     * Specifies the position filtering for the tracker resource.
     *
     * Valid values:
     *
     * - `TimeBased` - Location updates are evaluated against linked geofence collections, but not every location update is stored. If your update frequency is more often than 30 seconds, only one update per 30 seconds is stored for each unique device ID.
     * - `DistanceBased` - If the device has moved less than 30 m (98.4 ft), location updates are ignored. Location updates within this area are neither evaluated against linked geofence collections, nor stored. This helps control costs by reducing the number of geofence evaluations and historical device positions to paginate through. Distance-based filtering can also reduce the effects of GPS noise when displaying device trajectories on a map.
     * - `AccuracyBased` - If the device has moved less than the measured accuracy, location updates are ignored. For example, if two consecutive updates from a device have a horizontal accuracy of 5 m and 10 m, the second update is ignored if the device has moved less than 15 m. Ignored location updates are neither evaluated against linked geofence collections, nor stored. This can reduce the effects of GPS noise when displaying device trajectories on a map, and can help control your costs by reducing the number of geofence evaluations.
     *
     * This field is optional. If not specified, the default value is `TimeBased` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-tracker.html#cfn-location-tracker-positionfiltering
     */
    readonly positionFiltering?: string;

    /**
     * No longer used. If included, the only allowed value is `RequestBasedUsage` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-tracker.html#cfn-location-tracker-pricingplan
     */
    readonly pricingPlan?: string;

    /**
     * This parameter is no longer used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-tracker.html#cfn-location-tracker-pricingplandatasource
     */
    readonly pricingPlanDataSource?: string;
}

/**
 * Determine whether the given properties match those of a `CfnTrackerProps`
 *
 * @param properties - the TypeScript properties of a `CfnTrackerProps`
 *
 * @returns the result of the validation.
 */
function CfnTrackerPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('positionFiltering', cdk.validateString)(properties.positionFiltering));
    errors.collect(cdk.propertyValidator('pricingPlan', cdk.validateString)(properties.pricingPlan));
    errors.collect(cdk.propertyValidator('pricingPlanDataSource', cdk.validateString)(properties.pricingPlanDataSource));
    errors.collect(cdk.propertyValidator('trackerName', cdk.requiredValidator)(properties.trackerName));
    errors.collect(cdk.propertyValidator('trackerName', cdk.validateString)(properties.trackerName));
    return errors.wrap('supplied properties not correct for "CfnTrackerProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Location::Tracker` resource
 *
 * @param properties - the TypeScript properties of a `CfnTrackerProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Location::Tracker` resource.
 */
// @ts-ignore TS6133
function cfnTrackerPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTrackerPropsValidator(properties).assertSuccess();
    return {
        TrackerName: cdk.stringToCloudFormation(properties.trackerName),
        Description: cdk.stringToCloudFormation(properties.description),
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        PositionFiltering: cdk.stringToCloudFormation(properties.positionFiltering),
        PricingPlan: cdk.stringToCloudFormation(properties.pricingPlan),
        PricingPlanDataSource: cdk.stringToCloudFormation(properties.pricingPlanDataSource),
    };
}

// @ts-ignore TS6133
function CfnTrackerPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTrackerProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTrackerProps>();
    ret.addPropertyResult('trackerName', 'TrackerName', cfn_parse.FromCloudFormation.getString(properties.TrackerName));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('positionFiltering', 'PositionFiltering', properties.PositionFiltering != null ? cfn_parse.FromCloudFormation.getString(properties.PositionFiltering) : undefined);
    ret.addPropertyResult('pricingPlan', 'PricingPlan', properties.PricingPlan != null ? cfn_parse.FromCloudFormation.getString(properties.PricingPlan) : undefined);
    ret.addPropertyResult('pricingPlanDataSource', 'PricingPlanDataSource', properties.PricingPlanDataSource != null ? cfn_parse.FromCloudFormation.getString(properties.PricingPlanDataSource) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Location::Tracker`
 *
 * The `AWS::Location::Tracker` resource specifies a tracker resource in your AWS account , which lets you receive current and historical location of devices.
 *
 * @cloudformationResource AWS::Location::Tracker
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-tracker.html
 */
export class CfnTracker extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Location::Tracker";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnTracker {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnTrackerPropsFromCloudFormation(resourceProperties);
        const ret = new CfnTracker(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) for the tracker resource. Used when you need to specify a resource across all AWS .
     *
     * - Format example: `arn:aws:geo:region:account-id:tracker/ExampleTracker`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The timestamp for when the tracker resource was created in [ISO 8601](https://docs.aws.amazon.com/https://www.iso.org/iso-8601-date-and-time-format.html) format: `YYYY-MM-DDThh:mm:ss.sssZ` .
     * @cloudformationAttribute CreateTime
     */
    public readonly attrCreateTime: string;

    /**
     * Synonym for `Arn` . The Amazon Resource Name (ARN) for the tracker resource. Used when you need to specify a resource across all AWS .
     *
     * - Format example: `arn:aws:geo:region:account-id:tracker/ExampleTracker`
     * @cloudformationAttribute TrackerArn
     */
    public readonly attrTrackerArn: string;

    /**
     * The timestamp for when the tracker resource was last updated in [ISO 8601](https://docs.aws.amazon.com/https://www.iso.org/iso-8601-date-and-time-format.html) format: `YYYY-MM-DDThh:mm:ss.sssZ` .
     * @cloudformationAttribute UpdateTime
     */
    public readonly attrUpdateTime: string;

    /**
     * The name for the tracker resource.
     *
     * Requirements:
     *
     * - Contain only alphanumeric characters (A-Z, a-z, 0-9) , hyphens (-), periods (.), and underscores (_).
     * - Must be a unique tracker resource name.
     * - No spaces allowed. For example, `ExampleTracker` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-tracker.html#cfn-location-tracker-trackername
     */
    public trackerName: string;

    /**
     * An optional description for the tracker resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-tracker.html#cfn-location-tracker-description
     */
    public description: string | undefined;

    /**
     * A key identifier for an [AWS KMS customer managed key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html) . Enter a key ID, key ARN, alias name, or alias ARN.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-tracker.html#cfn-location-tracker-kmskeyid
     */
    public kmsKeyId: string | undefined;

    /**
     * Specifies the position filtering for the tracker resource.
     *
     * Valid values:
     *
     * - `TimeBased` - Location updates are evaluated against linked geofence collections, but not every location update is stored. If your update frequency is more often than 30 seconds, only one update per 30 seconds is stored for each unique device ID.
     * - `DistanceBased` - If the device has moved less than 30 m (98.4 ft), location updates are ignored. Location updates within this area are neither evaluated against linked geofence collections, nor stored. This helps control costs by reducing the number of geofence evaluations and historical device positions to paginate through. Distance-based filtering can also reduce the effects of GPS noise when displaying device trajectories on a map.
     * - `AccuracyBased` - If the device has moved less than the measured accuracy, location updates are ignored. For example, if two consecutive updates from a device have a horizontal accuracy of 5 m and 10 m, the second update is ignored if the device has moved less than 15 m. Ignored location updates are neither evaluated against linked geofence collections, nor stored. This can reduce the effects of GPS noise when displaying device trajectories on a map, and can help control your costs by reducing the number of geofence evaluations.
     *
     * This field is optional. If not specified, the default value is `TimeBased` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-tracker.html#cfn-location-tracker-positionfiltering
     */
    public positionFiltering: string | undefined;

    /**
     * No longer used. If included, the only allowed value is `RequestBasedUsage` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-tracker.html#cfn-location-tracker-pricingplan
     */
    public pricingPlan: string | undefined;

    /**
     * This parameter is no longer used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-tracker.html#cfn-location-tracker-pricingplandatasource
     */
    public pricingPlanDataSource: string | undefined;

    /**
     * Create a new `AWS::Location::Tracker`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnTrackerProps) {
        super(scope, id, { type: CfnTracker.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'trackerName', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCreateTime = cdk.Token.asString(this.getAtt('CreateTime'));
        this.attrTrackerArn = cdk.Token.asString(this.getAtt('TrackerArn'));
        this.attrUpdateTime = cdk.Token.asString(this.getAtt('UpdateTime'));

        this.trackerName = props.trackerName;
        this.description = props.description;
        this.kmsKeyId = props.kmsKeyId;
        this.positionFiltering = props.positionFiltering;
        this.pricingPlan = props.pricingPlan;
        this.pricingPlanDataSource = props.pricingPlanDataSource;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnTracker.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            trackerName: this.trackerName,
            description: this.description,
            kmsKeyId: this.kmsKeyId,
            positionFiltering: this.positionFiltering,
            pricingPlan: this.pricingPlan,
            pricingPlanDataSource: this.pricingPlanDataSource,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnTrackerPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnTrackerConsumer`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-trackerconsumer.html
 */
export interface CfnTrackerConsumerProps {

    /**
     * The Amazon Resource Name (ARN) for the geofence collection that consumes the tracker resource updates.
     *
     * - Format example: `arn:aws:geo:region:account-id:geofence-collection/ExampleGeofenceCollectionConsumer`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-trackerconsumer.html#cfn-location-trackerconsumer-consumerarn
     */
    readonly consumerArn: string;

    /**
     * The name for the tracker resource.
     *
     * Requirements:
     *
     * - Contain only alphanumeric characters (A-Z, a-z, 0-9) , hyphens (-), periods (.), and underscores (_).
     * - Must be a unique tracker resource name.
     * - No spaces allowed. For example, `ExampleTracker` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-trackerconsumer.html#cfn-location-trackerconsumer-trackername
     */
    readonly trackerName: string;
}

/**
 * Determine whether the given properties match those of a `CfnTrackerConsumerProps`
 *
 * @param properties - the TypeScript properties of a `CfnTrackerConsumerProps`
 *
 * @returns the result of the validation.
 */
function CfnTrackerConsumerPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('consumerArn', cdk.requiredValidator)(properties.consumerArn));
    errors.collect(cdk.propertyValidator('consumerArn', cdk.validateString)(properties.consumerArn));
    errors.collect(cdk.propertyValidator('trackerName', cdk.requiredValidator)(properties.trackerName));
    errors.collect(cdk.propertyValidator('trackerName', cdk.validateString)(properties.trackerName));
    return errors.wrap('supplied properties not correct for "CfnTrackerConsumerProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Location::TrackerConsumer` resource
 *
 * @param properties - the TypeScript properties of a `CfnTrackerConsumerProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Location::TrackerConsumer` resource.
 */
// @ts-ignore TS6133
function cfnTrackerConsumerPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTrackerConsumerPropsValidator(properties).assertSuccess();
    return {
        ConsumerArn: cdk.stringToCloudFormation(properties.consumerArn),
        TrackerName: cdk.stringToCloudFormation(properties.trackerName),
    };
}

// @ts-ignore TS6133
function CfnTrackerConsumerPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTrackerConsumerProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTrackerConsumerProps>();
    ret.addPropertyResult('consumerArn', 'ConsumerArn', cfn_parse.FromCloudFormation.getString(properties.ConsumerArn));
    ret.addPropertyResult('trackerName', 'TrackerName', cfn_parse.FromCloudFormation.getString(properties.TrackerName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Location::TrackerConsumer`
 *
 * The `AWS::Location::TrackerConsumer` resource specifies an association between a geofence collection and a tracker resource. The geofence collection is referred to as the *consumer* of the tracker. This allows the tracker resource to communicate location data to the linked geofence collection.
 *
 * > Currently not supported — Cross-account configurations, such as creating associations between a tracker resource in one account and a geofence collection in another account.
 *
 * @cloudformationResource AWS::Location::TrackerConsumer
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-trackerconsumer.html
 */
export class CfnTrackerConsumer extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Location::TrackerConsumer";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnTrackerConsumer {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnTrackerConsumerPropsFromCloudFormation(resourceProperties);
        const ret = new CfnTrackerConsumer(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) for the geofence collection that consumes the tracker resource updates.
     *
     * - Format example: `arn:aws:geo:region:account-id:geofence-collection/ExampleGeofenceCollectionConsumer`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-trackerconsumer.html#cfn-location-trackerconsumer-consumerarn
     */
    public consumerArn: string;

    /**
     * The name for the tracker resource.
     *
     * Requirements:
     *
     * - Contain only alphanumeric characters (A-Z, a-z, 0-9) , hyphens (-), periods (.), and underscores (_).
     * - Must be a unique tracker resource name.
     * - No spaces allowed. For example, `ExampleTracker` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-trackerconsumer.html#cfn-location-trackerconsumer-trackername
     */
    public trackerName: string;

    /**
     * Create a new `AWS::Location::TrackerConsumer`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnTrackerConsumerProps) {
        super(scope, id, { type: CfnTrackerConsumer.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'consumerArn', this);
        cdk.requireProperty(props, 'trackerName', this);

        this.consumerArn = props.consumerArn;
        this.trackerName = props.trackerName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnTrackerConsumer.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            consumerArn: this.consumerArn,
            trackerName: this.trackerName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnTrackerConsumerPropsToCloudFormation(props);
    }
}
