// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:10.470Z","fingerprint":"K14qgMS+E0oeSUOw+iOfcwucXRq7OVjRBVE9SgCRg4c="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnServer`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html
 */
export interface CfnServerProps {

    /**
     * The Amazon Resource Name (ARN) of the AWS Certificate Manager (ACM) certificate. Required when `Protocols` is set to `FTPS` .
     *
     * To request a new public certificate, see [Request a public certificate](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) in the *AWS Certificate Manager User Guide* .
     *
     * To import an existing certificate into ACM, see [Importing certificates into ACM](https://docs.aws.amazon.com/acm/latest/userguide/import-certificate.html) in the *AWS Certificate Manager User Guide* .
     *
     * To request a private certificate to use FTPS through private IP addresses, see [Request a private certificate](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-private.html) in the *AWS Certificate Manager User Guide* .
     *
     * Certificates with the following cryptographic algorithms and key sizes are supported:
     *
     * - 2048-bit RSA (RSA_2048)
     * - 4096-bit RSA (RSA_4096)
     * - Elliptic Prime Curve 256 bit (EC_prime256v1)
     * - Elliptic Prime Curve 384 bit (EC_secp384r1)
     * - Elliptic Prime Curve 521 bit (EC_secp521r1)
     *
     * > The certificate must be a valid SSL/TLS X.509 version 3 certificate with FQDN or IP address specified and information about the issuer.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-certificate
     */
    readonly certificate?: string;

    /**
     * Specifies the domain of the storage system that is used for file transfers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-domain
     */
    readonly domain?: string;

    /**
     * The virtual private cloud (VPC) endpoint settings that are configured for your server. When you host your endpoint within your VPC, you can make it accessible only to resources within your VPC, or you can attach Elastic IP addresses and make it accessible to clients over the internet. Your VPC's default security groups are automatically assigned to your endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-endpointdetails
     */
    readonly endpointDetails?: CfnServer.EndpointDetailsProperty | cdk.IResolvable;

    /**
     * The type of endpoint that you want your server to use. You can choose to make your server's endpoint publicly accessible (PUBLIC) or host it inside your VPC. With an endpoint that is hosted in a VPC, you can restrict access to your server and resources only within your VPC or choose to make it internet facing by attaching Elastic IP addresses directly to it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-endpointtype
     */
    readonly endpointType?: string;

    /**
     * Required when `IdentityProviderType` is set to `AWS_DIRECTORY_SERVICE` or `API_GATEWAY` . Accepts an array containing all of the information required to use a directory in `AWS_DIRECTORY_SERVICE` or invoke a customer-supplied authentication API, including the API Gateway URL. Not required when `IdentityProviderType` is set to `SERVICE_MANAGED` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-identityproviderdetails
     */
    readonly identityProviderDetails?: CfnServer.IdentityProviderDetailsProperty | cdk.IResolvable;

    /**
     * Specifies the mode of authentication for a server. The default value is `SERVICE_MANAGED` , which allows you to store and access user credentials within the AWS Transfer Family service.
     *
     * Use `AWS_DIRECTORY_SERVICE` to provide access to Active Directory groups in AWS Managed Active Directory or Microsoft Active Directory in your on-premises environment or in AWS using AD Connectors. This option also requires you to provide a Directory ID using the `IdentityProviderDetails` parameter.
     *
     * Use the `API_GATEWAY` value to integrate with an identity provider of your choosing. The `API_GATEWAY` setting requires you to provide an API Gateway endpoint URL to call for authentication using the `IdentityProviderDetails` parameter.
     *
     * Use the `AWS_LAMBDA` value to directly use a Lambda function as your identity provider. If you choose this value, you must specify the ARN for the lambda function in the `Function` parameter for the `IdentityProviderDetails` data type.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-identityprovidertype
     */
    readonly identityProviderType?: string;

    /**
     * Specifies the Amazon Resource Name (ARN) of the AWS Identity and Access Management (IAM) role that allows a server to turn on Amazon CloudWatch logging for Amazon S3 or Amazon EFS events. When set, user activity can be viewed in your CloudWatch logs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-loggingrole
     */
    readonly loggingRole?: string;

    /**
     * Specify a string to display when users connect to a server. This string is displayed after the user authenticates.
     *
     * > The SFTP protocol does not support post-authentication display banners.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-postauthenticationloginbanner
     */
    readonly postAuthenticationLoginBanner?: string;

    /**
     * Specify a string to display when users connect to a server. This string is displayed before the user authenticates. For example, the following banner displays details about using the system.
     *
     * `This system is for the use of authorized users only. Individuals using this computer system without authority, or in excess of their authority, are subject to having all of their activities on this system monitored and recorded by system personnel.`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-preauthenticationloginbanner
     */
    readonly preAuthenticationLoginBanner?: string;

    /**
     * The protocol settings that are configured for your server.
     *
     * Use the `PassiveIp` parameter to indicate passive mode (for FTP and FTPS protocols). Enter a single dotted-quad IPv4 address, such as the external IP address of a firewall, router, or load balancer.
     *
     * Use the `TlsSessionResumptionMode` parameter to determine whether or not your Transfer server resumes recent, negotiated sessions through a unique session ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-protocoldetails
     */
    readonly protocolDetails?: CfnServer.ProtocolDetailsProperty | cdk.IResolvable;

    /**
     * Specifies the file transfer protocol or protocols over which your file transfer protocol client can connect to your server's endpoint. The available protocols are:
     *
     * - `SFTP` (Secure Shell (SSH) File Transfer Protocol): File transfer over SSH
     * - `FTPS` (File Transfer Protocol Secure): File transfer with TLS encryption
     * - `FTP` (File Transfer Protocol): Unencrypted file transfer
     *
     * > If you select `FTPS` , you must choose a certificate stored in AWS Certificate Manager (ACM) which is used to identify your server when clients connect to it over FTPS.
     * >
     * > If `Protocol` includes either `FTP` or `FTPS` , then the `EndpointType` must be `VPC` and the `IdentityProviderType` must be `AWS_DIRECTORY_SERVICE` or `API_GATEWAY` .
     * >
     * > If `Protocol` includes `FTP` , then `AddressAllocationIds` cannot be associated.
     * >
     * > If `Protocol` is set only to `SFTP` , the `EndpointType` can be set to `PUBLIC` and the `IdentityProviderType` can be set to `SERVICE_MANAGED` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-protocols
     */
    readonly protocols?: string[];

    /**
     * Specifies the name of the security policy that is attached to the server.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-securitypolicyname
     */
    readonly securityPolicyName?: string;

