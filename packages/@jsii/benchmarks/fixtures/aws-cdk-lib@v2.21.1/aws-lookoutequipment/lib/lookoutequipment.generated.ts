// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.256Z","fingerprint":"YdOAkzYuodhpee6qzmOJO8aIGRL7Y6y00bN2qocFOn0="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnInferenceScheduler`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html
 */
export interface CfnInferenceSchedulerProps {

    /**
     * Specifies configuration information for the input data for the inference scheduler, including delimiter, format, and dataset location.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-datainputconfiguration
     */
    readonly dataInputConfiguration: any | cdk.IResolvable;

    /**
     * Specifies configuration information for the output results for the inference scheduler, including the Amazon S3 location for the output.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-dataoutputconfiguration
     */
    readonly dataOutputConfiguration: any | cdk.IResolvable;

    /**
     * How often data is uploaded to the source S3 bucket for the input data. This value is the length of time between data uploads. For instance, if you select 5 minutes, Amazon Lookout for Equipment will upload the real-time data to the source bucket once every 5 minutes. This frequency also determines how often Amazon Lookout for Equipment starts a scheduled inference on your data. In this example, it starts once every 5 minutes.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-datauploadfrequency
     */
    readonly dataUploadFrequency: string;

    /**
     * The name of the ML model used for the inference scheduler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-modelname
     */
    readonly modelName: string;

    /**
     * The Amazon Resource Name (ARN) of a role with permission to access the data source being used for the inference.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-rolearn
     */
    readonly roleArn: string;

    /**
     * A period of time (in minutes) by which inference on the data is delayed after the data starts. For instance, if an offset delay time of five minutes was selected, inference will not begin on the data until the first data measurement after the five minute mark. For example, if five minutes is selected, the inference scheduler will wake up at the configured frequency with the additional five minute delay time to check the customer S3 bucket. The customer can upload data at the same frequency and they don't need to stop and restart the scheduler when uploading new data.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-datadelayoffsetinminutes
     */
    readonly dataDelayOffsetInMinutes?: number;

    /**
     * The name of the inference scheduler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-inferenceschedulername
     */
    readonly inferenceSchedulerName?: string;

    /**
     * Provides the identifier of the AWS KMS key used to encrypt inference scheduler data by Amazon Lookout for Equipment .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-serversidekmskeyid
     */
    readonly serverSideKmsKeyId?: string;

    /**
     * Any tags associated with the inference scheduler.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnInferenceSchedulerProps`
 *
 * @param properties - the TypeScript properties of a `CfnInferenceSchedulerProps`
 *
 * @returns the result of the validation.
 */
function CfnInferenceSchedulerPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataDelayOffsetInMinutes', cdk.validateNumber)(properties.dataDelayOffsetInMinutes));
    errors.collect(cdk.propertyValidator('dataInputConfiguration', cdk.requiredValidator)(properties.dataInputConfiguration));
    errors.collect(cdk.propertyValidator('dataInputConfiguration', cdk.validateObject)(properties.dataInputConfiguration));
    errors.collect(cdk.propertyValidator('dataOutputConfiguration', cdk.requiredValidator)(properties.dataOutputConfiguration));
    errors.collect(cdk.propertyValidator('dataOutputConfiguration', cdk.validateObject)(properties.dataOutputConfiguration));
    errors.collect(cdk.propertyValidator('dataUploadFrequency', cdk.requiredValidator)(properties.dataUploadFrequency));
    errors.collect(cdk.propertyValidator('dataUploadFrequency', cdk.validateString)(properties.dataUploadFrequency));
    errors.collect(cdk.propertyValidator('inferenceSchedulerName', cdk.validateString)(properties.inferenceSchedulerName));
    errors.collect(cdk.propertyValidator('modelName', cdk.requiredValidator)(properties.modelName));
    errors.collect(cdk.propertyValidator('modelName', cdk.validateString)(properties.modelName));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('serverSideKmsKeyId', cdk.validateString)(properties.serverSideKmsKeyId));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnInferenceSchedulerProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::LookoutEquipment::InferenceScheduler` resource
 *
 * @param properties - the TypeScript properties of a `CfnInferenceSchedulerProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::LookoutEquipment::InferenceScheduler` resource.
 */
// @ts-ignore TS6133
function cfnInferenceSchedulerPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnInferenceSchedulerPropsValidator(properties).assertSuccess();
    return {
        DataInputConfiguration: cdk.objectToCloudFormation(properties.dataInputConfiguration),
        DataOutputConfiguration: cdk.objectToCloudFormation(properties.dataOutputConfiguration),
        DataUploadFrequency: cdk.stringToCloudFormation(properties.dataUploadFrequency),
        ModelName: cdk.stringToCloudFormation(properties.modelName),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        DataDelayOffsetInMinutes: cdk.numberToCloudFormation(properties.dataDelayOffsetInMinutes),
        InferenceSchedulerName: cdk.stringToCloudFormation(properties.inferenceSchedulerName),
        ServerSideKmsKeyId: cdk.stringToCloudFormation(properties.serverSideKmsKeyId),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnInferenceSchedulerPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnInferenceSchedulerProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnInferenceSchedulerProps>();
    ret.addPropertyResult('dataInputConfiguration', 'DataInputConfiguration', cfn_parse.FromCloudFormation.getAny(properties.DataInputConfiguration));
    ret.addPropertyResult('dataOutputConfiguration', 'DataOutputConfiguration', cfn_parse.FromCloudFormation.getAny(properties.DataOutputConfiguration));
    ret.addPropertyResult('dataUploadFrequency', 'DataUploadFrequency', cfn_parse.FromCloudFormation.getString(properties.DataUploadFrequency));
    ret.addPropertyResult('modelName', 'ModelName', cfn_parse.FromCloudFormation.getString(properties.ModelName));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('dataDelayOffsetInMinutes', 'DataDelayOffsetInMinutes', properties.DataDelayOffsetInMinutes != null ? cfn_parse.FromCloudFormation.getNumber(properties.DataDelayOffsetInMinutes) : undefined);
    ret.addPropertyResult('inferenceSchedulerName', 'InferenceSchedulerName', properties.InferenceSchedulerName != null ? cfn_parse.FromCloudFormation.getString(properties.InferenceSchedulerName) : undefined);
    ret.addPropertyResult('serverSideKmsKeyId', 'ServerSideKmsKeyId', properties.ServerSideKmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.ServerSideKmsKeyId) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::LookoutEquipment::InferenceScheduler`
 *
 * Creates a scheduled inference. Scheduling an inference is setting up a continuous real-time inference plan to analyze new measurement data. When setting up the schedule, you provide an Amazon S3 bucket location for the input data, assign it a delimiter between separate entries in the data, set an offset delay if desired, and set the frequency of inferencing. You must also provide an Amazon S3 bucket location for the output data.
 *
 * > Updating some properties below (for example, InferenceSchedulerName and ServerSideKmsKeyId) triggers a resource replacement, which requires a new model. To replace such a property using AWS CloudFormation , but without creating a completely new stack, you must replace ModelName. If you need to replace the property, but want to use the same model, delete the current stack and create a new one with the updated properties.
 *
 * @cloudformationResource AWS::LookoutEquipment::InferenceScheduler
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html
 */
