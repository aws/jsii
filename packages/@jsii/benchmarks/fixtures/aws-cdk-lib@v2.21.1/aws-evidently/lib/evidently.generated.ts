// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:08.387Z","fingerprint":"NTzg797R7UAQSRgCLZwDsMaXszUXFjn9s4v2eDoQUZM="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnExperiment`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html
 */
export interface CfnExperimentProps {

    /**
     * An array of structures that defines the metrics used for the experiment, and whether a higher or lower value for each metric is the goal. You can use up to three metrics in an experiment.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-metricgoals
     */
    readonly metricGoals: Array<CfnExperiment.MetricGoalObjectProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A name for the new experiment.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-name
     */
    readonly name: string;

    /**
     * A structure that contains the configuration of which variation to use as the "control" version. The "control" version is used for comparison with other variations. This structure also specifies how much experiment traffic is allocated to each variation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-onlineabconfig
     */
    readonly onlineAbConfig: CfnExperiment.OnlineAbConfigObjectProperty | cdk.IResolvable;

    /**
     * The name or the ARN of the project where this experiment is to be created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-project
     */
    readonly project: string;

    /**
     * An array of structures that describe the configuration of each feature variation used in the experiment.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-treatments
     */
    readonly treatments: Array<CfnExperiment.TreatmentObjectProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * An optional description of the experiment.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-description
     */
    readonly description?: string;

    /**
     * When Evidently assigns a particular user session to an experiment, it must use a randomization ID to determine which variation the user session is served. This randomization ID is a combination of the entity ID and `randomizationSalt` . If you omit `randomizationSalt` , Evidently uses the experiment name as the `randomizationSalt` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-randomizationsalt
     */
    readonly randomizationSalt?: string;

    /**
     * The portion of the available audience that you want to allocate to this experiment, in thousandths of a percent. The available audience is the total audience minus the audience that you have allocated to overrides or current launches of this feature.
     *
     * This is represented in thousandths of a percent. For example, specify 10,000 to allocate 10% of the available audience.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-samplingrate
     */
    readonly samplingRate?: number;

