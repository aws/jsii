// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

export class GameLiftMetrics {
  public static activeInstancesAverage(dimensions: { FleetId: string }) {
    return {
      namespace: 'AWS/GameLift',
      metricName: 'ActiveInstances',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static percentIdleInstancesAverage(dimensions: { FleetId: string }) {
    return {
      namespace: 'AWS/GameLift',
      metricName: 'PercentIdleInstances',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static desiredInstancesAverage(dimensions: { FleetId: string }) {
    return {
      namespace: 'AWS/GameLift',
      metricName: 'DesiredInstances',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static idleInstancesAverage(dimensions: { FleetId: string }) {
    return {
      namespace: 'AWS/GameLift',
      metricName: 'IdleInstances',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static maxInstancesAverage(dimensions: { FleetId: string }) {
    return {
      namespace: 'AWS/GameLift',
      metricName: 'MaxInstances',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static minInstancesAverage(dimensions: { FleetId: string }) {
    return {
      namespace: 'AWS/GameLift',
      metricName: 'MinInstances',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static instanceInterruptionsSum(dimensions: { FleetId: string }) {
    return {
      namespace: 'AWS/GameLift',
      metricName: 'InstanceInterruptions',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
}
