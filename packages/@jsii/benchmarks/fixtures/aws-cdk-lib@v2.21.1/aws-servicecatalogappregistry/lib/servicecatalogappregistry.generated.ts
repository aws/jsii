// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:10.159Z","fingerprint":"yPn3PFkeg9JleQRhp0nLlJsS+bP3lCDRS7GIBpRWe7A="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnApplication`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-application.html
 */
export interface CfnApplicationProps {

    /**
     * The name of the application. The name must be unique in the region in which you are creating the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-application.html#cfn-servicecatalogappregistry-application-name
     */
    readonly name: string;

    /**
     * The description of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-application.html#cfn-servicecatalogappregistry-application-description
     */
    readonly description?: string;

    /**
     * Key-value pairs you can use to associate with the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-application.html#cfn-servicecatalogappregistry-application-tags
     */
    readonly tags?: { [key: string]: (string) };
}

/**
 * Determine whether the given properties match those of a `CfnApplicationProps`
 *
 * @param properties - the TypeScript properties of a `CfnApplicationProps`
 *
 * @returns the result of the validation.
 */
function CfnApplicationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tags', cdk.hashValidator(cdk.validateString))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnApplicationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ServiceCatalogAppRegistry::Application` resource
 *
 * @param properties - the TypeScript properties of a `CfnApplicationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ServiceCatalogAppRegistry::Application` resource.
 */
