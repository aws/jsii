// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:06.939Z","fingerprint":"3kZyL8KSeiR8uzIJyLjRIv6BZ6Tp45soZNGfBt5Hsic="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnBillingGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-billinggroup.html
 */
export interface CfnBillingGroupProps {

    /**
     * `AWS::BillingConductor::BillingGroup.AccountGrouping`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-billinggroup.html#cfn-billingconductor-billinggroup-accountgrouping
     */
    readonly accountGrouping: CfnBillingGroup.AccountGroupingProperty | cdk.IResolvable;

    /**
     * `AWS::BillingConductor::BillingGroup.ComputationPreference`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-billinggroup.html#cfn-billingconductor-billinggroup-computationpreference
     */
    readonly computationPreference: CfnBillingGroup.ComputationPreferenceProperty | cdk.IResolvable;

    /**
     * `AWS::BillingConductor::BillingGroup.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-billinggroup.html#cfn-billingconductor-billinggroup-name
     */
    readonly name: string;

    /**
     * `AWS::BillingConductor::BillingGroup.PrimaryAccountId`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-billinggroup.html#cfn-billingconductor-billinggroup-primaryaccountid
     */
    readonly primaryAccountId: string;

    /**
     * `AWS::BillingConductor::BillingGroup.Description`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-billinggroup.html#cfn-billingconductor-billinggroup-description
     */
    readonly description?: string;
}

/**
 * Determine whether the given properties match those of a `CfnBillingGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnBillingGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnBillingGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accountGrouping', cdk.requiredValidator)(properties.accountGrouping));
    errors.collect(cdk.propertyValidator('accountGrouping', CfnBillingGroup_AccountGroupingPropertyValidator)(properties.accountGrouping));
    errors.collect(cdk.propertyValidator('computationPreference', cdk.requiredValidator)(properties.computationPreference));
    errors.collect(cdk.propertyValidator('computationPreference', CfnBillingGroup_ComputationPreferencePropertyValidator)(properties.computationPreference));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('primaryAccountId', cdk.requiredValidator)(properties.primaryAccountId));
    errors.collect(cdk.propertyValidator('primaryAccountId', cdk.validateString)(properties.primaryAccountId));
    return errors.wrap('supplied properties not correct for "CfnBillingGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::BillingConductor::BillingGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnBillingGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::BillingConductor::BillingGroup` resource.
 */
// @ts-ignore TS6133
function cfnBillingGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnBillingGroupPropsValidator(properties).assertSuccess();
    return {
        AccountGrouping: cfnBillingGroupAccountGroupingPropertyToCloudFormation(properties.accountGrouping),
        ComputationPreference: cfnBillingGroupComputationPreferencePropertyToCloudFormation(properties.computationPreference),
        Name: cdk.stringToCloudFormation(properties.name),
        PrimaryAccountId: cdk.stringToCloudFormation(properties.primaryAccountId),
        Description: cdk.stringToCloudFormation(properties.description),
    };
}