    /**
     * Key-value pairs that can be used to group and search for servers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * Specifies the workflow ID for the workflow to assign and the execution role used for executing the workflow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-workflowdetails
     */
    readonly workflowDetails?: CfnServer.WorkflowDetailsProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnServerProps`
 *
 * @param properties - the TypeScript properties of a `CfnServerProps`
 *
 * @returns the result of the validation.
 */
function CfnServerPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('certificate', cdk.validateString)(properties.certificate));
    errors.collect(cdk.propertyValidator('domain', cdk.validateString)(properties.domain));
    errors.collect(cdk.propertyValidator('endpointDetails', CfnServer_EndpointDetailsPropertyValidator)(properties.endpointDetails));
    errors.collect(cdk.propertyValidator('endpointType', cdk.validateString)(properties.endpointType));
    errors.collect(cdk.propertyValidator('identityProviderDetails', CfnServer_IdentityProviderDetailsPropertyValidator)(properties.identityProviderDetails));
    errors.collect(cdk.propertyValidator('identityProviderType', cdk.validateString)(properties.identityProviderType));
    errors.collect(cdk.propertyValidator('loggingRole', cdk.validateString)(properties.loggingRole));
    errors.collect(cdk.propertyValidator('postAuthenticationLoginBanner', cdk.validateString)(properties.postAuthenticationLoginBanner));
    errors.collect(cdk.propertyValidator('preAuthenticationLoginBanner', cdk.validateString)(properties.preAuthenticationLoginBanner));
    errors.collect(cdk.propertyValidator('protocolDetails', CfnServer_ProtocolDetailsPropertyValidator)(properties.protocolDetails));
    errors.collect(cdk.propertyValidator('protocols', cdk.listValidator(cdk.validateString))(properties.protocols));
    errors.collect(cdk.propertyValidator('securityPolicyName', cdk.validateString)(properties.securityPolicyName));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('workflowDetails', CfnServer_WorkflowDetailsPropertyValidator)(properties.workflowDetails));
    return errors.wrap('supplied properties not correct for "CfnServerProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Transfer::Server` resource
 *
 * @param properties - the TypeScript properties of a `CfnServerProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Transfer::Server` resource.
 */
// @ts-ignore TS6133
function cfnServerPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnServerPropsValidator(properties).assertSuccess();
    return {
        Certificate: cdk.stringToCloudFormation(properties.certificate),
        Domain: cdk.stringToCloudFormation(properties.domain),
        EndpointDetails: cfnServerEndpointDetailsPropertyToCloudFormation(properties.endpointDetails),
        EndpointType: cdk.stringToCloudFormation(properties.endpointType),
        IdentityProviderDetails: cfnServerIdentityProviderDetailsPropertyToCloudFormation(properties.identityProviderDetails),
        IdentityProviderType: cdk.stringToCloudFormation(properties.identityProviderType),
        LoggingRole: cdk.stringToCloudFormation(properties.loggingRole),
        PostAuthenticationLoginBanner: cdk.stringToCloudFormation(properties.postAuthenticationLoginBanner),
        PreAuthenticationLoginBanner: cdk.stringToCloudFormation(properties.preAuthenticationLoginBanner),
        ProtocolDetails: cfnServerProtocolDetailsPropertyToCloudFormation(properties.protocolDetails),
        Protocols: cdk.listMapper(cdk.stringToCloudFormation)(properties.protocols),
        SecurityPolicyName: cdk.stringToCloudFormation(properties.securityPolicyName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        WorkflowDetails: cfnServerWorkflowDetailsPropertyToCloudFormation(properties.workflowDetails),
    };
}

// @ts-ignore TS6133
function CfnServerPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnServerProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnServerProps>();
    ret.addPropertyResult('certificate', 'Certificate', properties.Certificate != null ? cfn_parse.FromCloudFormation.getString(properties.Certificate) : undefined);
    ret.addPropertyResult('domain', 'Domain', properties.Domain != null ? cfn_parse.FromCloudFormation.getString(properties.Domain) : undefined);
    ret.addPropertyResult('endpointDetails', 'EndpointDetails', properties.EndpointDetails != null ? CfnServerEndpointDetailsPropertyFromCloudFormation(properties.EndpointDetails) : undefined);
    ret.addPropertyResult('endpointType', 'EndpointType', properties.EndpointType != null ? cfn_parse.FromCloudFormation.getString(properties.EndpointType) : undefined);
    ret.addPropertyResult('identityProviderDetails', 'IdentityProviderDetails', properties.IdentityProviderDetails != null ? CfnServerIdentityProviderDetailsPropertyFromCloudFormation(properties.IdentityProviderDetails) : undefined);
    ret.addPropertyResult('identityProviderType', 'IdentityProviderType', properties.IdentityProviderType != null ? cfn_parse.FromCloudFormation.getString(properties.IdentityProviderType) : undefined);
    ret.addPropertyResult('loggingRole', 'LoggingRole', properties.LoggingRole != null ? cfn_parse.FromCloudFormation.getString(properties.LoggingRole) : undefined);
    ret.addPropertyResult('postAuthenticationLoginBanner', 'PostAuthenticationLoginBanner', properties.PostAuthenticationLoginBanner != null ? cfn_parse.FromCloudFormation.getString(properties.PostAuthenticationLoginBanner) : undefined);
    ret.addPropertyResult('preAuthenticationLoginBanner', 'PreAuthenticationLoginBanner', properties.PreAuthenticationLoginBanner != null ? cfn_parse.FromCloudFormation.getString(properties.PreAuthenticationLoginBanner) : undefined);
    ret.addPropertyResult('protocolDetails', 'ProtocolDetails', properties.ProtocolDetails != null ? CfnServerProtocolDetailsPropertyFromCloudFormation(properties.ProtocolDetails) : undefined);
    ret.addPropertyResult('protocols', 'Protocols', properties.Protocols != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getString)(properties.Protocols) : undefined);
    ret.addPropertyResult('securityPolicyName', 'SecurityPolicyName', properties.SecurityPolicyName != null ? cfn_parse.FromCloudFormation.getString(properties.SecurityPolicyName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('workflowDetails', 'WorkflowDetails', properties.WorkflowDetails != null ? CfnServerWorkflowDetailsPropertyFromCloudFormation(properties.WorkflowDetails) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Transfer::Server`
 *
 * Instantiates an auto-scaling virtual server based on the selected file transfer protocol in AWS . When you make updates to your file transfer protocol-enabled server or when you work with users, use the service-generated `ServerId` property that is assigned to the newly created server.
 *
 * @cloudformationResource AWS::Transfer::Server
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html
 */
export class CfnServer extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Transfer::Server";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnServer {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnServerPropsFromCloudFormation(resourceProperties);
        const ret = new CfnServer(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name associated with the server, in the form `arn:aws:transfer:region: *account-id* :server/ *server-id* /` .
     *
     * An example of a server ARN is: `arn:aws:transfer:us-east-1:123456789012:server/s-01234567890abcdef` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The service-assigned ID of the server that is created.
     *
     * An example `ServerId` is `s-01234567890abcdef` .
     * @cloudformationAttribute ServerId
     */
    public readonly attrServerId: string;

    /**
     * The Amazon Resource Name (ARN) of the AWS Certificate Manager (ACM) certificate. Required when `Protocols` is set to `FTPS` .
     *
     * To request a new public certificate, see [Request a public certificate](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) in the *AWS Certificate Manager User Guide* .
     *
     * To import an existing certificate into ACM, see [Importing certificates into ACM](https://docs.aws.amazon.com/acm/latest/userguide/import-certificate.html) in the *AWS Certificate Manager User Guide* .
     *
     * To request a private certificate to use FTPS through private IP addresses, see [Request a private certificate](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-private.html) in the *AWS Certificate Manager User Guide* .
     *
     * Certificates with the following cryptographic algorithms and key sizes are supported:
     *
     * - 2048-bit RSA (RSA_2048)
     * - 4096-bit RSA (RSA_4096)
     * - Elliptic Prime Curve 256 bit (EC_prime256v1)
     * - Elliptic Prime Curve 384 bit (EC_secp384r1)
     * - Elliptic Prime Curve 521 bit (EC_secp521r1)
     *
     * > The certificate must be a valid SSL/TLS X.509 version 3 certificate with FQDN or IP address specified and information about the issuer.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-certificate
     */
    public certificate: string | undefined;

    /**
     * Specifies the domain of the storage system that is used for file transfers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-domain
     */
    public domain: string | undefined;

    /**
     * The virtual private cloud (VPC) endpoint settings that are configured for your server. When you host your endpoint within your VPC, you can make it accessible only to resources within your VPC, or you can attach Elastic IP addresses and make it accessible to clients over the internet. Your VPC's default security groups are automatically assigned to your endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-endpointdetails
     */
    public endpointDetails: CfnServer.EndpointDetailsProperty | cdk.IResolvable | undefined;

    /**
     * The type of endpoint that you want your server to use. You can choose to make your server's endpoint publicly accessible (PUBLIC) or host it inside your VPC. With an endpoint that is hosted in a VPC, you can restrict access to your server and resources only within your VPC or choose to make it internet facing by attaching Elastic IP addresses directly to it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-endpointtype
     */
    public endpointType: string | undefined;

    /**
     * Required when `IdentityProviderType` is set to `AWS_DIRECTORY_SERVICE` or `API_GATEWAY` . Accepts an array containing all of the information required to use a directory in `AWS_DIRECTORY_SERVICE` or invoke a customer-supplied authentication API, including the API Gateway URL. Not required when `IdentityProviderType` is set to `SERVICE_MANAGED` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-identityproviderdetails
     */
    public identityProviderDetails: CfnServer.IdentityProviderDetailsProperty | cdk.IResolvable | undefined;

    /**
     * Specifies the mode of authentication for a server. The default value is `SERVICE_MANAGED` , which allows you to store and access user credentials within the AWS Transfer Family service.
     *
     * Use `AWS_DIRECTORY_SERVICE` to provide access to Active Directory groups in AWS Managed Active Directory or Microsoft Active Directory in your on-premises environment or in AWS using AD Connectors. This option also requires you to provide a Directory ID using the `IdentityProviderDetails` parameter.
     *
     * Use the `API_GATEWAY` value to integrate with an identity provider of your choosing. The `API_GATEWAY` setting requires you to provide an API Gateway endpoint URL to call for authentication using the `IdentityProviderDetails` parameter.
     *
     * Use the `AWS_LAMBDA` value to directly use a Lambda function as your identity provider. If you choose this value, you must specify the ARN for the lambda function in the `Function` parameter for the `IdentityProviderDetails` data type.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-identityprovidertype
     */
    public identityProviderType: string | undefined;

    /**
     * Specifies the Amazon Resource Name (ARN) of the AWS Identity and Access Management (IAM) role that allows a server to turn on Amazon CloudWatch logging for Amazon S3 or Amazon EFS events. When set, user activity can be viewed in your CloudWatch logs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-loggingrole
     */
    public loggingRole: string | undefined;

    /**
     * Specify a string to display when users connect to a server. This string is displayed after the user authenticates.
     *
     * > The SFTP protocol does not support post-authentication display banners.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-postauthenticationloginbanner
     */
    public postAuthenticationLoginBanner: string | undefined;

    /**
     * Specify a string to display when users connect to a server. This string is displayed before the user authenticates. For example, the following banner displays details about using the system.
     *
     * `This system is for the use of authorized users only. Individuals using this computer system without authority, or in excess of their authority, are subject to having all of their activities on this system monitored and recorded by system personnel.`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-preauthenticationloginbanner
     */
    public preAuthenticationLoginBanner: string | undefined;

    /**
     * The protocol settings that are configured for your server.
     *
     * Use the `PassiveIp` parameter to indicate passive mode (for FTP and FTPS protocols). Enter a single dotted-quad IPv4 address, such as the external IP address of a firewall, router, or load balancer.
     *
     * Use the `TlsSessionResumptionMode` parameter to determine whether or not your Transfer server resumes recent, negotiated sessions through a unique session ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-protocoldetails
     */
    public protocolDetails: CfnServer.ProtocolDetailsProperty | cdk.IResolvable | undefined;

    /**
     * Specifies the file transfer protocol or protocols over which your file transfer protocol client can connect to your server's endpoint. The available protocols are:
     *
     * - `SFTP` (Secure Shell (SSH) File Transfer Protocol): File transfer over SSH
     * - `FTPS` (File Transfer Protocol Secure): File transfer with TLS encryption
     * - `FTP` (File Transfer Protocol): Unencrypted file transfer
     *
     * > If you select `FTPS` , you must choose a certificate stored in AWS Certificate Manager (ACM) which is used to identify your server when clients connect to it over FTPS.
     * >
     * > If `Protocol` includes either `FTP` or `FTPS` , then the `EndpointType` must be `VPC` and the `IdentityProviderType` must be `AWS_DIRECTORY_SERVICE` or `API_GATEWAY` .
     * >
     * > If `Protocol` includes `FTP` , then `AddressAllocationIds` cannot be associated.
     * >
     * > If `Protocol` is set only to `SFTP` , the `EndpointType` can be set to `PUBLIC` and the `IdentityProviderType` can be set to `SERVICE_MANAGED` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-protocols
     */
    public protocols: string[] | undefined;

    /**
     * Specifies the name of the security policy that is attached to the server.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-securitypolicyname
     */
    public securityPolicyName: string | undefined;

    /**
     * Key-value pairs that can be used to group and search for servers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Specifies the workflow ID for the workflow to assign and the execution role used for executing the workflow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-server.html#cfn-transfer-server-workflowdetails
     */
    public workflowDetails: CfnServer.WorkflowDetailsProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::Transfer::Server`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnServerProps = {}) {
        super(scope, id, { type: CfnServer.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrServerId = cdk.Token.asString(this.getAtt('ServerId'));

        this.certificate = props.certificate;
        this.domain = props.domain;
        this.endpointDetails = props.endpointDetails;
        this.endpointType = props.endpointType;
        this.identityProviderDetails = props.identityProviderDetails;
        this.identityProviderType = props.identityProviderType;
        this.loggingRole = props.loggingRole;
        this.postAuthenticationLoginBanner = props.postAuthenticationLoginBanner;
        this.preAuthenticationLoginBanner = props.preAuthenticationLoginBanner;
        this.protocolDetails = props.protocolDetails;
        this.protocols = props.protocols;
        this.securityPolicyName = props.securityPolicyName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Transfer::Server", props.tags, { tagPropertyName: 'tags' });
        this.workflowDetails = props.workflowDetails;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnServer.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            certificate: this.certificate,
            domain: this.domain,
            endpointDetails: this.endpointDetails,
            endpointType: this.endpointType,
            identityProviderDetails: this.identityProviderDetails,
            identityProviderType: this.identityProviderType,
            loggingRole: this.loggingRole,
            postAuthenticationLoginBanner: this.postAuthenticationLoginBanner,
            preAuthenticationLoginBanner: this.preAuthenticationLoginBanner,
            protocolDetails: this.protocolDetails,
            protocols: this.protocols,
            securityPolicyName: this.securityPolicyName,
            tags: this.tags.renderTags(),
            workflowDetails: this.workflowDetails,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnServerPropsToCloudFormation(props);
    }
}

export namespace CfnServer {
    /**
     * The virtual private cloud (VPC) endpoint settings that are configured for your server. When you host your endpoint within your VPC, you can make it accessible only to resources within your VPC, or you can attach Elastic IP addresses and make it accessible to clients over the internet. Your VPC's default security groups are automatically assigned to your endpoint.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-endpointdetails.html
     */
    export interface EndpointDetailsProperty {
        /**
         * A list of address allocation IDs that are required to attach an Elastic IP address to your server's endpoint.
         *
         * > This property can only be set when `EndpointType` is set to `VPC` and it is only valid in the `UpdateServer` API.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-endpointdetails.html#cfn-transfer-server-endpointdetails-addressallocationids
         */
        readonly addressAllocationIds?: string[];
        /**
         * A list of security groups IDs that are available to attach to your server's endpoint.
         *
         * > This property can only be set when `EndpointType` is set to `VPC` .
         * >
         * > You can edit the `SecurityGroupIds` property in the [UpdateServer](https://docs.aws.amazon.com/transfer/latest/userguide/API_UpdateServer.html) API only if you are changing the `EndpointType` from `PUBLIC` or `VPC_ENDPOINT` to `VPC` . To change security groups associated with your server's VPC endpoint after creation, use the Amazon EC2 [ModifyVpcEndpoint](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ModifyVpcEndpoint.html) API.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-endpointdetails.html#cfn-transfer-server-endpointdetails-securitygroupids
         */
        readonly securityGroupIds?: string[];
        /**
         * A list of subnet IDs that are required to host your server endpoint in your VPC.
         *
         * > This property can only be set when `EndpointType` is set to `VPC` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-endpointdetails.html#cfn-transfer-server-endpointdetails-subnetids
         */
        readonly subnetIds?: string[];
        /**
         * The ID of the VPC endpoint.
         *
         * > This property can only be set when `EndpointType` is set to `VPC_ENDPOINT` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-endpointdetails.html#cfn-transfer-server-endpointdetails-vpcendpointid
         */
        readonly vpcEndpointId?: string;
        /**
         * The VPC ID of the virtual private cloud in which the server's endpoint will be hosted.
         *
         * > This property can only be set when `EndpointType` is set to `VPC` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-endpointdetails.html#cfn-transfer-server-endpointdetails-vpcid
         */
        readonly vpcId?: string;
    }
}

/**
 * Determine whether the given properties match those of a `EndpointDetailsProperty`
 *
 * @param properties - the TypeScript properties of a `EndpointDetailsProperty`
 *
 * @returns the result of the validation.
 */
function CfnServer_EndpointDetailsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('addressAllocationIds', cdk.listValidator(cdk.validateString))(properties.addressAllocationIds));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.listValidator(cdk.validateString))(properties.subnetIds));
    errors.collect(cdk.propertyValidator('vpcEndpointId', cdk.validateString)(properties.vpcEndpointId));
    errors.collect(cdk.propertyValidator('vpcId', cdk.validateString)(properties.vpcId));
    return errors.wrap('supplied properties not correct for "EndpointDetailsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Transfer::Server.EndpointDetails` resource
 *
 * @param properties - the TypeScript properties of a `EndpointDetailsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Transfer::Server.EndpointDetails` resource.
 */
// @ts-ignore TS6133
function cfnServerEndpointDetailsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnServer_EndpointDetailsPropertyValidator(properties).assertSuccess();
    return {
        AddressAllocationIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.addressAllocationIds),
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        SubnetIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnetIds),
        VpcEndpointId: cdk.stringToCloudFormation(properties.vpcEndpointId),
        VpcId: cdk.stringToCloudFormation(properties.vpcId),
    };
}