// @ts-ignore TS6133
function cfnApplicationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApplicationPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Description: cdk.stringToCloudFormation(properties.description),
        Tags: cdk.hashMapper(cdk.stringToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnApplicationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApplicationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApplicationProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ServiceCatalogAppRegistry::Application`
 *
 * Represents a AWS Service Catalog AppRegistry application that is the top-level node in a hierarchy of related cloud resource abstractions.
 *
 * @cloudformationResource AWS::ServiceCatalogAppRegistry::Application
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-application.html
 */
export class CfnApplication extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ServiceCatalogAppRegistry::Application";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnApplication {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnApplicationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnApplication(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Arn for the application.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The application Id in the respective resource.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The name of the application. The name must be unique in the region in which you are creating the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-application.html#cfn-servicecatalogappregistry-application-name
     */
    public name: string;

    /**
     * The description of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-application.html#cfn-servicecatalogappregistry-application-description
     */
    public description: string | undefined;

    /**
     * Key-value pairs you can use to associate with the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-application.html#cfn-servicecatalogappregistry-application-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::ServiceCatalogAppRegistry::Application`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnApplicationProps) {
        super(scope, id, { type: CfnApplication.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.name = props.name;
        this.description = props.description;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::ServiceCatalogAppRegistry::Application", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnApplication.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            description: this.description,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnApplicationPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnAttributeGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroup.html
 */
export interface CfnAttributeGroupProps {

    /**
     * A JSON string in the form of nested key-value pairs that represent the attributes in the group and describes an application and its components.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroup.html#cfn-servicecatalogappregistry-attributegroup-attributes
     */
    readonly attributes: any | cdk.IResolvable;

    /**
     * The name of the attribute group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroup.html#cfn-servicecatalogappregistry-attributegroup-name
     */
    readonly name: string;

    /**
     * The description of the attribute group that the user provides.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroup.html#cfn-servicecatalogappregistry-attributegroup-description
     */
    readonly description?: string;

    /**
     * Key-value pairs you can use to associate with the attribute group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroup.html#cfn-servicecatalogappregistry-attributegroup-tags
     */
    readonly tags?: { [key: string]: (string) };
}

/**
 * Determine whether the given properties match those of a `CfnAttributeGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnAttributeGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnAttributeGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('attributes', cdk.requiredValidator)(properties.attributes));
    errors.collect(cdk.propertyValidator('attributes', cdk.validateObject)(properties.attributes));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tags', cdk.hashValidator(cdk.validateString))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnAttributeGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ServiceCatalogAppRegistry::AttributeGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnAttributeGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ServiceCatalogAppRegistry::AttributeGroup` resource.
 */
// @ts-ignore TS6133
function cfnAttributeGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAttributeGroupPropsValidator(properties).assertSuccess();
    return {
        Attributes: cdk.objectToCloudFormation(properties.attributes),
        Name: cdk.stringToCloudFormation(properties.name),
        Description: cdk.stringToCloudFormation(properties.description),
        Tags: cdk.hashMapper(cdk.stringToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnAttributeGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAttributeGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAttributeGroupProps>();
    ret.addPropertyResult('attributes', 'Attributes', cfn_parse.FromCloudFormation.getAny(properties.Attributes));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ServiceCatalogAppRegistry::AttributeGroup`
 *
 * Creates a new attribute group as a container for user-defined attributes. This feature enables users to have full control over their cloud application's metadata in a rich machine-readable format to facilitate integration with automated workflows and third-party tools.
 *
 * @cloudformationResource AWS::ServiceCatalogAppRegistry::AttributeGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroup.html
 */
export class CfnAttributeGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ServiceCatalogAppRegistry::AttributeGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAttributeGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAttributeGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAttributeGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Arn for the attribute group.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The attribute group Id in the respective resource.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * A JSON string in the form of nested key-value pairs that represent the attributes in the group and describes an application and its components.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroup.html#cfn-servicecatalogappregistry-attributegroup-attributes
     */
    public attributes: any | cdk.IResolvable;

    /**
     * The name of the attribute group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroup.html#cfn-servicecatalogappregistry-attributegroup-name
     */
    public name: string;

    /**
     * The description of the attribute group that the user provides.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroup.html#cfn-servicecatalogappregistry-attributegroup-description
     */
    public description: string | undefined;

    /**
     * Key-value pairs you can use to associate with the attribute group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroup.html#cfn-servicecatalogappregistry-attributegroup-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::ServiceCatalogAppRegistry::AttributeGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAttributeGroupProps) {
        super(scope, id, { type: CfnAttributeGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'attributes', this);
        cdk.requireProperty(props, 'name', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.attributes = props.attributes;
        this.name = props.name;
        this.description = props.description;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::ServiceCatalogAppRegistry::AttributeGroup", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAttributeGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            attributes: this.attributes,
            name: this.name,
            description: this.description,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAttributeGroupPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnAttributeGroupAssociation`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroupassociation.html
 */
export interface CfnAttributeGroupAssociationProps {

    /**
     * The name or ID of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroupassociation.html#cfn-servicecatalogappregistry-attributegroupassociation-application
     */
    readonly application: string;

    /**
     * The name or ID of the attribute group that holds the attributes to describe the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroupassociation.html#cfn-servicecatalogappregistry-attributegroupassociation-attributegroup
     */
    readonly attributeGroup: string;
}

/**
 * Determine whether the given properties match those of a `CfnAttributeGroupAssociationProps`
 *
 * @param properties - the TypeScript properties of a `CfnAttributeGroupAssociationProps`
 *
 * @returns the result of the validation.
 */
function CfnAttributeGroupAssociationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('application', cdk.requiredValidator)(properties.application));
    errors.collect(cdk.propertyValidator('application', cdk.validateString)(properties.application));
    errors.collect(cdk.propertyValidator('attributeGroup', cdk.requiredValidator)(properties.attributeGroup));
    errors.collect(cdk.propertyValidator('attributeGroup', cdk.validateString)(properties.attributeGroup));
    return errors.wrap('supplied properties not correct for "CfnAttributeGroupAssociationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ServiceCatalogAppRegistry::AttributeGroupAssociation` resource
 *
 * @param properties - the TypeScript properties of a `CfnAttributeGroupAssociationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ServiceCatalogAppRegistry::AttributeGroupAssociation` resource.
 */
// @ts-ignore TS6133
function cfnAttributeGroupAssociationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAttributeGroupAssociationPropsValidator(properties).assertSuccess();
    return {
        Application: cdk.stringToCloudFormation(properties.application),
        AttributeGroup: cdk.stringToCloudFormation(properties.attributeGroup),
    };
}

// @ts-ignore TS6133
function CfnAttributeGroupAssociationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAttributeGroupAssociationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAttributeGroupAssociationProps>();
    ret.addPropertyResult('application', 'Application', cfn_parse.FromCloudFormation.getString(properties.Application));
    ret.addPropertyResult('attributeGroup', 'AttributeGroup', cfn_parse.FromCloudFormation.getString(properties.AttributeGroup));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ServiceCatalogAppRegistry::AttributeGroupAssociation`
 *
 * The `AWS::ServiceCatalogAppRegistry::AttributeGroupAssociation` resource for `ServiceCatalogAppRegistry` .
 *
 * @cloudformationResource AWS::ServiceCatalogAppRegistry::AttributeGroupAssociation
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroupassociation.html
 */
export class CfnAttributeGroupAssociation extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ServiceCatalogAppRegistry::AttributeGroupAssociation";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAttributeGroupAssociation {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAttributeGroupAssociationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAttributeGroupAssociation(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     *
     * @cloudformationAttribute ApplicationArn
     */
    public readonly attrApplicationArn: string;

    /**
     *
     * @cloudformationAttribute AttributeGroupArn
     */
    public readonly attrAttributeGroupArn: string;

    /**
     * The Id of the Association.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The name or ID of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroupassociation.html#cfn-servicecatalogappregistry-attributegroupassociation-application
     */
    public application: string;

    /**
     * The name or ID of the attribute group that holds the attributes to describe the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-attributegroupassociation.html#cfn-servicecatalogappregistry-attributegroupassociation-attributegroup
     */
    public attributeGroup: string;

    /**
     * Create a new `AWS::ServiceCatalogAppRegistry::AttributeGroupAssociation`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAttributeGroupAssociationProps) {
        super(scope, id, { type: CfnAttributeGroupAssociation.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'application', this);
        cdk.requireProperty(props, 'attributeGroup', this);
        this.attrApplicationArn = cdk.Token.asString(this.getAtt('ApplicationArn'));
        this.attrAttributeGroupArn = cdk.Token.asString(this.getAtt('AttributeGroupArn'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.application = props.application;
        this.attributeGroup = props.attributeGroup;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAttributeGroupAssociation.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            application: this.application,
            attributeGroup: this.attributeGroup,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAttributeGroupAssociationPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnResourceAssociation`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-resourceassociation.html
 */
export interface CfnResourceAssociationProps {

    /**
     * The name or ID of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-resourceassociation.html#cfn-servicecatalogappregistry-resourceassociation-application
     */
    readonly application: string;

    /**
     * The name or ID of the resource of which the application will be associated.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-resourceassociation.html#cfn-servicecatalogappregistry-resourceassociation-resource
     */
    readonly resource: string;

    /**
     * The type of resource of which the application will be associated. Possible values: CFN_STACK.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-resourceassociation.html#cfn-servicecatalogappregistry-resourceassociation-resourcetype
     */
    readonly resourceType: string;
}

/**
 * Determine whether the given properties match those of a `CfnResourceAssociationProps`
 *
 * @param properties - the TypeScript properties of a `CfnResourceAssociationProps`
 *
 * @returns the result of the validation.
 */
function CfnResourceAssociationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('application', cdk.requiredValidator)(properties.application));
    errors.collect(cdk.propertyValidator('application', cdk.validateString)(properties.application));
    errors.collect(cdk.propertyValidator('resource', cdk.requiredValidator)(properties.resource));
    errors.collect(cdk.propertyValidator('resource', cdk.validateString)(properties.resource));
    errors.collect(cdk.propertyValidator('resourceType', cdk.requiredValidator)(properties.resourceType));
    errors.collect(cdk.propertyValidator('resourceType', cdk.validateString)(properties.resourceType));
    return errors.wrap('supplied properties not correct for "CfnResourceAssociationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ServiceCatalogAppRegistry::ResourceAssociation` resource
 *
 * @param properties - the TypeScript properties of a `CfnResourceAssociationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ServiceCatalogAppRegistry::ResourceAssociation` resource.
 */
// @ts-ignore TS6133
function cfnResourceAssociationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnResourceAssociationPropsValidator(properties).assertSuccess();
    return {
        Application: cdk.stringToCloudFormation(properties.application),
        Resource: cdk.stringToCloudFormation(properties.resource),
        ResourceType: cdk.stringToCloudFormation(properties.resourceType),
    };
}

// @ts-ignore TS6133
function CfnResourceAssociationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnResourceAssociationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnResourceAssociationProps>();
    ret.addPropertyResult('application', 'Application', cfn_parse.FromCloudFormation.getString(properties.Application));
    ret.addPropertyResult('resource', 'Resource', cfn_parse.FromCloudFormation.getString(properties.Resource));
    ret.addPropertyResult('resourceType', 'ResourceType', cfn_parse.FromCloudFormation.getString(properties.ResourceType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ServiceCatalogAppRegistry::ResourceAssociation`
 *
 * The `AWS::ServiceCatalogAppRegistry::ResourceAssociation` resource for `ServiceCatalogAppRegistry` .
 *
 * @cloudformationResource AWS::ServiceCatalogAppRegistry::ResourceAssociation
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-resourceassociation.html
 */
export class CfnResourceAssociation extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ServiceCatalogAppRegistry::ResourceAssociation";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnResourceAssociation {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnResourceAssociationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnResourceAssociation(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     *
     * @cloudformationAttribute ApplicationArn
     */
    public readonly attrApplicationArn: string;

    /**
     * The Id of the Association.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     *
     * @cloudformationAttribute ResourceArn
     */
    public readonly attrResourceArn: string;

    /**
     * The name or ID of the application.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-resourceassociation.html#cfn-servicecatalogappregistry-resourceassociation-application
     */
    public application: string;

    /**
     * The name or ID of the resource of which the application will be associated.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-resourceassociation.html#cfn-servicecatalogappregistry-resourceassociation-resource
     */
    public resource: string;

    /**
     * The type of resource of which the application will be associated. Possible values: CFN_STACK.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalogappregistry-resourceassociation.html#cfn-servicecatalogappregistry-resourceassociation-resourcetype
     */
    public resourceType: string;

    /**
     * Create a new `AWS::ServiceCatalogAppRegistry::ResourceAssociation`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnResourceAssociationProps) {
        super(scope, id, { type: CfnResourceAssociation.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'application', this);
        cdk.requireProperty(props, 'resource', this);
        cdk.requireProperty(props, 'resourceType', this);
        this.attrApplicationArn = cdk.Token.asString(this.getAtt('ApplicationArn'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));
        this.attrResourceArn = cdk.Token.asString(this.getAtt('ResourceArn'));

        this.application = props.application;
        this.resource = props.resource;
        this.resourceType = props.resourceType;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnResourceAssociation.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            application: this.application,
            resource: this.resource,
            resourceType: this.resourceType,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnResourceAssociationPropsToCloudFormation(props);
    }
}
