// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:06.709Z","fingerprint":"aTEJVb2Xj68hyMuycpgFZtC/4BVwmC3RHAYrPlBcC9o="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnObservabilityConfiguration`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-observabilityconfiguration.html
 */
export interface CfnObservabilityConfigurationProps {

    /**
     * A name for the observability configuration. When you use it for the first time in an AWS Region , App Runner creates revision number `1` of this name. When you use the same name in subsequent calls, App Runner creates incremental revisions of the configuration.
     *
     * > The name `DefaultConfiguration` is reserved. You can't use it to create a new observability configuration, and you can't create a revision of it.
     * >
     * > When you want to use your own observability configuration for your App Runner service, *create a configuration with a different name* , and then provide it when you create or update your service.
     *
     * If you don't specify a name, AWS CloudFormation generates a name for your observability configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-observabilityconfiguration.html#cfn-apprunner-observabilityconfiguration-observabilityconfigurationname
     */
    readonly observabilityConfigurationName?: string;

    /**
     * A list of metadata items that you can associate with your observability configuration resource. A tag is a key-value pair.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-observabilityconfiguration.html#cfn-apprunner-observabilityconfiguration-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The configuration of the tracing feature within this observability configuration. If you don't specify it, App Runner doesn't enable tracing.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-observabilityconfiguration.html#cfn-apprunner-observabilityconfiguration-traceconfiguration
     */
    readonly traceConfiguration?: CfnObservabilityConfiguration.TraceConfigurationProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnObservabilityConfigurationProps`
 *
 * @param properties - the TypeScript properties of a `CfnObservabilityConfigurationProps`
 *
 * @returns the result of the validation.
 */
function CfnObservabilityConfigurationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('observabilityConfigurationName', cdk.validateString)(properties.observabilityConfigurationName));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('traceConfiguration', CfnObservabilityConfiguration_TraceConfigurationPropertyValidator)(properties.traceConfiguration));
    return errors.wrap('supplied properties not correct for "CfnObservabilityConfigurationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::ObservabilityConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CfnObservabilityConfigurationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::ObservabilityConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnObservabilityConfigurationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnObservabilityConfigurationPropsValidator(properties).assertSuccess();
    return {
        ObservabilityConfigurationName: cdk.stringToCloudFormation(properties.observabilityConfigurationName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        TraceConfiguration: cfnObservabilityConfigurationTraceConfigurationPropertyToCloudFormation(properties.traceConfiguration),
    };
}

// @ts-ignore TS6133
function CfnObservabilityConfigurationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnObservabilityConfigurationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnObservabilityConfigurationProps>();
    ret.addPropertyResult('observabilityConfigurationName', 'ObservabilityConfigurationName', properties.ObservabilityConfigurationName != null ? cfn_parse.FromCloudFormation.getString(properties.ObservabilityConfigurationName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('traceConfiguration', 'TraceConfiguration', properties.TraceConfiguration != null ? CfnObservabilityConfigurationTraceConfigurationPropertyFromCloudFormation(properties.TraceConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppRunner::ObservabilityConfiguration`
 *
 * Specify an AWS App Runner observability configuration by using the `AWS::AppRunner::ObservabilityConfiguration` resource in an AWS CloudFormation template.
 *
 * The `AWS::AppRunner::ObservabilityConfiguration` resource is an AWS App Runner resource type that specifies an App Runner observability configuration.
 *
 * App Runner requires this resource when you specify App Runner services and you want to enable non-default observability features. You can share an observability configuration across multiple services.
 *
 * Create multiple revisions of a configuration by specifying this resource multiple times using the same `ObservabilityConfigurationName` . App Runner creates multiple resources with incremental `ObservabilityConfigurationRevision` values. When you specify a service and configure an observability configuration resource, the service uses the latest active revision of the observability configuration by default. You can optionally configure the service to use a specific revision.
 *
 * The observability configuration resource is designed to configure multiple features (currently one feature, tracing). This resource takes optional parameters that describe the configuration of these features (currently one parameter, `TraceConfiguration` ). If you don't specify a feature parameter, App Runner doesn't enable the feature.
 *
 * @cloudformationResource AWS::AppRunner::ObservabilityConfiguration
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-observabilityconfiguration.html
 */
export class CfnObservabilityConfiguration extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppRunner::ObservabilityConfiguration";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnObservabilityConfiguration {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnObservabilityConfigurationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnObservabilityConfiguration(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * It's set to `true` for the configuration with the highest `Revision` among all configurations that share the same `ObservabilityConfigurationName` . It's set to `false` otherwise.
     * @cloudformationAttribute Latest
     */
    public readonly attrLatest: cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of this observability configuration.
     * @cloudformationAttribute ObservabilityConfigurationArn
     */
    public readonly attrObservabilityConfigurationArn: string;

    /**
     * The revision of this observability configuration. It's unique among all the active configurations ( `"Status": "ACTIVE"` ) that share the same `ObservabilityConfigurationName` .
     * @cloudformationAttribute ObservabilityConfigurationRevision
     */
    public readonly attrObservabilityConfigurationRevision: number;

    /**
     * A name for the observability configuration. When you use it for the first time in an AWS Region , App Runner creates revision number `1` of this name. When you use the same name in subsequent calls, App Runner creates incremental revisions of the configuration.
     *
     * > The name `DefaultConfiguration` is reserved. You can't use it to create a new observability configuration, and you can't create a revision of it.
     * >
     * > When you want to use your own observability configuration for your App Runner service, *create a configuration with a different name* , and then provide it when you create or update your service.
     *
     * If you don't specify a name, AWS CloudFormation generates a name for your observability configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-observabilityconfiguration.html#cfn-apprunner-observabilityconfiguration-observabilityconfigurationname
     */
    public observabilityConfigurationName: string | undefined;

    /**
     * A list of metadata items that you can associate with your observability configuration resource. A tag is a key-value pair.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-observabilityconfiguration.html#cfn-apprunner-observabilityconfiguration-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The configuration of the tracing feature within this observability configuration. If you don't specify it, App Runner doesn't enable tracing.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-observabilityconfiguration.html#cfn-apprunner-observabilityconfiguration-traceconfiguration
     */
    public traceConfiguration: CfnObservabilityConfiguration.TraceConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::AppRunner::ObservabilityConfiguration`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnObservabilityConfigurationProps = {}) {
        super(scope, id, { type: CfnObservabilityConfiguration.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrLatest = this.getAtt('Latest');
        this.attrObservabilityConfigurationArn = cdk.Token.asString(this.getAtt('ObservabilityConfigurationArn'));
        this.attrObservabilityConfigurationRevision = cdk.Token.asNumber(this.getAtt('ObservabilityConfigurationRevision'));

        this.observabilityConfigurationName = props.observabilityConfigurationName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::AppRunner::ObservabilityConfiguration", props.tags, { tagPropertyName: 'tags' });
        this.traceConfiguration = props.traceConfiguration;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnObservabilityConfiguration.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            observabilityConfigurationName: this.observabilityConfigurationName,
            tags: this.tags.renderTags(),
            traceConfiguration: this.traceConfiguration,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnObservabilityConfigurationPropsToCloudFormation(props);
    }
}

export namespace CfnObservabilityConfiguration {
    /**
     * Describes the configuration of the tracing feature within an AWS App Runner observability configuration.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-observabilityconfiguration-traceconfiguration.html
     */
    export interface TraceConfigurationProperty {
        /**
         * The implementation provider chosen for tracing App Runner services.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-observabilityconfiguration-traceconfiguration.html#cfn-apprunner-observabilityconfiguration-traceconfiguration-vendor
         */
        readonly vendor: string;
    }
}

/**
 * Determine whether the given properties match those of a `TraceConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `TraceConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnObservabilityConfiguration_TraceConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('vendor', cdk.requiredValidator)(properties.vendor));
    errors.collect(cdk.propertyValidator('vendor', cdk.validateString)(properties.vendor));
    return errors.wrap('supplied properties not correct for "TraceConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::ObservabilityConfiguration.TraceConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `TraceConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::ObservabilityConfiguration.TraceConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnObservabilityConfigurationTraceConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnObservabilityConfiguration_TraceConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Vendor: cdk.stringToCloudFormation(properties.vendor),
    };
}