// @ts-ignore TS6133
function CfnServerEndpointDetailsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnServer.EndpointDetailsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnServer.EndpointDetailsProperty>();
    ret.addPropertyResult('addressAllocationIds', 'AddressAllocationIds', properties.AddressAllocationIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AddressAllocationIds) : undefined);
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', properties.SecurityGroupIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds) : undefined);
    ret.addPropertyResult('subnetIds', 'SubnetIds', properties.SubnetIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SubnetIds) : undefined);
    ret.addPropertyResult('vpcEndpointId', 'VpcEndpointId', properties.VpcEndpointId != null ? cfn_parse.FromCloudFormation.getString(properties.VpcEndpointId) : undefined);
    ret.addPropertyResult('vpcId', 'VpcId', properties.VpcId != null ? cfn_parse.FromCloudFormation.getString(properties.VpcId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnServer {
    /**
     * Required when `IdentityProviderType` is set to `AWS_DIRECTORY_SERVICE` or `API_GATEWAY` . Accepts an array containing all of the information required to use a directory in `AWS_DIRECTORY_SERVICE` or invoke a customer-supplied authentication API, including the API Gateway URL. Not required when `IdentityProviderType` is set to `SERVICE_MANAGED` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-identityproviderdetails.html
     */
    export interface IdentityProviderDetailsProperty {
        /**
         * The identifier of the AWS Directory Service directory that you want to stop sharing.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-identityproviderdetails.html#cfn-transfer-server-identityproviderdetails-directoryid
         */
        readonly directoryId?: string;
        /**
         * The ARN for a lambda function to use for the Identity provider.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-identityproviderdetails.html#cfn-transfer-server-identityproviderdetails-function
         */
        readonly function?: string;
        /**
         * Provides the type of `InvocationRole` used to authenticate the user account.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-identityproviderdetails.html#cfn-transfer-server-identityproviderdetails-invocationrole
         */
        readonly invocationRole?: string;
        /**
         * Provides the location of the service endpoint used to authenticate users.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-identityproviderdetails.html#cfn-transfer-server-identityproviderdetails-url
         */
        readonly url?: string;
    }
}

/**
 * Determine whether the given properties match those of a `IdentityProviderDetailsProperty`
 *
 * @param properties - the TypeScript properties of a `IdentityProviderDetailsProperty`
 *
 * @returns the result of the validation.
 */
function CfnServer_IdentityProviderDetailsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('directoryId', cdk.validateString)(properties.directoryId));
    errors.collect(cdk.propertyValidator('function', cdk.validateString)(properties.function));
    errors.collect(cdk.propertyValidator('invocationRole', cdk.validateString)(properties.invocationRole));
    errors.collect(cdk.propertyValidator('url', cdk.validateString)(properties.url));
    return errors.wrap('supplied properties not correct for "IdentityProviderDetailsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Transfer::Server.IdentityProviderDetails` resource
 *
 * @param properties - the TypeScript properties of a `IdentityProviderDetailsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Transfer::Server.IdentityProviderDetails` resource.
 */
// @ts-ignore TS6133
function cfnServerIdentityProviderDetailsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnServer_IdentityProviderDetailsPropertyValidator(properties).assertSuccess();
    return {
        DirectoryId: cdk.stringToCloudFormation(properties.directoryId),
        Function: cdk.stringToCloudFormation(properties.function),
        InvocationRole: cdk.stringToCloudFormation(properties.invocationRole),
        Url: cdk.stringToCloudFormation(properties.url),
    };
}

// @ts-ignore TS6133
function CfnServerIdentityProviderDetailsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnServer.IdentityProviderDetailsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnServer.IdentityProviderDetailsProperty>();
    ret.addPropertyResult('directoryId', 'DirectoryId', properties.DirectoryId != null ? cfn_parse.FromCloudFormation.getString(properties.DirectoryId) : undefined);
    ret.addPropertyResult('function', 'Function', properties.Function != null ? cfn_parse.FromCloudFormation.getString(properties.Function) : undefined);
    ret.addPropertyResult('invocationRole', 'InvocationRole', properties.InvocationRole != null ? cfn_parse.FromCloudFormation.getString(properties.InvocationRole) : undefined);
    ret.addPropertyResult('url', 'Url', properties.Url != null ? cfn_parse.FromCloudFormation.getString(properties.Url) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnServer {
    /**
     * Protocol settings that are configured for your server.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-protocoldetails.html
     */
    export interface ProtocolDetailsProperty {
        /**
         * Indicates passive mode, for FTP and FTPS protocols. Enter a single dotted-quad IPv4 address, such as the external IP address of a firewall, router, or load balancer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-protocoldetails.html#cfn-transfer-server-protocoldetails-passiveip
         */
        readonly passiveIp?: string;
        /**
         * A property used with Transfer servers that use the FTPS protocol. TLS Session Resumption provides a mechanism to resume or share a negotiated secret key between the control and data connection for an FTPS session. `TlsSessionResumptionMode` determines whether or not the server resumes recent, negotiated sessions through a unique session ID. This property is available during `CreateServer` and `UpdateServer` calls. If a `TlsSessionResumptionMode` value is not specified during CreateServer, it is set to `ENFORCED` by default.
         *
         * - `DISABLED` : the server does not process TLS session resumption client requests and creates a new TLS session for each request.
         * - `ENABLED` : the server processes and accepts clients that are performing TLS session resumption. The server doesn't reject client data connections that do not perform the TLS session resumption client processing.
         * - `ENFORCED` : the server processes and accepts clients that are performing TLS session resumption. The server rejects client data connections that do not perform the TLS session resumption client processing. Before you set the value to `ENFORCED` , test your clients.
         *
         * > Not all FTPS clients perform TLS session resumption. So, if you choose to enforce TLS session resumption, you prevent any connections from FTPS clients that don't perform the protocol negotiation. To determine whether or not you can use the `ENFORCED` value, you need to test your clients.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-protocoldetails.html#cfn-transfer-server-protocoldetails-tlssessionresumptionmode
         */
        readonly tlsSessionResumptionMode?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ProtocolDetailsProperty`
 *
 * @param properties - the TypeScript properties of a `ProtocolDetailsProperty`
 *
 * @returns the result of the validation.
 */
function CfnServer_ProtocolDetailsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('passiveIp', cdk.validateString)(properties.passiveIp));
    errors.collect(cdk.propertyValidator('tlsSessionResumptionMode', cdk.validateString)(properties.tlsSessionResumptionMode));
    return errors.wrap('supplied properties not correct for "ProtocolDetailsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Transfer::Server.ProtocolDetails` resource
 *
 * @param properties - the TypeScript properties of a `ProtocolDetailsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Transfer::Server.ProtocolDetails` resource.
 */
// @ts-ignore TS6133
function cfnServerProtocolDetailsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnServer_ProtocolDetailsPropertyValidator(properties).assertSuccess();
    return {
        PassiveIp: cdk.stringToCloudFormation(properties.passiveIp),
        TlsSessionResumptionMode: cdk.stringToCloudFormation(properties.tlsSessionResumptionMode),
    };
}

// @ts-ignore TS6133
function CfnServerProtocolDetailsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnServer.ProtocolDetailsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnServer.ProtocolDetailsProperty>();
    ret.addPropertyResult('passiveIp', 'PassiveIp', properties.PassiveIp != null ? cfn_parse.FromCloudFormation.getString(properties.PassiveIp) : undefined);
    ret.addPropertyResult('tlsSessionResumptionMode', 'TlsSessionResumptionMode', properties.TlsSessionResumptionMode != null ? cfn_parse.FromCloudFormation.getString(properties.TlsSessionResumptionMode) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnServer {
    /**
     * Specifies the workflow ID for the workflow to assign and the execution role used for executing the workflow.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-workflowdetail.html
     */
    export interface WorkflowDetailProperty {
        /**
         * Includes the necessary permissions for S3, EFS, and Lambda operations that Transfer can assume, so that all workflow steps can operate on the required resources
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-workflowdetail.html#cfn-transfer-server-workflowdetail-executionrole
         */
        readonly executionRole: string;
        /**
         * A unique identifier for the workflow.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-workflowdetail.html#cfn-transfer-server-workflowdetail-workflowid
         */
        readonly workflowId: string;
    }
}

/**
 * Determine whether the given properties match those of a `WorkflowDetailProperty`
 *
 * @param properties - the TypeScript properties of a `WorkflowDetailProperty`
 *
 * @returns the result of the validation.
 */
function CfnServer_WorkflowDetailPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('executionRole', cdk.requiredValidator)(properties.executionRole));
    errors.collect(cdk.propertyValidator('executionRole', cdk.validateString)(properties.executionRole));
    errors.collect(cdk.propertyValidator('workflowId', cdk.requiredValidator)(properties.workflowId));
    errors.collect(cdk.propertyValidator('workflowId', cdk.validateString)(properties.workflowId));
    return errors.wrap('supplied properties not correct for "WorkflowDetailProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Transfer::Server.WorkflowDetail` resource
 *
 * @param properties - the TypeScript properties of a `WorkflowDetailProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Transfer::Server.WorkflowDetail` resource.
 */
// @ts-ignore TS6133
function cfnServerWorkflowDetailPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnServer_WorkflowDetailPropertyValidator(properties).assertSuccess();
    return {
        ExecutionRole: cdk.stringToCloudFormation(properties.executionRole),
        WorkflowId: cdk.stringToCloudFormation(properties.workflowId),
    };
}

// @ts-ignore TS6133
function CfnServerWorkflowDetailPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnServer.WorkflowDetailProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnServer.WorkflowDetailProperty>();
    ret.addPropertyResult('executionRole', 'ExecutionRole', cfn_parse.FromCloudFormation.getString(properties.ExecutionRole));
    ret.addPropertyResult('workflowId', 'WorkflowId', cfn_parse.FromCloudFormation.getString(properties.WorkflowId));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnServer {
    /**
     * Container for the `WorkflowDetail` data type. It is used by actions that trigger a workflow to begin execution.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-workflowdetails.html
     */
    export interface WorkflowDetailsProperty {
        /**
         * A trigger that starts a workflow: the workflow begins to execute after a file is uploaded.
         *
         * To remove an associated workflow from a server, you can provide an empty `OnUpload` object, as in the following example.
         *
         * `aws transfer update-server --server-id s-01234567890abcdef --workflow-details '{"OnUpload":[]}'`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-server-workflowdetails.html#cfn-transfer-server-workflowdetails-onupload
         */
        readonly onUpload: Array<CfnServer.WorkflowDetailProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `WorkflowDetailsProperty`
 *
 * @param properties - the TypeScript properties of a `WorkflowDetailsProperty`
 *
 * @returns the result of the validation.
 */
function CfnServer_WorkflowDetailsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('onUpload', cdk.requiredValidator)(properties.onUpload));
    errors.collect(cdk.propertyValidator('onUpload', cdk.listValidator(CfnServer_WorkflowDetailPropertyValidator))(properties.onUpload));
    return errors.wrap('supplied properties not correct for "WorkflowDetailsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Transfer::Server.WorkflowDetails` resource
 *
 * @param properties - the TypeScript properties of a `WorkflowDetailsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Transfer::Server.WorkflowDetails` resource.
 */
// @ts-ignore TS6133
function cfnServerWorkflowDetailsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnServer_WorkflowDetailsPropertyValidator(properties).assertSuccess();
    return {
        OnUpload: cdk.listMapper(cfnServerWorkflowDetailPropertyToCloudFormation)(properties.onUpload),
    };
}

// @ts-ignore TS6133
function CfnServerWorkflowDetailsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnServer.WorkflowDetailsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnServer.WorkflowDetailsProperty>();
    ret.addPropertyResult('onUpload', 'OnUpload', cfn_parse.FromCloudFormation.getArray(CfnServerWorkflowDetailPropertyFromCloudFormation)(properties.OnUpload));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnUser`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html
 */
export interface CfnUserProps {

    /**
     * Specifies the Amazon Resource Name (ARN) of the IAM role that controls your users' access to your Amazon S3 bucket or EFS file system. The policies attached to this role determine the level of access that you want to provide your users when transferring files into and out of your Amazon S3 bucket or EFS file system. The IAM role should also contain a trust relationship that allows the server to access your resources when servicing your users' transfer requests.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-role
     */
    readonly role: string;

    /**
     * A system-assigned unique identifier for a server instance. This is the specific server that you added your user to.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-serverid
     */
    readonly serverId: string;

    /**
     * A unique string that identifies a user and is associated with a `ServerId` . This user name must be a minimum of 3 and a maximum of 100 characters long. The following are valid characters: a-z, A-Z, 0-9, underscore '_', hyphen '-', period '.', and at sign '@'. The user name can't start with a hyphen, period, or at sign.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-username
     */
    readonly userName: string;

    /**
     * The landing directory (folder) for a user when they log in to the server using the client.
     *
     * A `HomeDirectory` example is `/bucket_name/home/mydirectory` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-homedirectory
     */
    readonly homeDirectory?: string;

    /**
     * Logical directory mappings that specify what Amazon S3 paths and keys should be visible to your user and how you want to make them visible. You will need to specify the " `Entry` " and " `Target` " pair, where `Entry` shows how the path is made visible and `Target` is the actual Amazon S3 path. If you only specify a target, it will be displayed as is. You will need to also make sure that your IAM role provides access to paths in `Target` . The following is an example.
     *
     * `'[ { "Entry": "/", "Target": "/bucket3/customized-reports/" } ]'`
     *
     * In most cases, you can use this value instead of the session policy to lock your user down to the designated home directory ("chroot"). To do this, you can set `Entry` to '/' and set `Target` to the HomeDirectory parameter value.
     *
     * > If the target of a logical directory entry does not exist in Amazon S3, the entry will be ignored. As a workaround, you can use the Amazon S3 API to create 0 byte objects as place holders for your directory. If using the CLI, use the `s3api` call instead of `s3` so you can use the put-object operation. For example, you use the following: `AWS s3api put-object --bucket bucketname --key path/to/folder/` . Make sure that the end of the key name ends in a '/' for it to be considered a folder.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-homedirectorymappings
     */
    readonly homeDirectoryMappings?: Array<CfnUser.HomeDirectoryMapEntryProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The type of landing directory (folder) you want your users' home directory to be when they log into the server. If you set it to `PATH` , the user will see the absolute Amazon S3 bucket or EFS paths as is in their file transfer protocol clients. If you set it `LOGICAL` , you need to provide mappings in the `HomeDirectoryMappings` for how you want to make Amazon S3 or EFS paths visible to your users.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-homedirectorytype
     */
    readonly homeDirectoryType?: string;

    /**
     * A session policy for your user so you can use the same IAM role across multiple users. This policy restricts user access to portions of their Amazon S3 bucket. Variables that you can use inside this policy include `${Transfer:UserName}` , `${Transfer:HomeDirectory}` , and `${Transfer:HomeBucket}` .
     *
     * > For session policies, AWS Transfer Family stores the policy as a JSON blob, instead of the Amazon Resource Name (ARN) of the policy. You save the policy as a JSON blob and pass it in the `Policy` argument.
     * >
     * > For an example of a session policy, see [Example session policy](https://docs.aws.amazon.com/transfer/latest/userguide/session-policy.html) .
     * >
     * > For more information, see [AssumeRole](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html) in the *AWS Security Token Service API Reference* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-policy
     */
    readonly policy?: string;

    /**
     * Specifies the full POSIX identity, including user ID ( `Uid` ), group ID ( `Gid` ), and any secondary groups IDs ( `SecondaryGids` ), that controls your users' access to your Amazon Elastic File System (Amazon EFS) file systems. The POSIX permissions that are set on files and directories in your file system determine the level of access your users get when transferring files into and out of your Amazon EFS file systems.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-posixprofile
     */
    readonly posixProfile?: CfnUser.PosixProfileProperty | cdk.IResolvable;

    /**
     * Specifies the public key portion of the Secure Shell (SSH) keys stored for the described user.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-sshpublickeys
     */
    readonly sshPublicKeys?: string[];

    /**
     * Key-value pairs that can be used to group and search for users. Tags are metadata attached to users for any purpose.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-tags
     */
    readonly tags?: cdk.CfnTag[];
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
    errors.collect(cdk.propertyValidator('homeDirectory', cdk.validateString)(properties.homeDirectory));
    errors.collect(cdk.propertyValidator('homeDirectoryMappings', cdk.listValidator(CfnUser_HomeDirectoryMapEntryPropertyValidator))(properties.homeDirectoryMappings));
    errors.collect(cdk.propertyValidator('homeDirectoryType', cdk.validateString)(properties.homeDirectoryType));
    errors.collect(cdk.propertyValidator('policy', cdk.validateString)(properties.policy));
    errors.collect(cdk.propertyValidator('posixProfile', CfnUser_PosixProfilePropertyValidator)(properties.posixProfile));
    errors.collect(cdk.propertyValidator('role', cdk.requiredValidator)(properties.role));
    errors.collect(cdk.propertyValidator('role', cdk.validateString)(properties.role));
    errors.collect(cdk.propertyValidator('serverId', cdk.requiredValidator)(properties.serverId));
    errors.collect(cdk.propertyValidator('serverId', cdk.validateString)(properties.serverId));
    errors.collect(cdk.propertyValidator('sshPublicKeys', cdk.listValidator(cdk.validateString))(properties.sshPublicKeys));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('userName', cdk.requiredValidator)(properties.userName));
    errors.collect(cdk.propertyValidator('userName', cdk.validateString)(properties.userName));
    return errors.wrap('supplied properties not correct for "CfnUserProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Transfer::User` resource
 *
 * @param properties - the TypeScript properties of a `CfnUserProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Transfer::User` resource.
 */
// @ts-ignore TS6133
function cfnUserPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUserPropsValidator(properties).assertSuccess();
    return {
        Role: cdk.stringToCloudFormation(properties.role),
        ServerId: cdk.stringToCloudFormation(properties.serverId),
        UserName: cdk.stringToCloudFormation(properties.userName),
        HomeDirectory: cdk.stringToCloudFormation(properties.homeDirectory),
        HomeDirectoryMappings: cdk.listMapper(cfnUserHomeDirectoryMapEntryPropertyToCloudFormation)(properties.homeDirectoryMappings),
        HomeDirectoryType: cdk.stringToCloudFormation(properties.homeDirectoryType),
        Policy: cdk.stringToCloudFormation(properties.policy),
        PosixProfile: cfnUserPosixProfilePropertyToCloudFormation(properties.posixProfile),
        SshPublicKeys: cdk.listMapper(cdk.stringToCloudFormation)(properties.sshPublicKeys),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnUserPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUserProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUserProps>();
    ret.addPropertyResult('role', 'Role', cfn_parse.FromCloudFormation.getString(properties.Role));
    ret.addPropertyResult('serverId', 'ServerId', cfn_parse.FromCloudFormation.getString(properties.ServerId));
    ret.addPropertyResult('userName', 'UserName', cfn_parse.FromCloudFormation.getString(properties.UserName));
    ret.addPropertyResult('homeDirectory', 'HomeDirectory', properties.HomeDirectory != null ? cfn_parse.FromCloudFormation.getString(properties.HomeDirectory) : undefined);
    ret.addPropertyResult('homeDirectoryMappings', 'HomeDirectoryMappings', properties.HomeDirectoryMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnUserHomeDirectoryMapEntryPropertyFromCloudFormation)(properties.HomeDirectoryMappings) : undefined);
    ret.addPropertyResult('homeDirectoryType', 'HomeDirectoryType', properties.HomeDirectoryType != null ? cfn_parse.FromCloudFormation.getString(properties.HomeDirectoryType) : undefined);
    ret.addPropertyResult('policy', 'Policy', properties.Policy != null ? cfn_parse.FromCloudFormation.getString(properties.Policy) : undefined);
    ret.addPropertyResult('posixProfile', 'PosixProfile', properties.PosixProfile != null ? CfnUserPosixProfilePropertyFromCloudFormation(properties.PosixProfile) : undefined);
    ret.addPropertyResult('sshPublicKeys', 'SshPublicKeys', properties.SshPublicKeys != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getString)(properties.SshPublicKeys) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Transfer::User`
 *
 * The `AWS::Transfer::User` resource creates a user and associates them with an existing server. You can only create and associate users with servers that have the `IdentityProviderType` set to `SERVICE_MANAGED` . Using parameters for `CreateUser` , you can specify the user name, set the home directory, store the user's public key, and assign the user's AWS Identity and Access Management (IAM) role. You can also optionally add a session policy, and assign metadata with tags that can be used to group and search for users.
 *
 * @cloudformationResource AWS::Transfer::User
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html
 */
export class CfnUser extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Transfer::User";

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
     * The Amazon Resource Name associated with the user, in the form `arn:aws:transfer:region: *account-id* :user/ *server-id* / *username*` .
     *
     * An example of a user ARN is: `arn:aws:transfer:us-east-1:123456789012:user/user1` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The ID of the server to which the user is attached.
     *
     * An example `ServerId` is `s-01234567890abcdef` .
     * @cloudformationAttribute ServerId
     */
    public readonly attrServerId: string;

    /**
     * A unique string that identifies a user account associated with a server.
     *
     * An example `UserName` is `transfer-user-1` .
     * @cloudformationAttribute UserName
     */
    public readonly attrUserName: string;

    /**
     * Specifies the Amazon Resource Name (ARN) of the IAM role that controls your users' access to your Amazon S3 bucket or EFS file system. The policies attached to this role determine the level of access that you want to provide your users when transferring files into and out of your Amazon S3 bucket or EFS file system. The IAM role should also contain a trust relationship that allows the server to access your resources when servicing your users' transfer requests.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-role
     */
    public role: string;

    /**
     * A system-assigned unique identifier for a server instance. This is the specific server that you added your user to.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-serverid
     */
    public serverId: string;

    /**
     * A unique string that identifies a user and is associated with a `ServerId` . This user name must be a minimum of 3 and a maximum of 100 characters long. The following are valid characters: a-z, A-Z, 0-9, underscore '_', hyphen '-', period '.', and at sign '@'. The user name can't start with a hyphen, period, or at sign.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-username
     */
    public userName: string;

    /**
     * The landing directory (folder) for a user when they log in to the server using the client.
     *
     * A `HomeDirectory` example is `/bucket_name/home/mydirectory` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-homedirectory
     */
    public homeDirectory: string | undefined;

    /**
     * Logical directory mappings that specify what Amazon S3 paths and keys should be visible to your user and how you want to make them visible. You will need to specify the " `Entry` " and " `Target` " pair, where `Entry` shows how the path is made visible and `Target` is the actual Amazon S3 path. If you only specify a target, it will be displayed as is. You will need to also make sure that your IAM role provides access to paths in `Target` . The following is an example.
     *
     * `'[ { "Entry": "/", "Target": "/bucket3/customized-reports/" } ]'`
     *
     * In most cases, you can use this value instead of the session policy to lock your user down to the designated home directory ("chroot"). To do this, you can set `Entry` to '/' and set `Target` to the HomeDirectory parameter value.
     *
     * > If the target of a logical directory entry does not exist in Amazon S3, the entry will be ignored. As a workaround, you can use the Amazon S3 API to create 0 byte objects as place holders for your directory. If using the CLI, use the `s3api` call instead of `s3` so you can use the put-object operation. For example, you use the following: `AWS s3api put-object --bucket bucketname --key path/to/folder/` . Make sure that the end of the key name ends in a '/' for it to be considered a folder.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-homedirectorymappings
     */
    public homeDirectoryMappings: Array<CfnUser.HomeDirectoryMapEntryProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The type of landing directory (folder) you want your users' home directory to be when they log into the server. If you set it to `PATH` , the user will see the absolute Amazon S3 bucket or EFS paths as is in their file transfer protocol clients. If you set it `LOGICAL` , you need to provide mappings in the `HomeDirectoryMappings` for how you want to make Amazon S3 or EFS paths visible to your users.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-homedirectorytype
     */
    public homeDirectoryType: string | undefined;

    /**
     * A session policy for your user so you can use the same IAM role across multiple users. This policy restricts user access to portions of their Amazon S3 bucket. Variables that you can use inside this policy include `${Transfer:UserName}` , `${Transfer:HomeDirectory}` , and `${Transfer:HomeBucket}` .
     *
     * > For session policies, AWS Transfer Family stores the policy as a JSON blob, instead of the Amazon Resource Name (ARN) of the policy. You save the policy as a JSON blob and pass it in the `Policy` argument.
     * >
     * > For an example of a session policy, see [Example session policy](https://docs.aws.amazon.com/transfer/latest/userguide/session-policy.html) .
     * >
     * > For more information, see [AssumeRole](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html) in the *AWS Security Token Service API Reference* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-policy
     */
    public policy: string | undefined;

    /**
     * Specifies the full POSIX identity, including user ID ( `Uid` ), group ID ( `Gid` ), and any secondary groups IDs ( `SecondaryGids` ), that controls your users' access to your Amazon Elastic File System (Amazon EFS) file systems. The POSIX permissions that are set on files and directories in your file system determine the level of access your users get when transferring files into and out of your Amazon EFS file systems.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-posixprofile
     */
    public posixProfile: CfnUser.PosixProfileProperty | cdk.IResolvable | undefined;

    /**
     * Specifies the public key portion of the Secure Shell (SSH) keys stored for the described user.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-sshpublickeys
     */
    public sshPublicKeys: string[] | undefined;

    /**
     * Key-value pairs that can be used to group and search for users. Tags are metadata attached to users for any purpose.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-user.html#cfn-transfer-user-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Transfer::User`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnUserProps) {
        super(scope, id, { type: CfnUser.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'role', this);
        cdk.requireProperty(props, 'serverId', this);
        cdk.requireProperty(props, 'userName', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrServerId = cdk.Token.asString(this.getAtt('ServerId'));
        this.attrUserName = cdk.Token.asString(this.getAtt('UserName'));

        this.role = props.role;
        this.serverId = props.serverId;
        this.userName = props.userName;
        this.homeDirectory = props.homeDirectory;
        this.homeDirectoryMappings = props.homeDirectoryMappings;
        this.homeDirectoryType = props.homeDirectoryType;
        this.policy = props.policy;
        this.posixProfile = props.posixProfile;
        this.sshPublicKeys = props.sshPublicKeys;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Transfer::User", props.tags, { tagPropertyName: 'tags' });
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
            role: this.role,
            serverId: this.serverId,
            userName: this.userName,
            homeDirectory: this.homeDirectory,
            homeDirectoryMappings: this.homeDirectoryMappings,
            homeDirectoryType: this.homeDirectoryType,
            policy: this.policy,
            posixProfile: this.posixProfile,
            sshPublicKeys: this.sshPublicKeys,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnUserPropsToCloudFormation(props);
    }
}

export namespace CfnUser {
    /**
     * Represents an object that contains entries and targets for `HomeDirectoryMappings` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-user-homedirectorymapentry.html
     */
    export interface HomeDirectoryMapEntryProperty {
        /**
         * Represents an entry for `HomeDirectoryMappings` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-user-homedirectorymapentry.html#cfn-transfer-user-homedirectorymapentry-entry
         */
        readonly entry: string;
        /**
         * Represents the map target that is used in a `HomeDirectorymapEntry` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-user-homedirectorymapentry.html#cfn-transfer-user-homedirectorymapentry-target
         */
        readonly target: string;
    }
}

/**
 * Determine whether the given properties match those of a `HomeDirectoryMapEntryProperty`
 *
 * @param properties - the TypeScript properties of a `HomeDirectoryMapEntryProperty`
 *
 * @returns the result of the validation.
 */
function CfnUser_HomeDirectoryMapEntryPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('entry', cdk.requiredValidator)(properties.entry));
    errors.collect(cdk.propertyValidator('entry', cdk.validateString)(properties.entry));
    errors.collect(cdk.propertyValidator('target', cdk.requiredValidator)(properties.target));
    errors.collect(cdk.propertyValidator('target', cdk.validateString)(properties.target));
    return errors.wrap('supplied properties not correct for "HomeDirectoryMapEntryProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Transfer::User.HomeDirectoryMapEntry` resource
 *
 * @param properties - the TypeScript properties of a `HomeDirectoryMapEntryProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Transfer::User.HomeDirectoryMapEntry` resource.
 */
// @ts-ignore TS6133
function cfnUserHomeDirectoryMapEntryPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUser_HomeDirectoryMapEntryPropertyValidator(properties).assertSuccess();
    return {
        Entry: cdk.stringToCloudFormation(properties.entry),
        Target: cdk.stringToCloudFormation(properties.target),
    };
}

// @ts-ignore TS6133
function CfnUserHomeDirectoryMapEntryPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUser.HomeDirectoryMapEntryProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUser.HomeDirectoryMapEntryProperty>();
    ret.addPropertyResult('entry', 'Entry', cfn_parse.FromCloudFormation.getString(properties.Entry));
    ret.addPropertyResult('target', 'Target', cfn_parse.FromCloudFormation.getString(properties.Target));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnUser {
    /**
     * The full POSIX identity, including user ID ( `Uid` ), group ID ( `Gid` ), and any secondary groups IDs ( `SecondaryGids` ), that controls your users' access to your Amazon EFS file systems. The POSIX permissions that are set on files and directories in your file system determine the level of access your users get when transferring files into and out of your Amazon EFS file systems.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-user-posixprofile.html
     */
    export interface PosixProfileProperty {
        /**
         * The POSIX group ID used for all EFS operations by this user.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-user-posixprofile.html#cfn-transfer-user-posixprofile-gid
         */
        readonly gid: number;
        /**
         * The secondary POSIX group IDs used for all EFS operations by this user.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-user-posixprofile.html#cfn-transfer-user-posixprofile-secondarygids
         */
        readonly secondaryGids?: number[] | cdk.IResolvable;
        /**
         * The POSIX user ID used for all EFS operations by this user.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-user-posixprofile.html#cfn-transfer-user-posixprofile-uid
         */
        readonly uid: number;
    }
}

/**
 * Determine whether the given properties match those of a `PosixProfileProperty`
 *
 * @param properties - the TypeScript properties of a `PosixProfileProperty`
 *
 * @returns the result of the validation.
 */
function CfnUser_PosixProfilePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('gid', cdk.requiredValidator)(properties.gid));
    errors.collect(cdk.propertyValidator('gid', cdk.validateNumber)(properties.gid));
    errors.collect(cdk.propertyValidator('secondaryGids', cdk.listValidator(cdk.validateNumber))(properties.secondaryGids));
    errors.collect(cdk.propertyValidator('uid', cdk.requiredValidator)(properties.uid));
    errors.collect(cdk.propertyValidator('uid', cdk.validateNumber)(properties.uid));
    return errors.wrap('supplied properties not correct for "PosixProfileProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Transfer::User.PosixProfile` resource
 *
 * @param properties - the TypeScript properties of a `PosixProfileProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Transfer::User.PosixProfile` resource.
 */
// @ts-ignore TS6133
function cfnUserPosixProfilePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnUser_PosixProfilePropertyValidator(properties).assertSuccess();
    return {
        Gid: cdk.numberToCloudFormation(properties.gid),
        SecondaryGids: cdk.listMapper(cdk.numberToCloudFormation)(properties.secondaryGids),
        Uid: cdk.numberToCloudFormation(properties.uid),
    };
}

// @ts-ignore TS6133
function CfnUserPosixProfilePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnUser.PosixProfileProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnUser.PosixProfileProperty>();
    ret.addPropertyResult('gid', 'Gid', cfn_parse.FromCloudFormation.getNumber(properties.Gid));
    ret.addPropertyResult('secondaryGids', 'SecondaryGids', properties.SecondaryGids != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getNumber)(properties.SecondaryGids) : undefined);
    ret.addPropertyResult('uid', 'Uid', cfn_parse.FromCloudFormation.getNumber(properties.Uid));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnWorkflow`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-workflow.html
 */
export interface CfnWorkflowProps {

    /**
     * Specifies the details for the steps that are in the specified workflow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-workflow.html#cfn-transfer-workflow-steps
     */
    readonly steps: Array<CfnWorkflow.WorkflowStepProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Specifies the text description for the workflow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-workflow.html#cfn-transfer-workflow-description
     */
    readonly description?: string;

    /**
     * Specifies the steps (actions) to take if errors are encountered during execution of the workflow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-workflow.html#cfn-transfer-workflow-onexceptionsteps
     */
    readonly onExceptionSteps?: Array<CfnWorkflow.WorkflowStepProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Key-value pairs that can be used to group and search for workflows. Tags are metadata attached to workflows for any purpose.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-workflow.html#cfn-transfer-workflow-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnWorkflowProps`
 *
 * @param properties - the TypeScript properties of a `CfnWorkflowProps`
 *
 * @returns the result of the validation.
 */
function CfnWorkflowPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('onExceptionSteps', cdk.listValidator(CfnWorkflow_WorkflowStepPropertyValidator))(properties.onExceptionSteps));
    errors.collect(cdk.propertyValidator('steps', cdk.requiredValidator)(properties.steps));
    errors.collect(cdk.propertyValidator('steps', cdk.listValidator(CfnWorkflow_WorkflowStepPropertyValidator))(properties.steps));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnWorkflowProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Transfer::Workflow` resource
 *
 * @param properties - the TypeScript properties of a `CfnWorkflowProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Transfer::Workflow` resource.
 */
// @ts-ignore TS6133
function cfnWorkflowPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnWorkflowPropsValidator(properties).assertSuccess();
    return {
        Steps: cdk.listMapper(cfnWorkflowWorkflowStepPropertyToCloudFormation)(properties.steps),
        Description: cdk.stringToCloudFormation(properties.description),
        OnExceptionSteps: cdk.listMapper(cfnWorkflowWorkflowStepPropertyToCloudFormation)(properties.onExceptionSteps),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnWorkflowPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnWorkflowProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnWorkflowProps>();
    ret.addPropertyResult('steps', 'Steps', cfn_parse.FromCloudFormation.getArray(CfnWorkflowWorkflowStepPropertyFromCloudFormation)(properties.Steps));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('onExceptionSteps', 'OnExceptionSteps', properties.OnExceptionSteps != null ? cfn_parse.FromCloudFormation.getArray(CfnWorkflowWorkflowStepPropertyFromCloudFormation)(properties.OnExceptionSteps) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Transfer::Workflow`
 *
 * Allows you to create a workflow with specified steps and step details the workflow invokes after file transfer completes. After creating a workflow, you can associate the workflow created with any transfer servers by specifying the `workflow-details` field in `CreateServer` and `UpdateServer` operations.
 *
 * @cloudformationResource AWS::Transfer::Workflow
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-workflow.html
 */
