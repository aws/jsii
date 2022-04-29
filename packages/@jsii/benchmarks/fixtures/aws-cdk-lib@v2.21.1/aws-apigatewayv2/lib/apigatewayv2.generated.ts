// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:06.452Z","fingerprint":"JHVu/TQYWjhHFkXCZHfbDcFQlSuXwhCJ3bkxVp2MGIw="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnApi`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html
 */
export interface CfnApiProps {

    /**
     * An API key selection expression. Supported only for WebSocket APIs. See [API Key Selection Expressions](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-selection-expressions.html#apigateway-websocket-api-apikey-selection-expressions) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-apikeyselectionexpression
     */
    readonly apiKeySelectionExpression?: string;

    /**
     * Specifies how to interpret the base path of the API during import. Valid values are `ignore` , `prepend` , and `split` . The default value is `ignore` . To learn more, see [Set the OpenAPI basePath Property](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-import-api-basePath.html) . Supported only for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-basepath
     */
    readonly basePath?: string;

    /**
     * The OpenAPI definition. Supported only for HTTP APIs. To import an HTTP API, you must specify a `Body` or `BodyS3Location` . If you specify a `Body` or `BodyS3Location` , don't specify CloudFormation resources such as `AWS::ApiGatewayV2::Authorizer` or `AWS::ApiGatewayV2::Route` . API Gateway doesn't support the combination of OpenAPI and CloudFormation resources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-body
     */
    readonly body?: any | cdk.IResolvable;

    /**
     * The S3 location of an OpenAPI definition. Supported only for HTTP APIs. To import an HTTP API, you must specify a `Body` or `BodyS3Location` . If you specify a `Body` or `BodyS3Location` , don't specify CloudFormation resources such as `AWS::ApiGatewayV2::Authorizer` or `AWS::ApiGatewayV2::Route` . API Gateway doesn't support the combination of OpenAPI and CloudFormation resources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-bodys3location
     */
    readonly bodyS3Location?: CfnApi.BodyS3LocationProperty | cdk.IResolvable;

    /**
     * A CORS configuration. Supported only for HTTP APIs. See [Configuring CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html) for more information.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-corsconfiguration
     */
    readonly corsConfiguration?: CfnApi.CorsProperty | cdk.IResolvable;

    /**
     * This property is part of quick create. It specifies the credentials required for the integration, if any. For a Lambda integration, three options are available. To specify an IAM Role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To require that the caller's identity be passed through from the request, specify `arn:aws:iam::*:user/*` . To use resource-based permissions on supported AWS services, specify `null` . Currently, this property is not used for HTTP integrations. Supported only for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-credentialsarn
     */
    readonly credentialsArn?: string;

    /**
     * The description of the API.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-description
     */
    readonly description?: string;

    /**
     * Specifies whether clients can invoke your API by using the default `execute-api` endpoint. By default, clients can invoke your API with the default https://{api_id}.execute-api.{region}.amazonaws.com endpoint. To require that clients use a custom domain name to invoke your API, disable the default endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-disableexecuteapiendpoint
     */
    readonly disableExecuteApiEndpoint?: boolean | cdk.IResolvable;

    /**
     * Avoid validating models when creating a deployment. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-disableschemavalidation
     */
    readonly disableSchemaValidation?: boolean | cdk.IResolvable;

    /**
     * Specifies whether to rollback the API creation when a warning is encountered. By default, API creation continues if a warning is encountered.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-failonwarnings
     */
    readonly failOnWarnings?: boolean | cdk.IResolvable;

    /**
     * The name of the API. Required unless you specify an OpenAPI definition for `Body` or `S3BodyLocation` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-name
     */
    readonly name?: string;

    /**
     * The API protocol. Valid values are `WEBSOCKET` or `HTTP` . Required unless you specify an OpenAPI definition for `Body` or `S3BodyLocation` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-protocoltype
     */
    readonly protocolType?: string;

    /**
     * This property is part of quick create. If you don't specify a `routeKey` , a default route of `$default` is created. The `$default` route acts as a catch-all for any request made to your API, for a particular stage. The `$default` route key can't be modified. You can add routes after creating the API, and you can update the route keys of additional routes. Supported only for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-routekey
     */
    readonly routeKey?: string;

    /**
     * The route selection expression for the API. For HTTP APIs, the `routeSelectionExpression` must be `${request.method} ${request.path}` . If not provided, this will be the default for HTTP APIs. This property is required for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-routeselectionexpression
     */
    readonly routeSelectionExpression?: string;

    /**
     * The collection of tags. Each tag element is associated with a given resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-tags
     */
    readonly tags?: any;

    /**
     * This property is part of quick create. Quick create produces an API with an integration, a default catch-all route, and a default stage which is configured to automatically deploy changes. For HTTP integrations, specify a fully qualified URL. For Lambda integrations, specify a function ARN. The type of the integration will be HTTP_PROXY or AWS_PROXY, respectively. Supported only for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-target
     */
    readonly target?: string;

    /**
     * A version identifier for the API.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-version
     */
    readonly version?: string;
}

/**
 * Determine whether the given properties match those of a `CfnApiProps`
 *
 * @param properties - the TypeScript properties of a `CfnApiProps`
 *
 * @returns the result of the validation.
 */
function CfnApiPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiKeySelectionExpression', cdk.validateString)(properties.apiKeySelectionExpression));
    errors.collect(cdk.propertyValidator('basePath', cdk.validateString)(properties.basePath));
    errors.collect(cdk.propertyValidator('body', cdk.validateObject)(properties.body));
    errors.collect(cdk.propertyValidator('bodyS3Location', CfnApi_BodyS3LocationPropertyValidator)(properties.bodyS3Location));
    errors.collect(cdk.propertyValidator('corsConfiguration', CfnApi_CorsPropertyValidator)(properties.corsConfiguration));
    errors.collect(cdk.propertyValidator('credentialsArn', cdk.validateString)(properties.credentialsArn));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('disableExecuteApiEndpoint', cdk.validateBoolean)(properties.disableExecuteApiEndpoint));
    errors.collect(cdk.propertyValidator('disableSchemaValidation', cdk.validateBoolean)(properties.disableSchemaValidation));
    errors.collect(cdk.propertyValidator('failOnWarnings', cdk.validateBoolean)(properties.failOnWarnings));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('protocolType', cdk.validateString)(properties.protocolType));
    errors.collect(cdk.propertyValidator('routeKey', cdk.validateString)(properties.routeKey));
    errors.collect(cdk.propertyValidator('routeSelectionExpression', cdk.validateString)(properties.routeSelectionExpression));
    errors.collect(cdk.propertyValidator('tags', cdk.validateObject)(properties.tags));
    errors.collect(cdk.propertyValidator('target', cdk.validateString)(properties.target));
    errors.collect(cdk.propertyValidator('version', cdk.validateString)(properties.version));
    return errors.wrap('supplied properties not correct for "CfnApiProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Api` resource
 *
 * @param properties - the TypeScript properties of a `CfnApiProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Api` resource.
 */
// @ts-ignore TS6133
function cfnApiPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApiPropsValidator(properties).assertSuccess();
    return {
        ApiKeySelectionExpression: cdk.stringToCloudFormation(properties.apiKeySelectionExpression),
        BasePath: cdk.stringToCloudFormation(properties.basePath),
        Body: cdk.objectToCloudFormation(properties.body),
        BodyS3Location: cfnApiBodyS3LocationPropertyToCloudFormation(properties.bodyS3Location),
        CorsConfiguration: cfnApiCorsPropertyToCloudFormation(properties.corsConfiguration),
        CredentialsArn: cdk.stringToCloudFormation(properties.credentialsArn),
        Description: cdk.stringToCloudFormation(properties.description),
        DisableExecuteApiEndpoint: cdk.booleanToCloudFormation(properties.disableExecuteApiEndpoint),
        DisableSchemaValidation: cdk.booleanToCloudFormation(properties.disableSchemaValidation),
        FailOnWarnings: cdk.booleanToCloudFormation(properties.failOnWarnings),
        Name: cdk.stringToCloudFormation(properties.name),
        ProtocolType: cdk.stringToCloudFormation(properties.protocolType),
        RouteKey: cdk.stringToCloudFormation(properties.routeKey),
        RouteSelectionExpression: cdk.stringToCloudFormation(properties.routeSelectionExpression),
        Tags: cdk.objectToCloudFormation(properties.tags),
        Target: cdk.stringToCloudFormation(properties.target),
        Version: cdk.stringToCloudFormation(properties.version),
    };
}

// @ts-ignore TS6133
function CfnApiPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApiProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApiProps>();
    ret.addPropertyResult('apiKeySelectionExpression', 'ApiKeySelectionExpression', properties.ApiKeySelectionExpression != null ? cfn_parse.FromCloudFormation.getString(properties.ApiKeySelectionExpression) : undefined);
    ret.addPropertyResult('basePath', 'BasePath', properties.BasePath != null ? cfn_parse.FromCloudFormation.getString(properties.BasePath) : undefined);
    ret.addPropertyResult('body', 'Body', properties.Body != null ? cfn_parse.FromCloudFormation.getAny(properties.Body) : undefined);
    ret.addPropertyResult('bodyS3Location', 'BodyS3Location', properties.BodyS3Location != null ? CfnApiBodyS3LocationPropertyFromCloudFormation(properties.BodyS3Location) : undefined);
    ret.addPropertyResult('corsConfiguration', 'CorsConfiguration', properties.CorsConfiguration != null ? CfnApiCorsPropertyFromCloudFormation(properties.CorsConfiguration) : undefined);
    ret.addPropertyResult('credentialsArn', 'CredentialsArn', properties.CredentialsArn != null ? cfn_parse.FromCloudFormation.getString(properties.CredentialsArn) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('disableExecuteApiEndpoint', 'DisableExecuteApiEndpoint', properties.DisableExecuteApiEndpoint != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DisableExecuteApiEndpoint) : undefined);
    ret.addPropertyResult('disableSchemaValidation', 'DisableSchemaValidation', properties.DisableSchemaValidation != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DisableSchemaValidation) : undefined);
    ret.addPropertyResult('failOnWarnings', 'FailOnWarnings', properties.FailOnWarnings != null ? cfn_parse.FromCloudFormation.getBoolean(properties.FailOnWarnings) : undefined);
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('protocolType', 'ProtocolType', properties.ProtocolType != null ? cfn_parse.FromCloudFormation.getString(properties.ProtocolType) : undefined);
    ret.addPropertyResult('routeKey', 'RouteKey', properties.RouteKey != null ? cfn_parse.FromCloudFormation.getString(properties.RouteKey) : undefined);
    ret.addPropertyResult('routeSelectionExpression', 'RouteSelectionExpression', properties.RouteSelectionExpression != null ? cfn_parse.FromCloudFormation.getString(properties.RouteSelectionExpression) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getAny(properties.Tags) : undefined as any);
    ret.addPropertyResult('target', 'Target', properties.Target != null ? cfn_parse.FromCloudFormation.getString(properties.Target) : undefined);
    ret.addPropertyResult('version', 'Version', properties.Version != null ? cfn_parse.FromCloudFormation.getString(properties.Version) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ApiGatewayV2::Api`
 *
 * The `AWS::ApiGatewayV2::Api` resource creates an API. WebSocket APIs and HTTP APIs are supported. For more information about WebSocket APIs, see [About WebSocket APIs in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-overview.html) in the *API Gateway Developer Guide* . For more information about HTTP APIs, see [HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html) in the *API Gateway Developer Guide.*
 *
 * @cloudformationResource AWS::ApiGatewayV2::Api
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html
 */
export class CfnApi extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ApiGatewayV2::Api";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnApi {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnApiPropsFromCloudFormation(resourceProperties);
        const ret = new CfnApi(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The default endpoint for an API. For example: `https://abcdef.execute-api.us-west-2.amazonaws.com` .
     * @cloudformationAttribute ApiEndpoint
     */
    public readonly attrApiEndpoint: string;

    /**
     * An API key selection expression. Supported only for WebSocket APIs. See [API Key Selection Expressions](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-selection-expressions.html#apigateway-websocket-api-apikey-selection-expressions) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-apikeyselectionexpression
     */
    public apiKeySelectionExpression: string | undefined;

    /**
     * Specifies how to interpret the base path of the API during import. Valid values are `ignore` , `prepend` , and `split` . The default value is `ignore` . To learn more, see [Set the OpenAPI basePath Property](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-import-api-basePath.html) . Supported only for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-basepath
     */
    public basePath: string | undefined;

    /**
     * The OpenAPI definition. Supported only for HTTP APIs. To import an HTTP API, you must specify a `Body` or `BodyS3Location` . If you specify a `Body` or `BodyS3Location` , don't specify CloudFormation resources such as `AWS::ApiGatewayV2::Authorizer` or `AWS::ApiGatewayV2::Route` . API Gateway doesn't support the combination of OpenAPI and CloudFormation resources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-body
     */
    public body: any | cdk.IResolvable | undefined;

    /**
     * The S3 location of an OpenAPI definition. Supported only for HTTP APIs. To import an HTTP API, you must specify a `Body` or `BodyS3Location` . If you specify a `Body` or `BodyS3Location` , don't specify CloudFormation resources such as `AWS::ApiGatewayV2::Authorizer` or `AWS::ApiGatewayV2::Route` . API Gateway doesn't support the combination of OpenAPI and CloudFormation resources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-bodys3location
     */
    public bodyS3Location: CfnApi.BodyS3LocationProperty | cdk.IResolvable | undefined;

    /**
     * A CORS configuration. Supported only for HTTP APIs. See [Configuring CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html) for more information.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-corsconfiguration
     */
    public corsConfiguration: CfnApi.CorsProperty | cdk.IResolvable | undefined;

    /**
     * This property is part of quick create. It specifies the credentials required for the integration, if any. For a Lambda integration, three options are available. To specify an IAM Role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To require that the caller's identity be passed through from the request, specify `arn:aws:iam::*:user/*` . To use resource-based permissions on supported AWS services, specify `null` . Currently, this property is not used for HTTP integrations. Supported only for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-credentialsarn
     */
    public credentialsArn: string | undefined;

    /**
     * The description of the API.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-description
     */
    public description: string | undefined;

    /**
     * Specifies whether clients can invoke your API by using the default `execute-api` endpoint. By default, clients can invoke your API with the default https://{api_id}.execute-api.{region}.amazonaws.com endpoint. To require that clients use a custom domain name to invoke your API, disable the default endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-disableexecuteapiendpoint
     */
    public disableExecuteApiEndpoint: boolean | cdk.IResolvable | undefined;

    /**
     * Avoid validating models when creating a deployment. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-disableschemavalidation
     */
    public disableSchemaValidation: boolean | cdk.IResolvable | undefined;

    /**
     * Specifies whether to rollback the API creation when a warning is encountered. By default, API creation continues if a warning is encountered.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-failonwarnings
     */
    public failOnWarnings: boolean | cdk.IResolvable | undefined;

    /**
     * The name of the API. Required unless you specify an OpenAPI definition for `Body` or `S3BodyLocation` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-name
     */
    public name: string | undefined;

    /**
     * The API protocol. Valid values are `WEBSOCKET` or `HTTP` . Required unless you specify an OpenAPI definition for `Body` or `S3BodyLocation` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-protocoltype
     */
    public protocolType: string | undefined;

    /**
     * This property is part of quick create. If you don't specify a `routeKey` , a default route of `$default` is created. The `$default` route acts as a catch-all for any request made to your API, for a particular stage. The `$default` route key can't be modified. You can add routes after creating the API, and you can update the route keys of additional routes. Supported only for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-routekey
     */
    public routeKey: string | undefined;

    /**
     * The route selection expression for the API. For HTTP APIs, the `routeSelectionExpression` must be `${request.method} ${request.path}` . If not provided, this will be the default for HTTP APIs. This property is required for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-routeselectionexpression
     */
    public routeSelectionExpression: string | undefined;

    /**
     * The collection of tags. Each tag element is associated with a given resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * This property is part of quick create. Quick create produces an API with an integration, a default catch-all route, and a default stage which is configured to automatically deploy changes. For HTTP integrations, specify a fully qualified URL. For Lambda integrations, specify a function ARN. The type of the integration will be HTTP_PROXY or AWS_PROXY, respectively. Supported only for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-target
     */
    public target: string | undefined;

    /**
     * A version identifier for the API.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-version
     */
    public version: string | undefined;

    /**
     * Create a new `AWS::ApiGatewayV2::Api`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnApiProps = {}) {
        super(scope, id, { type: CfnApi.CFN_RESOURCE_TYPE_NAME, properties: props });
        this.attrApiEndpoint = cdk.Token.asString(this.getAtt('ApiEndpoint'));

        this.apiKeySelectionExpression = props.apiKeySelectionExpression;
        this.basePath = props.basePath;
        this.body = props.body;
        this.bodyS3Location = props.bodyS3Location;
        this.corsConfiguration = props.corsConfiguration;
        this.credentialsArn = props.credentialsArn;
        this.description = props.description;
        this.disableExecuteApiEndpoint = props.disableExecuteApiEndpoint;
        this.disableSchemaValidation = props.disableSchemaValidation;
        this.failOnWarnings = props.failOnWarnings;
        this.name = props.name;
        this.protocolType = props.protocolType;
        this.routeKey = props.routeKey;
        this.routeSelectionExpression = props.routeSelectionExpression;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::ApiGatewayV2::Api", props.tags, { tagPropertyName: 'tags' });
        this.target = props.target;
        this.version = props.version;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnApi.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            apiKeySelectionExpression: this.apiKeySelectionExpression,
            basePath: this.basePath,
            body: this.body,
            bodyS3Location: this.bodyS3Location,
            corsConfiguration: this.corsConfiguration,
            credentialsArn: this.credentialsArn,
            description: this.description,
            disableExecuteApiEndpoint: this.disableExecuteApiEndpoint,
            disableSchemaValidation: this.disableSchemaValidation,
            failOnWarnings: this.failOnWarnings,
            name: this.name,
            protocolType: this.protocolType,
            routeKey: this.routeKey,
            routeSelectionExpression: this.routeSelectionExpression,
            tags: this.tags.renderTags(),
            target: this.target,
            version: this.version,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnApiPropsToCloudFormation(props);
    }
}

export namespace CfnApi {
    /**
     * The `BodyS3Location` property specifies an S3 location from which to import an OpenAPI definition. Supported only for HTTP APIs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-api-bodys3location.html
     */
    export interface BodyS3LocationProperty {
        /**
         * The S3 bucket that contains the OpenAPI definition to import. Required if you specify a `BodyS3Location` for an API.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-api-bodys3location.html#cfn-apigatewayv2-api-bodys3location-bucket
         */
        readonly bucket?: string;
        /**
         * The Etag of the S3 object.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-api-bodys3location.html#cfn-apigatewayv2-api-bodys3location-etag
         */
        readonly etag?: string;
        /**
         * The key of the S3 object. Required if you specify a `BodyS3Location` for an API.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-api-bodys3location.html#cfn-apigatewayv2-api-bodys3location-key
         */
        readonly key?: string;
        /**
         * The version of the S3 object.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-api-bodys3location.html#cfn-apigatewayv2-api-bodys3location-version
         */
        readonly version?: string;
    }
}

/**
 * Determine whether the given properties match those of a `BodyS3LocationProperty`
 *
 * @param properties - the TypeScript properties of a `BodyS3LocationProperty`
 *
 * @returns the result of the validation.
 */
function CfnApi_BodyS3LocationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucket', cdk.validateString)(properties.bucket));
    errors.collect(cdk.propertyValidator('etag', cdk.validateString)(properties.etag));
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('version', cdk.validateString)(properties.version));
    return errors.wrap('supplied properties not correct for "BodyS3LocationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Api.BodyS3Location` resource
 *
 * @param properties - the TypeScript properties of a `BodyS3LocationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Api.BodyS3Location` resource.
 */
// @ts-ignore TS6133
function cfnApiBodyS3LocationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApi_BodyS3LocationPropertyValidator(properties).assertSuccess();
    return {
        Bucket: cdk.stringToCloudFormation(properties.bucket),
        Etag: cdk.stringToCloudFormation(properties.etag),
        Key: cdk.stringToCloudFormation(properties.key),
        Version: cdk.stringToCloudFormation(properties.version),
    };
}

