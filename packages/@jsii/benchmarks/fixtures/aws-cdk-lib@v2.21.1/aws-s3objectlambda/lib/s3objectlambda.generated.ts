// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.962Z","fingerprint":"SBY2FBAZIf572mMGekkURP9w4wUX5mmhxqilVpW9mQg="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnAccessPoint`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3objectlambda-accesspoint.html
 */
export interface CfnAccessPointProps {

    /**
     * A configuration used when creating an Object Lambda Access Point.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3objectlambda-accesspoint.html#cfn-s3objectlambda-accesspoint-objectlambdaconfiguration
     */
    readonly objectLambdaConfiguration: CfnAccessPoint.ObjectLambdaConfigurationProperty | cdk.IResolvable;

    /**
     * The name of this access point.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3objectlambda-accesspoint.html#cfn-s3objectlambda-accesspoint-name
     */
    readonly name?: string;
}

/**
 * Determine whether the given properties match those of a `CfnAccessPointProps`
 *
 * @param properties - the TypeScript properties of a `CfnAccessPointProps`
 *
 * @returns the result of the validation.
 */
function CfnAccessPointPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('objectLambdaConfiguration', cdk.requiredValidator)(properties.objectLambdaConfiguration));
    errors.collect(cdk.propertyValidator('objectLambdaConfiguration', CfnAccessPoint_ObjectLambdaConfigurationPropertyValidator)(properties.objectLambdaConfiguration));
    return errors.wrap('supplied properties not correct for "CfnAccessPointProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::S3ObjectLambda::AccessPoint` resource
 *
 * @param properties - the TypeScript properties of a `CfnAccessPointProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::S3ObjectLambda::AccessPoint` resource.
 */
// @ts-ignore TS6133
function cfnAccessPointPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAccessPointPropsValidator(properties).assertSuccess();
    return {
        ObjectLambdaConfiguration: cfnAccessPointObjectLambdaConfigurationPropertyToCloudFormation(properties.objectLambdaConfiguration),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnAccessPointPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAccessPointProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAccessPointProps>();
    ret.addPropertyResult('objectLambdaConfiguration', 'ObjectLambdaConfiguration', CfnAccessPointObjectLambdaConfigurationPropertyFromCloudFormation(properties.ObjectLambdaConfiguration));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::S3ObjectLambda::AccessPoint`
 *
 * The `AWS::S3ObjectLambda::AccessPoint` resource specifies an Object Lambda Access Point used to access a bucket.
 *
 * @cloudformationResource AWS::S3ObjectLambda::AccessPoint
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3objectlambda-accesspoint.html
 */
export class CfnAccessPoint extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::S3ObjectLambda::AccessPoint";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAccessPoint {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAccessPointPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAccessPoint(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Specifies the ARN for the Object Lambda Access Point.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The date and time when the specified Object Lambda Access Point was created.
     * @cloudformationAttribute CreationDate
     */
    public readonly attrCreationDate: string;

    /**
     * A configuration used when creating an Object Lambda Access Point.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3objectlambda-accesspoint.html#cfn-s3objectlambda-accesspoint-objectlambdaconfiguration
     */
    public objectLambdaConfiguration: CfnAccessPoint.ObjectLambdaConfigurationProperty | cdk.IResolvable;

    /**
     * The name of this access point.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3objectlambda-accesspoint.html#cfn-s3objectlambda-accesspoint-name
     */
    public name: string | undefined;

    /**
     * Create a new `AWS::S3ObjectLambda::AccessPoint`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAccessPointProps) {
        super(scope, id, { type: CfnAccessPoint.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'objectLambdaConfiguration', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCreationDate = cdk.Token.asString(this.getAtt('CreationDate'));

        this.objectLambdaConfiguration = props.objectLambdaConfiguration;
        this.name = props.name;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAccessPoint.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            objectLambdaConfiguration: this.objectLambdaConfiguration,
            name: this.name,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAccessPointPropsToCloudFormation(props);
    }
}

export namespace CfnAccessPoint {
    /**
     * A configuration used when creating an Object Lambda Access Point.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3objectlambda-accesspoint-objectlambdaconfiguration.html
     */
    export interface ObjectLambdaConfigurationProperty {
        /**
         * A container for allowed features. Valid inputs are `GetObject-Range` and `GetObject-PartNumber` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3objectlambda-accesspoint-objectlambdaconfiguration.html#cfn-s3objectlambda-accesspoint-objectlambdaconfiguration-allowedfeatures
         */
        readonly allowedFeatures?: string[];
        /**
         * A container for whether the CloudWatch metrics configuration is enabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3objectlambda-accesspoint-objectlambdaconfiguration.html#cfn-s3objectlambda-accesspoint-objectlambdaconfiguration-cloudwatchmetricsenabled
         */
        readonly cloudWatchMetricsEnabled?: boolean | cdk.IResolvable;
        /**
         * Standard access point associated with the Object Lambda Access Point.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3objectlambda-accesspoint-objectlambdaconfiguration.html#cfn-s3objectlambda-accesspoint-objectlambdaconfiguration-supportingaccesspoint
         */
        readonly supportingAccessPoint: string;
        /**
         * A container for transformation configurations for an Object Lambda Access Point.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3objectlambda-accesspoint-objectlambdaconfiguration.html#cfn-s3objectlambda-accesspoint-objectlambdaconfiguration-transformationconfigurations
         */
        readonly transformationConfigurations: Array<CfnAccessPoint.TransformationConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ObjectLambdaConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ObjectLambdaConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnAccessPoint_ObjectLambdaConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('allowedFeatures', cdk.listValidator(cdk.validateString))(properties.allowedFeatures));
    errors.collect(cdk.propertyValidator('cloudWatchMetricsEnabled', cdk.validateBoolean)(properties.cloudWatchMetricsEnabled));
    errors.collect(cdk.propertyValidator('supportingAccessPoint', cdk.requiredValidator)(properties.supportingAccessPoint));
    errors.collect(cdk.propertyValidator('supportingAccessPoint', cdk.validateString)(properties.supportingAccessPoint));
    errors.collect(cdk.propertyValidator('transformationConfigurations', cdk.requiredValidator)(properties.transformationConfigurations));
    errors.collect(cdk.propertyValidator('transformationConfigurations', cdk.listValidator(CfnAccessPoint_TransformationConfigurationPropertyValidator))(properties.transformationConfigurations));
    return errors.wrap('supplied properties not correct for "ObjectLambdaConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::S3ObjectLambda::AccessPoint.ObjectLambdaConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ObjectLambdaConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::S3ObjectLambda::AccessPoint.ObjectLambdaConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnAccessPointObjectLambdaConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAccessPoint_ObjectLambdaConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AllowedFeatures: cdk.listMapper(cdk.stringToCloudFormation)(properties.allowedFeatures),
        CloudWatchMetricsEnabled: cdk.booleanToCloudFormation(properties.cloudWatchMetricsEnabled),
        SupportingAccessPoint: cdk.stringToCloudFormation(properties.supportingAccessPoint),
        TransformationConfigurations: cdk.listMapper(cfnAccessPointTransformationConfigurationPropertyToCloudFormation)(properties.transformationConfigurations),
    };
}

// @ts-ignore TS6133
function CfnAccessPointObjectLambdaConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAccessPoint.ObjectLambdaConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAccessPoint.ObjectLambdaConfigurationProperty>();
    ret.addPropertyResult('allowedFeatures', 'AllowedFeatures', properties.AllowedFeatures != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AllowedFeatures) : undefined);
    ret.addPropertyResult('cloudWatchMetricsEnabled', 'CloudWatchMetricsEnabled', properties.CloudWatchMetricsEnabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.CloudWatchMetricsEnabled) : undefined);
    ret.addPropertyResult('supportingAccessPoint', 'SupportingAccessPoint', cfn_parse.FromCloudFormation.getString(properties.SupportingAccessPoint));
    ret.addPropertyResult('transformationConfigurations', 'TransformationConfigurations', cfn_parse.FromCloudFormation.getArray(CfnAccessPointTransformationConfigurationPropertyFromCloudFormation)(properties.TransformationConfigurations));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnAccessPoint {
    /**
     * A configuration used when creating an Object Lambda Access Point transformation.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3objectlambda-accesspoint-transformationconfiguration.html
     */
    export interface TransformationConfigurationProperty {
        /**
         * A container for the action of an Object Lambda Access Point configuration. Valid input is `GetObject` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3objectlambda-accesspoint-transformationconfiguration.html#cfn-s3objectlambda-accesspoint-transformationconfiguration-actions
         */
        readonly actions: string[];
        /**
         * A container for the content transformation of an Object Lambda Access Point configuration. Can include the FunctionArn and FunctionPayload. For more information, see [AwsLambdaTransformation](https://docs.aws.amazon.com/AmazonS3/latest/API/API_control_AwsLambdaTransformation.html) in the *Amazon S3 API Reference* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3objectlambda-accesspoint-transformationconfiguration.html#cfn-s3objectlambda-accesspoint-transformationconfiguration-contenttransformation
         */
        readonly contentTransformation: any | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `TransformationConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `TransformationConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnAccessPoint_TransformationConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('actions', cdk.requiredValidator)(properties.actions));
    errors.collect(cdk.propertyValidator('actions', cdk.listValidator(cdk.validateString))(properties.actions));
    errors.collect(cdk.propertyValidator('contentTransformation', cdk.requiredValidator)(properties.contentTransformation));
    errors.collect(cdk.propertyValidator('contentTransformation', cdk.validateObject)(properties.contentTransformation));
    return errors.wrap('supplied properties not correct for "TransformationConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::S3ObjectLambda::AccessPoint.TransformationConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `TransformationConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::S3ObjectLambda::AccessPoint.TransformationConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnAccessPointTransformationConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAccessPoint_TransformationConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Actions: cdk.listMapper(cdk.stringToCloudFormation)(properties.actions),
        ContentTransformation: cdk.objectToCloudFormation(properties.contentTransformation),
    };
}