export class CfnWorkflow extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Transfer::Workflow";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnWorkflow {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnWorkflowPropsFromCloudFormation(resourceProperties);
        const ret = new CfnWorkflow(scope, id, propsResult.value);
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
     * A unique identifier for a workflow.
     * @cloudformationAttribute WorkflowId
     */
    public readonly attrWorkflowId: string;

    /**
     * Specifies the details for the steps that are in the specified workflow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-workflow.html#cfn-transfer-workflow-steps
     */
    public steps: Array<CfnWorkflow.WorkflowStepProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Specifies the text description for the workflow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-workflow.html#cfn-transfer-workflow-description
     */
    public description: string | undefined;

    /**
     * Specifies the steps (actions) to take if errors are encountered during execution of the workflow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-workflow.html#cfn-transfer-workflow-onexceptionsteps
     */
    public onExceptionSteps: Array<CfnWorkflow.WorkflowStepProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Key-value pairs that can be used to group and search for workflows. Tags are metadata attached to workflows for any purpose.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-workflow.html#cfn-transfer-workflow-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Transfer::Workflow`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnWorkflowProps) {
        super(scope, id, { type: CfnWorkflow.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'steps', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrWorkflowId = cdk.Token.asString(this.getAtt('WorkflowId'));

        this.steps = props.steps;
        this.description = props.description;
        this.onExceptionSteps = props.onExceptionSteps;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Transfer::Workflow", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnWorkflow.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            steps: this.steps,
            description: this.description,
            onExceptionSteps: this.onExceptionSteps,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnWorkflowPropsToCloudFormation(props);
    }
}