// @ts-ignore TS6133
function CfnBillingGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnBillingGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnBillingGroupProps>();
    ret.addPropertyResult('accountGrouping', 'AccountGrouping', CfnBillingGroupAccountGroupingPropertyFromCloudFormation(properties.AccountGrouping));
    ret.addPropertyResult('computationPreference', 'ComputationPreference', CfnBillingGroupComputationPreferencePropertyFromCloudFormation(properties.ComputationPreference));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('primaryAccountId', 'PrimaryAccountId', cfn_parse.FromCloudFormation.getString(properties.PrimaryAccountId));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::BillingConductor::BillingGroup`
 *
 *
 *
 * @cloudformationResource AWS::BillingConductor::BillingGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-billinggroup.html
 */
export class CfnBillingGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::BillingConductor::BillingGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnBillingGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnBillingGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnBillingGroup(scope, id, propsResult.value);
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
     *
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: number;

    /**
     *
     * @cloudformationAttribute LastModifiedTime
     */
    public readonly attrLastModifiedTime: number;

    /**
     *
     * @cloudformationAttribute Size
     */
    public readonly attrSize: number;

    /**
     *
     * @cloudformationAttribute Status
     */
    public readonly attrStatus: string;

    /**
     *
     * @cloudformationAttribute StatusReason
     */
    public readonly attrStatusReason: string;

    /**
     * `AWS::BillingConductor::BillingGroup.AccountGrouping`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-billinggroup.html#cfn-billingconductor-billinggroup-accountgrouping
     */
    public accountGrouping: CfnBillingGroup.AccountGroupingProperty | cdk.IResolvable;

    /**
     * `AWS::BillingConductor::BillingGroup.ComputationPreference`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-billinggroup.html#cfn-billingconductor-billinggroup-computationpreference
     */
    public computationPreference: CfnBillingGroup.ComputationPreferenceProperty | cdk.IResolvable;

    /**
     * `AWS::BillingConductor::BillingGroup.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-billinggroup.html#cfn-billingconductor-billinggroup-name
     */
    public name: string;

    /**
     * `AWS::BillingConductor::BillingGroup.PrimaryAccountId`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-billinggroup.html#cfn-billingconductor-billinggroup-primaryaccountid
     */
    public primaryAccountId: string;

    /**
     * `AWS::BillingConductor::BillingGroup.Description`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-billinggroup.html#cfn-billingconductor-billinggroup-description
     */
    public description: string | undefined;

    /**
     * Create a new `AWS::BillingConductor::BillingGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnBillingGroupProps) {
        super(scope, id, { type: CfnBillingGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'accountGrouping', this);
        cdk.requireProperty(props, 'computationPreference', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'primaryAccountId', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCreationTime = cdk.Token.asNumber(this.getAtt('CreationTime'));
        this.attrLastModifiedTime = cdk.Token.asNumber(this.getAtt('LastModifiedTime'));
        this.attrSize = cdk.Token.asNumber(this.getAtt('Size'));
        this.attrStatus = cdk.Token.asString(this.getAtt('Status'));
        this.attrStatusReason = cdk.Token.asString(this.getAtt('StatusReason'));

        this.accountGrouping = props.accountGrouping;
        this.computationPreference = props.computationPreference;
        this.name = props.name;
        this.primaryAccountId = props.primaryAccountId;
        this.description = props.description;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnBillingGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            accountGrouping: this.accountGrouping,
            computationPreference: this.computationPreference,
            name: this.name,
            primaryAccountId: this.primaryAccountId,
            description: this.description,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnBillingGroupPropsToCloudFormation(props);
    }
}

export namespace CfnBillingGroup {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-billinggroup-accountgrouping.html
     */
    export interface AccountGroupingProperty {
        /**
         * `CfnBillingGroup.AccountGroupingProperty.LinkedAccountIds`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-billinggroup-accountgrouping.html#cfn-billingconductor-billinggroup-accountgrouping-linkedaccountids
         */
        readonly linkedAccountIds: string[];
    }
}

/**
 * Determine whether the given properties match those of a `AccountGroupingProperty`
 *
 * @param properties - the TypeScript properties of a `AccountGroupingProperty`
 *
 * @returns the result of the validation.
 */
function CfnBillingGroup_AccountGroupingPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('linkedAccountIds', cdk.requiredValidator)(properties.linkedAccountIds));
    errors.collect(cdk.propertyValidator('linkedAccountIds', cdk.listValidator(cdk.validateString))(properties.linkedAccountIds));
    return errors.wrap('supplied properties not correct for "AccountGroupingProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::BillingConductor::BillingGroup.AccountGrouping` resource
 *
 * @param properties - the TypeScript properties of a `AccountGroupingProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::BillingConductor::BillingGroup.AccountGrouping` resource.
 */
// @ts-ignore TS6133
function cfnBillingGroupAccountGroupingPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnBillingGroup_AccountGroupingPropertyValidator(properties).assertSuccess();
    return {
        LinkedAccountIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.linkedAccountIds),
    };
}

