// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:06.915Z","fingerprint":"PttP5kYoeCT2r6Xu2B61/BEOhhhBtvG85LM/MOSOz24="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnComputeEnvironment`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html
 */
export interface CfnComputeEnvironmentProps {

    /**
     * `AWS::Batch::ComputeEnvironment.Type`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html#cfn-batch-computeenvironment-type
     */
    readonly type: string;

    /**
     * `AWS::Batch::ComputeEnvironment.ComputeEnvironmentName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html#cfn-batch-computeenvironment-computeenvironmentname
     */
    readonly computeEnvironmentName?: string;

    /**
     * `AWS::Batch::ComputeEnvironment.ComputeResources`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html#cfn-batch-computeenvironment-computeresources
     */
    readonly computeResources?: CfnComputeEnvironment.ComputeResourcesProperty | cdk.IResolvable;

    /**
     * `AWS::Batch::ComputeEnvironment.ServiceRole`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html#cfn-batch-computeenvironment-servicerole
     */
    readonly serviceRole?: string;

    /**
     * `AWS::Batch::ComputeEnvironment.State`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html#cfn-batch-computeenvironment-state
     */
    readonly state?: string;

    /**
     * `AWS::Batch::ComputeEnvironment.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html#cfn-batch-computeenvironment-tags
     */
    readonly tags?: { [key: string]: (string) };

    /**
     * `AWS::Batch::ComputeEnvironment.UnmanagedvCpus`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html#cfn-batch-computeenvironment-unmanagedvcpus
     */
    readonly unmanagedvCpus?: number;
}

/**
 * Determine whether the given properties match those of a `CfnComputeEnvironmentProps`
 *
 * @param properties - the TypeScript properties of a `CfnComputeEnvironmentProps`
 *
 * @returns the result of the validation.
 */
function CfnComputeEnvironmentPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('computeEnvironmentName', cdk.validateString)(properties.computeEnvironmentName));
    errors.collect(cdk.propertyValidator('computeResources', CfnComputeEnvironment_ComputeResourcesPropertyValidator)(properties.computeResources));
    errors.collect(cdk.propertyValidator('serviceRole', cdk.validateString)(properties.serviceRole));
    errors.collect(cdk.propertyValidator('state', cdk.validateString)(properties.state));
    errors.collect(cdk.propertyValidator('tags', cdk.hashValidator(cdk.validateString))(properties.tags));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    errors.collect(cdk.propertyValidator('unmanagedvCpus', cdk.validateNumber)(properties.unmanagedvCpus));
    return errors.wrap('supplied properties not correct for "CfnComputeEnvironmentProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::ComputeEnvironment` resource
 *
 * @param properties - the TypeScript properties of a `CfnComputeEnvironmentProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::ComputeEnvironment` resource.
 */
// @ts-ignore TS6133
function cfnComputeEnvironmentPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComputeEnvironmentPropsValidator(properties).assertSuccess();
    return {
        Type: cdk.stringToCloudFormation(properties.type),
        ComputeEnvironmentName: cdk.stringToCloudFormation(properties.computeEnvironmentName),
        ComputeResources: cfnComputeEnvironmentComputeResourcesPropertyToCloudFormation(properties.computeResources),
        ServiceRole: cdk.stringToCloudFormation(properties.serviceRole),
        State: cdk.stringToCloudFormation(properties.state),
        Tags: cdk.hashMapper(cdk.stringToCloudFormation)(properties.tags),
        UnmanagedvCpus: cdk.numberToCloudFormation(properties.unmanagedvCpus),
    };
}

// @ts-ignore TS6133
function CfnComputeEnvironmentPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComputeEnvironmentProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComputeEnvironmentProps>();
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addPropertyResult('computeEnvironmentName', 'ComputeEnvironmentName', properties.ComputeEnvironmentName != null ? cfn_parse.FromCloudFormation.getString(properties.ComputeEnvironmentName) : undefined);
    ret.addPropertyResult('computeResources', 'ComputeResources', properties.ComputeResources != null ? CfnComputeEnvironmentComputeResourcesPropertyFromCloudFormation(properties.ComputeResources) : undefined);
    ret.addPropertyResult('serviceRole', 'ServiceRole', properties.ServiceRole != null ? cfn_parse.FromCloudFormation.getString(properties.ServiceRole) : undefined);
    ret.addPropertyResult('state', 'State', properties.State != null ? cfn_parse.FromCloudFormation.getString(properties.State) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Tags) : undefined as any);
    ret.addPropertyResult('unmanagedvCpus', 'UnmanagedvCpus', properties.UnmanagedvCpus != null ? cfn_parse.FromCloudFormation.getNumber(properties.UnmanagedvCpus) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Batch::ComputeEnvironment`
 *
 *
 *
 * @cloudformationResource AWS::Batch::ComputeEnvironment
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html
 */
export class CfnComputeEnvironment extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Batch::ComputeEnvironment";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnComputeEnvironment {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnComputeEnvironmentPropsFromCloudFormation(resourceProperties);
        const ret = new CfnComputeEnvironment(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     *
     * @cloudformationAttribute ComputeEnvironmentArn
     */
    public readonly attrComputeEnvironmentArn: string;

    /**
     * `AWS::Batch::ComputeEnvironment.Type`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html#cfn-batch-computeenvironment-type
     */
    public type: string;

    /**
     * `AWS::Batch::ComputeEnvironment.ComputeEnvironmentName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html#cfn-batch-computeenvironment-computeenvironmentname
     */
    public computeEnvironmentName: string | undefined;

    /**
     * `AWS::Batch::ComputeEnvironment.ComputeResources`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html#cfn-batch-computeenvironment-computeresources
     */
    public computeResources: CfnComputeEnvironment.ComputeResourcesProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::Batch::ComputeEnvironment.ServiceRole`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html#cfn-batch-computeenvironment-servicerole
     */
    public serviceRole: string | undefined;

    /**
     * `AWS::Batch::ComputeEnvironment.State`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html#cfn-batch-computeenvironment-state
     */
    public state: string | undefined;

    /**
     * `AWS::Batch::ComputeEnvironment.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html#cfn-batch-computeenvironment-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * `AWS::Batch::ComputeEnvironment.UnmanagedvCpus`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-computeenvironment.html#cfn-batch-computeenvironment-unmanagedvcpus
     */
    public unmanagedvCpus: number | undefined;

    /**
     * Create a new `AWS::Batch::ComputeEnvironment`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnComputeEnvironmentProps) {
        super(scope, id, { type: CfnComputeEnvironment.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'type', this);
        this.attrComputeEnvironmentArn = cdk.Token.asString(this.getAtt('ComputeEnvironmentArn'));

        this.type = props.type;
        this.computeEnvironmentName = props.computeEnvironmentName;
        this.computeResources = props.computeResources;
        this.serviceRole = props.serviceRole;
        this.state = props.state;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::Batch::ComputeEnvironment", props.tags, { tagPropertyName: 'tags' });
        this.unmanagedvCpus = props.unmanagedvCpus;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnComputeEnvironment.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            type: this.type,
            computeEnvironmentName: this.computeEnvironmentName,
            computeResources: this.computeResources,
            serviceRole: this.serviceRole,
            state: this.state,
            tags: this.tags.renderTags(),
            unmanagedvCpus: this.unmanagedvCpus,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnComputeEnvironmentPropsToCloudFormation(props);
    }
}

export namespace CfnComputeEnvironment {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html
     */
    export interface ComputeResourcesProperty {
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.AllocationStrategy`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-allocationstrategy
         */
        readonly allocationStrategy?: string;
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.BidPercentage`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-bidpercentage
         */
        readonly bidPercentage?: number;
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.DesiredvCpus`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-desiredvcpus
         */
        readonly desiredvCpus?: number;
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.Ec2Configuration`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-ec2configuration
         */
        readonly ec2Configuration?: Array<CfnComputeEnvironment.Ec2ConfigurationObjectProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.Ec2KeyPair`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-ec2keypair
         */
        readonly ec2KeyPair?: string;
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.ImageId`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-imageid
         */
        readonly imageId?: string;
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.InstanceRole`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-instancerole
         */
        readonly instanceRole?: string;
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.InstanceTypes`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-instancetypes
         */
        readonly instanceTypes?: string[];
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.LaunchTemplate`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-launchtemplate
         */
        readonly launchTemplate?: CfnComputeEnvironment.LaunchTemplateSpecificationProperty | cdk.IResolvable;
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.MaxvCpus`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-maxvcpus
         */
        readonly maxvCpus: number;
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.MinvCpus`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-minvcpus
         */
        readonly minvCpus?: number;
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.PlacementGroup`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-placementgroup
         */
        readonly placementGroup?: string;
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.SecurityGroupIds`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-securitygroupids
         */
        readonly securityGroupIds?: string[];
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.SpotIamFleetRole`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-spotiamfleetrole
         */
        readonly spotIamFleetRole?: string;
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.Subnets`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-subnets
         */
        readonly subnets: string[];
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.Tags`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-tags
         */
        readonly tags?: { [key: string]: (string) };
        /**
         * `CfnComputeEnvironment.ComputeResourcesProperty.Type`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-computeresources.html#cfn-batch-computeenvironment-computeresources-type
         */
        readonly type: string;
    }
}

/**
 * Determine whether the given properties match those of a `ComputeResourcesProperty`
 *
 * @param properties - the TypeScript properties of a `ComputeResourcesProperty`
 *
 * @returns the result of the validation.
 */
function CfnComputeEnvironment_ComputeResourcesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('allocationStrategy', cdk.validateString)(properties.allocationStrategy));
    errors.collect(cdk.propertyValidator('bidPercentage', cdk.validateNumber)(properties.bidPercentage));
    errors.collect(cdk.propertyValidator('desiredvCpus', cdk.validateNumber)(properties.desiredvCpus));
    errors.collect(cdk.propertyValidator('ec2Configuration', cdk.listValidator(CfnComputeEnvironment_Ec2ConfigurationObjectPropertyValidator))(properties.ec2Configuration));
    errors.collect(cdk.propertyValidator('ec2KeyPair', cdk.validateString)(properties.ec2KeyPair));
    errors.collect(cdk.propertyValidator('imageId', cdk.validateString)(properties.imageId));
    errors.collect(cdk.propertyValidator('instanceRole', cdk.validateString)(properties.instanceRole));
    errors.collect(cdk.propertyValidator('instanceTypes', cdk.listValidator(cdk.validateString))(properties.instanceTypes));
    errors.collect(cdk.propertyValidator('launchTemplate', CfnComputeEnvironment_LaunchTemplateSpecificationPropertyValidator)(properties.launchTemplate));
    errors.collect(cdk.propertyValidator('maxvCpus', cdk.requiredValidator)(properties.maxvCpus));
    errors.collect(cdk.propertyValidator('maxvCpus', cdk.validateNumber)(properties.maxvCpus));
    errors.collect(cdk.propertyValidator('minvCpus', cdk.validateNumber)(properties.minvCpus));
    errors.collect(cdk.propertyValidator('placementGroup', cdk.validateString)(properties.placementGroup));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('spotIamFleetRole', cdk.validateString)(properties.spotIamFleetRole));
    errors.collect(cdk.propertyValidator('subnets', cdk.requiredValidator)(properties.subnets));
    errors.collect(cdk.propertyValidator('subnets', cdk.listValidator(cdk.validateString))(properties.subnets));
    errors.collect(cdk.propertyValidator('tags', cdk.hashValidator(cdk.validateString))(properties.tags));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "ComputeResourcesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::ComputeEnvironment.ComputeResources` resource
 *
 * @param properties - the TypeScript properties of a `ComputeResourcesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::ComputeEnvironment.ComputeResources` resource.
 */
