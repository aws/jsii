// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:08.503Z","fingerprint":"trQ3yWquLgDVd5pWfzRoMsHl7SwRnpM8mag9Gm1ydLQ="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnClassifier`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-classifier.html
 */
export interface CfnClassifierProps {

    /**
     * A classifier for comma-separated values (CSV).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-classifier.html#cfn-glue-classifier-csvclassifier
     */
    readonly csvClassifier?: CfnClassifier.CsvClassifierProperty | cdk.IResolvable;

    /**
     * A classifier that uses `grok` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-classifier.html#cfn-glue-classifier-grokclassifier
     */
    readonly grokClassifier?: CfnClassifier.GrokClassifierProperty | cdk.IResolvable;

    /**
     * A classifier for JSON content.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-classifier.html#cfn-glue-classifier-jsonclassifier
     */
    readonly jsonClassifier?: CfnClassifier.JsonClassifierProperty | cdk.IResolvable;

    /**
     * A classifier for XML content.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-classifier.html#cfn-glue-classifier-xmlclassifier
     */
    readonly xmlClassifier?: CfnClassifier.XMLClassifierProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnClassifierProps`
 *
 * @param properties - the TypeScript properties of a `CfnClassifierProps`
 *
 * @returns the result of the validation.
 */
function CfnClassifierPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('csvClassifier', CfnClassifier_CsvClassifierPropertyValidator)(properties.csvClassifier));
    errors.collect(cdk.propertyValidator('grokClassifier', CfnClassifier_GrokClassifierPropertyValidator)(properties.grokClassifier));
    errors.collect(cdk.propertyValidator('jsonClassifier', CfnClassifier_JsonClassifierPropertyValidator)(properties.jsonClassifier));
    errors.collect(cdk.propertyValidator('xmlClassifier', CfnClassifier_XMLClassifierPropertyValidator)(properties.xmlClassifier));
    return errors.wrap('supplied properties not correct for "CfnClassifierProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Classifier` resource
 *
 * @param properties - the TypeScript properties of a `CfnClassifierProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Classifier` resource.
 */
// @ts-ignore TS6133
function cfnClassifierPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnClassifierPropsValidator(properties).assertSuccess();
    return {
        CsvClassifier: cfnClassifierCsvClassifierPropertyToCloudFormation(properties.csvClassifier),
        GrokClassifier: cfnClassifierGrokClassifierPropertyToCloudFormation(properties.grokClassifier),
        JsonClassifier: cfnClassifierJsonClassifierPropertyToCloudFormation(properties.jsonClassifier),
        XMLClassifier: cfnClassifierXMLClassifierPropertyToCloudFormation(properties.xmlClassifier),
    };
}

// @ts-ignore TS6133
function CfnClassifierPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnClassifierProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnClassifierProps>();
    ret.addPropertyResult('csvClassifier', 'CsvClassifier', properties.CsvClassifier != null ? CfnClassifierCsvClassifierPropertyFromCloudFormation(properties.CsvClassifier) : undefined);
    ret.addPropertyResult('grokClassifier', 'GrokClassifier', properties.GrokClassifier != null ? CfnClassifierGrokClassifierPropertyFromCloudFormation(properties.GrokClassifier) : undefined);
    ret.addPropertyResult('jsonClassifier', 'JsonClassifier', properties.JsonClassifier != null ? CfnClassifierJsonClassifierPropertyFromCloudFormation(properties.JsonClassifier) : undefined);
    ret.addPropertyResult('xmlClassifier', 'XMLClassifier', properties.XMLClassifier != null ? CfnClassifierXMLClassifierPropertyFromCloudFormation(properties.XMLClassifier) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::Classifier`
 *
 * The `AWS::Glue::Classifier` resource creates an AWS Glue classifier that categorizes data sources and specifies schemas. For more information, see [Adding Classifiers to a Crawler](https://docs.aws.amazon.com/glue/latest/dg/add-classifier.html) and [Classifier Structure](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-crawler-classifiers.html#aws-glue-api-crawler-classifiers-Classifier) in the *AWS Glue Developer Guide* .
 *
 * @cloudformationResource AWS::Glue::Classifier
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-classifier.html
 */
export class CfnClassifier extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::Classifier";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnClassifier {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnClassifierPropsFromCloudFormation(resourceProperties);
        const ret = new CfnClassifier(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A classifier for comma-separated values (CSV).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-classifier.html#cfn-glue-classifier-csvclassifier
     */
    public csvClassifier: CfnClassifier.CsvClassifierProperty | cdk.IResolvable | undefined;

    /**
     * A classifier that uses `grok` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-classifier.html#cfn-glue-classifier-grokclassifier
     */
    public grokClassifier: CfnClassifier.GrokClassifierProperty | cdk.IResolvable | undefined;

    /**
     * A classifier for JSON content.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-classifier.html#cfn-glue-classifier-jsonclassifier
     */
    public jsonClassifier: CfnClassifier.JsonClassifierProperty | cdk.IResolvable | undefined;

    /**
     * A classifier for XML content.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-classifier.html#cfn-glue-classifier-xmlclassifier
     */
    public xmlClassifier: CfnClassifier.XMLClassifierProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::Glue::Classifier`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnClassifierProps = {}) {
        super(scope, id, { type: CfnClassifier.CFN_RESOURCE_TYPE_NAME, properties: props });

        this.csvClassifier = props.csvClassifier;
        this.grokClassifier = props.grokClassifier;
        this.jsonClassifier = props.jsonClassifier;
        this.xmlClassifier = props.xmlClassifier;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnClassifier.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            csvClassifier: this.csvClassifier,
            grokClassifier: this.grokClassifier,
            jsonClassifier: this.jsonClassifier,
            xmlClassifier: this.xmlClassifier,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnClassifierPropsToCloudFormation(props);
    }
}

export namespace CfnClassifier {
    /**
     * A classifier for custom `CSV` content.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-csvclassifier.html
     */
    export interface CsvClassifierProperty {
        /**
         * Enables the processing of files that contain only one column.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-csvclassifier.html#cfn-glue-classifier-csvclassifier-allowsinglecolumn
         */
        readonly allowSingleColumn?: boolean | cdk.IResolvable;
        /**
         * Indicates whether the CSV file contains a header.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-csvclassifier.html#cfn-glue-classifier-csvclassifier-containsheader
         */
        readonly containsHeader?: string;
        /**
         * A custom symbol to denote what separates each column entry in the row.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-csvclassifier.html#cfn-glue-classifier-csvclassifier-delimiter
         */
        readonly delimiter?: string;
        /**
         * Specifies not to trim values before identifying the type of column values. The default value is `true` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-csvclassifier.html#cfn-glue-classifier-csvclassifier-disablevaluetrimming
         */
        readonly disableValueTrimming?: boolean | cdk.IResolvable;
        /**
         * A list of strings representing column names.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-csvclassifier.html#cfn-glue-classifier-csvclassifier-header
         */
        readonly header?: string[];
        /**
         * The name of the classifier.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-csvclassifier.html#cfn-glue-classifier-csvclassifier-name
         */
        readonly name?: string;
        /**
         * A custom symbol to denote what combines content into a single column value. It must be different from the column delimiter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-csvclassifier.html#cfn-glue-classifier-csvclassifier-quotesymbol
         */
        readonly quoteSymbol?: string;
    }
}

/**
 * Determine whether the given properties match those of a `CsvClassifierProperty`
 *
 * @param properties - the TypeScript properties of a `CsvClassifierProperty`
 *
 * @returns the result of the validation.
 */
function CfnClassifier_CsvClassifierPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('allowSingleColumn', cdk.validateBoolean)(properties.allowSingleColumn));
    errors.collect(cdk.propertyValidator('containsHeader', cdk.validateString)(properties.containsHeader));
    errors.collect(cdk.propertyValidator('delimiter', cdk.validateString)(properties.delimiter));
    errors.collect(cdk.propertyValidator('disableValueTrimming', cdk.validateBoolean)(properties.disableValueTrimming));
    errors.collect(cdk.propertyValidator('header', cdk.listValidator(cdk.validateString))(properties.header));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('quoteSymbol', cdk.validateString)(properties.quoteSymbol));
    return errors.wrap('supplied properties not correct for "CsvClassifierProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Classifier.CsvClassifier` resource
 *
 * @param properties - the TypeScript properties of a `CsvClassifierProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Classifier.CsvClassifier` resource.
 */
// @ts-ignore TS6133
function cfnClassifierCsvClassifierPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnClassifier_CsvClassifierPropertyValidator(properties).assertSuccess();
    return {
        AllowSingleColumn: cdk.booleanToCloudFormation(properties.allowSingleColumn),
        ContainsHeader: cdk.stringToCloudFormation(properties.containsHeader),
        Delimiter: cdk.stringToCloudFormation(properties.delimiter),
        DisableValueTrimming: cdk.booleanToCloudFormation(properties.disableValueTrimming),
        Header: cdk.listMapper(cdk.stringToCloudFormation)(properties.header),
        Name: cdk.stringToCloudFormation(properties.name),
        QuoteSymbol: cdk.stringToCloudFormation(properties.quoteSymbol),
    };
}

// @ts-ignore TS6133
function CfnClassifierCsvClassifierPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnClassifier.CsvClassifierProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnClassifier.CsvClassifierProperty>();
    ret.addPropertyResult('allowSingleColumn', 'AllowSingleColumn', properties.AllowSingleColumn != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AllowSingleColumn) : undefined);
    ret.addPropertyResult('containsHeader', 'ContainsHeader', properties.ContainsHeader != null ? cfn_parse.FromCloudFormation.getString(properties.ContainsHeader) : undefined);
    ret.addPropertyResult('delimiter', 'Delimiter', properties.Delimiter != null ? cfn_parse.FromCloudFormation.getString(properties.Delimiter) : undefined);
    ret.addPropertyResult('disableValueTrimming', 'DisableValueTrimming', properties.DisableValueTrimming != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DisableValueTrimming) : undefined);
    ret.addPropertyResult('header', 'Header', properties.Header != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Header) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('quoteSymbol', 'QuoteSymbol', properties.QuoteSymbol != null ? cfn_parse.FromCloudFormation.getString(properties.QuoteSymbol) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnClassifier {
    /**
     * A classifier that uses `grok` patterns.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-grokclassifier.html
     */
    export interface GrokClassifierProperty {
        /**
         * An identifier of the data format that the classifier matches, such as Twitter, JSON, Omniture logs, and so on.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-grokclassifier.html#cfn-glue-classifier-grokclassifier-classification
         */
        readonly classification: string;
        /**
         * Optional custom grok patterns defined by this classifier. For more information, see custom patterns in [Writing Custom Classifiers](https://docs.aws.amazon.com/glue/latest/dg/custom-classifier.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-grokclassifier.html#cfn-glue-classifier-grokclassifier-custompatterns
         */
        readonly customPatterns?: string;
        /**
         * The grok pattern applied to a data store by this classifier. For more information, see built-in patterns in [Writing Custom Classifiers](https://docs.aws.amazon.com/glue/latest/dg/custom-classifier.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-grokclassifier.html#cfn-glue-classifier-grokclassifier-grokpattern
         */
        readonly grokPattern: string;
        /**
         * The name of the classifier.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-grokclassifier.html#cfn-glue-classifier-grokclassifier-name
         */
        readonly name?: string;
    }
}

/**
 * Determine whether the given properties match those of a `GrokClassifierProperty`
 *
 * @param properties - the TypeScript properties of a `GrokClassifierProperty`
 *
 * @returns the result of the validation.
 */
function CfnClassifier_GrokClassifierPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('classification', cdk.requiredValidator)(properties.classification));
    errors.collect(cdk.propertyValidator('classification', cdk.validateString)(properties.classification));
    errors.collect(cdk.propertyValidator('customPatterns', cdk.validateString)(properties.customPatterns));
    errors.collect(cdk.propertyValidator('grokPattern', cdk.requiredValidator)(properties.grokPattern));
    errors.collect(cdk.propertyValidator('grokPattern', cdk.validateString)(properties.grokPattern));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "GrokClassifierProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Classifier.GrokClassifier` resource
 *
 * @param properties - the TypeScript properties of a `GrokClassifierProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Classifier.GrokClassifier` resource.
 */
// @ts-ignore TS6133
function cfnClassifierGrokClassifierPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnClassifier_GrokClassifierPropertyValidator(properties).assertSuccess();
    return {
        Classification: cdk.stringToCloudFormation(properties.classification),
        CustomPatterns: cdk.stringToCloudFormation(properties.customPatterns),
        GrokPattern: cdk.stringToCloudFormation(properties.grokPattern),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnClassifierGrokClassifierPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnClassifier.GrokClassifierProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnClassifier.GrokClassifierProperty>();
    ret.addPropertyResult('classification', 'Classification', cfn_parse.FromCloudFormation.getString(properties.Classification));
    ret.addPropertyResult('customPatterns', 'CustomPatterns', properties.CustomPatterns != null ? cfn_parse.FromCloudFormation.getString(properties.CustomPatterns) : undefined);
    ret.addPropertyResult('grokPattern', 'GrokPattern', cfn_parse.FromCloudFormation.getString(properties.GrokPattern));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnClassifier {
    /**
     * A classifier for `JSON` content.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-jsonclassifier.html
     */
    export interface JsonClassifierProperty {
        /**
         * A `JsonPath` string defining the JSON data for the classifier to classify. AWS Glue supports a subset of `JsonPath` , as described in [Writing JsonPath Custom Classifiers](https://docs.aws.amazon.com/glue/latest/dg/custom-classifier.html#custom-classifier-json) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-jsonclassifier.html#cfn-glue-classifier-jsonclassifier-jsonpath
         */
        readonly jsonPath: string;
        /**
         * The name of the classifier.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-jsonclassifier.html#cfn-glue-classifier-jsonclassifier-name
         */
        readonly name?: string;
    }
}

/**
 * Determine whether the given properties match those of a `JsonClassifierProperty`
 *
 * @param properties - the TypeScript properties of a `JsonClassifierProperty`
 *
 * @returns the result of the validation.
 */
function CfnClassifier_JsonClassifierPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('jsonPath', cdk.requiredValidator)(properties.jsonPath));
    errors.collect(cdk.propertyValidator('jsonPath', cdk.validateString)(properties.jsonPath));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "JsonClassifierProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Classifier.JsonClassifier` resource
 *
 * @param properties - the TypeScript properties of a `JsonClassifierProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Classifier.JsonClassifier` resource.
 */
// @ts-ignore TS6133
function cfnClassifierJsonClassifierPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnClassifier_JsonClassifierPropertyValidator(properties).assertSuccess();
    return {
        JsonPath: cdk.stringToCloudFormation(properties.jsonPath),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnClassifierJsonClassifierPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnClassifier.JsonClassifierProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnClassifier.JsonClassifierProperty>();
    ret.addPropertyResult('jsonPath', 'JsonPath', cfn_parse.FromCloudFormation.getString(properties.JsonPath));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnClassifier {
    /**
     * A classifier for `XML` content.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-xmlclassifier.html
     */
    export interface XMLClassifierProperty {
        /**
         * An identifier of the data format that the classifier matches.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-xmlclassifier.html#cfn-glue-classifier-xmlclassifier-classification
         */
        readonly classification: string;
        /**
         * The name of the classifier.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-xmlclassifier.html#cfn-glue-classifier-xmlclassifier-name
         */
        readonly name?: string;
        /**
         * The XML tag designating the element that contains each record in an XML document being parsed. This can't identify a self-closing element (closed by `/>` ). An empty row element that contains only attributes can be parsed as long as it ends with a closing tag (for example, `<row item_a="A" item_b="B"></row>` is okay, but `<row item_a="A" item_b="B" />` is not).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-classifier-xmlclassifier.html#cfn-glue-classifier-xmlclassifier-rowtag
         */
        readonly rowTag: string;
    }
}

/**
 * Determine whether the given properties match those of a `XMLClassifierProperty`
 *
 * @param properties - the TypeScript properties of a `XMLClassifierProperty`
 *
 * @returns the result of the validation.
 */
function CfnClassifier_XMLClassifierPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('classification', cdk.requiredValidator)(properties.classification));
    errors.collect(cdk.propertyValidator('classification', cdk.validateString)(properties.classification));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('rowTag', cdk.requiredValidator)(properties.rowTag));
    errors.collect(cdk.propertyValidator('rowTag', cdk.validateString)(properties.rowTag));
    return errors.wrap('supplied properties not correct for "XMLClassifierProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Classifier.XMLClassifier` resource
 *
 * @param properties - the TypeScript properties of a `XMLClassifierProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Classifier.XMLClassifier` resource.
 */
// @ts-ignore TS6133
function cfnClassifierXMLClassifierPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnClassifier_XMLClassifierPropertyValidator(properties).assertSuccess();
    return {
        Classification: cdk.stringToCloudFormation(properties.classification),
        Name: cdk.stringToCloudFormation(properties.name),
        RowTag: cdk.stringToCloudFormation(properties.rowTag),
    };
}

// @ts-ignore TS6133
function CfnClassifierXMLClassifierPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnClassifier.XMLClassifierProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnClassifier.XMLClassifierProperty>();
    ret.addPropertyResult('classification', 'Classification', cfn_parse.FromCloudFormation.getString(properties.Classification));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('rowTag', 'RowTag', cfn_parse.FromCloudFormation.getString(properties.RowTag));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnConnection`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-connection.html
 */
export interface CfnConnectionProps {

    /**
     * The ID of the data catalog to create the catalog object in. Currently, this should be the AWS account ID.
     *
     * > To specify the account ID, you can use the `Ref` intrinsic function with the `AWS::AccountId` pseudo parameter. For example: `!Ref AWS::AccountId` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-connection.html#cfn-glue-connection-catalogid
     */
    readonly catalogId: string;

    /**
     * The connection that you want to create.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-connection.html#cfn-glue-connection-connectioninput
     */
    readonly connectionInput: CfnConnection.ConnectionInputProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnConnectionProps`
 *
 * @param properties - the TypeScript properties of a `CfnConnectionProps`
 *
 * @returns the result of the validation.
 */
function CfnConnectionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.requiredValidator)(properties.catalogId));
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('connectionInput', cdk.requiredValidator)(properties.connectionInput));
    errors.collect(cdk.propertyValidator('connectionInput', CfnConnection_ConnectionInputPropertyValidator)(properties.connectionInput));
    return errors.wrap('supplied properties not correct for "CfnConnectionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Connection` resource
 *
 * @param properties - the TypeScript properties of a `CfnConnectionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Connection` resource.
 */
// @ts-ignore TS6133
function cfnConnectionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnectionPropsValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        ConnectionInput: cfnConnectionConnectionInputPropertyToCloudFormation(properties.connectionInput),
    };
}

// @ts-ignore TS6133
function CfnConnectionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnectionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnectionProps>();
    ret.addPropertyResult('catalogId', 'CatalogId', cfn_parse.FromCloudFormation.getString(properties.CatalogId));
    ret.addPropertyResult('connectionInput', 'ConnectionInput', CfnConnectionConnectionInputPropertyFromCloudFormation(properties.ConnectionInput));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::Connection`
 *
 * The `AWS::Glue::Connection` resource specifies an AWS Glue connection to a data source. For more information, see [Adding a Connection to Your Data Store](https://docs.aws.amazon.com/glue/latest/dg/populate-add-connection.html) and [Connection Structure](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-connections.html#aws-glue-api-catalog-connections-Connection) in the *AWS Glue Developer Guide* .
 *
 * @cloudformationResource AWS::Glue::Connection
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-connection.html
 */
export class CfnConnection extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::Connection";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnConnection {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnConnectionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnConnection(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ID of the data catalog to create the catalog object in. Currently, this should be the AWS account ID.
     *
     * > To specify the account ID, you can use the `Ref` intrinsic function with the `AWS::AccountId` pseudo parameter. For example: `!Ref AWS::AccountId` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-connection.html#cfn-glue-connection-catalogid
     */
    public catalogId: string;

    /**
     * The connection that you want to create.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-connection.html#cfn-glue-connection-connectioninput
     */
    public connectionInput: CfnConnection.ConnectionInputProperty | cdk.IResolvable;

    /**
     * Create a new `AWS::Glue::Connection`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnConnectionProps) {
        super(scope, id, { type: CfnConnection.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'catalogId', this);
        cdk.requireProperty(props, 'connectionInput', this);

        this.catalogId = props.catalogId;
        this.connectionInput = props.connectionInput;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnConnection.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            catalogId: this.catalogId,
            connectionInput: this.connectionInput,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnConnectionPropsToCloudFormation(props);
    }
}

export namespace CfnConnection {
    /**
     * A structure that is used to specify a connection to create or update.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-connection-connectioninput.html
     */
    export interface ConnectionInputProperty {
        /**
         * These key-value pairs define parameters for the connection.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-connection-connectioninput.html#cfn-glue-connection-connectioninput-connectionproperties
         */
        readonly connectionProperties?: any | cdk.IResolvable;
        /**
         * The type of the connection. Currently, these types are supported:
         *
         * - `JDBC` - Designates a connection to a database through Java Database Connectivity (JDBC).
         * - `KAFKA` - Designates a connection to an Apache Kafka streaming platform.
         * - `MONGODB` - Designates a connection to a MongoDB document database.
         * - `NETWORK` - Designates a network connection to a data source within an Amazon Virtual Private Cloud environment (Amazon VPC).
         *
         * SFTP is not supported.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-connection-connectioninput.html#cfn-glue-connection-connectioninput-connectiontype
         */
        readonly connectionType: string;
        /**
         * The description of the connection.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-connection-connectioninput.html#cfn-glue-connection-connectioninput-description
         */
        readonly description?: string;
        /**
         * A list of criteria that can be used in selecting this connection.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-connection-connectioninput.html#cfn-glue-connection-connectioninput-matchcriteria
         */
        readonly matchCriteria?: string[];
        /**
         * The name of the connection.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-connection-connectioninput.html#cfn-glue-connection-connectioninput-name
         */
        readonly name?: string;
        /**
         * A map of physical connection requirements, such as virtual private cloud (VPC) and `SecurityGroup` , that are needed to successfully make this connection.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-connection-connectioninput.html#cfn-glue-connection-connectioninput-physicalconnectionrequirements
         */
        readonly physicalConnectionRequirements?: CfnConnection.PhysicalConnectionRequirementsProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ConnectionInputProperty`
 *
 * @param properties - the TypeScript properties of a `ConnectionInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnection_ConnectionInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('connectionProperties', cdk.validateObject)(properties.connectionProperties));
    errors.collect(cdk.propertyValidator('connectionType', cdk.requiredValidator)(properties.connectionType));
    errors.collect(cdk.propertyValidator('connectionType', cdk.validateString)(properties.connectionType));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('matchCriteria', cdk.listValidator(cdk.validateString))(properties.matchCriteria));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('physicalConnectionRequirements', CfnConnection_PhysicalConnectionRequirementsPropertyValidator)(properties.physicalConnectionRequirements));
    return errors.wrap('supplied properties not correct for "ConnectionInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Connection.ConnectionInput` resource
 *
 * @param properties - the TypeScript properties of a `ConnectionInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Connection.ConnectionInput` resource.
 */
// @ts-ignore TS6133
function cfnConnectionConnectionInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnection_ConnectionInputPropertyValidator(properties).assertSuccess();
    return {
        ConnectionProperties: cdk.objectToCloudFormation(properties.connectionProperties),
        ConnectionType: cdk.stringToCloudFormation(properties.connectionType),
        Description: cdk.stringToCloudFormation(properties.description),
        MatchCriteria: cdk.listMapper(cdk.stringToCloudFormation)(properties.matchCriteria),
        Name: cdk.stringToCloudFormation(properties.name),
        PhysicalConnectionRequirements: cfnConnectionPhysicalConnectionRequirementsPropertyToCloudFormation(properties.physicalConnectionRequirements),
    };
}

// @ts-ignore TS6133
function CfnConnectionConnectionInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnection.ConnectionInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnection.ConnectionInputProperty>();
    ret.addPropertyResult('connectionProperties', 'ConnectionProperties', properties.ConnectionProperties != null ? cfn_parse.FromCloudFormation.getAny(properties.ConnectionProperties) : undefined);
    ret.addPropertyResult('connectionType', 'ConnectionType', cfn_parse.FromCloudFormation.getString(properties.ConnectionType));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('matchCriteria', 'MatchCriteria', properties.MatchCriteria != null ? cfn_parse.FromCloudFormation.getStringArray(properties.MatchCriteria) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('physicalConnectionRequirements', 'PhysicalConnectionRequirements', properties.PhysicalConnectionRequirements != null ? CfnConnectionPhysicalConnectionRequirementsPropertyFromCloudFormation(properties.PhysicalConnectionRequirements) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnConnection {
    /**
     * Specifies the physical requirements for a connection.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-connection-physicalconnectionrequirements.html
     */
    export interface PhysicalConnectionRequirementsProperty {
        /**
         * The connection's Availability Zone. This field is redundant because the specified subnet implies the Availability Zone to be used. Currently the field must be populated, but it will be deprecated in the future.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-connection-physicalconnectionrequirements.html#cfn-glue-connection-physicalconnectionrequirements-availabilityzone
         */
        readonly availabilityZone?: string;
        /**
         * The security group ID list used by the connection.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-connection-physicalconnectionrequirements.html#cfn-glue-connection-physicalconnectionrequirements-securitygroupidlist
         */
        readonly securityGroupIdList?: string[];
        /**
         * The subnet ID used by the connection.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-connection-physicalconnectionrequirements.html#cfn-glue-connection-physicalconnectionrequirements-subnetid
         */
        readonly subnetId?: string;
    }
}

/**
 * Determine whether the given properties match those of a `PhysicalConnectionRequirementsProperty`
 *
 * @param properties - the TypeScript properties of a `PhysicalConnectionRequirementsProperty`
 *
 * @returns the result of the validation.
 */
function CfnConnection_PhysicalConnectionRequirementsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('availabilityZone', cdk.validateString)(properties.availabilityZone));
    errors.collect(cdk.propertyValidator('securityGroupIdList', cdk.listValidator(cdk.validateString))(properties.securityGroupIdList));
    errors.collect(cdk.propertyValidator('subnetId', cdk.validateString)(properties.subnetId));
    return errors.wrap('supplied properties not correct for "PhysicalConnectionRequirementsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Connection.PhysicalConnectionRequirements` resource
 *
 * @param properties - the TypeScript properties of a `PhysicalConnectionRequirementsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Connection.PhysicalConnectionRequirements` resource.
 */
// @ts-ignore TS6133
function cfnConnectionPhysicalConnectionRequirementsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnConnection_PhysicalConnectionRequirementsPropertyValidator(properties).assertSuccess();
    return {
        AvailabilityZone: cdk.stringToCloudFormation(properties.availabilityZone),
        SecurityGroupIdList: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIdList),
        SubnetId: cdk.stringToCloudFormation(properties.subnetId),
    };
}

