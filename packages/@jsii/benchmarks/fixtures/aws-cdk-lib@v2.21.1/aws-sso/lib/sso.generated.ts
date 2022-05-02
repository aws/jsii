// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:10.278Z","fingerprint":"xbVvQg3ZSLh7p8i859w1ml1gRlsCnT0p2E3rloPsTCs="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnAssignment`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-assignment.html
 */
export interface CfnAssignmentProps {

    /**
     * The ARN of the SSO instance under which the operation will be executed. For more information about ARNs, see [Amazon Resource Names (ARNs) and AWS Service Namespaces](https://docs.aws.amazon.com//general/latest/gr/aws-arns-and-namespaces.html) in the *AWS General Reference* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-assignment.html#cfn-sso-assignment-instancearn
     */
    readonly instanceArn: string;

    /**
     * The ARN of the permission set.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-assignment.html#cfn-sso-assignment-permissionsetarn
     */
    readonly permissionSetArn: string;

    /**
     * An identifier for an object in AWS SSO , such as a user or group. PrincipalIds are GUIDs (For example, f81d4fae-7dec-11d0-a765-00a0c91e6bf6). For more information about PrincipalIds in AWS SSO , see the [AWS SSO Identity Store API Reference](https://docs.aws.amazon.com//singlesignon/latest/IdentityStoreAPIReference/welcome.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-assignment.html#cfn-sso-assignment-principalid
     */
    readonly principalId: string;

    /**
     * The entity type for which the assignment will be created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-assignment.html#cfn-sso-assignment-principaltype
     */
    readonly principalType: string;

    /**
     * TargetID is an AWS account identifier, typically a 10-12 digit string (For example, 123456789012).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-assignment.html#cfn-sso-assignment-targetid
     */
    readonly targetId: string;

    /**
     * The entity type for which the assignment will be created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-assignment.html#cfn-sso-assignment-targettype
     */
    readonly targetType: string;
}

/**
 * Determine whether the given properties match those of a `CfnAssignmentProps`
 *
 * @param properties - the TypeScript properties of a `CfnAssignmentProps`
 *
 * @returns the result of the validation.
 */
function CfnAssignmentPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceArn', cdk.requiredValidator)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.validateString)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('permissionSetArn', cdk.requiredValidator)(properties.permissionSetArn));
    errors.collect(cdk.propertyValidator('permissionSetArn', cdk.validateString)(properties.permissionSetArn));
    errors.collect(cdk.propertyValidator('principalId', cdk.requiredValidator)(properties.principalId));
    errors.collect(cdk.propertyValidator('principalId', cdk.validateString)(properties.principalId));
    errors.collect(cdk.propertyValidator('principalType', cdk.requiredValidator)(properties.principalType));
    errors.collect(cdk.propertyValidator('principalType', cdk.validateString)(properties.principalType));
    errors.collect(cdk.propertyValidator('targetId', cdk.requiredValidator)(properties.targetId));
    errors.collect(cdk.propertyValidator('targetId', cdk.validateString)(properties.targetId));
    errors.collect(cdk.propertyValidator('targetType', cdk.requiredValidator)(properties.targetType));
    errors.collect(cdk.propertyValidator('targetType', cdk.validateString)(properties.targetType));
    return errors.wrap('supplied properties not correct for "CfnAssignmentProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SSO::Assignment` resource
 *
 * @param properties - the TypeScript properties of a `CfnAssignmentProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SSO::Assignment` resource.
 */
// @ts-ignore TS6133
function cfnAssignmentPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAssignmentPropsValidator(properties).assertSuccess();
    return {
        InstanceArn: cdk.stringToCloudFormation(properties.instanceArn),
        PermissionSetArn: cdk.stringToCloudFormation(properties.permissionSetArn),
        PrincipalId: cdk.stringToCloudFormation(properties.principalId),
        PrincipalType: cdk.stringToCloudFormation(properties.principalType),
        TargetId: cdk.stringToCloudFormation(properties.targetId),
        TargetType: cdk.stringToCloudFormation(properties.targetType),
    };
}