// @ts-ignore TS6133
function CfnBillingGroupAccountGroupingPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnBillingGroup.AccountGroupingProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnBillingGroup.AccountGroupingProperty>();
    ret.addPropertyResult('linkedAccountIds', 'LinkedAccountIds', cfn_parse.FromCloudFormation.getStringArray(properties.LinkedAccountIds));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnBillingGroup {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-billinggroup-computationpreference.html
     */
    export interface ComputationPreferenceProperty {
        /**
         * `CfnBillingGroup.ComputationPreferenceProperty.PricingPlanArn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-billinggroup-computationpreference.html#cfn-billingconductor-billinggroup-computationpreference-pricingplanarn
         */
        readonly pricingPlanArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `ComputationPreferenceProperty`
 *
 * @param properties - the TypeScript properties of a `ComputationPreferenceProperty`
 *
 * @returns the result of the validation.
 */
function CfnBillingGroup_ComputationPreferencePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('pricingPlanArn', cdk.requiredValidator)(properties.pricingPlanArn));
    errors.collect(cdk.propertyValidator('pricingPlanArn', cdk.validateString)(properties.pricingPlanArn));
    return errors.wrap('supplied properties not correct for "ComputationPreferenceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::BillingConductor::BillingGroup.ComputationPreference` resource
 *
 * @param properties - the TypeScript properties of a `ComputationPreferenceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::BillingConductor::BillingGroup.ComputationPreference` resource.
 */
// @ts-ignore TS6133
function cfnBillingGroupComputationPreferencePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnBillingGroup_ComputationPreferencePropertyValidator(properties).assertSuccess();
    return {
        PricingPlanArn: cdk.stringToCloudFormation(properties.pricingPlanArn),
    };
}

// @ts-ignore TS6133
function CfnBillingGroupComputationPreferencePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnBillingGroup.ComputationPreferenceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnBillingGroup.ComputationPreferenceProperty>();
    ret.addPropertyResult('pricingPlanArn', 'PricingPlanArn', cfn_parse.FromCloudFormation.getString(properties.PricingPlanArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnCustomLineItem`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-customlineitem.html
 */
export interface CfnCustomLineItemProps {

    /**
     * `AWS::BillingConductor::CustomLineItem.BillingGroupArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-customlineitem.html#cfn-billingconductor-customlineitem-billinggrouparn
     */
    readonly billingGroupArn: string;

    /**
     * `AWS::BillingConductor::CustomLineItem.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-customlineitem.html#cfn-billingconductor-customlineitem-name
     */
    readonly name: string;

    /**
     * `AWS::BillingConductor::CustomLineItem.BillingPeriodRange`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-customlineitem.html#cfn-billingconductor-customlineitem-billingperiodrange
     */
    readonly billingPeriodRange?: CfnCustomLineItem.BillingPeriodRangeProperty | cdk.IResolvable;

    /**
     * `AWS::BillingConductor::CustomLineItem.CustomLineItemChargeDetails`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-customlineitem.html#cfn-billingconductor-customlineitem-customlineitemchargedetails
     */
    readonly customLineItemChargeDetails?: CfnCustomLineItem.CustomLineItemChargeDetailsProperty | cdk.IResolvable;

    /**
     * `AWS::BillingConductor::CustomLineItem.Description`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-customlineitem.html#cfn-billingconductor-customlineitem-description
     */
    readonly description?: string;
}

/**
 * Determine whether the given properties match those of a `CfnCustomLineItemProps`
 *
 * @param properties - the TypeScript properties of a `CfnCustomLineItemProps`
 *
 * @returns the result of the validation.
 */
function CfnCustomLineItemPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('billingGroupArn', cdk.requiredValidator)(properties.billingGroupArn));
    errors.collect(cdk.propertyValidator('billingGroupArn', cdk.validateString)(properties.billingGroupArn));
    errors.collect(cdk.propertyValidator('billingPeriodRange', CfnCustomLineItem_BillingPeriodRangePropertyValidator)(properties.billingPeriodRange));
    errors.collect(cdk.propertyValidator('customLineItemChargeDetails', CfnCustomLineItem_CustomLineItemChargeDetailsPropertyValidator)(properties.customLineItemChargeDetails));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "CfnCustomLineItemProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::BillingConductor::CustomLineItem` resource
 *
 * @param properties - the TypeScript properties of a `CfnCustomLineItemProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::BillingConductor::CustomLineItem` resource.
 */
// @ts-ignore TS6133
function cfnCustomLineItemPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCustomLineItemPropsValidator(properties).assertSuccess();
    return {
        BillingGroupArn: cdk.stringToCloudFormation(properties.billingGroupArn),
        Name: cdk.stringToCloudFormation(properties.name),
        BillingPeriodRange: cfnCustomLineItemBillingPeriodRangePropertyToCloudFormation(properties.billingPeriodRange),
        CustomLineItemChargeDetails: cfnCustomLineItemCustomLineItemChargeDetailsPropertyToCloudFormation(properties.customLineItemChargeDetails),
        Description: cdk.stringToCloudFormation(properties.description),
    };
}