// @ts-ignore TS6133
function CfnConnectionPhysicalConnectionRequirementsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnConnection.PhysicalConnectionRequirementsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnConnection.PhysicalConnectionRequirementsProperty>();
    ret.addPropertyResult('availabilityZone', 'AvailabilityZone', properties.AvailabilityZone != null ? cfn_parse.FromCloudFormation.getString(properties.AvailabilityZone) : undefined);
    ret.addPropertyResult('securityGroupIdList', 'SecurityGroupIdList', properties.SecurityGroupIdList != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIdList) : undefined);
    ret.addPropertyResult('subnetId', 'SubnetId', properties.SubnetId != null ? cfn_parse.FromCloudFormation.getString(properties.SubnetId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnCrawler`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html
 */
export interface CfnCrawlerProps {

    /**
     * The Amazon Resource Name (ARN) of an IAM role that's used to access customer resources, such as Amazon Simple Storage Service (Amazon S3) data.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-role
     */
    readonly role: string;

    /**
     * A collection of targets to crawl.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-targets
     */
    readonly targets: CfnCrawler.TargetsProperty | cdk.IResolvable;

    /**
     * A list of UTF-8 strings that specify the custom classifiers that are associated with the crawler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-classifiers
     */
    readonly classifiers?: string[];

    /**
     * Crawler configuration information. This versioned JSON string allows users to specify aspects of a crawler's behavior. For more information, see [Configuring a Crawler](https://docs.aws.amazon.com/glue/latest/dg/crawler-configuration.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-configuration
     */
    readonly configuration?: string;

    /**
     * The name of the `SecurityConfiguration` structure to be used by this crawler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-crawlersecurityconfiguration
     */
    readonly crawlerSecurityConfiguration?: string;

    /**
     * The name of the database in which the crawler's output is stored.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-databasename
     */
    readonly databaseName?: string;

    /**
     * A description of the crawler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-description
     */
    readonly description?: string;

    /**
     * The name of the crawler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-name
     */
    readonly name?: string;

    /**
     * A policy that specifies whether to crawl the entire dataset again, or to crawl only folders that were added since the last crawler run.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-recrawlpolicy
     */
    readonly recrawlPolicy?: CfnCrawler.RecrawlPolicyProperty | cdk.IResolvable;

    /**
     * For scheduled crawlers, the schedule when the crawler runs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-schedule
     */
    readonly schedule?: CfnCrawler.ScheduleProperty | cdk.IResolvable;

    /**
     * The policy that specifies update and delete behaviors for the crawler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-schemachangepolicy
     */
    readonly schemaChangePolicy?: CfnCrawler.SchemaChangePolicyProperty | cdk.IResolvable;

    /**
     * The prefix added to the names of tables that are created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-tableprefix
     */
    readonly tablePrefix?: string;

    /**
     * The tags to use with this crawler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-tags
     */
    readonly tags?: any;
}

/**
 * Determine whether the given properties match those of a `CfnCrawlerProps`
 *
 * @param properties - the TypeScript properties of a `CfnCrawlerProps`
 *
 * @returns the result of the validation.
 */
function CfnCrawlerPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('classifiers', cdk.listValidator(cdk.validateString))(properties.classifiers));
    errors.collect(cdk.propertyValidator('configuration', cdk.validateString)(properties.configuration));
    errors.collect(cdk.propertyValidator('crawlerSecurityConfiguration', cdk.validateString)(properties.crawlerSecurityConfiguration));
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('recrawlPolicy', CfnCrawler_RecrawlPolicyPropertyValidator)(properties.recrawlPolicy));
    errors.collect(cdk.propertyValidator('role', cdk.requiredValidator)(properties.role));
    errors.collect(cdk.propertyValidator('role', cdk.validateString)(properties.role));
    errors.collect(cdk.propertyValidator('schedule', CfnCrawler_SchedulePropertyValidator)(properties.schedule));
    errors.collect(cdk.propertyValidator('schemaChangePolicy', CfnCrawler_SchemaChangePolicyPropertyValidator)(properties.schemaChangePolicy));
    errors.collect(cdk.propertyValidator('tablePrefix', cdk.validateString)(properties.tablePrefix));
    errors.collect(cdk.propertyValidator('tags', cdk.validateObject)(properties.tags));
    errors.collect(cdk.propertyValidator('targets', cdk.requiredValidator)(properties.targets));
    errors.collect(cdk.propertyValidator('targets', CfnCrawler_TargetsPropertyValidator)(properties.targets));
    return errors.wrap('supplied properties not correct for "CfnCrawlerProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Crawler` resource
 *
 * @param properties - the TypeScript properties of a `CfnCrawlerProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Crawler` resource.
 */
// @ts-ignore TS6133
function cfnCrawlerPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCrawlerPropsValidator(properties).assertSuccess();
    return {
        Role: cdk.stringToCloudFormation(properties.role),
        Targets: cfnCrawlerTargetsPropertyToCloudFormation(properties.targets),
        Classifiers: cdk.listMapper(cdk.stringToCloudFormation)(properties.classifiers),
        Configuration: cdk.stringToCloudFormation(properties.configuration),
        CrawlerSecurityConfiguration: cdk.stringToCloudFormation(properties.crawlerSecurityConfiguration),
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
        Description: cdk.stringToCloudFormation(properties.description),
        Name: cdk.stringToCloudFormation(properties.name),
        RecrawlPolicy: cfnCrawlerRecrawlPolicyPropertyToCloudFormation(properties.recrawlPolicy),
        Schedule: cfnCrawlerSchedulePropertyToCloudFormation(properties.schedule),
        SchemaChangePolicy: cfnCrawlerSchemaChangePolicyPropertyToCloudFormation(properties.schemaChangePolicy),
        TablePrefix: cdk.stringToCloudFormation(properties.tablePrefix),
        Tags: cdk.objectToCloudFormation(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnCrawlerPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCrawlerProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCrawlerProps>();
    ret.addPropertyResult('role', 'Role', cfn_parse.FromCloudFormation.getString(properties.Role));
    ret.addPropertyResult('targets', 'Targets', CfnCrawlerTargetsPropertyFromCloudFormation(properties.Targets));
    ret.addPropertyResult('classifiers', 'Classifiers', properties.Classifiers != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Classifiers) : undefined);
    ret.addPropertyResult('configuration', 'Configuration', properties.Configuration != null ? cfn_parse.FromCloudFormation.getString(properties.Configuration) : undefined);
    ret.addPropertyResult('crawlerSecurityConfiguration', 'CrawlerSecurityConfiguration', properties.CrawlerSecurityConfiguration != null ? cfn_parse.FromCloudFormation.getString(properties.CrawlerSecurityConfiguration) : undefined);
    ret.addPropertyResult('databaseName', 'DatabaseName', properties.DatabaseName != null ? cfn_parse.FromCloudFormation.getString(properties.DatabaseName) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('recrawlPolicy', 'RecrawlPolicy', properties.RecrawlPolicy != null ? CfnCrawlerRecrawlPolicyPropertyFromCloudFormation(properties.RecrawlPolicy) : undefined);
    ret.addPropertyResult('schedule', 'Schedule', properties.Schedule != null ? CfnCrawlerSchedulePropertyFromCloudFormation(properties.Schedule) : undefined);
    ret.addPropertyResult('schemaChangePolicy', 'SchemaChangePolicy', properties.SchemaChangePolicy != null ? CfnCrawlerSchemaChangePolicyPropertyFromCloudFormation(properties.SchemaChangePolicy) : undefined);
    ret.addPropertyResult('tablePrefix', 'TablePrefix', properties.TablePrefix != null ? cfn_parse.FromCloudFormation.getString(properties.TablePrefix) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getAny(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::Crawler`
 *
 * The `AWS::Glue::Crawler` resource specifies an AWS Glue crawler. For more information, see [Cataloging Tables with a Crawler](https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html) and [Crawler Structure](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-crawler-crawling.html#aws-glue-api-crawler-crawling-Crawler) in the *AWS Glue Developer Guide* .
 *
 * @cloudformationResource AWS::Glue::Crawler
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html
 */
export class CfnCrawler extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::Crawler";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnCrawler {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnCrawlerPropsFromCloudFormation(resourceProperties);
        const ret = new CfnCrawler(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of an IAM role that's used to access customer resources, such as Amazon Simple Storage Service (Amazon S3) data.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-role
     */
    public role: string;

    /**
     * A collection of targets to crawl.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-targets
     */
    public targets: CfnCrawler.TargetsProperty | cdk.IResolvable;

    /**
     * A list of UTF-8 strings that specify the custom classifiers that are associated with the crawler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-classifiers
     */
    public classifiers: string[] | undefined;

    /**
     * Crawler configuration information. This versioned JSON string allows users to specify aspects of a crawler's behavior. For more information, see [Configuring a Crawler](https://docs.aws.amazon.com/glue/latest/dg/crawler-configuration.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-configuration
     */
    public configuration: string | undefined;

    /**
     * The name of the `SecurityConfiguration` structure to be used by this crawler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-crawlersecurityconfiguration
     */
    public crawlerSecurityConfiguration: string | undefined;

    /**
     * The name of the database in which the crawler's output is stored.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-databasename
     */
    public databaseName: string | undefined;

    /**
     * A description of the crawler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-description
     */
    public description: string | undefined;

    /**
     * The name of the crawler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-name
     */
    public name: string | undefined;

    /**
     * A policy that specifies whether to crawl the entire dataset again, or to crawl only folders that were added since the last crawler run.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-recrawlpolicy
     */
    public recrawlPolicy: CfnCrawler.RecrawlPolicyProperty | cdk.IResolvable | undefined;

    /**
     * For scheduled crawlers, the schedule when the crawler runs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-schedule
     */
    public schedule: CfnCrawler.ScheduleProperty | cdk.IResolvable | undefined;

    /**
     * The policy that specifies update and delete behaviors for the crawler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-schemachangepolicy
     */
    public schemaChangePolicy: CfnCrawler.SchemaChangePolicyProperty | cdk.IResolvable | undefined;

    /**
     * The prefix added to the names of tables that are created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-tableprefix
     */
    public tablePrefix: string | undefined;

    /**
     * The tags to use with this crawler.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-crawler.html#cfn-glue-crawler-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Glue::Crawler`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnCrawlerProps) {
        super(scope, id, { type: CfnCrawler.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'role', this);
        cdk.requireProperty(props, 'targets', this);

        this.role = props.role;
        this.targets = props.targets;
        this.classifiers = props.classifiers;
        this.configuration = props.configuration;
        this.crawlerSecurityConfiguration = props.crawlerSecurityConfiguration;
        this.databaseName = props.databaseName;
        this.description = props.description;
        this.name = props.name;
        this.recrawlPolicy = props.recrawlPolicy;
        this.schedule = props.schedule;
        this.schemaChangePolicy = props.schemaChangePolicy;
        this.tablePrefix = props.tablePrefix;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::Glue::Crawler", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnCrawler.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            role: this.role,
            targets: this.targets,
            classifiers: this.classifiers,
            configuration: this.configuration,
            crawlerSecurityConfiguration: this.crawlerSecurityConfiguration,
            databaseName: this.databaseName,
            description: this.description,
            name: this.name,
            recrawlPolicy: this.recrawlPolicy,
            schedule: this.schedule,
            schemaChangePolicy: this.schemaChangePolicy,
            tablePrefix: this.tablePrefix,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnCrawlerPropsToCloudFormation(props);
    }
}

export namespace CfnCrawler {
    /**
     * Specifies an AWS Glue Data Catalog target.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-catalogtarget.html
     */
    export interface CatalogTargetProperty {
        /**
         * The name of the database to be synchronized.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-catalogtarget.html#cfn-glue-crawler-catalogtarget-databasename
         */
        readonly databaseName?: string;
        /**
         * A list of the tables to be synchronized.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-catalogtarget.html#cfn-glue-crawler-catalogtarget-tables
         */
        readonly tables?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `CatalogTargetProperty`
 *
 * @param properties - the TypeScript properties of a `CatalogTargetProperty`
 *
 * @returns the result of the validation.
 */
function CfnCrawler_CatalogTargetPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    errors.collect(cdk.propertyValidator('tables', cdk.listValidator(cdk.validateString))(properties.tables));
    return errors.wrap('supplied properties not correct for "CatalogTargetProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Crawler.CatalogTarget` resource
 *
 * @param properties - the TypeScript properties of a `CatalogTargetProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Crawler.CatalogTarget` resource.
 */
// @ts-ignore TS6133
function cfnCrawlerCatalogTargetPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCrawler_CatalogTargetPropertyValidator(properties).assertSuccess();
    return {
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
        Tables: cdk.listMapper(cdk.stringToCloudFormation)(properties.tables),
    };
}

// @ts-ignore TS6133
function CfnCrawlerCatalogTargetPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCrawler.CatalogTargetProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCrawler.CatalogTargetProperty>();
    ret.addPropertyResult('databaseName', 'DatabaseName', properties.DatabaseName != null ? cfn_parse.FromCloudFormation.getString(properties.DatabaseName) : undefined);
    ret.addPropertyResult('tables', 'Tables', properties.Tables != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Tables) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCrawler {
    /**
     * Specifies an Amazon DynamoDB table to crawl.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-dynamodbtarget.html
     */
    export interface DynamoDBTargetProperty {
        /**
         * The name of the DynamoDB table to crawl.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-dynamodbtarget.html#cfn-glue-crawler-dynamodbtarget-path
         */
        readonly path?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DynamoDBTargetProperty`
 *
 * @param properties - the TypeScript properties of a `DynamoDBTargetProperty`
 *
 * @returns the result of the validation.
 */
function CfnCrawler_DynamoDBTargetPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('path', cdk.validateString)(properties.path));
    return errors.wrap('supplied properties not correct for "DynamoDBTargetProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Crawler.DynamoDBTarget` resource
 *
 * @param properties - the TypeScript properties of a `DynamoDBTargetProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Crawler.DynamoDBTarget` resource.
 */
// @ts-ignore TS6133
function cfnCrawlerDynamoDBTargetPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCrawler_DynamoDBTargetPropertyValidator(properties).assertSuccess();
    return {
        Path: cdk.stringToCloudFormation(properties.path),
    };
}

// @ts-ignore TS6133
function CfnCrawlerDynamoDBTargetPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCrawler.DynamoDBTargetProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCrawler.DynamoDBTargetProperty>();
    ret.addPropertyResult('path', 'Path', properties.Path != null ? cfn_parse.FromCloudFormation.getString(properties.Path) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCrawler {
    /**
     * Specifies a JDBC data store to crawl.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-jdbctarget.html
     */
    export interface JdbcTargetProperty {
        /**
         * The name of the connection to use to connect to the JDBC target.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-jdbctarget.html#cfn-glue-crawler-jdbctarget-connectionname
         */
        readonly connectionName?: string;
        /**
         * A list of glob patterns used to exclude from the crawl. For more information, see [Catalog Tables with a Crawler](https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-jdbctarget.html#cfn-glue-crawler-jdbctarget-exclusions
         */
        readonly exclusions?: string[];
        /**
         * The path of the JDBC target.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-jdbctarget.html#cfn-glue-crawler-jdbctarget-path
         */
        readonly path?: string;
    }
}

/**
 * Determine whether the given properties match those of a `JdbcTargetProperty`
 *
 * @param properties - the TypeScript properties of a `JdbcTargetProperty`
 *
 * @returns the result of the validation.
 */
function CfnCrawler_JdbcTargetPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('connectionName', cdk.validateString)(properties.connectionName));
    errors.collect(cdk.propertyValidator('exclusions', cdk.listValidator(cdk.validateString))(properties.exclusions));
    errors.collect(cdk.propertyValidator('path', cdk.validateString)(properties.path));
    return errors.wrap('supplied properties not correct for "JdbcTargetProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Crawler.JdbcTarget` resource
 *
 * @param properties - the TypeScript properties of a `JdbcTargetProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Crawler.JdbcTarget` resource.
 */
// @ts-ignore TS6133
function cfnCrawlerJdbcTargetPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCrawler_JdbcTargetPropertyValidator(properties).assertSuccess();
    return {
        ConnectionName: cdk.stringToCloudFormation(properties.connectionName),
        Exclusions: cdk.listMapper(cdk.stringToCloudFormation)(properties.exclusions),
        Path: cdk.stringToCloudFormation(properties.path),
    };
}

// @ts-ignore TS6133
function CfnCrawlerJdbcTargetPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCrawler.JdbcTargetProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCrawler.JdbcTargetProperty>();
    ret.addPropertyResult('connectionName', 'ConnectionName', properties.ConnectionName != null ? cfn_parse.FromCloudFormation.getString(properties.ConnectionName) : undefined);
    ret.addPropertyResult('exclusions', 'Exclusions', properties.Exclusions != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Exclusions) : undefined);
    ret.addPropertyResult('path', 'Path', properties.Path != null ? cfn_parse.FromCloudFormation.getString(properties.Path) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCrawler {
    /**
     * Specifies an Amazon DocumentDB or MongoDB data store to crawl.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-mongodbtarget.html
     */
    export interface MongoDBTargetProperty {
        /**
         * The name of the connection to use to connect to the Amazon DocumentDB or MongoDB target.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-mongodbtarget.html#cfn-glue-crawler-mongodbtarget-connectionname
         */
        readonly connectionName?: string;
        /**
         * The path of the Amazon DocumentDB or MongoDB target (database/collection).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-mongodbtarget.html#cfn-glue-crawler-mongodbtarget-path
         */
        readonly path?: string;
    }
}

/**
 * Determine whether the given properties match those of a `MongoDBTargetProperty`
 *
 * @param properties - the TypeScript properties of a `MongoDBTargetProperty`
 *
 * @returns the result of the validation.
 */
function CfnCrawler_MongoDBTargetPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('connectionName', cdk.validateString)(properties.connectionName));
    errors.collect(cdk.propertyValidator('path', cdk.validateString)(properties.path));
    return errors.wrap('supplied properties not correct for "MongoDBTargetProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Crawler.MongoDBTarget` resource
 *
 * @param properties - the TypeScript properties of a `MongoDBTargetProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Crawler.MongoDBTarget` resource.
 */
// @ts-ignore TS6133
function cfnCrawlerMongoDBTargetPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCrawler_MongoDBTargetPropertyValidator(properties).assertSuccess();
    return {
        ConnectionName: cdk.stringToCloudFormation(properties.connectionName),
        Path: cdk.stringToCloudFormation(properties.path),
    };
}

// @ts-ignore TS6133
function CfnCrawlerMongoDBTargetPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCrawler.MongoDBTargetProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCrawler.MongoDBTargetProperty>();
    ret.addPropertyResult('connectionName', 'ConnectionName', properties.ConnectionName != null ? cfn_parse.FromCloudFormation.getString(properties.ConnectionName) : undefined);
    ret.addPropertyResult('path', 'Path', properties.Path != null ? cfn_parse.FromCloudFormation.getString(properties.Path) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCrawler {
    /**
     * When crawling an Amazon S3 data source after the first crawl is complete, specifies whether to crawl the entire dataset again or to crawl only folders that were added since the last crawler run. For more information, see [Incremental Crawls in AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/incremental-crawls.html) in the developer guide.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-recrawlpolicy.html
     */
    export interface RecrawlPolicyProperty {
        /**
         * Specifies whether to crawl the entire dataset again or to crawl only folders that were added since the last crawler run.
         *
         * A value of `CRAWL_EVERYTHING` specifies crawling the entire dataset again.
         *
         * A value of `CRAWL_NEW_FOLDERS_ONLY` specifies crawling only folders that were added since the last crawler run.
         *
         * A value of `CRAWL_EVENT_MODE` specifies crawling only the changes identified by Amazon S3 events.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-recrawlpolicy.html#cfn-glue-crawler-recrawlpolicy-recrawlbehavior
         */
        readonly recrawlBehavior?: string;
    }
}

/**
 * Determine whether the given properties match those of a `RecrawlPolicyProperty`
 *
 * @param properties - the TypeScript properties of a `RecrawlPolicyProperty`
 *
 * @returns the result of the validation.
 */
function CfnCrawler_RecrawlPolicyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('recrawlBehavior', cdk.validateString)(properties.recrawlBehavior));
    return errors.wrap('supplied properties not correct for "RecrawlPolicyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Crawler.RecrawlPolicy` resource
 *
 * @param properties - the TypeScript properties of a `RecrawlPolicyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Crawler.RecrawlPolicy` resource.
 */
// @ts-ignore TS6133
function cfnCrawlerRecrawlPolicyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCrawler_RecrawlPolicyPropertyValidator(properties).assertSuccess();
    return {
        RecrawlBehavior: cdk.stringToCloudFormation(properties.recrawlBehavior),
    };
}

// @ts-ignore TS6133
function CfnCrawlerRecrawlPolicyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCrawler.RecrawlPolicyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCrawler.RecrawlPolicyProperty>();
    ret.addPropertyResult('recrawlBehavior', 'RecrawlBehavior', properties.RecrawlBehavior != null ? cfn_parse.FromCloudFormation.getString(properties.RecrawlBehavior) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCrawler {
    /**
     * Specifies a data store in Amazon Simple Storage Service (Amazon S3).
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-s3target.html
     */
    export interface S3TargetProperty {
        /**
         * The name of a connection which allows a job or crawler to access data in Amazon S3 within an Amazon Virtual Private Cloud environment (Amazon VPC).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-s3target.html#cfn-glue-crawler-s3target-connectionname
         */
        readonly connectionName?: string;
        /**
         * `CfnCrawler.S3TargetProperty.DlqEventQueueArn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-s3target.html#cfn-glue-crawler-s3target-dlqeventqueuearn
         */
        readonly dlqEventQueueArn?: string;
        /**
         * `CfnCrawler.S3TargetProperty.EventQueueArn`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-s3target.html#cfn-glue-crawler-s3target-eventqueuearn
         */
        readonly eventQueueArn?: string;
        /**
         * A list of glob patterns used to exclude from the crawl. For more information, see [Catalog Tables with a Crawler](https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-s3target.html#cfn-glue-crawler-s3target-exclusions
         */
        readonly exclusions?: string[];
        /**
         * The path to the Amazon S3 target.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-s3target.html#cfn-glue-crawler-s3target-path
         */
        readonly path?: string;
        /**
         * Sets the number of files in each leaf folder to be crawled when crawling sample files in a dataset. If not set, all the files are crawled. A valid value is an integer between 1 and 249.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-s3target.html#cfn-glue-crawler-s3target-samplesize
         */
        readonly sampleSize?: number;
    }
}

/**
 * Determine whether the given properties match those of a `S3TargetProperty`
 *
 * @param properties - the TypeScript properties of a `S3TargetProperty`
 *
 * @returns the result of the validation.
 */
function CfnCrawler_S3TargetPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('connectionName', cdk.validateString)(properties.connectionName));
    errors.collect(cdk.propertyValidator('dlqEventQueueArn', cdk.validateString)(properties.dlqEventQueueArn));
    errors.collect(cdk.propertyValidator('eventQueueArn', cdk.validateString)(properties.eventQueueArn));
    errors.collect(cdk.propertyValidator('exclusions', cdk.listValidator(cdk.validateString))(properties.exclusions));
    errors.collect(cdk.propertyValidator('path', cdk.validateString)(properties.path));
    errors.collect(cdk.propertyValidator('sampleSize', cdk.validateNumber)(properties.sampleSize));
    return errors.wrap('supplied properties not correct for "S3TargetProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Crawler.S3Target` resource
 *
 * @param properties - the TypeScript properties of a `S3TargetProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Crawler.S3Target` resource.
 */
// @ts-ignore TS6133
function cfnCrawlerS3TargetPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCrawler_S3TargetPropertyValidator(properties).assertSuccess();
    return {
        ConnectionName: cdk.stringToCloudFormation(properties.connectionName),
        DlqEventQueueArn: cdk.stringToCloudFormation(properties.dlqEventQueueArn),
        EventQueueArn: cdk.stringToCloudFormation(properties.eventQueueArn),
        Exclusions: cdk.listMapper(cdk.stringToCloudFormation)(properties.exclusions),
        Path: cdk.stringToCloudFormation(properties.path),
        SampleSize: cdk.numberToCloudFormation(properties.sampleSize),
    };
}

// @ts-ignore TS6133
function CfnCrawlerS3TargetPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCrawler.S3TargetProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCrawler.S3TargetProperty>();
    ret.addPropertyResult('connectionName', 'ConnectionName', properties.ConnectionName != null ? cfn_parse.FromCloudFormation.getString(properties.ConnectionName) : undefined);
    ret.addPropertyResult('dlqEventQueueArn', 'DlqEventQueueArn', properties.DlqEventQueueArn != null ? cfn_parse.FromCloudFormation.getString(properties.DlqEventQueueArn) : undefined);
    ret.addPropertyResult('eventQueueArn', 'EventQueueArn', properties.EventQueueArn != null ? cfn_parse.FromCloudFormation.getString(properties.EventQueueArn) : undefined);
    ret.addPropertyResult('exclusions', 'Exclusions', properties.Exclusions != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Exclusions) : undefined);
    ret.addPropertyResult('path', 'Path', properties.Path != null ? cfn_parse.FromCloudFormation.getString(properties.Path) : undefined);
    ret.addPropertyResult('sampleSize', 'SampleSize', properties.SampleSize != null ? cfn_parse.FromCloudFormation.getNumber(properties.SampleSize) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCrawler {
    /**
     * A scheduling object using a `cron` statement to schedule an event.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-schedule.html
     */
    export interface ScheduleProperty {
        /**
         * A `cron` expression used to specify the schedule. For more information, see [Time-Based Schedules for Jobs and Crawlers](https://docs.aws.amazon.com/glue/latest/dg/monitor-data-warehouse-schedule.html) . For example, to run something every day at 12:15 UTC, specify `cron(15 12 * * ? *)` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-schedule.html#cfn-glue-crawler-schedule-scheduleexpression
         */
        readonly scheduleExpression?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ScheduleProperty`
 *
 * @param properties - the TypeScript properties of a `ScheduleProperty`
 *
 * @returns the result of the validation.
 */
function CfnCrawler_SchedulePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('scheduleExpression', cdk.validateString)(properties.scheduleExpression));
    return errors.wrap('supplied properties not correct for "ScheduleProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Crawler.Schedule` resource
 *
 * @param properties - the TypeScript properties of a `ScheduleProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Crawler.Schedule` resource.
 */
// @ts-ignore TS6133
function cfnCrawlerSchedulePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCrawler_SchedulePropertyValidator(properties).assertSuccess();
    return {
        ScheduleExpression: cdk.stringToCloudFormation(properties.scheduleExpression),
    };
}

// @ts-ignore TS6133
function CfnCrawlerSchedulePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCrawler.ScheduleProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCrawler.ScheduleProperty>();
    ret.addPropertyResult('scheduleExpression', 'ScheduleExpression', properties.ScheduleExpression != null ? cfn_parse.FromCloudFormation.getString(properties.ScheduleExpression) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCrawler {
    /**
     * A policy that specifies update and deletion behaviors for the crawler.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-schemachangepolicy.html
     */
    export interface SchemaChangePolicyProperty {
        /**
         * The deletion behavior when the crawler finds a deleted object.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-schemachangepolicy.html#cfn-glue-crawler-schemachangepolicy-deletebehavior
         */
        readonly deleteBehavior?: string;
        /**
         * The update behavior when the crawler finds a changed schema.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-schemachangepolicy.html#cfn-glue-crawler-schemachangepolicy-updatebehavior
         */
        readonly updateBehavior?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SchemaChangePolicyProperty`
 *
 * @param properties - the TypeScript properties of a `SchemaChangePolicyProperty`
 *
 * @returns the result of the validation.
 */
function CfnCrawler_SchemaChangePolicyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('deleteBehavior', cdk.validateString)(properties.deleteBehavior));
    errors.collect(cdk.propertyValidator('updateBehavior', cdk.validateString)(properties.updateBehavior));
    return errors.wrap('supplied properties not correct for "SchemaChangePolicyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Crawler.SchemaChangePolicy` resource
 *
 * @param properties - the TypeScript properties of a `SchemaChangePolicyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Crawler.SchemaChangePolicy` resource.
 */
// @ts-ignore TS6133
function cfnCrawlerSchemaChangePolicyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCrawler_SchemaChangePolicyPropertyValidator(properties).assertSuccess();
    return {
        DeleteBehavior: cdk.stringToCloudFormation(properties.deleteBehavior),
        UpdateBehavior: cdk.stringToCloudFormation(properties.updateBehavior),
    };
}

// @ts-ignore TS6133
function CfnCrawlerSchemaChangePolicyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCrawler.SchemaChangePolicyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCrawler.SchemaChangePolicyProperty>();
    ret.addPropertyResult('deleteBehavior', 'DeleteBehavior', properties.DeleteBehavior != null ? cfn_parse.FromCloudFormation.getString(properties.DeleteBehavior) : undefined);
    ret.addPropertyResult('updateBehavior', 'UpdateBehavior', properties.UpdateBehavior != null ? cfn_parse.FromCloudFormation.getString(properties.UpdateBehavior) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCrawler {
    /**
     * Specifies data stores to crawl.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-targets.html
     */
    export interface TargetsProperty {
        /**
         * Specifies AWS Glue Data Catalog targets.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-targets.html#cfn-glue-crawler-targets-catalogtargets
         */
        readonly catalogTargets?: Array<CfnCrawler.CatalogTargetProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * Specifies Amazon DynamoDB targets.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-targets.html#cfn-glue-crawler-targets-dynamodbtargets
         */
        readonly dynamoDbTargets?: Array<CfnCrawler.DynamoDBTargetProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * Specifies JDBC targets.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-targets.html#cfn-glue-crawler-targets-jdbctargets
         */
        readonly jdbcTargets?: Array<CfnCrawler.JdbcTargetProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * A list of Mongo DB targets.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-targets.html#cfn-glue-crawler-targets-mongodbtargets
         */
        readonly mongoDbTargets?: Array<CfnCrawler.MongoDBTargetProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * Specifies Amazon Simple Storage Service (Amazon S3) targets.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-crawler-targets.html#cfn-glue-crawler-targets-s3targets
         */
        readonly s3Targets?: Array<CfnCrawler.S3TargetProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `TargetsProperty`
 *
 * @param properties - the TypeScript properties of a `TargetsProperty`
 *
 * @returns the result of the validation.
 */
function CfnCrawler_TargetsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogTargets', cdk.listValidator(CfnCrawler_CatalogTargetPropertyValidator))(properties.catalogTargets));
    errors.collect(cdk.propertyValidator('dynamoDbTargets', cdk.listValidator(CfnCrawler_DynamoDBTargetPropertyValidator))(properties.dynamoDbTargets));
    errors.collect(cdk.propertyValidator('jdbcTargets', cdk.listValidator(CfnCrawler_JdbcTargetPropertyValidator))(properties.jdbcTargets));
    errors.collect(cdk.propertyValidator('mongoDbTargets', cdk.listValidator(CfnCrawler_MongoDBTargetPropertyValidator))(properties.mongoDbTargets));
    errors.collect(cdk.propertyValidator('s3Targets', cdk.listValidator(CfnCrawler_S3TargetPropertyValidator))(properties.s3Targets));
    return errors.wrap('supplied properties not correct for "TargetsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Crawler.Targets` resource
 *
 * @param properties - the TypeScript properties of a `TargetsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Crawler.Targets` resource.
 */
// @ts-ignore TS6133
function cfnCrawlerTargetsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCrawler_TargetsPropertyValidator(properties).assertSuccess();
    return {
        CatalogTargets: cdk.listMapper(cfnCrawlerCatalogTargetPropertyToCloudFormation)(properties.catalogTargets),
        DynamoDBTargets: cdk.listMapper(cfnCrawlerDynamoDBTargetPropertyToCloudFormation)(properties.dynamoDbTargets),
        JdbcTargets: cdk.listMapper(cfnCrawlerJdbcTargetPropertyToCloudFormation)(properties.jdbcTargets),
        MongoDBTargets: cdk.listMapper(cfnCrawlerMongoDBTargetPropertyToCloudFormation)(properties.mongoDbTargets),
        S3Targets: cdk.listMapper(cfnCrawlerS3TargetPropertyToCloudFormation)(properties.s3Targets),
    };
}

// @ts-ignore TS6133
function CfnCrawlerTargetsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCrawler.TargetsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCrawler.TargetsProperty>();
    ret.addPropertyResult('catalogTargets', 'CatalogTargets', properties.CatalogTargets != null ? cfn_parse.FromCloudFormation.getArray(CfnCrawlerCatalogTargetPropertyFromCloudFormation)(properties.CatalogTargets) : undefined);
    ret.addPropertyResult('dynamoDbTargets', 'DynamoDBTargets', properties.DynamoDBTargets != null ? cfn_parse.FromCloudFormation.getArray(CfnCrawlerDynamoDBTargetPropertyFromCloudFormation)(properties.DynamoDBTargets) : undefined);
    ret.addPropertyResult('jdbcTargets', 'JdbcTargets', properties.JdbcTargets != null ? cfn_parse.FromCloudFormation.getArray(CfnCrawlerJdbcTargetPropertyFromCloudFormation)(properties.JdbcTargets) : undefined);
    ret.addPropertyResult('mongoDbTargets', 'MongoDBTargets', properties.MongoDBTargets != null ? cfn_parse.FromCloudFormation.getArray(CfnCrawlerMongoDBTargetPropertyFromCloudFormation)(properties.MongoDBTargets) : undefined);
    ret.addPropertyResult('s3Targets', 'S3Targets', properties.S3Targets != null ? cfn_parse.FromCloudFormation.getArray(CfnCrawlerS3TargetPropertyFromCloudFormation)(properties.S3Targets) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDataCatalogEncryptionSettings`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-datacatalogencryptionsettings.html
 */
export interface CfnDataCatalogEncryptionSettingsProps {

    /**
     * The ID of the Data Catalog in which the settings are created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-datacatalogencryptionsettings.html#cfn-glue-datacatalogencryptionsettings-catalogid
     */
    readonly catalogId: string;

    /**
     * Contains configuration information for maintaining Data Catalog security.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-datacatalogencryptionsettings.html#cfn-glue-datacatalogencryptionsettings-datacatalogencryptionsettings
     */
    readonly dataCatalogEncryptionSettings: CfnDataCatalogEncryptionSettings.DataCatalogEncryptionSettingsProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnDataCatalogEncryptionSettingsProps`
 *
 * @param properties - the TypeScript properties of a `CfnDataCatalogEncryptionSettingsProps`
 *
 * @returns the result of the validation.
 */
function CfnDataCatalogEncryptionSettingsPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.requiredValidator)(properties.catalogId));
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('dataCatalogEncryptionSettings', cdk.requiredValidator)(properties.dataCatalogEncryptionSettings));
    errors.collect(cdk.propertyValidator('dataCatalogEncryptionSettings', CfnDataCatalogEncryptionSettings_DataCatalogEncryptionSettingsPropertyValidator)(properties.dataCatalogEncryptionSettings));
    return errors.wrap('supplied properties not correct for "CfnDataCatalogEncryptionSettingsProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::DataCatalogEncryptionSettings` resource
 *
 * @param properties - the TypeScript properties of a `CfnDataCatalogEncryptionSettingsProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::DataCatalogEncryptionSettings` resource.
 */
// @ts-ignore TS6133
function cfnDataCatalogEncryptionSettingsPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataCatalogEncryptionSettingsPropsValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        DataCatalogEncryptionSettings: cfnDataCatalogEncryptionSettingsDataCatalogEncryptionSettingsPropertyToCloudFormation(properties.dataCatalogEncryptionSettings),
    };
}

// @ts-ignore TS6133
function CfnDataCatalogEncryptionSettingsPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataCatalogEncryptionSettingsProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataCatalogEncryptionSettingsProps>();
    ret.addPropertyResult('catalogId', 'CatalogId', cfn_parse.FromCloudFormation.getString(properties.CatalogId));
    ret.addPropertyResult('dataCatalogEncryptionSettings', 'DataCatalogEncryptionSettings', CfnDataCatalogEncryptionSettingsDataCatalogEncryptionSettingsPropertyFromCloudFormation(properties.DataCatalogEncryptionSettings));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::DataCatalogEncryptionSettings`
 *
 * Sets the security configuration for a specified catalog. After the configuration has been set, the specified encryption is applied to every catalog write thereafter.
 *
 * @cloudformationResource AWS::Glue::DataCatalogEncryptionSettings
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-datacatalogencryptionsettings.html
 */
export class CfnDataCatalogEncryptionSettings extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::DataCatalogEncryptionSettings";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDataCatalogEncryptionSettings {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDataCatalogEncryptionSettingsPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDataCatalogEncryptionSettings(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ID of the Data Catalog in which the settings are created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-datacatalogencryptionsettings.html#cfn-glue-datacatalogencryptionsettings-catalogid
     */
    public catalogId: string;

    /**
     * Contains configuration information for maintaining Data Catalog security.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-datacatalogencryptionsettings.html#cfn-glue-datacatalogencryptionsettings-datacatalogencryptionsettings
     */
    public dataCatalogEncryptionSettings: CfnDataCatalogEncryptionSettings.DataCatalogEncryptionSettingsProperty | cdk.IResolvable;

    /**
     * Create a new `AWS::Glue::DataCatalogEncryptionSettings`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDataCatalogEncryptionSettingsProps) {
        super(scope, id, { type: CfnDataCatalogEncryptionSettings.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'catalogId', this);
        cdk.requireProperty(props, 'dataCatalogEncryptionSettings', this);

        this.catalogId = props.catalogId;
        this.dataCatalogEncryptionSettings = props.dataCatalogEncryptionSettings;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDataCatalogEncryptionSettings.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            catalogId: this.catalogId,
            dataCatalogEncryptionSettings: this.dataCatalogEncryptionSettings,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDataCatalogEncryptionSettingsPropsToCloudFormation(props);
    }
}

export namespace CfnDataCatalogEncryptionSettings {
    /**
     * The data structure used by the Data Catalog to encrypt the password as part of `CreateConnection` or `UpdateConnection` and store it in the `ENCRYPTED_PASSWORD` field in the connection properties. You can enable catalog encryption or only password encryption.
     *
     * When a `CreationConnection` request arrives containing a password, the Data Catalog first encrypts the password using your AWS KMS key. It then encrypts the whole connection object again if catalog encryption is also enabled.
     *
     * This encryption requires that you set AWS KMS key permissions to enable or restrict access on the password key according to your security requirements. For example, you might want only administrators to have decrypt permission on the password key.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-datacatalogencryptionsettings-connectionpasswordencryption.html
     */
    export interface ConnectionPasswordEncryptionProperty {
        /**
         * An AWS KMS key that is used to encrypt the connection password.
         *
         * If connection password protection is enabled, the caller of `CreateConnection` and `UpdateConnection` needs at least `kms:Encrypt` permission on the specified AWS KMS key, to encrypt passwords before storing them in the Data Catalog. You can set the decrypt permission to enable or restrict access on the password key according to your security requirements.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-datacatalogencryptionsettings-connectionpasswordencryption.html#cfn-glue-datacatalogencryptionsettings-connectionpasswordencryption-kmskeyid
         */
        readonly kmsKeyId?: string;
        /**
         * When the `ReturnConnectionPasswordEncrypted` flag is set to "true", passwords remain encrypted in the responses of `GetConnection` and `GetConnections` . This encryption takes effect independently from catalog encryption.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-datacatalogencryptionsettings-connectionpasswordencryption.html#cfn-glue-datacatalogencryptionsettings-connectionpasswordencryption-returnconnectionpasswordencrypted
         */
        readonly returnConnectionPasswordEncrypted?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ConnectionPasswordEncryptionProperty`
 *
 * @param properties - the TypeScript properties of a `ConnectionPasswordEncryptionProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataCatalogEncryptionSettings_ConnectionPasswordEncryptionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('returnConnectionPasswordEncrypted', cdk.validateBoolean)(properties.returnConnectionPasswordEncrypted));
    return errors.wrap('supplied properties not correct for "ConnectionPasswordEncryptionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::DataCatalogEncryptionSettings.ConnectionPasswordEncryption` resource
 *
 * @param properties - the TypeScript properties of a `ConnectionPasswordEncryptionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::DataCatalogEncryptionSettings.ConnectionPasswordEncryption` resource.
 */
// @ts-ignore TS6133
function cfnDataCatalogEncryptionSettingsConnectionPasswordEncryptionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataCatalogEncryptionSettings_ConnectionPasswordEncryptionPropertyValidator(properties).assertSuccess();
    return {
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        ReturnConnectionPasswordEncrypted: cdk.booleanToCloudFormation(properties.returnConnectionPasswordEncrypted),
    };
}

// @ts-ignore TS6133
function CfnDataCatalogEncryptionSettingsConnectionPasswordEncryptionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataCatalogEncryptionSettings.ConnectionPasswordEncryptionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataCatalogEncryptionSettings.ConnectionPasswordEncryptionProperty>();
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('returnConnectionPasswordEncrypted', 'ReturnConnectionPasswordEncrypted', properties.ReturnConnectionPasswordEncrypted != null ? cfn_parse.FromCloudFormation.getBoolean(properties.ReturnConnectionPasswordEncrypted) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataCatalogEncryptionSettings {
    /**
     * Contains configuration information for maintaining Data Catalog security.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-datacatalogencryptionsettings-datacatalogencryptionsettings.html
     */
    export interface DataCatalogEncryptionSettingsProperty {
        /**
         * When connection password protection is enabled, the Data Catalog uses a customer-provided key to encrypt the password as part of `CreateConnection` or `UpdateConnection` and store it in the `ENCRYPTED_PASSWORD` field in the connection properties. You can enable catalog encryption or only password encryption.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-datacatalogencryptionsettings-datacatalogencryptionsettings.html#cfn-glue-datacatalogencryptionsettings-datacatalogencryptionsettings-connectionpasswordencryption
         */
        readonly connectionPasswordEncryption?: CfnDataCatalogEncryptionSettings.ConnectionPasswordEncryptionProperty | cdk.IResolvable;
        /**
         * Specifies the encryption-at-rest configuration for the Data Catalog.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-datacatalogencryptionsettings-datacatalogencryptionsettings.html#cfn-glue-datacatalogencryptionsettings-datacatalogencryptionsettings-encryptionatrest
         */
        readonly encryptionAtRest?: CfnDataCatalogEncryptionSettings.EncryptionAtRestProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DataCatalogEncryptionSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `DataCatalogEncryptionSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataCatalogEncryptionSettings_DataCatalogEncryptionSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('connectionPasswordEncryption', CfnDataCatalogEncryptionSettings_ConnectionPasswordEncryptionPropertyValidator)(properties.connectionPasswordEncryption));
    errors.collect(cdk.propertyValidator('encryptionAtRest', CfnDataCatalogEncryptionSettings_EncryptionAtRestPropertyValidator)(properties.encryptionAtRest));
    return errors.wrap('supplied properties not correct for "DataCatalogEncryptionSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::DataCatalogEncryptionSettings.DataCatalogEncryptionSettings` resource
 *
 * @param properties - the TypeScript properties of a `DataCatalogEncryptionSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::DataCatalogEncryptionSettings.DataCatalogEncryptionSettings` resource.
 */
// @ts-ignore TS6133
function cfnDataCatalogEncryptionSettingsDataCatalogEncryptionSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataCatalogEncryptionSettings_DataCatalogEncryptionSettingsPropertyValidator(properties).assertSuccess();
    return {
        ConnectionPasswordEncryption: cfnDataCatalogEncryptionSettingsConnectionPasswordEncryptionPropertyToCloudFormation(properties.connectionPasswordEncryption),
        EncryptionAtRest: cfnDataCatalogEncryptionSettingsEncryptionAtRestPropertyToCloudFormation(properties.encryptionAtRest),
    };
}

// @ts-ignore TS6133
function CfnDataCatalogEncryptionSettingsDataCatalogEncryptionSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataCatalogEncryptionSettings.DataCatalogEncryptionSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataCatalogEncryptionSettings.DataCatalogEncryptionSettingsProperty>();
    ret.addPropertyResult('connectionPasswordEncryption', 'ConnectionPasswordEncryption', properties.ConnectionPasswordEncryption != null ? CfnDataCatalogEncryptionSettingsConnectionPasswordEncryptionPropertyFromCloudFormation(properties.ConnectionPasswordEncryption) : undefined);
    ret.addPropertyResult('encryptionAtRest', 'EncryptionAtRest', properties.EncryptionAtRest != null ? CfnDataCatalogEncryptionSettingsEncryptionAtRestPropertyFromCloudFormation(properties.EncryptionAtRest) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDataCatalogEncryptionSettings {
    /**
     * Specifies the encryption-at-rest configuration for the Data Catalog.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-datacatalogencryptionsettings-encryptionatrest.html
     */
    export interface EncryptionAtRestProperty {
        /**
         * The encryption-at-rest mode for encrypting Data Catalog data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-datacatalogencryptionsettings-encryptionatrest.html#cfn-glue-datacatalogencryptionsettings-encryptionatrest-catalogencryptionmode
         */
        readonly catalogEncryptionMode?: string;
        /**
         * The ID of the AWS KMS key to use for encryption at rest.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-datacatalogencryptionsettings-encryptionatrest.html#cfn-glue-datacatalogencryptionsettings-encryptionatrest-sseawskmskeyid
         */
        readonly sseAwsKmsKeyId?: string;
    }
}

/**
 * Determine whether the given properties match those of a `EncryptionAtRestProperty`
 *
 * @param properties - the TypeScript properties of a `EncryptionAtRestProperty`
 *
 * @returns the result of the validation.
 */
function CfnDataCatalogEncryptionSettings_EncryptionAtRestPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogEncryptionMode', cdk.validateString)(properties.catalogEncryptionMode));
    errors.collect(cdk.propertyValidator('sseAwsKmsKeyId', cdk.validateString)(properties.sseAwsKmsKeyId));
    return errors.wrap('supplied properties not correct for "EncryptionAtRestProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::DataCatalogEncryptionSettings.EncryptionAtRest` resource
 *
 * @param properties - the TypeScript properties of a `EncryptionAtRestProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::DataCatalogEncryptionSettings.EncryptionAtRest` resource.
 */
// @ts-ignore TS6133
function cfnDataCatalogEncryptionSettingsEncryptionAtRestPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDataCatalogEncryptionSettings_EncryptionAtRestPropertyValidator(properties).assertSuccess();
    return {
        CatalogEncryptionMode: cdk.stringToCloudFormation(properties.catalogEncryptionMode),
        SseAwsKmsKeyId: cdk.stringToCloudFormation(properties.sseAwsKmsKeyId),
    };
}

// @ts-ignore TS6133
function CfnDataCatalogEncryptionSettingsEncryptionAtRestPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDataCatalogEncryptionSettings.EncryptionAtRestProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDataCatalogEncryptionSettings.EncryptionAtRestProperty>();
    ret.addPropertyResult('catalogEncryptionMode', 'CatalogEncryptionMode', properties.CatalogEncryptionMode != null ? cfn_parse.FromCloudFormation.getString(properties.CatalogEncryptionMode) : undefined);
    ret.addPropertyResult('sseAwsKmsKeyId', 'SseAwsKmsKeyId', properties.SseAwsKmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.SseAwsKmsKeyId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDatabase`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-database.html
 */
export interface CfnDatabaseProps {

    /**
     * The AWS account ID for the account in which to create the catalog object.
     *
     * > To specify the account ID, you can use the `Ref` intrinsic function with the `AWS::AccountId` pseudo parameter. For example: `!Ref AWS::AccountId`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-database.html#cfn-glue-database-catalogid
     */
    readonly catalogId: string;

    /**
     * The metadata for the database.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-database.html#cfn-glue-database-databaseinput
     */
    readonly databaseInput: CfnDatabase.DatabaseInputProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnDatabaseProps`
 *
 * @param properties - the TypeScript properties of a `CfnDatabaseProps`
 *
 * @returns the result of the validation.
 */
function CfnDatabasePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.requiredValidator)(properties.catalogId));
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('databaseInput', cdk.requiredValidator)(properties.databaseInput));
    errors.collect(cdk.propertyValidator('databaseInput', CfnDatabase_DatabaseInputPropertyValidator)(properties.databaseInput));
    return errors.wrap('supplied properties not correct for "CfnDatabaseProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Database` resource
 *
 * @param properties - the TypeScript properties of a `CfnDatabaseProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Database` resource.
 */
// @ts-ignore TS6133
function cfnDatabasePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDatabasePropsValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        DatabaseInput: cfnDatabaseDatabaseInputPropertyToCloudFormation(properties.databaseInput),
    };
}

// @ts-ignore TS6133
function CfnDatabasePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDatabaseProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDatabaseProps>();
    ret.addPropertyResult('catalogId', 'CatalogId', cfn_parse.FromCloudFormation.getString(properties.CatalogId));
    ret.addPropertyResult('databaseInput', 'DatabaseInput', CfnDatabaseDatabaseInputPropertyFromCloudFormation(properties.DatabaseInput));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::Database`
 *
 * The `AWS::Glue::Database` resource specifies a logical grouping of tables in AWS Glue . For more information, see [Defining a Database in Your Data Catalog](https://docs.aws.amazon.com/glue/latest/dg/define-database.html) and [Database Structure](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-databases.html#aws-glue-api-catalog-databases-Database) in the *AWS Glue Developer Guide* .
 *
 * @cloudformationResource AWS::Glue::Database
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-database.html
 */
export class CfnDatabase extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::Database";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDatabase {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDatabasePropsFromCloudFormation(resourceProperties);
        const ret = new CfnDatabase(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The AWS account ID for the account in which to create the catalog object.
     *
     * > To specify the account ID, you can use the `Ref` intrinsic function with the `AWS::AccountId` pseudo parameter. For example: `!Ref AWS::AccountId`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-database.html#cfn-glue-database-catalogid
     */
    public catalogId: string;

    /**
     * The metadata for the database.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-database.html#cfn-glue-database-databaseinput
     */
    public databaseInput: CfnDatabase.DatabaseInputProperty | cdk.IResolvable;

    /**
     * Create a new `AWS::Glue::Database`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDatabaseProps) {
        super(scope, id, { type: CfnDatabase.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'catalogId', this);
        cdk.requireProperty(props, 'databaseInput', this);

        this.catalogId = props.catalogId;
        this.databaseInput = props.databaseInput;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDatabase.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            catalogId: this.catalogId,
            databaseInput: this.databaseInput,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDatabasePropsToCloudFormation(props);
    }
}

export namespace CfnDatabase {
    /**
     * The AWS Lake Formation principal.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-datalakeprincipal.html
     */
    export interface DataLakePrincipalProperty {
        /**
         * An identifier for the AWS Lake Formation principal.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-datalakeprincipal.html#cfn-glue-database-datalakeprincipal-datalakeprincipalidentifier
         */
        readonly dataLakePrincipalIdentifier?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DataLakePrincipalProperty`
 *
 * @param properties - the TypeScript properties of a `DataLakePrincipalProperty`
 *
 * @returns the result of the validation.
 */
function CfnDatabase_DataLakePrincipalPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataLakePrincipalIdentifier', cdk.validateString)(properties.dataLakePrincipalIdentifier));
    return errors.wrap('supplied properties not correct for "DataLakePrincipalProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Database.DataLakePrincipal` resource
 *
 * @param properties - the TypeScript properties of a `DataLakePrincipalProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Database.DataLakePrincipal` resource.
 */
// @ts-ignore TS6133
function cfnDatabaseDataLakePrincipalPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDatabase_DataLakePrincipalPropertyValidator(properties).assertSuccess();
    return {
        DataLakePrincipalIdentifier: cdk.stringToCloudFormation(properties.dataLakePrincipalIdentifier),
    };
}

// @ts-ignore TS6133
function CfnDatabaseDataLakePrincipalPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDatabase.DataLakePrincipalProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDatabase.DataLakePrincipalProperty>();
    ret.addPropertyResult('dataLakePrincipalIdentifier', 'DataLakePrincipalIdentifier', properties.DataLakePrincipalIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.DataLakePrincipalIdentifier) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDatabase {
    /**
     * A structure that describes a target database for resource linking.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-databaseidentifier.html
     */
    export interface DatabaseIdentifierProperty {
        /**
         * The ID of the Data Catalog in which the database resides.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-databaseidentifier.html#cfn-glue-database-databaseidentifier-catalogid
         */
        readonly catalogId?: string;
        /**
         * The name of the catalog database.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-databaseidentifier.html#cfn-glue-database-databaseidentifier-databasename
         */
        readonly databaseName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DatabaseIdentifierProperty`
 *
 * @param properties - the TypeScript properties of a `DatabaseIdentifierProperty`
 *
 * @returns the result of the validation.
 */
function CfnDatabase_DatabaseIdentifierPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    return errors.wrap('supplied properties not correct for "DatabaseIdentifierProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Database.DatabaseIdentifier` resource
 *
 * @param properties - the TypeScript properties of a `DatabaseIdentifierProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Database.DatabaseIdentifier` resource.
 */
// @ts-ignore TS6133
function cfnDatabaseDatabaseIdentifierPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDatabase_DatabaseIdentifierPropertyValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
    };
}

// @ts-ignore TS6133
function CfnDatabaseDatabaseIdentifierPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDatabase.DatabaseIdentifierProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDatabase.DatabaseIdentifierProperty>();
    ret.addPropertyResult('catalogId', 'CatalogId', properties.CatalogId != null ? cfn_parse.FromCloudFormation.getString(properties.CatalogId) : undefined);
    ret.addPropertyResult('databaseName', 'DatabaseName', properties.DatabaseName != null ? cfn_parse.FromCloudFormation.getString(properties.DatabaseName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDatabase {
    /**
     * The structure used to create or update a database.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-databaseinput.html
     */
    export interface DatabaseInputProperty {
        /**
         * Creates a set of default permissions on the table for principals.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-databaseinput.html#cfn-glue-database-databaseinput-createtabledefaultpermissions
         */
        readonly createTableDefaultPermissions?: Array<CfnDatabase.PrincipalPrivilegesProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * A description of the database.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-databaseinput.html#cfn-glue-database-databaseinput-description
         */
        readonly description?: string;
        /**
         * The location of the database (for example, an HDFS path).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-databaseinput.html#cfn-glue-database-databaseinput-locationuri
         */
        readonly locationUri?: string;
        /**
         * The name of the database. For Hive compatibility, this is folded to lowercase when it is stored.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-databaseinput.html#cfn-glue-database-databaseinput-name
         */
        readonly name?: string;
        /**
         * These key-value pairs define parameters and properties of the database.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-databaseinput.html#cfn-glue-database-databaseinput-parameters
         */
        readonly parameters?: any | cdk.IResolvable;
        /**
         * A `DatabaseIdentifier` structure that describes a target database for resource linking.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-databaseinput.html#cfn-glue-database-databaseinput-targetdatabase
         */
        readonly targetDatabase?: CfnDatabase.DatabaseIdentifierProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `DatabaseInputProperty`
 *
 * @param properties - the TypeScript properties of a `DatabaseInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnDatabase_DatabaseInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('createTableDefaultPermissions', cdk.listValidator(CfnDatabase_PrincipalPrivilegesPropertyValidator))(properties.createTableDefaultPermissions));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('locationUri', cdk.validateString)(properties.locationUri));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('parameters', cdk.validateObject)(properties.parameters));
    errors.collect(cdk.propertyValidator('targetDatabase', CfnDatabase_DatabaseIdentifierPropertyValidator)(properties.targetDatabase));
    return errors.wrap('supplied properties not correct for "DatabaseInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Database.DatabaseInput` resource
 *
 * @param properties - the TypeScript properties of a `DatabaseInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Database.DatabaseInput` resource.
 */
// @ts-ignore TS6133
function cfnDatabaseDatabaseInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDatabase_DatabaseInputPropertyValidator(properties).assertSuccess();
    return {
        CreateTableDefaultPermissions: cdk.listMapper(cfnDatabasePrincipalPrivilegesPropertyToCloudFormation)(properties.createTableDefaultPermissions),
        Description: cdk.stringToCloudFormation(properties.description),
        LocationUri: cdk.stringToCloudFormation(properties.locationUri),
        Name: cdk.stringToCloudFormation(properties.name),
        Parameters: cdk.objectToCloudFormation(properties.parameters),
        TargetDatabase: cfnDatabaseDatabaseIdentifierPropertyToCloudFormation(properties.targetDatabase),
    };
}

// @ts-ignore TS6133
function CfnDatabaseDatabaseInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDatabase.DatabaseInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDatabase.DatabaseInputProperty>();
    ret.addPropertyResult('createTableDefaultPermissions', 'CreateTableDefaultPermissions', properties.CreateTableDefaultPermissions != null ? cfn_parse.FromCloudFormation.getArray(CfnDatabasePrincipalPrivilegesPropertyFromCloudFormation)(properties.CreateTableDefaultPermissions) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('locationUri', 'LocationUri', properties.LocationUri != null ? cfn_parse.FromCloudFormation.getString(properties.LocationUri) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? cfn_parse.FromCloudFormation.getAny(properties.Parameters) : undefined);
    ret.addPropertyResult('targetDatabase', 'TargetDatabase', properties.TargetDatabase != null ? CfnDatabaseDatabaseIdentifierPropertyFromCloudFormation(properties.TargetDatabase) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDatabase {
    /**
     * the permissions granted to a principal
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-principalprivileges.html
     */
    export interface PrincipalPrivilegesProperty {
        /**
         * The permissions that are granted to the principal.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-principalprivileges.html#cfn-glue-database-principalprivileges-permissions
         */
        readonly permissions?: string[];
        /**
         * The principal who is granted permissions.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-database-principalprivileges.html#cfn-glue-database-principalprivileges-principal
         */
        readonly principal?: CfnDatabase.DataLakePrincipalProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `PrincipalPrivilegesProperty`
 *
 * @param properties - the TypeScript properties of a `PrincipalPrivilegesProperty`
 *
 * @returns the result of the validation.
 */
function CfnDatabase_PrincipalPrivilegesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('permissions', cdk.listValidator(cdk.validateString))(properties.permissions));
    errors.collect(cdk.propertyValidator('principal', CfnDatabase_DataLakePrincipalPropertyValidator)(properties.principal));
    return errors.wrap('supplied properties not correct for "PrincipalPrivilegesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Database.PrincipalPrivileges` resource
 *
 * @param properties - the TypeScript properties of a `PrincipalPrivilegesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Database.PrincipalPrivileges` resource.
 */
// @ts-ignore TS6133
function cfnDatabasePrincipalPrivilegesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDatabase_PrincipalPrivilegesPropertyValidator(properties).assertSuccess();
    return {
        Permissions: cdk.listMapper(cdk.stringToCloudFormation)(properties.permissions),
        Principal: cfnDatabaseDataLakePrincipalPropertyToCloudFormation(properties.principal),
    };
}

// @ts-ignore TS6133
function CfnDatabasePrincipalPrivilegesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDatabase.PrincipalPrivilegesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDatabase.PrincipalPrivilegesProperty>();
    ret.addPropertyResult('permissions', 'Permissions', properties.Permissions != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Permissions) : undefined);
    ret.addPropertyResult('principal', 'Principal', properties.Principal != null ? CfnDatabaseDataLakePrincipalPropertyFromCloudFormation(properties.Principal) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDevEndpoint`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html
 */
export interface CfnDevEndpointProps {

    /**
     * The Amazon Resource Name (ARN) of the IAM role used in this `DevEndpoint` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-rolearn
     */
    readonly roleArn: string;

    /**
     * A map of arguments used to configure the `DevEndpoint` .
     *
     * Valid arguments are:
     *
     * - `"--enable-glue-datacatalog": ""`
     * - `"GLUE_PYTHON_VERSION": "3"`
     * - `"GLUE_PYTHON_VERSION": "2"`
     *
     * You can specify a version of Python support for development endpoints by using the `Arguments` parameter in the `CreateDevEndpoint` or `UpdateDevEndpoint` APIs. If no arguments are provided, the version defaults to Python 2.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-arguments
     */
    readonly arguments?: any | cdk.IResolvable;

    /**
     * The name of the `DevEndpoint` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-endpointname
     */
    readonly endpointName?: string;

    /**
     * The path to one or more Java `.jar` files in an S3 bucket that should be loaded in your `DevEndpoint` .
     *
     * > You can only use pure Java/Scala libraries with a `DevEndpoint` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-extrajarss3path
     */
    readonly extraJarsS3Path?: string;

    /**
     * The paths to one or more Python libraries in an Amazon S3 bucket that should be loaded in your `DevEndpoint` . Multiple values must be complete paths separated by a comma.
     *
     * > You can only use pure Python libraries with a `DevEndpoint` . Libraries that rely on C extensions, such as the [pandas](https://docs.aws.amazon.com/http://pandas.pydata.org/) Python data analysis library, are not currently supported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-extrapythonlibss3path
     */
    readonly extraPythonLibsS3Path?: string;

    /**
     * The AWS Glue version determines the versions of Apache Spark and Python that AWS Glue supports. The Python version indicates the version supported for running your ETL scripts on development endpoints.
     *
     * For more information about the available AWS Glue versions and corresponding Spark and Python versions, see [Glue version](https://docs.aws.amazon.com/glue/latest/dg/add-job.html) in the developer guide.
     *
     * Development endpoints that are created without specifying a Glue version default to Glue 0.9.
     *
     * You can specify a version of Python support for development endpoints by using the `Arguments` parameter in the `CreateDevEndpoint` or `UpdateDevEndpoint` APIs. If no arguments are provided, the version defaults to Python 2.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-glueversion
     */
    readonly glueVersion?: string;

    /**
     * The number of AWS Glue Data Processing Units (DPUs) allocated to this `DevEndpoint` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-numberofnodes
     */
    readonly numberOfNodes?: number;

    /**
     * The number of workers of a defined `workerType` that are allocated to the development endpoint.
     *
     * The maximum number of workers you can define are 299 for `G.1X` , and 149 for `G.2X` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-numberofworkers
     */
    readonly numberOfWorkers?: number;

    /**
     * The public key to be used by this `DevEndpoint` for authentication. This attribute is provided for backward compatibility because the recommended attribute to use is public keys.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-publickey
     */
    readonly publicKey?: string;

    /**
     * A list of public keys to be used by the `DevEndpoints` for authentication. Using this attribute is preferred over a single public key because the public keys allow you to have a different private key per client.
     *
     * > If you previously created an endpoint with a public key, you must remove that key to be able to set a list of public keys. Call the `UpdateDevEndpoint` API operation with the public key content in the `deletePublicKeys` attribute, and the list of new keys in the `addPublicKeys` attribute.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-publickeys
     */
    readonly publicKeys?: string[];

    /**
     * The name of the `SecurityConfiguration` structure to be used with this `DevEndpoint` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-securityconfiguration
     */
    readonly securityConfiguration?: string;

    /**
     * A list of security group identifiers used in this `DevEndpoint` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-securitygroupids
     */
    readonly securityGroupIds?: string[];

    /**
     * The subnet ID for this `DevEndpoint` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-subnetid
     */
    readonly subnetId?: string;

    /**
     * The tags to use with this DevEndpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-tags
     */
    readonly tags?: any;

    /**
     * The type of predefined worker that is allocated to the development endpoint. Accepts a value of Standard, G.1X, or G.2X.
     *
     * - For the `Standard` worker type, each worker provides 4 vCPU, 16 GB of memory and a 50GB disk, and 2 executors per worker.
     * - For the `G.1X` worker type, each worker maps to 1 DPU (4 vCPU, 16 GB of memory, 64 GB disk), and provides 1 executor per worker. We recommend this worker type for memory-intensive jobs.
     * - For the `G.2X` worker type, each worker maps to 2 DPU (8 vCPU, 32 GB of memory, 128 GB disk), and provides 1 executor per worker. We recommend this worker type for memory-intensive jobs.
     *
     * Known issue: when a development endpoint is created with the `G.2X` `WorkerType` configuration, the Spark drivers for the development endpoint will run on 4 vCPU, 16 GB of memory, and a 64 GB disk.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-workertype
     */
    readonly workerType?: string;
}

/**
 * Determine whether the given properties match those of a `CfnDevEndpointProps`
 *
 * @param properties - the TypeScript properties of a `CfnDevEndpointProps`
 *
 * @returns the result of the validation.
 */
function CfnDevEndpointPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('arguments', cdk.validateObject)(properties.arguments));
    errors.collect(cdk.propertyValidator('endpointName', cdk.validateString)(properties.endpointName));
    errors.collect(cdk.propertyValidator('extraJarsS3Path', cdk.validateString)(properties.extraJarsS3Path));
    errors.collect(cdk.propertyValidator('extraPythonLibsS3Path', cdk.validateString)(properties.extraPythonLibsS3Path));
    errors.collect(cdk.propertyValidator('glueVersion', cdk.validateString)(properties.glueVersion));
    errors.collect(cdk.propertyValidator('numberOfNodes', cdk.validateNumber)(properties.numberOfNodes));
    errors.collect(cdk.propertyValidator('numberOfWorkers', cdk.validateNumber)(properties.numberOfWorkers));
    errors.collect(cdk.propertyValidator('publicKey', cdk.validateString)(properties.publicKey));
    errors.collect(cdk.propertyValidator('publicKeys', cdk.listValidator(cdk.validateString))(properties.publicKeys));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('securityConfiguration', cdk.validateString)(properties.securityConfiguration));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('subnetId', cdk.validateString)(properties.subnetId));
    errors.collect(cdk.propertyValidator('tags', cdk.validateObject)(properties.tags));
    errors.collect(cdk.propertyValidator('workerType', cdk.validateString)(properties.workerType));
    return errors.wrap('supplied properties not correct for "CfnDevEndpointProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::DevEndpoint` resource
 *
 * @param properties - the TypeScript properties of a `CfnDevEndpointProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::DevEndpoint` resource.
 */
// @ts-ignore TS6133
function cfnDevEndpointPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDevEndpointPropsValidator(properties).assertSuccess();
    return {
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        Arguments: cdk.objectToCloudFormation(properties.arguments),
        EndpointName: cdk.stringToCloudFormation(properties.endpointName),
        ExtraJarsS3Path: cdk.stringToCloudFormation(properties.extraJarsS3Path),
        ExtraPythonLibsS3Path: cdk.stringToCloudFormation(properties.extraPythonLibsS3Path),
        GlueVersion: cdk.stringToCloudFormation(properties.glueVersion),
        NumberOfNodes: cdk.numberToCloudFormation(properties.numberOfNodes),
        NumberOfWorkers: cdk.numberToCloudFormation(properties.numberOfWorkers),
        PublicKey: cdk.stringToCloudFormation(properties.publicKey),
        PublicKeys: cdk.listMapper(cdk.stringToCloudFormation)(properties.publicKeys),
        SecurityConfiguration: cdk.stringToCloudFormation(properties.securityConfiguration),
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        SubnetId: cdk.stringToCloudFormation(properties.subnetId),
        Tags: cdk.objectToCloudFormation(properties.tags),
        WorkerType: cdk.stringToCloudFormation(properties.workerType),
    };
}

// @ts-ignore TS6133
function CfnDevEndpointPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDevEndpointProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDevEndpointProps>();
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('arguments', 'Arguments', properties.Arguments != null ? cfn_parse.FromCloudFormation.getAny(properties.Arguments) : undefined);
    ret.addPropertyResult('endpointName', 'EndpointName', properties.EndpointName != null ? cfn_parse.FromCloudFormation.getString(properties.EndpointName) : undefined);
    ret.addPropertyResult('extraJarsS3Path', 'ExtraJarsS3Path', properties.ExtraJarsS3Path != null ? cfn_parse.FromCloudFormation.getString(properties.ExtraJarsS3Path) : undefined);
    ret.addPropertyResult('extraPythonLibsS3Path', 'ExtraPythonLibsS3Path', properties.ExtraPythonLibsS3Path != null ? cfn_parse.FromCloudFormation.getString(properties.ExtraPythonLibsS3Path) : undefined);
    ret.addPropertyResult('glueVersion', 'GlueVersion', properties.GlueVersion != null ? cfn_parse.FromCloudFormation.getString(properties.GlueVersion) : undefined);
    ret.addPropertyResult('numberOfNodes', 'NumberOfNodes', properties.NumberOfNodes != null ? cfn_parse.FromCloudFormation.getNumber(properties.NumberOfNodes) : undefined);
    ret.addPropertyResult('numberOfWorkers', 'NumberOfWorkers', properties.NumberOfWorkers != null ? cfn_parse.FromCloudFormation.getNumber(properties.NumberOfWorkers) : undefined);
    ret.addPropertyResult('publicKey', 'PublicKey', properties.PublicKey != null ? cfn_parse.FromCloudFormation.getString(properties.PublicKey) : undefined);
    ret.addPropertyResult('publicKeys', 'PublicKeys', properties.PublicKeys != null ? cfn_parse.FromCloudFormation.getStringArray(properties.PublicKeys) : undefined);
    ret.addPropertyResult('securityConfiguration', 'SecurityConfiguration', properties.SecurityConfiguration != null ? cfn_parse.FromCloudFormation.getString(properties.SecurityConfiguration) : undefined);
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', properties.SecurityGroupIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds) : undefined);
    ret.addPropertyResult('subnetId', 'SubnetId', properties.SubnetId != null ? cfn_parse.FromCloudFormation.getString(properties.SubnetId) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getAny(properties.Tags) : undefined as any);
    ret.addPropertyResult('workerType', 'WorkerType', properties.WorkerType != null ? cfn_parse.FromCloudFormation.getString(properties.WorkerType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::DevEndpoint`
 *
 * The `AWS::Glue::DevEndpoint` resource specifies a development endpoint where a developer can remotely debug ETL scripts for AWS Glue . For more information, see [DevEndpoint Structure](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-jobs-dev-endpoint.html#aws-glue-api-jobs-dev-endpoint-DevEndpoint) in the AWS Glue Developer Guide.
 *
 * @cloudformationResource AWS::Glue::DevEndpoint
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html
 */
export class CfnDevEndpoint extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::DevEndpoint";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDevEndpoint {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDevEndpointPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDevEndpoint(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the IAM role used in this `DevEndpoint` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-rolearn
     */
    public roleArn: string;

    /**
     * A map of arguments used to configure the `DevEndpoint` .
     *
     * Valid arguments are:
     *
     * - `"--enable-glue-datacatalog": ""`
     * - `"GLUE_PYTHON_VERSION": "3"`
     * - `"GLUE_PYTHON_VERSION": "2"`
     *
     * You can specify a version of Python support for development endpoints by using the `Arguments` parameter in the `CreateDevEndpoint` or `UpdateDevEndpoint` APIs. If no arguments are provided, the version defaults to Python 2.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-arguments
     */
    public arguments: any | cdk.IResolvable | undefined;

    /**
     * The name of the `DevEndpoint` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-endpointname
     */
    public endpointName: string | undefined;

    /**
     * The path to one or more Java `.jar` files in an S3 bucket that should be loaded in your `DevEndpoint` .
     *
     * > You can only use pure Java/Scala libraries with a `DevEndpoint` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-extrajarss3path
     */
    public extraJarsS3Path: string | undefined;

    /**
     * The paths to one or more Python libraries in an Amazon S3 bucket that should be loaded in your `DevEndpoint` . Multiple values must be complete paths separated by a comma.
     *
     * > You can only use pure Python libraries with a `DevEndpoint` . Libraries that rely on C extensions, such as the [pandas](https://docs.aws.amazon.com/http://pandas.pydata.org/) Python data analysis library, are not currently supported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-extrapythonlibss3path
     */
    public extraPythonLibsS3Path: string | undefined;

    /**
     * The AWS Glue version determines the versions of Apache Spark and Python that AWS Glue supports. The Python version indicates the version supported for running your ETL scripts on development endpoints.
     *
     * For more information about the available AWS Glue versions and corresponding Spark and Python versions, see [Glue version](https://docs.aws.amazon.com/glue/latest/dg/add-job.html) in the developer guide.
     *
     * Development endpoints that are created without specifying a Glue version default to Glue 0.9.
     *
     * You can specify a version of Python support for development endpoints by using the `Arguments` parameter in the `CreateDevEndpoint` or `UpdateDevEndpoint` APIs. If no arguments are provided, the version defaults to Python 2.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-glueversion
     */
    public glueVersion: string | undefined;

    /**
     * The number of AWS Glue Data Processing Units (DPUs) allocated to this `DevEndpoint` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-numberofnodes
     */
    public numberOfNodes: number | undefined;

    /**
     * The number of workers of a defined `workerType` that are allocated to the development endpoint.
     *
     * The maximum number of workers you can define are 299 for `G.1X` , and 149 for `G.2X` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-numberofworkers
     */
    public numberOfWorkers: number | undefined;

    /**
     * The public key to be used by this `DevEndpoint` for authentication. This attribute is provided for backward compatibility because the recommended attribute to use is public keys.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-publickey
     */
    public publicKey: string | undefined;

    /**
     * A list of public keys to be used by the `DevEndpoints` for authentication. Using this attribute is preferred over a single public key because the public keys allow you to have a different private key per client.
     *
     * > If you previously created an endpoint with a public key, you must remove that key to be able to set a list of public keys. Call the `UpdateDevEndpoint` API operation with the public key content in the `deletePublicKeys` attribute, and the list of new keys in the `addPublicKeys` attribute.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-publickeys
     */
    public publicKeys: string[] | undefined;

    /**
     * The name of the `SecurityConfiguration` structure to be used with this `DevEndpoint` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-securityconfiguration
     */
    public securityConfiguration: string | undefined;

    /**
     * A list of security group identifiers used in this `DevEndpoint` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-securitygroupids
     */
    public securityGroupIds: string[] | undefined;

    /**
     * The subnet ID for this `DevEndpoint` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-subnetid
     */
    public subnetId: string | undefined;

    /**
     * The tags to use with this DevEndpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The type of predefined worker that is allocated to the development endpoint. Accepts a value of Standard, G.1X, or G.2X.
     *
     * - For the `Standard` worker type, each worker provides 4 vCPU, 16 GB of memory and a 50GB disk, and 2 executors per worker.
     * - For the `G.1X` worker type, each worker maps to 1 DPU (4 vCPU, 16 GB of memory, 64 GB disk), and provides 1 executor per worker. We recommend this worker type for memory-intensive jobs.
     * - For the `G.2X` worker type, each worker maps to 2 DPU (8 vCPU, 32 GB of memory, 128 GB disk), and provides 1 executor per worker. We recommend this worker type for memory-intensive jobs.
     *
     * Known issue: when a development endpoint is created with the `G.2X` `WorkerType` configuration, the Spark drivers for the development endpoint will run on 4 vCPU, 16 GB of memory, and a 64 GB disk.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-devendpoint.html#cfn-glue-devendpoint-workertype
     */
    public workerType: string | undefined;

    /**
     * Create a new `AWS::Glue::DevEndpoint`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDevEndpointProps) {
        super(scope, id, { type: CfnDevEndpoint.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'roleArn', this);

        this.roleArn = props.roleArn;
        this.arguments = props.arguments;
        this.endpointName = props.endpointName;
        this.extraJarsS3Path = props.extraJarsS3Path;
        this.extraPythonLibsS3Path = props.extraPythonLibsS3Path;
        this.glueVersion = props.glueVersion;
        this.numberOfNodes = props.numberOfNodes;
        this.numberOfWorkers = props.numberOfWorkers;
        this.publicKey = props.publicKey;
        this.publicKeys = props.publicKeys;
        this.securityConfiguration = props.securityConfiguration;
        this.securityGroupIds = props.securityGroupIds;
        this.subnetId = props.subnetId;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::Glue::DevEndpoint", props.tags, { tagPropertyName: 'tags' });
        this.workerType = props.workerType;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDevEndpoint.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            roleArn: this.roleArn,
            arguments: this.arguments,
            endpointName: this.endpointName,
            extraJarsS3Path: this.extraJarsS3Path,
            extraPythonLibsS3Path: this.extraPythonLibsS3Path,
            glueVersion: this.glueVersion,
            numberOfNodes: this.numberOfNodes,
            numberOfWorkers: this.numberOfWorkers,
            publicKey: this.publicKey,
            publicKeys: this.publicKeys,
            securityConfiguration: this.securityConfiguration,
            securityGroupIds: this.securityGroupIds,
            subnetId: this.subnetId,
            tags: this.tags.renderTags(),
            workerType: this.workerType,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDevEndpointPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnJob`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html
 */
export interface CfnJobProps {

    /**
     * The code that executes a job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-command
     */
    readonly command: CfnJob.JobCommandProperty | cdk.IResolvable;

    /**
     * The name or Amazon Resource Name (ARN) of the IAM role associated with this job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-role
     */
    readonly role: string;

    /**
     * The number of capacity units that are allocated to this job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-allocatedcapacity
     */
    readonly allocatedCapacity?: number;

    /**
     * The connections used for this job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-connections
     */
    readonly connections?: CfnJob.ConnectionsListProperty | cdk.IResolvable;

    /**
     * The default arguments for this job, specified as name-value pairs.
     *
     * You can specify arguments here that your own job-execution script consumes, in addition to arguments that AWS Glue itself consumes.
     *
     * For information about how to specify and consume your own job arguments, see [Calling AWS Glue APIs in Python](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-python-calling.html) in the *AWS Glue Developer Guide* .
     *
     * For information about the key-value pairs that AWS Glue consumes to set up your job, see [Special Parameters Used by AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-glue-arguments.html) in the *AWS Glue Developer Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-defaultarguments
     */
    readonly defaultArguments?: any | cdk.IResolvable;

    /**
     * A description of the job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-description
     */
    readonly description?: string;

    /**
     * The maximum number of concurrent runs that are allowed for this job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-executionproperty
     */
    readonly executionProperty?: CfnJob.ExecutionPropertyProperty | cdk.IResolvable;

    /**
     * Glue version determines the versions of Apache Spark and Python that AWS Glue supports. The Python version indicates the version supported for jobs of type Spark.
     *
     * For more information about the available AWS Glue versions and corresponding Spark and Python versions, see [Glue version](https://docs.aws.amazon.com/glue/latest/dg/add-job.html) in the developer guide.
     *
     * Jobs that are created without specifying a Glue version default to Glue 0.9.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-glueversion
     */
    readonly glueVersion?: string;

    /**
     * This field is reserved for future use.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-loguri
     */
    readonly logUri?: string;

    /**
     * The number of AWS Glue data processing units (DPUs) that can be allocated when this job runs. A DPU is a relative measure of processing power that consists of 4 vCPUs of compute capacity and 16 GB of memory.
     *
     * Do not set `Max Capacity` if using `WorkerType` and `NumberOfWorkers` .
     *
     * The value that can be allocated for `MaxCapacity` depends on whether you are running a Python shell job or an Apache Spark ETL job:
     *
     * - When you specify a Python shell job ( `JobCommand.Name` ="pythonshell"), you can allocate either 0.0625 or 1 DPU. The default is 0.0625 DPU.
     * - When you specify an Apache Spark ETL job ( `JobCommand.Name` ="glueetl"), you can allocate from 2 to 100 DPUs. The default is 10 DPUs. This job type cannot have a fractional DPU allocation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-maxcapacity
     */
    readonly maxCapacity?: number;

    /**
     * The maximum number of times to retry this job after a JobRun fails.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-maxretries
     */
    readonly maxRetries?: number;

    /**
     * The name you assign to this job definition.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-name
     */
    readonly name?: string;

    /**
     * Specifies configuration properties of a notification.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-notificationproperty
     */
    readonly notificationProperty?: CfnJob.NotificationPropertyProperty | cdk.IResolvable;

    /**
     * The number of workers of a defined `workerType` that are allocated when a job runs.
     *
     * The maximum number of workers you can define are 299 for `G.1X` , and 149 for `G.2X` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-numberofworkers
     */
    readonly numberOfWorkers?: number;

    /**
     * The name of the `SecurityConfiguration` structure to be used with this job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-securityconfiguration
     */
    readonly securityConfiguration?: string;

    /**
     * The tags to use with this job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-tags
     */
    readonly tags?: any;

    /**
     * The job timeout in minutes. This is the maximum time that a job run can consume resources before it is terminated and enters TIMEOUT status. The default is 2,880 minutes (48 hours).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-timeout
     */
    readonly timeout?: number;

    /**
     * The type of predefined worker that is allocated when a job runs. Accepts a value of Standard, G.1X, or G.2X.
     *
     * - For the `Standard` worker type, each worker provides 4 vCPU, 16 GB of memory and a 50GB disk, and 2 executors per worker.
     * - For the `G.1X` worker type, each worker maps to 1 DPU (4 vCPU, 16 GB of memory, 64 GB disk), and provides 1 executor per worker. We recommend this worker type for memory-intensive jobs.
     * - For the `G.2X` worker type, each worker maps to 2 DPU (8 vCPU, 32 GB of memory, 128 GB disk), and provides 1 executor per worker. We recommend this worker type for memory-intensive jobs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-workertype
     */
    readonly workerType?: string;
}

/**
 * Determine whether the given properties match those of a `CfnJobProps`
 *
 * @param properties - the TypeScript properties of a `CfnJobProps`
 *
 * @returns the result of the validation.
 */
function CfnJobPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('allocatedCapacity', cdk.validateNumber)(properties.allocatedCapacity));
    errors.collect(cdk.propertyValidator('command', cdk.requiredValidator)(properties.command));
    errors.collect(cdk.propertyValidator('command', CfnJob_JobCommandPropertyValidator)(properties.command));
    errors.collect(cdk.propertyValidator('connections', CfnJob_ConnectionsListPropertyValidator)(properties.connections));
    errors.collect(cdk.propertyValidator('defaultArguments', cdk.validateObject)(properties.defaultArguments));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('executionProperty', CfnJob_ExecutionPropertyPropertyValidator)(properties.executionProperty));
    errors.collect(cdk.propertyValidator('glueVersion', cdk.validateString)(properties.glueVersion));
    errors.collect(cdk.propertyValidator('logUri', cdk.validateString)(properties.logUri));
    errors.collect(cdk.propertyValidator('maxCapacity', cdk.validateNumber)(properties.maxCapacity));
    errors.collect(cdk.propertyValidator('maxRetries', cdk.validateNumber)(properties.maxRetries));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('notificationProperty', CfnJob_NotificationPropertyPropertyValidator)(properties.notificationProperty));
    errors.collect(cdk.propertyValidator('numberOfWorkers', cdk.validateNumber)(properties.numberOfWorkers));
    errors.collect(cdk.propertyValidator('role', cdk.requiredValidator)(properties.role));
    errors.collect(cdk.propertyValidator('role', cdk.validateString)(properties.role));
    errors.collect(cdk.propertyValidator('securityConfiguration', cdk.validateString)(properties.securityConfiguration));
    errors.collect(cdk.propertyValidator('tags', cdk.validateObject)(properties.tags));
    errors.collect(cdk.propertyValidator('timeout', cdk.validateNumber)(properties.timeout));
    errors.collect(cdk.propertyValidator('workerType', cdk.validateString)(properties.workerType));
    return errors.wrap('supplied properties not correct for "CfnJobProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Job` resource
 *
 * @param properties - the TypeScript properties of a `CfnJobProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Job` resource.
 */
// @ts-ignore TS6133
function cfnJobPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJobPropsValidator(properties).assertSuccess();
    return {
        Command: cfnJobJobCommandPropertyToCloudFormation(properties.command),
        Role: cdk.stringToCloudFormation(properties.role),
        AllocatedCapacity: cdk.numberToCloudFormation(properties.allocatedCapacity),
        Connections: cfnJobConnectionsListPropertyToCloudFormation(properties.connections),
        DefaultArguments: cdk.objectToCloudFormation(properties.defaultArguments),
        Description: cdk.stringToCloudFormation(properties.description),
        ExecutionProperty: cfnJobExecutionPropertyPropertyToCloudFormation(properties.executionProperty),
        GlueVersion: cdk.stringToCloudFormation(properties.glueVersion),
        LogUri: cdk.stringToCloudFormation(properties.logUri),
        MaxCapacity: cdk.numberToCloudFormation(properties.maxCapacity),
        MaxRetries: cdk.numberToCloudFormation(properties.maxRetries),
        Name: cdk.stringToCloudFormation(properties.name),
        NotificationProperty: cfnJobNotificationPropertyPropertyToCloudFormation(properties.notificationProperty),
        NumberOfWorkers: cdk.numberToCloudFormation(properties.numberOfWorkers),
        SecurityConfiguration: cdk.stringToCloudFormation(properties.securityConfiguration),
        Tags: cdk.objectToCloudFormation(properties.tags),
        Timeout: cdk.numberToCloudFormation(properties.timeout),
        WorkerType: cdk.stringToCloudFormation(properties.workerType),
    };
}

// @ts-ignore TS6133
function CfnJobPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJobProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJobProps>();
    ret.addPropertyResult('command', 'Command', CfnJobJobCommandPropertyFromCloudFormation(properties.Command));
    ret.addPropertyResult('role', 'Role', cfn_parse.FromCloudFormation.getString(properties.Role));
    ret.addPropertyResult('allocatedCapacity', 'AllocatedCapacity', properties.AllocatedCapacity != null ? cfn_parse.FromCloudFormation.getNumber(properties.AllocatedCapacity) : undefined);
    ret.addPropertyResult('connections', 'Connections', properties.Connections != null ? CfnJobConnectionsListPropertyFromCloudFormation(properties.Connections) : undefined);
    ret.addPropertyResult('defaultArguments', 'DefaultArguments', properties.DefaultArguments != null ? cfn_parse.FromCloudFormation.getAny(properties.DefaultArguments) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('executionProperty', 'ExecutionProperty', properties.ExecutionProperty != null ? CfnJobExecutionPropertyPropertyFromCloudFormation(properties.ExecutionProperty) : undefined);
    ret.addPropertyResult('glueVersion', 'GlueVersion', properties.GlueVersion != null ? cfn_parse.FromCloudFormation.getString(properties.GlueVersion) : undefined);
    ret.addPropertyResult('logUri', 'LogUri', properties.LogUri != null ? cfn_parse.FromCloudFormation.getString(properties.LogUri) : undefined);
    ret.addPropertyResult('maxCapacity', 'MaxCapacity', properties.MaxCapacity != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxCapacity) : undefined);
    ret.addPropertyResult('maxRetries', 'MaxRetries', properties.MaxRetries != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxRetries) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('notificationProperty', 'NotificationProperty', properties.NotificationProperty != null ? CfnJobNotificationPropertyPropertyFromCloudFormation(properties.NotificationProperty) : undefined);
    ret.addPropertyResult('numberOfWorkers', 'NumberOfWorkers', properties.NumberOfWorkers != null ? cfn_parse.FromCloudFormation.getNumber(properties.NumberOfWorkers) : undefined);
    ret.addPropertyResult('securityConfiguration', 'SecurityConfiguration', properties.SecurityConfiguration != null ? cfn_parse.FromCloudFormation.getString(properties.SecurityConfiguration) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getAny(properties.Tags) : undefined as any);
    ret.addPropertyResult('timeout', 'Timeout', properties.Timeout != null ? cfn_parse.FromCloudFormation.getNumber(properties.Timeout) : undefined);
    ret.addPropertyResult('workerType', 'WorkerType', properties.WorkerType != null ? cfn_parse.FromCloudFormation.getString(properties.WorkerType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::Job`
 *
 * The `AWS::Glue::Job` resource specifies an AWS Glue job in the data catalog. For more information, see [Adding Jobs in AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/add-job.html) and [Job Structure](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-jobs-job.html#aws-glue-api-jobs-job-Job) in the *AWS Glue Developer Guide.*
 *
 * @cloudformationResource AWS::Glue::Job
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html
 */
export class CfnJob extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::Job";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnJob {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnJobPropsFromCloudFormation(resourceProperties);
        const ret = new CfnJob(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The code that executes a job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-command
     */
    public command: CfnJob.JobCommandProperty | cdk.IResolvable;

    /**
     * The name or Amazon Resource Name (ARN) of the IAM role associated with this job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-role
     */
    public role: string;

    /**
     * The number of capacity units that are allocated to this job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-allocatedcapacity
     */
    public allocatedCapacity: number | undefined;

    /**
     * The connections used for this job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-connections
     */
    public connections: CfnJob.ConnectionsListProperty | cdk.IResolvable | undefined;

    /**
     * The default arguments for this job, specified as name-value pairs.
     *
     * You can specify arguments here that your own job-execution script consumes, in addition to arguments that AWS Glue itself consumes.
     *
     * For information about how to specify and consume your own job arguments, see [Calling AWS Glue APIs in Python](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-python-calling.html) in the *AWS Glue Developer Guide* .
     *
     * For information about the key-value pairs that AWS Glue consumes to set up your job, see [Special Parameters Used by AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-glue-arguments.html) in the *AWS Glue Developer Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-defaultarguments
     */
    public defaultArguments: any | cdk.IResolvable | undefined;

    /**
     * A description of the job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-description
     */
    public description: string | undefined;

    /**
     * The maximum number of concurrent runs that are allowed for this job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-executionproperty
     */
    public executionProperty: CfnJob.ExecutionPropertyProperty | cdk.IResolvable | undefined;

    /**
     * Glue version determines the versions of Apache Spark and Python that AWS Glue supports. The Python version indicates the version supported for jobs of type Spark.
     *
     * For more information about the available AWS Glue versions and corresponding Spark and Python versions, see [Glue version](https://docs.aws.amazon.com/glue/latest/dg/add-job.html) in the developer guide.
     *
     * Jobs that are created without specifying a Glue version default to Glue 0.9.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-glueversion
     */
    public glueVersion: string | undefined;

    /**
     * This field is reserved for future use.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-loguri
     */
    public logUri: string | undefined;

    /**
     * The number of AWS Glue data processing units (DPUs) that can be allocated when this job runs. A DPU is a relative measure of processing power that consists of 4 vCPUs of compute capacity and 16 GB of memory.
     *
     * Do not set `Max Capacity` if using `WorkerType` and `NumberOfWorkers` .
     *
     * The value that can be allocated for `MaxCapacity` depends on whether you are running a Python shell job or an Apache Spark ETL job:
     *
     * - When you specify a Python shell job ( `JobCommand.Name` ="pythonshell"), you can allocate either 0.0625 or 1 DPU. The default is 0.0625 DPU.
     * - When you specify an Apache Spark ETL job ( `JobCommand.Name` ="glueetl"), you can allocate from 2 to 100 DPUs. The default is 10 DPUs. This job type cannot have a fractional DPU allocation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-maxcapacity
     */
    public maxCapacity: number | undefined;

    /**
     * The maximum number of times to retry this job after a JobRun fails.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-maxretries
     */
    public maxRetries: number | undefined;

    /**
     * The name you assign to this job definition.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-name
     */
    public name: string | undefined;

    /**
     * Specifies configuration properties of a notification.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-notificationproperty
     */
    public notificationProperty: CfnJob.NotificationPropertyProperty | cdk.IResolvable | undefined;

    /**
     * The number of workers of a defined `workerType` that are allocated when a job runs.
     *
     * The maximum number of workers you can define are 299 for `G.1X` , and 149 for `G.2X` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-numberofworkers
     */
    public numberOfWorkers: number | undefined;

    /**
     * The name of the `SecurityConfiguration` structure to be used with this job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-securityconfiguration
     */
    public securityConfiguration: string | undefined;

    /**
     * The tags to use with this job.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The job timeout in minutes. This is the maximum time that a job run can consume resources before it is terminated and enters TIMEOUT status. The default is 2,880 minutes (48 hours).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-timeout
     */
    public timeout: number | undefined;

    /**
     * The type of predefined worker that is allocated when a job runs. Accepts a value of Standard, G.1X, or G.2X.
     *
     * - For the `Standard` worker type, each worker provides 4 vCPU, 16 GB of memory and a 50GB disk, and 2 executors per worker.
     * - For the `G.1X` worker type, each worker maps to 1 DPU (4 vCPU, 16 GB of memory, 64 GB disk), and provides 1 executor per worker. We recommend this worker type for memory-intensive jobs.
     * - For the `G.2X` worker type, each worker maps to 2 DPU (8 vCPU, 32 GB of memory, 128 GB disk), and provides 1 executor per worker. We recommend this worker type for memory-intensive jobs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-job.html#cfn-glue-job-workertype
     */
    public workerType: string | undefined;

    /**
     * Create a new `AWS::Glue::Job`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnJobProps) {
        super(scope, id, { type: CfnJob.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'command', this);
        cdk.requireProperty(props, 'role', this);

        this.command = props.command;
        this.role = props.role;
        this.allocatedCapacity = props.allocatedCapacity;
        this.connections = props.connections;
        this.defaultArguments = props.defaultArguments;
        this.description = props.description;
        this.executionProperty = props.executionProperty;
        this.glueVersion = props.glueVersion;
        this.logUri = props.logUri;
        this.maxCapacity = props.maxCapacity;
        this.maxRetries = props.maxRetries;
        this.name = props.name;
        this.notificationProperty = props.notificationProperty;
        this.numberOfWorkers = props.numberOfWorkers;
        this.securityConfiguration = props.securityConfiguration;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::Glue::Job", props.tags, { tagPropertyName: 'tags' });
        this.timeout = props.timeout;
        this.workerType = props.workerType;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnJob.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            command: this.command,
            role: this.role,
            allocatedCapacity: this.allocatedCapacity,
            connections: this.connections,
            defaultArguments: this.defaultArguments,
            description: this.description,
            executionProperty: this.executionProperty,
            glueVersion: this.glueVersion,
            logUri: this.logUri,
            maxCapacity: this.maxCapacity,
            maxRetries: this.maxRetries,
            name: this.name,
            notificationProperty: this.notificationProperty,
            numberOfWorkers: this.numberOfWorkers,
            securityConfiguration: this.securityConfiguration,
            tags: this.tags.renderTags(),
            timeout: this.timeout,
            workerType: this.workerType,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnJobPropsToCloudFormation(props);
    }
}

export namespace CfnJob {
    /**
     * Specifies the connections used by a job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-job-connectionslist.html
     */
    export interface ConnectionsListProperty {
        /**
         * A list of connections used by the job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-job-connectionslist.html#cfn-glue-job-connectionslist-connections
         */
        readonly connections?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `ConnectionsListProperty`
 *
 * @param properties - the TypeScript properties of a `ConnectionsListProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_ConnectionsListPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('connections', cdk.listValidator(cdk.validateString))(properties.connections));
    return errors.wrap('supplied properties not correct for "ConnectionsListProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Job.ConnectionsList` resource
 *
 * @param properties - the TypeScript properties of a `ConnectionsListProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Job.ConnectionsList` resource.
 */
// @ts-ignore TS6133
function cfnJobConnectionsListPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_ConnectionsListPropertyValidator(properties).assertSuccess();
    return {
        Connections: cdk.listMapper(cdk.stringToCloudFormation)(properties.connections),
    };
}

// @ts-ignore TS6133
function CfnJobConnectionsListPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.ConnectionsListProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.ConnectionsListProperty>();
    ret.addPropertyResult('connections', 'Connections', properties.Connections != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Connections) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     * An execution property of a job.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-job-executionproperty.html
     */
    export interface ExecutionPropertyProperty {
        /**
         * The maximum number of concurrent runs allowed for the job. The default is 1. An error is returned when this threshold is reached. The maximum value you can specify is controlled by a service limit.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-job-executionproperty.html#cfn-glue-job-executionproperty-maxconcurrentruns
         */
        readonly maxConcurrentRuns?: number;
    }
}

/**
 * Determine whether the given properties match those of a `ExecutionPropertyProperty`
 *
 * @param properties - the TypeScript properties of a `ExecutionPropertyProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_ExecutionPropertyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('maxConcurrentRuns', cdk.validateNumber)(properties.maxConcurrentRuns));
    return errors.wrap('supplied properties not correct for "ExecutionPropertyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Job.ExecutionProperty` resource
 *
 * @param properties - the TypeScript properties of a `ExecutionPropertyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Job.ExecutionProperty` resource.
 */
// @ts-ignore TS6133
function cfnJobExecutionPropertyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_ExecutionPropertyPropertyValidator(properties).assertSuccess();
    return {
        MaxConcurrentRuns: cdk.numberToCloudFormation(properties.maxConcurrentRuns),
    };
}

// @ts-ignore TS6133
function CfnJobExecutionPropertyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.ExecutionPropertyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.ExecutionPropertyProperty>();
    ret.addPropertyResult('maxConcurrentRuns', 'MaxConcurrentRuns', properties.MaxConcurrentRuns != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxConcurrentRuns) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     * Specifies code executed when a job is run.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-job-jobcommand.html
     */
    export interface JobCommandProperty {
        /**
         * The name of the job command. For an Apache Spark ETL job, this must be `glueetl` . For a Python shell job, it must be `pythonshell` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-job-jobcommand.html#cfn-glue-job-jobcommand-name
         */
        readonly name?: string;
        /**
         * The Python version being used to execute a Python shell job. Allowed values are 2 or 3.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-job-jobcommand.html#cfn-glue-job-jobcommand-pythonversion
         */
        readonly pythonVersion?: string;
        /**
         * Specifies the Amazon Simple Storage Service (Amazon S3) path to a script that executes a job (required).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-job-jobcommand.html#cfn-glue-job-jobcommand-scriptlocation
         */
        readonly scriptLocation?: string;
    }
}

/**
 * Determine whether the given properties match those of a `JobCommandProperty`
 *
 * @param properties - the TypeScript properties of a `JobCommandProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_JobCommandPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('pythonVersion', cdk.validateString)(properties.pythonVersion));
    errors.collect(cdk.propertyValidator('scriptLocation', cdk.validateString)(properties.scriptLocation));
    return errors.wrap('supplied properties not correct for "JobCommandProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Job.JobCommand` resource
 *
 * @param properties - the TypeScript properties of a `JobCommandProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Job.JobCommand` resource.
 */
// @ts-ignore TS6133
function cfnJobJobCommandPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_JobCommandPropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        PythonVersion: cdk.stringToCloudFormation(properties.pythonVersion),
        ScriptLocation: cdk.stringToCloudFormation(properties.scriptLocation),
    };
}

// @ts-ignore TS6133
function CfnJobJobCommandPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.JobCommandProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.JobCommandProperty>();
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('pythonVersion', 'PythonVersion', properties.PythonVersion != null ? cfn_parse.FromCloudFormation.getString(properties.PythonVersion) : undefined);
    ret.addPropertyResult('scriptLocation', 'ScriptLocation', properties.ScriptLocation != null ? cfn_parse.FromCloudFormation.getString(properties.ScriptLocation) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnJob {
    /**
     * Specifies configuration properties of a notification.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-job-notificationproperty.html
     */
    export interface NotificationPropertyProperty {
        /**
         * After a job run starts, the number of minutes to wait before sending a job run delay notification.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-job-notificationproperty.html#cfn-glue-job-notificationproperty-notifydelayafter
         */
        readonly notifyDelayAfter?: number;
    }
}

/**
 * Determine whether the given properties match those of a `NotificationPropertyProperty`
 *
 * @param properties - the TypeScript properties of a `NotificationPropertyProperty`
 *
 * @returns the result of the validation.
 */
function CfnJob_NotificationPropertyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('notifyDelayAfter', cdk.validateNumber)(properties.notifyDelayAfter));
    return errors.wrap('supplied properties not correct for "NotificationPropertyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Job.NotificationProperty` resource
 *
 * @param properties - the TypeScript properties of a `NotificationPropertyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Job.NotificationProperty` resource.
 */
// @ts-ignore TS6133
function cfnJobNotificationPropertyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnJob_NotificationPropertyPropertyValidator(properties).assertSuccess();
    return {
        NotifyDelayAfter: cdk.numberToCloudFormation(properties.notifyDelayAfter),
    };
}

// @ts-ignore TS6133
function CfnJobNotificationPropertyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnJob.NotificationPropertyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnJob.NotificationPropertyProperty>();
    ret.addPropertyResult('notifyDelayAfter', 'NotifyDelayAfter', properties.NotifyDelayAfter != null ? cfn_parse.FromCloudFormation.getNumber(properties.NotifyDelayAfter) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnMLTransform`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html
 */
export interface CfnMLTransformProps {

    /**
     * A list of AWS Glue table definitions used by the transform.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-inputrecordtables
     */
    readonly inputRecordTables: CfnMLTransform.InputRecordTablesProperty | cdk.IResolvable;

    /**
     * The name or Amazon Resource Name (ARN) of the IAM role with the required permissions. The required permissions include both AWS Glue service role permissions to AWS Glue resources, and Amazon S3 permissions required by the transform.
     *
     * - This role needs AWS Glue service role permissions to allow access to resources in AWS Glue . See [Attach a Policy to IAM Users That Access AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/attach-policy-iam-user.html) .
     * - This role needs permission to your Amazon Simple Storage Service (Amazon S3) sources, targets, temporary directory, scripts, and any libraries used by the task run for this transform.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-role
     */
    readonly role: string;

    /**
     * The algorithm-specific parameters that are associated with the machine learning transform.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-transformparameters
     */
    readonly transformParameters: CfnMLTransform.TransformParametersProperty | cdk.IResolvable;

    /**
     * A user-defined, long-form description text for the machine learning transform.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-description
     */
    readonly description?: string;

    /**
     * This value determines which version of AWS Glue this machine learning transform is compatible with. Glue 1.0 is recommended for most customers. If the value is not set, the Glue compatibility defaults to Glue 0.9. For more information, see [AWS Glue Versions](https://docs.aws.amazon.com/glue/latest/dg/release-notes.html#release-notes-versions) in the developer guide.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-glueversion
     */
    readonly glueVersion?: string;

    /**
     * The number of AWS Glue data processing units (DPUs) that are allocated to task runs for this transform. You can allocate from 2 to 100 DPUs; the default is 10. A DPU is a relative measure of processing power that consists of 4 vCPUs of compute capacity and 16 GB of memory. For more information, see the [AWS Glue pricing page](https://docs.aws.amazon.com/glue/pricing/) .
     *
     * `MaxCapacity` is a mutually exclusive option with `NumberOfWorkers` and `WorkerType` .
     *
     * - If either `NumberOfWorkers` or `WorkerType` is set, then `MaxCapacity` cannot be set.
     * - If `MaxCapacity` is set then neither `NumberOfWorkers` or `WorkerType` can be set.
     * - If `WorkerType` is set, then `NumberOfWorkers` is required (and vice versa).
     * - `MaxCapacity` and `NumberOfWorkers` must both be at least 1.
     *
     * When the `WorkerType` field is set to a value other than `Standard` , the `MaxCapacity` field is set automatically and becomes read-only.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-maxcapacity
     */
    readonly maxCapacity?: number;

    /**
     * The maximum number of times to retry after an `MLTaskRun` of the machine learning transform fails.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-maxretries
     */
    readonly maxRetries?: number;

    /**
     * A user-defined name for the machine learning transform. Names are required to be unique. `Name` is optional:
     *
     * - If you supply `Name` , the stack cannot be repeatedly created.
     * - If `Name` is not provided, a randomly generated name will be used instead.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-name
     */
    readonly name?: string;

    /**
     * The number of workers of a defined `workerType` that are allocated when a task of the transform runs.
     *
     * If `WorkerType` is set, then `NumberOfWorkers` is required (and vice versa).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-numberofworkers
     */
    readonly numberOfWorkers?: number;

    /**
     * The tags to use with this machine learning transform. You may use tags to limit access to the machine learning transform. For more information about tags in AWS Glue , see [AWS Tags in AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/monitor-tags.html) in the developer guide.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-tags
     */
    readonly tags?: any;

    /**
     * The timeout in minutes of the machine learning transform.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-timeout
     */
    readonly timeout?: number;

    /**
     * The encryption-at-rest settings of the transform that apply to accessing user data. Machine learning
     * transforms can access user data encrypted in Amazon S3 using KMS.
     *
     * Additionally, imported labels and trained transforms can now be encrypted using a customer provided
     * KMS key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-transformencryption
     */
    readonly transformEncryption?: CfnMLTransform.TransformEncryptionProperty | cdk.IResolvable;

    /**
     * The type of predefined worker that is allocated when a task of this transform runs. Accepts a value of Standard, G.1X, or G.2X.
     *
     * - For the `Standard` worker type, each worker provides 4 vCPU, 16 GB of memory and a 50GB disk, and 2 executors per worker.
     * - For the `G.1X` worker type, each worker provides 4 vCPU, 16 GB of memory and a 64GB disk, and 1 executor per worker.
     * - For the `G.2X` worker type, each worker provides 8 vCPU, 32 GB of memory and a 128GB disk, and 1 executor per worker.
     *
     * `MaxCapacity` is a mutually exclusive option with `NumberOfWorkers` and `WorkerType` .
     *
     * - If either `NumberOfWorkers` or `WorkerType` is set, then `MaxCapacity` cannot be set.
     * - If `MaxCapacity` is set then neither `NumberOfWorkers` or `WorkerType` can be set.
     * - If `WorkerType` is set, then `NumberOfWorkers` is required (and vice versa).
     * - `MaxCapacity` and `NumberOfWorkers` must both be at least 1.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-workertype
     */
    readonly workerType?: string;
}

/**
 * Determine whether the given properties match those of a `CfnMLTransformProps`
 *
 * @param properties - the TypeScript properties of a `CfnMLTransformProps`
 *
 * @returns the result of the validation.
 */
function CfnMLTransformPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('glueVersion', cdk.validateString)(properties.glueVersion));
    errors.collect(cdk.propertyValidator('inputRecordTables', cdk.requiredValidator)(properties.inputRecordTables));
    errors.collect(cdk.propertyValidator('inputRecordTables', CfnMLTransform_InputRecordTablesPropertyValidator)(properties.inputRecordTables));
    errors.collect(cdk.propertyValidator('maxCapacity', cdk.validateNumber)(properties.maxCapacity));
    errors.collect(cdk.propertyValidator('maxRetries', cdk.validateNumber)(properties.maxRetries));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('numberOfWorkers', cdk.validateNumber)(properties.numberOfWorkers));
    errors.collect(cdk.propertyValidator('role', cdk.requiredValidator)(properties.role));
    errors.collect(cdk.propertyValidator('role', cdk.validateString)(properties.role));
    errors.collect(cdk.propertyValidator('tags', cdk.validateObject)(properties.tags));
    errors.collect(cdk.propertyValidator('timeout', cdk.validateNumber)(properties.timeout));
    errors.collect(cdk.propertyValidator('transformEncryption', CfnMLTransform_TransformEncryptionPropertyValidator)(properties.transformEncryption));
    errors.collect(cdk.propertyValidator('transformParameters', cdk.requiredValidator)(properties.transformParameters));
    errors.collect(cdk.propertyValidator('transformParameters', CfnMLTransform_TransformParametersPropertyValidator)(properties.transformParameters));
    errors.collect(cdk.propertyValidator('workerType', cdk.validateString)(properties.workerType));
    return errors.wrap('supplied properties not correct for "CfnMLTransformProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::MLTransform` resource
 *
 * @param properties - the TypeScript properties of a `CfnMLTransformProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::MLTransform` resource.
 */
// @ts-ignore TS6133
function cfnMLTransformPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMLTransformPropsValidator(properties).assertSuccess();
    return {
        InputRecordTables: cfnMLTransformInputRecordTablesPropertyToCloudFormation(properties.inputRecordTables),
        Role: cdk.stringToCloudFormation(properties.role),
        TransformParameters: cfnMLTransformTransformParametersPropertyToCloudFormation(properties.transformParameters),
        Description: cdk.stringToCloudFormation(properties.description),
        GlueVersion: cdk.stringToCloudFormation(properties.glueVersion),
        MaxCapacity: cdk.numberToCloudFormation(properties.maxCapacity),
        MaxRetries: cdk.numberToCloudFormation(properties.maxRetries),
        Name: cdk.stringToCloudFormation(properties.name),
        NumberOfWorkers: cdk.numberToCloudFormation(properties.numberOfWorkers),
        Tags: cdk.objectToCloudFormation(properties.tags),
        Timeout: cdk.numberToCloudFormation(properties.timeout),
        TransformEncryption: cfnMLTransformTransformEncryptionPropertyToCloudFormation(properties.transformEncryption),
        WorkerType: cdk.stringToCloudFormation(properties.workerType),
    };
}

// @ts-ignore TS6133
function CfnMLTransformPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMLTransformProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMLTransformProps>();
    ret.addPropertyResult('inputRecordTables', 'InputRecordTables', CfnMLTransformInputRecordTablesPropertyFromCloudFormation(properties.InputRecordTables));
    ret.addPropertyResult('role', 'Role', cfn_parse.FromCloudFormation.getString(properties.Role));
    ret.addPropertyResult('transformParameters', 'TransformParameters', CfnMLTransformTransformParametersPropertyFromCloudFormation(properties.TransformParameters));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('glueVersion', 'GlueVersion', properties.GlueVersion != null ? cfn_parse.FromCloudFormation.getString(properties.GlueVersion) : undefined);
    ret.addPropertyResult('maxCapacity', 'MaxCapacity', properties.MaxCapacity != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxCapacity) : undefined);
    ret.addPropertyResult('maxRetries', 'MaxRetries', properties.MaxRetries != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxRetries) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('numberOfWorkers', 'NumberOfWorkers', properties.NumberOfWorkers != null ? cfn_parse.FromCloudFormation.getNumber(properties.NumberOfWorkers) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getAny(properties.Tags) : undefined as any);
    ret.addPropertyResult('timeout', 'Timeout', properties.Timeout != null ? cfn_parse.FromCloudFormation.getNumber(properties.Timeout) : undefined);
    ret.addPropertyResult('transformEncryption', 'TransformEncryption', properties.TransformEncryption != null ? CfnMLTransformTransformEncryptionPropertyFromCloudFormation(properties.TransformEncryption) : undefined);
    ret.addPropertyResult('workerType', 'WorkerType', properties.WorkerType != null ? cfn_parse.FromCloudFormation.getString(properties.WorkerType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::MLTransform`
 *
 * The AWS::Glue::MLTransform is an AWS Glue resource type that manages machine learning transforms.
 *
 * @cloudformationResource AWS::Glue::MLTransform
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html
 */
export class CfnMLTransform extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::MLTransform";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnMLTransform {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnMLTransformPropsFromCloudFormation(resourceProperties);
        const ret = new CfnMLTransform(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A list of AWS Glue table definitions used by the transform.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-inputrecordtables
     */
    public inputRecordTables: CfnMLTransform.InputRecordTablesProperty | cdk.IResolvable;

    /**
     * The name or Amazon Resource Name (ARN) of the IAM role with the required permissions. The required permissions include both AWS Glue service role permissions to AWS Glue resources, and Amazon S3 permissions required by the transform.
     *
     * - This role needs AWS Glue service role permissions to allow access to resources in AWS Glue . See [Attach a Policy to IAM Users That Access AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/attach-policy-iam-user.html) .
     * - This role needs permission to your Amazon Simple Storage Service (Amazon S3) sources, targets, temporary directory, scripts, and any libraries used by the task run for this transform.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-role
     */
    public role: string;

    /**
     * The algorithm-specific parameters that are associated with the machine learning transform.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-transformparameters
     */
    public transformParameters: CfnMLTransform.TransformParametersProperty | cdk.IResolvable;

    /**
     * A user-defined, long-form description text for the machine learning transform.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-description
     */
    public description: string | undefined;

    /**
     * This value determines which version of AWS Glue this machine learning transform is compatible with. Glue 1.0 is recommended for most customers. If the value is not set, the Glue compatibility defaults to Glue 0.9. For more information, see [AWS Glue Versions](https://docs.aws.amazon.com/glue/latest/dg/release-notes.html#release-notes-versions) in the developer guide.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-glueversion
     */
    public glueVersion: string | undefined;

    /**
     * The number of AWS Glue data processing units (DPUs) that are allocated to task runs for this transform. You can allocate from 2 to 100 DPUs; the default is 10. A DPU is a relative measure of processing power that consists of 4 vCPUs of compute capacity and 16 GB of memory. For more information, see the [AWS Glue pricing page](https://docs.aws.amazon.com/glue/pricing/) .
     *
     * `MaxCapacity` is a mutually exclusive option with `NumberOfWorkers` and `WorkerType` .
     *
     * - If either `NumberOfWorkers` or `WorkerType` is set, then `MaxCapacity` cannot be set.
     * - If `MaxCapacity` is set then neither `NumberOfWorkers` or `WorkerType` can be set.
     * - If `WorkerType` is set, then `NumberOfWorkers` is required (and vice versa).
     * - `MaxCapacity` and `NumberOfWorkers` must both be at least 1.
     *
     * When the `WorkerType` field is set to a value other than `Standard` , the `MaxCapacity` field is set automatically and becomes read-only.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-maxcapacity
     */
    public maxCapacity: number | undefined;

    /**
     * The maximum number of times to retry after an `MLTaskRun` of the machine learning transform fails.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-maxretries
     */
    public maxRetries: number | undefined;

    /**
     * A user-defined name for the machine learning transform. Names are required to be unique. `Name` is optional:
     *
     * - If you supply `Name` , the stack cannot be repeatedly created.
     * - If `Name` is not provided, a randomly generated name will be used instead.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-name
     */
    public name: string | undefined;

    /**
     * The number of workers of a defined `workerType` that are allocated when a task of the transform runs.
     *
     * If `WorkerType` is set, then `NumberOfWorkers` is required (and vice versa).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-numberofworkers
     */
    public numberOfWorkers: number | undefined;

    /**
     * The tags to use with this machine learning transform. You may use tags to limit access to the machine learning transform. For more information about tags in AWS Glue , see [AWS Tags in AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/monitor-tags.html) in the developer guide.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The timeout in minutes of the machine learning transform.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-timeout
     */
    public timeout: number | undefined;

    /**
     * The encryption-at-rest settings of the transform that apply to accessing user data. Machine learning
     * transforms can access user data encrypted in Amazon S3 using KMS.
     *
     * Additionally, imported labels and trained transforms can now be encrypted using a customer provided
     * KMS key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-transformencryption
     */
    public transformEncryption: CfnMLTransform.TransformEncryptionProperty | cdk.IResolvable | undefined;

    /**
     * The type of predefined worker that is allocated when a task of this transform runs. Accepts a value of Standard, G.1X, or G.2X.
     *
     * - For the `Standard` worker type, each worker provides 4 vCPU, 16 GB of memory and a 50GB disk, and 2 executors per worker.
     * - For the `G.1X` worker type, each worker provides 4 vCPU, 16 GB of memory and a 64GB disk, and 1 executor per worker.
     * - For the `G.2X` worker type, each worker provides 8 vCPU, 32 GB of memory and a 128GB disk, and 1 executor per worker.
     *
     * `MaxCapacity` is a mutually exclusive option with `NumberOfWorkers` and `WorkerType` .
     *
     * - If either `NumberOfWorkers` or `WorkerType` is set, then `MaxCapacity` cannot be set.
     * - If `MaxCapacity` is set then neither `NumberOfWorkers` or `WorkerType` can be set.
     * - If `WorkerType` is set, then `NumberOfWorkers` is required (and vice versa).
     * - `MaxCapacity` and `NumberOfWorkers` must both be at least 1.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-mltransform.html#cfn-glue-mltransform-workertype
     */
    public workerType: string | undefined;

    /**
     * Create a new `AWS::Glue::MLTransform`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnMLTransformProps) {
        super(scope, id, { type: CfnMLTransform.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'inputRecordTables', this);
        cdk.requireProperty(props, 'role', this);
        cdk.requireProperty(props, 'transformParameters', this);

        this.inputRecordTables = props.inputRecordTables;
        this.role = props.role;
        this.transformParameters = props.transformParameters;
        this.description = props.description;
        this.glueVersion = props.glueVersion;
        this.maxCapacity = props.maxCapacity;
        this.maxRetries = props.maxRetries;
        this.name = props.name;
        this.numberOfWorkers = props.numberOfWorkers;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::Glue::MLTransform", props.tags, { tagPropertyName: 'tags' });
        this.timeout = props.timeout;
        this.transformEncryption = props.transformEncryption;
        this.workerType = props.workerType;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnMLTransform.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            inputRecordTables: this.inputRecordTables,
            role: this.role,
            transformParameters: this.transformParameters,
            description: this.description,
            glueVersion: this.glueVersion,
            maxCapacity: this.maxCapacity,
            maxRetries: this.maxRetries,
            name: this.name,
            numberOfWorkers: this.numberOfWorkers,
            tags: this.tags.renderTags(),
            timeout: this.timeout,
            transformEncryption: this.transformEncryption,
            workerType: this.workerType,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnMLTransformPropsToCloudFormation(props);
    }
}

export namespace CfnMLTransform {
    /**
     * The parameters to configure the find matches transform.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-transformparameters-findmatchesparameters.html
     */
    export interface FindMatchesParametersProperty {
        /**
         * The value that is selected when tuning your transform for a balance between accuracy and cost. A value of 0.5 means that the system balances accuracy and cost concerns. A value of 1.0 means a bias purely for accuracy, which typically results in a higher cost, sometimes substantially higher. A value of 0.0 means a bias purely for cost, which results in a less accurate `FindMatches` transform, sometimes with unacceptable accuracy.
         *
         * Accuracy measures how well the transform finds true positives and true negatives. Increasing accuracy requires more machine resources and cost. But it also results in increased recall.
         *
         * Cost measures how many compute resources, and thus money, are consumed to run the transform.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-transformparameters-findmatchesparameters.html#cfn-glue-mltransform-transformparameters-findmatchesparameters-accuracycosttradeoff
         */
        readonly accuracyCostTradeoff?: number;
        /**
         * The value to switch on or off to force the output to match the provided labels from users. If the value is `True` , the `find matches` transform forces the output to match the provided labels. The results override the normal conflation results. If the value is `False` , the `find matches` transform does not ensure all the labels provided are respected, and the results rely on the trained model.
         *
         * Note that setting this value to true may increase the conflation execution time.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-transformparameters-findmatchesparameters.html#cfn-glue-mltransform-transformparameters-findmatchesparameters-enforceprovidedlabels
         */
        readonly enforceProvidedLabels?: boolean | cdk.IResolvable;
        /**
         * The value selected when tuning your transform for a balance between precision and recall. A value of 0.5 means no preference; a value of 1.0 means a bias purely for precision, and a value of 0.0 means a bias for recall. Because this is a tradeoff, choosing values close to 1.0 means very low recall, and choosing values close to 0.0 results in very low precision.
         *
         * The precision metric indicates how often your model is correct when it predicts a match.
         *
         * The recall metric indicates that for an actual match, how often your model predicts the match.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-transformparameters-findmatchesparameters.html#cfn-glue-mltransform-transformparameters-findmatchesparameters-precisionrecalltradeoff
         */
        readonly precisionRecallTradeoff?: number;
        /**
         * The name of a column that uniquely identifies rows in the source table. Used to help identify matching records.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-transformparameters-findmatchesparameters.html#cfn-glue-mltransform-transformparameters-findmatchesparameters-primarykeycolumnname
         */
        readonly primaryKeyColumnName: string;
    }
}

/**
 * Determine whether the given properties match those of a `FindMatchesParametersProperty`
 *
 * @param properties - the TypeScript properties of a `FindMatchesParametersProperty`
 *
 * @returns the result of the validation.
 */
function CfnMLTransform_FindMatchesParametersPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accuracyCostTradeoff', cdk.validateNumber)(properties.accuracyCostTradeoff));
    errors.collect(cdk.propertyValidator('enforceProvidedLabels', cdk.validateBoolean)(properties.enforceProvidedLabels));
    errors.collect(cdk.propertyValidator('precisionRecallTradeoff', cdk.validateNumber)(properties.precisionRecallTradeoff));
    errors.collect(cdk.propertyValidator('primaryKeyColumnName', cdk.requiredValidator)(properties.primaryKeyColumnName));
    errors.collect(cdk.propertyValidator('primaryKeyColumnName', cdk.validateString)(properties.primaryKeyColumnName));
    return errors.wrap('supplied properties not correct for "FindMatchesParametersProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::MLTransform.FindMatchesParameters` resource
 *
 * @param properties - the TypeScript properties of a `FindMatchesParametersProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::MLTransform.FindMatchesParameters` resource.
 */
// @ts-ignore TS6133
function cfnMLTransformFindMatchesParametersPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMLTransform_FindMatchesParametersPropertyValidator(properties).assertSuccess();
    return {
        AccuracyCostTradeoff: cdk.numberToCloudFormation(properties.accuracyCostTradeoff),
        EnforceProvidedLabels: cdk.booleanToCloudFormation(properties.enforceProvidedLabels),
        PrecisionRecallTradeoff: cdk.numberToCloudFormation(properties.precisionRecallTradeoff),
        PrimaryKeyColumnName: cdk.stringToCloudFormation(properties.primaryKeyColumnName),
    };
}

// @ts-ignore TS6133
function CfnMLTransformFindMatchesParametersPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMLTransform.FindMatchesParametersProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMLTransform.FindMatchesParametersProperty>();
    ret.addPropertyResult('accuracyCostTradeoff', 'AccuracyCostTradeoff', properties.AccuracyCostTradeoff != null ? cfn_parse.FromCloudFormation.getNumber(properties.AccuracyCostTradeoff) : undefined);
    ret.addPropertyResult('enforceProvidedLabels', 'EnforceProvidedLabels', properties.EnforceProvidedLabels != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnforceProvidedLabels) : undefined);
    ret.addPropertyResult('precisionRecallTradeoff', 'PrecisionRecallTradeoff', properties.PrecisionRecallTradeoff != null ? cfn_parse.FromCloudFormation.getNumber(properties.PrecisionRecallTradeoff) : undefined);
    ret.addPropertyResult('primaryKeyColumnName', 'PrimaryKeyColumnName', cfn_parse.FromCloudFormation.getString(properties.PrimaryKeyColumnName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMLTransform {
    /**
     * The database and table in the AWS Glue Data Catalog that is used for input or output data.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-inputrecordtables-gluetables.html
     */
    export interface GlueTablesProperty {
        /**
         * A unique identifier for the AWS Glue Data Catalog .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-inputrecordtables-gluetables.html#cfn-glue-mltransform-inputrecordtables-gluetables-catalogid
         */
        readonly catalogId?: string;
        /**
         * The name of the connection to the AWS Glue Data Catalog .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-inputrecordtables-gluetables.html#cfn-glue-mltransform-inputrecordtables-gluetables-connectionname
         */
        readonly connectionName?: string;
        /**
         * A database name in the AWS Glue Data Catalog .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-inputrecordtables-gluetables.html#cfn-glue-mltransform-inputrecordtables-gluetables-databasename
         */
        readonly databaseName: string;
        /**
         * A table name in the AWS Glue Data Catalog .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-inputrecordtables-gluetables.html#cfn-glue-mltransform-inputrecordtables-gluetables-tablename
         */
        readonly tableName: string;
    }
}

/**
 * Determine whether the given properties match those of a `GlueTablesProperty`
 *
 * @param properties - the TypeScript properties of a `GlueTablesProperty`
 *
 * @returns the result of the validation.
 */
function CfnMLTransform_GlueTablesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('connectionName', cdk.validateString)(properties.connectionName));
    errors.collect(cdk.propertyValidator('databaseName', cdk.requiredValidator)(properties.databaseName));
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    errors.collect(cdk.propertyValidator('tableName', cdk.requiredValidator)(properties.tableName));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    return errors.wrap('supplied properties not correct for "GlueTablesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::MLTransform.GlueTables` resource
 *
 * @param properties - the TypeScript properties of a `GlueTablesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::MLTransform.GlueTables` resource.
 */
// @ts-ignore TS6133
function cfnMLTransformGlueTablesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMLTransform_GlueTablesPropertyValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        ConnectionName: cdk.stringToCloudFormation(properties.connectionName),
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
        TableName: cdk.stringToCloudFormation(properties.tableName),
    };
}

// @ts-ignore TS6133
function CfnMLTransformGlueTablesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMLTransform.GlueTablesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMLTransform.GlueTablesProperty>();
    ret.addPropertyResult('catalogId', 'CatalogId', properties.CatalogId != null ? cfn_parse.FromCloudFormation.getString(properties.CatalogId) : undefined);
    ret.addPropertyResult('connectionName', 'ConnectionName', properties.ConnectionName != null ? cfn_parse.FromCloudFormation.getString(properties.ConnectionName) : undefined);
    ret.addPropertyResult('databaseName', 'DatabaseName', cfn_parse.FromCloudFormation.getString(properties.DatabaseName));
    ret.addPropertyResult('tableName', 'TableName', cfn_parse.FromCloudFormation.getString(properties.TableName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMLTransform {
    /**
     * A list of AWS Glue table definitions used by the transform.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-inputrecordtables.html
     */
    export interface InputRecordTablesProperty {
        /**
         * The database and table in the AWS Glue Data Catalog that is used for input or output data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-inputrecordtables.html#cfn-glue-mltransform-inputrecordtables-gluetables
         */
        readonly glueTables?: Array<CfnMLTransform.GlueTablesProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `InputRecordTablesProperty`
 *
 * @param properties - the TypeScript properties of a `InputRecordTablesProperty`
 *
 * @returns the result of the validation.
 */
function CfnMLTransform_InputRecordTablesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('glueTables', cdk.listValidator(CfnMLTransform_GlueTablesPropertyValidator))(properties.glueTables));
    return errors.wrap('supplied properties not correct for "InputRecordTablesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::MLTransform.InputRecordTables` resource
 *
 * @param properties - the TypeScript properties of a `InputRecordTablesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::MLTransform.InputRecordTables` resource.
 */
// @ts-ignore TS6133
function cfnMLTransformInputRecordTablesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMLTransform_InputRecordTablesPropertyValidator(properties).assertSuccess();
    return {
        GlueTables: cdk.listMapper(cfnMLTransformGlueTablesPropertyToCloudFormation)(properties.glueTables),
    };
}

// @ts-ignore TS6133
function CfnMLTransformInputRecordTablesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMLTransform.InputRecordTablesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMLTransform.InputRecordTablesProperty>();
    ret.addPropertyResult('glueTables', 'GlueTables', properties.GlueTables != null ? cfn_parse.FromCloudFormation.getArray(CfnMLTransformGlueTablesPropertyFromCloudFormation)(properties.GlueTables) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMLTransform {
    /**
     * The encryption-at-rest settings of the transform that apply to accessing user data.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-transformencryption-mluserdataencryption.html
     */
    export interface MLUserDataEncryptionProperty {
        /**
         * The ID for the customer-provided KMS key.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-transformencryption-mluserdataencryption.html#cfn-glue-mltransform-transformencryption-mluserdataencryption-kmskeyid
         */
        readonly kmsKeyId?: string;
        /**
         * The encryption mode applied to user data. Valid values are:
         *
         * - DISABLED: encryption is disabled.
         * - SSEKMS: use of server-side encryption with AWS Key Management Service (SSE-KMS) for user data
         * stored in Amazon S3.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-transformencryption-mluserdataencryption.html#cfn-glue-mltransform-transformencryption-mluserdataencryption-mluserdataencryptionmode
         */
        readonly mlUserDataEncryptionMode: string;
    }
}

/**
 * Determine whether the given properties match those of a `MLUserDataEncryptionProperty`
 *
 * @param properties - the TypeScript properties of a `MLUserDataEncryptionProperty`
 *
 * @returns the result of the validation.
 */
function CfnMLTransform_MLUserDataEncryptionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('mlUserDataEncryptionMode', cdk.requiredValidator)(properties.mlUserDataEncryptionMode));
    errors.collect(cdk.propertyValidator('mlUserDataEncryptionMode', cdk.validateString)(properties.mlUserDataEncryptionMode));
    return errors.wrap('supplied properties not correct for "MLUserDataEncryptionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::MLTransform.MLUserDataEncryption` resource
 *
 * @param properties - the TypeScript properties of a `MLUserDataEncryptionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::MLTransform.MLUserDataEncryption` resource.
 */
// @ts-ignore TS6133
function cfnMLTransformMLUserDataEncryptionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMLTransform_MLUserDataEncryptionPropertyValidator(properties).assertSuccess();
    return {
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        MLUserDataEncryptionMode: cdk.stringToCloudFormation(properties.mlUserDataEncryptionMode),
    };
}

// @ts-ignore TS6133
function CfnMLTransformMLUserDataEncryptionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMLTransform.MLUserDataEncryptionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMLTransform.MLUserDataEncryptionProperty>();
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('mlUserDataEncryptionMode', 'MLUserDataEncryptionMode', cfn_parse.FromCloudFormation.getString(properties.MLUserDataEncryptionMode));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMLTransform {
    /**
     * The encryption-at-rest settings of the transform that apply to accessing user data. Machine learning
     * transforms can access user data encrypted in Amazon S3 using KMS.
     *
     * Additionally, imported labels and trained transforms can now be encrypted using a customer provided
     * KMS key.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-transformencryption.html
     */
    export interface TransformEncryptionProperty {
        /**
         * The encryption-at-rest settings of the transform that apply to accessing user data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-transformencryption.html#cfn-glue-mltransform-transformencryption-mluserdataencryption
         */
        readonly mlUserDataEncryption?: CfnMLTransform.MLUserDataEncryptionProperty | cdk.IResolvable;
        /**
         * The name of the security configuration.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-transformencryption.html#cfn-glue-mltransform-transformencryption-taskrunsecurityconfigurationname
         */
        readonly taskRunSecurityConfigurationName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `TransformEncryptionProperty`
 *
 * @param properties - the TypeScript properties of a `TransformEncryptionProperty`
 *
 * @returns the result of the validation.
 */
function CfnMLTransform_TransformEncryptionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('mlUserDataEncryption', CfnMLTransform_MLUserDataEncryptionPropertyValidator)(properties.mlUserDataEncryption));
    errors.collect(cdk.propertyValidator('taskRunSecurityConfigurationName', cdk.validateString)(properties.taskRunSecurityConfigurationName));
    return errors.wrap('supplied properties not correct for "TransformEncryptionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::MLTransform.TransformEncryption` resource
 *
 * @param properties - the TypeScript properties of a `TransformEncryptionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::MLTransform.TransformEncryption` resource.
 */
// @ts-ignore TS6133
function cfnMLTransformTransformEncryptionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMLTransform_TransformEncryptionPropertyValidator(properties).assertSuccess();
    return {
        MLUserDataEncryption: cfnMLTransformMLUserDataEncryptionPropertyToCloudFormation(properties.mlUserDataEncryption),
        TaskRunSecurityConfigurationName: cdk.stringToCloudFormation(properties.taskRunSecurityConfigurationName),
    };
}

// @ts-ignore TS6133
function CfnMLTransformTransformEncryptionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMLTransform.TransformEncryptionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMLTransform.TransformEncryptionProperty>();
    ret.addPropertyResult('mlUserDataEncryption', 'MLUserDataEncryption', properties.MLUserDataEncryption != null ? CfnMLTransformMLUserDataEncryptionPropertyFromCloudFormation(properties.MLUserDataEncryption) : undefined);
    ret.addPropertyResult('taskRunSecurityConfigurationName', 'TaskRunSecurityConfigurationName', properties.TaskRunSecurityConfigurationName != null ? cfn_parse.FromCloudFormation.getString(properties.TaskRunSecurityConfigurationName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnMLTransform {
    /**
     * The algorithm-specific parameters that are associated with the machine learning transform.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-transformparameters.html
     */
    export interface TransformParametersProperty {
        /**
         * The parameters for the find matches algorithm.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-transformparameters.html#cfn-glue-mltransform-transformparameters-findmatchesparameters
         */
        readonly findMatchesParameters?: CfnMLTransform.FindMatchesParametersProperty | cdk.IResolvable;
        /**
         * The type of machine learning transform. `FIND_MATCHES` is the only option.
         *
         * For information about the types of machine learning transforms, see [Creating Machine Learning Transforms](https://docs.aws.amazon.com/glue/latest/dg/add-job-machine-learning-transform.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-mltransform-transformparameters.html#cfn-glue-mltransform-transformparameters-transformtype
         */
        readonly transformType: string;
    }
}

/**
 * Determine whether the given properties match those of a `TransformParametersProperty`
 *
 * @param properties - the TypeScript properties of a `TransformParametersProperty`
 *
 * @returns the result of the validation.
 */
function CfnMLTransform_TransformParametersPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('findMatchesParameters', CfnMLTransform_FindMatchesParametersPropertyValidator)(properties.findMatchesParameters));
    errors.collect(cdk.propertyValidator('transformType', cdk.requiredValidator)(properties.transformType));
    errors.collect(cdk.propertyValidator('transformType', cdk.validateString)(properties.transformType));
    return errors.wrap('supplied properties not correct for "TransformParametersProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::MLTransform.TransformParameters` resource
 *
 * @param properties - the TypeScript properties of a `TransformParametersProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::MLTransform.TransformParameters` resource.
 */
// @ts-ignore TS6133
function cfnMLTransformTransformParametersPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnMLTransform_TransformParametersPropertyValidator(properties).assertSuccess();
    return {
        FindMatchesParameters: cfnMLTransformFindMatchesParametersPropertyToCloudFormation(properties.findMatchesParameters),
        TransformType: cdk.stringToCloudFormation(properties.transformType),
    };
}

// @ts-ignore TS6133
function CfnMLTransformTransformParametersPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnMLTransform.TransformParametersProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnMLTransform.TransformParametersProperty>();
    ret.addPropertyResult('findMatchesParameters', 'FindMatchesParameters', properties.FindMatchesParameters != null ? CfnMLTransformFindMatchesParametersPropertyFromCloudFormation(properties.FindMatchesParameters) : undefined);
    ret.addPropertyResult('transformType', 'TransformType', cfn_parse.FromCloudFormation.getString(properties.TransformType));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnPartition`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-partition.html
 */
export interface CfnPartitionProps {

    /**
     * The AWS account ID of the catalog in which the partion is to be created.
     *
     * > To specify the account ID, you can use the `Ref` intrinsic function with the `AWS::AccountId` pseudo parameter. For example: `!Ref AWS::AccountId`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-partition.html#cfn-glue-partition-catalogid
     */
    readonly catalogId: string;

    /**
     * The name of the catalog database in which to create the partition.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-partition.html#cfn-glue-partition-databasename
     */
    readonly databaseName: string;

    /**
     * The structure used to create and update a partition.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-partition.html#cfn-glue-partition-partitioninput
     */
    readonly partitionInput: CfnPartition.PartitionInputProperty | cdk.IResolvable;

    /**
     * The name of the metadata table in which the partition is to be created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-partition.html#cfn-glue-partition-tablename
     */
    readonly tableName: string;
}

/**
 * Determine whether the given properties match those of a `CfnPartitionProps`
 *
 * @param properties - the TypeScript properties of a `CfnPartitionProps`
 *
 * @returns the result of the validation.
 */
function CfnPartitionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.requiredValidator)(properties.catalogId));
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('databaseName', cdk.requiredValidator)(properties.databaseName));
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    errors.collect(cdk.propertyValidator('partitionInput', cdk.requiredValidator)(properties.partitionInput));
    errors.collect(cdk.propertyValidator('partitionInput', CfnPartition_PartitionInputPropertyValidator)(properties.partitionInput));
    errors.collect(cdk.propertyValidator('tableName', cdk.requiredValidator)(properties.tableName));
    errors.collect(cdk.propertyValidator('tableName', cdk.validateString)(properties.tableName));
    return errors.wrap('supplied properties not correct for "CfnPartitionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Partition` resource
 *
 * @param properties - the TypeScript properties of a `CfnPartitionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Partition` resource.
 */
// @ts-ignore TS6133
function cfnPartitionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPartitionPropsValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
        PartitionInput: cfnPartitionPartitionInputPropertyToCloudFormation(properties.partitionInput),
        TableName: cdk.stringToCloudFormation(properties.tableName),
    };
}

// @ts-ignore TS6133
function CfnPartitionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPartitionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPartitionProps>();
    ret.addPropertyResult('catalogId', 'CatalogId', cfn_parse.FromCloudFormation.getString(properties.CatalogId));
    ret.addPropertyResult('databaseName', 'DatabaseName', cfn_parse.FromCloudFormation.getString(properties.DatabaseName));
    ret.addPropertyResult('partitionInput', 'PartitionInput', CfnPartitionPartitionInputPropertyFromCloudFormation(properties.PartitionInput));
    ret.addPropertyResult('tableName', 'TableName', cfn_parse.FromCloudFormation.getString(properties.TableName));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::Partition`
 *
 * The `AWS::Glue::Partition` resource creates an AWS Glue partition, which represents a slice of table data. For more information, see [CreatePartition Action](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-partitions.html#aws-glue-api-catalog-partitions-CreatePartition) and [Partition Structure](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-partitions.html#aws-glue-api-catalog-partitions-Partition) in the *AWS Glue Developer Guide* .
 *
 * @cloudformationResource AWS::Glue::Partition
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-partition.html
 */
export class CfnPartition extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::Partition";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnPartition {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnPartitionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnPartition(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The AWS account ID of the catalog in which the partion is to be created.
     *
     * > To specify the account ID, you can use the `Ref` intrinsic function with the `AWS::AccountId` pseudo parameter. For example: `!Ref AWS::AccountId`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-partition.html#cfn-glue-partition-catalogid
     */
    public catalogId: string;

    /**
     * The name of the catalog database in which to create the partition.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-partition.html#cfn-glue-partition-databasename
     */
    public databaseName: string;

    /**
     * The structure used to create and update a partition.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-partition.html#cfn-glue-partition-partitioninput
     */
    public partitionInput: CfnPartition.PartitionInputProperty | cdk.IResolvable;

    /**
     * The name of the metadata table in which the partition is to be created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-partition.html#cfn-glue-partition-tablename
     */
    public tableName: string;

    /**
     * Create a new `AWS::Glue::Partition`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnPartitionProps) {
        super(scope, id, { type: CfnPartition.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'catalogId', this);
        cdk.requireProperty(props, 'databaseName', this);
        cdk.requireProperty(props, 'partitionInput', this);
        cdk.requireProperty(props, 'tableName', this);

        this.catalogId = props.catalogId;
        this.databaseName = props.databaseName;
        this.partitionInput = props.partitionInput;
        this.tableName = props.tableName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnPartition.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            catalogId: this.catalogId,
            databaseName: this.databaseName,
            partitionInput: this.partitionInput,
            tableName: this.tableName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnPartitionPropsToCloudFormation(props);
    }
}

export namespace CfnPartition {
    /**
     * A column in a `Table` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-column.html
     */
    export interface ColumnProperty {
        /**
         * A free-form text comment.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-column.html#cfn-glue-partition-column-comment
         */
        readonly comment?: string;
        /**
         * The name of the `Column` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-column.html#cfn-glue-partition-column-name
         */
        readonly name: string;
        /**
         * The data type of the `Column` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-column.html#cfn-glue-partition-column-type
         */
        readonly type?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ColumnProperty`
 *
 * @param properties - the TypeScript properties of a `ColumnProperty`
 *
 * @returns the result of the validation.
 */
function CfnPartition_ColumnPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('comment', cdk.validateString)(properties.comment));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "ColumnProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Partition.Column` resource
 *
 * @param properties - the TypeScript properties of a `ColumnProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Partition.Column` resource.
 */
// @ts-ignore TS6133
function cfnPartitionColumnPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPartition_ColumnPropertyValidator(properties).assertSuccess();
    return {
        Comment: cdk.stringToCloudFormation(properties.comment),
        Name: cdk.stringToCloudFormation(properties.name),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnPartitionColumnPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPartition.ColumnProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPartition.ColumnProperty>();
    ret.addPropertyResult('comment', 'Comment', properties.Comment != null ? cfn_parse.FromCloudFormation.getString(properties.Comment) : undefined);
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPartition {
    /**
     * Specifies the sort order of a sorted column.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-order.html
     */
    export interface OrderProperty {
        /**
         * The name of the column.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-order.html#cfn-glue-partition-order-column
         */
        readonly column: string;
        /**
         * Indicates that the column is sorted in ascending order ( `== 1` ), or in descending order ( `==0` ).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-order.html#cfn-glue-partition-order-sortorder
         */
        readonly sortOrder?: number;
    }
}

/**
 * Determine whether the given properties match those of a `OrderProperty`
 *
 * @param properties - the TypeScript properties of a `OrderProperty`
 *
 * @returns the result of the validation.
 */
function CfnPartition_OrderPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('column', cdk.requiredValidator)(properties.column));
    errors.collect(cdk.propertyValidator('column', cdk.validateString)(properties.column));
    errors.collect(cdk.propertyValidator('sortOrder', cdk.validateNumber)(properties.sortOrder));
    return errors.wrap('supplied properties not correct for "OrderProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Partition.Order` resource
 *
 * @param properties - the TypeScript properties of a `OrderProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Partition.Order` resource.
 */
// @ts-ignore TS6133
function cfnPartitionOrderPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPartition_OrderPropertyValidator(properties).assertSuccess();
    return {
        Column: cdk.stringToCloudFormation(properties.column),
        SortOrder: cdk.numberToCloudFormation(properties.sortOrder),
    };
}

// @ts-ignore TS6133
function CfnPartitionOrderPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPartition.OrderProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPartition.OrderProperty>();
    ret.addPropertyResult('column', 'Column', cfn_parse.FromCloudFormation.getString(properties.Column));
    ret.addPropertyResult('sortOrder', 'SortOrder', properties.SortOrder != null ? cfn_parse.FromCloudFormation.getNumber(properties.SortOrder) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPartition {
    /**
     * The structure used to create and update a partition.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-partitioninput.html
     */
    export interface PartitionInputProperty {
        /**
         * These key-value pairs define partition parameters.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-partitioninput.html#cfn-glue-partition-partitioninput-parameters
         */
        readonly parameters?: any | cdk.IResolvable;
        /**
         * Provides information about the physical location where the partition is stored.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-partitioninput.html#cfn-glue-partition-partitioninput-storagedescriptor
         */
        readonly storageDescriptor?: CfnPartition.StorageDescriptorProperty | cdk.IResolvable;
        /**
         * The values of the partition. Although this parameter is not required by the SDK, you must specify this parameter for a valid input.
         *
         * The values for the keys for the new partition must be passed as an array of String objects that must be ordered in the same order as the partition keys appearing in the Amazon S3 prefix. Otherwise AWS Glue will add the values to the wrong keys.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-partitioninput.html#cfn-glue-partition-partitioninput-values
         */
        readonly values: string[];
    }
}

/**
 * Determine whether the given properties match those of a `PartitionInputProperty`
 *
 * @param properties - the TypeScript properties of a `PartitionInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnPartition_PartitionInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('parameters', cdk.validateObject)(properties.parameters));
    errors.collect(cdk.propertyValidator('storageDescriptor', CfnPartition_StorageDescriptorPropertyValidator)(properties.storageDescriptor));
    errors.collect(cdk.propertyValidator('values', cdk.requiredValidator)(properties.values));
    errors.collect(cdk.propertyValidator('values', cdk.listValidator(cdk.validateString))(properties.values));
    return errors.wrap('supplied properties not correct for "PartitionInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Partition.PartitionInput` resource
 *
 * @param properties - the TypeScript properties of a `PartitionInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Partition.PartitionInput` resource.
 */
// @ts-ignore TS6133
function cfnPartitionPartitionInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPartition_PartitionInputPropertyValidator(properties).assertSuccess();
    return {
        Parameters: cdk.objectToCloudFormation(properties.parameters),
        StorageDescriptor: cfnPartitionStorageDescriptorPropertyToCloudFormation(properties.storageDescriptor),
        Values: cdk.listMapper(cdk.stringToCloudFormation)(properties.values),
    };
}

// @ts-ignore TS6133
function CfnPartitionPartitionInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPartition.PartitionInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPartition.PartitionInputProperty>();
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? cfn_parse.FromCloudFormation.getAny(properties.Parameters) : undefined);
    ret.addPropertyResult('storageDescriptor', 'StorageDescriptor', properties.StorageDescriptor != null ? CfnPartitionStorageDescriptorPropertyFromCloudFormation(properties.StorageDescriptor) : undefined);
    ret.addPropertyResult('values', 'Values', cfn_parse.FromCloudFormation.getStringArray(properties.Values));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPartition {
    /**
     * A structure that contains schema identity fields. Either this or the `SchemaVersionId` has to be
     * provided.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-schemaid.html
     */
    export interface SchemaIdProperty {
        /**
         * The name of the schema registry that contains the schema.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-schemaid.html#cfn-glue-partition-schemaid-registryname
         */
        readonly registryName?: string;
        /**
         * The Amazon Resource Name (ARN) of the schema. One of `SchemaArn` or `SchemaName` has to be
         * provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-schemaid.html#cfn-glue-partition-schemaid-schemaarn
         */
        readonly schemaArn?: string;
        /**
         * The name of the schema. One of `SchemaArn` or `SchemaName` has to be provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-schemaid.html#cfn-glue-partition-schemaid-schemaname
         */
        readonly schemaName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SchemaIdProperty`
 *
 * @param properties - the TypeScript properties of a `SchemaIdProperty`
 *
 * @returns the result of the validation.
 */
function CfnPartition_SchemaIdPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('registryName', cdk.validateString)(properties.registryName));
    errors.collect(cdk.propertyValidator('schemaArn', cdk.validateString)(properties.schemaArn));
    errors.collect(cdk.propertyValidator('schemaName', cdk.validateString)(properties.schemaName));
    return errors.wrap('supplied properties not correct for "SchemaIdProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Partition.SchemaId` resource
 *
 * @param properties - the TypeScript properties of a `SchemaIdProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Partition.SchemaId` resource.
 */
// @ts-ignore TS6133
function cfnPartitionSchemaIdPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPartition_SchemaIdPropertyValidator(properties).assertSuccess();
    return {
        RegistryName: cdk.stringToCloudFormation(properties.registryName),
        SchemaArn: cdk.stringToCloudFormation(properties.schemaArn),
        SchemaName: cdk.stringToCloudFormation(properties.schemaName),
    };
}

// @ts-ignore TS6133
function CfnPartitionSchemaIdPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPartition.SchemaIdProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPartition.SchemaIdProperty>();
    ret.addPropertyResult('registryName', 'RegistryName', properties.RegistryName != null ? cfn_parse.FromCloudFormation.getString(properties.RegistryName) : undefined);
    ret.addPropertyResult('schemaArn', 'SchemaArn', properties.SchemaArn != null ? cfn_parse.FromCloudFormation.getString(properties.SchemaArn) : undefined);
    ret.addPropertyResult('schemaName', 'SchemaName', properties.SchemaName != null ? cfn_parse.FromCloudFormation.getString(properties.SchemaName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPartition {
    /**
     * An object that references a schema stored in the AWS Glue Schema Registry.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-schemareference.html
     */
    export interface SchemaReferenceProperty {
        /**
         * A structure that contains schema identity fields. Either this or the `SchemaVersionId` has to be
         * provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-schemareference.html#cfn-glue-partition-schemareference-schemaid
         */
        readonly schemaId?: CfnPartition.SchemaIdProperty | cdk.IResolvable;
        /**
         * The unique ID assigned to a version of the schema. Either this or the `SchemaId` has to be provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-schemareference.html#cfn-glue-partition-schemareference-schemaversionid
         */
        readonly schemaVersionId?: string;
        /**
         * The version number of the schema.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-schemareference.html#cfn-glue-partition-schemareference-schemaversionnumber
         */
        readonly schemaVersionNumber?: number;
    }
}

/**
 * Determine whether the given properties match those of a `SchemaReferenceProperty`
 *
 * @param properties - the TypeScript properties of a `SchemaReferenceProperty`
 *
 * @returns the result of the validation.
 */
function CfnPartition_SchemaReferencePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('schemaId', CfnPartition_SchemaIdPropertyValidator)(properties.schemaId));
    errors.collect(cdk.propertyValidator('schemaVersionId', cdk.validateString)(properties.schemaVersionId));
    errors.collect(cdk.propertyValidator('schemaVersionNumber', cdk.validateNumber)(properties.schemaVersionNumber));
    return errors.wrap('supplied properties not correct for "SchemaReferenceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Partition.SchemaReference` resource
 *
 * @param properties - the TypeScript properties of a `SchemaReferenceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Partition.SchemaReference` resource.
 */
// @ts-ignore TS6133
function cfnPartitionSchemaReferencePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPartition_SchemaReferencePropertyValidator(properties).assertSuccess();
    return {
        SchemaId: cfnPartitionSchemaIdPropertyToCloudFormation(properties.schemaId),
        SchemaVersionId: cdk.stringToCloudFormation(properties.schemaVersionId),
        SchemaVersionNumber: cdk.numberToCloudFormation(properties.schemaVersionNumber),
    };
}

// @ts-ignore TS6133
function CfnPartitionSchemaReferencePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPartition.SchemaReferenceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPartition.SchemaReferenceProperty>();
    ret.addPropertyResult('schemaId', 'SchemaId', properties.SchemaId != null ? CfnPartitionSchemaIdPropertyFromCloudFormation(properties.SchemaId) : undefined);
    ret.addPropertyResult('schemaVersionId', 'SchemaVersionId', properties.SchemaVersionId != null ? cfn_parse.FromCloudFormation.getString(properties.SchemaVersionId) : undefined);
    ret.addPropertyResult('schemaVersionNumber', 'SchemaVersionNumber', properties.SchemaVersionNumber != null ? cfn_parse.FromCloudFormation.getNumber(properties.SchemaVersionNumber) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPartition {
    /**
     * Information about a serialization/deserialization program (SerDe) that serves as an extractor and loader.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-serdeinfo.html
     */
    export interface SerdeInfoProperty {
        /**
         * Name of the SerDe.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-serdeinfo.html#cfn-glue-partition-serdeinfo-name
         */
        readonly name?: string;
        /**
         * These key-value pairs define initialization parameters for the SerDe.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-serdeinfo.html#cfn-glue-partition-serdeinfo-parameters
         */
        readonly parameters?: any | cdk.IResolvable;
        /**
         * Usually the class that implements the SerDe. An example is `org.apache.hadoop.hive.serde2.columnar.ColumnarSerDe` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-serdeinfo.html#cfn-glue-partition-serdeinfo-serializationlibrary
         */
        readonly serializationLibrary?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SerdeInfoProperty`
 *
 * @param properties - the TypeScript properties of a `SerdeInfoProperty`
 *
 * @returns the result of the validation.
 */
function CfnPartition_SerdeInfoPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('parameters', cdk.validateObject)(properties.parameters));
    errors.collect(cdk.propertyValidator('serializationLibrary', cdk.validateString)(properties.serializationLibrary));
    return errors.wrap('supplied properties not correct for "SerdeInfoProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Partition.SerdeInfo` resource
 *
 * @param properties - the TypeScript properties of a `SerdeInfoProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Partition.SerdeInfo` resource.
 */
// @ts-ignore TS6133
function cfnPartitionSerdeInfoPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPartition_SerdeInfoPropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Parameters: cdk.objectToCloudFormation(properties.parameters),
        SerializationLibrary: cdk.stringToCloudFormation(properties.serializationLibrary),
    };
}

// @ts-ignore TS6133
function CfnPartitionSerdeInfoPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPartition.SerdeInfoProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPartition.SerdeInfoProperty>();
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? cfn_parse.FromCloudFormation.getAny(properties.Parameters) : undefined);
    ret.addPropertyResult('serializationLibrary', 'SerializationLibrary', properties.SerializationLibrary != null ? cfn_parse.FromCloudFormation.getString(properties.SerializationLibrary) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPartition {
    /**
     * Specifies skewed values in a table. Skewed values are those that occur with very high frequency.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-skewedinfo.html
     */
    export interface SkewedInfoProperty {
        /**
         * A list of names of columns that contain skewed values.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-skewedinfo.html#cfn-glue-partition-skewedinfo-skewedcolumnnames
         */
        readonly skewedColumnNames?: string[];
        /**
         * A mapping of skewed values to the columns that contain them.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-skewedinfo.html#cfn-glue-partition-skewedinfo-skewedcolumnvaluelocationmaps
         */
        readonly skewedColumnValueLocationMaps?: any | cdk.IResolvable;
        /**
         * A list of values that appear so frequently as to be considered skewed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-skewedinfo.html#cfn-glue-partition-skewedinfo-skewedcolumnvalues
         */
        readonly skewedColumnValues?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `SkewedInfoProperty`
 *
 * @param properties - the TypeScript properties of a `SkewedInfoProperty`
 *
 * @returns the result of the validation.
 */
function CfnPartition_SkewedInfoPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('skewedColumnNames', cdk.listValidator(cdk.validateString))(properties.skewedColumnNames));
    errors.collect(cdk.propertyValidator('skewedColumnValueLocationMaps', cdk.validateObject)(properties.skewedColumnValueLocationMaps));
    errors.collect(cdk.propertyValidator('skewedColumnValues', cdk.listValidator(cdk.validateString))(properties.skewedColumnValues));
    return errors.wrap('supplied properties not correct for "SkewedInfoProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Partition.SkewedInfo` resource
 *
 * @param properties - the TypeScript properties of a `SkewedInfoProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Partition.SkewedInfo` resource.
 */
// @ts-ignore TS6133
function cfnPartitionSkewedInfoPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPartition_SkewedInfoPropertyValidator(properties).assertSuccess();
    return {
        SkewedColumnNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.skewedColumnNames),
        SkewedColumnValueLocationMaps: cdk.objectToCloudFormation(properties.skewedColumnValueLocationMaps),
        SkewedColumnValues: cdk.listMapper(cdk.stringToCloudFormation)(properties.skewedColumnValues),
    };
}

// @ts-ignore TS6133
function CfnPartitionSkewedInfoPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPartition.SkewedInfoProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPartition.SkewedInfoProperty>();
    ret.addPropertyResult('skewedColumnNames', 'SkewedColumnNames', properties.SkewedColumnNames != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SkewedColumnNames) : undefined);
    ret.addPropertyResult('skewedColumnValueLocationMaps', 'SkewedColumnValueLocationMaps', properties.SkewedColumnValueLocationMaps != null ? cfn_parse.FromCloudFormation.getAny(properties.SkewedColumnValueLocationMaps) : undefined);
    ret.addPropertyResult('skewedColumnValues', 'SkewedColumnValues', properties.SkewedColumnValues != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SkewedColumnValues) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnPartition {
    /**
     * Describes the physical storage of table data.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-storagedescriptor.html
     */
    export interface StorageDescriptorProperty {
        /**
         * A list of reducer grouping columns, clustering columns, and bucketing columns in the table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-storagedescriptor.html#cfn-glue-partition-storagedescriptor-bucketcolumns
         */
        readonly bucketColumns?: string[];
        /**
         * A list of the `Columns` in the table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-storagedescriptor.html#cfn-glue-partition-storagedescriptor-columns
         */
        readonly columns?: Array<CfnPartition.ColumnProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `True` if the data in the table is compressed, or `False` if not.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-storagedescriptor.html#cfn-glue-partition-storagedescriptor-compressed
         */
        readonly compressed?: boolean | cdk.IResolvable;
        /**
         * The input format: `SequenceFileInputFormat` (binary), or `TextInputFormat` , or a custom format.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-storagedescriptor.html#cfn-glue-partition-storagedescriptor-inputformat
         */
        readonly inputFormat?: string;
        /**
         * The physical location of the table. By default, this takes the form of the warehouse location, followed by the database location in the warehouse, followed by the table name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-storagedescriptor.html#cfn-glue-partition-storagedescriptor-location
         */
        readonly location?: string;
        /**
         * The number of buckets.
         *
         * You must specify this property if the partition contains any dimension columns.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-storagedescriptor.html#cfn-glue-partition-storagedescriptor-numberofbuckets
         */
        readonly numberOfBuckets?: number;
        /**
         * The output format: `SequenceFileOutputFormat` (binary), or `IgnoreKeyTextOutputFormat` , or a custom format.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-storagedescriptor.html#cfn-glue-partition-storagedescriptor-outputformat
         */
        readonly outputFormat?: string;
        /**
         * The user-supplied properties in key-value form.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-storagedescriptor.html#cfn-glue-partition-storagedescriptor-parameters
         */
        readonly parameters?: any | cdk.IResolvable;
        /**
         * An object that references a schema stored in the AWS Glue Schema Registry.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-storagedescriptor.html#cfn-glue-partition-storagedescriptor-schemareference
         */
        readonly schemaReference?: CfnPartition.SchemaReferenceProperty | cdk.IResolvable;
        /**
         * The serialization/deserialization (SerDe) information.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-storagedescriptor.html#cfn-glue-partition-storagedescriptor-serdeinfo
         */
        readonly serdeInfo?: CfnPartition.SerdeInfoProperty | cdk.IResolvable;
        /**
         * The information about values that appear frequently in a column (skewed values).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-storagedescriptor.html#cfn-glue-partition-storagedescriptor-skewedinfo
         */
        readonly skewedInfo?: CfnPartition.SkewedInfoProperty | cdk.IResolvable;
        /**
         * A list specifying the sort order of each bucket in the table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-storagedescriptor.html#cfn-glue-partition-storagedescriptor-sortcolumns
         */
        readonly sortColumns?: Array<CfnPartition.OrderProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `True` if the table data is stored in subdirectories, or `False` if not.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-partition-storagedescriptor.html#cfn-glue-partition-storagedescriptor-storedassubdirectories
         */
        readonly storedAsSubDirectories?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `StorageDescriptorProperty`
 *
 * @param properties - the TypeScript properties of a `StorageDescriptorProperty`
 *
 * @returns the result of the validation.
 */
function CfnPartition_StorageDescriptorPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketColumns', cdk.listValidator(cdk.validateString))(properties.bucketColumns));
    errors.collect(cdk.propertyValidator('columns', cdk.listValidator(CfnPartition_ColumnPropertyValidator))(properties.columns));
    errors.collect(cdk.propertyValidator('compressed', cdk.validateBoolean)(properties.compressed));
    errors.collect(cdk.propertyValidator('inputFormat', cdk.validateString)(properties.inputFormat));
    errors.collect(cdk.propertyValidator('location', cdk.validateString)(properties.location));
    errors.collect(cdk.propertyValidator('numberOfBuckets', cdk.validateNumber)(properties.numberOfBuckets));
    errors.collect(cdk.propertyValidator('outputFormat', cdk.validateString)(properties.outputFormat));
    errors.collect(cdk.propertyValidator('parameters', cdk.validateObject)(properties.parameters));
    errors.collect(cdk.propertyValidator('schemaReference', CfnPartition_SchemaReferencePropertyValidator)(properties.schemaReference));
    errors.collect(cdk.propertyValidator('serdeInfo', CfnPartition_SerdeInfoPropertyValidator)(properties.serdeInfo));
    errors.collect(cdk.propertyValidator('skewedInfo', CfnPartition_SkewedInfoPropertyValidator)(properties.skewedInfo));
    errors.collect(cdk.propertyValidator('sortColumns', cdk.listValidator(CfnPartition_OrderPropertyValidator))(properties.sortColumns));
    errors.collect(cdk.propertyValidator('storedAsSubDirectories', cdk.validateBoolean)(properties.storedAsSubDirectories));
    return errors.wrap('supplied properties not correct for "StorageDescriptorProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Partition.StorageDescriptor` resource
 *
 * @param properties - the TypeScript properties of a `StorageDescriptorProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Partition.StorageDescriptor` resource.
 */
// @ts-ignore TS6133
function cfnPartitionStorageDescriptorPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnPartition_StorageDescriptorPropertyValidator(properties).assertSuccess();
    return {
        BucketColumns: cdk.listMapper(cdk.stringToCloudFormation)(properties.bucketColumns),
        Columns: cdk.listMapper(cfnPartitionColumnPropertyToCloudFormation)(properties.columns),
        Compressed: cdk.booleanToCloudFormation(properties.compressed),
        InputFormat: cdk.stringToCloudFormation(properties.inputFormat),
        Location: cdk.stringToCloudFormation(properties.location),
        NumberOfBuckets: cdk.numberToCloudFormation(properties.numberOfBuckets),
        OutputFormat: cdk.stringToCloudFormation(properties.outputFormat),
        Parameters: cdk.objectToCloudFormation(properties.parameters),
        SchemaReference: cfnPartitionSchemaReferencePropertyToCloudFormation(properties.schemaReference),
        SerdeInfo: cfnPartitionSerdeInfoPropertyToCloudFormation(properties.serdeInfo),
        SkewedInfo: cfnPartitionSkewedInfoPropertyToCloudFormation(properties.skewedInfo),
        SortColumns: cdk.listMapper(cfnPartitionOrderPropertyToCloudFormation)(properties.sortColumns),
        StoredAsSubDirectories: cdk.booleanToCloudFormation(properties.storedAsSubDirectories),
    };
}

// @ts-ignore TS6133
function CfnPartitionStorageDescriptorPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnPartition.StorageDescriptorProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnPartition.StorageDescriptorProperty>();
    ret.addPropertyResult('bucketColumns', 'BucketColumns', properties.BucketColumns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.BucketColumns) : undefined);
    ret.addPropertyResult('columns', 'Columns', properties.Columns != null ? cfn_parse.FromCloudFormation.getArray(CfnPartitionColumnPropertyFromCloudFormation)(properties.Columns) : undefined);
    ret.addPropertyResult('compressed', 'Compressed', properties.Compressed != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Compressed) : undefined);
    ret.addPropertyResult('inputFormat', 'InputFormat', properties.InputFormat != null ? cfn_parse.FromCloudFormation.getString(properties.InputFormat) : undefined);
    ret.addPropertyResult('location', 'Location', properties.Location != null ? cfn_parse.FromCloudFormation.getString(properties.Location) : undefined);
    ret.addPropertyResult('numberOfBuckets', 'NumberOfBuckets', properties.NumberOfBuckets != null ? cfn_parse.FromCloudFormation.getNumber(properties.NumberOfBuckets) : undefined);
    ret.addPropertyResult('outputFormat', 'OutputFormat', properties.OutputFormat != null ? cfn_parse.FromCloudFormation.getString(properties.OutputFormat) : undefined);
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? cfn_parse.FromCloudFormation.getAny(properties.Parameters) : undefined);
    ret.addPropertyResult('schemaReference', 'SchemaReference', properties.SchemaReference != null ? CfnPartitionSchemaReferencePropertyFromCloudFormation(properties.SchemaReference) : undefined);
    ret.addPropertyResult('serdeInfo', 'SerdeInfo', properties.SerdeInfo != null ? CfnPartitionSerdeInfoPropertyFromCloudFormation(properties.SerdeInfo) : undefined);
    ret.addPropertyResult('skewedInfo', 'SkewedInfo', properties.SkewedInfo != null ? CfnPartitionSkewedInfoPropertyFromCloudFormation(properties.SkewedInfo) : undefined);
    ret.addPropertyResult('sortColumns', 'SortColumns', properties.SortColumns != null ? cfn_parse.FromCloudFormation.getArray(CfnPartitionOrderPropertyFromCloudFormation)(properties.SortColumns) : undefined);
    ret.addPropertyResult('storedAsSubDirectories', 'StoredAsSubDirectories', properties.StoredAsSubDirectories != null ? cfn_parse.FromCloudFormation.getBoolean(properties.StoredAsSubDirectories) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnRegistry`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-registry.html
 */
export interface CfnRegistryProps {

    /**
     * The name of the registry.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-registry.html#cfn-glue-registry-name
     */
    readonly name: string;

    /**
     * A description of the registry.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-registry.html#cfn-glue-registry-description
     */
    readonly description?: string;

    /**
     * AWS tags that contain a key value pair and may be searched by console, command line, or API.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-registry.html#cfn-glue-registry-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnRegistryProps`
 *
 * @param properties - the TypeScript properties of a `CfnRegistryProps`
 *
 * @returns the result of the validation.
 */
function CfnRegistryPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnRegistryProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Registry` resource
 *
 * @param properties - the TypeScript properties of a `CfnRegistryProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Registry` resource.
 */
// @ts-ignore TS6133
function cfnRegistryPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRegistryPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Description: cdk.stringToCloudFormation(properties.description),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnRegistryPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRegistryProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRegistryProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::Registry`
 *
 * The AWS::Glue::Registry is an AWS Glue resource type that manages registries of schemas in the AWS Glue Schema Registry.
 *
 * @cloudformationResource AWS::Glue::Registry
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-registry.html
 */
export class CfnRegistry extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::Registry";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnRegistry {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnRegistryPropsFromCloudFormation(resourceProperties);
        const ret = new CfnRegistry(scope, id, propsResult.value);
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
     * The name of the registry.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-registry.html#cfn-glue-registry-name
     */
    public name: string;

    /**
     * A description of the registry.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-registry.html#cfn-glue-registry-description
     */
    public description: string | undefined;

    /**
     * AWS tags that contain a key value pair and may be searched by console, command line, or API.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-registry.html#cfn-glue-registry-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Glue::Registry`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnRegistryProps) {
        super(scope, id, { type: CfnRegistry.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));

        this.name = props.name;
        this.description = props.description;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Glue::Registry", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnRegistry.CFN_RESOURCE_TYPE_NAME);
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
        return cfnRegistryPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnSchema`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html
 */
export interface CfnSchemaProps {

    /**
     * The compatibility mode of the schema.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-compatibility
     */
    readonly compatibility: string;

    /**
     * The data format of the schema definition. Currently only `AVRO` is supported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-dataformat
     */
    readonly dataFormat: string;

    /**
     * Name of the schema to be created of max length of 255, and may only contain letters, numbers, hyphen, underscore, dollar sign, or hash mark. No whitespace.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-name
     */
    readonly name: string;

    /**
     * The schema definition using the `DataFormat` setting for `SchemaName` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-schemadefinition
     */
    readonly schemaDefinition: string;

    /**
     * Specify the `VersionNumber` or the `IsLatest` for setting the checkpoint for the schema. This is only required for updating a checkpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-checkpointversion
     */
    readonly checkpointVersion?: CfnSchema.SchemaVersionProperty | cdk.IResolvable;

    /**
     * A description of the schema if specified when created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-description
     */
    readonly description?: string;

    /**
     * The registry where a schema is stored.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-registry
     */
    readonly registry?: CfnSchema.RegistryProperty | cdk.IResolvable;

    /**
     * AWS tags that contain a key value pair and may be searched by console, command line, or API.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnSchemaProps`
 *
 * @param properties - the TypeScript properties of a `CfnSchemaProps`
 *
 * @returns the result of the validation.
 */
function CfnSchemaPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('checkpointVersion', CfnSchema_SchemaVersionPropertyValidator)(properties.checkpointVersion));
    errors.collect(cdk.propertyValidator('compatibility', cdk.requiredValidator)(properties.compatibility));
    errors.collect(cdk.propertyValidator('compatibility', cdk.validateString)(properties.compatibility));
    errors.collect(cdk.propertyValidator('dataFormat', cdk.requiredValidator)(properties.dataFormat));
    errors.collect(cdk.propertyValidator('dataFormat', cdk.validateString)(properties.dataFormat));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('registry', CfnSchema_RegistryPropertyValidator)(properties.registry));
    errors.collect(cdk.propertyValidator('schemaDefinition', cdk.requiredValidator)(properties.schemaDefinition));
    errors.collect(cdk.propertyValidator('schemaDefinition', cdk.validateString)(properties.schemaDefinition));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnSchemaProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Schema` resource
 *
 * @param properties - the TypeScript properties of a `CfnSchemaProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Schema` resource.
 */
// @ts-ignore TS6133
function cfnSchemaPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSchemaPropsValidator(properties).assertSuccess();
    return {
        Compatibility: cdk.stringToCloudFormation(properties.compatibility),
        DataFormat: cdk.stringToCloudFormation(properties.dataFormat),
        Name: cdk.stringToCloudFormation(properties.name),
        SchemaDefinition: cdk.stringToCloudFormation(properties.schemaDefinition),
        CheckpointVersion: cfnSchemaSchemaVersionPropertyToCloudFormation(properties.checkpointVersion),
        Description: cdk.stringToCloudFormation(properties.description),
        Registry: cfnSchemaRegistryPropertyToCloudFormation(properties.registry),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnSchemaPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSchemaProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSchemaProps>();
    ret.addPropertyResult('compatibility', 'Compatibility', cfn_parse.FromCloudFormation.getString(properties.Compatibility));
    ret.addPropertyResult('dataFormat', 'DataFormat', cfn_parse.FromCloudFormation.getString(properties.DataFormat));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('schemaDefinition', 'SchemaDefinition', cfn_parse.FromCloudFormation.getString(properties.SchemaDefinition));
    ret.addPropertyResult('checkpointVersion', 'CheckpointVersion', properties.CheckpointVersion != null ? CfnSchemaSchemaVersionPropertyFromCloudFormation(properties.CheckpointVersion) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('registry', 'Registry', properties.Registry != null ? CfnSchemaRegistryPropertyFromCloudFormation(properties.Registry) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::Schema`
 *
 * The `AWS::Glue::Schema` is an AWS Glue resource type that manages schemas in the AWS Glue Schema Registry.
 *
 * @cloudformationResource AWS::Glue::Schema
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html
 */
export class CfnSchema extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::Schema";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnSchema {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnSchemaPropsFromCloudFormation(resourceProperties);
        const ret = new CfnSchema(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the schema.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     *
     * @cloudformationAttribute InitialSchemaVersionId
     */
    public readonly attrInitialSchemaVersionId: string;

    /**
     * The compatibility mode of the schema.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-compatibility
     */
    public compatibility: string;

    /**
     * The data format of the schema definition. Currently only `AVRO` is supported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-dataformat
     */
    public dataFormat: string;

    /**
     * Name of the schema to be created of max length of 255, and may only contain letters, numbers, hyphen, underscore, dollar sign, or hash mark. No whitespace.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-name
     */
    public name: string;

    /**
     * The schema definition using the `DataFormat` setting for `SchemaName` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-schemadefinition
     */
    public schemaDefinition: string;

    /**
     * Specify the `VersionNumber` or the `IsLatest` for setting the checkpoint for the schema. This is only required for updating a checkpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-checkpointversion
     */
    public checkpointVersion: CfnSchema.SchemaVersionProperty | cdk.IResolvable | undefined;

    /**
     * A description of the schema if specified when created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-description
     */
    public description: string | undefined;

    /**
     * The registry where a schema is stored.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-registry
     */
    public registry: CfnSchema.RegistryProperty | cdk.IResolvable | undefined;

    /**
     * AWS tags that contain a key value pair and may be searched by console, command line, or API.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schema.html#cfn-glue-schema-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Glue::Schema`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnSchemaProps) {
        super(scope, id, { type: CfnSchema.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'compatibility', this);
        cdk.requireProperty(props, 'dataFormat', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'schemaDefinition', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrInitialSchemaVersionId = cdk.Token.asString(this.getAtt('InitialSchemaVersionId'));

        this.compatibility = props.compatibility;
        this.dataFormat = props.dataFormat;
        this.name = props.name;
        this.schemaDefinition = props.schemaDefinition;
        this.checkpointVersion = props.checkpointVersion;
        this.description = props.description;
        this.registry = props.registry;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Glue::Schema", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnSchema.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            compatibility: this.compatibility,
            dataFormat: this.dataFormat,
            name: this.name,
            schemaDefinition: this.schemaDefinition,
            checkpointVersion: this.checkpointVersion,
            description: this.description,
            registry: this.registry,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnSchemaPropsToCloudFormation(props);
    }
}

export namespace CfnSchema {
    /**
     * Specifies a registry in the AWS Glue Schema Registry.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-schema-registry.html
     */
    export interface RegistryProperty {
        /**
         * The Amazon Resource Name (ARN) of the registry.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-schema-registry.html#cfn-glue-schema-registry-arn
         */
        readonly arn?: string;
        /**
         * The name of the registry.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-schema-registry.html#cfn-glue-schema-registry-name
         */
        readonly name?: string;
    }
}

/**
 * Determine whether the given properties match those of a `RegistryProperty`
 *
 * @param properties - the TypeScript properties of a `RegistryProperty`
 *
 * @returns the result of the validation.
 */
function CfnSchema_RegistryPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('arn', cdk.validateString)(properties.arn));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "RegistryProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Schema.Registry` resource
 *
 * @param properties - the TypeScript properties of a `RegistryProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Schema.Registry` resource.
 */
// @ts-ignore TS6133
function cfnSchemaRegistryPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSchema_RegistryPropertyValidator(properties).assertSuccess();
    return {
        Arn: cdk.stringToCloudFormation(properties.arn),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnSchemaRegistryPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSchema.RegistryProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSchema.RegistryProperty>();
    ret.addPropertyResult('arn', 'Arn', properties.Arn != null ? cfn_parse.FromCloudFormation.getString(properties.Arn) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnSchema {
    /**
     * Specifies the version of a schema.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-schema-schemaversion.html
     */
    export interface SchemaVersionProperty {
        /**
         * Indicates if this version is the latest version of the schema.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-schema-schemaversion.html#cfn-glue-schema-schemaversion-islatest
         */
        readonly isLatest?: boolean | cdk.IResolvable;
        /**
         * The version number of the schema.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-schema-schemaversion.html#cfn-glue-schema-schemaversion-versionnumber
         */
        readonly versionNumber?: number;
    }
}

/**
 * Determine whether the given properties match those of a `SchemaVersionProperty`
 *
 * @param properties - the TypeScript properties of a `SchemaVersionProperty`
 *
 * @returns the result of the validation.
 */
function CfnSchema_SchemaVersionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('isLatest', cdk.validateBoolean)(properties.isLatest));
    errors.collect(cdk.propertyValidator('versionNumber', cdk.validateNumber)(properties.versionNumber));
    return errors.wrap('supplied properties not correct for "SchemaVersionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Schema.SchemaVersion` resource
 *
 * @param properties - the TypeScript properties of a `SchemaVersionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Schema.SchemaVersion` resource.
 */
// @ts-ignore TS6133
function cfnSchemaSchemaVersionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSchema_SchemaVersionPropertyValidator(properties).assertSuccess();
    return {
        IsLatest: cdk.booleanToCloudFormation(properties.isLatest),
        VersionNumber: cdk.numberToCloudFormation(properties.versionNumber),
    };
}

// @ts-ignore TS6133
function CfnSchemaSchemaVersionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSchema.SchemaVersionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSchema.SchemaVersionProperty>();
    ret.addPropertyResult('isLatest', 'IsLatest', properties.IsLatest != null ? cfn_parse.FromCloudFormation.getBoolean(properties.IsLatest) : undefined);
    ret.addPropertyResult('versionNumber', 'VersionNumber', properties.VersionNumber != null ? cfn_parse.FromCloudFormation.getNumber(properties.VersionNumber) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnSchemaVersion`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversion.html
 */
export interface CfnSchemaVersionProps {

    /**
     * The schema that includes the schema version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversion.html#cfn-glue-schemaversion-schema
     */
    readonly schema: CfnSchemaVersion.SchemaProperty | cdk.IResolvable;

    /**
     * The schema definition for the schema version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversion.html#cfn-glue-schemaversion-schemadefinition
     */
    readonly schemaDefinition: string;
}

/**
 * Determine whether the given properties match those of a `CfnSchemaVersionProps`
 *
 * @param properties - the TypeScript properties of a `CfnSchemaVersionProps`
 *
 * @returns the result of the validation.
 */
function CfnSchemaVersionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('schema', cdk.requiredValidator)(properties.schema));
    errors.collect(cdk.propertyValidator('schema', CfnSchemaVersion_SchemaPropertyValidator)(properties.schema));
    errors.collect(cdk.propertyValidator('schemaDefinition', cdk.requiredValidator)(properties.schemaDefinition));
    errors.collect(cdk.propertyValidator('schemaDefinition', cdk.validateString)(properties.schemaDefinition));
    return errors.wrap('supplied properties not correct for "CfnSchemaVersionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::SchemaVersion` resource
 *
 * @param properties - the TypeScript properties of a `CfnSchemaVersionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::SchemaVersion` resource.
 */
// @ts-ignore TS6133
function cfnSchemaVersionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSchemaVersionPropsValidator(properties).assertSuccess();
    return {
        Schema: cfnSchemaVersionSchemaPropertyToCloudFormation(properties.schema),
        SchemaDefinition: cdk.stringToCloudFormation(properties.schemaDefinition),
    };
}

// @ts-ignore TS6133
function CfnSchemaVersionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSchemaVersionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSchemaVersionProps>();
    ret.addPropertyResult('schema', 'Schema', CfnSchemaVersionSchemaPropertyFromCloudFormation(properties.Schema));
    ret.addPropertyResult('schemaDefinition', 'SchemaDefinition', cfn_parse.FromCloudFormation.getString(properties.SchemaDefinition));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::SchemaVersion`
 *
 * The `AWS::Glue::SchemaVersion` is an AWS Glue resource type that manages schema versions of schemas in the AWS Glue Schema Registry.
 *
 * @cloudformationResource AWS::Glue::SchemaVersion
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversion.html
 */
export class CfnSchemaVersion extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::SchemaVersion";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnSchemaVersion {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnSchemaVersionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnSchemaVersion(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     *
     * @cloudformationAttribute VersionId
     */
    public readonly attrVersionId: string;

    /**
     * The schema that includes the schema version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversion.html#cfn-glue-schemaversion-schema
     */
    public schema: CfnSchemaVersion.SchemaProperty | cdk.IResolvable;

    /**
     * The schema definition for the schema version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversion.html#cfn-glue-schemaversion-schemadefinition
     */
    public schemaDefinition: string;

    /**
     * Create a new `AWS::Glue::SchemaVersion`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnSchemaVersionProps) {
        super(scope, id, { type: CfnSchemaVersion.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'schema', this);
        cdk.requireProperty(props, 'schemaDefinition', this);
        this.attrVersionId = cdk.Token.asString(this.getAtt('VersionId'));

        this.schema = props.schema;
        this.schemaDefinition = props.schemaDefinition;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnSchemaVersion.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            schema: this.schema,
            schemaDefinition: this.schemaDefinition,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnSchemaVersionPropsToCloudFormation(props);
    }
}

export namespace CfnSchemaVersion {
    /**
     * A wrapper structure to contain schema identity fields. Either `SchemaArn` , or `SchemaName` and `RegistryName` has to be provided.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-schemaversion-schema.html
     */
    export interface SchemaProperty {
        /**
         * The name of the registry where the schema is stored. Either `SchemaArn` , or `SchemaName` and `RegistryName` has to be provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-schemaversion-schema.html#cfn-glue-schemaversion-schema-registryname
         */
        readonly registryName?: string;
        /**
         * The Amazon Resource Name (ARN) of the schema. Either `SchemaArn` , or `SchemaName` and `RegistryName` has to be provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-schemaversion-schema.html#cfn-glue-schemaversion-schema-schemaarn
         */
        readonly schemaArn?: string;
        /**
         * The name of the schema. Either `SchemaArn` , or `SchemaName` and `RegistryName` has to be provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-schemaversion-schema.html#cfn-glue-schemaversion-schema-schemaname
         */
        readonly schemaName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SchemaProperty`
 *
 * @param properties - the TypeScript properties of a `SchemaProperty`
 *
 * @returns the result of the validation.
 */
function CfnSchemaVersion_SchemaPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('registryName', cdk.validateString)(properties.registryName));
    errors.collect(cdk.propertyValidator('schemaArn', cdk.validateString)(properties.schemaArn));
    errors.collect(cdk.propertyValidator('schemaName', cdk.validateString)(properties.schemaName));
    return errors.wrap('supplied properties not correct for "SchemaProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::SchemaVersion.Schema` resource
 *
 * @param properties - the TypeScript properties of a `SchemaProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::SchemaVersion.Schema` resource.
 */
// @ts-ignore TS6133
function cfnSchemaVersionSchemaPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSchemaVersion_SchemaPropertyValidator(properties).assertSuccess();
    return {
        RegistryName: cdk.stringToCloudFormation(properties.registryName),
        SchemaArn: cdk.stringToCloudFormation(properties.schemaArn),
        SchemaName: cdk.stringToCloudFormation(properties.schemaName),
    };
}

// @ts-ignore TS6133
function CfnSchemaVersionSchemaPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSchemaVersion.SchemaProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSchemaVersion.SchemaProperty>();
    ret.addPropertyResult('registryName', 'RegistryName', properties.RegistryName != null ? cfn_parse.FromCloudFormation.getString(properties.RegistryName) : undefined);
    ret.addPropertyResult('schemaArn', 'SchemaArn', properties.SchemaArn != null ? cfn_parse.FromCloudFormation.getString(properties.SchemaArn) : undefined);
    ret.addPropertyResult('schemaName', 'SchemaName', properties.SchemaName != null ? cfn_parse.FromCloudFormation.getString(properties.SchemaName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnSchemaVersionMetadata`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversionmetadata.html
 */
export interface CfnSchemaVersionMetadataProps {

    /**
     * A metadata key in a key-value pair for metadata.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversionmetadata.html#cfn-glue-schemaversionmetadata-key
     */
    readonly key: string;

    /**
     * The version number of the schema.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversionmetadata.html#cfn-glue-schemaversionmetadata-schemaversionid
     */
    readonly schemaVersionId: string;

    /**
     * A metadata key's corresponding value.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversionmetadata.html#cfn-glue-schemaversionmetadata-value
     */
    readonly value: string;
}

/**
 * Determine whether the given properties match those of a `CfnSchemaVersionMetadataProps`
 *
 * @param properties - the TypeScript properties of a `CfnSchemaVersionMetadataProps`
 *
 * @returns the result of the validation.
 */
function CfnSchemaVersionMetadataPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('key', cdk.requiredValidator)(properties.key));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('schemaVersionId', cdk.requiredValidator)(properties.schemaVersionId));
    errors.collect(cdk.propertyValidator('schemaVersionId', cdk.validateString)(properties.schemaVersionId));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "CfnSchemaVersionMetadataProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::SchemaVersionMetadata` resource
 *
 * @param properties - the TypeScript properties of a `CfnSchemaVersionMetadataProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::SchemaVersionMetadata` resource.
 */
// @ts-ignore TS6133
function cfnSchemaVersionMetadataPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSchemaVersionMetadataPropsValidator(properties).assertSuccess();
    return {
        Key: cdk.stringToCloudFormation(properties.key),
        SchemaVersionId: cdk.stringToCloudFormation(properties.schemaVersionId),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnSchemaVersionMetadataPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSchemaVersionMetadataProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSchemaVersionMetadataProps>();
    ret.addPropertyResult('key', 'Key', cfn_parse.FromCloudFormation.getString(properties.Key));
    ret.addPropertyResult('schemaVersionId', 'SchemaVersionId', cfn_parse.FromCloudFormation.getString(properties.SchemaVersionId));
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::SchemaVersionMetadata`
 *
 * The `AWS::Glue::SchemaVersionMetadata` is an AWS Glue resource type that defines the metadata key-value pairs for a schema version in AWS Glue Schema Registry.
 *
 * @cloudformationResource AWS::Glue::SchemaVersionMetadata
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversionmetadata.html
 */
export class CfnSchemaVersionMetadata extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::SchemaVersionMetadata";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnSchemaVersionMetadata {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnSchemaVersionMetadataPropsFromCloudFormation(resourceProperties);
        const ret = new CfnSchemaVersionMetadata(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A metadata key in a key-value pair for metadata.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversionmetadata.html#cfn-glue-schemaversionmetadata-key
     */
    public key: string;

    /**
     * The version number of the schema.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversionmetadata.html#cfn-glue-schemaversionmetadata-schemaversionid
     */
    public schemaVersionId: string;

    /**
     * A metadata key's corresponding value.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-schemaversionmetadata.html#cfn-glue-schemaversionmetadata-value
     */
    public value: string;

    /**
     * Create a new `AWS::Glue::SchemaVersionMetadata`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnSchemaVersionMetadataProps) {
        super(scope, id, { type: CfnSchemaVersionMetadata.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'key', this);
        cdk.requireProperty(props, 'schemaVersionId', this);
        cdk.requireProperty(props, 'value', this);

        this.key = props.key;
        this.schemaVersionId = props.schemaVersionId;
        this.value = props.value;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnSchemaVersionMetadata.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            key: this.key,
            schemaVersionId: this.schemaVersionId,
            value: this.value,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnSchemaVersionMetadataPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnSecurityConfiguration`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-securityconfiguration.html
 */
export interface CfnSecurityConfigurationProps {

    /**
     * The encryption configuration associated with this security configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-securityconfiguration.html#cfn-glue-securityconfiguration-encryptionconfiguration
     */
    readonly encryptionConfiguration: CfnSecurityConfiguration.EncryptionConfigurationProperty | cdk.IResolvable;

    /**
     * The name of the security configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-securityconfiguration.html#cfn-glue-securityconfiguration-name
     */
    readonly name: string;
}

/**
 * Determine whether the given properties match those of a `CfnSecurityConfigurationProps`
 *
 * @param properties - the TypeScript properties of a `CfnSecurityConfigurationProps`
 *
 * @returns the result of the validation.
 */
function CfnSecurityConfigurationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('encryptionConfiguration', cdk.requiredValidator)(properties.encryptionConfiguration));
    errors.collect(cdk.propertyValidator('encryptionConfiguration', CfnSecurityConfiguration_EncryptionConfigurationPropertyValidator)(properties.encryptionConfiguration));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "CfnSecurityConfigurationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::SecurityConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `CfnSecurityConfigurationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::SecurityConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnSecurityConfigurationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSecurityConfigurationPropsValidator(properties).assertSuccess();
    return {
        EncryptionConfiguration: cfnSecurityConfigurationEncryptionConfigurationPropertyToCloudFormation(properties.encryptionConfiguration),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnSecurityConfigurationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSecurityConfigurationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSecurityConfigurationProps>();
    ret.addPropertyResult('encryptionConfiguration', 'EncryptionConfiguration', CfnSecurityConfigurationEncryptionConfigurationPropertyFromCloudFormation(properties.EncryptionConfiguration));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::SecurityConfiguration`
 *
 * Creates a new security configuration. A security configuration is a set of security properties that can be used by AWS Glue . You can use a security configuration to encrypt data at rest. For information about using security configurations in AWS Glue , see [Encrypting Data Written by Crawlers, Jobs, and Development Endpoints](https://docs.aws.amazon.com/glue/latest/dg/encryption-security-configuration.html) .
 *
 * @cloudformationResource AWS::Glue::SecurityConfiguration
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-securityconfiguration.html
 */
export class CfnSecurityConfiguration extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::SecurityConfiguration";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnSecurityConfiguration {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnSecurityConfigurationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnSecurityConfiguration(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The encryption configuration associated with this security configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-securityconfiguration.html#cfn-glue-securityconfiguration-encryptionconfiguration
     */
    public encryptionConfiguration: CfnSecurityConfiguration.EncryptionConfigurationProperty | cdk.IResolvable;

    /**
     * The name of the security configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-securityconfiguration.html#cfn-glue-securityconfiguration-name
     */
    public name: string;

    /**
     * Create a new `AWS::Glue::SecurityConfiguration`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnSecurityConfigurationProps) {
        super(scope, id, { type: CfnSecurityConfiguration.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'encryptionConfiguration', this);
        cdk.requireProperty(props, 'name', this);

        this.encryptionConfiguration = props.encryptionConfiguration;
        this.name = props.name;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnSecurityConfiguration.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            encryptionConfiguration: this.encryptionConfiguration,
            name: this.name,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnSecurityConfigurationPropsToCloudFormation(props);
    }
}

export namespace CfnSecurityConfiguration {
    /**
     * Specifies how Amazon CloudWatch data should be encrypted.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-securityconfiguration-cloudwatchencryption.html
     */
    export interface CloudWatchEncryptionProperty {
        /**
         * The encryption mode to use for CloudWatch data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-securityconfiguration-cloudwatchencryption.html#cfn-glue-securityconfiguration-cloudwatchencryption-cloudwatchencryptionmode
         */
        readonly cloudWatchEncryptionMode?: string;
        /**
         * The Amazon Resource Name (ARN) of the KMS key to be used to encrypt the data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-securityconfiguration-cloudwatchencryption.html#cfn-glue-securityconfiguration-cloudwatchencryption-kmskeyarn
         */
        readonly kmsKeyArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `CloudWatchEncryptionProperty`
 *
 * @param properties - the TypeScript properties of a `CloudWatchEncryptionProperty`
 *
 * @returns the result of the validation.
 */
function CfnSecurityConfiguration_CloudWatchEncryptionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cloudWatchEncryptionMode', cdk.validateString)(properties.cloudWatchEncryptionMode));
    errors.collect(cdk.propertyValidator('kmsKeyArn', cdk.validateString)(properties.kmsKeyArn));
    return errors.wrap('supplied properties not correct for "CloudWatchEncryptionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::SecurityConfiguration.CloudWatchEncryption` resource
 *
 * @param properties - the TypeScript properties of a `CloudWatchEncryptionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::SecurityConfiguration.CloudWatchEncryption` resource.
 */
// @ts-ignore TS6133
function cfnSecurityConfigurationCloudWatchEncryptionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSecurityConfiguration_CloudWatchEncryptionPropertyValidator(properties).assertSuccess();
    return {
        CloudWatchEncryptionMode: cdk.stringToCloudFormation(properties.cloudWatchEncryptionMode),
        KmsKeyArn: cdk.stringToCloudFormation(properties.kmsKeyArn),
    };
}

// @ts-ignore TS6133
function CfnSecurityConfigurationCloudWatchEncryptionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSecurityConfiguration.CloudWatchEncryptionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSecurityConfiguration.CloudWatchEncryptionProperty>();
    ret.addPropertyResult('cloudWatchEncryptionMode', 'CloudWatchEncryptionMode', properties.CloudWatchEncryptionMode != null ? cfn_parse.FromCloudFormation.getString(properties.CloudWatchEncryptionMode) : undefined);
    ret.addPropertyResult('kmsKeyArn', 'KmsKeyArn', properties.KmsKeyArn != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnSecurityConfiguration {
    /**
     * Specifies an encryption configuration.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-securityconfiguration-encryptionconfiguration.html
     */
    export interface EncryptionConfigurationProperty {
        /**
         * The encryption configuration for Amazon CloudWatch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-securityconfiguration-encryptionconfiguration.html#cfn-glue-securityconfiguration-encryptionconfiguration-cloudwatchencryption
         */
        readonly cloudWatchEncryption?: CfnSecurityConfiguration.CloudWatchEncryptionProperty | cdk.IResolvable;
        /**
         * The encryption configuration for job bookmarks.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-securityconfiguration-encryptionconfiguration.html#cfn-glue-securityconfiguration-encryptionconfiguration-jobbookmarksencryption
         */
        readonly jobBookmarksEncryption?: CfnSecurityConfiguration.JobBookmarksEncryptionProperty | cdk.IResolvable;
        /**
         * The encyption configuration for Amazon Simple Storage Service (Amazon S3) data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-securityconfiguration-encryptionconfiguration.html#cfn-glue-securityconfiguration-encryptionconfiguration-s3encryptions
         */
        readonly s3Encryptions?: Array<CfnSecurityConfiguration.S3EncryptionProperty | cdk.IResolvable> | cdk.IResolvable | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `EncryptionConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `EncryptionConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnSecurityConfiguration_EncryptionConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cloudWatchEncryption', CfnSecurityConfiguration_CloudWatchEncryptionPropertyValidator)(properties.cloudWatchEncryption));
    errors.collect(cdk.propertyValidator('jobBookmarksEncryption', CfnSecurityConfiguration_JobBookmarksEncryptionPropertyValidator)(properties.jobBookmarksEncryption));
    errors.collect(cdk.propertyValidator('s3Encryptions', cdk.listValidator(CfnSecurityConfiguration_S3EncryptionPropertyValidator))(properties.s3Encryptions));
    return errors.wrap('supplied properties not correct for "EncryptionConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::SecurityConfiguration.EncryptionConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `EncryptionConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::SecurityConfiguration.EncryptionConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnSecurityConfigurationEncryptionConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSecurityConfiguration_EncryptionConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CloudWatchEncryption: cfnSecurityConfigurationCloudWatchEncryptionPropertyToCloudFormation(properties.cloudWatchEncryption),
        JobBookmarksEncryption: cfnSecurityConfigurationJobBookmarksEncryptionPropertyToCloudFormation(properties.jobBookmarksEncryption),
        S3Encryptions: cdk.listMapper(cfnSecurityConfigurationS3EncryptionPropertyToCloudFormation)(properties.s3Encryptions),
    };
}

// @ts-ignore TS6133
function CfnSecurityConfigurationEncryptionConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSecurityConfiguration.EncryptionConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSecurityConfiguration.EncryptionConfigurationProperty>();
    ret.addPropertyResult('cloudWatchEncryption', 'CloudWatchEncryption', properties.CloudWatchEncryption != null ? CfnSecurityConfigurationCloudWatchEncryptionPropertyFromCloudFormation(properties.CloudWatchEncryption) : undefined);
    ret.addPropertyResult('jobBookmarksEncryption', 'JobBookmarksEncryption', properties.JobBookmarksEncryption != null ? CfnSecurityConfigurationJobBookmarksEncryptionPropertyFromCloudFormation(properties.JobBookmarksEncryption) : undefined);
    ret.addPropertyResult('s3Encryptions', 'S3Encryptions', properties.S3Encryptions != null ? cfn_parse.FromCloudFormation.getArray(CfnSecurityConfigurationS3EncryptionPropertyFromCloudFormation)(properties.S3Encryptions) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnSecurityConfiguration {
    /**
     * Specifies how job bookmark data should be encrypted.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-securityconfiguration-jobbookmarksencryption.html
     */
    export interface JobBookmarksEncryptionProperty {
        /**
         * The encryption mode to use for job bookmarks data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-securityconfiguration-jobbookmarksencryption.html#cfn-glue-securityconfiguration-jobbookmarksencryption-jobbookmarksencryptionmode
         */
        readonly jobBookmarksEncryptionMode?: string;
        /**
         * The Amazon Resource Name (ARN) of the KMS key to be used to encrypt the data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-securityconfiguration-jobbookmarksencryption.html#cfn-glue-securityconfiguration-jobbookmarksencryption-kmskeyarn
         */
        readonly kmsKeyArn?: string;
    }
}

/**
 * Determine whether the given properties match those of a `JobBookmarksEncryptionProperty`
 *
 * @param properties - the TypeScript properties of a `JobBookmarksEncryptionProperty`
 *
 * @returns the result of the validation.
 */
function CfnSecurityConfiguration_JobBookmarksEncryptionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('jobBookmarksEncryptionMode', cdk.validateString)(properties.jobBookmarksEncryptionMode));
    errors.collect(cdk.propertyValidator('kmsKeyArn', cdk.validateString)(properties.kmsKeyArn));
    return errors.wrap('supplied properties not correct for "JobBookmarksEncryptionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::SecurityConfiguration.JobBookmarksEncryption` resource
 *
 * @param properties - the TypeScript properties of a `JobBookmarksEncryptionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::SecurityConfiguration.JobBookmarksEncryption` resource.
 */
// @ts-ignore TS6133
function cfnSecurityConfigurationJobBookmarksEncryptionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSecurityConfiguration_JobBookmarksEncryptionPropertyValidator(properties).assertSuccess();
    return {
        JobBookmarksEncryptionMode: cdk.stringToCloudFormation(properties.jobBookmarksEncryptionMode),
        KmsKeyArn: cdk.stringToCloudFormation(properties.kmsKeyArn),
    };
}

// @ts-ignore TS6133
function CfnSecurityConfigurationJobBookmarksEncryptionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSecurityConfiguration.JobBookmarksEncryptionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSecurityConfiguration.JobBookmarksEncryptionProperty>();
    ret.addPropertyResult('jobBookmarksEncryptionMode', 'JobBookmarksEncryptionMode', properties.JobBookmarksEncryptionMode != null ? cfn_parse.FromCloudFormation.getString(properties.JobBookmarksEncryptionMode) : undefined);
    ret.addPropertyResult('kmsKeyArn', 'KmsKeyArn', properties.KmsKeyArn != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyArn) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnSecurityConfiguration {
    /**
     * Specifies how Amazon Simple Storage Service (Amazon S3) data should be encrypted.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-securityconfiguration-s3encryption.html
     */
    export interface S3EncryptionProperty {
        /**
         * The Amazon Resource Name (ARN) of the KMS key to be used to encrypt the data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-securityconfiguration-s3encryption.html#cfn-glue-securityconfiguration-s3encryption-kmskeyarn
         */
        readonly kmsKeyArn?: string;
        /**
         * The encryption mode to use for Amazon S3 data.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-securityconfiguration-s3encryption.html#cfn-glue-securityconfiguration-s3encryption-s3encryptionmode
         */
        readonly s3EncryptionMode?: string;
    }
}

/**
 * Determine whether the given properties match those of a `S3EncryptionProperty`
 *
 * @param properties - the TypeScript properties of a `S3EncryptionProperty`
 *
 * @returns the result of the validation.
 */
function CfnSecurityConfiguration_S3EncryptionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('kmsKeyArn', cdk.validateString)(properties.kmsKeyArn));
    errors.collect(cdk.propertyValidator('s3EncryptionMode', cdk.validateString)(properties.s3EncryptionMode));
    return errors.wrap('supplied properties not correct for "S3EncryptionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::SecurityConfiguration.S3Encryption` resource
 *
 * @param properties - the TypeScript properties of a `S3EncryptionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::SecurityConfiguration.S3Encryption` resource.
 */
// @ts-ignore TS6133
function cfnSecurityConfigurationS3EncryptionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSecurityConfiguration_S3EncryptionPropertyValidator(properties).assertSuccess();
    return {
        KmsKeyArn: cdk.stringToCloudFormation(properties.kmsKeyArn),
        S3EncryptionMode: cdk.stringToCloudFormation(properties.s3EncryptionMode),
    };
}

// @ts-ignore TS6133
function CfnSecurityConfigurationS3EncryptionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSecurityConfiguration.S3EncryptionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSecurityConfiguration.S3EncryptionProperty>();
    ret.addPropertyResult('kmsKeyArn', 'KmsKeyArn', properties.KmsKeyArn != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyArn) : undefined);
    ret.addPropertyResult('s3EncryptionMode', 'S3EncryptionMode', properties.S3EncryptionMode != null ? cfn_parse.FromCloudFormation.getString(properties.S3EncryptionMode) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnTable`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-table.html
 */
export interface CfnTableProps {

    /**
     * The ID of the Data Catalog in which to create the `Table` . If none is supplied, the AWS account ID is used by default.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-table.html#cfn-glue-table-catalogid
     */
    readonly catalogId: string;

    /**
     * The name of the database where the table metadata resides. For Hive compatibility, this must be all lowercase.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-table.html#cfn-glue-table-databasename
     */
    readonly databaseName: string;

    /**
     * A structure used to define a table.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-table.html#cfn-glue-table-tableinput
     */
    readonly tableInput: CfnTable.TableInputProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnTableProps`
 *
 * @param properties - the TypeScript properties of a `CfnTableProps`
 *
 * @returns the result of the validation.
 */
function CfnTablePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.requiredValidator)(properties.catalogId));
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('databaseName', cdk.requiredValidator)(properties.databaseName));
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    errors.collect(cdk.propertyValidator('tableInput', cdk.requiredValidator)(properties.tableInput));
    errors.collect(cdk.propertyValidator('tableInput', CfnTable_TableInputPropertyValidator)(properties.tableInput));
    return errors.wrap('supplied properties not correct for "CfnTableProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Table` resource
 *
 * @param properties - the TypeScript properties of a `CfnTableProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Table` resource.
 */
// @ts-ignore TS6133
function cfnTablePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTablePropsValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
        TableInput: cfnTableTableInputPropertyToCloudFormation(properties.tableInput),
    };
}

// @ts-ignore TS6133
function CfnTablePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTableProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTableProps>();
    ret.addPropertyResult('catalogId', 'CatalogId', cfn_parse.FromCloudFormation.getString(properties.CatalogId));
    ret.addPropertyResult('databaseName', 'DatabaseName', cfn_parse.FromCloudFormation.getString(properties.DatabaseName));
    ret.addPropertyResult('tableInput', 'TableInput', CfnTableTableInputPropertyFromCloudFormation(properties.TableInput));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::Table`
 *
 * The `AWS::Glue::Table` resource specifies tabular data in the AWS Glue data catalog. For more information, see [Defining Tables in the AWS Glue Data Catalog](https://docs.aws.amazon.com/glue/latest/dg/tables-described.html) and [Table Structure](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-tables.html#aws-glue-api-catalog-tables-Table) in the *AWS Glue Developer Guide* .
 *
 * @cloudformationResource AWS::Glue::Table
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-table.html
 */
export class CfnTable extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::Table";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnTable {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnTablePropsFromCloudFormation(resourceProperties);
        const ret = new CfnTable(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ID of the Data Catalog in which to create the `Table` . If none is supplied, the AWS account ID is used by default.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-table.html#cfn-glue-table-catalogid
     */
    public catalogId: string;

    /**
     * The name of the database where the table metadata resides. For Hive compatibility, this must be all lowercase.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-table.html#cfn-glue-table-databasename
     */
    public databaseName: string;

    /**
     * A structure used to define a table.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-table.html#cfn-glue-table-tableinput
     */
    public tableInput: CfnTable.TableInputProperty | cdk.IResolvable;

    /**
     * Create a new `AWS::Glue::Table`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnTableProps) {
        super(scope, id, { type: CfnTable.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'catalogId', this);
        cdk.requireProperty(props, 'databaseName', this);
        cdk.requireProperty(props, 'tableInput', this);

        this.catalogId = props.catalogId;
        this.databaseName = props.databaseName;
        this.tableInput = props.tableInput;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnTable.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            catalogId: this.catalogId,
            databaseName: this.databaseName,
            tableInput: this.tableInput,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnTablePropsToCloudFormation(props);
    }
}

export namespace CfnTable {
    /**
     * A column in a `Table` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-column.html
     */
    export interface ColumnProperty {
        /**
         * A free-form text comment.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-column.html#cfn-glue-table-column-comment
         */
        readonly comment?: string;
        /**
         * The name of the `Column` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-column.html#cfn-glue-table-column-name
         */
        readonly name: string;
        /**
         * The data type of the `Column` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-column.html#cfn-glue-table-column-type
         */
        readonly type?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ColumnProperty`
 *
 * @param properties - the TypeScript properties of a `ColumnProperty`
 *
 * @returns the result of the validation.
 */
function CfnTable_ColumnPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('comment', cdk.validateString)(properties.comment));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    return errors.wrap('supplied properties not correct for "ColumnProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Table.Column` resource
 *
 * @param properties - the TypeScript properties of a `ColumnProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Table.Column` resource.
 */
// @ts-ignore TS6133
function cfnTableColumnPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTable_ColumnPropertyValidator(properties).assertSuccess();
    return {
        Comment: cdk.stringToCloudFormation(properties.comment),
        Name: cdk.stringToCloudFormation(properties.name),
        Type: cdk.stringToCloudFormation(properties.type),
    };
}

// @ts-ignore TS6133
function CfnTableColumnPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTable.ColumnProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTable.ColumnProperty>();
    ret.addPropertyResult('comment', 'Comment', properties.Comment != null ? cfn_parse.FromCloudFormation.getString(properties.Comment) : undefined);
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('type', 'Type', properties.Type != null ? cfn_parse.FromCloudFormation.getString(properties.Type) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTable {
    /**
     * Specifies the sort order of a sorted column.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-order.html
     */
    export interface OrderProperty {
        /**
         * The name of the column.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-order.html#cfn-glue-table-order-column
         */
        readonly column: string;
        /**
         * Indicates that the column is sorted in ascending order ( `== 1` ), or in descending order ( `==0` ).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-order.html#cfn-glue-table-order-sortorder
         */
        readonly sortOrder: number;
    }
}

/**
 * Determine whether the given properties match those of a `OrderProperty`
 *
 * @param properties - the TypeScript properties of a `OrderProperty`
 *
 * @returns the result of the validation.
 */
function CfnTable_OrderPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('column', cdk.requiredValidator)(properties.column));
    errors.collect(cdk.propertyValidator('column', cdk.validateString)(properties.column));
    errors.collect(cdk.propertyValidator('sortOrder', cdk.requiredValidator)(properties.sortOrder));
    errors.collect(cdk.propertyValidator('sortOrder', cdk.validateNumber)(properties.sortOrder));
    return errors.wrap('supplied properties not correct for "OrderProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Table.Order` resource
 *
 * @param properties - the TypeScript properties of a `OrderProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Table.Order` resource.
 */
// @ts-ignore TS6133
function cfnTableOrderPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTable_OrderPropertyValidator(properties).assertSuccess();
    return {
        Column: cdk.stringToCloudFormation(properties.column),
        SortOrder: cdk.numberToCloudFormation(properties.sortOrder),
    };
}

// @ts-ignore TS6133
function CfnTableOrderPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTable.OrderProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTable.OrderProperty>();
    ret.addPropertyResult('column', 'Column', cfn_parse.FromCloudFormation.getString(properties.Column));
    ret.addPropertyResult('sortOrder', 'SortOrder', cfn_parse.FromCloudFormation.getNumber(properties.SortOrder));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTable {
    /**
     * A structure that contains schema identity fields. Either this or the `SchemaVersionId` has to be
     * provided.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-schemaid.html
     */
    export interface SchemaIdProperty {
        /**
         * The name of the schema registry that contains the schema.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-schemaid.html#cfn-glue-table-schemaid-registryname
         */
        readonly registryName?: string;
        /**
         * The Amazon Resource Name (ARN) of the schema. One of `SchemaArn` or `SchemaName` has to be
         * provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-schemaid.html#cfn-glue-table-schemaid-schemaarn
         */
        readonly schemaArn?: string;
        /**
         * The name of the schema. One of `SchemaArn` or `SchemaName` has to be provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-schemaid.html#cfn-glue-table-schemaid-schemaname
         */
        readonly schemaName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SchemaIdProperty`
 *
 * @param properties - the TypeScript properties of a `SchemaIdProperty`
 *
 * @returns the result of the validation.
 */
function CfnTable_SchemaIdPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('registryName', cdk.validateString)(properties.registryName));
    errors.collect(cdk.propertyValidator('schemaArn', cdk.validateString)(properties.schemaArn));
    errors.collect(cdk.propertyValidator('schemaName', cdk.validateString)(properties.schemaName));
    return errors.wrap('supplied properties not correct for "SchemaIdProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Table.SchemaId` resource
 *
 * @param properties - the TypeScript properties of a `SchemaIdProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Table.SchemaId` resource.
 */
// @ts-ignore TS6133
function cfnTableSchemaIdPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTable_SchemaIdPropertyValidator(properties).assertSuccess();
    return {
        RegistryName: cdk.stringToCloudFormation(properties.registryName),
        SchemaArn: cdk.stringToCloudFormation(properties.schemaArn),
        SchemaName: cdk.stringToCloudFormation(properties.schemaName),
    };
}

// @ts-ignore TS6133
function CfnTableSchemaIdPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTable.SchemaIdProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTable.SchemaIdProperty>();
    ret.addPropertyResult('registryName', 'RegistryName', properties.RegistryName != null ? cfn_parse.FromCloudFormation.getString(properties.RegistryName) : undefined);
    ret.addPropertyResult('schemaArn', 'SchemaArn', properties.SchemaArn != null ? cfn_parse.FromCloudFormation.getString(properties.SchemaArn) : undefined);
    ret.addPropertyResult('schemaName', 'SchemaName', properties.SchemaName != null ? cfn_parse.FromCloudFormation.getString(properties.SchemaName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTable {
    /**
     * An object that references a schema stored in the AWS Glue Schema Registry.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-schemareference.html
     */
    export interface SchemaReferenceProperty {
        /**
         * A structure that contains schema identity fields. Either this or the `SchemaVersionId` has to be
         * provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-schemareference.html#cfn-glue-table-schemareference-schemaid
         */
        readonly schemaId?: CfnTable.SchemaIdProperty | cdk.IResolvable;
        /**
         * The unique ID assigned to a version of the schema. Either this or the `SchemaId` has to be provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-schemareference.html#cfn-glue-table-schemareference-schemaversionid
         */
        readonly schemaVersionId?: string;
        /**
         * The version number of the schema.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-schemareference.html#cfn-glue-table-schemareference-schemaversionnumber
         */
        readonly schemaVersionNumber?: number;
    }
}

/**
 * Determine whether the given properties match those of a `SchemaReferenceProperty`
 *
 * @param properties - the TypeScript properties of a `SchemaReferenceProperty`
 *
 * @returns the result of the validation.
 */
function CfnTable_SchemaReferencePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('schemaId', CfnTable_SchemaIdPropertyValidator)(properties.schemaId));
    errors.collect(cdk.propertyValidator('schemaVersionId', cdk.validateString)(properties.schemaVersionId));
    errors.collect(cdk.propertyValidator('schemaVersionNumber', cdk.validateNumber)(properties.schemaVersionNumber));
    return errors.wrap('supplied properties not correct for "SchemaReferenceProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Table.SchemaReference` resource
 *
 * @param properties - the TypeScript properties of a `SchemaReferenceProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Table.SchemaReference` resource.
 */
// @ts-ignore TS6133
function cfnTableSchemaReferencePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTable_SchemaReferencePropertyValidator(properties).assertSuccess();
    return {
        SchemaId: cfnTableSchemaIdPropertyToCloudFormation(properties.schemaId),
        SchemaVersionId: cdk.stringToCloudFormation(properties.schemaVersionId),
        SchemaVersionNumber: cdk.numberToCloudFormation(properties.schemaVersionNumber),
    };
}

// @ts-ignore TS6133
function CfnTableSchemaReferencePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTable.SchemaReferenceProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTable.SchemaReferenceProperty>();
    ret.addPropertyResult('schemaId', 'SchemaId', properties.SchemaId != null ? CfnTableSchemaIdPropertyFromCloudFormation(properties.SchemaId) : undefined);
    ret.addPropertyResult('schemaVersionId', 'SchemaVersionId', properties.SchemaVersionId != null ? cfn_parse.FromCloudFormation.getString(properties.SchemaVersionId) : undefined);
    ret.addPropertyResult('schemaVersionNumber', 'SchemaVersionNumber', properties.SchemaVersionNumber != null ? cfn_parse.FromCloudFormation.getNumber(properties.SchemaVersionNumber) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTable {
    /**
     * Information about a serialization/deserialization program (SerDe) that serves as an extractor and loader.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-serdeinfo.html
     */
    export interface SerdeInfoProperty {
        /**
         * Name of the SerDe.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-serdeinfo.html#cfn-glue-table-serdeinfo-name
         */
        readonly name?: string;
        /**
         * These key-value pairs define initialization parameters for the SerDe.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-serdeinfo.html#cfn-glue-table-serdeinfo-parameters
         */
        readonly parameters?: any | cdk.IResolvable;
        /**
         * Usually the class that implements the SerDe. An example is `org.apache.hadoop.hive.serde2.columnar.ColumnarSerDe` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-serdeinfo.html#cfn-glue-table-serdeinfo-serializationlibrary
         */
        readonly serializationLibrary?: string;
    }
}

/**
 * Determine whether the given properties match those of a `SerdeInfoProperty`
 *
 * @param properties - the TypeScript properties of a `SerdeInfoProperty`
 *
 * @returns the result of the validation.
 */
function CfnTable_SerdeInfoPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('parameters', cdk.validateObject)(properties.parameters));
    errors.collect(cdk.propertyValidator('serializationLibrary', cdk.validateString)(properties.serializationLibrary));
    return errors.wrap('supplied properties not correct for "SerdeInfoProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Table.SerdeInfo` resource
 *
 * @param properties - the TypeScript properties of a `SerdeInfoProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Table.SerdeInfo` resource.
 */
// @ts-ignore TS6133
function cfnTableSerdeInfoPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTable_SerdeInfoPropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Parameters: cdk.objectToCloudFormation(properties.parameters),
        SerializationLibrary: cdk.stringToCloudFormation(properties.serializationLibrary),
    };
}

// @ts-ignore TS6133
function CfnTableSerdeInfoPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTable.SerdeInfoProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTable.SerdeInfoProperty>();
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? cfn_parse.FromCloudFormation.getAny(properties.Parameters) : undefined);
    ret.addPropertyResult('serializationLibrary', 'SerializationLibrary', properties.SerializationLibrary != null ? cfn_parse.FromCloudFormation.getString(properties.SerializationLibrary) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTable {
    /**
     * Specifies skewed values in a table. Skewed values are those that occur with very high frequency.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-skewedinfo.html
     */
    export interface SkewedInfoProperty {
        /**
         * A list of names of columns that contain skewed values.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-skewedinfo.html#cfn-glue-table-skewedinfo-skewedcolumnnames
         */
        readonly skewedColumnNames?: string[];
        /**
         * A mapping of skewed values to the columns that contain them.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-skewedinfo.html#cfn-glue-table-skewedinfo-skewedcolumnvaluelocationmaps
         */
        readonly skewedColumnValueLocationMaps?: any | cdk.IResolvable;
        /**
         * A list of values that appear so frequently as to be considered skewed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-skewedinfo.html#cfn-glue-table-skewedinfo-skewedcolumnvalues
         */
        readonly skewedColumnValues?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `SkewedInfoProperty`
 *
 * @param properties - the TypeScript properties of a `SkewedInfoProperty`
 *
 * @returns the result of the validation.
 */
function CfnTable_SkewedInfoPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('skewedColumnNames', cdk.listValidator(cdk.validateString))(properties.skewedColumnNames));
    errors.collect(cdk.propertyValidator('skewedColumnValueLocationMaps', cdk.validateObject)(properties.skewedColumnValueLocationMaps));
    errors.collect(cdk.propertyValidator('skewedColumnValues', cdk.listValidator(cdk.validateString))(properties.skewedColumnValues));
    return errors.wrap('supplied properties not correct for "SkewedInfoProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Table.SkewedInfo` resource
 *
 * @param properties - the TypeScript properties of a `SkewedInfoProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Table.SkewedInfo` resource.
 */
// @ts-ignore TS6133
function cfnTableSkewedInfoPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTable_SkewedInfoPropertyValidator(properties).assertSuccess();
    return {
        SkewedColumnNames: cdk.listMapper(cdk.stringToCloudFormation)(properties.skewedColumnNames),
        SkewedColumnValueLocationMaps: cdk.objectToCloudFormation(properties.skewedColumnValueLocationMaps),
        SkewedColumnValues: cdk.listMapper(cdk.stringToCloudFormation)(properties.skewedColumnValues),
    };
}

// @ts-ignore TS6133
function CfnTableSkewedInfoPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTable.SkewedInfoProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTable.SkewedInfoProperty>();
    ret.addPropertyResult('skewedColumnNames', 'SkewedColumnNames', properties.SkewedColumnNames != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SkewedColumnNames) : undefined);
    ret.addPropertyResult('skewedColumnValueLocationMaps', 'SkewedColumnValueLocationMaps', properties.SkewedColumnValueLocationMaps != null ? cfn_parse.FromCloudFormation.getAny(properties.SkewedColumnValueLocationMaps) : undefined);
    ret.addPropertyResult('skewedColumnValues', 'SkewedColumnValues', properties.SkewedColumnValues != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SkewedColumnValues) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTable {
    /**
     * Describes the physical storage of table data.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-storagedescriptor.html
     */
    export interface StorageDescriptorProperty {
        /**
         * A list of reducer grouping columns, clustering columns, and bucketing columns in the table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-storagedescriptor.html#cfn-glue-table-storagedescriptor-bucketcolumns
         */
        readonly bucketColumns?: string[];
        /**
         * A list of the `Columns` in the table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-storagedescriptor.html#cfn-glue-table-storagedescriptor-columns
         */
        readonly columns?: Array<CfnTable.ColumnProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `True` if the data in the table is compressed, or `False` if not.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-storagedescriptor.html#cfn-glue-table-storagedescriptor-compressed
         */
        readonly compressed?: boolean | cdk.IResolvable;
        /**
         * The input format: `SequenceFileInputFormat` (binary), or `TextInputFormat` , or a custom format.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-storagedescriptor.html#cfn-glue-table-storagedescriptor-inputformat
         */
        readonly inputFormat?: string;
        /**
         * The physical location of the table. By default, this takes the form of the warehouse location, followed by the database location in the warehouse, followed by the table name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-storagedescriptor.html#cfn-glue-table-storagedescriptor-location
         */
        readonly location?: string;
        /**
         * Must be specified if the table contains any dimension columns.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-storagedescriptor.html#cfn-glue-table-storagedescriptor-numberofbuckets
         */
        readonly numberOfBuckets?: number;
        /**
         * The output format: `SequenceFileOutputFormat` (binary), or `IgnoreKeyTextOutputFormat` , or a custom format.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-storagedescriptor.html#cfn-glue-table-storagedescriptor-outputformat
         */
        readonly outputFormat?: string;
        /**
         * The user-supplied properties in key-value form.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-storagedescriptor.html#cfn-glue-table-storagedescriptor-parameters
         */
        readonly parameters?: any | cdk.IResolvable;
        /**
         * An object that references a schema stored in the AWS Glue Schema Registry.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-storagedescriptor.html#cfn-glue-table-storagedescriptor-schemareference
         */
        readonly schemaReference?: CfnTable.SchemaReferenceProperty | cdk.IResolvable;
        /**
         * The serialization/deserialization (SerDe) information.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-storagedescriptor.html#cfn-glue-table-storagedescriptor-serdeinfo
         */
        readonly serdeInfo?: CfnTable.SerdeInfoProperty | cdk.IResolvable;
        /**
         * The information about values that appear frequently in a column (skewed values).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-storagedescriptor.html#cfn-glue-table-storagedescriptor-skewedinfo
         */
        readonly skewedInfo?: CfnTable.SkewedInfoProperty | cdk.IResolvable;
        /**
         * A list specifying the sort order of each bucket in the table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-storagedescriptor.html#cfn-glue-table-storagedescriptor-sortcolumns
         */
        readonly sortColumns?: Array<CfnTable.OrderProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * `True` if the table data is stored in subdirectories, or `False` if not.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-storagedescriptor.html#cfn-glue-table-storagedescriptor-storedassubdirectories
         */
        readonly storedAsSubDirectories?: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `StorageDescriptorProperty`
 *
 * @param properties - the TypeScript properties of a `StorageDescriptorProperty`
 *
 * @returns the result of the validation.
 */
function CfnTable_StorageDescriptorPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketColumns', cdk.listValidator(cdk.validateString))(properties.bucketColumns));
    errors.collect(cdk.propertyValidator('columns', cdk.listValidator(CfnTable_ColumnPropertyValidator))(properties.columns));
    errors.collect(cdk.propertyValidator('compressed', cdk.validateBoolean)(properties.compressed));
    errors.collect(cdk.propertyValidator('inputFormat', cdk.validateString)(properties.inputFormat));
    errors.collect(cdk.propertyValidator('location', cdk.validateString)(properties.location));
    errors.collect(cdk.propertyValidator('numberOfBuckets', cdk.validateNumber)(properties.numberOfBuckets));
    errors.collect(cdk.propertyValidator('outputFormat', cdk.validateString)(properties.outputFormat));
    errors.collect(cdk.propertyValidator('parameters', cdk.validateObject)(properties.parameters));
    errors.collect(cdk.propertyValidator('schemaReference', CfnTable_SchemaReferencePropertyValidator)(properties.schemaReference));
    errors.collect(cdk.propertyValidator('serdeInfo', CfnTable_SerdeInfoPropertyValidator)(properties.serdeInfo));
    errors.collect(cdk.propertyValidator('skewedInfo', CfnTable_SkewedInfoPropertyValidator)(properties.skewedInfo));
    errors.collect(cdk.propertyValidator('sortColumns', cdk.listValidator(CfnTable_OrderPropertyValidator))(properties.sortColumns));
    errors.collect(cdk.propertyValidator('storedAsSubDirectories', cdk.validateBoolean)(properties.storedAsSubDirectories));
    return errors.wrap('supplied properties not correct for "StorageDescriptorProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Table.StorageDescriptor` resource
 *
 * @param properties - the TypeScript properties of a `StorageDescriptorProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Table.StorageDescriptor` resource.
 */
// @ts-ignore TS6133
function cfnTableStorageDescriptorPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTable_StorageDescriptorPropertyValidator(properties).assertSuccess();
    return {
        BucketColumns: cdk.listMapper(cdk.stringToCloudFormation)(properties.bucketColumns),
        Columns: cdk.listMapper(cfnTableColumnPropertyToCloudFormation)(properties.columns),
        Compressed: cdk.booleanToCloudFormation(properties.compressed),
        InputFormat: cdk.stringToCloudFormation(properties.inputFormat),
        Location: cdk.stringToCloudFormation(properties.location),
        NumberOfBuckets: cdk.numberToCloudFormation(properties.numberOfBuckets),
        OutputFormat: cdk.stringToCloudFormation(properties.outputFormat),
        Parameters: cdk.objectToCloudFormation(properties.parameters),
        SchemaReference: cfnTableSchemaReferencePropertyToCloudFormation(properties.schemaReference),
        SerdeInfo: cfnTableSerdeInfoPropertyToCloudFormation(properties.serdeInfo),
        SkewedInfo: cfnTableSkewedInfoPropertyToCloudFormation(properties.skewedInfo),
        SortColumns: cdk.listMapper(cfnTableOrderPropertyToCloudFormation)(properties.sortColumns),
        StoredAsSubDirectories: cdk.booleanToCloudFormation(properties.storedAsSubDirectories),
    };
}

// @ts-ignore TS6133
function CfnTableStorageDescriptorPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTable.StorageDescriptorProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTable.StorageDescriptorProperty>();
    ret.addPropertyResult('bucketColumns', 'BucketColumns', properties.BucketColumns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.BucketColumns) : undefined);
    ret.addPropertyResult('columns', 'Columns', properties.Columns != null ? cfn_parse.FromCloudFormation.getArray(CfnTableColumnPropertyFromCloudFormation)(properties.Columns) : undefined);
    ret.addPropertyResult('compressed', 'Compressed', properties.Compressed != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Compressed) : undefined);
    ret.addPropertyResult('inputFormat', 'InputFormat', properties.InputFormat != null ? cfn_parse.FromCloudFormation.getString(properties.InputFormat) : undefined);
    ret.addPropertyResult('location', 'Location', properties.Location != null ? cfn_parse.FromCloudFormation.getString(properties.Location) : undefined);
    ret.addPropertyResult('numberOfBuckets', 'NumberOfBuckets', properties.NumberOfBuckets != null ? cfn_parse.FromCloudFormation.getNumber(properties.NumberOfBuckets) : undefined);
    ret.addPropertyResult('outputFormat', 'OutputFormat', properties.OutputFormat != null ? cfn_parse.FromCloudFormation.getString(properties.OutputFormat) : undefined);
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? cfn_parse.FromCloudFormation.getAny(properties.Parameters) : undefined);
    ret.addPropertyResult('schemaReference', 'SchemaReference', properties.SchemaReference != null ? CfnTableSchemaReferencePropertyFromCloudFormation(properties.SchemaReference) : undefined);
    ret.addPropertyResult('serdeInfo', 'SerdeInfo', properties.SerdeInfo != null ? CfnTableSerdeInfoPropertyFromCloudFormation(properties.SerdeInfo) : undefined);
    ret.addPropertyResult('skewedInfo', 'SkewedInfo', properties.SkewedInfo != null ? CfnTableSkewedInfoPropertyFromCloudFormation(properties.SkewedInfo) : undefined);
    ret.addPropertyResult('sortColumns', 'SortColumns', properties.SortColumns != null ? cfn_parse.FromCloudFormation.getArray(CfnTableOrderPropertyFromCloudFormation)(properties.SortColumns) : undefined);
    ret.addPropertyResult('storedAsSubDirectories', 'StoredAsSubDirectories', properties.StoredAsSubDirectories != null ? cfn_parse.FromCloudFormation.getBoolean(properties.StoredAsSubDirectories) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTable {
    /**
     * A structure that describes a target table for resource linking.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableidentifier.html
     */
    export interface TableIdentifierProperty {
        /**
         * The ID of the Data Catalog in which the table resides.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableidentifier.html#cfn-glue-table-tableidentifier-catalogid
         */
        readonly catalogId?: string;
        /**
         * The name of the catalog database that contains the target table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableidentifier.html#cfn-glue-table-tableidentifier-databasename
         */
        readonly databaseName?: string;
        /**
         * The name of the target table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableidentifier.html#cfn-glue-table-tableidentifier-name
         */
        readonly name?: string;
    }
}

/**
 * Determine whether the given properties match those of a `TableIdentifierProperty`
 *
 * @param properties - the TypeScript properties of a `TableIdentifierProperty`
 *
 * @returns the result of the validation.
 */
function CfnTable_TableIdentifierPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('catalogId', cdk.validateString)(properties.catalogId));
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "TableIdentifierProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Table.TableIdentifier` resource
 *
 * @param properties - the TypeScript properties of a `TableIdentifierProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Table.TableIdentifier` resource.
 */
// @ts-ignore TS6133
function cfnTableTableIdentifierPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTable_TableIdentifierPropertyValidator(properties).assertSuccess();
    return {
        CatalogId: cdk.stringToCloudFormation(properties.catalogId),
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnTableTableIdentifierPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTable.TableIdentifierProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTable.TableIdentifierProperty>();
    ret.addPropertyResult('catalogId', 'CatalogId', properties.CatalogId != null ? cfn_parse.FromCloudFormation.getString(properties.CatalogId) : undefined);
    ret.addPropertyResult('databaseName', 'DatabaseName', properties.DatabaseName != null ? cfn_parse.FromCloudFormation.getString(properties.DatabaseName) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTable {
    /**
     * A structure used to define a table.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableinput.html
     */
    export interface TableInputProperty {
        /**
         * A description of the table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableinput.html#cfn-glue-table-tableinput-description
         */
        readonly description?: string;
        /**
         * The table name. For Hive compatibility, this is folded to lowercase when it is stored.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableinput.html#cfn-glue-table-tableinput-name
         */
        readonly name?: string;
        /**
         * The table owner.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableinput.html#cfn-glue-table-tableinput-owner
         */
        readonly owner?: string;
        /**
         * These key-value pairs define properties associated with the table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableinput.html#cfn-glue-table-tableinput-parameters
         */
        readonly parameters?: any | cdk.IResolvable;
        /**
         * A list of columns by which the table is partitioned. Only primitive types are supported as partition keys.
         *
         * When you create a table used by Amazon Athena, and you do not specify any `partitionKeys` , you must at least set the value of `partitionKeys` to an empty list. For example:
         *
         * `"PartitionKeys": []`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableinput.html#cfn-glue-table-tableinput-partitionkeys
         */
        readonly partitionKeys?: Array<CfnTable.ColumnProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The retention time for this table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableinput.html#cfn-glue-table-tableinput-retention
         */
        readonly retention?: number;
        /**
         * A storage descriptor containing information about the physical storage of this table.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableinput.html#cfn-glue-table-tableinput-storagedescriptor
         */
        readonly storageDescriptor?: CfnTable.StorageDescriptorProperty | cdk.IResolvable;
        /**
         * The type of this table ( `EXTERNAL_TABLE` , `VIRTUAL_VIEW` , etc.).
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableinput.html#cfn-glue-table-tableinput-tabletype
         */
        readonly tableType?: string;
        /**
         * A `TableIdentifier` structure that describes a target table for resource linking.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableinput.html#cfn-glue-table-tableinput-targettable
         */
        readonly targetTable?: CfnTable.TableIdentifierProperty | cdk.IResolvable;
        /**
         * If the table is a view, the expanded text of the view; otherwise `null` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableinput.html#cfn-glue-table-tableinput-viewexpandedtext
         */
        readonly viewExpandedText?: string;
        /**
         * If the table is a view, the original text of the view; otherwise `null` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-table-tableinput.html#cfn-glue-table-tableinput-vieworiginaltext
         */
        readonly viewOriginalText?: string;
    }
}

/**
 * Determine whether the given properties match those of a `TableInputProperty`
 *
 * @param properties - the TypeScript properties of a `TableInputProperty`
 *
 * @returns the result of the validation.
 */
function CfnTable_TableInputPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('owner', cdk.validateString)(properties.owner));
    errors.collect(cdk.propertyValidator('parameters', cdk.validateObject)(properties.parameters));
    errors.collect(cdk.propertyValidator('partitionKeys', cdk.listValidator(CfnTable_ColumnPropertyValidator))(properties.partitionKeys));
    errors.collect(cdk.propertyValidator('retention', cdk.validateNumber)(properties.retention));
    errors.collect(cdk.propertyValidator('storageDescriptor', CfnTable_StorageDescriptorPropertyValidator)(properties.storageDescriptor));
    errors.collect(cdk.propertyValidator('tableType', cdk.validateString)(properties.tableType));
    errors.collect(cdk.propertyValidator('targetTable', CfnTable_TableIdentifierPropertyValidator)(properties.targetTable));
    errors.collect(cdk.propertyValidator('viewExpandedText', cdk.validateString)(properties.viewExpandedText));
    errors.collect(cdk.propertyValidator('viewOriginalText', cdk.validateString)(properties.viewOriginalText));
    return errors.wrap('supplied properties not correct for "TableInputProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Table.TableInput` resource
 *
 * @param properties - the TypeScript properties of a `TableInputProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Table.TableInput` resource.
 */
// @ts-ignore TS6133
function cfnTableTableInputPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTable_TableInputPropertyValidator(properties).assertSuccess();
    return {
        Description: cdk.stringToCloudFormation(properties.description),
        Name: cdk.stringToCloudFormation(properties.name),
        Owner: cdk.stringToCloudFormation(properties.owner),
        Parameters: cdk.objectToCloudFormation(properties.parameters),
        PartitionKeys: cdk.listMapper(cfnTableColumnPropertyToCloudFormation)(properties.partitionKeys),
        Retention: cdk.numberToCloudFormation(properties.retention),
        StorageDescriptor: cfnTableStorageDescriptorPropertyToCloudFormation(properties.storageDescriptor),
        TableType: cdk.stringToCloudFormation(properties.tableType),
        TargetTable: cfnTableTableIdentifierPropertyToCloudFormation(properties.targetTable),
        ViewExpandedText: cdk.stringToCloudFormation(properties.viewExpandedText),
        ViewOriginalText: cdk.stringToCloudFormation(properties.viewOriginalText),
    };
}

// @ts-ignore TS6133
function CfnTableTableInputPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTable.TableInputProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTable.TableInputProperty>();
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('owner', 'Owner', properties.Owner != null ? cfn_parse.FromCloudFormation.getString(properties.Owner) : undefined);
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? cfn_parse.FromCloudFormation.getAny(properties.Parameters) : undefined);
    ret.addPropertyResult('partitionKeys', 'PartitionKeys', properties.PartitionKeys != null ? cfn_parse.FromCloudFormation.getArray(CfnTableColumnPropertyFromCloudFormation)(properties.PartitionKeys) : undefined);
    ret.addPropertyResult('retention', 'Retention', properties.Retention != null ? cfn_parse.FromCloudFormation.getNumber(properties.Retention) : undefined);
    ret.addPropertyResult('storageDescriptor', 'StorageDescriptor', properties.StorageDescriptor != null ? CfnTableStorageDescriptorPropertyFromCloudFormation(properties.StorageDescriptor) : undefined);
    ret.addPropertyResult('tableType', 'TableType', properties.TableType != null ? cfn_parse.FromCloudFormation.getString(properties.TableType) : undefined);
    ret.addPropertyResult('targetTable', 'TargetTable', properties.TargetTable != null ? CfnTableTableIdentifierPropertyFromCloudFormation(properties.TargetTable) : undefined);
    ret.addPropertyResult('viewExpandedText', 'ViewExpandedText', properties.ViewExpandedText != null ? cfn_parse.FromCloudFormation.getString(properties.ViewExpandedText) : undefined);
    ret.addPropertyResult('viewOriginalText', 'ViewOriginalText', properties.ViewOriginalText != null ? cfn_parse.FromCloudFormation.getString(properties.ViewOriginalText) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnTrigger`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html
 */
export interface CfnTriggerProps {

    /**
     * The actions initiated by this trigger.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-actions
     */
    readonly actions: Array<CfnTrigger.ActionProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The type of trigger that this is.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-type
     */
    readonly type: string;

    /**
     * A description of this trigger.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-description
     */
    readonly description?: string;

    /**
     * The name of the trigger.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-name
     */
    readonly name?: string;

    /**
     * The predicate of this trigger, which defines when it will fire.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-predicate
     */
    readonly predicate?: CfnTrigger.PredicateProperty | cdk.IResolvable;

    /**
     * A `cron` expression used to specify the schedule. For more information, see [Time-Based Schedules for Jobs and Crawlers](https://docs.aws.amazon.com/glue/latest/dg/monitor-data-warehouse-schedule.html) in the *AWS Glue Developer Guide* . For example, to run something every day at 12:15 UTC, specify `cron(15 12 * * ? *)` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-schedule
     */
    readonly schedule?: string;

    /**
     * Set to true to start `SCHEDULED` and `CONDITIONAL` triggers when created. True is not supported for `ON_DEMAND` triggers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-startoncreation
     */
    readonly startOnCreation?: boolean | cdk.IResolvable;

    /**
     * The tags to use with this trigger.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-tags
     */
    readonly tags?: any;

    /**
     * The name of the workflow associated with the trigger.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-workflowname
     */
    readonly workflowName?: string;
}

/**
 * Determine whether the given properties match those of a `CfnTriggerProps`
 *
 * @param properties - the TypeScript properties of a `CfnTriggerProps`
 *
 * @returns the result of the validation.
 */
function CfnTriggerPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('actions', cdk.requiredValidator)(properties.actions));
    errors.collect(cdk.propertyValidator('actions', cdk.listValidator(CfnTrigger_ActionPropertyValidator))(properties.actions));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('predicate', CfnTrigger_PredicatePropertyValidator)(properties.predicate));
    errors.collect(cdk.propertyValidator('schedule', cdk.validateString)(properties.schedule));
    errors.collect(cdk.propertyValidator('startOnCreation', cdk.validateBoolean)(properties.startOnCreation));
    errors.collect(cdk.propertyValidator('tags', cdk.validateObject)(properties.tags));
    errors.collect(cdk.propertyValidator('type', cdk.requiredValidator)(properties.type));
    errors.collect(cdk.propertyValidator('type', cdk.validateString)(properties.type));
    errors.collect(cdk.propertyValidator('workflowName', cdk.validateString)(properties.workflowName));
    return errors.wrap('supplied properties not correct for "CfnTriggerProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Trigger` resource
 *
 * @param properties - the TypeScript properties of a `CfnTriggerProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Trigger` resource.
 */
// @ts-ignore TS6133
function cfnTriggerPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTriggerPropsValidator(properties).assertSuccess();
    return {
        Actions: cdk.listMapper(cfnTriggerActionPropertyToCloudFormation)(properties.actions),
        Type: cdk.stringToCloudFormation(properties.type),
        Description: cdk.stringToCloudFormation(properties.description),
        Name: cdk.stringToCloudFormation(properties.name),
        Predicate: cfnTriggerPredicatePropertyToCloudFormation(properties.predicate),
        Schedule: cdk.stringToCloudFormation(properties.schedule),
        StartOnCreation: cdk.booleanToCloudFormation(properties.startOnCreation),
        Tags: cdk.objectToCloudFormation(properties.tags),
        WorkflowName: cdk.stringToCloudFormation(properties.workflowName),
    };
}

// @ts-ignore TS6133
function CfnTriggerPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTriggerProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTriggerProps>();
    ret.addPropertyResult('actions', 'Actions', cfn_parse.FromCloudFormation.getArray(CfnTriggerActionPropertyFromCloudFormation)(properties.Actions));
    ret.addPropertyResult('type', 'Type', cfn_parse.FromCloudFormation.getString(properties.Type));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('predicate', 'Predicate', properties.Predicate != null ? CfnTriggerPredicatePropertyFromCloudFormation(properties.Predicate) : undefined);
    ret.addPropertyResult('schedule', 'Schedule', properties.Schedule != null ? cfn_parse.FromCloudFormation.getString(properties.Schedule) : undefined);
    ret.addPropertyResult('startOnCreation', 'StartOnCreation', properties.StartOnCreation != null ? cfn_parse.FromCloudFormation.getBoolean(properties.StartOnCreation) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getAny(properties.Tags) : undefined as any);
    ret.addPropertyResult('workflowName', 'WorkflowName', properties.WorkflowName != null ? cfn_parse.FromCloudFormation.getString(properties.WorkflowName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::Trigger`
 *
 * The `AWS::Glue::Trigger` resource specifies triggers that run AWS Glue jobs. For more information, see [Triggering Jobs in AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/trigger-job.html) and [Trigger Structure](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-jobs-trigger.html#aws-glue-api-jobs-trigger-Trigger) in the *AWS Glue Developer Guide* .
 *
 * @cloudformationResource AWS::Glue::Trigger
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html
 */
export class CfnTrigger extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::Trigger";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnTrigger {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnTriggerPropsFromCloudFormation(resourceProperties);
        const ret = new CfnTrigger(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The actions initiated by this trigger.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-actions
     */
    public actions: Array<CfnTrigger.ActionProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The type of trigger that this is.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-type
     */
    public type: string;

    /**
     * A description of this trigger.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-description
     */
    public description: string | undefined;

    /**
     * The name of the trigger.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-name
     */
    public name: string | undefined;

    /**
     * The predicate of this trigger, which defines when it will fire.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-predicate
     */
    public predicate: CfnTrigger.PredicateProperty | cdk.IResolvable | undefined;

    /**
     * A `cron` expression used to specify the schedule. For more information, see [Time-Based Schedules for Jobs and Crawlers](https://docs.aws.amazon.com/glue/latest/dg/monitor-data-warehouse-schedule.html) in the *AWS Glue Developer Guide* . For example, to run something every day at 12:15 UTC, specify `cron(15 12 * * ? *)` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-schedule
     */
    public schedule: string | undefined;

    /**
     * Set to true to start `SCHEDULED` and `CONDITIONAL` triggers when created. True is not supported for `ON_DEMAND` triggers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-startoncreation
     */
    public startOnCreation: boolean | cdk.IResolvable | undefined;

    /**
     * The tags to use with this trigger.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The name of the workflow associated with the trigger.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-trigger.html#cfn-glue-trigger-workflowname
     */
    public workflowName: string | undefined;

    /**
     * Create a new `AWS::Glue::Trigger`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnTriggerProps) {
        super(scope, id, { type: CfnTrigger.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'actions', this);
        cdk.requireProperty(props, 'type', this);

        this.actions = props.actions;
        this.type = props.type;
        this.description = props.description;
        this.name = props.name;
        this.predicate = props.predicate;
        this.schedule = props.schedule;
        this.startOnCreation = props.startOnCreation;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::Glue::Trigger", props.tags, { tagPropertyName: 'tags' });
        this.workflowName = props.workflowName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnTrigger.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            actions: this.actions,
            type: this.type,
            description: this.description,
            name: this.name,
            predicate: this.predicate,
            schedule: this.schedule,
            startOnCreation: this.startOnCreation,
            tags: this.tags.renderTags(),
            workflowName: this.workflowName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnTriggerPropsToCloudFormation(props);
    }
}

export namespace CfnTrigger {
    /**
     * Defines an action to be initiated by a trigger.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-action.html
     */
    export interface ActionProperty {
        /**
         * The job arguments used when this trigger fires. For this job run, they replace the default arguments set in the job definition itself.
         *
         * You can specify arguments here that your own job-execution script consumes, in addition to arguments that AWS Glue itself consumes.
         *
         * For information about how to specify and consume your own job arguments, see [Calling AWS Glue APIs in Python](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-python-calling.html) in the *AWS Glue Developer Guide* .
         *
         * For information about the key-value pairs that AWS Glue consumes to set up your job, see the [Special Parameters Used by AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-glue-arguments.html) topic in the developer guide.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-action.html#cfn-glue-trigger-action-arguments
         */
        readonly arguments?: any | cdk.IResolvable;
        /**
         * The name of the crawler to be used with this action.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-action.html#cfn-glue-trigger-action-crawlername
         */
        readonly crawlerName?: string;
        /**
         * The name of a job to be executed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-action.html#cfn-glue-trigger-action-jobname
         */
        readonly jobName?: string;
        /**
         * Specifies configuration properties of a job run notification.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-action.html#cfn-glue-trigger-action-notificationproperty
         */
        readonly notificationProperty?: CfnTrigger.NotificationPropertyProperty | cdk.IResolvable;
        /**
         * The name of the `SecurityConfiguration` structure to be used with this action.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-action.html#cfn-glue-trigger-action-securityconfiguration
         */
        readonly securityConfiguration?: string;
        /**
         * The `JobRun` timeout in minutes. This is the maximum time that a job run can consume resources before it is terminated and enters TIMEOUT status. The default is 2,880 minutes (48 hours). This overrides the timeout value set in the parent job.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-action.html#cfn-glue-trigger-action-timeout
         */
        readonly timeout?: number;
    }
}

/**
 * Determine whether the given properties match those of a `ActionProperty`
 *
 * @param properties - the TypeScript properties of a `ActionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTrigger_ActionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('arguments', cdk.validateObject)(properties.arguments));
    errors.collect(cdk.propertyValidator('crawlerName', cdk.validateString)(properties.crawlerName));
    errors.collect(cdk.propertyValidator('jobName', cdk.validateString)(properties.jobName));
    errors.collect(cdk.propertyValidator('notificationProperty', CfnTrigger_NotificationPropertyPropertyValidator)(properties.notificationProperty));
    errors.collect(cdk.propertyValidator('securityConfiguration', cdk.validateString)(properties.securityConfiguration));
    errors.collect(cdk.propertyValidator('timeout', cdk.validateNumber)(properties.timeout));
    return errors.wrap('supplied properties not correct for "ActionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Trigger.Action` resource
 *
 * @param properties - the TypeScript properties of a `ActionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Trigger.Action` resource.
 */
// @ts-ignore TS6133
function cfnTriggerActionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTrigger_ActionPropertyValidator(properties).assertSuccess();
    return {
        Arguments: cdk.objectToCloudFormation(properties.arguments),
        CrawlerName: cdk.stringToCloudFormation(properties.crawlerName),
        JobName: cdk.stringToCloudFormation(properties.jobName),
        NotificationProperty: cfnTriggerNotificationPropertyPropertyToCloudFormation(properties.notificationProperty),
        SecurityConfiguration: cdk.stringToCloudFormation(properties.securityConfiguration),
        Timeout: cdk.numberToCloudFormation(properties.timeout),
    };
}

// @ts-ignore TS6133
function CfnTriggerActionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTrigger.ActionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTrigger.ActionProperty>();
    ret.addPropertyResult('arguments', 'Arguments', properties.Arguments != null ? cfn_parse.FromCloudFormation.getAny(properties.Arguments) : undefined);
    ret.addPropertyResult('crawlerName', 'CrawlerName', properties.CrawlerName != null ? cfn_parse.FromCloudFormation.getString(properties.CrawlerName) : undefined);
    ret.addPropertyResult('jobName', 'JobName', properties.JobName != null ? cfn_parse.FromCloudFormation.getString(properties.JobName) : undefined);
    ret.addPropertyResult('notificationProperty', 'NotificationProperty', properties.NotificationProperty != null ? CfnTriggerNotificationPropertyPropertyFromCloudFormation(properties.NotificationProperty) : undefined);
    ret.addPropertyResult('securityConfiguration', 'SecurityConfiguration', properties.SecurityConfiguration != null ? cfn_parse.FromCloudFormation.getString(properties.SecurityConfiguration) : undefined);
    ret.addPropertyResult('timeout', 'Timeout', properties.Timeout != null ? cfn_parse.FromCloudFormation.getNumber(properties.Timeout) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTrigger {
    /**
     * Defines a condition under which a trigger fires.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-condition.html
     */
    export interface ConditionProperty {
        /**
         * The state of the crawler to which this condition applies.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-condition.html#cfn-glue-trigger-condition-crawlstate
         */
        readonly crawlState?: string;
        /**
         * The name of the crawler to which this condition applies.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-condition.html#cfn-glue-trigger-condition-crawlername
         */
        readonly crawlerName?: string;
        /**
         * The name of the job whose `JobRuns` this condition applies to, and on which this trigger waits.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-condition.html#cfn-glue-trigger-condition-jobname
         */
        readonly jobName?: string;
        /**
         * A logical operator.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-condition.html#cfn-glue-trigger-condition-logicaloperator
         */
        readonly logicalOperator?: string;
        /**
         * The condition state. Currently, the values supported are `SUCCEEDED` , `STOPPED` , `TIMEOUT` , and `FAILED` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-condition.html#cfn-glue-trigger-condition-state
         */
        readonly state?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ConditionProperty`
 *
 * @param properties - the TypeScript properties of a `ConditionProperty`
 *
 * @returns the result of the validation.
 */
function CfnTrigger_ConditionPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('crawlState', cdk.validateString)(properties.crawlState));
    errors.collect(cdk.propertyValidator('crawlerName', cdk.validateString)(properties.crawlerName));
    errors.collect(cdk.propertyValidator('jobName', cdk.validateString)(properties.jobName));
    errors.collect(cdk.propertyValidator('logicalOperator', cdk.validateString)(properties.logicalOperator));
    errors.collect(cdk.propertyValidator('state', cdk.validateString)(properties.state));
    return errors.wrap('supplied properties not correct for "ConditionProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Trigger.Condition` resource
 *
 * @param properties - the TypeScript properties of a `ConditionProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Trigger.Condition` resource.
 */
// @ts-ignore TS6133
function cfnTriggerConditionPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTrigger_ConditionPropertyValidator(properties).assertSuccess();
    return {
        CrawlState: cdk.stringToCloudFormation(properties.crawlState),
        CrawlerName: cdk.stringToCloudFormation(properties.crawlerName),
        JobName: cdk.stringToCloudFormation(properties.jobName),
        LogicalOperator: cdk.stringToCloudFormation(properties.logicalOperator),
        State: cdk.stringToCloudFormation(properties.state),
    };
}

// @ts-ignore TS6133
function CfnTriggerConditionPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTrigger.ConditionProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTrigger.ConditionProperty>();
    ret.addPropertyResult('crawlState', 'CrawlState', properties.CrawlState != null ? cfn_parse.FromCloudFormation.getString(properties.CrawlState) : undefined);
    ret.addPropertyResult('crawlerName', 'CrawlerName', properties.CrawlerName != null ? cfn_parse.FromCloudFormation.getString(properties.CrawlerName) : undefined);
    ret.addPropertyResult('jobName', 'JobName', properties.JobName != null ? cfn_parse.FromCloudFormation.getString(properties.JobName) : undefined);
    ret.addPropertyResult('logicalOperator', 'LogicalOperator', properties.LogicalOperator != null ? cfn_parse.FromCloudFormation.getString(properties.LogicalOperator) : undefined);
    ret.addPropertyResult('state', 'State', properties.State != null ? cfn_parse.FromCloudFormation.getString(properties.State) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTrigger {
    /**
     * Specifies configuration properties of a job run notification.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-notificationproperty.html
     */
    export interface NotificationPropertyProperty {
        /**
         * After a job run starts, the number of minutes to wait before sending a job run delay notification
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-notificationproperty.html#cfn-glue-trigger-notificationproperty-notifydelayafter
         */
        readonly notifyDelayAfter?: number;
    }
}

/**
 * Determine whether the given properties match those of a `NotificationPropertyProperty`
 *
 * @param properties - the TypeScript properties of a `NotificationPropertyProperty`
 *
 * @returns the result of the validation.
 */
function CfnTrigger_NotificationPropertyPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('notifyDelayAfter', cdk.validateNumber)(properties.notifyDelayAfter));
    return errors.wrap('supplied properties not correct for "NotificationPropertyProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Trigger.NotificationProperty` resource
 *
 * @param properties - the TypeScript properties of a `NotificationPropertyProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Trigger.NotificationProperty` resource.
 */
// @ts-ignore TS6133
function cfnTriggerNotificationPropertyPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTrigger_NotificationPropertyPropertyValidator(properties).assertSuccess();
    return {
        NotifyDelayAfter: cdk.numberToCloudFormation(properties.notifyDelayAfter),
    };
}

// @ts-ignore TS6133
function CfnTriggerNotificationPropertyPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTrigger.NotificationPropertyProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTrigger.NotificationPropertyProperty>();
    ret.addPropertyResult('notifyDelayAfter', 'NotifyDelayAfter', properties.NotifyDelayAfter != null ? cfn_parse.FromCloudFormation.getNumber(properties.NotifyDelayAfter) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnTrigger {
    /**
     * Defines the predicate of the trigger, which determines when it fires.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-predicate.html
     */
    export interface PredicateProperty {
        /**
         * A list of the conditions that determine when the trigger will fire.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-predicate.html#cfn-glue-trigger-predicate-conditions
         */
        readonly conditions?: Array<CfnTrigger.ConditionProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * An optional field if only one condition is listed. If multiple conditions are listed, then this field is required.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-glue-trigger-predicate.html#cfn-glue-trigger-predicate-logical
         */
        readonly logical?: string;
    }
}

/**
 * Determine whether the given properties match those of a `PredicateProperty`
 *
 * @param properties - the TypeScript properties of a `PredicateProperty`
 *
 * @returns the result of the validation.
 */
function CfnTrigger_PredicatePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('conditions', cdk.listValidator(CfnTrigger_ConditionPropertyValidator))(properties.conditions));
    errors.collect(cdk.propertyValidator('logical', cdk.validateString)(properties.logical));
    return errors.wrap('supplied properties not correct for "PredicateProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Trigger.Predicate` resource
 *
 * @param properties - the TypeScript properties of a `PredicateProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Trigger.Predicate` resource.
 */
// @ts-ignore TS6133
function cfnTriggerPredicatePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnTrigger_PredicatePropertyValidator(properties).assertSuccess();
    return {
        Conditions: cdk.listMapper(cfnTriggerConditionPropertyToCloudFormation)(properties.conditions),
        Logical: cdk.stringToCloudFormation(properties.logical),
    };
}

// @ts-ignore TS6133
function CfnTriggerPredicatePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnTrigger.PredicateProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnTrigger.PredicateProperty>();
    ret.addPropertyResult('conditions', 'Conditions', properties.Conditions != null ? cfn_parse.FromCloudFormation.getArray(CfnTriggerConditionPropertyFromCloudFormation)(properties.Conditions) : undefined);
    ret.addPropertyResult('logical', 'Logical', properties.Logical != null ? cfn_parse.FromCloudFormation.getString(properties.Logical) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnWorkflow`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-workflow.html
 */
export interface CfnWorkflowProps {

    /**
     * A collection of properties to be used as part of each execution of the workflow
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-workflow.html#cfn-glue-workflow-defaultrunproperties
     */
    readonly defaultRunProperties?: any | cdk.IResolvable;

    /**
     * A description of the workflow
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-workflow.html#cfn-glue-workflow-description
     */
    readonly description?: string;

    /**
     * The name of the workflow representing the flow
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-workflow.html#cfn-glue-workflow-name
     */
    readonly name?: string;

    /**
     * The tags to use with this workflow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-workflow.html#cfn-glue-workflow-tags
     */
    readonly tags?: any;
}

/**
 * Determine whether the given properties match those of a `CfnWorkflowProps`
 *
 * @param properties - the TypeScript properties of a `CfnWorkflowProps`
 *
 * @returns the result of the validation.
 */
function CfnWorkflowPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('defaultRunProperties', cdk.validateObject)(properties.defaultRunProperties));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tags', cdk.validateObject)(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnWorkflowProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Glue::Workflow` resource
 *
 * @param properties - the TypeScript properties of a `CfnWorkflowProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Glue::Workflow` resource.
 */
// @ts-ignore TS6133
function cfnWorkflowPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnWorkflowPropsValidator(properties).assertSuccess();
    return {
        DefaultRunProperties: cdk.objectToCloudFormation(properties.defaultRunProperties),
        Description: cdk.stringToCloudFormation(properties.description),
        Name: cdk.stringToCloudFormation(properties.name),
        Tags: cdk.objectToCloudFormation(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnWorkflowPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnWorkflowProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnWorkflowProps>();
    ret.addPropertyResult('defaultRunProperties', 'DefaultRunProperties', properties.DefaultRunProperties != null ? cfn_parse.FromCloudFormation.getAny(properties.DefaultRunProperties) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getAny(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Glue::Workflow`
 *
 * The `AWS::Glue::Workflow` is an AWS Glue resource type that manages AWS Glue workflows. A workflow is a container for a set of related jobs, crawlers, and triggers in AWS Glue . Using a workflow, you can design a complex multi-job extract, transform, and load (ETL) activity that AWS Glue can execute and track as single entity.
 *
 * @cloudformationResource AWS::Glue::Workflow
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-workflow.html
 */
export class CfnWorkflow extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Glue::Workflow";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnWorkflow {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnWorkflowPropsFromCloudFormation(resourceProperties);
        const ret = new CfnWorkflow(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A collection of properties to be used as part of each execution of the workflow
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-workflow.html#cfn-glue-workflow-defaultrunproperties
     */
    public defaultRunProperties: any | cdk.IResolvable | undefined;

    /**
     * A description of the workflow
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-workflow.html#cfn-glue-workflow-description
     */
    public description: string | undefined;

    /**
     * The name of the workflow representing the flow
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-workflow.html#cfn-glue-workflow-name
     */
    public name: string | undefined;

    /**
     * The tags to use with this workflow.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-workflow.html#cfn-glue-workflow-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Glue::Workflow`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnWorkflowProps = {}) {
        super(scope, id, { type: CfnWorkflow.CFN_RESOURCE_TYPE_NAME, properties: props });

        this.defaultRunProperties = props.defaultRunProperties;
        this.description = props.description;
        this.name = props.name;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::Glue::Workflow", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnWorkflow.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            defaultRunProperties: this.defaultRunProperties,
            description: this.description,
            name: this.name,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnWorkflowPropsToCloudFormation(props);
    }
}
