// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:08.817Z","fingerprint":"JR5TewMLPkquoI/2QaT0PDmxjgBol1hmQJWb6WfFXps="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnAlarmModel`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html
 */
export interface CfnAlarmModelProps {

    /**
     * Defines when your alarm is invoked.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-alarmrule
     */
    readonly alarmRule: CfnAlarmModel.AlarmRuleProperty | cdk.IResolvable;

    /**
     * The ARN of the IAM role that allows the alarm to perform actions and access AWS resources. For more information, see [Amazon Resource Names (ARNs)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *AWS General Reference* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-rolearn
     */
    readonly roleArn: string;

    /**
     * Contains the configuration information of alarm state changes.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-alarmcapabilities
     */
    readonly alarmCapabilities?: CfnAlarmModel.AlarmCapabilitiesProperty | cdk.IResolvable;

    /**
     * Contains information about one or more alarm actions.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-alarmeventactions
     */
    readonly alarmEventActions?: CfnAlarmModel.AlarmEventActionsProperty | cdk.IResolvable;

    /**
     * The description of the alarm model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-alarmmodeldescription
     */
    readonly alarmModelDescription?: string;

    /**
     * The name of the alarm model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-alarmmodelname
     */
    readonly alarmModelName?: string;

    /**
     * An input attribute used as a key to create an alarm. AWS IoT Events routes [inputs](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Input.html) associated with this key to the alarm.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-key
     */
    readonly key?: string;

    /**
     * A non-negative integer that reflects the severity level of the alarm.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-severity
     */
    readonly severity?: number;

    /**
     * A list of key-value pairs that contain metadata for the alarm model. The tags help you manage the alarm model. For more information, see [Tagging your AWS IoT Events resources](https://docs.aws.amazon.com/iotevents/latest/developerguide/tagging-iotevents.html) in the *AWS IoT Events Developer Guide* .
     *
     * You can create up to 50 tags for one alarm model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnAlarmModelProps`
 *
 * @param properties - the TypeScript properties of a `CfnAlarmModelProps`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModelPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('alarmCapabilities', CfnAlarmModel_AlarmCapabilitiesPropertyValidator)(properties.alarmCapabilities));
    errors.collect(cdk.propertyValidator('alarmEventActions', CfnAlarmModel_AlarmEventActionsPropertyValidator)(properties.alarmEventActions));
    errors.collect(cdk.propertyValidator('alarmModelDescription', cdk.validateString)(properties.alarmModelDescription));
    errors.collect(cdk.propertyValidator('alarmModelName', cdk.validateString)(properties.alarmModelName));
    errors.collect(cdk.propertyValidator('alarmRule', cdk.requiredValidator)(properties.alarmRule));
    errors.collect(cdk.propertyValidator('alarmRule', CfnAlarmModel_AlarmRulePropertyValidator)(properties.alarmRule));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('severity', cdk.validateNumber)(properties.severity));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnAlarmModelProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel` resource
 *
 * @param properties - the TypeScript properties of a `CfnAlarmModelProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModelPropsValidator(properties).assertSuccess();
    return {
        AlarmRule: cfnAlarmModelAlarmRulePropertyToCloudFormation(properties.alarmRule),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        AlarmCapabilities: cfnAlarmModelAlarmCapabilitiesPropertyToCloudFormation(properties.alarmCapabilities),
        AlarmEventActions: cfnAlarmModelAlarmEventActionsPropertyToCloudFormation(properties.alarmEventActions),
        AlarmModelDescription: cdk.stringToCloudFormation(properties.alarmModelDescription),
        AlarmModelName: cdk.stringToCloudFormation(properties.alarmModelName),
        Key: cdk.stringToCloudFormation(properties.key),
        Severity: cdk.numberToCloudFormation(properties.severity),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModelProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModelProps>();
    ret.addPropertyResult('alarmRule', 'AlarmRule', CfnAlarmModelAlarmRulePropertyFromCloudFormation(properties.AlarmRule));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('alarmCapabilities', 'AlarmCapabilities', properties.AlarmCapabilities != null ? CfnAlarmModelAlarmCapabilitiesPropertyFromCloudFormation(properties.AlarmCapabilities) : undefined);
    ret.addPropertyResult('alarmEventActions', 'AlarmEventActions', properties.AlarmEventActions != null ? CfnAlarmModelAlarmEventActionsPropertyFromCloudFormation(properties.AlarmEventActions) : undefined);
    ret.addPropertyResult('alarmModelDescription', 'AlarmModelDescription', properties.AlarmModelDescription != null ? cfn_parse.FromCloudFormation.getString(properties.AlarmModelDescription) : undefined);
    ret.addPropertyResult('alarmModelName', 'AlarmModelName', properties.AlarmModelName != null ? cfn_parse.FromCloudFormation.getString(properties.AlarmModelName) : undefined);
    ret.addPropertyResult('key', 'Key', properties.Key != null ? cfn_parse.FromCloudFormation.getString(properties.Key) : undefined);
    ret.addPropertyResult('severity', 'Severity', properties.Severity != null ? cfn_parse.FromCloudFormation.getNumber(properties.Severity) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoTEvents::AlarmModel`
 *
 * Represents an alarm model to monitor an AWS IoT Events input attribute. You can use the alarm to get notified when the value is outside a specified range. For more information, see [Create an alarm model](https://docs.aws.amazon.com/iotevents/latest/developerguide/create-alarms.html) in the *AWS IoT Events Developer Guide* .
 *
 * @cloudformationResource AWS::IoTEvents::AlarmModel
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html
 */
export class CfnAlarmModel extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoTEvents::AlarmModel";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAlarmModel {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAlarmModelPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAlarmModel(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Defines when your alarm is invoked.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-alarmrule
     */
    public alarmRule: CfnAlarmModel.AlarmRuleProperty | cdk.IResolvable;

    /**
     * The ARN of the IAM role that allows the alarm to perform actions and access AWS resources. For more information, see [Amazon Resource Names (ARNs)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *AWS General Reference* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-rolearn
     */
    public roleArn: string;

    /**
     * Contains the configuration information of alarm state changes.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-alarmcapabilities
     */
    public alarmCapabilities: CfnAlarmModel.AlarmCapabilitiesProperty | cdk.IResolvable | undefined;

    /**
     * Contains information about one or more alarm actions.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-alarmeventactions
     */
    public alarmEventActions: CfnAlarmModel.AlarmEventActionsProperty | cdk.IResolvable | undefined;

    /**
     * The description of the alarm model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-alarmmodeldescription
     */
    public alarmModelDescription: string | undefined;

    /**
     * The name of the alarm model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-alarmmodelname
     */
    public alarmModelName: string | undefined;

    /**
     * An input attribute used as a key to create an alarm. AWS IoT Events routes [inputs](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Input.html) associated with this key to the alarm.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-key
     */
    public key: string | undefined;

    /**
     * A non-negative integer that reflects the severity level of the alarm.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-severity
     */
    public severity: number | undefined;

