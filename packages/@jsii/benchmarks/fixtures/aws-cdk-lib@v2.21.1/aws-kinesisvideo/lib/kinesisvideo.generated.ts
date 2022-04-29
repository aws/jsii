// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.042Z","fingerprint":"PX32yvGrIYZME7rFNnX3K/ywKXbGaDZHlgsOufjOReQ="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnSignalingChannel`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-signalingchannel.html
 */
export interface CfnSignalingChannelProps {

    /**
     * `AWS::KinesisVideo::SignalingChannel.MessageTtlSeconds`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-signalingchannel.html#cfn-kinesisvideo-signalingchannel-messagettlseconds
     */
    readonly messageTtlSeconds?: number;

    /**
     * `AWS::KinesisVideo::SignalingChannel.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-signalingchannel.html#cfn-kinesisvideo-signalingchannel-name
     */
    readonly name?: string;

    /**
     * `AWS::KinesisVideo::SignalingChannel.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-signalingchannel.html#cfn-kinesisvideo-signalingchannel-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * `AWS::KinesisVideo::SignalingChannel.Type`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-signalingchannel.html#cfn-kinesisvideo-signalingchannel-type
     */
    readonly type?: string;
}

/**
 * Determine whether the given properties match those of a `CfnSignalingChannelProps`
 *
 * @param properties - the TypeScript properties of a `CfnSignalingChannelProps`
 *
 * @returns the result of the validation.
 */
function CfnSignalingChannelPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('messageTtlSeconds', cdk.validateNumber)(properties.messageTtlSeconds));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "CfnSignalingChannelProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisVideo::SignalingChannel` resource
 *
 * @param properties - the TypeScript properties of a `CfnSignalingChannelProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisVideo::SignalingChannel` resource.
 */