// @ts-ignore TS6133
function CfnCustomLineItemPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCustomLineItemProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCustomLineItemProps>();
    ret.addPropertyResult('billingGroupArn', 'BillingGroupArn', cfn_parse.FromCloudFormation.getString(properties.BillingGroupArn));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('billingPeriodRange', 'BillingPeriodRange', properties.BillingPeriodRange != null ? CfnCustomLineItemBillingPeriodRangePropertyFromCloudFormation(properties.BillingPeriodRange) : undefined);
    ret.addPropertyResult('customLineItemChargeDetails', 'CustomLineItemChargeDetails', properties.CustomLineItemChargeDetails != null ? CfnCustomLineItemCustomLineItemChargeDetailsPropertyFromCloudFormation(properties.CustomLineItemChargeDetails) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::BillingConductor::CustomLineItem`
 *
 *
 *
 * @cloudformationResource AWS::BillingConductor::CustomLineItem
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-customlineitem.html
 */
export class CfnCustomLineItem extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::BillingConductor::CustomLineItem";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnCustomLineItem {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnCustomLineItemPropsFromCloudFormation(resourceProperties);
        const ret = new CfnCustomLineItem(scope, id, propsResult.value);
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
     *
     * @cloudformationAttribute AssociationSize
     */
    public readonly attrAssociationSize: number;

    /**
     *
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: number;

    /**
     *
     * @cloudformationAttribute CurrencyCode
     */
    public readonly attrCurrencyCode: string;

    /**
     *
     * @cloudformationAttribute LastModifiedTime
     */
    public readonly attrLastModifiedTime: number;

    /**
     *
     * @cloudformationAttribute ProductCode
     */
    public readonly attrProductCode: string;

    /**
     * `AWS::BillingConductor::CustomLineItem.BillingGroupArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-customlineitem.html#cfn-billingconductor-customlineitem-billinggrouparn
     */
    public billingGroupArn: string;

    /**
     * `AWS::BillingConductor::CustomLineItem.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-customlineitem.html#cfn-billingconductor-customlineitem-name
     */
    public name: string;

    /**
     * `AWS::BillingConductor::CustomLineItem.BillingPeriodRange`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-customlineitem.html#cfn-billingconductor-customlineitem-billingperiodrange
     */
    public billingPeriodRange: CfnCustomLineItem.BillingPeriodRangeProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::BillingConductor::CustomLineItem.CustomLineItemChargeDetails`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-customlineitem.html#cfn-billingconductor-customlineitem-customlineitemchargedetails
     */
    public customLineItemChargeDetails: CfnCustomLineItem.CustomLineItemChargeDetailsProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::BillingConductor::CustomLineItem.Description`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-customlineitem.html#cfn-billingconductor-customlineitem-description
     */
    public description: string | undefined;

    /**
     * Create a new `AWS::BillingConductor::CustomLineItem`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnCustomLineItemProps) {
        super(scope, id, { type: CfnCustomLineItem.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'billingGroupArn', this);
        cdk.requireProperty(props, 'name', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrAssociationSize = cdk.Token.asNumber(this.getAtt('AssociationSize'));
        this.attrCreationTime = cdk.Token.asNumber(this.getAtt('CreationTime'));
        this.attrCurrencyCode = cdk.Token.asString(this.getAtt('CurrencyCode'));
        this.attrLastModifiedTime = cdk.Token.asNumber(this.getAtt('LastModifiedTime'));
        this.attrProductCode = cdk.Token.asString(this.getAtt('ProductCode'));

        this.billingGroupArn = props.billingGroupArn;
        this.name = props.name;
        this.billingPeriodRange = props.billingPeriodRange;
        this.customLineItemChargeDetails = props.customLineItemChargeDetails;
        this.description = props.description;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnCustomLineItem.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            billingGroupArn: this.billingGroupArn,
            name: this.name,
            billingPeriodRange: this.billingPeriodRange,
            customLineItemChargeDetails: this.customLineItemChargeDetails,
            description: this.description,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnCustomLineItemPropsToCloudFormation(props);
    }
}

export namespace CfnCustomLineItem {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-customlineitem-billingperiodrange.html
     */
    export interface BillingPeriodRangeProperty {
        /**
         * `CfnCustomLineItem.BillingPeriodRangeProperty.ExclusiveEndBillingPeriod`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-customlineitem-billingperiodrange.html#cfn-billingconductor-customlineitem-billingperiodrange-exclusiveendbillingperiod
         */
        readonly exclusiveEndBillingPeriod?: string;
        /**
         * `CfnCustomLineItem.BillingPeriodRangeProperty.InclusiveStartBillingPeriod`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-customlineitem-billingperiodrange.html#cfn-billingconductor-customlineitem-billingperiodrange-inclusivestartbillingperiod
         */
        readonly inclusiveStartBillingPeriod?: string;
    }
}

/**
 * Determine whether the given properties match those of a `BillingPeriodRangeProperty`
 *
 * @param properties - the TypeScript properties of a `BillingPeriodRangeProperty`
 *
 * @returns the result of the validation.
 */