// @ts-ignore TS6133
function CfnApiBodyS3LocationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApi.BodyS3LocationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApi.BodyS3LocationProperty>();
    ret.addPropertyResult('bucket', 'Bucket', properties.Bucket != null ? cfn_parse.FromCloudFormation.getString(properties.Bucket) : undefined);
    ret.addPropertyResult('etag', 'Etag', properties.Etag != null ? cfn_parse.FromCloudFormation.getString(properties.Etag) : undefined);
    ret.addPropertyResult('key', 'Key', properties.Key != null ? cfn_parse.FromCloudFormation.getString(properties.Key) : undefined);
    ret.addPropertyResult('version', 'Version', properties.Version != null ? cfn_parse.FromCloudFormation.getString(properties.Version) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApi {
    /**
     * The `Cors` property specifies a CORS configuration for an API. Supported only for HTTP APIs. See [Configuring CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html) for more information.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-api-cors.html
     */
    export interface CorsProperty {
        /**
         * Specifies whether credentials are included in the CORS request. Supported only for HTTP APIs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-api-cors.html#cfn-apigatewayv2-api-cors-allowcredentials
         */
        readonly allowCredentials?: boolean | cdk.IResolvable;
        /**
         * Represents a collection of allowed headers. Supported only for HTTP APIs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-api-cors.html#cfn-apigatewayv2-api-cors-allowheaders
         */
        readonly allowHeaders?: string[];
        /**
         * Represents a collection of allowed HTTP methods. Supported only for HTTP APIs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-api-cors.html#cfn-apigatewayv2-api-cors-allowmethods
         */
        readonly allowMethods?: string[];
        /**
         * Represents a collection of allowed origins. Supported only for HTTP APIs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-api-cors.html#cfn-apigatewayv2-api-cors-alloworigins
         */
        readonly allowOrigins?: string[];
        /**
         * Represents a collection of exposed headers. Supported only for HTTP APIs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-api-cors.html#cfn-apigatewayv2-api-cors-exposeheaders
         */
        readonly exposeHeaders?: string[];
        /**
         * The number of seconds that the browser should cache preflight request results. Supported only for HTTP APIs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-api-cors.html#cfn-apigatewayv2-api-cors-maxage
         */
        readonly maxAge?: number;
    }
}

/**
 * Determine whether the given properties match those of a `CorsProperty`
 *
 * @param properties - the TypeScript properties of a `CorsProperty`
 *
 * @returns the result of the validation.
 */
function CfnApi_CorsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('allowCredentials', cdk.validateBoolean)(properties.allowCredentials));
    errors.collect(cdk.propertyValidator('allowHeaders', cdk.listValidator(cdk.validateString))(properties.allowHeaders));
    errors.collect(cdk.propertyValidator('allowMethods', cdk.listValidator(cdk.validateString))(properties.allowMethods));
    errors.collect(cdk.propertyValidator('allowOrigins', cdk.listValidator(cdk.validateString))(properties.allowOrigins));
    errors.collect(cdk.propertyValidator('exposeHeaders', cdk.listValidator(cdk.validateString))(properties.exposeHeaders));
    errors.collect(cdk.propertyValidator('maxAge', cdk.validateNumber)(properties.maxAge));
    return errors.wrap('supplied properties not correct for "CorsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Api.Cors` resource
 *
 * @param properties - the TypeScript properties of a `CorsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Api.Cors` resource.
 */
// @ts-ignore TS6133
function cfnApiCorsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApi_CorsPropertyValidator(properties).assertSuccess();
    return {
        AllowCredentials: cdk.booleanToCloudFormation(properties.allowCredentials),
        AllowHeaders: cdk.listMapper(cdk.stringToCloudFormation)(properties.allowHeaders),
        AllowMethods: cdk.listMapper(cdk.stringToCloudFormation)(properties.allowMethods),
        AllowOrigins: cdk.listMapper(cdk.stringToCloudFormation)(properties.allowOrigins),
        ExposeHeaders: cdk.listMapper(cdk.stringToCloudFormation)(properties.exposeHeaders),
        MaxAge: cdk.numberToCloudFormation(properties.maxAge),
    };
}

// @ts-ignore TS6133
function CfnApiCorsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApi.CorsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApi.CorsProperty>();
    ret.addPropertyResult('allowCredentials', 'AllowCredentials', properties.AllowCredentials != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AllowCredentials) : undefined);
    ret.addPropertyResult('allowHeaders', 'AllowHeaders', properties.AllowHeaders != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AllowHeaders) : undefined);
    ret.addPropertyResult('allowMethods', 'AllowMethods', properties.AllowMethods != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AllowMethods) : undefined);
    ret.addPropertyResult('allowOrigins', 'AllowOrigins', properties.AllowOrigins != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AllowOrigins) : undefined);
    ret.addPropertyResult('exposeHeaders', 'ExposeHeaders', properties.ExposeHeaders != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ExposeHeaders) : undefined);
    ret.addPropertyResult('maxAge', 'MaxAge', properties.MaxAge != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxAge) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnApiGatewayManagedOverrides`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apigatewaymanagedoverrides.html
 */
export interface CfnApiGatewayManagedOverridesProps {

    /**
     * The ID of the API for which to override the configuration of API Gateway-managed resources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apigatewaymanagedoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-apiid
     */
    readonly apiId: string;

    /**
     * Overrides the integration configuration for an API Gateway-managed integration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apigatewaymanagedoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-integration
     */
    readonly integration?: CfnApiGatewayManagedOverrides.IntegrationOverridesProperty | cdk.IResolvable;

    /**
     * Overrides the route configuration for an API Gateway-managed route.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apigatewaymanagedoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-route
     */
    readonly route?: CfnApiGatewayManagedOverrides.RouteOverridesProperty | cdk.IResolvable;

    /**
     * Overrides the stage configuration for an API Gateway-managed stage.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apigatewaymanagedoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-stage
     */
    readonly stage?: CfnApiGatewayManagedOverrides.StageOverridesProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnApiGatewayManagedOverridesProps`
 *
 * @param properties - the TypeScript properties of a `CfnApiGatewayManagedOverridesProps`
 *
 * @returns the result of the validation.
 */
function CfnApiGatewayManagedOverridesPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiId', cdk.requiredValidator)(properties.apiId));
    errors.collect(cdk.propertyValidator('apiId', cdk.validateString)(properties.apiId));
    errors.collect(cdk.propertyValidator('integration', CfnApiGatewayManagedOverrides_IntegrationOverridesPropertyValidator)(properties.integration));
    errors.collect(cdk.propertyValidator('route', CfnApiGatewayManagedOverrides_RouteOverridesPropertyValidator)(properties.route));
    errors.collect(cdk.propertyValidator('stage', CfnApiGatewayManagedOverrides_StageOverridesPropertyValidator)(properties.stage));
    return errors.wrap('supplied properties not correct for "CfnApiGatewayManagedOverridesProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::ApiGatewayManagedOverrides` resource
 *
 * @param properties - the TypeScript properties of a `CfnApiGatewayManagedOverridesProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::ApiGatewayManagedOverrides` resource.
 */
// @ts-ignore TS6133
function cfnApiGatewayManagedOverridesPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApiGatewayManagedOverridesPropsValidator(properties).assertSuccess();
    return {
        ApiId: cdk.stringToCloudFormation(properties.apiId),
        Integration: cfnApiGatewayManagedOverridesIntegrationOverridesPropertyToCloudFormation(properties.integration),
        Route: cfnApiGatewayManagedOverridesRouteOverridesPropertyToCloudFormation(properties.route),
        Stage: cfnApiGatewayManagedOverridesStageOverridesPropertyToCloudFormation(properties.stage),
    };
}

// @ts-ignore TS6133
function CfnApiGatewayManagedOverridesPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApiGatewayManagedOverridesProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApiGatewayManagedOverridesProps>();
    ret.addPropertyResult('apiId', 'ApiId', cfn_parse.FromCloudFormation.getString(properties.ApiId));
    ret.addPropertyResult('integration', 'Integration', properties.Integration != null ? CfnApiGatewayManagedOverridesIntegrationOverridesPropertyFromCloudFormation(properties.Integration) : undefined);
    ret.addPropertyResult('route', 'Route', properties.Route != null ? CfnApiGatewayManagedOverridesRouteOverridesPropertyFromCloudFormation(properties.Route) : undefined);
    ret.addPropertyResult('stage', 'Stage', properties.Stage != null ? CfnApiGatewayManagedOverridesStageOverridesPropertyFromCloudFormation(properties.Stage) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ApiGatewayV2::ApiGatewayManagedOverrides`
 *
 * The `AWS::ApiGatewayV2::ApiGatewayManagedOverrides` resource overrides the default properties of API Gateway-managed resources that are implicitly configured for you when you use quick create. When you create an API by using quick create, an `AWS::ApiGatewayV2::Route` , `AWS::ApiGatewayV2::Integration` , and `AWS::ApiGatewayV2::Stage` are created for you and associated with your `AWS::ApiGatewayV2::Api` . The `AWS::ApiGatewayV2::ApiGatewayManagedOverrides` resource enables you to set, or override the properties of these implicit resources. Supported only for HTTP APIs.
 *
 * @cloudformationResource AWS::ApiGatewayV2::ApiGatewayManagedOverrides
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apigatewaymanagedoverrides.html
 */
export class CfnApiGatewayManagedOverrides extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ApiGatewayV2::ApiGatewayManagedOverrides";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnApiGatewayManagedOverrides {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnApiGatewayManagedOverridesPropsFromCloudFormation(resourceProperties);
        const ret = new CfnApiGatewayManagedOverrides(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The ID of the API for which to override the configuration of API Gateway-managed resources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apigatewaymanagedoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-apiid
     */
    public apiId: string;

    /**
     * Overrides the integration configuration for an API Gateway-managed integration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apigatewaymanagedoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-integration
     */
    public integration: CfnApiGatewayManagedOverrides.IntegrationOverridesProperty | cdk.IResolvable | undefined;

    /**
     * Overrides the route configuration for an API Gateway-managed route.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apigatewaymanagedoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-route
     */
    public route: CfnApiGatewayManagedOverrides.RouteOverridesProperty | cdk.IResolvable | undefined;

    /**
     * Overrides the stage configuration for an API Gateway-managed stage.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apigatewaymanagedoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-stage
     */
    public stage: CfnApiGatewayManagedOverrides.StageOverridesProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::ApiGatewayV2::ApiGatewayManagedOverrides`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnApiGatewayManagedOverridesProps) {
        super(scope, id, { type: CfnApiGatewayManagedOverrides.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'apiId', this);

        this.apiId = props.apiId;
        this.integration = props.integration;
        this.route = props.route;
        this.stage = props.stage;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnApiGatewayManagedOverrides.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            apiId: this.apiId,
            integration: this.integration,
            route: this.route,
            stage: this.stage,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnApiGatewayManagedOverridesPropsToCloudFormation(props);
    }
}

export namespace CfnApiGatewayManagedOverrides {
    /**
     * The `AccessLogSettings` property overrides the access log settings for an API Gateway-managed stage.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-accesslogsettings.html
     */
    export interface AccessLogSettingsProperty {
        /**
         * The ARN of the CloudWatch Logs log group to receive access logs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-accesslogsettings.html#cfn-apigatewayv2-apigatewaymanagedoverrides-accesslogsettings-destinationarn
         */
        readonly destinationArn?: string;
        /**
         * A single line format of the access logs of data, as specified by selected $context variables. The format must include at least $context.requestId.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-accesslogsettings.html#cfn-apigatewayv2-apigatewaymanagedoverrides-accesslogsettings-format
         */
        readonly format?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AccessLogSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `AccessLogSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnApiGatewayManagedOverrides_AccessLogSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('destinationArn', cdk.validateString)(properties.destinationArn));
    errors.collect(cdk.propertyValidator('format', cdk.validateString)(properties.format));
    return errors.wrap('supplied properties not correct for "AccessLogSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::ApiGatewayManagedOverrides.AccessLogSettings` resource
 *
 * @param properties - the TypeScript properties of a `AccessLogSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::ApiGatewayManagedOverrides.AccessLogSettings` resource.
 */
// @ts-ignore TS6133
function cfnApiGatewayManagedOverridesAccessLogSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApiGatewayManagedOverrides_AccessLogSettingsPropertyValidator(properties).assertSuccess();
    return {
        DestinationArn: cdk.stringToCloudFormation(properties.destinationArn),
        Format: cdk.stringToCloudFormation(properties.format),
    };
}

// @ts-ignore TS6133
function CfnApiGatewayManagedOverridesAccessLogSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApiGatewayManagedOverrides.AccessLogSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApiGatewayManagedOverrides.AccessLogSettingsProperty>();
    ret.addPropertyResult('destinationArn', 'DestinationArn', properties.DestinationArn != null ? cfn_parse.FromCloudFormation.getString(properties.DestinationArn) : undefined);
    ret.addPropertyResult('format', 'Format', properties.Format != null ? cfn_parse.FromCloudFormation.getString(properties.Format) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApiGatewayManagedOverrides {
    /**
     * The `IntegrationOverrides` property overrides the integration settings for an API Gateway-managed integration. If you remove this property, API Gateway restores the default values.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-integrationoverrides.html
     */
    export interface IntegrationOverridesProperty {
        /**
         * The description of the integration.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-integrationoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-integrationoverrides-description
         */
        readonly description?: string;
        /**
         * Specifies the integration's HTTP method type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-integrationoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-integrationoverrides-integrationmethod
         */
        readonly integrationMethod?: string;
        /**
         * Specifies the format of the payload sent to an integration. Required for HTTP APIs. For HTTP APIs, supported values for Lambda proxy integrations are `1.0` and `2.0` . For all other integrations, `1.0` is the only supported value. To learn more, see [Working with AWS Lambda proxy integrations for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-integrationoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-integrationoverrides-payloadformatversion
         */
        readonly payloadFormatVersion?: string;
        /**
         * Custom timeout between 50 and 29,000 milliseconds for WebSocket APIs and between 50 and 30,000 milliseconds for HTTP APIs. The default timeout is 29 seconds for WebSocket APIs and 30 seconds for HTTP APIs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-integrationoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-integrationoverrides-timeoutinmillis
         */
        readonly timeoutInMillis?: number;
    }
}

/**
 * Determine whether the given properties match those of a `IntegrationOverridesProperty`
 *
 * @param properties - the TypeScript properties of a `IntegrationOverridesProperty`
 *
 * @returns the result of the validation.
 */
function CfnApiGatewayManagedOverrides_IntegrationOverridesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('integrationMethod', cdk.validateString)(properties.integrationMethod));
    errors.collect(cdk.propertyValidator('payloadFormatVersion', cdk.validateString)(properties.payloadFormatVersion));
    errors.collect(cdk.propertyValidator('timeoutInMillis', cdk.validateNumber)(properties.timeoutInMillis));
    return errors.wrap('supplied properties not correct for "IntegrationOverridesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::ApiGatewayManagedOverrides.IntegrationOverrides` resource
 *
 * @param properties - the TypeScript properties of a `IntegrationOverridesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::ApiGatewayManagedOverrides.IntegrationOverrides` resource.
 */
// @ts-ignore TS6133
function cfnApiGatewayManagedOverridesIntegrationOverridesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApiGatewayManagedOverrides_IntegrationOverridesPropertyValidator(properties).assertSuccess();
    return {
        Description: cdk.stringToCloudFormation(properties.description),
        IntegrationMethod: cdk.stringToCloudFormation(properties.integrationMethod),
        PayloadFormatVersion: cdk.stringToCloudFormation(properties.payloadFormatVersion),
        TimeoutInMillis: cdk.numberToCloudFormation(properties.timeoutInMillis),
    };
}

// @ts-ignore TS6133
function CfnApiGatewayManagedOverridesIntegrationOverridesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApiGatewayManagedOverrides.IntegrationOverridesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApiGatewayManagedOverrides.IntegrationOverridesProperty>();
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('integrationMethod', 'IntegrationMethod', properties.IntegrationMethod != null ? cfn_parse.FromCloudFormation.getString(properties.IntegrationMethod) : undefined);
    ret.addPropertyResult('payloadFormatVersion', 'PayloadFormatVersion', properties.PayloadFormatVersion != null ? cfn_parse.FromCloudFormation.getString(properties.PayloadFormatVersion) : undefined);
    ret.addPropertyResult('timeoutInMillis', 'TimeoutInMillis', properties.TimeoutInMillis != null ? cfn_parse.FromCloudFormation.getNumber(properties.TimeoutInMillis) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApiGatewayManagedOverrides {
    /**
     * The `RouteOverrides` property overrides the route configuration for an API Gateway-managed route. If you remove this property, API Gateway restores the default values.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-routeoverrides.html
     */
    export interface RouteOverridesProperty {
        /**
         * The authorization scopes supported by this route.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-routeoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-routeoverrides-authorizationscopes
         */
        readonly authorizationScopes?: string[];
        /**
         * The authorization type for the route. To learn more, see [AuthorizationType](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-authorizationtype) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-routeoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-routeoverrides-authorizationtype
         */
        readonly authorizationType?: string;
        /**
         * The identifier of the `Authorizer` resource to be associated with this route. The authorizer identifier is generated by API Gateway when you created the authorizer.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-routeoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-routeoverrides-authorizerid
         */
        readonly authorizerId?: string;
        /**
         * The operation name for the route.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-routeoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-routeoverrides-operationname
         */
        readonly operationName?: string;
        /**
         * For HTTP integrations, specify a fully qualified URL. For Lambda integrations, specify a function ARN. The type of the integration will be HTTP_PROXY or AWS_PROXY, respectively.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-routeoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-routeoverrides-target
         */
        readonly target?: string;
    }
}

/**
 * Determine whether the given properties match those of a `RouteOverridesProperty`
 *
 * @param properties - the TypeScript properties of a `RouteOverridesProperty`
 *
 * @returns the result of the validation.
 */
function CfnApiGatewayManagedOverrides_RouteOverridesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('authorizationScopes', cdk.listValidator(cdk.validateString))(properties.authorizationScopes));
    errors.collect(cdk.propertyValidator('authorizationType', cdk.validateString)(properties.authorizationType));
    errors.collect(cdk.propertyValidator('authorizerId', cdk.validateString)(properties.authorizerId));
    errors.collect(cdk.propertyValidator('operationName', cdk.validateString)(properties.operationName));
    errors.collect(cdk.propertyValidator('target', cdk.validateString)(properties.target));
    return errors.wrap('supplied properties not correct for "RouteOverridesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::ApiGatewayManagedOverrides.RouteOverrides` resource
 *
 * @param properties - the TypeScript properties of a `RouteOverridesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::ApiGatewayManagedOverrides.RouteOverrides` resource.
 */
// @ts-ignore TS6133
function cfnApiGatewayManagedOverridesRouteOverridesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApiGatewayManagedOverrides_RouteOverridesPropertyValidator(properties).assertSuccess();
    return {
        AuthorizationScopes: cdk.listMapper(cdk.stringToCloudFormation)(properties.authorizationScopes),
        AuthorizationType: cdk.stringToCloudFormation(properties.authorizationType),
        AuthorizerId: cdk.stringToCloudFormation(properties.authorizerId),
        OperationName: cdk.stringToCloudFormation(properties.operationName),
        Target: cdk.stringToCloudFormation(properties.target),
    };
}

// @ts-ignore TS6133
function CfnApiGatewayManagedOverridesRouteOverridesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApiGatewayManagedOverrides.RouteOverridesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApiGatewayManagedOverrides.RouteOverridesProperty>();
    ret.addPropertyResult('authorizationScopes', 'AuthorizationScopes', properties.AuthorizationScopes != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AuthorizationScopes) : undefined);
    ret.addPropertyResult('authorizationType', 'AuthorizationType', properties.AuthorizationType != null ? cfn_parse.FromCloudFormation.getString(properties.AuthorizationType) : undefined);
    ret.addPropertyResult('authorizerId', 'AuthorizerId', properties.AuthorizerId != null ? cfn_parse.FromCloudFormation.getString(properties.AuthorizerId) : undefined);
    ret.addPropertyResult('operationName', 'OperationName', properties.OperationName != null ? cfn_parse.FromCloudFormation.getString(properties.OperationName) : undefined);
    ret.addPropertyResult('target', 'Target', properties.Target != null ? cfn_parse.FromCloudFormation.getString(properties.Target) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApiGatewayManagedOverrides {
    /**
     * The `RouteSettings` property overrides the route settings for an API Gateway-managed route.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-routesettings.html
     */
    export interface RouteSettingsProperty {
        /**
         * Specifies whether ( `true` ) or not ( `false` ) data trace logging is enabled for this route. This property affects the log entries pushed to Amazon CloudWatch Logs. Supported only for WebSocket APIs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-routesettings.html#cfn-apigatewayv2-apigatewaymanagedoverrides-routesettings-datatraceenabled
         */
        readonly dataTraceEnabled?: boolean | cdk.IResolvable;
        /**
         * Specifies whether detailed metrics are enabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-routesettings.html#cfn-apigatewayv2-apigatewaymanagedoverrides-routesettings-detailedmetricsenabled
         */
        readonly detailedMetricsEnabled?: boolean | cdk.IResolvable;
        /**
         * Specifies the logging level for this route: `INFO` , `ERROR` , or `OFF` . This property affects the log entries pushed to Amazon CloudWatch Logs. Supported only for WebSocket APIs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-routesettings.html#cfn-apigatewayv2-apigatewaymanagedoverrides-routesettings-logginglevel
         */
        readonly loggingLevel?: string;
        /**
         * Specifies the throttling burst limit.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-routesettings.html#cfn-apigatewayv2-apigatewaymanagedoverrides-routesettings-throttlingburstlimit
         */
        readonly throttlingBurstLimit?: number;
        /**
         * Specifies the throttling rate limit.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-routesettings.html#cfn-apigatewayv2-apigatewaymanagedoverrides-routesettings-throttlingratelimit
         */
        readonly throttlingRateLimit?: number;
    }
}

/**
 * Determine whether the given properties match those of a `RouteSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `RouteSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnApiGatewayManagedOverrides_RouteSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataTraceEnabled', cdk.validateBoolean)(properties.dataTraceEnabled));
    errors.collect(cdk.propertyValidator('detailedMetricsEnabled', cdk.validateBoolean)(properties.detailedMetricsEnabled));
    errors.collect(cdk.propertyValidator('loggingLevel', cdk.validateString)(properties.loggingLevel));
    errors.collect(cdk.propertyValidator('throttlingBurstLimit', cdk.validateNumber)(properties.throttlingBurstLimit));
    errors.collect(cdk.propertyValidator('throttlingRateLimit', cdk.validateNumber)(properties.throttlingRateLimit));
    return errors.wrap('supplied properties not correct for "RouteSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::ApiGatewayManagedOverrides.RouteSettings` resource
 *
 * @param properties - the TypeScript properties of a `RouteSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::ApiGatewayManagedOverrides.RouteSettings` resource.
 */
// @ts-ignore TS6133
function cfnApiGatewayManagedOverridesRouteSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApiGatewayManagedOverrides_RouteSettingsPropertyValidator(properties).assertSuccess();
    return {
        DataTraceEnabled: cdk.booleanToCloudFormation(properties.dataTraceEnabled),
        DetailedMetricsEnabled: cdk.booleanToCloudFormation(properties.detailedMetricsEnabled),
        LoggingLevel: cdk.stringToCloudFormation(properties.loggingLevel),
        ThrottlingBurstLimit: cdk.numberToCloudFormation(properties.throttlingBurstLimit),
        ThrottlingRateLimit: cdk.numberToCloudFormation(properties.throttlingRateLimit),
    };
}

