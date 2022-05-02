// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.304Z","fingerprint":"Pzsvoq2uJI7997EAsp63NRanGQJNMs+oIl7J4i0yrc8="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnJobTemplate`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html
 */
export interface CfnJobTemplateProps {

    /**
     * Specify, in JSON format, the transcoding job settings for this job template. This specification must conform to the AWS Elemental MediaConvert job validation. For information about forming this specification, see the Remarks section later in this topic.
     *
     * For more information about MediaConvert job templates, see [Working with AWS Elemental MediaConvert Job Templates](https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-job-templates.html) in the ** .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-settingsjson
     */
    readonly settingsJson: any | cdk.IResolvable;

    /**
     * Accelerated transcoding can significantly speed up jobs with long, visually complex content. Outputs that use this feature incur pro-tier pricing. For information about feature limitations, For more information, see [Job Limitations for Accelerated Transcoding in AWS Elemental MediaConvert](https://docs.aws.amazon.com/mediaconvert/latest/ug/job-requirements.html) in the *AWS Elemental MediaConvert User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-accelerationsettings
     */
    readonly accelerationSettings?: CfnJobTemplate.AccelerationSettingsProperty | cdk.IResolvable;

    /**
     * Optional. A category for the job template you are creating
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-category
     */
    readonly category?: string;

    /**
     * Optional. A description of the job template you are creating.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-description
     */
    readonly description?: string;

    /**
     * Optional. Configuration for a destination queue to which the job can hop once a customer-defined minimum wait time has passed. For more information, see [Setting Up Queue Hopping to Avoid Long Waits](https://docs.aws.amazon.com/mediaconvert/latest/ug/setting-up-queue-hopping-to-avoid-long-waits.html) in the *AWS Elemental MediaConvert User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-hopdestinations
     */
    readonly hopDestinations?: Array<CfnJobTemplate.HopDestinationProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The name of the job template you are creating.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-name
     */
    readonly name?: string;

    /**
     * Specify the relative priority for this job. In any given queue, the service begins processing the job with the highest value first. When more than one job has the same priority, the service begins processing the job that you submitted first. If you don't specify a priority, the service uses the default value 0. Minimum: -50 Maximum: 50
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-priority
     */
    readonly priority?: number;

    /**
     * Optional. The queue that jobs created from this template are assigned to. Specify the Amazon Resource Name (ARN) of the queue. For example, arn:aws:mediaconvert:us-west-2:505474453218:queues/Default. If you don't specify this, jobs will go to the default queue.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-queue
     */
    readonly queue?: string;

