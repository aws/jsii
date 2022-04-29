// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:06.262Z","fingerprint":"o1NSjKZ9agR9Rs8qDgsOhYjyGjSXkXOjeiofuQI/U3U="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnApp`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html
 */
export interface CfnAppProps {

    /**
     * The name for an Amplify app.
     *
     * *Length Constraints:* Minimum length of 1. Maximum length of 255.
     *
     * *Pattern:* (?s).+
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-name
     */
    readonly name: string;

    /**
     * The personal access token for a GitHub repository for an Amplify app. The personal access token is used to authorize access to a GitHub repository using the Amplify GitHub App. The token is not stored.
     *
     * Use `AccessToken` for GitHub repositories only. To authorize access to a repository provider such as Bitbucket or CodeCommit, use `OauthToken` .
     *
     * You must specify either `AccessToken` or `OauthToken` when you create a new app.
     *
     * Existing Amplify apps deployed from a GitHub repository using OAuth continue to work with CI/CD. However, we strongly recommend that you migrate these apps to use the GitHub App. For more information, see [Migrating an existing OAuth app to the Amplify GitHub App](https://docs.aws.amazon.com/amplify/latest/userguide/setting-up-GitHub-access.html#migrating-to-github-app-auth) in the *Amplify User Guide* .
     *
     * *Length Constraints:* Minimum length of 1. Maximum length of 255.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-accesstoken
     */
    readonly accessToken?: string;

    /**
     * Sets the configuration for your automatic branch creation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-autobranchcreationconfig
     */
    readonly autoBranchCreationConfig?: CfnApp.AutoBranchCreationConfigProperty | cdk.IResolvable;

    /**
     * The credentials for basic authorization for an Amplify app. You must base64-encode the authorization credentials and provide them in the format `user:password` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-basicauthconfig
     */
    readonly basicAuthConfig?: CfnApp.BasicAuthConfigProperty | cdk.IResolvable;

    /**
     * The build specification (build spec) for an Amplify app.
     *
     * *Length Constraints:* Minimum length of 1. Maximum length of 25000.
     *
     * *Pattern:* (?s).+
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-buildspec
     */
    readonly buildSpec?: string;

    /**
     * The custom HTTP headers for an Amplify app.
     *
     * *Length Constraints:* Minimum length of 0. Maximum length of 25000.
     *
     * *Pattern:* (?s).*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-customheaders
     */
    readonly customHeaders?: string;

    /**
     * The custom rewrite and redirect rules for an Amplify app.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-customrules
     */
    readonly customRules?: Array<CfnApp.CustomRuleProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The description for an Amplify app.
     *
     * *Length Constraints:* Maximum length of 1000.
     *
     * *Pattern:* (?s).*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-description
     */
    readonly description?: string;

    /**
     * Automatically disconnect a branch in the Amplify Console when you delete a branch from your Git repository.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-enablebranchautodeletion
     */
    readonly enableBranchAutoDeletion?: boolean | cdk.IResolvable;

    /**
     * The environment variables map for an Amplify app.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-environmentvariables
     */
    readonly environmentVariables?: Array<CfnApp.EnvironmentVariableProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The AWS Identity and Access Management (IAM) service role for the Amazon Resource Name (ARN) of the Amplify app.
     *
     * *Length Constraints:* Minimum length of 0. Maximum length of 1000.
     *
     * *Pattern:* (?s).*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-iamservicerole
     */
    readonly iamServiceRole?: string;

    /**
     * The OAuth token for a third-party source control system for an Amplify app. The OAuth token is used to create a webhook and a read-only deploy key using SSH cloning. The OAuth token is not stored.
     *
     * Use `OauthToken` for repository providers other than GitHub, such as Bitbucket or CodeCommit. To authorize access to GitHub as your repository provider, use `AccessToken` .
     *
     * You must specify either `OauthToken` or `AccessToken` when you create a new app.
     *
     * Existing Amplify apps deployed from a GitHub repository using OAuth continue to work with CI/CD. However, we strongly recommend that you migrate these apps to use the GitHub App. For more information, see [Migrating an existing OAuth app to the Amplify GitHub App](https://docs.aws.amazon.com/amplify/latest/userguide/setting-up-GitHub-access.html#migrating-to-github-app-auth) in the *Amplify User Guide* .
     *
     * *Length Constraints:* Maximum length of 1000.
     *
     * *Pattern:* (?s).*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-oauthtoken
     */
    readonly oauthToken?: string;

    /**
     * The repository for an Amplify app.
     *
     * *Pattern:* (?s).*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-repository
     */
    readonly repository?: string;

    /**
     * The tag for an Amplify app.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnAppProps`
 *
 * @param properties - the TypeScript properties of a `CfnAppProps`
 *
 * @returns the result of the validation.
 */
function CfnAppPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessToken', cdk.validateString)(properties.accessToken));
    errors.collect(cdk.propertyValidator('autoBranchCreationConfig', CfnApp_AutoBranchCreationConfigPropertyValidator)(properties.autoBranchCreationConfig));
    errors.collect(cdk.propertyValidator('basicAuthConfig', CfnApp_BasicAuthConfigPropertyValidator)(properties.basicAuthConfig));
    errors.collect(cdk.propertyValidator('buildSpec', cdk.validateString)(properties.buildSpec));
    errors.collect(cdk.propertyValidator('customHeaders', cdk.validateString)(properties.customHeaders));
    errors.collect(cdk.propertyValidator('customRules', cdk.listValidator(CfnApp_CustomRulePropertyValidator))(properties.customRules));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('enableBranchAutoDeletion', cdk.validateBoolean)(properties.enableBranchAutoDeletion));
    errors.collect(cdk.propertyValidator('environmentVariables', cdk.listValidator(CfnApp_EnvironmentVariablePropertyValidator))(properties.environmentVariables));
    errors.collect(cdk.propertyValidator('iamServiceRole', cdk.validateString)(properties.iamServiceRole));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('oauthToken', cdk.validateString)(properties.oauthToken));
    errors.collect(cdk.propertyValidator('repository', cdk.validateString)(properties.repository));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnAppProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Amplify::App` resource
 *
 * @param properties - the TypeScript properties of a `CfnAppProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Amplify::App` resource.
 */
// @ts-ignore TS6133
function cfnAppPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAppPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        AccessToken: cdk.stringToCloudFormation(properties.accessToken),
        AutoBranchCreationConfig: cfnAppAutoBranchCreationConfigPropertyToCloudFormation(properties.autoBranchCreationConfig),
        BasicAuthConfig: cfnAppBasicAuthConfigPropertyToCloudFormation(properties.basicAuthConfig),
        BuildSpec: cdk.stringToCloudFormation(properties.buildSpec),
        CustomHeaders: cdk.stringToCloudFormation(properties.customHeaders),
        CustomRules: cdk.listMapper(cfnAppCustomRulePropertyToCloudFormation)(properties.customRules),
        Description: cdk.stringToCloudFormation(properties.description),
        EnableBranchAutoDeletion: cdk.booleanToCloudFormation(properties.enableBranchAutoDeletion),
        EnvironmentVariables: cdk.listMapper(cfnAppEnvironmentVariablePropertyToCloudFormation)(properties.environmentVariables),
        IAMServiceRole: cdk.stringToCloudFormation(properties.iamServiceRole),
        OauthToken: cdk.stringToCloudFormation(properties.oauthToken),
        Repository: cdk.stringToCloudFormation(properties.repository),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnAppPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAppProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAppProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('accessToken', 'AccessToken', properties.AccessToken != null ? cfn_parse.FromCloudFormation.getString(properties.AccessToken) : undefined);
    ret.addPropertyResult('autoBranchCreationConfig', 'AutoBranchCreationConfig', properties.AutoBranchCreationConfig != null ? CfnAppAutoBranchCreationConfigPropertyFromCloudFormation(properties.AutoBranchCreationConfig) : undefined);
    ret.addPropertyResult('basicAuthConfig', 'BasicAuthConfig', properties.BasicAuthConfig != null ? CfnAppBasicAuthConfigPropertyFromCloudFormation(properties.BasicAuthConfig) : undefined);
    ret.addPropertyResult('buildSpec', 'BuildSpec', properties.BuildSpec != null ? cfn_parse.FromCloudFormation.getString(properties.BuildSpec) : undefined);
    ret.addPropertyResult('customHeaders', 'CustomHeaders', properties.CustomHeaders != null ? cfn_parse.FromCloudFormation.getString(properties.CustomHeaders) : undefined);
    ret.addPropertyResult('customRules', 'CustomRules', properties.CustomRules != null ? cfn_parse.FromCloudFormation.getArray(CfnAppCustomRulePropertyFromCloudFormation)(properties.CustomRules) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('enableBranchAutoDeletion', 'EnableBranchAutoDeletion', properties.EnableBranchAutoDeletion != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableBranchAutoDeletion) : undefined);
    ret.addPropertyResult('environmentVariables', 'EnvironmentVariables', properties.EnvironmentVariables != null ? cfn_parse.FromCloudFormation.getArray(CfnAppEnvironmentVariablePropertyFromCloudFormation)(properties.EnvironmentVariables) : undefined);
    ret.addPropertyResult('iamServiceRole', 'IAMServiceRole', properties.IAMServiceRole != null ? cfn_parse.FromCloudFormation.getString(properties.IAMServiceRole) : undefined);
    ret.addPropertyResult('oauthToken', 'OauthToken', properties.OauthToken != null ? cfn_parse.FromCloudFormation.getString(properties.OauthToken) : undefined);
    ret.addPropertyResult('repository', 'Repository', properties.Repository != null ? cfn_parse.FromCloudFormation.getString(properties.Repository) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Amplify::App`
 *
 * The AWS::Amplify::App resource creates Apps in the Amplify Console. An App is a collection of branches.
 *
 * @cloudformationResource AWS::Amplify::App
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html
 */
