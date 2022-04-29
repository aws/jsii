// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:08.897Z","fingerprint":"EueWfrjWHzReOkXNfwPAopar7i2Vmu+4Fj+F386irHU="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnChannel`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html
 */
export interface CfnChannelProps {

    /**
     * Whether the channel is authorized.
     *
     * *Default* : `false`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html#cfn-ivs-channel-authorized
     */
    readonly authorized?: boolean | cdk.IResolvable;

    /**
     * Channel latency mode. Valid values:
     *
     * - `NORMAL` : Use NORMAL to broadcast and deliver live video up to Full HD.
     * - `LOW` : Use LOW for near real-time interactions with viewers.
     *
     * > In the  console, `LOW` and `NORMAL` correspond to `Ultra-low` and `Standard` , respectively.
     *
     * *Default* : `LOW`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html#cfn-ivs-channel-latencymode
     */
    readonly latencyMode?: string;

    /**
     * Channel name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html#cfn-ivs-channel-name
     */
    readonly name?: string;

    /**
     * The ARN of a RecordingConfiguration resource. An empty string indicates that recording is disabled for the channel. A RecordingConfiguration ARN indicates that recording is enabled using the specified recording configuration. See the [RecordingConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-recordingconfiguration.html) resource for more information and an example.
     *
     * *Default* : "" (empty string, recording is disabled)
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html#cfn-ivs-channel-recordingconfigurationarn
     */
    readonly recordingConfigurationArn?: string;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html#cfn-ivs-channel-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The channel type, which determines the allowable resolution and bitrate. *If you exceed the allowable resolution or bitrate, the stream probably will disconnect immediately.* Valid values:
     *
     * - `STANDARD` : Multiple qualities are generated from the original input, to automatically give viewers the best experience for their devices and network conditions. Resolution can be up to 1080p and bitrate can be up to 8.5 Mbps. Audio is transcoded only for renditions 360p and below; above that, audio is passed through.
     * - `BASIC` : delivers the original input to viewers. The viewer’s video-quality choice is limited to the original input. Resolution can be up to 480p and bitrate can be up to 1.5 Mbps.
     *
     * *Default* : `STANDARD`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html#cfn-ivs-channel-type
     */
    readonly type?: string;
}

/**
 * Determine whether the given properties match those of a `CfnChannelProps`
 *
 * @param properties - the TypeScript properties of a `CfnChannelProps`
 *
 * @returns the result of the validation.
 */
function CfnChannelPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('authorized', cdk.validateBoolean)(properties.authorized));
    errors.collect(cdk.propertyValidator('latencyMode', cdk.validateString)(properties.latencyMode));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('recordingConfigurationArn', cdk.validateString)(properties.recordingConfigurationArn));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "CfnChannelProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IVS::Channel` resource
 *
 * @param properties - the TypeScript properties of a `CfnChannelProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IVS::Channel` resource.
 */
