// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:12:00.411Z","fingerprint":"sEbLObISfQpf2snaVHv5uOVBMR8mjWyHeLDmuiOMZLQ="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnConfigurationSet`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-configurationset.html
 */
export interface CfnConfigurationSetProps {

    /**
     * The name of the configuration set. The name must meet the following requirements:
     *
     * - Contain only letters (a-z, A-Z), numbers (0-9), underscores (_), or dashes (-).
     * - Contain 64 characters or fewer.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-configurationset.html#cfn-ses-configurationset-name
     */
    readonly name?: string;
}

/**
 * Determine whether the given properties match those of a `CfnConfigurationSetProps`
 *
 * @param properties - the TypeScript properties of a `CfnConfigurationSetProps`
 *
 * @returns the result of the validation.
 */
function CfnConfigurationSetPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "CfnConfigurationSetProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ConfigurationSet` resource
 *
 * @param properties - the TypeScript properties of a `CfnConfigurationSetProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ConfigurationSet` resource.
 */
// @ts-ignore TS6133
function cfnConfigurationSetPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConfigurationSetPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnConfigurationSetPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConfigurationSetProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConfigurationSetProps>();
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SES::ConfigurationSet`
 *
 * The name of the configuration set.
 *
 * Configuration sets let you create groups of rules that you can apply to the emails you send using Amazon SES. For more information about using configuration sets, see [Using Amazon SES Configuration Sets](https://docs.aws.amazon.com/ses/latest/dg/using-configuration-sets.html) in the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/) .
 *
 * @cloudformationResource AWS::SES::ConfigurationSet
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-configurationset.html
 */
export class CfnConfigurationSet extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SES::ConfigurationSet";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnConfigurationSet {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnConfigurationSetPropsFromCloudFormation(resourceProperties);
        const ret = new CfnConfigurationSet(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the configuration set. The name must meet the following requirements:
     *
     * - Contain only letters (a-z, A-Z), numbers (0-9), underscores (_), or dashes (-).
     * - Contain 64 characters or fewer.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-configurationset.html#cfn-ses-configurationset-name
     */
    public name: string | undefined;

    /**
     * Create a new `AWS::SES::ConfigurationSet`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnConfigurationSetProps = {}) {
        super(scope, id, { type: CfnConfigurationSet.CFN_RESOURCE_TYPE_NAME, properties: props });

        this.name = props.name;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnConfigurationSet.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnConfigurationSetPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnConfigurationSetEventDestination`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-configurationseteventdestination.html
 */
export interface CfnConfigurationSetEventDestinationProps {

    /**
     * The name of the configuration set that contains the event destination.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-configurationseteventdestination.html#cfn-ses-configurationseteventdestination-configurationsetname
     */
    readonly configurationSetName: string;

    /**
     * The event destination object.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-configurationseteventdestination.html#cfn-ses-configurationseteventdestination-eventdestination
     */
    readonly eventDestination: CfnConfigurationSetEventDestination.EventDestinationProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnConfigurationSetEventDestinationProps`
 *
 * @param properties - the TypeScript properties of a `CfnConfigurationSetEventDestinationProps`
 *
 * @returns the result of the validation.
 */
function CfnConfigurationSetEventDestinationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('configurationSetName', cdk.requiredValidator)(properties.configurationSetName));
    errors.collect(cdk.propertyValidator('configurationSetName', cdk.validateString)(properties.configurationSetName));
    errors.collect(cdk.propertyValidator('eventDestination', cdk.requiredValidator)(properties.eventDestination));
    errors.collect(cdk.propertyValidator('eventDestination', CfnConfigurationSetEventDestination_EventDestinationPropertyValidator)(properties.eventDestination));
    return errors.wrap('supplied properties not correct for "CfnConfigurationSetEventDestinationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ConfigurationSetEventDestination` resource
 *
 * @param properties - the TypeScript properties of a `CfnConfigurationSetEventDestinationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ConfigurationSetEventDestination` resource.
 */
// @ts-ignore TS6133
function cfnConfigurationSetEventDestinationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConfigurationSetEventDestinationPropsValidator(properties).assertSuccess();
    return {
        ConfigurationSetName: cdk.stringToCloudFormation(properties.configurationSetName),
        EventDestination: cfnConfigurationSetEventDestinationEventDestinationPropertyToCloudFormation(properties.eventDestination),
    };
}

// @ts-ignore TS6133
function CfnConfigurationSetEventDestinationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConfigurationSetEventDestinationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConfigurationSetEventDestinationProps>();
    ret.addPropertyResult('configurationSetName', 'ConfigurationSetName', cfn_parse.FromCloudFormation.getString(properties.ConfigurationSetName));
    ret.addPropertyResult('eventDestination', 'EventDestination', CfnConfigurationSetEventDestinationEventDestinationPropertyFromCloudFormation(properties.EventDestination));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SES::ConfigurationSetEventDestination`
 *
 * Specifies a configuration set event destination. An event destination is an AWS service that Amazon SES publishes email sending events to. When you specify an event destination, you provide one, and only one, destination. You can send event data to Amazon CloudWatch or Amazon Kinesis Data Firehose.
 *
 * > You can't specify Amazon SNS event destinations in CloudFormation templates.
 *
 * @cloudformationResource AWS::SES::ConfigurationSetEventDestination
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-configurationseteventdestination.html
 */
export class CfnConfigurationSetEventDestination extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SES::ConfigurationSetEventDestination";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnConfigurationSetEventDestination {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnConfigurationSetEventDestinationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnConfigurationSetEventDestination(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     *
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The name of the configuration set that contains the event destination.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-configurationseteventdestination.html#cfn-ses-configurationseteventdestination-configurationsetname
     */
    public configurationSetName: string;

    /**
     * The event destination object.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-configurationseteventdestination.html#cfn-ses-configurationseteventdestination-eventdestination
     */
    public eventDestination: CfnConfigurationSetEventDestination.EventDestinationProperty | cdk.IResolvable;

    /**
     * Create a new `AWS::SES::ConfigurationSetEventDestination`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnConfigurationSetEventDestinationProps) {
        super(scope, id, { type: CfnConfigurationSetEventDestination.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'configurationSetName', this);
        cdk.requireProperty(props, 'eventDestination', this);
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.configurationSetName = props.configurationSetName;
        this.eventDestination = props.eventDestination;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnConfigurationSetEventDestination.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            configurationSetName: this.configurationSetName,
            eventDestination: this.eventDestination,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnConfigurationSetEventDestinationPropsToCloudFormation(props);
    }
}

export namespace CfnConfigurationSetEventDestination {
    /**
     * Contains information associated with an Amazon CloudWatch event destination to which email sending events are published.
     *
     * Event destinations, such as Amazon CloudWatch, are associated with configuration sets, which enable you to publish email sending events. For information about using configuration sets, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/monitor-sending-activity.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-cloudwatchdestination.html
     */
    export interface CloudWatchDestinationProperty {
        /**
         * A list of dimensions upon which to categorize your emails when you publish email sending events to Amazon CloudWatch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-cloudwatchdestination.html#cfn-ses-configurationseteventdestination-cloudwatchdestination-dimensionconfigurations
         */
        readonly dimensionConfigurations?: Array<CfnConfigurationSetEventDestination.DimensionConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `CloudWatchDestinationProperty`
 *
 * @param properties - the TypeScript properties of a `CloudWatchDestinationProperty`
 *
 * @returns the result of the validation.
 */
function CfnConfigurationSetEventDestination_CloudWatchDestinationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dimensionConfigurations', cdk.listValidator(CfnConfigurationSetEventDestination_DimensionConfigurationPropertyValidator))(properties.dimensionConfigurations));
    return errors.wrap('supplied properties not correct for "CloudWatchDestinationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ConfigurationSetEventDestination.CloudWatchDestination` resource
 *
 * @param properties - the TypeScript properties of a `CloudWatchDestinationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ConfigurationSetEventDestination.CloudWatchDestination` resource.
 */
// @ts-ignore TS6133
function cfnConfigurationSetEventDestinationCloudWatchDestinationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConfigurationSetEventDestination_CloudWatchDestinationPropertyValidator(properties).assertSuccess();
    return {
        DimensionConfigurations: cdk.listMapper(cfnConfigurationSetEventDestinationDimensionConfigurationPropertyToCloudFormation)(properties.dimensionConfigurations),
    };
}