export class CfnApp extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Amplify::App";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnApp {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAppPropsFromCloudFormation(resourceProperties);
        const ret = new CfnApp(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Unique Id for the Amplify App.
     * @cloudformationAttribute AppId
     */
    public readonly attrAppId: string;

    /**
     * Name for the Amplify App.
     * @cloudformationAttribute AppName
     */
    public readonly attrAppName: string;

    /**
     * ARN for the Amplify App.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * Default domain for the Amplify App.
     * @cloudformationAttribute DefaultDomain
     */
    public readonly attrDefaultDomain: string;

    /**
     * The name for an Amplify app.
     *
     * *Length Constraints:* Minimum length of 1. Maximum length of 255.
     *
     * *Pattern:* (?s).+
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-name
     */
    public name: string;

    /**
     * The personal access token for a GitHub repository for an Amplify app. The personal access token is used to authorize access to a GitHub repository using the Amplify GitHub App. The token is not stored.
     *
     * Use `AccessToken` for GitHub repositories only. To authorize access to a repository provider such as Bitbucket or CodeCommit, use `OauthToken` .
     *
     * You must specify either `AccessToken` or `OauthToken` when you create a new app.
     *
     * Existing Amplify apps deployed from a GitHub repository using OAuth continue to work with CI/CD. However, we strongly recommend that you migrate these apps to use the GitHub App. For more information, see [Migrating an existing OAuth app to the Amplify GitHub App](https://docs.aws.amazon.com/amplify/latest/userguide/setting-up-GitHub-access.html#migrating-to-github-app-auth) in the *Amplify User Guide* .
     *
     * *Length Constraints:* Minimum length of 1. Maximum length of 255.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-accesstoken
     */
    public accessToken: string | undefined;

    /**
     * Sets the configuration for your automatic branch creation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-autobranchcreationconfig
     */
    public autoBranchCreationConfig: CfnApp.AutoBranchCreationConfigProperty | cdk.IResolvable | undefined;

    /**
     * The credentials for basic authorization for an Amplify app. You must base64-encode the authorization credentials and provide them in the format `user:password` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-basicauthconfig
     */
    public basicAuthConfig: CfnApp.BasicAuthConfigProperty | cdk.IResolvable | undefined;

    /**
     * The build specification (build spec) for an Amplify app.
     *
     * *Length Constraints:* Minimum length of 1. Maximum length of 25000.
     *
     * *Pattern:* (?s).+
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-buildspec
     */
    public buildSpec: string | undefined;

    /**
     * The custom HTTP headers for an Amplify app.
     *
     * *Length Constraints:* Minimum length of 0. Maximum length of 25000.
     *
     * *Pattern:* (?s).*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-customheaders
     */
    public customHeaders: string | undefined;

    /**
     * The custom rewrite and redirect rules for an Amplify app.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-customrules
     */
    public customRules: Array<CfnApp.CustomRuleProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The description for an Amplify app.
     *
     * *Length Constraints:* Maximum length of 1000.
     *
     * *Pattern:* (?s).*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-description
     */
    public description: string | undefined;

    /**
     * Automatically disconnect a branch in the Amplify Console when you delete a branch from your Git repository.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-enablebranchautodeletion
     */
    public enableBranchAutoDeletion: boolean | cdk.IResolvable | undefined;

    /**
     * The environment variables map for an Amplify app.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-environmentvariables
     */
    public environmentVariables: Array<CfnApp.EnvironmentVariableProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The AWS Identity and Access Management (IAM) service role for the Amazon Resource Name (ARN) of the Amplify app.
     *
     * *Length Constraints:* Minimum length of 0. Maximum length of 1000.
     *
     * *Pattern:* (?s).*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-iamservicerole
     */
    public iamServiceRole: string | undefined;

    /**
     * The OAuth token for a third-party source control system for an Amplify app. The OAuth token is used to create a webhook and a read-only deploy key using SSH cloning. The OAuth token is not stored.
     *
     * Use `OauthToken` for repository providers other than GitHub, such as Bitbucket or CodeCommit. To authorize access to GitHub as your repository provider, use `AccessToken` .
     *
     * You must specify either `OauthToken` or `AccessToken` when you create a new app.
     *
     * Existing Amplify apps deployed from a GitHub repository using OAuth continue to work with CI/CD. However, we strongly recommend that you migrate these apps to use the GitHub App. For more information, see [Migrating an existing OAuth app to the Amplify GitHub App](https://docs.aws.amazon.com/amplify/latest/userguide/setting-up-GitHub-access.html#migrating-to-github-app-auth) in the *Amplify User Guide* .
     *
     * *Length Constraints:* Maximum length of 1000.
     *
     * *Pattern:* (?s).*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-oauthtoken
     */
    public oauthToken: string | undefined;

    /**
     * The repository for an Amplify app.
     *
     * *Pattern:* (?s).*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-repository
     */
    public repository: string | undefined;

    /**
     * The tag for an Amplify app.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html#cfn-amplify-app-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Amplify::App`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAppProps) {
        super(scope, id, { type: CfnApp.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        this.attrAppId = cdk.Token.asString(this.getAtt('AppId'));
        this.attrAppName = cdk.Token.asString(this.getAtt('AppName'));
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrDefaultDomain = cdk.Token.asString(this.getAtt('DefaultDomain'));

        this.name = props.name;
        this.accessToken = props.accessToken;
        this.autoBranchCreationConfig = props.autoBranchCreationConfig;
        this.basicAuthConfig = props.basicAuthConfig;
        this.buildSpec = props.buildSpec;
        this.customHeaders = props.customHeaders;
        this.customRules = props.customRules;
        this.description = props.description;
        this.enableBranchAutoDeletion = props.enableBranchAutoDeletion;
        this.environmentVariables = props.environmentVariables;
        this.iamServiceRole = props.iamServiceRole;
        this.oauthToken = props.oauthToken;
        this.repository = props.repository;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Amplify::App", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnApp.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            accessToken: this.accessToken,
            autoBranchCreationConfig: this.autoBranchCreationConfig,
            basicAuthConfig: this.basicAuthConfig,
            buildSpec: this.buildSpec,
            customHeaders: this.customHeaders,
            customRules: this.customRules,
            description: this.description,
            enableBranchAutoDeletion: this.enableBranchAutoDeletion,
            environmentVariables: this.environmentVariables,
            iamServiceRole: this.iamServiceRole,
            oauthToken: this.oauthToken,
            repository: this.repository,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAppPropsToCloudFormation(props);
    }
}

export namespace CfnApp {
    /**
     * Use the AutoBranchCreationConfig property type to automatically create branches that match a certain pattern.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-autobranchcreationconfig.html
     */
    export interface AutoBranchCreationConfigProperty {
        /**
         * Automated branch creation glob patterns for the Amplify app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-autobranchcreationconfig.html#cfn-amplify-app-autobranchcreationconfig-autobranchcreationpatterns
         */
        readonly autoBranchCreationPatterns?: string[];
        /**
         * Sets password protection for your auto created branch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-autobranchcreationconfig.html#cfn-amplify-app-autobranchcreationconfig-basicauthconfig
         */
        readonly basicAuthConfig?: CfnApp.BasicAuthConfigProperty | cdk.IResolvable;
        /**
         * The build specification (build spec) for the autocreated branch.
         *
         * *Length Constraints:* Minimum length of 1. Maximum length of 25000.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-autobranchcreationconfig.html#cfn-amplify-app-autobranchcreationconfig-buildspec
         */
        readonly buildSpec?: string;
        /**
         * Enables automated branch creation for the Amplify app.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-autobranchcreationconfig.html#cfn-amplify-app-autobranchcreationconfig-enableautobranchcreation
         */
        readonly enableAutoBranchCreation?: boolean | cdk.IResolvable;
        /**
         * Enables auto building for the auto created branch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-autobranchcreationconfig.html#cfn-amplify-app-autobranchcreationconfig-enableautobuild
         */
        readonly enableAutoBuild?: boolean | cdk.IResolvable;
        /**
         * Enables performance mode for the branch.
         *
         * Performance mode optimizes for faster hosting performance by keeping content cached at the edge for a longer interval. When performance mode is enabled, hosting configuration or code changes can take up to 10 minutes to roll out.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-autobranchcreationconfig.html#cfn-amplify-app-autobranchcreationconfig-enableperformancemode
         */
        readonly enablePerformanceMode?: boolean | cdk.IResolvable;
        /**
         * Sets whether pull request previews are enabled for each branch that Amplify Console automatically creates for your app. Amplify Console creates previews by deploying your app to a unique URL whenever a pull request is opened for the branch. Development and QA teams can use this preview to test the pull request before it's merged into a production or integration branch.
         *
         * To provide backend support for your preview, the Amplify Console automatically provisions a temporary backend environment that it deletes when the pull request is closed. If you want to specify a dedicated backend environment for your previews, use the `PullRequestEnvironmentName` property.
         *
         * For more information, see [Web Previews](https://docs.aws.amazon.com/amplify/latest/userguide/pr-previews.html) in the *AWS Amplify Hosting User Guide* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-autobranchcreationconfig.html#cfn-amplify-app-autobranchcreationconfig-enablepullrequestpreview
         */
        readonly enablePullRequestPreview?: boolean | cdk.IResolvable;
        /**
         * Environment variables for the auto created branch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-autobranchcreationconfig.html#cfn-amplify-app-autobranchcreationconfig-environmentvariables
         */
        readonly environmentVariables?: Array<CfnApp.EnvironmentVariableProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * If pull request previews are enabled, you can use this property to specify a dedicated backend environment for your previews. For example, you could specify an environment named `prod` , `test` , or `dev` that you initialized with the Amplify CLI.
         *
         * To enable pull request previews, set the `EnablePullRequestPreview` property to `true` .
         *
         * If you don't specify an environment, the Amplify Console provides backend support for each preview by automatically provisioning a temporary backend environment. Amplify Console deletes this environment when the pull request is closed.
         *
         * For more information about creating backend environments, see [Feature Branch Deployments and Team Workflows](https://docs.aws.amazon.com/amplify/latest/userguide/multi-environments.html) in the *AWS Amplify Hosting User Guide* .
         *
         * *Length Constraints:* Maximum length of 20.
         *
         * *Pattern:* (?s).*
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-autobranchcreationconfig.html#cfn-amplify-app-autobranchcreationconfig-pullrequestenvironmentname
         */
        readonly pullRequestEnvironmentName?: string;
        /**
         * Stage for the auto created branch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-autobranchcreationconfig.html#cfn-amplify-app-autobranchcreationconfig-stage
         */
        readonly stage?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AutoBranchCreationConfigProperty`
 *
 * @param properties - the TypeScript properties of a `AutoBranchCreationConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnApp_AutoBranchCreationConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('autoBranchCreationPatterns', cdk.listValidator(cdk.validateString))(properties.autoBranchCreationPatterns));
    errors.collect(cdk.propertyValidator('basicAuthConfig', CfnApp_BasicAuthConfigPropertyValidator)(properties.basicAuthConfig));
    errors.collect(cdk.propertyValidator('buildSpec', cdk.validateString)(properties.buildSpec));
    errors.collect(cdk.propertyValidator('enableAutoBranchCreation', cdk.validateBoolean)(properties.enableAutoBranchCreation));
    errors.collect(cdk.propertyValidator('enableAutoBuild', cdk.validateBoolean)(properties.enableAutoBuild));
    errors.collect(cdk.propertyValidator('enablePerformanceMode', cdk.validateBoolean)(properties.enablePerformanceMode));
    errors.collect(cdk.propertyValidator('enablePullRequestPreview', cdk.validateBoolean)(properties.enablePullRequestPreview));
    errors.collect(cdk.propertyValidator('environmentVariables', cdk.listValidator(CfnApp_EnvironmentVariablePropertyValidator))(properties.environmentVariables));
    errors.collect(cdk.propertyValidator('pullRequestEnvironmentName', cdk.validateString)(properties.pullRequestEnvironmentName));
    errors.collect(cdk.propertyValidator('stage', cdk.validateString)(properties.stage));
    return errors.wrap('supplied properties not correct for "AutoBranchCreationConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Amplify::App.AutoBranchCreationConfig` resource
 *
 * @param properties - the TypeScript properties of a `AutoBranchCreationConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Amplify::App.AutoBranchCreationConfig` resource.
 */
// @ts-ignore TS6133
function cfnAppAutoBranchCreationConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApp_AutoBranchCreationConfigPropertyValidator(properties).assertSuccess();
    return {
        AutoBranchCreationPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.autoBranchCreationPatterns),
        BasicAuthConfig: cfnAppBasicAuthConfigPropertyToCloudFormation(properties.basicAuthConfig),
        BuildSpec: cdk.stringToCloudFormation(properties.buildSpec),
        EnableAutoBranchCreation: cdk.booleanToCloudFormation(properties.enableAutoBranchCreation),
        EnableAutoBuild: cdk.booleanToCloudFormation(properties.enableAutoBuild),
        EnablePerformanceMode: cdk.booleanToCloudFormation(properties.enablePerformanceMode),
        EnablePullRequestPreview: cdk.booleanToCloudFormation(properties.enablePullRequestPreview),
        EnvironmentVariables: cdk.listMapper(cfnAppEnvironmentVariablePropertyToCloudFormation)(properties.environmentVariables),
        PullRequestEnvironmentName: cdk.stringToCloudFormation(properties.pullRequestEnvironmentName),
        Stage: cdk.stringToCloudFormation(properties.stage),
    };
}

// @ts-ignore TS6133
function CfnAppAutoBranchCreationConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApp.AutoBranchCreationConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApp.AutoBranchCreationConfigProperty>();
    ret.addPropertyResult('autoBranchCreationPatterns', 'AutoBranchCreationPatterns', properties.AutoBranchCreationPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AutoBranchCreationPatterns) : undefined);
    ret.addPropertyResult('basicAuthConfig', 'BasicAuthConfig', properties.BasicAuthConfig != null ? CfnAppBasicAuthConfigPropertyFromCloudFormation(properties.BasicAuthConfig) : undefined);
    ret.addPropertyResult('buildSpec', 'BuildSpec', properties.BuildSpec != null ? cfn_parse.FromCloudFormation.getString(properties.BuildSpec) : undefined);
    ret.addPropertyResult('enableAutoBranchCreation', 'EnableAutoBranchCreation', properties.EnableAutoBranchCreation != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableAutoBranchCreation) : undefined);
    ret.addPropertyResult('enableAutoBuild', 'EnableAutoBuild', properties.EnableAutoBuild != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableAutoBuild) : undefined);
    ret.addPropertyResult('enablePerformanceMode', 'EnablePerformanceMode', properties.EnablePerformanceMode != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnablePerformanceMode) : undefined);
    ret.addPropertyResult('enablePullRequestPreview', 'EnablePullRequestPreview', properties.EnablePullRequestPreview != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnablePullRequestPreview) : undefined);
    ret.addPropertyResult('environmentVariables', 'EnvironmentVariables', properties.EnvironmentVariables != null ? cfn_parse.FromCloudFormation.getArray(CfnAppEnvironmentVariablePropertyFromCloudFormation)(properties.EnvironmentVariables) : undefined);
    ret.addPropertyResult('pullRequestEnvironmentName', 'PullRequestEnvironmentName', properties.PullRequestEnvironmentName != null ? cfn_parse.FromCloudFormation.getString(properties.PullRequestEnvironmentName) : undefined);
    ret.addPropertyResult('stage', 'Stage', properties.Stage != null ? cfn_parse.FromCloudFormation.getString(properties.Stage) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApp {
    /**
     * Use the BasicAuthConfig property type to set password protection at an app level to all your branches.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-basicauthconfig.html
     */
    export interface BasicAuthConfigProperty {
        /**
         * Enables basic authorization for the Amplify app's branches.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-basicauthconfig.html#cfn-amplify-app-basicauthconfig-enablebasicauth
         */
        readonly enableBasicAuth?: boolean | cdk.IResolvable;
        /**
         * The password for basic authorization.
         *
         * *Length Constraints:* Minimum length of 1. Maximum length of 255.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-basicauthconfig.html#cfn-amplify-app-basicauthconfig-password
         */
        readonly password?: string;
        /**
         * The user name for basic authorization.
         *
         * *Length Constraints:* Minimum length of 1. Maximum length of 255.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-basicauthconfig.html#cfn-amplify-app-basicauthconfig-username
         */
        readonly username?: string;
    }
}

/**
 * Determine whether the given properties match those of a `BasicAuthConfigProperty`
 *
 * @param properties - the TypeScript properties of a `BasicAuthConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnApp_BasicAuthConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enableBasicAuth', cdk.validateBoolean)(properties.enableBasicAuth));
    errors.collect(cdk.propertyValidator('password', cdk.validateString)(properties.password));
    errors.collect(cdk.propertyValidator('username', cdk.validateString)(properties.username));
    return errors.wrap('supplied properties not correct for "BasicAuthConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Amplify::App.BasicAuthConfig` resource
 *
 * @param properties - the TypeScript properties of a `BasicAuthConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Amplify::App.BasicAuthConfig` resource.
 */
// @ts-ignore TS6133
function cfnAppBasicAuthConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApp_BasicAuthConfigPropertyValidator(properties).assertSuccess();
    return {
        EnableBasicAuth: cdk.booleanToCloudFormation(properties.enableBasicAuth),
        Password: cdk.stringToCloudFormation(properties.password),
        Username: cdk.stringToCloudFormation(properties.username),
    };
}

