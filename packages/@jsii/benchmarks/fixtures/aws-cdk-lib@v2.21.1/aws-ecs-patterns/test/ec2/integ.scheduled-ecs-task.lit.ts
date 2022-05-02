import * as ec2 from '../../../aws-ec2';
import * as ecs from '../../../aws-ecs';
import * as events from '../../../aws-events';
import * as cdk from '../../../core';

import { ScheduledEc2Task } from '../../lib';

const app = new cdk.App();

class EventStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);

    const vpc = new ec2.Vpc(this, 'Vpc', { maxAzs: 1 });

    const cluster = new ecs.Cluster(this, 'EcsCluster', { vpc });
    cluster.addCapacity('DefaultAutoScalingGroup', {
      instanceType: new ec2.InstanceType('t2.micro'),
    });

    /// !show
    // Create the scheduled task
    new ScheduledEc2Task(this, 'ScheduledEc2Task', {
      cluster,
      scheduledEc2TaskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
        memoryLimitMiB: 512,
        cpu: 1,
        environment: { TRIGGER: 'CloudWatch Events' },
      },
      desiredTaskCount: 2,
      schedule: events.Schedule.rate(cdk.Duration.minutes(1)),
    });
    /// !hide
  }
}

new EventStack(app, 'aws-ecs-integ-ecs');
app.synth();