// @ts-ignore TS6133
function CfnConfigurationSetEventDestinationCloudWatchDestinationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConfigurationSetEventDestination.CloudWatchDestinationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConfigurationSetEventDestination.CloudWatchDestinationProperty>();
    ret.addPropertyResult('dimensionConfigurations', 'DimensionConfigurations', properties.DimensionConfigurations != null ? cfn_parse.FromCloudFormation.getArray(CfnConfigurationSetEventDestinationDimensionConfigurationPropertyFromCloudFormation)(properties.DimensionConfigurations) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConfigurationSetEventDestination {
    /**
     * Contains the dimension configuration to use when you publish email sending events to Amazon CloudWatch.
     *
     * For information about publishing email sending events to Amazon CloudWatch, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/monitor-sending-activity.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-dimensionconfiguration.html
     */
    export interface DimensionConfigurationProperty {
        /**
         * The default value of the dimension that is published to Amazon CloudWatch if you do not provide the value of the dimension when you send an email. The default value must meet the following requirements:
         *
         * - Contain only ASCII letters (a-z, A-Z), numbers (0-9), underscores (_), dashes (-), at signs (@), or periods (.).
         * - Contain 256 characters or fewer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-dimensionconfiguration.html#cfn-ses-configurationseteventdestination-dimensionconfiguration-defaultdimensionvalue
         */
        readonly defaultDimensionValue: string;
        /**
         * The name of an Amazon CloudWatch dimension associated with an email sending metric. The name must meet the following requirements:
         *
         * - Contain only ASCII letters (a-z, A-Z), numbers (0-9), underscores (_), or dashes (-).
         * - Contain 256 characters or fewer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-dimensionconfiguration.html#cfn-ses-configurationseteventdestination-dimensionconfiguration-dimensionname
         */
        readonly dimensionName: string;
        /**
         * The place where Amazon SES finds the value of a dimension to publish to Amazon CloudWatch. To use the message tags that you specify using an `X-SES-MESSAGE-TAGS` header or a parameter to the `SendEmail` / `SendRawEmail` API, specify `messageTag` . To use your own email headers, specify `emailHeader` . To put a custom tag on any link included in your email, specify `linkTag` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-dimensionconfiguration.html#cfn-ses-configurationseteventdestination-dimensionconfiguration-dimensionvaluesource
         */
        readonly dimensionValueSource: string;
    }
}

/**
 * Determine whether the given properties match those of a `DimensionConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `DimensionConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnConfigurationSetEventDestination_DimensionConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('defaultDimensionValue', cdk.requiredValidator)(properties.defaultDimensionValue));
    errors.collect(cdk.propertyValidator('defaultDimensionValue', cdk.validateString)(properties.defaultDimensionValue));
    errors.collect(cdk.propertyValidator('dimensionName', cdk.requiredValidator)(properties.dimensionName));
    errors.collect(cdk.propertyValidator('dimensionName', cdk.validateString)(properties.dimensionName));
    errors.collect(cdk.propertyValidator('dimensionValueSource', cdk.requiredValidator)(properties.dimensionValueSource));
    errors.collect(cdk.propertyValidator('dimensionValueSource', cdk.validateString)(properties.dimensionValueSource));
    return errors.wrap('supplied properties not correct for "DimensionConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ConfigurationSetEventDestination.DimensionConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `DimensionConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ConfigurationSetEventDestination.DimensionConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnConfigurationSetEventDestinationDimensionConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConfigurationSetEventDestination_DimensionConfigurationPropertyValidator(properties).assertSuccess();
    return {
        DefaultDimensionValue: cdk.stringToCloudFormation(properties.defaultDimensionValue),
        DimensionName: cdk.stringToCloudFormation(properties.dimensionName),
        DimensionValueSource: cdk.stringToCloudFormation(properties.dimensionValueSource),
    };
}

// @ts-ignore TS6133
function CfnConfigurationSetEventDestinationDimensionConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConfigurationSetEventDestination.DimensionConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConfigurationSetEventDestination.DimensionConfigurationProperty>();
    ret.addPropertyResult('defaultDimensionValue', 'DefaultDimensionValue', cfn_parse.FromCloudFormation.getString(properties.DefaultDimensionValue));
    ret.addPropertyResult('dimensionName', 'DimensionName', cfn_parse.FromCloudFormation.getString(properties.DimensionName));
    ret.addPropertyResult('dimensionValueSource', 'DimensionValueSource', cfn_parse.FromCloudFormation.getString(properties.DimensionValueSource));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConfigurationSetEventDestination {
    /**
     * Contains information about an event destination.
     *
     * > When you create or update an event destination, you must provide one, and only one, destination. The destination can be Amazon CloudWatch, Amazon Kinesis Firehose or Amazon Simple Notification Service (Amazon SNS).
     *
     * Event destinations are associated with configuration sets, which enable you to publish email sending events to Amazon CloudWatch, Amazon Kinesis Firehose, or Amazon Simple Notification Service (Amazon SNS). For information about using configuration sets, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/monitor-sending-activity.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-eventdestination.html
     */
    export interface EventDestinationProperty {
        /**
         * An object that contains the names, default values, and sources of the dimensions associated with an Amazon CloudWatch event destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-eventdestination.html#cfn-ses-configurationseteventdestination-eventdestination-cloudwatchdestination
         */
        readonly cloudWatchDestination?: CfnConfigurationSetEventDestination.CloudWatchDestinationProperty | cdk.IResolvable;
        /**
         * Sets whether Amazon SES publishes events to this destination when you send an email with the associated configuration set. Set to `true` to enable publishing to this destination; set to `false` to prevent publishing to this destination. The default value is `false` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-eventdestination.html#cfn-ses-configurationseteventdestination-eventdestination-enabled
         */
        readonly enabled?: boolean | cdk.IResolvable;
        /**
         * An object that contains the delivery stream ARN and the IAM role ARN associated with an Amazon Kinesis Firehose event destination.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-eventdestination.html#cfn-ses-configurationseteventdestination-eventdestination-kinesisfirehosedestination
         */
        readonly kinesisFirehoseDestination?: CfnConfigurationSetEventDestination.KinesisFirehoseDestinationProperty | cdk.IResolvable;
        /**
         * The type of email sending events to publish to the event destination.
         *
         * - `send` - The call was successful and Amazon SES is attempting to deliver the email.
         * - `reject` - Amazon SES determined that the email contained a virus and rejected it.
         * - `bounce` - The recipient's mail server permanently rejected the email. This corresponds to a hard bounce.
         * - `complaint` - The recipient marked the email as spam.
         * - `delivery` - Amazon SES successfully delivered the email to the recipient's mail server.
         * - `open` - The recipient received the email and opened it in their email client.
         * - `click` - The recipient clicked one or more links in the email.
         * - `renderingFailure` - Amazon SES did not send the email because of a template rendering issue.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-eventdestination.html#cfn-ses-configurationseteventdestination-eventdestination-matchingeventtypes
         */
        readonly matchingEventTypes: string[];
        /**
         * The name of the event destination. The name must meet the following requirements:
         *
         * - Contain only ASCII letters (a-z, A-Z), numbers (0-9), underscores (_), or dashes (-).
         * - Contain 64 characters or fewer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-eventdestination.html#cfn-ses-configurationseteventdestination-eventdestination-name
         */
        readonly name?: string;
    }
}

/**
 * Determine whether the given properties match those of a `EventDestinationProperty`
 *
 * @param properties - the TypeScript properties of a `EventDestinationProperty`
 *
 * @returns the result of the validation.
 */
function CfnConfigurationSetEventDestination_EventDestinationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cloudWatchDestination', CfnConfigurationSetEventDestination_CloudWatchDestinationPropertyValidator)(properties.cloudWatchDestination));
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    errors.collect(cdk.propertyValidator('kinesisFirehoseDestination', CfnConfigurationSetEventDestination_KinesisFirehoseDestinationPropertyValidator)(properties.kinesisFirehoseDestination));
    errors.collect(cdk.propertyValidator('matchingEventTypes', cdk.requiredValidator)(properties.matchingEventTypes));
    errors.collect(cdk.propertyValidator('matchingEventTypes', cdk.listValidator(cdk.validateString))(properties.matchingEventTypes));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "EventDestinationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ConfigurationSetEventDestination.EventDestination` resource
 *
 * @param properties - the TypeScript properties of a `EventDestinationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ConfigurationSetEventDestination.EventDestination` resource.
 */
// @ts-ignore TS6133
function cfnConfigurationSetEventDestinationEventDestinationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConfigurationSetEventDestination_EventDestinationPropertyValidator(properties).assertSuccess();
    return {
        CloudWatchDestination: cfnConfigurationSetEventDestinationCloudWatchDestinationPropertyToCloudFormation(properties.cloudWatchDestination),
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
        KinesisFirehoseDestination: cfnConfigurationSetEventDestinationKinesisFirehoseDestinationPropertyToCloudFormation(properties.kinesisFirehoseDestination),
        MatchingEventTypes: cdk.listMapper(cdk.stringToCloudFormation)(properties.matchingEventTypes),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnConfigurationSetEventDestinationEventDestinationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConfigurationSetEventDestination.EventDestinationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConfigurationSetEventDestination.EventDestinationProperty>();
    ret.addPropertyResult('cloudWatchDestination', 'CloudWatchDestination', properties.CloudWatchDestination != null ? CfnConfigurationSetEventDestinationCloudWatchDestinationPropertyFromCloudFormation(properties.CloudWatchDestination) : undefined);
    ret.addPropertyResult('enabled', 'Enabled', properties.Enabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enabled) : undefined);
    ret.addPropertyResult('kinesisFirehoseDestination', 'KinesisFirehoseDestination', properties.KinesisFirehoseDestination != null ? CfnConfigurationSetEventDestinationKinesisFirehoseDestinationPropertyFromCloudFormation(properties.KinesisFirehoseDestination) : undefined);
    ret.addPropertyResult('matchingEventTypes', 'MatchingEventTypes', cfn_parse.FromCloudFormation.getStringArray(properties.MatchingEventTypes));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConfigurationSetEventDestination {
    /**
     * Contains the delivery stream ARN and the IAM role ARN associated with an Amazon Kinesis Firehose event destination.
     *
     * Event destinations, such as Amazon Kinesis Firehose, are associated with configuration sets, which enable you to publish email sending events. For information about using configuration sets, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/monitor-sending-activity.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-kinesisfirehosedestination.html
     */
    export interface KinesisFirehoseDestinationProperty {
        /**
         * The ARN of the Amazon Kinesis Firehose stream that email sending events should be published to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-kinesisfirehosedestination.html#cfn-ses-configurationseteventdestination-kinesisfirehosedestination-deliverystreamarn
         */
        readonly deliveryStreamArn: string;
        /**
         * The ARN of the IAM role under which Amazon SES publishes email sending events to the Amazon Kinesis Firehose stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-configurationseteventdestination-kinesisfirehosedestination.html#cfn-ses-configurationseteventdestination-kinesisfirehosedestination-iamrolearn
         */
        readonly iamRoleArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `KinesisFirehoseDestinationProperty`
 *
 * @param properties - the TypeScript properties of a `KinesisFirehoseDestinationProperty`
 *
 * @returns the result of the validation.
 */
function CfnConfigurationSetEventDestination_KinesisFirehoseDestinationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('deliveryStreamArn', cdk.requiredValidator)(properties.deliveryStreamArn));
    errors.collect(cdk.propertyValidator('deliveryStreamArn', cdk.validateString)(properties.deliveryStreamArn));
    errors.collect(cdk.propertyValidator('iamRoleArn', cdk.requiredValidator)(properties.iamRoleArn));
    errors.collect(cdk.propertyValidator('iamRoleArn', cdk.validateString)(properties.iamRoleArn));
    return errors.wrap('supplied properties not correct for "KinesisFirehoseDestinationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ConfigurationSetEventDestination.KinesisFirehoseDestination` resource
 *
 * @param properties - the TypeScript properties of a `KinesisFirehoseDestinationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ConfigurationSetEventDestination.KinesisFirehoseDestination` resource.
 */
// @ts-ignore TS6133
function cfnConfigurationSetEventDestinationKinesisFirehoseDestinationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConfigurationSetEventDestination_KinesisFirehoseDestinationPropertyValidator(properties).assertSuccess();
    return {
        DeliveryStreamARN: cdk.stringToCloudFormation(properties.deliveryStreamArn),
        IAMRoleARN: cdk.stringToCloudFormation(properties.iamRoleArn),
    };
}

// @ts-ignore TS6133
function CfnConfigurationSetEventDestinationKinesisFirehoseDestinationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConfigurationSetEventDestination.KinesisFirehoseDestinationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConfigurationSetEventDestination.KinesisFirehoseDestinationProperty>();
    ret.addPropertyResult('deliveryStreamArn', 'DeliveryStreamARN', cfn_parse.FromCloudFormation.getString(properties.DeliveryStreamARN));
    ret.addPropertyResult('iamRoleArn', 'IAMRoleARN', cfn_parse.FromCloudFormation.getString(properties.IAMRoleARN));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnContactList`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-contactlist.html
 */
export interface CfnContactListProps {

    /**
     * The name of the contact list.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-contactlist.html#cfn-ses-contactlist-contactlistname
     */
    readonly contactListName?: string;

    /**
     * A description of what the contact list is about.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-contactlist.html#cfn-ses-contactlist-description
     */
    readonly description?: string;

    /**
     * The tags associated with a contact list.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-contactlist.html#cfn-ses-contactlist-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * An interest group, theme, or label within a list. A contact list can have multiple topics.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-contactlist.html#cfn-ses-contactlist-topics
     */
    readonly topics?: Array<CfnContactList.TopicProperty | cdk.IResolvable> | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnContactListProps`
 *
 * @param properties - the TypeScript properties of a `CfnContactListProps`
 *
 * @returns the result of the validation.
 */
function CfnContactListPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('contactListName', cdk.validateString)(properties.contactListName));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('topics', cdk.listValidator(CfnContactList_TopicPropertyValidator))(properties.topics));
    return errors.wrap('supplied properties not correct for "CfnContactListProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ContactList` resource
 *
 * @param properties - the TypeScript properties of a `CfnContactListProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ContactList` resource.
 */
// @ts-ignore TS6133
function cfnContactListPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnContactListPropsValidator(properties).assertSuccess();
    return {
        ContactListName: cdk.stringToCloudFormation(properties.contactListName),
        Description: cdk.stringToCloudFormation(properties.description),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        Topics: cdk.listMapper(cfnContactListTopicPropertyToCloudFormation)(properties.topics),
    };
}