// @ts-ignore TS6133
function CfnAppBasicAuthConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApp.BasicAuthConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApp.BasicAuthConfigProperty>();
    ret.addPropertyResult('enableBasicAuth', 'EnableBasicAuth', properties.EnableBasicAuth != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableBasicAuth) : undefined);
    ret.addPropertyResult('password', 'Password', properties.Password != null ? cfn_parse.FromCloudFormation.getString(properties.Password) : undefined);
    ret.addPropertyResult('username', 'Username', properties.Username != null ? cfn_parse.FromCloudFormation.getString(properties.Username) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApp {
    /**
     * The CustomRule property type allows you to specify redirects, rewrites, and reverse proxies. Redirects enable a web app to reroute navigation from one URL to another.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-customrule.html
     */
    export interface CustomRuleProperty {
        /**
         * The condition for a URL rewrite or redirect rule, such as a country code.
         *
         * *Length Constraints:* Minimum length of 0. Maximum length of 2048.
         *
         * *Pattern:* (?s).*
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-customrule.html#cfn-amplify-app-customrule-condition
         */
        readonly condition?: string;
        /**
         * The source pattern for a URL rewrite or redirect rule.
         *
         * *Length Constraints:* Minimum length of 1. Maximum length of 2048.
         *
         * *Pattern:* (?s).+
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-customrule.html#cfn-amplify-app-customrule-source
         */
        readonly source: string;
        /**
         * The status code for a URL rewrite or redirect rule.
         *
         * - **200** - Represents a 200 rewrite rule.
         * - **301** - Represents a 301 (moved pemanently) redirect rule. This and all future requests should be directed to the target URL.
         * - **302** - Represents a 302 temporary redirect rule.
         * - **404** - Represents a 404 redirect rule.
         * - **404-200** - Represents a 404 rewrite rule.
         *
         * *Length Constraints:* Minimum length of 3. Maximum length of 7.
         *
         * *Pattern:* .{3,7}
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-customrule.html#cfn-amplify-app-customrule-status
         */
        readonly status?: string;
        /**
         * The target pattern for a URL rewrite or redirect rule.
         *
         * *Length Constraints:* Minimum length of 1. Maximum length of 2048.
         *
         * *Pattern:* (?s).+
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-customrule.html#cfn-amplify-app-customrule-target
         */
        readonly target: string;
    }
}

/**
 * Determine whether the given properties match those of a `CustomRuleProperty`
 *
 * @param properties - the TypeScript properties of a `CustomRuleProperty`
 *
 * @returns the result of the validation.
 */
function CfnApp_CustomRulePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('condition', cdk.validateString)(properties.condition));
    errors.collect(cdk.propertyValidator('source', cdk.requiredValidator)(properties.source));
    errors.collect(cdk.propertyValidator('source', cdk.validateString)(properties.source));
    errors.collect(cdk.propertyValidator('status', cdk.validateString)(properties.status));
    errors.collect(cdk.propertyValidator('target', cdk.requiredValidator)(properties.target));
    errors.collect(cdk.propertyValidator('target', cdk.validateString)(properties.target));
    return errors.wrap('supplied properties not correct for "CustomRuleProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Amplify::App.CustomRule` resource
 *
 * @param properties - the TypeScript properties of a `CustomRuleProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Amplify::App.CustomRule` resource.
 */
// @ts-ignore TS6133
function cfnAppCustomRulePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApp_CustomRulePropertyValidator(properties).assertSuccess();
    return {
        Condition: cdk.stringToCloudFormation(properties.condition),
        Source: cdk.stringToCloudFormation(properties.source),
        Status: cdk.stringToCloudFormation(properties.status),
        Target: cdk.stringToCloudFormation(properties.target),
    };
}

