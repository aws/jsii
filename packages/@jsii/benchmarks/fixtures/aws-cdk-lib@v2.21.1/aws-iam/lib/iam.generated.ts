// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:10:06.279Z","fingerprint":"y8RCilGgMXxv6bNAz63uau2fQbONQ6OvJbY6rKD+XeU="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnAccessKey`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-accesskey.html
 */
export interface CfnAccessKeyProps {

    /**
     * The name of the IAM user that the new key will belong to.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-accesskey.html#cfn-iam-accesskey-username
     */
    readonly userName: string;

    /**
     * This value is specific to CloudFormation and can only be *incremented* . Incrementing this value notifies CloudFormation that you want to rotate your access key. When you update your stack, CloudFormation will replace the existing access key with a new key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-accesskey.html#cfn-iam-accesskey-serial
     */
    readonly serial?: number;

    /**
     * The status of the access key. `Active` means that the key is valid for API calls, while `Inactive` means it is not.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-accesskey.html#cfn-iam-accesskey-status
     */
    readonly status?: string;
}

/**
 * Determine whether the given properties match those of a `CfnAccessKeyProps`
 *
 * @param properties - the TypeScript properties of a `CfnAccessKeyProps`
 *
 * @returns the result of the validation.
 */
function CfnAccessKeyPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('serial', cdk.validateNumber)(properties.serial));
    errors.collect(cdk.propertyValidator('status', cdk.validateString)(properties.status));
    errors.collect(cdk.propertyValidator('userName', cdk.requiredValidator)(properties.userName));
    errors.collect(cdk.propertyValidator('userName', cdk.validateString)(properties.userName));
    return errors.wrap('supplied properties not correct for "CfnAccessKeyProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::AccessKey` resource
 *
 * @param properties - the TypeScript properties of a `CfnAccessKeyProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::AccessKey` resource.
 */
// @ts-ignore TS6133
function cfnAccessKeyPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAccessKeyPropsValidator(properties).assertSuccess();
    return {
        UserName: cdk.stringToCloudFormation(properties.userName),
        Serial: cdk.numberToCloudFormation(properties.serial),
        Status: cdk.stringToCloudFormation(properties.status),
    };
}

