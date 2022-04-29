// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.433Z","fingerprint":"wpb60o6y92mfRli08EM6GFKaTdtjiCGRtuc2/O+uV48="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnPlaybackConfiguration`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html
 */
export interface CfnPlaybackConfigurationProps {

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.AdDecisionServerUrl`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-addecisionserverurl
     */
    readonly adDecisionServerUrl: string;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-name
     */
    readonly name: string;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.VideoContentSourceUrl`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-videocontentsourceurl
     */
    readonly videoContentSourceUrl: string;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.AvailSuppression`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-availsuppression
     */
    readonly availSuppression?: CfnPlaybackConfiguration.AvailSuppressionProperty | cdk.IResolvable;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.Bumper`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-bumper
     */
    readonly bumper?: CfnPlaybackConfiguration.BumperProperty | cdk.IResolvable;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.CdnConfiguration`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-cdnconfiguration
     */
    readonly cdnConfiguration?: CfnPlaybackConfiguration.CdnConfigurationProperty | cdk.IResolvable;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.ConfigurationAliases`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-configurationaliases
     */
    readonly configurationAliases?: { [key: string]: (any | cdk.IResolvable) } | cdk.IResolvable;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.DashConfiguration`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-dashconfiguration
     */
    readonly dashConfiguration?: CfnPlaybackConfiguration.DashConfigurationForPutProperty | cdk.IResolvable;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.LivePreRollConfiguration`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-liveprerollconfiguration
     */
    readonly livePreRollConfiguration?: CfnPlaybackConfiguration.LivePreRollConfigurationProperty | cdk.IResolvable;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.ManifestProcessingRules`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-manifestprocessingrules
     */
    readonly manifestProcessingRules?: CfnPlaybackConfiguration.ManifestProcessingRulesProperty | cdk.IResolvable;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.PersonalizationThresholdSeconds`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-personalizationthresholdseconds
     */
    readonly personalizationThresholdSeconds?: number;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.SessionInitializationEndpointPrefix`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-sessioninitializationendpointprefix
     */
    readonly sessionInitializationEndpointPrefix?: string;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.SlateAdUrl`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-slateadurl
     */
    readonly slateAdUrl?: string;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.TranscodeProfileName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-transcodeprofilename
     */
    readonly transcodeProfileName?: string;
}

/**
 * Determine whether the given properties match those of a `CfnPlaybackConfigurationProps`
 *
 * @param properties - the TypeScript properties of a `CfnPlaybackConfigurationProps`
 *
 * @returns the result of the validation.
 */
function CfnPlaybackConfigurationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('adDecisionServerUrl', cdk.requiredValidator)(properties.adDecisionServerUrl));
    errors.collect(cdk.propertyValidator('adDecisionServerUrl', cdk.validateString)(properties.adDecisionServerUrl));
    errors.collect(cdk.propertyValidator('availSuppression', CfnPlaybackConfiguration_AvailSuppressionPropertyValidator)(properties.availSuppression));
    errors.collect(cdk.propertyValidator('bumper', CfnPlaybackConfiguration_BumperPropertyValidator)(properties.bumper));
    errors.collect(cdk.propertyValidator('cdnConfiguration', CfnPlaybackConfiguration_CdnConfigurationPropertyValidator)(properties.cdnConfiguration));
    errors.collect(cdk.propertyValidator('configurationAliases', cdk.hashValidator(cdk.validateObject))(properties.configurationAliases));
    errors.collect(cdk.propertyValidator('dashConfiguration', CfnPlaybackConfiguration_DashConfigurationForPutPropertyValidator)(properties.dashConfiguration));
    errors.collect(cdk.propertyValidator('livePreRollConfiguration', CfnPlaybackConfiguration_LivePreRollConfigurationPropertyValidator)(properties.livePreRollConfiguration));
    errors.collect(cdk.propertyValidator('manifestProcessingRules', CfnPlaybackConfiguration_ManifestProcessingRulesPropertyValidator)(properties.manifestProcessingRules));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('personalizationThresholdSeconds', cdk.validateNumber)(properties.personalizationThresholdSeconds));
    errors.collect(cdk.propertyValidator('sessionInitializationEndpointPrefix', cdk.validateString)(properties.sessionInitializationEndpointPrefix));
    errors.collect(cdk.propertyValidator('slateAdUrl', cdk.validateString)(properties.slateAdUrl));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('transcodeProfileName', cdk.validateString)(properties.transcodeProfileName));
    errors.collect(cdk.propertyValidator('videoContentSourceUrl', cdk.requiredValidator)(properties.videoContentSourceUrl));
    errors.collect(cdk.propertyValidator('videoContentSourceUrl', cdk.validateString)(properties.videoContentSourceUrl));
    return errors.wrap('supplied properties not correct for "CfnPlaybackConfigurationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CfnPlaybackConfigurationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnPlaybackConfigurationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPlaybackConfigurationPropsValidator(properties).assertSuccess();
    return {
        AdDecisionServerUrl: cdk.stringToCloudFormation(properties.adDecisionServerUrl),
        Name: cdk.stringToCloudFormation(properties.name),
        VideoContentSourceUrl: cdk.stringToCloudFormation(properties.videoContentSourceUrl),
        AvailSuppression: cfnPlaybackConfigurationAvailSuppressionPropertyToCloudFormation(properties.availSuppression),
        Bumper: cfnPlaybackConfigurationBumperPropertyToCloudFormation(properties.bumper),
        CdnConfiguration: cfnPlaybackConfigurationCdnConfigurationPropertyToCloudFormation(properties.cdnConfiguration),
        ConfigurationAliases: cdk.hashMapper(cdk.objectToCloudFormation)(properties.configurationAliases),
        DashConfiguration: cfnPlaybackConfigurationDashConfigurationForPutPropertyToCloudFormation(properties.dashConfiguration),
        LivePreRollConfiguration: cfnPlaybackConfigurationLivePreRollConfigurationPropertyToCloudFormation(properties.livePreRollConfiguration),
        ManifestProcessingRules: cfnPlaybackConfigurationManifestProcessingRulesPropertyToCloudFormation(properties.manifestProcessingRules),
        PersonalizationThresholdSeconds: cdk.numberToCloudFormation(properties.personalizationThresholdSeconds),
        SessionInitializationEndpointPrefix: cdk.stringToCloudFormation(properties.sessionInitializationEndpointPrefix),
        SlateAdUrl: cdk.stringToCloudFormation(properties.slateAdUrl),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        TranscodeProfileName: cdk.stringToCloudFormation(properties.transcodeProfileName),
    };
}

