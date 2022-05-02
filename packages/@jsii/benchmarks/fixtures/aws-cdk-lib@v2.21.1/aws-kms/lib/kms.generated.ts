// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:10:22.038Z","fingerprint":"DUqAfiBAmvesbkTk6rK3BpsH5QW3YKK8BKbuqXo3tHg="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnAlias`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-alias.html
 */
export interface CfnAliasProps {

    /**
     * Specifies the alias name. This value must begin with `alias/` followed by a name, such as `alias/ExampleAlias` .
     *
     * > If you change the value of a `Replacement` property, such as `AliasName` , the existing alias is deleted and a new alias is created for the specified KMS key. This change can disrupt applications that use the alias. It can also allow or deny access to a KMS key affected by attribute-based access control (ABAC).
     *
     * The alias must be string of 1-256 characters. It can contain only alphanumeric characters, forward slashes (/), underscores (_), and dashes (-). The alias name cannot begin with `alias/aws/` . The `alias/aws/` prefix is reserved for [AWS managed keys](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-cmk) .
     *
     * *Pattern* : `alias/^[a-zA-Z0-9/_-]+$`
     *
     * *Minimum* : `1`
     *
     * *Maximum* : `256`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-alias.html#cfn-kms-alias-aliasname
     */
    readonly aliasName: string;

    /**
     * Associates the alias with the specified [customer managed key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-cmk) . The KMS key must be in the same AWS account and Region.
     *
     * A valid key ID is required. If you supply a null or empty string value, this operation returns an error.
     *
     * For help finding the key ID and ARN, see [Finding the key ID and ARN](https://docs.aws.amazon.com/kms/latest/developerguide/viewing-keys.html#find-cmk-id-arn) in the *AWS Key Management Service Developer Guide* .
     *
     * Specify the key ID or the key ARN of the KMS key.
     *
     * For example:
     *
     * - Key ID: `1234abcd-12ab-34cd-56ef-1234567890ab`
     * - Key ARN: `arn:aws:kms:us-east-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab`
     *
     * To get the key ID and key ARN for a KMS key, use [ListKeys](https://docs.aws.amazon.com/kms/latest/APIReference/API_ListKeys.html) or [DescribeKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_DescribeKey.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-alias.html#cfn-kms-alias-targetkeyid
     */
    readonly targetKeyId: string;
}

/**
 * Determine whether the given properties match those of a `CfnAliasProps`
 *
 * @param properties - the TypeScript properties of a `CfnAliasProps`
 *
 * @returns the result of the validation.
 */
function CfnAliasPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('aliasName', cdk.requiredValidator)(properties.aliasName));
    errors.collect(cdk.propertyValidator('aliasName', cdk.validateString)(properties.aliasName));
    errors.collect(cdk.propertyValidator('targetKeyId', cdk.requiredValidator)(properties.targetKeyId));
    errors.collect(cdk.propertyValidator('targetKeyId', cdk.validateString)(properties.targetKeyId));
    return errors.wrap('supplied properties not correct for "CfnAliasProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KMS::Alias` resource
 *
 * @param properties - the TypeScript properties of a `CfnAliasProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KMS::Alias` resource.
 */
// @ts-ignore TS6133
function cfnAliasPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAliasPropsValidator(properties).assertSuccess();
    return {
        AliasName: cdk.stringToCloudFormation(properties.aliasName),
        TargetKeyId: cdk.stringToCloudFormation(properties.targetKeyId),
    };
}

// @ts-ignore TS6133
function CfnAliasPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAliasProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAliasProps>();
    ret.addPropertyResult('aliasName', 'AliasName', cfn_parse.FromCloudFormation.getString(properties.AliasName));
    ret.addPropertyResult('targetKeyId', 'TargetKeyId', cfn_parse.FromCloudFormation.getString(properties.TargetKeyId));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::KMS::Alias`
 *
 * The `AWS::KMS::Alias` resource specifies a display name for a [KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#kms_keys) . You can use an alias to identify a KMS key in the AWS KMS console, in the [DescribeKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_DescribeKey.html) operation, and in [cryptographic operations](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#cryptographic-operations) , such as [Decrypt](https://docs.aws.amazon.com/kms/latest/APIReference/API_Decrypt.html) and [GenerateDataKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_GenerateDataKey.html) .
 *
 * > Adding, deleting, or updating an alias can allow or deny permission to the KMS key. For details, see [ABAC for AWS KMS](https://docs.aws.amazon.com/kms/latest/developerguide/abac.html) in the *AWS Key Management Service Developer Guide* .
 *
 * Using an alias to refer to a KMS key can help you simplify key management. For example, an alias in your code can be associated with different KMS keys in different AWS Regions . For more information, see [Using aliases](https://docs.aws.amazon.com/kms/latest/developerguide/kms-alias.html) in the *AWS Key Management Service Developer Guide* .
 *
 * When specifying an alias, observe the following rules.
 *
 * - Each alias is associated with one KMS key, but multiple aliases can be associated with the same KMS key.
 * - The alias and its associated KMS key must be in the same AWS account and Region.
 * - The alias name must be unique in the AWS account and Region. However, you can create aliases with the same name in different AWS Regions . For example, you can have an `alias/projectKey` in multiple Regions, each of which is associated with a KMS key in its Region.
 * - Each alias name must begin with `alias/` followed by a name, such as `alias/exampleKey` . The alias name can contain only alphanumeric characters, forward slashes (/), underscores (_), and dashes (-). Alias names cannot begin with `alias/aws/` . That alias name prefix is reserved for [AWS managed keys](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-cmk) .
 *
 * @cloudformationResource AWS::KMS::Alias
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-alias.html
 */
export class CfnAlias extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::KMS::Alias";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAlias {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAliasPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAlias(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Specifies the alias name. This value must begin with `alias/` followed by a name, such as `alias/ExampleAlias` .
     *
     * > If you change the value of a `Replacement` property, such as `AliasName` , the existing alias is deleted and a new alias is created for the specified KMS key. This change can disrupt applications that use the alias. It can also allow or deny access to a KMS key affected by attribute-based access control (ABAC).
     *
     * The alias must be string of 1-256 characters. It can contain only alphanumeric characters, forward slashes (/), underscores (_), and dashes (-). The alias name cannot begin with `alias/aws/` . The `alias/aws/` prefix is reserved for [AWS managed keys](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-cmk) .
     *
     * *Pattern* : `alias/^[a-zA-Z0-9/_-]+$`
     *
     * *Minimum* : `1`
     *
     * *Maximum* : `256`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-alias.html#cfn-kms-alias-aliasname
     */
    public aliasName: string;

    /**
     * Associates the alias with the specified [customer managed key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-cmk) . The KMS key must be in the same AWS account and Region.
     *
     * A valid key ID is required. If you supply a null or empty string value, this operation returns an error.
     *
     * For help finding the key ID and ARN, see [Finding the key ID and ARN](https://docs.aws.amazon.com/kms/latest/developerguide/viewing-keys.html#find-cmk-id-arn) in the *AWS Key Management Service Developer Guide* .
     *
     * Specify the key ID or the key ARN of the KMS key.
     *
     * For example:
     *
     * - Key ID: `1234abcd-12ab-34cd-56ef-1234567890ab`
     * - Key ARN: `arn:aws:kms:us-east-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab`
     *
     * To get the key ID and key ARN for a KMS key, use [ListKeys](https://docs.aws.amazon.com/kms/latest/APIReference/API_ListKeys.html) or [DescribeKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_DescribeKey.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-alias.html#cfn-kms-alias-targetkeyid
     */
    public targetKeyId: string;

    /**
     * Create a new `AWS::KMS::Alias`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAliasProps) {
        super(scope, id, { type: CfnAlias.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'aliasName', this);
        cdk.requireProperty(props, 'targetKeyId', this);

        this.aliasName = props.aliasName;
        this.targetKeyId = props.targetKeyId;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAlias.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            aliasName: this.aliasName,
            targetKeyId: this.targetKeyId,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAliasPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnKey`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html
 */
