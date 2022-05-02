// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:06.884Z","fingerprint":"xEQNpYY6VQ2DiMd0RnkUx9qA0+GGF042NU7lOKXsFwk="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnScalingPlan`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscalingplans-scalingplan.html
 */
export interface CfnScalingPlanProps {

    /**
     * A CloudFormation stack or a set of tags. You can create one scaling plan per application source. The `ApplicationSource` property must be present to ensure interoperability with the AWS Auto Scaling console.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscalingplans-scalingplan.html#cfn-autoscalingplans-scalingplan-applicationsource
     */
    readonly applicationSource: CfnScalingPlan.ApplicationSourceProperty | cdk.IResolvable;

    /**
     * The scaling instructions.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscalingplans-scalingplan.html#cfn-autoscalingplans-scalingplan-scalinginstructions
     */
    readonly scalingInstructions: Array<CfnScalingPlan.ScalingInstructionProperty | cdk.IResolvable> | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnScalingPlanProps`
 *
 * @param properties - the TypeScript properties of a `CfnScalingPlanProps`
 *
 * @returns the result of the validation.
 */
function CfnScalingPlanPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('applicationSource', cdk.requiredValidator)(properties.applicationSource));
    errors.collect(cdk.propertyValidator('applicationSource', CfnScalingPlan_ApplicationSourcePropertyValidator)(properties.applicationSource));
    errors.collect(cdk.propertyValidator('scalingInstructions', cdk.requiredValidator)(properties.scalingInstructions));
    errors.collect(cdk.propertyValidator('scalingInstructions', cdk.listValidator(CfnScalingPlan_ScalingInstructionPropertyValidator))(properties.scalingInstructions));
    return errors.wrap('supplied properties not correct for "CfnScalingPlanProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan` resource
 *
 * @param properties - the TypeScript properties of a `CfnScalingPlanProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan` resource.
 */
// @ts-ignore TS6133
function cfnScalingPlanPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPlanPropsValidator(properties).assertSuccess();
    return {
        ApplicationSource: cfnScalingPlanApplicationSourcePropertyToCloudFormation(properties.applicationSource),
        ScalingInstructions: cdk.listMapper(cfnScalingPlanScalingInstructionPropertyToCloudFormation)(properties.scalingInstructions),
    };
}

// @ts-ignore TS6133
function CfnScalingPlanPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPlanProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPlanProps>();
    ret.addPropertyResult('applicationSource', 'ApplicationSource', CfnScalingPlanApplicationSourcePropertyFromCloudFormation(properties.ApplicationSource));
    ret.addPropertyResult('scalingInstructions', 'ScalingInstructions', cfn_parse.FromCloudFormation.getArray(CfnScalingPlanScalingInstructionPropertyFromCloudFormation)(properties.ScalingInstructions));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AutoScalingPlans::ScalingPlan`
 *
 * The `AWS::AutoScalingPlans::ScalingPlan` resource defines an AWS Auto Scaling scaling plan. A scaling plan is used to scale application resources to size them appropriately to ensure that enough resource is available in the application at peak times and to reduce allocated resource during periods of low utilization. The following resources can be added to a scaling plan:
 *
 * - Amazon EC2 Auto Scaling groups
 * - Amazon EC2 Spot Fleet requests
 * - Amazon ECS services
 * - Amazon DynamoDB tables and global secondary indexes
 * - Amazon Aurora Replicas
 *
 * For more information, see the [AWS Auto Scaling User Guide](https://docs.aws.amazon.com/autoscaling/plans/userguide/what-is-aws-auto-scaling.html) .
 *
 * @cloudformationResource AWS::AutoScalingPlans::ScalingPlan
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscalingplans-scalingplan.html
 */
export class CfnScalingPlan extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AutoScalingPlans::ScalingPlan";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnScalingPlan {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnScalingPlanPropsFromCloudFormation(resourceProperties);
        const ret = new CfnScalingPlan(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     *
     * @cloudformationAttribute ScalingPlanName
     */
    public readonly attrScalingPlanName: string;

    /**
     *
     * @cloudformationAttribute ScalingPlanVersion
     */
    public readonly attrScalingPlanVersion: string;

    /**
     * A CloudFormation stack or a set of tags. You can create one scaling plan per application source. The `ApplicationSource` property must be present to ensure interoperability with the AWS Auto Scaling console.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscalingplans-scalingplan.html#cfn-autoscalingplans-scalingplan-applicationsource
     */
    public applicationSource: CfnScalingPlan.ApplicationSourceProperty | cdk.IResolvable;

    /**
     * The scaling instructions.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscalingplans-scalingplan.html#cfn-autoscalingplans-scalingplan-scalinginstructions
     */
    public scalingInstructions: Array<CfnScalingPlan.ScalingInstructionProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Create a new `AWS::AutoScalingPlans::ScalingPlan`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnScalingPlanProps) {
        super(scope, id, { type: CfnScalingPlan.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'applicationSource', this);
        cdk.requireProperty(props, 'scalingInstructions', this);
        this.attrScalingPlanName = cdk.Token.asString(this.getAtt('ScalingPlanName'));
        this.attrScalingPlanVersion = cdk.Token.asString(this.getAtt('ScalingPlanVersion'));

        this.applicationSource = props.applicationSource;
        this.scalingInstructions = props.scalingInstructions;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnScalingPlan.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            applicationSource: this.applicationSource,
            scalingInstructions: this.scalingInstructions,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnScalingPlanPropsToCloudFormation(props);
    }
}

export namespace CfnScalingPlan {
    /**
     * `ApplicationSource` is a property of [ScalingPlan](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscalingplans-scalingplan.html) that specifies the application source to use with AWS Auto Scaling ( Auto Scaling Plans ). You can create one scaling plan per application source.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-applicationsource.html
     */
    export interface ApplicationSourceProperty {
        /**
         * The Amazon Resource Name (ARN) of a CloudFormation stack.
         *
         * You must specify either a `CloudFormationStackARN` or `TagFilters` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-applicationsource.html#cfn-autoscalingplans-scalingplan-applicationsource-cloudformationstackarn
         */
        readonly cloudFormationStackArn?: string;
        /**
         * A set of tag filters (keys and values). Each tag filter specified must contain a key with values as optional. Each scaling plan can include up to 50 keys, and each key can include up to 20 values.
         *
         * Tags are part of the syntax that you use to specify the resources you want returned when configuring a scaling plan from the AWS Auto Scaling console. You do not need to specify valid tag filter values when you create a scaling plan with CloudFormation. The `Key` and `Values` properties can accept any value as long as the combination of values is unique across scaling plans. However, if you also want to use the AWS Auto Scaling console to edit the scaling plan, then you must specify valid values.
         *
         * You must specify either a `CloudFormationStackARN` or `TagFilters` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-applicationsource.html#cfn-autoscalingplans-scalingplan-applicationsource-tagfilters
         */
        readonly tagFilters?: Array<CfnScalingPlan.TagFilterProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ApplicationSourceProperty`
 *
 * @param properties - the TypeScript properties of a `ApplicationSourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPlan_ApplicationSourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cloudFormationStackArn', cdk.validateString)(properties.cloudFormationStackArn));
    errors.collect(cdk.propertyValidator('tagFilters', cdk.listValidator(CfnScalingPlan_TagFilterPropertyValidator))(properties.tagFilters));
    return errors.wrap('supplied properties not correct for "ApplicationSourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.ApplicationSource` resource
 *
 * @param properties - the TypeScript properties of a `ApplicationSourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.ApplicationSource` resource.
 */