// @ts-ignore TS6133
function CfnObservabilityConfigurationTraceConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnObservabilityConfiguration.TraceConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnObservabilityConfiguration.TraceConfigurationProperty>();
    ret.addPropertyResult('vendor', 'Vendor', cfn_parse.FromCloudFormation.getString(properties.Vendor));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnService`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html
 */
export interface CfnServiceProps {

    /**
     * The source to deploy to the App Runner service. It can be a code or an image repository.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-sourceconfiguration
     */
    readonly sourceConfiguration: CfnService.SourceConfigurationProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of an App Runner automatic scaling configuration resource that you want to associate with your service. If not provided, App Runner associates the latest revision of a default auto scaling configuration.
     *
     * Specify an ARN with a name and a revision number to associate that revision. For example: `arn:aws:apprunner:us-east-1:123456789012:autoscalingconfiguration/high-availability/3`
     *
     * Specify just the name to associate the latest revision. For example: `arn:aws:apprunner:us-east-1:123456789012:autoscalingconfiguration/high-availability`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-autoscalingconfigurationarn
     */
    readonly autoScalingConfigurationArn?: string;

    /**
     * An optional custom encryption key that App Runner uses to encrypt the copy of your source repository that it maintains and your service logs. By default, App Runner uses an AWS managed key .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-encryptionconfiguration
     */
    readonly encryptionConfiguration?: CfnService.EncryptionConfigurationProperty | cdk.IResolvable;

    /**
     * The settings for the health check that AWS App Runner performs to monitor the health of the App Runner service.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-healthcheckconfiguration
     */
    readonly healthCheckConfiguration?: CfnService.HealthCheckConfigurationProperty | cdk.IResolvable;

    /**
     * The runtime configuration of instances (scaling units) of your service.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-instanceconfiguration
     */
    readonly instanceConfiguration?: CfnService.InstanceConfigurationProperty | cdk.IResolvable;

    /**
     * Configuration settings related to network traffic of the web application that the App Runner service runs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-networkconfiguration
     */
    readonly networkConfiguration?: CfnService.NetworkConfigurationProperty | cdk.IResolvable;

    /**
     * The observability configuration of your service.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-observabilityconfiguration
     */
    readonly observabilityConfiguration?: CfnService.ServiceObservabilityConfigurationProperty | cdk.IResolvable;

    /**
     * A name for the App Runner service. It must be unique across all the running App Runner services in your AWS account in the AWS Region .
     *
     * If you don't specify a name, AWS CloudFormation generates a name for your service.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-servicename
     */
    readonly serviceName?: string;

    /**
     * An optional list of metadata items that you can associate with the App Runner service resource. A tag is a key-value pair.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnServiceProps`
 *
 * @param properties - the TypeScript properties of a `CfnServiceProps`
 *
 * @returns the result of the validation.
 */
function CfnServicePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('autoScalingConfigurationArn', cdk.validateString)(properties.autoScalingConfigurationArn));
    errors.collect(cdk.propertyValidator('encryptionConfiguration', CfnService_EncryptionConfigurationPropertyValidator)(properties.encryptionConfiguration));
    errors.collect(cdk.propertyValidator('healthCheckConfiguration', CfnService_HealthCheckConfigurationPropertyValidator)(properties.healthCheckConfiguration));
    errors.collect(cdk.propertyValidator('instanceConfiguration', CfnService_InstanceConfigurationPropertyValidator)(properties.instanceConfiguration));
    errors.collect(cdk.propertyValidator('networkConfiguration', CfnService_NetworkConfigurationPropertyValidator)(properties.networkConfiguration));
    errors.collect(cdk.propertyValidator('observabilityConfiguration', CfnService_ServiceObservabilityConfigurationPropertyValidator)(properties.observabilityConfiguration));
    errors.collect(cdk.propertyValidator('serviceName', cdk.validateString)(properties.serviceName));
    errors.collect(cdk.propertyValidator('sourceConfiguration', cdk.requiredValidator)(properties.sourceConfiguration));
    errors.collect(cdk.propertyValidator('sourceConfiguration', CfnService_SourceConfigurationPropertyValidator)(properties.sourceConfiguration));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnServiceProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service` resource
 *
 * @param properties - the TypeScript properties of a `CfnServiceProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service` resource.
 */
// @ts-ignore TS6133
function cfnServicePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnServicePropsValidator(properties).assertSuccess();
    return {
        SourceConfiguration: cfnServiceSourceConfigurationPropertyToCloudFormation(properties.sourceConfiguration),
        AutoScalingConfigurationArn: cdk.stringToCloudFormation(properties.autoScalingConfigurationArn),
        EncryptionConfiguration: cfnServiceEncryptionConfigurationPropertyToCloudFormation(properties.encryptionConfiguration),
        HealthCheckConfiguration: cfnServiceHealthCheckConfigurationPropertyToCloudFormation(properties.healthCheckConfiguration),
        InstanceConfiguration: cfnServiceInstanceConfigurationPropertyToCloudFormation(properties.instanceConfiguration),
        NetworkConfiguration: cfnServiceNetworkConfigurationPropertyToCloudFormation(properties.networkConfiguration),
        ObservabilityConfiguration: cfnServiceServiceObservabilityConfigurationPropertyToCloudFormation(properties.observabilityConfiguration),
        ServiceName: cdk.stringToCloudFormation(properties.serviceName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnServicePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnServiceProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnServiceProps>();
    ret.addPropertyResult('sourceConfiguration', 'SourceConfiguration', CfnServiceSourceConfigurationPropertyFromCloudFormation(properties.SourceConfiguration));
    ret.addPropertyResult('autoScalingConfigurationArn', 'AutoScalingConfigurationArn', properties.AutoScalingConfigurationArn != null ? cfn_parse.FromCloudFormation.getString(properties.AutoScalingConfigurationArn) : undefined);
    ret.addPropertyResult('encryptionConfiguration', 'EncryptionConfiguration', properties.EncryptionConfiguration != null ? CfnServiceEncryptionConfigurationPropertyFromCloudFormation(properties.EncryptionConfiguration) : undefined);
    ret.addPropertyResult('healthCheckConfiguration', 'HealthCheckConfiguration', properties.HealthCheckConfiguration != null ? CfnServiceHealthCheckConfigurationPropertyFromCloudFormation(properties.HealthCheckConfiguration) : undefined);
    ret.addPropertyResult('instanceConfiguration', 'InstanceConfiguration', properties.InstanceConfiguration != null ? CfnServiceInstanceConfigurationPropertyFromCloudFormation(properties.InstanceConfiguration) : undefined);
    ret.addPropertyResult('networkConfiguration', 'NetworkConfiguration', properties.NetworkConfiguration != null ? CfnServiceNetworkConfigurationPropertyFromCloudFormation(properties.NetworkConfiguration) : undefined);
    ret.addPropertyResult('observabilityConfiguration', 'ObservabilityConfiguration', properties.ObservabilityConfiguration != null ? CfnServiceServiceObservabilityConfigurationPropertyFromCloudFormation(properties.ObservabilityConfiguration) : undefined);
    ret.addPropertyResult('serviceName', 'ServiceName', properties.ServiceName != null ? cfn_parse.FromCloudFormation.getString(properties.ServiceName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppRunner::Service`
 *
 * Specify an AWS App Runner service by using the `AWS::AppRunner::Service` resource in an AWS CloudFormation template.
 *
 * The `AWS::AppRunner::Service` resource is an AWS App Runner resource type that specifies an App Runner service.
 *
 * @cloudformationResource AWS::AppRunner::Service
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html
 */