// @ts-ignore TS6133
function CfnContactListPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnContactListProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnContactListProps>();
    ret.addPropertyResult('contactListName', 'ContactListName', properties.ContactListName != null ? cfn_parse.FromCloudFormation.getString(properties.ContactListName) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('topics', 'Topics', properties.Topics != null ? cfn_parse.FromCloudFormation.getArray(CfnContactListTopicPropertyFromCloudFormation)(properties.Topics) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SES::ContactList`
 *
 * A list that contains contacts that have subscribed to a particular topic or topics.
 *
 * @cloudformationResource AWS::SES::ContactList
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-contactlist.html
 */
export class CfnContactList extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SES::ContactList";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnContactList {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnContactListPropsFromCloudFormation(resourceProperties);
        const ret = new CfnContactList(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the contact list.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-contactlist.html#cfn-ses-contactlist-contactlistname
     */
    public contactListName: string | undefined;

    /**
     * A description of what the contact list is about.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-contactlist.html#cfn-ses-contactlist-description
     */
    public description: string | undefined;

    /**
     * The tags associated with a contact list.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-contactlist.html#cfn-ses-contactlist-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * An interest group, theme, or label within a list. A contact list can have multiple topics.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-contactlist.html#cfn-ses-contactlist-topics
     */
    public topics: Array<CfnContactList.TopicProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::SES::ContactList`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnContactListProps = {}) {
        super(scope, id, { type: CfnContactList.CFN_RESOURCE_TYPE_NAME, properties: props });

        this.contactListName = props.contactListName;
        this.description = props.description;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::SES::ContactList", props.tags, { tagPropertyName: 'tags' });
        this.topics = props.topics;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnContactList.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            contactListName: this.contactListName,
            description: this.description,
            tags: this.tags.renderTags(),
            topics: this.topics,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnContactListPropsToCloudFormation(props);
    }
}

export namespace CfnContactList {
    /**
     * An interest group, theme, or label within a list. Lists can have multiple topics.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-contactlist-topic.html
     */
    export interface TopicProperty {
        /**
         * The default subscription status to be applied to a contact if the contact has not noted their preference for subscribing to a topic.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-contactlist-topic.html#cfn-ses-contactlist-topic-defaultsubscriptionstatus
         */
        readonly defaultSubscriptionStatus: string;
        /**
         * A description of what the topic is about, which the contact will see.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-contactlist-topic.html#cfn-ses-contactlist-topic-description
         */
        readonly description?: string;
        /**
         * The name of the topic the contact will see.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-contactlist-topic.html#cfn-ses-contactlist-topic-displayname
         */
        readonly displayName: string;
        /**
         * The name of the topic.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-contactlist-topic.html#cfn-ses-contactlist-topic-topicname
         */
        readonly topicName: string;
    }
}

/**
 * Determine whether the given properties match those of a `TopicProperty`
 *
 * @param properties - the TypeScript properties of a `TopicProperty`
 *
 * @returns the result of the validation.
 */
function CfnContactList_TopicPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('defaultSubscriptionStatus', cdk.requiredValidator)(properties.defaultSubscriptionStatus));
    errors.collect(cdk.propertyValidator('defaultSubscriptionStatus', cdk.validateString)(properties.defaultSubscriptionStatus));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('displayName', cdk.requiredValidator)(properties.displayName));
    errors.collect(cdk.propertyValidator('displayName', cdk.validateString)(properties.displayName));
    errors.collect(cdk.propertyValidator('topicName', cdk.requiredValidator)(properties.topicName));
    errors.collect(cdk.propertyValidator('topicName', cdk.validateString)(properties.topicName));
    return errors.wrap('supplied properties not correct for "TopicProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ContactList.Topic` resource
 *
 * @param properties - the TypeScript properties of a `TopicProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ContactList.Topic` resource.
 */
// @ts-ignore TS6133
function cfnContactListTopicPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnContactList_TopicPropertyValidator(properties).assertSuccess();
    return {
        DefaultSubscriptionStatus: cdk.stringToCloudFormation(properties.defaultSubscriptionStatus),
        Description: cdk.stringToCloudFormation(properties.description),
        DisplayName: cdk.stringToCloudFormation(properties.displayName),
        TopicName: cdk.stringToCloudFormation(properties.topicName),
    };
}