function CfnCustomLineItem_BillingPeriodRangePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('exclusiveEndBillingPeriod', cdk.validateString)(properties.exclusiveEndBillingPeriod));
    errors.collect(cdk.propertyValidator('inclusiveStartBillingPeriod', cdk.validateString)(properties.inclusiveStartBillingPeriod));
    return errors.wrap('supplied properties not correct for "BillingPeriodRangeProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::BillingConductor::CustomLineItem.BillingPeriodRange` resource
 *
 * @param properties - the TypeScript properties of a `BillingPeriodRangeProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::BillingConductor::CustomLineItem.BillingPeriodRange` resource.
 */
// @ts-ignore TS6133
function cfnCustomLineItemBillingPeriodRangePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCustomLineItem_BillingPeriodRangePropertyValidator(properties).assertSuccess();
    return {
        ExclusiveEndBillingPeriod: cdk.stringToCloudFormation(properties.exclusiveEndBillingPeriod),
        InclusiveStartBillingPeriod: cdk.stringToCloudFormation(properties.inclusiveStartBillingPeriod),
    };
}

// @ts-ignore TS6133
function CfnCustomLineItemBillingPeriodRangePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCustomLineItem.BillingPeriodRangeProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCustomLineItem.BillingPeriodRangeProperty>();
    ret.addPropertyResult('exclusiveEndBillingPeriod', 'ExclusiveEndBillingPeriod', properties.ExclusiveEndBillingPeriod != null ? cfn_parse.FromCloudFormation.getString(properties.ExclusiveEndBillingPeriod) : undefined);
    ret.addPropertyResult('inclusiveStartBillingPeriod', 'InclusiveStartBillingPeriod', properties.InclusiveStartBillingPeriod != null ? cfn_parse.FromCloudFormation.getString(properties.InclusiveStartBillingPeriod) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCustomLineItem {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-customlineitem-customlineitemchargedetails.html
     */
    export interface CustomLineItemChargeDetailsProperty {
        /**
         * `CfnCustomLineItem.CustomLineItemChargeDetailsProperty.Flat`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-customlineitem-customlineitemchargedetails.html#cfn-billingconductor-customlineitem-customlineitemchargedetails-flat
         */
        readonly flat?: CfnCustomLineItem.CustomLineItemFlatChargeDetailsProperty | cdk.IResolvable;
        /**
         * `CfnCustomLineItem.CustomLineItemChargeDetailsProperty.Percentage`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-customlineitem-customlineitemchargedetails.html#cfn-billingconductor-customlineitem-customlineitemchargedetails-percentage
         */
        readonly percentage?: CfnCustomLineItem.CustomLineItemPercentageChargeDetailsProperty | cdk.IResolvable;
        /**
         * `CfnCustomLineItem.CustomLineItemChargeDetailsProperty.Type`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-customlineitem-customlineitemchargedetails.html#cfn-billingconductor-customlineitem-customlineitemchargedetails-type
         */
        readonly type: string;
    }
}

/**
 * Determine whether the given properties match those of a `CustomLineItemChargeDetailsProperty`
 *
 * @param properties - the TypeScript properties of a `CustomLineItemChargeDetailsProperty`
 *
 * @returns the result of the validation.
 */
function CfnCustomLineItem_CustomLineItemChargeDetailsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('flat', CfnCustomLineItem_CustomLineItemFlatChargeDetailsPropertyValidator)(properties.flat));
    errors.collect(cdk.propertyValidator('percentage', CfnCustomLineItem_CustomLineItemPercentageChargeDetailsPropertyValidator)(properties.percentage));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "CustomLineItemChargeDetailsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::BillingConductor::CustomLineItem.CustomLineItemChargeDetails` resource
 *
 * @param properties - the TypeScript properties of a `CustomLineItemChargeDetailsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::BillingConductor::CustomLineItem.CustomLineItemChargeDetails` resource.
 */