// @ts-ignore TS6133
function cfnScalingPlanApplicationSourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPlan_ApplicationSourcePropertyValidator(properties).assertSuccess();
    return {
        CloudFormationStackARN: cdk.stringToCloudFormation(properties.cloudFormationStackArn),
        TagFilters: cdk.listMapper(cfnScalingPlanTagFilterPropertyToCloudFormation)(properties.tagFilters),
    };
}

// @ts-ignore TS6133
function CfnScalingPlanApplicationSourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPlan.ApplicationSourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPlan.ApplicationSourceProperty>();
    ret.addPropertyResult('cloudFormationStackArn', 'CloudFormationStackARN', properties.CloudFormationStackARN != null ? cfn_parse.FromCloudFormation.getString(properties.CloudFormationStackARN) : undefined);
    ret.addPropertyResult('tagFilters', 'TagFilters', properties.TagFilters != null ? cfn_parse.FromCloudFormation.getArray(CfnScalingPlanTagFilterPropertyFromCloudFormation)(properties.TagFilters) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPlan {
    /**
     * `CustomizedLoadMetricSpecification` is a subproperty of [ScalingInstruction](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html) that specifies a customized load metric for predictive scaling to use with AWS Auto Scaling ( Auto Scaling Plans ).
     *
     * For predictive scaling to work with a customized load metric specification, AWS Auto Scaling needs access to the `Sum` and `Average` statistics that CloudWatch computes from metric data.
     *
     * When you choose a load metric, make sure that the required `Sum` and `Average` statistics for your metric are available in CloudWatch and that they provide relevant data for predictive scaling. The `Sum` statistic must represent the total load on the resource, and the `Average` statistic must represent the average load per capacity unit of the resource. For example, there is a metric that counts the number of requests processed by your Auto Scaling group. If the `Sum` statistic represents the total request count processed by the group, then the `Average` statistic for the specified metric must represent the average request count processed by each instance of the group.
     *
     * If you publish your own metrics, you can aggregate the data points at a given interval and then publish the aggregated data points to CloudWatch. Before AWS Auto Scaling generates the forecast, it sums up all the metric data points that occurred within each hour to match the granularity period that is used in the forecast (60 minutes).
     *
     * For information about terminology, available metrics, or how to publish new metrics, see [Amazon CloudWatch Concepts](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html) in the *Amazon CloudWatch User Guide* .
     *
     * After creating your scaling plan, you can use the AWS Auto Scaling console to visualize forecasts for the specified metric. For more information, see [View Scaling Information for a Resource](https://docs.aws.amazon.com/autoscaling/plans/userguide/gs-create-scaling-plan.html#gs-view-resource) in the *AWS Auto Scaling User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-customizedloadmetricspecification.html
     */
    export interface CustomizedLoadMetricSpecificationProperty {
        /**
         * The dimensions of the metric.
         *
         * Conditional: If you published your metric with dimensions, you must specify the same dimensions in your customized load metric specification.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-customizedloadmetricspecification.html#cfn-autoscalingplans-scalingplan-customizedloadmetricspecification-dimensions
         */
        readonly dimensions?: Array<CfnScalingPlan.MetricDimensionProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The name of the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-customizedloadmetricspecification.html#cfn-autoscalingplans-scalingplan-customizedloadmetricspecification-metricname
         */
        readonly metricName: string;
        /**
         * The namespace of the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-customizedloadmetricspecification.html#cfn-autoscalingplans-scalingplan-customizedloadmetricspecification-namespace
         */
        readonly namespace: string;
        /**
         * The statistic of the metric.
         *
         * *Allowed Values* : `Sum`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-customizedloadmetricspecification.html#cfn-autoscalingplans-scalingplan-customizedloadmetricspecification-statistic
         */
        readonly statistic: string;
        /**
         * The unit of the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-customizedloadmetricspecification.html#cfn-autoscalingplans-scalingplan-customizedloadmetricspecification-unit
         */
        readonly unit?: string;
    }
}

/**
 * Determine whether the given properties match those of a `CustomizedLoadMetricSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `CustomizedLoadMetricSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPlan_CustomizedLoadMetricSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dimensions', cdk.listValidator(CfnScalingPlan_MetricDimensionPropertyValidator))(properties.dimensions));
    errors.collect(cdk.propertyValidator('metricName', cdk.requiredValidator)(properties.metricName));
    errors.collect(cdk.propertyValidator('metricName', cdk.validateString)(properties.metricName));
    errors.collect(cdk.propertyValidator('namespace', cdk.requiredValidator)(properties.namespace));
    errors.collect(cdk.propertyValidator('namespace', cdk.validateString)(properties.namespace));
    errors.collect(cdk.propertyValidator('statistic', cdk.requiredValidator)(properties.statistic));
    errors.collect(cdk.propertyValidator('statistic', cdk.validateString)(properties.statistic));
    errors.collect(cdk.propertyValidator('unit', cdk.validateString)(properties.unit));
    return errors.wrap('supplied properties not correct for "CustomizedLoadMetricSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.CustomizedLoadMetricSpecification` resource
 *
 * @param properties - the TypeScript properties of a `CustomizedLoadMetricSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.CustomizedLoadMetricSpecification` resource.
 */
// @ts-ignore TS6133
function cfnScalingPlanCustomizedLoadMetricSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPlan_CustomizedLoadMetricSpecificationPropertyValidator(properties).assertSuccess();
    return {
        Dimensions: cdk.listMapper(cfnScalingPlanMetricDimensionPropertyToCloudFormation)(properties.dimensions),
        MetricName: cdk.stringToCloudFormation(properties.metricName),
        Namespace: cdk.stringToCloudFormation(properties.namespace),
        Statistic: cdk.stringToCloudFormation(properties.statistic),
        Unit: cdk.stringToCloudFormation(properties.unit),
    };
}