export interface CfnKeyProps {

    /**
     * The key policy that authorizes use of the KMS key. The key policy must conform to the following rules.
     *
     * - The key policy must allow the caller to make a subsequent [PutKeyPolicy](https://docs.aws.amazon.com/kms/latest/APIReference/API_PutKeyPolicy.html) request on the KMS key. This reduces the risk that the KMS key becomes unmanageable. For more information, refer to the scenario in the [Default key policy](https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html#key-policy-default-allow-root-enable-iam) section of the **AWS Key Management Service Developer Guide** .
     * - Each statement in the key policy must contain one or more principals. The principals in the key policy must exist and be visible to AWS KMS . When you create a new AWS principal (for example, an IAM user or role), you might need to enforce a delay before including the new principal in a key policy because the new principal might not be immediately visible to AWS KMS . For more information, see [Changes that I make are not always immediately visible](https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_general.html#troubleshoot_general_eventual-consistency) in the *AWS Identity and Access Management User Guide* .
     * - The key policy size limit is 32 kilobytes (32768 bytes).
     *
     * If you are unsure of which policy to use, consider the *default key policy* . This is the key policy that AWS KMS applies to KMS keys that are created by using the CreateKey API with no specified key policy. It gives the AWS account that owns the key permission to perform all operations on the key. It also allows you write IAM policies to authorize access to the key. For details, see [Default key policy](https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html#key-policy-default) in the *AWS Key Management Service Developer Guide* .
     *
     * *Minimum* : `1`
     *
     * *Maximum* : `32768`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-keypolicy
     */
    readonly keyPolicy: any | cdk.IResolvable;

    /**
     * A description of the KMS key. Use a description that helps you to distinguish this KMS key from others in the account, such as its intended use.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-description
     */
    readonly description?: string;

    /**
     * Specifies whether the KMS key is enabled. Disabled KMS keys cannot be used in cryptographic operations.
     *
     * When `Enabled` is `true` , the *key state* of the KMS key is `Enabled` . When `Enabled` is `false` , the key state of the KMS key is `Disabled` . The default value is `true` .
     *
     * The actual key state of the KMS key might be affected by actions taken outside of CloudFormation, such as running the [EnableKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_EnableKey.html) , [DisableKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_DisableKey.html) , or [ScheduleKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html) operations.
     *
     * For information about the key states of a KMS key, see [Key state: Effect on your KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html) in the *AWS Key Management Service Developer Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-enabled
     */
    readonly enabled?: boolean | cdk.IResolvable;

    /**
     * Enables automatic rotation of the key material for the specified KMS key. By default, automatic key rotation is not enabled.
     *
     * AWS KMS supports automatic rotation only for symmetric KMS keys ( `KeySpec` = `SYMMETRIC_DEFAULT` ). Automatic key rotation is *not* supported for asymmetric KMS keys. For asymmetric KMS keys, omit the `EnableKeyRotation` property or set it to `false` .
     *
     * To enable automatic key rotation of the key material for a multi-Region KMS key, set `EnableKeyRotation` to `true` on the primary key (created by using `AWS::KMS::Key` ). AWS KMS copies the rotation status to all replica keys when you create them. For details, see [Rotating multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-manage.html#multi-region-rotate) in the *AWS Key Management Service Developer Guide* .
     *
     * When you enable automatic rotation, AWS KMS automatically creates new key material for the KMS key one year after the enable date and every year thereafter. AWS KMS retains all key material until you delete the KMS key. For detailed information about automatic key rotation, see [Rotating KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) in the *AWS Key Management Service Developer Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-enablekeyrotation
     */
    readonly enableKeyRotation?: boolean | cdk.IResolvable;

    /**
     * Specifies the type of KMS key to create. The default value, `SYMMETRIC_DEFAULT` , creates a KMS key with a 256-bit symmetric key for encryption and decryption. For help choosing a key spec for your KMS key, see [How to choose Your KMS key configuration](https://docs.aws.amazon.com/kms/latest/developerguide/symm-asymm-choose.html) in the *AWS Key Management Service Developer Guide* .
     *
     * The `KeySpec` property determines whether the KMS key contains a symmetric key or an asymmetric key pair. It also determines the encryption algorithms or signing algorithms that the KMS key supports. You can't change the `KeySpec` after the KMS key is created. To further restrict the algorithms that can be used with the KMS key, use a condition key in its key policy or IAM policy. For more information, see [kms:EncryptionAlgorithm](https://docs.aws.amazon.com/kms/latest/developerguide/policy-conditions.html#conditions-kms-encryption-algorithm) or [kms:Signing Algorithm](https://docs.aws.amazon.com/kms/latest/developerguide/policy-conditions.html#conditions-kms-signing-algorithm) in the *AWS Key Management Service Developer Guide* .
     *
     * > If you change the `KeySpec` of an existing KMS key, the existing KMS key is scheduled for deletion and a new KMS key is created with the specified `KeySpec` value. While the scheduled deletion is pending, you can't use the existing KMS key. Unless you [cancel the scheduled deletion](https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-keys-scheduling-key-deletion) of the KMS key outside of CloudFormation, all data encrypted under the existing KMS key becomes unrecoverable when the KMS key is deleted. > [AWS services that are integrated with AWS KMS](https://docs.aws.amazon.com/kms/features/#AWS_Service_Integration) use symmetric KMS keys to protect your data. These services do not support asymmetric KMS keys. For help determining whether a KMS key is symmetric or asymmetric, see [Identifying Symmetric and Asymmetric KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/find-symm-asymm.html) in the *AWS Key Management Service Developer Guide* .
     *
     * AWS KMS supports the following key specs for KMS keys:
     *
     * - Symmetric key (default)
     *
     * - `SYMMETRIC_DEFAULT` (AES-256-GCM)
     * - Asymmetric RSA key pairs
     *
     * - `RSA_2048`
     * - `RSA_3072`
     * - `RSA_4096`
     * - Asymmetric NIST-recommended elliptic curve key pairs
     *
     * - `ECC_NIST_P256` (secp256r1)
     * - `ECC_NIST_P384` (secp384r1)
     * - `ECC_NIST_P521` (secp521r1)
     * - Other asymmetric elliptic curve key pairs
     *
     * - `ECC_SECG_P256K1` (secp256k1), commonly used for cryptocurrencies.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-keyspec
     */
    readonly keySpec?: string;

