// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:10.449Z","fingerprint":"WlFoH/DU3APHtBlzxMvQVU+Q+pijVqIihdaxQKwjAB8="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnCanary`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html
 */
export interface CfnCanaryProps {

    /**
     * The location in Amazon S3 where Synthetics stores artifacts from the runs of this canary. Artifacts include the log file, screenshots, and HAR files. Specify the full location path, including `s3://` at the beginning of the path.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-artifacts3location
     */
    readonly artifactS3Location: string;

    /**
     * Use this structure to input your script code for the canary. This structure contains the Lambda handler with the location where the canary should start running the script. If the script is stored in an S3 bucket, the bucket name, key, and version are also included. If the script is passed into the canary directly, the script code is contained in the value of `Script` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-code
     */
    readonly code: CfnCanary.CodeProperty | cdk.IResolvable;

    /**
     * The ARN of the IAM role to be used to run the canary. This role must already exist, and must include `lambda.amazonaws.com` as a principal in the trust policy. The role must also have the following permissions:
     *
     * - `s3:PutObject`
     * - `s3:GetBucketLocation`
     * - `s3:ListAllMyBuckets`
     * - `cloudwatch:PutMetricData`
     * - `logs:CreateLogGroup`
     * - `logs:CreateLogStream`
     * - `logs:PutLogEvents`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-executionrolearn
     */
    readonly executionRoleArn: string;

    /**
     * The name for this canary. Be sure to give it a descriptive name that distinguishes it from other canaries in your account.
     *
     * Do not include secrets or proprietary information in your canary names. The canary name makes up part of the canary ARN, and the ARN is included in outbound calls over the internet. For more information, see [Security Considerations for Synthetics Canaries](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/servicelens_canaries_security.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-name
     */
    readonly name: string;

    /**
     * Specifies the runtime version to use for the canary. For more information about runtime versions, see [Canary Runtime Versions](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Library.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-runtimeversion
     */
    readonly runtimeVersion: string;

    /**
     * A structure that contains information about how often the canary is to run, and when these runs are to stop.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-schedule
     */
    readonly schedule: CfnCanary.ScheduleProperty | cdk.IResolvable;

    /**
     * Specify TRUE to have the canary start making runs immediately after it is created.
     *
     * A canary that you create using CloudFormation can't be used to monitor the CloudFormation stack that creates the canary or to roll back that stack if there is a failure.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-startcanaryaftercreation
     */
    readonly startCanaryAfterCreation: boolean | cdk.IResolvable;

    /**
     * A structure that contains the configuration for canary artifacts, including the encryption-at-rest settings for artifacts that the canary uploads to Amazon S3.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-artifactconfig
     */
    readonly artifactConfig?: CfnCanary.ArtifactConfigProperty | cdk.IResolvable;

    /**
     * The number of days to retain data about failed runs of this canary. If you omit this field, the default of 31 days is used. The valid range is 1 to 455 days.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-failureretentionperiod
     */
    readonly failureRetentionPeriod?: number;

    /**
     * A structure that contains input information for a canary run. If you omit this structure, the frequency of the canary is used as canary's timeout value, up to a maximum of 900 seconds.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-runconfig
     */
    readonly runConfig?: CfnCanary.RunConfigProperty | cdk.IResolvable;

    /**
     * The number of days to retain data about successful runs of this canary. If you omit this field, the default of 31 days is used. The valid range is 1 to 455 days.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-successretentionperiod
     */
    readonly successRetentionPeriod?: number;

    /**
     * The list of key-value pairs that are associated with the canary.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * If this canary performs visual monitoring by comparing screenshots, this structure contains the ID of the canary run to use as the baseline for screenshots, and the coordinates of any parts of the screen to ignore during the visual monitoring comparison.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-visualreference
     */
    readonly visualReference?: CfnCanary.VisualReferenceProperty | cdk.IResolvable;