    /**
     * Assigns one or more tags (key-value pairs) to the experiment.
     *
     * Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.
     *
     * Tags don't have any semantic meaning to AWS and are interpreted strictly as strings of characters.
     *
     * You can associate as many as 50 tags with an experiment.
     *
     * For more information, see [Tagging AWS resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnExperimentProps`
 *
 * @param properties - the TypeScript properties of a `CfnExperimentProps`
 *
 * @returns the result of the validation.
 */
function CfnExperimentPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('metricGoals', cdk.requiredValidator)(properties.metricGoals));
    errors.collect(cdk.propertyValidator('metricGoals', cdk.listValidator(CfnExperiment_MetricGoalObjectPropertyValidator))(properties.metricGoals));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('onlineAbConfig', cdk.requiredValidator)(properties.onlineAbConfig));
    errors.collect(cdk.propertyValidator('onlineAbConfig', CfnExperiment_OnlineAbConfigObjectPropertyValidator)(properties.onlineAbConfig));
    errors.collect(cdk.propertyValidator('project', cdk.requiredValidator)(properties.project));
    errors.collect(cdk.propertyValidator('project', cdk.validateString)(properties.project));
    errors.collect(cdk.propertyValidator('randomizationSalt', cdk.validateString)(properties.randomizationSalt));
    errors.collect(cdk.propertyValidator('samplingRate', cdk.validateNumber)(properties.samplingRate));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('treatments', cdk.requiredValidator)(properties.treatments));
    errors.collect(cdk.propertyValidator('treatments', cdk.listValidator(CfnExperiment_TreatmentObjectPropertyValidator))(properties.treatments));
    return errors.wrap('supplied properties not correct for "CfnExperimentProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Experiment` resource
 *
 * @param properties - the TypeScript properties of a `CfnExperimentProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Experiment` resource.
 */
// @ts-ignore TS6133
function cfnExperimentPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnExperimentPropsValidator(properties).assertSuccess();
    return {
        MetricGoals: cdk.listMapper(cfnExperimentMetricGoalObjectPropertyToCloudFormation)(properties.metricGoals),
        Name: cdk.stringToCloudFormation(properties.name),
        OnlineAbConfig: cfnExperimentOnlineAbConfigObjectPropertyToCloudFormation(properties.onlineAbConfig),
        Project: cdk.stringToCloudFormation(properties.project),
        Treatments: cdk.listMapper(cfnExperimentTreatmentObjectPropertyToCloudFormation)(properties.treatments),
        Description: cdk.stringToCloudFormation(properties.description),
        RandomizationSalt: cdk.stringToCloudFormation(properties.randomizationSalt),
        SamplingRate: cdk.numberToCloudFormation(properties.samplingRate),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnExperimentPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnExperimentProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnExperimentProps>();
    ret.addPropertyResult('metricGoals', 'MetricGoals', cfn_parse.FromCloudFormation.getArray(CfnExperimentMetricGoalObjectPropertyFromCloudFormation)(properties.MetricGoals));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('onlineAbConfig', 'OnlineAbConfig', CfnExperimentOnlineAbConfigObjectPropertyFromCloudFormation(properties.OnlineAbConfig));
    ret.addPropertyResult('project', 'Project', cfn_parse.FromCloudFormation.getString(properties.Project));
    ret.addPropertyResult('treatments', 'Treatments', cfn_parse.FromCloudFormation.getArray(CfnExperimentTreatmentObjectPropertyFromCloudFormation)(properties.Treatments));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('randomizationSalt', 'RandomizationSalt', properties.RandomizationSalt != null ? cfn_parse.FromCloudFormation.getString(properties.RandomizationSalt) : undefined);
    ret.addPropertyResult('samplingRate', 'SamplingRate', properties.SamplingRate != null ? cfn_parse.FromCloudFormation.getNumber(properties.SamplingRate) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Evidently::Experiment`
 *
 * Creates or updates an Evidently *experiment* . Before you create an experiment, you must create the feature to use for the experiment.
 *
 * An experiment helps you make feature design decisions based on evidence and data. An experiment can test as many as five variations at once. Evidently collects experiment data and analyzes it by statistical methods, and provides clear recommendations about which variations perform better.
 *
 * @cloudformationResource AWS::Evidently::Experiment
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html
 */
export class CfnExperiment extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Evidently::Experiment";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnExperiment {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnExperimentPropsFromCloudFormation(resourceProperties);
        const ret = new CfnExperiment(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the experiment. For example, `arn:aws:evidently:us-west-2:0123455678912:project/myProject/experiment/myExperiment`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * An array of structures that defines the metrics used for the experiment, and whether a higher or lower value for each metric is the goal. You can use up to three metrics in an experiment.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-metricgoals
     */
    public metricGoals: Array<CfnExperiment.MetricGoalObjectProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A name for the new experiment.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-name
     */
    public name: string;

    /**
     * A structure that contains the configuration of which variation to use as the "control" version. The "control" version is used for comparison with other variations. This structure also specifies how much experiment traffic is allocated to each variation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-onlineabconfig
     */
    public onlineAbConfig: CfnExperiment.OnlineAbConfigObjectProperty | cdk.IResolvable;

    /**
     * The name or the ARN of the project where this experiment is to be created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-project
     */
    public project: string;

    /**
     * An array of structures that describe the configuration of each feature variation used in the experiment.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-treatments
     */
    public treatments: Array<CfnExperiment.TreatmentObjectProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * An optional description of the experiment.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-description
     */
    public description: string | undefined;

    /**
     * When Evidently assigns a particular user session to an experiment, it must use a randomization ID to determine which variation the user session is served. This randomization ID is a combination of the entity ID and `randomizationSalt` . If you omit `randomizationSalt` , Evidently uses the experiment name as the `randomizationSalt` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-randomizationsalt
     */
    public randomizationSalt: string | undefined;

    /**
     * The portion of the available audience that you want to allocate to this experiment, in thousandths of a percent. The available audience is the total audience minus the audience that you have allocated to overrides or current launches of this feature.
     *
     * This is represented in thousandths of a percent. For example, specify 10,000 to allocate 10% of the available audience.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-samplingrate
     */
    public samplingRate: number | undefined;

    /**
     * Assigns one or more tags (key-value pairs) to the experiment.
     *
     * Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.
     *
     * Tags don't have any semantic meaning to AWS and are interpreted strictly as strings of characters.
     *
     * You can associate as many as 50 tags with an experiment.
     *
     * For more information, see [Tagging AWS resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-experiment.html#cfn-evidently-experiment-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Evidently::Experiment`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnExperimentProps) {
        super(scope, id, { type: CfnExperiment.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'metricGoals', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'onlineAbConfig', this);
        cdk.requireProperty(props, 'project', this);
        cdk.requireProperty(props, 'treatments', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.metricGoals = props.metricGoals;
        this.name = props.name;
        this.onlineAbConfig = props.onlineAbConfig;
        this.project = props.project;
        this.treatments = props.treatments;
        this.description = props.description;
        this.randomizationSalt = props.randomizationSalt;
        this.samplingRate = props.samplingRate;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Evidently::Experiment", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnExperiment.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            metricGoals: this.metricGoals,
            name: this.name,
            onlineAbConfig: this.onlineAbConfig,
            project: this.project,
            treatments: this.treatments,
            description: this.description,
            randomizationSalt: this.randomizationSalt,
            samplingRate: this.samplingRate,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnExperimentPropsToCloudFormation(props);
    }
}

export namespace CfnExperiment {
    /**
     * Use this structure to tell Evidently whether higher or lower values are desired for a metric that is used in an experiment.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-metricgoalobject.html
     */
    export interface MetricGoalObjectProperty {
        /**
         * `INCREASE` means that a variation with a higher number for this metric is performing better.
         *
         * `DECREASE` means that a variation with a lower number for this metric is performing better.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-metricgoalobject.html#cfn-evidently-experiment-metricgoalobject-desiredchange
         */
        readonly desiredChange: string;
        /**
         * The entity, such as a user or session, that does an action that causes a metric value to be recorded. An example is `userDetails.userID` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-metricgoalobject.html#cfn-evidently-experiment-metricgoalobject-entityidkey
         */
        readonly entityIdKey: string;
        /**
         * The EventBridge event pattern that defines how the metric is recorded.
         *
         * For more information about EventBridge event patterns, see [Amazon EventBridge event patterns](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-metricgoalobject.html#cfn-evidently-experiment-metricgoalobject-eventpattern
         */
        readonly eventPattern: string;
        /**
         * A name for the metric. It can include up to 255 characters.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-metricgoalobject.html#cfn-evidently-experiment-metricgoalobject-metricname
         */
        readonly metricName: string;
        /**
         * A label for the units that the metric is measuring.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-metricgoalobject.html#cfn-evidently-experiment-metricgoalobject-unitlabel
         */
        readonly unitLabel?: string;
        /**
         * The JSON path to reference the numerical metric value in the event.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-metricgoalobject.html#cfn-evidently-experiment-metricgoalobject-valuekey
         */
        readonly valueKey: string;
    }
}

/**
 * Determine whether the given properties match those of a `MetricGoalObjectProperty`
 *
 * @param properties - the TypeScript properties of a `MetricGoalObjectProperty`
 *
 * @returns the result of the validation.
 */
function CfnExperiment_MetricGoalObjectPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('desiredChange', cdk.requiredValidator)(properties.desiredChange));
    errors.collect(cdk.propertyValidator('desiredChange', cdk.validateString)(properties.desiredChange));
    errors.collect(cdk.propertyValidator('entityIdKey', cdk.requiredValidator)(properties.entityIdKey));
    errors.collect(cdk.propertyValidator('entityIdKey', cdk.validateString)(properties.entityIdKey));
    errors.collect(cdk.propertyValidator('eventPattern', cdk.requiredValidator)(properties.eventPattern));
    errors.collect(cdk.propertyValidator('eventPattern', cdk.validateString)(properties.eventPattern));
    errors.collect(cdk.propertyValidator('metricName', cdk.requiredValidator)(properties.metricName));
    errors.collect(cdk.propertyValidator('metricName', cdk.validateString)(properties.metricName));
    errors.collect(cdk.propertyValidator('unitLabel', cdk.validateString)(properties.unitLabel));
    errors.collect(cdk.propertyValidator('valueKey', cdk.requiredValidator)(properties.valueKey));
    errors.collect(cdk.propertyValidator('valueKey', cdk.validateString)(properties.valueKey));
    return errors.wrap('supplied properties not correct for "MetricGoalObjectProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Experiment.MetricGoalObject` resource
 *
 * @param properties - the TypeScript properties of a `MetricGoalObjectProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Experiment.MetricGoalObject` resource.
 */
// @ts-ignore TS6133
function cfnExperimentMetricGoalObjectPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnExperiment_MetricGoalObjectPropertyValidator(properties).assertSuccess();
    return {
        DesiredChange: cdk.stringToCloudFormation(properties.desiredChange),
        EntityIdKey: cdk.stringToCloudFormation(properties.entityIdKey),
        EventPattern: cdk.stringToCloudFormation(properties.eventPattern),
        MetricName: cdk.stringToCloudFormation(properties.metricName),
        UnitLabel: cdk.stringToCloudFormation(properties.unitLabel),
        ValueKey: cdk.stringToCloudFormation(properties.valueKey),
    };
}

// @ts-ignore TS6133
function CfnExperimentMetricGoalObjectPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnExperiment.MetricGoalObjectProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnExperiment.MetricGoalObjectProperty>();
    ret.addPropertyResult('desiredChange', 'DesiredChange', cfn_parse.FromCloudFormation.getString(properties.DesiredChange));
    ret.addPropertyResult('entityIdKey', 'EntityIdKey', cfn_parse.FromCloudFormation.getString(properties.EntityIdKey));
    ret.addPropertyResult('eventPattern', 'EventPattern', cfn_parse.FromCloudFormation.getString(properties.EventPattern));
    ret.addPropertyResult('metricName', 'MetricName', cfn_parse.FromCloudFormation.getString(properties.MetricName));
    ret.addPropertyResult('unitLabel', 'UnitLabel', properties.UnitLabel != null ? cfn_parse.FromCloudFormation.getString(properties.UnitLabel) : undefined);
    ret.addPropertyResult('valueKey', 'ValueKey', cfn_parse.FromCloudFormation.getString(properties.ValueKey));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnExperiment {
    /**
     * A structure that contains the configuration of which variation to use as the "control" version. The "control" version is used for comparison with other variations. This structure also specifies how much experiment traffic is allocated to each variation.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-onlineabconfigobject.html
     */
    export interface OnlineAbConfigObjectProperty {
        /**
         * The name of the variation that is to be the default variation that the other variations are compared to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-onlineabconfigobject.html#cfn-evidently-experiment-onlineabconfigobject-controltreatmentname
         */
        readonly controlTreatmentName?: string;
        /**
         * A set of key-value pairs. The keys are treatment names, and the values are the portion of experiment traffic to be assigned to that treatment. Specify the traffic portion in thousandths of a percent, so 20,000 for a variation would allocate 20% of the experiment traffic to that variation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-onlineabconfigobject.html#cfn-evidently-experiment-onlineabconfigobject-treatmentweights
         */
        readonly treatmentWeights?: Array<CfnExperiment.TreatmentToWeightProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `OnlineAbConfigObjectProperty`
 *
 * @param properties - the TypeScript properties of a `OnlineAbConfigObjectProperty`
 *
 * @returns the result of the validation.
 */
function CfnExperiment_OnlineAbConfigObjectPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('controlTreatmentName', cdk.validateString)(properties.controlTreatmentName));
    errors.collect(cdk.propertyValidator('treatmentWeights', cdk.listValidator(CfnExperiment_TreatmentToWeightPropertyValidator))(properties.treatmentWeights));
    return errors.wrap('supplied properties not correct for "OnlineAbConfigObjectProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Experiment.OnlineAbConfigObject` resource
 *
 * @param properties - the TypeScript properties of a `OnlineAbConfigObjectProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Experiment.OnlineAbConfigObject` resource.
 */
// @ts-ignore TS6133
function cfnExperimentOnlineAbConfigObjectPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnExperiment_OnlineAbConfigObjectPropertyValidator(properties).assertSuccess();
    return {
        ControlTreatmentName: cdk.stringToCloudFormation(properties.controlTreatmentName),
        TreatmentWeights: cdk.listMapper(cfnExperimentTreatmentToWeightPropertyToCloudFormation)(properties.treatmentWeights),
    };
}

// @ts-ignore TS6133
function CfnExperimentOnlineAbConfigObjectPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnExperiment.OnlineAbConfigObjectProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnExperiment.OnlineAbConfigObjectProperty>();
    ret.addPropertyResult('controlTreatmentName', 'ControlTreatmentName', properties.ControlTreatmentName != null ? cfn_parse.FromCloudFormation.getString(properties.ControlTreatmentName) : undefined);
    ret.addPropertyResult('treatmentWeights', 'TreatmentWeights', properties.TreatmentWeights != null ? cfn_parse.FromCloudFormation.getArray(CfnExperimentTreatmentToWeightPropertyFromCloudFormation)(properties.TreatmentWeights) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnExperiment {
    /**
     * A structure that defines one treatment in an experiment. A treatment is a variation of the feature that you are including in the experiment.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-treatmentobject.html
     */
    export interface TreatmentObjectProperty {
        /**
         * The description of the treatment.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-treatmentobject.html#cfn-evidently-experiment-treatmentobject-description
         */
        readonly description?: string;
        /**
         * The name of the feature for this experiment.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-treatmentobject.html#cfn-evidently-experiment-treatmentobject-feature
         */
        readonly feature: string;
        /**
         * A name for this treatment. It can include up to 127 characters.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-treatmentobject.html#cfn-evidently-experiment-treatmentobject-treatmentname
         */
        readonly treatmentName: string;
        /**
         * The name of the variation to use for this treatment.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-treatmentobject.html#cfn-evidently-experiment-treatmentobject-variation
         */
        readonly variation: string;
    }
}

/**
 * Determine whether the given properties match those of a `TreatmentObjectProperty`
 *
 * @param properties - the TypeScript properties of a `TreatmentObjectProperty`
 *
 * @returns the result of the validation.
 */
function CfnExperiment_TreatmentObjectPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('feature', cdk.requiredValidator)(properties.feature));
    errors.collect(cdk.propertyValidator('feature', cdk.validateString)(properties.feature));
    errors.collect(cdk.propertyValidator('treatmentName', cdk.requiredValidator)(properties.treatmentName));
    errors.collect(cdk.propertyValidator('treatmentName', cdk.validateString)(properties.treatmentName));
    errors.collect(cdk.propertyValidator('variation', cdk.requiredValidator)(properties.variation));
    errors.collect(cdk.propertyValidator('variation', cdk.validateString)(properties.variation));
    return errors.wrap('supplied properties not correct for "TreatmentObjectProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Experiment.TreatmentObject` resource
 *
 * @param properties - the TypeScript properties of a `TreatmentObjectProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Experiment.TreatmentObject` resource.
 */
// @ts-ignore TS6133
function cfnExperimentTreatmentObjectPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnExperiment_TreatmentObjectPropertyValidator(properties).assertSuccess();
    return {
        Description: cdk.stringToCloudFormation(properties.description),
        Feature: cdk.stringToCloudFormation(properties.feature),
        TreatmentName: cdk.stringToCloudFormation(properties.treatmentName),
        Variation: cdk.stringToCloudFormation(properties.variation),
    };
}

// @ts-ignore TS6133
function CfnExperimentTreatmentObjectPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnExperiment.TreatmentObjectProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnExperiment.TreatmentObjectProperty>();
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('feature', 'Feature', cfn_parse.FromCloudFormation.getString(properties.Feature));
    ret.addPropertyResult('treatmentName', 'TreatmentName', cfn_parse.FromCloudFormation.getString(properties.TreatmentName));
    ret.addPropertyResult('variation', 'Variation', cfn_parse.FromCloudFormation.getString(properties.Variation));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnExperiment {
    /**
     * This structure defines how much experiment traffic to allocate to one treatment used in the experiment.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-treatmenttoweight.html
     */
    export interface TreatmentToWeightProperty {
        /**
         * The portion of experiment traffic to allocate to this treatment. Specify the traffic portion in thousandths of a percent, so 20,000 allocated to a treatment would allocate 20% of the experiment traffic to that treatment.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-treatmenttoweight.html#cfn-evidently-experiment-treatmenttoweight-splitweight
         */
        readonly splitWeight: number;
        /**
         * The name of the treatment.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-experiment-treatmenttoweight.html#cfn-evidently-experiment-treatmenttoweight-treatment
         */
        readonly treatment: string;
    }
}

/**
 * Determine whether the given properties match those of a `TreatmentToWeightProperty`
 *
 * @param properties - the TypeScript properties of a `TreatmentToWeightProperty`
 *
 * @returns the result of the validation.
 */
function CfnExperiment_TreatmentToWeightPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('splitWeight', cdk.requiredValidator)(properties.splitWeight));
    errors.collect(cdk.propertyValidator('splitWeight', cdk.validateNumber)(properties.splitWeight));
    errors.collect(cdk.propertyValidator('treatment', cdk.requiredValidator)(properties.treatment));
    errors.collect(cdk.propertyValidator('treatment', cdk.validateString)(properties.treatment));
    return errors.wrap('supplied properties not correct for "TreatmentToWeightProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Experiment.TreatmentToWeight` resource
 *
 * @param properties - the TypeScript properties of a `TreatmentToWeightProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Experiment.TreatmentToWeight` resource.
 */
// @ts-ignore TS6133
function cfnExperimentTreatmentToWeightPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnExperiment_TreatmentToWeightPropertyValidator(properties).assertSuccess();
    return {
        SplitWeight: cdk.numberToCloudFormation(properties.splitWeight),
        Treatment: cdk.stringToCloudFormation(properties.treatment),
    };
}

// @ts-ignore TS6133
function CfnExperimentTreatmentToWeightPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnExperiment.TreatmentToWeightProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnExperiment.TreatmentToWeightProperty>();
    ret.addPropertyResult('splitWeight', 'SplitWeight', cfn_parse.FromCloudFormation.getNumber(properties.SplitWeight));
    ret.addPropertyResult('treatment', 'Treatment', cfn_parse.FromCloudFormation.getString(properties.Treatment));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnFeature`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html
 */
export interface CfnFeatureProps {

    /**
     * The name for the feature. It can include up to 127 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-name
     */
    readonly name: string;

    /**
     * The name or ARN of the project that is to contain the new feature.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-project
     */
    readonly project: string;

    /**
     * An array of structures that contain the configuration of the feature's different variations.
     *
     * Each `VariationObject` in the `Variations` array for a feature must have the same type of value ( `BooleanValue` , `DoubleValue` , `LongValue` or `StringValue` ).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-variations
     */
    readonly variations: Array<CfnFeature.VariationObjectProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The name of the variation to use as the default variation. The default variation is served to users who are not allocated to any ongoing launches or experiments of this feature.
     *
     * This variation must also be listed in the `Variations` structure.
     *
     * If you omit `DefaultVariation` , the first variation listed in the `Variations` structure is used as the default variation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-defaultvariation
     */
    readonly defaultVariation?: string;

    /**
     * An optional description of the feature.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-description
     */
    readonly description?: string;

    /**
     * Specify users that should always be served a specific variation of a feature. Each user is specified by a key-value pair . For each key, specify a user by entering their user ID, account ID, or some other identifier. For the value, specify the name of the variation that they are to be served.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-entityoverrides
     */
    readonly entityOverrides?: Array<CfnFeature.EntityOverrideProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Specify `ALL_RULES` to activate the traffic allocation specified by any ongoing launches or experiments. Specify `DEFAULT_VARIATION` to serve the default variation to all users instead.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-evaluationstrategy
     */
    readonly evaluationStrategy?: string;

    /**
     * Assigns one or more tags (key-value pairs) to the feature.
     *
     * Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.
     *
     * Tags don't have any semantic meaning to AWS and are interpreted strictly as strings of characters.
     *
     * You can associate as many as 50 tags with a feature.
     *
     * For more information, see [Tagging AWS resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnFeatureProps`
 *
 * @param properties - the TypeScript properties of a `CfnFeatureProps`
 *
 * @returns the result of the validation.
 */
function CfnFeaturePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('defaultVariation', cdk.validateString)(properties.defaultVariation));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('entityOverrides', cdk.listValidator(CfnFeature_EntityOverridePropertyValidator))(properties.entityOverrides));
    errors.collect(cdk.propertyValidator('evaluationStrategy', cdk.validateString)(properties.evaluationStrategy));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('project', cdk.requiredValidator)(properties.project));
    errors.collect(cdk.propertyValidator('project', cdk.validateString)(properties.project));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('variations', cdk.requiredValidator)(properties.variations));
    errors.collect(cdk.propertyValidator('variations', cdk.listValidator(CfnFeature_VariationObjectPropertyValidator))(properties.variations));
    return errors.wrap('supplied properties not correct for "CfnFeatureProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Feature` resource
 *
 * @param properties - the TypeScript properties of a `CfnFeatureProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Feature` resource.
 */
// @ts-ignore TS6133
function cfnFeaturePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFeaturePropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Project: cdk.stringToCloudFormation(properties.project),
        Variations: cdk.listMapper(cfnFeatureVariationObjectPropertyToCloudFormation)(properties.variations),
        DefaultVariation: cdk.stringToCloudFormation(properties.defaultVariation),
        Description: cdk.stringToCloudFormation(properties.description),
        EntityOverrides: cdk.listMapper(cfnFeatureEntityOverridePropertyToCloudFormation)(properties.entityOverrides),
        EvaluationStrategy: cdk.stringToCloudFormation(properties.evaluationStrategy),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnFeaturePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFeatureProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFeatureProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('project', 'Project', cfn_parse.FromCloudFormation.getString(properties.Project));
    ret.addPropertyResult('variations', 'Variations', cfn_parse.FromCloudFormation.getArray(CfnFeatureVariationObjectPropertyFromCloudFormation)(properties.Variations));
    ret.addPropertyResult('defaultVariation', 'DefaultVariation', properties.DefaultVariation != null ? cfn_parse.FromCloudFormation.getString(properties.DefaultVariation) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('entityOverrides', 'EntityOverrides', properties.EntityOverrides != null ? cfn_parse.FromCloudFormation.getArray(CfnFeatureEntityOverridePropertyFromCloudFormation)(properties.EntityOverrides) : undefined);
    ret.addPropertyResult('evaluationStrategy', 'EvaluationStrategy', properties.EvaluationStrategy != null ? cfn_parse.FromCloudFormation.getString(properties.EvaluationStrategy) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Evidently::Feature`
 *
 * Creates or updates an Evidently *feature* that you want to launch or test. You can define up to five variations of a feature, and use these variations in your launches and experiments. A feature must be created in a project. For information about creating a project, see [CreateProject](https://docs.aws.amazon.com/cloudwatchevidently/latest/APIReference/API_CreateProject.html) .
 *
 * @cloudformationResource AWS::Evidently::Feature
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html
 */
export class CfnFeature extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Evidently::Feature";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnFeature {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnFeaturePropsFromCloudFormation(resourceProperties);
        const ret = new CfnFeature(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the feature. For example, `arn:aws:evidently:us-west-2:0123455678912:project/myProject/feature/myFeature` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The name for the feature. It can include up to 127 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-name
     */
    public name: string;

    /**
     * The name or ARN of the project that is to contain the new feature.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-project
     */
    public project: string;

    /**
     * An array of structures that contain the configuration of the feature's different variations.
     *
     * Each `VariationObject` in the `Variations` array for a feature must have the same type of value ( `BooleanValue` , `DoubleValue` , `LongValue` or `StringValue` ).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-variations
     */
    public variations: Array<CfnFeature.VariationObjectProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The name of the variation to use as the default variation. The default variation is served to users who are not allocated to any ongoing launches or experiments of this feature.
     *
     * This variation must also be listed in the `Variations` structure.
     *
     * If you omit `DefaultVariation` , the first variation listed in the `Variations` structure is used as the default variation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-defaultvariation
     */
    public defaultVariation: string | undefined;

    /**
     * An optional description of the feature.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-description
     */
    public description: string | undefined;

    /**
     * Specify users that should always be served a specific variation of a feature. Each user is specified by a key-value pair . For each key, specify a user by entering their user ID, account ID, or some other identifier. For the value, specify the name of the variation that they are to be served.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-entityoverrides
     */
    public entityOverrides: Array<CfnFeature.EntityOverrideProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Specify `ALL_RULES` to activate the traffic allocation specified by any ongoing launches or experiments. Specify `DEFAULT_VARIATION` to serve the default variation to all users instead.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-evaluationstrategy
     */
    public evaluationStrategy: string | undefined;

    /**
     * Assigns one or more tags (key-value pairs) to the feature.
     *
     * Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.
     *
     * Tags don't have any semantic meaning to AWS and are interpreted strictly as strings of characters.
     *
     * You can associate as many as 50 tags with a feature.
     *
     * For more information, see [Tagging AWS resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-feature.html#cfn-evidently-feature-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Evidently::Feature`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnFeatureProps) {
        super(scope, id, { type: CfnFeature.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'project', this);
        cdk.requireProperty(props, 'variations', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.name = props.name;
        this.project = props.project;
        this.variations = props.variations;
        this.defaultVariation = props.defaultVariation;
        this.description = props.description;
        this.entityOverrides = props.entityOverrides;
        this.evaluationStrategy = props.evaluationStrategy;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Evidently::Feature", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnFeature.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            project: this.project,
            variations: this.variations,
            defaultVariation: this.defaultVariation,
            description: this.description,
            entityOverrides: this.entityOverrides,
            evaluationStrategy: this.evaluationStrategy,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnFeaturePropsToCloudFormation(props);
    }
}

export namespace CfnFeature {
    /**
     * A set of key-value pairs that specify users who should always be served a specific variation of a feature. Each key specifies a user using their user ID, account ID, or some other identifier. The value specifies the name of the variation that the user is to be served.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-feature-entityoverride.html
     */
    export interface EntityOverrideProperty {
        /**
         * The entity ID to be served the variation specified in `Variation` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-feature-entityoverride.html#cfn-evidently-feature-entityoverride-entityid
         */
        readonly entityId?: string;
        /**
         * The name of the variation to serve to the user session that matches the `EntityId` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-feature-entityoverride.html#cfn-evidently-feature-entityoverride-variation
         */
        readonly variation?: string;
    }
}

/**
 * Determine whether the given properties match those of a `EntityOverrideProperty`
 *
 * @param properties - the TypeScript properties of a `EntityOverrideProperty`
 *
 * @returns the result of the validation.
 */
function CfnFeature_EntityOverridePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('entityId', cdk.validateString)(properties.entityId));
    errors.collect(cdk.propertyValidator('variation', cdk.validateString)(properties.variation));
    return errors.wrap('supplied properties not correct for "EntityOverrideProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Feature.EntityOverride` resource
 *
 * @param properties - the TypeScript properties of a `EntityOverrideProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Feature.EntityOverride` resource.
 */
// @ts-ignore TS6133
function cfnFeatureEntityOverridePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFeature_EntityOverridePropertyValidator(properties).assertSuccess();
    return {
        EntityId: cdk.stringToCloudFormation(properties.entityId),
        Variation: cdk.stringToCloudFormation(properties.variation),
    };
}

// @ts-ignore TS6133
function CfnFeatureEntityOverridePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFeature.EntityOverrideProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFeature.EntityOverrideProperty>();
    ret.addPropertyResult('entityId', 'EntityId', properties.EntityId != null ? cfn_parse.FromCloudFormation.getString(properties.EntityId) : undefined);
    ret.addPropertyResult('variation', 'Variation', properties.Variation != null ? cfn_parse.FromCloudFormation.getString(properties.Variation) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFeature {
    /**
     * This structure contains the name and variation value of one variation of a feature. It can contain only one of the following parameters: `BooleanValue` , `DoubleValue` , `LongValue` or `StringValue` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-feature-variationobject.html
     */
    export interface VariationObjectProperty {
        /**
         * The value assigned to this variation, if the variation type is boolean.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-feature-variationobject.html#cfn-evidently-feature-variationobject-booleanvalue
         */
        readonly booleanValue?: boolean | cdk.IResolvable;
        /**
         * The value assigned to this variation, if the variation type is a double.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-feature-variationobject.html#cfn-evidently-feature-variationobject-doublevalue
         */
        readonly doubleValue?: number;
        /**
         * The value assigned to this variation, if the variation type is a long.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-feature-variationobject.html#cfn-evidently-feature-variationobject-longvalue
         */
        readonly longValue?: number;
        /**
         * The value assigned to this variation, if the variation type is a string.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-feature-variationobject.html#cfn-evidently-feature-variationobject-stringvalue
         */
        readonly stringValue?: string;
        /**
         * A name for the variation. It can include up to 127 characters.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-feature-variationobject.html#cfn-evidently-feature-variationobject-variationname
         */
        readonly variationName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `VariationObjectProperty`
 *
 * @param properties - the TypeScript properties of a `VariationObjectProperty`
 *
 * @returns the result of the validation.
 */
function CfnFeature_VariationObjectPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('booleanValue', cdk.validateBoolean)(properties.booleanValue));
    errors.collect(cdk.propertyValidator('doubleValue', cdk.validateNumber)(properties.doubleValue));
    errors.collect(cdk.propertyValidator('longValue', cdk.validateNumber)(properties.longValue));
    errors.collect(cdk.propertyValidator('stringValue', cdk.validateString)(properties.stringValue));
    errors.collect(cdk.propertyValidator('variationName', cdk.validateString)(properties.variationName));
    return errors.wrap('supplied properties not correct for "VariationObjectProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Feature.VariationObject` resource
 *
 * @param properties - the TypeScript properties of a `VariationObjectProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Feature.VariationObject` resource.
 */
// @ts-ignore TS6133
function cfnFeatureVariationObjectPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFeature_VariationObjectPropertyValidator(properties).assertSuccess();
    return {
        BooleanValue: cdk.booleanToCloudFormation(properties.booleanValue),
        DoubleValue: cdk.numberToCloudFormation(properties.doubleValue),
        LongValue: cdk.numberToCloudFormation(properties.longValue),
        StringValue: cdk.stringToCloudFormation(properties.stringValue),
        VariationName: cdk.stringToCloudFormation(properties.variationName),
    };
}

// @ts-ignore TS6133
function CfnFeatureVariationObjectPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFeature.VariationObjectProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFeature.VariationObjectProperty>();
    ret.addPropertyResult('booleanValue', 'BooleanValue', properties.BooleanValue != null ? cfn_parse.FromCloudFormation.getBoolean(properties.BooleanValue) : undefined);
    ret.addPropertyResult('doubleValue', 'DoubleValue', properties.DoubleValue != null ? cfn_parse.FromCloudFormation.getNumber(properties.DoubleValue) : undefined);
    ret.addPropertyResult('longValue', 'LongValue', properties.LongValue != null ? cfn_parse.FromCloudFormation.getNumber(properties.LongValue) : undefined);
    ret.addPropertyResult('stringValue', 'StringValue', properties.StringValue != null ? cfn_parse.FromCloudFormation.getString(properties.StringValue) : undefined);
    ret.addPropertyResult('variationName', 'VariationName', properties.VariationName != null ? cfn_parse.FromCloudFormation.getString(properties.VariationName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnLaunch`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html
 */
export interface CfnLaunchProps {

    /**
     * An array of structures that contains the feature and variations that are to be used for the launch. You can up to five launch groups in a launch.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-groups
     */
    readonly groups: Array<CfnLaunch.LaunchGroupObjectProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The name for the launch. It can include up to 127 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-name
     */
    readonly name: string;

    /**
     * The name or ARN of the project that you want to create the launch in.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-project
     */
    readonly project: string;

    /**
     * An array of structures that define the traffic allocation percentages among the feature variations during each step of the launch.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-scheduledsplitsconfig
     */
    readonly scheduledSplitsConfig: Array<CfnLaunch.StepConfigProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * An optional description for the launch.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-description
     */
    readonly description?: string;

    /**
     * An array of structures that define the metrics that will be used to monitor the launch performance. You can have up to three metric monitors in the array.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-metricmonitors
     */
    readonly metricMonitors?: Array<CfnLaunch.MetricDefinitionObjectProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * When Evidently assigns a particular user session to a launch, it must use a randomization ID to determine which variation the user session is served. This randomization ID is a combination of the entity ID and `randomizationSalt` . If you omit `randomizationSalt` , Evidently uses the launch name as the `randomizationsSalt` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-randomizationsalt
     */
    readonly randomizationSalt?: string;

    /**
     * Assigns one or more tags (key-value pairs) to the launch.
     *
     * Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.
     *
     * Tags don't have any semantic meaning to AWS and are interpreted strictly as strings of characters.
     *
     * You can associate as many as 50 tags with a launch.
     *
     * For more information, see [Tagging AWS resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnLaunchProps`
 *
 * @param properties - the TypeScript properties of a `CfnLaunchProps`
 *
 * @returns the result of the validation.
 */
function CfnLaunchPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('groups', cdk.requiredValidator)(properties.groups));
    errors.collect(cdk.propertyValidator('groups', cdk.listValidator(CfnLaunch_LaunchGroupObjectPropertyValidator))(properties.groups));
    errors.collect(cdk.propertyValidator('metricMonitors', cdk.listValidator(CfnLaunch_MetricDefinitionObjectPropertyValidator))(properties.metricMonitors));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('project', cdk.requiredValidator)(properties.project));
    errors.collect(cdk.propertyValidator('project', cdk.validateString)(properties.project));
    errors.collect(cdk.propertyValidator('randomizationSalt', cdk.validateString)(properties.randomizationSalt));
    errors.collect(cdk.propertyValidator('scheduledSplitsConfig', cdk.requiredValidator)(properties.scheduledSplitsConfig));
    errors.collect(cdk.propertyValidator('scheduledSplitsConfig', cdk.listValidator(CfnLaunch_StepConfigPropertyValidator))(properties.scheduledSplitsConfig));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnLaunchProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Launch` resource
 *
 * @param properties - the TypeScript properties of a `CfnLaunchProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Launch` resource.
 */
// @ts-ignore TS6133
function cfnLaunchPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnLaunchPropsValidator(properties).assertSuccess();
    return {
        Groups: cdk.listMapper(cfnLaunchLaunchGroupObjectPropertyToCloudFormation)(properties.groups),
        Name: cdk.stringToCloudFormation(properties.name),
        Project: cdk.stringToCloudFormation(properties.project),
        ScheduledSplitsConfig: cdk.listMapper(cfnLaunchStepConfigPropertyToCloudFormation)(properties.scheduledSplitsConfig),
        Description: cdk.stringToCloudFormation(properties.description),
        MetricMonitors: cdk.listMapper(cfnLaunchMetricDefinitionObjectPropertyToCloudFormation)(properties.metricMonitors),
        RandomizationSalt: cdk.stringToCloudFormation(properties.randomizationSalt),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnLaunchPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnLaunchProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnLaunchProps>();
    ret.addPropertyResult('groups', 'Groups', cfn_parse.FromCloudFormation.getArray(CfnLaunchLaunchGroupObjectPropertyFromCloudFormation)(properties.Groups));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('project', 'Project', cfn_parse.FromCloudFormation.getString(properties.Project));
    ret.addPropertyResult('scheduledSplitsConfig', 'ScheduledSplitsConfig', cfn_parse.FromCloudFormation.getArray(CfnLaunchStepConfigPropertyFromCloudFormation)(properties.ScheduledSplitsConfig));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('metricMonitors', 'MetricMonitors', properties.MetricMonitors != null ? cfn_parse.FromCloudFormation.getArray(CfnLaunchMetricDefinitionObjectPropertyFromCloudFormation)(properties.MetricMonitors) : undefined);
    ret.addPropertyResult('randomizationSalt', 'RandomizationSalt', properties.RandomizationSalt != null ? cfn_parse.FromCloudFormation.getString(properties.RandomizationSalt) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Evidently::Launch`
 *
 * Creates or updates a *launch* of a given feature. Before you create a launch, you must create the feature to use for the launch.
 *
 * You can use a launch to safely validate new features by serving them to a specified percentage of your users while you roll out the feature. You can monitor the performance of the new feature to help you decide when to ramp up traffic to more users. This helps you reduce risk and identify unintended consequences before you fully launch the feature.
 *
 * @cloudformationResource AWS::Evidently::Launch
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html
 */
export class CfnLaunch extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Evidently::Launch";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnLaunch {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnLaunchPropsFromCloudFormation(resourceProperties);
        const ret = new CfnLaunch(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the launch. For example, `arn:aws:evidently:us-west-2:0123455678912:project/myProject/launch/myLaunch`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * An array of structures that contains the feature and variations that are to be used for the launch. You can up to five launch groups in a launch.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-groups
     */
    public groups: Array<CfnLaunch.LaunchGroupObjectProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The name for the launch. It can include up to 127 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-name
     */
    public name: string;

    /**
     * The name or ARN of the project that you want to create the launch in.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-project
     */
    public project: string;

    /**
     * An array of structures that define the traffic allocation percentages among the feature variations during each step of the launch.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-scheduledsplitsconfig
     */
    public scheduledSplitsConfig: Array<CfnLaunch.StepConfigProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * An optional description for the launch.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-description
     */
    public description: string | undefined;

    /**
     * An array of structures that define the metrics that will be used to monitor the launch performance. You can have up to three metric monitors in the array.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-metricmonitors
     */
    public metricMonitors: Array<CfnLaunch.MetricDefinitionObjectProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * When Evidently assigns a particular user session to a launch, it must use a randomization ID to determine which variation the user session is served. This randomization ID is a combination of the entity ID and `randomizationSalt` . If you omit `randomizationSalt` , Evidently uses the launch name as the `randomizationsSalt` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-randomizationsalt
     */
    public randomizationSalt: string | undefined;

    /**
     * Assigns one or more tags (key-value pairs) to the launch.
     *
     * Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.
     *
     * Tags don't have any semantic meaning to AWS and are interpreted strictly as strings of characters.
     *
     * You can associate as many as 50 tags with a launch.
     *
     * For more information, see [Tagging AWS resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-launch.html#cfn-evidently-launch-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Evidently::Launch`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnLaunchProps) {
        super(scope, id, { type: CfnLaunch.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'groups', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'project', this);
        cdk.requireProperty(props, 'scheduledSplitsConfig', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.groups = props.groups;
        this.name = props.name;
        this.project = props.project;
        this.scheduledSplitsConfig = props.scheduledSplitsConfig;
        this.description = props.description;
        this.metricMonitors = props.metricMonitors;
        this.randomizationSalt = props.randomizationSalt;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Evidently::Launch", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnLaunch.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            groups: this.groups,
            name: this.name,
            project: this.project,
            scheduledSplitsConfig: this.scheduledSplitsConfig,
            description: this.description,
            metricMonitors: this.metricMonitors,
            randomizationSalt: this.randomizationSalt,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnLaunchPropsToCloudFormation(props);
    }
}

export namespace CfnLaunch {
    /**
     * A structure containing the percentage of launch traffic to allocate to one launch group.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-grouptoweight.html
     */
    export interface GroupToWeightProperty {
        /**
         * The name of the launch group. It can include up to 127 characters.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-grouptoweight.html#cfn-evidently-launch-grouptoweight-groupname
         */
        readonly groupName: string;
        /**
         * The portion of launch traffic to allocate to this launch group.
         *
         * This is represented in thousandths of a percent. For example, specify 20,000 to allocate 20% of the launch audience to this launch group.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-grouptoweight.html#cfn-evidently-launch-grouptoweight-splitweight
         */
        readonly splitWeight: number;
    }
}

/**
 * Determine whether the given properties match those of a `GroupToWeightProperty`
 *
 * @param properties - the TypeScript properties of a `GroupToWeightProperty`
 *
 * @returns the result of the validation.
 */
function CfnLaunch_GroupToWeightPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('groupName', cdk.requiredValidator)(properties.groupName));
    errors.collect(cdk.propertyValidator('groupName', cdk.validateString)(properties.groupName));
    errors.collect(cdk.propertyValidator('splitWeight', cdk.requiredValidator)(properties.splitWeight));
    errors.collect(cdk.propertyValidator('splitWeight', cdk.validateNumber)(properties.splitWeight));
    return errors.wrap('supplied properties not correct for "GroupToWeightProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Launch.GroupToWeight` resource
 *
 * @param properties - the TypeScript properties of a `GroupToWeightProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Launch.GroupToWeight` resource.
 */
// @ts-ignore TS6133
function cfnLaunchGroupToWeightPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnLaunch_GroupToWeightPropertyValidator(properties).assertSuccess();
    return {
        GroupName: cdk.stringToCloudFormation(properties.groupName),
        SplitWeight: cdk.numberToCloudFormation(properties.splitWeight),
    };
}

// @ts-ignore TS6133
function CfnLaunchGroupToWeightPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnLaunch.GroupToWeightProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnLaunch.GroupToWeightProperty>();
    ret.addPropertyResult('groupName', 'GroupName', cfn_parse.FromCloudFormation.getString(properties.GroupName));
    ret.addPropertyResult('splitWeight', 'SplitWeight', cfn_parse.FromCloudFormation.getNumber(properties.SplitWeight));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnLaunch {
    /**
     * A structure that defines one launch group in a launch. A launch group is a variation of the feature that you are including in the launch.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-launchgroupobject.html
     */
    export interface LaunchGroupObjectProperty {
        /**
         * A description of the launch group.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-launchgroupobject.html#cfn-evidently-launch-launchgroupobject-description
         */
        readonly description?: string;
        /**
         * The feature that this launch is using.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-launchgroupobject.html#cfn-evidently-launch-launchgroupobject-feature
         */
        readonly feature: string;
        /**
         * A name for this launch group. It can include up to 127 characters.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-launchgroupobject.html#cfn-evidently-launch-launchgroupobject-groupname
         */
        readonly groupName: string;
        /**
         * The feature variation to use for this launch group.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-launchgroupobject.html#cfn-evidently-launch-launchgroupobject-variation
         */
        readonly variation: string;
    }
}

/**
 * Determine whether the given properties match those of a `LaunchGroupObjectProperty`
 *
 * @param properties - the TypeScript properties of a `LaunchGroupObjectProperty`
 *
 * @returns the result of the validation.
 */
function CfnLaunch_LaunchGroupObjectPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('feature', cdk.requiredValidator)(properties.feature));
    errors.collect(cdk.propertyValidator('feature', cdk.validateString)(properties.feature));
    errors.collect(cdk.propertyValidator('groupName', cdk.requiredValidator)(properties.groupName));
    errors.collect(cdk.propertyValidator('groupName', cdk.validateString)(properties.groupName));
    errors.collect(cdk.propertyValidator('variation', cdk.requiredValidator)(properties.variation));
    errors.collect(cdk.propertyValidator('variation', cdk.validateString)(properties.variation));
    return errors.wrap('supplied properties not correct for "LaunchGroupObjectProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Launch.LaunchGroupObject` resource
 *
 * @param properties - the TypeScript properties of a `LaunchGroupObjectProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Launch.LaunchGroupObject` resource.
 */
// @ts-ignore TS6133
function cfnLaunchLaunchGroupObjectPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnLaunch_LaunchGroupObjectPropertyValidator(properties).assertSuccess();
    return {
        Description: cdk.stringToCloudFormation(properties.description),
        Feature: cdk.stringToCloudFormation(properties.feature),
        GroupName: cdk.stringToCloudFormation(properties.groupName),
        Variation: cdk.stringToCloudFormation(properties.variation),
    };
}

// @ts-ignore TS6133
function CfnLaunchLaunchGroupObjectPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnLaunch.LaunchGroupObjectProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnLaunch.LaunchGroupObjectProperty>();
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('feature', 'Feature', cfn_parse.FromCloudFormation.getString(properties.Feature));
    ret.addPropertyResult('groupName', 'GroupName', cfn_parse.FromCloudFormation.getString(properties.GroupName));
    ret.addPropertyResult('variation', 'Variation', cfn_parse.FromCloudFormation.getString(properties.Variation));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnLaunch {
    /**
     * This structure defines a metric that you want to use to evaluate the variations during a launch or experiment.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-metricdefinitionobject.html
     */
    export interface MetricDefinitionObjectProperty {
        /**
         * The entity, such as a user or session, that does an action that causes a metric value to be recorded. An example is `userDetails.userID` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-metricdefinitionobject.html#cfn-evidently-launch-metricdefinitionobject-entityidkey
         */
        readonly entityIdKey: string;
        /**
         * The EventBridge event pattern that defines how the metric is recorded.
         *
         * For more information about EventBridge event patterns, see [Amazon EventBridge event patterns](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-metricdefinitionobject.html#cfn-evidently-launch-metricdefinitionobject-eventpattern
         */
        readonly eventPattern: string;
        /**
         * A name for the metric. It can include up to 255 characters.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-metricdefinitionobject.html#cfn-evidently-launch-metricdefinitionobject-metricname
         */
        readonly metricName: string;
        /**
         * A label for the units that the metric is measuring.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-metricdefinitionobject.html#cfn-evidently-launch-metricdefinitionobject-unitlabel
         */
        readonly unitLabel?: string;
        /**
         * The value that is tracked to produce the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-metricdefinitionobject.html#cfn-evidently-launch-metricdefinitionobject-valuekey
         */
        readonly valueKey: string;
    }
}

/**
 * Determine whether the given properties match those of a `MetricDefinitionObjectProperty`
 *
 * @param properties - the TypeScript properties of a `MetricDefinitionObjectProperty`
 *
 * @returns the result of the validation.
 */
function CfnLaunch_MetricDefinitionObjectPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('entityIdKey', cdk.requiredValidator)(properties.entityIdKey));
    errors.collect(cdk.propertyValidator('entityIdKey', cdk.validateString)(properties.entityIdKey));
    errors.collect(cdk.propertyValidator('eventPattern', cdk.requiredValidator)(properties.eventPattern));
    errors.collect(cdk.propertyValidator('eventPattern', cdk.validateString)(properties.eventPattern));
    errors.collect(cdk.propertyValidator('metricName', cdk.requiredValidator)(properties.metricName));
    errors.collect(cdk.propertyValidator('metricName', cdk.validateString)(properties.metricName));
    errors.collect(cdk.propertyValidator('unitLabel', cdk.validateString)(properties.unitLabel));
    errors.collect(cdk.propertyValidator('valueKey', cdk.requiredValidator)(properties.valueKey));
    errors.collect(cdk.propertyValidator('valueKey', cdk.validateString)(properties.valueKey));
    return errors.wrap('supplied properties not correct for "MetricDefinitionObjectProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Launch.MetricDefinitionObject` resource
 *
 * @param properties - the TypeScript properties of a `MetricDefinitionObjectProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Launch.MetricDefinitionObject` resource.
 */
// @ts-ignore TS6133
function cfnLaunchMetricDefinitionObjectPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnLaunch_MetricDefinitionObjectPropertyValidator(properties).assertSuccess();
    return {
        EntityIdKey: cdk.stringToCloudFormation(properties.entityIdKey),
        EventPattern: cdk.stringToCloudFormation(properties.eventPattern),
        MetricName: cdk.stringToCloudFormation(properties.metricName),
        UnitLabel: cdk.stringToCloudFormation(properties.unitLabel),
        ValueKey: cdk.stringToCloudFormation(properties.valueKey),
    };
}

// @ts-ignore TS6133
function CfnLaunchMetricDefinitionObjectPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnLaunch.MetricDefinitionObjectProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnLaunch.MetricDefinitionObjectProperty>();
    ret.addPropertyResult('entityIdKey', 'EntityIdKey', cfn_parse.FromCloudFormation.getString(properties.EntityIdKey));
    ret.addPropertyResult('eventPattern', 'EventPattern', cfn_parse.FromCloudFormation.getString(properties.EventPattern));
    ret.addPropertyResult('metricName', 'MetricName', cfn_parse.FromCloudFormation.getString(properties.MetricName));
    ret.addPropertyResult('unitLabel', 'UnitLabel', properties.UnitLabel != null ? cfn_parse.FromCloudFormation.getString(properties.UnitLabel) : undefined);
    ret.addPropertyResult('valueKey', 'ValueKey', cfn_parse.FromCloudFormation.getString(properties.ValueKey));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnLaunch {
    /**
     * A structure that defines when each step of the launch is to start, and how much launch traffic is to be allocated to each variation during each step.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-stepconfig.html
     */
    export interface StepConfigProperty {
        /**
         * An array of structures that define how much launch traffic to allocate to each launch group during this step of the launch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-stepconfig.html#cfn-evidently-launch-stepconfig-groupweights
         */
        readonly groupWeights: Array<CfnLaunch.GroupToWeightProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The date and time to start this step of the launch. Use UTC format, `yyyy-MM-ddTHH:mm:ssZ` . For example, `2025-11-25T23:59:59Z`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-launch-stepconfig.html#cfn-evidently-launch-stepconfig-starttime
         */
        readonly startTime: string;
    }
}

/**
 * Determine whether the given properties match those of a `StepConfigProperty`
 *
 * @param properties - the TypeScript properties of a `StepConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnLaunch_StepConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('groupWeights', cdk.requiredValidator)(properties.groupWeights));
    errors.collect(cdk.propertyValidator('groupWeights', cdk.listValidator(CfnLaunch_GroupToWeightPropertyValidator))(properties.groupWeights));
    errors.collect(cdk.propertyValidator('startTime', cdk.requiredValidator)(properties.startTime));
    errors.collect(cdk.propertyValidator('startTime', cdk.validateString)(properties.startTime));
    return errors.wrap('supplied properties not correct for "StepConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Launch.StepConfig` resource
 *
 * @param properties - the TypeScript properties of a `StepConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Launch.StepConfig` resource.
 */
// @ts-ignore TS6133
function cfnLaunchStepConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnLaunch_StepConfigPropertyValidator(properties).assertSuccess();
    return {
        GroupWeights: cdk.listMapper(cfnLaunchGroupToWeightPropertyToCloudFormation)(properties.groupWeights),
        StartTime: cdk.stringToCloudFormation(properties.startTime),
    };
}