export class CfnService extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppRunner::Service";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnService {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnServicePropsFromCloudFormation(resourceProperties);
        const ret = new CfnService(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of this service.
     * @cloudformationAttribute ServiceArn
     */
    public readonly attrServiceArn: string;

    /**
     * An ID that App Runner generated for this service. It's unique within the AWS Region .
     * @cloudformationAttribute ServiceId
     */
    public readonly attrServiceId: string;

    /**
     * A subdomain URL that App Runner generated for this service. You can use this URL to access your service web application.
     * @cloudformationAttribute ServiceUrl
     */
    public readonly attrServiceUrl: string;

    /**
     * The current state of the App Runner service. These particular values mean the following.
     *
     * - `CREATE_FAILED` – The service failed to create. To troubleshoot this failure, read the failure events and logs, change any parameters that need to be fixed, and retry the call to create the service.
     *
     * The failed service isn't usable, and still counts towards your service quota. When you're done analyzing the failure, delete the service.
     * - `DELETE_FAILED` – The service failed to delete and can't be successfully recovered. Retry the service deletion call to ensure that all related resources are removed.
     * @cloudformationAttribute Status
     */
    public readonly attrStatus: string;

    /**
     * The source to deploy to the App Runner service. It can be a code or an image repository.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-sourceconfiguration
     */
    public sourceConfiguration: CfnService.SourceConfigurationProperty | cdk.IResolvable;

    /**
     * The Amazon Resource Name (ARN) of an App Runner automatic scaling configuration resource that you want to associate with your service. If not provided, App Runner associates the latest revision of a default auto scaling configuration.
     *
     * Specify an ARN with a name and a revision number to associate that revision. For example: `arn:aws:apprunner:us-east-1:123456789012:autoscalingconfiguration/high-availability/3`
     *
     * Specify just the name to associate the latest revision. For example: `arn:aws:apprunner:us-east-1:123456789012:autoscalingconfiguration/high-availability`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-autoscalingconfigurationarn
     */
    public autoScalingConfigurationArn: string | undefined;

    /**
     * An optional custom encryption key that App Runner uses to encrypt the copy of your source repository that it maintains and your service logs. By default, App Runner uses an AWS managed key .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-encryptionconfiguration
     */
    public encryptionConfiguration: CfnService.EncryptionConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * The settings for the health check that AWS App Runner performs to monitor the health of the App Runner service.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-healthcheckconfiguration
     */
    public healthCheckConfiguration: CfnService.HealthCheckConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * The runtime configuration of instances (scaling units) of your service.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-instanceconfiguration
     */
    public instanceConfiguration: CfnService.InstanceConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * Configuration settings related to network traffic of the web application that the App Runner service runs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-networkconfiguration
     */
    public networkConfiguration: CfnService.NetworkConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * The observability configuration of your service.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-observabilityconfiguration
     */
    public observabilityConfiguration: CfnService.ServiceObservabilityConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * A name for the App Runner service. It must be unique across all the running App Runner services in your AWS account in the AWS Region .
     *
     * If you don't specify a name, AWS CloudFormation generates a name for your service.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-servicename
     */
    public serviceName: string | undefined;

    /**
     * An optional list of metadata items that you can associate with the App Runner service resource. A tag is a key-value pair.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-service.html#cfn-apprunner-service-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::AppRunner::Service`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnServiceProps) {
        super(scope, id, { type: CfnService.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'sourceConfiguration', this);
        this.attrServiceArn = cdk.Token.asString(this.getAtt('ServiceArn'));
        this.attrServiceId = cdk.Token.asString(this.getAtt('ServiceId'));
        this.attrServiceUrl = cdk.Token.asString(this.getAtt('ServiceUrl'));
        this.attrStatus = cdk.Token.asString(this.getAtt('Status'));

        this.sourceConfiguration = props.sourceConfiguration;
        this.autoScalingConfigurationArn = props.autoScalingConfigurationArn;
        this.encryptionConfiguration = props.encryptionConfiguration;
        this.healthCheckConfiguration = props.healthCheckConfiguration;
        this.instanceConfiguration = props.instanceConfiguration;
        this.networkConfiguration = props.networkConfiguration;
        this.observabilityConfiguration = props.observabilityConfiguration;
        this.serviceName = props.serviceName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::AppRunner::Service", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnService.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            sourceConfiguration: this.sourceConfiguration,
            autoScalingConfigurationArn: this.autoScalingConfigurationArn,
            encryptionConfiguration: this.encryptionConfiguration,
            healthCheckConfiguration: this.healthCheckConfiguration,
            instanceConfiguration: this.instanceConfiguration,
            networkConfiguration: this.networkConfiguration,
            observabilityConfiguration: this.observabilityConfiguration,
            serviceName: this.serviceName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnServicePropsToCloudFormation(props);
    }
}

export namespace CfnService {
    /**
     * Describes resources needed to authenticate access to some source repositories. The specific resource depends on the repository provider.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-authenticationconfiguration.html
     */
    export interface AuthenticationConfigurationProperty {
        /**
         * The Amazon Resource Name (ARN) of the IAM role that grants the App Runner service access to a source repository. It's required for ECR image repositories (but not for ECR Public repositories).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-authenticationconfiguration.html#cfn-apprunner-service-authenticationconfiguration-accessrolearn
         */
        readonly accessRoleArn?: string;
        /**
         * The Amazon Resource Name (ARN) of the App Runner connection that enables the App Runner service to connect to a source repository. It's required for GitHub code repositories.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-authenticationconfiguration.html#cfn-apprunner-service-authenticationconfiguration-connectionarn
         */
        readonly connectionArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AuthenticationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `AuthenticationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_AuthenticationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessRoleArn', cdk.validateString)(properties.accessRoleArn));
    errors.collect(cdk.propertyValidator('connectionArn', cdk.validateString)(properties.connectionArn));
    return errors.wrap('supplied properties not correct for "AuthenticationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.AuthenticationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `AuthenticationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.AuthenticationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnServiceAuthenticationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_AuthenticationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AccessRoleArn: cdk.stringToCloudFormation(properties.accessRoleArn),
        ConnectionArn: cdk.stringToCloudFormation(properties.connectionArn),
    };
}