    /**
     * If this canary is to test an endpoint in a VPC, this structure contains information about the subnet and security groups of the VPC endpoint. For more information, see [Running a Canary in a VPC](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_VPC.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-vpcconfig
     */
    readonly vpcConfig?: CfnCanary.VPCConfigProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnCanaryProps`
 *
 * @param properties - the TypeScript properties of a `CfnCanaryProps`
 *
 * @returns the result of the validation.
 */
function CfnCanaryPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('artifactConfig', CfnCanary_ArtifactConfigPropertyValidator)(properties.artifactConfig));
    errors.collect(cdk.propertyValidator('artifactS3Location', cdk.requiredValidator)(properties.artifactS3Location));
    errors.collect(cdk.propertyValidator('artifactS3Location', cdk.validateString)(properties.artifactS3Location));
    errors.collect(cdk.propertyValidator('code', cdk.requiredValidator)(properties.code));
    errors.collect(cdk.propertyValidator('code', CfnCanary_CodePropertyValidator)(properties.code));
    errors.collect(cdk.propertyValidator('executionRoleArn', cdk.requiredValidator)(properties.executionRoleArn));
    errors.collect(cdk.propertyValidator('executionRoleArn', cdk.validateString)(properties.executionRoleArn));
    errors.collect(cdk.propertyValidator('failureRetentionPeriod', cdk.validateNumber)(properties.failureRetentionPeriod));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('runConfig', CfnCanary_RunConfigPropertyValidator)(properties.runConfig));
    errors.collect(cdk.propertyValidator('runtimeVersion', cdk.requiredValidator)(properties.runtimeVersion));
    errors.collect(cdk.propertyValidator('runtimeVersion', cdk.validateString)(properties.runtimeVersion));
    errors.collect(cdk.propertyValidator('schedule', cdk.requiredValidator)(properties.schedule));
    errors.collect(cdk.propertyValidator('schedule', CfnCanary_SchedulePropertyValidator)(properties.schedule));
    errors.collect(cdk.propertyValidator('startCanaryAfterCreation', cdk.requiredValidator)(properties.startCanaryAfterCreation));
    errors.collect(cdk.propertyValidator('startCanaryAfterCreation', cdk.validateBoolean)(properties.startCanaryAfterCreation));
    errors.collect(cdk.propertyValidator('successRetentionPeriod', cdk.validateNumber)(properties.successRetentionPeriod));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('vpcConfig', CfnCanary_VPCConfigPropertyValidator)(properties.vpcConfig));
    errors.collect(cdk.propertyValidator('visualReference', CfnCanary_VisualReferencePropertyValidator)(properties.visualReference));
    return errors.wrap('supplied properties not correct for "CfnCanaryProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Synthetics::Canary` resource
 *
 * @param properties - the TypeScript properties of a `CfnCanaryProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Synthetics::Canary` resource.
 */
// @ts-ignore TS6133
function cfnCanaryPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCanaryPropsValidator(properties).assertSuccess();
    return {
        ArtifactS3Location: cdk.stringToCloudFormation(properties.artifactS3Location),
        Code: cfnCanaryCodePropertyToCloudFormation(properties.code),
        ExecutionRoleArn: cdk.stringToCloudFormation(properties.executionRoleArn),
        Name: cdk.stringToCloudFormation(properties.name),
        RuntimeVersion: cdk.stringToCloudFormation(properties.runtimeVersion),
        Schedule: cfnCanarySchedulePropertyToCloudFormation(properties.schedule),
        StartCanaryAfterCreation: cdk.booleanToCloudFormation(properties.startCanaryAfterCreation),
        ArtifactConfig: cfnCanaryArtifactConfigPropertyToCloudFormation(properties.artifactConfig),
        FailureRetentionPeriod: cdk.numberToCloudFormation(properties.failureRetentionPeriod),
        RunConfig: cfnCanaryRunConfigPropertyToCloudFormation(properties.runConfig),
        SuccessRetentionPeriod: cdk.numberToCloudFormation(properties.successRetentionPeriod),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        VisualReference: cfnCanaryVisualReferencePropertyToCloudFormation(properties.visualReference),
        VPCConfig: cfnCanaryVPCConfigPropertyToCloudFormation(properties.vpcConfig),
    };
}