// @ts-ignore TS6133
function cfnComputeEnvironmentComputeResourcesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComputeEnvironment_ComputeResourcesPropertyValidator(properties).assertSuccess();
    return {
        AllocationStrategy: cdk.stringToCloudFormation(properties.allocationStrategy),
        BidPercentage: cdk.numberToCloudFormation(properties.bidPercentage),
        DesiredvCpus: cdk.numberToCloudFormation(properties.desiredvCpus),
        Ec2Configuration: cdk.listMapper(cfnComputeEnvironmentEc2ConfigurationObjectPropertyToCloudFormation)(properties.ec2Configuration),
        Ec2KeyPair: cdk.stringToCloudFormation(properties.ec2KeyPair),
        ImageId: cdk.stringToCloudFormation(properties.imageId),
        InstanceRole: cdk.stringToCloudFormation(properties.instanceRole),
        InstanceTypes: cdk.listMapper(cdk.stringToCloudFormation)(properties.instanceTypes),
        LaunchTemplate: cfnComputeEnvironmentLaunchTemplateSpecificationPropertyToCloudFormation(properties.launchTemplate),
        MaxvCpus: cdk.numberToCloudFormation(properties.maxvCpus),
        MinvCpus: cdk.numberToCloudFormation(properties.minvCpus),
        PlacementGroup: cdk.stringToCloudFormation(properties.placementGroup),
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        SpotIamFleetRole: cdk.stringToCloudFormation(properties.spotIamFleetRole),
        Subnets: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnets),
        Tags: cdk.hashMapper(cdk.stringToCloudFormation)(properties.tags),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnComputeEnvironmentComputeResourcesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComputeEnvironment.ComputeResourcesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComputeEnvironment.ComputeResourcesProperty>();
    ret.addPropertyResult('allocationStrategy', 'AllocationStrategy', properties.AllocationStrategy != null ? cfn_parse.FromCloudFormation.getString(properties.AllocationStrategy) : undefined);
    ret.addPropertyResult('bidPercentage', 'BidPercentage', properties.BidPercentage != null ? cfn_parse.FromCloudFormation.getNumber(properties.BidPercentage) : undefined);
    ret.addPropertyResult('desiredvCpus', 'DesiredvCpus', properties.DesiredvCpus != null ? cfn_parse.FromCloudFormation.getNumber(properties.DesiredvCpus) : undefined);
    ret.addPropertyResult('ec2Configuration', 'Ec2Configuration', properties.Ec2Configuration != null ? cfn_parse.FromCloudFormation.getArray(CfnComputeEnvironmentEc2ConfigurationObjectPropertyFromCloudFormation)(properties.Ec2Configuration) : undefined);
    ret.addPropertyResult('ec2KeyPair', 'Ec2KeyPair', properties.Ec2KeyPair != null ? cfn_parse.FromCloudFormation.getString(properties.Ec2KeyPair) : undefined);
    ret.addPropertyResult('imageId', 'ImageId', properties.ImageId != null ? cfn_parse.FromCloudFormation.getString(properties.ImageId) : undefined);
    ret.addPropertyResult('instanceRole', 'InstanceRole', properties.InstanceRole != null ? cfn_parse.FromCloudFormation.getString(properties.InstanceRole) : undefined);
    ret.addPropertyResult('instanceTypes', 'InstanceTypes', properties.InstanceTypes != null ? cfn_parse.FromCloudFormation.getStringArray(properties.InstanceTypes) : undefined);
    ret.addPropertyResult('launchTemplate', 'LaunchTemplate', properties.LaunchTemplate != null ? CfnComputeEnvironmentLaunchTemplateSpecificationPropertyFromCloudFormation(properties.LaunchTemplate) : undefined);
    ret.addPropertyResult('maxvCpus', 'MaxvCpus', cfn_parse.FromCloudFormation.getNumber(properties.MaxvCpus));
    ret.addPropertyResult('minvCpus', 'MinvCpus', properties.MinvCpus != null ? cfn_parse.FromCloudFormation.getNumber(properties.MinvCpus) : undefined);
    ret.addPropertyResult('placementGroup', 'PlacementGroup', properties.PlacementGroup != null ? cfn_parse.FromCloudFormation.getString(properties.PlacementGroup) : undefined);
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', properties.SecurityGroupIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds) : undefined);
    ret.addPropertyResult('spotIamFleetRole', 'SpotIamFleetRole', properties.SpotIamFleetRole != null ? cfn_parse.FromCloudFormation.getString(properties.SpotIamFleetRole) : undefined);
    ret.addPropertyResult('subnets', 'Subnets', cfn_parse.FromCloudFormation.getStringArray(properties.Subnets));
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Tags) : undefined as any);
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComputeEnvironment {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-ec2configurationobject.html
     */
    export interface Ec2ConfigurationObjectProperty {
        /**
         * `CfnComputeEnvironment.Ec2ConfigurationObjectProperty.ImageIdOverride`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-ec2configurationobject.html#cfn-batch-computeenvironment-ec2configurationobject-imageidoverride
         */
        readonly imageIdOverride?: string;
        /**
         * `CfnComputeEnvironment.Ec2ConfigurationObjectProperty.ImageType`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-ec2configurationobject.html#cfn-batch-computeenvironment-ec2configurationobject-imagetype
         */
        readonly imageType: string;
    }
}

/**
 * Determine whether the given properties match those of a `Ec2ConfigurationObjectProperty`
 *
 * @param properties - the TypeScript properties of a `Ec2ConfigurationObjectProperty`
 *
 * @returns the result of the validation.
 */
function CfnComputeEnvironment_Ec2ConfigurationObjectPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('imageIdOverride', cdk.validateString)(properties.imageIdOverride));
    errors.collect(cdk.propertyValidator('imageType', cdk.requiredValidator)(properties.imageType));
    errors.collect(cdk.propertyValidator('imageType', cdk.validateString)(properties.imageType));
    return errors.wrap('supplied properties not correct for "Ec2ConfigurationObjectProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::ComputeEnvironment.Ec2ConfigurationObject` resource
 *
 * @param properties - the TypeScript properties of a `Ec2ConfigurationObjectProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::ComputeEnvironment.Ec2ConfigurationObject` resource.
 */
// @ts-ignore TS6133
function cfnComputeEnvironmentEc2ConfigurationObjectPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComputeEnvironment_Ec2ConfigurationObjectPropertyValidator(properties).assertSuccess();
    return {
        ImageIdOverride: cdk.stringToCloudFormation(properties.imageIdOverride),
        ImageType: cdk.stringToCloudFormation(properties.imageType),
    };
}

