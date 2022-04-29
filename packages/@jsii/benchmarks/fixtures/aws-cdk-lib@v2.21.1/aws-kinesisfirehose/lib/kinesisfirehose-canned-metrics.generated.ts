// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

export class FirehoseMetrics {
  public static incomingBytesSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'IncomingBytes',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static incomingRecordsSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'IncomingRecords',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static backupToS3BytesSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'BackupToS3.Bytes',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static backupToS3DataFreshnessAverage(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'BackupToS3.DataFreshness',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static backupToS3RecordsSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'BackupToS3.Records',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static backupToS3SuccessSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'BackupToS3.Success',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static dataReadFromKinesisStreamBytesSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DataReadFromKinesisStream.Bytes',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static dataReadFromKinesisStreamRecordsSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DataReadFromKinesisStream.Records',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static deliveryToElasticsearchBytesSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToElasticsearch.Bytes',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static deliveryToElasticsearchRecordsSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToElasticsearch.Records',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static deliveryToElasticsearchSuccessSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToElasticsearch.Success',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static deliveryToRedshiftBytesSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToRedshift.Bytes',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static deliveryToRedshiftRecordsSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToRedshift.Records',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static deliveryToRedshiftSuccessSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToRedshift.Success',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static deliveryToS3BytesSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToS3.Bytes',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static deliveryToS3DataFreshnessAverage(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToS3.DataFreshness',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static deliveryToS3RecordsSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToS3.Records',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static deliveryToS3SuccessSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToS3.Success',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static deliveryToSplunkBytesSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToSplunk.Bytes',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static deliveryToSplunkDataAckLatencyAverage(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToSplunk.DataAckLatency',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static deliveryToSplunkDataFreshnessAverage(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToSplunk.DataFreshness',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
  public static deliveryToSplunkRecordsSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToSplunk.Records',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static deliveryToSplunkSuccessSum(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'DeliveryToSplunk.Success',
      dimensionsMap: dimensions,
      statistic: 'Sum',
    };
  }
  public static kinesisMillisBehindLatestAverage(dimensions: { DeliveryStreamName: string }) {
    return {
      namespace: 'AWS/Firehose',
      metricName: 'KinesisMillisBehindLatest',
      dimensionsMap: dimensions,
      statistic: 'Average',
    };
  }
}