// @ts-ignore TS6133
function CfnCanaryPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCanaryProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCanaryProps>();
    ret.addPropertyResult('artifactS3Location', 'ArtifactS3Location', cfn_parse.FromCloudFormation.getString(properties.ArtifactS3Location));
    ret.addPropertyResult('code', 'Code', CfnCanaryCodePropertyFromCloudFormation(properties.Code));
    ret.addPropertyResult('executionRoleArn', 'ExecutionRoleArn', cfn_parse.FromCloudFormation.getString(properties.ExecutionRoleArn));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('runtimeVersion', 'RuntimeVersion', cfn_parse.FromCloudFormation.getString(properties.RuntimeVersion));
    ret.addPropertyResult('schedule', 'Schedule', CfnCanarySchedulePropertyFromCloudFormation(properties.Schedule));
    ret.addPropertyResult('startCanaryAfterCreation', 'StartCanaryAfterCreation', cfn_parse.FromCloudFormation.getBoolean(properties.StartCanaryAfterCreation));
    ret.addPropertyResult('artifactConfig', 'ArtifactConfig', properties.ArtifactConfig != null ? CfnCanaryArtifactConfigPropertyFromCloudFormation(properties.ArtifactConfig) : undefined);
    ret.addPropertyResult('failureRetentionPeriod', 'FailureRetentionPeriod', properties.FailureRetentionPeriod != null ? cfn_parse.FromCloudFormation.getNumber(properties.FailureRetentionPeriod) : undefined);
    ret.addPropertyResult('runConfig', 'RunConfig', properties.RunConfig != null ? CfnCanaryRunConfigPropertyFromCloudFormation(properties.RunConfig) : undefined);
    ret.addPropertyResult('successRetentionPeriod', 'SuccessRetentionPeriod', properties.SuccessRetentionPeriod != null ? cfn_parse.FromCloudFormation.getNumber(properties.SuccessRetentionPeriod) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('visualReference', 'VisualReference', properties.VisualReference != null ? CfnCanaryVisualReferencePropertyFromCloudFormation(properties.VisualReference) : undefined);
    ret.addPropertyResult('vpcConfig', 'VPCConfig', properties.VPCConfig != null ? CfnCanaryVPCConfigPropertyFromCloudFormation(properties.VPCConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Synthetics::Canary`
 *
 * Creates or updates a canary. Canaries are scripts that monitor your endpoints and APIs from the outside-in. Canaries help you check the availability and latency of your web services and troubleshoot anomalies by investigating load time data, screenshots of the UI, logs, and metrics. You can set up a canary to run continuously or just once.
 *
 * To create canaries, you must have the `CloudWatchSyntheticsFullAccess` policy. If you are creating a new IAM role for the canary, you also need the the `iam:CreateRole` , `iam:CreatePolicy` and `iam:AttachRolePolicy` permissions. For more information, see [Necessary Roles and Permissions](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Roles) .
 *
 * Do not include secrets or proprietary information in your canary names. The canary name makes up part of the Amazon Resource Name (ARN) for the canary, and the ARN is included in outbound calls over the internet. For more information, see [Security Considerations for Synthetics Canaries](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/servicelens_canaries_security.html) .
 *
 * @cloudformationResource AWS::Synthetics::Canary
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html
 */
export class CfnCanary extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Synthetics::Canary";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnCanary {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnCanaryPropsFromCloudFormation(resourceProperties);
        const ret = new CfnCanary(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ID of the canary.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The state of the canary. For example, `RUNNING` .
     * @cloudformationAttribute State
     */
    public readonly attrState: string;

    /**
     * The location in Amazon S3 where Synthetics stores artifacts from the runs of this canary. Artifacts include the log file, screenshots, and HAR files. Specify the full location path, including `s3://` at the beginning of the path.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-artifacts3location
     */
    public artifactS3Location: string;

    /**
     * Use this structure to input your script code for the canary. This structure contains the Lambda handler with the location where the canary should start running the script. If the script is stored in an S3 bucket, the bucket name, key, and version are also included. If the script is passed into the canary directly, the script code is contained in the value of `Script` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-code
     */
    public code: CfnCanary.CodeProperty | cdk.IResolvable;

    /**
     * The ARN of the IAM role to be used to run the canary. This role must already exist, and must include `lambda.amazonaws.com` as a principal in the trust policy. The role must also have the following permissions:
     *
     * - `s3:PutObject`
     * - `s3:GetBucketLocation`
     * - `s3:ListAllMyBuckets`
     * - `cloudwatch:PutMetricData`
     * - `logs:CreateLogGroup`
     * - `logs:CreateLogStream`
     * - `logs:PutLogEvents`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-executionrolearn
     */
    public executionRoleArn: string;

    /**
     * The name for this canary. Be sure to give it a descriptive name that distinguishes it from other canaries in your account.
     *
     * Do not include secrets or proprietary information in your canary names. The canary name makes up part of the canary ARN, and the ARN is included in outbound calls over the internet. For more information, see [Security Considerations for Synthetics Canaries](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/servicelens_canaries_security.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-name
     */
    public name: string;

    /**
     * Specifies the runtime version to use for the canary. For more information about runtime versions, see [Canary Runtime Versions](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Library.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-runtimeversion
     */
    public runtimeVersion: string;

    /**
     * A structure that contains information about how often the canary is to run, and when these runs are to stop.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-schedule
     */
    public schedule: CfnCanary.ScheduleProperty | cdk.IResolvable;

    /**
     * Specify TRUE to have the canary start making runs immediately after it is created.
     *
     * A canary that you create using CloudFormation can't be used to monitor the CloudFormation stack that creates the canary or to roll back that stack if there is a failure.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-startcanaryaftercreation
     */
    public startCanaryAfterCreation: boolean | cdk.IResolvable;

    /**
     * A structure that contains the configuration for canary artifacts, including the encryption-at-rest settings for artifacts that the canary uploads to Amazon S3.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-artifactconfig
     */
    public artifactConfig: CfnCanary.ArtifactConfigProperty | cdk.IResolvable | undefined;

    /**
     * The number of days to retain data about failed runs of this canary. If you omit this field, the default of 31 days is used. The valid range is 1 to 455 days.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-failureretentionperiod
     */
    public failureRetentionPeriod: number | undefined;

    /**
     * A structure that contains input information for a canary run. If you omit this structure, the frequency of the canary is used as canary's timeout value, up to a maximum of 900 seconds.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-runconfig
     */
    public runConfig: CfnCanary.RunConfigProperty | cdk.IResolvable | undefined;

    /**
     * The number of days to retain data about successful runs of this canary. If you omit this field, the default of 31 days is used. The valid range is 1 to 455 days.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-successretentionperiod
     */
    public successRetentionPeriod: number | undefined;

    /**
     * The list of key-value pairs that are associated with the canary.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * If this canary performs visual monitoring by comparing screenshots, this structure contains the ID of the canary run to use as the baseline for screenshots, and the coordinates of any parts of the screen to ignore during the visual monitoring comparison.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-visualreference
     */
    public visualReference: CfnCanary.VisualReferenceProperty | cdk.IResolvable | undefined;

    /**
     * If this canary is to test an endpoint in a VPC, this structure contains information about the subnet and security groups of the VPC endpoint. For more information, see [Running a Canary in a VPC](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_VPC.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-vpcconfig
     */
    public vpcConfig: CfnCanary.VPCConfigProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::Synthetics::Canary`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnCanaryProps) {
        super(scope, id, { type: CfnCanary.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'artifactS3Location', this);
        cdk.requireProperty(props, 'code', this);
        cdk.requireProperty(props, 'executionRoleArn', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'runtimeVersion', this);
        cdk.requireProperty(props, 'schedule', this);
        cdk.requireProperty(props, 'startCanaryAfterCreation', this);
        this.attrId = cdk.Token.asString(this.getAtt('Id'));
        this.attrState = cdk.Token.asString(this.getAtt('State'));

        this.artifactS3Location = props.artifactS3Location;
        this.code = props.code;
        this.executionRoleArn = props.executionRoleArn;
        this.name = props.name;
        this.runtimeVersion = props.runtimeVersion;
        this.schedule = props.schedule;
        this.startCanaryAfterCreation = props.startCanaryAfterCreation;
        this.artifactConfig = props.artifactConfig;
        this.failureRetentionPeriod = props.failureRetentionPeriod;
        this.runConfig = props.runConfig;
        this.successRetentionPeriod = props.successRetentionPeriod;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Synthetics::Canary", props.tags, { tagPropertyName: 'tags' });
        this.visualReference = props.visualReference;
        this.vpcConfig = props.vpcConfig;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnCanary.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            artifactS3Location: this.artifactS3Location,
            code: this.code,
            executionRoleArn: this.executionRoleArn,
            name: this.name,
            runtimeVersion: this.runtimeVersion,
            schedule: this.schedule,
            startCanaryAfterCreation: this.startCanaryAfterCreation,
            artifactConfig: this.artifactConfig,
            failureRetentionPeriod: this.failureRetentionPeriod,
            runConfig: this.runConfig,
            successRetentionPeriod: this.successRetentionPeriod,
            tags: this.tags.renderTags(),
            visualReference: this.visualReference,
            vpcConfig: this.vpcConfig,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnCanaryPropsToCloudFormation(props);
    }
}

export namespace CfnCanary {
    /**
     * A structure that contains the configuration for canary artifacts, including the encryption-at-rest settings for artifacts that the canary uploads to Amazon S3 .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-artifactconfig.html
     */
    export interface ArtifactConfigProperty {
        /**
         * A structure that contains the configuration of the encryption-at-rest settings for artifacts that the canary uploads to Amazon S3 . Artifact encryption functionality is available only for canaries that use Synthetics runtime version syn-nodejs-puppeteer-3.3 or later. For more information, see [Encrypting canary artifacts](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_artifact_encryption.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-artifactconfig.html#cfn-synthetics-canary-artifactconfig-s3encryption
         */
        readonly s3Encryption?: CfnCanary.S3EncryptionProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ArtifactConfigProperty`
 *
 * @param properties - the TypeScript properties of a `ArtifactConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnCanary_ArtifactConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('s3Encryption', CfnCanary_S3EncryptionPropertyValidator)(properties.s3Encryption));
    return errors.wrap('supplied properties not correct for "ArtifactConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Synthetics::Canary.ArtifactConfig` resource
 *
 * @param properties - the TypeScript properties of a `ArtifactConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Synthetics::Canary.ArtifactConfig` resource.
 */
// @ts-ignore TS6133
function cfnCanaryArtifactConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCanary_ArtifactConfigPropertyValidator(properties).assertSuccess();
    return {
        S3Encryption: cfnCanaryS3EncryptionPropertyToCloudFormation(properties.s3Encryption),
    };
}

// @ts-ignore TS6133
function CfnCanaryArtifactConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCanary.ArtifactConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCanary.ArtifactConfigProperty>();
    ret.addPropertyResult('s3Encryption', 'S3Encryption', properties.S3Encryption != null ? CfnCanaryS3EncryptionPropertyFromCloudFormation(properties.S3Encryption) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCanary {
    /**
     * A structure representing a screenshot that is used as a baseline during visual monitoring comparisons made by the canary.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-basescreenshot.html
     */
    export interface BaseScreenshotProperty {
        /**
         * Coordinates that define the part of a screen to ignore during screenshot comparisons. To obtain the coordinates to use here, use the CloudWatch Logs console to draw the boundaries on the screen. For more information, see {LINK}
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-basescreenshot.html#cfn-synthetics-canary-basescreenshot-ignorecoordinates
         */
        readonly ignoreCoordinates?: string[];
        /**
         * The name of the screenshot. This is generated the first time the canary is run after the `UpdateCanary` operation that specified for this canary to perform visual monitoring.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-basescreenshot.html#cfn-synthetics-canary-basescreenshot-screenshotname
         */
        readonly screenshotName: string;
    }
}

/**
 * Determine whether the given properties match those of a `BaseScreenshotProperty`
 *
 * @param properties - the TypeScript properties of a `BaseScreenshotProperty`
 *
 * @returns the result of the validation.
 */
function CfnCanary_BaseScreenshotPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('ignoreCoordinates', cdk.listValidator(cdk.validateString))(properties.ignoreCoordinates));
    errors.collect(cdk.propertyValidator('screenshotName', cdk.requiredValidator)(properties.screenshotName));
    errors.collect(cdk.propertyValidator('screenshotName', cdk.validateString)(properties.screenshotName));
    return errors.wrap('supplied properties not correct for "BaseScreenshotProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Synthetics::Canary.BaseScreenshot` resource
 *
 * @param properties - the TypeScript properties of a `BaseScreenshotProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Synthetics::Canary.BaseScreenshot` resource.
 */
// @ts-ignore TS6133
function cfnCanaryBaseScreenshotPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCanary_BaseScreenshotPropertyValidator(properties).assertSuccess();
    return {
        IgnoreCoordinates: cdk.listMapper(cdk.stringToCloudFormation)(properties.ignoreCoordinates),
        ScreenshotName: cdk.stringToCloudFormation(properties.screenshotName),
    };
}

// @ts-ignore TS6133
function CfnCanaryBaseScreenshotPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCanary.BaseScreenshotProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCanary.BaseScreenshotProperty>();
    ret.addPropertyResult('ignoreCoordinates', 'IgnoreCoordinates', properties.IgnoreCoordinates != null ? cfn_parse.FromCloudFormation.getStringArray(properties.IgnoreCoordinates) : undefined);
    ret.addPropertyResult('screenshotName', 'ScreenshotName', cfn_parse.FromCloudFormation.getString(properties.ScreenshotName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCanary {
    /**
     * Use this structure to input your script code for the canary. This structure contains the Lambda handler with the location where the canary should start running the script. If the script is stored in an S3 bucket, the bucket name, key, and version are also included. If the script is passed into the canary directly, the script code is contained in the value of `Script` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-code.html
     */
    export interface CodeProperty {
        /**
         * The entry point to use for the source code when running the canary. For canaries that use the `syn-python-selenium-1.0` runtime or a `syn-nodejs.puppeteer` runtime earlier than `syn-nodejs.puppeteer-3.4` , the handler must be specified as `*fileName* .handler` . For `syn-python-selenium-1.1` , `syn-nodejs.puppeteer-3.4` , and later runtimes, the handler can be specified as `*fileName* . *functionName*` , or you can specify a folder where canary scripts reside as `*folder* / *fileName* . *functionName*` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-code.html#cfn-synthetics-canary-code-handler
         */
        readonly handler: string;
        /**
         * If your canary script is located in S3, specify the bucket name here. The bucket must already exist.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-code.html#cfn-synthetics-canary-code-s3bucket
         */
        readonly s3Bucket?: string;
        /**
         * The S3 key of your script. For more information, see [Working with Amazon S3 Objects](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingObjects.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-code.html#cfn-synthetics-canary-code-s3key
         */
        readonly s3Key?: string;
        /**
         * The S3 version ID of your script.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-code.html#cfn-synthetics-canary-code-s3objectversion
         */
        readonly s3ObjectVersion?: string;
        /**
         * If you input your canary script directly into the canary instead of referring to an S3 location, the value of this parameter is the script in plain text. It can be up to 5 MB.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-code.html#cfn-synthetics-canary-code-script
         */
        readonly script?: string;
    }
}

/**
 * Determine whether the given properties match those of a `CodeProperty`
 *
 * @param properties - the TypeScript properties of a `CodeProperty`
 *
 * @returns the result of the validation.
 */
function CfnCanary_CodePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('handler', cdk.requiredValidator)(properties.handler));
    errors.collect(cdk.propertyValidator('handler', cdk.validateString)(properties.handler));
    errors.collect(cdk.propertyValidator('s3Bucket', cdk.validateString)(properties.s3Bucket));
    errors.collect(cdk.propertyValidator('s3Key', cdk.validateString)(properties.s3Key));
    errors.collect(cdk.propertyValidator('s3ObjectVersion', cdk.validateString)(properties.s3ObjectVersion));
    errors.collect(cdk.propertyValidator('script', cdk.validateString)(properties.script));
    return errors.wrap('supplied properties not correct for "CodeProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Synthetics::Canary.Code` resource
 *
 * @param properties - the TypeScript properties of a `CodeProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Synthetics::Canary.Code` resource.
 */
// @ts-ignore TS6133
function cfnCanaryCodePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCanary_CodePropertyValidator(properties).assertSuccess();
    return {
        Handler: cdk.stringToCloudFormation(properties.handler),
        S3Bucket: cdk.stringToCloudFormation(properties.s3Bucket),
        S3Key: cdk.stringToCloudFormation(properties.s3Key),
        S3ObjectVersion: cdk.stringToCloudFormation(properties.s3ObjectVersion),
        Script: cdk.stringToCloudFormation(properties.script),
    };
}

// @ts-ignore TS6133
function CfnCanaryCodePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCanary.CodeProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCanary.CodeProperty>();
    ret.addPropertyResult('handler', 'Handler', cfn_parse.FromCloudFormation.getString(properties.Handler));
    ret.addPropertyResult('s3Bucket', 'S3Bucket', properties.S3Bucket != null ? cfn_parse.FromCloudFormation.getString(properties.S3Bucket) : undefined);
    ret.addPropertyResult('s3Key', 'S3Key', properties.S3Key != null ? cfn_parse.FromCloudFormation.getString(properties.S3Key) : undefined);
    ret.addPropertyResult('s3ObjectVersion', 'S3ObjectVersion', properties.S3ObjectVersion != null ? cfn_parse.FromCloudFormation.getString(properties.S3ObjectVersion) : undefined);
    ret.addPropertyResult('script', 'Script', properties.Script != null ? cfn_parse.FromCloudFormation.getString(properties.Script) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCanary {
    /**
     * A structure that contains input information for a canary run. This structure is required.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-runconfig.html
     */
    export interface RunConfigProperty {
        /**
         * Specifies whether this canary is to use active AWS X-Ray tracing when it runs. Active tracing enables this canary run to be displayed in the ServiceLens and X-Ray service maps even if the canary does not hit an endpoint that has X-Ray tracing enabled. Using X-Ray tracing incurs charges. For more information, see [Canaries and X-Ray tracing](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_tracing.html) .
         *
         * You can enable active tracing only for canaries that use version `syn-nodejs-2.0` or later for their canary runtime.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-runconfig.html#cfn-synthetics-canary-runconfig-activetracing
         */
        readonly activeTracing?: boolean | cdk.IResolvable;
        /**
         * Specifies the keys and values to use for any environment variables used in the canary script. Use the following format:
         *
         * { "key1" : "value1", "key2" : "value2", ...}
         *
         * Keys must start with a letter and be at least two characters. The total size of your environment variables cannot exceed 4 KB. You can't specify any Lambda reserved environment variables as the keys for your environment variables. For more information about reserved keys, see [Runtime environment variables](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-runtime) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-runconfig.html#cfn-synthetics-canary-runconfig-environmentvariables
         */
        readonly environmentVariables?: { [key: string]: (string) } | cdk.IResolvable;
        /**
         * The maximum amount of memory that the canary can use while running. This value must be a multiple of 64. The range is 960 to 3008.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-runconfig.html#cfn-synthetics-canary-runconfig-memoryinmb
         */
        readonly memoryInMb?: number;
        /**
         * How long the canary is allowed to run before it must stop. You can't set this time to be longer than the frequency of the runs of this canary.
         *
         * If you omit this field, the frequency of the canary is used as this value, up to a maximum of 900 seconds.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-runconfig.html#cfn-synthetics-canary-runconfig-timeoutinseconds
         */
        readonly timeoutInSeconds?: number;
    }
}

/**
 * Determine whether the given properties match those of a `RunConfigProperty`
 *
 * @param properties - the TypeScript properties of a `RunConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnCanary_RunConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('activeTracing', cdk.validateBoolean)(properties.activeTracing));
    errors.collect(cdk.propertyValidator('environmentVariables', cdk.hashValidator(cdk.validateString))(properties.environmentVariables));
    errors.collect(cdk.propertyValidator('memoryInMb', cdk.validateNumber)(properties.memoryInMb));
    errors.collect(cdk.propertyValidator('timeoutInSeconds', cdk.validateNumber)(properties.timeoutInSeconds));
    return errors.wrap('supplied properties not correct for "RunConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Synthetics::Canary.RunConfig` resource
 *
 * @param properties - the TypeScript properties of a `RunConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Synthetics::Canary.RunConfig` resource.
 */
// @ts-ignore TS6133
function cfnCanaryRunConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCanary_RunConfigPropertyValidator(properties).assertSuccess();
    return {
        ActiveTracing: cdk.booleanToCloudFormation(properties.activeTracing),
        EnvironmentVariables: cdk.hashMapper(cdk.stringToCloudFormation)(properties.environmentVariables),
        MemoryInMB: cdk.numberToCloudFormation(properties.memoryInMb),
        TimeoutInSeconds: cdk.numberToCloudFormation(properties.timeoutInSeconds),
    };
}

// @ts-ignore TS6133
function CfnCanaryRunConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCanary.RunConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCanary.RunConfigProperty>();
    ret.addPropertyResult('activeTracing', 'ActiveTracing', properties.ActiveTracing != null ? cfn_parse.FromCloudFormation.getBoolean(properties.ActiveTracing) : undefined);
    ret.addPropertyResult('environmentVariables', 'EnvironmentVariables', properties.EnvironmentVariables != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.EnvironmentVariables) : undefined);
    ret.addPropertyResult('memoryInMb', 'MemoryInMB', properties.MemoryInMB != null ? cfn_parse.FromCloudFormation.getNumber(properties.MemoryInMB) : undefined);
    ret.addPropertyResult('timeoutInSeconds', 'TimeoutInSeconds', properties.TimeoutInSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.TimeoutInSeconds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCanary {
    /**
     * A structure that contains the configuration of the encryption-at-rest settings for artifacts that the canary uploads to Amazon S3 . Artifact encryption functionality is available only for canaries that use Synthetics runtime version syn-nodejs-puppeteer-3.3 or later. For more information, see [Encrypting canary artifacts](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_artifact_encryption.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-s3encryption.html
     */
    export interface S3EncryptionProperty {
        /**
         * The encryption method to use for artifacts created by this canary. Specify `SSE_S3` to use server-side encryption (SSE) with an Amazon S3-managed key. Specify `SSE-KMS` to use server-side encryption with a customer-managed AWS KMS key.
         *
         * If you omit this parameter, an AWS -managed AWS KMS key is used.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-s3encryption.html#cfn-synthetics-canary-s3encryption-encryptionmode
         */
        readonly encryptionMode?: string;
        /**
         * The ARN of the customer-managed AWS KMS key to use, if you specify `SSE-KMS` for `EncryptionMode`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-s3encryption.html#cfn-synthetics-canary-s3encryption-kmskeyarn
         */
        readonly kmsKeyArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3EncryptionProperty`
 *
 * @param properties - the TypeScript properties of a `S3EncryptionProperty`
 *
 * @returns the result of the validation.
 */
function CfnCanary_S3EncryptionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('encryptionMode', cdk.validateString)(properties.encryptionMode));
    errors.collect(cdk.propertyValidator('kmsKeyArn', cdk.validateString)(properties.kmsKeyArn));
    return errors.wrap('supplied properties not correct for "S3EncryptionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Synthetics::Canary.S3Encryption` resource
 *
 * @param properties - the TypeScript properties of a `S3EncryptionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Synthetics::Canary.S3Encryption` resource.
 */
// @ts-ignore TS6133
function cfnCanaryS3EncryptionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCanary_S3EncryptionPropertyValidator(properties).assertSuccess();
    return {
        EncryptionMode: cdk.stringToCloudFormation(properties.encryptionMode),
        KmsKeyArn: cdk.stringToCloudFormation(properties.kmsKeyArn),
    };
}

// @ts-ignore TS6133
function CfnCanaryS3EncryptionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCanary.S3EncryptionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCanary.S3EncryptionProperty>();
    ret.addPropertyResult('encryptionMode', 'EncryptionMode', properties.EncryptionMode != null ? cfn_parse.FromCloudFormation.getString(properties.EncryptionMode) : undefined);
    ret.addPropertyResult('kmsKeyArn', 'KmsKeyArn', properties.KmsKeyArn != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCanary {
    /**
     * This structure specifies how often a canary is to make runs and the date and time when it should stop making runs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-schedule.html
     */
    export interface ScheduleProperty {
        /**
         * How long, in seconds, for the canary to continue making regular runs according to the schedule in the `Expression` value. If you specify 0, the canary continues making runs until you stop it. If you omit this field, the default of 0 is used.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-schedule.html#cfn-synthetics-canary-schedule-durationinseconds
         */
        readonly durationInSeconds?: string;
        /**
         * A `rate` expression or a `cron` expression that defines how often the canary is to run.
         *
         * For a rate expression, The syntax is `rate( *number unit* )` . *unit* can be `minute` , `minutes` , or `hour` .
         *
         * For example, `rate(1 minute)` runs the canary once a minute, `rate(10 minutes)` runs it once every 10 minutes, and `rate(1 hour)` runs it once every hour. You can specify a frequency between `rate(1 minute)` and `rate(1 hour)` .
         *
         * Specifying `rate(0 minute)` or `rate(0 hour)` is a special value that causes the canary to run only once when it is started.
         *
         * Use `cron( *expression* )` to specify a cron expression. You can't schedule a canary to wait for more than a year before running. For information about the syntax for cron expressions, see [Scheduling canary runs using cron](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_cron.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-schedule.html#cfn-synthetics-canary-schedule-expression
         */
        readonly expression: string;
    }
}

/**
 * Determine whether the given properties match those of a `ScheduleProperty`
 *
 * @param properties - the TypeScript properties of a `ScheduleProperty`
 *
 * @returns the result of the validation.
 */
function CfnCanary_SchedulePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('durationInSeconds', cdk.validateString)(properties.durationInSeconds));
    errors.collect(cdk.propertyValidator('expression', cdk.requiredValidator)(properties.expression));
    errors.collect(cdk.propertyValidator('expression', cdk.validateString)(properties.expression));
    return errors.wrap('supplied properties not correct for "ScheduleProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Synthetics::Canary.Schedule` resource
 *
 * @param properties - the TypeScript properties of a `ScheduleProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Synthetics::Canary.Schedule` resource.
 */
// @ts-ignore TS6133
function cfnCanarySchedulePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCanary_SchedulePropertyValidator(properties).assertSuccess();
    return {
        DurationInSeconds: cdk.stringToCloudFormation(properties.durationInSeconds),
        Expression: cdk.stringToCloudFormation(properties.expression),
    };
}

// @ts-ignore TS6133
function CfnCanarySchedulePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCanary.ScheduleProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCanary.ScheduleProperty>();
    ret.addPropertyResult('durationInSeconds', 'DurationInSeconds', properties.DurationInSeconds != null ? cfn_parse.FromCloudFormation.getString(properties.DurationInSeconds) : undefined);
    ret.addPropertyResult('expression', 'Expression', cfn_parse.FromCloudFormation.getString(properties.Expression));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCanary {
    /**
     * If this canary is to test an endpoint in a VPC, this structure contains information about the subnet and security groups of the VPC endpoint. For more information, see [Running a Canary in a VPC](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_VPC.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-vpcconfig.html
     */
    export interface VPCConfigProperty {
        /**
         * The IDs of the security groups for this canary.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-vpcconfig.html#cfn-synthetics-canary-vpcconfig-securitygroupids
         */
        readonly securityGroupIds: string[];
        /**
         * The IDs of the subnets where this canary is to run.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-vpcconfig.html#cfn-synthetics-canary-vpcconfig-subnetids
         */
        readonly subnetIds: string[];
        /**
         * The ID of the VPC where this canary is to run.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-vpcconfig.html#cfn-synthetics-canary-vpcconfig-vpcid
         */
        readonly vpcId?: string;
    }
}

/**
 * Determine whether the given properties match those of a `VPCConfigProperty`
 *
 * @param properties - the TypeScript properties of a `VPCConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnCanary_VPCConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.requiredValidator)(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.requiredValidator)(properties.subnetIds));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.listValidator(cdk.validateString))(properties.subnetIds));
    errors.collect(cdk.propertyValidator('vpcId', cdk.validateString)(properties.vpcId));
    return errors.wrap('supplied properties not correct for "VPCConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Synthetics::Canary.VPCConfig` resource
 *
 * @param properties - the TypeScript properties of a `VPCConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Synthetics::Canary.VPCConfig` resource.
 */
// @ts-ignore TS6133
function cfnCanaryVPCConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCanary_VPCConfigPropertyValidator(properties).assertSuccess();
    return {
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        SubnetIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnetIds),
        VpcId: cdk.stringToCloudFormation(properties.vpcId),
    };
}

// @ts-ignore TS6133
function CfnCanaryVPCConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCanary.VPCConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCanary.VPCConfigProperty>();
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds));
    ret.addPropertyResult('subnetIds', 'SubnetIds', cfn_parse.FromCloudFormation.getStringArray(properties.SubnetIds));
    ret.addPropertyResult('vpcId', 'VpcId', properties.VpcId != null ? cfn_parse.FromCloudFormation.getString(properties.VpcId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCanary {
    /**
     * Defines the screenshots to use as the baseline for comparisons during visual monitoring comparisons during future runs of this canary. If you omit this parameter, no changes are made to any baseline screenshots that the canary might be using already.
     *
     * Visual monitoring is supported only on canaries running the *syn-puppeteer-node-3.2* runtime or later. For more information, see [Visual monitoring](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Library_SyntheticsLogger_VisualTesting.html) and [Visual monitoring blueprint](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Blueprints_VisualTesting.html)
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-visualreference.html
     */
    export interface VisualReferenceProperty {
        /**
         * Specifies which canary run to use the screenshots from as the baseline for future visual monitoring with this canary. Valid values are `nextrun` to use the screenshots from the next run after this update is made, `lastrun` to use the screenshots from the most recent run before this update was made, or the value of `Id` in the [CanaryRun](https://docs.aws.amazon.com/AmazonSynthetics/latest/APIReference/API_CanaryRun.html) from any past run of this canary.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-visualreference.html#cfn-synthetics-canary-visualreference-basecanaryrunid
         */
        readonly baseCanaryRunId: string;
        /**
         * An array of screenshots that are used as the baseline for comparisons during visual monitoring.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-synthetics-canary-visualreference.html#cfn-synthetics-canary-visualreference-basescreenshots
         */
        readonly baseScreenshots?: Array<CfnCanary.BaseScreenshotProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `VisualReferenceProperty`
 *
 * @param properties - the TypeScript properties of a `VisualReferenceProperty`
 *
 * @returns the result of the validation.
 */
function CfnCanary_VisualReferencePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('baseCanaryRunId', cdk.requiredValidator)(properties.baseCanaryRunId));
    errors.collect(cdk.propertyValidator('baseCanaryRunId', cdk.validateString)(properties.baseCanaryRunId));
    errors.collect(cdk.propertyValidator('baseScreenshots', cdk.listValidator(CfnCanary_BaseScreenshotPropertyValidator))(properties.baseScreenshots));
    return errors.wrap('supplied properties not correct for "VisualReferenceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Synthetics::Canary.VisualReference` resource
 *
 * @param properties - the TypeScript properties of a `VisualReferenceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Synthetics::Canary.VisualReference` resource.
 */
// @ts-ignore TS6133
function cfnCanaryVisualReferencePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCanary_VisualReferencePropertyValidator(properties).assertSuccess();
    return {
        BaseCanaryRunId: cdk.stringToCloudFormation(properties.baseCanaryRunId),
        BaseScreenshots: cdk.listMapper(cfnCanaryBaseScreenshotPropertyToCloudFormation)(properties.baseScreenshots),
    };
}

// @ts-ignore TS6133
function CfnCanaryVisualReferencePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCanary.VisualReferenceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCanary.VisualReferenceProperty>();
    ret.addPropertyResult('baseCanaryRunId', 'BaseCanaryRunId', cfn_parse.FromCloudFormation.getString(properties.BaseCanaryRunId));
    ret.addPropertyResult('baseScreenshots', 'BaseScreenshots', properties.BaseScreenshots != null ? cfn_parse.FromCloudFormation.getArray(CfnCanaryBaseScreenshotPropertyFromCloudFormation)(properties.BaseScreenshots) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