    /**
     * Determines the [cryptographic operations](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#cryptographic-operations) for which you can use the KMS key. The default value is `ENCRYPT_DECRYPT` . This property is required only for asymmetric KMS keys. You can't change the `KeyUsage` value after the KMS key is created.
     *
     * > If you change the `KeyUsage` of an existing KMS key, the existing KMS key is scheduled for deletion and a new KMS key is created with the specified `KeyUsage` value. While the scheduled deletion is pending, you can't use the existing KMS key. Unless you [cancel the scheduled deletion](https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-keys-scheduling-key-deletion) of the KMS key outside of CloudFormation, all data encrypted under the existing KMS key becomes unrecoverable when the KMS key is deleted.
     *
     * Select only one valid value.
     *
     * - For symmetric KMS keys, omit the property or specify `ENCRYPT_DECRYPT` .
     * - For asymmetric KMS keys with RSA key material, specify `ENCRYPT_DECRYPT` or `SIGN_VERIFY` .
     * - For asymmetric KMS keys with ECC key material, specify `SIGN_VERIFY` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-keyusage
     */
    readonly keyUsage?: string;

    /**
     * Creates a multi-Region primary key that you can replicate in other AWS Regions .
     *
     * > If you change the `MultiRegion` property of an existing KMS key, the existing KMS key is scheduled for deletion and a new KMS key is created with the specified `Multi-Region` value. While the scheduled deletion is pending, you can't use the existing KMS key. Unless you [cancel the scheduled deletion](https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-keys-scheduling-key-deletion) of the KMS key outside of CloudFormation, all data encrypted under the existing KMS key becomes unrecoverable when the KMS key is deleted.
     *
     * For a multi-Region key, set to this property to `true` . For a single-Region key, omit this property or set it to `false` . The default value is `false` .
     *
     * *Multi-Region keys* are an AWS KMS feature that lets you create multiple interoperable KMS keys in different AWS Regions . Because these KMS keys have the same key ID, key material, and other metadata, you can use them to encrypt data in one AWS Region and decrypt it in a different AWS Region without making a cross-Region call or exposing the plaintext data. For more information, see [Multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html) in the *AWS Key Management Service Developer Guide* .
     *
     * You can create a symmetric or asymmetric multi-Region key, and you can create a multi-Region key with imported key material. However, you cannot create a multi-Region key in a custom key store.
     *
     * To create a replica of this primary key in a different AWS Region , create an [AWS::KMS::ReplicaKey](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html) resource in a CloudFormation stack in the replica Region. Specify the key ARN of this primary key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-multiregion
     */
    readonly multiRegion?: boolean | cdk.IResolvable;

    /**
     * Specifies the number of days in the waiting period before AWS KMS deletes a KMS key that has been removed from a CloudFormation stack. Enter a value between 7 and 30 days. The default value is 30 days.
     *
     * When you remove a KMS key from a CloudFormation stack, AWS KMS schedules the KMS key for deletion and starts the mandatory waiting period. The `PendingWindowInDays` property determines the length of waiting period. During the waiting period, the key state of KMS key is `Pending Deletion` or `Pending Replica Deletion` , which prevents the KMS key from being used in cryptographic operations. When the waiting period expires, AWS KMS permanently deletes the KMS key.
     *
     * AWS KMS will not delete a [multi-Region primary key](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html) that has replica keys. If you remove a multi-Region primary key from a CloudFormation stack, its key state changes to `PendingReplicaDeletion` so it cannot be replicated or used in cryptographic operations. This state can persist indefinitely. When the last of its replica keys is deleted, the key state of the primary key changes to `PendingDeletion` and the waiting period specified by `PendingWindowInDays` begins. When this waiting period expires, AWS KMS deletes the primary key. For details, see [Deleting multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-delete.html) in the *AWS Key Management Service Developer Guide* .
     *
     * You cannot use a CloudFormation template to cancel deletion of the KMS key after you remove it from the stack, regardless of the waiting period. If you specify a KMS key in your template, even one with the same name, CloudFormation creates a new KMS key. To cancel deletion of a KMS key, use the AWS KMS console or the [CancelKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_CancelKeyDeletion.html) operation.
     *
     * For information about the `Pending Deletion` and `Pending Replica Deletion` key states, see [Key state: Effect on your KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html) in the *AWS Key Management Service Developer Guide* . For more information about deleting KMS keys, see the [ScheduleKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html) operation in the *AWS Key Management Service API Reference* and [Deleting KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html) in the *AWS Key Management Service Developer Guide* .
     *
     * *Minimum* : 7
     *
     * *Maximum* : 30
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-pendingwindowindays
     */
    readonly pendingWindowInDays?: number;