// @ts-ignore TS6133
function CfnScalingPlanCustomizedLoadMetricSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPlan.CustomizedLoadMetricSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPlan.CustomizedLoadMetricSpecificationProperty>();
    ret.addPropertyResult('dimensions', 'Dimensions', properties.Dimensions != null ? cfn_parse.FromCloudFormation.getArray(CfnScalingPlanMetricDimensionPropertyFromCloudFormation)(properties.Dimensions) : undefined);
    ret.addPropertyResult('metricName', 'MetricName', cfn_parse.FromCloudFormation.getString(properties.MetricName));
    ret.addPropertyResult('namespace', 'Namespace', cfn_parse.FromCloudFormation.getString(properties.Namespace));
    ret.addPropertyResult('statistic', 'Statistic', cfn_parse.FromCloudFormation.getString(properties.Statistic));
    ret.addPropertyResult('unit', 'Unit', properties.Unit != null ? cfn_parse.FromCloudFormation.getString(properties.Unit) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPlan {
    /**
     * `CustomizedScalingMetricSpecification` is a subproperty of [TargetTrackingConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-targettrackingconfiguration.html) that specifies a customized scaling metric for a target tracking configuration to use with AWS Auto Scaling ( Auto Scaling Plans ).
     *
     * To create your customized scaling metric specification:
     *
     * - Add values for each required property from CloudWatch. You can use an existing metric, or a new metric that you create. To use your own metric, you must first publish the metric to CloudWatch. For more information, see [Publish Custom Metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html) in the *Amazon CloudWatch User Guide* .
     * - Choose a metric that changes proportionally with capacity. The value of the metric should increase or decrease in inverse proportion to the number of capacity units. That is, the value of the metric should decrease when capacity increases.
     *
     * For information about terminology, available metrics, or how to publish new metrics, see [Amazon CloudWatch Concepts](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html) in the *Amazon CloudWatch User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-customizedscalingmetricspecification.html
     */
    export interface CustomizedScalingMetricSpecificationProperty {
        /**
         * The dimensions of the metric.
         *
         * Conditional: If you published your metric with dimensions, you must specify the same dimensions in your customized scaling metric specification.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-customizedscalingmetricspecification.html#cfn-autoscalingplans-scalingplan-customizedscalingmetricspecification-dimensions
         */
        readonly dimensions?: Array<CfnScalingPlan.MetricDimensionProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The name of the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-customizedscalingmetricspecification.html#cfn-autoscalingplans-scalingplan-customizedscalingmetricspecification-metricname
         */
        readonly metricName: string;
        /**
         * The namespace of the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-customizedscalingmetricspecification.html#cfn-autoscalingplans-scalingplan-customizedscalingmetricspecification-namespace
         */
        readonly namespace: string;
        /**
         * The statistic of the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-customizedscalingmetricspecification.html#cfn-autoscalingplans-scalingplan-customizedscalingmetricspecification-statistic
         */
        readonly statistic: string;
        /**
         * The unit of the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-customizedscalingmetricspecification.html#cfn-autoscalingplans-scalingplan-customizedscalingmetricspecification-unit
         */
        readonly unit?: string;
    }
}

/**
 * Determine whether the given properties match those of a `CustomizedScalingMetricSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `CustomizedScalingMetricSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPlan_CustomizedScalingMetricSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dimensions', cdk.listValidator(CfnScalingPlan_MetricDimensionPropertyValidator))(properties.dimensions));
    errors.collect(cdk.propertyValidator('metricName', cdk.requiredValidator)(properties.metricName));
    errors.collect(cdk.propertyValidator('metricName', cdk.validateString)(properties.metricName));
    errors.collect(cdk.propertyValidator('namespace', cdk.requiredValidator)(properties.namespace));
    errors.collect(cdk.propertyValidator('namespace', cdk.validateString)(properties.namespace));
    errors.collect(cdk.propertyValidator('statistic', cdk.requiredValidator)(properties.statistic));
    errors.collect(cdk.propertyValidator('statistic', cdk.validateString)(properties.statistic));
    errors.collect(cdk.propertyValidator('unit', cdk.validateString)(properties.unit));
    return errors.wrap('supplied properties not correct for "CustomizedScalingMetricSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.CustomizedScalingMetricSpecification` resource
 *
 * @param properties - the TypeScript properties of a `CustomizedScalingMetricSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.CustomizedScalingMetricSpecification` resource.
 */
// @ts-ignore TS6133
function cfnScalingPlanCustomizedScalingMetricSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPlan_CustomizedScalingMetricSpecificationPropertyValidator(properties).assertSuccess();
    return {
        Dimensions: cdk.listMapper(cfnScalingPlanMetricDimensionPropertyToCloudFormation)(properties.dimensions),
        MetricName: cdk.stringToCloudFormation(properties.metricName),
        Namespace: cdk.stringToCloudFormation(properties.namespace),
        Statistic: cdk.stringToCloudFormation(properties.statistic),
        Unit: cdk.stringToCloudFormation(properties.unit),
    };
}