export namespace CfnWorkflow {
    /**
     * The basic building block of a workflow.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-workflow-workflowstep.html
     */
    export interface WorkflowStepProperty {
        /**
         * Details for a step that performs a file copy.
         *
         * Consists of the following values:
         *
         * - A description
         * - An S3 location for the destination of the file copy.
         * - A flag that indicates whether or not to overwrite an existing file of the same name. The default is `FALSE` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-workflow-workflowstep.html#cfn-transfer-workflow-workflowstep-copystepdetails
         */
        readonly copyStepDetails?: any | cdk.IResolvable;
        /**
         * Details for a step that invokes a lambda function.
         *
         * Consists of the lambda function name, target, and timeout (in seconds).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-workflow-workflowstep.html#cfn-transfer-workflow-workflowstep-customstepdetails
         */
        readonly customStepDetails?: any | cdk.IResolvable;
        /**
         * Details for a step that deletes the file.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-workflow-workflowstep.html#cfn-transfer-workflow-workflowstep-deletestepdetails
         */
        readonly deleteStepDetails?: any | cdk.IResolvable;
        /**
         * Details for a step that creates one or more tags.
         *
         * You specify one or more tags: each tag contains a key/value pair.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-workflow-workflowstep.html#cfn-transfer-workflow-workflowstep-tagstepdetails
         */
        readonly tagStepDetails?: any | cdk.IResolvable;
        /**
         * Currently, the following step types are supported.
         *
         * - *COPY* : copy the file to another location
         * - *CUSTOM* : custom step with a lambda target
         * - *DELETE* : delete the file
         * - *TAG* : add a tag to the file
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-transfer-workflow-workflowstep.html#cfn-transfer-workflow-workflowstep-type
         */
        readonly type?: string;
    }
}