// @ts-ignore TS6133
function CfnAppCustomRulePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApp.CustomRuleProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApp.CustomRuleProperty>();
    ret.addPropertyResult('condition', 'Condition', properties.Condition != null ? cfn_parse.FromCloudFormation.getString(properties.Condition) : undefined);
    ret.addPropertyResult('source', 'Source', cfn_parse.FromCloudFormation.getString(properties.Source));
    ret.addPropertyResult('status', 'Status', properties.Status != null ? cfn_parse.FromCloudFormation.getString(properties.Status) : undefined);
    ret.addPropertyResult('target', 'Target', cfn_parse.FromCloudFormation.getString(properties.Target));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApp {
    /**
     * Environment variables are key-value pairs that are available at build time. Set environment variables for all branches in your app.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-environmentvariable.html
     */
    export interface EnvironmentVariableProperty {
        /**
         * The environment variable name.
         *
         * *Length Constraints:* Maximum length of 255.
         *
         * *Pattern:* (?s).*
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-environmentvariable.html#cfn-amplify-app-environmentvariable-name
         */
        readonly name: string;
        /**
         * The environment variable value.
         *
         * *Length Constraints:* Maximum length of 5500.
         *
         * *Pattern:* (?s).*
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-app-environmentvariable.html#cfn-amplify-app-environmentvariable-value
         */
        readonly value: string;
    }
}