// @ts-ignore TS6133
function CfnAccessKeyPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAccessKeyProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAccessKeyProps>();
    ret.addPropertyResult('userName', 'UserName', cfn_parse.FromCloudFormation.getString(properties.UserName));
    ret.addPropertyResult('serial', 'Serial', properties.Serial != null ? cfn_parse.FromCloudFormation.getNumber(properties.Serial) : undefined);
    ret.addPropertyResult('status', 'Status', properties.Status != null ? cfn_parse.FromCloudFormation.getString(properties.Status) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IAM::AccessKey`
 *
 * Creates a new AWS secret access key and corresponding AWS access key ID for the specified user. The default status for new keys is `Active` .
 *
 * If you do not specify a user name, IAM determines the user name implicitly based on the AWS access key ID signing the request. This operation works for access keys under the AWS account . Consequently, you can use this operation to manage AWS account root user credentials. This is true even if the AWS account has no associated users.
 *
 * For information about quotas on the number of keys you can create, see [IAM and AWS STS quotas](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html) in the *IAM User Guide* .
 *
 * > To ensure the security of your AWS account , the secret access key is accessible only during key and user creation. You must save the key (for example, in a text file) if you want to be able to access it again. If a secret key is lost, you can delete the access keys for the associated user and then create new keys.
 *
 * @cloudformationResource AWS::IAM::AccessKey
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-accesskey.html
 */
export class CfnAccessKey extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IAM::AccessKey";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAccessKey {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAccessKeyPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAccessKey(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Returns the secret access key for the specified AWS::IAM::AccessKey resource. For example: wJalrXUtnFEMI/K7MDENG/bPxRfiCYzEXAMPLEKEY.
     * @cloudformationAttribute SecretAccessKey
     */
    public readonly attrSecretAccessKey: string;

    /**
     * The name of the IAM user that the new key will belong to.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-accesskey.html#cfn-iam-accesskey-username
     */
    public userName: string;

    /**
     * This value is specific to CloudFormation and can only be *incremented* . Incrementing this value notifies CloudFormation that you want to rotate your access key. When you update your stack, CloudFormation will replace the existing access key with a new key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-accesskey.html#cfn-iam-accesskey-serial
     */
    public serial: number | undefined;

    /**
     * The status of the access key. `Active` means that the key is valid for API calls, while `Inactive` means it is not.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-accesskey.html#cfn-iam-accesskey-status
     */
    public status: string | undefined;

    /**
     * Create a new `AWS::IAM::AccessKey`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAccessKeyProps) {
        super(scope, id, { type: CfnAccessKey.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'userName', this);
        this.attrSecretAccessKey = cdk.Token.asString(this.getAtt('SecretAccessKey'));

        this.userName = props.userName;
        this.serial = props.serial;
        this.status = props.status;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAccessKey.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            userName: this.userName,
            serial: this.serial,
            status: this.status,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAccessKeyPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-group.html
 */
export interface CfnGroupProps {

    /**
     * The name of the group to create. Do not include the path in this value.
     *
     * The group name must be unique within the account. Group names are not distinguished by case. For example, you cannot create groups named both "ADMINS" and "admins". If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the group name.
     *
     * > If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.
     *
     * If you specify a name, you must specify the `CAPABILITY_NAMED_IAM` value to acknowledge your template's capabilities. For more information, see [Acknowledging IAM Resources in AWS CloudFormation Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities) .
     *
     * > Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using `Fn::Join` and `AWS::Region` to create a Region-specific name, as in the following example: `{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-group.html#cfn-iam-group-groupname
     */
    readonly groupName?: string;

    /**
     * The Amazon Resource Name (ARN) of the IAM policy you want to attach.
     *
     * For more information about ARNs, see [Amazon Resource Names (ARNs)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *AWS General Reference* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-group.html#cfn-iam-group-managepolicyarns
     */
    readonly managedPolicyArns?: string[];

    /**
     * The path to the group. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide* .
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/).
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! ( `\ u0021` ) through the DEL character ( `\ u007F` ), including most punctuation characters, digits, and upper and lowercased letters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-group.html#cfn-iam-group-path
     */
    readonly path?: string;

    /**
     * Adds or updates an inline policy document that is embedded in the specified IAM group. To view AWS::IAM::Group snippets, see [Declaring an IAM Group Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-iam.html#scenario-iam-group) .
     *
     * > The name of each inline policy for a role, user, or group must be unique. If you don't choose unique names, updates to the IAM identity will fail.
     *
     * For information about limits on the number of inline policies that you can embed in a group, see [Limitations on IAM Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-group.html#cfn-iam-group-policies
     */
    readonly policies?: Array<CfnGroup.PolicyProperty | cdk.IResolvable> | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('groupName', cdk.validateString)(properties.groupName));
    errors.collect(cdk.propertyValidator('managedPolicyArns', cdk.listValidator(cdk.validateString))(properties.managedPolicyArns));
    errors.collect(cdk.propertyValidator('path', cdk.validateString)(properties.path));
    errors.collect(cdk.propertyValidator('policies', cdk.listValidator(CfnGroup_PolicyPropertyValidator))(properties.policies));
    return errors.wrap('supplied properties not correct for "CfnGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::Group` resource
 *
 * @param properties - the TypeScript properties of a `CfnGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::Group` resource.
 */
// @ts-ignore TS6133
function cfnGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGroupPropsValidator(properties).assertSuccess();
    return {
        GroupName: cdk.stringToCloudFormation(properties.groupName),
        ManagedPolicyArns: cdk.listMapper(cdk.stringToCloudFormation)(properties.managedPolicyArns),
        Path: cdk.stringToCloudFormation(properties.path),
        Policies: cdk.listMapper(cfnGroupPolicyPropertyToCloudFormation)(properties.policies),
    };
}

// @ts-ignore TS6133
function CfnGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGroupProps>();
    ret.addPropertyResult('groupName', 'GroupName', properties.GroupName != null ? cfn_parse.FromCloudFormation.getString(properties.GroupName) : undefined);
    ret.addPropertyResult('managedPolicyArns', 'ManagedPolicyArns', properties.ManagedPolicyArns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ManagedPolicyArns) : undefined);
    ret.addPropertyResult('path', 'Path', properties.Path != null ? cfn_parse.FromCloudFormation.getString(properties.Path) : undefined);
    ret.addPropertyResult('policies', 'Policies', properties.Policies != null ? cfn_parse.FromCloudFormation.getArray(CfnGroupPolicyPropertyFromCloudFormation)(properties.Policies) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IAM::Group`
 *
 * Creates a new group.
 *
 * For information about the number of groups you can create, see [Limitations on IAM Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *IAM User Guide* .
 *
 * @cloudformationResource AWS::IAM::Group
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-group.html
 */
export class CfnGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IAM::Group";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Returns the Amazon Resource Name (ARN) for the specified `AWS::IAM::Group` resource. For example: `arn:aws:iam::123456789012:group/mystack-mygroup-1DZETITOWEKVO` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The name of the group to create. Do not include the path in this value.
     *
     * The group name must be unique within the account. Group names are not distinguished by case. For example, you cannot create groups named both "ADMINS" and "admins". If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the group name.
     *
     * > If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.
     *
     * If you specify a name, you must specify the `CAPABILITY_NAMED_IAM` value to acknowledge your template's capabilities. For more information, see [Acknowledging IAM Resources in AWS CloudFormation Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities) .
     *
     * > Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using `Fn::Join` and `AWS::Region` to create a Region-specific name, as in the following example: `{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-group.html#cfn-iam-group-groupname
     */
    public groupName: string | undefined;

    /**
     * The Amazon Resource Name (ARN) of the IAM policy you want to attach.
     *
     * For more information about ARNs, see [Amazon Resource Names (ARNs)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *AWS General Reference* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-group.html#cfn-iam-group-managepolicyarns
     */
    public managedPolicyArns: string[] | undefined;

    /**
     * The path to the group. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide* .
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/).
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! ( `\ u0021` ) through the DEL character ( `\ u007F` ), including most punctuation characters, digits, and upper and lowercased letters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-group.html#cfn-iam-group-path
     */
    public path: string | undefined;

    /**
     * Adds or updates an inline policy document that is embedded in the specified IAM group. To view AWS::IAM::Group snippets, see [Declaring an IAM Group Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-iam.html#scenario-iam-group) .
     *
     * > The name of each inline policy for a role, user, or group must be unique. If you don't choose unique names, updates to the IAM identity will fail.
     *
     * For information about limits on the number of inline policies that you can embed in a group, see [Limitations on IAM Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-group.html#cfn-iam-group-policies
     */
    public policies: Array<CfnGroup.PolicyProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::IAM::Group`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnGroupProps = {}) {
        super(scope, id, { type: CfnGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.groupName = props.groupName;
        this.managedPolicyArns = props.managedPolicyArns;
        this.path = props.path;
        this.policies = props.policies;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            groupName: this.groupName,
            managedPolicyArns: this.managedPolicyArns,
            path: this.path,
            policies: this.policies,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnGroupPropsToCloudFormation(props);
    }
}

export namespace CfnGroup {
    /**
     * Contains information about an attached policy.
     *
     * An attached policy is a managed policy that has been attached to a user, group, or role.
     *
     * For more information about managed policies, see [Managed Policies and Inline Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/policies-managed-vs-inline.html) in the *IAM User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-policy.html
     */
    export interface PolicyProperty {
        /**
         * The policy document.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-policy.html#cfn-iam-policies-policydocument
         */
        readonly policyDocument: any | cdk.IResolvable;
        /**
         * The friendly name (not ARN) identifying the policy.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-policy.html#cfn-iam-policies-policyname
         */
        readonly policyName: string;
    }
}

/**
 * Determine whether the given properties match those of a `PolicyProperty`
 *
 * @param properties - the TypeScript properties of a `PolicyProperty`
 *
 * @returns the result of the validation.
 */
function CfnGroup_PolicyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('policyDocument', cdk.requiredValidator)(properties.policyDocument));
    errors.collect(cdk.propertyValidator('policyDocument', cdk.validateObject)(properties.policyDocument));
    errors.collect(cdk.propertyValidator('policyName', cdk.requiredValidator)(properties.policyName));
    errors.collect(cdk.propertyValidator('policyName', cdk.validateString)(properties.policyName));
    return errors.wrap('supplied properties not correct for "PolicyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::Group.Policy` resource
 *
 * @param properties - the TypeScript properties of a `PolicyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::Group.Policy` resource.
 */
// @ts-ignore TS6133
function cfnGroupPolicyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGroup_PolicyPropertyValidator(properties).assertSuccess();
    return {
        PolicyDocument: cdk.objectToCloudFormation(properties.policyDocument),
        PolicyName: cdk.stringToCloudFormation(properties.policyName),
    };
}

// @ts-ignore TS6133
function CfnGroupPolicyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGroup.PolicyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGroup.PolicyProperty>();
    ret.addPropertyResult('policyDocument', 'PolicyDocument', cfn_parse.FromCloudFormation.getAny(properties.PolicyDocument));
    ret.addPropertyResult('policyName', 'PolicyName', cfn_parse.FromCloudFormation.getString(properties.PolicyName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnInstanceProfile`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-instanceprofile.html
 */
export interface CfnInstanceProfileProps {

    /**
     * The name of the role to associate with the instance profile. Only one role can be assigned to an EC2 instance at a time, and all applications on the instance share the same role and permissions.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-instanceprofile.html#cfn-iam-instanceprofile-roles
     */
    readonly roles: string[];

    /**
     * The name of the instance profile to create.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-instanceprofile.html#cfn-iam-instanceprofile-instanceprofilename
     */
    readonly instanceProfileName?: string;

    /**
     * The path to the instance profile. For more information about paths, see [IAM Identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide* .
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/).
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! ( `\ u0021` ) through the DEL character ( `\ u007F` ), including most punctuation characters, digits, and upper and lowercased letters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-instanceprofile.html#cfn-iam-instanceprofile-path
     */
    readonly path?: string;
}

/**
 * Determine whether the given properties match those of a `CfnInstanceProfileProps`
 *
 * @param properties - the TypeScript properties of a `CfnInstanceProfileProps`
 *
 * @returns the result of the validation.
 */
function CfnInstanceProfilePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceProfileName', cdk.validateString)(properties.instanceProfileName));
    errors.collect(cdk.propertyValidator('path', cdk.validateString)(properties.path));
    errors.collect(cdk.propertyValidator('roles', cdk.requiredValidator)(properties.roles));
    errors.collect(cdk.propertyValidator('roles', cdk.listValidator(cdk.validateString))(properties.roles));
    return errors.wrap('supplied properties not correct for "CfnInstanceProfileProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::InstanceProfile` resource
 *
 * @param properties - the TypeScript properties of a `CfnInstanceProfileProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::InstanceProfile` resource.
 */
// @ts-ignore TS6133
function cfnInstanceProfilePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnInstanceProfilePropsValidator(properties).assertSuccess();
    return {
        Roles: cdk.listMapper(cdk.stringToCloudFormation)(properties.roles),
        InstanceProfileName: cdk.stringToCloudFormation(properties.instanceProfileName),
        Path: cdk.stringToCloudFormation(properties.path),
    };
}

// @ts-ignore TS6133
function CfnInstanceProfilePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnInstanceProfileProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnInstanceProfileProps>();
    ret.addPropertyResult('roles', 'Roles', cfn_parse.FromCloudFormation.getStringArray(properties.Roles));
    ret.addPropertyResult('instanceProfileName', 'InstanceProfileName', properties.InstanceProfileName != null ? cfn_parse.FromCloudFormation.getString(properties.InstanceProfileName) : undefined);
    ret.addPropertyResult('path', 'Path', properties.Path != null ? cfn_parse.FromCloudFormation.getString(properties.Path) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IAM::InstanceProfile`
 *
 * Creates a new instance profile. For information about instance profiles, see [Using instance profiles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html) .
 *
 * For information about the number of instance profiles you can create, see [IAM object quotas](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html) in the *IAM User Guide* .
 *
 * @cloudformationResource AWS::IAM::InstanceProfile
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-instanceprofile.html
 */
export class CfnInstanceProfile extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IAM::InstanceProfile";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnInstanceProfile {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnInstanceProfilePropsFromCloudFormation(resourceProperties);
        const ret = new CfnInstanceProfile(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Returns the Amazon Resource Name (ARN) for the instance profile. For example:
     *
     * `{"Fn::GetAtt" : ["MyProfile", "Arn"] }`
     *
     * This returns a value such as `arn:aws:iam::1234567890:instance-profile/MyProfile-ASDNSDLKJ` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The name of the role to associate with the instance profile. Only one role can be assigned to an EC2 instance at a time, and all applications on the instance share the same role and permissions.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-instanceprofile.html#cfn-iam-instanceprofile-roles
     */
    public roles: string[];

    /**
     * The name of the instance profile to create.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-instanceprofile.html#cfn-iam-instanceprofile-instanceprofilename
     */
    public instanceProfileName: string | undefined;

    /**
     * The path to the instance profile. For more information about paths, see [IAM Identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide* .
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/).
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! ( `\ u0021` ) through the DEL character ( `\ u007F` ), including most punctuation characters, digits, and upper and lowercased letters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-instanceprofile.html#cfn-iam-instanceprofile-path
     */
    public path: string | undefined;

    /**
     * Create a new `AWS::IAM::InstanceProfile`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnInstanceProfileProps) {
        super(scope, id, { type: CfnInstanceProfile.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'roles', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.roles = props.roles;
        this.instanceProfileName = props.instanceProfileName;
        this.path = props.path;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnInstanceProfile.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            roles: this.roles,
            instanceProfileName: this.instanceProfileName,
            path: this.path,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnInstanceProfilePropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnManagedPolicy`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html
 */
export interface CfnManagedPolicyProps {

    /**
     * The JSON policy document that you want to use as the content for the new policy.
     *
     * You must provide policies in JSON format in IAM. However, for AWS CloudFormation templates formatted in YAML, you can provide the policy in JSON or YAML format. AWS CloudFormation always converts a YAML policy to JSON format before submitting it to IAM.
     *
     * The maximum length of the policy document that you can pass in this operation, including whitespace, is listed below. To view the maximum character counts of a managed policy with no whitespaces, see [IAM and AWS STS character quotas](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html#reference_iam-quotas-entity-length) .
     *
     * To learn more about JSON policy grammar, see [Grammar of the IAM JSON policy language](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_grammar.html) in the *IAM User Guide* .
     *
     * The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following:
     *
     * - Any printable ASCII character ranging from the space character ( `\ u0020` ) through the end of the ASCII character range
     * - The printable characters in the Basic Latin and Latin-1 Supplement character set (through `\ u00FF` )
     * - The special characters tab ( `\ u0009` ), line feed ( `\ u000A` ), and carriage return ( `\ u000D` )
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html#cfn-iam-managedpolicy-policydocument
     */
    readonly policyDocument: any | cdk.IResolvable;

    /**
     * A friendly description of the policy.
     *
     * Typically used to store information about the permissions defined in the policy. For example, "Grants access to production DynamoDB tables."
     *
     * The policy description is immutable. After a value is assigned, it cannot be changed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html#cfn-iam-managedpolicy-description
     */
    readonly description?: string;

    /**
     * The name (friendly name, not ARN) of the group to attach the policy to.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html#cfn-iam-managedpolicy-groups
     */
    readonly groups?: string[];

    /**
     * The friendly name of the policy.
     *
     * > If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.
     *
     * If you specify a name, you must specify the `CAPABILITY_NAMED_IAM` value to acknowledge your template's capabilities. For more information, see [Acknowledging IAM Resources in AWS CloudFormation Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities) .
     *
     * > Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using `Fn::Join` and `AWS::Region` to create a Region-specific name, as in the following example: `{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html#cfn-iam-managedpolicy-managedpolicyname
     */
    readonly managedPolicyName?: string;

    /**
     * The path for the policy.
     *
     * For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide* .
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/).
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! ( `\ u0021` ) through the DEL character ( `\ u007F` ), including most punctuation characters, digits, and upper and lowercased letters.
     *
     * > You cannot use an asterisk (*) in the path name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html#cfn-ec2-dhcpoptions-path
     */
    readonly path?: string;

    /**
     * The name (friendly name, not ARN) of the role to attach the policy to.
     *
     * This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * > If an external policy (such as `AWS::IAM::Policy` or `AWS::IAM::ManagedPolicy` ) has a `Ref` to a role and if a resource (such as `AWS::ECS::Service` ) also has a `Ref` to the same role, add a `DependsOn` attribute to the resource to make the resource depend on the external policy. This dependency ensures that the role's policy is available throughout the resource's lifecycle. For example, when you delete a stack with an `AWS::ECS::Service` resource, the `DependsOn` attribute ensures that AWS CloudFormation deletes the `AWS::ECS::Service` resource before deleting its role's policy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html#cfn-iam-managedpolicy-roles
     */
    readonly roles?: string[];

    /**
     * The name (friendly name, not ARN) of the IAM user to attach the policy to.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html#cfn-iam-managedpolicy-users
     */
    readonly users?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnManagedPolicyProps`
 *
 * @param properties - the TypeScript properties of a `CfnManagedPolicyProps`
 *
 * @returns the result of the validation.
 */
function CfnManagedPolicyPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('groups', cdk.listValidator(cdk.validateString))(properties.groups));
    errors.collect(cdk.propertyValidator('managedPolicyName', cdk.validateString)(properties.managedPolicyName));
    errors.collect(cdk.propertyValidator('path', cdk.validateString)(properties.path));
    errors.collect(cdk.propertyValidator('policyDocument', cdk.requiredValidator)(properties.policyDocument));
    errors.collect(cdk.propertyValidator('policyDocument', cdk.validateObject)(properties.policyDocument));
    errors.collect(cdk.propertyValidator('roles', cdk.listValidator(cdk.validateString))(properties.roles));
    errors.collect(cdk.propertyValidator('users', cdk.listValidator(cdk.validateString))(properties.users));
    return errors.wrap('supplied properties not correct for "CfnManagedPolicyProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::ManagedPolicy` resource
 *
 * @param properties - the TypeScript properties of a `CfnManagedPolicyProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::ManagedPolicy` resource.
 */
// @ts-ignore TS6133
function cfnManagedPolicyPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnManagedPolicyPropsValidator(properties).assertSuccess();
    return {
        PolicyDocument: cdk.objectToCloudFormation(properties.policyDocument),
        Description: cdk.stringToCloudFormation(properties.description),
        Groups: cdk.listMapper(cdk.stringToCloudFormation)(properties.groups),
        ManagedPolicyName: cdk.stringToCloudFormation(properties.managedPolicyName),
        Path: cdk.stringToCloudFormation(properties.path),
        Roles: cdk.listMapper(cdk.stringToCloudFormation)(properties.roles),
        Users: cdk.listMapper(cdk.stringToCloudFormation)(properties.users),
    };
}

// @ts-ignore TS6133
function CfnManagedPolicyPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnManagedPolicyProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnManagedPolicyProps>();
    ret.addPropertyResult('policyDocument', 'PolicyDocument', cfn_parse.FromCloudFormation.getAny(properties.PolicyDocument));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('groups', 'Groups', properties.Groups != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Groups) : undefined);
    ret.addPropertyResult('managedPolicyName', 'ManagedPolicyName', properties.ManagedPolicyName != null ? cfn_parse.FromCloudFormation.getString(properties.ManagedPolicyName) : undefined);
    ret.addPropertyResult('path', 'Path', properties.Path != null ? cfn_parse.FromCloudFormation.getString(properties.Path) : undefined);
    ret.addPropertyResult('roles', 'Roles', properties.Roles != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Roles) : undefined);
    ret.addPropertyResult('users', 'Users', properties.Users != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Users) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IAM::ManagedPolicy`
 *
 * Creates a new managed policy for your AWS account .
 *
 * This operation creates a policy version with a version identifier of `v1` and sets v1 as the policy's default version. For more information about policy versions, see [Versioning for managed policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/policies-managed-versions.html) in the *IAM User Guide* .
 *
 * As a best practice, you can validate your IAM policies. To learn more, see [Validating IAM policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_policy-validator.html) in the *IAM User Guide* .
 *
 * For more information about managed policies in general, see [Managed policies and inline policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/policies-managed-vs-inline.html) in the *IAM User Guide* .
 *
 * @cloudformationResource AWS::IAM::ManagedPolicy
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html
 */
export class CfnManagedPolicy extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IAM::ManagedPolicy";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnManagedPolicy {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnManagedPolicyPropsFromCloudFormation(resourceProperties);
        const ret = new CfnManagedPolicy(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The JSON policy document that you want to use as the content for the new policy.
     *
     * You must provide policies in JSON format in IAM. However, for AWS CloudFormation templates formatted in YAML, you can provide the policy in JSON or YAML format. AWS CloudFormation always converts a YAML policy to JSON format before submitting it to IAM.
     *
     * The maximum length of the policy document that you can pass in this operation, including whitespace, is listed below. To view the maximum character counts of a managed policy with no whitespaces, see [IAM and AWS STS character quotas](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html#reference_iam-quotas-entity-length) .
     *
     * To learn more about JSON policy grammar, see [Grammar of the IAM JSON policy language](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_grammar.html) in the *IAM User Guide* .
     *
     * The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following:
     *
     * - Any printable ASCII character ranging from the space character ( `\ u0020` ) through the end of the ASCII character range
     * - The printable characters in the Basic Latin and Latin-1 Supplement character set (through `\ u00FF` )
     * - The special characters tab ( `\ u0009` ), line feed ( `\ u000A` ), and carriage return ( `\ u000D` )
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html#cfn-iam-managedpolicy-policydocument
     */
    public policyDocument: any | cdk.IResolvable;

    /**
     * A friendly description of the policy.
     *
     * Typically used to store information about the permissions defined in the policy. For example, "Grants access to production DynamoDB tables."
     *
     * The policy description is immutable. After a value is assigned, it cannot be changed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html#cfn-iam-managedpolicy-description
     */
    public description: string | undefined;

    /**
     * The name (friendly name, not ARN) of the group to attach the policy to.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html#cfn-iam-managedpolicy-groups
     */
    public groups: string[] | undefined;

    /**
     * The friendly name of the policy.
     *
     * > If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.
     *
     * If you specify a name, you must specify the `CAPABILITY_NAMED_IAM` value to acknowledge your template's capabilities. For more information, see [Acknowledging IAM Resources in AWS CloudFormation Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities) .
     *
     * > Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using `Fn::Join` and `AWS::Region` to create a Region-specific name, as in the following example: `{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html#cfn-iam-managedpolicy-managedpolicyname
     */
    public managedPolicyName: string | undefined;

    /**
     * The path for the policy.
     *
     * For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide* .
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/).
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! ( `\ u0021` ) through the DEL character ( `\ u007F` ), including most punctuation characters, digits, and upper and lowercased letters.
     *
     * > You cannot use an asterisk (*) in the path name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html#cfn-ec2-dhcpoptions-path
     */
    public path: string | undefined;

    /**
     * The name (friendly name, not ARN) of the role to attach the policy to.
     *
     * This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * > If an external policy (such as `AWS::IAM::Policy` or `AWS::IAM::ManagedPolicy` ) has a `Ref` to a role and if a resource (such as `AWS::ECS::Service` ) also has a `Ref` to the same role, add a `DependsOn` attribute to the resource to make the resource depend on the external policy. This dependency ensures that the role's policy is available throughout the resource's lifecycle. For example, when you delete a stack with an `AWS::ECS::Service` resource, the `DependsOn` attribute ensures that AWS CloudFormation deletes the `AWS::ECS::Service` resource before deleting its role's policy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html#cfn-iam-managedpolicy-roles
     */
    public roles: string[] | undefined;

    /**
     * The name (friendly name, not ARN) of the IAM user to attach the policy to.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html#cfn-iam-managedpolicy-users
     */
    public users: string[] | undefined;

    /**
     * Create a new `AWS::IAM::ManagedPolicy`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnManagedPolicyProps) {
        super(scope, id, { type: CfnManagedPolicy.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'policyDocument', this);

        this.policyDocument = props.policyDocument;
        this.description = props.description;
        this.groups = props.groups;
        this.managedPolicyName = props.managedPolicyName;
        this.path = props.path;
        this.roles = props.roles;
        this.users = props.users;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnManagedPolicy.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            policyDocument: this.policyDocument,
            description: this.description,
            groups: this.groups,
            managedPolicyName: this.managedPolicyName,
            path: this.path,
            roles: this.roles,
            users: this.users,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnManagedPolicyPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnOIDCProvider`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-oidcprovider.html
 */
export interface CfnOIDCProviderProps {

    /**
     * A list of certificate thumbprints that are associated with the specified IAM OIDC provider resource object. For more information, see [CreateOpenIDConnectProvider](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateOpenIDConnectProvider.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-oidcprovider.html#cfn-iam-oidcprovider-thumbprintlist
     */
    readonly thumbprintList: string[];

    /**
     * A list of client IDs (also known as audiences) that are associated with the specified IAM OIDC provider resource object. For more information, see [CreateOpenIDConnectProvider](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateOpenIDConnectProvider.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-oidcprovider.html#cfn-iam-oidcprovider-clientidlist
     */
    readonly clientIdList?: string[];

    /**
     * A list of tags that are attached to the specified IAM OIDC provider. The returned list of tags is sorted by tag key. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-oidcprovider.html#cfn-iam-oidcprovider-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The URL that the IAM OIDC provider resource object is associated with. For more information, see [CreateOpenIDConnectProvider](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateOpenIDConnectProvider.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-oidcprovider.html#cfn-iam-oidcprovider-url
     */
    readonly url?: string;
}

/**
 * Determine whether the given properties match those of a `CfnOIDCProviderProps`
 *
 * @param properties - the TypeScript properties of a `CfnOIDCProviderProps`
 *
 * @returns the result of the validation.
 */
function CfnOIDCProviderPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clientIdList', cdk.listValidator(cdk.validateString))(properties.clientIdList));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('thumbprintList', cdk.requiredValidator)(properties.thumbprintList));
    errors.collect(cdk.propertyValidator('thumbprintList', cdk.listValidator(cdk.validateString))(properties.thumbprintList));
    errors.collect(cdk.propertyValidator('url', cdk.validateString)(properties.url));
    return errors.wrap('supplied properties not correct for "CfnOIDCProviderProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::OIDCProvider` resource
 *
 * @param properties - the TypeScript properties of a `CfnOIDCProviderProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::OIDCProvider` resource.
 */
// @ts-ignore TS6133
function cfnOIDCProviderPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnOIDCProviderPropsValidator(properties).assertSuccess();
    return {
        ThumbprintList: cdk.listMapper(cdk.stringToCloudFormation)(properties.thumbprintList),
        ClientIdList: cdk.listMapper(cdk.stringToCloudFormation)(properties.clientIdList),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        Url: cdk.stringToCloudFormation(properties.url),
    };
}

// @ts-ignore TS6133
function CfnOIDCProviderPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnOIDCProviderProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnOIDCProviderProps>();
    ret.addPropertyResult('thumbprintList', 'ThumbprintList', cfn_parse.FromCloudFormation.getStringArray(properties.ThumbprintList));
    ret.addPropertyResult('clientIdList', 'ClientIdList', properties.ClientIdList != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ClientIdList) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('url', 'Url', properties.Url != null ? cfn_parse.FromCloudFormation.getString(properties.Url) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IAM::OIDCProvider`
 *
 * Creates an IAM entity to describe an identity provider (IdP) that supports [OpenID Connect (OIDC)](https://docs.aws.amazon.com/http://openid.net/connect/) .
 *
 * The OIDC provider that you create with this operation can be used as a principal in a role's trust policy. Such a policy establishes a trust relationship between AWS and the OIDC provider.
 *
 * When you create the IAM OIDC provider, you specify the following:
 *
 * - The URL of the OIDC identity provider (IdP) to trust
 * - A list of client IDs (also known as audiences) that identify the application or applications that are allowed to authenticate using the OIDC provider
 * - A list of thumbprints of one or more server certificates that the IdP uses
 *
 * You get all of this information from the OIDC IdP that you want to use to access AWS .
 *
 * > The trust for the OIDC provider is derived from the IAM provider that this operation creates. Therefore, it is best to limit access to the [CreateOpenIDConnectProvider](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateOpenIDConnectProvider.html) operation to highly privileged users.
 *
 * @cloudformationResource AWS::IAM::OIDCProvider
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-oidcprovider.html
 */
export class CfnOIDCProvider extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IAM::OIDCProvider";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnOIDCProvider {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnOIDCProviderPropsFromCloudFormation(resourceProperties);
        const ret = new CfnOIDCProvider(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Returns the Amazon Resource Name (ARN) for the specified `AWS::IAM::OIDCProvider` resource.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * A list of certificate thumbprints that are associated with the specified IAM OIDC provider resource object. For more information, see [CreateOpenIDConnectProvider](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateOpenIDConnectProvider.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-oidcprovider.html#cfn-iam-oidcprovider-thumbprintlist
     */
    public thumbprintList: string[];

    /**
     * A list of client IDs (also known as audiences) that are associated with the specified IAM OIDC provider resource object. For more information, see [CreateOpenIDConnectProvider](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateOpenIDConnectProvider.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-oidcprovider.html#cfn-iam-oidcprovider-clientidlist
     */
    public clientIdList: string[] | undefined;

    /**
     * A list of tags that are attached to the specified IAM OIDC provider. The returned list of tags is sorted by tag key. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-oidcprovider.html#cfn-iam-oidcprovider-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The URL that the IAM OIDC provider resource object is associated with. For more information, see [CreateOpenIDConnectProvider](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateOpenIDConnectProvider.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-oidcprovider.html#cfn-iam-oidcprovider-url
     */
    public url: string | undefined;

    /**
     * Create a new `AWS::IAM::OIDCProvider`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnOIDCProviderProps) {
        super(scope, id, { type: CfnOIDCProvider.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'thumbprintList', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.thumbprintList = props.thumbprintList;
        this.clientIdList = props.clientIdList;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IAM::OIDCProvider", props.tags, { tagPropertyName: 'tags' });
        this.url = props.url;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnOIDCProvider.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            thumbprintList: this.thumbprintList,
            clientIdList: this.clientIdList,
            tags: this.tags.renderTags(),
            url: this.url,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnOIDCProviderPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnPolicy`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html
 */
export interface CfnPolicyProps {

    /**
     * The policy document.
     *
     * You must provide policies in JSON format in IAM. However, for AWS CloudFormation templates formatted in YAML, you can provide the policy in JSON or YAML format. AWS CloudFormation always converts a YAML policy to JSON format before submitting it to IAM.
     *
     * The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following:
     *
     * - Any printable ASCII character ranging from the space character ( `\ u0020` ) through the end of the ASCII character range
     * - The printable characters in the Basic Latin and Latin-1 Supplement character set (through `\ u00FF` )
     * - The special characters tab ( `\ u0009` ), line feed ( `\ u000A` ), and carriage return ( `\ u000D` )
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html#cfn-iam-policy-policydocument
     */
    readonly policyDocument: any | cdk.IResolvable;

    /**
     * The name of the policy document.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html#cfn-iam-policy-policyname
     */
    readonly policyName: string;

    /**
     * The name of the group to associate the policy with.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html#cfn-iam-policy-groups
     */
    readonly groups?: string[];

    /**
     * The name of the role to associate the policy with.
     *
     * This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * > If an external policy (such as `AWS::IAM::Policy` or `AWS::IAM::ManagedPolicy` ) has a `Ref` to a role and if a resource (such as `AWS::ECS::Service` ) also has a `Ref` to the same role, add a `DependsOn` attribute to the resource to make the resource depend on the external policy. This dependency ensures that the role's policy is available throughout the resource's lifecycle. For example, when you delete a stack with an `AWS::ECS::Service` resource, the `DependsOn` attribute ensures that AWS CloudFormation deletes the `AWS::ECS::Service` resource before deleting its role's policy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html#cfn-iam-policy-roles
     */
    readonly roles?: string[];

    /**
     * The name of the user to associate the policy with.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html#cfn-iam-policy-users
     */
    readonly users?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnPolicyProps`
 *
 * @param properties - the TypeScript properties of a `CfnPolicyProps`
 *
 * @returns the result of the validation.
 */
function CfnPolicyPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('groups', cdk.listValidator(cdk.validateString))(properties.groups));
    errors.collect(cdk.propertyValidator('policyDocument', cdk.requiredValidator)(properties.policyDocument));
    errors.collect(cdk.propertyValidator('policyDocument', cdk.validateObject)(properties.policyDocument));
    errors.collect(cdk.propertyValidator('policyName', cdk.requiredValidator)(properties.policyName));
    errors.collect(cdk.propertyValidator('policyName', cdk.validateString)(properties.policyName));
    errors.collect(cdk.propertyValidator('roles', cdk.listValidator(cdk.validateString))(properties.roles));
    errors.collect(cdk.propertyValidator('users', cdk.listValidator(cdk.validateString))(properties.users));
    return errors.wrap('supplied properties not correct for "CfnPolicyProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::Policy` resource
 *
 * @param properties - the TypeScript properties of a `CfnPolicyProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::Policy` resource.
 */
// @ts-ignore TS6133
function cfnPolicyPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPolicyPropsValidator(properties).assertSuccess();
    return {
        PolicyDocument: cdk.objectToCloudFormation(properties.policyDocument),
        PolicyName: cdk.stringToCloudFormation(properties.policyName),
        Groups: cdk.listMapper(cdk.stringToCloudFormation)(properties.groups),
        Roles: cdk.listMapper(cdk.stringToCloudFormation)(properties.roles),
        Users: cdk.listMapper(cdk.stringToCloudFormation)(properties.users),
    };
}

// @ts-ignore TS6133
function CfnPolicyPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPolicyProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPolicyProps>();
    ret.addPropertyResult('policyDocument', 'PolicyDocument', cfn_parse.FromCloudFormation.getAny(properties.PolicyDocument));
    ret.addPropertyResult('policyName', 'PolicyName', cfn_parse.FromCloudFormation.getString(properties.PolicyName));
    ret.addPropertyResult('groups', 'Groups', properties.Groups != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Groups) : undefined);
    ret.addPropertyResult('roles', 'Roles', properties.Roles != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Roles) : undefined);
    ret.addPropertyResult('users', 'Users', properties.Users != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Users) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IAM::Policy`
 *
 * Adds or updates an inline policy document that is embedded in the specified IAM user, group, or role.
 *
 * An IAM user can also have a managed policy attached to it. For information about policies, see [Managed Policies and Inline Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/policies-managed-vs-inline.html) in the *IAM User Guide* .
 *
 * The Groups, Roles, and Users properties are optional. However, you must specify at least one of these properties.
 *
 * For information about limits on the number of inline policies that you can embed in an identity, see [Limitations on IAM Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *IAM User Guide* .
 *
 * @cloudformationResource AWS::IAM::Policy
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html
 */
export class CfnPolicy extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IAM::Policy";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnPolicy {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnPolicyPropsFromCloudFormation(resourceProperties);
        const ret = new CfnPolicy(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The policy document.
     *
     * You must provide policies in JSON format in IAM. However, for AWS CloudFormation templates formatted in YAML, you can provide the policy in JSON or YAML format. AWS CloudFormation always converts a YAML policy to JSON format before submitting it to IAM.
     *
     * The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following:
     *
     * - Any printable ASCII character ranging from the space character ( `\ u0020` ) through the end of the ASCII character range
     * - The printable characters in the Basic Latin and Latin-1 Supplement character set (through `\ u00FF` )
     * - The special characters tab ( `\ u0009` ), line feed ( `\ u000A` ), and carriage return ( `\ u000D` )
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html#cfn-iam-policy-policydocument
     */
    public policyDocument: any | cdk.IResolvable;

    /**
     * The name of the policy document.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html#cfn-iam-policy-policyname
     */
    public policyName: string;

    /**
     * The name of the group to associate the policy with.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html#cfn-iam-policy-groups
     */
    public groups: string[] | undefined;

    /**
     * The name of the role to associate the policy with.
     *
     * This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * > If an external policy (such as `AWS::IAM::Policy` or `AWS::IAM::ManagedPolicy` ) has a `Ref` to a role and if a resource (such as `AWS::ECS::Service` ) also has a `Ref` to the same role, add a `DependsOn` attribute to the resource to make the resource depend on the external policy. This dependency ensures that the role's policy is available throughout the resource's lifecycle. For example, when you delete a stack with an `AWS::ECS::Service` resource, the `DependsOn` attribute ensures that AWS CloudFormation deletes the `AWS::ECS::Service` resource before deleting its role's policy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html#cfn-iam-policy-roles
     */
    public roles: string[] | undefined;

    /**
     * The name of the user to associate the policy with.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html#cfn-iam-policy-users
     */
    public users: string[] | undefined;

    /**
     * Create a new `AWS::IAM::Policy`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPolicyProps) {
        super(scope, id, { type: CfnPolicy.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'policyDocument', this);
        cdk.requireProperty(props, 'policyName', this);

        this.policyDocument = props.policyDocument;
        this.policyName = props.policyName;
        this.groups = props.groups;
        this.roles = props.roles;
        this.users = props.users;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnPolicy.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            policyDocument: this.policyDocument,
            policyName: this.policyName,
            groups: this.groups,
            roles: this.roles,
            users: this.users,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPolicyPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnRole`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html
 */
export interface CfnRoleProps {

    /**
     * The trust policy that is associated with this role. Trust policies define which entities can assume the role. You can associate only one trust policy with a role. For an example of a policy that can be used to assume a role, see [Template Examples](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#aws-resource-iam-role--examples) . For more information about the elements that you can use in an IAM policy, see [IAM Policy Elements Reference](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-assumerolepolicydocument
     */
    readonly assumeRolePolicyDocument: any | cdk.IResolvable;

    /**
     * A description of the role that you provide.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-description
     */
    readonly description?: string;

    /**
     * A list of Amazon Resource Names (ARNs) of the IAM managed policies that you want to attach to the role.
     *
     * For more information about ARNs, see [Amazon Resource Names (ARNs) and AWS Service Namespaces](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *AWS General Reference* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-managepolicyarns
     */
    readonly managedPolicyArns?: string[];

    /**
     * The maximum session duration (in seconds) that you want to set for the specified role. If you do not specify a value for this setting, the default maximum of one hour is applied. This setting can have a value from 1 hour to 12 hours.
     *
     * Anyone who assumes the role from the or API can use the `DurationSeconds` API parameter or the `duration-seconds` CLI parameter to request a longer session. The `MaxSessionDuration` setting determines the maximum duration that can be requested using the `DurationSeconds` parameter. If users don't specify a value for the `DurationSeconds` parameter, their security credentials are valid for one hour by default. This applies when you use the `AssumeRole*` API operations or the `assume-role*` CLI operations but does not apply when you use those operations to create a console URL. For more information, see [Using IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-maxsessionduration
     */
    readonly maxSessionDuration?: number;

    /**
     * The path to the role. For more information about paths, see [IAM Identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide* .
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/).
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! ( `\ u0021` ) through the DEL character ( `\ u007F` ), including most punctuation characters, digits, and upper and lowercased letters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-path
     */
    readonly path?: string;

    /**
     * The ARN of the policy used to set the permissions boundary for the role.
     *
     * For more information about permissions boundaries, see [Permissions boundaries for IAM identities](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-permissionsboundary
     */
    readonly permissionsBoundary?: string;

    /**
     * Adds or updates an inline policy document that is embedded in the specified IAM role.
     *
     * When you embed an inline policy in a role, the inline policy is used as part of the role's access (permissions) policy. The role's trust policy is created at the same time as the role. You can update a role's trust policy later. For more information about IAM roles, go to [Using Roles to Delegate Permissions and Federate Identities](https://docs.aws.amazon.com/IAM/latest/UserGuide/roles-toplevel.html) .
     *
     * A role can also have an attached managed policy. For information about policies, see [Managed Policies and Inline Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/policies-managed-vs-inline.html) in the *IAM User Guide* .
     *
     * For information about limits on the number of inline policies that you can embed with a role, see [Limitations on IAM Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *IAM User Guide* .
     *
     * > If an external policy (such as `AWS::IAM::Policy` or `AWS::IAM::ManagedPolicy` ) has a `Ref` to a role and if a resource (such as `AWS::ECS::Service` ) also has a `Ref` to the same role, add a `DependsOn` attribute to the resource to make the resource depend on the external policy. This dependency ensures that the role's policy is available throughout the resource's lifecycle. For example, when you delete a stack with an `AWS::ECS::Service` resource, the `DependsOn` attribute ensures that AWS CloudFormation deletes the `AWS::ECS::Service` resource before deleting its role's policy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-policies
     */
    readonly policies?: Array<CfnRole.PolicyProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A name for the IAM role, up to 64 characters in length. For valid values, see the `RoleName` parameter for the [`CreateRole`](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateRole.html) action in the *IAM User Guide* .
     *
     * This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-. The role name must be unique within the account. Role names are not distinguished by case. For example, you cannot create roles named both "Role1" and "role1".
     *
     * If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the role name.
     *
     * If you specify a name, you must specify the `CAPABILITY_NAMED_IAM` value to acknowledge your template's capabilities. For more information, see [Acknowledging IAM Resources in AWS CloudFormation Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities) .
     *
     * > Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using `Fn::Join` and `AWS::Region` to create a Region-specific name, as in the following example: `{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-rolename
     */
    readonly roleName?: string;

    /**
     * A list of tags that are attached to the role. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnRoleProps`
 *
 * @param properties - the TypeScript properties of a `CfnRoleProps`
 *
 * @returns the result of the validation.
 */
function CfnRolePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('assumeRolePolicyDocument', cdk.requiredValidator)(properties.assumeRolePolicyDocument));
    errors.collect(cdk.propertyValidator('assumeRolePolicyDocument', cdk.validateObject)(properties.assumeRolePolicyDocument));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('managedPolicyArns', cdk.listValidator(cdk.validateString))(properties.managedPolicyArns));
    errors.collect(cdk.propertyValidator('maxSessionDuration', cdk.validateNumber)(properties.maxSessionDuration));
    errors.collect(cdk.propertyValidator('path', cdk.validateString)(properties.path));
    errors.collect(cdk.propertyValidator('permissionsBoundary', cdk.validateString)(properties.permissionsBoundary));
    errors.collect(cdk.propertyValidator('policies', cdk.listValidator(CfnRole_PolicyPropertyValidator))(properties.policies));
    errors.collect(cdk.propertyValidator('roleName', cdk.validateString)(properties.roleName));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnRoleProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::Role` resource
 *
 * @param properties - the TypeScript properties of a `CfnRoleProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::Role` resource.
 */
// @ts-ignore TS6133
function cfnRolePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRolePropsValidator(properties).assertSuccess();
    return {
        AssumeRolePolicyDocument: cdk.objectToCloudFormation(properties.assumeRolePolicyDocument),
        Description: cdk.stringToCloudFormation(properties.description),
        ManagedPolicyArns: cdk.listMapper(cdk.stringToCloudFormation)(properties.managedPolicyArns),
        MaxSessionDuration: cdk.numberToCloudFormation(properties.maxSessionDuration),
        Path: cdk.stringToCloudFormation(properties.path),
        PermissionsBoundary: cdk.stringToCloudFormation(properties.permissionsBoundary),
        Policies: cdk.listMapper(cfnRolePolicyPropertyToCloudFormation)(properties.policies),
        RoleName: cdk.stringToCloudFormation(properties.roleName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnRolePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRoleProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRoleProps>();
    ret.addPropertyResult('assumeRolePolicyDocument', 'AssumeRolePolicyDocument', cfn_parse.FromCloudFormation.getAny(properties.AssumeRolePolicyDocument));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('managedPolicyArns', 'ManagedPolicyArns', properties.ManagedPolicyArns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ManagedPolicyArns) : undefined);
    ret.addPropertyResult('maxSessionDuration', 'MaxSessionDuration', properties.MaxSessionDuration != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxSessionDuration) : undefined);
    ret.addPropertyResult('path', 'Path', properties.Path != null ? cfn_parse.FromCloudFormation.getString(properties.Path) : undefined);
    ret.addPropertyResult('permissionsBoundary', 'PermissionsBoundary', properties.PermissionsBoundary != null ? cfn_parse.FromCloudFormation.getString(properties.PermissionsBoundary) : undefined);
    ret.addPropertyResult('policies', 'Policies', properties.Policies != null ? cfn_parse.FromCloudFormation.getArray(CfnRolePolicyPropertyFromCloudFormation)(properties.Policies) : undefined);
    ret.addPropertyResult('roleName', 'RoleName', properties.RoleName != null ? cfn_parse.FromCloudFormation.getString(properties.RoleName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IAM::Role`
 *
 * Creates a new role for your AWS account . For more information about roles, see [IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/WorkingWithRoles.html) . For information about quotas for role names and the number of roles you can create, see [IAM and AWS STS quotas](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html) in the *IAM User Guide* .
 *
 * @cloudformationResource AWS::IAM::Role
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html
 */