    /**
     * A list of key-value pairs that contain metadata for the alarm model. The tags help you manage the alarm model. For more information, see [Tagging your AWS IoT Events resources](https://docs.aws.amazon.com/iotevents/latest/developerguide/tagging-iotevents.html) in the *AWS IoT Events Developer Guide* .
     *
     * You can create up to 50 tags for one alarm model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-alarmmodel.html#cfn-iotevents-alarmmodel-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::IoTEvents::AlarmModel`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAlarmModelProps) {
        super(scope, id, { type: CfnAlarmModel.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'alarmRule', this);
        cdk.requireProperty(props, 'roleArn', this);

        this.alarmRule = props.alarmRule;
        this.roleArn = props.roleArn;
        this.alarmCapabilities = props.alarmCapabilities;
        this.alarmEventActions = props.alarmEventActions;
        this.alarmModelDescription = props.alarmModelDescription;
        this.alarmModelName = props.alarmModelName;
        this.key = props.key;
        this.severity = props.severity;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IoTEvents::AlarmModel", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAlarmModel.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            alarmRule: this.alarmRule,
            roleArn: this.roleArn,
            alarmCapabilities: this.alarmCapabilities,
            alarmEventActions: this.alarmEventActions,
            alarmModelDescription: this.alarmModelDescription,
            alarmModelName: this.alarmModelName,
            key: this.key,
            severity: this.severity,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAlarmModelPropsToCloudFormation(props);
    }
}

export namespace CfnAlarmModel {
    /**
     * Specifies whether to get notified for alarm state changes.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-acknowledgeflow.html
     */
    export interface AcknowledgeFlowProperty {
        /**
         * The value must be `TRUE` or `FALSE` . If `TRUE` , you receive a notification when the alarm state changes. You must choose to acknowledge the notification before the alarm state can return to `NORMAL` . If `FALSE` , you won't receive notifications. The alarm automatically changes to the `NORMAL` state when the input property value returns to the specified range.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-acknowledgeflow.html#cfn-iotevents-alarmmodel-acknowledgeflow-enabled
         */
        readonly enabled?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AcknowledgeFlowProperty`
 *
 * @param properties - the TypeScript properties of a `AcknowledgeFlowProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_AcknowledgeFlowPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    return errors.wrap('supplied properties not correct for "AcknowledgeFlowProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AcknowledgeFlow` resource
 *
 * @param properties - the TypeScript properties of a `AcknowledgeFlowProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AcknowledgeFlow` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelAcknowledgeFlowPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_AcknowledgeFlowPropertyValidator(properties).assertSuccess();
    return {
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelAcknowledgeFlowPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.AcknowledgeFlowProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.AcknowledgeFlowProperty>();
    ret.addPropertyResult('enabled', 'Enabled', properties.Enabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enabled) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Specifies one of the following actions to receive notifications when the alarm state changes.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmaction.html
     */
    export interface AlarmActionProperty {
        /**
         * Defines an action to write to the Amazon DynamoDB table that you created. The standard action payload contains all the information about the detector model instance and the event that triggered the action. You can customize the [payload](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Payload.html) . One column of the DynamoDB table receives all attribute-value pairs in the payload that you specify.
         *
         * You must use expressions for all parameters in `DynamoDBAction` . The expressions accept literals, operators, functions, references, and substitution templates.
         *
         * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `hashKeyType` parameter can be `'STRING'` .
         * - For references, you must specify either variables or input values. For example, the value for the `hashKeyField` parameter can be `$input.GreenhouseInput.name` .
         * - For a substitution template, you must use `${}` , and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates.
         *
         * In the following example, the value for the `hashKeyValue` parameter uses a substitution template.
         *
         * `'${$input.GreenhouseInput.temperature * 6 / 5 + 32} in Fahrenheit'`
         * - For a string concatenation, you must use `+` . A string concatenation can also contain a combination of literals, operators, functions, references, and substitution templates.
         *
         * In the following example, the value for the `tableName` parameter uses a string concatenation.
         *
         * `'GreenhouseTemperatureTable ' + $input.GreenhouseInput.date`
         *
         * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
         *
         * If the defined payload type is a string, `DynamoDBAction` writes non-JSON data to the DynamoDB table as binary data. The DynamoDB console displays the data as Base64-encoded text. The value for the `payloadField` parameter is `<payload-field>_raw` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmaction.html#cfn-iotevents-alarmmodel-alarmaction-dynamodb
         */
        readonly dynamoDb?: CfnAlarmModel.DynamoDBProperty | cdk.IResolvable;
        /**
         * Defines an action to write to the Amazon DynamoDB table that you created. The default action payload contains all the information about the detector model instance and the event that triggered the action. You can customize the [payload](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Payload.html) . A separate column of the DynamoDB table receives one attribute-value pair in the payload that you specify.
         *
         * You must use expressions for all parameters in `DynamoDBv2Action` . The expressions accept literals, operators, functions, references, and substitution templates.
         *
         * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `tableName` parameter can be `'GreenhouseTemperatureTable'` .
         * - For references, you must specify either variables or input values. For example, the value for the `tableName` parameter can be `$variable.ddbtableName` .
         * - For a substitution template, you must use `${}` , and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates.
         *
         * In the following example, the value for the `contentExpression` parameter in `Payload` uses a substitution template.
         *
         * `'{\"sensorID\": \"${$input.GreenhouseInput.sensor_id}\", \"temperature\": \"${$input.GreenhouseInput.temperature * 9 / 5 + 32}\"}'`
         * - For a string concatenation, you must use `+` . A string concatenation can also contain a combination of literals, operators, functions, references, and substitution templates.
         *
         * In the following example, the value for the `tableName` parameter uses a string concatenation.
         *
         * `'GreenhouseTemperatureTable ' + $input.GreenhouseInput.date`
         *
         * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
         *
         * The value for the `type` parameter in `Payload` must be `JSON` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmaction.html#cfn-iotevents-alarmmodel-alarmaction-dynamodbv2
         */
        readonly dynamoDBv2?: CfnAlarmModel.DynamoDBv2Property | cdk.IResolvable;
        /**
         * Sends information about the detector model instance and the event that triggered the action to an Amazon Kinesis Data Firehose delivery stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmaction.html#cfn-iotevents-alarmmodel-alarmaction-firehose
         */
        readonly firehose?: CfnAlarmModel.FirehoseProperty | cdk.IResolvable;
        /**
         * Sends an AWS IoT Events input, passing in information about the detector model instance and the event that triggered the action.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmaction.html#cfn-iotevents-alarmmodel-alarmaction-iotevents
         */
        readonly iotEvents?: CfnAlarmModel.IotEventsProperty | cdk.IResolvable;
        /**
         * Sends information about the detector model instance and the event that triggered the action to a specified asset property in AWS IoT SiteWise .
         *
         * You must use expressions for all parameters in `IotSiteWiseAction` . The expressions accept literals, operators, functions, references, and substitutions templates.
         *
         * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `propertyAlias` parameter can be `'/company/windfarm/3/turbine/7/temperature'` .
         * - For references, you must specify either variables or input values. For example, the value for the `assetId` parameter can be `$input.TurbineInput.assetId1` .
         * - For a substitution template, you must use `${}` , and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates.
         *
         * In the following example, the value for the `propertyAlias` parameter uses a substitution template.
         *
         * `'company/windfarm/${$input.TemperatureInput.sensorData.windfarmID}/turbine/ ${$input.TemperatureInput.sensorData.turbineID}/temperature'`
         *
         * You must specify either `propertyAlias` or both `assetId` and `propertyId` to identify the target asset property in AWS IoT SiteWise .
         *
         * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmaction.html#cfn-iotevents-alarmmodel-alarmaction-iotsitewise
         */
        readonly iotSiteWise?: CfnAlarmModel.IotSiteWiseProperty | cdk.IResolvable;
        /**
         * Information required to publish the MQTT message through the AWS IoT message broker.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmaction.html#cfn-iotevents-alarmmodel-alarmaction-iottopicpublish
         */
        readonly iotTopicPublish?: CfnAlarmModel.IotTopicPublishProperty | cdk.IResolvable;
        /**
         * Calls a Lambda function, passing in information about the detector model instance and the event that triggered the action.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmaction.html#cfn-iotevents-alarmmodel-alarmaction-lambda
         */
        readonly lambda?: CfnAlarmModel.LambdaProperty | cdk.IResolvable;
        /**
         * `CfnAlarmModel.AlarmActionProperty.Sns`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmaction.html#cfn-iotevents-alarmmodel-alarmaction-sns
         */
        readonly sns?: CfnAlarmModel.SnsProperty | cdk.IResolvable;
        /**
         * Sends information about the detector model instance and the event that triggered the action to an Amazon SQS queue.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmaction.html#cfn-iotevents-alarmmodel-alarmaction-sqs
         */
        readonly sqs?: CfnAlarmModel.SqsProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AlarmActionProperty`
 *
 * @param properties - the TypeScript properties of a `AlarmActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_AlarmActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dynamoDb', CfnAlarmModel_DynamoDBPropertyValidator)(properties.dynamoDb));
    errors.collect(cdk.propertyValidator('dynamoDBv2', CfnAlarmModel_DynamoDBv2PropertyValidator)(properties.dynamoDBv2));
    errors.collect(cdk.propertyValidator('firehose', CfnAlarmModel_FirehosePropertyValidator)(properties.firehose));
    errors.collect(cdk.propertyValidator('iotEvents', CfnAlarmModel_IotEventsPropertyValidator)(properties.iotEvents));
    errors.collect(cdk.propertyValidator('iotSiteWise', CfnAlarmModel_IotSiteWisePropertyValidator)(properties.iotSiteWise));
    errors.collect(cdk.propertyValidator('iotTopicPublish', CfnAlarmModel_IotTopicPublishPropertyValidator)(properties.iotTopicPublish));
    errors.collect(cdk.propertyValidator('lambda', CfnAlarmModel_LambdaPropertyValidator)(properties.lambda));
    errors.collect(cdk.propertyValidator('sns', CfnAlarmModel_SnsPropertyValidator)(properties.sns));
    errors.collect(cdk.propertyValidator('sqs', CfnAlarmModel_SqsPropertyValidator)(properties.sqs));
    return errors.wrap('supplied properties not correct for "AlarmActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AlarmAction` resource
 *
 * @param properties - the TypeScript properties of a `AlarmActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AlarmAction` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelAlarmActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_AlarmActionPropertyValidator(properties).assertSuccess();
    return {
        DynamoDB: cfnAlarmModelDynamoDBPropertyToCloudFormation(properties.dynamoDb),
        DynamoDBv2: cfnAlarmModelDynamoDBv2PropertyToCloudFormation(properties.dynamoDBv2),
        Firehose: cfnAlarmModelFirehosePropertyToCloudFormation(properties.firehose),
        IotEvents: cfnAlarmModelIotEventsPropertyToCloudFormation(properties.iotEvents),
        IotSiteWise: cfnAlarmModelIotSiteWisePropertyToCloudFormation(properties.iotSiteWise),
        IotTopicPublish: cfnAlarmModelIotTopicPublishPropertyToCloudFormation(properties.iotTopicPublish),
        Lambda: cfnAlarmModelLambdaPropertyToCloudFormation(properties.lambda),
        Sns: cfnAlarmModelSnsPropertyToCloudFormation(properties.sns),
        Sqs: cfnAlarmModelSqsPropertyToCloudFormation(properties.sqs),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelAlarmActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.AlarmActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.AlarmActionProperty>();
    ret.addPropertyResult('dynamoDb', 'DynamoDB', properties.DynamoDB != null ? CfnAlarmModelDynamoDBPropertyFromCloudFormation(properties.DynamoDB) : undefined);
    ret.addPropertyResult('dynamoDBv2', 'DynamoDBv2', properties.DynamoDBv2 != null ? CfnAlarmModelDynamoDBv2PropertyFromCloudFormation(properties.DynamoDBv2) : undefined);
    ret.addPropertyResult('firehose', 'Firehose', properties.Firehose != null ? CfnAlarmModelFirehosePropertyFromCloudFormation(properties.Firehose) : undefined);
    ret.addPropertyResult('iotEvents', 'IotEvents', properties.IotEvents != null ? CfnAlarmModelIotEventsPropertyFromCloudFormation(properties.IotEvents) : undefined);
    ret.addPropertyResult('iotSiteWise', 'IotSiteWise', properties.IotSiteWise != null ? CfnAlarmModelIotSiteWisePropertyFromCloudFormation(properties.IotSiteWise) : undefined);
    ret.addPropertyResult('iotTopicPublish', 'IotTopicPublish', properties.IotTopicPublish != null ? CfnAlarmModelIotTopicPublishPropertyFromCloudFormation(properties.IotTopicPublish) : undefined);
    ret.addPropertyResult('lambda', 'Lambda', properties.Lambda != null ? CfnAlarmModelLambdaPropertyFromCloudFormation(properties.Lambda) : undefined);
    ret.addPropertyResult('sns', 'Sns', properties.Sns != null ? CfnAlarmModelSnsPropertyFromCloudFormation(properties.Sns) : undefined);
    ret.addPropertyResult('sqs', 'Sqs', properties.Sqs != null ? CfnAlarmModelSqsPropertyFromCloudFormation(properties.Sqs) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Contains the configuration information of alarm state changes.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmcapabilities.html
     */
    export interface AlarmCapabilitiesProperty {
        /**
         * Specifies whether to get notified for alarm state changes.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmcapabilities.html#cfn-iotevents-alarmmodel-alarmcapabilities-acknowledgeflow
         */
        readonly acknowledgeFlow?: CfnAlarmModel.AcknowledgeFlowProperty | cdk.IResolvable;
        /**
         * Specifies the default alarm state. The configuration applies to all alarms that were created based on this alarm model.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmcapabilities.html#cfn-iotevents-alarmmodel-alarmcapabilities-initializationconfiguration
         */
        readonly initializationConfiguration?: CfnAlarmModel.InitializationConfigurationProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AlarmCapabilitiesProperty`
 *
 * @param properties - the TypeScript properties of a `AlarmCapabilitiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_AlarmCapabilitiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('acknowledgeFlow', CfnAlarmModel_AcknowledgeFlowPropertyValidator)(properties.acknowledgeFlow));
    errors.collect(cdk.propertyValidator('initializationConfiguration', CfnAlarmModel_InitializationConfigurationPropertyValidator)(properties.initializationConfiguration));
    return errors.wrap('supplied properties not correct for "AlarmCapabilitiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AlarmCapabilities` resource
 *
 * @param properties - the TypeScript properties of a `AlarmCapabilitiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AlarmCapabilities` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelAlarmCapabilitiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_AlarmCapabilitiesPropertyValidator(properties).assertSuccess();
    return {
        AcknowledgeFlow: cfnAlarmModelAcknowledgeFlowPropertyToCloudFormation(properties.acknowledgeFlow),
        InitializationConfiguration: cfnAlarmModelInitializationConfigurationPropertyToCloudFormation(properties.initializationConfiguration),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelAlarmCapabilitiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.AlarmCapabilitiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.AlarmCapabilitiesProperty>();
    ret.addPropertyResult('acknowledgeFlow', 'AcknowledgeFlow', properties.AcknowledgeFlow != null ? CfnAlarmModelAcknowledgeFlowPropertyFromCloudFormation(properties.AcknowledgeFlow) : undefined);
    ret.addPropertyResult('initializationConfiguration', 'InitializationConfiguration', properties.InitializationConfiguration != null ? CfnAlarmModelInitializationConfigurationPropertyFromCloudFormation(properties.InitializationConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Contains information about one or more alarm actions.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmeventactions.html
     */
    export interface AlarmEventActionsProperty {
        /**
         * Specifies one or more supported actions to receive notifications when the alarm state changes.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmeventactions.html#cfn-iotevents-alarmmodel-alarmeventactions-alarmactions
         */
        readonly alarmActions?: Array<CfnAlarmModel.AlarmActionProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AlarmEventActionsProperty`
 *
 * @param properties - the TypeScript properties of a `AlarmEventActionsProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_AlarmEventActionsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('alarmActions', cdk.listValidator(CfnAlarmModel_AlarmActionPropertyValidator))(properties.alarmActions));
    return errors.wrap('supplied properties not correct for "AlarmEventActionsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AlarmEventActions` resource
 *
 * @param properties - the TypeScript properties of a `AlarmEventActionsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AlarmEventActions` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelAlarmEventActionsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_AlarmEventActionsPropertyValidator(properties).assertSuccess();
    return {
        AlarmActions: cdk.listMapper(cfnAlarmModelAlarmActionPropertyToCloudFormation)(properties.alarmActions),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelAlarmEventActionsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.AlarmEventActionsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.AlarmEventActionsProperty>();
    ret.addPropertyResult('alarmActions', 'AlarmActions', properties.AlarmActions != null ? cfn_parse.FromCloudFormation.getArray(CfnAlarmModelAlarmActionPropertyFromCloudFormation)(properties.AlarmActions) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Defines when your alarm is invoked.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmrule.html
     */
    export interface AlarmRuleProperty {
        /**
         * A rule that compares an input property value to a threshold value with a comparison operator.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-alarmrule.html#cfn-iotevents-alarmmodel-alarmrule-simplerule
         */
        readonly simpleRule?: CfnAlarmModel.SimpleRuleProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AlarmRuleProperty`
 *
 * @param properties - the TypeScript properties of a `AlarmRuleProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_AlarmRulePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('simpleRule', CfnAlarmModel_SimpleRulePropertyValidator)(properties.simpleRule));
    return errors.wrap('supplied properties not correct for "AlarmRuleProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AlarmRule` resource
 *
 * @param properties - the TypeScript properties of a `AlarmRuleProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AlarmRule` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelAlarmRulePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_AlarmRulePropertyValidator(properties).assertSuccess();
    return {
        SimpleRule: cfnAlarmModelSimpleRulePropertyToCloudFormation(properties.simpleRule),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelAlarmRulePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.AlarmRuleProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.AlarmRuleProperty>();
    ret.addPropertyResult('simpleRule', 'SimpleRule', properties.SimpleRule != null ? CfnAlarmModelSimpleRulePropertyFromCloudFormation(properties.SimpleRule) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * A structure that contains timestamp information. For more information, see [TimeInNanos](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_TimeInNanos.html) in the *AWS IoT SiteWise API Reference* .
     *
     * You must use expressions for all parameters in `AssetPropertyTimestamp` . The expressions accept literals, operators, functions, references, and substitution templates.
     *
     * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `timeInSeconds` parameter can be `'1586400675'` .
     * - For references, you must specify either variables or input values. For example, the value for the `offsetInNanos` parameter can be `$variable.time` .
     * - For a substitution template, you must use `${}` , and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates.
     *
     * In the following example, the value for the `timeInSeconds` parameter uses a substitution template.
     *
     * `'${$input.TemperatureInput.sensorData.timestamp / 1000}'`
     *
     * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-assetpropertytimestamp.html
     */
    export interface AssetPropertyTimestampProperty {
        /**
         * The nanosecond offset converted from `timeInSeconds` . The valid range is between 0-999999999.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-assetpropertytimestamp.html#cfn-iotevents-alarmmodel-assetpropertytimestamp-offsetinnanos
         */
        readonly offsetInNanos?: string;
        /**
         * The timestamp, in seconds, in the Unix epoch format. The valid range is between 1-31556889864403199.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-assetpropertytimestamp.html#cfn-iotevents-alarmmodel-assetpropertytimestamp-timeinseconds
         */
        readonly timeInSeconds: string;
    }
}

/**
 * Determine whether the given properties match those of a `AssetPropertyTimestampProperty`
 *
 * @param properties - the TypeScript properties of a `AssetPropertyTimestampProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_AssetPropertyTimestampPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('offsetInNanos', cdk.validateString)(properties.offsetInNanos));
    errors.collect(cdk.propertyValidator('timeInSeconds', cdk.requiredValidator)(properties.timeInSeconds));
    errors.collect(cdk.propertyValidator('timeInSeconds', cdk.validateString)(properties.timeInSeconds));
    return errors.wrap('supplied properties not correct for "AssetPropertyTimestampProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AssetPropertyTimestamp` resource
 *
 * @param properties - the TypeScript properties of a `AssetPropertyTimestampProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AssetPropertyTimestamp` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelAssetPropertyTimestampPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_AssetPropertyTimestampPropertyValidator(properties).assertSuccess();
    return {
        OffsetInNanos: cdk.stringToCloudFormation(properties.offsetInNanos),
        TimeInSeconds: cdk.stringToCloudFormation(properties.timeInSeconds),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelAssetPropertyTimestampPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.AssetPropertyTimestampProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.AssetPropertyTimestampProperty>();
    ret.addPropertyResult('offsetInNanos', 'OffsetInNanos', properties.OffsetInNanos != null ? cfn_parse.FromCloudFormation.getString(properties.OffsetInNanos) : undefined);
    ret.addPropertyResult('timeInSeconds', 'TimeInSeconds', cfn_parse.FromCloudFormation.getString(properties.TimeInSeconds));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * A structure that contains value information. For more information, see [AssetPropertyValue](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_AssetPropertyValue.html) in the *AWS IoT SiteWise API Reference* .
     *
     * You must use expressions for all parameters in `AssetPropertyValue` . The expressions accept literals, operators, functions, references, and substitution templates.
     *
     * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `quality` parameter can be `'GOOD'` .
     * - For references, you must specify either variables or input values. For example, the value for the `quality` parameter can be `$input.TemperatureInput.sensorData.quality` .
     *
     * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-assetpropertyvalue.html
     */
    export interface AssetPropertyValueProperty {
        /**
         * The quality of the asset property value. The value must be `'GOOD'` , `'BAD'` , or `'UNCERTAIN'` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-assetpropertyvalue.html#cfn-iotevents-alarmmodel-assetpropertyvalue-quality
         */
        readonly quality?: string;
        /**
         * The timestamp associated with the asset property value. The default is the current event time.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-assetpropertyvalue.html#cfn-iotevents-alarmmodel-assetpropertyvalue-timestamp
         */
        readonly timestamp?: CfnAlarmModel.AssetPropertyTimestampProperty | cdk.IResolvable;
        /**
         * The value to send to an asset property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-assetpropertyvalue.html#cfn-iotevents-alarmmodel-assetpropertyvalue-value
         */
        readonly value: CfnAlarmModel.AssetPropertyVariantProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AssetPropertyValueProperty`
 *
 * @param properties - the TypeScript properties of a `AssetPropertyValueProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_AssetPropertyValuePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('quality', cdk.validateString)(properties.quality));
    errors.collect(cdk.propertyValidator('timestamp', CfnAlarmModel_AssetPropertyTimestampPropertyValidator)(properties.timestamp));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', CfnAlarmModel_AssetPropertyVariantPropertyValidator)(properties.value));
    return errors.wrap('supplied properties not correct for "AssetPropertyValueProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AssetPropertyValue` resource
 *
 * @param properties - the TypeScript properties of a `AssetPropertyValueProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AssetPropertyValue` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelAssetPropertyValuePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_AssetPropertyValuePropertyValidator(properties).assertSuccess();
    return {
        Quality: cdk.stringToCloudFormation(properties.quality),
        Timestamp: cfnAlarmModelAssetPropertyTimestampPropertyToCloudFormation(properties.timestamp),
        Value: cfnAlarmModelAssetPropertyVariantPropertyToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelAssetPropertyValuePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.AssetPropertyValueProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.AssetPropertyValueProperty>();
    ret.addPropertyResult('quality', 'Quality', properties.Quality != null ? cfn_parse.FromCloudFormation.getString(properties.Quality) : undefined);
    ret.addPropertyResult('timestamp', 'Timestamp', properties.Timestamp != null ? CfnAlarmModelAssetPropertyTimestampPropertyFromCloudFormation(properties.Timestamp) : undefined);
    ret.addPropertyResult('value', 'Value', CfnAlarmModelAssetPropertyVariantPropertyFromCloudFormation(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * A structure that contains an asset property value. For more information, see [Variant](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_Variant.html) in the *AWS IoT SiteWise API Reference* .
     *
     * You must use expressions for all parameters in `AssetPropertyVariant` . The expressions accept literals, operators, functions, references, and substitution templates.
     *
     * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `integerValue` parameter can be `'100'` .
     * - For references, you must specify either variables or parameters. For example, the value for the `booleanValue` parameter can be `$variable.offline` .
     * - For a substitution template, you must use `${}` , and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates.
     *
     * In the following example, the value for the `doubleValue` parameter uses a substitution template.
     *
     * `'${$input.TemperatureInput.sensorData.temperature * 6 / 5 + 32}'`
     *
     * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
     *
     * You must specify one of the following value types, depending on the `dataType` of the specified asset property. For more information, see [AssetProperty](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_AssetProperty.html) in the *AWS IoT SiteWise API Reference* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-assetpropertyvariant.html
     */
    export interface AssetPropertyVariantProperty {
        /**
         * The asset property value is a Boolean value that must be `'TRUE'` or `'FALSE'` . You must use an expression, and the evaluated result should be a Boolean value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-assetpropertyvariant.html#cfn-iotevents-alarmmodel-assetpropertyvariant-booleanvalue
         */
        readonly booleanValue?: string;
        /**
         * The asset property value is a double. You must use an expression, and the evaluated result should be a double.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-assetpropertyvariant.html#cfn-iotevents-alarmmodel-assetpropertyvariant-doublevalue
         */
        readonly doubleValue?: string;
        /**
         * The asset property value is an integer. You must use an expression, and the evaluated result should be an integer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-assetpropertyvariant.html#cfn-iotevents-alarmmodel-assetpropertyvariant-integervalue
         */
        readonly integerValue?: string;
        /**
         * The asset property value is a string. You must use an expression, and the evaluated result should be a string.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-assetpropertyvariant.html#cfn-iotevents-alarmmodel-assetpropertyvariant-stringvalue
         */
        readonly stringValue?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AssetPropertyVariantProperty`
 *
 * @param properties - the TypeScript properties of a `AssetPropertyVariantProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_AssetPropertyVariantPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('booleanValue', cdk.validateString)(properties.booleanValue));
    errors.collect(cdk.propertyValidator('doubleValue', cdk.validateString)(properties.doubleValue));
    errors.collect(cdk.propertyValidator('integerValue', cdk.validateString)(properties.integerValue));
    errors.collect(cdk.propertyValidator('stringValue', cdk.validateString)(properties.stringValue));
    return errors.wrap('supplied properties not correct for "AssetPropertyVariantProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AssetPropertyVariant` resource
 *
 * @param properties - the TypeScript properties of a `AssetPropertyVariantProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.AssetPropertyVariant` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelAssetPropertyVariantPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_AssetPropertyVariantPropertyValidator(properties).assertSuccess();
    return {
        BooleanValue: cdk.stringToCloudFormation(properties.booleanValue),
        DoubleValue: cdk.stringToCloudFormation(properties.doubleValue),
        IntegerValue: cdk.stringToCloudFormation(properties.integerValue),
        StringValue: cdk.stringToCloudFormation(properties.stringValue),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelAssetPropertyVariantPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.AssetPropertyVariantProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.AssetPropertyVariantProperty>();
    ret.addPropertyResult('booleanValue', 'BooleanValue', properties.BooleanValue != null ? cfn_parse.FromCloudFormation.getString(properties.BooleanValue) : undefined);
    ret.addPropertyResult('doubleValue', 'DoubleValue', properties.DoubleValue != null ? cfn_parse.FromCloudFormation.getString(properties.DoubleValue) : undefined);
    ret.addPropertyResult('integerValue', 'IntegerValue', properties.IntegerValue != null ? cfn_parse.FromCloudFormation.getString(properties.IntegerValue) : undefined);
    ret.addPropertyResult('stringValue', 'StringValue', properties.StringValue != null ? cfn_parse.FromCloudFormation.getString(properties.StringValue) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Defines an action to write to the Amazon DynamoDB table that you created. The standard action payload contains all the information about the detector model instance and the event that triggered the action. You can customize the [payload](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Payload.html) . One column of the DynamoDB table receives all attribute-value pairs in the payload that you specify.
     *
     * You must use expressions for all parameters in `DynamoDBAction` . The expressions accept literals, operators, functions, references, and substitution templates.
     *
     * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `hashKeyType` parameter can be `'STRING'` .
     * - For references, you must specify either variables or input values. For example, the value for the `hashKeyField` parameter can be `$input.GreenhouseInput.name` .
     * - For a substitution template, you must use `${}` , and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates.
     *
     * In the following example, the value for the `hashKeyValue` parameter uses a substitution template.
     *
     * `'${$input.GreenhouseInput.temperature * 6 / 5 + 32} in Fahrenheit'`
     * - For a string concatenation, you must use `+` . A string concatenation can also contain a combination of literals, operators, functions, references, and substitution templates.
     *
     * In the following example, the value for the `tableName` parameter uses a string concatenation.
     *
     * `'GreenhouseTemperatureTable ' + $input.GreenhouseInput.date`
     *
     * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
     *
     * If the defined payload type is a string, `DynamoDBAction` writes non-JSON data to the DynamoDB table as binary data. The DynamoDB console displays the data as Base64-encoded text. The value for the `payloadField` parameter is `<payload-field>_raw` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-dynamodb.html
     */
    export interface DynamoDBProperty {
        /**
         * The name of the hash key (also called the partition key). The `hashKeyField` value must match the partition key of the target DynamoDB table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-dynamodb.html#cfn-iotevents-alarmmodel-dynamodb-hashkeyfield
         */
        readonly hashKeyField: string;
        /**
         * The data type for the hash key (also called the partition key). You can specify the following values:
         *
         * - `'STRING'` - The hash key is a string.
         * - `'NUMBER'` - The hash key is a number.
         *
         * If you don't specify `hashKeyType` , the default value is `'STRING'` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-dynamodb.html#cfn-iotevents-alarmmodel-dynamodb-hashkeytype
         */
        readonly hashKeyType?: string;
        /**
         * The value of the hash key (also called the partition key).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-dynamodb.html#cfn-iotevents-alarmmodel-dynamodb-hashkeyvalue
         */
        readonly hashKeyValue: string;
        /**
         * The type of operation to perform. You can specify the following values:
         *
         * - `'INSERT'` - Insert data as a new item into the DynamoDB table. This item uses the specified hash key as a partition key. If you specified a range key, the item uses the range key as a sort key.
         * - `'UPDATE'` - Update an existing item of the DynamoDB table with new data. This item's partition key must match the specified hash key. If you specified a range key, the range key must match the item's sort key.
         * - `'DELETE'` - Delete an existing item of the DynamoDB table. This item's partition key must match the specified hash key. If you specified a range key, the range key must match the item's sort key.
         *
         * If you don't specify this parameter, AWS IoT Events triggers the `'INSERT'` operation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-dynamodb.html#cfn-iotevents-alarmmodel-dynamodb-operation
         */
        readonly operation?: string;
        /**
         * Information needed to configure the payload.
         *
         * By default, AWS IoT Events generates a standard payload in JSON for any action. This action payload contains all attribute-value pairs that have the information about the detector model instance and the event triggered the action. To configure the action payload, you can use `contentExpression` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-dynamodb.html#cfn-iotevents-alarmmodel-dynamodb-payload
         */
        readonly payload?: CfnAlarmModel.PayloadProperty | cdk.IResolvable;
        /**
         * The name of the DynamoDB column that receives the action payload.
         *
         * If you don't specify this parameter, the name of the DynamoDB column is `payload` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-dynamodb.html#cfn-iotevents-alarmmodel-dynamodb-payloadfield
         */
        readonly payloadField?: string;
        /**
         * The name of the range key (also called the sort key). The `rangeKeyField` value must match the sort key of the target DynamoDB table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-dynamodb.html#cfn-iotevents-alarmmodel-dynamodb-rangekeyfield
         */
        readonly rangeKeyField?: string;
        /**
         * The data type for the range key (also called the sort key), You can specify the following values:
         *
         * - `'STRING'` - The range key is a string.
         * - `'NUMBER'` - The range key is number.
         *
         * If you don't specify `rangeKeyField` , the default value is `'STRING'` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-dynamodb.html#cfn-iotevents-alarmmodel-dynamodb-rangekeytype
         */
        readonly rangeKeyType?: string;
        /**
         * The value of the range key (also called the sort key).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-dynamodb.html#cfn-iotevents-alarmmodel-dynamodb-rangekeyvalue
         */
        readonly rangeKeyValue?: string;
        /**
         * The name of the DynamoDB table. The `tableName` value must match the table name of the target DynamoDB table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-dynamodb.html#cfn-iotevents-alarmmodel-dynamodb-tablename
         */
        readonly tableName: string;
    }
}

/**
 * Determine whether the given properties match those of a `DynamoDBProperty`
 *
 * @param properties - the TypeScript properties of a `DynamoDBProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_DynamoDBPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('hashKeyField', cdk.requiredValidator)(properties.hashKeyField));
    errors.collect(cdk.propertyValidator('hashKeyField', cdk.validateString)(properties.hashKeyField));
    errors.collect(cdk.propertyValidator('hashKeyType', cdk.validateString)(properties.hashKeyType));
    errors.collect(cdk.propertyValidator('hashKeyValue', cdk.requiredValidator)(properties.hashKeyValue));
    errors.collect(cdk.propertyValidator('hashKeyValue', cdk.validateString)(properties.hashKeyValue));
    errors.collect(cdk.propertyValidator('operation', cdk.validateString)(properties.operation));
    errors.collect(cdk.propertyValidator('payload', CfnAlarmModel_PayloadPropertyValidator)(properties.payload));
    errors.collect(cdk.propertyValidator('payloadField', cdk.validateString)(properties.payloadField));
    errors.collect(cdk.propertyValidator('rangeKeyField', cdk.validateString)(properties.rangeKeyField));
    errors.collect(cdk.propertyValidator('rangeKeyType', cdk.validateString)(properties.rangeKeyType));
    errors.collect(cdk.propertyValidator('rangeKeyValue', cdk.validateString)(properties.rangeKeyValue));
    errors.collect(cdk.propertyValidator('tableName', cdk.requiredValidator)(properties.tableName));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    return errors.wrap('supplied properties not correct for "DynamoDBProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.DynamoDB` resource
 *
 * @param properties - the TypeScript properties of a `DynamoDBProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.DynamoDB` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelDynamoDBPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_DynamoDBPropertyValidator(properties).assertSuccess();
    return {
        HashKeyField: cdk.stringToCloudFormation(properties.hashKeyField),
        HashKeyType: cdk.stringToCloudFormation(properties.hashKeyType),
        HashKeyValue: cdk.stringToCloudFormation(properties.hashKeyValue),
        Operation: cdk.stringToCloudFormation(properties.operation),
        Payload: cfnAlarmModelPayloadPropertyToCloudFormation(properties.payload),
        PayloadField: cdk.stringToCloudFormation(properties.payloadField),
        RangeKeyField: cdk.stringToCloudFormation(properties.rangeKeyField),
        RangeKeyType: cdk.stringToCloudFormation(properties.rangeKeyType),
        RangeKeyValue: cdk.stringToCloudFormation(properties.rangeKeyValue),
        TableName: cdk.stringToCloudFormation(properties.tableName),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelDynamoDBPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.DynamoDBProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.DynamoDBProperty>();
    ret.addPropertyResult('hashKeyField', 'HashKeyField', cfn_parse.FromCloudFormation.getString(properties.HashKeyField));
    ret.addPropertyResult('hashKeyType', 'HashKeyType', properties.HashKeyType != null ? cfn_parse.FromCloudFormation.getString(properties.HashKeyType) : undefined);
    ret.addPropertyResult('hashKeyValue', 'HashKeyValue', cfn_parse.FromCloudFormation.getString(properties.HashKeyValue));
    ret.addPropertyResult('operation', 'Operation', properties.Operation != null ? cfn_parse.FromCloudFormation.getString(properties.Operation) : undefined);
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnAlarmModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addPropertyResult('payloadField', 'PayloadField', properties.PayloadField != null ? cfn_parse.FromCloudFormation.getString(properties.PayloadField) : undefined);
    ret.addPropertyResult('rangeKeyField', 'RangeKeyField', properties.RangeKeyField != null ? cfn_parse.FromCloudFormation.getString(properties.RangeKeyField) : undefined);
    ret.addPropertyResult('rangeKeyType', 'RangeKeyType', properties.RangeKeyType != null ? cfn_parse.FromCloudFormation.getString(properties.RangeKeyType) : undefined);
    ret.addPropertyResult('rangeKeyValue', 'RangeKeyValue', properties.RangeKeyValue != null ? cfn_parse.FromCloudFormation.getString(properties.RangeKeyValue) : undefined);
    ret.addPropertyResult('tableName', 'TableName', cfn_parse.FromCloudFormation.getString(properties.TableName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Defines an action to write to the Amazon DynamoDB table that you created. The default action payload contains all the information about the detector model instance and the event that triggered the action. You can customize the [payload](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Payload.html) . A separate column of the DynamoDB table receives one attribute-value pair in the payload that you specify.
     *
     * You must use expressions for all parameters in `DynamoDBv2Action` . The expressions accept literals, operators, functions, references, and substitution templates.
     *
     * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `tableName` parameter can be `'GreenhouseTemperatureTable'` .
     * - For references, you must specify either variables or input values. For example, the value for the `tableName` parameter can be `$variable.ddbtableName` .
     * - For a substitution template, you must use `${}` , and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates.
     *
     * In the following example, the value for the `contentExpression` parameter in `Payload` uses a substitution template.
     *
     * `'{\"sensorID\": \"${$input.GreenhouseInput.sensor_id}\", \"temperature\": \"${$input.GreenhouseInput.temperature * 9 / 5 + 32}\"}'`
     * - For a string concatenation, you must use `+` . A string concatenation can also contain a combination of literals, operators, functions, references, and substitution templates.
     *
     * In the following example, the value for the `tableName` parameter uses a string concatenation.
     *
     * `'GreenhouseTemperatureTable ' + $input.GreenhouseInput.date`
     *
     * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
     *
     * The value for the `type` parameter in `Payload` must be `JSON` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-dynamodbv2.html
     */
    export interface DynamoDBv2Property {
        /**
         * `CfnAlarmModel.DynamoDBv2Property.Payload`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-dynamodbv2.html#cfn-iotevents-alarmmodel-dynamodbv2-payload
         */
        readonly payload?: CfnAlarmModel.PayloadProperty | cdk.IResolvable;
        /**
         * The name of the DynamoDB table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-dynamodbv2.html#cfn-iotevents-alarmmodel-dynamodbv2-tablename
         */
        readonly tableName: string;
    }
}

/**
 * Determine whether the given properties match those of a `DynamoDBv2Property`
 *
 * @param properties - the TypeScript properties of a `DynamoDBv2Property`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_DynamoDBv2PropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('payload', CfnAlarmModel_PayloadPropertyValidator)(properties.payload));
    errors.collect(cdk.propertyValidator('tableName', cdk.requiredValidator)(properties.tableName));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    return errors.wrap('supplied properties not correct for "DynamoDBv2Property"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.DynamoDBv2` resource
 *
 * @param properties - the TypeScript properties of a `DynamoDBv2Property`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.DynamoDBv2` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelDynamoDBv2PropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_DynamoDBv2PropertyValidator(properties).assertSuccess();
    return {
        Payload: cfnAlarmModelPayloadPropertyToCloudFormation(properties.payload),
        TableName: cdk.stringToCloudFormation(properties.tableName),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelDynamoDBv2PropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.DynamoDBv2Property | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.DynamoDBv2Property>();
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnAlarmModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addPropertyResult('tableName', 'TableName', cfn_parse.FromCloudFormation.getString(properties.TableName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Sends information about the detector model instance and the event that triggered the action to an Amazon Kinesis Data Firehose delivery stream.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-firehose.html
     */
    export interface FirehoseProperty {
        /**
         * The name of the Kinesis Data Firehose delivery stream where the data is written.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-firehose.html#cfn-iotevents-alarmmodel-firehose-deliverystreamname
         */
        readonly deliveryStreamName: string;
        /**
         * You can configure the action payload when you send a message to an Amazon Kinesis Data Firehose delivery stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-firehose.html#cfn-iotevents-alarmmodel-firehose-payload
         */
        readonly payload?: CfnAlarmModel.PayloadProperty | cdk.IResolvable;
        /**
         * A character separator that is used to separate records written to the Kinesis Data Firehose delivery stream. Valid values are: '\n' (newline), '\t' (tab), '\r\n' (Windows newline), ',' (comma).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-firehose.html#cfn-iotevents-alarmmodel-firehose-separator
         */
        readonly separator?: string;
    }
}

/**
 * Determine whether the given properties match those of a `FirehoseProperty`
 *
 * @param properties - the TypeScript properties of a `FirehoseProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_FirehosePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('deliveryStreamName', cdk.requiredValidator)(properties.deliveryStreamName));
    errors.collect(cdk.propertyValidator('deliveryStreamName', cdk.validateString)(properties.deliveryStreamName));
    errors.collect(cdk.propertyValidator('payload', CfnAlarmModel_PayloadPropertyValidator)(properties.payload));
    errors.collect(cdk.propertyValidator('separator', cdk.validateString)(properties.separator));
    return errors.wrap('supplied properties not correct for "FirehoseProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.Firehose` resource
 *
 * @param properties - the TypeScript properties of a `FirehoseProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.Firehose` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelFirehosePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_FirehosePropertyValidator(properties).assertSuccess();
    return {
        DeliveryStreamName: cdk.stringToCloudFormation(properties.deliveryStreamName),
        Payload: cfnAlarmModelPayloadPropertyToCloudFormation(properties.payload),
        Separator: cdk.stringToCloudFormation(properties.separator),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelFirehosePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.FirehoseProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.FirehoseProperty>();
    ret.addPropertyResult('deliveryStreamName', 'DeliveryStreamName', cfn_parse.FromCloudFormation.getString(properties.DeliveryStreamName));
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnAlarmModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addPropertyResult('separator', 'Separator', properties.Separator != null ? cfn_parse.FromCloudFormation.getString(properties.Separator) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Specifies the default alarm state. The configuration applies to all alarms that were created based on this alarm model.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-initializationconfiguration.html
     */
    export interface InitializationConfigurationProperty {
        /**
         * The value must be `TRUE` or `FALSE` . If `FALSE` , all alarm instances created based on the alarm model are activated. The default value is `TRUE` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-initializationconfiguration.html#cfn-iotevents-alarmmodel-initializationconfiguration-disabledoninitialization
         */
        readonly disabledOnInitialization: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `InitializationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `InitializationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_InitializationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('disabledOnInitialization', cdk.requiredValidator)(properties.disabledOnInitialization));
    errors.collect(cdk.propertyValidator('disabledOnInitialization', cdk.validateBoolean)(properties.disabledOnInitialization));
    return errors.wrap('supplied properties not correct for "InitializationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.InitializationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `InitializationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.InitializationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelInitializationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_InitializationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        DisabledOnInitialization: cdk.booleanToCloudFormation(properties.disabledOnInitialization),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelInitializationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.InitializationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.InitializationConfigurationProperty>();
    ret.addPropertyResult('disabledOnInitialization', 'DisabledOnInitialization', cfn_parse.FromCloudFormation.getBoolean(properties.DisabledOnInitialization));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Sends an AWS IoT Events input, passing in information about the detector model instance and the event that triggered the action.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-iotevents.html
     */
    export interface IotEventsProperty {
        /**
         * The name of the AWS IoT Events input where the data is sent.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-iotevents.html#cfn-iotevents-alarmmodel-iotevents-inputname
         */
        readonly inputName: string;
        /**
         * You can configure the action payload when you send a message to an AWS IoT Events input.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-iotevents.html#cfn-iotevents-alarmmodel-iotevents-payload
         */
        readonly payload?: CfnAlarmModel.PayloadProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `IotEventsProperty`
 *
 * @param properties - the TypeScript properties of a `IotEventsProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_IotEventsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('inputName', cdk.requiredValidator)(properties.inputName));
    errors.collect(cdk.propertyValidator('inputName', cdk.validateString)(properties.inputName));
    errors.collect(cdk.propertyValidator('payload', CfnAlarmModel_PayloadPropertyValidator)(properties.payload));
    return errors.wrap('supplied properties not correct for "IotEventsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.IotEvents` resource
 *
 * @param properties - the TypeScript properties of a `IotEventsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.IotEvents` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelIotEventsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_IotEventsPropertyValidator(properties).assertSuccess();
    return {
        InputName: cdk.stringToCloudFormation(properties.inputName),
        Payload: cfnAlarmModelPayloadPropertyToCloudFormation(properties.payload),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelIotEventsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.IotEventsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.IotEventsProperty>();
    ret.addPropertyResult('inputName', 'InputName', cfn_parse.FromCloudFormation.getString(properties.InputName));
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnAlarmModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Sends information about the detector model instance and the event that triggered the action to a specified asset property in AWS IoT SiteWise .
     *
     * You must use expressions for all parameters in `IotSiteWiseAction` . The expressions accept literals, operators, functions, references, and substitutions templates.
     *
     * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `propertyAlias` parameter can be `'/company/windfarm/3/turbine/7/temperature'` .
     * - For references, you must specify either variables or input values. For example, the value for the `assetId` parameter can be `$input.TurbineInput.assetId1` .
     * - For a substitution template, you must use `${}` , and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates.
     *
     * In the following example, the value for the `propertyAlias` parameter uses a substitution template.
     *
     * `'company/windfarm/${$input.TemperatureInput.sensorData.windfarmID}/turbine/ ${$input.TemperatureInput.sensorData.turbineID}/temperature'`
     *
     * You must specify either `propertyAlias` or both `assetId` and `propertyId` to identify the target asset property in AWS IoT SiteWise .
     *
     * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-iotsitewise.html
     */
    export interface IotSiteWiseProperty {
        /**
         * The ID of the asset that has the specified property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-iotsitewise.html#cfn-iotevents-alarmmodel-iotsitewise-assetid
         */
        readonly assetId?: string;
        /**
         * A unique identifier for this entry. You can use the entry ID to track which data entry causes an error in case of failure. The default is a new unique identifier.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-iotsitewise.html#cfn-iotevents-alarmmodel-iotsitewise-entryid
         */
        readonly entryId?: string;
        /**
         * The alias of the asset property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-iotsitewise.html#cfn-iotevents-alarmmodel-iotsitewise-propertyalias
         */
        readonly propertyAlias?: string;
        /**
         * The ID of the asset property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-iotsitewise.html#cfn-iotevents-alarmmodel-iotsitewise-propertyid
         */
        readonly propertyId?: string;
        /**
         * The value to send to the asset property. This value contains timestamp, quality, and value (TQV) information.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-iotsitewise.html#cfn-iotevents-alarmmodel-iotsitewise-propertyvalue
         */
        readonly propertyValue: CfnAlarmModel.AssetPropertyValueProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `IotSiteWiseProperty`
 *
 * @param properties - the TypeScript properties of a `IotSiteWiseProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_IotSiteWisePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('assetId', cdk.validateString)(properties.assetId));
    errors.collect(cdk.propertyValidator('entryId', cdk.validateString)(properties.entryId));
    errors.collect(cdk.propertyValidator('propertyAlias', cdk.validateString)(properties.propertyAlias));
    errors.collect(cdk.propertyValidator('propertyId', cdk.validateString)(properties.propertyId));
    errors.collect(cdk.propertyValidator('propertyValue', cdk.requiredValidator)(properties.propertyValue));
    errors.collect(cdk.propertyValidator('propertyValue', CfnAlarmModel_AssetPropertyValuePropertyValidator)(properties.propertyValue));
    return errors.wrap('supplied properties not correct for "IotSiteWiseProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.IotSiteWise` resource
 *
 * @param properties - the TypeScript properties of a `IotSiteWiseProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.IotSiteWise` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelIotSiteWisePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_IotSiteWisePropertyValidator(properties).assertSuccess();
    return {
        AssetId: cdk.stringToCloudFormation(properties.assetId),
        EntryId: cdk.stringToCloudFormation(properties.entryId),
        PropertyAlias: cdk.stringToCloudFormation(properties.propertyAlias),
        PropertyId: cdk.stringToCloudFormation(properties.propertyId),
        PropertyValue: cfnAlarmModelAssetPropertyValuePropertyToCloudFormation(properties.propertyValue),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelIotSiteWisePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.IotSiteWiseProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.IotSiteWiseProperty>();
    ret.addPropertyResult('assetId', 'AssetId', properties.AssetId != null ? cfn_parse.FromCloudFormation.getString(properties.AssetId) : undefined);
    ret.addPropertyResult('entryId', 'EntryId', properties.EntryId != null ? cfn_parse.FromCloudFormation.getString(properties.EntryId) : undefined);
    ret.addPropertyResult('propertyAlias', 'PropertyAlias', properties.PropertyAlias != null ? cfn_parse.FromCloudFormation.getString(properties.PropertyAlias) : undefined);
    ret.addPropertyResult('propertyId', 'PropertyId', properties.PropertyId != null ? cfn_parse.FromCloudFormation.getString(properties.PropertyId) : undefined);
    ret.addPropertyResult('propertyValue', 'PropertyValue', CfnAlarmModelAssetPropertyValuePropertyFromCloudFormation(properties.PropertyValue));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Information required to publish the MQTT message through the AWS IoT message broker.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-iottopicpublish.html
     */
    export interface IotTopicPublishProperty {
        /**
         * The MQTT topic of the message. You can use a string expression that includes variables ( `$variable.<variable-name>` ) and input values ( `$input.<input-name>.<path-to-datum>` ) as the topic string.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-iottopicpublish.html#cfn-iotevents-alarmmodel-iottopicpublish-mqtttopic
         */
        readonly mqttTopic: string;
        /**
         * You can configure the action payload when you publish a message to an AWS IoT Core topic.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-iottopicpublish.html#cfn-iotevents-alarmmodel-iottopicpublish-payload
         */
        readonly payload?: CfnAlarmModel.PayloadProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `IotTopicPublishProperty`
 *
 * @param properties - the TypeScript properties of a `IotTopicPublishProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_IotTopicPublishPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('mqttTopic', cdk.requiredValidator)(properties.mqttTopic));
    errors.collect(cdk.propertyValidator('mqttTopic', cdk.validateString)(properties.mqttTopic));
    errors.collect(cdk.propertyValidator('payload', CfnAlarmModel_PayloadPropertyValidator)(properties.payload));
    return errors.wrap('supplied properties not correct for "IotTopicPublishProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.IotTopicPublish` resource
 *
 * @param properties - the TypeScript properties of a `IotTopicPublishProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.IotTopicPublish` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelIotTopicPublishPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_IotTopicPublishPropertyValidator(properties).assertSuccess();
    return {
        MqttTopic: cdk.stringToCloudFormation(properties.mqttTopic),
        Payload: cfnAlarmModelPayloadPropertyToCloudFormation(properties.payload),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelIotTopicPublishPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.IotTopicPublishProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.IotTopicPublishProperty>();
    ret.addPropertyResult('mqttTopic', 'MqttTopic', cfn_parse.FromCloudFormation.getString(properties.MqttTopic));
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnAlarmModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Calls a Lambda function, passing in information about the detector model instance and the event that triggered the action.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-lambda.html
     */
    export interface LambdaProperty {
        /**
         * The ARN of the Lambda function that is executed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-lambda.html#cfn-iotevents-alarmmodel-lambda-functionarn
         */
        readonly functionArn: string;
        /**
         * You can configure the action payload when you send a message to a Lambda function.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-lambda.html#cfn-iotevents-alarmmodel-lambda-payload
         */
        readonly payload?: CfnAlarmModel.PayloadProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `LambdaProperty`
 *
 * @param properties - the TypeScript properties of a `LambdaProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_LambdaPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('functionArn', cdk.requiredValidator)(properties.functionArn));
    errors.collect(cdk.propertyValidator('functionArn', cdk.validateString)(properties.functionArn));
    errors.collect(cdk.propertyValidator('payload', CfnAlarmModel_PayloadPropertyValidator)(properties.payload));
    return errors.wrap('supplied properties not correct for "LambdaProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.Lambda` resource
 *
 * @param properties - the TypeScript properties of a `LambdaProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.Lambda` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelLambdaPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_LambdaPropertyValidator(properties).assertSuccess();
    return {
        FunctionArn: cdk.stringToCloudFormation(properties.functionArn),
        Payload: cfnAlarmModelPayloadPropertyToCloudFormation(properties.payload),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelLambdaPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.LambdaProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.LambdaProperty>();
    ret.addPropertyResult('functionArn', 'FunctionArn', cfn_parse.FromCloudFormation.getString(properties.FunctionArn));
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnAlarmModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Information needed to configure the payload.
     *
     * By default, AWS IoT Events generates a standard payload in JSON for any action. This action payload contains all attribute-value pairs that have the information about the detector model instance and the event triggered the action. To configure the action payload, you can use `contentExpression` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-payload.html
     */
    export interface PayloadProperty {
        /**
         * The content of the payload. You can use a string expression that includes quoted strings ( `'<string>'` ), variables ( `$variable.<variable-name>` ), input values ( `$input.<input-name>.<path-to-datum>` ), string concatenations, and quoted strings that contain `${}` as the content. The recommended maximum size of a content expression is 1 KB.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-payload.html#cfn-iotevents-alarmmodel-payload-contentexpression
         */
        readonly contentExpression: string;
        /**
         * The value of the payload type can be either `STRING` or `JSON` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-payload.html#cfn-iotevents-alarmmodel-payload-type
         */
        readonly type: string;
    }
}

/**
 * Determine whether the given properties match those of a `PayloadProperty`
 *
 * @param properties - the TypeScript properties of a `PayloadProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_PayloadPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('contentExpression', cdk.requiredValidator)(properties.contentExpression));
    errors.collect(cdk.propertyValidator('contentExpression', cdk.validateString)(properties.contentExpression));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "PayloadProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.Payload` resource
 *
 * @param properties - the TypeScript properties of a `PayloadProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.Payload` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelPayloadPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_PayloadPropertyValidator(properties).assertSuccess();
    return {
        ContentExpression: cdk.stringToCloudFormation(properties.contentExpression),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelPayloadPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.PayloadProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.PayloadProperty>();
    ret.addPropertyResult('contentExpression', 'ContentExpression', cfn_parse.FromCloudFormation.getString(properties.ContentExpression));
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * A rule that compares an input property value to a threshold value with a comparison operator.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-simplerule.html
     */
    export interface SimpleRuleProperty {
        /**
         * The comparison operator.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-simplerule.html#cfn-iotevents-alarmmodel-simplerule-comparisonoperator
         */
        readonly comparisonOperator: string;
        /**
         * The value on the left side of the comparison operator. You can specify an AWS IoT Events input attribute as an input property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-simplerule.html#cfn-iotevents-alarmmodel-simplerule-inputproperty
         */
        readonly inputProperty: string;
        /**
         * The value on the right side of the comparison operator. You can enter a number or specify an AWS IoT Events input attribute.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-simplerule.html#cfn-iotevents-alarmmodel-simplerule-threshold
         */
        readonly threshold: string;
    }
}

/**
 * Determine whether the given properties match those of a `SimpleRuleProperty`
 *
 * @param properties - the TypeScript properties of a `SimpleRuleProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_SimpleRulePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('comparisonOperator', cdk.requiredValidator)(properties.comparisonOperator));
    errors.collect(cdk.propertyValidator('comparisonOperator', cdk.validateString)(properties.comparisonOperator));
    errors.collect(cdk.propertyValidator('inputProperty', cdk.requiredValidator)(properties.inputProperty));
    errors.collect(cdk.propertyValidator('inputProperty', cdk.validateString)(properties.inputProperty));
    errors.collect(cdk.propertyValidator('threshold', cdk.requiredValidator)(properties.threshold));
    errors.collect(cdk.propertyValidator('threshold', cdk.validateString)(properties.threshold));
    return errors.wrap('supplied properties not correct for "SimpleRuleProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.SimpleRule` resource
 *
 * @param properties - the TypeScript properties of a `SimpleRuleProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.SimpleRule` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelSimpleRulePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_SimpleRulePropertyValidator(properties).assertSuccess();
    return {
        ComparisonOperator: cdk.stringToCloudFormation(properties.comparisonOperator),
        InputProperty: cdk.stringToCloudFormation(properties.inputProperty),
        Threshold: cdk.stringToCloudFormation(properties.threshold),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelSimpleRulePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.SimpleRuleProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.SimpleRuleProperty>();
    ret.addPropertyResult('comparisonOperator', 'ComparisonOperator', cfn_parse.FromCloudFormation.getString(properties.ComparisonOperator));
    ret.addPropertyResult('inputProperty', 'InputProperty', cfn_parse.FromCloudFormation.getString(properties.InputProperty));
    ret.addPropertyResult('threshold', 'Threshold', cfn_parse.FromCloudFormation.getString(properties.Threshold));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Information required to publish the Amazon SNS message.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-sns.html
     */
    export interface SnsProperty {
        /**
         * You can configure the action payload when you send a message as an Amazon SNS push notification.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-sns.html#cfn-iotevents-alarmmodel-sns-payload
         */
        readonly payload?: CfnAlarmModel.PayloadProperty | cdk.IResolvable;
        /**
         * The ARN of the Amazon SNS target where the message is sent.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-sns.html#cfn-iotevents-alarmmodel-sns-targetarn
         */
        readonly targetArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `SnsProperty`
 *
 * @param properties - the TypeScript properties of a `SnsProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_SnsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('payload', CfnAlarmModel_PayloadPropertyValidator)(properties.payload));
    errors.collect(cdk.propertyValidator('targetArn', cdk.requiredValidator)(properties.targetArn));
    errors.collect(cdk.propertyValidator('targetArn', cdk.validateString)(properties.targetArn));
    return errors.wrap('supplied properties not correct for "SnsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.Sns` resource
 *
 * @param properties - the TypeScript properties of a `SnsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.Sns` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelSnsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_SnsPropertyValidator(properties).assertSuccess();
    return {
        Payload: cfnAlarmModelPayloadPropertyToCloudFormation(properties.payload),
        TargetArn: cdk.stringToCloudFormation(properties.targetArn),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelSnsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.SnsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.SnsProperty>();
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnAlarmModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addPropertyResult('targetArn', 'TargetArn', cfn_parse.FromCloudFormation.getString(properties.TargetArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAlarmModel {
    /**
     * Sends information about the detector model instance and the event that triggered the action to an Amazon SQS queue.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-sqs.html
     */
    export interface SqsProperty {
        /**
         * You can configure the action payload when you send a message to an Amazon SQS queue.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-sqs.html#cfn-iotevents-alarmmodel-sqs-payload
         */
        readonly payload?: CfnAlarmModel.PayloadProperty | cdk.IResolvable;
        /**
         * The URL of the SQS queue where the data is written.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-sqs.html#cfn-iotevents-alarmmodel-sqs-queueurl
         */
        readonly queueUrl: string;
        /**
         * Set this to TRUE if you want the data to be base-64 encoded before it is written to the queue. Otherwise, set this to FALSE.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-alarmmodel-sqs.html#cfn-iotevents-alarmmodel-sqs-usebase64
         */
        readonly useBase64?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SqsProperty`
 *
 * @param properties - the TypeScript properties of a `SqsProperty`
 *
 * @returns the result of the validation.
 */
function CfnAlarmModel_SqsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('payload', CfnAlarmModel_PayloadPropertyValidator)(properties.payload));
    errors.collect(cdk.propertyValidator('queueUrl', cdk.requiredValidator)(properties.queueUrl));
    errors.collect(cdk.propertyValidator('queueUrl', cdk.validateString)(properties.queueUrl));
    errors.collect(cdk.propertyValidator('useBase64', cdk.validateBoolean)(properties.useBase64));
    return errors.wrap('supplied properties not correct for "SqsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.Sqs` resource
 *
 * @param properties - the TypeScript properties of a `SqsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::AlarmModel.Sqs` resource.
 */
// @ts-ignore TS6133
function cfnAlarmModelSqsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAlarmModel_SqsPropertyValidator(properties).assertSuccess();
    return {
        Payload: cfnAlarmModelPayloadPropertyToCloudFormation(properties.payload),
        QueueUrl: cdk.stringToCloudFormation(properties.queueUrl),
        UseBase64: cdk.booleanToCloudFormation(properties.useBase64),
    };
}

// @ts-ignore TS6133
function CfnAlarmModelSqsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAlarmModel.SqsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAlarmModel.SqsProperty>();
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnAlarmModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addPropertyResult('queueUrl', 'QueueUrl', cfn_parse.FromCloudFormation.getString(properties.QueueUrl));
    ret.addPropertyResult('useBase64', 'UseBase64', properties.UseBase64 != null ? cfn_parse.FromCloudFormation.getBoolean(properties.UseBase64) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDetectorModel`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html
 */
export interface CfnDetectorModelProps {

    /**
     * Information that defines how a detector operates.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html#cfn-iotevents-detectormodel-detectormodeldefinition
     */
    readonly detectorModelDefinition: CfnDetectorModel.DetectorModelDefinitionProperty | cdk.IResolvable;

    /**
     * The ARN of the role that grants permission to AWS IoT Events to perform its operations.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html#cfn-iotevents-detectormodel-rolearn
     */
    readonly roleArn: string;

    /**
     * A brief description of the detector model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html#cfn-iotevents-detectormodel-detectormodeldescription
     */
    readonly detectorModelDescription?: string;

    /**
     * The name of the detector model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html#cfn-iotevents-detectormodel-detectormodelname
     */
    readonly detectorModelName?: string;

    /**
     * Information about the order in which events are evaluated and how actions are executed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html#cfn-iotevents-detectormodel-evaluationmethod
     */
    readonly evaluationMethod?: string;

    /**
     * The value used to identify a detector instance. When a device or system sends input, a new detector instance with a unique key value is created. AWS IoT Events can continue to route input to its corresponding detector instance based on this identifying information.
     *
     * This parameter uses a JSON-path expression to select the attribute-value pair in the message payload that is used for identification. To route the message to the correct detector instance, the device must send a message payload that contains the same attribute-value.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html#cfn-iotevents-detectormodel-key
     */
    readonly key?: string;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html#cfn-iotevents-detectormodel-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnDetectorModelProps`
 *
 * @param properties - the TypeScript properties of a `CfnDetectorModelProps`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModelPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('detectorModelDefinition', cdk.requiredValidator)(properties.detectorModelDefinition));
    errors.collect(cdk.propertyValidator('detectorModelDefinition', CfnDetectorModel_DetectorModelDefinitionPropertyValidator)(properties.detectorModelDefinition));
    errors.collect(cdk.propertyValidator('detectorModelDescription', cdk.validateString)(properties.detectorModelDescription));
    errors.collect(cdk.propertyValidator('detectorModelName', cdk.validateString)(properties.detectorModelName));
    errors.collect(cdk.propertyValidator('evaluationMethod', cdk.validateString)(properties.evaluationMethod));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnDetectorModelProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel` resource
 *
 * @param properties - the TypeScript properties of a `CfnDetectorModelProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModelPropsValidator(properties).assertSuccess();
    return {
        DetectorModelDefinition: cfnDetectorModelDetectorModelDefinitionPropertyToCloudFormation(properties.detectorModelDefinition),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        DetectorModelDescription: cdk.stringToCloudFormation(properties.detectorModelDescription),
        DetectorModelName: cdk.stringToCloudFormation(properties.detectorModelName),
        EvaluationMethod: cdk.stringToCloudFormation(properties.evaluationMethod),
        Key: cdk.stringToCloudFormation(properties.key),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModelProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModelProps>();
    ret.addPropertyResult('detectorModelDefinition', 'DetectorModelDefinition', CfnDetectorModelDetectorModelDefinitionPropertyFromCloudFormation(properties.DetectorModelDefinition));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('detectorModelDescription', 'DetectorModelDescription', properties.DetectorModelDescription != null ? cfn_parse.FromCloudFormation.getString(properties.DetectorModelDescription) : undefined);
    ret.addPropertyResult('detectorModelName', 'DetectorModelName', properties.DetectorModelName != null ? cfn_parse.FromCloudFormation.getString(properties.DetectorModelName) : undefined);
    ret.addPropertyResult('evaluationMethod', 'EvaluationMethod', properties.EvaluationMethod != null ? cfn_parse.FromCloudFormation.getString(properties.EvaluationMethod) : undefined);
    ret.addPropertyResult('key', 'Key', properties.Key != null ? cfn_parse.FromCloudFormation.getString(properties.Key) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoTEvents::DetectorModel`
 *
 * The AWS::IoTEvents::DetectorModel resource creates a detector model. You create a *detector model* (a model of your equipment or process) using *states* . For each state, you define conditional (Boolean) logic that evaluates the incoming inputs to detect significant events. When an event is detected, it can change the state or trigger custom-built or predefined actions using other AWS services. You can define additional events that trigger actions when entering or exiting a state and, optionally, when a condition is met. For more information, see [How to Use AWS IoT Events](https://docs.aws.amazon.com/iotevents/latest/developerguide/how-to-use-iotevents.html) in the *AWS IoT Events Developer Guide* .
 *
 * > When you successfully update a detector model (using the AWS IoT Events console, AWS IoT Events API or CLI commands, or AWS CloudFormation ) all detector instances created by the model are reset to their initial states. (The detector's `state` , and the values of any variables and timers are reset.)
 * >
 * > When you successfully update a detector model (using the AWS IoT Events console, AWS IoT Events API or CLI commands, or AWS CloudFormation ) the version number of the detector model is incremented. (A detector model with version number 1 before the update has version number 2 after the update succeeds.)
 * >
 * > If you attempt to update a detector model using AWS CloudFormation and the update does not succeed, the system may, in some cases, restore the original detector model. When this occurs, the detector model's version is incremented twice (for example, from version 1 to version 3) and the detector instances are reset.
 * >
 * > Also, be aware that if you attempt to update several detector models at once using AWS CloudFormation , some updates may succeed and others fail. In this case, the effects on each detector model's detector instances and version number depend on whether the update succeeded or failed, with the results as stated.
 *
 * @cloudformationResource AWS::IoTEvents::DetectorModel
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html
 */
export class CfnDetectorModel extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoTEvents::DetectorModel";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDetectorModel {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDetectorModelPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDetectorModel(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Information that defines how a detector operates.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html#cfn-iotevents-detectormodel-detectormodeldefinition
     */
    public detectorModelDefinition: CfnDetectorModel.DetectorModelDefinitionProperty | cdk.IResolvable;

    /**
     * The ARN of the role that grants permission to AWS IoT Events to perform its operations.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html#cfn-iotevents-detectormodel-rolearn
     */
    public roleArn: string;

    /**
     * A brief description of the detector model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html#cfn-iotevents-detectormodel-detectormodeldescription
     */
    public detectorModelDescription: string | undefined;

    /**
     * The name of the detector model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html#cfn-iotevents-detectormodel-detectormodelname
     */
    public detectorModelName: string | undefined;

    /**
     * Information about the order in which events are evaluated and how actions are executed.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html#cfn-iotevents-detectormodel-evaluationmethod
     */
    public evaluationMethod: string | undefined;

    /**
     * The value used to identify a detector instance. When a device or system sends input, a new detector instance with a unique key value is created. AWS IoT Events can continue to route input to its corresponding detector instance based on this identifying information.
     *
     * This parameter uses a JSON-path expression to select the attribute-value pair in the message payload that is used for identification. To route the message to the correct detector instance, the device must send a message payload that contains the same attribute-value.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html#cfn-iotevents-detectormodel-key
     */
    public key: string | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html#cfn-iotevents-detectormodel-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::IoTEvents::DetectorModel`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDetectorModelProps) {
        super(scope, id, { type: CfnDetectorModel.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'detectorModelDefinition', this);
        cdk.requireProperty(props, 'roleArn', this);

        this.detectorModelDefinition = props.detectorModelDefinition;
        this.roleArn = props.roleArn;
        this.detectorModelDescription = props.detectorModelDescription;
        this.detectorModelName = props.detectorModelName;
        this.evaluationMethod = props.evaluationMethod;
        this.key = props.key;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IoTEvents::DetectorModel", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDetectorModel.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            detectorModelDefinition: this.detectorModelDefinition,
            roleArn: this.roleArn,
            detectorModelDescription: this.detectorModelDescription,
            detectorModelName: this.detectorModelName,
            evaluationMethod: this.evaluationMethod,
            key: this.key,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDetectorModelPropsToCloudFormation(props);
    }
}

export namespace CfnDetectorModel {
    /**
     * An action to be performed when the `condition` is TRUE.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-action.html
     */
    export interface ActionProperty {
        /**
         * Information needed to clear the timer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-action.html#cfn-iotevents-detectormodel-action-cleartimer
         */
        readonly clearTimer?: CfnDetectorModel.ClearTimerProperty | cdk.IResolvable;
        /**
         * Writes to the DynamoDB table that you created. The default action payload contains all attribute-value pairs that have the information about the detector model instance and the event that triggered the action. You can customize the [payload](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Payload.html) . One column of the DynamoDB table receives all attribute-value pairs in the payload that you specify. For more information, see [Actions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-event-actions.html) in *AWS IoT Events Developer Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-action.html#cfn-iotevents-detectormodel-action-dynamodb
         */
        readonly dynamoDb?: CfnDetectorModel.DynamoDBProperty | cdk.IResolvable;
        /**
         * Writes to the DynamoDB table that you created. The default action payload contains all attribute-value pairs that have the information about the detector model instance and the event that triggered the action. You can customize the [payload](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Payload.html) . A separate column of the DynamoDB table receives one attribute-value pair in the payload that you specify. For more information, see [Actions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-event-actions.html) in *AWS IoT Events Developer Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-action.html#cfn-iotevents-detectormodel-action-dynamodbv2
         */
        readonly dynamoDBv2?: CfnDetectorModel.DynamoDBv2Property | cdk.IResolvable;
        /**
         * Sends information about the detector model instance and the event that triggered the action to an Amazon Kinesis Data Firehose delivery stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-action.html#cfn-iotevents-detectormodel-action-firehose
         */
        readonly firehose?: CfnDetectorModel.FirehoseProperty | cdk.IResolvable;
        /**
         * Sends AWS IoT Events input, which passes information about the detector model instance and the event that triggered the action.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-action.html#cfn-iotevents-detectormodel-action-iotevents
         */
        readonly iotEvents?: CfnDetectorModel.IotEventsProperty | cdk.IResolvable;
        /**
         * Sends information about the detector model instance and the event that triggered the action to an asset property in AWS IoT SiteWise .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-action.html#cfn-iotevents-detectormodel-action-iotsitewise
         */
        readonly iotSiteWise?: CfnDetectorModel.IotSiteWiseProperty | cdk.IResolvable;
        /**
         * Publishes an MQTT message with the given topic to the AWS IoT message broker.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-action.html#cfn-iotevents-detectormodel-action-iottopicpublish
         */
        readonly iotTopicPublish?: CfnDetectorModel.IotTopicPublishProperty | cdk.IResolvable;
        /**
         * Calls a Lambda function, passing in information about the detector model instance and the event that triggered the action.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-action.html#cfn-iotevents-detectormodel-action-lambda
         */
        readonly lambda?: CfnDetectorModel.LambdaProperty | cdk.IResolvable;
        /**
         * Information needed to reset the timer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-action.html#cfn-iotevents-detectormodel-action-resettimer
         */
        readonly resetTimer?: CfnDetectorModel.ResetTimerProperty | cdk.IResolvable;
        /**
         * Information needed to set the timer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-action.html#cfn-iotevents-detectormodel-action-settimer
         */
        readonly setTimer?: CfnDetectorModel.SetTimerProperty | cdk.IResolvable;
        /**
         * Sets a variable to a specified value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-action.html#cfn-iotevents-detectormodel-action-setvariable
         */
        readonly setVariable?: CfnDetectorModel.SetVariableProperty | cdk.IResolvable;
        /**
         * Sends an Amazon SNS message.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-action.html#cfn-iotevents-detectormodel-action-sns
         */
        readonly sns?: CfnDetectorModel.SnsProperty | cdk.IResolvable;
        /**
         * Sends an Amazon SNS message.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-action.html#cfn-iotevents-detectormodel-action-sqs
         */
        readonly sqs?: CfnDetectorModel.SqsProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ActionProperty`
 *
 * @param properties - the TypeScript properties of a `ActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_ActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clearTimer', CfnDetectorModel_ClearTimerPropertyValidator)(properties.clearTimer));
    errors.collect(cdk.propertyValidator('dynamoDb', CfnDetectorModel_DynamoDBPropertyValidator)(properties.dynamoDb));
    errors.collect(cdk.propertyValidator('dynamoDBv2', CfnDetectorModel_DynamoDBv2PropertyValidator)(properties.dynamoDBv2));
    errors.collect(cdk.propertyValidator('firehose', CfnDetectorModel_FirehosePropertyValidator)(properties.firehose));
    errors.collect(cdk.propertyValidator('iotEvents', CfnDetectorModel_IotEventsPropertyValidator)(properties.iotEvents));
    errors.collect(cdk.propertyValidator('iotSiteWise', CfnDetectorModel_IotSiteWisePropertyValidator)(properties.iotSiteWise));
    errors.collect(cdk.propertyValidator('iotTopicPublish', CfnDetectorModel_IotTopicPublishPropertyValidator)(properties.iotTopicPublish));
    errors.collect(cdk.propertyValidator('lambda', CfnDetectorModel_LambdaPropertyValidator)(properties.lambda));
    errors.collect(cdk.propertyValidator('resetTimer', CfnDetectorModel_ResetTimerPropertyValidator)(properties.resetTimer));
    errors.collect(cdk.propertyValidator('setTimer', CfnDetectorModel_SetTimerPropertyValidator)(properties.setTimer));
    errors.collect(cdk.propertyValidator('setVariable', CfnDetectorModel_SetVariablePropertyValidator)(properties.setVariable));
    errors.collect(cdk.propertyValidator('sns', CfnDetectorModel_SnsPropertyValidator)(properties.sns));
    errors.collect(cdk.propertyValidator('sqs', CfnDetectorModel_SqsPropertyValidator)(properties.sqs));
    return errors.wrap('supplied properties not correct for "ActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.Action` resource
 *
 * @param properties - the TypeScript properties of a `ActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.Action` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_ActionPropertyValidator(properties).assertSuccess();
    return {
        ClearTimer: cfnDetectorModelClearTimerPropertyToCloudFormation(properties.clearTimer),
        DynamoDB: cfnDetectorModelDynamoDBPropertyToCloudFormation(properties.dynamoDb),
        DynamoDBv2: cfnDetectorModelDynamoDBv2PropertyToCloudFormation(properties.dynamoDBv2),
        Firehose: cfnDetectorModelFirehosePropertyToCloudFormation(properties.firehose),
        IotEvents: cfnDetectorModelIotEventsPropertyToCloudFormation(properties.iotEvents),
        IotSiteWise: cfnDetectorModelIotSiteWisePropertyToCloudFormation(properties.iotSiteWise),
        IotTopicPublish: cfnDetectorModelIotTopicPublishPropertyToCloudFormation(properties.iotTopicPublish),
        Lambda: cfnDetectorModelLambdaPropertyToCloudFormation(properties.lambda),
        ResetTimer: cfnDetectorModelResetTimerPropertyToCloudFormation(properties.resetTimer),
        SetTimer: cfnDetectorModelSetTimerPropertyToCloudFormation(properties.setTimer),
        SetVariable: cfnDetectorModelSetVariablePropertyToCloudFormation(properties.setVariable),
        Sns: cfnDetectorModelSnsPropertyToCloudFormation(properties.sns),
        Sqs: cfnDetectorModelSqsPropertyToCloudFormation(properties.sqs),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.ActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.ActionProperty>();
    ret.addPropertyResult('clearTimer', 'ClearTimer', properties.ClearTimer != null ? CfnDetectorModelClearTimerPropertyFromCloudFormation(properties.ClearTimer) : undefined);
    ret.addPropertyResult('dynamoDb', 'DynamoDB', properties.DynamoDB != null ? CfnDetectorModelDynamoDBPropertyFromCloudFormation(properties.DynamoDB) : undefined);
    ret.addPropertyResult('dynamoDBv2', 'DynamoDBv2', properties.DynamoDBv2 != null ? CfnDetectorModelDynamoDBv2PropertyFromCloudFormation(properties.DynamoDBv2) : undefined);
    ret.addPropertyResult('firehose', 'Firehose', properties.Firehose != null ? CfnDetectorModelFirehosePropertyFromCloudFormation(properties.Firehose) : undefined);
    ret.addPropertyResult('iotEvents', 'IotEvents', properties.IotEvents != null ? CfnDetectorModelIotEventsPropertyFromCloudFormation(properties.IotEvents) : undefined);
    ret.addPropertyResult('iotSiteWise', 'IotSiteWise', properties.IotSiteWise != null ? CfnDetectorModelIotSiteWisePropertyFromCloudFormation(properties.IotSiteWise) : undefined);
    ret.addPropertyResult('iotTopicPublish', 'IotTopicPublish', properties.IotTopicPublish != null ? CfnDetectorModelIotTopicPublishPropertyFromCloudFormation(properties.IotTopicPublish) : undefined);
    ret.addPropertyResult('lambda', 'Lambda', properties.Lambda != null ? CfnDetectorModelLambdaPropertyFromCloudFormation(properties.Lambda) : undefined);
    ret.addPropertyResult('resetTimer', 'ResetTimer', properties.ResetTimer != null ? CfnDetectorModelResetTimerPropertyFromCloudFormation(properties.ResetTimer) : undefined);
    ret.addPropertyResult('setTimer', 'SetTimer', properties.SetTimer != null ? CfnDetectorModelSetTimerPropertyFromCloudFormation(properties.SetTimer) : undefined);
    ret.addPropertyResult('setVariable', 'SetVariable', properties.SetVariable != null ? CfnDetectorModelSetVariablePropertyFromCloudFormation(properties.SetVariable) : undefined);
    ret.addPropertyResult('sns', 'Sns', properties.Sns != null ? CfnDetectorModelSnsPropertyFromCloudFormation(properties.Sns) : undefined);
    ret.addPropertyResult('sqs', 'Sqs', properties.Sqs != null ? CfnDetectorModelSqsPropertyFromCloudFormation(properties.Sqs) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * A structure that contains timestamp information. For more information, see [TimeInNanos](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_TimeInNanos.html) in the *AWS IoT SiteWise API Reference* .
     *
     * You must use expressions for all parameters in `AssetPropertyTimestamp` . The expressions accept literals, operators, functions, references, and substitution templates.
     *
     * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `timeInSeconds` parameter can be `'1586400675'` .
     * - For references, you must specify either variables or input values. For example, the value for the `offsetInNanos` parameter can be `$variable.time` .
     * - For a substitution template, you must use `${}` , and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates.
     *
     * In the following example, the value for the `timeInSeconds` parameter uses a substitution template.
     *
     * `'${$input.TemperatureInput.sensorData.timestamp / 1000}'`
     *
     * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-assetpropertytimestamp.html
     */
    export interface AssetPropertyTimestampProperty {
        /**
         * The nanosecond offset converted from `timeInSeconds` . The valid range is between 0-999999999.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-assetpropertytimestamp.html#cfn-iotevents-detectormodel-assetpropertytimestamp-offsetinnanos
         */
        readonly offsetInNanos?: string;
        /**
         * The timestamp, in seconds, in the Unix epoch format. The valid range is between 1-31556889864403199.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-assetpropertytimestamp.html#cfn-iotevents-detectormodel-assetpropertytimestamp-timeinseconds
         */
        readonly timeInSeconds: string;
    }
}

/**
 * Determine whether the given properties match those of a `AssetPropertyTimestampProperty`
 *
 * @param properties - the TypeScript properties of a `AssetPropertyTimestampProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_AssetPropertyTimestampPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('offsetInNanos', cdk.validateString)(properties.offsetInNanos));
    errors.collect(cdk.propertyValidator('timeInSeconds', cdk.requiredValidator)(properties.timeInSeconds));
    errors.collect(cdk.propertyValidator('timeInSeconds', cdk.validateString)(properties.timeInSeconds));
    return errors.wrap('supplied properties not correct for "AssetPropertyTimestampProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.AssetPropertyTimestamp` resource
 *
 * @param properties - the TypeScript properties of a `AssetPropertyTimestampProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.AssetPropertyTimestamp` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelAssetPropertyTimestampPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_AssetPropertyTimestampPropertyValidator(properties).assertSuccess();
    return {
        OffsetInNanos: cdk.stringToCloudFormation(properties.offsetInNanos),
        TimeInSeconds: cdk.stringToCloudFormation(properties.timeInSeconds),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelAssetPropertyTimestampPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.AssetPropertyTimestampProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.AssetPropertyTimestampProperty>();
    ret.addPropertyResult('offsetInNanos', 'OffsetInNanos', properties.OffsetInNanos != null ? cfn_parse.FromCloudFormation.getString(properties.OffsetInNanos) : undefined);
    ret.addPropertyResult('timeInSeconds', 'TimeInSeconds', cfn_parse.FromCloudFormation.getString(properties.TimeInSeconds));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * A structure that contains value information. For more information, see [AssetPropertyValue](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_AssetPropertyValue.html) in the *AWS IoT SiteWise API Reference* .
     *
     * You must use expressions for all parameters in `AssetPropertyValue` . The expressions accept literals, operators, functions, references, and substitution templates.
     *
     * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `quality` parameter can be `'GOOD'` .
     * - For references, you must specify either variables or input values. For example, the value for the `quality` parameter can be `$input.TemperatureInput.sensorData.quality` .
     *
     * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-assetpropertyvalue.html
     */
    export interface AssetPropertyValueProperty {
        /**
         * The quality of the asset property value. The value must be `'GOOD'` , `'BAD'` , or `'UNCERTAIN'` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-assetpropertyvalue.html#cfn-iotevents-detectormodel-assetpropertyvalue-quality
         */
        readonly quality?: string;
        /**
         * The timestamp associated with the asset property value. The default is the current event time.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-assetpropertyvalue.html#cfn-iotevents-detectormodel-assetpropertyvalue-timestamp
         */
        readonly timestamp?: CfnDetectorModel.AssetPropertyTimestampProperty | cdk.IResolvable;
        /**
         * The value to send to an asset property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-assetpropertyvalue.html#cfn-iotevents-detectormodel-assetpropertyvalue-value
         */
        readonly value: CfnDetectorModel.AssetPropertyVariantProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `AssetPropertyValueProperty`
 *
 * @param properties - the TypeScript properties of a `AssetPropertyValueProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_AssetPropertyValuePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('quality', cdk.validateString)(properties.quality));
    errors.collect(cdk.propertyValidator('timestamp', CfnDetectorModel_AssetPropertyTimestampPropertyValidator)(properties.timestamp));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', CfnDetectorModel_AssetPropertyVariantPropertyValidator)(properties.value));
    return errors.wrap('supplied properties not correct for "AssetPropertyValueProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.AssetPropertyValue` resource
 *
 * @param properties - the TypeScript properties of a `AssetPropertyValueProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.AssetPropertyValue` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelAssetPropertyValuePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_AssetPropertyValuePropertyValidator(properties).assertSuccess();
    return {
        Quality: cdk.stringToCloudFormation(properties.quality),
        Timestamp: cfnDetectorModelAssetPropertyTimestampPropertyToCloudFormation(properties.timestamp),
        Value: cfnDetectorModelAssetPropertyVariantPropertyToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelAssetPropertyValuePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.AssetPropertyValueProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.AssetPropertyValueProperty>();
    ret.addPropertyResult('quality', 'Quality', properties.Quality != null ? cfn_parse.FromCloudFormation.getString(properties.Quality) : undefined);
    ret.addPropertyResult('timestamp', 'Timestamp', properties.Timestamp != null ? CfnDetectorModelAssetPropertyTimestampPropertyFromCloudFormation(properties.Timestamp) : undefined);
    ret.addPropertyResult('value', 'Value', CfnDetectorModelAssetPropertyVariantPropertyFromCloudFormation(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * A structure that contains an asset property value. For more information, see [Variant](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_Variant.html) in the *AWS IoT SiteWise API Reference* .
     *
     * You must use expressions for all parameters in `AssetPropertyVariant` . The expressions accept literals, operators, functions, references, and substitution templates.
     *
     * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `integerValue` parameter can be `'100'` .
     * - For references, you must specify either variables or parameters. For example, the value for the `booleanValue` parameter can be `$variable.offline` .
     * - For a substitution template, you must use `${}` , and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates.
     *
     * In the following example, the value for the `doubleValue` parameter uses a substitution template.
     *
     * `'${$input.TemperatureInput.sensorData.temperature * 6 / 5 + 32}'`
     *
     * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
     *
     * You must specify one of the following value types, depending on the `dataType` of the specified asset property. For more information, see [AssetProperty](https://docs.aws.amazon.com/iot-sitewise/latest/APIReference/API_AssetProperty.html) in the *AWS IoT SiteWise API Reference* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-assetpropertyvariant.html
     */
    export interface AssetPropertyVariantProperty {
        /**
         * The asset property value is a Boolean value that must be `'TRUE'` or `'FALSE'` . You must use an expression, and the evaluated result should be a Boolean value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-assetpropertyvariant.html#cfn-iotevents-detectormodel-assetpropertyvariant-booleanvalue
         */
        readonly booleanValue?: string;
        /**
         * The asset property value is a double. You must use an expression, and the evaluated result should be a double.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-assetpropertyvariant.html#cfn-iotevents-detectormodel-assetpropertyvariant-doublevalue
         */
        readonly doubleValue?: string;
        /**
         * The asset property value is an integer. You must use an expression, and the evaluated result should be an integer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-assetpropertyvariant.html#cfn-iotevents-detectormodel-assetpropertyvariant-integervalue
         */
        readonly integerValue?: string;
        /**
         * The asset property value is a string. You must use an expression, and the evaluated result should be a string.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-assetpropertyvariant.html#cfn-iotevents-detectormodel-assetpropertyvariant-stringvalue
         */
        readonly stringValue?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AssetPropertyVariantProperty`
 *
 * @param properties - the TypeScript properties of a `AssetPropertyVariantProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_AssetPropertyVariantPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('booleanValue', cdk.validateString)(properties.booleanValue));
    errors.collect(cdk.propertyValidator('doubleValue', cdk.validateString)(properties.doubleValue));
    errors.collect(cdk.propertyValidator('integerValue', cdk.validateString)(properties.integerValue));
    errors.collect(cdk.propertyValidator('stringValue', cdk.validateString)(properties.stringValue));
    return errors.wrap('supplied properties not correct for "AssetPropertyVariantProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.AssetPropertyVariant` resource
 *
 * @param properties - the TypeScript properties of a `AssetPropertyVariantProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.AssetPropertyVariant` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelAssetPropertyVariantPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_AssetPropertyVariantPropertyValidator(properties).assertSuccess();
    return {
        BooleanValue: cdk.stringToCloudFormation(properties.booleanValue),
        DoubleValue: cdk.stringToCloudFormation(properties.doubleValue),
        IntegerValue: cdk.stringToCloudFormation(properties.integerValue),
        StringValue: cdk.stringToCloudFormation(properties.stringValue),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelAssetPropertyVariantPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.AssetPropertyVariantProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.AssetPropertyVariantProperty>();
    ret.addPropertyResult('booleanValue', 'BooleanValue', properties.BooleanValue != null ? cfn_parse.FromCloudFormation.getString(properties.BooleanValue) : undefined);
    ret.addPropertyResult('doubleValue', 'DoubleValue', properties.DoubleValue != null ? cfn_parse.FromCloudFormation.getString(properties.DoubleValue) : undefined);
    ret.addPropertyResult('integerValue', 'IntegerValue', properties.IntegerValue != null ? cfn_parse.FromCloudFormation.getString(properties.IntegerValue) : undefined);
    ret.addPropertyResult('stringValue', 'StringValue', properties.StringValue != null ? cfn_parse.FromCloudFormation.getString(properties.StringValue) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Information needed to clear the timer.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-cleartimer.html
     */
    export interface ClearTimerProperty {
        /**
         * The name of the timer to clear.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-cleartimer.html#cfn-iotevents-detectormodel-cleartimer-timername
         */
        readonly timerName: string;
    }
}

/**
 * Determine whether the given properties match those of a `ClearTimerProperty`
 *
 * @param properties - the TypeScript properties of a `ClearTimerProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_ClearTimerPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('timerName', cdk.requiredValidator)(properties.timerName));
    errors.collect(cdk.propertyValidator('timerName', cdk.validateString)(properties.timerName));
    return errors.wrap('supplied properties not correct for "ClearTimerProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.ClearTimer` resource
 *
 * @param properties - the TypeScript properties of a `ClearTimerProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.ClearTimer` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelClearTimerPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_ClearTimerPropertyValidator(properties).assertSuccess();
    return {
        TimerName: cdk.stringToCloudFormation(properties.timerName),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelClearTimerPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.ClearTimerProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.ClearTimerProperty>();
    ret.addPropertyResult('timerName', 'TimerName', cfn_parse.FromCloudFormation.getString(properties.TimerName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Information that defines how a detector operates.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-detectormodeldefinition.html
     */
    export interface DetectorModelDefinitionProperty {
        /**
         * The state that is entered at the creation of each detector (instance).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-detectormodeldefinition.html#cfn-iotevents-detectormodel-detectormodeldefinition-initialstatename
         */
        readonly initialStateName: string;
        /**
         * Information about the states of the detector.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-detectormodeldefinition.html#cfn-iotevents-detectormodel-detectormodeldefinition-states
         */
        readonly states: Array<CfnDetectorModel.StateProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DetectorModelDefinitionProperty`
 *
 * @param properties - the TypeScript properties of a `DetectorModelDefinitionProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_DetectorModelDefinitionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('initialStateName', cdk.requiredValidator)(properties.initialStateName));
    errors.collect(cdk.propertyValidator('initialStateName', cdk.validateString)(properties.initialStateName));
    errors.collect(cdk.propertyValidator('states', cdk.requiredValidator)(properties.states));
    errors.collect(cdk.propertyValidator('states', cdk.listValidator(CfnDetectorModel_StatePropertyValidator))(properties.states));
    return errors.wrap('supplied properties not correct for "DetectorModelDefinitionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.DetectorModelDefinition` resource
 *
 * @param properties - the TypeScript properties of a `DetectorModelDefinitionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.DetectorModelDefinition` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelDetectorModelDefinitionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_DetectorModelDefinitionPropertyValidator(properties).assertSuccess();
    return {
        InitialStateName: cdk.stringToCloudFormation(properties.initialStateName),
        States: cdk.listMapper(cfnDetectorModelStatePropertyToCloudFormation)(properties.states),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelDetectorModelDefinitionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.DetectorModelDefinitionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.DetectorModelDefinitionProperty>();
    ret.addPropertyResult('initialStateName', 'InitialStateName', cfn_parse.FromCloudFormation.getString(properties.InitialStateName));
    ret.addPropertyResult('states', 'States', cfn_parse.FromCloudFormation.getArray(CfnDetectorModelStatePropertyFromCloudFormation)(properties.States));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Defines an action to write to the Amazon DynamoDB table that you created. The standard action payload contains all the information about the detector model instance and the event that triggered the action. You can customize the [payload](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Payload.html) . One column of the DynamoDB table receives all attribute-value pairs in the payload that you specify.
     *
     * You must use expressions for all parameters in `DynamoDBAction` . The expressions accept literals, operators, functions, references, and substitution templates.
     *
     * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `hashKeyType` parameter can be `'STRING'` .
     * - For references, you must specify either variables or input values. For example, the value for the `hashKeyField` parameter can be `$input.GreenhouseInput.name` .
     * - For a substitution template, you must use `${}` , and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates.
     *
     * In the following example, the value for the `hashKeyValue` parameter uses a substitution template.
     *
     * `'${$input.GreenhouseInput.temperature * 6 / 5 + 32} in Fahrenheit'`
     * - For a string concatenation, you must use `+` . A string concatenation can also contain a combination of literals, operators, functions, references, and substitution templates.
     *
     * In the following example, the value for the `tableName` parameter uses a string concatenation.
     *
     * `'GreenhouseTemperatureTable ' + $input.GreenhouseInput.date`
     *
     * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
     *
     * If the defined payload type is a string, `DynamoDBAction` writes non-JSON data to the DynamoDB table as binary data. The DynamoDB console displays the data as Base64-encoded text. The value for the `payloadField` parameter is `<payload-field>_raw` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-dynamodb.html
     */
    export interface DynamoDBProperty {
        /**
         * The name of the hash key (also called the partition key). The `hashKeyField` value must match the partition key of the target DynamoDB table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-dynamodb.html#cfn-iotevents-detectormodel-dynamodb-hashkeyfield
         */
        readonly hashKeyField: string;
        /**
         * The data type for the hash key (also called the partition key). You can specify the following values:
         *
         * - `'STRING'` - The hash key is a string.
         * - `'NUMBER'` - The hash key is a number.
         *
         * If you don't specify `hashKeyType` , the default value is `'STRING'` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-dynamodb.html#cfn-iotevents-detectormodel-dynamodb-hashkeytype
         */
        readonly hashKeyType?: string;
        /**
         * The value of the hash key (also called the partition key).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-dynamodb.html#cfn-iotevents-detectormodel-dynamodb-hashkeyvalue
         */
        readonly hashKeyValue: string;
        /**
         * The type of operation to perform. You can specify the following values:
         *
         * - `'INSERT'` - Insert data as a new item into the DynamoDB table. This item uses the specified hash key as a partition key. If you specified a range key, the item uses the range key as a sort key.
         * - `'UPDATE'` - Update an existing item of the DynamoDB table with new data. This item's partition key must match the specified hash key. If you specified a range key, the range key must match the item's sort key.
         * - `'DELETE'` - Delete an existing item of the DynamoDB table. This item's partition key must match the specified hash key. If you specified a range key, the range key must match the item's sort key.
         *
         * If you don't specify this parameter, AWS IoT Events triggers the `'INSERT'` operation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-dynamodb.html#cfn-iotevents-detectormodel-dynamodb-operation
         */
        readonly operation?: string;
        /**
         * Information needed to configure the payload.
         *
         * By default, AWS IoT Events generates a standard payload in JSON for any action. This action payload contains all attribute-value pairs that have the information about the detector model instance and the event triggered the action. To configure the action payload, you can use `contentExpression` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-dynamodb.html#cfn-iotevents-detectormodel-dynamodb-payload
         */
        readonly payload?: CfnDetectorModel.PayloadProperty | cdk.IResolvable;
        /**
         * The name of the DynamoDB column that receives the action payload.
         *
         * If you don't specify this parameter, the name of the DynamoDB column is `payload` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-dynamodb.html#cfn-iotevents-detectormodel-dynamodb-payloadfield
         */
        readonly payloadField?: string;
        /**
         * The name of the range key (also called the sort key). The `rangeKeyField` value must match the sort key of the target DynamoDB table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-dynamodb.html#cfn-iotevents-detectormodel-dynamodb-rangekeyfield
         */
        readonly rangeKeyField?: string;
        /**
         * The data type for the range key (also called the sort key), You can specify the following values:
         *
         * - `'STRING'` - The range key is a string.
         * - `'NUMBER'` - The range key is number.
         *
         * If you don't specify `rangeKeyField` , the default value is `'STRING'` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-dynamodb.html#cfn-iotevents-detectormodel-dynamodb-rangekeytype
         */
        readonly rangeKeyType?: string;
        /**
         * The value of the range key (also called the sort key).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-dynamodb.html#cfn-iotevents-detectormodel-dynamodb-rangekeyvalue
         */
        readonly rangeKeyValue?: string;
        /**
         * The name of the DynamoDB table. The `tableName` value must match the table name of the target DynamoDB table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-dynamodb.html#cfn-iotevents-detectormodel-dynamodb-tablename
         */
        readonly tableName: string;
    }
}

/**
 * Determine whether the given properties match those of a `DynamoDBProperty`
 *
 * @param properties - the TypeScript properties of a `DynamoDBProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_DynamoDBPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('hashKeyField', cdk.requiredValidator)(properties.hashKeyField));
    errors.collect(cdk.propertyValidator('hashKeyField', cdk.validateString)(properties.hashKeyField));
    errors.collect(cdk.propertyValidator('hashKeyType', cdk.validateString)(properties.hashKeyType));
    errors.collect(cdk.propertyValidator('hashKeyValue', cdk.requiredValidator)(properties.hashKeyValue));
    errors.collect(cdk.propertyValidator('hashKeyValue', cdk.validateString)(properties.hashKeyValue));
    errors.collect(cdk.propertyValidator('operation', cdk.validateString)(properties.operation));
    errors.collect(cdk.propertyValidator('payload', CfnDetectorModel_PayloadPropertyValidator)(properties.payload));
    errors.collect(cdk.propertyValidator('payloadField', cdk.validateString)(properties.payloadField));
    errors.collect(cdk.propertyValidator('rangeKeyField', cdk.validateString)(properties.rangeKeyField));
    errors.collect(cdk.propertyValidator('rangeKeyType', cdk.validateString)(properties.rangeKeyType));
    errors.collect(cdk.propertyValidator('rangeKeyValue', cdk.validateString)(properties.rangeKeyValue));
    errors.collect(cdk.propertyValidator('tableName', cdk.requiredValidator)(properties.tableName));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    return errors.wrap('supplied properties not correct for "DynamoDBProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.DynamoDB` resource
 *
 * @param properties - the TypeScript properties of a `DynamoDBProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.DynamoDB` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelDynamoDBPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_DynamoDBPropertyValidator(properties).assertSuccess();
    return {
        HashKeyField: cdk.stringToCloudFormation(properties.hashKeyField),
        HashKeyType: cdk.stringToCloudFormation(properties.hashKeyType),
        HashKeyValue: cdk.stringToCloudFormation(properties.hashKeyValue),
        Operation: cdk.stringToCloudFormation(properties.operation),
        Payload: cfnDetectorModelPayloadPropertyToCloudFormation(properties.payload),
        PayloadField: cdk.stringToCloudFormation(properties.payloadField),
        RangeKeyField: cdk.stringToCloudFormation(properties.rangeKeyField),
        RangeKeyType: cdk.stringToCloudFormation(properties.rangeKeyType),
        RangeKeyValue: cdk.stringToCloudFormation(properties.rangeKeyValue),
        TableName: cdk.stringToCloudFormation(properties.tableName),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelDynamoDBPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.DynamoDBProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.DynamoDBProperty>();
    ret.addPropertyResult('hashKeyField', 'HashKeyField', cfn_parse.FromCloudFormation.getString(properties.HashKeyField));
    ret.addPropertyResult('hashKeyType', 'HashKeyType', properties.HashKeyType != null ? cfn_parse.FromCloudFormation.getString(properties.HashKeyType) : undefined);
    ret.addPropertyResult('hashKeyValue', 'HashKeyValue', cfn_parse.FromCloudFormation.getString(properties.HashKeyValue));
    ret.addPropertyResult('operation', 'Operation', properties.Operation != null ? cfn_parse.FromCloudFormation.getString(properties.Operation) : undefined);
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnDetectorModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addPropertyResult('payloadField', 'PayloadField', properties.PayloadField != null ? cfn_parse.FromCloudFormation.getString(properties.PayloadField) : undefined);
    ret.addPropertyResult('rangeKeyField', 'RangeKeyField', properties.RangeKeyField != null ? cfn_parse.FromCloudFormation.getString(properties.RangeKeyField) : undefined);
    ret.addPropertyResult('rangeKeyType', 'RangeKeyType', properties.RangeKeyType != null ? cfn_parse.FromCloudFormation.getString(properties.RangeKeyType) : undefined);
    ret.addPropertyResult('rangeKeyValue', 'RangeKeyValue', properties.RangeKeyValue != null ? cfn_parse.FromCloudFormation.getString(properties.RangeKeyValue) : undefined);
    ret.addPropertyResult('tableName', 'TableName', cfn_parse.FromCloudFormation.getString(properties.TableName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Defines an action to write to the Amazon DynamoDB table that you created. The default action payload contains all the information about the detector model instance and the event that triggered the action. You can customize the [payload](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Payload.html) . A separate column of the DynamoDB table receives one attribute-value pair in the payload that you specify.
     *
     * You must use expressions for all parameters in `DynamoDBv2Action` . The expressions accept literals, operators, functions, references, and substitution templates.
     *
     * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `tableName` parameter can be `'GreenhouseTemperatureTable'` .
     * - For references, you must specify either variables or input values. For example, the value for the `tableName` parameter can be `$variable.ddbtableName` .
     * - For a substitution template, you must use `${}` , and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates.
     *
     * In the following example, the value for the `contentExpression` parameter in `Payload` uses a substitution template.
     *
     * `'{\"sensorID\": \"${$input.GreenhouseInput.sensor_id}\", \"temperature\": \"${$input.GreenhouseInput.temperature * 9 / 5 + 32}\"}'`
     * - For a string concatenation, you must use `+` . A string concatenation can also contain a combination of literals, operators, functions, references, and substitution templates.
     *
     * In the following example, the value for the `tableName` parameter uses a string concatenation.
     *
     * `'GreenhouseTemperatureTable ' + $input.GreenhouseInput.date`
     *
     * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
     *
     * The value for the `type` parameter in `Payload` must be `JSON` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-dynamodbv2.html
     */
    export interface DynamoDBv2Property {
        /**
         * Information needed to configure the payload.
         *
         * By default, AWS IoT Events generates a standard payload in JSON for any action. This action payload contains all attribute-value pairs that have the information about the detector model instance and the event triggered the action. To configure the action payload, you can use `contentExpression` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-dynamodbv2.html#cfn-iotevents-detectormodel-dynamodbv2-payload
         */
        readonly payload?: CfnDetectorModel.PayloadProperty | cdk.IResolvable;
        /**
         * The name of the DynamoDB table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-dynamodbv2.html#cfn-iotevents-detectormodel-dynamodbv2-tablename
         */
        readonly tableName: string;
    }
}

/**
 * Determine whether the given properties match those of a `DynamoDBv2Property`
 *
 * @param properties - the TypeScript properties of a `DynamoDBv2Property`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_DynamoDBv2PropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('payload', CfnDetectorModel_PayloadPropertyValidator)(properties.payload));
    errors.collect(cdk.propertyValidator('tableName', cdk.requiredValidator)(properties.tableName));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    return errors.wrap('supplied properties not correct for "DynamoDBv2Property"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.DynamoDBv2` resource
 *
 * @param properties - the TypeScript properties of a `DynamoDBv2Property`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.DynamoDBv2` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelDynamoDBv2PropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_DynamoDBv2PropertyValidator(properties).assertSuccess();
    return {
        Payload: cfnDetectorModelPayloadPropertyToCloudFormation(properties.payload),
        TableName: cdk.stringToCloudFormation(properties.tableName),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelDynamoDBv2PropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.DynamoDBv2Property | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.DynamoDBv2Property>();
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnDetectorModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addPropertyResult('tableName', 'TableName', cfn_parse.FromCloudFormation.getString(properties.TableName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Specifies the `actions` to be performed when the `condition` evaluates to TRUE.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-event.html
     */
    export interface EventProperty {
        /**
         * The actions to be performed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-event.html#cfn-iotevents-detectormodel-event-actions
         */
        readonly actions?: Array<CfnDetectorModel.ActionProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * Optional. The Boolean expression that, when TRUE, causes the `actions` to be performed. If not present, the actions are performed (=TRUE). If the expression result is not a Boolean value, the actions are not performed (=FALSE).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-event.html#cfn-iotevents-detectormodel-event-condition
         */
        readonly condition?: string;
        /**
         * The name of the event.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-event.html#cfn-iotevents-detectormodel-event-eventname
         */
        readonly eventName: string;
    }
}

/**
 * Determine whether the given properties match those of a `EventProperty`
 *
 * @param properties - the TypeScript properties of a `EventProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_EventPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('actions', cdk.listValidator(CfnDetectorModel_ActionPropertyValidator))(properties.actions));
    errors.collect(cdk.propertyValidator('condition', cdk.validateString)(properties.condition));
    errors.collect(cdk.propertyValidator('eventName', cdk.requiredValidator)(properties.eventName));
    errors.collect(cdk.propertyValidator('eventName', cdk.validateString)(properties.eventName));
    return errors.wrap('supplied properties not correct for "EventProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.Event` resource
 *
 * @param properties - the TypeScript properties of a `EventProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.Event` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelEventPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_EventPropertyValidator(properties).assertSuccess();
    return {
        Actions: cdk.listMapper(cfnDetectorModelActionPropertyToCloudFormation)(properties.actions),
        Condition: cdk.stringToCloudFormation(properties.condition),
        EventName: cdk.stringToCloudFormation(properties.eventName),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelEventPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.EventProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.EventProperty>();
    ret.addPropertyResult('actions', 'Actions', properties.Actions != null ? cfn_parse.FromCloudFormation.getArray(CfnDetectorModelActionPropertyFromCloudFormation)(properties.Actions) : undefined);
    ret.addPropertyResult('condition', 'Condition', properties.Condition != null ? cfn_parse.FromCloudFormation.getString(properties.Condition) : undefined);
    ret.addPropertyResult('eventName', 'EventName', cfn_parse.FromCloudFormation.getString(properties.EventName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Sends information about the detector model instance and the event that triggered the action to an Amazon Kinesis Data Firehose delivery stream.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-firehose.html
     */
    export interface FirehoseProperty {
        /**
         * The name of the Kinesis Data Firehose delivery stream where the data is written.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-firehose.html#cfn-iotevents-detectormodel-firehose-deliverystreamname
         */
        readonly deliveryStreamName: string;
        /**
         * You can configure the action payload when you send a message to an Amazon Kinesis Data Firehose delivery stream.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-firehose.html#cfn-iotevents-detectormodel-firehose-payload
         */
        readonly payload?: CfnDetectorModel.PayloadProperty | cdk.IResolvable;
        /**
         * A character separator that is used to separate records written to the Kinesis Data Firehose delivery stream. Valid values are: '\n' (newline), '\t' (tab), '\r\n' (Windows newline), ',' (comma).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-firehose.html#cfn-iotevents-detectormodel-firehose-separator
         */
        readonly separator?: string;
    }
}

/**
 * Determine whether the given properties match those of a `FirehoseProperty`
 *
 * @param properties - the TypeScript properties of a `FirehoseProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_FirehosePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('deliveryStreamName', cdk.requiredValidator)(properties.deliveryStreamName));
    errors.collect(cdk.propertyValidator('deliveryStreamName', cdk.validateString)(properties.deliveryStreamName));
    errors.collect(cdk.propertyValidator('payload', CfnDetectorModel_PayloadPropertyValidator)(properties.payload));
    errors.collect(cdk.propertyValidator('separator', cdk.validateString)(properties.separator));
    return errors.wrap('supplied properties not correct for "FirehoseProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.Firehose` resource
 *
 * @param properties - the TypeScript properties of a `FirehoseProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.Firehose` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelFirehosePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_FirehosePropertyValidator(properties).assertSuccess();
    return {
        DeliveryStreamName: cdk.stringToCloudFormation(properties.deliveryStreamName),
        Payload: cfnDetectorModelPayloadPropertyToCloudFormation(properties.payload),
        Separator: cdk.stringToCloudFormation(properties.separator),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelFirehosePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.FirehoseProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.FirehoseProperty>();
    ret.addPropertyResult('deliveryStreamName', 'DeliveryStreamName', cfn_parse.FromCloudFormation.getString(properties.DeliveryStreamName));
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnDetectorModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addPropertyResult('separator', 'Separator', properties.Separator != null ? cfn_parse.FromCloudFormation.getString(properties.Separator) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Sends an AWS IoT Events input, passing in information about the detector model instance and the event that triggered the action.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-iotevents.html
     */
    export interface IotEventsProperty {
        /**
         * The name of the AWS IoT Events input where the data is sent.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-iotevents.html#cfn-iotevents-detectormodel-iotevents-inputname
         */
        readonly inputName: string;
        /**
         * You can configure the action payload when you send a message to an AWS IoT Events input.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-iotevents.html#cfn-iotevents-detectormodel-iotevents-payload
         */
        readonly payload?: CfnDetectorModel.PayloadProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `IotEventsProperty`
 *
 * @param properties - the TypeScript properties of a `IotEventsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_IotEventsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('inputName', cdk.requiredValidator)(properties.inputName));
    errors.collect(cdk.propertyValidator('inputName', cdk.validateString)(properties.inputName));
    errors.collect(cdk.propertyValidator('payload', CfnDetectorModel_PayloadPropertyValidator)(properties.payload));
    return errors.wrap('supplied properties not correct for "IotEventsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.IotEvents` resource
 *
 * @param properties - the TypeScript properties of a `IotEventsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.IotEvents` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelIotEventsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_IotEventsPropertyValidator(properties).assertSuccess();
    return {
        InputName: cdk.stringToCloudFormation(properties.inputName),
        Payload: cfnDetectorModelPayloadPropertyToCloudFormation(properties.payload),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelIotEventsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.IotEventsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.IotEventsProperty>();
    ret.addPropertyResult('inputName', 'InputName', cfn_parse.FromCloudFormation.getString(properties.InputName));
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnDetectorModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Sends information about the detector model instance and the event that triggered the action to a specified asset property in AWS IoT SiteWise .
     *
     * You must use expressions for all parameters in `IotSiteWiseAction` . The expressions accept literals, operators, functions, references, and substitutions templates.
     *
     * **Examples** - For literal values, the expressions must contain single quotes. For example, the value for the `propertyAlias` parameter can be `'/company/windfarm/3/turbine/7/temperature'` .
     * - For references, you must specify either variables or input values. For example, the value for the `assetId` parameter can be `$input.TurbineInput.assetId1` .
     * - For a substitution template, you must use `${}` , and the template must be in single quotes. A substitution template can also contain a combination of literals, operators, functions, references, and substitution templates.
     *
     * In the following example, the value for the `propertyAlias` parameter uses a substitution template.
     *
     * `'company/windfarm/${$input.TemperatureInput.sensorData.windfarmID}/turbine/ ${$input.TemperatureInput.sensorData.turbineID}/temperature'`
     *
     * You must specify either `propertyAlias` or both `assetId` and `propertyId` to identify the target asset property in AWS IoT SiteWise .
     *
     * For more information, see [Expressions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-expressions.html) in the *AWS IoT Events Developer Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-iotsitewise.html
     */
    export interface IotSiteWiseProperty {
        /**
         * The ID of the asset that has the specified property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-iotsitewise.html#cfn-iotevents-detectormodel-iotsitewise-assetid
         */
        readonly assetId?: string;
        /**
         * A unique identifier for this entry. You can use the entry ID to track which data entry causes an error in case of failure. The default is a new unique identifier.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-iotsitewise.html#cfn-iotevents-detectormodel-iotsitewise-entryid
         */
        readonly entryId?: string;
        /**
         * The alias of the asset property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-iotsitewise.html#cfn-iotevents-detectormodel-iotsitewise-propertyalias
         */
        readonly propertyAlias?: string;
        /**
         * The ID of the asset property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-iotsitewise.html#cfn-iotevents-detectormodel-iotsitewise-propertyid
         */
        readonly propertyId?: string;
        /**
         * The value to send to the asset property. This value contains timestamp, quality, and value (TQV) information.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-iotsitewise.html#cfn-iotevents-detectormodel-iotsitewise-propertyvalue
         */
        readonly propertyValue: CfnDetectorModel.AssetPropertyValueProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `IotSiteWiseProperty`
 *
 * @param properties - the TypeScript properties of a `IotSiteWiseProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_IotSiteWisePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('assetId', cdk.validateString)(properties.assetId));
    errors.collect(cdk.propertyValidator('entryId', cdk.validateString)(properties.entryId));
    errors.collect(cdk.propertyValidator('propertyAlias', cdk.validateString)(properties.propertyAlias));
    errors.collect(cdk.propertyValidator('propertyId', cdk.validateString)(properties.propertyId));
    errors.collect(cdk.propertyValidator('propertyValue', cdk.requiredValidator)(properties.propertyValue));
    errors.collect(cdk.propertyValidator('propertyValue', CfnDetectorModel_AssetPropertyValuePropertyValidator)(properties.propertyValue));
    return errors.wrap('supplied properties not correct for "IotSiteWiseProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.IotSiteWise` resource
 *
 * @param properties - the TypeScript properties of a `IotSiteWiseProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.IotSiteWise` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelIotSiteWisePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_IotSiteWisePropertyValidator(properties).assertSuccess();
    return {
        AssetId: cdk.stringToCloudFormation(properties.assetId),
        EntryId: cdk.stringToCloudFormation(properties.entryId),
        PropertyAlias: cdk.stringToCloudFormation(properties.propertyAlias),
        PropertyId: cdk.stringToCloudFormation(properties.propertyId),
        PropertyValue: cfnDetectorModelAssetPropertyValuePropertyToCloudFormation(properties.propertyValue),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelIotSiteWisePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.IotSiteWiseProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.IotSiteWiseProperty>();
    ret.addPropertyResult('assetId', 'AssetId', properties.AssetId != null ? cfn_parse.FromCloudFormation.getString(properties.AssetId) : undefined);
    ret.addPropertyResult('entryId', 'EntryId', properties.EntryId != null ? cfn_parse.FromCloudFormation.getString(properties.EntryId) : undefined);
    ret.addPropertyResult('propertyAlias', 'PropertyAlias', properties.PropertyAlias != null ? cfn_parse.FromCloudFormation.getString(properties.PropertyAlias) : undefined);
    ret.addPropertyResult('propertyId', 'PropertyId', properties.PropertyId != null ? cfn_parse.FromCloudFormation.getString(properties.PropertyId) : undefined);
    ret.addPropertyResult('propertyValue', 'PropertyValue', CfnDetectorModelAssetPropertyValuePropertyFromCloudFormation(properties.PropertyValue));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Information required to publish the MQTT message through the AWS IoT message broker.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-iottopicpublish.html
     */
    export interface IotTopicPublishProperty {
        /**
         * The MQTT topic of the message. You can use a string expression that includes variables ( `$variable.<variable-name>` ) and input values ( `$input.<input-name>.<path-to-datum>` ) as the topic string.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-iottopicpublish.html#cfn-iotevents-detectormodel-iottopicpublish-mqtttopic
         */
        readonly mqttTopic: string;
        /**
         * You can configure the action payload when you publish a message to an AWS IoT Core topic.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-iottopicpublish.html#cfn-iotevents-detectormodel-iottopicpublish-payload
         */
        readonly payload?: CfnDetectorModel.PayloadProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `IotTopicPublishProperty`
 *
 * @param properties - the TypeScript properties of a `IotTopicPublishProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_IotTopicPublishPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('mqttTopic', cdk.requiredValidator)(properties.mqttTopic));
    errors.collect(cdk.propertyValidator('mqttTopic', cdk.validateString)(properties.mqttTopic));
    errors.collect(cdk.propertyValidator('payload', CfnDetectorModel_PayloadPropertyValidator)(properties.payload));
    return errors.wrap('supplied properties not correct for "IotTopicPublishProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.IotTopicPublish` resource
 *
 * @param properties - the TypeScript properties of a `IotTopicPublishProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.IotTopicPublish` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelIotTopicPublishPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_IotTopicPublishPropertyValidator(properties).assertSuccess();
    return {
        MqttTopic: cdk.stringToCloudFormation(properties.mqttTopic),
        Payload: cfnDetectorModelPayloadPropertyToCloudFormation(properties.payload),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelIotTopicPublishPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.IotTopicPublishProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.IotTopicPublishProperty>();
    ret.addPropertyResult('mqttTopic', 'MqttTopic', cfn_parse.FromCloudFormation.getString(properties.MqttTopic));
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnDetectorModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Calls a Lambda function, passing in information about the detector model instance and the event that triggered the action.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-lambda.html
     */
    export interface LambdaProperty {
        /**
         * The ARN of the Lambda function that is executed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-lambda.html#cfn-iotevents-detectormodel-lambda-functionarn
         */
        readonly functionArn: string;
        /**
         * You can configure the action payload when you send a message to a Lambda function.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-lambda.html#cfn-iotevents-detectormodel-lambda-payload
         */
        readonly payload?: CfnDetectorModel.PayloadProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `LambdaProperty`
 *
 * @param properties - the TypeScript properties of a `LambdaProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_LambdaPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('functionArn', cdk.requiredValidator)(properties.functionArn));
    errors.collect(cdk.propertyValidator('functionArn', cdk.validateString)(properties.functionArn));
    errors.collect(cdk.propertyValidator('payload', CfnDetectorModel_PayloadPropertyValidator)(properties.payload));
    return errors.wrap('supplied properties not correct for "LambdaProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.Lambda` resource
 *
 * @param properties - the TypeScript properties of a `LambdaProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.Lambda` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelLambdaPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_LambdaPropertyValidator(properties).assertSuccess();
    return {
        FunctionArn: cdk.stringToCloudFormation(properties.functionArn),
        Payload: cfnDetectorModelPayloadPropertyToCloudFormation(properties.payload),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelLambdaPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.LambdaProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.LambdaProperty>();
    ret.addPropertyResult('functionArn', 'FunctionArn', cfn_parse.FromCloudFormation.getString(properties.FunctionArn));
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnDetectorModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * When entering this state, perform these `actions` if the `condition` is TRUE.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-onenter.html
     */
    export interface OnEnterProperty {
        /**
         * Specifies the actions that are performed when the state is entered and the `condition` is `TRUE` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-onenter.html#cfn-iotevents-detectormodel-onenter-events
         */
        readonly events?: Array<CfnDetectorModel.EventProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `OnEnterProperty`
 *
 * @param properties - the TypeScript properties of a `OnEnterProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_OnEnterPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('events', cdk.listValidator(CfnDetectorModel_EventPropertyValidator))(properties.events));
    return errors.wrap('supplied properties not correct for "OnEnterProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.OnEnter` resource
 *
 * @param properties - the TypeScript properties of a `OnEnterProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.OnEnter` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelOnEnterPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_OnEnterPropertyValidator(properties).assertSuccess();
    return {
        Events: cdk.listMapper(cfnDetectorModelEventPropertyToCloudFormation)(properties.events),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelOnEnterPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.OnEnterProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.OnEnterProperty>();
    ret.addPropertyResult('events', 'Events', properties.Events != null ? cfn_parse.FromCloudFormation.getArray(CfnDetectorModelEventPropertyFromCloudFormation)(properties.Events) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * When exiting this state, perform these `actions` if the specified `condition` is `TRUE` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-onexit.html
     */
    export interface OnExitProperty {
        /**
         * Specifies the `actions` that are performed when the state is exited and the `condition` is `TRUE` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-onexit.html#cfn-iotevents-detectormodel-onexit-events
         */
        readonly events?: Array<CfnDetectorModel.EventProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `OnExitProperty`
 *
 * @param properties - the TypeScript properties of a `OnExitProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_OnExitPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('events', cdk.listValidator(CfnDetectorModel_EventPropertyValidator))(properties.events));
    return errors.wrap('supplied properties not correct for "OnExitProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.OnExit` resource
 *
 * @param properties - the TypeScript properties of a `OnExitProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.OnExit` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelOnExitPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_OnExitPropertyValidator(properties).assertSuccess();
    return {
        Events: cdk.listMapper(cfnDetectorModelEventPropertyToCloudFormation)(properties.events),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelOnExitPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.OnExitProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.OnExitProperty>();
    ret.addPropertyResult('events', 'Events', properties.Events != null ? cfn_parse.FromCloudFormation.getArray(CfnDetectorModelEventPropertyFromCloudFormation)(properties.Events) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Specifies the actions performed when the `condition` evaluates to TRUE.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-oninput.html
     */
    export interface OnInputProperty {
        /**
         * Specifies the actions performed when the `condition` evaluates to TRUE.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-oninput.html#cfn-iotevents-detectormodel-oninput-events
         */
        readonly events?: Array<CfnDetectorModel.EventProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * Specifies the actions performed, and the next state entered, when a `condition` evaluates to TRUE.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-oninput.html#cfn-iotevents-detectormodel-oninput-transitionevents
         */
        readonly transitionEvents?: Array<CfnDetectorModel.TransitionEventProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `OnInputProperty`
 *
 * @param properties - the TypeScript properties of a `OnInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_OnInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('events', cdk.listValidator(CfnDetectorModel_EventPropertyValidator))(properties.events));
    errors.collect(cdk.propertyValidator('transitionEvents', cdk.listValidator(CfnDetectorModel_TransitionEventPropertyValidator))(properties.transitionEvents));
    return errors.wrap('supplied properties not correct for "OnInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.OnInput` resource
 *
 * @param properties - the TypeScript properties of a `OnInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.OnInput` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelOnInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_OnInputPropertyValidator(properties).assertSuccess();
    return {
        Events: cdk.listMapper(cfnDetectorModelEventPropertyToCloudFormation)(properties.events),
        TransitionEvents: cdk.listMapper(cfnDetectorModelTransitionEventPropertyToCloudFormation)(properties.transitionEvents),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelOnInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.OnInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.OnInputProperty>();
    ret.addPropertyResult('events', 'Events', properties.Events != null ? cfn_parse.FromCloudFormation.getArray(CfnDetectorModelEventPropertyFromCloudFormation)(properties.Events) : undefined);
    ret.addPropertyResult('transitionEvents', 'TransitionEvents', properties.TransitionEvents != null ? cfn_parse.FromCloudFormation.getArray(CfnDetectorModelTransitionEventPropertyFromCloudFormation)(properties.TransitionEvents) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Information needed to configure the payload.
     *
     * By default, AWS IoT Events generates a standard payload in JSON for any action. This action payload contains all attribute-value pairs that have the information about the detector model instance and the event triggered the action. To configure the action payload, you can use `contentExpression` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-payload.html
     */
    export interface PayloadProperty {
        /**
         * The content of the payload. You can use a string expression that includes quoted strings ( `'<string>'` ), variables ( `$variable.<variable-name>` ), input values ( `$input.<input-name>.<path-to-datum>` ), string concatenations, and quoted strings that contain `${}` as the content. The recommended maximum size of a content expression is 1 KB.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-payload.html#cfn-iotevents-detectormodel-payload-contentexpression
         */
        readonly contentExpression: string;
        /**
         * The value of the payload type can be either `STRING` or `JSON` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-payload.html#cfn-iotevents-detectormodel-payload-type
         */
        readonly type: string;
    }
}

/**
 * Determine whether the given properties match those of a `PayloadProperty`
 *
 * @param properties - the TypeScript properties of a `PayloadProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_PayloadPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('contentExpression', cdk.requiredValidator)(properties.contentExpression));
    errors.collect(cdk.propertyValidator('contentExpression', cdk.validateString)(properties.contentExpression));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "PayloadProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.Payload` resource
 *
 * @param properties - the TypeScript properties of a `PayloadProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.Payload` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelPayloadPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_PayloadPropertyValidator(properties).assertSuccess();
    return {
        ContentExpression: cdk.stringToCloudFormation(properties.contentExpression),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelPayloadPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.PayloadProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.PayloadProperty>();
    ret.addPropertyResult('contentExpression', 'ContentExpression', cfn_parse.FromCloudFormation.getString(properties.ContentExpression));
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Information required to reset the timer. The timer is reset to the previously evaluated result of the duration. The duration expression isn't reevaluated when you reset the timer.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-resettimer.html
     */
    export interface ResetTimerProperty {
        /**
         * The name of the timer to reset.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-resettimer.html#cfn-iotevents-detectormodel-resettimer-timername
         */
        readonly timerName: string;
    }
}

/**
 * Determine whether the given properties match those of a `ResetTimerProperty`
 *
 * @param properties - the TypeScript properties of a `ResetTimerProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_ResetTimerPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('timerName', cdk.requiredValidator)(properties.timerName));
    errors.collect(cdk.propertyValidator('timerName', cdk.validateString)(properties.timerName));
    return errors.wrap('supplied properties not correct for "ResetTimerProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.ResetTimer` resource
 *
 * @param properties - the TypeScript properties of a `ResetTimerProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.ResetTimer` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelResetTimerPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_ResetTimerPropertyValidator(properties).assertSuccess();
    return {
        TimerName: cdk.stringToCloudFormation(properties.timerName),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelResetTimerPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.ResetTimerProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.ResetTimerProperty>();
    ret.addPropertyResult('timerName', 'TimerName', cfn_parse.FromCloudFormation.getString(properties.TimerName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Information needed to set the timer.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-settimer.html
     */
    export interface SetTimerProperty {
        /**
         * The duration of the timer, in seconds. You can use a string expression that includes numbers, variables ( `$variable.<variable-name>` ), and input values ( `$input.<input-name>.<path-to-datum>` ) as the duration. The range of the duration is 1-31622400 seconds. To ensure accuracy, the minimum duration is 60 seconds. The evaluated result of the duration is rounded down to the nearest whole number.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-settimer.html#cfn-iotevents-detectormodel-settimer-durationexpression
         */
        readonly durationExpression?: string;
        /**
         * The number of seconds until the timer expires. The minimum value is 60 seconds to ensure accuracy. The maximum value is 31622400 seconds.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-settimer.html#cfn-iotevents-detectormodel-settimer-seconds
         */
        readonly seconds?: number;
        /**
         * The name of the timer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-settimer.html#cfn-iotevents-detectormodel-settimer-timername
         */
        readonly timerName: string;
    }
}

/**
 * Determine whether the given properties match those of a `SetTimerProperty`
 *
 * @param properties - the TypeScript properties of a `SetTimerProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_SetTimerPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('durationExpression', cdk.validateString)(properties.durationExpression));
    errors.collect(cdk.propertyValidator('seconds', cdk.validateNumber)(properties.seconds));
    errors.collect(cdk.propertyValidator('timerName', cdk.requiredValidator)(properties.timerName));
    errors.collect(cdk.propertyValidator('timerName', cdk.validateString)(properties.timerName));
    return errors.wrap('supplied properties not correct for "SetTimerProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.SetTimer` resource
 *
 * @param properties - the TypeScript properties of a `SetTimerProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.SetTimer` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelSetTimerPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_SetTimerPropertyValidator(properties).assertSuccess();
    return {
        DurationExpression: cdk.stringToCloudFormation(properties.durationExpression),
        Seconds: cdk.numberToCloudFormation(properties.seconds),
        TimerName: cdk.stringToCloudFormation(properties.timerName),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelSetTimerPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.SetTimerProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.SetTimerProperty>();
    ret.addPropertyResult('durationExpression', 'DurationExpression', properties.DurationExpression != null ? cfn_parse.FromCloudFormation.getString(properties.DurationExpression) : undefined);
    ret.addPropertyResult('seconds', 'Seconds', properties.Seconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.Seconds) : undefined);
    ret.addPropertyResult('timerName', 'TimerName', cfn_parse.FromCloudFormation.getString(properties.TimerName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Information about the variable and its new value.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-setvariable.html
     */
    export interface SetVariableProperty {
        /**
         * The new value of the variable.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-setvariable.html#cfn-iotevents-detectormodel-setvariable-value
         */
        readonly value: string;
        /**
         * The name of the variable.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-setvariable.html#cfn-iotevents-detectormodel-setvariable-variablename
         */
        readonly variableName: string;
    }
}

/**
 * Determine whether the given properties match those of a `SetVariableProperty`
 *
 * @param properties - the TypeScript properties of a `SetVariableProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_SetVariablePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    errors.collect(cdk.propertyValidator('variableName', cdk.requiredValidator)(properties.variableName));
    errors.collect(cdk.propertyValidator('variableName', cdk.validateString)(properties.variableName));
    return errors.wrap('supplied properties not correct for "SetVariableProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.SetVariable` resource
 *
 * @param properties - the TypeScript properties of a `SetVariableProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.SetVariable` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelSetVariablePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_SetVariablePropertyValidator(properties).assertSuccess();
    return {
        Value: cdk.stringToCloudFormation(properties.value),
        VariableName: cdk.stringToCloudFormation(properties.variableName),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelSetVariablePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.SetVariableProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.SetVariableProperty>();
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addPropertyResult('variableName', 'VariableName', cfn_parse.FromCloudFormation.getString(properties.VariableName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Information required to publish the Amazon SNS message.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-sns.html
     */
    export interface SnsProperty {
        /**
         * You can configure the action payload when you send a message as an Amazon SNS push notification.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-sns.html#cfn-iotevents-detectormodel-sns-payload
         */
        readonly payload?: CfnDetectorModel.PayloadProperty | cdk.IResolvable;
        /**
         * The ARN of the Amazon SNS target where the message is sent.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-sns.html#cfn-iotevents-detectormodel-sns-targetarn
         */
        readonly targetArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `SnsProperty`
 *
 * @param properties - the TypeScript properties of a `SnsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_SnsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('payload', CfnDetectorModel_PayloadPropertyValidator)(properties.payload));
    errors.collect(cdk.propertyValidator('targetArn', cdk.requiredValidator)(properties.targetArn));
    errors.collect(cdk.propertyValidator('targetArn', cdk.validateString)(properties.targetArn));
    return errors.wrap('supplied properties not correct for "SnsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.Sns` resource
 *
 * @param properties - the TypeScript properties of a `SnsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.Sns` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelSnsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_SnsPropertyValidator(properties).assertSuccess();
    return {
        Payload: cfnDetectorModelPayloadPropertyToCloudFormation(properties.payload),
        TargetArn: cdk.stringToCloudFormation(properties.targetArn),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelSnsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.SnsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.SnsProperty>();
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnDetectorModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addPropertyResult('targetArn', 'TargetArn', cfn_parse.FromCloudFormation.getString(properties.TargetArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Sends information about the detector model instance and the event that triggered the action to an Amazon SQS queue.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-sqs.html
     */
    export interface SqsProperty {
        /**
         * You can configure the action payload when you send a message to an Amazon SQS queue.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-sqs.html#cfn-iotevents-detectormodel-sqs-payload
         */
        readonly payload?: CfnDetectorModel.PayloadProperty | cdk.IResolvable;
        /**
         * The URL of the SQS queue where the data is written.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-sqs.html#cfn-iotevents-detectormodel-sqs-queueurl
         */
        readonly queueUrl: string;
        /**
         * Set this to TRUE if you want the data to be base-64 encoded before it is written to the queue. Otherwise, set this to FALSE.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-sqs.html#cfn-iotevents-detectormodel-sqs-usebase64
         */
        readonly useBase64?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `SqsProperty`
 *
 * @param properties - the TypeScript properties of a `SqsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_SqsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('payload', CfnDetectorModel_PayloadPropertyValidator)(properties.payload));
    errors.collect(cdk.propertyValidator('queueUrl', cdk.requiredValidator)(properties.queueUrl));
    errors.collect(cdk.propertyValidator('queueUrl', cdk.validateString)(properties.queueUrl));
    errors.collect(cdk.propertyValidator('useBase64', cdk.validateBoolean)(properties.useBase64));
    return errors.wrap('supplied properties not correct for "SqsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.Sqs` resource
 *
 * @param properties - the TypeScript properties of a `SqsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.Sqs` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelSqsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_SqsPropertyValidator(properties).assertSuccess();
    return {
        Payload: cfnDetectorModelPayloadPropertyToCloudFormation(properties.payload),
        QueueUrl: cdk.stringToCloudFormation(properties.queueUrl),
        UseBase64: cdk.booleanToCloudFormation(properties.useBase64),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelSqsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.SqsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.SqsProperty>();
    ret.addPropertyResult('payload', 'Payload', properties.Payload != null ? CfnDetectorModelPayloadPropertyFromCloudFormation(properties.Payload) : undefined);
    ret.addPropertyResult('queueUrl', 'QueueUrl', cfn_parse.FromCloudFormation.getString(properties.QueueUrl));
    ret.addPropertyResult('useBase64', 'UseBase64', properties.UseBase64 != null ? cfn_parse.FromCloudFormation.getBoolean(properties.UseBase64) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Information that defines a state of a detector.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-state.html
     */
    export interface StateProperty {
        /**
         * When entering this state, perform these `actions` if the `condition` is TRUE.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-state.html#cfn-iotevents-detectormodel-state-onenter
         */
        readonly onEnter?: CfnDetectorModel.OnEnterProperty | cdk.IResolvable;
        /**
         * When exiting this state, perform these `actions` if the specified `condition` is `TRUE` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-state.html#cfn-iotevents-detectormodel-state-onexit
         */
        readonly onExit?: CfnDetectorModel.OnExitProperty | cdk.IResolvable;
        /**
         * When an input is received and the `condition` is TRUE, perform the specified `actions` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-state.html#cfn-iotevents-detectormodel-state-oninput
         */
        readonly onInput?: CfnDetectorModel.OnInputProperty | cdk.IResolvable;
        /**
         * The name of the state.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-state.html#cfn-iotevents-detectormodel-state-statename
         */
        readonly stateName: string;
    }
}

/**
 * Determine whether the given properties match those of a `StateProperty`
 *
 * @param properties - the TypeScript properties of a `StateProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_StatePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('onEnter', CfnDetectorModel_OnEnterPropertyValidator)(properties.onEnter));
    errors.collect(cdk.propertyValidator('onExit', CfnDetectorModel_OnExitPropertyValidator)(properties.onExit));
    errors.collect(cdk.propertyValidator('onInput', CfnDetectorModel_OnInputPropertyValidator)(properties.onInput));
    errors.collect(cdk.propertyValidator('stateName', cdk.requiredValidator)(properties.stateName));
    errors.collect(cdk.propertyValidator('stateName', cdk.validateString)(properties.stateName));
    return errors.wrap('supplied properties not correct for "StateProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.State` resource
 *
 * @param properties - the TypeScript properties of a `StateProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.State` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelStatePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_StatePropertyValidator(properties).assertSuccess();
    return {
        OnEnter: cfnDetectorModelOnEnterPropertyToCloudFormation(properties.onEnter),
        OnExit: cfnDetectorModelOnExitPropertyToCloudFormation(properties.onExit),
        OnInput: cfnDetectorModelOnInputPropertyToCloudFormation(properties.onInput),
        StateName: cdk.stringToCloudFormation(properties.stateName),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelStatePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.StateProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.StateProperty>();
    ret.addPropertyResult('onEnter', 'OnEnter', properties.OnEnter != null ? CfnDetectorModelOnEnterPropertyFromCloudFormation(properties.OnEnter) : undefined);
    ret.addPropertyResult('onExit', 'OnExit', properties.OnExit != null ? CfnDetectorModelOnExitPropertyFromCloudFormation(properties.OnExit) : undefined);
    ret.addPropertyResult('onInput', 'OnInput', properties.OnInput != null ? CfnDetectorModelOnInputPropertyFromCloudFormation(properties.OnInput) : undefined);
    ret.addPropertyResult('stateName', 'StateName', cfn_parse.FromCloudFormation.getString(properties.StateName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDetectorModel {
    /**
     * Specifies the actions performed and the next state entered when a `condition` evaluates to TRUE.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-transitionevent.html
     */
    export interface TransitionEventProperty {
        /**
         * The actions to be performed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-transitionevent.html#cfn-iotevents-detectormodel-transitionevent-actions
         */
        readonly actions?: Array<CfnDetectorModel.ActionProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * Required. A Boolean expression that when TRUE causes the actions to be performed and the `nextState` to be entered.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-transitionevent.html#cfn-iotevents-detectormodel-transitionevent-condition
         */
        readonly condition: string;
        /**
         * The name of the transition event.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-transitionevent.html#cfn-iotevents-detectormodel-transitionevent-eventname
         */
        readonly eventName: string;
        /**
         * The next state to enter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-detectormodel-transitionevent.html#cfn-iotevents-detectormodel-transitionevent-nextstate
         */
        readonly nextState: string;
    }
}

/**
 * Determine whether the given properties match those of a `TransitionEventProperty`
 *
 * @param properties - the TypeScript properties of a `TransitionEventProperty`
 *
 * @returns the result of the validation.
 */
function CfnDetectorModel_TransitionEventPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('actions', cdk.listValidator(CfnDetectorModel_ActionPropertyValidator))(properties.actions));
    errors.collect(cdk.propertyValidator('condition', cdk.requiredValidator)(properties.condition));
    errors.collect(cdk.propertyValidator('condition', cdk.validateString)(properties.condition));
    errors.collect(cdk.propertyValidator('eventName', cdk.requiredValidator)(properties.eventName));
    errors.collect(cdk.propertyValidator('eventName', cdk.validateString)(properties.eventName));
    errors.collect(cdk.propertyValidator('nextState', cdk.requiredValidator)(properties.nextState));
    errors.collect(cdk.propertyValidator('nextState', cdk.validateString)(properties.nextState));
    return errors.wrap('supplied properties not correct for "TransitionEventProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.TransitionEvent` resource
 *
 * @param properties - the TypeScript properties of a `TransitionEventProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::DetectorModel.TransitionEvent` resource.
 */
// @ts-ignore TS6133
function cfnDetectorModelTransitionEventPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDetectorModel_TransitionEventPropertyValidator(properties).assertSuccess();
    return {
        Actions: cdk.listMapper(cfnDetectorModelActionPropertyToCloudFormation)(properties.actions),
        Condition: cdk.stringToCloudFormation(properties.condition),
        EventName: cdk.stringToCloudFormation(properties.eventName),
        NextState: cdk.stringToCloudFormation(properties.nextState),
    };
}

// @ts-ignore TS6133
function CfnDetectorModelTransitionEventPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDetectorModel.TransitionEventProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDetectorModel.TransitionEventProperty>();
    ret.addPropertyResult('actions', 'Actions', properties.Actions != null ? cfn_parse.FromCloudFormation.getArray(CfnDetectorModelActionPropertyFromCloudFormation)(properties.Actions) : undefined);
    ret.addPropertyResult('condition', 'Condition', cfn_parse.FromCloudFormation.getString(properties.Condition));
    ret.addPropertyResult('eventName', 'EventName', cfn_parse.FromCloudFormation.getString(properties.EventName));
    ret.addPropertyResult('nextState', 'NextState', cfn_parse.FromCloudFormation.getString(properties.NextState));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnInput`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-input.html
 */
export interface CfnInputProps {

    /**
     * The definition of the input.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-input.html#cfn-iotevents-input-inputdefinition
     */
    readonly inputDefinition: CfnInput.InputDefinitionProperty | cdk.IResolvable;

    /**
     * A brief description of the input.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-input.html#cfn-iotevents-input-inputdescription
     */
    readonly inputDescription?: string;

    /**
     * The name of the input.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-input.html#cfn-iotevents-input-inputname
     */
    readonly inputName?: string;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-input.html#cfn-iotevents-input-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnInputProps`
 *
 * @param properties - the TypeScript properties of a `CfnInputProps`
 *
 * @returns the result of the validation.
 */
function CfnInputPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('inputDefinition', cdk.requiredValidator)(properties.inputDefinition));
    errors.collect(cdk.propertyValidator('inputDefinition', CfnInput_InputDefinitionPropertyValidator)(properties.inputDefinition));
    errors.collect(cdk.propertyValidator('inputDescription', cdk.validateString)(properties.inputDescription));
    errors.collect(cdk.propertyValidator('inputName', cdk.validateString)(properties.inputName));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnInputProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::Input` resource
 *
 * @param properties - the TypeScript properties of a `CfnInputProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::Input` resource.
 */
// @ts-ignore TS6133
function cfnInputPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnInputPropsValidator(properties).assertSuccess();
    return {
        InputDefinition: cfnInputInputDefinitionPropertyToCloudFormation(properties.inputDefinition),
        InputDescription: cdk.stringToCloudFormation(properties.inputDescription),
        InputName: cdk.stringToCloudFormation(properties.inputName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnInputPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnInputProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnInputProps>();
    ret.addPropertyResult('inputDefinition', 'InputDefinition', CfnInputInputDefinitionPropertyFromCloudFormation(properties.InputDefinition));
    ret.addPropertyResult('inputDescription', 'InputDescription', properties.InputDescription != null ? cfn_parse.FromCloudFormation.getString(properties.InputDescription) : undefined);
    ret.addPropertyResult('inputName', 'InputName', properties.InputName != null ? cfn_parse.FromCloudFormation.getString(properties.InputName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::IoTEvents::Input`
 *
 * The AWS::IoTEvents::Input resource creates an input. To monitor your devices and processes, they must have a way to get telemetry data into AWS IoT Events . This is done by sending messages as *inputs* to AWS IoT Events . For more information, see [How to Use AWS IoT Events](https://docs.aws.amazon.com/iotevents/latest/developerguide/how-to-use-iotevents.html) in the *AWS IoT Events Developer Guide* .
 *
 * @cloudformationResource AWS::IoTEvents::Input
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-input.html
 */
export class CfnInput extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::IoTEvents::Input";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnInput {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnInputPropsFromCloudFormation(resourceProperties);
        const ret = new CfnInput(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The definition of the input.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-input.html#cfn-iotevents-input-inputdefinition
     */
    public inputDefinition: CfnInput.InputDefinitionProperty | cdk.IResolvable;

    /**
     * A brief description of the input.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-input.html#cfn-iotevents-input-inputdescription
     */
    public inputDescription: string | undefined;

    /**
     * The name of the input.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-input.html#cfn-iotevents-input-inputname
     */
    public inputName: string | undefined;

    /**
     * An array of key-value pairs to apply to this resource.
     *
     * For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-input.html#cfn-iotevents-input-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::IoTEvents::Input`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnInputProps) {
        super(scope, id, { type: CfnInput.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'inputDefinition', this);

        this.inputDefinition = props.inputDefinition;
        this.inputDescription = props.inputDescription;
        this.inputName = props.inputName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::IoTEvents::Input", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnInput.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            inputDefinition: this.inputDefinition,
            inputDescription: this.inputDescription,
            inputName: this.inputName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnInputPropsToCloudFormation(props);
    }
}

export namespace CfnInput {
    /**
     * The attributes from the JSON payload that are made available by the input. Inputs are derived from messages sent to the AWS IoT Events system using `BatchPutMessage` . Each such message contains a JSON payload. Those attributes (and their paired values) specified here are available for use in the `condition` expressions used by detectors.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-input-attribute.html
     */
    export interface AttributeProperty {
        /**
         * An expression that specifies an attribute-value pair in a JSON structure. Use this to specify an attribute from the JSON payload that is made available by the input. Inputs are derived from messages sent to AWS IoT Events ( `BatchPutMessage` ). Each such message contains a JSON payload. The attribute (and its paired value) specified here are available for use in the `condition` expressions used by detectors.
         *
         * Syntax: `<field-name>.<field-name>...`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-input-attribute.html#cfn-iotevents-input-attribute-jsonpath
         */
        readonly jsonPath: string;
    }
}

/**
 * Determine whether the given properties match those of a `AttributeProperty`
 *
 * @param properties - the TypeScript properties of a `AttributeProperty`
 *
 * @returns the result of the validation.
 */
function CfnInput_AttributePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('jsonPath', cdk.requiredValidator)(properties.jsonPath));
    errors.collect(cdk.propertyValidator('jsonPath', cdk.validateString)(properties.jsonPath));
    return errors.wrap('supplied properties not correct for "AttributeProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::Input.Attribute` resource
 *
 * @param properties - the TypeScript properties of a `AttributeProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::Input.Attribute` resource.
 */
// @ts-ignore TS6133
function cfnInputAttributePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnInput_AttributePropertyValidator(properties).assertSuccess();
    return {
        JsonPath: cdk.stringToCloudFormation(properties.jsonPath),
    };
}

// @ts-ignore TS6133
function CfnInputAttributePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnInput.AttributeProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnInput.AttributeProperty>();
    ret.addPropertyResult('jsonPath', 'JsonPath', cfn_parse.FromCloudFormation.getString(properties.JsonPath));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnInput {
    /**
     * The definition of the input.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-input-inputdefinition.html
     */
    export interface InputDefinitionProperty {
        /**
         * The attributes from the JSON payload that are made available by the input. Inputs are derived from messages sent to the AWS IoT Events system using `BatchPutMessage` . Each such message contains a JSON payload, and those attributes (and their paired values) specified here are available for use in the `condition` expressions used by detectors that monitor this input.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iotevents-input-inputdefinition.html#cfn-iotevents-input-inputdefinition-attributes
         */
        readonly attributes: Array<CfnInput.AttributeProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `InputDefinitionProperty`
 *
 * @param properties - the TypeScript properties of a `InputDefinitionProperty`
 *
 * @returns the result of the validation.
 */
function CfnInput_InputDefinitionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('attributes', cdk.requiredValidator)(properties.attributes));
    errors.collect(cdk.propertyValidator('attributes', cdk.listValidator(CfnInput_AttributePropertyValidator))(properties.attributes));
    return errors.wrap('supplied properties not correct for "InputDefinitionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::IoTEvents::Input.InputDefinition` resource
 *
 * @param properties - the TypeScript properties of a `InputDefinitionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::IoTEvents::Input.InputDefinition` resource.
 */
// @ts-ignore TS6133
function cfnInputInputDefinitionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnInput_InputDefinitionPropertyValidator(properties).assertSuccess();
    return {
        Attributes: cdk.listMapper(cfnInputAttributePropertyToCloudFormation)(properties.attributes),
    };
}

// @ts-ignore TS6133
function CfnInputInputDefinitionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnInput.InputDefinitionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnInput.InputDefinitionProperty>();
    ret.addPropertyResult('attributes', 'Attributes', cfn_parse.FromCloudFormation.getArray(CfnInputAttributePropertyFromCloudFormation)(properties.Attributes));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