/**
 * Determine whether the given properties match those of a `EnvironmentVariableProperty`
 *
 * @param properties - the TypeScript properties of a `EnvironmentVariableProperty`
 *
 * @returns the result of the validation.
 */
function CfnApp_EnvironmentVariablePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "EnvironmentVariableProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Amplify::App.EnvironmentVariable` resource
 *
 * @param properties - the TypeScript properties of a `EnvironmentVariableProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Amplify::App.EnvironmentVariable` resource.
 */
// @ts-ignore TS6133
function cfnAppEnvironmentVariablePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApp_EnvironmentVariablePropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnAppEnvironmentVariablePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApp.EnvironmentVariableProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApp.EnvironmentVariableProperty>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnBranch`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html
 */
export interface CfnBranchProps {

    /**
     * The unique ID for an Amplify app.
     *
     * *Length Constraints:* Minimum length of 1. Maximum length of 20.
     *
     * *Pattern:* d[a-z0-9]+
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-appid
     */
    readonly appId: string;

    /**
     * The name for the branch.
     *
     * *Length Constraints:* Minimum length of 1. Maximum length of 255.
     *
     * *Pattern:* (?s).+
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-branchname
     */
    readonly branchName: string;

    /**
     * The basic authorization credentials for a branch of an Amplify app. You must base64-encode the authorization credentials and provide them in the format `user:password` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-basicauthconfig
     */
    readonly basicAuthConfig?: CfnBranch.BasicAuthConfigProperty | cdk.IResolvable;

    /**
     * The build specification (build spec) for the branch.
     *
     * *Length Constraints:* Minimum length of 1. Maximum length of 25000.
     *
     * *Pattern:* (?s).+
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-buildspec
     */
    readonly buildSpec?: string;

    /**
     * The description for the branch that is part of an Amplify app.
     *
     * *Length Constraints:* Maximum length of 1000.
     *
     * *Pattern:* (?s).*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-description
     */
    readonly description?: string;

    /**
     * Enables auto building for the branch.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-enableautobuild
     */
    readonly enableAutoBuild?: boolean | cdk.IResolvable;

    /**
     * Enables performance mode for the branch.
     *
     * Performance mode optimizes for faster hosting performance by keeping content cached at the edge for a longer interval. When performance mode is enabled, hosting configuration or code changes can take up to 10 minutes to roll out.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-enableperformancemode
     */
    readonly enablePerformanceMode?: boolean | cdk.IResolvable;

    /**
     * Sets whether the Amplify Console creates a preview for each pull request that is made for this branch. If this property is enabled, the Amplify Console deploys your app to a unique preview URL after each pull request is opened. Development and QA teams can use this preview to test the pull request before it's merged into a production or integration branch.
     *
     * To provide backend support for your preview, the Amplify Console automatically provisions a temporary backend environment that it deletes when the pull request is closed. If you want to specify a dedicated backend environment for your previews, use the `PullRequestEnvironmentName` property.
     *
     * For more information, see [Web Previews](https://docs.aws.amazon.com/amplify/latest/userguide/pr-previews.html) in the *AWS Amplify Hosting User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-enablepullrequestpreview
     */
    readonly enablePullRequestPreview?: boolean | cdk.IResolvable;

    /**
     * The environment variables for the branch.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-environmentvariables
     */
    readonly environmentVariables?: Array<CfnBranch.EnvironmentVariableProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * If pull request previews are enabled for this branch, you can use this property to specify a dedicated backend environment for your previews. For example, you could specify an environment named `prod` , `test` , or `dev` that you initialized with the Amplify CLI and mapped to this branch.
     *
     * To enable pull request previews, set the `EnablePullRequestPreview` property to `true` .
     *
     * If you don't specify an environment, the Amplify Console provides backend support for each preview by automatically provisioning a temporary backend environment. Amplify Console deletes this environment when the pull request is closed.
     *
     * For more information about creating backend environments, see [Feature Branch Deployments and Team Workflows](https://docs.aws.amazon.com/amplify/latest/userguide/multi-environments.html) in the *AWS Amplify Hosting User Guide* .
     *
     * *Length Constraints:* Maximum length of 20.
     *
     * *Pattern:* (?s).*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-pullrequestenvironmentname
     */
    readonly pullRequestEnvironmentName?: string;

    /**
     * Describes the current stage for the branch.
     *
     * *Valid Values:* PRODUCTION | BETA | DEVELOPMENT | EXPERIMENTAL | PULL_REQUEST
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-stage
     */
    readonly stage?: string;

    /**
     * The tag for the branch.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnBranchProps`
 *
 * @param properties - the TypeScript properties of a `CfnBranchProps`
 *
 * @returns the result of the validation.
 */
function CfnBranchPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('appId', cdk.requiredValidator)(properties.appId));
    errors.collect(cdk.propertyValidator('appId', cdk.validateString)(properties.appId));
    errors.collect(cdk.propertyValidator('basicAuthConfig', CfnBranch_BasicAuthConfigPropertyValidator)(properties.basicAuthConfig));
    errors.collect(cdk.propertyValidator('branchName', cdk.requiredValidator)(properties.branchName));
    errors.collect(cdk.propertyValidator('branchName', cdk.validateString)(properties.branchName));
    errors.collect(cdk.propertyValidator('buildSpec', cdk.validateString)(properties.buildSpec));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('enableAutoBuild', cdk.validateBoolean)(properties.enableAutoBuild));
    errors.collect(cdk.propertyValidator('enablePerformanceMode', cdk.validateBoolean)(properties.enablePerformanceMode));
    errors.collect(cdk.propertyValidator('enablePullRequestPreview', cdk.validateBoolean)(properties.enablePullRequestPreview));
    errors.collect(cdk.propertyValidator('environmentVariables', cdk.listValidator(CfnBranch_EnvironmentVariablePropertyValidator))(properties.environmentVariables));
    errors.collect(cdk.propertyValidator('pullRequestEnvironmentName', cdk.validateString)(properties.pullRequestEnvironmentName));
    errors.collect(cdk.propertyValidator('stage', cdk.validateString)(properties.stage));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnBranchProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Amplify::Branch` resource
 *
 * @param properties - the TypeScript properties of a `CfnBranchProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Amplify::Branch` resource.
 */
// @ts-ignore TS6133
function cfnBranchPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnBranchPropsValidator(properties).assertSuccess();
    return {
        AppId: cdk.stringToCloudFormation(properties.appId),
        BranchName: cdk.stringToCloudFormation(properties.branchName),
        BasicAuthConfig: cfnBranchBasicAuthConfigPropertyToCloudFormation(properties.basicAuthConfig),
        BuildSpec: cdk.stringToCloudFormation(properties.buildSpec),
        Description: cdk.stringToCloudFormation(properties.description),
        EnableAutoBuild: cdk.booleanToCloudFormation(properties.enableAutoBuild),
        EnablePerformanceMode: cdk.booleanToCloudFormation(properties.enablePerformanceMode),
        EnablePullRequestPreview: cdk.booleanToCloudFormation(properties.enablePullRequestPreview),
        EnvironmentVariables: cdk.listMapper(cfnBranchEnvironmentVariablePropertyToCloudFormation)(properties.environmentVariables),
        PullRequestEnvironmentName: cdk.stringToCloudFormation(properties.pullRequestEnvironmentName),
        Stage: cdk.stringToCloudFormation(properties.stage),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnBranchPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnBranchProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnBranchProps>();
    ret.addPropertyResult('appId', 'AppId', cfn_parse.FromCloudFormation.getString(properties.AppId));
    ret.addPropertyResult('branchName', 'BranchName', cfn_parse.FromCloudFormation.getString(properties.BranchName));
    ret.addPropertyResult('basicAuthConfig', 'BasicAuthConfig', properties.BasicAuthConfig != null ? CfnBranchBasicAuthConfigPropertyFromCloudFormation(properties.BasicAuthConfig) : undefined);
    ret.addPropertyResult('buildSpec', 'BuildSpec', properties.BuildSpec != null ? cfn_parse.FromCloudFormation.getString(properties.BuildSpec) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('enableAutoBuild', 'EnableAutoBuild', properties.EnableAutoBuild != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableAutoBuild) : undefined);
    ret.addPropertyResult('enablePerformanceMode', 'EnablePerformanceMode', properties.EnablePerformanceMode != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnablePerformanceMode) : undefined);
    ret.addPropertyResult('enablePullRequestPreview', 'EnablePullRequestPreview', properties.EnablePullRequestPreview != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnablePullRequestPreview) : undefined);
    ret.addPropertyResult('environmentVariables', 'EnvironmentVariables', properties.EnvironmentVariables != null ? cfn_parse.FromCloudFormation.getArray(CfnBranchEnvironmentVariablePropertyFromCloudFormation)(properties.EnvironmentVariables) : undefined);
    ret.addPropertyResult('pullRequestEnvironmentName', 'PullRequestEnvironmentName', properties.PullRequestEnvironmentName != null ? cfn_parse.FromCloudFormation.getString(properties.PullRequestEnvironmentName) : undefined);
    ret.addPropertyResult('stage', 'Stage', properties.Stage != null ? cfn_parse.FromCloudFormation.getString(properties.Stage) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Amplify::Branch`
 *
 * The AWS::Amplify::Branch resource creates a new branch within an app.
 *
 * @cloudformationResource AWS::Amplify::Branch
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html
 */