// @ts-ignore TS6133
function CfnContactListTopicPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnContactList.TopicProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnContactList.TopicProperty>();
    ret.addPropertyResult('defaultSubscriptionStatus', 'DefaultSubscriptionStatus', cfn_parse.FromCloudFormation.getString(properties.DefaultSubscriptionStatus));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('displayName', 'DisplayName', cfn_parse.FromCloudFormation.getString(properties.DisplayName));
    ret.addPropertyResult('topicName', 'TopicName', cfn_parse.FromCloudFormation.getString(properties.TopicName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnReceiptFilter`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptfilter.html
 */
export interface CfnReceiptFilterProps {

    /**
     * A data structure that describes the IP address filter to create, which consists of a name, an IP address range, and whether to allow or block mail from it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptfilter.html#cfn-ses-receiptfilter-filter
     */
    readonly filter: CfnReceiptFilter.FilterProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnReceiptFilterProps`
 *
 * @param properties - the TypeScript properties of a `CfnReceiptFilterProps`
 *
 * @returns the result of the validation.
 */
function CfnReceiptFilterPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('filter', cdk.requiredValidator)(properties.filter));
    errors.collect(cdk.propertyValidator('filter', CfnReceiptFilter_FilterPropertyValidator)(properties.filter));
    return errors.wrap('supplied properties not correct for "CfnReceiptFilterProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ReceiptFilter` resource
 *
 * @param properties - the TypeScript properties of a `CfnReceiptFilterProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ReceiptFilter` resource.
 */
// @ts-ignore TS6133
function cfnReceiptFilterPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReceiptFilterPropsValidator(properties).assertSuccess();
    return {
        Filter: cfnReceiptFilterFilterPropertyToCloudFormation(properties.filter),
    };
}

// @ts-ignore TS6133
function CfnReceiptFilterPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReceiptFilterProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReceiptFilterProps>();
    ret.addPropertyResult('filter', 'Filter', CfnReceiptFilterFilterPropertyFromCloudFormation(properties.Filter));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SES::ReceiptFilter`
 *
 * Specify a new IP address filter. You use IP address filters when you receive email with Amazon SES.
 *
 * @cloudformationResource AWS::SES::ReceiptFilter
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptfilter.html
 */
export class CfnReceiptFilter extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SES::ReceiptFilter";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnReceiptFilter {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnReceiptFilterPropsFromCloudFormation(resourceProperties);
        const ret = new CfnReceiptFilter(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A data structure that describes the IP address filter to create, which consists of a name, an IP address range, and whether to allow or block mail from it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptfilter.html#cfn-ses-receiptfilter-filter
     */
    public filter: CfnReceiptFilter.FilterProperty | cdk.IResolvable;

    /**
     * Create a new `AWS::SES::ReceiptFilter`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnReceiptFilterProps) {
        super(scope, id, { type: CfnReceiptFilter.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'filter', this);

        this.filter = props.filter;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnReceiptFilter.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            filter: this.filter,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnReceiptFilterPropsToCloudFormation(props);
    }
}

export namespace CfnReceiptFilter {
    /**
     * Specifies an IP address filter.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptfilter-filter.html
     */
    export interface FilterProperty {
        /**
         * A structure that provides the IP addresses to block or allow, and whether to block or allow incoming mail from them.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptfilter-filter.html#cfn-ses-receiptfilter-filter-ipfilter
         */
        readonly ipFilter: CfnReceiptFilter.IpFilterProperty | cdk.IResolvable;
        /**
         * The name of the IP address filter. The name must meet the following requirements:
         *
         * - Contain only ASCII letters (a-z, A-Z), numbers (0-9), underscores (_), or dashes (-).
         * - Start and end with a letter or number.
         * - Contain 64 characters or fewer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptfilter-filter.html#cfn-ses-receiptfilter-filter-name
         */
        readonly name?: string;
    }
}

/**
 * Determine whether the given properties match those of a `FilterProperty`
 *
 * @param properties - the TypeScript properties of a `FilterProperty`
 *
 * @returns the result of the validation.
 */
function CfnReceiptFilter_FilterPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('ipFilter', cdk.requiredValidator)(properties.ipFilter));
    errors.collect(cdk.propertyValidator('ipFilter', CfnReceiptFilter_IpFilterPropertyValidator)(properties.ipFilter));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "FilterProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ReceiptFilter.Filter` resource
 *
 * @param properties - the TypeScript properties of a `FilterProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ReceiptFilter.Filter` resource.
 */
// @ts-ignore TS6133
function cfnReceiptFilterFilterPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReceiptFilter_FilterPropertyValidator(properties).assertSuccess();
    return {
        IpFilter: cfnReceiptFilterIpFilterPropertyToCloudFormation(properties.ipFilter),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnReceiptFilterFilterPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReceiptFilter.FilterProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReceiptFilter.FilterProperty>();
    ret.addPropertyResult('ipFilter', 'IpFilter', CfnReceiptFilterIpFilterPropertyFromCloudFormation(properties.IpFilter));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnReceiptFilter {
    /**
     * A receipt IP address filter enables you to specify whether to accept or reject mail originating from an IP address or range of IP addresses.
     *
     * For information about setting up IP address filters, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-ip-filtering-console-walkthrough.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptfilter-ipfilter.html
     */
    export interface IpFilterProperty {
        /**
         * A single IP address or a range of IP addresses to block or allow, specified in Classless Inter-Domain Routing (CIDR) notation. An example of a single email address is 10.0.0.1. An example of a range of IP addresses is 10.0.0.1/24. For more information about CIDR notation, see [RFC 2317](https://docs.aws.amazon.com/https://tools.ietf.org/html/rfc2317) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptfilter-ipfilter.html#cfn-ses-receiptfilter-ipfilter-cidr
         */
        readonly cidr: string;
        /**
         * Indicates whether to block or allow incoming mail from the specified IP addresses.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptfilter-ipfilter.html#cfn-ses-receiptfilter-ipfilter-policy
         */
        readonly policy: string;
    }
}

/**
 * Determine whether the given properties match those of a `IpFilterProperty`
 *
 * @param properties - the TypeScript properties of a `IpFilterProperty`
 *
 * @returns the result of the validation.
 */
function CfnReceiptFilter_IpFilterPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cidr', cdk.requiredValidator)(properties.cidr));
    errors.collect(cdk.propertyValidator('cidr', cdk.validateString)(properties.cidr));
    errors.collect(cdk.propertyValidator('policy', cdk.requiredValidator)(properties.policy));
    errors.collect(cdk.propertyValidator('policy', cdk.validateString)(properties.policy));
    return errors.wrap('supplied properties not correct for "IpFilterProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ReceiptFilter.IpFilter` resource
 *
 * @param properties - the TypeScript properties of a `IpFilterProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ReceiptFilter.IpFilter` resource.
 */
// @ts-ignore TS6133
function cfnReceiptFilterIpFilterPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReceiptFilter_IpFilterPropertyValidator(properties).assertSuccess();
    return {
        Cidr: cdk.stringToCloudFormation(properties.cidr),
        Policy: cdk.stringToCloudFormation(properties.policy),
    };
}

// @ts-ignore TS6133
function CfnReceiptFilterIpFilterPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReceiptFilter.IpFilterProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReceiptFilter.IpFilterProperty>();
    ret.addPropertyResult('cidr', 'Cidr', cfn_parse.FromCloudFormation.getString(properties.Cidr));
    ret.addPropertyResult('policy', 'Policy', cfn_parse.FromCloudFormation.getString(properties.Policy));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnReceiptRule`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptrule.html
 */
export interface CfnReceiptRuleProps {

    /**
     * A data structure that contains the specified rule's name, actions, recipients, domains, enabled status, scan status, and TLS policy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptrule.html#cfn-ses-receiptrule-rule
     */
    readonly rule: CfnReceiptRule.RuleProperty | cdk.IResolvable;

    /**
     * The name of the rule set where the receipt rule is added.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptrule.html#cfn-ses-receiptrule-rulesetname
     */
    readonly ruleSetName: string;

    /**
     * The name of an existing rule after which the new rule is placed. If this parameter is null, the new rule is inserted at the beginning of the rule list.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptrule.html#cfn-ses-receiptrule-after
     */
    readonly after?: string;
}

/**
 * Determine whether the given properties match those of a `CfnReceiptRuleProps`
 *
 * @param properties - the TypeScript properties of a `CfnReceiptRuleProps`
 *
 * @returns the result of the validation.
 */
function CfnReceiptRulePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('after', cdk.validateString)(properties.after));
    errors.collect(cdk.propertyValidator('rule', cdk.requiredValidator)(properties.rule));
    errors.collect(cdk.propertyValidator('rule', CfnReceiptRule_RulePropertyValidator)(properties.rule));
    errors.collect(cdk.propertyValidator('ruleSetName', cdk.requiredValidator)(properties.ruleSetName));
    errors.collect(cdk.propertyValidator('ruleSetName', cdk.validateString)(properties.ruleSetName));
    return errors.wrap('supplied properties not correct for "CfnReceiptRuleProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ReceiptRule` resource
 *
 * @param properties - the TypeScript properties of a `CfnReceiptRuleProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ReceiptRule` resource.
 */
// @ts-ignore TS6133
function cfnReceiptRulePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReceiptRulePropsValidator(properties).assertSuccess();
    return {
        Rule: cfnReceiptRuleRulePropertyToCloudFormation(properties.rule),
        RuleSetName: cdk.stringToCloudFormation(properties.ruleSetName),
        After: cdk.stringToCloudFormation(properties.after),
    };
}

// @ts-ignore TS6133
function CfnReceiptRulePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReceiptRuleProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReceiptRuleProps>();
    ret.addPropertyResult('rule', 'Rule', CfnReceiptRuleRulePropertyFromCloudFormation(properties.Rule));
    ret.addPropertyResult('ruleSetName', 'RuleSetName', cfn_parse.FromCloudFormation.getString(properties.RuleSetName));
    ret.addPropertyResult('after', 'After', properties.After != null ? cfn_parse.FromCloudFormation.getString(properties.After) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SES::ReceiptRule`
 *
 * Specifies a receipt rule.
 *
 * @cloudformationResource AWS::SES::ReceiptRule
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptrule.html
 */
export class CfnReceiptRule extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SES::ReceiptRule";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnReceiptRule {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnReceiptRulePropsFromCloudFormation(resourceProperties);
        const ret = new CfnReceiptRule(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A data structure that contains the specified rule's name, actions, recipients, domains, enabled status, scan status, and TLS policy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptrule.html#cfn-ses-receiptrule-rule
     */
    public rule: CfnReceiptRule.RuleProperty | cdk.IResolvable;

    /**
     * The name of the rule set where the receipt rule is added.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptrule.html#cfn-ses-receiptrule-rulesetname
     */
    public ruleSetName: string;

    /**
     * The name of an existing rule after which the new rule is placed. If this parameter is null, the new rule is inserted at the beginning of the rule list.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptrule.html#cfn-ses-receiptrule-after
     */
    public after: string | undefined;

    /**
     * Create a new `AWS::SES::ReceiptRule`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnReceiptRuleProps) {
        super(scope, id, { type: CfnReceiptRule.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'rule', this);
        cdk.requireProperty(props, 'ruleSetName', this);

        this.rule = props.rule;
        this.ruleSetName = props.ruleSetName;
        this.after = props.after;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnReceiptRule.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            rule: this.rule,
            ruleSetName: this.ruleSetName,
            after: this.after,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnReceiptRulePropsToCloudFormation(props);
    }
}

export namespace CfnReceiptRule {
    /**
     * An action that Amazon SES can take when it receives an email on behalf of one or more email addresses or domains that you own. An instance of this data type can represent only one action.
     *
     * For information about setting up receipt rules, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-receipt-rules-console-walkthrough.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-action.html
     */
    export interface ActionProperty {
        /**
         * Adds a header to the received email.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-action.html#cfn-ses-receiptrule-action-addheaderaction
         */
        readonly addHeaderAction?: CfnReceiptRule.AddHeaderActionProperty | cdk.IResolvable;
        /**
         * Rejects the received email by returning a bounce response to the sender and, optionally, publishes a notification to Amazon Simple Notification Service (Amazon SNS).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-action.html#cfn-ses-receiptrule-action-bounceaction
         */
        readonly bounceAction?: CfnReceiptRule.BounceActionProperty | cdk.IResolvable;
        /**
         * Calls an AWS Lambda function, and optionally, publishes a notification to Amazon SNS.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-action.html#cfn-ses-receiptrule-action-lambdaaction
         */
        readonly lambdaAction?: CfnReceiptRule.LambdaActionProperty | cdk.IResolvable;
        /**
         * Saves the received message to an Amazon Simple Storage Service (Amazon S3) bucket and, optionally, publishes a notification to Amazon SNS.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-action.html#cfn-ses-receiptrule-action-s3action
         */
        readonly s3Action?: CfnReceiptRule.S3ActionProperty | cdk.IResolvable;
        /**
         * Publishes the email content within a notification to Amazon SNS.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-action.html#cfn-ses-receiptrule-action-snsaction
         */
        readonly snsAction?: CfnReceiptRule.SNSActionProperty | cdk.IResolvable;
        /**
         * Terminates the evaluation of the receipt rule set and optionally publishes a notification to Amazon SNS.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-action.html#cfn-ses-receiptrule-action-stopaction
         */
        readonly stopAction?: CfnReceiptRule.StopActionProperty | cdk.IResolvable;
        /**
         * Calls Amazon WorkMail and, optionally, publishes a notification to Amazon Amazon SNS.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-action.html#cfn-ses-receiptrule-action-workmailaction
         */
        readonly workmailAction?: CfnReceiptRule.WorkmailActionProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ActionProperty`
 *
 * @param properties - the TypeScript properties of a `ActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnReceiptRule_ActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('addHeaderAction', CfnReceiptRule_AddHeaderActionPropertyValidator)(properties.addHeaderAction));
    errors.collect(cdk.propertyValidator('bounceAction', CfnReceiptRule_BounceActionPropertyValidator)(properties.bounceAction));
    errors.collect(cdk.propertyValidator('lambdaAction', CfnReceiptRule_LambdaActionPropertyValidator)(properties.lambdaAction));
    errors.collect(cdk.propertyValidator('s3Action', CfnReceiptRule_S3ActionPropertyValidator)(properties.s3Action));
    errors.collect(cdk.propertyValidator('snsAction', CfnReceiptRule_SNSActionPropertyValidator)(properties.snsAction));
    errors.collect(cdk.propertyValidator('stopAction', CfnReceiptRule_StopActionPropertyValidator)(properties.stopAction));
    errors.collect(cdk.propertyValidator('workmailAction', CfnReceiptRule_WorkmailActionPropertyValidator)(properties.workmailAction));
    return errors.wrap('supplied properties not correct for "ActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.Action` resource
 *
 * @param properties - the TypeScript properties of a `ActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.Action` resource.
 */
// @ts-ignore TS6133
function cfnReceiptRuleActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReceiptRule_ActionPropertyValidator(properties).assertSuccess();
    return {
        AddHeaderAction: cfnReceiptRuleAddHeaderActionPropertyToCloudFormation(properties.addHeaderAction),
        BounceAction: cfnReceiptRuleBounceActionPropertyToCloudFormation(properties.bounceAction),
        LambdaAction: cfnReceiptRuleLambdaActionPropertyToCloudFormation(properties.lambdaAction),
        S3Action: cfnReceiptRuleS3ActionPropertyToCloudFormation(properties.s3Action),
        SNSAction: cfnReceiptRuleSNSActionPropertyToCloudFormation(properties.snsAction),
        StopAction: cfnReceiptRuleStopActionPropertyToCloudFormation(properties.stopAction),
        WorkmailAction: cfnReceiptRuleWorkmailActionPropertyToCloudFormation(properties.workmailAction),
    };
}

// @ts-ignore TS6133
function CfnReceiptRuleActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReceiptRule.ActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReceiptRule.ActionProperty>();
    ret.addPropertyResult('addHeaderAction', 'AddHeaderAction', properties.AddHeaderAction != null ? CfnReceiptRuleAddHeaderActionPropertyFromCloudFormation(properties.AddHeaderAction) : undefined);
    ret.addPropertyResult('bounceAction', 'BounceAction', properties.BounceAction != null ? CfnReceiptRuleBounceActionPropertyFromCloudFormation(properties.BounceAction) : undefined);
    ret.addPropertyResult('lambdaAction', 'LambdaAction', properties.LambdaAction != null ? CfnReceiptRuleLambdaActionPropertyFromCloudFormation(properties.LambdaAction) : undefined);
    ret.addPropertyResult('s3Action', 'S3Action', properties.S3Action != null ? CfnReceiptRuleS3ActionPropertyFromCloudFormation(properties.S3Action) : undefined);
    ret.addPropertyResult('snsAction', 'SNSAction', properties.SNSAction != null ? CfnReceiptRuleSNSActionPropertyFromCloudFormation(properties.SNSAction) : undefined);
    ret.addPropertyResult('stopAction', 'StopAction', properties.StopAction != null ? CfnReceiptRuleStopActionPropertyFromCloudFormation(properties.StopAction) : undefined);
    ret.addPropertyResult('workmailAction', 'WorkmailAction', properties.WorkmailAction != null ? CfnReceiptRuleWorkmailActionPropertyFromCloudFormation(properties.WorkmailAction) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnReceiptRule {
    /**
     * When included in a receipt rule, this action adds a header to the received email.
     *
     * For information about adding a header using a receipt rule, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-action-add-header.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-addheaderaction.html
     */
    export interface AddHeaderActionProperty {
        /**
         * The name of the header to add to the incoming message. The name must contain at least one character, and can contain up to 50 characters. It consists of alphanumeric (a–z, A–Z, 0–9) characters and dashes.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-addheaderaction.html#cfn-ses-receiptrule-addheaderaction-headername
         */
        readonly headerName: string;
        /**
         * The content to include in the header. This value can contain up to 2048 characters. It can't contain newline ( `\n` ) or carriage return ( `\r` ) characters.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-addheaderaction.html#cfn-ses-receiptrule-addheaderaction-headervalue
         */
        readonly headerValue: string;
    }
}

/**
 * Determine whether the given properties match those of a `AddHeaderActionProperty`
 *
 * @param properties - the TypeScript properties of a `AddHeaderActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnReceiptRule_AddHeaderActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('headerName', cdk.requiredValidator)(properties.headerName));
    errors.collect(cdk.propertyValidator('headerName', cdk.validateString)(properties.headerName));
    errors.collect(cdk.propertyValidator('headerValue', cdk.requiredValidator)(properties.headerValue));
    errors.collect(cdk.propertyValidator('headerValue', cdk.validateString)(properties.headerValue));
    return errors.wrap('supplied properties not correct for "AddHeaderActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.AddHeaderAction` resource
 *
 * @param properties - the TypeScript properties of a `AddHeaderActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.AddHeaderAction` resource.
 */
// @ts-ignore TS6133
function cfnReceiptRuleAddHeaderActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReceiptRule_AddHeaderActionPropertyValidator(properties).assertSuccess();
    return {
        HeaderName: cdk.stringToCloudFormation(properties.headerName),
        HeaderValue: cdk.stringToCloudFormation(properties.headerValue),
    };
}

// @ts-ignore TS6133
function CfnReceiptRuleAddHeaderActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReceiptRule.AddHeaderActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReceiptRule.AddHeaderActionProperty>();
    ret.addPropertyResult('headerName', 'HeaderName', cfn_parse.FromCloudFormation.getString(properties.HeaderName));
    ret.addPropertyResult('headerValue', 'HeaderValue', cfn_parse.FromCloudFormation.getString(properties.HeaderValue));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnReceiptRule {
    /**
     * When included in a receipt rule, this action rejects the received email by returning a bounce response to the sender and, optionally, publishes a notification to Amazon Simple Notification Service (Amazon SNS).
     *
     * For information about sending a bounce message in response to a received email, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-action-bounce.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-bounceaction.html
     */
    export interface BounceActionProperty {
        /**
         * Human-readable text to include in the bounce message.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-bounceaction.html#cfn-ses-receiptrule-bounceaction-message
         */
        readonly message: string;
        /**
         * The email address of the sender of the bounced email. This is the address from which the bounce message is sent.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-bounceaction.html#cfn-ses-receiptrule-bounceaction-sender
         */
        readonly sender: string;
        /**
         * The SMTP reply code, as defined by [RFC 5321](https://docs.aws.amazon.com/https://tools.ietf.org/html/rfc5321) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-bounceaction.html#cfn-ses-receiptrule-bounceaction-smtpreplycode
         */
        readonly smtpReplyCode: string;
        /**
         * The SMTP enhanced status code, as defined by [RFC 3463](https://docs.aws.amazon.com/https://tools.ietf.org/html/rfc3463) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-bounceaction.html#cfn-ses-receiptrule-bounceaction-statuscode
         */
        readonly statusCode?: string;
        /**
         * The Amazon Resource Name (ARN) of the Amazon SNS topic to notify when the bounce action is taken. You can find the ARN of a topic by using the [ListTopics](https://docs.aws.amazon.com/sns/latest/api/API_ListTopics.html) operation in Amazon SNS.
         *
         * For more information about Amazon SNS topics, see the [Amazon SNS Developer Guide](https://docs.aws.amazon.com/sns/latest/dg/CreateTopic.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-bounceaction.html#cfn-ses-receiptrule-bounceaction-topicarn
         */
        readonly topicArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `BounceActionProperty`
 *
 * @param properties - the TypeScript properties of a `BounceActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnReceiptRule_BounceActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('message', cdk.requiredValidator)(properties.message));
    errors.collect(cdk.propertyValidator('message', cdk.validateString)(properties.message));
    errors.collect(cdk.propertyValidator('sender', cdk.requiredValidator)(properties.sender));
    errors.collect(cdk.propertyValidator('sender', cdk.validateString)(properties.sender));
    errors.collect(cdk.propertyValidator('smtpReplyCode', cdk.requiredValidator)(properties.smtpReplyCode));
    errors.collect(cdk.propertyValidator('smtpReplyCode', cdk.validateString)(properties.smtpReplyCode));
    errors.collect(cdk.propertyValidator('statusCode', cdk.validateString)(properties.statusCode));
    errors.collect(cdk.propertyValidator('topicArn', cdk.validateString)(properties.topicArn));
    return errors.wrap('supplied properties not correct for "BounceActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.BounceAction` resource
 *
 * @param properties - the TypeScript properties of a `BounceActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.BounceAction` resource.
 */
// @ts-ignore TS6133
function cfnReceiptRuleBounceActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReceiptRule_BounceActionPropertyValidator(properties).assertSuccess();
    return {
        Message: cdk.stringToCloudFormation(properties.message),
        Sender: cdk.stringToCloudFormation(properties.sender),
        SmtpReplyCode: cdk.stringToCloudFormation(properties.smtpReplyCode),
        StatusCode: cdk.stringToCloudFormation(properties.statusCode),
        TopicArn: cdk.stringToCloudFormation(properties.topicArn),
    };
}

// @ts-ignore TS6133
function CfnReceiptRuleBounceActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReceiptRule.BounceActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReceiptRule.BounceActionProperty>();
    ret.addPropertyResult('message', 'Message', cfn_parse.FromCloudFormation.getString(properties.Message));
    ret.addPropertyResult('sender', 'Sender', cfn_parse.FromCloudFormation.getString(properties.Sender));
    ret.addPropertyResult('smtpReplyCode', 'SmtpReplyCode', cfn_parse.FromCloudFormation.getString(properties.SmtpReplyCode));
    ret.addPropertyResult('statusCode', 'StatusCode', properties.StatusCode != null ? cfn_parse.FromCloudFormation.getString(properties.StatusCode) : undefined);
    ret.addPropertyResult('topicArn', 'TopicArn', properties.TopicArn != null ? cfn_parse.FromCloudFormation.getString(properties.TopicArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnReceiptRule {
    /**
     * When included in a receipt rule, this action calls an AWS Lambda function and, optionally, publishes a notification to Amazon Simple Notification Service (Amazon SNS).
     *
     * To enable Amazon SES to call your AWS Lambda function or to publish to an Amazon SNS topic of another account, Amazon SES must have permission to access those resources. For information about giving permissions, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-permissions.html) .
     *
     * For information about using AWS Lambda actions in receipt rules, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-action-lambda.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-lambdaaction.html
     */
    export interface LambdaActionProperty {
        /**
         * The Amazon Resource Name (ARN) of the AWS Lambda function. An example of an AWS Lambda function ARN is `arn:aws:lambda:us-west-2:account-id:function:MyFunction` . For more information about AWS Lambda, see the [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-lambdaaction.html#cfn-ses-receiptrule-lambdaaction-functionarn
         */
        readonly functionArn: string;
        /**
         * The invocation type of the AWS Lambda function. An invocation type of `RequestResponse` means that the execution of the function immediately results in a response, and a value of `Event` means that the function is invoked asynchronously. The default value is `Event` . For information about AWS Lambda invocation types, see the [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html) .
         *
         * > There is a 30-second timeout on `RequestResponse` invocations. You should use `Event` invocation in most cases. Use `RequestResponse` only to make a mail flow decision, such as whether to stop the receipt rule or the receipt rule set.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-lambdaaction.html#cfn-ses-receiptrule-lambdaaction-invocationtype
         */
        readonly invocationType?: string;
        /**
         * The Amazon Resource Name (ARN) of the Amazon SNS topic to notify when the Lambda action is executed. You can find the ARN of a topic by using the [ListTopics](https://docs.aws.amazon.com/sns/latest/api/API_ListTopics.html) operation in Amazon SNS.
         *
         * For more information about Amazon SNS topics, see the [Amazon SNS Developer Guide](https://docs.aws.amazon.com/sns/latest/dg/CreateTopic.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-lambdaaction.html#cfn-ses-receiptrule-lambdaaction-topicarn
         */
        readonly topicArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LambdaActionProperty`
 *
 * @param properties - the TypeScript properties of a `LambdaActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnReceiptRule_LambdaActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('functionArn', cdk.requiredValidator)(properties.functionArn));
    errors.collect(cdk.propertyValidator('functionArn', cdk.validateString)(properties.functionArn));
    errors.collect(cdk.propertyValidator('invocationType', cdk.validateString)(properties.invocationType));
    errors.collect(cdk.propertyValidator('topicArn', cdk.validateString)(properties.topicArn));
    return errors.wrap('supplied properties not correct for "LambdaActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.LambdaAction` resource
 *
 * @param properties - the TypeScript properties of a `LambdaActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.LambdaAction` resource.
 */
// @ts-ignore TS6133
function cfnReceiptRuleLambdaActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReceiptRule_LambdaActionPropertyValidator(properties).assertSuccess();
    return {
        FunctionArn: cdk.stringToCloudFormation(properties.functionArn),
        InvocationType: cdk.stringToCloudFormation(properties.invocationType),
        TopicArn: cdk.stringToCloudFormation(properties.topicArn),
    };
}

// @ts-ignore TS6133
function CfnReceiptRuleLambdaActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReceiptRule.LambdaActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReceiptRule.LambdaActionProperty>();
    ret.addPropertyResult('functionArn', 'FunctionArn', cfn_parse.FromCloudFormation.getString(properties.FunctionArn));
    ret.addPropertyResult('invocationType', 'InvocationType', properties.InvocationType != null ? cfn_parse.FromCloudFormation.getString(properties.InvocationType) : undefined);
    ret.addPropertyResult('topicArn', 'TopicArn', properties.TopicArn != null ? cfn_parse.FromCloudFormation.getString(properties.TopicArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnReceiptRule {
    /**
     * Receipt rules enable you to specify which actions Amazon SES should take when it receives mail on behalf of one or more email addresses or domains that you own.
     *
     * Each receipt rule defines a set of email addresses or domains that it applies to. If the email addresses or domains match at least one recipient address of the message, Amazon SES executes all of the receipt rule's actions on the message.
     *
     * For information about setting up receipt rules, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-receipt-rules-console-walkthrough.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-rule.html
     */
    export interface RuleProperty {
        /**
         * An ordered list of actions to perform on messages that match at least one of the recipient email addresses or domains specified in the receipt rule.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-rule.html#cfn-ses-receiptrule-rule-actions
         */
        readonly actions?: Array<CfnReceiptRule.ActionProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * If `true` , the receipt rule is active. The default value is `false` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-rule.html#cfn-ses-receiptrule-rule-enabled
         */
        readonly enabled?: boolean | cdk.IResolvable;
        /**
         * The name of the receipt rule. The name must meet the following requirements:
         *
         * - Contain only ASCII letters (a-z, A-Z), numbers (0-9), underscores (_), or dashes (-).
         * - Start and end with a letter or number.
         * - Contain 64 characters or fewer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-rule.html#cfn-ses-receiptrule-rule-name
         */
        readonly name?: string;
        /**
         * The recipient domains and email addresses that the receipt rule applies to. If this field is not specified, this rule matches all recipients on all verified domains.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-rule.html#cfn-ses-receiptrule-rule-recipients
         */
        readonly recipients?: string[];
        /**
         * If `true` , then messages that this receipt rule applies to are scanned for spam and viruses. The default value is `false` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-rule.html#cfn-ses-receiptrule-rule-scanenabled
         */
        readonly scanEnabled?: boolean | cdk.IResolvable;
        /**
         * Specifies whether Amazon SES should require that incoming email is delivered over a connection encrypted with Transport Layer Security (TLS). If this parameter is set to `Require` , Amazon SES bounces emails that are not received over TLS. The default is `Optional` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-rule.html#cfn-ses-receiptrule-rule-tlspolicy
         */
        readonly tlsPolicy?: string;
    }
}

/**
 * Determine whether the given properties match those of a `RuleProperty`
 *
 * @param properties - the TypeScript properties of a `RuleProperty`
 *
 * @returns the result of the validation.
 */
function CfnReceiptRule_RulePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('actions', cdk.listValidator(CfnReceiptRule_ActionPropertyValidator))(properties.actions));
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('recipients', cdk.listValidator(cdk.validateString))(properties.recipients));
    errors.collect(cdk.propertyValidator('scanEnabled', cdk.validateBoolean)(properties.scanEnabled));
    errors.collect(cdk.propertyValidator('tlsPolicy', cdk.validateString)(properties.tlsPolicy));
    return errors.wrap('supplied properties not correct for "RuleProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.Rule` resource
 *
 * @param properties - the TypeScript properties of a `RuleProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.Rule` resource.
 */
// @ts-ignore TS6133
function cfnReceiptRuleRulePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReceiptRule_RulePropertyValidator(properties).assertSuccess();
    return {
        Actions: cdk.listMapper(cfnReceiptRuleActionPropertyToCloudFormation)(properties.actions),
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
        Name: cdk.stringToCloudFormation(properties.name),
        Recipients: cdk.listMapper(cdk.stringToCloudFormation)(properties.recipients),
        ScanEnabled: cdk.booleanToCloudFormation(properties.scanEnabled),
        TlsPolicy: cdk.stringToCloudFormation(properties.tlsPolicy),
    };
}

// @ts-ignore TS6133
function CfnReceiptRuleRulePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReceiptRule.RuleProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReceiptRule.RuleProperty>();
    ret.addPropertyResult('actions', 'Actions', properties.Actions != null ? cfn_parse.FromCloudFormation.getArray(CfnReceiptRuleActionPropertyFromCloudFormation)(properties.Actions) : undefined);
    ret.addPropertyResult('enabled', 'Enabled', properties.Enabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enabled) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('recipients', 'Recipients', properties.Recipients != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Recipients) : undefined);
    ret.addPropertyResult('scanEnabled', 'ScanEnabled', properties.ScanEnabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.ScanEnabled) : undefined);
    ret.addPropertyResult('tlsPolicy', 'TlsPolicy', properties.TlsPolicy != null ? cfn_parse.FromCloudFormation.getString(properties.TlsPolicy) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnReceiptRule {
    /**
     * When included in a receipt rule, this action saves the received message to an Amazon Simple Storage Service (Amazon S3) bucket and, optionally, publishes a notification to Amazon Simple Notification Service (Amazon SNS).
     *
     * To enable Amazon SES to write emails to your Amazon S3 bucket, use an AWS KMS key to encrypt your emails, or publish to an Amazon SNS topic of another account, Amazon SES must have permission to access those resources. For information about granting permissions, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-permissions.html) .
     *
     * > When you save your emails to an Amazon S3 bucket, the maximum email size (including headers) is 30 MB. Emails larger than that bounces.
     *
     * For information about specifying Amazon S3 actions in receipt rules, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-action-s3.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-s3action.html
     */
    export interface S3ActionProperty {
        /**
         * The name of the Amazon S3 bucket for incoming email.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-s3action.html#cfn-ses-receiptrule-s3action-bucketname
         */
        readonly bucketName: string;
        /**
         * The customer master key that Amazon SES should use to encrypt your emails before saving them to the Amazon S3 bucket. You can use the default master key or a custom master key that you created in AWS KMS as follows:
         *
         * - To use the default master key, provide an ARN in the form of `arn:aws:kms:REGION:ACCOUNT-ID-WITHOUT-HYPHENS:alias/aws/ses` . For example, if your AWS account ID is 123456789012 and you want to use the default master key in the US West (Oregon) Region, the ARN of the default master key would be `arn:aws:kms:us-west-2:123456789012:alias/aws/ses` . If you use the default master key, you don't need to perform any extra steps to give Amazon SES permission to use the key.
         * - To use a custom master key that you created in AWS KMS, provide the ARN of the master key and ensure that you add a statement to your key's policy to give Amazon SES permission to use it. For more information about giving permissions, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-permissions.html) .
         *
         * For more information about key policies, see the [AWS KMS Developer Guide](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html) . If you do not specify a master key, Amazon SES does not encrypt your emails.
         *
         * > Your mail is encrypted by Amazon SES using the Amazon S3 encryption client before the mail is submitted to Amazon S3 for storage. It is not encrypted using Amazon S3 server-side encryption. This means that you must use the Amazon S3 encryption client to decrypt the email after retrieving it from Amazon S3, as the service has no access to use your AWS KMS keys for decryption. This encryption client is currently available with the [AWS SDK for Java](https://docs.aws.amazon.com/sdk-for-java/) and [AWS SDK for Ruby](https://docs.aws.amazon.com/sdk-for-ruby/) only. For more information about client-side encryption using AWS KMS master keys, see the [Amazon S3 Developer Guide](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingClientSideEncryption.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-s3action.html#cfn-ses-receiptrule-s3action-kmskeyarn
         */
        readonly kmsKeyArn?: string;
        /**
         * The key prefix of the Amazon S3 bucket. The key prefix is similar to a directory name that enables you to store similar data under the same directory in a bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-s3action.html#cfn-ses-receiptrule-s3action-objectkeyprefix
         */
        readonly objectKeyPrefix?: string;
        /**
         * The ARN of the Amazon SNS topic to notify when the message is saved to the Amazon S3 bucket. You can find the ARN of a topic by using the [ListTopics](https://docs.aws.amazon.com/sns/latest/api/API_ListTopics.html) operation in Amazon SNS.
         *
         * For more information about Amazon SNS topics, see the [Amazon SNS Developer Guide](https://docs.aws.amazon.com/sns/latest/dg/CreateTopic.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-s3action.html#cfn-ses-receiptrule-s3action-topicarn
         */
        readonly topicArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3ActionProperty`
 *
 * @param properties - the TypeScript properties of a `S3ActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnReceiptRule_S3ActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketName', cdk.requiredValidator)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketName', cdk.validateString)(properties.bucketName));
    errors.collect(cdk.propertyValidator('kmsKeyArn', cdk.validateString)(properties.kmsKeyArn));
    errors.collect(cdk.propertyValidator('objectKeyPrefix', cdk.validateString)(properties.objectKeyPrefix));
    errors.collect(cdk.propertyValidator('topicArn', cdk.validateString)(properties.topicArn));
    return errors.wrap('supplied properties not correct for "S3ActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.S3Action` resource
 *
 * @param properties - the TypeScript properties of a `S3ActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.S3Action` resource.
 */
// @ts-ignore TS6133
function cfnReceiptRuleS3ActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReceiptRule_S3ActionPropertyValidator(properties).assertSuccess();
    return {
        BucketName: cdk.stringToCloudFormation(properties.bucketName),
        KmsKeyArn: cdk.stringToCloudFormation(properties.kmsKeyArn),
        ObjectKeyPrefix: cdk.stringToCloudFormation(properties.objectKeyPrefix),
        TopicArn: cdk.stringToCloudFormation(properties.topicArn),
    };
}

// @ts-ignore TS6133
function CfnReceiptRuleS3ActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReceiptRule.S3ActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReceiptRule.S3ActionProperty>();
    ret.addPropertyResult('bucketName', 'BucketName', cfn_parse.FromCloudFormation.getString(properties.BucketName));
    ret.addPropertyResult('kmsKeyArn', 'KmsKeyArn', properties.KmsKeyArn != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyArn) : undefined);
    ret.addPropertyResult('objectKeyPrefix', 'ObjectKeyPrefix', properties.ObjectKeyPrefix != null ? cfn_parse.FromCloudFormation.getString(properties.ObjectKeyPrefix) : undefined);
    ret.addPropertyResult('topicArn', 'TopicArn', properties.TopicArn != null ? cfn_parse.FromCloudFormation.getString(properties.TopicArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnReceiptRule {
    /**
     * When included in a receipt rule, this action publishes a notification to Amazon Simple Notification Service (Amazon SNS). This action includes a complete copy of the email content in the Amazon SNS notifications. Amazon SNS notifications for all other actions simply provide information about the email. They do not include the email content itself.
     *
     * If you own the Amazon SNS topic, you don't need to do anything to give Amazon SES permission to publish emails to it. However, if you don't own the Amazon SNS topic, you need to attach a policy to the topic to give Amazon SES permissions to access it. For information about giving permissions, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-permissions.html) .
     *
     * > You can only publish emails that are 150 KB or less (including the header) to Amazon SNS. Larger emails bounce. If you anticipate emails larger than 150 KB, use the S3 action instead.
     *
     * For information about using a receipt rule to publish an Amazon SNS notification, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-action-sns.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-snsaction.html
     */
    export interface SNSActionProperty {
        /**
         * The encoding to use for the email within the Amazon SNS notification. UTF-8 is easier to use, but may not preserve all special characters when a message was encoded with a different encoding format. Base64 preserves all special characters. The default value is UTF-8.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-snsaction.html#cfn-ses-receiptrule-snsaction-encoding
         */
        readonly encoding?: string;
        /**
         * The Amazon Resource Name (ARN) of the Amazon SNS topic to notify. You can find the ARN of a topic by using the [ListTopics](https://docs.aws.amazon.com/sns/latest/api/API_ListTopics.html) operation in Amazon SNS.
         *
         * For more information about Amazon SNS topics, see the [Amazon SNS Developer Guide](https://docs.aws.amazon.com/sns/latest/dg/CreateTopic.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-snsaction.html#cfn-ses-receiptrule-snsaction-topicarn
         */
        readonly topicArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SNSActionProperty`
 *
 * @param properties - the TypeScript properties of a `SNSActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnReceiptRule_SNSActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('encoding', cdk.validateString)(properties.encoding));
    errors.collect(cdk.propertyValidator('topicArn', cdk.validateString)(properties.topicArn));
    return errors.wrap('supplied properties not correct for "SNSActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.SNSAction` resource
 *
 * @param properties - the TypeScript properties of a `SNSActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.SNSAction` resource.
 */
// @ts-ignore TS6133
function cfnReceiptRuleSNSActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReceiptRule_SNSActionPropertyValidator(properties).assertSuccess();
    return {
        Encoding: cdk.stringToCloudFormation(properties.encoding),
        TopicArn: cdk.stringToCloudFormation(properties.topicArn),
    };
}

// @ts-ignore TS6133
function CfnReceiptRuleSNSActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReceiptRule.SNSActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReceiptRule.SNSActionProperty>();
    ret.addPropertyResult('encoding', 'Encoding', properties.Encoding != null ? cfn_parse.FromCloudFormation.getString(properties.Encoding) : undefined);
    ret.addPropertyResult('topicArn', 'TopicArn', properties.TopicArn != null ? cfn_parse.FromCloudFormation.getString(properties.TopicArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnReceiptRule {
    /**
     * When included in a receipt rule, this action terminates the evaluation of the receipt rule set and, optionally, publishes a notification to Amazon Simple Notification Service (Amazon SNS).
     *
     * For information about setting a stop action in a receipt rule, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-action-stop.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-stopaction.html
     */
    export interface StopActionProperty {
        /**
         * The scope of the StopAction. The only acceptable value is `RuleSet` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-stopaction.html#cfn-ses-receiptrule-stopaction-scope
         */
        readonly scope: string;
        /**
         * The Amazon Resource Name (ARN) of the Amazon SNS topic to notify when the stop action is taken. You can find the ARN of a topic by using the [ListTopics](https://docs.aws.amazon.com/sns/latest/api/API_ListTopics.html) Amazon SNS operation.
         *
         * For more information about Amazon SNS topics, see the [Amazon SNS Developer Guide](https://docs.aws.amazon.com/sns/latest/dg/CreateTopic.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-stopaction.html#cfn-ses-receiptrule-stopaction-topicarn
         */
        readonly topicArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `StopActionProperty`
 *
 * @param properties - the TypeScript properties of a `StopActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnReceiptRule_StopActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('scope', cdk.requiredValidator)(properties.scope));
    errors.collect(cdk.propertyValidator('scope', cdk.validateString)(properties.scope));
    errors.collect(cdk.propertyValidator('topicArn', cdk.validateString)(properties.topicArn));
    return errors.wrap('supplied properties not correct for "StopActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.StopAction` resource
 *
 * @param properties - the TypeScript properties of a `StopActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.StopAction` resource.
 */
// @ts-ignore TS6133
function cfnReceiptRuleStopActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReceiptRule_StopActionPropertyValidator(properties).assertSuccess();
    return {
        Scope: cdk.stringToCloudFormation(properties.scope),
        TopicArn: cdk.stringToCloudFormation(properties.topicArn),
    };
}

// @ts-ignore TS6133
function CfnReceiptRuleStopActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReceiptRule.StopActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReceiptRule.StopActionProperty>();
    ret.addPropertyResult('scope', 'Scope', cfn_parse.FromCloudFormation.getString(properties.Scope));
    ret.addPropertyResult('topicArn', 'TopicArn', properties.TopicArn != null ? cfn_parse.FromCloudFormation.getString(properties.TopicArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnReceiptRule {
    /**
     * When included in a receipt rule, this action calls Amazon WorkMail and, optionally, publishes a notification to Amazon Simple Notification Service (Amazon SNS). It usually isn't necessary to set this up manually, because Amazon WorkMail adds the rule automatically during its setup procedure.
     *
     * For information using a receipt rule to call Amazon WorkMail, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-action-workmail.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-workmailaction.html
     */
    export interface WorkmailActionProperty {
        /**
         * The Amazon Resource Name (ARN) of the Amazon WorkMail organization. Amazon WorkMail ARNs use the following format:
         *
         * `arn:aws:workmail:<region>:<awsAccountId>:organization/<workmailOrganizationId>`
         *
         * You can find the ID of your organization by using the [ListOrganizations](https://docs.aws.amazon.com/workmail/latest/APIReference/API_ListOrganizations.html) operation in Amazon WorkMail. Amazon WorkMail organization IDs begin with " `m-` ", followed by a string of alphanumeric characters.
         *
         * For information about Amazon WorkMail organizations, see the [Amazon WorkMail Administrator Guide](https://docs.aws.amazon.com/workmail/latest/adminguide/organizations_overview.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-workmailaction.html#cfn-ses-receiptrule-workmailaction-organizationarn
         */
        readonly organizationArn: string;
        /**
         * The Amazon Resource Name (ARN) of the Amazon SNS topic to notify when the WorkMail action is called. You can find the ARN of a topic by using the [ListTopics](https://docs.aws.amazon.com/sns/latest/api/API_ListTopics.html) operation in Amazon SNS.
         *
         * For more information about Amazon SNS topics, see the [Amazon SNS Developer Guide](https://docs.aws.amazon.com/sns/latest/dg/CreateTopic.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-receiptrule-workmailaction.html#cfn-ses-receiptrule-workmailaction-topicarn
         */
        readonly topicArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `WorkmailActionProperty`
 *
 * @param properties - the TypeScript properties of a `WorkmailActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnReceiptRule_WorkmailActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('organizationArn', cdk.requiredValidator)(properties.organizationArn));
    errors.collect(cdk.propertyValidator('organizationArn', cdk.validateString)(properties.organizationArn));
    errors.collect(cdk.propertyValidator('topicArn', cdk.validateString)(properties.topicArn));
    return errors.wrap('supplied properties not correct for "WorkmailActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.WorkmailAction` resource
 *
 * @param properties - the TypeScript properties of a `WorkmailActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ReceiptRule.WorkmailAction` resource.
 */
// @ts-ignore TS6133
function cfnReceiptRuleWorkmailActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReceiptRule_WorkmailActionPropertyValidator(properties).assertSuccess();
    return {
        OrganizationArn: cdk.stringToCloudFormation(properties.organizationArn),
        TopicArn: cdk.stringToCloudFormation(properties.topicArn),
    };
}

// @ts-ignore TS6133
function CfnReceiptRuleWorkmailActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReceiptRule.WorkmailActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReceiptRule.WorkmailActionProperty>();
    ret.addPropertyResult('organizationArn', 'OrganizationArn', cfn_parse.FromCloudFormation.getString(properties.OrganizationArn));
    ret.addPropertyResult('topicArn', 'TopicArn', properties.TopicArn != null ? cfn_parse.FromCloudFormation.getString(properties.TopicArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnReceiptRuleSet`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptruleset.html
 */
export interface CfnReceiptRuleSetProps {

    /**
     * The name of the receipt rule set to reorder.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptruleset.html#cfn-ses-receiptruleset-rulesetname
     */
    readonly ruleSetName?: string;
}

/**
 * Determine whether the given properties match those of a `CfnReceiptRuleSetProps`
 *
 * @param properties - the TypeScript properties of a `CfnReceiptRuleSetProps`
 *
 * @returns the result of the validation.
 */
function CfnReceiptRuleSetPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('ruleSetName', cdk.validateString)(properties.ruleSetName));
    return errors.wrap('supplied properties not correct for "CfnReceiptRuleSetProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::ReceiptRuleSet` resource
 *
 * @param properties - the TypeScript properties of a `CfnReceiptRuleSetProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::ReceiptRuleSet` resource.
 */
// @ts-ignore TS6133
function cfnReceiptRuleSetPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnReceiptRuleSetPropsValidator(properties).assertSuccess();
    return {
        RuleSetName: cdk.stringToCloudFormation(properties.ruleSetName),
    };
}

// @ts-ignore TS6133
function CfnReceiptRuleSetPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnReceiptRuleSetProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnReceiptRuleSetProps>();
    ret.addPropertyResult('ruleSetName', 'RuleSetName', properties.RuleSetName != null ? cfn_parse.FromCloudFormation.getString(properties.RuleSetName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SES::ReceiptRuleSet`
 *
 * Creates an empty receipt rule set.
 *
 * For information about setting up receipt rule sets, see the [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/receiving-email-concepts.html#receiving-email-concepts-rules) .
 *
 * You can execute this operation no more than once per second.
 *
 * @cloudformationResource AWS::SES::ReceiptRuleSet
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptruleset.html
 */
export class CfnReceiptRuleSet extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SES::ReceiptRuleSet";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnReceiptRuleSet {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnReceiptRuleSetPropsFromCloudFormation(resourceProperties);
        const ret = new CfnReceiptRuleSet(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the receipt rule set to reorder.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptruleset.html#cfn-ses-receiptruleset-rulesetname
     */
    public ruleSetName: string | undefined;

    /**
     * Create a new `AWS::SES::ReceiptRuleSet`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnReceiptRuleSetProps = {}) {
        super(scope, id, { type: CfnReceiptRuleSet.CFN_RESOURCE_TYPE_NAME, properties: props });

        this.ruleSetName = props.ruleSetName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnReceiptRuleSet.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            ruleSetName: this.ruleSetName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnReceiptRuleSetPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnTemplate`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-template.html
 */
export interface CfnTemplateProps {

    /**
     * The content of the email, composed of a subject line and either an HTML part or a text-only part.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-template.html#cfn-ses-template-template
     */
    readonly template?: CfnTemplate.TemplateProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnTemplateProps`
 *
 * @param properties - the TypeScript properties of a `CfnTemplateProps`
 *
 * @returns the result of the validation.
 */
function CfnTemplatePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('template', CfnTemplate_TemplatePropertyValidator)(properties.template));
    return errors.wrap('supplied properties not correct for "CfnTemplateProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::Template` resource
 *
 * @param properties - the TypeScript properties of a `CfnTemplateProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::Template` resource.
 */
// @ts-ignore TS6133
function cfnTemplatePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTemplatePropsValidator(properties).assertSuccess();
    return {
        Template: cfnTemplateTemplatePropertyToCloudFormation(properties.template),
    };
}

// @ts-ignore TS6133
function CfnTemplatePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTemplateProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTemplateProps>();
    ret.addPropertyResult('template', 'Template', properties.Template != null ? CfnTemplateTemplatePropertyFromCloudFormation(properties.Template) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::SES::Template`
 *
 * Specifies an email template. Email templates enable you to send personalized email to one or more destinations in a single API operation.
 *
 * @cloudformationResource AWS::SES::Template
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-template.html
 */
export class CfnTemplate extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::SES::Template";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnTemplate {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnTemplatePropsFromCloudFormation(resourceProperties);
        const ret = new CfnTemplate(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     *
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The content of the email, composed of a subject line and either an HTML part or a text-only part.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-template.html#cfn-ses-template-template
     */
    public template: CfnTemplate.TemplateProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::SES::Template`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnTemplateProps = {}) {
        super(scope, id, { type: CfnTemplate.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.template = props.template;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnTemplate.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            template: this.template,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnTemplatePropsToCloudFormation(props);
    }
}

export namespace CfnTemplate {
    /**
     * The content of the email, composed of a subject line and either an HTML part or a text-only part.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-template-template.html
     */
    export interface TemplateProperty {
        /**
         * The HTML body of the email.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-template-template.html#cfn-ses-template-template-htmlpart
         */
        readonly htmlPart?: string;
        /**
         * The subject line of the email.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-template-template.html#cfn-ses-template-template-subjectpart
         */
        readonly subjectPart: string;
        /**
         * The name of the template.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-template-template.html#cfn-ses-template-template-templatename
         */
        readonly templateName?: string;
        /**
         * The email body that is visible to recipients whose email clients do not display HTML content.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ses-template-template.html#cfn-ses-template-template-textpart
         */
        readonly textPart?: string;
    }
}

/**
 * Determine whether the given properties match those of a `TemplateProperty`
 *
 * @param properties - the TypeScript properties of a `TemplateProperty`
 *
 * @returns the result of the validation.
 */
function CfnTemplate_TemplatePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('htmlPart', cdk.validateString)(properties.htmlPart));
    errors.collect(cdk.propertyValidator('subjectPart', cdk.requiredValidator)(properties.subjectPart));
    errors.collect(cdk.propertyValidator('subjectPart', cdk.validateString)(properties.subjectPart));
    errors.collect(cdk.propertyValidator('templateName', cdk.validateString)(properties.templateName));
    errors.collect(cdk.propertyValidator('textPart', cdk.validateString)(properties.textPart));
    return errors.wrap('supplied properties not correct for "TemplateProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::SES::Template.Template` resource
 *
 * @param properties - the TypeScript properties of a `TemplateProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::SES::Template.Template` resource.
 */
// @ts-ignore TS6133
function cfnTemplateTemplatePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTemplate_TemplatePropertyValidator(properties).assertSuccess();
    return {
        HtmlPart: cdk.stringToCloudFormation(properties.htmlPart),
        SubjectPart: cdk.stringToCloudFormation(properties.subjectPart),
        TemplateName: cdk.stringToCloudFormation(properties.templateName),
        TextPart: cdk.stringToCloudFormation(properties.textPart),
    };
}

// @ts-ignore TS6133
function CfnTemplateTemplatePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTemplate.TemplateProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTemplate.TemplateProperty>();
    ret.addPropertyResult('htmlPart', 'HtmlPart', properties.HtmlPart != null ? cfn_parse.FromCloudFormation.getString(properties.HtmlPart) : undefined);
    ret.addPropertyResult('subjectPart', 'SubjectPart', cfn_parse.FromCloudFormation.getString(properties.SubjectPart));
    ret.addPropertyResult('templateName', 'TemplateName', properties.TemplateName != null ? cfn_parse.FromCloudFormation.getString(properties.TemplateName) : undefined);
    ret.addPropertyResult('textPart', 'TextPart', properties.TextPart != null ? cfn_parse.FromCloudFormation.getString(properties.TextPart) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