// @ts-ignore TS6133
function CfnComputeEnvironmentEc2ConfigurationObjectPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComputeEnvironment.Ec2ConfigurationObjectProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComputeEnvironment.Ec2ConfigurationObjectProperty>();
    ret.addPropertyResult('imageIdOverride', 'ImageIdOverride', properties.ImageIdOverride != null ? cfn_parse.FromCloudFormation.getString(properties.ImageIdOverride) : undefined);
    ret.addPropertyResult('imageType', 'ImageType', cfn_parse.FromCloudFormation.getString(properties.ImageType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComputeEnvironment {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-launchtemplatespecification.html
     */
    export interface LaunchTemplateSpecificationProperty {
        /**
         * `CfnComputeEnvironment.LaunchTemplateSpecificationProperty.LaunchTemplateId`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-launchtemplatespecification.html#cfn-batch-computeenvironment-launchtemplatespecification-launchtemplateid
         */
        readonly launchTemplateId?: string;
        /**
         * `CfnComputeEnvironment.LaunchTemplateSpecificationProperty.LaunchTemplateName`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-launchtemplatespecification.html#cfn-batch-computeenvironment-launchtemplatespecification-launchtemplatename
         */
        readonly launchTemplateName?: string;
        /**
         * `CfnComputeEnvironment.LaunchTemplateSpecificationProperty.Version`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-computeenvironment-launchtemplatespecification.html#cfn-batch-computeenvironment-launchtemplatespecification-version
         */
        readonly version?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LaunchTemplateSpecificationProperty`
 *
 * @param properties - the TypeScript properties of a `LaunchTemplateSpecificationProperty`
 *
 * @returns the result of the validation.
 */
function CfnComputeEnvironment_LaunchTemplateSpecificationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('launchTemplateId', cdk.validateString)(properties.launchTemplateId));
    errors.collect(cdk.propertyValidator('launchTemplateName', cdk.validateString)(properties.launchTemplateName));
    errors.collect(cdk.propertyValidator('version', cdk.validateString)(properties.version));
    return errors.wrap('supplied properties not correct for "LaunchTemplateSpecificationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::ComputeEnvironment.LaunchTemplateSpecification` resource
 *
 * @param properties - the TypeScript properties of a `LaunchTemplateSpecificationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::ComputeEnvironment.LaunchTemplateSpecification` resource.
 */
// @ts-ignore TS6133
function cfnComputeEnvironmentLaunchTemplateSpecificationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComputeEnvironment_LaunchTemplateSpecificationPropertyValidator(properties).assertSuccess();
    return {
        LaunchTemplateId: cdk.stringToCloudFormation(properties.launchTemplateId),
        LaunchTemplateName: cdk.stringToCloudFormation(properties.launchTemplateName),
        Version: cdk.stringToCloudFormation(properties.version),
    };
}

// @ts-ignore TS6133
function CfnComputeEnvironmentLaunchTemplateSpecificationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComputeEnvironment.LaunchTemplateSpecificationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComputeEnvironment.LaunchTemplateSpecificationProperty>();
    ret.addPropertyResult('launchTemplateId', 'LaunchTemplateId', properties.LaunchTemplateId != null ? cfn_parse.FromCloudFormation.getString(properties.LaunchTemplateId) : undefined);
    ret.addPropertyResult('launchTemplateName', 'LaunchTemplateName', properties.LaunchTemplateName != null ? cfn_parse.FromCloudFormation.getString(properties.LaunchTemplateName) : undefined);
    ret.addPropertyResult('version', 'Version', properties.Version != null ? cfn_parse.FromCloudFormation.getString(properties.Version) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnJobDefinition`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html
 */
export interface CfnJobDefinitionProps {

    /**
     * `AWS::Batch::JobDefinition.Type`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-type
     */
    readonly type: string;

    /**
     * `AWS::Batch::JobDefinition.ContainerProperties`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-containerproperties
     */
    readonly containerProperties?: CfnJobDefinition.ContainerPropertiesProperty | cdk.IResolvable;

    /**
     * `AWS::Batch::JobDefinition.JobDefinitionName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-jobdefinitionname
     */
    readonly jobDefinitionName?: string;

    /**
     * `AWS::Batch::JobDefinition.NodeProperties`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-nodeproperties
     */
    readonly nodeProperties?: CfnJobDefinition.NodePropertiesProperty | cdk.IResolvable;

    /**
     * `AWS::Batch::JobDefinition.Parameters`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-parameters
     */
    readonly parameters?: any | cdk.IResolvable;

    /**
     * `AWS::Batch::JobDefinition.PlatformCapabilities`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-platformcapabilities
     */
    readonly platformCapabilities?: string[];

    /**
     * `AWS::Batch::JobDefinition.PropagateTags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-propagatetags
     */
    readonly propagateTags?: boolean | cdk.IResolvable;

    /**
     * `AWS::Batch::JobDefinition.RetryStrategy`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-retrystrategy
     */
    readonly retryStrategy?: CfnJobDefinition.RetryStrategyProperty | cdk.IResolvable;

    /**
     * `AWS::Batch::JobDefinition.SchedulingPriority`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-schedulingpriority
     */
    readonly schedulingPriority?: number;

    /**
     * `AWS::Batch::JobDefinition.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-tags
     */
    readonly tags?: any;

    /**
     * `AWS::Batch::JobDefinition.Timeout`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-timeout
     */
    readonly timeout?: CfnJobDefinition.TimeoutProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnJobDefinitionProps`
 *
 * @param properties - the TypeScript properties of a `CfnJobDefinitionProps`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinitionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('containerProperties', CfnJobDefinition_ContainerPropertiesPropertyValidator)(properties.containerProperties));
    errors.collect(cdk.propertyValidator('jobDefinitionName', cdk.validateString)(properties.jobDefinitionName));
    errors.collect(cdk.propertyValidator('nodeProperties', CfnJobDefinition_NodePropertiesPropertyValidator)(properties.nodeProperties));
    errors.collect(cdk.propertyValidator('parameters', cdk.validateObject)(properties.parameters));
    errors.collect(cdk.propertyValidator('platformCapabilities', cdk.listValidator(cdk.validateString))(properties.platformCapabilities));
    errors.collect(cdk.propertyValidator('propagateTags', cdk.validateBoolean)(properties.propagateTags));
    errors.collect(cdk.propertyValidator('retryStrategy', CfnJobDefinition_RetryStrategyPropertyValidator)(properties.retryStrategy));
    errors.collect(cdk.propertyValidator('schedulingPriority', cdk.validateNumber)(properties.schedulingPriority));
    errors.collect(cdk.propertyValidator('tags', cdk.validateObject)(properties.tags));
    errors.collect(cdk.propertyValidator('timeout', CfnJobDefinition_TimeoutPropertyValidator)(properties.timeout));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "CfnJobDefinitionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition` resource
 *
 * @param properties - the TypeScript properties of a `CfnJobDefinitionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinitionPropsValidator(properties).assertSuccess();
    return {
        Type: cdk.stringToCloudFormation(properties.type),
        ContainerProperties: cfnJobDefinitionContainerPropertiesPropertyToCloudFormation(properties.containerProperties),
        JobDefinitionName: cdk.stringToCloudFormation(properties.jobDefinitionName),
        NodeProperties: cfnJobDefinitionNodePropertiesPropertyToCloudFormation(properties.nodeProperties),
        Parameters: cdk.objectToCloudFormation(properties.parameters),
        PlatformCapabilities: cdk.listMapper(cdk.stringToCloudFormation)(properties.platformCapabilities),
        PropagateTags: cdk.booleanToCloudFormation(properties.propagateTags),
        RetryStrategy: cfnJobDefinitionRetryStrategyPropertyToCloudFormation(properties.retryStrategy),
        SchedulingPriority: cdk.numberToCloudFormation(properties.schedulingPriority),
        Tags: cdk.objectToCloudFormation(properties.tags),
        Timeout: cfnJobDefinitionTimeoutPropertyToCloudFormation(properties.timeout),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinitionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinitionProps>();
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addPropertyResult('containerProperties', 'ContainerProperties', properties.ContainerProperties != null ? CfnJobDefinitionContainerPropertiesPropertyFromCloudFormation(properties.ContainerProperties) : undefined);
    ret.addPropertyResult('jobDefinitionName', 'JobDefinitionName', properties.JobDefinitionName != null ? cfn_parse.FromCloudFormation.getString(properties.JobDefinitionName) : undefined);
    ret.addPropertyResult('nodeProperties', 'NodeProperties', properties.NodeProperties != null ? CfnJobDefinitionNodePropertiesPropertyFromCloudFormation(properties.NodeProperties) : undefined);
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? cfn_parse.FromCloudFormation.getAny(properties.Parameters) : undefined);
    ret.addPropertyResult('platformCapabilities', 'PlatformCapabilities', properties.PlatformCapabilities != null ? cfn_parse.FromCloudFormation.getStringArray(properties.PlatformCapabilities) : undefined);
    ret.addPropertyResult('propagateTags', 'PropagateTags', properties.PropagateTags != null ? cfn_parse.FromCloudFormation.getBoolean(properties.PropagateTags) : undefined);
    ret.addPropertyResult('retryStrategy', 'RetryStrategy', properties.RetryStrategy != null ? CfnJobDefinitionRetryStrategyPropertyFromCloudFormation(properties.RetryStrategy) : undefined);
    ret.addPropertyResult('schedulingPriority', 'SchedulingPriority', properties.SchedulingPriority != null ? cfn_parse.FromCloudFormation.getNumber(properties.SchedulingPriority) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getAny(properties.Tags) : undefined as any);
    ret.addPropertyResult('timeout', 'Timeout', properties.Timeout != null ? CfnJobDefinitionTimeoutPropertyFromCloudFormation(properties.Timeout) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Batch::JobDefinition`
 *
 *
 *
 * @cloudformationResource AWS::Batch::JobDefinition
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html
 */
export class CfnJobDefinition extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Batch::JobDefinition";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnJobDefinition {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnJobDefinitionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnJobDefinition(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * `AWS::Batch::JobDefinition.Type`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-type
     */
    public type: string;

    /**
     * `AWS::Batch::JobDefinition.ContainerProperties`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-containerproperties
     */
    public containerProperties: CfnJobDefinition.ContainerPropertiesProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::Batch::JobDefinition.JobDefinitionName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-jobdefinitionname
     */
    public jobDefinitionName: string | undefined;

    /**
     * `AWS::Batch::JobDefinition.NodeProperties`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-nodeproperties
     */
    public nodeProperties: CfnJobDefinition.NodePropertiesProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::Batch::JobDefinition.Parameters`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-parameters
     */
    public parameters: any | cdk.IResolvable | undefined;

    /**
     * `AWS::Batch::JobDefinition.PlatformCapabilities`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-platformcapabilities
     */
    public platformCapabilities: string[] | undefined;

    /**
     * `AWS::Batch::JobDefinition.PropagateTags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-propagatetags
     */
    public propagateTags: boolean | cdk.IResolvable | undefined;

    /**
     * `AWS::Batch::JobDefinition.RetryStrategy`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-retrystrategy
     */
    public retryStrategy: CfnJobDefinition.RetryStrategyProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::Batch::JobDefinition.SchedulingPriority`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-schedulingpriority
     */
    public schedulingPriority: number | undefined;

    /**
     * `AWS::Batch::JobDefinition.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * `AWS::Batch::JobDefinition.Timeout`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobdefinition.html#cfn-batch-jobdefinition-timeout
     */
    public timeout: CfnJobDefinition.TimeoutProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::Batch::JobDefinition`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnJobDefinitionProps) {
        super(scope, id, { type: CfnJobDefinition.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'type', this);

        this.type = props.type;
        this.containerProperties = props.containerProperties;
        this.jobDefinitionName = props.jobDefinitionName;
        this.nodeProperties = props.nodeProperties;
        this.parameters = props.parameters;
        this.platformCapabilities = props.platformCapabilities;
        this.propagateTags = props.propagateTags;
        this.retryStrategy = props.retryStrategy;
        this.schedulingPriority = props.schedulingPriority;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::Batch::JobDefinition", props.tags, { tagPropertyName: 'tags' });
        this.timeout = props.timeout;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnJobDefinition.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            type: this.type,
            containerProperties: this.containerProperties,
            jobDefinitionName: this.jobDefinitionName,
            nodeProperties: this.nodeProperties,
            parameters: this.parameters,
            platformCapabilities: this.platformCapabilities,
            propagateTags: this.propagateTags,
            retryStrategy: this.retryStrategy,
            schedulingPriority: this.schedulingPriority,
            tags: this.tags.renderTags(),
            timeout: this.timeout,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnJobDefinitionPropsToCloudFormation(props);
    }
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-authorizationconfig.html
     */
    export interface AuthorizationConfigProperty {
        /**
         * `CfnJobDefinition.AuthorizationConfigProperty.AccessPointId`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-authorizationconfig.html#cfn-batch-jobdefinition-authorizationconfig-accesspointid
         */
        readonly accessPointId?: string;
        /**
         * `CfnJobDefinition.AuthorizationConfigProperty.Iam`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-authorizationconfig.html#cfn-batch-jobdefinition-authorizationconfig-iam
         */
        readonly iam?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AuthorizationConfigProperty`
 *
 * @param properties - the TypeScript properties of a `AuthorizationConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_AuthorizationConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessPointId', cdk.validateString)(properties.accessPointId));
    errors.collect(cdk.propertyValidator('iam', cdk.validateString)(properties.iam));
    return errors.wrap('supplied properties not correct for "AuthorizationConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.AuthorizationConfig` resource
 *
 * @param properties - the TypeScript properties of a `AuthorizationConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.AuthorizationConfig` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionAuthorizationConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_AuthorizationConfigPropertyValidator(properties).assertSuccess();
    return {
        AccessPointId: cdk.stringToCloudFormation(properties.accessPointId),
        Iam: cdk.stringToCloudFormation(properties.iam),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionAuthorizationConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.AuthorizationConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.AuthorizationConfigProperty>();
    ret.addPropertyResult('accessPointId', 'AccessPointId', properties.AccessPointId != null ? cfn_parse.FromCloudFormation.getString(properties.AccessPointId) : undefined);
    ret.addPropertyResult('iam', 'Iam', properties.Iam != null ? cfn_parse.FromCloudFormation.getString(properties.Iam) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html
     */
    export interface ContainerPropertiesProperty {
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.Command`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-command
         */
        readonly command?: string[];
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.Environment`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-environment
         */
        readonly environment?: Array<CfnJobDefinition.EnvironmentProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.ExecutionRoleArn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-executionrolearn
         */
        readonly executionRoleArn?: string;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.FargatePlatformConfiguration`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-fargateplatformconfiguration
         */
        readonly fargatePlatformConfiguration?: CfnJobDefinition.FargatePlatformConfigurationProperty | cdk.IResolvable;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.Image`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-image
         */
        readonly image: string;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.InstanceType`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-instancetype
         */
        readonly instanceType?: string;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.JobRoleArn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-jobrolearn
         */
        readonly jobRoleArn?: string;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.LinuxParameters`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-linuxparameters
         */
        readonly linuxParameters?: CfnJobDefinition.LinuxParametersProperty | cdk.IResolvable;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.LogConfiguration`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-logconfiguration
         */
        readonly logConfiguration?: CfnJobDefinition.LogConfigurationProperty | cdk.IResolvable;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.Memory`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-memory
         */
        readonly memory?: number;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.MountPoints`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-mountpoints
         */
        readonly mountPoints?: Array<CfnJobDefinition.MountPointsProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.NetworkConfiguration`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-networkconfiguration
         */
        readonly networkConfiguration?: CfnJobDefinition.NetworkConfigurationProperty | cdk.IResolvable;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.Privileged`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-privileged
         */
        readonly privileged?: boolean | cdk.IResolvable;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.ReadonlyRootFilesystem`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-readonlyrootfilesystem
         */
        readonly readonlyRootFilesystem?: boolean | cdk.IResolvable;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.ResourceRequirements`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-resourcerequirements
         */
        readonly resourceRequirements?: Array<CfnJobDefinition.ResourceRequirementProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.Secrets`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-secrets
         */
        readonly secrets?: Array<CfnJobDefinition.SecretProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.Ulimits`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-ulimits
         */
        readonly ulimits?: Array<CfnJobDefinition.UlimitProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.User`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-user
         */
        readonly user?: string;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.Vcpus`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-vcpus
         */
        readonly vcpus?: number;
        /**
         * `CfnJobDefinition.ContainerPropertiesProperty.Volumes`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties.html#cfn-batch-jobdefinition-containerproperties-volumes
         */
        readonly volumes?: Array<CfnJobDefinition.VolumesProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ContainerPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `ContainerPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_ContainerPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('command', cdk.listValidator(cdk.validateString))(properties.command));
    errors.collect(cdk.propertyValidator('environment', cdk.listValidator(CfnJobDefinition_EnvironmentPropertyValidator))(properties.environment));
    errors.collect(cdk.propertyValidator('executionRoleArn', cdk.validateString)(properties.executionRoleArn));
    errors.collect(cdk.propertyValidator('fargatePlatformConfiguration', CfnJobDefinition_FargatePlatformConfigurationPropertyValidator)(properties.fargatePlatformConfiguration));
    errors.collect(cdk.propertyValidator('image', cdk.requiredValidator)(properties.image));
    errors.collect(cdk.propertyValidator('image', cdk.validateString)(properties.image));
    errors.collect(cdk.propertyValidator('instanceType', cdk.validateString)(properties.instanceType));
    errors.collect(cdk.propertyValidator('jobRoleArn', cdk.validateString)(properties.jobRoleArn));
    errors.collect(cdk.propertyValidator('linuxParameters', CfnJobDefinition_LinuxParametersPropertyValidator)(properties.linuxParameters));
    errors.collect(cdk.propertyValidator('logConfiguration', CfnJobDefinition_LogConfigurationPropertyValidator)(properties.logConfiguration));
    errors.collect(cdk.propertyValidator('memory', cdk.validateNumber)(properties.memory));
    errors.collect(cdk.propertyValidator('mountPoints', cdk.listValidator(CfnJobDefinition_MountPointsPropertyValidator))(properties.mountPoints));
    errors.collect(cdk.propertyValidator('networkConfiguration', CfnJobDefinition_NetworkConfigurationPropertyValidator)(properties.networkConfiguration));
    errors.collect(cdk.propertyValidator('privileged', cdk.validateBoolean)(properties.privileged));
    errors.collect(cdk.propertyValidator('readonlyRootFilesystem', cdk.validateBoolean)(properties.readonlyRootFilesystem));
    errors.collect(cdk.propertyValidator('resourceRequirements', cdk.listValidator(CfnJobDefinition_ResourceRequirementPropertyValidator))(properties.resourceRequirements));
    errors.collect(cdk.propertyValidator('secrets', cdk.listValidator(CfnJobDefinition_SecretPropertyValidator))(properties.secrets));
    errors.collect(cdk.propertyValidator('ulimits', cdk.listValidator(CfnJobDefinition_UlimitPropertyValidator))(properties.ulimits));
    errors.collect(cdk.propertyValidator('user', cdk.validateString)(properties.user));
    errors.collect(cdk.propertyValidator('vcpus', cdk.validateNumber)(properties.vcpus));
    errors.collect(cdk.propertyValidator('volumes', cdk.listValidator(CfnJobDefinition_VolumesPropertyValidator))(properties.volumes));
    return errors.wrap('supplied properties not correct for "ContainerPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.ContainerProperties` resource
 *
 * @param properties - the TypeScript properties of a `ContainerPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.ContainerProperties` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionContainerPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_ContainerPropertiesPropertyValidator(properties).assertSuccess();
    return {
        Command: cdk.listMapper(cdk.stringToCloudFormation)(properties.command),
        Environment: cdk.listMapper(cfnJobDefinitionEnvironmentPropertyToCloudFormation)(properties.environment),
        ExecutionRoleArn: cdk.stringToCloudFormation(properties.executionRoleArn),
        FargatePlatformConfiguration: cfnJobDefinitionFargatePlatformConfigurationPropertyToCloudFormation(properties.fargatePlatformConfiguration),
        Image: cdk.stringToCloudFormation(properties.image),
        InstanceType: cdk.stringToCloudFormation(properties.instanceType),
        JobRoleArn: cdk.stringToCloudFormation(properties.jobRoleArn),
        LinuxParameters: cfnJobDefinitionLinuxParametersPropertyToCloudFormation(properties.linuxParameters),
        LogConfiguration: cfnJobDefinitionLogConfigurationPropertyToCloudFormation(properties.logConfiguration),
        Memory: cdk.numberToCloudFormation(properties.memory),
        MountPoints: cdk.listMapper(cfnJobDefinitionMountPointsPropertyToCloudFormation)(properties.mountPoints),
        NetworkConfiguration: cfnJobDefinitionNetworkConfigurationPropertyToCloudFormation(properties.networkConfiguration),
        Privileged: cdk.booleanToCloudFormation(properties.privileged),
        ReadonlyRootFilesystem: cdk.booleanToCloudFormation(properties.readonlyRootFilesystem),
        ResourceRequirements: cdk.listMapper(cfnJobDefinitionResourceRequirementPropertyToCloudFormation)(properties.resourceRequirements),
        Secrets: cdk.listMapper(cfnJobDefinitionSecretPropertyToCloudFormation)(properties.secrets),
        Ulimits: cdk.listMapper(cfnJobDefinitionUlimitPropertyToCloudFormation)(properties.ulimits),
        User: cdk.stringToCloudFormation(properties.user),
        Vcpus: cdk.numberToCloudFormation(properties.vcpus),
        Volumes: cdk.listMapper(cfnJobDefinitionVolumesPropertyToCloudFormation)(properties.volumes),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionContainerPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.ContainerPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.ContainerPropertiesProperty>();
    ret.addPropertyResult('command', 'Command', properties.Command != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Command) : undefined);
    ret.addPropertyResult('environment', 'Environment', properties.Environment != null ? cfn_parse.FromCloudFormation.getArray(CfnJobDefinitionEnvironmentPropertyFromCloudFormation)(properties.Environment) : undefined);
    ret.addPropertyResult('executionRoleArn', 'ExecutionRoleArn', properties.ExecutionRoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.ExecutionRoleArn) : undefined);
    ret.addPropertyResult('fargatePlatformConfiguration', 'FargatePlatformConfiguration', properties.FargatePlatformConfiguration != null ? CfnJobDefinitionFargatePlatformConfigurationPropertyFromCloudFormation(properties.FargatePlatformConfiguration) : undefined);
    ret.addPropertyResult('image', 'Image', cfn_parse.FromCloudFormation.getString(properties.Image));
    ret.addPropertyResult('instanceType', 'InstanceType', properties.InstanceType != null ? cfn_parse.FromCloudFormation.getString(properties.InstanceType) : undefined);
    ret.addPropertyResult('jobRoleArn', 'JobRoleArn', properties.JobRoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.JobRoleArn) : undefined);
    ret.addPropertyResult('linuxParameters', 'LinuxParameters', properties.LinuxParameters != null ? CfnJobDefinitionLinuxParametersPropertyFromCloudFormation(properties.LinuxParameters) : undefined);
    ret.addPropertyResult('logConfiguration', 'LogConfiguration', properties.LogConfiguration != null ? CfnJobDefinitionLogConfigurationPropertyFromCloudFormation(properties.LogConfiguration) : undefined);
    ret.addPropertyResult('memory', 'Memory', properties.Memory != null ? cfn_parse.FromCloudFormation.getNumber(properties.Memory) : undefined);
    ret.addPropertyResult('mountPoints', 'MountPoints', properties.MountPoints != null ? cfn_parse.FromCloudFormation.getArray(CfnJobDefinitionMountPointsPropertyFromCloudFormation)(properties.MountPoints) : undefined);
    ret.addPropertyResult('networkConfiguration', 'NetworkConfiguration', properties.NetworkConfiguration != null ? CfnJobDefinitionNetworkConfigurationPropertyFromCloudFormation(properties.NetworkConfiguration) : undefined);
    ret.addPropertyResult('privileged', 'Privileged', properties.Privileged != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Privileged) : undefined);
    ret.addPropertyResult('readonlyRootFilesystem', 'ReadonlyRootFilesystem', properties.ReadonlyRootFilesystem != null ? cfn_parse.FromCloudFormation.getBoolean(properties.ReadonlyRootFilesystem) : undefined);
    ret.addPropertyResult('resourceRequirements', 'ResourceRequirements', properties.ResourceRequirements != null ? cfn_parse.FromCloudFormation.getArray(CfnJobDefinitionResourceRequirementPropertyFromCloudFormation)(properties.ResourceRequirements) : undefined);
    ret.addPropertyResult('secrets', 'Secrets', properties.Secrets != null ? cfn_parse.FromCloudFormation.getArray(CfnJobDefinitionSecretPropertyFromCloudFormation)(properties.Secrets) : undefined);
    ret.addPropertyResult('ulimits', 'Ulimits', properties.Ulimits != null ? cfn_parse.FromCloudFormation.getArray(CfnJobDefinitionUlimitPropertyFromCloudFormation)(properties.Ulimits) : undefined);
    ret.addPropertyResult('user', 'User', properties.User != null ? cfn_parse.FromCloudFormation.getString(properties.User) : undefined);
    ret.addPropertyResult('vcpus', 'Vcpus', properties.Vcpus != null ? cfn_parse.FromCloudFormation.getNumber(properties.Vcpus) : undefined);
    ret.addPropertyResult('volumes', 'Volumes', properties.Volumes != null ? cfn_parse.FromCloudFormation.getArray(CfnJobDefinitionVolumesPropertyFromCloudFormation)(properties.Volumes) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-device.html
     */
    export interface DeviceProperty {
        /**
         * `CfnJobDefinition.DeviceProperty.ContainerPath`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-device.html#cfn-batch-jobdefinition-device-containerpath
         */
        readonly containerPath?: string;
        /**
         * `CfnJobDefinition.DeviceProperty.HostPath`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-device.html#cfn-batch-jobdefinition-device-hostpath
         */
        readonly hostPath?: string;
        /**
         * `CfnJobDefinition.DeviceProperty.Permissions`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-device.html#cfn-batch-jobdefinition-device-permissions
         */
        readonly permissions?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `DeviceProperty`
 *
 * @param properties - the TypeScript properties of a `DeviceProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_DevicePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('containerPath', cdk.validateString)(properties.containerPath));
    errors.collect(cdk.propertyValidator('hostPath', cdk.validateString)(properties.hostPath));
    errors.collect(cdk.propertyValidator('permissions', cdk.listValidator(cdk.validateString))(properties.permissions));
    return errors.wrap('supplied properties not correct for "DeviceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.Device` resource
 *
 * @param properties - the TypeScript properties of a `DeviceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.Device` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionDevicePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_DevicePropertyValidator(properties).assertSuccess();
    return {
        ContainerPath: cdk.stringToCloudFormation(properties.containerPath),
        HostPath: cdk.stringToCloudFormation(properties.hostPath),
        Permissions: cdk.listMapper(cdk.stringToCloudFormation)(properties.permissions),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionDevicePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.DeviceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.DeviceProperty>();
    ret.addPropertyResult('containerPath', 'ContainerPath', properties.ContainerPath != null ? cfn_parse.FromCloudFormation.getString(properties.ContainerPath) : undefined);
    ret.addPropertyResult('hostPath', 'HostPath', properties.HostPath != null ? cfn_parse.FromCloudFormation.getString(properties.HostPath) : undefined);
    ret.addPropertyResult('permissions', 'Permissions', properties.Permissions != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Permissions) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-efsvolumeconfiguration.html
     */
    export interface EfsVolumeConfigurationProperty {
        /**
         * `CfnJobDefinition.EfsVolumeConfigurationProperty.AuthorizationConfig`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-efsvolumeconfiguration.html#cfn-batch-jobdefinition-efsvolumeconfiguration-authorizationconfig
         */
        readonly authorizationConfig?: CfnJobDefinition.AuthorizationConfigProperty | cdk.IResolvable;
        /**
         * `CfnJobDefinition.EfsVolumeConfigurationProperty.FileSystemId`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-efsvolumeconfiguration.html#cfn-batch-jobdefinition-efsvolumeconfiguration-filesystemid
         */
        readonly fileSystemId: string;
        /**
         * `CfnJobDefinition.EfsVolumeConfigurationProperty.RootDirectory`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-efsvolumeconfiguration.html#cfn-batch-jobdefinition-efsvolumeconfiguration-rootdirectory
         */
        readonly rootDirectory?: string;
        /**
         * `CfnJobDefinition.EfsVolumeConfigurationProperty.TransitEncryption`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-efsvolumeconfiguration.html#cfn-batch-jobdefinition-efsvolumeconfiguration-transitencryption
         */
        readonly transitEncryption?: string;
        /**
         * `CfnJobDefinition.EfsVolumeConfigurationProperty.TransitEncryptionPort`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-efsvolumeconfiguration.html#cfn-batch-jobdefinition-efsvolumeconfiguration-transitencryptionport
         */
        readonly transitEncryptionPort?: number;
    }
}

/**
 * Determine whether the given properties match those of a `EfsVolumeConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `EfsVolumeConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_EfsVolumeConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('authorizationConfig', CfnJobDefinition_AuthorizationConfigPropertyValidator)(properties.authorizationConfig));
    errors.collect(cdk.propertyValidator('fileSystemId', cdk.requiredValidator)(properties.fileSystemId));
    errors.collect(cdk.propertyValidator('fileSystemId', cdk.validateString)(properties.fileSystemId));
    errors.collect(cdk.propertyValidator('rootDirectory', cdk.validateString)(properties.rootDirectory));
    errors.collect(cdk.propertyValidator('transitEncryption', cdk.validateString)(properties.transitEncryption));
    errors.collect(cdk.propertyValidator('transitEncryptionPort', cdk.validateNumber)(properties.transitEncryptionPort));
    return errors.wrap('supplied properties not correct for "EfsVolumeConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.EfsVolumeConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `EfsVolumeConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.EfsVolumeConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionEfsVolumeConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_EfsVolumeConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AuthorizationConfig: cfnJobDefinitionAuthorizationConfigPropertyToCloudFormation(properties.authorizationConfig),
        FileSystemId: cdk.stringToCloudFormation(properties.fileSystemId),
        RootDirectory: cdk.stringToCloudFormation(properties.rootDirectory),
        TransitEncryption: cdk.stringToCloudFormation(properties.transitEncryption),
        TransitEncryptionPort: cdk.numberToCloudFormation(properties.transitEncryptionPort),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionEfsVolumeConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.EfsVolumeConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.EfsVolumeConfigurationProperty>();
    ret.addPropertyResult('authorizationConfig', 'AuthorizationConfig', properties.AuthorizationConfig != null ? CfnJobDefinitionAuthorizationConfigPropertyFromCloudFormation(properties.AuthorizationConfig) : undefined);
    ret.addPropertyResult('fileSystemId', 'FileSystemId', cfn_parse.FromCloudFormation.getString(properties.FileSystemId));
    ret.addPropertyResult('rootDirectory', 'RootDirectory', properties.RootDirectory != null ? cfn_parse.FromCloudFormation.getString(properties.RootDirectory) : undefined);
    ret.addPropertyResult('transitEncryption', 'TransitEncryption', properties.TransitEncryption != null ? cfn_parse.FromCloudFormation.getString(properties.TransitEncryption) : undefined);
    ret.addPropertyResult('transitEncryptionPort', 'TransitEncryptionPort', properties.TransitEncryptionPort != null ? cfn_parse.FromCloudFormation.getNumber(properties.TransitEncryptionPort) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-environment.html
     */
    export interface EnvironmentProperty {
        /**
         * `CfnJobDefinition.EnvironmentProperty.Name`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-environment.html#cfn-batch-jobdefinition-environment-name
         */
        readonly name?: string;
        /**
         * `CfnJobDefinition.EnvironmentProperty.Value`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-environment.html#cfn-batch-jobdefinition-environment-value
         */
        readonly value?: string;
    }
}

/**
 * Determine whether the given properties match those of a `EnvironmentProperty`
 *
 * @param properties - the TypeScript properties of a `EnvironmentProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_EnvironmentPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "EnvironmentProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.Environment` resource
 *
 * @param properties - the TypeScript properties of a `EnvironmentProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.Environment` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionEnvironmentPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_EnvironmentPropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionEnvironmentPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.EnvironmentProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.EnvironmentProperty>();
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('value', 'Value', properties.Value != null ? cfn_parse.FromCloudFormation.getString(properties.Value) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-evaluateonexit.html
     */
    export interface EvaluateOnExitProperty {
        /**
         * `CfnJobDefinition.EvaluateOnExitProperty.Action`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-evaluateonexit.html#cfn-batch-jobdefinition-evaluateonexit-action
         */
        readonly action: string;
        /**
         * `CfnJobDefinition.EvaluateOnExitProperty.OnExitCode`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-evaluateonexit.html#cfn-batch-jobdefinition-evaluateonexit-onexitcode
         */
        readonly onExitCode?: string;
        /**
         * `CfnJobDefinition.EvaluateOnExitProperty.OnReason`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-evaluateonexit.html#cfn-batch-jobdefinition-evaluateonexit-onreason
         */
        readonly onReason?: string;
        /**
         * `CfnJobDefinition.EvaluateOnExitProperty.OnStatusReason`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-evaluateonexit.html#cfn-batch-jobdefinition-evaluateonexit-onstatusreason
         */
        readonly onStatusReason?: string;
    }
}

/**
 * Determine whether the given properties match those of a `EvaluateOnExitProperty`
 *
 * @param properties - the TypeScript properties of a `EvaluateOnExitProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_EvaluateOnExitPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('action', cdk.requiredValidator)(properties.action));
    errors.collect(cdk.propertyValidator('action', cdk.validateString)(properties.action));
    errors.collect(cdk.propertyValidator('onExitCode', cdk.validateString)(properties.onExitCode));
    errors.collect(cdk.propertyValidator('onReason', cdk.validateString)(properties.onReason));
    errors.collect(cdk.propertyValidator('onStatusReason', cdk.validateString)(properties.onStatusReason));
    return errors.wrap('supplied properties not correct for "EvaluateOnExitProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.EvaluateOnExit` resource
 *
 * @param properties - the TypeScript properties of a `EvaluateOnExitProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.EvaluateOnExit` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionEvaluateOnExitPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_EvaluateOnExitPropertyValidator(properties).assertSuccess();
    return {
        Action: cdk.stringToCloudFormation(properties.action),
        OnExitCode: cdk.stringToCloudFormation(properties.onExitCode),
        OnReason: cdk.stringToCloudFormation(properties.onReason),
        OnStatusReason: cdk.stringToCloudFormation(properties.onStatusReason),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionEvaluateOnExitPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.EvaluateOnExitProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.EvaluateOnExitProperty>();
    ret.addPropertyResult('action', 'Action', cfn_parse.FromCloudFormation.getString(properties.Action));
    ret.addPropertyResult('onExitCode', 'OnExitCode', properties.OnExitCode != null ? cfn_parse.FromCloudFormation.getString(properties.OnExitCode) : undefined);
    ret.addPropertyResult('onReason', 'OnReason', properties.OnReason != null ? cfn_parse.FromCloudFormation.getString(properties.OnReason) : undefined);
    ret.addPropertyResult('onStatusReason', 'OnStatusReason', properties.OnStatusReason != null ? cfn_parse.FromCloudFormation.getString(properties.OnStatusReason) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-fargateplatformconfiguration.html
     */
    export interface FargatePlatformConfigurationProperty {
        /**
         * `CfnJobDefinition.FargatePlatformConfigurationProperty.PlatformVersion`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-fargateplatformconfiguration.html#cfn-batch-jobdefinition-containerproperties-fargateplatformconfiguration-platformversion
         */
        readonly platformVersion?: string;
    }
}

/**
 * Determine whether the given properties match those of a `FargatePlatformConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `FargatePlatformConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_FargatePlatformConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('platformVersion', cdk.validateString)(properties.platformVersion));
    return errors.wrap('supplied properties not correct for "FargatePlatformConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.FargatePlatformConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `FargatePlatformConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.FargatePlatformConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionFargatePlatformConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_FargatePlatformConfigurationPropertyValidator(properties).assertSuccess();
    return {
        PlatformVersion: cdk.stringToCloudFormation(properties.platformVersion),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionFargatePlatformConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.FargatePlatformConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.FargatePlatformConfigurationProperty>();
    ret.addPropertyResult('platformVersion', 'PlatformVersion', properties.PlatformVersion != null ? cfn_parse.FromCloudFormation.getString(properties.PlatformVersion) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-linuxparameters.html
     */
    export interface LinuxParametersProperty {
        /**
         * `CfnJobDefinition.LinuxParametersProperty.Devices`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-linuxparameters.html#cfn-batch-jobdefinition-containerproperties-linuxparameters-devices
         */
        readonly devices?: Array<CfnJobDefinition.DeviceProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `CfnJobDefinition.LinuxParametersProperty.InitProcessEnabled`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-linuxparameters.html#cfn-batch-jobdefinition-containerproperties-linuxparameters-initprocessenabled
         */
        readonly initProcessEnabled?: boolean | cdk.IResolvable;
        /**
         * `CfnJobDefinition.LinuxParametersProperty.MaxSwap`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-linuxparameters.html#cfn-batch-jobdefinition-containerproperties-linuxparameters-maxswap
         */
        readonly maxSwap?: number;
        /**
         * `CfnJobDefinition.LinuxParametersProperty.SharedMemorySize`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-linuxparameters.html#cfn-batch-jobdefinition-containerproperties-linuxparameters-sharedmemorysize
         */
        readonly sharedMemorySize?: number;
        /**
         * `CfnJobDefinition.LinuxParametersProperty.Swappiness`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-linuxparameters.html#cfn-batch-jobdefinition-containerproperties-linuxparameters-swappiness
         */
        readonly swappiness?: number;
        /**
         * `CfnJobDefinition.LinuxParametersProperty.Tmpfs`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-linuxparameters.html#cfn-batch-jobdefinition-containerproperties-linuxparameters-tmpfs
         */
        readonly tmpfs?: Array<CfnJobDefinition.TmpfsProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `LinuxParametersProperty`
 *
 * @param properties - the TypeScript properties of a `LinuxParametersProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_LinuxParametersPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('devices', cdk.listValidator(CfnJobDefinition_DevicePropertyValidator))(properties.devices));
    errors.collect(cdk.propertyValidator('initProcessEnabled', cdk.validateBoolean)(properties.initProcessEnabled));
    errors.collect(cdk.propertyValidator('maxSwap', cdk.validateNumber)(properties.maxSwap));
    errors.collect(cdk.propertyValidator('sharedMemorySize', cdk.validateNumber)(properties.sharedMemorySize));
    errors.collect(cdk.propertyValidator('swappiness', cdk.validateNumber)(properties.swappiness));
    errors.collect(cdk.propertyValidator('tmpfs', cdk.listValidator(CfnJobDefinition_TmpfsPropertyValidator))(properties.tmpfs));
    return errors.wrap('supplied properties not correct for "LinuxParametersProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.LinuxParameters` resource
 *
 * @param properties - the TypeScript properties of a `LinuxParametersProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.LinuxParameters` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionLinuxParametersPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_LinuxParametersPropertyValidator(properties).assertSuccess();
    return {
        Devices: cdk.listMapper(cfnJobDefinitionDevicePropertyToCloudFormation)(properties.devices),
        InitProcessEnabled: cdk.booleanToCloudFormation(properties.initProcessEnabled),
        MaxSwap: cdk.numberToCloudFormation(properties.maxSwap),
        SharedMemorySize: cdk.numberToCloudFormation(properties.sharedMemorySize),
        Swappiness: cdk.numberToCloudFormation(properties.swappiness),
        Tmpfs: cdk.listMapper(cfnJobDefinitionTmpfsPropertyToCloudFormation)(properties.tmpfs),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionLinuxParametersPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.LinuxParametersProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.LinuxParametersProperty>();
    ret.addPropertyResult('devices', 'Devices', properties.Devices != null ? cfn_parse.FromCloudFormation.getArray(CfnJobDefinitionDevicePropertyFromCloudFormation)(properties.Devices) : undefined);
    ret.addPropertyResult('initProcessEnabled', 'InitProcessEnabled', properties.InitProcessEnabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.InitProcessEnabled) : undefined);
    ret.addPropertyResult('maxSwap', 'MaxSwap', properties.MaxSwap != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxSwap) : undefined);
    ret.addPropertyResult('sharedMemorySize', 'SharedMemorySize', properties.SharedMemorySize != null ? cfn_parse.FromCloudFormation.getNumber(properties.SharedMemorySize) : undefined);
    ret.addPropertyResult('swappiness', 'Swappiness', properties.Swappiness != null ? cfn_parse.FromCloudFormation.getNumber(properties.Swappiness) : undefined);
    ret.addPropertyResult('tmpfs', 'Tmpfs', properties.Tmpfs != null ? cfn_parse.FromCloudFormation.getArray(CfnJobDefinitionTmpfsPropertyFromCloudFormation)(properties.Tmpfs) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-logconfiguration.html
     */
    export interface LogConfigurationProperty {
        /**
         * `CfnJobDefinition.LogConfigurationProperty.LogDriver`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-logconfiguration.html#cfn-batch-jobdefinition-containerproperties-logconfiguration-logdriver
         */
        readonly logDriver: string;
        /**
         * `CfnJobDefinition.LogConfigurationProperty.Options`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-logconfiguration.html#cfn-batch-jobdefinition-containerproperties-logconfiguration-options
         */
        readonly options?: any | cdk.IResolvable;
        /**
         * `CfnJobDefinition.LogConfigurationProperty.SecretOptions`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-logconfiguration.html#cfn-batch-jobdefinition-containerproperties-logconfiguration-secretoptions
         */
        readonly secretOptions?: Array<CfnJobDefinition.SecretProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `LogConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `LogConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_LogConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('logDriver', cdk.requiredValidator)(properties.logDriver));
    errors.collect(cdk.propertyValidator('logDriver', cdk.validateString)(properties.logDriver));
    errors.collect(cdk.propertyValidator('options', cdk.validateObject)(properties.options));
    errors.collect(cdk.propertyValidator('secretOptions', cdk.listValidator(CfnJobDefinition_SecretPropertyValidator))(properties.secretOptions));
    return errors.wrap('supplied properties not correct for "LogConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.LogConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `LogConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.LogConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionLogConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_LogConfigurationPropertyValidator(properties).assertSuccess();
    return {
        LogDriver: cdk.stringToCloudFormation(properties.logDriver),
        Options: cdk.objectToCloudFormation(properties.options),
        SecretOptions: cdk.listMapper(cfnJobDefinitionSecretPropertyToCloudFormation)(properties.secretOptions),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionLogConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.LogConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.LogConfigurationProperty>();
    ret.addPropertyResult('logDriver', 'LogDriver', cfn_parse.FromCloudFormation.getString(properties.LogDriver));
    ret.addPropertyResult('options', 'Options', properties.Options != null ? cfn_parse.FromCloudFormation.getAny(properties.Options) : undefined);
    ret.addPropertyResult('secretOptions', 'SecretOptions', properties.SecretOptions != null ? cfn_parse.FromCloudFormation.getArray(CfnJobDefinitionSecretPropertyFromCloudFormation)(properties.SecretOptions) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-mountpoints.html
     */
    export interface MountPointsProperty {
        /**
         * `CfnJobDefinition.MountPointsProperty.ContainerPath`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-mountpoints.html#cfn-batch-jobdefinition-mountpoints-containerpath
         */
        readonly containerPath?: string;
        /**
         * `CfnJobDefinition.MountPointsProperty.ReadOnly`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-mountpoints.html#cfn-batch-jobdefinition-mountpoints-readonly
         */
        readonly readOnly?: boolean | cdk.IResolvable;
        /**
         * `CfnJobDefinition.MountPointsProperty.SourceVolume`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-mountpoints.html#cfn-batch-jobdefinition-mountpoints-sourcevolume
         */
        readonly sourceVolume?: string;
    }
}

/**
 * Determine whether the given properties match those of a `MountPointsProperty`
 *
 * @param properties - the TypeScript properties of a `MountPointsProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_MountPointsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('containerPath', cdk.validateString)(properties.containerPath));
    errors.collect(cdk.propertyValidator('readOnly', cdk.validateBoolean)(properties.readOnly));
    errors.collect(cdk.propertyValidator('sourceVolume', cdk.validateString)(properties.sourceVolume));
    return errors.wrap('supplied properties not correct for "MountPointsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.MountPoints` resource
 *
 * @param properties - the TypeScript properties of a `MountPointsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.MountPoints` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionMountPointsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_MountPointsPropertyValidator(properties).assertSuccess();
    return {
        ContainerPath: cdk.stringToCloudFormation(properties.containerPath),
        ReadOnly: cdk.booleanToCloudFormation(properties.readOnly),
        SourceVolume: cdk.stringToCloudFormation(properties.sourceVolume),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionMountPointsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.MountPointsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.MountPointsProperty>();
    ret.addPropertyResult('containerPath', 'ContainerPath', properties.ContainerPath != null ? cfn_parse.FromCloudFormation.getString(properties.ContainerPath) : undefined);
    ret.addPropertyResult('readOnly', 'ReadOnly', properties.ReadOnly != null ? cfn_parse.FromCloudFormation.getBoolean(properties.ReadOnly) : undefined);
    ret.addPropertyResult('sourceVolume', 'SourceVolume', properties.SourceVolume != null ? cfn_parse.FromCloudFormation.getString(properties.SourceVolume) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-networkconfiguration.html
     */
    export interface NetworkConfigurationProperty {
        /**
         * `CfnJobDefinition.NetworkConfigurationProperty.AssignPublicIp`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-containerproperties-networkconfiguration.html#cfn-batch-jobdefinition-containerproperties-networkconfiguration-assignpublicip
         */
        readonly assignPublicIp?: string;
    }
}

/**
 * Determine whether the given properties match those of a `NetworkConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `NetworkConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_NetworkConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('assignPublicIp', cdk.validateString)(properties.assignPublicIp));
    return errors.wrap('supplied properties not correct for "NetworkConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.NetworkConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `NetworkConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.NetworkConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionNetworkConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_NetworkConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AssignPublicIp: cdk.stringToCloudFormation(properties.assignPublicIp),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionNetworkConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.NetworkConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.NetworkConfigurationProperty>();
    ret.addPropertyResult('assignPublicIp', 'AssignPublicIp', properties.AssignPublicIp != null ? cfn_parse.FromCloudFormation.getString(properties.AssignPublicIp) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-nodeproperties.html
     */
    export interface NodePropertiesProperty {
        /**
         * `CfnJobDefinition.NodePropertiesProperty.MainNode`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-nodeproperties.html#cfn-batch-jobdefinition-nodeproperties-mainnode
         */
        readonly mainNode: number;
        /**
         * `CfnJobDefinition.NodePropertiesProperty.NodeRangeProperties`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-nodeproperties.html#cfn-batch-jobdefinition-nodeproperties-noderangeproperties
         */
        readonly nodeRangeProperties: Array<CfnJobDefinition.NodeRangePropertyProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `CfnJobDefinition.NodePropertiesProperty.NumNodes`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-nodeproperties.html#cfn-batch-jobdefinition-nodeproperties-numnodes
         */
        readonly numNodes: number;
    }
}

/**
 * Determine whether the given properties match those of a `NodePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `NodePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_NodePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('mainNode', cdk.requiredValidator)(properties.mainNode));
    errors.collect(cdk.propertyValidator('mainNode', cdk.validateNumber)(properties.mainNode));
    errors.collect(cdk.propertyValidator('nodeRangeProperties', cdk.requiredValidator)(properties.nodeRangeProperties));
    errors.collect(cdk.propertyValidator('nodeRangeProperties', cdk.listValidator(CfnJobDefinition_NodeRangePropertyPropertyValidator))(properties.nodeRangeProperties));
    errors.collect(cdk.propertyValidator('numNodes', cdk.requiredValidator)(properties.numNodes));
    errors.collect(cdk.propertyValidator('numNodes', cdk.validateNumber)(properties.numNodes));
    return errors.wrap('supplied properties not correct for "NodePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.NodeProperties` resource
 *
 * @param properties - the TypeScript properties of a `NodePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.NodeProperties` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionNodePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_NodePropertiesPropertyValidator(properties).assertSuccess();
    return {
        MainNode: cdk.numberToCloudFormation(properties.mainNode),
        NodeRangeProperties: cdk.listMapper(cfnJobDefinitionNodeRangePropertyPropertyToCloudFormation)(properties.nodeRangeProperties),
        NumNodes: cdk.numberToCloudFormation(properties.numNodes),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionNodePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.NodePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.NodePropertiesProperty>();
    ret.addPropertyResult('mainNode', 'MainNode', cfn_parse.FromCloudFormation.getNumber(properties.MainNode));
    ret.addPropertyResult('nodeRangeProperties', 'NodeRangeProperties', cfn_parse.FromCloudFormation.getArray(CfnJobDefinitionNodeRangePropertyPropertyFromCloudFormation)(properties.NodeRangeProperties));
    ret.addPropertyResult('numNodes', 'NumNodes', cfn_parse.FromCloudFormation.getNumber(properties.NumNodes));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-noderangeproperty.html
     */
    export interface NodeRangePropertyProperty {
        /**
         * `CfnJobDefinition.NodeRangePropertyProperty.Container`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-noderangeproperty.html#cfn-batch-jobdefinition-noderangeproperty-container
         */
        readonly container?: CfnJobDefinition.ContainerPropertiesProperty | cdk.IResolvable;
        /**
         * `CfnJobDefinition.NodeRangePropertyProperty.TargetNodes`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-noderangeproperty.html#cfn-batch-jobdefinition-noderangeproperty-targetnodes
         */
        readonly targetNodes: string;
    }
}

/**
 * Determine whether the given properties match those of a `NodeRangePropertyProperty`
 *
 * @param properties - the TypeScript properties of a `NodeRangePropertyProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_NodeRangePropertyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('container', CfnJobDefinition_ContainerPropertiesPropertyValidator)(properties.container));
    errors.collect(cdk.propertyValidator('targetNodes', cdk.requiredValidator)(properties.targetNodes));
    errors.collect(cdk.propertyValidator('targetNodes', cdk.validateString)(properties.targetNodes));
    return errors.wrap('supplied properties not correct for "NodeRangePropertyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.NodeRangeProperty` resource
 *
 * @param properties - the TypeScript properties of a `NodeRangePropertyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.NodeRangeProperty` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionNodeRangePropertyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_NodeRangePropertyPropertyValidator(properties).assertSuccess();
    return {
        Container: cfnJobDefinitionContainerPropertiesPropertyToCloudFormation(properties.container),
        TargetNodes: cdk.stringToCloudFormation(properties.targetNodes),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionNodeRangePropertyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.NodeRangePropertyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.NodeRangePropertyProperty>();
    ret.addPropertyResult('container', 'Container', properties.Container != null ? CfnJobDefinitionContainerPropertiesPropertyFromCloudFormation(properties.Container) : undefined);
    ret.addPropertyResult('targetNodes', 'TargetNodes', cfn_parse.FromCloudFormation.getString(properties.TargetNodes));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-resourcerequirement.html
     */
    export interface ResourceRequirementProperty {
        /**
         * `CfnJobDefinition.ResourceRequirementProperty.Type`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-resourcerequirement.html#cfn-batch-jobdefinition-resourcerequirement-type
         */
        readonly type?: string;
        /**
         * `CfnJobDefinition.ResourceRequirementProperty.Value`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-resourcerequirement.html#cfn-batch-jobdefinition-resourcerequirement-value
         */
        readonly value?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ResourceRequirementProperty`
 *
 * @param properties - the TypeScript properties of a `ResourceRequirementProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_ResourceRequirementPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "ResourceRequirementProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.ResourceRequirement` resource
 *
 * @param properties - the TypeScript properties of a `ResourceRequirementProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.ResourceRequirement` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionResourceRequirementPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_ResourceRequirementPropertyValidator(properties).assertSuccess();
    return {
        Type: cdk.stringToCloudFormation(properties.type),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionResourceRequirementPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.ResourceRequirementProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.ResourceRequirementProperty>();
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addPropertyResult('value', 'Value', properties.Value != null ? cfn_parse.FromCloudFormation.getString(properties.Value) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-retrystrategy.html
     */
    export interface RetryStrategyProperty {
        /**
         * `CfnJobDefinition.RetryStrategyProperty.Attempts`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-retrystrategy.html#cfn-batch-jobdefinition-retrystrategy-attempts
         */
        readonly attempts?: number;
        /**
         * `CfnJobDefinition.RetryStrategyProperty.EvaluateOnExit`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-retrystrategy.html#cfn-batch-jobdefinition-retrystrategy-evaluateonexit
         */
        readonly evaluateOnExit?: Array<CfnJobDefinition.EvaluateOnExitProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `RetryStrategyProperty`
 *
 * @param properties - the TypeScript properties of a `RetryStrategyProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_RetryStrategyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('attempts', cdk.validateNumber)(properties.attempts));
    errors.collect(cdk.propertyValidator('evaluateOnExit', cdk.listValidator(CfnJobDefinition_EvaluateOnExitPropertyValidator))(properties.evaluateOnExit));
    return errors.wrap('supplied properties not correct for "RetryStrategyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.RetryStrategy` resource
 *
 * @param properties - the TypeScript properties of a `RetryStrategyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.RetryStrategy` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionRetryStrategyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_RetryStrategyPropertyValidator(properties).assertSuccess();
    return {
        Attempts: cdk.numberToCloudFormation(properties.attempts),
        EvaluateOnExit: cdk.listMapper(cfnJobDefinitionEvaluateOnExitPropertyToCloudFormation)(properties.evaluateOnExit),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionRetryStrategyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.RetryStrategyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.RetryStrategyProperty>();
    ret.addPropertyResult('attempts', 'Attempts', properties.Attempts != null ? cfn_parse.FromCloudFormation.getNumber(properties.Attempts) : undefined);
    ret.addPropertyResult('evaluateOnExit', 'EvaluateOnExit', properties.EvaluateOnExit != null ? cfn_parse.FromCloudFormation.getArray(CfnJobDefinitionEvaluateOnExitPropertyFromCloudFormation)(properties.EvaluateOnExit) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-secret.html
     */
    export interface SecretProperty {
        /**
         * `CfnJobDefinition.SecretProperty.Name`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-secret.html#cfn-batch-jobdefinition-secret-name
         */
        readonly name: string;
        /**
         * `CfnJobDefinition.SecretProperty.ValueFrom`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-secret.html#cfn-batch-jobdefinition-secret-valuefrom
         */
        readonly valueFrom: string;
    }
}

/**
 * Determine whether the given properties match those of a `SecretProperty`
 *
 * @param properties - the TypeScript properties of a `SecretProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_SecretPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('valueFrom', cdk.requiredValidator)(properties.valueFrom));
    errors.collect(cdk.propertyValidator('valueFrom', cdk.validateString)(properties.valueFrom));
    return errors.wrap('supplied properties not correct for "SecretProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.Secret` resource
 *
 * @param properties - the TypeScript properties of a `SecretProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.Secret` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionSecretPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_SecretPropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        ValueFrom: cdk.stringToCloudFormation(properties.valueFrom),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionSecretPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.SecretProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.SecretProperty>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('valueFrom', 'ValueFrom', cfn_parse.FromCloudFormation.getString(properties.ValueFrom));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-timeout.html
     */
    export interface TimeoutProperty {
        /**
         * `CfnJobDefinition.TimeoutProperty.AttemptDurationSeconds`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-timeout.html#cfn-batch-jobdefinition-timeout-attemptdurationseconds
         */
        readonly attemptDurationSeconds?: number;
    }
}

/**
 * Determine whether the given properties match those of a `TimeoutProperty`
 *
 * @param properties - the TypeScript properties of a `TimeoutProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_TimeoutPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('attemptDurationSeconds', cdk.validateNumber)(properties.attemptDurationSeconds));
    return errors.wrap('supplied properties not correct for "TimeoutProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.Timeout` resource
 *
 * @param properties - the TypeScript properties of a `TimeoutProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.Timeout` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionTimeoutPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_TimeoutPropertyValidator(properties).assertSuccess();
    return {
        AttemptDurationSeconds: cdk.numberToCloudFormation(properties.attemptDurationSeconds),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionTimeoutPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.TimeoutProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.TimeoutProperty>();
    ret.addPropertyResult('attemptDurationSeconds', 'AttemptDurationSeconds', properties.AttemptDurationSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.AttemptDurationSeconds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-tmpfs.html
     */
    export interface TmpfsProperty {
        /**
         * `CfnJobDefinition.TmpfsProperty.ContainerPath`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-tmpfs.html#cfn-batch-jobdefinition-tmpfs-containerpath
         */
        readonly containerPath: string;
        /**
         * `CfnJobDefinition.TmpfsProperty.MountOptions`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-tmpfs.html#cfn-batch-jobdefinition-tmpfs-mountoptions
         */
        readonly mountOptions?: string[];
        /**
         * `CfnJobDefinition.TmpfsProperty.Size`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-tmpfs.html#cfn-batch-jobdefinition-tmpfs-size
         */
        readonly size: number;
    }
}

/**
 * Determine whether the given properties match those of a `TmpfsProperty`
 *
 * @param properties - the TypeScript properties of a `TmpfsProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_TmpfsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('containerPath', cdk.requiredValidator)(properties.containerPath));
    errors.collect(cdk.propertyValidator('containerPath', cdk.validateString)(properties.containerPath));
    errors.collect(cdk.propertyValidator('mountOptions', cdk.listValidator(cdk.validateString))(properties.mountOptions));
    errors.collect(cdk.propertyValidator('size', cdk.requiredValidator)(properties.size));
    errors.collect(cdk.propertyValidator('size', cdk.validateNumber)(properties.size));
    return errors.wrap('supplied properties not correct for "TmpfsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.Tmpfs` resource
 *
 * @param properties - the TypeScript properties of a `TmpfsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.Tmpfs` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionTmpfsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_TmpfsPropertyValidator(properties).assertSuccess();
    return {
        ContainerPath: cdk.stringToCloudFormation(properties.containerPath),
        MountOptions: cdk.listMapper(cdk.stringToCloudFormation)(properties.mountOptions),
        Size: cdk.numberToCloudFormation(properties.size),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionTmpfsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.TmpfsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.TmpfsProperty>();
    ret.addPropertyResult('containerPath', 'ContainerPath', cfn_parse.FromCloudFormation.getString(properties.ContainerPath));
    ret.addPropertyResult('mountOptions', 'MountOptions', properties.MountOptions != null ? cfn_parse.FromCloudFormation.getStringArray(properties.MountOptions) : undefined);
    ret.addPropertyResult('size', 'Size', cfn_parse.FromCloudFormation.getNumber(properties.Size));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-ulimit.html
     */
    export interface UlimitProperty {
        /**
         * `CfnJobDefinition.UlimitProperty.HardLimit`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-ulimit.html#cfn-batch-jobdefinition-ulimit-hardlimit
         */
        readonly hardLimit: number;
        /**
         * `CfnJobDefinition.UlimitProperty.Name`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-ulimit.html#cfn-batch-jobdefinition-ulimit-name
         */
        readonly name: string;
        /**
         * `CfnJobDefinition.UlimitProperty.SoftLimit`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-ulimit.html#cfn-batch-jobdefinition-ulimit-softlimit
         */
        readonly softLimit: number;
    }
}

/**
 * Determine whether the given properties match those of a `UlimitProperty`
 *
 * @param properties - the TypeScript properties of a `UlimitProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_UlimitPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('hardLimit', cdk.requiredValidator)(properties.hardLimit));
    errors.collect(cdk.propertyValidator('hardLimit', cdk.validateNumber)(properties.hardLimit));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('softLimit', cdk.requiredValidator)(properties.softLimit));
    errors.collect(cdk.propertyValidator('softLimit', cdk.validateNumber)(properties.softLimit));
    return errors.wrap('supplied properties not correct for "UlimitProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.Ulimit` resource
 *
 * @param properties - the TypeScript properties of a `UlimitProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.Ulimit` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionUlimitPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_UlimitPropertyValidator(properties).assertSuccess();
    return {
        HardLimit: cdk.numberToCloudFormation(properties.hardLimit),
        Name: cdk.stringToCloudFormation(properties.name),
        SoftLimit: cdk.numberToCloudFormation(properties.softLimit),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionUlimitPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.UlimitProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.UlimitProperty>();
    ret.addPropertyResult('hardLimit', 'HardLimit', cfn_parse.FromCloudFormation.getNumber(properties.HardLimit));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('softLimit', 'SoftLimit', cfn_parse.FromCloudFormation.getNumber(properties.SoftLimit));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-volumes.html
     */
    export interface VolumesProperty {
        /**
         * `CfnJobDefinition.VolumesProperty.EfsVolumeConfiguration`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-volumes.html#cfn-batch-jobdefinition-volumes-efsvolumeconfiguration
         */
        readonly efsVolumeConfiguration?: CfnJobDefinition.EfsVolumeConfigurationProperty | cdk.IResolvable;
        /**
         * `CfnJobDefinition.VolumesProperty.Host`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-volumes.html#cfn-batch-jobdefinition-volumes-host
         */
        readonly host?: CfnJobDefinition.VolumesHostProperty | cdk.IResolvable;
        /**
         * `CfnJobDefinition.VolumesProperty.Name`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-volumes.html#cfn-batch-jobdefinition-volumes-name
         */
        readonly name?: string;
    }
}

/**
 * Determine whether the given properties match those of a `VolumesProperty`
 *
 * @param properties - the TypeScript properties of a `VolumesProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_VolumesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('efsVolumeConfiguration', CfnJobDefinition_EfsVolumeConfigurationPropertyValidator)(properties.efsVolumeConfiguration));
    errors.collect(cdk.propertyValidator('host', CfnJobDefinition_VolumesHostPropertyValidator)(properties.host));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "VolumesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.Volumes` resource
 *
 * @param properties - the TypeScript properties of a `VolumesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.Volumes` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionVolumesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_VolumesPropertyValidator(properties).assertSuccess();
    return {
        EfsVolumeConfiguration: cfnJobDefinitionEfsVolumeConfigurationPropertyToCloudFormation(properties.efsVolumeConfiguration),
        Host: cfnJobDefinitionVolumesHostPropertyToCloudFormation(properties.host),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionVolumesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.VolumesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.VolumesProperty>();
    ret.addPropertyResult('efsVolumeConfiguration', 'EfsVolumeConfiguration', properties.EfsVolumeConfiguration != null ? CfnJobDefinitionEfsVolumeConfigurationPropertyFromCloudFormation(properties.EfsVolumeConfiguration) : undefined);
    ret.addPropertyResult('host', 'Host', properties.Host != null ? CfnJobDefinitionVolumesHostPropertyFromCloudFormation(properties.Host) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJobDefinition {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-volumeshost.html
     */
    export interface VolumesHostProperty {
        /**
         * `CfnJobDefinition.VolumesHostProperty.SourcePath`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobdefinition-volumeshost.html#cfn-batch-jobdefinition-volumeshost-sourcepath
         */
        readonly sourcePath?: string;
    }
}

/**
 * Determine whether the given properties match those of a `VolumesHostProperty`
 *
 * @param properties - the TypeScript properties of a `VolumesHostProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobDefinition_VolumesHostPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('sourcePath', cdk.validateString)(properties.sourcePath));
    return errors.wrap('supplied properties not correct for "VolumesHostProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.VolumesHost` resource
 *
 * @param properties - the TypeScript properties of a `VolumesHostProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobDefinition.VolumesHost` resource.
 */
// @ts-ignore TS6133
function cfnJobDefinitionVolumesHostPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobDefinition_VolumesHostPropertyValidator(properties).assertSuccess();
    return {
        SourcePath: cdk.stringToCloudFormation(properties.sourcePath),
    };
}

// @ts-ignore TS6133
function CfnJobDefinitionVolumesHostPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobDefinition.VolumesHostProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobDefinition.VolumesHostProperty>();
    ret.addPropertyResult('sourcePath', 'SourcePath', properties.SourcePath != null ? cfn_parse.FromCloudFormation.getString(properties.SourcePath) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnJobQueue`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html
 */
export interface CfnJobQueueProps {

    /**
     * `AWS::Batch::JobQueue.ComputeEnvironmentOrder`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html#cfn-batch-jobqueue-computeenvironmentorder
     */
    readonly computeEnvironmentOrder: Array<CfnJobQueue.ComputeEnvironmentOrderProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * `AWS::Batch::JobQueue.Priority`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html#cfn-batch-jobqueue-priority
     */
    readonly priority: number;

    /**
     * `AWS::Batch::JobQueue.JobQueueName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html#cfn-batch-jobqueue-jobqueuename
     */
    readonly jobQueueName?: string;

    /**
     * `AWS::Batch::JobQueue.SchedulingPolicyArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html#cfn-batch-jobqueue-schedulingpolicyarn
     */
    readonly schedulingPolicyArn?: string;

    /**
     * `AWS::Batch::JobQueue.State`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html#cfn-batch-jobqueue-state
     */
    readonly state?: string;

    /**
     * `AWS::Batch::JobQueue.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html#cfn-batch-jobqueue-tags
     */
    readonly tags?: { [key: string]: (string) };
}

/**
 * Determine whether the given properties match those of a `CfnJobQueueProps`
 *
 * @param properties - the TypeScript properties of a `CfnJobQueueProps`
 *
 * @returns the result of the validation.
 */
function CfnJobQueuePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('computeEnvironmentOrder', cdk.requiredValidator)(properties.computeEnvironmentOrder));
    errors.collect(cdk.propertyValidator('computeEnvironmentOrder', cdk.listValidator(CfnJobQueue_ComputeEnvironmentOrderPropertyValidator))(properties.computeEnvironmentOrder));
    errors.collect(cdk.propertyValidator('jobQueueName', cdk.validateString)(properties.jobQueueName));
    errors.collect(cdk.propertyValidator('priority', cdk.requiredValidator)(properties.priority));
    errors.collect(cdk.propertyValidator('priority', cdk.validateNumber)(properties.priority));
    errors.collect(cdk.propertyValidator('schedulingPolicyArn', cdk.validateString)(properties.schedulingPolicyArn));
    errors.collect(cdk.propertyValidator('state', cdk.validateString)(properties.state));
    errors.collect(cdk.propertyValidator('tags', cdk.hashValidator(cdk.validateString))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnJobQueueProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobQueue` resource
 *
 * @param properties - the TypeScript properties of a `CfnJobQueueProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobQueue` resource.
 */
// @ts-ignore TS6133
function cfnJobQueuePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobQueuePropsValidator(properties).assertSuccess();
    return {
        ComputeEnvironmentOrder: cdk.listMapper(cfnJobQueueComputeEnvironmentOrderPropertyToCloudFormation)(properties.computeEnvironmentOrder),
        Priority: cdk.numberToCloudFormation(properties.priority),
        JobQueueName: cdk.stringToCloudFormation(properties.jobQueueName),
        SchedulingPolicyArn: cdk.stringToCloudFormation(properties.schedulingPolicyArn),
        State: cdk.stringToCloudFormation(properties.state),
        Tags: cdk.hashMapper(cdk.stringToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnJobQueuePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobQueueProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobQueueProps>();
    ret.addPropertyResult('computeEnvironmentOrder', 'ComputeEnvironmentOrder', cfn_parse.FromCloudFormation.getArray(CfnJobQueueComputeEnvironmentOrderPropertyFromCloudFormation)(properties.ComputeEnvironmentOrder));
    ret.addPropertyResult('priority', 'Priority', cfn_parse.FromCloudFormation.getNumber(properties.Priority));
    ret.addPropertyResult('jobQueueName', 'JobQueueName', properties.JobQueueName != null ? cfn_parse.FromCloudFormation.getString(properties.JobQueueName) : undefined);
    ret.addPropertyResult('schedulingPolicyArn', 'SchedulingPolicyArn', properties.SchedulingPolicyArn != null ? cfn_parse.FromCloudFormation.getString(properties.SchedulingPolicyArn) : undefined);
    ret.addPropertyResult('state', 'State', properties.State != null ? cfn_parse.FromCloudFormation.getString(properties.State) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Batch::JobQueue`
 *
 *
 *
 * @cloudformationResource AWS::Batch::JobQueue
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html
 */
export class CfnJobQueue extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Batch::JobQueue";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnJobQueue {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnJobQueuePropsFromCloudFormation(resourceProperties);
        const ret = new CfnJobQueue(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     *
     * @cloudformationAttribute JobQueueArn
     */
    public readonly attrJobQueueArn: string;

    /**
     * `AWS::Batch::JobQueue.ComputeEnvironmentOrder`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html#cfn-batch-jobqueue-computeenvironmentorder
     */
    public computeEnvironmentOrder: Array<CfnJobQueue.ComputeEnvironmentOrderProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * `AWS::Batch::JobQueue.Priority`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html#cfn-batch-jobqueue-priority
     */
    public priority: number;

    /**
     * `AWS::Batch::JobQueue.JobQueueName`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html#cfn-batch-jobqueue-jobqueuename
     */
    public jobQueueName: string | undefined;

    /**
     * `AWS::Batch::JobQueue.SchedulingPolicyArn`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html#cfn-batch-jobqueue-schedulingpolicyarn
     */
    public schedulingPolicyArn: string | undefined;

    /**
     * `AWS::Batch::JobQueue.State`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html#cfn-batch-jobqueue-state
     */
    public state: string | undefined;

    /**
     * `AWS::Batch::JobQueue.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-jobqueue.html#cfn-batch-jobqueue-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Batch::JobQueue`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnJobQueueProps) {
        super(scope, id, { type: CfnJobQueue.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'computeEnvironmentOrder', this);
        cdk.requireProperty(props, 'priority', this);
        this.attrJobQueueArn = cdk.Token.asString(this.getAtt('JobQueueArn'));

        this.computeEnvironmentOrder = props.computeEnvironmentOrder;
        this.priority = props.priority;
        this.jobQueueName = props.jobQueueName;
        this.schedulingPolicyArn = props.schedulingPolicyArn;
        this.state = props.state;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::Batch::JobQueue", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnJobQueue.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            computeEnvironmentOrder: this.computeEnvironmentOrder,
            priority: this.priority,
            jobQueueName: this.jobQueueName,
            schedulingPolicyArn: this.schedulingPolicyArn,
            state: this.state,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnJobQueuePropsToCloudFormation(props);
    }
}

export namespace CfnJobQueue {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobqueue-computeenvironmentorder.html
     */
    export interface ComputeEnvironmentOrderProperty {
        /**
         * `CfnJobQueue.ComputeEnvironmentOrderProperty.ComputeEnvironment`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobqueue-computeenvironmentorder.html#cfn-batch-jobqueue-computeenvironmentorder-computeenvironment
         */
        readonly computeEnvironment: string;
        /**
         * `CfnJobQueue.ComputeEnvironmentOrderProperty.Order`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-jobqueue-computeenvironmentorder.html#cfn-batch-jobqueue-computeenvironmentorder-order
         */
        readonly order: number;
    }
}

/**
 * Determine whether the given properties match those of a `ComputeEnvironmentOrderProperty`
 *
 * @param properties - the TypeScript properties of a `ComputeEnvironmentOrderProperty`
 *
 * @returns the result of the validation.
 */
function CfnJobQueue_ComputeEnvironmentOrderPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('computeEnvironment', cdk.requiredValidator)(properties.computeEnvironment));
    errors.collect(cdk.propertyValidator('computeEnvironment', cdk.validateString)(properties.computeEnvironment));
    errors.collect(cdk.propertyValidator('order', cdk.requiredValidator)(properties.order));
    errors.collect(cdk.propertyValidator('order', cdk.validateNumber)(properties.order));
    return errors.wrap('supplied properties not correct for "ComputeEnvironmentOrderProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::JobQueue.ComputeEnvironmentOrder` resource
 *
 * @param properties - the TypeScript properties of a `ComputeEnvironmentOrderProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::JobQueue.ComputeEnvironmentOrder` resource.
 */
// @ts-ignore TS6133
function cfnJobQueueComputeEnvironmentOrderPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobQueue_ComputeEnvironmentOrderPropertyValidator(properties).assertSuccess();
    return {
        ComputeEnvironment: cdk.stringToCloudFormation(properties.computeEnvironment),
        Order: cdk.numberToCloudFormation(properties.order),
    };
}

// @ts-ignore TS6133
function CfnJobQueueComputeEnvironmentOrderPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobQueue.ComputeEnvironmentOrderProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobQueue.ComputeEnvironmentOrderProperty>();
    ret.addPropertyResult('computeEnvironment', 'ComputeEnvironment', cfn_parse.FromCloudFormation.getString(properties.ComputeEnvironment));
    ret.addPropertyResult('order', 'Order', cfn_parse.FromCloudFormation.getNumber(properties.Order));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnSchedulingPolicy`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-schedulingpolicy.html
 */
export interface CfnSchedulingPolicyProps {

    /**
     * `AWS::Batch::SchedulingPolicy.FairsharePolicy`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-schedulingpolicy.html#cfn-batch-schedulingpolicy-fairsharepolicy
     */
    readonly fairsharePolicy?: CfnSchedulingPolicy.FairsharePolicyProperty | cdk.IResolvable;

    /**
     * `AWS::Batch::SchedulingPolicy.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-schedulingpolicy.html#cfn-batch-schedulingpolicy-name
     */
    readonly name?: string;

    /**
     * `AWS::Batch::SchedulingPolicy.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-schedulingpolicy.html#cfn-batch-schedulingpolicy-tags
     */
    readonly tags?: { [key: string]: (string) };
}