// @ts-ignore TS6133
function CfnLaunchStepConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnLaunch.StepConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnLaunch.StepConfigProperty>();
    ret.addPropertyResult('groupWeights', 'GroupWeights', cfn_parse.FromCloudFormation.getArray(CfnLaunchGroupToWeightPropertyFromCloudFormation)(properties.GroupWeights));
    ret.addPropertyResult('startTime', 'StartTime', cfn_parse.FromCloudFormation.getString(properties.StartTime));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnProject`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-project.html
 */
export interface CfnProjectProps {

    /**
     * The name for the project. It can include up to 127 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-project.html#cfn-evidently-project-name
     */
    readonly name: string;

    /**
     * A structure that contains information about where Evidently is to store evaluation events for longer term storage, if you choose to do so. If you choose not to store these events, Evidently deletes them after using them to produce metrics and other experiment results that you can view.
     *
     * You can't specify both `CloudWatchLogs` and `S3Destination` in the same operation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-project.html#cfn-evidently-project-datadelivery
     */
    readonly dataDelivery?: CfnProject.DataDeliveryObjectProperty | cdk.IResolvable;

    /**
     * An optional description of the project.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-project.html#cfn-evidently-project-description
     */
    readonly description?: string;

    /**
     * Assigns one or more tags (key-value pairs) to the project.
     *
     * Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.
     *
     * Tags don't have any semantic meaning to AWS and are interpreted strictly as strings of characters.
     *
     * You can associate as many as 50 tags with a project.
     *
     * For more information, see [Tagging AWS resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-project.html#cfn-evidently-project-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnProjectProps`
 *
 * @param properties - the TypeScript properties of a `CfnProjectProps`
 *
 * @returns the result of the validation.
 */
function CfnProjectPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataDelivery', CfnProject_DataDeliveryObjectPropertyValidator)(properties.dataDelivery));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnProjectProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Project` resource
 *
 * @param properties - the TypeScript properties of a `CfnProjectProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Project` resource.
 */
// @ts-ignore TS6133
function cfnProjectPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnProjectPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        DataDelivery: cfnProjectDataDeliveryObjectPropertyToCloudFormation(properties.dataDelivery),
        Description: cdk.stringToCloudFormation(properties.description),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnProjectPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnProjectProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnProjectProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('dataDelivery', 'DataDelivery', properties.DataDelivery != null ? CfnProjectDataDeliveryObjectPropertyFromCloudFormation(properties.DataDelivery) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Evidently::Project`
 *
 * Creates a project, which is the logical object in Evidently that can contain features, launches, and experiments. Use projects to group similar features together.
 *
 * @cloudformationResource AWS::Evidently::Project
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-project.html
 */
export class CfnProject extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Evidently::Project";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnProject {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnProjectPropsFromCloudFormation(resourceProperties);
        const ret = new CfnProject(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN of the project. For example, `arn:aws:evidently:us-west-2:0123455678912:project/myProject`
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The name for the project. It can include up to 127 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-project.html#cfn-evidently-project-name
     */
    public name: string;

    /**
     * A structure that contains information about where Evidently is to store evaluation events for longer term storage, if you choose to do so. If you choose not to store these events, Evidently deletes them after using them to produce metrics and other experiment results that you can view.
     *
     * You can't specify both `CloudWatchLogs` and `S3Destination` in the same operation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-project.html#cfn-evidently-project-datadelivery
     */
    public dataDelivery: CfnProject.DataDeliveryObjectProperty | cdk.IResolvable | undefined;

    /**
     * An optional description of the project.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-project.html#cfn-evidently-project-description
     */
    public description: string | undefined;

    /**
     * Assigns one or more tags (key-value pairs) to the project.
     *
     * Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.
     *
     * Tags don't have any semantic meaning to AWS and are interpreted strictly as strings of characters.
     *
     * You can associate as many as 50 tags with a project.
     *
     * For more information, see [Tagging AWS resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-project.html#cfn-evidently-project-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Evidently::Project`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnProjectProps) {
        super(scope, id, { type: CfnProject.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.name = props.name;
        this.dataDelivery = props.dataDelivery;
        this.description = props.description;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Evidently::Project", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnProject.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            dataDelivery: this.dataDelivery,
            description: this.description,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnProjectPropsToCloudFormation(props);
    }
}

export namespace CfnProject {
    /**
     * A structure that contains information about where Evidently is to store evaluation events for longer term storage.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-project-datadeliveryobject.html
     */
    export interface DataDeliveryObjectProperty {
        /**
         * If the project stores evaluation events in CloudWatch Logs , this structure stores the log group name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-project-datadeliveryobject.html#cfn-evidently-project-datadeliveryobject-loggroup
         */
        readonly logGroup?: string;
        /**
         * If the project stores evaluation events in an Amazon S3 bucket, this structure stores the bucket name and bucket prefix.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-project-datadeliveryobject.html#cfn-evidently-project-datadeliveryobject-s3
         */
        readonly s3?: CfnProject.S3DestinationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DataDeliveryObjectProperty`
 *
 * @param properties - the TypeScript properties of a `DataDeliveryObjectProperty`
 *
 * @returns the result of the validation.
 */
function CfnProject_DataDeliveryObjectPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('logGroup', cdk.validateString)(properties.logGroup));
    errors.collect(cdk.propertyValidator('s3', CfnProject_S3DestinationPropertyValidator)(properties.s3));
    return errors.wrap('supplied properties not correct for "DataDeliveryObjectProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Project.DataDeliveryObject` resource
 *
 * @param properties - the TypeScript properties of a `DataDeliveryObjectProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Project.DataDeliveryObject` resource.
 */
// @ts-ignore TS6133
function cfnProjectDataDeliveryObjectPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnProject_DataDeliveryObjectPropertyValidator(properties).assertSuccess();
    return {
        LogGroup: cdk.stringToCloudFormation(properties.logGroup),
        S3: cfnProjectS3DestinationPropertyToCloudFormation(properties.s3),
    };
}

// @ts-ignore TS6133
function CfnProjectDataDeliveryObjectPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnProject.DataDeliveryObjectProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnProject.DataDeliveryObjectProperty>();
    ret.addPropertyResult('logGroup', 'LogGroup', properties.LogGroup != null ? cfn_parse.FromCloudFormation.getString(properties.LogGroup) : undefined);
    ret.addPropertyResult('s3', 'S3', properties.S3 != null ? CfnProjectS3DestinationPropertyFromCloudFormation(properties.S3) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnProject {
    /**
     * If the project stores evaluation events in an Amazon S3 bucket, this structure stores the bucket name and bucket prefix.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-project-s3destination.html
     */
    export interface S3DestinationProperty {
        /**
         * The name of the bucket in which Evidently stores evaluation events.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-project-s3destination.html#cfn-evidently-project-s3destination-bucketname
         */
        readonly bucketName: string;
        /**
         * The bucket prefix in which Evidently stores evaluation events.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-evidently-project-s3destination.html#cfn-evidently-project-s3destination-prefix
         */
        readonly prefix?: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3DestinationProperty`
 *
 * @param properties - the TypeScript properties of a `S3DestinationProperty`
 *
 * @returns the result of the validation.
 */
function CfnProject_S3DestinationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketName', cdk.requiredValidator)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketName', cdk.validateString)(properties.bucketName));
    errors.collect(cdk.propertyValidator('prefix', cdk.validateString)(properties.prefix));
    return errors.wrap('supplied properties not correct for "S3DestinationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Evidently::Project.S3Destination` resource
 *
 * @param properties - the TypeScript properties of a `S3DestinationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Evidently::Project.S3Destination` resource.
 */
// @ts-ignore TS6133
function cfnProjectS3DestinationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnProject_S3DestinationPropertyValidator(properties).assertSuccess();
    return {
        BucketName: cdk.stringToCloudFormation(properties.bucketName),
        Prefix: cdk.stringToCloudFormation(properties.prefix),
    };
}

// @ts-ignore TS6133
function CfnProjectS3DestinationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnProject.S3DestinationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnProject.S3DestinationProperty>();
    ret.addPropertyResult('bucketName', 'BucketName', cfn_parse.FromCloudFormation.getString(properties.BucketName));
    ret.addPropertyResult('prefix', 'Prefix', properties.Prefix != null ? cfn_parse.FromCloudFormation.getString(properties.Prefix) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