export class CfnRole extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IAM::Role";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnRole {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnRolePropsFromCloudFormation(resourceProperties);
        const ret = new CfnRole(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Returns the Amazon Resource Name (ARN) for the role. For example:
     *
     * `{"Fn::GetAtt" : ["MyRole", "Arn"] }`
     *
     * This will return a value such as `arn:aws:iam::1234567890:role/MyRole-AJJHDSKSDF` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * Returns the stable and unique string identifying the role. For example, `AIDAJQABLZS4A3QDU576Q` .
     *
     * For more information about IDs, see [IAM Identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html) in the *IAM User Guide* .
     * @cloudformationAttribute RoleId
     */
    public readonly attrRoleId: string;

    /**
     * The trust policy that is associated with this role. Trust policies define which entities can assume the role. You can associate only one trust policy with a role. For an example of a policy that can be used to assume a role, see [Template Examples](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#aws-resource-iam-role--examples) . For more information about the elements that you can use in an IAM policy, see [IAM Policy Elements Reference](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-assumerolepolicydocument
     */
    public assumeRolePolicyDocument: any | cdk.IResolvable;

    /**
     * A description of the role that you provide.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-description
     */
    public description: string | undefined;

    /**
     * A list of Amazon Resource Names (ARNs) of the IAM managed policies that you want to attach to the role.
     *
     * For more information about ARNs, see [Amazon Resource Names (ARNs) and AWS Service Namespaces](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *AWS General Reference* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-managepolicyarns
     */
    public managedPolicyArns: string[] | undefined;

    /**
     * The maximum session duration (in seconds) that you want to set for the specified role. If you do not specify a value for this setting, the default maximum of one hour is applied. This setting can have a value from 1 hour to 12 hours.
     *
     * Anyone who assumes the role from the or API can use the `DurationSeconds` API parameter or the `duration-seconds` CLI parameter to request a longer session. The `MaxSessionDuration` setting determines the maximum duration that can be requested using the `DurationSeconds` parameter. If users don't specify a value for the `DurationSeconds` parameter, their security credentials are valid for one hour by default. This applies when you use the `AssumeRole*` API operations or the `assume-role*` CLI operations but does not apply when you use those operations to create a console URL. For more information, see [Using IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-maxsessionduration
     */
    public maxSessionDuration: number | undefined;

    /**
     * The path to the role. For more information about paths, see [IAM Identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide* .
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/).
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! ( `\ u0021` ) through the DEL character ( `\ u007F` ), including most punctuation characters, digits, and upper and lowercased letters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-path
     */
    public path: string | undefined;

    /**
     * The ARN of the policy used to set the permissions boundary for the role.
     *
     * For more information about permissions boundaries, see [Permissions boundaries for IAM identities](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-permissionsboundary
     */
    public permissionsBoundary: string | undefined;

    /**
     * Adds or updates an inline policy document that is embedded in the specified IAM role.
     *
     * When you embed an inline policy in a role, the inline policy is used as part of the role's access (permissions) policy. The role's trust policy is created at the same time as the role. You can update a role's trust policy later. For more information about IAM roles, go to [Using Roles to Delegate Permissions and Federate Identities](https://docs.aws.amazon.com/IAM/latest/UserGuide/roles-toplevel.html) .
     *
     * A role can also have an attached managed policy. For information about policies, see [Managed Policies and Inline Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/policies-managed-vs-inline.html) in the *IAM User Guide* .
     *
     * For information about limits on the number of inline policies that you can embed with a role, see [Limitations on IAM Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *IAM User Guide* .
     *
     * > If an external policy (such as `AWS::IAM::Policy` or `AWS::IAM::ManagedPolicy` ) has a `Ref` to a role and if a resource (such as `AWS::ECS::Service` ) also has a `Ref` to the same role, add a `DependsOn` attribute to the resource to make the resource depend on the external policy. This dependency ensures that the role's policy is available throughout the resource's lifecycle. For example, when you delete a stack with an `AWS::ECS::Service` resource, the `DependsOn` attribute ensures that AWS CloudFormation deletes the `AWS::ECS::Service` resource before deleting its role's policy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-policies
     */
    public policies: Array<CfnRole.PolicyProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * A name for the IAM role, up to 64 characters in length. For valid values, see the `RoleName` parameter for the [`CreateRole`](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateRole.html) action in the *IAM User Guide* .
     *
     * This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-. The role name must be unique within the account. Role names are not distinguished by case. For example, you cannot create roles named both "Role1" and "role1".
     *
     * If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the role name.
     *
     * If you specify a name, you must specify the `CAPABILITY_NAMED_IAM` value to acknowledge your template's capabilities. For more information, see [Acknowledging IAM Resources in AWS CloudFormation Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities) .
     *
     * > Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using `Fn::Join` and `AWS::Region` to create a Region-specific name, as in the following example: `{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-rolename
     */
    public roleName: string | undefined;

    /**
     * A list of tags that are attached to the role. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#cfn-iam-role-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::IAM::Role`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnRoleProps) {
        super(scope, id, { type: CfnRole.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'assumeRolePolicyDocument', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrRoleId = cdk.Token.asString(this.getAtt('RoleId'));

        this.assumeRolePolicyDocument = props.assumeRolePolicyDocument;
        this.description = props.description;
        this.managedPolicyArns = props.managedPolicyArns;
        this.maxSessionDuration = props.maxSessionDuration;
        this.path = props.path;
        this.permissionsBoundary = props.permissionsBoundary;
        this.policies = props.policies;
        this.roleName = props.roleName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IAM::Role", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnRole.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            assumeRolePolicyDocument: this.assumeRolePolicyDocument,
            description: this.description,
            managedPolicyArns: this.managedPolicyArns,
            maxSessionDuration: this.maxSessionDuration,
            path: this.path,
            permissionsBoundary: this.permissionsBoundary,
            policies: this.policies,
            roleName: this.roleName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnRolePropsToCloudFormation(props);
    }
}

export namespace CfnRole {
    /**
     * Contains information about an attached policy.
     *
     * An attached policy is a managed policy that has been attached to a user, group, or role.
     *
     * For more information about managed policies, refer to [Managed Policies and Inline Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/policies-managed-vs-inline.html) in the *IAM User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-policy.html
     */
    export interface PolicyProperty {
        /**
         * The policy document.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-policy.html#cfn-iam-policies-policydocument
         */
        readonly policyDocument: any | cdk.IResolvable;
        /**
         * The friendly name (not ARN) identifying the policy.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-policy.html#cfn-iam-policies-policyname
         */
        readonly policyName: string;
    }
}

/**
 * Determine whether the given properties match those of a `PolicyProperty`
 *
 * @param properties - the TypeScript properties of a `PolicyProperty`
 *
 * @returns the result of the validation.
 */
function CfnRole_PolicyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('policyDocument', cdk.requiredValidator)(properties.policyDocument));
    errors.collect(cdk.propertyValidator('policyDocument', cdk.validateObject)(properties.policyDocument));
    errors.collect(cdk.propertyValidator('policyName', cdk.requiredValidator)(properties.policyName));
    errors.collect(cdk.propertyValidator('policyName', cdk.validateString)(properties.policyName));
    return errors.wrap('supplied properties not correct for "PolicyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::Role.Policy` resource
 *
 * @param properties - the TypeScript properties of a `PolicyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::Role.Policy` resource.
 */
// @ts-ignore TS6133
function cfnRolePolicyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRole_PolicyPropertyValidator(properties).assertSuccess();
    return {
        PolicyDocument: cdk.objectToCloudFormation(properties.policyDocument),
        PolicyName: cdk.stringToCloudFormation(properties.policyName),
    };
}