// @ts-ignore TS6133
function cfnCustomLineItemCustomLineItemChargeDetailsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCustomLineItem_CustomLineItemChargeDetailsPropertyValidator(properties).assertSuccess();
    return {
        Flat: cfnCustomLineItemCustomLineItemFlatChargeDetailsPropertyToCloudFormation(properties.flat),
        Percentage: cfnCustomLineItemCustomLineItemPercentageChargeDetailsPropertyToCloudFormation(properties.percentage),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnCustomLineItemCustomLineItemChargeDetailsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCustomLineItem.CustomLineItemChargeDetailsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCustomLineItem.CustomLineItemChargeDetailsProperty>();
    ret.addPropertyResult('flat', 'Flat', properties.Flat != null ? CfnCustomLineItemCustomLineItemFlatChargeDetailsPropertyFromCloudFormation(properties.Flat) : undefined);
    ret.addPropertyResult('percentage', 'Percentage', properties.Percentage != null ? CfnCustomLineItemCustomLineItemPercentageChargeDetailsPropertyFromCloudFormation(properties.Percentage) : undefined);
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCustomLineItem {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-customlineitem-customlineitemflatchargedetails.html
     */
    export interface CustomLineItemFlatChargeDetailsProperty {
        /**
         * `CfnCustomLineItem.CustomLineItemFlatChargeDetailsProperty.ChargeValue`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-customlineitem-customlineitemflatchargedetails.html#cfn-billingconductor-customlineitem-customlineitemflatchargedetails-chargevalue
         */
        readonly chargeValue: number;
    }
}

/**
 * Determine whether the given properties match those of a `CustomLineItemFlatChargeDetailsProperty`
 *
 * @param properties - the TypeScript properties of a `CustomLineItemFlatChargeDetailsProperty`
 *
 * @returns the result of the validation.
 */
function CfnCustomLineItem_CustomLineItemFlatChargeDetailsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('chargeValue', cdk.requiredValidator)(properties.chargeValue));
    errors.collect(cdk.propertyValidator('chargeValue', cdk.validateNumber)(properties.chargeValue));
    return errors.wrap('supplied properties not correct for "CustomLineItemFlatChargeDetailsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::BillingConductor::CustomLineItem.CustomLineItemFlatChargeDetails` resource
 *
 * @param properties - the TypeScript properties of a `CustomLineItemFlatChargeDetailsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::BillingConductor::CustomLineItem.CustomLineItemFlatChargeDetails` resource.
 */
// @ts-ignore TS6133
function cfnCustomLineItemCustomLineItemFlatChargeDetailsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCustomLineItem_CustomLineItemFlatChargeDetailsPropertyValidator(properties).assertSuccess();
    return {
        ChargeValue: cdk.numberToCloudFormation(properties.chargeValue),
    };
}

// @ts-ignore TS6133
function CfnCustomLineItemCustomLineItemFlatChargeDetailsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCustomLineItem.CustomLineItemFlatChargeDetailsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCustomLineItem.CustomLineItemFlatChargeDetailsProperty>();
    ret.addPropertyResult('chargeValue', 'ChargeValue', cfn_parse.FromCloudFormation.getNumber(properties.ChargeValue));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCustomLineItem {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-customlineitem-customlineitempercentagechargedetails.html
     */
    export interface CustomLineItemPercentageChargeDetailsProperty {
        /**
         * `CfnCustomLineItem.CustomLineItemPercentageChargeDetailsProperty.ChildAssociatedResources`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-customlineitem-customlineitempercentagechargedetails.html#cfn-billingconductor-customlineitem-customlineitempercentagechargedetails-childassociatedresources
         */
        readonly childAssociatedResources?: string[];
        /**
         * `CfnCustomLineItem.CustomLineItemPercentageChargeDetailsProperty.PercentageValue`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-billingconductor-customlineitem-customlineitempercentagechargedetails.html#cfn-billingconductor-customlineitem-customlineitempercentagechargedetails-percentagevalue
         */
        readonly percentageValue: number;
    }
}

/**
 * Determine whether the given properties match those of a `CustomLineItemPercentageChargeDetailsProperty`
 *
 * @param properties - the TypeScript properties of a `CustomLineItemPercentageChargeDetailsProperty`
 *
 * @returns the result of the validation.
 */
function CfnCustomLineItem_CustomLineItemPercentageChargeDetailsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('childAssociatedResources', cdk.listValidator(cdk.validateString))(properties.childAssociatedResources));
    errors.collect(cdk.propertyValidator('percentageValue', cdk.requiredValidator)(properties.percentageValue));
    errors.collect(cdk.propertyValidator('percentageValue', cdk.validateNumber)(properties.percentageValue));
    return errors.wrap('supplied properties not correct for "CustomLineItemPercentageChargeDetailsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::BillingConductor::CustomLineItem.CustomLineItemPercentageChargeDetails` resource
 *
 * @param properties - the TypeScript properties of a `CustomLineItemPercentageChargeDetailsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::BillingConductor::CustomLineItem.CustomLineItemPercentageChargeDetails` resource.
 */
// @ts-ignore TS6133
function cfnCustomLineItemCustomLineItemPercentageChargeDetailsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCustomLineItem_CustomLineItemPercentageChargeDetailsPropertyValidator(properties).assertSuccess();
    return {
        ChildAssociatedResources: cdk.listMapper(cdk.stringToCloudFormation)(properties.childAssociatedResources),
        PercentageValue: cdk.numberToCloudFormation(properties.percentageValue),
    };
}

