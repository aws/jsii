// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:08.728Z","fingerprint":"Z+TxpX/krgVzASagENXNsXIiwdSOoBw1jI07gbBss/M="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnAccountAuditConfiguration`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-accountauditconfiguration.html
 */
export interface CfnAccountAuditConfigurationProps {

    /**
     * The ID of the account. You can use the expression `!Sub "${AWS::AccountId}"` to use your account ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-accountauditconfiguration.html#cfn-iot-accountauditconfiguration-accountid
     */
    readonly accountId: string;

    /**
     * Specifies which audit checks are enabled and disabled for this account.
     *
     * Some data collection might start immediately when certain checks are enabled. When a check is disabled, any data collected so far in relation to the check is deleted. To disable a check, set the value of the `Enabled:` key to `false` .
     *
     * If an enabled check is removed from the template, it will also be disabled.
     *
     * You can't disable a check if it's used by any scheduled audit. You must delete the check from the scheduled audit or delete the scheduled audit itself to disable the check.
     *
     * For more information on avialbe auidt checks see [AWS::IoT::AccountAuditConfiguration AuditCheckConfigurations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html)
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-accountauditconfiguration.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations
     */
    readonly auditCheckConfigurations: CfnAccountAuditConfiguration.AuditCheckConfigurationsProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of the role that grants permission to AWS IoT to access information about your devices, policies, certificates, and other items as required when performing an audit.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-accountauditconfiguration.html#cfn-iot-accountauditconfiguration-rolearn
     */
    readonly roleArn: string;

    /**
     * Information about the targets to which audit notifications are sent.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-accountauditconfiguration.html#cfn-iot-accountauditconfiguration-auditnotificationtargetconfigurations
     */
    readonly auditNotificationTargetConfigurations?: CfnAccountAuditConfiguration.AuditNotificationTargetConfigurationsProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnAccountAuditConfigurationProps`
 *
 * @param properties - the TypeScript properties of a `CfnAccountAuditConfigurationProps`
 *
 * @returns the result of the validation.
 */
function CfnAccountAuditConfigurationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accountId', cdk.requiredValidator)(properties.accountId));
    errors.collect(cdk.propertyValidator('accountId', cdk.validateString)(properties.accountId));
    errors.collect(cdk.propertyValidator('auditCheckConfigurations', cdk.requiredValidator)(properties.auditCheckConfigurations));
    errors.collect(cdk.propertyValidator('auditCheckConfigurations', CfnAccountAuditConfiguration_AuditCheckConfigurationsPropertyValidator)(properties.auditCheckConfigurations));
    errors.collect(cdk.propertyValidator('auditNotificationTargetConfigurations', CfnAccountAuditConfiguration_AuditNotificationTargetConfigurationsPropertyValidator)(properties.auditNotificationTargetConfigurations));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "CfnAccountAuditConfigurationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::AccountAuditConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CfnAccountAuditConfigurationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::AccountAuditConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnAccountAuditConfigurationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAccountAuditConfigurationPropsValidator(properties).assertSuccess();
    return {
        AccountId: cdk.stringToCloudFormation(properties.accountId),
        AuditCheckConfigurations: cfnAccountAuditConfigurationAuditCheckConfigurationsPropertyToCloudFormation(properties.auditCheckConfigurations),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        AuditNotificationTargetConfigurations: cfnAccountAuditConfigurationAuditNotificationTargetConfigurationsPropertyToCloudFormation(properties.auditNotificationTargetConfigurations),
    };
}

// @ts-ignore TS6133
function CfnAccountAuditConfigurationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAccountAuditConfigurationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAccountAuditConfigurationProps>();
    ret.addPropertyResult('accountId', 'AccountId', cfn_parse.FromCloudFormation.getString(properties.AccountId));
    ret.addPropertyResult('auditCheckConfigurations', 'AuditCheckConfigurations', CfnAccountAuditConfigurationAuditCheckConfigurationsPropertyFromCloudFormation(properties.AuditCheckConfigurations));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('auditNotificationTargetConfigurations', 'AuditNotificationTargetConfigurations', properties.AuditNotificationTargetConfigurations != null ? CfnAccountAuditConfigurationAuditNotificationTargetConfigurationsPropertyFromCloudFormation(properties.AuditNotificationTargetConfigurations) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::AccountAuditConfiguration`
 *
 * Use the `AWS::IoT::AccountAuditConfiguration` resource to configure or reconfigure the Device Defender audit settings for your account. Settings include how audit notifications are sent and which audit checks are enabled or disabled. For API reference, see [UpdateAccountAuditConfiguration](https://docs.aws.amazon.com/iot/latest/apireference/API_UpdateAccountAuditConfiguration.html) and for detailed information on all available audit checks, see [Audit checks](https://docs.aws.amazon.com/iot/latest/developerguide/device-defender-audit-checks.html) .
 *
 * @cloudformationResource AWS::IoT::AccountAuditConfiguration
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-accountauditconfiguration.html
 */
export class CfnAccountAuditConfiguration extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::AccountAuditConfiguration";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAccountAuditConfiguration {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAccountAuditConfigurationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAccountAuditConfiguration(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ID of the account. You can use the expression `!Sub "${AWS::AccountId}"` to use your account ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-accountauditconfiguration.html#cfn-iot-accountauditconfiguration-accountid
     */
    public accountId: string;

    /**
     * Specifies which audit checks are enabled and disabled for this account.
     *
     * Some data collection might start immediately when certain checks are enabled. When a check is disabled, any data collected so far in relation to the check is deleted. To disable a check, set the value of the `Enabled:` key to `false` .
     *
     * If an enabled check is removed from the template, it will also be disabled.
     *
     * You can't disable a check if it's used by any scheduled audit. You must delete the check from the scheduled audit or delete the scheduled audit itself to disable the check.
     *
     * For more information on avialbe auidt checks see [AWS::IoT::AccountAuditConfiguration AuditCheckConfigurations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html)
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-accountauditconfiguration.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations
     */
    public auditCheckConfigurations: CfnAccountAuditConfiguration.AuditCheckConfigurationsProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of the role that grants permission to AWS IoT to access information about your devices, policies, certificates, and other items as required when performing an audit.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-accountauditconfiguration.html#cfn-iot-accountauditconfiguration-rolearn
     */
    public roleArn: string;

    /**
     * Information about the targets to which audit notifications are sent.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-accountauditconfiguration.html#cfn-iot-accountauditconfiguration-auditnotificationtargetconfigurations
     */
    public auditNotificationTargetConfigurations: CfnAccountAuditConfiguration.AuditNotificationTargetConfigurationsProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::IoT::AccountAuditConfiguration`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAccountAuditConfigurationProps) {
        super(scope, id, { type: CfnAccountAuditConfiguration.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'accountId', this);
        cdk.requireProperty(props, 'auditCheckConfigurations', this);
        cdk.requireProperty(props, 'roleArn', this);

        this.accountId = props.accountId;
        this.auditCheckConfigurations = props.auditCheckConfigurations;
        this.roleArn = props.roleArn;
        this.auditNotificationTargetConfigurations = props.auditNotificationTargetConfigurations;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAccountAuditConfiguration.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            accountId: this.accountId,
            auditCheckConfigurations: this.auditCheckConfigurations,
            roleArn: this.roleArn,
            auditNotificationTargetConfigurations: this.auditNotificationTargetConfigurations,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAccountAuditConfigurationPropsToCloudFormation(props);
    }
}

export namespace CfnAccountAuditConfiguration {
    /**
     * Which audit checks are enabled and disabled for this account.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfiguration.html
     */
    export interface AuditCheckConfigurationProperty {
        /**
         * True if this audit check is enabled for this account.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfiguration.html#cfn-iot-accountauditconfiguration-auditcheckconfiguration-enabled
         */
        readonly enabled?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AuditCheckConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `AuditCheckConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    return errors.wrap('supplied properties not correct for "AuditCheckConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::AccountAuditConfiguration.AuditCheckConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `AuditCheckConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::AccountAuditConfiguration.AuditCheckConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
    };
}

// @ts-ignore TS6133
function CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAccountAuditConfiguration.AuditCheckConfigurationProperty>();
    ret.addPropertyResult('enabled', 'Enabled', properties.Enabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enabled) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAccountAuditConfiguration {
    /**
     * The types of audit checks that can be performed.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html
     */
    export interface AuditCheckConfigurationsProperty {
        /**
         * Checks the permissiveness of an authenticated Amazon Cognito identity pool role. For this check, AWS IoT Device Defender audits all Amazon Cognito identity pools that have been used to connect to the AWS IoT message broker during the 31 days before the audit is performed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations-authenticatedcognitoroleoverlypermissivecheck
         */
        readonly authenticatedCognitoRoleOverlyPermissiveCheck?: CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable;
        /**
         * Checks if a CA certificate is expiring. This check applies to CA certificates expiring within 30 days or that have expired.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations-cacertificateexpiringcheck
         */
        readonly caCertificateExpiringCheck?: CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable;
        /**
         * Checks the quality of the CA certificate key. The quality checks if the key is in a valid format, not expired, and if the key meets a minimum required size. This check applies to CA certificates that are `ACTIVE` or `PENDING_TRANSFER` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations-cacertificatekeyqualitycheck
         */
        readonly caCertificateKeyQualityCheck?: CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable;
        /**
         * Checks if multiple devices connect using the same client ID.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations-conflictingclientidscheck
         */
        readonly conflictingClientIdsCheck?: CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable;
        /**
         * Checks if a device certificate is expiring. This check applies to device certificates expiring within 30 days or that have expired.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations-devicecertificateexpiringcheck
         */
        readonly deviceCertificateExpiringCheck?: CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable;
        /**
         * Checks the quality of the device certificate key. The quality checks if the key is in a valid format, not expired, signed by a registered certificate authority, and if the key meets a minimum required size.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations-devicecertificatekeyqualitycheck
         */
        readonly deviceCertificateKeyQualityCheck?: CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable;
        /**
         * Checks if multiple concurrent connections use the same X.509 certificate to authenticate with AWS IoT .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations-devicecertificatesharedcheck
         */
        readonly deviceCertificateSharedCheck?: CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable;
        /**
         * Checks the permissiveness of a policy attached to an authenticated Amazon Cognito identity pool role.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations-iotpolicyoverlypermissivecheck
         */
        readonly iotPolicyOverlyPermissiveCheck?: CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable;
        /**
         * Checks if a role alias has access to services that haven't been used for the AWS IoT device in the last year.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations-iotrolealiasallowsaccesstounusedservicescheck
         */
        readonly iotRoleAliasAllowsAccessToUnusedServicesCheck?: CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable;
        /**
         * Checks if the temporary credentials provided by AWS IoT role aliases are overly permissive.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations-iotrolealiasoverlypermissivecheck
         */
        readonly iotRoleAliasOverlyPermissiveCheck?: CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable;
        /**
         * Checks if AWS IoT logs are disabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations-loggingdisabledcheck
         */
        readonly loggingDisabledCheck?: CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable;
        /**
         * Checks if a revoked CA certificate is still active.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations-revokedcacertificatestillactivecheck
         */
        readonly revokedCaCertificateStillActiveCheck?: CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable;
        /**
         * Checks if a revoked device certificate is still active.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations-revokeddevicecertificatestillactivecheck
         */
        readonly revokedDeviceCertificateStillActiveCheck?: CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable;
        /**
         * Checks if policy attached to an unauthenticated Amazon Cognito identity pool role is too permissive.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditcheckconfigurations.html#cfn-iot-accountauditconfiguration-auditcheckconfigurations-unauthenticatedcognitoroleoverlypermissivecheck
         */
        readonly unauthenticatedCognitoRoleOverlyPermissiveCheck?: CfnAccountAuditConfiguration.AuditCheckConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AuditCheckConfigurationsProperty`
 *
 * @param properties - the TypeScript properties of a `AuditCheckConfigurationsProperty`
 *
 * @returns the result of the validation.
 */
function CfnAccountAuditConfiguration_AuditCheckConfigurationsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('authenticatedCognitoRoleOverlyPermissiveCheck', CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator)(properties.authenticatedCognitoRoleOverlyPermissiveCheck));
    errors.collect(cdk.propertyValidator('caCertificateExpiringCheck', CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator)(properties.caCertificateExpiringCheck));
    errors.collect(cdk.propertyValidator('caCertificateKeyQualityCheck', CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator)(properties.caCertificateKeyQualityCheck));
    errors.collect(cdk.propertyValidator('conflictingClientIdsCheck', CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator)(properties.conflictingClientIdsCheck));
    errors.collect(cdk.propertyValidator('deviceCertificateExpiringCheck', CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator)(properties.deviceCertificateExpiringCheck));
    errors.collect(cdk.propertyValidator('deviceCertificateKeyQualityCheck', CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator)(properties.deviceCertificateKeyQualityCheck));
    errors.collect(cdk.propertyValidator('deviceCertificateSharedCheck', CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator)(properties.deviceCertificateSharedCheck));
    errors.collect(cdk.propertyValidator('iotPolicyOverlyPermissiveCheck', CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator)(properties.iotPolicyOverlyPermissiveCheck));
    errors.collect(cdk.propertyValidator('iotRoleAliasAllowsAccessToUnusedServicesCheck', CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator)(properties.iotRoleAliasAllowsAccessToUnusedServicesCheck));
    errors.collect(cdk.propertyValidator('iotRoleAliasOverlyPermissiveCheck', CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator)(properties.iotRoleAliasOverlyPermissiveCheck));
    errors.collect(cdk.propertyValidator('loggingDisabledCheck', CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator)(properties.loggingDisabledCheck));
    errors.collect(cdk.propertyValidator('revokedCaCertificateStillActiveCheck', CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator)(properties.revokedCaCertificateStillActiveCheck));
    errors.collect(cdk.propertyValidator('revokedDeviceCertificateStillActiveCheck', CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator)(properties.revokedDeviceCertificateStillActiveCheck));
    errors.collect(cdk.propertyValidator('unauthenticatedCognitoRoleOverlyPermissiveCheck', CfnAccountAuditConfiguration_AuditCheckConfigurationPropertyValidator)(properties.unauthenticatedCognitoRoleOverlyPermissiveCheck));
    return errors.wrap('supplied properties not correct for "AuditCheckConfigurationsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::AccountAuditConfiguration.AuditCheckConfigurations` resource
 *
 * @param properties - the TypeScript properties of a `AuditCheckConfigurationsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::AccountAuditConfiguration.AuditCheckConfigurations` resource.
 */
// @ts-ignore TS6133
function cfnAccountAuditConfigurationAuditCheckConfigurationsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAccountAuditConfiguration_AuditCheckConfigurationsPropertyValidator(properties).assertSuccess();
    return {
        AuthenticatedCognitoRoleOverlyPermissiveCheck: cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties.authenticatedCognitoRoleOverlyPermissiveCheck),
        CaCertificateExpiringCheck: cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties.caCertificateExpiringCheck),
        CaCertificateKeyQualityCheck: cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties.caCertificateKeyQualityCheck),
        ConflictingClientIdsCheck: cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties.conflictingClientIdsCheck),
        DeviceCertificateExpiringCheck: cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties.deviceCertificateExpiringCheck),
        DeviceCertificateKeyQualityCheck: cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties.deviceCertificateKeyQualityCheck),
        DeviceCertificateSharedCheck: cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties.deviceCertificateSharedCheck),
        IotPolicyOverlyPermissiveCheck: cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties.iotPolicyOverlyPermissiveCheck),
        IotRoleAliasAllowsAccessToUnusedServicesCheck: cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties.iotRoleAliasAllowsAccessToUnusedServicesCheck),
        IotRoleAliasOverlyPermissiveCheck: cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties.iotRoleAliasOverlyPermissiveCheck),
        LoggingDisabledCheck: cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties.loggingDisabledCheck),
        RevokedCaCertificateStillActiveCheck: cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties.revokedCaCertificateStillActiveCheck),
        RevokedDeviceCertificateStillActiveCheck: cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties.revokedDeviceCertificateStillActiveCheck),
        UnauthenticatedCognitoRoleOverlyPermissiveCheck: cfnAccountAuditConfigurationAuditCheckConfigurationPropertyToCloudFormation(properties.unauthenticatedCognitoRoleOverlyPermissiveCheck),
    };
}

