// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.275Z","fingerprint":"r1zQvXxxUXxdQRJcYtHDeGp7UBaZqF9XIqLPHc6Uxu8="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnCustomDataIdentifier`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-customdataidentifier.html
 */
export interface CfnCustomDataIdentifierProps {

    /**
     * A custom name for the custom data identifier. The name can contain as many as 128 characters.
     *
     * We strongly recommend that you avoid including any sensitive data in the name of a custom data identifier. Other users of your account might be able to see the identifier's name, depending on the actions that they're allowed to perform in Amazon Macie .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-customdataidentifier.html#cfn-macie-customdataidentifier-name
     */
    readonly name: string;

    /**
     * The regular expression ( *regex* ) that defines the pattern to match. The expression can contain as many as 512 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-customdataidentifier.html#cfn-macie-customdataidentifier-regex
     */
    readonly regex: string;

    /**
     * The description of the custom data identifier. The description can contain as many as 512 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-customdataidentifier.html#cfn-macie-customdataidentifier-description
     */
    readonly description?: string;

    /**
     * An array that lists specific character sequences (ignore words) to exclude from the results. If the text matched by the regular expression is the same as any string in this array, Amazon Macie ignores it. The array can contain as many as 10 ignore words. Each ignore word can contain 4-90 characters. Ignore words are case sensitive.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-customdataidentifier.html#cfn-macie-customdataidentifier-ignorewords
     */
    readonly ignoreWords?: string[];

    /**
     * An array that lists specific character sequences (keywords), one of which must be within proximity ( `MaximumMatchDistance` ) of the regular expression to match. The array can contain as many as 50 keywords. Each keyword can contain 3-90 characters. Keywords aren't case sensitive.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-customdataidentifier.html#cfn-macie-customdataidentifier-keywords
     */
    readonly keywords?: string[];

    /**
     * The maximum number of characters that can exist between text that matches the regex pattern and the character sequences specified by the `Keywords` array. Amazon Macie includes or excludes a result based on the proximity of a keyword to text that matches the regex pattern. The distance can be 1-300 characters. The default value is 50.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-customdataidentifier.html#cfn-macie-customdataidentifier-maximummatchdistance
     */
    readonly maximumMatchDistance?: number;
}

/**
 * Determine whether the given properties match those of a `CfnCustomDataIdentifierProps`
 *
 * @param properties - the TypeScript properties of a `CfnCustomDataIdentifierProps`
 *
 * @returns the result of the validation.
 */
function CfnCustomDataIdentifierPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('ignoreWords', cdk.listValidator(cdk.validateString))(properties.ignoreWords));
    errors.collect(cdk.propertyValidator('keywords', cdk.listValidator(cdk.validateString))(properties.keywords));
    errors.collect(cdk.propertyValidator('maximumMatchDistance', cdk.validateNumber)(properties.maximumMatchDistance));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('regex', cdk.requiredValidator)(properties.regex));
    errors.collect(cdk.propertyValidator('regex', cdk.validateString)(properties.regex));
    return errors.wrap('supplied properties not correct for "CfnCustomDataIdentifierProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Macie::CustomDataIdentifier` resource
 *
 * @param properties - the TypeScript properties of a `CfnCustomDataIdentifierProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Macie::CustomDataIdentifier` resource.
 */
// @ts-ignore TS6133
function cfnCustomDataIdentifierPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCustomDataIdentifierPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Regex: cdk.stringToCloudFormation(properties.regex),
        Description: cdk.stringToCloudFormation(properties.description),
        IgnoreWords: cdk.listMapper(cdk.stringToCloudFormation)(properties.ignoreWords),
        Keywords: cdk.listMapper(cdk.stringToCloudFormation)(properties.keywords),
        MaximumMatchDistance: cdk.numberToCloudFormation(properties.maximumMatchDistance),
    };
}

