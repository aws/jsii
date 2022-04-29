// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.451Z","fingerprint":"NcIMg87VvpampIJOsX9YwHZmvNEuUCGktVZ/tzjDxY4="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnBatchScramSecret`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-batchscramsecret.html
 */
export interface CfnBatchScramSecretProps {

    /**
     * The Amazon Resource Name (ARN) of the MSK cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-batchscramsecret.html#cfn-msk-batchscramsecret-clusterarn
     */
    readonly clusterArn: string;

    /**
     * A list of Amazon Secrets Manager secret ARNs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-batchscramsecret.html#cfn-msk-batchscramsecret-secretarnlist
     */
    readonly secretArnList?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnBatchScramSecretProps`
 *
 * @param properties - the TypeScript properties of a `CfnBatchScramSecretProps`
 *
 * @returns the result of the validation.
 */
function CfnBatchScramSecretPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clusterArn', cdk.requiredValidator)(properties.clusterArn));
    errors.collect(cdk.propertyValidator('clusterArn', cdk.validateString)(properties.clusterArn));
    errors.collect(cdk.propertyValidator('secretArnList', cdk.listValidator(cdk.validateString))(properties.secretArnList));
    return errors.wrap('supplied properties not correct for "CfnBatchScramSecretProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::BatchScramSecret` resource
 *
 * @param properties - the TypeScript properties of a `CfnBatchScramSecretProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::BatchScramSecret` resource.
 */
// @ts-ignore TS6133
function cfnBatchScramSecretPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnBatchScramSecretPropsValidator(properties).assertSuccess();
    return {
        ClusterArn: cdk.stringToCloudFormation(properties.clusterArn),
        SecretArnList: cdk.listMapper(cdk.stringToCloudFormation)(properties.secretArnList),
    };
}

// @ts-ignore TS6133
function CfnBatchScramSecretPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnBatchScramSecretProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnBatchScramSecretProps>();
    ret.addPropertyResult('clusterArn', 'ClusterArn', cfn_parse.FromCloudFormation.getString(properties.ClusterArn));
    ret.addPropertyResult('secretArnList', 'SecretArnList', properties.SecretArnList != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecretArnList) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::MSK::BatchScramSecret`
 *
 * Represents a secret stored in the Amazon Secrets Manager that can be used to authenticate with a cluster using a user name and a password.
 *
 * @cloudformationResource AWS::MSK::BatchScramSecret
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-batchscramsecret.html
 */
export class CfnBatchScramSecret extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::MSK::BatchScramSecret";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnBatchScramSecret {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnBatchScramSecretPropsFromCloudFormation(resourceProperties);
        const ret = new CfnBatchScramSecret(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the MSK cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-batchscramsecret.html#cfn-msk-batchscramsecret-clusterarn
     */
    public clusterArn: string;

    /**
     * A list of Amazon Secrets Manager secret ARNs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-batchscramsecret.html#cfn-msk-batchscramsecret-secretarnlist
     */
    public secretArnList: string[] | undefined;

    /**
     * Create a new `AWS::MSK::BatchScramSecret`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnBatchScramSecretProps) {
        super(scope, id, { type: CfnBatchScramSecret.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'clusterArn', this);

        this.clusterArn = props.clusterArn;
        this.secretArnList = props.secretArnList;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnBatchScramSecret.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            clusterArn: this.clusterArn,
            secretArnList: this.secretArnList,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnBatchScramSecretPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnCluster`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html
 */
export interface CfnClusterProps {

    /**
     * The setup to be used for brokers in the cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-brokernodegroupinfo
     */
    readonly brokerNodeGroupInfo: CfnCluster.BrokerNodeGroupInfoProperty | cdk.IResolvable;

    /**
     * The name of the cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-clustername
     */
    readonly clusterName: string;

    /**
     * The version of Apache Kafka. For more information, see [Supported Apache Kafka versions](https://docs.aws.amazon.com/msk/latest/developerguide/supported-kafka-versions.html) in the Amazon MSK Developer Guide.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-kafkaversion
     */
    readonly kafkaVersion: string;

    /**
     * The number of broker nodes you want in the Amazon MSK cluster. You can submit an update to increase the number of broker nodes in a cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-numberofbrokernodes
     */
    readonly numberOfBrokerNodes: number;

    /**
     * Includes information related to client authentication.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-clientauthentication
     */
    readonly clientAuthentication?: CfnCluster.ClientAuthenticationProperty | cdk.IResolvable;

    /**
     * The Amazon MSK configuration to use for the cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-configurationinfo
     */
    readonly configurationInfo?: CfnCluster.ConfigurationInfoProperty | cdk.IResolvable;

    /**
     * The version of the cluster that you want to update.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-currentversion
     */
    readonly currentVersion?: string;

    /**
     * Includes all encryption-related information.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-encryptioninfo
     */
    readonly encryptionInfo?: CfnCluster.EncryptionInfoProperty | cdk.IResolvable;

    /**
     * Specifies the level of monitoring for the MSK cluster. The possible values are `DEFAULT` , `PER_BROKER` , and `PER_TOPIC_PER_BROKER` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-enhancedmonitoring
     */
    readonly enhancedMonitoring?: string;

    /**
     * You can configure your Amazon MSK cluster to send broker logs to different destination types. This is a container for the configuration details related to broker logs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-logginginfo
     */
    readonly loggingInfo?: CfnCluster.LoggingInfoProperty | cdk.IResolvable;

    /**
     * The settings for open monitoring.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-openmonitoring
     */
    readonly openMonitoring?: CfnCluster.OpenMonitoringProperty | cdk.IResolvable;

    /**
     * A map of key:value pairs to apply to this resource. Both key and value are of type String.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-tags
     */
    readonly tags?: { [key: string]: (string) };
}

/**
 * Determine whether the given properties match those of a `CfnClusterProps`
 *
 * @param properties - the TypeScript properties of a `CfnClusterProps`
 *
 * @returns the result of the validation.
 */
function CfnClusterPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('brokerNodeGroupInfo', cdk.requiredValidator)(properties.brokerNodeGroupInfo));
    errors.collect(cdk.propertyValidator('brokerNodeGroupInfo', CfnCluster_BrokerNodeGroupInfoPropertyValidator)(properties.brokerNodeGroupInfo));
    errors.collect(cdk.propertyValidator('clientAuthentication', CfnCluster_ClientAuthenticationPropertyValidator)(properties.clientAuthentication));
    errors.collect(cdk.propertyValidator('clusterName', cdk.requiredValidator)(properties.clusterName));
    errors.collect(cdk.propertyValidator('clusterName', cdk.validateString)(properties.clusterName));
    errors.collect(cdk.propertyValidator('configurationInfo', CfnCluster_ConfigurationInfoPropertyValidator)(properties.configurationInfo));
    errors.collect(cdk.propertyValidator('currentVersion', cdk.validateString)(properties.currentVersion));
    errors.collect(cdk.propertyValidator('encryptionInfo', CfnCluster_EncryptionInfoPropertyValidator)(properties.encryptionInfo));
    errors.collect(cdk.propertyValidator('enhancedMonitoring', cdk.validateString)(properties.enhancedMonitoring));
    errors.collect(cdk.propertyValidator('kafkaVersion', cdk.requiredValidator)(properties.kafkaVersion));
    errors.collect(cdk.propertyValidator('kafkaVersion', cdk.validateString)(properties.kafkaVersion));
    errors.collect(cdk.propertyValidator('loggingInfo', CfnCluster_LoggingInfoPropertyValidator)(properties.loggingInfo));
    errors.collect(cdk.propertyValidator('numberOfBrokerNodes', cdk.requiredValidator)(properties.numberOfBrokerNodes));
    errors.collect(cdk.propertyValidator('numberOfBrokerNodes', cdk.validateNumber)(properties.numberOfBrokerNodes));
    errors.collect(cdk.propertyValidator('openMonitoring', CfnCluster_OpenMonitoringPropertyValidator)(properties.openMonitoring));
    errors.collect(cdk.propertyValidator('tags', cdk.hashValidator(cdk.validateString))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnClusterProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster` resource
 *
 * @param properties - the TypeScript properties of a `CfnClusterProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster` resource.
 */
// @ts-ignore TS6133
function cfnClusterPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnClusterPropsValidator(properties).assertSuccess();
    return {
        BrokerNodeGroupInfo: cfnClusterBrokerNodeGroupInfoPropertyToCloudFormation(properties.brokerNodeGroupInfo),
        ClusterName: cdk.stringToCloudFormation(properties.clusterName),
        KafkaVersion: cdk.stringToCloudFormation(properties.kafkaVersion),
        NumberOfBrokerNodes: cdk.numberToCloudFormation(properties.numberOfBrokerNodes),
        ClientAuthentication: cfnClusterClientAuthenticationPropertyToCloudFormation(properties.clientAuthentication),
        ConfigurationInfo: cfnClusterConfigurationInfoPropertyToCloudFormation(properties.configurationInfo),
        CurrentVersion: cdk.stringToCloudFormation(properties.currentVersion),
        EncryptionInfo: cfnClusterEncryptionInfoPropertyToCloudFormation(properties.encryptionInfo),
        EnhancedMonitoring: cdk.stringToCloudFormation(properties.enhancedMonitoring),
        LoggingInfo: cfnClusterLoggingInfoPropertyToCloudFormation(properties.loggingInfo),
        OpenMonitoring: cfnClusterOpenMonitoringPropertyToCloudFormation(properties.openMonitoring),
        Tags: cdk.hashMapper(cdk.stringToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnClusterPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnClusterProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnClusterProps>();
    ret.addPropertyResult('brokerNodeGroupInfo', 'BrokerNodeGroupInfo', CfnClusterBrokerNodeGroupInfoPropertyFromCloudFormation(properties.BrokerNodeGroupInfo));
    ret.addPropertyResult('clusterName', 'ClusterName', cfn_parse.FromCloudFormation.getString(properties.ClusterName));
    ret.addPropertyResult('kafkaVersion', 'KafkaVersion', cfn_parse.FromCloudFormation.getString(properties.KafkaVersion));
    ret.addPropertyResult('numberOfBrokerNodes', 'NumberOfBrokerNodes', cfn_parse.FromCloudFormation.getNumber(properties.NumberOfBrokerNodes));
    ret.addPropertyResult('clientAuthentication', 'ClientAuthentication', properties.ClientAuthentication != null ? CfnClusterClientAuthenticationPropertyFromCloudFormation(properties.ClientAuthentication) : undefined);
    ret.addPropertyResult('configurationInfo', 'ConfigurationInfo', properties.ConfigurationInfo != null ? CfnClusterConfigurationInfoPropertyFromCloudFormation(properties.ConfigurationInfo) : undefined);
    ret.addPropertyResult('currentVersion', 'CurrentVersion', properties.CurrentVersion != null ? cfn_parse.FromCloudFormation.getString(properties.CurrentVersion) : undefined);
    ret.addPropertyResult('encryptionInfo', 'EncryptionInfo', properties.EncryptionInfo != null ? CfnClusterEncryptionInfoPropertyFromCloudFormation(properties.EncryptionInfo) : undefined);
    ret.addPropertyResult('enhancedMonitoring', 'EnhancedMonitoring', properties.EnhancedMonitoring != null ? cfn_parse.FromCloudFormation.getString(properties.EnhancedMonitoring) : undefined);
    ret.addPropertyResult('loggingInfo', 'LoggingInfo', properties.LoggingInfo != null ? CfnClusterLoggingInfoPropertyFromCloudFormation(properties.LoggingInfo) : undefined);
    ret.addPropertyResult('openMonitoring', 'OpenMonitoring', properties.OpenMonitoring != null ? CfnClusterOpenMonitoringPropertyFromCloudFormation(properties.OpenMonitoring) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::MSK::Cluster`
 *
 * The `AWS::MSK::Cluster` resource creates an Amazon MSK cluster . For more information, see [What Is Amazon MSK?](https://docs.aws.amazon.com/msk/latest/developerguide/what-is-msk.html) in the *Amazon MSK Developer Guide* .
 *
 * @cloudformationResource AWS::MSK::Cluster
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html
 */
export class CfnCluster extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::MSK::Cluster";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnCluster {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnClusterPropsFromCloudFormation(resourceProperties);
        const ret = new CfnCluster(scope, id, propsResult.value);
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
     * The setup to be used for brokers in the cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-brokernodegroupinfo
     */
    public brokerNodeGroupInfo: CfnCluster.BrokerNodeGroupInfoProperty | cdk.IResolvable;

    /**
     * The name of the cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-clustername
     */
    public clusterName: string;

    /**
     * The version of Apache Kafka. For more information, see [Supported Apache Kafka versions](https://docs.aws.amazon.com/msk/latest/developerguide/supported-kafka-versions.html) in the Amazon MSK Developer Guide.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-kafkaversion
     */
    public kafkaVersion: string;

    /**
     * The number of broker nodes you want in the Amazon MSK cluster. You can submit an update to increase the number of broker nodes in a cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-numberofbrokernodes
     */
    public numberOfBrokerNodes: number;

    /**
     * Includes information related to client authentication.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-clientauthentication
     */
    public clientAuthentication: CfnCluster.ClientAuthenticationProperty | cdk.IResolvable | undefined;

    /**
     * The Amazon MSK configuration to use for the cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-configurationinfo
     */
    public configurationInfo: CfnCluster.ConfigurationInfoProperty | cdk.IResolvable | undefined;

    /**
     * The version of the cluster that you want to update.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-currentversion
     */
    public currentVersion: string | undefined;

    /**
     * Includes all encryption-related information.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-encryptioninfo
     */
    public encryptionInfo: CfnCluster.EncryptionInfoProperty | cdk.IResolvable | undefined;

    /**
     * Specifies the level of monitoring for the MSK cluster. The possible values are `DEFAULT` , `PER_BROKER` , and `PER_TOPIC_PER_BROKER` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-enhancedmonitoring
     */
    public enhancedMonitoring: string | undefined;

    /**
     * You can configure your Amazon MSK cluster to send broker logs to different destination types. This is a container for the configuration details related to broker logs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-logginginfo
     */
    public loggingInfo: CfnCluster.LoggingInfoProperty | cdk.IResolvable | undefined;

    /**
     * The settings for open monitoring.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-openmonitoring
     */
    public openMonitoring: CfnCluster.OpenMonitoringProperty | cdk.IResolvable | undefined;

    /**
     * A map of key:value pairs to apply to this resource. Both key and value are of type String.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-cluster.html#cfn-msk-cluster-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::MSK::Cluster`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnClusterProps) {
        super(scope, id, { type: CfnCluster.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'brokerNodeGroupInfo', this);
        cdk.requireProperty(props, 'clusterName', this);
        cdk.requireProperty(props, 'kafkaVersion', this);
        cdk.requireProperty(props, 'numberOfBrokerNodes', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.brokerNodeGroupInfo = props.brokerNodeGroupInfo;
        this.clusterName = props.clusterName;
        this.kafkaVersion = props.kafkaVersion;
        this.numberOfBrokerNodes = props.numberOfBrokerNodes;
        this.clientAuthentication = props.clientAuthentication;
        this.configurationInfo = props.configurationInfo;
        this.currentVersion = props.currentVersion;
        this.encryptionInfo = props.encryptionInfo;
        this.enhancedMonitoring = props.enhancedMonitoring;
        this.loggingInfo = props.loggingInfo;
        this.openMonitoring = props.openMonitoring;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::MSK::Cluster", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnCluster.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            brokerNodeGroupInfo: this.brokerNodeGroupInfo,
            clusterName: this.clusterName,
            kafkaVersion: this.kafkaVersion,
            numberOfBrokerNodes: this.numberOfBrokerNodes,
            clientAuthentication: this.clientAuthentication,
            configurationInfo: this.configurationInfo,
            currentVersion: this.currentVersion,
            encryptionInfo: this.encryptionInfo,
            enhancedMonitoring: this.enhancedMonitoring,
            loggingInfo: this.loggingInfo,
            openMonitoring: this.openMonitoring,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnClusterPropsToCloudFormation(props);
    }
}

export namespace CfnCluster {
    /**
     * You can configure your Amazon MSK cluster to send broker logs to different destination types. This configuration specifies the details of these destinations.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-brokerlogs.html
     */
    export interface BrokerLogsProperty {
        /**
         * Details of the CloudWatch Logs destination for broker logs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-brokerlogs.html#cfn-msk-cluster-brokerlogs-cloudwatchlogs
         */
        readonly cloudWatchLogs?: CfnCluster.CloudWatchLogsProperty | cdk.IResolvable;
        /**
         * Details of the Kinesis Data Firehose delivery stream that is the destination for broker logs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-brokerlogs.html#cfn-msk-cluster-brokerlogs-firehose
         */
        readonly firehose?: CfnCluster.FirehoseProperty | cdk.IResolvable;
        /**
         * Details of the Amazon MSK destination for broker logs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-brokerlogs.html#cfn-msk-cluster-brokerlogs-s3
         */
        readonly s3?: CfnCluster.S3Property | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `BrokerLogsProperty`
 *
 * @param properties - the TypeScript properties of a `BrokerLogsProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_BrokerLogsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cloudWatchLogs', CfnCluster_CloudWatchLogsPropertyValidator)(properties.cloudWatchLogs));
    errors.collect(cdk.propertyValidator('firehose', CfnCluster_FirehosePropertyValidator)(properties.firehose));
    errors.collect(cdk.propertyValidator('s3', CfnCluster_S3PropertyValidator)(properties.s3));
    return errors.wrap('supplied properties not correct for "BrokerLogsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.BrokerLogs` resource
 *
 * @param properties - the TypeScript properties of a `BrokerLogsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.BrokerLogs` resource.
 */
// @ts-ignore TS6133
function cfnClusterBrokerLogsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_BrokerLogsPropertyValidator(properties).assertSuccess();
    return {
        CloudWatchLogs: cfnClusterCloudWatchLogsPropertyToCloudFormation(properties.cloudWatchLogs),
        Firehose: cfnClusterFirehosePropertyToCloudFormation(properties.firehose),
        S3: cfnClusterS3PropertyToCloudFormation(properties.s3),
    };
}

// @ts-ignore TS6133
function CfnClusterBrokerLogsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.BrokerLogsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.BrokerLogsProperty>();
    ret.addPropertyResult('cloudWatchLogs', 'CloudWatchLogs', properties.CloudWatchLogs != null ? CfnClusterCloudWatchLogsPropertyFromCloudFormation(properties.CloudWatchLogs) : undefined);
    ret.addPropertyResult('firehose', 'Firehose', properties.Firehose != null ? CfnClusterFirehosePropertyFromCloudFormation(properties.Firehose) : undefined);
    ret.addPropertyResult('s3', 'S3', properties.S3 != null ? CfnClusterS3PropertyFromCloudFormation(properties.S3) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * The setup to be used for brokers in the cluster.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-brokernodegroupinfo.html
     */
    export interface BrokerNodeGroupInfoProperty {
        /**
         * This parameter is currently not in use.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-brokernodegroupinfo.html#cfn-msk-cluster-brokernodegroupinfo-brokerazdistribution
         */
        readonly brokerAzDistribution?: string;
        /**
         * The list of subnets to connect to in the client virtual private cloud (VPC). Amazon creates elastic network interfaces inside these subnets. Client applications use elastic network interfaces to produce and consume data.
         *
         * Specify exactly two subnets if you are using the US West (N. California) Region. For other Regions where Amazon MSK is available, you can specify either two or three subnets. The subnets that you specify must be in distinct Availability Zones. When you create a cluster, Amazon MSK distributes the broker nodes evenly across the subnets that you specify.
         *
         * Client subnets can't be in Availability Zone us-east-1e.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-brokernodegroupinfo.html#cfn-msk-cluster-brokernodegroupinfo-clientsubnets
         */
        readonly clientSubnets: string[];
        /**
         * Information about the cluster's connectivity setting.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-brokernodegroupinfo.html#cfn-msk-cluster-brokernodegroupinfo-connectivityinfo
         */
        readonly connectivityInfo?: CfnCluster.ConnectivityInfoProperty | cdk.IResolvable;
        /**
         * The type of Amazon EC2 instances to use for brokers. The following instance types are allowed: kafka.m5.large, kafka.m5.xlarge, kafka.m5.2xlarge, kafka.m5.4xlarge, kafka.m5.8xlarge, kafka.m5.12xlarge, kafka.m5.16xlarge, and kafka.m5.24xlarge.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-brokernodegroupinfo.html#cfn-msk-cluster-brokernodegroupinfo-instancetype
         */
        readonly instanceType: string;
        /**
         * The security groups to associate with the elastic network interfaces in order to specify who can connect to and communicate with the Amazon MSK cluster. If you don't specify a security group, Amazon MSK uses the default security group associated with the VPC. If you specify security groups that were shared with you, you must ensure that you have permissions to them. Specifically, you need the `ec2:DescribeSecurityGroups` permission.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-brokernodegroupinfo.html#cfn-msk-cluster-brokernodegroupinfo-securitygroups
         */
        readonly securityGroups?: string[];
        /**
         * Contains information about storage volumes attached to MSK broker nodes.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-brokernodegroupinfo.html#cfn-msk-cluster-brokernodegroupinfo-storageinfo
         */
        readonly storageInfo?: CfnCluster.StorageInfoProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `BrokerNodeGroupInfoProperty`
 *
 * @param properties - the TypeScript properties of a `BrokerNodeGroupInfoProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_BrokerNodeGroupInfoPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('brokerAzDistribution', cdk.validateString)(properties.brokerAzDistribution));
    errors.collect(cdk.propertyValidator('clientSubnets', cdk.requiredValidator)(properties.clientSubnets));
    errors.collect(cdk.propertyValidator('clientSubnets', cdk.listValidator(cdk.validateString))(properties.clientSubnets));
    errors.collect(cdk.propertyValidator('connectivityInfo', CfnCluster_ConnectivityInfoPropertyValidator)(properties.connectivityInfo));
    errors.collect(cdk.propertyValidator('instanceType', cdk.requiredValidator)(properties.instanceType));
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('securityGroups', cdk.listValidator(cdk.validateString))(properties.securityGroups));
    errors.collect(cdk.propertyValidator('storageInfo', CfnCluster_StorageInfoPropertyValidator)(properties.storageInfo));
    return errors.wrap('supplied properties not correct for "BrokerNodeGroupInfoProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.BrokerNodeGroupInfo` resource
 *
 * @param properties - the TypeScript properties of a `BrokerNodeGroupInfoProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.BrokerNodeGroupInfo` resource.
 */
// @ts-ignore TS6133
function cfnClusterBrokerNodeGroupInfoPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_BrokerNodeGroupInfoPropertyValidator(properties).assertSuccess();
    return {
        BrokerAZDistribution: cdk.stringToCloudFormation(properties.brokerAzDistribution),
        ClientSubnets: cdk.listMapper(cdk.stringToCloudFormation)(properties.clientSubnets),
        ConnectivityInfo: cfnClusterConnectivityInfoPropertyToCloudFormation(properties.connectivityInfo),
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        SecurityGroups: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroups),
        StorageInfo: cfnClusterStorageInfoPropertyToCloudFormation(properties.storageInfo),
    };
}

// @ts-ignore TS6133
function CfnClusterBrokerNodeGroupInfoPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.BrokerNodeGroupInfoProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.BrokerNodeGroupInfoProperty>();
    ret.addPropertyResult('brokerAzDistribution', 'BrokerAZDistribution', properties.BrokerAZDistribution != null ? cfn_parse.FromCloudFormation.getString(properties.BrokerAZDistribution) : undefined);
    ret.addPropertyResult('clientSubnets', 'ClientSubnets', cfn_parse.FromCloudFormation.getStringArray(properties.ClientSubnets));
    ret.addPropertyResult('connectivityInfo', 'ConnectivityInfo', properties.ConnectivityInfo != null ? CfnClusterConnectivityInfoPropertyFromCloudFormation(properties.ConnectivityInfo) : undefined);
    ret.addPropertyResult('instanceType', 'InstanceType', cfn_parse.FromCloudFormation.getString(properties.InstanceType));
    ret.addPropertyResult('securityGroups', 'SecurityGroups', properties.SecurityGroups != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroups) : undefined);
    ret.addPropertyResult('storageInfo', 'StorageInfo', properties.StorageInfo != null ? CfnClusterStorageInfoPropertyFromCloudFormation(properties.StorageInfo) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Includes information related to client authentication.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-clientauthentication.html
     */
    export interface ClientAuthenticationProperty {
        /**
         * Details for ClientAuthentication using SASL.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-clientauthentication.html#cfn-msk-cluster-clientauthentication-sasl
         */
        readonly sasl?: CfnCluster.SaslProperty | cdk.IResolvable;
        /**
         * Details for client authentication using TLS.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-clientauthentication.html#cfn-msk-cluster-clientauthentication-tls
         */
        readonly tls?: CfnCluster.TlsProperty | cdk.IResolvable;
        /**
         * Details for ClientAuthentication using no authentication.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-clientauthentication.html#cfn-msk-cluster-clientauthentication-unauthenticated
         */
        readonly unauthenticated?: CfnCluster.UnauthenticatedProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ClientAuthenticationProperty`
 *
 * @param properties - the TypeScript properties of a `ClientAuthenticationProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_ClientAuthenticationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('sasl', CfnCluster_SaslPropertyValidator)(properties.sasl));
    errors.collect(cdk.propertyValidator('tls', CfnCluster_TlsPropertyValidator)(properties.tls));
    errors.collect(cdk.propertyValidator('unauthenticated', CfnCluster_UnauthenticatedPropertyValidator)(properties.unauthenticated));
    return errors.wrap('supplied properties not correct for "ClientAuthenticationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.ClientAuthentication` resource
 *
 * @param properties - the TypeScript properties of a `ClientAuthenticationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.ClientAuthentication` resource.
 */
// @ts-ignore TS6133
function cfnClusterClientAuthenticationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_ClientAuthenticationPropertyValidator(properties).assertSuccess();
    return {
        Sasl: cfnClusterSaslPropertyToCloudFormation(properties.sasl),
        Tls: cfnClusterTlsPropertyToCloudFormation(properties.tls),
        Unauthenticated: cfnClusterUnauthenticatedPropertyToCloudFormation(properties.unauthenticated),
    };
}

// @ts-ignore TS6133
function CfnClusterClientAuthenticationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.ClientAuthenticationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.ClientAuthenticationProperty>();
    ret.addPropertyResult('sasl', 'Sasl', properties.Sasl != null ? CfnClusterSaslPropertyFromCloudFormation(properties.Sasl) : undefined);
    ret.addPropertyResult('tls', 'Tls', properties.Tls != null ? CfnClusterTlsPropertyFromCloudFormation(properties.Tls) : undefined);
    ret.addPropertyResult('unauthenticated', 'Unauthenticated', properties.Unauthenticated != null ? CfnClusterUnauthenticatedPropertyFromCloudFormation(properties.Unauthenticated) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Details of the CloudWatch Logs destination for broker logs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-cloudwatchlogs.html
     */
    export interface CloudWatchLogsProperty {
        /**
         * Specifies whether broker logs get sent to the specified CloudWatch Logs destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-cloudwatchlogs.html#cfn-msk-cluster-cloudwatchlogs-enabled
         */
        readonly enabled: boolean | cdk.IResolvable;
        /**
         * The CloudWatch Logs group that is the destination for broker logs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-cloudwatchlogs.html#cfn-msk-cluster-cloudwatchlogs-loggroup
         */
        readonly logGroup?: string;
    }
}

/**
 * Determine whether the given properties match those of a `CloudWatchLogsProperty`
 *
 * @param properties - the TypeScript properties of a `CloudWatchLogsProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_CloudWatchLogsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enabled', cdk.requiredValidator)(properties.enabled));
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    errors.collect(cdk.propertyValidator('logGroup', cdk.validateString)(properties.logGroup));
    return errors.wrap('supplied properties not correct for "CloudWatchLogsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.CloudWatchLogs` resource
 *
 * @param properties - the TypeScript properties of a `CloudWatchLogsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.CloudWatchLogs` resource.
 */
// @ts-ignore TS6133
function cfnClusterCloudWatchLogsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_CloudWatchLogsPropertyValidator(properties).assertSuccess();
    return {
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
        LogGroup: cdk.stringToCloudFormation(properties.logGroup),
    };
}

// @ts-ignore TS6133
function CfnClusterCloudWatchLogsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.CloudWatchLogsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.CloudWatchLogsProperty>();
    ret.addPropertyResult('enabled', 'Enabled', cfn_parse.FromCloudFormation.getBoolean(properties.Enabled));
    ret.addPropertyResult('logGroup', 'LogGroup', properties.LogGroup != null ? cfn_parse.FromCloudFormation.getString(properties.LogGroup) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Specifies the Amazon MSK configuration to use for the brokers.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-configurationinfo.html
     */
    export interface ConfigurationInfoProperty {
        /**
         * The Amazon Resource Name (ARN) of the MSK configuration to use. For example, `arn:aws:kafka:us-east-1:123456789012:configuration/example-configuration-name/abcdabcd-1234-abcd-1234-abcd123e8e8e-1` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-configurationinfo.html#cfn-msk-cluster-configurationinfo-arn
         */
        readonly arn: string;
        /**
         * The revision of the Amazon MSK configuration to use.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-configurationinfo.html#cfn-msk-cluster-configurationinfo-revision
         */
        readonly revision: number;
    }
}

/**
 * Determine whether the given properties match those of a `ConfigurationInfoProperty`
 *
 * @param properties - the TypeScript properties of a `ConfigurationInfoProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_ConfigurationInfoPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('arn', cdk.requiredValidator)(properties.arn));
    errors.collect(cdk.propertyValidator('arn', cdk.validateString)(properties.arn));
    errors.collect(cdk.propertyValidator('revision', cdk.requiredValidator)(properties.revision));
    errors.collect(cdk.propertyValidator('revision', cdk.validateNumber)(properties.revision));
    return errors.wrap('supplied properties not correct for "ConfigurationInfoProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.ConfigurationInfo` resource
 *
 * @param properties - the TypeScript properties of a `ConfigurationInfoProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.ConfigurationInfo` resource.
 */
// @ts-ignore TS6133
function cfnClusterConfigurationInfoPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_ConfigurationInfoPropertyValidator(properties).assertSuccess();
    return {
        Arn: cdk.stringToCloudFormation(properties.arn),
        Revision: cdk.numberToCloudFormation(properties.revision),
    };
}