export class CfnBranch extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Amplify::Branch";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnBranch {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnBranchPropsFromCloudFormation(resourceProperties);
        const ret = new CfnBranch(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * ARN for a branch, part of an Amplify App.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * Name for a branch, part of an Amplify App.
     * @cloudformationAttribute BranchName
     */
    public readonly attrBranchName: string;

    /**
     * The unique ID for an Amplify app.
     *
     * *Length Constraints:* Minimum length of 1. Maximum length of 20.
     *
     * *Pattern:* d[a-z0-9]+
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-appid
     */
    public appId: string;

    /**
     * The name for the branch.
     *
     * *Length Constraints:* Minimum length of 1. Maximum length of 255.
     *
     * *Pattern:* (?s).+
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-branchname
     */
    public branchName: string;

    /**
     * The basic authorization credentials for a branch of an Amplify app. You must base64-encode the authorization credentials and provide them in the format `user:password` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-basicauthconfig
     */
    public basicAuthConfig: CfnBranch.BasicAuthConfigProperty | cdk.IResolvable | undefined;

    /**
     * The build specification (build spec) for the branch.
     *
     * *Length Constraints:* Minimum length of 1. Maximum length of 25000.
     *
     * *Pattern:* (?s).+
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-buildspec
     */
    public buildSpec: string | undefined;

    /**
     * The description for the branch that is part of an Amplify app.
     *
     * *Length Constraints:* Maximum length of 1000.
     *
     * *Pattern:* (?s).*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-description
     */
    public description: string | undefined;

    /**
     * Enables auto building for the branch.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-enableautobuild
     */
    public enableAutoBuild: boolean | cdk.IResolvable | undefined;

    /**
     * Enables performance mode for the branch.
     *
     * Performance mode optimizes for faster hosting performance by keeping content cached at the edge for a longer interval. When performance mode is enabled, hosting configuration or code changes can take up to 10 minutes to roll out.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-enableperformancemode
     */
    public enablePerformanceMode: boolean | cdk.IResolvable | undefined;

    /**
     * Sets whether the Amplify Console creates a preview for each pull request that is made for this branch. If this property is enabled, the Amplify Console deploys your app to a unique preview URL after each pull request is opened. Development and QA teams can use this preview to test the pull request before it's merged into a production or integration branch.
     *
     * To provide backend support for your preview, the Amplify Console automatically provisions a temporary backend environment that it deletes when the pull request is closed. If you want to specify a dedicated backend environment for your previews, use the `PullRequestEnvironmentName` property.
     *
     * For more information, see [Web Previews](https://docs.aws.amazon.com/amplify/latest/userguide/pr-previews.html) in the *AWS Amplify Hosting User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-enablepullrequestpreview
     */
    public enablePullRequestPreview: boolean | cdk.IResolvable | undefined;

    /**
     * The environment variables for the branch.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-environmentvariables
     */
    public environmentVariables: Array<CfnBranch.EnvironmentVariableProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * If pull request previews are enabled for this branch, you can use this property to specify a dedicated backend environment for your previews. For example, you could specify an environment named `prod` , `test` , or `dev` that you initialized with the Amplify CLI and mapped to this branch.
     *
     * To enable pull request previews, set the `EnablePullRequestPreview` property to `true` .
     *
     * If you don't specify an environment, the Amplify Console provides backend support for each preview by automatically provisioning a temporary backend environment. Amplify Console deletes this environment when the pull request is closed.
     *
     * For more information about creating backend environments, see [Feature Branch Deployments and Team Workflows](https://docs.aws.amazon.com/amplify/latest/userguide/multi-environments.html) in the *AWS Amplify Hosting User Guide* .
     *
     * *Length Constraints:* Maximum length of 20.
     *
     * *Pattern:* (?s).*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-pullrequestenvironmentname
     */
    public pullRequestEnvironmentName: string | undefined;

    /**
     * Describes the current stage for the branch.
     *
     * *Valid Values:* PRODUCTION | BETA | DEVELOPMENT | EXPERIMENTAL | PULL_REQUEST
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-stage
     */
    public stage: string | undefined;

    /**
     * The tag for the branch.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-branch.html#cfn-amplify-branch-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Amplify::Branch`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnBranchProps) {
        super(scope, id, { type: CfnBranch.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'appId', this);
        cdk.requireProperty(props, 'branchName', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrBranchName = cdk.Token.asString(this.getAtt('BranchName'));

        this.appId = props.appId;
        this.branchName = props.branchName;
        this.basicAuthConfig = props.basicAuthConfig;
        this.buildSpec = props.buildSpec;
        this.description = props.description;
        this.enableAutoBuild = props.enableAutoBuild;
        this.enablePerformanceMode = props.enablePerformanceMode;
        this.enablePullRequestPreview = props.enablePullRequestPreview;
        this.environmentVariables = props.environmentVariables;
        this.pullRequestEnvironmentName = props.pullRequestEnvironmentName;
        this.stage = props.stage;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Amplify::Branch", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnBranch.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            appId: this.appId,
            branchName: this.branchName,
            basicAuthConfig: this.basicAuthConfig,
            buildSpec: this.buildSpec,
            description: this.description,
            enableAutoBuild: this.enableAutoBuild,
            enablePerformanceMode: this.enablePerformanceMode,
            enablePullRequestPreview: this.enablePullRequestPreview,
            environmentVariables: this.environmentVariables,
            pullRequestEnvironmentName: this.pullRequestEnvironmentName,
            stage: this.stage,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnBranchPropsToCloudFormation(props);
    }
}

export namespace CfnBranch {
    /**
     * Use the BasicAuthConfig property type to set password protection for a specific branch.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-branch-basicauthconfig.html
     */
    export interface BasicAuthConfigProperty {
        /**
         * Enables basic authorization for the branch.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-branch-basicauthconfig.html#cfn-amplify-branch-basicauthconfig-enablebasicauth
         */
        readonly enableBasicAuth?: boolean | cdk.IResolvable;
        /**
         * The password for basic authorization.
         *
         * *Length Constraints:* Minimum length of 1. Maximum length of 255.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-branch-basicauthconfig.html#cfn-amplify-branch-basicauthconfig-password
         */
        readonly password: string;
        /**
         * The user name for basic authorization.
         *
         * *Length Constraints:* Minimum length of 1. Maximum length of 255.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-branch-basicauthconfig.html#cfn-amplify-branch-basicauthconfig-username
         */
        readonly username: string;
    }
}

/**
 * Determine whether the given properties match those of a `BasicAuthConfigProperty`
 *
 * @param properties - the TypeScript properties of a `BasicAuthConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnBranch_BasicAuthConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enableBasicAuth', cdk.validateBoolean)(properties.enableBasicAuth));
    errors.collect(cdk.propertyValidator('password', cdk.requiredValidator)(properties.password));
    errors.collect(cdk.propertyValidator('password', cdk.validateString)(properties.password));
    errors.collect(cdk.propertyValidator('username', cdk.requiredValidator)(properties.username));
    errors.collect(cdk.propertyValidator('username', cdk.validateString)(properties.username));
    return errors.wrap('supplied properties not correct for "BasicAuthConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Amplify::Branch.BasicAuthConfig` resource
 *
 * @param properties - the TypeScript properties of a `BasicAuthConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Amplify::Branch.BasicAuthConfig` resource.
 */
// @ts-ignore TS6133
function cfnBranchBasicAuthConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnBranch_BasicAuthConfigPropertyValidator(properties).assertSuccess();
    return {
        EnableBasicAuth: cdk.booleanToCloudFormation(properties.enableBasicAuth),
        Password: cdk.stringToCloudFormation(properties.password),
        Username: cdk.stringToCloudFormation(properties.username),
    };
}

