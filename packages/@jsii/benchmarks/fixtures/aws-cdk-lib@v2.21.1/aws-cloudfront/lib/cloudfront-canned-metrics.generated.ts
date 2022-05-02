// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

export class CloudFrontMetrics {
  public static requestsSum(dimensions: { DistributionId: string, Region: string }) {
    return {
      namespace: 'AWS/CloudFront',
      metricName: 'Requests',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static totalErrorRateAverage(dimensions: { DistributionId: string, Region: string }) {
    return {
      namespace: 'AWS/CloudFront',
      metricName: 'TotalErrorRate',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static bytesDownloadedSum(dimensions: { DistributionId: string, Region: string }) {
    return {
      namespace: 'AWS/CloudFront',
      metricName: 'BytesDownloaded',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static bytesUploadedSum(dimensions: { DistributionId: string, Region: string }) {
    return {
      namespace: 'AWS/CloudFront',
      metricName: 'BytesUploaded',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static _4XxErrorRateAverage(dimensions: { DistributionId: string, Region: string }) {
    return {
      namespace: 'AWS/CloudFront',
      metricName: '4xxErrorRate',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static _5XxErrorRateAverage(dimensions: { DistributionId: string, Region: string }) {
    return {
      namespace: 'AWS/CloudFront',
      metricName: '5xxErrorRate',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
}