export class CfnInferenceScheduler extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::LookoutEquipment::InferenceScheduler";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnInferenceScheduler {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnInferenceSchedulerPropsFromCloudFormation(resourceProperties);
        const ret = new CfnInferenceScheduler(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the inference scheduler being created.
     * @cloudformationAttribute InferenceSchedulerArn
     */
    public readonly attrInferenceSchedulerArn: string;

    /**
     * Specifies configuration information for the input data for the inference scheduler, including delimiter, format, and dataset location.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-datainputconfiguration
     */
    public dataInputConfiguration: any | cdk.IResolvable;

    /**
     * Specifies configuration information for the output results for the inference scheduler, including the Amazon S3 location for the output.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-dataoutputconfiguration
     */
    public dataOutputConfiguration: any | cdk.IResolvable;

    /**
     * How often data is uploaded to the source S3 bucket for the input data. This value is the length of time between data uploads. For instance, if you select 5 minutes, Amazon Lookout for Equipment will upload the real-time data to the source bucket once every 5 minutes. This frequency also determines how often Amazon Lookout for Equipment starts a scheduled inference on your data. In this example, it starts once every 5 minutes.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-datauploadfrequency
     */
    public dataUploadFrequency: string;

    /**
     * The name of the ML model used for the inference scheduler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-modelname
     */
    public modelName: string;

    /**
     * The Amazon Resource Name (ARN) of a role with permission to access the data source being used for the inference.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-rolearn
     */
    public roleArn: string;

    /**
     * A period of time (in minutes) by which inference on the data is delayed after the data starts. For instance, if an offset delay time of five minutes was selected, inference will not begin on the data until the first data measurement after the five minute mark. For example, if five minutes is selected, the inference scheduler will wake up at the configured frequency with the additional five minute delay time to check the customer S3 bucket. The customer can upload data at the same frequency and they don't need to stop and restart the scheduler when uploading new data.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-datadelayoffsetinminutes
     */
    public dataDelayOffsetInMinutes: number | undefined;

    /**
     * The name of the inference scheduler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-inferenceschedulername
     */
    public inferenceSchedulerName: string | undefined;

    /**
     * Provides the identifier of the AWS KMS key used to encrypt inference scheduler data by Amazon Lookout for Equipment .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-serversidekmskeyid
     */
    public serverSideKmsKeyId: string | undefined;

    /**
     * Any tags associated with the inference scheduler.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutequipment-inferencescheduler.html#cfn-lookoutequipment-inferencescheduler-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::LookoutEquipment::InferenceScheduler`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnInferenceSchedulerProps) {
        super(scope, id, { type: CfnInferenceScheduler.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'dataInputConfiguration', this);
        cdk.requireProperty(props, 'dataOutputConfiguration', this);
        cdk.requireProperty(props, 'dataUploadFrequency', this);
        cdk.requireProperty(props, 'modelName', this);
        cdk.requireProperty(props, 'roleArn', this);
        this.attrInferenceSchedulerArn = cdk.Token.asString(this.getAtt('InferenceSchedulerArn'));

        this.dataInputConfiguration = props.dataInputConfiguration;
        this.dataOutputConfiguration = props.dataOutputConfiguration;
        this.dataUploadFrequency = props.dataUploadFrequency;
        this.modelName = props.modelName;
        this.roleArn = props.roleArn;
        this.dataDelayOffsetInMinutes = props.dataDelayOffsetInMinutes;
        this.inferenceSchedulerName = props.inferenceSchedulerName;
        this.serverSideKmsKeyId = props.serverSideKmsKeyId;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::LookoutEquipment::InferenceScheduler", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnInferenceScheduler.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            dataInputConfiguration: this.dataInputConfiguration,
            dataOutputConfiguration: this.dataOutputConfiguration,
            dataUploadFrequency: this.dataUploadFrequency,
            modelName: this.modelName,
            roleArn: this.roleArn,
            dataDelayOffsetInMinutes: this.dataDelayOffsetInMinutes,
            inferenceSchedulerName: this.inferenceSchedulerName,
            serverSideKmsKeyId: this.serverSideKmsKeyId,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnInferenceSchedulerPropsToCloudFormation(props);
    }
}