// @ts-ignore TS6133
function CfnBranchBasicAuthConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnBranch.BasicAuthConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnBranch.BasicAuthConfigProperty>();
    ret.addPropertyResult('enableBasicAuth', 'EnableBasicAuth', properties.EnableBasicAuth != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableBasicAuth) : undefined);
    ret.addPropertyResult('password', 'Password', cfn_parse.FromCloudFormation.getString(properties.Password));
    ret.addPropertyResult('username', 'Username', cfn_parse.FromCloudFormation.getString(properties.Username));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnBranch {
    /**
     * The EnvironmentVariable property type sets environment variables for a specific branch. Environment variables are key-value pairs that are available at build time.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-branch-environmentvariable.html
     */
    export interface EnvironmentVariableProperty {
        /**
         * The environment variable name.
         *
         * *Length Constraints:* Maximum length of 255.
         *
         * *Pattern:* (?s).*
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-branch-environmentvariable.html#cfn-amplify-branch-environmentvariable-name
         */
        readonly name: string;
        /**
         * The environment variable value.
         *
         * *Length Constraints:* Maximum length of 5500.
         *
         * *Pattern:* (?s).*
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-branch-environmentvariable.html#cfn-amplify-branch-environmentvariable-value
         */
        readonly value: string;
    }
}

/**
 * Determine whether the given properties match those of a `EnvironmentVariableProperty`
 *
 * @param properties - the TypeScript properties of a `EnvironmentVariableProperty`
 *
 * @returns the result of the validation.
 */
function CfnBranch_EnvironmentVariablePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('value', cdk.requiredValidator)(properties.value));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "EnvironmentVariableProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Amplify::Branch.EnvironmentVariable` resource
 *
 * @param properties - the TypeScript properties of a `EnvironmentVariableProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Amplify::Branch.EnvironmentVariable` resource.
 */
// @ts-ignore TS6133
function cfnBranchEnvironmentVariablePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnBranch_EnvironmentVariablePropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnBranchEnvironmentVariablePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnBranch.EnvironmentVariableProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnBranch.EnvironmentVariableProperty>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('value', 'Value', cfn_parse.FromCloudFormation.getString(properties.Value));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDomain`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html
 */
export interface CfnDomainProps {

    /**
     * The unique ID for an Amplify app.
     *
     * *Length Constraints:* Minimum length of 1. Maximum length of 20.
     *
     * *Pattern:* d[a-z0-9]+
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html#cfn-amplify-domain-appid
     */
    readonly appId: string;

    /**
     * The domain name for the domain association.
     *
     * *Length Constraints:* Maximum length of 255.
     *
     * *Pattern:* ^(((?!-)[A-Za-z0-9-]{0,62}[A-Za-z0-9])\.)+((?!-)[A-Za-z0-9-]{1,62}[A-Za-z0-9])(\.)?$
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html#cfn-amplify-domain-domainname
     */
    readonly domainName: string;

    /**
     * The setting for the subdomain.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html#cfn-amplify-domain-subdomainsettings
     */
    readonly subDomainSettings: Array<CfnDomain.SubDomainSettingProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Sets the branch patterns for automatic subdomain creation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html#cfn-amplify-domain-autosubdomaincreationpatterns
     */
    readonly autoSubDomainCreationPatterns?: string[];

    /**
     * The required AWS Identity and Access Management (IAM) service role for the Amazon Resource Name (ARN) for automatically creating subdomains.
     *
     * *Length Constraints:* Maximum length of 1000.
     *
     * *Pattern:* ^$|^arn:aws:iam::\d{12}:role.+
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html#cfn-amplify-domain-autosubdomainiamrole
     */
    readonly autoSubDomainIamRole?: string;

    /**
     * Enables the automated creation of subdomains for branches.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html#cfn-amplify-domain-enableautosubdomain
     */
    readonly enableAutoSubDomain?: boolean | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnDomainProps`
 *
 * @param properties - the TypeScript properties of a `CfnDomainProps`
 *
 * @returns the result of the validation.
 */
function CfnDomainPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('appId', cdk.requiredValidator)(properties.appId));
    errors.collect(cdk.propertyValidator('appId', cdk.validateString)(properties.appId));
    errors.collect(cdk.propertyValidator('autoSubDomainCreationPatterns', cdk.listValidator(cdk.validateString))(properties.autoSubDomainCreationPatterns));
    errors.collect(cdk.propertyValidator('autoSubDomainIamRole', cdk.validateString)(properties.autoSubDomainIamRole));
    errors.collect(cdk.propertyValidator('domainName', cdk.requiredValidator)(properties.domainName));
    errors.collect(cdk.propertyValidator('domainName', cdk.validateString)(properties.domainName));
    errors.collect(cdk.propertyValidator('enableAutoSubDomain', cdk.validateBoolean)(properties.enableAutoSubDomain));
    errors.collect(cdk.propertyValidator('subDomainSettings', cdk.requiredValidator)(properties.subDomainSettings));
    errors.collect(cdk.propertyValidator('subDomainSettings', cdk.listValidator(CfnDomain_SubDomainSettingPropertyValidator))(properties.subDomainSettings));
    return errors.wrap('supplied properties not correct for "CfnDomainProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Amplify::Domain` resource
 *
 * @param properties - the TypeScript properties of a `CfnDomainProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Amplify::Domain` resource.
 */
// @ts-ignore TS6133
function cfnDomainPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomainPropsValidator(properties).assertSuccess();
    return {
        AppId: cdk.stringToCloudFormation(properties.appId),
        DomainName: cdk.stringToCloudFormation(properties.domainName),
        SubDomainSettings: cdk.listMapper(cfnDomainSubDomainSettingPropertyToCloudFormation)(properties.subDomainSettings),
        AutoSubDomainCreationPatterns: cdk.listMapper(cdk.stringToCloudFormation)(properties.autoSubDomainCreationPatterns),
        AutoSubDomainIAMRole: cdk.stringToCloudFormation(properties.autoSubDomainIamRole),
        EnableAutoSubDomain: cdk.booleanToCloudFormation(properties.enableAutoSubDomain),
    };
}

