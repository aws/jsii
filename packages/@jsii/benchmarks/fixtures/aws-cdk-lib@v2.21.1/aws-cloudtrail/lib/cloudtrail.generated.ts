// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:11:48.817Z","fingerprint":"IQryTs3YDR6YUzDO6+2CB7evcXIdh4r1ZSrlsv+68V8="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnTrail`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html
 */
export interface CfnTrailProps {

    /**
     * Whether the CloudTrail trail is currently logging AWS API calls.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-islogging
     */
    readonly isLogging: boolean | cdk.IResolvable;

    /**
     * Specifies the name of the Amazon S3 bucket designated for publishing log files. See [Amazon S3 Bucket Naming Requirements](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/create_trail_naming_policy.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-s3bucketname
     */
    readonly s3BucketName: string;

    /**
     * Specifies a log group name using an Amazon Resource Name (ARN), a unique identifier that represents the log group to which CloudTrail logs are delivered. Not required unless you specify `CloudWatchLogsRoleArn` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-cloudwatchlogsloggrouparn
     */
    readonly cloudWatchLogsLogGroupArn?: string;

    /**
     * Specifies the role for the CloudWatch Logs endpoint to assume to write to a user's log group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-cloudwatchlogsrolearn
     */
    readonly cloudWatchLogsRoleArn?: string;

    /**
     * Specifies whether log file validation is enabled. The default is false.
     *
     * > When you disable log file integrity validation, the chain of digest files is broken after one hour. CloudTrail does not create digest files for log files that were delivered during a period in which log file integrity validation was disabled. For example, if you enable log file integrity validation at noon on January 1, disable it at noon on January 2, and re-enable it at noon on January 10, digest files will not be created for the log files delivered from noon on January 2 to noon on January 10. The same applies whenever you stop CloudTrail logging or delete a trail.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-enablelogfilevalidation
     */
    readonly enableLogFileValidation?: boolean | cdk.IResolvable;

    /**
     * Use event selectors to further specify the management and data event settings for your trail. By default, trails created without specific event selectors will be configured to log all read and write management events, and no data events. When an event occurs in your account, CloudTrail evaluates the event selector for all trails. For each trail, if the event matches any event selector, the trail processes and logs the event. If the event doesn't match any event selector, the trail doesn't log the event.
     *
     * You can configure up to five event selectors for a trail.
     *
     * You cannot apply both event selectors and advanced event selectors to a trail.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-eventselectors
     */
    readonly eventSelectors?: Array<CfnTrail.EventSelectorProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Specifies whether the trail is publishing events from global services such as IAM to the log files.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-includeglobalserviceevents
     */
    readonly includeGlobalServiceEvents?: boolean | cdk.IResolvable;

    /**
     * Specifies whether a trail has insight types specified in an `InsightSelector` list.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-insightselectors
     */
    readonly insightSelectors?: Array<CfnTrail.InsightSelectorProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Specifies whether the trail applies only to the current region or to all regions. The default is false. If the trail exists only in the current region and this value is set to true, shadow trails (replications of the trail) will be created in the other regions. If the trail exists in all regions and this value is set to false, the trail will remain in the region where it was created, and its shadow trails in other regions will be deleted. As a best practice, consider using trails that log events in all regions.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-ismultiregiontrail
     */
    readonly isMultiRegionTrail?: boolean | cdk.IResolvable;

    /**
     * Specifies whether the trail is created for all accounts in an organization in AWS Organizations , or only for the current AWS account . The default is false, and cannot be true unless the call is made on behalf of an AWS account that is the management account for an organization in AWS Organizations .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-isorganizationtrail
     */
    readonly isOrganizationTrail?: boolean | cdk.IResolvable;

    /**
     * Specifies the AWS KMS key ID to use to encrypt the logs delivered by CloudTrail. The value can be an alias name prefixed by "alias/", a fully specified ARN to an alias, a fully specified ARN to a key, or a globally unique identifier.
     *
     * CloudTrail also supports AWS KMS multi-Region keys. For more information about multi-Region keys, see [Using multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html) in the *AWS Key Management Service Developer Guide* .
     *
     * Examples:
     *
     * - alias/MyAliasName
     * - arn:aws:kms:us-east-2:123456789012:alias/MyAliasName
     * - arn:aws:kms:us-east-2:123456789012:key/12345678-1234-1234-1234-123456789012
     * - 12345678-1234-1234-1234-123456789012
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-kmskeyid
     */
    readonly kmsKeyId?: string;