// @ts-ignore TS6133
function CfnClusterConfigurationInfoPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.ConfigurationInfoProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.ConfigurationInfoProperty>();
    ret.addPropertyResult('arn', 'Arn', cfn_parse.FromCloudFormation.getString(properties.Arn));
    ret.addPropertyResult('revision', 'Revision', cfn_parse.FromCloudFormation.getNumber(properties.Revision));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Specifies whether the cluster's brokers are publicly accessible. By default, they are not.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-connectivityinfo.html
     */
    export interface ConnectivityInfoProperty {
        /**
         * Specifies whether the cluster's brokers are accessible from the internet. Public access is off by default.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-connectivityinfo.html#cfn-msk-cluster-connectivityinfo-publicaccess
         */
        readonly publicAccess?: CfnCluster.PublicAccessProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ConnectivityInfoProperty`
 *
 * @param properties - the TypeScript properties of a `ConnectivityInfoProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_ConnectivityInfoPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('publicAccess', CfnCluster_PublicAccessPropertyValidator)(properties.publicAccess));
    return errors.wrap('supplied properties not correct for "ConnectivityInfoProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.ConnectivityInfo` resource
 *
 * @param properties - the TypeScript properties of a `ConnectivityInfoProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.ConnectivityInfo` resource.
 */
// @ts-ignore TS6133
function cfnClusterConnectivityInfoPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_ConnectivityInfoPropertyValidator(properties).assertSuccess();
    return {
        PublicAccess: cfnClusterPublicAccessPropertyToCloudFormation(properties.publicAccess),
    };
}

