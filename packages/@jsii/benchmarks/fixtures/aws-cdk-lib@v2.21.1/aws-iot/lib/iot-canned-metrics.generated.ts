// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

export class IoTMetrics {
  public static topicMatchSum(dimensions: { RuleName: string }) {
    return {
      namespace: 'AWS/IoT',
      metricName: 'TopicMatch',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static parseErrorSum(dimensions: { RuleName: string }) {
    return {
      namespace: 'AWS/IoT',
      metricName: 'ParseError',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static ruleMessageThrottledSum(dimensions: { RuleName: string }) {
    return {
      namespace: 'AWS/IoT',
      metricName: 'RuleMessageThrottled',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static ruleNotFoundSum(dimensions: { RuleName: string }) {
    return {
      namespace: 'AWS/IoT',
      metricName: 'RuleNotFound',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
}
