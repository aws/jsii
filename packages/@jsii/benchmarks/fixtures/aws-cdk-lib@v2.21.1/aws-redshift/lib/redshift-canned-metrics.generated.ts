// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

export class RedshiftMetrics {
  public static commitQueueLengthAverage(dimensions: { ClusterIdentifier: string }) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'CommitQueueLength',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static concurrencyScalingActiveClustersAverage(dimensions: { ClusterIdentifier: string }) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'ConcurrencyScalingActiveClusters',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static concurrencyScalingSecondsAverage(dimensions: { ClusterIdentifier: string }) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'ConcurrencyScalingSeconds',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static cpuUtilizationAverage(dimensions: { ClusterIdentifier: string }): MetricWithDims<{ ClusterIdentifier: string }>;
  public static cpuUtilizationAverage(dimensions: { ClusterIdentifier: string, NodeID: string }): MetricWithDims<{ ClusterIdentifier: string, NodeID: string }>;
  public static cpuUtilizationAverage(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'CPUUtilization',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static databaseConnectionsAverage(dimensions: { ClusterIdentifier: string }) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'DatabaseConnections',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static healthStatusSum(dimensions: { ClusterIdentifier: string }) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'HealthStatus',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static maintenanceModeSum(dimensions: { ClusterIdentifier: string }) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'MaintenanceMode',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static maxConfiguredConcurrencyScalingClustersSum(dimensions: { ClusterIdentifier: string }) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'MaxConfiguredConcurrencyScalingClusters',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static networkReceiveThroughputSum(dimensions: { ClusterIdentifier: string }): MetricWithDims<{ ClusterIdentifier: string }>;
  public static networkReceiveThroughputSum(dimensions: { ClusterIdentifier: string, NodeID: string }): MetricWithDims<{ ClusterIdentifier: string, NodeID: string }>;
  public static networkReceiveThroughputSum(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'NetworkReceiveThroughput',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static networkTransmitThroughputSum(dimensions: { ClusterIdentifier: string }): MetricWithDims<{ ClusterIdentifier: string }>;
  public static networkTransmitThroughputSum(dimensions: { ClusterIdentifier: string, NodeID: string }): MetricWithDims<{ ClusterIdentifier: string, NodeID: string }>;
  public static networkTransmitThroughputSum(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'NetworkTransmitThroughput',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static numExceededSchemaQuotasAverage(dimensions: { ClusterIdentifier: string }) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'NumExceededSchemaQuotas',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static percentageDiskSpaceUsedAverage(dimensions: { ClusterIdentifier: string }) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'PercentageDiskSpaceUsed',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static percentageQuotaUsedAverage(dimensions: { ClusterIdentifier: string }) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'PercentageQuotaUsed',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static queriesCompletedPerSecondSum(dimensions: { ClusterIdentifier: string }): MetricWithDims<{ ClusterIdentifier: string }>;
  public static queriesCompletedPerSecondSum(dimensions: { ClusterIdentifier: string, wlmid: string }): MetricWithDims<{ ClusterIdentifier: string, wlmid: string }>;
  public static queriesCompletedPerSecondSum(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'QueriesCompletedPerSecond',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static queryDurationAverage(dimensions: { ClusterIdentifier: string }) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'QueryDuration',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static queryRuntimeBreakdownSum(dimensions: { ClusterIdentifier: string }) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'QueryRuntimeBreakdown',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static readIopsSum(dimensions: { ClusterIdentifier: string }): MetricWithDims<{ ClusterIdentifier: string }>;
  public static readIopsSum(dimensions: { ClusterIdentifier: string, NodeID: string }): MetricWithDims<{ ClusterIdentifier: string, NodeID: string }>;
  public static readIopsSum(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'ReadIOPS',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static readLatencyAverage(dimensions: { ClusterIdentifier: string }): MetricWithDims<{ ClusterIdentifier: string }>;
  public static readLatencyAverage(dimensions: { ClusterIdentifier: string, NodeID: string }): MetricWithDims<{ ClusterIdentifier: string, NodeID: string }>;
  public static readLatencyAverage(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'ReadLatency',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static readThroughputSum(dimensions: { ClusterIdentifier: string }): MetricWithDims<{ ClusterIdentifier: string }>;
  public static readThroughputSum(dimensions: { ClusterIdentifier: string, NodeID: string }): MetricWithDims<{ ClusterIdentifier: string, NodeID: string }>;
  public static readThroughputSum(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'ReadThroughput',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static storageUsedAverage(dimensions: { ClusterIdentifier: string }) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'StorageUsed',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static totalTableCountAverage(dimensions: { ClusterIdentifier: string }) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'TotalTableCount',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static wlmQueriesCompletedPerSecondAverage(dimensions: { ClusterIdentifier: string }): MetricWithDims<{ ClusterIdentifier: string }>;
  public static wlmQueriesCompletedPerSecondAverage(dimensions: { ClusterIdentifier: string, wlmid: string }): MetricWithDims<{ ClusterIdentifier: string, wlmid: string }>;
  public static wlmQueriesCompletedPerSecondAverage(dimensions: { ClusterIdentifier: string, QueueName: string }): MetricWithDims<{ ClusterIdentifier: string, QueueName: string }>;
  public static wlmQueriesCompletedPerSecondAverage(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'WLMQueriesCompletedPerSecond',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static wlmQueryDurationAverage(dimensions: { ClusterIdentifier: string }): MetricWithDims<{ ClusterIdentifier: string }>;
  public static wlmQueryDurationAverage(dimensions: { ClusterIdentifier: string, wlmid: string }): MetricWithDims<{ ClusterIdentifier: string, wlmid: string }>;
  public static wlmQueryDurationAverage(dimensions: { ClusterIdentifier: string, QueueName: string }): MetricWithDims<{ ClusterIdentifier: string, QueueName: string }>;
  public static wlmQueryDurationAverage(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'WLMQueryDuration',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static wlmQueueLengthSum(dimensions: { ClusterIdentifier: string }): MetricWithDims<{ ClusterIdentifier: string }>;
  public static wlmQueueLengthSum(dimensions: { ClusterIdentifier: string, QueueName: string }): MetricWithDims<{ ClusterIdentifier: string, QueueName: string }>;
  public static wlmQueueLengthSum(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'WLMQueueLength',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static writeIopsSum(dimensions: { ClusterIdentifier: string }): MetricWithDims<{ ClusterIdentifier: string }>;
  public static writeIopsSum(dimensions: { ClusterIdentifier: string, NodeID: string }): MetricWithDims<{ ClusterIdentifier: string, NodeID: string }>;
  public static writeIopsSum(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'WriteIOPS',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static writeLatencyAverage(dimensions: { ClusterIdentifier: string }): MetricWithDims<{ ClusterIdentifier: string }>;
  public static writeLatencyAverage(dimensions: { ClusterIdentifier: string, NodeID: string }): MetricWithDims<{ ClusterIdentifier: string, NodeID: string }>;
  public static writeLatencyAverage(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'WriteLatency',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static writeThroughputSum(dimensions: { ClusterIdentifier: string }): MetricWithDims<{ ClusterIdentifier: string }>;
  public static writeThroughputSum(dimensions: { ClusterIdentifier: string, NodeID: string }): MetricWithDims<{ ClusterIdentifier: string, NodeID: string }>;
  public static writeThroughputSum(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'WriteThroughput',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static wlmQueueWaitTimeAverage(dimensions: { ClusterIdentifier: string, wlmid: string }): MetricWithDims<{ ClusterIdentifier: string, wlmid: string }>;
  public static wlmQueueWaitTimeAverage(dimensions: { ClusterIdentifier: string, QueueName: string }): MetricWithDims<{ ClusterIdentifier: string, QueueName: string }>;
  public static wlmQueueWaitTimeAverage(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'WLMQueueWaitTime',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static wlmRunningQueriesAverage(dimensions: { ClusterIdentifier: string, wlmid: string }): MetricWithDims<{ ClusterIdentifier: string, wlmid: string }>;
  public static wlmRunningQueriesAverage(dimensions: { ClusterIdentifier: string, QueueName: string }): MetricWithDims<{ ClusterIdentifier: string, QueueName: string }>;
  public static wlmRunningQueriesAverage(dimensions: any) {
    return {
      namespace: 'AWS/Redshift',
      metricName: 'WLMRunningQueries',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
}
type MetricWithDims<D> = { namespace: string, metricName: string, statistic: string, dimensionsMap: D };