// @ts-ignore TS6133
function CfnServiceAuthenticationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.AuthenticationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.AuthenticationConfigurationProperty>();
    ret.addPropertyResult('accessRoleArn', 'AccessRoleArn', properties.AccessRoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.AccessRoleArn) : undefined);
    ret.addPropertyResult('connectionArn', 'ConnectionArn', properties.ConnectionArn != null ? cfn_parse.FromCloudFormation.getString(properties.ConnectionArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnService {
    /**
     * Describes the configuration that AWS App Runner uses to build and run an App Runner service from a source code repository.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-codeconfiguration.html
     */
    export interface CodeConfigurationProperty {
        /**
         * The basic configuration for building and running the App Runner service. Use it to quickly launch an App Runner service without providing a `apprunner.yaml` file in the source code repository (or ignoring the file if it exists).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-codeconfiguration.html#cfn-apprunner-service-codeconfiguration-codeconfigurationvalues
         */
        readonly codeConfigurationValues?: CfnService.CodeConfigurationValuesProperty | cdk.IResolvable;
        /**
         * The source of the App Runner configuration. Values are interpreted as follows:
         *
         * - `REPOSITORY` – App Runner reads configuration values from the `apprunner.yaml` file in the source code repository and ignores `CodeConfigurationValues` .
         * - `API` – App Runner uses configuration values provided in `CodeConfigurationValues` and ignores the `apprunner.yaml` file in the source code repository.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-codeconfiguration.html#cfn-apprunner-service-codeconfiguration-configurationsource
         */
        readonly configurationSource: string;
    }
}

/**
 * Determine whether the given properties match those of a `CodeConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `CodeConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_CodeConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('codeConfigurationValues', CfnService_CodeConfigurationValuesPropertyValidator)(properties.codeConfigurationValues));
    errors.collect(cdk.propertyValidator('configurationSource', cdk.requiredValidator)(properties.configurationSource));
    errors.collect(cdk.propertyValidator('configurationSource', cdk.validateString)(properties.configurationSource));
    return errors.wrap('supplied properties not correct for "CodeConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.CodeConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CodeConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.CodeConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnServiceCodeConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_CodeConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CodeConfigurationValues: cfnServiceCodeConfigurationValuesPropertyToCloudFormation(properties.codeConfigurationValues),
        ConfigurationSource: cdk.stringToCloudFormation(properties.configurationSource),
    };
}

// @ts-ignore TS6133
function CfnServiceCodeConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.CodeConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.CodeConfigurationProperty>();
    ret.addPropertyResult('codeConfigurationValues', 'CodeConfigurationValues', properties.CodeConfigurationValues != null ? CfnServiceCodeConfigurationValuesPropertyFromCloudFormation(properties.CodeConfigurationValues) : undefined);
    ret.addPropertyResult('configurationSource', 'ConfigurationSource', cfn_parse.FromCloudFormation.getString(properties.ConfigurationSource));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnService {
    /**
     * Describes the basic configuration needed for building and running an AWS App Runner service. This type doesn't support the full set of possible configuration options. Fur full configuration capabilities, use a `apprunner.yaml` file in the source code repository.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-codeconfigurationvalues.html
     */
    export interface CodeConfigurationValuesProperty {
        /**
         * The command App Runner runs to build your application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-codeconfigurationvalues.html#cfn-apprunner-service-codeconfigurationvalues-buildcommand
         */
        readonly buildCommand?: string;
        /**
         * The port that your application listens to in the container.
         *
         * Default: `8080`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-codeconfigurationvalues.html#cfn-apprunner-service-codeconfigurationvalues-port
         */
        readonly port?: string;
        /**
         * A runtime environment type for building and running an App Runner service. It represents a programming language runtime.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-codeconfigurationvalues.html#cfn-apprunner-service-codeconfigurationvalues-runtime
         */
        readonly runtime: string;
        /**
         * The environment variables that are available to your running App Runner service. An array of key-value pairs. Keys with a prefix of `AWSAPPRUNNER` are reserved for system use and aren't valid.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-codeconfigurationvalues.html#cfn-apprunner-service-codeconfigurationvalues-runtimeenvironmentvariables
         */
        readonly runtimeEnvironmentVariables?: Array<CfnService.KeyValuePairProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The command App Runner runs to start your application.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-codeconfigurationvalues.html#cfn-apprunner-service-codeconfigurationvalues-startcommand
         */
        readonly startCommand?: string;
    }
}

/**
 * Determine whether the given properties match those of a `CodeConfigurationValuesProperty`
 *
 * @param properties - the TypeScript properties of a `CodeConfigurationValuesProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_CodeConfigurationValuesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('buildCommand', cdk.validateString)(properties.buildCommand));
    errors.collect(cdk.propertyValidator('port', cdk.validateString)(properties.port));
    errors.collect(cdk.propertyValidator('runtime', cdk.requiredValidator)(properties.runtime));
    errors.collect(cdk.propertyValidator('runtime', cdk.validateString)(properties.runtime));
    errors.collect(cdk.propertyValidator('runtimeEnvironmentVariables', cdk.listValidator(CfnService_KeyValuePairPropertyValidator))(properties.runtimeEnvironmentVariables));
    errors.collect(cdk.propertyValidator('startCommand', cdk.validateString)(properties.startCommand));
    return errors.wrap('supplied properties not correct for "CodeConfigurationValuesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.CodeConfigurationValues` resource
 *
 * @param properties - the TypeScript properties of a `CodeConfigurationValuesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.CodeConfigurationValues` resource.
 */
// @ts-ignore TS6133
function cfnServiceCodeConfigurationValuesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_CodeConfigurationValuesPropertyValidator(properties).assertSuccess();
    return {
        BuildCommand: cdk.stringToCloudFormation(properties.buildCommand),
        Port: cdk.stringToCloudFormation(properties.port),
        Runtime: cdk.stringToCloudFormation(properties.runtime),
        RuntimeEnvironmentVariables: cdk.listMapper(cfnServiceKeyValuePairPropertyToCloudFormation)(properties.runtimeEnvironmentVariables),
        StartCommand: cdk.stringToCloudFormation(properties.startCommand),
    };
}