// @ts-ignore TS6133
function cfnChannelPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnChannelPropsValidator(properties).assertSuccess();
    return {
        Authorized: cdk.booleanToCloudFormation(properties.authorized),
        LatencyMode: cdk.stringToCloudFormation(properties.latencyMode),
        Name: cdk.stringToCloudFormation(properties.name),
        RecordingConfigurationArn: cdk.stringToCloudFormation(properties.recordingConfigurationArn),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnChannelPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnChannelProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnChannelProps>();
    ret.addPropertyResult('authorized', 'Authorized', properties.Authorized != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Authorized) : undefined);
    ret.addPropertyResult('latencyMode', 'LatencyMode', properties.LatencyMode != null ? cfn_parse.FromCloudFormation.getString(properties.LatencyMode) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('recordingConfigurationArn', 'RecordingConfigurationArn', properties.RecordingConfigurationArn != null ? cfn_parse.FromCloudFormation.getString(properties.RecordingConfigurationArn) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IVS::Channel`
 *
 * The `AWS::IVS::Channel` resource specifies an  channel. A channel stores configuration information related to your live stream. For more information, see [CreateChannel](https://docs.aws.amazon.com/ivs/latest/APIReference/API_CreateChannel.html) in the *Amazon Interactive Video Service API Reference* .
 *
 * > By default, the IVS API CreateChannel endpoint creates a stream key in addition to a channel. The  Channel resource *does not* create a stream key; to create a stream key, use the StreamKey resource instead.
 *
 * @cloudformationResource AWS::IVS::Channel
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html
 */
export class CfnChannel extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IVS::Channel";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnChannel {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnChannelPropsFromCloudFormation(resourceProperties);
        const ret = new CfnChannel(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The channel ARN. For example: `arn:aws:ivs:us-west-2:123456789012:channel/abcdABCDefgh`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * Channel ingest endpoint, part of the definition of an ingest server, used when you set up streaming software.
     *
     * For example: `a1b2c3d4e5f6.global-contribute.live-video.net`
     * @cloudformationAttribute IngestEndpoint
     */
    public readonly attrIngestEndpoint: string;

    /**
     * Channel playback URL. For example: `https://a1b2c3d4e5f6.us-west-2.playback.live-video.net/api/video/v1/us-west-2.123456789012.channel.abcdEFGH.m3u8`
     * @cloudformationAttribute PlaybackUrl
     */
    public readonly attrPlaybackUrl: string;

    /**
     * Whether the channel is authorized.
     *
     * *Default* : `false`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html#cfn-ivs-channel-authorized
     */
    public authorized: boolean | cdk.IResolvable | undefined;

    /**
     * Channel latency mode. Valid values:
     *
     * - `NORMAL` : Use NORMAL to broadcast and deliver live video up to Full HD.
     * - `LOW` : Use LOW for near real-time interactions with viewers.
     *
     * > In the  console, `LOW` and `NORMAL` correspond to `Ultra-low` and `Standard` , respectively.
     *
     * *Default* : `LOW`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html#cfn-ivs-channel-latencymode
     */
    public latencyMode: string | undefined;

    /**
     * Channel name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html#cfn-ivs-channel-name
     */
    public name: string | undefined;

    /**
     * The ARN of a RecordingConfiguration resource. An empty string indicates that recording is disabled for the channel. A RecordingConfiguration ARN indicates that recording is enabled using the specified recording configuration. See the [RecordingConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-recordingconfiguration.html) resource for more information and an example.
     *
     * *Default* : "" (empty string, recording is disabled)
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html#cfn-ivs-channel-recordingconfigurationarn
     */
    public recordingConfigurationArn: string | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html#cfn-ivs-channel-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The channel type, which determines the allowable resolution and bitrate. *If you exceed the allowable resolution or bitrate, the stream probably will disconnect immediately.* Valid values:
     *
     * - `STANDARD` : Multiple qualities are generated from the original input, to automatically give viewers the best experience for their devices and network conditions. Resolution can be up to 1080p and bitrate can be up to 8.5 Mbps. Audio is transcoded only for renditions 360p and below; above that, audio is passed through.
     * - `BASIC` : delivers the original input to viewers. The viewer’s video-quality choice is limited to the original input. Resolution can be up to 480p and bitrate can be up to 1.5 Mbps.
     *
     * *Default* : `STANDARD`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-channel.html#cfn-ivs-channel-type
     */
    public type: string | undefined;

    /**
     * Create a new `AWS::IVS::Channel`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnChannelProps = {}) {
        super(scope, id, { type: CfnChannel.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrIngestEndpoint = cdk.Token.asString(this.getAtt('IngestEndpoint'));
        this.attrPlaybackUrl = cdk.Token.asString(this.getAtt('PlaybackUrl'));

        this.authorized = props.authorized;
        this.latencyMode = props.latencyMode;
        this.name = props.name;
        this.recordingConfigurationArn = props.recordingConfigurationArn;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IVS::Channel", props.tags, { tagPropertyName: 'tags' });
        this.type = props.type;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnChannel.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            authorized: this.authorized,
            latencyMode: this.latencyMode,
            name: this.name,
            recordingConfigurationArn: this.recordingConfigurationArn,
            tags: this.tags.renderTags(),
            type: this.type,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnChannelPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnPlaybackKeyPair`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-playbackkeypair.html
 */
export interface CfnPlaybackKeyPairProps {

    /**
     * The public portion of a customer-generated key pair.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-playbackkeypair.html#cfn-ivs-playbackkeypair-publickeymaterial
     */
    readonly publicKeyMaterial: string;

    /**
     * Playback-key-pair name. The value does not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-playbackkeypair.html#cfn-ivs-playbackkeypair-name
     */
    readonly name?: string;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-playbackkeypair.html#cfn-ivs-playbackkeypair-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnPlaybackKeyPairProps`
 *
 * @param properties - the TypeScript properties of a `CfnPlaybackKeyPairProps`
 *
 * @returns the result of the validation.
 */
function CfnPlaybackKeyPairPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('publicKeyMaterial', cdk.requiredValidator)(properties.publicKeyMaterial));
    errors.collect(cdk.propertyValidator('publicKeyMaterial', cdk.validateString)(properties.publicKeyMaterial));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnPlaybackKeyPairProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IVS::PlaybackKeyPair` resource
 *
 * @param properties - the TypeScript properties of a `CfnPlaybackKeyPairProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IVS::PlaybackKeyPair` resource.
 */
// @ts-ignore TS6133
function cfnPlaybackKeyPairPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPlaybackKeyPairPropsValidator(properties).assertSuccess();
    return {
        PublicKeyMaterial: cdk.stringToCloudFormation(properties.publicKeyMaterial),
        Name: cdk.stringToCloudFormation(properties.name),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnPlaybackKeyPairPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPlaybackKeyPairProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPlaybackKeyPairProps>();
    ret.addPropertyResult('publicKeyMaterial', 'PublicKeyMaterial', cfn_parse.FromCloudFormation.getString(properties.PublicKeyMaterial));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IVS::PlaybackKeyPair`
 *
 * The `AWS::IVS::PlaybackKeyPair` resource specifies an  playback key pair.  uses a public playback key to validate playback tokens that have been signed with the corresponding private key. For more information, see [Setting Up Private Channels](https://docs.aws.amazon.com/ivs/latest/userguide/private-channels.html) in the *Amazon Interactive Video Service User Guide* .
 *
 * @cloudformationResource AWS::IVS::PlaybackKeyPair
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-playbackkeypair.html
 */
export class CfnPlaybackKeyPair extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IVS::PlaybackKeyPair";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnPlaybackKeyPair {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnPlaybackKeyPairPropsFromCloudFormation(resourceProperties);
        const ret = new CfnPlaybackKeyPair(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Key-pair ARN. For example: `arn:aws:ivs:us-west-2:693991300569:playback-key/f99cde61-c2b0-4df3-8941-ca7d38acca1a`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * Key-pair identifier. For example: `98:0d:1a:a0:19:96:1e:ea:0a:0a:2c:9a:42:19:2b:e7`
     * @cloudformationAttribute Fingerprint
     */
    public readonly attrFingerprint: string;

    /**
     * The public portion of a customer-generated key pair.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-playbackkeypair.html#cfn-ivs-playbackkeypair-publickeymaterial
     */
    public publicKeyMaterial: string;

    /**
     * Playback-key-pair name. The value does not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-playbackkeypair.html#cfn-ivs-playbackkeypair-name
     */
    public name: string | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-playbackkeypair.html#cfn-ivs-playbackkeypair-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::IVS::PlaybackKeyPair`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPlaybackKeyPairProps) {
        super(scope, id, { type: CfnPlaybackKeyPair.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'publicKeyMaterial', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrFingerprint = cdk.Token.asString(this.getAtt('Fingerprint'));

        this.publicKeyMaterial = props.publicKeyMaterial;
        this.name = props.name;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IVS::PlaybackKeyPair", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnPlaybackKeyPair.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            publicKeyMaterial: this.publicKeyMaterial,
            name: this.name,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPlaybackKeyPairPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnRecordingConfiguration`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-recordingconfiguration.html
 */
export interface CfnRecordingConfigurationProps {

    /**
     * A destination configuration contains information about where recorded video will be stored. See the [DestinationConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ivs-recordingconfiguration-destinationconfiguration.html) property type for more information.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-recordingconfiguration.html#cfn-ivs-recordingconfiguration-destinationconfiguration
     */
    readonly destinationConfiguration: CfnRecordingConfiguration.DestinationConfigurationProperty | cdk.IResolvable;

    /**
     * Recording-configuration name. The value does not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-recordingconfiguration.html#cfn-ivs-recordingconfiguration-name
     */
    readonly name?: string;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-recordingconfiguration.html#cfn-ivs-recordingconfiguration-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * A thumbnail configuration enables/disables the recording of thumbnails for a live session and controls the interval at which thumbnails are generated for the live session. See the [ThumbnailConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ivs-recordingconfiguration-thunbnailconfiguration.html) property type for more information.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-recordingconfiguration.html#cfn-ivs-recordingconfiguration-thumbnailconfiguration
     */
    readonly thumbnailConfiguration?: CfnRecordingConfiguration.ThumbnailConfigurationProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnRecordingConfigurationProps`
 *
 * @param properties - the TypeScript properties of a `CfnRecordingConfigurationProps`
 *
 * @returns the result of the validation.
 */
function CfnRecordingConfigurationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('destinationConfiguration', cdk.requiredValidator)(properties.destinationConfiguration));
    errors.collect(cdk.propertyValidator('destinationConfiguration', CfnRecordingConfiguration_DestinationConfigurationPropertyValidator)(properties.destinationConfiguration));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('thumbnailConfiguration', CfnRecordingConfiguration_ThumbnailConfigurationPropertyValidator)(properties.thumbnailConfiguration));
    return errors.wrap('supplied properties not correct for "CfnRecordingConfigurationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IVS::RecordingConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CfnRecordingConfigurationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IVS::RecordingConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnRecordingConfigurationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRecordingConfigurationPropsValidator(properties).assertSuccess();
    return {
        DestinationConfiguration: cfnRecordingConfigurationDestinationConfigurationPropertyToCloudFormation(properties.destinationConfiguration),
        Name: cdk.stringToCloudFormation(properties.name),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        ThumbnailConfiguration: cfnRecordingConfigurationThumbnailConfigurationPropertyToCloudFormation(properties.thumbnailConfiguration),
    };
}

// @ts-ignore TS6133
function CfnRecordingConfigurationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRecordingConfigurationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRecordingConfigurationProps>();
    ret.addPropertyResult('destinationConfiguration', 'DestinationConfiguration', CfnRecordingConfigurationDestinationConfigurationPropertyFromCloudFormation(properties.DestinationConfiguration));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('thumbnailConfiguration', 'ThumbnailConfiguration', properties.ThumbnailConfiguration != null ? CfnRecordingConfigurationThumbnailConfigurationPropertyFromCloudFormation(properties.ThumbnailConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IVS::RecordingConfiguration`
 *
 * The `AWS::IVS::RecordingConfiguration` resource specifies an  recording configuration. A recording configuration enables the recording of a channel’s live streams to a data store. Multiple channels can reference the same recording configuration. For more information, see [RecordingConfiguration](https://docs.aws.amazon.com/ivs/latest/APIReference/API_RecordingConfiguration.html) in the *Amazon Interactive Video Service API Reference* .
 *
 * @cloudformationResource AWS::IVS::RecordingConfiguration
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-recordingconfiguration.html
 */
export class CfnRecordingConfiguration extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IVS::RecordingConfiguration";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnRecordingConfiguration {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnRecordingConfigurationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnRecordingConfiguration(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The recording configuration ARN. For example: `arn:aws:ivs:us-west-2:123456789012:recording-configuration/abcdABCDefgh`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * Indicates the current state of the recording configuration. When the state is `ACTIVE` , the configuration is ready to record a channel stream. Valid values: `CREATING` | `CREATE_FAILED` | `ACTIVE` .
     * @cloudformationAttribute State
     */
    public readonly attrState: string;

    /**
     * A destination configuration contains information about where recorded video will be stored. See the [DestinationConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ivs-recordingconfiguration-destinationconfiguration.html) property type for more information.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-recordingconfiguration.html#cfn-ivs-recordingconfiguration-destinationconfiguration
     */
    public destinationConfiguration: CfnRecordingConfiguration.DestinationConfigurationProperty | cdk.IResolvable;

    /**
     * Recording-configuration name. The value does not need to be unique.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-recordingconfiguration.html#cfn-ivs-recordingconfiguration-name
     */
    public name: string | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-recordingconfiguration.html#cfn-ivs-recordingconfiguration-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * A thumbnail configuration enables/disables the recording of thumbnails for a live session and controls the interval at which thumbnails are generated for the live session. See the [ThumbnailConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ivs-recordingconfiguration-thunbnailconfiguration.html) property type for more information.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-recordingconfiguration.html#cfn-ivs-recordingconfiguration-thumbnailconfiguration
     */
    public thumbnailConfiguration: CfnRecordingConfiguration.ThumbnailConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::IVS::RecordingConfiguration`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnRecordingConfigurationProps) {
        super(scope, id, { type: CfnRecordingConfiguration.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'destinationConfiguration', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrState = cdk.Token.asString(this.getAtt('State'));

        this.destinationConfiguration = props.destinationConfiguration;
        this.name = props.name;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IVS::RecordingConfiguration", props.tags, { tagPropertyName: 'tags' });
        this.thumbnailConfiguration = props.thumbnailConfiguration;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnRecordingConfiguration.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            destinationConfiguration: this.destinationConfiguration,
            name: this.name,
            tags: this.tags.renderTags(),
            thumbnailConfiguration: this.thumbnailConfiguration,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnRecordingConfigurationPropsToCloudFormation(props);
    }
}

export namespace CfnRecordingConfiguration {
    /**
     * The DestinationConfiguration property type describes the location where recorded videos will be stored. Each member represents a type of destination configuration. For recording, you define one and only one type of destination configuration.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ivs-recordingconfiguration-destinationconfiguration.html
     */
    export interface DestinationConfigurationProperty {
        /**
         * An S3 destination configuration where recorded videos will be stored. See the [S3DestinationConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ivs-recordingconfiguration-s3destinationconfiguration.html) property type for more information.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ivs-recordingconfiguration-destinationconfiguration.html#cfn-ivs-recordingconfiguration-destinationconfiguration-s3
         */
        readonly s3: CfnRecordingConfiguration.S3DestinationConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DestinationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `DestinationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnRecordingConfiguration_DestinationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3', cdk.requiredValidator)(properties.s3));
    errors.collect(cdk.propertyValidator('s3', CfnRecordingConfiguration_S3DestinationConfigurationPropertyValidator)(properties.s3));
    return errors.wrap('supplied properties not correct for "DestinationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IVS::RecordingConfiguration.DestinationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `DestinationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IVS::RecordingConfiguration.DestinationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnRecordingConfigurationDestinationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRecordingConfiguration_DestinationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        S3: cfnRecordingConfigurationS3DestinationConfigurationPropertyToCloudFormation(properties.s3),
    };
}

// @ts-ignore TS6133
function CfnRecordingConfigurationDestinationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRecordingConfiguration.DestinationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRecordingConfiguration.DestinationConfigurationProperty>();
    ret.addPropertyResult('s3', 'S3', CfnRecordingConfigurationS3DestinationConfigurationPropertyFromCloudFormation(properties.S3));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnRecordingConfiguration {
    /**
     * The S3DestinationConfiguration property type describes an S3 location where recorded videos will be stored.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ivs-recordingconfiguration-s3destinationconfiguration.html
     */
    export interface S3DestinationConfigurationProperty {
        /**
         * Location (S3 bucket name) where recorded videos will be stored.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ivs-recordingconfiguration-s3destinationconfiguration.html#cfn-ivs-recordingconfiguration-s3destinationconfiguration-bucketname
         */
        readonly bucketName: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3DestinationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `S3DestinationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnRecordingConfiguration_S3DestinationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketName', cdk.requiredValidator)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketName', cdk.validateString)(properties.bucketName));
    return errors.wrap('supplied properties not correct for "S3DestinationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IVS::RecordingConfiguration.S3DestinationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `S3DestinationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IVS::RecordingConfiguration.S3DestinationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnRecordingConfigurationS3DestinationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRecordingConfiguration_S3DestinationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        BucketName: cdk.stringToCloudFormation(properties.bucketName),
    };
}

// @ts-ignore TS6133
function CfnRecordingConfigurationS3DestinationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRecordingConfiguration.S3DestinationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRecordingConfiguration.S3DestinationConfigurationProperty>();
    ret.addPropertyResult('bucketName', 'BucketName', cfn_parse.FromCloudFormation.getString(properties.BucketName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnRecordingConfiguration {
    /**
     * The ThumbnailConfiguration property type describes a configuration of thumbnails for recorded video.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ivs-recordingconfiguration-thumbnailconfiguration.html
     */
    export interface ThumbnailConfigurationProperty {
        /**
         * Thumbnail recording mode. Valid values:
         *
         * - `DISABLED` : Use DISABLED to disable the generation of thumbnails for recorded video.
         * - `INTERVAL` : Use INTERVAL to enable the generation of thumbnails for recorded video at a time interval controlled by the [TargetIntervalSeconds](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ivs-recordingconfiguration-thumbnailconfiguration.html#cfn-ivs-recordingconfiguration-thumbnailconfiguration-targetintervalseconds) property.
         *
         * *Default* : `INTERVAL`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ivs-recordingconfiguration-thumbnailconfiguration.html#cfn-ivs-recordingconfiguration-thumbnailconfiguration-recordingmode
         */
        readonly recordingMode: string;
        /**
         * The targeted thumbnail-generation interval in seconds. This is configurable (and required) only if [RecordingMode](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ivs-recordingconfiguration-thumbnailconfiguration.html#cfn-ivs-recordingconfiguration-thumbnailconfiguration-recordingmode) is `INTERVAL` .
         *
         * > Setting a value for `TargetIntervalSeconds` does not guarantee that thumbnails are generated at the specified interval. For thumbnails to be generated at the `TargetIntervalSeconds` interval, the `IDR/Keyframe` value for the input video must be less than the `TargetIntervalSeconds` value. See [Amazon IVS Streaming Configuration](https://docs.aws.amazon.com/ivs/latest/userguide/streaming-config.html) for information on setting `IDR/Keyframe` to the recommended value in video-encoder settings.
         *
         * *Default* : 60
         *
         * *Valid Range* : Minumum value of 5. Maximum value of 60.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ivs-recordingconfiguration-thumbnailconfiguration.html#cfn-ivs-recordingconfiguration-thumbnailconfiguration-targetintervalseconds
         */
        readonly targetIntervalSeconds?: number;
    }
}

/**
 * Determine whether the given properties match those of a `ThumbnailConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ThumbnailConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnRecordingConfiguration_ThumbnailConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('recordingMode', cdk.requiredValidator)(properties.recordingMode));
    errors.collect(cdk.propertyValidator('recordingMode', cdk.validateString)(properties.recordingMode));
    errors.collect(cdk.propertyValidator('targetIntervalSeconds', cdk.validateNumber)(properties.targetIntervalSeconds));
    return errors.wrap('supplied properties not correct for "ThumbnailConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IVS::RecordingConfiguration.ThumbnailConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ThumbnailConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IVS::RecordingConfiguration.ThumbnailConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnRecordingConfigurationThumbnailConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRecordingConfiguration_ThumbnailConfigurationPropertyValidator(properties).assertSuccess();
    return {
        RecordingMode: cdk.stringToCloudFormation(properties.recordingMode),
        TargetIntervalSeconds: cdk.numberToCloudFormation(properties.targetIntervalSeconds),
    };
}

// @ts-ignore TS6133
function CfnRecordingConfigurationThumbnailConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRecordingConfiguration.ThumbnailConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRecordingConfiguration.ThumbnailConfigurationProperty>();
    ret.addPropertyResult('recordingMode', 'RecordingMode', cfn_parse.FromCloudFormation.getString(properties.RecordingMode));
    ret.addPropertyResult('targetIntervalSeconds', 'TargetIntervalSeconds', properties.TargetIntervalSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.TargetIntervalSeconds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnStreamKey`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-streamkey.html
 */
export interface CfnStreamKeyProps {

    /**
     * Channel ARN for the stream.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-streamkey.html#cfn-ivs-streamkey-channelarn
     */
    readonly channelArn: string;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-streamkey.html#cfn-ivs-streamkey-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnStreamKeyProps`
 *
 * @param properties - the TypeScript properties of a `CfnStreamKeyProps`
 *
 * @returns the result of the validation.
 */
function CfnStreamKeyPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('channelArn', cdk.requiredValidator)(properties.channelArn));
    errors.collect(cdk.propertyValidator('channelArn', cdk.validateString)(properties.channelArn));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnStreamKeyProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IVS::StreamKey` resource
 *
 * @param properties - the TypeScript properties of a `CfnStreamKeyProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IVS::StreamKey` resource.
 */
// @ts-ignore TS6133
function cfnStreamKeyPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnStreamKeyPropsValidator(properties).assertSuccess();
    return {
        ChannelArn: cdk.stringToCloudFormation(properties.channelArn),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnStreamKeyPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnStreamKeyProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnStreamKeyProps>();
    ret.addPropertyResult('channelArn', 'ChannelArn', cfn_parse.FromCloudFormation.getString(properties.ChannelArn));
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IVS::StreamKey`
 *
 * The `AWS::IVS::StreamKey` resource specifies an  stream key associated with the referenced channel. Use a stream key to initiate a live stream.
 *
 * @cloudformationResource AWS::IVS::StreamKey
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-streamkey.html
 */
export class CfnStreamKey extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IVS::StreamKey";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnStreamKey {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnStreamKeyPropsFromCloudFormation(resourceProperties);
        const ret = new CfnStreamKey(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The stream-key ARN. For example: `arn:aws:ivs:us-west-2:123456789012:stream-key/g1H2I3j4k5L6`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The stream-key value. For example: `sk_us-west-2_abcdABCDefgh_567890abcdef`
     * @cloudformationAttribute Value
     */
    public readonly attrValue: string;

    /**
     * Channel ARN for the stream.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-streamkey.html#cfn-ivs-streamkey-channelarn
     */
    public channelArn: string;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-streamkey.html#cfn-ivs-streamkey-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::IVS::StreamKey`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnStreamKeyProps) {
        super(scope, id, { type: CfnStreamKey.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'channelArn', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrValue = cdk.Token.asString(this.getAtt('Value'));

        this.channelArn = props.channelArn;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IVS::StreamKey", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnStreamKey.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            channelArn: this.channelArn,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnStreamKeyPropsToCloudFormation(props);
    }
}