// @ts-ignore TS6133
function cfnSignalingChannelPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSignalingChannelPropsValidator(properties).assertSuccess();
    return {
        MessageTtlSeconds: cdk.numberToCloudFormation(properties.messageTtlSeconds),
        Name: cdk.stringToCloudFormation(properties.name),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnSignalingChannelPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSignalingChannelProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSignalingChannelProps>();
    ret.addPropertyResult('messageTtlSeconds', 'MessageTtlSeconds', properties.MessageTtlSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.MessageTtlSeconds) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::KinesisVideo::SignalingChannel`
 *
 *
 *
 * @cloudformationResource AWS::KinesisVideo::SignalingChannel
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-signalingchannel.html
 */
export class CfnSignalingChannel extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::KinesisVideo::SignalingChannel";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnSignalingChannel {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnSignalingChannelPropsFromCloudFormation(resourceProperties);
        const ret = new CfnSignalingChannel(scope, id, propsResult.value);
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
     * `AWS::KinesisVideo::SignalingChannel.MessageTtlSeconds`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-signalingchannel.html#cfn-kinesisvideo-signalingchannel-messagettlseconds
     */
    public messageTtlSeconds: number | undefined;

    /**
     * `AWS::KinesisVideo::SignalingChannel.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-signalingchannel.html#cfn-kinesisvideo-signalingchannel-name
     */
    public name: string | undefined;

    /**
     * `AWS::KinesisVideo::SignalingChannel.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-signalingchannel.html#cfn-kinesisvideo-signalingchannel-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * `AWS::KinesisVideo::SignalingChannel.Type`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-signalingchannel.html#cfn-kinesisvideo-signalingchannel-type
     */
    public type: string | undefined;

    /**
     * Create a new `AWS::KinesisVideo::SignalingChannel`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnSignalingChannelProps = {}) {
        super(scope, id, { type: CfnSignalingChannel.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.messageTtlSeconds = props.messageTtlSeconds;
        this.name = props.name;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::KinesisVideo::SignalingChannel", props.tags, { tagPropertyName: 'tags' });
        this.type = props.type;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnSignalingChannel.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            messageTtlSeconds: this.messageTtlSeconds,
            name: this.name,
            tags: this.tags.renderTags(),
            type: this.type,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnSignalingChannelPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnStream`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-stream.html
 */
export interface CfnStreamProps {

    /**
     * `AWS::KinesisVideo::Stream.DataRetentionInHours`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-stream.html#cfn-kinesisvideo-stream-dataretentioninhours
     */
    readonly dataRetentionInHours?: number;

    /**
     * `AWS::KinesisVideo::Stream.DeviceName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-stream.html#cfn-kinesisvideo-stream-devicename
     */
    readonly deviceName?: string;

    /**
     * `AWS::KinesisVideo::Stream.KmsKeyId`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-stream.html#cfn-kinesisvideo-stream-kmskeyid
     */
    readonly kmsKeyId?: string;

    /**
     * `AWS::KinesisVideo::Stream.MediaType`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-stream.html#cfn-kinesisvideo-stream-mediatype
     */
    readonly mediaType?: string;

    /**
     * `AWS::KinesisVideo::Stream.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-stream.html#cfn-kinesisvideo-stream-name
     */
    readonly name?: string;

    /**
     * `AWS::KinesisVideo::Stream.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-stream.html#cfn-kinesisvideo-stream-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnStreamProps`
 *
 * @param properties - the TypeScript properties of a `CfnStreamProps`
 *
 * @returns the result of the validation.
 */
function CfnStreamPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataRetentionInHours', cdk.validateNumber)(properties.dataRetentionInHours));
    errors.collect(cdk.propertyValidator('deviceName', cdk.validateString)(properties.deviceName));
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('mediaType', cdk.validateString)(properties.mediaType));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnStreamProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::KinesisVideo::Stream` resource
 *
 * @param properties - the TypeScript properties of a `CfnStreamProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::KinesisVideo::Stream` resource.
 */
// @ts-ignore TS6133
function cfnStreamPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnStreamPropsValidator(properties).assertSuccess();
    return {
        DataRetentionInHours: cdk.numberToCloudFormation(properties.dataRetentionInHours),
        DeviceName: cdk.stringToCloudFormation(properties.deviceName),
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        MediaType: cdk.stringToCloudFormation(properties.mediaType),
        Name: cdk.stringToCloudFormation(properties.name),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnStreamPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnStreamProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnStreamProps>();
    ret.addPropertyResult('dataRetentionInHours', 'DataRetentionInHours', properties.DataRetentionInHours != null ? cfn_parse.FromCloudFormation.getNumber(properties.DataRetentionInHours) : undefined);
    ret.addPropertyResult('deviceName', 'DeviceName', properties.DeviceName != null ? cfn_parse.FromCloudFormation.getString(properties.DeviceName) : undefined);
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('mediaType', 'MediaType', properties.MediaType != null ? cfn_parse.FromCloudFormation.getString(properties.MediaType) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::KinesisVideo::Stream`
 *
 *
 *
 * @cloudformationResource AWS::KinesisVideo::Stream
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-stream.html
 */
export class CfnStream extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::KinesisVideo::Stream";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnStream {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnStreamPropsFromCloudFormation(resourceProperties);
        const ret = new CfnStream(scope, id, propsResult.value);
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
     * `AWS::KinesisVideo::Stream.DataRetentionInHours`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-stream.html#cfn-kinesisvideo-stream-dataretentioninhours
     */
    public dataRetentionInHours: number | undefined;

    /**
     * `AWS::KinesisVideo::Stream.DeviceName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-stream.html#cfn-kinesisvideo-stream-devicename
     */
    public deviceName: string | undefined;

    /**
     * `AWS::KinesisVideo::Stream.KmsKeyId`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-stream.html#cfn-kinesisvideo-stream-kmskeyid
     */
    public kmsKeyId: string | undefined;

    /**
     * `AWS::KinesisVideo::Stream.MediaType`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-stream.html#cfn-kinesisvideo-stream-mediatype
     */
    public mediaType: string | undefined;

    /**
     * `AWS::KinesisVideo::Stream.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-stream.html#cfn-kinesisvideo-stream-name
     */
    public name: string | undefined;

    /**
     * `AWS::KinesisVideo::Stream.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisvideo-stream.html#cfn-kinesisvideo-stream-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::KinesisVideo::Stream`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnStreamProps = {}) {
        super(scope, id, { type: CfnStream.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.dataRetentionInHours = props.dataRetentionInHours;
        this.deviceName = props.deviceName;
        this.kmsKeyId = props.kmsKeyId;
        this.mediaType = props.mediaType;
        this.name = props.name;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::KinesisVideo::Stream", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnStream.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            dataRetentionInHours: this.dataRetentionInHours,
            deviceName: this.deviceName,
            kmsKeyId: this.kmsKeyId,
            mediaType: this.mediaType,
            name: this.name,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnStreamPropsToCloudFormation(props);
    }
}
