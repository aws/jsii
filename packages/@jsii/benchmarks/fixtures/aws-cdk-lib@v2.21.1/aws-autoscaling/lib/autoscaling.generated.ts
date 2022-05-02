// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:13:12.852Z","fingerprint":"5m4y70Ho4DhQf2iHPooE98HG8A3otnCbOnbm4lcuvdU="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnAutoScalingGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html
 */
export interface CfnAutoScalingGroupProps {

    /**
     * The maximum size of the group.
     *
     * > With a mixed instances policy that uses instance weighting, Amazon EC2 Auto Scaling may need to go above `MaxSize` to meet your capacity requirements. In this event, Amazon EC2 Auto Scaling will never go above `MaxSize` by more than your largest instance weight (weights that define how many units each instance contributes to the desired capacity of the group).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-maxsize
     */
    readonly maxSize: string;

    /**
     * The minimum size of the group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-minsize
     */
    readonly minSize: string;

    /**
     * The name of the Auto Scaling group. This name must be unique per Region per account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-autoscaling-autoscalinggroup-autoscalinggroupname
     */
    readonly autoScalingGroupName?: string;

    /**
     * A list of Availability Zones where instances in the Auto Scaling group can be created. You must specify one of the following properties: `VPCZoneIdentifier` or `AvailabilityZones` . If your account supports EC2-Classic and VPC, this property is required to create an Auto Scaling group that launches instances into EC2-Classic.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-availabilityzones
     */
    readonly availabilityZones?: string[];

    /**
     * Indicates whether Capacity Rebalancing is enabled. For more information, see [Use Capacity Rebalancing to handle Amazon EC2 Spot Interruptions](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-capacity-rebalancing.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-capacityrebalance
     */
    readonly capacityRebalance?: boolean | cdk.IResolvable;

    /**
     * Reserved.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-context
     */
    readonly context?: string;

    /**
     * The amount of time, in seconds, after a scaling activity completes before another scaling activity can start. The default value is `300` . This setting applies when using simple scaling policies, but not when using other scaling policies or scheduled scaling. For more information, see [Scaling cooldowns for Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/Cooldown.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-cooldown
     */
    readonly cooldown?: string;

    /**
     * The desired capacity is the initial capacity of the Auto Scaling group at the time of its creation and the capacity it attempts to maintain. It can scale beyond this capacity if you configure automatic scaling.
     *
     * The number must be greater than or equal to the minimum size of the group and less than or equal to the maximum size of the group. If you do not specify a desired capacity when creating the stack, the default is the minimum size of the group.
     *
     * CloudFormation marks the Auto Scaling group as successful (by setting its status to CREATE_COMPLETE) when the desired capacity is reached. However, if a maximum Spot price is set in the launch template or launch configuration that you specified, then desired capacity is not used as a criteria for success. Whether your request is fulfilled depends on Spot Instance capacity and your maximum price.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-desiredcapacity
     */
    readonly desiredCapacity?: string;

    /**
     * The unit of measurement for the value specified for desired capacity. Amazon EC2 Auto Scaling supports `DesiredCapacityType` for attribute-based instance type selection only. For more information, see [Create an Auto Scaling group using attribute-based instance type selection](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-asg-instance-type-requirements.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * By default, Amazon EC2 Auto Scaling specifies `units` , which translates into number of instances.
     *
     * Valid values: `units` | `vcpu` | `memory-mib`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-desiredcapacitytype
     */
    readonly desiredCapacityType?: string;

    /**
     * The amount of time, in seconds, that Amazon EC2 Auto Scaling waits before checking the health status of an EC2 instance that has come into service and marking it unhealthy due to a failed health check. The default value is `0` . For more information, see [Health checks for Auto Scaling instances](https://docs.aws.amazon.com/autoscaling/ec2/userguide/healthcheck.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * If you are adding an `ELB` health check, you must specify this property.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-healthcheckgraceperiod
     */
    readonly healthCheckGracePeriod?: number;

    /**
     * The service to use for the health checks. The valid values are `EC2` (default) and `ELB` . If you configure an Auto Scaling group to use load balancer (ELB) health checks, it considers the instance unhealthy if it fails either the EC2 status checks or the load balancer health checks. For more information, see [Health checks for Auto Scaling instances](https://docs.aws.amazon.com/autoscaling/ec2/userguide/healthcheck.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-healthchecktype
     */
    readonly healthCheckType?: string;

    /**
     * The ID of the instance used to base the launch configuration on. For more information, see [Create an Auto Scaling group using an EC2 instance](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-asg-from-instance.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * If you specify `LaunchTemplate` , `MixedInstancesPolicy` , or `LaunchConfigurationName` , don't specify `InstanceId` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-instanceid
     */
    readonly instanceId?: string;

    /**
     * The name of the [launch configuration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-launchconfig.html) to use to launch instances.
     *
     * Required only if you don't specify `LaunchTemplate` , `MixedInstancesPolicy` , or `InstanceId` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-launchconfigurationname
     */
    readonly launchConfigurationName?: string;

    /**
     * Properties used to specify the [launch template](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-launchtemplate.html) and version to use to launch instances. You can alternatively associate a launch template to the Auto Scaling group by specifying a `MixedInstancesPolicy` .
     *
     * If you omit this property, you must specify `MixedInstancesPolicy` , `LaunchConfigurationName` , or `InstanceId` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-launchtemplate
     */
    readonly launchTemplate?: CfnAutoScalingGroup.LaunchTemplateSpecificationProperty | cdk.IResolvable;

    /**
     * One or more lifecycle hooks for the group, which specify actions to perform when Amazon EC2 Auto Scaling launches or terminates instances.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-autoscaling-autoscalinggroup-lifecyclehookspecificationlist
     */
    readonly lifecycleHookSpecificationList?: Array<CfnAutoScalingGroup.LifecycleHookSpecificationProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A list of Classic Load Balancers associated with this Auto Scaling group. For Application Load Balancers, Network Load Balancers, and Gateway Load Balancers, specify the `TargetGroupARNs` property instead.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-loadbalancernames
     */
    readonly loadBalancerNames?: string[];

    /**
     * The maximum amount of time, in seconds, that an instance can be in service. The default is null. If specified, the value must be either 0 or a number equal to or greater than 86,400 seconds (1 day). For more information, see [Replace Auto Scaling instances based on maximum instance lifetime](https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-max-instance-lifetime.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-maxinstancelifetime
     */
    readonly maxInstanceLifetime?: number;

    /**
     * Enables the monitoring of group metrics of an Auto Scaling group. By default, these metrics are disabled.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-metricscollection
     */
    readonly metricsCollection?: Array<CfnAutoScalingGroup.MetricsCollectionProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * An embedded object that specifies a mixed instances policy.
     *
     * The policy includes properties that not only define the distribution of On-Demand Instances and Spot Instances, the maximum price to pay for Spot Instances (optional), and how the Auto Scaling group allocates instance types to fulfill On-Demand and Spot capacities, but also the properties that specify the instance configuration information—the launch template and instance types. The policy can also include a weight for each instance type and different launch templates for individual instance types.
     *
     * For more information, see [Auto Scaling groups with multiple instance types and purchase options](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-mixed-instances-groups.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-mixedinstancespolicy
     */
    readonly mixedInstancesPolicy?: CfnAutoScalingGroup.MixedInstancesPolicyProperty | cdk.IResolvable;

    /**
     * Indicates whether newly launched instances are protected from termination by Amazon EC2 Auto Scaling when scaling in. For more information about preventing instances from terminating on scale in, see [Use instance scale-in protection](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-instance-protection.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-newinstancesprotectedfromscalein
     */
    readonly newInstancesProtectedFromScaleIn?: boolean | cdk.IResolvable;

    /**
     * Configures an Auto Scaling group to send notifications when specified events take place.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-notificationconfigurations
     */
    readonly notificationConfigurations?: Array<CfnAutoScalingGroup.NotificationConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The name of the placement group into which you want to launch your instances. For more information, see [Placement groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * > A *cluster* placement group is a logical grouping of instances within a single Availability Zone. You cannot specify multiple Availability Zones and a cluster placement group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-placementgroup
     */
    readonly placementGroup?: string;

    /**
     * The Amazon Resource Name (ARN) of the service-linked role that the Auto Scaling group uses to call other AWS services on your behalf. By default, Amazon EC2 Auto Scaling uses a service-linked role named `AWSServiceRoleForAutoScaling` , which it creates if it does not exist. For more information, see [Service-linked roles for Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-service-linked-role.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-autoscaling-autoscalinggroup-servicelinkedrolearn
     */
    readonly serviceLinkedRoleArn?: string;

    /**
     * One or more tags. You can tag your Auto Scaling group and propagate the tags to the Amazon EC2 instances it launches. For more information, see [Tag Auto Scaling groups and instances](https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-tagging.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-tags
     */
    readonly tags?: CfnAutoScalingGroup.TagPropertyProperty[];

    /**
     * One or more Amazon Resource Names (ARN) of load balancer target groups to associate with the Auto Scaling group. Instances are registered as targets in a target group, and traffic is routed to the target group. For more information, see [Use Elastic Load Balancing to distribute traffic across the instances in your Auto Scaling group](https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-targetgrouparns
     */
    readonly targetGroupArns?: string[];

    /**
     * A policy or a list of policies that are used to select the instances to terminate. The policies are executed in the order that you list them. The termination policies supported by Amazon EC2 Auto Scaling: `OldestInstance` , `OldestLaunchConfiguration` , `NewestInstance` , `ClosestToNextInstanceHour` , `Default` , `OldestLaunchTemplate` , and `AllocationStrategy` . For more information, see [Control which Auto Scaling instances terminate during scale in](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-termination.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-termpolicy
     */
    readonly terminationPolicies?: string[];

    /**
     * A list of subnet IDs for a virtual private cloud (VPC) where instances in the Auto Scaling group can be created. If you specify `VPCZoneIdentifier` with `AvailabilityZones` , the subnets that you specify for this property must reside in those Availability Zones.
     *
     * If this resource specifies public subnets and is also in a VPC that is defined in the same stack template, you must use the [DependsOn attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html) to declare a dependency on the [VPC-gateway attachment](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc-gateway-attachment.html) .
     *
     * > When you update `VPCZoneIdentifier` , this retains the same Auto Scaling group and replaces old instances with new ones, according to the specified subnets. You can optionally specify how CloudFormation handles these updates by using an [UpdatePolicy attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatepolicy.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-vpczoneidentifier
     */
    readonly vpcZoneIdentifier?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnAutoScalingGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnAutoScalingGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('autoScalingGroupName', cdk.validateString)(properties.autoScalingGroupName));
    errors.collect(cdk.propertyValidator('availabilityZones', cdk.listValidator(cdk.validateString))(properties.availabilityZones));
    errors.collect(cdk.propertyValidator('capacityRebalance', cdk.validateBoolean)(properties.capacityRebalance));
    errors.collect(cdk.propertyValidator('context', cdk.validateString)(properties.context));
    errors.collect(cdk.propertyValidator('cooldown', cdk.validateString)(properties.cooldown));
    errors.collect(cdk.propertyValidator('desiredCapacity', cdk.validateString)(properties.desiredCapacity));
    errors.collect(cdk.propertyValidator('desiredCapacityType', cdk.validateString)(properties.desiredCapacityType));
    errors.collect(cdk.propertyValidator('healthCheckGracePeriod', cdk.validateNumber)(properties.healthCheckGracePeriod));
    errors.collect(cdk.propertyValidator('healthCheckType', cdk.validateString)(properties.healthCheckType));
    errors.collect(cdk.propertyValidator('instanceId', cdk.validateString)(properties.instanceId));
    errors.collect(cdk.propertyValidator('launchConfigurationName', cdk.validateString)(properties.launchConfigurationName));
    errors.collect(cdk.propertyValidator('launchTemplate', CfnAutoScalingGroup_LaunchTemplateSpecificationPropertyValidator)(properties.launchTemplate));
    errors.collect(cdk.propertyValidator('lifecycleHookSpecificationList', cdk.listValidator(CfnAutoScalingGroup_LifecycleHookSpecificationPropertyValidator))(properties.lifecycleHookSpecificationList));
    errors.collect(cdk.propertyValidator('loadBalancerNames', cdk.listValidator(cdk.validateString))(properties.loadBalancerNames));
    errors.collect(cdk.propertyValidator('maxInstanceLifetime', cdk.validateNumber)(properties.maxInstanceLifetime));
    errors.collect(cdk.propertyValidator('maxSize', cdk.requiredValidator)(properties.maxSize));
    errors.collect(cdk.propertyValidator('maxSize', cdk.validateString)(properties.maxSize));
    errors.collect(cdk.propertyValidator('metricsCollection', cdk.listValidator(CfnAutoScalingGroup_MetricsCollectionPropertyValidator))(properties.metricsCollection));
    errors.collect(cdk.propertyValidator('minSize', cdk.requiredValidator)(properties.minSize));
    errors.collect(cdk.propertyValidator('minSize', cdk.validateString)(properties.minSize));
    errors.collect(cdk.propertyValidator('mixedInstancesPolicy', CfnAutoScalingGroup_MixedInstancesPolicyPropertyValidator)(properties.mixedInstancesPolicy));
    errors.collect(cdk.propertyValidator('newInstancesProtectedFromScaleIn', cdk.validateBoolean)(properties.newInstancesProtectedFromScaleIn));
    errors.collect(cdk.propertyValidator('notificationConfigurations', cdk.listValidator(CfnAutoScalingGroup_NotificationConfigurationPropertyValidator))(properties.notificationConfigurations));
    errors.collect(cdk.propertyValidator('placementGroup', cdk.validateString)(properties.placementGroup));
    errors.collect(cdk.propertyValidator('serviceLinkedRoleArn', cdk.validateString)(properties.serviceLinkedRoleArn));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(CfnAutoScalingGroup_TagPropertyPropertyValidator))(properties.tags));
    errors.collect(cdk.propertyValidator('targetGroupArns', cdk.listValidator(cdk.validateString))(properties.targetGroupArns));
    errors.collect(cdk.propertyValidator('terminationPolicies', cdk.listValidator(cdk.validateString))(properties.terminationPolicies));
    errors.collect(cdk.propertyValidator('vpcZoneIdentifier', cdk.listValidator(cdk.validateString))(properties.vpcZoneIdentifier));
    return errors.wrap('supplied properties not correct for "CfnAutoScalingGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnAutoScalingGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroupPropsValidator(properties).assertSuccess();
    return {
        MaxSize: cdk.stringToCloudFormation(properties.maxSize),
        MinSize: cdk.stringToCloudFormation(properties.minSize),
        AutoScalingGroupName: cdk.stringToCloudFormation(properties.autoScalingGroupName),
        AvailabilityZones: cdk.listMapper(cdk.stringToCloudFormation)(properties.availabilityZones),
        CapacityRebalance: cdk.booleanToCloudFormation(properties.capacityRebalance),
        Context: cdk.stringToCloudFormation(properties.context),
        Cooldown: cdk.stringToCloudFormation(properties.cooldown),
        DesiredCapacity: cdk.stringToCloudFormation(properties.desiredCapacity),
        DesiredCapacityType: cdk.stringToCloudFormation(properties.desiredCapacityType),
        HealthCheckGracePeriod: cdk.numberToCloudFormation(properties.healthCheckGracePeriod),
        HealthCheckType: cdk.stringToCloudFormation(properties.healthCheckType),
        InstanceId: cdk.stringToCloudFormation(properties.instanceId),
        LaunchConfigurationName: cdk.stringToCloudFormation(properties.launchConfigurationName),
        LaunchTemplate: cfnAutoScalingGroupLaunchTemplateSpecificationPropertyToCloudFormation(properties.launchTemplate),
        LifecycleHookSpecificationList: cdk.listMapper(cfnAutoScalingGroupLifecycleHookSpecificationPropertyToCloudFormation)(properties.lifecycleHookSpecificationList),
        LoadBalancerNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.loadBalancerNames),
        MaxInstanceLifetime: cdk.numberToCloudFormation(properties.maxInstanceLifetime),
        MetricsCollection: cdk.listMapper(cfnAutoScalingGroupMetricsCollectionPropertyToCloudFormation)(properties.metricsCollection),
        MixedInstancesPolicy: cfnAutoScalingGroupMixedInstancesPolicyPropertyToCloudFormation(properties.mixedInstancesPolicy),
        NewInstancesProtectedFromScaleIn: cdk.booleanToCloudFormation(properties.newInstancesProtectedFromScaleIn),
        NotificationConfigurations: cdk.listMapper(cfnAutoScalingGroupNotificationConfigurationPropertyToCloudFormation)(properties.notificationConfigurations),
        PlacementGroup: cdk.stringToCloudFormation(properties.placementGroup),
        ServiceLinkedRoleARN: cdk.stringToCloudFormation(properties.serviceLinkedRoleArn),
        Tags: cdk.listMapper(cfnAutoScalingGroupTagPropertyPropertyToCloudFormation)(properties.tags),
        TargetGroupARNs: cdk.listMapper(cdk.stringToCloudFormation)(properties.targetGroupArns),
        TerminationPolicies: cdk.listMapper(cdk.stringToCloudFormation)(properties.terminationPolicies),
        VPCZoneIdentifier: cdk.listMapper(cdk.stringToCloudFormation)(properties.vpcZoneIdentifier),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroupProps>();
    ret.addPropertyResult('maxSize', 'MaxSize', cfn_parse.FromCloudFormation.getString(properties.MaxSize));
    ret.addPropertyResult('minSize', 'MinSize', cfn_parse.FromCloudFormation.getString(properties.MinSize));
    ret.addPropertyResult('autoScalingGroupName', 'AutoScalingGroupName', properties.AutoScalingGroupName != null ? cfn_parse.FromCloudFormation.getString(properties.AutoScalingGroupName) : undefined);
    ret.addPropertyResult('availabilityZones', 'AvailabilityZones', properties.AvailabilityZones != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AvailabilityZones) : undefined);
    ret.addPropertyResult('capacityRebalance', 'CapacityRebalance', properties.CapacityRebalance != null ? cfn_parse.FromCloudFormation.getBoolean(properties.CapacityRebalance) : undefined);
    ret.addPropertyResult('context', 'Context', properties.Context != null ? cfn_parse.FromCloudFormation.getString(properties.Context) : undefined);
    ret.addPropertyResult('cooldown', 'Cooldown', properties.Cooldown != null ? cfn_parse.FromCloudFormation.getString(properties.Cooldown) : undefined);
    ret.addPropertyResult('desiredCapacity', 'DesiredCapacity', properties.DesiredCapacity != null ? cfn_parse.FromCloudFormation.getString(properties.DesiredCapacity) : undefined);
    ret.addPropertyResult('desiredCapacityType', 'DesiredCapacityType', properties.DesiredCapacityType != null ? cfn_parse.FromCloudFormation.getString(properties.DesiredCapacityType) : undefined);
    ret.addPropertyResult('healthCheckGracePeriod', 'HealthCheckGracePeriod', properties.HealthCheckGracePeriod != null ? cfn_parse.FromCloudFormation.getNumber(properties.HealthCheckGracePeriod) : undefined);
    ret.addPropertyResult('healthCheckType', 'HealthCheckType', properties.HealthCheckType != null ? cfn_parse.FromCloudFormation.getString(properties.HealthCheckType) : undefined);
    ret.addPropertyResult('instanceId', 'InstanceId', properties.InstanceId != null ? cfn_parse.FromCloudFormation.getString(properties.InstanceId) : undefined);
    ret.addPropertyResult('launchConfigurationName', 'LaunchConfigurationName', properties.LaunchConfigurationName != null ? cfn_parse.FromCloudFormation.getString(properties.LaunchConfigurationName) : undefined);
    ret.addPropertyResult('launchTemplate', 'LaunchTemplate', properties.LaunchTemplate != null ? CfnAutoScalingGroupLaunchTemplateSpecificationPropertyFromCloudFormation(properties.LaunchTemplate) : undefined);
    ret.addPropertyResult('lifecycleHookSpecificationList', 'LifecycleHookSpecificationList', properties.LifecycleHookSpecificationList != null ? cfn_parse.FromCloudFormation.getArray(CfnAutoScalingGroupLifecycleHookSpecificationPropertyFromCloudFormation)(properties.LifecycleHookSpecificationList) : undefined);
    ret.addPropertyResult('loadBalancerNames', 'LoadBalancerNames', properties.LoadBalancerNames != null ? cfn_parse.FromCloudFormation.getStringArray(properties.LoadBalancerNames) : undefined);
    ret.addPropertyResult('maxInstanceLifetime', 'MaxInstanceLifetime', properties.MaxInstanceLifetime != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxInstanceLifetime) : undefined);
    ret.addPropertyResult('metricsCollection', 'MetricsCollection', properties.MetricsCollection != null ? cfn_parse.FromCloudFormation.getArray(CfnAutoScalingGroupMetricsCollectionPropertyFromCloudFormation)(properties.MetricsCollection) : undefined);
    ret.addPropertyResult('mixedInstancesPolicy', 'MixedInstancesPolicy', properties.MixedInstancesPolicy != null ? CfnAutoScalingGroupMixedInstancesPolicyPropertyFromCloudFormation(properties.MixedInstancesPolicy) : undefined);
    ret.addPropertyResult('newInstancesProtectedFromScaleIn', 'NewInstancesProtectedFromScaleIn', properties.NewInstancesProtectedFromScaleIn != null ? cfn_parse.FromCloudFormation.getBoolean(properties.NewInstancesProtectedFromScaleIn) : undefined);
    ret.addPropertyResult('notificationConfigurations', 'NotificationConfigurations', properties.NotificationConfigurations != null ? cfn_parse.FromCloudFormation.getArray(CfnAutoScalingGroupNotificationConfigurationPropertyFromCloudFormation)(properties.NotificationConfigurations) : undefined);
    ret.addPropertyResult('placementGroup', 'PlacementGroup', properties.PlacementGroup != null ? cfn_parse.FromCloudFormation.getString(properties.PlacementGroup) : undefined);
    ret.addPropertyResult('serviceLinkedRoleArn', 'ServiceLinkedRoleARN', properties.ServiceLinkedRoleARN != null ? cfn_parse.FromCloudFormation.getString(properties.ServiceLinkedRoleARN) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(CfnAutoScalingGroupTagPropertyPropertyFromCloudFormation)(properties.Tags) : undefined as any);
    ret.addPropertyResult('targetGroupArns', 'TargetGroupARNs', properties.TargetGroupARNs != null ? cfn_parse.FromCloudFormation.getStringArray(properties.TargetGroupARNs) : undefined);
    ret.addPropertyResult('terminationPolicies', 'TerminationPolicies', properties.TerminationPolicies != null ? cfn_parse.FromCloudFormation.getStringArray(properties.TerminationPolicies) : undefined);
    ret.addPropertyResult('vpcZoneIdentifier', 'VPCZoneIdentifier', properties.VPCZoneIdentifier != null ? cfn_parse.FromCloudFormation.getStringArray(properties.VPCZoneIdentifier) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AutoScaling::AutoScalingGroup`
 *
 * The `AWS::AutoScaling::AutoScalingGroup` resource defines an Amazon EC2 Auto Scaling group, which is a collection of Amazon EC2 instances that are treated as a logical grouping for the purposes of automatic scaling and management.
 *
 * For more information about Amazon EC2 Auto Scaling, see the [Amazon EC2 Auto Scaling User Guide](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html) .
 *
 * > Amazon EC2 Auto Scaling configures instances launched as part of an Auto Scaling group using either a launch template or a launch configuration. We strongly recommend that you do not use launch configurations. They do not provide full functionality for Amazon EC2 Auto Scaling or Amazon EC2. For more information, see [Amazon EC2 Auto Scaling will no longer add support for new EC2 features to Launch Configurations](https://docs.aws.amazon.com/compute/amazon-ec2-auto-scaling-will-no-longer-add-support-for-new-ec2-features-to-launch-configurations/) on the AWS Compute Blog.
 *
 * @cloudformationResource AWS::AutoScaling::AutoScalingGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html
 */
export class CfnAutoScalingGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AutoScaling::AutoScalingGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAutoScalingGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAutoScalingGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAutoScalingGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The maximum size of the group.
     *
     * > With a mixed instances policy that uses instance weighting, Amazon EC2 Auto Scaling may need to go above `MaxSize` to meet your capacity requirements. In this event, Amazon EC2 Auto Scaling will never go above `MaxSize` by more than your largest instance weight (weights that define how many units each instance contributes to the desired capacity of the group).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-maxsize
     */
    public maxSize: string;

    /**
     * The minimum size of the group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-minsize
     */
    public minSize: string;

    /**
     * The name of the Auto Scaling group. This name must be unique per Region per account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-autoscaling-autoscalinggroup-autoscalinggroupname
     */
    public autoScalingGroupName: string | undefined;

    /**
     * A list of Availability Zones where instances in the Auto Scaling group can be created. You must specify one of the following properties: `VPCZoneIdentifier` or `AvailabilityZones` . If your account supports EC2-Classic and VPC, this property is required to create an Auto Scaling group that launches instances into EC2-Classic.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-availabilityzones
     */
    public availabilityZones: string[] | undefined;

    /**
     * Indicates whether Capacity Rebalancing is enabled. For more information, see [Use Capacity Rebalancing to handle Amazon EC2 Spot Interruptions](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-capacity-rebalancing.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-capacityrebalance
     */
    public capacityRebalance: boolean | cdk.IResolvable | undefined;

    /**
     * Reserved.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-context
     */
    public context: string | undefined;

    /**
     * The amount of time, in seconds, after a scaling activity completes before another scaling activity can start. The default value is `300` . This setting applies when using simple scaling policies, but not when using other scaling policies or scheduled scaling. For more information, see [Scaling cooldowns for Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/Cooldown.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-cooldown
     */
    public cooldown: string | undefined;

    /**
     * The desired capacity is the initial capacity of the Auto Scaling group at the time of its creation and the capacity it attempts to maintain. It can scale beyond this capacity if you configure automatic scaling.
     *
     * The number must be greater than or equal to the minimum size of the group and less than or equal to the maximum size of the group. If you do not specify a desired capacity when creating the stack, the default is the minimum size of the group.
     *
     * CloudFormation marks the Auto Scaling group as successful (by setting its status to CREATE_COMPLETE) when the desired capacity is reached. However, if a maximum Spot price is set in the launch template or launch configuration that you specified, then desired capacity is not used as a criteria for success. Whether your request is fulfilled depends on Spot Instance capacity and your maximum price.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-desiredcapacity
     */
    public desiredCapacity: string | undefined;

    /**
     * The unit of measurement for the value specified for desired capacity. Amazon EC2 Auto Scaling supports `DesiredCapacityType` for attribute-based instance type selection only. For more information, see [Create an Auto Scaling group using attribute-based instance type selection](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-asg-instance-type-requirements.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * By default, Amazon EC2 Auto Scaling specifies `units` , which translates into number of instances.
     *
     * Valid values: `units` | `vcpu` | `memory-mib`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-desiredcapacitytype
     */
    public desiredCapacityType: string | undefined;

    /**
     * The amount of time, in seconds, that Amazon EC2 Auto Scaling waits before checking the health status of an EC2 instance that has come into service and marking it unhealthy due to a failed health check. The default value is `0` . For more information, see [Health checks for Auto Scaling instances](https://docs.aws.amazon.com/autoscaling/ec2/userguide/healthcheck.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * If you are adding an `ELB` health check, you must specify this property.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-healthcheckgraceperiod
     */
    public healthCheckGracePeriod: number | undefined;

    /**
     * The service to use for the health checks. The valid values are `EC2` (default) and `ELB` . If you configure an Auto Scaling group to use load balancer (ELB) health checks, it considers the instance unhealthy if it fails either the EC2 status checks or the load balancer health checks. For more information, see [Health checks for Auto Scaling instances](https://docs.aws.amazon.com/autoscaling/ec2/userguide/healthcheck.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-healthchecktype
     */
    public healthCheckType: string | undefined;

    /**
     * The ID of the instance used to base the launch configuration on. For more information, see [Create an Auto Scaling group using an EC2 instance](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-asg-from-instance.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * If you specify `LaunchTemplate` , `MixedInstancesPolicy` , or `LaunchConfigurationName` , don't specify `InstanceId` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-instanceid
     */
    public instanceId: string | undefined;

    /**
     * The name of the [launch configuration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-launchconfig.html) to use to launch instances.
     *
     * Required only if you don't specify `LaunchTemplate` , `MixedInstancesPolicy` , or `InstanceId` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-launchconfigurationname
     */
    public launchConfigurationName: string | undefined;

    /**
     * Properties used to specify the [launch template](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-launchtemplate.html) and version to use to launch instances. You can alternatively associate a launch template to the Auto Scaling group by specifying a `MixedInstancesPolicy` .
     *
     * If you omit this property, you must specify `MixedInstancesPolicy` , `LaunchConfigurationName` , or `InstanceId` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-launchtemplate
     */
    public launchTemplate: CfnAutoScalingGroup.LaunchTemplateSpecificationProperty | cdk.IResolvable | undefined;

    /**
     * One or more lifecycle hooks for the group, which specify actions to perform when Amazon EC2 Auto Scaling launches or terminates instances.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-autoscaling-autoscalinggroup-lifecyclehookspecificationlist
     */
    public lifecycleHookSpecificationList: Array<CfnAutoScalingGroup.LifecycleHookSpecificationProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * A list of Classic Load Balancers associated with this Auto Scaling group. For Application Load Balancers, Network Load Balancers, and Gateway Load Balancers, specify the `TargetGroupARNs` property instead.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-loadbalancernames
     */
    public loadBalancerNames: string[] | undefined;

    /**
     * The maximum amount of time, in seconds, that an instance can be in service. The default is null. If specified, the value must be either 0 or a number equal to or greater than 86,400 seconds (1 day). For more information, see [Replace Auto Scaling instances based on maximum instance lifetime](https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-max-instance-lifetime.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-maxinstancelifetime
     */
    public maxInstanceLifetime: number | undefined;

    /**
     * Enables the monitoring of group metrics of an Auto Scaling group. By default, these metrics are disabled.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-metricscollection
     */
    public metricsCollection: Array<CfnAutoScalingGroup.MetricsCollectionProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * An embedded object that specifies a mixed instances policy.
     *
     * The policy includes properties that not only define the distribution of On-Demand Instances and Spot Instances, the maximum price to pay for Spot Instances (optional), and how the Auto Scaling group allocates instance types to fulfill On-Demand and Spot capacities, but also the properties that specify the instance configuration information—the launch template and instance types. The policy can also include a weight for each instance type and different launch templates for individual instance types.
     *
     * For more information, see [Auto Scaling groups with multiple instance types and purchase options](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-mixed-instances-groups.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-mixedinstancespolicy
     */
    public mixedInstancesPolicy: CfnAutoScalingGroup.MixedInstancesPolicyProperty | cdk.IResolvable | undefined;

    /**
     * Indicates whether newly launched instances are protected from termination by Amazon EC2 Auto Scaling when scaling in. For more information about preventing instances from terminating on scale in, see [Use instance scale-in protection](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-instance-protection.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-newinstancesprotectedfromscalein
     */
    public newInstancesProtectedFromScaleIn: boolean | cdk.IResolvable | undefined;

    /**
     * Configures an Auto Scaling group to send notifications when specified events take place.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-notificationconfigurations
     */
    public notificationConfigurations: Array<CfnAutoScalingGroup.NotificationConfigurationProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The name of the placement group into which you want to launch your instances. For more information, see [Placement groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * > A *cluster* placement group is a logical grouping of instances within a single Availability Zone. You cannot specify multiple Availability Zones and a cluster placement group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-placementgroup
     */
    public placementGroup: string | undefined;

    /**
     * The Amazon Resource Name (ARN) of the service-linked role that the Auto Scaling group uses to call other AWS services on your behalf. By default, Amazon EC2 Auto Scaling uses a service-linked role named `AWSServiceRoleForAutoScaling` , which it creates if it does not exist. For more information, see [Service-linked roles for Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-service-linked-role.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-autoscaling-autoscalinggroup-servicelinkedrolearn
     */
    public serviceLinkedRoleArn: string | undefined;

    /**
     * One or more tags. You can tag your Auto Scaling group and propagate the tags to the Amazon EC2 instances it launches. For more information, see [Tag Auto Scaling groups and instances](https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-tagging.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * One or more Amazon Resource Names (ARN) of load balancer target groups to associate with the Auto Scaling group. Instances are registered as targets in a target group, and traffic is routed to the target group. For more information, see [Use Elastic Load Balancing to distribute traffic across the instances in your Auto Scaling group](https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-targetgrouparns
     */
    public targetGroupArns: string[] | undefined;

    /**
     * A policy or a list of policies that are used to select the instances to terminate. The policies are executed in the order that you list them. The termination policies supported by Amazon EC2 Auto Scaling: `OldestInstance` , `OldestLaunchConfiguration` , `NewestInstance` , `ClosestToNextInstanceHour` , `Default` , `OldestLaunchTemplate` , and `AllocationStrategy` . For more information, see [Control which Auto Scaling instances terminate during scale in](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-termination.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-termpolicy
     */
    public terminationPolicies: string[] | undefined;

    /**
     * A list of subnet IDs for a virtual private cloud (VPC) where instances in the Auto Scaling group can be created. If you specify `VPCZoneIdentifier` with `AvailabilityZones` , the subnets that you specify for this property must reside in those Availability Zones.
     *
     * If this resource specifies public subnets and is also in a VPC that is defined in the same stack template, you must use the [DependsOn attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html) to declare a dependency on the [VPC-gateway attachment](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc-gateway-attachment.html) .
     *
     * > When you update `VPCZoneIdentifier` , this retains the same Auto Scaling group and replaces old instances with new ones, according to the specified subnets. You can optionally specify how CloudFormation handles these updates by using an [UpdatePolicy attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatepolicy.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#cfn-as-group-vpczoneidentifier
     */
    public vpcZoneIdentifier: string[] | undefined;

    /**
     * Create a new `AWS::AutoScaling::AutoScalingGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAutoScalingGroupProps) {
        super(scope, id, { type: CfnAutoScalingGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'maxSize', this);
        cdk.requireProperty(props, 'minSize', this);

        this.maxSize = props.maxSize;
        this.minSize = props.minSize;
        this.autoScalingGroupName = props.autoScalingGroupName;
        this.availabilityZones = props.availabilityZones;
        this.capacityRebalance = props.capacityRebalance;
        this.context = props.context;
        this.cooldown = props.cooldown;
        this.desiredCapacity = props.desiredCapacity;
        this.desiredCapacityType = props.desiredCapacityType;
        this.healthCheckGracePeriod = props.healthCheckGracePeriod;
        this.healthCheckType = props.healthCheckType;
        this.instanceId = props.instanceId;
        this.launchConfigurationName = props.launchConfigurationName;
        this.launchTemplate = props.launchTemplate;
        this.lifecycleHookSpecificationList = props.lifecycleHookSpecificationList;
        this.loadBalancerNames = props.loadBalancerNames;
        this.maxInstanceLifetime = props.maxInstanceLifetime;
        this.metricsCollection = props.metricsCollection;
        this.mixedInstancesPolicy = props.mixedInstancesPolicy;
        this.newInstancesProtectedFromScaleIn = props.newInstancesProtectedFromScaleIn;
        this.notificationConfigurations = props.notificationConfigurations;
        this.placementGroup = props.placementGroup;
        this.serviceLinkedRoleArn = props.serviceLinkedRoleArn;
        this.tags = new cdk.TagManager(cdk.TagType.AUTOSCALING_GROUP, "AWS::AutoScaling::AutoScalingGroup", props.tags, { tagPropertyName: 'tags' });
        this.targetGroupArns = props.targetGroupArns;
        this.terminationPolicies = props.terminationPolicies;
        this.vpcZoneIdentifier = props.vpcZoneIdentifier;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAutoScalingGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            maxSize: this.maxSize,
            minSize: this.minSize,
            autoScalingGroupName: this.autoScalingGroupName,
            availabilityZones: this.availabilityZones,
            capacityRebalance: this.capacityRebalance,
            context: this.context,
            cooldown: this.cooldown,
            desiredCapacity: this.desiredCapacity,
            desiredCapacityType: this.desiredCapacityType,
            healthCheckGracePeriod: this.healthCheckGracePeriod,
            healthCheckType: this.healthCheckType,
            instanceId: this.instanceId,
            launchConfigurationName: this.launchConfigurationName,
            launchTemplate: this.launchTemplate,
            lifecycleHookSpecificationList: this.lifecycleHookSpecificationList,
            loadBalancerNames: this.loadBalancerNames,
            maxInstanceLifetime: this.maxInstanceLifetime,
            metricsCollection: this.metricsCollection,
            mixedInstancesPolicy: this.mixedInstancesPolicy,
            newInstancesProtectedFromScaleIn: this.newInstancesProtectedFromScaleIn,
            notificationConfigurations: this.notificationConfigurations,
            placementGroup: this.placementGroup,
            serviceLinkedRoleArn: this.serviceLinkedRoleArn,
            tags: this.tags.renderTags(),
            targetGroupArns: this.targetGroupArns,
            terminationPolicies: this.terminationPolicies,
            vpcZoneIdentifier: this.vpcZoneIdentifier,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAutoScalingGroupPropsToCloudFormation(props);
    }
}

