// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:06.056Z","fingerprint":"gp9aD2TmN/SNGakJTks5kT8a6O/Z4DK6pZ/tI/2RSLQ="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnSkill`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ask-skill.html
 */
export interface CfnSkillProps {

    /**
     * `Alexa::ASK::Skill.AuthenticationConfiguration`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ask-skill.html#cfn-ask-skill-authenticationconfiguration
     */
    readonly authenticationConfiguration: CfnSkill.AuthenticationConfigurationProperty | cdk.IResolvable;

    /**
     * `Alexa::ASK::Skill.SkillPackage`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ask-skill.html#cfn-ask-skill-skillpackage
     */
    readonly skillPackage: CfnSkill.SkillPackageProperty | cdk.IResolvable;

    /**
     * `Alexa::ASK::Skill.VendorId`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ask-skill.html#cfn-ask-skill-vendorid
     */
    readonly vendorId: string;
}

/**
 * Determine whether the given properties match those of a `CfnSkillProps`
 *
 * @param properties - the TypeScript properties of a `CfnSkillProps`
 *
 * @returns the result of the validation.
 */
function CfnSkillPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('authenticationConfiguration', cdk.requiredValidator)(properties.authenticationConfiguration));
    errors.collect(cdk.propertyValidator('authenticationConfiguration', CfnSkill_AuthenticationConfigurationPropertyValidator)(properties.authenticationConfiguration));
    errors.collect(cdk.propertyValidator('skillPackage', cdk.requiredValidator)(properties.skillPackage));
    errors.collect(cdk.propertyValidator('skillPackage', CfnSkill_SkillPackagePropertyValidator)(properties.skillPackage));
    errors.collect(cdk.propertyValidator('vendorId', cdk.requiredValidator)(properties.vendorId));
    errors.collect(cdk.propertyValidator('vendorId', cdk.validateString)(properties.vendorId));
    return errors.wrap('supplied properties not correct for "CfnSkillProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `Alexa::ASK::Skill` resource
 *
 * @param properties - the TypeScript properties of a `CfnSkillProps`
 *
 * @returns the AWS CloudFormation properties of an `Alexa::ASK::Skill` resource.
 */
// @ts-ignore TS6133
function cfnSkillPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSkillPropsValidator(properties).assertSuccess();
    return {
        AuthenticationConfiguration: cfnSkillAuthenticationConfigurationPropertyToCloudFormation(properties.authenticationConfiguration),
        SkillPackage: cfnSkillSkillPackagePropertyToCloudFormation(properties.skillPackage),
        VendorId: cdk.stringToCloudFormation(properties.vendorId),
    };
}

// @ts-ignore TS6133
function CfnSkillPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSkillProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSkillProps>();
    ret.addPropertyResult('authenticationConfiguration', 'AuthenticationConfiguration', CfnSkillAuthenticationConfigurationPropertyFromCloudFormation(properties.AuthenticationConfiguration));
    ret.addPropertyResult('skillPackage', 'SkillPackage', CfnSkillSkillPackagePropertyFromCloudFormation(properties.SkillPackage));
    ret.addPropertyResult('vendorId', 'VendorId', cfn_parse.FromCloudFormation.getString(properties.VendorId));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `Alexa::ASK::Skill`
 *
 *
 *
 * @cloudformationResource Alexa::ASK::Skill
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ask-skill.html
 */
