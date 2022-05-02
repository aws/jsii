// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

export class MediaStoreMetrics {
  public static requestCountSum(dimensions: { ContainerName: string }) {
    return {
      namespace: 'AWS/MediaStore',
      metricName: 'RequestCount',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static turnaroundTimeAverage(dimensions: { ContainerName: string }) {
    return {
      namespace: 'AWS/MediaStore',
      metricName: 'TurnaroundTime',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static _4XxErrorCountSum(dimensions: { ContainerName: string }) {
    return {
      namespace: 'AWS/MediaStore',
      metricName: '4xxErrorCount',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static _5XxErrorCountSum(dimensions: { ContainerName: string }) {
    return {
      namespace: 'AWS/MediaStore',
      metricName: '5xxErrorCount',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static bytesDownloadedSum(dimensions: { ContainerName: string }) {
    return {
      namespace: 'AWS/MediaStore',
      metricName: 'BytesDownloaded',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static bytesUploadedSum(dimensions: { ContainerName: string }) {
    return {
      namespace: 'AWS/MediaStore',
      metricName: 'BytesUploaded',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static totalTimeAverage(dimensions: { ContainerName: string }) {
    return {
      namespace: 'AWS/MediaStore',
      metricName: 'TotalTime',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
}