export namespace CfnAutoScalingGroup {
    /**
     * `AcceleratorCountRequest` is a property of the `InstanceRequirements` property of the [AWS::AutoScaling::AutoScalingGroup LaunchTemplateOverrides](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplateoverrides.html) property type that describes the minimum and maximum number of accelerators for an instance type.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-acceleratorcountrequest.html
     */
    export interface AcceleratorCountRequestProperty {
        /**
         * The maximum value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-acceleratorcountrequest.html#cfn-autoscaling-autoscalinggroup-acceleratorcountrequest-max
         */
        readonly max?: number;
        /**
         * The minimum value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-acceleratorcountrequest.html#cfn-autoscaling-autoscalinggroup-acceleratorcountrequest-min
         */
        readonly min?: number;
    }
}

/**
 * Determine whether the given properties match those of a `AcceleratorCountRequestProperty`
 *
 * @param properties - the TypeScript properties of a `AcceleratorCountRequestProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_AcceleratorCountRequestPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('max', cdk.validateNumber)(properties.max));
    errors.collect(cdk.propertyValidator('min', cdk.validateNumber)(properties.min));
    return errors.wrap('supplied properties not correct for "AcceleratorCountRequestProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.AcceleratorCountRequest` resource
 *
 * @param properties - the TypeScript properties of a `AcceleratorCountRequestProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.AcceleratorCountRequest` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupAcceleratorCountRequestPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_AcceleratorCountRequestPropertyValidator(properties).assertSuccess();
    return {
        Max: cdk.numberToCloudFormation(properties.max),
        Min: cdk.numberToCloudFormation(properties.min),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupAcceleratorCountRequestPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.AcceleratorCountRequestProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.AcceleratorCountRequestProperty>();
    ret.addPropertyResult('max', 'Max', properties.Max != null ? cfn_parse.FromCloudFormation.getNumber(properties.Max) : undefined);
    ret.addPropertyResult('min', 'Min', properties.Min != null ? cfn_parse.FromCloudFormation.getNumber(properties.Min) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `AcceleratorTotalMemoryMiBRequest` is a property of the `InstanceRequirements` property of the [AWS::AutoScaling::AutoScalingGroup LaunchTemplateOverrides](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplateoverrides.html) property type that describes the minimum and maximum total memory size for the accelerators for an instance type, in MiB.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-acceleratortotalmemorymibrequest.html
     */
    export interface AcceleratorTotalMemoryMiBRequestProperty {
        /**
         * The memory maximum in MiB.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-acceleratortotalmemorymibrequest.html#cfn-autoscaling-autoscalinggroup-acceleratortotalmemorymibrequest-max
         */
        readonly max?: number;
        /**
         * The memory minimum in MiB.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-acceleratortotalmemorymibrequest.html#cfn-autoscaling-autoscalinggroup-acceleratortotalmemorymibrequest-min
         */
        readonly min?: number;
    }
}

/**
 * Determine whether the given properties match those of a `AcceleratorTotalMemoryMiBRequestProperty`
 *
 * @param properties - the TypeScript properties of a `AcceleratorTotalMemoryMiBRequestProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_AcceleratorTotalMemoryMiBRequestPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('max', cdk.validateNumber)(properties.max));
    errors.collect(cdk.propertyValidator('min', cdk.validateNumber)(properties.min));
    return errors.wrap('supplied properties not correct for "AcceleratorTotalMemoryMiBRequestProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.AcceleratorTotalMemoryMiBRequest` resource
 *
 * @param properties - the TypeScript properties of a `AcceleratorTotalMemoryMiBRequestProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.AcceleratorTotalMemoryMiBRequest` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupAcceleratorTotalMemoryMiBRequestPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_AcceleratorTotalMemoryMiBRequestPropertyValidator(properties).assertSuccess();
    return {
        Max: cdk.numberToCloudFormation(properties.max),
        Min: cdk.numberToCloudFormation(properties.min),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupAcceleratorTotalMemoryMiBRequestPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.AcceleratorTotalMemoryMiBRequestProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.AcceleratorTotalMemoryMiBRequestProperty>();
    ret.addPropertyResult('max', 'Max', properties.Max != null ? cfn_parse.FromCloudFormation.getNumber(properties.Max) : undefined);
    ret.addPropertyResult('min', 'Min', properties.Min != null ? cfn_parse.FromCloudFormation.getNumber(properties.Min) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `BaselineEbsBandwidthMbpsRequest` is a property of the `InstanceRequirements` property of the [AWS::AutoScaling::AutoScalingGroup LaunchTemplateOverrides](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplateoverrides.html) property type that describes the minimum and maximum baseline bandwidth performance for an instance type, in Mbps.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-baselineebsbandwidthmbpsrequest.html
     */
    export interface BaselineEbsBandwidthMbpsRequestProperty {
        /**
         * The maximum value in Mbps.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-baselineebsbandwidthmbpsrequest.html#cfn-autoscaling-autoscalinggroup-baselineebsbandwidthmbpsrequest-max
         */
        readonly max?: number;
        /**
         * The minimum value in Mbps.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-baselineebsbandwidthmbpsrequest.html#cfn-autoscaling-autoscalinggroup-baselineebsbandwidthmbpsrequest-min
         */
        readonly min?: number;
    }
}