    /**
     * Specify how often MediaConvert sends STATUS_UPDATE events to Amazon CloudWatch Events. Set the interval, in seconds, between status updates. MediaConvert sends an update at this interval from the time the service begins processing your job to the time it completes the transcode or encounters an error.
     *
     * Specify one of the following enums:
     *
     * SECONDS_10
     *
     * SECONDS_12
     *
     * SECONDS_15
     *
     * SECONDS_20
     *
     * SECONDS_30
     *
     * SECONDS_60
     *
     * SECONDS_120
     *
     * SECONDS_180
     *
     * SECONDS_240
     *
     * SECONDS_300
     *
     * SECONDS_360
     *
     * SECONDS_420
     *
     * SECONDS_480
     *
     * SECONDS_540
     *
     * SECONDS_600
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-statusupdateinterval
     */
    readonly statusUpdateInterval?: string;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-tags
     */
    readonly tags?: any;
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
    errors.collect(cdk.propertyValidator('accelerationSettings', CfnJobTemplate_AccelerationSettingsPropertyValidator)(properties.accelerationSettings));
    errors.collect(cdk.propertyValidator('category', cdk.validateString)(properties.category));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('hopDestinations', cdk.listValidator(CfnJobTemplate_HopDestinationPropertyValidator))(properties.hopDestinations));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('priority', cdk.validateNumber)(properties.priority));
    errors.collect(cdk.propertyValidator('queue', cdk.validateString)(properties.queue));
    errors.collect(cdk.propertyValidator('settingsJson', cdk.requiredValidator)(properties.settingsJson));
    errors.collect(cdk.propertyValidator('settingsJson', cdk.validateObject)(properties.settingsJson));
    errors.collect(cdk.propertyValidator('statusUpdateInterval', cdk.validateString)(properties.statusUpdateInterval));
    errors.collect(cdk.propertyValidator('tags', cdk.validateObject)(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnJobTemplateProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MediaConvert::JobTemplate` resource
 *
 * @param properties - the TypeScript properties of a `CfnJobTemplateProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MediaConvert::JobTemplate` resource.
 */
// @ts-ignore TS6133
function cfnJobTemplatePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobTemplatePropsValidator(properties).assertSuccess();
    return {
        SettingsJson: cdk.objectToCloudFormation(properties.settingsJson),
        AccelerationSettings: cfnJobTemplateAccelerationSettingsPropertyToCloudFormation(properties.accelerationSettings),
        Category: cdk.stringToCloudFormation(properties.category),
        Description: cdk.stringToCloudFormation(properties.description),
        HopDestinations: cdk.listMapper(cfnJobTemplateHopDestinationPropertyToCloudFormation)(properties.hopDestinations),
        Name: cdk.stringToCloudFormation(properties.name),
        Priority: cdk.numberToCloudFormation(properties.priority),
        Queue: cdk.stringToCloudFormation(properties.queue),
        StatusUpdateInterval: cdk.stringToCloudFormation(properties.statusUpdateInterval),
        Tags: cdk.objectToCloudFormation(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnJobTemplatePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobTemplateProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobTemplateProps>();
    ret.addPropertyResult('settingsJson', 'SettingsJson', cfn_parse.FromCloudFormation.getAny(properties.SettingsJson));
    ret.addPropertyResult('accelerationSettings', 'AccelerationSettings', properties.AccelerationSettings != null ? CfnJobTemplateAccelerationSettingsPropertyFromCloudFormation(properties.AccelerationSettings) : undefined);
    ret.addPropertyResult('category', 'Category', properties.Category != null ? cfn_parse.FromCloudFormation.getString(properties.Category) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('hopDestinations', 'HopDestinations', properties.HopDestinations != null ? cfn_parse.FromCloudFormation.getArray(CfnJobTemplateHopDestinationPropertyFromCloudFormation)(properties.HopDestinations) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('priority', 'Priority', properties.Priority != null ? cfn_parse.FromCloudFormation.getNumber(properties.Priority) : undefined);
    ret.addPropertyResult('queue', 'Queue', properties.Queue != null ? cfn_parse.FromCloudFormation.getString(properties.Queue) : undefined);
    ret.addPropertyResult('statusUpdateInterval', 'StatusUpdateInterval', properties.StatusUpdateInterval != null ? cfn_parse.FromCloudFormation.getString(properties.StatusUpdateInterval) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getAny(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::MediaConvert::JobTemplate`
 *
 * The AWS::MediaConvert::JobTemplate resource is an AWS Elemental MediaConvert resource type that you can use to generate transcoding jobs.
 *
 * When you declare this entity in your AWS CloudFormation template, you pass in your transcoding job settings in JSON or YAML format. This settings specification must be formed in a particular way that conforms to AWS Elemental MediaConvert job validation. For more information about creating a job template model for the `SettingsJson` property, see the Remarks section later in this topic.
 *
 * For information about job templates, see [Working with AWS Elemental MediaConvert Job Templates](https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-job-templates.html) in the ** .
 *
 * @cloudformationResource AWS::MediaConvert::JobTemplate
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html
 */
export class CfnJobTemplate extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::MediaConvert::JobTemplate";

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
     * The Amazon Resource Name (ARN) of the job template, such as `arn:aws:mediaconvert:us-west-2:123456789012` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The name of the job template, such as `Streaming stack DASH` .
     * @cloudformationAttribute Name
     */
    public readonly attrName: string;

    /**
     * Specify, in JSON format, the transcoding job settings for this job template. This specification must conform to the AWS Elemental MediaConvert job validation. For information about forming this specification, see the Remarks section later in this topic.
     *
     * For more information about MediaConvert job templates, see [Working with AWS Elemental MediaConvert Job Templates](https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-job-templates.html) in the ** .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-settingsjson
     */
    public settingsJson: any | cdk.IResolvable;

    /**
     * Accelerated transcoding can significantly speed up jobs with long, visually complex content. Outputs that use this feature incur pro-tier pricing. For information about feature limitations, For more information, see [Job Limitations for Accelerated Transcoding in AWS Elemental MediaConvert](https://docs.aws.amazon.com/mediaconvert/latest/ug/job-requirements.html) in the *AWS Elemental MediaConvert User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-accelerationsettings
     */
    public accelerationSettings: CfnJobTemplate.AccelerationSettingsProperty | cdk.IResolvable | undefined;

    /**
     * Optional. A category for the job template you are creating
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-category
     */
    public category: string | undefined;

    /**
     * Optional. A description of the job template you are creating.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-description
     */
    public description: string | undefined;

    /**
     * Optional. Configuration for a destination queue to which the job can hop once a customer-defined minimum wait time has passed. For more information, see [Setting Up Queue Hopping to Avoid Long Waits](https://docs.aws.amazon.com/mediaconvert/latest/ug/setting-up-queue-hopping-to-avoid-long-waits.html) in the *AWS Elemental MediaConvert User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-hopdestinations
     */
    public hopDestinations: Array<CfnJobTemplate.HopDestinationProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The name of the job template you are creating.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-name
     */
    public name: string | undefined;

    /**
     * Specify the relative priority for this job. In any given queue, the service begins processing the job with the highest value first. When more than one job has the same priority, the service begins processing the job that you submitted first. If you don't specify a priority, the service uses the default value 0. Minimum: -50 Maximum: 50
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-priority
     */
    public priority: number | undefined;

    /**
     * Optional. The queue that jobs created from this template are assigned to. Specify the Amazon Resource Name (ARN) of the queue. For example, arn:aws:mediaconvert:us-west-2:505474453218:queues/Default. If you don't specify this, jobs will go to the default queue.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-queue
     */
    public queue: string | undefined;

    /**
     * Specify how often MediaConvert sends STATUS_UPDATE events to Amazon CloudWatch Events. Set the interval, in seconds, between status updates. MediaConvert sends an update at this interval from the time the service begins processing your job to the time it completes the transcode or encounters an error.
     *
     * Specify one of the following enums:
     *
     * SECONDS_10
     *
     * SECONDS_12
     *
     * SECONDS_15
     *
     * SECONDS_20
     *
     * SECONDS_30
     *
     * SECONDS_60
     *
     * SECONDS_120
     *
     * SECONDS_180
     *
     * SECONDS_240
     *
     * SECONDS_300
     *
     * SECONDS_360
     *
     * SECONDS_420
     *
     * SECONDS_480
     *
     * SECONDS_540
     *
     * SECONDS_600
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-statusupdateinterval
     */
    public statusUpdateInterval: string | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-jobtemplate.html#cfn-mediaconvert-jobtemplate-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::MediaConvert::JobTemplate`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnJobTemplateProps) {
        super(scope, id, { type: CfnJobTemplate.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'settingsJson', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrName = cdk.Token.asString(this.getAtt('Name'));

        this.settingsJson = props.settingsJson;
        this.accelerationSettings = props.accelerationSettings;
        this.category = props.category;
        this.description = props.description;
        this.hopDestinations = props.hopDestinations;
        this.name = props.name;
        this.priority = props.priority;
        this.queue = props.queue;
        this.statusUpdateInterval = props.statusUpdateInterval;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::MediaConvert::JobTemplate", props.tags, { tagPropertyName: 'tags' });
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
            settingsJson: this.settingsJson,
            accelerationSettings: this.accelerationSettings,
            category: this.category,
            description: this.description,
            hopDestinations: this.hopDestinations,
            name: this.name,
            priority: this.priority,
            queue: this.queue,
            statusUpdateInterval: this.statusUpdateInterval,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnJobTemplatePropsToCloudFormation(props);
    }
}

export namespace CfnJobTemplate {
    /**
     * Accelerated transcoding can significantly speed up jobs with long, visually complex content. Outputs that use this feature incur pro-tier pricing. For information about feature limitations, For more information, see [Job Limitations for Accelerated Transcoding in AWS Elemental MediaConvert](https://docs.aws.amazon.com/mediaconvert/latest/ug/job-requirements.html) in the *AWS Elemental MediaConvert User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediaconvert-jobtemplate-accelerationsettings.html
     */
    export interface AccelerationSettingsProperty {
        /**
         * Specify the conditions when the service will run your job with accelerated transcoding.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediaconvert-jobtemplate-accelerationsettings.html#cfn-mediaconvert-jobtemplate-accelerationsettings-mode
         */
        readonly mode: string;
    }
}

/**
 * Determine whether the given properties match those of a `AccelerationSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `AccelerationSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobTemplate_AccelerationSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('mode', cdk.requiredValidator)(properties.mode));
    errors.collect(cdk.propertyValidator('mode', cdk.validateString)(properties.mode));
    return errors.wrap('supplied properties not correct for "AccelerationSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MediaConvert::JobTemplate.AccelerationSettings` resource
 *
 * @param properties - the TypeScript properties of a `AccelerationSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MediaConvert::JobTemplate.AccelerationSettings` resource.
 */
// @ts-ignore TS6133
function cfnJobTemplateAccelerationSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobTemplate_AccelerationSettingsPropertyValidator(properties).assertSuccess();
    return {
        Mode: cdk.stringToCloudFormation(properties.mode),
    };
}

// @ts-ignore TS6133
function CfnJobTemplateAccelerationSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobTemplate.AccelerationSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobTemplate.AccelerationSettingsProperty>();
    ret.addPropertyResult('mode', 'Mode', cfn_parse.FromCloudFormation.getString(properties.Mode));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobTemplate {
    /**
     * Optional. Configuration for a destination queue to which the job can hop once a customer-defined minimum wait time has passed. For more information, see [Setting Up Queue Hopping to Avoid Long Waits](https://docs.aws.amazon.com/mediaconvert/latest/ug/setting-up-queue-hopping-to-avoid-long-waits.html) in the *AWS Elemental MediaConvert User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediaconvert-jobtemplate-hopdestination.html
     */
    export interface HopDestinationProperty {
        /**
         * Optional. When you set up a job to use queue hopping, you can specify a different relative priority for the job in the destination queue. If you don't specify, the relative priority will remain the same as in the previous queue.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediaconvert-jobtemplate-hopdestination.html#cfn-mediaconvert-jobtemplate-hopdestination-priority
         */
        readonly priority?: number;
        /**
         * Optional unless the job is submitted on the default queue. When you set up a job to use queue hopping, you can specify a destination queue. This queue cannot be the original queue to which the job is submitted. If the original queue isn't the default queue and you don't specify the destination queue, the job will move to the default queue.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediaconvert-jobtemplate-hopdestination.html#cfn-mediaconvert-jobtemplate-hopdestination-queue
         */
        readonly queue?: string;
        /**
         * Required for setting up a job to use queue hopping. Minimum wait time in minutes until the job can hop to the destination queue. Valid range is 1 to 1440 minutes, inclusive.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediaconvert-jobtemplate-hopdestination.html#cfn-mediaconvert-jobtemplate-hopdestination-waitminutes
         */
        readonly waitMinutes?: number;
    }
}

/**
 * Determine whether the given properties match those of a `HopDestinationProperty`
 *
 * @param properties - the TypeScript properties of a `HopDestinationProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobTemplate_HopDestinationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('priority', cdk.validateNumber)(properties.priority));
    errors.collect(cdk.propertyValidator('queue', cdk.validateString)(properties.queue));
    errors.collect(cdk.propertyValidator('waitMinutes', cdk.validateNumber)(properties.waitMinutes));
    return errors.wrap('supplied properties not correct for "HopDestinationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MediaConvert::JobTemplate.HopDestination` resource
 *
 * @param properties - the TypeScript properties of a `HopDestinationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MediaConvert::JobTemplate.HopDestination` resource.
 */
// @ts-ignore TS6133
function cfnJobTemplateHopDestinationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobTemplate_HopDestinationPropertyValidator(properties).assertSuccess();
    return {
        Priority: cdk.numberToCloudFormation(properties.priority),
        Queue: cdk.stringToCloudFormation(properties.queue),
        WaitMinutes: cdk.numberToCloudFormation(properties.waitMinutes),
    };
}