// @ts-ignore TS6133
function CfnAccessPointTransformationConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAccessPoint.TransformationConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAccessPoint.TransformationConfigurationProperty>();
    ret.addPropertyResult('actions', 'Actions', cfn_parse.FromCloudFormation.getStringArray(properties.Actions));
    ret.addPropertyResult('contentTransformation', 'ContentTransformation', cfn_parse.FromCloudFormation.getAny(properties.ContentTransformation));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnAccessPointPolicy`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3objectlambda-accesspointpolicy.html
 */
export interface CfnAccessPointPolicyProps {

    /**
     * An access point with an attached AWS Lambda function used to access transformed data from an Amazon S3 bucket.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3objectlambda-accesspointpolicy.html#cfn-s3objectlambda-accesspointpolicy-objectlambdaaccesspoint
     */
    readonly objectLambdaAccessPoint: string;

    /**
     * Object Lambda Access Point resource policy document.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3objectlambda-accesspointpolicy.html#cfn-s3objectlambda-accesspointpolicy-policydocument
     */
    readonly policyDocument: any | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnAccessPointPolicyProps`
 *
 * @param properties - the TypeScript properties of a `CfnAccessPointPolicyProps`
 *
 * @returns the result of the validation.
 */
function CfnAccessPointPolicyPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('objectLambdaAccessPoint', cdk.requiredValidator)(properties.objectLambdaAccessPoint));
    errors.collect(cdk.propertyValidator('objectLambdaAccessPoint', cdk.validateString)(properties.objectLambdaAccessPoint));
    errors.collect(cdk.propertyValidator('policyDocument', cdk.requiredValidator)(properties.policyDocument));
    errors.collect(cdk.propertyValidator('policyDocument', cdk.validateObject)(properties.policyDocument));
    return errors.wrap('supplied properties not correct for "CfnAccessPointPolicyProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::S3ObjectLambda::AccessPointPolicy` resource
 *
 * @param properties - the TypeScript properties of a `CfnAccessPointPolicyProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::S3ObjectLambda::AccessPointPolicy` resource.
 */
// @ts-ignore TS6133
function cfnAccessPointPolicyPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAccessPointPolicyPropsValidator(properties).assertSuccess();
    return {
        ObjectLambdaAccessPoint: cdk.stringToCloudFormation(properties.objectLambdaAccessPoint),
        PolicyDocument: cdk.objectToCloudFormation(properties.policyDocument),
    };
}