export class CfnSkill extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "Alexa::ASK::Skill";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnSkill {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnSkillPropsFromCloudFormation(resourceProperties);
        const ret = new CfnSkill(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * `Alexa::ASK::Skill.AuthenticationConfiguration`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ask-skill.html#cfn-ask-skill-authenticationconfiguration
     */
    public authenticationConfiguration: CfnSkill.AuthenticationConfigurationProperty | cdk.IResolvable;

    /**
     * `Alexa::ASK::Skill.SkillPackage`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ask-skill.html#cfn-ask-skill-skillpackage
     */
    public skillPackage: CfnSkill.SkillPackageProperty | cdk.IResolvable;

    /**
     * `Alexa::ASK::Skill.VendorId`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ask-skill.html#cfn-ask-skill-vendorid
     */
    public vendorId: string;

    /**
     * Create a new `Alexa::ASK::Skill`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnSkillProps) {
        super(scope, id, { type: CfnSkill.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'authenticationConfiguration', this);
        cdk.requireProperty(props, 'skillPackage', this);
        cdk.requireProperty(props, 'vendorId', this);

        this.authenticationConfiguration = props.authenticationConfiguration;
        this.skillPackage = props.skillPackage;
        this.vendorId = props.vendorId;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnSkill.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            authenticationConfiguration: this.authenticationConfiguration,
            skillPackage: this.skillPackage,
            vendorId: this.vendorId,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnSkillPropsToCloudFormation(props);
    }
}

export namespace CfnSkill {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ask-skill-authenticationconfiguration.html
     */
    export interface AuthenticationConfigurationProperty {
        /**
         * `CfnSkill.AuthenticationConfigurationProperty.ClientId`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ask-skill-authenticationconfiguration.html#cfn-ask-skill-authenticationconfiguration-clientid
         */
        readonly clientId: string;
        /**
         * `CfnSkill.AuthenticationConfigurationProperty.ClientSecret`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ask-skill-authenticationconfiguration.html#cfn-ask-skill-authenticationconfiguration-clientsecret
         */
        readonly clientSecret: string;
        /**
         * `CfnSkill.AuthenticationConfigurationProperty.RefreshToken`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ask-skill-authenticationconfiguration.html#cfn-ask-skill-authenticationconfiguration-refreshtoken
         */
        readonly refreshToken: string;
    }
}

/**
 * Determine whether the given properties match those of a `AuthenticationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `AuthenticationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnSkill_AuthenticationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clientId', cdk.requiredValidator)(properties.clientId));
    errors.collect(cdk.propertyValidator('clientId', cdk.validateString)(properties.clientId));
    errors.collect(cdk.propertyValidator('clientSecret', cdk.requiredValidator)(properties.clientSecret));
    errors.collect(cdk.propertyValidator('clientSecret', cdk.validateString)(properties.clientSecret));
    errors.collect(cdk.propertyValidator('refreshToken', cdk.requiredValidator)(properties.refreshToken));
    errors.collect(cdk.propertyValidator('refreshToken', cdk.validateString)(properties.refreshToken));
    return errors.wrap('supplied properties not correct for "AuthenticationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `Alexa::ASK::Skill.AuthenticationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `AuthenticationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `Alexa::ASK::Skill.AuthenticationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnSkillAuthenticationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSkill_AuthenticationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        ClientId: cdk.stringToCloudFormation(properties.clientId),
        ClientSecret: cdk.stringToCloudFormation(properties.clientSecret),
        RefreshToken: cdk.stringToCloudFormation(properties.refreshToken),
    };
}

// @ts-ignore TS6133
function CfnSkillAuthenticationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSkill.AuthenticationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSkill.AuthenticationConfigurationProperty>();
    ret.addPropertyResult('clientId', 'ClientId', cfn_parse.FromCloudFormation.getString(properties.ClientId));
    ret.addPropertyResult('clientSecret', 'ClientSecret', cfn_parse.FromCloudFormation.getString(properties.ClientSecret));
    ret.addPropertyResult('refreshToken', 'RefreshToken', cfn_parse.FromCloudFormation.getString(properties.RefreshToken));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnSkill {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ask-skill-overrides.html
     */
    export interface OverridesProperty {
        /**
         * `CfnSkill.OverridesProperty.Manifest`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ask-skill-overrides.html#cfn-ask-skill-overrides-manifest
         */
        readonly manifest?: any | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `OverridesProperty`
 *
 * @param properties - the TypeScript properties of a `OverridesProperty`
 *
 * @returns the result of the validation.
 */
function CfnSkill_OverridesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('manifest', cdk.validateObject)(properties.manifest));
    return errors.wrap('supplied properties not correct for "OverridesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `Alexa::ASK::Skill.Overrides` resource
 *
 * @param properties - the TypeScript properties of a `OverridesProperty`
 *
 * @returns the AWS CloudFormation properties of an `Alexa::ASK::Skill.Overrides` resource.
 */
// @ts-ignore TS6133
function cfnSkillOverridesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSkill_OverridesPropertyValidator(properties).assertSuccess();
    return {
        Manifest: cdk.objectToCloudFormation(properties.manifest),
    };
}

// @ts-ignore TS6133
function CfnSkillOverridesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSkill.OverridesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSkill.OverridesProperty>();
    ret.addPropertyResult('manifest', 'Manifest', properties.Manifest != null ? cfn_parse.FromCloudFormation.getAny(properties.Manifest) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnSkill {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ask-skill-skillpackage.html
     */
    export interface SkillPackageProperty {
        /**
         * `CfnSkill.SkillPackageProperty.Overrides`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ask-skill-skillpackage.html#cfn-ask-skill-skillpackage-overrides
         */
        readonly overrides?: CfnSkill.OverridesProperty | cdk.IResolvable;
        /**
         * `CfnSkill.SkillPackageProperty.S3Bucket`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ask-skill-skillpackage.html#cfn-ask-skill-skillpackage-s3bucket
         */
        readonly s3Bucket: string;
        /**
         * `CfnSkill.SkillPackageProperty.S3BucketRole`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ask-skill-skillpackage.html#cfn-ask-skill-skillpackage-s3bucketrole
         */
        readonly s3BucketRole?: string;
        /**
         * `CfnSkill.SkillPackageProperty.S3Key`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ask-skill-skillpackage.html#cfn-ask-skill-skillpackage-s3key
         */
        readonly s3Key: string;
        /**
         * `CfnSkill.SkillPackageProperty.S3ObjectVersion`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ask-skill-skillpackage.html#cfn-ask-skill-skillpackage-s3objectversion
         */
        readonly s3ObjectVersion?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SkillPackageProperty`
 *
 * @param properties - the TypeScript properties of a `SkillPackageProperty`
 *
 * @returns the result of the validation.
 */
function CfnSkill_SkillPackagePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('overrides', CfnSkill_OverridesPropertyValidator)(properties.overrides));
    errors.collect(cdk.propertyValidator('s3Bucket', cdk.requiredValidator)(properties.s3Bucket));
    errors.collect(cdk.propertyValidator('s3Bucket', cdk.validateString)(properties.s3Bucket));
    errors.collect(cdk.propertyValidator('s3BucketRole', cdk.validateString)(properties.s3BucketRole));
    errors.collect(cdk.propertyValidator('s3Key', cdk.requiredValidator)(properties.s3Key));
    errors.collect(cdk.propertyValidator('s3Key', cdk.validateString)(properties.s3Key));
    errors.collect(cdk.propertyValidator('s3ObjectVersion', cdk.validateString)(properties.s3ObjectVersion));
    return errors.wrap('supplied properties not correct for "SkillPackageProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `Alexa::ASK::Skill.SkillPackage` resource
 *
 * @param properties - the TypeScript properties of a `SkillPackageProperty`
 *
 * @returns the AWS CloudFormation properties of an `Alexa::ASK::Skill.SkillPackage` resource.
 */
// @ts-ignore TS6133
function cfnSkillSkillPackagePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSkill_SkillPackagePropertyValidator(properties).assertSuccess();
    return {
        Overrides: cfnSkillOverridesPropertyToCloudFormation(properties.overrides),
        S3Bucket: cdk.stringToCloudFormation(properties.s3Bucket),
        S3BucketRole: cdk.stringToCloudFormation(properties.s3BucketRole),
        S3Key: cdk.stringToCloudFormation(properties.s3Key),
        S3ObjectVersion: cdk.stringToCloudFormation(properties.s3ObjectVersion),
    };
}

// @ts-ignore TS6133
function CfnSkillSkillPackagePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSkill.SkillPackageProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSkill.SkillPackageProperty>();
    ret.addPropertyResult('overrides', 'Overrides', properties.Overrides != null ? CfnSkillOverridesPropertyFromCloudFormation(properties.Overrides) : undefined);
    ret.addPropertyResult('s3Bucket', 'S3Bucket', cfn_parse.FromCloudFormation.getString(properties.S3Bucket));
    ret.addPropertyResult('s3BucketRole', 'S3BucketRole', properties.S3BucketRole != null ? cfn_parse.FromCloudFormation.getString(properties.S3BucketRole) : undefined);
    ret.addPropertyResult('s3Key', 'S3Key', cfn_parse.FromCloudFormation.getString(properties.S3Key));
    ret.addPropertyResult('s3ObjectVersion', 'S3ObjectVersion', properties.S3ObjectVersion != null ? cfn_parse.FromCloudFormation.getString(properties.S3ObjectVersion) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
