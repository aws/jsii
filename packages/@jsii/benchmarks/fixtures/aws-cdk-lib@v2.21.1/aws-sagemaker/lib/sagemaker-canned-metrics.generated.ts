// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

export class SageMakerMetrics {
  public static invocationsSum(dimensions: { EndpointName: string, VariantName: string }) {
    return {
      namespace: 'AWS/SageMaker',
      metricName: 'Invocations',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static invocation5XxErrorsSum(dimensions: { EndpointName: string, VariantName: string }) {
    return {
      namespace: 'AWS/SageMaker',
      metricName: 'Invocation5XXErrors',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static invocation4XxErrorsSum(dimensions: { EndpointName: string, VariantName: string }) {
    return {
      namespace: 'AWS/SageMaker',
      metricName: 'Invocation4XXErrors',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static invocationsPerInstanceSum(dimensions: { EndpointName: string, VariantName: string }) {
    return {
      namespace: 'AWS/SageMaker',
      metricName: 'InvocationsPerInstance',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static modelLatencySum(dimensions: { EndpointName: string, VariantName: string }) {
    return {
      namespace: 'AWS/SageMaker',
      metricName: 'ModelLatency',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static overheadLatencySum(dimensions: { EndpointName: string, VariantName: string }) {
    return {
      namespace: 'AWS/SageMaker',
      metricName: 'OverheadLatency',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
}