// @ts-ignore TS6133
function CfnDomainPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomainProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomainProps>();
    ret.addPropertyResult('appId', 'AppId', cfn_parse.FromCloudFormation.getString(properties.AppId));
    ret.addPropertyResult('domainName', 'DomainName', cfn_parse.FromCloudFormation.getString(properties.DomainName));
    ret.addPropertyResult('subDomainSettings', 'SubDomainSettings', cfn_parse.FromCloudFormation.getArray(CfnDomainSubDomainSettingPropertyFromCloudFormation)(properties.SubDomainSettings));
    ret.addPropertyResult('autoSubDomainCreationPatterns', 'AutoSubDomainCreationPatterns', properties.AutoSubDomainCreationPatterns != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AutoSubDomainCreationPatterns) : undefined);
    ret.addPropertyResult('autoSubDomainIamRole', 'AutoSubDomainIAMRole', properties.AutoSubDomainIAMRole != null ? cfn_parse.FromCloudFormation.getString(properties.AutoSubDomainIAMRole) : undefined);
    ret.addPropertyResult('enableAutoSubDomain', 'EnableAutoSubDomain', properties.EnableAutoSubDomain != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableAutoSubDomain) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Amplify::Domain`
 *
 * The AWS::Amplify::Domain resource allows you to connect a custom domain to your app.
 *
 * @cloudformationResource AWS::Amplify::Domain
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html
 */
export class CfnDomain extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Amplify::Domain";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDomain {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDomainPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDomain(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * ARN for the Domain Association.
     * @cloudformationAttribute Arn
     */
    public readonly attrArn: string;

    /**
     * Branch patterns for the automatically created subdomain.
     * @cloudformationAttribute AutoSubDomainCreationPatterns
     */
    public readonly attrAutoSubDomainCreationPatterns: string[];

    /**
     * The IAM service role for the subdomain.
     * @cloudformationAttribute AutoSubDomainIAMRole
     */
    public readonly attrAutoSubDomainIamRole: string;

    /**
     * DNS Record for certificate verification.
     * @cloudformationAttribute CertificateRecord
     */
    public readonly attrCertificateRecord: string;

    /**
     * Name of the domain.
     * @cloudformationAttribute DomainName
     */
    public readonly attrDomainName: string;

    /**
     * Status for the Domain Association.
     * @cloudformationAttribute DomainStatus
     */
    public readonly attrDomainStatus: string;

    /**
     * Specifies whether the automated creation of subdomains for branches is enabled.
     * @cloudformationAttribute EnableAutoSubDomain
     */
    public readonly attrEnableAutoSubDomain: cdk.IResolvable;

    /**
     * Reason for the current status of the domain.
     * @cloudformationAttribute StatusReason
     */
    public readonly attrStatusReason: string;

    /**
     * The unique ID for an Amplify app.
     *
     * *Length Constraints:* Minimum length of 1. Maximum length of 20.
     *
     * *Pattern:* d[a-z0-9]+
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html#cfn-amplify-domain-appid
     */
    public appId: string;

    /**
     * The domain name for the domain association.
     *
     * *Length Constraints:* Maximum length of 255.
     *
     * *Pattern:* ^(((?!-)[A-Za-z0-9-]{0,62}[A-Za-z0-9])\.)+((?!-)[A-Za-z0-9-]{1,62}[A-Za-z0-9])(\.)?$
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html#cfn-amplify-domain-domainname
     */
    public domainName: string;

    /**
     * The setting for the subdomain.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html#cfn-amplify-domain-subdomainsettings
     */
    public subDomainSettings: Array<CfnDomain.SubDomainSettingProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Sets the branch patterns for automatic subdomain creation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html#cfn-amplify-domain-autosubdomaincreationpatterns
     */
    public autoSubDomainCreationPatterns: string[] | undefined;

    /**
     * The required AWS Identity and Access Management (IAM) service role for the Amazon Resource Name (ARN) for automatically creating subdomains.
     *
     * *Length Constraints:* Maximum length of 1000.
     *
     * *Pattern:* ^$|^arn:aws:iam::\d{12}:role.+
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html#cfn-amplify-domain-autosubdomainiamrole
     */
    public autoSubDomainIamRole: string | undefined;

    /**
     * Enables the automated creation of subdomains for branches.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-domain.html#cfn-amplify-domain-enableautosubdomain
     */
    public enableAutoSubDomain: boolean | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::Amplify::Domain`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDomainProps) {
        super(scope, id, { type: CfnDomain.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'appId', this);
        cdk.requireProperty(props, 'domainName', this);
        cdk.requireProperty(props, 'subDomainSettings', this);
        this.attrArn = cdk.Token.asString(this.getAtt('Arn'));
        this.attrAutoSubDomainCreationPatterns = cdk.Token.asList(this.getAtt('AutoSubDomainCreationPatterns'));
        this.attrAutoSubDomainIamRole = cdk.Token.asString(this.getAtt('AutoSubDomainIAMRole'));
        this.attrCertificateRecord = cdk.Token.asString(this.getAtt('CertificateRecord'));
        this.attrDomainName = cdk.Token.asString(this.getAtt('DomainName'));
        this.attrDomainStatus = cdk.Token.asString(this.getAtt('DomainStatus'));
        this.attrEnableAutoSubDomain = this.getAtt('EnableAutoSubDomain');
        this.attrStatusReason = cdk.Token.asString(this.getAtt('StatusReason'));

        this.appId = props.appId;
        this.domainName = props.domainName;
        this.subDomainSettings = props.subDomainSettings;
        this.autoSubDomainCreationPatterns = props.autoSubDomainCreationPatterns;
        this.autoSubDomainIamRole = props.autoSubDomainIamRole;
        this.enableAutoSubDomain = props.enableAutoSubDomain;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDomain.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            appId: this.appId,
            domainName: this.domainName,
            subDomainSettings: this.subDomainSettings,
            autoSubDomainCreationPatterns: this.autoSubDomainCreationPatterns,
            autoSubDomainIamRole: this.autoSubDomainIamRole,
            enableAutoSubDomain: this.enableAutoSubDomain,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDomainPropsToCloudFormation(props);
    }
}

export namespace CfnDomain {
    /**
     * The SubDomainSetting property type enables you to connect a subdomain (for example, example.exampledomain.com) to a specific branch.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-domain-subdomainsetting.html
     */
    export interface SubDomainSettingProperty {
        /**
         * The branch name setting for the subdomain.
         *
         * *Length Constraints:* Minimum length of 1. Maximum length of 255.
         *
         * *Pattern:* (?s).+
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-domain-subdomainsetting.html#cfn-amplify-domain-subdomainsetting-branchname
         */
        readonly branchName: string;
        /**
         * The prefix setting for the subdomain.
         *
         * *Length Constraints:* Maximum length of 255.
         *
         * *Pattern:* (?s).*
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-amplify-domain-subdomainsetting.html#cfn-amplify-domain-subdomainsetting-prefix
         */
        readonly prefix: string;
    }
}

/**
 * Determine whether the given properties match those of a `SubDomainSettingProperty`
 *
 * @param properties - the TypeScript properties of a `SubDomainSettingProperty`
 *
 * @returns the result of the validation.
 */
function CfnDomain_SubDomainSettingPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('branchName', cdk.requiredValidator)(properties.branchName));
    errors.collect(cdk.propertyValidator('branchName', cdk.validateString)(properties.branchName));
    errors.collect(cdk.propertyValidator('prefix', cdk.requiredValidator)(properties.prefix));
    errors.collect(cdk.propertyValidator('prefix', cdk.validateString)(properties.prefix));
    return errors.wrap('supplied properties not correct for "SubDomainSettingProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Amplify::Domain.SubDomainSetting` resource
 *
 * @param properties - the TypeScript properties of a `SubDomainSettingProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Amplify::Domain.SubDomainSetting` resource.
 */
// @ts-ignore TS6133
function cfnDomainSubDomainSettingPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomain_SubDomainSettingPropertyValidator(properties).assertSuccess();
    return {
        BranchName: cdk.stringToCloudFormation(properties.branchName),
        Prefix: cdk.stringToCloudFormation(properties.prefix),
    };
}

// @ts-ignore TS6133
function CfnDomainSubDomainSettingPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomain.SubDomainSettingProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomain.SubDomainSettingProperty>();
    ret.addPropertyResult('branchName', 'BranchName', cfn_parse.FromCloudFormation.getString(properties.BranchName));
    ret.addPropertyResult('prefix', 'Prefix', cfn_parse.FromCloudFormation.getString(properties.Prefix));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
