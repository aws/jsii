// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:06.283Z","fingerprint":"RQKEL0AX5eOuEJaWPklMIyh4VhRn10SgcwKQO9QdKWE="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnComponent`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html
 */
export interface CfnComponentProps {

    /**
     * The information to connect a component's properties to data at runtime. You can't specify `tags` as a valid property for `bindingProperties` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-bindingproperties
     */
    readonly bindingProperties: { [key: string]: (CfnComponent.ComponentBindingPropertiesValueProperty | cdk.IResolvable) } | cdk.IResolvable;

    /**
     * The type of the component. This can be an Amplify custom UI component or another custom component.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-componenttype
     */
    readonly componentType: string;

    /**
     * The name of the component.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-name
     */
    readonly name: string;

    /**
     * Describes the component's properties that can be overriden in a customized instance of the component. You can't specify `tags` as a valid property for `overrides` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-overrides
     */
    readonly overrides: { [key: string]: (any | cdk.IResolvable | cdk.IResolvable) } | cdk.IResolvable;

    /**
     * Describes the component's properties. You can't specify `tags` as a valid property for `properties` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-properties
     */
    readonly properties: { [key: string]: (CfnComponent.ComponentPropertyProperty | cdk.IResolvable) } | cdk.IResolvable;

    /**
     * A list of the component's variants. A variant is a unique style configuration of a main component.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-variants
     */
    readonly variants: Array<CfnComponent.ComponentVariantProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A list of the component's `ComponentChild` instances.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-children
     */
    readonly children?: Array<CfnComponent.ComponentChildProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The data binding configuration for the component's properties. Use this for a collection component. You can't specify `tags` as a valid property for `collectionProperties` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-collectionproperties
     */
    readonly collectionProperties?: { [key: string]: (CfnComponent.ComponentDataConfigurationProperty | cdk.IResolvable) } | cdk.IResolvable;

    /**
     * Describes the events that can be raised on the component. Use for the workflow feature in Amplify Studio that allows you to bind events and actions to components.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-events
     */
    readonly events?: { [key: string]: (CfnComponent.ComponentEventProperty | cdk.IResolvable) } | cdk.IResolvable;

    /**
     * The schema version of the component when it was imported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-schemaversion
     */
    readonly schemaVersion?: string;

    /**
     * The unique ID of the component in its original source system, such as Figma.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-sourceid
     */
    readonly sourceId?: string;

    /**
     * One or more key-value pairs to use when tagging the component.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-tags
     */
    readonly tags?: { [key: string]: (string) };
}

/**
 * Determine whether the given properties match those of a `CfnComponentProps`
 *
 * @param properties - the TypeScript properties of a `CfnComponentProps`
 *
 * @returns the result of the validation.
 */
function CfnComponentPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bindingProperties', cdk.requiredValidator)(properties.bindingProperties));
    errors.collect(cdk.propertyValidator('bindingProperties', cdk.hashValidator(CfnComponent_ComponentBindingPropertiesValuePropertyValidator))(properties.bindingProperties));
    errors.collect(cdk.propertyValidator('children', cdk.listValidator(CfnComponent_ComponentChildPropertyValidator))(properties.children));
    errors.collect(cdk.propertyValidator('collectionProperties', cdk.hashValidator(CfnComponent_ComponentDataConfigurationPropertyValidator))(properties.collectionProperties));
    errors.collect(cdk.propertyValidator('componentType', cdk.requiredValidator)(properties.componentType));
    errors.collect(cdk.propertyValidator('componentType', cdk.validateString)(properties.componentType));
    errors.collect(cdk.propertyValidator('events', cdk.hashValidator(CfnComponent_ComponentEventPropertyValidator))(properties.events));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('overrides', cdk.requiredValidator)(properties.overrides));
    errors.collect(cdk.propertyValidator('overrides', cdk.hashValidator(cdk.validateObject))(properties.overrides));
    errors.collect(cdk.propertyValidator('properties', cdk.requiredValidator)(properties.properties));
    errors.collect(cdk.propertyValidator('properties', cdk.hashValidator(CfnComponent_ComponentPropertyPropertyValidator))(properties.properties));
    errors.collect(cdk.propertyValidator('schemaVersion', cdk.validateString)(properties.schemaVersion));
    errors.collect(cdk.propertyValidator('sourceId', cdk.validateString)(properties.sourceId));
    errors.collect(cdk.propertyValidator('tags', cdk.hashValidator(cdk.validateString))(properties.tags));
    errors.collect(cdk.propertyValidator('variants', cdk.requiredValidator)(properties.variants));
    errors.collect(cdk.propertyValidator('variants', cdk.listValidator(CfnComponent_ComponentVariantPropertyValidator))(properties.variants));
    return errors.wrap('supplied properties not correct for "CfnComponentProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component` resource
 *
 * @param properties - the TypeScript properties of a `CfnComponentProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component` resource.
 */
// @ts-ignore TS6133
function cfnComponentPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponentPropsValidator(properties).assertSuccess();
    return {
        BindingProperties: cdk.hashMapper(cfnComponentComponentBindingPropertiesValuePropertyToCloudFormation)(properties.bindingProperties),
        ComponentType: cdk.stringToCloudFormation(properties.componentType),
        Name: cdk.stringToCloudFormation(properties.name),
        Overrides: cdk.hashMapper(cdk.objectToCloudFormation)(properties.overrides),
        Properties: cdk.hashMapper(cfnComponentComponentPropertyPropertyToCloudFormation)(properties.properties),
        Variants: cdk.listMapper(cfnComponentComponentVariantPropertyToCloudFormation)(properties.variants),
        Children: cdk.listMapper(cfnComponentComponentChildPropertyToCloudFormation)(properties.children),
        CollectionProperties: cdk.hashMapper(cfnComponentComponentDataConfigurationPropertyToCloudFormation)(properties.collectionProperties),
        Events: cdk.hashMapper(cfnComponentComponentEventPropertyToCloudFormation)(properties.events),
        SchemaVersion: cdk.stringToCloudFormation(properties.schemaVersion),
        SourceId: cdk.stringToCloudFormation(properties.sourceId),
        Tags: cdk.hashMapper(cdk.stringToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnComponentPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponentProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponentProps>();
    ret.addPropertyResult('bindingProperties', 'BindingProperties', cfn_parse.FromCloudFormation.getMap(CfnComponentComponentBindingPropertiesValuePropertyFromCloudFormation)(properties.BindingProperties));
    ret.addPropertyResult('componentType', 'ComponentType', cfn_parse.FromCloudFormation.getString(properties.ComponentType));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('overrides', 'Overrides', cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getAny)(properties.Overrides));
    ret.addPropertyResult('properties', 'Properties', cfn_parse.FromCloudFormation.getMap(CfnComponentComponentPropertyPropertyFromCloudFormation)(properties.Properties));
    ret.addPropertyResult('variants', 'Variants', cfn_parse.FromCloudFormation.getArray(CfnComponentComponentVariantPropertyFromCloudFormation)(properties.Variants));
    ret.addPropertyResult('children', 'Children', properties.Children != null ? cfn_parse.FromCloudFormation.getArray(CfnComponentComponentChildPropertyFromCloudFormation)(properties.Children) : undefined);
    ret.addPropertyResult('collectionProperties', 'CollectionProperties', properties.CollectionProperties != null ? cfn_parse.FromCloudFormation.getMap(CfnComponentComponentDataConfigurationPropertyFromCloudFormation)(properties.CollectionProperties) : undefined);
    ret.addPropertyResult('events', 'Events', properties.Events != null ? cfn_parse.FromCloudFormation.getMap(CfnComponentComponentEventPropertyFromCloudFormation)(properties.Events) : undefined);
    ret.addPropertyResult('schemaVersion', 'SchemaVersion', properties.SchemaVersion != null ? cfn_parse.FromCloudFormation.getString(properties.SchemaVersion) : undefined);
    ret.addPropertyResult('sourceId', 'SourceId', properties.SourceId != null ? cfn_parse.FromCloudFormation.getString(properties.SourceId) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AmplifyUIBuilder::Component`
 *
 * The AWS::AmplifyUIBuilder::Component resource specifies a component within an Amplify app. A component is a user interface (UI) element that you can customize. Use `ComponentChild` to configure an instance of a `Component` . A `ComponentChild` instance inherits the configuration of the main `Component` .
 *
 * @cloudformationResource AWS::AmplifyUIBuilder::Component
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html
 */
export class CfnComponent extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AmplifyUIBuilder::Component";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnComponent {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnComponentPropsFromCloudFormation(resourceProperties);
        const ret = new CfnComponent(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The unique ID for the Amplify app.
     * @cloudformationAttribute AppId
     */
    public readonly attrAppId: string;

    /**
     * The name of the backend environment that is a part of the Amplify app.
     * @cloudformationAttribute EnvironmentName
     */
    public readonly attrEnvironmentName: string;

    /**
     * The unique ID of the component.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The information to connect a component's properties to data at runtime. You can't specify `tags` as a valid property for `bindingProperties` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-bindingproperties
     */
    public bindingProperties: { [key: string]: (CfnComponent.ComponentBindingPropertiesValueProperty | cdk.IResolvable) } | cdk.IResolvable;

    /**
     * The type of the component. This can be an Amplify custom UI component or another custom component.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-componenttype
     */
    public componentType: string;

    /**
     * The name of the component.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-name
     */
    public name: string;

    /**
     * Describes the component's properties that can be overriden in a customized instance of the component. You can't specify `tags` as a valid property for `overrides` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-overrides
     */
    public overrides: { [key: string]: (any | cdk.IResolvable | cdk.IResolvable) } | cdk.IResolvable;

    /**
     * Describes the component's properties. You can't specify `tags` as a valid property for `properties` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-properties
     */
    public properties: { [key: string]: (CfnComponent.ComponentPropertyProperty | cdk.IResolvable) } | cdk.IResolvable;

    /**
     * A list of the component's variants. A variant is a unique style configuration of a main component.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-variants
     */
    public variants: Array<CfnComponent.ComponentVariantProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A list of the component's `ComponentChild` instances.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-children
     */
    public children: Array<CfnComponent.ComponentChildProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The data binding configuration for the component's properties. Use this for a collection component. You can't specify `tags` as a valid property for `collectionProperties` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-collectionproperties
     */
    public collectionProperties: { [key: string]: (CfnComponent.ComponentDataConfigurationProperty | cdk.IResolvable) } | cdk.IResolvable | undefined;

    /**
     * Describes the events that can be raised on the component. Use for the workflow feature in Amplify Studio that allows you to bind events and actions to components.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-events
     */
    public events: { [key: string]: (CfnComponent.ComponentEventProperty | cdk.IResolvable) } | cdk.IResolvable | undefined;

    /**
     * The schema version of the component when it was imported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-schemaversion
     */
    public schemaVersion: string | undefined;

    /**
     * The unique ID of the component in its original source system, such as Figma.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-sourceid
     */
    public sourceId: string | undefined;

    /**
     * One or more key-value pairs to use when tagging the component.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html#cfn-amplifyuibuilder-component-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::AmplifyUIBuilder::Component`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnComponentProps) {
        super(scope, id, { type: CfnComponent.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'bindingProperties', this);
        cdk.requireProperty(props, 'componentType', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'overrides', this);
        cdk.requireProperty(props, 'properties', this);
        cdk.requireProperty(props, 'variants', this);
        this.attrAppId = cdk.Token.asString(this.getAtt('AppId'));
        this.attrEnvironmentName = cdk.Token.asString(this.getAtt('EnvironmentName'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.bindingProperties = props.bindingProperties;
        this.componentType = props.componentType;
        this.name = props.name;
        this.overrides = props.overrides;
        this.properties = props.properties;
        this.variants = props.variants;
        this.children = props.children;
        this.collectionProperties = props.collectionProperties;
        this.events = props.events;
        this.schemaVersion = props.schemaVersion;
        this.sourceId = props.sourceId;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::AmplifyUIBuilder::Component", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnComponent.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            bindingProperties: this.bindingProperties,
            componentType: this.componentType,
            name: this.name,
            overrides: this.overrides,
            properties: this.properties,
            variants: this.variants,
            children: this.children,
            collectionProperties: this.collectionProperties,
            events: this.events,
            schemaVersion: this.schemaVersion,
            sourceId: this.sourceId,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnComponentPropsToCloudFormation(props);
    }
}

export namespace CfnComponent {
    /**
     * The `ActionParameters` property specifies the event action configuration for an element of a `Component` or `ComponentChild` . Use for the workflow feature in Amplify Studio that allows you to bind events and actions to components. `ActionParameters` defines the action that is performed when an event occurs on the component.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-actionparameters.html
     */
    export interface ActionParametersProperty {
        /**
         * The HTML anchor link to the location to open. Specify this value for a navigation action.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-actionparameters.html#cfn-amplifyuibuilder-component-actionparameters-anchor
         */
        readonly anchor?: CfnComponent.ComponentPropertyProperty | cdk.IResolvable;
        /**
         * A dictionary of key-value pairs mapping Amplify Studio properties to fields in a data model. Use when the action performs an operation on an Amplify DataStore model.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-actionparameters.html#cfn-amplifyuibuilder-component-actionparameters-fields
         */
        readonly fields?: any | cdk.IResolvable | cdk.IResolvable;
        /**
         * Specifies whether the user should be signed out globally. Specify this value for an auth sign out action.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-actionparameters.html#cfn-amplifyuibuilder-component-actionparameters-global
         */
        readonly global?: CfnComponent.ComponentPropertyProperty | cdk.IResolvable;
        /**
         * The unique ID of the component that the `ActionParameters` apply to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-actionparameters.html#cfn-amplifyuibuilder-component-actionparameters-id
         */
        readonly id?: CfnComponent.ComponentPropertyProperty | cdk.IResolvable;
        /**
         * The name of the data model. Use when the action performs an operation on an Amplify DataStore model.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-actionparameters.html#cfn-amplifyuibuilder-component-actionparameters-model
         */
        readonly model?: string;
        /**
         * A key-value pair that specifies the state property name and its initial value.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-actionparameters.html#cfn-amplifyuibuilder-component-actionparameters-state
         */
        readonly state?: CfnComponent.MutationActionSetStateParameterProperty | cdk.IResolvable;
        /**
         * The element within the same component to modify when the action occurs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-actionparameters.html#cfn-amplifyuibuilder-component-actionparameters-target
         */
        readonly target?: CfnComponent.ComponentPropertyProperty | cdk.IResolvable;
        /**
         * The type of navigation action. Valid values are `url` and `anchor` . This value is required for a navigation action.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-actionparameters.html#cfn-amplifyuibuilder-component-actionparameters-type
         */
        readonly type?: CfnComponent.ComponentPropertyProperty | cdk.IResolvable;
        /**
         * The URL to the location to open. Specify this value for a navigation action.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-actionparameters.html#cfn-amplifyuibuilder-component-actionparameters-url
         */
        readonly url?: CfnComponent.ComponentPropertyProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ActionParametersProperty`
 *
 * @param properties - the TypeScript properties of a `ActionParametersProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponent_ActionParametersPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('anchor', CfnComponent_ComponentPropertyPropertyValidator)(properties.anchor));
    errors.collect(cdk.propertyValidator('fields', cdk.validateObject)(properties.fields));
    errors.collect(cdk.propertyValidator('global', CfnComponent_ComponentPropertyPropertyValidator)(properties.global));
    errors.collect(cdk.propertyValidator('id', CfnComponent_ComponentPropertyPropertyValidator)(properties.id));
    errors.collect(cdk.propertyValidator('model', cdk.validateString)(properties.model));
    errors.collect(cdk.propertyValidator('state', CfnComponent_MutationActionSetStateParameterPropertyValidator)(properties.state));
    errors.collect(cdk.propertyValidator('target', CfnComponent_ComponentPropertyPropertyValidator)(properties.target));
    errors.collect(cdk.propertyValidator('type', CfnComponent_ComponentPropertyPropertyValidator)(properties.type));
    errors.collect(cdk.propertyValidator('url', CfnComponent_ComponentPropertyPropertyValidator)(properties.url));
    return errors.wrap('supplied properties not correct for "ActionParametersProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ActionParameters` resource
 *
 * @param properties - the TypeScript properties of a `ActionParametersProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ActionParameters` resource.
 */
// @ts-ignore TS6133
function cfnComponentActionParametersPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponent_ActionParametersPropertyValidator(properties).assertSuccess();
    return {
        Anchor: cfnComponentComponentPropertyPropertyToCloudFormation(properties.anchor),
        Fields: cdk.objectToCloudFormation(properties.fields),
        Global: cfnComponentComponentPropertyPropertyToCloudFormation(properties.global),
        Id: cfnComponentComponentPropertyPropertyToCloudFormation(properties.id),
        Model: cdk.stringToCloudFormation(properties.model),
        State: cfnComponentMutationActionSetStateParameterPropertyToCloudFormation(properties.state),
        Target: cfnComponentComponentPropertyPropertyToCloudFormation(properties.target),
        Type: cfnComponentComponentPropertyPropertyToCloudFormation(properties.type),
        Url: cfnComponentComponentPropertyPropertyToCloudFormation(properties.url),
    };
}

// @ts-ignore TS6133
function CfnComponentActionParametersPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponent.ActionParametersProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponent.ActionParametersProperty>();
    ret.addPropertyResult('anchor', 'Anchor', properties.Anchor != null ? CfnComponentComponentPropertyPropertyFromCloudFormation(properties.Anchor) : undefined);
    ret.addPropertyResult('fields', 'Fields', properties.Fields != null ? cfn_parse.FromCloudFormation.getAny(properties.Fields) : undefined);
    ret.addPropertyResult('global', 'Global', properties.Global != null ? CfnComponentComponentPropertyPropertyFromCloudFormation(properties.Global) : undefined);
    ret.addPropertyResult('id', 'Id', properties.Id != null ? CfnComponentComponentPropertyPropertyFromCloudFormation(properties.Id) : undefined);
    ret.addPropertyResult('model', 'Model', properties.Model != null ? cfn_parse.FromCloudFormation.getString(properties.Model) : undefined);
    ret.addPropertyResult('state', 'State', properties.State != null ? CfnComponentMutationActionSetStateParameterPropertyFromCloudFormation(properties.State) : undefined);
    ret.addPropertyResult('target', 'Target', properties.Target != null ? CfnComponentComponentPropertyPropertyFromCloudFormation(properties.Target) : undefined);
    ret.addPropertyResult('type', 'Type', properties.Type != null ? CfnComponentComponentPropertyPropertyFromCloudFormation(properties.Type) : undefined);
    ret.addPropertyResult('url', 'Url', properties.Url != null ? CfnComponentComponentPropertyPropertyFromCloudFormation(properties.Url) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponent {
    /**
     * The `ComponentBindingPropertiesValue` property specifies the data binding configuration for a component at runtime. You can use `ComponentBindingPropertiesValue` to add exposed properties to a component to allow different values to be entered when a component is reused in different places in an app.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentbindingpropertiesvalue.html
     */
    export interface ComponentBindingPropertiesValueProperty {
        /**
         * Describes the properties to customize with data at runtime.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentbindingpropertiesvalue.html#cfn-amplifyuibuilder-component-componentbindingpropertiesvalue-bindingproperties
         */
        readonly bindingProperties?: CfnComponent.ComponentBindingPropertiesValuePropertiesProperty | cdk.IResolvable;
        /**
         * The default value of the property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentbindingpropertiesvalue.html#cfn-amplifyuibuilder-component-componentbindingpropertiesvalue-defaultvalue
         */
        readonly defaultValue?: string;
        /**
         * The property type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentbindingpropertiesvalue.html#cfn-amplifyuibuilder-component-componentbindingpropertiesvalue-type
         */
        readonly type?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ComponentBindingPropertiesValueProperty`
 *
 * @param properties - the TypeScript properties of a `ComponentBindingPropertiesValueProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponent_ComponentBindingPropertiesValuePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bindingProperties', CfnComponent_ComponentBindingPropertiesValuePropertiesPropertyValidator)(properties.bindingProperties));
    errors.collect(cdk.propertyValidator('defaultValue', cdk.validateString)(properties.defaultValue));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "ComponentBindingPropertiesValueProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentBindingPropertiesValue` resource
 *
 * @param properties - the TypeScript properties of a `ComponentBindingPropertiesValueProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentBindingPropertiesValue` resource.
 */
// @ts-ignore TS6133
function cfnComponentComponentBindingPropertiesValuePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponent_ComponentBindingPropertiesValuePropertyValidator(properties).assertSuccess();
    return {
        BindingProperties: cfnComponentComponentBindingPropertiesValuePropertiesPropertyToCloudFormation(properties.bindingProperties),
        DefaultValue: cdk.stringToCloudFormation(properties.defaultValue),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnComponentComponentBindingPropertiesValuePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponent.ComponentBindingPropertiesValueProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponent.ComponentBindingPropertiesValueProperty>();
    ret.addPropertyResult('bindingProperties', 'BindingProperties', properties.BindingProperties != null ? CfnComponentComponentBindingPropertiesValuePropertiesPropertyFromCloudFormation(properties.BindingProperties) : undefined);
    ret.addPropertyResult('defaultValue', 'DefaultValue', properties.DefaultValue != null ? cfn_parse.FromCloudFormation.getString(properties.DefaultValue) : undefined);
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponent {
    /**
     * The `ComponentBindingPropertiesValueProperties` property specifies the data binding configuration for a specific property using data stored in AWS . For AWS connected properties, you can bind a property to data stored in an Amazon S3 bucket, an Amplify DataStore model or an authenticated user attribute.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentbindingpropertiesvalueproperties.html
     */
    export interface ComponentBindingPropertiesValuePropertiesProperty {
        /**
         * An Amazon S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentbindingpropertiesvalueproperties.html#cfn-amplifyuibuilder-component-componentbindingpropertiesvalueproperties-bucket
         */
        readonly bucket?: string;
        /**
         * The default value to assign to the property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentbindingpropertiesvalueproperties.html#cfn-amplifyuibuilder-component-componentbindingpropertiesvalueproperties-defaultvalue
         */
        readonly defaultValue?: string;
        /**
         * The field to bind the data to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentbindingpropertiesvalueproperties.html#cfn-amplifyuibuilder-component-componentbindingpropertiesvalueproperties-field
         */
        readonly field?: string;
        /**
         * The storage key for an Amazon S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentbindingpropertiesvalueproperties.html#cfn-amplifyuibuilder-component-componentbindingpropertiesvalueproperties-key
         */
        readonly key?: string;
        /**
         * An Amplify DataStore model.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentbindingpropertiesvalueproperties.html#cfn-amplifyuibuilder-component-componentbindingpropertiesvalueproperties-model
         */
        readonly model?: string;
        /**
         * A list of predicates for binding a component's properties to data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentbindingpropertiesvalueproperties.html#cfn-amplifyuibuilder-component-componentbindingpropertiesvalueproperties-predicates
         */
        readonly predicates?: Array<CfnComponent.PredicateProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * An authenticated user attribute.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentbindingpropertiesvalueproperties.html#cfn-amplifyuibuilder-component-componentbindingpropertiesvalueproperties-userattribute
         */
        readonly userAttribute?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ComponentBindingPropertiesValuePropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `ComponentBindingPropertiesValuePropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponent_ComponentBindingPropertiesValuePropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucket', cdk.validateString)(properties.bucket));
    errors.collect(cdk.propertyValidator('defaultValue', cdk.validateString)(properties.defaultValue));
    errors.collect(cdk.propertyValidator('field', cdk.validateString)(properties.field));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('model', cdk.validateString)(properties.model));
    errors.collect(cdk.propertyValidator('predicates', cdk.listValidator(CfnComponent_PredicatePropertyValidator))(properties.predicates));
    errors.collect(cdk.propertyValidator('userAttribute', cdk.validateString)(properties.userAttribute));
    return errors.wrap('supplied properties not correct for "ComponentBindingPropertiesValuePropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentBindingPropertiesValueProperties` resource
 *
 * @param properties - the TypeScript properties of a `ComponentBindingPropertiesValuePropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentBindingPropertiesValueProperties` resource.
 */
// @ts-ignore TS6133
function cfnComponentComponentBindingPropertiesValuePropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponent_ComponentBindingPropertiesValuePropertiesPropertyValidator(properties).assertSuccess();
    return {
        Bucket: cdk.stringToCloudFormation(properties.bucket),
        DefaultValue: cdk.stringToCloudFormation(properties.defaultValue),
        Field: cdk.stringToCloudFormation(properties.field),
        Key: cdk.stringToCloudFormation(properties.key),
        Model: cdk.stringToCloudFormation(properties.model),
        Predicates: cdk.listMapper(cfnComponentPredicatePropertyToCloudFormation)(properties.predicates),
        UserAttribute: cdk.stringToCloudFormation(properties.userAttribute),
    };
}

// @ts-ignore TS6133
function CfnComponentComponentBindingPropertiesValuePropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponent.ComponentBindingPropertiesValuePropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponent.ComponentBindingPropertiesValuePropertiesProperty>();
    ret.addPropertyResult('bucket', 'Bucket', properties.Bucket != null ? cfn_parse.FromCloudFormation.getString(properties.Bucket) : undefined);
    ret.addPropertyResult('defaultValue', 'DefaultValue', properties.DefaultValue != null ? cfn_parse.FromCloudFormation.getString(properties.DefaultValue) : undefined);
    ret.addPropertyResult('field', 'Field', properties.Field != null ? cfn_parse.FromCloudFormation.getString(properties.Field) : undefined);
    ret.addPropertyResult('key', 'Key', properties.Key != null ? cfn_parse.FromCloudFormation.getString(properties.Key) : undefined);
    ret.addPropertyResult('model', 'Model', properties.Model != null ? cfn_parse.FromCloudFormation.getString(properties.Model) : undefined);
    ret.addPropertyResult('predicates', 'Predicates', properties.Predicates != null ? cfn_parse.FromCloudFormation.getArray(CfnComponentPredicatePropertyFromCloudFormation)(properties.Predicates) : undefined);
    ret.addPropertyResult('userAttribute', 'UserAttribute', properties.UserAttribute != null ? cfn_parse.FromCloudFormation.getString(properties.UserAttribute) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponent {
    /**
     * The `ComponentChild` property specifies a nested UI configuration within a parent `Component` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentchild.html
     */
    export interface ComponentChildProperty {
        /**
         * The list of `ComponentChild` instances for this component.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentchild.html#cfn-amplifyuibuilder-component-componentchild-children
         */
        readonly children?: Array<CfnComponent.ComponentChildProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The type of the child component.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentchild.html#cfn-amplifyuibuilder-component-componentchild-componenttype
         */
        readonly componentType: string;
        /**
         * Describes the events that can be raised on the child component. Use for the workflow feature in Amplify Studio that allows you to bind events and actions to components.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentchild.html#cfn-amplifyuibuilder-component-componentchild-events
         */
        readonly events?: any | cdk.IResolvable | cdk.IResolvable;
        /**
         * The name of the child component.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentchild.html#cfn-amplifyuibuilder-component-componentchild-name
         */
        readonly name: string;
        /**
         * Describes the properties of the child component. You can't specify `tags` as a valid property for `properties` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentchild.html#cfn-amplifyuibuilder-component-componentchild-properties
         */
        readonly properties: any | cdk.IResolvable | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ComponentChildProperty`
 *
 * @param properties - the TypeScript properties of a `ComponentChildProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponent_ComponentChildPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('children', cdk.listValidator(CfnComponent_ComponentChildPropertyValidator))(properties.children));
    errors.collect(cdk.propertyValidator('componentType', cdk.requiredValidator)(properties.componentType));
    errors.collect(cdk.propertyValidator('componentType', cdk.validateString)(properties.componentType));
    errors.collect(cdk.propertyValidator('events', cdk.validateObject)(properties.events));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('properties', cdk.requiredValidator)(properties.properties));
    errors.collect(cdk.propertyValidator('properties', cdk.validateObject)(properties.properties));
    return errors.wrap('supplied properties not correct for "ComponentChildProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentChild` resource
 *
 * @param properties - the TypeScript properties of a `ComponentChildProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentChild` resource.
 */
// @ts-ignore TS6133
function cfnComponentComponentChildPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponent_ComponentChildPropertyValidator(properties).assertSuccess();
    return {
        Children: cdk.listMapper(cfnComponentComponentChildPropertyToCloudFormation)(properties.children),
        ComponentType: cdk.stringToCloudFormation(properties.componentType),
        Events: cdk.objectToCloudFormation(properties.events),
        Name: cdk.stringToCloudFormation(properties.name),
        Properties: cdk.objectToCloudFormation(properties.properties),
    };
}

// @ts-ignore TS6133
function CfnComponentComponentChildPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponent.ComponentChildProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponent.ComponentChildProperty>();
    ret.addPropertyResult('children', 'Children', properties.Children != null ? cfn_parse.FromCloudFormation.getArray(CfnComponentComponentChildPropertyFromCloudFormation)(properties.Children) : undefined);
    ret.addPropertyResult('componentType', 'ComponentType', cfn_parse.FromCloudFormation.getString(properties.ComponentType));
    ret.addPropertyResult('events', 'Events', properties.Events != null ? cfn_parse.FromCloudFormation.getAny(properties.Events) : undefined);
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('properties', 'Properties', cfn_parse.FromCloudFormation.getAny(properties.Properties));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponent {
    /**
     * The `ComponentConditionProperty` property specifies a conditional expression for setting a component property. Use `ComponentConditionProperty` to set a property to different values conditionally, based on the value of another property.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentconditionproperty.html
     */
    export interface ComponentConditionPropertyProperty {
        /**
         * The value to assign to the property if the condition is not met.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentconditionproperty.html#cfn-amplifyuibuilder-component-componentconditionproperty-else
         */
        readonly else?: CfnComponent.ComponentPropertyProperty | cdk.IResolvable;
        /**
         * The name of a field. Specify this when the property is a data model.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentconditionproperty.html#cfn-amplifyuibuilder-component-componentconditionproperty-field
         */
        readonly field?: string;
        /**
         * The value of the property to evaluate.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentconditionproperty.html#cfn-amplifyuibuilder-component-componentconditionproperty-operand
         */
        readonly operand?: string;
        /**
         * The type of the property to evaluate.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentconditionproperty.html#cfn-amplifyuibuilder-component-componentconditionproperty-operandtype
         */
        readonly operandType?: string;
        /**
         * The operator to use to perform the evaluation, such as `eq` to represent equals.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentconditionproperty.html#cfn-amplifyuibuilder-component-componentconditionproperty-operator
         */
        readonly operator?: string;
        /**
         * The name of the conditional property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentconditionproperty.html#cfn-amplifyuibuilder-component-componentconditionproperty-property
         */
        readonly property?: string;
        /**
         * The value to assign to the property if the condition is met.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentconditionproperty.html#cfn-amplifyuibuilder-component-componentconditionproperty-then
         */
        readonly then?: CfnComponent.ComponentPropertyProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ComponentConditionPropertyProperty`
 *
 * @param properties - the TypeScript properties of a `ComponentConditionPropertyProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponent_ComponentConditionPropertyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('else', CfnComponent_ComponentPropertyPropertyValidator)(properties.else));
    errors.collect(cdk.propertyValidator('field', cdk.validateString)(properties.field));
    errors.collect(cdk.propertyValidator('operand', cdk.validateString)(properties.operand));
    errors.collect(cdk.propertyValidator('operandType', cdk.validateString)(properties.operandType));
    errors.collect(cdk.propertyValidator('operator', cdk.validateString)(properties.operator));
    errors.collect(cdk.propertyValidator('property', cdk.validateString)(properties.property));
    errors.collect(cdk.propertyValidator('then', CfnComponent_ComponentPropertyPropertyValidator)(properties.then));
    return errors.wrap('supplied properties not correct for "ComponentConditionPropertyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentConditionProperty` resource
 *
 * @param properties - the TypeScript properties of a `ComponentConditionPropertyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentConditionProperty` resource.
 */
// @ts-ignore TS6133
function cfnComponentComponentConditionPropertyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponent_ComponentConditionPropertyPropertyValidator(properties).assertSuccess();
    return {
        Else: cfnComponentComponentPropertyPropertyToCloudFormation(properties.else),
        Field: cdk.stringToCloudFormation(properties.field),
        Operand: cdk.stringToCloudFormation(properties.operand),
        OperandType: cdk.stringToCloudFormation(properties.operandType),
        Operator: cdk.stringToCloudFormation(properties.operator),
        Property: cdk.stringToCloudFormation(properties.property),
        Then: cfnComponentComponentPropertyPropertyToCloudFormation(properties.then),
    };
}

// @ts-ignore TS6133
function CfnComponentComponentConditionPropertyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponent.ComponentConditionPropertyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponent.ComponentConditionPropertyProperty>();
    ret.addPropertyResult('else', 'Else', properties.Else != null ? CfnComponentComponentPropertyPropertyFromCloudFormation(properties.Else) : undefined);
    ret.addPropertyResult('field', 'Field', properties.Field != null ? cfn_parse.FromCloudFormation.getString(properties.Field) : undefined);
    ret.addPropertyResult('operand', 'Operand', properties.Operand != null ? cfn_parse.FromCloudFormation.getString(properties.Operand) : undefined);
    ret.addPropertyResult('operandType', 'OperandType', properties.OperandType != null ? cfn_parse.FromCloudFormation.getString(properties.OperandType) : undefined);
    ret.addPropertyResult('operator', 'Operator', properties.Operator != null ? cfn_parse.FromCloudFormation.getString(properties.Operator) : undefined);
    ret.addPropertyResult('property', 'Property', properties.Property != null ? cfn_parse.FromCloudFormation.getString(properties.Property) : undefined);
    ret.addPropertyResult('then', 'Then', properties.Then != null ? CfnComponentComponentPropertyPropertyFromCloudFormation(properties.Then) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponent {
    /**
     * The `ComponentDataConfiguration` property specifies the configuration for binding a component's properties to data.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentdataconfiguration.html
     */
    export interface ComponentDataConfigurationProperty {
        /**
         * A list of IDs to use to bind data to a component. Use this property to bind specifically chosen data, rather than data retrieved from a query.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentdataconfiguration.html#cfn-amplifyuibuilder-component-componentdataconfiguration-identifiers
         */
        readonly identifiers?: string[];
        /**
         * The name of the data model to use to bind data to a component.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentdataconfiguration.html#cfn-amplifyuibuilder-component-componentdataconfiguration-model
         */
        readonly model: string;
        /**
         * Represents the conditional logic to use when binding data to a component. Use this property to retrieve only a subset of the data in a collection.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentdataconfiguration.html#cfn-amplifyuibuilder-component-componentdataconfiguration-predicate
         */
        readonly predicate?: CfnComponent.PredicateProperty | cdk.IResolvable;
        /**
         * Describes how to sort the component's properties.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentdataconfiguration.html#cfn-amplifyuibuilder-component-componentdataconfiguration-sort
         */
        readonly sort?: Array<CfnComponent.SortPropertyProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ComponentDataConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ComponentDataConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponent_ComponentDataConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('identifiers', cdk.listValidator(cdk.validateString))(properties.identifiers));
    errors.collect(cdk.propertyValidator('model', cdk.requiredValidator)(properties.model));
    errors.collect(cdk.propertyValidator('model', cdk.validateString)(properties.model));
    errors.collect(cdk.propertyValidator('predicate', CfnComponent_PredicatePropertyValidator)(properties.predicate));
    errors.collect(cdk.propertyValidator('sort', cdk.listValidator(CfnComponent_SortPropertyPropertyValidator))(properties.sort));
    return errors.wrap('supplied properties not correct for "ComponentDataConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentDataConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ComponentDataConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentDataConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnComponentComponentDataConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponent_ComponentDataConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Identifiers: cdk.listMapper(cdk.stringToCloudFormation)(properties.identifiers),
        Model: cdk.stringToCloudFormation(properties.model),
        Predicate: cfnComponentPredicatePropertyToCloudFormation(properties.predicate),
        Sort: cdk.listMapper(cfnComponentSortPropertyPropertyToCloudFormation)(properties.sort),
    };
}

// @ts-ignore TS6133
function CfnComponentComponentDataConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponent.ComponentDataConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponent.ComponentDataConfigurationProperty>();
    ret.addPropertyResult('identifiers', 'Identifiers', properties.Identifiers != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Identifiers) : undefined);
    ret.addPropertyResult('model', 'Model', cfn_parse.FromCloudFormation.getString(properties.Model));
    ret.addPropertyResult('predicate', 'Predicate', properties.Predicate != null ? CfnComponentPredicatePropertyFromCloudFormation(properties.Predicate) : undefined);
    ret.addPropertyResult('sort', 'Sort', properties.Sort != null ? cfn_parse.FromCloudFormation.getArray(CfnComponentSortPropertyPropertyFromCloudFormation)(properties.Sort) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponent {
    /**
     * The `ComponentEvent` property specifies the configuration of an event. You can bind an event and a corresponding action to a `Component` or a `ComponentChild` . A button click is an example of an event.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentevent.html
     */
    export interface ComponentEventProperty {
        /**
         * The action to perform when a specific event is raised.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentevent.html#cfn-amplifyuibuilder-component-componentevent-action
         */
        readonly action?: string;
        /**
         * Describes information about the action.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentevent.html#cfn-amplifyuibuilder-component-componentevent-parameters
         */
        readonly parameters?: CfnComponent.ActionParametersProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ComponentEventProperty`
 *
 * @param properties - the TypeScript properties of a `ComponentEventProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponent_ComponentEventPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('action', cdk.validateString)(properties.action));
    errors.collect(cdk.propertyValidator('parameters', CfnComponent_ActionParametersPropertyValidator)(properties.parameters));
    return errors.wrap('supplied properties not correct for "ComponentEventProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentEvent` resource
 *
 * @param properties - the TypeScript properties of a `ComponentEventProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentEvent` resource.
 */
// @ts-ignore TS6133
function cfnComponentComponentEventPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponent_ComponentEventPropertyValidator(properties).assertSuccess();
    return {
        Action: cdk.stringToCloudFormation(properties.action),
        Parameters: cfnComponentActionParametersPropertyToCloudFormation(properties.parameters),
    };
}

// @ts-ignore TS6133
function CfnComponentComponentEventPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponent.ComponentEventProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponent.ComponentEventProperty>();
    ret.addPropertyResult('action', 'Action', properties.Action != null ? cfn_parse.FromCloudFormation.getString(properties.Action) : undefined);
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? CfnComponentActionParametersPropertyFromCloudFormation(properties.Parameters) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponent {
    /**
     * The `ComponentProperty` property specifies the configuration for all of a component's properties. Use `ComponentProperty` to specify the values to render or bind by default.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html
     */
    export interface ComponentPropertyProperty {
        /**
         * The information to bind the component property to data at runtime.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-bindingproperties
         */
        readonly bindingProperties?: CfnComponent.ComponentPropertyBindingPropertiesProperty | cdk.IResolvable;
        /**
         * The information to bind the component property to form data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-bindings
         */
        readonly bindings?: any | cdk.IResolvable | cdk.IResolvable;
        /**
         * The information to bind the component property to data at runtime. Use this for collection components.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-collectionbindingproperties
         */
        readonly collectionBindingProperties?: CfnComponent.ComponentPropertyBindingPropertiesProperty | cdk.IResolvable;
        /**
         * The name of the component that is affected by an event.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-componentname
         */
        readonly componentName?: string;
        /**
         * A list of component properties to concatenate to create the value to assign to this component property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-concat
         */
        readonly concat?: Array<CfnComponent.ComponentPropertyProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The conditional expression to use to assign a value to the component property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-condition
         */
        readonly condition?: CfnComponent.ComponentConditionPropertyProperty | cdk.IResolvable;
        /**
         * Specifies whether the user configured the property in Amplify Studio after importing it.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-configured
         */
        readonly configured?: boolean | cdk.IResolvable;
        /**
         * The default value to assign to the component property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-defaultvalue
         */
        readonly defaultValue?: string;
        /**
         * An event that occurs in your app. Use this for workflow data binding.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-event
         */
        readonly event?: string;
        /**
         * The default value assigned to the property when the component is imported into an app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-importedvalue
         */
        readonly importedValue?: string;
        /**
         * The data model to use to assign a value to the component property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-model
         */
        readonly model?: string;
        /**
         * The name of the component's property that is affected by an event.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-property
         */
        readonly property?: string;
        /**
         * The component type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-type
         */
        readonly type?: string;
        /**
         * An authenticated user attribute to use to assign a value to the component property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-userattribute
         */
        readonly userAttribute?: string;
        /**
         * The value to assign to the component property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentproperty.html#cfn-amplifyuibuilder-component-componentproperty-value
         */
        readonly value?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ComponentPropertyProperty`
 *
 * @param properties - the TypeScript properties of a `ComponentPropertyProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponent_ComponentPropertyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bindingProperties', CfnComponent_ComponentPropertyBindingPropertiesPropertyValidator)(properties.bindingProperties));
    errors.collect(cdk.propertyValidator('bindings', cdk.validateObject)(properties.bindings));
    errors.collect(cdk.propertyValidator('collectionBindingProperties', CfnComponent_ComponentPropertyBindingPropertiesPropertyValidator)(properties.collectionBindingProperties));
    errors.collect(cdk.propertyValidator('componentName', cdk.validateString)(properties.componentName));
    errors.collect(cdk.propertyValidator('concat', cdk.listValidator(CfnComponent_ComponentPropertyPropertyValidator))(properties.concat));
    errors.collect(cdk.propertyValidator('condition', CfnComponent_ComponentConditionPropertyPropertyValidator)(properties.condition));
    errors.collect(cdk.propertyValidator('configured', cdk.validateBoolean)(properties.configured));
    errors.collect(cdk.propertyValidator('defaultValue', cdk.validateString)(properties.defaultValue));
    errors.collect(cdk.propertyValidator('event', cdk.validateString)(properties.event));
    errors.collect(cdk.propertyValidator('importedValue', cdk.validateString)(properties.importedValue));
    errors.collect(cdk.propertyValidator('model', cdk.validateString)(properties.model));
    errors.collect(cdk.propertyValidator('property', cdk.validateString)(properties.property));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    errors.collect(cdk.propertyValidator('userAttribute', cdk.validateString)(properties.userAttribute));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "ComponentPropertyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentProperty` resource
 *
 * @param properties - the TypeScript properties of a `ComponentPropertyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentProperty` resource.
 */
// @ts-ignore TS6133
function cfnComponentComponentPropertyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponent_ComponentPropertyPropertyValidator(properties).assertSuccess();
    return {
        BindingProperties: cfnComponentComponentPropertyBindingPropertiesPropertyToCloudFormation(properties.bindingProperties),
        Bindings: cdk.objectToCloudFormation(properties.bindings),
        CollectionBindingProperties: cfnComponentComponentPropertyBindingPropertiesPropertyToCloudFormation(properties.collectionBindingProperties),
        ComponentName: cdk.stringToCloudFormation(properties.componentName),
        Concat: cdk.listMapper(cfnComponentComponentPropertyPropertyToCloudFormation)(properties.concat),
        Condition: cfnComponentComponentConditionPropertyPropertyToCloudFormation(properties.condition),
        Configured: cdk.booleanToCloudFormation(properties.configured),
        DefaultValue: cdk.stringToCloudFormation(properties.defaultValue),
        Event: cdk.stringToCloudFormation(properties.event),
        ImportedValue: cdk.stringToCloudFormation(properties.importedValue),
        Model: cdk.stringToCloudFormation(properties.model),
        Property: cdk.stringToCloudFormation(properties.property),
        Type: cdk.stringToCloudFormation(properties.type),
        UserAttribute: cdk.stringToCloudFormation(properties.userAttribute),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnComponentComponentPropertyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponent.ComponentPropertyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponent.ComponentPropertyProperty>();
    ret.addPropertyResult('bindingProperties', 'BindingProperties', properties.BindingProperties != null ? CfnComponentComponentPropertyBindingPropertiesPropertyFromCloudFormation(properties.BindingProperties) : undefined);
    ret.addPropertyResult('bindings', 'Bindings', properties.Bindings != null ? cfn_parse.FromCloudFormation.getAny(properties.Bindings) : undefined);
    ret.addPropertyResult('collectionBindingProperties', 'CollectionBindingProperties', properties.CollectionBindingProperties != null ? CfnComponentComponentPropertyBindingPropertiesPropertyFromCloudFormation(properties.CollectionBindingProperties) : undefined);
    ret.addPropertyResult('componentName', 'ComponentName', properties.ComponentName != null ? cfn_parse.FromCloudFormation.getString(properties.ComponentName) : undefined);
    ret.addPropertyResult('concat', 'Concat', properties.Concat != null ? cfn_parse.FromCloudFormation.getArray(CfnComponentComponentPropertyPropertyFromCloudFormation)(properties.Concat) : undefined);
    ret.addPropertyResult('condition', 'Condition', properties.Condition != null ? CfnComponentComponentConditionPropertyPropertyFromCloudFormation(properties.Condition) : undefined);
    ret.addPropertyResult('configured', 'Configured', properties.Configured != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Configured) : undefined);
    ret.addPropertyResult('defaultValue', 'DefaultValue', properties.DefaultValue != null ? cfn_parse.FromCloudFormation.getString(properties.DefaultValue) : undefined);
    ret.addPropertyResult('event', 'Event', properties.Event != null ? cfn_parse.FromCloudFormation.getString(properties.Event) : undefined);
    ret.addPropertyResult('importedValue', 'ImportedValue', properties.ImportedValue != null ? cfn_parse.FromCloudFormation.getString(properties.ImportedValue) : undefined);
    ret.addPropertyResult('model', 'Model', properties.Model != null ? cfn_parse.FromCloudFormation.getString(properties.Model) : undefined);
    ret.addPropertyResult('property', 'Property', properties.Property != null ? cfn_parse.FromCloudFormation.getString(properties.Property) : undefined);
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addPropertyResult('userAttribute', 'UserAttribute', properties.UserAttribute != null ? cfn_parse.FromCloudFormation.getString(properties.UserAttribute) : undefined);
    ret.addPropertyResult('value', 'Value', properties.Value != null ? cfn_parse.FromCloudFormation.getString(properties.Value) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponent {
    /**
     * The `ComponentPropertyBindingProperties` property specifies a component property to associate with a binding property. This enables exposed properties on the top level component to propagate data to the component's property values.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentpropertybindingproperties.html
     */
    export interface ComponentPropertyBindingPropertiesProperty {
        /**
         * The data field to bind the property to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentpropertybindingproperties.html#cfn-amplifyuibuilder-component-componentpropertybindingproperties-field
         */
        readonly field?: string;
        /**
         * The component property to bind to the data field.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentpropertybindingproperties.html#cfn-amplifyuibuilder-component-componentpropertybindingproperties-property
         */
        readonly property: string;
    }
}

/**
 * Determine whether the given properties match those of a `ComponentPropertyBindingPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `ComponentPropertyBindingPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponent_ComponentPropertyBindingPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('field', cdk.validateString)(properties.field));
    errors.collect(cdk.propertyValidator('property', cdk.requiredValidator)(properties.property));
    errors.collect(cdk.propertyValidator('property', cdk.validateString)(properties.property));
    return errors.wrap('supplied properties not correct for "ComponentPropertyBindingPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentPropertyBindingProperties` resource
 *
 * @param properties - the TypeScript properties of a `ComponentPropertyBindingPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentPropertyBindingProperties` resource.
 */
// @ts-ignore TS6133
function cfnComponentComponentPropertyBindingPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponent_ComponentPropertyBindingPropertiesPropertyValidator(properties).assertSuccess();
    return {
        Field: cdk.stringToCloudFormation(properties.field),
        Property: cdk.stringToCloudFormation(properties.property),
    };
}

// @ts-ignore TS6133
function CfnComponentComponentPropertyBindingPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponent.ComponentPropertyBindingPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponent.ComponentPropertyBindingPropertiesProperty>();
    ret.addPropertyResult('field', 'Field', properties.Field != null ? cfn_parse.FromCloudFormation.getString(properties.Field) : undefined);
    ret.addPropertyResult('property', 'Property', cfn_parse.FromCloudFormation.getString(properties.Property));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponent {
    /**
     * The `ComponentVariant` property specifies the style configuration of a unique variation of a main component.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentvariant.html
     */
    export interface ComponentVariantProperty {
        /**
         * The properties of the component variant that can be overriden when customizing an instance of the component. You can't specify `tags` as a valid property for `overrides` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentvariant.html#cfn-amplifyuibuilder-component-componentvariant-overrides
         */
        readonly overrides?: any | cdk.IResolvable | cdk.IResolvable;
        /**
         * The combination of variants that comprise this variant.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-componentvariant.html#cfn-amplifyuibuilder-component-componentvariant-variantvalues
         */
        readonly variantValues?: any | cdk.IResolvable | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ComponentVariantProperty`
 *
 * @param properties - the TypeScript properties of a `ComponentVariantProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponent_ComponentVariantPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('overrides', cdk.validateObject)(properties.overrides));
    errors.collect(cdk.propertyValidator('variantValues', cdk.validateObject)(properties.variantValues));
    return errors.wrap('supplied properties not correct for "ComponentVariantProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentVariant` resource
 *
 * @param properties - the TypeScript properties of a `ComponentVariantProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.ComponentVariant` resource.
 */
// @ts-ignore TS6133
function cfnComponentComponentVariantPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponent_ComponentVariantPropertyValidator(properties).assertSuccess();
    return {
        Overrides: cdk.objectToCloudFormation(properties.overrides),
        VariantValues: cdk.objectToCloudFormation(properties.variantValues),
    };
}

// @ts-ignore TS6133
function CfnComponentComponentVariantPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponent.ComponentVariantProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponent.ComponentVariantProperty>();
    ret.addPropertyResult('overrides', 'Overrides', properties.Overrides != null ? cfn_parse.FromCloudFormation.getAny(properties.Overrides) : undefined);
    ret.addPropertyResult('variantValues', 'VariantValues', properties.VariantValues != null ? cfn_parse.FromCloudFormation.getAny(properties.VariantValues) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponent {
    /**
     * The `MutationActionSetStateParameter` property specifies the state configuration when an action modifies a property of another element within the same component.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-mutationactionsetstateparameter.html
     */
    export interface MutationActionSetStateParameterProperty {
        /**
         * The name of the component that is being modified.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-mutationactionsetstateparameter.html#cfn-amplifyuibuilder-component-mutationactionsetstateparameter-componentname
         */
        readonly componentName: string;
        /**
         * The name of the component property to apply the state configuration to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-mutationactionsetstateparameter.html#cfn-amplifyuibuilder-component-mutationactionsetstateparameter-property
         */
        readonly property: string;
        /**
         * The state configuration to assign to the property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-mutationactionsetstateparameter.html#cfn-amplifyuibuilder-component-mutationactionsetstateparameter-set
         */
        readonly set: CfnComponent.ComponentPropertyProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `MutationActionSetStateParameterProperty`
 *
 * @param properties - the TypeScript properties of a `MutationActionSetStateParameterProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponent_MutationActionSetStateParameterPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('componentName', cdk.requiredValidator)(properties.componentName));
    errors.collect(cdk.propertyValidator('componentName', cdk.validateString)(properties.componentName));
    errors.collect(cdk.propertyValidator('property', cdk.requiredValidator)(properties.property));
    errors.collect(cdk.propertyValidator('property', cdk.validateString)(properties.property));
    errors.collect(cdk.propertyValidator('set', cdk.requiredValidator)(properties.set));
    errors.collect(cdk.propertyValidator('set', CfnComponent_ComponentPropertyPropertyValidator)(properties.set));
    return errors.wrap('supplied properties not correct for "MutationActionSetStateParameterProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.MutationActionSetStateParameter` resource
 *
 * @param properties - the TypeScript properties of a `MutationActionSetStateParameterProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.MutationActionSetStateParameter` resource.
 */
// @ts-ignore TS6133
function cfnComponentMutationActionSetStateParameterPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponent_MutationActionSetStateParameterPropertyValidator(properties).assertSuccess();
    return {
        ComponentName: cdk.stringToCloudFormation(properties.componentName),
        Property: cdk.stringToCloudFormation(properties.property),
        Set: cfnComponentComponentPropertyPropertyToCloudFormation(properties.set),
    };
}

// @ts-ignore TS6133
function CfnComponentMutationActionSetStateParameterPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponent.MutationActionSetStateParameterProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponent.MutationActionSetStateParameterProperty>();
    ret.addPropertyResult('componentName', 'ComponentName', cfn_parse.FromCloudFormation.getString(properties.ComponentName));
    ret.addPropertyResult('property', 'Property', cfn_parse.FromCloudFormation.getString(properties.Property));
    ret.addPropertyResult('set', 'Set', CfnComponentComponentPropertyPropertyFromCloudFormation(properties.Set));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponent {
    /**
     * The `Predicate` property specifies information for generating Amplify DataStore queries. Use `Predicate` to retrieve a subset of the data in a collection.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-predicate.html
     */
    export interface PredicateProperty {
        /**
         * A list of predicates to combine logically.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-predicate.html#cfn-amplifyuibuilder-component-predicate-and
         */
        readonly and?: Array<CfnComponent.PredicateProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The field to query.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-predicate.html#cfn-amplifyuibuilder-component-predicate-field
         */
        readonly field?: string;
        /**
         * The value to use when performing the evaluation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-predicate.html#cfn-amplifyuibuilder-component-predicate-operand
         */
        readonly operand?: string;
        /**
         * The operator to use to perform the evaluation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-predicate.html#cfn-amplifyuibuilder-component-predicate-operator
         */
        readonly operator?: string;
        /**
         * A list of predicates to combine logically.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-predicate.html#cfn-amplifyuibuilder-component-predicate-or
         */
        readonly or?: Array<CfnComponent.PredicateProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `PredicateProperty`
 *
 * @param properties - the TypeScript properties of a `PredicateProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponent_PredicatePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('and', cdk.listValidator(CfnComponent_PredicatePropertyValidator))(properties.and));
    errors.collect(cdk.propertyValidator('field', cdk.validateString)(properties.field));
    errors.collect(cdk.propertyValidator('operand', cdk.validateString)(properties.operand));
    errors.collect(cdk.propertyValidator('operator', cdk.validateString)(properties.operator));
    errors.collect(cdk.propertyValidator('or', cdk.listValidator(CfnComponent_PredicatePropertyValidator))(properties.or));
    return errors.wrap('supplied properties not correct for "PredicateProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.Predicate` resource
 *
 * @param properties - the TypeScript properties of a `PredicateProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.Predicate` resource.
 */
// @ts-ignore TS6133
function cfnComponentPredicatePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponent_PredicatePropertyValidator(properties).assertSuccess();
    return {
        And: cdk.listMapper(cfnComponentPredicatePropertyToCloudFormation)(properties.and),
        Field: cdk.stringToCloudFormation(properties.field),
        Operand: cdk.stringToCloudFormation(properties.operand),
        Operator: cdk.stringToCloudFormation(properties.operator),
        Or: cdk.listMapper(cfnComponentPredicatePropertyToCloudFormation)(properties.or),
    };
}

// @ts-ignore TS6133
function CfnComponentPredicatePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponent.PredicateProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponent.PredicateProperty>();
    ret.addPropertyResult('and', 'And', properties.And != null ? cfn_parse.FromCloudFormation.getArray(CfnComponentPredicatePropertyFromCloudFormation)(properties.And) : undefined);
    ret.addPropertyResult('field', 'Field', properties.Field != null ? cfn_parse.FromCloudFormation.getString(properties.Field) : undefined);
    ret.addPropertyResult('operand', 'Operand', properties.Operand != null ? cfn_parse.FromCloudFormation.getString(properties.Operand) : undefined);
    ret.addPropertyResult('operator', 'Operator', properties.Operator != null ? cfn_parse.FromCloudFormation.getString(properties.Operator) : undefined);
    ret.addPropertyResult('or', 'Or', properties.Or != null ? cfn_parse.FromCloudFormation.getArray(CfnComponentPredicatePropertyFromCloudFormation)(properties.Or) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnComponent {
    /**
     * The `SortProperty` property specifies how to sort the data that you bind to a component.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-sortproperty.html
     */
    export interface SortPropertyProperty {
        /**
         * The direction of the sort, either ascending or descending.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-sortproperty.html#cfn-amplifyuibuilder-component-sortproperty-direction
         */
        readonly direction: string;
        /**
         * The field to perform the sort on.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-component-sortproperty.html#cfn-amplifyuibuilder-component-sortproperty-field
         */
        readonly field: string;
    }
}

/**
 * Determine whether the given properties match those of a `SortPropertyProperty`
 *
 * @param properties - the TypeScript properties of a `SortPropertyProperty`
 *
 * @returns the result of the validation.
 */
function CfnComponent_SortPropertyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('direction', cdk.requiredValidator)(properties.direction));
    errors.collect(cdk.propertyValidator('direction', cdk.validateString)(properties.direction));
    errors.collect(cdk.propertyValidator('field', cdk.requiredValidator)(properties.field));
    errors.collect(cdk.propertyValidator('field', cdk.validateString)(properties.field));
    return errors.wrap('supplied properties not correct for "SortPropertyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.SortProperty` resource
 *
 * @param properties - the TypeScript properties of a `SortPropertyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Component.SortProperty` resource.
 */
// @ts-ignore TS6133
function cfnComponentSortPropertyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnComponent_SortPropertyPropertyValidator(properties).assertSuccess();
    return {
        Direction: cdk.stringToCloudFormation(properties.direction),
        Field: cdk.stringToCloudFormation(properties.field),
    };
}

// @ts-ignore TS6133
function CfnComponentSortPropertyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnComponent.SortPropertyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnComponent.SortPropertyProperty>();
    ret.addPropertyResult('direction', 'Direction', cfn_parse.FromCloudFormation.getString(properties.Direction));
    ret.addPropertyResult('field', 'Field', cfn_parse.FromCloudFormation.getString(properties.Field));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnTheme`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-theme.html
 */
export interface CfnThemeProps {

    /**
     * The name of the theme.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-theme.html#cfn-amplifyuibuilder-theme-name
     */
    readonly name: string;

    /**
     * A list of key-value pairs that defines the properties of the theme.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-theme.html#cfn-amplifyuibuilder-theme-values
     */
    readonly values: Array<CfnTheme.ThemeValuesProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Describes the properties that can be overriden to customize a theme.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-theme.html#cfn-amplifyuibuilder-theme-overrides
     */
    readonly overrides?: Array<CfnTheme.ThemeValuesProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * One or more key-value pairs to use when tagging the theme.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-theme.html#cfn-amplifyuibuilder-theme-tags
     */
    readonly tags?: { [key: string]: (string) };
}

/**
 * Determine whether the given properties match those of a `CfnThemeProps`
 *
 * @param properties - the TypeScript properties of a `CfnThemeProps`
 *
 * @returns the result of the validation.
 */
function CfnThemePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('overrides', cdk.listValidator(CfnTheme_ThemeValuesPropertyValidator))(properties.overrides));
    errors.collect(cdk.propertyValidator('tags', cdk.hashValidator(cdk.validateString))(properties.tags));
    errors.collect(cdk.propertyValidator('values', cdk.requiredValidator)(properties.values));
    errors.collect(cdk.propertyValidator('values', cdk.listValidator(CfnTheme_ThemeValuesPropertyValidator))(properties.values));
    return errors.wrap('supplied properties not correct for "CfnThemeProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Theme` resource
 *
 * @param properties - the TypeScript properties of a `CfnThemeProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Theme` resource.
 */
// @ts-ignore TS6133
function cfnThemePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnThemePropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Values: cdk.listMapper(cfnThemeThemeValuesPropertyToCloudFormation)(properties.values),
        Overrides: cdk.listMapper(cfnThemeThemeValuesPropertyToCloudFormation)(properties.overrides),
        Tags: cdk.hashMapper(cdk.stringToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnThemePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnThemeProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnThemeProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('values', 'Values', cfn_parse.FromCloudFormation.getArray(CfnThemeThemeValuesPropertyFromCloudFormation)(properties.Values));
    ret.addPropertyResult('overrides', 'Overrides', properties.Overrides != null ? cfn_parse.FromCloudFormation.getArray(CfnThemeThemeValuesPropertyFromCloudFormation)(properties.Overrides) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::AmplifyUIBuilder::Theme`
 *
 * The AWS::AmplifyUIBuilder::Theme resource specifies a theme within an Amplify app. A theme is a collection of style settings that apply globally to the components associated with the app.
 *
 * @cloudformationResource AWS::AmplifyUIBuilder::Theme
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-theme.html
 */
export class CfnTheme extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::AmplifyUIBuilder::Theme";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnTheme {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnThemePropsFromCloudFormation(resourceProperties);
        const ret = new CfnTheme(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The unique ID for the Amplify app associated with the theme.
     * @cloudformationAttribute AppId
     */
    public readonly attrAppId: string;

    /**
     * The time that the theme was created.
     * @cloudformationAttribute CreatedAt
     */
    public readonly attrCreatedAt: string;

    /**
     * The name of the backend environment that is a part of the Amplify app.
     * @cloudformationAttribute EnvironmentName
     */
    public readonly attrEnvironmentName: string;

    /**
     * The ID for the theme.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The time that the theme was modified.
     * @cloudformationAttribute ModifiedAt
     */
    public readonly attrModifiedAt: string;

    /**
     * The name of the theme.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-theme.html#cfn-amplifyuibuilder-theme-name
     */
    public name: string;

    /**
     * A list of key-value pairs that defines the properties of the theme.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-theme.html#cfn-amplifyuibuilder-theme-values
     */
    public values: Array<CfnTheme.ThemeValuesProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Describes the properties that can be overriden to customize a theme.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-theme.html#cfn-amplifyuibuilder-theme-overrides
     */
    public overrides: Array<CfnTheme.ThemeValuesProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * One or more key-value pairs to use when tagging the theme.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-theme.html#cfn-amplifyuibuilder-theme-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::AmplifyUIBuilder::Theme`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnThemeProps) {
        super(scope, id, { type: CfnTheme.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'values', this);
        this.attrAppId = cdk.Token.asString(this.getAtt('AppId'));
        this.attrCreatedAt = cdk.Token.asString(this.getAtt('CreatedAt'));
        this.attrEnvironmentName = cdk.Token.asString(this.getAtt('EnvironmentName'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));
        this.attrModifiedAt = cdk.Token.asString(this.getAtt('ModifiedAt'));

        this.name = props.name;
        this.values = props.values;
        this.overrides = props.overrides;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::AmplifyUIBuilder::Theme", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnTheme.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            values: this.values,
            overrides: this.overrides,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnThemePropsToCloudFormation(props);
    }
}

export namespace CfnTheme {
    /**
     * The `ThemeValue` property specifies the configuration of a theme's properties.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-theme-themevalue.html
     */
    export interface ThemeValueProperty {
        /**
         * A list of key-value pairs that define the theme's properties.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-theme-themevalue.html#cfn-amplifyuibuilder-theme-themevalue-children
         */
        readonly children?: Array<CfnTheme.ThemeValuesProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The value of a theme property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-theme-themevalue.html#cfn-amplifyuibuilder-theme-themevalue-value
         */
        readonly value?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ThemeValueProperty`
 *
 * @param properties - the TypeScript properties of a `ThemeValueProperty`
 *
 * @returns the result of the validation.
 */
function CfnTheme_ThemeValuePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('children', cdk.listValidator(CfnTheme_ThemeValuesPropertyValidator))(properties.children));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "ThemeValueProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Theme.ThemeValue` resource
 *
 * @param properties - the TypeScript properties of a `ThemeValueProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Theme.ThemeValue` resource.
 */
// @ts-ignore TS6133
function cfnThemeThemeValuePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTheme_ThemeValuePropertyValidator(properties).assertSuccess();
    return {
        Children: cdk.listMapper(cfnThemeThemeValuesPropertyToCloudFormation)(properties.children),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnThemeThemeValuePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTheme.ThemeValueProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTheme.ThemeValueProperty>();
    ret.addPropertyResult('children', 'Children', properties.Children != null ? cfn_parse.FromCloudFormation.getArray(CfnThemeThemeValuesPropertyFromCloudFormation)(properties.Children) : undefined);
    ret.addPropertyResult('value', 'Value', properties.Value != null ? cfn_parse.FromCloudFormation.getString(properties.Value) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTheme {
    /**
     * The `ThemeValues` property specifies key-value pair that defines a property of a theme.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-theme-themevalues.html
     */
    export interface ThemeValuesProperty {
        /**
         * The name of the property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-theme-themevalues.html#cfn-amplifyuibuilder-theme-themevalues-key
         */
        readonly key?: string;
        /**
         * The value of the property.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplifyuibuilder-theme-themevalues.html#cfn-amplifyuibuilder-theme-themevalues-value
         */
        readonly value?: CfnTheme.ThemeValueProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ThemeValuesProperty`
 *
 * @param properties - the TypeScript properties of a `ThemeValuesProperty`
 *
 * @returns the result of the validation.
 */
function CfnTheme_ThemeValuesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('value', CfnTheme_ThemeValuePropertyValidator)(properties.value));
    return errors.wrap('supplied properties not correct for "ThemeValuesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Theme.ThemeValues` resource
 *
 * @param properties - the TypeScript properties of a `ThemeValuesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::AmplifyUIBuilder::Theme.ThemeValues` resource.
 */
// @ts-ignore TS6133
function cfnThemeThemeValuesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTheme_ThemeValuesPropertyValidator(properties).assertSuccess();
    return {
        Key: cdk.stringToCloudFormation(properties.key),
        Value: cfnThemeThemeValuePropertyToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnThemeThemeValuesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTheme.ThemeValuesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTheme.ThemeValuesProperty>();
    ret.addPropertyResult('key', 'Key', properties.Key != null ? cfn_parse.FromCloudFormation.getString(properties.Key) : undefined);
    ret.addPropertyResult('value', 'Value', properties.Value != null ? CfnThemeThemeValuePropertyFromCloudFormation(properties.Value) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