    /**
     * Assigns one or more tags to the replica key.
     *
     * > Tagging or untagging a KMS key can allow or deny permission to the KMS key. For details, see [ABAC for AWS KMS](https://docs.aws.amazon.com/kms/latest/developerguide/abac.html) in the *AWS Key Management Service Developer Guide* .
     *
     * For information about tags in AWS KMS , see [Tagging keys](https://docs.aws.amazon.com/kms/latest/developerguide/tagging-keys.html) in the *AWS Key Management Service Developer Guide* . For information about tags in CloudFormation, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnKeyProps`
 *
 * @param properties - the TypeScript properties of a `CfnKeyProps`
 *
 * @returns the result of the validation.
 */
function CfnKeyPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('enableKeyRotation', cdk.validateBoolean)(properties.enableKeyRotation));
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    errors.collect(cdk.propertyValidator('keyPolicy', cdk.requiredValidator)(properties.keyPolicy));
    errors.collect(cdk.propertyValidator('keyPolicy', cdk.validateObject)(properties.keyPolicy));
    errors.collect(cdk.propertyValidator('keySpec', cdk.validateString)(properties.keySpec));
    errors.collect(cdk.propertyValidator('keyUsage', cdk.validateString)(properties.keyUsage));
    errors.collect(cdk.propertyValidator('multiRegion', cdk.validateBoolean)(properties.multiRegion));
    errors.collect(cdk.propertyValidator('pendingWindowInDays', cdk.validateNumber)(properties.pendingWindowInDays));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnKeyProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KMS::Key` resource
 *
 * @param properties - the TypeScript properties of a `CfnKeyProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KMS::Key` resource.
 */
// @ts-ignore TS6133
function cfnKeyPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnKeyPropsValidator(properties).assertSuccess();
    return {
        KeyPolicy: cdk.objectToCloudFormation(properties.keyPolicy),
        Description: cdk.stringToCloudFormation(properties.description),
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
        EnableKeyRotation: cdk.booleanToCloudFormation(properties.enableKeyRotation),
        KeySpec: cdk.stringToCloudFormation(properties.keySpec),
        KeyUsage: cdk.stringToCloudFormation(properties.keyUsage),
        MultiRegion: cdk.booleanToCloudFormation(properties.multiRegion),
        PendingWindowInDays: cdk.numberToCloudFormation(properties.pendingWindowInDays),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnKeyPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnKeyProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnKeyProps>();
    ret.addPropertyResult('keyPolicy', 'KeyPolicy', cfn_parse.FromCloudFormation.getAny(properties.KeyPolicy));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('enabled', 'Enabled', properties.Enabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enabled) : undefined);
    ret.addPropertyResult('enableKeyRotation', 'EnableKeyRotation', properties.EnableKeyRotation != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableKeyRotation) : undefined);
    ret.addPropertyResult('keySpec', 'KeySpec', properties.KeySpec != null ? cfn_parse.FromCloudFormation.getString(properties.KeySpec) : undefined);
    ret.addPropertyResult('keyUsage', 'KeyUsage', properties.KeyUsage != null ? cfn_parse.FromCloudFormation.getString(properties.KeyUsage) : undefined);
    ret.addPropertyResult('multiRegion', 'MultiRegion', properties.MultiRegion != null ? cfn_parse.FromCloudFormation.getBoolean(properties.MultiRegion) : undefined);
    ret.addPropertyResult('pendingWindowInDays', 'PendingWindowInDays', properties.PendingWindowInDays != null ? cfn_parse.FromCloudFormation.getNumber(properties.PendingWindowInDays) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::KMS::Key`
 *
 * The `AWS::KMS::Key` resource specifies a [symmetric or asymmetric](https://docs.aws.amazon.com/kms/latest/developerguide/symmetric-asymmetric.html) [KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#kms_keys) in AWS Key Management Service ( AWS KMS ).
 *
 * You can use the `AWS::KMS::Key` resource to specify a symmetric or asymmetric multi-Region primary key. To specify a replica key, use the [AWS::KMS::ReplicaKey](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html) resource. For information about multi-Region keys, see [Multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html) in the *AWS Key Management Service Developer Guide* .
 *
 * You cannot use the `AWS::KMS::Key` resource to specify a KMS key with [imported key material](https://docs.aws.amazon.com/kms/latest/developerguide/importing-keys.html) or a KMS key in a [custom key store](https://docs.aws.amazon.com/kms/latest/developerguide/custom-key-store-overview.html) .
 *
 * > AWS KMS is replacing the term *customer master key (CMK)* with *AWS KMS key* and *KMS key* . The concept has not changed. To prevent breaking changes, AWS KMS is keeping some variations of this term.
 *
 * You can use symmetric KMS keys to encrypt and decrypt small amounts of data, but they are more commonly used to generate data keys and data key pairs. You can also use symmetric KMS key to encrypt data stored in AWS services that are [integrated with AWS KMS](https://docs.aws.amazon.com//kms/features/#AWS_Service_Integration) . For more information, see [What is AWS Key Management Service ?](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html) in the *AWS Key Management Service Developer Guide* .
 *
 * You can use asymmetric KMS keys to encrypt and decrypt data or sign messages and verify signatures. To create an asymmetric key, you must specify an asymmetric `KeySpec` value and a `KeyUsage` value.
 *
 * > If you change the value of the `KeyUsage` , `KeySpec` , or `MultiRegion` property on an existing KMS key, the existing KMS key is [scheduled for deletion](https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html) and a new KMS key is created with the specified value.
 * >
 * > While scheduled for deletion, the existing KMS key becomes unusable. If you don't [cancel the scheduled deletion](https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-keys-scheduling-key-deletion) of the existing KMS key outside of CloudFormation, all data encrypted under the existing KMS key becomes unrecoverable when the KMS key is deleted.
 *
 * *Regions*
 *
 * AWS KMS CloudFormation resources are supported in all Regions in which AWS CloudFormation is supported. However, in the  (ap-southeast-3), you cannot use a CloudFormation template to create or manage asymmetric KMS keys or multi-Region KMS keys (primary or replica).
 *
 * @cloudformationResource AWS::KMS::Key
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html
 */
export class CfnKey extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::KMS::Key";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnKey {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnKeyPropsFromCloudFormation(resourceProperties);
        const ret = new CfnKey(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the KMS key, such as `arn:aws:kms:us-west-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab` .
     *
     * For information about the key ARN of a KMS key, see [Key ARN](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#key-id-key-ARN) in the *AWS Key Management Service Developer Guide* .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The key ID of the KMS key, such as `1234abcd-12ab-34cd-56ef-1234567890ab` .
     *
     * For information about the key ID of a KMS key, see [Key ID](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#key-id-key-id) in the *AWS Key Management Service Developer Guide* .
     * @cloudformationAttribute KeyId
     */
    public readonly attrKeyId: string;

    /**
     * The key policy that authorizes use of the KMS key. The key policy must conform to the following rules.
     *
     * - The key policy must allow the caller to make a subsequent [PutKeyPolicy](https://docs.aws.amazon.com/kms/latest/APIReference/API_PutKeyPolicy.html) request on the KMS key. This reduces the risk that the KMS key becomes unmanageable. For more information, refer to the scenario in the [Default key policy](https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html#key-policy-default-allow-root-enable-iam) section of the **AWS Key Management Service Developer Guide** .
     * - Each statement in the key policy must contain one or more principals. The principals in the key policy must exist and be visible to AWS KMS . When you create a new AWS principal (for example, an IAM user or role), you might need to enforce a delay before including the new principal in a key policy because the new principal might not be immediately visible to AWS KMS . For more information, see [Changes that I make are not always immediately visible](https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_general.html#troubleshoot_general_eventual-consistency) in the *AWS Identity and Access Management User Guide* .
     * - The key policy size limit is 32 kilobytes (32768 bytes).
     *
     * If you are unsure of which policy to use, consider the *default key policy* . This is the key policy that AWS KMS applies to KMS keys that are created by using the CreateKey API with no specified key policy. It gives the AWS account that owns the key permission to perform all operations on the key. It also allows you write IAM policies to authorize access to the key. For details, see [Default key policy](https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html#key-policy-default) in the *AWS Key Management Service Developer Guide* .
     *
     * *Minimum* : `1`
     *
     * *Maximum* : `32768`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-keypolicy
     */
    public keyPolicy: any | cdk.IResolvable;

    /**
     * A description of the KMS key. Use a description that helps you to distinguish this KMS key from others in the account, such as its intended use.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-description
     */
    public description: string | undefined;

    /**
     * Specifies whether the KMS key is enabled. Disabled KMS keys cannot be used in cryptographic operations.
     *
     * When `Enabled` is `true` , the *key state* of the KMS key is `Enabled` . When `Enabled` is `false` , the key state of the KMS key is `Disabled` . The default value is `true` .
     *
     * The actual key state of the KMS key might be affected by actions taken outside of CloudFormation, such as running the [EnableKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_EnableKey.html) , [DisableKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_DisableKey.html) , or [ScheduleKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html) operations.
     *
     * For information about the key states of a KMS key, see [Key state: Effect on your KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html) in the *AWS Key Management Service Developer Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-enabled
     */
    public enabled: boolean | cdk.IResolvable | undefined;

    /**
     * Enables automatic rotation of the key material for the specified KMS key. By default, automatic key rotation is not enabled.
     *
     * AWS KMS supports automatic rotation only for symmetric KMS keys ( `KeySpec` = `SYMMETRIC_DEFAULT` ). Automatic key rotation is *not* supported for asymmetric KMS keys. For asymmetric KMS keys, omit the `EnableKeyRotation` property or set it to `false` .
     *
     * To enable automatic key rotation of the key material for a multi-Region KMS key, set `EnableKeyRotation` to `true` on the primary key (created by using `AWS::KMS::Key` ). AWS KMS copies the rotation status to all replica keys when you create them. For details, see [Rotating multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-manage.html#multi-region-rotate) in the *AWS Key Management Service Developer Guide* .
     *
     * When you enable automatic rotation, AWS KMS automatically creates new key material for the KMS key one year after the enable date and every year thereafter. AWS KMS retains all key material until you delete the KMS key. For detailed information about automatic key rotation, see [Rotating KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) in the *AWS Key Management Service Developer Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-enablekeyrotation
     */
    public enableKeyRotation: boolean | cdk.IResolvable | undefined;

    /**
     * Specifies the type of KMS key to create. The default value, `SYMMETRIC_DEFAULT` , creates a KMS key with a 256-bit symmetric key for encryption and decryption. For help choosing a key spec for your KMS key, see [How to choose Your KMS key configuration](https://docs.aws.amazon.com/kms/latest/developerguide/symm-asymm-choose.html) in the *AWS Key Management Service Developer Guide* .
     *
     * The `KeySpec` property determines whether the KMS key contains a symmetric key or an asymmetric key pair. It also determines the encryption algorithms or signing algorithms that the KMS key supports. You can't change the `KeySpec` after the KMS key is created. To further restrict the algorithms that can be used with the KMS key, use a condition key in its key policy or IAM policy. For more information, see [kms:EncryptionAlgorithm](https://docs.aws.amazon.com/kms/latest/developerguide/policy-conditions.html#conditions-kms-encryption-algorithm) or [kms:Signing Algorithm](https://docs.aws.amazon.com/kms/latest/developerguide/policy-conditions.html#conditions-kms-signing-algorithm) in the *AWS Key Management Service Developer Guide* .
     *
     * > If you change the `KeySpec` of an existing KMS key, the existing KMS key is scheduled for deletion and a new KMS key is created with the specified `KeySpec` value. While the scheduled deletion is pending, you can't use the existing KMS key. Unless you [cancel the scheduled deletion](https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-keys-scheduling-key-deletion) of the KMS key outside of CloudFormation, all data encrypted under the existing KMS key becomes unrecoverable when the KMS key is deleted. > [AWS services that are integrated with AWS KMS](https://docs.aws.amazon.com/kms/features/#AWS_Service_Integration) use symmetric KMS keys to protect your data. These services do not support asymmetric KMS keys. For help determining whether a KMS key is symmetric or asymmetric, see [Identifying Symmetric and Asymmetric KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/find-symm-asymm.html) in the *AWS Key Management Service Developer Guide* .
     *
     * AWS KMS supports the following key specs for KMS keys:
     *
     * - Symmetric key (default)
     *
     * - `SYMMETRIC_DEFAULT` (AES-256-GCM)
     * - Asymmetric RSA key pairs
     *
     * - `RSA_2048`
     * - `RSA_3072`
     * - `RSA_4096`
     * - Asymmetric NIST-recommended elliptic curve key pairs
     *
     * - `ECC_NIST_P256` (secp256r1)
     * - `ECC_NIST_P384` (secp384r1)
     * - `ECC_NIST_P521` (secp521r1)
     * - Other asymmetric elliptic curve key pairs
     *
     * - `ECC_SECG_P256K1` (secp256k1), commonly used for cryptocurrencies.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-keyspec
     */
    public keySpec: string | undefined;

    /**
     * Determines the [cryptographic operations](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#cryptographic-operations) for which you can use the KMS key. The default value is `ENCRYPT_DECRYPT` . This property is required only for asymmetric KMS keys. You can't change the `KeyUsage` value after the KMS key is created.
     *
     * > If you change the `KeyUsage` of an existing KMS key, the existing KMS key is scheduled for deletion and a new KMS key is created with the specified `KeyUsage` value. While the scheduled deletion is pending, you can't use the existing KMS key. Unless you [cancel the scheduled deletion](https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-keys-scheduling-key-deletion) of the KMS key outside of CloudFormation, all data encrypted under the existing KMS key becomes unrecoverable when the KMS key is deleted.
     *
     * Select only one valid value.
     *
     * - For symmetric KMS keys, omit the property or specify `ENCRYPT_DECRYPT` .
     * - For asymmetric KMS keys with RSA key material, specify `ENCRYPT_DECRYPT` or `SIGN_VERIFY` .
     * - For asymmetric KMS keys with ECC key material, specify `SIGN_VERIFY` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-keyusage
     */
    public keyUsage: string | undefined;

    /**
     * Creates a multi-Region primary key that you can replicate in other AWS Regions .
     *
     * > If you change the `MultiRegion` property of an existing KMS key, the existing KMS key is scheduled for deletion and a new KMS key is created with the specified `Multi-Region` value. While the scheduled deletion is pending, you can't use the existing KMS key. Unless you [cancel the scheduled deletion](https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html#deleting-keys-scheduling-key-deletion) of the KMS key outside of CloudFormation, all data encrypted under the existing KMS key becomes unrecoverable when the KMS key is deleted.
     *
     * For a multi-Region key, set to this property to `true` . For a single-Region key, omit this property or set it to `false` . The default value is `false` .
     *
     * *Multi-Region keys* are an AWS KMS feature that lets you create multiple interoperable KMS keys in different AWS Regions . Because these KMS keys have the same key ID, key material, and other metadata, you can use them to encrypt data in one AWS Region and decrypt it in a different AWS Region without making a cross-Region call or exposing the plaintext data. For more information, see [Multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html) in the *AWS Key Management Service Developer Guide* .
     *
     * You can create a symmetric or asymmetric multi-Region key, and you can create a multi-Region key with imported key material. However, you cannot create a multi-Region key in a custom key store.
     *
     * To create a replica of this primary key in a different AWS Region , create an [AWS::KMS::ReplicaKey](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html) resource in a CloudFormation stack in the replica Region. Specify the key ARN of this primary key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-multiregion
     */
    public multiRegion: boolean | cdk.IResolvable | undefined;

    /**
     * Specifies the number of days in the waiting period before AWS KMS deletes a KMS key that has been removed from a CloudFormation stack. Enter a value between 7 and 30 days. The default value is 30 days.
     *
     * When you remove a KMS key from a CloudFormation stack, AWS KMS schedules the KMS key for deletion and starts the mandatory waiting period. The `PendingWindowInDays` property determines the length of waiting period. During the waiting period, the key state of KMS key is `Pending Deletion` or `Pending Replica Deletion` , which prevents the KMS key from being used in cryptographic operations. When the waiting period expires, AWS KMS permanently deletes the KMS key.
     *
     * AWS KMS will not delete a [multi-Region primary key](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html) that has replica keys. If you remove a multi-Region primary key from a CloudFormation stack, its key state changes to `PendingReplicaDeletion` so it cannot be replicated or used in cryptographic operations. This state can persist indefinitely. When the last of its replica keys is deleted, the key state of the primary key changes to `PendingDeletion` and the waiting period specified by `PendingWindowInDays` begins. When this waiting period expires, AWS KMS deletes the primary key. For details, see [Deleting multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-delete.html) in the *AWS Key Management Service Developer Guide* .
     *
     * You cannot use a CloudFormation template to cancel deletion of the KMS key after you remove it from the stack, regardless of the waiting period. If you specify a KMS key in your template, even one with the same name, CloudFormation creates a new KMS key. To cancel deletion of a KMS key, use the AWS KMS console or the [CancelKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_CancelKeyDeletion.html) operation.
     *
     * For information about the `Pending Deletion` and `Pending Replica Deletion` key states, see [Key state: Effect on your KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html) in the *AWS Key Management Service Developer Guide* . For more information about deleting KMS keys, see the [ScheduleKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html) operation in the *AWS Key Management Service API Reference* and [Deleting KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html) in the *AWS Key Management Service Developer Guide* .
     *
     * *Minimum* : 7
     *
     * *Maximum* : 30
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-pendingwindowindays
     */
    public pendingWindowInDays: number | undefined;

    /**
     * Assigns one or more tags to the replica key.
     *
     * > Tagging or untagging a KMS key can allow or deny permission to the KMS key. For details, see [ABAC for AWS KMS](https://docs.aws.amazon.com/kms/latest/developerguide/abac.html) in the *AWS Key Management Service Developer Guide* .
     *
     * For information about tags in AWS KMS , see [Tagging keys](https://docs.aws.amazon.com/kms/latest/developerguide/tagging-keys.html) in the *AWS Key Management Service Developer Guide* . For information about tags in CloudFormation, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html#cfn-kms-key-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::KMS::Key`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnKeyProps) {
        super(scope, id, { type: CfnKey.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'keyPolicy', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrKeyId = cdk.Token.asString(this.getAtt('KeyId'));

        this.keyPolicy = props.keyPolicy;
        this.description = props.description;
        this.enabled = props.enabled;
        this.enableKeyRotation = props.enableKeyRotation;
        this.keySpec = props.keySpec;
        this.keyUsage = props.keyUsage;
        this.multiRegion = props.multiRegion;
        this.pendingWindowInDays = props.pendingWindowInDays;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::KMS::Key", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnKey.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            keyPolicy: this.keyPolicy,
            description: this.description,
            enabled: this.enabled,
            enableKeyRotation: this.enableKeyRotation,
            keySpec: this.keySpec,
            keyUsage: this.keyUsage,
            multiRegion: this.multiRegion,
            pendingWindowInDays: this.pendingWindowInDays,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnKeyPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnReplicaKey`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html
 */
export interface CfnReplicaKeyProps {

    /**
     * The key policy that authorizes use of the replica key.
     *
     * The key policy is not a shared property of multi-Region keys. You can specify the same key policy or a different key policy for each key in a set of related multi-Region keys. AWS KMS does not synchronize this property.
     *
     * The key policy must conform to the following rules.
     *
     * - The key policy must give the caller [PutKeyPolicy](https://docs.aws.amazon.com/kms/latest/APIReference/API_PutKeyPolicy.html) permission on the KMS key. This reduces the risk that the KMS key becomes unmanageable. For more information, refer to the scenario in the [Default key policy](https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html#key-policy-default-allow-root-enable-iam) section of the **AWS Key Management Service Developer Guide** .
     * - Each statement in the key policy must contain one or more principals. The principals in the key policy must exist and be visible to AWS KMS . When you create a new AWS principal (for example, an IAM user or role), you might need to enforce a delay before including the new principal in a key policy because the new principal might not be immediately visible to AWS KMS . For more information, see [Changes that I make are not always immediately visible](https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_general.html#troubleshoot_general_eventual-consistency) in the *AWS Identity and Access Management User Guide* .
     * - The key policy size limit is 32 kilobytes (32768 bytes).
     *
     * *Minimum* : `1`
     *
     * *Maximum* : `32768`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html#cfn-kms-replicakey-keypolicy
     */
    readonly keyPolicy: any | cdk.IResolvable;

    /**
     * Specifies the multi-Region primary key to replicate. The primary key must be in a different AWS Region of the same AWS partition. You can create only one replica of a given primary key in each AWS Region .
     *
     * > If you change the `PrimaryKeyArn` value of a replica key, the existing replica key is scheduled for deletion and a new replica key is created based on the specified primary key. While it is scheduled for deletion, the existing replica key becomes unusable. You can cancel the scheduled deletion of the key outside of CloudFormation.
     * >
     * > However, if you inadvertently delete a replica key, you can decrypt ciphertext encrypted by that replica key by using any related multi-Region key. If necessary, you can recreate the replica in the same Region after the previous one is completely deleted. For details, see [Deleting multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-delete.html) in the *AWS Key Management Service Developer Guide*
     *
     * Specify the key ARN of an existing multi-Region primary key. For example, `arn:aws:kms:us-east-2:111122223333:key/mrk-1234abcd12ab34cd56ef1234567890ab` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html#cfn-kms-replicakey-primarykeyarn
     */
    readonly primaryKeyArn: string;

    /**
     * A description of the KMS key.
     *
     * The default value is an empty string (no description).
     *
     * The description is not a shared property of multi-Region keys. You can specify the same description or a different description for each key in a set of related multi-Region keys. AWS Key Management Service does not synchronize this property.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html#cfn-kms-replicakey-description
     */
    readonly description?: string;

    /**
     * Specifies whether the replica key is enabled. Disabled KMS keys cannot be used in cryptographic operations.
     *
     * When `Enabled` is `true` , the *key state* of the KMS key is `Enabled` . When `Enabled` is `false` , the key state of the KMS key is `Disabled` . The default value is `true` .
     *
     * The actual key state of the replica might be affected by actions taken outside of CloudFormation, such as running the [EnableKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_EnableKey.html) , [DisableKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_DisableKey.html) , or [ScheduleKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html) operations. Also, while the replica key is being created, its key state is `Creating` . When the process is complete, the key state of the replica key changes to `Enabled` .
     *
     * For information about the key states of a KMS key, see [Key state: Effect on your KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html) in the *AWS Key Management Service Developer Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html#cfn-kms-replicakey-enabled
     */
    readonly enabled?: boolean | cdk.IResolvable;

    /**
     * Specifies the number of days in the waiting period before AWS KMS deletes a replica key that has been removed from a CloudFormation stack. Enter a value between 7 and 30 days. The default value is 30 days.
     *
     * When you remove a replica key from a CloudFormation stack, AWS KMS schedules the replica key for deletion and starts the mandatory waiting period. The `PendingWindowInDays` property determines the length of waiting period. During the waiting period, the key state of replica key is `Pending Deletion` , which prevents it from being used in cryptographic operations. When the waiting period expires, AWS KMS permanently deletes the replica key.
     *
     * You cannot use a CloudFormation template to cancel deletion of the replica after you remove it from the stack, regardless of the waiting period. However, if you specify a replica key in your template that is based on the same primary key as the original replica key, CloudFormation creates a new replica key with the same key ID, key material, and other shared properties of the original replica key. This new replica key can decrypt ciphertext that was encrypted under the original replica key, or any related multi-Region key.
     *
     * For detailed information about deleting multi-Region keys, see [Deleting multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-delete.html) in the *AWS Key Management Service Developer Guide* .
     *
     * For information about the `PendingDeletion` key state, see [Key state: Effect on your KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html) in the *AWS Key Management Service Developer Guide* . For more information about deleting KMS keys, see the [ScheduleKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html) operation in the *AWS Key Management Service API Reference* and [Deleting KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html) in the *AWS Key Management Service Developer Guide* .
     *
     * *Minimum* : 7
     *
     * *Maximum* : 30
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html#cfn-kms-replicakey-pendingwindowindays
     */
    readonly pendingWindowInDays?: number;

    /**
     * Assigns one or more tags to the replica key.
     *
     * > Tagging or untagging a KMS key can allow or deny permission to the KMS key. For details, see [ABAC for AWS KMS](https://docs.aws.amazon.com/kms/latest/developerguide/abac.html) in the *AWS Key Management Service Developer Guide* .
     *
     * Tags are not a shared property of multi-Region keys. You can specify the same tags or different tags for each key in a set of related multi-Region keys. AWS KMS does not synchronize this property.
     *
     * Each tag consists of a tag key and a tag value. Both the tag key and the tag value are required, but the tag value can be an empty (null) string. You cannot have more than one tag on a KMS key with the same tag key. If you specify an existing tag key with a different tag value, AWS KMS replaces the current tag value with the specified one.
     *
     * When you assign tags to an AWS resource, AWS generates a cost allocation report with usage and costs aggregated by tags. Tags can also be used to control access to a KMS key. For details, see [Tagging keys](https://docs.aws.amazon.com/kms/latest/developerguide/tagging-keys.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html#cfn-kms-replicakey-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnReplicaKeyProps`
 *
 * @param properties - the TypeScript properties of a `CfnReplicaKeyProps`
 *
 * @returns the result of the validation.
 */
function CfnReplicaKeyPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    errors.collect(cdk.propertyValidator('keyPolicy', cdk.requiredValidator)(properties.keyPolicy));
    errors.collect(cdk.propertyValidator('keyPolicy', cdk.validateObject)(properties.keyPolicy));
    errors.collect(cdk.propertyValidator('pendingWindowInDays', cdk.validateNumber)(properties.pendingWindowInDays));
    errors.collect(cdk.propertyValidator('primaryKeyArn', cdk.requiredValidator)(properties.primaryKeyArn));
    errors.collect(cdk.propertyValidator('primaryKeyArn', cdk.validateString)(properties.primaryKeyArn));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnReplicaKeyProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KMS::ReplicaKey` resource
 *
 * @param properties - the TypeScript properties of a `CfnReplicaKeyProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KMS::ReplicaKey` resource.
 */
// @ts-ignore TS6133
function cfnReplicaKeyPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReplicaKeyPropsValidator(properties).assertSuccess();
    return {
        KeyPolicy: cdk.objectToCloudFormation(properties.keyPolicy),
        PrimaryKeyArn: cdk.stringToCloudFormation(properties.primaryKeyArn),
        Description: cdk.stringToCloudFormation(properties.description),
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
        PendingWindowInDays: cdk.numberToCloudFormation(properties.pendingWindowInDays),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnReplicaKeyPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReplicaKeyProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReplicaKeyProps>();
    ret.addPropertyResult('keyPolicy', 'KeyPolicy', cfn_parse.FromCloudFormation.getAny(properties.KeyPolicy));
    ret.addPropertyResult('primaryKeyArn', 'PrimaryKeyArn', cfn_parse.FromCloudFormation.getString(properties.PrimaryKeyArn));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('enabled', 'Enabled', properties.Enabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enabled) : undefined);
    ret.addPropertyResult('pendingWindowInDays', 'PendingWindowInDays', properties.PendingWindowInDays != null ? cfn_parse.FromCloudFormation.getNumber(properties.PendingWindowInDays) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::KMS::ReplicaKey`
 *
 * The `AWS::KMS::ReplicaKey` resource specifies a multi-Region replica key that is based on a multi-Region primary key.
 *
 * *Multi-Region keys* are an AWS KMS feature that lets you create multiple interoperable KMS keys in different AWS Regions . Because these KMS keys have the same key ID, key material, and other metadata, you can use them to encrypt data in one AWS Region and decrypt it in a different AWS Region without making a cross-Region call or exposing the plaintext data. For more information, see [Multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html) in the *AWS Key Management Service Developer Guide* .
 *
 * A multi-Region *primary key* is a fully functional symmetric or asymmetric KMS key that is also the model for replica keys in other AWS Regions . To create a multi-Region primary key, add an [AWS::KMS::Key](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html) resource to your CloudFormation stack. Set its `MultiRegion` property to true.
 *
 * A multi-Region *replica key* is a fully functional symmetric or asymmetric KMS key that has the same key ID and key material as a multi-Region primary key, but is located in a different AWS Region of the same AWS partition. There can be multiple replicas of a primary key, but each must be in a different AWS Region .
 *
 * A primary key and its replicas have the same key ID and key material. They also have the same key spec, key usage, key material origin, and automatic key rotation status. These properties are known as *shared properties* . If they change, AWS KMS synchronizes the change to all related multi-Region keys. All other properties of a replica key can differ, including its key policy, tags, aliases, and key state. AWS KMS does not synchronize these properties.
 *
 * *Regions*
 *
 * AWS KMS CloudFormation resources are supported in all Regions in which AWS CloudFormation is supported. However, in the  (ap-southeast-3), you cannot use a CloudFormation template to create or manage multi-Region KMS keys (primary or replica).
 *
 * @cloudformationResource AWS::KMS::ReplicaKey
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html
 */
export class CfnReplicaKey extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::KMS::ReplicaKey";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnReplicaKey {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnReplicaKeyPropsFromCloudFormation(resourceProperties);
        const ret = new CfnReplicaKey(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the replica key, such as `arn:aws:kms:us-west-2:111122223333:key/mrk-1234abcd12ab34cd56ef1234567890ab` .
     *
     * The key ARNs of related multi-Region keys differ only in the Region value. For information about the key ARNs of multi-Region keys, see [How multi-Region keys work](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#mrk-how-it-works) in the *AWS Key Management Service Developer Guide* .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The key ID of the replica key, such as `mrk-1234abcd12ab34cd56ef1234567890ab` .
     *
     * Related multi-Region keys have the same key ID. For information about the key IDs of multi-Region keys, see [How multi-Region keys work](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#mrk-how-it-works) in the *AWS Key Management Service Developer Guide* .
     * @cloudformationAttribute KeyId
     */
    public readonly attrKeyId: string;

    /**
     * The key policy that authorizes use of the replica key.
     *
     * The key policy is not a shared property of multi-Region keys. You can specify the same key policy or a different key policy for each key in a set of related multi-Region keys. AWS KMS does not synchronize this property.
     *
     * The key policy must conform to the following rules.
     *
     * - The key policy must give the caller [PutKeyPolicy](https://docs.aws.amazon.com/kms/latest/APIReference/API_PutKeyPolicy.html) permission on the KMS key. This reduces the risk that the KMS key becomes unmanageable. For more information, refer to the scenario in the [Default key policy](https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html#key-policy-default-allow-root-enable-iam) section of the **AWS Key Management Service Developer Guide** .
     * - Each statement in the key policy must contain one or more principals. The principals in the key policy must exist and be visible to AWS KMS . When you create a new AWS principal (for example, an IAM user or role), you might need to enforce a delay before including the new principal in a key policy because the new principal might not be immediately visible to AWS KMS . For more information, see [Changes that I make are not always immediately visible](https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_general.html#troubleshoot_general_eventual-consistency) in the *AWS Identity and Access Management User Guide* .
     * - The key policy size limit is 32 kilobytes (32768 bytes).
     *
     * *Minimum* : `1`
     *
     * *Maximum* : `32768`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html#cfn-kms-replicakey-keypolicy
     */
    public keyPolicy: any | cdk.IResolvable;

    /**
     * Specifies the multi-Region primary key to replicate. The primary key must be in a different AWS Region of the same AWS partition. You can create only one replica of a given primary key in each AWS Region .
     *
     * > If you change the `PrimaryKeyArn` value of a replica key, the existing replica key is scheduled for deletion and a new replica key is created based on the specified primary key. While it is scheduled for deletion, the existing replica key becomes unusable. You can cancel the scheduled deletion of the key outside of CloudFormation.
     * >
     * > However, if you inadvertently delete a replica key, you can decrypt ciphertext encrypted by that replica key by using any related multi-Region key. If necessary, you can recreate the replica in the same Region after the previous one is completely deleted. For details, see [Deleting multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-delete.html) in the *AWS Key Management Service Developer Guide*
     *
     * Specify the key ARN of an existing multi-Region primary key. For example, `arn:aws:kms:us-east-2:111122223333:key/mrk-1234abcd12ab34cd56ef1234567890ab` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html#cfn-kms-replicakey-primarykeyarn
     */
    public primaryKeyArn: string;

    /**
     * A description of the KMS key.
     *
     * The default value is an empty string (no description).
     *
     * The description is not a shared property of multi-Region keys. You can specify the same description or a different description for each key in a set of related multi-Region keys. AWS Key Management Service does not synchronize this property.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html#cfn-kms-replicakey-description
     */
    public description: string | undefined;

    /**
     * Specifies whether the replica key is enabled. Disabled KMS keys cannot be used in cryptographic operations.
     *
     * When `Enabled` is `true` , the *key state* of the KMS key is `Enabled` . When `Enabled` is `false` , the key state of the KMS key is `Disabled` . The default value is `true` .
     *
     * The actual key state of the replica might be affected by actions taken outside of CloudFormation, such as running the [EnableKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_EnableKey.html) , [DisableKey](https://docs.aws.amazon.com/kms/latest/APIReference/API_DisableKey.html) , or [ScheduleKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html) operations. Also, while the replica key is being created, its key state is `Creating` . When the process is complete, the key state of the replica key changes to `Enabled` .
     *
     * For information about the key states of a KMS key, see [Key state: Effect on your KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html) in the *AWS Key Management Service Developer Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html#cfn-kms-replicakey-enabled
     */
    public enabled: boolean | cdk.IResolvable | undefined;

    /**
     * Specifies the number of days in the waiting period before AWS KMS deletes a replica key that has been removed from a CloudFormation stack. Enter a value between 7 and 30 days. The default value is 30 days.
     *
     * When you remove a replica key from a CloudFormation stack, AWS KMS schedules the replica key for deletion and starts the mandatory waiting period. The `PendingWindowInDays` property determines the length of waiting period. During the waiting period, the key state of replica key is `Pending Deletion` , which prevents it from being used in cryptographic operations. When the waiting period expires, AWS KMS permanently deletes the replica key.
     *
     * You cannot use a CloudFormation template to cancel deletion of the replica after you remove it from the stack, regardless of the waiting period. However, if you specify a replica key in your template that is based on the same primary key as the original replica key, CloudFormation creates a new replica key with the same key ID, key material, and other shared properties of the original replica key. This new replica key can decrypt ciphertext that was encrypted under the original replica key, or any related multi-Region key.
     *
     * For detailed information about deleting multi-Region keys, see [Deleting multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-delete.html) in the *AWS Key Management Service Developer Guide* .
     *
     * For information about the `PendingDeletion` key state, see [Key state: Effect on your KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/key-state.html) in the *AWS Key Management Service Developer Guide* . For more information about deleting KMS keys, see the [ScheduleKeyDeletion](https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html) operation in the *AWS Key Management Service API Reference* and [Deleting KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html) in the *AWS Key Management Service Developer Guide* .
     *
     * *Minimum* : 7
     *
     * *Maximum* : 30
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html#cfn-kms-replicakey-pendingwindowindays
     */
    public pendingWindowInDays: number | undefined;

    /**
     * Assigns one or more tags to the replica key.
     *
     * > Tagging or untagging a KMS key can allow or deny permission to the KMS key. For details, see [ABAC for AWS KMS](https://docs.aws.amazon.com/kms/latest/developerguide/abac.html) in the *AWS Key Management Service Developer Guide* .
     *
     * Tags are not a shared property of multi-Region keys. You can specify the same tags or different tags for each key in a set of related multi-Region keys. AWS KMS does not synchronize this property.
     *
     * Each tag consists of a tag key and a tag value. Both the tag key and the tag value are required, but the tag value can be an empty (null) string. You cannot have more than one tag on a KMS key with the same tag key. If you specify an existing tag key with a different tag value, AWS KMS replaces the current tag value with the specified one.
     *
     * When you assign tags to an AWS resource, AWS generates a cost allocation report with usage and costs aggregated by tags. Tags can also be used to control access to a KMS key. For details, see [Tagging keys](https://docs.aws.amazon.com/kms/latest/developerguide/tagging-keys.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kms-replicakey.html#cfn-kms-replicakey-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::KMS::ReplicaKey`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnReplicaKeyProps) {
        super(scope, id, { type: CfnReplicaKey.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'keyPolicy', this);
        cdk.requireProperty(props, 'primaryKeyArn', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrKeyId = cdk.Token.asString(this.getAtt('KeyId'));

        this.keyPolicy = props.keyPolicy;
        this.primaryKeyArn = props.primaryKeyArn;
        this.description = props.description;
        this.enabled = props.enabled;
        this.pendingWindowInDays = props.pendingWindowInDays;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::KMS::ReplicaKey", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnReplicaKey.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            keyPolicy: this.keyPolicy,
            primaryKeyArn: this.primaryKeyArn,
            description: this.description,
            enabled: this.enabled,
            pendingWindowInDays: this.pendingWindowInDays,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnReplicaKeyPropsToCloudFormation(props);
    }
}