// @ts-ignore TS6133
function CfnAccessPointPolicyPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAccessPointPolicyProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAccessPointPolicyProps>();
    ret.addPropertyResult('objectLambdaAccessPoint', 'ObjectLambdaAccessPoint', cfn_parse.FromCloudFormation.getString(properties.ObjectLambdaAccessPoint));
    ret.addPropertyResult('policyDocument', 'PolicyDocument', cfn_parse.FromCloudFormation.getAny(properties.PolicyDocument));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::S3ObjectLambda::AccessPointPolicy`
 *
 * The `AWS::S3ObjectLambda::AccessPointPolicy` resource specifies the Object Lambda Access Point resource policy document.
 *
 * @cloudformationResource AWS::S3ObjectLambda::AccessPointPolicy
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3objectlambda-accesspointpolicy.html
 */
export class CfnAccessPointPolicy extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::S3ObjectLambda::AccessPointPolicy";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAccessPointPolicy {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAccessPointPolicyPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAccessPointPolicy(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * An access point with an attached AWS Lambda function used to access transformed data from an Amazon S3 bucket.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3objectlambda-accesspointpolicy.html#cfn-s3objectlambda-accesspointpolicy-objectlambdaaccesspoint
     */
    public objectLambdaAccessPoint: string;

    /**
     * Object Lambda Access Point resource policy document.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3objectlambda-accesspointpolicy.html#cfn-s3objectlambda-accesspointpolicy-policydocument
     */
    public policyDocument: any | cdk.IResolvable;

    /**
     * Create a new `AWS::S3ObjectLambda::AccessPointPolicy`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAccessPointPolicyProps) {
        super(scope, id, { type: CfnAccessPointPolicy.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'objectLambdaAccessPoint', this);
        cdk.requireProperty(props, 'policyDocument', this);

        this.objectLambdaAccessPoint = props.objectLambdaAccessPoint;
        this.policyDocument = props.policyDocument;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAccessPointPolicy.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            objectLambdaAccessPoint: this.objectLambdaAccessPoint,
            policyDocument: this.policyDocument,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAccessPointPolicyPropsToCloudFormation(props);
    }
}