// @ts-ignore TS6133
function CfnServiceCodeConfigurationValuesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.CodeConfigurationValuesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.CodeConfigurationValuesProperty>();
    ret.addPropertyResult('buildCommand', 'BuildCommand', properties.BuildCommand != null ? cfn_parse.FromCloudFormation.getString(properties.BuildCommand) : undefined);
    ret.addPropertyResult('port', 'Port', properties.Port != null ? cfn_parse.FromCloudFormation.getString(properties.Port) : undefined);
    ret.addPropertyResult('runtime', 'Runtime', cfn_parse.FromCloudFormation.getString(properties.Runtime));
    ret.addPropertyResult('runtimeEnvironmentVariables', 'RuntimeEnvironmentVariables', properties.RuntimeEnvironmentVariables != null ? cfn_parse.FromCloudFormation.getArray(CfnServiceKeyValuePairPropertyFromCloudFormation)(properties.RuntimeEnvironmentVariables) : undefined);
    ret.addPropertyResult('startCommand', 'StartCommand', properties.StartCommand != null ? cfn_parse.FromCloudFormation.getString(properties.StartCommand) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnService {
    /**
     * Describes a source code repository.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-coderepository.html
     */
    export interface CodeRepositoryProperty {
        /**
         * Configuration for building and running the service from a source code repository.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-coderepository.html#cfn-apprunner-service-coderepository-codeconfiguration
         */
        readonly codeConfiguration?: CfnService.CodeConfigurationProperty | cdk.IResolvable;
        /**
         * The location of the repository that contains the source code.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-coderepository.html#cfn-apprunner-service-coderepository-repositoryurl
         */
        readonly repositoryUrl: string;
        /**
         * The version that should be used within the source code repository.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-coderepository.html#cfn-apprunner-service-coderepository-sourcecodeversion
         */
        readonly sourceCodeVersion: CfnService.SourceCodeVersionProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `CodeRepositoryProperty`
 *
 * @param properties - the TypeScript properties of a `CodeRepositoryProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_CodeRepositoryPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('codeConfiguration', CfnService_CodeConfigurationPropertyValidator)(properties.codeConfiguration));
    errors.collect(cdk.propertyValidator('repositoryUrl', cdk.requiredValidator)(properties.repositoryUrl));
    errors.collect(cdk.propertyValidator('repositoryUrl', cdk.validateString)(properties.repositoryUrl));
    errors.collect(cdk.propertyValidator('sourceCodeVersion', cdk.requiredValidator)(properties.sourceCodeVersion));
    errors.collect(cdk.propertyValidator('sourceCodeVersion', CfnService_SourceCodeVersionPropertyValidator)(properties.sourceCodeVersion));
    return errors.wrap('supplied properties not correct for "CodeRepositoryProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.CodeRepository` resource
 *
 * @param properties - the TypeScript properties of a `CodeRepositoryProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.CodeRepository` resource.
 */
// @ts-ignore TS6133
function cfnServiceCodeRepositoryPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_CodeRepositoryPropertyValidator(properties).assertSuccess();
    return {
        CodeConfiguration: cfnServiceCodeConfigurationPropertyToCloudFormation(properties.codeConfiguration),
        RepositoryUrl: cdk.stringToCloudFormation(properties.repositoryUrl),
        SourceCodeVersion: cfnServiceSourceCodeVersionPropertyToCloudFormation(properties.sourceCodeVersion),
    };
}

// @ts-ignore TS6133
function CfnServiceCodeRepositoryPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.CodeRepositoryProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.CodeRepositoryProperty>();
    ret.addPropertyResult('codeConfiguration', 'CodeConfiguration', properties.CodeConfiguration != null ? CfnServiceCodeConfigurationPropertyFromCloudFormation(properties.CodeConfiguration) : undefined);
    ret.addPropertyResult('repositoryUrl', 'RepositoryUrl', cfn_parse.FromCloudFormation.getString(properties.RepositoryUrl));
    ret.addPropertyResult('sourceCodeVersion', 'SourceCodeVersion', CfnServiceSourceCodeVersionPropertyFromCloudFormation(properties.SourceCodeVersion));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnService {
    /**
     * Describes configuration settings related to outbound network traffic of an AWS App Runner service.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-egressconfiguration.html
     */
    export interface EgressConfigurationProperty {
        /**
         * The type of egress configuration.
         *
         * Set to `DEFAULT` for access to resources hosted on public networks.
         *
         * Set to `VPC` to associate your service to a custom VPC specified by `VpcConnectorArn` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-egressconfiguration.html#cfn-apprunner-service-egressconfiguration-egresstype
         */
        readonly egressType: string;
        /**
         * The Amazon Resource Name (ARN) of the App Runner VPC connector that you want to associate with your App Runner service. Only valid when `EgressType = VPC` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-egressconfiguration.html#cfn-apprunner-service-egressconfiguration-vpcconnectorarn
         */
        readonly vpcConnectorArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `EgressConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `EgressConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_EgressConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('egressType', cdk.requiredValidator)(properties.egressType));
    errors.collect(cdk.propertyValidator('egressType', cdk.validateString)(properties.egressType));
    errors.collect(cdk.propertyValidator('vpcConnectorArn', cdk.validateString)(properties.vpcConnectorArn));
    return errors.wrap('supplied properties not correct for "EgressConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.EgressConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `EgressConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.EgressConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnServiceEgressConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_EgressConfigurationPropertyValidator(properties).assertSuccess();
    return {
        EgressType: cdk.stringToCloudFormation(properties.egressType),
        VpcConnectorArn: cdk.stringToCloudFormation(properties.vpcConnectorArn),
    };
}

// @ts-ignore TS6133
function CfnServiceEgressConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.EgressConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.EgressConfigurationProperty>();
    ret.addPropertyResult('egressType', 'EgressType', cfn_parse.FromCloudFormation.getString(properties.EgressType));
    ret.addPropertyResult('vpcConnectorArn', 'VpcConnectorArn', properties.VpcConnectorArn != null ? cfn_parse.FromCloudFormation.getString(properties.VpcConnectorArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnService {
    /**
     * Describes a custom encryption key that AWS App Runner uses to encrypt copies of the source repository and service logs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-encryptionconfiguration.html
     */
    export interface EncryptionConfigurationProperty {
        /**
         * The ARN of the KMS key that's used for encryption.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-encryptionconfiguration.html#cfn-apprunner-service-encryptionconfiguration-kmskey
         */
        readonly kmsKey: string;
    }
}

/**
 * Determine whether the given properties match those of a `EncryptionConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `EncryptionConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_EncryptionConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('kmsKey', cdk.requiredValidator)(properties.kmsKey));
    errors.collect(cdk.propertyValidator('kmsKey', cdk.validateString)(properties.kmsKey));
    return errors.wrap('supplied properties not correct for "EncryptionConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.EncryptionConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `EncryptionConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.EncryptionConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnServiceEncryptionConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_EncryptionConfigurationPropertyValidator(properties).assertSuccess();
    return {
        KmsKey: cdk.stringToCloudFormation(properties.kmsKey),
    };
}

// @ts-ignore TS6133
function CfnServiceEncryptionConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.EncryptionConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.EncryptionConfigurationProperty>();
    ret.addPropertyResult('kmsKey', 'KmsKey', cfn_parse.FromCloudFormation.getString(properties.KmsKey));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnService {
    /**
     * Describes the settings for the health check that AWS App Runner performs to monitor the health of a service.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-healthcheckconfiguration.html
     */
    export interface HealthCheckConfigurationProperty {
        /**
         * The number of consecutive checks that must succeed before App Runner decides that the service is healthy.
         *
         * Default: `1`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-healthcheckconfiguration.html#cfn-apprunner-service-healthcheckconfiguration-healthythreshold
         */
        readonly healthyThreshold?: number;
        /**
         * The time interval, in seconds, between health checks.
         *
         * Default: `5`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-healthcheckconfiguration.html#cfn-apprunner-service-healthcheckconfiguration-interval
         */
        readonly interval?: number;
        /**
         * The URL that health check requests are sent to.
         *
         * `Path` is only applicable when you set `Protocol` to `HTTP` .
         *
         * Default: `"/"`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-healthcheckconfiguration.html#cfn-apprunner-service-healthcheckconfiguration-path
         */
        readonly path?: string;
        /**
         * The IP protocol that App Runner uses to perform health checks for your service.
         *
         * If you set `Protocol` to `HTTP` , App Runner sends health check requests to the HTTP path specified by `Path` .
         *
         * Default: `TCP`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-healthcheckconfiguration.html#cfn-apprunner-service-healthcheckconfiguration-protocol
         */
        readonly protocol?: string;
        /**
         * The time, in seconds, to wait for a health check response before deciding it failed.
         *
         * Default: `2`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-healthcheckconfiguration.html#cfn-apprunner-service-healthcheckconfiguration-timeout
         */
        readonly timeout?: number;
        /**
         * The number of consecutive checks that must fail before App Runner decides that the service is unhealthy.
         *
         * Default: `5`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-healthcheckconfiguration.html#cfn-apprunner-service-healthcheckconfiguration-unhealthythreshold
         */
        readonly unhealthyThreshold?: number;
    }
}

/**
 * Determine whether the given properties match those of a `HealthCheckConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `HealthCheckConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_HealthCheckConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('healthyThreshold', cdk.validateNumber)(properties.healthyThreshold));
    errors.collect(cdk.propertyValidator('interval', cdk.validateNumber)(properties.interval));
    errors.collect(cdk.propertyValidator('path', cdk.validateString)(properties.path));
    errors.collect(cdk.propertyValidator('protocol', cdk.validateString)(properties.protocol));
    errors.collect(cdk.propertyValidator('timeout', cdk.validateNumber)(properties.timeout));
    errors.collect(cdk.propertyValidator('unhealthyThreshold', cdk.validateNumber)(properties.unhealthyThreshold));
    return errors.wrap('supplied properties not correct for "HealthCheckConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.HealthCheckConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `HealthCheckConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.HealthCheckConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnServiceHealthCheckConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_HealthCheckConfigurationPropertyValidator(properties).assertSuccess();
    return {
        HealthyThreshold: cdk.numberToCloudFormation(properties.healthyThreshold),
        Interval: cdk.numberToCloudFormation(properties.interval),
        Path: cdk.stringToCloudFormation(properties.path),
        Protocol: cdk.stringToCloudFormation(properties.protocol),
        Timeout: cdk.numberToCloudFormation(properties.timeout),
        UnhealthyThreshold: cdk.numberToCloudFormation(properties.unhealthyThreshold),
    };
}

// @ts-ignore TS6133
function CfnServiceHealthCheckConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.HealthCheckConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.HealthCheckConfigurationProperty>();
    ret.addPropertyResult('healthyThreshold', 'HealthyThreshold', properties.HealthyThreshold != null ? cfn_parse.FromCloudFormation.getNumber(properties.HealthyThreshold) : undefined);
    ret.addPropertyResult('interval', 'Interval', properties.Interval != null ? cfn_parse.FromCloudFormation.getNumber(properties.Interval) : undefined);
    ret.addPropertyResult('path', 'Path', properties.Path != null ? cfn_parse.FromCloudFormation.getString(properties.Path) : undefined);
    ret.addPropertyResult('protocol', 'Protocol', properties.Protocol != null ? cfn_parse.FromCloudFormation.getString(properties.Protocol) : undefined);
    ret.addPropertyResult('timeout', 'Timeout', properties.Timeout != null ? cfn_parse.FromCloudFormation.getNumber(properties.Timeout) : undefined);
    ret.addPropertyResult('unhealthyThreshold', 'UnhealthyThreshold', properties.UnhealthyThreshold != null ? cfn_parse.FromCloudFormation.getNumber(properties.UnhealthyThreshold) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnService {
    /**
     * Describes the configuration that AWS App Runner uses to run an App Runner service using an image pulled from a source image repository.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-imageconfiguration.html
     */
    export interface ImageConfigurationProperty {
        /**
         * The port that your application listens to in the container.
         *
         * Default: `8080`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-imageconfiguration.html#cfn-apprunner-service-imageconfiguration-port
         */
        readonly port?: string;
        /**
         * Environment variables that are available to your running App Runner service. An array of key-value pairs. Keys with a prefix of `AWSAPPRUNNER` are reserved for system use and aren't valid.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-imageconfiguration.html#cfn-apprunner-service-imageconfiguration-runtimeenvironmentvariables
         */
        readonly runtimeEnvironmentVariables?: Array<CfnService.KeyValuePairProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * An optional command that App Runner runs to start the application in the source image. If specified, this command overrides the Docker image’s default start command.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-imageconfiguration.html#cfn-apprunner-service-imageconfiguration-startcommand
         */
        readonly startCommand?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ImageConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ImageConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_ImageConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('port', cdk.validateString)(properties.port));
    errors.collect(cdk.propertyValidator('runtimeEnvironmentVariables', cdk.listValidator(CfnService_KeyValuePairPropertyValidator))(properties.runtimeEnvironmentVariables));
    errors.collect(cdk.propertyValidator('startCommand', cdk.validateString)(properties.startCommand));
    return errors.wrap('supplied properties not correct for "ImageConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.ImageConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ImageConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.ImageConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnServiceImageConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_ImageConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Port: cdk.stringToCloudFormation(properties.port),
        RuntimeEnvironmentVariables: cdk.listMapper(cfnServiceKeyValuePairPropertyToCloudFormation)(properties.runtimeEnvironmentVariables),
        StartCommand: cdk.stringToCloudFormation(properties.startCommand),
    };
}

// @ts-ignore TS6133
function CfnServiceImageConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.ImageConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.ImageConfigurationProperty>();
    ret.addPropertyResult('port', 'Port', properties.Port != null ? cfn_parse.FromCloudFormation.getString(properties.Port) : undefined);
    ret.addPropertyResult('runtimeEnvironmentVariables', 'RuntimeEnvironmentVariables', properties.RuntimeEnvironmentVariables != null ? cfn_parse.FromCloudFormation.getArray(CfnServiceKeyValuePairPropertyFromCloudFormation)(properties.RuntimeEnvironmentVariables) : undefined);
    ret.addPropertyResult('startCommand', 'StartCommand', properties.StartCommand != null ? cfn_parse.FromCloudFormation.getString(properties.StartCommand) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnService {
    /**
     * Describes a source image repository.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-imagerepository.html
     */
    export interface ImageRepositoryProperty {
        /**
         * Configuration for running the identified image.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-imagerepository.html#cfn-apprunner-service-imagerepository-imageconfiguration
         */
        readonly imageConfiguration?: CfnService.ImageConfigurationProperty | cdk.IResolvable;
        /**
         * The identifier of an image.
         *
         * For an image in Amazon Elastic Container Registry (Amazon ECR), this is an image name. For the image name format, see [Pulling an image](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-pull-ecr-image.html) in the *Amazon ECR User Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-imagerepository.html#cfn-apprunner-service-imagerepository-imageidentifier
         */
        readonly imageIdentifier: string;
        /**
         * The type of the image repository. This reflects the repository provider and whether the repository is private or public.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-imagerepository.html#cfn-apprunner-service-imagerepository-imagerepositorytype
         */
        readonly imageRepositoryType: string;
    }
}

/**
 * Determine whether the given properties match those of a `ImageRepositoryProperty`
 *
 * @param properties - the TypeScript properties of a `ImageRepositoryProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_ImageRepositoryPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('imageConfiguration', CfnService_ImageConfigurationPropertyValidator)(properties.imageConfiguration));
    errors.collect(cdk.propertyValidator('imageIdentifier', cdk.requiredValidator)(properties.imageIdentifier));
    errors.collect(cdk.propertyValidator('imageIdentifier', cdk.validateString)(properties.imageIdentifier));
    errors.collect(cdk.propertyValidator('imageRepositoryType', cdk.requiredValidator)(properties.imageRepositoryType));
    errors.collect(cdk.propertyValidator('imageRepositoryType', cdk.validateString)(properties.imageRepositoryType));
    return errors.wrap('supplied properties not correct for "ImageRepositoryProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.ImageRepository` resource
 *
 * @param properties - the TypeScript properties of a `ImageRepositoryProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.ImageRepository` resource.
 */
// @ts-ignore TS6133
function cfnServiceImageRepositoryPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_ImageRepositoryPropertyValidator(properties).assertSuccess();
    return {
        ImageConfiguration: cfnServiceImageConfigurationPropertyToCloudFormation(properties.imageConfiguration),
        ImageIdentifier: cdk.stringToCloudFormation(properties.imageIdentifier),
        ImageRepositoryType: cdk.stringToCloudFormation(properties.imageRepositoryType),
    };
}

// @ts-ignore TS6133
function CfnServiceImageRepositoryPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.ImageRepositoryProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.ImageRepositoryProperty>();
    ret.addPropertyResult('imageConfiguration', 'ImageConfiguration', properties.ImageConfiguration != null ? CfnServiceImageConfigurationPropertyFromCloudFormation(properties.ImageConfiguration) : undefined);
    ret.addPropertyResult('imageIdentifier', 'ImageIdentifier', cfn_parse.FromCloudFormation.getString(properties.ImageIdentifier));
    ret.addPropertyResult('imageRepositoryType', 'ImageRepositoryType', cfn_parse.FromCloudFormation.getString(properties.ImageRepositoryType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnService {
    /**
     * Describes the runtime configuration of an AWS App Runner service instance (scaling unit).
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-instanceconfiguration.html
     */
    export interface InstanceConfigurationProperty {
        /**
         * The number of CPU units reserved for each instance of your App Runner service.
         *
         * Default: `1 vCPU`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-instanceconfiguration.html#cfn-apprunner-service-instanceconfiguration-cpu
         */
        readonly cpu?: string;
        /**
         * The Amazon Resource Name (ARN) of an IAM role that provides permissions to your App Runner service. These are permissions that your code needs when it calls any AWS APIs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-instanceconfiguration.html#cfn-apprunner-service-instanceconfiguration-instancerolearn
         */
        readonly instanceRoleArn?: string;
        /**
         * The amount of memory, in MB or GB, reserved for each instance of your App Runner service.
         *
         * Default: `2 GB`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-instanceconfiguration.html#cfn-apprunner-service-instanceconfiguration-memory
         */
        readonly memory?: string;
    }
}

/**
 * Determine whether the given properties match those of a `InstanceConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `InstanceConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_InstanceConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cpu', cdk.validateString)(properties.cpu));
    errors.collect(cdk.propertyValidator('instanceRoleArn', cdk.validateString)(properties.instanceRoleArn));
    errors.collect(cdk.propertyValidator('memory', cdk.validateString)(properties.memory));
    return errors.wrap('supplied properties not correct for "InstanceConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.InstanceConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `InstanceConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.InstanceConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnServiceInstanceConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_InstanceConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Cpu: cdk.stringToCloudFormation(properties.cpu),
        InstanceRoleArn: cdk.stringToCloudFormation(properties.instanceRoleArn),
        Memory: cdk.stringToCloudFormation(properties.memory),
    };
}

// @ts-ignore TS6133
function CfnServiceInstanceConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.InstanceConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.InstanceConfigurationProperty>();
    ret.addPropertyResult('cpu', 'Cpu', properties.Cpu != null ? cfn_parse.FromCloudFormation.getString(properties.Cpu) : undefined);
    ret.addPropertyResult('instanceRoleArn', 'InstanceRoleArn', properties.InstanceRoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.InstanceRoleArn) : undefined);
    ret.addPropertyResult('memory', 'Memory', properties.Memory != null ? cfn_parse.FromCloudFormation.getString(properties.Memory) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnService {
    /**
     * Describes a key-value pair, which is a string-to-string mapping.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-keyvaluepair.html
     */
    export interface KeyValuePairProperty {
        /**
         * The key name string to map to a value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-keyvaluepair.html#cfn-apprunner-service-keyvaluepair-name
         */
        readonly name?: string;
        /**
         * The value string to which the key name is mapped.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-keyvaluepair.html#cfn-apprunner-service-keyvaluepair-value
         */
        readonly value?: string;
    }
}

/**
 * Determine whether the given properties match those of a `KeyValuePairProperty`
 *
 * @param properties - the TypeScript properties of a `KeyValuePairProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_KeyValuePairPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "KeyValuePairProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.KeyValuePair` resource
 *
 * @param properties - the TypeScript properties of a `KeyValuePairProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.KeyValuePair` resource.
 */
// @ts-ignore TS6133
function cfnServiceKeyValuePairPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_KeyValuePairPropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnServiceKeyValuePairPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.KeyValuePairProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.KeyValuePairProperty>();
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('value', 'Value', properties.Value != null ? cfn_parse.FromCloudFormation.getString(properties.Value) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnService {
    /**
     * Describes configuration settings related to network traffic of an AWS App Runner service. Consists of embedded objects for each configurable network feature.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-networkconfiguration.html
     */
    export interface NetworkConfigurationProperty {
        /**
         * Network configuration settings for outbound message traffic.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-networkconfiguration.html#cfn-apprunner-service-networkconfiguration-egressconfiguration
         */
        readonly egressConfiguration: CfnService.EgressConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `NetworkConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `NetworkConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_NetworkConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('egressConfiguration', cdk.requiredValidator)(properties.egressConfiguration));
    errors.collect(cdk.propertyValidator('egressConfiguration', CfnService_EgressConfigurationPropertyValidator)(properties.egressConfiguration));
    return errors.wrap('supplied properties not correct for "NetworkConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.NetworkConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `NetworkConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.NetworkConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnServiceNetworkConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_NetworkConfigurationPropertyValidator(properties).assertSuccess();
    return {
        EgressConfiguration: cfnServiceEgressConfigurationPropertyToCloudFormation(properties.egressConfiguration),
    };
}

// @ts-ignore TS6133
function CfnServiceNetworkConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.NetworkConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.NetworkConfigurationProperty>();
    ret.addPropertyResult('egressConfiguration', 'EgressConfiguration', CfnServiceEgressConfigurationPropertyFromCloudFormation(properties.EgressConfiguration));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnService {
    /**
     * Describes the observability configuration of an AWS App Runner service. These are additional observability features, like tracing, that you choose to enable. They're configured in a separate resource that you associate with your service.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-serviceobservabilityconfiguration.html
     */
    export interface ServiceObservabilityConfigurationProperty {
        /**
         * The Amazon Resource Name (ARN) of the observability configuration that is associated with the service. Specified only when `ObservabilityEnabled` is `true` .
         *
         * Specify an ARN with a name and a revision number to associate that revision. For example: `arn:aws:apprunner:us-east-1:123456789012:observabilityconfiguration/xray-tracing/3`
         *
         * Specify just the name to associate the latest revision. For example: `arn:aws:apprunner:us-east-1:123456789012:observabilityconfiguration/xray-tracing`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-serviceobservabilityconfiguration.html#cfn-apprunner-service-serviceobservabilityconfiguration-observabilityconfigurationarn
         */
        readonly observabilityConfigurationArn?: string;
        /**
         * When `true` , an observability configuration resource is associated with the service, and an `ObservabilityConfigurationArn` is specified.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-serviceobservabilityconfiguration.html#cfn-apprunner-service-serviceobservabilityconfiguration-observabilityenabled
         */
        readonly observabilityEnabled: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ServiceObservabilityConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ServiceObservabilityConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_ServiceObservabilityConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('observabilityConfigurationArn', cdk.validateString)(properties.observabilityConfigurationArn));
    errors.collect(cdk.propertyValidator('observabilityEnabled', cdk.requiredValidator)(properties.observabilityEnabled));
    errors.collect(cdk.propertyValidator('observabilityEnabled', cdk.validateBoolean)(properties.observabilityEnabled));
    return errors.wrap('supplied properties not correct for "ServiceObservabilityConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.ServiceObservabilityConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ServiceObservabilityConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.ServiceObservabilityConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnServiceServiceObservabilityConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_ServiceObservabilityConfigurationPropertyValidator(properties).assertSuccess();
    return {
        ObservabilityConfigurationArn: cdk.stringToCloudFormation(properties.observabilityConfigurationArn),
        ObservabilityEnabled: cdk.booleanToCloudFormation(properties.observabilityEnabled),
    };
}

// @ts-ignore TS6133
function CfnServiceServiceObservabilityConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.ServiceObservabilityConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.ServiceObservabilityConfigurationProperty>();
    ret.addPropertyResult('observabilityConfigurationArn', 'ObservabilityConfigurationArn', properties.ObservabilityConfigurationArn != null ? cfn_parse.FromCloudFormation.getString(properties.ObservabilityConfigurationArn) : undefined);
    ret.addPropertyResult('observabilityEnabled', 'ObservabilityEnabled', cfn_parse.FromCloudFormation.getBoolean(properties.ObservabilityEnabled));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnService {
    /**
     * Identifies a version of code that AWS App Runner refers to within a source code repository.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-sourcecodeversion.html
     */
    export interface SourceCodeVersionProperty {
        /**
         * The type of version identifier.
         *
         * For a git-based repository, branches represent versions.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-sourcecodeversion.html#cfn-apprunner-service-sourcecodeversion-type
         */
        readonly type: string;
        /**
         * A source code version.
         *
         * For a git-based repository, a branch name maps to a specific version. App Runner uses the most recent commit to the branch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-sourcecodeversion.html#cfn-apprunner-service-sourcecodeversion-value
         */
        readonly value: string;
    }
}

/**
 * Determine whether the given properties match those of a `SourceCodeVersionProperty`
 *
 * @param properties - the TypeScript properties of a `SourceCodeVersionProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_SourceCodeVersionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "SourceCodeVersionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.SourceCodeVersion` resource
 *
 * @param properties - the TypeScript properties of a `SourceCodeVersionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.SourceCodeVersion` resource.
 */
// @ts-ignore TS6133
function cfnServiceSourceCodeVersionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_SourceCodeVersionPropertyValidator(properties).assertSuccess();
    return {
        Type: cdk.stringToCloudFormation(properties.type),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnServiceSourceCodeVersionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.SourceCodeVersionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.SourceCodeVersionProperty>();
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnService {
    /**
     * Describes the source deployed to an AWS App Runner service. It can be a code or an image repository.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-sourceconfiguration.html
     */
    export interface SourceConfigurationProperty {
        /**
         * Describes the resources that are needed to authenticate access to some source repositories.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-sourceconfiguration.html#cfn-apprunner-service-sourceconfiguration-authenticationconfiguration
         */
        readonly authenticationConfiguration?: CfnService.AuthenticationConfigurationProperty | cdk.IResolvable;
        /**
         * If `true` , continuous integration from the source repository is enabled for the App Runner service. Each repository change (including any source code commit or new image version) starts a deployment.
         *
         * Default: App Runner sets to `false` for a source image that uses an ECR Public repository or an ECR repository that's in an AWS account other than the one that the service is in. App Runner sets to `true` in all other cases (which currently include a source code repository or a source image using a same-account ECR repository).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-sourceconfiguration.html#cfn-apprunner-service-sourceconfiguration-autodeploymentsenabled
         */
        readonly autoDeploymentsEnabled?: boolean | cdk.IResolvable;
        /**
         * The description of a source code repository.
         *
         * You must provide either this member or `ImageRepository` (but not both).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-sourceconfiguration.html#cfn-apprunner-service-sourceconfiguration-coderepository
         */
        readonly codeRepository?: CfnService.CodeRepositoryProperty | cdk.IResolvable;
        /**
         * The description of a source image repository.
         *
         * You must provide either this member or `CodeRepository` (but not both).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apprunner-service-sourceconfiguration.html#cfn-apprunner-service-sourceconfiguration-imagerepository
         */
        readonly imageRepository?: CfnService.ImageRepositoryProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SourceConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `SourceConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnService_SourceConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('authenticationConfiguration', CfnService_AuthenticationConfigurationPropertyValidator)(properties.authenticationConfiguration));
    errors.collect(cdk.propertyValidator('autoDeploymentsEnabled', cdk.validateBoolean)(properties.autoDeploymentsEnabled));
    errors.collect(cdk.propertyValidator('codeRepository', CfnService_CodeRepositoryPropertyValidator)(properties.codeRepository));
    errors.collect(cdk.propertyValidator('imageRepository', CfnService_ImageRepositoryPropertyValidator)(properties.imageRepository));
    return errors.wrap('supplied properties not correct for "SourceConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::Service.SourceConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `SourceConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::Service.SourceConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnServiceSourceConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnService_SourceConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AuthenticationConfiguration: cfnServiceAuthenticationConfigurationPropertyToCloudFormation(properties.authenticationConfiguration),
        AutoDeploymentsEnabled: cdk.booleanToCloudFormation(properties.autoDeploymentsEnabled),
        CodeRepository: cfnServiceCodeRepositoryPropertyToCloudFormation(properties.codeRepository),
        ImageRepository: cfnServiceImageRepositoryPropertyToCloudFormation(properties.imageRepository),
    };
}

// @ts-ignore TS6133
function CfnServiceSourceConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnService.SourceConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnService.SourceConfigurationProperty>();
    ret.addPropertyResult('authenticationConfiguration', 'AuthenticationConfiguration', properties.AuthenticationConfiguration != null ? CfnServiceAuthenticationConfigurationPropertyFromCloudFormation(properties.AuthenticationConfiguration) : undefined);
    ret.addPropertyResult('autoDeploymentsEnabled', 'AutoDeploymentsEnabled', properties.AutoDeploymentsEnabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AutoDeploymentsEnabled) : undefined);
    ret.addPropertyResult('codeRepository', 'CodeRepository', properties.CodeRepository != null ? CfnServiceCodeRepositoryPropertyFromCloudFormation(properties.CodeRepository) : undefined);
    ret.addPropertyResult('imageRepository', 'ImageRepository', properties.ImageRepository != null ? CfnServiceImageRepositoryPropertyFromCloudFormation(properties.ImageRepository) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnVpcConnector`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-vpcconnector.html
 */
export interface CfnVpcConnectorProps {

    /**
     * A list of IDs of subnets that App Runner should use when it associates your service with a custom Amazon VPC. Specify IDs of subnets of a single Amazon VPC. App Runner determines the Amazon VPC from the subnets you specify.
     *
     * > App Runner currently only provides support for IPv4.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-vpcconnector.html#cfn-apprunner-vpcconnector-subnets
     */
    readonly subnets: string[];

    /**
     * A list of IDs of security groups that App Runner should use for access to AWS resources under the specified subnets. If not specified, App Runner uses the default security group of the Amazon VPC. The default security group allows all outbound traffic.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-vpcconnector.html#cfn-apprunner-vpcconnector-securitygroups
     */
    readonly securityGroups?: string[];

    /**
     * A list of metadata items that you can associate with your VPC connector resource. A tag is a key-value pair.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-vpcconnector.html#cfn-apprunner-vpcconnector-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * A name for the VPC connector.
     *
     * If you don't specify a name, AWS CloudFormation generates a name for your VPC connector.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-vpcconnector.html#cfn-apprunner-vpcconnector-vpcconnectorname
     */
    readonly vpcConnectorName?: string;
}

/**
 * Determine whether the given properties match those of a `CfnVpcConnectorProps`
 *
 * @param properties - the TypeScript properties of a `CfnVpcConnectorProps`
 *
 * @returns the result of the validation.
 */
function CfnVpcConnectorPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('securityGroups', cdk.listValidator(cdk.validateString))(properties.securityGroups));
    errors.collect(cdk.propertyValidator('subnets', cdk.requiredValidator)(properties.subnets));
    errors.collect(cdk.propertyValidator('subnets', cdk.listValidator(cdk.validateString))(properties.subnets));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('vpcConnectorName', cdk.validateString)(properties.vpcConnectorName));
    return errors.wrap('supplied properties not correct for "CfnVpcConnectorProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AppRunner::VpcConnector` resource
 *
 * @param properties - the TypeScript properties of a `CfnVpcConnectorProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AppRunner::VpcConnector` resource.
 */
// @ts-ignore TS6133
function cfnVpcConnectorPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnVpcConnectorPropsValidator(properties).assertSuccess();
    return {
        Subnets: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnets),
        SecurityGroups: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroups),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        VpcConnectorName: cdk.stringToCloudFormation(properties.vpcConnectorName),
    };
}

// @ts-ignore TS6133
function CfnVpcConnectorPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnVpcConnectorProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnVpcConnectorProps>();
    ret.addPropertyResult('subnets', 'Subnets', cfn_parse.FromCloudFormation.getStringArray(properties.Subnets));
    ret.addPropertyResult('securityGroups', 'SecurityGroups', properties.SecurityGroups != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroups) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('vpcConnectorName', 'VpcConnectorName', properties.VpcConnectorName != null ? cfn_parse.FromCloudFormation.getString(properties.VpcConnectorName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AppRunner::VpcConnector`
 *
 * Specify an AWS App Runner VPC connector by using the `AWS::AppRunner::VpcConnector` resource in an AWS CloudFormation template.
 *
 * The `AWS::AppRunner::VpcConnector` resource is an AWS App Runner resource type that specifies an App Runner VPC connector.
 *
 * App Runner requires this resource when you want to associate your App Runner service to a custom Amazon Virtual Private Cloud ( Amazon VPC ).
 *
 * @cloudformationResource AWS::AppRunner::VpcConnector
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-vpcconnector.html
 */
export class CfnVpcConnector extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AppRunner::VpcConnector";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnVpcConnector {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnVpcConnectorPropsFromCloudFormation(resourceProperties);
        const ret = new CfnVpcConnector(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of this VPC connector.
     * @cloudformationAttribute VpcConnectorArn
     */
    public readonly attrVpcConnectorArn: string;

    /**
     * The revision of this VPC connector. It's unique among all the active connectors ( `"Status": "ACTIVE"` ) that share the same `Name` .
     *
     * > At this time, App Runner supports only one revision per name.
     * @cloudformationAttribute VpcConnectorRevision
     */
    public readonly attrVpcConnectorRevision: number;

    /**
     * A list of IDs of subnets that App Runner should use when it associates your service with a custom Amazon VPC. Specify IDs of subnets of a single Amazon VPC. App Runner determines the Amazon VPC from the subnets you specify.
     *
     * > App Runner currently only provides support for IPv4.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-vpcconnector.html#cfn-apprunner-vpcconnector-subnets
     */
    public subnets: string[];

    /**
     * A list of IDs of security groups that App Runner should use for access to AWS resources under the specified subnets. If not specified, App Runner uses the default security group of the Amazon VPC. The default security group allows all outbound traffic.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-vpcconnector.html#cfn-apprunner-vpcconnector-securitygroups
     */
    public securityGroups: string[] | undefined;

    /**
     * A list of metadata items that you can associate with your VPC connector resource. A tag is a key-value pair.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-vpcconnector.html#cfn-apprunner-vpcconnector-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * A name for the VPC connector.
     *
     * If you don't specify a name, AWS CloudFormation generates a name for your VPC connector.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-vpcconnector.html#cfn-apprunner-vpcconnector-vpcconnectorname
     */
    public vpcConnectorName: string | undefined;

    /**
     * Create a new `AWS::AppRunner::VpcConnector`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnVpcConnectorProps) {
        super(scope, id, { type: CfnVpcConnector.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'subnets', this);
        this.attrVpcConnectorArn = cdk.Token.asString(this.getAtt('VpcConnectorArn'));
        this.attrVpcConnectorRevision = cdk.Token.asNumber(this.getAtt('VpcConnectorRevision'));

        this.subnets = props.subnets;
        this.securityGroups = props.securityGroups;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::AppRunner::VpcConnector", props.tags, { tagPropertyName: 'tags' });
        this.vpcConnectorName = props.vpcConnectorName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnVpcConnector.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            subnets: this.subnets,
            securityGroups: this.securityGroups,
            tags: this.tags.renderTags(),
            vpcConnectorName: this.vpcConnectorName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnVpcConnectorPropsToCloudFormation(props);
    }
}
