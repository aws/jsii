// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.793Z","fingerprint":"l3eipHhf1j3ME/nUi9eju8h6ceUsU1aHzKWfUVgmYak="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnCollection`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rekognition-collection.html
 */
export interface CfnCollectionProps {

    /**
     * ID for the collection that you are creating.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rekognition-collection.html#cfn-rekognition-collection-collectionid
     */
    readonly collectionId: string;

    /**
     * A set of tags (key-value pairs) that you want to attach to the collection.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rekognition-collection.html#cfn-rekognition-collection-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnCollectionProps`
 *
 * @param properties - the TypeScript properties of a `CfnCollectionProps`
 *
 * @returns the result of the validation.
 */
function CfnCollectionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('collectionId', cdk.requiredValidator)(properties.collectionId));
    errors.collect(cdk.propertyValidator('collectionId', cdk.validateString)(properties.collectionId));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnCollectionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Rekognition::Collection` resource
 *
 * @param properties - the TypeScript properties of a `CfnCollectionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Rekognition::Collection` resource.
 */
// @ts-ignore TS6133
function cfnCollectionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCollectionPropsValidator(properties).assertSuccess();
    return {
        CollectionId: cdk.stringToCloudFormation(properties.collectionId),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnCollectionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCollectionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCollectionProps>();
    ret.addPropertyResult('collectionId', 'CollectionId', cfn_parse.FromCloudFormation.getString(properties.CollectionId));
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Rekognition::Collection`
 *
 * The `AWS::Rekognition::Collection` type creates a server-side container called a collection. You can use a collection to store information about detected faces and search for known faces in images, stored videos, and streaming videos.
 *
 * @cloudformationResource AWS::Rekognition::Collection
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rekognition-collection.html
 */
export class CfnCollection extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Rekognition::Collection";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnCollection {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnCollectionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnCollection(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Returns the Amazon Resource Name of the collection.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * ID for the collection that you are creating.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rekognition-collection.html#cfn-rekognition-collection-collectionid
     */
    public collectionId: string;

    /**
     * A set of tags (key-value pairs) that you want to attach to the collection.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rekognition-collection.html#cfn-rekognition-collection-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Rekognition::Collection`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnCollectionProps) {
        super(scope, id, { type: CfnCollection.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'collectionId', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.collectionId = props.collectionId;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Rekognition::Collection", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnCollection.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            collectionId: this.collectionId,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnCollectionPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnProject`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rekognition-project.html
 */
export interface CfnProjectProps {

    /**
     * The name of the project to create.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rekognition-project.html#cfn-rekognition-project-projectname
     */
    readonly projectName: string;
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
    errors.collect(cdk.propertyValidator('projectName', cdk.requiredValidator)(properties.projectName));
    errors.collect(cdk.propertyValidator('projectName', cdk.validateString)(properties.projectName));
    return errors.wrap('supplied properties not correct for "CfnProjectProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Rekognition::Project` resource
 *
 * @param properties - the TypeScript properties of a `CfnProjectProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Rekognition::Project` resource.
 */
// @ts-ignore TS6133
function cfnProjectPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnProjectPropsValidator(properties).assertSuccess();
    return {
        ProjectName: cdk.stringToCloudFormation(properties.projectName),
    };
}

// @ts-ignore TS6133
function CfnProjectPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnProjectProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnProjectProps>();
    ret.addPropertyResult('projectName', 'ProjectName', cfn_parse.FromCloudFormation.getString(properties.ProjectName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Rekognition::Project`
 *
 * The `AWS::Rekognition::Project` type creates an Amazon Rekognition Custom Labels project. A project is a group of resources needed to create and manage versions of an Amazon Rekognition Custom Labels model.
 *
 * @cloudformationResource AWS::Rekognition::Project
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rekognition-project.html
 */
export class CfnProject extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Rekognition::Project";

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
     * Returns the Amazon Resource Name of the project.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The name of the project to create.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rekognition-project.html#cfn-rekognition-project-projectname
     */
    public projectName: string;

    /**
     * Create a new `AWS::Rekognition::Project`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnProjectProps) {
        super(scope, id, { type: CfnProject.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'projectName', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.projectName = props.projectName;
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
            projectName: this.projectName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnProjectPropsToCloudFormation(props);
    }
}