// @ts-ignore TS6133
function CfnScalingPlanCustomizedScalingMetricSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPlan.CustomizedScalingMetricSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPlan.CustomizedScalingMetricSpecificationProperty>();
    ret.addPropertyResult('dimensions', 'Dimensions', properties.Dimensions != null ? cfn_parse.FromCloudFormation.getArray(CfnScalingPlanMetricDimensionPropertyFromCloudFormation)(properties.Dimensions) : undefined);
    ret.addPropertyResult('metricName', 'MetricName', cfn_parse.FromCloudFormation.getString(properties.MetricName));
    ret.addPropertyResult('namespace', 'Namespace', cfn_parse.FromCloudFormation.getString(properties.Namespace));
    ret.addPropertyResult('statistic', 'Statistic', cfn_parse.FromCloudFormation.getString(properties.Statistic));
    ret.addPropertyResult('unit', 'Unit', properties.Unit != null ? cfn_parse.FromCloudFormation.getString(properties.Unit) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPlan {
    /**
     * `MetricDimension` is a subproperty of [CustomizedScalingMetricSpecification](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-customizedscalingmetricspecification.html) that specifies a dimension for a customized metric to use with AWS Auto Scaling ( Auto Scaling Plans ). Dimensions are arbitrary name/value pairs that can be associated with a CloudWatch metric. Duplicate dimensions are not allowed.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-metricdimension.html
     */
    export interface MetricDimensionProperty {
        /**
         * The name of the dimension.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-metricdimension.html#cfn-autoscalingplans-scalingplan-metricdimension-name
         */
        readonly name: string;
        /**
         * The value of the dimension.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-metricdimension.html#cfn-autoscalingplans-scalingplan-metricdimension-value
         */
        readonly value: string;
    }
}

/**
 * Determine whether the given properties match those of a `MetricDimensionProperty`
 *
 * @param properties - the TypeScript properties of a `MetricDimensionProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPlan_MetricDimensionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "MetricDimensionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.MetricDimension` resource
 *
 * @param properties - the TypeScript properties of a `MetricDimensionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.MetricDimension` resource.
 */
// @ts-ignore TS6133
function cfnScalingPlanMetricDimensionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPlan_MetricDimensionPropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnScalingPlanMetricDimensionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPlan.MetricDimensionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPlan.MetricDimensionProperty>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPlan {
    /**
     * `PredefinedLoadMetricSpecification` is a subproperty of [ScalingInstruction](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html) that specifies a predefined load metric for predictive scaling to use with AWS Auto Scaling ( Auto Scaling Plans ).
     *
     * After creating your scaling plan, you can use the AWS Auto Scaling console to visualize forecasts for the specified metric. For more information, see [View Scaling Information for a Resource](https://docs.aws.amazon.com/autoscaling/plans/userguide/gs-create-scaling-plan.html#gs-view-resource) in the *AWS Auto Scaling User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-predefinedloadmetricspecification.html
     */
    export interface PredefinedLoadMetricSpecificationProperty {
        /**
         * The metric type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-predefinedloadmetricspecification.html#cfn-autoscalingplans-scalingplan-predefinedloadmetricspecification-predefinedloadmetrictype
         */
        readonly predefinedLoadMetricType: string;
        /**
         * Identifies the resource associated with the metric type. You can't specify a resource label unless the metric type is `ALBTargetGroupRequestCount` and there is a target group for an Application Load Balancer attached to the Auto Scaling group.
         *
         * You create the resource label by appending the final portion of the load balancer ARN and the final portion of the target group ARN into a single value, separated by a forward slash (/). The format is app/<load-balancer-name>/<load-balancer-id>/targetgroup/<target-group-name>/<target-group-id>, where:
         *
         * - app/<load-balancer-name>/<load-balancer-id> is the final portion of the load balancer ARN
         * - targetgroup/<target-group-name>/<target-group-id> is the final portion of the target group ARN.
         *
         * This is an example: app/EC2Co-EcsEl-1TKLTMITMM0EO/f37c06a68c1748aa/targetgroup/EC2Co-Defau-LDNM7Q3ZH1ZN/6d4ea56ca2d6a18d.
         *
         * To find the ARN for an Application Load Balancer, use the [DescribeLoadBalancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_DescribeLoadBalancers.html) API operation. To find the ARN for the target group, use the [DescribeTargetGroups](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_DescribeTargetGroups.html) API operation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-predefinedloadmetricspecification.html#cfn-autoscalingplans-scalingplan-predefinedloadmetricspecification-resourcelabel
         */
        readonly resourceLabel?: string;
    }
}

/**
 * Determine whether the given properties match those of a `PredefinedLoadMetricSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `PredefinedLoadMetricSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPlan_PredefinedLoadMetricSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('predefinedLoadMetricType', cdk.requiredValidator)(properties.predefinedLoadMetricType));
    errors.collect(cdk.propertyValidator('predefinedLoadMetricType', cdk.validateString)(properties.predefinedLoadMetricType));
    errors.collect(cdk.propertyValidator('resourceLabel', cdk.validateString)(properties.resourceLabel));
    return errors.wrap('supplied properties not correct for "PredefinedLoadMetricSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.PredefinedLoadMetricSpecification` resource
 *
 * @param properties - the TypeScript properties of a `PredefinedLoadMetricSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.PredefinedLoadMetricSpecification` resource.
 */
// @ts-ignore TS6133
function cfnScalingPlanPredefinedLoadMetricSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPlan_PredefinedLoadMetricSpecificationPropertyValidator(properties).assertSuccess();
    return {
        PredefinedLoadMetricType: cdk.stringToCloudFormation(properties.predefinedLoadMetricType),
        ResourceLabel: cdk.stringToCloudFormation(properties.resourceLabel),
    };
}

// @ts-ignore TS6133
function CfnScalingPlanPredefinedLoadMetricSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPlan.PredefinedLoadMetricSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPlan.PredefinedLoadMetricSpecificationProperty>();
    ret.addPropertyResult('predefinedLoadMetricType', 'PredefinedLoadMetricType', cfn_parse.FromCloudFormation.getString(properties.PredefinedLoadMetricType));
    ret.addPropertyResult('resourceLabel', 'ResourceLabel', properties.ResourceLabel != null ? cfn_parse.FromCloudFormation.getString(properties.ResourceLabel) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPlan {
    /**
     * `PredefinedScalingMetricSpecification` is a subproperty of [TargetTrackingConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-targettrackingconfiguration.html) that specifies a customized scaling metric for a target tracking configuration to use with AWS Auto Scaling ( Auto Scaling Plans ).
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-predefinedscalingmetricspecification.html
     */
    export interface PredefinedScalingMetricSpecificationProperty {
        /**
         * The metric type. The `ALBRequestCountPerTarget` metric type applies only to Auto Scaling groups, Spot Fleet requests, and ECS services.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-predefinedscalingmetricspecification.html#cfn-autoscalingplans-scalingplan-predefinedscalingmetricspecification-predefinedscalingmetrictype
         */
        readonly predefinedScalingMetricType: string;
        /**
         * Identifies the resource associated with the metric type. You can't specify a resource label unless the metric type is `ALBRequestCountPerTarget` and there is a target group for an Application Load Balancer attached to the Auto Scaling group, Spot Fleet request, or ECS service.
         *
         * You create the resource label by appending the final portion of the load balancer ARN and the final portion of the target group ARN into a single value, separated by a forward slash (/). The format is app/<load-balancer-name>/<load-balancer-id>/targetgroup/<target-group-name>/<target-group-id>, where:
         *
         * - app/<load-balancer-name>/<load-balancer-id> is the final portion of the load balancer ARN
         * - targetgroup/<target-group-name>/<target-group-id> is the final portion of the target group ARN.
         *
         * This is an example: app/EC2Co-EcsEl-1TKLTMITMM0EO/f37c06a68c1748aa/targetgroup/EC2Co-Defau-LDNM7Q3ZH1ZN/6d4ea56ca2d6a18d.
         *
         * To find the ARN for an Application Load Balancer, use the [DescribeLoadBalancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_DescribeLoadBalancers.html) API operation. To find the ARN for the target group, use the [DescribeTargetGroups](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_DescribeTargetGroups.html) API operation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-predefinedscalingmetricspecification.html#cfn-autoscalingplans-scalingplan-predefinedscalingmetricspecification-resourcelabel
         */
        readonly resourceLabel?: string;
    }
}

/**
 * Determine whether the given properties match those of a `PredefinedScalingMetricSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `PredefinedScalingMetricSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPlan_PredefinedScalingMetricSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('predefinedScalingMetricType', cdk.requiredValidator)(properties.predefinedScalingMetricType));
    errors.collect(cdk.propertyValidator('predefinedScalingMetricType', cdk.validateString)(properties.predefinedScalingMetricType));
    errors.collect(cdk.propertyValidator('resourceLabel', cdk.validateString)(properties.resourceLabel));
    return errors.wrap('supplied properties not correct for "PredefinedScalingMetricSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.PredefinedScalingMetricSpecification` resource
 *
 * @param properties - the TypeScript properties of a `PredefinedScalingMetricSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.PredefinedScalingMetricSpecification` resource.
 */
// @ts-ignore TS6133
function cfnScalingPlanPredefinedScalingMetricSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPlan_PredefinedScalingMetricSpecificationPropertyValidator(properties).assertSuccess();
    return {
        PredefinedScalingMetricType: cdk.stringToCloudFormation(properties.predefinedScalingMetricType),
        ResourceLabel: cdk.stringToCloudFormation(properties.resourceLabel),
    };
}