// @ts-ignore TS6133
function CfnApiGatewayManagedOverridesRouteSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApiGatewayManagedOverrides.RouteSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApiGatewayManagedOverrides.RouteSettingsProperty>();
    ret.addPropertyResult('dataTraceEnabled', 'DataTraceEnabled', properties.DataTraceEnabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DataTraceEnabled) : undefined);
    ret.addPropertyResult('detailedMetricsEnabled', 'DetailedMetricsEnabled', properties.DetailedMetricsEnabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DetailedMetricsEnabled) : undefined);
    ret.addPropertyResult('loggingLevel', 'LoggingLevel', properties.LoggingLevel != null ? cfn_parse.FromCloudFormation.getString(properties.LoggingLevel) : undefined);
    ret.addPropertyResult('throttlingBurstLimit', 'ThrottlingBurstLimit', properties.ThrottlingBurstLimit != null ? cfn_parse.FromCloudFormation.getNumber(properties.ThrottlingBurstLimit) : undefined);
    ret.addPropertyResult('throttlingRateLimit', 'ThrottlingRateLimit', properties.ThrottlingRateLimit != null ? cfn_parse.FromCloudFormation.getNumber(properties.ThrottlingRateLimit) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnApiGatewayManagedOverrides {
    /**
     * The `StageOverrides` property overrides the stage configuration for an API Gateway-managed stage. If you remove this property, API Gateway restores the default values.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-stageoverrides.html
     */
    export interface StageOverridesProperty {
        /**
         * Settings for logging access in a stage.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-stageoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-stageoverrides-accesslogsettings
         */
        readonly accessLogSettings?: CfnApiGatewayManagedOverrides.AccessLogSettingsProperty | cdk.IResolvable;
        /**
         * Specifies whether updates to an API automatically trigger a new deployment. The default value is `true` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-stageoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-stageoverrides-autodeploy
         */
        readonly autoDeploy?: boolean | cdk.IResolvable;
        /**
         * The default route settings for the stage.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-stageoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-stageoverrides-defaultroutesettings
         */
        readonly defaultRouteSettings?: CfnApiGatewayManagedOverrides.RouteSettingsProperty | cdk.IResolvable;
        /**
         * The description for the API stage.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-stageoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-stageoverrides-description
         */
        readonly description?: string;
        /**
         * Route settings for the stage.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-stageoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-stageoverrides-routesettings
         */
        readonly routeSettings?: any | cdk.IResolvable;
        /**
         * A map that defines the stage variables for a `Stage` . Variable names can have alphanumeric and underscore characters, and the values must match [A-Za-z0-9-._~:/?#&=,]+.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-apigatewaymanagedoverrides-stageoverrides.html#cfn-apigatewayv2-apigatewaymanagedoverrides-stageoverrides-stagevariables
         */
        readonly stageVariables?: any | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `StageOverridesProperty`
 *
 * @param properties - the TypeScript properties of a `StageOverridesProperty`
 *
 * @returns the result of the validation.
 */
function CfnApiGatewayManagedOverrides_StageOverridesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessLogSettings', CfnApiGatewayManagedOverrides_AccessLogSettingsPropertyValidator)(properties.accessLogSettings));
    errors.collect(cdk.propertyValidator('autoDeploy', cdk.validateBoolean)(properties.autoDeploy));
    errors.collect(cdk.propertyValidator('defaultRouteSettings', CfnApiGatewayManagedOverrides_RouteSettingsPropertyValidator)(properties.defaultRouteSettings));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('routeSettings', cdk.validateObject)(properties.routeSettings));
    errors.collect(cdk.propertyValidator('stageVariables', cdk.validateObject)(properties.stageVariables));
    return errors.wrap('supplied properties not correct for "StageOverridesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::ApiGatewayManagedOverrides.StageOverrides` resource
 *
 * @param properties - the TypeScript properties of a `StageOverridesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::ApiGatewayManagedOverrides.StageOverrides` resource.
 */
// @ts-ignore TS6133
function cfnApiGatewayManagedOverridesStageOverridesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApiGatewayManagedOverrides_StageOverridesPropertyValidator(properties).assertSuccess();
    return {
        AccessLogSettings: cfnApiGatewayManagedOverridesAccessLogSettingsPropertyToCloudFormation(properties.accessLogSettings),
        AutoDeploy: cdk.booleanToCloudFormation(properties.autoDeploy),
        DefaultRouteSettings: cfnApiGatewayManagedOverridesRouteSettingsPropertyToCloudFormation(properties.defaultRouteSettings),
        Description: cdk.stringToCloudFormation(properties.description),
        RouteSettings: cdk.objectToCloudFormation(properties.routeSettings),
        StageVariables: cdk.objectToCloudFormation(properties.stageVariables),
    };
}

// @ts-ignore TS6133
function CfnApiGatewayManagedOverridesStageOverridesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApiGatewayManagedOverrides.StageOverridesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApiGatewayManagedOverrides.StageOverridesProperty>();
    ret.addPropertyResult('accessLogSettings', 'AccessLogSettings', properties.AccessLogSettings != null ? CfnApiGatewayManagedOverridesAccessLogSettingsPropertyFromCloudFormation(properties.AccessLogSettings) : undefined);
    ret.addPropertyResult('autoDeploy', 'AutoDeploy', properties.AutoDeploy != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AutoDeploy) : undefined);
    ret.addPropertyResult('defaultRouteSettings', 'DefaultRouteSettings', properties.DefaultRouteSettings != null ? CfnApiGatewayManagedOverridesRouteSettingsPropertyFromCloudFormation(properties.DefaultRouteSettings) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('routeSettings', 'RouteSettings', properties.RouteSettings != null ? cfn_parse.FromCloudFormation.getAny(properties.RouteSettings) : undefined);
    ret.addPropertyResult('stageVariables', 'StageVariables', properties.StageVariables != null ? cfn_parse.FromCloudFormation.getAny(properties.StageVariables) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnApiMapping`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apimapping.html
 */
export interface CfnApiMappingProps {

    /**
     * The identifier of the API.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apimapping.html#cfn-apigatewayv2-apimapping-apiid
     */
    readonly apiId: string;

    /**
     * The domain name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apimapping.html#cfn-apigatewayv2-apimapping-domainname
     */
    readonly domainName: string;

    /**
     * The API stage.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apimapping.html#cfn-apigatewayv2-apimapping-stage
     */
    readonly stage: string;

    /**
     * The API mapping key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apimapping.html#cfn-apigatewayv2-apimapping-apimappingkey
     */
    readonly apiMappingKey?: string;
}

/**
 * Determine whether the given properties match those of a `CfnApiMappingProps`
 *
 * @param properties - the TypeScript properties of a `CfnApiMappingProps`
 *
 * @returns the result of the validation.
 */
function CfnApiMappingPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiId', cdk.requiredValidator)(properties.apiId));
    errors.collect(cdk.propertyValidator('apiId', cdk.validateString)(properties.apiId));
    errors.collect(cdk.propertyValidator('apiMappingKey', cdk.validateString)(properties.apiMappingKey));
    errors.collect(cdk.propertyValidator('domainName', cdk.requiredValidator)(properties.domainName));
    errors.collect(cdk.propertyValidator('domainName', cdk.validateString)(properties.domainName));
    errors.collect(cdk.propertyValidator('stage', cdk.requiredValidator)(properties.stage));
    errors.collect(cdk.propertyValidator('stage', cdk.validateString)(properties.stage));
    return errors.wrap('supplied properties not correct for "CfnApiMappingProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::ApiMapping` resource
 *
 * @param properties - the TypeScript properties of a `CfnApiMappingProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::ApiMapping` resource.
 */
// @ts-ignore TS6133
function cfnApiMappingPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnApiMappingPropsValidator(properties).assertSuccess();
    return {
        ApiId: cdk.stringToCloudFormation(properties.apiId),
        DomainName: cdk.stringToCloudFormation(properties.domainName),
        Stage: cdk.stringToCloudFormation(properties.stage),
        ApiMappingKey: cdk.stringToCloudFormation(properties.apiMappingKey),
    };
}

// @ts-ignore TS6133
function CfnApiMappingPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnApiMappingProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnApiMappingProps>();
    ret.addPropertyResult('apiId', 'ApiId', cfn_parse.FromCloudFormation.getString(properties.ApiId));
    ret.addPropertyResult('domainName', 'DomainName', cfn_parse.FromCloudFormation.getString(properties.DomainName));
    ret.addPropertyResult('stage', 'Stage', cfn_parse.FromCloudFormation.getString(properties.Stage));
    ret.addPropertyResult('apiMappingKey', 'ApiMappingKey', properties.ApiMappingKey != null ? cfn_parse.FromCloudFormation.getString(properties.ApiMappingKey) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ApiGatewayV2::ApiMapping`
 *
 * The `AWS::ApiGatewayV2::ApiMapping` resource contains an API mapping. An API mapping relates a path of your custom domain name to a stage of your API. A custom domain name can have multiple API mappings, but the paths can't overlap. A custom domain can map only to APIs of the same protocol type. For more information, see [CreateApiMapping](https://docs.aws.amazon.com/apigatewayv2/latest/api-reference/domainnames-domainname-apimappings.html#CreateApiMapping) in the *Amazon API Gateway V2 API Reference* .
 *
 * @cloudformationResource AWS::ApiGatewayV2::ApiMapping
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apimapping.html
 */
export class CfnApiMapping extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ApiGatewayV2::ApiMapping";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnApiMapping {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnApiMappingPropsFromCloudFormation(resourceProperties);
        const ret = new CfnApiMapping(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The identifier of the API.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apimapping.html#cfn-apigatewayv2-apimapping-apiid
     */
    public apiId: string;

    /**
     * The domain name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apimapping.html#cfn-apigatewayv2-apimapping-domainname
     */
    public domainName: string;

    /**
     * The API stage.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apimapping.html#cfn-apigatewayv2-apimapping-stage
     */
    public stage: string;

    /**
     * The API mapping key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apimapping.html#cfn-apigatewayv2-apimapping-apimappingkey
     */
    public apiMappingKey: string | undefined;

    /**
     * Create a new `AWS::ApiGatewayV2::ApiMapping`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnApiMappingProps) {
        super(scope, id, { type: CfnApiMapping.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'apiId', this);
        cdk.requireProperty(props, 'domainName', this);
        cdk.requireProperty(props, 'stage', this);

        this.apiId = props.apiId;
        this.domainName = props.domainName;
        this.stage = props.stage;
        this.apiMappingKey = props.apiMappingKey;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnApiMapping.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            apiId: this.apiId,
            domainName: this.domainName,
            stage: this.stage,
            apiMappingKey: this.apiMappingKey,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnApiMappingPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnAuthorizer`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html
 */
export interface CfnAuthorizerProps {

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-apiid
     */
    readonly apiId: string;

    /**
     * The authorizer type. Specify `REQUEST` for a Lambda function using incoming request parameters. Specify `JWT` to use JSON Web Tokens (supported only for HTTP APIs).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-authorizertype
     */
    readonly authorizerType: string;

    /**
     * The name of the authorizer.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-name
     */
    readonly name: string;

    /**
     * Specifies the required credentials as an IAM role for API Gateway to invoke the authorizer. To specify an IAM role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To use resource-based permissions on the Lambda function, specify null. Supported only for `REQUEST` authorizers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-authorizercredentialsarn
     */
    readonly authorizerCredentialsArn?: string;

    /**
     * Specifies the format of the payload sent to an HTTP API Lambda authorizer. Required for HTTP API Lambda authorizers. Supported values are `1.0` and `2.0` . To learn more, see [Working with AWS Lambda authorizers for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-authorizerpayloadformatversion
     */
    readonly authorizerPayloadFormatVersion?: string;

    /**
     * The time to live (TTL) for cached authorizer results, in seconds. If it equals 0, authorization caching is disabled. If it is greater than 0, API Gateway caches authorizer responses. The maximum value is 3600, or 1 hour. Supported only for HTTP API Lambda authorizers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-authorizerresultttlinseconds
     */
    readonly authorizerResultTtlInSeconds?: number;

    /**
     * The authorizer's Uniform Resource Identifier (URI). For `REQUEST` authorizers, this must be a well-formed Lambda function URI, for example, `arn:aws:apigateway:us-west-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-west-2: *{account_id}* :function: *{lambda_function_name}* /invocations` . In general, the URI has this form: `arn:aws:apigateway: *{region}* :lambda:path/ *{service_api}*` , where *{region}* is the same as the region hosting the Lambda function, path indicates that the remaining substring in the URI should be treated as the path to the resource, including the initial `/` . For Lambda functions, this is usually of the form `/2015-03-31/functions/[FunctionARN]/invocations` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-authorizeruri
     */
    readonly authorizerUri?: string;

    /**
     * Specifies whether a Lambda authorizer returns a response in a simple format. By default, a Lambda authorizer must return an IAM policy. If enabled, the Lambda authorizer can return a boolean value instead of an IAM policy. Supported only for HTTP APIs. To learn more, see [Working with AWS Lambda authorizers for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-enablesimpleresponses
     */
    readonly enableSimpleResponses?: boolean | cdk.IResolvable;

    /**
     * The identity source for which authorization is requested.
     *
     * For a `REQUEST` authorizer, this is optional. The value is a set of one or more mapping expressions of the specified request parameters. The identity source can be headers, query string parameters, stage variables, and context parameters. For example, if an Auth header and a Name query string parameter are defined as identity sources, this value is route.request.header.Auth, route.request.querystring.Name for WebSocket APIs. For HTTP APIs, use selection expressions prefixed with `$` , for example, `$request.header.Auth` , `$request.querystring.Name` . These parameters are used to perform runtime validation for Lambda-based authorizers by verifying all of the identity-related request parameters are present in the request, not null, and non-empty. Only when this is true does the authorizer invoke the authorizer Lambda function. Otherwise, it returns a 401 Unauthorized response without calling the Lambda function. For HTTP APIs, identity sources are also used as the cache key when caching is enabled. To learn more, see [Working with AWS Lambda authorizers for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html) .
     *
     * For `JWT` , a single entry that specifies where to extract the JSON Web Token (JWT) from inbound requests. Currently only header-based and query parameter-based selections are supported, for example `$request.header.Authorization` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-identitysource
     */
    readonly identitySource?: string[];

    /**
     * This parameter is not used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-identityvalidationexpression
     */
    readonly identityValidationExpression?: string;

    /**
     * The `JWTConfiguration` property specifies the configuration of a JWT authorizer. Required for the `JWT` authorizer type. Supported only for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-jwtconfiguration
     */
    readonly jwtConfiguration?: CfnAuthorizer.JWTConfigurationProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnAuthorizerProps`
 *
 * @param properties - the TypeScript properties of a `CfnAuthorizerProps`
 *
 * @returns the result of the validation.
 */
function CfnAuthorizerPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiId', cdk.requiredValidator)(properties.apiId));
    errors.collect(cdk.propertyValidator('apiId', cdk.validateString)(properties.apiId));
    errors.collect(cdk.propertyValidator('authorizerCredentialsArn', cdk.validateString)(properties.authorizerCredentialsArn));
    errors.collect(cdk.propertyValidator('authorizerPayloadFormatVersion', cdk.validateString)(properties.authorizerPayloadFormatVersion));
    errors.collect(cdk.propertyValidator('authorizerResultTtlInSeconds', cdk.validateNumber)(properties.authorizerResultTtlInSeconds));
    errors.collect(cdk.propertyValidator('authorizerType', cdk.requiredValidator)(properties.authorizerType));
    errors.collect(cdk.propertyValidator('authorizerType', cdk.validateString)(properties.authorizerType));
    errors.collect(cdk.propertyValidator('authorizerUri', cdk.validateString)(properties.authorizerUri));
    errors.collect(cdk.propertyValidator('enableSimpleResponses', cdk.validateBoolean)(properties.enableSimpleResponses));
    errors.collect(cdk.propertyValidator('identitySource', cdk.listValidator(cdk.validateString))(properties.identitySource));
    errors.collect(cdk.propertyValidator('identityValidationExpression', cdk.validateString)(properties.identityValidationExpression));
    errors.collect(cdk.propertyValidator('jwtConfiguration', CfnAuthorizer_JWTConfigurationPropertyValidator)(properties.jwtConfiguration));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    return errors.wrap('supplied properties not correct for "CfnAuthorizerProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Authorizer` resource
 *
 * @param properties - the TypeScript properties of a `CfnAuthorizerProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Authorizer` resource.
 */
// @ts-ignore TS6133
function cfnAuthorizerPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAuthorizerPropsValidator(properties).assertSuccess();
    return {
        ApiId: cdk.stringToCloudFormation(properties.apiId),
        AuthorizerType: cdk.stringToCloudFormation(properties.authorizerType),
        Name: cdk.stringToCloudFormation(properties.name),
        AuthorizerCredentialsArn: cdk.stringToCloudFormation(properties.authorizerCredentialsArn),
        AuthorizerPayloadFormatVersion: cdk.stringToCloudFormation(properties.authorizerPayloadFormatVersion),
        AuthorizerResultTtlInSeconds: cdk.numberToCloudFormation(properties.authorizerResultTtlInSeconds),
        AuthorizerUri: cdk.stringToCloudFormation(properties.authorizerUri),
        EnableSimpleResponses: cdk.booleanToCloudFormation(properties.enableSimpleResponses),
        IdentitySource: cdk.listMapper(cdk.stringToCloudFormation)(properties.identitySource),
        IdentityValidationExpression: cdk.stringToCloudFormation(properties.identityValidationExpression),
        JwtConfiguration: cfnAuthorizerJWTConfigurationPropertyToCloudFormation(properties.jwtConfiguration),
    };
}

// @ts-ignore TS6133
function CfnAuthorizerPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAuthorizerProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAuthorizerProps>();
    ret.addPropertyResult('apiId', 'ApiId', cfn_parse.FromCloudFormation.getString(properties.ApiId));
    ret.addPropertyResult('authorizerType', 'AuthorizerType', cfn_parse.FromCloudFormation.getString(properties.AuthorizerType));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('authorizerCredentialsArn', 'AuthorizerCredentialsArn', properties.AuthorizerCredentialsArn != null ? cfn_parse.FromCloudFormation.getString(properties.AuthorizerCredentialsArn) : undefined);
    ret.addPropertyResult('authorizerPayloadFormatVersion', 'AuthorizerPayloadFormatVersion', properties.AuthorizerPayloadFormatVersion != null ? cfn_parse.FromCloudFormation.getString(properties.AuthorizerPayloadFormatVersion) : undefined);
    ret.addPropertyResult('authorizerResultTtlInSeconds', 'AuthorizerResultTtlInSeconds', properties.AuthorizerResultTtlInSeconds != null ? cfn_parse.FromCloudFormation.getNumber(properties.AuthorizerResultTtlInSeconds) : undefined);
    ret.addPropertyResult('authorizerUri', 'AuthorizerUri', properties.AuthorizerUri != null ? cfn_parse.FromCloudFormation.getString(properties.AuthorizerUri) : undefined);
    ret.addPropertyResult('enableSimpleResponses', 'EnableSimpleResponses', properties.EnableSimpleResponses != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableSimpleResponses) : undefined);
    ret.addPropertyResult('identitySource', 'IdentitySource', properties.IdentitySource != null ? cfn_parse.FromCloudFormation.getStringArray(properties.IdentitySource) : undefined);
    ret.addPropertyResult('identityValidationExpression', 'IdentityValidationExpression', properties.IdentityValidationExpression != null ? cfn_parse.FromCloudFormation.getString(properties.IdentityValidationExpression) : undefined);
    ret.addPropertyResult('jwtConfiguration', 'JwtConfiguration', properties.JwtConfiguration != null ? CfnAuthorizerJWTConfigurationPropertyFromCloudFormation(properties.JwtConfiguration) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ApiGatewayV2::Authorizer`
 *
 * The `AWS::ApiGatewayV2::Authorizer` resource creates an authorizer for a WebSocket API or an HTTP API. To learn more, see [Controlling and managing access to a WebSocket API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-control-access.html) and [Controlling and managing access to an HTTP API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-access-control.html) in the *API Gateway Developer Guide* .
 *
 * @cloudformationResource AWS::ApiGatewayV2::Authorizer
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html
 */
export class CfnAuthorizer extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ApiGatewayV2::Authorizer";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnAuthorizer {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnAuthorizerPropsFromCloudFormation(resourceProperties);
        const ret = new CfnAuthorizer(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-apiid
     */
    public apiId: string;

    /**
     * The authorizer type. Specify `REQUEST` for a Lambda function using incoming request parameters. Specify `JWT` to use JSON Web Tokens (supported only for HTTP APIs).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-authorizertype
     */
    public authorizerType: string;

    /**
     * The name of the authorizer.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-name
     */
    public name: string;

    /**
     * Specifies the required credentials as an IAM role for API Gateway to invoke the authorizer. To specify an IAM role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To use resource-based permissions on the Lambda function, specify null. Supported only for `REQUEST` authorizers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-authorizercredentialsarn
     */
    public authorizerCredentialsArn: string | undefined;

    /**
     * Specifies the format of the payload sent to an HTTP API Lambda authorizer. Required for HTTP API Lambda authorizers. Supported values are `1.0` and `2.0` . To learn more, see [Working with AWS Lambda authorizers for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-authorizerpayloadformatversion
     */
    public authorizerPayloadFormatVersion: string | undefined;

    /**
     * The time to live (TTL) for cached authorizer results, in seconds. If it equals 0, authorization caching is disabled. If it is greater than 0, API Gateway caches authorizer responses. The maximum value is 3600, or 1 hour. Supported only for HTTP API Lambda authorizers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-authorizerresultttlinseconds
     */
    public authorizerResultTtlInSeconds: number | undefined;

    /**
     * The authorizer's Uniform Resource Identifier (URI). For `REQUEST` authorizers, this must be a well-formed Lambda function URI, for example, `arn:aws:apigateway:us-west-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-west-2: *{account_id}* :function: *{lambda_function_name}* /invocations` . In general, the URI has this form: `arn:aws:apigateway: *{region}* :lambda:path/ *{service_api}*` , where *{region}* is the same as the region hosting the Lambda function, path indicates that the remaining substring in the URI should be treated as the path to the resource, including the initial `/` . For Lambda functions, this is usually of the form `/2015-03-31/functions/[FunctionARN]/invocations` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-authorizeruri
     */
    public authorizerUri: string | undefined;

    /**
     * Specifies whether a Lambda authorizer returns a response in a simple format. By default, a Lambda authorizer must return an IAM policy. If enabled, the Lambda authorizer can return a boolean value instead of an IAM policy. Supported only for HTTP APIs. To learn more, see [Working with AWS Lambda authorizers for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-enablesimpleresponses
     */
    public enableSimpleResponses: boolean | cdk.IResolvable | undefined;

    /**
     * The identity source for which authorization is requested.
     *
     * For a `REQUEST` authorizer, this is optional. The value is a set of one or more mapping expressions of the specified request parameters. The identity source can be headers, query string parameters, stage variables, and context parameters. For example, if an Auth header and a Name query string parameter are defined as identity sources, this value is route.request.header.Auth, route.request.querystring.Name for WebSocket APIs. For HTTP APIs, use selection expressions prefixed with `$` , for example, `$request.header.Auth` , `$request.querystring.Name` . These parameters are used to perform runtime validation for Lambda-based authorizers by verifying all of the identity-related request parameters are present in the request, not null, and non-empty. Only when this is true does the authorizer invoke the authorizer Lambda function. Otherwise, it returns a 401 Unauthorized response without calling the Lambda function. For HTTP APIs, identity sources are also used as the cache key when caching is enabled. To learn more, see [Working with AWS Lambda authorizers for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html) .
     *
     * For `JWT` , a single entry that specifies where to extract the JSON Web Token (JWT) from inbound requests. Currently only header-based and query parameter-based selections are supported, for example `$request.header.Authorization` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-identitysource
     */
    public identitySource: string[] | undefined;

    /**
     * This parameter is not used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-identityvalidationexpression
     */
    public identityValidationExpression: string | undefined;

    /**
     * The `JWTConfiguration` property specifies the configuration of a JWT authorizer. Required for the `JWT` authorizer type. Supported only for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-authorizer.html#cfn-apigatewayv2-authorizer-jwtconfiguration
     */
    public jwtConfiguration: CfnAuthorizer.JWTConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::ApiGatewayV2::Authorizer`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnAuthorizerProps) {
        super(scope, id, { type: CfnAuthorizer.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'apiId', this);
        cdk.requireProperty(props, 'authorizerType', this);
        cdk.requireProperty(props, 'name', this);

        this.apiId = props.apiId;
        this.authorizerType = props.authorizerType;
        this.name = props.name;
        this.authorizerCredentialsArn = props.authorizerCredentialsArn;
        this.authorizerPayloadFormatVersion = props.authorizerPayloadFormatVersion;
        this.authorizerResultTtlInSeconds = props.authorizerResultTtlInSeconds;
        this.authorizerUri = props.authorizerUri;
        this.enableSimpleResponses = props.enableSimpleResponses;
        this.identitySource = props.identitySource;
        this.identityValidationExpression = props.identityValidationExpression;
        this.jwtConfiguration = props.jwtConfiguration;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnAuthorizer.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            apiId: this.apiId,
            authorizerType: this.authorizerType,
            name: this.name,
            authorizerCredentialsArn: this.authorizerCredentialsArn,
            authorizerPayloadFormatVersion: this.authorizerPayloadFormatVersion,
            authorizerResultTtlInSeconds: this.authorizerResultTtlInSeconds,
            authorizerUri: this.authorizerUri,
            enableSimpleResponses: this.enableSimpleResponses,
            identitySource: this.identitySource,
            identityValidationExpression: this.identityValidationExpression,
            jwtConfiguration: this.jwtConfiguration,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnAuthorizerPropsToCloudFormation(props);
    }
}

export namespace CfnAuthorizer {
    /**
     * The `JWTConfiguration` property specifies the configuration of a JWT authorizer. Required for the `JWT` authorizer type. Supported only for HTTP APIs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-authorizer-jwtconfiguration.html
     */
    export interface JWTConfigurationProperty {
        /**
         * A list of the intended recipients of the JWT. A valid JWT must provide an `aud` that matches at least one entry in this list. See [RFC 7519](https://docs.aws.amazon.com/https://tools.ietf.org/html/rfc7519#section-4.1.3) . Required for the `JWT` authorizer type. Supported only for HTTP APIs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-authorizer-jwtconfiguration.html#cfn-apigatewayv2-authorizer-jwtconfiguration-audience
         */
        readonly audience?: string[];
        /**
         * The base domain of the identity provider that issues JSON Web Tokens. For example, an Amazon Cognito user pool has the following format: `https://cognito-idp. {region} .amazonaws.com/ {userPoolId}` . Required for the `JWT` authorizer type. Supported only for HTTP APIs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-authorizer-jwtconfiguration.html#cfn-apigatewayv2-authorizer-jwtconfiguration-issuer
         */
        readonly issuer?: string;
    }
}

/**
 * Determine whether the given properties match those of a `JWTConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `JWTConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnAuthorizer_JWTConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('audience', cdk.listValidator(cdk.validateString))(properties.audience));
    errors.collect(cdk.propertyValidator('issuer', cdk.validateString)(properties.issuer));
    return errors.wrap('supplied properties not correct for "JWTConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Authorizer.JWTConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `JWTConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Authorizer.JWTConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnAuthorizerJWTConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnAuthorizer_JWTConfigurationPropertyValidator(properties).assertSuccess();
    return {
        Audience: cdk.listMapper(cdk.stringToCloudFormation)(properties.audience),
        Issuer: cdk.stringToCloudFormation(properties.issuer),
    };
}

// @ts-ignore TS6133
function CfnAuthorizerJWTConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnAuthorizer.JWTConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnAuthorizer.JWTConfigurationProperty>();
    ret.addPropertyResult('audience', 'Audience', properties.Audience != null ? cfn_parse.FromCloudFormation.getStringArray(properties.Audience) : undefined);
    ret.addPropertyResult('issuer', 'Issuer', properties.Issuer != null ? cfn_parse.FromCloudFormation.getString(properties.Issuer) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDeployment`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-deployment.html
 */
export interface CfnDeploymentProps {

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-deployment.html#cfn-apigatewayv2-deployment-apiid
     */
    readonly apiId: string;

    /**
     * The description for the deployment resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-deployment.html#cfn-apigatewayv2-deployment-description
     */
    readonly description?: string;

    /**
     * The name of an existing stage to associate with the deployment.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-deployment.html#cfn-apigatewayv2-deployment-stagename
     */
    readonly stageName?: string;
}

/**
 * Determine whether the given properties match those of a `CfnDeploymentProps`
 *
 * @param properties - the TypeScript properties of a `CfnDeploymentProps`
 *
 * @returns the result of the validation.
 */
function CfnDeploymentPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiId', cdk.requiredValidator)(properties.apiId));
    errors.collect(cdk.propertyValidator('apiId', cdk.validateString)(properties.apiId));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('stageName', cdk.validateString)(properties.stageName));
    return errors.wrap('supplied properties not correct for "CfnDeploymentProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Deployment` resource
 *
 * @param properties - the TypeScript properties of a `CfnDeploymentProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Deployment` resource.
 */
// @ts-ignore TS6133
function cfnDeploymentPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDeploymentPropsValidator(properties).assertSuccess();
    return {
        ApiId: cdk.stringToCloudFormation(properties.apiId),
        Description: cdk.stringToCloudFormation(properties.description),
        StageName: cdk.stringToCloudFormation(properties.stageName),
    };
}

// @ts-ignore TS6133
function CfnDeploymentPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDeploymentProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDeploymentProps>();
    ret.addPropertyResult('apiId', 'ApiId', cfn_parse.FromCloudFormation.getString(properties.ApiId));
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('stageName', 'StageName', properties.StageName != null ? cfn_parse.FromCloudFormation.getString(properties.StageName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ApiGatewayV2::Deployment`
 *
 * The `AWS::ApiGatewayV2::Deployment` resource creates a deployment for an API.
 *
 * @cloudformationResource AWS::ApiGatewayV2::Deployment
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-deployment.html
 */
export class CfnDeployment extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ApiGatewayV2::Deployment";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDeployment {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDeploymentPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDeployment(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-deployment.html#cfn-apigatewayv2-deployment-apiid
     */
    public apiId: string;

    /**
     * The description for the deployment resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-deployment.html#cfn-apigatewayv2-deployment-description
     */
    public description: string | undefined;

    /**
     * The name of an existing stage to associate with the deployment.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-deployment.html#cfn-apigatewayv2-deployment-stagename
     */
    public stageName: string | undefined;

    /**
     * Create a new `AWS::ApiGatewayV2::Deployment`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDeploymentProps) {
        super(scope, id, { type: CfnDeployment.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'apiId', this);

        this.apiId = props.apiId;
        this.description = props.description;
        this.stageName = props.stageName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDeployment.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            apiId: this.apiId,
            description: this.description,
            stageName: this.stageName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDeploymentPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnDomainName`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-domainname.html
 */
export interface CfnDomainNameProps {

    /**
     * The custom domain name for your API in Amazon API Gateway. Uppercase letters are not supported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-domainname.html#cfn-apigatewayv2-domainname-domainname
     */
    readonly domainName: string;

    /**
     * The domain name configurations.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-domainname.html#cfn-apigatewayv2-domainname-domainnameconfigurations
     */
    readonly domainNameConfigurations?: Array<CfnDomainName.DomainNameConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The mutual TLS authentication configuration for a custom domain name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-domainname.html#cfn-apigatewayv2-domainname-mutualtlsauthentication
     */
    readonly mutualTlsAuthentication?: CfnDomainName.MutualTlsAuthenticationProperty | cdk.IResolvable;

    /**
     * The collection of tags associated with a domain name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-domainname.html#cfn-apigatewayv2-domainname-tags
     */
    readonly tags?: any;
}

/**
 * Determine whether the given properties match those of a `CfnDomainNameProps`
 *
 * @param properties - the TypeScript properties of a `CfnDomainNameProps`
 *
 * @returns the result of the validation.
 */
function CfnDomainNamePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('domainName', cdk.requiredValidator)(properties.domainName));
    errors.collect(cdk.propertyValidator('domainName', cdk.validateString)(properties.domainName));
    errors.collect(cdk.propertyValidator('domainNameConfigurations', cdk.listValidator(CfnDomainName_DomainNameConfigurationPropertyValidator))(properties.domainNameConfigurations));
    errors.collect(cdk.propertyValidator('mutualTlsAuthentication', CfnDomainName_MutualTlsAuthenticationPropertyValidator)(properties.mutualTlsAuthentication));
    errors.collect(cdk.propertyValidator('tags', cdk.validateObject)(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnDomainNameProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::DomainName` resource
 *
 * @param properties - the TypeScript properties of a `CfnDomainNameProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::DomainName` resource.
 */
// @ts-ignore TS6133
function cfnDomainNamePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomainNamePropsValidator(properties).assertSuccess();
    return {
        DomainName: cdk.stringToCloudFormation(properties.domainName),
        DomainNameConfigurations: cdk.listMapper(cfnDomainNameDomainNameConfigurationPropertyToCloudFormation)(properties.domainNameConfigurations),
        MutualTlsAuthentication: cfnDomainNameMutualTlsAuthenticationPropertyToCloudFormation(properties.mutualTlsAuthentication),
        Tags: cdk.objectToCloudFormation(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDomainNamePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomainNameProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomainNameProps>();
    ret.addPropertyResult('domainName', 'DomainName', cfn_parse.FromCloudFormation.getString(properties.DomainName));
    ret.addPropertyResult('domainNameConfigurations', 'DomainNameConfigurations', properties.DomainNameConfigurations != null ? cfn_parse.FromCloudFormation.getArray(CfnDomainNameDomainNameConfigurationPropertyFromCloudFormation)(properties.DomainNameConfigurations) : undefined);
    ret.addPropertyResult('mutualTlsAuthentication', 'MutualTlsAuthentication', properties.MutualTlsAuthentication != null ? CfnDomainNameMutualTlsAuthenticationPropertyFromCloudFormation(properties.MutualTlsAuthentication) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getAny(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ApiGatewayV2::DomainName`
 *
 * The `AWS::ApiGatewayV2::DomainName` resource specifies a custom domain name for your API in Amazon API Gateway (API Gateway).
 *
 * You can use a custom domain name to provide a URL that's more intuitive and easier to recall. For more information about using custom domain names, see [Set up Custom Domain Name for an API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html) in the *API Gateway Developer Guide* .
 *
 * @cloudformationResource AWS::ApiGatewayV2::DomainName
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-domainname.html
 */
export class CfnDomainName extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ApiGatewayV2::DomainName";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDomainName {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDomainNamePropsFromCloudFormation(resourceProperties);
        const ret = new CfnDomainName(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The domain name associated with the regional endpoint for this custom domain name. You set up this association by adding a DNS record that points the custom domain name to this regional domain name.
     * @cloudformationAttribute RegionalDomainName
     */
    public readonly attrRegionalDomainName: string;

    /**
     * The region-specific Amazon Route 53 Hosted Zone ID of the regional endpoint.
     * @cloudformationAttribute RegionalHostedZoneId
     */
    public readonly attrRegionalHostedZoneId: string;

    /**
     * The custom domain name for your API in Amazon API Gateway. Uppercase letters are not supported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-domainname.html#cfn-apigatewayv2-domainname-domainname
     */
    public domainName: string;

    /**
     * The domain name configurations.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-domainname.html#cfn-apigatewayv2-domainname-domainnameconfigurations
     */
    public domainNameConfigurations: Array<CfnDomainName.DomainNameConfigurationProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The mutual TLS authentication configuration for a custom domain name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-domainname.html#cfn-apigatewayv2-domainname-mutualtlsauthentication
     */
    public mutualTlsAuthentication: CfnDomainName.MutualTlsAuthenticationProperty | cdk.IResolvable | undefined;

    /**
     * The collection of tags associated with a domain name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-domainname.html#cfn-apigatewayv2-domainname-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::ApiGatewayV2::DomainName`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDomainNameProps) {
        super(scope, id, { type: CfnDomainName.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'domainName', this);
        this.attrRegionalDomainName = cdk.Token.asString(this.getAtt('RegionalDomainName'));
        this.attrRegionalHostedZoneId = cdk.Token.asString(this.getAtt('RegionalHostedZoneId'));

        this.domainName = props.domainName;
        this.domainNameConfigurations = props.domainNameConfigurations;
        this.mutualTlsAuthentication = props.mutualTlsAuthentication;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::ApiGatewayV2::DomainName", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDomainName.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            domainName: this.domainName,
            domainNameConfigurations: this.domainNameConfigurations,
            mutualTlsAuthentication: this.mutualTlsAuthentication,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDomainNamePropsToCloudFormation(props);
    }
}

export namespace CfnDomainName {
    /**
     * The `DomainNameConfiguration` property type specifies the configuration for a an API's domain name.
     *
     * `DomainNameConfiguration` is a property of the [AWS::ApiGatewayV2::DomainName](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-domainname.html) resource.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-domainname-domainnameconfiguration.html
     */
    export interface DomainNameConfigurationProperty {
        /**
         * An AWS -managed certificate that will be used by the edge-optimized endpoint for this domain name. AWS Certificate Manager is the only supported source.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-domainname-domainnameconfiguration.html#cfn-apigatewayv2-domainname-domainnameconfiguration-certificatearn
         */
        readonly certificateArn?: string;
        /**
         * The user-friendly name of the certificate that will be used by the edge-optimized endpoint for this domain name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-domainname-domainnameconfiguration.html#cfn-apigatewayv2-domainname-domainnameconfiguration-certificatename
         */
        readonly certificateName?: string;
        /**
         * The endpoint type.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-domainname-domainnameconfiguration.html#cfn-apigatewayv2-domainname-domainnameconfiguration-endpointtype
         */
        readonly endpointType?: string;
        /**
         * The ARN of the public certificate issued by ACM to validate ownership of your custom domain. Only required when configuring mutual TLS and using an ACM imported or private CA certificate ARN as the RegionalCertificateArn.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-domainname-domainnameconfiguration.html#cfn-apigatewayv2-domainname-domainnameconfiguration-ownershipverificationcertificatearn
         */
        readonly ownershipVerificationCertificateArn?: string;
        /**
         * The Transport Layer Security (TLS) version of the security policy for this domain name. The valid values are `TLS_1_0` and `TLS_1_2` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-domainname-domainnameconfiguration.html#cfn-apigatewayv2-domainname-domainnameconfiguration-securitypolicy
         */
        readonly securityPolicy?: string;
    }
}

/**
 * Determine whether the given properties match those of a `DomainNameConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `DomainNameConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDomainName_DomainNameConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('certificateArn', cdk.validateString)(properties.certificateArn));
    errors.collect(cdk.propertyValidator('certificateName', cdk.validateString)(properties.certificateName));
    errors.collect(cdk.propertyValidator('endpointType', cdk.validateString)(properties.endpointType));
    errors.collect(cdk.propertyValidator('ownershipVerificationCertificateArn', cdk.validateString)(properties.ownershipVerificationCertificateArn));
    errors.collect(cdk.propertyValidator('securityPolicy', cdk.validateString)(properties.securityPolicy));
    return errors.wrap('supplied properties not correct for "DomainNameConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::DomainName.DomainNameConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `DomainNameConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::DomainName.DomainNameConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDomainNameDomainNameConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomainName_DomainNameConfigurationPropertyValidator(properties).assertSuccess();
    return {
        CertificateArn: cdk.stringToCloudFormation(properties.certificateArn),
        CertificateName: cdk.stringToCloudFormation(properties.certificateName),
        EndpointType: cdk.stringToCloudFormation(properties.endpointType),
        OwnershipVerificationCertificateArn: cdk.stringToCloudFormation(properties.ownershipVerificationCertificateArn),
        SecurityPolicy: cdk.stringToCloudFormation(properties.securityPolicy),
    };
}

// @ts-ignore TS6133
function CfnDomainNameDomainNameConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomainName.DomainNameConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomainName.DomainNameConfigurationProperty>();
    ret.addPropertyResult('certificateArn', 'CertificateArn', properties.CertificateArn != null ? cfn_parse.FromCloudFormation.getString(properties.CertificateArn) : undefined);
    ret.addPropertyResult('certificateName', 'CertificateName', properties.CertificateName != null ? cfn_parse.FromCloudFormation.getString(properties.CertificateName) : undefined);
    ret.addPropertyResult('endpointType', 'EndpointType', properties.EndpointType != null ? cfn_parse.FromCloudFormation.getString(properties.EndpointType) : undefined);
    ret.addPropertyResult('ownershipVerificationCertificateArn', 'OwnershipVerificationCertificateArn', properties.OwnershipVerificationCertificateArn != null ? cfn_parse.FromCloudFormation.getString(properties.OwnershipVerificationCertificateArn) : undefined);
    ret.addPropertyResult('securityPolicy', 'SecurityPolicy', properties.SecurityPolicy != null ? cfn_parse.FromCloudFormation.getString(properties.SecurityPolicy) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDomainName {
    /**
     * If specified, API Gateway performs two-way authentication between the client and the server. Clients must present a trusted certificate to access your API.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-domainname-mutualtlsauthentication.html
     */
    export interface MutualTlsAuthenticationProperty {
        /**
         * An Amazon S3 URL that specifies the truststore for mutual TLS authentication, for example, `s3:// bucket-name / key-name` . The truststore can contain certificates from public or private certificate authorities. To update the truststore, upload a new version to S3, and then update your custom domain name to use the new version. To update the truststore, you must have permissions to access the S3 object.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-domainname-mutualtlsauthentication.html#cfn-apigatewayv2-domainname-mutualtlsauthentication-truststoreuri
         */
        readonly truststoreUri?: string;
        /**
         * The version of the S3 object that contains your truststore. To specify a version, you must have versioning enabled for the S3 bucket.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-domainname-mutualtlsauthentication.html#cfn-apigatewayv2-domainname-mutualtlsauthentication-truststoreversion
         */
        readonly truststoreVersion?: string;
    }
}

/**
 * Determine whether the given properties match those of a `MutualTlsAuthenticationProperty`
 *
 * @param properties - the TypeScript properties of a `MutualTlsAuthenticationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDomainName_MutualTlsAuthenticationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('truststoreUri', cdk.validateString)(properties.truststoreUri));
    errors.collect(cdk.propertyValidator('truststoreVersion', cdk.validateString)(properties.truststoreVersion));
    return errors.wrap('supplied properties not correct for "MutualTlsAuthenticationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::DomainName.MutualTlsAuthentication` resource
 *
 * @param properties - the TypeScript properties of a `MutualTlsAuthenticationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::DomainName.MutualTlsAuthentication` resource.
 */
// @ts-ignore TS6133
function cfnDomainNameMutualTlsAuthenticationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDomainName_MutualTlsAuthenticationPropertyValidator(properties).assertSuccess();
    return {
        TruststoreUri: cdk.stringToCloudFormation(properties.truststoreUri),
        TruststoreVersion: cdk.stringToCloudFormation(properties.truststoreVersion),
    };
}

// @ts-ignore TS6133
function CfnDomainNameMutualTlsAuthenticationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDomainName.MutualTlsAuthenticationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDomainName.MutualTlsAuthenticationProperty>();
    ret.addPropertyResult('truststoreUri', 'TruststoreUri', properties.TruststoreUri != null ? cfn_parse.FromCloudFormation.getString(properties.TruststoreUri) : undefined);
    ret.addPropertyResult('truststoreVersion', 'TruststoreVersion', properties.TruststoreVersion != null ? cfn_parse.FromCloudFormation.getString(properties.TruststoreVersion) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnIntegration`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html
 */
export interface CfnIntegrationProps {

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-apiid
     */
    readonly apiId: string;

    /**
     * The integration type of an integration. One of the following:
     *
     * `AWS` : for integrating the route or method request with an AWS service action, including the Lambda function-invoking action. With the Lambda function-invoking action, this is referred to as the Lambda custom integration. With any other AWS service action, this is known as AWS integration. Supported only for WebSocket APIs.
     *
     * `AWS_PROXY` : for integrating the route or method request with a Lambda function or other AWS service action. This integration is also referred to as a Lambda proxy integration.
     *
     * `HTTP` : for integrating the route or method request with an HTTP endpoint. This integration is also referred to as the HTTP custom integration. Supported only for WebSocket APIs.
     *
     * `HTTP_PROXY` : for integrating the route or method request with an HTTP endpoint, with the client request passed through as-is. This is also referred to as HTTP proxy integration. For HTTP API private integrations, use an `HTTP_PROXY` integration.
     *
     * `MOCK` : for integrating the route or method request with API Gateway as a "loopback" endpoint without invoking any backend. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-integrationtype
     */
    readonly integrationType: string;

    /**
     * The ID of the VPC link for a private integration. Supported only for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-connectionid
     */
    readonly connectionId?: string;

    /**
     * The type of the network connection to the integration endpoint. Specify `INTERNET` for connections through the public routable internet or `VPC_LINK` for private connections between API Gateway and resources in a VPC. The default value is `INTERNET` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-connectiontype
     */
    readonly connectionType?: string;

    /**
     * Supported only for WebSocket APIs. Specifies how to handle response payload content type conversions. Supported values are `CONVERT_TO_BINARY` and `CONVERT_TO_TEXT` , with the following behaviors:
     *
     * `CONVERT_TO_BINARY` : Converts a response payload from a Base64-encoded string to the corresponding binary blob.
     *
     * `CONVERT_TO_TEXT` : Converts a response payload from a binary blob to a Base64-encoded string.
     *
     * If this property is not defined, the response payload will be passed through from the integration response to the route response or method response without modification.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-contenthandlingstrategy
     */
    readonly contentHandlingStrategy?: string;

    /**
     * Specifies the credentials required for the integration, if any. For AWS integrations, three options are available. To specify an IAM Role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To require that the caller's identity be passed through from the request, specify the string `arn:aws:iam::*:user/*` . To use resource-based permissions on supported AWS services, don't specify this parameter.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-credentialsarn
     */
    readonly credentialsArn?: string;

    /**
     * The description of the integration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-description
     */
    readonly description?: string;

    /**
     * Specifies the integration's HTTP method type.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-integrationmethod
     */
    readonly integrationMethod?: string;

    /**
     * Supported only for HTTP API `AWS_PROXY` integrations. Specifies the AWS service action to invoke. To learn more, see [Integration subtype reference](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-aws-services-reference.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-integrationsubtype
     */
    readonly integrationSubtype?: string;

    /**
     * For a Lambda integration, specify the URI of a Lambda function.
     *
     * For an HTTP integration, specify a fully-qualified URL.
     *
     * For an HTTP API private integration, specify the ARN of an Application Load Balancer listener, Network Load Balancer listener, or AWS Cloud Map service. If you specify the ARN of an AWS Cloud Map service, API Gateway uses `DiscoverInstances` to identify resources. You can use query parameters to target specific resources. To learn more, see [DiscoverInstances](https://docs.aws.amazon.com/cloud-map/latest/api/API_DiscoverInstances.html) . For private integrations, all resources must be owned by the same AWS account .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-integrationuri
     */
    readonly integrationUri?: string;

    /**
     * Specifies the pass-through behavior for incoming requests based on the `Content-Type` header in the request, and the available mapping templates specified as the `requestTemplates` property on the `Integration` resource. There are three valid values: `WHEN_NO_MATCH` , `WHEN_NO_TEMPLATES` , and `NEVER` . Supported only for WebSocket APIs.
     *
     * `WHEN_NO_MATCH` passes the request body for unmapped content types through to the integration backend without transformation.
     *
     * `NEVER` rejects unmapped content types with an `HTTP 415 Unsupported Media Type` response.
     *
     * `WHEN_NO_TEMPLATES` allows pass-through when the integration has no content types mapped to templates. However, if there is at least one content type defined, unmapped content types will be rejected with the same `HTTP 415 Unsupported Media Type` response.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-passthroughbehavior
     */
    readonly passthroughBehavior?: string;

    /**
     * Specifies the format of the payload sent to an integration. Required for HTTP APIs. For HTTP APIs, supported values for Lambda proxy integrations are `1.0` and `2.0` . For all other integrations, `1.0` is the only supported value. To learn more, see [Working with AWS Lambda proxy integrations for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-payloadformatversion
     */
    readonly payloadFormatVersion?: string;

    /**
     * For WebSocket APIs, a key-value map specifying request parameters that are passed from the method request to the backend. The key is an integration request parameter name and the associated value is a method request parameter value or static value that must be enclosed within single quotes and pre-encoded as required by the backend. The method request parameter value must match the pattern of `method.request. {location} . {name}` , where `{location}` is `querystring` , `path` , or `header` ; and `{name}` must be a valid and unique method request parameter name.
     *
     * For HTTP API integrations with a specified `integrationSubtype` , request parameters are a key-value map specifying parameters that are passed to `AWS_PROXY` integrations. You can provide static values, or map request data, stage variables, or context variables that are evaluated at runtime. To learn more, see [Working with AWS service integrations for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-aws-services.html) .
     *
     * For HTTP API integrations without a specified `integrationSubtype` request parameters are a key-value map specifying how to transform HTTP requests before sending them to the backend. The key should follow the pattern <action>:<header|querystring|path>.<location> where action can be `append` , `overwrite` or `remove` . For values, you can provide static values, or map request data, stage variables, or context variables that are evaluated at runtime. To learn more, see [Transforming API requests and responses](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-parameter-mapping.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-requestparameters
     */
    readonly requestParameters?: any | cdk.IResolvable;

    /**
     * Represents a map of Velocity templates that are applied on the request payload based on the value of the Content-Type header sent by the client. The content type value is the key in this map, and the template (as a String) is the value. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-requesttemplates
     */
    readonly requestTemplates?: any | cdk.IResolvable;

    /**
     * Supported only for HTTP APIs. You use response parameters to transform the HTTP response from a backend integration before returning the response to clients. Specify a key-value map from a selection key to response parameters. The selection key must be a valid HTTP status code within the range of 200-599. The value is of type [`ResponseParameterList`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-integration-responseparameterlist.html) . To learn more, see [Transforming API requests and responses](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-parameter-mapping.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-responseparameters
     */
    readonly responseParameters?: any | cdk.IResolvable;

    /**
     * The template selection expression for the integration. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-templateselectionexpression
     */
    readonly templateSelectionExpression?: string;

    /**
     * Custom timeout between 50 and 29,000 milliseconds for WebSocket APIs and between 50 and 30,000 milliseconds for HTTP APIs. The default timeout is 29 seconds for WebSocket APIs and 30 seconds for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-timeoutinmillis
     */
    readonly timeoutInMillis?: number;

    /**
     * The TLS configuration for a private integration. If you specify a TLS configuration, private integration traffic uses the HTTPS protocol. Supported only for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-tlsconfig
     */
    readonly tlsConfig?: CfnIntegration.TlsConfigProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnIntegrationProps`
 *
 * @param properties - the TypeScript properties of a `CfnIntegrationProps`
 *
 * @returns the result of the validation.
 */
function CfnIntegrationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiId', cdk.requiredValidator)(properties.apiId));
    errors.collect(cdk.propertyValidator('apiId', cdk.validateString)(properties.apiId));
    errors.collect(cdk.propertyValidator('connectionId', cdk.validateString)(properties.connectionId));
    errors.collect(cdk.propertyValidator('connectionType', cdk.validateString)(properties.connectionType));
    errors.collect(cdk.propertyValidator('contentHandlingStrategy', cdk.validateString)(properties.contentHandlingStrategy));
    errors.collect(cdk.propertyValidator('credentialsArn', cdk.validateString)(properties.credentialsArn));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('integrationMethod', cdk.validateString)(properties.integrationMethod));
    errors.collect(cdk.propertyValidator('integrationSubtype', cdk.validateString)(properties.integrationSubtype));
    errors.collect(cdk.propertyValidator('integrationType', cdk.requiredValidator)(properties.integrationType));
    errors.collect(cdk.propertyValidator('integrationType', cdk.validateString)(properties.integrationType));
    errors.collect(cdk.propertyValidator('integrationUri', cdk.validateString)(properties.integrationUri));
    errors.collect(cdk.propertyValidator('passthroughBehavior', cdk.validateString)(properties.passthroughBehavior));
    errors.collect(cdk.propertyValidator('payloadFormatVersion', cdk.validateString)(properties.payloadFormatVersion));
    errors.collect(cdk.propertyValidator('requestParameters', cdk.validateObject)(properties.requestParameters));
    errors.collect(cdk.propertyValidator('requestTemplates', cdk.validateObject)(properties.requestTemplates));
    errors.collect(cdk.propertyValidator('responseParameters', cdk.validateObject)(properties.responseParameters));
    errors.collect(cdk.propertyValidator('templateSelectionExpression', cdk.validateString)(properties.templateSelectionExpression));
    errors.collect(cdk.propertyValidator('timeoutInMillis', cdk.validateNumber)(properties.timeoutInMillis));
    errors.collect(cdk.propertyValidator('tlsConfig', CfnIntegration_TlsConfigPropertyValidator)(properties.tlsConfig));
    return errors.wrap('supplied properties not correct for "CfnIntegrationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Integration` resource
 *
 * @param properties - the TypeScript properties of a `CfnIntegrationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Integration` resource.
 */
// @ts-ignore TS6133
function cfnIntegrationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIntegrationPropsValidator(properties).assertSuccess();
    return {
        ApiId: cdk.stringToCloudFormation(properties.apiId),
        IntegrationType: cdk.stringToCloudFormation(properties.integrationType),
        ConnectionId: cdk.stringToCloudFormation(properties.connectionId),
        ConnectionType: cdk.stringToCloudFormation(properties.connectionType),
        ContentHandlingStrategy: cdk.stringToCloudFormation(properties.contentHandlingStrategy),
        CredentialsArn: cdk.stringToCloudFormation(properties.credentialsArn),
        Description: cdk.stringToCloudFormation(properties.description),
        IntegrationMethod: cdk.stringToCloudFormation(properties.integrationMethod),
        IntegrationSubtype: cdk.stringToCloudFormation(properties.integrationSubtype),
        IntegrationUri: cdk.stringToCloudFormation(properties.integrationUri),
        PassthroughBehavior: cdk.stringToCloudFormation(properties.passthroughBehavior),
        PayloadFormatVersion: cdk.stringToCloudFormation(properties.payloadFormatVersion),
        RequestParameters: cdk.objectToCloudFormation(properties.requestParameters),
        RequestTemplates: cdk.objectToCloudFormation(properties.requestTemplates),
        ResponseParameters: cdk.objectToCloudFormation(properties.responseParameters),
        TemplateSelectionExpression: cdk.stringToCloudFormation(properties.templateSelectionExpression),
        TimeoutInMillis: cdk.numberToCloudFormation(properties.timeoutInMillis),
        TlsConfig: cfnIntegrationTlsConfigPropertyToCloudFormation(properties.tlsConfig),
    };
}

// @ts-ignore TS6133
function CfnIntegrationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIntegrationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIntegrationProps>();
    ret.addPropertyResult('apiId', 'ApiId', cfn_parse.FromCloudFormation.getString(properties.ApiId));
    ret.addPropertyResult('integrationType', 'IntegrationType', cfn_parse.FromCloudFormation.getString(properties.IntegrationType));
    ret.addPropertyResult('connectionId', 'ConnectionId', properties.ConnectionId != null ? cfn_parse.FromCloudFormation.getString(properties.ConnectionId) : undefined);
    ret.addPropertyResult('connectionType', 'ConnectionType', properties.ConnectionType != null ? cfn_parse.FromCloudFormation.getString(properties.ConnectionType) : undefined);
    ret.addPropertyResult('contentHandlingStrategy', 'ContentHandlingStrategy', properties.ContentHandlingStrategy != null ? cfn_parse.FromCloudFormation.getString(properties.ContentHandlingStrategy) : undefined);
    ret.addPropertyResult('credentialsArn', 'CredentialsArn', properties.CredentialsArn != null ? cfn_parse.FromCloudFormation.getString(properties.CredentialsArn) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('integrationMethod', 'IntegrationMethod', properties.IntegrationMethod != null ? cfn_parse.FromCloudFormation.getString(properties.IntegrationMethod) : undefined);
    ret.addPropertyResult('integrationSubtype', 'IntegrationSubtype', properties.IntegrationSubtype != null ? cfn_parse.FromCloudFormation.getString(properties.IntegrationSubtype) : undefined);
    ret.addPropertyResult('integrationUri', 'IntegrationUri', properties.IntegrationUri != null ? cfn_parse.FromCloudFormation.getString(properties.IntegrationUri) : undefined);
    ret.addPropertyResult('passthroughBehavior', 'PassthroughBehavior', properties.PassthroughBehavior != null ? cfn_parse.FromCloudFormation.getString(properties.PassthroughBehavior) : undefined);
    ret.addPropertyResult('payloadFormatVersion', 'PayloadFormatVersion', properties.PayloadFormatVersion != null ? cfn_parse.FromCloudFormation.getString(properties.PayloadFormatVersion) : undefined);
    ret.addPropertyResult('requestParameters', 'RequestParameters', properties.RequestParameters != null ? cfn_parse.FromCloudFormation.getAny(properties.RequestParameters) : undefined);
    ret.addPropertyResult('requestTemplates', 'RequestTemplates', properties.RequestTemplates != null ? cfn_parse.FromCloudFormation.getAny(properties.RequestTemplates) : undefined);
    ret.addPropertyResult('responseParameters', 'ResponseParameters', properties.ResponseParameters != null ? cfn_parse.FromCloudFormation.getAny(properties.ResponseParameters) : undefined);
    ret.addPropertyResult('templateSelectionExpression', 'TemplateSelectionExpression', properties.TemplateSelectionExpression != null ? cfn_parse.FromCloudFormation.getString(properties.TemplateSelectionExpression) : undefined);
    ret.addPropertyResult('timeoutInMillis', 'TimeoutInMillis', properties.TimeoutInMillis != null ? cfn_parse.FromCloudFormation.getNumber(properties.TimeoutInMillis) : undefined);
    ret.addPropertyResult('tlsConfig', 'TlsConfig', properties.TlsConfig != null ? CfnIntegrationTlsConfigPropertyFromCloudFormation(properties.TlsConfig) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ApiGatewayV2::Integration`
 *
 * The `AWS::ApiGatewayV2::Integration` resource creates an integration for an API.
 *
 * @cloudformationResource AWS::ApiGatewayV2::Integration
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html
 */
export class CfnIntegration extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ApiGatewayV2::Integration";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnIntegration {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnIntegrationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnIntegration(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-apiid
     */
    public apiId: string;

    /**
     * The integration type of an integration. One of the following:
     *
     * `AWS` : for integrating the route or method request with an AWS service action, including the Lambda function-invoking action. With the Lambda function-invoking action, this is referred to as the Lambda custom integration. With any other AWS service action, this is known as AWS integration. Supported only for WebSocket APIs.
     *
     * `AWS_PROXY` : for integrating the route or method request with a Lambda function or other AWS service action. This integration is also referred to as a Lambda proxy integration.
     *
     * `HTTP` : for integrating the route or method request with an HTTP endpoint. This integration is also referred to as the HTTP custom integration. Supported only for WebSocket APIs.
     *
     * `HTTP_PROXY` : for integrating the route or method request with an HTTP endpoint, with the client request passed through as-is. This is also referred to as HTTP proxy integration. For HTTP API private integrations, use an `HTTP_PROXY` integration.
     *
     * `MOCK` : for integrating the route or method request with API Gateway as a "loopback" endpoint without invoking any backend. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-integrationtype
     */
    public integrationType: string;

    /**
     * The ID of the VPC link for a private integration. Supported only for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-connectionid
     */
    public connectionId: string | undefined;

    /**
     * The type of the network connection to the integration endpoint. Specify `INTERNET` for connections through the public routable internet or `VPC_LINK` for private connections between API Gateway and resources in a VPC. The default value is `INTERNET` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-connectiontype
     */
    public connectionType: string | undefined;

    /**
     * Supported only for WebSocket APIs. Specifies how to handle response payload content type conversions. Supported values are `CONVERT_TO_BINARY` and `CONVERT_TO_TEXT` , with the following behaviors:
     *
     * `CONVERT_TO_BINARY` : Converts a response payload from a Base64-encoded string to the corresponding binary blob.
     *
     * `CONVERT_TO_TEXT` : Converts a response payload from a binary blob to a Base64-encoded string.
     *
     * If this property is not defined, the response payload will be passed through from the integration response to the route response or method response without modification.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-contenthandlingstrategy
     */
    public contentHandlingStrategy: string | undefined;

    /**
     * Specifies the credentials required for the integration, if any. For AWS integrations, three options are available. To specify an IAM Role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To require that the caller's identity be passed through from the request, specify the string `arn:aws:iam::*:user/*` . To use resource-based permissions on supported AWS services, don't specify this parameter.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-credentialsarn
     */
    public credentialsArn: string | undefined;

    /**
     * The description of the integration.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-description
     */
    public description: string | undefined;

    /**
     * Specifies the integration's HTTP method type.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-integrationmethod
     */
    public integrationMethod: string | undefined;

    /**
     * Supported only for HTTP API `AWS_PROXY` integrations. Specifies the AWS service action to invoke. To learn more, see [Integration subtype reference](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-aws-services-reference.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-integrationsubtype
     */
    public integrationSubtype: string | undefined;

    /**
     * For a Lambda integration, specify the URI of a Lambda function.
     *
     * For an HTTP integration, specify a fully-qualified URL.
     *
     * For an HTTP API private integration, specify the ARN of an Application Load Balancer listener, Network Load Balancer listener, or AWS Cloud Map service. If you specify the ARN of an AWS Cloud Map service, API Gateway uses `DiscoverInstances` to identify resources. You can use query parameters to target specific resources. To learn more, see [DiscoverInstances](https://docs.aws.amazon.com/cloud-map/latest/api/API_DiscoverInstances.html) . For private integrations, all resources must be owned by the same AWS account .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-integrationuri
     */
    public integrationUri: string | undefined;

    /**
     * Specifies the pass-through behavior for incoming requests based on the `Content-Type` header in the request, and the available mapping templates specified as the `requestTemplates` property on the `Integration` resource. There are three valid values: `WHEN_NO_MATCH` , `WHEN_NO_TEMPLATES` , and `NEVER` . Supported only for WebSocket APIs.
     *
     * `WHEN_NO_MATCH` passes the request body for unmapped content types through to the integration backend without transformation.
     *
     * `NEVER` rejects unmapped content types with an `HTTP 415 Unsupported Media Type` response.
     *
     * `WHEN_NO_TEMPLATES` allows pass-through when the integration has no content types mapped to templates. However, if there is at least one content type defined, unmapped content types will be rejected with the same `HTTP 415 Unsupported Media Type` response.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-passthroughbehavior
     */
    public passthroughBehavior: string | undefined;

    /**
     * Specifies the format of the payload sent to an integration. Required for HTTP APIs. For HTTP APIs, supported values for Lambda proxy integrations are `1.0` and `2.0` . For all other integrations, `1.0` is the only supported value. To learn more, see [Working with AWS Lambda proxy integrations for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-payloadformatversion
     */
    public payloadFormatVersion: string | undefined;

    /**
     * For WebSocket APIs, a key-value map specifying request parameters that are passed from the method request to the backend. The key is an integration request parameter name and the associated value is a method request parameter value or static value that must be enclosed within single quotes and pre-encoded as required by the backend. The method request parameter value must match the pattern of `method.request. {location} . {name}` , where `{location}` is `querystring` , `path` , or `header` ; and `{name}` must be a valid and unique method request parameter name.
     *
     * For HTTP API integrations with a specified `integrationSubtype` , request parameters are a key-value map specifying parameters that are passed to `AWS_PROXY` integrations. You can provide static values, or map request data, stage variables, or context variables that are evaluated at runtime. To learn more, see [Working with AWS service integrations for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-aws-services.html) .
     *
     * For HTTP API integrations without a specified `integrationSubtype` request parameters are a key-value map specifying how to transform HTTP requests before sending them to the backend. The key should follow the pattern <action>:<header|querystring|path>.<location> where action can be `append` , `overwrite` or `remove` . For values, you can provide static values, or map request data, stage variables, or context variables that are evaluated at runtime. To learn more, see [Transforming API requests and responses](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-parameter-mapping.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-requestparameters
     */
    public requestParameters: any | cdk.IResolvable | undefined;

    /**
     * Represents a map of Velocity templates that are applied on the request payload based on the value of the Content-Type header sent by the client. The content type value is the key in this map, and the template (as a String) is the value. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-requesttemplates
     */
    public requestTemplates: any | cdk.IResolvable | undefined;

    /**
     * Supported only for HTTP APIs. You use response parameters to transform the HTTP response from a backend integration before returning the response to clients. Specify a key-value map from a selection key to response parameters. The selection key must be a valid HTTP status code within the range of 200-599. The value is of type [`ResponseParameterList`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-integration-responseparameterlist.html) . To learn more, see [Transforming API requests and responses](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-parameter-mapping.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-responseparameters
     */
    public responseParameters: any | cdk.IResolvable | undefined;

    /**
     * The template selection expression for the integration. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-templateselectionexpression
     */
    public templateSelectionExpression: string | undefined;

    /**
     * Custom timeout between 50 and 29,000 milliseconds for WebSocket APIs and between 50 and 30,000 milliseconds for HTTP APIs. The default timeout is 29 seconds for WebSocket APIs and 30 seconds for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-timeoutinmillis
     */
    public timeoutInMillis: number | undefined;

    /**
     * The TLS configuration for a private integration. If you specify a TLS configuration, private integration traffic uses the HTTPS protocol. Supported only for HTTP APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html#cfn-apigatewayv2-integration-tlsconfig
     */
    public tlsConfig: CfnIntegration.TlsConfigProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::ApiGatewayV2::Integration`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnIntegrationProps) {
        super(scope, id, { type: CfnIntegration.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'apiId', this);
        cdk.requireProperty(props, 'integrationType', this);

        this.apiId = props.apiId;
        this.integrationType = props.integrationType;
        this.connectionId = props.connectionId;
        this.connectionType = props.connectionType;
        this.contentHandlingStrategy = props.contentHandlingStrategy;
        this.credentialsArn = props.credentialsArn;
        this.description = props.description;
        this.integrationMethod = props.integrationMethod;
        this.integrationSubtype = props.integrationSubtype;
        this.integrationUri = props.integrationUri;
        this.passthroughBehavior = props.passthroughBehavior;
        this.payloadFormatVersion = props.payloadFormatVersion;
        this.requestParameters = props.requestParameters;
        this.requestTemplates = props.requestTemplates;
        this.responseParameters = props.responseParameters;
        this.templateSelectionExpression = props.templateSelectionExpression;
        this.timeoutInMillis = props.timeoutInMillis;
        this.tlsConfig = props.tlsConfig;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnIntegration.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            apiId: this.apiId,
            integrationType: this.integrationType,
            connectionId: this.connectionId,
            connectionType: this.connectionType,
            contentHandlingStrategy: this.contentHandlingStrategy,
            credentialsArn: this.credentialsArn,
            description: this.description,
            integrationMethod: this.integrationMethod,
            integrationSubtype: this.integrationSubtype,
            integrationUri: this.integrationUri,
            passthroughBehavior: this.passthroughBehavior,
            payloadFormatVersion: this.payloadFormatVersion,
            requestParameters: this.requestParameters,
            requestTemplates: this.requestTemplates,
            responseParameters: this.responseParameters,
            templateSelectionExpression: this.templateSelectionExpression,
            timeoutInMillis: this.timeoutInMillis,
            tlsConfig: this.tlsConfig,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnIntegrationPropsToCloudFormation(props);
    }
}

export namespace CfnIntegration {
    /**
     * Supported only for HTTP APIs. You use response parameters to transform the HTTP response from a backend integration before returning the response to clients. Specify a key-value map from a selection key to response parameters. The selection key must be a valid HTTP status code within the range of 200-599. Response parameters are a key-value map. The key must match the pattern `<action>:<header>.<location>` or `overwrite.statuscode` . The action can be `append` , `overwrite` or `remove` . The value can be a static value, or map to response data, stage variables, or context variables that are evaluated at runtime. To learn more, see [Transforming API requests and responses](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-parameter-mapping.html) .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-integration-responseparameter.html
     */
    export interface ResponseParameterProperty {
        /**
         * Specifies the location of the response to modify, and how to modify it. To learn more, see [Transforming API requests and responses](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-parameter-mapping.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-integration-responseparameter.html#cfn-apigatewayv2-integration-responseparameter-destination
         */
        readonly destination: string;
        /**
         * Specifies the data to update the parameter with. To learn more, see [Transforming API requests and responses](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-parameter-mapping.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-integration-responseparameter.html#cfn-apigatewayv2-integration-responseparameter-source
         */
        readonly source: string;
    }
}

/**
 * Determine whether the given properties match those of a `ResponseParameterProperty`
 *
 * @param properties - the TypeScript properties of a `ResponseParameterProperty`
 *
 * @returns the result of the validation.
 */
function CfnIntegration_ResponseParameterPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('destination', cdk.requiredValidator)(properties.destination));
    errors.collect(cdk.propertyValidator('destination', cdk.validateString)(properties.destination));
    errors.collect(cdk.propertyValidator('source', cdk.requiredValidator)(properties.source));
    errors.collect(cdk.propertyValidator('source', cdk.validateString)(properties.source));
    return errors.wrap('supplied properties not correct for "ResponseParameterProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Integration.ResponseParameter` resource
 *
 * @param properties - the TypeScript properties of a `ResponseParameterProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Integration.ResponseParameter` resource.
 */
// @ts-ignore TS6133
function cfnIntegrationResponseParameterPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIntegration_ResponseParameterPropertyValidator(properties).assertSuccess();
    return {
        Destination: cdk.stringToCloudFormation(properties.destination),
        Source: cdk.stringToCloudFormation(properties.source),
    };
}

// @ts-ignore TS6133
function CfnIntegrationResponseParameterPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIntegration.ResponseParameterProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIntegration.ResponseParameterProperty>();
    ret.addPropertyResult('destination', 'Destination', cfn_parse.FromCloudFormation.getString(properties.Destination));
    ret.addPropertyResult('source', 'Source', cfn_parse.FromCloudFormation.getString(properties.Source));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnIntegration {
    /**
     * Specifies a list of response parameters for an HTTP API.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-integration-responseparameterlist.html
     */
    export interface ResponseParameterListProperty {
        /**
         * Supported only for HTTP APIs. You use response parameters to transform the HTTP response from a backend integration before returning the response to clients. Specify a key-value map from a selection key to response parameters. The selection key must be a valid HTTP status code within the range of 200-599. Response parameters are a key-value map. The key must match the pattern `<action>:<header>.<location>` or `overwrite.statuscode` . The action can be `append` , `overwrite` or `remove` . The value can be a static value, or map to response data, stage variables, or context variables that are evaluated at runtime. To learn more, see [Transforming API requests and responses](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-parameter-mapping.html) .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-integration-responseparameterlist.html#cfn-apigatewayv2-integration-responseparameterlist-responseparameters
         */
        readonly responseParameters?: Array<CfnIntegration.ResponseParameterProperty | cdk.IResolvable> | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ResponseParameterListProperty`
 *
 * @param properties - the TypeScript properties of a `ResponseParameterListProperty`
 *
 * @returns the result of the validation.
 */
function CfnIntegration_ResponseParameterListPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('responseParameters', cdk.listValidator(CfnIntegration_ResponseParameterPropertyValidator))(properties.responseParameters));
    return errors.wrap('supplied properties not correct for "ResponseParameterListProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Integration.ResponseParameterList` resource
 *
 * @param properties - the TypeScript properties of a `ResponseParameterListProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Integration.ResponseParameterList` resource.
 */
// @ts-ignore TS6133
function cfnIntegrationResponseParameterListPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIntegration_ResponseParameterListPropertyValidator(properties).assertSuccess();
    return {
        ResponseParameters: cdk.listMapper(cfnIntegrationResponseParameterPropertyToCloudFormation)(properties.responseParameters),
    };
}

// @ts-ignore TS6133
function CfnIntegrationResponseParameterListPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIntegration.ResponseParameterListProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIntegration.ResponseParameterListProperty>();
    ret.addPropertyResult('responseParameters', 'ResponseParameters', properties.ResponseParameters != null ? cfn_parse.FromCloudFormation.getArray(CfnIntegrationResponseParameterPropertyFromCloudFormation)(properties.ResponseParameters) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnIntegration {
    /**
     * The `TlsConfig` property specifies the TLS configuration for a private integration. If you specify a TLS configuration, private integration traffic uses the HTTPS protocol. Supported only for HTTP APIs.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-integration-tlsconfig.html
     */
    export interface TlsConfigProperty {
        /**
         * If you specify a server name, API Gateway uses it to verify the hostname on the integration's certificate. The server name is also included in the TLS handshake to support Server Name Indication (SNI) or virtual hosting.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-integration-tlsconfig.html#cfn-apigatewayv2-integration-tlsconfig-servernametoverify
         */
        readonly serverNameToVerify?: string;
    }
}

/**
 * Determine whether the given properties match those of a `TlsConfigProperty`
 *
 * @param properties - the TypeScript properties of a `TlsConfigProperty`
 *
 * @returns the result of the validation.
 */
function CfnIntegration_TlsConfigPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('serverNameToVerify', cdk.validateString)(properties.serverNameToVerify));
    return errors.wrap('supplied properties not correct for "TlsConfigProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Integration.TlsConfig` resource
 *
 * @param properties - the TypeScript properties of a `TlsConfigProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Integration.TlsConfig` resource.
 */
// @ts-ignore TS6133
function cfnIntegrationTlsConfigPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIntegration_TlsConfigPropertyValidator(properties).assertSuccess();
    return {
        ServerNameToVerify: cdk.stringToCloudFormation(properties.serverNameToVerify),
    };
}

// @ts-ignore TS6133
function CfnIntegrationTlsConfigPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIntegration.TlsConfigProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIntegration.TlsConfigProperty>();
    ret.addPropertyResult('serverNameToVerify', 'ServerNameToVerify', properties.ServerNameToVerify != null ? cfn_parse.FromCloudFormation.getString(properties.ServerNameToVerify) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnIntegrationResponse`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html
 */
export interface CfnIntegrationResponseProps {

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html#cfn-apigatewayv2-integrationresponse-apiid
     */
    readonly apiId: string;

    /**
     * The integration ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html#cfn-apigatewayv2-integrationresponse-integrationid
     */
    readonly integrationId: string;

    /**
     * The integration response key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html#cfn-apigatewayv2-integrationresponse-integrationresponsekey
     */
    readonly integrationResponseKey: string;

    /**
     * Supported only for WebSocket APIs. Specifies how to handle response payload content type conversions. Supported values are `CONVERT_TO_BINARY` and `CONVERT_TO_TEXT` , with the following behaviors:
     *
     * `CONVERT_TO_BINARY` : Converts a response payload from a Base64-encoded string to the corresponding binary blob.
     *
     * `CONVERT_TO_TEXT` : Converts a response payload from a binary blob to a Base64-encoded string.
     *
     * If this property is not defined, the response payload will be passed through from the integration response to the route response or method response without modification.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html#cfn-apigatewayv2-integrationresponse-contenthandlingstrategy
     */
    readonly contentHandlingStrategy?: string;

    /**
     * A key-value map specifying response parameters that are passed to the method response from the backend. The key is a method response header parameter name and the mapped value is an integration response header value, a static value enclosed within a pair of single quotes, or a JSON expression from the integration response body. The mapping key must match the pattern of `method.response.header. *{name}*` , where name is a valid and unique header name. The mapped non-static value must match the pattern of `integration.response.header. *{name}*` or `integration.response.body. *{JSON-expression}*` , where `*{name}*` is a valid and unique response header name and `*{JSON-expression}*` is a valid JSON expression without the `$` prefix.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html#cfn-apigatewayv2-integrationresponse-responseparameters
     */
    readonly responseParameters?: any | cdk.IResolvable;

    /**
     * The collection of response templates for the integration response as a string-to-string map of key-value pairs. Response templates are represented as a key/value map, with a content-type as the key and a template as the value.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html#cfn-apigatewayv2-integrationresponse-responsetemplates
     */
    readonly responseTemplates?: any | cdk.IResolvable;

    /**
     * The template selection expression for the integration response. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html#cfn-apigatewayv2-integrationresponse-templateselectionexpression
     */
    readonly templateSelectionExpression?: string;
}

/**
 * Determine whether the given properties match those of a `CfnIntegrationResponseProps`
 *
 * @param properties - the TypeScript properties of a `CfnIntegrationResponseProps`
 *
 * @returns the result of the validation.
 */
function CfnIntegrationResponsePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiId', cdk.requiredValidator)(properties.apiId));
    errors.collect(cdk.propertyValidator('apiId', cdk.validateString)(properties.apiId));
    errors.collect(cdk.propertyValidator('contentHandlingStrategy', cdk.validateString)(properties.contentHandlingStrategy));
    errors.collect(cdk.propertyValidator('integrationId', cdk.requiredValidator)(properties.integrationId));
    errors.collect(cdk.propertyValidator('integrationId', cdk.validateString)(properties.integrationId));
    errors.collect(cdk.propertyValidator('integrationResponseKey', cdk.requiredValidator)(properties.integrationResponseKey));
    errors.collect(cdk.propertyValidator('integrationResponseKey', cdk.validateString)(properties.integrationResponseKey));
    errors.collect(cdk.propertyValidator('responseParameters', cdk.validateObject)(properties.responseParameters));
    errors.collect(cdk.propertyValidator('responseTemplates', cdk.validateObject)(properties.responseTemplates));
    errors.collect(cdk.propertyValidator('templateSelectionExpression', cdk.validateString)(properties.templateSelectionExpression));
    return errors.wrap('supplied properties not correct for "CfnIntegrationResponseProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::IntegrationResponse` resource
 *
 * @param properties - the TypeScript properties of a `CfnIntegrationResponseProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::IntegrationResponse` resource.
 */
// @ts-ignore TS6133
function cfnIntegrationResponsePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnIntegrationResponsePropsValidator(properties).assertSuccess();
    return {
        ApiId: cdk.stringToCloudFormation(properties.apiId),
        IntegrationId: cdk.stringToCloudFormation(properties.integrationId),
        IntegrationResponseKey: cdk.stringToCloudFormation(properties.integrationResponseKey),
        ContentHandlingStrategy: cdk.stringToCloudFormation(properties.contentHandlingStrategy),
        ResponseParameters: cdk.objectToCloudFormation(properties.responseParameters),
        ResponseTemplates: cdk.objectToCloudFormation(properties.responseTemplates),
        TemplateSelectionExpression: cdk.stringToCloudFormation(properties.templateSelectionExpression),
    };
}

// @ts-ignore TS6133
function CfnIntegrationResponsePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnIntegrationResponseProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnIntegrationResponseProps>();
    ret.addPropertyResult('apiId', 'ApiId', cfn_parse.FromCloudFormation.getString(properties.ApiId));
    ret.addPropertyResult('integrationId', 'IntegrationId', cfn_parse.FromCloudFormation.getString(properties.IntegrationId));
    ret.addPropertyResult('integrationResponseKey', 'IntegrationResponseKey', cfn_parse.FromCloudFormation.getString(properties.IntegrationResponseKey));
    ret.addPropertyResult('contentHandlingStrategy', 'ContentHandlingStrategy', properties.ContentHandlingStrategy != null ? cfn_parse.FromCloudFormation.getString(properties.ContentHandlingStrategy) : undefined);
    ret.addPropertyResult('responseParameters', 'ResponseParameters', properties.ResponseParameters != null ? cfn_parse.FromCloudFormation.getAny(properties.ResponseParameters) : undefined);
    ret.addPropertyResult('responseTemplates', 'ResponseTemplates', properties.ResponseTemplates != null ? cfn_parse.FromCloudFormation.getAny(properties.ResponseTemplates) : undefined);
    ret.addPropertyResult('templateSelectionExpression', 'TemplateSelectionExpression', properties.TemplateSelectionExpression != null ? cfn_parse.FromCloudFormation.getString(properties.TemplateSelectionExpression) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ApiGatewayV2::IntegrationResponse`
 *
 * The `AWS::ApiGatewayV2::IntegrationResponse` resource updates an integration response for an WebSocket API. For more information, see [Set up WebSocket API Integration Responses in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-integration-responses.html) in the *API Gateway Developer Guide* .
 *
 * @cloudformationResource AWS::ApiGatewayV2::IntegrationResponse
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html
 */
export class CfnIntegrationResponse extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ApiGatewayV2::IntegrationResponse";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnIntegrationResponse {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnIntegrationResponsePropsFromCloudFormation(resourceProperties);
        const ret = new CfnIntegrationResponse(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html#cfn-apigatewayv2-integrationresponse-apiid
     */
    public apiId: string;

    /**
     * The integration ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html#cfn-apigatewayv2-integrationresponse-integrationid
     */
    public integrationId: string;

    /**
     * The integration response key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html#cfn-apigatewayv2-integrationresponse-integrationresponsekey
     */
    public integrationResponseKey: string;

    /**
     * Supported only for WebSocket APIs. Specifies how to handle response payload content type conversions. Supported values are `CONVERT_TO_BINARY` and `CONVERT_TO_TEXT` , with the following behaviors:
     *
     * `CONVERT_TO_BINARY` : Converts a response payload from a Base64-encoded string to the corresponding binary blob.
     *
     * `CONVERT_TO_TEXT` : Converts a response payload from a binary blob to a Base64-encoded string.
     *
     * If this property is not defined, the response payload will be passed through from the integration response to the route response or method response without modification.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html#cfn-apigatewayv2-integrationresponse-contenthandlingstrategy
     */
    public contentHandlingStrategy: string | undefined;

    /**
     * A key-value map specifying response parameters that are passed to the method response from the backend. The key is a method response header parameter name and the mapped value is an integration response header value, a static value enclosed within a pair of single quotes, or a JSON expression from the integration response body. The mapping key must match the pattern of `method.response.header. *{name}*` , where name is a valid and unique header name. The mapped non-static value must match the pattern of `integration.response.header. *{name}*` or `integration.response.body. *{JSON-expression}*` , where `*{name}*` is a valid and unique response header name and `*{JSON-expression}*` is a valid JSON expression without the `$` prefix.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html#cfn-apigatewayv2-integrationresponse-responseparameters
     */
    public responseParameters: any | cdk.IResolvable | undefined;

    /**
     * The collection of response templates for the integration response as a string-to-string map of key-value pairs. Response templates are represented as a key/value map, with a content-type as the key and a template as the value.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html#cfn-apigatewayv2-integrationresponse-responsetemplates
     */
    public responseTemplates: any | cdk.IResolvable | undefined;

    /**
     * The template selection expression for the integration response. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integrationresponse.html#cfn-apigatewayv2-integrationresponse-templateselectionexpression
     */
    public templateSelectionExpression: string | undefined;

    /**
     * Create a new `AWS::ApiGatewayV2::IntegrationResponse`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnIntegrationResponseProps) {
        super(scope, id, { type: CfnIntegrationResponse.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'apiId', this);
        cdk.requireProperty(props, 'integrationId', this);
        cdk.requireProperty(props, 'integrationResponseKey', this);

        this.apiId = props.apiId;
        this.integrationId = props.integrationId;
        this.integrationResponseKey = props.integrationResponseKey;
        this.contentHandlingStrategy = props.contentHandlingStrategy;
        this.responseParameters = props.responseParameters;
        this.responseTemplates = props.responseTemplates;
        this.templateSelectionExpression = props.templateSelectionExpression;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnIntegrationResponse.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            apiId: this.apiId,
            integrationId: this.integrationId,
            integrationResponseKey: this.integrationResponseKey,
            contentHandlingStrategy: this.contentHandlingStrategy,
            responseParameters: this.responseParameters,
            responseTemplates: this.responseTemplates,
            templateSelectionExpression: this.templateSelectionExpression,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnIntegrationResponsePropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnModel`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-model.html
 */
export interface CfnModelProps {

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-model.html#cfn-apigatewayv2-model-apiid
     */
    readonly apiId: string;

    /**
     * The name of the model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-model.html#cfn-apigatewayv2-model-name
     */
    readonly name: string;

    /**
     * The schema for the model. For application/json models, this should be JSON schema draft 4 model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-model.html#cfn-apigatewayv2-model-schema
     */
    readonly schema: any | cdk.IResolvable;

    /**
     * The content-type for the model, for example, "application/json".
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-model.html#cfn-apigatewayv2-model-contenttype
     */
    readonly contentType?: string;

    /**
     * The description of the model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-model.html#cfn-apigatewayv2-model-description
     */
    readonly description?: string;
}

/**
 * Determine whether the given properties match those of a `CfnModelProps`
 *
 * @param properties - the TypeScript properties of a `CfnModelProps`
 *
 * @returns the result of the validation.
 */
function CfnModelPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiId', cdk.requiredValidator)(properties.apiId));
    errors.collect(cdk.propertyValidator('apiId', cdk.validateString)(properties.apiId));
    errors.collect(cdk.propertyValidator('contentType', cdk.validateString)(properties.contentType));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('schema', cdk.requiredValidator)(properties.schema));
    errors.collect(cdk.propertyValidator('schema', cdk.validateObject)(properties.schema));
    return errors.wrap('supplied properties not correct for "CfnModelProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Model` resource
 *
 * @param properties - the TypeScript properties of a `CfnModelProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Model` resource.
 */
// @ts-ignore TS6133
function cfnModelPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnModelPropsValidator(properties).assertSuccess();
    return {
        ApiId: cdk.stringToCloudFormation(properties.apiId),
        Name: cdk.stringToCloudFormation(properties.name),
        Schema: cdk.objectToCloudFormation(properties.schema),
        ContentType: cdk.stringToCloudFormation(properties.contentType),
        Description: cdk.stringToCloudFormation(properties.description),
    };
}

// @ts-ignore TS6133
function CfnModelPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnModelProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnModelProps>();
    ret.addPropertyResult('apiId', 'ApiId', cfn_parse.FromCloudFormation.getString(properties.ApiId));
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('schema', 'Schema', cfn_parse.FromCloudFormation.getAny(properties.Schema));
    ret.addPropertyResult('contentType', 'ContentType', properties.ContentType != null ? cfn_parse.FromCloudFormation.getString(properties.ContentType) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ApiGatewayV2::Model`
 *
 * The `AWS::ApiGatewayV2::Model` resource updates data model for a WebSocket API. For more information, see [Model Selection Expressions](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-selection-expressions.html#apigateway-websocket-api-model-selection-expressions) in the *API Gateway Developer Guide* .
 *
 * @cloudformationResource AWS::ApiGatewayV2::Model
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-model.html
 */
export class CfnModel extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ApiGatewayV2::Model";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnModel {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnModelPropsFromCloudFormation(resourceProperties);
        const ret = new CfnModel(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-model.html#cfn-apigatewayv2-model-apiid
     */
    public apiId: string;

    /**
     * The name of the model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-model.html#cfn-apigatewayv2-model-name
     */
    public name: string;

    /**
     * The schema for the model. For application/json models, this should be JSON schema draft 4 model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-model.html#cfn-apigatewayv2-model-schema
     */
    public schema: any | cdk.IResolvable;

    /**
     * The content-type for the model, for example, "application/json".
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-model.html#cfn-apigatewayv2-model-contenttype
     */
    public contentType: string | undefined;

    /**
     * The description of the model.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-model.html#cfn-apigatewayv2-model-description
     */
    public description: string | undefined;

    /**
     * Create a new `AWS::ApiGatewayV2::Model`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnModelProps) {
        super(scope, id, { type: CfnModel.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'apiId', this);
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'schema', this);

        this.apiId = props.apiId;
        this.name = props.name;
        this.schema = props.schema;
        this.contentType = props.contentType;
        this.description = props.description;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnModel.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            apiId: this.apiId,
            name: this.name,
            schema: this.schema,
            contentType: this.contentType,
            description: this.description,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnModelPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnRoute`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html
 */
export interface CfnRouteProps {

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-apiid
     */
    readonly apiId: string;

    /**
     * The route key for the route. For HTTP APIs, the route key can be either `$default` , or a combination of an HTTP method and resource path, for example, `GET /pets` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-routekey
     */
    readonly routeKey: string;

    /**
     * Specifies whether an API key is required for the route. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-apikeyrequired
     */
    readonly apiKeyRequired?: boolean | cdk.IResolvable;

    /**
     * The authorization scopes supported by this route.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-authorizationscopes
     */
    readonly authorizationScopes?: string[];

    /**
     * The authorization type for the route. For WebSocket APIs, valid values are `NONE` for open access, `AWS_IAM` for using AWS IAM permissions, and `CUSTOM` for using a Lambda authorizer. For HTTP APIs, valid values are `NONE` for open access, `JWT` for using JSON Web Tokens, `AWS_IAM` for using AWS IAM permissions, and `CUSTOM` for using a Lambda authorizer.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-authorizationtype
     */
    readonly authorizationType?: string;

    /**
     * The identifier of the `Authorizer` resource to be associated with this route. The authorizer identifier is generated by API Gateway when you created the authorizer.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-authorizerid
     */
    readonly authorizerId?: string;

    /**
     * The model selection expression for the route. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-modelselectionexpression
     */
    readonly modelSelectionExpression?: string;

    /**
     * The operation name for the route.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-operationname
     */
    readonly operationName?: string;

    /**
     * The request models for the route. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-requestmodels
     */
    readonly requestModels?: any | cdk.IResolvable;

    /**
     * The request parameters for the route. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-requestparameters
     */
    readonly requestParameters?: any | cdk.IResolvable;

    /**
     * The route response selection expression for the route. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-routeresponseselectionexpression
     */
    readonly routeResponseSelectionExpression?: string;

    /**
     * The target for the route.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-target
     */
    readonly target?: string;
}

/**
 * Determine whether the given properties match those of a `CfnRouteProps`
 *
 * @param properties - the TypeScript properties of a `CfnRouteProps`
 *
 * @returns the result of the validation.
 */
function CfnRoutePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiId', cdk.requiredValidator)(properties.apiId));
    errors.collect(cdk.propertyValidator('apiId', cdk.validateString)(properties.apiId));
    errors.collect(cdk.propertyValidator('apiKeyRequired', cdk.validateBoolean)(properties.apiKeyRequired));
    errors.collect(cdk.propertyValidator('authorizationScopes', cdk.listValidator(cdk.validateString))(properties.authorizationScopes));
    errors.collect(cdk.propertyValidator('authorizationType', cdk.validateString)(properties.authorizationType));
    errors.collect(cdk.propertyValidator('authorizerId', cdk.validateString)(properties.authorizerId));
    errors.collect(cdk.propertyValidator('modelSelectionExpression', cdk.validateString)(properties.modelSelectionExpression));
    errors.collect(cdk.propertyValidator('operationName', cdk.validateString)(properties.operationName));
    errors.collect(cdk.propertyValidator('requestModels', cdk.validateObject)(properties.requestModels));
    errors.collect(cdk.propertyValidator('requestParameters', cdk.validateObject)(properties.requestParameters));
    errors.collect(cdk.propertyValidator('routeKey', cdk.requiredValidator)(properties.routeKey));
    errors.collect(cdk.propertyValidator('routeKey', cdk.validateString)(properties.routeKey));
    errors.collect(cdk.propertyValidator('routeResponseSelectionExpression', cdk.validateString)(properties.routeResponseSelectionExpression));
    errors.collect(cdk.propertyValidator('target', cdk.validateString)(properties.target));
    return errors.wrap('supplied properties not correct for "CfnRouteProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Route` resource
 *
 * @param properties - the TypeScript properties of a `CfnRouteProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Route` resource.
 */
// @ts-ignore TS6133
function cfnRoutePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRoutePropsValidator(properties).assertSuccess();
    return {
        ApiId: cdk.stringToCloudFormation(properties.apiId),
        RouteKey: cdk.stringToCloudFormation(properties.routeKey),
        ApiKeyRequired: cdk.booleanToCloudFormation(properties.apiKeyRequired),
        AuthorizationScopes: cdk.listMapper(cdk.stringToCloudFormation)(properties.authorizationScopes),
        AuthorizationType: cdk.stringToCloudFormation(properties.authorizationType),
        AuthorizerId: cdk.stringToCloudFormation(properties.authorizerId),
        ModelSelectionExpression: cdk.stringToCloudFormation(properties.modelSelectionExpression),
        OperationName: cdk.stringToCloudFormation(properties.operationName),
        RequestModels: cdk.objectToCloudFormation(properties.requestModels),
        RequestParameters: cdk.objectToCloudFormation(properties.requestParameters),
        RouteResponseSelectionExpression: cdk.stringToCloudFormation(properties.routeResponseSelectionExpression),
        Target: cdk.stringToCloudFormation(properties.target),
    };
}

// @ts-ignore TS6133
function CfnRoutePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRouteProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRouteProps>();
    ret.addPropertyResult('apiId', 'ApiId', cfn_parse.FromCloudFormation.getString(properties.ApiId));
    ret.addPropertyResult('routeKey', 'RouteKey', cfn_parse.FromCloudFormation.getString(properties.RouteKey));
    ret.addPropertyResult('apiKeyRequired', 'ApiKeyRequired', properties.ApiKeyRequired != null ? cfn_parse.FromCloudFormation.getBoolean(properties.ApiKeyRequired) : undefined);
    ret.addPropertyResult('authorizationScopes', 'AuthorizationScopes', properties.AuthorizationScopes != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AuthorizationScopes) : undefined);
    ret.addPropertyResult('authorizationType', 'AuthorizationType', properties.AuthorizationType != null ? cfn_parse.FromCloudFormation.getString(properties.AuthorizationType) : undefined);
    ret.addPropertyResult('authorizerId', 'AuthorizerId', properties.AuthorizerId != null ? cfn_parse.FromCloudFormation.getString(properties.AuthorizerId) : undefined);
    ret.addPropertyResult('modelSelectionExpression', 'ModelSelectionExpression', properties.ModelSelectionExpression != null ? cfn_parse.FromCloudFormation.getString(properties.ModelSelectionExpression) : undefined);
    ret.addPropertyResult('operationName', 'OperationName', properties.OperationName != null ? cfn_parse.FromCloudFormation.getString(properties.OperationName) : undefined);
    ret.addPropertyResult('requestModels', 'RequestModels', properties.RequestModels != null ? cfn_parse.FromCloudFormation.getAny(properties.RequestModels) : undefined);
    ret.addPropertyResult('requestParameters', 'RequestParameters', properties.RequestParameters != null ? cfn_parse.FromCloudFormation.getAny(properties.RequestParameters) : undefined);
    ret.addPropertyResult('routeResponseSelectionExpression', 'RouteResponseSelectionExpression', properties.RouteResponseSelectionExpression != null ? cfn_parse.FromCloudFormation.getString(properties.RouteResponseSelectionExpression) : undefined);
    ret.addPropertyResult('target', 'Target', properties.Target != null ? cfn_parse.FromCloudFormation.getString(properties.Target) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ApiGatewayV2::Route`
 *
 * The `AWS::ApiGatewayV2::Route` resource creates a route for an API.
 *
 * @cloudformationResource AWS::ApiGatewayV2::Route
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html
 */
export class CfnRoute extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ApiGatewayV2::Route";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnRoute {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnRoutePropsFromCloudFormation(resourceProperties);
        const ret = new CfnRoute(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-apiid
     */
    public apiId: string;

    /**
     * The route key for the route. For HTTP APIs, the route key can be either `$default` , or a combination of an HTTP method and resource path, for example, `GET /pets` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-routekey
     */
    public routeKey: string;

    /**
     * Specifies whether an API key is required for the route. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-apikeyrequired
     */
    public apiKeyRequired: boolean | cdk.IResolvable | undefined;

    /**
     * The authorization scopes supported by this route.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-authorizationscopes
     */
    public authorizationScopes: string[] | undefined;

    /**
     * The authorization type for the route. For WebSocket APIs, valid values are `NONE` for open access, `AWS_IAM` for using AWS IAM permissions, and `CUSTOM` for using a Lambda authorizer. For HTTP APIs, valid values are `NONE` for open access, `JWT` for using JSON Web Tokens, `AWS_IAM` for using AWS IAM permissions, and `CUSTOM` for using a Lambda authorizer.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-authorizationtype
     */
    public authorizationType: string | undefined;

    /**
     * The identifier of the `Authorizer` resource to be associated with this route. The authorizer identifier is generated by API Gateway when you created the authorizer.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-authorizerid
     */
    public authorizerId: string | undefined;

    /**
     * The model selection expression for the route. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-modelselectionexpression
     */
    public modelSelectionExpression: string | undefined;

    /**
     * The operation name for the route.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-operationname
     */
    public operationName: string | undefined;

    /**
     * The request models for the route. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-requestmodels
     */
    public requestModels: any | cdk.IResolvable | undefined;

    /**
     * The request parameters for the route. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-requestparameters
     */
    public requestParameters: any | cdk.IResolvable | undefined;

    /**
     * The route response selection expression for the route. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-routeresponseselectionexpression
     */
    public routeResponseSelectionExpression: string | undefined;

    /**
     * The target for the route.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-route.html#cfn-apigatewayv2-route-target
     */
    public target: string | undefined;

    /**
     * Create a new `AWS::ApiGatewayV2::Route`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnRouteProps) {
        super(scope, id, { type: CfnRoute.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'apiId', this);
        cdk.requireProperty(props, 'routeKey', this);

        this.apiId = props.apiId;
        this.routeKey = props.routeKey;
        this.apiKeyRequired = props.apiKeyRequired;
        this.authorizationScopes = props.authorizationScopes;
        this.authorizationType = props.authorizationType;
        this.authorizerId = props.authorizerId;
        this.modelSelectionExpression = props.modelSelectionExpression;
        this.operationName = props.operationName;
        this.requestModels = props.requestModels;
        this.requestParameters = props.requestParameters;
        this.routeResponseSelectionExpression = props.routeResponseSelectionExpression;
        this.target = props.target;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnRoute.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            apiId: this.apiId,
            routeKey: this.routeKey,
            apiKeyRequired: this.apiKeyRequired,
            authorizationScopes: this.authorizationScopes,
            authorizationType: this.authorizationType,
            authorizerId: this.authorizerId,
            modelSelectionExpression: this.modelSelectionExpression,
            operationName: this.operationName,
            requestModels: this.requestModels,
            requestParameters: this.requestParameters,
            routeResponseSelectionExpression: this.routeResponseSelectionExpression,
            target: this.target,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnRoutePropsToCloudFormation(props);
    }
}

export namespace CfnRoute {
    /**
     * Specifies whether the parameter is required.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-route-parameterconstraints.html
     */
    export interface ParameterConstraintsProperty {
        /**
         * Specifies whether the parameter is required.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-route-parameterconstraints.html#cfn-apigatewayv2-route-parameterconstraints-required
         */
        readonly required: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ParameterConstraintsProperty`
 *
 * @param properties - the TypeScript properties of a `ParameterConstraintsProperty`
 *
 * @returns the result of the validation.
 */
function CfnRoute_ParameterConstraintsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('required', cdk.requiredValidator)(properties.required));
    errors.collect(cdk.propertyValidator('required', cdk.validateBoolean)(properties.required));
    return errors.wrap('supplied properties not correct for "ParameterConstraintsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Route.ParameterConstraints` resource
 *
 * @param properties - the TypeScript properties of a `ParameterConstraintsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Route.ParameterConstraints` resource.
 */
// @ts-ignore TS6133
function cfnRouteParameterConstraintsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRoute_ParameterConstraintsPropertyValidator(properties).assertSuccess();
    return {
        Required: cdk.booleanToCloudFormation(properties.required),
    };
}

// @ts-ignore TS6133
function CfnRouteParameterConstraintsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRoute.ParameterConstraintsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRoute.ParameterConstraintsProperty>();
    ret.addPropertyResult('required', 'Required', cfn_parse.FromCloudFormation.getBoolean(properties.Required));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnRouteResponse`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-routeresponse.html
 */
export interface CfnRouteResponseProps {

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-routeresponse.html#cfn-apigatewayv2-routeresponse-apiid
     */
    readonly apiId: string;

    /**
     * The route ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-routeresponse.html#cfn-apigatewayv2-routeresponse-routeid
     */
    readonly routeId: string;

    /**
     * The route response key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-routeresponse.html#cfn-apigatewayv2-routeresponse-routeresponsekey
     */
    readonly routeResponseKey: string;

    /**
     * The model selection expression for the route response. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-routeresponse.html#cfn-apigatewayv2-routeresponse-modelselectionexpression
     */
    readonly modelSelectionExpression?: string;

    /**
     * The response models for the route response.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-routeresponse.html#cfn-apigatewayv2-routeresponse-responsemodels
     */
    readonly responseModels?: any | cdk.IResolvable;

    /**
     * The route response parameters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-routeresponse.html#cfn-apigatewayv2-routeresponse-responseparameters
     */
    readonly responseParameters?: any | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnRouteResponseProps`
 *
 * @param properties - the TypeScript properties of a `CfnRouteResponseProps`
 *
 * @returns the result of the validation.
 */
function CfnRouteResponsePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('apiId', cdk.requiredValidator)(properties.apiId));
    errors.collect(cdk.propertyValidator('apiId', cdk.validateString)(properties.apiId));
    errors.collect(cdk.propertyValidator('modelSelectionExpression', cdk.validateString)(properties.modelSelectionExpression));
    errors.collect(cdk.propertyValidator('responseModels', cdk.validateObject)(properties.responseModels));
    errors.collect(cdk.propertyValidator('responseParameters', cdk.validateObject)(properties.responseParameters));
    errors.collect(cdk.propertyValidator('routeId', cdk.requiredValidator)(properties.routeId));
    errors.collect(cdk.propertyValidator('routeId', cdk.validateString)(properties.routeId));
    errors.collect(cdk.propertyValidator('routeResponseKey', cdk.requiredValidator)(properties.routeResponseKey));
    errors.collect(cdk.propertyValidator('routeResponseKey', cdk.validateString)(properties.routeResponseKey));
    return errors.wrap('supplied properties not correct for "CfnRouteResponseProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::RouteResponse` resource
 *
 * @param properties - the TypeScript properties of a `CfnRouteResponseProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::RouteResponse` resource.
 */
// @ts-ignore TS6133
function cfnRouteResponsePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRouteResponsePropsValidator(properties).assertSuccess();
    return {
        ApiId: cdk.stringToCloudFormation(properties.apiId),
        RouteId: cdk.stringToCloudFormation(properties.routeId),
        RouteResponseKey: cdk.stringToCloudFormation(properties.routeResponseKey),
        ModelSelectionExpression: cdk.stringToCloudFormation(properties.modelSelectionExpression),
        ResponseModels: cdk.objectToCloudFormation(properties.responseModels),
        ResponseParameters: cdk.objectToCloudFormation(properties.responseParameters),
    };
}

// @ts-ignore TS6133
function CfnRouteResponsePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRouteResponseProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRouteResponseProps>();
    ret.addPropertyResult('apiId', 'ApiId', cfn_parse.FromCloudFormation.getString(properties.ApiId));
    ret.addPropertyResult('routeId', 'RouteId', cfn_parse.FromCloudFormation.getString(properties.RouteId));
    ret.addPropertyResult('routeResponseKey', 'RouteResponseKey', cfn_parse.FromCloudFormation.getString(properties.RouteResponseKey));
    ret.addPropertyResult('modelSelectionExpression', 'ModelSelectionExpression', properties.ModelSelectionExpression != null ? cfn_parse.FromCloudFormation.getString(properties.ModelSelectionExpression) : undefined);
    ret.addPropertyResult('responseModels', 'ResponseModels', properties.ResponseModels != null ? cfn_parse.FromCloudFormation.getAny(properties.ResponseModels) : undefined);
    ret.addPropertyResult('responseParameters', 'ResponseParameters', properties.ResponseParameters != null ? cfn_parse.FromCloudFormation.getAny(properties.ResponseParameters) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ApiGatewayV2::RouteResponse`
 *
 * The `AWS::ApiGatewayV2::RouteResponse` resource creates a route response for a WebSocket API. For more information, see [Set up Route Responses for a WebSocket API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-route-response.html) in the *API Gateway Developer Guide* .
 *
 * @cloudformationResource AWS::ApiGatewayV2::RouteResponse
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-routeresponse.html
 */
export class CfnRouteResponse extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ApiGatewayV2::RouteResponse";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnRouteResponse {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnRouteResponsePropsFromCloudFormation(resourceProperties);
        const ret = new CfnRouteResponse(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-routeresponse.html#cfn-apigatewayv2-routeresponse-apiid
     */
    public apiId: string;

    /**
     * The route ID.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-routeresponse.html#cfn-apigatewayv2-routeresponse-routeid
     */
    public routeId: string;

    /**
     * The route response key.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-routeresponse.html#cfn-apigatewayv2-routeresponse-routeresponsekey
     */
    public routeResponseKey: string;

    /**
     * The model selection expression for the route response. Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-routeresponse.html#cfn-apigatewayv2-routeresponse-modelselectionexpression
     */
    public modelSelectionExpression: string | undefined;

    /**
     * The response models for the route response.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-routeresponse.html#cfn-apigatewayv2-routeresponse-responsemodels
     */
    public responseModels: any | cdk.IResolvable | undefined;

    /**
     * The route response parameters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-routeresponse.html#cfn-apigatewayv2-routeresponse-responseparameters
     */
    public responseParameters: any | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::ApiGatewayV2::RouteResponse`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnRouteResponseProps) {
        super(scope, id, { type: CfnRouteResponse.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'apiId', this);
        cdk.requireProperty(props, 'routeId', this);
        cdk.requireProperty(props, 'routeResponseKey', this);

        this.apiId = props.apiId;
        this.routeId = props.routeId;
        this.routeResponseKey = props.routeResponseKey;
        this.modelSelectionExpression = props.modelSelectionExpression;
        this.responseModels = props.responseModels;
        this.responseParameters = props.responseParameters;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnRouteResponse.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            apiId: this.apiId,
            routeId: this.routeId,
            routeResponseKey: this.routeResponseKey,
            modelSelectionExpression: this.modelSelectionExpression,
            responseModels: this.responseModels,
            responseParameters: this.responseParameters,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnRouteResponsePropsToCloudFormation(props);
    }
}

export namespace CfnRouteResponse {
    /**
     * Specifies whether the parameter is required.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-routeresponse-parameterconstraints.html
     */
    export interface ParameterConstraintsProperty {
        /**
         * Specifies whether the parameter is required.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-routeresponse-parameterconstraints.html#cfn-apigatewayv2-routeresponse-parameterconstraints-required
         */
        readonly required: boolean | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ParameterConstraintsProperty`
 *
 * @param properties - the TypeScript properties of a `ParameterConstraintsProperty`
 *
 * @returns the result of the validation.
 */
function CfnRouteResponse_ParameterConstraintsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('required', cdk.requiredValidator)(properties.required));
    errors.collect(cdk.propertyValidator('required', cdk.validateBoolean)(properties.required));
    return errors.wrap('supplied properties not correct for "ParameterConstraintsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::RouteResponse.ParameterConstraints` resource
 *
 * @param properties - the TypeScript properties of a `ParameterConstraintsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::RouteResponse.ParameterConstraints` resource.
 */
// @ts-ignore TS6133
function cfnRouteResponseParameterConstraintsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnRouteResponse_ParameterConstraintsPropertyValidator(properties).assertSuccess();
    return {
        Required: cdk.booleanToCloudFormation(properties.required),
    };
}

// @ts-ignore TS6133
function CfnRouteResponseParameterConstraintsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnRouteResponse.ParameterConstraintsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnRouteResponse.ParameterConstraintsProperty>();
    ret.addPropertyResult('required', 'Required', cfn_parse.FromCloudFormation.getBoolean(properties.Required));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnStage`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html
 */
export interface CfnStageProps {

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-apiid
     */
    readonly apiId: string;

    /**
     * The stage name. Stage names can contain only alphanumeric characters, hyphens, and underscores, or be `$default` . Maximum length is 128 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-stagename
     */
    readonly stageName: string;

    /**
     * Settings for logging access in this stage.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-accesslogsettings
     */
    readonly accessLogSettings?: CfnStage.AccessLogSettingsProperty | cdk.IResolvable;

    /**
     * This parameter is not currently supported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-accesspolicyid
     */
    readonly accessPolicyId?: string;

    /**
     * Specifies whether updates to an API automatically trigger a new deployment. The default value is `false` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-autodeploy
     */
    readonly autoDeploy?: boolean | cdk.IResolvable;

    /**
     * The identifier of a client certificate for a `Stage` . Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-clientcertificateid
     */
    readonly clientCertificateId?: string;

    /**
     * The default route settings for the stage.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-defaultroutesettings
     */
    readonly defaultRouteSettings?: CfnStage.RouteSettingsProperty | cdk.IResolvable;

    /**
     * The deployment identifier for the API stage. Can't be updated if `autoDeploy` is enabled.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-deploymentid
     */
    readonly deploymentId?: string;

    /**
     * The description for the API stage.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-description
     */
    readonly description?: string;

    /**
     * Route settings for the stage.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-routesettings
     */
    readonly routeSettings?: any | cdk.IResolvable;

    /**
     * A map that defines the stage variables for a `Stage` . Variable names can have alphanumeric and underscore characters, and the values must match [A-Za-z0-9-._~:/?#&=,]+.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-stagevariables
     */
    readonly stageVariables?: any | cdk.IResolvable;

    /**
     * The collection of tags. Each tag element is associated with a given resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-tags
     */
    readonly tags?: any;
}

/**
 * Determine whether the given properties match those of a `CfnStageProps`
 *
 * @param properties - the TypeScript properties of a `CfnStageProps`
 *
 * @returns the result of the validation.
 */
function CfnStagePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('accessLogSettings', CfnStage_AccessLogSettingsPropertyValidator)(properties.accessLogSettings));
    errors.collect(cdk.propertyValidator('accessPolicyId', cdk.validateString)(properties.accessPolicyId));
    errors.collect(cdk.propertyValidator('apiId', cdk.requiredValidator)(properties.apiId));
    errors.collect(cdk.propertyValidator('apiId', cdk.validateString)(properties.apiId));
    errors.collect(cdk.propertyValidator('autoDeploy', cdk.validateBoolean)(properties.autoDeploy));
    errors.collect(cdk.propertyValidator('clientCertificateId', cdk.validateString)(properties.clientCertificateId));
    errors.collect(cdk.propertyValidator('defaultRouteSettings', CfnStage_RouteSettingsPropertyValidator)(properties.defaultRouteSettings));
    errors.collect(cdk.propertyValidator('deploymentId', cdk.validateString)(properties.deploymentId));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('routeSettings', cdk.validateObject)(properties.routeSettings));
    errors.collect(cdk.propertyValidator('stageName', cdk.requiredValidator)(properties.stageName));
    errors.collect(cdk.propertyValidator('stageName', cdk.validateString)(properties.stageName));
    errors.collect(cdk.propertyValidator('stageVariables', cdk.validateObject)(properties.stageVariables));
    errors.collect(cdk.propertyValidator('tags', cdk.validateObject)(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnStageProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Stage` resource
 *
 * @param properties - the TypeScript properties of a `CfnStageProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Stage` resource.
 */
// @ts-ignore TS6133
function cfnStagePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnStagePropsValidator(properties).assertSuccess();
    return {
        ApiId: cdk.stringToCloudFormation(properties.apiId),
        StageName: cdk.stringToCloudFormation(properties.stageName),
        AccessLogSettings: cfnStageAccessLogSettingsPropertyToCloudFormation(properties.accessLogSettings),
        AccessPolicyId: cdk.stringToCloudFormation(properties.accessPolicyId),
        AutoDeploy: cdk.booleanToCloudFormation(properties.autoDeploy),
        ClientCertificateId: cdk.stringToCloudFormation(properties.clientCertificateId),
        DefaultRouteSettings: cfnStageRouteSettingsPropertyToCloudFormation(properties.defaultRouteSettings),
        DeploymentId: cdk.stringToCloudFormation(properties.deploymentId),
        Description: cdk.stringToCloudFormation(properties.description),
        RouteSettings: cdk.objectToCloudFormation(properties.routeSettings),
        StageVariables: cdk.objectToCloudFormation(properties.stageVariables),
        Tags: cdk.objectToCloudFormation(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnStagePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnStageProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnStageProps>();
    ret.addPropertyResult('apiId', 'ApiId', cfn_parse.FromCloudFormation.getString(properties.ApiId));
    ret.addPropertyResult('stageName', 'StageName', cfn_parse.FromCloudFormation.getString(properties.StageName));
    ret.addPropertyResult('accessLogSettings', 'AccessLogSettings', properties.AccessLogSettings != null ? CfnStageAccessLogSettingsPropertyFromCloudFormation(properties.AccessLogSettings) : undefined);
    ret.addPropertyResult('accessPolicyId', 'AccessPolicyId', properties.AccessPolicyId != null ? cfn_parse.FromCloudFormation.getString(properties.AccessPolicyId) : undefined);
    ret.addPropertyResult('autoDeploy', 'AutoDeploy', properties.AutoDeploy != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AutoDeploy) : undefined);
    ret.addPropertyResult('clientCertificateId', 'ClientCertificateId', properties.ClientCertificateId != null ? cfn_parse.FromCloudFormation.getString(properties.ClientCertificateId) : undefined);
    ret.addPropertyResult('defaultRouteSettings', 'DefaultRouteSettings', properties.DefaultRouteSettings != null ? CfnStageRouteSettingsPropertyFromCloudFormation(properties.DefaultRouteSettings) : undefined);
    ret.addPropertyResult('deploymentId', 'DeploymentId', properties.DeploymentId != null ? cfn_parse.FromCloudFormation.getString(properties.DeploymentId) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('routeSettings', 'RouteSettings', properties.RouteSettings != null ? cfn_parse.FromCloudFormation.getAny(properties.RouteSettings) : undefined);
    ret.addPropertyResult('stageVariables', 'StageVariables', properties.StageVariables != null ? cfn_parse.FromCloudFormation.getAny(properties.StageVariables) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getAny(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ApiGatewayV2::Stage`
 *
 * The `AWS::ApiGatewayV2::Stage` resource specifies a stage for an API. Each stage is a named reference to a deployment of the API and is made available for client applications to call. To learn more, see [Working with stages for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-stages.html) and [Deploy a WebSocket API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-set-up-websocket-deployment.html) .
 *
 * @cloudformationResource AWS::ApiGatewayV2::Stage
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html
 */
export class CfnStage extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ApiGatewayV2::Stage";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnStage {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnStagePropsFromCloudFormation(resourceProperties);
        const ret = new CfnStage(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The API identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-apiid
     */
    public apiId: string;

    /**
     * The stage name. Stage names can contain only alphanumeric characters, hyphens, and underscores, or be `$default` . Maximum length is 128 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-stagename
     */
    public stageName: string;

    /**
     * Settings for logging access in this stage.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-accesslogsettings
     */
    public accessLogSettings: CfnStage.AccessLogSettingsProperty | cdk.IResolvable | undefined;

    /**
     * This parameter is not currently supported.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-accesspolicyid
     */
    public accessPolicyId: string | undefined;

    /**
     * Specifies whether updates to an API automatically trigger a new deployment. The default value is `false` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-autodeploy
     */
    public autoDeploy: boolean | cdk.IResolvable | undefined;

    /**
     * The identifier of a client certificate for a `Stage` . Supported only for WebSocket APIs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-clientcertificateid
     */
    public clientCertificateId: string | undefined;

    /**
     * The default route settings for the stage.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-defaultroutesettings
     */
    public defaultRouteSettings: CfnStage.RouteSettingsProperty | cdk.IResolvable | undefined;

    /**
     * The deployment identifier for the API stage. Can't be updated if `autoDeploy` is enabled.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-deploymentid
     */
    public deploymentId: string | undefined;

    /**
     * The description for the API stage.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-description
     */
    public description: string | undefined;

    /**
     * Route settings for the stage.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-routesettings
     */
    public routeSettings: any | cdk.IResolvable | undefined;

    /**
     * A map that defines the stage variables for a `Stage` . Variable names can have alphanumeric and underscore characters, and the values must match [A-Za-z0-9-._~:/?#&=,]+.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-stagevariables
     */
    public stageVariables: any | cdk.IResolvable | undefined;

    /**
     * The collection of tags. Each tag element is associated with a given resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-stage.html#cfn-apigatewayv2-stage-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::ApiGatewayV2::Stage`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnStageProps) {
        super(scope, id, { type: CfnStage.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'apiId', this);
        cdk.requireProperty(props, 'stageName', this);

        this.apiId = props.apiId;
        this.stageName = props.stageName;
        this.accessLogSettings = props.accessLogSettings;
        this.accessPolicyId = props.accessPolicyId;
        this.autoDeploy = props.autoDeploy;
        this.clientCertificateId = props.clientCertificateId;
        this.defaultRouteSettings = props.defaultRouteSettings;
        this.deploymentId = props.deploymentId;
        this.description = props.description;
        this.routeSettings = props.routeSettings;
        this.stageVariables = props.stageVariables;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::ApiGatewayV2::Stage", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnStage.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            apiId: this.apiId,
            stageName: this.stageName,
            accessLogSettings: this.accessLogSettings,
            accessPolicyId: this.accessPolicyId,
            autoDeploy: this.autoDeploy,
            clientCertificateId: this.clientCertificateId,
            defaultRouteSettings: this.defaultRouteSettings,
            deploymentId: this.deploymentId,
            description: this.description,
            routeSettings: this.routeSettings,
            stageVariables: this.stageVariables,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnStagePropsToCloudFormation(props);
    }
}

export namespace CfnStage {
    /**
     * Settings for logging access in a stage.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-stage-accesslogsettings.html
     */
    export interface AccessLogSettingsProperty {
        /**
         * The ARN of the CloudWatch Logs log group to receive access logs. This parameter is required to enable access logging.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-stage-accesslogsettings.html#cfn-apigatewayv2-stage-accesslogsettings-destinationarn
         */
        readonly destinationArn?: string;
        /**
         * A single line format of the access logs of data, as specified by selected $context variables. The format must include at least $context.requestId. This parameter is required to enable access logging.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-stage-accesslogsettings.html#cfn-apigatewayv2-stage-accesslogsettings-format
         */
        readonly format?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AccessLogSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `AccessLogSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnStage_AccessLogSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('destinationArn', cdk.validateString)(properties.destinationArn));
    errors.collect(cdk.propertyValidator('format', cdk.validateString)(properties.format));
    return errors.wrap('supplied properties not correct for "AccessLogSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Stage.AccessLogSettings` resource
 *
 * @param properties - the TypeScript properties of a `AccessLogSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Stage.AccessLogSettings` resource.
 */
// @ts-ignore TS6133
function cfnStageAccessLogSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnStage_AccessLogSettingsPropertyValidator(properties).assertSuccess();
    return {
        DestinationArn: cdk.stringToCloudFormation(properties.destinationArn),
        Format: cdk.stringToCloudFormation(properties.format),
    };
}

// @ts-ignore TS6133
function CfnStageAccessLogSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnStage.AccessLogSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnStage.AccessLogSettingsProperty>();
    ret.addPropertyResult('destinationArn', 'DestinationArn', properties.DestinationArn != null ? cfn_parse.FromCloudFormation.getString(properties.DestinationArn) : undefined);
    ret.addPropertyResult('format', 'Format', properties.Format != null ? cfn_parse.FromCloudFormation.getString(properties.Format) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnStage {
    /**
     * Represents a collection of route settings.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-stage-routesettings.html
     */
    export interface RouteSettingsProperty {
        /**
         * Specifies whether ( `true` ) or not ( `false` ) data trace logging is enabled for this route. This property affects the log entries pushed to Amazon CloudWatch Logs. Supported only for WebSocket APIs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-stage-routesettings.html#cfn-apigatewayv2-stage-routesettings-datatraceenabled
         */
        readonly dataTraceEnabled?: boolean | cdk.IResolvable;
        /**
         * Specifies whether detailed metrics are enabled.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-stage-routesettings.html#cfn-apigatewayv2-stage-routesettings-detailedmetricsenabled
         */
        readonly detailedMetricsEnabled?: boolean | cdk.IResolvable;
        /**
         * Specifies the logging level for this route: `INFO` , `ERROR` , or `OFF` . This property affects the log entries pushed to Amazon CloudWatch Logs. Supported only for WebSocket APIs.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-stage-routesettings.html#cfn-apigatewayv2-stage-routesettings-logginglevel
         */
        readonly loggingLevel?: string;
        /**
         * Specifies the throttling burst limit.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-stage-routesettings.html#cfn-apigatewayv2-stage-routesettings-throttlingburstlimit
         */
        readonly throttlingBurstLimit?: number;
        /**
         * Specifies the throttling rate limit.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigatewayv2-stage-routesettings.html#cfn-apigatewayv2-stage-routesettings-throttlingratelimit
         */
        readonly throttlingRateLimit?: number;
    }
}

/**
 * Determine whether the given properties match those of a `RouteSettingsProperty`
 *
 * @param properties - the TypeScript properties of a `RouteSettingsProperty`
 *
 * @returns the result of the validation.
 */
function CfnStage_RouteSettingsPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dataTraceEnabled', cdk.validateBoolean)(properties.dataTraceEnabled));
    errors.collect(cdk.propertyValidator('detailedMetricsEnabled', cdk.validateBoolean)(properties.detailedMetricsEnabled));
    errors.collect(cdk.propertyValidator('loggingLevel', cdk.validateString)(properties.loggingLevel));
    errors.collect(cdk.propertyValidator('throttlingBurstLimit', cdk.validateNumber)(properties.throttlingBurstLimit));
    errors.collect(cdk.propertyValidator('throttlingRateLimit', cdk.validateNumber)(properties.throttlingRateLimit));
    return errors.wrap('supplied properties not correct for "RouteSettingsProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Stage.RouteSettings` resource
 *
 * @param properties - the TypeScript properties of a `RouteSettingsProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::Stage.RouteSettings` resource.
 */
// @ts-ignore TS6133
function cfnStageRouteSettingsPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnStage_RouteSettingsPropertyValidator(properties).assertSuccess();
    return {
        DataTraceEnabled: cdk.booleanToCloudFormation(properties.dataTraceEnabled),
        DetailedMetricsEnabled: cdk.booleanToCloudFormation(properties.detailedMetricsEnabled),
        LoggingLevel: cdk.stringToCloudFormation(properties.loggingLevel),
        ThrottlingBurstLimit: cdk.numberToCloudFormation(properties.throttlingBurstLimit),
        ThrottlingRateLimit: cdk.numberToCloudFormation(properties.throttlingRateLimit),
    };
}

// @ts-ignore TS6133
function CfnStageRouteSettingsPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnStage.RouteSettingsProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnStage.RouteSettingsProperty>();
    ret.addPropertyResult('dataTraceEnabled', 'DataTraceEnabled', properties.DataTraceEnabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DataTraceEnabled) : undefined);
    ret.addPropertyResult('detailedMetricsEnabled', 'DetailedMetricsEnabled', properties.DetailedMetricsEnabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DetailedMetricsEnabled) : undefined);
    ret.addPropertyResult('loggingLevel', 'LoggingLevel', properties.LoggingLevel != null ? cfn_parse.FromCloudFormation.getString(properties.LoggingLevel) : undefined);
    ret.addPropertyResult('throttlingBurstLimit', 'ThrottlingBurstLimit', properties.ThrottlingBurstLimit != null ? cfn_parse.FromCloudFormation.getNumber(properties.ThrottlingBurstLimit) : undefined);
    ret.addPropertyResult('throttlingRateLimit', 'ThrottlingRateLimit', properties.ThrottlingRateLimit != null ? cfn_parse.FromCloudFormation.getNumber(properties.ThrottlingRateLimit) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnVpcLink`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-vpclink.html
 */
export interface CfnVpcLinkProps {

    /**
     * The name of the VPC link.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-vpclink.html#cfn-apigatewayv2-vpclink-name
     */
    readonly name: string;

    /**
     * A list of subnet IDs to include in the VPC link.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-vpclink.html#cfn-apigatewayv2-vpclink-subnetids
     */
    readonly subnetIds: string[];

    /**
     * A list of security group IDs for the VPC link.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-vpclink.html#cfn-apigatewayv2-vpclink-securitygroupids
     */
    readonly securityGroupIds?: string[];

    /**
     * The collection of tags. Each tag element is associated with a given resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-vpclink.html#cfn-apigatewayv2-vpclink-tags
     */
    readonly tags?: any;
}

/**
 * Determine whether the given properties match those of a `CfnVpcLinkProps`
 *
 * @param properties - the TypeScript properties of a `CfnVpcLinkProps`
 *
 * @returns the result of the validation.
 */
function CfnVpcLinkPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.requiredValidator)(properties.name));
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('securityGroupIds', cdk.listValidator(cdk.validateString))(properties.securityGroupIds));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.requiredValidator)(properties.subnetIds));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.listValidator(cdk.validateString))(properties.subnetIds));
    errors.collect(cdk.propertyValidator('tags', cdk.validateObject)(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnVpcLinkProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::ApiGatewayV2::VpcLink` resource
 *
 * @param properties - the TypeScript properties of a `CfnVpcLinkProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::ApiGatewayV2::VpcLink` resource.
 */
// @ts-ignore TS6133
function cfnVpcLinkPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnVpcLinkPropsValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        SubnetIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnetIds),
        SecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.securityGroupIds),
        Tags: cdk.objectToCloudFormation(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnVpcLinkPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnVpcLinkProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnVpcLinkProps>();
    ret.addPropertyResult('name', 'Name', cfn_parse.FromCloudFormation.getString(properties.Name));
    ret.addPropertyResult('subnetIds', 'SubnetIds', cfn_parse.FromCloudFormation.getStringArray(properties.SubnetIds));
    ret.addPropertyResult('securityGroupIds', 'SecurityGroupIds', properties.SecurityGroupIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SecurityGroupIds) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getAny(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::ApiGatewayV2::VpcLink`
 *
 * The `AWS::ApiGatewayV2::VpcLink` resource creates a VPC link. Supported only for HTTP APIs. The VPC link status must transition from `PENDING` to `AVAILABLE` to successfully create a VPC link, which can take up to 10 minutes. To learn more, see [Working with VPC Links for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vpc-links.html) in the *API Gateway Developer Guide* .
 *
 * @cloudformationResource AWS::ApiGatewayV2::VpcLink
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-vpclink.html
 */
export class CfnVpcLink extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::ApiGatewayV2::VpcLink";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnVpcLink {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnVpcLinkPropsFromCloudFormation(resourceProperties);
        const ret = new CfnVpcLink(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the VPC link.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-vpclink.html#cfn-apigatewayv2-vpclink-name
     */
    public name: string;

    /**
     * A list of subnet IDs to include in the VPC link.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-vpclink.html#cfn-apigatewayv2-vpclink-subnetids
     */
    public subnetIds: string[];

    /**
     * A list of security group IDs for the VPC link.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-vpclink.html#cfn-apigatewayv2-vpclink-securitygroupids
     */
    public securityGroupIds: string[] | undefined;

    /**
     * The collection of tags. Each tag element is associated with a given resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-vpclink.html#cfn-apigatewayv2-vpclink-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::ApiGatewayV2::VpcLink`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnVpcLinkProps) {
        super(scope, id, { type: CfnVpcLink.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'name', this);
        cdk.requireProperty(props, 'subnetIds', this);

        this.name = props.name;
        this.subnetIds = props.subnetIds;
        this.securityGroupIds = props.securityGroupIds;
        this.tags = new cdk.TagManager(cdk.TagType.MAP, "AWS::ApiGatewayV2::VpcLink", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnVpcLink.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            name: this.name,
            subnetIds: this.subnetIds,
            securityGroupIds: this.securityGroupIds,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnVpcLinkPropsToCloudFormation(props);
    }
}