// @ts-ignore TS6133
function CfnClusterConnectivityInfoPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.ConnectivityInfoProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.ConnectivityInfoProperty>();
    ret.addPropertyResult('publicAccess', 'PublicAccess', properties.PublicAccess != null ? CfnClusterPublicAccessPropertyFromCloudFormation(properties.PublicAccess) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Contains information about the EBS storage volumes attached to brokers.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-ebsstorageinfo.html
     */
    export interface EBSStorageInfoProperty {
        /**
         * Specifies whether provisioned throughput is turned on and the volume throughput target.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-ebsstorageinfo.html#cfn-msk-cluster-ebsstorageinfo-provisionedthroughput
         */
        readonly provisionedThroughput?: CfnCluster.ProvisionedThroughputProperty | cdk.IResolvable;
        /**
         * The size in GiB of the EBS volume for the data drive on each broker node.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-ebsstorageinfo.html#cfn-msk-cluster-ebsstorageinfo-volumesize
         */
        readonly volumeSize?: number;
    }
}

/**
 * Determine whether the given properties match those of a `EBSStorageInfoProperty`
 *
 * @param properties - the TypeScript properties of a `EBSStorageInfoProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_EBSStorageInfoPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('provisionedThroughput', CfnCluster_ProvisionedThroughputPropertyValidator)(properties.provisionedThroughput));
    errors.collect(cdk.propertyValidator('volumeSize', cdk.validateNumber)(properties.volumeSize));
    return errors.wrap('supplied properties not correct for "EBSStorageInfoProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.EBSStorageInfo` resource
 *
 * @param properties - the TypeScript properties of a `EBSStorageInfoProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.EBSStorageInfo` resource.
 */