// @ts-ignore TS6133
function CfnCustomLineItemCustomLineItemPercentageChargeDetailsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCustomLineItem.CustomLineItemPercentageChargeDetailsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCustomLineItem.CustomLineItemPercentageChargeDetailsProperty>();
    ret.addPropertyResult('childAssociatedResources', 'ChildAssociatedResources', properties.ChildAssociatedResources != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ChildAssociatedResources) : undefined);
    ret.addPropertyResult('percentageValue', 'PercentageValue', cfn_parse.FromCloudFormation.getNumber(properties.PercentageValue));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnPricingPlan`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingplan.html
 */
export interface CfnPricingPlanProps {

    /**
     * `AWS::BillingConductor::PricingPlan.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingplan.html#cfn-billingconductor-pricingplan-name
     */
    readonly name: string;

    /**
     * `AWS::BillingConductor::PricingPlan.Description`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingplan.html#cfn-billingconductor-pricingplan-description
     */
    readonly description?: string;

    /**
     * `AWS::BillingConductor::PricingPlan.PricingRuleArns`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingplan.html#cfn-billingconductor-pricingplan-pricingrulearns
     */
    readonly pricingRuleArns?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnPricingPlanProps`
 *
 * @param properties - the TypeScript properties of a `CfnPricingPlanProps`
 *
 * @returns the result of the validation.
 */
function CfnPricingPlanPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('pricingRuleArns', cdk.listValidator(cdk.validateString))(properties.pricingRuleArns));
    return errors.wrap('supplied properties not correct for "CfnPricingPlanProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::BillingConductor::PricingPlan` resource
 *
 * @param properties - the TypeScript properties of a `CfnPricingPlanProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::BillingConductor::PricingPlan` resource.
 */
// @ts-ignore TS6133
function cfnPricingPlanPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPricingPlanPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Description: cdk.stringToCloudFormation(properties.description),
        PricingRuleArns: cdk.listMapper(cdk.stringToCloudFormation)(properties.pricingRuleArns),
    };
}

// @ts-ignore TS6133
function CfnPricingPlanPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPricingPlanProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPricingPlanProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('pricingRuleArns', 'PricingRuleArns', properties.PricingRuleArns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.PricingRuleArns) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::BillingConductor::PricingPlan`
 *
 *
 *
 * @cloudformationResource AWS::BillingConductor::PricingPlan
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingplan.html
 */
export class CfnPricingPlan extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::BillingConductor::PricingPlan";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnPricingPlan {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnPricingPlanPropsFromCloudFormation(resourceProperties);
        const ret = new CfnPricingPlan(scope, id, propsResult.value);
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
     *
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: number;

    /**
     *
     * @cloudformationAttribute LastModifiedTime
     */
    public readonly attrLastModifiedTime: number;

    /**
     *
     * @cloudformationAttribute Size
     */
    public readonly attrSize: number;

    /**
     * `AWS::BillingConductor::PricingPlan.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingplan.html#cfn-billingconductor-pricingplan-name
     */
    public name: string;

    /**
     * `AWS::BillingConductor::PricingPlan.Description`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingplan.html#cfn-billingconductor-pricingplan-description
     */
    public description: string | undefined;

    /**
     * `AWS::BillingConductor::PricingPlan.PricingRuleArns`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingplan.html#cfn-billingconductor-pricingplan-pricingrulearns
     */
    public pricingRuleArns: string[] | undefined;

    /**
     * Create a new `AWS::BillingConductor::PricingPlan`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPricingPlanProps) {
        super(scope, id, { type: CfnPricingPlan.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCreationTime = cdk.Token.asNumber(this.getAtt('CreationTime'));
        this.attrLastModifiedTime = cdk.Token.asNumber(this.getAtt('LastModifiedTime'));
        this.attrSize = cdk.Token.asNumber(this.getAtt('Size'));

        this.name = props.name;
        this.description = props.description;
        this.pricingRuleArns = props.pricingRuleArns;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnPricingPlan.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            description: this.description,
            pricingRuleArns: this.pricingRuleArns,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPricingPlanPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnPricingRule`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html
 */
export interface CfnPricingRuleProps {

    /**
     * `AWS::BillingConductor::PricingRule.ModifierPercentage`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html#cfn-billingconductor-pricingrule-modifierpercentage
     */
    readonly modifierPercentage: number;

    /**
     * `AWS::BillingConductor::PricingRule.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html#cfn-billingconductor-pricingrule-name
     */
    readonly name: string;

    /**
     * `AWS::BillingConductor::PricingRule.Scope`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html#cfn-billingconductor-pricingrule-scope
     */
    readonly scope: string;

    /**
     * `AWS::BillingConductor::PricingRule.Type`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html#cfn-billingconductor-pricingrule-type
     */
    readonly type: string;

    /**
     * `AWS::BillingConductor::PricingRule.Description`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html#cfn-billingconductor-pricingrule-description
     */
    readonly description?: string;