// @ts-ignore TS6133
function CfnCustomDataIdentifierPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCustomDataIdentifierProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCustomDataIdentifierProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('regex', 'Regex', cfn_parse.FromCloudFormation.getString(properties.Regex));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('ignoreWords', 'IgnoreWords', properties.IgnoreWords != null ? cfn_parse.FromCloudFormation.getStringArray(properties.IgnoreWords) : undefined);
    ret.addPropertyResult('keywords', 'Keywords', properties.Keywords != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Keywords) : undefined);
    ret.addPropertyResult('maximumMatchDistance', 'MaximumMatchDistance', properties.MaximumMatchDistance != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaximumMatchDistance) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Macie::CustomDataIdentifier`
 *
 * The `AWS::Macie::CustomDataIdentifier` resource is a set of criteria that you define to detect sensitive data in one or more data sources. Each identifier specifies a regular expression ( *regex* ) that defines a text pattern to match in the data. It can also specify character sequences, such as words and phrases, and a proximity rule that refine the analysis of a data source. By using custom data identifiers, you can tailor your analysis to meet your organization's specific needs and supplement the built-in, managed data identifiers that Amazon Macie provides.
 *
 * A `Session` must exist for the account before you can create a `CustomDataIdentifier` . Use a [DependsOn attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html) to ensure that the `Session` is created before the other resources. For example, `"DependsOn: Session"` .
 *
 * @cloudformationResource AWS::Macie::CustomDataIdentifier
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-customdataidentifier.html
 */
export class CfnCustomDataIdentifier extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Macie::CustomDataIdentifier";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnCustomDataIdentifier {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnCustomDataIdentifierPropsFromCloudFormation(resourceProperties);
        const ret = new CfnCustomDataIdentifier(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the custom data identifier.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The unique identifier for the custom data identifier.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * A custom name for the custom data identifier. The name can contain as many as 128 characters.
     *
     * We strongly recommend that you avoid including any sensitive data in the name of a custom data identifier. Other users of your account might be able to see the identifier's name, depending on the actions that they're allowed to perform in Amazon Macie .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-customdataidentifier.html#cfn-macie-customdataidentifier-name
     */
    public name: string;

    /**
     * The regular expression ( *regex* ) that defines the pattern to match. The expression can contain as many as 512 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-customdataidentifier.html#cfn-macie-customdataidentifier-regex
     */
    public regex: string;

    /**
     * The description of the custom data identifier. The description can contain as many as 512 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-customdataidentifier.html#cfn-macie-customdataidentifier-description
     */
    public description: string | undefined;

    /**
     * An array that lists specific character sequences (ignore words) to exclude from the results. If the text matched by the regular expression is the same as any string in this array, Amazon Macie ignores it. The array can contain as many as 10 ignore words. Each ignore word can contain 4-90 characters. Ignore words are case sensitive.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-customdataidentifier.html#cfn-macie-customdataidentifier-ignorewords
     */
    public ignoreWords: string[] | undefined;

    /**
     * An array that lists specific character sequences (keywords), one of which must be within proximity ( `MaximumMatchDistance` ) of the regular expression to match. The array can contain as many as 50 keywords. Each keyword can contain 3-90 characters. Keywords aren't case sensitive.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-customdataidentifier.html#cfn-macie-customdataidentifier-keywords
     */
    public keywords: string[] | undefined;

    /**
     * The maximum number of characters that can exist between text that matches the regex pattern and the character sequences specified by the `Keywords` array. Amazon Macie includes or excludes a result based on the proximity of a keyword to text that matches the regex pattern. The distance can be 1-300 characters. The default value is 50.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-customdataidentifier.html#cfn-macie-customdataidentifier-maximummatchdistance
     */
    public maximumMatchDistance: number | undefined;

    /**
     * Create a new `AWS::Macie::CustomDataIdentifier`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnCustomDataIdentifierProps) {
        super(scope, id, { type: CfnCustomDataIdentifier.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'regex', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.name = props.name;
        this.regex = props.regex;
        this.description = props.description;
        this.ignoreWords = props.ignoreWords;
        this.keywords = props.keywords;
        this.maximumMatchDistance = props.maximumMatchDistance;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnCustomDataIdentifier.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            regex: this.regex,
            description: this.description,
            ignoreWords: this.ignoreWords,
            keywords: this.keywords,
            maximumMatchDistance: this.maximumMatchDistance,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnCustomDataIdentifierPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnFindingsFilter`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-findingsfilter.html
 */
export interface CfnFindingsFilterProps {

    /**
     * The criteria to use to filter findings.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-findingsfilter.html#cfn-macie-findingsfilter-findingcriteria
     */
    readonly findingCriteria: CfnFindingsFilter.FindingCriteriaProperty | cdk.IResolvable;

    /**
     * A custom name for the filter. The name must contain at least 3 characters and can contain as many as 64 characters.
     *
     * We strongly recommend that you avoid including any sensitive data in the name of a filter. Other users might be able to see the filter's name, depending on the actions that they're allowed to perform in Amazon Macie .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-findingsfilter.html#cfn-macie-findingsfilter-name
     */
    readonly name: string;

    /**
     * The action to perform on findings that meet the filter criteria ( `FindingCriteria` ). Valid values are:
     *
     * - ARCHIVE - Suppress (automatically archive) the findings.
     * - NOOP - Don't perform any action on the findings.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-findingsfilter.html#cfn-macie-findingsfilter-action
     */
    readonly action?: string;