// @ts-ignore TS6133
function CfnScalingPlanPredefinedScalingMetricSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPlan.PredefinedScalingMetricSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPlan.PredefinedScalingMetricSpecificationProperty>();
    ret.addPropertyResult('predefinedScalingMetricType', 'PredefinedScalingMetricType', cfn_parse.FromCloudFormation.getString(properties.PredefinedScalingMetricType));
    ret.addPropertyResult('resourceLabel', 'ResourceLabel', properties.ResourceLabel != null ? cfn_parse.FromCloudFormation.getString(properties.ResourceLabel) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPlan {
    /**
     * `ScalingInstruction` is a property of [ScalingPlan](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscalingplans-scalingplan.html) that specifies the scaling instruction for a scalable resource in a scaling plan. Each scaling instruction applies to one resource.
     *
     * AWS Auto Scaling creates target tracking scaling policies based on the scaling instructions. Target tracking scaling policies adjust the capacity of your scalable resource as required to maintain resource utilization at the target value that you specified.
     *
     * AWS Auto Scaling also configures predictive scaling for your Amazon EC2 Auto Scaling groups using a subset of properties, including the load metric, the scaling metric, the target value for the scaling metric, the predictive scaling mode (forecast and scale or forecast only), and the desired behavior when the forecast capacity exceeds the maximum capacity of the resource. With predictive scaling, AWS Auto Scaling generates forecasts with traffic predictions for the two days ahead and schedules scaling actions that proactively add and remove resource capacity to match the forecast.
     *
     * > We recommend waiting a minimum of 24 hours after creating an Auto Scaling group to configure predictive scaling. At minimum, there must be 24 hours of historical data to generate a forecast. For more information, see [Best Practices for AWS Auto Scaling](https://docs.aws.amazon.com/autoscaling/plans/userguide/gs-best-practices.html) in the *AWS Auto Scaling User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html
     */
    export interface ScalingInstructionProperty {
        /**
         * The customized load metric to use for predictive scaling. This property or a *PredefinedLoadMetricSpecification* is required when configuring predictive scaling, and cannot be used otherwise.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html#cfn-autoscalingplans-scalingplan-scalinginstruction-customizedloadmetricspecification
         */
        readonly customizedLoadMetricSpecification?: CfnScalingPlan.CustomizedLoadMetricSpecificationProperty | cdk.IResolvable;
        /**
         * Controls whether dynamic scaling by AWS Auto Scaling is disabled. When dynamic scaling is enabled, AWS Auto Scaling creates target tracking scaling policies based on the specified target tracking configurations.
         *
         * The default is enabled ( `false` ).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html#cfn-autoscalingplans-scalingplan-scalinginstruction-disabledynamicscaling
         */
        readonly disableDynamicScaling?: boolean | cdk.IResolvable;
        /**
         * The maximum capacity of the resource. The exception to this upper limit is if you specify a non-default setting for *PredictiveScalingMaxCapacityBehavior* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html#cfn-autoscalingplans-scalingplan-scalinginstruction-maxcapacity
         */
        readonly maxCapacity: number;
        /**
         * The minimum capacity of the resource.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html#cfn-autoscalingplans-scalingplan-scalinginstruction-mincapacity
         */
        readonly minCapacity: number;
        /**
         * The predefined load metric to use for predictive scaling. This property or a *CustomizedLoadMetricSpecification* is required when configuring predictive scaling, and cannot be used otherwise.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html#cfn-autoscalingplans-scalingplan-scalinginstruction-predefinedloadmetricspecification
         */
        readonly predefinedLoadMetricSpecification?: CfnScalingPlan.PredefinedLoadMetricSpecificationProperty | cdk.IResolvable;
        /**
         * Defines the behavior that should be applied if the forecast capacity approaches or exceeds the maximum capacity specified for the resource. The default value is `SetForecastCapacityToMaxCapacity` .
         *
         * The following are possible values:
         *
         * - `SetForecastCapacityToMaxCapacity` - AWS Auto Scaling cannot scale resource capacity higher than the maximum capacity. The maximum capacity is enforced as a hard limit.
         * - `SetMaxCapacityToForecastCapacity` - AWS Auto Scaling can scale resource capacity higher than the maximum capacity to equal but not exceed forecast capacity.
         * - `SetMaxCapacityAboveForecastCapacity` - AWS Auto Scaling can scale resource capacity higher than the maximum capacity by a specified buffer value. The intention is to give the target tracking scaling policy extra capacity if unexpected traffic occurs.
         *
         * Valid only when configuring predictive scaling.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html#cfn-autoscalingplans-scalingplan-scalinginstruction-predictivescalingmaxcapacitybehavior
         */
        readonly predictiveScalingMaxCapacityBehavior?: string;
        /**
         * The size of the capacity buffer to use when the forecast capacity is close to or exceeds the maximum capacity. The value is specified as a percentage relative to the forecast capacity. For example, if the buffer is 10, this means a 10 percent buffer. With a 10 percent buffer, if the forecast capacity is 50, and the maximum capacity is 40, then the effective maximum capacity is 55.
         *
         * Valid only when configuring predictive scaling. Required if *PredictiveScalingMaxCapacityBehavior* is set to `SetMaxCapacityAboveForecastCapacity` , and cannot be used otherwise.
         *
         * The range is 1-100.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html#cfn-autoscalingplans-scalingplan-scalinginstruction-predictivescalingmaxcapacitybuffer
         */
        readonly predictiveScalingMaxCapacityBuffer?: number;
        /**
         * The predictive scaling mode. The default value is `ForecastAndScale` . Otherwise, AWS Auto Scaling forecasts capacity but does not apply any scheduled scaling actions based on the capacity forecast.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html#cfn-autoscalingplans-scalingplan-scalinginstruction-predictivescalingmode
         */
        readonly predictiveScalingMode?: string;
        /**
         * The ID of the resource. This string consists of the resource type and unique identifier.
         *
         * - Auto Scaling group - The resource type is `autoScalingGroup` and the unique identifier is the name of the Auto Scaling group. Example: `autoScalingGroup/my-asg` .
         * - ECS service - The resource type is `service` and the unique identifier is the cluster name and service name. Example: `service/default/sample-webapp` .
         * - Spot Fleet request - The resource type is `spot-fleet-request` and the unique identifier is the Spot Fleet request ID. Example: `spot-fleet-request/sfr-73fbd2ce-aa30-494c-8788-1cee4EXAMPLE` .
         * - DynamoDB table - The resource type is `table` and the unique identifier is the resource ID. Example: `table/my-table` .
         * - DynamoDB global secondary index - The resource type is `index` and the unique identifier is the resource ID. Example: `table/my-table/index/my-table-index` .
         * - Aurora DB cluster - The resource type is `cluster` and the unique identifier is the cluster name. Example: `cluster:my-db-cluster` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html#cfn-autoscalingplans-scalingplan-scalinginstruction-resourceid
         */
        readonly resourceId: string;
        /**
         * The scalable dimension associated with the resource.
         *
         * - `autoscaling:autoScalingGroup:DesiredCapacity` - The desired capacity of an Auto Scaling group.
         * - `ecs:service:DesiredCount` - The desired task count of an ECS service.
         * - `ec2:spot-fleet-request:TargetCapacity` - The target capacity of a Spot Fleet request.
         * - `dynamodb:table:ReadCapacityUnits` - The provisioned read capacity for a DynamoDB table.
         * - `dynamodb:table:WriteCapacityUnits` - The provisioned write capacity for a DynamoDB table.
         * - `dynamodb:index:ReadCapacityUnits` - The provisioned read capacity for a DynamoDB global secondary index.
         * - `dynamodb:index:WriteCapacityUnits` - The provisioned write capacity for a DynamoDB global secondary index.
         * - `rds:cluster:ReadReplicaCount` - The count of Aurora Replicas in an Aurora DB cluster. Available for Aurora MySQL-compatible edition and Aurora PostgreSQL-compatible edition.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html#cfn-autoscalingplans-scalingplan-scalinginstruction-scalabledimension
         */
        readonly scalableDimension: string;
        /**
         * Controls whether your scaling policies that are external to AWS Auto Scaling are deleted and new target tracking scaling policies created. The default value is `KeepExternalPolicies` .
         *
         * Valid only when configuring dynamic scaling.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html#cfn-autoscalingplans-scalingplan-scalinginstruction-scalingpolicyupdatebehavior
         */
        readonly scalingPolicyUpdateBehavior?: string;
        /**
         * The amount of time, in seconds, to buffer the run time of scheduled scaling actions when scaling out. For example, if the forecast says to add capacity at 10:00 AM, and the buffer time is 5 minutes, then the run time of the corresponding scheduled scaling action will be 9:55 AM. The intention is to give resources time to be provisioned. For example, it can take a few minutes to launch an EC2 instance. The actual amount of time required depends on several factors, such as the size of the instance and whether there are startup scripts to complete.
         *
         * The value must be less than the forecast interval duration of 3600 seconds (60 minutes). The default is 300 seconds.
         *
         * Valid only when configuring predictive scaling.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html#cfn-autoscalingplans-scalingplan-scalinginstruction-scheduledactionbuffertime
         */
        readonly scheduledActionBufferTime?: number;
        /**
         * The namespace of the AWS service.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html#cfn-autoscalingplans-scalingplan-scalinginstruction-servicenamespace
         */
        readonly serviceNamespace: string;
        /**
         * The target tracking configurations (up to 10). Each of these structures must specify a unique scaling metric and a target value for the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html#cfn-autoscalingplans-scalingplan-scalinginstruction-targettrackingconfigurations
         */
        readonly targetTrackingConfigurations: Array<CfnScalingPlan.TargetTrackingConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ScalingInstructionProperty`
 *
 * @param properties - the TypeScript properties of a `ScalingInstructionProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPlan_ScalingInstructionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('customizedLoadMetricSpecification', CfnScalingPlan_CustomizedLoadMetricSpecificationPropertyValidator)(properties.customizedLoadMetricSpecification));
    errors.collect(cdk.propertyValidator('disableDynamicScaling', cdk.validateBoolean)(properties.disableDynamicScaling));
    errors.collect(cdk.propertyValidator('maxCapacity', cdk.requiredValidator)(properties.maxCapacity));
    errors.collect(cdk.propertyValidator('maxCapacity', cdk.validateNumber)(properties.maxCapacity));
    errors.collect(cdk.propertyValidator('minCapacity', cdk.requiredValidator)(properties.minCapacity));
    errors.collect(cdk.propertyValidator('minCapacity', cdk.validateNumber)(properties.minCapacity));
    errors.collect(cdk.propertyValidator('predefinedLoadMetricSpecification', CfnScalingPlan_PredefinedLoadMetricSpecificationPropertyValidator)(properties.predefinedLoadMetricSpecification));
    errors.collect(cdk.propertyValidator('predictiveScalingMaxCapacityBehavior', cdk.validateString)(properties.predictiveScalingMaxCapacityBehavior));
    errors.collect(cdk.propertyValidator('predictiveScalingMaxCapacityBuffer', cdk.validateNumber)(properties.predictiveScalingMaxCapacityBuffer));
    errors.collect(cdk.propertyValidator('predictiveScalingMode', cdk.validateString)(properties.predictiveScalingMode));
    errors.collect(cdk.propertyValidator('resourceId', cdk.requiredValidator)(properties.resourceId));
    errors.collect(cdk.propertyValidator('resourceId', cdk.validateString)(properties.resourceId));
    errors.collect(cdk.propertyValidator('scalableDimension', cdk.requiredValidator)(properties.scalableDimension));
    errors.collect(cdk.propertyValidator('scalableDimension', cdk.validateString)(properties.scalableDimension));
    errors.collect(cdk.propertyValidator('scalingPolicyUpdateBehavior', cdk.validateString)(properties.scalingPolicyUpdateBehavior));
    errors.collect(cdk.propertyValidator('scheduledActionBufferTime', cdk.validateNumber)(properties.scheduledActionBufferTime));
    errors.collect(cdk.propertyValidator('serviceNamespace', cdk.requiredValidator)(properties.serviceNamespace));
    errors.collect(cdk.propertyValidator('serviceNamespace', cdk.validateString)(properties.serviceNamespace));
    errors.collect(cdk.propertyValidator('targetTrackingConfigurations', cdk.requiredValidator)(properties.targetTrackingConfigurations));
    errors.collect(cdk.propertyValidator('targetTrackingConfigurations', cdk.listValidator(CfnScalingPlan_TargetTrackingConfigurationPropertyValidator))(properties.targetTrackingConfigurations));
    return errors.wrap('supplied properties not correct for "ScalingInstructionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.ScalingInstruction` resource
 *
 * @param properties - the TypeScript properties of a `ScalingInstructionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.ScalingInstruction` resource.
 */
// @ts-ignore TS6133
function cfnScalingPlanScalingInstructionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPlan_ScalingInstructionPropertyValidator(properties).assertSuccess();
    return {
        CustomizedLoadMetricSpecification: cfnScalingPlanCustomizedLoadMetricSpecificationPropertyToCloudFormation(properties.customizedLoadMetricSpecification),
        DisableDynamicScaling: cdk.booleanToCloudFormation(properties.disableDynamicScaling),
        MaxCapacity: cdk.numberToCloudFormation(properties.maxCapacity),
        MinCapacity: cdk.numberToCloudFormation(properties.minCapacity),
        PredefinedLoadMetricSpecification: cfnScalingPlanPredefinedLoadMetricSpecificationPropertyToCloudFormation(properties.predefinedLoadMetricSpecification),
        PredictiveScalingMaxCapacityBehavior: cdk.stringToCloudFormation(properties.predictiveScalingMaxCapacityBehavior),
        PredictiveScalingMaxCapacityBuffer: cdk.numberToCloudFormation(properties.predictiveScalingMaxCapacityBuffer),
        PredictiveScalingMode: cdk.stringToCloudFormation(properties.predictiveScalingMode),
        ResourceId: cdk.stringToCloudFormation(properties.resourceId),
        ScalableDimension: cdk.stringToCloudFormation(properties.scalableDimension),
        ScalingPolicyUpdateBehavior: cdk.stringToCloudFormation(properties.scalingPolicyUpdateBehavior),
        ScheduledActionBufferTime: cdk.numberToCloudFormation(properties.scheduledActionBufferTime),
        ServiceNamespace: cdk.stringToCloudFormation(properties.serviceNamespace),
        TargetTrackingConfigurations: cdk.listMapper(cfnScalingPlanTargetTrackingConfigurationPropertyToCloudFormation)(properties.targetTrackingConfigurations),
    };
}

// @ts-ignore TS6133
function CfnScalingPlanScalingInstructionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPlan.ScalingInstructionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPlan.ScalingInstructionProperty>();
    ret.addPropertyResult('customizedLoadMetricSpecification', 'CustomizedLoadMetricSpecification', properties.CustomizedLoadMetricSpecification != null ? CfnScalingPlanCustomizedLoadMetricSpecificationPropertyFromCloudFormation(properties.CustomizedLoadMetricSpecification) : undefined);
    ret.addPropertyResult('disableDynamicScaling', 'DisableDynamicScaling', properties.DisableDynamicScaling != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DisableDynamicScaling) : undefined);
    ret.addPropertyResult('maxCapacity', 'MaxCapacity', cfn_parse.FromCloudFormation.getNumber(properties.MaxCapacity));
    ret.addPropertyResult('minCapacity', 'MinCapacity', cfn_parse.FromCloudFormation.getNumber(properties.MinCapacity));
    ret.addPropertyResult('predefinedLoadMetricSpecification', 'PredefinedLoadMetricSpecification', properties.PredefinedLoadMetricSpecification != null ? CfnScalingPlanPredefinedLoadMetricSpecificationPropertyFromCloudFormation(properties.PredefinedLoadMetricSpecification) : undefined);
    ret.addPropertyResult('predictiveScalingMaxCapacityBehavior', 'PredictiveScalingMaxCapacityBehavior', properties.PredictiveScalingMaxCapacityBehavior != null ? cfn_parse.FromCloudFormation.getString(properties.PredictiveScalingMaxCapacityBehavior) : undefined);
    ret.addPropertyResult('predictiveScalingMaxCapacityBuffer', 'PredictiveScalingMaxCapacityBuffer', properties.PredictiveScalingMaxCapacityBuffer != null ? cfn_parse.FromCloudFormation.getNumber(properties.PredictiveScalingMaxCapacityBuffer) : undefined);
    ret.addPropertyResult('predictiveScalingMode', 'PredictiveScalingMode', properties.PredictiveScalingMode != null ? cfn_parse.FromCloudFormation.getString(properties.PredictiveScalingMode) : undefined);
    ret.addPropertyResult('resourceId', 'ResourceId', cfn_parse.FromCloudFormation.getString(properties.ResourceId));
    ret.addPropertyResult('scalableDimension', 'ScalableDimension', cfn_parse.FromCloudFormation.getString(properties.ScalableDimension));
    ret.addPropertyResult('scalingPolicyUpdateBehavior', 'ScalingPolicyUpdateBehavior', properties.ScalingPolicyUpdateBehavior != null ? cfn_parse.FromCloudFormation.getString(properties.ScalingPolicyUpdateBehavior) : undefined);
    ret.addPropertyResult('scheduledActionBufferTime', 'ScheduledActionBufferTime', properties.ScheduledActionBufferTime != null ? cfn_parse.FromCloudFormation.getNumber(properties.ScheduledActionBufferTime) : undefined);
    ret.addPropertyResult('serviceNamespace', 'ServiceNamespace', cfn_parse.FromCloudFormation.getString(properties.ServiceNamespace));
    ret.addPropertyResult('targetTrackingConfigurations', 'TargetTrackingConfigurations', cfn_parse.FromCloudFormation.getArray(CfnScalingPlanTargetTrackingConfigurationPropertyFromCloudFormation)(properties.TargetTrackingConfigurations));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPlan {
    /**
     * `TagFilter` is a subproperty of [ApplicationSource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-applicationsource.html) that specifies a tag for an application source to use with AWS Auto Scaling ( Auto Scaling Plans ).
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-tagfilter.html
     */
    export interface TagFilterProperty {
        /**
         * The tag key.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-tagfilter.html#cfn-autoscalingplans-scalingplan-tagfilter-key
         */
        readonly key: string;
        /**
         * The tag values (0 to 20).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-tagfilter.html#cfn-autoscalingplans-scalingplan-tagfilter-values
         */
        readonly values?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `TagFilterProperty`
 *
 * @param properties - the TypeScript properties of a `TagFilterProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPlan_TagFilterPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('key', cdk.requiredValidator)(properties.key));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('values', cdk.listValidator(cdk.validateString))(properties.values));
    return errors.wrap('supplied properties not correct for "TagFilterProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.TagFilter` resource
 *
 * @param properties - the TypeScript properties of a `TagFilterProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.TagFilter` resource.
 */
// @ts-ignore TS6133
function cfnScalingPlanTagFilterPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPlan_TagFilterPropertyValidator(properties).assertSuccess();
    return {
        Key: cdk.stringToCloudFormation(properties.key),
        Values: cdk.listMapper(cdk.stringToCloudFormation)(properties.values),
    };
}

// @ts-ignore TS6133
function CfnScalingPlanTagFilterPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPlan.TagFilterProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPlan.TagFilterProperty>();
    ret.addPropertyResult('key', 'Key', cfn_parse.FromCloudFormation.getString(properties.Key));
    ret.addPropertyResult('values', 'Values', properties.Values != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Values) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPlan {
    /**
     * `TargetTrackingConfiguration` is a subproperty of [ScalingInstruction](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-scalinginstruction.html) that specifies a target tracking configuration to use with AWS Auto Scaling ( Auto Scaling Plans ).
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-targettrackingconfiguration.html
     */
    export interface TargetTrackingConfigurationProperty {
        /**
         * A customized metric. You can specify either a predefined metric or a customized metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-targettrackingconfiguration.html#cfn-autoscalingplans-scalingplan-targettrackingconfiguration-customizedscalingmetricspecification
         */
        readonly customizedScalingMetricSpecification?: CfnScalingPlan.CustomizedScalingMetricSpecificationProperty | cdk.IResolvable;
        /**
         * Indicates whether scale in by the target tracking scaling policy is disabled. If the value is `true` , scale in is disabled and the target tracking scaling policy doesn't remove capacity from the scalable resource. Otherwise, scale in is enabled and the target tracking scaling policy can remove capacity from the scalable resource.
         *
         * The default value is `false` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-targettrackingconfiguration.html#cfn-autoscalingplans-scalingplan-targettrackingconfiguration-disablescalein
         */
        readonly disableScaleIn?: boolean | cdk.IResolvable;
        /**
         * The estimated time, in seconds, until a newly launched instance can contribute to the CloudWatch metrics. This value is used only if the resource is an Auto Scaling group.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-targettrackingconfiguration.html#cfn-autoscalingplans-scalingplan-targettrackingconfiguration-estimatedinstancewarmup
         */
        readonly estimatedInstanceWarmup?: number;
        /**
         * A predefined metric. You can specify either a predefined metric or a customized metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-targettrackingconfiguration.html#cfn-autoscalingplans-scalingplan-targettrackingconfiguration-predefinedscalingmetricspecification
         */
        readonly predefinedScalingMetricSpecification?: CfnScalingPlan.PredefinedScalingMetricSpecificationProperty | cdk.IResolvable;
        /**
         * The amount of time, in seconds, after a scale-in activity completes before another scale in activity can start. This value is not used if the scalable resource is an Auto Scaling group.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-targettrackingconfiguration.html#cfn-autoscalingplans-scalingplan-targettrackingconfiguration-scaleincooldown
         */
        readonly scaleInCooldown?: number;
        /**
         * The amount of time, in seconds, after a scale-out activity completes before another scale-out activity can start. This value is not used if the scalable resource is an Auto Scaling group.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-targettrackingconfiguration.html#cfn-autoscalingplans-scalingplan-targettrackingconfiguration-scaleoutcooldown
         */
        readonly scaleOutCooldown?: number;
        /**
         * The target value for the metric. Although this property accepts numbers of type Double, it won't accept values that are either too small or too large. Values must be in the range of -2^360 to 2^360.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscalingplans-scalingplan-targettrackingconfiguration.html#cfn-autoscalingplans-scalingplan-targettrackingconfiguration-targetvalue
         */
        readonly targetValue: number;
    }
}

/**
 * Determine whether the given properties match those of a `TargetTrackingConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `TargetTrackingConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPlan_TargetTrackingConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('customizedScalingMetricSpecification', CfnScalingPlan_CustomizedScalingMetricSpecificationPropertyValidator)(properties.customizedScalingMetricSpecification));
    errors.collect(cdk.propertyValidator('disableScaleIn', cdk.validateBoolean)(properties.disableScaleIn));
    errors.collect(cdk.propertyValidator('estimatedInstanceWarmup', cdk.validateNumber)(properties.estimatedInstanceWarmup));
    errors.collect(cdk.propertyValidator('predefinedScalingMetricSpecification', CfnScalingPlan_PredefinedScalingMetricSpecificationPropertyValidator)(properties.predefinedScalingMetricSpecification));
    errors.collect(cdk.propertyValidator('scaleInCooldown', cdk.validateNumber)(properties.scaleInCooldown));
    errors.collect(cdk.propertyValidator('scaleOutCooldown', cdk.validateNumber)(properties.scaleOutCooldown));
    errors.collect(cdk.propertyValidator('targetValue', cdk.requiredValidator)(properties.targetValue));
    errors.collect(cdk.propertyValidator('targetValue', cdk.validateNumber)(properties.targetValue));
    return errors.wrap('supplied properties not correct for "TargetTrackingConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.TargetTrackingConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `TargetTrackingConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScalingPlans::ScalingPlan.TargetTrackingConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnScalingPlanTargetTrackingConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPlan_TargetTrackingConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CustomizedScalingMetricSpecification: cfnScalingPlanCustomizedScalingMetricSpecificationPropertyToCloudFormation(properties.customizedScalingMetricSpecification),
        DisableScaleIn: cdk.booleanToCloudFormation(properties.disableScaleIn),
        EstimatedInstanceWarmup: cdk.numberToCloudFormation(properties.estimatedInstanceWarmup),
        PredefinedScalingMetricSpecification: cfnScalingPlanPredefinedScalingMetricSpecificationPropertyToCloudFormation(properties.predefinedScalingMetricSpecification),
        ScaleInCooldown: cdk.numberToCloudFormation(properties.scaleInCooldown),
        ScaleOutCooldown: cdk.numberToCloudFormation(properties.scaleOutCooldown),
        TargetValue: cdk.numberToCloudFormation(properties.targetValue),
    };
}

// @ts-ignore TS6133
function CfnScalingPlanTargetTrackingConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPlan.TargetTrackingConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPlan.TargetTrackingConfigurationProperty>();
    ret.addPropertyResult('customizedScalingMetricSpecification', 'CustomizedScalingMetricSpecification', properties.CustomizedScalingMetricSpecification != null ? CfnScalingPlanCustomizedScalingMetricSpecificationPropertyFromCloudFormation(properties.CustomizedScalingMetricSpecification) : undefined);
    ret.addPropertyResult('disableScaleIn', 'DisableScaleIn', properties.DisableScaleIn != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DisableScaleIn) : undefined);
    ret.addPropertyResult('estimatedInstanceWarmup', 'EstimatedInstanceWarmup', properties.EstimatedInstanceWarmup != null ? cfn_parse.FromCloudFormation.getNumber(properties.EstimatedInstanceWarmup) : undefined);
    ret.addPropertyResult('predefinedScalingMetricSpecification', 'PredefinedScalingMetricSpecification', properties.PredefinedScalingMetricSpecification != null ? CfnScalingPlanPredefinedScalingMetricSpecificationPropertyFromCloudFormation(properties.PredefinedScalingMetricSpecification) : undefined);
    ret.addPropertyResult('scaleInCooldown', 'ScaleInCooldown', properties.ScaleInCooldown != null ? cfn_parse.FromCloudFormation.getNumber(properties.ScaleInCooldown) : undefined);
    ret.addPropertyResult('scaleOutCooldown', 'ScaleOutCooldown', properties.ScaleOutCooldown != null ? cfn_parse.FromCloudFormation.getNumber(properties.ScaleOutCooldown) : undefined);
    ret.addPropertyResult('targetValue', 'TargetValue', cfn_parse.FromCloudFormation.getNumber(properties.TargetValue));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