// @ts-ignore TS6133
function CfnPlaybackConfigurationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPlaybackConfigurationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPlaybackConfigurationProps>();
    ret.addPropertyResult('adDecisionServerUrl', 'AdDecisionServerUrl', cfn_parse.FromCloudFormation.getString(properties.AdDecisionServerUrl));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('videoContentSourceUrl', 'VideoContentSourceUrl', cfn_parse.FromCloudFormation.getString(properties.VideoContentSourceUrl));
    ret.addPropertyResult('availSuppression', 'AvailSuppression', properties.AvailSuppression != null ? CfnPlaybackConfigurationAvailSuppressionPropertyFromCloudFormation(properties.AvailSuppression) : undefined);
    ret.addPropertyResult('bumper', 'Bumper', properties.Bumper != null ? CfnPlaybackConfigurationBumperPropertyFromCloudFormation(properties.Bumper) : undefined);
    ret.addPropertyResult('cdnConfiguration', 'CdnConfiguration', properties.CdnConfiguration != null ? CfnPlaybackConfigurationCdnConfigurationPropertyFromCloudFormation(properties.CdnConfiguration) : undefined);
    ret.addPropertyResult('configurationAliases', 'ConfigurationAliases', properties.ConfigurationAliases != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getAny)(properties.ConfigurationAliases) : undefined);
    ret.addPropertyResult('dashConfiguration', 'DashConfiguration', properties.DashConfiguration != null ? CfnPlaybackConfigurationDashConfigurationForPutPropertyFromCloudFormation(properties.DashConfiguration) : undefined);
    ret.addPropertyResult('livePreRollConfiguration', 'LivePreRollConfiguration', properties.LivePreRollConfiguration != null ? CfnPlaybackConfigurationLivePreRollConfigurationPropertyFromCloudFormation(properties.LivePreRollConfiguration) : undefined);
    ret.addPropertyResult('manifestProcessingRules', 'ManifestProcessingRules', properties.ManifestProcessingRules != null ? CfnPlaybackConfigurationManifestProcessingRulesPropertyFromCloudFormation(properties.ManifestProcessingRules) : undefined);
    ret.addPropertyResult('personalizationThresholdSeconds', 'PersonalizationThresholdSeconds', properties.PersonalizationThresholdSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.PersonalizationThresholdSeconds) : undefined);
    ret.addPropertyResult('sessionInitializationEndpointPrefix', 'SessionInitializationEndpointPrefix', properties.SessionInitializationEndpointPrefix != null ? cfn_parse.FromCloudFormation.getString(properties.SessionInitializationEndpointPrefix) : undefined);
    ret.addPropertyResult('slateAdUrl', 'SlateAdUrl', properties.SlateAdUrl != null ? cfn_parse.FromCloudFormation.getString(properties.SlateAdUrl) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('transcodeProfileName', 'TranscodeProfileName', properties.TranscodeProfileName != null ? cfn_parse.FromCloudFormation.getString(properties.TranscodeProfileName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::MediaTailor::PlaybackConfiguration`
 *
 *
 *
 * @cloudformationResource AWS::MediaTailor::PlaybackConfiguration
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html
 */
export class CfnPlaybackConfiguration extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::MediaTailor::PlaybackConfiguration";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnPlaybackConfiguration {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnPlaybackConfigurationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnPlaybackConfiguration(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.AdDecisionServerUrl`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-addecisionserverurl
     */
    public adDecisionServerUrl: string;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-name
     */
    public name: string;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.VideoContentSourceUrl`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-videocontentsourceurl
     */
    public videoContentSourceUrl: string;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.AvailSuppression`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-availsuppression
     */
    public availSuppression: CfnPlaybackConfiguration.AvailSuppressionProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.Bumper`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-bumper
     */
    public bumper: CfnPlaybackConfiguration.BumperProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.CdnConfiguration`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-cdnconfiguration
     */
    public cdnConfiguration: CfnPlaybackConfiguration.CdnConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.ConfigurationAliases`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-configurationaliases
     */
    public configurationAliases: { [key: string]: (any | cdk.IResolvable) } | cdk.IResolvable | undefined;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.DashConfiguration`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-dashconfiguration
     */
    public dashConfiguration: CfnPlaybackConfiguration.DashConfigurationForPutProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.LivePreRollConfiguration`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-liveprerollconfiguration
     */
    public livePreRollConfiguration: CfnPlaybackConfiguration.LivePreRollConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.ManifestProcessingRules`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-manifestprocessingrules
     */
    public manifestProcessingRules: CfnPlaybackConfiguration.ManifestProcessingRulesProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.PersonalizationThresholdSeconds`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-personalizationthresholdseconds
     */
    public personalizationThresholdSeconds: number | undefined;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.SessionInitializationEndpointPrefix`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-sessioninitializationendpointprefix
     */
    public sessionInitializationEndpointPrefix: string | undefined;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.SlateAdUrl`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-slateadurl
     */
    public slateAdUrl: string | undefined;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * `AWS::MediaTailor::PlaybackConfiguration.TranscodeProfileName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html#cfn-mediatailor-playbackconfiguration-transcodeprofilename
     */
    public transcodeProfileName: string | undefined;

    /**
     * Create a new `AWS::MediaTailor::PlaybackConfiguration`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPlaybackConfigurationProps) {
        super(scope, id, { type: CfnPlaybackConfiguration.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'adDecisionServerUrl', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'videoContentSourceUrl', this);

        this.adDecisionServerUrl = props.adDecisionServerUrl;
        this.name = props.name;
        this.videoContentSourceUrl = props.videoContentSourceUrl;
        this.availSuppression = props.availSuppression;
        this.bumper = props.bumper;
        this.cdnConfiguration = props.cdnConfiguration;
        this.configurationAliases = props.configurationAliases;
        this.dashConfiguration = props.dashConfiguration;
        this.livePreRollConfiguration = props.livePreRollConfiguration;
        this.manifestProcessingRules = props.manifestProcessingRules;
        this.personalizationThresholdSeconds = props.personalizationThresholdSeconds;
        this.sessionInitializationEndpointPrefix = props.sessionInitializationEndpointPrefix;
        this.slateAdUrl = props.slateAdUrl;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::MediaTailor::PlaybackConfiguration", props.tags, { tagPropertyName: 'tags' });
        this.transcodeProfileName = props.transcodeProfileName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnPlaybackConfiguration.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            adDecisionServerUrl: this.adDecisionServerUrl,
            name: this.name,
            videoContentSourceUrl: this.videoContentSourceUrl,
            availSuppression: this.availSuppression,
            bumper: this.bumper,
            cdnConfiguration: this.cdnConfiguration,
            configurationAliases: this.configurationAliases,
            dashConfiguration: this.dashConfiguration,
            livePreRollConfiguration: this.livePreRollConfiguration,
            manifestProcessingRules: this.manifestProcessingRules,
            personalizationThresholdSeconds: this.personalizationThresholdSeconds,
            sessionInitializationEndpointPrefix: this.sessionInitializationEndpointPrefix,
            slateAdUrl: this.slateAdUrl,
            tags: this.tags.renderTags(),
            transcodeProfileName: this.transcodeProfileName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPlaybackConfigurationPropsToCloudFormation(props);
    }
}

export namespace CfnPlaybackConfiguration {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-admarkerpassthrough.html
     */
    export interface AdMarkerPassthroughProperty {
        /**
         * `CfnPlaybackConfiguration.AdMarkerPassthroughProperty.Enabled`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-admarkerpassthrough.html#cfn-mediatailor-playbackconfiguration-admarkerpassthrough-enabled
         */
        readonly enabled?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AdMarkerPassthroughProperty`
 *
 * @param properties - the TypeScript properties of a `AdMarkerPassthroughProperty`
 *
 * @returns the result of the validation.
 */
function CfnPlaybackConfiguration_AdMarkerPassthroughPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    return errors.wrap('supplied properties not correct for "AdMarkerPassthroughProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration.AdMarkerPassthrough` resource
 *
 * @param properties - the TypeScript properties of a `AdMarkerPassthroughProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration.AdMarkerPassthrough` resource.
 */
// @ts-ignore TS6133
function cfnPlaybackConfigurationAdMarkerPassthroughPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPlaybackConfiguration_AdMarkerPassthroughPropertyValidator(properties).assertSuccess();
    return {
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
    };
}

// @ts-ignore TS6133
function CfnPlaybackConfigurationAdMarkerPassthroughPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPlaybackConfiguration.AdMarkerPassthroughProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPlaybackConfiguration.AdMarkerPassthroughProperty>();
    ret.addPropertyResult('enabled', 'Enabled', properties.Enabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enabled) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPlaybackConfiguration {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-availsuppression.html
     */
    export interface AvailSuppressionProperty {
        /**
         * `CfnPlaybackConfiguration.AvailSuppressionProperty.Mode`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-availsuppression.html#cfn-mediatailor-playbackconfiguration-availsuppression-mode
         */
        readonly mode?: string;
        /**
         * `CfnPlaybackConfiguration.AvailSuppressionProperty.Value`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-availsuppression.html#cfn-mediatailor-playbackconfiguration-availsuppression-value
         */
        readonly value?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AvailSuppressionProperty`
 *
 * @param properties - the TypeScript properties of a `AvailSuppressionProperty`
 *
 * @returns the result of the validation.
 */
function CfnPlaybackConfiguration_AvailSuppressionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('mode', cdk.validateString)(properties.mode));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "AvailSuppressionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration.AvailSuppression` resource
 *
 * @param properties - the TypeScript properties of a `AvailSuppressionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration.AvailSuppression` resource.
 */
// @ts-ignore TS6133
function cfnPlaybackConfigurationAvailSuppressionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPlaybackConfiguration_AvailSuppressionPropertyValidator(properties).assertSuccess();
    return {
        Mode: cdk.stringToCloudFormation(properties.mode),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnPlaybackConfigurationAvailSuppressionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPlaybackConfiguration.AvailSuppressionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPlaybackConfiguration.AvailSuppressionProperty>();
    ret.addPropertyResult('mode', 'Mode', properties.Mode != null ? cfn_parse.FromCloudFormation.getString(properties.Mode) : undefined);
    ret.addPropertyResult('value', 'Value', properties.Value != null ? cfn_parse.FromCloudFormation.getString(properties.Value) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPlaybackConfiguration {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-bumper.html
     */
    export interface BumperProperty {
        /**
         * `CfnPlaybackConfiguration.BumperProperty.EndUrl`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-bumper.html#cfn-mediatailor-playbackconfiguration-bumper-endurl
         */
        readonly endUrl?: string;
        /**
         * `CfnPlaybackConfiguration.BumperProperty.StartUrl`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-bumper.html#cfn-mediatailor-playbackconfiguration-bumper-starturl
         */
        readonly startUrl?: string;
    }
}

/**
 * Determine whether the given properties match those of a `BumperProperty`
 *
 * @param properties - the TypeScript properties of a `BumperProperty`
 *
 * @returns the result of the validation.
 */
function CfnPlaybackConfiguration_BumperPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('endUrl', cdk.validateString)(properties.endUrl));
    errors.collect(cdk.propertyValidator('startUrl', cdk.validateString)(properties.startUrl));
    return errors.wrap('supplied properties not correct for "BumperProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration.Bumper` resource
 *
 * @param properties - the TypeScript properties of a `BumperProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration.Bumper` resource.
 */
// @ts-ignore TS6133
function cfnPlaybackConfigurationBumperPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPlaybackConfiguration_BumperPropertyValidator(properties).assertSuccess();
    return {
        EndUrl: cdk.stringToCloudFormation(properties.endUrl),
        StartUrl: cdk.stringToCloudFormation(properties.startUrl),
    };
}

// @ts-ignore TS6133
function CfnPlaybackConfigurationBumperPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPlaybackConfiguration.BumperProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPlaybackConfiguration.BumperProperty>();
    ret.addPropertyResult('endUrl', 'EndUrl', properties.EndUrl != null ? cfn_parse.FromCloudFormation.getString(properties.EndUrl) : undefined);
    ret.addPropertyResult('startUrl', 'StartUrl', properties.StartUrl != null ? cfn_parse.FromCloudFormation.getString(properties.StartUrl) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPlaybackConfiguration {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-cdnconfiguration.html
     */
    export interface CdnConfigurationProperty {
        /**
         * `CfnPlaybackConfiguration.CdnConfigurationProperty.AdSegmentUrlPrefix`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-cdnconfiguration.html#cfn-mediatailor-playbackconfiguration-cdnconfiguration-adsegmenturlprefix
         */
        readonly adSegmentUrlPrefix?: string;
        /**
         * `CfnPlaybackConfiguration.CdnConfigurationProperty.ContentSegmentUrlPrefix`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-cdnconfiguration.html#cfn-mediatailor-playbackconfiguration-cdnconfiguration-contentsegmenturlprefix
         */
        readonly contentSegmentUrlPrefix?: string;
    }
}

/**
 * Determine whether the given properties match those of a `CdnConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `CdnConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnPlaybackConfiguration_CdnConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('adSegmentUrlPrefix', cdk.validateString)(properties.adSegmentUrlPrefix));
    errors.collect(cdk.propertyValidator('contentSegmentUrlPrefix', cdk.validateString)(properties.contentSegmentUrlPrefix));
    return errors.wrap('supplied properties not correct for "CdnConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration.CdnConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CdnConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration.CdnConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnPlaybackConfigurationCdnConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPlaybackConfiguration_CdnConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AdSegmentUrlPrefix: cdk.stringToCloudFormation(properties.adSegmentUrlPrefix),
        ContentSegmentUrlPrefix: cdk.stringToCloudFormation(properties.contentSegmentUrlPrefix),
    };
}

// @ts-ignore TS6133
function CfnPlaybackConfigurationCdnConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPlaybackConfiguration.CdnConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPlaybackConfiguration.CdnConfigurationProperty>();
    ret.addPropertyResult('adSegmentUrlPrefix', 'AdSegmentUrlPrefix', properties.AdSegmentUrlPrefix != null ? cfn_parse.FromCloudFormation.getString(properties.AdSegmentUrlPrefix) : undefined);
    ret.addPropertyResult('contentSegmentUrlPrefix', 'ContentSegmentUrlPrefix', properties.ContentSegmentUrlPrefix != null ? cfn_parse.FromCloudFormation.getString(properties.ContentSegmentUrlPrefix) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPlaybackConfiguration {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-dashconfigurationforput.html
     */
    export interface DashConfigurationForPutProperty {
        /**
         * `CfnPlaybackConfiguration.DashConfigurationForPutProperty.MpdLocation`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-dashconfigurationforput.html#cfn-mediatailor-playbackconfiguration-dashconfigurationforput-mpdlocation
         */
        readonly mpdLocation?: string;
        /**
         * `CfnPlaybackConfiguration.DashConfigurationForPutProperty.OriginManifestType`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-dashconfigurationforput.html#cfn-mediatailor-playbackconfiguration-dashconfigurationforput-originmanifesttype
         */
        readonly originManifestType?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DashConfigurationForPutProperty`
 *
 * @param properties - the TypeScript properties of a `DashConfigurationForPutProperty`
 *
 * @returns the result of the validation.
 */
function CfnPlaybackConfiguration_DashConfigurationForPutPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('mpdLocation', cdk.validateString)(properties.mpdLocation));
    errors.collect(cdk.propertyValidator('originManifestType', cdk.validateString)(properties.originManifestType));
    return errors.wrap('supplied properties not correct for "DashConfigurationForPutProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration.DashConfigurationForPut` resource
 *
 * @param properties - the TypeScript properties of a `DashConfigurationForPutProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration.DashConfigurationForPut` resource.
 */
// @ts-ignore TS6133
function cfnPlaybackConfigurationDashConfigurationForPutPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPlaybackConfiguration_DashConfigurationForPutPropertyValidator(properties).assertSuccess();
    return {
        MpdLocation: cdk.stringToCloudFormation(properties.mpdLocation),
        OriginManifestType: cdk.stringToCloudFormation(properties.originManifestType),
    };
}

// @ts-ignore TS6133
function CfnPlaybackConfigurationDashConfigurationForPutPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPlaybackConfiguration.DashConfigurationForPutProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPlaybackConfiguration.DashConfigurationForPutProperty>();
    ret.addPropertyResult('mpdLocation', 'MpdLocation', properties.MpdLocation != null ? cfn_parse.FromCloudFormation.getString(properties.MpdLocation) : undefined);
    ret.addPropertyResult('originManifestType', 'OriginManifestType', properties.OriginManifestType != null ? cfn_parse.FromCloudFormation.getString(properties.OriginManifestType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPlaybackConfiguration {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-liveprerollconfiguration.html
     */
    export interface LivePreRollConfigurationProperty {
        /**
         * `CfnPlaybackConfiguration.LivePreRollConfigurationProperty.AdDecisionServerUrl`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-liveprerollconfiguration.html#cfn-mediatailor-playbackconfiguration-liveprerollconfiguration-addecisionserverurl
         */
        readonly adDecisionServerUrl?: string;
        /**
         * `CfnPlaybackConfiguration.LivePreRollConfigurationProperty.MaxDurationSeconds`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-liveprerollconfiguration.html#cfn-mediatailor-playbackconfiguration-liveprerollconfiguration-maxdurationseconds
         */
        readonly maxDurationSeconds?: number;
    }
}

/**
 * Determine whether the given properties match those of a `LivePreRollConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `LivePreRollConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnPlaybackConfiguration_LivePreRollConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('adDecisionServerUrl', cdk.validateString)(properties.adDecisionServerUrl));
    errors.collect(cdk.propertyValidator('maxDurationSeconds', cdk.validateNumber)(properties.maxDurationSeconds));
    return errors.wrap('supplied properties not correct for "LivePreRollConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration.LivePreRollConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `LivePreRollConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration.LivePreRollConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnPlaybackConfigurationLivePreRollConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPlaybackConfiguration_LivePreRollConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AdDecisionServerUrl: cdk.stringToCloudFormation(properties.adDecisionServerUrl),
        MaxDurationSeconds: cdk.numberToCloudFormation(properties.maxDurationSeconds),
    };
}

// @ts-ignore TS6133
function CfnPlaybackConfigurationLivePreRollConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPlaybackConfiguration.LivePreRollConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPlaybackConfiguration.LivePreRollConfigurationProperty>();
    ret.addPropertyResult('adDecisionServerUrl', 'AdDecisionServerUrl', properties.AdDecisionServerUrl != null ? cfn_parse.FromCloudFormation.getString(properties.AdDecisionServerUrl) : undefined);
    ret.addPropertyResult('maxDurationSeconds', 'MaxDurationSeconds', properties.MaxDurationSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxDurationSeconds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPlaybackConfiguration {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-manifestprocessingrules.html
     */
    export interface ManifestProcessingRulesProperty {
        /**
         * `CfnPlaybackConfiguration.ManifestProcessingRulesProperty.AdMarkerPassthrough`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-mediatailor-playbackconfiguration-manifestprocessingrules.html#cfn-mediatailor-playbackconfiguration-manifestprocessingrules-admarkerpassthrough
         */
        readonly adMarkerPassthrough?: CfnPlaybackConfiguration.AdMarkerPassthroughProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ManifestProcessingRulesProperty`
 *
 * @param properties - the TypeScript properties of a `ManifestProcessingRulesProperty`
 *
 * @returns the result of the validation.
 */
function CfnPlaybackConfiguration_ManifestProcessingRulesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('adMarkerPassthrough', CfnPlaybackConfiguration_AdMarkerPassthroughPropertyValidator)(properties.adMarkerPassthrough));
    return errors.wrap('supplied properties not correct for "ManifestProcessingRulesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration.ManifestProcessingRules` resource
 *
 * @param properties - the TypeScript properties of a `ManifestProcessingRulesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::MediaTailor::PlaybackConfiguration.ManifestProcessingRules` resource.
 */
// @ts-ignore TS6133
function cfnPlaybackConfigurationManifestProcessingRulesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPlaybackConfiguration_ManifestProcessingRulesPropertyValidator(properties).assertSuccess();
    return {
        AdMarkerPassthrough: cfnPlaybackConfigurationAdMarkerPassthroughPropertyToCloudFormation(properties.adMarkerPassthrough),
    };
}

// @ts-ignore TS6133
function CfnPlaybackConfigurationManifestProcessingRulesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPlaybackConfiguration.ManifestProcessingRulesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPlaybackConfiguration.ManifestProcessingRulesProperty>();
    ret.addPropertyResult('adMarkerPassthrough', 'AdMarkerPassthrough', properties.AdMarkerPassthrough != null ? CfnPlaybackConfigurationAdMarkerPassthroughPropertyFromCloudFormation(properties.AdMarkerPassthrough) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