    /**
     * A custom description of the filter. The description can contain as many as 512 characters.
     *
     * We strongly recommend that you avoid including any sensitive data in the description of a filter. Other users might be able to see the filter's description, depending on the actions that they're allowed to perform in Amazon Macie .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-findingsfilter.html#cfn-macie-findingsfilter-description
     */
    readonly description?: string;

    /**
     * The position of the filter in the list of saved filters on the Amazon Macie console. This value also determines the order in which the filter is applied to findings, relative to other filters that are also applied to the findings.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-findingsfilter.html#cfn-macie-findingsfilter-position
     */
    readonly position?: number;
}

/**
 * Determine whether the given properties match those of a `CfnFindingsFilterProps`
 *
 * @param properties - the TypeScript properties of a `CfnFindingsFilterProps`
 *
 * @returns the result of the validation.
 */
function CfnFindingsFilterPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('action', cdk.validateString)(properties.action));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('findingCriteria', cdk.requiredValidator)(properties.findingCriteria));
    errors.collect(cdk.propertyValidator('findingCriteria', CfnFindingsFilter_FindingCriteriaPropertyValidator)(properties.findingCriteria));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('position', cdk.validateNumber)(properties.position));
    return errors.wrap('supplied properties not correct for "CfnFindingsFilterProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Macie::FindingsFilter` resource
 *
 * @param properties - the TypeScript properties of a `CfnFindingsFilterProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Macie::FindingsFilter` resource.
 */
// @ts-ignore TS6133
function cfnFindingsFilterPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFindingsFilterPropsValidator(properties).assertSuccess();
    return {
        FindingCriteria: cfnFindingsFilterFindingCriteriaPropertyToCloudFormation(properties.findingCriteria),
        Name: cdk.stringToCloudFormation(properties.name),
        Action: cdk.stringToCloudFormation(properties.action),
        Description: cdk.stringToCloudFormation(properties.description),
        Position: cdk.numberToCloudFormation(properties.position),
    };
}

