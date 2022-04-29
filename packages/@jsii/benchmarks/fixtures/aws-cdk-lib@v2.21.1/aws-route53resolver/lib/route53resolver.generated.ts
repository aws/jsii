// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.874Z","fingerprint":"lRoHiMn3fA3LJXo9J1PROZrXYR1fwqohAHte7j0FhPU="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnFirewallDomainList`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewalldomainlist.html
 */
export interface CfnFirewallDomainListProps {

    /**
     * The fully qualified URL or URI of the file stored in Amazon Simple Storage Service (Amazon S3) that contains the list of domains to import.
     *
     * The file must be in an S3 bucket that's in the same Region as your DNS Firewall. The file must be a text file and must contain a single domain per line.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewalldomainlist.html#cfn-route53resolver-firewalldomainlist-domainfileurl
     */
    readonly domainFileUrl?: string;

    /**
     * A list of the domain lists that you have defined.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewalldomainlist.html#cfn-route53resolver-firewalldomainlist-domains
     */
    readonly domains?: string[];

    /**
     * The name of the domain list.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewalldomainlist.html#cfn-route53resolver-firewalldomainlist-name
     */
    readonly name?: string;

    /**
     * A list of the tag keys and values that you want to associate with the domain list.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewalldomainlist.html#cfn-route53resolver-firewalldomainlist-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnFirewallDomainListProps`
 *
 * @param properties - the TypeScript properties of a `CfnFirewallDomainListProps`
 *
 * @returns the result of the validation.
 */
function CfnFirewallDomainListPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('domainFileUrl', cdk.validateString)(properties.domainFileUrl));
    errors.collect(cdk.propertyValidator('domains', cdk.listValidator(cdk.validateString))(properties.domains));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnFirewallDomainListProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Route53Resolver::FirewallDomainList` resource
 *
 * @param properties - the TypeScript properties of a `CfnFirewallDomainListProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Route53Resolver::FirewallDomainList` resource.
 */
// @ts-ignore TS6133
function cfnFirewallDomainListPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFirewallDomainListPropsValidator(properties).assertSuccess();
    return {
        DomainFileUrl: cdk.stringToCloudFormation(properties.domainFileUrl),
        Domains: cdk.listMapper(cdk.stringToCloudFormation)(properties.domains),
        Name: cdk.stringToCloudFormation(properties.name),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnFirewallDomainListPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFirewallDomainListProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFirewallDomainListProps>();
    ret.addPropertyResult('domainFileUrl', 'DomainFileUrl', properties.DomainFileUrl != null ? cfn_parse.FromCloudFormation.getString(properties.DomainFileUrl) : undefined);
    ret.addPropertyResult('domains', 'Domains', properties.Domains != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Domains) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Route53Resolver::FirewallDomainList`
 *
 * High-level information about a list of firewall domains for use in a [AWS::Route53Resolver::FirewallRule](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-firewallrulegroup-rule.html) . This is returned by [GetFirewallDomainList](https://docs.aws.amazon.com/Route53/latest/APIReference/API_route53resolver_GetFirewallDomainList.html) .
 *
 * To retrieve the domains that are defined for this domain list, call [ListFirewallDomains](https://docs.aws.amazon.com/Route53/latest/APIReference/API_route53resolver_ListFirewallDomains.html) .
 *
 * @cloudformationResource AWS::Route53Resolver::FirewallDomainList
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewalldomainlist.html
 */
export class CfnFirewallDomainList extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Route53Resolver::FirewallDomainList";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnFirewallDomainList {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnFirewallDomainListPropsFromCloudFormation(resourceProperties);
        const ret = new CfnFirewallDomainList(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the firewall domain list.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The date and time that the domain list was created, in Unix time format and Coordinated Universal Time (UTC).
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: string;

    /**
     * A unique string defined by you to identify the request. This allows you to retry failed requests without the risk of running the operation twice. This can be any unique string, for example, a timestamp.
     * @cloudformationAttribute CreatorRequestId
     */
    public readonly attrCreatorRequestId: string;

    /**
     * The number of domain names that are specified in the domain list.
     * @cloudformationAttribute DomainCount
     */
    public readonly attrDomainCount: number;

    /**
     * The ID of the domain list.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The owner of the list, used only for lists that are not managed by you. For example, the managed domain list `AWSManagedDomainsMalwareDomainList` has the managed owner name `Route 53 Resolver DNS Firewall` .
     * @cloudformationAttribute ManagedOwnerName
     */
    public readonly attrManagedOwnerName: string;

    /**
     * The date and time that the domain list was last modified, in Unix time format and Coordinated Universal Time (UTC).
     * @cloudformationAttribute ModificationTime
     */
    public readonly attrModificationTime: string;

    /**
     * The status of the domain list.
     * @cloudformationAttribute Status
     */
    public readonly attrStatus: string;

    /**
     * Additional information about the status of the list, if available.
     * @cloudformationAttribute StatusMessage
     */
    public readonly attrStatusMessage: string;

    /**
     * The fully qualified URL or URI of the file stored in Amazon Simple Storage Service (Amazon S3) that contains the list of domains to import.
     *
     * The file must be in an S3 bucket that's in the same Region as your DNS Firewall. The file must be a text file and must contain a single domain per line.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewalldomainlist.html#cfn-route53resolver-firewalldomainlist-domainfileurl
     */
    public domainFileUrl: string | undefined;

    /**
     * A list of the domain lists that you have defined.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewalldomainlist.html#cfn-route53resolver-firewalldomainlist-domains
     */
    public domains: string[] | undefined;

    /**
     * The name of the domain list.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewalldomainlist.html#cfn-route53resolver-firewalldomainlist-name
     */
    public name: string | undefined;

    /**
     * A list of the tag keys and values that you want to associate with the domain list.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewalldomainlist.html#cfn-route53resolver-firewalldomainlist-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Route53Resolver::FirewallDomainList`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnFirewallDomainListProps = {}) {
        super(scope, id, { type: CfnFirewallDomainList.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCreationTime = cdk.Token.asString(this.getAtt('CreationTime'));
        this.attrCreatorRequestId = cdk.Token.asString(this.getAtt('CreatorRequestId'));
        this.attrDomainCount = cdk.Token.asNumber(this.getAtt('DomainCount'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));
        this.attrManagedOwnerName = cdk.Token.asString(this.getAtt('ManagedOwnerName'));
        this.attrModificationTime = cdk.Token.asString(this.getAtt('ModificationTime'));
        this.attrStatus = cdk.Token.asString(this.getAtt('Status'));
        this.attrStatusMessage = cdk.Token.asString(this.getAtt('StatusMessage'));

        this.domainFileUrl = props.domainFileUrl;
        this.domains = props.domains;
        this.name = props.name;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Route53Resolver::FirewallDomainList", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnFirewallDomainList.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            domainFileUrl: this.domainFileUrl,
            domains: this.domains,
            name: this.name,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnFirewallDomainListPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnFirewallRuleGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroup.html
 */
export interface CfnFirewallRuleGroupProps {

    /**
     * A list of the rules that you have defined.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroup.html#cfn-route53resolver-firewallrulegroup-firewallrules
     */
    readonly firewallRules?: Array<CfnFirewallRuleGroup.FirewallRuleProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The name of the rule group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroup.html#cfn-route53resolver-firewallrulegroup-name
     */
    readonly name?: string;

    /**
     * A list of the tag keys and values that you want to associate with the rule group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroup.html#cfn-route53resolver-firewallrulegroup-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnFirewallRuleGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnFirewallRuleGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnFirewallRuleGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('firewallRules', cdk.listValidator(CfnFirewallRuleGroup_FirewallRulePropertyValidator))(properties.firewallRules));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnFirewallRuleGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Route53Resolver::FirewallRuleGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnFirewallRuleGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Route53Resolver::FirewallRuleGroup` resource.
 */
// @ts-ignore TS6133
function cfnFirewallRuleGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFirewallRuleGroupPropsValidator(properties).assertSuccess();
    return {
        FirewallRules: cdk.listMapper(cfnFirewallRuleGroupFirewallRulePropertyToCloudFormation)(properties.firewallRules),
        Name: cdk.stringToCloudFormation(properties.name),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnFirewallRuleGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFirewallRuleGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFirewallRuleGroupProps>();
    ret.addPropertyResult('firewallRules', 'FirewallRules', properties.FirewallRules != null ? cfn_parse.FromCloudFormation.getArray(CfnFirewallRuleGroupFirewallRulePropertyFromCloudFormation)(properties.FirewallRules) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Route53Resolver::FirewallRuleGroup`
 *
 * High-level information for a firewall rule group. A firewall rule group is a collection of rules that DNS Firewall uses to filter DNS network traffic for a VPC. To retrieve the rules for the rule group, call [ListFirewallRules](https://docs.aws.amazon.com/Route53/latest/APIReference/API_route53resolver_ListFirewallRules.html) .
 *
 * @cloudformationResource AWS::Route53Resolver::FirewallRuleGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroup.html
 */
export class CfnFirewallRuleGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Route53Resolver::FirewallRuleGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnFirewallRuleGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnFirewallRuleGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnFirewallRuleGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ARN (Amazon Resource Name) of the rule group.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The date and time that the rule group was created, in Unix time format and Coordinated Universal Time (UTC).
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: string;

    /**
     * A unique string defined by you to identify the request. This allows you to retry failed requests without the risk of running the operation twice. This can be any unique string, for example, a timestamp.
     * @cloudformationAttribute CreatorRequestId
     */
    public readonly attrCreatorRequestId: string;

    /**
     * The ID of the rule group.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The date and time that the rule group was last modified, in Unix time format and Coordinated Universal Time (UTC).
     * @cloudformationAttribute ModificationTime
     */
    public readonly attrModificationTime: string;

    /**
     * The AWS account ID for the account that created the rule group. When a rule group is shared with your account, this is the account that has shared the rule group with you.
     * @cloudformationAttribute OwnerId
     */
    public readonly attrOwnerId: string;

    /**
     * The number of rules in the rule group.
     * @cloudformationAttribute RuleCount
     */
    public readonly attrRuleCount: number;

    /**
     * Whether the rule group is shared with other AWS accounts , or was shared with the current account by another AWS account . Sharing is configured through AWS Resource Access Manager ( AWS RAM ).
     * @cloudformationAttribute ShareStatus
     */
    public readonly attrShareStatus: string;

    /**
     * The status of the domain list.
     * @cloudformationAttribute Status
     */
    public readonly attrStatus: string;

    /**
     * Additional information about the status of the rule group, if available.
     * @cloudformationAttribute StatusMessage
     */
    public readonly attrStatusMessage: string;

    /**
     * A list of the rules that you have defined.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroup.html#cfn-route53resolver-firewallrulegroup-firewallrules
     */
    public firewallRules: Array<CfnFirewallRuleGroup.FirewallRuleProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The name of the rule group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroup.html#cfn-route53resolver-firewallrulegroup-name
     */
    public name: string | undefined;

    /**
     * A list of the tag keys and values that you want to associate with the rule group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroup.html#cfn-route53resolver-firewallrulegroup-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Route53Resolver::FirewallRuleGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnFirewallRuleGroupProps = {}) {
        super(scope, id, { type: CfnFirewallRuleGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCreationTime = cdk.Token.asString(this.getAtt('CreationTime'));
        this.attrCreatorRequestId = cdk.Token.asString(this.getAtt('CreatorRequestId'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));
        this.attrModificationTime = cdk.Token.asString(this.getAtt('ModificationTime'));
        this.attrOwnerId = cdk.Token.asString(this.getAtt('OwnerId'));
        this.attrRuleCount = cdk.Token.asNumber(this.getAtt('RuleCount'));
        this.attrShareStatus = cdk.Token.asString(this.getAtt('ShareStatus'));
        this.attrStatus = cdk.Token.asString(this.getAtt('Status'));
        this.attrStatusMessage = cdk.Token.asString(this.getAtt('StatusMessage'));

        this.firewallRules = props.firewallRules;
        this.name = props.name;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Route53Resolver::FirewallRuleGroup", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnFirewallRuleGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            firewallRules: this.firewallRules,
            name: this.name,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnFirewallRuleGroupPropsToCloudFormation(props);
    }
}

export namespace CfnFirewallRuleGroup {
    /**
     * A single firewall rule in a rule group.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-firewallrulegroup-firewallrule.html
     */
    export interface FirewallRuleProperty {
        /**
         * The action that DNS Firewall should take on a DNS query when it matches one of the domains in the rule's domain list:
         *
         * - `ALLOW` - Permit the request to go through.
         * - `ALERT` - Permit the request to go through but send an alert to the logs.
         * - `BLOCK` - Disallow the request. If this is specified,then `BlockResponse` must also be specified.
         *
         * if `BlockResponse` is `OVERRIDE` , then all of the following `OVERRIDE` attributes must be specified:
         *
         * - `BlockOverrideDnsType`
         * - `BlockOverrideDomain`
         * - `BlockOverrideTtl`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-firewallrulegroup-firewallrule.html#cfn-route53resolver-firewallrulegroup-firewallrule-action
         */
        readonly action: string;
        /**
         * The DNS record's type. This determines the format of the record value that you provided in `BlockOverrideDomain` . Used for the rule action `BLOCK` with a `BlockResponse` setting of `OVERRIDE` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-firewallrulegroup-firewallrule.html#cfn-route53resolver-firewallrulegroup-firewallrule-blockoverridednstype
         */
        readonly blockOverrideDnsType?: string;
        /**
         * The custom DNS record to send back in response to the query. Used for the rule action `BLOCK` with a `BlockResponse` setting of `OVERRIDE` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-firewallrulegroup-firewallrule.html#cfn-route53resolver-firewallrulegroup-firewallrule-blockoverridedomain
         */
        readonly blockOverrideDomain?: string;
        /**
         * The recommended amount of time, in seconds, for the DNS resolver or web browser to cache the provided override record. Used for the rule action `BLOCK` with a `BlockResponse` setting of `OVERRIDE` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-firewallrulegroup-firewallrule.html#cfn-route53resolver-firewallrulegroup-firewallrule-blockoverridettl
         */
        readonly blockOverrideTtl?: number;
        /**
         * The way that you want DNS Firewall to block the request. Used for the rule action setting `BLOCK` .
         *
         * - `NODATA` - Respond indicating that the query was successful, but no response is available for it.
         * - `NXDOMAIN` - Respond indicating that the domain name that's in the query doesn't exist.
         * - `OVERRIDE` - Provide a custom override in the response. This option requires custom handling details in the rule's `BlockOverride*` settings.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-firewallrulegroup-firewallrule.html#cfn-route53resolver-firewallrulegroup-firewallrule-blockresponse
         */
        readonly blockResponse?: string;
        /**
         * The ID of the domain list that's used in the rule.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-firewallrulegroup-firewallrule.html#cfn-route53resolver-firewallrulegroup-firewallrule-firewalldomainlistid
         */
        readonly firewallDomainListId: string;
        /**
         * The priority of the rule in the rule group. This value must be unique within the rule group. DNS Firewall processes the rules in a rule group by order of priority, starting from the lowest setting.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-firewallrulegroup-firewallrule.html#cfn-route53resolver-firewallrulegroup-firewallrule-priority
         */
        readonly priority: number;
    }
}

/**
 * Determine whether the given properties match those of a `FirewallRuleProperty`
 *
 * @param properties - the TypeScript properties of a `FirewallRuleProperty`
 *
 * @returns the result of the validation.
 */
function CfnFirewallRuleGroup_FirewallRulePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('action', cdk.requiredValidator)(properties.action));
    errors.collect(cdk.propertyValidator('action', cdk.validateString)(properties.action));
    errors.collect(cdk.propertyValidator('blockOverrideDnsType', cdk.validateString)(properties.blockOverrideDnsType));
    errors.collect(cdk.propertyValidator('blockOverrideDomain', cdk.validateString)(properties.blockOverrideDomain));
    errors.collect(cdk.propertyValidator('blockOverrideTtl', cdk.validateNumber)(properties.blockOverrideTtl));
    errors.collect(cdk.propertyValidator('blockResponse', cdk.validateString)(properties.blockResponse));
    errors.collect(cdk.propertyValidator('firewallDomainListId', cdk.requiredValidator)(properties.firewallDomainListId));
    errors.collect(cdk.propertyValidator('firewallDomainListId', cdk.validateString)(properties.firewallDomainListId));
    errors.collect(cdk.propertyValidator('priority', cdk.requiredValidator)(properties.priority));
    errors.collect(cdk.propertyValidator('priority', cdk.validateNumber)(properties.priority));
    return errors.wrap('supplied properties not correct for "FirewallRuleProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Route53Resolver::FirewallRuleGroup.FirewallRule` resource
 *
 * @param properties - the TypeScript properties of a `FirewallRuleProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Route53Resolver::FirewallRuleGroup.FirewallRule` resource.
 */
// @ts-ignore TS6133
function cfnFirewallRuleGroupFirewallRulePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFirewallRuleGroup_FirewallRulePropertyValidator(properties).assertSuccess();
    return {
        Action: cdk.stringToCloudFormation(properties.action),
        BlockOverrideDnsType: cdk.stringToCloudFormation(properties.blockOverrideDnsType),
        BlockOverrideDomain: cdk.stringToCloudFormation(properties.blockOverrideDomain),
        BlockOverrideTtl: cdk.numberToCloudFormation(properties.blockOverrideTtl),
        BlockResponse: cdk.stringToCloudFormation(properties.blockResponse),
        FirewallDomainListId: cdk.stringToCloudFormation(properties.firewallDomainListId),
        Priority: cdk.numberToCloudFormation(properties.priority),
    };
}

// @ts-ignore TS6133
function CfnFirewallRuleGroupFirewallRulePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFirewallRuleGroup.FirewallRuleProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFirewallRuleGroup.FirewallRuleProperty>();
    ret.addPropertyResult('action', 'Action', cfn_parse.FromCloudFormation.getString(properties.Action));
    ret.addPropertyResult('blockOverrideDnsType', 'BlockOverrideDnsType', properties.BlockOverrideDnsType != null ? cfn_parse.FromCloudFormation.getString(properties.BlockOverrideDnsType) : undefined);
    ret.addPropertyResult('blockOverrideDomain', 'BlockOverrideDomain', properties.BlockOverrideDomain != null ? cfn_parse.FromCloudFormation.getString(properties.BlockOverrideDomain) : undefined);
    ret.addPropertyResult('blockOverrideTtl', 'BlockOverrideTtl', properties.BlockOverrideTtl != null ? cfn_parse.FromCloudFormation.getNumber(properties.BlockOverrideTtl) : undefined);
    ret.addPropertyResult('blockResponse', 'BlockResponse', properties.BlockResponse != null ? cfn_parse.FromCloudFormation.getString(properties.BlockResponse) : undefined);
    ret.addPropertyResult('firewallDomainListId', 'FirewallDomainListId', cfn_parse.FromCloudFormation.getString(properties.FirewallDomainListId));
    ret.addPropertyResult('priority', 'Priority', cfn_parse.FromCloudFormation.getNumber(properties.Priority));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnFirewallRuleGroupAssociation`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html
 */
export interface CfnFirewallRuleGroupAssociationProps {

    /**
     * The unique identifier of the firewall rule group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html#cfn-route53resolver-firewallrulegroupassociation-firewallrulegroupid
     */
    readonly firewallRuleGroupId: string;

    /**
     * The setting that determines the processing order of the rule group among the rule groups that are associated with a single VPC. DNS Firewall filters VPC traffic starting from rule group with the lowest numeric priority setting.
     *
     * You must specify a unique priority for each rule group that you associate with a single VPC. To make it easier to insert rule groups later, leave space between the numbers, for example, use 101, 200, and so on. You can change the priority setting for a rule group association after you create it.
     *
     * The allowed values for `Priority` are between 100 and 9900 (excluding 100 and 9900).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html#cfn-route53resolver-firewallrulegroupassociation-priority
     */
    readonly priority: number;

    /**
     * The unique identifier of the VPC that is associated with the rule group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html#cfn-route53resolver-firewallrulegroupassociation-vpcid
     */
    readonly vpcId: string;

    /**
     * If enabled, this setting disallows modification or removal of the association, to help prevent against accidentally altering DNS firewall protections.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html#cfn-route53resolver-firewallrulegroupassociation-mutationprotection
     */
    readonly mutationProtection?: string;

    /**
     * The name of the association.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html#cfn-route53resolver-firewallrulegroupassociation-name
     */
    readonly name?: string;

    /**
     * A list of the tag keys and values that you want to associate with the rule group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html#cfn-route53resolver-firewallrulegroupassociation-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnFirewallRuleGroupAssociationProps`
 *
 * @param properties - the TypeScript properties of a `CfnFirewallRuleGroupAssociationProps`
 *
 * @returns the result of the validation.
 */
function CfnFirewallRuleGroupAssociationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('firewallRuleGroupId', cdk.requiredValidator)(properties.firewallRuleGroupId));
    errors.collect(cdk.propertyValidator('firewallRuleGroupId', cdk.validateString)(properties.firewallRuleGroupId));
    errors.collect(cdk.propertyValidator('mutationProtection', cdk.validateString)(properties.mutationProtection));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('priority', cdk.requiredValidator)(properties.priority));
    errors.collect(cdk.propertyValidator('priority', cdk.validateNumber)(properties.priority));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('vpcId', cdk.requiredValidator)(properties.vpcId));
    errors.collect(cdk.propertyValidator('vpcId', cdk.validateString)(properties.vpcId));
    return errors.wrap('supplied properties not correct for "CfnFirewallRuleGroupAssociationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Route53Resolver::FirewallRuleGroupAssociation` resource
 *
 * @param properties - the TypeScript properties of a `CfnFirewallRuleGroupAssociationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Route53Resolver::FirewallRuleGroupAssociation` resource.
 */
// @ts-ignore TS6133
function cfnFirewallRuleGroupAssociationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnFirewallRuleGroupAssociationPropsValidator(properties).assertSuccess();
    return {
        FirewallRuleGroupId: cdk.stringToCloudFormation(properties.firewallRuleGroupId),
        Priority: cdk.numberToCloudFormation(properties.priority),
        VpcId: cdk.stringToCloudFormation(properties.vpcId),
        MutationProtection: cdk.stringToCloudFormation(properties.mutationProtection),
        Name: cdk.stringToCloudFormation(properties.name),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnFirewallRuleGroupAssociationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnFirewallRuleGroupAssociationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnFirewallRuleGroupAssociationProps>();
    ret.addPropertyResult('firewallRuleGroupId', 'FirewallRuleGroupId', cfn_parse.FromCloudFormation.getString(properties.FirewallRuleGroupId));
    ret.addPropertyResult('priority', 'Priority', cfn_parse.FromCloudFormation.getNumber(properties.Priority));
    ret.addPropertyResult('vpcId', 'VpcId', cfn_parse.FromCloudFormation.getString(properties.VpcId));
    ret.addPropertyResult('mutationProtection', 'MutationProtection', properties.MutationProtection != null ? cfn_parse.FromCloudFormation.getString(properties.MutationProtection) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Route53Resolver::FirewallRuleGroupAssociation`
 *
 * An association between a firewall rule group and a VPC, which enables DNS filtering for the VPC.
 *
 * @cloudformationResource AWS::Route53Resolver::FirewallRuleGroupAssociation
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html
 */
export class CfnFirewallRuleGroupAssociation extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Route53Resolver::FirewallRuleGroupAssociation";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnFirewallRuleGroupAssociation {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnFirewallRuleGroupAssociationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnFirewallRuleGroupAssociation(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the firewall rule group association.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The date and time that the association was created, in Unix time format and Coordinated Universal Time (UTC).
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: string;

    /**
     * A unique string defined by you to identify the request. This allows you to retry failed requests without the risk of running the operation twice. This can be any unique string, for example, a timestamp.
     * @cloudformationAttribute CreatorRequestId
     */
    public readonly attrCreatorRequestId: string;

    /**
     * The identifier for the association.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The owner of the association, used only for associations that are not managed by you. If you use AWS Firewall Manager to manage your firewallls from DNS Firewall, then this reports Firewall Manager as the managed owner.
     * @cloudformationAttribute ManagedOwnerName
     */
    public readonly attrManagedOwnerName: string;

    /**
     * The date and time that the association was last modified, in Unix time format and Coordinated Universal Time (UTC).
     * @cloudformationAttribute ModificationTime
     */
    public readonly attrModificationTime: string;

    /**
     * The current status of the association.
     * @cloudformationAttribute Status
     */
    public readonly attrStatus: string;

    /**
     * Additional information about the status of the response, if available.
     * @cloudformationAttribute StatusMessage
     */
    public readonly attrStatusMessage: string;

    /**
     * The unique identifier of the firewall rule group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html#cfn-route53resolver-firewallrulegroupassociation-firewallrulegroupid
     */
    public firewallRuleGroupId: string;

    /**
     * The setting that determines the processing order of the rule group among the rule groups that are associated with a single VPC. DNS Firewall filters VPC traffic starting from rule group with the lowest numeric priority setting.
     *
     * You must specify a unique priority for each rule group that you associate with a single VPC. To make it easier to insert rule groups later, leave space between the numbers, for example, use 101, 200, and so on. You can change the priority setting for a rule group association after you create it.
     *
     * The allowed values for `Priority` are between 100 and 9900 (excluding 100 and 9900).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html#cfn-route53resolver-firewallrulegroupassociation-priority
     */
    public priority: number;

    /**
     * The unique identifier of the VPC that is associated with the rule group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html#cfn-route53resolver-firewallrulegroupassociation-vpcid
     */
    public vpcId: string;

    /**
     * If enabled, this setting disallows modification or removal of the association, to help prevent against accidentally altering DNS firewall protections.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html#cfn-route53resolver-firewallrulegroupassociation-mutationprotection
     */
    public mutationProtection: string | undefined;

    /**
     * The name of the association.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html#cfn-route53resolver-firewallrulegroupassociation-name
     */
    public name: string | undefined;

    /**
     * A list of the tag keys and values that you want to associate with the rule group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-firewallrulegroupassociation.html#cfn-route53resolver-firewallrulegroupassociation-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Route53Resolver::FirewallRuleGroupAssociation`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnFirewallRuleGroupAssociationProps) {
        super(scope, id, { type: CfnFirewallRuleGroupAssociation.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'firewallRuleGroupId', this);
        cdk.requireProperty(props, 'priority', this);
        cdk.requireProperty(props, 'vpcId', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrCreationTime = cdk.Token.asString(this.getAtt('CreationTime'));
        this.attrCreatorRequestId = cdk.Token.asString(this.getAtt('CreatorRequestId'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));
        this.attrManagedOwnerName = cdk.Token.asString(this.getAtt('ManagedOwnerName'));
        this.attrModificationTime = cdk.Token.asString(this.getAtt('ModificationTime'));
        this.attrStatus = cdk.Token.asString(this.getAtt('Status'));
        this.attrStatusMessage = cdk.Token.asString(this.getAtt('StatusMessage'));

        this.firewallRuleGroupId = props.firewallRuleGroupId;
        this.priority = props.priority;
        this.vpcId = props.vpcId;
        this.mutationProtection = props.mutationProtection;
        this.name = props.name;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Route53Resolver::FirewallRuleGroupAssociation", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnFirewallRuleGroupAssociation.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            firewallRuleGroupId: this.firewallRuleGroupId,
            priority: this.priority,
            vpcId: this.vpcId,
            mutationProtection: this.mutationProtection,
            name: this.name,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnFirewallRuleGroupAssociationPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnResolverConfig`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverconfig.html
 */
export interface CfnResolverConfigProps {

    /**
     * Represents the desired status of `AutodefinedReverse` . The only supported value on creation is `DISABLE` . Deletion of this resource will return `AutodefinedReverse` to its default value of `ENABLED` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverconfig.html#cfn-route53resolver-resolverconfig-autodefinedreverseflag
     */
    readonly autodefinedReverseFlag: string;

    /**
     * The ID of the Amazon Virtual Private Cloud VPC that you're configuring Resolver for.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverconfig.html#cfn-route53resolver-resolverconfig-resourceid
     */
    readonly resourceId: string;
}

/**
 * Determine whether the given properties match those of a `CfnResolverConfigProps`
 *
 * @param properties - the TypeScript properties of a `CfnResolverConfigProps`
 *
 * @returns the result of the validation.
 */
function CfnResolverConfigPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('autodefinedReverseFlag', cdk.requiredValidator)(properties.autodefinedReverseFlag));
    errors.collect(cdk.propertyValidator('autodefinedReverseFlag', cdk.validateString)(properties.autodefinedReverseFlag));
    errors.collect(cdk.propertyValidator('resourceId', cdk.requiredValidator)(properties.resourceId));
    errors.collect(cdk.propertyValidator('resourceId', cdk.validateString)(properties.resourceId));
    return errors.wrap('supplied properties not correct for "CfnResolverConfigProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverConfig` resource
 *
 * @param properties - the TypeScript properties of a `CfnResolverConfigProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverConfig` resource.
 */
// @ts-ignore TS6133
function cfnResolverConfigPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnResolverConfigPropsValidator(properties).assertSuccess();
    return {
        AutodefinedReverseFlag: cdk.stringToCloudFormation(properties.autodefinedReverseFlag),
        ResourceId: cdk.stringToCloudFormation(properties.resourceId),
    };
}

// @ts-ignore TS6133
function CfnResolverConfigPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnResolverConfigProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnResolverConfigProps>();
    ret.addPropertyResult('autodefinedReverseFlag', 'AutodefinedReverseFlag', cfn_parse.FromCloudFormation.getString(properties.AutodefinedReverseFlag));
    ret.addPropertyResult('resourceId', 'ResourceId', cfn_parse.FromCloudFormation.getString(properties.ResourceId));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Route53Resolver::ResolverConfig`
 *
 * A complex type that contains information about a Resolver configuration for a VPC.
 *
 * @cloudformationResource AWS::Route53Resolver::ResolverConfig
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverconfig.html
 */
export class CfnResolverConfig extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Route53Resolver::ResolverConfig";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnResolverConfig {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnResolverConfigPropsFromCloudFormation(resourceProperties);
        const ret = new CfnResolverConfig(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The status of whether or not the Route 53 Resolver will create autodefined rules for reverse DNS lookups. This is enabled by default.
     * @cloudformationAttribute AutodefinedReverse
     */
    public readonly attrAutodefinedReverse: string;

    /**
     * ID for the Route 53 Resolver configuration.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The owner account ID of the Amazon Virtual Private Cloud VPC.
     * @cloudformationAttribute OwnerId
     */
    public readonly attrOwnerId: string;

    /**
     * Represents the desired status of `AutodefinedReverse` . The only supported value on creation is `DISABLE` . Deletion of this resource will return `AutodefinedReverse` to its default value of `ENABLED` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverconfig.html#cfn-route53resolver-resolverconfig-autodefinedreverseflag
     */
    public autodefinedReverseFlag: string;

    /**
     * The ID of the Amazon Virtual Private Cloud VPC that you're configuring Resolver for.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverconfig.html#cfn-route53resolver-resolverconfig-resourceid
     */
    public resourceId: string;

    /**
     * Create a new `AWS::Route53Resolver::ResolverConfig`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnResolverConfigProps) {
        super(scope, id, { type: CfnResolverConfig.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'autodefinedReverseFlag', this);
        cdk.requireProperty(props, 'resourceId', this);
        this.attrAutodefinedReverse = cdk.Token.asString(this.getAtt('AutodefinedReverse'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));
        this.attrOwnerId = cdk.Token.asString(this.getAtt('OwnerId'));

        this.autodefinedReverseFlag = props.autodefinedReverseFlag;
        this.resourceId = props.resourceId;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnResolverConfig.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            autodefinedReverseFlag: this.autodefinedReverseFlag,
            resourceId: this.resourceId,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnResolverConfigPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnResolverDNSSECConfig`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverdnssecconfig.html
 */
export interface CfnResolverDNSSECConfigProps {

    /**
     * The ID of the virtual private cloud (VPC) that you're configuring the DNSSEC validation status for.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverdnssecconfig.html#cfn-route53resolver-resolverdnssecconfig-resourceid
     */
    readonly resourceId?: string;
}

/**
 * Determine whether the given properties match those of a `CfnResolverDNSSECConfigProps`
 *
 * @param properties - the TypeScript properties of a `CfnResolverDNSSECConfigProps`
 *
 * @returns the result of the validation.
 */
function CfnResolverDNSSECConfigPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('resourceId', cdk.validateString)(properties.resourceId));
    return errors.wrap('supplied properties not correct for "CfnResolverDNSSECConfigProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverDNSSECConfig` resource
 *
 * @param properties - the TypeScript properties of a `CfnResolverDNSSECConfigProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverDNSSECConfig` resource.
 */
// @ts-ignore TS6133
function cfnResolverDNSSECConfigPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnResolverDNSSECConfigPropsValidator(properties).assertSuccess();
    return {
        ResourceId: cdk.stringToCloudFormation(properties.resourceId),
    };
}

// @ts-ignore TS6133
function CfnResolverDNSSECConfigPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnResolverDNSSECConfigProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnResolverDNSSECConfigProps>();
    ret.addPropertyResult('resourceId', 'ResourceId', properties.ResourceId != null ? cfn_parse.FromCloudFormation.getString(properties.ResourceId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Route53Resolver::ResolverDNSSECConfig`
 *
 * The `AWS::Route53Resolver::ResolverDNSSECConfig` resource is a complex type that contains information about a configuration for DNSSEC validation.
 *
 * @cloudformationResource AWS::Route53Resolver::ResolverDNSSECConfig
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverdnssecconfig.html
 */
export class CfnResolverDNSSECConfig extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Route53Resolver::ResolverDNSSECConfig";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnResolverDNSSECConfig {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnResolverDNSSECConfigPropsFromCloudFormation(resourceProperties);
        const ret = new CfnResolverDNSSECConfig(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The primary identifier of this `ResolverDNSSECConfig` resource. For example: `rdsc-689d45d1ae623bf3` .
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The AWS account of the owner. For example: `111122223333` .
     * @cloudformationAttribute OwnerId
     */
    public readonly attrOwnerId: string;

    /**
     * The current status of this `ResolverDNSSECConfig` resource. For example: `Enabled` .
     * @cloudformationAttribute ValidationStatus
     */
    public readonly attrValidationStatus: string;

    /**
     * The ID of the virtual private cloud (VPC) that you're configuring the DNSSEC validation status for.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverdnssecconfig.html#cfn-route53resolver-resolverdnssecconfig-resourceid
     */
    public resourceId: string | undefined;

    /**
     * Create a new `AWS::Route53Resolver::ResolverDNSSECConfig`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnResolverDNSSECConfigProps = {}) {
        super(scope, id, { type: CfnResolverDNSSECConfig.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrId = cdk.Token.asString(this.getAtt('Id'));
        this.attrOwnerId = cdk.Token.asString(this.getAtt('OwnerId'));
        this.attrValidationStatus = cdk.Token.asString(this.getAtt('ValidationStatus'));

        this.resourceId = props.resourceId;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnResolverDNSSECConfig.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            resourceId: this.resourceId,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnResolverDNSSECConfigPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnResolverEndpoint`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverendpoint.html
 */
export interface CfnResolverEndpointProps {

    /**
     * Indicates whether the Resolver endpoint allows inbound or outbound DNS queries:
     *
     * - `INBOUND` : allows DNS queries to your VPC from your network
     * - `OUTBOUND` : allows DNS queries from your VPC to your network
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverendpoint.html#cfn-route53resolver-resolverendpoint-direction
     */
    readonly direction: string;

    /**
     * The subnets and IP addresses in your VPC that DNS queries originate from (for outbound endpoints) or that you forward DNS queries to (for inbound endpoints). The subnet ID uniquely identifies a VPC.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverendpoint.html#cfn-route53resolver-resolverendpoint-ipaddresses
     */
    readonly ipAddresses: Array<CfnResolverEndpoint.IpAddressRequestProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The ID of one or more security groups that control access to this VPC. The security group must include one or more inbound rules (for inbound endpoints) or outbound rules (for outbound endpoints). Inbound and outbound rules must allow TCP and UDP access. For inbound access, open port 53. For outbound access, open the port that you're using for DNS queries on your network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverendpoint.html#cfn-route53resolver-resolverendpoint-securitygroupids
     */
    readonly securityGroupIds: string[];

    /**
     * A friendly name that lets you easily find a configuration in the Resolver dashboard in the Route 53 console.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverendpoint.html#cfn-route53resolver-resolverendpoint-name
     */
    readonly name?: string;

    /**
     * Route 53 Resolver doesn't support updating tags through CloudFormation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverendpoint.html#cfn-route53resolver-resolverendpoint-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnResolverEndpointProps`
 *
 * @param properties - the TypeScript properties of a `CfnResolverEndpointProps`
 *
 * @returns the result of the validation.
 */
function CfnResolverEndpointPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('direction', cdk.requiredValidator)(properties.direction));
    errors.collect(cdk.propertyValidator('direction', cdk.validateString)(properties.direction));
    errors.collect(cdk.propertyValidator('ipAddresses', cdk.requiredValidator)(properties.ipAddresses));
    errors.collect(cdk.propertyValidator('ipAddresses', cdk.listValidator(CfnResolverEndpoint_IpAddressRequestPropertyValidator))(properties.ipAddresses));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.requiredValidator)(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnResolverEndpointProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverEndpoint` resource
 *
 * @param properties - the TypeScript properties of a `CfnResolverEndpointProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverEndpoint` resource.
 */
// @ts-ignore TS6133
function cfnResolverEndpointPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnResolverEndpointPropsValidator(properties).assertSuccess();
    return {
        Direction: cdk.stringToCloudFormation(properties.direction),
        IpAddresses: cdk.listMapper(cfnResolverEndpointIpAddressRequestPropertyToCloudFormation)(properties.ipAddresses),
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        Name: cdk.stringToCloudFormation(properties.name),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnResolverEndpointPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnResolverEndpointProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnResolverEndpointProps>();
    ret.addPropertyResult('direction', 'Direction', cfn_parse.FromCloudFormation.getString(properties.Direction));
    ret.addPropertyResult('ipAddresses', 'IpAddresses', cfn_parse.FromCloudFormation.getArray(CfnResolverEndpointIpAddressRequestPropertyFromCloudFormation)(properties.IpAddresses));
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Route53Resolver::ResolverEndpoint`
 *
 * Creates a Resolver endpoint. There are two types of Resolver endpoints, inbound and outbound:
 *
 * - An *inbound Resolver endpoint* forwards DNS queries to the DNS service for a VPC from your network.
 * - An *outbound Resolver endpoint* forwards DNS queries from the DNS service for a VPC to your network.
 *
 * @cloudformationResource AWS::Route53Resolver::ResolverEndpoint
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverendpoint.html
 */
export class CfnResolverEndpoint extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Route53Resolver::ResolverEndpoint";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnResolverEndpoint {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnResolverEndpointPropsFromCloudFormation(resourceProperties);
        const ret = new CfnResolverEndpoint(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the resolver endpoint, such as `arn:aws:route53resolver:us-east-1:123456789012:resolver-endpoint/resolver-endpoint-a1bzhi` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * Indicates whether the resolver endpoint allows inbound or outbound DNS queries.
     * @cloudformationAttribute Direction
     */
    public readonly attrDirection: string;

    /**
     * The ID of the VPC that you want to create the resolver endpoint in.
     * @cloudformationAttribute HostVPCId
     */
    public readonly attrHostVpcId: string;

    /**
     * The number of IP addresses that the resolver endpoint can use for DNS queries.
     * @cloudformationAttribute IpAddressCount
     */
    public readonly attrIpAddressCount: string;

    /**
     * The name that you assigned to the resolver endpoint when you created the endpoint.
     * @cloudformationAttribute Name
     */
    public readonly attrName: string;

    /**
     * The ID of the resolver endpoint.
     * @cloudformationAttribute ResolverEndpointId
     */
    public readonly attrResolverEndpointId: string;

    /**
     * Indicates whether the Resolver endpoint allows inbound or outbound DNS queries:
     *
     * - `INBOUND` : allows DNS queries to your VPC from your network
     * - `OUTBOUND` : allows DNS queries from your VPC to your network
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverendpoint.html#cfn-route53resolver-resolverendpoint-direction
     */
    public direction: string;

    /**
     * The subnets and IP addresses in your VPC that DNS queries originate from (for outbound endpoints) or that you forward DNS queries to (for inbound endpoints). The subnet ID uniquely identifies a VPC.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverendpoint.html#cfn-route53resolver-resolverendpoint-ipaddresses
     */
    public ipAddresses: Array<CfnResolverEndpoint.IpAddressRequestProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The ID of one or more security groups that control access to this VPC. The security group must include one or more inbound rules (for inbound endpoints) or outbound rules (for outbound endpoints). Inbound and outbound rules must allow TCP and UDP access. For inbound access, open port 53. For outbound access, open the port that you're using for DNS queries on your network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverendpoint.html#cfn-route53resolver-resolverendpoint-securitygroupids
     */
    public securityGroupIds: string[];

    /**
     * A friendly name that lets you easily find a configuration in the Resolver dashboard in the Route 53 console.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverendpoint.html#cfn-route53resolver-resolverendpoint-name
     */
    public name: string | undefined;

    /**
     * Route 53 Resolver doesn't support updating tags through CloudFormation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverendpoint.html#cfn-route53resolver-resolverendpoint-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Route53Resolver::ResolverEndpoint`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnResolverEndpointProps) {
        super(scope, id, { type: CfnResolverEndpoint.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'direction', this);
        cdk.requireProperty(props, 'ipAddresses', this);
        cdk.requireProperty(props, 'securityGroupIds', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrDirection = cdk.Token.asString(this.getAtt('Direction'));
        this.attrHostVpcId = cdk.Token.asString(this.getAtt('HostVPCId'));
        this.attrIpAddressCount = cdk.Token.asString(this.getAtt('IpAddressCount'));
        this.attrName = cdk.Token.asString(this.getAtt('Name'));
        this.attrResolverEndpointId = cdk.Token.asString(this.getAtt('ResolverEndpointId'));

        this.direction = props.direction;
        this.ipAddresses = props.ipAddresses;
        this.securityGroupIds = props.securityGroupIds;
        this.name = props.name;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Route53Resolver::ResolverEndpoint", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnResolverEndpoint.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            direction: this.direction,
            ipAddresses: this.ipAddresses,
            securityGroupIds: this.securityGroupIds,
            name: this.name,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnResolverEndpointPropsToCloudFormation(props);
    }
}

export namespace CfnResolverEndpoint {
    /**
     * In a [CreateResolverEndpoint](https://docs.aws.amazon.com/Route53/latest/APIReference/API_route53resolver_CreateResolverEndpoint.html) request, the IP address that DNS queries originate from (for outbound endpoints) or that you forward DNS queries to (for inbound endpoints). `IpAddressRequest` also includes the ID of the subnet that contains the IP address.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-resolverendpoint-ipaddressrequest.html
     */
    export interface IpAddressRequestProperty {
        /**
         * The IP address that you want to use for DNS queries.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-resolverendpoint-ipaddressrequest.html#cfn-route53resolver-resolverendpoint-ipaddressrequest-ip
         */
        readonly ip?: string;
        /**
         * The ID of the subnet that contains the IP address.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-resolverendpoint-ipaddressrequest.html#cfn-route53resolver-resolverendpoint-ipaddressrequest-subnetid
         */
        readonly subnetId: string;
    }
}

/**
 * Determine whether the given properties match those of a `IpAddressRequestProperty`
 *
 * @param properties - the TypeScript properties of a `IpAddressRequestProperty`
 *
 * @returns the result of the validation.
 */
function CfnResolverEndpoint_IpAddressRequestPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('ip', cdk.validateString)(properties.ip));
    errors.collect(cdk.propertyValidator('subnetId', cdk.requiredValidator)(properties.subnetId));
    errors.collect(cdk.propertyValidator('subnetId', cdk.validateString)(properties.subnetId));
    return errors.wrap('supplied properties not correct for "IpAddressRequestProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverEndpoint.IpAddressRequest` resource
 *
 * @param properties - the TypeScript properties of a `IpAddressRequestProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverEndpoint.IpAddressRequest` resource.
 */
// @ts-ignore TS6133
function cfnResolverEndpointIpAddressRequestPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnResolverEndpoint_IpAddressRequestPropertyValidator(properties).assertSuccess();
    return {
        Ip: cdk.stringToCloudFormation(properties.ip),
        SubnetId: cdk.stringToCloudFormation(properties.subnetId),
    };
}

// @ts-ignore TS6133
function CfnResolverEndpointIpAddressRequestPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnResolverEndpoint.IpAddressRequestProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnResolverEndpoint.IpAddressRequestProperty>();
    ret.addPropertyResult('ip', 'Ip', properties.Ip != null ? cfn_parse.FromCloudFormation.getString(properties.Ip) : undefined);
    ret.addPropertyResult('subnetId', 'SubnetId', cfn_parse.FromCloudFormation.getString(properties.SubnetId));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnResolverQueryLoggingConfig`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverqueryloggingconfig.html
 */
export interface CfnResolverQueryLoggingConfigProps {

    /**
     * The ARN of the resource that you want Resolver to send query logs: an Amazon S3 bucket, a CloudWatch Logs log group, or a Kinesis Data Firehose delivery stream.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverqueryloggingconfig.html#cfn-route53resolver-resolverqueryloggingconfig-destinationarn
     */
    readonly destinationArn?: string;

    /**
     * The name of the query logging configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverqueryloggingconfig.html#cfn-route53resolver-resolverqueryloggingconfig-name
     */
    readonly name?: string;
}

/**
 * Determine whether the given properties match those of a `CfnResolverQueryLoggingConfigProps`
 *
 * @param properties - the TypeScript properties of a `CfnResolverQueryLoggingConfigProps`
 *
 * @returns the result of the validation.
 */
function CfnResolverQueryLoggingConfigPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('destinationArn', cdk.validateString)(properties.destinationArn));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "CfnResolverQueryLoggingConfigProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverQueryLoggingConfig` resource
 *
 * @param properties - the TypeScript properties of a `CfnResolverQueryLoggingConfigProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverQueryLoggingConfig` resource.
 */
// @ts-ignore TS6133
function cfnResolverQueryLoggingConfigPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnResolverQueryLoggingConfigPropsValidator(properties).assertSuccess();
    return {
        DestinationArn: cdk.stringToCloudFormation(properties.destinationArn),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnResolverQueryLoggingConfigPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnResolverQueryLoggingConfigProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnResolverQueryLoggingConfigProps>();
    ret.addPropertyResult('destinationArn', 'DestinationArn', properties.DestinationArn != null ? cfn_parse.FromCloudFormation.getString(properties.DestinationArn) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Route53Resolver::ResolverQueryLoggingConfig`
 *
 * The AWS::Route53Resolver::ResolverQueryLoggingConfig resource is a complex type that contains settings for one query logging configuration.
 *
 * @cloudformationResource AWS::Route53Resolver::ResolverQueryLoggingConfig
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverqueryloggingconfig.html
 */
export class CfnResolverQueryLoggingConfig extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Route53Resolver::ResolverQueryLoggingConfig";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnResolverQueryLoggingConfig {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnResolverQueryLoggingConfigPropsFromCloudFormation(resourceProperties);
        const ret = new CfnResolverQueryLoggingConfig(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) for the query logging configuration.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * The number of VPCs that are associated with the query logging configuration.
     * @cloudformationAttribute AssociationCount
     */
    public readonly attrAssociationCount: number;

    /**
     * The date and time that the query logging configuration was created, in Unix time format and Coordinated Universal Time (UTC).
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: string;

    /**
     * A unique string that identifies the request that created the query logging configuration. The `CreatorRequestId` allows failed requests to be retried without the risk of running the operation twice.
     * @cloudformationAttribute CreatorRequestId
     */
    public readonly attrCreatorRequestId: string;

    /**
     * The ID for the query logging configuration.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The AWS account ID for the account that created the query logging configuration.
     * @cloudformationAttribute OwnerId
     */
    public readonly attrOwnerId: string;

    /**
     * An indication of whether the query logging configuration is shared with other AWS account s, or was shared with the current account by another AWS account . Sharing is configured through AWS Resource Access Manager ( AWS RAM ).
     * @cloudformationAttribute ShareStatus
     */
    public readonly attrShareStatus: string;

    /**
     * The status of the specified query logging configuration. Valid values include the following:
     *
     * - `CREATING` : Resolver is creating the query logging configuration.
     * - `CREATED` : The query logging configuration was successfully created. Resolver is logging queries that originate in the specified VPC.
     * - `DELETING` : Resolver is deleting this query logging configuration.
     * - `FAILED` : Resolver can't deliver logs to the location that is specified in the query logging configuration. Here are two common causes:
     *
     * - The specified destination (for example, an Amazon S3 bucket) was deleted.
     * - Permissions don't allow sending logs to the destination.
     * @cloudformationAttribute Status
     */
    public readonly attrStatus: string;

    /**
     * The ARN of the resource that you want Resolver to send query logs: an Amazon S3 bucket, a CloudWatch Logs log group, or a Kinesis Data Firehose delivery stream.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverqueryloggingconfig.html#cfn-route53resolver-resolverqueryloggingconfig-destinationarn
     */
    public destinationArn: string | undefined;

    /**
     * The name of the query logging configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverqueryloggingconfig.html#cfn-route53resolver-resolverqueryloggingconfig-name
     */
    public name: string | undefined;

    /**
     * Create a new `AWS::Route53Resolver::ResolverQueryLoggingConfig`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnResolverQueryLoggingConfigProps = {}) {
        super(scope, id, { type: CfnResolverQueryLoggingConfig.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrAssociationCount = cdk.Token.asNumber(this.getAtt('AssociationCount'));
        this.attrCreationTime = cdk.Token.asString(this.getAtt('CreationTime'));
        this.attrCreatorRequestId = cdk.Token.asString(this.getAtt('CreatorRequestId'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));
        this.attrOwnerId = cdk.Token.asString(this.getAtt('OwnerId'));
        this.attrShareStatus = cdk.Token.asString(this.getAtt('ShareStatus'));
        this.attrStatus = cdk.Token.asString(this.getAtt('Status'));

        this.destinationArn = props.destinationArn;
        this.name = props.name;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnResolverQueryLoggingConfig.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            destinationArn: this.destinationArn,
            name: this.name,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnResolverQueryLoggingConfigPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnResolverQueryLoggingConfigAssociation`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverqueryloggingconfigassociation.html
 */
export interface CfnResolverQueryLoggingConfigAssociationProps {

    /**
     * The ID of the query logging configuration that a VPC is associated with.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverqueryloggingconfigassociation.html#cfn-route53resolver-resolverqueryloggingconfigassociation-resolverquerylogconfigid
     */
    readonly resolverQueryLogConfigId?: string;

    /**
     * The ID of the Amazon VPC that is associated with the query logging configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverqueryloggingconfigassociation.html#cfn-route53resolver-resolverqueryloggingconfigassociation-resourceid
     */
    readonly resourceId?: string;
}

/**
 * Determine whether the given properties match those of a `CfnResolverQueryLoggingConfigAssociationProps`
 *
 * @param properties - the TypeScript properties of a `CfnResolverQueryLoggingConfigAssociationProps`
 *
 * @returns the result of the validation.
 */
function CfnResolverQueryLoggingConfigAssociationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('resolverQueryLogConfigId', cdk.validateString)(properties.resolverQueryLogConfigId));
    errors.collect(cdk.propertyValidator('resourceId', cdk.validateString)(properties.resourceId));
    return errors.wrap('supplied properties not correct for "CfnResolverQueryLoggingConfigAssociationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation` resource
 *
 * @param properties - the TypeScript properties of a `CfnResolverQueryLoggingConfigAssociationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation` resource.
 */
// @ts-ignore TS6133
function cfnResolverQueryLoggingConfigAssociationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnResolverQueryLoggingConfigAssociationPropsValidator(properties).assertSuccess();
    return {
        ResolverQueryLogConfigId: cdk.stringToCloudFormation(properties.resolverQueryLogConfigId),
        ResourceId: cdk.stringToCloudFormation(properties.resourceId),
    };
}

// @ts-ignore TS6133
function CfnResolverQueryLoggingConfigAssociationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnResolverQueryLoggingConfigAssociationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnResolverQueryLoggingConfigAssociationProps>();
    ret.addPropertyResult('resolverQueryLogConfigId', 'ResolverQueryLogConfigId', properties.ResolverQueryLogConfigId != null ? cfn_parse.FromCloudFormation.getString(properties.ResolverQueryLogConfigId) : undefined);
    ret.addPropertyResult('resourceId', 'ResourceId', properties.ResourceId != null ? cfn_parse.FromCloudFormation.getString(properties.ResourceId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation`
 *
 * The AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation resource is a configuration for DNS query logging. After you create a query logging configuration, Amazon Route 53 begins to publish log data to an Amazon CloudWatch Logs log group.
 *
 * @cloudformationResource AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverqueryloggingconfigassociation.html
 */
export class CfnResolverQueryLoggingConfigAssociation extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnResolverQueryLoggingConfigAssociation {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnResolverQueryLoggingConfigAssociationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnResolverQueryLoggingConfigAssociation(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The date and time that the VPC was associated with the query logging configuration, in Unix time format and Coordinated Universal Time (UTC).
     * @cloudformationAttribute CreationTime
     */
    public readonly attrCreationTime: string;

    /**
     * If the value of `Status` is `FAILED` , the value of `Error` indicates the cause:
     *
     * - `DESTINATION_NOT_FOUND` : The specified destination (for example, an Amazon S3 bucket) was deleted.
     * - `ACCESS_DENIED` : Permissions don't allow sending logs to the destination.
     *
     * If the value of `Status` is a value other than `FAILED` , `Error` is null.
     * @cloudformationAttribute Error
     */
    public readonly attrError: string;

    /**
     * Contains additional information about the error. If the value or `Error` is null, the value of `ErrorMessage` is also null.
     * @cloudformationAttribute ErrorMessage
     */
    public readonly attrErrorMessage: string;

    /**
     * The ID of the query logging association.
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The status of the specified query logging association. Valid values include the following:
     *
     * - `CREATING` : Resolver is creating an association between an Amazon Virtual Private Cloud (Amazon VPC) and a query logging configuration.
     * - `CREATED` : The association between an Amazon VPC and a query logging configuration was successfully created. Resolver is logging queries that originate in the specified VPC.
     * - `DELETING` : Resolver is deleting this query logging association.
     * - `FAILED` : Resolver either couldn't create or couldn't delete the query logging association.
     * @cloudformationAttribute Status
     */
    public readonly attrStatus: string;

    /**
     * The ID of the query logging configuration that a VPC is associated with.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverqueryloggingconfigassociation.html#cfn-route53resolver-resolverqueryloggingconfigassociation-resolverquerylogconfigid
     */
    public resolverQueryLogConfigId: string | undefined;

    /**
     * The ID of the Amazon VPC that is associated with the query logging configuration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverqueryloggingconfigassociation.html#cfn-route53resolver-resolverqueryloggingconfigassociation-resourceid
     */
    public resourceId: string | undefined;

    /**
     * Create a new `AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnResolverQueryLoggingConfigAssociationProps = {}) {
        super(scope, id, { type: CfnResolverQueryLoggingConfigAssociation.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrCreationTime = cdk.Token.asString(this.getAtt('CreationTime'));
        this.attrError = cdk.Token.asString(this.getAtt('Error'));
        this.attrErrorMessage = cdk.Token.asString(this.getAtt('ErrorMessage'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));
        this.attrStatus = cdk.Token.asString(this.getAtt('Status'));

        this.resolverQueryLogConfigId = props.resolverQueryLogConfigId;
        this.resourceId = props.resourceId;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnResolverQueryLoggingConfigAssociation.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            resolverQueryLogConfigId: this.resolverQueryLogConfigId,
            resourceId: this.resourceId,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnResolverQueryLoggingConfigAssociationPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnResolverRule`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html
 */
export interface CfnResolverRuleProps {

    /**
     * DNS queries for this domain name are forwarded to the IP addresses that are specified in `TargetIps` . If a query matches multiple Resolver rules (example.com and www.example.com), the query is routed using the Resolver rule that contains the most specific domain name (www.example.com).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html#cfn-route53resolver-resolverrule-domainname
     */
    readonly domainName: string;

    /**
     * When you want to forward DNS queries for specified domain name to resolvers on your network, specify `FORWARD` .
     *
     * When you have a forwarding rule to forward DNS queries for a domain to your network and you want Resolver to process queries for a subdomain of that domain, specify `SYSTEM` .
     *
     * For example, to forward DNS queries for example.com to resolvers on your network, you create a rule and specify `FORWARD` for `RuleType` . To then have Resolver process queries for apex.example.com, you create a rule and specify `SYSTEM` for `RuleType` .
     *
     * Currently, only Resolver can create rules that have a value of `RECURSIVE` for `RuleType` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html#cfn-route53resolver-resolverrule-ruletype
     */
    readonly ruleType: string;

    /**
     * The name for the Resolver rule, which you specified when you created the Resolver rule.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html#cfn-route53resolver-resolverrule-name
     */
    readonly name?: string;

    /**
     * The ID of the endpoint that the rule is associated with.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html#cfn-route53resolver-resolverrule-resolverendpointid
     */
    readonly resolverEndpointId?: string;

    /**
     * Route 53 Resolver doesn't support updating tags through CloudFormation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html#cfn-route53resolver-resolverrule-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * An array that contains the IP addresses and ports that an outbound endpoint forwards DNS queries to. Typically, these are the IP addresses of DNS resolvers on your network. Specify IPv4 addresses. IPv6 is not supported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html#cfn-route53resolver-resolverrule-targetips
     */
    readonly targetIps?: Array<CfnResolverRule.TargetAddressProperty | cdk.IResolvable> | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnResolverRuleProps`
 *
 * @param properties - the TypeScript properties of a `CfnResolverRuleProps`
 *
 * @returns the result of the validation.
 */
function CfnResolverRulePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('domainName', cdk.requiredValidator)(properties.domainName));
    errors.collect(cdk.propertyValidator('domainName', cdk.validateString)(properties.domainName));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('resolverEndpointId', cdk.validateString)(properties.resolverEndpointId));
    errors.collect(cdk.propertyValidator('ruleType', cdk.requiredValidator)(properties.ruleType));
    errors.collect(cdk.propertyValidator('ruleType', cdk.validateString)(properties.ruleType));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('targetIps', cdk.listValidator(CfnResolverRule_TargetAddressPropertyValidator))(properties.targetIps));
    return errors.wrap('supplied properties not correct for "CfnResolverRuleProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverRule` resource
 *
 * @param properties - the TypeScript properties of a `CfnResolverRuleProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverRule` resource.
 */
// @ts-ignore TS6133
function cfnResolverRulePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnResolverRulePropsValidator(properties).assertSuccess();
    return {
        DomainName: cdk.stringToCloudFormation(properties.domainName),
        RuleType: cdk.stringToCloudFormation(properties.ruleType),
        Name: cdk.stringToCloudFormation(properties.name),
        ResolverEndpointId: cdk.stringToCloudFormation(properties.resolverEndpointId),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        TargetIps: cdk.listMapper(cfnResolverRuleTargetAddressPropertyToCloudFormation)(properties.targetIps),
    };
}

// @ts-ignore TS6133
function CfnResolverRulePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnResolverRuleProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnResolverRuleProps>();
    ret.addPropertyResult('domainName', 'DomainName', cfn_parse.FromCloudFormation.getString(properties.DomainName));
    ret.addPropertyResult('ruleType', 'RuleType', cfn_parse.FromCloudFormation.getString(properties.RuleType));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('resolverEndpointId', 'ResolverEndpointId', properties.ResolverEndpointId != null ? cfn_parse.FromCloudFormation.getString(properties.ResolverEndpointId) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('targetIps', 'TargetIps', properties.TargetIps != null ? cfn_parse.FromCloudFormation.getArray(CfnResolverRuleTargetAddressPropertyFromCloudFormation)(properties.TargetIps) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Route53Resolver::ResolverRule`
 *
 * For DNS queries that originate in your VPCs, specifies which Resolver endpoint the queries pass through, one domain name that you want to forward to your network, and the IP addresses of the DNS resolvers in your network.
 *
 * @cloudformationResource AWS::Route53Resolver::ResolverRule
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html
 */
export class CfnResolverRule extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Route53Resolver::ResolverRule";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnResolverRule {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnResolverRulePropsFromCloudFormation(resourceProperties);
        const ret = new CfnResolverRule(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) of the resolver rule, such as `arn:aws:route53resolver:us-east-1:123456789012:resolver-rule/resolver-rule-a1bzhi` .
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * DNS queries for this domain name are forwarded to the IP addresses that are specified in TargetIps. If a query matches multiple resolver rules (example.com and www.example.com), the query is routed using the resolver rule that contains the most specific domain name (www.example.com).
     * @cloudformationAttribute DomainName
     */
    public readonly attrDomainName: string;

    /**
     * A friendly name that lets you easily find a rule in the Resolver dashboard in the Route 53 console.
     * @cloudformationAttribute Name
     */
    public readonly attrName: string;

    /**
     * The ID of the outbound endpoint that the rule is associated with, such as `rslvr-out-fdc049932dexample` .
     * @cloudformationAttribute ResolverEndpointId
     */
    public readonly attrResolverEndpointId: string;

    /**
     * When the value of `RuleType` is `FORWARD` , the ID that Resolver assigned to the resolver rule when you created it, such as `rslvr-rr-5328a0899aexample` . This value isn't applicable when `RuleType` is `SYSTEM` .
     * @cloudformationAttribute ResolverRuleId
     */
    public readonly attrResolverRuleId: string;

    /**
     * When the value of `RuleType` is `FORWARD` , the IP addresses that the outbound endpoint forwards DNS queries to, typically the IP addresses for DNS resolvers on your network. This value isn't applicable when `RuleType` is `SYSTEM` .
     * @cloudformationAttribute TargetIps
     */
    public readonly attrTargetIps: cdk.IResolvable;

    /**
     * DNS queries for this domain name are forwarded to the IP addresses that are specified in `TargetIps` . If a query matches multiple Resolver rules (example.com and www.example.com), the query is routed using the Resolver rule that contains the most specific domain name (www.example.com).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html#cfn-route53resolver-resolverrule-domainname
     */
    public domainName: string;

    /**
     * When you want to forward DNS queries for specified domain name to resolvers on your network, specify `FORWARD` .
     *
     * When you have a forwarding rule to forward DNS queries for a domain to your network and you want Resolver to process queries for a subdomain of that domain, specify `SYSTEM` .
     *
     * For example, to forward DNS queries for example.com to resolvers on your network, you create a rule and specify `FORWARD` for `RuleType` . To then have Resolver process queries for apex.example.com, you create a rule and specify `SYSTEM` for `RuleType` .
     *
     * Currently, only Resolver can create rules that have a value of `RECURSIVE` for `RuleType` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html#cfn-route53resolver-resolverrule-ruletype
     */
    public ruleType: string;

    /**
     * The name for the Resolver rule, which you specified when you created the Resolver rule.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html#cfn-route53resolver-resolverrule-name
     */
    public name: string | undefined;

    /**
     * The ID of the endpoint that the rule is associated with.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html#cfn-route53resolver-resolverrule-resolverendpointid
     */
    public resolverEndpointId: string | undefined;

    /**
     * Route 53 Resolver doesn't support updating tags through CloudFormation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html#cfn-route53resolver-resolverrule-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * An array that contains the IP addresses and ports that an outbound endpoint forwards DNS queries to. Typically, these are the IP addresses of DNS resolvers on your network. Specify IPv4 addresses. IPv6 is not supported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverrule.html#cfn-route53resolver-resolverrule-targetips
     */
    public targetIps: Array<CfnResolverRule.TargetAddressProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::Route53Resolver::ResolverRule`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnResolverRuleProps) {
        super(scope, id, { type: CfnResolverRule.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'domainName', this);
        cdk.requireProperty(props, 'ruleType', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrDomainName = cdk.Token.asString(this.getAtt('DomainName'));
        this.attrName = cdk.Token.asString(this.getAtt('Name'));
        this.attrResolverEndpointId = cdk.Token.asString(this.getAtt('ResolverEndpointId'));
        this.attrResolverRuleId = cdk.Token.asString(this.getAtt('ResolverRuleId'));
        this.attrTargetIps = this.getAtt('TargetIps');

        this.domainName = props.domainName;
        this.ruleType = props.ruleType;
        this.name = props.name;
        this.resolverEndpointId = props.resolverEndpointId;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Route53Resolver::ResolverRule", props.tags, { tagPropertyName: 'tags' });
        this.targetIps = props.targetIps;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnResolverRule.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            domainName: this.domainName,
            ruleType: this.ruleType,
            name: this.name,
            resolverEndpointId: this.resolverEndpointId,
            tags: this.tags.renderTags(),
            targetIps: this.targetIps,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnResolverRulePropsToCloudFormation(props);
    }
}

export namespace CfnResolverRule {
    /**
     * In a [CreateResolverRule](https://docs.aws.amazon.com/Route53/latest/APIReference/API_route53resolver_CreateResolverRule.html) request, an array of the IPs that you want to forward DNS queries to.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-resolverrule-targetaddress.html
     */
    export interface TargetAddressProperty {
        /**
         * One IP address that you want to forward DNS queries to. You can specify only IPv4 addresses.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-resolverrule-targetaddress.html#cfn-route53resolver-resolverrule-targetaddress-ip
         */
        readonly ip: string;
        /**
         * The port at `Ip` that you want to forward DNS queries to.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53resolver-resolverrule-targetaddress.html#cfn-route53resolver-resolverrule-targetaddress-port
         */
        readonly port?: string;
    }
}

/**
 * Determine whether the given properties match those of a `TargetAddressProperty`
 *
 * @param properties - the TypeScript properties of a `TargetAddressProperty`
 *
 * @returns the result of the validation.
 */
function CfnResolverRule_TargetAddressPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('ip', cdk.requiredValidator)(properties.ip));
    errors.collect(cdk.propertyValidator('ip', cdk.validateString)(properties.ip));
    errors.collect(cdk.propertyValidator('port', cdk.validateString)(properties.port));
    return errors.wrap('supplied properties not correct for "TargetAddressProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverRule.TargetAddress` resource
 *
 * @param properties - the TypeScript properties of a `TargetAddressProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverRule.TargetAddress` resource.
 */
// @ts-ignore TS6133
function cfnResolverRuleTargetAddressPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnResolverRule_TargetAddressPropertyValidator(properties).assertSuccess();
    return {
        Ip: cdk.stringToCloudFormation(properties.ip),
        Port: cdk.stringToCloudFormation(properties.port),
    };
}

// @ts-ignore TS6133
function CfnResolverRuleTargetAddressPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnResolverRule.TargetAddressProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnResolverRule.TargetAddressProperty>();
    ret.addPropertyResult('ip', 'Ip', cfn_parse.FromCloudFormation.getString(properties.Ip));
    ret.addPropertyResult('port', 'Port', properties.Port != null ? cfn_parse.FromCloudFormation.getString(properties.Port) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnResolverRuleAssociation`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverruleassociation.html
 */
export interface CfnResolverRuleAssociationProps {

    /**
     * The ID of the Resolver rule that you associated with the VPC that is specified by `VPCId` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverruleassociation.html#cfn-route53resolver-resolverruleassociation-resolverruleid
     */
    readonly resolverRuleId: string;

    /**
     * The ID of the VPC that you associated the Resolver rule with.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverruleassociation.html#cfn-route53resolver-resolverruleassociation-vpcid
     */
    readonly vpcId: string;

    /**
     * The name of an association between a Resolver rule and a VPC.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverruleassociation.html#cfn-route53resolver-resolverruleassociation-name
     */
    readonly name?: string;
}

/**
 * Determine whether the given properties match those of a `CfnResolverRuleAssociationProps`
 *
 * @param properties - the TypeScript properties of a `CfnResolverRuleAssociationProps`
 *
 * @returns the result of the validation.
 */
function CfnResolverRuleAssociationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('resolverRuleId', cdk.requiredValidator)(properties.resolverRuleId));
    errors.collect(cdk.propertyValidator('resolverRuleId', cdk.validateString)(properties.resolverRuleId));
    errors.collect(cdk.propertyValidator('vpcId', cdk.requiredValidator)(properties.vpcId));
    errors.collect(cdk.propertyValidator('vpcId', cdk.validateString)(properties.vpcId));
    return errors.wrap('supplied properties not correct for "CfnResolverRuleAssociationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverRuleAssociation` resource
 *
 * @param properties - the TypeScript properties of a `CfnResolverRuleAssociationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Route53Resolver::ResolverRuleAssociation` resource.
 */
// @ts-ignore TS6133
function cfnResolverRuleAssociationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnResolverRuleAssociationPropsValidator(properties).assertSuccess();
    return {
        ResolverRuleId: cdk.stringToCloudFormation(properties.resolverRuleId),
        VPCId: cdk.stringToCloudFormation(properties.vpcId),
        Name: cdk.stringToCloudFormation(properties.name),
    };
}

// @ts-ignore TS6133
function CfnResolverRuleAssociationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnResolverRuleAssociationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnResolverRuleAssociationProps>();
    ret.addPropertyResult('resolverRuleId', 'ResolverRuleId', cfn_parse.FromCloudFormation.getString(properties.ResolverRuleId));
    ret.addPropertyResult('vpcId', 'VPCId', cfn_parse.FromCloudFormation.getString(properties.VPCId));
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Route53Resolver::ResolverRuleAssociation`
 *
 * In the response to an [AssociateResolverRule](https://docs.aws.amazon.com/Route53/latest/APIReference/API_route53resolver_AssociateResolverRule.html) , [DisassociateResolverRule](https://docs.aws.amazon.com/Route53/latest/APIReference/API_route53resolver_DisassociateResolverRule.html) , or [ListResolverRuleAssociations](https://docs.aws.amazon.com/Route53/latest/APIReference/API_route53resolver_ListResolverRuleAssociations.html) request, provides information about an association between a resolver rule and a VPC. The association determines which DNS queries that originate in the VPC are forwarded to your network.
 *
 * @cloudformationResource AWS::Route53Resolver::ResolverRuleAssociation
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverruleassociation.html
 */
export class CfnResolverRuleAssociation extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Route53Resolver::ResolverRuleAssociation";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnResolverRuleAssociation {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnResolverRuleAssociationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnResolverRuleAssociation(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of an association between a resolver rule and a VPC, such as `test.example.com in beta VPC` .
     * @cloudformationAttribute Name
     */
    public readonly attrName: string;

    /**
     * The ID of the resolver rule association that you want to get information about, such as `rslvr-rrassoc-97242eaf88example` .
     * @cloudformationAttribute ResolverRuleAssociationId
     */
    public readonly attrResolverRuleAssociationId: string;

    /**
     * The ID of the resolver rule that you associated with the VPC that is specified by `VPCId` , such as `rslvr-rr-5328a0899example` .
     * @cloudformationAttribute ResolverRuleId
     */
    public readonly attrResolverRuleId: string;

    /**
     * The ID of the VPC that you associated the resolver rule with, such as `vpc-03cf94c75cexample` .
     * @cloudformationAttribute VPCId
     */
    public readonly attrVpcId: string;

    /**
     * The ID of the Resolver rule that you associated with the VPC that is specified by `VPCId` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverruleassociation.html#cfn-route53resolver-resolverruleassociation-resolverruleid
     */
    public resolverRuleId: string;

    /**
     * The ID of the VPC that you associated the Resolver rule with.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverruleassociation.html#cfn-route53resolver-resolverruleassociation-vpcid
     */
    public vpcId: string;

    /**
     * The name of an association between a Resolver rule and a VPC.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53resolver-resolverruleassociation.html#cfn-route53resolver-resolverruleassociation-name
     */
    public name: string | undefined;

    /**
     * Create a new `AWS::Route53Resolver::ResolverRuleAssociation`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnResolverRuleAssociationProps) {
        super(scope, id, { type: CfnResolverRuleAssociation.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'resolverRuleId', this);
        cdk.requireProperty(props, 'vpcId', this);
        this.attrName = cdk.Token.asString(this.getAtt('Name'));
        this.attrResolverRuleAssociationId = cdk.Token.asString(this.getAtt('ResolverRuleAssociationId'));
        this.attrResolverRuleId = cdk.Token.asString(this.getAtt('ResolverRuleId'));
        this.attrVpcId = cdk.Token.asString(this.getAtt('VPCId'));

        this.resolverRuleId = props.resolverRuleId;
        this.vpcId = props.vpcId;
        this.name = props.name;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnResolverRuleAssociation.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            resolverRuleId: this.resolverRuleId,
            vpcId: this.vpcId,
            name: this.name,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnResolverRuleAssociationPropsToCloudFormation(props);
    }
}