// @ts-ignore TS6133
function CfnJobTemplateHopDestinationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobTemplate.HopDestinationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobTemplate.HopDestinationProperty>();
    ret.addPropertyResult('priority', 'Priority', properties.Priority != null ? cfn_parse.FromCloudFormation.getNumber(properties.Priority) : undefined);
    ret.addPropertyResult('queue', 'Queue', properties.Queue != null ? cfn_parse.FromCloudFormation.getString(properties.Queue) : undefined);
    ret.addPropertyResult('waitMinutes', 'WaitMinutes', properties.WaitMinutes != null ? cfn_parse.FromCloudFormation.getNumber(properties.WaitMinutes) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnPreset`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-preset.html
 */
export interface CfnPresetProps {

    /**
     * Specify, in JSON format, the transcoding job settings for this output preset. This specification must conform to the AWS Elemental MediaConvert job validation. For information about forming this specification, see the Remarks section later in this topic.
     *
     * For more information about MediaConvert output presets, see [Working with AWS Elemental MediaConvert Output Presets](https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-presets.html) in the ** .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-preset.html#cfn-mediaconvert-preset-settingsjson
     */
    readonly settingsJson: any | cdk.IResolvable;

    /**
     * The new category for the preset, if you are changing it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-preset.html#cfn-mediaconvert-preset-category
     */
    readonly category?: string;

    /**
     * The new description for the preset, if you are changing it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-preset.html#cfn-mediaconvert-preset-description
     */
    readonly description?: string;

    /**
     * The name of the preset that you are modifying.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-preset.html#cfn-mediaconvert-preset-name
     */
    readonly name?: string;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-preset.html#cfn-mediaconvert-preset-tags
     */
    readonly tags?: any;
}

/**
 * Determine whether the given properties match those of a `CfnPresetProps`
 *
 * @param properties - the TypeScript properties of a `CfnPresetProps`
 *
 * @returns the result of the validation.
 */
function CfnPresetPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('category', cdk.validateString)(properties.category));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('settingsJson', cdk.requiredValidator)(properties.settingsJson));
    errors.collect(cdk.propertyValidator('settingsJson', cdk.validateObject)(properties.settingsJson));
    errors.collect(cdk.propertyValidator('tags', cdk.validateObject)(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnPresetProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MediaConvert::Preset` resource
 *
 * @param properties - the TypeScript properties of a `CfnPresetProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MediaConvert::Preset` resource.
 */
// @ts-ignore TS6133
function cfnPresetPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPresetPropsValidator(properties).assertSuccess();
    return {
        SettingsJson: cdk.objectToCloudFormation(properties.settingsJson),
        Category: cdk.stringToCloudFormation(properties.category),
        Description: cdk.stringToCloudFormation(properties.description),
        Name: cdk.stringToCloudFormation(properties.name),
        Tags: cdk.objectToCloudFormation(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnPresetPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPresetProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPresetProps>();
    ret.addPropertyResult('settingsJson', 'SettingsJson', cfn_parse.FromCloudFormation.getAny(properties.SettingsJson));
    ret.addPropertyResult('category', 'Category', properties.Category != null ? cfn_parse.FromCloudFormation.getString(properties.Category) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getAny(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::MediaConvert::Preset`
 *
 * The AWS::MediaConvert::Preset resource is an AWS Elemental MediaConvert resource type that you can use to specify encoding settings for a single output in a transcoding job.
 *
 * When you declare this entity in your AWS CloudFormation template, you pass in your transcoding job settings in JSON or YAML format. This settings specification must be formed in a particular way that conforms to AWS Elemental MediaConvert job validation. For more information about creating an output preset model for the `SettingsJson` property, see the Remarks section later in this topic.
 *
 * For more information about output MediaConvert presets, see [Working with AWS Elemental MediaConvert Output Presets](https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-presets.html) in the ** .
 *
 * @cloudformationResource AWS::MediaConvert::Preset
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-preset.html
 */
export class CfnPreset extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::MediaConvert::Preset";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnPreset {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnPresetPropsFromCloudFormation(resourceProperties);
        const ret = new CfnPreset(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the output preset, such as `arn:aws:mediaconvert:us-west-2:123456789012` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The name of the output preset, such as `HEVC high res` .
     * @cloudformationAttribute Name
     */
    public readonly attrName: string;

    /**
     * Specify, in JSON format, the transcoding job settings for this output preset. This specification must conform to the AWS Elemental MediaConvert job validation. For information about forming this specification, see the Remarks section later in this topic.
     *
     * For more information about MediaConvert output presets, see [Working with AWS Elemental MediaConvert Output Presets](https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-presets.html) in the ** .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-preset.html#cfn-mediaconvert-preset-settingsjson
     */
    public settingsJson: any | cdk.IResolvable;

    /**
     * The new category for the preset, if you are changing it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-preset.html#cfn-mediaconvert-preset-category
     */
    public category: string | undefined;

    /**
     * The new description for the preset, if you are changing it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-preset.html#cfn-mediaconvert-preset-description
     */
    public description: string | undefined;

    /**
     * The name of the preset that you are modifying.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-preset.html#cfn-mediaconvert-preset-name
     */
    public name: string | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-preset.html#cfn-mediaconvert-preset-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::MediaConvert::Preset`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPresetProps) {
        super(scope, id, { type: CfnPreset.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'settingsJson', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrName = cdk.Token.asString(this.getAtt('Name'));

        this.settingsJson = props.settingsJson;
        this.category = props.category;
        this.description = props.description;
        this.name = props.name;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::MediaConvert::Preset", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnPreset.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            settingsJson: this.settingsJson,
            category: this.category,
            description: this.description,
            name: this.name,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPresetPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnQueue`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-queue.html
 */
export interface CfnQueueProps {

    /**
     * Optional. A description of the queue that you are creating.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-queue.html#cfn-mediaconvert-queue-description
     */
    readonly description?: string;

    /**
     * The name of the queue that you are creating.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-queue.html#cfn-mediaconvert-queue-name
     */
    readonly name?: string;

    /**
     * When you use AWS CloudFormation , you can create only on-demand queues. Therefore, always set `PricingPlan` to the value "ON_DEMAND" when declaring an AWS::MediaConvert::Queue in your AWS CloudFormation template.
     *
     * To create a reserved queue, use the AWS Elemental MediaConvert console at https://console.aws.amazon.com/mediaconvert to set up a contract. For more information, see [Working with AWS Elemental MediaConvert Queues](https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-queues.html) in the ** .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-queue.html#cfn-mediaconvert-queue-pricingplan
     */
    readonly pricingPlan?: string;

    /**
     * Initial state of the queue. Queues can be either ACTIVE or PAUSED. If you create a paused queue, then jobs that you send to that queue won't begin.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-queue.html#cfn-mediaconvert-queue-status
     */
    readonly status?: string;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-queue.html#cfn-mediaconvert-queue-tags
     */
    readonly tags?: any;
}

/**
 * Determine whether the given properties match those of a `CfnQueueProps`
 *
 * @param properties - the TypeScript properties of a `CfnQueueProps`
 *
 * @returns the result of the validation.
 */
function CfnQueuePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('pricingPlan', cdk.validateString)(properties.pricingPlan));
    errors.collect(cdk.propertyValidator('status', cdk.validateString)(properties.status));
    errors.collect(cdk.propertyValidator('tags', cdk.validateObject)(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnQueueProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MediaConvert::Queue` resource
 *
 * @param properties - the TypeScript properties of a `CfnQueueProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MediaConvert::Queue` resource.
 */
// @ts-ignore TS6133
function cfnQueuePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnQueuePropsValidator(properties).assertSuccess();
    return {
        Description: cdk.stringToCloudFormation(properties.description),
        Name: cdk.stringToCloudFormation(properties.name),
        PricingPlan: cdk.stringToCloudFormation(properties.pricingPlan),
        Status: cdk.stringToCloudFormation(properties.status),
        Tags: cdk.objectToCloudFormation(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnQueuePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnQueueProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnQueueProps>();
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('pricingPlan', 'PricingPlan', properties.PricingPlan != null ? cfn_parse.FromCloudFormation.getString(properties.PricingPlan) : undefined);
    ret.addPropertyResult('status', 'Status', properties.Status != null ? cfn_parse.FromCloudFormation.getString(properties.Status) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getAny(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::MediaConvert::Queue`
 *
 * The AWS::MediaConvert::Queue resource is an AWS Elemental MediaConvert resource type that you can use to manage the resources that are available to your account for parallel processing of jobs. For more information about queues, see [Working with AWS Elemental MediaConvert Queues](https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-queues.html) in the ** .
 *
 * @cloudformationResource AWS::MediaConvert::Queue
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-queue.html
 */
export class CfnQueue extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::MediaConvert::Queue";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnQueue {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnQueuePropsFromCloudFormation(resourceProperties);
        const ret = new CfnQueue(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the queue, such as `arn:aws:mediaconvert:us-west-2:123456789012` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The name of the queue, such as `Queue 2` .
     * @cloudformationAttribute Name
     */
    public readonly attrName: string;

    /**
     * Optional. A description of the queue that you are creating.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-queue.html#cfn-mediaconvert-queue-description
     */
    public description: string | undefined;

    /**
     * The name of the queue that you are creating.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-queue.html#cfn-mediaconvert-queue-name
     */
    public name: string | undefined;

    /**
     * When you use AWS CloudFormation , you can create only on-demand queues. Therefore, always set `PricingPlan` to the value "ON_DEMAND" when declaring an AWS::MediaConvert::Queue in your AWS CloudFormation template.
     *
     * To create a reserved queue, use the AWS Elemental MediaConvert console at https://console.aws.amazon.com/mediaconvert to set up a contract. For more information, see [Working with AWS Elemental MediaConvert Queues](https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-queues.html) in the ** .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-queue.html#cfn-mediaconvert-queue-pricingplan
     */
    public pricingPlan: string | undefined;

    /**
     * Initial state of the queue. Queues can be either ACTIVE or PAUSED. If you create a paused queue, then jobs that you send to that queue won't begin.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-queue.html#cfn-mediaconvert-queue-status
     */
    public status: string | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconvert-queue.html#cfn-mediaconvert-queue-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::MediaConvert::Queue`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnQueueProps = {}) {
        super(scope, id, { type: CfnQueue.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrName = cdk.Token.asString(this.getAtt('Name'));

        this.description = props.description;
        this.name = props.name;
        this.pricingPlan = props.pricingPlan;
        this.status = props.status;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::MediaConvert::Queue", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnQueue.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            description: this.description,
            name: this.name,
            pricingPlan: this.pricingPlan,
            status: this.status,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnQueuePropsToCloudFormation(props);
    }
}