// @ts-ignore TS6133
function CfnFindingsFilterPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFindingsFilterProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFindingsFilterProps>();
    ret.addPropertyResult('findingCriteria', 'FindingCriteria', CfnFindingsFilterFindingCriteriaPropertyFromCloudFormation(properties.FindingCriteria));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('action', 'Action', properties.Action != null ? cfn_parse.FromCloudFormation.getString(properties.Action) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('position', 'Position', properties.Position != null ? cfn_parse.FromCloudFormation.getNumber(properties.Position) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Macie::FindingsFilter`
 *
 * The `AWS::Macie::FindingsFilter` resource represents an individual findings filter that you create and save to view, analyze, and manage findings. A *findings filter* is a set of criteria that specifies which findings to include in the results of a query for findings. A findings filter can also perform specific actions on findings that meet the filter's criteria.
 *
 * A `Session` must exist for the account before you can create a `FindingsFilter` . Use a [DependsOn attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html) to ensure that the `Session` is created before the other resources. For example, `"DependsOn: Session"` .
 *
 * @cloudformationResource AWS::Macie::FindingsFilter
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-findingsfilter.html
 */
export class CfnFindingsFilter extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Macie::FindingsFilter";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnFindingsFilter {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnFindingsFilterPropsFromCloudFormation(resourceProperties);
        const ret = new CfnFindingsFilter(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the filter.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * An array of `FindingsFilterListItem` objects, one for each findings filter that's associated with the account.
     * @cloudformationAttribute FindingsFilterListItems
     */
    public readonly attrFindingsFilterListItems: cdk.IResolvable;

    /**
     * The unique identifier for the filter.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The criteria to use to filter findings.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-findingsfilter.html#cfn-macie-findingsfilter-findingcriteria
     */
    public findingCriteria: CfnFindingsFilter.FindingCriteriaProperty | cdk.IResolvable;

    /**
     * A custom name for the filter. The name must contain at least 3 characters and can contain as many as 64 characters.
     *
     * We strongly recommend that you avoid including any sensitive data in the name of a filter. Other users might be able to see the filter's name, depending on the actions that they're allowed to perform in Amazon Macie .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-findingsfilter.html#cfn-macie-findingsfilter-name
     */
    public name: string;

    /**
     * The action to perform on findings that meet the filter criteria ( `FindingCriteria` ). Valid values are:
     *
     * - ARCHIVE - Suppress (automatically archive) the findings.
     * - NOOP - Don't perform any action on the findings.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-findingsfilter.html#cfn-macie-findingsfilter-action
     */
    public action: string | undefined;

    /**
     * A custom description of the filter. The description can contain as many as 512 characters.
     *
     * We strongly recommend that you avoid including any sensitive data in the description of a filter. Other users might be able to see the filter's description, depending on the actions that they're allowed to perform in Amazon Macie .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-findingsfilter.html#cfn-macie-findingsfilter-description
     */
    public description: string | undefined;

    /**
     * The position of the filter in the list of saved filters on the Amazon Macie console. This value also determines the order in which the filter is applied to findings, relative to other filters that are also applied to the findings.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-findingsfilter.html#cfn-macie-findingsfilter-position
     */
    public position: number | undefined;

    /**
     * Create a new `AWS::Macie::FindingsFilter`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnFindingsFilterProps) {
        super(scope, id, { type: CfnFindingsFilter.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'findingCriteria', this);
        cdk.requireProperty(props, 'name', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrFindingsFilterListItems = this.getAtt('FindingsFilterListItems');
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.findingCriteria = props.findingCriteria;
        this.name = props.name;
        this.action = props.action;
        this.description = props.description;
        this.position = props.position;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnFindingsFilter.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            findingCriteria: this.findingCriteria,
            name: this.name,
            action: this.action,
            description: this.description,
            position: this.position,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnFindingsFilterPropsToCloudFormation(props);
    }
}

export namespace CfnFindingsFilter {
    /**
     * Specifies, as a map, one or more property-based conditions that filter the results of a query for findings.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-macie-findingsfilter-findingcriteria.html
     */
    export interface FindingCriteriaProperty {
        /**
         * Specifies a condition that defines the property, operator, and value to use to filter the results.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-macie-findingsfilter-findingcriteria.html#cfn-macie-findingsfilter-findingcriteria-criterion
         */
        readonly criterion?: any | cdk.IResolvable | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `FindingCriteriaProperty`
 *
 * @param properties - the TypeScript properties of a `FindingCriteriaProperty`
 *
 * @returns the result of the validation.
 */
function CfnFindingsFilter_FindingCriteriaPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('criterion', cdk.validateObject)(properties.criterion));
    return errors.wrap('supplied properties not correct for "FindingCriteriaProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Macie::FindingsFilter.FindingCriteria` resource
 *
 * @param properties - the TypeScript properties of a `FindingCriteriaProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Macie::FindingsFilter.FindingCriteria` resource.
 */
// @ts-ignore TS6133
function cfnFindingsFilterFindingCriteriaPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFindingsFilter_FindingCriteriaPropertyValidator(properties).assertSuccess();
    return {
        Criterion: cdk.objectToCloudFormation(properties.criterion),
    };
}

// @ts-ignore TS6133
function CfnFindingsFilterFindingCriteriaPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFindingsFilter.FindingCriteriaProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFindingsFilter.FindingCriteriaProperty>();
    ret.addPropertyResult('criterion', 'Criterion', properties.Criterion != null ? cfn_parse.FromCloudFormation.getAny(properties.Criterion) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnFindingsFilter {
    /**
     * Specifies the unique identifier and custom name of a findings filter.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-macie-findingsfilter-findingsfilterlistitem.html
     */
    export interface FindingsFilterListItemProperty {
        /**
         * The unique identifier for the filter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-macie-findingsfilter-findingsfilterlistitem.html#cfn-macie-findingsfilter-findingsfilterlistitem-id
         */
        readonly id?: string;
        /**
         * The custom name of the filter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-macie-findingsfilter-findingsfilterlistitem.html#cfn-macie-findingsfilter-findingsfilterlistitem-name
         */
        readonly name?: string;
    }
}

/**
 * Determine whether the given properties match those of a `FindingsFilterListItemProperty`
 *
 * @param properties - the TypeScript properties of a `FindingsFilterListItemProperty`
 *
 * @returns the result of the validation.
 */
function CfnFindingsFilter_FindingsFilterListItemPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('id', cdk.validateString)(properties.id));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "FindingsFilterListItemProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Macie::FindingsFilter.FindingsFilterListItem` resource
 *
 * @param properties - the TypeScript properties of a `FindingsFilterListItemProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Macie::FindingsFilter.FindingsFilterListItem` resource.
 */
// @ts-ignore TS6133
function cfnFindingsFilterFindingsFilterListItemPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFindingsFilter_FindingsFilterListItemPropertyValidator(properties).assertSuccess();
    return {
        Id: cdk.stringToCloudFormation(properties.id),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnFindingsFilterFindingsFilterListItemPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFindingsFilter.FindingsFilterListItemProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFindingsFilter.FindingsFilterListItemProperty>();
    ret.addPropertyResult('id', 'Id', properties.Id != null ? cfn_parse.FromCloudFormation.getString(properties.Id) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnSession`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-session.html
 */
export interface CfnSessionProps {

    /**
     * The frequency with which Amazon Macie publishes updates to policy findings for an account. This includes publishing updates to AWS Security Hub and Amazon EventBridge (formerly called Amazon CloudWatch Events ). Valid values are:
     *
     * - FIFTEEN_MINUTES
     * - ONE_HOUR
     * - SIX_HOURS
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-session.html#cfn-macie-session-findingpublishingfrequency
     */
    readonly findingPublishingFrequency?: string;

    /**
     * The `MacieStatus` of the `Session` . Valid values include `ENABLED` and `PAUSED` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-session.html#cfn-macie-session-status
     */
    readonly status?: string;
}

/**
 * Determine whether the given properties match those of a `CfnSessionProps`
 *
 * @param properties - the TypeScript properties of a `CfnSessionProps`
 *
 * @returns the result of the validation.
 */
function CfnSessionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('findingPublishingFrequency', cdk.validateString)(properties.findingPublishingFrequency));
    errors.collect(cdk.propertyValidator('status', cdk.validateString)(properties.status));
    return errors.wrap('supplied properties not correct for "CfnSessionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Macie::Session` resource
 *
 * @param properties - the TypeScript properties of a `CfnSessionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Macie::Session` resource.
 */
// @ts-ignore TS6133
function cfnSessionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnSessionPropsValidator(properties).assertSuccess();
    return {
        FindingPublishingFrequency: cdk.stringToCloudFormation(properties.findingPublishingFrequency),
        Status: cdk.stringToCloudFormation(properties.status),
    };
}

// @ts-ignore TS6133
function CfnSessionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnSessionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnSessionProps>();
    ret.addPropertyResult('findingPublishingFrequency', 'FindingPublishingFrequency', properties.FindingPublishingFrequency != null ? cfn_parse.FromCloudFormation.getString(properties.FindingPublishingFrequency) : undefined);
    ret.addPropertyResult('status', 'Status', properties.Status != null ? cfn_parse.FromCloudFormation.getString(properties.Status) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Macie::Session`
 *
 * The `AWS::Macie::Session` resource represents the Amazon Macie service and configuration settings for an account. A `Session` is created for each AWS Region in which you enable Macie .
 *
 * You must create a `Session` for an account before you can create an `AWS::Macie::FindingsFilter` or `AWS::Macie::CustomDataIdentifier` resource. Use a [DependsOn attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html) to ensure that the `Session` is created before the other resources. For example, `"DependsOn: Session"` .
 *
 * @cloudformationResource AWS::Macie::Session
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-session.html
 */
export class CfnSession extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Macie::Session";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnSession {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnSessionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnSession(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The account ID for the AWS account in which the `Session` is created.
     * @cloudformationAttribute AwsAccountId
     */
    public readonly attrAwsAccountId: string;

    /**
     * The Amazon Resource Name (ARN) of the service-linked role that allows Amazon Macie to monitor and analyze data in AWS resources for the account.
     * @cloudformationAttribute ServiceRole
     */
    public readonly attrServiceRole: string;

    /**
     * The frequency with which Amazon Macie publishes updates to policy findings for an account. This includes publishing updates to AWS Security Hub and Amazon EventBridge (formerly called Amazon CloudWatch Events ). Valid values are:
     *
     * - FIFTEEN_MINUTES
     * - ONE_HOUR
     * - SIX_HOURS
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-session.html#cfn-macie-session-findingpublishingfrequency
     */
    public findingPublishingFrequency: string | undefined;

    /**
     * The `MacieStatus` of the `Session` . Valid values include `ENABLED` and `PAUSED` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-session.html#cfn-macie-session-status
     */
    public status: string | undefined;

    /**
     * Create a new `AWS::Macie::Session`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnSessionProps = {}) {
        super(scope, id, { type: CfnSession.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrAwsAccountId = cdk.Token.asString(this.getAtt('AwsAccountId'));
        this.attrServiceRole = cdk.Token.asString(this.getAtt('ServiceRole'));

        this.findingPublishingFrequency = props.findingPublishingFrequency;
        this.status = props.status;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnSession.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            findingPublishingFrequency: this.findingPublishingFrequency,
            status: this.status,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnSessionPropsToCloudFormation(props);
    }
}