// @ts-ignore TS6133
function CfnRolePolicyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRole.PolicyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRole.PolicyProperty>();
    ret.addPropertyResult('policyDocument', 'PolicyDocument', cfn_parse.FromCloudFormation.getAny(properties.PolicyDocument));
    ret.addPropertyResult('policyName', 'PolicyName', cfn_parse.FromCloudFormation.getString(properties.PolicyName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnSAMLProvider`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-samlprovider.html
 */
export interface CfnSAMLProviderProps {

    /**
     * An XML document generated by an identity provider (IdP) that supports SAML 2.0. The document includes the issuer's name, expiration information, and keys that can be used to validate the SAML authentication response (assertions) that are received from the IdP. You must generate the metadata document using the identity management software that is used as your organization's IdP.
     *
     * For more information, see [About SAML 2.0-based federation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html) in the *IAM User Guide*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-samlprovider.html#cfn-iam-samlprovider-samlmetadatadocument
     */
    readonly samlMetadataDocument: string;

    /**
     * The name of the provider to create.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-samlprovider.html#cfn-iam-samlprovider-name
     */
    readonly name?: string;

    /**
     * A list of tags that you want to attach to the new IAM SAML provider. Each tag consists of a key name and an associated value. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide* .
     *
     * > If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request fails and the resource is not created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-samlprovider.html#cfn-iam-samlprovider-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnSAMLProviderProps`
 *
 * @param properties - the TypeScript properties of a `CfnSAMLProviderProps`
 *
 * @returns the result of the validation.
 */
function CfnSAMLProviderPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('samlMetadataDocument', cdk.requiredValidator)(properties.samlMetadataDocument));
    errors.collect(cdk.propertyValidator('samlMetadataDocument', cdk.validateString)(properties.samlMetadataDocument));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnSAMLProviderProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::SAMLProvider` resource
 *
 * @param properties - the TypeScript properties of a `CfnSAMLProviderProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::SAMLProvider` resource.
 */
// @ts-ignore TS6133
function cfnSAMLProviderPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSAMLProviderPropsValidator(properties).assertSuccess();
    return {
        SamlMetadataDocument: cdk.stringToCloudFormation(properties.samlMetadataDocument),
        Name: cdk.stringToCloudFormation(properties.name),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnSAMLProviderPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSAMLProviderProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSAMLProviderProps>();
    ret.addPropertyResult('samlMetadataDocument', 'SamlMetadataDocument', cfn_parse.FromCloudFormation.getString(properties.SamlMetadataDocument));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IAM::SAMLProvider`
 *
 * Creates an IAM resource that describes an identity provider (IdP) that supports SAML 2.0.
 *
 * The SAML provider resource that you create with this operation can be used as a principal in an IAM role's trust policy. Such a policy can enable federated users who sign in using the SAML IdP to assume the role. You can create an IAM role that supports Web-based single sign-on (SSO) to the AWS Management Console or one that supports API access to AWS .
 *
 * When you create the SAML provider resource, you upload a SAML metadata document that you get from your IdP. That document includes the issuer's name, expiration information, and keys that can be used to validate the SAML authentication response (assertions) that the IdP sends. You must generate the metadata document using the identity management software that is used as your organization's IdP.
 *
 * > This operation requires [Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) .
 *
 * For more information, see [Enabling SAML 2.0 federated users to access the AWS Management Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_enable-console-saml.html) and [About SAML 2.0-based federation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html) in the *IAM User Guide* .
 *
 * @cloudformationResource AWS::IAM::SAMLProvider
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-samlprovider.html
 */
export class CfnSAMLProvider extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IAM::SAMLProvider";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnSAMLProvider {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnSAMLProviderPropsFromCloudFormation(resourceProperties);
        const ret = new CfnSAMLProvider(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Returns the Amazon Resource Name (ARN) for the specified `AWS::IAM::SAMLProvider` resource.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * An XML document generated by an identity provider (IdP) that supports SAML 2.0. The document includes the issuer's name, expiration information, and keys that can be used to validate the SAML authentication response (assertions) that are received from the IdP. You must generate the metadata document using the identity management software that is used as your organization's IdP.
     *
     * For more information, see [About SAML 2.0-based federation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html) in the *IAM User Guide*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-samlprovider.html#cfn-iam-samlprovider-samlmetadatadocument
     */
    public samlMetadataDocument: string;

    /**
     * The name of the provider to create.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-samlprovider.html#cfn-iam-samlprovider-name
     */
    public name: string | undefined;

    /**
     * A list of tags that you want to attach to the new IAM SAML provider. Each tag consists of a key name and an associated value. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide* .
     *
     * > If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request fails and the resource is not created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-samlprovider.html#cfn-iam-samlprovider-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::IAM::SAMLProvider`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnSAMLProviderProps) {
        super(scope, id, { type: CfnSAMLProvider.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'samlMetadataDocument', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.samlMetadataDocument = props.samlMetadataDocument;
        this.name = props.name;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IAM::SAMLProvider", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnSAMLProvider.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            samlMetadataDocument: this.samlMetadataDocument,
            name: this.name,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnSAMLProviderPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnServerCertificate`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servercertificate.html
 */
export interface CfnServerCertificateProps {

    /**
     * The contents of the public key certificate.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servercertificate.html#cfn-iam-servercertificate-certificatebody
     */
    readonly certificateBody?: string;

    /**
     * The contents of the public key certificate chain.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servercertificate.html#cfn-iam-servercertificate-certificatechain
     */
    readonly certificateChain?: string;

    /**
     * The path for the server certificate. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide* .
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/). This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! ( `\ u0021` ) through the DEL character ( `\ u007F` ), including most punctuation characters, digits, and upper and lowercased letters.
     *
     * > If you are uploading a server certificate specifically for use with Amazon CloudFront distributions, you must specify a path using the `path` parameter. The path must begin with `/cloudfront` and must include a trailing slash (for example, `/cloudfront/test/` ).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servercertificate.html#cfn-iam-servercertificate-path
     */
    readonly path?: string;

    /**
     * The contents of the private key in PEM-encoded format.
     *
     * The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following:
     *
     * - Any printable ASCII character ranging from the space character ( `\ u0020` ) through the end of the ASCII character range
     * - The printable characters in the Basic Latin and Latin-1 Supplement character set (through `\ u00FF` )
     * - The special characters tab ( `\ u0009` ), line feed ( `\ u000A` ), and carriage return ( `\ u000D` )
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servercertificate.html#cfn-iam-servercertificate-privatekey
     */
    readonly privateKey?: string;

    /**
     * The name for the server certificate. Do not include the path in this value. The name of the certificate cannot contain any spaces.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servercertificate.html#cfn-iam-servercertificate-servercertificatename
     */
    readonly serverCertificateName?: string;

    /**
     * A list of tags that are attached to the server certificate. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servercertificate.html#cfn-iam-servercertificate-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnServerCertificateProps`
 *
 * @param properties - the TypeScript properties of a `CfnServerCertificateProps`
 *
 * @returns the result of the validation.
 */
function CfnServerCertificatePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('certificateBody', cdk.validateString)(properties.certificateBody));
    errors.collect(cdk.propertyValidator('certificateChain', cdk.validateString)(properties.certificateChain));
    errors.collect(cdk.propertyValidator('path', cdk.validateString)(properties.path));
    errors.collect(cdk.propertyValidator('privateKey', cdk.validateString)(properties.privateKey));
    errors.collect(cdk.propertyValidator('serverCertificateName', cdk.validateString)(properties.serverCertificateName));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnServerCertificateProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::ServerCertificate` resource
 *
 * @param properties - the TypeScript properties of a `CfnServerCertificateProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::ServerCertificate` resource.
 */
// @ts-ignore TS6133
function cfnServerCertificatePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnServerCertificatePropsValidator(properties).assertSuccess();
    return {
        CertificateBody: cdk.stringToCloudFormation(properties.certificateBody),
        CertificateChain: cdk.stringToCloudFormation(properties.certificateChain),
        Path: cdk.stringToCloudFormation(properties.path),
        PrivateKey: cdk.stringToCloudFormation(properties.privateKey),
        ServerCertificateName: cdk.stringToCloudFormation(properties.serverCertificateName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnServerCertificatePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnServerCertificateProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnServerCertificateProps>();
    ret.addPropertyResult('certificateBody', 'CertificateBody', properties.CertificateBody != null ? cfn_parse.FromCloudFormation.getString(properties.CertificateBody) : undefined);
    ret.addPropertyResult('certificateChain', 'CertificateChain', properties.CertificateChain != null ? cfn_parse.FromCloudFormation.getString(properties.CertificateChain) : undefined);
    ret.addPropertyResult('path', 'Path', properties.Path != null ? cfn_parse.FromCloudFormation.getString(properties.Path) : undefined);
    ret.addPropertyResult('privateKey', 'PrivateKey', properties.PrivateKey != null ? cfn_parse.FromCloudFormation.getString(properties.PrivateKey) : undefined);
    ret.addPropertyResult('serverCertificateName', 'ServerCertificateName', properties.ServerCertificateName != null ? cfn_parse.FromCloudFormation.getString(properties.ServerCertificateName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IAM::ServerCertificate`
 *
 * Uploads a server certificate entity for the AWS account . The server certificate entity includes a public key certificate, a private key, and an optional certificate chain, which should all be PEM-encoded.
 *
 * We recommend that you use [AWS Certificate Manager](https://docs.aws.amazon.com/acm/) to provision, manage, and deploy your server certificates. With ACM you can request a certificate, deploy it to AWS resources, and let ACM handle certificate renewals for you. Certificates provided by ACM are free. For more information about using ACM, see the [AWS Certificate Manager User Guide](https://docs.aws.amazon.com/acm/latest/userguide/) .
 *
 * For more information about working with server certificates, see [Working with server certificates](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html) in the *IAM User Guide* . This topic includes a list of AWS services that can use the server certificates that you manage with IAM.
 *
 * For information about the number of server certificates you can upload, see [IAM and AWS STS quotas](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html) in the *IAM User Guide* .
 *
 * > Because the body of the public key certificate, private key, and the certificate chain can be large, you should use POST rather than GET when calling `UploadServerCertificate` . For information about setting up signatures and authorization through the API, see [Signing AWS API requests](https://docs.aws.amazon.com/general/latest/gr/signing_aws_api_requests.html) in the *AWS General Reference* . For general information about using the Query API with IAM, see [Calling the API by making HTTP query requests](https://docs.aws.amazon.com/IAM/latest/UserGuide/programming.html) in the *IAM User Guide* .
 *
 * @cloudformationResource AWS::IAM::ServerCertificate
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servercertificate.html
 */
export class CfnServerCertificate extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IAM::ServerCertificate";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnServerCertificate {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnServerCertificatePropsFromCloudFormation(resourceProperties);
        const ret = new CfnServerCertificate(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Returns the Amazon Resource Name (ARN) for the specified `AWS::IAM::ServerCertificate` resource.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The contents of the public key certificate.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servercertificate.html#cfn-iam-servercertificate-certificatebody
     */
    public certificateBody: string | undefined;

    /**
     * The contents of the public key certificate chain.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servercertificate.html#cfn-iam-servercertificate-certificatechain
     */
    public certificateChain: string | undefined;

    /**
     * The path for the server certificate. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide* .
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/). This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! ( `\ u0021` ) through the DEL character ( `\ u007F` ), including most punctuation characters, digits, and upper and lowercased letters.
     *
     * > If you are uploading a server certificate specifically for use with Amazon CloudFront distributions, you must specify a path using the `path` parameter. The path must begin with `/cloudfront` and must include a trailing slash (for example, `/cloudfront/test/` ).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servercertificate.html#cfn-iam-servercertificate-path
     */
    public path: string | undefined;

    /**
     * The contents of the private key in PEM-encoded format.
     *
     * The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following:
     *
     * - Any printable ASCII character ranging from the space character ( `\ u0020` ) through the end of the ASCII character range
     * - The printable characters in the Basic Latin and Latin-1 Supplement character set (through `\ u00FF` )
     * - The special characters tab ( `\ u0009` ), line feed ( `\ u000A` ), and carriage return ( `\ u000D` )
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servercertificate.html#cfn-iam-servercertificate-privatekey
     */
    public privateKey: string | undefined;

    /**
     * The name for the server certificate. Do not include the path in this value. The name of the certificate cannot contain any spaces.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servercertificate.html#cfn-iam-servercertificate-servercertificatename
     */
    public serverCertificateName: string | undefined;

    /**
     * A list of tags that are attached to the server certificate. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servercertificate.html#cfn-iam-servercertificate-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::IAM::ServerCertificate`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnServerCertificateProps = {}) {
        super(scope, id, { type: CfnServerCertificate.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.certificateBody = props.certificateBody;
        this.certificateChain = props.certificateChain;
        this.path = props.path;
        this.privateKey = props.privateKey;
        this.serverCertificateName = props.serverCertificateName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IAM::ServerCertificate", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnServerCertificate.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            certificateBody: this.certificateBody,
            certificateChain: this.certificateChain,
            path: this.path,
            privateKey: this.privateKey,
            serverCertificateName: this.serverCertificateName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnServerCertificatePropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnServiceLinkedRole`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servicelinkedrole.html
 */
export interface CfnServiceLinkedRoleProps {

    /**
     * The service principal for the AWS service to which this role is attached. You use a string similar to a URL but without the http:// in front. For example: `elasticbeanstalk.amazonaws.com` .
     *
     * Service principals are unique and case-sensitive. To find the exact service principal for your service-linked role, see [AWS services that work with IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html) in the *IAM User Guide* . Look for the services that have *Yes* in the *Service-Linked Role* column. Choose the *Yes* link to view the service-linked role documentation for that service.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servicelinkedrole.html#cfn-iam-servicelinkedrole-awsservicename
     */
    readonly awsServiceName: string;

    /**
     * A string that you provide, which is combined with the service-provided prefix to form the complete role name. If you make multiple requests for the same service, then you must supply a different `CustomSuffix` for each request. Otherwise the request fails with a duplicate role name error. For example, you could add `-1` or `-debug` to the suffix.
     *
     * Some services do not support the `CustomSuffix` parameter. If you provide an optional suffix and the operation fails, try the operation again without the suffix.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servicelinkedrole.html#cfn-iam-servicelinkedrole-customsuffix
     */
    readonly customSuffix?: string;

    /**
     * The description of the role.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servicelinkedrole.html#cfn-iam-servicelinkedrole-description
     */
    readonly description?: string;
}

/**
 * Determine whether the given properties match those of a `CfnServiceLinkedRoleProps`
 *
 * @param properties - the TypeScript properties of a `CfnServiceLinkedRoleProps`
 *
 * @returns the result of the validation.
 */
function CfnServiceLinkedRolePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('awsServiceName', cdk.requiredValidator)(properties.awsServiceName));
    errors.collect(cdk.propertyValidator('awsServiceName', cdk.validateString)(properties.awsServiceName));
    errors.collect(cdk.propertyValidator('customSuffix', cdk.validateString)(properties.customSuffix));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    return errors.wrap('supplied properties not correct for "CfnServiceLinkedRoleProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::ServiceLinkedRole` resource
 *
 * @param properties - the TypeScript properties of a `CfnServiceLinkedRoleProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::ServiceLinkedRole` resource.
 */
// @ts-ignore TS6133
function cfnServiceLinkedRolePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnServiceLinkedRolePropsValidator(properties).assertSuccess();
    return {
        AWSServiceName: cdk.stringToCloudFormation(properties.awsServiceName),
        CustomSuffix: cdk.stringToCloudFormation(properties.customSuffix),
        Description: cdk.stringToCloudFormation(properties.description),
    };
}

// @ts-ignore TS6133
function CfnServiceLinkedRolePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnServiceLinkedRoleProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnServiceLinkedRoleProps>();
    ret.addPropertyResult('awsServiceName', 'AWSServiceName', cfn_parse.FromCloudFormation.getString(properties.AWSServiceName));
    ret.addPropertyResult('customSuffix', 'CustomSuffix', properties.CustomSuffix != null ? cfn_parse.FromCloudFormation.getString(properties.CustomSuffix) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IAM::ServiceLinkedRole`
 *
 * Creates an IAM role that is linked to a specific AWS service. The service controls the attached policies and when the role can be deleted. This helps ensure that the service is not broken by an unexpectedly changed or deleted role, which could put your AWS resources into an unknown state. Allowing the service to control the role helps improve service stability and proper cleanup when a service and its role are no longer needed. For more information, see [Using service-linked roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html) in the *IAM User Guide* .
 *
 * To attach a policy to this service-linked role, you must make the request using the AWS service that depends on this role.
 *
 * @cloudformationResource AWS::IAM::ServiceLinkedRole
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servicelinkedrole.html
 */
export class CfnServiceLinkedRole extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IAM::ServiceLinkedRole";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnServiceLinkedRole {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnServiceLinkedRolePropsFromCloudFormation(resourceProperties);
        const ret = new CfnServiceLinkedRole(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The service principal for the AWS service to which this role is attached. You use a string similar to a URL but without the http:// in front. For example: `elasticbeanstalk.amazonaws.com` .
     *
     * Service principals are unique and case-sensitive. To find the exact service principal for your service-linked role, see [AWS services that work with IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html) in the *IAM User Guide* . Look for the services that have *Yes* in the *Service-Linked Role* column. Choose the *Yes* link to view the service-linked role documentation for that service.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servicelinkedrole.html#cfn-iam-servicelinkedrole-awsservicename
     */
    public awsServiceName: string;

    /**
     * A string that you provide, which is combined with the service-provided prefix to form the complete role name. If you make multiple requests for the same service, then you must supply a different `CustomSuffix` for each request. Otherwise the request fails with a duplicate role name error. For example, you could add `-1` or `-debug` to the suffix.
     *
     * Some services do not support the `CustomSuffix` parameter. If you provide an optional suffix and the operation fails, try the operation again without the suffix.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servicelinkedrole.html#cfn-iam-servicelinkedrole-customsuffix
     */
    public customSuffix: string | undefined;

    /**
     * The description of the role.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servicelinkedrole.html#cfn-iam-servicelinkedrole-description
     */
    public description: string | undefined;

    /**
     * Create a new `AWS::IAM::ServiceLinkedRole`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnServiceLinkedRoleProps) {
        super(scope, id, { type: CfnServiceLinkedRole.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'awsServiceName', this);

        this.awsServiceName = props.awsServiceName;
        this.customSuffix = props.customSuffix;
        this.description = props.description;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnServiceLinkedRole.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            awsServiceName: this.awsServiceName,
            customSuffix: this.customSuffix,
            description: this.description,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnServiceLinkedRolePropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnUser`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html
 */
export interface CfnUserProps {

    /**
     * A list of group names to which you want to add the user.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-groups
     */
    readonly groups?: string[];

    /**
     * Creates a password for the specified IAM user. A password allows an IAM user to access AWS services through the AWS Management Console .
     *
     * You can use the AWS CLI , the AWS API, or the *Users* page in the IAM console to create a password for any IAM user. Use [ChangePassword](https://docs.aws.amazon.com/IAM/latest/APIReference/API_ChangePassword.html) to update your own existing password in the *My Security Credentials* page in the AWS Management Console .
     *
     * For more information about managing passwords, see [Managing passwords](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_ManagingLogins.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-loginprofile
     */
    readonly loginProfile?: CfnUser.LoginProfileProperty | cdk.IResolvable;

    /**
     * A list of Amazon Resource Names (ARNs) of the IAM managed policies that you want to attach to the user.
     *
     * For more information about ARNs, see [Amazon Resource Names (ARNs) and AWS Service Namespaces](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *AWS General Reference* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-managepolicyarns
     */
    readonly managedPolicyArns?: string[];

    /**
     * The path for the user name. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide* .
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/).
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! ( `\ u0021` ) through the DEL character ( `\ u007F` ), including most punctuation characters, digits, and upper and lowercased letters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-path
     */
    readonly path?: string;

    /**
     * The ARN of the policy that is used to set the permissions boundary for the user.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-permissionsboundary
     */
    readonly permissionsBoundary?: string;

    /**
     * Adds or updates an inline policy document that is embedded in the specified IAM user. To view AWS::IAM::User snippets, see [Declaring an IAM User Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-iam.html#scenario-iam-user) .
     *
     * > The name of each policy for a role, user, or group must be unique. If you don't choose unique names, updates to the IAM identity will fail.
     *
     * For information about limits on the number of inline policies that you can embed in a user, see [Limitations on IAM Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-policies
     */
    readonly policies?: Array<CfnUser.PolicyProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A list of tags that you want to attach to the new user. Each tag consists of a key name and an associated value. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide* .
     *
     * > If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request fails and the resource is not created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The name of the user to create. Do not include the path in this value.
     *
     * This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-. The user name must be unique within the account. User names are not distinguished by case. For example, you cannot create users named both "John" and "john".
     *
     * If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the user name.
     *
     * If you specify a name, you must specify the `CAPABILITY_NAMED_IAM` value to acknowledge your template's capabilities. For more information, see [Acknowledging IAM Resources in AWS CloudFormation Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities) .
     *
     * > Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using `Fn::Join` and `AWS::Region` to create a Region-specific name, as in the following example: `{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-username
     */
    readonly userName?: string;
}

/**
 * Determine whether the given properties match those of a `CfnUserProps`
 *
 * @param properties - the TypeScript properties of a `CfnUserProps`
 *
 * @returns the result of the validation.
 */
function CfnUserPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('groups', cdk.listValidator(cdk.validateString))(properties.groups));
    errors.collect(cdk.propertyValidator('loginProfile', CfnUser_LoginProfilePropertyValidator)(properties.loginProfile));
    errors.collect(cdk.propertyValidator('managedPolicyArns', cdk.listValidator(cdk.validateString))(properties.managedPolicyArns));
    errors.collect(cdk.propertyValidator('path', cdk.validateString)(properties.path));
    errors.collect(cdk.propertyValidator('permissionsBoundary', cdk.validateString)(properties.permissionsBoundary));
    errors.collect(cdk.propertyValidator('policies', cdk.listValidator(CfnUser_PolicyPropertyValidator))(properties.policies));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('userName', cdk.validateString)(properties.userName));
    return errors.wrap('supplied properties not correct for "CfnUserProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::User` resource
 *
 * @param properties - the TypeScript properties of a `CfnUserProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::User` resource.
 */
// @ts-ignore TS6133
function cfnUserPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUserPropsValidator(properties).assertSuccess();
    return {
        Groups: cdk.listMapper(cdk.stringToCloudFormation)(properties.groups),
        LoginProfile: cfnUserLoginProfilePropertyToCloudFormation(properties.loginProfile),
        ManagedPolicyArns: cdk.listMapper(cdk.stringToCloudFormation)(properties.managedPolicyArns),
        Path: cdk.stringToCloudFormation(properties.path),
        PermissionsBoundary: cdk.stringToCloudFormation(properties.permissionsBoundary),
        Policies: cdk.listMapper(cfnUserPolicyPropertyToCloudFormation)(properties.policies),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        UserName: cdk.stringToCloudFormation(properties.userName),
    };
}

// @ts-ignore TS6133
function CfnUserPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUserProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUserProps>();
    ret.addPropertyResult('groups', 'Groups', properties.Groups != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Groups) : undefined);
    ret.addPropertyResult('loginProfile', 'LoginProfile', properties.LoginProfile != null ? CfnUserLoginProfilePropertyFromCloudFormation(properties.LoginProfile) : undefined);
    ret.addPropertyResult('managedPolicyArns', 'ManagedPolicyArns', properties.ManagedPolicyArns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ManagedPolicyArns) : undefined);
    ret.addPropertyResult('path', 'Path', properties.Path != null ? cfn_parse.FromCloudFormation.getString(properties.Path) : undefined);
    ret.addPropertyResult('permissionsBoundary', 'PermissionsBoundary', properties.PermissionsBoundary != null ? cfn_parse.FromCloudFormation.getString(properties.PermissionsBoundary) : undefined);
    ret.addPropertyResult('policies', 'Policies', properties.Policies != null ? cfn_parse.FromCloudFormation.getArray(CfnUserPolicyPropertyFromCloudFormation)(properties.Policies) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('userName', 'UserName', properties.UserName != null ? cfn_parse.FromCloudFormation.getString(properties.UserName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IAM::User`
 *
 * Creates a new IAM user for your AWS account .
 *
 * For information about quotas for the number of IAM users you can create, see [IAM and AWS STS quotas](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html) in the *IAM User Guide* .
 *
 * @cloudformationResource AWS::IAM::User
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html
 */
export class CfnUser extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IAM::User";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnUser {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnUserPropsFromCloudFormation(resourceProperties);
        const ret = new CfnUser(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Returns the Amazon Resource Name (ARN) for the specified `AWS::IAM::User` resource. For example: `arn:aws:iam::123456789012:user/mystack-myuser-1CCXAFG2H2U4D` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * A list of group names to which you want to add the user.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-groups
     */
    public groups: string[] | undefined;

    /**
     * Creates a password for the specified IAM user. A password allows an IAM user to access AWS services through the AWS Management Console .
     *
     * You can use the AWS CLI , the AWS API, or the *Users* page in the IAM console to create a password for any IAM user. Use [ChangePassword](https://docs.aws.amazon.com/IAM/latest/APIReference/API_ChangePassword.html) to update your own existing password in the *My Security Credentials* page in the AWS Management Console .
     *
     * For more information about managing passwords, see [Managing passwords](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_ManagingLogins.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-loginprofile
     */
    public loginProfile: CfnUser.LoginProfileProperty | cdk.IResolvable | undefined;

    /**
     * A list of Amazon Resource Names (ARNs) of the IAM managed policies that you want to attach to the user.
     *
     * For more information about ARNs, see [Amazon Resource Names (ARNs) and AWS Service Namespaces](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *AWS General Reference* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-managepolicyarns
     */
    public managedPolicyArns: string[] | undefined;

    /**
     * The path for the user name. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide* .
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/).
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! ( `\ u0021` ) through the DEL character ( `\ u007F` ), including most punctuation characters, digits, and upper and lowercased letters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-path
     */
    public path: string | undefined;

    /**
     * The ARN of the policy that is used to set the permissions boundary for the user.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-permissionsboundary
     */
    public permissionsBoundary: string | undefined;

    /**
     * Adds or updates an inline policy document that is embedded in the specified IAM user. To view AWS::IAM::User snippets, see [Declaring an IAM User Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-iam.html#scenario-iam-user) .
     *
     * > The name of each policy for a role, user, or group must be unique. If you don't choose unique names, updates to the IAM identity will fail.
     *
     * For information about limits on the number of inline policies that you can embed in a user, see [Limitations on IAM Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *IAM User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-policies
     */
    public policies: Array<CfnUser.PolicyProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * A list of tags that you want to attach to the new user. Each tag consists of a key name and an associated value. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide* .
     *
     * > If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request fails and the resource is not created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The name of the user to create. Do not include the path in this value.
     *
     * This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-. The user name must be unique within the account. User names are not distinguished by case. For example, you cannot create users named both "John" and "john".
     *
     * If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the user name.
     *
     * If you specify a name, you must specify the `CAPABILITY_NAMED_IAM` value to acknowledge your template's capabilities. For more information, see [Acknowledging IAM Resources in AWS CloudFormation Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities) .
     *
     * > Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using `Fn::Join` and `AWS::Region` to create a Region-specific name, as in the following example: `{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html#cfn-iam-user-username
     */
    public userName: string | undefined;

    /**
     * Create a new `AWS::IAM::User`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnUserProps = {}) {
        super(scope, id, { type: CfnUser.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.groups = props.groups;
        this.loginProfile = props.loginProfile;
        this.managedPolicyArns = props.managedPolicyArns;
        this.path = props.path;
        this.permissionsBoundary = props.permissionsBoundary;
        this.policies = props.policies;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IAM::User", props.tags, { tagPropertyName: 'tags' });
        this.userName = props.userName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnUser.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            groups: this.groups,
            loginProfile: this.loginProfile,
            managedPolicyArns: this.managedPolicyArns,
            path: this.path,
            permissionsBoundary: this.permissionsBoundary,
            policies: this.policies,
            tags: this.tags.renderTags(),
            userName: this.userName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnUserPropsToCloudFormation(props);
    }
}

export namespace CfnUser {
    /**
     * Creates a password for the specified user, giving the user the ability to access AWS services through the AWS Management Console . For more information about managing passwords, see [Managing Passwords](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_ManagingLogins.html) in the *IAM User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user-loginprofile.html
     */
    export interface LoginProfileProperty {
        /**
         * The user's password.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user-loginprofile.html#cfn-iam-user-loginprofile-password
         */
        readonly password: string;
        /**
         * Specifies whether the user is required to set a new password on next sign-in.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user-loginprofile.html#cfn-iam-user-loginprofile-passwordresetrequired
         */
        readonly passwordResetRequired?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `LoginProfileProperty`
 *
 * @param properties - the TypeScript properties of a `LoginProfileProperty`
 *
 * @returns the result of the validation.
 */
function CfnUser_LoginProfilePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('password', cdk.requiredValidator)(properties.password));
    errors.collect(cdk.propertyValidator('password', cdk.validateString)(properties.password));
    errors.collect(cdk.propertyValidator('passwordResetRequired', cdk.validateBoolean)(properties.passwordResetRequired));
    return errors.wrap('supplied properties not correct for "LoginProfileProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::User.LoginProfile` resource
 *
 * @param properties - the TypeScript properties of a `LoginProfileProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::User.LoginProfile` resource.
 */
// @ts-ignore TS6133
function cfnUserLoginProfilePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUser_LoginProfilePropertyValidator(properties).assertSuccess();
    return {
        Password: cdk.stringToCloudFormation(properties.password),
        PasswordResetRequired: cdk.booleanToCloudFormation(properties.passwordResetRequired),
    };
}

// @ts-ignore TS6133
function CfnUserLoginProfilePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUser.LoginProfileProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUser.LoginProfileProperty>();
    ret.addPropertyResult('password', 'Password', cfn_parse.FromCloudFormation.getString(properties.Password));
    ret.addPropertyResult('passwordResetRequired', 'PasswordResetRequired', properties.PasswordResetRequired != null ? cfn_parse.FromCloudFormation.getBoolean(properties.PasswordResetRequired) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnUser {
    /**
     * Contains information about an attached policy.
     *
     * An attached policy is a managed policy that has been attached to a user, group, or role.
     *
     * For more information about managed policies, refer to [Managed Policies and Inline Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/policies-managed-vs-inline.html) in the *IAM User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-policy.html
     */
    export interface PolicyProperty {
        /**
         * The policy document.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-policy.html#cfn-iam-policies-policydocument
         */
        readonly policyDocument: any | cdk.IResolvable;
        /**
         * The friendly name (not ARN) identifying the policy.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-policy.html#cfn-iam-policies-policyname
         */
        readonly policyName: string;
    }
}

/**
 * Determine whether the given properties match those of a `PolicyProperty`
 *
 * @param properties - the TypeScript properties of a `PolicyProperty`
 *
 * @returns the result of the validation.
 */
function CfnUser_PolicyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('policyDocument', cdk.requiredValidator)(properties.policyDocument));
    errors.collect(cdk.propertyValidator('policyDocument', cdk.validateObject)(properties.policyDocument));
    errors.collect(cdk.propertyValidator('policyName', cdk.requiredValidator)(properties.policyName));
    errors.collect(cdk.propertyValidator('policyName', cdk.validateString)(properties.policyName));
    return errors.wrap('supplied properties not correct for "PolicyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::User.Policy` resource
 *
 * @param properties - the TypeScript properties of a `PolicyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::User.Policy` resource.
 */
// @ts-ignore TS6133
function cfnUserPolicyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUser_PolicyPropertyValidator(properties).assertSuccess();
    return {
        PolicyDocument: cdk.objectToCloudFormation(properties.policyDocument),
        PolicyName: cdk.stringToCloudFormation(properties.policyName),
    };
}

// @ts-ignore TS6133
function CfnUserPolicyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUser.PolicyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUser.PolicyProperty>();
    ret.addPropertyResult('policyDocument', 'PolicyDocument', cfn_parse.FromCloudFormation.getAny(properties.PolicyDocument));
    ret.addPropertyResult('policyName', 'PolicyName', cfn_parse.FromCloudFormation.getString(properties.PolicyName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnUserToGroupAddition`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-addusertogroup.html
 */
export interface CfnUserToGroupAdditionProps {

    /**
     * The name of the group to update.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-addusertogroup.html#cfn-iam-addusertogroup-groupname
     */
    readonly groupName: string;

    /**
     * A list of the names of the users that you want to add to the group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-addusertogroup.html#cfn-iam-addusertogroup-users
     */
    readonly users: string[];
}

/**
 * Determine whether the given properties match those of a `CfnUserToGroupAdditionProps`
 *
 * @param properties - the TypeScript properties of a `CfnUserToGroupAdditionProps`
 *
 * @returns the result of the validation.
 */
function CfnUserToGroupAdditionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('groupName', cdk.requiredValidator)(properties.groupName));
    errors.collect(cdk.propertyValidator('groupName', cdk.validateString)(properties.groupName));
    errors.collect(cdk.propertyValidator('users', cdk.requiredValidator)(properties.users));
    errors.collect(cdk.propertyValidator('users', cdk.listValidator(cdk.validateString))(properties.users));
    return errors.wrap('supplied properties not correct for "CfnUserToGroupAdditionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::UserToGroupAddition` resource
 *
 * @param properties - the TypeScript properties of a `CfnUserToGroupAdditionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::UserToGroupAddition` resource.
 */
// @ts-ignore TS6133
function cfnUserToGroupAdditionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUserToGroupAdditionPropsValidator(properties).assertSuccess();
    return {
        GroupName: cdk.stringToCloudFormation(properties.groupName),
        Users: cdk.listMapper(cdk.stringToCloudFormation)(properties.users),
    };
}

// @ts-ignore TS6133
function CfnUserToGroupAdditionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUserToGroupAdditionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUserToGroupAdditionProps>();
    ret.addPropertyResult('groupName', 'GroupName', cfn_parse.FromCloudFormation.getString(properties.GroupName));
    ret.addPropertyResult('users', 'Users', cfn_parse.FromCloudFormation.getStringArray(properties.Users));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IAM::UserToGroupAddition`
 *
 * Adds the specified user to the specified group.
 *
 * @cloudformationResource AWS::IAM::UserToGroupAddition
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-addusertogroup.html
 */
export class CfnUserToGroupAddition extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IAM::UserToGroupAddition";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnUserToGroupAddition {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnUserToGroupAdditionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnUserToGroupAddition(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the group to update.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-addusertogroup.html#cfn-iam-addusertogroup-groupname
     */
    public groupName: string;

    /**
     * A list of the names of the users that you want to add to the group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-addusertogroup.html#cfn-iam-addusertogroup-users
     */
    public users: string[];

    /**
     * Create a new `AWS::IAM::UserToGroupAddition`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnUserToGroupAdditionProps) {
        super(scope, id, { type: CfnUserToGroupAddition.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'groupName', this);
        cdk.requireProperty(props, 'users', this);

        this.groupName = props.groupName;
        this.users = props.users;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnUserToGroupAddition.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            groupName: this.groupName,
            users: this.users,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnUserToGroupAdditionPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnVirtualMFADevice`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-virtualmfadevice.html
 */
export interface CfnVirtualMFADeviceProps {

    /**
     * The IAM user associated with this virtual MFA device.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-virtualmfadevice.html#cfn-iam-virtualmfadevice-users
     */
    readonly users: string[];

    /**
     * The path for the virtual MFA device. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide* .
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/).
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! ( `\ u0021` ) through the DEL character ( `\ u007F` ), including most punctuation characters, digits, and upper and lowercased letters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-virtualmfadevice.html#cfn-iam-virtualmfadevice-path
     */
    readonly path?: string;

    /**
     * A list of tags that you want to attach to the new IAM virtual MFA device. Each tag consists of a key name and an associated value. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide* .
     *
     * > If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request fails and the resource is not created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-virtualmfadevice.html#cfn-iam-virtualmfadevice-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The name of the virtual MFA device. Use with path to uniquely identify a virtual MFA device.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-virtualmfadevice.html#cfn-iam-virtualmfadevice-virtualmfadevicename
     */
    readonly virtualMfaDeviceName?: string;
}

/**
 * Determine whether the given properties match those of a `CfnVirtualMFADeviceProps`
 *
 * @param properties - the TypeScript properties of a `CfnVirtualMFADeviceProps`
 *
 * @returns the result of the validation.
 */
function CfnVirtualMFADevicePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('path', cdk.validateString)(properties.path));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('users', cdk.requiredValidator)(properties.users));
    errors.collect(cdk.propertyValidator('users', cdk.listValidator(cdk.validateString))(properties.users));
    errors.collect(cdk.propertyValidator('virtualMfaDeviceName', cdk.validateString)(properties.virtualMfaDeviceName));
    return errors.wrap('supplied properties not correct for "CfnVirtualMFADeviceProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IAM::VirtualMFADevice` resource
 *
 * @param properties - the TypeScript properties of a `CfnVirtualMFADeviceProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IAM::VirtualMFADevice` resource.
 */
// @ts-ignore TS6133
function cfnVirtualMFADevicePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnVirtualMFADevicePropsValidator(properties).assertSuccess();
    return {
        Users: cdk.listMapper(cdk.stringToCloudFormation)(properties.users),
        Path: cdk.stringToCloudFormation(properties.path),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        VirtualMfaDeviceName: cdk.stringToCloudFormation(properties.virtualMfaDeviceName),
    };
}

// @ts-ignore TS6133
function CfnVirtualMFADevicePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnVirtualMFADeviceProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnVirtualMFADeviceProps>();
    ret.addPropertyResult('users', 'Users', cfn_parse.FromCloudFormation.getStringArray(properties.Users));
    ret.addPropertyResult('path', 'Path', properties.Path != null ? cfn_parse.FromCloudFormation.getString(properties.Path) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('virtualMfaDeviceName', 'VirtualMfaDeviceName', properties.VirtualMfaDeviceName != null ? cfn_parse.FromCloudFormation.getString(properties.VirtualMfaDeviceName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IAM::VirtualMFADevice`
 *
 * Creates a new virtual MFA device for the AWS account . After creating the virtual MFA, use [EnableMFADevice](https://docs.aws.amazon.com/IAM/latest/APIReference/API_EnableMFADevice.html) to attach the MFA device to an IAM user. For more information about creating and working with virtual MFA devices, see [Using a virtual MFA device](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_VirtualMFA.html) in the *IAM User Guide* .
 *
 * For information about the maximum number of MFA devices you can create, see [IAM and AWS STS quotas](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html) in the *IAM User Guide* .
 *
 * > The seed information contained in the QR code and the Base32 string should be treated like any other secret access information. In other words, protect the seed information as you would your AWS access keys or your passwords. After you provision your virtual device, you should ensure that the information is destroyed following secure procedures.
 *
 * @cloudformationResource AWS::IAM::VirtualMFADevice
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-virtualmfadevice.html
 */
export class CfnVirtualMFADevice extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IAM::VirtualMFADevice";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnVirtualMFADevice {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnVirtualMFADevicePropsFromCloudFormation(resourceProperties);
        const ret = new CfnVirtualMFADevice(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Returns the serial number for the specified `AWS::IAM::VirtualMFADevice` resource.
     * @cloudformationAttribute SerialNumber
     */
    public readonly attrSerialNumber: string;

    /**
     * The IAM user associated with this virtual MFA device.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-virtualmfadevice.html#cfn-iam-virtualmfadevice-users
     */
    public users: string[];

    /**
     * The path for the virtual MFA device. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide* .
     *
     * This parameter is optional. If it is not included, it defaults to a slash (/).
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! ( `\ u0021` ) through the DEL character ( `\ u007F` ), including most punctuation characters, digits, and upper and lowercased letters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-virtualmfadevice.html#cfn-iam-virtualmfadevice-path
     */
    public path: string | undefined;

    /**
     * A list of tags that you want to attach to the new IAM virtual MFA device. Each tag consists of a key name and an associated value. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide* .
     *
     * > If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request fails and the resource is not created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-virtualmfadevice.html#cfn-iam-virtualmfadevice-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The name of the virtual MFA device. Use with path to uniquely identify a virtual MFA device.
     *
     * This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) ) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-virtualmfadevice.html#cfn-iam-virtualmfadevice-virtualmfadevicename
     */
    public virtualMfaDeviceName: string | undefined;

    /**
     * Create a new `AWS::IAM::VirtualMFADevice`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnVirtualMFADeviceProps) {
        super(scope, id, { type: CfnVirtualMFADevice.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'users', this);
        this.attrSerialNumber = cdk.Token.asString(this.getAtt('SerialNumber'));

        this.users = props.users;
        this.path = props.path;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IAM::VirtualMFADevice", props.tags, { tagPropertyName: 'tags' });
        this.virtualMfaDeviceName = props.virtualMfaDeviceName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnVirtualMFADevice.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            users: this.users,
            path: this.path,
            tags: this.tags.renderTags(),
            virtualMfaDeviceName: this.virtualMfaDeviceName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnVirtualMFADevicePropsToCloudFormation(props);
    }
}