// @ts-ignore TS6133
function CfnAssignmentPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAssignmentProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAssignmentProps>();
    ret.addPropertyResult('instanceArn', 'InstanceArn', cfn_parse.FromCloudFormation.getString(properties.InstanceArn));
    ret.addPropertyResult('permissionSetArn', 'PermissionSetArn', cfn_parse.FromCloudFormation.getString(properties.PermissionSetArn));
    ret.addPropertyResult('principalId', 'PrincipalId', cfn_parse.FromCloudFormation.getString(properties.PrincipalId));
    ret.addPropertyResult('principalType', 'PrincipalType', cfn_parse.FromCloudFormation.getString(properties.PrincipalType));
    ret.addPropertyResult('targetId', 'TargetId', cfn_parse.FromCloudFormation.getString(properties.TargetId));
    ret.addPropertyResult('targetType', 'TargetType', cfn_parse.FromCloudFormation.getString(properties.TargetType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SSO::Assignment`
 *
 * Assigns access to a Principal for a specified AWS account using a specified permission set.
 *
 * > The term *principal* here refers to a user or group that is defined in AWS SSO .
 *
 * @cloudformationResource AWS::SSO::Assignment
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-assignment.html
 */
export class CfnAssignment extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SSO::Assignment";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAssignment {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAssignmentPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAssignment(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the SSO instance under which the operation will be executed. For more information about ARNs, see [Amazon Resource Names (ARNs) and AWS Service Namespaces](https://docs.aws.amazon.com//general/latest/gr/aws-arns-and-namespaces.html) in the *AWS General Reference* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-assignment.html#cfn-sso-assignment-instancearn
     */
    public instanceArn: string;

    /**
     * The ARN of the permission set.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-assignment.html#cfn-sso-assignment-permissionsetarn
     */
    public permissionSetArn: string;

    /**
     * An identifier for an object in AWS SSO , such as a user or group. PrincipalIds are GUIDs (For example, f81d4fae-7dec-11d0-a765-00a0c91e6bf6). For more information about PrincipalIds in AWS SSO , see the [AWS SSO Identity Store API Reference](https://docs.aws.amazon.com//singlesignon/latest/IdentityStoreAPIReference/welcome.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-assignment.html#cfn-sso-assignment-principalid
     */
    public principalId: string;

    /**
     * The entity type for which the assignment will be created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-assignment.html#cfn-sso-assignment-principaltype
     */
    public principalType: string;

    /**
     * TargetID is an AWS account identifier, typically a 10-12 digit string (For example, 123456789012).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-assignment.html#cfn-sso-assignment-targetid
     */
    public targetId: string;

    /**
     * The entity type for which the assignment will be created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-assignment.html#cfn-sso-assignment-targettype
     */
    public targetType: string;

    /**
     * Create a new `AWS::SSO::Assignment`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAssignmentProps) {
        super(scope, id, { type: CfnAssignment.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'instanceArn', this);
        cdk.requireProperty(props, 'permissionSetArn', this);
        cdk.requireProperty(props, 'principalId', this);
        cdk.requireProperty(props, 'principalType', this);
        cdk.requireProperty(props, 'targetId', this);
        cdk.requireProperty(props, 'targetType', this);

        this.instanceArn = props.instanceArn;
        this.permissionSetArn = props.permissionSetArn;
        this.principalId = props.principalId;
        this.principalType = props.principalType;
        this.targetId = props.targetId;
        this.targetType = props.targetType;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAssignment.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            instanceArn: this.instanceArn,
            permissionSetArn: this.permissionSetArn,
            principalId: this.principalId,
            principalType: this.principalType,
            targetId: this.targetId,
            targetType: this.targetType,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAssignmentPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnInstanceAccessControlAttributeConfiguration`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-instanceaccesscontrolattributeconfiguration.html
 */
export interface CfnInstanceAccessControlAttributeConfigurationProps {

    /**
     * The ARN of the AWS SSO instance under which the operation will be executed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-instanceaccesscontrolattributeconfiguration.html#cfn-sso-instanceaccesscontrolattributeconfiguration-instancearn
     */
    readonly instanceArn: string;

    /**
     * Lists the attributes that are configured for ABAC in the specified AWS SSO instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-instanceaccesscontrolattributeconfiguration.html#cfn-sso-instanceaccesscontrolattributeconfiguration-accesscontrolattributes
     */
    readonly accessControlAttributes?: Array<CfnInstanceAccessControlAttributeConfiguration.AccessControlAttributeProperty | cdk.IResolvable> | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnInstanceAccessControlAttributeConfigurationProps`
 *
 * @param properties - the TypeScript properties of a `CfnInstanceAccessControlAttributeConfigurationProps`
 *
 * @returns the result of the validation.
 */
function CfnInstanceAccessControlAttributeConfigurationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessControlAttributes', cdk.listValidator(CfnInstanceAccessControlAttributeConfiguration_AccessControlAttributePropertyValidator))(properties.accessControlAttributes));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.requiredValidator)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.validateString)(properties.instanceArn));
    return errors.wrap('supplied properties not correct for "CfnInstanceAccessControlAttributeConfigurationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SSO::InstanceAccessControlAttributeConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CfnInstanceAccessControlAttributeConfigurationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SSO::InstanceAccessControlAttributeConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnInstanceAccessControlAttributeConfigurationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnInstanceAccessControlAttributeConfigurationPropsValidator(properties).assertSuccess();
    return {
        InstanceArn: cdk.stringToCloudFormation(properties.instanceArn),
        AccessControlAttributes: cdk.listMapper(cfnInstanceAccessControlAttributeConfigurationAccessControlAttributePropertyToCloudFormation)(properties.accessControlAttributes),
    };
}

// @ts-ignore TS6133
function CfnInstanceAccessControlAttributeConfigurationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnInstanceAccessControlAttributeConfigurationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnInstanceAccessControlAttributeConfigurationProps>();
    ret.addPropertyResult('instanceArn', 'InstanceArn', cfn_parse.FromCloudFormation.getString(properties.InstanceArn));
    ret.addPropertyResult('accessControlAttributes', 'AccessControlAttributes', properties.AccessControlAttributes != null ? cfn_parse.FromCloudFormation.getArray(CfnInstanceAccessControlAttributeConfigurationAccessControlAttributePropertyFromCloudFormation)(properties.AccessControlAttributes) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SSO::InstanceAccessControlAttributeConfiguration`
 *
 * Enables the attribute-based access control (ABAC) feature for the specified AWS SSO instance. You can also specify new attributes to add to your ABAC configuration during the enabling process. For more information about ABAC, see [Attribute-Based Access Control](https://docs.aws.amazon.com//singlesignon/latest/userguide/abac.html) in the *AWS SSO User Guide* .
 *
 * > The `InstanceAccessControlAttributeConfiguration` property has been deprecated but is still supported for backwards compatibility purposes. We recommend that you use the `AccessControlAttributes` property instead.
 *
 * @cloudformationResource AWS::SSO::InstanceAccessControlAttributeConfiguration
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-instanceaccesscontrolattributeconfiguration.html
 */
export class CfnInstanceAccessControlAttributeConfiguration extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SSO::InstanceAccessControlAttributeConfiguration";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnInstanceAccessControlAttributeConfiguration {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnInstanceAccessControlAttributeConfigurationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnInstanceAccessControlAttributeConfiguration(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the AWS SSO instance under which the operation will be executed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-instanceaccesscontrolattributeconfiguration.html#cfn-sso-instanceaccesscontrolattributeconfiguration-instancearn
     */
    public instanceArn: string;

    /**
     * Lists the attributes that are configured for ABAC in the specified AWS SSO instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-instanceaccesscontrolattributeconfiguration.html#cfn-sso-instanceaccesscontrolattributeconfiguration-accesscontrolattributes
     */
    public accessControlAttributes: Array<CfnInstanceAccessControlAttributeConfiguration.AccessControlAttributeProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::SSO::InstanceAccessControlAttributeConfiguration`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnInstanceAccessControlAttributeConfigurationProps) {
        super(scope, id, { type: CfnInstanceAccessControlAttributeConfiguration.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'instanceArn', this);

        this.instanceArn = props.instanceArn;
        this.accessControlAttributes = props.accessControlAttributes;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnInstanceAccessControlAttributeConfiguration.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            instanceArn: this.instanceArn,
            accessControlAttributes: this.accessControlAttributes,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnInstanceAccessControlAttributeConfigurationPropsToCloudFormation(props);
    }
}

export namespace CfnInstanceAccessControlAttributeConfiguration {
    /**
     * These are AWS SSO identity store attributes that you can configure for use in attributes-based access control (ABAC). You can create permissions policies that determine who can access your AWS resources based upon the configured attribute values. When you enable ABAC and specify `AccessControlAttributes` , AWS SSO passes the attribute values of the authenticated user into IAM for use in policy evaluation.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sso-instanceaccesscontrolattributeconfiguration-accesscontrolattribute.html
     */
    export interface AccessControlAttributeProperty {
        /**
         * The name of the attribute associated with your identities in your identity source. This is used to map a specified attribute in your identity source with an attribute in AWS SSO .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sso-instanceaccesscontrolattributeconfiguration-accesscontrolattribute.html#cfn-sso-instanceaccesscontrolattributeconfiguration-accesscontrolattribute-key
         */
        readonly key: string;
        /**
         * The value used for mapping a specified attribute to an identity source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sso-instanceaccesscontrolattributeconfiguration-accesscontrolattribute.html#cfn-sso-instanceaccesscontrolattributeconfiguration-accesscontrolattribute-value
         */
        readonly value: CfnInstanceAccessControlAttributeConfiguration.AccessControlAttributeValueProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AccessControlAttributeProperty`
 *
 * @param properties - the TypeScript properties of a `AccessControlAttributeProperty`
 *
 * @returns the result of the validation.
 */
function CfnInstanceAccessControlAttributeConfiguration_AccessControlAttributePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('key', cdk.requiredValidator)(properties.key));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', CfnInstanceAccessControlAttributeConfiguration_AccessControlAttributeValuePropertyValidator)(properties.value));
    return errors.wrap('supplied properties not correct for "AccessControlAttributeProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SSO::InstanceAccessControlAttributeConfiguration.AccessControlAttribute` resource
 *
 * @param properties - the TypeScript properties of a `AccessControlAttributeProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SSO::InstanceAccessControlAttributeConfiguration.AccessControlAttribute` resource.
 */
// @ts-ignore TS6133
function cfnInstanceAccessControlAttributeConfigurationAccessControlAttributePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnInstanceAccessControlAttributeConfiguration_AccessControlAttributePropertyValidator(properties).assertSuccess();
    return {
        Key: cdk.stringToCloudFormation(properties.key),
        Value: cfnInstanceAccessControlAttributeConfigurationAccessControlAttributeValuePropertyToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnInstanceAccessControlAttributeConfigurationAccessControlAttributePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnInstanceAccessControlAttributeConfiguration.AccessControlAttributeProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnInstanceAccessControlAttributeConfiguration.AccessControlAttributeProperty>();
    ret.addPropertyResult('key', 'Key', cfn_parse.FromCloudFormation.getString(properties.Key));
    ret.addPropertyResult('value', 'Value', CfnInstanceAccessControlAttributeConfigurationAccessControlAttributeValuePropertyFromCloudFormation(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnInstanceAccessControlAttributeConfiguration {
    /**
     * The value used for mapping a specified attribute to an identity source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sso-instanceaccesscontrolattributeconfiguration-accesscontrolattributevalue.html
     */
    export interface AccessControlAttributeValueProperty {
        /**
         * The identity source to use when mapping a specified attribute to AWS SSO .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sso-instanceaccesscontrolattributeconfiguration-accesscontrolattributevalue.html#cfn-sso-instanceaccesscontrolattributeconfiguration-accesscontrolattributevalue-source
         */
        readonly source: string[];
    }
}

/**
 * Determine whether the given properties match those of a `AccessControlAttributeValueProperty`
 *
 * @param properties - the TypeScript properties of a `AccessControlAttributeValueProperty`
 *
 * @returns the result of the validation.
 */
function CfnInstanceAccessControlAttributeConfiguration_AccessControlAttributeValuePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('source', cdk.requiredValidator)(properties.source));
    errors.collect(cdk.propertyValidator('source', cdk.listValidator(cdk.validateString))(properties.source));
    return errors.wrap('supplied properties not correct for "AccessControlAttributeValueProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SSO::InstanceAccessControlAttributeConfiguration.AccessControlAttributeValue` resource
 *
 * @param properties - the TypeScript properties of a `AccessControlAttributeValueProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SSO::InstanceAccessControlAttributeConfiguration.AccessControlAttributeValue` resource.
 */
// @ts-ignore TS6133
function cfnInstanceAccessControlAttributeConfigurationAccessControlAttributeValuePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnInstanceAccessControlAttributeConfiguration_AccessControlAttributeValuePropertyValidator(properties).assertSuccess();
    return {
        Source: cdk.listMapper(cdk.stringToCloudFormation)(properties.source),
    };
}

// @ts-ignore TS6133
function CfnInstanceAccessControlAttributeConfigurationAccessControlAttributeValuePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnInstanceAccessControlAttributeConfiguration.AccessControlAttributeValueProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnInstanceAccessControlAttributeConfiguration.AccessControlAttributeValueProperty>();
    ret.addPropertyResult('source', 'Source', cfn_parse.FromCloudFormation.getStringArray(properties.Source));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnPermissionSet`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html
 */
export interface CfnPermissionSetProps {

    /**
     * The ARN of the SSO instance under which the operation will be executed. For more information about ARNs, see [Amazon Resource Names (ARNs) and AWS Service Namespaces](https://docs.aws.amazon.com//general/latest/gr/aws-arns-and-namespaces.html) in the *AWS General Reference* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-instancearn
     */
    readonly instanceArn: string;

    /**
     * The name of the permission set.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-name
     */
    readonly name: string;

    /**
     * The description of the `PermissionSet` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-description
     */
    readonly description?: string;

    /**
     * The IAM inline policy that is attached to the permission set.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-inlinepolicy
     */
    readonly inlinePolicy?: any | cdk.IResolvable;

    /**
     * A structure that stores the details of the IAM managed policy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-managedpolicies
     */
    readonly managedPolicies?: string[];

    /**
     * Used to redirect users within the application during the federation authentication process.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-relaystatetype
     */
    readonly relayStateType?: string;

    /**
     * The length of time that the application user sessions are valid for in the ISO-8601 standard.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-sessionduration
     */
    readonly sessionDuration?: string;

    /**
     * The tags to attach to the new `PermissionSet` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnPermissionSetProps`
 *
 * @param properties - the TypeScript properties of a `CfnPermissionSetProps`
 *
 * @returns the result of the validation.
 */
function CfnPermissionSetPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('inlinePolicy', cdk.validateObject)(properties.inlinePolicy));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.requiredValidator)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('instanceArn', cdk.validateString)(properties.instanceArn));
    errors.collect(cdk.propertyValidator('managedPolicies', cdk.listValidator(cdk.validateString))(properties.managedPolicies));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('relayStateType', cdk.validateString)(properties.relayStateType));
    errors.collect(cdk.propertyValidator('sessionDuration', cdk.validateString)(properties.sessionDuration));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnPermissionSetProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SSO::PermissionSet` resource
 *
 * @param properties - the TypeScript properties of a `CfnPermissionSetProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SSO::PermissionSet` resource.
 */
// @ts-ignore TS6133
function cfnPermissionSetPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPermissionSetPropsValidator(properties).assertSuccess();
    return {
        InstanceArn: cdk.stringToCloudFormation(properties.instanceArn),
        Name: cdk.stringToCloudFormation(properties.name),
        Description: cdk.stringToCloudFormation(properties.description),
        InlinePolicy: cdk.objectToCloudFormation(properties.inlinePolicy),
        ManagedPolicies: cdk.listMapper(cdk.stringToCloudFormation)(properties.managedPolicies),
        RelayStateType: cdk.stringToCloudFormation(properties.relayStateType),
        SessionDuration: cdk.stringToCloudFormation(properties.sessionDuration),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnPermissionSetPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPermissionSetProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPermissionSetProps>();
    ret.addPropertyResult('instanceArn', 'InstanceArn', cfn_parse.FromCloudFormation.getString(properties.InstanceArn));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('inlinePolicy', 'InlinePolicy', properties.InlinePolicy != null ? cfn_parse.FromCloudFormation.getAny(properties.InlinePolicy) : undefined);
    ret.addPropertyResult('managedPolicies', 'ManagedPolicies', properties.ManagedPolicies != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ManagedPolicies) : undefined);
    ret.addPropertyResult('relayStateType', 'RelayStateType', properties.RelayStateType != null ? cfn_parse.FromCloudFormation.getString(properties.RelayStateType) : undefined);
    ret.addPropertyResult('sessionDuration', 'SessionDuration', properties.SessionDuration != null ? cfn_parse.FromCloudFormation.getString(properties.SessionDuration) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SSO::PermissionSet`
 *
 * Specifies a permission set within a specified SSO instance.
 *
 * @cloudformationResource AWS::SSO::PermissionSet
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html
 */
export class CfnPermissionSet extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SSO::PermissionSet";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnPermissionSet {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnPermissionSetPropsFromCloudFormation(resourceProperties);
        const ret = new CfnPermissionSet(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The permission set ARN of the permission set, such as `arn:aws:sso:::permissionSet/ins-instanceid/ps-permissionsetid` .
     * @cloudformationAttribute PermissionSetArn
     */
    public readonly attrPermissionSetArn: string;

    /**
     * The ARN of the SSO instance under which the operation will be executed. For more information about ARNs, see [Amazon Resource Names (ARNs) and AWS Service Namespaces](https://docs.aws.amazon.com//general/latest/gr/aws-arns-and-namespaces.html) in the *AWS General Reference* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-instancearn
     */
    public instanceArn: string;

    /**
     * The name of the permission set.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-name
     */
    public name: string;

    /**
     * The description of the `PermissionSet` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-description
     */
    public description: string | undefined;

    /**
     * The IAM inline policy that is attached to the permission set.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-inlinepolicy
     */
    public inlinePolicy: any | cdk.IResolvable | undefined;

    /**
     * A structure that stores the details of the IAM managed policy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-managedpolicies
     */
    public managedPolicies: string[] | undefined;

    /**
     * Used to redirect users within the application during the federation authentication process.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-relaystatetype
     */
    public relayStateType: string | undefined;

    /**
     * The length of time that the application user sessions are valid for in the ISO-8601 standard.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-sessionduration
     */
    public sessionDuration: string | undefined;

    /**
     * The tags to attach to the new `PermissionSet` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html#cfn-sso-permissionset-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::SSO::PermissionSet`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPermissionSetProps) {
        super(scope, id, { type: CfnPermissionSet.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'instanceArn', this);
        cdk.requireProperty(props, 'name', this);
        this.attrPermissionSetArn = cdk.Token.asString(this.getAtt('PermissionSetArn'));

        this.instanceArn = props.instanceArn;
        this.name = props.name;
        this.description = props.description;
        this.inlinePolicy = props.inlinePolicy;
        this.managedPolicies = props.managedPolicies;
        this.relayStateType = props.relayStateType;
        this.sessionDuration = props.sessionDuration;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SSO::PermissionSet", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnPermissionSet.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            instanceArn: this.instanceArn,
            name: this.name,
            description: this.description,
            inlinePolicy: this.inlinePolicy,
            managedPolicies: this.managedPolicies,
            relayStateType: this.relayStateType,
            sessionDuration: this.sessionDuration,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPermissionSetPropsToCloudFormation(props);
    }
}