// @ts-ignore TS6133
function cfnClusterEBSStorageInfoPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_EBSStorageInfoPropertyValidator(properties).assertSuccess();
    return {
        ProvisionedThroughput: cfnClusterProvisionedThroughputPropertyToCloudFormation(properties.provisionedThroughput),
        VolumeSize: cdk.numberToCloudFormation(properties.volumeSize),
    };
}

// @ts-ignore TS6133
function CfnClusterEBSStorageInfoPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.EBSStorageInfoProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.EBSStorageInfoProperty>();
    ret.addPropertyResult('provisionedThroughput', 'ProvisionedThroughput', properties.ProvisionedThroughput != null ? CfnClusterProvisionedThroughputPropertyFromCloudFormation(properties.ProvisionedThroughput) : undefined);
    ret.addPropertyResult('volumeSize', 'VolumeSize', properties.VolumeSize != null ? cfn_parse.FromCloudFormation.getNumber(properties.VolumeSize) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * The data volume encryption details.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-encryptionatrest.html
     */
    export interface EncryptionAtRestProperty {
        /**
         * The ARN of the Amazon KMS key for encrypting data at rest. If you don't specify a KMS key, MSK creates one for you and uses it on your behalf.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-encryptionatrest.html#cfn-msk-cluster-encryptionatrest-datavolumekmskeyid
         */
        readonly dataVolumeKmsKeyId: string;
    }
}

/**
 * Determine whether the given properties match those of a `EncryptionAtRestProperty`
 *
 * @param properties - the TypeScript properties of a `EncryptionAtRestProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_EncryptionAtRestPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataVolumeKmsKeyId', cdk.requiredValidator)(properties.dataVolumeKmsKeyId));
    errors.collect(cdk.propertyValidator('dataVolumeKmsKeyId', cdk.validateString)(properties.dataVolumeKmsKeyId));
    return errors.wrap('supplied properties not correct for "EncryptionAtRestProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.EncryptionAtRest` resource
 *
 * @param properties - the TypeScript properties of a `EncryptionAtRestProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.EncryptionAtRest` resource.
 */
// @ts-ignore TS6133
function cfnClusterEncryptionAtRestPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_EncryptionAtRestPropertyValidator(properties).assertSuccess();
    return {
        DataVolumeKMSKeyId: cdk.stringToCloudFormation(properties.dataVolumeKmsKeyId),
    };
}

// @ts-ignore TS6133
function CfnClusterEncryptionAtRestPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.EncryptionAtRestProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.EncryptionAtRestProperty>();
    ret.addPropertyResult('dataVolumeKmsKeyId', 'DataVolumeKMSKeyId', cfn_parse.FromCloudFormation.getString(properties.DataVolumeKMSKeyId));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * The settings for encrypting data in transit.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-encryptionintransit.html
     */
    export interface EncryptionInTransitProperty {
        /**
         * Indicates the encryption setting for data in transit between clients and brokers. The following are the possible values.
         *
         * - `TLS` means that client-broker communication is enabled with TLS only.
         * - `TLS_PLAINTEXT` means that client-broker communication is enabled for both TLS-encrypted, as well as plain text data.
         * - `PLAINTEXT` means that client-broker communication is enabled in plain text only.
         *
         * The default value is `TLS` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-encryptionintransit.html#cfn-msk-cluster-encryptionintransit-clientbroker
         */
        readonly clientBroker?: string;
        /**
         * When set to true, it indicates that data communication among the broker nodes of the cluster is encrypted. When set to false, the communication happens in plain text. The default value is true.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-encryptionintransit.html#cfn-msk-cluster-encryptionintransit-incluster
         */
        readonly inCluster?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `EncryptionInTransitProperty`
 *
 * @param properties - the TypeScript properties of a `EncryptionInTransitProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_EncryptionInTransitPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clientBroker', cdk.validateString)(properties.clientBroker));
    errors.collect(cdk.propertyValidator('inCluster', cdk.validateBoolean)(properties.inCluster));
    return errors.wrap('supplied properties not correct for "EncryptionInTransitProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.EncryptionInTransit` resource
 *
 * @param properties - the TypeScript properties of a `EncryptionInTransitProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.EncryptionInTransit` resource.
 */
// @ts-ignore TS6133
function cfnClusterEncryptionInTransitPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_EncryptionInTransitPropertyValidator(properties).assertSuccess();
    return {
        ClientBroker: cdk.stringToCloudFormation(properties.clientBroker),
        InCluster: cdk.booleanToCloudFormation(properties.inCluster),
    };
}