/**
 * Determine whether the given properties match those of a `BaselineEbsBandwidthMbpsRequestProperty`
 *
 * @param properties - the TypeScript properties of a `BaselineEbsBandwidthMbpsRequestProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_BaselineEbsBandwidthMbpsRequestPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('max', cdk.validateNumber)(properties.max));
    errors.collect(cdk.propertyValidator('min', cdk.validateNumber)(properties.min));
    return errors.wrap('supplied properties not correct for "BaselineEbsBandwidthMbpsRequestProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.BaselineEbsBandwidthMbpsRequest` resource
 *
 * @param properties - the TypeScript properties of a `BaselineEbsBandwidthMbpsRequestProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.BaselineEbsBandwidthMbpsRequest` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupBaselineEbsBandwidthMbpsRequestPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_BaselineEbsBandwidthMbpsRequestPropertyValidator(properties).assertSuccess();
    return {
        Max: cdk.numberToCloudFormation(properties.max),
        Min: cdk.numberToCloudFormation(properties.min),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupBaselineEbsBandwidthMbpsRequestPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.BaselineEbsBandwidthMbpsRequestProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.BaselineEbsBandwidthMbpsRequestProperty>();
    ret.addPropertyResult('max', 'Max', properties.Max != null ? cfn_parse.FromCloudFormation.getNumber(properties.Max) : undefined);
    ret.addPropertyResult('min', 'Min', properties.Min != null ? cfn_parse.FromCloudFormation.getNumber(properties.Min) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `InstanceRequirements` specifies a set of requirements for the types of instances that can be launched by an `AWS::AutoScaling::AutoScalingGroup` resource. `InstanceRequirements` is a property of the `LaunchTemplateOverrides` property of the [AWS::AutoScaling::AutoScalingGroup LaunchTemplate](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplate.html) property type.
     *
     * You must specify `VCpuCount` and `MemoryMiB` , but all other properties are optional. Any unspecified optional property is set to its default.
     *
     * When you specify multiple properties, you get instance types that satisfy all of the specified properties. If you specify multiple values for a property, you get instance types that satisfy any of the specified values.
     *
     * For more template snippets, see [Auto scaling template snippets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-autoscaling.html) .
     *
     * For more information, see [Create an Auto Scaling group using attribute-based instance type selection](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-asg-instance-type-requirements.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html
     */
    export interface InstanceRequirementsProperty {
        /**
         * The minimum and maximum number of accelerators (GPUs, FPGAs, or AWS Inferentia chips) for an instance type.
         *
         * To exclude accelerator-enabled instance types, set `Max` to `0` .
         *
         * Default: No minimum or maximum
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-acceleratorcount
         */
        readonly acceleratorCount?: CfnAutoScalingGroup.AcceleratorCountRequestProperty | cdk.IResolvable;
        /**
         * Indicates whether instance types must have accelerators by specific manufacturers.
         *
         * - For instance types with NVIDIA devices, specify `nvidia` .
         * - For instance types with AMD devices, specify `amd` .
         * - For instance types with AWS devices, specify `amazon-web-services` .
         * - For instance types with Xilinx devices, specify `xilinx` .
         *
         * Default: Any manufacturer
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-acceleratormanufacturers
         */
        readonly acceleratorManufacturers?: string[];
        /**
         * Lists the accelerators that must be on an instance type.
         *
         * - For instance types with NVIDIA A100 GPUs, specify `a100` .
         * - For instance types with NVIDIA V100 GPUs, specify `v100` .
         * - For instance types with NVIDIA K80 GPUs, specify `k80` .
         * - For instance types with NVIDIA T4 GPUs, specify `t4` .
         * - For instance types with NVIDIA M60 GPUs, specify `m60` .
         * - For instance types with AMD Radeon Pro V520 GPUs, specify `radeon-pro-v520` .
         * - For instance types with Xilinx VU9P FPGAs, specify `vu9p` .
         *
         * Default: Any accelerator
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-acceleratornames
         */
        readonly acceleratorNames?: string[];
        /**
         * The minimum and maximum total memory size for the accelerators on an instance type, in MiB.
         *
         * Default: No minimum or maximum
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-acceleratortotalmemorymib
         */
        readonly acceleratorTotalMemoryMiB?: CfnAutoScalingGroup.AcceleratorTotalMemoryMiBRequestProperty | cdk.IResolvable;
        /**
         * Lists the accelerator types that must be on an instance type.
         *
         * - For instance types with GPU accelerators, specify `gpu` .
         * - For instance types with FPGA accelerators, specify `fpga` .
         * - For instance types with inference accelerators, specify `inference` .
         *
         * Default: Any accelerator type
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-acceleratortypes
         */
        readonly acceleratorTypes?: string[];
        /**
         * Indicates whether bare metal instance types are included, excluded, or required.
         *
         * Default: `excluded`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-baremetal
         */
        readonly bareMetal?: string;
        /**
         * The minimum and maximum baseline bandwidth performance for an instance type, in Mbps. For more information, see [Amazon EBS–optimized instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-optimized.html) in the *Amazon EC2 User Guide for Linux Instances* .
         *
         * Default: No minimum or maximum
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-baselineebsbandwidthmbps
         */
        readonly baselineEbsBandwidthMbps?: CfnAutoScalingGroup.BaselineEbsBandwidthMbpsRequestProperty | cdk.IResolvable;
        /**
         * Indicates whether burstable performance instance types are included, excluded, or required. For more information, see [Burstable performance instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-performance-instances.html) in the *Amazon EC2 User Guide for Linux Instances* .
         *
         * Default: `excluded`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-burstableperformance
         */
        readonly burstablePerformance?: string;
        /**
         * Lists which specific CPU manufacturers to include.
         *
         * - For instance types with Intel CPUs, specify `intel` .
         * - For instance types with AMD CPUs, specify `amd` .
         * - For instance types with AWS CPUs, specify `amazon-web-services` .
         *
         * > Don't confuse the CPU hardware manufacturer with the CPU hardware architecture. Instances will be launched with a compatible CPU architecture based on the Amazon Machine Image (AMI) that you specify in your launch template.
         *
         * Default: Any manufacturer
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-cpumanufacturers
         */
        readonly cpuManufacturers?: string[];
        /**
         * Lists which instance types to exclude. You can use strings with one or more wild cards, represented by an asterisk ( `*` ). The following are examples: `c5*` , `m5a.*` , `r*` , `*3*` .
         *
         * For example, if you specify `c5*` , you are excluding the entire C5 instance family, which includes all C5a and C5n instance types. If you specify `m5a.*` , you are excluding all the M5a instance types, but not the M5n instance types.
         *
         * Default: No excluded instance types
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-excludedinstancetypes
         */
        readonly excludedInstanceTypes?: string[];
        /**
         * Indicates whether current or previous generation instance types are included.
         *
         * - For current generation instance types, specify `current` . The current generation includes EC2 instance types currently recommended for use. This typically includes the latest two to three generations in each instance family. For more information, see [Instance types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html) in the *Amazon EC2 User Guide for Linux Instances* .
         * - For previous generation instance types, specify `previous` .
         *
         * Default: Any current or previous generation
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-instancegenerations
         */
        readonly instanceGenerations?: string[];
        /**
         * Indicates whether instance types with instance store volumes are included, excluded, or required. For more information, see [Amazon EC2 instance store](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html) in the *Amazon EC2 User Guide for Linux Instances* .
         *
         * Default: `included`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-localstorage
         */
        readonly localStorage?: string;
        /**
         * Indicates the type of local storage that is required.
         *
         * - For instance types with hard disk drive (HDD) storage, specify `hdd` .
         * - For instance types with solid state drive (SSD) storage, specify `sdd` .
         *
         * Default: Any local storage type
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-localstoragetypes
         */
        readonly localStorageTypes?: string[];
        /**
         * The minimum and maximum amount of memory per vCPU for an instance type, in GiB.
         *
         * Default: No minimum or maximum
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-memorygibpervcpu
         */
        readonly memoryGiBPerVCpu?: CfnAutoScalingGroup.MemoryGiBPerVCpuRequestProperty | cdk.IResolvable;
        /**
         * The minimum and maximum instance memory size for an instance type, in MiB.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-memorymib
         */
        readonly memoryMiB?: CfnAutoScalingGroup.MemoryMiBRequestProperty | cdk.IResolvable;
        /**
         * The minimum and maximum number of network interfaces for an instance type.
         *
         * Default: No minimum or maximum
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-networkinterfacecount
         */
        readonly networkInterfaceCount?: CfnAutoScalingGroup.NetworkInterfaceCountRequestProperty | cdk.IResolvable;
        /**
         * The price protection threshold for On-Demand Instances. This is the maximum you’ll pay for an On-Demand Instance, expressed as a percentage higher than the cheapest M, C, or R instance type with your specified attributes. When Amazon EC2 Auto Scaling selects instance types with your attributes, we will exclude instance types whose price is higher than your threshold. The parameter accepts an integer, which Amazon EC2 Auto Scaling interprets as a percentage. To turn off price protection, specify a high value, such as `999999` .
         *
         * If you set `DesiredCapacityType` to `vcpu` or `memory-mib` , the price protection threshold is applied based on the per vCPU or per memory price instead of the per instance price.
         *
         * Default: `20`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-ondemandmaxpricepercentageoverlowestprice
         */
        readonly onDemandMaxPricePercentageOverLowestPrice?: number;
        /**
         * Indicates whether instance types must provide On-Demand Instance hibernation support.
         *
         * Default: `false`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-requirehibernatesupport
         */
        readonly requireHibernateSupport?: boolean | cdk.IResolvable;
        /**
         * The price protection threshold for Spot Instances. This is the maximum you’ll pay for a Spot Instance, expressed as a percentage higher than the cheapest M, C, or R instance type with your specified attributes. When Amazon EC2 Auto Scaling selects instance types with your attributes, we will exclude instance types whose price is higher than your threshold. The parameter accepts an integer, which Amazon EC2 Auto Scaling interprets as a percentage. To turn off price protection, specify a high value, such as `999999` .
         *
         * If you set `DesiredCapacityType` to `vcpu` or `memory-mib` , the price protection threshold is applied based on the per vCPU or per memory price instead of the per instance price.
         *
         * Default: `100`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-spotmaxpricepercentageoverlowestprice
         */
        readonly spotMaxPricePercentageOverLowestPrice?: number;
        /**
         * The minimum and maximum total local storage size for an instance type, in GB.
         *
         * Default: No minimum or maximum
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-totallocalstoragegb
         */
        readonly totalLocalStorageGb?: CfnAutoScalingGroup.TotalLocalStorageGBRequestProperty | cdk.IResolvable;
        /**
         * The minimum and maximum number of vCPUs for an instance type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancerequirements.html#cfn-autoscaling-autoscalinggroup-instancerequirements-vcpucount
         */
        readonly vCpuCount?: CfnAutoScalingGroup.VCpuCountRequestProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `InstanceRequirementsProperty`
 *
 * @param properties - the TypeScript properties of a `InstanceRequirementsProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_InstanceRequirementsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('acceleratorCount', CfnAutoScalingGroup_AcceleratorCountRequestPropertyValidator)(properties.acceleratorCount));
    errors.collect(cdk.propertyValidator('acceleratorManufacturers', cdk.listValidator(cdk.validateString))(properties.acceleratorManufacturers));
    errors.collect(cdk.propertyValidator('acceleratorNames', cdk.listValidator(cdk.validateString))(properties.acceleratorNames));
    errors.collect(cdk.propertyValidator('acceleratorTotalMemoryMiB', CfnAutoScalingGroup_AcceleratorTotalMemoryMiBRequestPropertyValidator)(properties.acceleratorTotalMemoryMiB));
    errors.collect(cdk.propertyValidator('acceleratorTypes', cdk.listValidator(cdk.validateString))(properties.acceleratorTypes));
    errors.collect(cdk.propertyValidator('bareMetal', cdk.validateString)(properties.bareMetal));
    errors.collect(cdk.propertyValidator('baselineEbsBandwidthMbps', CfnAutoScalingGroup_BaselineEbsBandwidthMbpsRequestPropertyValidator)(properties.baselineEbsBandwidthMbps));
    errors.collect(cdk.propertyValidator('burstablePerformance', cdk.validateString)(properties.burstablePerformance));
    errors.collect(cdk.propertyValidator('cpuManufacturers', cdk.listValidator(cdk.validateString))(properties.cpuManufacturers));
    errors.collect(cdk.propertyValidator('excludedInstanceTypes', cdk.listValidator(cdk.validateString))(properties.excludedInstanceTypes));
    errors.collect(cdk.propertyValidator('instanceGenerations', cdk.listValidator(cdk.validateString))(properties.instanceGenerations));
    errors.collect(cdk.propertyValidator('localStorage', cdk.validateString)(properties.localStorage));
    errors.collect(cdk.propertyValidator('localStorageTypes', cdk.listValidator(cdk.validateString))(properties.localStorageTypes));
    errors.collect(cdk.propertyValidator('memoryGiBPerVCpu', CfnAutoScalingGroup_MemoryGiBPerVCpuRequestPropertyValidator)(properties.memoryGiBPerVCpu));
    errors.collect(cdk.propertyValidator('memoryMiB', CfnAutoScalingGroup_MemoryMiBRequestPropertyValidator)(properties.memoryMiB));
    errors.collect(cdk.propertyValidator('networkInterfaceCount', CfnAutoScalingGroup_NetworkInterfaceCountRequestPropertyValidator)(properties.networkInterfaceCount));
    errors.collect(cdk.propertyValidator('onDemandMaxPricePercentageOverLowestPrice', cdk.validateNumber)(properties.onDemandMaxPricePercentageOverLowestPrice));
    errors.collect(cdk.propertyValidator('requireHibernateSupport', cdk.validateBoolean)(properties.requireHibernateSupport));
    errors.collect(cdk.propertyValidator('spotMaxPricePercentageOverLowestPrice', cdk.validateNumber)(properties.spotMaxPricePercentageOverLowestPrice));
    errors.collect(cdk.propertyValidator('totalLocalStorageGb', CfnAutoScalingGroup_TotalLocalStorageGBRequestPropertyValidator)(properties.totalLocalStorageGb));
    errors.collect(cdk.propertyValidator('vCpuCount', CfnAutoScalingGroup_VCpuCountRequestPropertyValidator)(properties.vCpuCount));
    return errors.wrap('supplied properties not correct for "InstanceRequirementsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.InstanceRequirements` resource
 *
 * @param properties - the TypeScript properties of a `InstanceRequirementsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.InstanceRequirements` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupInstanceRequirementsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_InstanceRequirementsPropertyValidator(properties).assertSuccess();
    return {
        AcceleratorCount: cfnAutoScalingGroupAcceleratorCountRequestPropertyToCloudFormation(properties.acceleratorCount),
        AcceleratorManufacturers: cdk.listMapper(cdk.stringToCloudFormation)(properties.acceleratorManufacturers),
        AcceleratorNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.acceleratorNames),
        AcceleratorTotalMemoryMiB: cfnAutoScalingGroupAcceleratorTotalMemoryMiBRequestPropertyToCloudFormation(properties.acceleratorTotalMemoryMiB),
        AcceleratorTypes: cdk.listMapper(cdk.stringToCloudFormation)(properties.acceleratorTypes),
        BareMetal: cdk.stringToCloudFormation(properties.bareMetal),
        BaselineEbsBandwidthMbps: cfnAutoScalingGroupBaselineEbsBandwidthMbpsRequestPropertyToCloudFormation(properties.baselineEbsBandwidthMbps),
        BurstablePerformance: cdk.stringToCloudFormation(properties.burstablePerformance),
        CpuManufacturers: cdk.listMapper(cdk.stringToCloudFormation)(properties.cpuManufacturers),
        ExcludedInstanceTypes: cdk.listMapper(cdk.stringToCloudFormation)(properties.excludedInstanceTypes),
        InstanceGenerations: cdk.listMapper(cdk.stringToCloudFormation)(properties.instanceGenerations),
        LocalStorage: cdk.stringToCloudFormation(properties.localStorage),
        LocalStorageTypes: cdk.listMapper(cdk.stringToCloudFormation)(properties.localStorageTypes),
        MemoryGiBPerVCpu: cfnAutoScalingGroupMemoryGiBPerVCpuRequestPropertyToCloudFormation(properties.memoryGiBPerVCpu),
        MemoryMiB: cfnAutoScalingGroupMemoryMiBRequestPropertyToCloudFormation(properties.memoryMiB),
        NetworkInterfaceCount: cfnAutoScalingGroupNetworkInterfaceCountRequestPropertyToCloudFormation(properties.networkInterfaceCount),
        OnDemandMaxPricePercentageOverLowestPrice: cdk.numberToCloudFormation(properties.onDemandMaxPricePercentageOverLowestPrice),
        RequireHibernateSupport: cdk.booleanToCloudFormation(properties.requireHibernateSupport),
        SpotMaxPricePercentageOverLowestPrice: cdk.numberToCloudFormation(properties.spotMaxPricePercentageOverLowestPrice),
        TotalLocalStorageGB: cfnAutoScalingGroupTotalLocalStorageGBRequestPropertyToCloudFormation(properties.totalLocalStorageGb),
        VCpuCount: cfnAutoScalingGroupVCpuCountRequestPropertyToCloudFormation(properties.vCpuCount),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupInstanceRequirementsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.InstanceRequirementsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.InstanceRequirementsProperty>();
    ret.addPropertyResult('acceleratorCount', 'AcceleratorCount', properties.AcceleratorCount != null ? CfnAutoScalingGroupAcceleratorCountRequestPropertyFromCloudFormation(properties.AcceleratorCount) : undefined);
    ret.addPropertyResult('acceleratorManufacturers', 'AcceleratorManufacturers', properties.AcceleratorManufacturers != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AcceleratorManufacturers) : undefined);
    ret.addPropertyResult('acceleratorNames', 'AcceleratorNames', properties.AcceleratorNames != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AcceleratorNames) : undefined);
    ret.addPropertyResult('acceleratorTotalMemoryMiB', 'AcceleratorTotalMemoryMiB', properties.AcceleratorTotalMemoryMiB != null ? CfnAutoScalingGroupAcceleratorTotalMemoryMiBRequestPropertyFromCloudFormation(properties.AcceleratorTotalMemoryMiB) : undefined);
    ret.addPropertyResult('acceleratorTypes', 'AcceleratorTypes', properties.AcceleratorTypes != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AcceleratorTypes) : undefined);
    ret.addPropertyResult('bareMetal', 'BareMetal', properties.BareMetal != null ? cfn_parse.FromCloudFormation.getString(properties.BareMetal) : undefined);
    ret.addPropertyResult('baselineEbsBandwidthMbps', 'BaselineEbsBandwidthMbps', properties.BaselineEbsBandwidthMbps != null ? CfnAutoScalingGroupBaselineEbsBandwidthMbpsRequestPropertyFromCloudFormation(properties.BaselineEbsBandwidthMbps) : undefined);
    ret.addPropertyResult('burstablePerformance', 'BurstablePerformance', properties.BurstablePerformance != null ? cfn_parse.FromCloudFormation.getString(properties.BurstablePerformance) : undefined);
    ret.addPropertyResult('cpuManufacturers', 'CpuManufacturers', properties.CpuManufacturers != null ? cfn_parse.FromCloudFormation.getStringArray(properties.CpuManufacturers) : undefined);
    ret.addPropertyResult('excludedInstanceTypes', 'ExcludedInstanceTypes', properties.ExcludedInstanceTypes != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExcludedInstanceTypes) : undefined);
    ret.addPropertyResult('instanceGenerations', 'InstanceGenerations', properties.InstanceGenerations != null ? cfn_parse.FromCloudFormation.getStringArray(properties.InstanceGenerations) : undefined);
    ret.addPropertyResult('localStorage', 'LocalStorage', properties.LocalStorage != null ? cfn_parse.FromCloudFormation.getString(properties.LocalStorage) : undefined);
    ret.addPropertyResult('localStorageTypes', 'LocalStorageTypes', properties.LocalStorageTypes != null ? cfn_parse.FromCloudFormation.getStringArray(properties.LocalStorageTypes) : undefined);
    ret.addPropertyResult('memoryGiBPerVCpu', 'MemoryGiBPerVCpu', properties.MemoryGiBPerVCpu != null ? CfnAutoScalingGroupMemoryGiBPerVCpuRequestPropertyFromCloudFormation(properties.MemoryGiBPerVCpu) : undefined);
    ret.addPropertyResult('memoryMiB', 'MemoryMiB', properties.MemoryMiB != null ? CfnAutoScalingGroupMemoryMiBRequestPropertyFromCloudFormation(properties.MemoryMiB) : undefined);
    ret.addPropertyResult('networkInterfaceCount', 'NetworkInterfaceCount', properties.NetworkInterfaceCount != null ? CfnAutoScalingGroupNetworkInterfaceCountRequestPropertyFromCloudFormation(properties.NetworkInterfaceCount) : undefined);
    ret.addPropertyResult('onDemandMaxPricePercentageOverLowestPrice', 'OnDemandMaxPricePercentageOverLowestPrice', properties.OnDemandMaxPricePercentageOverLowestPrice != null ? cfn_parse.FromCloudFormation.getNumber(properties.OnDemandMaxPricePercentageOverLowestPrice) : undefined);
    ret.addPropertyResult('requireHibernateSupport', 'RequireHibernateSupport', properties.RequireHibernateSupport != null ? cfn_parse.FromCloudFormation.getBoolean(properties.RequireHibernateSupport) : undefined);
    ret.addPropertyResult('spotMaxPricePercentageOverLowestPrice', 'SpotMaxPricePercentageOverLowestPrice', properties.SpotMaxPricePercentageOverLowestPrice != null ? cfn_parse.FromCloudFormation.getNumber(properties.SpotMaxPricePercentageOverLowestPrice) : undefined);
    ret.addPropertyResult('totalLocalStorageGb', 'TotalLocalStorageGB', properties.TotalLocalStorageGB != null ? CfnAutoScalingGroupTotalLocalStorageGBRequestPropertyFromCloudFormation(properties.TotalLocalStorageGB) : undefined);
    ret.addPropertyResult('vCpuCount', 'VCpuCount', properties.VCpuCount != null ? CfnAutoScalingGroupVCpuCountRequestPropertyFromCloudFormation(properties.VCpuCount) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `InstancesDistribution` is a property of the [AWS::AutoScaling::AutoScalingGroup MixedInstancesPolicy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-mixedinstancespolicy.html) property type that describes an instances distribution for an Auto Scaling group. All properties have a default value, which is the value that is used or assumed when the property is not specified.
     *
     * The instances distribution specifies the distribution of On-Demand Instances and Spot Instances, the maximum price to pay for Spot Instances, and how the Auto Scaling group allocates instance types to fulfill On-Demand and Spot capacities.
     *
     * For more information and example configurations, see [Auto Scaling groups with multiple instance types and purchase options](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-mixed-instances-groups.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancesdistribution.html
     */
    export interface InstancesDistributionProperty {
        /**
         * The order of the launch template overrides to use in fulfilling On-Demand capacity.
         *
         * If you specify `lowest-price` , Amazon EC2 Auto Scaling uses price to determine the order, launching the lowest price first.
         *
         * If you specify `prioritized` , Amazon EC2 Auto Scaling uses the priority that you assigned to each launch template override, launching the highest priority first. If all your On-Demand capacity cannot be fulfilled using your highest priority instance, then Amazon EC2 Auto Scaling launches the remaining capacity using the second priority instance type, and so on.
         *
         * Default: `lowest-price` for Auto Scaling groups that specify the `InstanceRequirements` property in the overrides and `prioritized` for Auto Scaling groups that don't.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancesdistribution.html#cfn-autoscaling-autoscalinggroup-instancesdistribution-ondemandallocationstrategy
         */
        readonly onDemandAllocationStrategy?: string;
        /**
         * The minimum amount of the Auto Scaling group's capacity that must be fulfilled by On-Demand Instances. This base portion is launched first as your group scales.
         *
         * If you specify weights for the instance types in the overrides, the base capacity is measured in the same unit of measurement as the instance types. If you specify the `InstanceRequirements` property in the overrides, the base capacity is measured in the same unit of measurement as your group's desired capacity.
         *
         * Default: `0`
         *
         * > An update to this setting means a gradual replacement of instances to adjust the current On-Demand Instance levels. When replacing instances, Amazon EC2 Auto Scaling launches new instances before terminating the previous ones.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancesdistribution.html#cfn-autoscaling-autoscalinggroup-instancesdistribution-ondemandbasecapacity
         */
        readonly onDemandBaseCapacity?: number;
        /**
         * Controls the percentages of On-Demand Instances and Spot Instances for your additional capacity beyond `OnDemandBaseCapacity` . Expressed as a number (for example, 20 specifies 20% On-Demand Instances, 80% Spot Instances). If set to 100, only On-Demand Instances are used.
         *
         * Default: `100`
         *
         * > An update to this setting means a gradual replacement of instances to adjust the current On-Demand and Spot Instance levels for your additional capacity higher than the base capacity. When replacing instances, Amazon EC2 Auto Scaling launches new instances before terminating the previous ones.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancesdistribution.html#cfn-autoscaling-autoscalinggroup-instancesdistribution-ondemandpercentageabovebasecapacity
         */
        readonly onDemandPercentageAboveBaseCapacity?: number;
        /**
         * If the allocation strategy is `lowest-price` , the Auto Scaling group launches instances using the Spot pools with the lowest price, and evenly allocates your instances across the number of Spot pools that you specify.
         *
         * If the allocation strategy is `capacity-optimized` (recommended), the Auto Scaling group launches instances using Spot pools that are optimally chosen based on the available Spot capacity. Alternatively, you can use `capacity-optimized-prioritized` and set the order of instance types in the list of launch template overrides from highest to lowest priority (from first to last in the list). Amazon EC2 Auto Scaling honors the instance type priorities on a best-effort basis but optimizes for capacity first.
         *
         * Default: `lowest-price`
         *
         * Valid values: `lowest-price` | `capacity-optimized` | `capacity-optimized-prioritized`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancesdistribution.html#cfn-autoscaling-autoscalinggroup-instancesdistribution-spotallocationstrategy
         */
        readonly spotAllocationStrategy?: string;
        /**
         * The number of Spot Instance pools to use to allocate your Spot capacity. The Spot pools are determined from the different instance types in the overrides. Valid only when the Spot allocation strategy is `lowest-price` . Value must be in the range of 1–20.
         *
         * Default: `2`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancesdistribution.html#cfn-autoscaling-autoscalinggroup-instancesdistribution-spotinstancepools
         */
        readonly spotInstancePools?: number;
        /**
         * The maximum price per unit hour that you are willing to pay for a Spot Instance. If you leave the value at its default (empty), Amazon EC2 Auto Scaling uses the On-Demand price as the maximum Spot price. To remove a value that you previously set, include the property but specify an empty string ("") for the value.
         *
         * > If your maximum price is lower than the Spot price for the instance types that you selected, your Spot Instances are not launched.
         *
         * Valid Range: Minimum value of 0.001
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-instancesdistribution.html#cfn-autoscaling-autoscalinggroup-instancesdistribution-spotmaxprice
         */
        readonly spotMaxPrice?: string;
    }
}

/**
 * Determine whether the given properties match those of a `InstancesDistributionProperty`
 *
 * @param properties - the TypeScript properties of a `InstancesDistributionProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_InstancesDistributionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('onDemandAllocationStrategy', cdk.validateString)(properties.onDemandAllocationStrategy));
    errors.collect(cdk.propertyValidator('onDemandBaseCapacity', cdk.validateNumber)(properties.onDemandBaseCapacity));
    errors.collect(cdk.propertyValidator('onDemandPercentageAboveBaseCapacity', cdk.validateNumber)(properties.onDemandPercentageAboveBaseCapacity));
    errors.collect(cdk.propertyValidator('spotAllocationStrategy', cdk.validateString)(properties.spotAllocationStrategy));
    errors.collect(cdk.propertyValidator('spotInstancePools', cdk.validateNumber)(properties.spotInstancePools));
    errors.collect(cdk.propertyValidator('spotMaxPrice', cdk.validateString)(properties.spotMaxPrice));
    return errors.wrap('supplied properties not correct for "InstancesDistributionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.InstancesDistribution` resource
 *
 * @param properties - the TypeScript properties of a `InstancesDistributionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.InstancesDistribution` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupInstancesDistributionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_InstancesDistributionPropertyValidator(properties).assertSuccess();
    return {
        OnDemandAllocationStrategy: cdk.stringToCloudFormation(properties.onDemandAllocationStrategy),
        OnDemandBaseCapacity: cdk.numberToCloudFormation(properties.onDemandBaseCapacity),
        OnDemandPercentageAboveBaseCapacity: cdk.numberToCloudFormation(properties.onDemandPercentageAboveBaseCapacity),
        SpotAllocationStrategy: cdk.stringToCloudFormation(properties.spotAllocationStrategy),
        SpotInstancePools: cdk.numberToCloudFormation(properties.spotInstancePools),
        SpotMaxPrice: cdk.stringToCloudFormation(properties.spotMaxPrice),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupInstancesDistributionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.InstancesDistributionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.InstancesDistributionProperty>();
    ret.addPropertyResult('onDemandAllocationStrategy', 'OnDemandAllocationStrategy', properties.OnDemandAllocationStrategy != null ? cfn_parse.FromCloudFormation.getString(properties.OnDemandAllocationStrategy) : undefined);
    ret.addPropertyResult('onDemandBaseCapacity', 'OnDemandBaseCapacity', properties.OnDemandBaseCapacity != null ? cfn_parse.FromCloudFormation.getNumber(properties.OnDemandBaseCapacity) : undefined);
    ret.addPropertyResult('onDemandPercentageAboveBaseCapacity', 'OnDemandPercentageAboveBaseCapacity', properties.OnDemandPercentageAboveBaseCapacity != null ? cfn_parse.FromCloudFormation.getNumber(properties.OnDemandPercentageAboveBaseCapacity) : undefined);
    ret.addPropertyResult('spotAllocationStrategy', 'SpotAllocationStrategy', properties.SpotAllocationStrategy != null ? cfn_parse.FromCloudFormation.getString(properties.SpotAllocationStrategy) : undefined);
    ret.addPropertyResult('spotInstancePools', 'SpotInstancePools', properties.SpotInstancePools != null ? cfn_parse.FromCloudFormation.getNumber(properties.SpotInstancePools) : undefined);
    ret.addPropertyResult('spotMaxPrice', 'SpotMaxPrice', properties.SpotMaxPrice != null ? cfn_parse.FromCloudFormation.getString(properties.SpotMaxPrice) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `LaunchTemplate` is a property of the [AWS::AutoScaling::AutoScalingGroup MixedInstancesPolicy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-mixedinstancespolicy.html) property type that describes a launch template and overrides. The overrides are used to override the instance type specified by the launch template with multiple instance types that can be used to launch On-Demand Instances and Spot Instances.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-launchtemplate.html
     */
    export interface LaunchTemplateProperty {
        /**
         * The launch template to use.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-launchtemplate.html#cfn-as-group-launchtemplate
         */
        readonly launchTemplateSpecification: CfnAutoScalingGroup.LaunchTemplateSpecificationProperty | cdk.IResolvable;
        /**
         * Any properties that you specify override the same properties in the launch template. If not provided, Amazon EC2 Auto Scaling uses the instance type or instance requirements specified in the launch template when it launches an instance.
         *
         * The overrides can include either one or more instance types or a set of instance requirements, but not both.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-launchtemplate.html#cfn-as-mixedinstancespolicy-overrides
         */
        readonly overrides?: Array<CfnAutoScalingGroup.LaunchTemplateOverridesProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `LaunchTemplateProperty`
 *
 * @param properties - the TypeScript properties of a `LaunchTemplateProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_LaunchTemplatePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('launchTemplateSpecification', cdk.requiredValidator)(properties.launchTemplateSpecification));
    errors.collect(cdk.propertyValidator('launchTemplateSpecification', CfnAutoScalingGroup_LaunchTemplateSpecificationPropertyValidator)(properties.launchTemplateSpecification));
    errors.collect(cdk.propertyValidator('overrides', cdk.listValidator(CfnAutoScalingGroup_LaunchTemplateOverridesPropertyValidator))(properties.overrides));
    return errors.wrap('supplied properties not correct for "LaunchTemplateProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.LaunchTemplate` resource
 *
 * @param properties - the TypeScript properties of a `LaunchTemplateProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.LaunchTemplate` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupLaunchTemplatePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_LaunchTemplatePropertyValidator(properties).assertSuccess();
    return {
        LaunchTemplateSpecification: cfnAutoScalingGroupLaunchTemplateSpecificationPropertyToCloudFormation(properties.launchTemplateSpecification),
        Overrides: cdk.listMapper(cfnAutoScalingGroupLaunchTemplateOverridesPropertyToCloudFormation)(properties.overrides),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupLaunchTemplatePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.LaunchTemplateProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.LaunchTemplateProperty>();
    ret.addPropertyResult('launchTemplateSpecification', 'LaunchTemplateSpecification', CfnAutoScalingGroupLaunchTemplateSpecificationPropertyFromCloudFormation(properties.LaunchTemplateSpecification));
    ret.addPropertyResult('overrides', 'Overrides', properties.Overrides != null ? cfn_parse.FromCloudFormation.getArray(CfnAutoScalingGroupLaunchTemplateOverridesPropertyFromCloudFormation)(properties.Overrides) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `LaunchTemplateOverrides` is a property of the [AWS::AutoScaling::AutoScalingGroup LaunchTemplate](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplate.html) property type that describes an override for a launch template.
     *
     * If you supply your own instance types, the maximum number of instance types that can be associated with an Auto Scaling group is 40. The maximum number of distinct launch templates you can define for an Auto Scaling group is 20.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-launchtemplateoverrides.html
     */
    export interface LaunchTemplateOverridesProperty {
        /**
         * The instance requirements. When you specify instance requirements, Amazon EC2 Auto Scaling finds instance types that satisfy your requirements, and then uses your On-Demand and Spot allocation strategies to launch instances from these instance types, in the same way as when you specify a list of specific instance types.
         *
         * > `InstanceRequirements` are incompatible with the `InstanceType` property. If you specify both of these properties, Amazon EC2 Auto Scaling will return a `ValidationException` exception.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-launchtemplateoverrides.html#cfn-as-mixedinstancespolicy-instancerequirements
         */
        readonly instanceRequirements?: CfnAutoScalingGroup.InstanceRequirementsProperty | cdk.IResolvable;
        /**
         * The instance type, such as `m3.xlarge` . You must use an instance type that is supported in your requested Region and Availability Zones. For more information, see [Available instance types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#AvailableInstanceTypes) in the *Amazon EC2 User Guide for Linux Instances.*
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-launchtemplateoverrides.html#cfn-autoscaling-autoscalinggroup-launchtemplateoverrides-instancetype
         */
        readonly instanceType?: string;
        /**
         * Provides a launch template for the specified instance type or instance requirements. For example, some instance types might require a launch template with a different AMI. If not provided, Amazon EC2 Auto Scaling uses the launch template that's defined for your mixed instances policy. For more information, see [Specifying a different launch template for an instance type](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-mixed-instances-groups-launch-template-overrides.html) in the *Amazon EC2 Auto Scaling User Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-launchtemplateoverrides.html#cfn-autoscaling-autoscalinggroup-launchtemplateoverrides-launchtemplatespecification
         */
        readonly launchTemplateSpecification?: CfnAutoScalingGroup.LaunchTemplateSpecificationProperty | cdk.IResolvable;
        /**
         * The number of capacity units provided by the instance type specified in `InstanceType` in terms of virtual CPUs, memory, storage, throughput, or other relative performance characteristic. When a Spot or On-Demand Instance is provisioned, the capacity units count toward the desired capacity. Amazon EC2 Auto Scaling provisions instances until the desired capacity is totally fulfilled, even if this results in an overage. For example, if there are 2 units remaining to fulfill capacity, and Amazon EC2 Auto Scaling can only provision an instance with a `WeightedCapacity` of 5 units, the instance is provisioned, and the desired capacity is exceeded by 3 units. For more information, see [Configure instance weighting for Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-mixed-instances-groups-instance-weighting.html) in the *Amazon EC2 Auto Scaling User Guide* . Value must be in the range of 1-999.
         *
         * > Every Auto Scaling group has three size parameters ( `DesiredCapacity` , `MaxSize` , and `MinSize` ). Usually, you set these sizes based on a specific number of instances. However, if you configure a mixed instances policy that defines weights for the instance types, you must specify these sizes with the same units that you use for weighting instances.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-mixedinstancespolicy-launchtemplateoverrides.html#cfn-autoscaling-autoscalinggroup-launchtemplateoverrides-weightedcapacity
         */
        readonly weightedCapacity?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LaunchTemplateOverridesProperty`
 *
 * @param properties - the TypeScript properties of a `LaunchTemplateOverridesProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_LaunchTemplateOverridesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instanceRequirements', CfnAutoScalingGroup_InstanceRequirementsPropertyValidator)(properties.instanceRequirements));
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('launchTemplateSpecification', CfnAutoScalingGroup_LaunchTemplateSpecificationPropertyValidator)(properties.launchTemplateSpecification));
    errors.collect(cdk.propertyValidator('weightedCapacity', cdk.validateString)(properties.weightedCapacity));
    return errors.wrap('supplied properties not correct for "LaunchTemplateOverridesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.LaunchTemplateOverrides` resource
 *
 * @param properties - the TypeScript properties of a `LaunchTemplateOverridesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.LaunchTemplateOverrides` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupLaunchTemplateOverridesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_LaunchTemplateOverridesPropertyValidator(properties).assertSuccess();
    return {
        InstanceRequirements: cfnAutoScalingGroupInstanceRequirementsPropertyToCloudFormation(properties.instanceRequirements),
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        LaunchTemplateSpecification: cfnAutoScalingGroupLaunchTemplateSpecificationPropertyToCloudFormation(properties.launchTemplateSpecification),
        WeightedCapacity: cdk.stringToCloudFormation(properties.weightedCapacity),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupLaunchTemplateOverridesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.LaunchTemplateOverridesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.LaunchTemplateOverridesProperty>();
    ret.addPropertyResult('instanceRequirements', 'InstanceRequirements', properties.InstanceRequirements != null ? CfnAutoScalingGroupInstanceRequirementsPropertyFromCloudFormation(properties.InstanceRequirements) : undefined);
    ret.addPropertyResult('instanceType', 'InstanceType', properties.InstanceType != null ? cfn_parse.FromCloudFormation.getString(properties.InstanceType) : undefined);
    ret.addPropertyResult('launchTemplateSpecification', 'LaunchTemplateSpecification', properties.LaunchTemplateSpecification != null ? CfnAutoScalingGroupLaunchTemplateSpecificationPropertyFromCloudFormation(properties.LaunchTemplateSpecification) : undefined);
    ret.addPropertyResult('weightedCapacity', 'WeightedCapacity', properties.WeightedCapacity != null ? cfn_parse.FromCloudFormation.getString(properties.WeightedCapacity) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `LaunchTemplateSpecification` specifies a launch template and version for the `LaunchTemplate` property of the [AWS::AutoScaling::AutoScalingGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html) resource. It is also a property of the [AWS::AutoScaling::AutoScalingGroup LaunchTemplate](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplate.html) and [AWS::AutoScaling::AutoScalingGroup LaunchTemplateOverrides](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplateoverrides.html) property types.
     *
     * The launch template that is specified must be configured for use with an Auto Scaling group. For information about creating a launch template, see [Create a launch template for an Auto Scaling group](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-launch-template.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * For more template snippets, see [Auto scaling template snippets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-autoscaling.html) and the [Examples](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-launchtemplate.html#aws-resource-ec2-launchtemplate--examples) section in the `AWS::EC2::LaunchTemplate` resource.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplatespecification.html
     */
    export interface LaunchTemplateSpecificationProperty {
        /**
         * The ID of the [AWS::EC2::LaunchTemplate](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-launchtemplate.html) . You must specify either a `LaunchTemplateName` or a `LaunchTemplateId` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplatespecification.html#cfn-autoscaling-autoscalinggroup-launchtemplatespecification-launchtemplateid
         */
        readonly launchTemplateId?: string;
        /**
         * The name of the [AWS::EC2::LaunchTemplate](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-launchtemplate.html) . You must specify either a `LaunchTemplateName` or a `LaunchTemplateId` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplatespecification.html#cfn-autoscaling-autoscalinggroup-launchtemplatespecification-launchtemplatename
         */
        readonly launchTemplateName?: string;
        /**
         * The version number. CloudFormation does not support specifying $Latest, or $Default for the template version number. However, you can specify `LatestVersionNumber` or `DefaultVersionNumber` using the `Fn::GetAtt` function.
         *
         * > For an example of using the `Fn::GetAtt` function, see the [Examples](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#aws-properties-as-group--examples) section of the `AWS::AutoScaling::AutoScalingGroup` reference.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplatespecification.html#cfn-autoscaling-autoscalinggroup-launchtemplatespecification-version
         */
        readonly version: string;
    }
}

/**
 * Determine whether the given properties match those of a `LaunchTemplateSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `LaunchTemplateSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_LaunchTemplateSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('launchTemplateId', cdk.validateString)(properties.launchTemplateId));
    errors.collect(cdk.propertyValidator('launchTemplateName', cdk.validateString)(properties.launchTemplateName));
    errors.collect(cdk.propertyValidator('version', cdk.requiredValidator)(properties.version));
    errors.collect(cdk.propertyValidator('version', cdk.validateString)(properties.version));
    return errors.wrap('supplied properties not correct for "LaunchTemplateSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.LaunchTemplateSpecification` resource
 *
 * @param properties - the TypeScript properties of a `LaunchTemplateSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.LaunchTemplateSpecification` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupLaunchTemplateSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_LaunchTemplateSpecificationPropertyValidator(properties).assertSuccess();
    return {
        LaunchTemplateId: cdk.stringToCloudFormation(properties.launchTemplateId),
        LaunchTemplateName: cdk.stringToCloudFormation(properties.launchTemplateName),
        Version: cdk.stringToCloudFormation(properties.version),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupLaunchTemplateSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.LaunchTemplateSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.LaunchTemplateSpecificationProperty>();
    ret.addPropertyResult('launchTemplateId', 'LaunchTemplateId', properties.LaunchTemplateId != null ? cfn_parse.FromCloudFormation.getString(properties.LaunchTemplateId) : undefined);
    ret.addPropertyResult('launchTemplateName', 'LaunchTemplateName', properties.LaunchTemplateName != null ? cfn_parse.FromCloudFormation.getString(properties.LaunchTemplateName) : undefined);
    ret.addPropertyResult('version', 'Version', cfn_parse.FromCloudFormation.getString(properties.Version));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `LifecycleHookSpecification` specifies a lifecycle hook for the `LifecycleHookSpecificationList` property of the [AWS::AutoScaling::AutoScalingGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html) resource. A lifecycle hook specifies actions to perform when Amazon EC2 Auto Scaling launches or terminates instances.
     *
     * For more information, see [Amazon EC2 Auto Scaling lifecycle hooks](https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html) in the *Amazon EC2 Auto Scaling User Guide* . You can find a sample template snippet in the [Examples](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-lifecyclehook.html#aws-resource-as-lifecyclehook--examples) section of the `AWS::AutoScaling::LifecycleHook` resource.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-lifecyclehookspecification.html
     */
    export interface LifecycleHookSpecificationProperty {
        /**
         * The action the Auto Scaling group takes when the lifecycle hook timeout elapses or if an unexpected failure occurs. The valid values are `CONTINUE` and `ABANDON` (default).
         *
         * For more information, see [Add lifecycle hooks](https://docs.aws.amazon.com/autoscaling/ec2/userguide/adding-lifecycle-hooks.html) in the *Amazon EC2 Auto Scaling User Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-lifecyclehookspecification.html#cfn-autoscaling-autoscalinggroup-lifecyclehookspecification-defaultresult
         */
        readonly defaultResult?: string;
        /**
         * The maximum time, in seconds, that can elapse before the lifecycle hook times out. If the lifecycle hook times out, Amazon EC2 Auto Scaling performs the default action.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-lifecyclehookspecification.html#cfn-autoscaling-autoscalinggroup-lifecyclehookspecification-heartbeattimeout
         */
        readonly heartbeatTimeout?: number;
        /**
         * The name of the lifecycle hook.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-lifecyclehookspecification.html#cfn-autoscaling-autoscalinggroup-lifecyclehookspecification-lifecyclehookname
         */
        readonly lifecycleHookName: string;
        /**
         * The state of the EC2 instance to attach the lifecycle hook to. The valid values are:
         *
         * - autoscaling:EC2_INSTANCE_LAUNCHING
         * - autoscaling:EC2_INSTANCE_TERMINATING
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-lifecyclehookspecification.html#cfn-autoscaling-autoscalinggroup-lifecyclehookspecification-lifecycletransition
         */
        readonly lifecycleTransition: string;
        /**
         * Additional information that you want to include any time Amazon EC2 Auto Scaling sends a message to the notification target.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-lifecyclehookspecification.html#cfn-autoscaling-autoscalinggroup-lifecyclehookspecification-notificationmetadata
         */
        readonly notificationMetadata?: string;
        /**
         * The Amazon Resource Name (ARN) of the notification target that Amazon EC2 Auto Scaling uses to notify you when an instance is in the transition state for the lifecycle hook. You can specify an Amazon SQS queue or an Amazon SNS topic.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-lifecyclehookspecification.html#cfn-autoscaling-autoscalinggroup-lifecyclehookspecification-notificationtargetarn
         */
        readonly notificationTargetArn?: string;
        /**
         * The ARN of the IAM role that allows the Auto Scaling group to publish to the specified notification target, for example, an Amazon SNS topic or an Amazon SQS queue. For information about creating this role, see [Configure a notification target for a lifecycle hook](https://docs.aws.amazon.com/autoscaling/ec2/userguide/prepare-for-lifecycle-notifications.html#lifecycle-hook-notification-target) in the *Amazon EC2 Auto Scaling User Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-lifecyclehookspecification.html#cfn-autoscaling-autoscalinggroup-lifecyclehookspecification-rolearn
         */
        readonly roleArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LifecycleHookSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `LifecycleHookSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_LifecycleHookSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('defaultResult', cdk.validateString)(properties.defaultResult));
    errors.collect(cdk.propertyValidator('heartbeatTimeout', cdk.validateNumber)(properties.heartbeatTimeout));
    errors.collect(cdk.propertyValidator('lifecycleHookName', cdk.requiredValidator)(properties.lifecycleHookName));
    errors.collect(cdk.propertyValidator('lifecycleHookName', cdk.validateString)(properties.lifecycleHookName));
    errors.collect(cdk.propertyValidator('lifecycleTransition', cdk.requiredValidator)(properties.lifecycleTransition));
    errors.collect(cdk.propertyValidator('lifecycleTransition', cdk.validateString)(properties.lifecycleTransition));
    errors.collect(cdk.propertyValidator('notificationMetadata', cdk.validateString)(properties.notificationMetadata));
    errors.collect(cdk.propertyValidator('notificationTargetArn', cdk.validateString)(properties.notificationTargetArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "LifecycleHookSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.LifecycleHookSpecification` resource
 *
 * @param properties - the TypeScript properties of a `LifecycleHookSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.LifecycleHookSpecification` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupLifecycleHookSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_LifecycleHookSpecificationPropertyValidator(properties).assertSuccess();
    return {
        DefaultResult: cdk.stringToCloudFormation(properties.defaultResult),
        HeartbeatTimeout: cdk.numberToCloudFormation(properties.heartbeatTimeout),
        LifecycleHookName: cdk.stringToCloudFormation(properties.lifecycleHookName),
        LifecycleTransition: cdk.stringToCloudFormation(properties.lifecycleTransition),
        NotificationMetadata: cdk.stringToCloudFormation(properties.notificationMetadata),
        NotificationTargetARN: cdk.stringToCloudFormation(properties.notificationTargetArn),
        RoleARN: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupLifecycleHookSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.LifecycleHookSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.LifecycleHookSpecificationProperty>();
    ret.addPropertyResult('defaultResult', 'DefaultResult', properties.DefaultResult != null ? cfn_parse.FromCloudFormation.getString(properties.DefaultResult) : undefined);
    ret.addPropertyResult('heartbeatTimeout', 'HeartbeatTimeout', properties.HeartbeatTimeout != null ? cfn_parse.FromCloudFormation.getNumber(properties.HeartbeatTimeout) : undefined);
    ret.addPropertyResult('lifecycleHookName', 'LifecycleHookName', cfn_parse.FromCloudFormation.getString(properties.LifecycleHookName));
    ret.addPropertyResult('lifecycleTransition', 'LifecycleTransition', cfn_parse.FromCloudFormation.getString(properties.LifecycleTransition));
    ret.addPropertyResult('notificationMetadata', 'NotificationMetadata', properties.NotificationMetadata != null ? cfn_parse.FromCloudFormation.getString(properties.NotificationMetadata) : undefined);
    ret.addPropertyResult('notificationTargetArn', 'NotificationTargetARN', properties.NotificationTargetARN != null ? cfn_parse.FromCloudFormation.getString(properties.NotificationTargetARN) : undefined);
    ret.addPropertyResult('roleArn', 'RoleARN', properties.RoleARN != null ? cfn_parse.FromCloudFormation.getString(properties.RoleARN) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `MemoryGiBPerVCpuRequest` is a property of the `InstanceRequirements` property of the [AWS::AutoScaling::AutoScalingGroup LaunchTemplateOverrides](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplateoverrides.html) property type that describes the minimum and maximum amount of memory per vCPU for an instance type, in GiB.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-memorygibpervcpurequest.html
     */
    export interface MemoryGiBPerVCpuRequestProperty {
        /**
         * The memory maximum in GiB.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-memorygibpervcpurequest.html#cfn-autoscaling-autoscalinggroup-memorygibpervcpurequest-max
         */
        readonly max?: number;
        /**
         * The memory minimum in GiB.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-memorygibpervcpurequest.html#cfn-autoscaling-autoscalinggroup-memorygibpervcpurequest-min
         */
        readonly min?: number;
    }
}

/**
 * Determine whether the given properties match those of a `MemoryGiBPerVCpuRequestProperty`
 *
 * @param properties - the TypeScript properties of a `MemoryGiBPerVCpuRequestProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_MemoryGiBPerVCpuRequestPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('max', cdk.validateNumber)(properties.max));
    errors.collect(cdk.propertyValidator('min', cdk.validateNumber)(properties.min));
    return errors.wrap('supplied properties not correct for "MemoryGiBPerVCpuRequestProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.MemoryGiBPerVCpuRequest` resource
 *
 * @param properties - the TypeScript properties of a `MemoryGiBPerVCpuRequestProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.MemoryGiBPerVCpuRequest` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupMemoryGiBPerVCpuRequestPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_MemoryGiBPerVCpuRequestPropertyValidator(properties).assertSuccess();
    return {
        Max: cdk.numberToCloudFormation(properties.max),
        Min: cdk.numberToCloudFormation(properties.min),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupMemoryGiBPerVCpuRequestPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.MemoryGiBPerVCpuRequestProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.MemoryGiBPerVCpuRequestProperty>();
    ret.addPropertyResult('max', 'Max', properties.Max != null ? cfn_parse.FromCloudFormation.getNumber(properties.Max) : undefined);
    ret.addPropertyResult('min', 'Min', properties.Min != null ? cfn_parse.FromCloudFormation.getNumber(properties.Min) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `MemoryMiBRequest` is a property of the `InstanceRequirements` property of the [AWS::AutoScaling::AutoScalingGroup LaunchTemplateOverrides](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplateoverrides.html) property type that describes the minimum and maximum instance memory size for an instance type, in MiB.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-memorymibrequest.html
     */
    export interface MemoryMiBRequestProperty {
        /**
         * The memory maximum in MiB.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-memorymibrequest.html#cfn-autoscaling-autoscalinggroup-memorymibrequest-max
         */
        readonly max?: number;
        /**
         * The memory minimum in MiB.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-memorymibrequest.html#cfn-autoscaling-autoscalinggroup-memorymibrequest-min
         */
        readonly min?: number;
    }
}

/**
 * Determine whether the given properties match those of a `MemoryMiBRequestProperty`
 *
 * @param properties - the TypeScript properties of a `MemoryMiBRequestProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_MemoryMiBRequestPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('max', cdk.validateNumber)(properties.max));
    errors.collect(cdk.propertyValidator('min', cdk.validateNumber)(properties.min));
    return errors.wrap('supplied properties not correct for "MemoryMiBRequestProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.MemoryMiBRequest` resource
 *
 * @param properties - the TypeScript properties of a `MemoryMiBRequestProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.MemoryMiBRequest` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupMemoryMiBRequestPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_MemoryMiBRequestPropertyValidator(properties).assertSuccess();
    return {
        Max: cdk.numberToCloudFormation(properties.max),
        Min: cdk.numberToCloudFormation(properties.min),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupMemoryMiBRequestPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.MemoryMiBRequestProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.MemoryMiBRequestProperty>();
    ret.addPropertyResult('max', 'Max', properties.Max != null ? cfn_parse.FromCloudFormation.getNumber(properties.Max) : undefined);
    ret.addPropertyResult('min', 'Min', properties.Min != null ? cfn_parse.FromCloudFormation.getNumber(properties.Min) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `MetricsCollection` is a property of the [AWS::AutoScaling::AutoScalingGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html) resource that describes the group metrics that an Amazon EC2 Auto Scaling group sends to Amazon CloudWatch. These metrics describe the group rather than any of its instances.
     *
     * For more information, see [Monitor CloudWatch metrics for your Auto Scaling groups and instances](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-monitoring.html) in the *Amazon EC2 Auto Scaling User Guide* . You can find a sample template snippet in the [Examples](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#aws-properties-as-group--examples) section of the `AWS::AutoScaling::AutoScalingGroup` resource.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-metricscollection.html
     */
    export interface MetricsCollectionProperty {
        /**
         * The frequency at which Amazon EC2 Auto Scaling sends aggregated data to CloudWatch.
         *
         * *Allowed Values* : `1Minute`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-metricscollection.html#cfn-as-metricscollection-granularity
         */
        readonly granularity: string;
        /**
         * Specifies which group-level metrics to start collecting.
         *
         * *Allowed Values* :
         *
         * - `GroupMinSize`
         * - `GroupMaxSize`
         * - `GroupDesiredCapacity`
         * - `GroupInServiceInstances`
         * - `GroupPendingInstances`
         * - `GroupStandbyInstances`
         * - `GroupTerminatingInstances`
         * - `GroupTotalInstances`
         * - `GroupInServiceCapacity`
         * - `GroupPendingCapacity`
         * - `GroupStandbyCapacity`
         * - `GroupTerminatingCapacity`
         * - `GroupTotalCapacity`
         * - `WarmPoolDesiredCapacity`
         * - `WarmPoolWarmedCapacity`
         * - `WarmPoolPendingCapacity`
         * - `WarmPoolTerminatingCapacity`
         * - `WarmPoolTotalCapacity`
         * - `GroupAndWarmPoolDesiredCapacity`
         * - `GroupAndWarmPoolTotalCapacity`
         *
         * If you specify `Granularity` and don't specify any metrics, all metrics are enabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-metricscollection.html#cfn-as-metricscollection-metrics
         */
        readonly metrics?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `MetricsCollectionProperty`
 *
 * @param properties - the TypeScript properties of a `MetricsCollectionProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_MetricsCollectionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('granularity', cdk.requiredValidator)(properties.granularity));
    errors.collect(cdk.propertyValidator('granularity', cdk.validateString)(properties.granularity));
    errors.collect(cdk.propertyValidator('metrics', cdk.listValidator(cdk.validateString))(properties.metrics));
    return errors.wrap('supplied properties not correct for "MetricsCollectionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.MetricsCollection` resource
 *
 * @param properties - the TypeScript properties of a `MetricsCollectionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.MetricsCollection` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupMetricsCollectionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_MetricsCollectionPropertyValidator(properties).assertSuccess();
    return {
        Granularity: cdk.stringToCloudFormation(properties.granularity),
        Metrics: cdk.listMapper(cdk.stringToCloudFormation)(properties.metrics),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupMetricsCollectionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.MetricsCollectionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.MetricsCollectionProperty>();
    ret.addPropertyResult('granularity', 'Granularity', cfn_parse.FromCloudFormation.getString(properties.Granularity));
    ret.addPropertyResult('metrics', 'Metrics', properties.Metrics != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Metrics) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `MixedInstancesPolicy` is a property of the [AWS::AutoScaling::AutoScalingGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html) resource. It allows you to configure a group that diversifies across On-Demand Instances and Spot Instances of multiple instance types. For more information, see [Auto Scaling groups with multiple instance types and purchase options](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-mixed-instances-groups.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * You can create a mixed instances policy for a new Auto Scaling group, or you can create it for an existing group by updating the group to specify `MixedInstancesPolicy` as the top-level property instead of a launch template or launch configuration. If you specify a `MixedInstancesPolicy` , you must specify a launch template as a property of the policy. You cannot specify a launch configuration for the policy.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-group-mixedinstancespolicy.html
     */
    export interface MixedInstancesPolicyProperty {
        /**
         * The instances distribution to use. If you leave this property unspecified, the value for each property in `InstancesDistribution` uses a default value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-group-mixedinstancespolicy.html#cfn-as-mixedinstancespolicy-instancesdistribution
         */
        readonly instancesDistribution?: CfnAutoScalingGroup.InstancesDistributionProperty | cdk.IResolvable;
        /**
         * Specifies the launch template to use and optionally the instance types (overrides) that are used to provision EC2 instances to fulfill On-Demand and Spot capacities.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-as-group-mixedinstancespolicy.html#cfn-as-mixedinstancespolicy-launchtemplate
         */
        readonly launchTemplate: CfnAutoScalingGroup.LaunchTemplateProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MixedInstancesPolicyProperty`
 *
 * @param properties - the TypeScript properties of a `MixedInstancesPolicyProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_MixedInstancesPolicyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('instancesDistribution', CfnAutoScalingGroup_InstancesDistributionPropertyValidator)(properties.instancesDistribution));
    errors.collect(cdk.propertyValidator('launchTemplate', cdk.requiredValidator)(properties.launchTemplate));
    errors.collect(cdk.propertyValidator('launchTemplate', CfnAutoScalingGroup_LaunchTemplatePropertyValidator)(properties.launchTemplate));
    return errors.wrap('supplied properties not correct for "MixedInstancesPolicyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.MixedInstancesPolicy` resource
 *
 * @param properties - the TypeScript properties of a `MixedInstancesPolicyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.MixedInstancesPolicy` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupMixedInstancesPolicyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_MixedInstancesPolicyPropertyValidator(properties).assertSuccess();
    return {
        InstancesDistribution: cfnAutoScalingGroupInstancesDistributionPropertyToCloudFormation(properties.instancesDistribution),
        LaunchTemplate: cfnAutoScalingGroupLaunchTemplatePropertyToCloudFormation(properties.launchTemplate),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupMixedInstancesPolicyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.MixedInstancesPolicyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.MixedInstancesPolicyProperty>();
    ret.addPropertyResult('instancesDistribution', 'InstancesDistribution', properties.InstancesDistribution != null ? CfnAutoScalingGroupInstancesDistributionPropertyFromCloudFormation(properties.InstancesDistribution) : undefined);
    ret.addPropertyResult('launchTemplate', 'LaunchTemplate', CfnAutoScalingGroupLaunchTemplatePropertyFromCloudFormation(properties.LaunchTemplate));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `NetworkInterfaceCountRequest` is a property of the `InstanceRequirements` property of the [AWS::AutoScaling::AutoScalingGroup LaunchTemplateOverrides](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplateoverrides.html) property type that describes the minimum and maximum number of network interfaces for an instance type.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-networkinterfacecountrequest.html
     */
    export interface NetworkInterfaceCountRequestProperty {
        /**
         * The maximum number of network interfaces.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-networkinterfacecountrequest.html#cfn-autoscaling-autoscalinggroup-networkinterfacecountrequest-max
         */
        readonly max?: number;
        /**
         * The minimum number of network interfaces.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-networkinterfacecountrequest.html#cfn-autoscaling-autoscalinggroup-networkinterfacecountrequest-min
         */
        readonly min?: number;
    }
}

/**
 * Determine whether the given properties match those of a `NetworkInterfaceCountRequestProperty`
 *
 * @param properties - the TypeScript properties of a `NetworkInterfaceCountRequestProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_NetworkInterfaceCountRequestPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('max', cdk.validateNumber)(properties.max));
    errors.collect(cdk.propertyValidator('min', cdk.validateNumber)(properties.min));
    return errors.wrap('supplied properties not correct for "NetworkInterfaceCountRequestProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.NetworkInterfaceCountRequest` resource
 *
 * @param properties - the TypeScript properties of a `NetworkInterfaceCountRequestProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.NetworkInterfaceCountRequest` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupNetworkInterfaceCountRequestPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_NetworkInterfaceCountRequestPropertyValidator(properties).assertSuccess();
    return {
        Max: cdk.numberToCloudFormation(properties.max),
        Min: cdk.numberToCloudFormation(properties.min),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupNetworkInterfaceCountRequestPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.NetworkInterfaceCountRequestProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.NetworkInterfaceCountRequestProperty>();
    ret.addPropertyResult('max', 'Max', properties.Max != null ? cfn_parse.FromCloudFormation.getNumber(properties.Max) : undefined);
    ret.addPropertyResult('min', 'Min', properties.Min != null ? cfn_parse.FromCloudFormation.getNumber(properties.Min) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * A structure that specifies an Amazon SNS notification configuration for the `NotificationConfigurations` property of the [AWS::AutoScaling::AutoScalingGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html) resource.
     *
     * For an example template snippet, see [Auto scaling template snippets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-autoscaling.html) .
     *
     * For more information, see [Get Amazon SNS notifications when your Auto Scaling group scales](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ASGettingNotifications.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-notificationconfigurations.html
     */
    export interface NotificationConfigurationProperty {
        /**
         * A list of event types that send a notification. Event types can include any of the following types.
         *
         * *Allowed Values* :
         *
         * - `autoscaling:EC2_INSTANCE_LAUNCH`
         * - `autoscaling:EC2_INSTANCE_LAUNCH_ERROR`
         * - `autoscaling:EC2_INSTANCE_TERMINATE`
         * - `autoscaling:EC2_INSTANCE_TERMINATE_ERROR`
         * - `autoscaling:TEST_NOTIFICATION`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-notificationconfigurations.html#cfn-as-group-notificationconfigurations-notificationtypes
         */
        readonly notificationTypes?: string[];
        /**
         * The Amazon Resource Name (ARN) of the Amazon SNS topic.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-notificationconfigurations.html#cfn-autoscaling-autoscalinggroup-notificationconfigurations-topicarn
         */
        readonly topicArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `NotificationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `NotificationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_NotificationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('notificationTypes', cdk.listValidator(cdk.validateString))(properties.notificationTypes));
    errors.collect(cdk.propertyValidator('topicArn', cdk.requiredValidator)(properties.topicArn));
    errors.collect(cdk.propertyValidator('topicArn', cdk.validateString)(properties.topicArn));
    return errors.wrap('supplied properties not correct for "NotificationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.NotificationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `NotificationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.NotificationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupNotificationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_NotificationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        NotificationTypes: cdk.listMapper(cdk.stringToCloudFormation)(properties.notificationTypes),
        TopicARN: cdk.stringToCloudFormation(properties.topicArn),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupNotificationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.NotificationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.NotificationConfigurationProperty>();
    ret.addPropertyResult('notificationTypes', 'NotificationTypes', properties.NotificationTypes != null ? cfn_parse.FromCloudFormation.getStringArray(properties.NotificationTypes) : undefined);
    ret.addPropertyResult('topicArn', 'TopicARN', cfn_parse.FromCloudFormation.getString(properties.TopicARN));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * A structure that specifies a tag for the `Tags` property of [AWS::AutoScaling::AutoScalingGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html) resource.
     *
     * For more information, see [Tag Auto Scaling groups and instances](https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-tagging.html) in the *Amazon EC2 Auto Scaling User Guide* . You can find a sample template snippet in the [Examples](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html#aws-properties-as-group--examples) section of the `AWS::AutoScaling::AutoScalingGroup` resource.
     *
     * CloudFormation adds the following tags to all Auto Scaling groups and associated instances:
     *
     * - aws:cloudformation:stack-name
     * - aws:cloudformation:stack-id
     * - aws:cloudformation:logical-id
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-tags.html
     */
    export interface TagPropertyProperty {
        /**
         * The tag key.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-tags.html#cfn-as-tags-Key
         */
        readonly key: string;
        /**
         * Set to `true` if you want CloudFormation to copy the tag to EC2 instances that are launched as part of the Auto Scaling group. Set to `false` if you want the tag attached only to the Auto Scaling group and not copied to any instances launched as part of the Auto Scaling group.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-tags.html#cfn-as-tags-PropagateAtLaunch
         */
        readonly propagateAtLaunch: boolean | cdk.IResolvable;
        /**
         * The tag value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-tags.html#cfn-as-tags-Value
         */
        readonly value: string;
    }
}

/**
 * Determine whether the given properties match those of a `TagPropertyProperty`
 *
 * @param properties - the TypeScript properties of a `TagPropertyProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_TagPropertyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('key', cdk.requiredValidator)(properties.key));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('propagateAtLaunch', cdk.requiredValidator)(properties.propagateAtLaunch));
    errors.collect(cdk.propertyValidator('propagateAtLaunch', cdk.validateBoolean)(properties.propagateAtLaunch));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "TagPropertyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.TagProperty` resource
 *
 * @param properties - the TypeScript properties of a `TagPropertyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.TagProperty` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupTagPropertyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_TagPropertyPropertyValidator(properties).assertSuccess();
    return {
        Key: cdk.stringToCloudFormation(properties.key),
        PropagateAtLaunch: cdk.booleanToCloudFormation(properties.propagateAtLaunch),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupTagPropertyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.TagPropertyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.TagPropertyProperty>();
    ret.addPropertyResult('key', 'Key', cfn_parse.FromCloudFormation.getString(properties.Key));
    ret.addPropertyResult('propagateAtLaunch', 'PropagateAtLaunch', cfn_parse.FromCloudFormation.getBoolean(properties.PropagateAtLaunch));
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `TotalLocalStorageGBRequest` is a property of the `InstanceRequirements` property of the [AWS::AutoScaling::AutoScalingGroup LaunchTemplateOverrides](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplateoverrides.html) property type that describes the minimum and maximum total local storage size for an instance type, in GB.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-totallocalstoragegbrequest.html
     */
    export interface TotalLocalStorageGBRequestProperty {
        /**
         * The storage maximum in GB.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-totallocalstoragegbrequest.html#cfn-autoscaling-autoscalinggroup-totallocalstoragegbrequest-max
         */
        readonly max?: number;
        /**
         * The storage minimum in GB.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-totallocalstoragegbrequest.html#cfn-autoscaling-autoscalinggroup-totallocalstoragegbrequest-min
         */
        readonly min?: number;
    }
}

/**
 * Determine whether the given properties match those of a `TotalLocalStorageGBRequestProperty`
 *
 * @param properties - the TypeScript properties of a `TotalLocalStorageGBRequestProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_TotalLocalStorageGBRequestPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('max', cdk.validateNumber)(properties.max));
    errors.collect(cdk.propertyValidator('min', cdk.validateNumber)(properties.min));
    return errors.wrap('supplied properties not correct for "TotalLocalStorageGBRequestProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.TotalLocalStorageGBRequest` resource
 *
 * @param properties - the TypeScript properties of a `TotalLocalStorageGBRequestProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.TotalLocalStorageGBRequest` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupTotalLocalStorageGBRequestPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_TotalLocalStorageGBRequestPropertyValidator(properties).assertSuccess();
    return {
        Max: cdk.numberToCloudFormation(properties.max),
        Min: cdk.numberToCloudFormation(properties.min),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupTotalLocalStorageGBRequestPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.TotalLocalStorageGBRequestProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.TotalLocalStorageGBRequestProperty>();
    ret.addPropertyResult('max', 'Max', properties.Max != null ? cfn_parse.FromCloudFormation.getNumber(properties.Max) : undefined);
    ret.addPropertyResult('min', 'Min', properties.Min != null ? cfn_parse.FromCloudFormation.getNumber(properties.Min) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAutoScalingGroup {
    /**
     * `VCpuCountRequest` is a property of the `InstanceRequirements` property of the [AWS::AutoScaling::AutoScalingGroup LaunchTemplateOverrides](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-launchtemplateoverrides.html) property type that describes the minimum and maximum number of vCPUs for an instance type.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-vcpucountrequest.html
     */
    export interface VCpuCountRequestProperty {
        /**
         * The maximum number of vCPUs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-vcpucountrequest.html#cfn-autoscaling-autoscalinggroup-vcpucountrequest-max
         */
        readonly max?: number;
        /**
         * The minimum number of vCPUs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-autoscalinggroup-vcpucountrequest.html#cfn-autoscaling-autoscalinggroup-vcpucountrequest-min
         */
        readonly min?: number;
    }
}

/**
 * Determine whether the given properties match those of a `VCpuCountRequestProperty`
 *
 * @param properties - the TypeScript properties of a `VCpuCountRequestProperty`
 *
 * @returns the result of the validation.
 */
function CfnAutoScalingGroup_VCpuCountRequestPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('max', cdk.validateNumber)(properties.max));
    errors.collect(cdk.propertyValidator('min', cdk.validateNumber)(properties.min));
    return errors.wrap('supplied properties not correct for "VCpuCountRequestProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.VCpuCountRequest` resource
 *
 * @param properties - the TypeScript properties of a `VCpuCountRequestProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::AutoScalingGroup.VCpuCountRequest` resource.
 */
// @ts-ignore TS6133
function cfnAutoScalingGroupVCpuCountRequestPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAutoScalingGroup_VCpuCountRequestPropertyValidator(properties).assertSuccess();
    return {
        Max: cdk.numberToCloudFormation(properties.max),
        Min: cdk.numberToCloudFormation(properties.min),
    };
}

// @ts-ignore TS6133
function CfnAutoScalingGroupVCpuCountRequestPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAutoScalingGroup.VCpuCountRequestProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAutoScalingGroup.VCpuCountRequestProperty>();
    ret.addPropertyResult('max', 'Max', properties.Max != null ? cfn_parse.FromCloudFormation.getNumber(properties.Max) : undefined);
    ret.addPropertyResult('min', 'Min', properties.Min != null ? cfn_parse.FromCloudFormation.getNumber(properties.Min) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnLaunchConfiguration`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html
 */
export interface CfnLaunchConfigurationProps {

    /**
     * Provides the unique ID of the Amazon Machine Image (AMI) that was assigned during registration. For more information, see [Find a Linux AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/finding-an-ami.html) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-imageid
     */
    readonly imageId: string;

    /**
     * Specifies the instance type of the EC2 instance. For information about available instance types, see [Available instance types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#AvailableInstanceTypes) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-instancetype
     */
    readonly instanceType: string;

    /**
     * For Auto Scaling groups that are running in a virtual private cloud (VPC), specifies whether to assign a public IP address to the group's instances. If you specify `true` , each instance in the Auto Scaling group receives a unique public IP address. For more information, see [Launching Auto Scaling instances in a VPC](https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-in-vpc.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * If an instance receives a public IP address and is also in a VPC that is defined in the same stack template, you must use the [DependsOn attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html) to declare a dependency on the [VPC-gateway attachment](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc-gateway-attachment.html) .
     *
     * > If the instance is launched into a default subnet, the default is to assign a public IP address, unless you disabled the option to assign a public IP address on the subnet. If the instance is launched into a nondefault subnet, the default is not to assign a public IP address, unless you enabled the option to assign a public IP address on the subnet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-associatepublicipaddress
     */
    readonly associatePublicIpAddress?: boolean | cdk.IResolvable;

    /**
     * Specifies how block devices are exposed to the instance. You can specify virtual devices and EBS volumes.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-blockdevicemappings
     */
    readonly blockDeviceMappings?: Array<CfnLaunchConfiguration.BlockDeviceMappingProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * *EC2-Classic retires on August 15, 2022. This parameter is not supported after that date.*
     *
     * The ID of a ClassicLink-enabled VPC to link your EC2-Classic instances to.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-classiclinkvpcid
     */
    readonly classicLinkVpcId?: string;

    /**
     * *EC2-Classic retires on August 15, 2022. This parameter is not supported after that date.*
     *
     * The IDs of one or more security groups for the VPC that you specified in the `ClassicLinkVPCId` property.
     *
     * If you specify the `ClassicLinkVPCId` property, you must specify this property.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-classiclinkvpcsecuritygroups
     */
    readonly classicLinkVpcSecurityGroups?: string[];

    /**
     * Specifies whether the launch configuration is optimized for EBS I/O ( `true` ) or not ( `false` ). This optimization provides dedicated throughput to Amazon EBS and an optimized configuration stack to provide optimal EBS I/O performance. Additional fees are incurred when you enable EBS optimization for an instance type that is not EBS-optimized by default. For more information, see [Amazon EBS–optimized instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSOptimized.html) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * The default value is `false` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-ebsoptimized
     */
    readonly ebsOptimized?: boolean | cdk.IResolvable;

    /**
     * Provides the name or the Amazon Resource Name (ARN) of the instance profile associated with the IAM role for the instance. The instance profile contains the IAM role.
     *
     * For more information, see [IAM role for applications that run on Amazon EC2 instances](https://docs.aws.amazon.com/autoscaling/ec2/userguide/us-iam-role.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-iaminstanceprofile
     */
    readonly iamInstanceProfile?: string;

    /**
     * The ID of the Amazon EC2 instance you want to use to create the launch configuration. Use this property if you want the launch configuration to use settings from an existing Amazon EC2 instance. When you use an instance to create a launch configuration, all properties are derived from the instance with the exception of `BlockDeviceMapping` and `AssociatePublicIpAddress` . You can override any properties from the instance by specifying them in the launch configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-instanceid
     */
    readonly instanceId?: string;

    /**
     * Controls whether instances in this group are launched with detailed ( `true` ) or basic ( `false` ) monitoring. The default value is `true` (enabled).
     *
     * > When detailed monitoring is enabled, Amazon CloudWatch generates metrics every minute and your account is charged a fee. When you disable detailed monitoring, CloudWatch generates metrics every 5 minutes. For more information, see [Configure monitoring for Auto Scaling instances](https://docs.aws.amazon.com/autoscaling/latest/userguide/as-instance-monitoring.html#enable-as-instance-metrics) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-instancemonitoring
     */
    readonly instanceMonitoring?: boolean | cdk.IResolvable;

    /**
     * Provides the ID of the kernel associated with the EC2 AMI.
     *
     * > We recommend that you use PV-GRUB instead of kernels and RAM disks. For more information, see [User provided kernels](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/UserProvidedKernels.html) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-kernelid
     */
    readonly kernelId?: string;

    /**
     * Provides the name of the EC2 key pair.
     *
     * > If you do not specify a key pair, you can't connect to the instance unless you choose an AMI that is configured to allow users another way to log in. For information on creating a key pair, see [Amazon EC2 key pairs and Linux instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-keyname
     */
    readonly keyName?: string;

    /**
     * The name of the launch configuration. This name must be unique per Region per account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-launchconfigurationname
     */
    readonly launchConfigurationName?: string;

    /**
     * The metadata options for the instances. For more information, see [Configuring the Instance Metadata Options](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-launch-config.html#launch-configurations-imds) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-metadataoptions
     */
    readonly metadataOptions?: CfnLaunchConfiguration.MetadataOptionsProperty | cdk.IResolvable;

    /**
     * The tenancy of the instance, either `default` or `dedicated` . An instance with `dedicated` tenancy runs on isolated, single-tenant hardware and can only be launched into a VPC. You must set the value of this property to `dedicated` if want to launch dedicated instances in a shared tenancy VPC (a VPC with the instance placement tenancy attribute set to default).
     *
     * If you specify this property, you must specify at least one subnet in the `VPCZoneIdentifier` property of the [AWS::AutoScaling::AutoScalingGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html) resource.
     *
     * For more information, see [Configure instance tenancy with Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-dedicated-instances.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-placementtenancy
     */
    readonly placementTenancy?: string;

    /**
     * The ID of the RAM disk to select.
     *
     * > We recommend that you use PV-GRUB instead of kernels and RAM disks. For more information, see [User provided kernels](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/UserProvidedKernels.html) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-ramdiskid
     */
    readonly ramDiskId?: string;

    /**
     * A list that contains the security groups to assign to the instances in the Auto Scaling group. The list can contain both the IDs of existing security groups and references to [SecurityGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-security-group.html) resources created in the template.
     *
     * For more information, see [Security groups for your VPC](https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_SecurityGroups.html) in the *Amazon Virtual Private Cloud User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-securitygroups
     */
    readonly securityGroups?: string[];

    /**
     * The maximum hourly price you are willing to pay for any Spot Instances launched to fulfill the request. Spot Instances are launched when the price you specify exceeds the current Spot price. For more information, see [Request Spot Instances for fault-tolerant and flexible applications](https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-configuration-requesting-spot-instances.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * > When you change your maximum price by creating a new launch configuration, running instances will continue to run as long as the maximum price for those running instances is higher than the current Spot price.
     *
     * Valid Range: Minimum value of 0.001
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-spotprice
     */
    readonly spotPrice?: string;

    /**
     * The Base64-encoded user data to make available to the launched EC2 instances.
     *
     * For more information, see [Instance metadata and user data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-userdata
     */
    readonly userData?: string;
}

/**
 * Determine whether the given properties match those of a `CfnLaunchConfigurationProps`
 *
 * @param properties - the TypeScript properties of a `CfnLaunchConfigurationProps`
 *
 * @returns the result of the validation.
 */
function CfnLaunchConfigurationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('associatePublicIpAddress', cdk.validateBoolean)(properties.associatePublicIpAddress));
    errors.collect(cdk.propertyValidator('blockDeviceMappings', cdk.listValidator(CfnLaunchConfiguration_BlockDeviceMappingPropertyValidator))(properties.blockDeviceMappings));
    errors.collect(cdk.propertyValidator('classicLinkVpcId', cdk.validateString)(properties.classicLinkVpcId));
    errors.collect(cdk.propertyValidator('classicLinkVpcSecurityGroups', cdk.listValidator(cdk.validateString))(properties.classicLinkVpcSecurityGroups));
    errors.collect(cdk.propertyValidator('ebsOptimized', cdk.validateBoolean)(properties.ebsOptimized));
    errors.collect(cdk.propertyValidator('iamInstanceProfile', cdk.validateString)(properties.iamInstanceProfile));
    errors.collect(cdk.propertyValidator('imageId', cdk.requiredValidator)(properties.imageId));
    errors.collect(cdk.propertyValidator('imageId', cdk.validateString)(properties.imageId));
    errors.collect(cdk.propertyValidator('instanceId', cdk.validateString)(properties.instanceId));
    errors.collect(cdk.propertyValidator('instanceMonitoring', cdk.validateBoolean)(properties.instanceMonitoring));
    errors.collect(cdk.propertyValidator('instanceType', cdk.requiredValidator)(properties.instanceType));
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('kernelId', cdk.validateString)(properties.kernelId));
    errors.collect(cdk.propertyValidator('keyName', cdk.validateString)(properties.keyName));
    errors.collect(cdk.propertyValidator('launchConfigurationName', cdk.validateString)(properties.launchConfigurationName));
    errors.collect(cdk.propertyValidator('metadataOptions', CfnLaunchConfiguration_MetadataOptionsPropertyValidator)(properties.metadataOptions));
    errors.collect(cdk.propertyValidator('placementTenancy', cdk.validateString)(properties.placementTenancy));
    errors.collect(cdk.propertyValidator('ramDiskId', cdk.validateString)(properties.ramDiskId));
    errors.collect(cdk.propertyValidator('securityGroups', cdk.listValidator(cdk.validateString))(properties.securityGroups));
    errors.collect(cdk.propertyValidator('spotPrice', cdk.validateString)(properties.spotPrice));
    errors.collect(cdk.propertyValidator('userData', cdk.validateString)(properties.userData));
    return errors.wrap('supplied properties not correct for "CfnLaunchConfigurationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::LaunchConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CfnLaunchConfigurationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::LaunchConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnLaunchConfigurationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnLaunchConfigurationPropsValidator(properties).assertSuccess();
    return {
        ImageId: cdk.stringToCloudFormation(properties.imageId),
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        AssociatePublicIpAddress: cdk.booleanToCloudFormation(properties.associatePublicIpAddress),
        BlockDeviceMappings: cdk.listMapper(cfnLaunchConfigurationBlockDeviceMappingPropertyToCloudFormation)(properties.blockDeviceMappings),
        ClassicLinkVPCId: cdk.stringToCloudFormation(properties.classicLinkVpcId),
        ClassicLinkVPCSecurityGroups: cdk.listMapper(cdk.stringToCloudFormation)(properties.classicLinkVpcSecurityGroups),
        EbsOptimized: cdk.booleanToCloudFormation(properties.ebsOptimized),
        IamInstanceProfile: cdk.stringToCloudFormation(properties.iamInstanceProfile),
        InstanceId: cdk.stringToCloudFormation(properties.instanceId),
        InstanceMonitoring: cdk.booleanToCloudFormation(properties.instanceMonitoring),
        KernelId: cdk.stringToCloudFormation(properties.kernelId),
        KeyName: cdk.stringToCloudFormation(properties.keyName),
        LaunchConfigurationName: cdk.stringToCloudFormation(properties.launchConfigurationName),
        MetadataOptions: cfnLaunchConfigurationMetadataOptionsPropertyToCloudFormation(properties.metadataOptions),
        PlacementTenancy: cdk.stringToCloudFormation(properties.placementTenancy),
        RamDiskId: cdk.stringToCloudFormation(properties.ramDiskId),
        SecurityGroups: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroups),
        SpotPrice: cdk.stringToCloudFormation(properties.spotPrice),
        UserData: cdk.stringToCloudFormation(properties.userData),
    };
}

// @ts-ignore TS6133
function CfnLaunchConfigurationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnLaunchConfigurationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnLaunchConfigurationProps>();
    ret.addPropertyResult('imageId', 'ImageId', cfn_parse.FromCloudFormation.getString(properties.ImageId));
    ret.addPropertyResult('instanceType', 'InstanceType', cfn_parse.FromCloudFormation.getString(properties.InstanceType));
    ret.addPropertyResult('associatePublicIpAddress', 'AssociatePublicIpAddress', properties.AssociatePublicIpAddress != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AssociatePublicIpAddress) : undefined);
    ret.addPropertyResult('blockDeviceMappings', 'BlockDeviceMappings', properties.BlockDeviceMappings != null ? cfn_parse.FromCloudFormation.getArray(CfnLaunchConfigurationBlockDeviceMappingPropertyFromCloudFormation)(properties.BlockDeviceMappings) : undefined);
    ret.addPropertyResult('classicLinkVpcId', 'ClassicLinkVPCId', properties.ClassicLinkVPCId != null ? cfn_parse.FromCloudFormation.getString(properties.ClassicLinkVPCId) : undefined);
    ret.addPropertyResult('classicLinkVpcSecurityGroups', 'ClassicLinkVPCSecurityGroups', properties.ClassicLinkVPCSecurityGroups != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ClassicLinkVPCSecurityGroups) : undefined);
    ret.addPropertyResult('ebsOptimized', 'EbsOptimized', properties.EbsOptimized != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EbsOptimized) : undefined);
    ret.addPropertyResult('iamInstanceProfile', 'IamInstanceProfile', properties.IamInstanceProfile != null ? cfn_parse.FromCloudFormation.getString(properties.IamInstanceProfile) : undefined);
    ret.addPropertyResult('instanceId', 'InstanceId', properties.InstanceId != null ? cfn_parse.FromCloudFormation.getString(properties.InstanceId) : undefined);
    ret.addPropertyResult('instanceMonitoring', 'InstanceMonitoring', properties.InstanceMonitoring != null ? cfn_parse.FromCloudFormation.getBoolean(properties.InstanceMonitoring) : undefined);
    ret.addPropertyResult('kernelId', 'KernelId', properties.KernelId != null ? cfn_parse.FromCloudFormation.getString(properties.KernelId) : undefined);
    ret.addPropertyResult('keyName', 'KeyName', properties.KeyName != null ? cfn_parse.FromCloudFormation.getString(properties.KeyName) : undefined);
    ret.addPropertyResult('launchConfigurationName', 'LaunchConfigurationName', properties.LaunchConfigurationName != null ? cfn_parse.FromCloudFormation.getString(properties.LaunchConfigurationName) : undefined);
    ret.addPropertyResult('metadataOptions', 'MetadataOptions', properties.MetadataOptions != null ? CfnLaunchConfigurationMetadataOptionsPropertyFromCloudFormation(properties.MetadataOptions) : undefined);
    ret.addPropertyResult('placementTenancy', 'PlacementTenancy', properties.PlacementTenancy != null ? cfn_parse.FromCloudFormation.getString(properties.PlacementTenancy) : undefined);
    ret.addPropertyResult('ramDiskId', 'RamDiskId', properties.RamDiskId != null ? cfn_parse.FromCloudFormation.getString(properties.RamDiskId) : undefined);
    ret.addPropertyResult('securityGroups', 'SecurityGroups', properties.SecurityGroups != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroups) : undefined);
    ret.addPropertyResult('spotPrice', 'SpotPrice', properties.SpotPrice != null ? cfn_parse.FromCloudFormation.getString(properties.SpotPrice) : undefined);
    ret.addPropertyResult('userData', 'UserData', properties.UserData != null ? cfn_parse.FromCloudFormation.getString(properties.UserData) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AutoScaling::LaunchConfiguration`
 *
 * The `AWS::AutoScaling::LaunchConfiguration` resource specifies the launch configuration that can be used by an Auto Scaling group to configure Amazon EC2 instances.
 *
 * When you update the launch configuration for an Auto Scaling group, CloudFormation deletes that resource and creates a new launch configuration with the updated properties and a new name. Existing instances are not affected. To update existing instances when you update the `AWS::AutoScaling::LaunchConfiguration` resource, you can specify an [UpdatePolicy attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatepolicy.html) for the group. You can find sample update policies for rolling updates in [Auto scaling template snippets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-autoscaling.html) .
 *
 * For more information, see [Launch configurations](https://docs.aws.amazon.com/autoscaling/ec2/userguide/LaunchConfiguration.html) in the *Amazon EC2 Auto Scaling User Guide* .
 *
 * > To configure Amazon EC2 instances launched as part of the Auto Scaling group, you can specify a launch template or a launch configuration. We recommend that you use a [launch template](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-launchtemplate.html) to make sure that you can use the latest features of Amazon EC2, such as Dedicated Hosts and T2 Unlimited instances. For more information, see [Creating a launch template for an Auto Scaling group](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-launch-template.html) .
 *
 * @cloudformationResource AWS::AutoScaling::LaunchConfiguration
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html
 */
export class CfnLaunchConfiguration extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AutoScaling::LaunchConfiguration";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnLaunchConfiguration {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnLaunchConfigurationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnLaunchConfiguration(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Provides the unique ID of the Amazon Machine Image (AMI) that was assigned during registration. For more information, see [Find a Linux AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/finding-an-ami.html) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-imageid
     */
    public imageId: string;

    /**
     * Specifies the instance type of the EC2 instance. For information about available instance types, see [Available instance types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#AvailableInstanceTypes) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-instancetype
     */
    public instanceType: string;

    /**
     * For Auto Scaling groups that are running in a virtual private cloud (VPC), specifies whether to assign a public IP address to the group's instances. If you specify `true` , each instance in the Auto Scaling group receives a unique public IP address. For more information, see [Launching Auto Scaling instances in a VPC](https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-in-vpc.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * If an instance receives a public IP address and is also in a VPC that is defined in the same stack template, you must use the [DependsOn attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html) to declare a dependency on the [VPC-gateway attachment](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc-gateway-attachment.html) .
     *
     * > If the instance is launched into a default subnet, the default is to assign a public IP address, unless you disabled the option to assign a public IP address on the subnet. If the instance is launched into a nondefault subnet, the default is not to assign a public IP address, unless you enabled the option to assign a public IP address on the subnet.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-associatepublicipaddress
     */
    public associatePublicIpAddress: boolean | cdk.IResolvable | undefined;

    /**
     * Specifies how block devices are exposed to the instance. You can specify virtual devices and EBS volumes.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-blockdevicemappings
     */
    public blockDeviceMappings: Array<CfnLaunchConfiguration.BlockDeviceMappingProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * *EC2-Classic retires on August 15, 2022. This parameter is not supported after that date.*
     *
     * The ID of a ClassicLink-enabled VPC to link your EC2-Classic instances to.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-classiclinkvpcid
     */
    public classicLinkVpcId: string | undefined;

    /**
     * *EC2-Classic retires on August 15, 2022. This parameter is not supported after that date.*
     *
     * The IDs of one or more security groups for the VPC that you specified in the `ClassicLinkVPCId` property.
     *
     * If you specify the `ClassicLinkVPCId` property, you must specify this property.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-classiclinkvpcsecuritygroups
     */
    public classicLinkVpcSecurityGroups: string[] | undefined;

    /**
     * Specifies whether the launch configuration is optimized for EBS I/O ( `true` ) or not ( `false` ). This optimization provides dedicated throughput to Amazon EBS and an optimized configuration stack to provide optimal EBS I/O performance. Additional fees are incurred when you enable EBS optimization for an instance type that is not EBS-optimized by default. For more information, see [Amazon EBS–optimized instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSOptimized.html) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * The default value is `false` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-ebsoptimized
     */
    public ebsOptimized: boolean | cdk.IResolvable | undefined;

    /**
     * Provides the name or the Amazon Resource Name (ARN) of the instance profile associated with the IAM role for the instance. The instance profile contains the IAM role.
     *
     * For more information, see [IAM role for applications that run on Amazon EC2 instances](https://docs.aws.amazon.com/autoscaling/ec2/userguide/us-iam-role.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-iaminstanceprofile
     */
    public iamInstanceProfile: string | undefined;

    /**
     * The ID of the Amazon EC2 instance you want to use to create the launch configuration. Use this property if you want the launch configuration to use settings from an existing Amazon EC2 instance. When you use an instance to create a launch configuration, all properties are derived from the instance with the exception of `BlockDeviceMapping` and `AssociatePublicIpAddress` . You can override any properties from the instance by specifying them in the launch configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-instanceid
     */
    public instanceId: string | undefined;

    /**
     * Controls whether instances in this group are launched with detailed ( `true` ) or basic ( `false` ) monitoring. The default value is `true` (enabled).
     *
     * > When detailed monitoring is enabled, Amazon CloudWatch generates metrics every minute and your account is charged a fee. When you disable detailed monitoring, CloudWatch generates metrics every 5 minutes. For more information, see [Configure monitoring for Auto Scaling instances](https://docs.aws.amazon.com/autoscaling/latest/userguide/as-instance-monitoring.html#enable-as-instance-metrics) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-instancemonitoring
     */
    public instanceMonitoring: boolean | cdk.IResolvable | undefined;

    /**
     * Provides the ID of the kernel associated with the EC2 AMI.
     *
     * > We recommend that you use PV-GRUB instead of kernels and RAM disks. For more information, see [User provided kernels](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/UserProvidedKernels.html) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-kernelid
     */
    public kernelId: string | undefined;

    /**
     * Provides the name of the EC2 key pair.
     *
     * > If you do not specify a key pair, you can't connect to the instance unless you choose an AMI that is configured to allow users another way to log in. For information on creating a key pair, see [Amazon EC2 key pairs and Linux instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-keyname
     */
    public keyName: string | undefined;

    /**
     * The name of the launch configuration. This name must be unique per Region per account.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-launchconfigurationname
     */
    public launchConfigurationName: string | undefined;

    /**
     * The metadata options for the instances. For more information, see [Configuring the Instance Metadata Options](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-launch-config.html#launch-configurations-imds) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-metadataoptions
     */
    public metadataOptions: CfnLaunchConfiguration.MetadataOptionsProperty | cdk.IResolvable | undefined;

    /**
     * The tenancy of the instance, either `default` or `dedicated` . An instance with `dedicated` tenancy runs on isolated, single-tenant hardware and can only be launched into a VPC. You must set the value of this property to `dedicated` if want to launch dedicated instances in a shared tenancy VPC (a VPC with the instance placement tenancy attribute set to default).
     *
     * If you specify this property, you must specify at least one subnet in the `VPCZoneIdentifier` property of the [AWS::AutoScaling::AutoScalingGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-group.html) resource.
     *
     * For more information, see [Configure instance tenancy with Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-dedicated-instances.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-placementtenancy
     */
    public placementTenancy: string | undefined;

    /**
     * The ID of the RAM disk to select.
     *
     * > We recommend that you use PV-GRUB instead of kernels and RAM disks. For more information, see [User provided kernels](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/UserProvidedKernels.html) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-ramdiskid
     */
    public ramDiskId: string | undefined;

    /**
     * A list that contains the security groups to assign to the instances in the Auto Scaling group. The list can contain both the IDs of existing security groups and references to [SecurityGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-security-group.html) resources created in the template.
     *
     * For more information, see [Security groups for your VPC](https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_SecurityGroups.html) in the *Amazon Virtual Private Cloud User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-securitygroups
     */
    public securityGroups: string[] | undefined;

    /**
     * The maximum hourly price you are willing to pay for any Spot Instances launched to fulfill the request. Spot Instances are launched when the price you specify exceeds the current Spot price. For more information, see [Request Spot Instances for fault-tolerant and flexible applications](https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-configuration-requesting-spot-instances.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * > When you change your maximum price by creating a new launch configuration, running instances will continue to run as long as the maximum price for those running instances is higher than the current Spot price.
     *
     * Valid Range: Minimum value of 0.001
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-spotprice
     */
    public spotPrice: string | undefined;

    /**
     * The Base64-encoded user data to make available to the launched EC2 instances.
     *
     * For more information, see [Instance metadata and user data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-launchconfiguration.html#cfn-autoscaling-launchconfiguration-userdata
     */
    public userData: string | undefined;

    /**
     * Create a new `AWS::AutoScaling::LaunchConfiguration`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnLaunchConfigurationProps) {
        super(scope, id, { type: CfnLaunchConfiguration.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'imageId', this);
        cdk.requireProperty(props, 'instanceType', this);

        this.imageId = props.imageId;
        this.instanceType = props.instanceType;
        this.associatePublicIpAddress = props.associatePublicIpAddress;
        this.blockDeviceMappings = props.blockDeviceMappings;
        this.classicLinkVpcId = props.classicLinkVpcId;
        this.classicLinkVpcSecurityGroups = props.classicLinkVpcSecurityGroups;
        this.ebsOptimized = props.ebsOptimized;
        this.iamInstanceProfile = props.iamInstanceProfile;
        this.instanceId = props.instanceId;
        this.instanceMonitoring = props.instanceMonitoring;
        this.kernelId = props.kernelId;
        this.keyName = props.keyName;
        this.launchConfigurationName = props.launchConfigurationName;
        this.metadataOptions = props.metadataOptions;
        this.placementTenancy = props.placementTenancy;
        this.ramDiskId = props.ramDiskId;
        this.securityGroups = props.securityGroups;
        this.spotPrice = props.spotPrice;
        this.userData = props.userData;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnLaunchConfiguration.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            imageId: this.imageId,
            instanceType: this.instanceType,
            associatePublicIpAddress: this.associatePublicIpAddress,
            blockDeviceMappings: this.blockDeviceMappings,
            classicLinkVpcId: this.classicLinkVpcId,
            classicLinkVpcSecurityGroups: this.classicLinkVpcSecurityGroups,
            ebsOptimized: this.ebsOptimized,
            iamInstanceProfile: this.iamInstanceProfile,
            instanceId: this.instanceId,
            instanceMonitoring: this.instanceMonitoring,
            kernelId: this.kernelId,
            keyName: this.keyName,
            launchConfigurationName: this.launchConfigurationName,
            metadataOptions: this.metadataOptions,
            placementTenancy: this.placementTenancy,
            ramDiskId: this.ramDiskId,
            securityGroups: this.securityGroups,
            spotPrice: this.spotPrice,
            userData: this.userData,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnLaunchConfigurationPropsToCloudFormation(props);
    }
}

export namespace CfnLaunchConfiguration {
    /**
     * `BlockDevice` is a property of the `EBS` property of the [AWS::AutoScaling::LaunchConfiguration BlockDeviceMapping](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-launchconfig-blockdev-mapping.html) property type that describes an Amazon EBS volume.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-blockdevice.html
     */
    export interface BlockDeviceProperty {
        /**
         * Indicates whether the volume is deleted on instance termination. For Amazon EC2 Auto Scaling, the default value is `true` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-blockdevice.html#cfn-autoscaling-launchconfiguration-blockdevice-deleteontermination
         */
        readonly deleteOnTermination?: boolean | cdk.IResolvable;
        /**
         * Specifies whether the volume should be encrypted. Encrypted EBS volumes can only be attached to instances that support Amazon EBS encryption. For more information, see [Supported instance types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#EBSEncryption_supported_instances) . If your AMI uses encrypted volumes, you can also only launch it on supported instance types.
         *
         * > If you are creating a volume from a snapshot, you cannot create an unencrypted volume from an encrypted snapshot. Also, you cannot specify a KMS key ID when using a launch configuration.
         * >
         * > If you enable encryption by default, the EBS volumes that you create are always encrypted, either using the AWS managed KMS key or a customer-managed KMS key, regardless of whether the snapshot was encrypted.
         * >
         * > For more information, see [Use AWS KMS keys to encrypt Amazon EBS volumes](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-data-protection.html#encryption) in the *Amazon EC2 Auto Scaling User Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-blockdevice.html#cfn-autoscaling-launchconfiguration-blockdevice-encrypted
         */
        readonly encrypted?: boolean | cdk.IResolvable;
        /**
         * The number of input/output (I/O) operations per second (IOPS) to provision for the volume. For `gp3` and `io1` volumes, this represents the number of IOPS that are provisioned for the volume. For `gp2` volumes, this represents the baseline performance of the volume and the rate at which the volume accumulates I/O credits for bursting.
         *
         * The following are the supported values for each volume type:
         *
         * - `gp3` : 3,000-16,000 IOPS
         * - `io1` : 100-64,000 IOPS
         *
         * For `io1` volumes, we guarantee 64,000 IOPS only for [Instances built on the Nitro System](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#ec2-nitro-instances) . Other instance families guarantee performance up to 32,000 IOPS.
         *
         * `Iops` is supported when the volume type is `gp3` or `io1` and required only when the volume type is `io1` . (Not used with `standard` , `gp2` , `st1` , or `sc1` volumes.)
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-blockdevice.html#cfn-autoscaling-launchconfiguration-blockdevice-iops
         */
        readonly iops?: number;
        /**
         * The snapshot ID of the volume to use.
         *
         * You must specify either a `VolumeSize` or a `SnapshotId` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-blockdevice.html#cfn-autoscaling-launchconfiguration-blockdevice-snapshotid
         */
        readonly snapshotId?: string;
        /**
         * The throughput (MiBps) to provision for a `gp3` volume.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-blockdevice.html#cfn-autoscaling-launchconfiguration-blockdevice-throughput
         */
        readonly throughput?: number;
        /**
         * The volume size, in GiBs. The following are the supported volumes sizes for each volume type:
         *
         * - `gp2` and `gp3` : 1-16,384
         * - `io1` : 4-16,384
         * - `st1` and `sc1` : 125-16,384
         * - `standard` : 1-1,024
         *
         * You must specify either a `SnapshotId` or a `VolumeSize` . If you specify both `SnapshotId` and `VolumeSize` , the volume size must be equal or greater than the size of the snapshot.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-blockdevice.html#cfn-autoscaling-launchconfiguration-blockdevice-volumesize
         */
        readonly volumeSize?: number;
        /**
         * The volume type. For more information, see [Amazon EBS Volume Types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSVolumeTypes.html) in the *Amazon EC2 User Guide for Linux Instances* .
         *
         * Valid Values: `standard` | `io1` | `gp2` | `st1` | `sc1` | `gp3`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-blockdevice.html#cfn-autoscaling-launchconfiguration-blockdevice-volumetype
         */
        readonly volumeType?: string;
    }
}

/**
 * Determine whether the given properties match those of a `BlockDeviceProperty`
 *
 * @param properties - the TypeScript properties of a `BlockDeviceProperty`
 *
 * @returns the result of the validation.
 */
function CfnLaunchConfiguration_BlockDevicePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('deleteOnTermination', cdk.validateBoolean)(properties.deleteOnTermination));
    errors.collect(cdk.propertyValidator('encrypted', cdk.validateBoolean)(properties.encrypted));
    errors.collect(cdk.propertyValidator('iops', cdk.validateNumber)(properties.iops));
    errors.collect(cdk.propertyValidator('snapshotId', cdk.validateString)(properties.snapshotId));
    errors.collect(cdk.propertyValidator('throughput', cdk.validateNumber)(properties.throughput));
    errors.collect(cdk.propertyValidator('volumeSize', cdk.validateNumber)(properties.volumeSize));
    errors.collect(cdk.propertyValidator('volumeType', cdk.validateString)(properties.volumeType));
    return errors.wrap('supplied properties not correct for "BlockDeviceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::LaunchConfiguration.BlockDevice` resource
 *
 * @param properties - the TypeScript properties of a `BlockDeviceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::LaunchConfiguration.BlockDevice` resource.
 */
// @ts-ignore TS6133
function cfnLaunchConfigurationBlockDevicePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnLaunchConfiguration_BlockDevicePropertyValidator(properties).assertSuccess();
    return {
        DeleteOnTermination: cdk.booleanToCloudFormation(properties.deleteOnTermination),
        Encrypted: cdk.booleanToCloudFormation(properties.encrypted),
        Iops: cdk.numberToCloudFormation(properties.iops),
        SnapshotId: cdk.stringToCloudFormation(properties.snapshotId),
        Throughput: cdk.numberToCloudFormation(properties.throughput),
        VolumeSize: cdk.numberToCloudFormation(properties.volumeSize),
        VolumeType: cdk.stringToCloudFormation(properties.volumeType),
    };
}

// @ts-ignore TS6133
function CfnLaunchConfigurationBlockDevicePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnLaunchConfiguration.BlockDeviceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnLaunchConfiguration.BlockDeviceProperty>();
    ret.addPropertyResult('deleteOnTermination', 'DeleteOnTermination', properties.DeleteOnTermination != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DeleteOnTermination) : undefined);
    ret.addPropertyResult('encrypted', 'Encrypted', properties.Encrypted != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Encrypted) : undefined);
    ret.addPropertyResult('iops', 'Iops', properties.Iops != null ? cfn_parse.FromCloudFormation.getNumber(properties.Iops) : undefined);
    ret.addPropertyResult('snapshotId', 'SnapshotId', properties.SnapshotId != null ? cfn_parse.FromCloudFormation.getString(properties.SnapshotId) : undefined);
    ret.addPropertyResult('throughput', 'Throughput', properties.Throughput != null ? cfn_parse.FromCloudFormation.getNumber(properties.Throughput) : undefined);
    ret.addPropertyResult('volumeSize', 'VolumeSize', properties.VolumeSize != null ? cfn_parse.FromCloudFormation.getNumber(properties.VolumeSize) : undefined);
    ret.addPropertyResult('volumeType', 'VolumeType', properties.VolumeType != null ? cfn_parse.FromCloudFormation.getString(properties.VolumeType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnLaunchConfiguration {
    /**
     * `BlockDeviceMapping` specifies a block device mapping for the `BlockDeviceMappings` property of the [AWS::AutoScaling::LaunchConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-launchconfig.html) resource.
     *
     * Each instance that is launched has an associated root device volume, either an Amazon EBS volume or an instance store volume. You can use block device mappings to specify additional EBS volumes or instance store volumes to attach to an instance when it is launched.
     *
     * For more information, see [Example block device mapping](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/block-device-mapping-concepts.html#block-device-mapping-ex) in the *Amazon EC2 User Guide for Linux Instances* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-blockdevicemapping.html
     */
    export interface BlockDeviceMappingProperty {
        /**
         * The device name exposed to the EC2 instance (for example, `/dev/sdh` or `xvdh` ). For more information, see [Device naming on Linux instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/device_naming.html) in the *Amazon EC2 User Guide for Linux Instances* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-blockdevicemapping.html#cfn-autoscaling-launchconfiguration-blockdevicemapping-devicename
         */
        readonly deviceName: string;
        /**
         * Parameters used to automatically set up EBS volumes when an instance is launched.
         *
         * You can specify either `VirtualName` or `Ebs` , but not both.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-blockdevicemapping.html#cfn-autoscaling-launchconfiguration-blockdevicemapping-ebs
         */
        readonly ebs?: CfnLaunchConfiguration.BlockDeviceProperty | cdk.IResolvable;
        /**
         * Setting this value to `true` suppresses the specified device included in the block device mapping of the AMI.
         *
         * If `NoDevice` is `true` for the root device, instances might fail the EC2 health check. In that case, Amazon EC2 Auto Scaling launches replacement instances.
         *
         * If you specify `NoDevice` , you cannot specify `Ebs` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-blockdevicemapping.html#cfn-autoscaling-launchconfiguration-blockdevicemapping-nodevice
         */
        readonly noDevice?: boolean | cdk.IResolvable;
        /**
         * The name of the virtual device. The name must be in the form ephemeral *X* where *X* is a number starting from zero (0), for example, `ephemeral0` .
         *
         * You can specify either `VirtualName` or `Ebs` , but not both.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-blockdevicemapping.html#cfn-autoscaling-launchconfiguration-blockdevicemapping-virtualname
         */
        readonly virtualName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `BlockDeviceMappingProperty`
 *
 * @param properties - the TypeScript properties of a `BlockDeviceMappingProperty`
 *
 * @returns the result of the validation.
 */
function CfnLaunchConfiguration_BlockDeviceMappingPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('deviceName', cdk.requiredValidator)(properties.deviceName));
    errors.collect(cdk.propertyValidator('deviceName', cdk.validateString)(properties.deviceName));
    errors.collect(cdk.propertyValidator('ebs', CfnLaunchConfiguration_BlockDevicePropertyValidator)(properties.ebs));
    errors.collect(cdk.propertyValidator('noDevice', cdk.validateBoolean)(properties.noDevice));
    errors.collect(cdk.propertyValidator('virtualName', cdk.validateString)(properties.virtualName));
    return errors.wrap('supplied properties not correct for "BlockDeviceMappingProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::LaunchConfiguration.BlockDeviceMapping` resource
 *
 * @param properties - the TypeScript properties of a `BlockDeviceMappingProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::LaunchConfiguration.BlockDeviceMapping` resource.
 */
// @ts-ignore TS6133
function cfnLaunchConfigurationBlockDeviceMappingPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnLaunchConfiguration_BlockDeviceMappingPropertyValidator(properties).assertSuccess();
    return {
        DeviceName: cdk.stringToCloudFormation(properties.deviceName),
        Ebs: cfnLaunchConfigurationBlockDevicePropertyToCloudFormation(properties.ebs),
        NoDevice: cdk.booleanToCloudFormation(properties.noDevice),
        VirtualName: cdk.stringToCloudFormation(properties.virtualName),
    };
}

// @ts-ignore TS6133
function CfnLaunchConfigurationBlockDeviceMappingPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnLaunchConfiguration.BlockDeviceMappingProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnLaunchConfiguration.BlockDeviceMappingProperty>();
    ret.addPropertyResult('deviceName', 'DeviceName', cfn_parse.FromCloudFormation.getString(properties.DeviceName));
    ret.addPropertyResult('ebs', 'Ebs', properties.Ebs != null ? CfnLaunchConfigurationBlockDevicePropertyFromCloudFormation(properties.Ebs) : undefined);
    ret.addPropertyResult('noDevice', 'NoDevice', properties.NoDevice != null ? cfn_parse.FromCloudFormation.getBoolean(properties.NoDevice) : undefined);
    ret.addPropertyResult('virtualName', 'VirtualName', properties.VirtualName != null ? cfn_parse.FromCloudFormation.getString(properties.VirtualName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnLaunchConfiguration {
    /**
     * `MetadataOptions` is a property of [AWS::AutoScaling::LaunchConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-launchconfig.html) that describes metadata options for the instances.
     *
     * For more information, see [Configure the instance metadata options](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-launch-config.html#launch-configurations-imds) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-metadataoptions.html
     */
    export interface MetadataOptionsProperty {
        /**
         * This parameter enables or disables the HTTP metadata endpoint on your instances. If the parameter is not specified, the default state is `enabled` .
         *
         * > If you specify a value of `disabled` , you will not be able to access your instance metadata.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-metadataoptions.html#cfn-autoscaling-launchconfiguration-metadataoptions-httpendpoint
         */
        readonly httpEndpoint?: string;
        /**
         * The desired HTTP PUT response hop limit for instance metadata requests. The larger the number, the further instance metadata requests can travel.
         *
         * Default: 1
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-metadataoptions.html#cfn-autoscaling-launchconfiguration-metadataoptions-httpputresponsehoplimit
         */
        readonly httpPutResponseHopLimit?: number;
        /**
         * The state of token usage for your instance metadata requests. If the parameter is not specified in the request, the default state is `optional` .
         *
         * If the state is `optional` , you can choose to retrieve instance metadata with or without a signed token header on your request. If you retrieve the IAM role credentials without a token, the version 1.0 role credentials are returned. If you retrieve the IAM role credentials using a valid signed token, the version 2.0 role credentials are returned.
         *
         * If the state is `required` , you must send a signed token header with any instance metadata retrieval requests. In this state, retrieving the IAM role credentials always returns the version 2.0 credentials; the version 1.0 credentials are not available.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-launchconfiguration-metadataoptions.html#cfn-autoscaling-launchconfiguration-metadataoptions-httptokens
         */
        readonly httpTokens?: string;
    }
}

/**
 * Determine whether the given properties match those of a `MetadataOptionsProperty`
 *
 * @param properties - the TypeScript properties of a `MetadataOptionsProperty`
 *
 * @returns the result of the validation.
 */
function CfnLaunchConfiguration_MetadataOptionsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('httpEndpoint', cdk.validateString)(properties.httpEndpoint));
    errors.collect(cdk.propertyValidator('httpPutResponseHopLimit', cdk.validateNumber)(properties.httpPutResponseHopLimit));
    errors.collect(cdk.propertyValidator('httpTokens', cdk.validateString)(properties.httpTokens));
    return errors.wrap('supplied properties not correct for "MetadataOptionsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::LaunchConfiguration.MetadataOptions` resource
 *
 * @param properties - the TypeScript properties of a `MetadataOptionsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::LaunchConfiguration.MetadataOptions` resource.
 */
// @ts-ignore TS6133
function cfnLaunchConfigurationMetadataOptionsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnLaunchConfiguration_MetadataOptionsPropertyValidator(properties).assertSuccess();
    return {
        HttpEndpoint: cdk.stringToCloudFormation(properties.httpEndpoint),
        HttpPutResponseHopLimit: cdk.numberToCloudFormation(properties.httpPutResponseHopLimit),
        HttpTokens: cdk.stringToCloudFormation(properties.httpTokens),
    };
}

// @ts-ignore TS6133
function CfnLaunchConfigurationMetadataOptionsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnLaunchConfiguration.MetadataOptionsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnLaunchConfiguration.MetadataOptionsProperty>();
    ret.addPropertyResult('httpEndpoint', 'HttpEndpoint', properties.HttpEndpoint != null ? cfn_parse.FromCloudFormation.getString(properties.HttpEndpoint) : undefined);
    ret.addPropertyResult('httpPutResponseHopLimit', 'HttpPutResponseHopLimit', properties.HttpPutResponseHopLimit != null ? cfn_parse.FromCloudFormation.getNumber(properties.HttpPutResponseHopLimit) : undefined);
    ret.addPropertyResult('httpTokens', 'HttpTokens', properties.HttpTokens != null ? cfn_parse.FromCloudFormation.getString(properties.HttpTokens) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnLifecycleHook`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html
 */
export interface CfnLifecycleHookProps {

    /**
     * The name of the Auto Scaling group for the lifecycle hook.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-autoscalinggroupname
     */
    readonly autoScalingGroupName: string;

    /**
     * The instance state to which you want to attach the lifecycle hook. The valid values are:
     *
     * - autoscaling:EC2_INSTANCE_LAUNCHING
     * - autoscaling:EC2_INSTANCE_TERMINATING
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-lifecycletransition
     */
    readonly lifecycleTransition: string;

    /**
     * The action the Auto Scaling group takes when the lifecycle hook timeout elapses or if an unexpected failure occurs. The valid values are `CONTINUE` and `ABANDON` (default).
     *
     * For more information, see [Add lifecycle hooks](https://docs.aws.amazon.com/autoscaling/ec2/userguide/adding-lifecycle-hooks.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-defaultresult
     */
    readonly defaultResult?: string;

    /**
     * The maximum time, in seconds, that can elapse before the lifecycle hook times out. The range is from `30` to `7200` seconds. The default value is `3600` seconds (1 hour). If the lifecycle hook times out, Amazon EC2 Auto Scaling performs the action that you specified in the `DefaultResult` property.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-heartbeattimeout
     */
    readonly heartbeatTimeout?: number;

    /**
     * The name of the lifecycle hook.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-lifecyclehookname
     */
    readonly lifecycleHookName?: string;

    /**
     * Additional information that is included any time Amazon EC2 Auto Scaling sends a message to the notification target.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-notificationmetadata
     */
    readonly notificationMetadata?: string;

    /**
     * The Amazon Resource Name (ARN) of the notification target that Amazon EC2 Auto Scaling uses to notify you when an instance is in the transition state for the lifecycle hook. You can specify an Amazon SQS queue or an Amazon SNS topic. The notification message includes the following information: lifecycle action token, user account ID, Auto Scaling group name, lifecycle hook name, instance ID, lifecycle transition, and notification metadata.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-notificationtargetarn
     */
    readonly notificationTargetArn?: string;

    /**
     * The ARN of the IAM role that allows the Auto Scaling group to publish to the specified notification target, for example, an Amazon SNS topic or an Amazon SQS queue. For information about creating this role, see [Configure a notification target for a lifecycle hook](https://docs.aws.amazon.com/autoscaling/ec2/userguide/prepare-for-lifecycle-notifications.html#lifecycle-hook-notification-target) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-rolearn
     */
    readonly roleArn?: string;
}

/**
 * Determine whether the given properties match those of a `CfnLifecycleHookProps`
 *
 * @param properties - the TypeScript properties of a `CfnLifecycleHookProps`
 *
 * @returns the result of the validation.
 */
function CfnLifecycleHookPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('autoScalingGroupName', cdk.requiredValidator)(properties.autoScalingGroupName));
    errors.collect(cdk.propertyValidator('autoScalingGroupName', cdk.validateString)(properties.autoScalingGroupName));
    errors.collect(cdk.propertyValidator('defaultResult', cdk.validateString)(properties.defaultResult));
    errors.collect(cdk.propertyValidator('heartbeatTimeout', cdk.validateNumber)(properties.heartbeatTimeout));
    errors.collect(cdk.propertyValidator('lifecycleHookName', cdk.validateString)(properties.lifecycleHookName));
    errors.collect(cdk.propertyValidator('lifecycleTransition', cdk.requiredValidator)(properties.lifecycleTransition));
    errors.collect(cdk.propertyValidator('lifecycleTransition', cdk.validateString)(properties.lifecycleTransition));
    errors.collect(cdk.propertyValidator('notificationMetadata', cdk.validateString)(properties.notificationMetadata));
    errors.collect(cdk.propertyValidator('notificationTargetArn', cdk.validateString)(properties.notificationTargetArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "CfnLifecycleHookProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::LifecycleHook` resource
 *
 * @param properties - the TypeScript properties of a `CfnLifecycleHookProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::LifecycleHook` resource.
 */
// @ts-ignore TS6133
function cfnLifecycleHookPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnLifecycleHookPropsValidator(properties).assertSuccess();
    return {
        AutoScalingGroupName: cdk.stringToCloudFormation(properties.autoScalingGroupName),
        LifecycleTransition: cdk.stringToCloudFormation(properties.lifecycleTransition),
        DefaultResult: cdk.stringToCloudFormation(properties.defaultResult),
        HeartbeatTimeout: cdk.numberToCloudFormation(properties.heartbeatTimeout),
        LifecycleHookName: cdk.stringToCloudFormation(properties.lifecycleHookName),
        NotificationMetadata: cdk.stringToCloudFormation(properties.notificationMetadata),
        NotificationTargetARN: cdk.stringToCloudFormation(properties.notificationTargetArn),
        RoleARN: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnLifecycleHookPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnLifecycleHookProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnLifecycleHookProps>();
    ret.addPropertyResult('autoScalingGroupName', 'AutoScalingGroupName', cfn_parse.FromCloudFormation.getString(properties.AutoScalingGroupName));
    ret.addPropertyResult('lifecycleTransition', 'LifecycleTransition', cfn_parse.FromCloudFormation.getString(properties.LifecycleTransition));
    ret.addPropertyResult('defaultResult', 'DefaultResult', properties.DefaultResult != null ? cfn_parse.FromCloudFormation.getString(properties.DefaultResult) : undefined);
    ret.addPropertyResult('heartbeatTimeout', 'HeartbeatTimeout', properties.HeartbeatTimeout != null ? cfn_parse.FromCloudFormation.getNumber(properties.HeartbeatTimeout) : undefined);
    ret.addPropertyResult('lifecycleHookName', 'LifecycleHookName', properties.LifecycleHookName != null ? cfn_parse.FromCloudFormation.getString(properties.LifecycleHookName) : undefined);
    ret.addPropertyResult('notificationMetadata', 'NotificationMetadata', properties.NotificationMetadata != null ? cfn_parse.FromCloudFormation.getString(properties.NotificationMetadata) : undefined);
    ret.addPropertyResult('notificationTargetArn', 'NotificationTargetARN', properties.NotificationTargetARN != null ? cfn_parse.FromCloudFormation.getString(properties.NotificationTargetARN) : undefined);
    ret.addPropertyResult('roleArn', 'RoleARN', properties.RoleARN != null ? cfn_parse.FromCloudFormation.getString(properties.RoleARN) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AutoScaling::LifecycleHook`
 *
 * The `AWS::AutoScaling::LifecycleHook` resource specifies lifecycle hooks for an Auto Scaling group. These hooks let you create solutions that are aware of events in the Auto Scaling instance lifecycle, and then perform a custom action on instances when the corresponding lifecycle event occurs. A lifecycle hook provides a specified amount of time (one hour by default) to wait for the action to complete before the instance transitions to the next state.
 *
 * Use lifecycle hooks to prepare new instances for use or to delay them from being registered behind a load balancer before their configuration has been applied completely. You can also use lifecycle hooks to prepare running instances to be terminated by, for example, downloading logs or other data.
 *
 * For more information, see [Amazon EC2 Auto Scaling lifecycle hooks](https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html) in the *Amazon EC2 Auto Scaling User Guide* .
 *
 * @cloudformationResource AWS::AutoScaling::LifecycleHook
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html
 */
export class CfnLifecycleHook extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AutoScaling::LifecycleHook";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnLifecycleHook {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnLifecycleHookPropsFromCloudFormation(resourceProperties);
        const ret = new CfnLifecycleHook(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the Auto Scaling group for the lifecycle hook.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-autoscalinggroupname
     */
    public autoScalingGroupName: string;

    /**
     * The instance state to which you want to attach the lifecycle hook. The valid values are:
     *
     * - autoscaling:EC2_INSTANCE_LAUNCHING
     * - autoscaling:EC2_INSTANCE_TERMINATING
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-lifecycletransition
     */
    public lifecycleTransition: string;

    /**
     * The action the Auto Scaling group takes when the lifecycle hook timeout elapses or if an unexpected failure occurs. The valid values are `CONTINUE` and `ABANDON` (default).
     *
     * For more information, see [Add lifecycle hooks](https://docs.aws.amazon.com/autoscaling/ec2/userguide/adding-lifecycle-hooks.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-defaultresult
     */
    public defaultResult: string | undefined;

    /**
     * The maximum time, in seconds, that can elapse before the lifecycle hook times out. The range is from `30` to `7200` seconds. The default value is `3600` seconds (1 hour). If the lifecycle hook times out, Amazon EC2 Auto Scaling performs the action that you specified in the `DefaultResult` property.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-heartbeattimeout
     */
    public heartbeatTimeout: number | undefined;

    /**
     * The name of the lifecycle hook.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-lifecyclehookname
     */
    public lifecycleHookName: string | undefined;

    /**
     * Additional information that is included any time Amazon EC2 Auto Scaling sends a message to the notification target.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-notificationmetadata
     */
    public notificationMetadata: string | undefined;

    /**
     * The Amazon Resource Name (ARN) of the notification target that Amazon EC2 Auto Scaling uses to notify you when an instance is in the transition state for the lifecycle hook. You can specify an Amazon SQS queue or an Amazon SNS topic. The notification message includes the following information: lifecycle action token, user account ID, Auto Scaling group name, lifecycle hook name, instance ID, lifecycle transition, and notification metadata.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-notificationtargetarn
     */
    public notificationTargetArn: string | undefined;

    /**
     * The ARN of the IAM role that allows the Auto Scaling group to publish to the specified notification target, for example, an Amazon SNS topic or an Amazon SQS queue. For information about creating this role, see [Configure a notification target for a lifecycle hook](https://docs.aws.amazon.com/autoscaling/ec2/userguide/prepare-for-lifecycle-notifications.html#lifecycle-hook-notification-target) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html#cfn-autoscaling-lifecyclehook-rolearn
     */
    public roleArn: string | undefined;

    /**
     * Create a new `AWS::AutoScaling::LifecycleHook`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnLifecycleHookProps) {
        super(scope, id, { type: CfnLifecycleHook.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'autoScalingGroupName', this);
        cdk.requireProperty(props, 'lifecycleTransition', this);

        this.autoScalingGroupName = props.autoScalingGroupName;
        this.lifecycleTransition = props.lifecycleTransition;
        this.defaultResult = props.defaultResult;
        this.heartbeatTimeout = props.heartbeatTimeout;
        this.lifecycleHookName = props.lifecycleHookName;
        this.notificationMetadata = props.notificationMetadata;
        this.notificationTargetArn = props.notificationTargetArn;
        this.roleArn = props.roleArn;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnLifecycleHook.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            autoScalingGroupName: this.autoScalingGroupName,
            lifecycleTransition: this.lifecycleTransition,
            defaultResult: this.defaultResult,
            heartbeatTimeout: this.heartbeatTimeout,
            lifecycleHookName: this.lifecycleHookName,
            notificationMetadata: this.notificationMetadata,
            notificationTargetArn: this.notificationTargetArn,
            roleArn: this.roleArn,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnLifecycleHookPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnScalingPolicy`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html
 */
export interface CfnScalingPolicyProps {

    /**
     * The name of the Auto Scaling group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-autoscalinggroupname
     */
    readonly autoScalingGroupName: string;

    /**
     * Specifies how the scaling adjustment is interpreted. The valid values are `ChangeInCapacity` , `ExactCapacity` , and `PercentChangeInCapacity` .
     *
     * Required if the policy type is `StepScaling` or `SimpleScaling` . For more information, see [Scaling adjustment types](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html#as-scaling-adjustment) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-adjustmenttype
     */
    readonly adjustmentType?: string;

    /**
     * The duration of the policy's cooldown period, in seconds. When a cooldown period is specified here, it overrides the default cooldown period defined for the Auto Scaling group.
     *
     * Valid only if the policy type is `SimpleScaling` . For more information, see [Scaling cooldowns for Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/Cooldown.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-cooldown
     */
    readonly cooldown?: string;

    /**
     * The estimated time, in seconds, until a newly launched instance can contribute to the CloudWatch metrics. If not provided, the default is to use the value from the default cooldown period for the Auto Scaling group.
     *
     * Valid only if the policy type is `TargetTrackingScaling` or `StepScaling` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-estimatedinstancewarmup
     */
    readonly estimatedInstanceWarmup?: number;

    /**
     * The aggregation type for the CloudWatch metrics. The valid values are `Minimum` , `Maximum` , and `Average` . If the aggregation type is null, the value is treated as `Average` .
     *
     * Valid only if the policy type is `StepScaling` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-metricaggregationtype
     */
    readonly metricAggregationType?: string;

    /**
     * The minimum value to scale by when the adjustment type is `PercentChangeInCapacity` . For example, suppose that you create a step scaling policy to scale out an Auto Scaling group by 25 percent and you specify a `MinAdjustmentMagnitude` of 2. If the group has 4 instances and the scaling policy is performed, 25 percent of 4 is 1. However, because you specified a `MinAdjustmentMagnitude` of 2, Amazon EC2 Auto Scaling scales out the group by 2 instances.
     *
     * Valid only if the policy type is `StepScaling` or `SimpleScaling` . For more information, see [Scaling adjustment types](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html#as-scaling-adjustment) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * > Some Auto Scaling groups use instance weights. In this case, set the `MinAdjustmentMagnitude` to a value that is at least as large as your largest instance weight.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-minadjustmentmagnitude
     */
    readonly minAdjustmentMagnitude?: number;

    /**
     * One of the following policy types:
     *
     * - `TargetTrackingScaling`
     * - `StepScaling`
     * - `SimpleScaling` (default)
     * - `PredictiveScaling`
     *
     * For more information, see [Target tracking scaling policies](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html) and [Step and simple scaling policies](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-policytype
     */
    readonly policyType?: string;

    /**
     * A predictive scaling policy. Provides support for predefined and custom metrics.
     *
     * Predefined metrics include CPU utilization, network in/out, and the Application Load Balancer request count.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-autoscaling-scalingpolicy-predictivescalingconfiguration
     */
    readonly predictiveScalingConfiguration?: CfnScalingPolicy.PredictiveScalingConfigurationProperty | cdk.IResolvable;

    /**
     * The amount by which to scale, based on the specified adjustment type. A positive value adds to the current capacity while a negative number removes from the current capacity. For exact capacity, you must specify a positive value.
     *
     * Required if the policy type is `SimpleScaling` . (Not used with any other policy type.)
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-scalingadjustment
     */
    readonly scalingAdjustment?: number;

    /**
     * A set of adjustments that enable you to scale based on the size of the alarm breach.
     *
     * Required if the policy type is `StepScaling` . (Not used with any other policy type.)
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-stepadjustments
     */
    readonly stepAdjustments?: Array<CfnScalingPolicy.StepAdjustmentProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A target tracking scaling policy. Includes support for predefined or customized metrics.
     *
     * The following predefined metrics are available:
     *
     * - `ASGAverageCPUUtilization`
     * - `ASGAverageNetworkIn`
     * - `ASGAverageNetworkOut`
     * - `ALBRequestCountPerTarget`
     *
     * If you specify `ALBRequestCountPerTarget` for the metric, you must specify the `ResourceLabel` property with the `PredefinedMetricSpecification` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-autoscaling-scalingpolicy-targettrackingconfiguration
     */
    readonly targetTrackingConfiguration?: CfnScalingPolicy.TargetTrackingConfigurationProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnScalingPolicyProps`
 *
 * @param properties - the TypeScript properties of a `CfnScalingPolicyProps`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicyPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('adjustmentType', cdk.validateString)(properties.adjustmentType));
    errors.collect(cdk.propertyValidator('autoScalingGroupName', cdk.requiredValidator)(properties.autoScalingGroupName));
    errors.collect(cdk.propertyValidator('autoScalingGroupName', cdk.validateString)(properties.autoScalingGroupName));
    errors.collect(cdk.propertyValidator('cooldown', cdk.validateString)(properties.cooldown));
    errors.collect(cdk.propertyValidator('estimatedInstanceWarmup', cdk.validateNumber)(properties.estimatedInstanceWarmup));
    errors.collect(cdk.propertyValidator('metricAggregationType', cdk.validateString)(properties.metricAggregationType));
    errors.collect(cdk.propertyValidator('minAdjustmentMagnitude', cdk.validateNumber)(properties.minAdjustmentMagnitude));
    errors.collect(cdk.propertyValidator('policyType', cdk.validateString)(properties.policyType));
    errors.collect(cdk.propertyValidator('predictiveScalingConfiguration', CfnScalingPolicy_PredictiveScalingConfigurationPropertyValidator)(properties.predictiveScalingConfiguration));
    errors.collect(cdk.propertyValidator('scalingAdjustment', cdk.validateNumber)(properties.scalingAdjustment));
    errors.collect(cdk.propertyValidator('stepAdjustments', cdk.listValidator(CfnScalingPolicy_StepAdjustmentPropertyValidator))(properties.stepAdjustments));
    errors.collect(cdk.propertyValidator('targetTrackingConfiguration', CfnScalingPolicy_TargetTrackingConfigurationPropertyValidator)(properties.targetTrackingConfiguration));
    return errors.wrap('supplied properties not correct for "CfnScalingPolicyProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy` resource
 *
 * @param properties - the TypeScript properties of a `CfnScalingPolicyProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicyPropsValidator(properties).assertSuccess();
    return {
        AutoScalingGroupName: cdk.stringToCloudFormation(properties.autoScalingGroupName),
        AdjustmentType: cdk.stringToCloudFormation(properties.adjustmentType),
        Cooldown: cdk.stringToCloudFormation(properties.cooldown),
        EstimatedInstanceWarmup: cdk.numberToCloudFormation(properties.estimatedInstanceWarmup),
        MetricAggregationType: cdk.stringToCloudFormation(properties.metricAggregationType),
        MinAdjustmentMagnitude: cdk.numberToCloudFormation(properties.minAdjustmentMagnitude),
        PolicyType: cdk.stringToCloudFormation(properties.policyType),
        PredictiveScalingConfiguration: cfnScalingPolicyPredictiveScalingConfigurationPropertyToCloudFormation(properties.predictiveScalingConfiguration),
        ScalingAdjustment: cdk.numberToCloudFormation(properties.scalingAdjustment),
        StepAdjustments: cdk.listMapper(cfnScalingPolicyStepAdjustmentPropertyToCloudFormation)(properties.stepAdjustments),
        TargetTrackingConfiguration: cfnScalingPolicyTargetTrackingConfigurationPropertyToCloudFormation(properties.targetTrackingConfiguration),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicyProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicyProps>();
    ret.addPropertyResult('autoScalingGroupName', 'AutoScalingGroupName', cfn_parse.FromCloudFormation.getString(properties.AutoScalingGroupName));
    ret.addPropertyResult('adjustmentType', 'AdjustmentType', properties.AdjustmentType != null ? cfn_parse.FromCloudFormation.getString(properties.AdjustmentType) : undefined);
    ret.addPropertyResult('cooldown', 'Cooldown', properties.Cooldown != null ? cfn_parse.FromCloudFormation.getString(properties.Cooldown) : undefined);
    ret.addPropertyResult('estimatedInstanceWarmup', 'EstimatedInstanceWarmup', properties.EstimatedInstanceWarmup != null ? cfn_parse.FromCloudFormation.getNumber(properties.EstimatedInstanceWarmup) : undefined);
    ret.addPropertyResult('metricAggregationType', 'MetricAggregationType', properties.MetricAggregationType != null ? cfn_parse.FromCloudFormation.getString(properties.MetricAggregationType) : undefined);
    ret.addPropertyResult('minAdjustmentMagnitude', 'MinAdjustmentMagnitude', properties.MinAdjustmentMagnitude != null ? cfn_parse.FromCloudFormation.getNumber(properties.MinAdjustmentMagnitude) : undefined);
    ret.addPropertyResult('policyType', 'PolicyType', properties.PolicyType != null ? cfn_parse.FromCloudFormation.getString(properties.PolicyType) : undefined);
    ret.addPropertyResult('predictiveScalingConfiguration', 'PredictiveScalingConfiguration', properties.PredictiveScalingConfiguration != null ? CfnScalingPolicyPredictiveScalingConfigurationPropertyFromCloudFormation(properties.PredictiveScalingConfiguration) : undefined);
    ret.addPropertyResult('scalingAdjustment', 'ScalingAdjustment', properties.ScalingAdjustment != null ? cfn_parse.FromCloudFormation.getNumber(properties.ScalingAdjustment) : undefined);
    ret.addPropertyResult('stepAdjustments', 'StepAdjustments', properties.StepAdjustments != null ? cfn_parse.FromCloudFormation.getArray(CfnScalingPolicyStepAdjustmentPropertyFromCloudFormation)(properties.StepAdjustments) : undefined);
    ret.addPropertyResult('targetTrackingConfiguration', 'TargetTrackingConfiguration', properties.TargetTrackingConfiguration != null ? CfnScalingPolicyTargetTrackingConfigurationPropertyFromCloudFormation(properties.TargetTrackingConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AutoScaling::ScalingPolicy`
 *
 * The `AWS::AutoScaling::ScalingPolicy` resource specifies an Amazon EC2 Auto Scaling scaling policy so that the Auto Scaling group can scale the number of instances available for your application.
 *
 * For more information about using scaling policies to scale your Auto Scaling group automatically, see [Dynamic scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scale-based-on-demand.html) and [Predictive scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-predictive-scaling.html) in the *Amazon EC2 Auto Scaling User Guide* .
 *
 * @cloudformationResource AWS::AutoScaling::ScalingPolicy
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html
 */
export class CfnScalingPolicy extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AutoScaling::ScalingPolicy";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnScalingPolicy {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnScalingPolicyPropsFromCloudFormation(resourceProperties);
        const ret = new CfnScalingPolicy(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the Auto Scaling group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-autoscalinggroupname
     */
    public autoScalingGroupName: string;

    /**
     * Specifies how the scaling adjustment is interpreted. The valid values are `ChangeInCapacity` , `ExactCapacity` , and `PercentChangeInCapacity` .
     *
     * Required if the policy type is `StepScaling` or `SimpleScaling` . For more information, see [Scaling adjustment types](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html#as-scaling-adjustment) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-adjustmenttype
     */
    public adjustmentType: string | undefined;

    /**
     * The duration of the policy's cooldown period, in seconds. When a cooldown period is specified here, it overrides the default cooldown period defined for the Auto Scaling group.
     *
     * Valid only if the policy type is `SimpleScaling` . For more information, see [Scaling cooldowns for Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/Cooldown.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-cooldown
     */
    public cooldown: string | undefined;

    /**
     * The estimated time, in seconds, until a newly launched instance can contribute to the CloudWatch metrics. If not provided, the default is to use the value from the default cooldown period for the Auto Scaling group.
     *
     * Valid only if the policy type is `TargetTrackingScaling` or `StepScaling` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-estimatedinstancewarmup
     */
    public estimatedInstanceWarmup: number | undefined;

    /**
     * The aggregation type for the CloudWatch metrics. The valid values are `Minimum` , `Maximum` , and `Average` . If the aggregation type is null, the value is treated as `Average` .
     *
     * Valid only if the policy type is `StepScaling` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-metricaggregationtype
     */
    public metricAggregationType: string | undefined;

    /**
     * The minimum value to scale by when the adjustment type is `PercentChangeInCapacity` . For example, suppose that you create a step scaling policy to scale out an Auto Scaling group by 25 percent and you specify a `MinAdjustmentMagnitude` of 2. If the group has 4 instances and the scaling policy is performed, 25 percent of 4 is 1. However, because you specified a `MinAdjustmentMagnitude` of 2, Amazon EC2 Auto Scaling scales out the group by 2 instances.
     *
     * Valid only if the policy type is `StepScaling` or `SimpleScaling` . For more information, see [Scaling adjustment types](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html#as-scaling-adjustment) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * > Some Auto Scaling groups use instance weights. In this case, set the `MinAdjustmentMagnitude` to a value that is at least as large as your largest instance weight.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-minadjustmentmagnitude
     */
    public minAdjustmentMagnitude: number | undefined;

    /**
     * One of the following policy types:
     *
     * - `TargetTrackingScaling`
     * - `StepScaling`
     * - `SimpleScaling` (default)
     * - `PredictiveScaling`
     *
     * For more information, see [Target tracking scaling policies](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html) and [Step and simple scaling policies](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-policytype
     */
    public policyType: string | undefined;

    /**
     * A predictive scaling policy. Provides support for predefined and custom metrics.
     *
     * Predefined metrics include CPU utilization, network in/out, and the Application Load Balancer request count.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-autoscaling-scalingpolicy-predictivescalingconfiguration
     */
    public predictiveScalingConfiguration: CfnScalingPolicy.PredictiveScalingConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * The amount by which to scale, based on the specified adjustment type. A positive value adds to the current capacity while a negative number removes from the current capacity. For exact capacity, you must specify a positive value.
     *
     * Required if the policy type is `SimpleScaling` . (Not used with any other policy type.)
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-scalingadjustment
     */
    public scalingAdjustment: number | undefined;

    /**
     * A set of adjustments that enable you to scale based on the size of the alarm breach.
     *
     * Required if the policy type is `StepScaling` . (Not used with any other policy type.)
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-as-scalingpolicy-stepadjustments
     */
    public stepAdjustments: Array<CfnScalingPolicy.StepAdjustmentProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * A target tracking scaling policy. Includes support for predefined or customized metrics.
     *
     * The following predefined metrics are available:
     *
     * - `ASGAverageCPUUtilization`
     * - `ASGAverageNetworkIn`
     * - `ASGAverageNetworkOut`
     * - `ALBRequestCountPerTarget`
     *
     * If you specify `ALBRequestCountPerTarget` for the metric, you must specify the `ResourceLabel` property with the `PredefinedMetricSpecification` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#cfn-autoscaling-scalingpolicy-targettrackingconfiguration
     */
    public targetTrackingConfiguration: CfnScalingPolicy.TargetTrackingConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::AutoScaling::ScalingPolicy`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnScalingPolicyProps) {
        super(scope, id, { type: CfnScalingPolicy.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'autoScalingGroupName', this);

        this.autoScalingGroupName = props.autoScalingGroupName;
        this.adjustmentType = props.adjustmentType;
        this.cooldown = props.cooldown;
        this.estimatedInstanceWarmup = props.estimatedInstanceWarmup;
        this.metricAggregationType = props.metricAggregationType;
        this.minAdjustmentMagnitude = props.minAdjustmentMagnitude;
        this.policyType = props.policyType;
        this.predictiveScalingConfiguration = props.predictiveScalingConfiguration;
        this.scalingAdjustment = props.scalingAdjustment;
        this.stepAdjustments = props.stepAdjustments;
        this.targetTrackingConfiguration = props.targetTrackingConfiguration;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnScalingPolicy.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            autoScalingGroupName: this.autoScalingGroupName,
            adjustmentType: this.adjustmentType,
            cooldown: this.cooldown,
            estimatedInstanceWarmup: this.estimatedInstanceWarmup,
            metricAggregationType: this.metricAggregationType,
            minAdjustmentMagnitude: this.minAdjustmentMagnitude,
            policyType: this.policyType,
            predictiveScalingConfiguration: this.predictiveScalingConfiguration,
            scalingAdjustment: this.scalingAdjustment,
            stepAdjustments: this.stepAdjustments,
            targetTrackingConfiguration: this.targetTrackingConfiguration,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnScalingPolicyPropsToCloudFormation(props);
    }
}

export namespace CfnScalingPolicy {
    /**
     * Contains customized metric specification information for a target tracking scaling policy for Amazon EC2 Auto Scaling.
     *
     * To create your customized metric specification:
     *
     * - Add values for each required property from CloudWatch. You can use an existing metric, or a new metric that you create. To use your own metric, you must first publish the metric to CloudWatch. For more information, see [Publish Custom Metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html) in the *Amazon CloudWatch User Guide* .
     * - Choose a metric that changes proportionally with capacity. The value of the metric should increase or decrease in inverse proportion to the number of capacity units. That is, the value of the metric should decrease when capacity increases.
     *
     * For more information about CloudWatch, see [Amazon CloudWatch Concepts](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html) .
     *
     * `CustomizedMetricSpecification` is a property of the [AWS::AutoScaling::ScalingPolicy TargetTrackingConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-targettrackingconfiguration.html) property type.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-customizedmetricspecification.html
     */
    export interface CustomizedMetricSpecificationProperty {
        /**
         * The dimensions of the metric.
         *
         * Conditional: If you published your metric with dimensions, you must specify the same dimensions in your scaling policy.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-customizedmetricspecification.html#cfn-autoscaling-scalingpolicy-customizedmetricspecification-dimensions
         */
        readonly dimensions?: Array<CfnScalingPolicy.MetricDimensionProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The name of the metric. To get the exact metric name, namespace, and dimensions, inspect the [Metric](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_Metric.html) object that is returned by a call to [ListMetrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_ListMetrics.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-customizedmetricspecification.html#cfn-autoscaling-scalingpolicy-customizedmetricspecification-metricname
         */
        readonly metricName: string;
        /**
         * The namespace of the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-customizedmetricspecification.html#cfn-autoscaling-scalingpolicy-customizedmetricspecification-namespace
         */
        readonly namespace: string;
        /**
         * The statistic of the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-customizedmetricspecification.html#cfn-autoscaling-scalingpolicy-customizedmetricspecification-statistic
         */
        readonly statistic: string;
        /**
         * The unit of the metric. For a complete list of the units that CloudWatch supports, see the [MetricDatum](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_MetricDatum.html) data type in the *Amazon CloudWatch API Reference* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-customizedmetricspecification.html#cfn-autoscaling-scalingpolicy-customizedmetricspecification-unit
         */
        readonly unit?: string;
    }
}

/**
 * Determine whether the given properties match those of a `CustomizedMetricSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `CustomizedMetricSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicy_CustomizedMetricSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dimensions', cdk.listValidator(CfnScalingPolicy_MetricDimensionPropertyValidator))(properties.dimensions));
    errors.collect(cdk.propertyValidator('metricName', cdk.requiredValidator)(properties.metricName));
    errors.collect(cdk.propertyValidator('metricName', cdk.validateString)(properties.metricName));
    errors.collect(cdk.propertyValidator('namespace', cdk.requiredValidator)(properties.namespace));
    errors.collect(cdk.propertyValidator('namespace', cdk.validateString)(properties.namespace));
    errors.collect(cdk.propertyValidator('statistic', cdk.requiredValidator)(properties.statistic));
    errors.collect(cdk.propertyValidator('statistic', cdk.validateString)(properties.statistic));
    errors.collect(cdk.propertyValidator('unit', cdk.validateString)(properties.unit));
    return errors.wrap('supplied properties not correct for "CustomizedMetricSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.CustomizedMetricSpecification` resource
 *
 * @param properties - the TypeScript properties of a `CustomizedMetricSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.CustomizedMetricSpecification` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyCustomizedMetricSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_CustomizedMetricSpecificationPropertyValidator(properties).assertSuccess();
    return {
        Dimensions: cdk.listMapper(cfnScalingPolicyMetricDimensionPropertyToCloudFormation)(properties.dimensions),
        MetricName: cdk.stringToCloudFormation(properties.metricName),
        Namespace: cdk.stringToCloudFormation(properties.namespace),
        Statistic: cdk.stringToCloudFormation(properties.statistic),
        Unit: cdk.stringToCloudFormation(properties.unit),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyCustomizedMetricSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.CustomizedMetricSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.CustomizedMetricSpecificationProperty>();
    ret.addPropertyResult('dimensions', 'Dimensions', properties.Dimensions != null ? cfn_parse.FromCloudFormation.getArray(CfnScalingPolicyMetricDimensionPropertyFromCloudFormation)(properties.Dimensions) : undefined);
    ret.addPropertyResult('metricName', 'MetricName', cfn_parse.FromCloudFormation.getString(properties.MetricName));
    ret.addPropertyResult('namespace', 'Namespace', cfn_parse.FromCloudFormation.getString(properties.Namespace));
    ret.addPropertyResult('statistic', 'Statistic', cfn_parse.FromCloudFormation.getString(properties.Statistic));
    ret.addPropertyResult('unit', 'Unit', properties.Unit != null ? cfn_parse.FromCloudFormation.getString(properties.Unit) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * Represents a specific metric.
     *
     * `Metric` is a property of the [AWS::AutoScaling::ScalingPolicy MetricStat](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricstat.html) property type.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metric.html
     */
    export interface MetricProperty {
        /**
         * The dimensions for the metric. For the list of available dimensions, see the AWS documentation available from the table in [AWS services that publish CloudWatch metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html) in the *Amazon CloudWatch User Guide* .
         *
         * Conditional: If you published your metric with dimensions, you must specify the same dimensions in your scaling policy.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metric.html#cfn-autoscaling-scalingpolicy-metric-dimensions
         */
        readonly dimensions?: Array<CfnScalingPolicy.MetricDimensionProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The name of the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metric.html#cfn-autoscaling-scalingpolicy-metric-metricname
         */
        readonly metricName: string;
        /**
         * The namespace of the metric. For more information, see the table in [AWS services that publish CloudWatch metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html) in the *Amazon CloudWatch User Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metric.html#cfn-autoscaling-scalingpolicy-metric-namespace
         */
        readonly namespace: string;
    }
}

/**
 * Determine whether the given properties match those of a `MetricProperty`
 *
 * @param properties - the TypeScript properties of a `MetricProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicy_MetricPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dimensions', cdk.listValidator(CfnScalingPolicy_MetricDimensionPropertyValidator))(properties.dimensions));
    errors.collect(cdk.propertyValidator('metricName', cdk.requiredValidator)(properties.metricName));
    errors.collect(cdk.propertyValidator('metricName', cdk.validateString)(properties.metricName));
    errors.collect(cdk.propertyValidator('namespace', cdk.requiredValidator)(properties.namespace));
    errors.collect(cdk.propertyValidator('namespace', cdk.validateString)(properties.namespace));
    return errors.wrap('supplied properties not correct for "MetricProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.Metric` resource
 *
 * @param properties - the TypeScript properties of a `MetricProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.Metric` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyMetricPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_MetricPropertyValidator(properties).assertSuccess();
    return {
        Dimensions: cdk.listMapper(cfnScalingPolicyMetricDimensionPropertyToCloudFormation)(properties.dimensions),
        MetricName: cdk.stringToCloudFormation(properties.metricName),
        Namespace: cdk.stringToCloudFormation(properties.namespace),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyMetricPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.MetricProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.MetricProperty>();
    ret.addPropertyResult('dimensions', 'Dimensions', properties.Dimensions != null ? cfn_parse.FromCloudFormation.getArray(CfnScalingPolicyMetricDimensionPropertyFromCloudFormation)(properties.Dimensions) : undefined);
    ret.addPropertyResult('metricName', 'MetricName', cfn_parse.FromCloudFormation.getString(properties.MetricName));
    ret.addPropertyResult('namespace', 'Namespace', cfn_parse.FromCloudFormation.getString(properties.Namespace));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * The metric data to return. Also defines whether this call is returning data for one metric only, or whether it is performing a math expression on the values of returned metric statistics to create a new time series. A time series is a series of data points, each of which is associated with a timestamp.
     *
     * `MetricDataQuery` is a property of the following property types:
     *
     * - [AWS::AutoScaling::ScalingPolicy PredictiveScalingCustomizedScalingMetric](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingcustomizedscalingmetric.html)
     * - [AWS::AutoScaling::ScalingPolicy PredictiveScalingCustomizedLoadMetric](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingcustomizedloadmetric.html)
     * - [AWS::AutoScaling::ScalingPolicy PredictiveScalingCustomizedCapacityMetric](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingcustomizedcapacitymetric.html)
     *
     * Predictive scaling uses the time series data received from CloudWatch to understand how to schedule capacity based on your historical workload patterns.
     *
     * You can call for a single metric or perform math expressions on multiple metrics. Any expressions used in a metric specification must eventually return a single time series.
     *
     * For more information and examples, see [Advanced predictive scaling policy configurations using custom metrics](https://docs.aws.amazon.com/autoscaling/ec2/userguide/predictive-scaling-customized-metric-specification.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricdataquery.html
     */
    export interface MetricDataQueryProperty {
        /**
         * The math expression to perform on the returned data, if this object is performing a math expression. This expression can use the `Id` of the other metrics to refer to those metrics, and can also use the `Id` of other expressions to use the result of those expressions.
         *
         * Conditional: Within each `MetricDataQuery` object, you must specify either `Expression` or `MetricStat` , but not both.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricdataquery.html#cfn-autoscaling-scalingpolicy-metricdataquery-expression
         */
        readonly expression?: string;
        /**
         * A short name that identifies the object's results in the response. This name must be unique among all `MetricDataQuery` objects specified for a single scaling policy. If you are performing math expressions on this set of data, this name represents that data and can serve as a variable in the mathematical expression. The valid characters are letters, numbers, and underscores. The first character must be a lowercase letter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricdataquery.html#cfn-autoscaling-scalingpolicy-metricdataquery-id
         */
        readonly id: string;
        /**
         * A human-readable label for this metric or expression. This is especially useful if this is a math expression, so that you know what the value represents.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricdataquery.html#cfn-autoscaling-scalingpolicy-metricdataquery-label
         */
        readonly label?: string;
        /**
         * Information about the metric data to return.
         *
         * Conditional: Within each `MetricDataQuery` object, you must specify either `Expression` or `MetricStat` , but not both.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricdataquery.html#cfn-autoscaling-scalingpolicy-metricdataquery-metricstat
         */
        readonly metricStat?: CfnScalingPolicy.MetricStatProperty | cdk.IResolvable;
        /**
         * Indicates whether to return the timestamps and raw data values of this metric.
         *
         * If you use any math expressions, specify `true` for this value for only the final math expression that the metric specification is based on. You must specify `false` for `ReturnData` for all the other metrics and expressions used in the metric specification.
         *
         * If you are only retrieving metrics and not performing any math expressions, do not specify anything for `ReturnData` . This sets it to its default ( `true` ).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricdataquery.html#cfn-autoscaling-scalingpolicy-metricdataquery-returndata
         */
        readonly returnData?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MetricDataQueryProperty`
 *
 * @param properties - the TypeScript properties of a `MetricDataQueryProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicy_MetricDataQueryPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('expression', cdk.validateString)(properties.expression));
    errors.collect(cdk.propertyValidator('id', cdk.requiredValidator)(properties.id));
    errors.collect(cdk.propertyValidator('id', cdk.validateString)(properties.id));
    errors.collect(cdk.propertyValidator('label', cdk.validateString)(properties.label));
    errors.collect(cdk.propertyValidator('metricStat', CfnScalingPolicy_MetricStatPropertyValidator)(properties.metricStat));
    errors.collect(cdk.propertyValidator('returnData', cdk.validateBoolean)(properties.returnData));
    return errors.wrap('supplied properties not correct for "MetricDataQueryProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.MetricDataQuery` resource
 *
 * @param properties - the TypeScript properties of a `MetricDataQueryProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.MetricDataQuery` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyMetricDataQueryPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_MetricDataQueryPropertyValidator(properties).assertSuccess();
    return {
        Expression: cdk.stringToCloudFormation(properties.expression),
        Id: cdk.stringToCloudFormation(properties.id),
        Label: cdk.stringToCloudFormation(properties.label),
        MetricStat: cfnScalingPolicyMetricStatPropertyToCloudFormation(properties.metricStat),
        ReturnData: cdk.booleanToCloudFormation(properties.returnData),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyMetricDataQueryPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.MetricDataQueryProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.MetricDataQueryProperty>();
    ret.addPropertyResult('expression', 'Expression', properties.Expression != null ? cfn_parse.FromCloudFormation.getString(properties.Expression) : undefined);
    ret.addPropertyResult('id', 'Id', cfn_parse.FromCloudFormation.getString(properties.Id));
    ret.addPropertyResult('label', 'Label', properties.Label != null ? cfn_parse.FromCloudFormation.getString(properties.Label) : undefined);
    ret.addPropertyResult('metricStat', 'MetricStat', properties.MetricStat != null ? CfnScalingPolicyMetricStatPropertyFromCloudFormation(properties.MetricStat) : undefined);
    ret.addPropertyResult('returnData', 'ReturnData', properties.ReturnData != null ? cfn_parse.FromCloudFormation.getBoolean(properties.ReturnData) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * `MetricDimension` specifies a name/value pair that is part of the identity of a CloudWatch metric for the `Dimensions` property of the [AWS::AutoScaling::ScalingPolicy CustomizedMetricSpecification](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-customizedmetricspecification.html) property type. Duplicate dimensions are not allowed.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricdimension.html
     */
    export interface MetricDimensionProperty {
        /**
         * The name of the dimension.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricdimension.html#cfn-autoscaling-scalingpolicy-metricdimension-name
         */
        readonly name: string;
        /**
         * The value of the dimension.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricdimension.html#cfn-autoscaling-scalingpolicy-metricdimension-value
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
function CfnScalingPolicy_MetricDimensionPropertyValidator(properties: any): cdk.ValidationResult {
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
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.MetricDimension` resource
 *
 * @param properties - the TypeScript properties of a `MetricDimensionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.MetricDimension` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyMetricDimensionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_MetricDimensionPropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyMetricDimensionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.MetricDimensionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.MetricDimensionProperty>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * `MetricStat` is a property of the [AWS::AutoScaling::ScalingPolicy MetricDataQuery](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricdataquery.html) property type.
     *
     * This structure defines the CloudWatch metric to return, along with the statistic, period, and unit.
     *
     * For more information about the CloudWatch terminology below, see [Amazon CloudWatch concepts](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html) in the *Amazon CloudWatch User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricstat.html
     */
    export interface MetricStatProperty {
        /**
         * The CloudWatch metric to return, including the metric name, namespace, and dimensions. To get the exact metric name, namespace, and dimensions, inspect the [Metric](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_Metric.html) object that is returned by a call to [ListMetrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_ListMetrics.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricstat.html#cfn-autoscaling-scalingpolicy-metricstat-metric
         */
        readonly metric: CfnScalingPolicy.MetricProperty | cdk.IResolvable;
        /**
         * The statistic to return. It can include any CloudWatch statistic or extended statistic. For a list of valid values, see the table in [Statistics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Statistic) in the *Amazon CloudWatch User Guide* .
         *
         * The most commonly used metrics for predictive scaling are `Average` and `Sum` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricstat.html#cfn-autoscaling-scalingpolicy-metricstat-stat
         */
        readonly stat: string;
        /**
         * The unit to use for the returned data points. For a complete list of the units that CloudWatch supports, see the [MetricDatum](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_MetricDatum.html) data type in the *Amazon CloudWatch API Reference* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-metricstat.html#cfn-autoscaling-scalingpolicy-metricstat-unit
         */
        readonly unit?: string;
    }
}

/**
 * Determine whether the given properties match those of a `MetricStatProperty`
 *
 * @param properties - the TypeScript properties of a `MetricStatProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicy_MetricStatPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('metric', cdk.requiredValidator)(properties.metric));
    errors.collect(cdk.propertyValidator('metric', CfnScalingPolicy_MetricPropertyValidator)(properties.metric));
    errors.collect(cdk.propertyValidator('stat', cdk.requiredValidator)(properties.stat));
    errors.collect(cdk.propertyValidator('stat', cdk.validateString)(properties.stat));
    errors.collect(cdk.propertyValidator('unit', cdk.validateString)(properties.unit));
    return errors.wrap('supplied properties not correct for "MetricStatProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.MetricStat` resource
 *
 * @param properties - the TypeScript properties of a `MetricStatProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.MetricStat` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyMetricStatPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_MetricStatPropertyValidator(properties).assertSuccess();
    return {
        Metric: cfnScalingPolicyMetricPropertyToCloudFormation(properties.metric),
        Stat: cdk.stringToCloudFormation(properties.stat),
        Unit: cdk.stringToCloudFormation(properties.unit),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyMetricStatPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.MetricStatProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.MetricStatProperty>();
    ret.addPropertyResult('metric', 'Metric', CfnScalingPolicyMetricPropertyFromCloudFormation(properties.Metric));
    ret.addPropertyResult('stat', 'Stat', cfn_parse.FromCloudFormation.getString(properties.Stat));
    ret.addPropertyResult('unit', 'Unit', properties.Unit != null ? cfn_parse.FromCloudFormation.getString(properties.Unit) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * Contains predefined metric specification information for a target tracking scaling policy for Amazon EC2 Auto Scaling.
     *
     * `PredefinedMetricSpecification` is a property of the [AWS::AutoScaling::ScalingPolicy TargetTrackingConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-targettrackingconfiguration.html) property type.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predefinedmetricspecification.html
     */
    export interface PredefinedMetricSpecificationProperty {
        /**
         * The metric type. The following predefined metrics are available.
         *
         * - `ASGAverageCPUUtilization` - Average CPU utilization of the Auto Scaling group.
         * - `ASGAverageNetworkIn` - Average number of bytes received on all network interfaces by the Auto Scaling group.
         * - `ASGAverageNetworkOut` - Average number of bytes sent out on all network interfaces by the Auto Scaling group.
         * - `ALBRequestCountPerTarget` - Number of requests completed per target in an Application Load Balancer target group.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predefinedmetricspecification.html#cfn-autoscaling-scalingpolicy-predefinedmetricspecification-predefinedmetrictype
         */
        readonly predefinedMetricType: string;
        /**
         * Identifies the resource associated with the metric type. You can't specify a resource label unless the metric type is `ALBRequestCountPerTarget` and there is a target group attached to the Auto Scaling group.
         *
         * The format is `app/ *load-balancer-name* / *load-balancer-id* /targetgroup/ *target-group-name* / *target-group-id*` , where
         *
         * - `app/ *load-balancer-name* / *load-balancer-id*` is the final portion of the load balancer ARN, and
         * - `targetgroup/ *target-group-name* / *target-group-id*` is the final portion of the target group ARN.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predefinedmetricspecification.html#cfn-autoscaling-scalingpolicy-predefinedmetricspecification-resourcelabel
         */
        readonly resourceLabel?: string;
    }
}

/**
 * Determine whether the given properties match those of a `PredefinedMetricSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `PredefinedMetricSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicy_PredefinedMetricSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('predefinedMetricType', cdk.requiredValidator)(properties.predefinedMetricType));
    errors.collect(cdk.propertyValidator('predefinedMetricType', cdk.validateString)(properties.predefinedMetricType));
    errors.collect(cdk.propertyValidator('resourceLabel', cdk.validateString)(properties.resourceLabel));
    return errors.wrap('supplied properties not correct for "PredefinedMetricSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredefinedMetricSpecification` resource
 *
 * @param properties - the TypeScript properties of a `PredefinedMetricSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredefinedMetricSpecification` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyPredefinedMetricSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_PredefinedMetricSpecificationPropertyValidator(properties).assertSuccess();
    return {
        PredefinedMetricType: cdk.stringToCloudFormation(properties.predefinedMetricType),
        ResourceLabel: cdk.stringToCloudFormation(properties.resourceLabel),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyPredefinedMetricSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.PredefinedMetricSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.PredefinedMetricSpecificationProperty>();
    ret.addPropertyResult('predefinedMetricType', 'PredefinedMetricType', cfn_parse.FromCloudFormation.getString(properties.PredefinedMetricType));
    ret.addPropertyResult('resourceLabel', 'ResourceLabel', properties.ResourceLabel != null ? cfn_parse.FromCloudFormation.getString(properties.ResourceLabel) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * `PredictiveScalingConfiguration` is a property of the [AWS::AutoScaling::ScalingPolicy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html) resource that specifies a predictive scaling policy for Amazon EC2 Auto Scaling.
     *
     * For more information, see [Predictive scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-predictive-scaling.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingconfiguration.html
     */
    export interface PredictiveScalingConfigurationProperty {
        /**
         * Defines the behavior that should be applied if the forecast capacity approaches or exceeds the maximum capacity of the Auto Scaling group. Defaults to `HonorMaxCapacity` if not specified.
         *
         * The following are possible values:
         *
         * - `HonorMaxCapacity` - Amazon EC2 Auto Scaling cannot scale out capacity higher than the maximum capacity. The maximum capacity is enforced as a hard limit.
         * - `IncreaseMaxCapacity` - Amazon EC2 Auto Scaling can scale out capacity higher than the maximum capacity when the forecast capacity is close to or exceeds the maximum capacity. The upper limit is determined by the forecasted capacity and the value for `MaxCapacityBuffer` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingconfiguration.html#cfn-autoscaling-scalingpolicy-predictivescalingconfiguration-maxcapacitybreachbehavior
         */
        readonly maxCapacityBreachBehavior?: string;
        /**
         * The size of the capacity buffer to use when the forecast capacity is close to or exceeds the maximum capacity. The value is specified as a percentage relative to the forecast capacity. For example, if the buffer is 10, this means a 10 percent buffer, such that if the forecast capacity is 50, and the maximum capacity is 40, then the effective maximum capacity is 55.
         *
         * If set to 0, Amazon EC2 Auto Scaling may scale capacity higher than the maximum capacity to equal but not exceed forecast capacity.
         *
         * Required if the `MaxCapacityBreachBehavior` property is set to `IncreaseMaxCapacity` , and cannot be used otherwise.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingconfiguration.html#cfn-autoscaling-scalingpolicy-predictivescalingconfiguration-maxcapacitybuffer
         */
        readonly maxCapacityBuffer?: number;
        /**
         * An array that contains information about the metrics and target utilization to use for predictive scaling.
         *
         * > Adding more than one predictive scaling metric specification to the array is currently not supported.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingconfiguration.html#cfn-autoscaling-scalingpolicy-predictivescalingconfiguration-metricspecifications
         */
        readonly metricSpecifications: Array<CfnScalingPolicy.PredictiveScalingMetricSpecificationProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The predictive scaling mode. Defaults to `ForecastOnly` if not specified.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingconfiguration.html#cfn-autoscaling-scalingpolicy-predictivescalingconfiguration-mode
         */
        readonly mode?: string;
        /**
         * The amount of time, in seconds, by which the instance launch time can be advanced. For example, the forecast says to add capacity at 10:00 AM, and you choose to pre-launch instances by 5 minutes. In that case, the instances will be launched at 9:55 AM. The intention is to give resources time to be provisioned. It can take a few minutes to launch an EC2 instance. The actual amount of time required depends on several factors, such as the size of the instance and whether there are startup scripts to complete.
         *
         * The value must be less than the forecast interval duration of 3600 seconds (60 minutes). Defaults to 300 seconds if not specified.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingconfiguration.html#cfn-autoscaling-scalingpolicy-predictivescalingconfiguration-schedulingbuffertime
         */
        readonly schedulingBufferTime?: number;
    }
}

/**
 * Determine whether the given properties match those of a `PredictiveScalingConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicy_PredictiveScalingConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('maxCapacityBreachBehavior', cdk.validateString)(properties.maxCapacityBreachBehavior));
    errors.collect(cdk.propertyValidator('maxCapacityBuffer', cdk.validateNumber)(properties.maxCapacityBuffer));
    errors.collect(cdk.propertyValidator('metricSpecifications', cdk.requiredValidator)(properties.metricSpecifications));
    errors.collect(cdk.propertyValidator('metricSpecifications', cdk.listValidator(CfnScalingPolicy_PredictiveScalingMetricSpecificationPropertyValidator))(properties.metricSpecifications));
    errors.collect(cdk.propertyValidator('mode', cdk.validateString)(properties.mode));
    errors.collect(cdk.propertyValidator('schedulingBufferTime', cdk.validateNumber)(properties.schedulingBufferTime));
    return errors.wrap('supplied properties not correct for "PredictiveScalingConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyPredictiveScalingConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_PredictiveScalingConfigurationPropertyValidator(properties).assertSuccess();
    return {
        MaxCapacityBreachBehavior: cdk.stringToCloudFormation(properties.maxCapacityBreachBehavior),
        MaxCapacityBuffer: cdk.numberToCloudFormation(properties.maxCapacityBuffer),
        MetricSpecifications: cdk.listMapper(cfnScalingPolicyPredictiveScalingMetricSpecificationPropertyToCloudFormation)(properties.metricSpecifications),
        Mode: cdk.stringToCloudFormation(properties.mode),
        SchedulingBufferTime: cdk.numberToCloudFormation(properties.schedulingBufferTime),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyPredictiveScalingConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.PredictiveScalingConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.PredictiveScalingConfigurationProperty>();
    ret.addPropertyResult('maxCapacityBreachBehavior', 'MaxCapacityBreachBehavior', properties.MaxCapacityBreachBehavior != null ? cfn_parse.FromCloudFormation.getString(properties.MaxCapacityBreachBehavior) : undefined);
    ret.addPropertyResult('maxCapacityBuffer', 'MaxCapacityBuffer', properties.MaxCapacityBuffer != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxCapacityBuffer) : undefined);
    ret.addPropertyResult('metricSpecifications', 'MetricSpecifications', cfn_parse.FromCloudFormation.getArray(CfnScalingPolicyPredictiveScalingMetricSpecificationPropertyFromCloudFormation)(properties.MetricSpecifications));
    ret.addPropertyResult('mode', 'Mode', properties.Mode != null ? cfn_parse.FromCloudFormation.getString(properties.Mode) : undefined);
    ret.addPropertyResult('schedulingBufferTime', 'SchedulingBufferTime', properties.SchedulingBufferTime != null ? cfn_parse.FromCloudFormation.getNumber(properties.SchedulingBufferTime) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * Contains capacity metric information for the `CustomizedCapacityMetricSpecification` property of the [AWS::AutoScaling::ScalingPolicy PredictiveScalingMetricSpecification](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingmetricspecification.html) property type.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingcustomizedcapacitymetric.html
     */
    export interface PredictiveScalingCustomizedCapacityMetricProperty {
        /**
         * One or more metric data queries to provide the data points for a capacity metric. Use multiple metric data queries only if you are performing a math expression on returned data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingcustomizedcapacitymetric.html#cfn-autoscaling-scalingpolicy-predictivescalingcustomizedcapacitymetric-metricdataqueries
         */
        readonly metricDataQueries: Array<CfnScalingPolicy.MetricDataQueryProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `PredictiveScalingCustomizedCapacityMetricProperty`
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingCustomizedCapacityMetricProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicy_PredictiveScalingCustomizedCapacityMetricPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('metricDataQueries', cdk.requiredValidator)(properties.metricDataQueries));
    errors.collect(cdk.propertyValidator('metricDataQueries', cdk.listValidator(CfnScalingPolicy_MetricDataQueryPropertyValidator))(properties.metricDataQueries));
    return errors.wrap('supplied properties not correct for "PredictiveScalingCustomizedCapacityMetricProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingCustomizedCapacityMetric` resource
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingCustomizedCapacityMetricProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingCustomizedCapacityMetric` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyPredictiveScalingCustomizedCapacityMetricPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_PredictiveScalingCustomizedCapacityMetricPropertyValidator(properties).assertSuccess();
    return {
        MetricDataQueries: cdk.listMapper(cfnScalingPolicyMetricDataQueryPropertyToCloudFormation)(properties.metricDataQueries),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyPredictiveScalingCustomizedCapacityMetricPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.PredictiveScalingCustomizedCapacityMetricProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.PredictiveScalingCustomizedCapacityMetricProperty>();
    ret.addPropertyResult('metricDataQueries', 'MetricDataQueries', cfn_parse.FromCloudFormation.getArray(CfnScalingPolicyMetricDataQueryPropertyFromCloudFormation)(properties.MetricDataQueries));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * Contains load metric information for the `CustomizedLoadMetricSpecification` property of the [AWS::AutoScaling::ScalingPolicy PredictiveScalingMetricSpecification](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingmetricspecification.html) property type.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingcustomizedloadmetric.html
     */
    export interface PredictiveScalingCustomizedLoadMetricProperty {
        /**
         * One or more metric data queries to provide the data points for a load metric. Use multiple metric data queries only if you are performing a math expression on returned data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingcustomizedloadmetric.html#cfn-autoscaling-scalingpolicy-predictivescalingcustomizedloadmetric-metricdataqueries
         */
        readonly metricDataQueries: Array<CfnScalingPolicy.MetricDataQueryProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `PredictiveScalingCustomizedLoadMetricProperty`
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingCustomizedLoadMetricProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicy_PredictiveScalingCustomizedLoadMetricPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('metricDataQueries', cdk.requiredValidator)(properties.metricDataQueries));
    errors.collect(cdk.propertyValidator('metricDataQueries', cdk.listValidator(CfnScalingPolicy_MetricDataQueryPropertyValidator))(properties.metricDataQueries));
    return errors.wrap('supplied properties not correct for "PredictiveScalingCustomizedLoadMetricProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingCustomizedLoadMetric` resource
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingCustomizedLoadMetricProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingCustomizedLoadMetric` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyPredictiveScalingCustomizedLoadMetricPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_PredictiveScalingCustomizedLoadMetricPropertyValidator(properties).assertSuccess();
    return {
        MetricDataQueries: cdk.listMapper(cfnScalingPolicyMetricDataQueryPropertyToCloudFormation)(properties.metricDataQueries),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyPredictiveScalingCustomizedLoadMetricPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.PredictiveScalingCustomizedLoadMetricProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.PredictiveScalingCustomizedLoadMetricProperty>();
    ret.addPropertyResult('metricDataQueries', 'MetricDataQueries', cfn_parse.FromCloudFormation.getArray(CfnScalingPolicyMetricDataQueryPropertyFromCloudFormation)(properties.MetricDataQueries));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * Contains scaling metric information for the `CustomizedScalingMetricSpecification` property of the [AWS::AutoScaling::ScalingPolicy PredictiveScalingMetricSpecification](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingmetricspecification.html) property type.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingcustomizedscalingmetric.html
     */
    export interface PredictiveScalingCustomizedScalingMetricProperty {
        /**
         * One or more metric data queries to provide the data points for a scaling metric. Use multiple metric data queries only if you are performing a math expression on returned data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingcustomizedscalingmetric.html#cfn-autoscaling-scalingpolicy-predictivescalingcustomizedscalingmetric-metricdataqueries
         */
        readonly metricDataQueries: Array<CfnScalingPolicy.MetricDataQueryProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `PredictiveScalingCustomizedScalingMetricProperty`
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingCustomizedScalingMetricProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicy_PredictiveScalingCustomizedScalingMetricPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('metricDataQueries', cdk.requiredValidator)(properties.metricDataQueries));
    errors.collect(cdk.propertyValidator('metricDataQueries', cdk.listValidator(CfnScalingPolicy_MetricDataQueryPropertyValidator))(properties.metricDataQueries));
    return errors.wrap('supplied properties not correct for "PredictiveScalingCustomizedScalingMetricProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingCustomizedScalingMetric` resource
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingCustomizedScalingMetricProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingCustomizedScalingMetric` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyPredictiveScalingCustomizedScalingMetricPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_PredictiveScalingCustomizedScalingMetricPropertyValidator(properties).assertSuccess();
    return {
        MetricDataQueries: cdk.listMapper(cfnScalingPolicyMetricDataQueryPropertyToCloudFormation)(properties.metricDataQueries),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyPredictiveScalingCustomizedScalingMetricPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.PredictiveScalingCustomizedScalingMetricProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.PredictiveScalingCustomizedScalingMetricProperty>();
    ret.addPropertyResult('metricDataQueries', 'MetricDataQueries', cfn_parse.FromCloudFormation.getArray(CfnScalingPolicyMetricDataQueryPropertyFromCloudFormation)(properties.MetricDataQueries));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * A structure that specifies a metric specification for the `MetricSpecifications` property of the [AWS::AutoScaling::ScalingPolicy PredictiveScalingConfiguration](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingconfiguration.html) property type.
     *
     * For more information, see [Predictive scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-predictive-scaling.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingmetricspecification.html
     */
    export interface PredictiveScalingMetricSpecificationProperty {
        /**
         * The customized capacity metric specification.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingmetricspecification.html#cfn-autoscaling-scalingpolicy-predictivescalingmetricspecification-customizedcapacitymetricspecification
         */
        readonly customizedCapacityMetricSpecification?: CfnScalingPolicy.PredictiveScalingCustomizedCapacityMetricProperty | cdk.IResolvable;
        /**
         * The customized load metric specification.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingmetricspecification.html#cfn-autoscaling-scalingpolicy-predictivescalingmetricspecification-customizedloadmetricspecification
         */
        readonly customizedLoadMetricSpecification?: CfnScalingPolicy.PredictiveScalingCustomizedLoadMetricProperty | cdk.IResolvable;
        /**
         * The customized scaling metric specification.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingmetricspecification.html#cfn-autoscaling-scalingpolicy-predictivescalingmetricspecification-customizedscalingmetricspecification
         */
        readonly customizedScalingMetricSpecification?: CfnScalingPolicy.PredictiveScalingCustomizedScalingMetricProperty | cdk.IResolvable;
        /**
         * The load metric specification.
         *
         * If you specify `PredefinedMetricPairSpecification` , don't specify this property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingmetricspecification.html#cfn-autoscaling-scalingpolicy-predictivescalingmetricspecification-predefinedloadmetricspecification
         */
        readonly predefinedLoadMetricSpecification?: CfnScalingPolicy.PredictiveScalingPredefinedLoadMetricProperty | cdk.IResolvable;
        /**
         * The metric pair specification from which Amazon EC2 Auto Scaling determines the appropriate scaling metric and load metric to use.
         *
         * > With predictive scaling, you must specify either a metric pair, or a load metric and a scaling metric individually. Specifying a metric pair instead of individual metrics provides a simpler way to configure metrics for a scaling policy. You choose the metric pair, and the policy automatically knows the correct sum and average statistics to use for the load metric and the scaling metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingmetricspecification.html#cfn-autoscaling-scalingpolicy-predictivescalingmetricspecification-predefinedmetricpairspecification
         */
        readonly predefinedMetricPairSpecification?: CfnScalingPolicy.PredictiveScalingPredefinedMetricPairProperty | cdk.IResolvable;
        /**
         * The scaling metric specification.
         *
         * If you specify `PredefinedMetricPairSpecification` , don't specify this property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingmetricspecification.html#cfn-autoscaling-scalingpolicy-predictivescalingmetricspecification-predefinedscalingmetricspecification
         */
        readonly predefinedScalingMetricSpecification?: CfnScalingPolicy.PredictiveScalingPredefinedScalingMetricProperty | cdk.IResolvable;
        /**
         * Specifies the target utilization.
         *
         * > Some metrics are based on a count instead of a percentage, such as the request count for an Application Load Balancer or the number of messages in an SQS queue. If the scaling policy specifies one of these metrics, specify the target utilization as the optimal average request or message count per instance during any one-minute interval.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingmetricspecification.html#cfn-autoscaling-scalingpolicy-predictivescalingmetricspecification-targetvalue
         */
        readonly targetValue: number;
    }
}

/**
 * Determine whether the given properties match those of a `PredictiveScalingMetricSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingMetricSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicy_PredictiveScalingMetricSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('customizedCapacityMetricSpecification', CfnScalingPolicy_PredictiveScalingCustomizedCapacityMetricPropertyValidator)(properties.customizedCapacityMetricSpecification));
    errors.collect(cdk.propertyValidator('customizedLoadMetricSpecification', CfnScalingPolicy_PredictiveScalingCustomizedLoadMetricPropertyValidator)(properties.customizedLoadMetricSpecification));
    errors.collect(cdk.propertyValidator('customizedScalingMetricSpecification', CfnScalingPolicy_PredictiveScalingCustomizedScalingMetricPropertyValidator)(properties.customizedScalingMetricSpecification));
    errors.collect(cdk.propertyValidator('predefinedLoadMetricSpecification', CfnScalingPolicy_PredictiveScalingPredefinedLoadMetricPropertyValidator)(properties.predefinedLoadMetricSpecification));
    errors.collect(cdk.propertyValidator('predefinedMetricPairSpecification', CfnScalingPolicy_PredictiveScalingPredefinedMetricPairPropertyValidator)(properties.predefinedMetricPairSpecification));
    errors.collect(cdk.propertyValidator('predefinedScalingMetricSpecification', CfnScalingPolicy_PredictiveScalingPredefinedScalingMetricPropertyValidator)(properties.predefinedScalingMetricSpecification));
    errors.collect(cdk.propertyValidator('targetValue', cdk.requiredValidator)(properties.targetValue));
    errors.collect(cdk.propertyValidator('targetValue', cdk.validateNumber)(properties.targetValue));
    return errors.wrap('supplied properties not correct for "PredictiveScalingMetricSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingMetricSpecification` resource
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingMetricSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingMetricSpecification` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyPredictiveScalingMetricSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_PredictiveScalingMetricSpecificationPropertyValidator(properties).assertSuccess();
    return {
        CustomizedCapacityMetricSpecification: cfnScalingPolicyPredictiveScalingCustomizedCapacityMetricPropertyToCloudFormation(properties.customizedCapacityMetricSpecification),
        CustomizedLoadMetricSpecification: cfnScalingPolicyPredictiveScalingCustomizedLoadMetricPropertyToCloudFormation(properties.customizedLoadMetricSpecification),
        CustomizedScalingMetricSpecification: cfnScalingPolicyPredictiveScalingCustomizedScalingMetricPropertyToCloudFormation(properties.customizedScalingMetricSpecification),
        PredefinedLoadMetricSpecification: cfnScalingPolicyPredictiveScalingPredefinedLoadMetricPropertyToCloudFormation(properties.predefinedLoadMetricSpecification),
        PredefinedMetricPairSpecification: cfnScalingPolicyPredictiveScalingPredefinedMetricPairPropertyToCloudFormation(properties.predefinedMetricPairSpecification),
        PredefinedScalingMetricSpecification: cfnScalingPolicyPredictiveScalingPredefinedScalingMetricPropertyToCloudFormation(properties.predefinedScalingMetricSpecification),
        TargetValue: cdk.numberToCloudFormation(properties.targetValue),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyPredictiveScalingMetricSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.PredictiveScalingMetricSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.PredictiveScalingMetricSpecificationProperty>();
    ret.addPropertyResult('customizedCapacityMetricSpecification', 'CustomizedCapacityMetricSpecification', properties.CustomizedCapacityMetricSpecification != null ? CfnScalingPolicyPredictiveScalingCustomizedCapacityMetricPropertyFromCloudFormation(properties.CustomizedCapacityMetricSpecification) : undefined);
    ret.addPropertyResult('customizedLoadMetricSpecification', 'CustomizedLoadMetricSpecification', properties.CustomizedLoadMetricSpecification != null ? CfnScalingPolicyPredictiveScalingCustomizedLoadMetricPropertyFromCloudFormation(properties.CustomizedLoadMetricSpecification) : undefined);
    ret.addPropertyResult('customizedScalingMetricSpecification', 'CustomizedScalingMetricSpecification', properties.CustomizedScalingMetricSpecification != null ? CfnScalingPolicyPredictiveScalingCustomizedScalingMetricPropertyFromCloudFormation(properties.CustomizedScalingMetricSpecification) : undefined);
    ret.addPropertyResult('predefinedLoadMetricSpecification', 'PredefinedLoadMetricSpecification', properties.PredefinedLoadMetricSpecification != null ? CfnScalingPolicyPredictiveScalingPredefinedLoadMetricPropertyFromCloudFormation(properties.PredefinedLoadMetricSpecification) : undefined);
    ret.addPropertyResult('predefinedMetricPairSpecification', 'PredefinedMetricPairSpecification', properties.PredefinedMetricPairSpecification != null ? CfnScalingPolicyPredictiveScalingPredefinedMetricPairPropertyFromCloudFormation(properties.PredefinedMetricPairSpecification) : undefined);
    ret.addPropertyResult('predefinedScalingMetricSpecification', 'PredefinedScalingMetricSpecification', properties.PredefinedScalingMetricSpecification != null ? CfnScalingPolicyPredictiveScalingPredefinedScalingMetricPropertyFromCloudFormation(properties.PredefinedScalingMetricSpecification) : undefined);
    ret.addPropertyResult('targetValue', 'TargetValue', cfn_parse.FromCloudFormation.getNumber(properties.TargetValue));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * Contains load metric information for the `PredefinedLoadMetricSpecification` property of the [AWS::AutoScaling::ScalingPolicy PredictiveScalingMetricSpecification](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingmetricspecification.html) property type.
     *
     * > Does not apply to policies that use a *metric pair* for the metric specification.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingpredefinedloadmetric.html
     */
    export interface PredictiveScalingPredefinedLoadMetricProperty {
        /**
         * The metric type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingpredefinedloadmetric.html#cfn-autoscaling-scalingpolicy-predictivescalingpredefinedloadmetric-predefinedmetrictype
         */
        readonly predefinedMetricType: string;
        /**
         * A label that uniquely identifies a specific Application Load Balancer target group from which to determine the request count served by your Auto Scaling group. You can't specify a resource label unless the target group is attached to the Auto Scaling group.
         *
         * You create the resource label by appending the final portion of the load balancer ARN and the final portion of the target group ARN into a single value, separated by a forward slash (/). The format of the resource label is:
         *
         * `app/my-alb/778d41231b141a0f/targetgroup/my-alb-target-group/943f017f100becff` .
         *
         * Where:
         *
         * - app/<load-balancer-name>/<load-balancer-id> is the final portion of the load balancer ARN
         * - targetgroup/<target-group-name>/<target-group-id> is the final portion of the target group ARN.
         *
         * To find the ARN for an Application Load Balancer, use the [DescribeLoadBalancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_DescribeLoadBalancers.html) API operation. To find the ARN for the target group, use the [DescribeTargetGroups](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_DescribeTargetGroups.html) API operation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingpredefinedloadmetric.html#cfn-autoscaling-scalingpolicy-predictivescalingpredefinedloadmetric-resourcelabel
         */
        readonly resourceLabel?: string;
    }
}

/**
 * Determine whether the given properties match those of a `PredictiveScalingPredefinedLoadMetricProperty`
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingPredefinedLoadMetricProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicy_PredictiveScalingPredefinedLoadMetricPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('predefinedMetricType', cdk.requiredValidator)(properties.predefinedMetricType));
    errors.collect(cdk.propertyValidator('predefinedMetricType', cdk.validateString)(properties.predefinedMetricType));
    errors.collect(cdk.propertyValidator('resourceLabel', cdk.validateString)(properties.resourceLabel));
    return errors.wrap('supplied properties not correct for "PredictiveScalingPredefinedLoadMetricProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingPredefinedLoadMetric` resource
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingPredefinedLoadMetricProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingPredefinedLoadMetric` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyPredictiveScalingPredefinedLoadMetricPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_PredictiveScalingPredefinedLoadMetricPropertyValidator(properties).assertSuccess();
    return {
        PredefinedMetricType: cdk.stringToCloudFormation(properties.predefinedMetricType),
        ResourceLabel: cdk.stringToCloudFormation(properties.resourceLabel),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyPredictiveScalingPredefinedLoadMetricPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.PredictiveScalingPredefinedLoadMetricProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.PredictiveScalingPredefinedLoadMetricProperty>();
    ret.addPropertyResult('predefinedMetricType', 'PredefinedMetricType', cfn_parse.FromCloudFormation.getString(properties.PredefinedMetricType));
    ret.addPropertyResult('resourceLabel', 'ResourceLabel', properties.ResourceLabel != null ? cfn_parse.FromCloudFormation.getString(properties.ResourceLabel) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * Contains metric pair information for the `PredefinedMetricPairSpecification` property of the [AWS::AutoScaling::ScalingPolicy PredictiveScalingMetricSpecification](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingmetricspecification.html) property type.
     *
     * For more information, see [Predictive scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-predictive-scaling.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingpredefinedmetricpair.html
     */
    export interface PredictiveScalingPredefinedMetricPairProperty {
        /**
         * Indicates which metrics to use. There are two different types of metrics for each metric type: one is a load metric and one is a scaling metric. For example, if the metric type is `ASGCPUUtilization` , the Auto Scaling group's total CPU metric is used as the load metric, and the average CPU metric is used for the scaling metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingpredefinedmetricpair.html#cfn-autoscaling-scalingpolicy-predictivescalingpredefinedmetricpair-predefinedmetrictype
         */
        readonly predefinedMetricType: string;
        /**
         * A label that uniquely identifies a specific Application Load Balancer target group from which to determine the total and average request count served by your Auto Scaling group. You can't specify a resource label unless the target group is attached to the Auto Scaling group.
         *
         * You create the resource label by appending the final portion of the load balancer ARN and the final portion of the target group ARN into a single value, separated by a forward slash (/). The format of the resource label is:
         *
         * `app/my-alb/778d41231b141a0f/targetgroup/my-alb-target-group/943f017f100becff` .
         *
         * Where:
         *
         * - app/<load-balancer-name>/<load-balancer-id> is the final portion of the load balancer ARN
         * - targetgroup/<target-group-name>/<target-group-id> is the final portion of the target group ARN.
         *
         * To find the ARN for an Application Load Balancer, use the [DescribeLoadBalancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_DescribeLoadBalancers.html) API operation. To find the ARN for the target group, use the [DescribeTargetGroups](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_DescribeTargetGroups.html) API operation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingpredefinedmetricpair.html#cfn-autoscaling-scalingpolicy-predictivescalingpredefinedmetricpair-resourcelabel
         */
        readonly resourceLabel?: string;
    }
}

/**
 * Determine whether the given properties match those of a `PredictiveScalingPredefinedMetricPairProperty`
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingPredefinedMetricPairProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicy_PredictiveScalingPredefinedMetricPairPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('predefinedMetricType', cdk.requiredValidator)(properties.predefinedMetricType));
    errors.collect(cdk.propertyValidator('predefinedMetricType', cdk.validateString)(properties.predefinedMetricType));
    errors.collect(cdk.propertyValidator('resourceLabel', cdk.validateString)(properties.resourceLabel));
    return errors.wrap('supplied properties not correct for "PredictiveScalingPredefinedMetricPairProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingPredefinedMetricPair` resource
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingPredefinedMetricPairProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingPredefinedMetricPair` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyPredictiveScalingPredefinedMetricPairPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_PredictiveScalingPredefinedMetricPairPropertyValidator(properties).assertSuccess();
    return {
        PredefinedMetricType: cdk.stringToCloudFormation(properties.predefinedMetricType),
        ResourceLabel: cdk.stringToCloudFormation(properties.resourceLabel),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyPredictiveScalingPredefinedMetricPairPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.PredictiveScalingPredefinedMetricPairProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.PredictiveScalingPredefinedMetricPairProperty>();
    ret.addPropertyResult('predefinedMetricType', 'PredefinedMetricType', cfn_parse.FromCloudFormation.getString(properties.PredefinedMetricType));
    ret.addPropertyResult('resourceLabel', 'ResourceLabel', properties.ResourceLabel != null ? cfn_parse.FromCloudFormation.getString(properties.ResourceLabel) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * Contains scaling metric information for the `PredefinedScalingMetricSpecification` property of the [AWS::AutoScaling::ScalingPolicy PredictiveScalingMetricSpecification](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingmetricspecification.html) property type.
     *
     * > Does not apply to policies that use a *metric pair* for the metric specification.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingpredefinedscalingmetric.html
     */
    export interface PredictiveScalingPredefinedScalingMetricProperty {
        /**
         * The metric type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingpredefinedscalingmetric.html#cfn-autoscaling-scalingpolicy-predictivescalingpredefinedscalingmetric-predefinedmetrictype
         */
        readonly predefinedMetricType: string;
        /**
         * A label that uniquely identifies a specific Application Load Balancer target group from which to determine the average request count served by your Auto Scaling group. You can't specify a resource label unless the target group is attached to the Auto Scaling group.
         *
         * You create the resource label by appending the final portion of the load balancer ARN and the final portion of the target group ARN into a single value, separated by a forward slash (/). The format of the resource label is:
         *
         * `app/my-alb/778d41231b141a0f/targetgroup/my-alb-target-group/943f017f100becff` .
         *
         * Where:
         *
         * - app/<load-balancer-name>/<load-balancer-id> is the final portion of the load balancer ARN
         * - targetgroup/<target-group-name>/<target-group-id> is the final portion of the target group ARN.
         *
         * To find the ARN for an Application Load Balancer, use the [DescribeLoadBalancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_DescribeLoadBalancers.html) API operation. To find the ARN for the target group, use the [DescribeTargetGroups](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_DescribeTargetGroups.html) API operation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-predictivescalingpredefinedscalingmetric.html#cfn-autoscaling-scalingpolicy-predictivescalingpredefinedscalingmetric-resourcelabel
         */
        readonly resourceLabel?: string;
    }
}

/**
 * Determine whether the given properties match those of a `PredictiveScalingPredefinedScalingMetricProperty`
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingPredefinedScalingMetricProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicy_PredictiveScalingPredefinedScalingMetricPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('predefinedMetricType', cdk.requiredValidator)(properties.predefinedMetricType));
    errors.collect(cdk.propertyValidator('predefinedMetricType', cdk.validateString)(properties.predefinedMetricType));
    errors.collect(cdk.propertyValidator('resourceLabel', cdk.validateString)(properties.resourceLabel));
    return errors.wrap('supplied properties not correct for "PredictiveScalingPredefinedScalingMetricProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingPredefinedScalingMetric` resource
 *
 * @param properties - the TypeScript properties of a `PredictiveScalingPredefinedScalingMetricProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.PredictiveScalingPredefinedScalingMetric` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyPredictiveScalingPredefinedScalingMetricPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_PredictiveScalingPredefinedScalingMetricPropertyValidator(properties).assertSuccess();
    return {
        PredefinedMetricType: cdk.stringToCloudFormation(properties.predefinedMetricType),
        ResourceLabel: cdk.stringToCloudFormation(properties.resourceLabel),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyPredictiveScalingPredefinedScalingMetricPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.PredictiveScalingPredefinedScalingMetricProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.PredictiveScalingPredefinedScalingMetricProperty>();
    ret.addPropertyResult('predefinedMetricType', 'PredefinedMetricType', cfn_parse.FromCloudFormation.getString(properties.PredefinedMetricType));
    ret.addPropertyResult('resourceLabel', 'ResourceLabel', properties.ResourceLabel != null ? cfn_parse.FromCloudFormation.getString(properties.ResourceLabel) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * `StepAdjustment` specifies a step adjustment for the `StepAdjustments` property of the [AWS::AutoScaling::ScalingPolicy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html) resource.
     *
     * For the following examples, suppose that you have an alarm with a breach threshold of 50:
     *
     * - To trigger a step adjustment when the metric is greater than or equal to 50 and less than 60, specify a lower bound of 0 and an upper bound of 10.
     * - To trigger a step adjustment when the metric is greater than 40 and less than or equal to 50, specify a lower bound of -10 and an upper bound of 0.
     *
     * There are a few rules for the step adjustments for your step policy:
     *
     * - The ranges of your step adjustments can't overlap or have a gap.
     * - At most one step adjustment can have a null lower bound. If one step adjustment has a negative lower bound, then there must be a step adjustment with a null lower bound.
     * - At most one step adjustment can have a null upper bound. If one step adjustment has a positive upper bound, then there must be a step adjustment with a null upper bound.
     * - The upper and lower bound can't be null in the same step adjustment.
     *
     * For more information, see [Step adjustments](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html#as-scaling-steps) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * You can find a sample template snippet in the [Examples](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html#aws-properties-as-policy--examples) section of the `AWS::AutoScaling::ScalingPolicy` resource.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-stepadjustments.html
     */
    export interface StepAdjustmentProperty {
        /**
         * The lower bound for the difference between the alarm threshold and the CloudWatch metric. If the metric value is above the breach threshold, the lower bound is inclusive (the metric must be greater than or equal to the threshold plus the lower bound). Otherwise, it is exclusive (the metric must be greater than the threshold plus the lower bound). A null value indicates negative infinity.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-stepadjustments.html#cfn-autoscaling-scalingpolicy-stepadjustment-metricintervallowerbound
         */
        readonly metricIntervalLowerBound?: number;
        /**
         * The upper bound for the difference between the alarm threshold and the CloudWatch metric. If the metric value is above the breach threshold, the upper bound is exclusive (the metric must be less than the threshold plus the upper bound). Otherwise, it is inclusive (the metric must be less than or equal to the threshold plus the upper bound). A null value indicates positive infinity.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-stepadjustments.html#cfn-autoscaling-scalingpolicy-stepadjustment-metricintervalupperbound
         */
        readonly metricIntervalUpperBound?: number;
        /**
         * The amount by which to scale. The adjustment is based on the value that you specified in the `AdjustmentType` property (either an absolute number or a percentage). A positive value adds to the current capacity and a negative number subtracts from the current capacity.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-stepadjustments.html#cfn-autoscaling-scalingpolicy-stepadjustment-scalingadjustment
         */
        readonly scalingAdjustment: number;
    }
}

/**
 * Determine whether the given properties match those of a `StepAdjustmentProperty`
 *
 * @param properties - the TypeScript properties of a `StepAdjustmentProperty`
 *
 * @returns the result of the validation.
 */
function CfnScalingPolicy_StepAdjustmentPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('metricIntervalLowerBound', cdk.validateNumber)(properties.metricIntervalLowerBound));
    errors.collect(cdk.propertyValidator('metricIntervalUpperBound', cdk.validateNumber)(properties.metricIntervalUpperBound));
    errors.collect(cdk.propertyValidator('scalingAdjustment', cdk.requiredValidator)(properties.scalingAdjustment));
    errors.collect(cdk.propertyValidator('scalingAdjustment', cdk.validateNumber)(properties.scalingAdjustment));
    return errors.wrap('supplied properties not correct for "StepAdjustmentProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.StepAdjustment` resource
 *
 * @param properties - the TypeScript properties of a `StepAdjustmentProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.StepAdjustment` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyStepAdjustmentPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_StepAdjustmentPropertyValidator(properties).assertSuccess();
    return {
        MetricIntervalLowerBound: cdk.numberToCloudFormation(properties.metricIntervalLowerBound),
        MetricIntervalUpperBound: cdk.numberToCloudFormation(properties.metricIntervalUpperBound),
        ScalingAdjustment: cdk.numberToCloudFormation(properties.scalingAdjustment),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyStepAdjustmentPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.StepAdjustmentProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.StepAdjustmentProperty>();
    ret.addPropertyResult('metricIntervalLowerBound', 'MetricIntervalLowerBound', properties.MetricIntervalLowerBound != null ? cfn_parse.FromCloudFormation.getNumber(properties.MetricIntervalLowerBound) : undefined);
    ret.addPropertyResult('metricIntervalUpperBound', 'MetricIntervalUpperBound', properties.MetricIntervalUpperBound != null ? cfn_parse.FromCloudFormation.getNumber(properties.MetricIntervalUpperBound) : undefined);
    ret.addPropertyResult('scalingAdjustment', 'ScalingAdjustment', cfn_parse.FromCloudFormation.getNumber(properties.ScalingAdjustment));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScalingPolicy {
    /**
     * `TargetTrackingConfiguration` is a property of the [AWS::AutoScaling::ScalingPolicy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-as-policy.html) resource that specifies a target tracking scaling policy configuration for Amazon EC2 Auto Scaling.
     *
     * For more information about scaling policies, see [Dynamic scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scale-based-on-demand.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-targettrackingconfiguration.html
     */
    export interface TargetTrackingConfigurationProperty {
        /**
         * A customized metric. You must specify either a predefined metric or a customized metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-targettrackingconfiguration.html#cfn-autoscaling-scalingpolicy-targettrackingconfiguration-customizedmetricspecification
         */
        readonly customizedMetricSpecification?: CfnScalingPolicy.CustomizedMetricSpecificationProperty | cdk.IResolvable;
        /**
         * Indicates whether scaling in by the target tracking scaling policy is disabled. If scaling in is disabled, the target tracking scaling policy doesn't remove instances from the Auto Scaling group. Otherwise, the target tracking scaling policy can remove instances from the Auto Scaling group. The default is `false` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-targettrackingconfiguration.html#cfn-autoscaling-scalingpolicy-targettrackingconfiguration-disablescalein
         */
        readonly disableScaleIn?: boolean | cdk.IResolvable;
        /**
         * A predefined metric. You must specify either a predefined metric or a customized metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-targettrackingconfiguration.html#cfn-autoscaling-scalingpolicy-targettrackingconfiguration-predefinedmetricspecification
         */
        readonly predefinedMetricSpecification?: CfnScalingPolicy.PredefinedMetricSpecificationProperty | cdk.IResolvable;
        /**
         * The target value for the metric.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-scalingpolicy-targettrackingconfiguration.html#cfn-autoscaling-scalingpolicy-targettrackingconfiguration-targetvalue
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
function CfnScalingPolicy_TargetTrackingConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('customizedMetricSpecification', CfnScalingPolicy_CustomizedMetricSpecificationPropertyValidator)(properties.customizedMetricSpecification));
    errors.collect(cdk.propertyValidator('disableScaleIn', cdk.validateBoolean)(properties.disableScaleIn));
    errors.collect(cdk.propertyValidator('predefinedMetricSpecification', CfnScalingPolicy_PredefinedMetricSpecificationPropertyValidator)(properties.predefinedMetricSpecification));
    errors.collect(cdk.propertyValidator('targetValue', cdk.requiredValidator)(properties.targetValue));
    errors.collect(cdk.propertyValidator('targetValue', cdk.validateNumber)(properties.targetValue));
    return errors.wrap('supplied properties not correct for "TargetTrackingConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.TargetTrackingConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `TargetTrackingConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScalingPolicy.TargetTrackingConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnScalingPolicyTargetTrackingConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScalingPolicy_TargetTrackingConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CustomizedMetricSpecification: cfnScalingPolicyCustomizedMetricSpecificationPropertyToCloudFormation(properties.customizedMetricSpecification),
        DisableScaleIn: cdk.booleanToCloudFormation(properties.disableScaleIn),
        PredefinedMetricSpecification: cfnScalingPolicyPredefinedMetricSpecificationPropertyToCloudFormation(properties.predefinedMetricSpecification),
        TargetValue: cdk.numberToCloudFormation(properties.targetValue),
    };
}

// @ts-ignore TS6133
function CfnScalingPolicyTargetTrackingConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScalingPolicy.TargetTrackingConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScalingPolicy.TargetTrackingConfigurationProperty>();
    ret.addPropertyResult('customizedMetricSpecification', 'CustomizedMetricSpecification', properties.CustomizedMetricSpecification != null ? CfnScalingPolicyCustomizedMetricSpecificationPropertyFromCloudFormation(properties.CustomizedMetricSpecification) : undefined);
    ret.addPropertyResult('disableScaleIn', 'DisableScaleIn', properties.DisableScaleIn != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DisableScaleIn) : undefined);
    ret.addPropertyResult('predefinedMetricSpecification', 'PredefinedMetricSpecification', properties.PredefinedMetricSpecification != null ? CfnScalingPolicyPredefinedMetricSpecificationPropertyFromCloudFormation(properties.PredefinedMetricSpecification) : undefined);
    ret.addPropertyResult('targetValue', 'TargetValue', cfn_parse.FromCloudFormation.getNumber(properties.TargetValue));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnScheduledAction`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html
 */
export interface CfnScheduledActionProps {

    /**
     * The name of the Auto Scaling group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-asgname
     */
    readonly autoScalingGroupName: string;

    /**
     * The desired capacity is the initial capacity of the Auto Scaling group after the scheduled action runs and the capacity it attempts to maintain. It can scale beyond this capacity if you add more scaling conditions.
     *
     * You must specify at least one of the following properties: `MaxSize` , `MinSize` , or `DesiredCapacity` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-desiredcapacity
     */
    readonly desiredCapacity?: number;

    /**
     * The date and time for the recurring schedule to end, in UTC. For example, `"2021-06-01T00:00:00Z"` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-endtime
     */
    readonly endTime?: string;

    /**
     * The maximum size of the Auto Scaling group.
     *
     * You must specify at least one of the following properties: `MaxSize` , `MinSize` , or `DesiredCapacity` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-maxsize
     */
    readonly maxSize?: number;

    /**
     * The minimum size of the Auto Scaling group.
     *
     * You must specify at least one of the following properties: `MaxSize` , `MinSize` , or `DesiredCapacity` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-minsize
     */
    readonly minSize?: number;

    /**
     * The recurring schedule for this action. This format consists of five fields separated by white spaces: [Minute] [Hour] [Day_of_Month] [Month_of_Year] [Day_of_Week]. For more information about this format, see [Crontab](https://docs.aws.amazon.com/http://crontab.org) .
     *
     * When `StartTime` and `EndTime` are specified with `Recurrence` , they form the boundaries of when the recurring action starts and stops.
     *
     * Cron expressions use Universal Coordinated Time (UTC) by default.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-recurrence
     */
    readonly recurrence?: string;

    /**
     * The date and time for this action to start, in YYYY-MM-DDThh:mm:ssZ format in UTC/GMT only. For example, `"2021-06-01T00:00:00Z"` .
     *
     * If you specify `Recurrence` and `StartTime` , Amazon EC2 Auto Scaling performs the action at this time, and then performs the action based on the specified recurrence.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-starttime
     */
    readonly startTime?: string;

    /**
     * Specifies the time zone for a cron expression. If a time zone is not provided, UTC is used by default.
     *
     * Valid values are the canonical names of the IANA time zones, derived from the IANA Time Zone Database (such as `Etc/GMT+9` or `Pacific/Tahiti` ). For more information, see [https://en.wikipedia.org/wiki/List_of_tz_database_time_zones](https://docs.aws.amazon.com/https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-timezone
     */
    readonly timeZone?: string;
}

/**
 * Determine whether the given properties match those of a `CfnScheduledActionProps`
 *
 * @param properties - the TypeScript properties of a `CfnScheduledActionProps`
 *
 * @returns the result of the validation.
 */
function CfnScheduledActionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('autoScalingGroupName', cdk.requiredValidator)(properties.autoScalingGroupName));
    errors.collect(cdk.propertyValidator('autoScalingGroupName', cdk.validateString)(properties.autoScalingGroupName));
    errors.collect(cdk.propertyValidator('desiredCapacity', cdk.validateNumber)(properties.desiredCapacity));
    errors.collect(cdk.propertyValidator('endTime', cdk.validateString)(properties.endTime));
    errors.collect(cdk.propertyValidator('maxSize', cdk.validateNumber)(properties.maxSize));
    errors.collect(cdk.propertyValidator('minSize', cdk.validateNumber)(properties.minSize));
    errors.collect(cdk.propertyValidator('recurrence', cdk.validateString)(properties.recurrence));
    errors.collect(cdk.propertyValidator('startTime', cdk.validateString)(properties.startTime));
    errors.collect(cdk.propertyValidator('timeZone', cdk.validateString)(properties.timeZone));
    return errors.wrap('supplied properties not correct for "CfnScheduledActionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::ScheduledAction` resource
 *
 * @param properties - the TypeScript properties of a `CfnScheduledActionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::ScheduledAction` resource.
 */
// @ts-ignore TS6133
function cfnScheduledActionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScheduledActionPropsValidator(properties).assertSuccess();
    return {
        AutoScalingGroupName: cdk.stringToCloudFormation(properties.autoScalingGroupName),
        DesiredCapacity: cdk.numberToCloudFormation(properties.desiredCapacity),
        EndTime: cdk.stringToCloudFormation(properties.endTime),
        MaxSize: cdk.numberToCloudFormation(properties.maxSize),
        MinSize: cdk.numberToCloudFormation(properties.minSize),
        Recurrence: cdk.stringToCloudFormation(properties.recurrence),
        StartTime: cdk.stringToCloudFormation(properties.startTime),
        TimeZone: cdk.stringToCloudFormation(properties.timeZone),
    };
}

// @ts-ignore TS6133
function CfnScheduledActionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScheduledActionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScheduledActionProps>();
    ret.addPropertyResult('autoScalingGroupName', 'AutoScalingGroupName', cfn_parse.FromCloudFormation.getString(properties.AutoScalingGroupName));
    ret.addPropertyResult('desiredCapacity', 'DesiredCapacity', properties.DesiredCapacity != null ? cfn_parse.FromCloudFormation.getNumber(properties.DesiredCapacity) : undefined);
    ret.addPropertyResult('endTime', 'EndTime', properties.EndTime != null ? cfn_parse.FromCloudFormation.getString(properties.EndTime) : undefined);
    ret.addPropertyResult('maxSize', 'MaxSize', properties.MaxSize != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxSize) : undefined);
    ret.addPropertyResult('minSize', 'MinSize', properties.MinSize != null ? cfn_parse.FromCloudFormation.getNumber(properties.MinSize) : undefined);
    ret.addPropertyResult('recurrence', 'Recurrence', properties.Recurrence != null ? cfn_parse.FromCloudFormation.getString(properties.Recurrence) : undefined);
    ret.addPropertyResult('startTime', 'StartTime', properties.StartTime != null ? cfn_parse.FromCloudFormation.getString(properties.StartTime) : undefined);
    ret.addPropertyResult('timeZone', 'TimeZone', properties.TimeZone != null ? cfn_parse.FromCloudFormation.getString(properties.TimeZone) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AutoScaling::ScheduledAction`
 *
 * The `AWS::AutoScaling::ScheduledAction` resource specifies an Amazon EC2 Auto Scaling scheduled action so that the Auto Scaling group can change the number of instances available for your application in response to predictable load changes.
 *
 * When you update a stack with an Auto Scaling group and scheduled action, CloudFormation always sets the min size, max size, and desired capacity properties of your group to the values that are defined in the `AWS::AutoScaling::AutoScalingGroup` section of your template. However, you might not want CloudFormation to do that when you have a scheduled action in effect. You can use an [UpdatePolicy attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatepolicy.html) to prevent CloudFormation from changing the min size, max size, or desired capacity property values during a stack update unless you modified the individual values in your template. If you have rolling updates enabled, before you can update the Auto Scaling group, you must suspend scheduled actions by specifying an [UpdatePolicy attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatepolicy.html) for the Auto Scaling group. You can find a sample update policy for rolling updates in [Auto scaling template snippets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-autoscaling.html) .
 *
 * For more information, see [Scheduled scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/schedule_time.html) and [Suspending and resuming scaling processes](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-suspend-resume-processes.html) in the *Amazon EC2 Auto Scaling User Guide* .
 *
 * @cloudformationResource AWS::AutoScaling::ScheduledAction
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html
 */
export class CfnScheduledAction extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AutoScaling::ScheduledAction";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnScheduledAction {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnScheduledActionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnScheduledAction(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the Auto Scaling group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-asgname
     */
    public autoScalingGroupName: string;

    /**
     * The desired capacity is the initial capacity of the Auto Scaling group after the scheduled action runs and the capacity it attempts to maintain. It can scale beyond this capacity if you add more scaling conditions.
     *
     * You must specify at least one of the following properties: `MaxSize` , `MinSize` , or `DesiredCapacity` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-desiredcapacity
     */
    public desiredCapacity: number | undefined;

    /**
     * The date and time for the recurring schedule to end, in UTC. For example, `"2021-06-01T00:00:00Z"` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-endtime
     */
    public endTime: string | undefined;

    /**
     * The maximum size of the Auto Scaling group.
     *
     * You must specify at least one of the following properties: `MaxSize` , `MinSize` , or `DesiredCapacity` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-maxsize
     */
    public maxSize: number | undefined;

    /**
     * The minimum size of the Auto Scaling group.
     *
     * You must specify at least one of the following properties: `MaxSize` , `MinSize` , or `DesiredCapacity` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-minsize
     */
    public minSize: number | undefined;

    /**
     * The recurring schedule for this action. This format consists of five fields separated by white spaces: [Minute] [Hour] [Day_of_Month] [Month_of_Year] [Day_of_Week]. For more information about this format, see [Crontab](https://docs.aws.amazon.com/http://crontab.org) .
     *
     * When `StartTime` and `EndTime` are specified with `Recurrence` , they form the boundaries of when the recurring action starts and stops.
     *
     * Cron expressions use Universal Coordinated Time (UTC) by default.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-recurrence
     */
    public recurrence: string | undefined;

    /**
     * The date and time for this action to start, in YYYY-MM-DDThh:mm:ssZ format in UTC/GMT only. For example, `"2021-06-01T00:00:00Z"` .
     *
     * If you specify `Recurrence` and `StartTime` , Amazon EC2 Auto Scaling performs the action at this time, and then performs the action based on the specified recurrence.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-starttime
     */
    public startTime: string | undefined;

    /**
     * Specifies the time zone for a cron expression. If a time zone is not provided, UTC is used by default.
     *
     * Valid values are the canonical names of the IANA time zones, derived from the IANA Time Zone Database (such as `Etc/GMT+9` or `Pacific/Tahiti` ). For more information, see [https://en.wikipedia.org/wiki/List_of_tz_database_time_zones](https://docs.aws.amazon.com/https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-as-scheduledaction.html#cfn-as-scheduledaction-timezone
     */
    public timeZone: string | undefined;

    /**
     * Create a new `AWS::AutoScaling::ScheduledAction`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnScheduledActionProps) {
        super(scope, id, { type: CfnScheduledAction.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'autoScalingGroupName', this);

        this.autoScalingGroupName = props.autoScalingGroupName;
        this.desiredCapacity = props.desiredCapacity;
        this.endTime = props.endTime;
        this.maxSize = props.maxSize;
        this.minSize = props.minSize;
        this.recurrence = props.recurrence;
        this.startTime = props.startTime;
        this.timeZone = props.timeZone;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnScheduledAction.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            autoScalingGroupName: this.autoScalingGroupName,
            desiredCapacity: this.desiredCapacity,
            endTime: this.endTime,
            maxSize: this.maxSize,
            minSize: this.minSize,
            recurrence: this.recurrence,
            startTime: this.startTime,
            timeZone: this.timeZone,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnScheduledActionPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnWarmPool`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-warmpool.html
 */
export interface CfnWarmPoolProps {

    /**
     * The name of the Auto Scaling group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-warmpool.html#cfn-autoscaling-warmpool-autoscalinggroupname
     */
    readonly autoScalingGroupName: string;

    /**
     * Indicates whether instances in the Auto Scaling group can be returned to the warm pool on scale in. The default is to terminate instances in the Auto Scaling group when the group scales in.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-warmpool.html#cfn-autoscaling-warmpool-instancereusepolicy
     */
    readonly instanceReusePolicy?: CfnWarmPool.InstanceReusePolicyProperty | cdk.IResolvable;

    /**
     * Specifies the maximum number of instances that are allowed to be in the warm pool or in any state except `Terminated` for the Auto Scaling group. This is an optional property. Specify it only if you do not want the warm pool size to be determined by the difference between the group's maximum capacity and its desired capacity.
     *
     * > If a value for `MaxGroupPreparedCapacity` is not specified, Amazon EC2 Auto Scaling launches and maintains the difference between the group's maximum capacity and its desired capacity. If you specify a value for `MaxGroupPreparedCapacity` , Amazon EC2 Auto Scaling uses the difference between the `MaxGroupPreparedCapacity` and the desired capacity instead.
     * >
     * > The size of the warm pool is dynamic. Only when `MaxGroupPreparedCapacity` and `MinSize` are set to the same value does the warm pool have an absolute size.
     *
     * If the desired capacity of the Auto Scaling group is higher than the `MaxGroupPreparedCapacity` , the capacity of the warm pool is 0, unless you specify a value for `MinSize` . To remove a value that you previously set, include the property but specify -1 for the value.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-warmpool.html#cfn-autoscaling-warmpool-maxgrouppreparedcapacity
     */
    readonly maxGroupPreparedCapacity?: number;

    /**
     * Specifies the minimum number of instances to maintain in the warm pool. This helps you to ensure that there is always a certain number of warmed instances available to handle traffic spikes. Defaults to 0 if not specified.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-warmpool.html#cfn-autoscaling-warmpool-minsize
     */
    readonly minSize?: number;

    /**
     * Sets the instance state to transition to after the lifecycle actions are complete. Default is `Stopped` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-warmpool.html#cfn-autoscaling-warmpool-poolstate
     */
    readonly poolState?: string;
}

/**
 * Determine whether the given properties match those of a `CfnWarmPoolProps`
 *
 * @param properties - the TypeScript properties of a `CfnWarmPoolProps`
 *
 * @returns the result of the validation.
 */
function CfnWarmPoolPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('autoScalingGroupName', cdk.requiredValidator)(properties.autoScalingGroupName));
    errors.collect(cdk.propertyValidator('autoScalingGroupName', cdk.validateString)(properties.autoScalingGroupName));
    errors.collect(cdk.propertyValidator('instanceReusePolicy', CfnWarmPool_InstanceReusePolicyPropertyValidator)(properties.instanceReusePolicy));
    errors.collect(cdk.propertyValidator('maxGroupPreparedCapacity', cdk.validateNumber)(properties.maxGroupPreparedCapacity));
    errors.collect(cdk.propertyValidator('minSize', cdk.validateNumber)(properties.minSize));
    errors.collect(cdk.propertyValidator('poolState', cdk.validateString)(properties.poolState));
    return errors.wrap('supplied properties not correct for "CfnWarmPoolProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::WarmPool` resource
 *
 * @param properties - the TypeScript properties of a `CfnWarmPoolProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::WarmPool` resource.
 */
// @ts-ignore TS6133
function cfnWarmPoolPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnWarmPoolPropsValidator(properties).assertSuccess();
    return {
        AutoScalingGroupName: cdk.stringToCloudFormation(properties.autoScalingGroupName),
        InstanceReusePolicy: cfnWarmPoolInstanceReusePolicyPropertyToCloudFormation(properties.instanceReusePolicy),
        MaxGroupPreparedCapacity: cdk.numberToCloudFormation(properties.maxGroupPreparedCapacity),
        MinSize: cdk.numberToCloudFormation(properties.minSize),
        PoolState: cdk.stringToCloudFormation(properties.poolState),
    };
}

// @ts-ignore TS6133
function CfnWarmPoolPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnWarmPoolProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnWarmPoolProps>();
    ret.addPropertyResult('autoScalingGroupName', 'AutoScalingGroupName', cfn_parse.FromCloudFormation.getString(properties.AutoScalingGroupName));
    ret.addPropertyResult('instanceReusePolicy', 'InstanceReusePolicy', properties.InstanceReusePolicy != null ? CfnWarmPoolInstanceReusePolicyPropertyFromCloudFormation(properties.InstanceReusePolicy) : undefined);
    ret.addPropertyResult('maxGroupPreparedCapacity', 'MaxGroupPreparedCapacity', properties.MaxGroupPreparedCapacity != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxGroupPreparedCapacity) : undefined);
    ret.addPropertyResult('minSize', 'MinSize', properties.MinSize != null ? cfn_parse.FromCloudFormation.getNumber(properties.MinSize) : undefined);
    ret.addPropertyResult('poolState', 'PoolState', properties.PoolState != null ? cfn_parse.FromCloudFormation.getString(properties.PoolState) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AutoScaling::WarmPool`
 *
 * The `AWS::AutoScaling::WarmPool` resource creates a pool of pre-initialized EC2 instances that sits alongside the Auto Scaling group. Whenever your application needs to scale out, the Auto Scaling group can draw on the warm pool to meet its new desired capacity.
 *
 * When you create a warm pool, you can define a minimum size. When your Auto Scaling group scales out and the size of the warm pool shrinks, Amazon EC2 Auto Scaling launches new instances into the warm pool to maintain its minimum size.
 *
 * For more information, see [Warm pools for Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html) in the *Amazon EC2 Auto Scaling User Guide* .
 *
 * > CloudFormation supports the `UpdatePolicy` attribute for Auto Scaling groups. During an update, if `UpdatePolicy` is set to `AutoScalingRollingUpdate` , CloudFormation replaces `InService` instances only. Instances in the warm pool are not replaced. The difference in which instances are replaced can potentially result in different instance configurations after the stack update completes. If `UpdatePolicy` is set to `AutoScalingReplacingUpdate` , you do not encounter this issue because CloudFormation replaces both the Auto Scaling group and the warm pool.
 *
 * @cloudformationResource AWS::AutoScaling::WarmPool
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-warmpool.html
 */
export class CfnWarmPool extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AutoScaling::WarmPool";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnWarmPool {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnWarmPoolPropsFromCloudFormation(resourceProperties);
        const ret = new CfnWarmPool(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the Auto Scaling group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-warmpool.html#cfn-autoscaling-warmpool-autoscalinggroupname
     */
    public autoScalingGroupName: string;

    /**
     * Indicates whether instances in the Auto Scaling group can be returned to the warm pool on scale in. The default is to terminate instances in the Auto Scaling group when the group scales in.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-warmpool.html#cfn-autoscaling-warmpool-instancereusepolicy
     */
    public instanceReusePolicy: CfnWarmPool.InstanceReusePolicyProperty | cdk.IResolvable | undefined;

    /**
     * Specifies the maximum number of instances that are allowed to be in the warm pool or in any state except `Terminated` for the Auto Scaling group. This is an optional property. Specify it only if you do not want the warm pool size to be determined by the difference between the group's maximum capacity and its desired capacity.
     *
     * > If a value for `MaxGroupPreparedCapacity` is not specified, Amazon EC2 Auto Scaling launches and maintains the difference between the group's maximum capacity and its desired capacity. If you specify a value for `MaxGroupPreparedCapacity` , Amazon EC2 Auto Scaling uses the difference between the `MaxGroupPreparedCapacity` and the desired capacity instead.
     * >
     * > The size of the warm pool is dynamic. Only when `MaxGroupPreparedCapacity` and `MinSize` are set to the same value does the warm pool have an absolute size.
     *
     * If the desired capacity of the Auto Scaling group is higher than the `MaxGroupPreparedCapacity` , the capacity of the warm pool is 0, unless you specify a value for `MinSize` . To remove a value that you previously set, include the property but specify -1 for the value.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-warmpool.html#cfn-autoscaling-warmpool-maxgrouppreparedcapacity
     */
    public maxGroupPreparedCapacity: number | undefined;

    /**
     * Specifies the minimum number of instances to maintain in the warm pool. This helps you to ensure that there is always a certain number of warmed instances available to handle traffic spikes. Defaults to 0 if not specified.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-warmpool.html#cfn-autoscaling-warmpool-minsize
     */
    public minSize: number | undefined;

    /**
     * Sets the instance state to transition to after the lifecycle actions are complete. Default is `Stopped` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-warmpool.html#cfn-autoscaling-warmpool-poolstate
     */
    public poolState: string | undefined;

    /**
     * Create a new `AWS::AutoScaling::WarmPool`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnWarmPoolProps) {
        super(scope, id, { type: CfnWarmPool.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'autoScalingGroupName', this);

        this.autoScalingGroupName = props.autoScalingGroupName;
        this.instanceReusePolicy = props.instanceReusePolicy;
        this.maxGroupPreparedCapacity = props.maxGroupPreparedCapacity;
        this.minSize = props.minSize;
        this.poolState = props.poolState;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnWarmPool.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            autoScalingGroupName: this.autoScalingGroupName,
            instanceReusePolicy: this.instanceReusePolicy,
            maxGroupPreparedCapacity: this.maxGroupPreparedCapacity,
            minSize: this.minSize,
            poolState: this.poolState,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnWarmPoolPropsToCloudFormation(props);
    }
}

export namespace CfnWarmPool {
    /**
     * A structure that specifies an instance reuse policy for the `InstanceReusePolicy` property of the [AWS::AutoScaling::WarmPool](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-warmpool.html) resource.
     *
     * For more information, see [Warm pools for Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html) in the *Amazon EC2 Auto Scaling User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-warmpool-instancereusepolicy.html
     */
    export interface InstanceReusePolicyProperty {
        /**
         * Specifies whether instances in the Auto Scaling group can be returned to the warm pool on scale in.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-autoscaling-warmpool-instancereusepolicy.html#cfn-autoscaling-warmpool-instancereusepolicy-reuseonscalein
         */
        readonly reuseOnScaleIn?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `InstanceReusePolicyProperty`
 *
 * @param properties - the TypeScript properties of a `InstanceReusePolicyProperty`
 *
 * @returns the result of the validation.
 */
function CfnWarmPool_InstanceReusePolicyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('reuseOnScaleIn', cdk.validateBoolean)(properties.reuseOnScaleIn));
    return errors.wrap('supplied properties not correct for "InstanceReusePolicyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AutoScaling::WarmPool.InstanceReusePolicy` resource
 *
 * @param properties - the TypeScript properties of a `InstanceReusePolicyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AutoScaling::WarmPool.InstanceReusePolicy` resource.
 */
// @ts-ignore TS6133
function cfnWarmPoolInstanceReusePolicyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnWarmPool_InstanceReusePolicyPropertyValidator(properties).assertSuccess();
    return {
        ReuseOnScaleIn: cdk.booleanToCloudFormation(properties.reuseOnScaleIn),
    };
}

// @ts-ignore TS6133
function CfnWarmPoolInstanceReusePolicyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnWarmPool.InstanceReusePolicyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnWarmPool.InstanceReusePolicyProperty>();
    ret.addPropertyResult('reuseOnScaleIn', 'ReuseOnScaleIn', properties.ReuseOnScaleIn != null ? cfn_parse.FromCloudFormation.getBoolean(properties.ReuseOnScaleIn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
