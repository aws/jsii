// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:06.507Z","fingerprint":"PGpb3PDjRmzMbtIK0DpZZmkqWTT+SgtGvHCknRq/trU="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnConnectorProfile`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connectorprofile.html
 */
export interface CfnConnectorProfileProps {

    /**
     * Indicates the connection mode and if it is public or private.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connectorprofile.html#cfn-appflow-connectorprofile-connectionmode
     */
    readonly connectionMode: string;

    /**
     * The name of the connector profile. The name is unique for each `ConnectorProfile` in the AWS account .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connectorprofile.html#cfn-appflow-connectorprofile-connectorprofilename
     */
    readonly connectorProfileName: string;

    /**
     * The type of connector, such as Salesforce, Amplitude, and so on.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connectorprofile.html#cfn-appflow-connectorprofile-connectortype
     */
    readonly connectorType: string;

    /**
     * Defines the connector-specific configuration and credentials.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connectorprofile.html#cfn-appflow-connectorprofile-connectorprofileconfig
     */
    readonly connectorProfileConfig?: CfnConnectorProfile.ConnectorProfileConfigProperty | cdk.IResolvable;

    /**
     * The ARN (Amazon Resource Name) of the Key Management Service (KMS) key you provide for encryption. This is required if you do not want to use the Amazon AppFlow-managed KMS key. If you don't provide anything here, Amazon AppFlow uses the Amazon AppFlow-managed KMS key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connectorprofile.html#cfn-appflow-connectorprofile-kmsarn
     */
    readonly kmsArn?: string;
}

/**
 * Determine whether the given properties match those of a `CfnConnectorProfileProps`
 *
 * @param properties - the TypeScript properties of a `CfnConnectorProfileProps`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfilePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('connectionMode', cdk.requiredValidator)(properties.connectionMode));
    errors.collect(cdk.propertyValidator('connectionMode', cdk.validateString)(properties.connectionMode));
    errors.collect(cdk.propertyValidator('connectorProfileConfig', CfnConnectorProfile_ConnectorProfileConfigPropertyValidator)(properties.connectorProfileConfig));
    errors.collect(cdk.propertyValidator('connectorProfileName', cdk.requiredValidator)(properties.connectorProfileName));
    errors.collect(cdk.propertyValidator('connectorProfileName', cdk.validateString)(properties.connectorProfileName));
    errors.collect(cdk.propertyValidator('connectorType', cdk.requiredValidator)(properties.connectorType));
    errors.collect(cdk.propertyValidator('connectorType', cdk.validateString)(properties.connectorType));
    errors.collect(cdk.propertyValidator('kmsArn', cdk.validateString)(properties.kmsArn));
    return errors.wrap('supplied properties not correct for "CfnConnectorProfileProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile` resource
 *
 * @param properties - the TypeScript properties of a `CfnConnectorProfileProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfilePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfilePropsValidator(properties).assertSuccess();
    return {
        ConnectionMode: cdk.stringToCloudFormation(properties.connectionMode),
        ConnectorProfileName: cdk.stringToCloudFormation(properties.connectorProfileName),
        ConnectorType: cdk.stringToCloudFormation(properties.connectorType),
        ConnectorProfileConfig: cfnConnectorProfileConnectorProfileConfigPropertyToCloudFormation(properties.connectorProfileConfig),
        KMSArn: cdk.stringToCloudFormation(properties.kmsArn),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfilePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfileProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfileProps>();
    ret.addPropertyResult('connectionMode', 'ConnectionMode', cfn_parse.FromCloudFormation.getString(properties.ConnectionMode));
    ret.addPropertyResult('connectorProfileName', 'ConnectorProfileName', cfn_parse.FromCloudFormation.getString(properties.ConnectorProfileName));
    ret.addPropertyResult('connectorType', 'ConnectorType', cfn_parse.FromCloudFormation.getString(properties.ConnectorType));
    ret.addPropertyResult('connectorProfileConfig', 'ConnectorProfileConfig', properties.ConnectorProfileConfig != null ? CfnConnectorProfileConnectorProfileConfigPropertyFromCloudFormation(properties.ConnectorProfileConfig) : undefined);
    ret.addPropertyResult('kmsArn', 'KMSArn', properties.KMSArn != null ? cfn_parse.FromCloudFormation.getString(properties.KMSArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppFlow::ConnectorProfile`
 *
 * The `AWS::AppFlow::ConnectorProfile` resource is an Amazon AppFlow resource type that specifies the configuration profile for an instance of a connector. This includes the provided name, credentials ARN, connection-mode, and so on. The fields that are common to all types of connector profiles are explicitly specified under the `Properties` field. The rest of the connector-specific properties are specified under `Properties/ConnectorProfileConfig` .
 *
 * > If you want to use AWS CloudFormation to create a connector profile for connectors that implement OAuth (such as Salesforce, Slack, Zendesk, and Google Analytics), you must fetch the access and refresh tokens. You can do this by implementing your own UI for OAuth, or by retrieving the tokens from elsewhere. Alternatively, you can use the Amazon AppFlow console to create the connector profile, and then use that connector profile in the flow creation CloudFormation template.
 *
 * @cloudformationResource AWS::AppFlow::ConnectorProfile
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connectorprofile.html
 */
export class CfnConnectorProfile extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppFlow::ConnectorProfile";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnConnectorProfile {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnConnectorProfilePropsFromCloudFormation(resourceProperties);
        const ret = new CfnConnectorProfile(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the connector profile.
     * @cloudformationAttribute ConnectorProfileArn
     */
    public readonly attrConnectorProfileArn: string;

    /**
     * The Amazon Resource Name (ARN) of the connector profile credentials.
     * @cloudformationAttribute CredentialsArn
     */
    public readonly attrCredentialsArn: string;

    /**
     * Indicates the connection mode and if it is public or private.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connectorprofile.html#cfn-appflow-connectorprofile-connectionmode
     */
    public connectionMode: string;

    /**
     * The name of the connector profile. The name is unique for each `ConnectorProfile` in the AWS account .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connectorprofile.html#cfn-appflow-connectorprofile-connectorprofilename
     */
    public connectorProfileName: string;

    /**
     * The type of connector, such as Salesforce, Amplitude, and so on.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connectorprofile.html#cfn-appflow-connectorprofile-connectortype
     */
    public connectorType: string;

    /**
     * Defines the connector-specific configuration and credentials.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connectorprofile.html#cfn-appflow-connectorprofile-connectorprofileconfig
     */
    public connectorProfileConfig: CfnConnectorProfile.ConnectorProfileConfigProperty | cdk.IResolvable | undefined;

    /**
     * The ARN (Amazon Resource Name) of the Key Management Service (KMS) key you provide for encryption. This is required if you do not want to use the Amazon AppFlow-managed KMS key. If you don't provide anything here, Amazon AppFlow uses the Amazon AppFlow-managed KMS key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connectorprofile.html#cfn-appflow-connectorprofile-kmsarn
     */
    public kmsArn: string | undefined;

    /**
     * Create a new `AWS::AppFlow::ConnectorProfile`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnConnectorProfileProps) {
        super(scope, id, { type: CfnConnectorProfile.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'connectionMode', this);
        cdk.requireProperty(props, 'connectorProfileName', this);
        cdk.requireProperty(props, 'connectorType', this);
        this.attrConnectorProfileArn = cdk.Token.asString(this.getAtt('ConnectorProfileArn'));
        this.attrCredentialsArn = cdk.Token.asString(this.getAtt('CredentialsArn'));

        this.connectionMode = props.connectionMode;
        this.connectorProfileName = props.connectorProfileName;
        this.connectorType = props.connectorType;
        this.connectorProfileConfig = props.connectorProfileConfig;
        this.kmsArn = props.kmsArn;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnConnectorProfile.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            connectionMode: this.connectionMode,
            connectorProfileName: this.connectorProfileName,
            connectorType: this.connectorType,
            connectorProfileConfig: this.connectorProfileConfig,
            kmsArn: this.kmsArn,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnConnectorProfilePropsToCloudFormation(props);
    }
}

export namespace CfnConnectorProfile {
    /**
     * The `AmplitudeConnectorProfileCredentials` property type specifies the connector-specific credentials required when using Amplitude.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-amplitudeconnectorprofilecredentials.html
     */
    export interface AmplitudeConnectorProfileCredentialsProperty {
        /**
         * A unique alphanumeric identifier used to authenticate a user, developer, or calling program to your API.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-amplitudeconnectorprofilecredentials.html#cfn-appflow-connectorprofile-amplitudeconnectorprofilecredentials-apikey
         */
        readonly apiKey: string;
        /**
         * The Secret Access Key portion of the credentials.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-amplitudeconnectorprofilecredentials.html#cfn-appflow-connectorprofile-amplitudeconnectorprofilecredentials-secretkey
         */
        readonly secretKey: string;
    }
}