    /**
     * `AWS::BillingConductor::PricingRule.Service`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html#cfn-billingconductor-pricingrule-service
     */
    readonly service?: string;
}

/**
 * Determine whether the given properties match those of a `CfnPricingRuleProps`
 *
 * @param properties - the TypeScript properties of a `CfnPricingRuleProps`
 *
 * @returns the result of the validation.
 */
function CfnPricingRulePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('modifierPercentage', cdk.requiredValidator)(properties.modifierPercentage));
    errors.collect(cdk.propertyValidator('modifierPercentage', cdk.validateNumber)(properties.modifierPercentage));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('scope', cdk.requiredValidator)(properties.scope));
    errors.collect(cdk.propertyValidator('scope', cdk.validateString)(properties.scope));
    errors.collect(cdk.propertyValidator('service', cdk.validateString)(properties.service));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "CfnPricingRuleProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::BillingConductor::PricingRule` resource
 *
 * @param properties - the TypeScript properties of a `CfnPricingRuleProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::BillingConductor::PricingRule` resource.
 */
// @ts-ignore TS6133
function cfnPricingRulePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPricingRulePropsValidator(properties).assertSuccess();
    return {
        ModifierPercentage: cdk.numberToCloudFormation(properties.modifierPercentage),
        Name: cdk.stringToCloudFormation(properties.name),
        Scope: cdk.stringToCloudFormation(properties.scope),
        Type: cdk.stringToCloudFormation(properties.type),
        Description: cdk.stringToCloudFormation(properties.description),
        Service: cdk.stringToCloudFormation(properties.service),
    };
}

// @ts-ignore TS6133
function CfnPricingRulePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPricingRuleProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPricingRuleProps>();
    ret.addPropertyResult('modifierPercentage', 'ModifierPercentage', cfn_parse.FromCloudFormation.getNumber(properties.ModifierPercentage));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('scope', 'Scope', cfn_parse.FromCloudFormation.getString(properties.Scope));
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('service', 'Service', properties.Service != null ? cfn_parse.FromCloudFormation.getString(properties.Service) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::BillingConductor::PricingRule`
 *
 *
 *
 * @cloudformationResource AWS::BillingConductor::PricingRule
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html
 */
export class CfnPricingRule extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::BillingConductor::PricingRule";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnPricingRule {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnPricingRulePropsFromCloudFormation(resourceProperties);
        const ret = new CfnPricingRule(scope, id, propsResult.value);
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
     *
     * @cloudformationAttribute AssociatedPricingPlanCount
     */
    public readonly attrAssociatedPricingPlanCount: number;

    /**
     *
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: number;

    /**
     *
     * @cloudformationAttribute LastModifiedTime
     */
    public readonly attrLastModifiedTime: number;

    /**
     * `AWS::BillingConductor::PricingRule.ModifierPercentage`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html#cfn-billingconductor-pricingrule-modifierpercentage
     */
    public modifierPercentage: number;

    /**
     * `AWS::BillingConductor::PricingRule.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html#cfn-billingconductor-pricingrule-name
     */
    public name: string;

    /**
     * `AWS::BillingConductor::PricingRule.Scope`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html#cfn-billingconductor-pricingrule-scope
     */
    public scope: string;

    /**
     * `AWS::BillingConductor::PricingRule.Type`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html#cfn-billingconductor-pricingrule-type
     */
    public type: string;

    /**
     * `AWS::BillingConductor::PricingRule.Description`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html#cfn-billingconductor-pricingrule-description
     */
    public description: string | undefined;

    /**
     * `AWS::BillingConductor::PricingRule.Service`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-billingconductor-pricingrule.html#cfn-billingconductor-pricingrule-service
     */
    public service: string | undefined;

    /**
     * Create a new `AWS::BillingConductor::PricingRule`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPricingRuleProps) {
        super(scope, id, { type: CfnPricingRule.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'modifierPercentage', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'scope', this);
        cdk.requireProperty(props, 'type', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrAssociatedPricingPlanCount = cdk.Token.asNumber(this.getAtt('AssociatedPricingPlanCount'));
        this.attrCreationTime = cdk.Token.asNumber(this.getAtt('CreationTime'));
        this.attrLastModifiedTime = cdk.Token.asNumber(this.getAtt('LastModifiedTime'));

        this.modifierPercentage = props.modifierPercentage;
        this.name = props.name;
        this.scope = props.scope;
        this.type = props.type;
        this.description = props.description;
        this.service = props.service;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnPricingRule.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            modifierPercentage: this.modifierPercentage,
            name: this.name,
            scope: this.scope,
            type: this.type,
            description: this.description,
            service: this.service,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPricingRulePropsToCloudFormation(props);
    }
}