    /**
     * Specifies the Amazon S3 key prefix that comes after the name of the bucket you have designated for log file delivery. For more information, see [Finding Your CloudTrail Log Files](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-find-log-files.html) . The maximum length is 200 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-s3keyprefix
     */
    readonly s3KeyPrefix?: string;

    /**
     * Specifies the name of the Amazon SNS topic defined for notification of log file delivery. The maximum length is 256 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-snstopicname
     */
    readonly snsTopicName?: string;

    /**
     * A custom set of tags (key-value pairs) for this trail.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * Specifies the name of the trail. The name must meet the following requirements:
     *
     * - Contain only ASCII letters (a-z, A-Z), numbers (0-9), periods (.), underscores (_), or dashes (-)
     * - Start with a letter or number, and end with a letter or number
     * - Be between 3 and 128 characters
     * - Have no adjacent periods, underscores or dashes. Names like `my-_namespace` and `my--namespace` are not valid.
     * - Not be in IP address format (for example, 192.168.5.4)
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-trailname
     */
    readonly trailName?: string;
}

/**
 * Determine whether the given properties match those of a `CfnTrailProps`
 *
 * @param properties - the TypeScript properties of a `CfnTrailProps`
 *
 * @returns the result of the validation.
 */
function CfnTrailPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cloudWatchLogsLogGroupArn', cdk.validateString)(properties.cloudWatchLogsLogGroupArn));
    errors.collect(cdk.propertyValidator('cloudWatchLogsRoleArn', cdk.validateString)(properties.cloudWatchLogsRoleArn));
    errors.collect(cdk.propertyValidator('enableLogFileValidation', cdk.validateBoolean)(properties.enableLogFileValidation));
    errors.collect(cdk.propertyValidator('eventSelectors', cdk.listValidator(CfnTrail_EventSelectorPropertyValidator))(properties.eventSelectors));
    errors.collect(cdk.propertyValidator('includeGlobalServiceEvents', cdk.validateBoolean)(properties.includeGlobalServiceEvents));
    errors.collect(cdk.propertyValidator('insightSelectors', cdk.listValidator(CfnTrail_InsightSelectorPropertyValidator))(properties.insightSelectors));
    errors.collect(cdk.propertyValidator('isLogging', cdk.requiredValidator)(properties.isLogging));
    errors.collect(cdk.propertyValidator('isLogging', cdk.validateBoolean)(properties.isLogging));
    errors.collect(cdk.propertyValidator('isMultiRegionTrail', cdk.validateBoolean)(properties.isMultiRegionTrail));
    errors.collect(cdk.propertyValidator('isOrganizationTrail', cdk.validateBoolean)(properties.isOrganizationTrail));
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('s3BucketName', cdk.requiredValidator)(properties.s3BucketName));
    errors.collect(cdk.propertyValidator('s3BucketName', cdk.validateString)(properties.s3BucketName));
    errors.collect(cdk.propertyValidator('s3KeyPrefix', cdk.validateString)(properties.s3KeyPrefix));
    errors.collect(cdk.propertyValidator('snsTopicName', cdk.validateString)(properties.snsTopicName));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('trailName', cdk.validateString)(properties.trailName));
    return errors.wrap('supplied properties not correct for "CfnTrailProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::CloudTrail::Trail` resource
 *
 * @param properties - the TypeScript properties of a `CfnTrailProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::CloudTrail::Trail` resource.
 */
// @ts-ignore TS6133
function cfnTrailPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTrailPropsValidator(properties).assertSuccess();
    return {
        IsLogging: cdk.booleanToCloudFormation(properties.isLogging),
        S3BucketName: cdk.stringToCloudFormation(properties.s3BucketName),
        CloudWatchLogsLogGroupArn: cdk.stringToCloudFormation(properties.cloudWatchLogsLogGroupArn),
        CloudWatchLogsRoleArn: cdk.stringToCloudFormation(properties.cloudWatchLogsRoleArn),
        EnableLogFileValidation: cdk.booleanToCloudFormation(properties.enableLogFileValidation),
        EventSelectors: cdk.listMapper(cfnTrailEventSelectorPropertyToCloudFormation)(properties.eventSelectors),
        IncludeGlobalServiceEvents: cdk.booleanToCloudFormation(properties.includeGlobalServiceEvents),
        InsightSelectors: cdk.listMapper(cfnTrailInsightSelectorPropertyToCloudFormation)(properties.insightSelectors),
        IsMultiRegionTrail: cdk.booleanToCloudFormation(properties.isMultiRegionTrail),
        IsOrganizationTrail: cdk.booleanToCloudFormation(properties.isOrganizationTrail),
        KMSKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        S3KeyPrefix: cdk.stringToCloudFormation(properties.s3KeyPrefix),
        SnsTopicName: cdk.stringToCloudFormation(properties.snsTopicName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        TrailName: cdk.stringToCloudFormation(properties.trailName),
    };
}

// @ts-ignore TS6133
function CfnTrailPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTrailProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTrailProps>();
    ret.addPropertyResult('isLogging', 'IsLogging', cfn_parse.FromCloudFormation.getBoolean(properties.IsLogging));
    ret.addPropertyResult('s3BucketName', 'S3BucketName', cfn_parse.FromCloudFormation.getString(properties.S3BucketName));
    ret.addPropertyResult('cloudWatchLogsLogGroupArn', 'CloudWatchLogsLogGroupArn', properties.CloudWatchLogsLogGroupArn != null ? cfn_parse.FromCloudFormation.getString(properties.CloudWatchLogsLogGroupArn) : undefined);
    ret.addPropertyResult('cloudWatchLogsRoleArn', 'CloudWatchLogsRoleArn', properties.CloudWatchLogsRoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.CloudWatchLogsRoleArn) : undefined);
    ret.addPropertyResult('enableLogFileValidation', 'EnableLogFileValidation', properties.EnableLogFileValidation != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableLogFileValidation) : undefined);
    ret.addPropertyResult('eventSelectors', 'EventSelectors', properties.EventSelectors != null ? cfn_parse.FromCloudFormation.getArray(CfnTrailEventSelectorPropertyFromCloudFormation)(properties.EventSelectors) : undefined);
    ret.addPropertyResult('includeGlobalServiceEvents', 'IncludeGlobalServiceEvents', properties.IncludeGlobalServiceEvents != null ? cfn_parse.FromCloudFormation.getBoolean(properties.IncludeGlobalServiceEvents) : undefined);
    ret.addPropertyResult('insightSelectors', 'InsightSelectors', properties.InsightSelectors != null ? cfn_parse.FromCloudFormation.getArray(CfnTrailInsightSelectorPropertyFromCloudFormation)(properties.InsightSelectors) : undefined);
    ret.addPropertyResult('isMultiRegionTrail', 'IsMultiRegionTrail', properties.IsMultiRegionTrail != null ? cfn_parse.FromCloudFormation.getBoolean(properties.IsMultiRegionTrail) : undefined);
    ret.addPropertyResult('isOrganizationTrail', 'IsOrganizationTrail', properties.IsOrganizationTrail != null ? cfn_parse.FromCloudFormation.getBoolean(properties.IsOrganizationTrail) : undefined);
    ret.addPropertyResult('kmsKeyId', 'KMSKeyId', properties.KMSKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KMSKeyId) : undefined);
    ret.addPropertyResult('s3KeyPrefix', 'S3KeyPrefix', properties.S3KeyPrefix != null ? cfn_parse.FromCloudFormation.getString(properties.S3KeyPrefix) : undefined);
    ret.addPropertyResult('snsTopicName', 'SnsTopicName', properties.SnsTopicName != null ? cfn_parse.FromCloudFormation.getString(properties.SnsTopicName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('trailName', 'TrailName', properties.TrailName != null ? cfn_parse.FromCloudFormation.getString(properties.TrailName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::CloudTrail::Trail`
 *
 * Creates a trail that specifies the settings for delivery of log data to an Amazon S3 bucket.
 *
 * @cloudformationResource AWS::CloudTrail::Trail
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html
 */
export class CfnTrail extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::CloudTrail::Trail";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnTrail {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnTrailPropsFromCloudFormation(resourceProperties);
        const ret = new CfnTrail(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * `Ref` returns the ARN of the CloudTrail trail, such as `arn:aws:cloudtrail:us-east-2:123456789012:trail/myCloudTrail` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * `Ref` returns the ARN of the Amazon SNS topic that's associated with the CloudTrail trail, such as `arn:aws:sns:us-east-2:123456789012:mySNSTopic` .
     * @cloudformationAttribute SnsTopicArn
     */
    public readonly attrSnsTopicArn: string;

    /**
     * Whether the CloudTrail trail is currently logging AWS API calls.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-islogging
     */
    public isLogging: boolean | cdk.IResolvable;

    /**
     * Specifies the name of the Amazon S3 bucket designated for publishing log files. See [Amazon S3 Bucket Naming Requirements](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/create_trail_naming_policy.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-s3bucketname
     */
    public s3BucketName: string;

    /**
     * Specifies a log group name using an Amazon Resource Name (ARN), a unique identifier that represents the log group to which CloudTrail logs are delivered. Not required unless you specify `CloudWatchLogsRoleArn` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-cloudwatchlogsloggrouparn
     */
    public cloudWatchLogsLogGroupArn: string | undefined;

    /**
     * Specifies the role for the CloudWatch Logs endpoint to assume to write to a user's log group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-cloudwatchlogsrolearn
     */
    public cloudWatchLogsRoleArn: string | undefined;

    /**
     * Specifies whether log file validation is enabled. The default is false.
     *
     * > When you disable log file integrity validation, the chain of digest files is broken after one hour. CloudTrail does not create digest files for log files that were delivered during a period in which log file integrity validation was disabled. For example, if you enable log file integrity validation at noon on January 1, disable it at noon on January 2, and re-enable it at noon on January 10, digest files will not be created for the log files delivered from noon on January 2 to noon on January 10. The same applies whenever you stop CloudTrail logging or delete a trail.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-enablelogfilevalidation
     */
    public enableLogFileValidation: boolean | cdk.IResolvable | undefined;

    /**
     * Use event selectors to further specify the management and data event settings for your trail. By default, trails created without specific event selectors will be configured to log all read and write management events, and no data events. When an event occurs in your account, CloudTrail evaluates the event selector for all trails. For each trail, if the event matches any event selector, the trail processes and logs the event. If the event doesn't match any event selector, the trail doesn't log the event.
     *
     * You can configure up to five event selectors for a trail.
     *
     * You cannot apply both event selectors and advanced event selectors to a trail.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-eventselectors
     */
    public eventSelectors: Array<CfnTrail.EventSelectorProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Specifies whether the trail is publishing events from global services such as IAM to the log files.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-includeglobalserviceevents
     */
    public includeGlobalServiceEvents: boolean | cdk.IResolvable | undefined;

    /**
     * Specifies whether a trail has insight types specified in an `InsightSelector` list.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-insightselectors
     */
    public insightSelectors: Array<CfnTrail.InsightSelectorProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Specifies whether the trail applies only to the current region or to all regions. The default is false. If the trail exists only in the current region and this value is set to true, shadow trails (replications of the trail) will be created in the other regions. If the trail exists in all regions and this value is set to false, the trail will remain in the region where it was created, and its shadow trails in other regions will be deleted. As a best practice, consider using trails that log events in all regions.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-ismultiregiontrail
     */
    public isMultiRegionTrail: boolean | cdk.IResolvable | undefined;

    /**
     * Specifies whether the trail is created for all accounts in an organization in AWS Organizations , or only for the current AWS account . The default is false, and cannot be true unless the call is made on behalf of an AWS account that is the management account for an organization in AWS Organizations .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-isorganizationtrail
     */
    public isOrganizationTrail: boolean | cdk.IResolvable | undefined;

    /**
     * Specifies the AWS KMS key ID to use to encrypt the logs delivered by CloudTrail. The value can be an alias name prefixed by "alias/", a fully specified ARN to an alias, a fully specified ARN to a key, or a globally unique identifier.
     *
     * CloudTrail also supports AWS KMS multi-Region keys. For more information about multi-Region keys, see [Using multi-Region keys](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html) in the *AWS Key Management Service Developer Guide* .
     *
     * Examples:
     *
     * - alias/MyAliasName
     * - arn:aws:kms:us-east-2:123456789012:alias/MyAliasName
     * - arn:aws:kms:us-east-2:123456789012:key/12345678-1234-1234-1234-123456789012
     * - 12345678-1234-1234-1234-123456789012
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-kmskeyid
     */
    public kmsKeyId: string | undefined;

    /**
     * Specifies the Amazon S3 key prefix that comes after the name of the bucket you have designated for log file delivery. For more information, see [Finding Your CloudTrail Log Files](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-find-log-files.html) . The maximum length is 200 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-s3keyprefix
     */
    public s3KeyPrefix: string | undefined;

    /**
     * Specifies the name of the Amazon SNS topic defined for notification of log file delivery. The maximum length is 256 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-snstopicname
     */
    public snsTopicName: string | undefined;

    /**
     * A custom set of tags (key-value pairs) for this trail.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Specifies the name of the trail. The name must meet the following requirements:
     *
     * - Contain only ASCII letters (a-z, A-Z), numbers (0-9), periods (.), underscores (_), or dashes (-)
     * - Start with a letter or number, and end with a letter or number
     * - Be between 3 and 128 characters
     * - Have no adjacent periods, underscores or dashes. Names like `my-_namespace` and `my--namespace` are not valid.
     * - Not be in IP address format (for example, 192.168.5.4)
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudtrail-trail.html#cfn-cloudtrail-trail-trailname
     */
    public trailName: string | undefined;

    /**
     * Create a new `AWS::CloudTrail::Trail`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnTrailProps) {
        super(scope, id, { type: CfnTrail.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'isLogging', this);
        cdk.requireProperty(props, 's3BucketName', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrSnsTopicArn = cdk.Token.asString(this.getAtt('SnsTopicArn'));

        this.isLogging = props.isLogging;
        this.s3BucketName = props.s3BucketName;
        this.cloudWatchLogsLogGroupArn = props.cloudWatchLogsLogGroupArn;
        this.cloudWatchLogsRoleArn = props.cloudWatchLogsRoleArn;
        this.enableLogFileValidation = props.enableLogFileValidation;
        this.eventSelectors = props.eventSelectors;
        this.includeGlobalServiceEvents = props.includeGlobalServiceEvents;
        this.insightSelectors = props.insightSelectors;
        this.isMultiRegionTrail = props.isMultiRegionTrail;
        this.isOrganizationTrail = props.isOrganizationTrail;
        this.kmsKeyId = props.kmsKeyId;
        this.s3KeyPrefix = props.s3KeyPrefix;
        this.snsTopicName = props.snsTopicName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::CloudTrail::Trail", props.tags, { tagPropertyName: 'tags' });
        this.trailName = props.trailName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnTrail.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            isLogging: this.isLogging,
            s3BucketName: this.s3BucketName,
            cloudWatchLogsLogGroupArn: this.cloudWatchLogsLogGroupArn,
            cloudWatchLogsRoleArn: this.cloudWatchLogsRoleArn,
            enableLogFileValidation: this.enableLogFileValidation,
            eventSelectors: this.eventSelectors,
            includeGlobalServiceEvents: this.includeGlobalServiceEvents,
            insightSelectors: this.insightSelectors,
            isMultiRegionTrail: this.isMultiRegionTrail,
            isOrganizationTrail: this.isOrganizationTrail,
            kmsKeyId: this.kmsKeyId,
            s3KeyPrefix: this.s3KeyPrefix,
            snsTopicName: this.snsTopicName,
            tags: this.tags.renderTags(),
            trailName: this.trailName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnTrailPropsToCloudFormation(props);
    }
}

export namespace CfnTrail {
    /**
     * The Amazon S3 buckets, AWS Lambda functions, or Amazon DynamoDB tables that you specify in your event selectors for your trail to log data events. Data events provide information about the resource operations performed on or within a resource itself. These are also known as data plane operations. You can specify up to 250 data resources for a trail.
     *
     * > The total number of allowed data resources is 250. This number can be distributed between 1 and 5 event selectors, but the total cannot exceed 250 across all selectors.
     * >
     * > If you are using advanced event selectors, the maximum total number of values for all conditions, across all advanced event selectors for the trail, is 500.
     *
     * The following example demonstrates how logging works when you configure logging of all data events for an S3 bucket named `bucket-1` . In this example, the CloudTrail user specified an empty prefix, and the option to log both `Read` and `Write` data events.
     *
     * - A user uploads an image file to `bucket-1` .
     * - The `PutObject` API operation is an Amazon S3 object-level API. It is recorded as a data event in CloudTrail. Because the CloudTrail user specified an S3 bucket with an empty prefix, events that occur on any object in that bucket are logged. The trail processes and logs the event.
     * - A user uploads an object to an Amazon S3 bucket named `arn:aws:s3:::bucket-2` .
     * - The `PutObject` API operation occurred for an object in an S3 bucket that the CloudTrail user didn't specify for the trail. The trail doesn’t log the event.
     *
     * The following example demonstrates how logging works when you configure logging of AWS Lambda data events for a Lambda function named *MyLambdaFunction* , but not for all Lambda functions.
     *
     * - A user runs a script that includes a call to the *MyLambdaFunction* function and the *MyOtherLambdaFunction* function.
     * - The `Invoke` API operation on *MyLambdaFunction* is an Lambda API. It is recorded as a data event in CloudTrail. Because the CloudTrail user specified logging data events for *MyLambdaFunction* , any invocations of that function are logged. The trail processes and logs the event.
     * - The `Invoke` API operation on *MyOtherLambdaFunction* is an Lambda API. Because the CloudTrail user did not specify logging data events for all Lambda functions, the `Invoke` operation for *MyOtherLambdaFunction* does not match the function specified for the trail. The trail doesn’t log the event.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudtrail-trail-dataresource.html
     */
    export interface DataResourceProperty {
        /**
         * The resource type in which you want to log data events. You can specify the following *basic* event selector resource types:
         *
         * - `AWS::S3::Object`
         * - `AWS::Lambda::Function`
         * - `AWS::DynamoDB::Table`
         *
         * The following resource types are also availble through *advanced* event selectors. Basic event selector resource types are valid in advanced event selectors, but advanced event selector resource types are not valid in basic event selectors. For more information, see [AdvancedFieldSelector:Field](https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_AdvancedFieldSelector.html#awscloudtrail-Type-AdvancedFieldSelector-Field) .
         *
         * - `AWS::S3Outposts::Object`
         * - `AWS::ManagedBlockchain::Node`
         * - `AWS::S3ObjectLambda::AccessPoint`
         * - `AWS::EC2::Snapshot`
         * - `AWS::S3::AccessPoint`
         * - `AWS::DynamoDB::Stream`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudtrail-trail-dataresource.html#cfn-cloudtrail-trail-dataresource-type
         */
        readonly type: string;
        /**
         * An array of Amazon Resource Name (ARN) strings or partial ARN strings for the specified objects.
         *
         * - To log data events for all objects in all S3 buckets in your AWS account , specify the prefix as `arn:aws:s3:::` .
         *
         * > This also enables logging of data event activity performed by any user or role in your AWS account , even if that activity is performed on a bucket that belongs to another AWS account .
         * - To log data events for all objects in an S3 bucket, specify the bucket and an empty object prefix such as `arn:aws:s3:::bucket-1/` . The trail logs data events for all objects in this S3 bucket.
         * - To log data events for specific objects, specify the S3 bucket and object prefix such as `arn:aws:s3:::bucket-1/example-images` . The trail logs data events for objects in this S3 bucket that match the prefix.
         * - To log data events for all Lambda functions in your AWS account , specify the prefix as `arn:aws:lambda` .
         *
         * > This also enables logging of `Invoke` activity performed by any user or role in your AWS account , even if that activity is performed on a function that belongs to another AWS account .
         * - To log data events for a specific Lambda function, specify the function ARN.
         *
         * > Lambda function ARNs are exact. For example, if you specify a function ARN *arn:aws:lambda:us-west-2:111111111111:function:helloworld* , data events will only be logged for *arn:aws:lambda:us-west-2:111111111111:function:helloworld* . They will not be logged for *arn:aws:lambda:us-west-2:111111111111:function:helloworld2* .
         * - To log data events for all DynamoDB tables in your AWS account , specify the prefix as `arn:aws:dynamodb` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudtrail-trail-dataresource.html#cfn-cloudtrail-trail-dataresource-values
         */
        readonly values?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `DataResourceProperty`
 *
 * @param properties - the TypeScript properties of a `DataResourceProperty`
 *
 * @returns the result of the validation.
 */
function CfnTrail_DataResourcePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    errors.collect(cdk.propertyValidator('values', cdk.listValidator(cdk.validateString))(properties.values));
    return errors.wrap('supplied properties not correct for "DataResourceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::CloudTrail::Trail.DataResource` resource
 *
 * @param properties - the TypeScript properties of a `DataResourceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::CloudTrail::Trail.DataResource` resource.
 */
// @ts-ignore TS6133
function cfnTrailDataResourcePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTrail_DataResourcePropertyValidator(properties).assertSuccess();
    return {
        Type: cdk.stringToCloudFormation(properties.type),
        Values: cdk.listMapper(cdk.stringToCloudFormation)(properties.values),
    };
}

// @ts-ignore TS6133
function CfnTrailDataResourcePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTrail.DataResourceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTrail.DataResourceProperty>();
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addPropertyResult('values', 'Values', properties.Values != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Values) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTrail {
    /**
     * Use event selectors to further specify the management and data event settings for your trail. By default, trails created without specific event selectors will be configured to log all read and write management events, and no data events. When an event occurs in your account, CloudTrail evaluates the event selector for all trails. For each trail, if the event matches any event selector, the trail processes and logs the event. If the event doesn't match any event selector, the trail doesn't log the event.
     *
     * You can configure up to five event selectors for a trail.
     *
     * You cannot apply both event selectors and advanced event selectors to a trail.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudtrail-trail-eventselector.html
     */
    export interface EventSelectorProperty {
        /**
         * CloudTrail supports data event logging for Amazon S3 objects and AWS Lambda functions. You can specify up to 250 resources for an individual event selector, but the total number of data resources cannot exceed 250 across all event selectors in a trail. This limit does not apply if you configure resource logging for all data events.
         *
         * For more information, see [Data Events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-and-data-events-with-cloudtrail.html#logging-data-events) and [Limits in AWS CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/WhatIsCloudTrail-Limits.html) in the *AWS CloudTrail User Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudtrail-trail-eventselector.html#cfn-cloudtrail-trail-eventselector-dataresources
         */
        readonly dataResources?: Array<CfnTrail.DataResourceProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * An optional list of service event sources from which you do not want management events to be logged on your trail. In this release, the list can be empty (disables the filter), or it can filter out AWS Key Management Service or Amazon RDS Data API events by containing `kms.amazonaws.com` or `rdsdata.amazonaws.com` . By default, `ExcludeManagementEventSources` is empty, and AWS KMS and Amazon RDS Data API events are logged to your trail. You can exclude management event sources only in regions that support the event source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudtrail-trail-eventselector.html#cfn-cloudtrail-trail-eventselector-excludemanagementeventsources
         */
        readonly excludeManagementEventSources?: string[];
        /**
         * Specify if you want your event selector to include management events for your trail.
         *
         * For more information, see [Management Events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-and-data-events-with-cloudtrail.html#logging-management-events) in the *AWS CloudTrail User Guide* .
         *
         * By default, the value is `true` .
         *
         * The first copy of management events is free. You are charged for additional copies of management events that you are logging on any subsequent trail in the same region. For more information about CloudTrail pricing, see [AWS CloudTrail Pricing](https://docs.aws.amazon.com/cloudtrail/pricing/) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudtrail-trail-eventselector.html#cfn-cloudtrail-trail-eventselector-includemanagementevents
         */
        readonly includeManagementEvents?: boolean | cdk.IResolvable;
        /**
         * Specify if you want your trail to log read-only events, write-only events, or all. For example, the EC2 `GetConsoleOutput` is a read-only API operation and `RunInstances` is a write-only API operation.
         *
         * By default, the value is `All` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudtrail-trail-eventselector.html#cfn-cloudtrail-trail-eventselector-readwritetype
         */
        readonly readWriteType?: string;
    }
}

/**
 * Determine whether the given properties match those of a `EventSelectorProperty`
 *
 * @param properties - the TypeScript properties of a `EventSelectorProperty`
 *
 * @returns the result of the validation.
 */
function CfnTrail_EventSelectorPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataResources', cdk.listValidator(CfnTrail_DataResourcePropertyValidator))(properties.dataResources));
    errors.collect(cdk.propertyValidator('excludeManagementEventSources', cdk.listValidator(cdk.validateString))(properties.excludeManagementEventSources));
    errors.collect(cdk.propertyValidator('includeManagementEvents', cdk.validateBoolean)(properties.includeManagementEvents));
    errors.collect(cdk.propertyValidator('readWriteType', cdk.validateString)(properties.readWriteType));
    return errors.wrap('supplied properties not correct for "EventSelectorProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::CloudTrail::Trail.EventSelector` resource
 *
 * @param properties - the TypeScript properties of a `EventSelectorProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::CloudTrail::Trail.EventSelector` resource.
 */
// @ts-ignore TS6133
function cfnTrailEventSelectorPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTrail_EventSelectorPropertyValidator(properties).assertSuccess();
    return {
        DataResources: cdk.listMapper(cfnTrailDataResourcePropertyToCloudFormation)(properties.dataResources),
        ExcludeManagementEventSources: cdk.listMapper(cdk.stringToCloudFormation)(properties.excludeManagementEventSources),
        IncludeManagementEvents: cdk.booleanToCloudFormation(properties.includeManagementEvents),
        ReadWriteType: cdk.stringToCloudFormation(properties.readWriteType),
    };
}

// @ts-ignore TS6133
function CfnTrailEventSelectorPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTrail.EventSelectorProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTrail.EventSelectorProperty>();
    ret.addPropertyResult('dataResources', 'DataResources', properties.DataResources != null ? cfn_parse.FromCloudFormation.getArray(CfnTrailDataResourcePropertyFromCloudFormation)(properties.DataResources) : undefined);
    ret.addPropertyResult('excludeManagementEventSources', 'ExcludeManagementEventSources', properties.ExcludeManagementEventSources != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExcludeManagementEventSources) : undefined);
    ret.addPropertyResult('includeManagementEvents', 'IncludeManagementEvents', properties.IncludeManagementEvents != null ? cfn_parse.FromCloudFormation.getBoolean(properties.IncludeManagementEvents) : undefined);
    ret.addPropertyResult('readWriteType', 'ReadWriteType', properties.ReadWriteType != null ? cfn_parse.FromCloudFormation.getString(properties.ReadWriteType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTrail {
    /**
     * A JSON string that contains a list of insight types that are logged on a trail.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudtrail-trail-insightselector.html
     */
    export interface InsightSelectorProperty {
        /**
         * The type of insights to log on a trail. `ApiCallRateInsight` and `ApiErrorRateInsight` are valid insight types.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudtrail-trail-insightselector.html#cfn-cloudtrail-trail-insightselector-insighttype
         */
        readonly insightType?: string;
    }
}

/**
 * Determine whether the given properties match those of a `InsightSelectorProperty`
 *
 * @param properties - the TypeScript properties of a `InsightSelectorProperty`
 *
 * @returns the result of the validation.
 */
function CfnTrail_InsightSelectorPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('insightType', cdk.validateString)(properties.insightType));
    return errors.wrap('supplied properties not correct for "InsightSelectorProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::CloudTrail::Trail.InsightSelector` resource
 *
 * @param properties - the TypeScript properties of a `InsightSelectorProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::CloudTrail::Trail.InsightSelector` resource.
 */
// @ts-ignore TS6133
function cfnTrailInsightSelectorPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTrail_InsightSelectorPropertyValidator(properties).assertSuccess();
    return {
        InsightType: cdk.stringToCloudFormation(properties.insightType),
    };
}

// @ts-ignore TS6133
function CfnTrailInsightSelectorPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTrail.InsightSelectorProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTrail.InsightSelectorProperty>();
    ret.addPropertyResult('insightType', 'InsightType', properties.InsightType != null ? cfn_parse.FromCloudFormation.getString(properties.InsightType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