// @ts-ignore TS6133
function CfnAccountAuditConfigurationAuditCheckConfigurationsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAccountAuditConfiguration.AuditCheckConfigurationsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAccountAuditConfiguration.AuditCheckConfigurationsProperty>();
    ret.addPropertyResult('authenticatedCognitoRoleOverlyPermissiveCheck', 'AuthenticatedCognitoRoleOverlyPermissiveCheck', properties.AuthenticatedCognitoRoleOverlyPermissiveCheck != null ? CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties.AuthenticatedCognitoRoleOverlyPermissiveCheck) : undefined);
    ret.addPropertyResult('caCertificateExpiringCheck', 'CaCertificateExpiringCheck', properties.CaCertificateExpiringCheck != null ? CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties.CaCertificateExpiringCheck) : undefined);
    ret.addPropertyResult('caCertificateKeyQualityCheck', 'CaCertificateKeyQualityCheck', properties.CaCertificateKeyQualityCheck != null ? CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties.CaCertificateKeyQualityCheck) : undefined);
    ret.addPropertyResult('conflictingClientIdsCheck', 'ConflictingClientIdsCheck', properties.ConflictingClientIdsCheck != null ? CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties.ConflictingClientIdsCheck) : undefined);
    ret.addPropertyResult('deviceCertificateExpiringCheck', 'DeviceCertificateExpiringCheck', properties.DeviceCertificateExpiringCheck != null ? CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties.DeviceCertificateExpiringCheck) : undefined);
    ret.addPropertyResult('deviceCertificateKeyQualityCheck', 'DeviceCertificateKeyQualityCheck', properties.DeviceCertificateKeyQualityCheck != null ? CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties.DeviceCertificateKeyQualityCheck) : undefined);
    ret.addPropertyResult('deviceCertificateSharedCheck', 'DeviceCertificateSharedCheck', properties.DeviceCertificateSharedCheck != null ? CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties.DeviceCertificateSharedCheck) : undefined);
    ret.addPropertyResult('iotPolicyOverlyPermissiveCheck', 'IotPolicyOverlyPermissiveCheck', properties.IotPolicyOverlyPermissiveCheck != null ? CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties.IotPolicyOverlyPermissiveCheck) : undefined);
    ret.addPropertyResult('iotRoleAliasAllowsAccessToUnusedServicesCheck', 'IotRoleAliasAllowsAccessToUnusedServicesCheck', properties.IotRoleAliasAllowsAccessToUnusedServicesCheck != null ? CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties.IotRoleAliasAllowsAccessToUnusedServicesCheck) : undefined);
    ret.addPropertyResult('iotRoleAliasOverlyPermissiveCheck', 'IotRoleAliasOverlyPermissiveCheck', properties.IotRoleAliasOverlyPermissiveCheck != null ? CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties.IotRoleAliasOverlyPermissiveCheck) : undefined);
    ret.addPropertyResult('loggingDisabledCheck', 'LoggingDisabledCheck', properties.LoggingDisabledCheck != null ? CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties.LoggingDisabledCheck) : undefined);
    ret.addPropertyResult('revokedCaCertificateStillActiveCheck', 'RevokedCaCertificateStillActiveCheck', properties.RevokedCaCertificateStillActiveCheck != null ? CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties.RevokedCaCertificateStillActiveCheck) : undefined);
    ret.addPropertyResult('revokedDeviceCertificateStillActiveCheck', 'RevokedDeviceCertificateStillActiveCheck', properties.RevokedDeviceCertificateStillActiveCheck != null ? CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties.RevokedDeviceCertificateStillActiveCheck) : undefined);
    ret.addPropertyResult('unauthenticatedCognitoRoleOverlyPermissiveCheck', 'UnauthenticatedCognitoRoleOverlyPermissiveCheck', properties.UnauthenticatedCognitoRoleOverlyPermissiveCheck != null ? CfnAccountAuditConfigurationAuditCheckConfigurationPropertyFromCloudFormation(properties.UnauthenticatedCognitoRoleOverlyPermissiveCheck) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAccountAuditConfiguration {
    /**
     * Information about the targets to which audit notifications are sent.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditnotificationtarget.html
     */
    export interface AuditNotificationTargetProperty {
        /**
         * True if notifications to the target are enabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditnotificationtarget.html#cfn-iot-accountauditconfiguration-auditnotificationtarget-enabled
         */
        readonly enabled?: boolean | cdk.IResolvable;
        /**
         * The ARN of the role that grants permission to send notifications to the target.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditnotificationtarget.html#cfn-iot-accountauditconfiguration-auditnotificationtarget-rolearn
         */
        readonly roleArn?: string;
        /**
         * The ARN of the target (SNS topic) to which audit notifications are sent.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditnotificationtarget.html#cfn-iot-accountauditconfiguration-auditnotificationtarget-targetarn
         */
        readonly targetArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AuditNotificationTargetProperty`
 *
 * @param properties - the TypeScript properties of a `AuditNotificationTargetProperty`
 *
 * @returns the result of the validation.
 */
function CfnAccountAuditConfiguration_AuditNotificationTargetPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('targetArn', cdk.validateString)(properties.targetArn));
    return errors.wrap('supplied properties not correct for "AuditNotificationTargetProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::AccountAuditConfiguration.AuditNotificationTarget` resource
 *
 * @param properties - the TypeScript properties of a `AuditNotificationTargetProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::AccountAuditConfiguration.AuditNotificationTarget` resource.
 */
// @ts-ignore TS6133
function cfnAccountAuditConfigurationAuditNotificationTargetPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAccountAuditConfiguration_AuditNotificationTargetPropertyValidator(properties).assertSuccess();
    return {
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        TargetArn: cdk.stringToCloudFormation(properties.targetArn),
    };
}

// @ts-ignore TS6133
function CfnAccountAuditConfigurationAuditNotificationTargetPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAccountAuditConfiguration.AuditNotificationTargetProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAccountAuditConfiguration.AuditNotificationTargetProperty>();
    ret.addPropertyResult('enabled', 'Enabled', properties.Enabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enabled) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', properties.RoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.RoleArn) : undefined);
    ret.addPropertyResult('targetArn', 'TargetArn', properties.TargetArn != null ? cfn_parse.FromCloudFormation.getString(properties.TargetArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAccountAuditConfiguration {
    /**
     * The configuration of the audit notification target.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditnotificationtargetconfigurations.html
     */
    export interface AuditNotificationTargetConfigurationsProperty {
        /**
         * The `Sns` notification target.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-accountauditconfiguration-auditnotificationtargetconfigurations.html#cfn-iot-accountauditconfiguration-auditnotificationtargetconfigurations-sns
         */
        readonly sns?: CfnAccountAuditConfiguration.AuditNotificationTargetProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AuditNotificationTargetConfigurationsProperty`
 *
 * @param properties - the TypeScript properties of a `AuditNotificationTargetConfigurationsProperty`
 *
 * @returns the result of the validation.
 */
function CfnAccountAuditConfiguration_AuditNotificationTargetConfigurationsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('sns', CfnAccountAuditConfiguration_AuditNotificationTargetPropertyValidator)(properties.sns));
    return errors.wrap('supplied properties not correct for "AuditNotificationTargetConfigurationsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::AccountAuditConfiguration.AuditNotificationTargetConfigurations` resource
 *
 * @param properties - the TypeScript properties of a `AuditNotificationTargetConfigurationsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::AccountAuditConfiguration.AuditNotificationTargetConfigurations` resource.
 */
// @ts-ignore TS6133
function cfnAccountAuditConfigurationAuditNotificationTargetConfigurationsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAccountAuditConfiguration_AuditNotificationTargetConfigurationsPropertyValidator(properties).assertSuccess();
    return {
        Sns: cfnAccountAuditConfigurationAuditNotificationTargetPropertyToCloudFormation(properties.sns),
    };
}

// @ts-ignore TS6133
function CfnAccountAuditConfigurationAuditNotificationTargetConfigurationsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAccountAuditConfiguration.AuditNotificationTargetConfigurationsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAccountAuditConfiguration.AuditNotificationTargetConfigurationsProperty>();
    ret.addPropertyResult('sns', 'Sns', properties.Sns != null ? CfnAccountAuditConfigurationAuditNotificationTargetPropertyFromCloudFormation(properties.Sns) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnAuthorizer`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html
 */
export interface CfnAuthorizerProps {

    /**
     * The authorizer's Lambda function ARN.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-authorizerfunctionarn
     */
    readonly authorizerFunctionArn: string;

    /**
     * The authorizer name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-authorizername
     */
    readonly authorizerName?: string;

    /**
     * `AWS::IoT::Authorizer.EnableCachingForHttp`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-enablecachingforhttp
     */
    readonly enableCachingForHttp?: boolean | cdk.IResolvable;

    /**
     * Specifies whether AWS IoT validates the token signature in an authorization request.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-signingdisabled
     */
    readonly signingDisabled?: boolean | cdk.IResolvable;

    /**
     * The status of the authorizer.
     *
     * Valid values: `ACTIVE` | `INACTIVE`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-status
     */
    readonly status?: string;

    /**
     * Metadata which can be used to manage the custom authorizer.
     *
     * > For URI Request parameters use format: ...key1=value1&key2=value2...
     * >
     * > For the CLI command-line parameter use format: &&tags "key1=value1&key2=value2..."
     * >
     * > For the cli-input-json file use format: "tags": "key1=value1&key2=value2..."
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The key used to extract the token from the HTTP headers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-tokenkeyname
     */
    readonly tokenKeyName?: string;

    /**
     * The public keys used to validate the token signature returned by your custom authentication service.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-tokensigningpublickeys
     */
    readonly tokenSigningPublicKeys?: { [key: string]: (string) } | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnAuthorizerProps`
 *
 * @param properties - the TypeScript properties of a `CfnAuthorizerProps`
 *
 * @returns the result of the validation.
 */
function CfnAuthorizerPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('authorizerFunctionArn', cdk.requiredValidator)(properties.authorizerFunctionArn));
    errors.collect(cdk.propertyValidator('authorizerFunctionArn', cdk.validateString)(properties.authorizerFunctionArn));
    errors.collect(cdk.propertyValidator('authorizerName', cdk.validateString)(properties.authorizerName));
    errors.collect(cdk.propertyValidator('enableCachingForHttp', cdk.validateBoolean)(properties.enableCachingForHttp));
    errors.collect(cdk.propertyValidator('signingDisabled', cdk.validateBoolean)(properties.signingDisabled));
    errors.collect(cdk.propertyValidator('status', cdk.validateString)(properties.status));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('tokenKeyName', cdk.validateString)(properties.tokenKeyName));
    errors.collect(cdk.propertyValidator('tokenSigningPublicKeys', cdk.hashValidator(cdk.validateString))(properties.tokenSigningPublicKeys));
    return errors.wrap('supplied properties not correct for "CfnAuthorizerProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::Authorizer` resource
 *
 * @param properties - the TypeScript properties of a `CfnAuthorizerProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::Authorizer` resource.
 */
// @ts-ignore TS6133
function cfnAuthorizerPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAuthorizerPropsValidator(properties).assertSuccess();
    return {
        AuthorizerFunctionArn: cdk.stringToCloudFormation(properties.authorizerFunctionArn),
        AuthorizerName: cdk.stringToCloudFormation(properties.authorizerName),
        EnableCachingForHttp: cdk.booleanToCloudFormation(properties.enableCachingForHttp),
        SigningDisabled: cdk.booleanToCloudFormation(properties.signingDisabled),
        Status: cdk.stringToCloudFormation(properties.status),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        TokenKeyName: cdk.stringToCloudFormation(properties.tokenKeyName),
        TokenSigningPublicKeys: cdk.hashMapper(cdk.stringToCloudFormation)(properties.tokenSigningPublicKeys),
    };
}

// @ts-ignore TS6133
function CfnAuthorizerPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAuthorizerProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAuthorizerProps>();
    ret.addPropertyResult('authorizerFunctionArn', 'AuthorizerFunctionArn', cfn_parse.FromCloudFormation.getString(properties.AuthorizerFunctionArn));
    ret.addPropertyResult('authorizerName', 'AuthorizerName', properties.AuthorizerName != null ? cfn_parse.FromCloudFormation.getString(properties.AuthorizerName) : undefined);
    ret.addPropertyResult('enableCachingForHttp', 'EnableCachingForHttp', properties.EnableCachingForHttp != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableCachingForHttp) : undefined);
    ret.addPropertyResult('signingDisabled', 'SigningDisabled', properties.SigningDisabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.SigningDisabled) : undefined);
    ret.addPropertyResult('status', 'Status', properties.Status != null ? cfn_parse.FromCloudFormation.getString(properties.Status) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('tokenKeyName', 'TokenKeyName', properties.TokenKeyName != null ? cfn_parse.FromCloudFormation.getString(properties.TokenKeyName) : undefined);
    ret.addPropertyResult('tokenSigningPublicKeys', 'TokenSigningPublicKeys', properties.TokenSigningPublicKeys != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.TokenSigningPublicKeys) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::Authorizer`
 *
 * Specifies an authorizer.
 *
 * @cloudformationResource AWS::IoT::Authorizer
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html
 */
export class CfnAuthorizer extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::Authorizer";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAuthorizer {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAuthorizerPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAuthorizer(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the authorizer.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The authorizer's Lambda function ARN.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-authorizerfunctionarn
     */
    public authorizerFunctionArn: string;

    /**
     * The authorizer name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-authorizername
     */
    public authorizerName: string | undefined;

    /**
     * `AWS::IoT::Authorizer.EnableCachingForHttp`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-enablecachingforhttp
     */
    public enableCachingForHttp: boolean | cdk.IResolvable | undefined;

    /**
     * Specifies whether AWS IoT validates the token signature in an authorization request.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-signingdisabled
     */
    public signingDisabled: boolean | cdk.IResolvable | undefined;

    /**
     * The status of the authorizer.
     *
     * Valid values: `ACTIVE` | `INACTIVE`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-status
     */
    public status: string | undefined;

    /**
     * Metadata which can be used to manage the custom authorizer.
     *
     * > For URI Request parameters use format: ...key1=value1&key2=value2...
     * >
     * > For the CLI command-line parameter use format: &&tags "key1=value1&key2=value2..."
     * >
     * > For the cli-input-json file use format: "tags": "key1=value1&key2=value2..."
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The key used to extract the token from the HTTP headers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-tokenkeyname
     */
    public tokenKeyName: string | undefined;

    /**
     * The public keys used to validate the token signature returned by your custom authentication service.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-authorizer.html#cfn-iot-authorizer-tokensigningpublickeys
     */
    public tokenSigningPublicKeys: { [key: string]: (string) } | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::IoT::Authorizer`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAuthorizerProps) {
        super(scope, id, { type: CfnAuthorizer.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'authorizerFunctionArn', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.authorizerFunctionArn = props.authorizerFunctionArn;
        this.authorizerName = props.authorizerName;
        this.enableCachingForHttp = props.enableCachingForHttp;
        this.signingDisabled = props.signingDisabled;
        this.status = props.status;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IoT::Authorizer", props.tags, { tagPropertyName: 'tags' });
        this.tokenKeyName = props.tokenKeyName;
        this.tokenSigningPublicKeys = props.tokenSigningPublicKeys;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAuthorizer.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            authorizerFunctionArn: this.authorizerFunctionArn,
            authorizerName: this.authorizerName,
            enableCachingForHttp: this.enableCachingForHttp,
            signingDisabled: this.signingDisabled,
            status: this.status,
            tags: this.tags.renderTags(),
            tokenKeyName: this.tokenKeyName,
            tokenSigningPublicKeys: this.tokenSigningPublicKeys,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAuthorizerPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnCertificate`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-certificate.html
 */
export interface CfnCertificateProps {

    /**
     * The status of the certificate.
     *
     * Valid values are ACTIVE, INACTIVE, REVOKED, PENDING_TRANSFER, and PENDING_ACTIVATION.
     *
     * The status value REGISTER_INACTIVE is deprecated and should not be used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-certificate.html#cfn-iot-certificate-status
     */
    readonly status: string;

    /**
     * The CA certificate used to sign the device certificate being registered, not available when CertificateMode is SNI_ONLY.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-certificate.html#cfn-iot-certificate-cacertificatepem
     */
    readonly caCertificatePem?: string;

    /**
     * Specifies which mode of certificate registration to use with this resource. Valid options are DEFAULT with CaCertificatePem and CertificatePem, SNI_ONLY with CertificatePem, and Default with CertificateSigningRequest.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-certificate.html#cfn-iot-certificate-certificatemode
     */
    readonly certificateMode?: string;

    /**
     * The certificate data in PEM format. Requires SNI_ONLY for the certificate mode or the accompanying CACertificatePem for registration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-certificate.html#cfn-iot-certificate-certificatepem
     */
    readonly certificatePem?: string;

    /**
     * The certificate signing request (CSR).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-certificate.html#cfn-iot-certificate-certificatesigningrequest
     */
    readonly certificateSigningRequest?: string;
}

/**
 * Determine whether the given properties match those of a `CfnCertificateProps`
 *
 * @param properties - the TypeScript properties of a `CfnCertificateProps`
 *
 * @returns the result of the validation.
 */
function CfnCertificatePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('caCertificatePem', cdk.validateString)(properties.caCertificatePem));
    errors.collect(cdk.propertyValidator('certificateMode', cdk.validateString)(properties.certificateMode));
    errors.collect(cdk.propertyValidator('certificatePem', cdk.validateString)(properties.certificatePem));
    errors.collect(cdk.propertyValidator('certificateSigningRequest', cdk.validateString)(properties.certificateSigningRequest));
    errors.collect(cdk.propertyValidator('status', cdk.requiredValidator)(properties.status));
    errors.collect(cdk.propertyValidator('status', cdk.validateString)(properties.status));
    return errors.wrap('supplied properties not correct for "CfnCertificateProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::Certificate` resource
 *
 * @param properties - the TypeScript properties of a `CfnCertificateProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::Certificate` resource.
 */
// @ts-ignore TS6133
function cfnCertificatePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCertificatePropsValidator(properties).assertSuccess();
    return {
        Status: cdk.stringToCloudFormation(properties.status),
        CACertificatePem: cdk.stringToCloudFormation(properties.caCertificatePem),
        CertificateMode: cdk.stringToCloudFormation(properties.certificateMode),
        CertificatePem: cdk.stringToCloudFormation(properties.certificatePem),
        CertificateSigningRequest: cdk.stringToCloudFormation(properties.certificateSigningRequest),
    };
}

// @ts-ignore TS6133
function CfnCertificatePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCertificateProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCertificateProps>();
    ret.addPropertyResult('status', 'Status', cfn_parse.FromCloudFormation.getString(properties.Status));
    ret.addPropertyResult('caCertificatePem', 'CACertificatePem', properties.CACertificatePem != null ? cfn_parse.FromCloudFormation.getString(properties.CACertificatePem) : undefined);
    ret.addPropertyResult('certificateMode', 'CertificateMode', properties.CertificateMode != null ? cfn_parse.FromCloudFormation.getString(properties.CertificateMode) : undefined);
    ret.addPropertyResult('certificatePem', 'CertificatePem', properties.CertificatePem != null ? cfn_parse.FromCloudFormation.getString(properties.CertificatePem) : undefined);
    ret.addPropertyResult('certificateSigningRequest', 'CertificateSigningRequest', properties.CertificateSigningRequest != null ? cfn_parse.FromCloudFormation.getString(properties.CertificateSigningRequest) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::Certificate`
 *
 * Use the `AWS::IoT::Certificate` resource to declare an AWS IoT X.509 certificate. For information about working with X.509 certificates, see [X.509 Client Certificates](https://docs.aws.amazon.com/iot/latest/developerguide/x509-client-certs.html) in the *AWS IoT Developer Guide* .
 *
 * @cloudformationResource AWS::IoT::Certificate
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-certificate.html
 */
export class CfnCertificate extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::Certificate";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnCertificate {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnCertificatePropsFromCloudFormation(resourceProperties);
        const ret = new CfnCertificate(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Returns the Amazon Resource Name (ARN) for the instance profile. For example:
     *
     * `{ "Fn::GetAtt": ["MyCertificate", "Arn"] }`
     *
     * A value similar to the following is returned:
     *
     * `arn:aws:iot:ap-southeast-2:123456789012:cert/a1234567b89c012d3e4fg567hij8k9l01mno1p23q45678901rs234567890t1u2`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The certificate ID.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The status of the certificate.
     *
     * Valid values are ACTIVE, INACTIVE, REVOKED, PENDING_TRANSFER, and PENDING_ACTIVATION.
     *
     * The status value REGISTER_INACTIVE is deprecated and should not be used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-certificate.html#cfn-iot-certificate-status
     */
    public status: string;

    /**
     * The CA certificate used to sign the device certificate being registered, not available when CertificateMode is SNI_ONLY.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-certificate.html#cfn-iot-certificate-cacertificatepem
     */
    public caCertificatePem: string | undefined;

    /**
     * Specifies which mode of certificate registration to use with this resource. Valid options are DEFAULT with CaCertificatePem and CertificatePem, SNI_ONLY with CertificatePem, and Default with CertificateSigningRequest.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-certificate.html#cfn-iot-certificate-certificatemode
     */
    public certificateMode: string | undefined;

    /**
     * The certificate data in PEM format. Requires SNI_ONLY for the certificate mode or the accompanying CACertificatePem for registration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-certificate.html#cfn-iot-certificate-certificatepem
     */
    public certificatePem: string | undefined;

    /**
     * The certificate signing request (CSR).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-certificate.html#cfn-iot-certificate-certificatesigningrequest
     */
    public certificateSigningRequest: string | undefined;

    /**
     * Create a new `AWS::IoT::Certificate`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnCertificateProps) {
        super(scope, id, { type: CfnCertificate.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'status', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.status = props.status;
        this.caCertificatePem = props.caCertificatePem;
        this.certificateMode = props.certificateMode;
        this.certificatePem = props.certificatePem;
        this.certificateSigningRequest = props.certificateSigningRequest;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnCertificate.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            status: this.status,
            caCertificatePem: this.caCertificatePem,
            certificateMode: this.certificateMode,
            certificatePem: this.certificatePem,
            certificateSigningRequest: this.certificateSigningRequest,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnCertificatePropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnCustomMetric`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-custommetric.html
 */
export interface CfnCustomMetricProps {

    /**
     * The type of the custom metric. Types include `string-list` , `ip-address-list` , `number-list` , and `number` .
     *
     * > The type `number` only takes a single metric value as an input, but when you submit the metrics value in the DeviceMetrics report, you must pass it as an array with a single value.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-custommetric.html#cfn-iot-custommetric-metrictype
     */
    readonly metricType: string;

    /**
     * The friendly name in the console for the custom metric. This name doesn't have to be unique. Don't use this name as the metric identifier in the device metric report. You can update the friendly name after you define it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-custommetric.html#cfn-iot-custommetric-displayname
     */
    readonly displayName?: string;

    /**
     * The name of the custom metric. This will be used in the metric report submitted from the device/thing. The name can't begin with `aws:` . You can’t change the name after you define it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-custommetric.html#cfn-iot-custommetric-metricname
     */
    readonly metricName?: string;

    /**
     * Metadata that can be used to manage the custom metric.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-custommetric.html#cfn-iot-custommetric-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnCustomMetricProps`
 *
 * @param properties - the TypeScript properties of a `CfnCustomMetricProps`
 *
 * @returns the result of the validation.
 */
function CfnCustomMetricPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('displayName', cdk.validateString)(properties.displayName));
    errors.collect(cdk.propertyValidator('metricName', cdk.validateString)(properties.metricName));
    errors.collect(cdk.propertyValidator('metricType', cdk.requiredValidator)(properties.metricType));
    errors.collect(cdk.propertyValidator('metricType', cdk.validateString)(properties.metricType));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnCustomMetricProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::CustomMetric` resource
 *
 * @param properties - the TypeScript properties of a `CfnCustomMetricProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::CustomMetric` resource.
 */
// @ts-ignore TS6133
function cfnCustomMetricPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCustomMetricPropsValidator(properties).assertSuccess();
    return {
        MetricType: cdk.stringToCloudFormation(properties.metricType),
        DisplayName: cdk.stringToCloudFormation(properties.displayName),
        MetricName: cdk.stringToCloudFormation(properties.metricName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnCustomMetricPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCustomMetricProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCustomMetricProps>();
    ret.addPropertyResult('metricType', 'MetricType', cfn_parse.FromCloudFormation.getString(properties.MetricType));
    ret.addPropertyResult('displayName', 'DisplayName', properties.DisplayName != null ? cfn_parse.FromCloudFormation.getString(properties.DisplayName) : undefined);
    ret.addPropertyResult('metricName', 'MetricName', properties.MetricName != null ? cfn_parse.FromCloudFormation.getString(properties.MetricName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::CustomMetric`
 *
 * Use the `AWS::IoT::CustomMetric` resource to define a custom metric published by your devices to Device Defender. For API reference, see [CreateCustomMetric](https://docs.aws.amazon.com/iot/latest/apireference/API_CreateCustomMetric.html) and for general information, see [Custom metrics](https://docs.aws.amazon.com/iot/latest/developerguide/dd-detect-custom-metrics.html) .
 *
 * @cloudformationResource AWS::IoT::CustomMetric
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-custommetric.html
 */
export class CfnCustomMetric extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::CustomMetric";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnCustomMetric {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnCustomMetricPropsFromCloudFormation(resourceProperties);
        const ret = new CfnCustomMetric(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Number (ARN) of the custom metric; for example, `arn: *aws-partition* :iot: *region* : *accountId* :custommetric/ *metricName*` .
     * @cloudformationAttribute MetricArn
     */
    public readonly attrMetricArn: string;

    /**
     * The type of the custom metric. Types include `string-list` , `ip-address-list` , `number-list` , and `number` .
     *
     * > The type `number` only takes a single metric value as an input, but when you submit the metrics value in the DeviceMetrics report, you must pass it as an array with a single value.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-custommetric.html#cfn-iot-custommetric-metrictype
     */
    public metricType: string;

    /**
     * The friendly name in the console for the custom metric. This name doesn't have to be unique. Don't use this name as the metric identifier in the device metric report. You can update the friendly name after you define it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-custommetric.html#cfn-iot-custommetric-displayname
     */
    public displayName: string | undefined;

    /**
     * The name of the custom metric. This will be used in the metric report submitted from the device/thing. The name can't begin with `aws:` . You can’t change the name after you define it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-custommetric.html#cfn-iot-custommetric-metricname
     */
    public metricName: string | undefined;

    /**
     * Metadata that can be used to manage the custom metric.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-custommetric.html#cfn-iot-custommetric-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::IoT::CustomMetric`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnCustomMetricProps) {
        super(scope, id, { type: CfnCustomMetric.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'metricType', this);
        this.attrMetricArn = cdk.Token.asString(this.getAtt('MetricArn'));

        this.metricType = props.metricType;
        this.displayName = props.displayName;
        this.metricName = props.metricName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IoT::CustomMetric", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnCustomMetric.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            metricType: this.metricType,
            displayName: this.displayName,
            metricName: this.metricName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnCustomMetricPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnDimension`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-dimension.html
 */
export interface CfnDimensionProps {

    /**
     * Specifies the value or list of values for the dimension. For `TOPIC_FILTER` dimensions, this is a pattern used to match the MQTT topic (for example, "admin/#").
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-dimension.html#cfn-iot-dimension-stringvalues
     */
    readonly stringValues: string[];

    /**
     * Specifies the type of dimension. Supported types: `TOPIC_FILTER.`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-dimension.html#cfn-iot-dimension-type
     */
    readonly type: string;

    /**
     * A unique identifier for the dimension.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-dimension.html#cfn-iot-dimension-name
     */
    readonly name?: string;

    /**
     * Metadata that can be used to manage the dimension.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-dimension.html#cfn-iot-dimension-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnDimensionProps`
 *
 * @param properties - the TypeScript properties of a `CfnDimensionProps`
 *
 * @returns the result of the validation.
 */
function CfnDimensionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('stringValues', cdk.requiredValidator)(properties.stringValues));
    errors.collect(cdk.propertyValidator('stringValues', cdk.listValidator(cdk.validateString))(properties.stringValues));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "CfnDimensionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::Dimension` resource
 *
 * @param properties - the TypeScript properties of a `CfnDimensionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::Dimension` resource.
 */
// @ts-ignore TS6133
function cfnDimensionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDimensionPropsValidator(properties).assertSuccess();
    return {
        StringValues: cdk.listMapper(cdk.stringToCloudFormation)(properties.stringValues),
        Type: cdk.stringToCloudFormation(properties.type),
        Name: cdk.stringToCloudFormation(properties.name),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDimensionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDimensionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDimensionProps>();
    ret.addPropertyResult('stringValues', 'StringValues', cfn_parse.FromCloudFormation.getStringArray(properties.StringValues));
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::Dimension`
 *
 * Use the `AWS::IoT::Dimension` to limit the scope of a metric used in a security profile for AWS IoT Device Defender . For example, using a `TOPIC_FILTER` dimension, you can narrow down the scope of the metric to only MQTT topics where the name matches the pattern specified in the dimension. For API reference, see [CreateDimension](https://docs.aws.amazon.com/iot/latest/apireference/API_CreateDimension.html) and for general information, see [Scoping metrics in security profiles using dimensions](https://docs.aws.amazon.com/iot/latest/developerguide/scoping-security-behavior.html) .
 *
 * @cloudformationResource AWS::IoT::Dimension
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-dimension.html
 */
export class CfnDimension extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::Dimension";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDimension {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDimensionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDimension(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the dimension.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * Specifies the value or list of values for the dimension. For `TOPIC_FILTER` dimensions, this is a pattern used to match the MQTT topic (for example, "admin/#").
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-dimension.html#cfn-iot-dimension-stringvalues
     */
    public stringValues: string[];

    /**
     * Specifies the type of dimension. Supported types: `TOPIC_FILTER.`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-dimension.html#cfn-iot-dimension-type
     */
    public type: string;

    /**
     * A unique identifier for the dimension.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-dimension.html#cfn-iot-dimension-name
     */
    public name: string | undefined;

    /**
     * Metadata that can be used to manage the dimension.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-dimension.html#cfn-iot-dimension-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::IoT::Dimension`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDimensionProps) {
        super(scope, id, { type: CfnDimension.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'stringValues', this);
        cdk.requireProperty(props, 'type', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.stringValues = props.stringValues;
        this.type = props.type;
        this.name = props.name;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IoT::Dimension", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDimension.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            stringValues: this.stringValues,
            type: this.type,
            name: this.name,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDimensionPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnDomainConfiguration`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html
 */
export interface CfnDomainConfigurationProps {

    /**
     * An object that specifies the authorization service for a domain.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-authorizerconfig
     */
    readonly authorizerConfig?: CfnDomainConfiguration.AuthorizerConfigProperty | cdk.IResolvable;

    /**
     * The name of the domain configuration. This value must be unique to a region.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-domainconfigurationname
     */
    readonly domainConfigurationName?: string;

    /**
     * The status to which the domain configuration should be updated.
     *
     * Valid values: `ENABLED` | `DISABLED`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-domainconfigurationstatus
     */
    readonly domainConfigurationStatus?: string;

    /**
     * The name of the domain.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-domainname
     */
    readonly domainName?: string;

    /**
     * The ARNs of the certificates that AWS IoT passes to the device during the TLS handshake. Currently you can specify only one certificate ARN. This value is not required for AWS -managed domains.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-servercertificatearns
     */
    readonly serverCertificateArns?: string[];

    /**
     * The type of service delivered by the endpoint.
     *
     * > AWS IoT Core currently supports only the `DATA` service type.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-servicetype
     */
    readonly serviceType?: string;

    /**
     * Metadata which can be used to manage the domain configuration.
     *
     * > For URI Request parameters use format: ...key1=value1&key2=value2...
     * >
     * > For the CLI command-line parameter use format: &&tags "key1=value1&key2=value2..."
     * >
     * > For the cli-input-json file use format: "tags": "key1=value1&key2=value2..."
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The certificate used to validate the server certificate and prove domain name ownership. This certificate must be signed by a public certificate authority. This value is not required for AWS -managed domains.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-validationcertificatearn
     */
    readonly validationCertificateArn?: string;
}

/**
 * Determine whether the given properties match those of a `CfnDomainConfigurationProps`
 *
 * @param properties - the TypeScript properties of a `CfnDomainConfigurationProps`
 *
 * @returns the result of the validation.
 */
function CfnDomainConfigurationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('authorizerConfig', CfnDomainConfiguration_AuthorizerConfigPropertyValidator)(properties.authorizerConfig));
    errors.collect(cdk.propertyValidator('domainConfigurationName', cdk.validateString)(properties.domainConfigurationName));
    errors.collect(cdk.propertyValidator('domainConfigurationStatus', cdk.validateString)(properties.domainConfigurationStatus));
    errors.collect(cdk.propertyValidator('domainName', cdk.validateString)(properties.domainName));
    errors.collect(cdk.propertyValidator('serverCertificateArns', cdk.listValidator(cdk.validateString))(properties.serverCertificateArns));
    errors.collect(cdk.propertyValidator('serviceType', cdk.validateString)(properties.serviceType));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('validationCertificateArn', cdk.validateString)(properties.validationCertificateArn));
    return errors.wrap('supplied properties not correct for "CfnDomainConfigurationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::DomainConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CfnDomainConfigurationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::DomainConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDomainConfigurationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomainConfigurationPropsValidator(properties).assertSuccess();
    return {
        AuthorizerConfig: cfnDomainConfigurationAuthorizerConfigPropertyToCloudFormation(properties.authorizerConfig),
        DomainConfigurationName: cdk.stringToCloudFormation(properties.domainConfigurationName),
        DomainConfigurationStatus: cdk.stringToCloudFormation(properties.domainConfigurationStatus),
        DomainName: cdk.stringToCloudFormation(properties.domainName),
        ServerCertificateArns: cdk.listMapper(cdk.stringToCloudFormation)(properties.serverCertificateArns),
        ServiceType: cdk.stringToCloudFormation(properties.serviceType),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        ValidationCertificateArn: cdk.stringToCloudFormation(properties.validationCertificateArn),
    };
}

// @ts-ignore TS6133
function CfnDomainConfigurationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomainConfigurationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomainConfigurationProps>();
    ret.addPropertyResult('authorizerConfig', 'AuthorizerConfig', properties.AuthorizerConfig != null ? CfnDomainConfigurationAuthorizerConfigPropertyFromCloudFormation(properties.AuthorizerConfig) : undefined);
    ret.addPropertyResult('domainConfigurationName', 'DomainConfigurationName', properties.DomainConfigurationName != null ? cfn_parse.FromCloudFormation.getString(properties.DomainConfigurationName) : undefined);
    ret.addPropertyResult('domainConfigurationStatus', 'DomainConfigurationStatus', properties.DomainConfigurationStatus != null ? cfn_parse.FromCloudFormation.getString(properties.DomainConfigurationStatus) : undefined);
    ret.addPropertyResult('domainName', 'DomainName', properties.DomainName != null ? cfn_parse.FromCloudFormation.getString(properties.DomainName) : undefined);
    ret.addPropertyResult('serverCertificateArns', 'ServerCertificateArns', properties.ServerCertificateArns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ServerCertificateArns) : undefined);
    ret.addPropertyResult('serviceType', 'ServiceType', properties.ServiceType != null ? cfn_parse.FromCloudFormation.getString(properties.ServiceType) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('validationCertificateArn', 'ValidationCertificateArn', properties.ValidationCertificateArn != null ? cfn_parse.FromCloudFormation.getString(properties.ValidationCertificateArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::DomainConfiguration`
 *
 * Specifies a domain configuration.
 *
 * @cloudformationResource AWS::IoT::DomainConfiguration
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html
 */
export class CfnDomainConfiguration extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::DomainConfiguration";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDomainConfiguration {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDomainConfigurationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDomainConfiguration(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the domain configuration.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The type of service delivered by the domain.
     * @cloudformationAttribute DomainType
     */
    public readonly attrDomainType: string;

    /**
     * The ARNs of the certificates that AWS IoT passes to the device during the TLS handshake. Currently you can specify only one certificate ARN. This value is not required for AWS -managed domains.
     * @cloudformationAttribute ServerCertificates
     */
    public readonly attrServerCertificates: cdk.IResolvable;

    /**
     * An object that specifies the authorization service for a domain.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-authorizerconfig
     */
    public authorizerConfig: CfnDomainConfiguration.AuthorizerConfigProperty | cdk.IResolvable | undefined;

    /**
     * The name of the domain configuration. This value must be unique to a region.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-domainconfigurationname
     */
    public domainConfigurationName: string | undefined;

    /**
     * The status to which the domain configuration should be updated.
     *
     * Valid values: `ENABLED` | `DISABLED`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-domainconfigurationstatus
     */
    public domainConfigurationStatus: string | undefined;

    /**
     * The name of the domain.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-domainname
     */
    public domainName: string | undefined;

    /**
     * The ARNs of the certificates that AWS IoT passes to the device during the TLS handshake. Currently you can specify only one certificate ARN. This value is not required for AWS -managed domains.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-servercertificatearns
     */
    public serverCertificateArns: string[] | undefined;

    /**
     * The type of service delivered by the endpoint.
     *
     * > AWS IoT Core currently supports only the `DATA` service type.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-servicetype
     */
    public serviceType: string | undefined;

    /**
     * Metadata which can be used to manage the domain configuration.
     *
     * > For URI Request parameters use format: ...key1=value1&key2=value2...
     * >
     * > For the CLI command-line parameter use format: &&tags "key1=value1&key2=value2..."
     * >
     * > For the cli-input-json file use format: "tags": "key1=value1&key2=value2..."
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The certificate used to validate the server certificate and prove domain name ownership. This certificate must be signed by a public certificate authority. This value is not required for AWS -managed domains.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html#cfn-iot-domainconfiguration-validationcertificatearn
     */
    public validationCertificateArn: string | undefined;

    /**
     * Create a new `AWS::IoT::DomainConfiguration`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDomainConfigurationProps = {}) {
        super(scope, id, { type: CfnDomainConfiguration.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrDomainType = cdk.Token.asString(this.getAtt('DomainType'));
        this.attrServerCertificates = this.getAtt('ServerCertificates');

        this.authorizerConfig = props.authorizerConfig;
        this.domainConfigurationName = props.domainConfigurationName;
        this.domainConfigurationStatus = props.domainConfigurationStatus;
        this.domainName = props.domainName;
        this.serverCertificateArns = props.serverCertificateArns;
        this.serviceType = props.serviceType;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IoT::DomainConfiguration", props.tags, { tagPropertyName: 'tags' });
        this.validationCertificateArn = props.validationCertificateArn;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDomainConfiguration.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            authorizerConfig: this.authorizerConfig,
            domainConfigurationName: this.domainConfigurationName,
            domainConfigurationStatus: this.domainConfigurationStatus,
            domainName: this.domainName,
            serverCertificateArns: this.serverCertificateArns,
            serviceType: this.serviceType,
            tags: this.tags.renderTags(),
            validationCertificateArn: this.validationCertificateArn,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDomainConfigurationPropsToCloudFormation(props);
    }
}

export namespace CfnDomainConfiguration {
    /**
     * An object that specifies the authorization service for a domain.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-domainconfiguration-authorizerconfig.html
     */
    export interface AuthorizerConfigProperty {
        /**
         * A Boolean that specifies whether the domain configuration's authorization service can be overridden.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-domainconfiguration-authorizerconfig.html#cfn-iot-domainconfiguration-authorizerconfig-allowauthorizeroverride
         */
        readonly allowAuthorizerOverride?: boolean | cdk.IResolvable;
        /**
         * The name of the authorization service for a domain configuration.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-domainconfiguration-authorizerconfig.html#cfn-iot-domainconfiguration-authorizerconfig-defaultauthorizername
         */
        readonly defaultAuthorizerName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AuthorizerConfigProperty`
 *
 * @param properties - the TypeScript properties of a `AuthorizerConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnDomainConfiguration_AuthorizerConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('allowAuthorizerOverride', cdk.validateBoolean)(properties.allowAuthorizerOverride));
    errors.collect(cdk.propertyValidator('defaultAuthorizerName', cdk.validateString)(properties.defaultAuthorizerName));
    return errors.wrap('supplied properties not correct for "AuthorizerConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::DomainConfiguration.AuthorizerConfig` resource
 *
 * @param properties - the TypeScript properties of a `AuthorizerConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::DomainConfiguration.AuthorizerConfig` resource.
 */
// @ts-ignore TS6133
function cfnDomainConfigurationAuthorizerConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomainConfiguration_AuthorizerConfigPropertyValidator(properties).assertSuccess();
    return {
        AllowAuthorizerOverride: cdk.booleanToCloudFormation(properties.allowAuthorizerOverride),
        DefaultAuthorizerName: cdk.stringToCloudFormation(properties.defaultAuthorizerName),
    };
}

// @ts-ignore TS6133
function CfnDomainConfigurationAuthorizerConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomainConfiguration.AuthorizerConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomainConfiguration.AuthorizerConfigProperty>();
    ret.addPropertyResult('allowAuthorizerOverride', 'AllowAuthorizerOverride', properties.AllowAuthorizerOverride != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AllowAuthorizerOverride) : undefined);
    ret.addPropertyResult('defaultAuthorizerName', 'DefaultAuthorizerName', properties.DefaultAuthorizerName != null ? cfn_parse.FromCloudFormation.getString(properties.DefaultAuthorizerName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDomainConfiguration {
    /**
     * An object that contains information about a server certificate.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-domainconfiguration-servercertificatesummary.html
     */
    export interface ServerCertificateSummaryProperty {
        /**
         * The ARN of the server certificate.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-domainconfiguration-servercertificatesummary.html#cfn-iot-domainconfiguration-servercertificatesummary-servercertificatearn
         */
        readonly serverCertificateArn?: string;
        /**
         * The status of the server certificate.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-domainconfiguration-servercertificatesummary.html#cfn-iot-domainconfiguration-servercertificatesummary-servercertificatestatus
         */
        readonly serverCertificateStatus?: string;
        /**
         * Details that explain the status of the server certificate.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-domainconfiguration-servercertificatesummary.html#cfn-iot-domainconfiguration-servercertificatesummary-servercertificatestatusdetail
         */
        readonly serverCertificateStatusDetail?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ServerCertificateSummaryProperty`
 *
 * @param properties - the TypeScript properties of a `ServerCertificateSummaryProperty`
 *
 * @returns the result of the validation.
 */
function CfnDomainConfiguration_ServerCertificateSummaryPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('serverCertificateArn', cdk.validateString)(properties.serverCertificateArn));
    errors.collect(cdk.propertyValidator('serverCertificateStatus', cdk.validateString)(properties.serverCertificateStatus));
    errors.collect(cdk.propertyValidator('serverCertificateStatusDetail', cdk.validateString)(properties.serverCertificateStatusDetail));
    return errors.wrap('supplied properties not correct for "ServerCertificateSummaryProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::DomainConfiguration.ServerCertificateSummary` resource
 *
 * @param properties - the TypeScript properties of a `ServerCertificateSummaryProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::DomainConfiguration.ServerCertificateSummary` resource.
 */
// @ts-ignore TS6133
function cfnDomainConfigurationServerCertificateSummaryPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomainConfiguration_ServerCertificateSummaryPropertyValidator(properties).assertSuccess();
    return {
        ServerCertificateArn: cdk.stringToCloudFormation(properties.serverCertificateArn),
        ServerCertificateStatus: cdk.stringToCloudFormation(properties.serverCertificateStatus),
        ServerCertificateStatusDetail: cdk.stringToCloudFormation(properties.serverCertificateStatusDetail),
    };
}

// @ts-ignore TS6133
function CfnDomainConfigurationServerCertificateSummaryPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomainConfiguration.ServerCertificateSummaryProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomainConfiguration.ServerCertificateSummaryProperty>();
    ret.addPropertyResult('serverCertificateArn', 'ServerCertificateArn', properties.ServerCertificateArn != null ? cfn_parse.FromCloudFormation.getString(properties.ServerCertificateArn) : undefined);
    ret.addPropertyResult('serverCertificateStatus', 'ServerCertificateStatus', properties.ServerCertificateStatus != null ? cfn_parse.FromCloudFormation.getString(properties.ServerCertificateStatus) : undefined);
    ret.addPropertyResult('serverCertificateStatusDetail', 'ServerCertificateStatusDetail', properties.ServerCertificateStatusDetail != null ? cfn_parse.FromCloudFormation.getString(properties.ServerCertificateStatusDetail) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnFleetMetric`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html
 */
export interface CfnFleetMetricProps {

    /**
     * The name of the fleet metric to create.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-metricname
     */
    readonly metricName: string;

    /**
     * The field to aggregate.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-aggregationfield
     */
    readonly aggregationField?: string;

    /**
     * The type of the aggregation query.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-aggregationtype
     */
    readonly aggregationType?: CfnFleetMetric.AggregationTypeProperty | cdk.IResolvable;

    /**
     * The fleet metric description.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-description
     */
    readonly description?: string;

    /**
     * The name of the index to search.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-indexname
     */
    readonly indexName?: string;

    /**
     * The time in seconds between fleet metric emissions. Range [60(1 min), 86400(1 day)] and must be multiple of 60.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-period
     */
    readonly period?: number;

    /**
     * The search query string.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-querystring
     */
    readonly queryString?: string;

    /**
     * The query version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-queryversion
     */
    readonly queryVersion?: string;

    /**
     * Metadata which can be used to manage the fleet metric.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * Used to support unit transformation such as milliseconds to seconds. Must be a unit supported by CW metric. Default to null.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-unit
     */
    readonly unit?: string;
}

/**
 * Determine whether the given properties match those of a `CfnFleetMetricProps`
 *
 * @param properties - the TypeScript properties of a `CfnFleetMetricProps`
 *
 * @returns the result of the validation.
 */
function CfnFleetMetricPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('aggregationField', cdk.validateString)(properties.aggregationField));
    errors.collect(cdk.propertyValidator('aggregationType', CfnFleetMetric_AggregationTypePropertyValidator)(properties.aggregationType));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('indexName', cdk.validateString)(properties.indexName));
    errors.collect(cdk.propertyValidator('metricName', cdk.requiredValidator)(properties.metricName));
    errors.collect(cdk.propertyValidator('metricName', cdk.validateString)(properties.metricName));
    errors.collect(cdk.propertyValidator('period', cdk.validateNumber)(properties.period));
    errors.collect(cdk.propertyValidator('queryString', cdk.validateString)(properties.queryString));
    errors.collect(cdk.propertyValidator('queryVersion', cdk.validateString)(properties.queryVersion));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('unit', cdk.validateString)(properties.unit));
    return errors.wrap('supplied properties not correct for "CfnFleetMetricProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::FleetMetric` resource
 *
 * @param properties - the TypeScript properties of a `CfnFleetMetricProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::FleetMetric` resource.
 */
// @ts-ignore TS6133
function cfnFleetMetricPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleetMetricPropsValidator(properties).assertSuccess();
    return {
        MetricName: cdk.stringToCloudFormation(properties.metricName),
        AggregationField: cdk.stringToCloudFormation(properties.aggregationField),
        AggregationType: cfnFleetMetricAggregationTypePropertyToCloudFormation(properties.aggregationType),
        Description: cdk.stringToCloudFormation(properties.description),
        IndexName: cdk.stringToCloudFormation(properties.indexName),
        Period: cdk.numberToCloudFormation(properties.period),
        QueryString: cdk.stringToCloudFormation(properties.queryString),
        QueryVersion: cdk.stringToCloudFormation(properties.queryVersion),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        Unit: cdk.stringToCloudFormation(properties.unit),
    };
}

// @ts-ignore TS6133
function CfnFleetMetricPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleetMetricProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleetMetricProps>();
    ret.addPropertyResult('metricName', 'MetricName', cfn_parse.FromCloudFormation.getString(properties.MetricName));
    ret.addPropertyResult('aggregationField', 'AggregationField', properties.AggregationField != null ? cfn_parse.FromCloudFormation.getString(properties.AggregationField) : undefined);
    ret.addPropertyResult('aggregationType', 'AggregationType', properties.AggregationType != null ? CfnFleetMetricAggregationTypePropertyFromCloudFormation(properties.AggregationType) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('indexName', 'IndexName', properties.IndexName != null ? cfn_parse.FromCloudFormation.getString(properties.IndexName) : undefined);
    ret.addPropertyResult('period', 'Period', properties.Period != null ? cfn_parse.FromCloudFormation.getNumber(properties.Period) : undefined);
    ret.addPropertyResult('queryString', 'QueryString', properties.QueryString != null ? cfn_parse.FromCloudFormation.getString(properties.QueryString) : undefined);
    ret.addPropertyResult('queryVersion', 'QueryVersion', properties.QueryVersion != null ? cfn_parse.FromCloudFormation.getString(properties.QueryVersion) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('unit', 'Unit', properties.Unit != null ? cfn_parse.FromCloudFormation.getString(properties.Unit) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::FleetMetric`
 *
 * Use the `AWS::IoT::FleetMetric` resource to declare a fleet metric.
 *
 * @cloudformationResource AWS::IoT::FleetMetric
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html
 */
export class CfnFleetMetric extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::FleetMetric";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnFleetMetric {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnFleetMetricPropsFromCloudFormation(resourceProperties);
        const ret = new CfnFleetMetric(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The time the fleet metric was created.
     * @cloudformationAttribute CreationDate
     */
    public readonly attrCreationDate: cdk.IResolvable;

    /**
     * The time the fleet metric was last modified.
     * @cloudformationAttribute LastModifiedDate
     */
    public readonly attrLastModifiedDate: cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of the fleet metric.
     * @cloudformationAttribute MetricArn
     */
    public readonly attrMetricArn: string;

    /**
     * The fleet metric version.
     * @cloudformationAttribute Version
     */
    public readonly attrVersion: cdk.IResolvable;

    /**
     * The name of the fleet metric to create.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-metricname
     */
    public metricName: string;

    /**
     * The field to aggregate.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-aggregationfield
     */
    public aggregationField: string | undefined;

    /**
     * The type of the aggregation query.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-aggregationtype
     */
    public aggregationType: CfnFleetMetric.AggregationTypeProperty | cdk.IResolvable | undefined;

    /**
     * The fleet metric description.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-description
     */
    public description: string | undefined;

    /**
     * The name of the index to search.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-indexname
     */
    public indexName: string | undefined;

    /**
     * The time in seconds between fleet metric emissions. Range [60(1 min), 86400(1 day)] and must be multiple of 60.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-period
     */
    public period: number | undefined;

    /**
     * The search query string.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-querystring
     */
    public queryString: string | undefined;

    /**
     * The query version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-queryversion
     */
    public queryVersion: string | undefined;

    /**
     * Metadata which can be used to manage the fleet metric.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Used to support unit transformation such as milliseconds to seconds. Must be a unit supported by CW metric. Default to null.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-fleetmetric.html#cfn-iot-fleetmetric-unit
     */
    public unit: string | undefined;

    /**
     * Create a new `AWS::IoT::FleetMetric`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnFleetMetricProps) {
        super(scope, id, { type: CfnFleetMetric.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'metricName', this);
        this.attrCreationDate = this.getAtt('CreationDate');
        this.attrLastModifiedDate = this.getAtt('LastModifiedDate');
        this.attrMetricArn = cdk.Token.asString(this.getAtt('MetricArn'));
        this.attrVersion = this.getAtt('Version');

        this.metricName = props.metricName;
        this.aggregationField = props.aggregationField;
        this.aggregationType = props.aggregationType;
        this.description = props.description;
        this.indexName = props.indexName;
        this.period = props.period;
        this.queryString = props.queryString;
        this.queryVersion = props.queryVersion;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IoT::FleetMetric", props.tags, { tagPropertyName: 'tags' });
        this.unit = props.unit;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnFleetMetric.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            metricName: this.metricName,
            aggregationField: this.aggregationField,
            aggregationType: this.aggregationType,
            description: this.description,
            indexName: this.indexName,
            period: this.period,
            queryString: this.queryString,
            queryVersion: this.queryVersion,
            tags: this.tags.renderTags(),
            unit: this.unit,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnFleetMetricPropsToCloudFormation(props);
    }
}

export namespace CfnFleetMetric {
    /**
     * The type of aggregation queries.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-fleetmetric-aggregationtype.html
     */
    export interface AggregationTypeProperty {
        /**
         * The name of the aggregation type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-fleetmetric-aggregationtype.html#cfn-iot-fleetmetric-aggregationtype-name
         */
        readonly name: string;
        /**
         * A list of the values of aggregation types.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-fleetmetric-aggregationtype.html#cfn-iot-fleetmetric-aggregationtype-values
         */
        readonly values: string[];
    }
}

/**
 * Determine whether the given properties match those of a `AggregationTypeProperty`
 *
 * @param properties - the TypeScript properties of a `AggregationTypeProperty`
 *
 * @returns the result of the validation.
 */
function CfnFleetMetric_AggregationTypePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('values', cdk.requiredValidator)(properties.values));
    errors.collect(cdk.propertyValidator('values', cdk.listValidator(cdk.validateString))(properties.values));
    return errors.wrap('supplied properties not correct for "AggregationTypeProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::FleetMetric.AggregationType` resource
 *
 * @param properties - the TypeScript properties of a `AggregationTypeProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::FleetMetric.AggregationType` resource.
 */
// @ts-ignore TS6133
function cfnFleetMetricAggregationTypePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFleetMetric_AggregationTypePropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Values: cdk.listMapper(cdk.stringToCloudFormation)(properties.values),
    };
}

// @ts-ignore TS6133
function CfnFleetMetricAggregationTypePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFleetMetric.AggregationTypeProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFleetMetric.AggregationTypeProperty>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('values', 'Values', cfn_parse.FromCloudFormation.getStringArray(properties.Values));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnJobTemplate`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html
 */
export interface CfnJobTemplateProps {

    /**
     * A description of the job template.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-description
     */
    readonly description: string;

    /**
     * A unique identifier for the job template. We recommend using a UUID. Alpha-numeric characters, "-", and "_" are valid for use here.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-jobtemplateid
     */
    readonly jobTemplateId: string;

    /**
     * The criteria that determine when and how a job abort takes place.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-abortconfig
     */
    readonly abortConfig?: any | cdk.IResolvable;

    /**
     * The job document.
     *
     * Required if you don't specify a value for `documentSource` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-document
     */
    readonly document?: string;

    /**
     * An S3 link to the job document to use in the template. Required if you don't specify a value for `document` .
     *
     * > If the job document resides in an S3 bucket, you must use a placeholder link when specifying the document.
     * >
     * > The placeholder link is of the following form:
     * >
     * > `${aws:iot:s3-presigned-url:https://s3.amazonaws.com/ *bucket* / *key* }`
     * >
     * > where *bucket* is your bucket name and *key* is the object in the bucket to which you are linking.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-documentsource
     */
    readonly documentSource?: string;

    /**
     * The ARN of the job to use as the basis for the job template.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-jobarn
     */
    readonly jobArn?: string;

    /**
     * Allows you to create the criteria to retry a job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-jobexecutionsretryconfig
     */
    readonly jobExecutionsRetryConfig?: any | cdk.IResolvable;

    /**
     * Allows you to create a staged rollout of a job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-jobexecutionsrolloutconfig
     */
    readonly jobExecutionsRolloutConfig?: any | cdk.IResolvable;

    /**
     * Configuration for pre-signed S3 URLs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-presignedurlconfig
     */
    readonly presignedUrlConfig?: any | cdk.IResolvable;

    /**
     * Metadata that can be used to manage the job template.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * Specifies the amount of time each device has to finish its execution of the job. A timer is started when the job execution status is set to `IN_PROGRESS` . If the job execution status is not set to another terminal state before the timer expires, it will be automatically set to `TIMED_OUT` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-timeoutconfig
     */
    readonly timeoutConfig?: any | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnJobTemplateProps`
 *
 * @param properties - the TypeScript properties of a `CfnJobTemplateProps`
 *
 * @returns the result of the validation.
 */
function CfnJobTemplatePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('abortConfig', cdk.validateObject)(properties.abortConfig));
    errors.collect(cdk.propertyValidator('description', cdk.requiredValidator)(properties.description));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('document', cdk.validateString)(properties.document));
    errors.collect(cdk.propertyValidator('documentSource', cdk.validateString)(properties.documentSource));
    errors.collect(cdk.propertyValidator('jobArn', cdk.validateString)(properties.jobArn));
    errors.collect(cdk.propertyValidator('jobExecutionsRetryConfig', cdk.validateObject)(properties.jobExecutionsRetryConfig));
    errors.collect(cdk.propertyValidator('jobExecutionsRolloutConfig', cdk.validateObject)(properties.jobExecutionsRolloutConfig));
    errors.collect(cdk.propertyValidator('jobTemplateId', cdk.requiredValidator)(properties.jobTemplateId));
    errors.collect(cdk.propertyValidator('jobTemplateId', cdk.validateString)(properties.jobTemplateId));
    errors.collect(cdk.propertyValidator('presignedUrlConfig', cdk.validateObject)(properties.presignedUrlConfig));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('timeoutConfig', cdk.validateObject)(properties.timeoutConfig));
    return errors.wrap('supplied properties not correct for "CfnJobTemplateProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::JobTemplate` resource
 *
 * @param properties - the TypeScript properties of a `CfnJobTemplateProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::JobTemplate` resource.
 */
// @ts-ignore TS6133
function cfnJobTemplatePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobTemplatePropsValidator(properties).assertSuccess();
    return {
        Description: cdk.stringToCloudFormation(properties.description),
        JobTemplateId: cdk.stringToCloudFormation(properties.jobTemplateId),
        AbortConfig: cdk.objectToCloudFormation(properties.abortConfig),
        Document: cdk.stringToCloudFormation(properties.document),
        DocumentSource: cdk.stringToCloudFormation(properties.documentSource),
        JobArn: cdk.stringToCloudFormation(properties.jobArn),
        JobExecutionsRetryConfig: cdk.objectToCloudFormation(properties.jobExecutionsRetryConfig),
        JobExecutionsRolloutConfig: cdk.objectToCloudFormation(properties.jobExecutionsRolloutConfig),
        PresignedUrlConfig: cdk.objectToCloudFormation(properties.presignedUrlConfig),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        TimeoutConfig: cdk.objectToCloudFormation(properties.timeoutConfig),
    };
}

// @ts-ignore TS6133
function CfnJobTemplatePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobTemplateProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobTemplateProps>();
    ret.addPropertyResult('description', 'Description', cfn_parse.FromCloudFormation.getString(properties.Description));
    ret.addPropertyResult('jobTemplateId', 'JobTemplateId', cfn_parse.FromCloudFormation.getString(properties.JobTemplateId));
    ret.addPropertyResult('abortConfig', 'AbortConfig', properties.AbortConfig != null ? cfn_parse.FromCloudFormation.getAny(properties.AbortConfig) : undefined);
    ret.addPropertyResult('document', 'Document', properties.Document != null ? cfn_parse.FromCloudFormation.getString(properties.Document) : undefined);
    ret.addPropertyResult('documentSource', 'DocumentSource', properties.DocumentSource != null ? cfn_parse.FromCloudFormation.getString(properties.DocumentSource) : undefined);
    ret.addPropertyResult('jobArn', 'JobArn', properties.JobArn != null ? cfn_parse.FromCloudFormation.getString(properties.JobArn) : undefined);
    ret.addPropertyResult('jobExecutionsRetryConfig', 'JobExecutionsRetryConfig', properties.JobExecutionsRetryConfig != null ? cfn_parse.FromCloudFormation.getAny(properties.JobExecutionsRetryConfig) : undefined);
    ret.addPropertyResult('jobExecutionsRolloutConfig', 'JobExecutionsRolloutConfig', properties.JobExecutionsRolloutConfig != null ? cfn_parse.FromCloudFormation.getAny(properties.JobExecutionsRolloutConfig) : undefined);
    ret.addPropertyResult('presignedUrlConfig', 'PresignedUrlConfig', properties.PresignedUrlConfig != null ? cfn_parse.FromCloudFormation.getAny(properties.PresignedUrlConfig) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('timeoutConfig', 'TimeoutConfig', properties.TimeoutConfig != null ? cfn_parse.FromCloudFormation.getAny(properties.TimeoutConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::JobTemplate`
 *
 * Represents a job template.
 *
 * @cloudformationResource AWS::IoT::JobTemplate
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html
 */
export class CfnJobTemplate extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::JobTemplate";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnJobTemplate {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnJobTemplatePropsFromCloudFormation(resourceProperties);
        const ret = new CfnJobTemplate(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the job to use as the basis for the job template.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * A description of the job template.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-description
     */
    public description: string;

    /**
     * A unique identifier for the job template. We recommend using a UUID. Alpha-numeric characters, "-", and "_" are valid for use here.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-jobtemplateid
     */
    public jobTemplateId: string;

    /**
     * The criteria that determine when and how a job abort takes place.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-abortconfig
     */
    public abortConfig: any | cdk.IResolvable | undefined;

    /**
     * The job document.
     *
     * Required if you don't specify a value for `documentSource` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-document
     */
    public document: string | undefined;

    /**
     * An S3 link to the job document to use in the template. Required if you don't specify a value for `document` .
     *
     * > If the job document resides in an S3 bucket, you must use a placeholder link when specifying the document.
     * >
     * > The placeholder link is of the following form:
     * >
     * > `${aws:iot:s3-presigned-url:https://s3.amazonaws.com/ *bucket* / *key* }`
     * >
     * > where *bucket* is your bucket name and *key* is the object in the bucket to which you are linking.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-documentsource
     */
    public documentSource: string | undefined;

    /**
     * The ARN of the job to use as the basis for the job template.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-jobarn
     */
    public jobArn: string | undefined;

    /**
     * Allows you to create the criteria to retry a job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-jobexecutionsretryconfig
     */
    public jobExecutionsRetryConfig: any | cdk.IResolvable | undefined;

    /**
     * Allows you to create a staged rollout of a job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-jobexecutionsrolloutconfig
     */
    public jobExecutionsRolloutConfig: any | cdk.IResolvable | undefined;

    /**
     * Configuration for pre-signed S3 URLs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-presignedurlconfig
     */
    public presignedUrlConfig: any | cdk.IResolvable | undefined;

    /**
     * Metadata that can be used to manage the job template.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Specifies the amount of time each device has to finish its execution of the job. A timer is started when the job execution status is set to `IN_PROGRESS` . If the job execution status is not set to another terminal state before the timer expires, it will be automatically set to `TIMED_OUT` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-jobtemplate.html#cfn-iot-jobtemplate-timeoutconfig
     */
    public timeoutConfig: any | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::IoT::JobTemplate`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnJobTemplateProps) {
        super(scope, id, { type: CfnJobTemplate.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'description', this);
        cdk.requireProperty(props, 'jobTemplateId', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.description = props.description;
        this.jobTemplateId = props.jobTemplateId;
        this.abortConfig = props.abortConfig;
        this.document = props.document;
        this.documentSource = props.documentSource;
        this.jobArn = props.jobArn;
        this.jobExecutionsRetryConfig = props.jobExecutionsRetryConfig;
        this.jobExecutionsRolloutConfig = props.jobExecutionsRolloutConfig;
        this.presignedUrlConfig = props.presignedUrlConfig;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IoT::JobTemplate", props.tags, { tagPropertyName: 'tags' });
        this.timeoutConfig = props.timeoutConfig;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnJobTemplate.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            description: this.description,
            jobTemplateId: this.jobTemplateId,
            abortConfig: this.abortConfig,
            document: this.document,
            documentSource: this.documentSource,
            jobArn: this.jobArn,
            jobExecutionsRetryConfig: this.jobExecutionsRetryConfig,
            jobExecutionsRolloutConfig: this.jobExecutionsRolloutConfig,
            presignedUrlConfig: this.presignedUrlConfig,
            tags: this.tags.renderTags(),
            timeoutConfig: this.timeoutConfig,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnJobTemplatePropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnLogging`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-logging.html
 */
export interface CfnLoggingProps {

    /**
     * The account ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-logging.html#cfn-iot-logging-accountid
     */
    readonly accountId: string;

    /**
     * The default log level.Valid Values: `DEBUG | INFO | ERROR | WARN | DISABLED`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-logging.html#cfn-iot-logging-defaultloglevel
     */
    readonly defaultLogLevel: string;

    /**
     * The role ARN used for the log.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-logging.html#cfn-iot-logging-rolearn
     */
    readonly roleArn: string;
}

/**
 * Determine whether the given properties match those of a `CfnLoggingProps`
 *
 * @param properties - the TypeScript properties of a `CfnLoggingProps`
 *
 * @returns the result of the validation.
 */
function CfnLoggingPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accountId', cdk.requiredValidator)(properties.accountId));
    errors.collect(cdk.propertyValidator('accountId', cdk.validateString)(properties.accountId));
    errors.collect(cdk.propertyValidator('defaultLogLevel', cdk.requiredValidator)(properties.defaultLogLevel));
    errors.collect(cdk.propertyValidator('defaultLogLevel', cdk.validateString)(properties.defaultLogLevel));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "CfnLoggingProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::Logging` resource
 *
 * @param properties - the TypeScript properties of a `CfnLoggingProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::Logging` resource.
 */
// @ts-ignore TS6133
function cfnLoggingPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnLoggingPropsValidator(properties).assertSuccess();
    return {
        AccountId: cdk.stringToCloudFormation(properties.accountId),
        DefaultLogLevel: cdk.stringToCloudFormation(properties.defaultLogLevel),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnLoggingPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnLoggingProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnLoggingProps>();
    ret.addPropertyResult('accountId', 'AccountId', cfn_parse.FromCloudFormation.getString(properties.AccountId));
    ret.addPropertyResult('defaultLogLevel', 'DefaultLogLevel', cfn_parse.FromCloudFormation.getString(properties.DefaultLogLevel));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::Logging`
 *
 * Configure logging.
 *
 * @cloudformationResource AWS::IoT::Logging
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-logging.html
 */
export class CfnLogging extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::Logging";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnLogging {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnLoggingPropsFromCloudFormation(resourceProperties);
        const ret = new CfnLogging(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The account ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-logging.html#cfn-iot-logging-accountid
     */
    public accountId: string;

    /**
     * The default log level.Valid Values: `DEBUG | INFO | ERROR | WARN | DISABLED`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-logging.html#cfn-iot-logging-defaultloglevel
     */
    public defaultLogLevel: string;

    /**
     * The role ARN used for the log.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-logging.html#cfn-iot-logging-rolearn
     */
    public roleArn: string;

    /**
     * Create a new `AWS::IoT::Logging`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnLoggingProps) {
        super(scope, id, { type: CfnLogging.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'accountId', this);
        cdk.requireProperty(props, 'defaultLogLevel', this);
        cdk.requireProperty(props, 'roleArn', this);

        this.accountId = props.accountId;
        this.defaultLogLevel = props.defaultLogLevel;
        this.roleArn = props.roleArn;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnLogging.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            accountId: this.accountId,
            defaultLogLevel: this.defaultLogLevel,
            roleArn: this.roleArn,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnLoggingPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnMitigationAction`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-mitigationaction.html
 */
export interface CfnMitigationActionProps {

    /**
     * The set of parameters for this mitigation action. The parameters vary, depending on the kind of action you apply.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-mitigationaction.html#cfn-iot-mitigationaction-actionparams
     */
    readonly actionParams: CfnMitigationAction.ActionParamsProperty | cdk.IResolvable;

    /**
     * The IAM role ARN used to apply this mitigation action.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-mitigationaction.html#cfn-iot-mitigationaction-rolearn
     */
    readonly roleArn: string;

    /**
     * The friendly name of the mitigation action.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-mitigationaction.html#cfn-iot-mitigationaction-actionname
     */
    readonly actionName?: string;

    /**
     * Metadata that can be used to manage the mitigation action.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-mitigationaction.html#cfn-iot-mitigationaction-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnMitigationActionProps`
 *
 * @param properties - the TypeScript properties of a `CfnMitigationActionProps`
 *
 * @returns the result of the validation.
 */
function CfnMitigationActionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('actionName', cdk.validateString)(properties.actionName));
    errors.collect(cdk.propertyValidator('actionParams', cdk.requiredValidator)(properties.actionParams));
    errors.collect(cdk.propertyValidator('actionParams', CfnMitigationAction_ActionParamsPropertyValidator)(properties.actionParams));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnMitigationActionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::MitigationAction` resource
 *
 * @param properties - the TypeScript properties of a `CfnMitigationActionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::MitigationAction` resource.
 */
// @ts-ignore TS6133
function cfnMitigationActionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMitigationActionPropsValidator(properties).assertSuccess();
    return {
        ActionParams: cfnMitigationActionActionParamsPropertyToCloudFormation(properties.actionParams),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        ActionName: cdk.stringToCloudFormation(properties.actionName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnMitigationActionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMitigationActionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMitigationActionProps>();
    ret.addPropertyResult('actionParams', 'ActionParams', CfnMitigationActionActionParamsPropertyFromCloudFormation(properties.ActionParams));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('actionName', 'ActionName', properties.ActionName != null ? cfn_parse.FromCloudFormation.getString(properties.ActionName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::MitigationAction`
 *
 * Defines an action that can be applied to audit findings by using StartAuditMitigationActionsTask. For API reference, see [CreateMitigationAction](https://docs.aws.amazon.com/iot/latest/apireference/API_CreateMitigationAction.html) and for general information, see [Mitigation actions](https://docs.aws.amazon.com/iot/latest/developerguide/dd-mitigation-actions.html) .
 *
 * @cloudformationResource AWS::IoT::MitigationAction
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-mitigationaction.html
 */
export class CfnMitigationAction extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::MitigationAction";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnMitigationAction {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnMitigationActionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnMitigationAction(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the mitigation action.
     * @cloudformationAttribute MitigationActionArn
     */
    public readonly attrMitigationActionArn: string;

    /**
     * The ID of the mitigation action.
     * @cloudformationAttribute MitigationActionId
     */
    public readonly attrMitigationActionId: string;

    /**
     * The set of parameters for this mitigation action. The parameters vary, depending on the kind of action you apply.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-mitigationaction.html#cfn-iot-mitigationaction-actionparams
     */
    public actionParams: CfnMitigationAction.ActionParamsProperty | cdk.IResolvable;

    /**
     * The IAM role ARN used to apply this mitigation action.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-mitigationaction.html#cfn-iot-mitigationaction-rolearn
     */
    public roleArn: string;

    /**
     * The friendly name of the mitigation action.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-mitigationaction.html#cfn-iot-mitigationaction-actionname
     */
    public actionName: string | undefined;

    /**
     * Metadata that can be used to manage the mitigation action.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-mitigationaction.html#cfn-iot-mitigationaction-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::IoT::MitigationAction`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnMitigationActionProps) {
        super(scope, id, { type: CfnMitigationAction.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'actionParams', this);
        cdk.requireProperty(props, 'roleArn', this);
        this.attrMitigationActionArn = cdk.Token.asString(this.getAtt('MitigationActionArn'));
        this.attrMitigationActionId = cdk.Token.asString(this.getAtt('MitigationActionId'));

        this.actionParams = props.actionParams;
        this.roleArn = props.roleArn;
        this.actionName = props.actionName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IoT::MitigationAction", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnMitigationAction.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            actionParams: this.actionParams,
            roleArn: this.roleArn,
            actionName: this.actionName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnMitigationActionPropsToCloudFormation(props);
    }
}

export namespace CfnMitigationAction {
    /**
     * Defines the type of action and the parameters for that action.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-actionparams.html
     */
    export interface ActionParamsProperty {
        /**
         * Specifies the group to which you want to add the devices.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-actionparams.html#cfn-iot-mitigationaction-actionparams-addthingstothinggroupparams
         */
        readonly addThingsToThingGroupParams?: CfnMitigationAction.AddThingsToThingGroupParamsProperty | cdk.IResolvable;
        /**
         * Specifies the logging level and the role with permissions for logging. You cannot specify a logging level of `DISABLED` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-actionparams.html#cfn-iot-mitigationaction-actionparams-enableiotloggingparams
         */
        readonly enableIoTLoggingParams?: CfnMitigationAction.EnableIoTLoggingParamsProperty | cdk.IResolvable;
        /**
         * Specifies the topic to which the finding should be published.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-actionparams.html#cfn-iot-mitigationaction-actionparams-publishfindingtosnsparams
         */
        readonly publishFindingToSnsParams?: CfnMitigationAction.PublishFindingToSnsParamsProperty | cdk.IResolvable;
        /**
         * Replaces the policy version with a default or blank policy. You specify the template name. Only a value of `BLANK_POLICY` is currently supported.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-actionparams.html#cfn-iot-mitigationaction-actionparams-replacedefaultpolicyversionparams
         */
        readonly replaceDefaultPolicyVersionParams?: CfnMitigationAction.ReplaceDefaultPolicyVersionParamsProperty | cdk.IResolvable;
        /**
         * Specifies the new state for the CA certificate. Only a value of `DEACTIVATE` is currently supported.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-actionparams.html#cfn-iot-mitigationaction-actionparams-updatecacertificateparams
         */
        readonly updateCaCertificateParams?: CfnMitigationAction.UpdateCACertificateParamsProperty | cdk.IResolvable;
        /**
         * Specifies the new state for a device certificate. Only a value of `DEACTIVATE` is currently supported.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-actionparams.html#cfn-iot-mitigationaction-actionparams-updatedevicecertificateparams
         */
        readonly updateDeviceCertificateParams?: CfnMitigationAction.UpdateDeviceCertificateParamsProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ActionParamsProperty`
 *
 * @param properties - the TypeScript properties of a `ActionParamsProperty`
 *
 * @returns the result of the validation.
 */
function CfnMitigationAction_ActionParamsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('addThingsToThingGroupParams', CfnMitigationAction_AddThingsToThingGroupParamsPropertyValidator)(properties.addThingsToThingGroupParams));
    errors.collect(cdk.propertyValidator('enableIoTLoggingParams', CfnMitigationAction_EnableIoTLoggingParamsPropertyValidator)(properties.enableIoTLoggingParams));
    errors.collect(cdk.propertyValidator('publishFindingToSnsParams', CfnMitigationAction_PublishFindingToSnsParamsPropertyValidator)(properties.publishFindingToSnsParams));
    errors.collect(cdk.propertyValidator('replaceDefaultPolicyVersionParams', CfnMitigationAction_ReplaceDefaultPolicyVersionParamsPropertyValidator)(properties.replaceDefaultPolicyVersionParams));
    errors.collect(cdk.propertyValidator('updateCaCertificateParams', CfnMitigationAction_UpdateCACertificateParamsPropertyValidator)(properties.updateCaCertificateParams));
    errors.collect(cdk.propertyValidator('updateDeviceCertificateParams', CfnMitigationAction_UpdateDeviceCertificateParamsPropertyValidator)(properties.updateDeviceCertificateParams));
    return errors.wrap('supplied properties not correct for "ActionParamsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::MitigationAction.ActionParams` resource
 *
 * @param properties - the TypeScript properties of a `ActionParamsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::MitigationAction.ActionParams` resource.
 */
// @ts-ignore TS6133
function cfnMitigationActionActionParamsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMitigationAction_ActionParamsPropertyValidator(properties).assertSuccess();
    return {
        AddThingsToThingGroupParams: cfnMitigationActionAddThingsToThingGroupParamsPropertyToCloudFormation(properties.addThingsToThingGroupParams),
        EnableIoTLoggingParams: cfnMitigationActionEnableIoTLoggingParamsPropertyToCloudFormation(properties.enableIoTLoggingParams),
        PublishFindingToSnsParams: cfnMitigationActionPublishFindingToSnsParamsPropertyToCloudFormation(properties.publishFindingToSnsParams),
        ReplaceDefaultPolicyVersionParams: cfnMitigationActionReplaceDefaultPolicyVersionParamsPropertyToCloudFormation(properties.replaceDefaultPolicyVersionParams),
        UpdateCACertificateParams: cfnMitigationActionUpdateCACertificateParamsPropertyToCloudFormation(properties.updateCaCertificateParams),
        UpdateDeviceCertificateParams: cfnMitigationActionUpdateDeviceCertificateParamsPropertyToCloudFormation(properties.updateDeviceCertificateParams),
    };
}

// @ts-ignore TS6133
function CfnMitigationActionActionParamsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMitigationAction.ActionParamsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMitigationAction.ActionParamsProperty>();
    ret.addPropertyResult('addThingsToThingGroupParams', 'AddThingsToThingGroupParams', properties.AddThingsToThingGroupParams != null ? CfnMitigationActionAddThingsToThingGroupParamsPropertyFromCloudFormation(properties.AddThingsToThingGroupParams) : undefined);
    ret.addPropertyResult('enableIoTLoggingParams', 'EnableIoTLoggingParams', properties.EnableIoTLoggingParams != null ? CfnMitigationActionEnableIoTLoggingParamsPropertyFromCloudFormation(properties.EnableIoTLoggingParams) : undefined);
    ret.addPropertyResult('publishFindingToSnsParams', 'PublishFindingToSnsParams', properties.PublishFindingToSnsParams != null ? CfnMitigationActionPublishFindingToSnsParamsPropertyFromCloudFormation(properties.PublishFindingToSnsParams) : undefined);
    ret.addPropertyResult('replaceDefaultPolicyVersionParams', 'ReplaceDefaultPolicyVersionParams', properties.ReplaceDefaultPolicyVersionParams != null ? CfnMitigationActionReplaceDefaultPolicyVersionParamsPropertyFromCloudFormation(properties.ReplaceDefaultPolicyVersionParams) : undefined);
    ret.addPropertyResult('updateCaCertificateParams', 'UpdateCACertificateParams', properties.UpdateCACertificateParams != null ? CfnMitigationActionUpdateCACertificateParamsPropertyFromCloudFormation(properties.UpdateCACertificateParams) : undefined);
    ret.addPropertyResult('updateDeviceCertificateParams', 'UpdateDeviceCertificateParams', properties.UpdateDeviceCertificateParams != null ? CfnMitigationActionUpdateDeviceCertificateParamsPropertyFromCloudFormation(properties.UpdateDeviceCertificateParams) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMitigationAction {
    /**
     * Parameters used when defining a mitigation action that move a set of things to a thing group.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-addthingstothinggroupparams.html
     */
    export interface AddThingsToThingGroupParamsProperty {
        /**
         * Specifies if this mitigation action can move the things that triggered the mitigation action even if they are part of one or more dynamic thing groups.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-addthingstothinggroupparams.html#cfn-iot-mitigationaction-addthingstothinggroupparams-overridedynamicgroups
         */
        readonly overrideDynamicGroups?: boolean | cdk.IResolvable;
        /**
         * The list of groups to which you want to add the things that triggered the mitigation action. You can add a thing to a maximum of 10 groups, but you can't add a thing to more than one group in the same hierarchy.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-addthingstothinggroupparams.html#cfn-iot-mitigationaction-addthingstothinggroupparams-thinggroupnames
         */
        readonly thingGroupNames: string[];
    }
}

/**
 * Determine whether the given properties match those of a `AddThingsToThingGroupParamsProperty`
 *
 * @param properties - the TypeScript properties of a `AddThingsToThingGroupParamsProperty`
 *
 * @returns the result of the validation.
 */
function CfnMitigationAction_AddThingsToThingGroupParamsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('overrideDynamicGroups', cdk.validateBoolean)(properties.overrideDynamicGroups));
    errors.collect(cdk.propertyValidator('thingGroupNames', cdk.requiredValidator)(properties.thingGroupNames));
    errors.collect(cdk.propertyValidator('thingGroupNames', cdk.listValidator(cdk.validateString))(properties.thingGroupNames));
    return errors.wrap('supplied properties not correct for "AddThingsToThingGroupParamsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::MitigationAction.AddThingsToThingGroupParams` resource
 *
 * @param properties - the TypeScript properties of a `AddThingsToThingGroupParamsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::MitigationAction.AddThingsToThingGroupParams` resource.
 */
// @ts-ignore TS6133
function cfnMitigationActionAddThingsToThingGroupParamsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMitigationAction_AddThingsToThingGroupParamsPropertyValidator(properties).assertSuccess();
    return {
        OverrideDynamicGroups: cdk.booleanToCloudFormation(properties.overrideDynamicGroups),
        ThingGroupNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.thingGroupNames),
    };
}

// @ts-ignore TS6133
function CfnMitigationActionAddThingsToThingGroupParamsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMitigationAction.AddThingsToThingGroupParamsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMitigationAction.AddThingsToThingGroupParamsProperty>();
    ret.addPropertyResult('overrideDynamicGroups', 'OverrideDynamicGroups', properties.OverrideDynamicGroups != null ? cfn_parse.FromCloudFormation.getBoolean(properties.OverrideDynamicGroups) : undefined);
    ret.addPropertyResult('thingGroupNames', 'ThingGroupNames', cfn_parse.FromCloudFormation.getStringArray(properties.ThingGroupNames));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMitigationAction {
    /**
     * Parameters used when defining a mitigation action that enable AWS IoT Core logging.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-enableiotloggingparams.html
     */
    export interface EnableIoTLoggingParamsProperty {
        /**
         * Specifies the type of information to be logged.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-enableiotloggingparams.html#cfn-iot-mitigationaction-enableiotloggingparams-loglevel
         */
        readonly logLevel: string;
        /**
         * The Amazon Resource Name (ARN) of the IAM role used for logging.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-enableiotloggingparams.html#cfn-iot-mitigationaction-enableiotloggingparams-rolearnforlogging
         */
        readonly roleArnForLogging: string;
    }
}

/**
 * Determine whether the given properties match those of a `EnableIoTLoggingParamsProperty`
 *
 * @param properties - the TypeScript properties of a `EnableIoTLoggingParamsProperty`
 *
 * @returns the result of the validation.
 */
function CfnMitigationAction_EnableIoTLoggingParamsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('logLevel', cdk.requiredValidator)(properties.logLevel));
    errors.collect(cdk.propertyValidator('logLevel', cdk.validateString)(properties.logLevel));
    errors.collect(cdk.propertyValidator('roleArnForLogging', cdk.requiredValidator)(properties.roleArnForLogging));
    errors.collect(cdk.propertyValidator('roleArnForLogging', cdk.validateString)(properties.roleArnForLogging));
    return errors.wrap('supplied properties not correct for "EnableIoTLoggingParamsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::MitigationAction.EnableIoTLoggingParams` resource
 *
 * @param properties - the TypeScript properties of a `EnableIoTLoggingParamsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::MitigationAction.EnableIoTLoggingParams` resource.
 */
// @ts-ignore TS6133
function cfnMitigationActionEnableIoTLoggingParamsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMitigationAction_EnableIoTLoggingParamsPropertyValidator(properties).assertSuccess();
    return {
        LogLevel: cdk.stringToCloudFormation(properties.logLevel),
        RoleArnForLogging: cdk.stringToCloudFormation(properties.roleArnForLogging),
    };
}

// @ts-ignore TS6133
function CfnMitigationActionEnableIoTLoggingParamsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMitigationAction.EnableIoTLoggingParamsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMitigationAction.EnableIoTLoggingParamsProperty>();
    ret.addPropertyResult('logLevel', 'LogLevel', cfn_parse.FromCloudFormation.getString(properties.LogLevel));
    ret.addPropertyResult('roleArnForLogging', 'RoleArnForLogging', cfn_parse.FromCloudFormation.getString(properties.RoleArnForLogging));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMitigationAction {
    /**
     * Parameters to define a mitigation action that publishes findings to Amazon SNS. You can implement your own custom actions in response to the Amazon SNS messages.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-publishfindingtosnsparams.html
     */
    export interface PublishFindingToSnsParamsProperty {
        /**
         * The ARN of the topic to which you want to publish the findings.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-publishfindingtosnsparams.html#cfn-iot-mitigationaction-publishfindingtosnsparams-topicarn
         */
        readonly topicArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `PublishFindingToSnsParamsProperty`
 *
 * @param properties - the TypeScript properties of a `PublishFindingToSnsParamsProperty`
 *
 * @returns the result of the validation.
 */
function CfnMitigationAction_PublishFindingToSnsParamsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('topicArn', cdk.requiredValidator)(properties.topicArn));
    errors.collect(cdk.propertyValidator('topicArn', cdk.validateString)(properties.topicArn));
    return errors.wrap('supplied properties not correct for "PublishFindingToSnsParamsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::MitigationAction.PublishFindingToSnsParams` resource
 *
 * @param properties - the TypeScript properties of a `PublishFindingToSnsParamsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::MitigationAction.PublishFindingToSnsParams` resource.
 */
// @ts-ignore TS6133
function cfnMitigationActionPublishFindingToSnsParamsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMitigationAction_PublishFindingToSnsParamsPropertyValidator(properties).assertSuccess();
    return {
        TopicArn: cdk.stringToCloudFormation(properties.topicArn),
    };
}

// @ts-ignore TS6133
function CfnMitigationActionPublishFindingToSnsParamsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMitigationAction.PublishFindingToSnsParamsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMitigationAction.PublishFindingToSnsParamsProperty>();
    ret.addPropertyResult('topicArn', 'TopicArn', cfn_parse.FromCloudFormation.getString(properties.TopicArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMitigationAction {
    /**
     * Parameters to define a mitigation action that adds a blank policy to restrict permissions.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-replacedefaultpolicyversionparams.html
     */
    export interface ReplaceDefaultPolicyVersionParamsProperty {
        /**
         * The name of the template to be applied. The only supported value is `BLANK_POLICY` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-replacedefaultpolicyversionparams.html#cfn-iot-mitigationaction-replacedefaultpolicyversionparams-templatename
         */
        readonly templateName: string;
    }
}

/**
 * Determine whether the given properties match those of a `ReplaceDefaultPolicyVersionParamsProperty`
 *
 * @param properties - the TypeScript properties of a `ReplaceDefaultPolicyVersionParamsProperty`
 *
 * @returns the result of the validation.
 */
function CfnMitigationAction_ReplaceDefaultPolicyVersionParamsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('templateName', cdk.requiredValidator)(properties.templateName));
    errors.collect(cdk.propertyValidator('templateName', cdk.validateString)(properties.templateName));
    return errors.wrap('supplied properties not correct for "ReplaceDefaultPolicyVersionParamsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::MitigationAction.ReplaceDefaultPolicyVersionParams` resource
 *
 * @param properties - the TypeScript properties of a `ReplaceDefaultPolicyVersionParamsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::MitigationAction.ReplaceDefaultPolicyVersionParams` resource.
 */
// @ts-ignore TS6133
function cfnMitigationActionReplaceDefaultPolicyVersionParamsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMitigationAction_ReplaceDefaultPolicyVersionParamsPropertyValidator(properties).assertSuccess();
    return {
        TemplateName: cdk.stringToCloudFormation(properties.templateName),
    };
}

// @ts-ignore TS6133
function CfnMitigationActionReplaceDefaultPolicyVersionParamsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMitigationAction.ReplaceDefaultPolicyVersionParamsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMitigationAction.ReplaceDefaultPolicyVersionParamsProperty>();
    ret.addPropertyResult('templateName', 'TemplateName', cfn_parse.FromCloudFormation.getString(properties.TemplateName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMitigationAction {
    /**
     * Parameters to define a mitigation action that changes the state of the CA certificate to inactive.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-updatecacertificateparams.html
     */
    export interface UpdateCACertificateParamsProperty {
        /**
         * The action that you want to apply to the CA certificate. The only supported value is `DEACTIVATE` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-updatecacertificateparams.html#cfn-iot-mitigationaction-updatecacertificateparams-action
         */
        readonly action: string;
    }
}

/**
 * Determine whether the given properties match those of a `UpdateCACertificateParamsProperty`
 *
 * @param properties - the TypeScript properties of a `UpdateCACertificateParamsProperty`
 *
 * @returns the result of the validation.
 */
function CfnMitigationAction_UpdateCACertificateParamsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('action', cdk.requiredValidator)(properties.action));
    errors.collect(cdk.propertyValidator('action', cdk.validateString)(properties.action));
    return errors.wrap('supplied properties not correct for "UpdateCACertificateParamsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::MitigationAction.UpdateCACertificateParams` resource
 *
 * @param properties - the TypeScript properties of a `UpdateCACertificateParamsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::MitigationAction.UpdateCACertificateParams` resource.
 */
// @ts-ignore TS6133
function cfnMitigationActionUpdateCACertificateParamsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMitigationAction_UpdateCACertificateParamsPropertyValidator(properties).assertSuccess();
    return {
        Action: cdk.stringToCloudFormation(properties.action),
    };
}

// @ts-ignore TS6133
function CfnMitigationActionUpdateCACertificateParamsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMitigationAction.UpdateCACertificateParamsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMitigationAction.UpdateCACertificateParamsProperty>();
    ret.addPropertyResult('action', 'Action', cfn_parse.FromCloudFormation.getString(properties.Action));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMitigationAction {
    /**
     * Parameters to define a mitigation action that changes the state of the device certificate to inactive.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-updatedevicecertificateparams.html
     */
    export interface UpdateDeviceCertificateParamsProperty {
        /**
         * The action that you want to apply to the device certificate. The only supported value is `DEACTIVATE` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-mitigationaction-updatedevicecertificateparams.html#cfn-iot-mitigationaction-updatedevicecertificateparams-action
         */
        readonly action: string;
    }
}

/**
 * Determine whether the given properties match those of a `UpdateDeviceCertificateParamsProperty`
 *
 * @param properties - the TypeScript properties of a `UpdateDeviceCertificateParamsProperty`
 *
 * @returns the result of the validation.
 */
function CfnMitigationAction_UpdateDeviceCertificateParamsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('action', cdk.requiredValidator)(properties.action));
    errors.collect(cdk.propertyValidator('action', cdk.validateString)(properties.action));
    return errors.wrap('supplied properties not correct for "UpdateDeviceCertificateParamsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::MitigationAction.UpdateDeviceCertificateParams` resource
 *
 * @param properties - the TypeScript properties of a `UpdateDeviceCertificateParamsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::MitigationAction.UpdateDeviceCertificateParams` resource.
 */
// @ts-ignore TS6133
function cfnMitigationActionUpdateDeviceCertificateParamsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMitigationAction_UpdateDeviceCertificateParamsPropertyValidator(properties).assertSuccess();
    return {
        Action: cdk.stringToCloudFormation(properties.action),
    };
}

// @ts-ignore TS6133
function CfnMitigationActionUpdateDeviceCertificateParamsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMitigationAction.UpdateDeviceCertificateParamsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMitigationAction.UpdateDeviceCertificateParamsProperty>();
    ret.addPropertyResult('action', 'Action', cfn_parse.FromCloudFormation.getString(properties.Action));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnPolicy`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-policy.html
 */
export interface CfnPolicyProps {

    /**
     * The JSON document that describes the policy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-policy.html#cfn-iot-policy-policydocument
     */
    readonly policyDocument: any | cdk.IResolvable;

    /**
     * The policy name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-policy.html#cfn-iot-policy-policyname
     */
    readonly policyName?: string;
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
    errors.collect(cdk.propertyValidator('policyDocument', cdk.requiredValidator)(properties.policyDocument));
    errors.collect(cdk.propertyValidator('policyDocument', cdk.validateObject)(properties.policyDocument));
    errors.collect(cdk.propertyValidator('policyName', cdk.validateString)(properties.policyName));
    return errors.wrap('supplied properties not correct for "CfnPolicyProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::Policy` resource
 *
 * @param properties - the TypeScript properties of a `CfnPolicyProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::Policy` resource.
 */
// @ts-ignore TS6133
function cfnPolicyPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPolicyPropsValidator(properties).assertSuccess();
    return {
        PolicyDocument: cdk.objectToCloudFormation(properties.policyDocument),
        PolicyName: cdk.stringToCloudFormation(properties.policyName),
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
    ret.addPropertyResult('policyName', 'PolicyName', properties.PolicyName != null ? cfn_parse.FromCloudFormation.getString(properties.PolicyName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::Policy`
 *
 * Use the `AWS::IoT::Policy` resource to declare an AWS IoT policy. For more information about working with AWS IoT policies, see [Authorization](https://docs.aws.amazon.com/iot/latest/developerguide/authorization.html) in the *AWS IoT Developer Guide* .
 *
 * @cloudformationResource AWS::IoT::Policy
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-policy.html
 */
export class CfnPolicy extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::Policy";

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
     * The Amazon Resource Name (ARN) of the AWS IoT policy, such as `arn:aws:iot:us-east-2:123456789012:policy/MyPolicy` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The JSON document that describes the policy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-policy.html#cfn-iot-policy-policydocument
     */
    public policyDocument: any | cdk.IResolvable;

    /**
     * The policy name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-policy.html#cfn-iot-policy-policyname
     */
    public policyName: string | undefined;

    /**
     * Create a new `AWS::IoT::Policy`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPolicyProps) {
        super(scope, id, { type: CfnPolicy.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'policyDocument', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.policyDocument = props.policyDocument;
        this.policyName = props.policyName;
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
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPolicyPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnPolicyPrincipalAttachment`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-policyprincipalattachment.html
 */
export interface CfnPolicyPrincipalAttachmentProps {

    /**
     * The name of the AWS IoT policy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-policyprincipalattachment.html#cfn-iot-policyprincipalattachment-policyname
     */
    readonly policyName: string;

    /**
     * The principal, which can be a certificate ARN (as returned from the `CreateCertificate` operation) or an Amazon Cognito ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-policyprincipalattachment.html#cfn-iot-policyprincipalattachment-principal
     */
    readonly principal: string;
}

/**
 * Determine whether the given properties match those of a `CfnPolicyPrincipalAttachmentProps`
 *
 * @param properties - the TypeScript properties of a `CfnPolicyPrincipalAttachmentProps`
 *
 * @returns the result of the validation.
 */
function CfnPolicyPrincipalAttachmentPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('policyName', cdk.requiredValidator)(properties.policyName));
    errors.collect(cdk.propertyValidator('policyName', cdk.validateString)(properties.policyName));
    errors.collect(cdk.propertyValidator('principal', cdk.requiredValidator)(properties.principal));
    errors.collect(cdk.propertyValidator('principal', cdk.validateString)(properties.principal));
    return errors.wrap('supplied properties not correct for "CfnPolicyPrincipalAttachmentProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::PolicyPrincipalAttachment` resource
 *
 * @param properties - the TypeScript properties of a `CfnPolicyPrincipalAttachmentProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::PolicyPrincipalAttachment` resource.
 */
// @ts-ignore TS6133
function cfnPolicyPrincipalAttachmentPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPolicyPrincipalAttachmentPropsValidator(properties).assertSuccess();
    return {
        PolicyName: cdk.stringToCloudFormation(properties.policyName),
        Principal: cdk.stringToCloudFormation(properties.principal),
    };
}

// @ts-ignore TS6133
function CfnPolicyPrincipalAttachmentPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPolicyPrincipalAttachmentProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPolicyPrincipalAttachmentProps>();
    ret.addPropertyResult('policyName', 'PolicyName', cfn_parse.FromCloudFormation.getString(properties.PolicyName));
    ret.addPropertyResult('principal', 'Principal', cfn_parse.FromCloudFormation.getString(properties.Principal));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::PolicyPrincipalAttachment`
 *
 * Use the `AWS::IoT::PolicyPrincipalAttachment` resource to attach an AWS IoT policy to a principal (an X.509 certificate or other credential).
 *
 * For information about working with AWS IoT policies and principals, see [Authorization](https://docs.aws.amazon.com/iot/latest/developerguide/authorization.html) in the *AWS IoT Developer Guide* .
 *
 * @cloudformationResource AWS::IoT::PolicyPrincipalAttachment
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-policyprincipalattachment.html
 */
export class CfnPolicyPrincipalAttachment extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::PolicyPrincipalAttachment";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnPolicyPrincipalAttachment {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnPolicyPrincipalAttachmentPropsFromCloudFormation(resourceProperties);
        const ret = new CfnPolicyPrincipalAttachment(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the AWS IoT policy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-policyprincipalattachment.html#cfn-iot-policyprincipalattachment-policyname
     */
    public policyName: string;

    /**
     * The principal, which can be a certificate ARN (as returned from the `CreateCertificate` operation) or an Amazon Cognito ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-policyprincipalattachment.html#cfn-iot-policyprincipalattachment-principal
     */
    public principal: string;

    /**
     * Create a new `AWS::IoT::PolicyPrincipalAttachment`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPolicyPrincipalAttachmentProps) {
        super(scope, id, { type: CfnPolicyPrincipalAttachment.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'policyName', this);
        cdk.requireProperty(props, 'principal', this);

        this.policyName = props.policyName;
        this.principal = props.principal;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnPolicyPrincipalAttachment.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            policyName: this.policyName,
            principal: this.principal,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPolicyPrincipalAttachmentPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnProvisioningTemplate`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html
 */
export interface CfnProvisioningTemplateProps {

    /**
     * The role ARN for the role associated with the fleet provisioning template. This IoT role grants permission to provision a device.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html#cfn-iot-provisioningtemplate-provisioningrolearn
     */
    readonly provisioningRoleArn: string;

    /**
     * The JSON formatted contents of the fleet provisioning template version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html#cfn-iot-provisioningtemplate-templatebody
     */
    readonly templateBody: string;

    /**
     * The description of the fleet provisioning template.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html#cfn-iot-provisioningtemplate-description
     */
    readonly description?: string;

    /**
     * True to enable the fleet provisioning template, otherwise false.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html#cfn-iot-provisioningtemplate-enabled
     */
    readonly enabled?: boolean | cdk.IResolvable;

    /**
     * Creates a pre-provisioning hook template.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html#cfn-iot-provisioningtemplate-preprovisioninghook
     */
    readonly preProvisioningHook?: CfnProvisioningTemplate.ProvisioningHookProperty | cdk.IResolvable;

    /**
     * Metadata that can be used to manage the fleet provisioning template.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html#cfn-iot-provisioningtemplate-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The name of the fleet provisioning template.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html#cfn-iot-provisioningtemplate-templatename
     */
    readonly templateName?: string;
}

/**
 * Determine whether the given properties match those of a `CfnProvisioningTemplateProps`
 *
 * @param properties - the TypeScript properties of a `CfnProvisioningTemplateProps`
 *
 * @returns the result of the validation.
 */
function CfnProvisioningTemplatePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    errors.collect(cdk.propertyValidator('preProvisioningHook', CfnProvisioningTemplate_ProvisioningHookPropertyValidator)(properties.preProvisioningHook));
    errors.collect(cdk.propertyValidator('provisioningRoleArn', cdk.requiredValidator)(properties.provisioningRoleArn));
    errors.collect(cdk.propertyValidator('provisioningRoleArn', cdk.validateString)(properties.provisioningRoleArn));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('templateBody', cdk.requiredValidator)(properties.templateBody));
    errors.collect(cdk.propertyValidator('templateBody', cdk.validateString)(properties.templateBody));
    errors.collect(cdk.propertyValidator('templateName', cdk.validateString)(properties.templateName));
    return errors.wrap('supplied properties not correct for "CfnProvisioningTemplateProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::ProvisioningTemplate` resource
 *
 * @param properties - the TypeScript properties of a `CfnProvisioningTemplateProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::ProvisioningTemplate` resource.
 */
// @ts-ignore TS6133
function cfnProvisioningTemplatePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnProvisioningTemplatePropsValidator(properties).assertSuccess();
    return {
        ProvisioningRoleArn: cdk.stringToCloudFormation(properties.provisioningRoleArn),
        TemplateBody: cdk.stringToCloudFormation(properties.templateBody),
        Description: cdk.stringToCloudFormation(properties.description),
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
        PreProvisioningHook: cfnProvisioningTemplateProvisioningHookPropertyToCloudFormation(properties.preProvisioningHook),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        TemplateName: cdk.stringToCloudFormation(properties.templateName),
    };
}

// @ts-ignore TS6133
function CfnProvisioningTemplatePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnProvisioningTemplateProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnProvisioningTemplateProps>();
    ret.addPropertyResult('provisioningRoleArn', 'ProvisioningRoleArn', cfn_parse.FromCloudFormation.getString(properties.ProvisioningRoleArn));
    ret.addPropertyResult('templateBody', 'TemplateBody', cfn_parse.FromCloudFormation.getString(properties.TemplateBody));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('enabled', 'Enabled', properties.Enabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enabled) : undefined);
    ret.addPropertyResult('preProvisioningHook', 'PreProvisioningHook', properties.PreProvisioningHook != null ? CfnProvisioningTemplateProvisioningHookPropertyFromCloudFormation(properties.PreProvisioningHook) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('templateName', 'TemplateName', properties.TemplateName != null ? cfn_parse.FromCloudFormation.getString(properties.TemplateName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::ProvisioningTemplate`
 *
 * Creates a fleet provisioning template.
 *
 * @cloudformationResource AWS::IoT::ProvisioningTemplate
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html
 */
export class CfnProvisioningTemplate extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::ProvisioningTemplate";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnProvisioningTemplate {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnProvisioningTemplatePropsFromCloudFormation(resourceProperties);
        const ret = new CfnProvisioningTemplate(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN that identifies the provisioning template.
     * @cloudformationAttribute TemplateArn
     */
    public readonly attrTemplateArn: string;

    /**
     * The role ARN for the role associated with the fleet provisioning template. This IoT role grants permission to provision a device.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html#cfn-iot-provisioningtemplate-provisioningrolearn
     */
    public provisioningRoleArn: string;

    /**
     * The JSON formatted contents of the fleet provisioning template version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html#cfn-iot-provisioningtemplate-templatebody
     */
    public templateBody: string;

    /**
     * The description of the fleet provisioning template.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html#cfn-iot-provisioningtemplate-description
     */
    public description: string | undefined;

    /**
     * True to enable the fleet provisioning template, otherwise false.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html#cfn-iot-provisioningtemplate-enabled
     */
    public enabled: boolean | cdk.IResolvable | undefined;

    /**
     * Creates a pre-provisioning hook template.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html#cfn-iot-provisioningtemplate-preprovisioninghook
     */
    public preProvisioningHook: CfnProvisioningTemplate.ProvisioningHookProperty | cdk.IResolvable | undefined;

    /**
     * Metadata that can be used to manage the fleet provisioning template.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html#cfn-iot-provisioningtemplate-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The name of the fleet provisioning template.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-provisioningtemplate.html#cfn-iot-provisioningtemplate-templatename
     */
    public templateName: string | undefined;

    /**
     * Create a new `AWS::IoT::ProvisioningTemplate`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnProvisioningTemplateProps) {
        super(scope, id, { type: CfnProvisioningTemplate.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'provisioningRoleArn', this);
        cdk.requireProperty(props, 'templateBody', this);
        this.attrTemplateArn = cdk.Token.asString(this.getAtt('TemplateArn'));

        this.provisioningRoleArn = props.provisioningRoleArn;
        this.templateBody = props.templateBody;
        this.description = props.description;
        this.enabled = props.enabled;
        this.preProvisioningHook = props.preProvisioningHook;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IoT::ProvisioningTemplate", props.tags, { tagPropertyName: 'tags' });
        this.templateName = props.templateName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnProvisioningTemplate.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            provisioningRoleArn: this.provisioningRoleArn,
            templateBody: this.templateBody,
            description: this.description,
            enabled: this.enabled,
            preProvisioningHook: this.preProvisioningHook,
            tags: this.tags.renderTags(),
            templateName: this.templateName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnProvisioningTemplatePropsToCloudFormation(props);
    }
}

export namespace CfnProvisioningTemplate {
    /**
     * Structure that contains payloadVersion and targetArn. Provisioning hooks can be used when fleet provisioning to validate device parameters before allowing the device to be provisioned.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-provisioningtemplate-provisioninghook.html
     */
    export interface ProvisioningHookProperty {
        /**
         * The payload that was sent to the target function. The valid payload is `"2020-04-01"` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-provisioningtemplate-provisioninghook.html#cfn-iot-provisioningtemplate-provisioninghook-payloadversion
         */
        readonly payloadVersion?: string;
        /**
         * The ARN of the target function.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-provisioningtemplate-provisioninghook.html#cfn-iot-provisioningtemplate-provisioninghook-targetarn
         */
        readonly targetArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ProvisioningHookProperty`
 *
 * @param properties - the TypeScript properties of a `ProvisioningHookProperty`
 *
 * @returns the result of the validation.
 */
function CfnProvisioningTemplate_ProvisioningHookPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('payloadVersion', cdk.validateString)(properties.payloadVersion));
    errors.collect(cdk.propertyValidator('targetArn', cdk.validateString)(properties.targetArn));
    return errors.wrap('supplied properties not correct for "ProvisioningHookProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::ProvisioningTemplate.ProvisioningHook` resource
 *
 * @param properties - the TypeScript properties of a `ProvisioningHookProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::ProvisioningTemplate.ProvisioningHook` resource.
 */
// @ts-ignore TS6133
function cfnProvisioningTemplateProvisioningHookPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnProvisioningTemplate_ProvisioningHookPropertyValidator(properties).assertSuccess();
    return {
        PayloadVersion: cdk.stringToCloudFormation(properties.payloadVersion),
        TargetArn: cdk.stringToCloudFormation(properties.targetArn),
    };
}

// @ts-ignore TS6133
function CfnProvisioningTemplateProvisioningHookPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnProvisioningTemplate.ProvisioningHookProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnProvisioningTemplate.ProvisioningHookProperty>();
    ret.addPropertyResult('payloadVersion', 'PayloadVersion', properties.PayloadVersion != null ? cfn_parse.FromCloudFormation.getString(properties.PayloadVersion) : undefined);
    ret.addPropertyResult('targetArn', 'TargetArn', properties.TargetArn != null ? cfn_parse.FromCloudFormation.getString(properties.TargetArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnResourceSpecificLogging`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-resourcespecificlogging.html
 */
export interface CfnResourceSpecificLoggingProps {

    /**
     * The default log level.Valid Values: `DEBUG | INFO | ERROR | WARN | DISABLED`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-resourcespecificlogging.html#cfn-iot-resourcespecificlogging-loglevel
     */
    readonly logLevel: string;

    /**
     * The target name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-resourcespecificlogging.html#cfn-iot-resourcespecificlogging-targetname
     */
    readonly targetName: string;

    /**
     * The target type. Valid Values: `DEFAULT | THING_GROUP`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-resourcespecificlogging.html#cfn-iot-resourcespecificlogging-targettype
     */
    readonly targetType: string;
}

/**
 * Determine whether the given properties match those of a `CfnResourceSpecificLoggingProps`
 *
 * @param properties - the TypeScript properties of a `CfnResourceSpecificLoggingProps`
 *
 * @returns the result of the validation.
 */
function CfnResourceSpecificLoggingPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('logLevel', cdk.requiredValidator)(properties.logLevel));
    errors.collect(cdk.propertyValidator('logLevel', cdk.validateString)(properties.logLevel));
    errors.collect(cdk.propertyValidator('targetName', cdk.requiredValidator)(properties.targetName));
    errors.collect(cdk.propertyValidator('targetName', cdk.validateString)(properties.targetName));
    errors.collect(cdk.propertyValidator('targetType', cdk.requiredValidator)(properties.targetType));
    errors.collect(cdk.propertyValidator('targetType', cdk.validateString)(properties.targetType));
    return errors.wrap('supplied properties not correct for "CfnResourceSpecificLoggingProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::ResourceSpecificLogging` resource
 *
 * @param properties - the TypeScript properties of a `CfnResourceSpecificLoggingProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::ResourceSpecificLogging` resource.
 */
// @ts-ignore TS6133
function cfnResourceSpecificLoggingPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnResourceSpecificLoggingPropsValidator(properties).assertSuccess();
    return {
        LogLevel: cdk.stringToCloudFormation(properties.logLevel),
        TargetName: cdk.stringToCloudFormation(properties.targetName),
        TargetType: cdk.stringToCloudFormation(properties.targetType),
    };
}

// @ts-ignore TS6133
function CfnResourceSpecificLoggingPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnResourceSpecificLoggingProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnResourceSpecificLoggingProps>();
    ret.addPropertyResult('logLevel', 'LogLevel', cfn_parse.FromCloudFormation.getString(properties.LogLevel));
    ret.addPropertyResult('targetName', 'TargetName', cfn_parse.FromCloudFormation.getString(properties.TargetName));
    ret.addPropertyResult('targetType', 'TargetType', cfn_parse.FromCloudFormation.getString(properties.TargetType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::ResourceSpecificLogging`
 *
 * Configure resource-specific logging.
 *
 * @cloudformationResource AWS::IoT::ResourceSpecificLogging
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-resourcespecificlogging.html
 */
export class CfnResourceSpecificLogging extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::ResourceSpecificLogging";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnResourceSpecificLogging {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnResourceSpecificLoggingPropsFromCloudFormation(resourceProperties);
        const ret = new CfnResourceSpecificLogging(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The target Id.
     * @cloudformationAttribute TargetId
     */
    public readonly attrTargetId: string;

    /**
     * The default log level.Valid Values: `DEBUG | INFO | ERROR | WARN | DISABLED`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-resourcespecificlogging.html#cfn-iot-resourcespecificlogging-loglevel
     */
    public logLevel: string;

    /**
     * The target name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-resourcespecificlogging.html#cfn-iot-resourcespecificlogging-targetname
     */
    public targetName: string;

    /**
     * The target type. Valid Values: `DEFAULT | THING_GROUP`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-resourcespecificlogging.html#cfn-iot-resourcespecificlogging-targettype
     */
    public targetType: string;

    /**
     * Create a new `AWS::IoT::ResourceSpecificLogging`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnResourceSpecificLoggingProps) {
        super(scope, id, { type: CfnResourceSpecificLogging.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'logLevel', this);
        cdk.requireProperty(props, 'targetName', this);
        cdk.requireProperty(props, 'targetType', this);
        this.attrTargetId = cdk.Token.asString(this.getAtt('TargetId'));

        this.logLevel = props.logLevel;
        this.targetName = props.targetName;
        this.targetType = props.targetType;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnResourceSpecificLogging.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            logLevel: this.logLevel,
            targetName: this.targetName,
            targetType: this.targetType,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnResourceSpecificLoggingPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnScheduledAudit`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-scheduledaudit.html
 */
export interface CfnScheduledAuditProps {

    /**
     * How often the scheduled audit occurs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-scheduledaudit.html#cfn-iot-scheduledaudit-frequency
     */
    readonly frequency: string;

    /**
     * Which checks are performed during the scheduled audit. Checks must be enabled for your account. (Use `DescribeAccountAuditConfiguration` to see the list of all checks, including those that are enabled or use `UpdateAccountAuditConfiguration` to select which checks are enabled.)
     *
     * The following checks are currently aviable:
     *
     * - `AUTHENTICATED_COGNITO_ROLE_OVERLY_PERMISSIVE_CHECK`
     * - `CA_CERTIFICATE_EXPIRING_CHECK`
     * - `CA_CERTIFICATE_KEY_QUALITY_CHECK`
     * - `CONFLICTING_CLIENT_IDS_CHECK`
     * - `DEVICE_CERTIFICATE_EXPIRING_CHECK`
     * - `DEVICE_CERTIFICATE_KEY_QUALITY_CHECK`
     * - `DEVICE_CERTIFICATE_SHARED_CHECK`
     * - `IOT_POLICY_OVERLY_PERMISSIVE_CHECK`
     * - `IOT_ROLE_ALIAS_ALLOWS_ACCESS_TO_UNUSED_SERVICES_CHECK`
     * - `IOT_ROLE_ALIAS_OVERLY_PERMISSIVE_CHECK`
     * - `LOGGING_DISABLED_CHECK`
     * - `REVOKED_CA_CERTIFICATE_STILL_ACTIVE_CHECK`
     * - `REVOKED_DEVICE_CERTIFICATE_STILL_ACTIVE_CHECK`
     * - `UNAUTHENTICATED_COGNITO_ROLE_OVERLY_PERMISSIVE_CHECK`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-scheduledaudit.html#cfn-iot-scheduledaudit-targetchecknames
     */
    readonly targetCheckNames: string[];

    /**
     * The day of the month on which the scheduled audit is run (if the `frequency` is "MONTHLY"). If days 29-31 are specified, and the month does not have that many days, the audit takes place on the "LAST" day of the month.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-scheduledaudit.html#cfn-iot-scheduledaudit-dayofmonth
     */
    readonly dayOfMonth?: string;

    /**
     * The day of the week on which the scheduled audit is run (if the `frequency` is "WEEKLY" or "BIWEEKLY").
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-scheduledaudit.html#cfn-iot-scheduledaudit-dayofweek
     */
    readonly dayOfWeek?: string;

    /**
     * The name of the scheduled audit.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-scheduledaudit.html#cfn-iot-scheduledaudit-scheduledauditname
     */
    readonly scheduledAuditName?: string;

    /**
     * Metadata that can be used to manage the scheduled audit.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-scheduledaudit.html#cfn-iot-scheduledaudit-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnScheduledAuditProps`
 *
 * @param properties - the TypeScript properties of a `CfnScheduledAuditProps`
 *
 * @returns the result of the validation.
 */
function CfnScheduledAuditPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dayOfMonth', cdk.validateString)(properties.dayOfMonth));
    errors.collect(cdk.propertyValidator('dayOfWeek', cdk.validateString)(properties.dayOfWeek));
    errors.collect(cdk.propertyValidator('frequency', cdk.requiredValidator)(properties.frequency));
    errors.collect(cdk.propertyValidator('frequency', cdk.validateString)(properties.frequency));
    errors.collect(cdk.propertyValidator('scheduledAuditName', cdk.validateString)(properties.scheduledAuditName));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('targetCheckNames', cdk.requiredValidator)(properties.targetCheckNames));
    errors.collect(cdk.propertyValidator('targetCheckNames', cdk.listValidator(cdk.validateString))(properties.targetCheckNames));
    return errors.wrap('supplied properties not correct for "CfnScheduledAuditProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::ScheduledAudit` resource
 *
 * @param properties - the TypeScript properties of a `CfnScheduledAuditProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::ScheduledAudit` resource.
 */
// @ts-ignore TS6133
function cfnScheduledAuditPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScheduledAuditPropsValidator(properties).assertSuccess();
    return {
        Frequency: cdk.stringToCloudFormation(properties.frequency),
        TargetCheckNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.targetCheckNames),
        DayOfMonth: cdk.stringToCloudFormation(properties.dayOfMonth),
        DayOfWeek: cdk.stringToCloudFormation(properties.dayOfWeek),
        ScheduledAuditName: cdk.stringToCloudFormation(properties.scheduledAuditName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnScheduledAuditPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScheduledAuditProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScheduledAuditProps>();
    ret.addPropertyResult('frequency', 'Frequency', cfn_parse.FromCloudFormation.getString(properties.Frequency));
    ret.addPropertyResult('targetCheckNames', 'TargetCheckNames', cfn_parse.FromCloudFormation.getStringArray(properties.TargetCheckNames));
    ret.addPropertyResult('dayOfMonth', 'DayOfMonth', properties.DayOfMonth != null ? cfn_parse.FromCloudFormation.getString(properties.DayOfMonth) : undefined);
    ret.addPropertyResult('dayOfWeek', 'DayOfWeek', properties.DayOfWeek != null ? cfn_parse.FromCloudFormation.getString(properties.DayOfWeek) : undefined);
    ret.addPropertyResult('scheduledAuditName', 'ScheduledAuditName', properties.ScheduledAuditName != null ? cfn_parse.FromCloudFormation.getString(properties.ScheduledAuditName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::ScheduledAudit`
 *
 * Use the `AWS::IoT::ScheduledAudit` resource to create a scheduled audit that is run at a specified time interval. For API reference, see [CreateScheduleAudit](https://docs.aws.amazon.com/iot/latest/apireference/API_CreateScheduledAudit.html) and for general information, see [Audit](https://docs.aws.amazon.com/iot/latest/developerguide/device-defender-audit.html) .
 *
 * @cloudformationResource AWS::IoT::ScheduledAudit
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-scheduledaudit.html
 */
export class CfnScheduledAudit extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::ScheduledAudit";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnScheduledAudit {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnScheduledAuditPropsFromCloudFormation(resourceProperties);
        const ret = new CfnScheduledAudit(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the scheduled audit.
     * @cloudformationAttribute ScheduledAuditArn
     */
    public readonly attrScheduledAuditArn: string;

    /**
     * How often the scheduled audit occurs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-scheduledaudit.html#cfn-iot-scheduledaudit-frequency
     */
    public frequency: string;

    /**
     * Which checks are performed during the scheduled audit. Checks must be enabled for your account. (Use `DescribeAccountAuditConfiguration` to see the list of all checks, including those that are enabled or use `UpdateAccountAuditConfiguration` to select which checks are enabled.)
     *
     * The following checks are currently aviable:
     *
     * - `AUTHENTICATED_COGNITO_ROLE_OVERLY_PERMISSIVE_CHECK`
     * - `CA_CERTIFICATE_EXPIRING_CHECK`
     * - `CA_CERTIFICATE_KEY_QUALITY_CHECK`
     * - `CONFLICTING_CLIENT_IDS_CHECK`
     * - `DEVICE_CERTIFICATE_EXPIRING_CHECK`
     * - `DEVICE_CERTIFICATE_KEY_QUALITY_CHECK`
     * - `DEVICE_CERTIFICATE_SHARED_CHECK`
     * - `IOT_POLICY_OVERLY_PERMISSIVE_CHECK`
     * - `IOT_ROLE_ALIAS_ALLOWS_ACCESS_TO_UNUSED_SERVICES_CHECK`
     * - `IOT_ROLE_ALIAS_OVERLY_PERMISSIVE_CHECK`
     * - `LOGGING_DISABLED_CHECK`
     * - `REVOKED_CA_CERTIFICATE_STILL_ACTIVE_CHECK`
     * - `REVOKED_DEVICE_CERTIFICATE_STILL_ACTIVE_CHECK`
     * - `UNAUTHENTICATED_COGNITO_ROLE_OVERLY_PERMISSIVE_CHECK`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-scheduledaudit.html#cfn-iot-scheduledaudit-targetchecknames
     */
    public targetCheckNames: string[];

    /**
     * The day of the month on which the scheduled audit is run (if the `frequency` is "MONTHLY"). If days 29-31 are specified, and the month does not have that many days, the audit takes place on the "LAST" day of the month.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-scheduledaudit.html#cfn-iot-scheduledaudit-dayofmonth
     */
    public dayOfMonth: string | undefined;

    /**
     * The day of the week on which the scheduled audit is run (if the `frequency` is "WEEKLY" or "BIWEEKLY").
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-scheduledaudit.html#cfn-iot-scheduledaudit-dayofweek
     */
    public dayOfWeek: string | undefined;

    /**
     * The name of the scheduled audit.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-scheduledaudit.html#cfn-iot-scheduledaudit-scheduledauditname
     */
    public scheduledAuditName: string | undefined;

    /**
     * Metadata that can be used to manage the scheduled audit.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-scheduledaudit.html#cfn-iot-scheduledaudit-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::IoT::ScheduledAudit`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnScheduledAuditProps) {
        super(scope, id, { type: CfnScheduledAudit.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'frequency', this);
        cdk.requireProperty(props, 'targetCheckNames', this);
        this.attrScheduledAuditArn = cdk.Token.asString(this.getAtt('ScheduledAuditArn'));

        this.frequency = props.frequency;
        this.targetCheckNames = props.targetCheckNames;
        this.dayOfMonth = props.dayOfMonth;
        this.dayOfWeek = props.dayOfWeek;
        this.scheduledAuditName = props.scheduledAuditName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IoT::ScheduledAudit", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnScheduledAudit.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            frequency: this.frequency,
            targetCheckNames: this.targetCheckNames,
            dayOfMonth: this.dayOfMonth,
            dayOfWeek: this.dayOfWeek,
            scheduledAuditName: this.scheduledAuditName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnScheduledAuditPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnSecurityProfile`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html
 */
export interface CfnSecurityProfileProps {

    /**
     * A list of metrics whose data is retained (stored). By default, data is retained for any metric used in the profile's `behaviors` , but it's also retained for any metric specified here. Can be used with custom metrics; can't be used with dimensions.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html#cfn-iot-securityprofile-additionalmetricstoretainv2
     */
    readonly additionalMetricsToRetainV2?: Array<CfnSecurityProfile.MetricToRetainProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Specifies the destinations to which alerts are sent. (Alerts are always sent to the console.) Alerts are generated when a device (thing) violates a behavior.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html#cfn-iot-securityprofile-alerttargets
     */
    readonly alertTargets?: { [key: string]: (CfnSecurityProfile.AlertTargetProperty | cdk.IResolvable) } | cdk.IResolvable;

    /**
     * Specifies the behaviors that, when violated by a device (thing), cause an alert.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html#cfn-iot-securityprofile-behaviors
     */
    readonly behaviors?: Array<CfnSecurityProfile.BehaviorProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A description of the security profile.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html#cfn-iot-securityprofile-securityprofiledescription
     */
    readonly securityProfileDescription?: string;

    /**
     * The name you gave to the security profile.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html#cfn-iot-securityprofile-securityprofilename
     */
    readonly securityProfileName?: string;

    /**
     * Metadata that can be used to manage the security profile.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html#cfn-iot-securityprofile-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The ARN of the target (thing group) to which the security profile is attached.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html#cfn-iot-securityprofile-targetarns
     */
    readonly targetArns?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnSecurityProfileProps`
 *
 * @param properties - the TypeScript properties of a `CfnSecurityProfileProps`
 *
 * @returns the result of the validation.
 */
function CfnSecurityProfilePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('additionalMetricsToRetainV2', cdk.listValidator(CfnSecurityProfile_MetricToRetainPropertyValidator))(properties.additionalMetricsToRetainV2));
    errors.collect(cdk.propertyValidator('alertTargets', cdk.hashValidator(CfnSecurityProfile_AlertTargetPropertyValidator))(properties.alertTargets));
    errors.collect(cdk.propertyValidator('behaviors', cdk.listValidator(CfnSecurityProfile_BehaviorPropertyValidator))(properties.behaviors));
    errors.collect(cdk.propertyValidator('securityProfileDescription', cdk.validateString)(properties.securityProfileDescription));
    errors.collect(cdk.propertyValidator('securityProfileName', cdk.validateString)(properties.securityProfileName));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('targetArns', cdk.listValidator(cdk.validateString))(properties.targetArns));
    return errors.wrap('supplied properties not correct for "CfnSecurityProfileProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile` resource
 *
 * @param properties - the TypeScript properties of a `CfnSecurityProfileProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile` resource.
 */
// @ts-ignore TS6133
function cfnSecurityProfilePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSecurityProfilePropsValidator(properties).assertSuccess();
    return {
        AdditionalMetricsToRetainV2: cdk.listMapper(cfnSecurityProfileMetricToRetainPropertyToCloudFormation)(properties.additionalMetricsToRetainV2),
        AlertTargets: cdk.hashMapper(cfnSecurityProfileAlertTargetPropertyToCloudFormation)(properties.alertTargets),
        Behaviors: cdk.listMapper(cfnSecurityProfileBehaviorPropertyToCloudFormation)(properties.behaviors),
        SecurityProfileDescription: cdk.stringToCloudFormation(properties.securityProfileDescription),
        SecurityProfileName: cdk.stringToCloudFormation(properties.securityProfileName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        TargetArns: cdk.listMapper(cdk.stringToCloudFormation)(properties.targetArns),
    };
}

// @ts-ignore TS6133
function CfnSecurityProfilePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSecurityProfileProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSecurityProfileProps>();
    ret.addPropertyResult('additionalMetricsToRetainV2', 'AdditionalMetricsToRetainV2', properties.AdditionalMetricsToRetainV2 != null ? cfn_parse.FromCloudFormation.getArray(CfnSecurityProfileMetricToRetainPropertyFromCloudFormation)(properties.AdditionalMetricsToRetainV2) : undefined);
    ret.addPropertyResult('alertTargets', 'AlertTargets', properties.AlertTargets != null ? cfn_parse.FromCloudFormation.getMap(CfnSecurityProfileAlertTargetPropertyFromCloudFormation)(properties.AlertTargets) : undefined);
    ret.addPropertyResult('behaviors', 'Behaviors', properties.Behaviors != null ? cfn_parse.FromCloudFormation.getArray(CfnSecurityProfileBehaviorPropertyFromCloudFormation)(properties.Behaviors) : undefined);
    ret.addPropertyResult('securityProfileDescription', 'SecurityProfileDescription', properties.SecurityProfileDescription != null ? cfn_parse.FromCloudFormation.getString(properties.SecurityProfileDescription) : undefined);
    ret.addPropertyResult('securityProfileName', 'SecurityProfileName', properties.SecurityProfileName != null ? cfn_parse.FromCloudFormation.getString(properties.SecurityProfileName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('targetArns', 'TargetArns', properties.TargetArns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.TargetArns) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::SecurityProfile`
 *
 * Use the `AWS::IoT::SecurityProfile` resource to create a Device Defender security profile. For API reference, see [CreateSecurityProfile](https://docs.aws.amazon.com/iot/latest/apireference/API_CreateSecurityProfile.html) and for general information, see [Detect](https://docs.aws.amazon.com/iot/latest/developerguide/device-defender-detect.html) .
 *
 * @cloudformationResource AWS::IoT::SecurityProfile
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html
 */
export class CfnSecurityProfile extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::SecurityProfile";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnSecurityProfile {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnSecurityProfilePropsFromCloudFormation(resourceProperties);
        const ret = new CfnSecurityProfile(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the security profile.
     * @cloudformationAttribute SecurityProfileArn
     */
    public readonly attrSecurityProfileArn: string;

    /**
     * A list of metrics whose data is retained (stored). By default, data is retained for any metric used in the profile's `behaviors` , but it's also retained for any metric specified here. Can be used with custom metrics; can't be used with dimensions.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html#cfn-iot-securityprofile-additionalmetricstoretainv2
     */
    public additionalMetricsToRetainV2: Array<CfnSecurityProfile.MetricToRetainProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Specifies the destinations to which alerts are sent. (Alerts are always sent to the console.) Alerts are generated when a device (thing) violates a behavior.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html#cfn-iot-securityprofile-alerttargets
     */
    public alertTargets: { [key: string]: (CfnSecurityProfile.AlertTargetProperty | cdk.IResolvable) } | cdk.IResolvable | undefined;

    /**
     * Specifies the behaviors that, when violated by a device (thing), cause an alert.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html#cfn-iot-securityprofile-behaviors
     */
    public behaviors: Array<CfnSecurityProfile.BehaviorProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * A description of the security profile.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html#cfn-iot-securityprofile-securityprofiledescription
     */
    public securityProfileDescription: string | undefined;

    /**
     * The name you gave to the security profile.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html#cfn-iot-securityprofile-securityprofilename
     */
    public securityProfileName: string | undefined;

    /**
     * Metadata that can be used to manage the security profile.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html#cfn-iot-securityprofile-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The ARN of the target (thing group) to which the security profile is attached.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html#cfn-iot-securityprofile-targetarns
     */
    public targetArns: string[] | undefined;

    /**
     * Create a new `AWS::IoT::SecurityProfile`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnSecurityProfileProps = {}) {
        super(scope, id, { type: CfnSecurityProfile.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrSecurityProfileArn = cdk.Token.asString(this.getAtt('SecurityProfileArn'));

        this.additionalMetricsToRetainV2 = props.additionalMetricsToRetainV2;
        this.alertTargets = props.alertTargets;
        this.behaviors = props.behaviors;
        this.securityProfileDescription = props.securityProfileDescription;
        this.securityProfileName = props.securityProfileName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IoT::SecurityProfile", props.tags, { tagPropertyName: 'tags' });
        this.targetArns = props.targetArns;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnSecurityProfile.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            additionalMetricsToRetainV2: this.additionalMetricsToRetainV2,
            alertTargets: this.alertTargets,
            behaviors: this.behaviors,
            securityProfileDescription: this.securityProfileDescription,
            securityProfileName: this.securityProfileName,
            tags: this.tags.renderTags(),
            targetArns: this.targetArns,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnSecurityProfilePropsToCloudFormation(props);
    }
}

export namespace CfnSecurityProfile {
    /**
     * A structure containing the alert target ARN and the role ARN.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-alerttarget.html
     */
    export interface AlertTargetProperty {
        /**
         * The Amazon Resource Name (ARN) of the notification target to which alerts are sent.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-alerttarget.html#cfn-iot-securityprofile-alerttarget-alerttargetarn
         */
        readonly alertTargetArn: string;
        /**
         * The ARN of the role that grants permission to send alerts to the notification target.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-alerttarget.html#cfn-iot-securityprofile-alerttarget-rolearn
         */
        readonly roleArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `AlertTargetProperty`
 *
 * @param properties - the TypeScript properties of a `AlertTargetProperty`
 *
 * @returns the result of the validation.
 */
function CfnSecurityProfile_AlertTargetPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('alertTargetArn', cdk.requiredValidator)(properties.alertTargetArn));
    errors.collect(cdk.propertyValidator('alertTargetArn', cdk.validateString)(properties.alertTargetArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "AlertTargetProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.AlertTarget` resource
 *
 * @param properties - the TypeScript properties of a `AlertTargetProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.AlertTarget` resource.
 */
// @ts-ignore TS6133
function cfnSecurityProfileAlertTargetPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSecurityProfile_AlertTargetPropertyValidator(properties).assertSuccess();
    return {
        AlertTargetArn: cdk.stringToCloudFormation(properties.alertTargetArn),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnSecurityProfileAlertTargetPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSecurityProfile.AlertTargetProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSecurityProfile.AlertTargetProperty>();
    ret.addPropertyResult('alertTargetArn', 'AlertTargetArn', cfn_parse.FromCloudFormation.getString(properties.AlertTargetArn));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnSecurityProfile {
    /**
     * A Device Defender security profile behavior.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-behavior.html
     */
    export interface BehaviorProperty {
        /**
         * The criteria that determine if a device is behaving normally in regard to the `metric` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-behavior.html#cfn-iot-securityprofile-behavior-criteria
         */
        readonly criteria?: CfnSecurityProfile.BehaviorCriteriaProperty | cdk.IResolvable;
        /**
         * What is measured by the behavior.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-behavior.html#cfn-iot-securityprofile-behavior-metric
         */
        readonly metric?: string;
        /**
         * The dimension of the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-behavior.html#cfn-iot-securityprofile-behavior-metricdimension
         */
        readonly metricDimension?: CfnSecurityProfile.MetricDimensionProperty | cdk.IResolvable;
        /**
         * The name you've given to the behavior.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-behavior.html#cfn-iot-securityprofile-behavior-name
         */
        readonly name: string;
        /**
         * The alert status. If you set the value to `true` , alerts will be suppressed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-behavior.html#cfn-iot-securityprofile-behavior-suppressalerts
         */
        readonly suppressAlerts?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `BehaviorProperty`
 *
 * @param properties - the TypeScript properties of a `BehaviorProperty`
 *
 * @returns the result of the validation.
 */
function CfnSecurityProfile_BehaviorPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('criteria', CfnSecurityProfile_BehaviorCriteriaPropertyValidator)(properties.criteria));
    errors.collect(cdk.propertyValidator('metric', cdk.validateString)(properties.metric));
    errors.collect(cdk.propertyValidator('metricDimension', CfnSecurityProfile_MetricDimensionPropertyValidator)(properties.metricDimension));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('suppressAlerts', cdk.validateBoolean)(properties.suppressAlerts));
    return errors.wrap('supplied properties not correct for "BehaviorProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.Behavior` resource
 *
 * @param properties - the TypeScript properties of a `BehaviorProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.Behavior` resource.
 */
// @ts-ignore TS6133
function cfnSecurityProfileBehaviorPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSecurityProfile_BehaviorPropertyValidator(properties).assertSuccess();
    return {
        Criteria: cfnSecurityProfileBehaviorCriteriaPropertyToCloudFormation(properties.criteria),
        Metric: cdk.stringToCloudFormation(properties.metric),
        MetricDimension: cfnSecurityProfileMetricDimensionPropertyToCloudFormation(properties.metricDimension),
        Name: cdk.stringToCloudFormation(properties.name),
        SuppressAlerts: cdk.booleanToCloudFormation(properties.suppressAlerts),
    };
}

// @ts-ignore TS6133
function CfnSecurityProfileBehaviorPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSecurityProfile.BehaviorProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSecurityProfile.BehaviorProperty>();
    ret.addPropertyResult('criteria', 'Criteria', properties.Criteria != null ? CfnSecurityProfileBehaviorCriteriaPropertyFromCloudFormation(properties.Criteria) : undefined);
    ret.addPropertyResult('metric', 'Metric', properties.Metric != null ? cfn_parse.FromCloudFormation.getString(properties.Metric) : undefined);
    ret.addPropertyResult('metricDimension', 'MetricDimension', properties.MetricDimension != null ? CfnSecurityProfileMetricDimensionPropertyFromCloudFormation(properties.MetricDimension) : undefined);
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('suppressAlerts', 'SuppressAlerts', properties.SuppressAlerts != null ? cfn_parse.FromCloudFormation.getBoolean(properties.SuppressAlerts) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnSecurityProfile {
    /**
     * The criteria by which the behavior is determined to be normal.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-behaviorcriteria.html
     */
    export interface BehaviorCriteriaProperty {
        /**
         * The operator that relates the thing measured ( `metric` ) to the criteria (containing a `value` or `statisticalThreshold` ). Valid operators include:
         *
         * - `string-list` : `in-set` and `not-in-set`
         * - `number-list` : `in-set` and `not-in-set`
         * - `ip-address-list` : `in-cidr-set` and `not-in-cidr-set`
         * - `number` : `less-than` , `less-than-equals` , `greater-than` , and `greater-than-equals`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-behaviorcriteria.html#cfn-iot-securityprofile-behaviorcriteria-comparisonoperator
         */
        readonly comparisonOperator?: string;
        /**
         * If a device is in violation of the behavior for the specified number of consecutive datapoints, an alarm occurs. If not specified, the default is 1.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-behaviorcriteria.html#cfn-iot-securityprofile-behaviorcriteria-consecutivedatapointstoalarm
         */
        readonly consecutiveDatapointsToAlarm?: number;
        /**
         * If an alarm has occurred and the offending device is no longer in violation of the behavior for the specified number of consecutive datapoints, the alarm is cleared. If not specified, the default is 1.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-behaviorcriteria.html#cfn-iot-securityprofile-behaviorcriteria-consecutivedatapointstoclear
         */
        readonly consecutiveDatapointsToClear?: number;
        /**
         * Use this to specify the time duration over which the behavior is evaluated, for those criteria that have a time dimension (for example, `NUM_MESSAGES_SENT` ). For a `statisticalThreshhold` metric comparison, measurements from all devices are accumulated over this time duration before being used to calculate percentiles, and later, measurements from an individual device are also accumulated over this time duration before being given a percentile rank. Cannot be used with list-based metric datatypes.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-behaviorcriteria.html#cfn-iot-securityprofile-behaviorcriteria-durationseconds
         */
        readonly durationSeconds?: number;
        /**
         * The confidence level of the detection model.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-behaviorcriteria.html#cfn-iot-securityprofile-behaviorcriteria-mldetectionconfig
         */
        readonly mlDetectionConfig?: CfnSecurityProfile.MachineLearningDetectionConfigProperty | cdk.IResolvable;
        /**
         * A statistical ranking (percentile)that indicates a threshold value by which a behavior is determined to be in compliance or in violation of the behavior.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-behaviorcriteria.html#cfn-iot-securityprofile-behaviorcriteria-statisticalthreshold
         */
        readonly statisticalThreshold?: CfnSecurityProfile.StatisticalThresholdProperty | cdk.IResolvable;
        /**
         * The value to be compared with the `metric` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-behaviorcriteria.html#cfn-iot-securityprofile-behaviorcriteria-value
         */
        readonly value?: CfnSecurityProfile.MetricValueProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `BehaviorCriteriaProperty`
 *
 * @param properties - the TypeScript properties of a `BehaviorCriteriaProperty`
 *
 * @returns the result of the validation.
 */
function CfnSecurityProfile_BehaviorCriteriaPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('comparisonOperator', cdk.validateString)(properties.comparisonOperator));
    errors.collect(cdk.propertyValidator('consecutiveDatapointsToAlarm', cdk.validateNumber)(properties.consecutiveDatapointsToAlarm));
    errors.collect(cdk.propertyValidator('consecutiveDatapointsToClear', cdk.validateNumber)(properties.consecutiveDatapointsToClear));
    errors.collect(cdk.propertyValidator('durationSeconds', cdk.validateNumber)(properties.durationSeconds));
    errors.collect(cdk.propertyValidator('mlDetectionConfig', CfnSecurityProfile_MachineLearningDetectionConfigPropertyValidator)(properties.mlDetectionConfig));
    errors.collect(cdk.propertyValidator('statisticalThreshold', CfnSecurityProfile_StatisticalThresholdPropertyValidator)(properties.statisticalThreshold));
    errors.collect(cdk.propertyValidator('value', CfnSecurityProfile_MetricValuePropertyValidator)(properties.value));
    return errors.wrap('supplied properties not correct for "BehaviorCriteriaProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.BehaviorCriteria` resource
 *
 * @param properties - the TypeScript properties of a `BehaviorCriteriaProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.BehaviorCriteria` resource.
 */
// @ts-ignore TS6133
function cfnSecurityProfileBehaviorCriteriaPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSecurityProfile_BehaviorCriteriaPropertyValidator(properties).assertSuccess();
    return {
        ComparisonOperator: cdk.stringToCloudFormation(properties.comparisonOperator),
        ConsecutiveDatapointsToAlarm: cdk.numberToCloudFormation(properties.consecutiveDatapointsToAlarm),
        ConsecutiveDatapointsToClear: cdk.numberToCloudFormation(properties.consecutiveDatapointsToClear),
        DurationSeconds: cdk.numberToCloudFormation(properties.durationSeconds),
        MlDetectionConfig: cfnSecurityProfileMachineLearningDetectionConfigPropertyToCloudFormation(properties.mlDetectionConfig),
        StatisticalThreshold: cfnSecurityProfileStatisticalThresholdPropertyToCloudFormation(properties.statisticalThreshold),
        Value: cfnSecurityProfileMetricValuePropertyToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnSecurityProfileBehaviorCriteriaPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSecurityProfile.BehaviorCriteriaProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSecurityProfile.BehaviorCriteriaProperty>();
    ret.addPropertyResult('comparisonOperator', 'ComparisonOperator', properties.ComparisonOperator != null ? cfn_parse.FromCloudFormation.getString(properties.ComparisonOperator) : undefined);
    ret.addPropertyResult('consecutiveDatapointsToAlarm', 'ConsecutiveDatapointsToAlarm', properties.ConsecutiveDatapointsToAlarm != null ? cfn_parse.FromCloudFormation.getNumber(properties.ConsecutiveDatapointsToAlarm) : undefined);
    ret.addPropertyResult('consecutiveDatapointsToClear', 'ConsecutiveDatapointsToClear', properties.ConsecutiveDatapointsToClear != null ? cfn_parse.FromCloudFormation.getNumber(properties.ConsecutiveDatapointsToClear) : undefined);
    ret.addPropertyResult('durationSeconds', 'DurationSeconds', properties.DurationSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.DurationSeconds) : undefined);
    ret.addPropertyResult('mlDetectionConfig', 'MlDetectionConfig', properties.MlDetectionConfig != null ? CfnSecurityProfileMachineLearningDetectionConfigPropertyFromCloudFormation(properties.MlDetectionConfig) : undefined);
    ret.addPropertyResult('statisticalThreshold', 'StatisticalThreshold', properties.StatisticalThreshold != null ? CfnSecurityProfileStatisticalThresholdPropertyFromCloudFormation(properties.StatisticalThreshold) : undefined);
    ret.addPropertyResult('value', 'Value', properties.Value != null ? CfnSecurityProfileMetricValuePropertyFromCloudFormation(properties.Value) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnSecurityProfile {
    /**
     * The `MachineLearningDetectionConfig` property type controls confidence of the machine learning model.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-machinelearningdetectionconfig.html
     */
    export interface MachineLearningDetectionConfigProperty {
        /**
         * The model confidence level.
         *
         * There are three levels of confidence, `"high"` , `"medium"` , and `"low"` .
         *
         * The higher the confidence level, the lower the sensitivity, and the lower the alarm frequency will be.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-machinelearningdetectionconfig.html#cfn-iot-securityprofile-machinelearningdetectionconfig-confidencelevel
         */
        readonly confidenceLevel?: string;
    }
}

/**
 * Determine whether the given properties match those of a `MachineLearningDetectionConfigProperty`
 *
 * @param properties - the TypeScript properties of a `MachineLearningDetectionConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnSecurityProfile_MachineLearningDetectionConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('confidenceLevel', cdk.validateString)(properties.confidenceLevel));
    return errors.wrap('supplied properties not correct for "MachineLearningDetectionConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.MachineLearningDetectionConfig` resource
 *
 * @param properties - the TypeScript properties of a `MachineLearningDetectionConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.MachineLearningDetectionConfig` resource.
 */
// @ts-ignore TS6133
function cfnSecurityProfileMachineLearningDetectionConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSecurityProfile_MachineLearningDetectionConfigPropertyValidator(properties).assertSuccess();
    return {
        ConfidenceLevel: cdk.stringToCloudFormation(properties.confidenceLevel),
    };
}

// @ts-ignore TS6133
function CfnSecurityProfileMachineLearningDetectionConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSecurityProfile.MachineLearningDetectionConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSecurityProfile.MachineLearningDetectionConfigProperty>();
    ret.addPropertyResult('confidenceLevel', 'ConfidenceLevel', properties.ConfidenceLevel != null ? cfn_parse.FromCloudFormation.getString(properties.ConfidenceLevel) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnSecurityProfile {
    /**
     * The dimension of the metric.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-metricdimension.html
     */
    export interface MetricDimensionProperty {
        /**
         * The name of the dimension.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-metricdimension.html#cfn-iot-securityprofile-metricdimension-dimensionname
         */
        readonly dimensionName: string;
        /**
         * Operators are constructs that perform logical operations. Valid values are `IN` and `NOT_IN` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-metricdimension.html#cfn-iot-securityprofile-metricdimension-operator
         */
        readonly operator?: string;
    }
}

/**
 * Determine whether the given properties match those of a `MetricDimensionProperty`
 *
 * @param properties - the TypeScript properties of a `MetricDimensionProperty`
 *
 * @returns the result of the validation.
 */
function CfnSecurityProfile_MetricDimensionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dimensionName', cdk.requiredValidator)(properties.dimensionName));
    errors.collect(cdk.propertyValidator('dimensionName', cdk.validateString)(properties.dimensionName));
    errors.collect(cdk.propertyValidator('operator', cdk.validateString)(properties.operator));
    return errors.wrap('supplied properties not correct for "MetricDimensionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.MetricDimension` resource
 *
 * @param properties - the TypeScript properties of a `MetricDimensionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.MetricDimension` resource.
 */
// @ts-ignore TS6133
function cfnSecurityProfileMetricDimensionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSecurityProfile_MetricDimensionPropertyValidator(properties).assertSuccess();
    return {
        DimensionName: cdk.stringToCloudFormation(properties.dimensionName),
        Operator: cdk.stringToCloudFormation(properties.operator),
    };
}

// @ts-ignore TS6133
function CfnSecurityProfileMetricDimensionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSecurityProfile.MetricDimensionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSecurityProfile.MetricDimensionProperty>();
    ret.addPropertyResult('dimensionName', 'DimensionName', cfn_parse.FromCloudFormation.getString(properties.DimensionName));
    ret.addPropertyResult('operator', 'Operator', properties.Operator != null ? cfn_parse.FromCloudFormation.getString(properties.Operator) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnSecurityProfile {
    /**
     * The metric you want to retain. Dimensions are optional.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-metrictoretain.html
     */
    export interface MetricToRetainProperty {
        /**
         * A standard of measurement.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-metrictoretain.html#cfn-iot-securityprofile-metrictoretain-metric
         */
        readonly metric: string;
        /**
         * The dimension of the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-metrictoretain.html#cfn-iot-securityprofile-metrictoretain-metricdimension
         */
        readonly metricDimension?: CfnSecurityProfile.MetricDimensionProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MetricToRetainProperty`
 *
 * @param properties - the TypeScript properties of a `MetricToRetainProperty`
 *
 * @returns the result of the validation.
 */
function CfnSecurityProfile_MetricToRetainPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('metric', cdk.requiredValidator)(properties.metric));
    errors.collect(cdk.propertyValidator('metric', cdk.validateString)(properties.metric));
    errors.collect(cdk.propertyValidator('metricDimension', CfnSecurityProfile_MetricDimensionPropertyValidator)(properties.metricDimension));
    return errors.wrap('supplied properties not correct for "MetricToRetainProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.MetricToRetain` resource
 *
 * @param properties - the TypeScript properties of a `MetricToRetainProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.MetricToRetain` resource.
 */
// @ts-ignore TS6133
function cfnSecurityProfileMetricToRetainPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSecurityProfile_MetricToRetainPropertyValidator(properties).assertSuccess();
    return {
        Metric: cdk.stringToCloudFormation(properties.metric),
        MetricDimension: cfnSecurityProfileMetricDimensionPropertyToCloudFormation(properties.metricDimension),
    };
}

// @ts-ignore TS6133
function CfnSecurityProfileMetricToRetainPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSecurityProfile.MetricToRetainProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSecurityProfile.MetricToRetainProperty>();
    ret.addPropertyResult('metric', 'Metric', cfn_parse.FromCloudFormation.getString(properties.Metric));
    ret.addPropertyResult('metricDimension', 'MetricDimension', properties.MetricDimension != null ? CfnSecurityProfileMetricDimensionPropertyFromCloudFormation(properties.MetricDimension) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnSecurityProfile {
    /**
     * The value to be compared with the `metric` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-metricvalue.html
     */
    export interface MetricValueProperty {
        /**
         * If the `comparisonOperator` calls for a set of CIDRs, use this to specify that set to be compared with the `metric` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-metricvalue.html#cfn-iot-securityprofile-metricvalue-cidrs
         */
        readonly cidrs?: string[];
        /**
         * If the `comparisonOperator` calls for a numeric value, use this to specify that numeric value to be compared with the `metric` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-metricvalue.html#cfn-iot-securityprofile-metricvalue-count
         */
        readonly count?: string;
        /**
         * The numeric values of a metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-metricvalue.html#cfn-iot-securityprofile-metricvalue-number
         */
        readonly number?: number;
        /**
         * The numeric value of a metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-metricvalue.html#cfn-iot-securityprofile-metricvalue-numbers
         */
        readonly numbers?: number[] | cdk.IResolvable;
        /**
         * If the `comparisonOperator` calls for a set of ports, use this to specify that set to be compared with the `metric` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-metricvalue.html#cfn-iot-securityprofile-metricvalue-ports
         */
        readonly ports?: number[] | cdk.IResolvable;
        /**
         * The string values of a metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-metricvalue.html#cfn-iot-securityprofile-metricvalue-strings
         */
        readonly strings?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `MetricValueProperty`
 *
 * @param properties - the TypeScript properties of a `MetricValueProperty`
 *
 * @returns the result of the validation.
 */
function CfnSecurityProfile_MetricValuePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cidrs', cdk.listValidator(cdk.validateString))(properties.cidrs));
    errors.collect(cdk.propertyValidator('count', cdk.validateString)(properties.count));
    errors.collect(cdk.propertyValidator('number', cdk.validateNumber)(properties.number));
    errors.collect(cdk.propertyValidator('numbers', cdk.listValidator(cdk.validateNumber))(properties.numbers));
    errors.collect(cdk.propertyValidator('ports', cdk.listValidator(cdk.validateNumber))(properties.ports));
    errors.collect(cdk.propertyValidator('strings', cdk.listValidator(cdk.validateString))(properties.strings));
    return errors.wrap('supplied properties not correct for "MetricValueProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.MetricValue` resource
 *
 * @param properties - the TypeScript properties of a `MetricValueProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.MetricValue` resource.
 */
// @ts-ignore TS6133
function cfnSecurityProfileMetricValuePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSecurityProfile_MetricValuePropertyValidator(properties).assertSuccess();
    return {
        Cidrs: cdk.listMapper(cdk.stringToCloudFormation)(properties.cidrs),
        Count: cdk.stringToCloudFormation(properties.count),
        Number: cdk.numberToCloudFormation(properties.number),
        Numbers: cdk.listMapper(cdk.numberToCloudFormation)(properties.numbers),
        Ports: cdk.listMapper(cdk.numberToCloudFormation)(properties.ports),
        Strings: cdk.listMapper(cdk.stringToCloudFormation)(properties.strings),
    };
}

// @ts-ignore TS6133
function CfnSecurityProfileMetricValuePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSecurityProfile.MetricValueProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSecurityProfile.MetricValueProperty>();
    ret.addPropertyResult('cidrs', 'Cidrs', properties.Cidrs != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Cidrs) : undefined);
    ret.addPropertyResult('count', 'Count', properties.Count != null ? cfn_parse.FromCloudFormation.getString(properties.Count) : undefined);
    ret.addPropertyResult('number', 'Number', properties.Number != null ? cfn_parse.FromCloudFormation.getNumber(properties.Number) : undefined);
    ret.addPropertyResult('numbers', 'Numbers', properties.Numbers != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getNumber)(properties.Numbers) : undefined);
    ret.addPropertyResult('ports', 'Ports', properties.Ports != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getNumber)(properties.Ports) : undefined);
    ret.addPropertyResult('strings', 'Strings', properties.Strings != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Strings) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnSecurityProfile {
    /**
     * A statistical ranking (percentile) that indicates a threshold value by which a behavior is determined to be in compliance or in violation of the behavior.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-statisticalthreshold.html
     */
    export interface StatisticalThresholdProperty {
        /**
         * The percentile that resolves to a threshold value by which compliance with a behavior is determined. Metrics are collected over the specified period ( `durationSeconds` ) from all reporting devices in your account and statistical ranks are calculated. Then, the measurements from a device are collected over the same period. If the accumulated measurements from the device fall above or below ( `comparisonOperator` ) the value associated with the percentile specified, then the device is considered to be in compliance with the behavior, otherwise a violation occurs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-securityprofile-statisticalthreshold.html#cfn-iot-securityprofile-statisticalthreshold-statistic
         */
        readonly statistic?: string;
    }
}

/**
 * Determine whether the given properties match those of a `StatisticalThresholdProperty`
 *
 * @param properties - the TypeScript properties of a `StatisticalThresholdProperty`
 *
 * @returns the result of the validation.
 */
function CfnSecurityProfile_StatisticalThresholdPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('statistic', cdk.validateString)(properties.statistic));
    return errors.wrap('supplied properties not correct for "StatisticalThresholdProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.StatisticalThreshold` resource
 *
 * @param properties - the TypeScript properties of a `StatisticalThresholdProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::SecurityProfile.StatisticalThreshold` resource.
 */
// @ts-ignore TS6133
function cfnSecurityProfileStatisticalThresholdPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSecurityProfile_StatisticalThresholdPropertyValidator(properties).assertSuccess();
    return {
        Statistic: cdk.stringToCloudFormation(properties.statistic),
    };
}

// @ts-ignore TS6133
function CfnSecurityProfileStatisticalThresholdPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSecurityProfile.StatisticalThresholdProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSecurityProfile.StatisticalThresholdProperty>();
    ret.addPropertyResult('statistic', 'Statistic', properties.Statistic != null ? cfn_parse.FromCloudFormation.getString(properties.Statistic) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnThing`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-thing.html
 */
export interface CfnThingProps {

    /**
     * A string that contains up to three key value pairs. Maximum length of 800. Duplicates not allowed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-thing.html#cfn-iot-thing-attributepayload
     */
    readonly attributePayload?: CfnThing.AttributePayloadProperty | cdk.IResolvable;

    /**
     * The name of the thing to update.
     *
     * You can't change a thing's name. To change a thing's name, you must create a new thing, give it the new name, and then delete the old thing.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-thing.html#cfn-iot-thing-thingname
     */
    readonly thingName?: string;
}

/**
 * Determine whether the given properties match those of a `CfnThingProps`
 *
 * @param properties - the TypeScript properties of a `CfnThingProps`
 *
 * @returns the result of the validation.
 */
function CfnThingPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('attributePayload', CfnThing_AttributePayloadPropertyValidator)(properties.attributePayload));
    errors.collect(cdk.propertyValidator('thingName', cdk.validateString)(properties.thingName));
    return errors.wrap('supplied properties not correct for "CfnThingProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::Thing` resource
 *
 * @param properties - the TypeScript properties of a `CfnThingProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::Thing` resource.
 */
// @ts-ignore TS6133
function cfnThingPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnThingPropsValidator(properties).assertSuccess();
    return {
        AttributePayload: cfnThingAttributePayloadPropertyToCloudFormation(properties.attributePayload),
        ThingName: cdk.stringToCloudFormation(properties.thingName),
    };
}

// @ts-ignore TS6133
function CfnThingPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnThingProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnThingProps>();
    ret.addPropertyResult('attributePayload', 'AttributePayload', properties.AttributePayload != null ? CfnThingAttributePayloadPropertyFromCloudFormation(properties.AttributePayload) : undefined);
    ret.addPropertyResult('thingName', 'ThingName', properties.ThingName != null ? cfn_parse.FromCloudFormation.getString(properties.ThingName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::Thing`
 *
 * Use the `AWS::IoT::Thing` resource to declare an AWS IoT thing.
 *
 * For information about working with things, see [How AWS IoT Works](https://docs.aws.amazon.com/iot/latest/developerguide/aws-iot-how-it-works.html) and [Device Registry for AWS IoT](https://docs.aws.amazon.com/iot/latest/developerguide/thing-registry.html) in the *AWS IoT Developer Guide* .
 *
 * @cloudformationResource AWS::IoT::Thing
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-thing.html
 */
export class CfnThing extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::Thing";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnThing {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnThingPropsFromCloudFormation(resourceProperties);
        const ret = new CfnThing(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A string that contains up to three key value pairs. Maximum length of 800. Duplicates not allowed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-thing.html#cfn-iot-thing-attributepayload
     */
    public attributePayload: CfnThing.AttributePayloadProperty | cdk.IResolvable | undefined;

    /**
     * The name of the thing to update.
     *
     * You can't change a thing's name. To change a thing's name, you must create a new thing, give it the new name, and then delete the old thing.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-thing.html#cfn-iot-thing-thingname
     */
    public thingName: string | undefined;

    /**
     * Create a new `AWS::IoT::Thing`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnThingProps = {}) {
        super(scope, id, { type: CfnThing.CFN_RESOURCE_TYPE_NAME, properties: props });

        this.attributePayload = props.attributePayload;
        this.thingName = props.thingName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnThing.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            attributePayload: this.attributePayload,
            thingName: this.thingName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnThingPropsToCloudFormation(props);
    }
}

export namespace CfnThing {
    /**
     * The AttributePayload property specifies up to three attributes for an AWS IoT as key-value pairs. AttributePayload is a property of the [AWS::IoT::Thing](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-thing.html) resource.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-thing-attributepayload.html
     */
    export interface AttributePayloadProperty {
        /**
         * A JSON string containing up to three key-value pair in JSON format. For example:
         *
         * `{\"attributes\":{\"string1\":\"string2\"}}`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-thing-attributepayload.html#cfn-iot-thing-attributepayload-attributes
         */
        readonly attributes?: { [key: string]: (string) } | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AttributePayloadProperty`
 *
 * @param properties - the TypeScript properties of a `AttributePayloadProperty`
 *
 * @returns the result of the validation.
 */
function CfnThing_AttributePayloadPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('attributes', cdk.hashValidator(cdk.validateString))(properties.attributes));
    return errors.wrap('supplied properties not correct for "AttributePayloadProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::Thing.AttributePayload` resource
 *
 * @param properties - the TypeScript properties of a `AttributePayloadProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::Thing.AttributePayload` resource.
 */
// @ts-ignore TS6133
function cfnThingAttributePayloadPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnThing_AttributePayloadPropertyValidator(properties).assertSuccess();
    return {
        Attributes: cdk.hashMapper(cdk.stringToCloudFormation)(properties.attributes),
    };
}

// @ts-ignore TS6133
function CfnThingAttributePayloadPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnThing.AttributePayloadProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnThing.AttributePayloadProperty>();
    ret.addPropertyResult('attributes', 'Attributes', properties.Attributes != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Attributes) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnThingPrincipalAttachment`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-thingprincipalattachment.html
 */
export interface CfnThingPrincipalAttachmentProps {

    /**
     * The principal, which can be a certificate ARN (as returned from the `CreateCertificate` operation) or an Amazon Cognito ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-thingprincipalattachment.html#cfn-iot-thingprincipalattachment-principal
     */
    readonly principal: string;

    /**
     * The name of the AWS IoT thing.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-thingprincipalattachment.html#cfn-iot-thingprincipalattachment-thingname
     */
    readonly thingName: string;
}

/**
 * Determine whether the given properties match those of a `CfnThingPrincipalAttachmentProps`
 *
 * @param properties - the TypeScript properties of a `CfnThingPrincipalAttachmentProps`
 *
 * @returns the result of the validation.
 */
function CfnThingPrincipalAttachmentPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('principal', cdk.requiredValidator)(properties.principal));
    errors.collect(cdk.propertyValidator('principal', cdk.validateString)(properties.principal));
    errors.collect(cdk.propertyValidator('thingName', cdk.requiredValidator)(properties.thingName));
    errors.collect(cdk.propertyValidator('thingName', cdk.validateString)(properties.thingName));
    return errors.wrap('supplied properties not correct for "CfnThingPrincipalAttachmentProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::ThingPrincipalAttachment` resource
 *
 * @param properties - the TypeScript properties of a `CfnThingPrincipalAttachmentProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::ThingPrincipalAttachment` resource.
 */
// @ts-ignore TS6133
function cfnThingPrincipalAttachmentPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnThingPrincipalAttachmentPropsValidator(properties).assertSuccess();
    return {
        Principal: cdk.stringToCloudFormation(properties.principal),
        ThingName: cdk.stringToCloudFormation(properties.thingName),
    };
}

// @ts-ignore TS6133
function CfnThingPrincipalAttachmentPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnThingPrincipalAttachmentProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnThingPrincipalAttachmentProps>();
    ret.addPropertyResult('principal', 'Principal', cfn_parse.FromCloudFormation.getString(properties.Principal));
    ret.addPropertyResult('thingName', 'ThingName', cfn_parse.FromCloudFormation.getString(properties.ThingName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::ThingPrincipalAttachment`
 *
 * Use the `AWS::IoT::ThingPrincipalAttachment` resource to attach a principal (an X.509 certificate or another credential) to a thing.
 *
 * For more information about working with AWS IoT things and principals, see [Authorization](https://docs.aws.amazon.com/iot/latest/developerguide/authorization.html) in the *AWS IoT Developer Guide* .
 *
 * @cloudformationResource AWS::IoT::ThingPrincipalAttachment
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-thingprincipalattachment.html
 */
export class CfnThingPrincipalAttachment extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::ThingPrincipalAttachment";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnThingPrincipalAttachment {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnThingPrincipalAttachmentPropsFromCloudFormation(resourceProperties);
        const ret = new CfnThingPrincipalAttachment(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The principal, which can be a certificate ARN (as returned from the `CreateCertificate` operation) or an Amazon Cognito ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-thingprincipalattachment.html#cfn-iot-thingprincipalattachment-principal
     */
    public principal: string;

    /**
     * The name of the AWS IoT thing.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-thingprincipalattachment.html#cfn-iot-thingprincipalattachment-thingname
     */
    public thingName: string;

    /**
     * Create a new `AWS::IoT::ThingPrincipalAttachment`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnThingPrincipalAttachmentProps) {
        super(scope, id, { type: CfnThingPrincipalAttachment.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'principal', this);
        cdk.requireProperty(props, 'thingName', this);

        this.principal = props.principal;
        this.thingName = props.thingName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnThingPrincipalAttachment.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            principal: this.principal,
            thingName: this.thingName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnThingPrincipalAttachmentPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnTopicRule`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicrule.html
 */
export interface CfnTopicRuleProps {

    /**
     * The rule payload.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicrule.html#cfn-iot-topicrule-topicrulepayload
     */
    readonly topicRulePayload: CfnTopicRule.TopicRulePayloadProperty | cdk.IResolvable;

    /**
     * The name of the rule.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicrule.html#cfn-iot-topicrule-rulename
     */
    readonly ruleName?: string;

    /**
     * Metadata which can be used to manage the topic rule.
     *
     * > For URI Request parameters use format: ...key1=value1&key2=value2...
     * >
     * > For the CLI command-line parameter use format: --tags "key1=value1&key2=value2..."
     * >
     * > For the cli-input-json file use format: "tags": "key1=value1&key2=value2..."
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicrule.html#cfn-iot-topicrule-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnTopicRuleProps`
 *
 * @param properties - the TypeScript properties of a `CfnTopicRuleProps`
 *
 * @returns the result of the validation.
 */
function CfnTopicRulePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('ruleName', cdk.validateString)(properties.ruleName));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('topicRulePayload', cdk.requiredValidator)(properties.topicRulePayload));
    errors.collect(cdk.propertyValidator('topicRulePayload', CfnTopicRule_TopicRulePayloadPropertyValidator)(properties.topicRulePayload));
    return errors.wrap('supplied properties not correct for "CfnTopicRuleProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule` resource
 *
 * @param properties - the TypeScript properties of a `CfnTopicRuleProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule` resource.
 */
// @ts-ignore TS6133
function cfnTopicRulePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRulePropsValidator(properties).assertSuccess();
    return {
        TopicRulePayload: cfnTopicRuleTopicRulePayloadPropertyToCloudFormation(properties.topicRulePayload),
        RuleName: cdk.stringToCloudFormation(properties.ruleName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnTopicRulePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRuleProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRuleProps>();
    ret.addPropertyResult('topicRulePayload', 'TopicRulePayload', CfnTopicRuleTopicRulePayloadPropertyFromCloudFormation(properties.TopicRulePayload));
    ret.addPropertyResult('ruleName', 'RuleName', properties.RuleName != null ? cfn_parse.FromCloudFormation.getString(properties.RuleName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::TopicRule`
 *
 * Use the `AWS::IoT::TopicRule` resource to declare an AWS IoT rule. For information about working with AWS IoT rules, see [Rules for AWS IoT](https://docs.aws.amazon.com/iot/latest/developerguide/iot-rules.html) in the *AWS IoT Developer Guide* .
 *
 * @cloudformationResource AWS::IoT::TopicRule
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicrule.html
 */
export class CfnTopicRule extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::TopicRule";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnTopicRule {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnTopicRulePropsFromCloudFormation(resourceProperties);
        const ret = new CfnTopicRule(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the AWS IoT rule, such as `arn:aws:iot:us-east-2:123456789012:rule/MyIoTRule` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The rule payload.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicrule.html#cfn-iot-topicrule-topicrulepayload
     */
    public topicRulePayload: CfnTopicRule.TopicRulePayloadProperty | cdk.IResolvable;

    /**
     * The name of the rule.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicrule.html#cfn-iot-topicrule-rulename
     */
    public ruleName: string | undefined;

    /**
     * Metadata which can be used to manage the topic rule.
     *
     * > For URI Request parameters use format: ...key1=value1&key2=value2...
     * >
     * > For the CLI command-line parameter use format: --tags "key1=value1&key2=value2..."
     * >
     * > For the cli-input-json file use format: "tags": "key1=value1&key2=value2..."
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicrule.html#cfn-iot-topicrule-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::IoT::TopicRule`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnTopicRuleProps) {
        super(scope, id, { type: CfnTopicRule.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'topicRulePayload', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.topicRulePayload = props.topicRulePayload;
        this.ruleName = props.ruleName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IoT::TopicRule", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnTopicRule.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            topicRulePayload: this.topicRulePayload,
            ruleName: this.ruleName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnTopicRulePropsToCloudFormation(props);
    }
}

export namespace CfnTopicRule {
    /**
     * Describes the actions associated with a rule.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html
     */
    export interface ActionProperty {
        /**
         * Change the state of a CloudWatch alarm.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-cloudwatchalarm
         */
        readonly cloudwatchAlarm?: CfnTopicRule.CloudwatchAlarmActionProperty | cdk.IResolvable;
        /**
         * Sends data to CloudWatch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-cloudwatchlogs
         */
        readonly cloudwatchLogs?: CfnTopicRule.CloudwatchLogsActionProperty | cdk.IResolvable;
        /**
         * Capture a CloudWatch metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-cloudwatchmetric
         */
        readonly cloudwatchMetric?: CfnTopicRule.CloudwatchMetricActionProperty | cdk.IResolvable;
        /**
         * Write to a DynamoDB table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-dynamodb
         */
        readonly dynamoDb?: CfnTopicRule.DynamoDBActionProperty | cdk.IResolvable;
        /**
         * Write to a DynamoDB table. This is a new version of the DynamoDB action. It allows you to write each attribute in an MQTT message payload into a separate DynamoDB column.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-dynamodbv2
         */
        readonly dynamoDBv2?: CfnTopicRule.DynamoDBv2ActionProperty | cdk.IResolvable;
        /**
         * Write data to an Amazon OpenSearch Service domain.
         *
         * > The `Elasticsearch` action can only be used by existing rule actions. To create a new rule action or to update an existing rule action, use the `OpenSearch` rule action instead. For more information, see [OpenSearchAction](https://docs.aws.amazon.com//iot/latest/apireference/API_OpenSearchAction.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-elasticsearch
         */
        readonly elasticsearch?: CfnTopicRule.ElasticsearchActionProperty | cdk.IResolvable;
        /**
         * Write to an Amazon Kinesis Firehose stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-firehose
         */
        readonly firehose?: CfnTopicRule.FirehoseActionProperty | cdk.IResolvable;
        /**
         * Send data to an HTTPS endpoint.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-http
         */
        readonly http?: CfnTopicRule.HttpActionProperty | cdk.IResolvable;
        /**
         * Sends message data to an AWS IoT Analytics channel.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-iotanalytics
         */
        readonly iotAnalytics?: CfnTopicRule.IotAnalyticsActionProperty | cdk.IResolvable;
        /**
         * Sends an input to an AWS IoT Events detector.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-iotevents
         */
        readonly iotEvents?: CfnTopicRule.IotEventsActionProperty | cdk.IResolvable;
        /**
         * Sends data from the MQTT message that triggered the rule to AWS IoT SiteWise asset properties.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-iotsitewise
         */
        readonly iotSiteWise?: CfnTopicRule.IotSiteWiseActionProperty | cdk.IResolvable;
        /**
         * Send messages to an Amazon Managed Streaming for Apache Kafka (Amazon MSK) or self-managed Apache Kafka cluster.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-kafka
         */
        readonly kafka?: CfnTopicRule.KafkaActionProperty | cdk.IResolvable;
        /**
         * Write data to an Amazon Kinesis stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-kinesis
         */
        readonly kinesis?: CfnTopicRule.KinesisActionProperty | cdk.IResolvable;
        /**
         * Invoke a Lambda function.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-lambda
         */
        readonly lambda?: CfnTopicRule.LambdaActionProperty | cdk.IResolvable;
        /**
         * Write data to an Amazon OpenSearch Service domain.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-opensearch
         */
        readonly openSearch?: CfnTopicRule.OpenSearchActionProperty | cdk.IResolvable;
        /**
         * Publish to another MQTT topic.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-republish
         */
        readonly republish?: CfnTopicRule.RepublishActionProperty | cdk.IResolvable;
        /**
         * Write to an Amazon S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-s3
         */
        readonly s3?: CfnTopicRule.S3ActionProperty | cdk.IResolvable;
        /**
         * Publish to an Amazon SNS topic.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-sns
         */
        readonly sns?: CfnTopicRule.SnsActionProperty | cdk.IResolvable;
        /**
         * Publish to an Amazon SQS queue.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-sqs
         */
        readonly sqs?: CfnTopicRule.SqsActionProperty | cdk.IResolvable;
        /**
         * Starts execution of a Step Functions state machine.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-stepfunctions
         */
        readonly stepFunctions?: CfnTopicRule.StepFunctionsActionProperty | cdk.IResolvable;
        /**
         * Writes attributes from an MQTT message.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-action.html#cfn-iot-topicrule-action-timestream
         */
        readonly timestream?: CfnTopicRule.TimestreamActionProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ActionProperty`
 *
 * @param properties - the TypeScript properties of a `ActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_ActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cloudwatchAlarm', CfnTopicRule_CloudwatchAlarmActionPropertyValidator)(properties.cloudwatchAlarm));
    errors.collect(cdk.propertyValidator('cloudwatchLogs', CfnTopicRule_CloudwatchLogsActionPropertyValidator)(properties.cloudwatchLogs));
    errors.collect(cdk.propertyValidator('cloudwatchMetric', CfnTopicRule_CloudwatchMetricActionPropertyValidator)(properties.cloudwatchMetric));
    errors.collect(cdk.propertyValidator('dynamoDb', CfnTopicRule_DynamoDBActionPropertyValidator)(properties.dynamoDb));
    errors.collect(cdk.propertyValidator('dynamoDBv2', CfnTopicRule_DynamoDBv2ActionPropertyValidator)(properties.dynamoDBv2));
    errors.collect(cdk.propertyValidator('elasticsearch', CfnTopicRule_ElasticsearchActionPropertyValidator)(properties.elasticsearch));
    errors.collect(cdk.propertyValidator('firehose', CfnTopicRule_FirehoseActionPropertyValidator)(properties.firehose));
    errors.collect(cdk.propertyValidator('http', CfnTopicRule_HttpActionPropertyValidator)(properties.http));
    errors.collect(cdk.propertyValidator('iotAnalytics', CfnTopicRule_IotAnalyticsActionPropertyValidator)(properties.iotAnalytics));
    errors.collect(cdk.propertyValidator('iotEvents', CfnTopicRule_IotEventsActionPropertyValidator)(properties.iotEvents));
    errors.collect(cdk.propertyValidator('iotSiteWise', CfnTopicRule_IotSiteWiseActionPropertyValidator)(properties.iotSiteWise));
    errors.collect(cdk.propertyValidator('kafka', CfnTopicRule_KafkaActionPropertyValidator)(properties.kafka));
    errors.collect(cdk.propertyValidator('kinesis', CfnTopicRule_KinesisActionPropertyValidator)(properties.kinesis));
    errors.collect(cdk.propertyValidator('lambda', CfnTopicRule_LambdaActionPropertyValidator)(properties.lambda));
    errors.collect(cdk.propertyValidator('openSearch', CfnTopicRule_OpenSearchActionPropertyValidator)(properties.openSearch));
    errors.collect(cdk.propertyValidator('republish', CfnTopicRule_RepublishActionPropertyValidator)(properties.republish));
    errors.collect(cdk.propertyValidator('s3', CfnTopicRule_S3ActionPropertyValidator)(properties.s3));
    errors.collect(cdk.propertyValidator('sns', CfnTopicRule_SnsActionPropertyValidator)(properties.sns));
    errors.collect(cdk.propertyValidator('sqs', CfnTopicRule_SqsActionPropertyValidator)(properties.sqs));
    errors.collect(cdk.propertyValidator('stepFunctions', CfnTopicRule_StepFunctionsActionPropertyValidator)(properties.stepFunctions));
    errors.collect(cdk.propertyValidator('timestream', CfnTopicRule_TimestreamActionPropertyValidator)(properties.timestream));
    return errors.wrap('supplied properties not correct for "ActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.Action` resource
 *
 * @param properties - the TypeScript properties of a `ActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.Action` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_ActionPropertyValidator(properties).assertSuccess();
    return {
        CloudwatchAlarm: cfnTopicRuleCloudwatchAlarmActionPropertyToCloudFormation(properties.cloudwatchAlarm),
        CloudwatchLogs: cfnTopicRuleCloudwatchLogsActionPropertyToCloudFormation(properties.cloudwatchLogs),
        CloudwatchMetric: cfnTopicRuleCloudwatchMetricActionPropertyToCloudFormation(properties.cloudwatchMetric),
        DynamoDB: cfnTopicRuleDynamoDBActionPropertyToCloudFormation(properties.dynamoDb),
        DynamoDBv2: cfnTopicRuleDynamoDBv2ActionPropertyToCloudFormation(properties.dynamoDBv2),
        Elasticsearch: cfnTopicRuleElasticsearchActionPropertyToCloudFormation(properties.elasticsearch),
        Firehose: cfnTopicRuleFirehoseActionPropertyToCloudFormation(properties.firehose),
        Http: cfnTopicRuleHttpActionPropertyToCloudFormation(properties.http),
        IotAnalytics: cfnTopicRuleIotAnalyticsActionPropertyToCloudFormation(properties.iotAnalytics),
        IotEvents: cfnTopicRuleIotEventsActionPropertyToCloudFormation(properties.iotEvents),
        IotSiteWise: cfnTopicRuleIotSiteWiseActionPropertyToCloudFormation(properties.iotSiteWise),
        Kafka: cfnTopicRuleKafkaActionPropertyToCloudFormation(properties.kafka),
        Kinesis: cfnTopicRuleKinesisActionPropertyToCloudFormation(properties.kinesis),
        Lambda: cfnTopicRuleLambdaActionPropertyToCloudFormation(properties.lambda),
        OpenSearch: cfnTopicRuleOpenSearchActionPropertyToCloudFormation(properties.openSearch),
        Republish: cfnTopicRuleRepublishActionPropertyToCloudFormation(properties.republish),
        S3: cfnTopicRuleS3ActionPropertyToCloudFormation(properties.s3),
        Sns: cfnTopicRuleSnsActionPropertyToCloudFormation(properties.sns),
        Sqs: cfnTopicRuleSqsActionPropertyToCloudFormation(properties.sqs),
        StepFunctions: cfnTopicRuleStepFunctionsActionPropertyToCloudFormation(properties.stepFunctions),
        Timestream: cfnTopicRuleTimestreamActionPropertyToCloudFormation(properties.timestream),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.ActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.ActionProperty>();
    ret.addPropertyResult('cloudwatchAlarm', 'CloudwatchAlarm', properties.CloudwatchAlarm != null ? CfnTopicRuleCloudwatchAlarmActionPropertyFromCloudFormation(properties.CloudwatchAlarm) : undefined);
    ret.addPropertyResult('cloudwatchLogs', 'CloudwatchLogs', properties.CloudwatchLogs != null ? CfnTopicRuleCloudwatchLogsActionPropertyFromCloudFormation(properties.CloudwatchLogs) : undefined);
    ret.addPropertyResult('cloudwatchMetric', 'CloudwatchMetric', properties.CloudwatchMetric != null ? CfnTopicRuleCloudwatchMetricActionPropertyFromCloudFormation(properties.CloudwatchMetric) : undefined);
    ret.addPropertyResult('dynamoDb', 'DynamoDB', properties.DynamoDB != null ? CfnTopicRuleDynamoDBActionPropertyFromCloudFormation(properties.DynamoDB) : undefined);
    ret.addPropertyResult('dynamoDBv2', 'DynamoDBv2', properties.DynamoDBv2 != null ? CfnTopicRuleDynamoDBv2ActionPropertyFromCloudFormation(properties.DynamoDBv2) : undefined);
    ret.addPropertyResult('elasticsearch', 'Elasticsearch', properties.Elasticsearch != null ? CfnTopicRuleElasticsearchActionPropertyFromCloudFormation(properties.Elasticsearch) : undefined);
    ret.addPropertyResult('firehose', 'Firehose', properties.Firehose != null ? CfnTopicRuleFirehoseActionPropertyFromCloudFormation(properties.Firehose) : undefined);
    ret.addPropertyResult('http', 'Http', properties.Http != null ? CfnTopicRuleHttpActionPropertyFromCloudFormation(properties.Http) : undefined);
    ret.addPropertyResult('iotAnalytics', 'IotAnalytics', properties.IotAnalytics != null ? CfnTopicRuleIotAnalyticsActionPropertyFromCloudFormation(properties.IotAnalytics) : undefined);
    ret.addPropertyResult('iotEvents', 'IotEvents', properties.IotEvents != null ? CfnTopicRuleIotEventsActionPropertyFromCloudFormation(properties.IotEvents) : undefined);
    ret.addPropertyResult('iotSiteWise', 'IotSiteWise', properties.IotSiteWise != null ? CfnTopicRuleIotSiteWiseActionPropertyFromCloudFormation(properties.IotSiteWise) : undefined);
    ret.addPropertyResult('kafka', 'Kafka', properties.Kafka != null ? CfnTopicRuleKafkaActionPropertyFromCloudFormation(properties.Kafka) : undefined);
    ret.addPropertyResult('kinesis', 'Kinesis', properties.Kinesis != null ? CfnTopicRuleKinesisActionPropertyFromCloudFormation(properties.Kinesis) : undefined);
    ret.addPropertyResult('lambda', 'Lambda', properties.Lambda != null ? CfnTopicRuleLambdaActionPropertyFromCloudFormation(properties.Lambda) : undefined);
    ret.addPropertyResult('openSearch', 'OpenSearch', properties.OpenSearch != null ? CfnTopicRuleOpenSearchActionPropertyFromCloudFormation(properties.OpenSearch) : undefined);
    ret.addPropertyResult('republish', 'Republish', properties.Republish != null ? CfnTopicRuleRepublishActionPropertyFromCloudFormation(properties.Republish) : undefined);
    ret.addPropertyResult('s3', 'S3', properties.S3 != null ? CfnTopicRuleS3ActionPropertyFromCloudFormation(properties.S3) : undefined);
    ret.addPropertyResult('sns', 'Sns', properties.Sns != null ? CfnTopicRuleSnsActionPropertyFromCloudFormation(properties.Sns) : undefined);
    ret.addPropertyResult('sqs', 'Sqs', properties.Sqs != null ? CfnTopicRuleSqsActionPropertyFromCloudFormation(properties.Sqs) : undefined);
    ret.addPropertyResult('stepFunctions', 'StepFunctions', properties.StepFunctions != null ? CfnTopicRuleStepFunctionsActionPropertyFromCloudFormation(properties.StepFunctions) : undefined);
    ret.addPropertyResult('timestream', 'Timestream', properties.Timestream != null ? CfnTopicRuleTimestreamActionPropertyFromCloudFormation(properties.Timestream) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * An asset property timestamp entry containing the following information.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-assetpropertytimestamp.html
     */
    export interface AssetPropertyTimestampProperty {
        /**
         * Optional. A string that contains the nanosecond time offset. Accepts substitution templates.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-assetpropertytimestamp.html#cfn-iot-topicrule-assetpropertytimestamp-offsetinnanos
         */
        readonly offsetInNanos?: string;
        /**
         * A string that contains the time in seconds since epoch. Accepts substitution templates.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-assetpropertytimestamp.html#cfn-iot-topicrule-assetpropertytimestamp-timeinseconds
         */
        readonly timeInSeconds: string;
    }
}

/**
 * Determine whether the given properties match those of a `AssetPropertyTimestampProperty`
 *
 * @param properties - the TypeScript properties of a `AssetPropertyTimestampProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_AssetPropertyTimestampPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('offsetInNanos', cdk.validateString)(properties.offsetInNanos));
    errors.collect(cdk.propertyValidator('timeInSeconds', cdk.requiredValidator)(properties.timeInSeconds));
    errors.collect(cdk.propertyValidator('timeInSeconds', cdk.validateString)(properties.timeInSeconds));
    return errors.wrap('supplied properties not correct for "AssetPropertyTimestampProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.AssetPropertyTimestamp` resource
 *
 * @param properties - the TypeScript properties of a `AssetPropertyTimestampProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.AssetPropertyTimestamp` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleAssetPropertyTimestampPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_AssetPropertyTimestampPropertyValidator(properties).assertSuccess();
    return {
        OffsetInNanos: cdk.stringToCloudFormation(properties.offsetInNanos),
        TimeInSeconds: cdk.stringToCloudFormation(properties.timeInSeconds),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleAssetPropertyTimestampPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.AssetPropertyTimestampProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.AssetPropertyTimestampProperty>();
    ret.addPropertyResult('offsetInNanos', 'OffsetInNanos', properties.OffsetInNanos != null ? cfn_parse.FromCloudFormation.getString(properties.OffsetInNanos) : undefined);
    ret.addPropertyResult('timeInSeconds', 'TimeInSeconds', cfn_parse.FromCloudFormation.getString(properties.TimeInSeconds));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * An asset property value entry containing the following information.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-assetpropertyvalue.html
     */
    export interface AssetPropertyValueProperty {
        /**
         * Optional. A string that describes the quality of the value. Accepts substitution templates. Must be `GOOD` , `BAD` , or `UNCERTAIN` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-assetpropertyvalue.html#cfn-iot-topicrule-assetpropertyvalue-quality
         */
        readonly quality?: string;
        /**
         * The asset property value timestamp.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-assetpropertyvalue.html#cfn-iot-topicrule-assetpropertyvalue-timestamp
         */
        readonly timestamp: CfnTopicRule.AssetPropertyTimestampProperty | cdk.IResolvable;
        /**
         * The value of the asset property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-assetpropertyvalue.html#cfn-iot-topicrule-assetpropertyvalue-value
         */
        readonly value: CfnTopicRule.AssetPropertyVariantProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AssetPropertyValueProperty`
 *
 * @param properties - the TypeScript properties of a `AssetPropertyValueProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_AssetPropertyValuePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('quality', cdk.validateString)(properties.quality));
    errors.collect(cdk.propertyValidator('timestamp', cdk.requiredValidator)(properties.timestamp));
    errors.collect(cdk.propertyValidator('timestamp', CfnTopicRule_AssetPropertyTimestampPropertyValidator)(properties.timestamp));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', CfnTopicRule_AssetPropertyVariantPropertyValidator)(properties.value));
    return errors.wrap('supplied properties not correct for "AssetPropertyValueProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.AssetPropertyValue` resource
 *
 * @param properties - the TypeScript properties of a `AssetPropertyValueProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.AssetPropertyValue` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleAssetPropertyValuePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_AssetPropertyValuePropertyValidator(properties).assertSuccess();
    return {
        Quality: cdk.stringToCloudFormation(properties.quality),
        Timestamp: cfnTopicRuleAssetPropertyTimestampPropertyToCloudFormation(properties.timestamp),
        Value: cfnTopicRuleAssetPropertyVariantPropertyToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleAssetPropertyValuePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.AssetPropertyValueProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.AssetPropertyValueProperty>();
    ret.addPropertyResult('quality', 'Quality', properties.Quality != null ? cfn_parse.FromCloudFormation.getString(properties.Quality) : undefined);
    ret.addPropertyResult('timestamp', 'Timestamp', CfnTopicRuleAssetPropertyTimestampPropertyFromCloudFormation(properties.Timestamp));
    ret.addPropertyResult('value', 'Value', CfnTopicRuleAssetPropertyVariantPropertyFromCloudFormation(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Contains an asset property value (of a single type).
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-assetpropertyvariant.html
     */
    export interface AssetPropertyVariantProperty {
        /**
         * Optional. A string that contains the boolean value ( `true` or `false` ) of the value entry. Accepts substitution templates.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-assetpropertyvariant.html#cfn-iot-topicrule-assetpropertyvariant-booleanvalue
         */
        readonly booleanValue?: string;
        /**
         * Optional. A string that contains the double value of the value entry. Accepts substitution templates.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-assetpropertyvariant.html#cfn-iot-topicrule-assetpropertyvariant-doublevalue
         */
        readonly doubleValue?: string;
        /**
         * Optional. A string that contains the integer value of the value entry. Accepts substitution templates.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-assetpropertyvariant.html#cfn-iot-topicrule-assetpropertyvariant-integervalue
         */
        readonly integerValue?: string;
        /**
         * Optional. The string value of the value entry. Accepts substitution templates.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-assetpropertyvariant.html#cfn-iot-topicrule-assetpropertyvariant-stringvalue
         */
        readonly stringValue?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AssetPropertyVariantProperty`
 *
 * @param properties - the TypeScript properties of a `AssetPropertyVariantProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_AssetPropertyVariantPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('booleanValue', cdk.validateString)(properties.booleanValue));
    errors.collect(cdk.propertyValidator('doubleValue', cdk.validateString)(properties.doubleValue));
    errors.collect(cdk.propertyValidator('integerValue', cdk.validateString)(properties.integerValue));
    errors.collect(cdk.propertyValidator('stringValue', cdk.validateString)(properties.stringValue));
    return errors.wrap('supplied properties not correct for "AssetPropertyVariantProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.AssetPropertyVariant` resource
 *
 * @param properties - the TypeScript properties of a `AssetPropertyVariantProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.AssetPropertyVariant` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleAssetPropertyVariantPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_AssetPropertyVariantPropertyValidator(properties).assertSuccess();
    return {
        BooleanValue: cdk.stringToCloudFormation(properties.booleanValue),
        DoubleValue: cdk.stringToCloudFormation(properties.doubleValue),
        IntegerValue: cdk.stringToCloudFormation(properties.integerValue),
        StringValue: cdk.stringToCloudFormation(properties.stringValue),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleAssetPropertyVariantPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.AssetPropertyVariantProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.AssetPropertyVariantProperty>();
    ret.addPropertyResult('booleanValue', 'BooleanValue', properties.BooleanValue != null ? cfn_parse.FromCloudFormation.getString(properties.BooleanValue) : undefined);
    ret.addPropertyResult('doubleValue', 'DoubleValue', properties.DoubleValue != null ? cfn_parse.FromCloudFormation.getString(properties.DoubleValue) : undefined);
    ret.addPropertyResult('integerValue', 'IntegerValue', properties.IntegerValue != null ? cfn_parse.FromCloudFormation.getString(properties.IntegerValue) : undefined);
    ret.addPropertyResult('stringValue', 'StringValue', properties.StringValue != null ? cfn_parse.FromCloudFormation.getString(properties.StringValue) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action that updates a CloudWatch alarm.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchalarmaction.html
     */
    export interface CloudwatchAlarmActionProperty {
        /**
         * The CloudWatch alarm name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchalarmaction.html#cfn-iot-topicrule-cloudwatchalarmaction-alarmname
         */
        readonly alarmName: string;
        /**
         * The IAM role that allows access to the CloudWatch alarm.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchalarmaction.html#cfn-iot-topicrule-cloudwatchalarmaction-rolearn
         */
        readonly roleArn: string;
        /**
         * The reason for the alarm change.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchalarmaction.html#cfn-iot-topicrule-cloudwatchalarmaction-statereason
         */
        readonly stateReason: string;
        /**
         * The value of the alarm state. Acceptable values are: OK, ALARM, INSUFFICIENT_DATA.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchalarmaction.html#cfn-iot-topicrule-cloudwatchalarmaction-statevalue
         */
        readonly stateValue: string;
    }
}

/**
 * Determine whether the given properties match those of a `CloudwatchAlarmActionProperty`
 *
 * @param properties - the TypeScript properties of a `CloudwatchAlarmActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_CloudwatchAlarmActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('alarmName', cdk.requiredValidator)(properties.alarmName));
    errors.collect(cdk.propertyValidator('alarmName', cdk.validateString)(properties.alarmName));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('stateReason', cdk.requiredValidator)(properties.stateReason));
    errors.collect(cdk.propertyValidator('stateReason', cdk.validateString)(properties.stateReason));
    errors.collect(cdk.propertyValidator('stateValue', cdk.requiredValidator)(properties.stateValue));
    errors.collect(cdk.propertyValidator('stateValue', cdk.validateString)(properties.stateValue));
    return errors.wrap('supplied properties not correct for "CloudwatchAlarmActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.CloudwatchAlarmAction` resource
 *
 * @param properties - the TypeScript properties of a `CloudwatchAlarmActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.CloudwatchAlarmAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleCloudwatchAlarmActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_CloudwatchAlarmActionPropertyValidator(properties).assertSuccess();
    return {
        AlarmName: cdk.stringToCloudFormation(properties.alarmName),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        StateReason: cdk.stringToCloudFormation(properties.stateReason),
        StateValue: cdk.stringToCloudFormation(properties.stateValue),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleCloudwatchAlarmActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.CloudwatchAlarmActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.CloudwatchAlarmActionProperty>();
    ret.addPropertyResult('alarmName', 'AlarmName', cfn_parse.FromCloudFormation.getString(properties.AlarmName));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('stateReason', 'StateReason', cfn_parse.FromCloudFormation.getString(properties.StateReason));
    ret.addPropertyResult('stateValue', 'StateValue', cfn_parse.FromCloudFormation.getString(properties.StateValue));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action that updates a CloudWatch log.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchlogsaction.html
     */
    export interface CloudwatchLogsActionProperty {
        /**
         * The CloudWatch log name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchlogsaction.html#cfn-iot-topicrule-cloudwatchlogsaction-loggroupname
         */
        readonly logGroupName: string;
        /**
         * The IAM role that allows access to the CloudWatch log.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchlogsaction.html#cfn-iot-topicrule-cloudwatchlogsaction-rolearn
         */
        readonly roleArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `CloudwatchLogsActionProperty`
 *
 * @param properties - the TypeScript properties of a `CloudwatchLogsActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_CloudwatchLogsActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('logGroupName', cdk.requiredValidator)(properties.logGroupName));
    errors.collect(cdk.propertyValidator('logGroupName', cdk.validateString)(properties.logGroupName));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "CloudwatchLogsActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.CloudwatchLogsAction` resource
 *
 * @param properties - the TypeScript properties of a `CloudwatchLogsActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.CloudwatchLogsAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleCloudwatchLogsActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_CloudwatchLogsActionPropertyValidator(properties).assertSuccess();
    return {
        LogGroupName: cdk.stringToCloudFormation(properties.logGroupName),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleCloudwatchLogsActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.CloudwatchLogsActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.CloudwatchLogsActionProperty>();
    ret.addPropertyResult('logGroupName', 'LogGroupName', cfn_parse.FromCloudFormation.getString(properties.LogGroupName));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action that captures a CloudWatch metric.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchmetricaction.html
     */
    export interface CloudwatchMetricActionProperty {
        /**
         * The CloudWatch metric name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchmetricaction.html#cfn-iot-topicrule-cloudwatchmetricaction-metricname
         */
        readonly metricName: string;
        /**
         * The CloudWatch metric namespace name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchmetricaction.html#cfn-iot-topicrule-cloudwatchmetricaction-metricnamespace
         */
        readonly metricNamespace: string;
        /**
         * An optional [Unix timestamp](https://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/cloudwatch_concepts.html#about_timestamp) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchmetricaction.html#cfn-iot-topicrule-cloudwatchmetricaction-metrictimestamp
         */
        readonly metricTimestamp?: string;
        /**
         * The [metric unit](https://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/cloudwatch_concepts.html#Unit) supported by CloudWatch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchmetricaction.html#cfn-iot-topicrule-cloudwatchmetricaction-metricunit
         */
        readonly metricUnit: string;
        /**
         * The CloudWatch metric value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchmetricaction.html#cfn-iot-topicrule-cloudwatchmetricaction-metricvalue
         */
        readonly metricValue: string;
        /**
         * The IAM role that allows access to the CloudWatch metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-cloudwatchmetricaction.html#cfn-iot-topicrule-cloudwatchmetricaction-rolearn
         */
        readonly roleArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `CloudwatchMetricActionProperty`
 *
 * @param properties - the TypeScript properties of a `CloudwatchMetricActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_CloudwatchMetricActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('metricName', cdk.requiredValidator)(properties.metricName));
    errors.collect(cdk.propertyValidator('metricName', cdk.validateString)(properties.metricName));
    errors.collect(cdk.propertyValidator('metricNamespace', cdk.requiredValidator)(properties.metricNamespace));
    errors.collect(cdk.propertyValidator('metricNamespace', cdk.validateString)(properties.metricNamespace));
    errors.collect(cdk.propertyValidator('metricTimestamp', cdk.validateString)(properties.metricTimestamp));
    errors.collect(cdk.propertyValidator('metricUnit', cdk.requiredValidator)(properties.metricUnit));
    errors.collect(cdk.propertyValidator('metricUnit', cdk.validateString)(properties.metricUnit));
    errors.collect(cdk.propertyValidator('metricValue', cdk.requiredValidator)(properties.metricValue));
    errors.collect(cdk.propertyValidator('metricValue', cdk.validateString)(properties.metricValue));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "CloudwatchMetricActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.CloudwatchMetricAction` resource
 *
 * @param properties - the TypeScript properties of a `CloudwatchMetricActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.CloudwatchMetricAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleCloudwatchMetricActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_CloudwatchMetricActionPropertyValidator(properties).assertSuccess();
    return {
        MetricName: cdk.stringToCloudFormation(properties.metricName),
        MetricNamespace: cdk.stringToCloudFormation(properties.metricNamespace),
        MetricTimestamp: cdk.stringToCloudFormation(properties.metricTimestamp),
        MetricUnit: cdk.stringToCloudFormation(properties.metricUnit),
        MetricValue: cdk.stringToCloudFormation(properties.metricValue),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleCloudwatchMetricActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.CloudwatchMetricActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.CloudwatchMetricActionProperty>();
    ret.addPropertyResult('metricName', 'MetricName', cfn_parse.FromCloudFormation.getString(properties.MetricName));
    ret.addPropertyResult('metricNamespace', 'MetricNamespace', cfn_parse.FromCloudFormation.getString(properties.MetricNamespace));
    ret.addPropertyResult('metricTimestamp', 'MetricTimestamp', properties.MetricTimestamp != null ? cfn_parse.FromCloudFormation.getString(properties.MetricTimestamp) : undefined);
    ret.addPropertyResult('metricUnit', 'MetricUnit', cfn_parse.FromCloudFormation.getString(properties.MetricUnit));
    ret.addPropertyResult('metricValue', 'MetricValue', cfn_parse.FromCloudFormation.getString(properties.MetricValue));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action to write to a DynamoDB table.
     *
     * The `tableName` , `hashKeyField` , and `rangeKeyField` values must match the values used when you created the table.
     *
     * The `hashKeyValue` and `rangeKeyvalue` fields use a substitution template syntax. These templates provide data at runtime. The syntax is as follows: ${ *sql-expression* }.
     *
     * You can specify any valid expression in a WHERE or SELECT clause, including JSON properties, comparisons, calculations, and functions. For example, the following field uses the third level of the topic:
     *
     * `"hashKeyValue": "${topic(3)}"`
     *
     * The following field uses the timestamp:
     *
     * `"rangeKeyValue": "${timestamp()}"`
     *
     * For more information, see [DynamoDBv2 Action](https://docs.aws.amazon.com/iot/latest/developerguide/iot-rule-actions.html) in the *AWS IoT Developer Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-dynamodbaction.html
     */
    export interface DynamoDBActionProperty {
        /**
         * The hash key name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-dynamodbaction.html#cfn-iot-topicrule-dynamodbaction-hashkeyfield
         */
        readonly hashKeyField: string;
        /**
         * The hash key type. Valid values are "STRING" or "NUMBER"
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-dynamodbaction.html#cfn-iot-topicrule-dynamodbaction-hashkeytype
         */
        readonly hashKeyType?: string;
        /**
         * The hash key value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-dynamodbaction.html#cfn-iot-topicrule-dynamodbaction-hashkeyvalue
         */
        readonly hashKeyValue: string;
        /**
         * The action payload. This name can be customized.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-dynamodbaction.html#cfn-iot-topicrule-dynamodbaction-payloadfield
         */
        readonly payloadField?: string;
        /**
         * The range key name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-dynamodbaction.html#cfn-iot-topicrule-dynamodbaction-rangekeyfield
         */
        readonly rangeKeyField?: string;
        /**
         * The range key type. Valid values are "STRING" or "NUMBER"
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-dynamodbaction.html#cfn-iot-topicrule-dynamodbaction-rangekeytype
         */
        readonly rangeKeyType?: string;
        /**
         * The range key value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-dynamodbaction.html#cfn-iot-topicrule-dynamodbaction-rangekeyvalue
         */
        readonly rangeKeyValue?: string;
        /**
         * The ARN of the IAM role that grants access to the DynamoDB table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-dynamodbaction.html#cfn-iot-topicrule-dynamodbaction-rolearn
         */
        readonly roleArn: string;
        /**
         * The name of the DynamoDB table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-dynamodbaction.html#cfn-iot-topicrule-dynamodbaction-tablename
         */
        readonly tableName: string;
    }
}

/**
 * Determine whether the given properties match those of a `DynamoDBActionProperty`
 *
 * @param properties - the TypeScript properties of a `DynamoDBActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_DynamoDBActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('hashKeyField', cdk.requiredValidator)(properties.hashKeyField));
    errors.collect(cdk.propertyValidator('hashKeyField', cdk.validateString)(properties.hashKeyField));
    errors.collect(cdk.propertyValidator('hashKeyType', cdk.validateString)(properties.hashKeyType));
    errors.collect(cdk.propertyValidator('hashKeyValue', cdk.requiredValidator)(properties.hashKeyValue));
    errors.collect(cdk.propertyValidator('hashKeyValue', cdk.validateString)(properties.hashKeyValue));
    errors.collect(cdk.propertyValidator('payloadField', cdk.validateString)(properties.payloadField));
    errors.collect(cdk.propertyValidator('rangeKeyField', cdk.validateString)(properties.rangeKeyField));
    errors.collect(cdk.propertyValidator('rangeKeyType', cdk.validateString)(properties.rangeKeyType));
    errors.collect(cdk.propertyValidator('rangeKeyValue', cdk.validateString)(properties.rangeKeyValue));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('tableName', cdk.requiredValidator)(properties.tableName));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    return errors.wrap('supplied properties not correct for "DynamoDBActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.DynamoDBAction` resource
 *
 * @param properties - the TypeScript properties of a `DynamoDBActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.DynamoDBAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleDynamoDBActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_DynamoDBActionPropertyValidator(properties).assertSuccess();
    return {
        HashKeyField: cdk.stringToCloudFormation(properties.hashKeyField),
        HashKeyType: cdk.stringToCloudFormation(properties.hashKeyType),
        HashKeyValue: cdk.stringToCloudFormation(properties.hashKeyValue),
        PayloadField: cdk.stringToCloudFormation(properties.payloadField),
        RangeKeyField: cdk.stringToCloudFormation(properties.rangeKeyField),
        RangeKeyType: cdk.stringToCloudFormation(properties.rangeKeyType),
        RangeKeyValue: cdk.stringToCloudFormation(properties.rangeKeyValue),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        TableName: cdk.stringToCloudFormation(properties.tableName),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleDynamoDBActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.DynamoDBActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.DynamoDBActionProperty>();
    ret.addPropertyResult('hashKeyField', 'HashKeyField', cfn_parse.FromCloudFormation.getString(properties.HashKeyField));
    ret.addPropertyResult('hashKeyType', 'HashKeyType', properties.HashKeyType != null ? cfn_parse.FromCloudFormation.getString(properties.HashKeyType) : undefined);
    ret.addPropertyResult('hashKeyValue', 'HashKeyValue', cfn_parse.FromCloudFormation.getString(properties.HashKeyValue));
    ret.addPropertyResult('payloadField', 'PayloadField', properties.PayloadField != null ? cfn_parse.FromCloudFormation.getString(properties.PayloadField) : undefined);
    ret.addPropertyResult('rangeKeyField', 'RangeKeyField', properties.RangeKeyField != null ? cfn_parse.FromCloudFormation.getString(properties.RangeKeyField) : undefined);
    ret.addPropertyResult('rangeKeyType', 'RangeKeyType', properties.RangeKeyType != null ? cfn_parse.FromCloudFormation.getString(properties.RangeKeyType) : undefined);
    ret.addPropertyResult('rangeKeyValue', 'RangeKeyValue', properties.RangeKeyValue != null ? cfn_parse.FromCloudFormation.getString(properties.RangeKeyValue) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('tableName', 'TableName', cfn_parse.FromCloudFormation.getString(properties.TableName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action to write to a DynamoDB table.
     *
     * This DynamoDB action writes each attribute in the message payload into it's own column in the DynamoDB table.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-dynamodbv2action.html
     */
    export interface DynamoDBv2ActionProperty {
        /**
         * Specifies the DynamoDB table to which the message data will be written. For example:
         *
         * `{ "dynamoDBv2": { "roleArn": "aws:iam:12341251:my-role" "putItem": { "tableName": "my-table" } } }`
         *
         * Each attribute in the message payload will be written to a separate column in the DynamoDB database.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-dynamodbv2action.html#cfn-iot-topicrule-dynamodbv2action-putitem
         */
        readonly putItem?: CfnTopicRule.PutItemInputProperty | cdk.IResolvable;
        /**
         * The ARN of the IAM role that grants access to the DynamoDB table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-dynamodbv2action.html#cfn-iot-topicrule-dynamodbv2action-rolearn
         */
        readonly roleArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DynamoDBv2ActionProperty`
 *
 * @param properties - the TypeScript properties of a `DynamoDBv2ActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_DynamoDBv2ActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('putItem', CfnTopicRule_PutItemInputPropertyValidator)(properties.putItem));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "DynamoDBv2ActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.DynamoDBv2Action` resource
 *
 * @param properties - the TypeScript properties of a `DynamoDBv2ActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.DynamoDBv2Action` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleDynamoDBv2ActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_DynamoDBv2ActionPropertyValidator(properties).assertSuccess();
    return {
        PutItem: cfnTopicRulePutItemInputPropertyToCloudFormation(properties.putItem),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleDynamoDBv2ActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.DynamoDBv2ActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.DynamoDBv2ActionProperty>();
    ret.addPropertyResult('putItem', 'PutItem', properties.PutItem != null ? CfnTopicRulePutItemInputPropertyFromCloudFormation(properties.PutItem) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', properties.RoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.RoleArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action that writes data to an Amazon OpenSearch Service domain.
     *
     * > The `Elasticsearch` action can only be used by existing rule actions. To create a new rule action or to update an existing rule action, use the `OpenSearch` rule action instead. For more information, see [OpenSearchAction](https://docs.aws.amazon.com//iot/latest/apireference/API_OpenSearchAction.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-elasticsearchaction.html
     */
    export interface ElasticsearchActionProperty {
        /**
         * The endpoint of your OpenSearch domain.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-elasticsearchaction.html#cfn-iot-topicrule-elasticsearchaction-endpoint
         */
        readonly endpoint: string;
        /**
         * The unique identifier for the document you are storing.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-elasticsearchaction.html#cfn-iot-topicrule-elasticsearchaction-id
         */
        readonly id: string;
        /**
         * The index where you want to store your data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-elasticsearchaction.html#cfn-iot-topicrule-elasticsearchaction-index
         */
        readonly index: string;
        /**
         * The IAM role ARN that has access to OpenSearch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-elasticsearchaction.html#cfn-iot-topicrule-elasticsearchaction-rolearn
         */
        readonly roleArn: string;
        /**
         * The type of document you are storing.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-elasticsearchaction.html#cfn-iot-topicrule-elasticsearchaction-type
         */
        readonly type: string;
    }
}

/**
 * Determine whether the given properties match those of a `ElasticsearchActionProperty`
 *
 * @param properties - the TypeScript properties of a `ElasticsearchActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_ElasticsearchActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endpoint', cdk.requiredValidator)(properties.endpoint));
    errors.collect(cdk.propertyValidator('endpoint', cdk.validateString)(properties.endpoint));
    errors.collect(cdk.propertyValidator('id', cdk.requiredValidator)(properties.id));
    errors.collect(cdk.propertyValidator('id', cdk.validateString)(properties.id));
    errors.collect(cdk.propertyValidator('index', cdk.requiredValidator)(properties.index));
    errors.collect(cdk.propertyValidator('index', cdk.validateString)(properties.index));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "ElasticsearchActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.ElasticsearchAction` resource
 *
 * @param properties - the TypeScript properties of a `ElasticsearchActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.ElasticsearchAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleElasticsearchActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_ElasticsearchActionPropertyValidator(properties).assertSuccess();
    return {
        Endpoint: cdk.stringToCloudFormation(properties.endpoint),
        Id: cdk.stringToCloudFormation(properties.id),
        Index: cdk.stringToCloudFormation(properties.index),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleElasticsearchActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.ElasticsearchActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.ElasticsearchActionProperty>();
    ret.addPropertyResult('endpoint', 'Endpoint', cfn_parse.FromCloudFormation.getString(properties.Endpoint));
    ret.addPropertyResult('id', 'Id', cfn_parse.FromCloudFormation.getString(properties.Id));
    ret.addPropertyResult('index', 'Index', cfn_parse.FromCloudFormation.getString(properties.Index));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action that writes data to an Amazon Kinesis Firehose stream.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-firehoseaction.html
     */
    export interface FirehoseActionProperty {
        /**
         * Whether to deliver the Kinesis Data Firehose stream as a batch by using [`PutRecordBatch`](https://docs.aws.amazon.com/firehose/latest/APIReference/API_PutRecordBatch.html) . The default value is `false` .
         *
         * When `batchMode` is `true` and the rule's SQL statement evaluates to an Array, each Array element forms one record in the [`PutRecordBatch`](https://docs.aws.amazon.com/firehose/latest/APIReference/API_PutRecordBatch.html) request. The resulting array can't have more than 500 records.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-firehoseaction.html#cfn-iot-topicrule-firehoseaction-batchmode
         */
        readonly batchMode?: boolean | cdk.IResolvable;
        /**
         * The delivery stream name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-firehoseaction.html#cfn-iot-topicrule-firehoseaction-deliverystreamname
         */
        readonly deliveryStreamName: string;
        /**
         * The IAM role that grants access to the Amazon Kinesis Firehose stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-firehoseaction.html#cfn-iot-topicrule-firehoseaction-rolearn
         */
        readonly roleArn: string;
        /**
         * A character separator that will be used to separate records written to the Firehose stream. Valid values are: '\n' (newline), '\t' (tab), '\r\n' (Windows newline), ',' (comma).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-firehoseaction.html#cfn-iot-topicrule-firehoseaction-separator
         */
        readonly separator?: string;
    }
}

/**
 * Determine whether the given properties match those of a `FirehoseActionProperty`
 *
 * @param properties - the TypeScript properties of a `FirehoseActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_FirehoseActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('batchMode', cdk.validateBoolean)(properties.batchMode));
    errors.collect(cdk.propertyValidator('deliveryStreamName', cdk.requiredValidator)(properties.deliveryStreamName));
    errors.collect(cdk.propertyValidator('deliveryStreamName', cdk.validateString)(properties.deliveryStreamName));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('separator', cdk.validateString)(properties.separator));
    return errors.wrap('supplied properties not correct for "FirehoseActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.FirehoseAction` resource
 *
 * @param properties - the TypeScript properties of a `FirehoseActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.FirehoseAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleFirehoseActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_FirehoseActionPropertyValidator(properties).assertSuccess();
    return {
        BatchMode: cdk.booleanToCloudFormation(properties.batchMode),
        DeliveryStreamName: cdk.stringToCloudFormation(properties.deliveryStreamName),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        Separator: cdk.stringToCloudFormation(properties.separator),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleFirehoseActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.FirehoseActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.FirehoseActionProperty>();
    ret.addPropertyResult('batchMode', 'BatchMode', properties.BatchMode != null ? cfn_parse.FromCloudFormation.getBoolean(properties.BatchMode) : undefined);
    ret.addPropertyResult('deliveryStreamName', 'DeliveryStreamName', cfn_parse.FromCloudFormation.getString(properties.DeliveryStreamName));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('separator', 'Separator', properties.Separator != null ? cfn_parse.FromCloudFormation.getString(properties.Separator) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Send data to an HTTPS endpoint.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-httpaction.html
     */
    export interface HttpActionProperty {
        /**
         * The authentication method to use when sending data to an HTTPS endpoint.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-httpaction.html#cfn-iot-topicrule-httpaction-auth
         */
        readonly auth?: CfnTopicRule.HttpAuthorizationProperty | cdk.IResolvable;
        /**
         * The URL to which AWS IoT sends a confirmation message. The value of the confirmation URL must be a prefix of the endpoint URL. If you do not specify a confirmation URL AWS IoT uses the endpoint URL as the confirmation URL. If you use substitution templates in the confirmationUrl, you must create and enable topic rule destinations that match each possible value of the substitution template before traffic is allowed to your endpoint URL.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-httpaction.html#cfn-iot-topicrule-httpaction-confirmationurl
         */
        readonly confirmationUrl?: string;
        /**
         * The HTTP headers to send with the message data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-httpaction.html#cfn-iot-topicrule-httpaction-headers
         */
        readonly headers?: Array<CfnTopicRule.HttpActionHeaderProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The endpoint URL. If substitution templates are used in the URL, you must also specify a `confirmationUrl` . If this is a new destination, a new `TopicRuleDestination` is created if possible.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-httpaction.html#cfn-iot-topicrule-httpaction-url
         */
        readonly url: string;
    }
}

/**
 * Determine whether the given properties match those of a `HttpActionProperty`
 *
 * @param properties - the TypeScript properties of a `HttpActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_HttpActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('auth', CfnTopicRule_HttpAuthorizationPropertyValidator)(properties.auth));
    errors.collect(cdk.propertyValidator('confirmationUrl', cdk.validateString)(properties.confirmationUrl));
    errors.collect(cdk.propertyValidator('headers', cdk.listValidator(CfnTopicRule_HttpActionHeaderPropertyValidator))(properties.headers));
    errors.collect(cdk.propertyValidator('url', cdk.requiredValidator)(properties.url));
    errors.collect(cdk.propertyValidator('url', cdk.validateString)(properties.url));
    return errors.wrap('supplied properties not correct for "HttpActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.HttpAction` resource
 *
 * @param properties - the TypeScript properties of a `HttpActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.HttpAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleHttpActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_HttpActionPropertyValidator(properties).assertSuccess();
    return {
        Auth: cfnTopicRuleHttpAuthorizationPropertyToCloudFormation(properties.auth),
        ConfirmationUrl: cdk.stringToCloudFormation(properties.confirmationUrl),
        Headers: cdk.listMapper(cfnTopicRuleHttpActionHeaderPropertyToCloudFormation)(properties.headers),
        Url: cdk.stringToCloudFormation(properties.url),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleHttpActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.HttpActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.HttpActionProperty>();
    ret.addPropertyResult('auth', 'Auth', properties.Auth != null ? CfnTopicRuleHttpAuthorizationPropertyFromCloudFormation(properties.Auth) : undefined);
    ret.addPropertyResult('confirmationUrl', 'ConfirmationUrl', properties.ConfirmationUrl != null ? cfn_parse.FromCloudFormation.getString(properties.ConfirmationUrl) : undefined);
    ret.addPropertyResult('headers', 'Headers', properties.Headers != null ? cfn_parse.FromCloudFormation.getArray(CfnTopicRuleHttpActionHeaderPropertyFromCloudFormation)(properties.Headers) : undefined);
    ret.addPropertyResult('url', 'Url', cfn_parse.FromCloudFormation.getString(properties.Url));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * The HTTP action header.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-httpactionheader.html
     */
    export interface HttpActionHeaderProperty {
        /**
         * The HTTP header key.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-httpactionheader.html#cfn-iot-topicrule-httpactionheader-key
         */
        readonly key: string;
        /**
         * The HTTP header value. Substitution templates are supported.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-httpactionheader.html#cfn-iot-topicrule-httpactionheader-value
         */
        readonly value: string;
    }
}

/**
 * Determine whether the given properties match those of a `HttpActionHeaderProperty`
 *
 * @param properties - the TypeScript properties of a `HttpActionHeaderProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_HttpActionHeaderPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('key', cdk.requiredValidator)(properties.key));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "HttpActionHeaderProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.HttpActionHeader` resource
 *
 * @param properties - the TypeScript properties of a `HttpActionHeaderProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.HttpActionHeader` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleHttpActionHeaderPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_HttpActionHeaderPropertyValidator(properties).assertSuccess();
    return {
        Key: cdk.stringToCloudFormation(properties.key),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleHttpActionHeaderPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.HttpActionHeaderProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.HttpActionHeaderProperty>();
    ret.addPropertyResult('key', 'Key', cfn_parse.FromCloudFormation.getString(properties.Key));
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * The authorization method used to send messages.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-httpauthorization.html
     */
    export interface HttpAuthorizationProperty {
        /**
         * Use Sig V4 authorization. For more information, see [Signature Version 4 Signing Process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-httpauthorization.html#cfn-iot-topicrule-httpauthorization-sigv4
         */
        readonly sigv4?: CfnTopicRule.SigV4AuthorizationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `HttpAuthorizationProperty`
 *
 * @param properties - the TypeScript properties of a `HttpAuthorizationProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_HttpAuthorizationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('sigv4', CfnTopicRule_SigV4AuthorizationPropertyValidator)(properties.sigv4));
    return errors.wrap('supplied properties not correct for "HttpAuthorizationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.HttpAuthorization` resource
 *
 * @param properties - the TypeScript properties of a `HttpAuthorizationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.HttpAuthorization` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleHttpAuthorizationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_HttpAuthorizationPropertyValidator(properties).assertSuccess();
    return {
        Sigv4: cfnTopicRuleSigV4AuthorizationPropertyToCloudFormation(properties.sigv4),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleHttpAuthorizationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.HttpAuthorizationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.HttpAuthorizationProperty>();
    ret.addPropertyResult('sigv4', 'Sigv4', properties.Sigv4 != null ? CfnTopicRuleSigV4AuthorizationPropertyFromCloudFormation(properties.Sigv4) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Sends message data to an AWS IoT Analytics channel.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-iotanalyticsaction.html
     */
    export interface IotAnalyticsActionProperty {
        /**
         * Whether to process the action as a batch. The default value is `false` .
         *
         * When `batchMode` is `true` and the rule SQL statement evaluates to an Array, each Array element is delivered as a separate message when passed by [`BatchPutMessage`](https://docs.aws.amazon.com/iotanalytics/latest/APIReference/API_BatchPutMessage.html) The resulting array can't have more than 100 messages.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-iotanalyticsaction.html#cfn-iot-topicrule-iotanalyticsaction-batchmode
         */
        readonly batchMode?: boolean | cdk.IResolvable;
        /**
         * The name of the IoT Analytics channel to which message data will be sent.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-iotanalyticsaction.html#cfn-iot-topicrule-iotanalyticsaction-channelname
         */
        readonly channelName: string;
        /**
         * The ARN of the role which has a policy that grants IoT Analytics permission to send message data via IoT Analytics (iotanalytics:BatchPutMessage).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-iotanalyticsaction.html#cfn-iot-topicrule-iotanalyticsaction-rolearn
         */
        readonly roleArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `IotAnalyticsActionProperty`
 *
 * @param properties - the TypeScript properties of a `IotAnalyticsActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_IotAnalyticsActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('batchMode', cdk.validateBoolean)(properties.batchMode));
    errors.collect(cdk.propertyValidator('channelName', cdk.requiredValidator)(properties.channelName));
    errors.collect(cdk.propertyValidator('channelName', cdk.validateString)(properties.channelName));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "IotAnalyticsActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.IotAnalyticsAction` resource
 *
 * @param properties - the TypeScript properties of a `IotAnalyticsActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.IotAnalyticsAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleIotAnalyticsActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_IotAnalyticsActionPropertyValidator(properties).assertSuccess();
    return {
        BatchMode: cdk.booleanToCloudFormation(properties.batchMode),
        ChannelName: cdk.stringToCloudFormation(properties.channelName),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleIotAnalyticsActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.IotAnalyticsActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.IotAnalyticsActionProperty>();
    ret.addPropertyResult('batchMode', 'BatchMode', properties.BatchMode != null ? cfn_parse.FromCloudFormation.getBoolean(properties.BatchMode) : undefined);
    ret.addPropertyResult('channelName', 'ChannelName', cfn_parse.FromCloudFormation.getString(properties.ChannelName));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Sends an input to an AWS IoT Events detector.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-ioteventsaction.html
     */
    export interface IotEventsActionProperty {
        /**
         * Whether to process the event actions as a batch. The default value is `false` .
         *
         * When `batchMode` is `true` , you can't specify a `messageId` .
         *
         * When `batchMode` is `true` and the rule SQL statement evaluates to an Array, each Array element is treated as a separate message when Events by calling [`BatchPutMessage`](https://docs.aws.amazon.com/iotevents/latest/apireference/API_iotevents-data_BatchPutMessage.html) . The resulting array can't have more than 10 messages.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-ioteventsaction.html#cfn-iot-topicrule-ioteventsaction-batchmode
         */
        readonly batchMode?: boolean | cdk.IResolvable;
        /**
         * The name of the AWS IoT Events input.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-ioteventsaction.html#cfn-iot-topicrule-ioteventsaction-inputname
         */
        readonly inputName: string;
        /**
         * The ID of the message. The default `messageId` is a new UUID value.
         *
         * When `batchMode` is `true` , you can't specify a `messageId` --a new UUID value will be assigned.
         *
         * Assign a value to this property to ensure that only one input (message) with a given `messageId` will be processed by an AWS IoT Events detector.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-ioteventsaction.html#cfn-iot-topicrule-ioteventsaction-messageid
         */
        readonly messageId?: string;
        /**
         * The ARN of the role that grants AWS IoT permission to send an input to an AWS IoT Events detector. ("Action":"iotevents:BatchPutMessage").
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-ioteventsaction.html#cfn-iot-topicrule-ioteventsaction-rolearn
         */
        readonly roleArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `IotEventsActionProperty`
 *
 * @param properties - the TypeScript properties of a `IotEventsActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_IotEventsActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('batchMode', cdk.validateBoolean)(properties.batchMode));
    errors.collect(cdk.propertyValidator('inputName', cdk.requiredValidator)(properties.inputName));
    errors.collect(cdk.propertyValidator('inputName', cdk.validateString)(properties.inputName));
    errors.collect(cdk.propertyValidator('messageId', cdk.validateString)(properties.messageId));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "IotEventsActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.IotEventsAction` resource
 *
 * @param properties - the TypeScript properties of a `IotEventsActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.IotEventsAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleIotEventsActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_IotEventsActionPropertyValidator(properties).assertSuccess();
    return {
        BatchMode: cdk.booleanToCloudFormation(properties.batchMode),
        InputName: cdk.stringToCloudFormation(properties.inputName),
        MessageId: cdk.stringToCloudFormation(properties.messageId),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleIotEventsActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.IotEventsActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.IotEventsActionProperty>();
    ret.addPropertyResult('batchMode', 'BatchMode', properties.BatchMode != null ? cfn_parse.FromCloudFormation.getBoolean(properties.BatchMode) : undefined);
    ret.addPropertyResult('inputName', 'InputName', cfn_parse.FromCloudFormation.getString(properties.InputName));
    ret.addPropertyResult('messageId', 'MessageId', properties.MessageId != null ? cfn_parse.FromCloudFormation.getString(properties.MessageId) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action to send data from an MQTT message that triggered the rule to AWS IoT SiteWise asset properties.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-iotsitewiseaction.html
     */
    export interface IotSiteWiseActionProperty {
        /**
         * A list of asset property value entries.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-iotsitewiseaction.html#cfn-iot-topicrule-iotsitewiseaction-putassetpropertyvalueentries
         */
        readonly putAssetPropertyValueEntries: Array<CfnTopicRule.PutAssetPropertyValueEntryProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The ARN of the role that grants AWS IoT permission to send an asset property value to AWS IoT SiteWise. ( `"Action": "iotsitewise:BatchPutAssetPropertyValue"` ). The trust policy can restrict access to specific asset hierarchy paths.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-iotsitewiseaction.html#cfn-iot-topicrule-iotsitewiseaction-rolearn
         */
        readonly roleArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `IotSiteWiseActionProperty`
 *
 * @param properties - the TypeScript properties of a `IotSiteWiseActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_IotSiteWiseActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('putAssetPropertyValueEntries', cdk.requiredValidator)(properties.putAssetPropertyValueEntries));
    errors.collect(cdk.propertyValidator('putAssetPropertyValueEntries', cdk.listValidator(CfnTopicRule_PutAssetPropertyValueEntryPropertyValidator))(properties.putAssetPropertyValueEntries));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "IotSiteWiseActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.IotSiteWiseAction` resource
 *
 * @param properties - the TypeScript properties of a `IotSiteWiseActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.IotSiteWiseAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleIotSiteWiseActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_IotSiteWiseActionPropertyValidator(properties).assertSuccess();
    return {
        PutAssetPropertyValueEntries: cdk.listMapper(cfnTopicRulePutAssetPropertyValueEntryPropertyToCloudFormation)(properties.putAssetPropertyValueEntries),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleIotSiteWiseActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.IotSiteWiseActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.IotSiteWiseActionProperty>();
    ret.addPropertyResult('putAssetPropertyValueEntries', 'PutAssetPropertyValueEntries', cfn_parse.FromCloudFormation.getArray(CfnTopicRulePutAssetPropertyValueEntryPropertyFromCloudFormation)(properties.PutAssetPropertyValueEntries));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Send messages to an Amazon Managed Streaming for Apache Kafka (Amazon MSK) or self-managed Apache Kafka cluster.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-kafkaaction.html
     */
    export interface KafkaActionProperty {
        /**
         * Properties of the Apache Kafka producer client.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-kafkaaction.html#cfn-iot-topicrule-kafkaaction-clientproperties
         */
        readonly clientProperties: { [key: string]: (string) } | cdk.IResolvable;
        /**
         * The ARN of Kafka action's VPC `TopicRuleDestination` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-kafkaaction.html#cfn-iot-topicrule-kafkaaction-destinationarn
         */
        readonly destinationArn: string;
        /**
         * The Kafka message key.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-kafkaaction.html#cfn-iot-topicrule-kafkaaction-key
         */
        readonly key?: string;
        /**
         * The Kafka message partition.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-kafkaaction.html#cfn-iot-topicrule-kafkaaction-partition
         */
        readonly partition?: string;
        /**
         * The Kafka topic for messages to be sent to the Kafka broker.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-kafkaaction.html#cfn-iot-topicrule-kafkaaction-topic
         */
        readonly topic: string;
    }
}

/**
 * Determine whether the given properties match those of a `KafkaActionProperty`
 *
 * @param properties - the TypeScript properties of a `KafkaActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_KafkaActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clientProperties', cdk.requiredValidator)(properties.clientProperties));
    errors.collect(cdk.propertyValidator('clientProperties', cdk.hashValidator(cdk.validateString))(properties.clientProperties));
    errors.collect(cdk.propertyValidator('destinationArn', cdk.requiredValidator)(properties.destinationArn));
    errors.collect(cdk.propertyValidator('destinationArn', cdk.validateString)(properties.destinationArn));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('partition', cdk.validateString)(properties.partition));
    errors.collect(cdk.propertyValidator('topic', cdk.requiredValidator)(properties.topic));
    errors.collect(cdk.propertyValidator('topic', cdk.validateString)(properties.topic));
    return errors.wrap('supplied properties not correct for "KafkaActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.KafkaAction` resource
 *
 * @param properties - the TypeScript properties of a `KafkaActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.KafkaAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleKafkaActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_KafkaActionPropertyValidator(properties).assertSuccess();
    return {
        ClientProperties: cdk.hashMapper(cdk.stringToCloudFormation)(properties.clientProperties),
        DestinationArn: cdk.stringToCloudFormation(properties.destinationArn),
        Key: cdk.stringToCloudFormation(properties.key),
        Partition: cdk.stringToCloudFormation(properties.partition),
        Topic: cdk.stringToCloudFormation(properties.topic),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleKafkaActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.KafkaActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.KafkaActionProperty>();
    ret.addPropertyResult('clientProperties', 'ClientProperties', cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.ClientProperties));
    ret.addPropertyResult('destinationArn', 'DestinationArn', cfn_parse.FromCloudFormation.getString(properties.DestinationArn));
    ret.addPropertyResult('key', 'Key', properties.Key != null ? cfn_parse.FromCloudFormation.getString(properties.Key) : undefined);
    ret.addPropertyResult('partition', 'Partition', properties.Partition != null ? cfn_parse.FromCloudFormation.getString(properties.Partition) : undefined);
    ret.addPropertyResult('topic', 'Topic', cfn_parse.FromCloudFormation.getString(properties.Topic));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action to write data to an Amazon Kinesis stream.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-kinesisaction.html
     */
    export interface KinesisActionProperty {
        /**
         * The partition key.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-kinesisaction.html#cfn-iot-topicrule-kinesisaction-partitionkey
         */
        readonly partitionKey?: string;
        /**
         * The ARN of the IAM role that grants access to the Amazon Kinesis stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-kinesisaction.html#cfn-iot-topicrule-kinesisaction-rolearn
         */
        readonly roleArn: string;
        /**
         * The name of the Amazon Kinesis stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-kinesisaction.html#cfn-iot-topicrule-kinesisaction-streamname
         */
        readonly streamName: string;
    }
}

/**
 * Determine whether the given properties match those of a `KinesisActionProperty`
 *
 * @param properties - the TypeScript properties of a `KinesisActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_KinesisActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('partitionKey', cdk.validateString)(properties.partitionKey));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('streamName', cdk.requiredValidator)(properties.streamName));
    errors.collect(cdk.propertyValidator('streamName', cdk.validateString)(properties.streamName));
    return errors.wrap('supplied properties not correct for "KinesisActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.KinesisAction` resource
 *
 * @param properties - the TypeScript properties of a `KinesisActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.KinesisAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleKinesisActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_KinesisActionPropertyValidator(properties).assertSuccess();
    return {
        PartitionKey: cdk.stringToCloudFormation(properties.partitionKey),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        StreamName: cdk.stringToCloudFormation(properties.streamName),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleKinesisActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.KinesisActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.KinesisActionProperty>();
    ret.addPropertyResult('partitionKey', 'PartitionKey', properties.PartitionKey != null ? cfn_parse.FromCloudFormation.getString(properties.PartitionKey) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('streamName', 'StreamName', cfn_parse.FromCloudFormation.getString(properties.StreamName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action to invoke a Lambda function.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-lambdaaction.html
     */
    export interface LambdaActionProperty {
        /**
         * The ARN of the Lambda function.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-lambdaaction.html#cfn-iot-topicrule-lambdaaction-functionarn
         */
        readonly functionArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LambdaActionProperty`
 *
 * @param properties - the TypeScript properties of a `LambdaActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_LambdaActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('functionArn', cdk.validateString)(properties.functionArn));
    return errors.wrap('supplied properties not correct for "LambdaActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.LambdaAction` resource
 *
 * @param properties - the TypeScript properties of a `LambdaActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.LambdaAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleLambdaActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_LambdaActionPropertyValidator(properties).assertSuccess();
    return {
        FunctionArn: cdk.stringToCloudFormation(properties.functionArn),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleLambdaActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.LambdaActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.LambdaActionProperty>();
    ret.addPropertyResult('functionArn', 'FunctionArn', properties.FunctionArn != null ? cfn_parse.FromCloudFormation.getString(properties.FunctionArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action that writes data to an Amazon OpenSearch Service domain.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-opensearchaction.html
     */
    export interface OpenSearchActionProperty {
        /**
         * The endpoint of your OpenSearch domain.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-opensearchaction.html#cfn-iot-topicrule-opensearchaction-endpoint
         */
        readonly endpoint: string;
        /**
         * The unique identifier for the document you are storing.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-opensearchaction.html#cfn-iot-topicrule-opensearchaction-id
         */
        readonly id: string;
        /**
         * The OpenSearch index where you want to store your data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-opensearchaction.html#cfn-iot-topicrule-opensearchaction-index
         */
        readonly index: string;
        /**
         * The IAM role ARN that has access to OpenSearch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-opensearchaction.html#cfn-iot-topicrule-opensearchaction-rolearn
         */
        readonly roleArn: string;
        /**
         * The type of document you are storing.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-opensearchaction.html#cfn-iot-topicrule-opensearchaction-type
         */
        readonly type: string;
    }
}

/**
 * Determine whether the given properties match those of a `OpenSearchActionProperty`
 *
 * @param properties - the TypeScript properties of a `OpenSearchActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_OpenSearchActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endpoint', cdk.requiredValidator)(properties.endpoint));
    errors.collect(cdk.propertyValidator('endpoint', cdk.validateString)(properties.endpoint));
    errors.collect(cdk.propertyValidator('id', cdk.requiredValidator)(properties.id));
    errors.collect(cdk.propertyValidator('id', cdk.validateString)(properties.id));
    errors.collect(cdk.propertyValidator('index', cdk.requiredValidator)(properties.index));
    errors.collect(cdk.propertyValidator('index', cdk.validateString)(properties.index));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "OpenSearchActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.OpenSearchAction` resource
 *
 * @param properties - the TypeScript properties of a `OpenSearchActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.OpenSearchAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleOpenSearchActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_OpenSearchActionPropertyValidator(properties).assertSuccess();
    return {
        Endpoint: cdk.stringToCloudFormation(properties.endpoint),
        Id: cdk.stringToCloudFormation(properties.id),
        Index: cdk.stringToCloudFormation(properties.index),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleOpenSearchActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.OpenSearchActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.OpenSearchActionProperty>();
    ret.addPropertyResult('endpoint', 'Endpoint', cfn_parse.FromCloudFormation.getString(properties.Endpoint));
    ret.addPropertyResult('id', 'Id', cfn_parse.FromCloudFormation.getString(properties.Id));
    ret.addPropertyResult('index', 'Index', cfn_parse.FromCloudFormation.getString(properties.Index));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * An asset property value entry containing the following information.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-putassetpropertyvalueentry.html
     */
    export interface PutAssetPropertyValueEntryProperty {
        /**
         * The ID of the AWS IoT SiteWise asset. You must specify either a `propertyAlias` or both an `aliasId` and a `propertyId` . Accepts substitution templates.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-putassetpropertyvalueentry.html#cfn-iot-topicrule-putassetpropertyvalueentry-assetid
         */
        readonly assetId?: string;
        /**
         * Optional. A unique identifier for this entry that you can define to better track which message caused an error in case of failure. Accepts substitution templates. Defaults to a new UUID.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-putassetpropertyvalueentry.html#cfn-iot-topicrule-putassetpropertyvalueentry-entryid
         */
        readonly entryId?: string;
        /**
         * The name of the property alias associated with your asset property. You must specify either a `propertyAlias` or both an `aliasId` and a `propertyId` . Accepts substitution templates.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-putassetpropertyvalueentry.html#cfn-iot-topicrule-putassetpropertyvalueentry-propertyalias
         */
        readonly propertyAlias?: string;
        /**
         * The ID of the asset's property. You must specify either a `propertyAlias` or both an `aliasId` and a `propertyId` . Accepts substitution templates.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-putassetpropertyvalueentry.html#cfn-iot-topicrule-putassetpropertyvalueentry-propertyid
         */
        readonly propertyId?: string;
        /**
         * A list of property values to insert that each contain timestamp, quality, and value (TQV) information.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-putassetpropertyvalueentry.html#cfn-iot-topicrule-putassetpropertyvalueentry-propertyvalues
         */
        readonly propertyValues: Array<CfnTopicRule.AssetPropertyValueProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `PutAssetPropertyValueEntryProperty`
 *
 * @param properties - the TypeScript properties of a `PutAssetPropertyValueEntryProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_PutAssetPropertyValueEntryPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('assetId', cdk.validateString)(properties.assetId));
    errors.collect(cdk.propertyValidator('entryId', cdk.validateString)(properties.entryId));
    errors.collect(cdk.propertyValidator('propertyAlias', cdk.validateString)(properties.propertyAlias));
    errors.collect(cdk.propertyValidator('propertyId', cdk.validateString)(properties.propertyId));
    errors.collect(cdk.propertyValidator('propertyValues', cdk.requiredValidator)(properties.propertyValues));
    errors.collect(cdk.propertyValidator('propertyValues', cdk.listValidator(CfnTopicRule_AssetPropertyValuePropertyValidator))(properties.propertyValues));
    return errors.wrap('supplied properties not correct for "PutAssetPropertyValueEntryProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.PutAssetPropertyValueEntry` resource
 *
 * @param properties - the TypeScript properties of a `PutAssetPropertyValueEntryProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.PutAssetPropertyValueEntry` resource.
 */
// @ts-ignore TS6133
function cfnTopicRulePutAssetPropertyValueEntryPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_PutAssetPropertyValueEntryPropertyValidator(properties).assertSuccess();
    return {
        AssetId: cdk.stringToCloudFormation(properties.assetId),
        EntryId: cdk.stringToCloudFormation(properties.entryId),
        PropertyAlias: cdk.stringToCloudFormation(properties.propertyAlias),
        PropertyId: cdk.stringToCloudFormation(properties.propertyId),
        PropertyValues: cdk.listMapper(cfnTopicRuleAssetPropertyValuePropertyToCloudFormation)(properties.propertyValues),
    };
}

// @ts-ignore TS6133
function CfnTopicRulePutAssetPropertyValueEntryPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.PutAssetPropertyValueEntryProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.PutAssetPropertyValueEntryProperty>();
    ret.addPropertyResult('assetId', 'AssetId', properties.AssetId != null ? cfn_parse.FromCloudFormation.getString(properties.AssetId) : undefined);
    ret.addPropertyResult('entryId', 'EntryId', properties.EntryId != null ? cfn_parse.FromCloudFormation.getString(properties.EntryId) : undefined);
    ret.addPropertyResult('propertyAlias', 'PropertyAlias', properties.PropertyAlias != null ? cfn_parse.FromCloudFormation.getString(properties.PropertyAlias) : undefined);
    ret.addPropertyResult('propertyId', 'PropertyId', properties.PropertyId != null ? cfn_parse.FromCloudFormation.getString(properties.PropertyId) : undefined);
    ret.addPropertyResult('propertyValues', 'PropertyValues', cfn_parse.FromCloudFormation.getArray(CfnTopicRuleAssetPropertyValuePropertyFromCloudFormation)(properties.PropertyValues));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * The input for the DynamoActionVS action that specifies the DynamoDB table to which the message data will be written.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-putiteminput.html
     */
    export interface PutItemInputProperty {
        /**
         * The table where the message data will be written.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-putiteminput.html#cfn-iot-topicrule-putiteminput-tablename
         */
        readonly tableName: string;
    }
}

/**
 * Determine whether the given properties match those of a `PutItemInputProperty`
 *
 * @param properties - the TypeScript properties of a `PutItemInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_PutItemInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('tableName', cdk.requiredValidator)(properties.tableName));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    return errors.wrap('supplied properties not correct for "PutItemInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.PutItemInput` resource
 *
 * @param properties - the TypeScript properties of a `PutItemInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.PutItemInput` resource.
 */
// @ts-ignore TS6133
function cfnTopicRulePutItemInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_PutItemInputPropertyValidator(properties).assertSuccess();
    return {
        TableName: cdk.stringToCloudFormation(properties.tableName),
    };
}

// @ts-ignore TS6133
function CfnTopicRulePutItemInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.PutItemInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.PutItemInputProperty>();
    ret.addPropertyResult('tableName', 'TableName', cfn_parse.FromCloudFormation.getString(properties.TableName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action to republish to another topic.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-republishaction.html
     */
    export interface RepublishActionProperty {
        /**
         * The Quality of Service (QoS) level to use when republishing messages. The default value is 0.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-republishaction.html#cfn-iot-topicrule-republishaction-qos
         */
        readonly qos?: number;
        /**
         * The ARN of the IAM role that grants access.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-republishaction.html#cfn-iot-topicrule-republishaction-rolearn
         */
        readonly roleArn: string;
        /**
         * The name of the MQTT topic.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-republishaction.html#cfn-iot-topicrule-republishaction-topic
         */
        readonly topic: string;
    }
}

/**
 * Determine whether the given properties match those of a `RepublishActionProperty`
 *
 * @param properties - the TypeScript properties of a `RepublishActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_RepublishActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('qos', cdk.validateNumber)(properties.qos));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('topic', cdk.requiredValidator)(properties.topic));
    errors.collect(cdk.propertyValidator('topic', cdk.validateString)(properties.topic));
    return errors.wrap('supplied properties not correct for "RepublishActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.RepublishAction` resource
 *
 * @param properties - the TypeScript properties of a `RepublishActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.RepublishAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleRepublishActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_RepublishActionPropertyValidator(properties).assertSuccess();
    return {
        Qos: cdk.numberToCloudFormation(properties.qos),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        Topic: cdk.stringToCloudFormation(properties.topic),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleRepublishActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.RepublishActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.RepublishActionProperty>();
    ret.addPropertyResult('qos', 'Qos', properties.Qos != null ? cfn_parse.FromCloudFormation.getNumber(properties.Qos) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('topic', 'Topic', cfn_parse.FromCloudFormation.getString(properties.Topic));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action to write data to an Amazon S3 bucket.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-s3action.html
     */
    export interface S3ActionProperty {
        /**
         * The Amazon S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-s3action.html#cfn-iot-topicrule-s3action-bucketname
         */
        readonly bucketName: string;
        /**
         * The Amazon S3 canned ACL that controls access to the object identified by the object key. For more information, see [S3 canned ACLs](https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-s3action.html#cfn-iot-topicrule-s3action-cannedacl
         */
        readonly cannedAcl?: string;
        /**
         * The object key. For more information, see [Actions, resources, and condition keys for Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/list_amazons3.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-s3action.html#cfn-iot-topicrule-s3action-key
         */
        readonly key: string;
        /**
         * The ARN of the IAM role that grants access.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-s3action.html#cfn-iot-topicrule-s3action-rolearn
         */
        readonly roleArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3ActionProperty`
 *
 * @param properties - the TypeScript properties of a `S3ActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_S3ActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketName', cdk.requiredValidator)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketName', cdk.validateString)(properties.bucketName));
    errors.collect(cdk.propertyValidator('cannedAcl', cdk.validateString)(properties.cannedAcl));
    errors.collect(cdk.propertyValidator('key', cdk.requiredValidator)(properties.key));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "S3ActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.S3Action` resource
 *
 * @param properties - the TypeScript properties of a `S3ActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.S3Action` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleS3ActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_S3ActionPropertyValidator(properties).assertSuccess();
    return {
        BucketName: cdk.stringToCloudFormation(properties.bucketName),
        CannedAcl: cdk.stringToCloudFormation(properties.cannedAcl),
        Key: cdk.stringToCloudFormation(properties.key),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleS3ActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.S3ActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.S3ActionProperty>();
    ret.addPropertyResult('bucketName', 'BucketName', cfn_parse.FromCloudFormation.getString(properties.BucketName));
    ret.addPropertyResult('cannedAcl', 'CannedAcl', properties.CannedAcl != null ? cfn_parse.FromCloudFormation.getString(properties.CannedAcl) : undefined);
    ret.addPropertyResult('key', 'Key', cfn_parse.FromCloudFormation.getString(properties.Key));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * For more information, see [Signature Version 4 signing process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-sigv4authorization.html
     */
    export interface SigV4AuthorizationProperty {
        /**
         * The ARN of the signing role.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-sigv4authorization.html#cfn-iot-topicrule-sigv4authorization-rolearn
         */
        readonly roleArn: string;
        /**
         * The service name to use while signing with Sig V4.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-sigv4authorization.html#cfn-iot-topicrule-sigv4authorization-servicename
         */
        readonly serviceName: string;
        /**
         * The signing region.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-sigv4authorization.html#cfn-iot-topicrule-sigv4authorization-signingregion
         */
        readonly signingRegion: string;
    }
}

/**
 * Determine whether the given properties match those of a `SigV4AuthorizationProperty`
 *
 * @param properties - the TypeScript properties of a `SigV4AuthorizationProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_SigV4AuthorizationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('serviceName', cdk.requiredValidator)(properties.serviceName));
    errors.collect(cdk.propertyValidator('serviceName', cdk.validateString)(properties.serviceName));
    errors.collect(cdk.propertyValidator('signingRegion', cdk.requiredValidator)(properties.signingRegion));
    errors.collect(cdk.propertyValidator('signingRegion', cdk.validateString)(properties.signingRegion));
    return errors.wrap('supplied properties not correct for "SigV4AuthorizationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.SigV4Authorization` resource
 *
 * @param properties - the TypeScript properties of a `SigV4AuthorizationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.SigV4Authorization` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleSigV4AuthorizationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_SigV4AuthorizationPropertyValidator(properties).assertSuccess();
    return {
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        ServiceName: cdk.stringToCloudFormation(properties.serviceName),
        SigningRegion: cdk.stringToCloudFormation(properties.signingRegion),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleSigV4AuthorizationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.SigV4AuthorizationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.SigV4AuthorizationProperty>();
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('serviceName', 'ServiceName', cfn_parse.FromCloudFormation.getString(properties.ServiceName));
    ret.addPropertyResult('signingRegion', 'SigningRegion', cfn_parse.FromCloudFormation.getString(properties.SigningRegion));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action to publish to an Amazon SNS topic.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-snsaction.html
     */
    export interface SnsActionProperty {
        /**
         * (Optional) The message format of the message to publish. Accepted values are "JSON" and "RAW". The default value of the attribute is "RAW". SNS uses this setting to determine if the payload should be parsed and relevant platform-specific bits of the payload should be extracted. For more information, see [Amazon SNS Message and JSON Formats](https://docs.aws.amazon.com/sns/latest/dg/json-formats.html) in the *Amazon Simple Notification Service Developer Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-snsaction.html#cfn-iot-topicrule-snsaction-messageformat
         */
        readonly messageFormat?: string;
        /**
         * The ARN of the IAM role that grants access.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-snsaction.html#cfn-iot-topicrule-snsaction-rolearn
         */
        readonly roleArn: string;
        /**
         * The ARN of the SNS topic.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-snsaction.html#cfn-iot-topicrule-snsaction-targetarn
         */
        readonly targetArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `SnsActionProperty`
 *
 * @param properties - the TypeScript properties of a `SnsActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_SnsActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('messageFormat', cdk.validateString)(properties.messageFormat));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('targetArn', cdk.requiredValidator)(properties.targetArn));
    errors.collect(cdk.propertyValidator('targetArn', cdk.validateString)(properties.targetArn));
    return errors.wrap('supplied properties not correct for "SnsActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.SnsAction` resource
 *
 * @param properties - the TypeScript properties of a `SnsActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.SnsAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleSnsActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_SnsActionPropertyValidator(properties).assertSuccess();
    return {
        MessageFormat: cdk.stringToCloudFormation(properties.messageFormat),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        TargetArn: cdk.stringToCloudFormation(properties.targetArn),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleSnsActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.SnsActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.SnsActionProperty>();
    ret.addPropertyResult('messageFormat', 'MessageFormat', properties.MessageFormat != null ? cfn_parse.FromCloudFormation.getString(properties.MessageFormat) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('targetArn', 'TargetArn', cfn_parse.FromCloudFormation.getString(properties.TargetArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action to publish data to an Amazon SQS queue.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-sqsaction.html
     */
    export interface SqsActionProperty {
        /**
         * The URL of the Amazon SQS queue.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-sqsaction.html#cfn-iot-topicrule-sqsaction-queueurl
         */
        readonly queueUrl: string;
        /**
         * The ARN of the IAM role that grants access.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-sqsaction.html#cfn-iot-topicrule-sqsaction-rolearn
         */
        readonly roleArn: string;
        /**
         * Specifies whether to use Base64 encoding.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-sqsaction.html#cfn-iot-topicrule-sqsaction-usebase64
         */
        readonly useBase64?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SqsActionProperty`
 *
 * @param properties - the TypeScript properties of a `SqsActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_SqsActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('queueUrl', cdk.requiredValidator)(properties.queueUrl));
    errors.collect(cdk.propertyValidator('queueUrl', cdk.validateString)(properties.queueUrl));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('useBase64', cdk.validateBoolean)(properties.useBase64));
    return errors.wrap('supplied properties not correct for "SqsActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.SqsAction` resource
 *
 * @param properties - the TypeScript properties of a `SqsActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.SqsAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleSqsActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_SqsActionPropertyValidator(properties).assertSuccess();
    return {
        QueueUrl: cdk.stringToCloudFormation(properties.queueUrl),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        UseBase64: cdk.booleanToCloudFormation(properties.useBase64),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleSqsActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.SqsActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.SqsActionProperty>();
    ret.addPropertyResult('queueUrl', 'QueueUrl', cfn_parse.FromCloudFormation.getString(properties.QueueUrl));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('useBase64', 'UseBase64', properties.UseBase64 != null ? cfn_parse.FromCloudFormation.getBoolean(properties.UseBase64) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Starts execution of a Step Functions state machine.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-stepfunctionsaction.html
     */
    export interface StepFunctionsActionProperty {
        /**
         * (Optional) A name will be given to the state machine execution consisting of this prefix followed by a UUID. Step Functions automatically creates a unique name for each state machine execution if one is not provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-stepfunctionsaction.html#cfn-iot-topicrule-stepfunctionsaction-executionnameprefix
         */
        readonly executionNamePrefix?: string;
        /**
         * The ARN of the role that grants IoT permission to start execution of a state machine ("Action":"states:StartExecution").
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-stepfunctionsaction.html#cfn-iot-topicrule-stepfunctionsaction-rolearn
         */
        readonly roleArn: string;
        /**
         * The name of the Step Functions state machine whose execution will be started.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-stepfunctionsaction.html#cfn-iot-topicrule-stepfunctionsaction-statemachinename
         */
        readonly stateMachineName: string;
    }
}

/**
 * Determine whether the given properties match those of a `StepFunctionsActionProperty`
 *
 * @param properties - the TypeScript properties of a `StepFunctionsActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_StepFunctionsActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('executionNamePrefix', cdk.validateString)(properties.executionNamePrefix));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('stateMachineName', cdk.requiredValidator)(properties.stateMachineName));
    errors.collect(cdk.propertyValidator('stateMachineName', cdk.validateString)(properties.stateMachineName));
    return errors.wrap('supplied properties not correct for "StepFunctionsActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.StepFunctionsAction` resource
 *
 * @param properties - the TypeScript properties of a `StepFunctionsActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.StepFunctionsAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleStepFunctionsActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_StepFunctionsActionPropertyValidator(properties).assertSuccess();
    return {
        ExecutionNamePrefix: cdk.stringToCloudFormation(properties.executionNamePrefix),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        StateMachineName: cdk.stringToCloudFormation(properties.stateMachineName),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleStepFunctionsActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.StepFunctionsActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.StepFunctionsActionProperty>();
    ret.addPropertyResult('executionNamePrefix', 'ExecutionNamePrefix', properties.ExecutionNamePrefix != null ? cfn_parse.FromCloudFormation.getString(properties.ExecutionNamePrefix) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('stateMachineName', 'StateMachineName', cfn_parse.FromCloudFormation.getString(properties.StateMachineName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes an action that writes records into an Amazon Timestream table.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-timestreamaction.html
     */
    export interface TimestreamActionProperty {
        /**
         * Whether to process the action as a batch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-timestreamaction.html#cfn-iot-topicrule-timestreamaction-batchmode
         */
        readonly batchMode?: boolean | cdk.IResolvable;
        /**
         * The name of an Amazon Timestream database that has the table to write records into.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-timestreamaction.html#cfn-iot-topicrule-timestreamaction-databasename
         */
        readonly databaseName: string;
        /**
         * Metadata attributes of the time series that are written in each measure record.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-timestreamaction.html#cfn-iot-topicrule-timestreamaction-dimensions
         */
        readonly dimensions: Array<CfnTopicRule.TimestreamDimensionProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The Amazon Resource Name (ARN) of the role that grants AWS IoT permission to write to the Timestream database table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-timestreamaction.html#cfn-iot-topicrule-timestreamaction-rolearn
         */
        readonly roleArn: string;
        /**
         * The table where the message data will be written.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-timestreamaction.html#cfn-iot-topicrule-timestreamaction-tablename
         */
        readonly tableName: string;
        /**
         * The value to use for the entry's timestamp. If blank, the time that the entry was processed is used.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-timestreamaction.html#cfn-iot-topicrule-timestreamaction-timestamp
         */
        readonly timestamp?: CfnTopicRule.TimestreamTimestampProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `TimestreamActionProperty`
 *
 * @param properties - the TypeScript properties of a `TimestreamActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_TimestreamActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('batchMode', cdk.validateBoolean)(properties.batchMode));
    errors.collect(cdk.propertyValidator('databaseName', cdk.requiredValidator)(properties.databaseName));
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    errors.collect(cdk.propertyValidator('dimensions', cdk.requiredValidator)(properties.dimensions));
    errors.collect(cdk.propertyValidator('dimensions', cdk.listValidator(CfnTopicRule_TimestreamDimensionPropertyValidator))(properties.dimensions));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('tableName', cdk.requiredValidator)(properties.tableName));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    errors.collect(cdk.propertyValidator('timestamp', CfnTopicRule_TimestreamTimestampPropertyValidator)(properties.timestamp));
    return errors.wrap('supplied properties not correct for "TimestreamActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.TimestreamAction` resource
 *
 * @param properties - the TypeScript properties of a `TimestreamActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.TimestreamAction` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleTimestreamActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_TimestreamActionPropertyValidator(properties).assertSuccess();
    return {
        BatchMode: cdk.booleanToCloudFormation(properties.batchMode),
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
        Dimensions: cdk.listMapper(cfnTopicRuleTimestreamDimensionPropertyToCloudFormation)(properties.dimensions),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        TableName: cdk.stringToCloudFormation(properties.tableName),
        Timestamp: cfnTopicRuleTimestreamTimestampPropertyToCloudFormation(properties.timestamp),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleTimestreamActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.TimestreamActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.TimestreamActionProperty>();
    ret.addPropertyResult('batchMode', 'BatchMode', properties.BatchMode != null ? cfn_parse.FromCloudFormation.getBoolean(properties.BatchMode) : undefined);
    ret.addPropertyResult('databaseName', 'DatabaseName', cfn_parse.FromCloudFormation.getString(properties.DatabaseName));
    ret.addPropertyResult('dimensions', 'Dimensions', cfn_parse.FromCloudFormation.getArray(CfnTopicRuleTimestreamDimensionPropertyFromCloudFormation)(properties.Dimensions));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('tableName', 'TableName', cfn_parse.FromCloudFormation.getString(properties.TableName));
    ret.addPropertyResult('timestamp', 'Timestamp', properties.Timestamp != null ? CfnTopicRuleTimestreamTimestampPropertyFromCloudFormation(properties.Timestamp) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Metadata attributes of the time series that are written in each measure record.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-timestreamdimension.html
     */
    export interface TimestreamDimensionProperty {
        /**
         * The metadata dimension name. This is the name of the column in the Amazon Timestream database table record.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-timestreamdimension.html#cfn-iot-topicrule-timestreamdimension-name
         */
        readonly name: string;
        /**
         * The value to write in this column of the database record.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-timestreamdimension.html#cfn-iot-topicrule-timestreamdimension-value
         */
        readonly value: string;
    }
}

/**
 * Determine whether the given properties match those of a `TimestreamDimensionProperty`
 *
 * @param properties - the TypeScript properties of a `TimestreamDimensionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_TimestreamDimensionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "TimestreamDimensionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.TimestreamDimension` resource
 *
 * @param properties - the TypeScript properties of a `TimestreamDimensionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.TimestreamDimension` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleTimestreamDimensionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_TimestreamDimensionPropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleTimestreamDimensionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.TimestreamDimensionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.TimestreamDimensionProperty>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * The value to use for the entry's timestamp. If blank, the time that the entry was processed is used.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-timestreamtimestamp.html
     */
    export interface TimestreamTimestampProperty {
        /**
         * The precision of the timestamp value that results from the expression described in `value` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-timestreamtimestamp.html#cfn-iot-topicrule-timestreamtimestamp-unit
         */
        readonly unit: string;
        /**
         * An expression that returns a long epoch time value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-timestreamtimestamp.html#cfn-iot-topicrule-timestreamtimestamp-value
         */
        readonly value: string;
    }
}

/**
 * Determine whether the given properties match those of a `TimestreamTimestampProperty`
 *
 * @param properties - the TypeScript properties of a `TimestreamTimestampProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_TimestreamTimestampPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('unit', cdk.requiredValidator)(properties.unit));
    errors.collect(cdk.propertyValidator('unit', cdk.validateString)(properties.unit));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "TimestreamTimestampProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.TimestreamTimestamp` resource
 *
 * @param properties - the TypeScript properties of a `TimestreamTimestampProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.TimestreamTimestamp` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleTimestreamTimestampPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_TimestreamTimestampPropertyValidator(properties).assertSuccess();
    return {
        Unit: cdk.stringToCloudFormation(properties.unit),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleTimestreamTimestampPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.TimestreamTimestampProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.TimestreamTimestampProperty>();
    ret.addPropertyResult('unit', 'Unit', cfn_parse.FromCloudFormation.getString(properties.Unit));
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRule {
    /**
     * Describes a rule.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-topicrulepayload.html
     */
    export interface TopicRulePayloadProperty {
        /**
         * The actions associated with the rule.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-topicrulepayload.html#cfn-iot-topicrule-topicrulepayload-actions
         */
        readonly actions: Array<CfnTopicRule.ActionProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The version of the SQL rules engine to use when evaluating the rule.
         *
         * The default value is 2015-10-08.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-topicrulepayload.html#cfn-iot-topicrule-topicrulepayload-awsiotsqlversion
         */
        readonly awsIotSqlVersion?: string;
        /**
         * The description of the rule.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-topicrulepayload.html#cfn-iot-topicrule-topicrulepayload-description
         */
        readonly description?: string;
        /**
         * The action to take when an error occurs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-topicrulepayload.html#cfn-iot-topicrule-topicrulepayload-erroraction
         */
        readonly errorAction?: CfnTopicRule.ActionProperty | cdk.IResolvable;
        /**
         * Specifies whether the rule is disabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-topicrulepayload.html#cfn-iot-topicrule-topicrulepayload-ruledisabled
         */
        readonly ruleDisabled?: boolean | cdk.IResolvable;
        /**
         * The SQL statement used to query the topic. For more information, see [AWS IoT SQL Reference](https://docs.aws.amazon.com/iot/latest/developerguide/iot-sql-reference.html) in the *AWS IoT Developer Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicrule-topicrulepayload.html#cfn-iot-topicrule-topicrulepayload-sql
         */
        readonly sql: string;
    }
}

/**
 * Determine whether the given properties match those of a `TopicRulePayloadProperty`
 *
 * @param properties - the TypeScript properties of a `TopicRulePayloadProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRule_TopicRulePayloadPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('actions', cdk.requiredValidator)(properties.actions));
    errors.collect(cdk.propertyValidator('actions', cdk.listValidator(CfnTopicRule_ActionPropertyValidator))(properties.actions));
    errors.collect(cdk.propertyValidator('awsIotSqlVersion', cdk.validateString)(properties.awsIotSqlVersion));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('errorAction', CfnTopicRule_ActionPropertyValidator)(properties.errorAction));
    errors.collect(cdk.propertyValidator('ruleDisabled', cdk.validateBoolean)(properties.ruleDisabled));
    errors.collect(cdk.propertyValidator('sql', cdk.requiredValidator)(properties.sql));
    errors.collect(cdk.propertyValidator('sql', cdk.validateString)(properties.sql));
    return errors.wrap('supplied properties not correct for "TopicRulePayloadProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRule.TopicRulePayload` resource
 *
 * @param properties - the TypeScript properties of a `TopicRulePayloadProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRule.TopicRulePayload` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleTopicRulePayloadPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRule_TopicRulePayloadPropertyValidator(properties).assertSuccess();
    return {
        Actions: cdk.listMapper(cfnTopicRuleActionPropertyToCloudFormation)(properties.actions),
        AwsIotSqlVersion: cdk.stringToCloudFormation(properties.awsIotSqlVersion),
        Description: cdk.stringToCloudFormation(properties.description),
        ErrorAction: cfnTopicRuleActionPropertyToCloudFormation(properties.errorAction),
        RuleDisabled: cdk.booleanToCloudFormation(properties.ruleDisabled),
        Sql: cdk.stringToCloudFormation(properties.sql),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleTopicRulePayloadPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRule.TopicRulePayloadProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRule.TopicRulePayloadProperty>();
    ret.addPropertyResult('actions', 'Actions', cfn_parse.FromCloudFormation.getArray(CfnTopicRuleActionPropertyFromCloudFormation)(properties.Actions));
    ret.addPropertyResult('awsIotSqlVersion', 'AwsIotSqlVersion', properties.AwsIotSqlVersion != null ? cfn_parse.FromCloudFormation.getString(properties.AwsIotSqlVersion) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('errorAction', 'ErrorAction', properties.ErrorAction != null ? CfnTopicRuleActionPropertyFromCloudFormation(properties.ErrorAction) : undefined);
    ret.addPropertyResult('ruleDisabled', 'RuleDisabled', properties.RuleDisabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.RuleDisabled) : undefined);
    ret.addPropertyResult('sql', 'Sql', cfn_parse.FromCloudFormation.getString(properties.Sql));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnTopicRuleDestination`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicruledestination.html
 */
export interface CfnTopicRuleDestinationProps {

    /**
     * Properties of the HTTP URL.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicruledestination.html#cfn-iot-topicruledestination-httpurlproperties
     */
    readonly httpUrlProperties?: CfnTopicRuleDestination.HttpUrlDestinationSummaryProperty | cdk.IResolvable;

    /**
     * - **IN_PROGRESS** - A topic rule destination was created but has not been confirmed. You can set status to `IN_PROGRESS` by calling `UpdateTopicRuleDestination` . Calling `UpdateTopicRuleDestination` causes a new confirmation challenge to be sent to your confirmation endpoint.
     * - **ENABLED** - Confirmation was completed, and traffic to this destination is allowed. You can set status to `DISABLED` by calling `UpdateTopicRuleDestination` .
     * - **DISABLED** - Confirmation was completed, and traffic to this destination is not allowed. You can set status to `ENABLED` by calling `UpdateTopicRuleDestination` .
     * - **ERROR** - Confirmation could not be completed; for example, if the confirmation timed out. You can call `GetTopicRuleDestination` for details about the error. You can set status to `IN_PROGRESS` by calling `UpdateTopicRuleDestination` . Calling `UpdateTopicRuleDestination` causes a new confirmation challenge to be sent to your confirmation endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicruledestination.html#cfn-iot-topicruledestination-status
     */
    readonly status?: string;

    /**
     * Properties of the virtual private cloud (VPC) connection.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicruledestination.html#cfn-iot-topicruledestination-vpcproperties
     */
    readonly vpcProperties?: CfnTopicRuleDestination.VpcDestinationPropertiesProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnTopicRuleDestinationProps`
 *
 * @param properties - the TypeScript properties of a `CfnTopicRuleDestinationProps`
 *
 * @returns the result of the validation.
 */
function CfnTopicRuleDestinationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('httpUrlProperties', CfnTopicRuleDestination_HttpUrlDestinationSummaryPropertyValidator)(properties.httpUrlProperties));
    errors.collect(cdk.propertyValidator('status', cdk.validateString)(properties.status));
    errors.collect(cdk.propertyValidator('vpcProperties', CfnTopicRuleDestination_VpcDestinationPropertiesPropertyValidator)(properties.vpcProperties));
    return errors.wrap('supplied properties not correct for "CfnTopicRuleDestinationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRuleDestination` resource
 *
 * @param properties - the TypeScript properties of a `CfnTopicRuleDestinationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRuleDestination` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleDestinationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRuleDestinationPropsValidator(properties).assertSuccess();
    return {
        HttpUrlProperties: cfnTopicRuleDestinationHttpUrlDestinationSummaryPropertyToCloudFormation(properties.httpUrlProperties),
        Status: cdk.stringToCloudFormation(properties.status),
        VpcProperties: cfnTopicRuleDestinationVpcDestinationPropertiesPropertyToCloudFormation(properties.vpcProperties),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleDestinationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRuleDestinationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRuleDestinationProps>();
    ret.addPropertyResult('httpUrlProperties', 'HttpUrlProperties', properties.HttpUrlProperties != null ? CfnTopicRuleDestinationHttpUrlDestinationSummaryPropertyFromCloudFormation(properties.HttpUrlProperties) : undefined);
    ret.addPropertyResult('status', 'Status', properties.Status != null ? cfn_parse.FromCloudFormation.getString(properties.Status) : undefined);
    ret.addPropertyResult('vpcProperties', 'VpcProperties', properties.VpcProperties != null ? CfnTopicRuleDestinationVpcDestinationPropertiesPropertyFromCloudFormation(properties.VpcProperties) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoT::TopicRuleDestination`
 *
 * A topic rule destination.
 *
 * @cloudformationResource AWS::IoT::TopicRuleDestination
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicruledestination.html
 */
export class CfnTopicRuleDestination extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoT::TopicRuleDestination";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnTopicRuleDestination {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnTopicRuleDestinationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnTopicRuleDestination(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The topic rule destination URL.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * Additional details or reason why the topic rule destination is in the current status.
     * @cloudformationAttribute StatusReason
     */
    public readonly attrStatusReason: string;

    /**
     * Properties of the HTTP URL.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicruledestination.html#cfn-iot-topicruledestination-httpurlproperties
     */
    public httpUrlProperties: CfnTopicRuleDestination.HttpUrlDestinationSummaryProperty | cdk.IResolvable | undefined;

    /**
     * - **IN_PROGRESS** - A topic rule destination was created but has not been confirmed. You can set status to `IN_PROGRESS` by calling `UpdateTopicRuleDestination` . Calling `UpdateTopicRuleDestination` causes a new confirmation challenge to be sent to your confirmation endpoint.
     * - **ENABLED** - Confirmation was completed, and traffic to this destination is allowed. You can set status to `DISABLED` by calling `UpdateTopicRuleDestination` .
     * - **DISABLED** - Confirmation was completed, and traffic to this destination is not allowed. You can set status to `ENABLED` by calling `UpdateTopicRuleDestination` .
     * - **ERROR** - Confirmation could not be completed; for example, if the confirmation timed out. You can call `GetTopicRuleDestination` for details about the error. You can set status to `IN_PROGRESS` by calling `UpdateTopicRuleDestination` . Calling `UpdateTopicRuleDestination` causes a new confirmation challenge to be sent to your confirmation endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicruledestination.html#cfn-iot-topicruledestination-status
     */
    public status: string | undefined;

    /**
     * Properties of the virtual private cloud (VPC) connection.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicruledestination.html#cfn-iot-topicruledestination-vpcproperties
     */
    public vpcProperties: CfnTopicRuleDestination.VpcDestinationPropertiesProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::IoT::TopicRuleDestination`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnTopicRuleDestinationProps = {}) {
        super(scope, id, { type: CfnTopicRuleDestination.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrStatusReason = cdk.Token.asString(this.getAtt('StatusReason'));

        this.httpUrlProperties = props.httpUrlProperties;
        this.status = props.status;
        this.vpcProperties = props.vpcProperties;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnTopicRuleDestination.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            httpUrlProperties: this.httpUrlProperties,
            status: this.status,
            vpcProperties: this.vpcProperties,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnTopicRuleDestinationPropsToCloudFormation(props);
    }
}

export namespace CfnTopicRuleDestination {
    /**
     * HTTP URL destination properties.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicruledestination-httpurldestinationsummary.html
     */
    export interface HttpUrlDestinationSummaryProperty {
        /**
         * The URL used to confirm the HTTP topic rule destination URL.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicruledestination-httpurldestinationsummary.html#cfn-iot-topicruledestination-httpurldestinationsummary-confirmationurl
         */
        readonly confirmationUrl?: string;
    }
}

/**
 * Determine whether the given properties match those of a `HttpUrlDestinationSummaryProperty`
 *
 * @param properties - the TypeScript properties of a `HttpUrlDestinationSummaryProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRuleDestination_HttpUrlDestinationSummaryPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('confirmationUrl', cdk.validateString)(properties.confirmationUrl));
    return errors.wrap('supplied properties not correct for "HttpUrlDestinationSummaryProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRuleDestination.HttpUrlDestinationSummary` resource
 *
 * @param properties - the TypeScript properties of a `HttpUrlDestinationSummaryProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRuleDestination.HttpUrlDestinationSummary` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleDestinationHttpUrlDestinationSummaryPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRuleDestination_HttpUrlDestinationSummaryPropertyValidator(properties).assertSuccess();
    return {
        ConfirmationUrl: cdk.stringToCloudFormation(properties.confirmationUrl),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleDestinationHttpUrlDestinationSummaryPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRuleDestination.HttpUrlDestinationSummaryProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRuleDestination.HttpUrlDestinationSummaryProperty>();
    ret.addPropertyResult('confirmationUrl', 'ConfirmationUrl', properties.ConfirmationUrl != null ? cfn_parse.FromCloudFormation.getString(properties.ConfirmationUrl) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTopicRuleDestination {
    /**
     * The properties of a virtual private cloud (VPC) destination.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicruledestination-vpcdestinationproperties.html
     */
    export interface VpcDestinationPropertiesProperty {
        /**
         * The ARN of a role that has permission to create and attach to elastic network interfaces (ENIs).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicruledestination-vpcdestinationproperties.html#cfn-iot-topicruledestination-vpcdestinationproperties-rolearn
         */
        readonly roleArn?: string;
        /**
         * The security groups of the VPC destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicruledestination-vpcdestinationproperties.html#cfn-iot-topicruledestination-vpcdestinationproperties-securitygroups
         */
        readonly securityGroups?: string[];
        /**
         * The subnet IDs of the VPC destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicruledestination-vpcdestinationproperties.html#cfn-iot-topicruledestination-vpcdestinationproperties-subnetids
         */
        readonly subnetIds?: string[];
        /**
         * The ID of the VPC.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iot-topicruledestination-vpcdestinationproperties.html#cfn-iot-topicruledestination-vpcdestinationproperties-vpcid
         */
        readonly vpcId?: string;
    }
}

/**
 * Determine whether the given properties match those of a `VpcDestinationPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `VpcDestinationPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnTopicRuleDestination_VpcDestinationPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('securityGroups', cdk.listValidator(cdk.validateString))(properties.securityGroups));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.listValidator(cdk.validateString))(properties.subnetIds));
    errors.collect(cdk.propertyValidator('vpcId', cdk.validateString)(properties.vpcId));
    return errors.wrap('supplied properties not correct for "VpcDestinationPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoT::TopicRuleDestination.VpcDestinationProperties` resource
 *
 * @param properties - the TypeScript properties of a `VpcDestinationPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoT::TopicRuleDestination.VpcDestinationProperties` resource.
 */
// @ts-ignore TS6133
function cfnTopicRuleDestinationVpcDestinationPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTopicRuleDestination_VpcDestinationPropertiesPropertyValidator(properties).assertSuccess();
    return {
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        SecurityGroups: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroups),
        SubnetIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnetIds),
        VpcId: cdk.stringToCloudFormation(properties.vpcId),
    };
}

// @ts-ignore TS6133
function CfnTopicRuleDestinationVpcDestinationPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTopicRuleDestination.VpcDestinationPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTopicRuleDestination.VpcDestinationPropertiesProperty>();
    ret.addPropertyResult('roleArn', 'RoleArn', properties.RoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.RoleArn) : undefined);
    ret.addPropertyResult('securityGroups', 'SecurityGroups', properties.SecurityGroups != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroups) : undefined);
    ret.addPropertyResult('subnetIds', 'SubnetIds', properties.SubnetIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SubnetIds) : undefined);
    ret.addPropertyResult('vpcId', 'VpcId', properties.VpcId != null ? cfn_parse.FromCloudFormation.getString(properties.VpcId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