/**
 * Determine whether the given properties match those of a `AmplitudeConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `AmplitudeConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_AmplitudeConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiKey', cdk.requiredValidator)(properties.apiKey));
    errors.collect(cdk.propertyValidator('apiKey', cdk.validateString)(properties.apiKey));
    errors.collect(cdk.propertyValidator('secretKey', cdk.requiredValidator)(properties.secretKey));
    errors.collect(cdk.propertyValidator('secretKey', cdk.validateString)(properties.secretKey));
    return errors.wrap('supplied properties not correct for "AmplitudeConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.AmplitudeConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `AmplitudeConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.AmplitudeConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileAmplitudeConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_AmplitudeConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        ApiKey: cdk.stringToCloudFormation(properties.apiKey),
        SecretKey: cdk.stringToCloudFormation(properties.secretKey),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileAmplitudeConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.AmplitudeConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.AmplitudeConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('apiKey', 'ApiKey', cfn_parse.FromCloudFormation.getString(properties.ApiKey));
    ret.addPropertyResult('secretKey', 'SecretKey', cfn_parse.FromCloudFormation.getString(properties.SecretKey));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `ConnectorOAuthRequest` property type specifies the select connectors for which the OAuth workflow is supported, such as Salesforce, Google Analytics, Marketo, Zendesk, and Slack.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectoroauthrequest.html
     */
    export interface ConnectorOAuthRequestProperty {
        /**
         * The code provided by the connector when it has been authenticated via the connected app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectoroauthrequest.html#cfn-appflow-connectorprofile-connectoroauthrequest-authcode
         */
        readonly authCode?: string;
        /**
         * The URL to which the authentication server redirects the browser after authorization has been granted.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectoroauthrequest.html#cfn-appflow-connectorprofile-connectoroauthrequest-redirecturi
         */
        readonly redirectUri?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConnectorOAuthRequestProperty`
 *
 * @param properties - the TypeScript properties of a `ConnectorOAuthRequestProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_ConnectorOAuthRequestPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('authCode', cdk.validateString)(properties.authCode));
    errors.collect(cdk.propertyValidator('redirectUri', cdk.validateString)(properties.redirectUri));
    return errors.wrap('supplied properties not correct for "ConnectorOAuthRequestProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ConnectorOAuthRequest` resource
 *
 * @param properties - the TypeScript properties of a `ConnectorOAuthRequestProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ConnectorOAuthRequest` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileConnectorOAuthRequestPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_ConnectorOAuthRequestPropertyValidator(properties).assertSuccess();
    return {
        AuthCode: cdk.stringToCloudFormation(properties.authCode),
        RedirectUri: cdk.stringToCloudFormation(properties.redirectUri),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileConnectorOAuthRequestPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.ConnectorOAuthRequestProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.ConnectorOAuthRequestProperty>();
    ret.addPropertyResult('authCode', 'AuthCode', properties.AuthCode != null ? cfn_parse.FromCloudFormation.getString(properties.AuthCode) : undefined);
    ret.addPropertyResult('redirectUri', 'RedirectUri', properties.RedirectUri != null ? cfn_parse.FromCloudFormation.getString(properties.RedirectUri) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * Defines the connector-specific configuration and credentials for the connector profile.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileconfig.html
     */
    export interface ConnectorProfileConfigProperty {
        /**
         * The connector-specific credentials required by each connector.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileconfig.html#cfn-appflow-connectorprofile-connectorprofileconfig-connectorprofilecredentials
         */
        readonly connectorProfileCredentials: CfnConnectorProfile.ConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific properties of the profile configuration.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileconfig.html#cfn-appflow-connectorprofile-connectorprofileconfig-connectorprofileproperties
         */
        readonly connectorProfileProperties?: CfnConnectorProfile.ConnectorProfilePropertiesProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ConnectorProfileConfigProperty`
 *
 * @param properties - the TypeScript properties of a `ConnectorProfileConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_ConnectorProfileConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('connectorProfileCredentials', cdk.requiredValidator)(properties.connectorProfileCredentials));
    errors.collect(cdk.propertyValidator('connectorProfileCredentials', CfnConnectorProfile_ConnectorProfileCredentialsPropertyValidator)(properties.connectorProfileCredentials));
    errors.collect(cdk.propertyValidator('connectorProfileProperties', CfnConnectorProfile_ConnectorProfilePropertiesPropertyValidator)(properties.connectorProfileProperties));
    return errors.wrap('supplied properties not correct for "ConnectorProfileConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ConnectorProfileConfig` resource
 *
 * @param properties - the TypeScript properties of a `ConnectorProfileConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ConnectorProfileConfig` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileConnectorProfileConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_ConnectorProfileConfigPropertyValidator(properties).assertSuccess();
    return {
        ConnectorProfileCredentials: cfnConnectorProfileConnectorProfileCredentialsPropertyToCloudFormation(properties.connectorProfileCredentials),
        ConnectorProfileProperties: cfnConnectorProfileConnectorProfilePropertiesPropertyToCloudFormation(properties.connectorProfileProperties),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileConnectorProfileConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.ConnectorProfileConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.ConnectorProfileConfigProperty>();
    ret.addPropertyResult('connectorProfileCredentials', 'ConnectorProfileCredentials', CfnConnectorProfileConnectorProfileCredentialsPropertyFromCloudFormation(properties.ConnectorProfileCredentials));
    ret.addPropertyResult('connectorProfileProperties', 'ConnectorProfileProperties', properties.ConnectorProfileProperties != null ? CfnConnectorProfileConnectorProfilePropertiesPropertyFromCloudFormation(properties.ConnectorProfileProperties) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `ConnectorProfileCredentials` property type specifies the connector-specific credentials required by a given connector.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html
     */
    export interface ConnectorProfileCredentialsProperty {
        /**
         * The connector-specific credentials required when using Amplitude.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-amplitude
         */
        readonly amplitude?: CfnConnectorProfile.AmplitudeConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific credentials required when using Datadog.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-datadog
         */
        readonly datadog?: CfnConnectorProfile.DatadogConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific credentials required when using Dynatrace.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-dynatrace
         */
        readonly dynatrace?: CfnConnectorProfile.DynatraceConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific credentials required when using Google Analytics.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-googleanalytics
         */
        readonly googleAnalytics?: CfnConnectorProfile.GoogleAnalyticsConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific credentials required when using Infor Nexus.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-infornexus
         */
        readonly inforNexus?: CfnConnectorProfile.InforNexusConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific credentials required when using Marketo.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-marketo
         */
        readonly marketo?: CfnConnectorProfile.MarketoConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific credentials required when using Amazon Redshift.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-redshift
         */
        readonly redshift?: CfnConnectorProfile.RedshiftConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * `CfnConnectorProfile.ConnectorProfileCredentialsProperty.SAPOData`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-sapodata
         */
        readonly sapoData?: CfnConnectorProfile.SAPODataConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific credentials required when using Salesforce.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-salesforce
         */
        readonly salesforce?: CfnConnectorProfile.SalesforceConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific credentials required when using ServiceNow.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-servicenow
         */
        readonly serviceNow?: CfnConnectorProfile.ServiceNowConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific credentials required when using Singular.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-singular
         */
        readonly singular?: CfnConnectorProfile.SingularConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific credentials required when using Slack.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-slack
         */
        readonly slack?: CfnConnectorProfile.SlackConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific credentials required when using Snowflake.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-snowflake
         */
        readonly snowflake?: CfnConnectorProfile.SnowflakeConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific credentials required when using Trend Micro.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-trendmicro
         */
        readonly trendmicro?: CfnConnectorProfile.TrendmicroConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific credentials required when using Veeva.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-veeva
         */
        readonly veeva?: CfnConnectorProfile.VeevaConnectorProfileCredentialsProperty | cdk.IResolvable;
        /**
         * The connector-specific credentials required when using Zendesk.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofilecredentials.html#cfn-appflow-connectorprofile-connectorprofilecredentials-zendesk
         */
        readonly zendesk?: CfnConnectorProfile.ZendeskConnectorProfileCredentialsProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `ConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_ConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('amplitude', CfnConnectorProfile_AmplitudeConnectorProfileCredentialsPropertyValidator)(properties.amplitude));
    errors.collect(cdk.propertyValidator('datadog', CfnConnectorProfile_DatadogConnectorProfileCredentialsPropertyValidator)(properties.datadog));
    errors.collect(cdk.propertyValidator('dynatrace', CfnConnectorProfile_DynatraceConnectorProfileCredentialsPropertyValidator)(properties.dynatrace));
    errors.collect(cdk.propertyValidator('googleAnalytics', CfnConnectorProfile_GoogleAnalyticsConnectorProfileCredentialsPropertyValidator)(properties.googleAnalytics));
    errors.collect(cdk.propertyValidator('inforNexus', CfnConnectorProfile_InforNexusConnectorProfileCredentialsPropertyValidator)(properties.inforNexus));
    errors.collect(cdk.propertyValidator('marketo', CfnConnectorProfile_MarketoConnectorProfileCredentialsPropertyValidator)(properties.marketo));
    errors.collect(cdk.propertyValidator('redshift', CfnConnectorProfile_RedshiftConnectorProfileCredentialsPropertyValidator)(properties.redshift));
    errors.collect(cdk.propertyValidator('sapoData', CfnConnectorProfile_SAPODataConnectorProfileCredentialsPropertyValidator)(properties.sapoData));
    errors.collect(cdk.propertyValidator('salesforce', CfnConnectorProfile_SalesforceConnectorProfileCredentialsPropertyValidator)(properties.salesforce));
    errors.collect(cdk.propertyValidator('serviceNow', CfnConnectorProfile_ServiceNowConnectorProfileCredentialsPropertyValidator)(properties.serviceNow));
    errors.collect(cdk.propertyValidator('singular', CfnConnectorProfile_SingularConnectorProfileCredentialsPropertyValidator)(properties.singular));
    errors.collect(cdk.propertyValidator('slack', CfnConnectorProfile_SlackConnectorProfileCredentialsPropertyValidator)(properties.slack));
    errors.collect(cdk.propertyValidator('snowflake', CfnConnectorProfile_SnowflakeConnectorProfileCredentialsPropertyValidator)(properties.snowflake));
    errors.collect(cdk.propertyValidator('trendmicro', CfnConnectorProfile_TrendmicroConnectorProfileCredentialsPropertyValidator)(properties.trendmicro));
    errors.collect(cdk.propertyValidator('veeva', CfnConnectorProfile_VeevaConnectorProfileCredentialsPropertyValidator)(properties.veeva));
    errors.collect(cdk.propertyValidator('zendesk', CfnConnectorProfile_ZendeskConnectorProfileCredentialsPropertyValidator)(properties.zendesk));
    return errors.wrap('supplied properties not correct for "ConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `ConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_ConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        Amplitude: cfnConnectorProfileAmplitudeConnectorProfileCredentialsPropertyToCloudFormation(properties.amplitude),
        Datadog: cfnConnectorProfileDatadogConnectorProfileCredentialsPropertyToCloudFormation(properties.datadog),
        Dynatrace: cfnConnectorProfileDynatraceConnectorProfileCredentialsPropertyToCloudFormation(properties.dynatrace),
        GoogleAnalytics: cfnConnectorProfileGoogleAnalyticsConnectorProfileCredentialsPropertyToCloudFormation(properties.googleAnalytics),
        InforNexus: cfnConnectorProfileInforNexusConnectorProfileCredentialsPropertyToCloudFormation(properties.inforNexus),
        Marketo: cfnConnectorProfileMarketoConnectorProfileCredentialsPropertyToCloudFormation(properties.marketo),
        Redshift: cfnConnectorProfileRedshiftConnectorProfileCredentialsPropertyToCloudFormation(properties.redshift),
        SAPOData: cfnConnectorProfileSAPODataConnectorProfileCredentialsPropertyToCloudFormation(properties.sapoData),
        Salesforce: cfnConnectorProfileSalesforceConnectorProfileCredentialsPropertyToCloudFormation(properties.salesforce),
        ServiceNow: cfnConnectorProfileServiceNowConnectorProfileCredentialsPropertyToCloudFormation(properties.serviceNow),
        Singular: cfnConnectorProfileSingularConnectorProfileCredentialsPropertyToCloudFormation(properties.singular),
        Slack: cfnConnectorProfileSlackConnectorProfileCredentialsPropertyToCloudFormation(properties.slack),
        Snowflake: cfnConnectorProfileSnowflakeConnectorProfileCredentialsPropertyToCloudFormation(properties.snowflake),
        Trendmicro: cfnConnectorProfileTrendmicroConnectorProfileCredentialsPropertyToCloudFormation(properties.trendmicro),
        Veeva: cfnConnectorProfileVeevaConnectorProfileCredentialsPropertyToCloudFormation(properties.veeva),
        Zendesk: cfnConnectorProfileZendeskConnectorProfileCredentialsPropertyToCloudFormation(properties.zendesk),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.ConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.ConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('amplitude', 'Amplitude', properties.Amplitude != null ? CfnConnectorProfileAmplitudeConnectorProfileCredentialsPropertyFromCloudFormation(properties.Amplitude) : undefined);
    ret.addPropertyResult('datadog', 'Datadog', properties.Datadog != null ? CfnConnectorProfileDatadogConnectorProfileCredentialsPropertyFromCloudFormation(properties.Datadog) : undefined);
    ret.addPropertyResult('dynatrace', 'Dynatrace', properties.Dynatrace != null ? CfnConnectorProfileDynatraceConnectorProfileCredentialsPropertyFromCloudFormation(properties.Dynatrace) : undefined);
    ret.addPropertyResult('googleAnalytics', 'GoogleAnalytics', properties.GoogleAnalytics != null ? CfnConnectorProfileGoogleAnalyticsConnectorProfileCredentialsPropertyFromCloudFormation(properties.GoogleAnalytics) : undefined);
    ret.addPropertyResult('inforNexus', 'InforNexus', properties.InforNexus != null ? CfnConnectorProfileInforNexusConnectorProfileCredentialsPropertyFromCloudFormation(properties.InforNexus) : undefined);
    ret.addPropertyResult('marketo', 'Marketo', properties.Marketo != null ? CfnConnectorProfileMarketoConnectorProfileCredentialsPropertyFromCloudFormation(properties.Marketo) : undefined);
    ret.addPropertyResult('redshift', 'Redshift', properties.Redshift != null ? CfnConnectorProfileRedshiftConnectorProfileCredentialsPropertyFromCloudFormation(properties.Redshift) : undefined);
    ret.addPropertyResult('sapoData', 'SAPOData', properties.SAPOData != null ? CfnConnectorProfileSAPODataConnectorProfileCredentialsPropertyFromCloudFormation(properties.SAPOData) : undefined);
    ret.addPropertyResult('salesforce', 'Salesforce', properties.Salesforce != null ? CfnConnectorProfileSalesforceConnectorProfileCredentialsPropertyFromCloudFormation(properties.Salesforce) : undefined);
    ret.addPropertyResult('serviceNow', 'ServiceNow', properties.ServiceNow != null ? CfnConnectorProfileServiceNowConnectorProfileCredentialsPropertyFromCloudFormation(properties.ServiceNow) : undefined);
    ret.addPropertyResult('singular', 'Singular', properties.Singular != null ? CfnConnectorProfileSingularConnectorProfileCredentialsPropertyFromCloudFormation(properties.Singular) : undefined);
    ret.addPropertyResult('slack', 'Slack', properties.Slack != null ? CfnConnectorProfileSlackConnectorProfileCredentialsPropertyFromCloudFormation(properties.Slack) : undefined);
    ret.addPropertyResult('snowflake', 'Snowflake', properties.Snowflake != null ? CfnConnectorProfileSnowflakeConnectorProfileCredentialsPropertyFromCloudFormation(properties.Snowflake) : undefined);
    ret.addPropertyResult('trendmicro', 'Trendmicro', properties.Trendmicro != null ? CfnConnectorProfileTrendmicroConnectorProfileCredentialsPropertyFromCloudFormation(properties.Trendmicro) : undefined);
    ret.addPropertyResult('veeva', 'Veeva', properties.Veeva != null ? CfnConnectorProfileVeevaConnectorProfileCredentialsPropertyFromCloudFormation(properties.Veeva) : undefined);
    ret.addPropertyResult('zendesk', 'Zendesk', properties.Zendesk != null ? CfnConnectorProfileZendeskConnectorProfileCredentialsPropertyFromCloudFormation(properties.Zendesk) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `ConnectorProfileProperties` property type specifies the connector-specific profile properties required by each connector.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileproperties.html
     */
    export interface ConnectorProfilePropertiesProperty {
        /**
         * The connector-specific properties required by Datadog.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileproperties.html#cfn-appflow-connectorprofile-connectorprofileproperties-datadog
         */
        readonly datadog?: CfnConnectorProfile.DatadogConnectorProfilePropertiesProperty | cdk.IResolvable;
        /**
         * The connector-specific properties required by Dynatrace.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileproperties.html#cfn-appflow-connectorprofile-connectorprofileproperties-dynatrace
         */
        readonly dynatrace?: CfnConnectorProfile.DynatraceConnectorProfilePropertiesProperty | cdk.IResolvable;
        /**
         * The connector-specific properties required by Infor Nexus.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileproperties.html#cfn-appflow-connectorprofile-connectorprofileproperties-infornexus
         */
        readonly inforNexus?: CfnConnectorProfile.InforNexusConnectorProfilePropertiesProperty | cdk.IResolvable;
        /**
         * The connector-specific properties required by Marketo.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileproperties.html#cfn-appflow-connectorprofile-connectorprofileproperties-marketo
         */
        readonly marketo?: CfnConnectorProfile.MarketoConnectorProfilePropertiesProperty | cdk.IResolvable;
        /**
         * The connector-specific properties required by Amazon Redshift.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileproperties.html#cfn-appflow-connectorprofile-connectorprofileproperties-redshift
         */
        readonly redshift?: CfnConnectorProfile.RedshiftConnectorProfilePropertiesProperty | cdk.IResolvable;
        /**
         * `CfnConnectorProfile.ConnectorProfilePropertiesProperty.SAPOData`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileproperties.html#cfn-appflow-connectorprofile-connectorprofileproperties-sapodata
         */
        readonly sapoData?: CfnConnectorProfile.SAPODataConnectorProfilePropertiesProperty | cdk.IResolvable;
        /**
         * The connector-specific properties required by Salesforce.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileproperties.html#cfn-appflow-connectorprofile-connectorprofileproperties-salesforce
         */
        readonly salesforce?: CfnConnectorProfile.SalesforceConnectorProfilePropertiesProperty | cdk.IResolvable;
        /**
         * The connector-specific properties required by serviceNow.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileproperties.html#cfn-appflow-connectorprofile-connectorprofileproperties-servicenow
         */
        readonly serviceNow?: CfnConnectorProfile.ServiceNowConnectorProfilePropertiesProperty | cdk.IResolvable;
        /**
         * The connector-specific properties required by Slack.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileproperties.html#cfn-appflow-connectorprofile-connectorprofileproperties-slack
         */
        readonly slack?: CfnConnectorProfile.SlackConnectorProfilePropertiesProperty | cdk.IResolvable;
        /**
         * The connector-specific properties required by Snowflake.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileproperties.html#cfn-appflow-connectorprofile-connectorprofileproperties-snowflake
         */
        readonly snowflake?: CfnConnectorProfile.SnowflakeConnectorProfilePropertiesProperty | cdk.IResolvable;
        /**
         * The connector-specific properties required by Veeva.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileproperties.html#cfn-appflow-connectorprofile-connectorprofileproperties-veeva
         */
        readonly veeva?: CfnConnectorProfile.VeevaConnectorProfilePropertiesProperty | cdk.IResolvable;
        /**
         * The connector-specific properties required by Zendesk.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-connectorprofileproperties.html#cfn-appflow-connectorprofile-connectorprofileproperties-zendesk
         */
        readonly zendesk?: CfnConnectorProfile.ZendeskConnectorProfilePropertiesProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ConnectorProfilePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `ConnectorProfilePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_ConnectorProfilePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('datadog', CfnConnectorProfile_DatadogConnectorProfilePropertiesPropertyValidator)(properties.datadog));
    errors.collect(cdk.propertyValidator('dynatrace', CfnConnectorProfile_DynatraceConnectorProfilePropertiesPropertyValidator)(properties.dynatrace));
    errors.collect(cdk.propertyValidator('inforNexus', CfnConnectorProfile_InforNexusConnectorProfilePropertiesPropertyValidator)(properties.inforNexus));
    errors.collect(cdk.propertyValidator('marketo', CfnConnectorProfile_MarketoConnectorProfilePropertiesPropertyValidator)(properties.marketo));
    errors.collect(cdk.propertyValidator('redshift', CfnConnectorProfile_RedshiftConnectorProfilePropertiesPropertyValidator)(properties.redshift));
    errors.collect(cdk.propertyValidator('sapoData', CfnConnectorProfile_SAPODataConnectorProfilePropertiesPropertyValidator)(properties.sapoData));
    errors.collect(cdk.propertyValidator('salesforce', CfnConnectorProfile_SalesforceConnectorProfilePropertiesPropertyValidator)(properties.salesforce));
    errors.collect(cdk.propertyValidator('serviceNow', CfnConnectorProfile_ServiceNowConnectorProfilePropertiesPropertyValidator)(properties.serviceNow));
    errors.collect(cdk.propertyValidator('slack', CfnConnectorProfile_SlackConnectorProfilePropertiesPropertyValidator)(properties.slack));
    errors.collect(cdk.propertyValidator('snowflake', CfnConnectorProfile_SnowflakeConnectorProfilePropertiesPropertyValidator)(properties.snowflake));
    errors.collect(cdk.propertyValidator('veeva', CfnConnectorProfile_VeevaConnectorProfilePropertiesPropertyValidator)(properties.veeva));
    errors.collect(cdk.propertyValidator('zendesk', CfnConnectorProfile_ZendeskConnectorProfilePropertiesPropertyValidator)(properties.zendesk));
    return errors.wrap('supplied properties not correct for "ConnectorProfilePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ConnectorProfileProperties` resource
 *
 * @param properties - the TypeScript properties of a `ConnectorProfilePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ConnectorProfileProperties` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileConnectorProfilePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_ConnectorProfilePropertiesPropertyValidator(properties).assertSuccess();
    return {
        Datadog: cfnConnectorProfileDatadogConnectorProfilePropertiesPropertyToCloudFormation(properties.datadog),
        Dynatrace: cfnConnectorProfileDynatraceConnectorProfilePropertiesPropertyToCloudFormation(properties.dynatrace),
        InforNexus: cfnConnectorProfileInforNexusConnectorProfilePropertiesPropertyToCloudFormation(properties.inforNexus),
        Marketo: cfnConnectorProfileMarketoConnectorProfilePropertiesPropertyToCloudFormation(properties.marketo),
        Redshift: cfnConnectorProfileRedshiftConnectorProfilePropertiesPropertyToCloudFormation(properties.redshift),
        SAPOData: cfnConnectorProfileSAPODataConnectorProfilePropertiesPropertyToCloudFormation(properties.sapoData),
        Salesforce: cfnConnectorProfileSalesforceConnectorProfilePropertiesPropertyToCloudFormation(properties.salesforce),
        ServiceNow: cfnConnectorProfileServiceNowConnectorProfilePropertiesPropertyToCloudFormation(properties.serviceNow),
        Slack: cfnConnectorProfileSlackConnectorProfilePropertiesPropertyToCloudFormation(properties.slack),
        Snowflake: cfnConnectorProfileSnowflakeConnectorProfilePropertiesPropertyToCloudFormation(properties.snowflake),
        Veeva: cfnConnectorProfileVeevaConnectorProfilePropertiesPropertyToCloudFormation(properties.veeva),
        Zendesk: cfnConnectorProfileZendeskConnectorProfilePropertiesPropertyToCloudFormation(properties.zendesk),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileConnectorProfilePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.ConnectorProfilePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.ConnectorProfilePropertiesProperty>();
    ret.addPropertyResult('datadog', 'Datadog', properties.Datadog != null ? CfnConnectorProfileDatadogConnectorProfilePropertiesPropertyFromCloudFormation(properties.Datadog) : undefined);
    ret.addPropertyResult('dynatrace', 'Dynatrace', properties.Dynatrace != null ? CfnConnectorProfileDynatraceConnectorProfilePropertiesPropertyFromCloudFormation(properties.Dynatrace) : undefined);
    ret.addPropertyResult('inforNexus', 'InforNexus', properties.InforNexus != null ? CfnConnectorProfileInforNexusConnectorProfilePropertiesPropertyFromCloudFormation(properties.InforNexus) : undefined);
    ret.addPropertyResult('marketo', 'Marketo', properties.Marketo != null ? CfnConnectorProfileMarketoConnectorProfilePropertiesPropertyFromCloudFormation(properties.Marketo) : undefined);
    ret.addPropertyResult('redshift', 'Redshift', properties.Redshift != null ? CfnConnectorProfileRedshiftConnectorProfilePropertiesPropertyFromCloudFormation(properties.Redshift) : undefined);
    ret.addPropertyResult('sapoData', 'SAPOData', properties.SAPOData != null ? CfnConnectorProfileSAPODataConnectorProfilePropertiesPropertyFromCloudFormation(properties.SAPOData) : undefined);
    ret.addPropertyResult('salesforce', 'Salesforce', properties.Salesforce != null ? CfnConnectorProfileSalesforceConnectorProfilePropertiesPropertyFromCloudFormation(properties.Salesforce) : undefined);
    ret.addPropertyResult('serviceNow', 'ServiceNow', properties.ServiceNow != null ? CfnConnectorProfileServiceNowConnectorProfilePropertiesPropertyFromCloudFormation(properties.ServiceNow) : undefined);
    ret.addPropertyResult('slack', 'Slack', properties.Slack != null ? CfnConnectorProfileSlackConnectorProfilePropertiesPropertyFromCloudFormation(properties.Slack) : undefined);
    ret.addPropertyResult('snowflake', 'Snowflake', properties.Snowflake != null ? CfnConnectorProfileSnowflakeConnectorProfilePropertiesPropertyFromCloudFormation(properties.Snowflake) : undefined);
    ret.addPropertyResult('veeva', 'Veeva', properties.Veeva != null ? CfnConnectorProfileVeevaConnectorProfilePropertiesPropertyFromCloudFormation(properties.Veeva) : undefined);
    ret.addPropertyResult('zendesk', 'Zendesk', properties.Zendesk != null ? CfnConnectorProfileZendeskConnectorProfilePropertiesPropertyFromCloudFormation(properties.Zendesk) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `DatadogConnectorProfileCredentials` property type specifies the connector-specific credentials required by Datadog.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-datadogconnectorprofilecredentials.html
     */
    export interface DatadogConnectorProfileCredentialsProperty {
        /**
         * A unique alphanumeric identifier used to authenticate a user, developer, or calling program to your API.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-datadogconnectorprofilecredentials.html#cfn-appflow-connectorprofile-datadogconnectorprofilecredentials-apikey
         */
        readonly apiKey: string;
        /**
         * Application keys, in conjunction with your API key, give you full access to Datadog’s programmatic API. Application keys are associated with the user account that created them. The application key is used to log all requests made to the API.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-datadogconnectorprofilecredentials.html#cfn-appflow-connectorprofile-datadogconnectorprofilecredentials-applicationkey
         */
        readonly applicationKey: string;
    }
}

/**
 * Determine whether the given properties match those of a `DatadogConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `DatadogConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_DatadogConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiKey', cdk.requiredValidator)(properties.apiKey));
    errors.collect(cdk.propertyValidator('apiKey', cdk.validateString)(properties.apiKey));
    errors.collect(cdk.propertyValidator('applicationKey', cdk.requiredValidator)(properties.applicationKey));
    errors.collect(cdk.propertyValidator('applicationKey', cdk.validateString)(properties.applicationKey));
    return errors.wrap('supplied properties not correct for "DatadogConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.DatadogConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `DatadogConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.DatadogConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileDatadogConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_DatadogConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        ApiKey: cdk.stringToCloudFormation(properties.apiKey),
        ApplicationKey: cdk.stringToCloudFormation(properties.applicationKey),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileDatadogConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.DatadogConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.DatadogConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('apiKey', 'ApiKey', cfn_parse.FromCloudFormation.getString(properties.ApiKey));
    ret.addPropertyResult('applicationKey', 'ApplicationKey', cfn_parse.FromCloudFormation.getString(properties.ApplicationKey));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `DatadogConnectorProfileProperties` property type specifies the connector-specific profile properties required by Datadog.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-datadogconnectorprofileproperties.html
     */
    export interface DatadogConnectorProfilePropertiesProperty {
        /**
         * The location of the Datadog resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-datadogconnectorprofileproperties.html#cfn-appflow-connectorprofile-datadogconnectorprofileproperties-instanceurl
         */
        readonly instanceUrl: string;
    }
}

/**
 * Determine whether the given properties match those of a `DatadogConnectorProfilePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `DatadogConnectorProfilePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_DatadogConnectorProfilePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.requiredValidator)(properties.instanceUrl));
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.validateString)(properties.instanceUrl));
    return errors.wrap('supplied properties not correct for "DatadogConnectorProfilePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.DatadogConnectorProfileProperties` resource
 *
 * @param properties - the TypeScript properties of a `DatadogConnectorProfilePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.DatadogConnectorProfileProperties` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileDatadogConnectorProfilePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_DatadogConnectorProfilePropertiesPropertyValidator(properties).assertSuccess();
    return {
        InstanceUrl: cdk.stringToCloudFormation(properties.instanceUrl),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileDatadogConnectorProfilePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.DatadogConnectorProfilePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.DatadogConnectorProfilePropertiesProperty>();
    ret.addPropertyResult('instanceUrl', 'InstanceUrl', cfn_parse.FromCloudFormation.getString(properties.InstanceUrl));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `DynatraceConnectorProfileCredentials` property type specifies the connector-specific profile credentials required by Dynatrace.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-dynatraceconnectorprofilecredentials.html
     */
    export interface DynatraceConnectorProfileCredentialsProperty {
        /**
         * The API tokens used by Dynatrace API to authenticate various API calls.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-dynatraceconnectorprofilecredentials.html#cfn-appflow-connectorprofile-dynatraceconnectorprofilecredentials-apitoken
         */
        readonly apiToken: string;
    }
}

/**
 * Determine whether the given properties match those of a `DynatraceConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `DynatraceConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_DynatraceConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiToken', cdk.requiredValidator)(properties.apiToken));
    errors.collect(cdk.propertyValidator('apiToken', cdk.validateString)(properties.apiToken));
    return errors.wrap('supplied properties not correct for "DynatraceConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.DynatraceConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `DynatraceConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.DynatraceConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileDynatraceConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_DynatraceConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        ApiToken: cdk.stringToCloudFormation(properties.apiToken),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileDynatraceConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.DynatraceConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.DynatraceConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('apiToken', 'ApiToken', cfn_parse.FromCloudFormation.getString(properties.ApiToken));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `DynatraceConnectorProfileProperties` property type specifies the connector-specific profile properties required by Dynatrace.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-dynatraceconnectorprofileproperties.html
     */
    export interface DynatraceConnectorProfilePropertiesProperty {
        /**
         * The location of the Dynatrace resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-dynatraceconnectorprofileproperties.html#cfn-appflow-connectorprofile-dynatraceconnectorprofileproperties-instanceurl
         */
        readonly instanceUrl: string;
    }
}

/**
 * Determine whether the given properties match those of a `DynatraceConnectorProfilePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `DynatraceConnectorProfilePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_DynatraceConnectorProfilePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.requiredValidator)(properties.instanceUrl));
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.validateString)(properties.instanceUrl));
    return errors.wrap('supplied properties not correct for "DynatraceConnectorProfilePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.DynatraceConnectorProfileProperties` resource
 *
 * @param properties - the TypeScript properties of a `DynatraceConnectorProfilePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.DynatraceConnectorProfileProperties` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileDynatraceConnectorProfilePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_DynatraceConnectorProfilePropertiesPropertyValidator(properties).assertSuccess();
    return {
        InstanceUrl: cdk.stringToCloudFormation(properties.instanceUrl),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileDynatraceConnectorProfilePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.DynatraceConnectorProfilePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.DynatraceConnectorProfilePropertiesProperty>();
    ret.addPropertyResult('instanceUrl', 'InstanceUrl', cfn_parse.FromCloudFormation.getString(properties.InstanceUrl));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `GoogleAnalyticsConnectorProfileCredentials` property type specifies the connector-specific profile credentials required by Google Analytics.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-googleanalyticsconnectorprofilecredentials.html
     */
    export interface GoogleAnalyticsConnectorProfileCredentialsProperty {
        /**
         * The credentials used to access protected Google Analytics resources.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-googleanalyticsconnectorprofilecredentials.html#cfn-appflow-connectorprofile-googleanalyticsconnectorprofilecredentials-accesstoken
         */
        readonly accessToken?: string;
        /**
         * The identifier for the desired client.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-googleanalyticsconnectorprofilecredentials.html#cfn-appflow-connectorprofile-googleanalyticsconnectorprofilecredentials-clientid
         */
        readonly clientId: string;
        /**
         * The client secret used by the OAuth client to authenticate to the authorization server.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-googleanalyticsconnectorprofilecredentials.html#cfn-appflow-connectorprofile-googleanalyticsconnectorprofilecredentials-clientsecret
         */
        readonly clientSecret: string;
        /**
         * Used by select connectors for which the OAuth workflow is supported, such as Salesforce, Google Analytics, Marketo, Zendesk, and Slack.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-googleanalyticsconnectorprofilecredentials.html#cfn-appflow-connectorprofile-googleanalyticsconnectorprofilecredentials-connectoroauthrequest
         */
        readonly connectorOAuthRequest?: CfnConnectorProfile.ConnectorOAuthRequestProperty | cdk.IResolvable;
        /**
         * The credentials used to acquire new access tokens. This is required only for OAuth2 access tokens, and is not required for OAuth1 access tokens.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-googleanalyticsconnectorprofilecredentials.html#cfn-appflow-connectorprofile-googleanalyticsconnectorprofilecredentials-refreshtoken
         */
        readonly refreshToken?: string;
    }
}

/**
 * Determine whether the given properties match those of a `GoogleAnalyticsConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `GoogleAnalyticsConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_GoogleAnalyticsConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessToken', cdk.validateString)(properties.accessToken));
    errors.collect(cdk.propertyValidator('clientId', cdk.requiredValidator)(properties.clientId));
    errors.collect(cdk.propertyValidator('clientId', cdk.validateString)(properties.clientId));
    errors.collect(cdk.propertyValidator('clientSecret', cdk.requiredValidator)(properties.clientSecret));
    errors.collect(cdk.propertyValidator('clientSecret', cdk.validateString)(properties.clientSecret));
    errors.collect(cdk.propertyValidator('connectorOAuthRequest', CfnConnectorProfile_ConnectorOAuthRequestPropertyValidator)(properties.connectorOAuthRequest));
    errors.collect(cdk.propertyValidator('refreshToken', cdk.validateString)(properties.refreshToken));
    return errors.wrap('supplied properties not correct for "GoogleAnalyticsConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.GoogleAnalyticsConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `GoogleAnalyticsConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.GoogleAnalyticsConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileGoogleAnalyticsConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_GoogleAnalyticsConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        AccessToken: cdk.stringToCloudFormation(properties.accessToken),
        ClientId: cdk.stringToCloudFormation(properties.clientId),
        ClientSecret: cdk.stringToCloudFormation(properties.clientSecret),
        ConnectorOAuthRequest: cfnConnectorProfileConnectorOAuthRequestPropertyToCloudFormation(properties.connectorOAuthRequest),
        RefreshToken: cdk.stringToCloudFormation(properties.refreshToken),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileGoogleAnalyticsConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.GoogleAnalyticsConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.GoogleAnalyticsConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('accessToken', 'AccessToken', properties.AccessToken != null ? cfn_parse.FromCloudFormation.getString(properties.AccessToken) : undefined);
    ret.addPropertyResult('clientId', 'ClientId', cfn_parse.FromCloudFormation.getString(properties.ClientId));
    ret.addPropertyResult('clientSecret', 'ClientSecret', cfn_parse.FromCloudFormation.getString(properties.ClientSecret));
    ret.addPropertyResult('connectorOAuthRequest', 'ConnectorOAuthRequest', properties.ConnectorOAuthRequest != null ? CfnConnectorProfileConnectorOAuthRequestPropertyFromCloudFormation(properties.ConnectorOAuthRequest) : undefined);
    ret.addPropertyResult('refreshToken', 'RefreshToken', properties.RefreshToken != null ? cfn_parse.FromCloudFormation.getString(properties.RefreshToken) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `InforNexusConnectorProfileCredentials` property type specifies the connector-specific profile credentials required by Infor Nexus.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-infornexusconnectorprofilecredentials.html
     */
    export interface InforNexusConnectorProfileCredentialsProperty {
        /**
         * The Access Key portion of the credentials.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-infornexusconnectorprofilecredentials.html#cfn-appflow-connectorprofile-infornexusconnectorprofilecredentials-accesskeyid
         */
        readonly accessKeyId: string;
        /**
         * The encryption keys used to encrypt data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-infornexusconnectorprofilecredentials.html#cfn-appflow-connectorprofile-infornexusconnectorprofilecredentials-datakey
         */
        readonly datakey: string;
        /**
         * The secret key used to sign requests.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-infornexusconnectorprofilecredentials.html#cfn-appflow-connectorprofile-infornexusconnectorprofilecredentials-secretaccesskey
         */
        readonly secretAccessKey: string;
        /**
         * The identifier for the user.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-infornexusconnectorprofilecredentials.html#cfn-appflow-connectorprofile-infornexusconnectorprofilecredentials-userid
         */
        readonly userId: string;
    }
}

/**
 * Determine whether the given properties match those of a `InforNexusConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `InforNexusConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_InforNexusConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessKeyId', cdk.requiredValidator)(properties.accessKeyId));
    errors.collect(cdk.propertyValidator('accessKeyId', cdk.validateString)(properties.accessKeyId));
    errors.collect(cdk.propertyValidator('datakey', cdk.requiredValidator)(properties.datakey));
    errors.collect(cdk.propertyValidator('datakey', cdk.validateString)(properties.datakey));
    errors.collect(cdk.propertyValidator('secretAccessKey', cdk.requiredValidator)(properties.secretAccessKey));
    errors.collect(cdk.propertyValidator('secretAccessKey', cdk.validateString)(properties.secretAccessKey));
    errors.collect(cdk.propertyValidator('userId', cdk.requiredValidator)(properties.userId));
    errors.collect(cdk.propertyValidator('userId', cdk.validateString)(properties.userId));
    return errors.wrap('supplied properties not correct for "InforNexusConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.InforNexusConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `InforNexusConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.InforNexusConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileInforNexusConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_InforNexusConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        AccessKeyId: cdk.stringToCloudFormation(properties.accessKeyId),
        Datakey: cdk.stringToCloudFormation(properties.datakey),
        SecretAccessKey: cdk.stringToCloudFormation(properties.secretAccessKey),
        UserId: cdk.stringToCloudFormation(properties.userId),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileInforNexusConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.InforNexusConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.InforNexusConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('accessKeyId', 'AccessKeyId', cfn_parse.FromCloudFormation.getString(properties.AccessKeyId));
    ret.addPropertyResult('datakey', 'Datakey', cfn_parse.FromCloudFormation.getString(properties.Datakey));
    ret.addPropertyResult('secretAccessKey', 'SecretAccessKey', cfn_parse.FromCloudFormation.getString(properties.SecretAccessKey));
    ret.addPropertyResult('userId', 'UserId', cfn_parse.FromCloudFormation.getString(properties.UserId));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `InforNexusConnectorProfileProperties` property type specifies the connector-specific profile properties required by Infor Nexus.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-infornexusconnectorprofileproperties.html
     */
    export interface InforNexusConnectorProfilePropertiesProperty {
        /**
         * The location of the Infor Nexus resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-infornexusconnectorprofileproperties.html#cfn-appflow-connectorprofile-infornexusconnectorprofileproperties-instanceurl
         */
        readonly instanceUrl: string;
    }
}

/**
 * Determine whether the given properties match those of a `InforNexusConnectorProfilePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `InforNexusConnectorProfilePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_InforNexusConnectorProfilePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.requiredValidator)(properties.instanceUrl));
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.validateString)(properties.instanceUrl));
    return errors.wrap('supplied properties not correct for "InforNexusConnectorProfilePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.InforNexusConnectorProfileProperties` resource
 *
 * @param properties - the TypeScript properties of a `InforNexusConnectorProfilePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.InforNexusConnectorProfileProperties` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileInforNexusConnectorProfilePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_InforNexusConnectorProfilePropertiesPropertyValidator(properties).assertSuccess();
    return {
        InstanceUrl: cdk.stringToCloudFormation(properties.instanceUrl),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileInforNexusConnectorProfilePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.InforNexusConnectorProfilePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.InforNexusConnectorProfilePropertiesProperty>();
    ret.addPropertyResult('instanceUrl', 'InstanceUrl', cfn_parse.FromCloudFormation.getString(properties.InstanceUrl));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `MarketoConnectorProfileCredentials` property type specifies the connector-specific profile credentials required by Marketo.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-marketoconnectorprofilecredentials.html
     */
    export interface MarketoConnectorProfileCredentialsProperty {
        /**
         * The credentials used to access protected Marketo resources.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-marketoconnectorprofilecredentials.html#cfn-appflow-connectorprofile-marketoconnectorprofilecredentials-accesstoken
         */
        readonly accessToken?: string;
        /**
         * The identifier for the desired client.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-marketoconnectorprofilecredentials.html#cfn-appflow-connectorprofile-marketoconnectorprofilecredentials-clientid
         */
        readonly clientId: string;
        /**
         * The client secret used by the OAuth client to authenticate to the authorization server.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-marketoconnectorprofilecredentials.html#cfn-appflow-connectorprofile-marketoconnectorprofilecredentials-clientsecret
         */
        readonly clientSecret: string;
        /**
         * Used by select connectors for which the OAuth workflow is supported, such as Salesforce, Google Analytics, Marketo, Zendesk, and Slack.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-marketoconnectorprofilecredentials.html#cfn-appflow-connectorprofile-marketoconnectorprofilecredentials-connectoroauthrequest
         */
        readonly connectorOAuthRequest?: CfnConnectorProfile.ConnectorOAuthRequestProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MarketoConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `MarketoConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_MarketoConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessToken', cdk.validateString)(properties.accessToken));
    errors.collect(cdk.propertyValidator('clientId', cdk.requiredValidator)(properties.clientId));
    errors.collect(cdk.propertyValidator('clientId', cdk.validateString)(properties.clientId));
    errors.collect(cdk.propertyValidator('clientSecret', cdk.requiredValidator)(properties.clientSecret));
    errors.collect(cdk.propertyValidator('clientSecret', cdk.validateString)(properties.clientSecret));
    errors.collect(cdk.propertyValidator('connectorOAuthRequest', CfnConnectorProfile_ConnectorOAuthRequestPropertyValidator)(properties.connectorOAuthRequest));
    return errors.wrap('supplied properties not correct for "MarketoConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.MarketoConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `MarketoConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.MarketoConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileMarketoConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_MarketoConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        AccessToken: cdk.stringToCloudFormation(properties.accessToken),
        ClientId: cdk.stringToCloudFormation(properties.clientId),
        ClientSecret: cdk.stringToCloudFormation(properties.clientSecret),
        ConnectorOAuthRequest: cfnConnectorProfileConnectorOAuthRequestPropertyToCloudFormation(properties.connectorOAuthRequest),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileMarketoConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.MarketoConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.MarketoConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('accessToken', 'AccessToken', properties.AccessToken != null ? cfn_parse.FromCloudFormation.getString(properties.AccessToken) : undefined);
    ret.addPropertyResult('clientId', 'ClientId', cfn_parse.FromCloudFormation.getString(properties.ClientId));
    ret.addPropertyResult('clientSecret', 'ClientSecret', cfn_parse.FromCloudFormation.getString(properties.ClientSecret));
    ret.addPropertyResult('connectorOAuthRequest', 'ConnectorOAuthRequest', properties.ConnectorOAuthRequest != null ? CfnConnectorProfileConnectorOAuthRequestPropertyFromCloudFormation(properties.ConnectorOAuthRequest) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `MarketoConnectorProfileProperties` property type specifies the connector-specific profile properties required when using Marketo.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-marketoconnectorprofileproperties.html
     */
    export interface MarketoConnectorProfilePropertiesProperty {
        /**
         * The location of the Marketo resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-marketoconnectorprofileproperties.html#cfn-appflow-connectorprofile-marketoconnectorprofileproperties-instanceurl
         */
        readonly instanceUrl: string;
    }
}

/**
 * Determine whether the given properties match those of a `MarketoConnectorProfilePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `MarketoConnectorProfilePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_MarketoConnectorProfilePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.requiredValidator)(properties.instanceUrl));
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.validateString)(properties.instanceUrl));
    return errors.wrap('supplied properties not correct for "MarketoConnectorProfilePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.MarketoConnectorProfileProperties` resource
 *
 * @param properties - the TypeScript properties of a `MarketoConnectorProfilePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.MarketoConnectorProfileProperties` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileMarketoConnectorProfilePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_MarketoConnectorProfilePropertiesPropertyValidator(properties).assertSuccess();
    return {
        InstanceUrl: cdk.stringToCloudFormation(properties.instanceUrl),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileMarketoConnectorProfilePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.MarketoConnectorProfilePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.MarketoConnectorProfilePropertiesProperty>();
    ret.addPropertyResult('instanceUrl', 'InstanceUrl', cfn_parse.FromCloudFormation.getString(properties.InstanceUrl));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-oauthproperties.html
     */
    export interface OAuthPropertiesProperty {
        /**
         * `CfnConnectorProfile.OAuthPropertiesProperty.AuthCodeUrl`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-oauthproperties.html#cfn-appflow-connectorprofile-oauthproperties-authcodeurl
         */
        readonly authCodeUrl?: string;
        /**
         * `CfnConnectorProfile.OAuthPropertiesProperty.OAuthScopes`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-oauthproperties.html#cfn-appflow-connectorprofile-oauthproperties-oauthscopes
         */
        readonly oAuthScopes?: string[];
        /**
         * `CfnConnectorProfile.OAuthPropertiesProperty.TokenUrl`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-oauthproperties.html#cfn-appflow-connectorprofile-oauthproperties-tokenurl
         */
        readonly tokenUrl?: string;
    }
}

/**
 * Determine whether the given properties match those of a `OAuthPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `OAuthPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_OAuthPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('authCodeUrl', cdk.validateString)(properties.authCodeUrl));
    errors.collect(cdk.propertyValidator('oAuthScopes', cdk.listValidator(cdk.validateString))(properties.oAuthScopes));
    errors.collect(cdk.propertyValidator('tokenUrl', cdk.validateString)(properties.tokenUrl));
    return errors.wrap('supplied properties not correct for "OAuthPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.OAuthProperties` resource
 *
 * @param properties - the TypeScript properties of a `OAuthPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.OAuthProperties` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileOAuthPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_OAuthPropertiesPropertyValidator(properties).assertSuccess();
    return {
        AuthCodeUrl: cdk.stringToCloudFormation(properties.authCodeUrl),
        OAuthScopes: cdk.listMapper(cdk.stringToCloudFormation)(properties.oAuthScopes),
        TokenUrl: cdk.stringToCloudFormation(properties.tokenUrl),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileOAuthPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.OAuthPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.OAuthPropertiesProperty>();
    ret.addPropertyResult('authCodeUrl', 'AuthCodeUrl', properties.AuthCodeUrl != null ? cfn_parse.FromCloudFormation.getString(properties.AuthCodeUrl) : undefined);
    ret.addPropertyResult('oAuthScopes', 'OAuthScopes', properties.OAuthScopes != null ? cfn_parse.FromCloudFormation.getStringArray(properties.OAuthScopes) : undefined);
    ret.addPropertyResult('tokenUrl', 'TokenUrl', properties.TokenUrl != null ? cfn_parse.FromCloudFormation.getString(properties.TokenUrl) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `RedshiftConnectorProfileCredentials` property type specifies the connector-specific profile credentials required when using Amazon Redshift.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-redshiftconnectorprofilecredentials.html
     */
    export interface RedshiftConnectorProfileCredentialsProperty {
        /**
         * The password that corresponds to the user name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-redshiftconnectorprofilecredentials.html#cfn-appflow-connectorprofile-redshiftconnectorprofilecredentials-password
         */
        readonly password: string;
        /**
         * The name of the user.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-redshiftconnectorprofilecredentials.html#cfn-appflow-connectorprofile-redshiftconnectorprofilecredentials-username
         */
        readonly username: string;
    }
}

/**
 * Determine whether the given properties match those of a `RedshiftConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `RedshiftConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_RedshiftConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('password', cdk.requiredValidator)(properties.password));
    errors.collect(cdk.propertyValidator('password', cdk.validateString)(properties.password));
    errors.collect(cdk.propertyValidator('username', cdk.requiredValidator)(properties.username));
    errors.collect(cdk.propertyValidator('username', cdk.validateString)(properties.username));
    return errors.wrap('supplied properties not correct for "RedshiftConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.RedshiftConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `RedshiftConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.RedshiftConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileRedshiftConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_RedshiftConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        Password: cdk.stringToCloudFormation(properties.password),
        Username: cdk.stringToCloudFormation(properties.username),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileRedshiftConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.RedshiftConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.RedshiftConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('password', 'Password', cfn_parse.FromCloudFormation.getString(properties.Password));
    ret.addPropertyResult('username', 'Username', cfn_parse.FromCloudFormation.getString(properties.Username));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `RedshiftConnectorProfileProperties` property type specifies the connector-specific profile properties when using Amazon Redshift.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-redshiftconnectorprofileproperties.html
     */
    export interface RedshiftConnectorProfilePropertiesProperty {
        /**
         * A name for the associated Amazon S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-redshiftconnectorprofileproperties.html#cfn-appflow-connectorprofile-redshiftconnectorprofileproperties-bucketname
         */
        readonly bucketName: string;
        /**
         * The object key for the destination bucket in which Amazon AppFlow places the files.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-redshiftconnectorprofileproperties.html#cfn-appflow-connectorprofile-redshiftconnectorprofileproperties-bucketprefix
         */
        readonly bucketPrefix?: string;
        /**
         * The JDBC URL of the Amazon Redshift cluster.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-redshiftconnectorprofileproperties.html#cfn-appflow-connectorprofile-redshiftconnectorprofileproperties-databaseurl
         */
        readonly databaseUrl: string;
        /**
         * The Amazon Resource Name (ARN) of the IAM role.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-redshiftconnectorprofileproperties.html#cfn-appflow-connectorprofile-redshiftconnectorprofileproperties-rolearn
         */
        readonly roleArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `RedshiftConnectorProfilePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `RedshiftConnectorProfilePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_RedshiftConnectorProfilePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketName', cdk.requiredValidator)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketName', cdk.validateString)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketPrefix', cdk.validateString)(properties.bucketPrefix));
    errors.collect(cdk.propertyValidator('databaseUrl', cdk.requiredValidator)(properties.databaseUrl));
    errors.collect(cdk.propertyValidator('databaseUrl', cdk.validateString)(properties.databaseUrl));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "RedshiftConnectorProfilePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.RedshiftConnectorProfileProperties` resource
 *
 * @param properties - the TypeScript properties of a `RedshiftConnectorProfilePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.RedshiftConnectorProfileProperties` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileRedshiftConnectorProfilePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_RedshiftConnectorProfilePropertiesPropertyValidator(properties).assertSuccess();
    return {
        BucketName: cdk.stringToCloudFormation(properties.bucketName),
        BucketPrefix: cdk.stringToCloudFormation(properties.bucketPrefix),
        DatabaseUrl: cdk.stringToCloudFormation(properties.databaseUrl),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileRedshiftConnectorProfilePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.RedshiftConnectorProfilePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.RedshiftConnectorProfilePropertiesProperty>();
    ret.addPropertyResult('bucketName', 'BucketName', cfn_parse.FromCloudFormation.getString(properties.BucketName));
    ret.addPropertyResult('bucketPrefix', 'BucketPrefix', properties.BucketPrefix != null ? cfn_parse.FromCloudFormation.getString(properties.BucketPrefix) : undefined);
    ret.addPropertyResult('databaseUrl', 'DatabaseUrl', cfn_parse.FromCloudFormation.getString(properties.DatabaseUrl));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-sapodataconnectorprofilecredentials.html
     */
    export interface SAPODataConnectorProfileCredentialsProperty {
        /**
         * `CfnConnectorProfile.SAPODataConnectorProfileCredentialsProperty.BasicAuthCredentials`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-sapodataconnectorprofilecredentials.html#cfn-appflow-connectorprofile-sapodataconnectorprofilecredentials-basicauthcredentials
         */
        readonly basicAuthCredentials?: any | cdk.IResolvable;
        /**
         * `CfnConnectorProfile.SAPODataConnectorProfileCredentialsProperty.OAuthCredentials`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-sapodataconnectorprofilecredentials.html#cfn-appflow-connectorprofile-sapodataconnectorprofilecredentials-oauthcredentials
         */
        readonly oAuthCredentials?: any | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SAPODataConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `SAPODataConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_SAPODataConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('basicAuthCredentials', cdk.validateObject)(properties.basicAuthCredentials));
    errors.collect(cdk.propertyValidator('oAuthCredentials', cdk.validateObject)(properties.oAuthCredentials));
    return errors.wrap('supplied properties not correct for "SAPODataConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SAPODataConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `SAPODataConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SAPODataConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileSAPODataConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_SAPODataConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        BasicAuthCredentials: cdk.objectToCloudFormation(properties.basicAuthCredentials),
        OAuthCredentials: cdk.objectToCloudFormation(properties.oAuthCredentials),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileSAPODataConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.SAPODataConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.SAPODataConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('basicAuthCredentials', 'BasicAuthCredentials', properties.BasicAuthCredentials != null ? cfn_parse.FromCloudFormation.getAny(properties.BasicAuthCredentials) : undefined);
    ret.addPropertyResult('oAuthCredentials', 'OAuthCredentials', properties.OAuthCredentials != null ? cfn_parse.FromCloudFormation.getAny(properties.OAuthCredentials) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-sapodataconnectorprofileproperties.html
     */
    export interface SAPODataConnectorProfilePropertiesProperty {
        /**
         * `CfnConnectorProfile.SAPODataConnectorProfilePropertiesProperty.ApplicationHostUrl`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-sapodataconnectorprofileproperties.html#cfn-appflow-connectorprofile-sapodataconnectorprofileproperties-applicationhosturl
         */
        readonly applicationHostUrl?: string;
        /**
         * `CfnConnectorProfile.SAPODataConnectorProfilePropertiesProperty.ApplicationServicePath`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-sapodataconnectorprofileproperties.html#cfn-appflow-connectorprofile-sapodataconnectorprofileproperties-applicationservicepath
         */
        readonly applicationServicePath?: string;
        /**
         * `CfnConnectorProfile.SAPODataConnectorProfilePropertiesProperty.ClientNumber`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-sapodataconnectorprofileproperties.html#cfn-appflow-connectorprofile-sapodataconnectorprofileproperties-clientnumber
         */
        readonly clientNumber?: string;
        /**
         * `CfnConnectorProfile.SAPODataConnectorProfilePropertiesProperty.LogonLanguage`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-sapodataconnectorprofileproperties.html#cfn-appflow-connectorprofile-sapodataconnectorprofileproperties-logonlanguage
         */
        readonly logonLanguage?: string;
        /**
         * `CfnConnectorProfile.SAPODataConnectorProfilePropertiesProperty.OAuthProperties`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-sapodataconnectorprofileproperties.html#cfn-appflow-connectorprofile-sapodataconnectorprofileproperties-oauthproperties
         */
        readonly oAuthProperties?: CfnConnectorProfile.OAuthPropertiesProperty | cdk.IResolvable;
        /**
         * `CfnConnectorProfile.SAPODataConnectorProfilePropertiesProperty.PortNumber`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-sapodataconnectorprofileproperties.html#cfn-appflow-connectorprofile-sapodataconnectorprofileproperties-portnumber
         */
        readonly portNumber?: number;
        /**
         * `CfnConnectorProfile.SAPODataConnectorProfilePropertiesProperty.PrivateLinkServiceName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-sapodataconnectorprofileproperties.html#cfn-appflow-connectorprofile-sapodataconnectorprofileproperties-privatelinkservicename
         */
        readonly privateLinkServiceName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SAPODataConnectorProfilePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `SAPODataConnectorProfilePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_SAPODataConnectorProfilePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('applicationHostUrl', cdk.validateString)(properties.applicationHostUrl));
    errors.collect(cdk.propertyValidator('applicationServicePath', cdk.validateString)(properties.applicationServicePath));
    errors.collect(cdk.propertyValidator('clientNumber', cdk.validateString)(properties.clientNumber));
    errors.collect(cdk.propertyValidator('logonLanguage', cdk.validateString)(properties.logonLanguage));
    errors.collect(cdk.propertyValidator('oAuthProperties', CfnConnectorProfile_OAuthPropertiesPropertyValidator)(properties.oAuthProperties));
    errors.collect(cdk.propertyValidator('portNumber', cdk.validateNumber)(properties.portNumber));
    errors.collect(cdk.propertyValidator('privateLinkServiceName', cdk.validateString)(properties.privateLinkServiceName));
    return errors.wrap('supplied properties not correct for "SAPODataConnectorProfilePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SAPODataConnectorProfileProperties` resource
 *
 * @param properties - the TypeScript properties of a `SAPODataConnectorProfilePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SAPODataConnectorProfileProperties` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileSAPODataConnectorProfilePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_SAPODataConnectorProfilePropertiesPropertyValidator(properties).assertSuccess();
    return {
        ApplicationHostUrl: cdk.stringToCloudFormation(properties.applicationHostUrl),
        ApplicationServicePath: cdk.stringToCloudFormation(properties.applicationServicePath),
        ClientNumber: cdk.stringToCloudFormation(properties.clientNumber),
        LogonLanguage: cdk.stringToCloudFormation(properties.logonLanguage),
        OAuthProperties: cfnConnectorProfileOAuthPropertiesPropertyToCloudFormation(properties.oAuthProperties),
        PortNumber: cdk.numberToCloudFormation(properties.portNumber),
        PrivateLinkServiceName: cdk.stringToCloudFormation(properties.privateLinkServiceName),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileSAPODataConnectorProfilePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.SAPODataConnectorProfilePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.SAPODataConnectorProfilePropertiesProperty>();
    ret.addPropertyResult('applicationHostUrl', 'ApplicationHostUrl', properties.ApplicationHostUrl != null ? cfn_parse.FromCloudFormation.getString(properties.ApplicationHostUrl) : undefined);
    ret.addPropertyResult('applicationServicePath', 'ApplicationServicePath', properties.ApplicationServicePath != null ? cfn_parse.FromCloudFormation.getString(properties.ApplicationServicePath) : undefined);
    ret.addPropertyResult('clientNumber', 'ClientNumber', properties.ClientNumber != null ? cfn_parse.FromCloudFormation.getString(properties.ClientNumber) : undefined);
    ret.addPropertyResult('logonLanguage', 'LogonLanguage', properties.LogonLanguage != null ? cfn_parse.FromCloudFormation.getString(properties.LogonLanguage) : undefined);
    ret.addPropertyResult('oAuthProperties', 'OAuthProperties', properties.OAuthProperties != null ? CfnConnectorProfileOAuthPropertiesPropertyFromCloudFormation(properties.OAuthProperties) : undefined);
    ret.addPropertyResult('portNumber', 'PortNumber', properties.PortNumber != null ? cfn_parse.FromCloudFormation.getNumber(properties.PortNumber) : undefined);
    ret.addPropertyResult('privateLinkServiceName', 'PrivateLinkServiceName', properties.PrivateLinkServiceName != null ? cfn_parse.FromCloudFormation.getString(properties.PrivateLinkServiceName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `SalesforceConnectorProfileCredentials` property type specifies the connector-specific profile credentials required when using Salesforce.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-salesforceconnectorprofilecredentials.html
     */
    export interface SalesforceConnectorProfileCredentialsProperty {
        /**
         * The credentials used to access protected Salesforce resources.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-salesforceconnectorprofilecredentials.html#cfn-appflow-connectorprofile-salesforceconnectorprofilecredentials-accesstoken
         */
        readonly accessToken?: string;
        /**
         * The secret manager ARN, which contains the client ID and client secret of the connected app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-salesforceconnectorprofilecredentials.html#cfn-appflow-connectorprofile-salesforceconnectorprofilecredentials-clientcredentialsarn
         */
        readonly clientCredentialsArn?: string;
        /**
         * Used by select connectors for which the OAuth workflow is supported, such as Salesforce, Google Analytics, Marketo, Zendesk, and Slack.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-salesforceconnectorprofilecredentials.html#cfn-appflow-connectorprofile-salesforceconnectorprofilecredentials-connectoroauthrequest
         */
        readonly connectorOAuthRequest?: CfnConnectorProfile.ConnectorOAuthRequestProperty | cdk.IResolvable;
        /**
         * The credentials used to acquire new access tokens.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-salesforceconnectorprofilecredentials.html#cfn-appflow-connectorprofile-salesforceconnectorprofilecredentials-refreshtoken
         */
        readonly refreshToken?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SalesforceConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `SalesforceConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_SalesforceConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessToken', cdk.validateString)(properties.accessToken));
    errors.collect(cdk.propertyValidator('clientCredentialsArn', cdk.validateString)(properties.clientCredentialsArn));
    errors.collect(cdk.propertyValidator('connectorOAuthRequest', CfnConnectorProfile_ConnectorOAuthRequestPropertyValidator)(properties.connectorOAuthRequest));
    errors.collect(cdk.propertyValidator('refreshToken', cdk.validateString)(properties.refreshToken));
    return errors.wrap('supplied properties not correct for "SalesforceConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SalesforceConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `SalesforceConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SalesforceConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileSalesforceConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_SalesforceConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        AccessToken: cdk.stringToCloudFormation(properties.accessToken),
        ClientCredentialsArn: cdk.stringToCloudFormation(properties.clientCredentialsArn),
        ConnectorOAuthRequest: cfnConnectorProfileConnectorOAuthRequestPropertyToCloudFormation(properties.connectorOAuthRequest),
        RefreshToken: cdk.stringToCloudFormation(properties.refreshToken),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileSalesforceConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.SalesforceConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.SalesforceConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('accessToken', 'AccessToken', properties.AccessToken != null ? cfn_parse.FromCloudFormation.getString(properties.AccessToken) : undefined);
    ret.addPropertyResult('clientCredentialsArn', 'ClientCredentialsArn', properties.ClientCredentialsArn != null ? cfn_parse.FromCloudFormation.getString(properties.ClientCredentialsArn) : undefined);
    ret.addPropertyResult('connectorOAuthRequest', 'ConnectorOAuthRequest', properties.ConnectorOAuthRequest != null ? CfnConnectorProfileConnectorOAuthRequestPropertyFromCloudFormation(properties.ConnectorOAuthRequest) : undefined);
    ret.addPropertyResult('refreshToken', 'RefreshToken', properties.RefreshToken != null ? cfn_parse.FromCloudFormation.getString(properties.RefreshToken) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `SalesforceConnectorProfileProperties` property type specifies the connector-specific profile properties required when using Salesforce.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-salesforceconnectorprofileproperties.html
     */
    export interface SalesforceConnectorProfilePropertiesProperty {
        /**
         * The location of the Salesforce resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-salesforceconnectorprofileproperties.html#cfn-appflow-connectorprofile-salesforceconnectorprofileproperties-instanceurl
         */
        readonly instanceUrl?: string;
        /**
         * Indicates whether the connector profile applies to a sandbox or production environment.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-salesforceconnectorprofileproperties.html#cfn-appflow-connectorprofile-salesforceconnectorprofileproperties-issandboxenvironment
         */
        readonly isSandboxEnvironment?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SalesforceConnectorProfilePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `SalesforceConnectorProfilePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_SalesforceConnectorProfilePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.validateString)(properties.instanceUrl));
    errors.collect(cdk.propertyValidator('isSandboxEnvironment', cdk.validateBoolean)(properties.isSandboxEnvironment));
    return errors.wrap('supplied properties not correct for "SalesforceConnectorProfilePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SalesforceConnectorProfileProperties` resource
 *
 * @param properties - the TypeScript properties of a `SalesforceConnectorProfilePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SalesforceConnectorProfileProperties` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileSalesforceConnectorProfilePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_SalesforceConnectorProfilePropertiesPropertyValidator(properties).assertSuccess();
    return {
        InstanceUrl: cdk.stringToCloudFormation(properties.instanceUrl),
        isSandboxEnvironment: cdk.booleanToCloudFormation(properties.isSandboxEnvironment),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileSalesforceConnectorProfilePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.SalesforceConnectorProfilePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.SalesforceConnectorProfilePropertiesProperty>();
    ret.addPropertyResult('instanceUrl', 'InstanceUrl', properties.InstanceUrl != null ? cfn_parse.FromCloudFormation.getString(properties.InstanceUrl) : undefined);
    ret.addPropertyResult('isSandboxEnvironment', 'isSandboxEnvironment', properties.isSandboxEnvironment != null ? cfn_parse.FromCloudFormation.getBoolean(properties.isSandboxEnvironment) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `ServiceNowConnectorProfileCredentials` property type specifies the connector-specific profile credentials required when using ServiceNow.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-servicenowconnectorprofilecredentials.html
     */
    export interface ServiceNowConnectorProfileCredentialsProperty {
        /**
         * The password that corresponds to the user name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-servicenowconnectorprofilecredentials.html#cfn-appflow-connectorprofile-servicenowconnectorprofilecredentials-password
         */
        readonly password: string;
        /**
         * The name of the user.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-servicenowconnectorprofilecredentials.html#cfn-appflow-connectorprofile-servicenowconnectorprofilecredentials-username
         */
        readonly username: string;
    }
}

/**
 * Determine whether the given properties match those of a `ServiceNowConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `ServiceNowConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_ServiceNowConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('password', cdk.requiredValidator)(properties.password));
    errors.collect(cdk.propertyValidator('password', cdk.validateString)(properties.password));
    errors.collect(cdk.propertyValidator('username', cdk.requiredValidator)(properties.username));
    errors.collect(cdk.propertyValidator('username', cdk.validateString)(properties.username));
    return errors.wrap('supplied properties not correct for "ServiceNowConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ServiceNowConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `ServiceNowConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ServiceNowConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileServiceNowConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_ServiceNowConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        Password: cdk.stringToCloudFormation(properties.password),
        Username: cdk.stringToCloudFormation(properties.username),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileServiceNowConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.ServiceNowConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.ServiceNowConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('password', 'Password', cfn_parse.FromCloudFormation.getString(properties.Password));
    ret.addPropertyResult('username', 'Username', cfn_parse.FromCloudFormation.getString(properties.Username));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `ServiceNowConnectorProfileProperties` property type specifies the connector-specific profile properties required when using ServiceNow.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-servicenowconnectorprofileproperties.html
     */
    export interface ServiceNowConnectorProfilePropertiesProperty {
        /**
         * The location of the ServiceNow resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-servicenowconnectorprofileproperties.html#cfn-appflow-connectorprofile-servicenowconnectorprofileproperties-instanceurl
         */
        readonly instanceUrl: string;
    }
}

/**
 * Determine whether the given properties match those of a `ServiceNowConnectorProfilePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `ServiceNowConnectorProfilePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_ServiceNowConnectorProfilePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.requiredValidator)(properties.instanceUrl));
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.validateString)(properties.instanceUrl));
    return errors.wrap('supplied properties not correct for "ServiceNowConnectorProfilePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ServiceNowConnectorProfileProperties` resource
 *
 * @param properties - the TypeScript properties of a `ServiceNowConnectorProfilePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ServiceNowConnectorProfileProperties` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileServiceNowConnectorProfilePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_ServiceNowConnectorProfilePropertiesPropertyValidator(properties).assertSuccess();
    return {
        InstanceUrl: cdk.stringToCloudFormation(properties.instanceUrl),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileServiceNowConnectorProfilePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.ServiceNowConnectorProfilePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.ServiceNowConnectorProfilePropertiesProperty>();
    ret.addPropertyResult('instanceUrl', 'InstanceUrl', cfn_parse.FromCloudFormation.getString(properties.InstanceUrl));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `SingularConnectorProfileCredentials` property type specifies the connector-specific profile credentials required when using Singular.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-singularconnectorprofilecredentials.html
     */
    export interface SingularConnectorProfileCredentialsProperty {
        /**
         * A unique alphanumeric identifier used to authenticate a user, developer, or calling program to your API.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-singularconnectorprofilecredentials.html#cfn-appflow-connectorprofile-singularconnectorprofilecredentials-apikey
         */
        readonly apiKey: string;
    }
}

/**
 * Determine whether the given properties match those of a `SingularConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `SingularConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_SingularConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiKey', cdk.requiredValidator)(properties.apiKey));
    errors.collect(cdk.propertyValidator('apiKey', cdk.validateString)(properties.apiKey));
    return errors.wrap('supplied properties not correct for "SingularConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SingularConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `SingularConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SingularConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileSingularConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_SingularConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        ApiKey: cdk.stringToCloudFormation(properties.apiKey),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileSingularConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.SingularConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.SingularConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('apiKey', 'ApiKey', cfn_parse.FromCloudFormation.getString(properties.ApiKey));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `SlackConnectorProfileCredentials` property type specifies the connector-specific profile credentials required when using Slack.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-slackconnectorprofilecredentials.html
     */
    export interface SlackConnectorProfileCredentialsProperty {
        /**
         * The credentials used to access protected Slack resources.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-slackconnectorprofilecredentials.html#cfn-appflow-connectorprofile-slackconnectorprofilecredentials-accesstoken
         */
        readonly accessToken?: string;
        /**
         * The identifier for the client.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-slackconnectorprofilecredentials.html#cfn-appflow-connectorprofile-slackconnectorprofilecredentials-clientid
         */
        readonly clientId: string;
        /**
         * The client secret used by the OAuth client to authenticate to the authorization server.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-slackconnectorprofilecredentials.html#cfn-appflow-connectorprofile-slackconnectorprofilecredentials-clientsecret
         */
        readonly clientSecret: string;
        /**
         * Used by select connectors for which the OAuth workflow is supported, such as Salesforce, Google Analytics, Marketo, Zendesk, and Slack.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-slackconnectorprofilecredentials.html#cfn-appflow-connectorprofile-slackconnectorprofilecredentials-connectoroauthrequest
         */
        readonly connectorOAuthRequest?: CfnConnectorProfile.ConnectorOAuthRequestProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SlackConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `SlackConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_SlackConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessToken', cdk.validateString)(properties.accessToken));
    errors.collect(cdk.propertyValidator('clientId', cdk.requiredValidator)(properties.clientId));
    errors.collect(cdk.propertyValidator('clientId', cdk.validateString)(properties.clientId));
    errors.collect(cdk.propertyValidator('clientSecret', cdk.requiredValidator)(properties.clientSecret));
    errors.collect(cdk.propertyValidator('clientSecret', cdk.validateString)(properties.clientSecret));
    errors.collect(cdk.propertyValidator('connectorOAuthRequest', CfnConnectorProfile_ConnectorOAuthRequestPropertyValidator)(properties.connectorOAuthRequest));
    return errors.wrap('supplied properties not correct for "SlackConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SlackConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `SlackConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SlackConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileSlackConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_SlackConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        AccessToken: cdk.stringToCloudFormation(properties.accessToken),
        ClientId: cdk.stringToCloudFormation(properties.clientId),
        ClientSecret: cdk.stringToCloudFormation(properties.clientSecret),
        ConnectorOAuthRequest: cfnConnectorProfileConnectorOAuthRequestPropertyToCloudFormation(properties.connectorOAuthRequest),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileSlackConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.SlackConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.SlackConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('accessToken', 'AccessToken', properties.AccessToken != null ? cfn_parse.FromCloudFormation.getString(properties.AccessToken) : undefined);
    ret.addPropertyResult('clientId', 'ClientId', cfn_parse.FromCloudFormation.getString(properties.ClientId));
    ret.addPropertyResult('clientSecret', 'ClientSecret', cfn_parse.FromCloudFormation.getString(properties.ClientSecret));
    ret.addPropertyResult('connectorOAuthRequest', 'ConnectorOAuthRequest', properties.ConnectorOAuthRequest != null ? CfnConnectorProfileConnectorOAuthRequestPropertyFromCloudFormation(properties.ConnectorOAuthRequest) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `SlackConnectorProfileProperties` property type specifies the connector-specific profile properties required when using Slack.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-slackconnectorprofileproperties.html
     */
    export interface SlackConnectorProfilePropertiesProperty {
        /**
         * The location of the Slack resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-slackconnectorprofileproperties.html#cfn-appflow-connectorprofile-slackconnectorprofileproperties-instanceurl
         */
        readonly instanceUrl: string;
    }
}

/**
 * Determine whether the given properties match those of a `SlackConnectorProfilePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `SlackConnectorProfilePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_SlackConnectorProfilePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.requiredValidator)(properties.instanceUrl));
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.validateString)(properties.instanceUrl));
    return errors.wrap('supplied properties not correct for "SlackConnectorProfilePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SlackConnectorProfileProperties` resource
 *
 * @param properties - the TypeScript properties of a `SlackConnectorProfilePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SlackConnectorProfileProperties` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileSlackConnectorProfilePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_SlackConnectorProfilePropertiesPropertyValidator(properties).assertSuccess();
    return {
        InstanceUrl: cdk.stringToCloudFormation(properties.instanceUrl),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileSlackConnectorProfilePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.SlackConnectorProfilePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.SlackConnectorProfilePropertiesProperty>();
    ret.addPropertyResult('instanceUrl', 'InstanceUrl', cfn_parse.FromCloudFormation.getString(properties.InstanceUrl));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `SnowflakeConnectorProfileCredentials` property type specifies the connector-specific profile credentials required when using Snowflake.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-snowflakeconnectorprofilecredentials.html
     */
    export interface SnowflakeConnectorProfileCredentialsProperty {
        /**
         * The password that corresponds to the user name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-snowflakeconnectorprofilecredentials.html#cfn-appflow-connectorprofile-snowflakeconnectorprofilecredentials-password
         */
        readonly password: string;
        /**
         * The name of the user.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-snowflakeconnectorprofilecredentials.html#cfn-appflow-connectorprofile-snowflakeconnectorprofilecredentials-username
         */
        readonly username: string;
    }
}

/**
 * Determine whether the given properties match those of a `SnowflakeConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `SnowflakeConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_SnowflakeConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('password', cdk.requiredValidator)(properties.password));
    errors.collect(cdk.propertyValidator('password', cdk.validateString)(properties.password));
    errors.collect(cdk.propertyValidator('username', cdk.requiredValidator)(properties.username));
    errors.collect(cdk.propertyValidator('username', cdk.validateString)(properties.username));
    return errors.wrap('supplied properties not correct for "SnowflakeConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SnowflakeConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `SnowflakeConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SnowflakeConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileSnowflakeConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_SnowflakeConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        Password: cdk.stringToCloudFormation(properties.password),
        Username: cdk.stringToCloudFormation(properties.username),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileSnowflakeConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.SnowflakeConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.SnowflakeConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('password', 'Password', cfn_parse.FromCloudFormation.getString(properties.Password));
    ret.addPropertyResult('username', 'Username', cfn_parse.FromCloudFormation.getString(properties.Username));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `SnowflakeConnectorProfileProperties` property type specifies the connector-specific profile properties required when using Snowflake.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-snowflakeconnectorprofileproperties.html
     */
    export interface SnowflakeConnectorProfilePropertiesProperty {
        /**
         * The name of the account.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-snowflakeconnectorprofileproperties.html#cfn-appflow-connectorprofile-snowflakeconnectorprofileproperties-accountname
         */
        readonly accountName?: string;
        /**
         * The name of the Amazon S3 bucket associated with Snowflake.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-snowflakeconnectorprofileproperties.html#cfn-appflow-connectorprofile-snowflakeconnectorprofileproperties-bucketname
         */
        readonly bucketName: string;
        /**
         * The bucket path that refers to the Amazon S3 bucket associated with Snowflake.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-snowflakeconnectorprofileproperties.html#cfn-appflow-connectorprofile-snowflakeconnectorprofileproperties-bucketprefix
         */
        readonly bucketPrefix?: string;
        /**
         * The Snowflake Private Link service name to be used for private data transfers.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-snowflakeconnectorprofileproperties.html#cfn-appflow-connectorprofile-snowflakeconnectorprofileproperties-privatelinkservicename
         */
        readonly privateLinkServiceName?: string;
        /**
         * The AWS Region of the Snowflake account.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-snowflakeconnectorprofileproperties.html#cfn-appflow-connectorprofile-snowflakeconnectorprofileproperties-region
         */
        readonly region?: string;
        /**
         * The name of the Amazon S3 stage that was created while setting up an Amazon S3 stage in the Snowflake account. This is written in the following format: < Database>< Schema><Stage Name>.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-snowflakeconnectorprofileproperties.html#cfn-appflow-connectorprofile-snowflakeconnectorprofileproperties-stage
         */
        readonly stage: string;
        /**
         * The name of the Snowflake warehouse.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-snowflakeconnectorprofileproperties.html#cfn-appflow-connectorprofile-snowflakeconnectorprofileproperties-warehouse
         */
        readonly warehouse: string;
    }
}

/**
 * Determine whether the given properties match those of a `SnowflakeConnectorProfilePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `SnowflakeConnectorProfilePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_SnowflakeConnectorProfilePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accountName', cdk.validateString)(properties.accountName));
    errors.collect(cdk.propertyValidator('bucketName', cdk.requiredValidator)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketName', cdk.validateString)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketPrefix', cdk.validateString)(properties.bucketPrefix));
    errors.collect(cdk.propertyValidator('privateLinkServiceName', cdk.validateString)(properties.privateLinkServiceName));
    errors.collect(cdk.propertyValidator('region', cdk.validateString)(properties.region));
    errors.collect(cdk.propertyValidator('stage', cdk.requiredValidator)(properties.stage));
    errors.collect(cdk.propertyValidator('stage', cdk.validateString)(properties.stage));
    errors.collect(cdk.propertyValidator('warehouse', cdk.requiredValidator)(properties.warehouse));
    errors.collect(cdk.propertyValidator('warehouse', cdk.validateString)(properties.warehouse));
    return errors.wrap('supplied properties not correct for "SnowflakeConnectorProfilePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SnowflakeConnectorProfileProperties` resource
 *
 * @param properties - the TypeScript properties of a `SnowflakeConnectorProfilePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.SnowflakeConnectorProfileProperties` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileSnowflakeConnectorProfilePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_SnowflakeConnectorProfilePropertiesPropertyValidator(properties).assertSuccess();
    return {
        AccountName: cdk.stringToCloudFormation(properties.accountName),
        BucketName: cdk.stringToCloudFormation(properties.bucketName),
        BucketPrefix: cdk.stringToCloudFormation(properties.bucketPrefix),
        PrivateLinkServiceName: cdk.stringToCloudFormation(properties.privateLinkServiceName),
        Region: cdk.stringToCloudFormation(properties.region),
        Stage: cdk.stringToCloudFormation(properties.stage),
        Warehouse: cdk.stringToCloudFormation(properties.warehouse),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileSnowflakeConnectorProfilePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.SnowflakeConnectorProfilePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.SnowflakeConnectorProfilePropertiesProperty>();
    ret.addPropertyResult('accountName', 'AccountName', properties.AccountName != null ? cfn_parse.FromCloudFormation.getString(properties.AccountName) : undefined);
    ret.addPropertyResult('bucketName', 'BucketName', cfn_parse.FromCloudFormation.getString(properties.BucketName));
    ret.addPropertyResult('bucketPrefix', 'BucketPrefix', properties.BucketPrefix != null ? cfn_parse.FromCloudFormation.getString(properties.BucketPrefix) : undefined);
    ret.addPropertyResult('privateLinkServiceName', 'PrivateLinkServiceName', properties.PrivateLinkServiceName != null ? cfn_parse.FromCloudFormation.getString(properties.PrivateLinkServiceName) : undefined);
    ret.addPropertyResult('region', 'Region', properties.Region != null ? cfn_parse.FromCloudFormation.getString(properties.Region) : undefined);
    ret.addPropertyResult('stage', 'Stage', cfn_parse.FromCloudFormation.getString(properties.Stage));
    ret.addPropertyResult('warehouse', 'Warehouse', cfn_parse.FromCloudFormation.getString(properties.Warehouse));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `TrendmicroConnectorProfileCredentials` property type specifies the connector-specific profile credentials required when using Trend Micro.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-trendmicroconnectorprofilecredentials.html
     */
    export interface TrendmicroConnectorProfileCredentialsProperty {
        /**
         * The Secret Access Key portion of the credentials.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-trendmicroconnectorprofilecredentials.html#cfn-appflow-connectorprofile-trendmicroconnectorprofilecredentials-apisecretkey
         */
        readonly apiSecretKey: string;
    }
}

/**
 * Determine whether the given properties match those of a `TrendmicroConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `TrendmicroConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_TrendmicroConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiSecretKey', cdk.requiredValidator)(properties.apiSecretKey));
    errors.collect(cdk.propertyValidator('apiSecretKey', cdk.validateString)(properties.apiSecretKey));
    return errors.wrap('supplied properties not correct for "TrendmicroConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.TrendmicroConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `TrendmicroConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.TrendmicroConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileTrendmicroConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_TrendmicroConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        ApiSecretKey: cdk.stringToCloudFormation(properties.apiSecretKey),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileTrendmicroConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.TrendmicroConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.TrendmicroConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('apiSecretKey', 'ApiSecretKey', cfn_parse.FromCloudFormation.getString(properties.ApiSecretKey));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `VeevaConnectorProfileCredentials` property type specifies the connector-specific profile credentials required when using Veeva.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-veevaconnectorprofilecredentials.html
     */
    export interface VeevaConnectorProfileCredentialsProperty {
        /**
         * The password that corresponds to the user name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-veevaconnectorprofilecredentials.html#cfn-appflow-connectorprofile-veevaconnectorprofilecredentials-password
         */
        readonly password: string;
        /**
         * The name of the user.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-veevaconnectorprofilecredentials.html#cfn-appflow-connectorprofile-veevaconnectorprofilecredentials-username
         */
        readonly username: string;
    }
}

/**
 * Determine whether the given properties match those of a `VeevaConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `VeevaConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_VeevaConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('password', cdk.requiredValidator)(properties.password));
    errors.collect(cdk.propertyValidator('password', cdk.validateString)(properties.password));
    errors.collect(cdk.propertyValidator('username', cdk.requiredValidator)(properties.username));
    errors.collect(cdk.propertyValidator('username', cdk.validateString)(properties.username));
    return errors.wrap('supplied properties not correct for "VeevaConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.VeevaConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `VeevaConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.VeevaConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileVeevaConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_VeevaConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        Password: cdk.stringToCloudFormation(properties.password),
        Username: cdk.stringToCloudFormation(properties.username),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileVeevaConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.VeevaConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.VeevaConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('password', 'Password', cfn_parse.FromCloudFormation.getString(properties.Password));
    ret.addPropertyResult('username', 'Username', cfn_parse.FromCloudFormation.getString(properties.Username));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `VeevaConnectorProfileProperties` property type specifies the connector-specific profile properties required when using Veeva.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-veevaconnectorprofileproperties.html
     */
    export interface VeevaConnectorProfilePropertiesProperty {
        /**
         * The location of the Veeva resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-veevaconnectorprofileproperties.html#cfn-appflow-connectorprofile-veevaconnectorprofileproperties-instanceurl
         */
        readonly instanceUrl: string;
    }
}

/**
 * Determine whether the given properties match those of a `VeevaConnectorProfilePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `VeevaConnectorProfilePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_VeevaConnectorProfilePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.requiredValidator)(properties.instanceUrl));
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.validateString)(properties.instanceUrl));
    return errors.wrap('supplied properties not correct for "VeevaConnectorProfilePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.VeevaConnectorProfileProperties` resource
 *
 * @param properties - the TypeScript properties of a `VeevaConnectorProfilePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.VeevaConnectorProfileProperties` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileVeevaConnectorProfilePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_VeevaConnectorProfilePropertiesPropertyValidator(properties).assertSuccess();
    return {
        InstanceUrl: cdk.stringToCloudFormation(properties.instanceUrl),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileVeevaConnectorProfilePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.VeevaConnectorProfilePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.VeevaConnectorProfilePropertiesProperty>();
    ret.addPropertyResult('instanceUrl', 'InstanceUrl', cfn_parse.FromCloudFormation.getString(properties.InstanceUrl));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `ZendeskConnectorProfileCredentials` property type specifies the connector-specific profile credentials required when using Zendesk.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-zendeskconnectorprofilecredentials.html
     */
    export interface ZendeskConnectorProfileCredentialsProperty {
        /**
         * The credentials used to access protected Zendesk resources.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-zendeskconnectorprofilecredentials.html#cfn-appflow-connectorprofile-zendeskconnectorprofilecredentials-accesstoken
         */
        readonly accessToken?: string;
        /**
         * The identifier for the desired client.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-zendeskconnectorprofilecredentials.html#cfn-appflow-connectorprofile-zendeskconnectorprofilecredentials-clientid
         */
        readonly clientId: string;
        /**
         * The client secret used by the OAuth client to authenticate to the authorization server.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-zendeskconnectorprofilecredentials.html#cfn-appflow-connectorprofile-zendeskconnectorprofilecredentials-clientsecret
         */
        readonly clientSecret: string;
        /**
         * Used by select connectors for which the OAuth workflow is supported, such as Salesforce, Google Analytics, Marketo, Zendesk, and Slack.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-zendeskconnectorprofilecredentials.html#cfn-appflow-connectorprofile-zendeskconnectorprofilecredentials-connectoroauthrequest
         */
        readonly connectorOAuthRequest?: CfnConnectorProfile.ConnectorOAuthRequestProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ZendeskConnectorProfileCredentialsProperty`
 *
 * @param properties - the TypeScript properties of a `ZendeskConnectorProfileCredentialsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_ZendeskConnectorProfileCredentialsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessToken', cdk.validateString)(properties.accessToken));
    errors.collect(cdk.propertyValidator('clientId', cdk.requiredValidator)(properties.clientId));
    errors.collect(cdk.propertyValidator('clientId', cdk.validateString)(properties.clientId));
    errors.collect(cdk.propertyValidator('clientSecret', cdk.requiredValidator)(properties.clientSecret));
    errors.collect(cdk.propertyValidator('clientSecret', cdk.validateString)(properties.clientSecret));
    errors.collect(cdk.propertyValidator('connectorOAuthRequest', CfnConnectorProfile_ConnectorOAuthRequestPropertyValidator)(properties.connectorOAuthRequest));
    return errors.wrap('supplied properties not correct for "ZendeskConnectorProfileCredentialsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ZendeskConnectorProfileCredentials` resource
 *
 * @param properties - the TypeScript properties of a `ZendeskConnectorProfileCredentialsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ZendeskConnectorProfileCredentials` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileZendeskConnectorProfileCredentialsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_ZendeskConnectorProfileCredentialsPropertyValidator(properties).assertSuccess();
    return {
        AccessToken: cdk.stringToCloudFormation(properties.accessToken),
        ClientId: cdk.stringToCloudFormation(properties.clientId),
        ClientSecret: cdk.stringToCloudFormation(properties.clientSecret),
        ConnectorOAuthRequest: cfnConnectorProfileConnectorOAuthRequestPropertyToCloudFormation(properties.connectorOAuthRequest),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileZendeskConnectorProfileCredentialsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.ZendeskConnectorProfileCredentialsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.ZendeskConnectorProfileCredentialsProperty>();
    ret.addPropertyResult('accessToken', 'AccessToken', properties.AccessToken != null ? cfn_parse.FromCloudFormation.getString(properties.AccessToken) : undefined);
    ret.addPropertyResult('clientId', 'ClientId', cfn_parse.FromCloudFormation.getString(properties.ClientId));
    ret.addPropertyResult('clientSecret', 'ClientSecret', cfn_parse.FromCloudFormation.getString(properties.ClientSecret));
    ret.addPropertyResult('connectorOAuthRequest', 'ConnectorOAuthRequest', properties.ConnectorOAuthRequest != null ? CfnConnectorProfileConnectorOAuthRequestPropertyFromCloudFormation(properties.ConnectorOAuthRequest) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnectorProfile {
    /**
     * The `ZendeskConnectorProfileProperties` property type specifies the connector-specific profile properties required when using Zendesk.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-zendeskconnectorprofileproperties.html
     */
    export interface ZendeskConnectorProfilePropertiesProperty {
        /**
         * The location of the Zendesk resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-connectorprofile-zendeskconnectorprofileproperties.html#cfn-appflow-connectorprofile-zendeskconnectorprofileproperties-instanceurl
         */
        readonly instanceUrl: string;
    }
}

/**
 * Determine whether the given properties match those of a `ZendeskConnectorProfilePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `ZendeskConnectorProfilePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnectorProfile_ZendeskConnectorProfilePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.requiredValidator)(properties.instanceUrl));
    errors.collect(cdk.propertyValidator('instanceUrl', cdk.validateString)(properties.instanceUrl));
    return errors.wrap('supplied properties not correct for "ZendeskConnectorProfilePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ZendeskConnectorProfileProperties` resource
 *
 * @param properties - the TypeScript properties of a `ZendeskConnectorProfilePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::ConnectorProfile.ZendeskConnectorProfileProperties` resource.
 */
// @ts-ignore TS6133
function cfnConnectorProfileZendeskConnectorProfilePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectorProfile_ZendeskConnectorProfilePropertiesPropertyValidator(properties).assertSuccess();
    return {
        InstanceUrl: cdk.stringToCloudFormation(properties.instanceUrl),
    };
}

// @ts-ignore TS6133
function CfnConnectorProfileZendeskConnectorProfilePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectorProfile.ZendeskConnectorProfilePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectorProfile.ZendeskConnectorProfilePropertiesProperty>();
    ret.addPropertyResult('instanceUrl', 'InstanceUrl', cfn_parse.FromCloudFormation.getString(properties.InstanceUrl));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnFlow`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html
 */
export interface CfnFlowProps {

    /**
     * The configuration that controls how Amazon AppFlow places data in the destination connector.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-destinationflowconfiglist
     */
    readonly destinationFlowConfigList: Array<CfnFlow.DestinationFlowConfigProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The specified name of the flow. Spaces are not allowed. Use underscores (_) or hyphens (-) only.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-flowname
     */
    readonly flowName: string;

    /**
     * Contains information about the configuration of the source connector used in the flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-sourceflowconfig
     */
    readonly sourceFlowConfig: CfnFlow.SourceFlowConfigProperty | cdk.IResolvable;

    /**
     * A list of tasks that Amazon AppFlow performs while transferring the data in the flow run.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-tasks
     */
    readonly tasks: Array<CfnFlow.TaskProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The trigger settings that determine how and when Amazon AppFlow runs the specified flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-triggerconfig
     */
    readonly triggerConfig: CfnFlow.TriggerConfigProperty | cdk.IResolvable;

    /**
     * A user-entered description of the flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-description
     */
    readonly description?: string;

    /**
     * The ARN (Amazon Resource Name) of the Key Management Service (KMS) key you provide for encryption. This is required if you do not want to use the Amazon AppFlow-managed KMS key. If you don't provide anything here, Amazon AppFlow uses the Amazon AppFlow-managed KMS key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-kmsarn
     */
    readonly kmsArn?: string;

    /**
     * The tags used to organize, track, or control access for your flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnFlowProps`
 *
 * @param properties - the TypeScript properties of a `CfnFlowProps`
 *
 * @returns the result of the validation.
 */
function CfnFlowPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('destinationFlowConfigList', cdk.requiredValidator)(properties.destinationFlowConfigList));
    errors.collect(cdk.propertyValidator('destinationFlowConfigList', cdk.listValidator(CfnFlow_DestinationFlowConfigPropertyValidator))(properties.destinationFlowConfigList));
    errors.collect(cdk.propertyValidator('flowName', cdk.requiredValidator)(properties.flowName));
    errors.collect(cdk.propertyValidator('flowName', cdk.validateString)(properties.flowName));
    errors.collect(cdk.propertyValidator('kmsArn', cdk.validateString)(properties.kmsArn));
    errors.collect(cdk.propertyValidator('sourceFlowConfig', cdk.requiredValidator)(properties.sourceFlowConfig));
    errors.collect(cdk.propertyValidator('sourceFlowConfig', CfnFlow_SourceFlowConfigPropertyValidator)(properties.sourceFlowConfig));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('tasks', cdk.requiredValidator)(properties.tasks));
    errors.collect(cdk.propertyValidator('tasks', cdk.listValidator(CfnFlow_TaskPropertyValidator))(properties.tasks));
    errors.collect(cdk.propertyValidator('triggerConfig', cdk.requiredValidator)(properties.triggerConfig));
    errors.collect(cdk.propertyValidator('triggerConfig', CfnFlow_TriggerConfigPropertyValidator)(properties.triggerConfig));
    return errors.wrap('supplied properties not correct for "CfnFlowProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow` resource
 *
 * @param properties - the TypeScript properties of a `CfnFlowProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow` resource.
 */
// @ts-ignore TS6133
function cfnFlowPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlowPropsValidator(properties).assertSuccess();
    return {
        DestinationFlowConfigList: cdk.listMapper(cfnFlowDestinationFlowConfigPropertyToCloudFormation)(properties.destinationFlowConfigList),
        FlowName: cdk.stringToCloudFormation(properties.flowName),
        SourceFlowConfig: cfnFlowSourceFlowConfigPropertyToCloudFormation(properties.sourceFlowConfig),
        Tasks: cdk.listMapper(cfnFlowTaskPropertyToCloudFormation)(properties.tasks),
        TriggerConfig: cfnFlowTriggerConfigPropertyToCloudFormation(properties.triggerConfig),
        Description: cdk.stringToCloudFormation(properties.description),
        KMSArn: cdk.stringToCloudFormation(properties.kmsArn),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnFlowPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlowProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlowProps>();
    ret.addPropertyResult('destinationFlowConfigList', 'DestinationFlowConfigList', cfn_parse.FromCloudFormation.getArray(CfnFlowDestinationFlowConfigPropertyFromCloudFormation)(properties.DestinationFlowConfigList));
    ret.addPropertyResult('flowName', 'FlowName', cfn_parse.FromCloudFormation.getString(properties.FlowName));
    ret.addPropertyResult('sourceFlowConfig', 'SourceFlowConfig', CfnFlowSourceFlowConfigPropertyFromCloudFormation(properties.SourceFlowConfig));
    ret.addPropertyResult('tasks', 'Tasks', cfn_parse.FromCloudFormation.getArray(CfnFlowTaskPropertyFromCloudFormation)(properties.Tasks));
    ret.addPropertyResult('triggerConfig', 'TriggerConfig', CfnFlowTriggerConfigPropertyFromCloudFormation(properties.TriggerConfig));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('kmsArn', 'KMSArn', properties.KMSArn != null ? cfn_parse.FromCloudFormation.getString(properties.KMSArn) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppFlow::Flow`
 *
 * The `AWS::AppFlow::Flow` resource is an Amazon AppFlow resource type that specifies a new flow.
 *
 * > If you want to use AWS CloudFormation to create a connector profile for connectors that implement OAuth (such as Salesforce, Slack, Zendesk, and Google Analytics), you must fetch the access and refresh tokens. You can do this by implementing your own UI for OAuth, or by retrieving the tokens from elsewhere. Alternatively, you can use the Amazon AppFlow console to create the connector profile, and then use that connector profile in the flow creation CloudFormation template.
 *
 * @cloudformationResource AWS::AppFlow::Flow
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html
 */
export class CfnFlow extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppFlow::Flow";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnFlow {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnFlowPropsFromCloudFormation(resourceProperties);
        const ret = new CfnFlow(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The flow's Amazon Resource Name (ARN).
     * @cloudformationAttribute FlowArn
     */
    public readonly attrFlowArn: string;

    /**
     * The configuration that controls how Amazon AppFlow places data in the destination connector.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-destinationflowconfiglist
     */
    public destinationFlowConfigList: Array<CfnFlow.DestinationFlowConfigProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The specified name of the flow. Spaces are not allowed. Use underscores (_) or hyphens (-) only.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-flowname
     */
    public flowName: string;

    /**
     * Contains information about the configuration of the source connector used in the flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-sourceflowconfig
     */
    public sourceFlowConfig: CfnFlow.SourceFlowConfigProperty | cdk.IResolvable;

    /**
     * A list of tasks that Amazon AppFlow performs while transferring the data in the flow run.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-tasks
     */
    public tasks: Array<CfnFlow.TaskProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The trigger settings that determine how and when Amazon AppFlow runs the specified flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-triggerconfig
     */
    public triggerConfig: CfnFlow.TriggerConfigProperty | cdk.IResolvable;

    /**
     * A user-entered description of the flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-description
     */
    public description: string | undefined;

    /**
     * The ARN (Amazon Resource Name) of the Key Management Service (KMS) key you provide for encryption. This is required if you do not want to use the Amazon AppFlow-managed KMS key. If you don't provide anything here, Amazon AppFlow uses the Amazon AppFlow-managed KMS key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-kmsarn
     */
    public kmsArn: string | undefined;

    /**
     * The tags used to organize, track, or control access for your flow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html#cfn-appflow-flow-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::AppFlow::Flow`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnFlowProps) {
        super(scope, id, { type: CfnFlow.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'destinationFlowConfigList', this);
        cdk.requireProperty(props, 'flowName', this);
        cdk.requireProperty(props, 'sourceFlowConfig', this);
        cdk.requireProperty(props, 'tasks', this);
        cdk.requireProperty(props, 'triggerConfig', this);
        this.attrFlowArn = cdk.Token.asString(this.getAtt('FlowArn'));

        this.destinationFlowConfigList = props.destinationFlowConfigList;
        this.flowName = props.flowName;
        this.sourceFlowConfig = props.sourceFlowConfig;
        this.tasks = props.tasks;
        this.triggerConfig = props.triggerConfig;
        this.description = props.description;
        this.kmsArn = props.kmsArn;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::AppFlow::Flow", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnFlow.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            destinationFlowConfigList: this.destinationFlowConfigList,
            flowName: this.flowName,
            sourceFlowConfig: this.sourceFlowConfig,
            tasks: this.tasks,
            triggerConfig: this.triggerConfig,
            description: this.description,
            kmsArn: this.kmsArn,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnFlowPropsToCloudFormation(props);
    }
}

export namespace CfnFlow {
    /**
     * The aggregation settings that you can use to customize the output format of your flow data.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-aggregationconfig.html
     */
    export interface AggregationConfigProperty {
        /**
         * Specifies whether Amazon AppFlow aggregates the flow records into a single file, or leave them unaggregated.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-aggregationconfig.html#cfn-appflow-flow-aggregationconfig-aggregationtype
         */
        readonly aggregationType?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AggregationConfigProperty`
 *
 * @param properties - the TypeScript properties of a `AggregationConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_AggregationConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('aggregationType', cdk.validateString)(properties.aggregationType));
    return errors.wrap('supplied properties not correct for "AggregationConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.AggregationConfig` resource
 *
 * @param properties - the TypeScript properties of a `AggregationConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.AggregationConfig` resource.
 */
// @ts-ignore TS6133
function cfnFlowAggregationConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_AggregationConfigPropertyValidator(properties).assertSuccess();
    return {
        AggregationType: cdk.stringToCloudFormation(properties.aggregationType),
    };
}

// @ts-ignore TS6133
function CfnFlowAggregationConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.AggregationConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.AggregationConfigProperty>();
    ret.addPropertyResult('aggregationType', 'AggregationType', properties.AggregationType != null ? cfn_parse.FromCloudFormation.getString(properties.AggregationType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Amplitude is being used as a source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-amplitudesourceproperties.html
     */
    export interface AmplitudeSourcePropertiesProperty {
        /**
         * The object specified in the Amplitude flow source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-amplitudesourceproperties.html#cfn-appflow-flow-amplitudesourceproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `AmplitudeSourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `AmplitudeSourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_AmplitudeSourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "AmplitudeSourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.AmplitudeSourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `AmplitudeSourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.AmplitudeSourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowAmplitudeSourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_AmplitudeSourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowAmplitudeSourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.AmplitudeSourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.AmplitudeSourcePropertiesProperty>();
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The operation to be performed on the provided source fields.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html
     */
    export interface ConnectorOperatorProperty {
        /**
         * The operation to be performed on the provided Amplitude source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-amplitude
         */
        readonly amplitude?: string;
        /**
         * The operation to be performed on the provided Datadog source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-datadog
         */
        readonly datadog?: string;
        /**
         * The operation to be performed on the provided Dynatrace source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-dynatrace
         */
        readonly dynatrace?: string;
        /**
         * The operation to be performed on the provided Google Analytics source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-googleanalytics
         */
        readonly googleAnalytics?: string;
        /**
         * The operation to be performed on the provided Infor Nexus source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-infornexus
         */
        readonly inforNexus?: string;
        /**
         * The operation to be performed on the provided Marketo source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-marketo
         */
        readonly marketo?: string;
        /**
         * The operation to be performed on the provided Amazon S3 source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-s3
         */
        readonly s3?: string;
        /**
         * `CfnFlow.ConnectorOperatorProperty.SAPOData`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-sapodata
         */
        readonly sapoData?: string;
        /**
         * The operation to be performed on the provided Salesforce source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-salesforce
         */
        readonly salesforce?: string;
        /**
         * The operation to be performed on the provided ServiceNow source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-servicenow
         */
        readonly serviceNow?: string;
        /**
         * The operation to be performed on the provided Singular source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-singular
         */
        readonly singular?: string;
        /**
         * The operation to be performed on the provided Slack source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-slack
         */
        readonly slack?: string;
        /**
         * The operation to be performed on the provided Trend Micro source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-trendmicro
         */
        readonly trendmicro?: string;
        /**
         * The operation to be performed on the provided Veeva source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-veeva
         */
        readonly veeva?: string;
        /**
         * The operation to be performed on the provided Zendesk source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-connectoroperator.html#cfn-appflow-flow-connectoroperator-zendesk
         */
        readonly zendesk?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConnectorOperatorProperty`
 *
 * @param properties - the TypeScript properties of a `ConnectorOperatorProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_ConnectorOperatorPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('amplitude', cdk.validateString)(properties.amplitude));
    errors.collect(cdk.propertyValidator('datadog', cdk.validateString)(properties.datadog));
    errors.collect(cdk.propertyValidator('dynatrace', cdk.validateString)(properties.dynatrace));
    errors.collect(cdk.propertyValidator('googleAnalytics', cdk.validateString)(properties.googleAnalytics));
    errors.collect(cdk.propertyValidator('inforNexus', cdk.validateString)(properties.inforNexus));
    errors.collect(cdk.propertyValidator('marketo', cdk.validateString)(properties.marketo));
    errors.collect(cdk.propertyValidator('s3', cdk.validateString)(properties.s3));
    errors.collect(cdk.propertyValidator('sapoData', cdk.validateString)(properties.sapoData));
    errors.collect(cdk.propertyValidator('salesforce', cdk.validateString)(properties.salesforce));
    errors.collect(cdk.propertyValidator('serviceNow', cdk.validateString)(properties.serviceNow));
    errors.collect(cdk.propertyValidator('singular', cdk.validateString)(properties.singular));
    errors.collect(cdk.propertyValidator('slack', cdk.validateString)(properties.slack));
    errors.collect(cdk.propertyValidator('trendmicro', cdk.validateString)(properties.trendmicro));
    errors.collect(cdk.propertyValidator('veeva', cdk.validateString)(properties.veeva));
    errors.collect(cdk.propertyValidator('zendesk', cdk.validateString)(properties.zendesk));
    return errors.wrap('supplied properties not correct for "ConnectorOperatorProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.ConnectorOperator` resource
 *
 * @param properties - the TypeScript properties of a `ConnectorOperatorProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.ConnectorOperator` resource.
 */
// @ts-ignore TS6133
function cfnFlowConnectorOperatorPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_ConnectorOperatorPropertyValidator(properties).assertSuccess();
    return {
        Amplitude: cdk.stringToCloudFormation(properties.amplitude),
        Datadog: cdk.stringToCloudFormation(properties.datadog),
        Dynatrace: cdk.stringToCloudFormation(properties.dynatrace),
        GoogleAnalytics: cdk.stringToCloudFormation(properties.googleAnalytics),
        InforNexus: cdk.stringToCloudFormation(properties.inforNexus),
        Marketo: cdk.stringToCloudFormation(properties.marketo),
        S3: cdk.stringToCloudFormation(properties.s3),
        SAPOData: cdk.stringToCloudFormation(properties.sapoData),
        Salesforce: cdk.stringToCloudFormation(properties.salesforce),
        ServiceNow: cdk.stringToCloudFormation(properties.serviceNow),
        Singular: cdk.stringToCloudFormation(properties.singular),
        Slack: cdk.stringToCloudFormation(properties.slack),
        Trendmicro: cdk.stringToCloudFormation(properties.trendmicro),
        Veeva: cdk.stringToCloudFormation(properties.veeva),
        Zendesk: cdk.stringToCloudFormation(properties.zendesk),
    };
}

// @ts-ignore TS6133
function CfnFlowConnectorOperatorPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.ConnectorOperatorProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.ConnectorOperatorProperty>();
    ret.addPropertyResult('amplitude', 'Amplitude', properties.Amplitude != null ? cfn_parse.FromCloudFormation.getString(properties.Amplitude) : undefined);
    ret.addPropertyResult('datadog', 'Datadog', properties.Datadog != null ? cfn_parse.FromCloudFormation.getString(properties.Datadog) : undefined);
    ret.addPropertyResult('dynatrace', 'Dynatrace', properties.Dynatrace != null ? cfn_parse.FromCloudFormation.getString(properties.Dynatrace) : undefined);
    ret.addPropertyResult('googleAnalytics', 'GoogleAnalytics', properties.GoogleAnalytics != null ? cfn_parse.FromCloudFormation.getString(properties.GoogleAnalytics) : undefined);
    ret.addPropertyResult('inforNexus', 'InforNexus', properties.InforNexus != null ? cfn_parse.FromCloudFormation.getString(properties.InforNexus) : undefined);
    ret.addPropertyResult('marketo', 'Marketo', properties.Marketo != null ? cfn_parse.FromCloudFormation.getString(properties.Marketo) : undefined);
    ret.addPropertyResult('s3', 'S3', properties.S3 != null ? cfn_parse.FromCloudFormation.getString(properties.S3) : undefined);
    ret.addPropertyResult('sapoData', 'SAPOData', properties.SAPOData != null ? cfn_parse.FromCloudFormation.getString(properties.SAPOData) : undefined);
    ret.addPropertyResult('salesforce', 'Salesforce', properties.Salesforce != null ? cfn_parse.FromCloudFormation.getString(properties.Salesforce) : undefined);
    ret.addPropertyResult('serviceNow', 'ServiceNow', properties.ServiceNow != null ? cfn_parse.FromCloudFormation.getString(properties.ServiceNow) : undefined);
    ret.addPropertyResult('singular', 'Singular', properties.Singular != null ? cfn_parse.FromCloudFormation.getString(properties.Singular) : undefined);
    ret.addPropertyResult('slack', 'Slack', properties.Slack != null ? cfn_parse.FromCloudFormation.getString(properties.Slack) : undefined);
    ret.addPropertyResult('trendmicro', 'Trendmicro', properties.Trendmicro != null ? cfn_parse.FromCloudFormation.getString(properties.Trendmicro) : undefined);
    ret.addPropertyResult('veeva', 'Veeva', properties.Veeva != null ? cfn_parse.FromCloudFormation.getString(properties.Veeva) : undefined);
    ret.addPropertyResult('zendesk', 'Zendesk', properties.Zendesk != null ? cfn_parse.FromCloudFormation.getString(properties.Zendesk) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Datadog is being used as a source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-datadogsourceproperties.html
     */
    export interface DatadogSourcePropertiesProperty {
        /**
         * The object specified in the Datadog flow source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-datadogsourceproperties.html#cfn-appflow-flow-datadogsourceproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `DatadogSourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `DatadogSourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_DatadogSourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "DatadogSourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.DatadogSourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `DatadogSourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.DatadogSourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowDatadogSourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_DatadogSourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowDatadogSourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.DatadogSourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.DatadogSourcePropertiesProperty>();
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * This stores the information that is required to query a particular connector.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationconnectorproperties.html
     */
    export interface DestinationConnectorPropertiesProperty {
        /**
         * The properties required to query Amazon EventBridge.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationconnectorproperties.html#cfn-appflow-flow-destinationconnectorproperties-eventbridge
         */
        readonly eventBridge?: CfnFlow.EventBridgeDestinationPropertiesProperty | cdk.IResolvable;
        /**
         * The properties required to query Amazon Lookout for Metrics.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationconnectorproperties.html#cfn-appflow-flow-destinationconnectorproperties-lookoutmetrics
         */
        readonly lookoutMetrics?: CfnFlow.LookoutMetricsDestinationPropertiesProperty | cdk.IResolvable;
        /**
         * The properties required to query Marketo.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationconnectorproperties.html#cfn-appflow-flow-destinationconnectorproperties-marketo
         */
        readonly marketo?: CfnFlow.MarketoDestinationPropertiesProperty | cdk.IResolvable;
        /**
         * The properties required to query Amazon Redshift.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationconnectorproperties.html#cfn-appflow-flow-destinationconnectorproperties-redshift
         */
        readonly redshift?: CfnFlow.RedshiftDestinationPropertiesProperty | cdk.IResolvable;
        /**
         * The properties required to query Amazon S3.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationconnectorproperties.html#cfn-appflow-flow-destinationconnectorproperties-s3
         */
        readonly s3?: CfnFlow.S3DestinationPropertiesProperty | cdk.IResolvable;
        /**
         * The properties required to query SAPOData.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationconnectorproperties.html#cfn-appflow-flow-destinationconnectorproperties-sapodata
         */
        readonly sapoData?: CfnFlow.SAPODataDestinationPropertiesProperty | cdk.IResolvable;
        /**
         * The properties required to query Salesforce.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationconnectorproperties.html#cfn-appflow-flow-destinationconnectorproperties-salesforce
         */
        readonly salesforce?: CfnFlow.SalesforceDestinationPropertiesProperty | cdk.IResolvable;
        /**
         * The properties required to query Snowflake.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationconnectorproperties.html#cfn-appflow-flow-destinationconnectorproperties-snowflake
         */
        readonly snowflake?: CfnFlow.SnowflakeDestinationPropertiesProperty | cdk.IResolvable;
        /**
         * The properties required to query Upsolver.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationconnectorproperties.html#cfn-appflow-flow-destinationconnectorproperties-upsolver
         */
        readonly upsolver?: CfnFlow.UpsolverDestinationPropertiesProperty | cdk.IResolvable;
        /**
         * `CfnFlow.DestinationConnectorPropertiesProperty.Zendesk`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationconnectorproperties.html#cfn-appflow-flow-destinationconnectorproperties-zendesk
         */
        readonly zendesk?: CfnFlow.ZendeskDestinationPropertiesProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DestinationConnectorPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `DestinationConnectorPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_DestinationConnectorPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('eventBridge', CfnFlow_EventBridgeDestinationPropertiesPropertyValidator)(properties.eventBridge));
    errors.collect(cdk.propertyValidator('lookoutMetrics', CfnFlow_LookoutMetricsDestinationPropertiesPropertyValidator)(properties.lookoutMetrics));
    errors.collect(cdk.propertyValidator('marketo', CfnFlow_MarketoDestinationPropertiesPropertyValidator)(properties.marketo));
    errors.collect(cdk.propertyValidator('redshift', CfnFlow_RedshiftDestinationPropertiesPropertyValidator)(properties.redshift));
    errors.collect(cdk.propertyValidator('s3', CfnFlow_S3DestinationPropertiesPropertyValidator)(properties.s3));
    errors.collect(cdk.propertyValidator('sapoData', CfnFlow_SAPODataDestinationPropertiesPropertyValidator)(properties.sapoData));
    errors.collect(cdk.propertyValidator('salesforce', CfnFlow_SalesforceDestinationPropertiesPropertyValidator)(properties.salesforce));
    errors.collect(cdk.propertyValidator('snowflake', CfnFlow_SnowflakeDestinationPropertiesPropertyValidator)(properties.snowflake));
    errors.collect(cdk.propertyValidator('upsolver', CfnFlow_UpsolverDestinationPropertiesPropertyValidator)(properties.upsolver));
    errors.collect(cdk.propertyValidator('zendesk', CfnFlow_ZendeskDestinationPropertiesPropertyValidator)(properties.zendesk));
    return errors.wrap('supplied properties not correct for "DestinationConnectorPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.DestinationConnectorProperties` resource
 *
 * @param properties - the TypeScript properties of a `DestinationConnectorPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.DestinationConnectorProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowDestinationConnectorPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_DestinationConnectorPropertiesPropertyValidator(properties).assertSuccess();
    return {
        EventBridge: cfnFlowEventBridgeDestinationPropertiesPropertyToCloudFormation(properties.eventBridge),
        LookoutMetrics: cfnFlowLookoutMetricsDestinationPropertiesPropertyToCloudFormation(properties.lookoutMetrics),
        Marketo: cfnFlowMarketoDestinationPropertiesPropertyToCloudFormation(properties.marketo),
        Redshift: cfnFlowRedshiftDestinationPropertiesPropertyToCloudFormation(properties.redshift),
        S3: cfnFlowS3DestinationPropertiesPropertyToCloudFormation(properties.s3),
        SAPOData: cfnFlowSAPODataDestinationPropertiesPropertyToCloudFormation(properties.sapoData),
        Salesforce: cfnFlowSalesforceDestinationPropertiesPropertyToCloudFormation(properties.salesforce),
        Snowflake: cfnFlowSnowflakeDestinationPropertiesPropertyToCloudFormation(properties.snowflake),
        Upsolver: cfnFlowUpsolverDestinationPropertiesPropertyToCloudFormation(properties.upsolver),
        Zendesk: cfnFlowZendeskDestinationPropertiesPropertyToCloudFormation(properties.zendesk),
    };
}

// @ts-ignore TS6133
function CfnFlowDestinationConnectorPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.DestinationConnectorPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.DestinationConnectorPropertiesProperty>();
    ret.addPropertyResult('eventBridge', 'EventBridge', properties.EventBridge != null ? CfnFlowEventBridgeDestinationPropertiesPropertyFromCloudFormation(properties.EventBridge) : undefined);
    ret.addPropertyResult('lookoutMetrics', 'LookoutMetrics', properties.LookoutMetrics != null ? CfnFlowLookoutMetricsDestinationPropertiesPropertyFromCloudFormation(properties.LookoutMetrics) : undefined);
    ret.addPropertyResult('marketo', 'Marketo', properties.Marketo != null ? CfnFlowMarketoDestinationPropertiesPropertyFromCloudFormation(properties.Marketo) : undefined);
    ret.addPropertyResult('redshift', 'Redshift', properties.Redshift != null ? CfnFlowRedshiftDestinationPropertiesPropertyFromCloudFormation(properties.Redshift) : undefined);
    ret.addPropertyResult('s3', 'S3', properties.S3 != null ? CfnFlowS3DestinationPropertiesPropertyFromCloudFormation(properties.S3) : undefined);
    ret.addPropertyResult('sapoData', 'SAPOData', properties.SAPOData != null ? CfnFlowSAPODataDestinationPropertiesPropertyFromCloudFormation(properties.SAPOData) : undefined);
    ret.addPropertyResult('salesforce', 'Salesforce', properties.Salesforce != null ? CfnFlowSalesforceDestinationPropertiesPropertyFromCloudFormation(properties.Salesforce) : undefined);
    ret.addPropertyResult('snowflake', 'Snowflake', properties.Snowflake != null ? CfnFlowSnowflakeDestinationPropertiesPropertyFromCloudFormation(properties.Snowflake) : undefined);
    ret.addPropertyResult('upsolver', 'Upsolver', properties.Upsolver != null ? CfnFlowUpsolverDestinationPropertiesPropertyFromCloudFormation(properties.Upsolver) : undefined);
    ret.addPropertyResult('zendesk', 'Zendesk', properties.Zendesk != null ? CfnFlowZendeskDestinationPropertiesPropertyFromCloudFormation(properties.Zendesk) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The `DestinationFlowConfig` property type specifies information about the configuration of destination connectors present in the flow.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationflowconfig.html
     */
    export interface DestinationFlowConfigProperty {
        /**
         * The name of the connector profile. This name must be unique for each connector profile in the AWS account .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationflowconfig.html#cfn-appflow-flow-destinationflowconfig-connectorprofilename
         */
        readonly connectorProfileName?: string;
        /**
         * The type of destination connector, such as Sales force, Amazon S3, and so on.
         *
         * *Allowed Values* : `EventBridge | Redshift | S3 | Salesforce | Snowflake`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationflowconfig.html#cfn-appflow-flow-destinationflowconfig-connectortype
         */
        readonly connectorType: string;
        /**
         * This stores the information that is required to query a particular connector.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-destinationflowconfig.html#cfn-appflow-flow-destinationflowconfig-destinationconnectorproperties
         */
        readonly destinationConnectorProperties: CfnFlow.DestinationConnectorPropertiesProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DestinationFlowConfigProperty`
 *
 * @param properties - the TypeScript properties of a `DestinationFlowConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_DestinationFlowConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('connectorProfileName', cdk.validateString)(properties.connectorProfileName));
    errors.collect(cdk.propertyValidator('connectorType', cdk.requiredValidator)(properties.connectorType));
    errors.collect(cdk.propertyValidator('connectorType', cdk.validateString)(properties.connectorType));
    errors.collect(cdk.propertyValidator('destinationConnectorProperties', cdk.requiredValidator)(properties.destinationConnectorProperties));
    errors.collect(cdk.propertyValidator('destinationConnectorProperties', CfnFlow_DestinationConnectorPropertiesPropertyValidator)(properties.destinationConnectorProperties));
    return errors.wrap('supplied properties not correct for "DestinationFlowConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.DestinationFlowConfig` resource
 *
 * @param properties - the TypeScript properties of a `DestinationFlowConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.DestinationFlowConfig` resource.
 */
// @ts-ignore TS6133
function cfnFlowDestinationFlowConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_DestinationFlowConfigPropertyValidator(properties).assertSuccess();
    return {
        ConnectorProfileName: cdk.stringToCloudFormation(properties.connectorProfileName),
        ConnectorType: cdk.stringToCloudFormation(properties.connectorType),
        DestinationConnectorProperties: cfnFlowDestinationConnectorPropertiesPropertyToCloudFormation(properties.destinationConnectorProperties),
    };
}

// @ts-ignore TS6133
function CfnFlowDestinationFlowConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.DestinationFlowConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.DestinationFlowConfigProperty>();
    ret.addPropertyResult('connectorProfileName', 'ConnectorProfileName', properties.ConnectorProfileName != null ? cfn_parse.FromCloudFormation.getString(properties.ConnectorProfileName) : undefined);
    ret.addPropertyResult('connectorType', 'ConnectorType', cfn_parse.FromCloudFormation.getString(properties.ConnectorType));
    ret.addPropertyResult('destinationConnectorProperties', 'DestinationConnectorProperties', CfnFlowDestinationConnectorPropertiesPropertyFromCloudFormation(properties.DestinationConnectorProperties));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Dynatrace is being used as a source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-dynatracesourceproperties.html
     */
    export interface DynatraceSourcePropertiesProperty {
        /**
         * The object specified in the Dynatrace flow source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-dynatracesourceproperties.html#cfn-appflow-flow-dynatracesourceproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `DynatraceSourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `DynatraceSourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_DynatraceSourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "DynatraceSourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.DynatraceSourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `DynatraceSourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.DynatraceSourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowDynatraceSourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_DynatraceSourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowDynatraceSourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.DynatraceSourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.DynatraceSourcePropertiesProperty>();
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The settings that determine how Amazon AppFlow handles an error when placing data in the destination. For example, this setting would determine if the flow should fail after one insertion error, or continue and attempt to insert every record regardless of the initial failure. `ErrorHandlingConfig` is a part of the destination connector details.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-errorhandlingconfig.html
     */
    export interface ErrorHandlingConfigProperty {
        /**
         * Specifies the name of the Amazon S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-errorhandlingconfig.html#cfn-appflow-flow-errorhandlingconfig-bucketname
         */
        readonly bucketName?: string;
        /**
         * Specifies the Amazon S3 bucket prefix.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-errorhandlingconfig.html#cfn-appflow-flow-errorhandlingconfig-bucketprefix
         */
        readonly bucketPrefix?: string;
        /**
         * Specifies if the flow should fail after the first instance of a failure when attempting to place data in the destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-errorhandlingconfig.html#cfn-appflow-flow-errorhandlingconfig-failonfirsterror
         */
        readonly failOnFirstError?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ErrorHandlingConfigProperty`
 *
 * @param properties - the TypeScript properties of a `ErrorHandlingConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_ErrorHandlingConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketName', cdk.validateString)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketPrefix', cdk.validateString)(properties.bucketPrefix));
    errors.collect(cdk.propertyValidator('failOnFirstError', cdk.validateBoolean)(properties.failOnFirstError));
    return errors.wrap('supplied properties not correct for "ErrorHandlingConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.ErrorHandlingConfig` resource
 *
 * @param properties - the TypeScript properties of a `ErrorHandlingConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.ErrorHandlingConfig` resource.
 */
// @ts-ignore TS6133
function cfnFlowErrorHandlingConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_ErrorHandlingConfigPropertyValidator(properties).assertSuccess();
    return {
        BucketName: cdk.stringToCloudFormation(properties.bucketName),
        BucketPrefix: cdk.stringToCloudFormation(properties.bucketPrefix),
        FailOnFirstError: cdk.booleanToCloudFormation(properties.failOnFirstError),
    };
}

// @ts-ignore TS6133
function CfnFlowErrorHandlingConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.ErrorHandlingConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.ErrorHandlingConfigProperty>();
    ret.addPropertyResult('bucketName', 'BucketName', properties.BucketName != null ? cfn_parse.FromCloudFormation.getString(properties.BucketName) : undefined);
    ret.addPropertyResult('bucketPrefix', 'BucketPrefix', properties.BucketPrefix != null ? cfn_parse.FromCloudFormation.getString(properties.BucketPrefix) : undefined);
    ret.addPropertyResult('failOnFirstError', 'FailOnFirstError', properties.FailOnFirstError != null ? cfn_parse.FromCloudFormation.getBoolean(properties.FailOnFirstError) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Amazon EventBridge is being used as a destination.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-eventbridgedestinationproperties.html
     */
    export interface EventBridgeDestinationPropertiesProperty {
        /**
         * The object specified in the Amplitude flow source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-eventbridgedestinationproperties.html#cfn-appflow-flow-eventbridgedestinationproperties-errorhandlingconfig
         */
        readonly errorHandlingConfig?: CfnFlow.ErrorHandlingConfigProperty | cdk.IResolvable;
        /**
         * The object specified in the Amazon EventBridge flow destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-eventbridgedestinationproperties.html#cfn-appflow-flow-eventbridgedestinationproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `EventBridgeDestinationPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `EventBridgeDestinationPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_EventBridgeDestinationPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('errorHandlingConfig', CfnFlow_ErrorHandlingConfigPropertyValidator)(properties.errorHandlingConfig));
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "EventBridgeDestinationPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.EventBridgeDestinationProperties` resource
 *
 * @param properties - the TypeScript properties of a `EventBridgeDestinationPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.EventBridgeDestinationProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowEventBridgeDestinationPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_EventBridgeDestinationPropertiesPropertyValidator(properties).assertSuccess();
    return {
        ErrorHandlingConfig: cfnFlowErrorHandlingConfigPropertyToCloudFormation(properties.errorHandlingConfig),
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowEventBridgeDestinationPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.EventBridgeDestinationPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.EventBridgeDestinationPropertiesProperty>();
    ret.addPropertyResult('errorHandlingConfig', 'ErrorHandlingConfig', properties.ErrorHandlingConfig != null ? CfnFlowErrorHandlingConfigPropertyFromCloudFormation(properties.ErrorHandlingConfig) : undefined);
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Google Analytics is being used as a source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-googleanalyticssourceproperties.html
     */
    export interface GoogleAnalyticsSourcePropertiesProperty {
        /**
         * The object specified in the Google Analytics flow source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-googleanalyticssourceproperties.html#cfn-appflow-flow-googleanalyticssourceproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `GoogleAnalyticsSourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `GoogleAnalyticsSourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_GoogleAnalyticsSourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "GoogleAnalyticsSourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.GoogleAnalyticsSourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `GoogleAnalyticsSourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.GoogleAnalyticsSourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowGoogleAnalyticsSourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_GoogleAnalyticsSourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowGoogleAnalyticsSourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.GoogleAnalyticsSourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.GoogleAnalyticsSourcePropertiesProperty>();
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * Specifies the configuration used when importing incremental records from the source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-incrementalpullconfig.html
     */
    export interface IncrementalPullConfigProperty {
        /**
         * A field that specifies the date time or timestamp field as the criteria to use when importing incremental records from the source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-incrementalpullconfig.html#cfn-appflow-flow-incrementalpullconfig-datetimetypefieldname
         */
        readonly datetimeTypeFieldName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `IncrementalPullConfigProperty`
 *
 * @param properties - the TypeScript properties of a `IncrementalPullConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_IncrementalPullConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('datetimeTypeFieldName', cdk.validateString)(properties.datetimeTypeFieldName));
    return errors.wrap('supplied properties not correct for "IncrementalPullConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.IncrementalPullConfig` resource
 *
 * @param properties - the TypeScript properties of a `IncrementalPullConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.IncrementalPullConfig` resource.
 */
// @ts-ignore TS6133
function cfnFlowIncrementalPullConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_IncrementalPullConfigPropertyValidator(properties).assertSuccess();
    return {
        DatetimeTypeFieldName: cdk.stringToCloudFormation(properties.datetimeTypeFieldName),
    };
}

// @ts-ignore TS6133
function CfnFlowIncrementalPullConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.IncrementalPullConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.IncrementalPullConfigProperty>();
    ret.addPropertyResult('datetimeTypeFieldName', 'DatetimeTypeFieldName', properties.DatetimeTypeFieldName != null ? cfn_parse.FromCloudFormation.getString(properties.DatetimeTypeFieldName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Infor Nexus is being used as a source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-infornexussourceproperties.html
     */
    export interface InforNexusSourcePropertiesProperty {
        /**
         * The object specified in the Infor Nexus flow source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-infornexussourceproperties.html#cfn-appflow-flow-infornexussourceproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `InforNexusSourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `InforNexusSourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_InforNexusSourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "InforNexusSourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.InforNexusSourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `InforNexusSourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.InforNexusSourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowInforNexusSourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_InforNexusSourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowInforNexusSourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.InforNexusSourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.InforNexusSourcePropertiesProperty>();
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Amazon Lookout for Metrics is used as a destination.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-lookoutmetricsdestinationproperties.html
     */
    export interface LookoutMetricsDestinationPropertiesProperty {
        /**
         * The object specified in the Amazon Lookout for Metrics flow destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-lookoutmetricsdestinationproperties.html#cfn-appflow-flow-lookoutmetricsdestinationproperties-object
         */
        readonly object?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LookoutMetricsDestinationPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `LookoutMetricsDestinationPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_LookoutMetricsDestinationPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "LookoutMetricsDestinationPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.LookoutMetricsDestinationProperties` resource
 *
 * @param properties - the TypeScript properties of a `LookoutMetricsDestinationPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.LookoutMetricsDestinationProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowLookoutMetricsDestinationPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_LookoutMetricsDestinationPropertiesPropertyValidator(properties).assertSuccess();
    return {
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowLookoutMetricsDestinationPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.LookoutMetricsDestinationPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.LookoutMetricsDestinationPropertiesProperty>();
    ret.addPropertyResult('object', 'Object', properties.Object != null ? cfn_parse.FromCloudFormation.getString(properties.Object) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that Amazon AppFlow applies when you use Marketo as a flow destination.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-marketodestinationproperties.html
     */
    export interface MarketoDestinationPropertiesProperty {
        /**
         * `CfnFlow.MarketoDestinationPropertiesProperty.ErrorHandlingConfig`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-marketodestinationproperties.html#cfn-appflow-flow-marketodestinationproperties-errorhandlingconfig
         */
        readonly errorHandlingConfig?: CfnFlow.ErrorHandlingConfigProperty | cdk.IResolvable;
        /**
         * The object specified in the Marketo flow destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-marketodestinationproperties.html#cfn-appflow-flow-marketodestinationproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `MarketoDestinationPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `MarketoDestinationPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_MarketoDestinationPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('errorHandlingConfig', CfnFlow_ErrorHandlingConfigPropertyValidator)(properties.errorHandlingConfig));
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "MarketoDestinationPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.MarketoDestinationProperties` resource
 *
 * @param properties - the TypeScript properties of a `MarketoDestinationPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.MarketoDestinationProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowMarketoDestinationPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_MarketoDestinationPropertiesPropertyValidator(properties).assertSuccess();
    return {
        ErrorHandlingConfig: cfnFlowErrorHandlingConfigPropertyToCloudFormation(properties.errorHandlingConfig),
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowMarketoDestinationPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.MarketoDestinationPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.MarketoDestinationPropertiesProperty>();
    ret.addPropertyResult('errorHandlingConfig', 'ErrorHandlingConfig', properties.ErrorHandlingConfig != null ? CfnFlowErrorHandlingConfigPropertyFromCloudFormation(properties.ErrorHandlingConfig) : undefined);
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Marketo is being used as a source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-marketosourceproperties.html
     */
    export interface MarketoSourcePropertiesProperty {
        /**
         * The object specified in the Marketo flow source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-marketosourceproperties.html#cfn-appflow-flow-marketosourceproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `MarketoSourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `MarketoSourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_MarketoSourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "MarketoSourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.MarketoSourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `MarketoSourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.MarketoSourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowMarketoSourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_MarketoSourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowMarketoSourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.MarketoSourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.MarketoSourcePropertiesProperty>();
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * Determines the prefix that Amazon AppFlow applies to the destination folder name. You can name your destination folders according to the flow frequency and date.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-prefixconfig.html
     */
    export interface PrefixConfigProperty {
        /**
         * Determines the level of granularity that's included in the prefix.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-prefixconfig.html#cfn-appflow-flow-prefixconfig-prefixformat
         */
        readonly prefixFormat?: string;
        /**
         * Determines the format of the prefix, and whether it applies to the file name, file path, or both.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-prefixconfig.html#cfn-appflow-flow-prefixconfig-prefixtype
         */
        readonly prefixType?: string;
    }
}

/**
 * Determine whether the given properties match those of a `PrefixConfigProperty`
 *
 * @param properties - the TypeScript properties of a `PrefixConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_PrefixConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('prefixFormat', cdk.validateString)(properties.prefixFormat));
    errors.collect(cdk.propertyValidator('prefixType', cdk.validateString)(properties.prefixType));
    return errors.wrap('supplied properties not correct for "PrefixConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.PrefixConfig` resource
 *
 * @param properties - the TypeScript properties of a `PrefixConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.PrefixConfig` resource.
 */
// @ts-ignore TS6133
function cfnFlowPrefixConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_PrefixConfigPropertyValidator(properties).assertSuccess();
    return {
        PrefixFormat: cdk.stringToCloudFormation(properties.prefixFormat),
        PrefixType: cdk.stringToCloudFormation(properties.prefixType),
    };
}

// @ts-ignore TS6133
function CfnFlowPrefixConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.PrefixConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.PrefixConfigProperty>();
    ret.addPropertyResult('prefixFormat', 'PrefixFormat', properties.PrefixFormat != null ? cfn_parse.FromCloudFormation.getString(properties.PrefixFormat) : undefined);
    ret.addPropertyResult('prefixType', 'PrefixType', properties.PrefixType != null ? cfn_parse.FromCloudFormation.getString(properties.PrefixType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Amazon Redshift is being used as a destination.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-redshiftdestinationproperties.html
     */
    export interface RedshiftDestinationPropertiesProperty {
        /**
         * The object key for the bucket in which Amazon AppFlow places the destination files.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-redshiftdestinationproperties.html#cfn-appflow-flow-redshiftdestinationproperties-bucketprefix
         */
        readonly bucketPrefix?: string;
        /**
         * The settings that determine how Amazon AppFlow handles an error when placing data in the Amazon Redshift destination. For example, this setting would determine if the flow should fail after one insertion error, or continue and attempt to insert every record regardless of the initial failure. `ErrorHandlingConfig` is a part of the destination connector details.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-redshiftdestinationproperties.html#cfn-appflow-flow-redshiftdestinationproperties-errorhandlingconfig
         */
        readonly errorHandlingConfig?: CfnFlow.ErrorHandlingConfigProperty | cdk.IResolvable;
        /**
         * The intermediate bucket that Amazon AppFlow uses when moving data into Amazon Redshift.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-redshiftdestinationproperties.html#cfn-appflow-flow-redshiftdestinationproperties-intermediatebucketname
         */
        readonly intermediateBucketName: string;
        /**
         * The object specified in the Amazon Redshift flow destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-redshiftdestinationproperties.html#cfn-appflow-flow-redshiftdestinationproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `RedshiftDestinationPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `RedshiftDestinationPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_RedshiftDestinationPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketPrefix', cdk.validateString)(properties.bucketPrefix));
    errors.collect(cdk.propertyValidator('errorHandlingConfig', CfnFlow_ErrorHandlingConfigPropertyValidator)(properties.errorHandlingConfig));
    errors.collect(cdk.propertyValidator('intermediateBucketName', cdk.requiredValidator)(properties.intermediateBucketName));
    errors.collect(cdk.propertyValidator('intermediateBucketName', cdk.validateString)(properties.intermediateBucketName));
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "RedshiftDestinationPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.RedshiftDestinationProperties` resource
 *
 * @param properties - the TypeScript properties of a `RedshiftDestinationPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.RedshiftDestinationProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowRedshiftDestinationPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_RedshiftDestinationPropertiesPropertyValidator(properties).assertSuccess();
    return {
        BucketPrefix: cdk.stringToCloudFormation(properties.bucketPrefix),
        ErrorHandlingConfig: cfnFlowErrorHandlingConfigPropertyToCloudFormation(properties.errorHandlingConfig),
        IntermediateBucketName: cdk.stringToCloudFormation(properties.intermediateBucketName),
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowRedshiftDestinationPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.RedshiftDestinationPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.RedshiftDestinationPropertiesProperty>();
    ret.addPropertyResult('bucketPrefix', 'BucketPrefix', properties.BucketPrefix != null ? cfn_parse.FromCloudFormation.getString(properties.BucketPrefix) : undefined);
    ret.addPropertyResult('errorHandlingConfig', 'ErrorHandlingConfig', properties.ErrorHandlingConfig != null ? CfnFlowErrorHandlingConfigPropertyFromCloudFormation(properties.ErrorHandlingConfig) : undefined);
    ret.addPropertyResult('intermediateBucketName', 'IntermediateBucketName', cfn_parse.FromCloudFormation.getString(properties.IntermediateBucketName));
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Amazon S3 is used as a destination.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-s3destinationproperties.html
     */
    export interface S3DestinationPropertiesProperty {
        /**
         * The Amazon S3 bucket name in which Amazon AppFlow places the transferred data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-s3destinationproperties.html#cfn-appflow-flow-s3destinationproperties-bucketname
         */
        readonly bucketName: string;
        /**
         * The object key for the destination bucket in which Amazon AppFlow places the files.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-s3destinationproperties.html#cfn-appflow-flow-s3destinationproperties-bucketprefix
         */
        readonly bucketPrefix?: string;
        /**
         * The configuration that determines how Amazon AppFlow should format the flow output data when Amazon S3 is used as the destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-s3destinationproperties.html#cfn-appflow-flow-s3destinationproperties-s3outputformatconfig
         */
        readonly s3OutputFormatConfig?: CfnFlow.S3OutputFormatConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `S3DestinationPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `S3DestinationPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_S3DestinationPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketName', cdk.requiredValidator)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketName', cdk.validateString)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketPrefix', cdk.validateString)(properties.bucketPrefix));
    errors.collect(cdk.propertyValidator('s3OutputFormatConfig', CfnFlow_S3OutputFormatConfigPropertyValidator)(properties.s3OutputFormatConfig));
    return errors.wrap('supplied properties not correct for "S3DestinationPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.S3DestinationProperties` resource
 *
 * @param properties - the TypeScript properties of a `S3DestinationPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.S3DestinationProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowS3DestinationPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_S3DestinationPropertiesPropertyValidator(properties).assertSuccess();
    return {
        BucketName: cdk.stringToCloudFormation(properties.bucketName),
        BucketPrefix: cdk.stringToCloudFormation(properties.bucketPrefix),
        S3OutputFormatConfig: cfnFlowS3OutputFormatConfigPropertyToCloudFormation(properties.s3OutputFormatConfig),
    };
}

// @ts-ignore TS6133
function CfnFlowS3DestinationPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.S3DestinationPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.S3DestinationPropertiesProperty>();
    ret.addPropertyResult('bucketName', 'BucketName', cfn_parse.FromCloudFormation.getString(properties.BucketName));
    ret.addPropertyResult('bucketPrefix', 'BucketPrefix', properties.BucketPrefix != null ? cfn_parse.FromCloudFormation.getString(properties.BucketPrefix) : undefined);
    ret.addPropertyResult('s3OutputFormatConfig', 'S3OutputFormatConfig', properties.S3OutputFormatConfig != null ? CfnFlowS3OutputFormatConfigPropertyFromCloudFormation(properties.S3OutputFormatConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-s3inputformatconfig.html
     */
    export interface S3InputFormatConfigProperty {
        /**
         * `CfnFlow.S3InputFormatConfigProperty.S3InputFileType`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-s3inputformatconfig.html#cfn-appflow-flow-s3inputformatconfig-s3inputfiletype
         */
        readonly s3InputFileType?: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3InputFormatConfigProperty`
 *
 * @param properties - the TypeScript properties of a `S3InputFormatConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_S3InputFormatConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3InputFileType', cdk.validateString)(properties.s3InputFileType));
    return errors.wrap('supplied properties not correct for "S3InputFormatConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.S3InputFormatConfig` resource
 *
 * @param properties - the TypeScript properties of a `S3InputFormatConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.S3InputFormatConfig` resource.
 */
// @ts-ignore TS6133
function cfnFlowS3InputFormatConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_S3InputFormatConfigPropertyValidator(properties).assertSuccess();
    return {
        S3InputFileType: cdk.stringToCloudFormation(properties.s3InputFileType),
    };
}

// @ts-ignore TS6133
function CfnFlowS3InputFormatConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.S3InputFormatConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.S3InputFormatConfigProperty>();
    ret.addPropertyResult('s3InputFileType', 'S3InputFileType', properties.S3InputFileType != null ? cfn_parse.FromCloudFormation.getString(properties.S3InputFileType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The configuration that determines how Amazon AppFlow should format the flow output data when Amazon S3 is used as the destination.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-s3outputformatconfig.html
     */
    export interface S3OutputFormatConfigProperty {
        /**
         * The aggregation settings that you can use to customize the output format of your flow data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-s3outputformatconfig.html#cfn-appflow-flow-s3outputformatconfig-aggregationconfig
         */
        readonly aggregationConfig?: CfnFlow.AggregationConfigProperty | cdk.IResolvable;
        /**
         * Indicates the file type that Amazon AppFlow places in the Amazon S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-s3outputformatconfig.html#cfn-appflow-flow-s3outputformatconfig-filetype
         */
        readonly fileType?: string;
        /**
         * Determines the prefix that Amazon AppFlow applies to the folder name in the Amazon S3 bucket. You can name folders according to the flow frequency and date.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-s3outputformatconfig.html#cfn-appflow-flow-s3outputformatconfig-prefixconfig
         */
        readonly prefixConfig?: CfnFlow.PrefixConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `S3OutputFormatConfigProperty`
 *
 * @param properties - the TypeScript properties of a `S3OutputFormatConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_S3OutputFormatConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('aggregationConfig', CfnFlow_AggregationConfigPropertyValidator)(properties.aggregationConfig));
    errors.collect(cdk.propertyValidator('fileType', cdk.validateString)(properties.fileType));
    errors.collect(cdk.propertyValidator('prefixConfig', CfnFlow_PrefixConfigPropertyValidator)(properties.prefixConfig));
    return errors.wrap('supplied properties not correct for "S3OutputFormatConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.S3OutputFormatConfig` resource
 *
 * @param properties - the TypeScript properties of a `S3OutputFormatConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.S3OutputFormatConfig` resource.
 */
// @ts-ignore TS6133
function cfnFlowS3OutputFormatConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_S3OutputFormatConfigPropertyValidator(properties).assertSuccess();
    return {
        AggregationConfig: cfnFlowAggregationConfigPropertyToCloudFormation(properties.aggregationConfig),
        FileType: cdk.stringToCloudFormation(properties.fileType),
        PrefixConfig: cfnFlowPrefixConfigPropertyToCloudFormation(properties.prefixConfig),
    };
}

// @ts-ignore TS6133
function CfnFlowS3OutputFormatConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.S3OutputFormatConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.S3OutputFormatConfigProperty>();
    ret.addPropertyResult('aggregationConfig', 'AggregationConfig', properties.AggregationConfig != null ? CfnFlowAggregationConfigPropertyFromCloudFormation(properties.AggregationConfig) : undefined);
    ret.addPropertyResult('fileType', 'FileType', properties.FileType != null ? cfn_parse.FromCloudFormation.getString(properties.FileType) : undefined);
    ret.addPropertyResult('prefixConfig', 'PrefixConfig', properties.PrefixConfig != null ? CfnFlowPrefixConfigPropertyFromCloudFormation(properties.PrefixConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Amazon S3 is being used as the flow source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-s3sourceproperties.html
     */
    export interface S3SourcePropertiesProperty {
        /**
         * The Amazon S3 bucket name where the source files are stored.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-s3sourceproperties.html#cfn-appflow-flow-s3sourceproperties-bucketname
         */
        readonly bucketName: string;
        /**
         * The object key for the Amazon S3 bucket in which the source files are stored.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-s3sourceproperties.html#cfn-appflow-flow-s3sourceproperties-bucketprefix
         */
        readonly bucketPrefix: string;
        /**
         * `CfnFlow.S3SourcePropertiesProperty.S3InputFormatConfig`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-s3sourceproperties.html#cfn-appflow-flow-s3sourceproperties-s3inputformatconfig
         */
        readonly s3InputFormatConfig?: CfnFlow.S3InputFormatConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `S3SourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `S3SourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_S3SourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketName', cdk.requiredValidator)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketName', cdk.validateString)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketPrefix', cdk.requiredValidator)(properties.bucketPrefix));
    errors.collect(cdk.propertyValidator('bucketPrefix', cdk.validateString)(properties.bucketPrefix));
    errors.collect(cdk.propertyValidator('s3InputFormatConfig', CfnFlow_S3InputFormatConfigPropertyValidator)(properties.s3InputFormatConfig));
    return errors.wrap('supplied properties not correct for "S3SourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.S3SourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `S3SourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.S3SourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowS3SourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_S3SourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        BucketName: cdk.stringToCloudFormation(properties.bucketName),
        BucketPrefix: cdk.stringToCloudFormation(properties.bucketPrefix),
        S3InputFormatConfig: cfnFlowS3InputFormatConfigPropertyToCloudFormation(properties.s3InputFormatConfig),
    };
}

// @ts-ignore TS6133
function CfnFlowS3SourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.S3SourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.S3SourcePropertiesProperty>();
    ret.addPropertyResult('bucketName', 'BucketName', cfn_parse.FromCloudFormation.getString(properties.BucketName));
    ret.addPropertyResult('bucketPrefix', 'BucketPrefix', cfn_parse.FromCloudFormation.getString(properties.BucketPrefix));
    ret.addPropertyResult('s3InputFormatConfig', 'S3InputFormatConfig', properties.S3InputFormatConfig != null ? CfnFlowS3InputFormatConfigPropertyFromCloudFormation(properties.S3InputFormatConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when using SAPOData as a flow destination
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sapodatadestinationproperties.html
     */
    export interface SAPODataDestinationPropertiesProperty {
        /**
         * `CfnFlow.SAPODataDestinationPropertiesProperty.ErrorHandlingConfig`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sapodatadestinationproperties.html#cfn-appflow-flow-sapodatadestinationproperties-errorhandlingconfig
         */
        readonly errorHandlingConfig?: CfnFlow.ErrorHandlingConfigProperty | cdk.IResolvable;
        /**
         * `CfnFlow.SAPODataDestinationPropertiesProperty.IdFieldNames`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sapodatadestinationproperties.html#cfn-appflow-flow-sapodatadestinationproperties-idfieldnames
         */
        readonly idFieldNames?: string[];
        /**
         * The object path specified in the SAPOData flow destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sapodatadestinationproperties.html#cfn-appflow-flow-sapodatadestinationproperties-objectpath
         */
        readonly objectPath: string;
        /**
         * Determines how Amazon AppFlow handles the success response that it gets from the connector after placing data.
         *
         * For example, this setting would determine where to write the response from a destination connector upon a successful insert operation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sapodatadestinationproperties.html#cfn-appflow-flow-sapodatadestinationproperties-successresponsehandlingconfig
         */
        readonly successResponseHandlingConfig?: CfnFlow.SuccessResponseHandlingConfigProperty | cdk.IResolvable;
        /**
         * `CfnFlow.SAPODataDestinationPropertiesProperty.WriteOperationType`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sapodatadestinationproperties.html#cfn-appflow-flow-sapodatadestinationproperties-writeoperationtype
         */
        readonly writeOperationType?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SAPODataDestinationPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `SAPODataDestinationPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_SAPODataDestinationPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('errorHandlingConfig', CfnFlow_ErrorHandlingConfigPropertyValidator)(properties.errorHandlingConfig));
    errors.collect(cdk.propertyValidator('idFieldNames', cdk.listValidator(cdk.validateString))(properties.idFieldNames));
    errors.collect(cdk.propertyValidator('objectPath', cdk.requiredValidator)(properties.objectPath));
    errors.collect(cdk.propertyValidator('objectPath', cdk.validateString)(properties.objectPath));
    errors.collect(cdk.propertyValidator('successResponseHandlingConfig', CfnFlow_SuccessResponseHandlingConfigPropertyValidator)(properties.successResponseHandlingConfig));
    errors.collect(cdk.propertyValidator('writeOperationType', cdk.validateString)(properties.writeOperationType));
    return errors.wrap('supplied properties not correct for "SAPODataDestinationPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SAPODataDestinationProperties` resource
 *
 * @param properties - the TypeScript properties of a `SAPODataDestinationPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SAPODataDestinationProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowSAPODataDestinationPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_SAPODataDestinationPropertiesPropertyValidator(properties).assertSuccess();
    return {
        ErrorHandlingConfig: cfnFlowErrorHandlingConfigPropertyToCloudFormation(properties.errorHandlingConfig),
        IdFieldNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.idFieldNames),
        ObjectPath: cdk.stringToCloudFormation(properties.objectPath),
        SuccessResponseHandlingConfig: cfnFlowSuccessResponseHandlingConfigPropertyToCloudFormation(properties.successResponseHandlingConfig),
        WriteOperationType: cdk.stringToCloudFormation(properties.writeOperationType),
    };
}

// @ts-ignore TS6133
function CfnFlowSAPODataDestinationPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.SAPODataDestinationPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.SAPODataDestinationPropertiesProperty>();
    ret.addPropertyResult('errorHandlingConfig', 'ErrorHandlingConfig', properties.ErrorHandlingConfig != null ? CfnFlowErrorHandlingConfigPropertyFromCloudFormation(properties.ErrorHandlingConfig) : undefined);
    ret.addPropertyResult('idFieldNames', 'IdFieldNames', properties.IdFieldNames != null ? cfn_parse.FromCloudFormation.getStringArray(properties.IdFieldNames) : undefined);
    ret.addPropertyResult('objectPath', 'ObjectPath', cfn_parse.FromCloudFormation.getString(properties.ObjectPath));
    ret.addPropertyResult('successResponseHandlingConfig', 'SuccessResponseHandlingConfig', properties.SuccessResponseHandlingConfig != null ? CfnFlowSuccessResponseHandlingConfigPropertyFromCloudFormation(properties.SuccessResponseHandlingConfig) : undefined);
    ret.addPropertyResult('writeOperationType', 'WriteOperationType', properties.WriteOperationType != null ? cfn_parse.FromCloudFormation.getString(properties.WriteOperationType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sapodatasourceproperties.html
     */
    export interface SAPODataSourcePropertiesProperty {
        /**
         * `CfnFlow.SAPODataSourcePropertiesProperty.ObjectPath`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sapodatasourceproperties.html#cfn-appflow-flow-sapodatasourceproperties-objectpath
         */
        readonly objectPath: string;
    }
}

/**
 * Determine whether the given properties match those of a `SAPODataSourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `SAPODataSourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_SAPODataSourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('objectPath', cdk.requiredValidator)(properties.objectPath));
    errors.collect(cdk.propertyValidator('objectPath', cdk.validateString)(properties.objectPath));
    return errors.wrap('supplied properties not correct for "SAPODataSourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SAPODataSourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `SAPODataSourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SAPODataSourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowSAPODataSourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_SAPODataSourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        ObjectPath: cdk.stringToCloudFormation(properties.objectPath),
    };
}

// @ts-ignore TS6133
function CfnFlowSAPODataSourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.SAPODataSourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.SAPODataSourcePropertiesProperty>();
    ret.addPropertyResult('objectPath', 'ObjectPath', cfn_parse.FromCloudFormation.getString(properties.ObjectPath));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Salesforce is being used as a destination.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-salesforcedestinationproperties.html
     */
    export interface SalesforceDestinationPropertiesProperty {
        /**
         * The settings that determine how Amazon AppFlow handles an error when placing data in the Salesforce destination. For example, this setting would determine if the flow should fail after one insertion error, or continue and attempt to insert every record regardless of the initial failure. `ErrorHandlingConfig` is a part of the destination connector details.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-salesforcedestinationproperties.html#cfn-appflow-flow-salesforcedestinationproperties-errorhandlingconfig
         */
        readonly errorHandlingConfig?: CfnFlow.ErrorHandlingConfigProperty | cdk.IResolvable;
        /**
         * The name of the field that Amazon AppFlow uses as an ID when performing a write operation such as update or delete.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-salesforcedestinationproperties.html#cfn-appflow-flow-salesforcedestinationproperties-idfieldnames
         */
        readonly idFieldNames?: string[];
        /**
         * The object specified in the Salesforce flow destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-salesforcedestinationproperties.html#cfn-appflow-flow-salesforcedestinationproperties-object
         */
        readonly object: string;
        /**
         * This specifies the type of write operation to be performed in Salesforce. When the value is `UPSERT` , then `idFieldNames` is required.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-salesforcedestinationproperties.html#cfn-appflow-flow-salesforcedestinationproperties-writeoperationtype
         */
        readonly writeOperationType?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SalesforceDestinationPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `SalesforceDestinationPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_SalesforceDestinationPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('errorHandlingConfig', CfnFlow_ErrorHandlingConfigPropertyValidator)(properties.errorHandlingConfig));
    errors.collect(cdk.propertyValidator('idFieldNames', cdk.listValidator(cdk.validateString))(properties.idFieldNames));
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    errors.collect(cdk.propertyValidator('writeOperationType', cdk.validateString)(properties.writeOperationType));
    return errors.wrap('supplied properties not correct for "SalesforceDestinationPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SalesforceDestinationProperties` resource
 *
 * @param properties - the TypeScript properties of a `SalesforceDestinationPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SalesforceDestinationProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowSalesforceDestinationPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_SalesforceDestinationPropertiesPropertyValidator(properties).assertSuccess();
    return {
        ErrorHandlingConfig: cfnFlowErrorHandlingConfigPropertyToCloudFormation(properties.errorHandlingConfig),
        IdFieldNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.idFieldNames),
        Object: cdk.stringToCloudFormation(properties.object),
        WriteOperationType: cdk.stringToCloudFormation(properties.writeOperationType),
    };
}

// @ts-ignore TS6133
function CfnFlowSalesforceDestinationPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.SalesforceDestinationPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.SalesforceDestinationPropertiesProperty>();
    ret.addPropertyResult('errorHandlingConfig', 'ErrorHandlingConfig', properties.ErrorHandlingConfig != null ? CfnFlowErrorHandlingConfigPropertyFromCloudFormation(properties.ErrorHandlingConfig) : undefined);
    ret.addPropertyResult('idFieldNames', 'IdFieldNames', properties.IdFieldNames != null ? cfn_parse.FromCloudFormation.getStringArray(properties.IdFieldNames) : undefined);
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addPropertyResult('writeOperationType', 'WriteOperationType', properties.WriteOperationType != null ? cfn_parse.FromCloudFormation.getString(properties.WriteOperationType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Salesforce is being used as a source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-salesforcesourceproperties.html
     */
    export interface SalesforceSourcePropertiesProperty {
        /**
         * The flag that enables dynamic fetching of new (recently added) fields in the Salesforce objects while running a flow.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-salesforcesourceproperties.html#cfn-appflow-flow-salesforcesourceproperties-enabledynamicfieldupdate
         */
        readonly enableDynamicFieldUpdate?: boolean | cdk.IResolvable;
        /**
         * Indicates whether Amazon AppFlow includes deleted files in the flow run.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-salesforcesourceproperties.html#cfn-appflow-flow-salesforcesourceproperties-includedeletedrecords
         */
        readonly includeDeletedRecords?: boolean | cdk.IResolvable;
        /**
         * The object specified in the Salesforce flow source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-salesforcesourceproperties.html#cfn-appflow-flow-salesforcesourceproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `SalesforceSourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `SalesforceSourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_SalesforceSourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enableDynamicFieldUpdate', cdk.validateBoolean)(properties.enableDynamicFieldUpdate));
    errors.collect(cdk.propertyValidator('includeDeletedRecords', cdk.validateBoolean)(properties.includeDeletedRecords));
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "SalesforceSourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SalesforceSourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `SalesforceSourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SalesforceSourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowSalesforceSourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_SalesforceSourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        EnableDynamicFieldUpdate: cdk.booleanToCloudFormation(properties.enableDynamicFieldUpdate),
        IncludeDeletedRecords: cdk.booleanToCloudFormation(properties.includeDeletedRecords),
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowSalesforceSourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.SalesforceSourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.SalesforceSourcePropertiesProperty>();
    ret.addPropertyResult('enableDynamicFieldUpdate', 'EnableDynamicFieldUpdate', properties.EnableDynamicFieldUpdate != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableDynamicFieldUpdate) : undefined);
    ret.addPropertyResult('includeDeletedRecords', 'IncludeDeletedRecords', properties.IncludeDeletedRecords != null ? cfn_parse.FromCloudFormation.getBoolean(properties.IncludeDeletedRecords) : undefined);
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * Specifies the configuration details of a schedule-triggered flow as defined by the user. Currently, these settings only apply to the `Scheduled` trigger type.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-scheduledtriggerproperties.html
     */
    export interface ScheduledTriggerPropertiesProperty {
        /**
         * Specifies whether a scheduled flow has an incremental data transfer or a complete data transfer for each flow run.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-scheduledtriggerproperties.html#cfn-appflow-flow-scheduledtriggerproperties-datapullmode
         */
        readonly dataPullMode?: string;
        /**
         * Specifies the scheduled end time for a schedule-triggered flow.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-scheduledtriggerproperties.html#cfn-appflow-flow-scheduledtriggerproperties-scheduleendtime
         */
        readonly scheduleEndTime?: number;
        /**
         * The scheduling expression that determines the rate at which the scheduled flow will run, for example: `rate(5minutes)` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-scheduledtriggerproperties.html#cfn-appflow-flow-scheduledtriggerproperties-scheduleexpression
         */
        readonly scheduleExpression: string;
        /**
         * Specifies the optional offset that is added to the time interval for a schedule-triggered flow.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-scheduledtriggerproperties.html#cfn-appflow-flow-scheduledtriggerproperties-scheduleoffset
         */
        readonly scheduleOffset?: number;
        /**
         * Specifies the scheduled start time for a schedule-triggered flow.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-scheduledtriggerproperties.html#cfn-appflow-flow-scheduledtriggerproperties-schedulestarttime
         */
        readonly scheduleStartTime?: number;
        /**
         * Specifies the time zone used when referring to the date and time of a scheduled-triggered flow, such as `America/New_York` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-scheduledtriggerproperties.html#cfn-appflow-flow-scheduledtriggerproperties-timezone
         */
        readonly timeZone?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ScheduledTriggerPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `ScheduledTriggerPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_ScheduledTriggerPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataPullMode', cdk.validateString)(properties.dataPullMode));
    errors.collect(cdk.propertyValidator('scheduleEndTime', cdk.validateNumber)(properties.scheduleEndTime));
    errors.collect(cdk.propertyValidator('scheduleExpression', cdk.requiredValidator)(properties.scheduleExpression));
    errors.collect(cdk.propertyValidator('scheduleExpression', cdk.validateString)(properties.scheduleExpression));
    errors.collect(cdk.propertyValidator('scheduleOffset', cdk.validateNumber)(properties.scheduleOffset));
    errors.collect(cdk.propertyValidator('scheduleStartTime', cdk.validateNumber)(properties.scheduleStartTime));
    errors.collect(cdk.propertyValidator('timeZone', cdk.validateString)(properties.timeZone));
    return errors.wrap('supplied properties not correct for "ScheduledTriggerPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.ScheduledTriggerProperties` resource
 *
 * @param properties - the TypeScript properties of a `ScheduledTriggerPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.ScheduledTriggerProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowScheduledTriggerPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_ScheduledTriggerPropertiesPropertyValidator(properties).assertSuccess();
    return {
        DataPullMode: cdk.stringToCloudFormation(properties.dataPullMode),
        ScheduleEndTime: cdk.numberToCloudFormation(properties.scheduleEndTime),
        ScheduleExpression: cdk.stringToCloudFormation(properties.scheduleExpression),
        ScheduleOffset: cdk.numberToCloudFormation(properties.scheduleOffset),
        ScheduleStartTime: cdk.numberToCloudFormation(properties.scheduleStartTime),
        TimeZone: cdk.stringToCloudFormation(properties.timeZone),
    };
}

// @ts-ignore TS6133
function CfnFlowScheduledTriggerPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.ScheduledTriggerPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.ScheduledTriggerPropertiesProperty>();
    ret.addPropertyResult('dataPullMode', 'DataPullMode', properties.DataPullMode != null ? cfn_parse.FromCloudFormation.getString(properties.DataPullMode) : undefined);
    ret.addPropertyResult('scheduleEndTime', 'ScheduleEndTime', properties.ScheduleEndTime != null ? cfn_parse.FromCloudFormation.getNumber(properties.ScheduleEndTime) : undefined);
    ret.addPropertyResult('scheduleExpression', 'ScheduleExpression', cfn_parse.FromCloudFormation.getString(properties.ScheduleExpression));
    ret.addPropertyResult('scheduleOffset', 'ScheduleOffset', properties.ScheduleOffset != null ? cfn_parse.FromCloudFormation.getNumber(properties.ScheduleOffset) : undefined);
    ret.addPropertyResult('scheduleStartTime', 'ScheduleStartTime', properties.ScheduleStartTime != null ? cfn_parse.FromCloudFormation.getNumber(properties.ScheduleStartTime) : undefined);
    ret.addPropertyResult('timeZone', 'TimeZone', properties.TimeZone != null ? cfn_parse.FromCloudFormation.getString(properties.TimeZone) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when ServiceNow is being used as a source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-servicenowsourceproperties.html
     */
    export interface ServiceNowSourcePropertiesProperty {
        /**
         * The object specified in the ServiceNow flow source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-servicenowsourceproperties.html#cfn-appflow-flow-servicenowsourceproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `ServiceNowSourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `ServiceNowSourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_ServiceNowSourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "ServiceNowSourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.ServiceNowSourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `ServiceNowSourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.ServiceNowSourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowServiceNowSourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_ServiceNowSourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowServiceNowSourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.ServiceNowSourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.ServiceNowSourcePropertiesProperty>();
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Singular is being used as a source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-singularsourceproperties.html
     */
    export interface SingularSourcePropertiesProperty {
        /**
         * The object specified in the Singular flow source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-singularsourceproperties.html#cfn-appflow-flow-singularsourceproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `SingularSourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `SingularSourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_SingularSourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "SingularSourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SingularSourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `SingularSourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SingularSourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowSingularSourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_SingularSourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowSingularSourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.SingularSourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.SingularSourcePropertiesProperty>();
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Slack is being used as a source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-slacksourceproperties.html
     */
    export interface SlackSourcePropertiesProperty {
        /**
         * The object specified in the Slack flow source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-slacksourceproperties.html#cfn-appflow-flow-slacksourceproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `SlackSourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `SlackSourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_SlackSourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "SlackSourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SlackSourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `SlackSourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SlackSourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowSlackSourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_SlackSourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowSlackSourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.SlackSourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.SlackSourcePropertiesProperty>();
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Snowflake is being used as a destination.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-snowflakedestinationproperties.html
     */
    export interface SnowflakeDestinationPropertiesProperty {
        /**
         * The object key for the destination bucket in which Amazon AppFlow places the files.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-snowflakedestinationproperties.html#cfn-appflow-flow-snowflakedestinationproperties-bucketprefix
         */
        readonly bucketPrefix?: string;
        /**
         * The settings that determine how Amazon AppFlow handles an error when placing data in the Snowflake destination. For example, this setting would determine if the flow should fail after one insertion error, or continue and attempt to insert every record regardless of the initial failure. `ErrorHandlingConfig` is a part of the destination connector details.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-snowflakedestinationproperties.html#cfn-appflow-flow-snowflakedestinationproperties-errorhandlingconfig
         */
        readonly errorHandlingConfig?: CfnFlow.ErrorHandlingConfigProperty | cdk.IResolvable;
        /**
         * The intermediate bucket that Amazon AppFlow uses when moving data into Snowflake.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-snowflakedestinationproperties.html#cfn-appflow-flow-snowflakedestinationproperties-intermediatebucketname
         */
        readonly intermediateBucketName: string;
        /**
         * The object specified in the Snowflake flow destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-snowflakedestinationproperties.html#cfn-appflow-flow-snowflakedestinationproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `SnowflakeDestinationPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `SnowflakeDestinationPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_SnowflakeDestinationPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketPrefix', cdk.validateString)(properties.bucketPrefix));
    errors.collect(cdk.propertyValidator('errorHandlingConfig', CfnFlow_ErrorHandlingConfigPropertyValidator)(properties.errorHandlingConfig));
    errors.collect(cdk.propertyValidator('intermediateBucketName', cdk.requiredValidator)(properties.intermediateBucketName));
    errors.collect(cdk.propertyValidator('intermediateBucketName', cdk.validateString)(properties.intermediateBucketName));
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "SnowflakeDestinationPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SnowflakeDestinationProperties` resource
 *
 * @param properties - the TypeScript properties of a `SnowflakeDestinationPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SnowflakeDestinationProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowSnowflakeDestinationPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_SnowflakeDestinationPropertiesPropertyValidator(properties).assertSuccess();
    return {
        BucketPrefix: cdk.stringToCloudFormation(properties.bucketPrefix),
        ErrorHandlingConfig: cfnFlowErrorHandlingConfigPropertyToCloudFormation(properties.errorHandlingConfig),
        IntermediateBucketName: cdk.stringToCloudFormation(properties.intermediateBucketName),
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowSnowflakeDestinationPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.SnowflakeDestinationPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.SnowflakeDestinationPropertiesProperty>();
    ret.addPropertyResult('bucketPrefix', 'BucketPrefix', properties.BucketPrefix != null ? cfn_parse.FromCloudFormation.getString(properties.BucketPrefix) : undefined);
    ret.addPropertyResult('errorHandlingConfig', 'ErrorHandlingConfig', properties.ErrorHandlingConfig != null ? CfnFlowErrorHandlingConfigPropertyFromCloudFormation(properties.ErrorHandlingConfig) : undefined);
    ret.addPropertyResult('intermediateBucketName', 'IntermediateBucketName', cfn_parse.FromCloudFormation.getString(properties.IntermediateBucketName));
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * Specifies the information that is required to query a particular connector.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html
     */
    export interface SourceConnectorPropertiesProperty {
        /**
         * Specifies the information that is required for querying Amplitude.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-amplitude
         */
        readonly amplitude?: CfnFlow.AmplitudeSourcePropertiesProperty | cdk.IResolvable;
        /**
         * Specifies the information that is required for querying Datadog.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-datadog
         */
        readonly datadog?: CfnFlow.DatadogSourcePropertiesProperty | cdk.IResolvable;
        /**
         * Specifies the information that is required for querying Dynatrace.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-dynatrace
         */
        readonly dynatrace?: CfnFlow.DynatraceSourcePropertiesProperty | cdk.IResolvable;
        /**
         * Specifies the information that is required for querying Google Analytics.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-googleanalytics
         */
        readonly googleAnalytics?: CfnFlow.GoogleAnalyticsSourcePropertiesProperty | cdk.IResolvable;
        /**
         * Specifies the information that is required for querying Infor Nexus.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-infornexus
         */
        readonly inforNexus?: CfnFlow.InforNexusSourcePropertiesProperty | cdk.IResolvable;
        /**
         * Specifies the information that is required for querying Marketo.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-marketo
         */
        readonly marketo?: CfnFlow.MarketoSourcePropertiesProperty | cdk.IResolvable;
        /**
         * Specifies the information that is required for querying Amazon S3.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-s3
         */
        readonly s3?: CfnFlow.S3SourcePropertiesProperty | cdk.IResolvable;
        /**
         * `CfnFlow.SourceConnectorPropertiesProperty.SAPOData`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-sapodata
         */
        readonly sapoData?: CfnFlow.SAPODataSourcePropertiesProperty | cdk.IResolvable;
        /**
         * Specifies the information that is required for querying Salesforce.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-salesforce
         */
        readonly salesforce?: CfnFlow.SalesforceSourcePropertiesProperty | cdk.IResolvable;
        /**
         * Specifies the information that is required for querying ServiceNow.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-servicenow
         */
        readonly serviceNow?: CfnFlow.ServiceNowSourcePropertiesProperty | cdk.IResolvable;
        /**
         * Specifies the information that is required for querying Singular.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-singular
         */
        readonly singular?: CfnFlow.SingularSourcePropertiesProperty | cdk.IResolvable;
        /**
         * Specifies the information that is required for querying Slack.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-slack
         */
        readonly slack?: CfnFlow.SlackSourcePropertiesProperty | cdk.IResolvable;
        /**
         * Specifies the information that is required for querying Trend Micro.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-trendmicro
         */
        readonly trendmicro?: CfnFlow.TrendmicroSourcePropertiesProperty | cdk.IResolvable;
        /**
         * Specifies the information that is required for querying Veeva.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-veeva
         */
        readonly veeva?: CfnFlow.VeevaSourcePropertiesProperty | cdk.IResolvable;
        /**
         * Specifies the information that is required for querying Zendesk.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceconnectorproperties.html#cfn-appflow-flow-sourceconnectorproperties-zendesk
         */
        readonly zendesk?: CfnFlow.ZendeskSourcePropertiesProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SourceConnectorPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `SourceConnectorPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_SourceConnectorPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('amplitude', CfnFlow_AmplitudeSourcePropertiesPropertyValidator)(properties.amplitude));
    errors.collect(cdk.propertyValidator('datadog', CfnFlow_DatadogSourcePropertiesPropertyValidator)(properties.datadog));
    errors.collect(cdk.propertyValidator('dynatrace', CfnFlow_DynatraceSourcePropertiesPropertyValidator)(properties.dynatrace));
    errors.collect(cdk.propertyValidator('googleAnalytics', CfnFlow_GoogleAnalyticsSourcePropertiesPropertyValidator)(properties.googleAnalytics));
    errors.collect(cdk.propertyValidator('inforNexus', CfnFlow_InforNexusSourcePropertiesPropertyValidator)(properties.inforNexus));
    errors.collect(cdk.propertyValidator('marketo', CfnFlow_MarketoSourcePropertiesPropertyValidator)(properties.marketo));
    errors.collect(cdk.propertyValidator('s3', CfnFlow_S3SourcePropertiesPropertyValidator)(properties.s3));
    errors.collect(cdk.propertyValidator('sapoData', CfnFlow_SAPODataSourcePropertiesPropertyValidator)(properties.sapoData));
    errors.collect(cdk.propertyValidator('salesforce', CfnFlow_SalesforceSourcePropertiesPropertyValidator)(properties.salesforce));
    errors.collect(cdk.propertyValidator('serviceNow', CfnFlow_ServiceNowSourcePropertiesPropertyValidator)(properties.serviceNow));
    errors.collect(cdk.propertyValidator('singular', CfnFlow_SingularSourcePropertiesPropertyValidator)(properties.singular));
    errors.collect(cdk.propertyValidator('slack', CfnFlow_SlackSourcePropertiesPropertyValidator)(properties.slack));
    errors.collect(cdk.propertyValidator('trendmicro', CfnFlow_TrendmicroSourcePropertiesPropertyValidator)(properties.trendmicro));
    errors.collect(cdk.propertyValidator('veeva', CfnFlow_VeevaSourcePropertiesPropertyValidator)(properties.veeva));
    errors.collect(cdk.propertyValidator('zendesk', CfnFlow_ZendeskSourcePropertiesPropertyValidator)(properties.zendesk));
    return errors.wrap('supplied properties not correct for "SourceConnectorPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SourceConnectorProperties` resource
 *
 * @param properties - the TypeScript properties of a `SourceConnectorPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SourceConnectorProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowSourceConnectorPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_SourceConnectorPropertiesPropertyValidator(properties).assertSuccess();
    return {
        Amplitude: cfnFlowAmplitudeSourcePropertiesPropertyToCloudFormation(properties.amplitude),
        Datadog: cfnFlowDatadogSourcePropertiesPropertyToCloudFormation(properties.datadog),
        Dynatrace: cfnFlowDynatraceSourcePropertiesPropertyToCloudFormation(properties.dynatrace),
        GoogleAnalytics: cfnFlowGoogleAnalyticsSourcePropertiesPropertyToCloudFormation(properties.googleAnalytics),
        InforNexus: cfnFlowInforNexusSourcePropertiesPropertyToCloudFormation(properties.inforNexus),
        Marketo: cfnFlowMarketoSourcePropertiesPropertyToCloudFormation(properties.marketo),
        S3: cfnFlowS3SourcePropertiesPropertyToCloudFormation(properties.s3),
        SAPOData: cfnFlowSAPODataSourcePropertiesPropertyToCloudFormation(properties.sapoData),
        Salesforce: cfnFlowSalesforceSourcePropertiesPropertyToCloudFormation(properties.salesforce),
        ServiceNow: cfnFlowServiceNowSourcePropertiesPropertyToCloudFormation(properties.serviceNow),
        Singular: cfnFlowSingularSourcePropertiesPropertyToCloudFormation(properties.singular),
        Slack: cfnFlowSlackSourcePropertiesPropertyToCloudFormation(properties.slack),
        Trendmicro: cfnFlowTrendmicroSourcePropertiesPropertyToCloudFormation(properties.trendmicro),
        Veeva: cfnFlowVeevaSourcePropertiesPropertyToCloudFormation(properties.veeva),
        Zendesk: cfnFlowZendeskSourcePropertiesPropertyToCloudFormation(properties.zendesk),
    };
}

// @ts-ignore TS6133
function CfnFlowSourceConnectorPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.SourceConnectorPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.SourceConnectorPropertiesProperty>();
    ret.addPropertyResult('amplitude', 'Amplitude', properties.Amplitude != null ? CfnFlowAmplitudeSourcePropertiesPropertyFromCloudFormation(properties.Amplitude) : undefined);
    ret.addPropertyResult('datadog', 'Datadog', properties.Datadog != null ? CfnFlowDatadogSourcePropertiesPropertyFromCloudFormation(properties.Datadog) : undefined);
    ret.addPropertyResult('dynatrace', 'Dynatrace', properties.Dynatrace != null ? CfnFlowDynatraceSourcePropertiesPropertyFromCloudFormation(properties.Dynatrace) : undefined);
    ret.addPropertyResult('googleAnalytics', 'GoogleAnalytics', properties.GoogleAnalytics != null ? CfnFlowGoogleAnalyticsSourcePropertiesPropertyFromCloudFormation(properties.GoogleAnalytics) : undefined);
    ret.addPropertyResult('inforNexus', 'InforNexus', properties.InforNexus != null ? CfnFlowInforNexusSourcePropertiesPropertyFromCloudFormation(properties.InforNexus) : undefined);
    ret.addPropertyResult('marketo', 'Marketo', properties.Marketo != null ? CfnFlowMarketoSourcePropertiesPropertyFromCloudFormation(properties.Marketo) : undefined);
    ret.addPropertyResult('s3', 'S3', properties.S3 != null ? CfnFlowS3SourcePropertiesPropertyFromCloudFormation(properties.S3) : undefined);
    ret.addPropertyResult('sapoData', 'SAPOData', properties.SAPOData != null ? CfnFlowSAPODataSourcePropertiesPropertyFromCloudFormation(properties.SAPOData) : undefined);
    ret.addPropertyResult('salesforce', 'Salesforce', properties.Salesforce != null ? CfnFlowSalesforceSourcePropertiesPropertyFromCloudFormation(properties.Salesforce) : undefined);
    ret.addPropertyResult('serviceNow', 'ServiceNow', properties.ServiceNow != null ? CfnFlowServiceNowSourcePropertiesPropertyFromCloudFormation(properties.ServiceNow) : undefined);
    ret.addPropertyResult('singular', 'Singular', properties.Singular != null ? CfnFlowSingularSourcePropertiesPropertyFromCloudFormation(properties.Singular) : undefined);
    ret.addPropertyResult('slack', 'Slack', properties.Slack != null ? CfnFlowSlackSourcePropertiesPropertyFromCloudFormation(properties.Slack) : undefined);
    ret.addPropertyResult('trendmicro', 'Trendmicro', properties.Trendmicro != null ? CfnFlowTrendmicroSourcePropertiesPropertyFromCloudFormation(properties.Trendmicro) : undefined);
    ret.addPropertyResult('veeva', 'Veeva', properties.Veeva != null ? CfnFlowVeevaSourcePropertiesPropertyFromCloudFormation(properties.Veeva) : undefined);
    ret.addPropertyResult('zendesk', 'Zendesk', properties.Zendesk != null ? CfnFlowZendeskSourcePropertiesPropertyFromCloudFormation(properties.Zendesk) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * Contains information about the configuration of the source connector used in the flow.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceflowconfig.html
     */
    export interface SourceFlowConfigProperty {
        /**
         * The name of the connector profile. This name must be unique for each connector profile in the AWS account .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceflowconfig.html#cfn-appflow-flow-sourceflowconfig-connectorprofilename
         */
        readonly connectorProfileName?: string;
        /**
         * The type of source connector, such as Salesforce, Amplitude, and so on.
         *
         * *Allowed Values* : S3 | Amplitude | Datadog | Dynatrace | Googleanalytics | Infornexus | Salesforce | Servicenow | Singular | Slack | Trendmicro | Veeva | Zendesk
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceflowconfig.html#cfn-appflow-flow-sourceflowconfig-connectortype
         */
        readonly connectorType: string;
        /**
         * Defines the configuration for a scheduled incremental data pull. If a valid configuration is provided, the fields specified in the configuration are used when querying for the incremental data pull.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceflowconfig.html#cfn-appflow-flow-sourceflowconfig-incrementalpullconfig
         */
        readonly incrementalPullConfig?: CfnFlow.IncrementalPullConfigProperty | cdk.IResolvable;
        /**
         * Specifies the information that is required to query a particular source connector.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-sourceflowconfig.html#cfn-appflow-flow-sourceflowconfig-sourceconnectorproperties
         */
        readonly sourceConnectorProperties: CfnFlow.SourceConnectorPropertiesProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SourceFlowConfigProperty`
 *
 * @param properties - the TypeScript properties of a `SourceFlowConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_SourceFlowConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('connectorProfileName', cdk.validateString)(properties.connectorProfileName));
    errors.collect(cdk.propertyValidator('connectorType', cdk.requiredValidator)(properties.connectorType));
    errors.collect(cdk.propertyValidator('connectorType', cdk.validateString)(properties.connectorType));
    errors.collect(cdk.propertyValidator('incrementalPullConfig', CfnFlow_IncrementalPullConfigPropertyValidator)(properties.incrementalPullConfig));
    errors.collect(cdk.propertyValidator('sourceConnectorProperties', cdk.requiredValidator)(properties.sourceConnectorProperties));
    errors.collect(cdk.propertyValidator('sourceConnectorProperties', CfnFlow_SourceConnectorPropertiesPropertyValidator)(properties.sourceConnectorProperties));
    return errors.wrap('supplied properties not correct for "SourceFlowConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SourceFlowConfig` resource
 *
 * @param properties - the TypeScript properties of a `SourceFlowConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SourceFlowConfig` resource.
 */
// @ts-ignore TS6133
function cfnFlowSourceFlowConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_SourceFlowConfigPropertyValidator(properties).assertSuccess();
    return {
        ConnectorProfileName: cdk.stringToCloudFormation(properties.connectorProfileName),
        ConnectorType: cdk.stringToCloudFormation(properties.connectorType),
        IncrementalPullConfig: cfnFlowIncrementalPullConfigPropertyToCloudFormation(properties.incrementalPullConfig),
        SourceConnectorProperties: cfnFlowSourceConnectorPropertiesPropertyToCloudFormation(properties.sourceConnectorProperties),
    };
}

// @ts-ignore TS6133
function CfnFlowSourceFlowConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.SourceFlowConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.SourceFlowConfigProperty>();
    ret.addPropertyResult('connectorProfileName', 'ConnectorProfileName', properties.ConnectorProfileName != null ? cfn_parse.FromCloudFormation.getString(properties.ConnectorProfileName) : undefined);
    ret.addPropertyResult('connectorType', 'ConnectorType', cfn_parse.FromCloudFormation.getString(properties.ConnectorType));
    ret.addPropertyResult('incrementalPullConfig', 'IncrementalPullConfig', properties.IncrementalPullConfig != null ? CfnFlowIncrementalPullConfigPropertyFromCloudFormation(properties.IncrementalPullConfig) : undefined);
    ret.addPropertyResult('sourceConnectorProperties', 'SourceConnectorProperties', CfnFlowSourceConnectorPropertiesPropertyFromCloudFormation(properties.SourceConnectorProperties));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * Determines how Amazon AppFlow handles the success response that it gets from the connector after placing data.
     *
     * For example, this setting would determine where to write the response from the destination connector upon a successful insert operation.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-successresponsehandlingconfig.html
     */
    export interface SuccessResponseHandlingConfigProperty {
        /**
         * The name of the Amazon S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-successresponsehandlingconfig.html#cfn-appflow-flow-successresponsehandlingconfig-bucketname
         */
        readonly bucketName?: string;
        /**
         * The Amazon S3 bucket prefix.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-successresponsehandlingconfig.html#cfn-appflow-flow-successresponsehandlingconfig-bucketprefix
         */
        readonly bucketPrefix?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SuccessResponseHandlingConfigProperty`
 *
 * @param properties - the TypeScript properties of a `SuccessResponseHandlingConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_SuccessResponseHandlingConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketName', cdk.validateString)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketPrefix', cdk.validateString)(properties.bucketPrefix));
    return errors.wrap('supplied properties not correct for "SuccessResponseHandlingConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SuccessResponseHandlingConfig` resource
 *
 * @param properties - the TypeScript properties of a `SuccessResponseHandlingConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.SuccessResponseHandlingConfig` resource.
 */
// @ts-ignore TS6133
function cfnFlowSuccessResponseHandlingConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_SuccessResponseHandlingConfigPropertyValidator(properties).assertSuccess();
    return {
        BucketName: cdk.stringToCloudFormation(properties.bucketName),
        BucketPrefix: cdk.stringToCloudFormation(properties.bucketPrefix),
    };
}

// @ts-ignore TS6133
function CfnFlowSuccessResponseHandlingConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.SuccessResponseHandlingConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.SuccessResponseHandlingConfigProperty>();
    ret.addPropertyResult('bucketName', 'BucketName', properties.BucketName != null ? cfn_parse.FromCloudFormation.getString(properties.BucketName) : undefined);
    ret.addPropertyResult('bucketPrefix', 'BucketPrefix', properties.BucketPrefix != null ? cfn_parse.FromCloudFormation.getString(properties.BucketPrefix) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The `Task` property type specifies the class for modeling different type of tasks. Task implementation varies based on the `TaskType` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-task.html
     */
    export interface TaskProperty {
        /**
         * The operation to be performed on the provided source fields.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-task.html#cfn-appflow-flow-task-connectoroperator
         */
        readonly connectorOperator?: CfnFlow.ConnectorOperatorProperty | cdk.IResolvable;
        /**
         * A field in a destination connector, or a field value against which Amazon AppFlow validates a source field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-task.html#cfn-appflow-flow-task-destinationfield
         */
        readonly destinationField?: string;
        /**
         * The source fields to which a particular task is applied.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-task.html#cfn-appflow-flow-task-sourcefields
         */
        readonly sourceFields: string[];
        /**
         * A map used to store task-related information. The execution service looks for particular information based on the `TaskType` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-task.html#cfn-appflow-flow-task-taskproperties
         */
        readonly taskProperties?: Array<CfnFlow.TaskPropertiesObjectProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * Specifies the particular task implementation that Amazon AppFlow performs.
         *
         * *Allowed values* : `Arithmetic` | `Filter` | `Map` | `Map_all` | `Mask` | `Merge` | `Truncate` | `Validate`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-task.html#cfn-appflow-flow-task-tasktype
         */
        readonly taskType: string;
    }
}

/**
 * Determine whether the given properties match those of a `TaskProperty`
 *
 * @param properties - the TypeScript properties of a `TaskProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_TaskPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('connectorOperator', CfnFlow_ConnectorOperatorPropertyValidator)(properties.connectorOperator));
    errors.collect(cdk.propertyValidator('destinationField', cdk.validateString)(properties.destinationField));
    errors.collect(cdk.propertyValidator('sourceFields', cdk.requiredValidator)(properties.sourceFields));
    errors.collect(cdk.propertyValidator('sourceFields', cdk.listValidator(cdk.validateString))(properties.sourceFields));
    errors.collect(cdk.propertyValidator('taskProperties', cdk.listValidator(CfnFlow_TaskPropertiesObjectPropertyValidator))(properties.taskProperties));
    errors.collect(cdk.propertyValidator('taskType', cdk.requiredValidator)(properties.taskType));
    errors.collect(cdk.propertyValidator('taskType', cdk.validateString)(properties.taskType));
    return errors.wrap('supplied properties not correct for "TaskProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.Task` resource
 *
 * @param properties - the TypeScript properties of a `TaskProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.Task` resource.
 */
// @ts-ignore TS6133
function cfnFlowTaskPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_TaskPropertyValidator(properties).assertSuccess();
    return {
        ConnectorOperator: cfnFlowConnectorOperatorPropertyToCloudFormation(properties.connectorOperator),
        DestinationField: cdk.stringToCloudFormation(properties.destinationField),
        SourceFields: cdk.listMapper(cdk.stringToCloudFormation)(properties.sourceFields),
        TaskProperties: cdk.listMapper(cfnFlowTaskPropertiesObjectPropertyToCloudFormation)(properties.taskProperties),
        TaskType: cdk.stringToCloudFormation(properties.taskType),
    };
}

// @ts-ignore TS6133
function CfnFlowTaskPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.TaskProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.TaskProperty>();
    ret.addPropertyResult('connectorOperator', 'ConnectorOperator', properties.ConnectorOperator != null ? CfnFlowConnectorOperatorPropertyFromCloudFormation(properties.ConnectorOperator) : undefined);
    ret.addPropertyResult('destinationField', 'DestinationField', properties.DestinationField != null ? cfn_parse.FromCloudFormation.getString(properties.DestinationField) : undefined);
    ret.addPropertyResult('sourceFields', 'SourceFields', cfn_parse.FromCloudFormation.getStringArray(properties.SourceFields));
    ret.addPropertyResult('taskProperties', 'TaskProperties', properties.TaskProperties != null ? cfn_parse.FromCloudFormation.getArray(CfnFlowTaskPropertiesObjectPropertyFromCloudFormation)(properties.TaskProperties) : undefined);
    ret.addPropertyResult('taskType', 'TaskType', cfn_parse.FromCloudFormation.getString(properties.TaskType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * A map used to store task-related information. The execution service looks for particular information based on the `TaskType` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-taskpropertiesobject.html
     */
    export interface TaskPropertiesObjectProperty {
        /**
         * The task property key.
         *
         * *Allowed Values* : `VALUE | VALUES | DATA_TYPE | UPPER_BOUND | LOWER_BOUND | SOURCE_DATA_TYPE | DESTINATION_DATA_TYPE | VALIDATION_ACTION | MASK_VALUE | MASK_LENGTH | TRUNCATE_LENGTH | MATH_OPERATION_FIELDS_ORDER | CONCAT_FORMAT | SUBFIELD_CATEGORY_MAP` | `EXCLUDE_SOURCE_FIELDS_LIST`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-taskpropertiesobject.html#cfn-appflow-flow-taskpropertiesobject-key
         */
        readonly key: string;
        /**
         * The task property value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-taskpropertiesobject.html#cfn-appflow-flow-taskpropertiesobject-value
         */
        readonly value: string;
    }
}

/**
 * Determine whether the given properties match those of a `TaskPropertiesObjectProperty`
 *
 * @param properties - the TypeScript properties of a `TaskPropertiesObjectProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_TaskPropertiesObjectPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('key', cdk.requiredValidator)(properties.key));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "TaskPropertiesObjectProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.TaskPropertiesObject` resource
 *
 * @param properties - the TypeScript properties of a `TaskPropertiesObjectProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.TaskPropertiesObject` resource.
 */
// @ts-ignore TS6133
function cfnFlowTaskPropertiesObjectPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_TaskPropertiesObjectPropertyValidator(properties).assertSuccess();
    return {
        Key: cdk.stringToCloudFormation(properties.key),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnFlowTaskPropertiesObjectPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.TaskPropertiesObjectProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.TaskPropertiesObjectProperty>();
    ret.addPropertyResult('key', 'Key', cfn_parse.FromCloudFormation.getString(properties.Key));
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when using Trend Micro as a flow source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-trendmicrosourceproperties.html
     */
    export interface TrendmicroSourcePropertiesProperty {
        /**
         * The object specified in the Trend Micro flow source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-trendmicrosourceproperties.html#cfn-appflow-flow-trendmicrosourceproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `TrendmicroSourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `TrendmicroSourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_TrendmicroSourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "TrendmicroSourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.TrendmicroSourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `TrendmicroSourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.TrendmicroSourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowTrendmicroSourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_TrendmicroSourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowTrendmicroSourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.TrendmicroSourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.TrendmicroSourcePropertiesProperty>();
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The trigger settings that determine how and when Amazon AppFlow runs the specified flow.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-triggerconfig.html
     */
    export interface TriggerConfigProperty {
        /**
         * Specifies the configuration details of a schedule-triggered flow as defined by the user. Currently, these settings only apply to the `Scheduled` trigger type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-triggerconfig.html#cfn-appflow-flow-triggerconfig-triggerproperties
         */
        readonly triggerProperties?: CfnFlow.ScheduledTriggerPropertiesProperty | cdk.IResolvable;
        /**
         * Specifies the type of flow trigger. This can be `OnDemand` , `Scheduled` , or `Event` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-triggerconfig.html#cfn-appflow-flow-triggerconfig-triggertype
         */
        readonly triggerType: string;
    }
}

/**
 * Determine whether the given properties match those of a `TriggerConfigProperty`
 *
 * @param properties - the TypeScript properties of a `TriggerConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_TriggerConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('triggerProperties', CfnFlow_ScheduledTriggerPropertiesPropertyValidator)(properties.triggerProperties));
    errors.collect(cdk.propertyValidator('triggerType', cdk.requiredValidator)(properties.triggerType));
    errors.collect(cdk.propertyValidator('triggerType', cdk.validateString)(properties.triggerType));
    return errors.wrap('supplied properties not correct for "TriggerConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.TriggerConfig` resource
 *
 * @param properties - the TypeScript properties of a `TriggerConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.TriggerConfig` resource.
 */
// @ts-ignore TS6133
function cfnFlowTriggerConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_TriggerConfigPropertyValidator(properties).assertSuccess();
    return {
        TriggerProperties: cfnFlowScheduledTriggerPropertiesPropertyToCloudFormation(properties.triggerProperties),
        TriggerType: cdk.stringToCloudFormation(properties.triggerType),
    };
}

// @ts-ignore TS6133
function CfnFlowTriggerConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.TriggerConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.TriggerConfigProperty>();
    ret.addPropertyResult('triggerProperties', 'TriggerProperties', properties.TriggerProperties != null ? CfnFlowScheduledTriggerPropertiesPropertyFromCloudFormation(properties.TriggerProperties) : undefined);
    ret.addPropertyResult('triggerType', 'TriggerType', cfn_parse.FromCloudFormation.getString(properties.TriggerType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when Upsolver is used as a destination.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-upsolverdestinationproperties.html
     */
    export interface UpsolverDestinationPropertiesProperty {
        /**
         * The Upsolver Amazon S3 bucket name in which Amazon AppFlow places the transferred data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-upsolverdestinationproperties.html#cfn-appflow-flow-upsolverdestinationproperties-bucketname
         */
        readonly bucketName: string;
        /**
         * The object key for the destination Upsolver Amazon S3 bucket in which Amazon AppFlow places the files.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-upsolverdestinationproperties.html#cfn-appflow-flow-upsolverdestinationproperties-bucketprefix
         */
        readonly bucketPrefix?: string;
        /**
         * The configuration that determines how data is formatted when Upsolver is used as the flow destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-upsolverdestinationproperties.html#cfn-appflow-flow-upsolverdestinationproperties-s3outputformatconfig
         */
        readonly s3OutputFormatConfig: CfnFlow.UpsolverS3OutputFormatConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `UpsolverDestinationPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `UpsolverDestinationPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_UpsolverDestinationPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketName', cdk.requiredValidator)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketName', cdk.validateString)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketPrefix', cdk.validateString)(properties.bucketPrefix));
    errors.collect(cdk.propertyValidator('s3OutputFormatConfig', cdk.requiredValidator)(properties.s3OutputFormatConfig));
    errors.collect(cdk.propertyValidator('s3OutputFormatConfig', CfnFlow_UpsolverS3OutputFormatConfigPropertyValidator)(properties.s3OutputFormatConfig));
    return errors.wrap('supplied properties not correct for "UpsolverDestinationPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.UpsolverDestinationProperties` resource
 *
 * @param properties - the TypeScript properties of a `UpsolverDestinationPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.UpsolverDestinationProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowUpsolverDestinationPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_UpsolverDestinationPropertiesPropertyValidator(properties).assertSuccess();
    return {
        BucketName: cdk.stringToCloudFormation(properties.bucketName),
        BucketPrefix: cdk.stringToCloudFormation(properties.bucketPrefix),
        S3OutputFormatConfig: cfnFlowUpsolverS3OutputFormatConfigPropertyToCloudFormation(properties.s3OutputFormatConfig),
    };
}

// @ts-ignore TS6133
function CfnFlowUpsolverDestinationPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.UpsolverDestinationPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.UpsolverDestinationPropertiesProperty>();
    ret.addPropertyResult('bucketName', 'BucketName', cfn_parse.FromCloudFormation.getString(properties.BucketName));
    ret.addPropertyResult('bucketPrefix', 'BucketPrefix', properties.BucketPrefix != null ? cfn_parse.FromCloudFormation.getString(properties.BucketPrefix) : undefined);
    ret.addPropertyResult('s3OutputFormatConfig', 'S3OutputFormatConfig', CfnFlowUpsolverS3OutputFormatConfigPropertyFromCloudFormation(properties.S3OutputFormatConfig));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The configuration that determines how Amazon AppFlow formats the flow output data when Upsolver is used as the destination.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-upsolvers3outputformatconfig.html
     */
    export interface UpsolverS3OutputFormatConfigProperty {
        /**
         * The aggregation settings that you can use to customize the output format of your flow data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-upsolvers3outputformatconfig.html#cfn-appflow-flow-upsolvers3outputformatconfig-aggregationconfig
         */
        readonly aggregationConfig?: CfnFlow.AggregationConfigProperty | cdk.IResolvable;
        /**
         * Indicates the file type that Amazon AppFlow places in the Upsolver Amazon S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-upsolvers3outputformatconfig.html#cfn-appflow-flow-upsolvers3outputformatconfig-filetype
         */
        readonly fileType?: string;
        /**
         * Determines the prefix that Amazon AppFlow applies to the destination folder name. You can name your destination folders according to the flow frequency and date.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-upsolvers3outputformatconfig.html#cfn-appflow-flow-upsolvers3outputformatconfig-prefixconfig
         */
        readonly prefixConfig: CfnFlow.PrefixConfigProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `UpsolverS3OutputFormatConfigProperty`
 *
 * @param properties - the TypeScript properties of a `UpsolverS3OutputFormatConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_UpsolverS3OutputFormatConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('aggregationConfig', CfnFlow_AggregationConfigPropertyValidator)(properties.aggregationConfig));
    errors.collect(cdk.propertyValidator('fileType', cdk.validateString)(properties.fileType));
    errors.collect(cdk.propertyValidator('prefixConfig', cdk.requiredValidator)(properties.prefixConfig));
    errors.collect(cdk.propertyValidator('prefixConfig', CfnFlow_PrefixConfigPropertyValidator)(properties.prefixConfig));
    return errors.wrap('supplied properties not correct for "UpsolverS3OutputFormatConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.UpsolverS3OutputFormatConfig` resource
 *
 * @param properties - the TypeScript properties of a `UpsolverS3OutputFormatConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.UpsolverS3OutputFormatConfig` resource.
 */
// @ts-ignore TS6133
function cfnFlowUpsolverS3OutputFormatConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_UpsolverS3OutputFormatConfigPropertyValidator(properties).assertSuccess();
    return {
        AggregationConfig: cfnFlowAggregationConfigPropertyToCloudFormation(properties.aggregationConfig),
        FileType: cdk.stringToCloudFormation(properties.fileType),
        PrefixConfig: cfnFlowPrefixConfigPropertyToCloudFormation(properties.prefixConfig),
    };
}

// @ts-ignore TS6133
function CfnFlowUpsolverS3OutputFormatConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.UpsolverS3OutputFormatConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.UpsolverS3OutputFormatConfigProperty>();
    ret.addPropertyResult('aggregationConfig', 'AggregationConfig', properties.AggregationConfig != null ? CfnFlowAggregationConfigPropertyFromCloudFormation(properties.AggregationConfig) : undefined);
    ret.addPropertyResult('fileType', 'FileType', properties.FileType != null ? cfn_parse.FromCloudFormation.getString(properties.FileType) : undefined);
    ret.addPropertyResult('prefixConfig', 'PrefixConfig', CfnFlowPrefixConfigPropertyFromCloudFormation(properties.PrefixConfig));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when using Veeva as a flow source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-veevasourceproperties.html
     */
    export interface VeevaSourcePropertiesProperty {
        /**
         * `CfnFlow.VeevaSourcePropertiesProperty.DocumentType`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-veevasourceproperties.html#cfn-appflow-flow-veevasourceproperties-documenttype
         */
        readonly documentType?: string;
        /**
         * `CfnFlow.VeevaSourcePropertiesProperty.IncludeAllVersions`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-veevasourceproperties.html#cfn-appflow-flow-veevasourceproperties-includeallversions
         */
        readonly includeAllVersions?: boolean | cdk.IResolvable;
        /**
         * `CfnFlow.VeevaSourcePropertiesProperty.IncludeRenditions`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-veevasourceproperties.html#cfn-appflow-flow-veevasourceproperties-includerenditions
         */
        readonly includeRenditions?: boolean | cdk.IResolvable;
        /**
         * `CfnFlow.VeevaSourcePropertiesProperty.IncludeSourceFiles`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-veevasourceproperties.html#cfn-appflow-flow-veevasourceproperties-includesourcefiles
         */
        readonly includeSourceFiles?: boolean | cdk.IResolvable;
        /**
         * The object specified in the Veeva flow source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-veevasourceproperties.html#cfn-appflow-flow-veevasourceproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `VeevaSourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `VeevaSourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_VeevaSourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('documentType', cdk.validateString)(properties.documentType));
    errors.collect(cdk.propertyValidator('includeAllVersions', cdk.validateBoolean)(properties.includeAllVersions));
    errors.collect(cdk.propertyValidator('includeRenditions', cdk.validateBoolean)(properties.includeRenditions));
    errors.collect(cdk.propertyValidator('includeSourceFiles', cdk.validateBoolean)(properties.includeSourceFiles));
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "VeevaSourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.VeevaSourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `VeevaSourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.VeevaSourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowVeevaSourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_VeevaSourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        DocumentType: cdk.stringToCloudFormation(properties.documentType),
        IncludeAllVersions: cdk.booleanToCloudFormation(properties.includeAllVersions),
        IncludeRenditions: cdk.booleanToCloudFormation(properties.includeRenditions),
        IncludeSourceFiles: cdk.booleanToCloudFormation(properties.includeSourceFiles),
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowVeevaSourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.VeevaSourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.VeevaSourcePropertiesProperty>();
    ret.addPropertyResult('documentType', 'DocumentType', properties.DocumentType != null ? cfn_parse.FromCloudFormation.getString(properties.DocumentType) : undefined);
    ret.addPropertyResult('includeAllVersions', 'IncludeAllVersions', properties.IncludeAllVersions != null ? cfn_parse.FromCloudFormation.getBoolean(properties.IncludeAllVersions) : undefined);
    ret.addPropertyResult('includeRenditions', 'IncludeRenditions', properties.IncludeRenditions != null ? cfn_parse.FromCloudFormation.getBoolean(properties.IncludeRenditions) : undefined);
    ret.addPropertyResult('includeSourceFiles', 'IncludeSourceFiles', properties.IncludeSourceFiles != null ? cfn_parse.FromCloudFormation.getBoolean(properties.IncludeSourceFiles) : undefined);
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-zendeskdestinationproperties.html
     */
    export interface ZendeskDestinationPropertiesProperty {
        /**
         * `CfnFlow.ZendeskDestinationPropertiesProperty.ErrorHandlingConfig`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-zendeskdestinationproperties.html#cfn-appflow-flow-zendeskdestinationproperties-errorhandlingconfig
         */
        readonly errorHandlingConfig?: CfnFlow.ErrorHandlingConfigProperty | cdk.IResolvable;
        /**
         * `CfnFlow.ZendeskDestinationPropertiesProperty.IdFieldNames`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-zendeskdestinationproperties.html#cfn-appflow-flow-zendeskdestinationproperties-idfieldnames
         */
        readonly idFieldNames?: string[];
        /**
         * `CfnFlow.ZendeskDestinationPropertiesProperty.Object`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-zendeskdestinationproperties.html#cfn-appflow-flow-zendeskdestinationproperties-object
         */
        readonly object: string;
        /**
         * `CfnFlow.ZendeskDestinationPropertiesProperty.WriteOperationType`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-zendeskdestinationproperties.html#cfn-appflow-flow-zendeskdestinationproperties-writeoperationtype
         */
        readonly writeOperationType?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ZendeskDestinationPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `ZendeskDestinationPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_ZendeskDestinationPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('errorHandlingConfig', CfnFlow_ErrorHandlingConfigPropertyValidator)(properties.errorHandlingConfig));
    errors.collect(cdk.propertyValidator('idFieldNames', cdk.listValidator(cdk.validateString))(properties.idFieldNames));
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    errors.collect(cdk.propertyValidator('writeOperationType', cdk.validateString)(properties.writeOperationType));
    return errors.wrap('supplied properties not correct for "ZendeskDestinationPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.ZendeskDestinationProperties` resource
 *
 * @param properties - the TypeScript properties of a `ZendeskDestinationPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.ZendeskDestinationProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowZendeskDestinationPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_ZendeskDestinationPropertiesPropertyValidator(properties).assertSuccess();
    return {
        ErrorHandlingConfig: cfnFlowErrorHandlingConfigPropertyToCloudFormation(properties.errorHandlingConfig),
        IdFieldNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.idFieldNames),
        Object: cdk.stringToCloudFormation(properties.object),
        WriteOperationType: cdk.stringToCloudFormation(properties.writeOperationType),
    };
}

// @ts-ignore TS6133
function CfnFlowZendeskDestinationPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.ZendeskDestinationPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.ZendeskDestinationPropertiesProperty>();
    ret.addPropertyResult('errorHandlingConfig', 'ErrorHandlingConfig', properties.ErrorHandlingConfig != null ? CfnFlowErrorHandlingConfigPropertyFromCloudFormation(properties.ErrorHandlingConfig) : undefined);
    ret.addPropertyResult('idFieldNames', 'IdFieldNames', properties.IdFieldNames != null ? cfn_parse.FromCloudFormation.getStringArray(properties.IdFieldNames) : undefined);
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addPropertyResult('writeOperationType', 'WriteOperationType', properties.WriteOperationType != null ? cfn_parse.FromCloudFormation.getString(properties.WriteOperationType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFlow {
    /**
     * The properties that are applied when using Zendesk as a flow source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-zendesksourceproperties.html
     */
    export interface ZendeskSourcePropertiesProperty {
        /**
         * The object specified in the Zendesk flow source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-appflow-flow-zendesksourceproperties.html#cfn-appflow-flow-zendesksourceproperties-object
         */
        readonly object: string;
    }
}

/**
 * Determine whether the given properties match those of a `ZendeskSourcePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `ZendeskSourcePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnFlow_ZendeskSourcePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('object', cdk.requiredValidator)(properties.object));
    errors.collect(cdk.propertyValidator('object', cdk.validateString)(properties.object));
    return errors.wrap('supplied properties not correct for "ZendeskSourcePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppFlow::Flow.ZendeskSourceProperties` resource
 *
 * @param properties - the TypeScript properties of a `ZendeskSourcePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppFlow::Flow.ZendeskSourceProperties` resource.
 */
// @ts-ignore TS6133
function cfnFlowZendeskSourcePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFlow_ZendeskSourcePropertiesPropertyValidator(properties).assertSuccess();
    return {
        Object: cdk.stringToCloudFormation(properties.object),
    };
}

// @ts-ignore TS6133
function CfnFlowZendeskSourcePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFlow.ZendeskSourcePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFlow.ZendeskSourcePropertiesProperty>();
    ret.addPropertyResult('object', 'Object', cfn_parse.FromCloudFormation.getString(properties.Object));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
