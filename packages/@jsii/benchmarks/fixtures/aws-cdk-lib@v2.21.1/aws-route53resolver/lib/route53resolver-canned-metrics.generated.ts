// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

export class Route53ResolverMetrics {
  public static inboundQueryVolumeSum(dimensions: { EndpointId: string }) {
    return {
      namespace: 'AWS/Route53Resolver',
      metricName: 'InboundQueryVolume',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static outboundQueryVolumeSum(dimensions: { EndpointId: string }) {
    return {
      namespace: 'AWS/Route53Resolver',
      metricName: 'OutboundQueryVolume',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static outboundQueryAggregateVolumeSum(dimensions: { EndpointId: string }) {
    return {
      namespace: 'AWS/Route53Resolver',
      metricName: 'OutboundQueryAggregateVolume',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
}