/**
 * Determine whether the given properties match those of a `WorkflowStepProperty`
 *
 * @param properties - the TypeScript properties of a `WorkflowStepProperty`
 *
 * @returns the result of the validation.
 */
function CfnWorkflow_WorkflowStepPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('copyStepDetails', cdk.validateObject)(properties.copyStepDetails));
    errors.collect(cdk.propertyValidator('customStepDetails', cdk.validateObject)(properties.customStepDetails));
    errors.collect(cdk.propertyValidator('deleteStepDetails', cdk.validateObject)(properties.deleteStepDetails));
    errors.collect(cdk.propertyValidator('tagStepDetails', cdk.validateObject)(properties.tagStepDetails));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "WorkflowStepProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Transfer::Workflow.WorkflowStep` resource
 *
 * @param properties - the TypeScript properties of a `WorkflowStepProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Transfer::Workflow.WorkflowStep` resource.
 */
// @ts-ignore TS6133
function cfnWorkflowWorkflowStepPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnWorkflow_WorkflowStepPropertyValidator(properties).assertSuccess();
    return {
        CopyStepDetails: cdk.objectToCloudFormation(properties.copyStepDetails),
        CustomStepDetails: cdk.objectToCloudFormation(properties.customStepDetails),
        DeleteStepDetails: cdk.objectToCloudFormation(properties.deleteStepDetails),
        TagStepDetails: cdk.objectToCloudFormation(properties.tagStepDetails),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnWorkflowWorkflowStepPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnWorkflow.WorkflowStepProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnWorkflow.WorkflowStepProperty>();
    ret.addPropertyResult('copyStepDetails', 'CopyStepDetails', properties.CopyStepDetails != null ? cfn_parse.FromCloudFormation.getAny(properties.CopyStepDetails) : undefined);
    ret.addPropertyResult('customStepDetails', 'CustomStepDetails', properties.CustomStepDetails != null ? cfn_parse.FromCloudFormation.getAny(properties.CustomStepDetails) : undefined);
    ret.addPropertyResult('deleteStepDetails', 'DeleteStepDetails', properties.DeleteStepDetails != null ? cfn_parse.FromCloudFormation.getAny(properties.DeleteStepDetails) : undefined);
    ret.addPropertyResult('tagStepDetails', 'TagStepDetails', properties.TagStepDetails != null ? cfn_parse.FromCloudFormation.getAny(properties.TagStepDetails) : undefined);
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