// @ts-ignore TS6133
function CfnClusterEncryptionInTransitPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.EncryptionInTransitProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.EncryptionInTransitProperty>();
    ret.addPropertyResult('clientBroker', 'ClientBroker', properties.ClientBroker != null ? cfn_parse.FromCloudFormation.getString(properties.ClientBroker) : undefined);
    ret.addPropertyResult('inCluster', 'InCluster', properties.InCluster != null ? cfn_parse.FromCloudFormation.getBoolean(properties.InCluster) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Includes encryption-related information, such as the Amazon KMS key used for encrypting data at rest and whether you want MSK to encrypt your data in transit.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-encryptioninfo.html
     */
    export interface EncryptionInfoProperty {
        /**
         * The data-volume encryption details.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-encryptioninfo.html#cfn-msk-cluster-encryptioninfo-encryptionatrest
         */
        readonly encryptionAtRest?: CfnCluster.EncryptionAtRestProperty | cdk.IResolvable;
        /**
         * The details for encryption in transit.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-encryptioninfo.html#cfn-msk-cluster-encryptioninfo-encryptionintransit
         */
        readonly encryptionInTransit?: CfnCluster.EncryptionInTransitProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `EncryptionInfoProperty`
 *
 * @param properties - the TypeScript properties of a `EncryptionInfoProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_EncryptionInfoPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('encryptionAtRest', CfnCluster_EncryptionAtRestPropertyValidator)(properties.encryptionAtRest));
    errors.collect(cdk.propertyValidator('encryptionInTransit', CfnCluster_EncryptionInTransitPropertyValidator)(properties.encryptionInTransit));
    return errors.wrap('supplied properties not correct for "EncryptionInfoProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.EncryptionInfo` resource
 *
 * @param properties - the TypeScript properties of a `EncryptionInfoProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.EncryptionInfo` resource.
 */
// @ts-ignore TS6133
function cfnClusterEncryptionInfoPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_EncryptionInfoPropertyValidator(properties).assertSuccess();
    return {
        EncryptionAtRest: cfnClusterEncryptionAtRestPropertyToCloudFormation(properties.encryptionAtRest),
        EncryptionInTransit: cfnClusterEncryptionInTransitPropertyToCloudFormation(properties.encryptionInTransit),
    };
}

// @ts-ignore TS6133
function CfnClusterEncryptionInfoPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.EncryptionInfoProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.EncryptionInfoProperty>();
    ret.addPropertyResult('encryptionAtRest', 'EncryptionAtRest', properties.EncryptionAtRest != null ? CfnClusterEncryptionAtRestPropertyFromCloudFormation(properties.EncryptionAtRest) : undefined);
    ret.addPropertyResult('encryptionInTransit', 'EncryptionInTransit', properties.EncryptionInTransit != null ? CfnClusterEncryptionInTransitPropertyFromCloudFormation(properties.EncryptionInTransit) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Details of the Kinesis Data Firehose delivery stream that is the destination for broker logs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-firehose.html
     */
    export interface FirehoseProperty {
        /**
         * The Kinesis Data Firehose delivery stream that is the destination for broker logs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-firehose.html#cfn-msk-cluster-firehose-deliverystream
         */
        readonly deliveryStream?: string;
        /**
         * Specifies whether broker logs get sent to the specified Kinesis Data Firehose delivery stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-firehose.html#cfn-msk-cluster-firehose-enabled
         */
        readonly enabled: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `FirehoseProperty`
 *
 * @param properties - the TypeScript properties of a `FirehoseProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_FirehosePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('deliveryStream', cdk.validateString)(properties.deliveryStream));
    errors.collect(cdk.propertyValidator('enabled', cdk.requiredValidator)(properties.enabled));
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    return errors.wrap('supplied properties not correct for "FirehoseProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.Firehose` resource
 *
 * @param properties - the TypeScript properties of a `FirehoseProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.Firehose` resource.
 */
// @ts-ignore TS6133
function cfnClusterFirehosePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_FirehosePropertyValidator(properties).assertSuccess();
    return {
        DeliveryStream: cdk.stringToCloudFormation(properties.deliveryStream),
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
    };
}

// @ts-ignore TS6133
function CfnClusterFirehosePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.FirehoseProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.FirehoseProperty>();
    ret.addPropertyResult('deliveryStream', 'DeliveryStream', properties.DeliveryStream != null ? cfn_parse.FromCloudFormation.getString(properties.DeliveryStream) : undefined);
    ret.addPropertyResult('enabled', 'Enabled', cfn_parse.FromCloudFormation.getBoolean(properties.Enabled));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Details for IAM access control.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-iam.html
     */
    export interface IamProperty {
        /**
         * Whether IAM access control is enabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-iam.html#cfn-msk-cluster-iam-enabled
         */
        readonly enabled: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `IamProperty`
 *
 * @param properties - the TypeScript properties of a `IamProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_IamPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enabled', cdk.requiredValidator)(properties.enabled));
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    return errors.wrap('supplied properties not correct for "IamProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.Iam` resource
 *
 * @param properties - the TypeScript properties of a `IamProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.Iam` resource.
 */
// @ts-ignore TS6133
function cfnClusterIamPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_IamPropertyValidator(properties).assertSuccess();
    return {
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
    };
}

// @ts-ignore TS6133
function CfnClusterIamPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.IamProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.IamProperty>();
    ret.addPropertyResult('enabled', 'Enabled', cfn_parse.FromCloudFormation.getBoolean(properties.Enabled));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Indicates whether you want to enable or disable the JMX Exporter.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-jmxexporter.html
     */
    export interface JmxExporterProperty {
        /**
         * Indicates whether you want to enable or disable the JMX Exporter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-jmxexporter.html#cfn-msk-cluster-jmxexporter-enabledinbroker
         */
        readonly enabledInBroker: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `JmxExporterProperty`
 *
 * @param properties - the TypeScript properties of a `JmxExporterProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_JmxExporterPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enabledInBroker', cdk.requiredValidator)(properties.enabledInBroker));
    errors.collect(cdk.propertyValidator('enabledInBroker', cdk.validateBoolean)(properties.enabledInBroker));
    return errors.wrap('supplied properties not correct for "JmxExporterProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.JmxExporter` resource
 *
 * @param properties - the TypeScript properties of a `JmxExporterProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.JmxExporter` resource.
 */
// @ts-ignore TS6133
function cfnClusterJmxExporterPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_JmxExporterPropertyValidator(properties).assertSuccess();
    return {
        EnabledInBroker: cdk.booleanToCloudFormation(properties.enabledInBroker),
    };
}

// @ts-ignore TS6133
function CfnClusterJmxExporterPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.JmxExporterProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.JmxExporterProperty>();
    ret.addPropertyResult('enabledInBroker', 'EnabledInBroker', cfn_parse.FromCloudFormation.getBoolean(properties.EnabledInBroker));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * You can configure your Amazon MSK cluster to send broker logs to different destination types. This is a container for the configuration details related to broker logs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-logginginfo.html
     */
    export interface LoggingInfoProperty {
        /**
         * You can configure your Amazon MSK cluster to send broker logs to different destination types. This configuration specifies the details of these destinations.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-logginginfo.html#cfn-msk-cluster-logginginfo-brokerlogs
         */
        readonly brokerLogs: CfnCluster.BrokerLogsProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `LoggingInfoProperty`
 *
 * @param properties - the TypeScript properties of a `LoggingInfoProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_LoggingInfoPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('brokerLogs', cdk.requiredValidator)(properties.brokerLogs));
    errors.collect(cdk.propertyValidator('brokerLogs', CfnCluster_BrokerLogsPropertyValidator)(properties.brokerLogs));
    return errors.wrap('supplied properties not correct for "LoggingInfoProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.LoggingInfo` resource
 *
 * @param properties - the TypeScript properties of a `LoggingInfoProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.LoggingInfo` resource.
 */
// @ts-ignore TS6133
function cfnClusterLoggingInfoPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_LoggingInfoPropertyValidator(properties).assertSuccess();
    return {
        BrokerLogs: cfnClusterBrokerLogsPropertyToCloudFormation(properties.brokerLogs),
    };
}

// @ts-ignore TS6133
function CfnClusterLoggingInfoPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.LoggingInfoProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.LoggingInfoProperty>();
    ret.addPropertyResult('brokerLogs', 'BrokerLogs', CfnClusterBrokerLogsPropertyFromCloudFormation(properties.BrokerLogs));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Indicates whether you want to enable or disable the Node Exporter.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-nodeexporter.html
     */
    export interface NodeExporterProperty {
        /**
         * Indicates whether you want to enable or disable the Node Exporter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-nodeexporter.html#cfn-msk-cluster-nodeexporter-enabledinbroker
         */
        readonly enabledInBroker: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `NodeExporterProperty`
 *
 * @param properties - the TypeScript properties of a `NodeExporterProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_NodeExporterPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enabledInBroker', cdk.requiredValidator)(properties.enabledInBroker));
    errors.collect(cdk.propertyValidator('enabledInBroker', cdk.validateBoolean)(properties.enabledInBroker));
    return errors.wrap('supplied properties not correct for "NodeExporterProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.NodeExporter` resource
 *
 * @param properties - the TypeScript properties of a `NodeExporterProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.NodeExporter` resource.
 */
// @ts-ignore TS6133
function cfnClusterNodeExporterPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_NodeExporterPropertyValidator(properties).assertSuccess();
    return {
        EnabledInBroker: cdk.booleanToCloudFormation(properties.enabledInBroker),
    };
}

// @ts-ignore TS6133
function CfnClusterNodeExporterPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.NodeExporterProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.NodeExporterProperty>();
    ret.addPropertyResult('enabledInBroker', 'EnabledInBroker', cfn_parse.FromCloudFormation.getBoolean(properties.EnabledInBroker));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * JMX and Node monitoring for the MSK cluster.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-openmonitoring.html
     */
    export interface OpenMonitoringProperty {
        /**
         * Prometheus exporter settings.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-openmonitoring.html#cfn-msk-cluster-openmonitoring-prometheus
         */
        readonly prometheus: CfnCluster.PrometheusProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `OpenMonitoringProperty`
 *
 * @param properties - the TypeScript properties of a `OpenMonitoringProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_OpenMonitoringPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('prometheus', cdk.requiredValidator)(properties.prometheus));
    errors.collect(cdk.propertyValidator('prometheus', CfnCluster_PrometheusPropertyValidator)(properties.prometheus));
    return errors.wrap('supplied properties not correct for "OpenMonitoringProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.OpenMonitoring` resource
 *
 * @param properties - the TypeScript properties of a `OpenMonitoringProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.OpenMonitoring` resource.
 */
// @ts-ignore TS6133
function cfnClusterOpenMonitoringPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_OpenMonitoringPropertyValidator(properties).assertSuccess();
    return {
        Prometheus: cfnClusterPrometheusPropertyToCloudFormation(properties.prometheus),
    };
}

// @ts-ignore TS6133
function CfnClusterOpenMonitoringPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.OpenMonitoringProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.OpenMonitoringProperty>();
    ret.addPropertyResult('prometheus', 'Prometheus', CfnClusterPrometheusPropertyFromCloudFormation(properties.Prometheus));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Prometheus settings for open monitoring.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-prometheus.html
     */
    export interface PrometheusProperty {
        /**
         * Indicates whether you want to enable or disable the JMX Exporter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-prometheus.html#cfn-msk-cluster-prometheus-jmxexporter
         */
        readonly jmxExporter?: CfnCluster.JmxExporterProperty | cdk.IResolvable;
        /**
         * Indicates whether you want to enable or disable the Node Exporter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-prometheus.html#cfn-msk-cluster-prometheus-nodeexporter
         */
        readonly nodeExporter?: CfnCluster.NodeExporterProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `PrometheusProperty`
 *
 * @param properties - the TypeScript properties of a `PrometheusProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_PrometheusPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('jmxExporter', CfnCluster_JmxExporterPropertyValidator)(properties.jmxExporter));
    errors.collect(cdk.propertyValidator('nodeExporter', CfnCluster_NodeExporterPropertyValidator)(properties.nodeExporter));
    return errors.wrap('supplied properties not correct for "PrometheusProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.Prometheus` resource
 *
 * @param properties - the TypeScript properties of a `PrometheusProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.Prometheus` resource.
 */
// @ts-ignore TS6133
function cfnClusterPrometheusPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_PrometheusPropertyValidator(properties).assertSuccess();
    return {
        JmxExporter: cfnClusterJmxExporterPropertyToCloudFormation(properties.jmxExporter),
        NodeExporter: cfnClusterNodeExporterPropertyToCloudFormation(properties.nodeExporter),
    };
}

// @ts-ignore TS6133
function CfnClusterPrometheusPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.PrometheusProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.PrometheusProperty>();
    ret.addPropertyResult('jmxExporter', 'JmxExporter', properties.JmxExporter != null ? CfnClusterJmxExporterPropertyFromCloudFormation(properties.JmxExporter) : undefined);
    ret.addPropertyResult('nodeExporter', 'NodeExporter', properties.NodeExporter != null ? CfnClusterNodeExporterPropertyFromCloudFormation(properties.NodeExporter) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Specifies whether provisioned throughput is turned on and the volume throughput target.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-provisionedthroughput.html
     */
    export interface ProvisionedThroughputProperty {
        /**
         * Specifies whether provisioned throughput is turned on for the cluster.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-provisionedthroughput.html#cfn-msk-cluster-provisionedthroughput-enabled
         */
        readonly enabled?: boolean | cdk.IResolvable;
        /**
         * The provisioned throughput rate in MiB per second.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-provisionedthroughput.html#cfn-msk-cluster-provisionedthroughput-volumethroughput
         */
        readonly volumeThroughput?: number;
    }
}

/**
 * Determine whether the given properties match those of a `ProvisionedThroughputProperty`
 *
 * @param properties - the TypeScript properties of a `ProvisionedThroughputProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_ProvisionedThroughputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    errors.collect(cdk.propertyValidator('volumeThroughput', cdk.validateNumber)(properties.volumeThroughput));
    return errors.wrap('supplied properties not correct for "ProvisionedThroughputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.ProvisionedThroughput` resource
 *
 * @param properties - the TypeScript properties of a `ProvisionedThroughputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.ProvisionedThroughput` resource.
 */
// @ts-ignore TS6133
function cfnClusterProvisionedThroughputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_ProvisionedThroughputPropertyValidator(properties).assertSuccess();
    return {
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
        VolumeThroughput: cdk.numberToCloudFormation(properties.volumeThroughput),
    };
}

// @ts-ignore TS6133
function CfnClusterProvisionedThroughputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.ProvisionedThroughputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.ProvisionedThroughputProperty>();
    ret.addPropertyResult('enabled', 'Enabled', properties.Enabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enabled) : undefined);
    ret.addPropertyResult('volumeThroughput', 'VolumeThroughput', properties.VolumeThroughput != null ? cfn_parse.FromCloudFormation.getNumber(properties.VolumeThroughput) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Specifies whether the cluster's brokers are accessible from the internet. Public access is off by default.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-publicaccess.html
     */
    export interface PublicAccessProperty {
        /**
         * Set to `DISABLED` to turn off public access or to `SERVICE_PROVIDED_EIPS` to turn it on. Public access if off by default.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-publicaccess.html#cfn-msk-cluster-publicaccess-type
         */
        readonly type?: string;
    }
}