/**
 * Determine whether the given properties match those of a `CfnSchedulingPolicyProps`
 *
 * @param properties - the TypeScript properties of a `CfnSchedulingPolicyProps`
 *
 * @returns the result of the validation.
 */
function CfnSchedulingPolicyPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('fairsharePolicy', CfnSchedulingPolicy_FairsharePolicyPropertyValidator)(properties.fairsharePolicy));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tags', cdk.hashValidator(cdk.validateString))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnSchedulingPolicyProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::SchedulingPolicy` resource
 *
 * @param properties - the TypeScript properties of a `CfnSchedulingPolicyProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::SchedulingPolicy` resource.
 */
// @ts-ignore TS6133
function cfnSchedulingPolicyPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSchedulingPolicyPropsValidator(properties).assertSuccess();
    return {
        FairsharePolicy: cfnSchedulingPolicyFairsharePolicyPropertyToCloudFormation(properties.fairsharePolicy),
        Name: cdk.stringToCloudFormation(properties.name),
        Tags: cdk.hashMapper(cdk.stringToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnSchedulingPolicyPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSchedulingPolicyProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSchedulingPolicyProps>();
    ret.addPropertyResult('fairsharePolicy', 'FairsharePolicy', properties.FairsharePolicy != null ? CfnSchedulingPolicyFairsharePolicyPropertyFromCloudFormation(properties.FairsharePolicy) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Batch::SchedulingPolicy`
 *
 *
 *
 * @cloudformationResource AWS::Batch::SchedulingPolicy
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-schedulingpolicy.html
 */
export class CfnSchedulingPolicy extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Batch::SchedulingPolicy";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnSchedulingPolicy {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnSchedulingPolicyPropsFromCloudFormation(resourceProperties);
        const ret = new CfnSchedulingPolicy(scope, id, propsResult.value);
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
     * `AWS::Batch::SchedulingPolicy.FairsharePolicy`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-schedulingpolicy.html#cfn-batch-schedulingpolicy-fairsharepolicy
     */
    public fairsharePolicy: CfnSchedulingPolicy.FairsharePolicyProperty | cdk.IResolvable | undefined;

    /**
     * `AWS::Batch::SchedulingPolicy.Name`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-schedulingpolicy.html#cfn-batch-schedulingpolicy-name
     */
    public name: string | undefined;

    /**
     * `AWS::Batch::SchedulingPolicy.Tags`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-batch-schedulingpolicy.html#cfn-batch-schedulingpolicy-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Batch::SchedulingPolicy`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnSchedulingPolicyProps = {}) {
        super(scope, id, { type: CfnSchedulingPolicy.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.fairsharePolicy = props.fairsharePolicy;
        this.name = props.name;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::Batch::SchedulingPolicy", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnSchedulingPolicy.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            fairsharePolicy: this.fairsharePolicy,
            name: this.name,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnSchedulingPolicyPropsToCloudFormation(props);
    }
}

export namespace CfnSchedulingPolicy {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-schedulingpolicy-fairsharepolicy.html
     */
    export interface FairsharePolicyProperty {
        /**
         * `CfnSchedulingPolicy.FairsharePolicyProperty.ComputeReservation`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-schedulingpolicy-fairsharepolicy.html#cfn-batch-schedulingpolicy-fairsharepolicy-computereservation
         */
        readonly computeReservation?: number;
        /**
         * `CfnSchedulingPolicy.FairsharePolicyProperty.ShareDecaySeconds`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-schedulingpolicy-fairsharepolicy.html#cfn-batch-schedulingpolicy-fairsharepolicy-sharedecayseconds
         */
        readonly shareDecaySeconds?: number;
        /**
         * `CfnSchedulingPolicy.FairsharePolicyProperty.ShareDistribution`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-schedulingpolicy-fairsharepolicy.html#cfn-batch-schedulingpolicy-fairsharepolicy-sharedistribution
         */
        readonly shareDistribution?: Array<CfnSchedulingPolicy.ShareAttributesProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `FairsharePolicyProperty`
 *
 * @param properties - the TypeScript properties of a `FairsharePolicyProperty`
 *
 * @returns the result of the validation.
 */
function CfnSchedulingPolicy_FairsharePolicyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('computeReservation', cdk.validateNumber)(properties.computeReservation));
    errors.collect(cdk.propertyValidator('shareDecaySeconds', cdk.validateNumber)(properties.shareDecaySeconds));
    errors.collect(cdk.propertyValidator('shareDistribution', cdk.listValidator(CfnSchedulingPolicy_ShareAttributesPropertyValidator))(properties.shareDistribution));
    return errors.wrap('supplied properties not correct for "FairsharePolicyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::SchedulingPolicy.FairsharePolicy` resource
 *
 * @param properties - the TypeScript properties of a `FairsharePolicyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::SchedulingPolicy.FairsharePolicy` resource.
 */
// @ts-ignore TS6133
function cfnSchedulingPolicyFairsharePolicyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSchedulingPolicy_FairsharePolicyPropertyValidator(properties).assertSuccess();
    return {
        ComputeReservation: cdk.numberToCloudFormation(properties.computeReservation),
        ShareDecaySeconds: cdk.numberToCloudFormation(properties.shareDecaySeconds),
        ShareDistribution: cdk.listMapper(cfnSchedulingPolicyShareAttributesPropertyToCloudFormation)(properties.shareDistribution),
    };
}

// @ts-ignore TS6133
function CfnSchedulingPolicyFairsharePolicyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSchedulingPolicy.FairsharePolicyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSchedulingPolicy.FairsharePolicyProperty>();
    ret.addPropertyResult('computeReservation', 'ComputeReservation', properties.ComputeReservation != null ? cfn_parse.FromCloudFormation.getNumber(properties.ComputeReservation) : undefined);
    ret.addPropertyResult('shareDecaySeconds', 'ShareDecaySeconds', properties.ShareDecaySeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.ShareDecaySeconds) : undefined);
    ret.addPropertyResult('shareDistribution', 'ShareDistribution', properties.ShareDistribution != null ? cfn_parse.FromCloudFormation.getArray(CfnSchedulingPolicyShareAttributesPropertyFromCloudFormation)(properties.ShareDistribution) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnSchedulingPolicy {
    /**
     *
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-schedulingpolicy-shareattributes.html
     */
    export interface ShareAttributesProperty {
        /**
         * `CfnSchedulingPolicy.ShareAttributesProperty.ShareIdentifier`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-schedulingpolicy-shareattributes.html#cfn-batch-schedulingpolicy-shareattributes-shareidentifier
         */
        readonly shareIdentifier?: string;
        /**
         * `CfnSchedulingPolicy.ShareAttributesProperty.WeightFactor`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-batch-schedulingpolicy-shareattributes.html#cfn-batch-schedulingpolicy-shareattributes-weightfactor
         */
        readonly weightFactor?: number;
    }
}

/**
 * Determine whether the given properties match those of a `ShareAttributesProperty`
 *
 * @param properties - the TypeScript properties of a `ShareAttributesProperty`
 *
 * @returns the result of the validation.
 */
function CfnSchedulingPolicy_ShareAttributesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('shareIdentifier', cdk.validateString)(properties.shareIdentifier));
    errors.collect(cdk.propertyValidator('weightFactor', cdk.validateNumber)(properties.weightFactor));
    return errors.wrap('supplied properties not correct for "ShareAttributesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Batch::SchedulingPolicy.ShareAttributes` resource
 *
 * @param properties - the TypeScript properties of a `ShareAttributesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Batch::SchedulingPolicy.ShareAttributes` resource.
 */
// @ts-ignore TS6133
function cfnSchedulingPolicyShareAttributesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSchedulingPolicy_ShareAttributesPropertyValidator(properties).assertSuccess();
    return {
        ShareIdentifier: cdk.stringToCloudFormation(properties.shareIdentifier),
        WeightFactor: cdk.numberToCloudFormation(properties.weightFactor),
    };
}

// @ts-ignore TS6133
function CfnSchedulingPolicyShareAttributesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSchedulingPolicy.ShareAttributesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSchedulingPolicy.ShareAttributesProperty>();
    ret.addPropertyResult('shareIdentifier', 'ShareIdentifier', properties.ShareIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.ShareIdentifier) : undefined);
    ret.addPropertyResult('weightFactor', 'WeightFactor', properties.WeightFactor != null ? cfn_parse.FromCloudFormation.getNumber(properties.WeightFactor) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