/**
 * Determine whether the given properties match those of a `PublicAccessProperty`
 *
 * @param properties - the TypeScript properties of a `PublicAccessProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_PublicAccessPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "PublicAccessProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.PublicAccess` resource
 *
 * @param properties - the TypeScript properties of a `PublicAccessProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.PublicAccess` resource.
 */
// @ts-ignore TS6133
function cfnClusterPublicAccessPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_PublicAccessPropertyValidator(properties).assertSuccess();
    return {
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnClusterPublicAccessPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.PublicAccessProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.PublicAccessProperty>();
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * The details of the Amazon S3 destination for broker logs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-s3.html
     */
    export interface S3Property {
        /**
         * The name of the S3 bucket that is the destination for broker logs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-s3.html#cfn-msk-cluster-s3-bucket
         */
        readonly bucket?: string;
        /**
         * Specifies whether broker logs get sent to the specified Amazon S3 destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-s3.html#cfn-msk-cluster-s3-enabled
         */
        readonly enabled: boolean | cdk.IResolvable;
        /**
         * The S3 prefix that is the destination for broker logs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-s3.html#cfn-msk-cluster-s3-prefix
         */
        readonly prefix?: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3Property`
 *
 * @param properties - the TypeScript properties of a `S3Property`
 *
 * @returns the result of the validation.
 */
function CfnCluster_S3PropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucket', cdk.validateString)(properties.bucket));
    errors.collect(cdk.propertyValidator('enabled', cdk.requiredValidator)(properties.enabled));
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    errors.collect(cdk.propertyValidator('prefix', cdk.validateString)(properties.prefix));
    return errors.wrap('supplied properties not correct for "S3Property"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.S3` resource
 *
 * @param properties - the TypeScript properties of a `S3Property`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.S3` resource.
 */
// @ts-ignore TS6133
function cfnClusterS3PropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_S3PropertyValidator(properties).assertSuccess();
    return {
        Bucket: cdk.stringToCloudFormation(properties.bucket),
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
        Prefix: cdk.stringToCloudFormation(properties.prefix),
    };
}

// @ts-ignore TS6133
function CfnClusterS3PropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.S3Property | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.S3Property>();
    ret.addPropertyResult('bucket', 'Bucket', properties.Bucket != null ? cfn_parse.FromCloudFormation.getString(properties.Bucket) : undefined);
    ret.addPropertyResult('enabled', 'Enabled', cfn_parse.FromCloudFormation.getBoolean(properties.Enabled));
    ret.addPropertyResult('prefix', 'Prefix', properties.Prefix != null ? cfn_parse.FromCloudFormation.getString(properties.Prefix) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Details for client authentication using SASL. To turn on SASL, you must also turn on `EncryptionInTransit` by setting `inCluster` to true. You must set `clientBroker` to either `TLS` or `TLS_PLAINTEXT` . If you choose `TLS_PLAINTEXT` , then you must also set `unauthenticated` to true.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-sasl.html
     */
    export interface SaslProperty {
        /**
         * Details for IAM access control.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-sasl.html#cfn-msk-cluster-sasl-iam
         */
        readonly iam?: CfnCluster.IamProperty | cdk.IResolvable;
        /**
         * Details for SASL/SCRAM client authentication.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-sasl.html#cfn-msk-cluster-sasl-scram
         */
        readonly scram?: CfnCluster.ScramProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SaslProperty`
 *
 * @param properties - the TypeScript properties of a `SaslProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_SaslPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('iam', CfnCluster_IamPropertyValidator)(properties.iam));
    errors.collect(cdk.propertyValidator('scram', CfnCluster_ScramPropertyValidator)(properties.scram));
    return errors.wrap('supplied properties not correct for "SaslProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.Sasl` resource
 *
 * @param properties - the TypeScript properties of a `SaslProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.Sasl` resource.
 */
// @ts-ignore TS6133
function cfnClusterSaslPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_SaslPropertyValidator(properties).assertSuccess();
    return {
        Iam: cfnClusterIamPropertyToCloudFormation(properties.iam),
        Scram: cfnClusterScramPropertyToCloudFormation(properties.scram),
    };
}

// @ts-ignore TS6133
function CfnClusterSaslPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.SaslProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.SaslProperty>();
    ret.addPropertyResult('iam', 'Iam', properties.Iam != null ? CfnClusterIamPropertyFromCloudFormation(properties.Iam) : undefined);
    ret.addPropertyResult('scram', 'Scram', properties.Scram != null ? CfnClusterScramPropertyFromCloudFormation(properties.Scram) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Details for SASL/SCRAM client authentication.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-scram.html
     */
    export interface ScramProperty {
        /**
         * SASL/SCRAM authentication is enabled or not.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-scram.html#cfn-msk-cluster-scram-enabled
         */
        readonly enabled: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ScramProperty`
 *
 * @param properties - the TypeScript properties of a `ScramProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_ScramPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enabled', cdk.requiredValidator)(properties.enabled));
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    return errors.wrap('supplied properties not correct for "ScramProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.Scram` resource
 *
 * @param properties - the TypeScript properties of a `ScramProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.Scram` resource.
 */
// @ts-ignore TS6133
function cfnClusterScramPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_ScramPropertyValidator(properties).assertSuccess();
    return {
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
    };
}

// @ts-ignore TS6133
function CfnClusterScramPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.ScramProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.ScramProperty>();
    ret.addPropertyResult('enabled', 'Enabled', cfn_parse.FromCloudFormation.getBoolean(properties.Enabled));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Contains information about storage volumes attached to MSK broker nodes.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-storageinfo.html
     */
    export interface StorageInfoProperty {
        /**
         * EBS volume information.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-storageinfo.html#cfn-msk-cluster-storageinfo-ebsstorageinfo
         */
        readonly ebsStorageInfo?: CfnCluster.EBSStorageInfoProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `StorageInfoProperty`
 *
 * @param properties - the TypeScript properties of a `StorageInfoProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_StorageInfoPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('ebsStorageInfo', CfnCluster_EBSStorageInfoPropertyValidator)(properties.ebsStorageInfo));
    return errors.wrap('supplied properties not correct for "StorageInfoProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.StorageInfo` resource
 *
 * @param properties - the TypeScript properties of a `StorageInfoProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.StorageInfo` resource.
 */
// @ts-ignore TS6133
function cfnClusterStorageInfoPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_StorageInfoPropertyValidator(properties).assertSuccess();
    return {
        EBSStorageInfo: cfnClusterEBSStorageInfoPropertyToCloudFormation(properties.ebsStorageInfo),
    };
}

// @ts-ignore TS6133
function CfnClusterStorageInfoPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.StorageInfoProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.StorageInfoProperty>();
    ret.addPropertyResult('ebsStorageInfo', 'EBSStorageInfo', properties.EBSStorageInfo != null ? CfnClusterEBSStorageInfoPropertyFromCloudFormation(properties.EBSStorageInfo) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Details for client authentication using TLS.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-tls.html
     */
    export interface TlsProperty {
        /**
         * List of ACM Certificate Authority ARNs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-tls.html#cfn-msk-cluster-tls-certificateauthorityarnlist
         */
        readonly certificateAuthorityArnList?: string[];
        /**
         * TLS authentication is enabled or not.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-tls.html#cfn-msk-cluster-tls-enabled
         */
        readonly enabled?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `TlsProperty`
 *
 * @param properties - the TypeScript properties of a `TlsProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_TlsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('certificateAuthorityArnList', cdk.listValidator(cdk.validateString))(properties.certificateAuthorityArnList));
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    return errors.wrap('supplied properties not correct for "TlsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.Tls` resource
 *
 * @param properties - the TypeScript properties of a `TlsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.Tls` resource.
 */
// @ts-ignore TS6133
function cfnClusterTlsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_TlsPropertyValidator(properties).assertSuccess();
    return {
        CertificateAuthorityArnList: cdk.listMapper(cdk.stringToCloudFormation)(properties.certificateAuthorityArnList),
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
    };
}

// @ts-ignore TS6133
function CfnClusterTlsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.TlsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.TlsProperty>();
    ret.addPropertyResult('certificateAuthorityArnList', 'CertificateAuthorityArnList', properties.CertificateAuthorityArnList != null ? cfn_parse.FromCloudFormation.getStringArray(properties.CertificateAuthorityArnList) : undefined);
    ret.addPropertyResult('enabled', 'Enabled', properties.Enabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enabled) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Details for allowing no client authentication.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-unauthenticated.html
     */
    export interface UnauthenticatedProperty {
        /**
         * Unauthenticated is enabled or not.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-msk-cluster-unauthenticated.html#cfn-msk-cluster-unauthenticated-enabled
         */
        readonly enabled: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `UnauthenticatedProperty`
 *
 * @param properties - the TypeScript properties of a `UnauthenticatedProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_UnauthenticatedPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enabled', cdk.requiredValidator)(properties.enabled));
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    return errors.wrap('supplied properties not correct for "UnauthenticatedProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Cluster.Unauthenticated` resource
 *
 * @param properties - the TypeScript properties of a `UnauthenticatedProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Cluster.Unauthenticated` resource.
 */
// @ts-ignore TS6133
function cfnClusterUnauthenticatedPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_UnauthenticatedPropertyValidator(properties).assertSuccess();
    return {
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
    };
}

// @ts-ignore TS6133
function CfnClusterUnauthenticatedPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.UnauthenticatedProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.UnauthenticatedProperty>();
    ret.addPropertyResult('enabled', 'Enabled', cfn_parse.FromCloudFormation.getBoolean(properties.Enabled));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnConfiguration`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-configuration.html
 */
export interface CfnConfigurationProps {

    /**
     * Contents of the server.properties file. When using the API, you must ensure that the contents of the file are base64 encoded. When using the console, the SDK, or the CLI, the contents of server.properties can be in plaintext.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-configuration.html#cfn-msk-configuration-serverproperties
     */
    readonly serverProperties: string;

    /**
     * The description of the configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-configuration.html#cfn-msk-configuration-description
     */
    readonly description?: string;

    /**
     * A list of the versions of Apache Kafka with which you can use this MSK configuration. You can use this configuration for an MSK cluster only if the Apache Kafka version specified for the cluster appears in this list.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-configuration.html#cfn-msk-configuration-kafkaversionslist
     */
    readonly kafkaVersionsList?: string[];

    /**
     * The name of the configuration. Configuration names are strings that match the regex "^[0-9A-Za-z][0-9A-Za-z-]{0,}$".
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-configuration.html#cfn-msk-configuration-name
     */
    readonly name?: string;
}

/**
 * Determine whether the given properties match those of a `CfnConfigurationProps`
 *
 * @param properties - the TypeScript properties of a `CfnConfigurationProps`
 *
 * @returns the result of the validation.
 */
function CfnConfigurationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('kafkaVersionsList', cdk.listValidator(cdk.validateString))(properties.kafkaVersionsList));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('serverProperties', cdk.requiredValidator)(properties.serverProperties));
    errors.collect(cdk.propertyValidator('serverProperties', cdk.validateString)(properties.serverProperties));
    return errors.wrap('supplied properties not correct for "CfnConfigurationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MSK::Configuration` resource
 *
 * @param properties - the TypeScript properties of a `CfnConfigurationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MSK::Configuration` resource.
 */
// @ts-ignore TS6133
function cfnConfigurationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConfigurationPropsValidator(properties).assertSuccess();
    return {
        ServerProperties: cdk.stringToCloudFormation(properties.serverProperties),
        Description: cdk.stringToCloudFormation(properties.description),
        KafkaVersionsList: cdk.listMapper(cdk.stringToCloudFormation)(properties.kafkaVersionsList),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnConfigurationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConfigurationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConfigurationProps>();
    ret.addPropertyResult('serverProperties', 'ServerProperties', cfn_parse.FromCloudFormation.getString(properties.ServerProperties));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('kafkaVersionsList', 'KafkaVersionsList', properties.KafkaVersionsList != null ? cfn_parse.FromCloudFormation.getStringArray(properties.KafkaVersionsList) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::MSK::Configuration`
 *
 * Creates a new MSK configuration.
 *
 * @cloudformationResource AWS::MSK::Configuration
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-configuration.html
 */
export class CfnConfiguration extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::MSK::Configuration";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnConfiguration {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnConfigurationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnConfiguration(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the configuration.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * Contents of the server.properties file. When using the API, you must ensure that the contents of the file are base64 encoded. When using the console, the SDK, or the CLI, the contents of server.properties can be in plaintext.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-configuration.html#cfn-msk-configuration-serverproperties
     */
    public serverProperties: string;

    /**
     * The description of the configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-configuration.html#cfn-msk-configuration-description
     */
    public description: string | undefined;

    /**
     * A list of the versions of Apache Kafka with which you can use this MSK configuration. You can use this configuration for an MSK cluster only if the Apache Kafka version specified for the cluster appears in this list.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-configuration.html#cfn-msk-configuration-kafkaversionslist
     */
    public kafkaVersionsList: string[] | undefined;

    /**
     * The name of the configuration. Configuration names are strings that match the regex "^[0-9A-Za-z][0-9A-Za-z-]{0,}$".
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-configuration.html#cfn-msk-configuration-name
     */
    public name: string | undefined;

    /**
     * Create a new `AWS::MSK::Configuration`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnConfigurationProps) {
        super(scope, id, { type: CfnConfiguration.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'serverProperties', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.serverProperties = props.serverProperties;
        this.description = props.description;
        this.kafkaVersionsList = props.kafkaVersionsList;
        this.name = props.name;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnConfiguration.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            serverProperties: this.serverProperties,
            description: this.description,
            kafkaVersionsList: this.kafkaVersionsList,
            name: this.name,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnConfigurationPropsToCloudFormation(props);
    }
}
